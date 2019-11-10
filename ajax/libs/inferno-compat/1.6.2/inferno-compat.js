
/*!
 * Inferno v1.6.2
 * (c) 2017 Dominic Gannaway'
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-component')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-component'], factory) :
	(factory((global.Inferno = global.Inferno || {}),global.Inferno,global.Inferno.Component));
}(this, (function (exports,inferno,Component) { 'use strict';

Component = 'default' in Component ? Component['default'] : Component;

var NO_OP = '$NO_OP';
var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
var isBrowser = !!(typeof window !== 'undefined' && window.document);

// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}

function isNullOrUndef(obj) {
    return isUndefined(obj) || isNull(obj);
}
function isInvalid(obj) {
    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function isString(obj) {
    return typeof obj === 'string';
}

function isNull(obj) {
    return obj === null;
}
function isTrue(obj) {
    return obj === true;
}
function isUndefined(obj) {
    return obj === undefined;
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

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
    constructor: 1,
    render: 1,
    shouldComponentUpdate: 1,
    componentWillReceiveProps: 1,
    componentWillUpdate: 1,
    componentDidUpdate: 1,
    componentWillMount: 1,
    componentDidMount: 1,
    componentWillUnmount: 1,
    componentDidUnmount: 1
};
function extend(base, props, all) {
    for (var key in props) {
        if (all === true || !isNullOrUndef(props[key])) {
            base[key] = props[key];
        }
    }
    return base;
}
function bindAll(ctx) {
    for (var i in ctx) {
        var v = ctx[i];
        if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST[i]) {
            (ctx[i] = v.bind(ctx)).__bound = true;
        }
    }
}
function collateMixins(mixins, keyed) {
    if ( keyed === void 0 ) keyed = {};

    for (var i = 0, len = mixins.length; i < len; i++) {
        var mixin = mixins[i];
        // Surprise: Mixins can have mixins
        if (mixin.mixins) {
            // Recursively collate sub-mixins
            collateMixins(mixin.mixins, keyed);
        }
        for (var key in mixin) {
            if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
                (keyed[key] || (keyed[key] = [])).push(mixin[key]);
            }
        }
    }
    return keyed;
}
function multihook(inst, hooks, mergeFn) {
    return function () {
        var arguments$1 = arguments;
        var this$1 = this;

        var ret;
        for (var i = 0, len = hooks.length; i < len; i++) {
            var hook = hooks[i];
            var r = hook.apply(this$1, arguments$1);
            if (mergeFn) {
                ret = mergeFn(ret, r);
            }
            else if (!isUndefined(r)) {
                ret = r;
            }
        }
        return ret;
    };
}
function mergeNoDupes(previous, current) {
    if (!isUndefined(current)) {
        if (!isObject(current)) {
            throwError('Expected Mixin to return value to be an object or null.');
        }
        if (!previous) {
            previous = {};
        }
        for (var key in current) {
            if (current.hasOwnProperty(key)) {
                if (previous.hasOwnProperty(key)) {
                    throwError(("Mixins return duplicate key " + key + " in their return values"));
                }
                previous[key] = current[key];
            }
        }
    }
    return previous;
}
function applyMixin(key, inst, mixin) {
    var hooks = isUndefined(inst[key]) ? mixin : mixin.concat(inst[key]);
    if (key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext') {
        inst[key] = multihook(inst, hooks, mergeNoDupes);
    }
    else {
        inst[key] = multihook(inst, hooks);
    }
}
function applyMixins(Cl, mixins) {
    for (var key in mixins) {
        if (mixins.hasOwnProperty(key)) {
            var mixin = mixins[key];
            var inst = (void 0);
            if (key === 'getDefaultProps') {
                inst = Cl;
            }
            else {
                inst = Cl.prototype;
            }
            if (isFunction(mixin[0])) {
                applyMixin(key, inst, mixin);
            }
            else {
                inst[key] = mixin;
            }
        }
    }
}
function createClass(obj) {
    var Cl = (function (Component$$1) {
        function Cl(props, context) {
            Component$$1.call(this, props, context);
            bindAll(this);
            if (this.getInitialState) {
                this.state = this.getInitialState();
            }
        }

        if ( Component$$1 ) Cl.__proto__ = Component$$1;
        Cl.prototype = Object.create( Component$$1 && Component$$1.prototype );
        Cl.prototype.constructor = Cl;
        Cl.prototype.replaceState = function replaceState (nextState, callback) {
            this.setState(nextState, callback);
        };
        Cl.prototype.isMounted = function isMounted () {
            return !this._unmounted;
        };

        return Cl;
    }(Component));
    Cl.displayName = obj.displayName || 'Component';
    Cl.propTypes = obj.propTypes;
    Cl.mixins = obj.mixins && collateMixins(obj.mixins);
    Cl.getDefaultProps = obj.getDefaultProps;
    extend(Cl.prototype, obj);
    if (obj.statics) {
        extend(Cl, obj.statics);
    }
    if (obj.mixins) {
        applyMixins(Cl, collateMixins(obj.mixins));
    }
    Cl.defaultProps = isUndefined(Cl.getDefaultProps) ? undefined : Cl.getDefaultProps();
    return Cl;
}

var componentHooks = {
    onComponentWillMount: true,
    onComponentDidMount: true,
    onComponentWillUnmount: true,
    onComponentShouldUpdate: true,
    onComponentWillUpdate: true,
    onComponentDidUpdate: true
};
function createElement$1(name, props) {
    var _children = [], len$2 = arguments.length - 2;
    while ( len$2-- > 0 ) _children[ len$2 ] = arguments[ len$2 + 2 ];

    if (isInvalid(name) || isObject(name)) {
        throw new Error('Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.');
    }
    var children = _children;
    var ref = null;
    var key = null;
    var className = null;
    var flags = 0;
    if (_children) {
        if (_children.length === 1) {
            children = _children[0];
        }
        else if (_children.length === 0) {
            children = undefined;
        }
    }
    if (isString(name)) {
        switch (name) {
            case 'svg':
                flags = 128 /* SvgElement */;
                break;
            case 'input':
                flags = 512 /* InputElement */;
                break;
            case 'textarea':
                flags = 1024 /* TextareaElement */;
                break;
            case 'select':
                flags = 2048 /* SelectElement */;
                break;
            default:
                flags = 2 /* HtmlElement */;
                break;
        }
        /*
         This fixes de-optimisation:
         uses object Keys for looping props to avoid deleting props of looped object
         */
        if (!isNullOrUndef(props)) {
            var propKeys = Object.keys(props);
            for (var i = 0, len = propKeys.length; i < len; i++) {
                var propKey = propKeys[i];
                if (propKey === 'className' || propKey === 'class') {
                    className = props[propKey];
                    delete props[propKey];
                }
                else if (propKey === 'key') {
                    key = props.key;
                    delete props.key;
                }
                else if (propKey === 'children' && isUndefined(children)) {
                    children = props.children; // always favour children args, default to props
                }
                else if (propKey === 'ref') {
                    ref = props.ref;
                }
            }
        }
    }
    else {
        flags = isStatefulComponent(name) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
        if (!isUndefined(children)) {
            if (!props) {
                props = {};
            }
            props.children = children;
            children = null;
        }
        if (!isNullOrUndef(props)) {
            /*
             This fixes de-optimisation:
             uses object Keys for looping props to avoid deleting props of looped object
             */
            var propKeys$1 = Object.keys(props);
            for (var i$1 = 0, len$1 = propKeys$1.length; i$1 < len$1; i$1++) {
                var propKey$1 = propKeys$1[i$1];
                if (componentHooks[propKey$1]) {
                    if (!ref) {
                        ref = {};
                    }
                    ref[propKey$1] = props[propKey$1];
                }
                else if (propKey$1 === 'key') {
                    key = props.key;
                    delete props.key;
                }
            }
        }
    }
    return inferno.createVNode(flags, name, className, children, props, key, ref);
}

function isValidElement(obj) {
    var isNotANullObject = isObject(obj) && isNull(obj) === false;
    if (isNotANullObject === false) {
        return false;
    }
    var flags = obj.flags;
    return (flags & (28 /* Component */ | 3970 /* Element */)) > 0;
}

/**
 * borrowed React SVGDOMPropertyConfig
 * @link https://github.com/facebook/react/blob/c78464f8ea9a5b00ec80252d20a71a1482210e57/src/renderers/dom/shared/SVGDOMPropertyConfig.js
 */
var SVGDOMPropertyConfig = {
    accentHeight: 'accent-height',
    accumulate: 0,
    additive: 0,
    alignmentBaseline: 'alignment-baseline',
    allowReorder: 'allowReorder',
    alphabetic: 0,
    amplitude: 0,
    arabicForm: 'arabic-form',
    ascent: 0,
    attributeName: 'attributeName',
    attributeType: 'attributeType',
    autoReverse: 'autoReverse',
    azimuth: 0,
    baseFrequency: 'baseFrequency',
    baseProfile: 'baseProfile',
    baselineShift: 'baseline-shift',
    bbox: 0,
    begin: 0,
    bias: 0,
    by: 0,
    calcMode: 'calcMode',
    capHeight: 'cap-height',
    clip: 0,
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    clipPathUnits: 'clipPathUnits',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    contentScriptType: 'contentScriptType',
    contentStyleType: 'contentStyleType',
    cursor: 0,
    cx: 0,
    cy: 0,
    d: 0,
    decelerate: 0,
    descent: 0,
    diffuseConstant: 'diffuseConstant',
    direction: 0,
    display: 0,
    divisor: 0,
    dominantBaseline: 'dominant-baseline',
    dur: 0,
    dx: 0,
    dy: 0,
    edgeMode: 'edgeMode',
    elevation: 0,
    enableBackground: 'enable-background',
    end: 0,
    exponent: 0,
    externalResourcesRequired: 'externalResourcesRequired',
    fill: 0,
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    filter: 0,
    filterRes: 'filterRes',
    filterUnits: 'filterUnits',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    focusable: 0,
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    format: 0,
    from: 0,
    fx: 0,
    fy: 0,
    g1: 0,
    g2: 0,
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    glyphRef: 'glyphRef',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    hanging: 0,
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    ideographic: 0,
    imageRendering: 'image-rendering',
    in: 0,
    in2: 0,
    intercept: 0,
    k: 0,
    k1: 0,
    k2: 0,
    k3: 0,
    k4: 0,
    kernelMatrix: 'kernelMatrix',
    kernelUnitLength: 'kernelUnitLength',
    kerning: 0,
    keyPoints: 'keyPoints',
    keySplines: 'keySplines',
    keyTimes: 'keyTimes',
    lengthAdjust: 'lengthAdjust',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    limitingConeAngle: 'limitingConeAngle',
    local: 0,
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    markerHeight: 'markerHeight',
    markerUnits: 'markerUnits',
    markerWidth: 'markerWidth',
    mask: 0,
    maskContentUnits: 'maskContentUnits',
    maskUnits: 'maskUnits',
    mathematical: 0,
    mode: 0,
    numOctaves: 'numOctaves',
    offset: 0,
    opacity: 0,
    operator: 0,
    order: 0,
    orient: 0,
    orientation: 0,
    origin: 0,
    overflow: 0,
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pathLength: 'pathLength',
    patternContentUnits: 'patternContentUnits',
    patternTransform: 'patternTransform',
    patternUnits: 'patternUnits',
    pointerEvents: 'pointer-events',
    points: 0,
    pointsAtX: 'pointsAtX',
    pointsAtY: 'pointsAtY',
    pointsAtZ: 'pointsAtZ',
    preserveAlpha: 'preserveAlpha',
    preserveAspectRatio: 'preserveAspectRatio',
    primitiveUnits: 'primitiveUnits',
    r: 0,
    radius: 0,
    refX: 'refX',
    refY: 'refY',
    renderingIntent: 'rendering-intent',
    repeatCount: 'repeatCount',
    repeatDur: 'repeatDur',
    requiredExtensions: 'requiredExtensions',
    requiredFeatures: 'requiredFeatures',
    restart: 0,
    result: 0,
    rotate: 0,
    rx: 0,
    ry: 0,
    scale: 0,
    seed: 0,
    shapeRendering: 'shape-rendering',
    slope: 0,
    spacing: 0,
    specularConstant: 'specularConstant',
    specularExponent: 'specularExponent',
    speed: 0,
    spreadMethod: 'spreadMethod',
    startOffset: 'startOffset',
    stdDeviation: 'stdDeviation',
    stemh: 0,
    stemv: 0,
    stitchTiles: 'stitchTiles',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    string: 0,
    stroke: 0,
    strokeDasharray: 'stroke-dasharray',
    strokeDashoffset: 'stroke-dashoffset',
    strokeLinecap: 'stroke-linecap',
    strokeLinejoin: 'stroke-linejoin',
    strokeMiterlimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    surfaceScale: 'surfaceScale',
    systemLanguage: 'systemLanguage',
    tableValues: 'tableValues',
    targetX: 'targetX',
    targetY: 'targetY',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    textLength: 'textLength',
    to: 0,
    transform: 0,
    u1: 0,
    u2: 0,
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicode: 0,
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    values: 0,
    vectorEffect: 'vector-effect',
    version: 0,
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    viewBox: 'viewBox',
    viewTarget: 'viewTarget',
    visibility: 0,
    widths: 0,
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    x: 0,
    xHeight: 'x-height',
    x1: 0,
    x2: 0,
    xChannelSelector: 'xChannelSelector',
    xlinkActuate: 'xlink:actuate',
    xlinkArcrole: 'xlink:arcrole',
    xlinkHref: 'xlink:href',
    xlinkRole: 'xlink:role',
    xlinkShow: 'xlink:show',
    xlinkTitle: 'xlink:title',
    xlinkType: 'xlink:type',
    xmlBase: 'xml:base',
    // xmlns: 0,
    xmlnsXlink: 'xmlns:xlink',
    xmlLang: 'xml:lang',
    xmlSpace: 'xml:space',
    y: 0,
    y1: 0,
    y2: 0,
    yChannelSelector: 'yChannelSelector',
    z: 0,
    zoomAndPan: 'zoomAndPan'
};

// Inlined PropTypes, there is propType checking ATM.
function proptype() {
}
proptype.isRequired = proptype;
var getProptype = function () { return proptype; };
var PropTypes = {
    array: proptype,
    bool: proptype,
    func: proptype,
    number: proptype,
    object: proptype,
    string: proptype,
    symbol: proptype,
    any: getProptype,
    arrayOf: getProptype,
    element: getProptype,
    instanceOf: getProptype,
    node: getProptype,
    objectOf: getProptype,
    oneOf: getProptype,
    oneOfType: getProptype,
    shape: getProptype
};
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
Component.prototype.isReactComponent = {};
var currentComponent = null;
inferno.options.beforeRender = function (component) {
    currentComponent = component;
};
inferno.options.afterRender = function () {
    currentComponent = null;
};
var version = '15.4.2';
function normalizeProps(name, props) {
    if ((name === 'input' || name === 'textarea') && props.type !== 'radio' && props.onChange) {
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
            props['for'] = props[prop];
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
    Event.prototype.persist = function () {
    };
}
function iterableToArray(iterable) {
    var iterStep;
    var tmpArr = [];
    do {
        iterStep = iterable.next();
        iterStep.value ? tmpArr.push(iterStep.value) : void 0;
    } while (!iterStep.done);
    return tmpArr;
}
var hasSymbolSupport = typeof Symbol !== 'undefined';
var injectStringRefs = function (originalFunction) {
    return function (name, _props) {
        var children = [], len$1 = arguments.length - 2;
        while ( len$1-- > 0 ) children[ len$1 ] = arguments[ len$1 + 2 ];

        var props = _props || {};
        var ref = props.ref;
        if (typeof ref === 'string' && currentComponent) {
            currentComponent.refs = currentComponent.refs || {};
            props.ref = function (val) {
                this.refs[ref] = val;
            }.bind(currentComponent);
        }
        if (typeof name === 'string') {
            normalizeProps(name, props);
        }
        // React supports iterable children, in addition to Array-like
        if (hasSymbolSupport) {
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                if (child && !isArray(child) && !isString(child) && isFunction(child[Symbol.iterator])) {
                    children[i] = iterableToArray(child[Symbol.iterator]());
                }
            }
        }
        return originalFunction.apply(void 0, [ name, props ].concat( children ));
    };
};
var createElement = injectStringRefs(createElement$1);
var cloneElement = injectStringRefs(inferno.cloneVNode);
var oldCreateVNode = inferno.options.createVNode;
inferno.options.createVNode = function (vNode) {
    var children = vNode.children;
    var props = vNode.props;
    if (isNullOrUndef(vNode.props)) {
        props = vNode.props = {};
    }
    if (!isNullOrUndef(children) && isNullOrUndef(props.children)) {
        props.children = children;
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
    Component.call(this, props, context);
}
PureComponent.prototype = new Component({}, {});
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
        return this.props['context'];
    };
    WrapperComponent.prototype.render = function render$$1 (props) {
        return props.children;
    };

    return WrapperComponent;
}(Component));
function unstable_renderSubtreeIntoContainer(parentComponent, vNode, container, callback) {
    var wrapperVNode = inferno.createVNode(4, WrapperComponent, null, null, {
        context: parentComponent.context,
        children: vNode
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
    return createElement.bind(null, type);
}
var DOM = {};
for (var i = ELEMENTS.length; i--;) {
    DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}
// Mask React global in browser enviornments when React is not used.
if (isBrowser && typeof window.React === 'undefined') {
    var exports$1 = {
        createVNode: inferno.createVNode,
        render: inferno.render,
        isValidElement: isValidElement,
        createElement: createElement,
        Component: Component,
        PureComponent: PureComponent,
        unmountComponentAtNode: unmountComponentAtNode,
        cloneElement: cloneElement,
        PropTypes: PropTypes,
        createClass: createClass,
        findDOMNode: inferno.findDOMNode,
        Children: Children,
        cloneVNode: inferno.cloneVNode,
        NO_OP: NO_OP,
        version: version,
        unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
        createFactory: createFactory,
        DOM: DOM,
        EMPTY_OBJ: inferno.EMPTY_OBJ
    };
    window.React = exports$1;
    window.ReactDOM = exports$1;
}
var index = {
    createVNode: inferno.createVNode,
    render: inferno.render,
    isValidElement: isValidElement,
    createElement: createElement,
    Component: Component,
    PureComponent: PureComponent,
    unmountComponentAtNode: unmountComponentAtNode,
    cloneElement: cloneElement,
    PropTypes: PropTypes,
    createClass: createClass,
    findDOMNode: inferno.findDOMNode,
    Children: Children,
    cloneVNode: inferno.cloneVNode,
    NO_OP: NO_OP,
    version: version,
    unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
    createFactory: createFactory,
    DOM: DOM,
    EMPTY_OBJ: inferno.EMPTY_OBJ
};

exports.createVNode = inferno.createVNode;
exports.render = inferno.render;
exports.isValidElement = isValidElement;
exports.createElement = createElement;
exports.Component = Component;
exports.PureComponent = PureComponent;
exports.unmountComponentAtNode = unmountComponentAtNode;
exports.cloneElement = cloneElement;
exports.PropTypes = PropTypes;
exports.createClass = createClass;
exports.findDOMNode = inferno.findDOMNode;
exports.Children = Children;
exports.cloneVNode = inferno.cloneVNode;
exports.NO_OP = NO_OP;
exports.version = version;
exports.unstable_renderSubtreeIntoContainer = unstable_renderSubtreeIntoContainer;
exports.createFactory = createFactory;
exports.DOM = DOM;
exports.EMPTY_OBJ = inferno.EMPTY_OBJ;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
