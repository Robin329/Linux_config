'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const fs_1 = require("fs");
const path = require("path");
const ctagsindex_1 = require("./ctagsindex");
const taskqueue_1 = require("./taskqueue");
const util_1 = require("./util");
class CTags {
    constructor(baseDir, filename) {
        this.baseDir = baseDir;
        this.filename = filename;
        this.index = new ctagsindex_1.CTagsIndex(this.baseDir, this.filename);
        this.indexq = new taskqueue_1.TaskQueue();
        this.fileq = new taskqueue_1.TaskQueue();
    }
    reindex() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fileq.append(() => __awaiter(this, void 0, void 0, function* () {
                yield this.statAsync(path.join(this.baseDir, this.filename));
                util_1.log('found existing tags file.');
                yield this.indexq.append(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.index.build();
                    util_1.log('indexed tags.');
                }), true);
            }));
        });
    }
    regenerate(args) {
        return __awaiter(this, void 0, void 0, function* () {
            util_1.log('enqueing regenerate ctags task.');
            yield this.fileq.append(() => __awaiter(this, void 0, void 0, function* () {
                yield this.regenerateFile(args);
                util_1.log('regenerated ctags.');
                yield this.indexq.append(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.swapTagFile();
                    util_1.log('installed tags.');
                    yield this.index.build();
                    util_1.log('indexed tags.');
                }), true);
            }));
        });
    }
    lookup(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            util_1.log(`enqueing lookup: "${symbol}".`);
            return this.indexq.append(() => {
                return this.index.lookup(symbol);
            });
        });
    }
    lookupCompletions(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            util_1.log(`enqueing lookup completions: "${prefix}".`);
            return this.indexq.append(() => {
                return this.index.lookupCompletions(prefix);
            });
        });
    }
    regenerateFile(args) {
        return new Promise((resolve, reject) => {
            const command = ['ctags']
                .concat(args || [])
                .concat([`-R`])
                .concat([`-f`, this.filename + '.next', '.'])
                .join(' ');
            child_process.exec(command, { cwd: this.baseDir }, (err, stdout, stderr) => {
                if (err) {
                    util_1.log(command, err, stdout, stderr);
                    reject(stderr);
                }
                resolve();
            });
        });
    }
    swapTagFile() {
        return new Promise((resolve, _) => {
            fs_1.rename(path.join(this.baseDir, this.filename + '.next'), path.join(this.baseDir, this.filename), err => {
                if (err) {
                    util_1.log('rename:' + err);
                }
                resolve();
            });
        });
    }
    statAsync(filename) {
        return new Promise((resolve, reject) => {
            fs_1.stat(filename, (err, stats) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(stats);
                }
            });
        });
    }
}
exports.CTags = CTags;
//# sourceMappingURL=ctags.js.map