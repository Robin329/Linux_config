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
const path = require("path");
const vscode = require("vscode");
const ctags = require("./ctags");
const util = require("./util");
const tagsfile = '.vscode-ctags';
let tags;
class CTagsDefinitionProvider {
    provideDefinition(document, position, token) {
        const query = document.getText(document.getWordRangeAtPosition(position));
        return this.resolveDefinitions(query);
    }
    resolveDefinitions(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const matches = yield tags.lookup(query);
            if (!matches) {
                util.log(`"${query}" has no matches.`);
                return [];
            }
            return matches.map(match => {
                util.log(`"${query}" matches ${match.path}:${match.lineno}`);
                return new vscode.Location(vscode.Uri.file(match.path), new vscode.Position(match.lineno, 0));
            });
        });
    }
}
class CTagsHoverProvider {
    provideHover(document, position, token) {
        const query = document.getText(document.getWordRangeAtPosition(position));
        return this.resolveHover(query);
    }
    resolveHover(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const matches = yield tags.lookup(query);
            if (!matches) {
                util.log(`"${query}" has no matches.`);
                return null;
            }
            util.log(`"${query}" has ${matches.length} matches.`);
            const summary = matches.map(match => {
                return (path.relative(vscode.workspace.rootPath || '', match.path) +
                    ':' +
                    match.lineno);
            });
            return new vscode.Hover(new vscode.MarkdownString(summary.join('  \n')));
        });
    }
}
class CTagsCompletionProvider {
    provideCompletionItems(document, position, token, context) {
        const prefix = document.getText(document.getWordRangeAtPosition(position));
        return this.resolveCompletion(prefix);
    }
    resolveCompletion(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const matches = yield tags.lookupCompletions(prefix);
            if (!matches) {
                util.log(`"${prefix}" has no matches.`);
                return null;
            }
            util.log(`"${prefix}" has ${matches.length} matches.`);
            return matches.map(match => {
                return new vscode.CompletionItem(match.name);
            });
        });
    }
}
function regenerateArgs() {
    const config = vscode.workspace.getConfiguration('ctags');
    const excludes = config
        .get('excludePatterns', [])
        .map((pattern) => {
        return '--exclude=' + pattern;
    })
        .join(' ');
    const languages = '--languages=' + config.get('languages', ['all']).join(',');
    return [languages, excludes];
}
function regenerateCTags() {
    const args = regenerateArgs();
    const title = args && args.length
        ? `Generating CTags index (${args.join(' ')})`
        : 'Generating CTags index';
    return vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title
    }, (progress, token) => {
        return tags.regenerate(regenerateArgs()).catch(err => {
            vscode.window.setStatusBarMessage('Generating CTags failed: ' + err);
        });
    });
}
function activate(context) {
    util.log('extension activated.');
    tags = new ctags.CTags(vscode.workspace.rootPath || '', tagsfile);
    tags
        .reindex()
        .then(() => {
        vscode.window.setStatusBarMessage('CTags index loaded', 2000);
    })
        .catch(() => {
        return regenerateCTags();
    });
    const definitionsProvider = new CTagsDefinitionProvider();
    vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'cpp' }, definitionsProvider);
    vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'c' }, definitionsProvider);
    const hoverProvider = new CTagsHoverProvider();
    vscode.languages.registerHoverProvider({ scheme: 'file', language: 'c' }, hoverProvider);
    vscode.languages.registerHoverProvider({ scheme: 'file', language: 'cpp' }, hoverProvider);
    const completionProvider = new CTagsCompletionProvider();
    vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'c' }, completionProvider);
    vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'cpp' }, completionProvider);
    const regenerateCTagsCommand = vscode.commands.registerCommand('extension.regenerateCTags', () => {
        regenerateCTags();
    });
    context.subscriptions.push(regenerateCTagsCommand);
    vscode.workspace.onDidSaveTextDocument(event => {
        util.log('saved', event.fileName, event.languageId);
        const config = vscode.workspace.getConfiguration('ctags');
        const autoRegenerate = config.get('regenerateOnSave');
        if (autoRegenerate) {
            regenerateCTags();
        }
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map