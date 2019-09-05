'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class HighlightConfig {
    static getConfigValues() {
        let config = vscode_1.workspace.getConfiguration('highlightwords');
        let colors = config.get('colors');
        let box = config.get('box');
        const defaultMode = config.get('defaultMode');
        const showSidebar = config.get('showSidebar');
        let decorators = [];
        colors.forEach(function (color) {
            var dark = {
                // this color will be used in dark color themes
                overviewRulerColor: color.dark,
                backgroundColor: box.dark ? 'inherit' : color.dark,
                borderColor: color.dark
            };
            if (!box.dark)
                dark.color = '#555555';
            let decorationType = vscode_1.window.createTextEditorDecorationType({
                borderWidth: '2px',
                borderStyle: 'solid',
                overviewRulerLane: vscode_1.OverviewRulerLane.Right,
                light: {
                    // this color will be used in light color themes
                    overviewRulerColor: color.light,
                    borderColor: color.light,
                    backgroundColor: box.light ? 'inherit' : color.light
                },
                dark: dark
            });
            decorators.push(decorationType);
        });
        return { decorators, defaultMode, showSidebar };
    }
}
exports.default = HighlightConfig;
//# sourceMappingURL=config.js.map