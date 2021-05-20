"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHtml = exports.cloneDom = exports.domEach = exports.cssCase = exports.camelCase = exports.isCheerio = exports.isTag = void 0;
var htmlparser2_1 = require("htmlparser2");
var domhandler_1 = require("domhandler");
/**
 * Check if the DOM element is a tag.
 *
 * `isTag(type)` includes `<script>` and `<style>` tags.
 *
 * @private
 * @category Utils
 * @param type - DOM node to check.
 * @returns Whether the node is a tag.
 */
exports.isTag = htmlparser2_1.DomUtils.isTag;
/**
 * Checks if an object is a Cheerio instance.
 *
 * @category Utils
 * @param maybeCheerio - The object to check.
 * @returns Whether the object is a Cheerio instance.
 */
function isCheerio(maybeCheerio) {
    return maybeCheerio.cheerio != null;
}
exports.isCheerio = isCheerio;
/**
 * Convert a string to camel case notation.
 *
 * @private
 * @category Utils
 * @param str - String to be converted.
 * @returns String in camel case notation.
 */
function camelCase(str) {
    return str.replace(/[_.-](\w|$)/g, function (_, x) { return x.toUpperCase(); });
}
exports.camelCase = camelCase;
/**
 * Convert a string from camel case to "CSS case", where word boundaries are
 * described by hyphens ("-") and all characters are lower-case.
 *
 * @private
 * @category Utils
 * @param str - String to be converted.
 * @returns String in "CSS case".
 */
function cssCase(str) {
    return str.replace(/[A-Z]/g, '-$&').toLowerCase();
}
exports.cssCase = cssCase;
/**
 * Iterate over each DOM element without creating intermediary Cheerio instances.
 *
 * This is indented for use internally to avoid otherwise unnecessary memory
 * pressure introduced by _make.
 *
 * @category Utils
 * @param array - Array to iterate over.
 * @param fn - Function to call.
 * @returns The original instance.
 */
function domEach(array, fn) {
    var len = array.length;
    for (var i = 0; i < len && fn(i, array[i]) !== false; i++)
        ;
    return array;
}
exports.domEach = domEach;
/**
 * Create a deep copy of the given DOM structure. Sets the parents of the copies
 * of the passed nodes to `null`.
 *
 * @private
 * @category Utils
 * @param dom - The htmlparser2-compliant DOM structure.
 * @returns - The cloned DOM.
 */
function cloneDom(dom) {
    var clone = 'length' in dom
        ? Array.prototype.map.call(dom, function (el) { return domhandler_1.cloneNode(el, true); })
        : [domhandler_1.cloneNode(dom, true)];
    // Add a root node around the cloned nodes
    var root = new domhandler_1.Document(clone);
    clone.forEach(function (node) {
        node.parent = root;
    });
    return clone;
}
exports.cloneDom = cloneDom;
/**
 * A simple way to check for HTML strings. Tests for a `<` within a string,
 * immediate followed by a letter and eventually followed by a `>`.
 *
 * @private
 */
var quickExpr = /<[a-zA-Z][^]*>/;
/**
 * Check if string is HTML.
 *
 * @private
 * @category Utils
 * @param str - String to check.
 * @returns Indicates if `str` is HTML.
 */
function isHtml(str) {
    // Run the regex
    return quickExpr.test(str);
}
exports.isHtml = isHtml;
