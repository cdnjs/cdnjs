"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cheerio = void 0;
var tslib_1 = require("tslib");
var parse_1 = tslib_1.__importDefault(require("./parse"));
var options_1 = tslib_1.__importStar(require("./options"));
var utils_1 = require("./utils");
var Static = tslib_1.__importStar(require("./static"));
var Attributes = tslib_1.__importStar(require("./api/attributes"));
var Traversing = tslib_1.__importStar(require("./api/traversing"));
var Manipulation = tslib_1.__importStar(require("./api/manipulation"));
var Css = tslib_1.__importStar(require("./api/css"));
var Forms = tslib_1.__importStar(require("./api/forms"));
/*
 * The API
 */
var api = [Attributes, Traversing, Manipulation, Css, Forms];
var Cheerio = /** @class */ (function () {
    /**
     * Instance of cheerio. Methods are specified in the modules. Usage of this
     * constructor is not recommended. Please use $.load instead.
     *
     * @private
     * @param selector - The new selection.
     * @param context - Context of the selection.
     * @param root - Sets the root node.
     * @param options - Options for the instance.
     */
    function Cheerio(selector, context, root, options) {
        var _this = this;
        if (!(this instanceof Cheerio)) {
            return new Cheerio(selector, context, root, options);
        }
        this.length = 0;
        this.options = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, options_1.default), this.options), options_1.flatten(options));
        // $(), $(null), $(undefined), $(false)
        if (!selector)
            return this;
        if (root) {
            if (typeof root === 'string')
                root = parse_1.default(root, this.options, false);
            this._root = Cheerio.call(this, root);
        }
        // $($)
        if (utils_1.isCheerio(selector))
            return selector;
        var elements = typeof selector === 'string' && utils_1.isHtml(selector)
            ? // $(<html>)
                parse_1.default(selector, this.options, false).children
            : isNode(selector)
                ? // $(dom)
                    [selector]
                : Array.isArray(selector)
                    ? // $([dom])
                        selector
                    : null;
        if (elements) {
            elements.forEach(function (elem, idx) {
                _this[idx] = elem;
            });
            this.length = elements.length;
            return this;
        }
        // We know that our selector is a string now.
        var search = selector;
        var searchContext = !context
            ? // If we don't have a context, maybe we have a root, from loading
                this._root
            : typeof context === 'string'
                ? utils_1.isHtml(context)
                    ? // $('li', '<ul>...</ul>')
                        new Cheerio(parse_1.default(context, this.options, false))
                    : // $('li', 'ul')
                        ((search = context + " " + search), this._root)
                : utils_1.isCheerio(context)
                    ? // $('li', $)
                        context
                    : // $('li', node), $('li', [nodes])
                        new Cheerio(context);
        // If we still don't have a context, return
        if (!searchContext)
            return this;
        /*
         * #id, .class, tag
         */
        // @ts-expect-error No good way to type this — we will always return `Cheerio<Element>` here.
        return searchContext.find(search);
    }
    /**
     * Make a cheerio object.
     *
     * @private
     * @param dom - The contents of the new object.
     * @param context - The context of the new object.
     * @returns The new cheerio object.
     */
    Cheerio.prototype._make = function (dom, context, root) {
        if (root === void 0) { root = this._root; }
        var cheerio = new this.constructor(dom, context, root, this.options);
        cheerio.prevObject = this;
        return cheerio;
    };
    /**
     * Retrieve all the DOM elements contained in the jQuery set as an array.
     *
     * @example
     *
     * ```js
     * $('li').toArray();
     * //=> [ {...}, {...}, {...} ]
     * ```
     *
     * @returns The contained items.
     */
    Cheerio.prototype.toArray = function () {
        return this.get();
    };
    Cheerio.html = Static.html;
    Cheerio.xml = Static.xml;
    Cheerio.text = Static.text;
    Cheerio.parseHTML = Static.parseHTML;
    Cheerio.root = Static.root;
    Cheerio.contains = Static.contains;
    Cheerio.merge = Static.merge;
    /** Mimic jQuery's prototype alias for plugin authors. */
    Cheerio.fn = Cheerio.prototype;
    return Cheerio;
}());
exports.Cheerio = Cheerio;
/** Set a signature of the object. */
Cheerio.prototype.cheerio = '[cheerio object]';
/*
 * Make cheerio an array-like object
 */
Cheerio.prototype.splice = Array.prototype.splice;
// Support for (const element of $(...)) iteration:
Cheerio.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// Plug in the API
api.forEach(function (mod) { return Object.assign(Cheerio.prototype, mod); });
function isNode(obj) {
    return (!!obj.name ||
        obj.type === 'root' ||
        obj.type === 'text' ||
        obj.type === 'comment');
}
// Make it possible to call Cheerio without using `new`.
exports.default = Cheerio;
