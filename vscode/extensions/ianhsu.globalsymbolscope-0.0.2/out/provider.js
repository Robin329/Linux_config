"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process_1 = require("child_process");
var scopemode;
(function (scopemode) {
    scopemode[scopemode["FIND_SYMBOL"] = 0] = "FIND_SYMBOL";
    scopemode[scopemode["FIND_GLOBAL_DEFINITION"] = 1] = "FIND_GLOBAL_DEFINITION";
    scopemode[scopemode["FIND_TEXT_STRING"] = 4] = "FIND_TEXT_STRING";
})(scopemode = exports.scopemode || (exports.scopemode = {}));
;
class Provider {
    constructor() {
        // Listen to the `closeTextDocument`-event which means we must
        // clear the corresponding model object - `ReferencesDocument`
    }
    dispose() {
    }
    parseScopeInformation(scope) {
        let Info = scope.split(" ");
        let Path = "";
        let Line = "";
        let Desc = "";
        let dIdx = 0;
        Path = Info[dIdx++];
        dIdx++;
        Line = Info[dIdx++];
        while (dIdx < Info.length) {
            Desc += Info[dIdx++];
            Desc += " ";
        }
        return [Path, Line, Desc];
    }
    // Provider method that takes an uri of the `references`-scheme and
    // resolves its content by (1) running the reference search command
    // and (2) formatting the results
    provideTextDocumentContent(uri) {
        const [target, pos, symbol, mode] = decodeLocation(uri);
        let result;
        let cmd;
        let parse = "";
        let CurrentPath = "";
        let dIdx = 0;
        let scope;
        cmd = 'gtags-cscope -dL ';
        cmd += ("-" + mode.toString() + " ");
        cmd += symbol;
        try {
            result = child_process_1.execSync(cmd, {
                encoding: "UTF-8",
                cwd: vscode.workspace.rootPath
            }).toString();
        }
        catch (error) {
            vscode.window.showInformationMessage('Occurred error' + error);
            return "";
        }
        scope = result.split("\n");
        switch (mode) {
            case scopemode.FIND_SYMBOL:
                parse += '------------>Find Symbol(';
                parse += symbol;
                parse += ')\n\n\n';
                break;
            case scopemode.FIND_GLOBAL_DEFINITION:
                parse += '------------>Find Global Definition(';
                parse += symbol;
                parse += ')\n\n\n';
                break;
            case scopemode.FIND_TEXT_STRING:
                parse += '------------>Find Text String(';
                parse += symbol;
                parse += ')\n\n\n';
                break;
            default:
                vscode.window.showInformationMessage('Error scope mode');
                return "";
                break;
        }
        while (dIdx < scope.length) {
            const [path, line, desc] = this.parseScopeInformation(scope[dIdx]);
            if ((path !== "") && (line !== "") && (desc !== "")) {
                if (CurrentPath.match(path)) {
                    parse += '\t\t  ';
                    parse += line;
                    parse += ':  ';
                    parse += desc;
                    parse += '\n';
                }
                else {
                    CurrentPath = path;
                    parse += 'file:';
                    parse += path;
                    parse += ':\n';
                    parse += '\t\t  ';
                    parse += line;
                    parse += ':  ';
                    parse += desc;
                    parse += '\n';
                }
            }
            dIdx += 1;
        }
        return parse;
    }
}
Provider.scheme = 'symbolscope';
exports.default = Provider;
let seq = 0;
function encodeLocation(uri, pos, symbol, Mode) {
    const query = JSON.stringify([uri.toString(), pos.line, pos.character, symbol, Mode]);
    return vscode.Uri.parse(`${Provider.scheme}:lookup.symbolscope?${query}#${seq++}`);
}
exports.encodeLocation = encodeLocation;
function decodeLocation(uri) {
    let [target, line, character, symbol, mode] = JSON.parse(uri.query);
    return [vscode.Uri.parse(target), new vscode.Position(line, character), symbol, mode];
}
//# sourceMappingURL=provider.js.map