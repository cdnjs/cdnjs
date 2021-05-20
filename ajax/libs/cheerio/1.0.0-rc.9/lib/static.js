"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.contains = exports.root = exports.parseHTML = exports.text = exports.xml = exports.html = void 0;
var tslib_1 = require("tslib");
var options_1 = tslib_1.__importStar(require("./options"));
var cheerio_select_1 = require("cheerio-select");
var htmlparser2_1 = require("htmlparser2");
var parse5_1 = require("./parsers/parse5");
var htmlparser2_2 = require("./parsers/htmlparser2");
/**
 * Helper function to render a DOM.
 *
 * @param that - Cheerio instance to render.
 * @param dom - The DOM to render. Defaults to `that`'s root.
 * @param options - Options for rendering.
 * @returns The rendered document.
 */
function render(that, dom, options) {
    var _a, _b;
    if (!dom) {
        if ((_a = that === null || that === void 0 ? void 0 : that._root) === null || _a === void 0 ? void 0 : _a.children) {
            dom = that._root.children;
        }
        else {
            return '';
        }
    }
    else if (typeof dom === 'string') {
        dom = cheerio_select_1.select(dom, (_b = that === null || that === void 0 ? void 0 : that._root) !== null && _b !== void 0 ? _b : [], options);
    }
    return options.xmlMode || options._useHtmlParser2
        ? // FIXME: Pull in new version of dom-serializer to fix this.
            htmlparser2_2.render(dom, options)
        : parse5_1.render(dom);
}
/**
 * Checks if a passed object is an options object.
 *
 * @param dom - Object to check if it is an options object.
 * @returns Whether the object is an options object.
 */
function isOptions(dom) {
    return (typeof dom === 'object' &&
        dom != null &&
        !('length' in dom) &&
        !('type' in dom));
}
function html(dom, options) {
    /*
     * Be flexible about parameters, sometimes we call html(),
     * with options as only parameter
     * check dom argument for dom element specific properties
     * assume there is no 'length' or 'type' properties in the options object
     */
    if (!options && isOptions(dom)) {
        options = dom;
        dom = undefined;
    }
    /*
     * Sometimes `$.html()` is used without preloading html,
     * so fallback non-existing options to the default ones.
     */
    options = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, options_1.default), (this ? this._options : {})), options_1.flatten(options !== null && options !== void 0 ? options : {}));
    return render(this || undefined, dom, options);
}
exports.html = html;
/**
 * Render the document as XML.
 *
 * @param dom - Element to render.
 * @returns THe rendered document.
 */
function xml(dom) {
    var options = tslib_1.__assign(tslib_1.__assign({}, this._options), { xmlMode: true });
    return render(this, dom, options);
}
exports.xml = xml;
/**
 * Render the document as text.
 *
 * @param elements - Elements to render.
 * @returns The rendered document.
 */
function text(elements) {
    var elems = elements ? elements : this ? this.root() : [];
    var ret = '';
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (htmlparser2_1.DomUtils.isText(elem))
            ret += elem.data;
        else if (htmlparser2_1.DomUtils.hasChildren(elem) &&
            elem.type !== htmlparser2_1.ElementType.Comment &&
            elem.type !== htmlparser2_1.ElementType.Script &&
            elem.type !== htmlparser2_1.ElementType.Style) {
            ret += text(elem.children);
        }
    }
    return ret;
}
exports.text = text;
function parseHTML(data, context, keepScripts) {
    if (keepScripts === void 0) { keepScripts = typeof context === 'boolean' ? context : false; }
    if (!data || typeof data !== 'string') {
        return null;
    }
    if (typeof context === 'boolean') {
        keepScripts = context;
    }
    var parsed = this.load(data, options_1.default, false);
    if (!keepScripts) {
        parsed('script').remove();
    }
    /*
     * The `children` array is used by Cheerio internally to group elements that
     * share the same parents. When nodes created through `parseHTML` are
     * inserted into previously-existing DOM structures, they will be removed
     * from the `children` array. The results of `parseHTML` should remain
     * constant across these operations, so a shallow copy should be returned.
     */
    return parsed.root()[0].children.slice();
}
exports.parseHTML = parseHTML;
/**
 * Sometimes you need to work with the top-level root element. To query it, you
 * can use `$.root()`.
 *
 * @example
 *
 * ```js
 * $.root().append('<ul id="vegetables"></ul>').html();
 * //=> <ul id="fruits">...</ul><ul id="vegetables"></ul>
 * ```
 *
 * @returns Cheerio instance wrapping the root node.
 * @alias Cheerio.root
 */
function root() {
    var fn = this;
    return fn(this._root);
}
exports.root = root;
/**
 * Checks to see if the `contained` DOM element is a descendant of the
 * `container` DOM element.
 *
 * @param container - Potential parent node.
 * @param contained - Potential child node.
 * @returns Indicates if the nodes contain one another.
 * @alias Cheerio.contains
 * @see {@link https://api.jquery.com/jQuery.contains/}
 */
function contains(container, contained) {
    // According to the jQuery API, an element does not "contain" itself
    if (contained === container) {
        return false;
    }
    /*
     * Step up the descendants, stopping when the root element is reached
     * (signaled by `.parent` returning a reference to the same object)
     */
    var next = contained;
    while (next && next !== next.parent) {
        next = next.parent;
        if (next === container) {
            return true;
        }
    }
    return false;
}
exports.contains = contains;
/**
 * $.merge().
 *
 * @param arr1 - First array.
 * @param arr2 - Second array.
 * @returns `arr1`, with elements of `arr2` inserted.
 * @alias Cheerio.merge
 * @see {@link https://api.jquery.com/jQuery.merge/}
 */
function merge(arr1, arr2) {
    if (!isArrayLike(arr1) || !isArrayLike(arr2)) {
        return;
    }
    var newLength = arr1.length;
    var len = +arr2.length;
    for (var i = 0; i < len; i++) {
        arr1[newLength++] = arr2[i];
    }
    arr1.length = newLength;
    return arr1;
}
exports.merge = merge;
/**
 * @param item - Item to check.
 * @returns Indicates if the item is array-like.
 */
function isArrayLike(item) {
    if (Array.isArray(item)) {
        return true;
    }
    if (typeof item !== 'object' ||
        !Object.prototype.hasOwnProperty.call(item, 'length') ||
        typeof item.length !== 'number' ||
        item.length < 0) {
        return false;
    }
    for (var i = 0; i < item.length; i++) {
        if (!(i in item)) {
            return false;
        }
    }
    return true;
}
