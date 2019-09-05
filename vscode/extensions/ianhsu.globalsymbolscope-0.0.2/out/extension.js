"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const provider_1 = require("./provider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const provider = new provider_1.default();
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const providerRegistrations = vscode.Disposable.from(vscode.workspace.registerTextDocumentContentProvider(provider_1.default.scheme, provider));
    const lookupSymbolRegistration = vscode.commands.registerTextEditorCommand('editor.LookupSymbol', editor => {
        let select;
        select = editor.document.getText(editor.document.getWordRangeAtPosition(editor.selection.active));
        if ((select) && (editor.document.getText().length !== select.length)) {
            const uri = provider_1.encodeLocation(editor.document.uri, editor.selection.active, select, provider_1.scopemode.FIND_SYMBOL);
            return vscode.workspace.openTextDocument(uri).then(doc => vscode.window.showTextDocument(doc, editor.viewColumn + 1));
        }
        return null;
    });
    const lookupGlobalDefRegistration = vscode.commands.registerTextEditorCommand('editor.LookupGlobalDef', editor => {
        let select;
        select = editor.document.getText(editor.document.getWordRangeAtPosition(editor.selection.active));
        if ((select) && (editor.document.getText().length !== select.length)) {
            const uri = provider_1.encodeLocation(editor.document.uri, editor.selection.active, select, provider_1.scopemode.FIND_GLOBAL_DEFINITION);
            return vscode.workspace.openTextDocument(uri).then(doc => vscode.window.showTextDocument(doc, editor.viewColumn + 1));
        }
        return null;
    });
    const findTextRegistration = vscode.commands.registerTextEditorCommand('editor.FindText', editor => {
        let select;
        select = editor.document.getText(editor.selection);
        if (select) {
            const uri = provider_1.encodeLocation(editor.document.uri, editor.selection.active, select, provider_1.scopemode.FIND_TEXT_STRING);
            return vscode.workspace.openTextDocument(uri).then(doc => vscode.window.showTextDocument(doc, editor.viewColumn + 1));
        }
        return null;
    });
    context.subscriptions.push(providerRegistrations, lookupSymbolRegistration, lookupGlobalDefRegistration, findTextRegistration, provider);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map