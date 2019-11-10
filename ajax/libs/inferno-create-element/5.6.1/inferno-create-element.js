(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
    (factory((global.Inferno = global.Inferno || {}),global.Inferno));
}(this, (function (exports,inferno) { 'use strict';

    var isBrowser = !!(typeof window !== 'undefined' && window.document);
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isInvalid(o) {
        return isNull(o) || o === false || isTrue(o) || isUndefined(o);
    }
    function isString(o) {
        return typeof o === 'string';
    }
    function isNull(o) {
        return o === null;
    }
    function isTrue(o) {
        return o === true;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === 'object';
    }

    var componentHooks = {
        onComponentDidMount: 1,
        onComponentDidUpdate: 1,
        onComponentShouldUpdate: 1,
        onComponentWillMount: 1,
        onComponentWillUnmount: 1,
        onComponentWillUpdate: 1
    };
    /**
     * Creates virtual node
     * @param {string|Function|Component<any, any>} type Type of node
     * @param {object=} props Optional props for virtual node
     * @param {...{object}=} _children Optional children for virtual node
     * @returns {VNode} new virtual ndoe
     */
    function createElement(type, props) {
        var _children = [], len = arguments.length - 2;
        while ( len-- > 0 ) _children[ len ] = arguments[ len + 2 ];

        if (isInvalid(type) || isObject(type)) {
            throw new Error('Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.');
        }
        var children = _children;
        var ref = null;
        var key = null;
        var className = null;
        var flags = 0;
        var newProps;
        if (_children) {
            if (_children.length === 1) {
                children = _children[0];
            }
            else if (_children.length === 0) {
                children = void 0;
            }
        }
        if (isString(type)) {
            flags = inferno.getFlagsForElementVnode(type);
            if (!isNullOrUndef(props)) {
                newProps = {};
                for (var prop in props) {
                    if (prop === 'className' || prop === 'class') {
                        className = props[prop];
                    }
                    else if (prop === 'key') {
                        key = props.key;
                    }
                    else if (prop === 'children' && isUndefined(children)) {
                        children = props.children; // always favour children args, default to props
                    }
                    else if (prop === 'ref') {
                        ref = props.ref;
                    }
                    else {
                        if (prop === 'contenteditable') {
                            flags |= 4096 /* ContentEditable */;
                        }
                        newProps[prop] = props[prop];
                    }
                }
            }
        }
        else {
            flags = 2 /* ComponentUnknown */;
            if (!isUndefined(children)) {
                if (!props) {
                    props = {};
                }
                props.children = children;
                children = null;
            }
            if (!isNullOrUndef(props)) {
                newProps = {};
                for (var prop$1 in props) {
                    if (componentHooks[prop$1] !== void 0) {
                        if (!ref) {
                            ref = {};
                        }
                        ref[prop$1] = props[prop$1];
                    }
                    else if (prop$1 === 'key') {
                        key = props.key;
                    }
                    else if (prop$1 === 'ref') {
                        ref = props.ref;
                    }
                    else {
                        newProps[prop$1] = props[prop$1];
                    }
                }
            }
            return inferno.createComponentVNode(flags, type, newProps, key, ref);
        }
        return inferno.createVNode(flags, type, className, children, 0 /* UnknownChildren */, newProps, key, ref);
    }

    exports.createElement = createElement;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
