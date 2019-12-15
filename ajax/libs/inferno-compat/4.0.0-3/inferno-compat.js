(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-clone-vnode'), require('inferno-create-class'), require('inferno-create-element')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-clone-vnode', 'inferno-create-class', 'inferno-create-element'], factory) :
    (factory((global.Inferno = global.Inferno || {}),global.Inferno,global.Inferno,global.Inferno,global.Inferno));
}(this, (function (exports,inferno,infernoCloneVnode,infernoCreateClass,infernoCreateElement) { 'use strict';

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var NO_OP = "$NO_OP";
    var ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== "undefined" && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isFunction(o) {
        return typeof o === "function";
    }
    function isString(o) {
        return typeof o === "string";
    }
    function isNull(o) {
        return o === null;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === "object";
    }
    function throwError(message) {
        if (!message) {
            message = ERROR_MSG;
        }
        throw new Error(("Inferno Error: " + message));
    }

    /**
     * @module Inferno-Compat
     */ /** TypeDoc Comment */
    function isValidElement(obj) {
        var isNotANullObject = isObject(obj) && isNull(obj) === false;
        if (isNotANullObject === false) {
            return false;
        }
        var flags = obj.flags;
        return (flags & (28 /* Component */ | 3970 /* Element */)) > 0;
    }

    /**
     * @module Inferno-Compat
     */
    /**
     * Inlined PropTypes, there is propType checking ATM.
     */
    // tslint:disable-next-line:no-empty
    function proptype() { }
    proptype.isRequired = proptype;
    var getProptype = function () { return proptype; };
    var PropTypes = {
        any: getProptype,
        array: proptype,
        arrayOf: getProptype,
        bool: proptype,
        checkPropTypes: function () { return null; },
        element: getProptype,
        func: proptype,
        instanceOf: getProptype,
        node: getProptype,
        number: proptype,
        object: proptype,
        objectOf: getProptype,
        oneOf: getProptype,
        oneOfType: getProptype,
        shape: getProptype,
        string: proptype,
        symbol: proptype
    };

    /**
     * This is a list of all SVG attributes that need special casing,
     * namespacing, or boolean value assignment.
     *
     * When adding attributes to this list, be sure to also add them to
     * the `possibleStandardNames` module to ensure casing and incorrect
     * name warnings.
     *
     * SVG Attributes List:
     * https://www.w3.org/TR/SVG/attindex.html
     * SMIL Spec:
     * https://www.w3.org/TR/smil
     */
    var ATTRS = [
        "accent-height",
        "alignment-baseline",
        "arabic-form",
        "baseline-shift",
        "cap-height",
        "clip-path",
        "clip-rule",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "dominant-baseline",
        "enable-background",
        "fill-opacity",
        "fill-rule",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-constiant",
        "font-weight",
        "glyph-name",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "horiz-adv-x",
        "horiz-origin-x",
        "image-rendering",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "overline-position",
        "overline-thickness",
        "paint-order",
        "panose-1",
        "pointer-events",
        "rendering-intent",
        "shape-rendering",
        "stop-color",
        "stop-opacity",
        "strikethrough-position",
        "strikethrough-thickness",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "underline-position",
        "underline-thickness",
        "unicode-bidi",
        "unicode-range",
        "units-per-em",
        "v-alphabetic",
        "v-hanging",
        "v-ideographic",
        "v-mathematical",
        "vector-effect",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "word-spacing",
        "writing-mode",
        "x-height",
        "xlink:actuate",
        "xlink:arcrole",
        "xlink:href",
        "xlink:role",
        "xlink:show",
        "xlink:title",
        "xlink:type",
        "xml:base",
        "xmlns:xlink",
        "xml:lang",
        "xml:space"
    ];
    var SVGDOMPropertyConfig = {};
    var CAMELIZE = /[\-\:]([a-z])/g;
    var capitalize = function (token) { return token[1].toUpperCase(); };
    ATTRS.forEach(function (original) {
        var reactName = original.replace(CAMELIZE, capitalize);
        SVGDOMPropertyConfig[reactName] = original;
    });

    /**
     * @module Inferno-Compat
     */ /** TypeDoc Comment */
    var componentToDOMNodeMap = new Map();
    inferno.options.findDOMNodeEnabled = true;
    function unmountComponentAtNode(container) {
        inferno.render(null, container);
        return true;
    }
    var ARR = [];
    var Children = {
        map: function map(children, fn, ctx) {
            if (isNullOrUndef(children)) {
                return children;
            }
            children = Children.toArray(children);
            if (ctx && ctx !== children) {
                fn = fn.bind(ctx);
            }
            return children.map(fn);
        },
        forEach: function forEach(children, fn, ctx) {
            if (isNullOrUndef(children)) {
                return;
            }
            children = Children.toArray(children);
            if (ctx && ctx !== children) {
                fn = fn.bind(ctx);
            }
            for (var i = 0, len = children.length; i < len; i++) {
                fn(children[i], i, children);
            }
        },
        count: function count(children) {
            children = Children.toArray(children);
            return children.length;
        },
        only: function only(children) {
            children = Children.toArray(children);
            if (children.length !== 1) {
                throw new Error("Children.only() expects only one child.");
            }
            return children[0];
        },
        toArray: function toArray$$1(children) {
            if (isNullOrUndef(children)) {
                return [];
            }
            return isArray(children) ? children : ARR.concat(children);
        }
    };
    inferno.Component.prototype.isReactComponent = {};
    var currentComponent = null;
    inferno.options.beforeRender = function (component) {
        currentComponent = component;
    };
    inferno.options.afterRender = function () {
        currentComponent = null;
    };
    var nextAfterMount = inferno.options.afterMount;
    inferno.options.afterMount = function (vNode) {
        if (inferno.options.findDOMNodeEnabled) {
            componentToDOMNodeMap.set(vNode.children, vNode.dom);
        }
        if (nextAfterMount) {
            nextAfterMount(vNode);
        }
    };
    var nextAfterUpdate = inferno.options.afterUpdate;
    inferno.options.afterUpdate = function (vNode) {
        if (inferno.options.findDOMNodeEnabled) {
            componentToDOMNodeMap.set(vNode.children, vNode.dom);
        }
        if (nextAfterUpdate) {
            nextAfterUpdate(vNode);
        }
    };
    var nextBeforeUnmount = inferno.options.beforeUnmount;
    inferno.options.beforeUnmount = function (vNode) {
        if (inferno.options.findDOMNodeEnabled) {
            componentToDOMNodeMap.delete(vNode.children);
        }
        if (nextBeforeUnmount) {
            nextBeforeUnmount(vNode);
        }
    };
    var version = "15.4.2";
    function normalizeProps(name, props) {
        if ((name === "input" || name === "textarea") &&
            props.type !== "radio" &&
            props.onChange) {
            var type = props.type;
            var eventName;
            if (type === "checkbox") {
                eventName = "onclick";
            }
            else if (type === "file") {
                eventName = "onchange";
            }
            else {
                eventName = "oninput";
            }
            if (!props[eventName]) {
                props[eventName] = props.onChange;
                delete props.onChange;
            }
        }
        for (var prop in props) {
            if (prop === "onDoubleClick") {
                props.onDblClick = props[prop];
                delete props[prop];
            }
            if (prop === "htmlFor") {
                props.for = props[prop];
                delete props[prop];
            }
            var mappedProp = SVGDOMPropertyConfig[prop];
            if (mappedProp && mappedProp !== prop) {
                props[mappedProp] = props[prop];
                delete props[prop];
            }
        }
    }
    // we need to add persist() to Event (as React has it for synthetic events)
    // this is a hack and we really shouldn't be modifying a global object this way,
    // but there isn't a performant way of doing this apart from trying to proxy
    // every prop event that starts with "on", i.e. onClick or onKeyPress
    // but in reality devs use onSomething for many things, not only for
    // input events
    if (typeof Event !== "undefined" && !Event.prototype.persist) {
        // tslint:disable-next-line:no-empty
        Event.prototype.persist = function () { };
    }
    function iterableToArray(iterable) {
        var iterStep;
        var tmpArr = [];
        do {
            iterStep = iterable.next();
            if (iterStep.value) {
                tmpArr.push(iterStep.value);
            }
        } while (!iterStep.done);
        return tmpArr;
    }
    var hasSymbolSupport = typeof Symbol !== "undefined";
    var injectStringRefs = function (originalFunction) {
        return function (name, _props) {
            var children = [], len$1 = arguments.length - 2;
            while ( len$1-- > 0 ) children[ len$1 ] = arguments[ len$1 + 2 ];

            var props = _props || {};
            var ref = props.ref;
            if (typeof ref === "string" && !isNull(currentComponent)) {
                currentComponent.refs = currentComponent.refs || {};
                props.ref = function (val) {
                    this.refs[ref] = val;
                }.bind(currentComponent);
            }
            if (typeof name === "string") {
                normalizeProps(name, props);
            }
            // React supports iterable children, in addition to Array-like
            if (hasSymbolSupport) {
                for (var i = 0, len = children.length; i < len; i++) {
                    var child = children[i];
                    if (child &&
                        !isArray(child) &&
                        !isString(child) &&
                        isFunction(child[Symbol.iterator])) {
                        children[i] = iterableToArray(child[Symbol.iterator]());
                    }
                }
            }
            var vnode = originalFunction.apply(void 0, [ name, props ].concat( children ));
            if (vnode.className) {
                vnode.props = vnode.props || {};
                vnode.props.className = vnode.className;
            }
            return vnode;
        };
    };
    var createElement$1 = injectStringRefs(infernoCreateElement.createElement);
    var cloneElement = injectStringRefs(infernoCloneVnode.cloneVNode);
    var oldCreateVNode = inferno.options.createVNode;
    inferno.options.createVNode = function (vNode) {
        var children = vNode.children;
        var props = vNode.props;
        if (isNullOrUndef(props)) {
            props = vNode.props = {};
        }
        if (!isNullOrUndef(children) && isNullOrUndef(props.children)) {
            props.children = children;
        }
        if (vNode.flags & 28 /* Component */) {
            if (isString(vNode.type)) {
                vNode.flags = inferno.getFlagsForElementVnode(vNode.type);
                if (props && props.children) {
                    vNode.children = props.children;
                    delete props.children;
                }
            }
        }
        if (oldCreateVNode) {
            oldCreateVNode(vNode);
        }
    };
    // Credit: preact-compat - https://github.com/developit/preact-compat :)
    function shallowDiffers(a, b) {
        for (var i in a) {
            if (!(i in b)) {
                return true;
            }
        }
        for (var i$1 in b) {
            if (a[i$1] !== b[i$1]) {
                return true;
            }
        }
        return false;
    }
    function PureComponent(props, context) {
        inferno.Component.call(this, props, context);
    }
    PureComponent.prototype = new inferno.Component({}, {});
    PureComponent.prototype.shouldComponentUpdate = function (props, state) {
        return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
    };
    var WrapperComponent = (function (Component$$1) {
        function WrapperComponent () {
            Component$$1.apply(this, arguments);
        }

        if ( Component$$1 ) WrapperComponent.__proto__ = Component$$1;
        WrapperComponent.prototype = Object.create( Component$$1 && Component$$1.prototype );
        WrapperComponent.prototype.constructor = WrapperComponent;

        WrapperComponent.prototype.getChildContext = function getChildContext () {
            // tslint:disable-next-line
            return this.props["context"];
        };
        WrapperComponent.prototype.render = function render$$1 (props) {
            return props.children;
        };

        return WrapperComponent;
    }(inferno.Component));
    function unstable_renderSubtreeIntoContainer(parentComponent, vNode, container, callback) {
        var wrapperVNode = inferno.createVNode(4, WrapperComponent, null, null, {
            children: vNode,
            context: parentComponent.context
        });
        var component = inferno.render(wrapperVNode, container);
        if (callback) {
            // callback gets the component as context, no other argument.
            callback.call(component);
        }
        return component;
    }
    // Credit: preact-compat - https://github.com/developit/preact-compat
    var ELEMENTS = "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan".split(" ");
    function createFactory(type) {
        return createElement$1.bind(null, type);
    }
    var DOM = {};
    for (var i = ELEMENTS.length; i--;) {
        DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
    }
    function findDOMNode(ref) {
        if (!inferno.options.findDOMNodeEnabled) {
            {
                throwError("findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!");
            }
            throwError();
        }
        var dom = ref && ref.nodeType ? ref : null;
        return componentToDOMNodeMap.get(ref) || dom;
    }
    // Mask React global in browser enviornments when React is not used.
    if (isBrowser && typeof window.React === "undefined") {
        var exports$1 = {
            Children: Children,
            Component: inferno.Component,
            DOM: DOM,
            EMPTY_OBJ: inferno.EMPTY_OBJ,
            NO_OP: NO_OP,
            PropTypes: PropTypes,
            PureComponent: PureComponent,
            cloneElement: cloneElement,
            cloneVNode: infernoCloneVnode.cloneVNode,
            createClass: infernoCreateClass.createClass,
            createElement: createElement$1,
            createFactory: createFactory,
            createVNode: inferno.createVNode,
            findDOMNode: findDOMNode,
            isValidElement: isValidElement,
            render: inferno.render,
            unmountComponentAtNode: unmountComponentAtNode,
            unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
            version: version
        };
        window.React = exports$1;
        window.ReactDOM = exports$1;
    }

    exports.Children = Children;
    exports.Component = inferno.Component;
    exports.DOM = DOM;
    exports.EMPTY_OBJ = inferno.EMPTY_OBJ;
    exports.NO_OP = NO_OP;
    exports.PropTypes = PropTypes;
    exports.PureComponent = PureComponent;
    exports.cloneElement = cloneElement;
    exports.cloneVNode = infernoCloneVnode.cloneVNode;
    exports.createClass = infernoCreateClass.createClass;
    exports.createElement = createElement$1;
    exports.createFactory = createFactory;
    exports.createVNode = inferno.createVNode;
    exports.findDOMNode = findDOMNode;
    exports.isValidElement = isValidElement;
    exports.render = inferno.render;
    exports.unmountComponentAtNode = unmountComponentAtNode;
    exports.unstable_renderSubtreeIntoContainer = unstable_renderSubtreeIntoContainer;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
