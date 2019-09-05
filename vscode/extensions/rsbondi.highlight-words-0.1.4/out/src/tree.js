'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class HighlightTreeProvider {
    constructor(words) {
        this.words = words;
        this._onDidChangeTreeData = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        let nodes = this.words.map(w => {
            return new HighlightNode(w.expression, w, this);
        });
        return Promise.resolve(nodes);
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
}
class HighlightNode extends vscode_1.TreeItem {
    constructor(label, highlight, provider, command) {
        super(label);
        this.label = label;
        this.highlight = highlight;
        this.provider = provider;
        this.command = command;
        this.contextValue = 'highlights';
    }
    getOpts() {
        const index = this.highlight.expression == this.provider.currentExpression ?
            ` ${this.provider.currentIndex.index}/${this.provider.currentIndex.count}` : '';
        return this.highlight.ignoreCase && this.highlight.wholeWord ? 'both' :
            this.highlight.ignoreCase ? 'ignoreCase' :
                this.highlight.wholeWord ? 'wholeWord' : 'default' + index;
    }
    get tooltip() {
        return `${this.label}-${this.getOpts()}`;
    }
    get description() {
        return this.getOpts();
    }
}
exports.HighlightNode = HighlightNode;
exports.default = HighlightTreeProvider;
//# sourceMappingURL=tree.js.map