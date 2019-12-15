(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('inferno')) :
    typeof define === 'function' && define.amd ? define(['inferno'], factory) :
    (global.Inferno = global.Inferno || {}, global.Inferno.h = factory(global.Inferno));
}(this, (function (inferno) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== "undefined" && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isStringOrNumber(o) {
        var type = typeof o;
        return type === "string" || type === "number";
    }
    function isString(o) {
        return typeof o === "string";
    }
    function isUndefined(o) {
        return o === void 0;
    }

    /**
     * @module Inferno-Hyperscript
     */ /** TypeDoc Comment */
    var classIdSplit = /([.#]?[a-zA-Z0-9_:-]+)/;
    var notClassId = /^\.|#/;
    function parseTag(tag, props) {
        if (!tag) {
            return "div";
        }
        var noId = props && isUndefined(props.id);
        var tagParts = tag.split(classIdSplit);
        var tagName = null;
        if (notClassId.test(tagParts[1])) {
            tagName = "div";
        }
        var classes;
        for (var i = 0, len = tagParts.length; i < len; i++) {
            var part = tagParts[i];
            if (!part) {
                continue;
            }
            var type = part.charAt(0);
            if (!tagName) {
                tagName = part;
            }
            else if (type === ".") {
                if (classes === void 0) {
                    classes = [];
                }
                classes.push(part.substring(1, part.length));
            }
            else if (type === "#" && noId) {
                props.id = part.substring(1, part.length);
            }
        }
        if (classes) {
            if (props.className) {
                classes.push(props.className);
            }
            props.className = classes.join(" ");
        }
        return tagName || "div";
    }
    function isChildren(x) {
        return isStringOrNumber(x) || (x && isArray(x));
    }
    function extractProps(_props, isElement, _tag) {
        _props = _props || {};
        var tag = isElement ? parseTag(_tag, _props) : _tag;
        var newProps = {};
        var key = null;
        var ref = null;
        var children = null;
        var className = null;
        for (var prop in _props) {
            if (isElement && (prop === "className" || prop === "class")) {
                className = _props[prop];
            }
            else if (prop === "key") {
                key = _props[prop];
            }
            else if (prop === "ref") {
                ref = _props[prop];
            }
            else if (prop === "hooks") {
                ref = _props[prop];
            }
            else if (prop === "children") {
                children = _props[prop];
            }
            else if (!isElement && prop.substr(0, 11) === "onComponent") {
                if (!ref) {
                    ref = {};
                }
                ref[prop] = _props[prop];
            }
            else {
                newProps[prop] = _props[prop];
            }
        }
        return { tag: tag, props: newProps, key: key, ref: ref, children: children, className: className };
    }
    /**
     * Creates virtual node
     * @param {string|VNode|Function} _tag Name for virtual node
     * @param {object=} _props Additional properties for virtual node
     * @param {string|number|VNode|Array<string|number|VNode>|null=} _children Optional children for virtual node
     * @returns {VNode} returns new virtual node
     */
    function hyperscript(_tag, _props, _children) {
        // If a child array or text node are passed as the second argument, shift them
        if (!_children && isChildren(_props)) {
            _children = _props;
            _props = {};
        }
        var isElement = isString(_tag);
        var ref$1 = extractProps(_props, isElement, _tag);
        var tag = ref$1.tag;
        var props = ref$1.props;
        var key = ref$1.key;
        var ref = ref$1.ref;
        var children = ref$1.children;
        var className = ref$1.className;
        if (isElement) {
            return inferno.createVNode(inferno.getFlagsForElementVnode(tag), tag, className, _children || children, props, key, ref);
        }
        else {
            if (children || _children) {
                props.children = children || _children;
            }
            return inferno.createVNode(16 /* ComponentUnknown */, tag, className, null, props, key, ref);
        }
    }

    return hyperscript;

})));
