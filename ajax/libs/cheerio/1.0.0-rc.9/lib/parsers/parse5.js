"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.parse = void 0;
var tslib_1 = require("tslib");
var domhandler_1 = require("domhandler");
var parse5_1 = require("parse5");
var parse5_htmlparser2_tree_adapter_1 = tslib_1.__importDefault(require("parse5-htmlparser2-tree-adapter"));
function parse(content, options, isDocument) {
    var opts = {
        scriptingEnabled: typeof options.scriptingEnabled === 'boolean'
            ? options.scriptingEnabled
            : true,
        treeAdapter: parse5_htmlparser2_tree_adapter_1.default,
        sourceCodeLocationInfo: options.sourceCodeLocationInfo,
    };
    var context = options.context;
    // @ts-expect-error The tree adapter unfortunately doesn't return the exact types.
    return isDocument
        ? parse5_1.parse(content, opts)
        : // @ts-expect-error Same issue again.
            parse5_1.parseFragment(context, content, opts);
}
exports.parse = parse;
function render(dom) {
    var _a;
    /*
     * `dom-serializer` passes over the special "root" node and renders the
     * node's children in its place. To mimic this behavior with `parse5`, an
     * equivalent operation must be applied to the input array.
     */
    var nodes = 'length' in dom ? dom : [dom];
    for (var index = 0; index < nodes.length; index += 1) {
        var node = nodes[index];
        if (domhandler_1.isDocument(node)) {
            (_a = Array.prototype.splice).call.apply(_a, tslib_1.__spreadArray([nodes, index, 1], node.children));
        }
    }
    // @ts-expect-error Types don't align here either.
    return parse5_1.serialize({ children: nodes }, { treeAdapter: parse5_htmlparser2_tree_adapter_1.default });
}
exports.render = render;
