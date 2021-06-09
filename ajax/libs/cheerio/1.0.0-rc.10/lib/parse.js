"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
var htmlparser2_1 = require("htmlparser2");
var htmlparser2_adapter_1 = require("./parsers/htmlparser2-adapter");
var parse5_adapter_1 = require("./parsers/parse5-adapter");
var domhandler_1 = require("domhandler");
/*
 * Parser
 */
function parse(content, options, isDocument) {
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(content)) {
        content = content.toString();
    }
    if (typeof content === 'string') {
        return options.xmlMode || options._useHtmlParser2
            ? htmlparser2_adapter_1.parse(content, options)
            : parse5_adapter_1.parse(content, options, isDocument);
    }
    var doc = content;
    if (!Array.isArray(doc) && domhandler_1.isDocument(doc)) {
        // If `doc` is already a root, just return it
        return doc;
    }
    // Add conent to new root element
    var root = new domhandler_1.Document([]);
    // Update the DOM using the root
    update(doc, root);
    return root;
}
exports.default = parse;
/**
 * Update the dom structure, for one changed layer.
 *
 * @param newChilds - The new children.
 * @param parent - The new parent.
 * @returns The parent node.
 */
function update(newChilds, parent) {
    // Normalize
    var arr = Array.isArray(newChilds) ? newChilds : [newChilds];
    // Update parent
    if (parent) {
        parent.children = arr;
    }
    else {
        parent = null;
    }
    // Update neighbors
    for (var i = 0; i < arr.length; i++) {
        var node = arr[i];
        // Cleanly remove existing nodes from their previous structures.
        if (node.parent && node.parent.children !== arr) {
            htmlparser2_1.DomUtils.removeElement(node);
        }
        if (parent) {
            node.prev = arr[i - 1] || null;
            node.next = arr[i + 1] || null;
        }
        else {
            node.prev = node.next = null;
        }
        node.parent = parent;
    }
    return parent;
}
exports.update = update;
