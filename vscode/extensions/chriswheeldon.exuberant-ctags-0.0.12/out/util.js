"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const channel = vscode.window.createOutputChannel('CTags');
function log(...args) {
    args.unshift('vscode-ctags:');
    console.log(...args);
    channel.appendLine(args.join(' '));
}
exports.log = log;
//# sourceMappingURL=util.js.map