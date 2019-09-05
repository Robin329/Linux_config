'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const config_1 = require("./config");
const highlight_1 = require("./highlight");
function activate(context) {
    let highlight = new highlight_1.default();
    let configValues;
    vscode_1.commands.registerCommand('highlightwords.addRegExpHighlight', function () {
        vscode_1.window.showInputBox({ prompt: 'Enter expression' })
            .then(word => {
            highlight.addRegExp(word);
        });
    });
    vscode_1.commands.registerCommand('highlightwords.addHighlight', function () {
        highlight.addSelected();
    });
    vscode_1.commands.registerCommand('highlightwords.addHighlightWithOptions', function () {
        highlight.addSelected(true);
    });
    vscode_1.commands.registerCommand('highlightwords.removeHighlight', function () {
        vscode_1.window.showQuickPick(highlight.getWords().concat([{ expression: '* All *', wholeWord: false, ignoreCase: false }]).map(w => {
            return {
                label: w.expression,
                description: (w.ignoreCase ? 'i' : '') + (w.wholeWord ? 'w' : ''),
                detail: ''
            };
        }))
            .then(word => {
            highlight.remove(word);
        });
    });
    vscode_1.commands.registerCommand('highlightwords.treeRemoveHighlight', e => {
        highlight.remove(e);
    });
    vscode_1.commands.registerCommand('highlightwords.treeHighlightOptions', e => {
        highlight.updateOptions(e.label);
    });
    vscode_1.commands.registerCommand('highlightwords.removeAllHighlights', function () {
        highlight.clearAll();
    });
    vscode_1.commands.registerCommand('highlightwords.toggleSidebar', function () {
        configValues.showSidebar = !configValues.showSidebar;
        vscode_1.commands.executeCommand('setContext', 'showSidebar', configValues.showSidebar);
    });
    vscode_1.commands.registerCommand('highlightwords.setHighlightMode', function () {
        const modes = ['Default', 'Whole Word', 'Ignore Case', 'Both'].map((s, i) => highlight.getMode() == i ? s + ' ✅' : s);
        vscode_1.window.showQuickPick(modes).then(option => {
            if (typeof option == 'undefined')
                return;
            highlight.setMode(modes.indexOf(option));
        });
    });
    function next(e, wrap) {
        const doc = vscode_1.window.activeTextEditor.document;
        const ed = vscode_1.window.activeTextEditor;
        const offset = wrap ? 0 : doc.offsetAt(ed.selection.active);
        const nextStart = wrap ? 0 : 1;
        const text = doc.getText();
        const slice = text.slice(offset + nextStart);
        const opts = e.highlight.ignoreCase ? 'i' : '';
        const expression = e.highlight.wholeWord ? '\\b' + e.highlight.expression + '\\b' : e.highlight.expression;
        const re = new RegExp(expression, opts);
        const pos = slice.search(re);
        if (pos == -1) {
            if (!wrap) {
                next(e, true);
            } // wrap
            else
                highlight.getLocationIndex(e.highlight.expression, new vscode_1.Range(new vscode_1.Position(1, 1), new vscode_1.Position(1, 1)));
            return;
        }
        const word = slice.match(re);
        const start = doc.positionAt(pos + offset + nextStart);
        const end = new vscode_1.Position(start.line, start.character + word[0].length);
        const range = new vscode_1.Range(start, end);
        vscode_1.window.activeTextEditor.revealRange(range);
        vscode_1.window.activeTextEditor.selection = new vscode_1.Selection(start, start);
        highlight.getLocationIndex(e.highlight.expression, range);
    }
    vscode_1.commands.registerCommand('highlightwords.findNext', e => {
        next(e);
    });
    function prev(e, wrap) {
        const doc = vscode_1.window.activeTextEditor.document;
        const ed = vscode_1.window.activeTextEditor;
        const iAmHere = ed.selection.active;
        const offset = doc.offsetAt(iAmHere);
        const text = doc.getText();
        const slice = text.slice(0, offset);
        const opts = e.highlight.ignoreCase ? 'gi' : 'g';
        const expression = e.highlight.wholeWord ? '\\b' + e.highlight.expression + '\\b' : e.highlight.expression;
        const re = new RegExp(expression, opts);
        const pos = slice.search(re);
        if (pos == -1) {
            if (!wrap) {
                if (offset != 0) {
                    const home = doc.positionAt(text.length - 1);
                    vscode_1.window.activeTextEditor.selection = new vscode_1.Selection(home, home);
                    prev(e, true);
                    return;
                }
            }
            else
                highlight.getLocationIndex(e.highlight.expression, new vscode_1.Range(new vscode_1.Position(1, 1), new vscode_1.Position(1, 1)));
        }
        let word;
        let found;
        let index;
        while ((found = re.exec(slice)) !== null) {
            index = re.lastIndex;
            word = found[0];
            console.log('last index', index);
        }
        const start = doc.positionAt(index - word.length);
        const range = new vscode_1.Range(start, start);
        vscode_1.window.activeTextEditor.revealRange(range);
        vscode_1.window.activeTextEditor.selection = new vscode_1.Selection(start, start);
        highlight.getLocationIndex(e.highlight.expression, range);
    }
    vscode_1.commands.registerCommand('highlightwords.findPrevious', e => {
        prev(e);
    });
    updateConfig();
    function updateConfig() {
        configValues = config_1.default.getConfigValues();
        highlight.setDecorators(configValues.decorators);
        highlight.setMode(configValues.defaultMode);
        vscode_1.commands.executeCommand('setContext', 'showSidebar', configValues.showSidebar);
    }
    let activeEditor = vscode_1.window.activeTextEditor;
    if (activeEditor) {
        triggerUpdateDecorations();
    }
    vscode_1.workspace.onDidChangeConfiguration(() => {
        updateConfig();
    });
    vscode_1.window.onDidChangeVisibleTextEditors(function (editor) {
        highlight.updateDecorations();
    }, null, context.subscriptions);
    vscode_1.workspace.onDidChangeTextDocument(function (event) {
        activeEditor = vscode_1.window.activeTextEditor;
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);
    var timeout = null;
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            highlight.updateActive();
        }, 500);
    }
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map