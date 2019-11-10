(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.zrender = {})));
}(this, (function (exports) { 'use strict';

/**
 * zrender: 生成唯一id
 *
 * @author errorrik (errorrik@gmail.com)
 */

var idStart = 0x0907;

var guid = function () {
    return idStart++;
};

/**
 * echarts设备环境识别
 *
 * @desc echarts基于Canvas，纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据统计图表。
 * @author firede[firede@firede.us]
 * @desc thanks zepto.
 */

var env = {};

if (typeof wx === 'object' && typeof wx.getSystemInfoSync === 'function') {
    // In Weixin Application
    env = {
        browser: {},
        os: {},
        node: false,
        wxa: true, // Weixin Application
        canvasSupported: true,
        svgSupported: false,
        touchEventsSupported: true,
        domSupported: false
    };
}
else if (typeof document === 'undefined' && typeof self !== 'undefined') {
    // In worker
    env = {
        browser: {},
        os: {},
        node: false,
        worker: true,
        canvasSupported: true,
        domSupported: false
    };
}
else if (typeof navigator === 'undefined') {
    // In node
    env = {
        browser: {},
        os: {},
        node: true,
        worker: false,
        // Assume canvas is supported
        canvasSupported: true,
        svgSupported: true,
        domSupported: false
    };
}
else {
    env = detect(navigator.userAgent);
}

var env$1 = env;

// Zepto.js
// (c) 2010-2013 Thomas Fuchs
// Zepto.js may be freely distributed under the MIT license.

function detect(ua) {
    var os = {};
    var browser = {};
    // var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
    // var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    // var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    // var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    // var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    // var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
    // var touchpad = webos && ua.match(/TouchPad/);
    // var kindle = ua.match(/Kindle\/([\d.]+)/);
    // var silk = ua.match(/Silk\/([\d._]+)/);
    // var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
    // var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
    // var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
    // var playbook = ua.match(/PlayBook/);
    // var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
    var firefox = ua.match(/Firefox\/([\d.]+)/);
    // var safari = webkit && ua.match(/Mobile\//) && !chrome;
    // var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;
    var ie = ua.match(/MSIE\s([\d.]+)/)
        // IE 11 Trident/7.0; rv:11.0
        || ua.match(/Trident\/.+?rv:(([\d.]+))/);
    var edge = ua.match(/Edge\/([\d.]+)/); // IE 12 and 12+

    var weChat = (/micromessenger/i).test(ua);

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    // if (browser.webkit = !!webkit) browser.version = webkit[1];

    // if (android) os.android = true, os.version = android[2];
    // if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
    // if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
    // if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    // if (webos) os.webos = true, os.version = webos[2];
    // if (touchpad) os.touchpad = true;
    // if (blackberry) os.blackberry = true, os.version = blackberry[2];
    // if (bb10) os.bb10 = true, os.version = bb10[2];
    // if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
    // if (playbook) browser.playbook = true;
    // if (kindle) os.kindle = true, os.version = kindle[1];
    // if (silk) browser.silk = true, browser.version = silk[1];
    // if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
    // if (chrome) browser.chrome = true, browser.version = chrome[1];
    if (firefox) {
        browser.firefox = true;
        browser.version = firefox[1];
    }
    // if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true;
    // if (webview) browser.webview = true;

    if (ie) {
        browser.ie = true;
        browser.version = ie[1];
    }

    if (edge) {
        browser.edge = true;
        browser.version = edge[1];
    }

    // It is difficult to detect WeChat in Win Phone precisely, because ua can
    // not be set on win phone. So we do not consider Win Phone.
    if (weChat) {
        browser.weChat = true;
    }

    // os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
    //     (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
    // os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos ||
    //     (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
    //     (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

    return {
        browser: browser,
        os: os,
        node: false,
        // 原生canvas支持，改极端点了
        // canvasSupported : !(browser.ie && parseFloat(browser.version) < 9)
        canvasSupported: !!document.createElement('canvas').getContext,
        svgSupported: typeof SVGRect !== 'undefined',
        // works on most browsers
        // IE10/11 does not support touch event, and MS Edge supports them but not by
        // default, so we dont check navigator.maxTouchPoints for them here.
        touchEventsSupported: 'ontouchstart' in window && !browser.ie && !browser.edge,
        // <http://caniuse.com/#search=pointer%20event>.
        pointerEventsSupported: 'onpointerdown' in window
            // Firefox supports pointer but not by default, only MS browsers are reliable on pointer
            // events currently. So we dont use that on other browsers unless tested sufficiently.
            // Although IE 10 supports pointer event, it use old style and is different from the
            // standard. So we exclude that. (IE 10 is hardly used on touch device)
            && (browser.edge || (browser.ie && browser.version >= 11)),
        // passiveSupported: detectPassiveSupport()
        domSupported: typeof document !== 'undefined'
    };
}

// See https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
// function detectPassiveSupport() {
//     // Test via a getter in the options object to see if the passive property is accessed
//     var supportsPassive = false;
//     try {
//         var opts = Object.defineProperty({}, 'passive', {
//             get: function() {
//                 supportsPassive = true;
//             }
//         });
//         window.addEventListener('testPassive', function() {}, opts);
//     } catch (e) {
//     }
//     return supportsPassive;
// }

/**
 * @module zrender/core/util
 */

// 用于处理merge时无法遍历Date等对象的问题
var BUILTIN_OBJECT = {
    '[object Function]': 1,
    '[object RegExp]': 1,
    '[object Date]': 1,
    '[object Error]': 1,
    '[object CanvasGradient]': 1,
    '[object CanvasPattern]': 1,
    // For node-canvas
    '[object Image]': 1,
    '[object Canvas]': 1
};

var TYPED_ARRAY = {
    '[object Int8Array]': 1,
    '[object Uint8Array]': 1,
    '[object Uint8ClampedArray]': 1,
    '[object Int16Array]': 1,
    '[object Uint16Array]': 1,
    '[object Int32Array]': 1,
    '[object Uint32Array]': 1,
    '[object Float32Array]': 1,
    '[object Float64Array]': 1
};

var objToString = Object.prototype.toString;

var arrayProto = Array.prototype;
var nativeForEach = arrayProto.forEach;
var nativeFilter = arrayProto.filter;
var nativeSlice = arrayProto.slice;
var nativeMap = arrayProto.map;
var nativeReduce = arrayProto.reduce;

// Avoid assign to an exported variable, for transforming to cjs.
var methods = {};

function $override(name, fn) {
    // Clear ctx instance for different environment
    if (name === 'createCanvas') {
        _ctx = null;
    }

    methods[name] = fn;
}

/**
 * Those data types can be cloned:
 *     Plain object, Array, TypedArray, number, string, null, undefined.
 * Those data types will be assgined using the orginal data:
 *     BUILTIN_OBJECT
 * Instance of user defined class will be cloned to a plain object, without
 * properties in prototype.
 * Other data types is not supported (not sure what will happen).
 *
 * Caution: do not support clone Date, for performance consideration.
 * (There might be a large number of date in `series.data`).
 * So date should not be modified in and out of echarts.
 *
 * @param {*} source
 * @return {*} new
 */
function clone(source) {
    if (source == null || typeof source !== 'object') {
        return source;
    }

    var result = source;
    var typeStr = objToString.call(source);

    if (typeStr === '[object Array]') {
        if (!isPrimitive(source)) {
            result = [];
            for (var i = 0, len = source.length; i < len; i++) {
                result[i] = clone(source[i]);
            }
        }
    }
    else if (TYPED_ARRAY[typeStr]) {
        if (!isPrimitive(source)) {
            var Ctor = source.constructor;
            if (source.constructor.from) {
                result = Ctor.from(source);
            }
            else {
                result = new Ctor(source.length);
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = clone(source[i]);
                }
            }
        }
    }
    else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
        result = {};
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                result[key] = clone(source[key]);
            }
        }
    }

    return result;
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} target
 * @param {*} source
 * @param {boolean} [overwrite=false]
 */
function merge(target, source, overwrite) {
    // We should escapse that source is string
    // and enter for ... in ...
    if (!isObject(source) || !isObject(target)) {
        return overwrite ? clone(source) : target;
    }

    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            var targetProp = target[key];
            var sourceProp = source[key];

            if (isObject(sourceProp)
                && isObject(targetProp)
                && !isArray(sourceProp)
                && !isArray(targetProp)
                && !isDom(sourceProp)
                && !isDom(targetProp)
                && !isBuiltInObject(sourceProp)
                && !isBuiltInObject(targetProp)
                && !isPrimitive(sourceProp)
                && !isPrimitive(targetProp)
            ) {
                // 如果需要递归覆盖，就递归调用merge
                merge(targetProp, sourceProp, overwrite);
            }
            else if (overwrite || !(key in target)) {
                // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                // NOTE，在 target[key] 不存在的时候也是直接覆盖
                target[key] = clone(source[key], true);
            }
        }
    }

    return target;
}

/**
 * @param {Array} targetAndSources The first item is target, and the rests are source.
 * @param {boolean} [overwrite=false]
 * @return {*} target
 */
function mergeAll(targetAndSources, overwrite) {
    var result = targetAndSources[0];
    for (var i = 1, len = targetAndSources.length; i < len; i++) {
        result = merge(result, targetAndSources[i], overwrite);
    }
    return result;
}

/**
 * @param {*} target
 * @param {*} source
 * @memberOf module:zrender/core/util
 */
function extend(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

/**
 * @param {*} target
 * @param {*} source
 * @param {boolean} [overlay=false]
 * @memberOf module:zrender/core/util
 */
function defaults(target, source, overlay) {
    for (var key in source) {
        if (source.hasOwnProperty(key)
            && (overlay ? source[key] != null : target[key] == null)
        ) {
            target[key] = source[key];
        }
    }
    return target;
}

var createCanvas = function () {
    return methods.createCanvas();
};

methods.createCanvas = function () {
    return document.createElement('canvas');
};

// FIXME
var _ctx;

function getContext() {
    if (!_ctx) {
        // Use util.createCanvas instead of createCanvas
        // because createCanvas may be overwritten in different environment
        _ctx = createCanvas().getContext('2d');
    }
    return _ctx;
}

/**
 * 查询数组中元素的index
 * @memberOf module:zrender/core/util
 */
function indexOf(array, value) {
    if (array) {
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
    }
    return -1;
}

/**
 * 构造类继承关系
 *
 * @memberOf module:zrender/core/util
 * @param {Function} clazz 源类
 * @param {Function} baseClazz 基类
 */
function inherits(clazz, baseClazz) {
    var clazzPrototype = clazz.prototype;
    function F() {}
    F.prototype = baseClazz.prototype;
    clazz.prototype = new F();

    for (var prop in clazzPrototype) {
        clazz.prototype[prop] = clazzPrototype[prop];
    }
    clazz.prototype.constructor = clazz;
    clazz.superClass = baseClazz;
}

/**
 * @memberOf module:zrender/core/util
 * @param {Object|Function} target
 * @param {Object|Function} sorce
 * @param {boolean} overlay
 */
function mixin(target, source, overlay) {
    target = 'prototype' in target ? target.prototype : target;
    source = 'prototype' in source ? source.prototype : source;

    defaults(target, source, overlay);
}

/**
 * Consider typed array.
 * @param {Array|TypedArray} data
 */
function isArrayLike(data) {
    if (!data) {
        return;
    }
    if (typeof data === 'string') {
        return false;
    }
    return typeof data.length === 'number';
}

/**
 * 数组或对象遍历
 * @memberOf module:zrender/core/util
 * @param {Object|Array} obj
 * @param {Function} cb
 * @param {*} [context]
 */
function each(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.forEach && obj.forEach === nativeForEach) {
        obj.forEach(cb, context);
    }
    else if (obj.length === +obj.length) {
        for (var i = 0, len = obj.length; i < len; i++) {
            cb.call(context, obj[i], i, obj);
        }
    }
    else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                cb.call(context, obj[key], key, obj);
            }
        }
    }
}

/**
 * 数组映射
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */
function map(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.map && obj.map === nativeMap) {
        return obj.map(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            result.push(cb.call(context, obj[i], i, obj));
        }
        return result;
    }
}

/**
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {Object} [memo]
 * @param {*} [context]
 * @return {Array}
 */
function reduce(obj, cb, memo, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.reduce && obj.reduce === nativeReduce) {
        return obj.reduce(cb, memo, context);
    }
    else {
        for (var i = 0, len = obj.length; i < len; i++) {
            memo = cb.call(context, memo, obj[i], i, obj);
        }
        return memo;
    }
}

/**
 * 数组过滤
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */
function filter(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.filter && obj.filter === nativeFilter) {
        return obj.filter(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            if (cb.call(context, obj[i], i, obj)) {
                result.push(obj[i]);
            }
        }
        return result;
    }
}

/**
 * 数组项查找
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {*}
 */
function find(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    for (var i = 0, len = obj.length; i < len; i++) {
        if (cb.call(context, obj[i], i, obj)) {
            return obj[i];
        }
    }
}

/**
 * @memberOf module:zrender/core/util
 * @param {Function} func
 * @param {*} context
 * @return {Function}
 */
function bind(func, context) {
    var args = nativeSlice.call(arguments, 2);
    return function () {
        return func.apply(context, args.concat(nativeSlice.call(arguments)));
    };
}

/**
 * @memberOf module:zrender/core/util
 * @param {Function} func
 * @return {Function}
 */
function curry(func) {
    var args = nativeSlice.call(arguments, 1);
    return function () {
        return func.apply(this, args.concat(nativeSlice.call(arguments)));
    };
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isArray(value) {
    return objToString.call(value) === '[object Array]';
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isFunction(value) {
    return typeof value === 'function';
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isString(value) {
    return objToString.call(value) === '[object String]';
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isObject(value) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    var type = typeof value;
    return type === 'function' || (!!value && type === 'object');
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isBuiltInObject(value) {
    return !!BUILTIN_OBJECT[objToString.call(value)];
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isTypedArray(value) {
    return !!TYPED_ARRAY[objToString.call(value)];
}

/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */
function isDom(value) {
    return typeof value === 'object'
        && typeof value.nodeType === 'number'
        && typeof value.ownerDocument === 'object';
}

/**
 * Whether is exactly NaN. Notice isNaN('a') returns true.
 * @param {*} value
 * @return {boolean}
 */
function eqNaN(value) {
    return value !== value;
}

/**
 * If value1 is not null, then return value1, otherwise judget rest of values.
 * Low performance.
 * @memberOf module:zrender/core/util
 * @return {*} Final value
 */
function retrieve(values) {
    for (var i = 0, len = arguments.length; i < len; i++) {
        if (arguments[i] != null) {
            return arguments[i];
        }
    }
}

function retrieve2(value0, value1) {
    return value0 != null
        ? value0
        : value1;
}

function retrieve3(value0, value1, value2) {
    return value0 != null
        ? value0
        : value1 != null
        ? value1
        : value2;
}

/**
 * @memberOf module:zrender/core/util
 * @param {Array} arr
 * @param {number} startIndex
 * @param {number} endIndex
 * @return {Array}
 */
function slice() {
    return Function.call.apply(nativeSlice, arguments);
}

/**
 * Normalize css liked array configuration
 * e.g.
 *  3 => [3, 3, 3, 3]
 *  [4, 2] => [4, 2, 4, 2]
 *  [4, 3, 2] => [4, 3, 2, 3]
 * @param {number|Array.<number>} val
 * @return {Array.<number>}
 */
function normalizeCssArray(val) {
    if (typeof (val) === 'number') {
        return [val, val, val, val];
    }
    var len = val.length;
    if (len === 2) {
        // vertical | horizontal
        return [val[0], val[1], val[0], val[1]];
    }
    else if (len === 3) {
        // top | horizontal | bottom
        return [val[0], val[1], val[2], val[1]];
    }
    return val;
}

/**
 * @memberOf module:zrender/core/util
 * @param {boolean} condition
 * @param {string} message
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

/**
 * @memberOf module:zrender/core/util
 * @param {string} str string to be trimed
 * @return {string} trimed string
 */
function trim(str) {
    if (str == null) {
        return null;
    }
    else if (typeof str.trim === 'function') {
        return str.trim();
    }
    else {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
}

var primitiveKey = '__ec_primitive__';
/**
 * Set an object as primitive to be ignored traversing children in clone or merge
 */
function setAsPrimitive(obj) {
    obj[primitiveKey] = true;
}

function isPrimitive(obj) {
    return obj[primitiveKey];
}

/**
 * @constructor
 * @param {Object} obj Only apply `ownProperty`.
 */
function HashMap(obj) {
    var isArr = isArray(obj);
    // Key should not be set on this, otherwise
    // methods get/set/... may be overrided.
    this.data = {};
    var thisMap = this;

    (obj instanceof HashMap)
        ? obj.each(visit)
        : (obj && each(obj, visit));

    function visit(value, key) {
        isArr ? thisMap.set(value, key) : thisMap.set(key, value);
    }
}

HashMap.prototype = {
    constructor: HashMap,
    // Do not provide `has` method to avoid defining what is `has`.
    // (We usually treat `null` and `undefined` as the same, different
    // from ES6 Map).
    get: function (key) {
        return this.data.hasOwnProperty(key) ? this.data[key] : null;
    },
    set: function (key, value) {
        // Comparing with invocation chaining, `return value` is more commonly
        // used in this case: `var someVal = map.set('a', genVal());`
        return (this.data[key] = value);
    },
    // Although util.each can be performed on this hashMap directly, user
    // should not use the exposed keys, who are prefixed.
    each: function (cb, context) {
        context !== void 0 && (cb = bind(cb, context));
        for (var key in this.data) {
            this.data.hasOwnProperty(key) && cb(this.data[key], key);
        }
    },
    // Do not use this method if performance sensitive.
    removeKey: function (key) {
        delete this.data[key];
    }
};

function createHashMap(obj) {
    return new HashMap(obj);
}

function concatArray(a, b) {
    var newArray = new a.constructor(a.length + b.length);
    for (var i = 0; i < a.length; i++) {
        newArray[i] = a[i];
    }
    var offset = a.length;
    for (i = 0; i < b.length; i++) {
        newArray[i + offset] = b[i];
    }
    return newArray;
}


function noop() {}


var util = (Object.freeze || Object)({
	$override: $override,
	clone: clone,
	merge: merge,
	mergeAll: mergeAll,
	extend: extend,
	defaults: defaults,
	createCanvas: createCanvas,
	getContext: getContext,
	indexOf: indexOf,
	inherits: inherits,
	mixin: mixin,
	isArrayLike: isArrayLike,
	each: each,
	map: map,
	reduce: reduce,
	filter: filter,
	find: find,
	bind: bind,
	curry: curry,
	isArray: isArray,
	isFunction: isFunction,
	isString: isString,
	isObject: isObject,
	isBuiltInObject: isBuiltInObject,
	isTypedArray: isTypedArray,
	isDom: isDom,
	eqNaN: eqNaN,
	retrieve: retrieve,
	retrieve2: retrieve2,
	retrieve3: retrieve3,
	slice: slice,
	normalizeCssArray: normalizeCssArray,
	assert: assert,
	trim: trim,
	setAsPrimitive: setAsPrimitive,
	isPrimitive: isPrimitive,
	createHashMap: createHashMap,
	concatArray: concatArray,
	noop: noop
});

var ArrayCtor = typeof Float32Array === 'undefined'
    ? Array
    : Float32Array;

/**
 * 创建一个向量
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @return {Vector2}
 */
function create(x, y) {
    var out = new ArrayCtor(2);
    if (x == null) {
        x = 0;
    }
    if (y == null) {
        y = 0;
    }
    out[0] = x;
    out[1] = y;
    return out;
}

/**
 * 复制向量数据
 * @param {Vector2} out
 * @param {Vector2} v
 * @return {Vector2}
 */
function copy(out, v) {
    out[0] = v[0];
    out[1] = v[1];
    return out;
}

/**
 * 克隆一个向量
 * @param {Vector2} v
 * @return {Vector2}
 */
function clone$1(v) {
    var out = new ArrayCtor(2);
    out[0] = v[0];
    out[1] = v[1];
    return out;
}

/**
 * 设置向量的两个项
 * @param {Vector2} out
 * @param {number} a
 * @param {number} b
 * @return {Vector2} 结果
 */
function set(out, a, b) {
    out[0] = a;
    out[1] = b;
    return out;
}

/**
 * 向量相加
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function add(out, v1, v2) {
    out[0] = v1[0] + v2[0];
    out[1] = v1[1] + v2[1];
    return out;
}

/**
 * 向量缩放后相加
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @param {number} a
 */
function scaleAndAdd(out, v1, v2, a) {
    out[0] = v1[0] + v2[0] * a;
    out[1] = v1[1] + v2[1] * a;
    return out;
}

/**
 * 向量相减
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    return out;
}

/**
 * 向量长度
 * @param {Vector2} v
 * @return {number}
 */
function len(v) {
    return Math.sqrt(lenSquare(v));
}
var length = len; // jshint ignore:line

/**
 * 向量长度平方
 * @param {Vector2} v
 * @return {number}
 */
function lenSquare(v) {
    return v[0] * v[0] + v[1] * v[1];
}
var lengthSquare = lenSquare;

/**
 * 向量乘法
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function mul(out, v1, v2) {
    out[0] = v1[0] * v2[0];
    out[1] = v1[1] * v2[1];
    return out;
}

/**
 * 向量除法
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */
function div(out, v1, v2) {
    out[0] = v1[0] / v2[0];
    out[1] = v1[1] / v2[1];
    return out;
}

/**
 * 向量点乘
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */
function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
}

/**
 * 向量缩放
 * @param {Vector2} out
 * @param {Vector2} v
 * @param {number} s
 */
function scale(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    return out;
}

/**
 * 向量归一化
 * @param {Vector2} out
 * @param {Vector2} v
 */
function normalize(out, v) {
    var d = len(v);
    if (d === 0) {
        out[0] = 0;
        out[1] = 0;
    }
    else {
        out[0] = v[0] / d;
        out[1] = v[1] / d;
    }
    return out;
}

/**
 * 计算向量间距离
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */
function distance(v1, v2) {
    return Math.sqrt(
        (v1[0] - v2[0]) * (v1[0] - v2[0])
        + (v1[1] - v2[1]) * (v1[1] - v2[1])
    );
}
var dist = distance;

/**
 * 向量距离平方
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */
function distanceSquare(v1, v2) {
    return (v1[0] - v2[0]) * (v1[0] - v2[0])
        + (v1[1] - v2[1]) * (v1[1] - v2[1]);
}
var distSquare = distanceSquare;

/**
 * 求负向量
 * @param {Vector2} out
 * @param {Vector2} v
 */
function negate(out, v) {
    out[0] = -v[0];
    out[1] = -v[1];
    return out;
}

/**
 * 插值两个点
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @param {number} t
 */
function lerp(out, v1, v2, t) {
    out[0] = v1[0] + t * (v2[0] - v1[0]);
    out[1] = v1[1] + t * (v2[1] - v1[1]);
    return out;
}

/**
 * 矩阵左乘向量
 * @param {Vector2} out
 * @param {Vector2} v
 * @param {Vector2} m
 */
function applyTransform(out, v, m) {
    var x = v[0];
    var y = v[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}

/**
 * 求两个向量最小值
 * @param  {Vector2} out
 * @param  {Vector2} v1
 * @param  {Vector2} v2
 */
function min(out, v1, v2) {
    out[0] = Math.min(v1[0], v2[0]);
    out[1] = Math.min(v1[1], v2[1]);
    return out;
}

/**
 * 求两个向量最大值
 * @param  {Vector2} out
 * @param  {Vector2} v1
 * @param  {Vector2} v2
 */
function max(out, v1, v2) {
    out[0] = Math.max(v1[0], v2[0]);
    out[1] = Math.max(v1[1], v2[1]);
    return out;
}


var vector = (Object.freeze || Object)({
	create: create,
	copy: copy,
	clone: clone$1,
	set: set,
	add: add,
	scaleAndAdd: scaleAndAdd,
	sub: sub,
	len: len,
	length: length,
	lenSquare: lenSquare,
	lengthSquare: lengthSquare,
	mul: mul,
	div: div,
	dot: dot,
	scale: scale,
	normalize: normalize,
	distance: distance,
	dist: dist,
	distanceSquare: distanceSquare,
	distSquare: distSquare,
	negate: negate,
	lerp: lerp,
	applyTransform: applyTransform,
	min: min,
	max: max
});

// TODO Draggable for group
// FIXME Draggable on element which has parent rotation or scale
function Draggable() {

    this.on('mousedown', this._dragStart, this);
    this.on('mousemove', this._drag, this);
    this.on('mouseup', this._dragEnd, this);
    this.on('globalout', this._dragEnd, this);
    // this._dropTarget = null;
    // this._draggingTarget = null;

    // this._x = 0;
    // this._y = 0;
}

Draggable.prototype = {

    constructor: Draggable,

    _dragStart: function (e) {
        var draggingTarget = e.target;
        if (draggingTarget && draggingTarget.draggable) {
            this._draggingTarget = draggingTarget;
            draggingTarget.dragging = true;
            this._x = e.offsetX;
            this._y = e.offsetY;

            this.dispatchToElement(param(draggingTarget, e), 'dragstart', e.event);
        }
    },

    _drag: function (e) {
        var draggingTarget = this._draggingTarget;
        if (draggingTarget) {

            var x = e.offsetX;
            var y = e.offsetY;

            var dx = x - this._x;
            var dy = y - this._y;
            this._x = x;
            this._y = y;

            draggingTarget.drift(dx, dy, e);
            this.dispatchToElement(param(draggingTarget, e), 'drag', e.event);

            var dropTarget = this.findHover(x, y, draggingTarget).target;
            var lastDropTarget = this._dropTarget;
            this._dropTarget = dropTarget;

            if (draggingTarget !== dropTarget) {
                if (lastDropTarget && dropTarget !== lastDropTarget) {
                    this.dispatchToElement(param(lastDropTarget, e), 'dragleave', e.event);
                }
                if (dropTarget && dropTarget !== lastDropTarget) {
                    this.dispatchToElement(param(dropTarget, e), 'dragenter', e.event);
                }
            }
        }
    },

    _dragEnd: function (e) {
        var draggingTarget = this._draggingTarget;

        if (draggingTarget) {
            draggingTarget.dragging = false;
        }

        this.dispatchToElement(param(draggingTarget, e), 'dragend', e.event);

        if (this._dropTarget) {
            this.dispatchToElement(param(this._dropTarget, e), 'drop', e.event);
        }

        this._draggingTarget = null;
        this._dropTarget = null;
    }

};

function param(target, e) {
    return {target: target, topTarget: e && e.topTarget};
}

/**
 * Event Mixin
 * @module zrender/mixin/Eventful
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         pissang (https://www.github.com/pissang)
 */

var arrySlice = Array.prototype.slice;

/**
 * Event dispatcher.
 *
 * @alias module:zrender/mixin/Eventful
 * @constructor
 * @param {Object} [eventProcessor] The object eventProcessor is the scope when
 *        `eventProcessor.xxx` called.
 * @param {Function} [eventProcessor.normalizeQuery]
 *        param: {string|Object} Raw query.
 *        return: {string|Object} Normalized query.
 * @param {Function} [eventProcessor.filter] Event will be dispatched only
 *        if it returns `true`.
 *        param: {string} eventType
 *        param: {string|Object} query
 *        return: {boolean}
 * @param {Function} [eventProcessor.afterTrigger] Call after all handlers called.
 *        param: {string} eventType
 */
var Eventful = function (eventProcessor) {
    this._$handlers = {};
    this._$eventProcessor = eventProcessor;
};

Eventful.prototype = {

    constructor: Eventful,

    /**
     * The handler can only be triggered once, then removed.
     *
     * @param {string} event The event name.
     * @param {string|Object} [query] Condition used on event filter.
     * @param {Function} handler The event handler.
     * @param {Object} context
     */
    one: function (event, query, handler, context) {
        return on(this, event, query, handler, context, true);
    },

    /**
     * Bind a handler.
     *
     * @param {string} event The event name.
     * @param {string|Object} [query] Condition used on event filter.
     * @param {Function} handler The event handler.
     * @param {Object} [context]
     */
    on: function (event, query, handler, context) {
        return on(this, event, query, handler, context, false);
    },

    /**
     * Whether any handler has bound.
     *
     * @param  {string}  event
     * @return {boolean}
     */
    isSilent: function (event) {
        var _h = this._$handlers;
        return !_h[event] || !_h[event].length;
    },

    /**
     * Unbind a event.
     *
     * @param {string} event The event name.
     * @param {Function} [handler] The event handler.
     */
    off: function (event, handler) {
        var _h = this._$handlers;

        if (!event) {
            this._$handlers = {};
            return this;
        }

        if (handler) {
            if (_h[event]) {
                var newList = [];
                for (var i = 0, l = _h[event].length; i < l; i++) {
                    if (_h[event][i].h !== handler) {
                        newList.push(_h[event][i]);
                    }
                }
                _h[event] = newList;
            }

            if (_h[event] && _h[event].length === 0) {
                delete _h[event];
            }
        }
        else {
            delete _h[event];
        }

        return this;
    },

    /**
     * Dispatch a event.
     *
     * @param {string} type The event name.
     */
    trigger: function (type) {
        var _h = this._$handlers[type];
        var eventProcessor = this._$eventProcessor;

        if (_h) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 3) {
                args = arrySlice.call(args, 1);
            }

            var len = _h.length;
            for (var i = 0; i < len;) {
                var hItem = _h[i];
                if (eventProcessor
                    && eventProcessor.filter
                    && hItem.query != null
                    && !eventProcessor.filter(type, hItem.query)
                ) {
                    i++;
                    continue;
                }

                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        hItem.h.call(hItem.ctx);
                        break;
                    case 2:
                        hItem.h.call(hItem.ctx, args[1]);
                        break;
                    case 3:
                        hItem.h.call(hItem.ctx, args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        hItem.h.apply(hItem.ctx, args);
                        break;
                }

                if (hItem.one) {
                    _h.splice(i, 1);
                    len--;
                }
                else {
                    i++;
                }
            }
        }

        eventProcessor && eventProcessor.afterTrigger
            && eventProcessor.afterTrigger(type);

        return this;
    },

    /**
     * Dispatch a event with context, which is specified at the last parameter.
     *
     * @param {string} type The event name.
     */
    triggerWithContext: function (type) {
        var _h = this._$handlers[type];
        var eventProcessor = this._$eventProcessor;

        if (_h) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 4) {
                args = arrySlice.call(args, 1, args.length - 1);
            }
            var ctx = args[args.length - 1];

            var len = _h.length;
            for (var i = 0; i < len;) {
                var hItem = _h[i];
                if (eventProcessor
                    && eventProcessor.filter
                    && hItem.query != null
                    && !eventProcessor.filter(type, hItem.query)
                ) {
                    i++;
                    continue;
                }

                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        hItem.h.call(ctx);
                        break;
                    case 2:
                        hItem.h.call(ctx, args[1]);
                        break;
                    case 3:
                        hItem.h.call(ctx, args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        hItem.h.apply(ctx, args);
                        break;
                }

                if (hItem.one) {
                    _h.splice(i, 1);
                    len--;
                }
                else {
                    i++;
                }
            }
        }

        eventProcessor && eventProcessor.afterTrigger
            && eventProcessor.afterTrigger(type);

        return this;
    }
};

function normalizeQuery(host, query) {
    var eventProcessor = host._$eventProcessor;
    if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
        query = eventProcessor.normalizeQuery(query);
    }
    return query;
}

function on(eventful, event, query, handler, context, isOnce) {
    var _h = eventful._$handlers;

    if (typeof query === 'function') {
        context = handler;
        handler = query;
        query = null;
    }

    if (!handler || !event) {
        return eventful;
    }

    query = normalizeQuery(eventful, query);

    if (!_h[event]) {
        _h[event] = [];
    }

    for (var i = 0; i < _h[event].length; i++) {
        if (_h[event][i].h === handler) {
            return eventful;
        }
    }

    var wrap = {
        h: handler,
        one: isOnce,
        query: query,
        ctx: context || eventful,
        // FIXME
        // Do not publish this feature util it is proved that it makes sense.
        callAtLast: handler.zrEventfulCallAtLast
    };

    var lastIndex = _h[event].length - 1;
    var lastWrap = _h[event][lastIndex];
    (lastWrap && lastWrap.callAtLast)
        ? _h[event].splice(lastIndex, 0, wrap)
        : _h[event].push(wrap);

    return eventful;
}

/**
 * 事件辅助类
 * @module zrender/core/event
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 */

var isDomLevel2 = (typeof window !== 'undefined') && !!window.addEventListener;

var MOUSE_EVENT_REG = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;

function getBoundingClientRect(el) {
    // BlackBerry 5, iOS 3 (original iPhone) don't have getBoundingRect
    return el.getBoundingClientRect ? el.getBoundingClientRect() : {left: 0, top: 0};
}

// `calculate` is optional, default false
function clientToLocal(el, e, out, calculate) {
    out = out || {};

    // According to the W3C Working Draft, offsetX and offsetY should be relative
    // to the padding edge of the target element. The only browser using this convention
    // is IE. Webkit uses the border edge, Opera uses the content edge, and FireFox does
    // not support the properties.
    // (see http://www.jacklmoore.com/notes/mouse-position/)
    // In zr painter.dom, padding edge equals to border edge.

    // FIXME
    // When mousemove event triggered on ec tooltip, target is not zr painter.dom, and
    // offsetX/Y is relative to e.target, where the calculation of zrX/Y via offsetX/Y
    // is too complex. So css-transfrom dont support in this case temporarily.
    if (calculate || !env$1.canvasSupported) {
        defaultGetZrXY(el, e, out);
    }
    // Caution: In FireFox, layerX/layerY Mouse position relative to the closest positioned
    // ancestor element, so we should make sure el is positioned (e.g., not position:static).
    // BTW1, Webkit don't return the same results as FF in non-simple cases (like add
    // zoom-factor, overflow / opacity layers, transforms ...)
    // BTW2, (ev.offsetY || ev.pageY - $(ev.target).offset().top) is not correct in preserve-3d.
    // <https://bugs.jquery.com/ticket/8523#comment:14>
    // BTW3, In ff, offsetX/offsetY is always 0.
    else if (env$1.browser.firefox && e.layerX != null && e.layerX !== e.offsetX) {
        out.zrX = e.layerX;
        out.zrY = e.layerY;
    }
    // For IE6+, chrome, safari, opera. (When will ff support offsetX?)
    else if (e.offsetX != null) {
        out.zrX = e.offsetX;
        out.zrY = e.offsetY;
    }
    // For some other device, e.g., IOS safari.
    else {
        defaultGetZrXY(el, e, out);
    }

    return out;
}

function defaultGetZrXY(el, e, out) {
    // This well-known method below does not support css transform.
    var box = getBoundingClientRect(el);
    out.zrX = e.clientX - box.left;
    out.zrY = e.clientY - box.top;
}

/**
 * 如果存在第三方嵌入的一些dom触发的事件，或touch事件，需要转换一下事件坐标.
 * `calculate` is optional, default false.
 */
function normalizeEvent(el, e, calculate) {

    e = e || window.event;

    if (e.zrX != null) {
        return e;
    }

    var eventType = e.type;
    var isTouch = eventType && eventType.indexOf('touch') >= 0;

    if (!isTouch) {
        clientToLocal(el, e, e, calculate);
        e.zrDelta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
    }
    else {
        var touch = eventType !== 'touchend'
            ? e.targetTouches[0]
            : e.changedTouches[0];
        touch && clientToLocal(el, touch, e, calculate);
    }

    // Add which for click: 1 === left; 2 === middle; 3 === right; otherwise: 0;
    // See jQuery: https://github.com/jquery/jquery/blob/master/src/event.js
    // If e.which has been defined, if may be readonly,
    // see: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which
    var button = e.button;
    if (e.which == null && button !== undefined && MOUSE_EVENT_REG.test(e.type)) {
        e.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
    }
    // [Caution]: `e.which` from browser is not always reliable. For example,
    // when press left button and `mousemove (pointermove)` in Edge, the `e.which`
    // is 65536 and the `e.button` is -1. But the `mouseup (pointerup)` and
    // `mousedown (pointerdown)` is the same as Chrome does.

    return e;
}

/**
 * @param {HTMLElement} el
 * @param {string} name
 * @param {Function} handler
 */
function addEventListener(el, name, handler) {
    if (isDomLevel2) {
        // Reproduct the console warning:
        // [Violation] Added non-passive event listener to a scroll-blocking <some> event.
        // Consider marking event handler as 'passive' to make the page more responsive.
        // Just set console log level: verbose in chrome dev tool.
        // then the warning log will be printed when addEventListener called.
        // See https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
        // We have not yet found a neat way to using passive. Because in zrender the dom event
        // listener delegate all of the upper events of element. Some of those events need
        // to prevent default. For example, the feature `preventDefaultMouseMove` of echarts.
        // Before passive can be adopted, these issues should be considered:
        // (1) Whether and how a zrender user specifies an event listener passive. And by default,
        // passive or not.
        // (2) How to tread that some zrender event listener is passive, and some is not. If
        // we use other way but not preventDefault of mousewheel and touchmove, browser
        // compatibility should be handled.

        // var opts = (env.passiveSupported && name === 'mousewheel')
        //     ? {passive: true}
        //     // By default, the third param of el.addEventListener is `capture: false`.
        //     : void 0;
        // el.addEventListener(name, handler /* , opts */);
        el.addEventListener(name, handler);
    }
    else {
        el.attachEvent('on' + name, handler);
    }
}

function removeEventListener(el, name, handler) {
    if (isDomLevel2) {
        el.removeEventListener(name, handler);
    }
    else {
        el.detachEvent('on' + name, handler);
    }
}

/**
 * preventDefault and stopPropagation.
 * Notice: do not do that in zrender. Upper application
 * do that if necessary.
 *
 * @memberOf module:zrender/core/event
 * @method
 * @param {Event} e : event对象
 */
var stop = isDomLevel2
    ? function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
    }
    : function (e) {
        e.returnValue = false;
        e.cancelBubble = true;
    };

/**
 * This method only works for mouseup and mousedown. The functionality is restricted
 * for fault tolerance, See the `e.which` compatibility above.
 *
 * @param {MouseEvent} e
 * @return {boolean}
 */


/**
 * To be removed.
 * @deprecated
 */

/**
 * Only implements needed gestures for mobile.
 */

var GestureMgr = function () {

    /**
     * @private
     * @type {Array.<Object>}
     */
    this._track = [];
};

GestureMgr.prototype = {

    constructor: GestureMgr,

    recognize: function (event, target, root) {
        this._doTrack(event, target, root);
        return this._recognize(event);
    },

    clear: function () {
        this._track.length = 0;
        return this;
    },

    _doTrack: function (event, target, root) {
        var touches = event.touches;

        if (!touches) {
            return;
        }

        var trackItem = {
            points: [],
            touches: [],
            target: target,
            event: event
        };

        for (var i = 0, len = touches.length; i < len; i++) {
            var touch = touches[i];
            var pos = clientToLocal(root, touch, {});
            trackItem.points.push([pos.zrX, pos.zrY]);
            trackItem.touches.push(touch);
        }

        this._track.push(trackItem);
    },

    _recognize: function (event) {
        for (var eventName in recognizers) {
            if (recognizers.hasOwnProperty(eventName)) {
                var gestureInfo = recognizers[eventName](this._track, event);
                if (gestureInfo) {
                    return gestureInfo;
                }
            }
        }
    }
};

function dist$1(pointPair) {
    var dx = pointPair[1][0] - pointPair[0][0];
    var dy = pointPair[1][1] - pointPair[0][1];

    return Math.sqrt(dx * dx + dy * dy);
}

function center(pointPair) {
    return [
        (pointPair[0][0] + pointPair[1][0]) / 2,
        (pointPair[0][1] + pointPair[1][1]) / 2
    ];
}

var recognizers = {

    pinch: function (track, event) {
        var trackLen = track.length;

        if (!trackLen) {
            return;
        }

        var pinchEnd = (track[trackLen - 1] || {}).points;
        var pinchPre = (track[trackLen - 2] || {}).points || pinchEnd;

        if (pinchPre
            && pinchPre.length > 1
            && pinchEnd
            && pinchEnd.length > 1
        ) {
            var pinchScale = dist$1(pinchEnd) / dist$1(pinchPre);
            !isFinite(pinchScale) && (pinchScale = 1);

            event.pinchScale = pinchScale;

            var pinchCenter = center(pinchEnd);
            event.pinchX = pinchCenter[0];
            event.pinchY = pinchCenter[1];

            return {
                type: 'pinch',
                target: track[0].target,
                event: event
            };
        }
    }

    // Only pinch currently.
};

var SILENT = 'silent';

function makeEventPacket(eveType, targetInfo, event) {
    return {
        type: eveType,
        event: event,
        // target can only be an element that is not silent.
        target: targetInfo.target,
        // topTarget can be a silent element.
        topTarget: targetInfo.topTarget,
        cancelBubble: false,
        offsetX: event.zrX,
        offsetY: event.zrY,
        gestureEvent: event.gestureEvent,
        pinchX: event.pinchX,
        pinchY: event.pinchY,
        pinchScale: event.pinchScale,
        wheelDelta: event.zrDelta,
        zrByTouch: event.zrByTouch,
        which: event.which,
        stop: stopEvent
    };
}

function stopEvent(event) {
    stop(this.event);
}

function EmptyProxy() {}
EmptyProxy.prototype.dispose = function () {};

var handlerNames = [
    'click', 'dblclick', 'mousewheel', 'mouseout',
    'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];
/**
 * @alias module:zrender/Handler
 * @constructor
 * @extends module:zrender/mixin/Eventful
 * @param {module:zrender/Storage} storage Storage instance.
 * @param {module:zrender/Painter} painter Painter instance.
 * @param {module:zrender/dom/HandlerProxy} proxy HandlerProxy instance.
 * @param {HTMLElement} painterRoot painter.root (not painter.getViewportRoot()).
 */
var Handler = function (storage, painter, proxy, painterRoot) {
    Eventful.call(this);

    this.storage = storage;

    this.painter = painter;

    this.painterRoot = painterRoot;

    proxy = proxy || new EmptyProxy();

    /**
     * Proxy of event. can be Dom, WebGLSurface, etc.
     */
    this.proxy = null;

    /**
     * {target, topTarget, x, y}
     * @private
     * @type {Object}
     */
    this._hovered = {};

    /**
     * @private
     * @type {Date}
     */
    this._lastTouchMoment;

    /**
     * @private
     * @type {number}
     */
    this._lastX;

    /**
     * @private
     * @type {number}
     */
    this._lastY;

    /**
     * @private
     * @type {module:zrender/core/GestureMgr}
     */
    this._gestureMgr;


    Draggable.call(this);

    this.setHandlerProxy(proxy);
};

Handler.prototype = {

    constructor: Handler,

    setHandlerProxy: function (proxy) {
        if (this.proxy) {
            this.proxy.dispose();
        }

        if (proxy) {
            each(handlerNames, function (name) {
                proxy.on && proxy.on(name, this[name], this);
            }, this);
            // Attach handler
            proxy.handler = this;
        }
        this.proxy = proxy;
    },

    mousemove: function (event) {
        var x = event.zrX;
        var y = event.zrY;

        var lastHovered = this._hovered;
        var lastHoveredTarget = lastHovered.target;

        // If lastHoveredTarget is removed from zr (detected by '__zr') by some API call
        // (like 'setOption' or 'dispatchAction') in event handlers, we should find
        // lastHovered again here. Otherwise 'mouseout' can not be triggered normally.
        // See #6198.
        if (lastHoveredTarget && !lastHoveredTarget.__zr) {
            lastHovered = this.findHover(lastHovered.x, lastHovered.y);
            lastHoveredTarget = lastHovered.target;
        }

        var hovered = this._hovered = this.findHover(x, y);
        var hoveredTarget = hovered.target;

        var proxy = this.proxy;
        proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : 'default');

        // Mouse out on previous hovered element
        if (lastHoveredTarget && hoveredTarget !== lastHoveredTarget) {
            this.dispatchToElement(lastHovered, 'mouseout', event);
        }

        // Mouse moving on one element
        this.dispatchToElement(hovered, 'mousemove', event);

        // Mouse over on a new element
        if (hoveredTarget && hoveredTarget !== lastHoveredTarget) {
            this.dispatchToElement(hovered, 'mouseover', event);
        }
    },

    mouseout: function (event) {
        this.dispatchToElement(this._hovered, 'mouseout', event);

        // There might be some doms created by upper layer application
        // at the same level of painter.getViewportRoot() (e.g., tooltip
        // dom created by echarts), where 'globalout' event should not
        // be triggered when mouse enters these doms. (But 'mouseout'
        // should be triggered at the original hovered element as usual).
        var element = event.toElement || event.relatedTarget;
        var innerDom;
        do {
            element = element && element.parentNode;
        }
        while (element && element.nodeType !== 9 && !(
            innerDom = element === this.painterRoot
        ));

        !innerDom && this.trigger('globalout', {event: event});
    },

    /**
     * Resize
     */
    resize: function (event) {
        this._hovered = {};
    },

    /**
     * Dispatch event
     * @param {string} eventName
     * @param {event=} eventArgs
     */
    dispatch: function (eventName, eventArgs) {
        var handler = this[eventName];
        handler && handler.call(this, eventArgs);
    },

    /**
     * Dispose
     */
    dispose: function () {

        this.proxy.dispose();

        this.storage =
        this.proxy =
        this.painter = null;
    },

    /**
     * 设置默认的cursor style
     * @param {string} [cursorStyle='default'] 例如 crosshair
     */
    setCursorStyle: function (cursorStyle) {
        var proxy = this.proxy;
        proxy.setCursor && proxy.setCursor(cursorStyle);
    },

    /**
     * 事件分发代理
     *
     * @private
     * @param {Object} targetInfo {target, topTarget} 目标图形元素
     * @param {string} eventName 事件名称
     * @param {Object} event 事件对象
     */
    dispatchToElement: function (targetInfo, eventName, event) {
        targetInfo = targetInfo || {};
        var el = targetInfo.target;
        if (el && el.silent) {
            return;
        }
        var eventHandler = 'on' + eventName;
        var eventPacket = makeEventPacket(eventName, targetInfo, event);

        while (el) {
            el[eventHandler]
                && (eventPacket.cancelBubble = el[eventHandler].call(el, eventPacket));

            el.trigger(eventName, eventPacket);

            el = el.parent;

            if (eventPacket.cancelBubble) {
                break;
            }
        }

        if (!eventPacket.cancelBubble) {
            // 冒泡到顶级 zrender 对象
            this.trigger(eventName, eventPacket);
            // 分发事件到用户自定义层
            // 用户有可能在全局 click 事件中 dispose，所以需要判断下 painter 是否存在
            this.painter && this.painter.eachOtherLayer(function (layer) {
                if (typeof (layer[eventHandler]) === 'function') {
                    layer[eventHandler].call(layer, eventPacket);
                }
                if (layer.trigger) {
                    layer.trigger(eventName, eventPacket);
                }
            });
        }
    },

    /**
     * @private
     * @param {number} x
     * @param {number} y
     * @param {module:zrender/graphic/Displayable} exclude
     * @return {model:zrender/Element}
     * @method
     */
    findHover: function (x, y, exclude) {
        var list = this.storage.getDisplayList();
        var out = {x: x, y: y};

        for (var i = list.length - 1; i >= 0; i--) {
            var hoverCheckResult;
            if (list[i] !== exclude
                // getDisplayList may include ignored item in VML mode
                && !list[i].ignore
                && (hoverCheckResult = isHover(list[i], x, y))
            ) {
                !out.topTarget && (out.topTarget = list[i]);
                if (hoverCheckResult !== SILENT) {
                    out.target = list[i];
                    break;
                }
            }
        }

        return out;
    },

    processGesture: function (event, stage) {
        if (!this._gestureMgr) {
            this._gestureMgr = new GestureMgr();
        }
        var gestureMgr = this._gestureMgr;

        stage === 'start' && gestureMgr.clear();

        var gestureInfo = gestureMgr.recognize(
            event,
            this.findHover(event.zrX, event.zrY, null).target,
            this.proxy.dom
        );

        stage === 'end' && gestureMgr.clear();

        // Do not do any preventDefault here. Upper application do that if necessary.
        if (gestureInfo) {
            var type = gestureInfo.type;
            event.gestureEvent = type;

            this.dispatchToElement({target: gestureInfo.target}, type, gestureInfo.event);
        }
    }
};

// Common handlers
each(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function (name) {
    Handler.prototype[name] = function (event) {
        // Find hover again to avoid click event is dispatched manually. Or click is triggered without mouseover
        var hovered = this.findHover(event.zrX, event.zrY);
        var hoveredTarget = hovered.target;

        if (name === 'mousedown') {
            this._downEl = hoveredTarget;
            this._downPoint = [event.zrX, event.zrY];
            // In case click triggered before mouseup
            this._upEl = hoveredTarget;
        }
        else if (name === 'mouseup') {
            this._upEl = hoveredTarget;
        }
        else if (name === 'click') {
            if (this._downEl !== this._upEl
                // Original click event is triggered on the whole canvas element,
                // including the case that `mousedown` - `mousemove` - `mouseup`,
                // which should be filtered, otherwise it will bring trouble to
                // pan and zoom.
                || !this._downPoint
                // Arbitrary value
                || dist(this._downPoint, [event.zrX, event.zrY]) > 4
            ) {
                return;
            }
            this._downPoint = null;
        }

        this.dispatchToElement(hovered, name, event);
    };
});

function isHover(displayable, x, y) {
    if (displayable[displayable.rectHover ? 'rectContain' : 'contain'](x, y)) {
        var el = displayable;
        var isSilent;
        while (el) {
            // If clipped by ancestor.
            // FIXME: If clipPath has neither stroke nor fill,
            // el.clipPath.contain(x, y) will always return false.
            if (el.clipPath && !el.clipPath.contain(x, y)) {
                return false;
            }
            if (el.silent) {
                isSilent = true;
            }
            el = el.parent;
        }
        return isSilent ? SILENT : true;
    }

    return false;
}

mixin(Handler, Eventful);
mixin(Handler, Draggable);

/**
 * 3x2矩阵操作类
 * @exports zrender/tool/matrix
 */

var ArrayCtor$1 = typeof Float32Array === 'undefined'
    ? Array
    : Float32Array;

/**
 * Create a identity matrix.
 * @return {Float32Array|Array.<number>}
 */
function create$1() {
    var out = new ArrayCtor$1(6);
    identity(out);

    return out;
}

/**
 * 设置矩阵为单位矩阵
 * @param {Float32Array|Array.<number>} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * 复制矩阵
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} m
 */
function copy$1(out, m) {
    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4];
    out[5] = m[5];
    return out;
}

/**
 * 矩阵相乘
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} m1
 * @param {Float32Array|Array.<number>} m2
 */
function mul$1(out, m1, m2) {
    // Consider matrix.mul(m, m2, m);
    // where out is the same as m2.
    // So use temp variable to escape error.
    var out0 = m1[0] * m2[0] + m1[2] * m2[1];
    var out1 = m1[1] * m2[0] + m1[3] * m2[1];
    var out2 = m1[0] * m2[2] + m1[2] * m2[3];
    var out3 = m1[1] * m2[2] + m1[3] * m2[3];
    var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = out3;
    out[4] = out4;
    out[5] = out5;
    return out;
}

/**
 * 平移变换
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 * @param {Float32Array|Array.<number>} v
 */
function translate(out, a, v) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4] + v[0];
    out[5] = a[5] + v[1];
    return out;
}

/**
 * 旋转变换
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 * @param {number} rad
 */
function rotate(out, a, rad) {
    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];
    var st = Math.sin(rad);
    var ct = Math.cos(rad);

    out[0] = aa * ct + ab * st;
    out[1] = -aa * st + ab * ct;
    out[2] = ac * ct + ad * st;
    out[3] = -ac * st + ct * ad;
    out[4] = ct * atx + st * aty;
    out[5] = ct * aty - st * atx;
    return out;
}

/**
 * 缩放变换
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 * @param {Float32Array|Array.<number>} v
 */
function scale$1(out, a, v) {
    var vx = v[0];
    var vy = v[1];
    out[0] = a[0] * vx;
    out[1] = a[1] * vy;
    out[2] = a[2] * vx;
    out[3] = a[3] * vy;
    out[4] = a[4] * vx;
    out[5] = a[5] * vy;
    return out;
}

/**
 * 求逆矩阵
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 */
function invert(out, a) {

    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];

    var det = aa * ad - ab * ac;
    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
}

/**
 * Clone a new matrix.
 * @param {Float32Array|Array.<number>} a
 */
function clone$2(a) {
    var b = create$1();
    copy$1(b, a);
    return b;
}

var matrix = (Object.freeze || Object)({
	create: create$1,
	identity: identity,
	copy: copy$1,
	mul: mul$1,
	translate: translate,
	rotate: rotate,
	scale: scale$1,
	invert: invert,
	clone: clone$2
});

/**
 * 提供变换扩展
 * @module zrender/mixin/Transformable
 * @author pissang (https://www.github.com/pissang)
 */

var mIdentity = identity;

var EPSILON = 5e-5;

function isNotAroundZero(val) {
    return val > EPSILON || val < -EPSILON;
}

/**
 * @alias module:zrender/mixin/Transformable
 * @constructor
 */
var Transformable = function (opts) {
    opts = opts || {};
    // If there are no given position, rotation, scale
    if (!opts.position) {
        /**
         * 平移
         * @type {Array.<number>}
         * @default [0, 0]
         */
        this.position = [0, 0];
    }
    if (opts.rotation == null) {
        /**
         * 旋转
         * @type {Array.<number>}
         * @default 0
         */
        this.rotation = 0;
    }
    if (!opts.scale) {
        /**
         * 缩放
         * @type {Array.<number>}
         * @default [1, 1]
         */
        this.scale = [1, 1];
    }
    /**
     * 旋转和缩放的原点
     * @type {Array.<number>}
     * @default null
     */
    this.origin = this.origin || null;
};

var transformableProto = Transformable.prototype;
transformableProto.transform = null;

/**
 * 判断是否需要有坐标变换
 * 如果有坐标变换, 则从position, rotation, scale以及父节点的transform计算出自身的transform矩阵
 */
transformableProto.needLocalTransform = function () {
    return isNotAroundZero(this.rotation)
        || isNotAroundZero(this.position[0])
        || isNotAroundZero(this.position[1])
        || isNotAroundZero(this.scale[0] - 1)
        || isNotAroundZero(this.scale[1] - 1);
};

var scaleTmp = [];
transformableProto.updateTransform = function () {
    var parent = this.parent;
    var parentHasTransform = parent && parent.transform;
    var needLocalTransform = this.needLocalTransform();

    var m = this.transform;
    if (!(needLocalTransform || parentHasTransform)) {
        m && mIdentity(m);
        return;
    }

    m = m || create$1();

    if (needLocalTransform) {
        this.getLocalTransform(m);
    }
    else {
        mIdentity(m);
    }

    // 应用父节点变换
    if (parentHasTransform) {
        if (needLocalTransform) {
            mul$1(m, parent.transform, m);
        }
        else {
            copy$1(m, parent.transform);
        }
    }
    // 保存这个变换矩阵
    this.transform = m;

    var globalScaleRatio = this.globalScaleRatio;
    if (globalScaleRatio != null && globalScaleRatio !== 1) {
        this.getGlobalScale(scaleTmp);
        var relX = scaleTmp[0] < 0 ? -1 : 1;
        var relY = scaleTmp[1] < 0 ? -1 : 1;
        var sx = ((scaleTmp[0] - relX) * globalScaleRatio + relX) / scaleTmp[0] || 0;
        var sy = ((scaleTmp[1] - relY) * globalScaleRatio + relY) / scaleTmp[1] || 0;

        m[0] *= sx;
        m[1] *= sx;
        m[2] *= sy;
        m[3] *= sy;
    }

    this.invTransform = this.invTransform || create$1();
    invert(this.invTransform, m);
};

transformableProto.getLocalTransform = function (m) {
    return Transformable.getLocalTransform(this, m);
};

/**
 * 将自己的transform应用到context上
 * @param {CanvasRenderingContext2D} ctx
 */
transformableProto.setTransform = function (ctx) {
    var m = this.transform;
    var dpr = ctx.dpr || 1;
    if (m) {
        ctx.setTransform(dpr * m[0], dpr * m[1], dpr * m[2], dpr * m[3], dpr * m[4], dpr * m[5]);
    }
    else {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
};

transformableProto.restoreTransform = function (ctx) {
    var dpr = ctx.dpr || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

var tmpTransform = [];
var originTransform = create$1();

transformableProto.setLocalTransform = function (m) {
    if (!m) {
        // TODO return or set identity?
        return;
    }
    var sx = m[0] * m[0] + m[1] * m[1];
    var sy = m[2] * m[2] + m[3] * m[3];
    var position = this.position;
    var scale$$1 = this.scale;
    if (isNotAroundZero(sx - 1)) {
        sx = Math.sqrt(sx);
    }
    if (isNotAroundZero(sy - 1)) {
        sy = Math.sqrt(sy);
    }
    if (m[0] < 0) {
        sx = -sx;
    }
    if (m[3] < 0) {
        sy = -sy;
    }

    position[0] = m[4];
    position[1] = m[5];
    scale$$1[0] = sx;
    scale$$1[1] = sy;
    this.rotation = Math.atan2(-m[1] / sy, m[0] / sx);
};
/**
 * 分解`transform`矩阵到`position`, `rotation`, `scale`
 */
transformableProto.decomposeTransform = function () {
    if (!this.transform) {
        return;
    }
    var parent = this.parent;
    var m = this.transform;
    if (parent && parent.transform) {
        // Get local transform and decompose them to position, scale, rotation
        mul$1(tmpTransform, parent.invTransform, m);
        m = tmpTransform;
    }
    var origin = this.origin;
    if (origin && (origin[0] || origin[1])) {
        originTransform[4] = origin[0];
        originTransform[5] = origin[1];
        mul$1(tmpTransform, m, originTransform);
        tmpTransform[4] -= origin[0];
        tmpTransform[5] -= origin[1];
        m = tmpTransform;
    }

    this.setLocalTransform(m);
};

/**
 * Get global scale
 * @return {Array.<number>}
 */
transformableProto.getGlobalScale = function (out) {
    var m = this.transform;
    out = out || [];
    if (!m) {
        out[0] = 1;
        out[1] = 1;
        return out;
    }
    out[0] = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
    out[1] = Math.sqrt(m[2] * m[2] + m[3] * m[3]);
    if (m[0] < 0) {
        out[0] = -out[0];
    }
    if (m[3] < 0) {
        out[1] = -out[1];
    }
    return out;
};
/**
 * 变换坐标位置到 shape 的局部坐标空间
 * @method
 * @param {number} x
 * @param {number} y
 * @return {Array.<number>}
 */
transformableProto.transformCoordToLocal = function (x, y) {
    var v2 = [x, y];
    var invTransform = this.invTransform;
    if (invTransform) {
        applyTransform(v2, v2, invTransform);
    }
    return v2;
};

/**
 * 变换局部坐标位置到全局坐标空间
 * @method
 * @param {number} x
 * @param {number} y
 * @return {Array.<number>}
 */
transformableProto.transformCoordToGlobal = function (x, y) {
    var v2 = [x, y];
    var transform = this.transform;
    if (transform) {
        applyTransform(v2, v2, transform);
    }
    return v2;
};

/**
 * @static
 * @param {Object} target
 * @param {Array.<number>} target.origin
 * @param {number} target.rotation
 * @param {Array.<number>} target.position
 * @param {Array.<number>} [m]
 */
Transformable.getLocalTransform = function (target, m) {
    m = m || [];
    mIdentity(m);

    var origin = target.origin;
    var scale$$1 = target.scale || [1, 1];
    var rotation = target.rotation || 0;
    var position = target.position || [0, 0];

    if (origin) {
        // Translate to origin
        m[4] -= origin[0];
        m[5] -= origin[1];
    }
    scale$1(m, m, scale$$1);
    if (rotation) {
        rotate(m, m, rotation);
    }
    if (origin) {
        // Translate back from origin
        m[4] += origin[0];
        m[5] += origin[1];
    }

    m[4] += position[0];
    m[5] += position[1];

    return m;
};

/**
 * 缓动代码来自 https://github.com/sole/tween.js/blob/master/src/Tween.js
 * @see http://sole.github.io/tween.js/examples/03_graphs.html
 * @exports zrender/animation/easing
 */
var easing = {
    /**
    * @param {number} k
    * @return {number}
    */
    linear: function (k) {
        return k;
    },

    /**
    * @param {number} k
    * @return {number}
    */
    quadraticIn: function (k) {
        return k * k;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quadraticOut: function (k) {
        return k * (2 - k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quadraticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    },

    // 三次方的缓动（t^3）
    /**
    * @param {number} k
    * @return {number}
    */
    cubicIn: function (k) {
        return k * k * k;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    cubicOut: function (k) {
        return --k * k * k + 1;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    cubicInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    },

    // 四次方的缓动（t^4）
    /**
    * @param {number} k
    * @return {number}
    */
    quarticIn: function (k) {
        return k * k * k * k;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quarticOut: function (k) {
        return 1 - (--k * k * k * k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quarticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k - 2);
    },

    // 五次方的缓动（t^5）
    /**
    * @param {number} k
    * @return {number}
    */
    quinticIn: function (k) {
        return k * k * k * k * k;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quinticOut: function (k) {
        return --k * k * k * k * k + 1;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    quinticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },

    // 正弦曲线的缓动（sin(t)）
    /**
    * @param {number} k
    * @return {number}
    */
    sinusoidalIn: function (k) {
        return 1 - Math.cos(k * Math.PI / 2);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    sinusoidalOut: function (k) {
        return Math.sin(k * Math.PI / 2);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    sinusoidalInOut: function (k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    },

    // 指数曲线的缓动（2^t）
    /**
    * @param {number} k
    * @return {number}
    */
    exponentialIn: function (k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    exponentialOut: function (k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    exponentialInOut: function (k) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },

    // 圆形曲线的缓动（sqrt(1-t^2)）
    /**
    * @param {number} k
    * @return {number}
    */
    circularIn: function (k) {
        return 1 - Math.sqrt(1 - k * k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    circularOut: function (k) {
        return Math.sqrt(1 - (--k * k));
    },
    /**
    * @param {number} k
    * @return {number}
    */
    circularInOut: function (k) {
        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },

    // 创建类似于弹簧在停止前来回振荡的动画
    /**
    * @param {number} k
    * @return {number}
    */
    elasticIn: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return -(a * Math.pow(2, 10 * (k -= 1))
                    * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    /**
    * @param {number} k
    * @return {number}
    */
    elasticOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return (a * Math.pow(2, -10 * k)
                    * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    elasticInOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1))
                * Math.sin((k - s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (k -= 1))
                * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

    },

    // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
    /**
    * @param {number} k
    * @return {number}
    */
    backIn: function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    backOut: function (k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    },
    /**
    * @param {number} k
    * @return {number}
    */
    backInOut: function (k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },

    // 创建弹跳效果
    /**
    * @param {number} k
    * @return {number}
    */
    bounceIn: function (k) {
        return 1 - easing.bounceOut(1 - k);
    },
    /**
    * @param {number} k
    * @return {number}
    */
    bounceOut: function (k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        }
        else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        }
        else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        }
        else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    },
    /**
    * @param {number} k
    * @return {number}
    */
    bounceInOut: function (k) {
        if (k < 0.5) {
            return easing.bounceIn(k * 2) * 0.5;
        }
        return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
};

/**
 * 动画主控制器
 * @config target 动画对象，可以是数组，如果是数组的话会批量分发onframe等事件
 * @config life(1000) 动画时长
 * @config delay(0) 动画延迟时间
 * @config loop(true)
 * @config gap(0) 循环的间隔时间
 * @config onframe
 * @config easing(optional)
 * @config ondestroy(optional)
 * @config onrestart(optional)
 *
 * TODO pause
 */

function Clip(options) {

    this._target = options.target;

    // 生命周期
    this._life = options.life || 1000;
    // 延时
    this._delay = options.delay || 0;
    // 开始时间
    // this._startTime = new Date().getTime() + this._delay;// 单位毫秒
    this._initialized = false;

    // 是否循环
    this.loop = options.loop == null ? false : options.loop;

    this.gap = options.gap || 0;

    this.easing = options.easing || 'Linear';

    this.onframe = options.onframe;
    this.ondestroy = options.ondestroy;
    this.onrestart = options.onrestart;

    this._pausedTime = 0;
    this._paused = false;
}

Clip.prototype = {

    constructor: Clip,

    step: function (globalTime, deltaTime) {
        // Set startTime on first step, or _startTime may has milleseconds different between clips
        // PENDING
        if (!this._initialized) {
            this._startTime = globalTime + this._delay;
            this._initialized = true;
        }

        if (this._paused) {
            this._pausedTime += deltaTime;
            return;
        }

        var percent = (globalTime - this._startTime - this._pausedTime) / this._life;

        // 还没开始
        if (percent < 0) {
            return;
        }

        percent = Math.min(percent, 1);

        var easing$$1 = this.easing;
        var easingFunc = typeof easing$$1 === 'string' ? easing[easing$$1] : easing$$1;
        var schedule = typeof easingFunc === 'function'
            ? easingFunc(percent)
            : percent;

        this.fire('frame', schedule);

        // 结束
        if (percent === 1) {
            if (this.loop) {
                this.restart(globalTime);
                // 重新开始周期
                // 抛出而不是直接调用事件直到 stage.update 后再统一调用这些事件
                return 'restart';
            }

            // 动画完成将这个控制器标识为待删除
            // 在Animation.update中进行批量删除
            this._needsRemove = true;
            return 'destroy';
        }

        return null;
    },

    restart: function (globalTime) {
        var remainder = (globalTime - this._startTime - this._pausedTime) % this._life;
        this._startTime = globalTime - remainder + this.gap;
        this._pausedTime = 0;

        this._needsRemove = false;
    },

    fire: function (eventType, arg) {
        eventType = 'on' + eventType;
        if (this[eventType]) {
            this[eventType](this._target, arg);
        }
    },

    pause: function () {
        this._paused = true;
    },

    resume: function () {
        this._paused = false;
    }
};

// Simple LRU cache use doubly linked list
// @module zrender/core/LRU

/**
 * Simple double linked list. Compared with array, it has O(1) remove operation.
 * @constructor
 */
var LinkedList = function () {

    /**
     * @type {module:zrender/core/LRU~Entry}
     */
    this.head = null;

    /**
     * @type {module:zrender/core/LRU~Entry}
     */
    this.tail = null;

    this._len = 0;
};

var linkedListProto = LinkedList.prototype;
/**
 * Insert a new value at the tail
 * @param  {} val
 * @return {module:zrender/core/LRU~Entry}
 */
linkedListProto.insert = function (val) {
    var entry = new Entry(val);
    this.insertEntry(entry);
    return entry;
};

/**
 * Insert an entry at the tail
 * @param  {module:zrender/core/LRU~Entry} entry
 */
linkedListProto.insertEntry = function (entry) {
    if (!this.head) {
        this.head = this.tail = entry;
    }
    else {
        this.tail.next = entry;
        entry.prev = this.tail;
        entry.next = null;
        this.tail = entry;
    }
    this._len++;
};

/**
 * Remove entry.
 * @param  {module:zrender/core/LRU~Entry} entry
 */
linkedListProto.remove = function (entry) {
    var prev = entry.prev;
    var next = entry.next;
    if (prev) {
        prev.next = next;
    }
    else {
        // Is head
        this.head = next;
    }
    if (next) {
        next.prev = prev;
    }
    else {
        // Is tail
        this.tail = prev;
    }
    entry.next = entry.prev = null;
    this._len--;
};

/**
 * @return {number}
 */
linkedListProto.len = function () {
    return this._len;
};

/**
 * Clear list
 */
linkedListProto.clear = function () {
    this.head = this.tail = null;
    this._len = 0;
};

/**
 * @constructor
 * @param {} val
 */
var Entry = function (val) {
    /**
     * @type {}
     */
    this.value = val;

    /**
     * @type {module:zrender/core/LRU~Entry}
     */
    this.next;

    /**
     * @type {module:zrender/core/LRU~Entry}
     */
    this.prev;
};

/**
 * LRU Cache
 * @constructor
 * @alias module:zrender/core/LRU
 */
var LRU = function (maxSize) {

    this._list = new LinkedList();

    this._map = {};

    this._maxSize = maxSize || 10;

    this._lastRemovedEntry = null;
};

var LRUProto = LRU.prototype;

/**
 * @param  {string} key
 * @param  {} value
 * @return {} Removed value
 */
LRUProto.put = function (key, value) {
    var list = this._list;
    var map = this._map;
    var removed = null;
    if (map[key] == null) {
        var len = list.len();
        // Reuse last removed entry
        var entry = this._lastRemovedEntry;

        if (len >= this._maxSize && len > 0) {
            // Remove the least recently used
            var leastUsedEntry = list.head;
            list.remove(leastUsedEntry);
            delete map[leastUsedEntry.key];

            removed = leastUsedEntry.value;
            this._lastRemovedEntry = leastUsedEntry;
        }

        if (entry) {
            entry.value = value;
        }
        else {
            entry = new Entry(value);
        }
        entry.key = key;
        list.insertEntry(entry);
        map[key] = entry;
    }

    return removed;
};

/**
 * @param  {string} key
 * @return {}
 */
LRUProto.get = function (key) {
    var entry = this._map[key];
    var list = this._list;
    if (entry != null) {
        // Put the latest used entry in the tail
        if (entry !== list.tail) {
            list.remove(entry);
            list.insertEntry(entry);
        }

        return entry.value;
    }
};

/**
 * Clear the cache
 */
LRUProto.clear = function () {
    this._list.clear();
    this._map = {};
};

var kCSSColorTable = {
    'transparent': [0, 0, 0, 0], 'aliceblue': [240, 248, 255, 1],
    'antiquewhite': [250, 235, 215, 1], 'aqua': [0, 255, 255, 1],
    'aquamarine': [127, 255, 212, 1], 'azure': [240, 255, 255, 1],
    'beige': [245, 245, 220, 1], 'bisque': [255, 228, 196, 1],
    'black': [0, 0, 0, 1], 'blanchedalmond': [255, 235, 205, 1],
    'blue': [0, 0, 255, 1], 'blueviolet': [138, 43, 226, 1],
    'brown': [165, 42, 42, 1], 'burlywood': [222, 184, 135, 1],
    'cadetblue': [95, 158, 160, 1], 'chartreuse': [127, 255, 0, 1],
    'chocolate': [210, 105, 30, 1], 'coral': [255, 127, 80, 1],
    'cornflowerblue': [100, 149, 237, 1], 'cornsilk': [255, 248, 220, 1],
    'crimson': [220, 20, 60, 1], 'cyan': [0, 255, 255, 1],
    'darkblue': [0, 0, 139, 1], 'darkcyan': [0, 139, 139, 1],
    'darkgoldenrod': [184, 134, 11, 1], 'darkgray': [169, 169, 169, 1],
    'darkgreen': [0, 100, 0, 1], 'darkgrey': [169, 169, 169, 1],
    'darkkhaki': [189, 183, 107, 1], 'darkmagenta': [139, 0, 139, 1],
    'darkolivegreen': [85, 107, 47, 1], 'darkorange': [255, 140, 0, 1],
    'darkorchid': [153, 50, 204, 1], 'darkred': [139, 0, 0, 1],
    'darksalmon': [233, 150, 122, 1], 'darkseagreen': [143, 188, 143, 1],
    'darkslateblue': [72, 61, 139, 1], 'darkslategray': [47, 79, 79, 1],
    'darkslategrey': [47, 79, 79, 1], 'darkturquoise': [0, 206, 209, 1],
    'darkviolet': [148, 0, 211, 1], 'deeppink': [255, 20, 147, 1],
    'deepskyblue': [0, 191, 255, 1], 'dimgray': [105, 105, 105, 1],
    'dimgrey': [105, 105, 105, 1], 'dodgerblue': [30, 144, 255, 1],
    'firebrick': [178, 34, 34, 1], 'floralwhite': [255, 250, 240, 1],
    'forestgreen': [34, 139, 34, 1], 'fuchsia': [255, 0, 255, 1],
    'gainsboro': [220, 220, 220, 1], 'ghostwhite': [248, 248, 255, 1],
    'gold': [255, 215, 0, 1], 'goldenrod': [218, 165, 32, 1],
    'gray': [128, 128, 128, 1], 'green': [0, 128, 0, 1],
    'greenyellow': [173, 255, 47, 1], 'grey': [128, 128, 128, 1],
    'honeydew': [240, 255, 240, 1], 'hotpink': [255, 105, 180, 1],
    'indianred': [205, 92, 92, 1], 'indigo': [75, 0, 130, 1],
    'ivory': [255, 255, 240, 1], 'khaki': [240, 230, 140, 1],
    'lavender': [230, 230, 250, 1], 'lavenderblush': [255, 240, 245, 1],
    'lawngreen': [124, 252, 0, 1], 'lemonchiffon': [255, 250, 205, 1],
    'lightblue': [173, 216, 230, 1], 'lightcoral': [240, 128, 128, 1],
    'lightcyan': [224, 255, 255, 1], 'lightgoldenrodyellow': [250, 250, 210, 1],
    'lightgray': [211, 211, 211, 1], 'lightgreen': [144, 238, 144, 1],
    'lightgrey': [211, 211, 211, 1], 'lightpink': [255, 182, 193, 1],
    'lightsalmon': [255, 160, 122, 1], 'lightseagreen': [32, 178, 170, 1],
    'lightskyblue': [135, 206, 250, 1], 'lightslategray': [119, 136, 153, 1],
    'lightslategrey': [119, 136, 153, 1], 'lightsteelblue': [176, 196, 222, 1],
    'lightyellow': [255, 255, 224, 1], 'lime': [0, 255, 0, 1],
    'limegreen': [50, 205, 50, 1], 'linen': [250, 240, 230, 1],
    'magenta': [255, 0, 255, 1], 'maroon': [128, 0, 0, 1],
    'mediumaquamarine': [102, 205, 170, 1], 'mediumblue': [0, 0, 205, 1],
    'mediumorchid': [186, 85, 211, 1], 'mediumpurple': [147, 112, 219, 1],
    'mediumseagreen': [60, 179, 113, 1], 'mediumslateblue': [123, 104, 238, 1],
    'mediumspringgreen': [0, 250, 154, 1], 'mediumturquoise': [72, 209, 204, 1],
    'mediumvioletred': [199, 21, 133, 1], 'midnightblue': [25, 25, 112, 1],
    'mintcream': [245, 255, 250, 1], 'mistyrose': [255, 228, 225, 1],
    'moccasin': [255, 228, 181, 1], 'navajowhite': [255, 222, 173, 1],
    'navy': [0, 0, 128, 1], 'oldlace': [253, 245, 230, 1],
    'olive': [128, 128, 0, 1], 'olivedrab': [107, 142, 35, 1],
    'orange': [255, 165, 0, 1], 'orangered': [255, 69, 0, 1],
    'orchid': [218, 112, 214, 1], 'palegoldenrod': [238, 232, 170, 1],
    'palegreen': [152, 251, 152, 1], 'paleturquoise': [175, 238, 238, 1],
    'palevioletred': [219, 112, 147, 1], 'papayawhip': [255, 239, 213, 1],
    'peachpuff': [255, 218, 185, 1], 'peru': [205, 133, 63, 1],
    'pink': [255, 192, 203, 1], 'plum': [221, 160, 221, 1],
    'powderblue': [176, 224, 230, 1], 'purple': [128, 0, 128, 1],
    'red': [255, 0, 0, 1], 'rosybrown': [188, 143, 143, 1],
    'royalblue': [65, 105, 225, 1], 'saddlebrown': [139, 69, 19, 1],
    'salmon': [250, 128, 114, 1], 'sandybrown': [244, 164, 96, 1],
    'seagreen': [46, 139, 87, 1], 'seashell': [255, 245, 238, 1],
    'sienna': [160, 82, 45, 1], 'silver': [192, 192, 192, 1],
    'skyblue': [135, 206, 235, 1], 'slateblue': [106, 90, 205, 1],
    'slategray': [112, 128, 144, 1], 'slategrey': [112, 128, 144, 1],
    'snow': [255, 250, 250, 1], 'springgreen': [0, 255, 127, 1],
    'steelblue': [70, 130, 180, 1], 'tan': [210, 180, 140, 1],
    'teal': [0, 128, 128, 1], 'thistle': [216, 191, 216, 1],
    'tomato': [255, 99, 71, 1], 'turquoise': [64, 224, 208, 1],
    'violet': [238, 130, 238, 1], 'wheat': [245, 222, 179, 1],
    'white': [255, 255, 255, 1], 'whitesmoke': [245, 245, 245, 1],
    'yellow': [255, 255, 0, 1], 'yellowgreen': [154, 205, 50, 1]
};

function clampCssByte(i) {  // Clamp to integer 0 .. 255.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clampCssAngle(i) {  // Clamp to integer 0 .. 360.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 360 ? 360 : i;
}

function clampCssFloat(f) {  // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parseCssInt(str) {  // int or percentage.
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssByte(parseFloat(str) / 100 * 255);
    }
    return clampCssByte(parseInt(str, 10));
}

function parseCssFloat(str) {  // float or percentage.
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssFloat(parseFloat(str) / 100);
    }
    return clampCssFloat(parseFloat(str));
}

function cssHueToRgb(m1, m2, h) {
    if (h < 0) {
        h += 1;
    }
    else if (h > 1) {
        h -= 1;
    }

    if (h * 6 < 1) {
        return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
        return m2;
    }
    if (h * 3 < 2) {
        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
}

function lerpNumber(a, b, p) {
    return a + (b - a) * p;
}

function setRgba(out, r, g, b, a) {
    out[0] = r; out[1] = g; out[2] = b; out[3] = a;
    return out;
}
function copyRgba(out, a) {
    out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
    return out;
}

var colorCache = new LRU(20);
var lastRemovedArr = null;

function putToCache(colorStr, rgbaArr) {
    // Reuse removed array
    if (lastRemovedArr) {
        copyRgba(lastRemovedArr, rgbaArr);
    }
    lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || (rgbaArr.slice()));
}

/**
 * @param {string} colorStr
 * @param {Array.<number>} out
 * @return {Array.<number>}
 * @memberOf module:zrender/util/color
 */
function parse(colorStr, rgbaArr) {
    if (!colorStr) {
        return;
    }
    rgbaArr = rgbaArr || [];

    var cached = colorCache.get(colorStr);
    if (cached) {
        return copyRgba(rgbaArr, cached);
    }

    // colorStr may be not string
    colorStr = colorStr + '';
    // Remove all whitespace, not compliant, but should just be more accepting.
    var str = colorStr.replace(/ /g, '').toLowerCase();

    // Color keywords (and transparent) lookup.
    if (str in kCSSColorTable) {
        copyRgba(rgbaArr, kCSSColorTable[str]);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
    }

    // #abc and #abc123 syntax.
    if (str.charAt(0) === '#') {
        if (str.length === 4) {
            var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 0xfff)) {
                setRgba(rgbaArr, 0, 0, 0, 1);
                return;  // Covers NaN.
            }
            setRgba(rgbaArr,
                ((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
                (iv & 0xf0) | ((iv & 0xf0) >> 4),
                (iv & 0xf) | ((iv & 0xf) << 4),
                1
            );
            putToCache(colorStr, rgbaArr);
            return rgbaArr;
        }
        else if (str.length === 7) {
            var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 0xffffff)) {
                setRgba(rgbaArr, 0, 0, 0, 1);
                return;  // Covers NaN.
            }
            setRgba(rgbaArr,
                (iv & 0xff0000) >> 16,
                (iv & 0xff00) >> 8,
                iv & 0xff,
                1
            );
            putToCache(colorStr, rgbaArr);
            return rgbaArr;
        }

        return;
    }
    var op = str.indexOf('(');
    var ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === str.length) {
        var fname = str.substr(0, op);
        var params = str.substr(op + 1, ep - (op + 1)).split(',');
        var alpha = 1;  // To allow case fallthrough.
        switch (fname) {
            case 'rgba':
                if (params.length !== 4) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                alpha = parseCssFloat(params.pop()); // jshint ignore:line
            // Fall through.
            case 'rgb':
                if (params.length !== 3) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                setRgba(rgbaArr,
                    parseCssInt(params[0]),
                    parseCssInt(params[1]),
                    parseCssInt(params[2]),
                    alpha
                );
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            case 'hsla':
                if (params.length !== 4) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                params[3] = parseCssFloat(params[3]);
                hsla2rgba(params, rgbaArr);
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            case 'hsl':
                if (params.length !== 3) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                hsla2rgba(params, rgbaArr);
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            default:
                return;
        }
    }

    setRgba(rgbaArr, 0, 0, 0, 1);
    return;
}

/**
 * @param {Array.<number>} hsla
 * @param {Array.<number>} rgba
 * @return {Array.<number>} rgba
 */
function hsla2rgba(hsla, rgba) {
    var h = (((parseFloat(hsla[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
    // NOTE(deanm): According to the CSS spec s/l should only be
    // percentages, but we don't bother and let float or percentage.
    var s = parseCssFloat(hsla[1]);
    var l = parseCssFloat(hsla[2]);
    var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var m1 = l * 2 - m2;

    rgba = rgba || [];
    setRgba(rgba,
        clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255),
        clampCssByte(cssHueToRgb(m1, m2, h) * 255),
        clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255),
        1
    );

    if (hsla.length === 4) {
        rgba[3] = hsla[3];
    }

    return rgba;
}

/**
 * @param {Array.<number>} rgba
 * @return {Array.<number>} hsla
 */
function rgba2hsla(rgba) {
    if (!rgba) {
        return;
    }

    // RGB from 0 to 255
    var R = rgba[0] / 255;
    var G = rgba[1] / 255;
    var B = rgba[2] / 255;

    var vMin = Math.min(R, G, B); // Min. value of RGB
    var vMax = Math.max(R, G, B); // Max. value of RGB
    var delta = vMax - vMin; // Delta RGB value

    var L = (vMax + vMin) / 2;
    var H;
    var S;
    // HSL results from 0 to 1
    if (delta === 0) {
        H = 0;
        S = 0;
    }
    else {
        if (L < 0.5) {
            S = delta / (vMax + vMin);
        }
        else {
            S = delta / (2 - vMax - vMin);
        }

        var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
        var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
        var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

        if (R === vMax) {
            H = deltaB - deltaG;
        }
        else if (G === vMax) {
            H = (1 / 3) + deltaR - deltaB;
        }
        else if (B === vMax) {
            H = (2 / 3) + deltaG - deltaR;
        }

        if (H < 0) {
            H += 1;
        }

        if (H > 1) {
            H -= 1;
        }
    }

    var hsla = [H * 360, S, L];

    if (rgba[3] != null) {
        hsla.push(rgba[3]);
    }

    return hsla;
}

/**
 * @param {string} color
 * @param {number} level
 * @return {string}
 * @memberOf module:zrender/util/color
 */
function lift(color, level) {
    var colorArr = parse(color);
    if (colorArr) {
        for (var i = 0; i < 3; i++) {
            if (level < 0) {
                colorArr[i] = colorArr[i] * (1 - level) | 0;
            }
            else {
                colorArr[i] = ((255 - colorArr[i]) * level + colorArr[i]) | 0;
            }
            if (colorArr[i] > 255) {
                colorArr[i] = 255;
            }
            else if (color[i] < 0) {
                colorArr[i] = 0;
            }
        }
        return stringify(colorArr, colorArr.length === 4 ? 'rgba' : 'rgb');
    }
}

/**
 * @param {string} color
 * @return {string}
 * @memberOf module:zrender/util/color
 */
function toHex(color) {
    var colorArr = parse(color);
    if (colorArr) {
        return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + (+colorArr[2])).toString(16).slice(1);
    }
}

/**
 * Map value to color. Faster than lerp methods because color is represented by rgba array.
 * @param {number} normalizedValue A float between 0 and 1.
 * @param {Array.<Array.<number>>} colors List of rgba color array
 * @param {Array.<number>} [out] Mapped gba color array
 * @return {Array.<number>} will be null/undefined if input illegal.
 */
function fastLerp(normalizedValue, colors, out) {
    if (!(colors && colors.length)
        || !(normalizedValue >= 0 && normalizedValue <= 1)
    ) {
        return;
    }

    out = out || [];

    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = colors[leftIndex];
    var rightColor = colors[rightIndex];
    var dv = value - leftIndex;
    out[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
    out[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
    out[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
    out[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));

    return out;
}

/**
 * @deprecated
 */
var fastMapToColor = fastLerp;

/**
 * @param {number} normalizedValue A float between 0 and 1.
 * @param {Array.<string>} colors Color list.
 * @param {boolean=} fullOutput Default false.
 * @return {(string|Object)} Result color. If fullOutput,
 *                           return {color: ..., leftIndex: ..., rightIndex: ..., value: ...},
 * @memberOf module:zrender/util/color
 */
function lerp$1(normalizedValue, colors, fullOutput) {
    if (!(colors && colors.length)
        || !(normalizedValue >= 0 && normalizedValue <= 1)
    ) {
        return;
    }

    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = parse(colors[leftIndex]);
    var rightColor = parse(colors[rightIndex]);
    var dv = value - leftIndex;

    var color = stringify(
        [
            clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)),
            clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)),
            clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)),
            clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))
        ],
        'rgba'
    );

    return fullOutput
        ? {
            color: color,
            leftIndex: leftIndex,
            rightIndex: rightIndex,
            value: value
        }
        : color;
}

/**
 * @deprecated
 */
var mapToColor = lerp$1;

/**
 * @param {string} color
 * @param {number=} h 0 ~ 360, ignore when null.
 * @param {number=} s 0 ~ 1, ignore when null.
 * @param {number=} l 0 ~ 1, ignore when null.
 * @return {string} Color string in rgba format.
 * @memberOf module:zrender/util/color
 */
function modifyHSL(color, h, s, l) {
    color = parse(color);

    if (color) {
        color = rgba2hsla(color);
        h != null && (color[0] = clampCssAngle(h));
        s != null && (color[1] = parseCssFloat(s));
        l != null && (color[2] = parseCssFloat(l));

        return stringify(hsla2rgba(color), 'rgba');
    }
}

/**
 * @param {string} color
 * @param {number=} alpha 0 ~ 1
 * @return {string} Color string in rgba format.
 * @memberOf module:zrender/util/color
 */
function modifyAlpha(color, alpha) {
    color = parse(color);

    if (color && alpha != null) {
        color[3] = clampCssFloat(alpha);
        return stringify(color, 'rgba');
    }
}

/**
 * @param {Array.<number>} arrColor like [12,33,44,0.4]
 * @param {string} type 'rgba', 'hsva', ...
 * @return {string} Result color. (If input illegal, return undefined).
 */
function stringify(arrColor, type) {
    if (!arrColor || !arrColor.length) {
        return;
    }
    var colorStr = arrColor[0] + ',' + arrColor[1] + ',' + arrColor[2];
    if (type === 'rgba' || type === 'hsva' || type === 'hsla') {
        colorStr += ',' + arrColor[3];
    }
    return type + '(' + colorStr + ')';
}


var color = (Object.freeze || Object)({
	parse: parse,
	lift: lift,
	toHex: toHex,
	fastLerp: fastLerp,
	fastMapToColor: fastMapToColor,
	lerp: lerp$1,
	mapToColor: mapToColor,
	modifyHSL: modifyHSL,
	modifyAlpha: modifyAlpha,
	stringify: stringify
});

/**
 * @module echarts/animation/Animator
 */

var arraySlice = Array.prototype.slice;

function defaultGetter(target, key) {
    return target[key];
}

function defaultSetter(target, key, value) {
    target[key] = value;
}

/**
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} percent
 * @return {number}
 */
function interpolateNumber(p0, p1, percent) {
    return (p1 - p0) * percent + p0;
}

/**
 * @param  {string} p0
 * @param  {string} p1
 * @param  {number} percent
 * @return {string}
 */
function interpolateString(p0, p1, percent) {
    return percent > 0.5 ? p1 : p0;
}

/**
 * @param  {Array} p0
 * @param  {Array} p1
 * @param  {number} percent
 * @param  {Array} out
 * @param  {number} arrDim
 */
function interpolateArray(p0, p1, percent, out, arrDim) {
    var len = p0.length;
    if (arrDim === 1) {
        for (var i = 0; i < len; i++) {
            out[i] = interpolateNumber(p0[i], p1[i], percent);
        }
    }
    else {
        var len2 = len && p0[0].length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                out[i][j] = interpolateNumber(
                    p0[i][j], p1[i][j], percent
                );
            }
        }
    }
}

// arr0 is source array, arr1 is target array.
// Do some preprocess to avoid error happened when interpolating from arr0 to arr1
function fillArr(arr0, arr1, arrDim) {
    var arr0Len = arr0.length;
    var arr1Len = arr1.length;
    if (arr0Len !== arr1Len) {
        // FIXME Not work for TypedArray
        var isPreviousLarger = arr0Len > arr1Len;
        if (isPreviousLarger) {
            // Cut the previous
            arr0.length = arr1Len;
        }
        else {
            // Fill the previous
            for (var i = arr0Len; i < arr1Len; i++) {
                arr0.push(
                    arrDim === 1 ? arr1[i] : arraySlice.call(arr1[i])
                );
            }
        }
    }
    // Handling NaN value
    var len2 = arr0[0] && arr0[0].length;
    for (var i = 0; i < arr0.length; i++) {
        if (arrDim === 1) {
            if (isNaN(arr0[i])) {
                arr0[i] = arr1[i];
            }
        }
        else {
            for (var j = 0; j < len2; j++) {
                if (isNaN(arr0[i][j])) {
                    arr0[i][j] = arr1[i][j];
                }
            }
        }
    }
}

/**
 * @param  {Array} arr0
 * @param  {Array} arr1
 * @param  {number} arrDim
 * @return {boolean}
 */
function isArraySame(arr0, arr1, arrDim) {
    if (arr0 === arr1) {
        return true;
    }
    var len = arr0.length;
    if (len !== arr1.length) {
        return false;
    }
    if (arrDim === 1) {
        for (var i = 0; i < len; i++) {
            if (arr0[i] !== arr1[i]) {
                return false;
            }
        }
    }
    else {
        var len2 = arr0[0].length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                if (arr0[i][j] !== arr1[i][j]) {
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * Catmull Rom interpolate array
 * @param  {Array} p0
 * @param  {Array} p1
 * @param  {Array} p2
 * @param  {Array} p3
 * @param  {number} t
 * @param  {number} t2
 * @param  {number} t3
 * @param  {Array} out
 * @param  {number} arrDim
 */
function catmullRomInterpolateArray(
    p0, p1, p2, p3, t, t2, t3, out, arrDim
) {
    var len = p0.length;
    if (arrDim === 1) {
        for (var i = 0; i < len; i++) {
            out[i] = catmullRomInterpolate(
                p0[i], p1[i], p2[i], p3[i], t, t2, t3
            );
        }
    }
    else {
        var len2 = p0[0].length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len2; j++) {
                out[i][j] = catmullRomInterpolate(
                    p0[i][j], p1[i][j], p2[i][j], p3[i][j],
                    t, t2, t3
                );
            }
        }
    }
}

/**
 * Catmull Rom interpolate number
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @param  {number} t2
 * @param  {number} t3
 * @return {number}
 */
function catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3
            + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
            + v0 * t + p1;
}

function cloneValue(value) {
    if (isArrayLike(value)) {
        var len = value.length;
        if (isArrayLike(value[0])) {
            var ret = [];
            for (var i = 0; i < len; i++) {
                ret.push(arraySlice.call(value[i]));
            }
            return ret;
        }

        return arraySlice.call(value);
    }

    return value;
}

function rgba2String(rgba) {
    rgba[0] = Math.floor(rgba[0]);
    rgba[1] = Math.floor(rgba[1]);
    rgba[2] = Math.floor(rgba[2]);

    return 'rgba(' + rgba.join(',') + ')';
}

function getArrayDim(keyframes) {
    var lastValue = keyframes[keyframes.length - 1].value;
    return isArrayLike(lastValue && lastValue[0]) ? 2 : 1;
}

function createTrackClip(animator, easing, oneTrackDone, keyframes, propName, forceAnimate) {
    var getter = animator._getter;
    var setter = animator._setter;
    var useSpline = easing === 'spline';

    var trackLen = keyframes.length;
    if (!trackLen) {
        return;
    }
    // Guess data type
    var firstVal = keyframes[0].value;
    var isValueArray = isArrayLike(firstVal);
    var isValueColor = false;
    var isValueString = false;

    // For vertices morphing
    var arrDim = isValueArray ? getArrayDim(keyframes) : 0;

    var trackMaxTime;
    // Sort keyframe as ascending
    keyframes.sort(function (a, b) {
        return a.time - b.time;
    });

    trackMaxTime = keyframes[trackLen - 1].time;
    // Percents of each keyframe
    var kfPercents = [];
    // Value of each keyframe
    var kfValues = [];
    var prevValue = keyframes[0].value;
    var isAllValueEqual = true;
    for (var i = 0; i < trackLen; i++) {
        kfPercents.push(keyframes[i].time / trackMaxTime);
        // Assume value is a color when it is a string
        var value = keyframes[i].value;

        // Check if value is equal, deep check if value is array
        if (!((isValueArray && isArraySame(value, prevValue, arrDim))
            || (!isValueArray && value === prevValue))) {
            isAllValueEqual = false;
        }
        prevValue = value;

        // Try converting a string to a color array
        if (typeof value === 'string') {
            var colorArray = parse(value);
            if (colorArray) {
                value = colorArray;
                isValueColor = true;
            }
            else {
                isValueString = true;
            }
        }
        kfValues.push(value);
    }
    if (!forceAnimate && isAllValueEqual) {
        return;
    }

    var lastValue = kfValues[trackLen - 1];
    // Polyfill array and NaN value
    for (var i = 0; i < trackLen - 1; i++) {
        if (isValueArray) {
            fillArr(kfValues[i], lastValue, arrDim);
        }
        else {
            if (isNaN(kfValues[i]) && !isNaN(lastValue) && !isValueString && !isValueColor) {
                kfValues[i] = lastValue;
            }
        }
    }
    isValueArray && fillArr(getter(animator._target, propName), lastValue, arrDim);

    // Cache the key of last frame to speed up when
    // animation playback is sequency
    var lastFrame = 0;
    var lastFramePercent = 0;
    var start;
    var w;
    var p0;
    var p1;
    var p2;
    var p3;

    if (isValueColor) {
        var rgba = [0, 0, 0, 0];
    }

    var onframe = function (target, percent) {
        // Find the range keyframes
        // kf1-----kf2---------current--------kf3
        // find kf2 and kf3 and do interpolation
        var frame;
        // In the easing function like elasticOut, percent may less than 0
        if (percent < 0) {
            frame = 0;
        }
        else if (percent < lastFramePercent) {
            // Start from next key
            // PENDING start from lastFrame ?
            start = Math.min(lastFrame + 1, trackLen - 1);
            for (frame = start; frame >= 0; frame--) {
                if (kfPercents[frame] <= percent) {
                    break;
                }
            }
            // PENDING really need to do this ?
            frame = Math.min(frame, trackLen - 2);
        }
        else {
            for (frame = lastFrame; frame < trackLen; frame++) {
                if (kfPercents[frame] > percent) {
                    break;
                }
            }
            frame = Math.min(frame - 1, trackLen - 2);
        }
        lastFrame = frame;
        lastFramePercent = percent;

        var range = (kfPercents[frame + 1] - kfPercents[frame]);
        if (range === 0) {
            return;
        }
        else {
            w = (percent - kfPercents[frame]) / range;
        }
        if (useSpline) {
            p1 = kfValues[frame];
            p0 = kfValues[frame === 0 ? frame : frame - 1];
            p2 = kfValues[frame > trackLen - 2 ? trackLen - 1 : frame + 1];
            p3 = kfValues[frame > trackLen - 3 ? trackLen - 1 : frame + 2];
            if (isValueArray) {
                catmullRomInterpolateArray(
                    p0, p1, p2, p3, w, w * w, w * w * w,
                    getter(target, propName),
                    arrDim
                );
            }
            else {
                var value;
                if (isValueColor) {
                    value = catmullRomInterpolateArray(
                        p0, p1, p2, p3, w, w * w, w * w * w,
                        rgba, 1
                    );
                    value = rgba2String(rgba);
                }
                else if (isValueString) {
                    // String is step(0.5)
                    return interpolateString(p1, p2, w);
                }
                else {
                    value = catmullRomInterpolate(
                        p0, p1, p2, p3, w, w * w, w * w * w
                    );
                }
                setter(
                    target,
                    propName,
                    value
                );
            }
        }
        else {
            if (isValueArray) {
                interpolateArray(
                    kfValues[frame], kfValues[frame + 1], w,
                    getter(target, propName),
                    arrDim
                );
            }
            else {
                var value;
                if (isValueColor) {
                    interpolateArray(
                        kfValues[frame], kfValues[frame + 1], w,
                        rgba, 1
                    );
                    value = rgba2String(rgba);
                }
                else if (isValueString) {
                    // String is step(0.5)
                    return interpolateString(kfValues[frame], kfValues[frame + 1], w);
                }
                else {
                    value = interpolateNumber(kfValues[frame], kfValues[frame + 1], w);
                }
                setter(
                    target,
                    propName,
                    value
                );
            }
        }
    };

    var clip = new Clip({
        target: animator._target,
        life: trackMaxTime,
        loop: animator._loop,
        delay: animator._delay,
        onframe: onframe,
        ondestroy: oneTrackDone
    });

    if (easing && easing !== 'spline') {
        clip.easing = easing;
    }

    return clip;
}

/**
 * @alias module:zrender/animation/Animator
 * @constructor
 * @param {Object} target
 * @param {boolean} loop
 * @param {Function} getter
 * @param {Function} setter
 */
var Animator = function (target, loop, getter, setter) {
    this._tracks = {};
    this._target = target;

    this._loop = loop || false;

    this._getter = getter || defaultGetter;
    this._setter = setter || defaultSetter;

    this._clipCount = 0;

    this._delay = 0;

    this._doneList = [];

    this._onframeList = [];

    this._clipList = [];
};

Animator.prototype = {
    /**
     * 设置动画关键帧
     * @param  {number} time 关键帧时间，单位是ms
     * @param  {Object} props 关键帧的属性值，key-value表示
     * @return {module:zrender/animation/Animator}
     */
    when: function (time /* ms */, props) {
        var tracks = this._tracks;
        for (var propName in props) {
            if (!props.hasOwnProperty(propName)) {
                continue;
            }

            if (!tracks[propName]) {
                tracks[propName] = [];
                // Invalid value
                var value = this._getter(this._target, propName);
                if (value == null) {
                    // zrLog('Invalid property ' + propName);
                    continue;
                }
                // If time is 0
                //  Then props is given initialize value
                // Else
                //  Initialize value from current prop value
                if (time !== 0) {
                    tracks[propName].push({
                        time: 0,
                        value: cloneValue(value)
                    });
                }
            }
            tracks[propName].push({
                time: time,
                value: props[propName]
            });
        }
        return this;
    },
    /**
     * 添加动画每一帧的回调函数
     * @param  {Function} callback
     * @return {module:zrender/animation/Animator}
     */
    during: function (callback) {
        this._onframeList.push(callback);
        return this;
    },

    pause: function () {
        for (var i = 0; i < this._clipList.length; i++) {
            this._clipList[i].pause();
        }
        this._paused = true;
    },

    resume: function () {
        for (var i = 0; i < this._clipList.length; i++) {
            this._clipList[i].resume();
        }
        this._paused = false;
    },

    isPaused: function () {
        return !!this._paused;
    },

    _doneCallback: function () {
        // Clear all tracks
        this._tracks = {};
        // Clear all clips
        this._clipList.length = 0;

        var doneList = this._doneList;
        var len = doneList.length;
        for (var i = 0; i < len; i++) {
            doneList[i].call(this);
        }
    },
    /**
     * 开始执行动画
     * @param  {string|Function} [easing]
     *         动画缓动函数，详见{@link module:zrender/animation/easing}
     * @param  {boolean} forceAnimate
     * @return {module:zrender/animation/Animator}
     */
    start: function (easing, forceAnimate) {

        var self = this;
        var clipCount = 0;

        var oneTrackDone = function () {
            clipCount--;
            if (!clipCount) {
                self._doneCallback();
            }
        };

        var lastClip;
        for (var propName in this._tracks) {
            if (!this._tracks.hasOwnProperty(propName)) {
                continue;
            }
            var clip = createTrackClip(
                this, easing, oneTrackDone,
                this._tracks[propName], propName, forceAnimate
            );
            if (clip) {
                this._clipList.push(clip);
                clipCount++;

                // If start after added to animation
                if (this.animation) {
                    this.animation.addClip(clip);
                }

                lastClip = clip;
            }
        }

        // Add during callback on the last clip
        if (lastClip) {
            var oldOnFrame = lastClip.onframe;
            lastClip.onframe = function (target, percent) {
                oldOnFrame(target, percent);

                for (var i = 0; i < self._onframeList.length; i++) {
                    self._onframeList[i](target, percent);
                }
            };
        }

        // This optimization will help the case that in the upper application
        // the view may be refreshed frequently, where animation will be
        // called repeatly but nothing changed.
        if (!clipCount) {
            this._doneCallback();
        }
        return this;
    },
    /**
     * 停止动画
     * @param {boolean} forwardToLast If move to last frame before stop
     */
    stop: function (forwardToLast) {
        var clipList = this._clipList;
        var animation = this.animation;
        for (var i = 0; i < clipList.length; i++) {
            var clip = clipList[i];
            if (forwardToLast) {
                // Move to last frame before stop
                clip.onframe(this._target, 1);
            }
            animation && animation.removeClip(clip);
        }
        clipList.length = 0;
    },
    /**
     * 设置动画延迟开始的时间
     * @param  {number} time 单位ms
     * @return {module:zrender/animation/Animator}
     */
    delay: function (time) {
        this._delay = time;
        return this;
    },
    /**
     * 添加动画结束的回调
     * @param  {Function} cb
     * @return {module:zrender/animation/Animator}
     */
    done: function (cb) {
        if (cb) {
            this._doneList.push(cb);
        }
        return this;
    },

    /**
     * @return {Array.<module:zrender/animation/Clip>}
     */
    getClips: function () {
        return this._clipList;
    }
};

var dpr = 1;

// If in browser environment
if (typeof window !== 'undefined') {
    dpr = Math.max(window.devicePixelRatio || 1, 1);
}

/**
 * config默认配置项
 * @exports zrender/config
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 */

/**
 * debug日志选项：catchBrushException为true下有效
 * 0 : 不生成debug数据，发布用
 * 1 : 异常抛出，调试用
 * 2 : 控制台输出，调试用
 */
var debugMode = 0;

// retina 屏幕优化
var devicePixelRatio = dpr;

var log = function () {
};

if (debugMode === 1) {
    log = function () {
        for (var k in arguments) {
            throw new Error(arguments[k]);
        }
    };
}
else if (debugMode > 1) {
    log = function () {
        for (var k in arguments) {
            console.log(arguments[k]);
        }
    };
}

var zrLog = log;

/**
 * @alias modue:zrender/mixin/Animatable
 * @constructor
 */
var Animatable = function () {

    /**
     * @type {Array.<module:zrender/animation/Animator>}
     * @readOnly
     */
    this.animators = [];
};

Animatable.prototype = {

    constructor: Animatable,

    /**
     * 动画
     *
     * @param {string} path The path to fetch value from object, like 'a.b.c'.
     * @param {boolean} [loop] Whether to loop animation.
     * @return {module:zrender/animation/Animator}
     * @example:
     *     el.animate('style', false)
     *         .when(1000, {x: 10} )
     *         .done(function(){ // Animation done })
     *         .start()
     */
    animate: function (path, loop) {
        var target;
        var animatingShape = false;
        var el = this;
        var zr = this.__zr;
        if (path) {
            var pathSplitted = path.split('.');
            var prop = el;
            // If animating shape
            animatingShape = pathSplitted[0] === 'shape';
            for (var i = 0, l = pathSplitted.length; i < l; i++) {
                if (!prop) {
                    continue;
                }
                prop = prop[pathSplitted[i]];
            }
            if (prop) {
                target = prop;
            }
        }
        else {
            target = el;
        }

        if (!target) {
            zrLog(
                'Property "'
                + path
                + '" is not existed in element '
                + el.id
            );
            return;
        }

        var animators = el.animators;

        var animator = new Animator(target, loop);

        animator.during(function (target) {
            el.dirty(animatingShape);
        })
        .done(function () {
            // FIXME Animator will not be removed if use `Animator#stop` to stop animation
            animators.splice(indexOf(animators, animator), 1);
        });

        animators.push(animator);

        // If animate after added to the zrender
        if (zr) {
            zr.animation.addAnimator(animator);
        }

        return animator;
    },

    /**
     * 停止动画
     * @param {boolean} forwardToLast If move to last frame before stop
     */
    stopAnimation: function (forwardToLast) {
        var animators = this.animators;
        var len = animators.length;
        for (var i = 0; i < len; i++) {
            animators[i].stop(forwardToLast);
        }
        animators.length = 0;

        return this;
    },

    /**
     * Caution: this method will stop previous animation.
     * So do not use this method to one element twice before
     * animation starts, unless you know what you are doing.
     * @param {Object} target
     * @param {number} [time=500] Time in ms
     * @param {string} [easing='linear']
     * @param {number} [delay=0]
     * @param {Function} [callback]
     * @param {Function} [forceAnimate] Prevent stop animation and callback
     *        immediently when target values are the same as current values.
     *
     * @example
     *  // Animate position
     *  el.animateTo({
     *      position: [10, 10]
     *  }, function () { // done })
     *
     *  // Animate shape, style and position in 100ms, delayed 100ms, with cubicOut easing
     *  el.animateTo({
     *      shape: {
     *          width: 500
     *      },
     *      style: {
     *          fill: 'red'
     *      }
     *      position: [10, 10]
     *  }, 100, 100, 'cubicOut', function () { // done })
     */
    // TODO Return animation key
    animateTo: function (target, time, delay, easing, callback, forceAnimate) {
        animateTo(this, target, time, delay, easing, callback, forceAnimate);
    },

    /**
     * Animate from the target state to current state.
     * The params and the return value are the same as `this.animateTo`.
     */
    animateFrom: function (target, time, delay, easing, callback, forceAnimate) {
        animateTo(this, target, time, delay, easing, callback, forceAnimate, true);
    }
};

function animateTo(animatable, target, time, delay, easing, callback, forceAnimate, reverse) {
    // animateTo(target, time, easing, callback);
    if (isString(delay)) {
        callback = easing;
        easing = delay;
        delay = 0;
    }
    // animateTo(target, time, delay, callback);
    else if (isFunction(easing)) {
        callback = easing;
        easing = 'linear';
        delay = 0;
    }
    // animateTo(target, time, callback);
    else if (isFunction(delay)) {
        callback = delay;
        delay = 0;
    }
    // animateTo(target, callback)
    else if (isFunction(time)) {
        callback = time;
        time = 500;
    }
    // animateTo(target)
    else if (!time) {
        time = 500;
    }
    // Stop all previous animations
    animatable.stopAnimation();
    animateToShallow(animatable, '', animatable, target, time, delay, reverse);

    // Animators may be removed immediately after start
    // if there is nothing to animate
    var animators = animatable.animators.slice();
    var count = animators.length;
    function done() {
        count--;
        if (!count) {
            callback && callback();
        }
    }

    // No animators. This should be checked before animators[i].start(),
    // because 'done' may be executed immediately if no need to animate.
    if (!count) {
        callback && callback();
    }
    // Start after all animators created
    // Incase any animator is done immediately when all animation properties are not changed
    for (var i = 0; i < animators.length; i++) {
        animators[i]
            .done(done)
            .start(easing, forceAnimate);
    }
}

/**
 * @param {string} path=''
 * @param {Object} source=animatable
 * @param {Object} target
 * @param {number} [time=500]
 * @param {number} [delay=0]
 * @param {boolean} [reverse] If `true`, animate
 *        from the `target` to current state.
 *
 * @example
 *  // Animate position
 *  el._animateToShallow({
 *      position: [10, 10]
 *  })
 *
 *  // Animate shape, style and position in 100ms, delayed 100ms
 *  el._animateToShallow({
 *      shape: {
 *          width: 500
 *      },
 *      style: {
 *          fill: 'red'
 *      }
 *      position: [10, 10]
 *  }, 100, 100)
 */
function animateToShallow(animatable, path, source, target, time, delay, reverse) {
    var objShallow = {};
    var propertyCount = 0;
    for (var name in target) {
        if (!target.hasOwnProperty(name)) {
            continue;
        }

        if (source[name] != null) {
            if (isObject(target[name]) && !isArrayLike(target[name])) {
                animateToShallow(
                    animatable,
                    path ? path + '.' + name : name,
                    source[name],
                    target[name],
                    time,
                    delay,
                    reverse
                );
            }
            else {
                if (reverse) {
                    objShallow[name] = source[name];
                    setAttrByPath(animatable, path, name, target[name]);
                }
                else {
                    objShallow[name] = target[name];
                }
                propertyCount++;
            }
        }
        else if (target[name] != null && !reverse) {
            setAttrByPath(animatable, path, name, target[name]);
        }
    }

    if (propertyCount > 0) {
        animatable.animate(path, false)
            .when(time == null ? 500 : time, objShallow)
            .delay(delay || 0);
    }
}

function setAttrByPath(el, path, name, value) {
    // Attr directly if not has property
    // FIXME, if some property not needed for element ?
    if (!path) {
        el.attr(name, value);
    }
    else {
        // Only support set shape or style
        var props = {};
        props[path] = {};
        props[path][name] = value;
        el.attr(props);
    }
}

/**
 * @alias module:zrender/Element
 * @constructor
 * @extends {module:zrender/mixin/Animatable}
 * @extends {module:zrender/mixin/Transformable}
 * @extends {module:zrender/mixin/Eventful}
 */
var Element = function (opts) { // jshint ignore:line

    Transformable.call(this, opts);
    Eventful.call(this, opts);
    Animatable.call(this, opts);

    /**
     * 画布元素ID
     * @type {string}
     */
    this.id = opts.id || guid();
};

Element.prototype = {

    /**
     * 元素类型
     * Element type
     * @type {string}
     */
    type: 'element',

    /**
     * 元素名字
     * Element name
     * @type {string}
     */
    name: '',

    /**
     * ZRender 实例对象，会在 element 添加到 zrender 实例中后自动赋值
     * ZRender instance will be assigned when element is associated with zrender
     * @name module:/zrender/Element#__zr
     * @type {module:zrender/ZRender}
     */
    __zr: null,

    /**
     * 图形是否忽略，为true时忽略图形的绘制以及事件触发
     * If ignore drawing and events of the element object
     * @name module:/zrender/Element#ignore
     * @type {boolean}
     * @default false
     */
    ignore: false,

    /**
     * 用于裁剪的路径(shape)，所有 Group 内的路径在绘制时都会被这个路径裁剪
     * 该路径会继承被裁减对象的变换
     * @type {module:zrender/graphic/Path}
     * @see http://www.w3.org/TR/2dcontext/#clipping-region
     * @readOnly
     */
    clipPath: null,

    /**
     * 是否是 Group
     * @type {boolean}
     */
    isGroup: false,

    /**
     * Drift element
     * @param  {number} dx dx on the global space
     * @param  {number} dy dy on the global space
     */
    drift: function (dx, dy) {
        switch (this.draggable) {
            case 'horizontal':
                dy = 0;
                break;
            case 'vertical':
                dx = 0;
                break;
        }

        var m = this.transform;
        if (!m) {
            m = this.transform = [1, 0, 0, 1, 0, 0];
        }
        m[4] += dx;
        m[5] += dy;

        this.decomposeTransform();
        this.dirty(false);
    },

    /**
     * Hook before update
     */
    beforeUpdate: function () {},
    /**
     * Hook after update
     */
    afterUpdate: function () {},
    /**
     * Update each frame
     */
    update: function () {
        this.updateTransform();
    },

    /**
     * @param  {Function} cb
     * @param  {}   context
     */
    traverse: function (cb, context) {},

    /**
     * @protected
     */
    attrKV: function (key, value) {
        if (key === 'position' || key === 'scale' || key === 'origin') {
            // Copy the array
            if (value) {
                var target = this[key];
                if (!target) {
                    target = this[key] = [];
                }
                target[0] = value[0];
                target[1] = value[1];
            }
        }
        else {
            this[key] = value;
        }
    },

    /**
     * Hide the element
     */
    hide: function () {
        this.ignore = true;
        this.__zr && this.__zr.refresh();
    },

    /**
     * Show the element
     */
    show: function () {
        this.ignore = false;
        this.__zr && this.__zr.refresh();
    },

    /**
     * @param {string|Object} key
     * @param {*} value
     */
    attr: function (key, value) {
        if (typeof key === 'string') {
            this.attrKV(key, value);
        }
        else if (isObject(key)) {
            for (var name in key) {
                if (key.hasOwnProperty(name)) {
                    this.attrKV(name, key[name]);
                }
            }
        }

        this.dirty(false);

        return this;
    },

    /**
     * @param {module:zrender/graphic/Path} clipPath
     */
    setClipPath: function (clipPath) {
        var zr = this.__zr;
        if (zr) {
            clipPath.addSelfToZr(zr);
        }

        // Remove previous clip path
        if (this.clipPath && this.clipPath !== clipPath) {
            this.removeClipPath();
        }

        this.clipPath = clipPath;
        clipPath.__zr = zr;
        clipPath.__clipTarget = this;

        this.dirty(false);
    },

    /**
     */
    removeClipPath: function () {
        var clipPath = this.clipPath;
        if (clipPath) {
            if (clipPath.__zr) {
                clipPath.removeSelfFromZr(clipPath.__zr);
            }

            clipPath.__zr = null;
            clipPath.__clipTarget = null;
            this.clipPath = null;

            this.dirty(false);
        }
    },

    /**
     * Add self from zrender instance.
     * Not recursively because it will be invoked when element added to storage.
     * @param {module:zrender/ZRender} zr
     */
    addSelfToZr: function (zr) {
        this.__zr = zr;
        // 添加动画
        var animators = this.animators;
        if (animators) {
            for (var i = 0; i < animators.length; i++) {
                zr.animation.addAnimator(animators[i]);
            }
        }

        if (this.clipPath) {
            this.clipPath.addSelfToZr(zr);
        }
    },

    /**
     * Remove self from zrender instance.
     * Not recursively because it will be invoked when element added to storage.
     * @param {module:zrender/ZRender} zr
     */
    removeSelfFromZr: function (zr) {
        this.__zr = null;
        // 移除动画
        var animators = this.animators;
        if (animators) {
            for (var i = 0; i < animators.length; i++) {
                zr.animation.removeAnimator(animators[i]);
            }
        }

        if (this.clipPath) {
            this.clipPath.removeSelfFromZr(zr);
        }
    }
};

mixin(Element, Animatable);
mixin(Element, Transformable);
mixin(Element, Eventful);

/**
 * @module echarts/core/BoundingRect
 */

var v2ApplyTransform = applyTransform;
var mathMin = Math.min;
var mathMax = Math.max;

/**
 * @alias module:echarts/core/BoundingRect
 */
function BoundingRect(x, y, width, height) {

    if (width < 0) {
        x = x + width;
        width = -width;
    }
    if (height < 0) {
        y = y + height;
        height = -height;
    }

    /**
     * @type {number}
     */
    this.x = x;
    /**
     * @type {number}
     */
    this.y = y;
    /**
     * @type {number}
     */
    this.width = width;
    /**
     * @type {number}
     */
    this.height = height;
}

BoundingRect.prototype = {

    constructor: BoundingRect,

    /**
     * @param {module:echarts/core/BoundingRect} other
     */
    union: function (other) {
        var x = mathMin(other.x, this.x);
        var y = mathMin(other.y, this.y);

        this.width = mathMax(
                other.x + other.width,
                this.x + this.width
            ) - x;
        this.height = mathMax(
                other.y + other.height,
                this.y + this.height
            ) - y;
        this.x = x;
        this.y = y;
    },

    /**
     * @param {Array.<number>} m
     * @methods
     */
    applyTransform: (function () {
        var lt = [];
        var rb = [];
        var lb = [];
        var rt = [];
        return function (m) {
            // In case usage like this
            // el.getBoundingRect().applyTransform(el.transform)
            // And element has no transform
            if (!m) {
                return;
            }
            lt[0] = lb[0] = this.x;
            lt[1] = rt[1] = this.y;
            rb[0] = rt[0] = this.x + this.width;
            rb[1] = lb[1] = this.y + this.height;

            v2ApplyTransform(lt, lt, m);
            v2ApplyTransform(rb, rb, m);
            v2ApplyTransform(lb, lb, m);
            v2ApplyTransform(rt, rt, m);

            this.x = mathMin(lt[0], rb[0], lb[0], rt[0]);
            this.y = mathMin(lt[1], rb[1], lb[1], rt[1]);
            var maxX = mathMax(lt[0], rb[0], lb[0], rt[0]);
            var maxY = mathMax(lt[1], rb[1], lb[1], rt[1]);
            this.width = maxX - this.x;
            this.height = maxY - this.y;
        };
    })(),

    /**
     * Calculate matrix of transforming from self to target rect
     * @param  {module:zrender/core/BoundingRect} b
     * @return {Array.<number>}
     */
    calculateTransform: function (b) {
        var a = this;
        var sx = b.width / a.width;
        var sy = b.height / a.height;

        var m = create$1();

        // 矩阵右乘
        translate(m, m, [-a.x, -a.y]);
        scale$1(m, m, [sx, sy]);
        translate(m, m, [b.x, b.y]);

        return m;
    },

    /**
     * @param {(module:echarts/core/BoundingRect|Object)} b
     * @return {boolean}
     */
    intersect: function (b) {
        if (!b) {
            return false;
        }

        if (!(b instanceof BoundingRect)) {
            // Normalize negative width/height.
            b = BoundingRect.create(b);
        }

        var a = this;
        var ax0 = a.x;
        var ax1 = a.x + a.width;
        var ay0 = a.y;
        var ay1 = a.y + a.height;

        var bx0 = b.x;
        var bx1 = b.x + b.width;
        var by0 = b.y;
        var by1 = b.y + b.height;

        return !(ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
    },

    contain: function (x, y) {
        var rect = this;
        return x >= rect.x
            && x <= (rect.x + rect.width)
            && y >= rect.y
            && y <= (rect.y + rect.height);
    },

    /**
     * @return {module:echarts/core/BoundingRect}
     */
    clone: function () {
        return new BoundingRect(this.x, this.y, this.width, this.height);
    },

    /**
     * Copy from another rect
     */
    copy: function (other) {
        this.x = other.x;
        this.y = other.y;
        this.width = other.width;
        this.height = other.height;
    },

    plain: function () {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
};

/**
 * @param {Object|module:zrender/core/BoundingRect} rect
 * @param {number} rect.x
 * @param {number} rect.y
 * @param {number} rect.width
 * @param {number} rect.height
 * @return {module:zrender/core/BoundingRect}
 */
BoundingRect.create = function (rect) {
    return new BoundingRect(rect.x, rect.y, rect.width, rect.height);
};

/**
 * Group是一个容器，可以插入子节点，Group的变换也会被应用到子节点上
 * @module zrender/graphic/Group
 * @example
 *     var Group = require('zrender/container/Group');
 *     var Circle = require('zrender/graphic/shape/Circle');
 *     var g = new Group();
 *     g.position[0] = 100;
 *     g.position[1] = 100;
 *     g.add(new Circle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 20,
 *         }
 *     }));
 *     zr.add(g);
 */

/**
 * @alias module:zrender/graphic/Group
 * @constructor
 * @extends module:zrender/mixin/Transformable
 * @extends module:zrender/mixin/Eventful
 */
var Group = function (opts) {

    opts = opts || {};

    Element.call(this, opts);

    for (var key in opts) {
        if (opts.hasOwnProperty(key)) {
            this[key] = opts[key];
        }
    }

    this._children = [];

    this.__storage = null;

    this.__dirty = true;
};

Group.prototype = {

    constructor: Group,

    isGroup: true,

    /**
     * @type {string}
     */
    type: 'group',

    /**
     * 所有子孙元素是否响应鼠标事件
     * @name module:/zrender/container/Group#silent
     * @type {boolean}
     * @default false
     */
    silent: false,

    /**
     * @return {Array.<module:zrender/Element>}
     */
    children: function () {
        return this._children.slice();
    },

    /**
     * 获取指定 index 的儿子节点
     * @param  {number} idx
     * @return {module:zrender/Element}
     */
    childAt: function (idx) {
        return this._children[idx];
    },

    /**
     * 获取指定名字的儿子节点
     * @param  {string} name
     * @return {module:zrender/Element}
     */
    childOfName: function (name) {
        var children = this._children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].name === name) {
                return children[i];
            }
            }
    },

    /**
     * @return {number}
     */
    childCount: function () {
        return this._children.length;
    },

    /**
     * 添加子节点到最后
     * @param {module:zrender/Element} child
     */
    add: function (child) {
        if (child && child !== this && child.parent !== this) {

            this._children.push(child);

            this._doAdd(child);
        }

        return this;
    },

    /**
     * 添加子节点在 nextSibling 之前
     * @param {module:zrender/Element} child
     * @param {module:zrender/Element} nextSibling
     */
    addBefore: function (child, nextSibling) {
        if (child && child !== this && child.parent !== this
            && nextSibling && nextSibling.parent === this) {

            var children = this._children;
            var idx = children.indexOf(nextSibling);

            if (idx >= 0) {
                children.splice(idx, 0, child);
                this._doAdd(child);
            }
        }

        return this;
    },

    _doAdd: function (child) {
        if (child.parent) {
            child.parent.remove(child);
        }

        child.parent = this;

        var storage = this.__storage;
        var zr = this.__zr;
        if (storage && storage !== child.__storage) {

            storage.addToStorage(child);

            if (child instanceof Group) {
                child.addChildrenToStorage(storage);
            }
        }

        zr && zr.refresh();
    },

    /**
     * 移除子节点
     * @param {module:zrender/Element} child
     */
    remove: function (child) {
        var zr = this.__zr;
        var storage = this.__storage;
        var children = this._children;

        var idx = indexOf(children, child);
        if (idx < 0) {
            return this;
        }
        children.splice(idx, 1);

        child.parent = null;

        if (storage) {

            storage.delFromStorage(child);

            if (child instanceof Group) {
                child.delChildrenFromStorage(storage);
            }
        }

        zr && zr.refresh();

        return this;
    },

    /**
     * 移除所有子节点
     */
    removeAll: function () {
        var children = this._children;
        var storage = this.__storage;
        var child;
        var i;
        for (i = 0; i < children.length; i++) {
            child = children[i];
            if (storage) {
                storage.delFromStorage(child);
                if (child instanceof Group) {
                    child.delChildrenFromStorage(storage);
                }
            }
            child.parent = null;
        }
        children.length = 0;

        return this;
    },

    /**
     * 遍历所有子节点
     * @param  {Function} cb
     * @param  {}   context
     */
    eachChild: function (cb, context) {
        var children = this._children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            cb.call(context, child, i);
        }
        return this;
    },

    /**
     * 深度优先遍历所有子孙节点
     * @param  {Function} cb
     * @param  {}   context
     */
    traverse: function (cb, context) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            cb.call(context, child);

            if (child.type === 'group') {
                child.traverse(cb, context);
            }
        }
        return this;
    },

    addChildrenToStorage: function (storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.addToStorage(child);
            if (child instanceof Group) {
                child.addChildrenToStorage(storage);
            }
        }
    },

    delChildrenFromStorage: function (storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.delFromStorage(child);
            if (child instanceof Group) {
                child.delChildrenFromStorage(storage);
            }
        }
    },

    dirty: function () {
        this.__dirty = true;
        this.__zr && this.__zr.refresh();
        return this;
    },

    /**
     * @return {module:zrender/core/BoundingRect}
     */
    getBoundingRect: function (includeChildren) {
        // TODO Caching
        var rect = null;
        var tmpRect = new BoundingRect(0, 0, 0, 0);
        var children = includeChildren || this._children;
        var tmpMat = [];

        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.ignore || child.invisible) {
                continue;
            }

            var childRect = child.getBoundingRect();
            var transform = child.getLocalTransform(tmpMat);
            // TODO
            // The boundingRect cacluated by transforming original
            // rect may be bigger than the actual bundingRect when rotation
            // is used. (Consider a circle rotated aginst its center, where
            // the actual boundingRect should be the same as that not be
            // rotated.) But we can not find better approach to calculate
            // actual boundingRect yet, considering performance.
            if (transform) {
                tmpRect.copy(childRect);
                tmpRect.applyTransform(transform);
                rect = rect || tmpRect.clone();
                rect.union(tmpRect);
            }
            else {
                rect = rect || childRect.clone();
                rect.union(childRect);
            }
        }
        return rect || tmpRect;
    }
};

inherits(Group, Element);

// https://github.com/mziccard/node-timsort
var DEFAULT_MIN_MERGE = 32;

var DEFAULT_MIN_GALLOPING = 7;

function minRunLength(n) {
    var r = 0;

    while (n >= DEFAULT_MIN_MERGE) {
        r |= n & 1;
        n >>= 1;
    }

    return n + r;
}

function makeAscendingRun(array, lo, hi, compare) {
    var runHi = lo + 1;

    if (runHi === hi) {
        return 1;
    }

    if (compare(array[runHi++], array[lo]) < 0) {
        while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
            runHi++;
        }

        reverseRun(array, lo, runHi);
    }
    else {
        while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
            runHi++;
        }
    }

    return runHi - lo;
}

function reverseRun(array, lo, hi) {
    hi--;

    while (lo < hi) {
        var t = array[lo];
        array[lo++] = array[hi];
        array[hi--] = t;
    }
}

function binaryInsertionSort(array, lo, hi, start, compare) {
    if (start === lo) {
        start++;
    }

    for (; start < hi; start++) {
        var pivot = array[start];

        var left = lo;
        var right = start;
        var mid;

        while (left < right) {
            mid = left + right >>> 1;

            if (compare(pivot, array[mid]) < 0) {
                right = mid;
            }
            else {
                left = mid + 1;
            }
        }

        var n = start - left;

        switch (n) {
            case 3:
                array[left + 3] = array[left + 2];

            case 2:
                array[left + 2] = array[left + 1];

            case 1:
                array[left + 1] = array[left];
                break;
            default:
                while (n > 0) {
                    array[left + n] = array[left + n - 1];
                    n--;
                }
        }

        array[left] = pivot;
    }
}

function gallopLeft(value, array, start, length, hint, compare) {
    var lastOffset = 0;
    var maxOffset = 0;
    var offset = 1;

    if (compare(value, array[start + hint]) > 0) {
        maxOffset = length - hint;

        while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
            lastOffset = offset;
            offset = (offset << 1) + 1;

            if (offset <= 0) {
                offset = maxOffset;
            }
        }

        if (offset > maxOffset) {
            offset = maxOffset;
        }

        lastOffset += hint;
        offset += hint;
    }
    else {
        maxOffset = hint + 1;
        while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
            lastOffset = offset;
            offset = (offset << 1) + 1;

            if (offset <= 0) {
                offset = maxOffset;
            }
        }
        if (offset > maxOffset) {
            offset = maxOffset;
        }

        var tmp = lastOffset;
        lastOffset = hint - offset;
        offset = hint - tmp;
    }

    lastOffset++;
    while (lastOffset < offset) {
        var m = lastOffset + (offset - lastOffset >>> 1);

        if (compare(value, array[start + m]) > 0) {
            lastOffset = m + 1;
        }
        else {
            offset = m;
        }
    }
    return offset;
}

function gallopRight(value, array, start, length, hint, compare) {
    var lastOffset = 0;
    var maxOffset = 0;
    var offset = 1;

    if (compare(value, array[start + hint]) < 0) {
        maxOffset = hint + 1;

        while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
            lastOffset = offset;
            offset = (offset << 1) + 1;

            if (offset <= 0) {
                offset = maxOffset;
            }
        }

        if (offset > maxOffset) {
            offset = maxOffset;
        }

        var tmp = lastOffset;
        lastOffset = hint - offset;
        offset = hint - tmp;
    }
    else {
        maxOffset = length - hint;

        while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
            lastOffset = offset;
            offset = (offset << 1) + 1;

            if (offset <= 0) {
                offset = maxOffset;
            }
        }

        if (offset > maxOffset) {
            offset = maxOffset;
        }

        lastOffset += hint;
        offset += hint;
    }

    lastOffset++;

    while (lastOffset < offset) {
        var m = lastOffset + (offset - lastOffset >>> 1);

        if (compare(value, array[start + m]) < 0) {
            offset = m;
        }
        else {
            lastOffset = m + 1;
        }
    }

    return offset;
}

function TimSort(array, compare) {
    var minGallop = DEFAULT_MIN_GALLOPING;
    var runStart;
    var runLength;
    var stackSize = 0;

    var tmp = [];

    runStart = [];
    runLength = [];

    function pushRun(_runStart, _runLength) {
        runStart[stackSize] = _runStart;
        runLength[stackSize] = _runLength;
        stackSize += 1;
    }

    function mergeRuns() {
        while (stackSize > 1) {
            var n = stackSize - 2;

            if (n >= 1 && runLength[n - 1] <= runLength[n] + runLength[n + 1] || n >= 2 && runLength[n - 2] <= runLength[n] + runLength[n - 1]) {
                if (runLength[n - 1] < runLength[n + 1]) {
                    n--;
                }
            }
            else if (runLength[n] > runLength[n + 1]) {
                break;
            }
            mergeAt(n);
        }
    }

    function forceMergeRuns() {
        while (stackSize > 1) {
            var n = stackSize - 2;

            if (n > 0 && runLength[n - 1] < runLength[n + 1]) {
                n--;
            }

            mergeAt(n);
        }
    }

    function mergeAt(i) {
        var start1 = runStart[i];
        var length1 = runLength[i];
        var start2 = runStart[i + 1];
        var length2 = runLength[i + 1];

        runLength[i] = length1 + length2;

        if (i === stackSize - 3) {
            runStart[i + 1] = runStart[i + 2];
            runLength[i + 1] = runLength[i + 2];
        }

        stackSize--;

        var k = gallopRight(array[start2], array, start1, length1, 0, compare);
        start1 += k;
        length1 -= k;

        if (length1 === 0) {
            return;
        }

        length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);

        if (length2 === 0) {
            return;
        }

        if (length1 <= length2) {
            mergeLow(start1, length1, start2, length2);
        }
        else {
            mergeHigh(start1, length1, start2, length2);
        }
    }

    function mergeLow(start1, length1, start2, length2) {
        var i = 0;

        for (i = 0; i < length1; i++) {
            tmp[i] = array[start1 + i];
        }

        var cursor1 = 0;
        var cursor2 = start2;
        var dest = start1;

        array[dest++] = array[cursor2++];

        if (--length2 === 0) {
            for (i = 0; i < length1; i++) {
                array[dest + i] = tmp[cursor1 + i];
            }
            return;
        }

        if (length1 === 1) {
            for (i = 0; i < length2; i++) {
                array[dest + i] = array[cursor2 + i];
            }
            array[dest + length2] = tmp[cursor1];
            return;
        }

        var _minGallop = minGallop;
        var count1, count2, exit;

        while (1) {
            count1 = 0;
            count2 = 0;
            exit = false;

            do {
                if (compare(array[cursor2], tmp[cursor1]) < 0) {
                    array[dest++] = array[cursor2++];
                    count2++;
                    count1 = 0;

                    if (--length2 === 0) {
                        exit = true;
                        break;
                    }
                }
                else {
                    array[dest++] = tmp[cursor1++];
                    count1++;
                    count2 = 0;
                    if (--length1 === 1) {
                        exit = true;
                        break;
                    }
                }
            } while ((count1 | count2) < _minGallop);

            if (exit) {
                break;
            }

            do {
                count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

                if (count1 !== 0) {
                    for (i = 0; i < count1; i++) {
                        array[dest + i] = tmp[cursor1 + i];
                    }

                    dest += count1;
                    cursor1 += count1;
                    length1 -= count1;
                    if (length1 <= 1) {
                        exit = true;
                        break;
                    }
                }

                array[dest++] = array[cursor2++];

                if (--length2 === 0) {
                    exit = true;
                    break;
                }

                count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

                if (count2 !== 0) {
                    for (i = 0; i < count2; i++) {
                        array[dest + i] = array[cursor2 + i];
                    }

                    dest += count2;
                    cursor2 += count2;
                    length2 -= count2;

                    if (length2 === 0) {
                        exit = true;
                        break;
                    }
                }
                array[dest++] = tmp[cursor1++];

                if (--length1 === 1) {
                    exit = true;
                    break;
                }

                _minGallop--;
            } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

            if (exit) {
                break;
            }

            if (_minGallop < 0) {
                _minGallop = 0;
            }

            _minGallop += 2;
        }

        minGallop = _minGallop;

        minGallop < 1 && (minGallop = 1);

        if (length1 === 1) {
            for (i = 0; i < length2; i++) {
                array[dest + i] = array[cursor2 + i];
            }
            array[dest + length2] = tmp[cursor1];
        }
        else if (length1 === 0) {
            throw new Error();
            // throw new Error('mergeLow preconditions were not respected');
        }
        else {
            for (i = 0; i < length1; i++) {
                array[dest + i] = tmp[cursor1 + i];
            }
        }
    }

    function mergeHigh(start1, length1, start2, length2) {
        var i = 0;

        for (i = 0; i < length2; i++) {
            tmp[i] = array[start2 + i];
        }

        var cursor1 = start1 + length1 - 1;
        var cursor2 = length2 - 1;
        var dest = start2 + length2 - 1;
        var customCursor = 0;
        var customDest = 0;

        array[dest--] = array[cursor1--];

        if (--length1 === 0) {
            customCursor = dest - (length2 - 1);

            for (i = 0; i < length2; i++) {
                array[customCursor + i] = tmp[i];
            }

            return;
        }

        if (length2 === 1) {
            dest -= length1;
            cursor1 -= length1;
            customDest = dest + 1;
            customCursor = cursor1 + 1;

            for (i = length1 - 1; i >= 0; i--) {
                array[customDest + i] = array[customCursor + i];
            }

            array[dest] = tmp[cursor2];
            return;
        }

        var _minGallop = minGallop;

        while (true) {
            var count1 = 0;
            var count2 = 0;
            var exit = false;

            do {
                if (compare(tmp[cursor2], array[cursor1]) < 0) {
                    array[dest--] = array[cursor1--];
                    count1++;
                    count2 = 0;
                    if (--length1 === 0) {
                        exit = true;
                        break;
                    }
                }
                else {
                    array[dest--] = tmp[cursor2--];
                    count2++;
                    count1 = 0;
                    if (--length2 === 1) {
                        exit = true;
                        break;
                    }
                }
            } while ((count1 | count2) < _minGallop);

            if (exit) {
                break;
            }

            do {
                count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);

                if (count1 !== 0) {
                    dest -= count1;
                    cursor1 -= count1;
                    length1 -= count1;
                    customDest = dest + 1;
                    customCursor = cursor1 + 1;

                    for (i = count1 - 1; i >= 0; i--) {
                        array[customDest + i] = array[customCursor + i];
                    }

                    if (length1 === 0) {
                        exit = true;
                        break;
                    }
                }

                array[dest--] = tmp[cursor2--];

                if (--length2 === 1) {
                    exit = true;
                    break;
                }

                count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);

                if (count2 !== 0) {
                    dest -= count2;
                    cursor2 -= count2;
                    length2 -= count2;
                    customDest = dest + 1;
                    customCursor = cursor2 + 1;

                    for (i = 0; i < count2; i++) {
                        array[customDest + i] = tmp[customCursor + i];
                    }

                    if (length2 <= 1) {
                        exit = true;
                        break;
                    }
                }

                array[dest--] = array[cursor1--];

                if (--length1 === 0) {
                    exit = true;
                    break;
                }

                _minGallop--;
            } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

            if (exit) {
                break;
            }

            if (_minGallop < 0) {
                _minGallop = 0;
            }

            _minGallop += 2;
        }

        minGallop = _minGallop;

        if (minGallop < 1) {
            minGallop = 1;
        }

        if (length2 === 1) {
            dest -= length1;
            cursor1 -= length1;
            customDest = dest + 1;
            customCursor = cursor1 + 1;

            for (i = length1 - 1; i >= 0; i--) {
                array[customDest + i] = array[customCursor + i];
            }

            array[dest] = tmp[cursor2];
        }
        else if (length2 === 0) {
            throw new Error();
            // throw new Error('mergeHigh preconditions were not respected');
        }
        else {
            customCursor = dest - (length2 - 1);
            for (i = 0; i < length2; i++) {
                array[customCursor + i] = tmp[i];
            }
        }
    }

    this.mergeRuns = mergeRuns;
    this.forceMergeRuns = forceMergeRuns;
    this.pushRun = pushRun;
}

function sort(array, compare, lo, hi) {
    if (!lo) {
        lo = 0;
    }
    if (!hi) {
        hi = array.length;
    }

    var remaining = hi - lo;

    if (remaining < 2) {
        return;
    }

    var runLength = 0;

    if (remaining < DEFAULT_MIN_MERGE) {
        runLength = makeAscendingRun(array, lo, hi, compare);
        binaryInsertionSort(array, lo, hi, lo + runLength, compare);
        return;
    }

    var ts = new TimSort(array, compare);

    var minRun = minRunLength(remaining);

    do {
        runLength = makeAscendingRun(array, lo, hi, compare);
        if (runLength < minRun) {
            var force = remaining;
            if (force > minRun) {
                force = minRun;
            }

            binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
            runLength = force;
        }

        ts.pushRun(lo, runLength);
        ts.mergeRuns();

        remaining -= runLength;
        lo += runLength;
    } while (remaining !== 0);

    ts.forceMergeRuns();
}

// Use timsort because in most case elements are partially sorted
// https://jsfiddle.net/pissang/jr4x7mdm/8/
function shapeCompareFunc(a, b) {
    if (a.zlevel === b.zlevel) {
        if (a.z === b.z) {
            // if (a.z2 === b.z2) {
            //     // FIXME Slow has renderidx compare
            //     // http://stackoverflow.com/questions/20883421/sorting-in-javascript-should-every-compare-function-have-a-return-0-statement
            //     // https://github.com/v8/v8/blob/47cce544a31ed5577ffe2963f67acb4144ee0232/src/js/array.js#L1012
            //     return a.__renderidx - b.__renderidx;
            // }
            return a.z2 - b.z2;
        }
        return a.z - b.z;
    }
    return a.zlevel - b.zlevel;
}
/**
 * 内容仓库 (M)
 * @alias module:zrender/Storage
 * @constructor
 */
var Storage = function () { // jshint ignore:line
    this._roots = [];

    this._displayList = [];

    this._displayListLen = 0;
};

Storage.prototype = {

    constructor: Storage,

    /**
     * @param  {Function} cb
     *
     */
    traverse: function (cb, context) {
        for (var i = 0; i < this._roots.length; i++) {
            this._roots[i].traverse(cb, context);
        }
    },

    /**
     * 返回所有图形的绘制队列
     * @param {boolean} [update=false] 是否在返回前更新该数组
     * @param {boolean} [includeIgnore=false] 是否包含 ignore 的数组, 在 update 为 true 的时候有效
     *
     * 详见{@link module:zrender/graphic/Displayable.prototype.updateDisplayList}
     * @return {Array.<module:zrender/graphic/Displayable>}
     */
    getDisplayList: function (update, includeIgnore) {
        includeIgnore = includeIgnore || false;
        if (update) {
            this.updateDisplayList(includeIgnore);
        }
        return this._displayList;
    },

    /**
     * 更新图形的绘制队列。
     * 每次绘制前都会调用，该方法会先深度优先遍历整个树，更新所有Group和Shape的变换并且把所有可见的Shape保存到数组中，
     * 最后根据绘制的优先级（zlevel > z > 插入顺序）排序得到绘制队列
     * @param {boolean} [includeIgnore=false] 是否包含 ignore 的数组
     */
    updateDisplayList: function (includeIgnore) {
        this._displayListLen = 0;

        var roots = this._roots;
        var displayList = this._displayList;
        for (var i = 0, len = roots.length; i < len; i++) {
            this._updateAndAddDisplayable(roots[i], null, includeIgnore);
        }

        displayList.length = this._displayListLen;

        env$1.canvasSupported && sort(displayList, shapeCompareFunc);
    },

    _updateAndAddDisplayable: function (el, clipPaths, includeIgnore) {

        if (el.ignore && !includeIgnore) {
            return;
        }

        el.beforeUpdate();

        if (el.__dirty) {

            el.update();

        }

        el.afterUpdate();

        var userSetClipPath = el.clipPath;
        if (userSetClipPath) {

            // FIXME 效率影响
            if (clipPaths) {
                clipPaths = clipPaths.slice();
            }
            else {
                clipPaths = [];
            }

            var currentClipPath = userSetClipPath;
            var parentClipPath = el;
            // Recursively add clip path
            while (currentClipPath) {
                // clipPath 的变换是基于使用这个 clipPath 的元素
                currentClipPath.parent = parentClipPath;
                currentClipPath.updateTransform();

                clipPaths.push(currentClipPath);

                parentClipPath = currentClipPath;
                currentClipPath = currentClipPath.clipPath;
            }
        }

        if (el.isGroup) {
            var children = el._children;

            for (var i = 0; i < children.length; i++) {
                var child = children[i];

                // Force to mark as dirty if group is dirty
                // FIXME __dirtyPath ?
                if (el.__dirty) {
                    child.__dirty = true;
                }

                this._updateAndAddDisplayable(child, clipPaths, includeIgnore);
            }

            // Mark group clean here
            el.__dirty = false;

        }
        else {
            el.__clipPaths = clipPaths;

            this._displayList[this._displayListLen++] = el;
        }
    },

    /**
     * 添加图形(Shape)或者组(Group)到根节点
     * @param {module:zrender/Element} el
     */
    addRoot: function (el) {
        if (el.__storage === this) {
            return;
        }

        if (el instanceof Group) {
            el.addChildrenToStorage(this);
        }

        this.addToStorage(el);
        this._roots.push(el);
    },

    /**
     * 删除指定的图形(Shape)或者组(Group)
     * @param {string|Array.<string>} [el] 如果为空清空整个Storage
     */
    delRoot: function (el) {
        if (el == null) {
            // 不指定el清空
            for (var i = 0; i < this._roots.length; i++) {
                var root = this._roots[i];
                if (root instanceof Group) {
                    root.delChildrenFromStorage(this);
                }
            }

            this._roots = [];
            this._displayList = [];
            this._displayListLen = 0;

            return;
        }

        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i++) {
                this.delRoot(el[i]);
            }
            return;
        }


        var idx = indexOf(this._roots, el);
        if (idx >= 0) {
            this.delFromStorage(el);
            this._roots.splice(idx, 1);
            if (el instanceof Group) {
                el.delChildrenFromStorage(this);
            }
        }
    },

    addToStorage: function (el) {
        if (el) {
            el.__storage = this;
            el.dirty(false);
        }
        return this;
    },

    delFromStorage: function (el) {
        if (el) {
            el.__storage = null;
        }

        return this;
    },

    /**
     * 清空并且释放Storage
     */
    dispose: function () {
        this._renderList =
        this._roots = null;
    },

    displayableSortFunc: shapeCompareFunc
};

var SHADOW_PROPS = {
    'shadowBlur': 1,
    'shadowOffsetX': 1,
    'shadowOffsetY': 1,
    'textShadowBlur': 1,
    'textShadowOffsetX': 1,
    'textShadowOffsetY': 1,
    'textBoxShadowBlur': 1,
    'textBoxShadowOffsetX': 1,
    'textBoxShadowOffsetY': 1
};

var fixShadow = function (ctx, propName, value) {
    if (SHADOW_PROPS.hasOwnProperty(propName)) {
        return value *= ctx.dpr;
    }
    return value;
};

var ContextCachedBy = {
    NONE: 0,
    STYLE_BIND: 1,
    PLAIN_TEXT: 2
};

// Avoid confused with 0/false.
var WILL_BE_RESTORED = 9;

var STYLE_COMMON_PROPS = [
    ['shadowBlur', 0], ['shadowOffsetX', 0], ['shadowOffsetY', 0], ['shadowColor', '#000'],
    ['lineCap', 'butt'], ['lineJoin', 'miter'], ['miterLimit', 10]
];

// var SHADOW_PROPS = STYLE_COMMON_PROPS.slice(0, 4);
// var LINE_PROPS = STYLE_COMMON_PROPS.slice(4);

var Style = function (opts) {
    this.extendFrom(opts, false);
};

function createLinearGradient(ctx, obj, rect) {
    var x = obj.x == null ? 0 : obj.x;
    var x2 = obj.x2 == null ? 1 : obj.x2;
    var y = obj.y == null ? 0 : obj.y;
    var y2 = obj.y2 == null ? 0 : obj.y2;

    if (!obj.global) {
        x = x * rect.width + rect.x;
        x2 = x2 * rect.width + rect.x;
        y = y * rect.height + rect.y;
        y2 = y2 * rect.height + rect.y;
    }

    // Fix NaN when rect is Infinity
    x = isNaN(x) ? 0 : x;
    x2 = isNaN(x2) ? 1 : x2;
    y = isNaN(y) ? 0 : y;
    y2 = isNaN(y2) ? 0 : y2;

    var canvasGradient = ctx.createLinearGradient(x, y, x2, y2);

    return canvasGradient;
}

function createRadialGradient(ctx, obj, rect) {
    var width = rect.width;
    var height = rect.height;
    var min = Math.min(width, height);

    var x = obj.x == null ? 0.5 : obj.x;
    var y = obj.y == null ? 0.5 : obj.y;
    var r = obj.r == null ? 0.5 : obj.r;
    if (!obj.global) {
        x = x * width + rect.x;
        y = y * height + rect.y;
        r = r * min;
    }

    var canvasGradient = ctx.createRadialGradient(x, y, 0, x, y, r);

    return canvasGradient;
}


Style.prototype = {

    constructor: Style,

    /**
     * @type {string}
     */
    fill: '#000',

    /**
     * @type {string}
     */
    stroke: null,

    /**
     * @type {number}
     */
    opacity: 1,

    /**
     * @type {number}
     */
    fillOpacity: null,

    /**
     * @type {number}
     */
    strokeOpacity: null,

    /**
     * @type {Array.<number>}
     */
    lineDash: null,

    /**
     * @type {number}
     */
    lineDashOffset: 0,

    /**
     * @type {number}
     */
    shadowBlur: 0,

    /**
     * @type {number}
     */
    shadowOffsetX: 0,

    /**
     * @type {number}
     */
    shadowOffsetY: 0,

    /**
     * @type {number}
     */
    lineWidth: 1,

    /**
     * If stroke ignore scale
     * @type {Boolean}
     */
    strokeNoScale: false,

    // Bounding rect text configuration
    // Not affected by element transform
    /**
     * @type {string}
     */
    text: null,

    /**
     * If `fontSize` or `fontFamily` exists, `font` will be reset by
     * `fontSize`, `fontStyle`, `fontWeight`, `fontFamily`.
     * So do not visit it directly in upper application (like echarts),
     * but use `contain/text#makeFont` instead.
     * @type {string}
     */
    font: null,

    /**
     * The same as font. Use font please.
     * @deprecated
     * @type {string}
     */
    textFont: null,

    /**
     * It helps merging respectively, rather than parsing an entire font string.
     * @type {string}
     */
    fontStyle: null,

    /**
     * It helps merging respectively, rather than parsing an entire font string.
     * @type {string}
     */
    fontWeight: null,

    /**
     * It helps merging respectively, rather than parsing an entire font string.
     * Should be 12 but not '12px'.
     * @type {number}
     */
    fontSize: null,

    /**
     * It helps merging respectively, rather than parsing an entire font string.
     * @type {string}
     */
    fontFamily: null,

    /**
     * Reserved for special functinality, like 'hr'.
     * @type {string}
     */
    textTag: null,

    /**
     * @type {string}
     */
    textFill: '#000',

    /**
     * @type {string}
     */
    textStroke: null,

    /**
     * @type {number}
     */
    textWidth: null,

    /**
     * Only for textBackground.
     * @type {number}
     */
    textHeight: null,

    /**
     * textStroke may be set as some color as a default
     * value in upper applicaion, where the default value
     * of textStrokeWidth should be 0 to make sure that
     * user can choose to do not use text stroke.
     * @type {number}
     */
    textStrokeWidth: 0,

    /**
     * @type {number}
     */
    textLineHeight: null,

    /**
     * 'inside', 'left', 'right', 'top', 'bottom'
     * [x, y]
     * Based on x, y of rect.
     * @type {string|Array.<number>}
     * @default 'inside'
     */
    textPosition: 'inside',

    /**
     * If not specified, use the boundingRect of a `displayable`.
     * @type {Object}
     */
    textRect: null,

    /**
     * [x, y]
     * @type {Array.<number>}
     */
    textOffset: null,

    /**
     * @type {string}
     */
    textAlign: null,

    /**
     * @type {string}
     */
    textVerticalAlign: null,

    /**
     * @type {number}
     */
    textDistance: 5,

    /**
     * @type {string}
     */
    textShadowColor: 'transparent',

    /**
     * @type {number}
     */
    textShadowBlur: 0,

    /**
     * @type {number}
     */
    textShadowOffsetX: 0,

    /**
     * @type {number}
     */
    textShadowOffsetY: 0,

    /**
     * @type {string}
     */
    textBoxShadowColor: 'transparent',

    /**
     * @type {number}
     */
    textBoxShadowBlur: 0,

    /**
     * @type {number}
     */
    textBoxShadowOffsetX: 0,

    /**
     * @type {number}
     */
    textBoxShadowOffsetY: 0,

    /**
     * Whether transform text.
     * Only useful in Path and Image element
     * @type {boolean}
     */
    transformText: false,

    /**
     * Text rotate around position of Path or Image
     * Only useful in Path and Image element and transformText is false.
     */
    textRotation: 0,

    /**
     * Text origin of text rotation, like [10, 40].
     * Based on x, y of rect.
     * Useful in label rotation of circular symbol.
     * By default, this origin is textPosition.
     * Can be 'center'.
     * @type {string|Array.<number>}
     */
    textOrigin: null,

    /**
     * @type {string}
     */
    textBackgroundColor: null,

    /**
     * @type {string}
     */
    textBorderColor: null,

    /**
     * @type {number}
     */
    textBorderWidth: 0,

    /**
     * @type {number}
     */
    textBorderRadius: 0,

    /**
     * Can be `2` or `[2, 4]` or `[2, 3, 4, 5]`
     * @type {number|Array.<number>}
     */
    textPadding: null,

    /**
     * Text styles for rich text.
     * @type {Object}
     */
    rich: null,

    /**
     * {outerWidth, outerHeight, ellipsis, placeholder}
     * @type {Object}
     */
    truncate: null,

    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
     * @type {string}
     */
    blend: null,

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    bind: function (ctx, el, prevEl) {
        var style = this;
        var prevStyle = prevEl && prevEl.style;
        // If no prevStyle, it means first draw.
        // Only apply cache if the last time cachced by this function.
        var notCheckCache = !prevStyle || ctx.__attrCachedBy !== ContextCachedBy.STYLE_BIND;

        ctx.__attrCachedBy = ContextCachedBy.STYLE_BIND;

        for (var i = 0; i < STYLE_COMMON_PROPS.length; i++) {
            var prop = STYLE_COMMON_PROPS[i];
            var styleName = prop[0];

            if (notCheckCache || style[styleName] !== prevStyle[styleName]) {
                // FIXME Invalid property value will cause style leak from previous element.
                ctx[styleName] =
                    fixShadow(ctx, styleName, style[styleName] || prop[1]);
            }
        }

        if ((notCheckCache || style.fill !== prevStyle.fill)) {
            ctx.fillStyle = style.fill;
        }
        if ((notCheckCache || style.stroke !== prevStyle.stroke)) {
            ctx.strokeStyle = style.stroke;
        }
        if ((notCheckCache || style.opacity !== prevStyle.opacity)) {
            ctx.globalAlpha = style.opacity == null ? 1 : style.opacity;
        }

        if ((notCheckCache || style.blend !== prevStyle.blend)) {
            ctx.globalCompositeOperation = style.blend || 'source-over';
        }
        if (this.hasStroke()) {
            var lineWidth = style.lineWidth;
            ctx.lineWidth = lineWidth / (
                (this.strokeNoScale && el && el.getLineScale) ? el.getLineScale() : 1
            );
        }
    },

    hasFill: function () {
        var fill = this.fill;
        return fill != null && fill !== 'none';
    },

    hasStroke: function () {
        var stroke = this.stroke;
        return stroke != null && stroke !== 'none' && this.lineWidth > 0;
    },

    /**
     * Extend from other style
     * @param {zrender/graphic/Style} otherStyle
     * @param {boolean} overwrite true: overwrirte any way.
     *                            false: overwrite only when !target.hasOwnProperty
     *                            others: overwrite when property is not null/undefined.
     */
    extendFrom: function (otherStyle, overwrite) {
        if (otherStyle) {
            for (var name in otherStyle) {
                if (otherStyle.hasOwnProperty(name)
                    && (overwrite === true
                        || (
                            overwrite === false
                                ? !this.hasOwnProperty(name)
                                : otherStyle[name] != null
                        )
                    )
                ) {
                    this[name] = otherStyle[name];
                }
            }
        }
    },

    /**
     * Batch setting style with a given object
     * @param {Object|string} obj
     * @param {*} [obj]
     */
    set: function (obj, value) {
        if (typeof obj === 'string') {
            this[obj] = value;
        }
        else {
            this.extendFrom(obj, true);
        }
    },

    /**
     * Clone
     * @return {zrender/graphic/Style} [description]
     */
    clone: function () {
        var newStyle = new this.constructor();
        newStyle.extendFrom(this, true);
        return newStyle;
    },

    getGradient: function (ctx, obj, rect) {
        var method = obj.type === 'radial' ? createRadialGradient : createLinearGradient;
        var canvasGradient = method(ctx, obj, rect);
        var colorStops = obj.colorStops;
        for (var i = 0; i < colorStops.length; i++) {
            canvasGradient.addColorStop(
                colorStops[i].offset, colorStops[i].color
            );
        }
        return canvasGradient;
    }

};

var styleProto = Style.prototype;
for (var i = 0; i < STYLE_COMMON_PROPS.length; i++) {
    var prop = STYLE_COMMON_PROPS[i];
    if (!(prop[0] in styleProto)) {
        styleProto[prop[0]] = prop[1];
    }
}

// Provide for others
Style.getGradient = styleProto.getGradient;

var Pattern = function (image, repeat) {
    // Should do nothing more in this constructor. Because gradient can be
    // declard by `color: {image: ...}`, where this constructor will not be called.

    this.image = image;
    this.repeat = repeat;

    // Can be cloned
    this.type = 'pattern';
};

Pattern.prototype.getCanvasPattern = function (ctx) {
    return ctx.createPattern(this.image, this.repeat || 'repeat');
};

/**
 * @module zrender/Layer
 * @author pissang(https://www.github.com/pissang)
 */

function returnFalse() {
    return false;
}

/**
 * 创建dom
 *
 * @inner
 * @param {string} id dom id 待用
 * @param {Painter} painter painter instance
 * @param {number} number
 */
function createDom(id, painter, dpr) {
    var newDom = createCanvas();
    var width = painter.getWidth();
    var height = painter.getHeight();

    var newDomStyle = newDom.style;
    if (newDomStyle) {  // In node or some other non-browser environment
        newDomStyle.position = 'absolute';
        newDomStyle.left = 0;
        newDomStyle.top = 0;
        newDomStyle.width = width + 'px';
        newDomStyle.height = height + 'px';

        newDom.setAttribute('data-zr-dom-id', id);
    }

    newDom.width = width * dpr;
    newDom.height = height * dpr;

    return newDom;
}

/**
 * @alias module:zrender/Layer
 * @constructor
 * @extends module:zrender/mixin/Transformable
 * @param {string} id
 * @param {module:zrender/Painter} painter
 * @param {number} [dpr]
 */
var Layer = function (id, painter, dpr) {
    var dom;
    dpr = dpr || devicePixelRatio;
    if (typeof id === 'string') {
        dom = createDom(id, painter, dpr);
    }
    // Not using isDom because in node it will return false
    else if (isObject(id)) {
        dom = id;
        id = dom.id;
    }
    this.id = id;
    this.dom = dom;

    var domStyle = dom.style;
    if (domStyle) { // Not in node
        dom.onselectstart = returnFalse; // 避免页面选中的尴尬
        domStyle['-webkit-user-select'] = 'none';
        domStyle['user-select'] = 'none';
        domStyle['-webkit-touch-callout'] = 'none';
        domStyle['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)';
        domStyle['padding'] = 0;
        domStyle['margin'] = 0;
        domStyle['border-width'] = 0;
    }

    this.domBack = null;
    this.ctxBack = null;

    this.painter = painter;

    this.config = null;

    // Configs
    /**
     * 每次清空画布的颜色
     * @type {string}
     * @default 0
     */
    this.clearColor = 0;
    /**
     * 是否开启动态模糊
     * @type {boolean}
     * @default false
     */
    this.motionBlur = false;
    /**
     * 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
     * @type {number}
     * @default 0.7
     */
    this.lastFrameAlpha = 0.7;

    /**
     * Layer dpr
     * @type {number}
     */
    this.dpr = dpr;
};

Layer.prototype = {

    constructor: Layer,

    __dirty: true,

    __used: false,

    __drawIndex: 0,
    __startIndex: 0,
    __endIndex: 0,

    incremental: false,

    getElementCount: function () {
        return this.__endIndex - this.__startIndex;
    },

    initContext: function () {
        this.ctx = this.dom.getContext('2d');
        this.ctx.dpr = this.dpr;
    },

    createBackBuffer: function () {
        var dpr = this.dpr;

        this.domBack = createDom('back-' + this.id, this.painter, dpr);
        this.ctxBack = this.domBack.getContext('2d');

        if (dpr !== 1) {
            this.ctxBack.scale(dpr, dpr);
        }
    },

    /**
     * @param  {number} width
     * @param  {number} height
     */
    resize: function (width, height) {
        var dpr = this.dpr;

        var dom = this.dom;
        var domStyle = dom.style;
        var domBack = this.domBack;

        if (domStyle) {
            domStyle.width = width + 'px';
            domStyle.height = height + 'px';
        }

        dom.width = width * dpr;
        dom.height = height * dpr;

        if (domBack) {
            domBack.width = width * dpr;
            domBack.height = height * dpr;

            if (dpr !== 1) {
                this.ctxBack.scale(dpr, dpr);
            }
        }
    },

    /**
     * 清空该层画布
     * @param {boolean} [clearAll]=false Clear all with out motion blur
     * @param {Color} [clearColor]
     */
    clear: function (clearAll, clearColor) {
        var dom = this.dom;
        var ctx = this.ctx;
        var width = dom.width;
        var height = dom.height;

        var clearColor = clearColor || this.clearColor;
        var haveMotionBLur = this.motionBlur && !clearAll;
        var lastFrameAlpha = this.lastFrameAlpha;

        var dpr = this.dpr;

        if (haveMotionBLur) {
            if (!this.domBack) {
                this.createBackBuffer();
            }

            this.ctxBack.globalCompositeOperation = 'copy';
            this.ctxBack.drawImage(
                dom, 0, 0,
                width / dpr,
                height / dpr
            );
        }

        ctx.clearRect(0, 0, width, height);
        if (clearColor && clearColor !== 'transparent') {
            var clearColorGradientOrPattern;
            // Gradient
            if (clearColor.colorStops) {
                // Cache canvas gradient
                clearColorGradientOrPattern = clearColor.__canvasGradient || Style.getGradient(ctx, clearColor, {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height
                });

                clearColor.__canvasGradient = clearColorGradientOrPattern;
            }
            // Pattern
            else if (clearColor.image) {
                clearColorGradientOrPattern = Pattern.prototype.getCanvasPattern.call(clearColor, ctx);
            }
            ctx.save();
            ctx.fillStyle = clearColorGradientOrPattern || clearColor;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }

        if (haveMotionBLur) {
            var domBack = this.domBack;
            ctx.save();
            ctx.globalAlpha = lastFrameAlpha;
            ctx.drawImage(domBack, 0, 0, width, height);
            ctx.restore();
        }
    }
};

var requestAnimationFrame = (
    typeof window !== 'undefined'
    && (
        (window.requestAnimationFrame && window.requestAnimationFrame.bind(window))
        // https://github.com/ecomfe/zrender/issues/189#issuecomment-224919809
        || (window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window))
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
    )
) || function (func) {
    setTimeout(func, 16);
};

var globalImageCache = new LRU(50);

/**
 * @param {string|HTMLImageElement|HTMLCanvasElement|Canvas} newImageOrSrc
 * @return {HTMLImageElement|HTMLCanvasElement|Canvas} image
 */
function findExistImage(newImageOrSrc) {
    if (typeof newImageOrSrc === 'string') {
        var cachedImgObj = globalImageCache.get(newImageOrSrc);
        return cachedImgObj && cachedImgObj.image;
    }
    else {
        return newImageOrSrc;
    }
}

/**
 * Caution: User should cache loaded images, but not just count on LRU.
 * Consider if required images more than LRU size, will dead loop occur?
 *
 * @param {string|HTMLImageElement|HTMLCanvasElement|Canvas} newImageOrSrc
 * @param {HTMLImageElement|HTMLCanvasElement|Canvas} image Existent image.
 * @param {module:zrender/Element} [hostEl] For calling `dirty`.
 * @param {Function} [cb] params: (image, cbPayload)
 * @param {Object} [cbPayload] Payload on cb calling.
 * @return {HTMLImageElement|HTMLCanvasElement|Canvas} image
 */
function createOrUpdateImage(newImageOrSrc, image, hostEl, cb, cbPayload) {
    if (!newImageOrSrc) {
        return image;
    }
    else if (typeof newImageOrSrc === 'string') {

        // Image should not be loaded repeatly.
        if ((image && image.__zrImageSrc === newImageOrSrc) || !hostEl) {
            return image;
        }

        // Only when there is no existent image or existent image src
        // is different, this method is responsible for load.
        var cachedImgObj = globalImageCache.get(newImageOrSrc);

        var pendingWrap = {hostEl: hostEl, cb: cb, cbPayload: cbPayload};

        if (cachedImgObj) {
            image = cachedImgObj.image;
            !isImageReady(image) && cachedImgObj.pending.push(pendingWrap);
        }
        else {
            image = new Image();
            image.onload = image.onerror = imageOnLoad;

            globalImageCache.put(
                newImageOrSrc,
                image.__cachedImgObj = {
                    image: image,
                    pending: [pendingWrap]
                }
            );

            image.src = image.__zrImageSrc = newImageOrSrc;
        }

        return image;
    }
    // newImageOrSrc is an HTMLImageElement or HTMLCanvasElement or Canvas
    else {
        return newImageOrSrc;
    }
}

function imageOnLoad() {
    var cachedImgObj = this.__cachedImgObj;
    this.onload = this.onerror = this.__cachedImgObj = null;

    for (var i = 0; i < cachedImgObj.pending.length; i++) {
        var pendingWrap = cachedImgObj.pending[i];
        var cb = pendingWrap.cb;
        cb && cb(this, pendingWrap.cbPayload);
        pendingWrap.hostEl.dirty();
    }
    cachedImgObj.pending.length = 0;
}

function isImageReady(image) {
    return image && image.width && image.height;
}

var textWidthCache = {};
var textWidthCacheCounter = 0;

var TEXT_CACHE_MAX = 5000;
var STYLE_REG = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;

var DEFAULT_FONT$1 = '12px sans-serif';

// Avoid assign to an exported variable, for transforming to cjs.
var methods$1 = {};

function $override$1(name, fn) {
    methods$1[name] = fn;
}

/**
 * @public
 * @param {string} text
 * @param {string} font
 * @return {number} width
 */
function getWidth(text, font) {
    font = font || DEFAULT_FONT$1;
    var key = text + ':' + font;
    if (textWidthCache[key]) {
        return textWidthCache[key];
    }

    var textLines = (text + '').split('\n');
    var width = 0;

    for (var i = 0, l = textLines.length; i < l; i++) {
        // textContain.measureText may be overrided in SVG or VML
        width = Math.max(measureText(textLines[i], font).width, width);
    }

    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
        textWidthCacheCounter = 0;
        textWidthCache = {};
    }
    textWidthCacheCounter++;
    textWidthCache[key] = width;

    return width;
}

/**
 * @public
 * @param {string} text
 * @param {string} font
 * @param {string} [textAlign='left']
 * @param {string} [textVerticalAlign='top']
 * @param {Array.<number>} [textPadding]
 * @param {Object} [rich]
 * @param {Object} [truncate]
 * @return {Object} {x, y, width, height, lineHeight}
 */
function getBoundingRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate) {
    return rich
        ? getRichTextRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate)
        : getPlainTextRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, truncate);
}

function getPlainTextRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, truncate) {
    var contentBlock = parsePlainText(text, font, textPadding, textLineHeight, truncate);
    var outerWidth = getWidth(text, font);
    if (textPadding) {
        outerWidth += textPadding[1] + textPadding[3];
    }
    var outerHeight = contentBlock.outerHeight;

    var x = adjustTextX(0, outerWidth, textAlign);
    var y = adjustTextY(0, outerHeight, textVerticalAlign);

    var rect = new BoundingRect(x, y, outerWidth, outerHeight);
    rect.lineHeight = contentBlock.lineHeight;

    return rect;
}

function getRichTextRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate) {
    var contentBlock = parseRichText(text, {
        rich: rich,
        truncate: truncate,
        font: font,
        textAlign: textAlign,
        textPadding: textPadding,
        textLineHeight: textLineHeight
    });
    var outerWidth = contentBlock.outerWidth;
    var outerHeight = contentBlock.outerHeight;

    var x = adjustTextX(0, outerWidth, textAlign);
    var y = adjustTextY(0, outerHeight, textVerticalAlign);

    return new BoundingRect(x, y, outerWidth, outerHeight);
}

/**
 * @public
 * @param {number} x
 * @param {number} width
 * @param {string} [textAlign='left']
 * @return {number} Adjusted x.
 */
function adjustTextX(x, width, textAlign) {
    // FIXME Right to left language
    if (textAlign === 'right') {
        x -= width;
    }
    else if (textAlign === 'center') {
        x -= width / 2;
    }
    return x;
}

/**
 * @public
 * @param {number} y
 * @param {number} height
 * @param {string} [textVerticalAlign='top']
 * @return {number} Adjusted y.
 */
function adjustTextY(y, height, textVerticalAlign) {
    if (textVerticalAlign === 'middle') {
        y -= height / 2;
    }
    else if (textVerticalAlign === 'bottom') {
        y -= height;
    }
    return y;
}

/**
 * @public
 * @param {stirng} textPosition
 * @param {Object} rect {x, y, width, height}
 * @param {number} distance
 * @return {Object} {x, y, textAlign, textVerticalAlign}
 */
function adjustTextPositionOnRect(textPosition, rect, distance) {

    var x = rect.x;
    var y = rect.y;

    var height = rect.height;
    var width = rect.width;
    var halfHeight = height / 2;

    var textAlign = 'left';
    var textVerticalAlign = 'top';

    switch (textPosition) {
        case 'left':
            x -= distance;
            y += halfHeight;
            textAlign = 'right';
            textVerticalAlign = 'middle';
            break;
        case 'right':
            x += distance + width;
            y += halfHeight;
            textVerticalAlign = 'middle';
            break;
        case 'top':
            x += width / 2;
            y -= distance;
            textAlign = 'center';
            textVerticalAlign = 'bottom';
            break;
        case 'bottom':
            x += width / 2;
            y += height + distance;
            textAlign = 'center';
            break;
        case 'inside':
            x += width / 2;
            y += halfHeight;
            textAlign = 'center';
            textVerticalAlign = 'middle';
            break;
        case 'insideLeft':
            x += distance;
            y += halfHeight;
            textVerticalAlign = 'middle';
            break;
        case 'insideRight':
            x += width - distance;
            y += halfHeight;
            textAlign = 'right';
            textVerticalAlign = 'middle';
            break;
        case 'insideTop':
            x += width / 2;
            y += distance;
            textAlign = 'center';
            break;
        case 'insideBottom':
            x += width / 2;
            y += height - distance;
            textAlign = 'center';
            textVerticalAlign = 'bottom';
            break;
        case 'insideTopLeft':
            x += distance;
            y += distance;
            break;
        case 'insideTopRight':
            x += width - distance;
            y += distance;
            textAlign = 'right';
            break;
        case 'insideBottomLeft':
            x += distance;
            y += height - distance;
            textVerticalAlign = 'bottom';
            break;
        case 'insideBottomRight':
            x += width - distance;
            y += height - distance;
            textAlign = 'right';
            textVerticalAlign = 'bottom';
            break;
    }

    return {
        x: x,
        y: y,
        textAlign: textAlign,
        textVerticalAlign: textVerticalAlign
    };
}

/**
 * Show ellipsis if overflow.
 *
 * @public
 * @param  {string} text
 * @param  {string} containerWidth
 * @param  {string} font
 * @param  {number} [ellipsis='...']
 * @param  {Object} [options]
 * @param  {number} [options.maxIterations=3]
 * @param  {number} [options.minChar=0] If truncate result are less
 *                  then minChar, ellipsis will not show, which is
 *                  better for user hint in some cases.
 * @param  {number} [options.placeholder=''] When all truncated, use the placeholder.
 * @return {string}
 */
function truncateText(text, containerWidth, font, ellipsis, options) {
    if (!containerWidth) {
        return '';
    }

    var textLines = (text + '').split('\n');
    options = prepareTruncateOptions(containerWidth, font, ellipsis, options);

    // FIXME
    // It is not appropriate that every line has '...' when truncate multiple lines.
    for (var i = 0, len = textLines.length; i < len; i++) {
        textLines[i] = truncateSingleLine(textLines[i], options);
    }

    return textLines.join('\n');
}

function prepareTruncateOptions(containerWidth, font, ellipsis, options) {
    options = extend({}, options);

    options.font = font;
    var ellipsis = retrieve2(ellipsis, '...');
    options.maxIterations = retrieve2(options.maxIterations, 2);
    var minChar = options.minChar = retrieve2(options.minChar, 0);
    // FIXME
    // Other languages?
    options.cnCharWidth = getWidth('国', font);
    // FIXME
    // Consider proportional font?
    var ascCharWidth = options.ascCharWidth = getWidth('a', font);
    options.placeholder = retrieve2(options.placeholder, '');

    // Example 1: minChar: 3, text: 'asdfzxcv', truncate result: 'asdf', but not: 'a...'.
    // Example 2: minChar: 3, text: '维度', truncate result: '维', but not: '...'.
    var contentWidth = containerWidth = Math.max(0, containerWidth - 1); // Reserve some gap.
    for (var i = 0; i < minChar && contentWidth >= ascCharWidth; i++) {
        contentWidth -= ascCharWidth;
    }

    var ellipsisWidth = getWidth(ellipsis, font);
    if (ellipsisWidth > contentWidth) {
        ellipsis = '';
        ellipsisWidth = 0;
    }

    contentWidth = containerWidth - ellipsisWidth;

    options.ellipsis = ellipsis;
    options.ellipsisWidth = ellipsisWidth;
    options.contentWidth = contentWidth;
    options.containerWidth = containerWidth;

    return options;
}

function truncateSingleLine(textLine, options) {
    var containerWidth = options.containerWidth;
    var font = options.font;
    var contentWidth = options.contentWidth;

    if (!containerWidth) {
        return '';
    }

    var lineWidth = getWidth(textLine, font);

    if (lineWidth <= containerWidth) {
        return textLine;
    }

    for (var j = 0; ; j++) {
        if (lineWidth <= contentWidth || j >= options.maxIterations) {
            textLine += options.ellipsis;
            break;
        }

        var subLength = j === 0
            ? estimateLength(textLine, contentWidth, options.ascCharWidth, options.cnCharWidth)
            : lineWidth > 0
            ? Math.floor(textLine.length * contentWidth / lineWidth)
            : 0;

        textLine = textLine.substr(0, subLength);
        lineWidth = getWidth(textLine, font);
    }

    if (textLine === '') {
        textLine = options.placeholder;
    }

    return textLine;
}

function estimateLength(text, contentWidth, ascCharWidth, cnCharWidth) {
    var width = 0;
    var i = 0;
    for (var len = text.length; i < len && width < contentWidth; i++) {
        var charCode = text.charCodeAt(i);
        width += (0 <= charCode && charCode <= 127) ? ascCharWidth : cnCharWidth;
    }
    return i;
}

/**
 * @public
 * @param {string} font
 * @return {number} line height
 */
function getLineHeight(font) {
    // FIXME A rough approach.
    return getWidth('国', font);
}

/**
 * @public
 * @param {string} text
 * @param {string} font
 * @return {Object} width
 */
function measureText(text, font) {
    return methods$1.measureText(text, font);
}

// Avoid assign to an exported variable, for transforming to cjs.
methods$1.measureText = function (text, font) {
    var ctx = getContext();
    ctx.font = font || DEFAULT_FONT$1;
    return ctx.measureText(text);
};

/**
 * @public
 * @param {string} text
 * @param {string} font
 * @param {Object} [truncate]
 * @return {Object} block: {lineHeight, lines, height, outerHeight}
 *  Notice: for performance, do not calculate outerWidth util needed.
 */
function parsePlainText(text, font, padding, textLineHeight, truncate) {
    text != null && (text += '');

    var lineHeight = retrieve2(textLineHeight, getLineHeight(font));
    var lines = text ? text.split('\n') : [];
    var height = lines.length * lineHeight;
    var outerHeight = height;

    if (padding) {
        outerHeight += padding[0] + padding[2];
    }

    if (text && truncate) {
        var truncOuterHeight = truncate.outerHeight;
        var truncOuterWidth = truncate.outerWidth;
        if (truncOuterHeight != null && outerHeight > truncOuterHeight) {
            text = '';
            lines = [];
        }
        else if (truncOuterWidth != null) {
            var options = prepareTruncateOptions(
                truncOuterWidth - (padding ? padding[1] + padding[3] : 0),
                font,
                truncate.ellipsis,
                {minChar: truncate.minChar, placeholder: truncate.placeholder}
            );

            // FIXME
            // It is not appropriate that every line has '...' when truncate multiple lines.
            for (var i = 0, len = lines.length; i < len; i++) {
                lines[i] = truncateSingleLine(lines[i], options);
            }
        }
    }

    return {
        lines: lines,
        height: height,
        outerHeight: outerHeight,
        lineHeight: lineHeight
    };
}

/**
 * For example: 'some text {a|some text}other text{b|some text}xxx{c|}xxx'
 * Also consider 'bbbb{a|xxx\nzzz}xxxx\naaaa'.
 *
 * @public
 * @param {string} text
 * @param {Object} style
 * @return {Object} block
 * {
 *      width,
 *      height,
 *      lines: [{
 *          lineHeight,
 *          width,
 *          tokens: [[{
 *              styleName,
 *              text,
 *              width,      // include textPadding
 *              height,     // include textPadding
 *              textWidth, // pure text width
 *              textHeight, // pure text height
 *              lineHeihgt,
 *              font,
 *              textAlign,
 *              textVerticalAlign
 *          }], [...], ...]
 *      }, ...]
 * }
 * If styleName is undefined, it is plain text.
 */
function parseRichText(text, style) {
    var contentBlock = {lines: [], width: 0, height: 0};

    text != null && (text += '');
    if (!text) {
        return contentBlock;
    }

    var lastIndex = STYLE_REG.lastIndex = 0;
    var result;
    while ((result = STYLE_REG.exec(text)) != null) {
        var matchedIndex = result.index;
        if (matchedIndex > lastIndex) {
            pushTokens(contentBlock, text.substring(lastIndex, matchedIndex));
        }
        pushTokens(contentBlock, result[2], result[1]);
        lastIndex = STYLE_REG.lastIndex;
    }

    if (lastIndex < text.length) {
        pushTokens(contentBlock, text.substring(lastIndex, text.length));
    }

    var lines = contentBlock.lines;
    var contentHeight = 0;
    var contentWidth = 0;
    // For `textWidth: 100%`
    var pendingList = [];

    var stlPadding = style.textPadding;

    var truncate = style.truncate;
    var truncateWidth = truncate && truncate.outerWidth;
    var truncateHeight = truncate && truncate.outerHeight;
    if (stlPadding) {
        truncateWidth != null && (truncateWidth -= stlPadding[1] + stlPadding[3]);
        truncateHeight != null && (truncateHeight -= stlPadding[0] + stlPadding[2]);
    }

    // Calculate layout info of tokens.
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var lineHeight = 0;
        var lineWidth = 0;

        for (var j = 0; j < line.tokens.length; j++) {
            var token = line.tokens[j];
            var tokenStyle = token.styleName && style.rich[token.styleName] || {};
            // textPadding should not inherit from style.
            var textPadding = token.textPadding = tokenStyle.textPadding;

            // textFont has been asigned to font by `normalizeStyle`.
            var font = token.font = tokenStyle.font || style.font;

            // textHeight can be used when textVerticalAlign is specified in token.
            var tokenHeight = token.textHeight = retrieve2(
                // textHeight should not be inherited, consider it can be specified
                // as box height of the block.
                tokenStyle.textHeight, getLineHeight(font)
            );
            textPadding && (tokenHeight += textPadding[0] + textPadding[2]);
            token.height = tokenHeight;
            token.lineHeight = retrieve3(
                tokenStyle.textLineHeight, style.textLineHeight, tokenHeight
            );

            token.textAlign = tokenStyle && tokenStyle.textAlign || style.textAlign;
            token.textVerticalAlign = tokenStyle && tokenStyle.textVerticalAlign || 'middle';

            if (truncateHeight != null && contentHeight + token.lineHeight > truncateHeight) {
                return {lines: [], width: 0, height: 0};
            }

            token.textWidth = getWidth(token.text, font);
            var tokenWidth = tokenStyle.textWidth;
            var tokenWidthNotSpecified = tokenWidth == null || tokenWidth === 'auto';

            // Percent width, can be `100%`, can be used in drawing separate
            // line when box width is needed to be auto.
            if (typeof tokenWidth === 'string' && tokenWidth.charAt(tokenWidth.length - 1) === '%') {
                token.percentWidth = tokenWidth;
                pendingList.push(token);
                tokenWidth = 0;
                // Do not truncate in this case, because there is no user case
                // and it is too complicated.
            }
            else {
                if (tokenWidthNotSpecified) {
                    tokenWidth = token.textWidth;

                    // FIXME: If image is not loaded and textWidth is not specified, calling
                    // `getBoundingRect()` will not get correct result.
                    var textBackgroundColor = tokenStyle.textBackgroundColor;
                    var bgImg = textBackgroundColor && textBackgroundColor.image;

                    // Use cases:
                    // (1) If image is not loaded, it will be loaded at render phase and call
                    // `dirty()` and `textBackgroundColor.image` will be replaced with the loaded
                    // image, and then the right size will be calculated here at the next tick.
                    // See `graphic/helper/text.js`.
                    // (2) If image loaded, and `textBackgroundColor.image` is image src string,
                    // use `imageHelper.findExistImage` to find cached image.
                    // `imageHelper.findExistImage` will always be called here before
                    // `imageHelper.createOrUpdateImage` in `graphic/helper/text.js#renderRichText`
                    // which ensures that image will not be rendered before correct size calcualted.
                    if (bgImg) {
                        bgImg = findExistImage(bgImg);
                        if (isImageReady(bgImg)) {
                            tokenWidth = Math.max(tokenWidth, bgImg.width * tokenHeight / bgImg.height);
                        }
                    }
                }

                var paddingW = textPadding ? textPadding[1] + textPadding[3] : 0;
                tokenWidth += paddingW;

                var remianTruncWidth = truncateWidth != null ? truncateWidth - lineWidth : null;

                if (remianTruncWidth != null && remianTruncWidth < tokenWidth) {
                    if (!tokenWidthNotSpecified || remianTruncWidth < paddingW) {
                        token.text = '';
                        token.textWidth = tokenWidth = 0;
                    }
                    else {
                        token.text = truncateText(
                            token.text, remianTruncWidth - paddingW, font, truncate.ellipsis,
                            {minChar: truncate.minChar}
                        );
                        token.textWidth = getWidth(token.text, font);
                        tokenWidth = token.textWidth + paddingW;
                    }
                }
            }

            lineWidth += (token.width = tokenWidth);
            tokenStyle && (lineHeight = Math.max(lineHeight, token.lineHeight));
        }

        line.width = lineWidth;
        line.lineHeight = lineHeight;
        contentHeight += lineHeight;
        contentWidth = Math.max(contentWidth, lineWidth);
    }

    contentBlock.outerWidth = contentBlock.width = retrieve2(style.textWidth, contentWidth);
    contentBlock.outerHeight = contentBlock.height = retrieve2(style.textHeight, contentHeight);

    if (stlPadding) {
        contentBlock.outerWidth += stlPadding[1] + stlPadding[3];
        contentBlock.outerHeight += stlPadding[0] + stlPadding[2];
    }

    for (var i = 0; i < pendingList.length; i++) {
        var token = pendingList[i];
        var percentWidth = token.percentWidth;
        // Should not base on outerWidth, because token can not be placed out of padding.
        token.width = parseInt(percentWidth, 10) / 100 * contentWidth;
    }

    return contentBlock;
}

function pushTokens(block, str, styleName) {
    var isEmptyStr = str === '';
    var strs = str.split('\n');
    var lines = block.lines;

    for (var i = 0; i < strs.length; i++) {
        var text = strs[i];
        var token = {
            styleName: styleName,
            text: text,
            isLineHolder: !text && !isEmptyStr
        };

        // The first token should be appended to the last line.
        if (!i) {
            var tokens = (lines[lines.length - 1] || (lines[0] = {tokens: []})).tokens;

            // Consider cases:
            // (1) ''.split('\n') => ['', '\n', ''], the '' at the first item
            // (which is a placeholder) should be replaced by new token.
            // (2) A image backage, where token likes {a|}.
            // (3) A redundant '' will affect textAlign in line.
            // (4) tokens with the same tplName should not be merged, because
            // they should be displayed in different box (with border and padding).
            var tokensLen = tokens.length;
            (tokensLen === 1 && tokens[0].isLineHolder)
                ? (tokens[0] = token)
                // Consider text is '', only insert when it is the "lineHolder" or
                // "emptyStr". Otherwise a redundant '' will affect textAlign in line.
                : ((text || !tokensLen || isEmptyStr) && tokens.push(token));
        }
        // Other tokens always start a new line.
        else {
            // If there is '', insert it as a placeholder.
            lines.push({tokens: [token]});
        }
    }
}

function makeFont(style) {
    // FIXME in node-canvas fontWeight is before fontStyle
    // Use `fontSize` `fontFamily` to check whether font properties are defined.
    var font = (style.fontSize || style.fontFamily) && [
        style.fontStyle,
        style.fontWeight,
        (style.fontSize || 12) + 'px',
        // If font properties are defined, `fontFamily` should not be ignored.
        style.fontFamily || 'sans-serif'
    ].join(' ');
    return font && trim(font) || style.textFont || style.font;
}

/**
 * @param {Object} ctx
 * @param {Object} shape
 * @param {number} shape.x
 * @param {number} shape.y
 * @param {number} shape.width
 * @param {number} shape.height
 * @param {number} shape.r
 */
function buildPath(ctx, shape) {
    var x = shape.x;
    var y = shape.y;
    var width = shape.width;
    var height = shape.height;
    var r = shape.r;
    var r1;
    var r2;
    var r3;
    var r4;

    // Convert width and height to positive for better borderRadius
    if (width < 0) {
        x = x + width;
        width = -width;
    }
    if (height < 0) {
        y = y + height;
        height = -height;
    }

    if (typeof r === 'number') {
        r1 = r2 = r3 = r4 = r;
    }
    else if (r instanceof Array) {
        if (r.length === 1) {
            r1 = r2 = r3 = r4 = r[0];
        }
        else if (r.length === 2) {
            r1 = r3 = r[0];
            r2 = r4 = r[1];
        }
        else if (r.length === 3) {
            r1 = r[0];
            r2 = r4 = r[1];
            r3 = r[2];
        }
        else {
            r1 = r[0];
            r2 = r[1];
            r3 = r[2];
            r4 = r[3];
        }
    }
    else {
        r1 = r2 = r3 = r4 = 0;
    }

    var total;
    if (r1 + r2 > width) {
        total = r1 + r2;
        r1 *= width / total;
        r2 *= width / total;
    }
    if (r3 + r4 > width) {
        total = r3 + r4;
        r3 *= width / total;
        r4 *= width / total;
    }
    if (r2 + r3 > height) {
        total = r2 + r3;
        r2 *= height / total;
        r3 *= height / total;
    }
    if (r1 + r4 > height) {
        total = r1 + r4;
        r1 *= height / total;
        r4 *= height / total;
    }
    ctx.moveTo(x + r1, y);
    ctx.lineTo(x + width - r2, y);
    r2 !== 0 && ctx.arc(x + width - r2, y + r2, r2, -Math.PI / 2, 0);
    ctx.lineTo(x + width, y + height - r3);
    r3 !== 0 && ctx.arc(x + width - r3, y + height - r3, r3, 0, Math.PI / 2);
    ctx.lineTo(x + r4, y + height);
    r4 !== 0 && ctx.arc(x + r4, y + height - r4, r4, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + r1);
    r1 !== 0 && ctx.arc(x + r1, y + r1, r1, Math.PI, Math.PI * 1.5);
}

var DEFAULT_FONT = DEFAULT_FONT$1;

// TODO: Have not support 'start', 'end' yet.
var VALID_TEXT_ALIGN = {left: 1, right: 1, center: 1};
var VALID_TEXT_VERTICAL_ALIGN = {top: 1, bottom: 1, middle: 1};
// Different from `STYLE_COMMON_PROPS` of `graphic/Style`,
// the default value of shadowColor is `'transparent'`.
var SHADOW_STYLE_COMMON_PROPS = [
    ['textShadowBlur', 'shadowBlur', 0],
    ['textShadowOffsetX', 'shadowOffsetX', 0],
    ['textShadowOffsetY', 'shadowOffsetY', 0],
    ['textShadowColor', 'shadowColor', 'transparent']
];

/**
 * @param {module:zrender/graphic/Style} style
 * @return {module:zrender/graphic/Style} The input style.
 */
function normalizeTextStyle(style) {
    normalizeStyle(style);
    each(style.rich, normalizeStyle);
    return style;
}

function normalizeStyle(style) {
    if (style) {

        style.font = makeFont(style);

        var textAlign = style.textAlign;
        textAlign === 'middle' && (textAlign = 'center');
        style.textAlign = (
            textAlign == null || VALID_TEXT_ALIGN[textAlign]
        ) ? textAlign : 'left';

        // Compatible with textBaseline.
        var textVerticalAlign = style.textVerticalAlign || style.textBaseline;
        textVerticalAlign === 'center' && (textVerticalAlign = 'middle');
        style.textVerticalAlign = (
            textVerticalAlign == null || VALID_TEXT_VERTICAL_ALIGN[textVerticalAlign]
        ) ? textVerticalAlign : 'top';

        var textPadding = style.textPadding;
        if (textPadding) {
            style.textPadding = normalizeCssArray(style.textPadding);
        }
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} text
 * @param {module:zrender/graphic/Style} style
 * @param {Object|boolean} [rect] {x, y, width, height}
 *                  If set false, rect text is not used.
 * @param {Element|module:zrender/graphic/helper/constant.WILL_BE_RESTORED} [prevEl] For ctx prop cache.
 */
function renderText(hostEl, ctx, text, style, rect, prevEl) {
    style.rich
        ? renderRichText(hostEl, ctx, text, style, rect, prevEl)
        : renderPlainText(hostEl, ctx, text, style, rect, prevEl);
}

// Avoid setting to ctx according to prevEl if possible for
// performance in scenarios of large amount text.
function renderPlainText(hostEl, ctx, text, style, rect, prevEl) {
    'use strict';

    var needDrawBg = needDrawBackground(style);

    var prevStyle;
    var checkCache = false;
    var cachedByMe = ctx.__attrCachedBy === ContextCachedBy.PLAIN_TEXT;

    // Only take and check cache for `Text` el, but not RectText.
    if (prevEl !== WILL_BE_RESTORED) {
        if (prevEl) {
            prevStyle = prevEl.style;
            checkCache = !needDrawBg && cachedByMe && prevStyle;
        }

        // Prevent from using cache in `Style::bind`, because of the case:
        // ctx property is modified by other properties than `Style::bind`
        // used, and Style::bind is called next.
        ctx.__attrCachedBy = needDrawBg ? ContextCachedBy.NONE : ContextCachedBy.PLAIN_TEXT;
    }
    // Since this will be restored, prevent from using these props to check cache in the next
    // entering of this method. But do not need to clear other cache like `Style::bind`.
    else if (cachedByMe) {
        ctx.__attrCachedBy = ContextCachedBy.NONE;
    }

    var styleFont = style.font || DEFAULT_FONT;
    // PENDING
    // Only `Text` el set `font` and keep it (`RectText` will restore). So theoretically
    // we can make font cache on ctx, which can cache for text el that are discontinuous.
    // But layer save/restore needed to be considered.
    // if (styleFont !== ctx.__fontCache) {
    //     ctx.font = styleFont;
    //     if (prevEl !== WILL_BE_RESTORED) {
    //         ctx.__fontCache = styleFont;
    //     }
    // }
    if (!checkCache || styleFont !== (prevStyle.font || DEFAULT_FONT)) {
        ctx.font = styleFont;
    }

    // Use the final font from context-2d, because the final
    // font might not be the style.font when it is illegal.
    // But get `ctx.font` might be time consuming.
    var computedFont = hostEl.__computedFont;
    if (hostEl.__styleFont !== styleFont) {
        hostEl.__styleFont = styleFont;
        computedFont = hostEl.__computedFont = ctx.font;
    }

    var textPadding = style.textPadding;
    var textLineHeight = style.textLineHeight;

    var contentBlock = hostEl.__textCotentBlock;
    if (!contentBlock || hostEl.__dirtyText) {
        contentBlock = hostEl.__textCotentBlock = parsePlainText(
            text, computedFont, textPadding, textLineHeight, style.truncate
        );
    }

    var outerHeight = contentBlock.outerHeight;

    var textLines = contentBlock.lines;
    var lineHeight = contentBlock.lineHeight;

    var boxPos = getBoxPosition(outerHeight, style, rect);
    var baseX = boxPos.baseX;
    var baseY = boxPos.baseY;
    var textAlign = boxPos.textAlign || 'left';
    var textVerticalAlign = boxPos.textVerticalAlign;

    // Origin of textRotation should be the base point of text drawing.
    applyTextRotation(ctx, style, rect, baseX, baseY);

    var boxY = adjustTextY(baseY, outerHeight, textVerticalAlign);
    var textX = baseX;
    var textY = boxY;

    if (needDrawBg || textPadding) {
        // Consider performance, do not call getTextWidth util necessary.
        var textWidth = getWidth(text, computedFont);
        var outerWidth = textWidth;
        textPadding && (outerWidth += textPadding[1] + textPadding[3]);
        var boxX = adjustTextX(baseX, outerWidth, textAlign);

        needDrawBg && drawBackground(hostEl, ctx, style, boxX, boxY, outerWidth, outerHeight);

        if (textPadding) {
            textX = getTextXForPadding(baseX, textAlign, textPadding);
            textY += textPadding[0];
        }
    }

    // Always set textAlign and textBase line, because it is difficute to calculate
    // textAlign from prevEl, and we dont sure whether textAlign will be reset if
    // font set happened.
    ctx.textAlign = textAlign;
    // Force baseline to be "middle". Otherwise, if using "top", the
    // text will offset downward a little bit in font "Microsoft YaHei".
    ctx.textBaseline = 'middle';
    // Set text opacity
    ctx.globalAlpha = style.opacity || 1;

    // Always set shadowBlur and shadowOffset to avoid leak from displayable.
    for (var i = 0; i < SHADOW_STYLE_COMMON_PROPS.length; i++) {
        var propItem = SHADOW_STYLE_COMMON_PROPS[i];
        var styleProp = propItem[0];
        var ctxProp = propItem[1];
        var val = style[styleProp];
        if (!checkCache || val !== prevStyle[styleProp]) {
            ctx[ctxProp] = fixShadow(ctx, ctxProp, val || propItem[2]);
        }
    }

    // `textBaseline` is set as 'middle'.
    textY += lineHeight / 2;

    var textStrokeWidth = style.textStrokeWidth;
    var textStrokeWidthPrev = checkCache ? prevStyle.textStrokeWidth : null;
    var strokeWidthChanged = !checkCache || textStrokeWidth !== textStrokeWidthPrev;
    var strokeChanged = !checkCache || strokeWidthChanged || style.textStroke !== prevStyle.textStroke;
    var textStroke = getStroke(style.textStroke, textStrokeWidth);
    var textFill = getFill(style.textFill);

    if (textStroke) {
        if (strokeWidthChanged) {
            ctx.lineWidth = textStrokeWidth;
        }
        if (strokeChanged) {
            ctx.strokeStyle = textStroke;
        }
    }
    if (textFill) {
        if (!checkCache || style.textFill !== prevStyle.textFill) {
            ctx.fillStyle = textFill;
        }
    }

    // Optimize simply, in most cases only one line exists.
    if (textLines.length === 1) {
        // Fill after stroke so the outline will not cover the main part.
        textStroke && ctx.strokeText(textLines[0], textX, textY);
        textFill && ctx.fillText(textLines[0], textX, textY);
    }
    else {
        for (var i = 0; i < textLines.length; i++) {
            // Fill after stroke so the outline will not cover the main part.
            textStroke && ctx.strokeText(textLines[i], textX, textY);
            textFill && ctx.fillText(textLines[i], textX, textY);
            textY += lineHeight;
        }
    }
}

function renderRichText(hostEl, ctx, text, style, rect, prevEl) {
    // Do not do cache for rich text because of the complexity.
    // But `RectText` this will be restored, do not need to clear other cache like `Style::bind`.
    if (prevEl !== WILL_BE_RESTORED) {
        ctx.__attrCachedBy = ContextCachedBy.NONE;
    }

    var contentBlock = hostEl.__textCotentBlock;

    if (!contentBlock || hostEl.__dirtyText) {
        contentBlock = hostEl.__textCotentBlock = parseRichText(text, style);
    }

    drawRichText(hostEl, ctx, contentBlock, style, rect);
}

function drawRichText(hostEl, ctx, contentBlock, style, rect) {
    var contentWidth = contentBlock.width;
    var outerWidth = contentBlock.outerWidth;
    var outerHeight = contentBlock.outerHeight;
    var textPadding = style.textPadding;

    var boxPos = getBoxPosition(outerHeight, style, rect);
    var baseX = boxPos.baseX;
    var baseY = boxPos.baseY;
    var textAlign = boxPos.textAlign;
    var textVerticalAlign = boxPos.textVerticalAlign;

    // Origin of textRotation should be the base point of text drawing.
    applyTextRotation(ctx, style, rect, baseX, baseY);

    var boxX = adjustTextX(baseX, outerWidth, textAlign);
    var boxY = adjustTextY(baseY, outerHeight, textVerticalAlign);
    var xLeft = boxX;
    var lineTop = boxY;
    if (textPadding) {
        xLeft += textPadding[3];
        lineTop += textPadding[0];
    }
    var xRight = xLeft + contentWidth;

    needDrawBackground(style) && drawBackground(
        hostEl, ctx, style, boxX, boxY, outerWidth, outerHeight
    );

    for (var i = 0; i < contentBlock.lines.length; i++) {
        var line = contentBlock.lines[i];
        var tokens = line.tokens;
        var tokenCount = tokens.length;
        var lineHeight = line.lineHeight;
        var usedWidth = line.width;

        var leftIndex = 0;
        var lineXLeft = xLeft;
        var lineXRight = xRight;
        var rightIndex = tokenCount - 1;
        var token;

        while (
            leftIndex < tokenCount
            && (token = tokens[leftIndex], !token.textAlign || token.textAlign === 'left')
        ) {
            placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXLeft, 'left');
            usedWidth -= token.width;
            lineXLeft += token.width;
            leftIndex++;
        }

        while (
            rightIndex >= 0
            && (token = tokens[rightIndex], token.textAlign === 'right')
        ) {
            placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXRight, 'right');
            usedWidth -= token.width;
            lineXRight -= token.width;
            rightIndex--;
        }

        // The other tokens are placed as textAlign 'center' if there is enough space.
        lineXLeft += (contentWidth - (lineXLeft - xLeft) - (xRight - lineXRight) - usedWidth) / 2;
        while (leftIndex <= rightIndex) {
            token = tokens[leftIndex];
            // Consider width specified by user, use 'center' rather than 'left'.
            placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXLeft + token.width / 2, 'center');
            lineXLeft += token.width;
            leftIndex++;
        }

        lineTop += lineHeight;
    }
}

function applyTextRotation(ctx, style, rect, x, y) {
    // textRotation only apply in RectText.
    if (rect && style.textRotation) {
        var origin = style.textOrigin;
        if (origin === 'center') {
            x = rect.width / 2 + rect.x;
            y = rect.height / 2 + rect.y;
        }
        else if (origin) {
            x = origin[0] + rect.x;
            y = origin[1] + rect.y;
        }

        ctx.translate(x, y);
        // Positive: anticlockwise
        ctx.rotate(-style.textRotation);
        ctx.translate(-x, -y);
    }
}

function placeToken(hostEl, ctx, token, style, lineHeight, lineTop, x, textAlign) {
    var tokenStyle = style.rich[token.styleName] || {};
    tokenStyle.text = token.text;

    // 'ctx.textBaseline' is always set as 'middle', for sake of
    // the bias of "Microsoft YaHei".
    var textVerticalAlign = token.textVerticalAlign;
    var y = lineTop + lineHeight / 2;
    if (textVerticalAlign === 'top') {
        y = lineTop + token.height / 2;
    }
    else if (textVerticalAlign === 'bottom') {
        y = lineTop + lineHeight - token.height / 2;
    }

    !token.isLineHolder && needDrawBackground(tokenStyle) && drawBackground(
        hostEl,
        ctx,
        tokenStyle,
        textAlign === 'right'
            ? x - token.width
            : textAlign === 'center'
            ? x - token.width / 2
            : x,
        y - token.height / 2,
        token.width,
        token.height
    );

    var textPadding = token.textPadding;
    if (textPadding) {
        x = getTextXForPadding(x, textAlign, textPadding);
        y -= token.height / 2 - textPadding[2] - token.textHeight / 2;
    }

    setCtx(ctx, 'shadowBlur', retrieve3(tokenStyle.textShadowBlur, style.textShadowBlur, 0));
    setCtx(ctx, 'shadowColor', tokenStyle.textShadowColor || style.textShadowColor || 'transparent');
    setCtx(ctx, 'shadowOffsetX', retrieve3(tokenStyle.textShadowOffsetX, style.textShadowOffsetX, 0));
    setCtx(ctx, 'shadowOffsetY', retrieve3(tokenStyle.textShadowOffsetY, style.textShadowOffsetY, 0));

    setCtx(ctx, 'textAlign', textAlign);
    // Force baseline to be "middle". Otherwise, if using "top", the
    // text will offset downward a little bit in font "Microsoft YaHei".
    setCtx(ctx, 'textBaseline', 'middle');

    setCtx(ctx, 'font', token.font || DEFAULT_FONT);

    var textStroke = getStroke(tokenStyle.textStroke || style.textStroke, textStrokeWidth);
    var textFill = getFill(tokenStyle.textFill || style.textFill);
    var textStrokeWidth = retrieve2(tokenStyle.textStrokeWidth, style.textStrokeWidth);

    // Fill after stroke so the outline will not cover the main part.
    if (textStroke) {
        setCtx(ctx, 'lineWidth', textStrokeWidth);
        setCtx(ctx, 'strokeStyle', textStroke);
        ctx.strokeText(token.text, x, y);
    }
    if (textFill) {
        setCtx(ctx, 'fillStyle', textFill);
        ctx.fillText(token.text, x, y);
    }
}

function needDrawBackground(style) {
    return !!(
        style.textBackgroundColor
        || (style.textBorderWidth && style.textBorderColor)
    );
}

// style: {textBackgroundColor, textBorderWidth, textBorderColor, textBorderRadius, text}
// shape: {x, y, width, height}
function drawBackground(hostEl, ctx, style, x, y, width, height) {
    var textBackgroundColor = style.textBackgroundColor;
    var textBorderWidth = style.textBorderWidth;
    var textBorderColor = style.textBorderColor;
    var isPlainBg = isString(textBackgroundColor);

    setCtx(ctx, 'shadowBlur', style.textBoxShadowBlur || 0);
    setCtx(ctx, 'shadowColor', style.textBoxShadowColor || 'transparent');
    setCtx(ctx, 'shadowOffsetX', style.textBoxShadowOffsetX || 0);
    setCtx(ctx, 'shadowOffsetY', style.textBoxShadowOffsetY || 0);

    if (isPlainBg || (textBorderWidth && textBorderColor)) {
        ctx.beginPath();
        var textBorderRadius = style.textBorderRadius;
        if (!textBorderRadius) {
            ctx.rect(x, y, width, height);
        }
        else {
            buildPath(ctx, {
                x: x, y: y, width: width, height: height, r: textBorderRadius
            });
        }
        ctx.closePath();
    }

    if (isPlainBg) {
        setCtx(ctx, 'fillStyle', textBackgroundColor);

        if (style.fillOpacity != null) {
            var originalGlobalAlpha = ctx.globalAlpha;
            ctx.globalAlpha = style.fillOpacity * style.opacity;
            ctx.fill();
            ctx.globalAlpha = originalGlobalAlpha;
        }
        else {
            ctx.fill();
        }
    }
    else if (isObject(textBackgroundColor)) {
        var image = textBackgroundColor.image;

        image = createOrUpdateImage(
            image, null, hostEl, onBgImageLoaded, textBackgroundColor
        );
        if (image && isImageReady(image)) {
            ctx.drawImage(image, x, y, width, height);
        }
    }

    if (textBorderWidth && textBorderColor) {
        setCtx(ctx, 'lineWidth', textBorderWidth);
        setCtx(ctx, 'strokeStyle', textBorderColor);

        if (style.strokeOpacity != null) {
            var originalGlobalAlpha = ctx.globalAlpha;
            ctx.globalAlpha = style.strokeOpacity * style.opacity;
            ctx.stroke();
            ctx.globalAlpha = originalGlobalAlpha;
        }
        else {
            ctx.stroke();
        }
    }
}

function onBgImageLoaded(image, textBackgroundColor) {
    // Replace image, so that `contain/text.js#parseRichText`
    // will get correct result in next tick.
    textBackgroundColor.image = image;
}

function getBoxPosition(blockHeiht, style, rect) {
    var baseX = style.x || 0;
    var baseY = style.y || 0;
    var textAlign = style.textAlign;
    var textVerticalAlign = style.textVerticalAlign;

    // Text position represented by coord
    if (rect) {
        var textPosition = style.textPosition;
        if (textPosition instanceof Array) {
            // Percent
            baseX = rect.x + parsePercent(textPosition[0], rect.width);
            baseY = rect.y + parsePercent(textPosition[1], rect.height);
        }
        else {
            var res = adjustTextPositionOnRect(
                textPosition, rect, style.textDistance
            );
            baseX = res.x;
            baseY = res.y;
            // Default align and baseline when has textPosition
            textAlign = textAlign || res.textAlign;
            textVerticalAlign = textVerticalAlign || res.textVerticalAlign;
        }

        // textOffset is only support in RectText, otherwise
        // we have to adjust boundingRect for textOffset.
        var textOffset = style.textOffset;
        if (textOffset) {
            baseX += textOffset[0];
            baseY += textOffset[1];
        }
    }

    return {
        baseX: baseX,
        baseY: baseY,
        textAlign: textAlign,
        textVerticalAlign: textVerticalAlign
    };
}

function setCtx(ctx, prop, value) {
    ctx[prop] = fixShadow(ctx, prop, value);
    return ctx[prop];
}

/**
 * @param {string} [stroke] If specified, do not check style.textStroke.
 * @param {string} [lineWidth] If specified, do not check style.textStroke.
 * @param {number} style
 */
function getStroke(stroke, lineWidth) {
    return (stroke == null || lineWidth <= 0 || stroke === 'transparent' || stroke === 'none')
        ? null
        // TODO pattern and gradient?
        : (stroke.image || stroke.colorStops)
        ? '#000'
        : stroke;
}

function getFill(fill) {
    return (fill == null || fill === 'none')
        ? null
        // TODO pattern and gradient?
        : (fill.image || fill.colorStops)
        ? '#000'
        : fill;
}

function parsePercent(value, maxValue) {
    if (typeof value === 'string') {
        if (value.lastIndexOf('%') >= 0) {
            return parseFloat(value) / 100 * maxValue;
        }
        return parseFloat(value);
    }
    return value;
}

function getTextXForPadding(x, textAlign, textPadding) {
    return textAlign === 'right'
        ? (x - textPadding[1])
        : textAlign === 'center'
        ? (x + textPadding[3] / 2 - textPadding[1] / 2)
        : (x + textPadding[3]);
}

/**
 * @param {string} text
 * @param {module:zrender/Style} style
 * @return {boolean}
 */
function needDrawText(text, style) {
    return text != null
        && (text
            || style.textBackgroundColor
            || (style.textBorderWidth && style.textBorderColor)
            || style.textPadding
        );
}

/**
 * Mixin for drawing text in a element bounding rect
 * @module zrender/mixin/RectText
 */

var tmpRect$1 = new BoundingRect();

var RectText = function () {};

RectText.prototype = {

    constructor: RectText,

    /**
     * Draw text in a rect with specified position.
     * @param  {CanvasRenderingContext2D} ctx
     * @param  {Object} rect Displayable rect
     */
    drawRectText: function (ctx, rect) {
        var style = this.style;

        rect = style.textRect || rect;

        // Optimize, avoid normalize every time.
        this.__dirty && normalizeTextStyle(style, true);

        var text = style.text;

        // Convert to string
        text != null && (text += '');

        if (!needDrawText(text, style)) {
            return;
        }

        // FIXME
        // Do not provide prevEl to `textHelper.renderText` for ctx prop cache,
        // but use `ctx.save()` and `ctx.restore()`. Because the cache for rect
        // text propably break the cache for its host elements.
        ctx.save();

        // Transform rect to view space
        var transform = this.transform;
        if (!style.transformText) {
            if (transform) {
                tmpRect$1.copy(rect);
                tmpRect$1.applyTransform(transform);
                rect = tmpRect$1;
            }
        }
        else {
            this.setTransform(ctx);
        }

        // transformText and textRotation can not be used at the same time.
        renderText(this, ctx, text, style, rect, WILL_BE_RESTORED);

        ctx.restore();
    }
};

/**
 * 可绘制的图形基类
 * Base class of all displayable graphic objects
 * @module zrender/graphic/Displayable
 */


/**
 * @alias module:zrender/graphic/Displayable
 * @extends module:zrender/Element
 * @extends module:zrender/graphic/mixin/RectText
 */
function Displayable(opts) {

    opts = opts || {};

    Element.call(this, opts);

    // Extend properties
    for (var name in opts) {
        if (
            opts.hasOwnProperty(name)
                && name !== 'style'
        ) {
            this[name] = opts[name];
        }
    }

    /**
     * @type {module:zrender/graphic/Style}
     */
    this.style = new Style(opts.style, this);

    this._rect = null;
    // Shapes for cascade clipping.
    this.__clipPaths = [];

    // FIXME Stateful must be mixined after style is setted
    // Stateful.call(this, opts);
}

Displayable.prototype = {

    constructor: Displayable,

    type: 'displayable',

    /**
     * Displayable 是否为脏，Painter 中会根据该标记判断是否需要是否需要重新绘制
     * Dirty flag. From which painter will determine if this displayable object needs brush
     * @name module:zrender/graphic/Displayable#__dirty
     * @type {boolean}
     */
    __dirty: true,

    /**
     * 图形是否可见，为true时不绘制图形，但是仍能触发鼠标事件
     * If ignore drawing of the displayable object. Mouse event will still be triggered
     * @name module:/zrender/graphic/Displayable#invisible
     * @type {boolean}
     * @default false
     */
    invisible: false,

    /**
     * @name module:/zrender/graphic/Displayable#z
     * @type {number}
     * @default 0
     */
    z: 0,

    /**
     * @name module:/zrender/graphic/Displayable#z
     * @type {number}
     * @default 0
     */
    z2: 0,

    /**
     * z层level，决定绘画在哪层canvas中
     * @name module:/zrender/graphic/Displayable#zlevel
     * @type {number}
     * @default 0
     */
    zlevel: 0,

    /**
     * 是否可拖拽
     * @name module:/zrender/graphic/Displayable#draggable
     * @type {boolean}
     * @default false
     */
    draggable: false,

    /**
     * 是否正在拖拽
     * @name module:/zrender/graphic/Displayable#draggable
     * @type {boolean}
     * @default false
     */
    dragging: false,

    /**
     * 是否相应鼠标事件
     * @name module:/zrender/graphic/Displayable#silent
     * @type {boolean}
     * @default false
     */
    silent: false,

    /**
     * If enable culling
     * @type {boolean}
     * @default false
     */
    culling: false,

    /**
     * Mouse cursor when hovered
     * @name module:/zrender/graphic/Displayable#cursor
     * @type {string}
     */
    cursor: 'pointer',

    /**
     * If hover area is bounding rect
     * @name module:/zrender/graphic/Displayable#rectHover
     * @type {string}
     */
    rectHover: false,

    /**
     * Render the element progressively when the value >= 0,
     * usefull for large data.
     * @type {boolean}
     */
    progressive: false,

    /**
     * @type {boolean}
     */
    incremental: false,
    /**
     * Scale ratio for global scale.
     * @type {boolean}
     */
    globalScaleRatio: 1,

    beforeBrush: function (ctx) {},

    afterBrush: function (ctx) {},

    /**
     * 图形绘制方法
     * @param {CanvasRenderingContext2D} ctx
     */
    // Interface
    brush: function (ctx, prevEl) {},

    /**
     * 获取最小包围盒
     * @return {module:zrender/core/BoundingRect}
     */
    // Interface
    getBoundingRect: function () {},

    /**
     * 判断坐标 x, y 是否在图形上
     * If displayable element contain coord x, y
     * @param  {number} x
     * @param  {number} y
     * @return {boolean}
     */
    contain: function (x, y) {
        return this.rectContain(x, y);
    },

    /**
     * @param  {Function} cb
     * @param  {}   context
     */
    traverse: function (cb, context) {
        cb.call(context, this);
    },

    /**
     * 判断坐标 x, y 是否在图形的包围盒上
     * If bounding rect of element contain coord x, y
     * @param  {number} x
     * @param  {number} y
     * @return {boolean}
     */
    rectContain: function (x, y) {
        var coord = this.transformCoordToLocal(x, y);
        var rect = this.getBoundingRect();
        return rect.contain(coord[0], coord[1]);
    },

    /**
     * 标记图形元素为脏，并且在下一帧重绘
     * Mark displayable element dirty and refresh next frame
     */
    dirty: function () {
        this.__dirty = this.__dirtyText = true;

        this._rect = null;

        this.__zr && this.__zr.refresh();
    },

    /**
     * 图形是否会触发事件
     * If displayable object binded any event
     * @return {boolean}
     */
    // TODO, 通过 bind 绑定的事件
    // isSilent: function () {
    //     return !(
    //         this.hoverable || this.draggable
    //         || this.onmousemove || this.onmouseover || this.onmouseout
    //         || this.onmousedown || this.onmouseup || this.onclick
    //         || this.ondragenter || this.ondragover || this.ondragleave
    //         || this.ondrop
    //     );
    // },
    /**
     * Alias for animate('style')
     * @param {boolean} loop
     */
    animateStyle: function (loop) {
        return this.animate('style', loop);
    },

    attrKV: function (key, value) {
        if (key !== 'style') {
            Element.prototype.attrKV.call(this, key, value);
        }
        else {
            this.style.set(value);
        }
    },

    /**
     * @param {Object|string} key
     * @param {*} value
     */
    setStyle: function (key, value) {
        this.style.set(key, value);
        this.dirty(false);
        return this;
    },

    /**
     * Use given style object
     * @param  {Object} obj
     */
    useStyle: function (obj) {
        this.style = new Style(obj, this);
        this.dirty(false);
        return this;
    }
};

inherits(Displayable, Element);

mixin(Displayable, RectText);

/**
 * @alias zrender/graphic/Image
 * @extends module:zrender/graphic/Displayable
 * @constructor
 * @param {Object} opts
 */
function ZImage(opts) {
    Displayable.call(this, opts);
}

ZImage.prototype = {

    constructor: ZImage,

    type: 'image',

    brush: function (ctx, prevEl) {
        var style = this.style;
        var src = style.image;

        // Must bind each time
        style.bind(ctx, this, prevEl);

        var image = this._image = createOrUpdateImage(
            src,
            this._image,
            this,
            this.onload
        );

        if (!image || !isImageReady(image)) {
            return;
        }

        // 图片已经加载完成
        // if (image.nodeName.toUpperCase() == 'IMG') {
        //     if (!image.complete) {
        //         return;
        //     }
        // }
        // Else is canvas

        var x = style.x || 0;
        var y = style.y || 0;
        var width = style.width;
        var height = style.height;
        var aspect = image.width / image.height;
        if (width == null && height != null) {
            // Keep image/height ratio
            width = height * aspect;
        }
        else if (height == null && width != null) {
            height = width / aspect;
        }
        else if (width == null && height == null) {
            width = image.width;
            height = image.height;
        }

        // 设置transform
        this.setTransform(ctx);

        if (style.sWidth && style.sHeight) {
            var sx = style.sx || 0;
            var sy = style.sy || 0;
            ctx.drawImage(
                image,
                sx, sy, style.sWidth, style.sHeight,
                x, y, width, height
            );
        }
        else if (style.sx && style.sy) {
            var sx = style.sx;
            var sy = style.sy;
            var sWidth = width - sx;
            var sHeight = height - sy;
            ctx.drawImage(
                image,
                sx, sy, sWidth, sHeight,
                x, y, width, height
            );
        }
        else {
            ctx.drawImage(image, x, y, width, height);
        }

        // Draw rect text
        if (style.text != null) {
            // Only restore transform when needs draw text.
            this.restoreTransform(ctx);
            this.drawRectText(ctx, this.getBoundingRect());
        }
    },

    getBoundingRect: function () {
        var style = this.style;
        if (!this._rect) {
            this._rect = new BoundingRect(
                style.x || 0, style.y || 0, style.width || 0, style.height || 0
            );
        }
        return this._rect;
    }
};

inherits(ZImage, Displayable);

var HOVER_LAYER_ZLEVEL = 1e5;
var CANVAS_ZLEVEL = 314159;

var EL_AFTER_INCREMENTAL_INC = 0.01;
var INCREMENTAL_INC = 0.001;

function parseInt10(val) {
    return parseInt(val, 10);
}

function isLayerValid(layer) {
    if (!layer) {
        return false;
    }

    if (layer.__builtin__) {
        return true;
    }

    if (typeof (layer.resize) !== 'function'
        || typeof (layer.refresh) !== 'function'
    ) {
        return false;
    }

    return true;
}

var tmpRect = new BoundingRect(0, 0, 0, 0);
var viewRect = new BoundingRect(0, 0, 0, 0);
function isDisplayableCulled(el, width, height) {
    tmpRect.copy(el.getBoundingRect());
    if (el.transform) {
        tmpRect.applyTransform(el.transform);
    }
    viewRect.width = width;
    viewRect.height = height;
    return !tmpRect.intersect(viewRect);
}

function isClipPathChanged(clipPaths, prevClipPaths) {
    if (clipPaths === prevClipPaths) { // Can both be null or undefined
        return false;
    }

    if (!clipPaths || !prevClipPaths || (clipPaths.length !== prevClipPaths.length)) {
        return true;
    }
    for (var i = 0; i < clipPaths.length; i++) {
        if (clipPaths[i] !== prevClipPaths[i]) {
            return true;
        }
    }
}

function doClip(clipPaths, ctx) {
    for (var i = 0; i < clipPaths.length; i++) {
        var clipPath = clipPaths[i];

        clipPath.setTransform(ctx);
        ctx.beginPath();
        clipPath.buildPath(ctx, clipPath.shape);
        ctx.clip();
        // Transform back
        clipPath.restoreTransform(ctx);
    }
}

function createRoot(width, height) {
    var domRoot = document.createElement('div');

    // domRoot.onselectstart = returnFalse; // 避免页面选中的尴尬
    domRoot.style.cssText = [
        'position:relative',
        'overflow:hidden',
        'width:' + width + 'px',
        'height:' + height + 'px',
        'padding:0',
        'margin:0',
        'border-width:0'
    ].join(';') + ';';

    return domRoot;
}


/**
 * @alias module:zrender/Painter
 * @constructor
 * @param {HTMLElement} root 绘图容器
 * @param {module:zrender/Storage} storage
 * @param {Object} opts
 */
var Painter = function (root, storage, opts) {

    this.type = 'canvas';

    // In node environment using node-canvas
    var singleCanvas = !root.nodeName // In node ?
        || root.nodeName.toUpperCase() === 'CANVAS';

    this._opts = opts = extend({}, opts || {});

    /**
     * @type {number}
     */
    this.dpr = opts.devicePixelRatio || devicePixelRatio;
    /**
     * @type {boolean}
     * @private
     */
    this._singleCanvas = singleCanvas;
    /**
     * 绘图容器
     * @type {HTMLElement}
     */
    this.root = root;

    var rootStyle = root.style;

    if (rootStyle) {
        rootStyle['-webkit-tap-highlight-color'] = 'transparent';
        rootStyle['-webkit-user-select'] =
        rootStyle['user-select'] =
        rootStyle['-webkit-touch-callout'] = 'none';

        root.innerHTML = '';
    }

    /**
     * @type {module:zrender/Storage}
     */
    this.storage = storage;

    /**
     * @type {Array.<number>}
     * @private
     */
    var zlevelList = this._zlevelList = [];

    /**
     * @type {Object.<string, module:zrender/Layer>}
     * @private
     */
    var layers = this._layers = {};

    /**
     * @type {Object.<string, Object>}
     * @private
     */
    this._layerConfig = {};

    /**
     * zrender will do compositing when root is a canvas and have multiple zlevels.
     */
    this._needsManuallyCompositing = false;

    if (!singleCanvas) {
        this._width = this._getSize(0);
        this._height = this._getSize(1);

        var domRoot = this._domRoot = createRoot(
            this._width, this._height
        );
        root.appendChild(domRoot);
    }
    else {
        var width = root.width;
        var height = root.height;

        if (opts.width != null) {
            width = opts.width;
        }
        if (opts.height != null) {
            height = opts.height;
        }
        this.dpr = opts.devicePixelRatio || 1;

        // Use canvas width and height directly
        root.width = width * this.dpr;
        root.height = height * this.dpr;

        this._width = width;
        this._height = height;

        // Create layer if only one given canvas
        // Device can be specified to create a high dpi image.
        var mainLayer = new Layer(root, this, this.dpr);
        mainLayer.__builtin__ = true;
        mainLayer.initContext();
        // FIXME Use canvas width and height
        // mainLayer.resize(width, height);
        layers[CANVAS_ZLEVEL] = mainLayer;
        mainLayer.zlevel = CANVAS_ZLEVEL;
        // Not use common zlevel.
        zlevelList.push(CANVAS_ZLEVEL);

        this._domRoot = root;
    }

    /**
     * @type {module:zrender/Layer}
     * @private
     */
    this._hoverlayer = null;

    this._hoverElements = [];
};

Painter.prototype = {

    constructor: Painter,

    getType: function () {
        return 'canvas';
    },

    /**
     * If painter use a single canvas
     * @return {boolean}
     */
    isSingleCanvas: function () {
        return this._singleCanvas;
    },
    /**
     * @return {HTMLDivElement}
     */
    getViewportRoot: function () {
        return this._domRoot;
    },

    getViewportRootOffset: function () {
        var viewportRoot = this.getViewportRoot();
        if (viewportRoot) {
            return {
                offsetLeft: viewportRoot.offsetLeft || 0,
                offsetTop: viewportRoot.offsetTop || 0
            };
        }
    },

    /**
     * 刷新
     * @param {boolean} [paintAll=false] 强制绘制所有displayable
     */
    refresh: function (paintAll) {

        var list = this.storage.getDisplayList(true);

        var zlevelList = this._zlevelList;

        this._redrawId = Math.random();

        this._paintList(list, paintAll, this._redrawId);

        // Paint custum layers
        for (var i = 0; i < zlevelList.length; i++) {
            var z = zlevelList[i];
            var layer = this._layers[z];
            if (!layer.__builtin__ && layer.refresh) {
                var clearColor = i === 0 ? this._backgroundColor : null;
                layer.refresh(clearColor);
            }
        }

        this.refreshHover();

        return this;
    },

    addHover: function (el, hoverStyle) {
        if (el.__hoverMir) {
            return;
        }
        var elMirror = new el.constructor({
            style: el.style,
            shape: el.shape,
            z: el.z,
            z2: el.z2,
            silent: el.silent
        });
        elMirror.__from = el;
        el.__hoverMir = elMirror;
        hoverStyle && elMirror.setStyle(hoverStyle);
        this._hoverElements.push(elMirror);

        return elMirror;
    },

    removeHover: function (el) {
        var elMirror = el.__hoverMir;
        var hoverElements = this._hoverElements;
        var idx = indexOf(hoverElements, elMirror);
        if (idx >= 0) {
            hoverElements.splice(idx, 1);
        }
        el.__hoverMir = null;
    },

    clearHover: function (el) {
        var hoverElements = this._hoverElements;
        for (var i = 0; i < hoverElements.length; i++) {
            var from = hoverElements[i].__from;
            if (from) {
                from.__hoverMir = null;
            }
        }
        hoverElements.length = 0;
    },

    refreshHover: function () {
        var hoverElements = this._hoverElements;
        var len = hoverElements.length;
        var hoverLayer = this._hoverlayer;
        hoverLayer && hoverLayer.clear();

        if (!len) {
            return;
        }
        sort(hoverElements, this.storage.displayableSortFunc);

        // Use a extream large zlevel
        // FIXME?
        if (!hoverLayer) {
            hoverLayer = this._hoverlayer = this.getLayer(HOVER_LAYER_ZLEVEL);
        }

        var scope = {};
        hoverLayer.ctx.save();
        for (var i = 0; i < len;) {
            var el = hoverElements[i];
            var originalEl = el.__from;
            // Original el is removed
            // PENDING
            if (!(originalEl && originalEl.__zr)) {
                hoverElements.splice(i, 1);
                originalEl.__hoverMir = null;
                len--;
                continue;
            }
            i++;

            // Use transform
            // FIXME style and shape ?
            if (!originalEl.invisible) {
                el.transform = originalEl.transform;
                el.invTransform = originalEl.invTransform;
                el.__clipPaths = originalEl.__clipPaths;
                // el.
                this._doPaintEl(el, hoverLayer, true, scope);
            }
        }

        hoverLayer.ctx.restore();
    },

    getHoverLayer: function () {
        return this.getLayer(HOVER_LAYER_ZLEVEL);
    },

    _paintList: function (list, paintAll, redrawId) {
        if (this._redrawId !== redrawId) {
            return;
        }

        paintAll = paintAll || false;

        this._updateLayerStatus(list);

        var finished = this._doPaintList(list, paintAll);

        if (this._needsManuallyCompositing) {
            this._compositeManually();
        }

        if (!finished) {
            var self = this;
            requestAnimationFrame(function () {
                self._paintList(list, paintAll, redrawId);
            });
        }
    },

    _compositeManually: function () {
        var ctx = this.getLayer(CANVAS_ZLEVEL).ctx;
        var width = this._domRoot.width;
        var height = this._domRoot.height;
        ctx.clearRect(0, 0, width, height);
        // PENDING, If only builtin layer?
        this.eachBuiltinLayer(function (layer) {
            if (layer.virtual) {
                ctx.drawImage(layer.dom, 0, 0, width, height);
            }
        });
    },

    _doPaintList: function (list, paintAll) {
        var layerList = [];
        for (var zi = 0; zi < this._zlevelList.length; zi++) {
            var zlevel = this._zlevelList[zi];
            var layer = this._layers[zlevel];
            if (layer.__builtin__
                && layer !== this._hoverlayer
                && (layer.__dirty || paintAll)
            ) {
                layerList.push(layer);
            }
        }

        var finished = true;

        for (var k = 0; k < layerList.length; k++) {
            var layer = layerList[k];
            var ctx = layer.ctx;
            var scope = {};
            ctx.save();

            var start = paintAll ? layer.__startIndex : layer.__drawIndex;

            var useTimer = !paintAll && layer.incremental && Date.now;
            var startTime = useTimer && Date.now();

            var clearColor = layer.zlevel === this._zlevelList[0]
                ? this._backgroundColor : null;
            // All elements in this layer are cleared.
            if (layer.__startIndex === layer.__endIndex) {
                layer.clear(false, clearColor);
            }
            else if (start === layer.__startIndex) {
                var firstEl = list[start];
                if (!firstEl.incremental || !firstEl.notClear || paintAll) {
                    layer.clear(false, clearColor);
                }
            }
            if (start === -1) {
                console.error('For some unknown reason. drawIndex is -1');
                start = layer.__startIndex;
            }
            for (var i = start; i < layer.__endIndex; i++) {
                var el = list[i];
                this._doPaintEl(el, layer, paintAll, scope);
                el.__dirty = el.__dirtyText = false;

                if (useTimer) {
                    // Date.now can be executed in 13,025,305 ops/second.
                    var dTime = Date.now() - startTime;
                    // Give 15 millisecond to draw.
                    // The rest elements will be drawn in the next frame.
                    if (dTime > 15) {
                        break;
                    }
                }
            }

            layer.__drawIndex = i;

            if (layer.__drawIndex < layer.__endIndex) {
                finished = false;
            }

            if (scope.prevElClipPaths) {
                // Needs restore the state. If last drawn element is in the clipping area.
                ctx.restore();
            }

            ctx.restore();
        }

        if (env$1.wxa) {
            // Flush for weixin application
            each(this._layers, function (layer) {
                if (layer && layer.ctx && layer.ctx.draw) {
                    layer.ctx.draw();
                }
            });
        }

        return finished;
    },

    _doPaintEl: function (el, currentLayer, forcePaint, scope) {
        var ctx = currentLayer.ctx;
        var m = el.transform;
        if (
            (currentLayer.__dirty || forcePaint)
            // Ignore invisible element
            && !el.invisible
            // Ignore transparent element
            && el.style.opacity !== 0
            // Ignore scale 0 element, in some environment like node-canvas
            // Draw a scale 0 element can cause all following draw wrong
            // And setTransform with scale 0 will cause set back transform failed.
            && !(m && !m[0] && !m[3])
            // Ignore culled element
            && !(el.culling && isDisplayableCulled(el, this._width, this._height))
        ) {

            var clipPaths = el.__clipPaths;

            // Optimize when clipping on group with several elements
            if (!scope.prevElClipPaths
                || isClipPathChanged(clipPaths, scope.prevElClipPaths)
            ) {
                // If has previous clipping state, restore from it
                if (scope.prevElClipPaths) {
                    currentLayer.ctx.restore();
                    scope.prevElClipPaths = null;

                    // Reset prevEl since context has been restored
                    scope.prevEl = null;
                }
                // New clipping state
                if (clipPaths) {
                    ctx.save();
                    doClip(clipPaths, ctx);
                    scope.prevElClipPaths = clipPaths;
                }
            }
            el.beforeBrush && el.beforeBrush(ctx);

            el.brush(ctx, scope.prevEl || null);
            scope.prevEl = el;

            el.afterBrush && el.afterBrush(ctx);
        }
    },

    /**
     * 获取 zlevel 所在层，如果不存在则会创建一个新的层
     * @param {number} zlevel
     * @param {boolean} virtual Virtual layer will not be inserted into dom.
     * @return {module:zrender/Layer}
     */
    getLayer: function (zlevel, virtual) {
        if (this._singleCanvas && !this._needsManuallyCompositing) {
            zlevel = CANVAS_ZLEVEL;
        }
        var layer = this._layers[zlevel];
        if (!layer) {
            // Create a new layer
            layer = new Layer('zr_' + zlevel, this, this.dpr);
            layer.zlevel = zlevel;
            layer.__builtin__ = true;

            if (this._layerConfig[zlevel]) {
                merge(layer, this._layerConfig[zlevel], true);
            }

            if (virtual) {
                layer.virtual = virtual;
            }

            this.insertLayer(zlevel, layer);

            // Context is created after dom inserted to document
            // Or excanvas will get 0px clientWidth and clientHeight
            layer.initContext();
        }

        return layer;
    },

    insertLayer: function (zlevel, layer) {

        var layersMap = this._layers;
        var zlevelList = this._zlevelList;
        var len = zlevelList.length;
        var prevLayer = null;
        var i = -1;
        var domRoot = this._domRoot;

        if (layersMap[zlevel]) {
            zrLog('ZLevel ' + zlevel + ' has been used already');
            return;
        }
        // Check if is a valid layer
        if (!isLayerValid(layer)) {
            zrLog('Layer of zlevel ' + zlevel + ' is not valid');
            return;
        }

        if (len > 0 && zlevel > zlevelList[0]) {
            for (i = 0; i < len - 1; i++) {
                if (
                    zlevelList[i] < zlevel
                    && zlevelList[i + 1] > zlevel
                ) {
                    break;
                }
            }
            prevLayer = layersMap[zlevelList[i]];
        }
        zlevelList.splice(i + 1, 0, zlevel);

        layersMap[zlevel] = layer;

        // Vitual layer will not directly show on the screen.
        // (It can be a WebGL layer and assigned to a ZImage element)
        // But it still under management of zrender.
        if (!layer.virtual) {
            if (prevLayer) {
                var prevDom = prevLayer.dom;
                if (prevDom.nextSibling) {
                    domRoot.insertBefore(
                        layer.dom,
                        prevDom.nextSibling
                    );
                }
                else {
                    domRoot.appendChild(layer.dom);
                }
            }
            else {
                if (domRoot.firstChild) {
                    domRoot.insertBefore(layer.dom, domRoot.firstChild);
                }
                else {
                    domRoot.appendChild(layer.dom);
                }
            }
        }
    },

    // Iterate each layer
    eachLayer: function (cb, context) {
        var zlevelList = this._zlevelList;
        var z;
        var i;
        for (i = 0; i < zlevelList.length; i++) {
            z = zlevelList[i];
            cb.call(context, this._layers[z], z);
        }
    },

    // Iterate each buildin layer
    eachBuiltinLayer: function (cb, context) {
        var zlevelList = this._zlevelList;
        var layer;
        var z;
        var i;
        for (i = 0; i < zlevelList.length; i++) {
            z = zlevelList[i];
            layer = this._layers[z];
            if (layer.__builtin__) {
                cb.call(context, layer, z);
            }
        }
    },

    // Iterate each other layer except buildin layer
    eachOtherLayer: function (cb, context) {
        var zlevelList = this._zlevelList;
        var layer;
        var z;
        var i;
        for (i = 0; i < zlevelList.length; i++) {
            z = zlevelList[i];
            layer = this._layers[z];
            if (!layer.__builtin__) {
                cb.call(context, layer, z);
            }
        }
    },

    /**
     * 获取所有已创建的层
     * @param {Array.<module:zrender/Layer>} [prevLayer]
     */
    getLayers: function () {
        return this._layers;
    },

    _updateLayerStatus: function (list) {

        this.eachBuiltinLayer(function (layer, z) {
            layer.__dirty = layer.__used = false;
        });

        function updatePrevLayer(idx) {
            if (prevLayer) {
                if (prevLayer.__endIndex !== idx) {
                    prevLayer.__dirty = true;
                }
                prevLayer.__endIndex = idx;
            }
        }

        if (this._singleCanvas) {
            for (var i = 1; i < list.length; i++) {
                var el = list[i];
                if (el.zlevel !== list[i - 1].zlevel || el.incremental) {
                    this._needsManuallyCompositing = true;
                    break;
                }
            }
        }

        var prevLayer = null;
        var incrementalLayerCount = 0;
        for (var i = 0; i < list.length; i++) {
            var el = list[i];
            var zlevel = el.zlevel;
            var layer;
            // PENDING If change one incremental element style ?
            // TODO Where there are non-incremental elements between incremental elements.
            if (el.incremental) {
                layer = this.getLayer(zlevel + INCREMENTAL_INC, this._needsManuallyCompositing);
                layer.incremental = true;
                incrementalLayerCount = 1;
            }
            else {
                layer = this.getLayer(zlevel + (incrementalLayerCount > 0 ? EL_AFTER_INCREMENTAL_INC : 0), this._needsManuallyCompositing);
            }

            if (!layer.__builtin__) {
                zrLog('ZLevel ' + zlevel + ' has been used by unkown layer ' + layer.id);
            }

            if (layer !== prevLayer) {
                layer.__used = true;
                if (layer.__startIndex !== i) {
                    layer.__dirty = true;
                }
                layer.__startIndex = i;
                if (!layer.incremental) {
                    layer.__drawIndex = i;
                }
                else {
                    // Mark layer draw index needs to update.
                    layer.__drawIndex = -1;
                }
                updatePrevLayer(i);
                prevLayer = layer;
            }
            if (el.__dirty) {
                layer.__dirty = true;
                if (layer.incremental && layer.__drawIndex < 0) {
                    // Start draw from the first dirty element.
                    layer.__drawIndex = i;
                }
            }
        }

        updatePrevLayer(i);

        this.eachBuiltinLayer(function (layer, z) {
            // Used in last frame but not in this frame. Needs clear
            if (!layer.__used && layer.getElementCount() > 0) {
                layer.__dirty = true;
                layer.__startIndex = layer.__endIndex = layer.__drawIndex = 0;
            }
            // For incremental layer. In case start index changed and no elements are dirty.
            if (layer.__dirty && layer.__drawIndex < 0) {
                layer.__drawIndex = layer.__startIndex;
            }
        });
    },

    /**
     * 清除hover层外所有内容
     */
    clear: function () {
        this.eachBuiltinLayer(this._clearLayer);
        return this;
    },

    _clearLayer: function (layer) {
        layer.clear();
    },

    setBackgroundColor: function (backgroundColor) {
        this._backgroundColor = backgroundColor;
    },

    /**
     * 修改指定zlevel的绘制参数
     *
     * @param {string} zlevel
     * @param {Object} config 配置对象
     * @param {string} [config.clearColor=0] 每次清空画布的颜色
     * @param {string} [config.motionBlur=false] 是否开启动态模糊
     * @param {number} [config.lastFrameAlpha=0.7]
     *                 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
     */
    configLayer: function (zlevel, config) {
        if (config) {
            var layerConfig = this._layerConfig;
            if (!layerConfig[zlevel]) {
                layerConfig[zlevel] = config;
            }
            else {
                merge(layerConfig[zlevel], config, true);
            }

            for (var i = 0; i < this._zlevelList.length; i++) {
                var _zlevel = this._zlevelList[i];
                if (_zlevel === zlevel || _zlevel === zlevel + EL_AFTER_INCREMENTAL_INC) {
                    var layer = this._layers[_zlevel];
                    merge(layer, layerConfig[zlevel], true);
                }
            }
        }
    },

    /**
     * 删除指定层
     * @param {number} zlevel 层所在的zlevel
     */
    delLayer: function (zlevel) {
        var layers = this._layers;
        var zlevelList = this._zlevelList;
        var layer = layers[zlevel];
        if (!layer) {
            return;
        }
        layer.dom.parentNode.removeChild(layer.dom);
        delete layers[zlevel];

        zlevelList.splice(indexOf(zlevelList, zlevel), 1);
    },

    /**
     * 区域大小变化后重绘
     */
    resize: function (width, height) {
        if (!this._domRoot.style) { // Maybe in node or worker
            if (width == null || height == null) {
                return;
            }
            this._width = width;
            this._height = height;

            this.getLayer(CANVAS_ZLEVEL).resize(width, height);
        }
        else {
            var domRoot = this._domRoot;
            // FIXME Why ?
            domRoot.style.display = 'none';

            // Save input w/h
            var opts = this._opts;
            width != null && (opts.width = width);
            height != null && (opts.height = height);

            width = this._getSize(0);
            height = this._getSize(1);

            domRoot.style.display = '';

            // 优化没有实际改变的resize
            if (this._width !== width || height !== this._height) {
                domRoot.style.width = width + 'px';
                domRoot.style.height = height + 'px';

                for (var id in this._layers) {
                    if (this._layers.hasOwnProperty(id)) {
                        this._layers[id].resize(width, height);
                    }
                }
                each(this._progressiveLayers, function (layer) {
                    layer.resize(width, height);
                });

                this.refresh(true);
            }

            this._width = width;
            this._height = height;

        }
        return this;
    },

    /**
     * 清除单独的一个层
     * @param {number} zlevel
     */
    clearLayer: function (zlevel) {
        var layer = this._layers[zlevel];
        if (layer) {
            layer.clear();
        }
    },

    /**
     * 释放
     */
    dispose: function () {
        this.root.innerHTML = '';

        this.root =
        this.storage =

        this._domRoot =
        this._layers = null;
    },

    /**
     * Get canvas which has all thing rendered
     * @param {Object} opts
     * @param {string} [opts.backgroundColor]
     * @param {number} [opts.pixelRatio]
     */
    getRenderedCanvas: function (opts) {
        opts = opts || {};
        if (this._singleCanvas && !this._compositeManually) {
            return this._layers[CANVAS_ZLEVEL].dom;
        }

        var imageLayer = new Layer('image', this, opts.pixelRatio || this.dpr);
        imageLayer.initContext();
        imageLayer.clear(false, opts.backgroundColor || this._backgroundColor);

        if (opts.pixelRatio <= this.dpr) {
            this.refresh();

            var width = imageLayer.dom.width;
            var height = imageLayer.dom.height;
            var ctx = imageLayer.ctx;
            this.eachLayer(function (layer) {
                if (layer.__builtin__) {
                    ctx.drawImage(layer.dom, 0, 0, width, height);
                }
                else if (layer.renderToCanvas) {
                    imageLayer.ctx.save();
                    layer.renderToCanvas(imageLayer.ctx);
                    imageLayer.ctx.restore();
                }
            });
        }
        else {
            // PENDING, echarts-gl and incremental rendering.
            var scope = {};
            var displayList = this.storage.getDisplayList(true);
            for (var i = 0; i < displayList.length; i++) {
                var el = displayList[i];
                this._doPaintEl(el, imageLayer, true, scope);
            }
        }

        return imageLayer.dom;
    },
    /**
     * 获取绘图区域宽度
     */
    getWidth: function () {
        return this._width;
    },

    /**
     * 获取绘图区域高度
     */
    getHeight: function () {
        return this._height;
    },

    _getSize: function (whIdx) {
        var opts = this._opts;
        var wh = ['width', 'height'][whIdx];
        var cwh = ['clientWidth', 'clientHeight'][whIdx];
        var plt = ['paddingLeft', 'paddingTop'][whIdx];
        var prb = ['paddingRight', 'paddingBottom'][whIdx];

        if (opts[wh] != null && opts[wh] !== 'auto') {
            return parseFloat(opts[wh]);
        }

        var root = this.root;
        // IE8 does not support getComputedStyle, but it use VML.
        var stl = document.defaultView.getComputedStyle(root);

        return (
            (root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh]))
            - (parseInt10(stl[plt]) || 0)
            - (parseInt10(stl[prb]) || 0)
        ) | 0;
    },

    pathToImage: function (path, dpr) {
        dpr = dpr || this.dpr;

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var rect = path.getBoundingRect();
        var style = path.style;
        var shadowBlurSize = style.shadowBlur * dpr;
        var shadowOffsetX = style.shadowOffsetX * dpr;
        var shadowOffsetY = style.shadowOffsetY * dpr;
        var lineWidth = style.hasStroke() ? style.lineWidth : 0;

        var leftMargin = Math.max(lineWidth / 2, -shadowOffsetX + shadowBlurSize);
        var rightMargin = Math.max(lineWidth / 2, shadowOffsetX + shadowBlurSize);
        var topMargin = Math.max(lineWidth / 2, -shadowOffsetY + shadowBlurSize);
        var bottomMargin = Math.max(lineWidth / 2, shadowOffsetY + shadowBlurSize);
        var width = rect.width + leftMargin + rightMargin;
        var height = rect.height + topMargin + bottomMargin;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);
        ctx.dpr = dpr;

        var pathTransform = {
            position: path.position,
            rotation: path.rotation,
            scale: path.scale
        };
        path.position = [leftMargin - rect.x, topMargin - rect.y];
        path.rotation = 0;
        path.scale = [1, 1];
        path.updateTransform();
        if (path) {
            path.brush(ctx);
        }

        var ImageShape = ZImage;
        var imgShape = new ImageShape({
            style: {
                x: 0,
                y: 0,
                image: canvas
            }
        });

        if (pathTransform.position != null) {
            imgShape.position = path.position = pathTransform.position;
        }

        if (pathTransform.rotation != null) {
            imgShape.rotation = path.rotation = pathTransform.rotation;
        }

        if (pathTransform.scale != null) {
            imgShape.scale = path.scale = pathTransform.scale;
        }

        return imgShape;
    }
};

/**
 * 动画主类, 调度和管理所有动画控制器
 *
 * @module zrender/animation/Animation
 * @author pissang(https://github.com/pissang)
 */
// TODO Additive animation
// http://iosoteric.com/additive-animations-animatewithduration-in-ios-8/
// https://developer.apple.com/videos/wwdc2014/#236

/**
 * @typedef {Object} IZRenderStage
 * @property {Function} update
 */

/**
 * @alias module:zrender/animation/Animation
 * @constructor
 * @param {Object} [options]
 * @param {Function} [options.onframe]
 * @param {IZRenderStage} [options.stage]
 * @example
 *     var animation = new Animation();
 *     var obj = {
 *         x: 100,
 *         y: 100
 *     };
 *     animation.animate(node.position)
 *         .when(1000, {
 *             x: 500,
 *             y: 500
 *         })
 *         .when(2000, {
 *             x: 100,
 *             y: 100
 *         })
 *         .start('spline');
 */
var Animation = function (options) {

    options = options || {};

    this.stage = options.stage || {};

    this.onframe = options.onframe || function () {};

    // private properties
    this._clips = [];

    this._running = false;

    this._time;

    this._pausedTime;

    this._pauseStart;

    this._paused = false;

    Eventful.call(this);
};

Animation.prototype = {

    constructor: Animation,
    /**
     * 添加 clip
     * @param {module:zrender/animation/Clip} clip
     */
    addClip: function (clip) {
        this._clips.push(clip);
    },
    /**
     * 添加 animator
     * @param {module:zrender/animation/Animator} animator
     */
    addAnimator: function (animator) {
        animator.animation = this;
        var clips = animator.getClips();
        for (var i = 0; i < clips.length; i++) {
            this.addClip(clips[i]);
        }
    },
    /**
     * 删除动画片段
     * @param {module:zrender/animation/Clip} clip
     */
    removeClip: function (clip) {
        var idx = indexOf(this._clips, clip);
        if (idx >= 0) {
            this._clips.splice(idx, 1);
        }
    },

    /**
     * 删除动画片段
     * @param {module:zrender/animation/Animator} animator
     */
    removeAnimator: function (animator) {
        var clips = animator.getClips();
        for (var i = 0; i < clips.length; i++) {
            this.removeClip(clips[i]);
        }
        animator.animation = null;
    },

    _update: function () {
        var time = new Date().getTime() - this._pausedTime;
        var delta = time - this._time;
        var clips = this._clips;
        var len = clips.length;

        var deferredEvents = [];
        var deferredClips = [];
        for (var i = 0; i < len; i++) {
            var clip = clips[i];
            var e = clip.step(time, delta);
            // Throw out the events need to be called after
            // stage.update, like destroy
            if (e) {
                deferredEvents.push(e);
                deferredClips.push(clip);
            }
        }

        // Remove the finished clip
        for (var i = 0; i < len;) {
            if (clips[i]._needsRemove) {
                clips[i] = clips[len - 1];
                clips.pop();
                len--;
            }
            else {
                i++;
            }
        }

        len = deferredEvents.length;
        for (var i = 0; i < len; i++) {
            deferredClips[i].fire(deferredEvents[i]);
        }

        this._time = time;

        this.onframe(delta);

        // 'frame' should be triggered before stage, because upper application
        // depends on the sequence (e.g., echarts-stream and finish
        // event judge)
        this.trigger('frame', delta);

        if (this.stage.update) {
            this.stage.update();
        }
    },

    _startLoop: function () {
        var self = this;

        this._running = true;

        function step() {
            if (self._running) {

                requestAnimationFrame(step);

                !self._paused && self._update();
            }
        }

        requestAnimationFrame(step);
    },

    /**
     * Start animation.
     */
    start: function () {

        this._time = new Date().getTime();
        this._pausedTime = 0;

        this._startLoop();
    },

    /**
     * Stop animation.
     */
    stop: function () {
        this._running = false;
    },

    /**
     * Pause animation.
     */
    pause: function () {
        if (!this._paused) {
            this._pauseStart = new Date().getTime();
            this._paused = true;
        }
    },

    /**
     * Resume animation.
     */
    resume: function () {
        if (this._paused) {
            this._pausedTime += (new Date().getTime()) - this._pauseStart;
            this._paused = false;
        }
    },

    /**
     * Clear animation.
     */
    clear: function () {
        this._clips = [];
    },

    /**
     * Whether animation finished.
     */
    isFinished: function () {
        return !this._clips.length;
    },

    /**
     * Creat animator for a target, whose props can be animated.
     *
     * @param  {Object} target
     * @param  {Object} options
     * @param  {boolean} [options.loop=false] Whether loop animation.
     * @param  {Function} [options.getter=null] Get value from target.
     * @param  {Function} [options.setter=null] Set value to target.
     * @return {module:zrender/animation/Animation~Animator}
     */
    // TODO Gap
    animate: function (target, options) {
        options = options || {};

        var animator = new Animator(
            target,
            options.loop,
            options.getter,
            options.setter
        );

        this.addAnimator(animator);

        return animator;
    }
};

mixin(Animation, Eventful);

var TOUCH_CLICK_DELAY = 300;

var mouseHandlerNames = [
    'click', 'dblclick', 'mousewheel', 'mouseout',
    'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

var touchHandlerNames = [
    'touchstart', 'touchend', 'touchmove'
];

var pointerEventNames = {
    pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1
};

var pointerHandlerNames = map(mouseHandlerNames, function (name) {
    var nm = name.replace('mouse', 'pointer');
    return pointerEventNames[nm] ? nm : name;
});

function eventNameFix(name) {
    return (name === 'mousewheel' && env$1.browser.firefox) ? 'DOMMouseScroll' : name;
}

// function onMSGestureChange(proxy, event) {
//     if (event.translationX || event.translationY) {
//         // mousemove is carried by MSGesture to reduce the sensitivity.
//         proxy.handler.dispatchToElement(event.target, 'mousemove', event);
//     }
//     if (event.scale !== 1) {
//         event.pinchX = event.offsetX;
//         event.pinchY = event.offsetY;
//         event.pinchScale = event.scale;
//         proxy.handler.dispatchToElement(event.target, 'pinch', event);
//     }
// }

/**
 * Prevent mouse event from being dispatched after Touch Events action
 * @see <https://github.com/deltakosh/handjs/blob/master/src/hand.base.js>
 * 1. Mobile browsers dispatch mouse events 300ms after touchend.
 * 2. Chrome for Android dispatch mousedown for long-touch about 650ms
 * Result: Blocking Mouse Events for 700ms.
 */
function setTouchTimer(instance) {
    instance._touching = true;
    clearTimeout(instance._touchTimer);
    instance._touchTimer = setTimeout(function () {
        instance._touching = false;
    }, 700);
}


var domHandlers = {
    /**
     * Mouse move handler
     * @inner
     * @param {Event} event
     */
    mousemove: function (event) {
        event = normalizeEvent(this.dom, event);

        this.trigger('mousemove', event);
    },

    /**
     * Mouse out handler
     * @inner
     * @param {Event} event
     */
    mouseout: function (event) {
        event = normalizeEvent(this.dom, event);

        var element = event.toElement || event.relatedTarget;
        if (element !== this.dom) {
            while (element && element.nodeType !== 9) {
                // 忽略包含在root中的dom引起的mouseOut
                if (element === this.dom) {
                    return;
                }

                element = element.parentNode;
            }
        }

        this.trigger('mouseout', event);
    },

    /**
     * Touch开始响应函数
     * @inner
     * @param {Event} event
     */
    touchstart: function (event) {
        // Default mouse behaviour should not be disabled here.
        // For example, page may needs to be slided.
        event = normalizeEvent(this.dom, event);

        // Mark touch, which is useful in distinguish touch and
        // mouse event in upper applicatoin.
        event.zrByTouch = true;

        this._lastTouchMoment = new Date();

        this.handler.processGesture(this, event, 'start');

        // In touch device, trigger `mousemove`(`mouseover`) should
        // be triggered, and must before `mousedown` triggered.
        domHandlers.mousemove.call(this, event);

        domHandlers.mousedown.call(this, event);

        setTouchTimer(this);
    },

    /**
     * Touch移动响应函数
     * @inner
     * @param {Event} event
     */
    touchmove: function (event) {

        event = normalizeEvent(this.dom, event);

        // Mark touch, which is useful in distinguish touch and
        // mouse event in upper applicatoin.
        event.zrByTouch = true;

        this.handler.processGesture(this, event, 'change');

        // Mouse move should always be triggered no matter whether
        // there is gestrue event, because mouse move and pinch may
        // be used at the same time.
        domHandlers.mousemove.call(this, event);

        setTouchTimer(this);
    },

    /**
     * Touch结束响应函数
     * @inner
     * @param {Event} event
     */
    touchend: function (event) {

        event = normalizeEvent(this.dom, event);

        // Mark touch, which is useful in distinguish touch and
        // mouse event in upper applicatoin.
        event.zrByTouch = true;

        this.handler.processGesture(this, event, 'end');

        domHandlers.mouseup.call(this, event);

        // Do not trigger `mouseout` here, in spite of `mousemove`(`mouseover`) is
        // triggered in `touchstart`. This seems to be illogical, but by this mechanism,
        // we can conveniently implement "hover style" in both PC and touch device just
        // by listening to `mouseover` to add "hover style" and listening to `mouseout`
        // to remove "hover style" on an element, without any additional code for
        // compatibility. (`mouseout` will not be triggered in `touchend`, so "hover
        // style" will remain for user view)

        // click event should always be triggered no matter whether
        // there is gestrue event. System click can not be prevented.
        if (+new Date() - this._lastTouchMoment < TOUCH_CLICK_DELAY) {
            domHandlers.click.call(this, event);
        }

        setTouchTimer(this);
    },

    pointerdown: function (event) {
        domHandlers.mousedown.call(this, event);

        // if (useMSGuesture(this, event)) {
        //     this._msGesture.addPointer(event.pointerId);
        // }
    },

    pointermove: function (event) {
        // FIXME
        // pointermove is so sensitive that it always triggered when
        // tap(click) on touch screen, which affect some judgement in
        // upper application. So, we dont support mousemove on MS touch
        // device yet.
        if (!isPointerFromTouch(event)) {
            domHandlers.mousemove.call(this, event);
        }
    },

    pointerup: function (event) {
        domHandlers.mouseup.call(this, event);
    },

    pointerout: function (event) {
        // pointerout will be triggered when tap on touch screen
        // (IE11+/Edge on MS Surface) after click event triggered,
        // which is inconsistent with the mousout behavior we defined
        // in touchend. So we unify them.
        // (check domHandlers.touchend for detailed explanation)
        if (!isPointerFromTouch(event)) {
            domHandlers.mouseout.call(this, event);
        }
    }
};

function isPointerFromTouch(event) {
    var pointerType = event.pointerType;
    return pointerType === 'pen' || pointerType === 'touch';
}

// function useMSGuesture(handlerProxy, event) {
//     return isPointerFromTouch(event) && !!handlerProxy._msGesture;
// }

// Common handlers
each(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function (name) {
    domHandlers[name] = function (event) {
        event = normalizeEvent(this.dom, event);
        this.trigger(name, event);
    };
});

/**
 * 为控制类实例初始化dom 事件处理函数
 *
 * @inner
 * @param {module:zrender/Handler} instance 控制类实例
 */
function initDomHandler(instance) {
    each(touchHandlerNames, function (name) {
        instance._handlers[name] = bind(domHandlers[name], instance);
    });

    each(pointerHandlerNames, function (name) {
        instance._handlers[name] = bind(domHandlers[name], instance);
    });

    each(mouseHandlerNames, function (name) {
        instance._handlers[name] = makeMouseHandler(domHandlers[name], instance);
    });

    function makeMouseHandler(fn, instance) {
        return function () {
            if (instance._touching) {
                return;
            }
            return fn.apply(instance, arguments);
        };
    }
}


function HandlerDomProxy(dom) {
    Eventful.call(this);

    this.dom = dom;

    /**
     * @private
     * @type {boolean}
     */
    this._touching = false;

    /**
     * @private
     * @type {number}
     */
    this._touchTimer;

    this._handlers = {};

    initDomHandler(this);

    if (env$1.pointerEventsSupported) { // Only IE11+/Edge
        // 1. On devices that both enable touch and mouse (e.g., MS Surface and lenovo X240),
        // IE11+/Edge do not trigger touch event, but trigger pointer event and mouse event
        // at the same time.
        // 2. On MS Surface, it probablely only trigger mousedown but no mouseup when tap on
        // screen, which do not occurs in pointer event.
        // So we use pointer event to both detect touch gesture and mouse behavior.
        mountHandlers(pointerHandlerNames, this);

        // FIXME
        // Note: MS Gesture require CSS touch-action set. But touch-action is not reliable,
        // which does not prevent defuault behavior occasionally (which may cause view port
        // zoomed in but use can not zoom it back). And event.preventDefault() does not work.
        // So we have to not to use MSGesture and not to support touchmove and pinch on MS
        // touch screen. And we only support click behavior on MS touch screen now.

        // MS Gesture Event is only supported on IE11+/Edge and on Windows 8+.
        // We dont support touch on IE on win7.
        // See <https://msdn.microsoft.com/en-us/library/dn433243(v=vs.85).aspx>
        // if (typeof MSGesture === 'function') {
        //     (this._msGesture = new MSGesture()).target = dom; // jshint ignore:line
        //     dom.addEventListener('MSGestureChange', onMSGestureChange);
        // }
    }
    else {
        if (env$1.touchEventsSupported) {
            mountHandlers(touchHandlerNames, this);
            // Handler of 'mouseout' event is needed in touch mode, which will be mounted below.
            // addEventListener(root, 'mouseout', this._mouseoutHandler);
        }

        // 1. Considering some devices that both enable touch and mouse event (like on MS Surface
        // and lenovo X240, @see #2350), we make mouse event be always listened, otherwise
        // mouse event can not be handle in those devices.
        // 2. On MS Surface, Chrome will trigger both touch event and mouse event. How to prevent
        // mouseevent after touch event triggered, see `setTouchTimer`.
        mountHandlers(mouseHandlerNames, this);
    }

    function mountHandlers(handlerNames, instance) {
        each(handlerNames, function (name) {
            addEventListener(dom, eventNameFix(name), instance._handlers[name]);
        }, instance);
    }
}

var handlerDomProxyProto = HandlerDomProxy.prototype;
handlerDomProxyProto.dispose = function () {
    var handlerNames = mouseHandlerNames.concat(touchHandlerNames);

    for (var i = 0; i < handlerNames.length; i++) {
        var name = handlerNames[i];
        removeEventListener(this.dom, eventNameFix(name), this._handlers[name]);
    }
};

handlerDomProxyProto.setCursor = function (cursorStyle) {
    this.dom.style && (this.dom.style.cursor = cursorStyle || 'default');
};

mixin(HandlerDomProxy, Eventful);

/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/

var useVML = !env$1.canvasSupported;

var painterCtors = {
    canvas: Painter
};

var instances = {};    // ZRender实例map索引

/**
 * @type {string}
 */
var version = '4.0.7';

/**
 * Initializing a zrender instance
 * @param {HTMLElement} dom
 * @param {Object} [opts]
 * @param {string} [opts.renderer='canvas'] 'canvas' or 'svg'
 * @param {number} [opts.devicePixelRatio]
 * @param {number|string} [opts.width] Can be 'auto' (the same as null/undefined)
 * @param {number|string} [opts.height] Can be 'auto' (the same as null/undefined)
 * @return {module:zrender/ZRender}
 */
function init(dom, opts) {
    var zr = new ZRender(guid(), dom, opts);
    instances[zr.id] = zr;
    return zr;
}

/**
 * Dispose zrender instance
 * @param {module:zrender/ZRender} zr
 */
function dispose(zr) {
    if (zr) {
        zr.dispose();
    }
    else {
        for (var key in instances) {
            if (instances.hasOwnProperty(key)) {
                instances[key].dispose();
            }
        }
        instances = {};
    }

    return this;
}

/**
 * Get zrender instance by id
 * @param {string} id zrender instance id
 * @return {module:zrender/ZRender}
 */
function getInstance(id) {
    return instances[id];
}

function registerPainter(name, Ctor) {
    painterCtors[name] = Ctor;
}

function delInstance(id) {
    delete instances[id];
}

/**
 * @module zrender/ZRender
 */
/**
 * @constructor
 * @alias module:zrender/ZRender
 * @param {string} id
 * @param {HTMLElement} dom
 * @param {Object} opts
 * @param {string} [opts.renderer='canvas'] 'canvas' or 'svg'
 * @param {number} [opts.devicePixelRatio]
 * @param {number} [opts.width] Can be 'auto' (the same as null/undefined)
 * @param {number} [opts.height] Can be 'auto' (the same as null/undefined)
 */
var ZRender = function (id, dom, opts) {

    opts = opts || {};

    /**
     * @type {HTMLDomElement}
     */
    this.dom = dom;

    /**
     * @type {string}
     */
    this.id = id;

    var self = this;
    var storage = new Storage();

    var rendererType = opts.renderer;
    // TODO WebGL
    if (useVML) {
        if (!painterCtors.vml) {
            throw new Error('You need to require \'zrender/vml/vml\' to support IE8');
        }
        rendererType = 'vml';
    }
    else if (!rendererType || !painterCtors[rendererType]) {
        rendererType = 'canvas';
    }
    var painter = new painterCtors[rendererType](dom, storage, opts, id);

    this.storage = storage;
    this.painter = painter;

    var handerProxy = (!env$1.node && !env$1.worker) ? new HandlerDomProxy(painter.getViewportRoot()) : null;
    this.handler = new Handler(storage, painter, handerProxy, painter.root);

    /**
     * @type {module:zrender/animation/Animation}
     */
    this.animation = new Animation({
        stage: {
            update: bind(this.flush, this)
        }
    });
    this.animation.start();

    /**
     * @type {boolean}
     * @private
     */
    this._needsRefresh;

    // 修改 storage.delFromStorage, 每次删除元素之前删除动画
    // FIXME 有点ugly
    var oldDelFromStorage = storage.delFromStorage;
    var oldAddToStorage = storage.addToStorage;

    storage.delFromStorage = function (el) {
        oldDelFromStorage.call(storage, el);

        el && el.removeSelfFromZr(self);
    };

    storage.addToStorage = function (el) {
        oldAddToStorage.call(storage, el);

        el.addSelfToZr(self);
    };
};

ZRender.prototype = {

    constructor: ZRender,
    /**
     * 获取实例唯一标识
     * @return {string}
     */
    getId: function () {
        return this.id;
    },

    /**
     * 添加元素
     * @param  {module:zrender/Element} el
     */
    add: function (el) {
        this.storage.addRoot(el);
        this._needsRefresh = true;
    },

    /**
     * 删除元素
     * @param  {module:zrender/Element} el
     */
    remove: function (el) {
        this.storage.delRoot(el);
        this._needsRefresh = true;
    },

    /**
     * Change configuration of layer
     * @param {string} zLevel
     * @param {Object} config
     * @param {string} [config.clearColor=0] Clear color
     * @param {string} [config.motionBlur=false] If enable motion blur
     * @param {number} [config.lastFrameAlpha=0.7] Motion blur factor. Larger value cause longer trailer
    */
    configLayer: function (zLevel, config) {
        if (this.painter.configLayer) {
            this.painter.configLayer(zLevel, config);
        }
        this._needsRefresh = true;
    },

    /**
     * Set background color
     * @param {string} backgroundColor
     */
    setBackgroundColor: function (backgroundColor) {
        if (this.painter.setBackgroundColor) {
            this.painter.setBackgroundColor(backgroundColor);
        }
        this._needsRefresh = true;
    },

    /**
     * Repaint the canvas immediately
     */
    refreshImmediately: function () {
        // var start = new Date();
        // Clear needsRefresh ahead to avoid something wrong happens in refresh
        // Or it will cause zrender refreshes again and again.
        this._needsRefresh = false;
        this.painter.refresh();
        /**
         * Avoid trigger zr.refresh in Element#beforeUpdate hook
         */
        this._needsRefresh = false;
        // var end = new Date();
        // var log = document.getElementById('log');
        // if (log) {
        //     log.innerHTML = log.innerHTML + '<br>' + (end - start);
        // }
    },

    /**
     * Mark and repaint the canvas in the next frame of browser
     */
    refresh: function () {
        this._needsRefresh = true;
    },

    /**
     * Perform all refresh
     */
    flush: function () {
        var triggerRendered;

        if (this._needsRefresh) {
            triggerRendered = true;
            this.refreshImmediately();
        }
        if (this._needsRefreshHover) {
            triggerRendered = true;
            this.refreshHoverImmediately();
        }

        triggerRendered && this.trigger('rendered');
    },

    /**
     * Add element to hover layer
     * @param  {module:zrender/Element} el
     * @param {Object} style
     */
    addHover: function (el, style) {
        if (this.painter.addHover) {
            var elMirror = this.painter.addHover(el, style);
            this.refreshHover();
            return elMirror;
        }
    },

    /**
     * Add element from hover layer
     * @param  {module:zrender/Element} el
     */
    removeHover: function (el) {
        if (this.painter.removeHover) {
            this.painter.removeHover(el);
            this.refreshHover();
        }
    },

    /**
     * Clear all hover elements in hover layer
     * @param  {module:zrender/Element} el
     */
    clearHover: function () {
        if (this.painter.clearHover) {
            this.painter.clearHover();
            this.refreshHover();
        }
    },

    /**
     * Refresh hover in next frame
     */
    refreshHover: function () {
        this._needsRefreshHover = true;
    },

    /**
     * Refresh hover immediately
     */
    refreshHoverImmediately: function () {
        this._needsRefreshHover = false;
        this.painter.refreshHover && this.painter.refreshHover();
    },

    /**
     * Resize the canvas.
     * Should be invoked when container size is changed
     * @param {Object} [opts]
     * @param {number|string} [opts.width] Can be 'auto' (the same as null/undefined)
     * @param {number|string} [opts.height] Can be 'auto' (the same as null/undefined)
     */
    resize: function (opts) {
        opts = opts || {};
        this.painter.resize(opts.width, opts.height);
        this.handler.resize();
    },

    /**
     * Stop and clear all animation immediately
     */
    clearAnimation: function () {
        this.animation.clear();
    },

    /**
     * Get container width
     */
    getWidth: function () {
        return this.painter.getWidth();
    },

    /**
     * Get container height
     */
    getHeight: function () {
        return this.painter.getHeight();
    },

    /**
     * Export the canvas as Base64 URL
     * @param {string} type
     * @param {string} [backgroundColor='#fff']
     * @return {string} Base64 URL
     */
    // toDataURL: function(type, backgroundColor) {
    //     return this.painter.getRenderedCanvas({
    //         backgroundColor: backgroundColor
    //     }).toDataURL(type);
    // },

    /**
     * Converting a path to image.
     * It has much better performance of drawing image rather than drawing a vector path.
     * @param {module:zrender/graphic/Path} e
     * @param {number} width
     * @param {number} height
     */
    pathToImage: function (e, dpr) {
        return this.painter.pathToImage(e, dpr);
    },

    /**
     * Set default cursor
     * @param {string} [cursorStyle='default'] 例如 crosshair
     */
    setCursorStyle: function (cursorStyle) {
        this.handler.setCursorStyle(cursorStyle);
    },

    /**
     * Find hovered element
     * @param {number} x
     * @param {number} y
     * @return {Object} {target, topTarget}
     */
    findHover: function (x, y) {
        return this.handler.findHover(x, y);
    },

    /**
     * Bind event
     *
     * @param {string} eventName Event name
     * @param {Function} eventHandler Handler function
     * @param {Object} [context] Context object
     */
    on: function (eventName, eventHandler, context) {
        this.handler.on(eventName, eventHandler, context);
    },

    /**
     * Unbind event
     * @param {string} eventName Event name
     * @param {Function} [eventHandler] Handler function
     */
    off: function (eventName, eventHandler) {
        this.handler.off(eventName, eventHandler);
    },

    /**
     * Trigger event manually
     *
     * @param {string} eventName Event name
     * @param {event=} event Event object
     */
    trigger: function (eventName, event) {
        this.handler.trigger(eventName, event);
    },


    /**
     * Clear all objects and the canvas.
     */
    clear: function () {
        this.storage.delRoot();
        this.painter.clear();
    },

    /**
     * Dispose self.
     */
    dispose: function () {
        this.animation.stop();

        this.clear();
        this.storage.dispose();
        this.painter.dispose();
        this.handler.dispose();

        this.animation =
        this.storage =
        this.painter =
        this.handler = null;

        delInstance(this.id);
    }
};

/**
 * 曲线辅助模块
 * @module zrender/core/curve
 * @author pissang(https://www.github.com/pissang)
 */

var mathPow = Math.pow;
var mathSqrt$2 = Math.sqrt;

var EPSILON$1 = 1e-8;
var EPSILON_NUMERIC = 1e-4;

var THREE_SQRT = mathSqrt$2(3);
var ONE_THIRD = 1 / 3;

// 临时变量
var _v0 = create();
var _v1 = create();
var _v2 = create();

function isAroundZero(val) {
    return val > -EPSILON$1 && val < EPSILON$1;
}
function isNotAroundZero$1(val) {
    return val > EPSILON$1 || val < -EPSILON$1;
}
/**
 * 计算三次贝塞尔值
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @return {number}
 */
function cubicAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return onet * onet * (onet * p0 + 3 * t * p1)
            + t * t * (t * p3 + 3 * onet * p2);
}

/**
 * 计算三次贝塞尔导数值
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @return {number}
 */
function cubicDerivativeAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return 3 * (
        ((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet
        + (p3 - p2) * t * t
    );
}

/**
 * 计算三次贝塞尔方程根，使用盛金公式
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} val
 * @param  {Array.<number>} roots
 * @return {number} 有效根数目
 */
function cubicRootAt(p0, p1, p2, p3, val, roots) {
    // Evaluate roots of cubic functions
    var a = p3 + 3 * (p1 - p2) - p0;
    var b = 3 * (p2 - p1 * 2 + p0);
    var c = 3 * (p1 - p0);
    var d = p0 - val;

    var A = b * b - 3 * a * c;
    var B = b * c - 9 * a * d;
    var C = c * c - 3 * b * d;

    var n = 0;

    if (isAroundZero(A) && isAroundZero(B)) {
        if (isAroundZero(b)) {
            roots[0] = 0;
        }
        else {
            var t1 = -c / b;  //t1, t2, t3, b is not zero
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
    }
    else {
        var disc = B * B - 4 * A * C;

        if (isAroundZero(disc)) {
            var K = B / A;
            var t1 = -b / a + K;  // t1, a is not zero
            var t2 = -K / 2;  // t2, t3
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
        }
        else if (disc > 0) {
            var discSqrt = mathSqrt$2(disc);
            var Y1 = A * b + 1.5 * a * (-B + discSqrt);
            var Y2 = A * b + 1.5 * a * (-B - discSqrt);
            if (Y1 < 0) {
                Y1 = -mathPow(-Y1, ONE_THIRD);
            }
            else {
                Y1 = mathPow(Y1, ONE_THIRD);
            }
            if (Y2 < 0) {
                Y2 = -mathPow(-Y2, ONE_THIRD);
            }
            else {
                Y2 = mathPow(Y2, ONE_THIRD);
            }
            var t1 = (-b - (Y1 + Y2)) / (3 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
        else {
            var T = (2 * A * b - 3 * a * B) / (2 * mathSqrt$2(A * A * A));
            var theta = Math.acos(T) / 3;
            var ASqrt = mathSqrt$2(A);
            var tmp = Math.cos(theta);

            var t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
            var t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a);
            var t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
            if (t3 >= 0 && t3 <= 1) {
                roots[n++] = t3;
            }
        }
    }
    return n;
}

/**
 * 计算三次贝塞尔方程极限值的位置
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {Array.<number>} extrema
 * @return {number} 有效数目
 */
function cubicExtrema(p0, p1, p2, p3, extrema) {
    var b = 6 * p2 - 12 * p1 + 6 * p0;
    var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
    var c = 3 * p1 - 3 * p0;

    var n = 0;
    if (isAroundZero(a)) {
        if (isNotAroundZero$1(b)) {
            var t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                extrema[n++] = t1;
            }
        }
    }
    else {
        var disc = b * b - 4 * a * c;
        if (isAroundZero(disc)) {
            extrema[0] = -b / (2 * a);
        }
        else if (disc > 0) {
            var discSqrt = mathSqrt$2(disc);
            var t1 = (-b + discSqrt) / (2 * a);
            var t2 = (-b - discSqrt) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                extrema[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                extrema[n++] = t2;
            }
        }
    }
    return n;
}

/**
 * 细分三次贝塞尔曲线
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @param  {Array.<number>} out
 */
function cubicSubdivide(p0, p1, p2, p3, t, out) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p23 = (p3 - p2) * t + p2;

    var p012 = (p12 - p01) * t + p01;
    var p123 = (p23 - p12) * t + p12;

    var p0123 = (p123 - p012) * t + p012;
    // Seg0
    out[0] = p0;
    out[1] = p01;
    out[2] = p012;
    out[3] = p0123;
    // Seg1
    out[4] = p0123;
    out[5] = p123;
    out[6] = p23;
    out[7] = p3;
}

/**
 * 投射点到三次贝塞尔曲线上，返回投射距离。
 * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x3
 * @param {number} y3
 * @param {number} x
 * @param {number} y
 * @param {Array.<number>} [out] 投射点
 * @return {number}
 */
function cubicProjectPoint(
    x0, y0, x1, y1, x2, y2, x3, y3,
    x, y, out
) {
    // http://pomax.github.io/bezierinfo/#projections
    var t;
    var interval = 0.005;
    var d = Infinity;
    var prev;
    var next;
    var d1;
    var d2;

    _v0[0] = x;
    _v0[1] = y;

    // 先粗略估计一下可能的最小距离的 t 值
    // PENDING
    for (var _t = 0; _t < 1; _t += 0.05) {
        _v1[0] = cubicAt(x0, x1, x2, x3, _t);
        _v1[1] = cubicAt(y0, y1, y2, y3, _t);
        d1 = distSquare(_v0, _v1);
        if (d1 < d) {
            t = _t;
            d = d1;
        }
    }
    d = Infinity;

    // At most 32 iteration
    for (var i = 0; i < 32; i++) {
        if (interval < EPSILON_NUMERIC) {
            break;
        }
        prev = t - interval;
        next = t + interval;
        // t - interval
        _v1[0] = cubicAt(x0, x1, x2, x3, prev);
        _v1[1] = cubicAt(y0, y1, y2, y3, prev);

        d1 = distSquare(_v1, _v0);

        if (prev >= 0 && d1 < d) {
            t = prev;
            d = d1;
        }
        else {
            // t + interval
            _v2[0] = cubicAt(x0, x1, x2, x3, next);
            _v2[1] = cubicAt(y0, y1, y2, y3, next);
            d2 = distSquare(_v2, _v0);

            if (next <= 1 && d2 < d) {
                t = next;
                d = d2;
            }
            else {
                interval *= 0.5;
            }
        }
    }
    // t
    if (out) {
        out[0] = cubicAt(x0, x1, x2, x3, t);
        out[1] = cubicAt(y0, y1, y2, y3, t);
    }
    // console.log(interval, i);
    return mathSqrt$2(d);
}

/**
 * 计算二次方贝塞尔值
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @return {number}
 */
function quadraticAt(p0, p1, p2, t) {
    var onet = 1 - t;
    return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
}

/**
 * 计算二次方贝塞尔导数值
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @return {number}
 */
function quadraticDerivativeAt(p0, p1, p2, t) {
    return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
}

/**
 * 计算二次方贝塞尔方程根
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @param  {Array.<number>} roots
 * @return {number} 有效根数目
 */
function quadraticRootAt(p0, p1, p2, val, roots) {
    var a = p0 - 2 * p1 + p2;
    var b = 2 * (p1 - p0);
    var c = p0 - val;

    var n = 0;
    if (isAroundZero(a)) {
        if (isNotAroundZero$1(b)) {
            var t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
    }
    else {
        var disc = b * b - 4 * a * c;
        if (isAroundZero(disc)) {
            var t1 = -b / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
        else if (disc > 0) {
            var discSqrt = mathSqrt$2(disc);
            var t1 = (-b + discSqrt) / (2 * a);
            var t2 = (-b - discSqrt) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
        }
    }
    return n;
}

/**
 * 计算二次贝塞尔方程极限值
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @return {number}
 */
function quadraticExtremum(p0, p1, p2) {
    var divider = p0 + p2 - 2 * p1;
    if (divider === 0) {
        // p1 is center of p0 and p2
        return 0.5;
    }
    else {
        return (p0 - p1) / divider;
    }
}

/**
 * 细分二次贝塞尔曲线
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @param  {Array.<number>} out
 */
function quadraticSubdivide(p0, p1, p2, t, out) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p012 = (p12 - p01) * t + p01;

    // Seg0
    out[0] = p0;
    out[1] = p01;
    out[2] = p012;

    // Seg1
    out[3] = p012;
    out[4] = p12;
    out[5] = p2;
}

/**
 * 投射点到二次贝塞尔曲线上，返回投射距离。
 * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x
 * @param {number} y
 * @param {Array.<number>} out 投射点
 * @return {number}
 */
function quadraticProjectPoint(
    x0, y0, x1, y1, x2, y2,
    x, y, out
) {
    // http://pomax.github.io/bezierinfo/#projections
    var t;
    var interval = 0.005;
    var d = Infinity;

    _v0[0] = x;
    _v0[1] = y;

    // 先粗略估计一下可能的最小距离的 t 值
    // PENDING
    for (var _t = 0; _t < 1; _t += 0.05) {
        _v1[0] = quadraticAt(x0, x1, x2, _t);
        _v1[1] = quadraticAt(y0, y1, y2, _t);
        var d1 = distSquare(_v0, _v1);
        if (d1 < d) {
            t = _t;
            d = d1;
        }
    }
    d = Infinity;

    // At most 32 iteration
    for (var i = 0; i < 32; i++) {
        if (interval < EPSILON_NUMERIC) {
            break;
        }
        var prev = t - interval;
        var next = t + interval;
        // t - interval
        _v1[0] = quadraticAt(x0, x1, x2, prev);
        _v1[1] = quadraticAt(y0, y1, y2, prev);

        var d1 = distSquare(_v1, _v0);

        if (prev >= 0 && d1 < d) {
            t = prev;
            d = d1;
        }
        else {
            // t + interval
            _v2[0] = quadraticAt(x0, x1, x2, next);
            _v2[1] = quadraticAt(y0, y1, y2, next);
            var d2 = distSquare(_v2, _v0);
            if (next <= 1 && d2 < d) {
                t = next;
                d = d2;
            }
            else {
                interval *= 0.5;
            }
        }
    }
    // t
    if (out) {
        out[0] = quadraticAt(x0, x1, x2, t);
        out[1] = quadraticAt(y0, y1, y2, t);
    }
    // console.log(interval, i);
    return mathSqrt$2(d);
}

/**
 * @author Yi Shen(https://github.com/pissang)
 */

var mathMin$2 = Math.min;
var mathMax$2 = Math.max;
var mathSin$2 = Math.sin;
var mathCos$2 = Math.cos;
var PI2 = Math.PI * 2;

var start = create();
var end = create();
var extremity = create();

/**
 * 从顶点数组中计算出最小包围盒，写入`min`和`max`中
 * @module zrender/core/bbox
 * @param {Array<Object>} points 顶点数组
 * @param {number} min
 * @param {number} max
 */


/**
 * @memberOf module:zrender/core/bbox
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {Array.<number>} min
 * @param {Array.<number>} max
 */
function fromLine(x0, y0, x1, y1, min$$1, max$$1) {
    min$$1[0] = mathMin$2(x0, x1);
    min$$1[1] = mathMin$2(y0, y1);
    max$$1[0] = mathMax$2(x0, x1);
    max$$1[1] = mathMax$2(y0, y1);
}

var xDim = [];
var yDim = [];
/**
 * 从三阶贝塞尔曲线(p0, p1, p2, p3)中计算出最小包围盒，写入`min`和`max`中
 * @memberOf module:zrender/core/bbox
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x3
 * @param {number} y3
 * @param {Array.<number>} min
 * @param {Array.<number>} max
 */
function fromCubic(
    x0, y0, x1, y1, x2, y2, x3, y3, min$$1, max$$1
) {
    var cubicExtrema$$1 = cubicExtrema;
    var cubicAt$$1 = cubicAt;
    var i;
    var n = cubicExtrema$$1(x0, x1, x2, x3, xDim);
    min$$1[0] = Infinity;
    min$$1[1] = Infinity;
    max$$1[0] = -Infinity;
    max$$1[1] = -Infinity;

    for (i = 0; i < n; i++) {
        var x = cubicAt$$1(x0, x1, x2, x3, xDim[i]);
        min$$1[0] = mathMin$2(x, min$$1[0]);
        max$$1[0] = mathMax$2(x, max$$1[0]);
    }
    n = cubicExtrema$$1(y0, y1, y2, y3, yDim);
    for (i = 0; i < n; i++) {
        var y = cubicAt$$1(y0, y1, y2, y3, yDim[i]);
        min$$1[1] = mathMin$2(y, min$$1[1]);
        max$$1[1] = mathMax$2(y, max$$1[1]);
    }

    min$$1[0] = mathMin$2(x0, min$$1[0]);
    max$$1[0] = mathMax$2(x0, max$$1[0]);
    min$$1[0] = mathMin$2(x3, min$$1[0]);
    max$$1[0] = mathMax$2(x3, max$$1[0]);

    min$$1[1] = mathMin$2(y0, min$$1[1]);
    max$$1[1] = mathMax$2(y0, max$$1[1]);
    min$$1[1] = mathMin$2(y3, min$$1[1]);
    max$$1[1] = mathMax$2(y3, max$$1[1]);
}

/**
 * 从二阶贝塞尔曲线(p0, p1, p2)中计算出最小包围盒，写入`min`和`max`中
 * @memberOf module:zrender/core/bbox
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {Array.<number>} min
 * @param {Array.<number>} max
 */
function fromQuadratic(x0, y0, x1, y1, x2, y2, min$$1, max$$1) {
    var quadraticExtremum$$1 = quadraticExtremum;
    var quadraticAt$$1 = quadraticAt;
    // Find extremities, where derivative in x dim or y dim is zero
    var tx =
        mathMax$2(
            mathMin$2(quadraticExtremum$$1(x0, x1, x2), 1), 0
        );
    var ty =
        mathMax$2(
            mathMin$2(quadraticExtremum$$1(y0, y1, y2), 1), 0
        );

    var x = quadraticAt$$1(x0, x1, x2, tx);
    var y = quadraticAt$$1(y0, y1, y2, ty);

    min$$1[0] = mathMin$2(x0, x2, x);
    min$$1[1] = mathMin$2(y0, y2, y);
    max$$1[0] = mathMax$2(x0, x2, x);
    max$$1[1] = mathMax$2(y0, y2, y);
}

/**
 * 从圆弧中计算出最小包围盒，写入`min`和`max`中
 * @method
 * @memberOf module:zrender/core/bbox
 * @param {number} x
 * @param {number} y
 * @param {number} rx
 * @param {number} ry
 * @param {number} startAngle
 * @param {number} endAngle
 * @param {number} anticlockwise
 * @param {Array.<number>} min
 * @param {Array.<number>} max
 */
function fromArc(
    x, y, rx, ry, startAngle, endAngle, anticlockwise, min$$1, max$$1
) {
    var vec2Min = min;
    var vec2Max = max;

    var diff = Math.abs(startAngle - endAngle);


    if (diff % PI2 < 1e-4 && diff > 1e-4) {
        // Is a circle
        min$$1[0] = x - rx;
        min$$1[1] = y - ry;
        max$$1[0] = x + rx;
        max$$1[1] = y + ry;
        return;
    }

    start[0] = mathCos$2(startAngle) * rx + x;
    start[1] = mathSin$2(startAngle) * ry + y;

    end[0] = mathCos$2(endAngle) * rx + x;
    end[1] = mathSin$2(endAngle) * ry + y;

    vec2Min(min$$1, start, end);
    vec2Max(max$$1, start, end);

    // Thresh to [0, Math.PI * 2]
    startAngle = startAngle % (PI2);
    if (startAngle < 0) {
        startAngle = startAngle + PI2;
    }
    endAngle = endAngle % (PI2);
    if (endAngle < 0) {
        endAngle = endAngle + PI2;
    }

    if (startAngle > endAngle && !anticlockwise) {
        endAngle += PI2;
    }
    else if (startAngle < endAngle && anticlockwise) {
        startAngle += PI2;
    }
    if (anticlockwise) {
        var tmp = endAngle;
        endAngle = startAngle;
        startAngle = tmp;
    }

    // var number = 0;
    // var step = (anticlockwise ? -Math.PI : Math.PI) / 2;
    for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
        if (angle > startAngle) {
            extremity[0] = mathCos$2(angle) * rx + x;
            extremity[1] = mathSin$2(angle) * ry + y;

            vec2Min(min$$1, extremity, min$$1);
            vec2Max(max$$1, extremity, max$$1);
        }
    }
}

/**
 * Path 代理，可以在`buildPath`中用于替代`ctx`, 会保存每个path操作的命令到pathCommands属性中
 * 可以用于 isInsidePath 判断以及获取boundingRect
 *
 * @module zrender/core/PathProxy
 * @author Yi Shen (http://www.github.com/pissang)
 */

// TODO getTotalLength, getPointAtLength

var CMD = {
    M: 1,
    L: 2,
    C: 3,
    Q: 4,
    A: 5,
    Z: 6,
    // Rect
    R: 7
};

// var CMD_MEM_SIZE = {
//     M: 3,
//     L: 3,
//     C: 7,
//     Q: 5,
//     A: 9,
//     R: 5,
//     Z: 1
// };

var min$1 = [];
var max$1 = [];
var min2 = [];
var max2 = [];
var mathMin$1 = Math.min;
var mathMax$1 = Math.max;
var mathCos$1 = Math.cos;
var mathSin$1 = Math.sin;
var mathSqrt$1 = Math.sqrt;
var mathAbs = Math.abs;

var hasTypedArray = typeof Float32Array !== 'undefined';

/**
 * @alias module:zrender/core/PathProxy
 * @constructor
 */
var PathProxy = function (notSaveData) {

    this._saveData = !(notSaveData || false);

    if (this._saveData) {
        /**
         * Path data. Stored as flat array
         * @type {Array.<Object>}
         */
        this.data = [];
    }

    this._ctx = null;
};

/**
 * 快速计算Path包围盒（并不是最小包围盒）
 * @return {Object}
 */
PathProxy.prototype = {

    constructor: PathProxy,

    _xi: 0,
    _yi: 0,

    _x0: 0,
    _y0: 0,
    // Unit x, Unit y. Provide for avoiding drawing that too short line segment
    _ux: 0,
    _uy: 0,

    _len: 0,

    _lineDash: null,

    _dashOffset: 0,

    _dashIdx: 0,

    _dashSum: 0,

    /**
     * @readOnly
     */
    setScale: function (sx, sy) {
        this._ux = mathAbs(1 / devicePixelRatio / sx) || 0;
        this._uy = mathAbs(1 / devicePixelRatio / sy) || 0;
    },

    getContext: function () {
        return this._ctx;
    },

    /**
     * @param  {CanvasRenderingContext2D} ctx
     * @return {module:zrender/core/PathProxy}
     */
    beginPath: function (ctx) {

        this._ctx = ctx;

        ctx && ctx.beginPath();

        ctx && (this.dpr = ctx.dpr);

        // Reset
        if (this._saveData) {
            this._len = 0;
        }

        if (this._lineDash) {
            this._lineDash = null;

            this._dashOffset = 0;
        }

        return this;
    },

    /**
     * @param  {number} x
     * @param  {number} y
     * @return {module:zrender/core/PathProxy}
     */
    moveTo: function (x, y) {
        this.addData(CMD.M, x, y);
        this._ctx && this._ctx.moveTo(x, y);

        // x0, y0, xi, yi 是记录在 _dashedXXXXTo 方法中使用
        // xi, yi 记录当前点, x0, y0 在 closePath 的时候回到起始点。
        // 有可能在 beginPath 之后直接调用 lineTo，这时候 x0, y0 需要
        // 在 lineTo 方法中记录，这里先不考虑这种情况，dashed line 也只在 IE10- 中不支持
        this._x0 = x;
        this._y0 = y;

        this._xi = x;
        this._yi = y;

        return this;
    },

    /**
     * @param  {number} x
     * @param  {number} y
     * @return {module:zrender/core/PathProxy}
     */
    lineTo: function (x, y) {
        var exceedUnit = mathAbs(x - this._xi) > this._ux
            || mathAbs(y - this._yi) > this._uy
            // Force draw the first segment
            || this._len < 5;

        this.addData(CMD.L, x, y);

        if (this._ctx && exceedUnit) {
            this._needsDash() ? this._dashedLineTo(x, y)
                : this._ctx.lineTo(x, y);
        }
        if (exceedUnit) {
            this._xi = x;
            this._yi = y;
        }

        return this;
    },

    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @param  {number} x3
     * @param  {number} y3
     * @return {module:zrender/core/PathProxy}
     */
    bezierCurveTo: function (x1, y1, x2, y2, x3, y3) {
        this.addData(CMD.C, x1, y1, x2, y2, x3, y3);
        if (this._ctx) {
            this._needsDash() ? this._dashedBezierTo(x1, y1, x2, y2, x3, y3)
                : this._ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        }
        this._xi = x3;
        this._yi = y3;
        return this;
    },

    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @return {module:zrender/core/PathProxy}
     */
    quadraticCurveTo: function (x1, y1, x2, y2) {
        this.addData(CMD.Q, x1, y1, x2, y2);
        if (this._ctx) {
            this._needsDash() ? this._dashedQuadraticTo(x1, y1, x2, y2)
                : this._ctx.quadraticCurveTo(x1, y1, x2, y2);
        }
        this._xi = x2;
        this._yi = y2;
        return this;
    },

    /**
     * @param  {number} cx
     * @param  {number} cy
     * @param  {number} r
     * @param  {number} startAngle
     * @param  {number} endAngle
     * @param  {boolean} anticlockwise
     * @return {module:zrender/core/PathProxy}
     */
    arc: function (cx, cy, r, startAngle, endAngle, anticlockwise) {
        this.addData(
            CMD.A, cx, cy, r, r, startAngle, endAngle - startAngle, 0, anticlockwise ? 0 : 1
        );
        this._ctx && this._ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);

        this._xi = mathCos$1(endAngle) * r + cx;
        this._yi = mathSin$1(endAngle) * r + cy;
        return this;
    },

    // TODO
    arcTo: function (x1, y1, x2, y2, radius) {
        if (this._ctx) {
            this._ctx.arcTo(x1, y1, x2, y2, radius);
        }
        return this;
    },

    // TODO
    rect: function (x, y, w, h) {
        this._ctx && this._ctx.rect(x, y, w, h);
        this.addData(CMD.R, x, y, w, h);
        return this;
    },

    /**
     * @return {module:zrender/core/PathProxy}
     */
    closePath: function () {
        this.addData(CMD.Z);

        var ctx = this._ctx;
        var x0 = this._x0;
        var y0 = this._y0;
        if (ctx) {
            this._needsDash() && this._dashedLineTo(x0, y0);
            ctx.closePath();
        }

        this._xi = x0;
        this._yi = y0;
        return this;
    },

    /**
     * Context 从外部传入，因为有可能是 rebuildPath 完之后再 fill。
     * stroke 同样
     * @param {CanvasRenderingContext2D} ctx
     * @return {module:zrender/core/PathProxy}
     */
    fill: function (ctx) {
        ctx && ctx.fill();
        this.toStatic();
    },

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @return {module:zrender/core/PathProxy}
     */
    stroke: function (ctx) {
        ctx && ctx.stroke();
        this.toStatic();
    },

    /**
     * 必须在其它绘制命令前调用
     * Must be invoked before all other path drawing methods
     * @return {module:zrender/core/PathProxy}
     */
    setLineDash: function (lineDash) {
        if (lineDash instanceof Array) {
            this._lineDash = lineDash;

            this._dashIdx = 0;

            var lineDashSum = 0;
            for (var i = 0; i < lineDash.length; i++) {
                lineDashSum += lineDash[i];
            }
            this._dashSum = lineDashSum;
        }
        return this;
    },

    /**
     * 必须在其它绘制命令前调用
     * Must be invoked before all other path drawing methods
     * @return {module:zrender/core/PathProxy}
     */
    setLineDashOffset: function (offset) {
        this._dashOffset = offset;
        return this;
    },

    /**
     *
     * @return {boolean}
     */
    len: function () {
        return this._len;
    },

    /**
     * 直接设置 Path 数据
     */
    setData: function (data) {

        var len$$1 = data.length;

        if (!(this.data && this.data.length === len$$1) && hasTypedArray) {
            this.data = new Float32Array(len$$1);
        }

        for (var i = 0; i < len$$1; i++) {
            this.data[i] = data[i];
        }

        this._len = len$$1;
    },

    /**
     * 添加子路径
     * @param {module:zrender/core/PathProxy|Array.<module:zrender/core/PathProxy>} path
     */
    appendPath: function (path) {
        if (!(path instanceof Array)) {
            path = [path];
        }
        var len$$1 = path.length;
        var appendSize = 0;
        var offset = this._len;
        for (var i = 0; i < len$$1; i++) {
            appendSize += path[i].len();
        }
        if (hasTypedArray && (this.data instanceof Float32Array)) {
            this.data = new Float32Array(offset + appendSize);
        }
        for (var i = 0; i < len$$1; i++) {
            var appendPathData = path[i].data;
            for (var k = 0; k < appendPathData.length; k++) {
                this.data[offset++] = appendPathData[k];
            }
        }
        this._len = offset;
    },

    /**
     * 填充 Path 数据。
     * 尽量复用而不申明新的数组。大部分图形重绘的指令数据长度都是不变的。
     */
    addData: function (cmd) {
        if (!this._saveData) {
            return;
        }

        var data = this.data;
        if (this._len + arguments.length > data.length) {
            // 因为之前的数组已经转换成静态的 Float32Array
            // 所以不够用时需要扩展一个新的动态数组
            this._expandData();
            data = this.data;
        }
        for (var i = 0; i < arguments.length; i++) {
            data[this._len++] = arguments[i];
        }

        this._prevCmd = cmd;
    },

    _expandData: function () {
        // Only if data is Float32Array
        if (!(this.data instanceof Array)) {
            var newData = [];
            for (var i = 0; i < this._len; i++) {
                newData[i] = this.data[i];
            }
            this.data = newData;
        }
    },

    /**
     * If needs js implemented dashed line
     * @return {boolean}
     * @private
     */
    _needsDash: function () {
        return this._lineDash;
    },

    _dashedLineTo: function (x1, y1) {
        var dashSum = this._dashSum;
        var offset = this._dashOffset;
        var lineDash = this._lineDash;
        var ctx = this._ctx;

        var x0 = this._xi;
        var y0 = this._yi;
        var dx = x1 - x0;
        var dy = y1 - y0;
        var dist$$1 = mathSqrt$1(dx * dx + dy * dy);
        var x = x0;
        var y = y0;
        var dash;
        var nDash = lineDash.length;
        var idx;
        dx /= dist$$1;
        dy /= dist$$1;

        if (offset < 0) {
            // Convert to positive offset
            offset = dashSum + offset;
        }
        offset %= dashSum;
        x -= offset * dx;
        y -= offset * dy;

        while ((dx > 0 && x <= x1) || (dx < 0 && x >= x1)
        || (dx === 0 && ((dy > 0 && y <= y1) || (dy < 0 && y >= y1)))) {
            idx = this._dashIdx;
            dash = lineDash[idx];
            x += dx * dash;
            y += dy * dash;
            this._dashIdx = (idx + 1) % nDash;
            // Skip positive offset
            if ((dx > 0 && x < x0) || (dx < 0 && x > x0) || (dy > 0 && y < y0) || (dy < 0 && y > y0)) {
                continue;
            }
            ctx[idx % 2 ? 'moveTo' : 'lineTo'](
                dx >= 0 ? mathMin$1(x, x1) : mathMax$1(x, x1),
                dy >= 0 ? mathMin$1(y, y1) : mathMax$1(y, y1)
            );
        }
        // Offset for next lineTo
        dx = x - x1;
        dy = y - y1;
        this._dashOffset = -mathSqrt$1(dx * dx + dy * dy);
    },

    // Not accurate dashed line to
    _dashedBezierTo: function (x1, y1, x2, y2, x3, y3) {
        var dashSum = this._dashSum;
        var offset = this._dashOffset;
        var lineDash = this._lineDash;
        var ctx = this._ctx;

        var x0 = this._xi;
        var y0 = this._yi;
        var t;
        var dx;
        var dy;
        var cubicAt$$1 = cubicAt;
        var bezierLen = 0;
        var idx = this._dashIdx;
        var nDash = lineDash.length;

        var x;
        var y;

        var tmpLen = 0;

        if (offset < 0) {
            // Convert to positive offset
            offset = dashSum + offset;
        }
        offset %= dashSum;
        // Bezier approx length
        for (t = 0; t < 1; t += 0.1) {
            dx = cubicAt$$1(x0, x1, x2, x3, t + 0.1)
                - cubicAt$$1(x0, x1, x2, x3, t);
            dy = cubicAt$$1(y0, y1, y2, y3, t + 0.1)
                - cubicAt$$1(y0, y1, y2, y3, t);
            bezierLen += mathSqrt$1(dx * dx + dy * dy);
        }

        // Find idx after add offset
        for (; idx < nDash; idx++) {
            tmpLen += lineDash[idx];
            if (tmpLen > offset) {
                break;
            }
        }
        t = (tmpLen - offset) / bezierLen;

        while (t <= 1) {

            x = cubicAt$$1(x0, x1, x2, x3, t);
            y = cubicAt$$1(y0, y1, y2, y3, t);

            // Use line to approximate dashed bezier
            // Bad result if dash is long
            idx % 2 ? ctx.moveTo(x, y)
                : ctx.lineTo(x, y);

            t += lineDash[idx] / bezierLen;

            idx = (idx + 1) % nDash;
        }

        // Finish the last segment and calculate the new offset
        (idx % 2 !== 0) && ctx.lineTo(x3, y3);
        dx = x3 - x;
        dy = y3 - y;
        this._dashOffset = -mathSqrt$1(dx * dx + dy * dy);
    },

    _dashedQuadraticTo: function (x1, y1, x2, y2) {
        // Convert quadratic to cubic using degree elevation
        var x3 = x2;
        var y3 = y2;
        x2 = (x2 + 2 * x1) / 3;
        y2 = (y2 + 2 * y1) / 3;
        x1 = (this._xi + 2 * x1) / 3;
        y1 = (this._yi + 2 * y1) / 3;

        this._dashedBezierTo(x1, y1, x2, y2, x3, y3);
    },

    /**
     * 转成静态的 Float32Array 减少堆内存占用
     * Convert dynamic array to static Float32Array
     */
    toStatic: function () {
        var data = this.data;
        if (data instanceof Array) {
            data.length = this._len;
            if (hasTypedArray) {
                this.data = new Float32Array(data);
            }
        }
    },

    /**
     * @return {module:zrender/core/BoundingRect}
     */
    getBoundingRect: function () {
        min$1[0] = min$1[1] = min2[0] = min2[1] = Number.MAX_VALUE;
        max$1[0] = max$1[1] = max2[0] = max2[1] = -Number.MAX_VALUE;

        var data = this.data;
        var xi = 0;
        var yi = 0;
        var x0 = 0;
        var y0 = 0;

        for (var i = 0; i < data.length;) {
            var cmd = data[i++];

            if (i === 1) {
                // 如果第一个命令是 L, C, Q
                // 则 previous point 同绘制命令的第一个 point
                //
                // 第一个命令为 Arc 的情况下会在后面特殊处理
                xi = data[i];
                yi = data[i + 1];

                x0 = xi;
                y0 = yi;
            }

            switch (cmd) {
                case CMD.M:
                    // moveTo 命令重新创建一个新的 subpath, 并且更新新的起点
                    // 在 closePath 的时候使用
                    x0 = data[i++];
                    y0 = data[i++];
                    xi = x0;
                    yi = y0;
                    min2[0] = x0;
                    min2[1] = y0;
                    max2[0] = x0;
                    max2[1] = y0;
                    break;
                case CMD.L:
                    fromLine(xi, yi, data[i], data[i + 1], min2, max2);
                    xi = data[i++];
                    yi = data[i++];
                    break;
                case CMD.C:
                    fromCubic(
                        xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1],
                        min2, max2
                    );
                    xi = data[i++];
                    yi = data[i++];
                    break;
                case CMD.Q:
                    fromQuadratic(
                        xi, yi, data[i++], data[i++], data[i], data[i + 1],
                        min2, max2
                    );
                    xi = data[i++];
                    yi = data[i++];
                    break;
                case CMD.A:
                    // TODO Arc 判断的开销比较大
                    var cx = data[i++];
                    var cy = data[i++];
                    var rx = data[i++];
                    var ry = data[i++];
                    var startAngle = data[i++];
                    var endAngle = data[i++] + startAngle;
                    // TODO Arc 旋转
                    i += 1;
                    var anticlockwise = 1 - data[i++];

                    if (i === 1) {
                        // 直接使用 arc 命令
                        // 第一个命令起点还未定义
                        x0 = mathCos$1(startAngle) * rx + cx;
                        y0 = mathSin$1(startAngle) * ry + cy;
                    }

                    fromArc(
                        cx, cy, rx, ry, startAngle, endAngle,
                        anticlockwise, min2, max2
                    );

                    xi = mathCos$1(endAngle) * rx + cx;
                    yi = mathSin$1(endAngle) * ry + cy;
                    break;
                case CMD.R:
                    x0 = xi = data[i++];
                    y0 = yi = data[i++];
                    var width = data[i++];
                    var height = data[i++];
                    // Use fromLine
                    fromLine(x0, y0, x0 + width, y0 + height, min2, max2);
                    break;
                case CMD.Z:
                    xi = x0;
                    yi = y0;
                    break;
            }

            // Union
            min(min$1, min$1, min2);
            max(max$1, max$1, max2);
        }

        // No data
        if (i === 0) {
            min$1[0] = min$1[1] = max$1[0] = max$1[1] = 0;
        }

        return new BoundingRect(
            min$1[0], min$1[1], max$1[0] - min$1[0], max$1[1] - min$1[1]
        );
    },

    /**
     * Rebuild path from current data
     * Rebuild path will not consider javascript implemented line dash.
     * @param {CanvasRenderingContext2D} ctx
     */
    rebuildPath: function (ctx) {
        var d = this.data;
        var x0, y0;
        var xi, yi;
        var x, y;
        var ux = this._ux;
        var uy = this._uy;
        var len$$1 = this._len;
        for (var i = 0; i < len$$1;) {
            var cmd = d[i++];

            if (i === 1) {
                // 如果第一个命令是 L, C, Q
                // 则 previous point 同绘制命令的第一个 point
                //
                // 第一个命令为 Arc 的情况下会在后面特殊处理
                xi = d[i];
                yi = d[i + 1];

                x0 = xi;
                y0 = yi;
            }
            switch (cmd) {
                case CMD.M:
                    x0 = xi = d[i++];
                    y0 = yi = d[i++];
                    ctx.moveTo(xi, yi);
                    break;
                case CMD.L:
                    x = d[i++];
                    y = d[i++];
                    // Not draw too small seg between
                    if (mathAbs(x - xi) > ux || mathAbs(y - yi) > uy || i === len$$1 - 1) {
                        ctx.lineTo(x, y);
                        xi = x;
                        yi = y;
                    }
                    break;
                case CMD.C:
                    ctx.bezierCurveTo(
                        d[i++], d[i++], d[i++], d[i++], d[i++], d[i++]
                    );
                    xi = d[i - 2];
                    yi = d[i - 1];
                    break;
                case CMD.Q:
                    ctx.quadraticCurveTo(d[i++], d[i++], d[i++], d[i++]);
                    xi = d[i - 2];
                    yi = d[i - 1];
                    break;
                case CMD.A:
                    var cx = d[i++];
                    var cy = d[i++];
                    var rx = d[i++];
                    var ry = d[i++];
                    var theta = d[i++];
                    var dTheta = d[i++];
                    var psi = d[i++];
                    var fs = d[i++];
                    var r = (rx > ry) ? rx : ry;
                    var scaleX = (rx > ry) ? 1 : rx / ry;
                    var scaleY = (rx > ry) ? ry / rx : 1;
                    var isEllipse = Math.abs(rx - ry) > 1e-3;
                    var endAngle = theta + dTheta;
                    if (isEllipse) {
                        ctx.translate(cx, cy);
                        ctx.rotate(psi);
                        ctx.scale(scaleX, scaleY);
                        ctx.arc(0, 0, r, theta, endAngle, 1 - fs);
                        ctx.scale(1 / scaleX, 1 / scaleY);
                        ctx.rotate(-psi);
                        ctx.translate(-cx, -cy);
                    }
                    else {
                        ctx.arc(cx, cy, r, theta, endAngle, 1 - fs);
                    }

                    if (i === 1) {
                        // 直接使用 arc 命令
                        // 第一个命令起点还未定义
                        x0 = mathCos$1(theta) * rx + cx;
                        y0 = mathSin$1(theta) * ry + cy;
                    }
                    xi = mathCos$1(endAngle) * rx + cx;
                    yi = mathSin$1(endAngle) * ry + cy;
                    break;
                case CMD.R:
                    x0 = xi = d[i];
                    y0 = yi = d[i + 1];
                    ctx.rect(d[i++], d[i++], d[i++], d[i++]);
                    break;
                case CMD.Z:
                    ctx.closePath();
                    xi = x0;
                    yi = y0;
            }
        }
    }
};

PathProxy.CMD = CMD;

/**
 * 线段包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function containStroke$1(x0, y0, x1, y1, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    var _a = 0;
    var _b = x0;
    // Quick reject
    if (
        (y > y0 + _l && y > y1 + _l)
        || (y < y0 - _l && y < y1 - _l)
        || (x > x0 + _l && x > x1 + _l)
        || (x < x0 - _l && x < x1 - _l)
    ) {
        return false;
    }

    if (x0 !== x1) {
        _a = (y0 - y1) / (x0 - x1);
        _b = (x0 * y1 - x1 * y0) / (x0 - x1);
    }
    else {
        return Math.abs(x - x0) <= _l / 2;
    }
    var tmp = _a * x - y + _b;
    var _s = tmp * tmp / (_a * _a + 1);
    return _s <= _l / 2 * _l / 2;
}

/**
 * 三次贝塞尔曲线描边包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  x2
 * @param  {number}  y2
 * @param  {number}  x3
 * @param  {number}  y3
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function containStroke$2(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    // Quick reject
    if (
        (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l)
        || (y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l)
        || (x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l)
        || (x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)
    ) {
        return false;
    }
    var d = cubicProjectPoint(
        x0, y0, x1, y1, x2, y2, x3, y3,
        x, y, null
    );
    return d <= _l / 2;
}

/**
 * 二次贝塞尔曲线描边包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  x2
 * @param  {number}  y2
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function containStroke$3(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    // Quick reject
    if (
        (y > y0 + _l && y > y1 + _l && y > y2 + _l)
        || (y < y0 - _l && y < y1 - _l && y < y2 - _l)
        || (x > x0 + _l && x > x1 + _l && x > x2 + _l)
        || (x < x0 - _l && x < x1 - _l && x < x2 - _l)
    ) {
        return false;
    }
    var d = quadraticProjectPoint(
        x0, y0, x1, y1, x2, y2,
        x, y, null
    );
    return d <= _l / 2;
}

var PI2$3 = Math.PI * 2;

function normalizeRadian(angle) {
    angle %= PI2$3;
    if (angle < 0) {
        angle += PI2$3;
    }
    return angle;
}

var PI2$2 = Math.PI * 2;

/**
 * 圆弧描边包含判断
 * @param  {number}  cx
 * @param  {number}  cy
 * @param  {number}  r
 * @param  {number}  startAngle
 * @param  {number}  endAngle
 * @param  {boolean}  anticlockwise
 * @param  {number} lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {Boolean}
 */
function containStroke$4(
    cx, cy, r, startAngle, endAngle, anticlockwise,
    lineWidth, x, y
) {

    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;

    x -= cx;
    y -= cy;
    var d = Math.sqrt(x * x + y * y);

    if ((d - _l > r) || (d + _l < r)) {
        return false;
    }
    if (Math.abs(startAngle - endAngle) % PI2$2 < 1e-4) {
        // Is a circle
        return true;
    }
    if (anticlockwise) {
        var tmp = startAngle;
        startAngle = normalizeRadian(endAngle);
        endAngle = normalizeRadian(tmp);
    }
    else {
        startAngle = normalizeRadian(startAngle);
        endAngle = normalizeRadian(endAngle);
    }
    if (startAngle > endAngle) {
        endAngle += PI2$2;
    }

    var angle = Math.atan2(y, x);
    if (angle < 0) {
        angle += PI2$2;
    }
    return (angle >= startAngle && angle <= endAngle)
        || (angle + PI2$2 >= startAngle && angle + PI2$2 <= endAngle);
}

function windingLine(x0, y0, x1, y1, x, y) {
    if ((y > y0 && y > y1) || (y < y0 && y < y1)) {
        return 0;
    }
    // Ignore horizontal line
    if (y1 === y0) {
        return 0;
    }
    var dir = y1 < y0 ? 1 : -1;
    var t = (y - y0) / (y1 - y0);

    // Avoid winding error when intersection point is the connect point of two line of polygon
    if (t === 1 || t === 0) {
        dir = y1 < y0 ? 0.5 : -0.5;
    }

    var x_ = t * (x1 - x0) + x0;

    // If (x, y) on the line, considered as "contain".
    return x_ === x ? Infinity : x_ > x ? dir : 0;
}

var CMD$1 = PathProxy.CMD;
var PI2$1 = Math.PI * 2;

var EPSILON$2 = 1e-4;

function isAroundEqual(a, b) {
    return Math.abs(a - b) < EPSILON$2;
}

// 临时数组
var roots = [-1, -1, -1];
var extrema = [-1, -1];

function swapExtrema() {
    var tmp = extrema[0];
    extrema[0] = extrema[1];
    extrema[1] = tmp;
}

function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
    // Quick reject
    if (
        (y > y0 && y > y1 && y > y2 && y > y3)
        || (y < y0 && y < y1 && y < y2 && y < y3)
    ) {
        return 0;
    }
    var nRoots = cubicRootAt(y0, y1, y2, y3, y, roots);
    if (nRoots === 0) {
        return 0;
    }
    else {
        var w = 0;
        var nExtrema = -1;
        var y0_;
        var y1_;
        for (var i = 0; i < nRoots; i++) {
            var t = roots[i];

            // Avoid winding error when intersection point is the connect point of two line of polygon
            var unit = (t === 0 || t === 1) ? 0.5 : 1;

            var x_ = cubicAt(x0, x1, x2, x3, t);
            if (x_ < x) { // Quick reject
                continue;
            }
            if (nExtrema < 0) {
                nExtrema = cubicExtrema(y0, y1, y2, y3, extrema);
                if (extrema[1] < extrema[0] && nExtrema > 1) {
                    swapExtrema();
                }
                y0_ = cubicAt(y0, y1, y2, y3, extrema[0]);
                if (nExtrema > 1) {
                    y1_ = cubicAt(y0, y1, y2, y3, extrema[1]);
                }
            }
            if (nExtrema === 2) {
                // 分成三段单调函数
                if (t < extrema[0]) {
                    w += y0_ < y0 ? unit : -unit;
                }
                else if (t < extrema[1]) {
                    w += y1_ < y0_ ? unit : -unit;
                }
                else {
                    w += y3 < y1_ ? unit : -unit;
                }
            }
            else {
                // 分成两段单调函数
                if (t < extrema[0]) {
                    w += y0_ < y0 ? unit : -unit;
                }
                else {
                    w += y3 < y0_ ? unit : -unit;
                }
            }
        }
        return w;
    }
}

function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
    // Quick reject
    if (
        (y > y0 && y > y1 && y > y2)
        || (y < y0 && y < y1 && y < y2)
    ) {
        return 0;
    }
    var nRoots = quadraticRootAt(y0, y1, y2, y, roots);
    if (nRoots === 0) {
        return 0;
    }
    else {
        var t = quadraticExtremum(y0, y1, y2);
        if (t >= 0 && t <= 1) {
            var w = 0;
            var y_ = quadraticAt(y0, y1, y2, t);
            for (var i = 0; i < nRoots; i++) {
                // Remove one endpoint.
                var unit = (roots[i] === 0 || roots[i] === 1) ? 0.5 : 1;

                var x_ = quadraticAt(x0, x1, x2, roots[i]);
                if (x_ < x) {   // Quick reject
                    continue;
                }
                if (roots[i] < t) {
                    w += y_ < y0 ? unit : -unit;
                }
                else {
                    w += y2 < y_ ? unit : -unit;
                }
            }
            return w;
        }
        else {
            // Remove one endpoint.
            var unit = (roots[0] === 0 || roots[0] === 1) ? 0.5 : 1;

            var x_ = quadraticAt(x0, x1, x2, roots[0]);
            if (x_ < x) {   // Quick reject
                return 0;
            }
            return y2 < y0 ? unit : -unit;
        }
    }
}

// TODO
// Arc 旋转
function windingArc(
    cx, cy, r, startAngle, endAngle, anticlockwise, x, y
) {
    y -= cy;
    if (y > r || y < -r) {
        return 0;
    }
    var tmp = Math.sqrt(r * r - y * y);
    roots[0] = -tmp;
    roots[1] = tmp;

    var diff = Math.abs(startAngle - endAngle);
    if (diff < 1e-4) {
        return 0;
    }
    if (diff % PI2$1 < 1e-4) {
        // Is a circle
        startAngle = 0;
        endAngle = PI2$1;
        var dir = anticlockwise ? 1 : -1;
        if (x >= roots[0] + cx && x <= roots[1] + cx) {
            return dir;
        }
        else {
            return 0;
        }
    }

    if (anticlockwise) {
        var tmp = startAngle;
        startAngle = normalizeRadian(endAngle);
        endAngle = normalizeRadian(tmp);
    }
    else {
        startAngle = normalizeRadian(startAngle);
        endAngle = normalizeRadian(endAngle);
    }
    if (startAngle > endAngle) {
        endAngle += PI2$1;
    }

    var w = 0;
    for (var i = 0; i < 2; i++) {
        var x_ = roots[i];
        if (x_ + cx > x) {
            var angle = Math.atan2(y, x_);
            var dir = anticlockwise ? 1 : -1;
            if (angle < 0) {
                angle = PI2$1 + angle;
            }
            if (
                (angle >= startAngle && angle <= endAngle)
                || (angle + PI2$1 >= startAngle && angle + PI2$1 <= endAngle)
            ) {
                if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
                    dir = -dir;
                }
                w += dir;
            }
        }
    }
    return w;
}

function containPath(data, lineWidth, isStroke, x, y) {
    var w = 0;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;

    for (var i = 0; i < data.length;) {
        var cmd = data[i++];
        // Begin a new subpath
        if (cmd === CMD$1.M && i > 1) {
            // Close previous subpath
            if (!isStroke) {
                w += windingLine(xi, yi, x0, y0, x, y);
            }
            // 如果被任何一个 subpath 包含
            // if (w !== 0) {
            //     return true;
            // }
        }

        if (i === 1) {
            // 如果第一个命令是 L, C, Q
            // 则 previous point 同绘制命令的第一个 point
            //
            // 第一个命令为 Arc 的情况下会在后面特殊处理
            xi = data[i];
            yi = data[i + 1];

            x0 = xi;
            y0 = yi;
        }

        switch (cmd) {
            case CMD$1.M:
                // moveTo 命令重新创建一个新的 subpath, 并且更新新的起点
                // 在 closePath 的时候使用
                x0 = data[i++];
                y0 = data[i++];
                xi = x0;
                yi = y0;
                break;
            case CMD$1.L:
                if (isStroke) {
                    if (containStroke$1(xi, yi, data[i], data[i + 1], lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    // NOTE 在第一个命令为 L, C, Q 的时候会计算出 NaN
                    w += windingLine(xi, yi, data[i], data[i + 1], x, y) || 0;
                }
                xi = data[i++];
                yi = data[i++];
                break;
            case CMD$1.C:
                if (isStroke) {
                    if (containStroke$2(xi, yi,
                        data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1],
                        lineWidth, x, y
                    )) {
                        return true;
                    }
                }
                else {
                    w += windingCubic(
                        xi, yi,
                        data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1],
                        x, y
                    ) || 0;
                }
                xi = data[i++];
                yi = data[i++];
                break;
            case CMD$1.Q:
                if (isStroke) {
                    if (containStroke$3(xi, yi,
                        data[i++], data[i++], data[i], data[i + 1],
                        lineWidth, x, y
                    )) {
                        return true;
                    }
                }
                else {
                    w += windingQuadratic(
                        xi, yi,
                        data[i++], data[i++], data[i], data[i + 1],
                        x, y
                    ) || 0;
                }
                xi = data[i++];
                yi = data[i++];
                break;
            case CMD$1.A:
                // TODO Arc 判断的开销比较大
                var cx = data[i++];
                var cy = data[i++];
                var rx = data[i++];
                var ry = data[i++];
                var theta = data[i++];
                var dTheta = data[i++];
                // TODO Arc 旋转
                i += 1;
                var anticlockwise = 1 - data[i++];
                var x1 = Math.cos(theta) * rx + cx;
                var y1 = Math.sin(theta) * ry + cy;
                // 不是直接使用 arc 命令
                if (i > 1) {
                    w += windingLine(xi, yi, x1, y1, x, y);
                }
                else {
                    // 第一个命令起点还未定义
                    x0 = x1;
                    y0 = y1;
                }
                // zr 使用scale来模拟椭圆, 这里也对x做一定的缩放
                var _x = (x - cx) * ry / rx + cx;
                if (isStroke) {
                    if (containStroke$4(
                        cx, cy, ry, theta, theta + dTheta, anticlockwise,
                        lineWidth, _x, y
                    )) {
                        return true;
                    }
                }
                else {
                    w += windingArc(
                        cx, cy, ry, theta, theta + dTheta, anticlockwise,
                        _x, y
                    );
                }
                xi = Math.cos(theta + dTheta) * rx + cx;
                yi = Math.sin(theta + dTheta) * ry + cy;
                break;
            case CMD$1.R:
                x0 = xi = data[i++];
                y0 = yi = data[i++];
                var width = data[i++];
                var height = data[i++];
                var x1 = x0 + width;
                var y1 = y0 + height;
                if (isStroke) {
                    if (containStroke$1(x0, y0, x1, y0, lineWidth, x, y)
                        || containStroke$1(x1, y0, x1, y1, lineWidth, x, y)
                        || containStroke$1(x1, y1, x0, y1, lineWidth, x, y)
                        || containStroke$1(x0, y1, x0, y0, lineWidth, x, y)
                    ) {
                        return true;
                    }
                }
                else {
                    // FIXME Clockwise ?
                    w += windingLine(x1, y0, x1, y1, x, y);
                    w += windingLine(x0, y1, x0, y0, x, y);
                }
                break;
            case CMD$1.Z:
                if (isStroke) {
                    if (containStroke$1(
                        xi, yi, x0, y0, lineWidth, x, y
                    )) {
                        return true;
                    }
                }
                else {
                    // Close a subpath
                    w += windingLine(xi, yi, x0, y0, x, y);
                    // 如果被任何一个 subpath 包含
                    // FIXME subpaths may overlap
                    // if (w !== 0) {
                    //     return true;
                    // }
                }
                xi = x0;
                yi = y0;
                break;
        }
    }
    if (!isStroke && !isAroundEqual(yi, y0)) {
        w += windingLine(xi, yi, x0, y0, x, y) || 0;
    }
    return w !== 0;
}

function contain(pathData, x, y) {
    return containPath(pathData, 0, false, x, y);
}

function containStroke(pathData, lineWidth, x, y) {
    return containPath(pathData, lineWidth, true, x, y);
}

var getCanvasPattern = Pattern.prototype.getCanvasPattern;

var abs = Math.abs;

var pathProxyForDraw = new PathProxy(true);
/**
 * @alias module:zrender/graphic/Path
 * @extends module:zrender/graphic/Displayable
 * @constructor
 * @param {Object} opts
 */
function Path(opts) {
    Displayable.call(this, opts);

    /**
     * @type {module:zrender/core/PathProxy}
     * @readOnly
     */
    this.path = null;
}

Path.prototype = {

    constructor: Path,

    type: 'path',

    __dirtyPath: true,

    strokeContainThreshold: 5,

    /**
     * See `module:zrender/src/graphic/helper/subPixelOptimize`.
     * @type {boolean}
     */
    subPixelOptimize: false,

    brush: function (ctx, prevEl) {
        var style = this.style;
        var path = this.path || pathProxyForDraw;
        var hasStroke = style.hasStroke();
        var hasFill = style.hasFill();
        var fill = style.fill;
        var stroke = style.stroke;
        var hasFillGradient = hasFill && !!(fill.colorStops);
        var hasStrokeGradient = hasStroke && !!(stroke.colorStops);
        var hasFillPattern = hasFill && !!(fill.image);
        var hasStrokePattern = hasStroke && !!(stroke.image);

        style.bind(ctx, this, prevEl);
        this.setTransform(ctx);

        if (this.__dirty) {
            var rect;
            // Update gradient because bounding rect may changed
            if (hasFillGradient) {
                rect = rect || this.getBoundingRect();
                this._fillGradient = style.getGradient(ctx, fill, rect);
            }
            if (hasStrokeGradient) {
                rect = rect || this.getBoundingRect();
                this._strokeGradient = style.getGradient(ctx, stroke, rect);
            }
        }
        // Use the gradient or pattern
        if (hasFillGradient) {
            // PENDING If may have affect the state
            ctx.fillStyle = this._fillGradient;
        }
        else if (hasFillPattern) {
            ctx.fillStyle = getCanvasPattern.call(fill, ctx);
        }
        if (hasStrokeGradient) {
            ctx.strokeStyle = this._strokeGradient;
        }
        else if (hasStrokePattern) {
            ctx.strokeStyle = getCanvasPattern.call(stroke, ctx);
        }

        var lineDash = style.lineDash;
        var lineDashOffset = style.lineDashOffset;

        var ctxLineDash = !!ctx.setLineDash;

        // Update path sx, sy
        var scale = this.getGlobalScale();
        path.setScale(scale[0], scale[1]);

        // Proxy context
        // Rebuild path in following 2 cases
        // 1. Path is dirty
        // 2. Path needs javascript implemented lineDash stroking.
        //    In this case, lineDash information will not be saved in PathProxy
        if (this.__dirtyPath
            || (lineDash && !ctxLineDash && hasStroke)
        ) {
            path.beginPath(ctx);

            // Setting line dash before build path
            if (lineDash && !ctxLineDash) {
                path.setLineDash(lineDash);
                path.setLineDashOffset(lineDashOffset);
            }

            this.buildPath(path, this.shape, false);

            // Clear path dirty flag
            if (this.path) {
                this.__dirtyPath = false;
            }
        }
        else {
            // Replay path building
            ctx.beginPath();
            this.path.rebuildPath(ctx);
        }

        if (hasFill) {
            if (style.fillOpacity != null) {
                var originalGlobalAlpha = ctx.globalAlpha;
                ctx.globalAlpha = style.fillOpacity * style.opacity;
                path.fill(ctx);
                ctx.globalAlpha = originalGlobalAlpha;
            }
            else {
                path.fill(ctx);
            }
        }

        if (lineDash && ctxLineDash) {
            ctx.setLineDash(lineDash);
            ctx.lineDashOffset = lineDashOffset;
        }

        if (hasStroke) {
            if (style.strokeOpacity != null) {
                var originalGlobalAlpha = ctx.globalAlpha;
                ctx.globalAlpha = style.strokeOpacity * style.opacity;
                path.stroke(ctx);
                ctx.globalAlpha = originalGlobalAlpha;
            }
            else {
                path.stroke(ctx);
            }
        }

        if (lineDash && ctxLineDash) {
            // PENDING
            // Remove lineDash
            ctx.setLineDash([]);
        }

        // Draw rect text
        if (style.text != null) {
            // Only restore transform when needs draw text.
            this.restoreTransform(ctx);
            this.drawRectText(ctx, this.getBoundingRect());
        }
    },

    // When bundling path, some shape may decide if use moveTo to begin a new subpath or closePath
    // Like in circle
    buildPath: function (ctx, shapeCfg, inBundle) {},

    createPathProxy: function () {
        this.path = new PathProxy();
    },

    getBoundingRect: function () {
        var rect = this._rect;
        var style = this.style;
        var needsUpdateRect = !rect;
        if (needsUpdateRect) {
            var path = this.path;
            if (!path) {
                // Create path on demand.
                path = this.path = new PathProxy();
            }
            if (this.__dirtyPath) {
                path.beginPath();
                this.buildPath(path, this.shape, false);
            }
            rect = path.getBoundingRect();
        }
        this._rect = rect;

        if (style.hasStroke()) {
            // Needs update rect with stroke lineWidth when
            // 1. Element changes scale or lineWidth
            // 2. Shape is changed
            var rectWithStroke = this._rectWithStroke || (this._rectWithStroke = rect.clone());
            if (this.__dirty || needsUpdateRect) {
                rectWithStroke.copy(rect);
                // FIXME Must after updateTransform
                var w = style.lineWidth;
                // PENDING, Min line width is needed when line is horizontal or vertical
                var lineScale = style.strokeNoScale ? this.getLineScale() : 1;

                // Only add extra hover lineWidth when there are no fill
                if (!style.hasFill()) {
                    w = Math.max(w, this.strokeContainThreshold || 4);
                }
                // Consider line width
                // Line scale can't be 0;
                if (lineScale > 1e-10) {
                    rectWithStroke.width += w / lineScale;
                    rectWithStroke.height += w / lineScale;
                    rectWithStroke.x -= w / lineScale / 2;
                    rectWithStroke.y -= w / lineScale / 2;
                }
            }

            // Return rect with stroke
            return rectWithStroke;
        }

        return rect;
    },

    contain: function (x, y) {
        var localPos = this.transformCoordToLocal(x, y);
        var rect = this.getBoundingRect();
        var style = this.style;
        x = localPos[0];
        y = localPos[1];

        if (rect.contain(x, y)) {
            var pathData = this.path.data;
            if (style.hasStroke()) {
                var lineWidth = style.lineWidth;
                var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
                // Line scale can't be 0;
                if (lineScale > 1e-10) {
                    // Only add extra hover lineWidth when there are no fill
                    if (!style.hasFill()) {
                        lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
                    }
                    if (containStroke(
                        pathData, lineWidth / lineScale, x, y
                    )) {
                        return true;
                    }
                }
            }
            if (style.hasFill()) {
                return contain(pathData, x, y);
            }
        }
        return false;
    },

    /**
     * @param  {boolean} dirtyPath
     */
    dirty: function (dirtyPath) {
        if (dirtyPath == null) {
            dirtyPath = true;
        }
        // Only mark dirty, not mark clean
        if (dirtyPath) {
            this.__dirtyPath = dirtyPath;
            this._rect = null;
        }

        this.__dirty = this.__dirtyText = true;

        this.__zr && this.__zr.refresh();

        // Used as a clipping path
        if (this.__clipTarget) {
            this.__clipTarget.dirty();
        }
    },

    /**
     * Alias for animate('shape')
     * @param {boolean} loop
     */
    animateShape: function (loop) {
        return this.animate('shape', loop);
    },

    // Overwrite attrKV
    attrKV: function (key, value) {
        // FIXME
        if (key === 'shape') {
            this.setShape(value);
            this.__dirtyPath = true;
            this._rect = null;
        }
        else {
            Displayable.prototype.attrKV.call(this, key, value);
        }
    },

    /**
     * @param {Object|string} key
     * @param {*} value
     */
    setShape: function (key, value) {
        var shape = this.shape;
        // Path from string may not have shape
        if (shape) {
            if (isObject(key)) {
                for (var name in key) {
                    if (key.hasOwnProperty(name)) {
                        shape[name] = key[name];
                    }
                }
            }
            else {
                shape[key] = value;
            }
            this.dirty(true);
        }
        return this;
    },

    getLineScale: function () {
        var m = this.transform;
        // Get the line scale.
        // Determinant of `m` means how much the area is enlarged by the
        // transformation. So its square root can be used as a scale factor
        // for width.
        return m && abs(m[0] - 1) > 1e-10 && abs(m[3] - 1) > 1e-10
            ? Math.sqrt(abs(m[0] * m[3] - m[2] * m[1]))
            : 1;
    }
};

/**
 * 扩展一个 Path element, 比如星形，圆等。
 * Extend a path element
 * @param {Object} props
 * @param {string} props.type Path type
 * @param {Function} props.init Initialize
 * @param {Function} props.buildPath Overwrite buildPath method
 * @param {Object} [props.style] Extended default style config
 * @param {Object} [props.shape] Extended default shape config
 */
Path.extend = function (defaults$$1) {
    var Sub = function (opts) {
        Path.call(this, opts);

        if (defaults$$1.style) {
            // Extend default style
            this.style.extendFrom(defaults$$1.style, false);
        }

        // Extend default shape
        var defaultShape = defaults$$1.shape;
        if (defaultShape) {
            this.shape = this.shape || {};
            var thisShape = this.shape;
            for (var name in defaultShape) {
                if (
                    !thisShape.hasOwnProperty(name)
                    && defaultShape.hasOwnProperty(name)
                ) {
                    thisShape[name] = defaultShape[name];
                }
            }
        }

        defaults$$1.init && defaults$$1.init.call(this, opts);
    };

    inherits(Sub, Path);

    // FIXME 不能 extend position, rotation 等引用对象
    for (var name in defaults$$1) {
        // Extending prototype values and methods
        if (name !== 'style' && name !== 'shape') {
            Sub.prototype[name] = defaults$$1[name];
        }
    }

    return Sub;
};

inherits(Path, Displayable);

var CMD$2 = PathProxy.CMD;

var points = [[], [], []];
var mathSqrt$3 = Math.sqrt;
var mathAtan2 = Math.atan2;

var transformPath = function (path, m) {
    var data = path.data;
    var cmd;
    var nPoint;
    var i;
    var j;
    var k;
    var p;

    var M = CMD$2.M;
    var C = CMD$2.C;
    var L = CMD$2.L;
    var R = CMD$2.R;
    var A = CMD$2.A;
    var Q = CMD$2.Q;

    for (i = 0, j = 0; i < data.length;) {
        cmd = data[i++];
        j = i;
        nPoint = 0;

        switch (cmd) {
            case M:
                nPoint = 1;
                break;
            case L:
                nPoint = 1;
                break;
            case C:
                nPoint = 3;
                break;
            case Q:
                nPoint = 2;
                break;
            case A:
                var x = m[4];
                var y = m[5];
                var sx = mathSqrt$3(m[0] * m[0] + m[1] * m[1]);
                var sy = mathSqrt$3(m[2] * m[2] + m[3] * m[3]);
                var angle = mathAtan2(-m[1] / sy, m[0] / sx);
                // cx
                data[i] *= sx;
                data[i++] += x;
                // cy
                data[i] *= sy;
                data[i++] += y;
                // Scale rx and ry
                // FIXME Assume psi is 0 here
                data[i++] *= sx;
                data[i++] *= sy;

                // Start angle
                data[i++] += angle;
                // end angle
                data[i++] += angle;
                // FIXME psi
                i += 2;
                j = i;
                break;
            case R:
                // x0, y0
                p[0] = data[i++];
                p[1] = data[i++];
                applyTransform(p, p, m);
                data[j++] = p[0];
                data[j++] = p[1];
                // x1, y1
                p[0] += data[i++];
                p[1] += data[i++];
                applyTransform(p, p, m);
                data[j++] = p[0];
                data[j++] = p[1];
        }

        for (k = 0; k < nPoint; k++) {
            var p = points[k];
            p[0] = data[i++];
            p[1] = data[i++];

            applyTransform(p, p, m);
            // Write back
            data[j++] = p[0];
            data[j++] = p[1];
        }
    }
};

// command chars
// var cc = [
//     'm', 'M', 'l', 'L', 'v', 'V', 'h', 'H', 'z', 'Z',
//     'c', 'C', 'q', 'Q', 't', 'T', 's', 'S', 'a', 'A'
// ];

var mathSqrt = Math.sqrt;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI = Math.PI;

var vMag = function (v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
};
var vRatio = function (u, v) {
    return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
};
var vAngle = function (u, v) {
    return (u[0] * v[1] < u[1] * v[0] ? -1 : 1)
            * Math.acos(vRatio(u, v));
};

function processArc(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg, cmd, path) {
    var psi = psiDeg * (PI / 180.0);
    var xp = mathCos(psi) * (x1 - x2) / 2.0
                + mathSin(psi) * (y1 - y2) / 2.0;
    var yp = -1 * mathSin(psi) * (x1 - x2) / 2.0
                + mathCos(psi) * (y1 - y2) / 2.0;

    var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);

    if (lambda > 1) {
        rx *= mathSqrt(lambda);
        ry *= mathSqrt(lambda);
    }

    var f = (fa === fs ? -1 : 1)
        * mathSqrt((((rx * rx) * (ry * ry))
                - ((rx * rx) * (yp * yp))
                - ((ry * ry) * (xp * xp))) / ((rx * rx) * (yp * yp)
                + (ry * ry) * (xp * xp))
            ) || 0;

    var cxp = f * rx * yp / ry;
    var cyp = f * -ry * xp / rx;

    var cx = (x1 + x2) / 2.0
                + mathCos(psi) * cxp
                - mathSin(psi) * cyp;
    var cy = (y1 + y2) / 2.0
            + mathSin(psi) * cxp
            + mathCos(psi) * cyp;

    var theta = vAngle([ 1, 0 ], [ (xp - cxp) / rx, (yp - cyp) / ry ]);
    var u = [ (xp - cxp) / rx, (yp - cyp) / ry ];
    var v = [ (-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry ];
    var dTheta = vAngle(u, v);

    if (vRatio(u, v) <= -1) {
        dTheta = PI;
    }
    if (vRatio(u, v) >= 1) {
        dTheta = 0;
    }
    if (fs === 0 && dTheta > 0) {
        dTheta = dTheta - 2 * PI;
    }
    if (fs === 1 && dTheta < 0) {
        dTheta = dTheta + 2 * PI;
    }

    path.addData(cmd, cx, cy, rx, ry, theta, dTheta, psi, fs);
}


var commandReg = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig;
// Consider case:
// (1) delimiter can be comma or space, where continuous commas
// or spaces should be seen as one comma.
// (2) value can be like:
// '2e-4', 'l.5.9' (ignore 0), 'M-10-10', 'l-2.43e-1,34.9983',
// 'l-.5E1,54', '121-23-44-11' (no delimiter)
var numberReg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
// var valueSplitReg = /[\s,]+/;

function createPathProxyFromString(data) {
    if (!data) {
        return new PathProxy();
    }

    // var data = data.replace(/-/g, ' -')
    //     .replace(/  /g, ' ')
    //     .replace(/ /g, ',')
    //     .replace(/,,/g, ',');

    // var n;
    // create pipes so that we can split the data
    // for (n = 0; n < cc.length; n++) {
    //     cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
    // }

    // data = data.replace(/-/g, ',-');

    // create array
    // var arr = cs.split('|');
    // init context point
    var cpx = 0;
    var cpy = 0;
    var subpathX = cpx;
    var subpathY = cpy;
    var prevCmd;

    var path = new PathProxy();
    var CMD = PathProxy.CMD;

    // commandReg.lastIndex = 0;
    // var cmdResult;
    // while ((cmdResult = commandReg.exec(data)) != null) {
    //     var cmdStr = cmdResult[1];
    //     var cmdContent = cmdResult[2];

    var cmdList = data.match(commandReg);
    for (var l = 0; l < cmdList.length; l++) {
        var cmdText = cmdList[l];
        var cmdStr = cmdText.charAt(0);

        var cmd;

        // String#split is faster a little bit than String#replace or RegExp#exec.
        // var p = cmdContent.split(valueSplitReg);
        // var pLen = 0;
        // for (var i = 0; i < p.length; i++) {
        //     // '' and other invalid str => NaN
        //     var val = parseFloat(p[i]);
        //     !isNaN(val) && (p[pLen++] = val);
        // }

        var p = cmdText.match(numberReg) || [];
        var pLen = p.length;
        for (var i = 0; i < pLen; i++) {
            p[i] = parseFloat(p[i]);
        }

        var off = 0;
        while (off < pLen) {
            var ctlPtx;
            var ctlPty;

            var rx;
            var ry;
            var psi;
            var fa;
            var fs;

            var x1 = cpx;
            var y1 = cpy;

            // convert l, H, h, V, and v to L
            switch (cmdStr) {
                case 'l':
                    cpx += p[off++];
                    cpy += p[off++];
                    cmd = CMD.L;
                    path.addData(cmd, cpx, cpy);
                    break;
                case 'L':
                    cpx = p[off++];
                    cpy = p[off++];
                    cmd = CMD.L;
                    path.addData(cmd, cpx, cpy);
                    break;
                case 'm':
                    cpx += p[off++];
                    cpy += p[off++];
                    cmd = CMD.M;
                    path.addData(cmd, cpx, cpy);
                    subpathX = cpx;
                    subpathY = cpy;
                    cmdStr = 'l';
                    break;
                case 'M':
                    cpx = p[off++];
                    cpy = p[off++];
                    cmd = CMD.M;
                    path.addData(cmd, cpx, cpy);
                    subpathX = cpx;
                    subpathY = cpy;
                    cmdStr = 'L';
                    break;
                case 'h':
                    cpx += p[off++];
                    cmd = CMD.L;
                    path.addData(cmd, cpx, cpy);
                    break;
                case 'H':
                    cpx = p[off++];
                    cmd = CMD.L;
                    path.addData(cmd, cpx, cpy);
                    break;
                case 'v':
                    cpy += p[off++];
                    cmd = CMD.L;
                    path.addData(cmd, cpx, cpy);
                    break;
                case 'V':
                    cpy = p[off++];
                    cmd = CMD.L;
                    path.addData(cmd, cpx, cpy);
                    break;
                case 'C':
                    cmd = CMD.C;
                    path.addData(
                        cmd, p[off++], p[off++], p[off++], p[off++], p[off++], p[off++]
                    );
                    cpx = p[off - 2];
                    cpy = p[off - 1];
                    break;
                case 'c':
                    cmd = CMD.C;
                    path.addData(
                        cmd,
                        p[off++] + cpx, p[off++] + cpy,
                        p[off++] + cpx, p[off++] + cpy,
                        p[off++] + cpx, p[off++] + cpy
                    );
                    cpx += p[off - 2];
                    cpy += p[off - 1];
                    break;
                case 'S':
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    var len = path.len();
                    var pathData = path.data;
                    if (prevCmd === CMD.C) {
                        ctlPtx += cpx - pathData[len - 4];
                        ctlPty += cpy - pathData[len - 3];
                    }
                    cmd = CMD.C;
                    x1 = p[off++];
                    y1 = p[off++];
                    cpx = p[off++];
                    cpy = p[off++];
                    path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
                    break;
                case 's':
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    var len = path.len();
                    var pathData = path.data;
                    if (prevCmd === CMD.C) {
                        ctlPtx += cpx - pathData[len - 4];
                        ctlPty += cpy - pathData[len - 3];
                    }
                    cmd = CMD.C;
                    x1 = cpx + p[off++];
                    y1 = cpy + p[off++];
                    cpx += p[off++];
                    cpy += p[off++];
                    path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
                    break;
                case 'Q':
                    x1 = p[off++];
                    y1 = p[off++];
                    cpx = p[off++];
                    cpy = p[off++];
                    cmd = CMD.Q;
                    path.addData(cmd, x1, y1, cpx, cpy);
                    break;
                case 'q':
                    x1 = p[off++] + cpx;
                    y1 = p[off++] + cpy;
                    cpx += p[off++];
                    cpy += p[off++];
                    cmd = CMD.Q;
                    path.addData(cmd, x1, y1, cpx, cpy);
                    break;
                case 'T':
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    var len = path.len();
                    var pathData = path.data;
                    if (prevCmd === CMD.Q) {
                        ctlPtx += cpx - pathData[len - 4];
                        ctlPty += cpy - pathData[len - 3];
                    }
                    cpx = p[off++];
                    cpy = p[off++];
                    cmd = CMD.Q;
                    path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
                    break;
                case 't':
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    var len = path.len();
                    var pathData = path.data;
                    if (prevCmd === CMD.Q) {
                        ctlPtx += cpx - pathData[len - 4];
                        ctlPty += cpy - pathData[len - 3];
                    }
                    cpx += p[off++];
                    cpy += p[off++];
                    cmd = CMD.Q;
                    path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
                    break;
                case 'A':
                    rx = p[off++];
                    ry = p[off++];
                    psi = p[off++];
                    fa = p[off++];
                    fs = p[off++];

                    x1 = cpx, y1 = cpy;
                    cpx = p[off++];
                    cpy = p[off++];
                    cmd = CMD.A;
                    processArc(
                        x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path
                    );
                    break;
                case 'a':
                    rx = p[off++];
                    ry = p[off++];
                    psi = p[off++];
                    fa = p[off++];
                    fs = p[off++];

                    x1 = cpx, y1 = cpy;
                    cpx += p[off++];
                    cpy += p[off++];
                    cmd = CMD.A;
                    processArc(
                        x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path
                    );
                    break;
            }
        }

        if (cmdStr === 'z' || cmdStr === 'Z') {
            cmd = CMD.Z;
            path.addData(cmd);
            // z may be in the middle of the path.
            cpx = subpathX;
            cpy = subpathY;
        }

        prevCmd = cmd;
    }

    path.toStatic();

    return path;
}

// TODO Optimize double memory cost problem
function createPathOptions(str, opts) {
    var pathProxy = createPathProxyFromString(str);
    opts = opts || {};
    opts.buildPath = function (path) {
        if (path.setData) {
            path.setData(pathProxy.data);
            // Svg and vml renderer don't have context
            var ctx = path.getContext();
            if (ctx) {
                path.rebuildPath(ctx);
            }
        }
        else {
            var ctx = path;
            pathProxy.rebuildPath(ctx);
        }
    };

    opts.applyTransform = function (m) {
        transformPath(pathProxy, m);
        this.dirty(true);
    };

    return opts;
}

/**
 * Create a Path object from path string data
 * http://www.w3.org/TR/SVG/paths.html#PathData
 * @param  {Object} opts Other options
 */
function createFromString(str, opts) {
    return new Path(createPathOptions(str, opts));
}

/**
 * Create a Path class from path string data
 * @param  {string} str
 * @param  {Object} opts Other options
 */
function extendFromString(str, opts) {
    return Path.extend(createPathOptions(str, opts));
}

/**
 * Merge multiple paths
 */
// TODO Apply transform
// TODO stroke dash
// TODO Optimize double memory cost problem
function mergePath(pathEls, opts) {
    var pathList = [];
    var len = pathEls.length;
    for (var i = 0; i < len; i++) {
        var pathEl = pathEls[i];
        if (!pathEl.path) {
            pathEl.createPathProxy();
        }
        if (pathEl.__dirtyPath) {
            pathEl.buildPath(pathEl.path, pathEl.shape, true);
        }
        pathList.push(pathEl.path);
    }

    var pathBundle = new Path(opts);
    // Need path proxy.
    pathBundle.createPathProxy();
    pathBundle.buildPath = function (path) {
        path.appendPath(pathList);
        // Svg and vml renderer don't have context
        var ctx = path.getContext();
        if (ctx) {
            path.rebuildPath(ctx);
        }
    };

    return pathBundle;
}

var path = (Object.freeze || Object)({
	createFromString: createFromString,
	extendFromString: extendFromString,
	mergePath: mergePath
});

/**
 * @alias zrender/graphic/Text
 * @extends module:zrender/graphic/Displayable
 * @constructor
 * @param {Object} opts
 */
var Text = function (opts) { // jshint ignore:line
    Displayable.call(this, opts);
};

Text.prototype = {

    constructor: Text,

    type: 'text',

    brush: function (ctx, prevEl) {
        var style = this.style;

        // Optimize, avoid normalize every time.
        this.__dirty && normalizeTextStyle(style, true);

        // Use props with prefix 'text'.
        style.fill = style.stroke = style.shadowBlur = style.shadowColor =
            style.shadowOffsetX = style.shadowOffsetY = null;

        var text = style.text;
        // Convert to string
        text != null && (text += '');

        // Do not apply style.bind in Text node. Because the real bind job
        // is in textHelper.renderText, and performance of text render should
        // be considered.
        // style.bind(ctx, this, prevEl);

        if (!needDrawText(text, style)) {
            // The current el.style is not applied
            // and should not be used as cache.
            ctx.__attrCachedBy = ContextCachedBy.NONE;
            return;
        }

        this.setTransform(ctx);

        renderText(this, ctx, text, style, null, prevEl);

        this.restoreTransform(ctx);
    },

    getBoundingRect: function () {
        var style = this.style;

        // Optimize, avoid normalize every time.
        this.__dirty && normalizeTextStyle(style, true);

        if (!this._rect) {
            var text = style.text;
            text != null ? (text += '') : (text = '');

            var rect = getBoundingRect(
                style.text + '',
                style.font,
                style.textAlign,
                style.textVerticalAlign,
                style.textPadding,
                style.textLineHeight,
                style.rich
            );

            rect.x += style.x || 0;
            rect.y += style.y || 0;

            if (getStroke(style.textStroke, style.textStrokeWidth)) {
                var w = style.textStrokeWidth;
                rect.x -= w / 2;
                rect.y -= w / 2;
                rect.width += w;
                rect.height += w;
            }

            this._rect = rect;
        }

        return this._rect;
    }
};

inherits(Text, Displayable);

/**
 * 圆形
 * @module zrender/shape/Circle
 */

var Circle = Path.extend({

    type: 'circle',

    shape: {
        cx: 0,
        cy: 0,
        r: 0
    },


    buildPath: function (ctx, shape, inBundle) {
        // Better stroking in ShapeBundle
        // Always do it may have performence issue ( fill may be 2x more cost)
        if (inBundle) {
            ctx.moveTo(shape.cx + shape.r, shape.cy);
        }
        // else {
        //     if (ctx.allocate && !ctx.data.length) {
        //         ctx.allocate(ctx.CMD_MEM_SIZE.A);
        //     }
        // }
        // Better stroking in ShapeBundle
        // ctx.moveTo(shape.cx + shape.r, shape.cy);
        ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
    }
});

/**
 * Sub-pixel optimize for canvas rendering, prevent from blur
 * when rendering a thin vertical/horizontal line.
 */

var round = Math.round;

/**
 * Sub pixel optimize line for canvas
 *
 * @param {Object} outputShape The modification will be performed on `outputShape`.
 *                 `outputShape` and `inputShape` can be the same object.
 *                 `outputShape` object can be used repeatly, because all of
 *                 the `x1`, `x2`, `y1`, `y2` will be assigned in this method.
 * @param {Object} [inputShape]
 * @param {number} [inputShape.x1]
 * @param {number} [inputShape.y1]
 * @param {number} [inputShape.x2]
 * @param {number} [inputShape.y2]
 * @param {Object} [style]
 * @param {number} [style.lineWidth]
 */
function subPixelOptimizeLine(outputShape, inputShape, style) {
    var lineWidth = style && style.lineWidth;

    if (!inputShape || !lineWidth) {
        return;
    }

    var x1 = inputShape.x1;
    var x2 = inputShape.x2;
    var y1 = inputShape.y1;
    var y2 = inputShape.y2;

    if (round(x1 * 2) === round(x2 * 2)) {
        outputShape.x1 = outputShape.x2 = subPixelOptimize(x1, lineWidth, true);
    }
    else {
        outputShape.x1 = x1;
        outputShape.x2 = x2;
    }
    if (round(y1 * 2) === round(y2 * 2)) {
        outputShape.y1 = outputShape.y2 = subPixelOptimize(y1, lineWidth, true);
    }
    else {
        outputShape.y1 = y1;
        outputShape.y2 = y2;
    }
}

/**
 * Sub pixel optimize rect for canvas
 *
 * @param {Object} outputShape The modification will be performed on `outputShape`.
 *                 `outputShape` and `inputShape` can be the same object.
 *                 `outputShape` object can be used repeatly, because all of
 *                 the `x`, `y`, `width`, `height` will be assigned in this method.
 * @param {Object} [inputShape]
 * @param {number} [inputShape.x]
 * @param {number} [inputShape.y]
 * @param {number} [inputShape.width]
 * @param {number} [inputShape.height]
 * @param {Object} [style]
 * @param {number} [style.lineWidth]
 */
function subPixelOptimizeRect(outputShape, inputShape, style) {
    var lineWidth = style && style.lineWidth;

    if (!inputShape || !lineWidth) {
        return;
    }

    var originX = inputShape.x;
    var originY = inputShape.y;
    var originWidth = inputShape.width;
    var originHeight = inputShape.height;

    outputShape.x = subPixelOptimize(originX, lineWidth, true);
    outputShape.y = subPixelOptimize(originY, lineWidth, true);
    outputShape.width = Math.max(
        subPixelOptimize(originX + originWidth, lineWidth, false) - outputShape.x,
        originWidth === 0 ? 0 : 1
    );
    outputShape.height = Math.max(
        subPixelOptimize(originY + originHeight, lineWidth, false) - outputShape.y,
        originHeight === 0 ? 0 : 1
    );
}

/**
 * Sub pixel optimize for canvas
 *
 * @param {number} position Coordinate, such as x, y
 * @param {number} lineWidth Should be nonnegative integer.
 * @param {boolean=} positiveOrNegative Default false (negative).
 * @return {number} Optimized position.
 */
function subPixelOptimize(position, lineWidth, positiveOrNegative) {
    // Assure that (position + lineWidth / 2) is near integer edge,
    // otherwise line will be fuzzy in canvas.
    var doubledPosition = round(position * 2);
    return (doubledPosition + round(lineWidth)) % 2 === 0
        ? doubledPosition / 2
        : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2;
}

/**
 * 矩形
 * @module zrender/graphic/shape/Rect
 */

// Avoid create repeatly.
var subPixelOptimizeOutputShape = {};

var Rect = Path.extend({

    type: 'rect',

    shape: {
        // 左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
        // r缩写为1         相当于 [1, 1, 1, 1]
        // r缩写为[1]       相当于 [1, 1, 1, 1]
        // r缩写为[1, 2]    相当于 [1, 2, 1, 2]
        // r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
        r: 0,

        x: 0,
        y: 0,
        width: 0,
        height: 0
    },

    buildPath: function (ctx, shape) {
        var x;
        var y;
        var width;
        var height;

        if (this.subPixelOptimize) {
            subPixelOptimizeRect(subPixelOptimizeOutputShape, shape, this.style);
            x = subPixelOptimizeOutputShape.x;
            y = subPixelOptimizeOutputShape.y;
            width = subPixelOptimizeOutputShape.width;
            height = subPixelOptimizeOutputShape.height;
            subPixelOptimizeOutputShape.r = shape.r;
            shape = subPixelOptimizeOutputShape;
        }
        else {
            x = shape.x;
            y = shape.y;
            width = shape.width;
            height = shape.height;
        }

        if (!shape.r) {
            ctx.rect(x, y, width, height);
        }
        else {
            buildPath(ctx, shape);
        }
        ctx.closePath();
        return;
    }
});

/**
 * 椭圆形状
 * @module zrender/graphic/shape/Ellipse
 */

var Ellipse = Path.extend({

    type: 'ellipse',

    shape: {
        cx: 0, cy: 0,
        rx: 0, ry: 0
    },

    buildPath: function (ctx, shape) {
        var k = 0.5522848;
        var x = shape.cx;
        var y = shape.cy;
        var a = shape.rx;
        var b = shape.ry;
        var ox = a * k; // 水平控制点偏移量
        var oy = b * k; // 垂直控制点偏移量
        // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.closePath();
    }
});

/**
 * 直线
 * @module zrender/graphic/shape/Line
 */

// Avoid create repeatly.
var subPixelOptimizeOutputShape$1 = {};

var Line = Path.extend({

    type: 'line',

    shape: {
        // Start point
        x1: 0,
        y1: 0,
        // End point
        x2: 0,
        y2: 0,

        percent: 1
    },

    style: {
        stroke: '#000',
        fill: null
    },

    buildPath: function (ctx, shape) {
        var x1;
        var y1;
        var x2;
        var y2;

        if (this.subPixelOptimize) {
            subPixelOptimizeLine(subPixelOptimizeOutputShape$1, shape, this.style);
            x1 = subPixelOptimizeOutputShape$1.x1;
            y1 = subPixelOptimizeOutputShape$1.y1;
            x2 = subPixelOptimizeOutputShape$1.x2;
            y2 = subPixelOptimizeOutputShape$1.y2;
        }
        else {
            x1 = shape.x1;
            y1 = shape.y1;
            x2 = shape.x2;
            y2 = shape.y2;
        }

        var percent = shape.percent;

        if (percent === 0) {
            return;
        }

        ctx.moveTo(x1, y1);

        if (percent < 1) {
            x2 = x1 * (1 - percent) + x2 * percent;
            y2 = y1 * (1 - percent) + y2 * percent;
        }
        ctx.lineTo(x2, y2);
    },

    /**
     * Get point at percent
     * @param  {number} percent
     * @return {Array.<number>}
     */
    pointAt: function (p) {
        var shape = this.shape;
        return [
            shape.x1 * (1 - p) + shape.x2 * p,
            shape.y1 * (1 - p) + shape.y2 * p
        ];
    }
});

/**
 * Catmull-Rom spline 插值折线
 * @module zrender/shape/util/smoothSpline
 * @author pissang (https://www.github.com/pissang)
 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 */

/**
 * @inner
 */
function interpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3
            + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
            + v0 * t + p1;
}

/**
 * @alias module:zrender/shape/util/smoothSpline
 * @param {Array} points 线段顶点数组
 * @param {boolean} isLoop
 * @return {Array}
 */
var smoothSpline = function (points, isLoop) {
    var len$$1 = points.length;
    var ret = [];

    var distance$$1 = 0;
    for (var i = 1; i < len$$1; i++) {
        distance$$1 += distance(points[i - 1], points[i]);
    }

    var segs = distance$$1 / 2;
    segs = segs < len$$1 ? len$$1 : segs;
    for (var i = 0; i < segs; i++) {
        var pos = i / (segs - 1) * (isLoop ? len$$1 : len$$1 - 1);
        var idx = Math.floor(pos);

        var w = pos - idx;

        var p0;
        var p1 = points[idx % len$$1];
        var p2;
        var p3;
        if (!isLoop) {
            p0 = points[idx === 0 ? idx : idx - 1];
            p2 = points[idx > len$$1 - 2 ? len$$1 - 1 : idx + 1];
            p3 = points[idx > len$$1 - 3 ? len$$1 - 1 : idx + 2];
        }
        else {
            p0 = points[(idx - 1 + len$$1) % len$$1];
            p2 = points[(idx + 1) % len$$1];
            p3 = points[(idx + 2) % len$$1];
        }

        var w2 = w * w;
        var w3 = w * w2;

        ret.push([
            interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
            interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)
        ]);
    }
    return ret;
};

/**
 * 贝塞尔平滑曲线
 * @module zrender/shape/util/smoothBezier
 * @author pissang (https://www.github.com/pissang)
 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 */

/**
 * 贝塞尔平滑曲线
 * @alias module:zrender/shape/util/smoothBezier
 * @param {Array} points 线段顶点数组
 * @param {number} smooth 平滑等级, 0-1
 * @param {boolean} isLoop
 * @param {Array} constraint 将计算出来的控制点约束在一个包围盒内
 *                           比如 [[0, 0], [100, 100]], 这个包围盒会与
 *                           整个折线的包围盒做一个并集用来约束控制点。
 * @param {Array} 计算出来的控制点数组
 */
var smoothBezier = function (points, smooth, isLoop, constraint) {
    var cps = [];

    var v = [];
    var v1 = [];
    var v2 = [];
    var prevPoint;
    var nextPoint;

    var min$$1;
    var max$$1;
    if (constraint) {
        min$$1 = [Infinity, Infinity];
        max$$1 = [-Infinity, -Infinity];
        for (var i = 0, len$$1 = points.length; i < len$$1; i++) {
            min(min$$1, min$$1, points[i]);
            max(max$$1, max$$1, points[i]);
        }
        // 与指定的包围盒做并集
        min(min$$1, min$$1, constraint[0]);
        max(max$$1, max$$1, constraint[1]);
    }

    for (var i = 0, len$$1 = points.length; i < len$$1; i++) {
        var point = points[i];

        if (isLoop) {
            prevPoint = points[i ? i - 1 : len$$1 - 1];
            nextPoint = points[(i + 1) % len$$1];
        }
        else {
            if (i === 0 || i === len$$1 - 1) {
                cps.push(clone$1(points[i]));
                continue;
            }
            else {
                prevPoint = points[i - 1];
                nextPoint = points[i + 1];
            }
        }

        sub(v, nextPoint, prevPoint);

        // use degree to scale the handle length
        scale(v, v, smooth);

        var d0 = distance(point, prevPoint);
        var d1 = distance(point, nextPoint);
        var sum = d0 + d1;
        if (sum !== 0) {
            d0 /= sum;
            d1 /= sum;
        }

        scale(v1, v, -d0);
        scale(v2, v, d1);
        var cp0 = add([], point, v1);
        var cp1 = add([], point, v2);
        if (constraint) {
            max(cp0, cp0, min$$1);
            min(cp0, cp0, max$$1);
            max(cp1, cp1, min$$1);
            min(cp1, cp1, max$$1);
        }
        cps.push(cp0);
        cps.push(cp1);
    }

    if (isLoop) {
        cps.push(cps.shift());
    }

    return cps;
};

function buildPath$1(ctx, shape, closePath) {
    var points = shape.points;
    var smooth = shape.smooth;
    if (points && points.length >= 2) {
        if (smooth && smooth !== 'spline') {
            var controlPoints = smoothBezier(
                points, smooth, closePath, shape.smoothConstraint
            );

            ctx.moveTo(points[0][0], points[0][1]);
            var len = points.length;
            for (var i = 0; i < (closePath ? len : len - 1); i++) {
                var cp1 = controlPoints[i * 2];
                var cp2 = controlPoints[i * 2 + 1];
                var p = points[(i + 1) % len];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        }
        else {
            if (smooth === 'spline') {
                points = smoothSpline(points, closePath);
            }

            ctx.moveTo(points[0][0], points[0][1]);
            for (var i = 1, l = points.length; i < l; i++) {
                ctx.lineTo(points[i][0], points[i][1]);
            }
        }

        closePath && ctx.closePath();
    }
}

/**
 * 多边形
 * @module zrender/shape/Polygon
 */

var Polygon = Path.extend({

    type: 'polygon',

    shape: {
        points: null,

        smooth: false,

        smoothConstraint: null
    },

    buildPath: function (ctx, shape) {
        buildPath$1(ctx, shape, true);
    }
});

/**
 * @module zrender/graphic/shape/Polyline
 */

var Polyline = Path.extend({

    type: 'polyline',

    shape: {
        points: null,

        smooth: false,

        smoothConstraint: null
    },

    style: {
        stroke: '#000',

        fill: null
    },

    buildPath: function (ctx, shape) {
        buildPath$1(ctx, shape, false);
    }
});

/**
 * @param {Array.<Object>} colorStops
 */
var Gradient = function (colorStops) {

    this.colorStops = colorStops || [];

};

Gradient.prototype = {

    constructor: Gradient,

    addColorStop: function (offset, color) {
        this.colorStops.push({

            offset: offset,

            color: color
        });
    }

};

/**
 * x, y, x2, y2 are all percent from 0 to 1
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [x2=1]
 * @param {number} [y2=0]
 * @param {Array.<Object>} colorStops
 * @param {boolean} [globalCoord=false]
 */
var LinearGradient = function (x, y, x2, y2, colorStops, globalCoord) {
    // Should do nothing more in this constructor. Because gradient can be
    // declard by `color: {type: 'linear', colorStops: ...}`, where
    // this constructor will not be called.

    this.x = x == null ? 0 : x;

    this.y = y == null ? 0 : y;

    this.x2 = x2 == null ? 1 : x2;

    this.y2 = y2 == null ? 0 : y2;

    // Can be cloned
    this.type = 'linear';

    // If use global coord
    this.global = globalCoord || false;

    Gradient.call(this, colorStops);
};

LinearGradient.prototype = {

    constructor: LinearGradient
};

inherits(LinearGradient, Gradient);

// import RadialGradient from '../graphic/RadialGradient';
// import Pattern from '../graphic/Pattern';
// import * as vector from '../core/vector';
// Most of the values can be separated by comma and/or white space.
var DILIMITER_REG = /[\s,]+/;

/**
 * For big svg string, this method might be time consuming.
 *
 * @param {string} svg xml string
 * @return {Object} xml root.
 */
function parseXML(svg) {
    if (isString(svg)) {
        var parser = new DOMParser();
        svg = parser.parseFromString(svg, 'text/xml');
    }

    // Document node. If using $.get, doc node may be input.
    if (svg.nodeType === 9) {
        svg = svg.firstChild;
    }
    // nodeName of <!DOCTYPE svg> is also 'svg'.
    while (svg.nodeName.toLowerCase() !== 'svg' || svg.nodeType !== 1) {
        svg = svg.nextSibling;
    }

    return svg;
}

function SVGParser() {
    this._defs = {};
    this._root = null;

    this._isDefine = false;
    this._isText = false;
}

SVGParser.prototype.parse = function (xml, opt) {
    opt = opt || {};

    var svg = parseXML(xml);

    if (!svg) {
        throw new Error('Illegal svg');
    }

    var root = new Group();
    this._root = root;
    // parse view port
    var viewBox = svg.getAttribute('viewBox') || '';

    // If width/height not specified, means "100%" of `opt.width/height`.
    // TODO: Other percent value not supported yet.
    var width = parseFloat(svg.getAttribute('width') || opt.width);
    var height = parseFloat(svg.getAttribute('height') || opt.height);
    // If width/height not specified, set as null for output.
    isNaN(width) && (width = null);
    isNaN(height) && (height = null);

    // Apply inline style on svg element.
    parseAttributes(svg, root, null, true);

    var child = svg.firstChild;
    while (child) {
        this._parseNode(child, root);
        child = child.nextSibling;
    }

    var viewBoxRect;
    var viewBoxTransform;

    if (viewBox) {
        var viewBoxArr = trim(viewBox).split(DILIMITER_REG);
        // Some invalid case like viewBox: 'none'.
        if (viewBoxArr.length >= 4) {
            viewBoxRect = {
                x: parseFloat(viewBoxArr[0] || 0),
                y: parseFloat(viewBoxArr[1] || 0),
                width: parseFloat(viewBoxArr[2]),
                height: parseFloat(viewBoxArr[3])
            };
        }
    }

    if (viewBoxRect && width != null && height != null) {
        viewBoxTransform = makeViewBoxTransform(viewBoxRect, width, height);

        if (!opt.ignoreViewBox) {
            // If set transform on the output group, it probably bring trouble when
            // some users only intend to show the clipped content inside the viewBox,
            // but not intend to transform the output group. So we keep the output
            // group no transform. If the user intend to use the viewBox as a
            // camera, just set `opt.ignoreViewBox` as `true` and set transfrom
            // manually according to the viewBox info in the output of this method.
            var elRoot = root;
            root = new Group();
            root.add(elRoot);
            elRoot.scale = viewBoxTransform.scale.slice();
            elRoot.position = viewBoxTransform.position.slice();
        }
    }

    // Some shapes might be overflow the viewport, which should be
    // clipped despite whether the viewBox is used, as the SVG does.
    if (!opt.ignoreRootClip && width != null && height != null) {
        root.setClipPath(new Rect({
            shape: {x: 0, y: 0, width: width, height: height}
        }));
    }

    // Set width/height on group just for output the viewport size.
    return {
        root: root,
        width: width,
        height: height,
        viewBoxRect: viewBoxRect,
        viewBoxTransform: viewBoxTransform
    };
};

SVGParser.prototype._parseNode = function (xmlNode, parentGroup) {

    var nodeName = xmlNode.nodeName.toLowerCase();

    // TODO
    // support <style>...</style> in svg, where nodeName is 'style',
    // CSS classes is defined globally wherever the style tags are declared.

    if (nodeName === 'defs') {
        // define flag
        this._isDefine = true;
    }
    else if (nodeName === 'text') {
        this._isText = true;
    }

    var el;
    if (this._isDefine) {
        var parser = defineParsers[nodeName];
        if (parser) {
            var def = parser.call(this, xmlNode);
            var id = xmlNode.getAttribute('id');
            if (id) {
                this._defs[id] = def;
            }
        }
    }
    else {
        var parser = nodeParsers[nodeName];
        if (parser) {
            el = parser.call(this, xmlNode, parentGroup);
            parentGroup.add(el);
        }
    }

    var child = xmlNode.firstChild;
    while (child) {
        if (child.nodeType === 1) {
            this._parseNode(child, el);
        }
        // Is text
        if (child.nodeType === 3 && this._isText) {
            this._parseText(child, el);
        }
        child = child.nextSibling;
    }

    // Quit define
    if (nodeName === 'defs') {
        this._isDefine = false;
    }
    else if (nodeName === 'text') {
        this._isText = false;
    }
};

SVGParser.prototype._parseText = function (xmlNode, parentGroup) {
    if (xmlNode.nodeType === 1) {
        var dx = xmlNode.getAttribute('dx') || 0;
        var dy = xmlNode.getAttribute('dy') || 0;
        this._textX += parseFloat(dx);
        this._textY += parseFloat(dy);
    }

    var text = new Text({
        style: {
            text: xmlNode.textContent,
            transformText: true
        },
        position: [this._textX || 0, this._textY || 0]
    });

    inheritStyle(parentGroup, text);
    parseAttributes(xmlNode, text, this._defs);

    var fontSize = text.style.fontSize;
    if (fontSize && fontSize < 9) {
        // PENDING
        text.style.fontSize = 9;
        text.scale = text.scale || [1, 1];
        text.scale[0] *= fontSize / 9;
        text.scale[1] *= fontSize / 9;
    }

    var rect = text.getBoundingRect();
    this._textX += rect.width;

    parentGroup.add(text);

    return text;
};

var nodeParsers = {
    'g': function (xmlNode, parentGroup) {
        var g = new Group();
        inheritStyle(parentGroup, g);
        parseAttributes(xmlNode, g, this._defs);

        return g;
    },
    'rect': function (xmlNode, parentGroup) {
        var rect = new Rect();
        inheritStyle(parentGroup, rect);
        parseAttributes(xmlNode, rect, this._defs);

        rect.setShape({
            x: parseFloat(xmlNode.getAttribute('x') || 0),
            y: parseFloat(xmlNode.getAttribute('y') || 0),
            width: parseFloat(xmlNode.getAttribute('width') || 0),
            height: parseFloat(xmlNode.getAttribute('height') || 0)
        });

        // console.log(xmlNode.getAttribute('transform'));
        // console.log(rect.transform);

        return rect;
    },
    'circle': function (xmlNode, parentGroup) {
        var circle = new Circle();
        inheritStyle(parentGroup, circle);
        parseAttributes(xmlNode, circle, this._defs);

        circle.setShape({
            cx: parseFloat(xmlNode.getAttribute('cx') || 0),
            cy: parseFloat(xmlNode.getAttribute('cy') || 0),
            r: parseFloat(xmlNode.getAttribute('r') || 0)
        });

        return circle;
    },
    'line': function (xmlNode, parentGroup) {
        var line = new Line();
        inheritStyle(parentGroup, line);
        parseAttributes(xmlNode, line, this._defs);

        line.setShape({
            x1: parseFloat(xmlNode.getAttribute('x1') || 0),
            y1: parseFloat(xmlNode.getAttribute('y1') || 0),
            x2: parseFloat(xmlNode.getAttribute('x2') || 0),
            y2: parseFloat(xmlNode.getAttribute('y2') || 0)
        });

        return line;
    },
    'ellipse': function (xmlNode, parentGroup) {
        var ellipse = new Ellipse();
        inheritStyle(parentGroup, ellipse);
        parseAttributes(xmlNode, ellipse, this._defs);

        ellipse.setShape({
            cx: parseFloat(xmlNode.getAttribute('cx') || 0),
            cy: parseFloat(xmlNode.getAttribute('cy') || 0),
            rx: parseFloat(xmlNode.getAttribute('rx') || 0),
            ry: parseFloat(xmlNode.getAttribute('ry') || 0)
        });
        return ellipse;
    },
    'polygon': function (xmlNode, parentGroup) {
        var points = xmlNode.getAttribute('points');
        if (points) {
            points = parsePoints(points);
        }
        var polygon = new Polygon({
            shape: {
                points: points || []
            }
        });

        inheritStyle(parentGroup, polygon);
        parseAttributes(xmlNode, polygon, this._defs);

        return polygon;
    },
    'polyline': function (xmlNode, parentGroup) {
        var path = new Path();
        inheritStyle(parentGroup, path);
        parseAttributes(xmlNode, path, this._defs);

        var points = xmlNode.getAttribute('points');
        if (points) {
            points = parsePoints(points);
        }
        var polyline = new Polyline({
            shape: {
                points: points || []
            }
        });

        return polyline;
    },
    'image': function (xmlNode, parentGroup) {
        var img = new ZImage();
        inheritStyle(parentGroup, img);
        parseAttributes(xmlNode, img, this._defs);

        img.setStyle({
            image: xmlNode.getAttribute('xlink:href'),
            x: xmlNode.getAttribute('x'),
            y: xmlNode.getAttribute('y'),
            width: xmlNode.getAttribute('width'),
            height: xmlNode.getAttribute('height')
        });

        return img;
    },
    'text': function (xmlNode, parentGroup) {
        var x = xmlNode.getAttribute('x') || 0;
        var y = xmlNode.getAttribute('y') || 0;
        var dx = xmlNode.getAttribute('dx') || 0;
        var dy = xmlNode.getAttribute('dy') || 0;

        this._textX = parseFloat(x) + parseFloat(dx);
        this._textY = parseFloat(y) + parseFloat(dy);

        var g = new Group();
        inheritStyle(parentGroup, g);
        parseAttributes(xmlNode, g, this._defs);

        return g;
    },
    'tspan': function (xmlNode, parentGroup) {
        var x = xmlNode.getAttribute('x');
        var y = xmlNode.getAttribute('y');
        if (x != null) {
            // new offset x
            this._textX = parseFloat(x);
        }
        if (y != null) {
            // new offset y
            this._textY = parseFloat(y);
        }
        var dx = xmlNode.getAttribute('dx') || 0;
        var dy = xmlNode.getAttribute('dy') || 0;

        var g = new Group();

        inheritStyle(parentGroup, g);
        parseAttributes(xmlNode, g, this._defs);


        this._textX += dx;
        this._textY += dy;

        return g;
    },
    'path': function (xmlNode, parentGroup) {
        // TODO svg fill rule
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule
        // path.style.globalCompositeOperation = 'xor';
        var d = xmlNode.getAttribute('d') || '';

        // Performance sensitive.

        var path = createFromString(d);

        inheritStyle(parentGroup, path);
        parseAttributes(xmlNode, path, this._defs);

        return path;
    }
};

var defineParsers = {

    'lineargradient': function (xmlNode) {
        var x1 = parseInt(xmlNode.getAttribute('x1') || 0, 10);
        var y1 = parseInt(xmlNode.getAttribute('y1') || 0, 10);
        var x2 = parseInt(xmlNode.getAttribute('x2') || 10, 10);
        var y2 = parseInt(xmlNode.getAttribute('y2') || 0, 10);

        var gradient = new LinearGradient(x1, y1, x2, y2);

        _parseGradientColorStops(xmlNode, gradient);

        return gradient;
    },

    'radialgradient': function (xmlNode) {

    }
};

function _parseGradientColorStops(xmlNode, gradient) {

    var stop = xmlNode.firstChild;

    while (stop) {
        if (stop.nodeType === 1) {
            var offset = stop.getAttribute('offset');
            if (offset.indexOf('%') > 0) {  // percentage
                offset = parseInt(offset, 10) / 100;
            }
            else if (offset) {    // number from 0 to 1
                offset = parseFloat(offset);
            }
            else {
                offset = 0;
            }

            var stopColor = stop.getAttribute('stop-color') || '#000000';

            gradient.addColorStop(offset, stopColor);
        }
        stop = stop.nextSibling;
    }
}

function inheritStyle(parent, child) {
    if (parent && parent.__inheritedStyle) {
        if (!child.__inheritedStyle) {
            child.__inheritedStyle = {};
        }
        defaults(child.__inheritedStyle, parent.__inheritedStyle);
    }
}

function parsePoints(pointsString) {
    var list = trim(pointsString).split(DILIMITER_REG);
    var points = [];

    for (var i = 0; i < list.length; i += 2) {
        var x = parseFloat(list[i]);
        var y = parseFloat(list[i + 1]);
        points.push([x, y]);
    }
    return points;
}

var attributesMap = {
    'fill': 'fill',
    'stroke': 'stroke',
    'stroke-width': 'lineWidth',
    'opacity': 'opacity',
    'fill-opacity': 'fillOpacity',
    'stroke-opacity': 'strokeOpacity',
    'stroke-dasharray': 'lineDash',
    'stroke-dashoffset': 'lineDashOffset',
    'stroke-linecap': 'lineCap',
    'stroke-linejoin': 'lineJoin',
    'stroke-miterlimit': 'miterLimit',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-style': 'fontStyle',
    'font-weight': 'fontWeight',

    'text-align': 'textAlign',
    'alignment-baseline': 'textBaseline'
};

function parseAttributes(xmlNode, el, defs, onlyInlineStyle) {
    var zrStyle = el.__inheritedStyle || {};
    var isTextEl = el.type === 'text';

    // TODO Shadow
    if (xmlNode.nodeType === 1) {
        parseTransformAttribute(xmlNode, el);

        extend(zrStyle, parseStyleAttribute(xmlNode));

        if (!onlyInlineStyle) {
            for (var svgAttrName in attributesMap) {
                if (attributesMap.hasOwnProperty(svgAttrName)) {
                    var attrValue = xmlNode.getAttribute(svgAttrName);
                    if (attrValue != null) {
                        zrStyle[attributesMap[svgAttrName]] = attrValue;
                    }
                }
            }
        }
    }

    var elFillProp = isTextEl ? 'textFill' : 'fill';
    var elStrokeProp = isTextEl ? 'textStroke' : 'stroke';

    el.style = el.style || new Style();
    var elStyle = el.style;

    zrStyle.fill != null && elStyle.set(elFillProp, getPaint(zrStyle.fill, defs));
    zrStyle.stroke != null && elStyle.set(elStrokeProp, getPaint(zrStyle.stroke, defs));

    each([
        'lineWidth', 'opacity', 'fillOpacity', 'strokeOpacity', 'miterLimit', 'fontSize'
    ], function (propName) {
        var elPropName = (propName === 'lineWidth' && isTextEl) ? 'textStrokeWidth' : propName;
        zrStyle[propName] != null && elStyle.set(elPropName, parseFloat(zrStyle[propName]));
    });

    if (!zrStyle.textBaseline || zrStyle.textBaseline === 'auto') {
        zrStyle.textBaseline = 'alphabetic';
    }
    if (zrStyle.textBaseline === 'alphabetic') {
        zrStyle.textBaseline = 'bottom';
    }
    if (zrStyle.textAlign === 'start') {
        zrStyle.textAlign = 'left';
    }
    if (zrStyle.textAlign === 'end') {
        zrStyle.textAlign = 'right';
    }

    each(['lineDashOffset', 'lineCap', 'lineJoin',
        'fontWeight', 'fontFamily', 'fontStyle', 'textAlign', 'textBaseline'
    ], function (propName) {
        zrStyle[propName] != null && elStyle.set(propName, zrStyle[propName]);
    });

    if (zrStyle.lineDash) {
        el.style.lineDash = trim(zrStyle.lineDash).split(DILIMITER_REG);
    }

    if (elStyle[elStrokeProp] && elStyle[elStrokeProp] !== 'none') {
        // enable stroke
        el[elStrokeProp] = true;
    }

    el.__inheritedStyle = zrStyle;
}


var urlRegex = /url\(\s*#(.*?)\)/;
function getPaint(str, defs) {
    // if (str === 'none') {
    //     return;
    // }
    var urlMatch = defs && str && str.match(urlRegex);
    if (urlMatch) {
        var url = trim(urlMatch[1]);
        var def = defs[url];
        return def;
    }
    return str;
}

var transformRegex = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g;

function parseTransformAttribute(xmlNode, node) {
    var transform = xmlNode.getAttribute('transform');
    if (transform) {
        transform = transform.replace(/,/g, ' ');
        var m = null;
        var transformOps = [];
        transform.replace(transformRegex, function (str, type, value) {
            transformOps.push(type, value);
        });
        for (var i = transformOps.length - 1; i > 0; i -= 2) {
            var value = transformOps[i];
            var type = transformOps[i - 1];
            m = m || create$1();
            switch (type) {
                case 'translate':
                    value = trim(value).split(DILIMITER_REG);
                    translate(m, m, [parseFloat(value[0]), parseFloat(value[1] || 0)]);
                    break;
                case 'scale':
                    value = trim(value).split(DILIMITER_REG);
                    scale$1(m, m, [parseFloat(value[0]), parseFloat(value[1] || value[0])]);
                    break;
                case 'rotate':
                    value = trim(value).split(DILIMITER_REG);
                    rotate(m, m, parseFloat(value[0]));
                    break;
                case 'skew':
                    value = trim(value).split(DILIMITER_REG);
                    console.warn('Skew transform is not supported yet');
                    break;
                case 'matrix':
                    var value = trim(value).split(DILIMITER_REG);
                    m[0] = parseFloat(value[0]);
                    m[1] = parseFloat(value[1]);
                    m[2] = parseFloat(value[2]);
                    m[3] = parseFloat(value[3]);
                    m[4] = parseFloat(value[4]);
                    m[5] = parseFloat(value[5]);
                    break;
            }
        }
        node.setLocalTransform(m);
    }
}

// Value may contain space.
var styleRegex = /([^\s:;]+)\s*:\s*([^:;]+)/g;
function parseStyleAttribute(xmlNode) {
    var style = xmlNode.getAttribute('style');
    var result = {};

    if (!style) {
        return result;
    }

    var styleList = {};
    styleRegex.lastIndex = 0;
    var styleRegResult;
    while ((styleRegResult = styleRegex.exec(style)) != null) {
        styleList[styleRegResult[1]] = styleRegResult[2];
    }

    for (var svgAttrName in attributesMap) {
        if (attributesMap.hasOwnProperty(svgAttrName) && styleList[svgAttrName] != null) {
            result[attributesMap[svgAttrName]] = styleList[svgAttrName];
        }
    }

    return result;
}

/**
 * @param {Array.<number>} viewBoxRect
 * @param {number} width
 * @param {number} height
 * @return {Object} {scale, position}
 */
function makeViewBoxTransform(viewBoxRect, width, height) {
    var scaleX = width / viewBoxRect.width;
    var scaleY = height / viewBoxRect.height;
    var scale = Math.min(scaleX, scaleY);
    // preserveAspectRatio 'xMidYMid'
    var viewBoxScale = [scale, scale];
    var viewBoxPosition = [
        -(viewBoxRect.x + viewBoxRect.width / 2) * scale + width / 2,
        -(viewBoxRect.y + viewBoxRect.height / 2) * scale + height / 2
    ];

    return {
        scale: viewBoxScale,
        position: viewBoxPosition
    };
}

/**
 * @param {string|XMLElement} xml
 * @param {Object} [opt]
 * @param {number} [opt.width] Default width if svg width not specified or is a percent value.
 * @param {number} [opt.height] Default height if svg height not specified or is a percent value.
 * @param {boolean} [opt.ignoreViewBox]
 * @param {boolean} [opt.ignoreRootClip]
 * @return {Object} result:
 * {
 *     root: Group, The root of the the result tree of zrender shapes,
 *     width: number, the viewport width of the SVG,
 *     height: number, the viewport height of the SVG,
 *     viewBoxRect: {x, y, width, height}, the declared viewBox rect of the SVG, if exists,
 *     viewBoxTransform: the {scale, position} calculated by viewBox and viewport, is exists.
 * }
 */
function parseSVG(xml, opt) {
    var parser = new SVGParser();
    return parser.parse(xml, opt);
}

// CompoundPath to improve performance

var CompoundPath = Path.extend({

    type: 'compound',

    shape: {

        paths: null
    },

    _updatePathDirty: function () {
        var dirtyPath = this.__dirtyPath;
        var paths = this.shape.paths;
        for (var i = 0; i < paths.length; i++) {
            // Mark as dirty if any subpath is dirty
            dirtyPath = dirtyPath || paths[i].__dirtyPath;
        }
        this.__dirtyPath = dirtyPath;
        this.__dirty = this.__dirty || dirtyPath;
    },

    beforeBrush: function () {
        this._updatePathDirty();
        var paths = this.shape.paths || [];
        var scale = this.getGlobalScale();
        // Update path scale
        for (var i = 0; i < paths.length; i++) {
            if (!paths[i].path) {
                paths[i].createPathProxy();
            }
            paths[i].path.setScale(scale[0], scale[1]);
        }
    },

    buildPath: function (ctx, shape) {
        var paths = shape.paths || [];
        for (var i = 0; i < paths.length; i++) {
            paths[i].buildPath(ctx, paths[i].shape, true);
        }
    },

    afterBrush: function () {
        var paths = this.shape.paths || [];
        for (var i = 0; i < paths.length; i++) {
            paths[i].__dirtyPath = false;
        }
    },

    getBoundingRect: function () {
        this._updatePathDirty();
        return Path.prototype.getBoundingRect.call(this);
    }
});

/**
 * Displayable for incremental rendering. It will be rendered in a separate layer
 * IncrementalDisplay have two main methods. `clearDisplayables` and `addDisplayables`
 * addDisplayables will render the added displayables incremetally.
 *
 * It use a not clearFlag to tell the painter don't clear the layer if it's the first element.
 */
// TODO Style override ?
function IncrementalDisplayble(opts) {

    Displayable.call(this, opts);

    this._displayables = [];

    this._temporaryDisplayables = [];

    this._cursor = 0;

    this.notClear = true;
}

IncrementalDisplayble.prototype.incremental = true;

IncrementalDisplayble.prototype.clearDisplaybles = function () {
    this._displayables = [];
    this._temporaryDisplayables = [];
    this._cursor = 0;
    this.dirty();

    this.notClear = false;
};

IncrementalDisplayble.prototype.addDisplayable = function (displayable, notPersistent) {
    if (notPersistent) {
        this._temporaryDisplayables.push(displayable);
    }
    else {
        this._displayables.push(displayable);
    }
    this.dirty();
};

IncrementalDisplayble.prototype.addDisplayables = function (displayables, notPersistent) {
    notPersistent = notPersistent || false;
    for (var i = 0; i < displayables.length; i++) {
        this.addDisplayable(displayables[i], notPersistent);
    }
};

IncrementalDisplayble.prototype.eachPendingDisplayable = function (cb) {
    for (var i = this._cursor; i < this._displayables.length; i++) {
        cb && cb(this._displayables[i]);
    }
    for (var i = 0; i < this._temporaryDisplayables.length; i++) {
        cb && cb(this._temporaryDisplayables[i]);
    }
};

IncrementalDisplayble.prototype.update = function () {
    this.updateTransform();
    for (var i = this._cursor; i < this._displayables.length; i++) {
        var displayable = this._displayables[i];
        // PENDING
        displayable.parent = this;
        displayable.update();
        displayable.parent = null;
    }
    for (var i = 0; i < this._temporaryDisplayables.length; i++) {
        var displayable = this._temporaryDisplayables[i];
        // PENDING
        displayable.parent = this;
        displayable.update();
        displayable.parent = null;
    }
};

IncrementalDisplayble.prototype.brush = function (ctx, prevEl) {
    // Render persistant displayables.
    for (var i = this._cursor; i < this._displayables.length; i++) {
        var displayable = this._displayables[i];
        displayable.beforeBrush && displayable.beforeBrush(ctx);
        displayable.brush(ctx, i === this._cursor ? null : this._displayables[i - 1]);
        displayable.afterBrush && displayable.afterBrush(ctx);
    }
    this._cursor = i;
    // Render temporary displayables.
    for (var i = 0; i < this._temporaryDisplayables.length; i++) {
        var displayable = this._temporaryDisplayables[i];
        displayable.beforeBrush && displayable.beforeBrush(ctx);
        displayable.brush(ctx, i === 0 ? null : this._temporaryDisplayables[i - 1]);
        displayable.afterBrush && displayable.afterBrush(ctx);
    }

    this._temporaryDisplayables = [];

    this.notClear = true;
};

var m = [];
IncrementalDisplayble.prototype.getBoundingRect = function () {
    if (!this._rect) {
        var rect = new BoundingRect(Infinity, Infinity, -Infinity, -Infinity);
        for (var i = 0; i < this._displayables.length; i++) {
            var displayable = this._displayables[i];
            var childRect = displayable.getBoundingRect().clone();
            if (displayable.needLocalTransform()) {
                childRect.applyTransform(displayable.getLocalTransform(m));
            }
            rect.union(childRect);
        }
        this._rect = rect;
    }
    return this._rect;
};

IncrementalDisplayble.prototype.contain = function (x, y) {
    var localPos = this.transformCoordToLocal(x, y);
    var rect = this.getBoundingRect();

    if (rect.contain(localPos[0], localPos[1])) {
        for (var i = 0; i < this._displayables.length; i++) {
            var displayable = this._displayables[i];
            if (displayable.contain(x, y)) {
                return true;
            }
        }
    }
    return false;
};

inherits(IncrementalDisplayble, Displayable);

/**
 * 圆弧
 * @module zrender/graphic/shape/Arc
 */

var Arc = Path.extend({

    type: 'arc',

    shape: {

        cx: 0,

        cy: 0,

        r: 0,

        startAngle: 0,

        endAngle: Math.PI * 2,

        clockwise: true
    },

    style: {

        stroke: '#000',

        fill: null
    },

    buildPath: function (ctx, shape) {

        var x = shape.cx;
        var y = shape.cy;
        var r = Math.max(shape.r, 0);
        var startAngle = shape.startAngle;
        var endAngle = shape.endAngle;
        var clockwise = shape.clockwise;

        var unitX = Math.cos(startAngle);
        var unitY = Math.sin(startAngle);

        ctx.moveTo(unitX * r + x, unitY * r + y);
        ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
    }
});

/**
 * 贝塞尔曲线
 * @module zrender/shape/BezierCurve
 */

var out = [];

function someVectorAt(shape, t, isTangent) {
    var cpx2 = shape.cpx2;
    var cpy2 = shape.cpy2;
    if (cpx2 === null || cpy2 === null) {
        return [
            (isTangent ? cubicDerivativeAt : cubicAt)(shape.x1, shape.cpx1, shape.cpx2, shape.x2, t),
            (isTangent ? cubicDerivativeAt : cubicAt)(shape.y1, shape.cpy1, shape.cpy2, shape.y2, t)
        ];
    }
    else {
        return [
            (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.x1, shape.cpx1, shape.x2, t),
            (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.y1, shape.cpy1, shape.y2, t)
        ];
    }
}

var BezierCurve = Path.extend({

    type: 'bezier-curve',

    shape: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        cpx1: 0,
        cpy1: 0,
        // cpx2: 0,
        // cpy2: 0

        // Curve show percent, for animating
        percent: 1
    },

    style: {
        stroke: '#000',
        fill: null
    },

    buildPath: function (ctx, shape) {
        var x1 = shape.x1;
        var y1 = shape.y1;
        var x2 = shape.x2;
        var y2 = shape.y2;
        var cpx1 = shape.cpx1;
        var cpy1 = shape.cpy1;
        var cpx2 = shape.cpx2;
        var cpy2 = shape.cpy2;
        var percent = shape.percent;
        if (percent === 0) {
            return;
        }

        ctx.moveTo(x1, y1);

        if (cpx2 == null || cpy2 == null) {
            if (percent < 1) {
                quadraticSubdivide(
                    x1, cpx1, x2, percent, out
                );
                cpx1 = out[1];
                x2 = out[2];
                quadraticSubdivide(
                    y1, cpy1, y2, percent, out
                );
                cpy1 = out[1];
                y2 = out[2];
            }

            ctx.quadraticCurveTo(
                cpx1, cpy1,
                x2, y2
            );
        }
        else {
            if (percent < 1) {
                cubicSubdivide(
                    x1, cpx1, cpx2, x2, percent, out
                );
                cpx1 = out[1];
                cpx2 = out[2];
                x2 = out[3];
                cubicSubdivide(
                    y1, cpy1, cpy2, y2, percent, out
                );
                cpy1 = out[1];
                cpy2 = out[2];
                y2 = out[3];
            }
            ctx.bezierCurveTo(
                cpx1, cpy1,
                cpx2, cpy2,
                x2, y2
            );
        }
    },

    /**
     * Get point at percent
     * @param  {number} t
     * @return {Array.<number>}
     */
    pointAt: function (t) {
        return someVectorAt(this.shape, t, false);
    },

    /**
     * Get tangent at percent
     * @param  {number} t
     * @return {Array.<number>}
     */
    tangentAt: function (t) {
        var p = someVectorAt(this.shape, t, true);
        return normalize(p, p);
    }
});

/**
 * 水滴形状
 * @module zrender/graphic/shape/Droplet
 */

var Droplet = Path.extend({

    type: 'droplet',

    shape: {
        cx: 0, cy: 0,
        width: 0, height: 0
    },

    buildPath: function (ctx, shape) {
        var x = shape.cx;
        var y = shape.cy;
        var a = shape.width;
        var b = shape.height;

        ctx.moveTo(x, y + a);
        ctx.bezierCurveTo(
            x + a,
            y + a,
            x + a * 3 / 2,
            y - a / 3,
            x,
            y - b
        );
        ctx.bezierCurveTo(
            x - a * 3 / 2,
            y - a / 3,
            x - a,
            y + a,
            x,
            y + a
        );
        ctx.closePath();
    }
});

/**
 * 心形
 * @module zrender/graphic/shape/Heart
 */

var Heart = Path.extend({

    type: 'heart',

    shape: {
        cx: 0,
        cy: 0,
        width: 0,
        height: 0
    },

    buildPath: function (ctx, shape) {
        var x = shape.cx;
        var y = shape.cy;
        var a = shape.width;
        var b = shape.height;
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(
            x + a / 2, y - b * 2 / 3,
            x + a * 2, y + b / 3,
            x, y + b
        );
        ctx.bezierCurveTo(
            x - a * 2, y + b / 3,
            x - a / 2, y - b * 2 / 3,
            x, y
        );
    }
});

/**
 * 正多边形
 * @module zrender/shape/Isogon
 */

var PI$1 = Math.PI;
var sin = Math.sin;
var cos = Math.cos;

var Isogon = Path.extend({

    type: 'isogon',

    shape: {
        x: 0, y: 0,
        r: 0, n: 0
    },

    buildPath: function (ctx, shape) {
        var n = shape.n;
        if (!n || n < 2) {
            return;
        }

        var x = shape.x;
        var y = shape.y;
        var r = shape.r;

        var dStep = 2 * PI$1 / n;
        var deg = -PI$1 / 2;

        ctx.moveTo(x + r * cos(deg), y + r * sin(deg));
        for (var i = 0, end = n - 1; i < end; i++) {
            deg += dStep;
            ctx.lineTo(x + r * cos(deg), y + r * sin(deg));
        }

        ctx.closePath();

        return;
    }
});

/**
 * 圆环
 * @module zrender/graphic/shape/Ring
 */

var Ring = Path.extend({

    type: 'ring',

    shape: {
        cx: 0,
        cy: 0,
        r: 0,
        r0: 0
    },

    buildPath: function (ctx, shape) {
        var x = shape.cx;
        var y = shape.cy;
        var PI2 = Math.PI * 2;
        ctx.moveTo(x + shape.r, y);
        ctx.arc(x, y, shape.r, 0, PI2, false);
        ctx.moveTo(x + shape.r0, y);
        ctx.arc(x, y, shape.r0, 0, PI2, true);
    }
});

/**
 * 玫瑰线
 * @module zrender/graphic/shape/Rose
 */

var sin$1 = Math.sin;
var cos$1 = Math.cos;
var radian = Math.PI / 180;

var Rose = Path.extend({

    type: 'rose',

    shape: {
        cx: 0,
        cy: 0,
        r: [],
        k: 0,
        n: 1
    },

    style: {
        stroke: '#000',
        fill: null
    },

    buildPath: function (ctx, shape) {
        var x;
        var y;
        var R = shape.r;
        var r;
        var k = shape.k;
        var n = shape.n;

        var x0 = shape.cx;
        var y0 = shape.cy;

        ctx.moveTo(x0, y0);

        for (var i = 0, len = R.length; i < len; i++) {
            r = R[i];

            for (var j = 0; j <= 360 * n; j++) {
                x = r
                        * sin$1(k / n * j % 360 * radian)
                        * cos$1(j * radian)
                        + x0;
                y = r
                        * sin$1(k / n * j % 360 * radian)
                        * sin$1(j * radian)
                        + y0;
                ctx.lineTo(x, y);
            }
        }
    }
});

// Fix weird bug in some version of IE11 (like 11.0.9600.178**),
// where exception "unexpected call to method or property access"
// might be thrown when calling ctx.fill or ctx.stroke after a path
// whose area size is zero is drawn and ctx.clip() is called and
// shadowBlur is set. See #4572, #3112, #5777.
// (e.g.,
//  ctx.moveTo(10, 10);
//  ctx.lineTo(20, 10);
//  ctx.closePath();
//  ctx.clip();
//  ctx.shadowBlur = 10;
//  ...
//  ctx.fill();
// )

var shadowTemp = [
    ['shadowBlur', 0],
    ['shadowColor', '#000'],
    ['shadowOffsetX', 0],
    ['shadowOffsetY', 0]
];

var fixClipWithShadow = function (orignalBrush) {

    // version string can be: '11.0'
    return (env$1.browser.ie && env$1.browser.version >= 11)

        ? function () {
            var clipPaths = this.__clipPaths;
            var style = this.style;
            var modified;

            if (clipPaths) {
                for (var i = 0; i < clipPaths.length; i++) {
                    var clipPath = clipPaths[i];
                    var shape = clipPath && clipPath.shape;
                    var type = clipPath && clipPath.type;

                    if (shape && (
                        (type === 'sector' && shape.startAngle === shape.endAngle)
                        || (type === 'rect' && (!shape.width || !shape.height))
                    )) {
                        for (var j = 0; j < shadowTemp.length; j++) {
                            // It is save to put shadowTemp static, because shadowTemp
                            // will be all modified each item brush called.
                            shadowTemp[j][2] = style[shadowTemp[j][0]];
                            style[shadowTemp[j][0]] = shadowTemp[j][1];
                        }
                        modified = true;
                        break;
                    }
                }
            }

            orignalBrush.apply(this, arguments);

            if (modified) {
                for (var j = 0; j < shadowTemp.length; j++) {
                    style[shadowTemp[j][0]] = shadowTemp[j][2];
                }
            }
        }

        : orignalBrush;
};

/**
 * 扇形
 * @module zrender/graphic/shape/Sector
 */

var Sector = Path.extend({

    type: 'sector',

    shape: {

        cx: 0,

        cy: 0,

        r0: 0,

        r: 0,

        startAngle: 0,

        endAngle: Math.PI * 2,

        clockwise: true
    },

    brush: fixClipWithShadow(Path.prototype.brush),

    buildPath: function (ctx, shape) {

        var x = shape.cx;
        var y = shape.cy;
        var r0 = Math.max(shape.r0 || 0, 0);
        var r = Math.max(shape.r, 0);
        var startAngle = shape.startAngle;
        var endAngle = shape.endAngle;
        var clockwise = shape.clockwise;

        var unitX = Math.cos(startAngle);
        var unitY = Math.sin(startAngle);

        ctx.moveTo(unitX * r0 + x, unitY * r0 + y);

        ctx.lineTo(unitX * r + x, unitY * r + y);

        ctx.arc(x, y, r, startAngle, endAngle, !clockwise);

        ctx.lineTo(
            Math.cos(endAngle) * r0 + x,
            Math.sin(endAngle) * r0 + y
        );

        if (r0 !== 0) {
            ctx.arc(x, y, r0, endAngle, startAngle, clockwise);
        }

        ctx.closePath();
    }
});

/**
 * n角星（n>3）
 * @module zrender/graphic/shape/Star
 */

var PI$2 = Math.PI;
var cos$2 = Math.cos;
var sin$2 = Math.sin;

var Star = Path.extend({

    type: 'star',

    shape: {
        cx: 0,
        cy: 0,
        n: 3,
        r0: null,
        r: 0
    },

    buildPath: function (ctx, shape) {

        var n = shape.n;
        if (!n || n < 2) {
            return;
        }

        var x = shape.cx;
        var y = shape.cy;
        var r = shape.r;
        var r0 = shape.r0;

        // 如果未指定内部顶点外接圆半径，则自动计算
        if (r0 == null) {
            r0 = n > 4
                // 相隔的外部顶点的连线的交点，
                // 被取为内部交点，以此计算r0
                ? r * cos$2(2 * PI$2 / n) / cos$2(PI$2 / n)
                // 二三四角星的特殊处理
                : r / 3;
        }

        var dStep = PI$2 / n;
        var deg = -PI$2 / 2;
        var xStart = x + r * cos$2(deg);
        var yStart = y + r * sin$2(deg);
        deg += dStep;

        // 记录边界点，用于判断inside
        ctx.moveTo(xStart, yStart);
        for (var i = 0, end = n * 2 - 1, ri; i < end; i++) {
            ri = i % 2 === 0 ? r0 : r;
            ctx.lineTo(x + ri * cos$2(deg), y + ri * sin$2(deg));
            deg += dStep;
        }

        ctx.closePath();
    }
});

/**
 * 内外旋轮曲线
 * @module zrender/graphic/shape/Trochold
 */

var cos$3 = Math.cos;
var sin$3 = Math.sin;

var Trochoid = Path.extend({

    type: 'trochoid',

    shape: {
        cx: 0,
        cy: 0,
        r: 0,
        r0: 0,
        d: 0,
        location: 'out'
    },

    style: {
        stroke: '#000',

        fill: null
    },

    buildPath: function (ctx, shape) {
        var x1;
        var y1;
        var x2;
        var y2;
        var R = shape.r;
        var r = shape.r0;
        var d = shape.d;
        var offsetX = shape.cx;
        var offsetY = shape.cy;
        var delta = shape.location === 'out' ? 1 : -1;

        if (shape.location && R <= r) {
            return;
        }

        var num = 0;
        var i = 1;
        var theta;

        x1 = (R + delta * r) * cos$3(0)
            - delta * d * cos$3(0) + offsetX;
        y1 = (R + delta * r) * sin$3(0)
            - d * sin$3(0) + offsetY;

        ctx.moveTo(x1, y1);

        // 计算结束时的i
        do {
            num++;
        }
        while ((r * num) % (R + delta * r) !== 0);

        do {
            theta = Math.PI / 180 * i;
            x2 = (R + delta * r) * cos$3(theta)
                    - delta * d * cos$3((R / r + delta) * theta)
                    + offsetX;
            y2 = (R + delta * r) * sin$3(theta)
                    - d * sin$3((R / r + delta) * theta)
                    + offsetY;
            ctx.lineTo(x2, y2);
            i++;
        }
        while (i <= (r * num) / (R + delta * r) * 360);

    }
});

/**
 * x, y, r are all percent from 0 to 1
 * @param {number} [x=0.5]
 * @param {number} [y=0.5]
 * @param {number} [r=0.5]
 * @param {Array.<Object>} [colorStops]
 * @param {boolean} [globalCoord=false]
 */
var RadialGradient = function (x, y, r, colorStops, globalCoord) {
    // Should do nothing more in this constructor. Because gradient can be
    // declard by `color: {type: 'radial', colorStops: ...}`, where
    // this constructor will not be called.

    this.x = x == null ? 0.5 : x;

    this.y = y == null ? 0.5 : y;

    this.r = r == null ? 0.5 : r;

    // Can be cloned
    this.type = 'radial';

    // If use global coord
    this.global = globalCoord || false;

    Gradient.call(this, colorStops);
};

RadialGradient.prototype = {

    constructor: RadialGradient
};

inherits(RadialGradient, Gradient);

/**
 * Do not mount those modules on 'src/zrender' for better tree shaking.
 */

var svgURI = 'http://www.w3.org/2000/svg';

function createElement(name) {
    return document.createElementNS(svgURI, name);
}

// TODO
// 1. shadow
// 2. Image: sx, sy, sw, sh

var CMD$3 = PathProxy.CMD;
var arrayJoin = Array.prototype.join;

var NONE = 'none';
var mathRound = Math.round;
var mathSin$3 = Math.sin;
var mathCos$3 = Math.cos;
var PI$3 = Math.PI;
var PI2$4 = Math.PI * 2;
var degree = 180 / PI$3;

var EPSILON$3 = 1e-4;

function round4(val) {
    return mathRound(val * 1e4) / 1e4;
}

function isAroundZero$1(val) {
    return val < EPSILON$3 && val > -EPSILON$3;
}

function pathHasFill(style, isText) {
    var fill = isText ? style.textFill : style.fill;
    return fill != null && fill !== NONE;
}

function pathHasStroke(style, isText) {
    var stroke = isText ? style.textStroke : style.stroke;
    return stroke != null && stroke !== NONE;
}

function setTransform(svgEl, m) {
    if (m) {
        attr(svgEl, 'transform', 'matrix(' + arrayJoin.call(m, ',') + ')');
    }
}

function attr(el, key, val) {
    if (!val || val.type !== 'linear' && val.type !== 'radial') {
        // Don't set attribute for gradient, since it need new dom nodes
        el.setAttribute(key, val);
    }
}

function attrXLink(el, key, val) {
    el.setAttributeNS('http://www.w3.org/1999/xlink', key, val);
}

function bindStyle(svgEl, style, isText, el) {
    if (pathHasFill(style, isText)) {
        var fill = isText ? style.textFill : style.fill;
        fill = fill === 'transparent' ? NONE : fill;

        /**
         * FIXME:
         * This is a temporary fix for Chrome's clipping bug
         * that happens when a clip-path is referring another one.
         * This fix should be used before Chrome's bug is fixed.
         * For an element that has clip-path, and fill is none,
         * set it to be "rgba(0, 0, 0, 0.002)" will hide the element.
         * Otherwise, it will show black fill color.
         * 0.002 is used because this won't work for alpha values smaller
         * than 0.002.
         *
         * See
         * https://bugs.chromium.org/p/chromium/issues/detail?id=659790
         * for more information.
         */
        if (svgEl.getAttribute('clip-path') !== 'none' && fill === NONE) {
            fill = 'rgba(0, 0, 0, 0.002)';
        }

        attr(svgEl, 'fill', fill);
        attr(svgEl, 'fill-opacity', style.fillOpacity != null ? style.fillOpacity * style.opacity : style.opacity);
    }
    else {
        attr(svgEl, 'fill', NONE);
    }

    if (pathHasStroke(style, isText)) {
        var stroke = isText ? style.textStroke : style.stroke;
        stroke = stroke === 'transparent' ? NONE : stroke;
        attr(svgEl, 'stroke', stroke);
        var strokeWidth = isText
            ? style.textStrokeWidth
            : style.lineWidth;
        var strokeScale = !isText && style.strokeNoScale
            ? el.getLineScale()
            : 1;
        attr(svgEl, 'stroke-width', strokeWidth / strokeScale);
        // stroke then fill for text; fill then stroke for others
        attr(svgEl, 'paint-order', isText ? 'stroke' : 'fill');
        attr(svgEl, 'stroke-opacity', style.strokeOpacity != null ? style.strokeOpacity : style.opacity);
        var lineDash = style.lineDash;
        if (lineDash) {
            attr(svgEl, 'stroke-dasharray', style.lineDash.join(','));
            attr(svgEl, 'stroke-dashoffset', mathRound(style.lineDashOffset || 0));
        }
        else {
            attr(svgEl, 'stroke-dasharray', '');
        }

        // PENDING
        style.lineCap && attr(svgEl, 'stroke-linecap', style.lineCap);
        style.lineJoin && attr(svgEl, 'stroke-linejoin', style.lineJoin);
        style.miterLimit && attr(svgEl, 'stroke-miterlimit', style.miterLimit);
    }
    else {
        attr(svgEl, 'stroke', NONE);
    }
}

/***************************************************
 * PATH
 **************************************************/
function pathDataToString(path) {
    var str = [];
    var data = path.data;
    var dataLength = path.len();
    for (var i = 0; i < dataLength;) {
        var cmd = data[i++];
        var cmdStr = '';
        var nData = 0;
        switch (cmd) {
            case CMD$3.M:
                cmdStr = 'M';
                nData = 2;
                break;
            case CMD$3.L:
                cmdStr = 'L';
                nData = 2;
                break;
            case CMD$3.Q:
                cmdStr = 'Q';
                nData = 4;
                break;
            case CMD$3.C:
                cmdStr = 'C';
                nData = 6;
                break;
            case CMD$3.A:
                var cx = data[i++];
                var cy = data[i++];
                var rx = data[i++];
                var ry = data[i++];
                var theta = data[i++];
                var dTheta = data[i++];
                var psi = data[i++];
                var clockwise = data[i++];

                var dThetaPositive = Math.abs(dTheta);
                var isCircle = isAroundZero$1(dThetaPositive - PI2$4)
                    && !isAroundZero$1(dThetaPositive);

                var large = false;
                if (dThetaPositive >= PI2$4) {
                    large = true;
                }
                else if (isAroundZero$1(dThetaPositive)) {
                    large = false;
                }
                else {
                    large = (dTheta > -PI$3 && dTheta < 0 || dTheta > PI$3)
                        === !!clockwise;
                }

                var x0 = round4(cx + rx * mathCos$3(theta));
                var y0 = round4(cy + ry * mathSin$3(theta));

                // It will not draw if start point and end point are exactly the same
                // We need to shift the end point with a small value
                // FIXME A better way to draw circle ?
                if (isCircle) {
                    if (clockwise) {
                        dTheta = PI2$4 - 1e-4;
                    }
                    else {
                        dTheta = -PI2$4 + 1e-4;
                    }

                    large = true;

                    if (i === 9) {
                        // Move to (x0, y0) only when CMD.A comes at the
                        // first position of a shape.
                        // For instance, when drawing a ring, CMD.A comes
                        // after CMD.M, so it's unnecessary to move to
                        // (x0, y0).
                        str.push('M', x0, y0);
                    }
                }

                var x = round4(cx + rx * mathCos$3(theta + dTheta));
                var y = round4(cy + ry * mathSin$3(theta + dTheta));

                // FIXME Ellipse
                str.push('A', round4(rx), round4(ry),
                    mathRound(psi * degree), +large, +clockwise, x, y);
                break;
            case CMD$3.Z:
                cmdStr = 'Z';
                break;
            case CMD$3.R:
                var x = round4(data[i++]);
                var y = round4(data[i++]);
                var w = round4(data[i++]);
                var h = round4(data[i++]);
                str.push(
                    'M', x, y,
                    'L', x + w, y,
                    'L', x + w, y + h,
                    'L', x, y + h,
                    'L', x, y
                );
                break;
        }
        cmdStr && str.push(cmdStr);
        for (var j = 0; j < nData; j++) {
            // PENDING With scale
            str.push(round4(data[i++]));
        }
    }
    return str.join(' ');
}

var svgPath = {};
svgPath.brush = function (el) {
    var style = el.style;

    var svgEl = el.__svgEl;
    if (!svgEl) {
        svgEl = createElement('path');
        el.__svgEl = svgEl;
    }

    if (!el.path) {
        el.createPathProxy();
    }
    var path = el.path;

    if (el.__dirtyPath) {
        path.beginPath();
        path.subPixelOptimize = false;
        el.buildPath(path, el.shape);
        el.__dirtyPath = false;

        var pathStr = pathDataToString(path);
        if (pathStr.indexOf('NaN') < 0) {
            // Ignore illegal path, which may happen such in out-of-range
            // data in Calendar series.
            attr(svgEl, 'd', pathStr);
        }
    }

    bindStyle(svgEl, style, false, el);
    setTransform(svgEl, el.transform);

    if (style.text != null) {
        svgTextDrawRectText(el, el.getBoundingRect());
    }
};

/***************************************************
 * IMAGE
 **************************************************/
var svgImage = {};
svgImage.brush = function (el) {
    var style = el.style;
    var image = style.image;

    if (image instanceof HTMLImageElement) {
        var src = image.src;
        image = src;
    }
    if (!image) {
        return;
    }

    var x = style.x || 0;
    var y = style.y || 0;

    var dw = style.width;
    var dh = style.height;

    var svgEl = el.__svgEl;
    if (!svgEl) {
        svgEl = createElement('image');
        el.__svgEl = svgEl;
    }

    if (image !== el.__imageSrc) {
        attrXLink(svgEl, 'href', image);
        // Caching image src
        el.__imageSrc = image;
    }

    attr(svgEl, 'width', dw);
    attr(svgEl, 'height', dh);

    attr(svgEl, 'x', x);
    attr(svgEl, 'y', y);

    setTransform(svgEl, el.transform);

    if (style.text != null) {
        svgTextDrawRectText(el, el.getBoundingRect());
    }
};

/***************************************************
 * TEXT
 **************************************************/
var svgText = {};
var tmpRect$2 = new BoundingRect();

var svgTextDrawRectText = function (el, rect, textRect) {
    var style = el.style;

    el.__dirty && normalizeTextStyle(style, true);

    var text = style.text;
    // Convert to string
    if (text == null) {
        // Draw no text only when text is set to null, but not ''
        return;
    }
    else {
        text += '';
    }

    var textSvgEl = el.__textSvgEl;
    if (!textSvgEl) {
        textSvgEl = createElement('text');
        el.__textSvgEl = textSvgEl;
    }

    var x;
    var y;
    var textPosition = style.textPosition;
    var distance = style.textDistance;
    var align = style.textAlign || 'left';

    if (typeof style.fontSize === 'number') {
        style.fontSize += 'px';
    }
    var font = style.font
        || [
            style.fontStyle || '',
            style.fontWeight || '',
            style.fontSize || '',
            style.fontFamily || ''
        ].join(' ')
        || DEFAULT_FONT$1;

    var verticalAlign = getVerticalAlignForSvg(style.textVerticalAlign);

    textRect = getBoundingRect(
        text, font, align,
        verticalAlign, style.textPadding, style.textLineHeight
    );

    var lineHeight = textRect.lineHeight;
    // Text position represented by coord
    if (textPosition instanceof Array) {
        x = rect.x + textPosition[0];
        y = rect.y + textPosition[1];
    }
    else {
        var newPos = adjustTextPositionOnRect(
            textPosition, rect, distance
        );
        x = newPos.x;
        y = newPos.y;
        verticalAlign = getVerticalAlignForSvg(newPos.textVerticalAlign);
        align = newPos.textAlign;
    }

    attr(textSvgEl, 'alignment-baseline', verticalAlign);

    if (font) {
        textSvgEl.style.font = font;
    }

    var textPadding = style.textPadding;

    // Make baseline top
    attr(textSvgEl, 'x', x);
    attr(textSvgEl, 'y', y);

    bindStyle(textSvgEl, style, true, el);
    if (el instanceof Text || el.style.transformText) {
        // Transform text with element
        setTransform(textSvgEl, el.transform);
    }
    else {
        if (el.transform) {
            tmpRect$2.copy(rect);
            tmpRect$2.applyTransform(el.transform);
            rect = tmpRect$2;
        }
        else {
            var pos = el.transformCoordToGlobal(rect.x, rect.y);
            rect.x = pos[0];
            rect.y = pos[1];
            el.transform = identity(create$1());
        }

        // Text rotation, but no element transform
        var origin = style.textOrigin;
        if (origin === 'center') {
            x = textRect.width / 2 + x;
            y = textRect.height / 2 + y;
        }
        else if (origin) {
            x = origin[0] + x;
            y = origin[1] + y;
        }
        var rotate$$1 = -style.textRotation || 0;
        var transform = create$1();
        // Apply textRotate to element matrix
        rotate(transform, transform, rotate$$1);

        var pos = [el.transform[4], el.transform[5]];
        translate(transform, transform, pos);
        setTransform(textSvgEl, transform);
    }

    var textLines = text.split('\n');
    var nTextLines = textLines.length;
    var textAnchor = align;
    // PENDING
    if (textAnchor === 'left') {
        textAnchor = 'start';
        textPadding && (x += textPadding[3]);
    }
    else if (textAnchor === 'right') {
        textAnchor = 'end';
        textPadding && (x -= textPadding[1]);
    }
    else if (textAnchor === 'center') {
        textAnchor = 'middle';
        textPadding && (x += (textPadding[3] - textPadding[1]) / 2);
    }

    var dy = 0;
    if (verticalAlign === 'after-edge') {
        dy = -textRect.height + lineHeight;
        textPadding && (dy -= textPadding[2]);
    }
    else if (verticalAlign === 'middle') {
        dy = (-textRect.height + lineHeight) / 2;
        textPadding && (y += (textPadding[0] - textPadding[2]) / 2);
    }
    else {
        textPadding && (dy += textPadding[0]);
    }

    // Font may affect position of each tspan elements
    if (el.__text !== text || el.__textFont !== font) {
        var tspanList = el.__tspanList || [];
        el.__tspanList = tspanList;
        for (var i = 0; i < nTextLines; i++) {
            // Using cached tspan elements
            var tspan = tspanList[i];
            if (!tspan) {
                tspan = tspanList[i] = createElement('tspan');
                textSvgEl.appendChild(tspan);
                attr(tspan, 'alignment-baseline', verticalAlign);
                attr(tspan, 'text-anchor', textAnchor);
            }
            else {
                tspan.innerHTML = '';
            }
            attr(tspan, 'x', x);
            attr(tspan, 'y', y + i * lineHeight + dy);
            tspan.appendChild(document.createTextNode(textLines[i]));
        }
        // Remove unsed tspan elements
        for (; i < tspanList.length; i++) {
            textSvgEl.removeChild(tspanList[i]);
        }
        tspanList.length = nTextLines;

        el.__text = text;
        el.__textFont = font;
    }
    else if (el.__tspanList.length) {
        // Update span x and y
        var len = el.__tspanList.length;
        for (var i = 0; i < len; ++i) {
            var tspan = el.__tspanList[i];
            if (tspan) {
                attr(tspan, 'x', x);
                attr(tspan, 'y', y + i * lineHeight + dy);
            }
        }
    }
};

function getVerticalAlignForSvg(verticalAlign) {
    if (verticalAlign === 'middle') {
        return 'middle';
    }
    else if (verticalAlign === 'bottom') {
        return 'after-edge';
    }
    else {
        return 'hanging';
    }
}

svgText.drawRectText = svgTextDrawRectText;

svgText.brush = function (el) {
    var style = el.style;
    if (style.text != null) {
        // 强制设置 textPosition
        style.textPosition = [0, 0];
        svgTextDrawRectText(el, {
            x: style.x || 0, y: style.y || 0,
            width: 0, height: 0
        }, el.getBoundingRect());
    }
};

// Myers' Diff Algorithm
// Modified from https://github.com/kpdecker/jsdiff/blob/master/src/diff/base.js

function Diff() {}

Diff.prototype = {
    diff: function (oldArr, newArr, equals) {
        if (!equals) {
            equals = function (a, b) {
                return a === b;
            };
        }
        this.equals = equals;

        var self = this;

        oldArr = oldArr.slice();
        newArr = newArr.slice();
        // Allow subclasses to massage the input prior to running
        var newLen = newArr.length;
        var oldLen = oldArr.length;
        var editLength = 1;
        var maxEditLength = newLen + oldLen;
        var bestPath = [{ newPos: -1, components: [] }];

        // Seed editLength = 0, i.e. the content starts with the same values
        var oldPos = this.extractCommon(bestPath[0], newArr, oldArr, 0);
        if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
            var indices = [];
            for (var i = 0; i < newArr.length; i++) {
                indices.push(i);
            }
            // Identity per the equality and tokenizer
            return [{
                indices: indices, count: newArr.length
            }];
        }

        // Main worker method. checks all permutations of a given edit length for acceptance.
        function execEditLength() {
            for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
                var basePath;
                var addPath = bestPath[diagonalPath - 1];
                var removePath = bestPath[diagonalPath + 1];
                var oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
                if (addPath) {
                    // No one else is going to attempt to use this value, clear it
                    bestPath[diagonalPath - 1] = undefined;
                }

                var canAdd = addPath && addPath.newPos + 1 < newLen;
                var canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
                if (!canAdd && !canRemove) {
                    // If this path is a terminal then prune
                    bestPath[diagonalPath] = undefined;
                    continue;
                }

                // Select the diagonal that we want to branch from. We select the prior
                // path whose position in the new string is the farthest from the origin
                // and does not pass the bounds of the diff graph
                if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
                    basePath = clonePath(removePath);
                    self.pushComponent(basePath.components, undefined, true);
                }
                else {
                    basePath = addPath;   // No need to clone, we've pulled it from the list
                    basePath.newPos++;
                    self.pushComponent(basePath.components, true, undefined);
                }

                oldPos = self.extractCommon(basePath, newArr, oldArr, diagonalPath);

                // If we have hit the end of both strings, then we are done
                if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
                    return buildValues(self, basePath.components, newArr, oldArr);
                }
                else {
                    // Otherwise track this path as a potential candidate and continue.
                    bestPath[diagonalPath] = basePath;
                }
            }

            editLength++;
        }

        while (editLength <= maxEditLength) {
            var ret = execEditLength();
            if (ret) {
                return ret;
            }
        }
    },

    pushComponent: function (components, added, removed) {
        var last = components[components.length - 1];
        if (last && last.added === added && last.removed === removed) {
            // We need to clone here as the component clone operation is just
            // as shallow array clone
            components[components.length - 1] = {count: last.count + 1, added: added, removed: removed };
        }
        else {
            components.push({count: 1, added: added, removed: removed });
        }
    },
    extractCommon: function (basePath, newArr, oldArr, diagonalPath) {
        var newLen = newArr.length;
        var oldLen = oldArr.length;
        var newPos = basePath.newPos;
        var oldPos = newPos - diagonalPath;
        var commonCount = 0;

        while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newArr[newPos + 1], oldArr[oldPos + 1])) {
            newPos++;
            oldPos++;
            commonCount++;
        }

        if (commonCount) {
            basePath.components.push({count: commonCount});
        }

        basePath.newPos = newPos;
        return oldPos;
    },
    tokenize: function (value) {
        return value.slice();
    },
    join: function (value) {
        return value.slice();
    }
};

function buildValues(diff, components, newArr, oldArr) {
    var componentPos = 0;
    var componentLen = components.length;
    var newPos = 0;
    var oldPos = 0;

    for (; componentPos < componentLen; componentPos++) {
        var component = components[componentPos];
        if (!component.removed) {
            var indices = [];
            for (var i = newPos; i < newPos + component.count; i++) {
                indices.push(i);
            }
            component.indices = indices;
            newPos += component.count;
            // Common case
            if (!component.added) {
                oldPos += component.count;
            }
        }
        else {
            var indices = [];
            for (var i = oldPos; i < oldPos + component.count; i++) {
                indices.push(i);
            }
            component.indices = indices;
            oldPos += component.count;
        }
    }

    return components;
}

function clonePath(path) {
    return { newPos: path.newPos, components: path.components.slice(0) };
}

var arrayDiff = new Diff();

var arrayDiff$1 = function (oldArr, newArr, callback) {
    return arrayDiff.diff(oldArr, newArr, callback);
};

/**
 * @file Manages elements that can be defined in <defs> in SVG,
 *       e.g., gradients, clip path, etc.
 * @author Zhang Wenli
 */

var MARK_UNUSED = '0';
var MARK_USED = '1';

/**
 * Manages elements that can be defined in <defs> in SVG,
 * e.g., gradients, clip path, etc.
 *
 * @class
 * @param {number}          zrId      zrender instance id
 * @param {SVGElement}      svgRoot   root of SVG document
 * @param {string|string[]} tagNames  possible tag names
 * @param {string}          markLabel label name to make if the element
 *                                    is used
 */
function Definable(
    zrId,
    svgRoot,
    tagNames,
    markLabel,
    domName
) {
    this._zrId = zrId;
    this._svgRoot = svgRoot;
    this._tagNames = typeof tagNames === 'string' ? [tagNames] : tagNames;
    this._markLabel = markLabel;
    this._domName = domName || '_dom';

    this.nextId = 0;
}


Definable.prototype.createElement = createElement;


/**
 * Get the <defs> tag for svgRoot; optionally creates one if not exists.
 *
 * @param {boolean} isForceCreating if need to create when not exists
 * @return {SVGDefsElement} SVG <defs> element, null if it doesn't
 * exist and isForceCreating is false
 */
Definable.prototype.getDefs = function (isForceCreating) {
    var svgRoot = this._svgRoot;
    var defs = this._svgRoot.getElementsByTagName('defs');
    if (defs.length === 0) {
        // Not exist
        if (isForceCreating) {
            defs = svgRoot.insertBefore(
                this.createElement('defs'), // Create new tag
                svgRoot.firstChild // Insert in the front of svg
            );
            if (!defs.contains) {
                // IE doesn't support contains method
                defs.contains = function (el) {
                    var children = defs.children;
                    if (!children) {
                        return false;
                    }
                    for (var i = children.length - 1; i >= 0; --i) {
                        if (children[i] === el) {
                            return true;
                        }
                    }
                    return false;
                };
            }
            return defs;
        }
        else {
            return null;
        }
    }
    else {
        return defs[0];
    }
};


/**
 * Update DOM element if necessary.
 *
 * @param {Object|string} element style element. e.g., for gradient,
 *                                it may be '#ccc' or {type: 'linear', ...}
 * @param {Function|undefined} onUpdate update callback
 */
Definable.prototype.update = function (element, onUpdate) {
    if (!element) {
        return;
    }

    var defs = this.getDefs(false);
    if (element[this._domName] && defs.contains(element[this._domName])) {
        // Update DOM
        if (typeof onUpdate === 'function') {
            onUpdate(element);
        }
    }
    else {
        // No previous dom, create new
        var dom = this.add(element);
        if (dom) {
            element[this._domName] = dom;
        }
    }
};


/**
 * Add gradient dom to defs
 *
 * @param {SVGElement} dom DOM to be added to <defs>
 */
Definable.prototype.addDom = function (dom) {
    var defs = this.getDefs(true);
    defs.appendChild(dom);
};


/**
 * Remove DOM of a given element.
 *
 * @param {SVGElement} element element to remove dom
 */
Definable.prototype.removeDom = function (element) {
    var defs = this.getDefs(false);
    if (defs && element[this._domName]) {
        defs.removeChild(element[this._domName]);
        element[this._domName] = null;
    }
};


/**
 * Get DOMs of this element.
 *
 * @return {HTMLDomElement} doms of this defineable elements in <defs>
 */
Definable.prototype.getDoms = function () {
    var defs = this.getDefs(false);
    if (!defs) {
        // No dom when defs is not defined
        return [];
    }

    var doms = [];
    each(this._tagNames, function (tagName) {
        var tags = defs.getElementsByTagName(tagName);
        // Note that tags is HTMLCollection, which is array-like
        // rather than real array.
        // So `doms.concat(tags)` add tags as one object.
        doms = doms.concat([].slice.call(tags));
    });

    return doms;
};


/**
 * Mark DOMs to be unused before painting, and clear unused ones at the end
 * of the painting.
 */
Definable.prototype.markAllUnused = function () {
    var doms = this.getDoms();
    var that = this;
    each(doms, function (dom) {
        dom[that._markLabel] = MARK_UNUSED;
    });
};


/**
 * Mark a single DOM to be used.
 *
 * @param {SVGElement} dom DOM to mark
 */
Definable.prototype.markUsed = function (dom) {
    if (dom) {
        dom[this._markLabel] = MARK_USED;
    }
};


/**
 * Remove unused DOMs defined in <defs>
 */
Definable.prototype.removeUnused = function () {
    var defs = this.getDefs(false);
    if (!defs) {
        // Nothing to remove
        return;
    }

    var doms = this.getDoms();
    var that = this;
    each(doms, function (dom) {
        if (dom[that._markLabel] !== MARK_USED) {
            // Remove gradient
            defs.removeChild(dom);
        }
    });
};


/**
 * Get SVG proxy.
 *
 * @param {Displayable} displayable displayable element
 * @return {Path|Image|Text} svg proxy of given element
 */
Definable.prototype.getSvgProxy = function (displayable) {
    if (displayable instanceof Path) {
        return svgPath;
    }
    else if (displayable instanceof ZImage) {
        return svgImage;
    }
    else if (displayable instanceof Text) {
        return svgText;
    }
    else {
        return svgPath;
    }
};


/**
 * Get text SVG element.
 *
 * @param {Displayable} displayable displayable element
 * @return {SVGElement} SVG element of text
 */
Definable.prototype.getTextSvgElement = function (displayable) {
    return displayable.__textSvgEl;
};


/**
 * Get SVG element.
 *
 * @param {Displayable} displayable displayable element
 * @return {SVGElement} SVG element
 */
Definable.prototype.getSvgElement = function (displayable) {
    return displayable.__svgEl;
};

/**
 * @file Manages SVG gradient elements.
 * @author Zhang Wenli
 */

/**
 * Manages SVG gradient elements.
 *
 * @class
 * @extends Definable
 * @param   {number}     zrId    zrender instance id
 * @param   {SVGElement} svgRoot root of SVG document
 */
function GradientManager(zrId, svgRoot) {
    Definable.call(
        this,
        zrId,
        svgRoot,
        ['linearGradient', 'radialGradient'],
        '__gradient_in_use__'
    );
}


inherits(GradientManager, Definable);


/**
 * Create new gradient DOM for fill or stroke if not exist,
 * but will not update gradient if exists.
 *
 * @param {SvgElement}  svgElement   SVG element to paint
 * @param {Displayable} displayable  zrender displayable element
 */
GradientManager.prototype.addWithoutUpdate = function (
    svgElement,
    displayable
) {
    if (displayable && displayable.style) {
        var that = this;
        each(['fill', 'stroke'], function (fillOrStroke) {
            if (displayable.style[fillOrStroke]
                && (displayable.style[fillOrStroke].type === 'linear'
                || displayable.style[fillOrStroke].type === 'radial')
            ) {
                var gradient = displayable.style[fillOrStroke];
                var defs = that.getDefs(true);

                // Create dom in <defs> if not exists
                var dom;
                if (gradient._dom) {
                    // Gradient exists
                    dom = gradient._dom;
                    if (!defs.contains(gradient._dom)) {
                        // _dom is no longer in defs, recreate
                        that.addDom(dom);
                    }
                }
                else {
                    // New dom
                    dom = that.add(gradient);
                }

                that.markUsed(displayable);

                var id = dom.getAttribute('id');
                svgElement.setAttribute(fillOrStroke, 'url(#' + id + ')');
            }
        });
    }
};


/**
 * Add a new gradient tag in <defs>
 *
 * @param   {Gradient} gradient zr gradient instance
 * @return {SVGLinearGradientElement | SVGRadialGradientElement}
 *                            created DOM
 */
GradientManager.prototype.add = function (gradient) {
    var dom;
    if (gradient.type === 'linear') {
        dom = this.createElement('linearGradient');
    }
    else if (gradient.type === 'radial') {
        dom = this.createElement('radialGradient');
    }
    else {
        zrLog('Illegal gradient type.');
        return null;
    }

    // Set dom id with gradient id, since each gradient instance
    // will have no more than one dom element.
    // id may exists before for those dirty elements, in which case
    // id should remain the same, and other attributes should be
    // updated.
    gradient.id = gradient.id || this.nextId++;
    dom.setAttribute('id', 'zr' + this._zrId
        + '-gradient-' + gradient.id);

    this.updateDom(gradient, dom);
    this.addDom(dom);

    return dom;
};


/**
 * Update gradient.
 *
 * @param {Gradient} gradient zr gradient instance
 */
GradientManager.prototype.update = function (gradient) {
    var that = this;
    Definable.prototype.update.call(this, gradient, function () {
        var type = gradient.type;
        var tagName = gradient._dom.tagName;
        if (type === 'linear' && tagName === 'linearGradient'
            || type === 'radial' && tagName === 'radialGradient'
        ) {
            // Gradient type is not changed, update gradient
            that.updateDom(gradient, gradient._dom);
        }
        else {
            // Remove and re-create if type is changed
            that.removeDom(gradient);
            that.add(gradient);
        }
    });
};


/**
 * Update gradient dom
 *
 * @param {Gradient} gradient zr gradient instance
 * @param {SVGLinearGradientElement | SVGRadialGradientElement} dom
 *                            DOM to update
 */
GradientManager.prototype.updateDom = function (gradient, dom) {
    if (gradient.type === 'linear') {
        dom.setAttribute('x1', gradient.x);
        dom.setAttribute('y1', gradient.y);
        dom.setAttribute('x2', gradient.x2);
        dom.setAttribute('y2', gradient.y2);
    }
    else if (gradient.type === 'radial') {
        dom.setAttribute('cx', gradient.x);
        dom.setAttribute('cy', gradient.y);
        dom.setAttribute('r', gradient.r);
    }
    else {
        zrLog('Illegal gradient type.');
        return;
    }

    if (gradient.global) {
        // x1, x2, y1, y2 in range of 0 to canvas width or height
        dom.setAttribute('gradientUnits', 'userSpaceOnUse');
    }
    else {
        // x1, x2, y1, y2 in range of 0 to 1
        dom.setAttribute('gradientUnits', 'objectBoundingBox');
    }

    // Remove color stops if exists
    dom.innerHTML = '';

    // Add color stops
    var colors = gradient.colorStops;
    for (var i = 0, len = colors.length; i < len; ++i) {
        var stop = this.createElement('stop');
        stop.setAttribute('offset', colors[i].offset * 100 + '%');

        var color = colors[i].color;
        if (color.indexOf('rgba' > -1)) {
            // Fix Safari bug that stop-color not recognizing alpha #9014
            var opacity = parse(color)[3];
            var hex = toHex(color);

            // stop-color cannot be color, since:
            // The opacity value used for the gradient calculation is the
            // *product* of the value of stop-opacity and the opacity of the
            // value of stop-color.
            // See https://www.w3.org/TR/SVG2/pservers.html#StopOpacityProperty
            stop.setAttribute('stop-color', '#' + hex);
            stop.setAttribute('stop-opacity', opacity);
        }
        else {
            stop.setAttribute('stop-color', colors[i].color);
        }

        dom.appendChild(stop);
    }

    // Store dom element in gradient, to avoid creating multiple
    // dom instances for the same gradient element
    gradient._dom = dom;
};

/**
 * Mark a single gradient to be used
 *
 * @param {Displayable} displayable displayable element
 */
GradientManager.prototype.markUsed = function (displayable) {
    if (displayable.style) {
        var gradient = displayable.style.fill;
        if (gradient && gradient._dom) {
            Definable.prototype.markUsed.call(this, gradient._dom);
        }

        gradient = displayable.style.stroke;
        if (gradient && gradient._dom) {
            Definable.prototype.markUsed.call(this, gradient._dom);
        }
    }
};

/**
 * @file Manages SVG clipPath elements.
 * @author Zhang Wenli
 */

/**
 * Manages SVG clipPath elements.
 *
 * @class
 * @extends Definable
 * @param   {number}     zrId    zrender instance id
 * @param   {SVGElement} svgRoot root of SVG document
 */
function ClippathManager(zrId, svgRoot) {
    Definable.call(this, zrId, svgRoot, 'clipPath', '__clippath_in_use__');
}


inherits(ClippathManager, Definable);


/**
 * Update clipPath.
 *
 * @param {Displayable} displayable displayable element
 */
ClippathManager.prototype.update = function (displayable) {
    var svgEl = this.getSvgElement(displayable);
    if (svgEl) {
        this.updateDom(svgEl, displayable.__clipPaths, false);
    }

    var textEl = this.getTextSvgElement(displayable);
    if (textEl) {
        // Make another clipPath for text, since it's transform
        // matrix is not the same with svgElement
        this.updateDom(textEl, displayable.__clipPaths, true);
    }

    this.markUsed(displayable);
};


/**
 * Create an SVGElement of displayable and create a <clipPath> of its
 * clipPath
 *
 * @param {Displayable} parentEl  parent element
 * @param {ClipPath[]}  clipPaths clipPaths of parent element
 * @param {boolean}     isText    if parent element is Text
 */
ClippathManager.prototype.updateDom = function (
    parentEl,
    clipPaths,
    isText
) {
    if (clipPaths && clipPaths.length > 0) {
        // Has clipPath, create <clipPath> with the first clipPath
        var defs = this.getDefs(true);
        var clipPath = clipPaths[0];
        var clipPathEl;
        var id;

        var dom = isText ? '_textDom' : '_dom';

        if (clipPath[dom]) {
            // Use a dom that is already in <defs>
            id = clipPath[dom].getAttribute('id');
            clipPathEl = clipPath[dom];

            // Use a dom that is already in <defs>
            if (!defs.contains(clipPathEl)) {
                // This happens when set old clipPath that has
                // been previously removed
                defs.appendChild(clipPathEl);
            }
        }
        else {
            // New <clipPath>
            id = 'zr' + this._zrId + '-clip-' + this.nextId;
            ++this.nextId;
            clipPathEl = this.createElement('clipPath');
            clipPathEl.setAttribute('id', id);
            defs.appendChild(clipPathEl);

            clipPath[dom] = clipPathEl;
        }

        // Build path and add to <clipPath>
        var svgProxy = this.getSvgProxy(clipPath);
        if (clipPath.transform
            && clipPath.parent.invTransform
            && !isText
        ) {
            /**
             * If a clipPath has a parent with transform, the transform
             * of parent should not be considered when setting transform
             * of clipPath. So we need to transform back from parent's
             * transform, which is done by multiplying parent's inverse
             * transform.
             */
            // Store old transform
            var transform = Array.prototype.slice.call(
                clipPath.transform
            );

            // Transform back from parent, and brush path
            mul$1(
                clipPath.transform,
                clipPath.parent.invTransform,
                clipPath.transform
            );
            svgProxy.brush(clipPath);

            // Set back transform of clipPath
            clipPath.transform = transform;
        }
        else {
            svgProxy.brush(clipPath);
        }

        var pathEl = this.getSvgElement(clipPath);

        clipPathEl.innerHTML = '';
        /**
         * Use `cloneNode()` here to appendChild to multiple parents,
         * which may happend when Text and other shapes are using the same
         * clipPath. Since Text will create an extra clipPath DOM due to
         * different transform rules.
         */
        clipPathEl.appendChild(pathEl.cloneNode());

        parentEl.setAttribute('clip-path', 'url(#' + id + ')');

        if (clipPaths.length > 1) {
            // Make the other clipPaths recursively
            this.updateDom(clipPathEl, clipPaths.slice(1), isText);
        }
    }
    else {
        // No clipPath
        if (parentEl) {
            parentEl.setAttribute('clip-path', 'none');
        }
    }
};

/**
 * Mark a single clipPath to be used
 *
 * @param {Displayable} displayable displayable element
 */
ClippathManager.prototype.markUsed = function (displayable) {
    var that = this;
    if (displayable.__clipPaths && displayable.__clipPaths.length > 0) {
        each(displayable.__clipPaths, function (clipPath) {
            if (clipPath._dom) {
                Definable.prototype.markUsed.call(that, clipPath._dom);
            }
            if (clipPath._textDom) {
                Definable.prototype.markUsed.call(that, clipPath._textDom);
            }
        });
    }
};

/**
 * @file Manages SVG shadow elements.
 * @author Zhang Wenli
 */

/**
 * Manages SVG shadow elements.
 *
 * @class
 * @extends Definable
 * @param   {number}     zrId    zrender instance id
 * @param   {SVGElement} svgRoot root of SVG document
 */
function ShadowManager(zrId, svgRoot) {
    Definable.call(
        this,
        zrId,
        svgRoot,
        ['filter'],
        '__filter_in_use__',
        '_shadowDom'
    );
}


inherits(ShadowManager, Definable);


/**
 * Create new shadow DOM for fill or stroke if not exist,
 * but will not update shadow if exists.
 *
 * @param {SvgElement}  svgElement   SVG element to paint
 * @param {Displayable} displayable  zrender displayable element
 */
ShadowManager.prototype.addWithoutUpdate = function (
    svgElement,
    displayable
) {
    if (displayable && hasShadow(displayable.style)) {
        var style = displayable.style;

        // Create dom in <defs> if not exists
        var dom;
        if (style._shadowDom) {
            // Gradient exists
            dom = style._shadowDom;

            var defs = this.getDefs(true);
            if (!defs.contains(style._shadowDom)) {
                // _shadowDom is no longer in defs, recreate
                this.addDom(dom);
            }
        }
        else {
            // New dom
            dom = this.add(displayable);
        }

        this.markUsed(displayable);

        var id = dom.getAttribute('id');
        svgElement.style.filter = 'url(#' + id + ')';
    }
};


/**
 * Add a new shadow tag in <defs>
 *
 * @param {Displayable} displayable  zrender displayable element
 * @return {SVGFilterElement} created DOM
 */
ShadowManager.prototype.add = function (displayable) {
    var dom = this.createElement('filter');
    var style = displayable.style;

    // Set dom id with shadow id, since each shadow instance
    // will have no more than one dom element.
    // id may exists before for those dirty elements, in which case
    // id should remain the same, and other attributes should be
    // updated.
    style._shadowDomId = style._shadowDomId || this.nextId++;
    dom.setAttribute('id', 'zr' + this._zrId
        + '-shadow-' + style._shadowDomId);

    this.updateDom(displayable, dom);
    this.addDom(dom);

    return dom;
};


/**
 * Update shadow.
 *
 * @param {Displayable} displayable  zrender displayable element
 */
ShadowManager.prototype.update = function (svgElement, displayable) {
    var style = displayable.style;
    if (hasShadow(style)) {
        var that = this;
        Definable.prototype.update.call(this, displayable, function (style) {
            that.updateDom(displayable, style._shadowDom);
        });
    }
    else {
        // Remove shadow
        this.remove(svgElement, style);
    }
};


/**
 * Remove DOM and clear parent filter
 */
ShadowManager.prototype.remove = function (svgElement, style) {
    if (style._shadowDomId != null) {
        this.removeDom(style);
        svgElement.style.filter = '';
    }
};


/**
 * Update shadow dom
 *
 * @param {Displayable} displayable  zrender displayable element
 * @param {SVGFilterElement} dom DOM to update
 */
ShadowManager.prototype.updateDom = function (displayable, dom) {
    var domChild = dom.getElementsByTagName('feDropShadow');
    if (domChild.length === 0) {
        domChild = this.createElement('feDropShadow');
    }
    else {
        domChild = domChild[0];
    }

    var style = displayable.style;
    var scaleX = displayable.scale ? (displayable.scale[0] || 1) : 1;
    var scaleY = displayable.scale ? (displayable.scale[1] || 1) : 1;

    // TODO: textBoxShadowBlur is not supported yet
    var offsetX, offsetY, blur, color;
    if (style.shadowBlur || style.shadowOffsetX || style.shadowOffsetY) {
        offsetX = style.shadowOffsetX || 0;
        offsetY = style.shadowOffsetY || 0;
        blur = style.shadowBlur;
        color = style.shadowColor;
    }
    else if (style.textShadowBlur) {
        offsetX = style.textShadowOffsetX || 0;
        offsetY = style.textShadowOffsetY || 0;
        blur = style.textShadowBlur;
        color = style.textShadowColor;
    }
    else {
        // Remove shadow
        this.removeDom(dom, style);
        return;
    }

    domChild.setAttribute('dx', offsetX / scaleX);
    domChild.setAttribute('dy', offsetY / scaleY);
    domChild.setAttribute('flood-color', color);

    // Divide by two here so that it looks the same as in canvas
    // See: https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowblur
    var stdDx = blur / 2 / scaleX;
    var stdDy = blur / 2 / scaleY;
    var stdDeviation = stdDx + ' ' + stdDy;
    domChild.setAttribute('stdDeviation', stdDeviation);

    // Fix filter clipping problem
    dom.setAttribute('x', '-100%');
    dom.setAttribute('y', '-100%');
    dom.setAttribute('width', Math.ceil(blur / 2 * 200) + '%');
    dom.setAttribute('height', Math.ceil(blur / 2 * 200) + '%');

    dom.appendChild(domChild);

    // Store dom element in shadow, to avoid creating multiple
    // dom instances for the same shadow element
    style._shadowDom = dom;
};

/**
 * Mark a single shadow to be used
 *
 * @param {Displayable} displayable displayable element
 */
ShadowManager.prototype.markUsed = function (displayable) {
    var style = displayable.style;
    if (style && style._shadowDom) {
        Definable.prototype.markUsed.call(this, style._shadowDom);
    }
};

function hasShadow(style) {
    // TODO: textBoxShadowBlur is not supported yet
    return style
        && (style.shadowBlur || style.shadowOffsetX || style.shadowOffsetY
            || style.textShadowBlur || style.textShadowOffsetX
            || style.textShadowOffsetY);
}

/**
 * SVG Painter
 * @module zrender/svg/Painter
 */

function parseInt10$1(val) {
    return parseInt(val, 10);
}

function getSvgProxy(el) {
    if (el instanceof Path) {
        return svgPath;
    }
    else if (el instanceof ZImage) {
        return svgImage;
    }
    else if (el instanceof Text) {
        return svgText;
    }
    else {
        return svgPath;
    }
}

function checkParentAvailable(parent, child) {
    return child && parent && child.parentNode !== parent;
}

function insertAfter(parent, child, prevSibling) {
    if (checkParentAvailable(parent, child) && prevSibling) {
        var nextSibling = prevSibling.nextSibling;
        nextSibling ? parent.insertBefore(child, nextSibling)
            : parent.appendChild(child);
    }
}

function prepend(parent, child) {
    if (checkParentAvailable(parent, child)) {
        var firstChild = parent.firstChild;
        firstChild ? parent.insertBefore(child, firstChild)
            : parent.appendChild(child);
    }
}

function remove(parent, child) {
    if (child && parent && child.parentNode === parent) {
        parent.removeChild(child);
    }
}

function getTextSvgElement(displayable) {
    return displayable.__textSvgEl;
}

function getSvgElement(displayable) {
    return displayable.__svgEl;
}

/**
 * @alias module:zrender/svg/Painter
 * @constructor
 * @param {HTMLElement} root 绘图容器
 * @param {module:zrender/Storage} storage
 * @param {Object} opts
 */
var SVGPainter = function (root, storage, opts, zrId) {

    this.root = root;
    this.storage = storage;
    this._opts = opts = extend({}, opts || {});

    var svgRoot = createElement('svg');
    svgRoot.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgRoot.setAttribute('version', '1.1');
    svgRoot.setAttribute('baseProfile', 'full');
    svgRoot.style.cssText = 'user-select:none;position:absolute;left:0;top:0;';

    this.gradientManager = new GradientManager(zrId, svgRoot);
    this.clipPathManager = new ClippathManager(zrId, svgRoot);
    this.shadowManager = new ShadowManager(zrId, svgRoot);

    var viewport = document.createElement('div');
    viewport.style.cssText = 'overflow:hidden;position:relative';

    this._svgRoot = svgRoot;
    this._viewport = viewport;

    root.appendChild(viewport);
    viewport.appendChild(svgRoot);

    this.resize(opts.width, opts.height);

    this._visibleList = [];
};

SVGPainter.prototype = {

    constructor: SVGPainter,

    getType: function () {
        return 'svg';
    },

    getViewportRoot: function () {
        return this._viewport;
    },

    getViewportRootOffset: function () {
        var viewportRoot = this.getViewportRoot();
        if (viewportRoot) {
            return {
                offsetLeft: viewportRoot.offsetLeft || 0,
                offsetTop: viewportRoot.offsetTop || 0
            };
        }
    },

    refresh: function () {

        var list = this.storage.getDisplayList(true);

        this._paintList(list);
    },

    setBackgroundColor: function (backgroundColor) {
        // TODO gradient
        this._viewport.style.background = backgroundColor;
    },

    _paintList: function (list) {
        this.gradientManager.markAllUnused();
        this.clipPathManager.markAllUnused();
        this.shadowManager.markAllUnused();

        var svgRoot = this._svgRoot;
        var visibleList = this._visibleList;
        var listLen = list.length;

        var newVisibleList = [];
        var i;
        for (i = 0; i < listLen; i++) {
            var displayable = list[i];
            var svgProxy = getSvgProxy(displayable);
            var svgElement = getSvgElement(displayable)
                || getTextSvgElement(displayable);
            if (!displayable.invisible) {
                if (displayable.__dirty) {
                    svgProxy && svgProxy.brush(displayable);

                    // Update clipPath
                    this.clipPathManager.update(displayable);

                    // Update gradient and shadow
                    if (displayable.style) {
                        this.gradientManager
                            .update(displayable.style.fill);
                        this.gradientManager
                            .update(displayable.style.stroke);

                        this.shadowManager
                            .update(svgElement, displayable);
                    }

                    displayable.__dirty = false;
                }
                newVisibleList.push(displayable);
            }
        }

        var diff = arrayDiff$1(visibleList, newVisibleList);
        var prevSvgElement;

        // First do remove, in case element moved to the head and do remove
        // after add
        for (i = 0; i < diff.length; i++) {
            var item = diff[i];
            if (item.removed) {
                for (var k = 0; k < item.count; k++) {
                    var displayable = visibleList[item.indices[k]];
                    var svgElement = getSvgElement(displayable);
                    var textSvgElement = getTextSvgElement(displayable);
                    remove(svgRoot, svgElement);
                    remove(svgRoot, textSvgElement);
                }
            }
        }
        for (i = 0; i < diff.length; i++) {
            var item = diff[i];
            if (item.added) {
                for (var k = 0; k < item.count; k++) {
                    var displayable = newVisibleList[item.indices[k]];
                    var svgElement = getSvgElement(displayable);
                    var textSvgElement = getTextSvgElement(displayable);
                    prevSvgElement
                        ? insertAfter(svgRoot, svgElement, prevSvgElement)
                        : prepend(svgRoot, svgElement);
                    if (svgElement) {
                        insertAfter(svgRoot, textSvgElement, svgElement);
                    }
                    else if (prevSvgElement) {
                        insertAfter(
                            svgRoot, textSvgElement, prevSvgElement
                        );
                    }
                    else {
                        prepend(svgRoot, textSvgElement);
                    }
                    // Insert text
                    insertAfter(svgRoot, textSvgElement, svgElement);
                    prevSvgElement = textSvgElement || svgElement
                        || prevSvgElement;

                    this.gradientManager
                        .addWithoutUpdate(svgElement, displayable);
                    this.shadowManager
                        .addWithoutUpdate(prevSvgElement, displayable);
                    this.clipPathManager.markUsed(displayable);
                }
            }
            else if (!item.removed) {
                for (var k = 0; k < item.count; k++) {
                    var displayable = newVisibleList[item.indices[k]];
                    prevSvgElement =
                        svgElement =
                        getTextSvgElement(displayable)
                        || getSvgElement(displayable)
                        || prevSvgElement;

                    this.gradientManager.markUsed(displayable);
                    this.gradientManager
                        .addWithoutUpdate(svgElement, displayable);

                    this.shadowManager.markUsed(displayable);
                    this.shadowManager
                        .addWithoutUpdate(svgElement, displayable);

                    this.clipPathManager.markUsed(displayable);
                }
            }
        }

        this.gradientManager.removeUnused();
        this.clipPathManager.removeUnused();
        this.shadowManager.removeUnused();

        this._visibleList = newVisibleList;
    },

    _getDefs: function (isForceCreating) {
        var svgRoot = this._svgRoot;
        var defs = this._svgRoot.getElementsByTagName('defs');
        if (defs.length === 0) {
            // Not exist
            if (isForceCreating) {
                var defs = svgRoot.insertBefore(
                    createElement('defs'), // Create new tag
                    svgRoot.firstChild // Insert in the front of svg
                );
                if (!defs.contains) {
                    // IE doesn't support contains method
                    defs.contains = function (el) {
                        var children = defs.children;
                        if (!children) {
                            return false;
                        }
                        for (var i = children.length - 1; i >= 0; --i) {
                            if (children[i] === el) {
                                return true;
                            }
                        }
                        return false;
                    };
                }
                return defs;
            }
            else {
                return null;
            }
        }
        else {
            return defs[0];
        }
    },

    resize: function (width, height) {
        var viewport = this._viewport;
        // FIXME Why ?
        viewport.style.display = 'none';

        // Save input w/h
        var opts = this._opts;
        width != null && (opts.width = width);
        height != null && (opts.height = height);

        width = this._getSize(0);
        height = this._getSize(1);

        viewport.style.display = '';

        if (this._width !== width || this._height !== height) {
            this._width = width;
            this._height = height;

            var viewportStyle = viewport.style;
            viewportStyle.width = width + 'px';
            viewportStyle.height = height + 'px';

            var svgRoot = this._svgRoot;
            // Set width by 'svgRoot.width = width' is invalid
            svgRoot.setAttribute('width', width);
            svgRoot.setAttribute('height', height);
        }
    },

    /**
     * 获取绘图区域宽度
     */
    getWidth: function () {
        return this._width;
    },

    /**
     * 获取绘图区域高度
     */
    getHeight: function () {
        return this._height;
    },

    _getSize: function (whIdx) {
        var opts = this._opts;
        var wh = ['width', 'height'][whIdx];
        var cwh = ['clientWidth', 'clientHeight'][whIdx];
        var plt = ['paddingLeft', 'paddingTop'][whIdx];
        var prb = ['paddingRight', 'paddingBottom'][whIdx];

        if (opts[wh] != null && opts[wh] !== 'auto') {
            return parseFloat(opts[wh]);
        }

        var root = this.root;
        // IE8 does not support getComputedStyle, but it use VML.
        var stl = document.defaultView.getComputedStyle(root);

        return (
            (root[cwh] || parseInt10$1(stl[wh]) || parseInt10$1(root.style[wh]))
            - (parseInt10$1(stl[plt]) || 0)
            - (parseInt10$1(stl[prb]) || 0)
        ) | 0;
    },

    dispose: function () {
        this.root.innerHTML = '';

        this._svgRoot =
            this._viewport =
            this.storage =
            null;
    },

    clear: function () {
        if (this._viewport) {
            this.root.removeChild(this._viewport);
        }
    },

    pathToDataUrl: function () {
        this.refresh();
        var html = this._svgRoot.outerHTML;
        return 'data:image/svg+xml;charset=UTF-8,' + html;
    }
};

// Not supported methods
function createMethodNotSupport(method) {
    return function () {
        zrLog('In SVG mode painter not support method "' + method + '"');
    };
}

// Unsuppoted methods
each([
    'getLayer', 'insertLayer', 'eachLayer', 'eachBuiltinLayer',
    'eachOtherLayer', 'getLayers', 'modLayer', 'delLayer', 'clearLayer',
    'toDataURL', 'pathToImage'
], function (name) {
    SVGPainter.prototype[name] = createMethodNotSupport(name);
});

registerPainter('svg', SVGPainter);

var urn = 'urn:schemas-microsoft-com:vml';
var win = typeof window === 'undefined' ? null : window;

var vmlInited = false;

var doc = win && win.document;

function createNode(tagName) {
    return doCreateNode(tagName);
}

// Avoid assign to an exported variable, for transforming to cjs.
var doCreateNode;

if (doc && !env$1.canvasSupported) {
    try {
        !doc.namespaces.zrvml && doc.namespaces.add('zrvml', urn);
        doCreateNode = function (tagName) {
            return doc.createElement('<zrvml:' + tagName + ' class="zrvml">');
        };
    }
    catch (e) {
        doCreateNode = function (tagName) {
            return doc.createElement('<' + tagName + ' xmlns="' + urn + '" class="zrvml">');
        };
    }
}

// From raphael
function initVML() {
    if (vmlInited || !doc) {
        return;
    }
    vmlInited = true;

    var styleSheets = doc.styleSheets;
    if (styleSheets.length < 31) {
        doc.createStyleSheet().addRule('.zrvml', 'behavior:url(#default#VML)');
    }
    else {
        // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx
        styleSheets[0].addRule('.zrvml', 'behavior:url(#default#VML)');
    }
}

// http://www.w3.org/TR/NOTE-VML
// TODO Use proxy like svg instead of overwrite brush methods

var CMD$4 = PathProxy.CMD;
var round$1 = Math.round;
var sqrt = Math.sqrt;
var abs$1 = Math.abs;
var cos$4 = Math.cos;
var sin$4 = Math.sin;
var mathMax$3 = Math.max;

if (!env$1.canvasSupported) {

    var comma = ',';
    var imageTransformPrefix = 'progid:DXImageTransform.Microsoft';

    var Z = 21600;
    var Z2 = Z / 2;

    var ZLEVEL_BASE = 100000;
    var Z_BASE = 1000;

    var initRootElStyle = function (el) {
        el.style.cssText = 'position:absolute;left:0;top:0;width:1px;height:1px;';
        el.coordsize = Z + ',' + Z;
        el.coordorigin = '0,0';
    };

    var encodeHtmlAttribute = function (s) {
        return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    };

    var rgb2Str = function (r, g, b) {
        return 'rgb(' + [r, g, b].join(',') + ')';
    };

    var append$1 = function (parent, child) {
        if (child && parent && child.parentNode !== parent) {
            parent.appendChild(child);
        }
    };

    var remove$1 = function (parent, child) {
        if (child && parent && child.parentNode === parent) {
            parent.removeChild(child);
        }
    };

    var getZIndex = function (zlevel, z, z2) {
        // z 的取值范围为 [0, 1000]
        return (parseFloat(zlevel) || 0) * ZLEVEL_BASE + (parseFloat(z) || 0) * Z_BASE + z2;
    };

    var parsePercent$1 = function (value, maxValue) {
        if (typeof value === 'string') {
            if (value.lastIndexOf('%') >= 0) {
                return parseFloat(value) / 100 * maxValue;
            }
            return parseFloat(value);
        }
        return value;
    };

    /***************************************************
     * PATH
     **************************************************/

    var setColorAndOpacity = function (el, color, opacity) {
        var colorArr = parse(color);
        opacity = +opacity;
        if (isNaN(opacity)) {
            opacity = 1;
        }
        if (colorArr) {
            el.color = rgb2Str(colorArr[0], colorArr[1], colorArr[2]);
            el.opacity = opacity * colorArr[3];
        }
    };

    var getColorAndAlpha = function (color) {
        var colorArr = parse(color);
        return [
            rgb2Str(colorArr[0], colorArr[1], colorArr[2]),
            colorArr[3]
        ];
    };

    var updateFillNode = function (el, style, zrEl) {
        // TODO pattern
        var fill = style.fill;
        if (fill != null) {
            // Modified from excanvas
            if (fill instanceof Gradient) {
                var gradientType;
                var angle = 0;
                var focus = [0, 0];
                // additional offset
                var shift = 0;
                // scale factor for offset
                var expansion = 1;
                var rect = zrEl.getBoundingRect();
                var rectWidth = rect.width;
                var rectHeight = rect.height;
                if (fill.type === 'linear') {
                    gradientType = 'gradient';
                    var transform = zrEl.transform;
                    var p0 = [fill.x * rectWidth, fill.y * rectHeight];
                    var p1 = [fill.x2 * rectWidth, fill.y2 * rectHeight];
                    if (transform) {
                        applyTransform(p0, p0, transform);
                        applyTransform(p1, p1, transform);
                    }
                    var dx = p1[0] - p0[0];
                    var dy = p1[1] - p0[1];
                    angle = Math.atan2(dx, dy) * 180 / Math.PI;
                    // The angle should be a non-negative number.
                    if (angle < 0) {
                        angle += 360;
                    }

                    // Very small angles produce an unexpected result because they are
                    // converted to a scientific notation string.
                    if (angle < 1e-6) {
                        angle = 0;
                    }
                }
                else {
                    gradientType = 'gradientradial';
                    var p0 = [fill.x * rectWidth, fill.y * rectHeight];
                    var transform = zrEl.transform;
                    var scale$$1 = zrEl.scale;
                    var width = rectWidth;
                    var height = rectHeight;
                    focus = [
                        // Percent in bounding rect
                        (p0[0] - rect.x) / width,
                        (p0[1] - rect.y) / height
                    ];
                    if (transform) {
                        applyTransform(p0, p0, transform);
                    }

                    width /= scale$$1[0] * Z;
                    height /= scale$$1[1] * Z;
                    var dimension = mathMax$3(width, height);
                    shift = 2 * 0 / dimension;
                    expansion = 2 * fill.r / dimension - shift;
                }

                // We need to sort the color stops in ascending order by offset,
                // otherwise IE won't interpret it correctly.
                var stops = fill.colorStops.slice();
                stops.sort(function (cs1, cs2) {
                    return cs1.offset - cs2.offset;
                });

                var length$$1 = stops.length;
                // Color and alpha list of first and last stop
                var colorAndAlphaList = [];
                var colors = [];
                for (var i = 0; i < length$$1; i++) {
                    var stop = stops[i];
                    var colorAndAlpha = getColorAndAlpha(stop.color);
                    colors.push(stop.offset * expansion + shift + ' ' + colorAndAlpha[0]);
                    if (i === 0 || i === length$$1 - 1) {
                        colorAndAlphaList.push(colorAndAlpha);
                    }
                }

                if (length$$1 >= 2) {
                    var color1 = colorAndAlphaList[0][0];
                    var color2 = colorAndAlphaList[1][0];
                    var opacity1 = colorAndAlphaList[0][1] * style.opacity;
                    var opacity2 = colorAndAlphaList[1][1] * style.opacity;

                    el.type = gradientType;
                    el.method = 'none';
                    el.focus = '100%';
                    el.angle = angle;
                    el.color = color1;
                    el.color2 = color2;
                    el.colors = colors.join(',');
                    // When colors attribute is used, the meanings of opacity and o:opacity2
                    // are reversed.
                    el.opacity = opacity2;
                    // FIXME g_o_:opacity ?
                    el.opacity2 = opacity1;
                }
                if (gradientType === 'radial') {
                    el.focusposition = focus.join(',');
                }
            }
            else {
                // FIXME Change from Gradient fill to color fill
                setColorAndOpacity(el, fill, style.opacity);
            }
        }
    };

    var updateStrokeNode = function (el, style) {
        // if (style.lineJoin != null) {
        //     el.joinstyle = style.lineJoin;
        // }
        // if (style.miterLimit != null) {
        //     el.miterlimit = style.miterLimit * Z;
        // }
        // if (style.lineCap != null) {
        //     el.endcap = style.lineCap;
        // }
        if (style.lineDash != null) {
            el.dashstyle = style.lineDash.join(' ');
        }
        if (style.stroke != null && !(style.stroke instanceof Gradient)) {
            setColorAndOpacity(el, style.stroke, style.opacity);
        }
    };

    var updateFillAndStroke = function (vmlEl, type, style, zrEl) {
        var isFill = type === 'fill';
        var el = vmlEl.getElementsByTagName(type)[0];
        // Stroke must have lineWidth
        if (style[type] != null && style[type] !== 'none' && (isFill || (!isFill && style.lineWidth))) {
            vmlEl[isFill ? 'filled' : 'stroked'] = 'true';
            // FIXME Remove before updating, or set `colors` will throw error
            if (style[type] instanceof Gradient) {
                remove$1(vmlEl, el);
            }
            if (!el) {
                el = createNode(type);
            }

            isFill ? updateFillNode(el, style, zrEl) : updateStrokeNode(el, style);
            append$1(vmlEl, el);
        }
        else {
            vmlEl[isFill ? 'filled' : 'stroked'] = 'false';
            remove$1(vmlEl, el);
        }
    };

    var points$1 = [[], [], []];
    var pathDataToString$1 = function (path, m) {
        var M = CMD$4.M;
        var C = CMD$4.C;
        var L = CMD$4.L;
        var A = CMD$4.A;
        var Q = CMD$4.Q;

        var str = [];
        var nPoint;
        var cmdStr;
        var cmd;
        var i;
        var xi;
        var yi;
        var data = path.data;
        var dataLength = path.len();
        for (i = 0; i < dataLength;) {
            cmd = data[i++];
            cmdStr = '';
            nPoint = 0;
            switch (cmd) {
                case M:
                    cmdStr = ' m ';
                    nPoint = 1;
                    xi = data[i++];
                    yi = data[i++];
                    points$1[0][0] = xi;
                    points$1[0][1] = yi;
                    break;
                case L:
                    cmdStr = ' l ';
                    nPoint = 1;
                    xi = data[i++];
                    yi = data[i++];
                    points$1[0][0] = xi;
                    points$1[0][1] = yi;
                    break;
                case Q:
                case C:
                    cmdStr = ' c ';
                    nPoint = 3;
                    var x1 = data[i++];
                    var y1 = data[i++];
                    var x2 = data[i++];
                    var y2 = data[i++];
                    var x3;
                    var y3;
                    if (cmd === Q) {
                        // Convert quadratic to cubic using degree elevation
                        x3 = x2;
                        y3 = y2;
                        x2 = (x2 + 2 * x1) / 3;
                        y2 = (y2 + 2 * y1) / 3;
                        x1 = (xi + 2 * x1) / 3;
                        y1 = (yi + 2 * y1) / 3;
                    }
                    else {
                        x3 = data[i++];
                        y3 = data[i++];
                    }
                    points$1[0][0] = x1;
                    points$1[0][1] = y1;
                    points$1[1][0] = x2;
                    points$1[1][1] = y2;
                    points$1[2][0] = x3;
                    points$1[2][1] = y3;

                    xi = x3;
                    yi = y3;
                    break;
                case A:
                    var x = 0;
                    var y = 0;
                    var sx = 1;
                    var sy = 1;
                    var angle = 0;
                    if (m) {
                        // Extract SRT from matrix
                        x = m[4];
                        y = m[5];
                        sx = sqrt(m[0] * m[0] + m[1] * m[1]);
                        sy = sqrt(m[2] * m[2] + m[3] * m[3]);
                        angle = Math.atan2(-m[1] / sy, m[0] / sx);
                    }

                    var cx = data[i++];
                    var cy = data[i++];
                    var rx = data[i++];
                    var ry = data[i++];
                    var startAngle = data[i++] + angle;
                    var endAngle = data[i++] + startAngle + angle;
                    // FIXME
                    // var psi = data[i++];
                    i++;
                    var clockwise = data[i++];

                    var x0 = cx + cos$4(startAngle) * rx;
                    var y0 = cy + sin$4(startAngle) * ry;

                    var x1 = cx + cos$4(endAngle) * rx;
                    var y1 = cy + sin$4(endAngle) * ry;

                    var type = clockwise ? ' wa ' : ' at ';
                    if (Math.abs(x0 - x1) < 1e-4) {
                        // IE won't render arches drawn counter clockwise if x0 == x1.
                        if (Math.abs(endAngle - startAngle) > 1e-2) {
                            // Offset x0 by 1/80 of a pixel. Use something
                            // that can be represented in binary
                            if (clockwise) {
                                x0 += 270 / Z;
                            }
                        }
                        else {
                            // Avoid case draw full circle
                            if (Math.abs(y0 - cy) < 1e-4) {
                                if ((clockwise && x0 < cx) || (!clockwise && x0 > cx)) {
                                    y1 -= 270 / Z;
                                }
                                else {
                                    y1 += 270 / Z;
                                }
                            }
                            else if ((clockwise && y0 < cy) || (!clockwise && y0 > cy)) {
                                x1 += 270 / Z;
                            }
                            else {
                                x1 -= 270 / Z;
                            }
                        }
                    }
                    str.push(
                        type,
                        round$1(((cx - rx) * sx + x) * Z - Z2), comma,
                        round$1(((cy - ry) * sy + y) * Z - Z2), comma,
                        round$1(((cx + rx) * sx + x) * Z - Z2), comma,
                        round$1(((cy + ry) * sy + y) * Z - Z2), comma,
                        round$1((x0 * sx + x) * Z - Z2), comma,
                        round$1((y0 * sy + y) * Z - Z2), comma,
                        round$1((x1 * sx + x) * Z - Z2), comma,
                        round$1((y1 * sy + y) * Z - Z2)
                    );

                    xi = x1;
                    yi = y1;
                    break;
                case CMD$4.R:
                    var p0 = points$1[0];
                    var p1 = points$1[1];
                    // x0, y0
                    p0[0] = data[i++];
                    p0[1] = data[i++];
                    // x1, y1
                    p1[0] = p0[0] + data[i++];
                    p1[1] = p0[1] + data[i++];

                    if (m) {
                        applyTransform(p0, p0, m);
                        applyTransform(p1, p1, m);
                    }

                    p0[0] = round$1(p0[0] * Z - Z2);
                    p1[0] = round$1(p1[0] * Z - Z2);
                    p0[1] = round$1(p0[1] * Z - Z2);
                    p1[1] = round$1(p1[1] * Z - Z2);
                    str.push(
                        // x0, y0
                        ' m ', p0[0], comma, p0[1],
                        // x1, y0
                        ' l ', p1[0], comma, p0[1],
                        // x1, y1
                        ' l ', p1[0], comma, p1[1],
                        // x0, y1
                        ' l ', p0[0], comma, p1[1]
                    );
                    break;
                case CMD$4.Z:
                    // FIXME Update xi, yi
                    str.push(' x ');
            }

            if (nPoint > 0) {
                str.push(cmdStr);
                for (var k = 0; k < nPoint; k++) {
                    var p = points$1[k];

                    m && applyTransform(p, p, m);
                    // 不 round 会非常慢
                    str.push(
                        round$1(p[0] * Z - Z2), comma, round$1(p[1] * Z - Z2),
                        k < nPoint - 1 ? comma : ''
                    );
                }
            }
        }

        return str.join('');
    };

    // Rewrite the original path method
    Path.prototype.brushVML = function (vmlRoot) {
        var style = this.style;

        var vmlEl = this._vmlEl;
        if (!vmlEl) {
            vmlEl = createNode('shape');
            initRootElStyle(vmlEl);

            this._vmlEl = vmlEl;
        }

        updateFillAndStroke(vmlEl, 'fill', style, this);
        updateFillAndStroke(vmlEl, 'stroke', style, this);

        var m = this.transform;
        var needTransform = m != null;
        var strokeEl = vmlEl.getElementsByTagName('stroke')[0];
        if (strokeEl) {
            var lineWidth = style.lineWidth;
            // Get the line scale.
            // Determinant of this.m_ means how much the area is enlarged by the
            // transformation. So its square root can be used as a scale factor
            // for width.
            if (needTransform && !style.strokeNoScale) {
                var det = m[0] * m[3] - m[1] * m[2];
                lineWidth *= sqrt(abs$1(det));
            }
            strokeEl.weight = lineWidth + 'px';
        }

        var path = this.path || (this.path = new PathProxy());
        if (this.__dirtyPath) {
            path.beginPath();
            path.subPixelOptimize = false;
            this.buildPath(path, this.shape);
            path.toStatic();
            this.__dirtyPath = false;
        }

        vmlEl.path = pathDataToString$1(path, this.transform);

        vmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2);

        // Append to root
        append$1(vmlRoot, vmlEl);

        // Text
        if (style.text != null) {
            this.drawRectText(vmlRoot, this.getBoundingRect());
        }
        else {
            this.removeRectText(vmlRoot);
        }
    };

    Path.prototype.onRemove = function (vmlRoot) {
        remove$1(vmlRoot, this._vmlEl);
        this.removeRectText(vmlRoot);
    };

    Path.prototype.onAdd = function (vmlRoot) {
        append$1(vmlRoot, this._vmlEl);
        this.appendRectText(vmlRoot);
    };

    /***************************************************
     * IMAGE
     **************************************************/
    var isImage = function (img) {
        // FIXME img instanceof Image 如果 img 是一个字符串的时候，IE8 下会报错
        return (typeof img === 'object') && img.tagName && img.tagName.toUpperCase() === 'IMG';
        // return img instanceof Image;
    };

    // Rewrite the original path method
    ZImage.prototype.brushVML = function (vmlRoot) {
        var style = this.style;
        var image = style.image;

        // Image original width, height
        var ow;
        var oh;

        if (isImage(image)) {
            var src = image.src;
            if (src === this._imageSrc) {
                ow = this._imageWidth;
                oh = this._imageHeight;
            }
            else {
                var imageRuntimeStyle = image.runtimeStyle;
                var oldRuntimeWidth = imageRuntimeStyle.width;
                var oldRuntimeHeight = imageRuntimeStyle.height;
                imageRuntimeStyle.width = 'auto';
                imageRuntimeStyle.height = 'auto';

                // get the original size
                ow = image.width;
                oh = image.height;

                // and remove overides
                imageRuntimeStyle.width = oldRuntimeWidth;
                imageRuntimeStyle.height = oldRuntimeHeight;

                // Caching image original width, height and src
                this._imageSrc = src;
                this._imageWidth = ow;
                this._imageHeight = oh;
            }
            image = src;
        }
        else {
            if (image === this._imageSrc) {
                ow = this._imageWidth;
                oh = this._imageHeight;
            }
        }
        if (!image) {
            return;
        }

        var x = style.x || 0;
        var y = style.y || 0;

        var dw = style.width;
        var dh = style.height;

        var sw = style.sWidth;
        var sh = style.sHeight;
        var sx = style.sx || 0;
        var sy = style.sy || 0;

        var hasCrop = sw && sh;

        var vmlEl = this._vmlEl;
        if (!vmlEl) {
            // FIXME 使用 group 在 left, top 都不是 0 的时候就无法显示了。
            // vmlEl = vmlCore.createNode('group');
            vmlEl = doc.createElement('div');
            initRootElStyle(vmlEl);

            this._vmlEl = vmlEl;
        }

        var vmlElStyle = vmlEl.style;
        var hasRotation = false;
        var m;
        var scaleX = 1;
        var scaleY = 1;
        if (this.transform) {
            m = this.transform;
            scaleX = sqrt(m[0] * m[0] + m[1] * m[1]);
            scaleY = sqrt(m[2] * m[2] + m[3] * m[3]);

            hasRotation = m[1] || m[2];
        }
        if (hasRotation) {
            // If filters are necessary (rotation exists), create them
            // filters are bog-slow, so only create them if abbsolutely necessary
            // The following check doesn't account for skews (which don't exist
            // in the canvas spec (yet) anyway.
            // From excanvas
            var p0 = [x, y];
            var p1 = [x + dw, y];
            var p2 = [x, y + dh];
            var p3 = [x + dw, y + dh];
            applyTransform(p0, p0, m);
            applyTransform(p1, p1, m);
            applyTransform(p2, p2, m);
            applyTransform(p3, p3, m);

            var maxX = mathMax$3(p0[0], p1[0], p2[0], p3[0]);
            var maxY = mathMax$3(p0[1], p1[1], p2[1], p3[1]);

            var transformFilter = [];
            transformFilter.push('M11=', m[0] / scaleX, comma,
                        'M12=', m[2] / scaleY, comma,
                        'M21=', m[1] / scaleX, comma,
                        'M22=', m[3] / scaleY, comma,
                        'Dx=', round$1(x * scaleX + m[4]), comma,
                        'Dy=', round$1(y * scaleY + m[5]));

            vmlElStyle.padding = '0 ' + round$1(maxX) + 'px ' + round$1(maxY) + 'px 0';
            // FIXME DXImageTransform 在 IE11 的兼容模式下不起作用
            vmlElStyle.filter = imageTransformPrefix + '.Matrix('
                + transformFilter.join('') + ', SizingMethod=clip)';

        }
        else {
            if (m) {
                x = x * scaleX + m[4];
                y = y * scaleY + m[5];
            }
            vmlElStyle.filter = '';
            vmlElStyle.left = round$1(x) + 'px';
            vmlElStyle.top = round$1(y) + 'px';
        }

        var imageEl = this._imageEl;
        var cropEl = this._cropEl;

        if (!imageEl) {
            imageEl = doc.createElement('div');
            this._imageEl = imageEl;
        }
        var imageELStyle = imageEl.style;
        if (hasCrop) {
            // Needs know image original width and height
            if (!(ow && oh)) {
                var tmpImage = new Image();
                var self = this;
                tmpImage.onload = function () {
                    tmpImage.onload = null;
                    ow = tmpImage.width;
                    oh = tmpImage.height;
                    // Adjust image width and height to fit the ratio destinationSize / sourceSize
                    imageELStyle.width = round$1(scaleX * ow * dw / sw) + 'px';
                    imageELStyle.height = round$1(scaleY * oh * dh / sh) + 'px';

                    // Caching image original width, height and src
                    self._imageWidth = ow;
                    self._imageHeight = oh;
                    self._imageSrc = image;
                };
                tmpImage.src = image;
            }
            else {
                imageELStyle.width = round$1(scaleX * ow * dw / sw) + 'px';
                imageELStyle.height = round$1(scaleY * oh * dh / sh) + 'px';
            }

            if (!cropEl) {
                cropEl = doc.createElement('div');
                cropEl.style.overflow = 'hidden';
                this._cropEl = cropEl;
            }
            var cropElStyle = cropEl.style;
            cropElStyle.width = round$1((dw + sx * dw / sw) * scaleX);
            cropElStyle.height = round$1((dh + sy * dh / sh) * scaleY);
            cropElStyle.filter = imageTransformPrefix + '.Matrix(Dx='
                    + (-sx * dw / sw * scaleX) + ',Dy=' + (-sy * dh / sh * scaleY) + ')';

            if (!cropEl.parentNode) {
                vmlEl.appendChild(cropEl);
            }
            if (imageEl.parentNode !== cropEl) {
                cropEl.appendChild(imageEl);
            }
        }
        else {
            imageELStyle.width = round$1(scaleX * dw) + 'px';
            imageELStyle.height = round$1(scaleY * dh) + 'px';

            vmlEl.appendChild(imageEl);

            if (cropEl && cropEl.parentNode) {
                vmlEl.removeChild(cropEl);
                this._cropEl = null;
            }
        }

        var filterStr = '';
        var alpha = style.opacity;
        if (alpha < 1) {
            filterStr += '.Alpha(opacity=' + round$1(alpha * 100) + ') ';
        }
        filterStr += imageTransformPrefix + '.AlphaImageLoader(src=' + image + ', SizingMethod=scale)';

        imageELStyle.filter = filterStr;

        vmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2);

        // Append to root
        append$1(vmlRoot, vmlEl);

        // Text
        if (style.text != null) {
            this.drawRectText(vmlRoot, this.getBoundingRect());
        }
    };

    ZImage.prototype.onRemove = function (vmlRoot) {
        remove$1(vmlRoot, this._vmlEl);

        this._vmlEl = null;
        this._cropEl = null;
        this._imageEl = null;

        this.removeRectText(vmlRoot);
    };

    ZImage.prototype.onAdd = function (vmlRoot) {
        append$1(vmlRoot, this._vmlEl);
        this.appendRectText(vmlRoot);
    };


    /***************************************************
     * TEXT
     **************************************************/

    var DEFAULT_STYLE_NORMAL = 'normal';

    var fontStyleCache = {};
    var fontStyleCacheCount = 0;
    var MAX_FONT_CACHE_SIZE = 100;
    var fontEl = document.createElement('div');

    var getFontStyle = function (fontString) {
        var fontStyle = fontStyleCache[fontString];
        if (!fontStyle) {
            // Clear cache
            if (fontStyleCacheCount > MAX_FONT_CACHE_SIZE) {
                fontStyleCacheCount = 0;
                fontStyleCache = {};
            }

            var style = fontEl.style;
            var fontFamily;
            try {
                style.font = fontString;
                fontFamily = style.fontFamily.split(',')[0];
            }
            catch (e) {
            }

            fontStyle = {
                style: style.fontStyle || DEFAULT_STYLE_NORMAL,
                variant: style.fontVariant || DEFAULT_STYLE_NORMAL,
                weight: style.fontWeight || DEFAULT_STYLE_NORMAL,
                size: parseFloat(style.fontSize || 12) | 0,
                family: fontFamily || 'Microsoft YaHei'
            };

            fontStyleCache[fontString] = fontStyle;
            fontStyleCacheCount++;
        }
        return fontStyle;
    };

    var textMeasureEl;
    // Overwrite measure text method
    $override$1('measureText', function (text, textFont) {
        var doc$$1 = doc;
        if (!textMeasureEl) {
            textMeasureEl = doc$$1.createElement('div');
            textMeasureEl.style.cssText = 'position:absolute;top:-20000px;left:0;'
                + 'padding:0;margin:0;border:none;white-space:pre;';
            doc.body.appendChild(textMeasureEl);
        }

        try {
            textMeasureEl.style.font = textFont;
        }
        catch (ex) {
            // Ignore failures to set to invalid font.
        }
        textMeasureEl.innerHTML = '';
        // Don't use innerHTML or innerText because they allow markup/whitespace.
        textMeasureEl.appendChild(doc$$1.createTextNode(text));
        return {
            width: textMeasureEl.offsetWidth
        };
    });

    var tmpRect$3 = new BoundingRect();

    var drawRectText = function (vmlRoot, rect, textRect, fromTextEl) {

        var style = this.style;

        // Optimize, avoid normalize every time.
        this.__dirty && normalizeTextStyle(style, true);

        var text = style.text;
        // Convert to string
        text != null && (text += '');
        if (!text) {
            return;
        }

        // Convert rich text to plain text. Rich text is not supported in
        // IE8-, but tags in rich text template will be removed.
        if (style.rich) {
            var contentBlock = parseRichText(text, style);
            text = [];
            for (var i = 0; i < contentBlock.lines.length; i++) {
                var tokens = contentBlock.lines[i].tokens;
                var textLine = [];
                for (var j = 0; j < tokens.length; j++) {
                    textLine.push(tokens[j].text);
                }
                text.push(textLine.join(''));
            }
            text = text.join('\n');
        }

        var x;
        var y;
        var align = style.textAlign;
        var verticalAlign = style.textVerticalAlign;

        var fontStyle = getFontStyle(style.font);
        // FIXME encodeHtmlAttribute ?
        var font = fontStyle.style + ' ' + fontStyle.variant + ' ' + fontStyle.weight + ' '
            + fontStyle.size + 'px "' + fontStyle.family + '"';

        textRect = textRect || getBoundingRect(
            text, font, align, verticalAlign, style.textPadding, style.textLineHeight
        );

        // Transform rect to view space
        var m = this.transform;
        // Ignore transform for text in other element
        if (m && !fromTextEl) {
            tmpRect$3.copy(rect);
            tmpRect$3.applyTransform(m);
            rect = tmpRect$3;
        }

        if (!fromTextEl) {
            var textPosition = style.textPosition;
            var distance$$1 = style.textDistance;
            // Text position represented by coord
            if (textPosition instanceof Array) {
                x = rect.x + parsePercent$1(textPosition[0], rect.width);
                y = rect.y + parsePercent$1(textPosition[1], rect.height);

                align = align || 'left';
            }
            else {
                var res = adjustTextPositionOnRect(
                    textPosition, rect, distance$$1
                );
                x = res.x;
                y = res.y;

                // Default align and baseline when has textPosition
                align = align || res.textAlign;
                verticalAlign = verticalAlign || res.textVerticalAlign;
            }
        }
        else {
            x = rect.x;
            y = rect.y;
        }

        x = adjustTextX(x, textRect.width, align);
        y = adjustTextY(y, textRect.height, verticalAlign);

        // Force baseline 'middle'
        y += textRect.height / 2;

        // var fontSize = fontStyle.size;
        // 1.75 is an arbitrary number, as there is no info about the text baseline
        // switch (baseline) {
            // case 'hanging':
            // case 'top':
            //     y += fontSize / 1.75;
            //     break;
        //     case 'middle':
        //         break;
        //     default:
        //     // case null:
        //     // case 'alphabetic':
        //     // case 'ideographic':
        //     // case 'bottom':
        //         y -= fontSize / 2.25;
        //         break;
        // }

        // switch (align) {
        //     case 'left':
        //         break;
        //     case 'center':
        //         x -= textRect.width / 2;
        //         break;
        //     case 'right':
        //         x -= textRect.width;
        //         break;
            // case 'end':
                // align = elementStyle.direction == 'ltr' ? 'right' : 'left';
                // break;
            // case 'start':
                // align = elementStyle.direction == 'rtl' ? 'right' : 'left';
                // break;
            // default:
            //     align = 'left';
        // }

        var createNode$$1 = createNode;

        var textVmlEl = this._textVmlEl;
        var pathEl;
        var textPathEl;
        var skewEl;
        if (!textVmlEl) {
            textVmlEl = createNode$$1('line');
            pathEl = createNode$$1('path');
            textPathEl = createNode$$1('textpath');
            skewEl = createNode$$1('skew');

            // FIXME Why here is not cammel case
            // Align 'center' seems wrong
            textPathEl.style['v-text-align'] = 'left';

            initRootElStyle(textVmlEl);

            pathEl.textpathok = true;
            textPathEl.on = true;

            textVmlEl.from = '0 0';
            textVmlEl.to = '1000 0.05';

            append$1(textVmlEl, skewEl);
            append$1(textVmlEl, pathEl);
            append$1(textVmlEl, textPathEl);

            this._textVmlEl = textVmlEl;
        }
        else {
            // 这里是在前面 appendChild 保证顺序的前提下
            skewEl = textVmlEl.firstChild;
            pathEl = skewEl.nextSibling;
            textPathEl = pathEl.nextSibling;
        }

        var coords = [x, y];
        var textVmlElStyle = textVmlEl.style;
        // Ignore transform for text in other element
        if (m && fromTextEl) {
            applyTransform(coords, coords, m);

            skewEl.on = true;

            skewEl.matrix = m[0].toFixed(3) + comma + m[2].toFixed(3) + comma
                            + m[1].toFixed(3) + comma + m[3].toFixed(3) + ',0,0';

            // Text position
            skewEl.offset = (round$1(coords[0]) || 0) + ',' + (round$1(coords[1]) || 0);
            // Left top point as origin
            skewEl.origin = '0 0';

            textVmlElStyle.left = '0px';
            textVmlElStyle.top = '0px';
        }
        else {
            skewEl.on = false;
            textVmlElStyle.left = round$1(x) + 'px';
            textVmlElStyle.top = round$1(y) + 'px';
        }

        textPathEl.string = encodeHtmlAttribute(text);
        // TODO
        try {
            textPathEl.style.font = font;
        }
        // Error font format
        catch (e) {}

        updateFillAndStroke(textVmlEl, 'fill', {
            fill: style.textFill,
            opacity: style.opacity
        }, this);
        updateFillAndStroke(textVmlEl, 'stroke', {
            stroke: style.textStroke,
            opacity: style.opacity,
            lineDash: style.lineDash
        }, this);

        textVmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2);

        // Attached to root
        append$1(vmlRoot, textVmlEl);
    };

    var removeRectText = function (vmlRoot) {
        remove$1(vmlRoot, this._textVmlEl);
        this._textVmlEl = null;
    };

    var appendRectText = function (vmlRoot) {
        append$1(vmlRoot, this._textVmlEl);
    };

    var list = [RectText, Displayable, ZImage, Path, Text];

    // In case Displayable has been mixed in RectText
    for (var i$1 = 0; i$1 < list.length; i$1++) {
        var proto = list[i$1].prototype;
        proto.drawRectText = drawRectText;
        proto.removeRectText = removeRectText;
        proto.appendRectText = appendRectText;
    }

    Text.prototype.brushVML = function (vmlRoot) {
        var style = this.style;
        if (style.text != null) {
            this.drawRectText(vmlRoot, {
                x: style.x || 0, y: style.y || 0,
                width: 0, height: 0
            }, this.getBoundingRect(), true);
        }
        else {
            this.removeRectText(vmlRoot);
        }
    };

    Text.prototype.onRemove = function (vmlRoot) {
        this.removeRectText(vmlRoot);
    };

    Text.prototype.onAdd = function (vmlRoot) {
        this.appendRectText(vmlRoot);
    };
}

/**
 * VML Painter.
 *
 * @module zrender/vml/Painter
 */

function parseInt10$2(val) {
    return parseInt(val, 10);
}

/**
 * @alias module:zrender/vml/Painter
 */
function VMLPainter(root, storage) {

    initVML();

    this.root = root;

    this.storage = storage;

    var vmlViewport = document.createElement('div');

    var vmlRoot = document.createElement('div');

    vmlViewport.style.cssText = 'display:inline-block;overflow:hidden;position:relative;width:300px;height:150px;';

    vmlRoot.style.cssText = 'position:absolute;left:0;top:0;';

    root.appendChild(vmlViewport);

    this._vmlRoot = vmlRoot;
    this._vmlViewport = vmlViewport;

    this.resize();

    // Modify storage
    var oldDelFromStorage = storage.delFromStorage;
    var oldAddToStorage = storage.addToStorage;
    storage.delFromStorage = function (el) {
        oldDelFromStorage.call(storage, el);

        if (el) {
            el.onRemove && el.onRemove(vmlRoot);
        }
    };

    storage.addToStorage = function (el) {
        // Displayable already has a vml node
        el.onAdd && el.onAdd(vmlRoot);

        oldAddToStorage.call(storage, el);
    };

    this._firstPaint = true;
}

VMLPainter.prototype = {

    constructor: VMLPainter,

    getType: function () {
        return 'vml';
    },

    /**
     * @return {HTMLDivElement}
     */
    getViewportRoot: function () {
        return this._vmlViewport;
    },

    getViewportRootOffset: function () {
        var viewportRoot = this.getViewportRoot();
        if (viewportRoot) {
            return {
                offsetLeft: viewportRoot.offsetLeft || 0,
                offsetTop: viewportRoot.offsetTop || 0
            };
        }
    },

    /**
     * 刷新
     */
    refresh: function () {

        var list = this.storage.getDisplayList(true, true);

        this._paintList(list);
    },

    _paintList: function (list) {
        var vmlRoot = this._vmlRoot;
        for (var i = 0; i < list.length; i++) {
            var el = list[i];
            if (el.invisible || el.ignore) {
                if (!el.__alreadyNotVisible) {
                    el.onRemove(vmlRoot);
                }
                // Set as already invisible
                el.__alreadyNotVisible = true;
            }
            else {
                if (el.__alreadyNotVisible) {
                    el.onAdd(vmlRoot);
                }
                el.__alreadyNotVisible = false;
                if (el.__dirty) {
                    el.beforeBrush && el.beforeBrush();
                    (el.brushVML || el.brush).call(el, vmlRoot);
                    el.afterBrush && el.afterBrush();
                }
            }
            el.__dirty = false;
        }

        if (this._firstPaint) {
            // Detached from document at first time
            // to avoid page refreshing too many times

            // FIXME 如果每次都先 removeChild 可能会导致一些填充和描边的效果改变
            this._vmlViewport.appendChild(vmlRoot);
            this._firstPaint = false;
        }
    },

    resize: function (width, height) {
        var width = width == null ? this._getWidth() : width;
        var height = height == null ? this._getHeight() : height;

        if (this._width !== width || this._height !== height) {
            this._width = width;
            this._height = height;

            var vmlViewportStyle = this._vmlViewport.style;
            vmlViewportStyle.width = width + 'px';
            vmlViewportStyle.height = height + 'px';
        }
    },

    dispose: function () {
        this.root.innerHTML = '';

        this._vmlRoot =
        this._vmlViewport =
        this.storage = null;
    },

    getWidth: function () {
        return this._width;
    },

    getHeight: function () {
        return this._height;
    },

    clear: function () {
        if (this._vmlViewport) {
            this.root.removeChild(this._vmlViewport);
        }
    },

    _getWidth: function () {
        var root = this.root;
        var stl = root.currentStyle;

        return ((root.clientWidth || parseInt10$2(stl.width))
                - parseInt10$2(stl.paddingLeft)
                - parseInt10$2(stl.paddingRight)) | 0;
    },

    _getHeight: function () {
        var root = this.root;
        var stl = root.currentStyle;

        return ((root.clientHeight || parseInt10$2(stl.height))
                - parseInt10$2(stl.paddingTop)
                - parseInt10$2(stl.paddingBottom)) | 0;
    }
};

// Not supported methods
function createMethodNotSupport$1(method) {
    return function () {
        zrLog('In IE8.0 VML mode painter not support method "' + method + '"');
    };
}

// Unsupported methods
each([
    'getLayer', 'insertLayer', 'eachLayer', 'eachBuiltinLayer', 'eachOtherLayer', 'getLayers',
    'modLayer', 'delLayer', 'clearLayer', 'toDataURL', 'pathToImage'
], function (name) {
    VMLPainter.prototype[name] = createMethodNotSupport$1(name);
});

registerPainter('vml', VMLPainter);

exports.version = version;
exports.init = init;
exports.dispose = dispose;
exports.getInstance = getInstance;
exports.registerPainter = registerPainter;
exports.matrix = matrix;
exports.vector = vector;
exports.color = color;
exports.path = path;
exports.util = util;
exports.parseSVG = parseSVG;
exports.Group = Group;
exports.Path = Path;
exports.Image = ZImage;
exports.CompoundPath = CompoundPath;
exports.Text = Text;
exports.IncrementalDisplayable = IncrementalDisplayble;
exports.Arc = Arc;
exports.BezierCurve = BezierCurve;
exports.Circle = Circle;
exports.Droplet = Droplet;
exports.Ellipse = Ellipse;
exports.Heart = Heart;
exports.Isogon = Isogon;
exports.Line = Line;
exports.Polygon = Polygon;
exports.Polyline = Polyline;
exports.Rect = Rect;
exports.Ring = Ring;
exports.Rose = Rose;
exports.Sector = Sector;
exports.Star = Star;
exports.Trochoid = Trochoid;
exports.LinearGradient = LinearGradient;
exports.RadialGradient = RadialGradient;
exports.Pattern = Pattern;
exports.BoundingRect = BoundingRect;

})));
//# sourceMappingURL=zrender.js.map
