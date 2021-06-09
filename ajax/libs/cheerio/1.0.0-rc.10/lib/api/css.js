"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.css = void 0;
var utils_1 = require("../utils");
function css(prop, val) {
    if ((prop != null && val != null) ||
        // When `prop` is a "plain" object
        (typeof prop === 'object' && !Array.isArray(prop))) {
        return utils_1.domEach(this, function (el, i) {
            if (utils_1.isTag(el)) {
                // `prop` can't be an array here anymore.
                setCss(el, prop, val, i);
            }
        });
    }
    return getCss(this[0], prop);
}
exports.css = css;
/**
 * Set styles of all elements.
 *
 * @private
 * @param el - Element to set style of.
 * @param prop - Name of property.
 * @param value - Value to set property to.
 * @param idx - Optional index within the selection.
 */
function setCss(el, prop, value, idx) {
    if (typeof prop === 'string') {
        var styles = getCss(el);
        var val = typeof value === 'function' ? value.call(el, idx, styles[prop]) : value;
        if (val === '') {
            delete styles[prop];
        }
        else if (val != null) {
            styles[prop] = val;
        }
        el.attribs.style = stringify(styles);
    }
    else if (typeof prop === 'object') {
        Object.keys(prop).forEach(function (k, i) {
            setCss(el, k, prop[k], i);
        });
    }
}
function getCss(el, prop) {
    if (!el || !utils_1.isTag(el))
        return;
    var styles = parse(el.attribs.style);
    if (typeof prop === 'string') {
        return styles[prop];
    }
    if (Array.isArray(prop)) {
        var newStyles_1 = {};
        prop.forEach(function (item) {
            if (styles[item] != null) {
                newStyles_1[item] = styles[item];
            }
        });
        return newStyles_1;
    }
    return styles;
}
/**
 * Stringify `obj` to styles.
 *
 * @private
 * @category CSS
 * @param obj - Object to stringify.
 * @returns The serialized styles.
 */
function stringify(obj) {
    return Object.keys(obj).reduce(function (str, prop) { return "" + str + (str ? ' ' : '') + prop + ": " + obj[prop] + ";"; }, '');
}
/**
 * Parse `styles`.
 *
 * @private
 * @category CSS
 * @param styles - Styles to be parsed.
 * @returns The parsed styles.
 */
function parse(styles) {
    styles = (styles || '').trim();
    if (!styles)
        return {};
    return styles.split(';').reduce(function (obj, str) {
        var n = str.indexOf(':');
        // Skip if there is no :, or if it is the first/last character
        if (n < 1 || n === str.length - 1)
            return obj;
        obj[str.slice(0, n).trim()] = str.slice(n + 1).trim();
        return obj;
    }, {});
}
