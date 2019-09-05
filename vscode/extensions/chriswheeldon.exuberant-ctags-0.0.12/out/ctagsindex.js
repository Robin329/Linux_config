"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const textindexer_1 = require("textindexer");
const util = require("./util");
function regexEscape(s) {
    // modified version of the regex escape from 1.
    // we don't need to escape \ or / since the no-magic
    // ctags pattern already escapes these
    // 1. https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    return s.replace(/[-^$*+?.()|[\]{}]/g, '\\$&');
}
class CTagsIndex {
    constructor(baseDir, filename) {
        this.baseDir = baseDir;
        this.filename = filename;
        this.indexer = new textindexer_1.TextIndexer(path.join(this.baseDir, filename), line => {
            const ti = line.indexOf('\t');
            return ti !== -1 ? line.slice(0, ti) : line;
        }, 7);
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.indexer.index();
        });
    }
    lookup(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidates = yield this.lookupRange(symbol);
            if (candidates) {
                const matches = candidates.filter((candidate) => {
                    return candidate.name === symbol;
                });
                return Promise.all(matches.map(this.resolveMatch.bind(this)));
            }
            return null;
        });
    }
    lookupCompletions(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidates = yield this.lookupRange(prefix);
            if (candidates) {
                const found = new Set();
                const matches = candidates.filter((candidate) => {
                    if (candidate.name.startsWith(prefix) && !found.has(candidate.name)) {
                        found.add(candidate.name);
                        return true;
                    }
                    return false;
                });
                return matches;
            }
            return null;
        });
    }
    lookupRange(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchedRange = yield this.indexer.lookup(symbol);
            if (!matchedRange) {
                return Promise.resolve(null);
            }
            const tags = [];
            const rs = fs.createReadStream(path.join(this.baseDir, this.filename), {
                start: matchedRange.start,
                end: matchedRange.end
            });
            const lr = readline.createInterface(rs);
            lr.on('line', line => {
                const tokens = line.split('\t');
                tags.push({
                    name: tokens[0],
                    path: tokens[1],
                    pattern: tokens[2]
                });
            });
            return new Promise((resolve, reject) => {
                lr.on('close', () => {
                    rs.destroy();
                    resolve(tags);
                });
                rs.on('error', () => {
                    rs.destroy();
                    reject();
                });
            });
        });
    }
    parsePattern(token) {
        if (token.startsWith('/^') && token.endsWith('/;"')) {
            // tag pattern is a no-magic pattern with start and possibly end anchors (/^...$/)
            // http://vimdoc.sourceforge.net/htmldoc/pattern.html#/magic
            // http://ctags.sourceforge.net/FORMAT
            const anchoredEol = token.endsWith('$/;"');
            const end = anchoredEol ? -4 : -3;
            return new RegExp('^' + regexEscape(token.slice(2, end)) + (anchoredEol ? '$' : ''));
        }
        const lineno = parseInt(token, 10);
        if (!isNaN(lineno)) {
            return lineno - 1;
        }
        return null;
    }
    resolveMatch(tag) {
        const pattern = this.parsePattern(tag.pattern);
        if (typeof pattern === 'number') {
            return Promise.resolve({
                symbol: tag.name,
                lineno: pattern,
                path: path.join(this.baseDir, tag.path)
            });
        }
        return this.findTagInFile(tag.name, pattern, path.join(this.baseDir, tag.path));
    }
    findTagInFile(symbol, pattern, filename) {
        const match = { symbol, lineno: 0, path: filename };
        if (!pattern) {
            return Promise.resolve(match);
        }
        const rs = fs.createReadStream(filename);
        const rl = readline.createInterface({ input: rs });
        return new Promise((resolve, _) => {
            let lineno = 0;
            rl.on('line', line => {
                if (pattern.test(line)) {
                    match.lineno = lineno;
                    rl.close();
                }
                lineno++;
            });
            rl.on('close', () => {
                rs.destroy();
                resolve(match);
            });
            rs.on('error', (error) => {
                util.log('findTagsInFile:', error);
                rs.destroy();
                resolve(match);
            });
        });
    }
}
exports.CTagsIndex = CTagsIndex;
//# sourceMappingURL=ctagsindex.js.map