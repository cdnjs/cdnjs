(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobx'), require('inferno'), require('inferno-create-class'), require('inferno-create-element'), require('hoist-non-inferno-statics')) :
    typeof define === 'function' && define.amd ? define(['exports', 'mobx', 'inferno', 'inferno-create-class', 'inferno-create-element', 'hoist-non-inferno-statics'], factory) :
    (factory((global.Inferno = global.Inferno || {}, global.Inferno.Mobx = global.Inferno.Mobx || {}),global.mobx,global.Inferno,global.Inferno,global.Inferno,global.hoistNonReactStatics));
}(this, (function (exports,mobx,inferno,infernoCreateClass,infernoCreateElement,hoistNonReactStatics) { 'use strict';

    hoistNonReactStatics = hoistNonReactStatics && hoistNonReactStatics.hasOwnProperty('default') ? hoistNonReactStatics['default'] : hoistNonReactStatics;

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    // This should be boolean and not reference to window.document
    var isBrowser$1 = !!(typeof window !== 'undefined' && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray$1 = Array.isArray;
    function isStringOrNumber(o) {
        var type = typeof o;
        return type === 'string' || type === 'number';
    }
    function isInvalid(o) {
        return isNull$1(o) || o === false || isTrue(o) || isUndefined$1(o);
    }
    function isNull$1(o) {
        return o === null;
    }
    function isTrue(o) {
        return o === true;
    }
    function isUndefined$1(o) {
        return o === void 0;
    }
    function combineFrom(first, second) {
        var out = {};
        if (first) {
            for (var key in first) {
                out[key] = first[key];
            }
        }
        if (second) {
            for (var key$1 in second) {
                out[key$1] = second[key$1];
            }
        }
        return out;
    }

    /**
     * @module Inferno-Clone-VNode
     */ /** TypeDoc Comment */
    /*
     directClone is preferred over cloneVNode and used internally also.
     This function makes Inferno backwards compatible.
     And can be tree-shaked by modern bundlers

     Would be nice to combine this with directClone but could not do it without breaking change
    */
    /**
     * Clones given virtual node by creating new instance of it
     * @param {VNode} vNodeToClone virtual node to be cloned
     * @param {Props=} props additional props for new virtual node
     * @param {...*} _children new children for new virtual node
     * @returns {VNode} new virtual node
     */
    function cloneVNode(vNodeToClone, props) {
        var arguments$1 = arguments;

        var _children = [], len$2 = arguments.length - 2;
        while ( len$2-- > 0 ) { _children[ len$2 ] = arguments$1[ len$2 + 2 ]; }

        var children = _children;
        var childrenLen = _children.length;
        if (childrenLen > 0 && !isUndefined$1(_children[0])) {
            if (!props) {
                props = {};
            }
            if (childrenLen === 1) {
                children = _children[0];
            }
            if (!isUndefined$1(children)) {
                props.children = children;
            }
        }
        var newVNode;
        if (isArray$1(vNodeToClone)) {
            var tmpArray = [];
            for (var i = 0, len = vNodeToClone.length; i < len; i++) {
                tmpArray.push(inferno.directClone(vNodeToClone[i]));
            }
            newVNode = tmpArray;
        }
        else {
            var flags = vNodeToClone.flags;
            var className = vNodeToClone.className;
            var key = vNodeToClone.key;
            var ref = vNodeToClone.ref;
            if (props) {
                if (!isUndefined$1(props.className)) {
                    className = props.className;
                }
                if (!isUndefined$1(props.ref)) {
                    ref = props.ref;
                }
                if (!isUndefined$1(props.key)) {
                    key = props.key;
                }
            }
            if (flags & 14 /* Component */) {
                newVNode = inferno.createComponentVNode(flags, vNodeToClone.type, !vNodeToClone.props && !props
                    ? inferno.EMPTY_OBJ
                    : combineFrom(vNodeToClone.props, props), key, ref);
                var newProps = newVNode.props;
                if (newProps) {
                    var newChildren = newProps.children;
                    // we need to also clone component children that are in props
                    // as the children may also have been hoisted
                    if (newChildren) {
                        if (isArray$1(newChildren)) {
                            var len$1 = newChildren.length;
                            if (len$1 > 0) {
                                var tmpArray$1 = [];
                                for (var i$1 = 0; i$1 < len$1; i$1++) {
                                    var child = newChildren[i$1];
                                    if (isStringOrNumber(child)) {
                                        tmpArray$1.push(child);
                                    }
                                    else if (!isInvalid(child) && child.flags) {
                                        tmpArray$1.push(inferno.directClone(child));
                                    }
                                }
                                newProps.children = tmpArray$1;
                            }
                        }
                        else if (newChildren.flags) {
                            newProps.children = inferno.directClone(newChildren);
                        }
                    }
                }
                newVNode.children = null;
            }
            else if (flags & 993 /* Element */) {
                children =
                    props && !isUndefined$1(props.children)
                        ? props.children
                        : vNodeToClone.children;
                newVNode = inferno.normalizeChildren(inferno.createVNode(flags, vNodeToClone.type, className, null, 1 /* HasInvalidChildren */, !vNodeToClone.props && !props
                    ? inferno.EMPTY_OBJ
                    : combineFrom(vNodeToClone.props, props), key, ref), children);
            }
            else if (flags & 16 /* Text */) {
                newVNode = inferno.createTextVNode(vNodeToClone.children);
            }
        }
        return inferno.normalizeProps(newVNode);
    }

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    var NO_OP = '$NO_OP';
    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    // This should be boolean and not reference to window.document
    var isBrowser = !!(typeof window !== 'undefined' && window.document);
    // this is MUCH faster than .constructor === Array and instanceof Array
    // in Node 7 and the later versions of V8, slower in older versions though
    var isArray = Array.isArray;
    function isNullOrUndef(o) {
        return isUndefined(o) || isNull(o);
    }
    function isFunction(o) {
        return typeof o === 'function';
    }
    function isString(o) {
        return typeof o === 'string';
    }
    function isNull(o) {
        return o === null;
    }
    function isUndefined(o) {
        return o === void 0;
    }
    function isObject(o) {
        return typeof o === 'object';
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
        return (flags & (14 /* Component */ | 993 /* Element */)) > 0;
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
        'accent-height',
        'alignment-baseline',
        'arabic-form',
        'baseline-shift',
        'cap-height',
        'clip-path',
        'clip-rule',
        'color-interpolation',
        'color-interpolation-filters',
        'color-profile',
        'color-rendering',
        'dominant-baseline',
        'enable-background',
        'fill-opacity',
        'fill-rule',
        'flood-color',
        'flood-opacity',
        'font-family',
        'font-size',
        'font-size-adjust',
        'font-stretch',
        'font-style',
        'font-constiant',
        'font-weight',
        'glyph-name',
        'glyph-orientation-horizontal',
        'glyph-orientation-vertical',
        'horiz-adv-x',
        'horiz-origin-x',
        'image-rendering',
        'letter-spacing',
        'lighting-color',
        'marker-end',
        'marker-mid',
        'marker-start',
        'overline-position',
        'overline-thickness',
        'paint-order',
        'panose-1',
        'pointer-events',
        'rendering-intent',
        'shape-rendering',
        'stop-color',
        'stop-opacity',
        'strikethrough-position',
        'strikethrough-thickness',
        'stroke-dasharray',
        'stroke-dashoffset',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-miterlimit',
        'stroke-opacity',
        'stroke-width',
        'text-anchor',
        'text-decoration',
        'text-rendering',
        'underline-position',
        'underline-thickness',
        'unicode-bidi',
        'unicode-range',
        'units-per-em',
        'v-alphabetic',
        'v-hanging',
        'v-ideographic',
        'v-mathematical',
        'vector-effect',
        'vert-adv-y',
        'vert-origin-x',
        'vert-origin-y',
        'word-spacing',
        'writing-mode',
        'x-height',
        'xlink:actuate',
        'xlink:arcrole',
        'xlink:href',
        'xlink:role',
        'xlink:show',
        'xlink:title',
        'xlink:type',
        'xml:base',
        'xmlns:xlink',
        'xml:lang',
        'xml:space'
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
                throw new Error('Children.only() expects only one child.');
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
    var version = '15.4.2';
    function normalizeProps$1(name, props) {
        if ((name === 'input' || name === 'textarea') &&
            props.type !== 'radio' &&
            props.onChange) {
            var type = props.type;
            var eventName;
            if (type === 'checkbox') {
                eventName = 'onclick';
            }
            else if (type === 'file') {
                eventName = 'onchange';
            }
            else {
                eventName = 'oninput';
            }
            if (!props[eventName]) {
                props[eventName] = props.onChange;
                delete props.onChange;
            }
        }
        for (var prop in props) {
            if (prop === 'onDoubleClick') {
                props.onDblClick = props[prop];
                delete props[prop];
            }
            if (prop === 'htmlFor') {
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
    if (typeof Event !== 'undefined' && !Event.prototype.persist) {
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
    var hasSymbolSupport = typeof Symbol !== 'undefined';
    var injectStringRefs = function (originalFunction) {
        return function (name, _props) {
            var arguments$1 = arguments;

            var children = [], len$1 = arguments.length - 2;
            while ( len$1-- > 0 ) { children[ len$1 ] = arguments$1[ len$1 + 2 ]; }

            var props = _props || {};
            var ref = props.ref;
            if (typeof ref === 'string' && !isNull(currentComponent)) {
                currentComponent.refs = currentComponent.refs || {};
                props.ref = function (val) {
                    this.refs[ref] = val;
                }.bind(currentComponent);
            }
            if (typeof name === 'string') {
                normalizeProps$1(name, props);
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
    var cloneElement = injectStringRefs(cloneVNode);
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
        if (vNode.flags & 14 /* Component */) {
            if (isString(vNode.type)) {
                vNode.flags = inferno.getFlagsForElementVnode(vNode.type);
                if (props && props.children) {
                    inferno.normalizeChildren(vNode, props.children);
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

        if ( Component$$1 ) { WrapperComponent.__proto__ = Component$$1; }
        WrapperComponent.prototype = Object.create( Component$$1 && Component$$1.prototype );
        WrapperComponent.prototype.constructor = WrapperComponent;

        WrapperComponent.prototype.getChildContext = function getChildContext () {
            // tslint:disable-next-line
            return this.props['context'];
        };
        WrapperComponent.prototype.render = function render$$1 (props) {
            return props.children;
        };

        return WrapperComponent;
    }(inferno.Component));
    function unstable_renderSubtreeIntoContainer(parentComponent, vNode, container, callback) {
        var wrapperVNode = inferno.createComponentVNode(4 /* ComponentClass */, WrapperComponent, {
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
    var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');
    function createFactory(type) {
        return createElement$1.bind(null, type);
    }
    var DOM = {};
    for (var i = ELEMENTS.length; i--;) {
        DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
    }
    function findDOMNode(ref) {
        if (!inferno.options.findDOMNodeEnabled) {
            throwError();
        }
        var dom = ref && ref.nodeType ? ref : null;
        return componentToDOMNodeMap.get(ref) || dom;
    }
    // Mask React global in browser enviornments when React is not used.
    if (isBrowser && typeof window.React === 'undefined') {
        var exports$1 = {
            Children: Children,
            Component: inferno.Component,
            DOM: DOM,
            EMPTY_OBJ: inferno.EMPTY_OBJ,
            NO_OP: NO_OP,
            PropTypes: PropTypes,
            PureComponent: PureComponent,
            cloneElement: cloneElement,
            cloneVNode: cloneVNode,
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

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    var EventEmitter = function EventEmitter() {
        this.listeners = [];
    };
    EventEmitter.prototype.on = function on (cb) {
            var this$1 = this;

        this.listeners.push(cb);
        return function () {
            var index = this$1.listeners.indexOf(cb);
            if (index !== -1) {
                this$1.listeners.splice(index, 1);
            }
        };
    };
    EventEmitter.prototype.emit = function emit (data) {
        var listeners = this.listeners;
        for (var i = 0, len = listeners.length; i < len; i++) {
            listeners[i](data);
        }
    };

    /**
     * @module Inferno-Shared
     */ /** TypeDoc Comment */
    // This should be boolean and not reference to window.document
    var isBrowser$2 = !!(typeof window !== 'undefined' && window.document);
    function warning(message) {
        // tslint:disable-next-line:no-console
        console.error(message);
    }

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    function isStateless(component) {
        return !(component.prototype && component.prototype.render);
    }

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    /**
     * dev tool support
     */
    var isDevtoolsEnabled = false;
    var isUsingStaticRendering = false;
    var warnedAboutObserverInjectDeprecation = false;
    var componentByNodeRegistery = new WeakMap();
    var renderReporter = new EventEmitter();
    function findNode(component) {
        if (inferno.options.findDOMNodeEnabled) {
            return findDOMNode(component);
        }
        return null;
    }
    function reportRendering(component) {
        var node = findNode(component);
        if (node) {
            componentByNodeRegistery.set(node, component);
        }
        renderReporter.emit({
            component: component,
            event: 'render',
            node: node,
            renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
            totalTime: Date.now() - component.__$mobRenderStart
        });
    }
    function trackComponents() {
        if (!isDevtoolsEnabled) {
            isDevtoolsEnabled = true;
            inferno.options.findDOMNodeEnabled = true;
            warning('Do not turn trackComponents on in production, its expensive. For tracking dom nodes you need inferno-compat.');
        }
    }
    function useStaticRendering(useStatic) {
        isUsingStaticRendering = useStatic;
    }
    /**
     * Errors reporter
     */
    var errorsReporter = new EventEmitter();
    /**
     * Utilities
     */
    function patch(target, funcName, runMixinFirst) {
        if ( runMixinFirst === void 0 ) runMixinFirst = false;

        var base = target[funcName];
        var mixinFunc = reactiveMixin[funcName];
        // MWE: ideally we freeze here to protect against accidental overwrites in component instances, see #195
        // ...but that breaks react-hot-loader, see #231...
        target[funcName] = base
            ? runMixinFirst === true
                ? function () {
                    mixinFunc.apply(this, arguments);
                    base.apply(this, arguments);
                }
                : function () {
                    base.apply(this, arguments);
                    mixinFunc.apply(this, arguments);
                }
            : mixinFunc;
    }
    function isObjectShallowModified(prev, next) {
        if (null == prev ||
            null == next ||
            typeof prev !== 'object' ||
            typeof next !== 'object') {
            return prev !== next;
        }
        var keys = Object.keys(prev);
        if (keys.length !== Object.keys(next).length) {
            return true;
        }
        var key;
        for (var i = keys.length - 1; i >= 0; i--) {
            key = keys[i];
            if (next[key] !== prev[key]) {
                return true;
            }
        }
        return false;
    }
    /**
     * ReactiveMixin
     */
    var reactiveMixin = {
        componentWillMount: function componentWillMount() {
            var this$1 = this;

            if (isUsingStaticRendering === true) {
                return;
            }
            // Generate friendly name for debugging
            var initialName = this.displayName ||
                this.name ||
                (this.constructor &&
                    (this.constructor.displayName || this.constructor.name)) ||
                '<component>';
            var rootNodeID = this._reactInternalInstance && this._reactInternalInstance._rootNodeID;
            /**
             * If props are shallowly modified, react will render anyway,
             * so atom.reportChanged() should not result in yet another re-render
             */
            var skipRender = false;
            /**
             * forceUpdate will re-assign this.props. We don't want that to cause a loop,
             * so detect these changes
             */
            function makePropertyObservableReference(propName) {
                var valueHolder = this[propName];
                var atom = new mobx.Atom('reactive ' + propName);
                Object.defineProperty(this, propName, {
                    configurable: true,
                    enumerable: true,
                    get: function get() {
                        atom.reportObserved();
                        return valueHolder;
                    },
                    set: function set(v) {
                        if (isObjectShallowModified(valueHolder, v)) {
                            valueHolder = v;
                            skipRender = true;
                            atom.reportChanged();
                            skipRender = false;
                        }
                        else {
                            valueHolder = v;
                        }
                    }
                });
            }
            // make this.props an observable reference, see #124
            makePropertyObservableReference.call(this, 'props');
            // make state an observable reference
            makePropertyObservableReference.call(this, 'state');
            // wire up reactive render
            var me = this;
            var render$$1 = this.render.bind(this);
            var baseRender = function () { return render$$1(me.props, me.state, me.context); };
            var reaction = null;
            var isRenderingPending = false;
            var initialRender = function () {
                reaction = new mobx.Reaction((initialName + "#" + rootNodeID + ".render()"), function () {
                    if (!isRenderingPending) {
                        // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
                        // This unidiomatic React usage but React will correctly warn about this so we continue as usual
                        // See #85 / Pull #44
                        isRenderingPending = true;
                        if (typeof this$1.componentWillReact === 'function') {
                            this$1.componentWillReact(); // TODO: wrap in action?
                        }
                        if (this$1.__$mobxIsUnmounted !== true) {
                            if (!skipRender) {
                                this$1.$UPD = true;
                                this$1.forceUpdate();
                                this$1.$UPD = false;
                            }
                        }
                    }
                });
                reaction.reactComponent = this$1;
                reactiveRender.$mobx = reaction;
                this$1.render = reactiveRender;
                return reactiveRender();
            };
            var reactiveRender = function () {
                isRenderingPending = false;
                var exception;
                var rendering = null;
                reaction.track(function () {
                    if (isDevtoolsEnabled) {
                        this$1.__$mobRenderStart = Date.now();
                    }
                    try {
                        rendering = mobx.extras.allowStateChanges(false, baseRender);
                    }
                    catch (e) {
                        exception = e;
                    }
                    if (isDevtoolsEnabled) {
                        this$1.__$mobRenderEnd = Date.now();
                    }
                });
                if (exception) {
                    errorsReporter.emit(exception);
                    throw exception;
                }
                return rendering;
            };
            this.render = initialRender;
        },
        componentWillUnmount: function componentWillUnmount() {
            if (isUsingStaticRendering === true) {
                return;
            }
            if (this.render.$mobx) {
                this.render.$mobx.dispose();
            }
            this.__$mobxIsUnmounted = true;
            if (isDevtoolsEnabled) {
                var node = findDOMNode(this);
                if (node) {
                    componentByNodeRegistery.delete(node);
                }
                renderReporter.emit({
                    component: this,
                    event: 'destroy',
                    node: node
                });
            }
        },
        componentDidMount: function componentDidMount() {
            if (isDevtoolsEnabled) {
                reportRendering(this);
            }
        },
        componentDidUpdate: function componentDidUpdate() {
            if (isDevtoolsEnabled) {
                reportRendering(this);
            }
        },
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            if (isUsingStaticRendering) {
                warning('[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.');
            }
            // update on any state changes (as is the default)
            if (this.state !== nextState) {
                return true;
            }
            // update if props are shallowly not equal, inspired by PureRenderMixin
            // we could return just 'false' here, and avoid the `skipRender` checks etc
            // however, it is nicer if lifecycle events are triggered like usually,
            // so we return true here if props are shallowly modified.
            return isObjectShallowModified(this.props, nextProps);
        }
    };
    /**
     * Observer function / decorator
     */
    function observer(arg1, arg2) {
        if (typeof arg1 === 'string') {
            throw new Error('Store names should be provided as array');
        }
        if (Array.isArray(arg1)) {
            // component needs stores
            if (!warnedAboutObserverInjectDeprecation) {
                warnedAboutObserverInjectDeprecation = true;
                warning('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
            }
            if (!arg2) {
                // invoked as decorator
                return function (componentClass) { return observer(arg1, componentClass); };
            }
            else {
                return inject.apply(null, arg1)(observer(arg2));
            }
        }
        var component = arg1;
        if (component.isMobxInjector === true) {
            warning("Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'");
        }
        // Stateless function component:
        // If it is function but doesn't seem to be a react class constructor,
        // wrap it to a react class automatically
        if (typeof component === 'function' &&
            (!component.prototype || !component.prototype.render)) {
            return observer((_a = (function (Component$$1) {
                function _a () {
                    Component$$1.apply(this, arguments);
                }

                if ( Component$$1 ) _a.__proto__ = Component$$1;
                _a.prototype = Object.create( Component$$1 && Component$$1.prototype );
                _a.prototype.constructor = _a;

                _a.prototype.render = function render$$1 (props, state, context) {
                        return component(props, context);
                    };

                return _a;
            }(inferno.Component)), _a.displayName = component.displayName || component.name, _a.defaultProps = component.defaultProps, _a));
        }
        if (!component) {
            throw new Error("Please pass a valid component to 'observer'");
        }
        var target = component.prototype || component;
        mixinLifecycleEvents(target);
        component.isMobXReactObserver = true;
        return component;
        var _a;
    }
    function mixinLifecycleEvents(target) {
        patch(target, 'componentWillMount', true);
        ['componentDidMount', 'componentWillUnmount', 'componentDidUpdate'].forEach(function (funcName) {
            patch(target, funcName);
        });
        if (!target.shouldComponentUpdate) {
            target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
        }
    }
    // TODO: support injection somehow as well?
    var Observer = observer(function (ref) {
        var children = ref.children;

        return children();
    });
    var proxiedInjectorProps = {
        isMobxInjector: {
            configurable: true,
            enumerable: true,
            value: true,
            writable: true
        }
    };
    /**
     * Store Injection
     */
    function createStoreInjector(grabStoresFn, component, injectNames) {
        var displayName = 'inject-' +
            (component.displayName ||
                component.name ||
                (component.constructor && component.constructor.name) ||
                'Unknown');
        if (injectNames) {
            displayName += '-with-' + injectNames;
        }
        var Injector = (function (Component$$1) {
            function Injector(props, context) {
                Component$$1.call(this, props, context);
                this.storeRef = this.storeRef.bind(this);
            }

            if ( Component$$1 ) Injector.__proto__ = Component$$1;
            Injector.prototype = Object.create( Component$$1 && Component$$1.prototype );
            Injector.prototype.constructor = Injector;
            Injector.prototype.storeRef = function storeRef (instance) {
                this.wrappedInstance = instance;
            };
            Injector.prototype.render = function render$$1 (props, state, context) {
                // Optimization: it might be more efficient to apply the mapper function *outside* the render method
                // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
                // See this test: 'using a custom injector is not too reactive' in inject.js
                var newProps = {};
                var key;
                for (key in props) {
                    newProps[key] = props[key];
                }
                var additionalProps = grabStoresFn(context.mobxStores || {}, newProps, context) || {};
                for (key in additionalProps) {
                    newProps[key] = additionalProps[key];
                }
                return inferno.createComponentVNode(2 /* ComponentUnknown */, component, newProps, null, isStateless(component) ? null : this.storeRef);
            };

            return Injector;
        }(inferno.Component));
        Injector.displayName = displayName;
        Injector.isMobxInjector = false;
        // Static fields from component should be visible on the generated Injector
        hoistNonReactStatics(Injector, component);
        Injector.wrappedComponent = component;
        Object.defineProperties(Injector, proxiedInjectorProps);
        return Injector;
    }
    function grabStoresByName(storeNames) {
        return function (baseStores, nextProps) {
            for (var i = 0, len = storeNames.length; i < len; i++) {
                var storeName = storeNames[i];
                if (!(storeName in nextProps)) {
                    // Development warning
                    {
                        if (!(storeName in baseStores)) {
                            throw new Error("MobX injector: Store '" +
                                storeName +
                                "' is not available! Make sure it is provided by some Provider");
                        }
                    }
                    nextProps[storeName] = baseStores[storeName];
                }
            }
            return nextProps;
        };
    }
    /**
     * higher order component that injects stores to a child.
     * takes either a varargs list of strings, which are stores read from the context,
     * or a function that manually maps the available stores from the context to props:
     * storesToProps(mobxStores, props, context) => newProps
     */
    // TODO: Type
    function inject() {
        var arguments$1 = arguments;

        var grabStoresFn;
        if (typeof arguments[0] === 'function') {
            grabStoresFn = arguments[0];
            return function (componentClass) {
                var injected = createStoreInjector(grabStoresFn, componentClass);
                injected.isMobxInjector = false; // supress warning
                // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
                // see #111
                injected = observer(injected);
                injected.isMobxInjector = true; // restore warning
                return injected;
            };
        }
        else {
            var storeNames = [];
            for (var i = 0; i < arguments.length; i++) {
                storeNames.push(arguments$1[i]);
            }
            grabStoresFn = grabStoresByName(storeNames);
            return function (componentClass) {
                return createStoreInjector(grabStoresFn, componentClass, storeNames.join('-'));
            };
        }
    }

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    var specialKeys = new Set();
    specialKeys.add('children');
    specialKeys.add('key');
    specialKeys.add('ref');
    var Provider = (function (Component$$1) {
        function Provider () {
            Component$$1.apply(this, arguments);
        }

        if ( Component$$1 ) Provider.__proto__ = Component$$1;
        Provider.prototype = Object.create( Component$$1 && Component$$1.prototype );
        Provider.prototype.constructor = Provider;

        Provider.prototype.render = function render$$1 (props) {
            return props.children;
        };
        Provider.prototype.getChildContext = function getChildContext () {
            var stores = {};
            // inherit stores
            var props = this.props;
            var baseStores = this.context.mobxStores;
            if (baseStores) {
                for (var key in baseStores) {
                    stores[key] = baseStores[key];
                }
            }
            // add own stores
            for (var key$1 in props) {
                if (!specialKeys.has(key$1) && key$1 !== 'suppressChangedStoreWarning') {
                    stores[key$1] = props[key$1];
                }
            }
            return {
                mobxStores: stores
            };
        };

        return Provider;
    }(inferno.Component));
    // Development warning
    {
        Provider.prototype.componentWillReceiveProps = function (nextProps) {
            var this$1 = this;

            // Maybe this warning is too aggressive?
            if (Object.keys(nextProps).length !== Object.keys(this.props).length) {
                warning('MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children');
            }
            if (!nextProps.suppressChangedStoreWarning) {
                for (var key in nextProps) {
                    if (!specialKeys.has(key) && this$1.props[key] !== nextProps[key]) {
                        warning("MobX Provider: Provided store '" +
                            key +
                            "' has changed. Please avoid replacing stores as the change might not propagate to all children");
                    }
                }
            }
        };
    }

    /**
     * @module Inferno-Mobx
     */ /** TypeDoc Comment */
    // THIS IS PORT OF AWESOME MOBX-REACT to INFERNO
    // LAST POINT OF PORT (4.2.2)
    // https://github.com/mobxjs/mobx-react/commit/acdc338db55b05f256c0ef357c9b71433fbd53d2
    var onError = function (fn) { return errorsReporter.on(fn); };

    exports.componentByNodeRegistery = componentByNodeRegistery;
    exports.errorsReporter = errorsReporter;
    exports.inject = inject;
    exports.observer = observer;
    exports.onError = onError;
    exports.EventEmitter = EventEmitter;
    exports.Observer = Observer;
    exports.Provider = Provider;
    exports.renderReporter = renderReporter;
    exports.trackComponents = trackComponents;
    exports.useStaticRendering = useStaticRendering;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
