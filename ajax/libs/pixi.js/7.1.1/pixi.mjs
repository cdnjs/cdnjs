/*!
 * pixi.js - v7.1.1
 * Compiled Sat, 21 Jan 2023 23:38:22 UTC
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var ENV = /* @__PURE__ */ ((ENV2) => {
  ENV2[ENV2["WEBGL_LEGACY"] = 0] = "WEBGL_LEGACY";
  ENV2[ENV2["WEBGL"] = 1] = "WEBGL";
  ENV2[ENV2["WEBGL2"] = 2] = "WEBGL2";
  return ENV2;
})(ENV || {});
var RENDERER_TYPE = /* @__PURE__ */ ((RENDERER_TYPE2) => {
  RENDERER_TYPE2[RENDERER_TYPE2["UNKNOWN"] = 0] = "UNKNOWN";
  RENDERER_TYPE2[RENDERER_TYPE2["WEBGL"] = 1] = "WEBGL";
  RENDERER_TYPE2[RENDERER_TYPE2["CANVAS"] = 2] = "CANVAS";
  return RENDERER_TYPE2;
})(RENDERER_TYPE || {});
var BUFFER_BITS = /* @__PURE__ */ ((BUFFER_BITS2) => {
  BUFFER_BITS2[BUFFER_BITS2["COLOR"] = 16384] = "COLOR";
  BUFFER_BITS2[BUFFER_BITS2["DEPTH"] = 256] = "DEPTH";
  BUFFER_BITS2[BUFFER_BITS2["STENCIL"] = 1024] = "STENCIL";
  return BUFFER_BITS2;
})(BUFFER_BITS || {});
var BLEND_MODES = /* @__PURE__ */ ((BLEND_MODES2) => {
  BLEND_MODES2[BLEND_MODES2["NORMAL"] = 0] = "NORMAL";
  BLEND_MODES2[BLEND_MODES2["ADD"] = 1] = "ADD";
  BLEND_MODES2[BLEND_MODES2["MULTIPLY"] = 2] = "MULTIPLY";
  BLEND_MODES2[BLEND_MODES2["SCREEN"] = 3] = "SCREEN";
  BLEND_MODES2[BLEND_MODES2["OVERLAY"] = 4] = "OVERLAY";
  BLEND_MODES2[BLEND_MODES2["DARKEN"] = 5] = "DARKEN";
  BLEND_MODES2[BLEND_MODES2["LIGHTEN"] = 6] = "LIGHTEN";
  BLEND_MODES2[BLEND_MODES2["COLOR_DODGE"] = 7] = "COLOR_DODGE";
  BLEND_MODES2[BLEND_MODES2["COLOR_BURN"] = 8] = "COLOR_BURN";
  BLEND_MODES2[BLEND_MODES2["HARD_LIGHT"] = 9] = "HARD_LIGHT";
  BLEND_MODES2[BLEND_MODES2["SOFT_LIGHT"] = 10] = "SOFT_LIGHT";
  BLEND_MODES2[BLEND_MODES2["DIFFERENCE"] = 11] = "DIFFERENCE";
  BLEND_MODES2[BLEND_MODES2["EXCLUSION"] = 12] = "EXCLUSION";
  BLEND_MODES2[BLEND_MODES2["HUE"] = 13] = "HUE";
  BLEND_MODES2[BLEND_MODES2["SATURATION"] = 14] = "SATURATION";
  BLEND_MODES2[BLEND_MODES2["COLOR"] = 15] = "COLOR";
  BLEND_MODES2[BLEND_MODES2["LUMINOSITY"] = 16] = "LUMINOSITY";
  BLEND_MODES2[BLEND_MODES2["NORMAL_NPM"] = 17] = "NORMAL_NPM";
  BLEND_MODES2[BLEND_MODES2["ADD_NPM"] = 18] = "ADD_NPM";
  BLEND_MODES2[BLEND_MODES2["SCREEN_NPM"] = 19] = "SCREEN_NPM";
  BLEND_MODES2[BLEND_MODES2["NONE"] = 20] = "NONE";
  BLEND_MODES2[BLEND_MODES2["SRC_OVER"] = 0] = "SRC_OVER";
  BLEND_MODES2[BLEND_MODES2["SRC_IN"] = 21] = "SRC_IN";
  BLEND_MODES2[BLEND_MODES2["SRC_OUT"] = 22] = "SRC_OUT";
  BLEND_MODES2[BLEND_MODES2["SRC_ATOP"] = 23] = "SRC_ATOP";
  BLEND_MODES2[BLEND_MODES2["DST_OVER"] = 24] = "DST_OVER";
  BLEND_MODES2[BLEND_MODES2["DST_IN"] = 25] = "DST_IN";
  BLEND_MODES2[BLEND_MODES2["DST_OUT"] = 26] = "DST_OUT";
  BLEND_MODES2[BLEND_MODES2["DST_ATOP"] = 27] = "DST_ATOP";
  BLEND_MODES2[BLEND_MODES2["ERASE"] = 26] = "ERASE";
  BLEND_MODES2[BLEND_MODES2["SUBTRACT"] = 28] = "SUBTRACT";
  BLEND_MODES2[BLEND_MODES2["XOR"] = 29] = "XOR";
  return BLEND_MODES2;
})(BLEND_MODES || {});
var DRAW_MODES = /* @__PURE__ */ ((DRAW_MODES2) => {
  DRAW_MODES2[DRAW_MODES2["POINTS"] = 0] = "POINTS";
  DRAW_MODES2[DRAW_MODES2["LINES"] = 1] = "LINES";
  DRAW_MODES2[DRAW_MODES2["LINE_LOOP"] = 2] = "LINE_LOOP";
  DRAW_MODES2[DRAW_MODES2["LINE_STRIP"] = 3] = "LINE_STRIP";
  DRAW_MODES2[DRAW_MODES2["TRIANGLES"] = 4] = "TRIANGLES";
  DRAW_MODES2[DRAW_MODES2["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
  DRAW_MODES2[DRAW_MODES2["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
  return DRAW_MODES2;
})(DRAW_MODES || {});
var FORMATS = /* @__PURE__ */ ((FORMATS2) => {
  FORMATS2[FORMATS2["RGBA"] = 6408] = "RGBA";
  FORMATS2[FORMATS2["RGB"] = 6407] = "RGB";
  FORMATS2[FORMATS2["RG"] = 33319] = "RG";
  FORMATS2[FORMATS2["RED"] = 6403] = "RED";
  FORMATS2[FORMATS2["RGBA_INTEGER"] = 36249] = "RGBA_INTEGER";
  FORMATS2[FORMATS2["RGB_INTEGER"] = 36248] = "RGB_INTEGER";
  FORMATS2[FORMATS2["RG_INTEGER"] = 33320] = "RG_INTEGER";
  FORMATS2[FORMATS2["RED_INTEGER"] = 36244] = "RED_INTEGER";
  FORMATS2[FORMATS2["ALPHA"] = 6406] = "ALPHA";
  FORMATS2[FORMATS2["LUMINANCE"] = 6409] = "LUMINANCE";
  FORMATS2[FORMATS2["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
  FORMATS2[FORMATS2["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
  FORMATS2[FORMATS2["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
  return FORMATS2;
})(FORMATS || {});
var TARGETS = /* @__PURE__ */ ((TARGETS2) => {
  TARGETS2[TARGETS2["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
  TARGETS2[TARGETS2["TEXTURE_2D_ARRAY"] = 35866] = "TEXTURE_2D_ARRAY";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
  TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
  return TARGETS2;
})(TARGETS || {});
var TYPES = /* @__PURE__ */ ((TYPES2) => {
  TYPES2[TYPES2["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
  TYPES2[TYPES2["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
  TYPES2[TYPES2["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
  TYPES2[TYPES2["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
  TYPES2[TYPES2["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
  TYPES2[TYPES2["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
  TYPES2[TYPES2["UNSIGNED_INT_10F_11F_11F_REV"] = 35899] = "UNSIGNED_INT_10F_11F_11F_REV";
  TYPES2[TYPES2["UNSIGNED_INT_2_10_10_10_REV"] = 33640] = "UNSIGNED_INT_2_10_10_10_REV";
  TYPES2[TYPES2["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
  TYPES2[TYPES2["UNSIGNED_INT_5_9_9_9_REV"] = 35902] = "UNSIGNED_INT_5_9_9_9_REV";
  TYPES2[TYPES2["BYTE"] = 5120] = "BYTE";
  TYPES2[TYPES2["SHORT"] = 5122] = "SHORT";
  TYPES2[TYPES2["INT"] = 5124] = "INT";
  TYPES2[TYPES2["FLOAT"] = 5126] = "FLOAT";
  TYPES2[TYPES2["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV";
  TYPES2[TYPES2["HALF_FLOAT"] = 36193] = "HALF_FLOAT";
  return TYPES2;
})(TYPES || {});
var SAMPLER_TYPES = /* @__PURE__ */ ((SAMPLER_TYPES2) => {
  SAMPLER_TYPES2[SAMPLER_TYPES2["FLOAT"] = 0] = "FLOAT";
  SAMPLER_TYPES2[SAMPLER_TYPES2["INT"] = 1] = "INT";
  SAMPLER_TYPES2[SAMPLER_TYPES2["UINT"] = 2] = "UINT";
  return SAMPLER_TYPES2;
})(SAMPLER_TYPES || {});
var SCALE_MODES = /* @__PURE__ */ ((SCALE_MODES2) => {
  SCALE_MODES2[SCALE_MODES2["NEAREST"] = 0] = "NEAREST";
  SCALE_MODES2[SCALE_MODES2["LINEAR"] = 1] = "LINEAR";
  return SCALE_MODES2;
})(SCALE_MODES || {});
var WRAP_MODES = /* @__PURE__ */ ((WRAP_MODES2) => {
  WRAP_MODES2[WRAP_MODES2["CLAMP"] = 33071] = "CLAMP";
  WRAP_MODES2[WRAP_MODES2["REPEAT"] = 10497] = "REPEAT";
  WRAP_MODES2[WRAP_MODES2["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
  return WRAP_MODES2;
})(WRAP_MODES || {});
var MIPMAP_MODES = /* @__PURE__ */ ((MIPMAP_MODES2) => {
  MIPMAP_MODES2[MIPMAP_MODES2["OFF"] = 0] = "OFF";
  MIPMAP_MODES2[MIPMAP_MODES2["POW2"] = 1] = "POW2";
  MIPMAP_MODES2[MIPMAP_MODES2["ON"] = 2] = "ON";
  MIPMAP_MODES2[MIPMAP_MODES2["ON_MANUAL"] = 3] = "ON_MANUAL";
  return MIPMAP_MODES2;
})(MIPMAP_MODES || {});
var ALPHA_MODES = /* @__PURE__ */ ((ALPHA_MODES2) => {
  ALPHA_MODES2[ALPHA_MODES2["NPM"] = 0] = "NPM";
  ALPHA_MODES2[ALPHA_MODES2["UNPACK"] = 1] = "UNPACK";
  ALPHA_MODES2[ALPHA_MODES2["PMA"] = 2] = "PMA";
  ALPHA_MODES2[ALPHA_MODES2["NO_PREMULTIPLIED_ALPHA"] = 0] = "NO_PREMULTIPLIED_ALPHA";
  ALPHA_MODES2[ALPHA_MODES2["PREMULTIPLY_ON_UPLOAD"] = 1] = "PREMULTIPLY_ON_UPLOAD";
  ALPHA_MODES2[ALPHA_MODES2["PREMULTIPLIED_ALPHA"] = 2] = "PREMULTIPLIED_ALPHA";
  return ALPHA_MODES2;
})(ALPHA_MODES || {});
var CLEAR_MODES = /* @__PURE__ */ ((CLEAR_MODES2) => {
  CLEAR_MODES2[CLEAR_MODES2["NO"] = 0] = "NO";
  CLEAR_MODES2[CLEAR_MODES2["YES"] = 1] = "YES";
  CLEAR_MODES2[CLEAR_MODES2["AUTO"] = 2] = "AUTO";
  CLEAR_MODES2[CLEAR_MODES2["BLEND"] = 0] = "BLEND";
  CLEAR_MODES2[CLEAR_MODES2["CLEAR"] = 1] = "CLEAR";
  CLEAR_MODES2[CLEAR_MODES2["BLIT"] = 2] = "BLIT";
  return CLEAR_MODES2;
})(CLEAR_MODES || {});
var GC_MODES = /* @__PURE__ */ ((GC_MODES2) => {
  GC_MODES2[GC_MODES2["AUTO"] = 0] = "AUTO";
  GC_MODES2[GC_MODES2["MANUAL"] = 1] = "MANUAL";
  return GC_MODES2;
})(GC_MODES || {});
var PRECISION = /* @__PURE__ */ ((PRECISION2) => {
  PRECISION2["LOW"] = "lowp";
  PRECISION2["MEDIUM"] = "mediump";
  PRECISION2["HIGH"] = "highp";
  return PRECISION2;
})(PRECISION || {});
var MASK_TYPES = /* @__PURE__ */ ((MASK_TYPES2) => {
  MASK_TYPES2[MASK_TYPES2["NONE"] = 0] = "NONE";
  MASK_TYPES2[MASK_TYPES2["SCISSOR"] = 1] = "SCISSOR";
  MASK_TYPES2[MASK_TYPES2["STENCIL"] = 2] = "STENCIL";
  MASK_TYPES2[MASK_TYPES2["SPRITE"] = 3] = "SPRITE";
  MASK_TYPES2[MASK_TYPES2["COLOR"] = 4] = "COLOR";
  return MASK_TYPES2;
})(MASK_TYPES || {});
var COLOR_MASK_BITS = /* @__PURE__ */ ((COLOR_MASK_BITS2) => {
  COLOR_MASK_BITS2[COLOR_MASK_BITS2["RED"] = 1] = "RED";
  COLOR_MASK_BITS2[COLOR_MASK_BITS2["GREEN"] = 2] = "GREEN";
  COLOR_MASK_BITS2[COLOR_MASK_BITS2["BLUE"] = 4] = "BLUE";
  COLOR_MASK_BITS2[COLOR_MASK_BITS2["ALPHA"] = 8] = "ALPHA";
  return COLOR_MASK_BITS2;
})(COLOR_MASK_BITS || {});
var MSAA_QUALITY = /* @__PURE__ */ ((MSAA_QUALITY2) => {
  MSAA_QUALITY2[MSAA_QUALITY2["NONE"] = 0] = "NONE";
  MSAA_QUALITY2[MSAA_QUALITY2["LOW"] = 2] = "LOW";
  MSAA_QUALITY2[MSAA_QUALITY2["MEDIUM"] = 4] = "MEDIUM";
  MSAA_QUALITY2[MSAA_QUALITY2["HIGH"] = 8] = "HIGH";
  return MSAA_QUALITY2;
})(MSAA_QUALITY || {});
var BUFFER_TYPE = /* @__PURE__ */ ((BUFFER_TYPE2) => {
  BUFFER_TYPE2[BUFFER_TYPE2["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
  BUFFER_TYPE2[BUFFER_TYPE2["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
  BUFFER_TYPE2[BUFFER_TYPE2["UNIFORM_BUFFER"] = 35345] = "UNIFORM_BUFFER";
  return BUFFER_TYPE2;
})(BUFFER_TYPE || {});

const BrowserAdapter = {
  createCanvas: (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  },
  getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (url, options) => fetch(url, options),
  parseXML: (xml) => {
    const parser = new DOMParser();
    return parser.parseFromString(xml, "text/xml");
  }
};

const settings = {
  ADAPTER: BrowserAdapter,
  RESOLUTION: 1,
  RENDER_OPTIONS: {
    view: null,
    antialias: false,
    autoDensity: false,
    backgroundColor: 0,
    backgroundAlpha: 1,
    premultipliedAlpha: true,
    clearBeforeRender: true,
    preserveDrawingBuffer: false,
    width: 800,
    height: 600,
    legacy: false,
    hello: false
  },
  CREATE_IMAGE_BITMAP: false,
  ROUND_PIXELS: false
};

var appleIphone = /iPhone/i;
var appleIpod = /iPod/i;
var appleTablet = /iPad/i;
var appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
var androidPhone = /\bAndroid(?:.+)Mobile\b/i;
var androidTablet = /Android/i;
var amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
var amazonTablet = /Silk/i;
var windowsPhone = /Windows Phone/i;
var windowsTablet = /\bWindows(?:.+)ARM\b/i;
var otherBlackBerry = /BlackBerry/i;
var otherBlackBerry10 = /BB10/i;
var otherOpera = /Opera Mini/i;
var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
var otherFirefox = /Mobile(?:.+)Firefox\b/i;
var isAppleTabletOnIos13 = function (navigator) {
    return (typeof navigator !== 'undefined' &&
        navigator.platform === 'MacIntel' &&
        typeof navigator.maxTouchPoints === 'number' &&
        navigator.maxTouchPoints > 1 &&
        typeof MSStream === 'undefined');
};
function createMatch(userAgent) {
    return function (regex) { return regex.test(userAgent); };
}
function isMobile$1(param) {
    var nav = {
        userAgent: '',
        platform: '',
        maxTouchPoints: 0
    };
    if (!param && typeof navigator !== 'undefined') {
        nav = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            maxTouchPoints: navigator.maxTouchPoints || 0
        };
    }
    else if (typeof param === 'string') {
        nav.userAgent = param;
    }
    else if (param && param.userAgent) {
        nav = {
            userAgent: param.userAgent,
            platform: param.platform,
            maxTouchPoints: param.maxTouchPoints || 0
        };
    }
    var userAgent = nav.userAgent;
    var tmp = userAgent.split('[FBAN');
    if (typeof tmp[1] !== 'undefined') {
        userAgent = tmp[0];
    }
    tmp = userAgent.split('Twitter');
    if (typeof tmp[1] !== 'undefined') {
        userAgent = tmp[0];
    }
    var match = createMatch(userAgent);
    var result = {
        apple: {
            phone: match(appleIphone) && !match(windowsPhone),
            ipod: match(appleIpod),
            tablet: !match(appleIphone) &&
                (match(appleTablet) || isAppleTabletOnIos13(nav)) &&
                !match(windowsPhone),
            universal: match(appleUniversal),
            device: (match(appleIphone) ||
                match(appleIpod) ||
                match(appleTablet) ||
                match(appleUniversal) ||
                isAppleTabletOnIos13(nav)) &&
                !match(windowsPhone)
        },
        amazon: {
            phone: match(amazonPhone),
            tablet: !match(amazonPhone) && match(amazonTablet),
            device: match(amazonPhone) || match(amazonTablet)
        },
        android: {
            phone: (!match(windowsPhone) && match(amazonPhone)) ||
                (!match(windowsPhone) && match(androidPhone)),
            tablet: !match(windowsPhone) &&
                !match(amazonPhone) &&
                !match(androidPhone) &&
                (match(amazonTablet) || match(androidTablet)),
            device: (!match(windowsPhone) &&
                (match(amazonPhone) ||
                    match(amazonTablet) ||
                    match(androidPhone) ||
                    match(androidTablet))) ||
                match(/\bokhttp\b/i)
        },
        windows: {
            phone: match(windowsPhone),
            tablet: match(windowsTablet),
            device: match(windowsPhone) || match(windowsTablet)
        },
        other: {
            blackberry: match(otherBlackBerry),
            blackberry10: match(otherBlackBerry10),
            opera: match(otherOpera),
            firefox: match(otherFirefox),
            chrome: match(otherChrome),
            device: match(otherBlackBerry) ||
                match(otherBlackBerry10) ||
                match(otherOpera) ||
                match(otherFirefox) ||
                match(otherChrome)
        },
        any: false,
        phone: false,
        tablet: false
    };
    result.any =
        result.apple.device ||
            result.android.device ||
            result.windows.device ||
            result.other.device;
    result.phone =
        result.apple.phone || result.android.phone || result.windows.phone;
    result.tablet =
        result.apple.tablet || result.android.tablet || result.windows.tablet;
    return result;
}

const isMobile = isMobile$1(globalThis.navigator);

settings.RETINA_PREFIX = /@([0-9\.]+)x/;
settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var eventemitter3 = createCommonjsModule(function (module) {
'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== 'object') {
  module.exports = EventEmitter;
}
});

'use strict';

var earcut_1 = earcut;
var _default = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode || outerNode.next === outerNode.prev) return triangles;

    var minX, minY, maxX, maxY, x, y, invSize;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and invSize are later used to transform coords into integers for z-order calculation
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 32767 / invSize : 0;
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) break;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim | 0);
            triangles.push(ear.i / dim | 0);
            triangles.push(next.i / dim | 0);

            removeNode(ear);

            // skipping the next vertex leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;

    // triangle bbox; min & max are calculated like this for speed
    var x0 = ax < bx ? (ax < cx ? ax : cx) : (bx < cx ? bx : cx),
        y0 = ay < by ? (ay < cy ? ay : cy) : (by < cy ? by : cy),
        x1 = ax > bx ? (ax > cx ? ax : cx) : (bx > cx ? bx : cx),
        y1 = ay > by ? (ay > cy ? ay : cy) : (by > cy ? by : cy);

    var p = c.next;
    while (p !== a) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 &&
            pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;

    // triangle bbox; min & max are calculated like this for speed
    var x0 = ax < bx ? (ax < cx ? ax : cx) : (bx < cx ? bx : cx),
        y0 = ay < by ? (ay < cy ? ay : cy) : (by < cy ? by : cy),
        x1 = ax > bx ? (ax > cx ? ax : cx) : (bx > cx ? bx : cx),
        y1 = ay > by ? (ay > cy ? ay : cy) : (by > cy ? by : cy);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(x0, y0, minX, minY, invSize),
        maxZ = zOrder(x1, y1, minX, minY, invSize);

    var p = ear.prevZ,
        n = ear.nextZ;

    // look for points inside the triangle in both directions
    while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c &&
            pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;

        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c &&
            pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    // look for remaining points in decreasing z-order
    while (p && p.z >= minZ) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c &&
            pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    // look for remaining points in increasing z-order
    while (n && n.z <= maxZ) {
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c &&
            pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim | 0);
            triangles.push(p.i / dim | 0);
            triangles.push(b.i / dim | 0);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return filterPoints(p);
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
                earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        outerNode = eliminateHole(queue[i], outerNode);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    var bridge = findHoleBridge(hole, outerNode);
    if (!bridge) {
        return outerNode;
    }

    var bridgeReverse = splitPolygon(bridge, hole);

    // filter collinear points around the cuts
    filterPoints(bridgeReverse, bridgeReverse.next);
    return filterPoints(bridge, bridge.next);
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                m = p.x < p.next.x ? p : p.next;
                if (x === hx) return m; // hole touches outer segment; pick leftmost endpoint
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m;

    do {
        if (hx >= p.x && p.x >= mx && hx !== p.x &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if (locallyInside(p, hole) &&
                (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    } while (p !== stop);

    return m;
}

// whether sector in vertex m contains sector in vertex p in the same coordinates
function sectorContainsSector(m, p) {
    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, invSize) {
    var p = start;
    do {
        if (p.z === 0) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and inverse of the longer side of data bbox
function zOrder(x, y, minX, minY, invSize) {
    // coords are transformed into non-negative 15-bit integer range
    x = (x - minX) * invSize | 0;
    y = (y - minY) * invSize | 0;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) >= (ax - px) * (cy - py) &&
           (ax - px) * (by - py) >= (bx - px) * (ay - py) &&
           (bx - px) * (cy - py) >= (cx - px) * (by - py);
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
           (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
            (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
            equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    var o1 = sign$1(area(p1, q1, p2));
    var o2 = sign$1(area(p1, q1, q2));
    var o3 = sign$1(area(p2, q2, p1));
    var o4 = sign$1(area(p2, q2, q1));

    if (o1 !== o2 && o3 !== o4) return true; // general case

    if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
    if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
    if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
    if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

    return false;
}

// for collinear points p, q, r, check if point q lies on segment pr
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

function sign$1(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertex index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertex nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = 0;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};
earcut_1.default = _default;

var punycode = createCommonjsModule(function (module, exports) {
/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = 'object' == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = 'object' == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof undefined == 'function' &&
		typeof undefined.amd == 'object' &&
		undefined.amd
	) {
		undefined('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(commonjsGlobal));
});

'use strict';

var util = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var decode = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

var encode = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var querystring = createCommonjsModule(function (module, exports) {
'use strict';

exports.decode = exports.parse = decode;
exports.encode = exports.stringify = encode;
});

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';




var parse = urlParse;
var resolve = urlResolve;
var resolveObject = urlResolveObject;
var format = urlFormat;

var Url_1 = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

var url$1 = {
	parse: parse,
	resolve: resolve,
	resolveObject: resolveObject,
	format: format,
	Url: Url_1
};

const url = {
  parse: parse,
  format: format,
  resolve: resolve
};

function assertPath(path2) {
  if (typeof path2 !== "string") {
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(path2)}`);
  }
}
function removeUrlParams(url) {
  const re = url.split("?")[0];
  return re.split("#")[0];
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}
function normalizeStringPosix(path2, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code = -1;
  for (let i = 0; i <= path2.length; ++i) {
    if (i < path2.length) {
      code = path2.charCodeAt(i);
    } else if (code === 47) {
      break;
    } else {
      code = 47;
    }
    if (code === 47) {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) {
            res += "/..";
          } else {
            res = "..";
          }
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path2.slice(lastSlash + 1, i)}`;
        } else {
          res = path2.slice(lastSlash + 1, i);
        }
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const path = {
  toPosix(path2) {
    return replaceAll(path2, "\\", "/");
  },
  isUrl(path2) {
    return /^https?:/.test(this.toPosix(path2));
  },
  isDataUrl(path2) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(path2);
  },
  hasProtocol(path2) {
    return /^[^/:]+:\//.test(this.toPosix(path2));
  },
  getProtocol(path2) {
    assertPath(path2);
    path2 = this.toPosix(path2);
    let protocol = "";
    const isFile = /^file:\/\/\//.exec(path2);
    const isHttp = /^[^/:]+:\/\//.exec(path2);
    const isWindows = /^[^/:]+:\//.exec(path2);
    if (isFile || isHttp || isWindows) {
      const arr = isFile?.[0] || isHttp?.[0] || isWindows?.[0];
      protocol = arr;
      path2 = path2.slice(arr.length);
    }
    return protocol;
  },
  toAbsolute(url, customBaseUrl, customRootUrl) {
    if (this.isDataUrl(url))
      return url;
    const baseUrl = removeUrlParams(this.toPosix(customBaseUrl ?? settings.ADAPTER.getBaseUrl()));
    const rootUrl = removeUrlParams(this.toPosix(customRootUrl ?? this.rootname(baseUrl)));
    assertPath(url);
    url = this.toPosix(url);
    if (url.startsWith("/")) {
      return path.join(rootUrl, url.slice(1));
    }
    const absolutePath = this.isAbsolute(url) ? url : this.join(baseUrl, url);
    return absolutePath;
  },
  normalize(path2) {
    path2 = this.toPosix(path2);
    assertPath(path2);
    if (path2.length === 0)
      return ".";
    let protocol = "";
    const isAbsolute = path2.startsWith("/");
    if (this.hasProtocol(path2)) {
      protocol = this.rootname(path2);
      path2 = path2.slice(protocol.length);
    }
    const trailingSeparator = path2.endsWith("/");
    path2 = normalizeStringPosix(path2, false);
    if (path2.length > 0 && trailingSeparator)
      path2 += "/";
    if (isAbsolute)
      return `/${path2}`;
    return protocol + path2;
  },
  isAbsolute(path2) {
    assertPath(path2);
    path2 = this.toPosix(path2);
    if (this.hasProtocol(path2))
      return true;
    return path2.startsWith("/");
  },
  join(...segments) {
    if (segments.length === 0) {
      return ".";
    }
    let joined;
    for (let i = 0; i < segments.length; ++i) {
      const arg = segments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === void 0)
          joined = arg;
        else {
          const prevArg = segments[i - 1] ?? "";
          if (this.extname(prevArg)) {
            joined += `/../${arg}`;
          } else {
            joined += `/${arg}`;
          }
        }
      }
    }
    if (joined === void 0) {
      return ".";
    }
    return this.normalize(joined);
  },
  dirname(path2) {
    assertPath(path2);
    if (path2.length === 0)
      return ".";
    path2 = this.toPosix(path2);
    let code = path2.charCodeAt(0);
    const hasRoot = code === 47;
    let end = -1;
    let matchedSlash = true;
    const proto = this.getProtocol(path2);
    const origpath = path2;
    path2 = path2.slice(proto.length);
    for (let i = path2.length - 1; i >= 1; --i) {
      code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (end === -1)
      return hasRoot ? "/" : this.isUrl(origpath) ? proto + path2 : proto;
    if (hasRoot && end === 1)
      return "//";
    return proto + path2.slice(0, end);
  },
  rootname(path2) {
    assertPath(path2);
    path2 = this.toPosix(path2);
    let root = "";
    if (path2.startsWith("/"))
      root = "/";
    else {
      root = this.getProtocol(path2);
    }
    if (this.isUrl(path2)) {
      const index = path2.indexOf("/", root.length);
      if (index !== -1) {
        root = path2.slice(0, index);
      } else
        root = path2;
      if (!root.endsWith("/"))
        root += "/";
    }
    return root;
  },
  basename(path2, ext) {
    assertPath(path2);
    if (ext)
      assertPath(ext);
    path2 = removeUrlParams(this.toPosix(path2));
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
      if (ext.length === path2.length && ext === path2)
        return "";
      let extIdx = ext.length - 1;
      let firstNonSlashEnd = -1;
      for (i = path2.length - 1; i >= 0; --i) {
        const code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end)
        end = firstNonSlashEnd;
      else if (end === -1)
        end = path2.length;
      return path2.slice(start, end);
    }
    for (i = path2.length - 1; i >= 0; --i) {
      if (path2.charCodeAt(i) === 47) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (end === -1)
      return "";
    return path2.slice(start, end);
  },
  extname(path2) {
    assertPath(path2);
    path2 = removeUrlParams(this.toPosix(path2));
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for (let i = path2.length - 1; i >= 0; --i) {
      const code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path2.slice(startDot, end);
  },
  parse(path2) {
    assertPath(path2);
    const ret = { root: "", dir: "", base: "", ext: "", name: "" };
    if (path2.length === 0)
      return ret;
    path2 = removeUrlParams(this.toPosix(path2));
    let code = path2.charCodeAt(0);
    const isAbsolute = this.isAbsolute(path2);
    let start;
    const protocol = "";
    ret.root = this.rootname(path2);
    if (isAbsolute || this.hasProtocol(path2)) {
      start = 1;
    } else {
      start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path2.length - 1;
    let preDotState = 0;
    for (; i >= start; --i) {
      code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute)
          ret.base = ret.name = path2.slice(1, end);
        else
          ret.base = ret.name = path2.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path2.slice(1, startDot);
        ret.base = path2.slice(1, end);
      } else {
        ret.name = path2.slice(startPart, startDot);
        ret.base = path2.slice(startPart, end);
      }
      ret.ext = path2.slice(startDot, end);
    }
    ret.dir = this.dirname(path2);
    if (protocol)
      ret.dir = protocol + ret.dir;
    return ret;
  },
  sep: "/",
  delimiter: ":"
};

const warnings = {};
function deprecation(version, message, ignoreDepth = 3) {
  if (warnings[message]) {
    return;
  }
  let stack = new Error().stack;
  if (typeof stack === "undefined") {
    console.warn("PixiJS Deprecation Warning: ", `${message}
Deprecated since v${version}`);
  } else {
    stack = stack.split("\n").splice(ignoreDepth).join("\n");
    if (console.groupCollapsed) {
      console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", `${message}
Deprecated since v${version}`);
      console.warn(stack);
      console.groupEnd();
    } else {
      console.warn("PixiJS Deprecation Warning: ", `${message}
Deprecated since v${version}`);
      console.warn(stack);
    }
  }
  warnings[message] = true;
}

function skipHello() {
  deprecation("7.0.0", "skipHello is deprecated, please use settings.RENDER_OPTIONS.hello");
}
function sayHello() {
  deprecation("7.0.0", `sayHello is deprecated, please use Renderer's "hello" option`);
}

let supported;
function isWebGLSupported() {
  if (typeof supported === "undefined") {
    supported = function supported2() {
      const contextOptions = {
        stencil: true,
        failIfMajorPerformanceCaveat: settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
      };
      try {
        if (!settings.ADAPTER.getWebGLRenderingContext()) {
          return false;
        }
        const canvas = settings.ADAPTER.createCanvas();
        let gl = canvas.getContext("webgl", contextOptions) || canvas.getContext("experimental-webgl", contextOptions);
        const success = !!gl?.getContextAttributes()?.stencil;
        if (gl) {
          const loseContext = gl.getExtension("WEBGL_lose_context");
          if (loseContext) {
            loseContext.loseContext();
          }
        }
        gl = null;
        return success;
      } catch (e) {
        return false;
      }
    }();
  }
  return supported;
}

var aliceblue = "#f0f8ff";
var antiquewhite = "#faebd7";
var aqua = "#00ffff";
var aquamarine = "#7fffd4";
var azure = "#f0ffff";
var beige = "#f5f5dc";
var bisque = "#ffe4c4";
var black = "#000000";
var blanchedalmond = "#ffebcd";
var blue = "#0000ff";
var blueviolet = "#8a2be2";
var brown = "#a52a2a";
var burlywood = "#deb887";
var cadetblue = "#5f9ea0";
var chartreuse = "#7fff00";
var chocolate = "#d2691e";
var coral = "#ff7f50";
var cornflowerblue = "#6495ed";
var cornsilk = "#fff8dc";
var crimson = "#dc143c";
var cyan = "#00ffff";
var darkblue = "#00008b";
var darkcyan = "#008b8b";
var darkgoldenrod = "#b8860b";
var darkgray = "#a9a9a9";
var darkgreen = "#006400";
var darkgrey = "#a9a9a9";
var darkkhaki = "#bdb76b";
var darkmagenta = "#8b008b";
var darkolivegreen = "#556b2f";
var darkorange = "#ff8c00";
var darkorchid = "#9932cc";
var darkred = "#8b0000";
var darksalmon = "#e9967a";
var darkseagreen = "#8fbc8f";
var darkslateblue = "#483d8b";
var darkslategray = "#2f4f4f";
var darkslategrey = "#2f4f4f";
var darkturquoise = "#00ced1";
var darkviolet = "#9400d3";
var deeppink = "#ff1493";
var deepskyblue = "#00bfff";
var dimgray = "#696969";
var dimgrey = "#696969";
var dodgerblue = "#1e90ff";
var firebrick = "#b22222";
var floralwhite = "#fffaf0";
var forestgreen = "#228b22";
var fuchsia = "#ff00ff";
var gainsboro = "#dcdcdc";
var ghostwhite = "#f8f8ff";
var goldenrod = "#daa520";
var gold = "#ffd700";
var gray = "#808080";
var green = "#008000";
var greenyellow = "#adff2f";
var grey = "#808080";
var honeydew = "#f0fff0";
var hotpink = "#ff69b4";
var indianred = "#cd5c5c";
var indigo = "#4b0082";
var ivory = "#fffff0";
var khaki = "#f0e68c";
var lavenderblush = "#fff0f5";
var lavender = "#e6e6fa";
var lawngreen = "#7cfc00";
var lemonchiffon = "#fffacd";
var lightblue = "#add8e6";
var lightcoral = "#f08080";
var lightcyan = "#e0ffff";
var lightgoldenrodyellow = "#fafad2";
var lightgray = "#d3d3d3";
var lightgreen = "#90ee90";
var lightgrey = "#d3d3d3";
var lightpink = "#ffb6c1";
var lightsalmon = "#ffa07a";
var lightseagreen = "#20b2aa";
var lightskyblue = "#87cefa";
var lightslategray = "#778899";
var lightslategrey = "#778899";
var lightsteelblue = "#b0c4de";
var lightyellow = "#ffffe0";
var lime = "#00ff00";
var limegreen = "#32cd32";
var linen = "#faf0e6";
var magenta = "#ff00ff";
var maroon = "#800000";
var mediumaquamarine = "#66cdaa";
var mediumblue = "#0000cd";
var mediumorchid = "#ba55d3";
var mediumpurple = "#9370db";
var mediumseagreen = "#3cb371";
var mediumslateblue = "#7b68ee";
var mediumspringgreen = "#00fa9a";
var mediumturquoise = "#48d1cc";
var mediumvioletred = "#c71585";
var midnightblue = "#191970";
var mintcream = "#f5fffa";
var mistyrose = "#ffe4e1";
var moccasin = "#ffe4b5";
var navajowhite = "#ffdead";
var navy = "#000080";
var oldlace = "#fdf5e6";
var olive = "#808000";
var olivedrab = "#6b8e23";
var orange = "#ffa500";
var orangered = "#ff4500";
var orchid = "#da70d6";
var palegoldenrod = "#eee8aa";
var palegreen = "#98fb98";
var paleturquoise = "#afeeee";
var palevioletred = "#db7093";
var papayawhip = "#ffefd5";
var peachpuff = "#ffdab9";
var peru = "#cd853f";
var pink = "#ffc0cb";
var plum = "#dda0dd";
var powderblue = "#b0e0e6";
var purple = "#800080";
var rebeccapurple = "#663399";
var red = "#ff0000";
var rosybrown = "#bc8f8f";
var royalblue = "#4169e1";
var saddlebrown = "#8b4513";
var salmon = "#fa8072";
var sandybrown = "#f4a460";
var seagreen = "#2e8b57";
var seashell = "#fff5ee";
var sienna = "#a0522d";
var silver = "#c0c0c0";
var skyblue = "#87ceeb";
var slateblue = "#6a5acd";
var slategray = "#708090";
var slategrey = "#708090";
var snow = "#fffafa";
var springgreen = "#00ff7f";
var steelblue = "#4682b4";
var tan = "#d2b48c";
var teal = "#008080";
var thistle = "#d8bfd8";
var tomato = "#ff6347";
var turquoise = "#40e0d0";
var violet = "#ee82ee";
var wheat = "#f5deb3";
var white = "#ffffff";
var whitesmoke = "#f5f5f5";
var yellow = "#ffff00";
var yellowgreen = "#9acd32";
var cssColorNames = {
	aliceblue: aliceblue,
	antiquewhite: antiquewhite,
	aqua: aqua,
	aquamarine: aquamarine,
	azure: azure,
	beige: beige,
	bisque: bisque,
	black: black,
	blanchedalmond: blanchedalmond,
	blue: blue,
	blueviolet: blueviolet,
	brown: brown,
	burlywood: burlywood,
	cadetblue: cadetblue,
	chartreuse: chartreuse,
	chocolate: chocolate,
	coral: coral,
	cornflowerblue: cornflowerblue,
	cornsilk: cornsilk,
	crimson: crimson,
	cyan: cyan,
	darkblue: darkblue,
	darkcyan: darkcyan,
	darkgoldenrod: darkgoldenrod,
	darkgray: darkgray,
	darkgreen: darkgreen,
	darkgrey: darkgrey,
	darkkhaki: darkkhaki,
	darkmagenta: darkmagenta,
	darkolivegreen: darkolivegreen,
	darkorange: darkorange,
	darkorchid: darkorchid,
	darkred: darkred,
	darksalmon: darksalmon,
	darkseagreen: darkseagreen,
	darkslateblue: darkslateblue,
	darkslategray: darkslategray,
	darkslategrey: darkslategrey,
	darkturquoise: darkturquoise,
	darkviolet: darkviolet,
	deeppink: deeppink,
	deepskyblue: deepskyblue,
	dimgray: dimgray,
	dimgrey: dimgrey,
	dodgerblue: dodgerblue,
	firebrick: firebrick,
	floralwhite: floralwhite,
	forestgreen: forestgreen,
	fuchsia: fuchsia,
	gainsboro: gainsboro,
	ghostwhite: ghostwhite,
	goldenrod: goldenrod,
	gold: gold,
	gray: gray,
	green: green,
	greenyellow: greenyellow,
	grey: grey,
	honeydew: honeydew,
	hotpink: hotpink,
	indianred: indianred,
	indigo: indigo,
	ivory: ivory,
	khaki: khaki,
	lavenderblush: lavenderblush,
	lavender: lavender,
	lawngreen: lawngreen,
	lemonchiffon: lemonchiffon,
	lightblue: lightblue,
	lightcoral: lightcoral,
	lightcyan: lightcyan,
	lightgoldenrodyellow: lightgoldenrodyellow,
	lightgray: lightgray,
	lightgreen: lightgreen,
	lightgrey: lightgrey,
	lightpink: lightpink,
	lightsalmon: lightsalmon,
	lightseagreen: lightseagreen,
	lightskyblue: lightskyblue,
	lightslategray: lightslategray,
	lightslategrey: lightslategrey,
	lightsteelblue: lightsteelblue,
	lightyellow: lightyellow,
	lime: lime,
	limegreen: limegreen,
	linen: linen,
	magenta: magenta,
	maroon: maroon,
	mediumaquamarine: mediumaquamarine,
	mediumblue: mediumblue,
	mediumorchid: mediumorchid,
	mediumpurple: mediumpurple,
	mediumseagreen: mediumseagreen,
	mediumslateblue: mediumslateblue,
	mediumspringgreen: mediumspringgreen,
	mediumturquoise: mediumturquoise,
	mediumvioletred: mediumvioletred,
	midnightblue: midnightblue,
	mintcream: mintcream,
	mistyrose: mistyrose,
	moccasin: moccasin,
	navajowhite: navajowhite,
	navy: navy,
	oldlace: oldlace,
	olive: olive,
	olivedrab: olivedrab,
	orange: orange,
	orangered: orangered,
	orchid: orchid,
	palegoldenrod: palegoldenrod,
	palegreen: palegreen,
	paleturquoise: paleturquoise,
	palevioletred: palevioletred,
	papayawhip: papayawhip,
	peachpuff: peachpuff,
	peru: peru,
	pink: pink,
	plum: plum,
	powderblue: powderblue,
	purple: purple,
	rebeccapurple: rebeccapurple,
	red: red,
	rosybrown: rosybrown,
	royalblue: royalblue,
	saddlebrown: saddlebrown,
	salmon: salmon,
	sandybrown: sandybrown,
	seagreen: seagreen,
	seashell: seashell,
	sienna: sienna,
	silver: silver,
	skyblue: skyblue,
	slateblue: slateblue,
	slategray: slategray,
	slategrey: slategrey,
	snow: snow,
	springgreen: springgreen,
	steelblue: steelblue,
	tan: tan,
	teal: teal,
	thistle: thistle,
	tomato: tomato,
	turquoise: turquoise,
	violet: violet,
	wheat: wheat,
	white: white,
	whitesmoke: whitesmoke,
	yellow: yellow,
	yellowgreen: yellowgreen
};

function hex2rgb(hex, out = []) {
  out[0] = (hex >> 16 & 255) / 255;
  out[1] = (hex >> 8 & 255) / 255;
  out[2] = (hex & 255) / 255;
  return out;
}
function hex2string(hex) {
  let hexString = hex.toString(16);
  hexString = "000000".substring(0, 6 - hexString.length) + hexString;
  return `#${hexString}`;
}
function string2hex(string) {
  if (typeof string === "string") {
    string = cssColorNames[string.toLowerCase()] || string;
    if (string[0] === "#") {
      string = string.slice(1);
    }
    if (string.length === 3) {
      const [r, g, b] = string;
      string = r + r + g + g + b + b;
    }
  }
  return parseInt(string, 16);
}
function rgb2hex(rgb) {
  return (rgb[0] * 255 << 16) + (rgb[1] * 255 << 8) + (rgb[2] * 255 | 0);
}

function mapPremultipliedBlendModes() {
  const pm = [];
  const npm = [];
  for (let i = 0; i < 32; i++) {
    pm[i] = i;
    npm[i] = i;
  }
  pm[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL;
  pm[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD;
  pm[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN;
  npm[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM;
  npm[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM;
  npm[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;
  const array = [];
  array.push(npm);
  array.push(pm);
  return array;
}
const premultiplyBlendMode = mapPremultipliedBlendModes();
function correctBlendMode(blendMode, premultiplied) {
  return premultiplyBlendMode[premultiplied ? 1 : 0][blendMode];
}
function premultiplyRgba(rgb, alpha, out, premultiply) {
  out = out || new Float32Array(4);
  if (premultiply || premultiply === void 0) {
    out[0] = rgb[0] * alpha;
    out[1] = rgb[1] * alpha;
    out[2] = rgb[2] * alpha;
  } else {
    out[0] = rgb[0];
    out[1] = rgb[1];
    out[2] = rgb[2];
  }
  out[3] = alpha;
  return out;
}
function premultiplyTint(tint, alpha) {
  if (alpha === 1) {
    return (alpha * 255 << 24) + tint;
  }
  if (alpha === 0) {
    return 0;
  }
  let R = tint >> 16 & 255;
  let G = tint >> 8 & 255;
  let B = tint & 255;
  R = R * alpha + 0.5 | 0;
  G = G * alpha + 0.5 | 0;
  B = B * alpha + 0.5 | 0;
  return (alpha * 255 << 24) + (R << 16) + (G << 8) + B;
}
function premultiplyTintToRgba(tint, alpha, out, premultiply) {
  out = out || new Float32Array(4);
  out[0] = (tint >> 16 & 255) / 255;
  out[1] = (tint >> 8 & 255) / 255;
  out[2] = (tint & 255) / 255;
  if (premultiply || premultiply === void 0) {
    out[0] *= alpha;
    out[1] *= alpha;
    out[2] *= alpha;
  }
  out[3] = alpha;
  return out;
}

const DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;

function createIndicesForQuads(size, outBuffer = null) {
  const totalIndices = size * 6;
  outBuffer = outBuffer || new Uint16Array(totalIndices);
  if (outBuffer.length !== totalIndices) {
    throw new Error(`Out buffer length is incorrect, got ${outBuffer.length} and expected ${totalIndices}`);
  }
  for (let i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
    outBuffer[i + 0] = j + 0;
    outBuffer[i + 1] = j + 1;
    outBuffer[i + 2] = j + 2;
    outBuffer[i + 3] = j + 0;
    outBuffer[i + 4] = j + 2;
    outBuffer[i + 5] = j + 3;
  }
  return outBuffer;
}

function getBufferType(array) {
  if (array.BYTES_PER_ELEMENT === 4) {
    if (array instanceof Float32Array) {
      return "Float32Array";
    } else if (array instanceof Uint32Array) {
      return "Uint32Array";
    }
    return "Int32Array";
  } else if (array.BYTES_PER_ELEMENT === 2) {
    if (array instanceof Uint16Array) {
      return "Uint16Array";
    }
  } else if (array.BYTES_PER_ELEMENT === 1) {
    if (array instanceof Uint8Array) {
      return "Uint8Array";
    }
  }
  return null;
}

const map$2 = { Float32Array, Uint32Array, Int32Array, Uint8Array };
function interleaveTypedArrays$1(arrays, sizes) {
  let outSize = 0;
  let stride = 0;
  const views = {};
  for (let i = 0; i < arrays.length; i++) {
    stride += sizes[i];
    outSize += arrays[i].length;
  }
  const buffer = new ArrayBuffer(outSize * 4);
  let out = null;
  let littleOffset = 0;
  for (let i = 0; i < arrays.length; i++) {
    const size = sizes[i];
    const array = arrays[i];
    const type = getBufferType(array);
    if (!views[type]) {
      views[type] = new map$2[type](buffer);
    }
    out = views[type];
    for (let j = 0; j < array.length; j++) {
      const indexStart = (j / size | 0) * stride + littleOffset;
      const index = j % size;
      out[indexStart + index] = array[j];
    }
    littleOffset += size;
  }
  return new Float32Array(buffer);
}

function nextPow2(v) {
  v += v === 0 ? 1 : 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}
function isPow2(v) {
  return !(v & v - 1) && !!v;
}
function log2(v) {
  let r = (v > 65535 ? 1 : 0) << 4;
  v >>>= r;
  let shift = (v > 255 ? 1 : 0) << 3;
  v >>>= shift;
  r |= shift;
  shift = (v > 15 ? 1 : 0) << 2;
  v >>>= shift;
  r |= shift;
  shift = (v > 3 ? 1 : 0) << 1;
  v >>>= shift;
  r |= shift;
  return r | v >> 1;
}

function removeItems(arr, startIdx, removeCount) {
  const length = arr.length;
  let i;
  if (startIdx >= length || removeCount === 0) {
    return;
  }
  removeCount = startIdx + removeCount > length ? length - startIdx : removeCount;
  const len = length - removeCount;
  for (i = startIdx; i < len; ++i) {
    arr[i] = arr[i + removeCount];
  }
  arr.length = len;
}

function sign(n) {
  if (n === 0)
    return 0;
  return n < 0 ? -1 : 1;
}

let nextUid = 0;
function uid() {
  return ++nextUid;
}

const _BoundingBox = class {
  constructor(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
  get width() {
    return this.right - this.left;
  }
  get height() {
    return this.bottom - this.top;
  }
  isEmpty() {
    return this.left === this.right || this.top === this.bottom;
  }
};
let BoundingBox = _BoundingBox;
BoundingBox.EMPTY = new _BoundingBox(0, 0, 0, 0);

const ProgramCache = {};
const TextureCache = /* @__PURE__ */ Object.create(null);
const BaseTextureCache = /* @__PURE__ */ Object.create(null);
function destroyTextureCache() {
  let key;
  for (key in TextureCache) {
    TextureCache[key].destroy();
  }
  for (key in BaseTextureCache) {
    BaseTextureCache[key].destroy();
  }
}
function clearTextureCache() {
  let key;
  for (key in TextureCache) {
    delete TextureCache[key];
  }
  for (key in BaseTextureCache) {
    delete BaseTextureCache[key];
  }
}

class CanvasRenderTarget {
  constructor(width, height, resolution) {
    this._canvas = settings.ADAPTER.createCanvas();
    this._context = this._canvas.getContext("2d");
    this.resolution = resolution || settings.RESOLUTION;
    this.resize(width, height);
  }
  clear() {
    this._checkDestroyed();
    this._context.setTransform(1, 0, 0, 1, 0, 0);
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }
  resize(desiredWidth, desiredHeight) {
    this._checkDestroyed();
    this._canvas.width = Math.round(desiredWidth * this.resolution);
    this._canvas.height = Math.round(desiredHeight * this.resolution);
  }
  destroy() {
    this._context = null;
    this._canvas = null;
  }
  get width() {
    this._checkDestroyed();
    return this._canvas.width;
  }
  set width(val) {
    this._checkDestroyed();
    this._canvas.width = Math.round(val);
  }
  get height() {
    this._checkDestroyed();
    return this._canvas.height;
  }
  set height(val) {
    this._checkDestroyed();
    this._canvas.height = Math.round(val);
  }
  get canvas() {
    this._checkDestroyed();
    return this._canvas;
  }
  get context() {
    this._checkDestroyed();
    return this._context;
  }
  _checkDestroyed() {
    if (this._canvas === null) {
      throw new TypeError("The CanvasRenderTarget has already been destroyed");
    }
  }
}

function checkRow(data, width, y) {
  for (let x = 0, index = 4 * y * width; x < width; ++x, index += 4) {
    if (data[index + 3] !== 0)
      return false;
  }
  return true;
}
function checkColumn(data, width, x, top, bottom) {
  const stride = 4 * width;
  for (let y = top, index = top * stride + 4 * x; y <= bottom; ++y, index += stride) {
    if (data[index + 3] !== 0)
      return false;
  }
  return true;
}
function getCanvasBoundingBox(canvas) {
  const { width, height } = canvas;
  const context = canvas.getContext("2d", {
    willReadFrequently: true
  });
  if (context === null) {
    throw new TypeError("Failed to get canvas 2D context");
  }
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  let left = 0;
  let top = 0;
  let right = width - 1;
  let bottom = height - 1;
  while (top < height && checkRow(data, width, top))
    ++top;
  if (top === height)
    return BoundingBox.EMPTY;
  while (checkRow(data, width, bottom))
    --bottom;
  while (checkColumn(data, width, left, top, bottom))
    ++left;
  while (checkColumn(data, width, right, top, bottom))
    --right;
  ++right;
  ++bottom;
  return new BoundingBox(left, top, right, bottom);
}

function trimCanvas(canvas) {
  const boundingBox = getCanvasBoundingBox(canvas);
  const { width, height } = boundingBox;
  let data = null;
  if (!boundingBox.isEmpty()) {
    const context = canvas.getContext("2d");
    if (context === null) {
      throw new TypeError("Failed to get canvas 2D context");
    }
    data = context.getImageData(boundingBox.left, boundingBox.top, width, height);
  }
  return { width, height, data };
}

function decomposeDataUri(dataUri) {
  const dataUriMatch = DATA_URI.exec(dataUri);
  if (dataUriMatch) {
    return {
      mediaType: dataUriMatch[1] ? dataUriMatch[1].toLowerCase() : void 0,
      subType: dataUriMatch[2] ? dataUriMatch[2].toLowerCase() : void 0,
      charset: dataUriMatch[3] ? dataUriMatch[3].toLowerCase() : void 0,
      encoding: dataUriMatch[4] ? dataUriMatch[4].toLowerCase() : void 0,
      data: dataUriMatch[5]
    };
  }
  return void 0;
}

let tempAnchor;
function determineCrossOrigin(url$1, loc = globalThis.location) {
  if (url$1.startsWith("data:")) {
    return "";
  }
  loc = loc || globalThis.location;
  if (!tempAnchor) {
    tempAnchor = document.createElement("a");
  }
  tempAnchor.href = url$1;
  const parsedUrl = url.parse(tempAnchor.href);
  const samePort = !parsedUrl.port && loc.port === "" || parsedUrl.port === loc.port;
  if (parsedUrl.hostname !== loc.hostname || !samePort || parsedUrl.protocol !== loc.protocol) {
    return "anonymous";
  }
  return "";
}

function getResolutionOfUrl(url, defaultValue = 1) {
  const resolution = settings.RETINA_PREFIX?.exec(url);
  if (resolution) {
    return parseFloat(resolution[1]);
  }
  return defaultValue;
}

var index = {
  __proto__: null,
  isMobile: isMobile,
  EventEmitter: eventemitter3,
  earcut: earcut_1,
  url: url,
  path: path,
  sayHello: sayHello,
  skipHello: skipHello,
  isWebGLSupported: isWebGLSupported,
  hex2rgb: hex2rgb,
  hex2string: hex2string,
  rgb2hex: rgb2hex,
  string2hex: string2hex,
  correctBlendMode: correctBlendMode,
  premultiplyBlendMode: premultiplyBlendMode,
  premultiplyRgba: premultiplyRgba,
  premultiplyTint: premultiplyTint,
  premultiplyTintToRgba: premultiplyTintToRgba,
  DATA_URI: DATA_URI,
  createIndicesForQuads: createIndicesForQuads,
  getBufferType: getBufferType,
  interleaveTypedArrays: interleaveTypedArrays$1,
  isPow2: isPow2,
  log2: log2,
  nextPow2: nextPow2,
  removeItems: removeItems,
  sign: sign,
  uid: uid,
  deprecation: deprecation,
  BoundingBox: BoundingBox,
  BaseTextureCache: BaseTextureCache,
  ProgramCache: ProgramCache,
  TextureCache: TextureCache,
  clearTextureCache: clearTextureCache,
  destroyTextureCache: destroyTextureCache,
  CanvasRenderTarget: CanvasRenderTarget,
  getCanvasBoundingBox: getCanvasBoundingBox,
  trimCanvas: trimCanvas,
  decomposeDataUri: decomposeDataUri,
  determineCrossOrigin: determineCrossOrigin,
  getResolutionOfUrl: getResolutionOfUrl
};

var ExtensionType = /* @__PURE__ */ ((ExtensionType2) => {
  ExtensionType2["Renderer"] = "renderer";
  ExtensionType2["Application"] = "application";
  ExtensionType2["RendererSystem"] = "renderer-webgl-system";
  ExtensionType2["RendererPlugin"] = "renderer-webgl-plugin";
  ExtensionType2["CanvasRendererSystem"] = "renderer-canvas-system";
  ExtensionType2["CanvasRendererPlugin"] = "renderer-canvas-plugin";
  ExtensionType2["Asset"] = "asset";
  ExtensionType2["LoadParser"] = "load-parser";
  ExtensionType2["ResolveParser"] = "resolve-parser";
  ExtensionType2["CacheParser"] = "cache-parser";
  ExtensionType2["DetectionParser"] = "detection-parser";
  return ExtensionType2;
})(ExtensionType || {});
const normalizeExtension = (ext) => {
  if (typeof ext === "function" || typeof ext === "object" && ext.extension) {
    if (!ext.extension) {
      throw new Error("Extension class must have an extension object");
    }
    const metadata = typeof ext.extension !== "object" ? { type: ext.extension } : ext.extension;
    ext = { ...metadata, ref: ext };
  }
  if (typeof ext === "object") {
    ext = { ...ext };
  } else {
    throw new Error("Invalid extension type");
  }
  if (typeof ext.type === "string") {
    ext.type = [ext.type];
  }
  return ext;
};
const normalizePriority = (ext, defaultPriority) => normalizeExtension(ext).priority ?? defaultPriority;
const extensions$1 = {
  _addHandlers: {},
  _removeHandlers: {},
  _queue: {},
  remove(...extensions2) {
    extensions2.map(normalizeExtension).forEach((ext) => {
      ext.type.forEach((type) => this._removeHandlers[type]?.(ext));
    });
    return this;
  },
  add(...extensions2) {
    extensions2.map(normalizeExtension).forEach((ext) => {
      ext.type.forEach((type) => {
        const handlers = this._addHandlers;
        const queue = this._queue;
        if (!handlers[type]) {
          queue[type] = queue[type] || [];
          queue[type].push(ext);
        } else {
          handlers[type](ext);
        }
      });
    });
    return this;
  },
  handle(type, onAdd, onRemove) {
    const addHandlers = this._addHandlers;
    const removeHandlers = this._removeHandlers;
    if (addHandlers[type] || removeHandlers[type]) {
      throw new Error(`Extension type ${type} already has a handler`);
    }
    addHandlers[type] = onAdd;
    removeHandlers[type] = onRemove;
    const queue = this._queue;
    if (queue[type]) {
      queue[type].forEach((ext) => onAdd(ext));
      delete queue[type];
    }
    return this;
  },
  handleByMap(type, map) {
    return this.handle(type, (extension) => {
      map[extension.name] = extension.ref;
    }, (extension) => {
      delete map[extension.name];
    });
  },
  handleByList(type, list, defaultPriority = -1) {
    return this.handle(type, (extension) => {
      if (list.includes(extension.ref)) {
        return;
      }
      list.push(extension.ref);
      list.sort((a, b) => normalizePriority(b, defaultPriority) - normalizePriority(a, defaultPriority));
    }, (extension) => {
      const index = list.indexOf(extension.ref);
      if (index !== -1) {
        list.splice(index, 1);
      }
    });
  }
};

class ViewableBuffer {
  constructor(sizeOrBuffer) {
    if (typeof sizeOrBuffer === "number") {
      this.rawBinaryData = new ArrayBuffer(sizeOrBuffer);
    } else if (sizeOrBuffer instanceof Uint8Array) {
      this.rawBinaryData = sizeOrBuffer.buffer;
    } else {
      this.rawBinaryData = sizeOrBuffer;
    }
    this.uint32View = new Uint32Array(this.rawBinaryData);
    this.float32View = new Float32Array(this.rawBinaryData);
  }
  get int8View() {
    if (!this._int8View) {
      this._int8View = new Int8Array(this.rawBinaryData);
    }
    return this._int8View;
  }
  get uint8View() {
    if (!this._uint8View) {
      this._uint8View = new Uint8Array(this.rawBinaryData);
    }
    return this._uint8View;
  }
  get int16View() {
    if (!this._int16View) {
      this._int16View = new Int16Array(this.rawBinaryData);
    }
    return this._int16View;
  }
  get uint16View() {
    if (!this._uint16View) {
      this._uint16View = new Uint16Array(this.rawBinaryData);
    }
    return this._uint16View;
  }
  get int32View() {
    if (!this._int32View) {
      this._int32View = new Int32Array(this.rawBinaryData);
    }
    return this._int32View;
  }
  view(type) {
    return this[`${type}View`];
  }
  destroy() {
    this.rawBinaryData = null;
    this._int8View = null;
    this._uint8View = null;
    this._int16View = null;
    this._uint16View = null;
    this._int32View = null;
    this.uint32View = null;
    this.float32View = null;
  }
  static sizeOf(type) {
    switch (type) {
      case "int8":
      case "uint8":
        return 1;
      case "int16":
      case "uint16":
        return 2;
      case "int32":
      case "uint32":
      case "float32":
        return 4;
      default:
        throw new Error(`${type} isn't a valid view type`);
    }
  }
}

const fragTemplate$1 = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join("\n");
function generateIfTestSrc(maxIfs) {
  let src = "";
  for (let i = 0; i < maxIfs; ++i) {
    if (i > 0) {
      src += "\nelse ";
    }
    if (i < maxIfs - 1) {
      src += `if(test == ${i}.0){}`;
    }
  }
  return src;
}
function checkMaxIfStatementsInShader(maxIfs, gl) {
  if (maxIfs === 0) {
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  }
  const shader = gl.createShader(gl.FRAGMENT_SHADER);
  while (true) {
    const fragmentSrc = fragTemplate$1.replace(/%forloop%/gi, generateIfTestSrc(maxIfs));
    gl.shaderSource(shader, fragmentSrc);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      maxIfs = maxIfs / 2 | 0;
    } else {
      break;
    }
  }
  return maxIfs;
}

const BLEND$1 = 0;
const OFFSET$1 = 1;
const CULLING$1 = 2;
const DEPTH_TEST$1 = 3;
const WINDING$1 = 4;
const DEPTH_MASK$1 = 5;
class State {
  constructor() {
    this.data = 0;
    this.blendMode = BLEND_MODES.NORMAL;
    this.polygonOffset = 0;
    this.blend = true;
    this.depthMask = true;
  }
  get blend() {
    return !!(this.data & 1 << BLEND$1);
  }
  set blend(value) {
    if (!!(this.data & 1 << BLEND$1) !== value) {
      this.data ^= 1 << BLEND$1;
    }
  }
  get offsets() {
    return !!(this.data & 1 << OFFSET$1);
  }
  set offsets(value) {
    if (!!(this.data & 1 << OFFSET$1) !== value) {
      this.data ^= 1 << OFFSET$1;
    }
  }
  get culling() {
    return !!(this.data & 1 << CULLING$1);
  }
  set culling(value) {
    if (!!(this.data & 1 << CULLING$1) !== value) {
      this.data ^= 1 << CULLING$1;
    }
  }
  get depthTest() {
    return !!(this.data & 1 << DEPTH_TEST$1);
  }
  set depthTest(value) {
    if (!!(this.data & 1 << DEPTH_TEST$1) !== value) {
      this.data ^= 1 << DEPTH_TEST$1;
    }
  }
  get depthMask() {
    return !!(this.data & 1 << DEPTH_MASK$1);
  }
  set depthMask(value) {
    if (!!(this.data & 1 << DEPTH_MASK$1) !== value) {
      this.data ^= 1 << DEPTH_MASK$1;
    }
  }
  get clockwiseFrontFace() {
    return !!(this.data & 1 << WINDING$1);
  }
  set clockwiseFrontFace(value) {
    if (!!(this.data & 1 << WINDING$1) !== value) {
      this.data ^= 1 << WINDING$1;
    }
  }
  get blendMode() {
    return this._blendMode;
  }
  set blendMode(value) {
    this.blend = value !== BLEND_MODES.NONE;
    this._blendMode = value;
  }
  get polygonOffset() {
    return this._polygonOffset;
  }
  set polygonOffset(value) {
    this.offsets = !!value;
    this._polygonOffset = value;
  }
  toString() {
    return `[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
  }
  static for2d() {
    const state = new State();
    state.depthTest = false;
    state.blend = true;
    return state;
  }
}

const INSTALLED = [];
function autoDetectResource(source, options) {
  if (!source) {
    return null;
  }
  let extension = "";
  if (typeof source === "string") {
    const result = /\.(\w{3,4})(?:$|\?|#)/i.exec(source);
    if (result) {
      extension = result[1].toLowerCase();
    }
  }
  for (let i = INSTALLED.length - 1; i >= 0; --i) {
    const ResourcePlugin = INSTALLED[i];
    if (ResourcePlugin.test && ResourcePlugin.test(source, extension)) {
      return new ResourcePlugin(source, options);
    }
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
}

class Runner {
  constructor(name) {
    this.items = [];
    this._name = name;
    this._aliasCount = 0;
  }
  emit(a0, a1, a2, a3, a4, a5, a6, a7) {
    if (arguments.length > 8) {
      throw new Error("max arguments reached");
    }
    const { name, items } = this;
    this._aliasCount++;
    for (let i = 0, len = items.length; i < len; i++) {
      items[i][name](a0, a1, a2, a3, a4, a5, a6, a7);
    }
    if (items === this.items) {
      this._aliasCount--;
    }
    return this;
  }
  ensureNonAliasedItems() {
    if (this._aliasCount > 0 && this.items.length > 1) {
      this._aliasCount = 0;
      this.items = this.items.slice(0);
    }
  }
  add(item) {
    if (item[this._name]) {
      this.ensureNonAliasedItems();
      this.remove(item);
      this.items.push(item);
    }
    return this;
  }
  remove(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.ensureNonAliasedItems();
      this.items.splice(index, 1);
    }
    return this;
  }
  contains(item) {
    return this.items.includes(item);
  }
  removeAll() {
    this.ensureNonAliasedItems();
    this.items.length = 0;
    return this;
  }
  destroy() {
    this.removeAll();
    this.items = null;
    this._name = null;
  }
  get empty() {
    return this.items.length === 0;
  }
  get name() {
    return this._name;
  }
}
Object.defineProperties(Runner.prototype, {
  dispatch: { value: Runner.prototype.emit },
  run: { value: Runner.prototype.emit }
});

class Resource {
  constructor(width = 0, height = 0) {
    this._width = width;
    this._height = height;
    this.destroyed = false;
    this.internal = false;
    this.onResize = new Runner("setRealSize");
    this.onUpdate = new Runner("update");
    this.onError = new Runner("onError");
  }
  bind(baseTexture) {
    this.onResize.add(baseTexture);
    this.onUpdate.add(baseTexture);
    this.onError.add(baseTexture);
    if (this._width || this._height) {
      this.onResize.emit(this._width, this._height);
    }
  }
  unbind(baseTexture) {
    this.onResize.remove(baseTexture);
    this.onUpdate.remove(baseTexture);
    this.onError.remove(baseTexture);
  }
  resize(width, height) {
    if (width !== this._width || height !== this._height) {
      this._width = width;
      this._height = height;
      this.onResize.emit(width, height);
    }
  }
  get valid() {
    return !!this._width && !!this._height;
  }
  update() {
    if (!this.destroyed) {
      this.onUpdate.emit();
    }
  }
  load() {
    return Promise.resolve(this);
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  style(_renderer, _baseTexture, _glTexture) {
    return false;
  }
  dispose() {
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.dispose();
      this.onError.removeAll();
      this.onError = null;
      this.onResize.removeAll();
      this.onResize = null;
      this.onUpdate.removeAll();
      this.onUpdate = null;
    }
  }
  static test(_source, _extension) {
    return false;
  }
}

class BufferResource extends Resource {
  constructor(source, options) {
    const { width, height } = options || {};
    if (!width || !height) {
      throw new Error("BufferResource width or height invalid");
    }
    super(width, height);
    this.data = source;
  }
  upload(renderer, baseTexture, glTexture) {
    const gl = renderer.gl;
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
    const width = baseTexture.realWidth;
    const height = baseTexture.realHeight;
    if (glTexture.width === width && glTexture.height === height) {
      gl.texSubImage2D(baseTexture.target, 0, 0, 0, width, height, baseTexture.format, glTexture.type, this.data);
    } else {
      glTexture.width = width;
      glTexture.height = height;
      gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, width, height, 0, baseTexture.format, glTexture.type, this.data);
    }
    return true;
  }
  dispose() {
    this.data = null;
  }
  static test(source) {
    return source instanceof Float32Array || source instanceof Uint8Array || source instanceof Uint32Array;
  }
}

const defaultBufferOptions = {
  scaleMode: SCALE_MODES.NEAREST,
  format: FORMATS.RGBA,
  alphaMode: ALPHA_MODES.NPM
};
const _BaseTexture = class extends eventemitter3 {
  constructor(resource = null, options = null) {
    super();
    options = Object.assign({}, _BaseTexture.defaultOptions, options);
    const {
      alphaMode,
      mipmap,
      anisotropicLevel,
      scaleMode,
      width,
      height,
      wrapMode,
      format,
      type,
      target,
      resolution,
      resourceOptions
    } = options;
    if (resource && !(resource instanceof Resource)) {
      resource = autoDetectResource(resource, resourceOptions);
      resource.internal = true;
    }
    this.resolution = resolution || settings.RESOLUTION;
    this.width = Math.round((width || 0) * this.resolution) / this.resolution;
    this.height = Math.round((height || 0) * this.resolution) / this.resolution;
    this._mipmap = mipmap;
    this.anisotropicLevel = anisotropicLevel;
    this._wrapMode = wrapMode;
    this._scaleMode = scaleMode;
    this.format = format;
    this.type = type;
    this.target = target;
    this.alphaMode = alphaMode;
    this.uid = uid();
    this.touched = 0;
    this.isPowerOfTwo = false;
    this._refreshPOT();
    this._glTextures = {};
    this.dirtyId = 0;
    this.dirtyStyleId = 0;
    this.cacheId = null;
    this.valid = width > 0 && height > 0;
    this.textureCacheIds = [];
    this.destroyed = false;
    this.resource = null;
    this._batchEnabled = 0;
    this._batchLocation = 0;
    this.parentTextureArray = null;
    this.setResource(resource);
  }
  get realWidth() {
    return Math.round(this.width * this.resolution);
  }
  get realHeight() {
    return Math.round(this.height * this.resolution);
  }
  get mipmap() {
    return this._mipmap;
  }
  set mipmap(value) {
    if (this._mipmap !== value) {
      this._mipmap = value;
      this.dirtyStyleId++;
    }
  }
  get scaleMode() {
    return this._scaleMode;
  }
  set scaleMode(value) {
    if (this._scaleMode !== value) {
      this._scaleMode = value;
      this.dirtyStyleId++;
    }
  }
  get wrapMode() {
    return this._wrapMode;
  }
  set wrapMode(value) {
    if (this._wrapMode !== value) {
      this._wrapMode = value;
      this.dirtyStyleId++;
    }
  }
  setStyle(scaleMode, mipmap) {
    let dirty;
    if (scaleMode !== void 0 && scaleMode !== this.scaleMode) {
      this.scaleMode = scaleMode;
      dirty = true;
    }
    if (mipmap !== void 0 && mipmap !== this.mipmap) {
      this.mipmap = mipmap;
      dirty = true;
    }
    if (dirty) {
      this.dirtyStyleId++;
    }
    return this;
  }
  setSize(desiredWidth, desiredHeight, resolution) {
    resolution = resolution || this.resolution;
    return this.setRealSize(desiredWidth * resolution, desiredHeight * resolution, resolution);
  }
  setRealSize(realWidth, realHeight, resolution) {
    this.resolution = resolution || this.resolution;
    this.width = Math.round(realWidth) / this.resolution;
    this.height = Math.round(realHeight) / this.resolution;
    this._refreshPOT();
    this.update();
    return this;
  }
  _refreshPOT() {
    this.isPowerOfTwo = isPow2(this.realWidth) && isPow2(this.realHeight);
  }
  setResolution(resolution) {
    const oldResolution = this.resolution;
    if (oldResolution === resolution) {
      return this;
    }
    this.resolution = resolution;
    if (this.valid) {
      this.width = Math.round(this.width * oldResolution) / resolution;
      this.height = Math.round(this.height * oldResolution) / resolution;
      this.emit("update", this);
    }
    this._refreshPOT();
    return this;
  }
  setResource(resource) {
    if (this.resource === resource) {
      return this;
    }
    if (this.resource) {
      throw new Error("Resource can be set only once");
    }
    resource.bind(this);
    this.resource = resource;
    return this;
  }
  update() {
    if (!this.valid) {
      if (this.width > 0 && this.height > 0) {
        this.valid = true;
        this.emit("loaded", this);
        this.emit("update", this);
      }
    } else {
      this.dirtyId++;
      this.dirtyStyleId++;
      this.emit("update", this);
    }
  }
  onError(event) {
    this.emit("error", this, event);
  }
  destroy() {
    if (this.resource) {
      this.resource.unbind(this);
      if (this.resource.internal) {
        this.resource.destroy();
      }
      this.resource = null;
    }
    if (this.cacheId) {
      delete BaseTextureCache[this.cacheId];
      delete TextureCache[this.cacheId];
      this.cacheId = null;
    }
    this.dispose();
    _BaseTexture.removeFromCache(this);
    this.textureCacheIds = null;
    this.destroyed = true;
  }
  dispose() {
    this.emit("dispose", this);
  }
  castToBaseTexture() {
    return this;
  }
  static from(source, options, strict = settings.STRICT_TEXTURE_CACHE) {
    const isFrame = typeof source === "string";
    let cacheId = null;
    if (isFrame) {
      cacheId = source;
    } else {
      if (!source._pixiId) {
        const prefix = options?.pixiIdPrefix || "pixiid";
        source._pixiId = `${prefix}_${uid()}`;
      }
      cacheId = source._pixiId;
    }
    let baseTexture = BaseTextureCache[cacheId];
    if (isFrame && strict && !baseTexture) {
      throw new Error(`The cacheId "${cacheId}" does not exist in BaseTextureCache.`);
    }
    if (!baseTexture) {
      baseTexture = new _BaseTexture(source, options);
      baseTexture.cacheId = cacheId;
      _BaseTexture.addToCache(baseTexture, cacheId);
    }
    return baseTexture;
  }
  static fromBuffer(buffer, width, height, options) {
    buffer = buffer || new Float32Array(width * height * 4);
    const resource = new BufferResource(buffer, { width, height });
    const type = buffer instanceof Float32Array ? TYPES.FLOAT : TYPES.UNSIGNED_BYTE;
    return new _BaseTexture(resource, Object.assign({}, defaultBufferOptions, options || { width, height, type }));
  }
  static addToCache(baseTexture, id) {
    if (id) {
      if (!baseTexture.textureCacheIds.includes(id)) {
        baseTexture.textureCacheIds.push(id);
      }
      if (BaseTextureCache[id] && BaseTextureCache[id] !== baseTexture) {
        console.warn(`BaseTexture added to the cache with an id [${id}] that already had an entry`);
      }
      BaseTextureCache[id] = baseTexture;
    }
  }
  static removeFromCache(baseTexture) {
    if (typeof baseTexture === "string") {
      const baseTextureFromCache = BaseTextureCache[baseTexture];
      if (baseTextureFromCache) {
        const index = baseTextureFromCache.textureCacheIds.indexOf(baseTexture);
        if (index > -1) {
          baseTextureFromCache.textureCacheIds.splice(index, 1);
        }
        delete BaseTextureCache[baseTexture];
        return baseTextureFromCache;
      }
    } else if (baseTexture?.textureCacheIds) {
      for (let i = 0; i < baseTexture.textureCacheIds.length; ++i) {
        delete BaseTextureCache[baseTexture.textureCacheIds[i]];
      }
      baseTexture.textureCacheIds.length = 0;
      return baseTexture;
    }
    return null;
  }
};
let BaseTexture = _BaseTexture;
BaseTexture.defaultOptions = {
  mipmap: MIPMAP_MODES.POW2,
  anisotropicLevel: 0,
  scaleMode: SCALE_MODES.LINEAR,
  wrapMode: WRAP_MODES.CLAMP,
  alphaMode: ALPHA_MODES.UNPACK,
  target: TARGETS.TEXTURE_2D,
  format: FORMATS.RGBA,
  type: TYPES.UNSIGNED_BYTE
};
BaseTexture._globalBatch = 0;

class BatchDrawCall {
  constructor() {
    this.texArray = null;
    this.blend = 0;
    this.type = DRAW_MODES.TRIANGLES;
    this.start = 0;
    this.size = 0;
    this.data = null;
  }
}

let UID$4 = 0;
class Buffer {
  constructor(data, _static = true, index = false) {
    this.data = data || new Float32Array(1);
    this._glBuffers = {};
    this._updateID = 0;
    this.index = index;
    this.static = _static;
    this.id = UID$4++;
    this.disposeRunner = new Runner("disposeBuffer");
  }
  update(data) {
    if (data instanceof Array) {
      data = new Float32Array(data);
    }
    this.data = data || this.data;
    this._updateID++;
  }
  dispose() {
    this.disposeRunner.emit(this, false);
  }
  destroy() {
    this.dispose();
    this.data = null;
  }
  set index(value) {
    this.type = value ? BUFFER_TYPE.ELEMENT_ARRAY_BUFFER : BUFFER_TYPE.ARRAY_BUFFER;
  }
  get index() {
    return this.type === BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
  }
  static from(data) {
    if (data instanceof Array) {
      data = new Float32Array(data);
    }
    return new Buffer(data);
  }
}

class Attribute {
  constructor(buffer, size = 0, normalized = false, type = TYPES.FLOAT, stride, start, instance, divisor = 1) {
    this.buffer = buffer;
    this.size = size;
    this.normalized = normalized;
    this.type = type;
    this.stride = stride;
    this.start = start;
    this.instance = instance;
    this.divisor = divisor;
  }
  destroy() {
    this.buffer = null;
  }
  static from(buffer, size, normalized, type, stride) {
    return new Attribute(buffer, size, normalized, type, stride);
  }
}

const map$1 = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function interleaveTypedArrays(arrays, sizes) {
  let outSize = 0;
  let stride = 0;
  const views = {};
  for (let i = 0; i < arrays.length; i++) {
    stride += sizes[i];
    outSize += arrays[i].length;
  }
  const buffer = new ArrayBuffer(outSize * 4);
  let out = null;
  let littleOffset = 0;
  for (let i = 0; i < arrays.length; i++) {
    const size = sizes[i];
    const array = arrays[i];
    const type = getBufferType(array);
    if (!views[type]) {
      views[type] = new map$1[type](buffer);
    }
    out = views[type];
    for (let j = 0; j < array.length; j++) {
      const indexStart = (j / size | 0) * stride + littleOffset;
      const index = j % size;
      out[indexStart + index] = array[j];
    }
    littleOffset += size;
  }
  return new Float32Array(buffer);
}

const byteSizeMap$1 = { 5126: 4, 5123: 2, 5121: 1 };
let UID$3 = 0;
const map = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
};
class Geometry {
  constructor(buffers = [], attributes = {}) {
    this.buffers = buffers;
    this.indexBuffer = null;
    this.attributes = attributes;
    this.glVertexArrayObjects = {};
    this.id = UID$3++;
    this.instanced = false;
    this.instanceCount = 1;
    this.disposeRunner = new Runner("disposeGeometry");
    this.refCount = 0;
  }
  addAttribute(id, buffer, size = 0, normalized = false, type, stride, start, instance = false) {
    if (!buffer) {
      throw new Error("You must pass a buffer when creating an attribute");
    }
    if (!(buffer instanceof Buffer)) {
      if (buffer instanceof Array) {
        buffer = new Float32Array(buffer);
      }
      buffer = new Buffer(buffer);
    }
    const ids = id.split("|");
    if (ids.length > 1) {
      for (let i = 0; i < ids.length; i++) {
        this.addAttribute(ids[i], buffer, size, normalized, type);
      }
      return this;
    }
    let bufferIndex = this.buffers.indexOf(buffer);
    if (bufferIndex === -1) {
      this.buffers.push(buffer);
      bufferIndex = this.buffers.length - 1;
    }
    this.attributes[id] = new Attribute(bufferIndex, size, normalized, type, stride, start, instance);
    this.instanced = this.instanced || instance;
    return this;
  }
  getAttribute(id) {
    return this.attributes[id];
  }
  getBuffer(id) {
    return this.buffers[this.getAttribute(id).buffer];
  }
  addIndex(buffer) {
    if (!(buffer instanceof Buffer)) {
      if (buffer instanceof Array) {
        buffer = new Uint16Array(buffer);
      }
      buffer = new Buffer(buffer);
    }
    buffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
    this.indexBuffer = buffer;
    if (!this.buffers.includes(buffer)) {
      this.buffers.push(buffer);
    }
    return this;
  }
  getIndex() {
    return this.indexBuffer;
  }
  interleave() {
    if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
      return this;
    const arrays = [];
    const sizes = [];
    const interleavedBuffer = new Buffer();
    let i;
    for (i in this.attributes) {
      const attribute = this.attributes[i];
      const buffer = this.buffers[attribute.buffer];
      arrays.push(buffer.data);
      sizes.push(attribute.size * byteSizeMap$1[attribute.type] / 4);
      attribute.buffer = 0;
    }
    interleavedBuffer.data = interleaveTypedArrays(arrays, sizes);
    for (i = 0; i < this.buffers.length; i++) {
      if (this.buffers[i] !== this.indexBuffer) {
        this.buffers[i].destroy();
      }
    }
    this.buffers = [interleavedBuffer];
    if (this.indexBuffer) {
      this.buffers.push(this.indexBuffer);
    }
    return this;
  }
  getSize() {
    for (const i in this.attributes) {
      const attribute = this.attributes[i];
      const buffer = this.buffers[attribute.buffer];
      return buffer.data.length / (attribute.stride / 4 || attribute.size);
    }
    return 0;
  }
  dispose() {
    this.disposeRunner.emit(this, false);
  }
  destroy() {
    this.dispose();
    this.buffers = null;
    this.indexBuffer = null;
    this.attributes = null;
  }
  clone() {
    const geometry = new Geometry();
    for (let i = 0; i < this.buffers.length; i++) {
      geometry.buffers[i] = new Buffer(this.buffers[i].data.slice(0));
    }
    for (const i in this.attributes) {
      const attrib = this.attributes[i];
      geometry.attributes[i] = new Attribute(attrib.buffer, attrib.size, attrib.normalized, attrib.type, attrib.stride, attrib.start, attrib.instance);
    }
    if (this.indexBuffer) {
      geometry.indexBuffer = geometry.buffers[this.buffers.indexOf(this.indexBuffer)];
      geometry.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
    }
    return geometry;
  }
  static merge(geometries) {
    const geometryOut = new Geometry();
    const arrays = [];
    const sizes = [];
    const offsets = [];
    let geometry;
    for (let i = 0; i < geometries.length; i++) {
      geometry = geometries[i];
      for (let j = 0; j < geometry.buffers.length; j++) {
        sizes[j] = sizes[j] || 0;
        sizes[j] += geometry.buffers[j].data.length;
        offsets[j] = 0;
      }
    }
    for (let i = 0; i < geometry.buffers.length; i++) {
      arrays[i] = new map[getBufferType(geometry.buffers[i].data)](sizes[i]);
      geometryOut.buffers[i] = new Buffer(arrays[i]);
    }
    for (let i = 0; i < geometries.length; i++) {
      geometry = geometries[i];
      for (let j = 0; j < geometry.buffers.length; j++) {
        arrays[j].set(geometry.buffers[j].data, offsets[j]);
        offsets[j] += geometry.buffers[j].data.length;
      }
    }
    geometryOut.attributes = geometry.attributes;
    if (geometry.indexBuffer) {
      geometryOut.indexBuffer = geometryOut.buffers[geometry.buffers.indexOf(geometry.indexBuffer)];
      geometryOut.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
      let offset = 0;
      let stride = 0;
      let offset2 = 0;
      let bufferIndexToCount = 0;
      for (let i = 0; i < geometry.buffers.length; i++) {
        if (geometry.buffers[i] !== geometry.indexBuffer) {
          bufferIndexToCount = i;
          break;
        }
      }
      for (const i in geometry.attributes) {
        const attribute = geometry.attributes[i];
        if ((attribute.buffer | 0) === bufferIndexToCount) {
          stride += attribute.size * byteSizeMap$1[attribute.type] / 4;
        }
      }
      for (let i = 0; i < geometries.length; i++) {
        const indexBufferData = geometries[i].indexBuffer.data;
        for (let j = 0; j < indexBufferData.length; j++) {
          geometryOut.indexBuffer.data[j + offset2] += offset;
        }
        offset += geometries[i].buffers[bufferIndexToCount].data.length / stride;
        offset2 += indexBufferData.length;
      }
    }
    return geometryOut;
  }
}

class BatchGeometry extends Geometry {
  constructor(_static = false) {
    super();
    this._buffer = new Buffer(null, _static, false);
    this._indexBuffer = new Buffer(null, _static, true);
    this.addAttribute("aVertexPosition", this._buffer, 2, false, TYPES.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, false, TYPES.FLOAT).addAttribute("aColor", this._buffer, 4, true, TYPES.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, true, TYPES.FLOAT).addIndex(this._indexBuffer);
  }
}

const PI_2 = Math.PI * 2;
const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;
var SHAPES = /* @__PURE__ */ ((SHAPES2) => {
  SHAPES2[SHAPES2["POLY"] = 0] = "POLY";
  SHAPES2[SHAPES2["RECT"] = 1] = "RECT";
  SHAPES2[SHAPES2["CIRC"] = 2] = "CIRC";
  SHAPES2[SHAPES2["ELIP"] = 3] = "ELIP";
  SHAPES2[SHAPES2["RREC"] = 4] = "RREC";
  return SHAPES2;
})(SHAPES || {});

class Point {
  constructor(x = 0, y = 0) {
    this.x = 0;
    this.y = 0;
    this.x = x;
    this.y = y;
  }
  clone() {
    return new Point(this.x, this.y);
  }
  copyFrom(p) {
    this.set(p.x, p.y);
    return this;
  }
  copyTo(p) {
    p.set(this.x, this.y);
    return p;
  }
  equals(p) {
    return p.x === this.x && p.y === this.y;
  }
  set(x = 0, y = x) {
    this.x = x;
    this.y = y;
    return this;
  }
  toString() {
    return `[@pixi/math:Point x=${this.x} y=${this.y}]`;
  }
}

const tempPoints$1 = [new Point(), new Point(), new Point(), new Point()];
class Rectangle {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = Number(x);
    this.y = Number(y);
    this.width = Number(width);
    this.height = Number(height);
    this.type = SHAPES.RECT;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  static get EMPTY() {
    return new Rectangle(0, 0, 0, 0);
  }
  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
  copyFrom(rectangle) {
    this.x = rectangle.x;
    this.y = rectangle.y;
    this.width = rectangle.width;
    this.height = rectangle.height;
    return this;
  }
  copyTo(rectangle) {
    rectangle.x = this.x;
    rectangle.y = this.y;
    rectangle.width = this.width;
    rectangle.height = this.height;
    return rectangle;
  }
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    if (x >= this.x && x < this.x + this.width) {
      if (y >= this.y && y < this.y + this.height) {
        return true;
      }
    }
    return false;
  }
  intersects(other, transform) {
    if (!transform) {
      const x02 = this.x < other.x ? other.x : this.x;
      const x12 = this.right > other.right ? other.right : this.right;
      if (x12 <= x02) {
        return false;
      }
      const y02 = this.y < other.y ? other.y : this.y;
      const y12 = this.bottom > other.bottom ? other.bottom : this.bottom;
      return y12 > y02;
    }
    const x0 = this.left;
    const x1 = this.right;
    const y0 = this.top;
    const y1 = this.bottom;
    if (x1 <= x0 || y1 <= y0) {
      return false;
    }
    const lt = tempPoints$1[0].set(other.left, other.top);
    const lb = tempPoints$1[1].set(other.left, other.bottom);
    const rt = tempPoints$1[2].set(other.right, other.top);
    const rb = tempPoints$1[3].set(other.right, other.bottom);
    if (rt.x <= lt.x || lb.y <= lt.y) {
      return false;
    }
    const s = Math.sign(transform.a * transform.d - transform.b * transform.c);
    if (s === 0) {
      return false;
    }
    transform.apply(lt, lt);
    transform.apply(lb, lb);
    transform.apply(rt, rt);
    transform.apply(rb, rb);
    if (Math.max(lt.x, lb.x, rt.x, rb.x) <= x0 || Math.min(lt.x, lb.x, rt.x, rb.x) >= x1 || Math.max(lt.y, lb.y, rt.y, rb.y) <= y0 || Math.min(lt.y, lb.y, rt.y, rb.y) >= y1) {
      return false;
    }
    const nx = s * (lb.y - lt.y);
    const ny = s * (lt.x - lb.x);
    const n00 = nx * x0 + ny * y0;
    const n10 = nx * x1 + ny * y0;
    const n01 = nx * x0 + ny * y1;
    const n11 = nx * x1 + ny * y1;
    if (Math.max(n00, n10, n01, n11) <= nx * lt.x + ny * lt.y || Math.min(n00, n10, n01, n11) >= nx * rb.x + ny * rb.y) {
      return false;
    }
    const mx = s * (lt.y - rt.y);
    const my = s * (rt.x - lt.x);
    const m00 = mx * x0 + my * y0;
    const m10 = mx * x1 + my * y0;
    const m01 = mx * x0 + my * y1;
    const m11 = mx * x1 + my * y1;
    if (Math.max(m00, m10, m01, m11) <= mx * lt.x + my * lt.y || Math.min(m00, m10, m01, m11) >= mx * rb.x + my * rb.y) {
      return false;
    }
    return true;
  }
  pad(paddingX = 0, paddingY = paddingX) {
    this.x -= paddingX;
    this.y -= paddingY;
    this.width += paddingX * 2;
    this.height += paddingY * 2;
    return this;
  }
  fit(rectangle) {
    const x1 = Math.max(this.x, rectangle.x);
    const x2 = Math.min(this.x + this.width, rectangle.x + rectangle.width);
    const y1 = Math.max(this.y, rectangle.y);
    const y2 = Math.min(this.y + this.height, rectangle.y + rectangle.height);
    this.x = x1;
    this.width = Math.max(x2 - x1, 0);
    this.y = y1;
    this.height = Math.max(y2 - y1, 0);
    return this;
  }
  ceil(resolution = 1, eps = 1e-3) {
    const x2 = Math.ceil((this.x + this.width - eps) * resolution) / resolution;
    const y2 = Math.ceil((this.y + this.height - eps) * resolution) / resolution;
    this.x = Math.floor((this.x + eps) * resolution) / resolution;
    this.y = Math.floor((this.y + eps) * resolution) / resolution;
    this.width = x2 - this.x;
    this.height = y2 - this.y;
    return this;
  }
  enlarge(rectangle) {
    const x1 = Math.min(this.x, rectangle.x);
    const x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
    const y1 = Math.min(this.y, rectangle.y);
    const y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);
    this.x = x1;
    this.width = x2 - x1;
    this.y = y1;
    this.height = y2 - y1;
    return this;
  }
  toString() {
    return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
  }
}

class Circle {
  constructor(x = 0, y = 0, radius = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.type = SHAPES.CIRC;
  }
  clone() {
    return new Circle(this.x, this.y, this.radius);
  }
  contains(x, y) {
    if (this.radius <= 0) {
      return false;
    }
    const r2 = this.radius * this.radius;
    let dx = this.x - x;
    let dy = this.y - y;
    dx *= dx;
    dy *= dy;
    return dx + dy <= r2;
  }
  getBounds() {
    return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
  toString() {
    return `[@pixi/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
  }
}

class Ellipse {
  constructor(x = 0, y = 0, halfWidth = 0, halfHeight = 0) {
    this.x = x;
    this.y = y;
    this.width = halfWidth;
    this.height = halfHeight;
    this.type = SHAPES.ELIP;
  }
  clone() {
    return new Ellipse(this.x, this.y, this.width, this.height);
  }
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    let normx = (x - this.x) / this.width;
    let normy = (y - this.y) / this.height;
    normx *= normx;
    normy *= normy;
    return normx + normy <= 1;
  }
  getBounds() {
    return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
  }
  toString() {
    return `[@pixi/math:Ellipse x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
  }
}

class Polygon {
  constructor(...points) {
    let flat = Array.isArray(points[0]) ? points[0] : points;
    if (typeof flat[0] !== "number") {
      const p = [];
      for (let i = 0, il = flat.length; i < il; i++) {
        p.push(flat[i].x, flat[i].y);
      }
      flat = p;
    }
    this.points = flat;
    this.type = SHAPES.POLY;
    this.closeStroke = true;
  }
  clone() {
    const points = this.points.slice();
    const polygon = new Polygon(points);
    polygon.closeStroke = this.closeStroke;
    return polygon;
  }
  contains(x, y) {
    let inside = false;
    const length = this.points.length / 2;
    for (let i = 0, j = length - 1; i < length; j = i++) {
      const xi = this.points[i * 2];
      const yi = this.points[i * 2 + 1];
      const xj = this.points[j * 2];
      const yj = this.points[j * 2 + 1];
      const intersect = yi > y !== yj > y && x < (xj - xi) * ((y - yi) / (yj - yi)) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }
  toString() {
    return `[@pixi/math:PolygoncloseStroke=${this.closeStroke}points=${this.points.reduce((pointsDesc, currentPoint) => `${pointsDesc}, ${currentPoint}`, "")}]`;
  }
}

class RoundedRectangle {
  constructor(x = 0, y = 0, width = 0, height = 0, radius = 20) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.type = SHAPES.RREC;
  }
  clone() {
    return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
  }
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    if (x >= this.x && x <= this.x + this.width) {
      if (y >= this.y && y <= this.y + this.height) {
        const radius = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
        if (y >= this.y + radius && y <= this.y + this.height - radius || x >= this.x + radius && x <= this.x + this.width - radius) {
          return true;
        }
        let dx = x - (this.x + radius);
        let dy = y - (this.y + radius);
        const radius2 = radius * radius;
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dx = x - (this.x + this.width - radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dy = y - (this.y + this.height - radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dx = x - (this.x + radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
      }
    }
    return false;
  }
  toString() {
    return `[@pixi/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
  }
}

class Matrix {
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    this.array = null;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }
  fromArray(array) {
    this.a = array[0];
    this.b = array[1];
    this.c = array[3];
    this.d = array[4];
    this.tx = array[2];
    this.ty = array[5];
  }
  set(a, b, c, d, tx, ty) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
    return this;
  }
  toArray(transpose, out) {
    if (!this.array) {
      this.array = new Float32Array(9);
    }
    const array = out || this.array;
    if (transpose) {
      array[0] = this.a;
      array[1] = this.b;
      array[2] = 0;
      array[3] = this.c;
      array[4] = this.d;
      array[5] = 0;
      array[6] = this.tx;
      array[7] = this.ty;
      array[8] = 1;
    } else {
      array[0] = this.a;
      array[1] = this.c;
      array[2] = this.tx;
      array[3] = this.b;
      array[4] = this.d;
      array[5] = this.ty;
      array[6] = 0;
      array[7] = 0;
      array[8] = 1;
    }
    return array;
  }
  apply(pos, newPos) {
    newPos = newPos || new Point();
    const x = pos.x;
    const y = pos.y;
    newPos.x = this.a * x + this.c * y + this.tx;
    newPos.y = this.b * x + this.d * y + this.ty;
    return newPos;
  }
  applyInverse(pos, newPos) {
    newPos = newPos || new Point();
    const id = 1 / (this.a * this.d + this.c * -this.b);
    const x = pos.x;
    const y = pos.y;
    newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
    newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;
    return newPos;
  }
  translate(x, y) {
    this.tx += x;
    this.ty += y;
    return this;
  }
  scale(x, y) {
    this.a *= x;
    this.d *= y;
    this.c *= x;
    this.b *= y;
    this.tx *= x;
    this.ty *= y;
    return this;
  }
  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const a1 = this.a;
    const c1 = this.c;
    const tx1 = this.tx;
    this.a = a1 * cos - this.b * sin;
    this.b = a1 * sin + this.b * cos;
    this.c = c1 * cos - this.d * sin;
    this.d = c1 * sin + this.d * cos;
    this.tx = tx1 * cos - this.ty * sin;
    this.ty = tx1 * sin + this.ty * cos;
    return this;
  }
  append(matrix) {
    const a1 = this.a;
    const b1 = this.b;
    const c1 = this.c;
    const d1 = this.d;
    this.a = matrix.a * a1 + matrix.b * c1;
    this.b = matrix.a * b1 + matrix.b * d1;
    this.c = matrix.c * a1 + matrix.d * c1;
    this.d = matrix.c * b1 + matrix.d * d1;
    this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
    this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
    return this;
  }
  setTransform(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
    this.a = Math.cos(rotation + skewY) * scaleX;
    this.b = Math.sin(rotation + skewY) * scaleX;
    this.c = -Math.sin(rotation - skewX) * scaleY;
    this.d = Math.cos(rotation - skewX) * scaleY;
    this.tx = x - (pivotX * this.a + pivotY * this.c);
    this.ty = y - (pivotX * this.b + pivotY * this.d);
    return this;
  }
  prepend(matrix) {
    const tx1 = this.tx;
    if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
      const a1 = this.a;
      const c1 = this.c;
      this.a = a1 * matrix.a + this.b * matrix.c;
      this.b = a1 * matrix.b + this.b * matrix.d;
      this.c = c1 * matrix.a + this.d * matrix.c;
      this.d = c1 * matrix.b + this.d * matrix.d;
    }
    this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx;
    this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty;
    return this;
  }
  decompose(transform) {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const pivot = transform.pivot;
    const skewX = -Math.atan2(-c, d);
    const skewY = Math.atan2(b, a);
    const delta = Math.abs(skewX + skewY);
    if (delta < 1e-5 || Math.abs(PI_2 - delta) < 1e-5) {
      transform.rotation = skewY;
      transform.skew.x = transform.skew.y = 0;
    } else {
      transform.rotation = 0;
      transform.skew.x = skewX;
      transform.skew.y = skewY;
    }
    transform.scale.x = Math.sqrt(a * a + b * b);
    transform.scale.y = Math.sqrt(c * c + d * d);
    transform.position.x = this.tx + (pivot.x * a + pivot.y * c);
    transform.position.y = this.ty + (pivot.x * b + pivot.y * d);
    return transform;
  }
  invert() {
    const a1 = this.a;
    const b1 = this.b;
    const c1 = this.c;
    const d1 = this.d;
    const tx1 = this.tx;
    const n = a1 * d1 - b1 * c1;
    this.a = d1 / n;
    this.b = -b1 / n;
    this.c = -c1 / n;
    this.d = a1 / n;
    this.tx = (c1 * this.ty - d1 * tx1) / n;
    this.ty = -(a1 * this.ty - b1 * tx1) / n;
    return this;
  }
  identity() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;
    return this;
  }
  clone() {
    const matrix = new Matrix();
    matrix.a = this.a;
    matrix.b = this.b;
    matrix.c = this.c;
    matrix.d = this.d;
    matrix.tx = this.tx;
    matrix.ty = this.ty;
    return matrix;
  }
  copyTo(matrix) {
    matrix.a = this.a;
    matrix.b = this.b;
    matrix.c = this.c;
    matrix.d = this.d;
    matrix.tx = this.tx;
    matrix.ty = this.ty;
    return matrix;
  }
  copyFrom(matrix) {
    this.a = matrix.a;
    this.b = matrix.b;
    this.c = matrix.c;
    this.d = matrix.d;
    this.tx = matrix.tx;
    this.ty = matrix.ty;
    return this;
  }
  toString() {
    return `[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
  }
  static get IDENTITY() {
    return new Matrix();
  }
  static get TEMP_MATRIX() {
    return new Matrix();
  }
}

const ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
const uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
const vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
const vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];
const rotationCayley = [];
const rotationMatrices = [];
const signum = Math.sign;
function init() {
  for (let i = 0; i < 16; i++) {
    const row = [];
    rotationCayley.push(row);
    for (let j = 0; j < 16; j++) {
      const _ux = signum(ux[i] * ux[j] + vx[i] * uy[j]);
      const _uy = signum(uy[i] * ux[j] + vy[i] * uy[j]);
      const _vx = signum(ux[i] * vx[j] + vx[i] * vy[j]);
      const _vy = signum(uy[i] * vx[j] + vy[i] * vy[j]);
      for (let k = 0; k < 16; k++) {
        if (ux[k] === _ux && uy[k] === _uy && vx[k] === _vx && vy[k] === _vy) {
          row.push(k);
          break;
        }
      }
    }
  }
  for (let i = 0; i < 16; i++) {
    const mat = new Matrix();
    mat.set(ux[i], uy[i], vx[i], vy[i], 0, 0);
    rotationMatrices.push(mat);
  }
}
init();
const groupD8 = {
  E: 0,
  SE: 1,
  S: 2,
  SW: 3,
  W: 4,
  NW: 5,
  N: 6,
  NE: 7,
  MIRROR_VERTICAL: 8,
  MAIN_DIAGONAL: 10,
  MIRROR_HORIZONTAL: 12,
  REVERSE_DIAGONAL: 14,
  uX: (ind) => ux[ind],
  uY: (ind) => uy[ind],
  vX: (ind) => vx[ind],
  vY: (ind) => vy[ind],
  inv: (rotation) => {
    if (rotation & 8) {
      return rotation & 15;
    }
    return -rotation & 7;
  },
  add: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][rotationFirst],
  sub: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][groupD8.inv(rotationFirst)],
  rotate180: (rotation) => rotation ^ 4,
  isVertical: (rotation) => (rotation & 3) === 2,
  byDirection: (dx, dy) => {
    if (Math.abs(dx) * 2 <= Math.abs(dy)) {
      if (dy >= 0) {
        return groupD8.S;
      }
      return groupD8.N;
    } else if (Math.abs(dy) * 2 <= Math.abs(dx)) {
      if (dx > 0) {
        return groupD8.E;
      }
      return groupD8.W;
    } else if (dy > 0) {
      if (dx > 0) {
        return groupD8.SE;
      }
      return groupD8.SW;
    } else if (dx > 0) {
      return groupD8.NE;
    }
    return groupD8.NW;
  },
  matrixAppendRotationInv: (matrix, rotation, tx = 0, ty = 0) => {
    const mat = rotationMatrices[groupD8.inv(rotation)];
    mat.tx = tx;
    mat.ty = ty;
    matrix.append(mat);
  }
};

class ObservablePoint {
  constructor(cb, scope, x = 0, y = 0) {
    this._x = x;
    this._y = y;
    this.cb = cb;
    this.scope = scope;
  }
  clone(cb = this.cb, scope = this.scope) {
    return new ObservablePoint(cb, scope, this._x, this._y);
  }
  set(x = 0, y = x) {
    if (this._x !== x || this._y !== y) {
      this._x = x;
      this._y = y;
      this.cb.call(this.scope);
    }
    return this;
  }
  copyFrom(p) {
    if (this._x !== p.x || this._y !== p.y) {
      this._x = p.x;
      this._y = p.y;
      this.cb.call(this.scope);
    }
    return this;
  }
  copyTo(p) {
    p.set(this._x, this._y);
    return p;
  }
  equals(p) {
    return p.x === this._x && p.y === this._y;
  }
  toString() {
    return `[@pixi/math:ObservablePoint x=${0} y=${0} scope=${this.scope}]`;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    if (this._x !== value) {
      this._x = value;
      this.cb.call(this.scope);
    }
  }
  get y() {
    return this._y;
  }
  set y(value) {
    if (this._y !== value) {
      this._y = value;
      this.cb.call(this.scope);
    }
  }
}

const _Transform = class {
  constructor() {
    this.worldTransform = new Matrix();
    this.localTransform = new Matrix();
    this.position = new ObservablePoint(this.onChange, this, 0, 0);
    this.scale = new ObservablePoint(this.onChange, this, 1, 1);
    this.pivot = new ObservablePoint(this.onChange, this, 0, 0);
    this.skew = new ObservablePoint(this.updateSkew, this, 0, 0);
    this._rotation = 0;
    this._cx = 1;
    this._sx = 0;
    this._cy = 0;
    this._sy = 1;
    this._localID = 0;
    this._currentLocalID = 0;
    this._worldID = 0;
    this._parentID = 0;
  }
  onChange() {
    this._localID++;
  }
  updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew.y);
    this._sx = Math.sin(this._rotation + this.skew.y);
    this._cy = -Math.sin(this._rotation - this.skew.x);
    this._sy = Math.cos(this._rotation - this.skew.x);
    this._localID++;
  }
  toString() {
    return `[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
  }
  updateLocalTransform() {
    const lt = this.localTransform;
    if (this._localID !== this._currentLocalID) {
      lt.a = this._cx * this.scale.x;
      lt.b = this._sx * this.scale.x;
      lt.c = this._cy * this.scale.y;
      lt.d = this._sy * this.scale.y;
      lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
      lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
      this._currentLocalID = this._localID;
      this._parentID = -1;
    }
  }
  updateTransform(parentTransform) {
    const lt = this.localTransform;
    if (this._localID !== this._currentLocalID) {
      lt.a = this._cx * this.scale.x;
      lt.b = this._sx * this.scale.x;
      lt.c = this._cy * this.scale.y;
      lt.d = this._sy * this.scale.y;
      lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
      lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
      this._currentLocalID = this._localID;
      this._parentID = -1;
    }
    if (this._parentID !== parentTransform._worldID) {
      const pt = parentTransform.worldTransform;
      const wt = this.worldTransform;
      wt.a = lt.a * pt.a + lt.b * pt.c;
      wt.b = lt.a * pt.b + lt.b * pt.d;
      wt.c = lt.c * pt.a + lt.d * pt.c;
      wt.d = lt.c * pt.b + lt.d * pt.d;
      wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
      wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
      this._parentID = parentTransform._worldID;
      this._worldID++;
    }
  }
  setFromMatrix(matrix) {
    matrix.decompose(this);
    this._localID++;
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    if (this._rotation !== value) {
      this._rotation = value;
      this.updateSkew();
    }
  }
};
let Transform = _Transform;
Transform.IDENTITY = new _Transform();

var defaultFragment$2 = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}";

var defaultVertex$3 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n";

function compileShader(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

function booleanArray(size) {
  const array = new Array(size);
  for (let i = 0; i < array.length; i++) {
    array[i] = false;
  }
  return array;
}
function defaultValue(type, size) {
  switch (type) {
    case "float":
      return 0;
    case "vec2":
      return new Float32Array(2 * size);
    case "vec3":
      return new Float32Array(3 * size);
    case "vec4":
      return new Float32Array(4 * size);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
      return 0;
    case "ivec2":
      return new Int32Array(2 * size);
    case "ivec3":
      return new Int32Array(3 * size);
    case "ivec4":
      return new Int32Array(4 * size);
    case "uvec2":
      return new Uint32Array(2 * size);
    case "uvec3":
      return new Uint32Array(3 * size);
    case "uvec4":
      return new Uint32Array(4 * size);
    case "bool":
      return false;
    case "bvec2":
      return booleanArray(2 * size);
    case "bvec3":
      return booleanArray(3 * size);
    case "bvec4":
      return booleanArray(4 * size);
    case "mat2":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3":
      return new Float32Array([
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]);
    case "mat4":
      return new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]);
  }
  return null;
}

const uniformParsers = [
  {
    test: (data) => data.type === "float" && data.size === 1 && !data.isArray,
    code: (name) => `
            if(uv["${name}"] !== ud["${name}"].value)
            {
                ud["${name}"].value = uv["${name}"]
                gl.uniform1f(ud["${name}"].location, uv["${name}"])
            }
            `
  },
  {
    test: (data, uniform) => (data.type === "sampler2D" || data.type === "samplerCube" || data.type === "sampler2DArray") && data.size === 1 && !data.isArray && (uniform == null || uniform.castToBaseTexture !== void 0),
    code: (name) => `t = syncData.textureCount++;

            renderer.texture.bind(uv["${name}"], t);

            if(ud["${name}"].value !== t)
            {
                ud["${name}"].value = t;
                gl.uniform1i(ud["${name}"].location, t);
; // eslint-disable-line max-len
            }`
  },
  {
    test: (data, uniform) => data.type === "mat3" && data.size === 1 && !data.isArray && uniform.a !== void 0,
    code: (name) => `
            gl.uniformMatrix3fv(ud["${name}"].location, false, uv["${name}"].toArray(true));
            `,
    codeUbo: (name) => `
                var ${name}_matrix = uv.${name}.toArray(true);

                data[offset] = ${name}_matrix[0];
                data[offset+1] = ${name}_matrix[1];
                data[offset+2] = ${name}_matrix[2];
        
                data[offset + 4] = ${name}_matrix[3];
                data[offset + 5] = ${name}_matrix[4];
                data[offset + 6] = ${name}_matrix[5];
        
                data[offset + 8] = ${name}_matrix[6];
                data[offset + 9] = ${name}_matrix[7];
                data[offset + 10] = ${name}_matrix[8];
            `
  },
  {
    test: (data, uniform) => data.type === "vec2" && data.size === 1 && !data.isArray && uniform.x !== void 0,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${name}"].location, v.x, v.y);
                }`,
    codeUbo: (name) => `
                v = uv.${name};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
  },
  {
    test: (data) => data.type === "vec2" && data.size === 1 && !data.isArray,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${name}"].location, v[0], v[1]);
                }
            `
  },
  {
    test: (data, uniform) => data.type === "vec4" && data.size === 1 && !data.isArray && uniform.width !== void 0,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${name}"].location, v.x, v.y, v.width, v.height)
                }`,
    codeUbo: (name) => `
                    v = uv.${name};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
  },
  {
    test: (data) => data.type === "vec4" && data.size === 1 && !data.isArray,
    code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${name}"].location, v[0], v[1], v[2], v[3])
                }`
  }
];

const GLSL_TO_SINGLE_SETTERS_CACHED = {
  float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
  vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
  vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
  vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
  int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
  uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
  uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
  uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
  bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
  bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  sampler2D: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  samplerCube: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  sampler2DArray: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`
};
const GLSL_TO_ARRAY_SETTERS = {
  float: `gl.uniform1fv(location, v)`,
  vec2: `gl.uniform2fv(location, v)`,
  vec3: `gl.uniform3fv(location, v)`,
  vec4: "gl.uniform4fv(location, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  int: "gl.uniform1iv(location, v)",
  ivec2: "gl.uniform2iv(location, v)",
  ivec3: "gl.uniform3iv(location, v)",
  ivec4: "gl.uniform4iv(location, v)",
  uint: "gl.uniform1uiv(location, v)",
  uvec2: "gl.uniform2uiv(location, v)",
  uvec3: "gl.uniform3uiv(location, v)",
  uvec4: "gl.uniform4uiv(location, v)",
  bool: "gl.uniform1iv(location, v)",
  bvec2: "gl.uniform2iv(location, v)",
  bvec3: "gl.uniform3iv(location, v)",
  bvec4: "gl.uniform4iv(location, v)",
  sampler2D: "gl.uniform1iv(location, v)",
  samplerCube: "gl.uniform1iv(location, v)",
  sampler2DArray: "gl.uniform1iv(location, v)"
};
function generateUniformsSync(group, uniformData) {
  const funcFragments = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (const i in group.uniforms) {
    const data = uniformData[i];
    if (!data) {
      if (group.uniforms[i]?.group) {
        if (group.uniforms[i].ubo) {
          funcFragments.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${i}, '${i}');
                    `);
        } else {
          funcFragments.push(`
                        renderer.shader.syncUniformGroup(uv.${i}, syncData);
                    `);
        }
      }
      continue;
    }
    const uniform = group.uniforms[i];
    let parsed = false;
    for (let j = 0; j < uniformParsers.length; j++) {
      if (uniformParsers[j].test(data, uniform)) {
        funcFragments.push(uniformParsers[j].code(i, uniform));
        parsed = true;
        break;
      }
    }
    if (!parsed) {
      const templateType = data.size === 1 && !data.isArray ? GLSL_TO_SINGLE_SETTERS_CACHED : GLSL_TO_ARRAY_SETTERS;
      const template = templateType[data.type].replace("location", `ud["${i}"].location`);
      funcFragments.push(`
            cu = ud["${i}"];
            cv = cu.value;
            v = uv["${i}"];
            ${template};`);
    }
  }
  return new Function("ud", "uv", "renderer", "syncData", funcFragments.join("\n"));
}

const unknownContext = {};
let context = unknownContext;
function getTestContext() {
  if (context === unknownContext || context?.isContextLost()) {
    const canvas = settings.ADAPTER.createCanvas();
    let gl;
    if (settings.PREFER_ENV >= ENV.WEBGL2) {
      gl = canvas.getContext("webgl2", {});
    }
    if (!gl) {
      gl = canvas.getContext("webgl", {}) || canvas.getContext("experimental-webgl", {});
      if (!gl) {
        gl = null;
      } else {
        gl.getExtension("WEBGL_draw_buffers");
      }
    }
    context = gl;
  }
  return context;
}

let maxFragmentPrecision;
function getMaxFragmentPrecision() {
  if (!maxFragmentPrecision) {
    maxFragmentPrecision = PRECISION.MEDIUM;
    const gl = getTestContext();
    if (gl) {
      if (gl.getShaderPrecisionFormat) {
        const shaderFragment = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
        maxFragmentPrecision = shaderFragment.precision ? PRECISION.HIGH : PRECISION.MEDIUM;
      }
    }
  }
  return maxFragmentPrecision;
}

function logPrettyShaderError(gl, shader) {
  const shaderSrc = gl.getShaderSource(shader).split("\n").map((line, index) => `${index}: ${line}`);
  const shaderLog = gl.getShaderInfoLog(shader);
  const splitShader = shaderLog.split("\n");
  const dedupe = {};
  const lineNumbers = splitShader.map((line) => parseFloat(line.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((n) => {
    if (n && !dedupe[n]) {
      dedupe[n] = true;
      return true;
    }
    return false;
  });
  const logArgs = [""];
  lineNumbers.forEach((number) => {
    shaderSrc[number - 1] = `%c${shaderSrc[number - 1]}%c`;
    logArgs.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  const fragmentSourceToLog = shaderSrc.join("\n");
  logArgs[0] = fragmentSourceToLog;
  console.error(shaderLog);
  console.groupCollapsed("click to view full shader code");
  console.warn(...logArgs);
  console.groupEnd();
}
function logProgramError(gl, program, vertexShader, fragmentShader) {
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      logPrettyShaderError(gl, vertexShader);
    }
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      logPrettyShaderError(gl, fragmentShader);
    }
    console.error("PixiJS Error: Could not initialize shader.");
    if (gl.getProgramInfoLog(program) !== "") {
      console.warn("PixiJS Warning: gl.getProgramInfoLog()", gl.getProgramInfoLog(program));
    }
  }
}

const GLSL_TO_SIZE = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  int: 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  uint: 1,
  uvec2: 2,
  uvec3: 3,
  uvec4: 4,
  bool: 1,
  bvec2: 2,
  bvec3: 3,
  bvec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
  sampler2D: 1
};
function mapSize(type) {
  return GLSL_TO_SIZE[type];
}

let GL_TABLE = null;
const GL_TO_GLSL_TYPES = {
  FLOAT: "float",
  FLOAT_VEC2: "vec2",
  FLOAT_VEC3: "vec3",
  FLOAT_VEC4: "vec4",
  INT: "int",
  INT_VEC2: "ivec2",
  INT_VEC3: "ivec3",
  INT_VEC4: "ivec4",
  UNSIGNED_INT: "uint",
  UNSIGNED_INT_VEC2: "uvec2",
  UNSIGNED_INT_VEC3: "uvec3",
  UNSIGNED_INT_VEC4: "uvec4",
  BOOL: "bool",
  BOOL_VEC2: "bvec2",
  BOOL_VEC3: "bvec3",
  BOOL_VEC4: "bvec4",
  FLOAT_MAT2: "mat2",
  FLOAT_MAT3: "mat3",
  FLOAT_MAT4: "mat4",
  SAMPLER_2D: "sampler2D",
  INT_SAMPLER_2D: "sampler2D",
  UNSIGNED_INT_SAMPLER_2D: "sampler2D",
  SAMPLER_CUBE: "samplerCube",
  INT_SAMPLER_CUBE: "samplerCube",
  UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
  SAMPLER_2D_ARRAY: "sampler2DArray",
  INT_SAMPLER_2D_ARRAY: "sampler2DArray",
  UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function mapType(gl, type) {
  if (!GL_TABLE) {
    const typeNames = Object.keys(GL_TO_GLSL_TYPES);
    GL_TABLE = {};
    for (let i = 0; i < typeNames.length; ++i) {
      const tn = typeNames[i];
      GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
    }
  }
  return GL_TABLE[type];
}

function setPrecision(src, requestedPrecision, maxSupportedPrecision) {
  if (src.substring(0, 9) !== "precision") {
    let precision = requestedPrecision;
    if (requestedPrecision === PRECISION.HIGH && maxSupportedPrecision !== PRECISION.HIGH) {
      precision = PRECISION.MEDIUM;
    }
    return `precision ${precision} float;
${src}`;
  } else if (maxSupportedPrecision !== PRECISION.HIGH && src.substring(0, 15) === "precision highp") {
    return src.replace("precision highp", "precision mediump");
  }
  return src;
}

let unsafeEval;
function unsafeEvalSupported() {
  if (typeof unsafeEval === "boolean") {
    return unsafeEval;
  }
  try {
    const func = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
    unsafeEval = func({ a: "b" }, "a", "b") === true;
  } catch (e) {
    unsafeEval = false;
  }
  return unsafeEval;
}

let UID$2 = 0;
const nameCache = {};
const _Program = class {
  constructor(vertexSrc, fragmentSrc, name = "pixi-shader", extra = {}) {
    this.extra = {};
    this.id = UID$2++;
    this.vertexSrc = vertexSrc || _Program.defaultVertexSrc;
    this.fragmentSrc = fragmentSrc || _Program.defaultFragmentSrc;
    this.vertexSrc = this.vertexSrc.trim();
    this.fragmentSrc = this.fragmentSrc.trim();
    this.extra = extra;
    if (this.vertexSrc.substring(0, 8) !== "#version") {
      name = name.replace(/\s+/g, "-");
      if (nameCache[name]) {
        nameCache[name]++;
        name += `-${nameCache[name]}`;
      } else {
        nameCache[name] = 1;
      }
      this.vertexSrc = `#define SHADER_NAME ${name}
${this.vertexSrc}`;
      this.fragmentSrc = `#define SHADER_NAME ${name}
${this.fragmentSrc}`;
      this.vertexSrc = setPrecision(this.vertexSrc, _Program.defaultVertexPrecision, PRECISION.HIGH);
      this.fragmentSrc = setPrecision(this.fragmentSrc, _Program.defaultFragmentPrecision, getMaxFragmentPrecision());
    }
    this.glPrograms = {};
    this.syncUniforms = null;
  }
  static get defaultVertexSrc() {
    return defaultVertex$3;
  }
  static get defaultFragmentSrc() {
    return defaultFragment$2;
  }
  static from(vertexSrc, fragmentSrc, name) {
    const key = vertexSrc + fragmentSrc;
    let program = ProgramCache[key];
    if (!program) {
      ProgramCache[key] = program = new _Program(vertexSrc, fragmentSrc, name);
    }
    return program;
  }
};
let Program = _Program;
Program.defaultVertexPrecision = PRECISION.HIGH;
Program.defaultFragmentPrecision = isMobile.apple.device ? PRECISION.HIGH : PRECISION.MEDIUM;

let UID$1 = 0;
class UniformGroup {
  constructor(uniforms, isStatic, isUbo) {
    this.group = true;
    this.syncUniforms = {};
    this.dirtyId = 0;
    this.id = UID$1++;
    this.static = !!isStatic;
    this.ubo = !!isUbo;
    if (uniforms instanceof Buffer) {
      this.buffer = uniforms;
      this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER;
      this.autoManage = false;
      this.ubo = true;
    } else {
      this.uniforms = uniforms;
      if (this.ubo) {
        this.buffer = new Buffer(new Float32Array(1));
        this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER;
        this.autoManage = true;
      }
    }
  }
  update() {
    this.dirtyId++;
    if (!this.autoManage && this.buffer) {
      this.buffer.update();
    }
  }
  add(name, uniforms, _static) {
    if (!this.ubo) {
      this.uniforms[name] = new UniformGroup(uniforms, _static);
    } else {
      throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
    }
  }
  static from(uniforms, _static, _ubo) {
    return new UniformGroup(uniforms, _static, _ubo);
  }
  static uboFrom(uniforms, _static) {
    return new UniformGroup(uniforms, _static ?? true, true);
  }
}

class Shader {
  constructor(program, uniforms) {
    this.uniformBindCount = 0;
    this.program = program;
    if (uniforms) {
      if (uniforms instanceof UniformGroup) {
        this.uniformGroup = uniforms;
      } else {
        this.uniformGroup = new UniformGroup(uniforms);
      }
    } else {
      this.uniformGroup = new UniformGroup({});
    }
    this.disposeRunner = new Runner("disposeShader");
  }
  checkUniformExists(name, group) {
    if (group.uniforms[name]) {
      return true;
    }
    for (const i in group.uniforms) {
      const uniform = group.uniforms[i];
      if (uniform.group) {
        if (this.checkUniformExists(name, uniform)) {
          return true;
        }
      }
    }
    return false;
  }
  destroy() {
    this.uniformGroup = null;
    this.disposeRunner.emit(this);
    this.disposeRunner.destroy();
  }
  get uniforms() {
    return this.uniformGroup.uniforms;
  }
  static from(vertexSrc, fragmentSrc, uniforms) {
    const program = Program.from(vertexSrc, fragmentSrc);
    return new Shader(program, uniforms);
  }
}

class BatchShaderGenerator {
  constructor(vertexSrc, fragTemplate) {
    this.vertexSrc = vertexSrc;
    this.fragTemplate = fragTemplate;
    this.programCache = {};
    this.defaultGroupCache = {};
    if (!fragTemplate.includes("%count%")) {
      throw new Error('Fragment template must contain "%count%".');
    }
    if (!fragTemplate.includes("%forloop%")) {
      throw new Error('Fragment template must contain "%forloop%".');
    }
  }
  generateShader(maxTextures) {
    if (!this.programCache[maxTextures]) {
      const sampleValues = new Int32Array(maxTextures);
      for (let i = 0; i < maxTextures; i++) {
        sampleValues[i] = i;
      }
      this.defaultGroupCache[maxTextures] = UniformGroup.from({ uSamplers: sampleValues }, true);
      let fragmentSrc = this.fragTemplate;
      fragmentSrc = fragmentSrc.replace(/%count%/gi, `${maxTextures}`);
      fragmentSrc = fragmentSrc.replace(/%forloop%/gi, this.generateSampleSrc(maxTextures));
      this.programCache[maxTextures] = new Program(this.vertexSrc, fragmentSrc);
    }
    const uniforms = {
      tint: new Float32Array([1, 1, 1, 1]),
      translationMatrix: new Matrix(),
      default: this.defaultGroupCache[maxTextures]
    };
    return new Shader(this.programCache[maxTextures], uniforms);
  }
  generateSampleSrc(maxTextures) {
    let src = "";
    src += "\n";
    src += "\n";
    for (let i = 0; i < maxTextures; i++) {
      if (i > 0) {
        src += "\nelse ";
      }
      if (i < maxTextures - 1) {
        src += `if(vTextureId < ${i}.5)`;
      }
      src += "\n{";
      src += `
	color = texture2D(uSamplers[${i}], vTextureCoord);`;
      src += "\n}";
    }
    src += "\n";
    src += "\n";
    return src;
  }
}

class BatchTextureArray {
  constructor() {
    this.elements = [];
    this.ids = [];
    this.count = 0;
  }
  clear() {
    for (let i = 0; i < this.count; i++) {
      this.elements[i] = null;
    }
    this.count = 0;
  }
}

function canUploadSameBuffer() {
  return !isMobile.apple.device;
}

function maxRecommendedTextures(max) {
  let allowMax = true;
  const navigator = settings.ADAPTER.getNavigator();
  if (isMobile.tablet || isMobile.phone) {
    if (isMobile.apple.device) {
      const match = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
      if (match) {
        const majorVersion = parseInt(match[1], 10);
        if (majorVersion < 11) {
          allowMax = false;
        }
      }
    }
    if (isMobile.android.device) {
      const match = navigator.userAgent.match(/Android\s([0-9.]*)/);
      if (match) {
        const majorVersion = parseInt(match[1], 10);
        if (majorVersion < 7) {
          allowMax = false;
        }
      }
    }
  }
  return allowMax ? max : 4;
}

class ObjectRenderer {
  constructor(renderer) {
    this.renderer = renderer;
  }
  flush() {
  }
  destroy() {
    this.renderer = null;
  }
  start() {
  }
  stop() {
    this.flush();
  }
  render(_object) {
  }
}

var defaultFragment$1 = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n";

var defaultVertex$2 = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n";

const _BatchRenderer = class extends ObjectRenderer {
  constructor(renderer) {
    super(renderer);
    this.setShaderGenerator();
    this.geometryClass = BatchGeometry;
    this.vertexSize = 6;
    this.state = State.for2d();
    this.size = _BatchRenderer.defaultBatchSize * 4;
    this._vertexCount = 0;
    this._indexCount = 0;
    this._bufferedElements = [];
    this._bufferedTextures = [];
    this._bufferSize = 0;
    this._shader = null;
    this._packedGeometries = [];
    this._packedGeometryPoolSize = 2;
    this._flushId = 0;
    this._aBuffers = {};
    this._iBuffers = {};
    this.maxTextures = 1;
    this.renderer.on("prerender", this.onPrerender, this);
    renderer.runners.contextChange.add(this);
    this._dcIndex = 0;
    this._aIndex = 0;
    this._iIndex = 0;
    this._attributeBuffer = null;
    this._indexBuffer = null;
    this._tempBoundTextures = [];
  }
  static get defaultMaxTextures() {
    this._defaultMaxTextures = this._defaultMaxTextures ?? maxRecommendedTextures(32);
    return this._defaultMaxTextures;
  }
  static set defaultMaxTextures(value) {
    this._defaultMaxTextures = value;
  }
  static get canUploadSameBuffer() {
    this._canUploadSameBuffer = this._canUploadSameBuffer ?? canUploadSameBuffer();
    return this._canUploadSameBuffer;
  }
  static set canUploadSameBuffer(value) {
    this._canUploadSameBuffer = value;
  }
  get MAX_TEXTURES() {
    deprecation("7.1.0", "BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures");
    return this.maxTextures;
  }
  static get defaultVertexSrc() {
    return defaultVertex$2;
  }
  static get defaultFragmentTemplate() {
    return defaultFragment$1;
  }
  setShaderGenerator({
    vertex = _BatchRenderer.defaultVertexSrc,
    fragment = _BatchRenderer.defaultFragmentTemplate
  } = {}) {
    this.shaderGenerator = new BatchShaderGenerator(vertex, fragment);
  }
  contextChange() {
    const gl = this.renderer.gl;
    if (settings.PREFER_ENV === ENV.WEBGL_LEGACY) {
      this.maxTextures = 1;
    } else {
      this.maxTextures = Math.min(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), _BatchRenderer.defaultMaxTextures);
      this.maxTextures = checkMaxIfStatementsInShader(this.maxTextures, gl);
    }
    this._shader = this.shaderGenerator.generateShader(this.maxTextures);
    for (let i = 0; i < this._packedGeometryPoolSize; i++) {
      this._packedGeometries[i] = new this.geometryClass();
    }
    this.initFlushBuffers();
  }
  initFlushBuffers() {
    const {
      _drawCallPool,
      _textureArrayPool
    } = _BatchRenderer;
    const MAX_SPRITES = this.size / 4;
    const MAX_TA = Math.floor(MAX_SPRITES / this.maxTextures) + 1;
    while (_drawCallPool.length < MAX_SPRITES) {
      _drawCallPool.push(new BatchDrawCall());
    }
    while (_textureArrayPool.length < MAX_TA) {
      _textureArrayPool.push(new BatchTextureArray());
    }
    for (let i = 0; i < this.maxTextures; i++) {
      this._tempBoundTextures[i] = null;
    }
  }
  onPrerender() {
    this._flushId = 0;
  }
  render(element) {
    if (!element._texture.valid) {
      return;
    }
    if (this._vertexCount + element.vertexData.length / 2 > this.size) {
      this.flush();
    }
    this._vertexCount += element.vertexData.length / 2;
    this._indexCount += element.indices.length;
    this._bufferedTextures[this._bufferSize] = element._texture.baseTexture;
    this._bufferedElements[this._bufferSize++] = element;
  }
  buildTexturesAndDrawCalls() {
    const {
      _bufferedTextures: textures,
      maxTextures
    } = this;
    const textureArrays = _BatchRenderer._textureArrayPool;
    const batch = this.renderer.batch;
    const boundTextures = this._tempBoundTextures;
    const touch = this.renderer.textureGC.count;
    let TICK = ++BaseTexture._globalBatch;
    let countTexArrays = 0;
    let texArray = textureArrays[0];
    let start = 0;
    batch.copyBoundTextures(boundTextures, maxTextures);
    for (let i = 0; i < this._bufferSize; ++i) {
      const tex = textures[i];
      textures[i] = null;
      if (tex._batchEnabled === TICK) {
        continue;
      }
      if (texArray.count >= maxTextures) {
        batch.boundArray(texArray, boundTextures, TICK, maxTextures);
        this.buildDrawCalls(texArray, start, i);
        start = i;
        texArray = textureArrays[++countTexArrays];
        ++TICK;
      }
      tex._batchEnabled = TICK;
      tex.touched = touch;
      texArray.elements[texArray.count++] = tex;
    }
    if (texArray.count > 0) {
      batch.boundArray(texArray, boundTextures, TICK, maxTextures);
      this.buildDrawCalls(texArray, start, this._bufferSize);
      ++countTexArrays;
      ++TICK;
    }
    for (let i = 0; i < boundTextures.length; i++) {
      boundTextures[i] = null;
    }
    BaseTexture._globalBatch = TICK;
  }
  buildDrawCalls(texArray, start, finish) {
    const {
      _bufferedElements: elements,
      _attributeBuffer,
      _indexBuffer,
      vertexSize
    } = this;
    const drawCalls = _BatchRenderer._drawCallPool;
    let dcIndex = this._dcIndex;
    let aIndex = this._aIndex;
    let iIndex = this._iIndex;
    let drawCall = drawCalls[dcIndex];
    drawCall.start = this._iIndex;
    drawCall.texArray = texArray;
    for (let i = start; i < finish; ++i) {
      const sprite = elements[i];
      const tex = sprite._texture.baseTexture;
      const spriteBlendMode = premultiplyBlendMode[tex.alphaMode ? 1 : 0][sprite.blendMode];
      elements[i] = null;
      if (start < i && drawCall.blend !== spriteBlendMode) {
        drawCall.size = iIndex - drawCall.start;
        start = i;
        drawCall = drawCalls[++dcIndex];
        drawCall.texArray = texArray;
        drawCall.start = iIndex;
      }
      this.packInterleavedGeometry(sprite, _attributeBuffer, _indexBuffer, aIndex, iIndex);
      aIndex += sprite.vertexData.length / 2 * vertexSize;
      iIndex += sprite.indices.length;
      drawCall.blend = spriteBlendMode;
    }
    if (start < finish) {
      drawCall.size = iIndex - drawCall.start;
      ++dcIndex;
    }
    this._dcIndex = dcIndex;
    this._aIndex = aIndex;
    this._iIndex = iIndex;
  }
  bindAndClearTexArray(texArray) {
    const textureSystem = this.renderer.texture;
    for (let j = 0; j < texArray.count; j++) {
      textureSystem.bind(texArray.elements[j], texArray.ids[j]);
      texArray.elements[j] = null;
    }
    texArray.count = 0;
  }
  updateGeometry() {
    const {
      _packedGeometries: packedGeometries,
      _attributeBuffer: attributeBuffer,
      _indexBuffer: indexBuffer
    } = this;
    if (!_BatchRenderer.canUploadSameBuffer) {
      if (this._packedGeometryPoolSize <= this._flushId) {
        this._packedGeometryPoolSize++;
        packedGeometries[this._flushId] = new this.geometryClass();
      }
      packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData);
      packedGeometries[this._flushId]._indexBuffer.update(indexBuffer);
      this.renderer.geometry.bind(packedGeometries[this._flushId]);
      this.renderer.geometry.updateBuffers();
      this._flushId++;
    } else {
      packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData);
      packedGeometries[this._flushId]._indexBuffer.update(indexBuffer);
      this.renderer.geometry.updateBuffers();
    }
  }
  drawBatches() {
    const dcCount = this._dcIndex;
    const { gl, state: stateSystem } = this.renderer;
    const drawCalls = _BatchRenderer._drawCallPool;
    let curTexArray = null;
    for (let i = 0; i < dcCount; i++) {
      const { texArray, type, size, start, blend } = drawCalls[i];
      if (curTexArray !== texArray) {
        curTexArray = texArray;
        this.bindAndClearTexArray(texArray);
      }
      this.state.blendMode = blend;
      stateSystem.set(this.state);
      gl.drawElements(type, size, gl.UNSIGNED_SHORT, start * 2);
    }
  }
  flush() {
    if (this._vertexCount === 0) {
      return;
    }
    this._attributeBuffer = this.getAttributeBuffer(this._vertexCount);
    this._indexBuffer = this.getIndexBuffer(this._indexCount);
    this._aIndex = 0;
    this._iIndex = 0;
    this._dcIndex = 0;
    this.buildTexturesAndDrawCalls();
    this.updateGeometry();
    this.drawBatches();
    this._bufferSize = 0;
    this._vertexCount = 0;
    this._indexCount = 0;
  }
  start() {
    this.renderer.state.set(this.state);
    this.renderer.texture.ensureSamplerType(this.maxTextures);
    this.renderer.shader.bind(this._shader);
    if (_BatchRenderer.canUploadSameBuffer) {
      this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
    }
  }
  stop() {
    this.flush();
  }
  destroy() {
    for (let i = 0; i < this._packedGeometryPoolSize; i++) {
      if (this._packedGeometries[i]) {
        this._packedGeometries[i].destroy();
      }
    }
    this.renderer.off("prerender", this.onPrerender, this);
    this._aBuffers = null;
    this._iBuffers = null;
    this._packedGeometries = null;
    this._attributeBuffer = null;
    this._indexBuffer = null;
    if (this._shader) {
      this._shader.destroy();
      this._shader = null;
    }
    super.destroy();
  }
  getAttributeBuffer(size) {
    const roundedP2 = nextPow2(Math.ceil(size / 8));
    const roundedSizeIndex = log2(roundedP2);
    const roundedSize = roundedP2 * 8;
    if (this._aBuffers.length <= roundedSizeIndex) {
      this._iBuffers.length = roundedSizeIndex + 1;
    }
    let buffer = this._aBuffers[roundedSize];
    if (!buffer) {
      this._aBuffers[roundedSize] = buffer = new ViewableBuffer(roundedSize * this.vertexSize * 4);
    }
    return buffer;
  }
  getIndexBuffer(size) {
    const roundedP2 = nextPow2(Math.ceil(size / 12));
    const roundedSizeIndex = log2(roundedP2);
    const roundedSize = roundedP2 * 12;
    if (this._iBuffers.length <= roundedSizeIndex) {
      this._iBuffers.length = roundedSizeIndex + 1;
    }
    let buffer = this._iBuffers[roundedSizeIndex];
    if (!buffer) {
      this._iBuffers[roundedSizeIndex] = buffer = new Uint16Array(roundedSize);
    }
    return buffer;
  }
  packInterleavedGeometry(element, attributeBuffer, indexBuffer, aIndex, iIndex) {
    const {
      uint32View,
      float32View
    } = attributeBuffer;
    const packedVertices = aIndex / this.vertexSize;
    const uvs = element.uvs;
    const indicies = element.indices;
    const vertexData = element.vertexData;
    const textureId = element._texture.baseTexture._batchLocation;
    const alpha = Math.min(element.worldAlpha, 1);
    const argb = alpha < 1 && element._texture.baseTexture.alphaMode ? premultiplyTint(element._tintRGB, alpha) : element._tintRGB + (alpha * 255 << 24);
    for (let i = 0; i < vertexData.length; i += 2) {
      float32View[aIndex++] = vertexData[i];
      float32View[aIndex++] = vertexData[i + 1];
      float32View[aIndex++] = uvs[i];
      float32View[aIndex++] = uvs[i + 1];
      uint32View[aIndex++] = argb;
      float32View[aIndex++] = textureId;
    }
    for (let i = 0; i < indicies.length; i++) {
      indexBuffer[iIndex++] = packedVertices + indicies[i];
    }
  }
};
let BatchRenderer = _BatchRenderer;
BatchRenderer.defaultBatchSize = 4096;
BatchRenderer.extension = {
  name: "batch",
  type: ExtensionType.RendererPlugin
};
BatchRenderer._drawCallPool = [];
BatchRenderer._textureArrayPool = [];
extensions$1.add(BatchRenderer);

var defaultFragment = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n";

var defaultVertex$1 = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";

const _Filter = class extends Shader {
  constructor(vertexSrc, fragmentSrc, uniforms) {
    const program = Program.from(vertexSrc || _Filter.defaultVertexSrc, fragmentSrc || _Filter.defaultFragmentSrc);
    super(program, uniforms);
    this.padding = 0;
    this.resolution = _Filter.defaultResolution;
    this.multisample = _Filter.defaultMultisample;
    this.enabled = true;
    this.autoFit = true;
    this.state = new State();
  }
  apply(filterManager, input, output, clearMode, _currentState) {
    filterManager.applyFilter(this, input, output, clearMode);
  }
  get blendMode() {
    return this.state.blendMode;
  }
  set blendMode(value) {
    this.state.blendMode = value;
  }
  get resolution() {
    return this._resolution;
  }
  set resolution(value) {
    this._resolution = value;
  }
  static get defaultVertexSrc() {
    return defaultVertex$1;
  }
  static get defaultFragmentSrc() {
    return defaultFragment;
  }
};
let Filter = _Filter;
Filter.defaultResolution = 1;
Filter.defaultMultisample = MSAA_QUALITY.NONE;

class BackgroundSystem {
  constructor() {
    this.clearBeforeRender = true;
    this._backgroundColor = 0;
    this._backgroundColorRgba = [0, 0, 0, 1];
    this._backgroundColorString = "#000000";
    this.color = this._backgroundColor;
    this.alpha = 1;
  }
  init(options) {
    this.clearBeforeRender = options.clearBeforeRender;
    if (options.color) {
      this.color = typeof options.color === "string" ? string2hex(options.color) : options.color;
    }
    this.alpha = options.alpha;
  }
  get color() {
    return this._backgroundColor;
  }
  set color(value) {
    this._backgroundColor = value;
    this._backgroundColorString = hex2string(value);
    hex2rgb(value, this._backgroundColorRgba);
  }
  get alpha() {
    return this._backgroundColorRgba[3];
  }
  set alpha(value) {
    this._backgroundColorRgba[3] = value;
  }
  get colorRgba() {
    return this._backgroundColorRgba;
  }
  get colorString() {
    return this._backgroundColorString;
  }
  destroy() {
  }
}
BackgroundSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "background"
};
extensions$1.add(BackgroundSystem);

class BatchSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.emptyRenderer = new ObjectRenderer(renderer);
    this.currentRenderer = this.emptyRenderer;
  }
  setObjectRenderer(objectRenderer) {
    if (this.currentRenderer === objectRenderer) {
      return;
    }
    this.currentRenderer.stop();
    this.currentRenderer = objectRenderer;
    this.currentRenderer.start();
  }
  flush() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  reset() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  copyBoundTextures(arr, maxTextures) {
    const { boundTextures } = this.renderer.texture;
    for (let i = maxTextures - 1; i >= 0; --i) {
      arr[i] = boundTextures[i] || null;
      if (arr[i]) {
        arr[i]._batchLocation = i;
      }
    }
  }
  boundArray(texArray, boundTextures, batchId, maxTextures) {
    const { elements, ids, count } = texArray;
    let j = 0;
    for (let i = 0; i < count; i++) {
      const tex = elements[i];
      const loc = tex._batchLocation;
      if (loc >= 0 && loc < maxTextures && boundTextures[loc] === tex) {
        ids[i] = loc;
        continue;
      }
      while (j < maxTextures) {
        const bound = boundTextures[j];
        if (bound && bound._batchEnabled === batchId && bound._batchLocation === j) {
          j++;
          continue;
        }
        ids[i] = j;
        tex._batchLocation = j;
        boundTextures[j] = tex;
        break;
      }
    }
  }
  destroy() {
    this.renderer = null;
  }
}
BatchSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "batch"
};
extensions$1.add(BatchSystem);

let CONTEXT_UID_COUNTER = 0;
class ContextSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.webGLVersion = 1;
    this.extensions = {};
    this.supports = {
      uint32Indices: false
    };
    this.handleContextLost = this.handleContextLost.bind(this);
    this.handleContextRestored = this.handleContextRestored.bind(this);
  }
  get isLost() {
    return !this.gl || this.gl.isContextLost();
  }
  contextChange(gl) {
    this.gl = gl;
    this.renderer.gl = gl;
    this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
  }
  init(options) {
    if (options.context) {
      this.initFromContext(options.context);
    } else {
      const alpha = this.renderer.background.alpha < 1;
      const premultipliedAlpha = options.premultipliedAlpha;
      this.preserveDrawingBuffer = options.preserveDrawingBuffer;
      this.useContextAlpha = options.useContextAlpha;
      this.powerPreference = options.powerPreference;
      this.initFromOptions({
        alpha,
        premultipliedAlpha,
        antialias: options.antialias,
        stencil: true,
        preserveDrawingBuffer: options.preserveDrawingBuffer,
        powerPreference: options.powerPreference
      });
    }
  }
  initFromContext(gl) {
    this.gl = gl;
    this.validateContext(gl);
    this.renderer.gl = gl;
    this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
    this.renderer.runners.contextChange.emit(gl);
    const view = this.renderer.view;
    if (view.addEventListener !== void 0) {
      view.addEventListener("webglcontextlost", this.handleContextLost, false);
      view.addEventListener("webglcontextrestored", this.handleContextRestored, false);
    }
  }
  initFromOptions(options) {
    const gl = this.createContext(this.renderer.view, options);
    this.initFromContext(gl);
  }
  createContext(canvas, options) {
    let gl;
    if (settings.PREFER_ENV >= ENV.WEBGL2) {
      gl = canvas.getContext("webgl2", options);
    }
    if (gl) {
      this.webGLVersion = 2;
    } else {
      this.webGLVersion = 1;
      gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
      if (!gl) {
        throw new Error("This browser does not support WebGL. Try using the canvas renderer");
      }
    }
    this.gl = gl;
    this.getExtensions();
    return this.gl;
  }
  getExtensions() {
    const { gl } = this;
    const common = {
      loseContext: gl.getExtension("WEBGL_lose_context"),
      anisotropicFiltering: gl.getExtension("EXT_texture_filter_anisotropic"),
      floatTextureLinear: gl.getExtension("OES_texture_float_linear"),
      s3tc: gl.getExtension("WEBGL_compressed_texture_s3tc"),
      s3tc_sRGB: gl.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
      etc: gl.getExtension("WEBGL_compressed_texture_etc"),
      etc1: gl.getExtension("WEBGL_compressed_texture_etc1"),
      pvrtc: gl.getExtension("WEBGL_compressed_texture_pvrtc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
      atc: gl.getExtension("WEBGL_compressed_texture_atc"),
      astc: gl.getExtension("WEBGL_compressed_texture_astc")
    };
    if (this.webGLVersion === 1) {
      Object.assign(this.extensions, common, {
        drawBuffers: gl.getExtension("WEBGL_draw_buffers"),
        depthTexture: gl.getExtension("WEBGL_depth_texture"),
        vertexArrayObject: gl.getExtension("OES_vertex_array_object") || gl.getExtension("MOZ_OES_vertex_array_object") || gl.getExtension("WEBKIT_OES_vertex_array_object"),
        uint32ElementIndex: gl.getExtension("OES_element_index_uint"),
        floatTexture: gl.getExtension("OES_texture_float"),
        floatTextureLinear: gl.getExtension("OES_texture_float_linear"),
        textureHalfFloat: gl.getExtension("OES_texture_half_float"),
        textureHalfFloatLinear: gl.getExtension("OES_texture_half_float_linear")
      });
    } else if (this.webGLVersion === 2) {
      Object.assign(this.extensions, common, {
        colorBufferFloat: gl.getExtension("EXT_color_buffer_float")
      });
    }
  }
  handleContextLost(event) {
    event.preventDefault();
    setTimeout(() => {
      if (this.gl.isContextLost() && this.extensions.loseContext) {
        this.extensions.loseContext.restoreContext();
      }
    }, 0);
  }
  handleContextRestored() {
    this.renderer.runners.contextChange.emit(this.gl);
  }
  destroy() {
    const view = this.renderer.view;
    this.renderer = null;
    if (view.removeEventListener !== void 0) {
      view.removeEventListener("webglcontextlost", this.handleContextLost);
      view.removeEventListener("webglcontextrestored", this.handleContextRestored);
    }
    this.gl.useProgram(null);
    if (this.extensions.loseContext) {
      this.extensions.loseContext.loseContext();
    }
  }
  postrender() {
    if (this.renderer.objectRenderer.renderingToScreen) {
      this.gl.flush();
    }
  }
  validateContext(gl) {
    const attributes = gl.getContextAttributes();
    const isWebGl2 = "WebGL2RenderingContext" in globalThis && gl instanceof globalThis.WebGL2RenderingContext;
    if (isWebGl2) {
      this.webGLVersion = 2;
    }
    if (attributes && !attributes.stencil) {
      console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
    }
    const hasuint32 = isWebGl2 || !!gl.getExtension("OES_element_index_uint");
    this.supports.uint32Indices = hasuint32;
    if (!hasuint32) {
      console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
    }
  }
}
ContextSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "context"
};
extensions$1.add(ContextSystem);

class DepthResource extends BufferResource {
  upload(renderer, baseTexture, glTexture) {
    const gl = renderer.gl;
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
    const width = baseTexture.realWidth;
    const height = baseTexture.realHeight;
    if (glTexture.width === width && glTexture.height === height) {
      gl.texSubImage2D(baseTexture.target, 0, 0, 0, width, height, baseTexture.format, glTexture.type, this.data);
    } else {
      glTexture.width = width;
      glTexture.height = height;
      gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, width, height, 0, baseTexture.format, glTexture.type, this.data);
    }
    return true;
  }
}

class Framebuffer {
  constructor(width, height) {
    this.width = Math.round(width || 100);
    this.height = Math.round(height || 100);
    this.stencil = false;
    this.depth = false;
    this.dirtyId = 0;
    this.dirtyFormat = 0;
    this.dirtySize = 0;
    this.depthTexture = null;
    this.colorTextures = [];
    this.glFramebuffers = {};
    this.disposeRunner = new Runner("disposeFramebuffer");
    this.multisample = MSAA_QUALITY.NONE;
  }
  get colorTexture() {
    return this.colorTextures[0];
  }
  addColorTexture(index = 0, texture) {
    this.colorTextures[index] = texture || new BaseTexture(null, {
      scaleMode: SCALE_MODES.NEAREST,
      resolution: 1,
      mipmap: MIPMAP_MODES.OFF,
      width: this.width,
      height: this.height
    });
    this.dirtyId++;
    this.dirtyFormat++;
    return this;
  }
  addDepthTexture(texture) {
    this.depthTexture = texture || new BaseTexture(new DepthResource(null, { width: this.width, height: this.height }), {
      scaleMode: SCALE_MODES.NEAREST,
      resolution: 1,
      width: this.width,
      height: this.height,
      mipmap: MIPMAP_MODES.OFF,
      format: FORMATS.DEPTH_COMPONENT,
      type: TYPES.UNSIGNED_SHORT
    });
    this.dirtyId++;
    this.dirtyFormat++;
    return this;
  }
  enableDepth() {
    this.depth = true;
    this.dirtyId++;
    this.dirtyFormat++;
    return this;
  }
  enableStencil() {
    this.stencil = true;
    this.dirtyId++;
    this.dirtyFormat++;
    return this;
  }
  resize(width, height) {
    width = Math.round(width);
    height = Math.round(height);
    if (width === this.width && height === this.height)
      return;
    this.width = width;
    this.height = height;
    this.dirtyId++;
    this.dirtySize++;
    for (let i = 0; i < this.colorTextures.length; i++) {
      const texture = this.colorTextures[i];
      const resolution = texture.resolution;
      texture.setSize(width / resolution, height / resolution);
    }
    if (this.depthTexture) {
      const resolution = this.depthTexture.resolution;
      this.depthTexture.setSize(width / resolution, height / resolution);
    }
  }
  dispose() {
    this.disposeRunner.emit(this, false);
  }
  destroyDepthTexture() {
    if (this.depthTexture) {
      this.depthTexture.destroy();
      this.depthTexture = null;
      ++this.dirtyId;
      ++this.dirtyFormat;
    }
  }
}

class BaseRenderTexture extends BaseTexture {
  constructor(options = {}) {
    if (typeof options === "number") {
      const width = arguments[0];
      const height = arguments[1];
      const scaleMode = arguments[2];
      const resolution = arguments[3];
      options = { width, height, scaleMode, resolution };
    }
    options.width = options.width || 100;
    options.height = options.height || 100;
    options.multisample ?? (options.multisample = MSAA_QUALITY.NONE);
    super(null, options);
    this.mipmap = MIPMAP_MODES.OFF;
    this.valid = true;
    this.clearColor = [0, 0, 0, 0];
    this.framebuffer = new Framebuffer(this.realWidth, this.realHeight).addColorTexture(0, this);
    this.framebuffer.multisample = options.multisample;
    this.maskStack = [];
    this.filterStack = [{}];
  }
  resize(desiredWidth, desiredHeight) {
    this.framebuffer.resize(desiredWidth * this.resolution, desiredHeight * this.resolution);
    this.setRealSize(this.framebuffer.width, this.framebuffer.height);
  }
  dispose() {
    this.framebuffer.dispose();
    super.dispose();
  }
  destroy() {
    super.destroy();
    this.framebuffer.destroyDepthTexture();
    this.framebuffer = null;
  }
}

class BaseImageResource extends Resource {
  constructor(source) {
    const sourceAny = source;
    const width = sourceAny.naturalWidth || sourceAny.videoWidth || sourceAny.width;
    const height = sourceAny.naturalHeight || sourceAny.videoHeight || sourceAny.height;
    super(width, height);
    this.source = source;
    this.noSubImage = false;
  }
  static crossOrigin(element, url, crossorigin) {
    if (crossorigin === void 0 && !url.startsWith("data:")) {
      element.crossOrigin = determineCrossOrigin(url);
    } else if (crossorigin !== false) {
      element.crossOrigin = typeof crossorigin === "string" ? crossorigin : "anonymous";
    }
  }
  upload(renderer, baseTexture, glTexture, source) {
    const gl = renderer.gl;
    const width = baseTexture.realWidth;
    const height = baseTexture.realHeight;
    source = source || this.source;
    if (typeof HTMLImageElement !== "undefined" && source instanceof HTMLImageElement) {
      if (!source.complete || source.naturalWidth === 0) {
        return false;
      }
    } else if (typeof HTMLVideoElement !== "undefined" && source instanceof HTMLVideoElement) {
      if (source.readyState <= 1 && source.buffered.length === 0) {
        return false;
      }
    }
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
    if (!this.noSubImage && baseTexture.target === gl.TEXTURE_2D && glTexture.width === width && glTexture.height === height) {
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, baseTexture.format, glTexture.type, source);
    } else {
      glTexture.width = width;
      glTexture.height = height;
      gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, baseTexture.format, glTexture.type, source);
    }
    return true;
  }
  update() {
    if (this.destroyed) {
      return;
    }
    const source = this.source;
    const width = source.naturalWidth || source.videoWidth || source.width;
    const height = source.naturalHeight || source.videoHeight || source.height;
    this.resize(width, height);
    super.update();
  }
  dispose() {
    this.source = null;
  }
}

class ImageResource extends BaseImageResource {
  constructor(source, options) {
    options = options || {};
    if (typeof source === "string") {
      const imageElement = new Image();
      BaseImageResource.crossOrigin(imageElement, source, options.crossorigin);
      imageElement.src = source;
      source = imageElement;
    }
    super(source);
    if (!source.complete && !!this._width && !!this._height) {
      this._width = 0;
      this._height = 0;
    }
    this.url = source.src;
    this._process = null;
    this.preserveBitmap = false;
    this.createBitmap = (options.createBitmap ?? settings.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap;
    this.alphaMode = typeof options.alphaMode === "number" ? options.alphaMode : null;
    this.bitmap = null;
    this._load = null;
    if (options.autoLoad !== false) {
      this.load();
    }
  }
  load(createBitmap) {
    if (this._load) {
      return this._load;
    }
    if (createBitmap !== void 0) {
      this.createBitmap = createBitmap;
    }
    this._load = new Promise((resolve, reject) => {
      const source = this.source;
      this.url = source.src;
      const completed = () => {
        if (this.destroyed) {
          return;
        }
        source.onload = null;
        source.onerror = null;
        this.resize(source.width, source.height);
        this._load = null;
        if (this.createBitmap) {
          resolve(this.process());
        } else {
          resolve(this);
        }
      };
      if (source.complete && source.src) {
        completed();
      } else {
        source.onload = completed;
        source.onerror = (event) => {
          reject(event);
          this.onError.emit(event);
        };
      }
    });
    return this._load;
  }
  process() {
    const source = this.source;
    if (this._process !== null) {
      return this._process;
    }
    if (this.bitmap !== null || !globalThis.createImageBitmap) {
      return Promise.resolve(this);
    }
    const createImageBitmap = globalThis.createImageBitmap;
    const cors = !source.crossOrigin || source.crossOrigin === "anonymous";
    this._process = fetch(source.src, {
      mode: cors ? "cors" : "no-cors"
    }).then((r) => r.blob()).then((blob) => createImageBitmap(blob, 0, 0, source.width, source.height, {
      premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
    })).then((bitmap) => {
      if (this.destroyed) {
        return Promise.reject();
      }
      this.bitmap = bitmap;
      this.update();
      this._process = null;
      return Promise.resolve(this);
    });
    return this._process;
  }
  upload(renderer, baseTexture, glTexture) {
    if (typeof this.alphaMode === "number") {
      baseTexture.alphaMode = this.alphaMode;
    }
    if (!this.createBitmap) {
      return super.upload(renderer, baseTexture, glTexture);
    }
    if (!this.bitmap) {
      this.process();
      if (!this.bitmap) {
        return false;
      }
    }
    super.upload(renderer, baseTexture, glTexture, this.bitmap);
    if (!this.preserveBitmap) {
      let flag = true;
      const glTextures = baseTexture._glTextures;
      for (const key in glTextures) {
        const otherTex = glTextures[key];
        if (otherTex !== glTexture && otherTex.dirtyId !== baseTexture.dirtyId) {
          flag = false;
          break;
        }
      }
      if (flag) {
        if (this.bitmap.close) {
          this.bitmap.close();
        }
        this.bitmap = null;
      }
    }
    return true;
  }
  dispose() {
    this.source.onload = null;
    this.source.onerror = null;
    super.dispose();
    if (this.bitmap) {
      this.bitmap.close();
      this.bitmap = null;
    }
    this._process = null;
    this._load = null;
  }
  static test(source) {
    return typeof HTMLImageElement !== "undefined" && (typeof source === "string" || source instanceof HTMLImageElement);
  }
}

class TextureUvs {
  constructor() {
    this.x0 = 0;
    this.y0 = 0;
    this.x1 = 1;
    this.y1 = 0;
    this.x2 = 1;
    this.y2 = 1;
    this.x3 = 0;
    this.y3 = 1;
    this.uvsFloat32 = new Float32Array(8);
  }
  set(frame, baseFrame, rotate) {
    const tw = baseFrame.width;
    const th = baseFrame.height;
    if (rotate) {
      const w2 = frame.width / 2 / tw;
      const h2 = frame.height / 2 / th;
      const cX = frame.x / tw + w2;
      const cY = frame.y / th + h2;
      rotate = groupD8.add(rotate, groupD8.NW);
      this.x0 = cX + w2 * groupD8.uX(rotate);
      this.y0 = cY + h2 * groupD8.uY(rotate);
      rotate = groupD8.add(rotate, 2);
      this.x1 = cX + w2 * groupD8.uX(rotate);
      this.y1 = cY + h2 * groupD8.uY(rotate);
      rotate = groupD8.add(rotate, 2);
      this.x2 = cX + w2 * groupD8.uX(rotate);
      this.y2 = cY + h2 * groupD8.uY(rotate);
      rotate = groupD8.add(rotate, 2);
      this.x3 = cX + w2 * groupD8.uX(rotate);
      this.y3 = cY + h2 * groupD8.uY(rotate);
    } else {
      this.x0 = frame.x / tw;
      this.y0 = frame.y / th;
      this.x1 = (frame.x + frame.width) / tw;
      this.y1 = frame.y / th;
      this.x2 = (frame.x + frame.width) / tw;
      this.y2 = (frame.y + frame.height) / th;
      this.x3 = frame.x / tw;
      this.y3 = (frame.y + frame.height) / th;
    }
    this.uvsFloat32[0] = this.x0;
    this.uvsFloat32[1] = this.y0;
    this.uvsFloat32[2] = this.x1;
    this.uvsFloat32[3] = this.y1;
    this.uvsFloat32[4] = this.x2;
    this.uvsFloat32[5] = this.y2;
    this.uvsFloat32[6] = this.x3;
    this.uvsFloat32[7] = this.y3;
  }
  toString() {
    return `[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`;
  }
}

const DEFAULT_UVS = new TextureUvs();
function removeAllHandlers(tex) {
  tex.destroy = function _emptyDestroy() {
  };
  tex.on = function _emptyOn() {
  };
  tex.once = function _emptyOnce() {
  };
  tex.emit = function _emptyEmit() {
  };
}
class Texture extends eventemitter3 {
  constructor(baseTexture, frame, orig, trim, rotate, anchor) {
    super();
    this.noFrame = false;
    if (!frame) {
      this.noFrame = true;
      frame = new Rectangle(0, 0, 1, 1);
    }
    if (baseTexture instanceof Texture) {
      baseTexture = baseTexture.baseTexture;
    }
    this.baseTexture = baseTexture;
    this._frame = frame;
    this.trim = trim;
    this.valid = false;
    this._uvs = DEFAULT_UVS;
    this.uvMatrix = null;
    this.orig = orig || frame;
    this._rotate = Number(rotate || 0);
    if (rotate === true) {
      this._rotate = 2;
    } else if (this._rotate % 2 !== 0) {
      throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
    }
    this.defaultAnchor = anchor ? new Point(anchor.x, anchor.y) : new Point(0, 0);
    this._updateID = 0;
    this.textureCacheIds = [];
    if (!baseTexture.valid) {
      baseTexture.once("loaded", this.onBaseTextureUpdated, this);
    } else if (this.noFrame) {
      if (baseTexture.valid) {
        this.onBaseTextureUpdated(baseTexture);
      }
    } else {
      this.frame = frame;
    }
    if (this.noFrame) {
      baseTexture.on("update", this.onBaseTextureUpdated, this);
    }
  }
  update() {
    if (this.baseTexture.resource) {
      this.baseTexture.resource.update();
    }
  }
  onBaseTextureUpdated(baseTexture) {
    if (this.noFrame) {
      if (!this.baseTexture.valid) {
        return;
      }
      this._frame.width = baseTexture.width;
      this._frame.height = baseTexture.height;
      this.valid = true;
      this.updateUvs();
    } else {
      this.frame = this._frame;
    }
    this.emit("update", this);
  }
  destroy(destroyBase) {
    if (this.baseTexture) {
      if (destroyBase) {
        const { resource } = this.baseTexture;
        if (resource?.url && TextureCache[resource.url]) {
          Texture.removeFromCache(resource.url);
        }
        this.baseTexture.destroy();
      }
      this.baseTexture.off("loaded", this.onBaseTextureUpdated, this);
      this.baseTexture.off("update", this.onBaseTextureUpdated, this);
      this.baseTexture = null;
    }
    this._frame = null;
    this._uvs = null;
    this.trim = null;
    this.orig = null;
    this.valid = false;
    Texture.removeFromCache(this);
    this.textureCacheIds = null;
  }
  clone() {
    const clonedFrame = this._frame.clone();
    const clonedOrig = this._frame === this.orig ? clonedFrame : this.orig.clone();
    const clonedTexture = new Texture(this.baseTexture, !this.noFrame && clonedFrame, clonedOrig, this.trim?.clone(), this.rotate, this.defaultAnchor);
    if (this.noFrame) {
      clonedTexture._frame = clonedFrame;
    }
    return clonedTexture;
  }
  updateUvs() {
    if (this._uvs === DEFAULT_UVS) {
      this._uvs = new TextureUvs();
    }
    this._uvs.set(this._frame, this.baseTexture, this.rotate);
    this._updateID++;
  }
  static from(source, options = {}, strict = settings.STRICT_TEXTURE_CACHE) {
    const isFrame = typeof source === "string";
    let cacheId = null;
    if (isFrame) {
      cacheId = source;
    } else if (source instanceof BaseTexture) {
      if (!source.cacheId) {
        const prefix = options?.pixiIdPrefix || "pixiid";
        source.cacheId = `${prefix}-${uid()}`;
        BaseTexture.addToCache(source, source.cacheId);
      }
      cacheId = source.cacheId;
    } else {
      if (!source._pixiId) {
        const prefix = options?.pixiIdPrefix || "pixiid";
        source._pixiId = `${prefix}_${uid()}`;
      }
      cacheId = source._pixiId;
    }
    let texture = TextureCache[cacheId];
    if (isFrame && strict && !texture) {
      throw new Error(`The cacheId "${cacheId}" does not exist in TextureCache.`);
    }
    if (!texture && !(source instanceof BaseTexture)) {
      if (!options.resolution) {
        options.resolution = getResolutionOfUrl(source);
      }
      texture = new Texture(new BaseTexture(source, options));
      texture.baseTexture.cacheId = cacheId;
      BaseTexture.addToCache(texture.baseTexture, cacheId);
      Texture.addToCache(texture, cacheId);
    } else if (!texture && source instanceof BaseTexture) {
      texture = new Texture(source);
      Texture.addToCache(texture, cacheId);
    }
    return texture;
  }
  static fromURL(url, options) {
    const resourceOptions = Object.assign({ autoLoad: false }, options?.resourceOptions);
    const texture = Texture.from(url, Object.assign({ resourceOptions }, options), false);
    const resource = texture.baseTexture.resource;
    if (texture.baseTexture.valid) {
      return Promise.resolve(texture);
    }
    return resource.load().then(() => Promise.resolve(texture));
  }
  static fromBuffer(buffer, width, height, options) {
    return new Texture(BaseTexture.fromBuffer(buffer, width, height, options));
  }
  static fromLoader(source, imageUrl, name, options) {
    const baseTexture = new BaseTexture(source, Object.assign({
      scaleMode: BaseTexture.defaultOptions.scaleMode,
      resolution: getResolutionOfUrl(imageUrl)
    }, options));
    const { resource } = baseTexture;
    if (resource instanceof ImageResource) {
      resource.url = imageUrl;
    }
    const texture = new Texture(baseTexture);
    if (!name) {
      name = imageUrl;
    }
    BaseTexture.addToCache(texture.baseTexture, name);
    Texture.addToCache(texture, name);
    if (name !== imageUrl) {
      BaseTexture.addToCache(texture.baseTexture, imageUrl);
      Texture.addToCache(texture, imageUrl);
    }
    if (texture.baseTexture.valid) {
      return Promise.resolve(texture);
    }
    return new Promise((resolve) => {
      texture.baseTexture.once("loaded", () => resolve(texture));
    });
  }
  static addToCache(texture, id) {
    if (id) {
      if (!texture.textureCacheIds.includes(id)) {
        texture.textureCacheIds.push(id);
      }
      if (TextureCache[id] && TextureCache[id] !== texture) {
        console.warn(`Texture added to the cache with an id [${id}] that already had an entry`);
      }
      TextureCache[id] = texture;
    }
  }
  static removeFromCache(texture) {
    if (typeof texture === "string") {
      const textureFromCache = TextureCache[texture];
      if (textureFromCache) {
        const index = textureFromCache.textureCacheIds.indexOf(texture);
        if (index > -1) {
          textureFromCache.textureCacheIds.splice(index, 1);
        }
        delete TextureCache[texture];
        return textureFromCache;
      }
    } else if (texture?.textureCacheIds) {
      for (let i = 0; i < texture.textureCacheIds.length; ++i) {
        if (TextureCache[texture.textureCacheIds[i]] === texture) {
          delete TextureCache[texture.textureCacheIds[i]];
        }
      }
      texture.textureCacheIds.length = 0;
      return texture;
    }
    return null;
  }
  get resolution() {
    return this.baseTexture.resolution;
  }
  get frame() {
    return this._frame;
  }
  set frame(frame) {
    this._frame = frame;
    this.noFrame = false;
    const { x, y, width, height } = frame;
    const xNotFit = x + width > this.baseTexture.width;
    const yNotFit = y + height > this.baseTexture.height;
    if (xNotFit || yNotFit) {
      const relationship = xNotFit && yNotFit ? "and" : "or";
      const errorX = `X: ${x} + ${width} = ${x + width} > ${this.baseTexture.width}`;
      const errorY = `Y: ${y} + ${height} = ${y + height} > ${this.baseTexture.height}`;
      throw new Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${errorX} ${relationship} ${errorY}`);
    }
    this.valid = width && height && this.baseTexture.valid;
    if (!this.trim && !this.rotate) {
      this.orig = frame;
    }
    if (this.valid) {
      this.updateUvs();
    }
  }
  get rotate() {
    return this._rotate;
  }
  set rotate(rotate) {
    this._rotate = rotate;
    if (this.valid) {
      this.updateUvs();
    }
  }
  get width() {
    return this.orig.width;
  }
  get height() {
    return this.orig.height;
  }
  castToBaseTexture() {
    return this.baseTexture;
  }
  static get EMPTY() {
    if (!Texture._EMPTY) {
      Texture._EMPTY = new Texture(new BaseTexture());
      removeAllHandlers(Texture._EMPTY);
      removeAllHandlers(Texture._EMPTY.baseTexture);
    }
    return Texture._EMPTY;
  }
  static get WHITE() {
    if (!Texture._WHITE) {
      const canvas = settings.ADAPTER.createCanvas(16, 16);
      const context = canvas.getContext("2d");
      canvas.width = 16;
      canvas.height = 16;
      context.fillStyle = "white";
      context.fillRect(0, 0, 16, 16);
      Texture._WHITE = new Texture(BaseTexture.from(canvas));
      removeAllHandlers(Texture._WHITE);
      removeAllHandlers(Texture._WHITE.baseTexture);
    }
    return Texture._WHITE;
  }
}

class RenderTexture extends Texture {
  constructor(baseRenderTexture, frame) {
    super(baseRenderTexture, frame);
    this.valid = true;
    this.filterFrame = null;
    this.filterPoolKey = null;
    this.updateUvs();
  }
  get framebuffer() {
    return this.baseTexture.framebuffer;
  }
  get multisample() {
    return this.framebuffer.multisample;
  }
  set multisample(value) {
    this.framebuffer.multisample = value;
  }
  resize(desiredWidth, desiredHeight, resizeBaseTexture = true) {
    const resolution = this.baseTexture.resolution;
    const width = Math.round(desiredWidth * resolution) / resolution;
    const height = Math.round(desiredHeight * resolution) / resolution;
    this.valid = width > 0 && height > 0;
    this._frame.width = this.orig.width = width;
    this._frame.height = this.orig.height = height;
    if (resizeBaseTexture) {
      this.baseTexture.resize(width, height);
    }
    this.updateUvs();
  }
  setResolution(resolution) {
    const { baseTexture } = this;
    if (baseTexture.resolution === resolution) {
      return;
    }
    baseTexture.setResolution(resolution);
    this.resize(baseTexture.width, baseTexture.height, false);
  }
  static create(options) {
    return new RenderTexture(new BaseRenderTexture(options));
  }
}

class RenderTexturePool {
  constructor(textureOptions) {
    this.texturePool = {};
    this.textureOptions = textureOptions || {};
    this.enableFullScreen = false;
    this._pixelsWidth = 0;
    this._pixelsHeight = 0;
  }
  createTexture(realWidth, realHeight, multisample = MSAA_QUALITY.NONE) {
    const baseRenderTexture = new BaseRenderTexture(Object.assign({
      width: realWidth,
      height: realHeight,
      resolution: 1,
      multisample
    }, this.textureOptions));
    return new RenderTexture(baseRenderTexture);
  }
  getOptimalTexture(minWidth, minHeight, resolution = 1, multisample = MSAA_QUALITY.NONE) {
    let key;
    minWidth = Math.ceil(minWidth * resolution - 1e-6);
    minHeight = Math.ceil(minHeight * resolution - 1e-6);
    if (!this.enableFullScreen || minWidth !== this._pixelsWidth || minHeight !== this._pixelsHeight) {
      minWidth = nextPow2(minWidth);
      minHeight = nextPow2(minHeight);
      key = ((minWidth & 65535) << 16 | minHeight & 65535) >>> 0;
      if (multisample > 1) {
        key += multisample * 4294967296;
      }
    } else {
      key = multisample > 1 ? -multisample : -1;
    }
    if (!this.texturePool[key]) {
      this.texturePool[key] = [];
    }
    let renderTexture = this.texturePool[key].pop();
    if (!renderTexture) {
      renderTexture = this.createTexture(minWidth, minHeight, multisample);
    }
    renderTexture.filterPoolKey = key;
    renderTexture.setResolution(resolution);
    return renderTexture;
  }
  getFilterTexture(input, resolution, multisample) {
    const filterTexture = this.getOptimalTexture(input.width, input.height, resolution || input.resolution, multisample || MSAA_QUALITY.NONE);
    filterTexture.filterFrame = input.filterFrame;
    return filterTexture;
  }
  returnTexture(renderTexture) {
    const key = renderTexture.filterPoolKey;
    renderTexture.filterFrame = null;
    this.texturePool[key].push(renderTexture);
  }
  returnFilterTexture(renderTexture) {
    this.returnTexture(renderTexture);
  }
  clear(destroyTextures) {
    destroyTextures = destroyTextures !== false;
    if (destroyTextures) {
      for (const i in this.texturePool) {
        const textures = this.texturePool[i];
        if (textures) {
          for (let j = 0; j < textures.length; j++) {
            textures[j].destroy(true);
          }
        }
      }
    }
    this.texturePool = {};
  }
  setScreenSize(size) {
    if (size.width === this._pixelsWidth && size.height === this._pixelsHeight) {
      return;
    }
    this.enableFullScreen = size.width > 0 && size.height > 0;
    for (const i in this.texturePool) {
      if (!(Number(i) < 0)) {
        continue;
      }
      const textures = this.texturePool[i];
      if (textures) {
        for (let j = 0; j < textures.length; j++) {
          textures[j].destroy(true);
        }
      }
      this.texturePool[i] = [];
    }
    this._pixelsWidth = size.width;
    this._pixelsHeight = size.height;
  }
}
RenderTexturePool.SCREEN_KEY = -1;

class Quad extends Geometry {
  constructor() {
    super();
    this.addAttribute("aVertexPosition", new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ])).addIndex([0, 1, 3, 2]);
  }
}

class QuadUv extends Geometry {
  constructor() {
    super();
    this.vertices = new Float32Array([
      -1,
      -1,
      1,
      -1,
      1,
      1,
      -1,
      1
    ]);
    this.uvs = new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ]);
    this.vertexBuffer = new Buffer(this.vertices);
    this.uvBuffer = new Buffer(this.uvs);
    this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]);
  }
  map(targetTextureFrame, destinationFrame) {
    let x = 0;
    let y = 0;
    this.uvs[0] = x;
    this.uvs[1] = y;
    this.uvs[2] = x + destinationFrame.width / targetTextureFrame.width;
    this.uvs[3] = y;
    this.uvs[4] = x + destinationFrame.width / targetTextureFrame.width;
    this.uvs[5] = y + destinationFrame.height / targetTextureFrame.height;
    this.uvs[6] = x;
    this.uvs[7] = y + destinationFrame.height / targetTextureFrame.height;
    x = destinationFrame.x;
    y = destinationFrame.y;
    this.vertices[0] = x;
    this.vertices[1] = y;
    this.vertices[2] = x + destinationFrame.width;
    this.vertices[3] = y;
    this.vertices[4] = x + destinationFrame.width;
    this.vertices[5] = y + destinationFrame.height;
    this.vertices[6] = x;
    this.vertices[7] = y + destinationFrame.height;
    this.invalidate();
    return this;
  }
  invalidate() {
    this.vertexBuffer._updateID++;
    this.uvBuffer._updateID++;
    return this;
  }
}

class FilterState {
  constructor() {
    this.renderTexture = null;
    this.target = null;
    this.legacy = false;
    this.resolution = 1;
    this.multisample = MSAA_QUALITY.NONE;
    this.sourceFrame = new Rectangle();
    this.destinationFrame = new Rectangle();
    this.bindingSourceFrame = new Rectangle();
    this.bindingDestinationFrame = new Rectangle();
    this.filters = [];
    this.transform = null;
  }
  clear() {
    this.target = null;
    this.filters = null;
    this.renderTexture = null;
  }
}

const tempPoints = [new Point(), new Point(), new Point(), new Point()];
const tempMatrix$2 = new Matrix();
class FilterSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.defaultFilterStack = [{}];
    this.texturePool = new RenderTexturePool();
    this.statePool = [];
    this.quad = new Quad();
    this.quadUv = new QuadUv();
    this.tempRect = new Rectangle();
    this.activeState = {};
    this.globalUniforms = new UniformGroup({
      outputFrame: new Rectangle(),
      inputSize: new Float32Array(4),
      inputPixel: new Float32Array(4),
      inputClamp: new Float32Array(4),
      resolution: 1,
      filterArea: new Float32Array(4),
      filterClamp: new Float32Array(4)
    }, true);
    this.forceClear = false;
    this.useMaxPadding = false;
  }
  init() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  push(target, filters) {
    const renderer = this.renderer;
    const filterStack = this.defaultFilterStack;
    const state = this.statePool.pop() || new FilterState();
    const renderTextureSystem = this.renderer.renderTexture;
    let resolution = filters[0].resolution;
    let multisample = filters[0].multisample;
    let padding = filters[0].padding;
    let autoFit = filters[0].autoFit;
    let legacy = filters[0].legacy ?? true;
    for (let i = 1; i < filters.length; i++) {
      const filter = filters[i];
      resolution = Math.min(resolution, filter.resolution);
      multisample = Math.min(multisample, filter.multisample);
      padding = this.useMaxPadding ? Math.max(padding, filter.padding) : padding + filter.padding;
      autoFit = autoFit && filter.autoFit;
      legacy = legacy || (filter.legacy ?? true);
    }
    if (filterStack.length === 1) {
      this.defaultFilterStack[0].renderTexture = renderTextureSystem.current;
    }
    filterStack.push(state);
    state.resolution = resolution;
    state.multisample = multisample;
    state.legacy = legacy;
    state.target = target;
    state.sourceFrame.copyFrom(target.filterArea || target.getBounds(true));
    state.sourceFrame.pad(padding);
    const sourceFrameProjected = this.tempRect.copyFrom(renderTextureSystem.sourceFrame);
    if (renderer.projection.transform) {
      this.transformAABB(tempMatrix$2.copyFrom(renderer.projection.transform).invert(), sourceFrameProjected);
    }
    if (autoFit) {
      state.sourceFrame.fit(sourceFrameProjected);
      if (state.sourceFrame.width <= 0 || state.sourceFrame.height <= 0) {
        state.sourceFrame.width = 0;
        state.sourceFrame.height = 0;
      }
    } else if (!state.sourceFrame.intersects(sourceFrameProjected)) {
      state.sourceFrame.width = 0;
      state.sourceFrame.height = 0;
    }
    this.roundFrame(state.sourceFrame, renderTextureSystem.current ? renderTextureSystem.current.resolution : renderer.resolution, renderTextureSystem.sourceFrame, renderTextureSystem.destinationFrame, renderer.projection.transform);
    state.renderTexture = this.getOptimalFilterTexture(state.sourceFrame.width, state.sourceFrame.height, resolution, multisample);
    state.filters = filters;
    state.destinationFrame.width = state.renderTexture.width;
    state.destinationFrame.height = state.renderTexture.height;
    const destinationFrame = this.tempRect;
    destinationFrame.x = 0;
    destinationFrame.y = 0;
    destinationFrame.width = state.sourceFrame.width;
    destinationFrame.height = state.sourceFrame.height;
    state.renderTexture.filterFrame = state.sourceFrame;
    state.bindingSourceFrame.copyFrom(renderTextureSystem.sourceFrame);
    state.bindingDestinationFrame.copyFrom(renderTextureSystem.destinationFrame);
    state.transform = renderer.projection.transform;
    renderer.projection.transform = null;
    renderTextureSystem.bind(state.renderTexture, state.sourceFrame, destinationFrame);
    renderer.framebuffer.clear(0, 0, 0, 0);
  }
  pop() {
    const filterStack = this.defaultFilterStack;
    const state = filterStack.pop();
    const filters = state.filters;
    this.activeState = state;
    const globalUniforms = this.globalUniforms.uniforms;
    globalUniforms.outputFrame = state.sourceFrame;
    globalUniforms.resolution = state.resolution;
    const inputSize = globalUniforms.inputSize;
    const inputPixel = globalUniforms.inputPixel;
    const inputClamp = globalUniforms.inputClamp;
    inputSize[0] = state.destinationFrame.width;
    inputSize[1] = state.destinationFrame.height;
    inputSize[2] = 1 / inputSize[0];
    inputSize[3] = 1 / inputSize[1];
    inputPixel[0] = Math.round(inputSize[0] * state.resolution);
    inputPixel[1] = Math.round(inputSize[1] * state.resolution);
    inputPixel[2] = 1 / inputPixel[0];
    inputPixel[3] = 1 / inputPixel[1];
    inputClamp[0] = 0.5 * inputPixel[2];
    inputClamp[1] = 0.5 * inputPixel[3];
    inputClamp[2] = state.sourceFrame.width * inputSize[2] - 0.5 * inputPixel[2];
    inputClamp[3] = state.sourceFrame.height * inputSize[3] - 0.5 * inputPixel[3];
    if (state.legacy) {
      const filterArea = globalUniforms.filterArea;
      filterArea[0] = state.destinationFrame.width;
      filterArea[1] = state.destinationFrame.height;
      filterArea[2] = state.sourceFrame.x;
      filterArea[3] = state.sourceFrame.y;
      globalUniforms.filterClamp = globalUniforms.inputClamp;
    }
    this.globalUniforms.update();
    const lastState = filterStack[filterStack.length - 1];
    this.renderer.framebuffer.blit();
    if (filters.length === 1) {
      filters[0].apply(this, state.renderTexture, lastState.renderTexture, CLEAR_MODES.BLEND, state);
      this.returnFilterTexture(state.renderTexture);
    } else {
      let flip = state.renderTexture;
      let flop = this.getOptimalFilterTexture(flip.width, flip.height, state.resolution);
      flop.filterFrame = flip.filterFrame;
      let i = 0;
      for (i = 0; i < filters.length - 1; ++i) {
        if (i === 1 && state.multisample > 1) {
          flop = this.getOptimalFilterTexture(flip.width, flip.height, state.resolution);
          flop.filterFrame = flip.filterFrame;
        }
        filters[i].apply(this, flip, flop, CLEAR_MODES.CLEAR, state);
        const t = flip;
        flip = flop;
        flop = t;
      }
      filters[i].apply(this, flip, lastState.renderTexture, CLEAR_MODES.BLEND, state);
      if (i > 1 && state.multisample > 1) {
        this.returnFilterTexture(state.renderTexture);
      }
      this.returnFilterTexture(flip);
      this.returnFilterTexture(flop);
    }
    state.clear();
    this.statePool.push(state);
  }
  bindAndClear(filterTexture, clearMode = CLEAR_MODES.CLEAR) {
    const {
      renderTexture: renderTextureSystem,
      state: stateSystem
    } = this.renderer;
    if (filterTexture === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture) {
      this.renderer.projection.transform = this.activeState.transform;
    } else {
      this.renderer.projection.transform = null;
    }
    if (filterTexture?.filterFrame) {
      const destinationFrame = this.tempRect;
      destinationFrame.x = 0;
      destinationFrame.y = 0;
      destinationFrame.width = filterTexture.filterFrame.width;
      destinationFrame.height = filterTexture.filterFrame.height;
      renderTextureSystem.bind(filterTexture, filterTexture.filterFrame, destinationFrame);
    } else if (filterTexture !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture) {
      renderTextureSystem.bind(filterTexture);
    } else {
      this.renderer.renderTexture.bind(filterTexture, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
    }
    const autoClear = stateSystem.stateId & 1 || this.forceClear;
    if (clearMode === CLEAR_MODES.CLEAR || clearMode === CLEAR_MODES.BLIT && autoClear) {
      this.renderer.framebuffer.clear(0, 0, 0, 0);
    }
  }
  applyFilter(filter, input, output, clearMode) {
    const renderer = this.renderer;
    renderer.state.set(filter.state);
    this.bindAndClear(output, clearMode);
    filter.uniforms.uSampler = input;
    filter.uniforms.filterGlobals = this.globalUniforms;
    renderer.shader.bind(filter);
    filter.legacy = !!filter.program.attributeData.aTextureCoord;
    if (filter.legacy) {
      this.quadUv.map(input._frame, input.filterFrame);
      renderer.geometry.bind(this.quadUv);
      renderer.geometry.draw(DRAW_MODES.TRIANGLES);
    } else {
      renderer.geometry.bind(this.quad);
      renderer.geometry.draw(DRAW_MODES.TRIANGLE_STRIP);
    }
  }
  calculateSpriteMatrix(outputMatrix, sprite) {
    const { sourceFrame, destinationFrame } = this.activeState;
    const { orig } = sprite._texture;
    const mappedMatrix = outputMatrix.set(destinationFrame.width, 0, 0, destinationFrame.height, sourceFrame.x, sourceFrame.y);
    const worldTransform = sprite.worldTransform.copyTo(Matrix.TEMP_MATRIX);
    worldTransform.invert();
    mappedMatrix.prepend(worldTransform);
    mappedMatrix.scale(1 / orig.width, 1 / orig.height);
    mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y);
    return mappedMatrix;
  }
  destroy() {
    this.renderer = null;
    this.texturePool.clear(false);
  }
  getOptimalFilterTexture(minWidth, minHeight, resolution = 1, multisample = MSAA_QUALITY.NONE) {
    return this.texturePool.getOptimalTexture(minWidth, minHeight, resolution, multisample);
  }
  getFilterTexture(input, resolution, multisample) {
    if (typeof input === "number") {
      const swap = input;
      input = resolution;
      resolution = swap;
    }
    input = input || this.activeState.renderTexture;
    const filterTexture = this.texturePool.getOptimalTexture(input.width, input.height, resolution || input.resolution, multisample || MSAA_QUALITY.NONE);
    filterTexture.filterFrame = input.filterFrame;
    return filterTexture;
  }
  returnFilterTexture(renderTexture) {
    this.texturePool.returnTexture(renderTexture);
  }
  emptyPool() {
    this.texturePool.clear(true);
  }
  resize() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  transformAABB(matrix, rect) {
    const lt = tempPoints[0];
    const lb = tempPoints[1];
    const rt = tempPoints[2];
    const rb = tempPoints[3];
    lt.set(rect.left, rect.top);
    lb.set(rect.left, rect.bottom);
    rt.set(rect.right, rect.top);
    rb.set(rect.right, rect.bottom);
    matrix.apply(lt, lt);
    matrix.apply(lb, lb);
    matrix.apply(rt, rt);
    matrix.apply(rb, rb);
    const x0 = Math.min(lt.x, lb.x, rt.x, rb.x);
    const y0 = Math.min(lt.y, lb.y, rt.y, rb.y);
    const x1 = Math.max(lt.x, lb.x, rt.x, rb.x);
    const y1 = Math.max(lt.y, lb.y, rt.y, rb.y);
    rect.x = x0;
    rect.y = y0;
    rect.width = x1 - x0;
    rect.height = y1 - y0;
  }
  roundFrame(frame, resolution, bindingSourceFrame, bindingDestinationFrame, transform) {
    if (frame.width <= 0 || frame.height <= 0 || bindingSourceFrame.width <= 0 || bindingSourceFrame.height <= 0) {
      return;
    }
    if (transform) {
      const { a, b, c, d } = transform;
      if ((Math.abs(b) > 1e-4 || Math.abs(c) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(d) > 1e-4)) {
        return;
      }
    }
    transform = transform ? tempMatrix$2.copyFrom(transform) : tempMatrix$2.identity();
    transform.translate(-bindingSourceFrame.x, -bindingSourceFrame.y).scale(bindingDestinationFrame.width / bindingSourceFrame.width, bindingDestinationFrame.height / bindingSourceFrame.height).translate(bindingDestinationFrame.x, bindingDestinationFrame.y);
    this.transformAABB(transform, frame);
    frame.ceil(resolution);
    this.transformAABB(transform.invert(), frame);
  }
}
FilterSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "filter"
};
extensions$1.add(FilterSystem);

class GLFramebuffer {
  constructor(framebuffer) {
    this.framebuffer = framebuffer;
    this.stencil = null;
    this.dirtyId = -1;
    this.dirtyFormat = -1;
    this.dirtySize = -1;
    this.multisample = MSAA_QUALITY.NONE;
    this.msaaBuffer = null;
    this.blitFramebuffer = null;
    this.mipLevel = 0;
  }
}

const tempRectangle = new Rectangle();
class FramebufferSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.managedFramebuffers = [];
    this.unknownFramebuffer = new Framebuffer(10, 10);
    this.msaaSamples = null;
  }
  contextChange() {
    this.disposeAll(true);
    const gl = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    this.current = this.unknownFramebuffer;
    this.viewport = new Rectangle();
    this.hasMRT = true;
    this.writeDepthTexture = true;
    if (this.renderer.context.webGLVersion === 1) {
      let nativeDrawBuffersExtension = this.renderer.context.extensions.drawBuffers;
      let nativeDepthTextureExtension = this.renderer.context.extensions.depthTexture;
      if (settings.PREFER_ENV === ENV.WEBGL_LEGACY) {
        nativeDrawBuffersExtension = null;
        nativeDepthTextureExtension = null;
      }
      if (nativeDrawBuffersExtension) {
        gl.drawBuffers = (activeTextures) => nativeDrawBuffersExtension.drawBuffersWEBGL(activeTextures);
      } else {
        this.hasMRT = false;
        gl.drawBuffers = () => {
        };
      }
      if (!nativeDepthTextureExtension) {
        this.writeDepthTexture = false;
      }
    } else {
      this.msaaSamples = gl.getInternalformatParameter(gl.RENDERBUFFER, gl.RGBA8, gl.SAMPLES);
    }
  }
  bind(framebuffer, frame, mipLevel = 0) {
    const { gl } = this;
    if (framebuffer) {
      const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(framebuffer);
      if (this.current !== framebuffer) {
        this.current = framebuffer;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer);
      }
      if (fbo.mipLevel !== mipLevel) {
        framebuffer.dirtyId++;
        framebuffer.dirtyFormat++;
        fbo.mipLevel = mipLevel;
      }
      if (fbo.dirtyId !== framebuffer.dirtyId) {
        fbo.dirtyId = framebuffer.dirtyId;
        if (fbo.dirtyFormat !== framebuffer.dirtyFormat) {
          fbo.dirtyFormat = framebuffer.dirtyFormat;
          fbo.dirtySize = framebuffer.dirtySize;
          this.updateFramebuffer(framebuffer, mipLevel);
        } else if (fbo.dirtySize !== framebuffer.dirtySize) {
          fbo.dirtySize = framebuffer.dirtySize;
          this.resizeFramebuffer(framebuffer);
        }
      }
      for (let i = 0; i < framebuffer.colorTextures.length; i++) {
        const tex = framebuffer.colorTextures[i];
        this.renderer.texture.unbind(tex.parentTextureArray || tex);
      }
      if (framebuffer.depthTexture) {
        this.renderer.texture.unbind(framebuffer.depthTexture);
      }
      if (frame) {
        const mipWidth = frame.width >> mipLevel;
        const mipHeight = frame.height >> mipLevel;
        const scale = mipWidth / frame.width;
        this.setViewport(frame.x * scale, frame.y * scale, mipWidth, mipHeight);
      } else {
        const mipWidth = framebuffer.width >> mipLevel;
        const mipHeight = framebuffer.height >> mipLevel;
        this.setViewport(0, 0, mipWidth, mipHeight);
      }
    } else {
      if (this.current) {
        this.current = null;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      if (frame) {
        this.setViewport(frame.x, frame.y, frame.width, frame.height);
      } else {
        this.setViewport(0, 0, this.renderer.width, this.renderer.height);
      }
    }
  }
  setViewport(x, y, width, height) {
    const v = this.viewport;
    x = Math.round(x);
    y = Math.round(y);
    width = Math.round(width);
    height = Math.round(height);
    if (v.width !== width || v.height !== height || v.x !== x || v.y !== y) {
      v.x = x;
      v.y = y;
      v.width = width;
      v.height = height;
      this.gl.viewport(x, y, width, height);
    }
  }
  get size() {
    if (this.current) {
      return { x: 0, y: 0, width: this.current.width, height: this.current.height };
    }
    return { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
  }
  clear(r, g, b, a, mask = BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH) {
    const { gl } = this;
    gl.clearColor(r, g, b, a);
    gl.clear(mask);
  }
  initFramebuffer(framebuffer) {
    const { gl } = this;
    const fbo = new GLFramebuffer(gl.createFramebuffer());
    fbo.multisample = this.detectSamples(framebuffer.multisample);
    framebuffer.glFramebuffers[this.CONTEXT_UID] = fbo;
    this.managedFramebuffers.push(framebuffer);
    framebuffer.disposeRunner.add(this);
    return fbo;
  }
  resizeFramebuffer(framebuffer) {
    const { gl } = this;
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    if (fbo.stencil) {
      gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil);
      if (fbo.msaaBuffer) {
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.DEPTH24_STENCIL8, framebuffer.width, framebuffer.height);
      } else {
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, framebuffer.width, framebuffer.height);
      }
    }
    const colorTextures = framebuffer.colorTextures;
    let count = colorTextures.length;
    if (!gl.drawBuffers) {
      count = Math.min(count, 1);
    }
    for (let i = 0; i < count; i++) {
      const texture = colorTextures[i];
      const parentTexture = texture.parentTextureArray || texture;
      this.renderer.texture.bind(parentTexture, 0);
      if (i === 0 && fbo.msaaBuffer) {
        gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.msaaBuffer);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, parentTexture._glTextures[this.CONTEXT_UID].internalFormat, framebuffer.width, framebuffer.height);
      }
    }
    if (framebuffer.depthTexture && this.writeDepthTexture) {
      this.renderer.texture.bind(framebuffer.depthTexture, 0);
    }
  }
  updateFramebuffer(framebuffer, mipLevel) {
    const { gl } = this;
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    const colorTextures = framebuffer.colorTextures;
    let count = colorTextures.length;
    if (!gl.drawBuffers) {
      count = Math.min(count, 1);
    }
    if (fbo.multisample > 1 && this.canMultisampleFramebuffer(framebuffer)) {
      fbo.msaaBuffer = fbo.msaaBuffer || gl.createRenderbuffer();
    } else if (fbo.msaaBuffer) {
      gl.deleteRenderbuffer(fbo.msaaBuffer);
      fbo.msaaBuffer = null;
      if (fbo.blitFramebuffer) {
        fbo.blitFramebuffer.dispose();
        fbo.blitFramebuffer = null;
      }
    }
    const activeTextures = [];
    for (let i = 0; i < count; i++) {
      const texture = colorTextures[i];
      const parentTexture = texture.parentTextureArray || texture;
      this.renderer.texture.bind(parentTexture, 0);
      if (i === 0 && fbo.msaaBuffer) {
        gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.msaaBuffer);
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, parentTexture._glTextures[this.CONTEXT_UID].internalFormat, framebuffer.width, framebuffer.height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, fbo.msaaBuffer);
      } else {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, texture.target, parentTexture._glTextures[this.CONTEXT_UID].texture, mipLevel);
        activeTextures.push(gl.COLOR_ATTACHMENT0 + i);
      }
    }
    if (activeTextures.length > 1) {
      gl.drawBuffers(activeTextures);
    }
    if (framebuffer.depthTexture) {
      const writeDepthTexture = this.writeDepthTexture;
      if (writeDepthTexture) {
        const depthTexture = framebuffer.depthTexture;
        this.renderer.texture.bind(depthTexture, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture._glTextures[this.CONTEXT_UID].texture, mipLevel);
      }
    }
    if ((framebuffer.stencil || framebuffer.depth) && !(framebuffer.depthTexture && this.writeDepthTexture)) {
      fbo.stencil = fbo.stencil || gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil);
      if (fbo.msaaBuffer) {
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.DEPTH24_STENCIL8, framebuffer.width, framebuffer.height);
      } else {
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, framebuffer.width, framebuffer.height);
      }
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, fbo.stencil);
    } else if (fbo.stencil) {
      gl.deleteRenderbuffer(fbo.stencil);
      fbo.stencil = null;
    }
  }
  canMultisampleFramebuffer(framebuffer) {
    return this.renderer.context.webGLVersion !== 1 && framebuffer.colorTextures.length <= 1 && !framebuffer.depthTexture;
  }
  detectSamples(samples) {
    const { msaaSamples } = this;
    let res = MSAA_QUALITY.NONE;
    if (samples <= 1 || msaaSamples === null) {
      return res;
    }
    for (let i = 0; i < msaaSamples.length; i++) {
      if (msaaSamples[i] <= samples) {
        res = msaaSamples[i];
        break;
      }
    }
    if (res === 1) {
      res = MSAA_QUALITY.NONE;
    }
    return res;
  }
  blit(framebuffer, sourcePixels, destPixels) {
    const { current, renderer, gl, CONTEXT_UID } = this;
    if (renderer.context.webGLVersion !== 2) {
      return;
    }
    if (!current) {
      return;
    }
    const fbo = current.glFramebuffers[CONTEXT_UID];
    if (!fbo) {
      return;
    }
    if (!framebuffer) {
      if (!fbo.msaaBuffer) {
        return;
      }
      const colorTexture = current.colorTextures[0];
      if (!colorTexture) {
        return;
      }
      if (!fbo.blitFramebuffer) {
        fbo.blitFramebuffer = new Framebuffer(current.width, current.height);
        fbo.blitFramebuffer.addColorTexture(0, colorTexture);
      }
      framebuffer = fbo.blitFramebuffer;
      if (framebuffer.colorTextures[0] !== colorTexture) {
        framebuffer.colorTextures[0] = colorTexture;
        framebuffer.dirtyId++;
        framebuffer.dirtyFormat++;
      }
      if (framebuffer.width !== current.width || framebuffer.height !== current.height) {
        framebuffer.width = current.width;
        framebuffer.height = current.height;
        framebuffer.dirtyId++;
        framebuffer.dirtySize++;
      }
    }
    if (!sourcePixels) {
      sourcePixels = tempRectangle;
      sourcePixels.width = current.width;
      sourcePixels.height = current.height;
    }
    if (!destPixels) {
      destPixels = sourcePixels;
    }
    const sameSize = sourcePixels.width === destPixels.width && sourcePixels.height === destPixels.height;
    this.bind(framebuffer);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fbo.framebuffer);
    gl.blitFramebuffer(sourcePixels.left, sourcePixels.top, sourcePixels.right, sourcePixels.bottom, destPixels.left, destPixels.top, destPixels.right, destPixels.bottom, gl.COLOR_BUFFER_BIT, sameSize ? gl.NEAREST : gl.LINEAR);
  }
  disposeFramebuffer(framebuffer, contextLost) {
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    const gl = this.gl;
    if (!fbo) {
      return;
    }
    delete framebuffer.glFramebuffers[this.CONTEXT_UID];
    const index = this.managedFramebuffers.indexOf(framebuffer);
    if (index >= 0) {
      this.managedFramebuffers.splice(index, 1);
    }
    framebuffer.disposeRunner.remove(this);
    if (!contextLost) {
      gl.deleteFramebuffer(fbo.framebuffer);
      if (fbo.msaaBuffer) {
        gl.deleteRenderbuffer(fbo.msaaBuffer);
      }
      if (fbo.stencil) {
        gl.deleteRenderbuffer(fbo.stencil);
      }
    }
    if (fbo.blitFramebuffer) {
      fbo.blitFramebuffer.dispose();
    }
  }
  disposeAll(contextLost) {
    const list = this.managedFramebuffers;
    this.managedFramebuffers = [];
    for (let i = 0; i < list.length; i++) {
      this.disposeFramebuffer(list[i], contextLost);
    }
  }
  forceStencil() {
    const framebuffer = this.current;
    if (!framebuffer) {
      return;
    }
    const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
    if (!fbo || fbo.stencil) {
      return;
    }
    framebuffer.stencil = true;
    const w = framebuffer.width;
    const h = framebuffer.height;
    const gl = this.gl;
    const stencil = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, stencil);
    if (fbo.msaaBuffer) {
      gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.DEPTH24_STENCIL8, w, h);
    } else {
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, w, h);
    }
    fbo.stencil = stencil;
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, stencil);
  }
  reset() {
    this.current = this.unknownFramebuffer;
    this.viewport = new Rectangle();
  }
  destroy() {
    this.renderer = null;
  }
}
FramebufferSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "framebuffer"
};
extensions$1.add(FramebufferSystem);

const byteSizeMap = { 5126: 4, 5123: 2, 5121: 1 };
class GeometrySystem {
  constructor(renderer) {
    this.renderer = renderer;
    this._activeGeometry = null;
    this._activeVao = null;
    this.hasVao = true;
    this.hasInstance = true;
    this.canUseUInt32ElementIndex = false;
    this.managedGeometries = {};
  }
  contextChange() {
    this.disposeAll(true);
    const gl = this.gl = this.renderer.gl;
    const context = this.renderer.context;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    if (context.webGLVersion !== 2) {
      let nativeVaoExtension = this.renderer.context.extensions.vertexArrayObject;
      if (settings.PREFER_ENV === ENV.WEBGL_LEGACY) {
        nativeVaoExtension = null;
      }
      if (nativeVaoExtension) {
        gl.createVertexArray = () => nativeVaoExtension.createVertexArrayOES();
        gl.bindVertexArray = (vao) => nativeVaoExtension.bindVertexArrayOES(vao);
        gl.deleteVertexArray = (vao) => nativeVaoExtension.deleteVertexArrayOES(vao);
      } else {
        this.hasVao = false;
        gl.createVertexArray = () => null;
        gl.bindVertexArray = () => null;
        gl.deleteVertexArray = () => null;
      }
    }
    if (context.webGLVersion !== 2) {
      const instanceExt = gl.getExtension("ANGLE_instanced_arrays");
      if (instanceExt) {
        gl.vertexAttribDivisor = (a, b) => instanceExt.vertexAttribDivisorANGLE(a, b);
        gl.drawElementsInstanced = (a, b, c, d, e) => instanceExt.drawElementsInstancedANGLE(a, b, c, d, e);
        gl.drawArraysInstanced = (a, b, c, d) => instanceExt.drawArraysInstancedANGLE(a, b, c, d);
      } else {
        this.hasInstance = false;
      }
    }
    this.canUseUInt32ElementIndex = context.webGLVersion === 2 || !!context.extensions.uint32ElementIndex;
  }
  bind(geometry, shader) {
    shader = shader || this.renderer.shader.shader;
    const { gl } = this;
    let vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID];
    let incRefCount = false;
    if (!vaos) {
      this.managedGeometries[geometry.id] = geometry;
      geometry.disposeRunner.add(this);
      geometry.glVertexArrayObjects[this.CONTEXT_UID] = vaos = {};
      incRefCount = true;
    }
    const vao = vaos[shader.program.id] || this.initGeometryVao(geometry, shader, incRefCount);
    this._activeGeometry = geometry;
    if (this._activeVao !== vao) {
      this._activeVao = vao;
      if (this.hasVao) {
        gl.bindVertexArray(vao);
      } else {
        this.activateVao(geometry, shader.program);
      }
    }
    this.updateBuffers();
  }
  reset() {
    this.unbind();
  }
  updateBuffers() {
    const geometry = this._activeGeometry;
    const bufferSystem = this.renderer.buffer;
    for (let i = 0; i < geometry.buffers.length; i++) {
      const buffer = geometry.buffers[i];
      bufferSystem.update(buffer);
    }
  }
  checkCompatibility(geometry, program) {
    const geometryAttributes = geometry.attributes;
    const shaderAttributes = program.attributeData;
    for (const j in shaderAttributes) {
      if (!geometryAttributes[j]) {
        throw new Error(`shader and geometry incompatible, geometry missing the "${j}" attribute`);
      }
    }
  }
  getSignature(geometry, program) {
    const attribs = geometry.attributes;
    const shaderAttributes = program.attributeData;
    const strings = ["g", geometry.id];
    for (const i in attribs) {
      if (shaderAttributes[i]) {
        strings.push(i, shaderAttributes[i].location);
      }
    }
    return strings.join("-");
  }
  initGeometryVao(geometry, shader, incRefCount = true) {
    const gl = this.gl;
    const CONTEXT_UID = this.CONTEXT_UID;
    const bufferSystem = this.renderer.buffer;
    const program = shader.program;
    if (!program.glPrograms[CONTEXT_UID]) {
      this.renderer.shader.generateProgram(shader);
    }
    this.checkCompatibility(geometry, program);
    const signature = this.getSignature(geometry, program);
    const vaoObjectHash = geometry.glVertexArrayObjects[this.CONTEXT_UID];
    let vao = vaoObjectHash[signature];
    if (vao) {
      vaoObjectHash[program.id] = vao;
      return vao;
    }
    const buffers = geometry.buffers;
    const attributes = geometry.attributes;
    const tempStride = {};
    const tempStart = {};
    for (const j in buffers) {
      tempStride[j] = 0;
      tempStart[j] = 0;
    }
    for (const j in attributes) {
      if (!attributes[j].size && program.attributeData[j]) {
        attributes[j].size = program.attributeData[j].size;
      } else if (!attributes[j].size) {
        console.warn(`PIXI Geometry attribute '${j}' size cannot be determined (likely the bound shader does not have the attribute)`);
      }
      tempStride[attributes[j].buffer] += attributes[j].size * byteSizeMap[attributes[j].type];
    }
    for (const j in attributes) {
      const attribute = attributes[j];
      const attribSize = attribute.size;
      if (attribute.stride === void 0) {
        if (tempStride[attribute.buffer] === attribSize * byteSizeMap[attribute.type]) {
          attribute.stride = 0;
        } else {
          attribute.stride = tempStride[attribute.buffer];
        }
      }
      if (attribute.start === void 0) {
        attribute.start = tempStart[attribute.buffer];
        tempStart[attribute.buffer] += attribSize * byteSizeMap[attribute.type];
      }
    }
    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    for (let i = 0; i < buffers.length; i++) {
      const buffer = buffers[i];
      bufferSystem.bind(buffer);
      if (incRefCount) {
        buffer._glBuffers[CONTEXT_UID].refCount++;
      }
    }
    this.activateVao(geometry, program);
    vaoObjectHash[program.id] = vao;
    vaoObjectHash[signature] = vao;
    gl.bindVertexArray(null);
    bufferSystem.unbind(BUFFER_TYPE.ARRAY_BUFFER);
    return vao;
  }
  disposeGeometry(geometry, contextLost) {
    if (!this.managedGeometries[geometry.id]) {
      return;
    }
    delete this.managedGeometries[geometry.id];
    const vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID];
    const gl = this.gl;
    const buffers = geometry.buffers;
    const bufferSystem = this.renderer?.buffer;
    geometry.disposeRunner.remove(this);
    if (!vaos) {
      return;
    }
    if (bufferSystem) {
      for (let i = 0; i < buffers.length; i++) {
        const buf = buffers[i]._glBuffers[this.CONTEXT_UID];
        if (buf) {
          buf.refCount--;
          if (buf.refCount === 0 && !contextLost) {
            bufferSystem.dispose(buffers[i], contextLost);
          }
        }
      }
    }
    if (!contextLost) {
      for (const vaoId in vaos) {
        if (vaoId[0] === "g") {
          const vao = vaos[vaoId];
          if (this._activeVao === vao) {
            this.unbind();
          }
          gl.deleteVertexArray(vao);
        }
      }
    }
    delete geometry.glVertexArrayObjects[this.CONTEXT_UID];
  }
  disposeAll(contextLost) {
    const all = Object.keys(this.managedGeometries);
    for (let i = 0; i < all.length; i++) {
      this.disposeGeometry(this.managedGeometries[all[i]], contextLost);
    }
  }
  activateVao(geometry, program) {
    const gl = this.gl;
    const CONTEXT_UID = this.CONTEXT_UID;
    const bufferSystem = this.renderer.buffer;
    const buffers = geometry.buffers;
    const attributes = geometry.attributes;
    if (geometry.indexBuffer) {
      bufferSystem.bind(geometry.indexBuffer);
    }
    let lastBuffer = null;
    for (const j in attributes) {
      const attribute = attributes[j];
      const buffer = buffers[attribute.buffer];
      const glBuffer = buffer._glBuffers[CONTEXT_UID];
      if (program.attributeData[j]) {
        if (lastBuffer !== glBuffer) {
          bufferSystem.bind(buffer);
          lastBuffer = glBuffer;
        }
        const location = program.attributeData[j].location;
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, attribute.size, attribute.type || gl.FLOAT, attribute.normalized, attribute.stride, attribute.start);
        if (attribute.instance) {
          if (this.hasInstance) {
            gl.vertexAttribDivisor(location, attribute.divisor);
          } else {
            throw new Error("geometry error, GPU Instancing is not supported on this device");
          }
        }
      }
    }
  }
  draw(type, size, start, instanceCount) {
    const { gl } = this;
    const geometry = this._activeGeometry;
    if (geometry.indexBuffer) {
      const byteSize = geometry.indexBuffer.data.BYTES_PER_ELEMENT;
      const glType = byteSize === 2 ? gl.UNSIGNED_SHORT : gl.UNSIGNED_INT;
      if (byteSize === 2 || byteSize === 4 && this.canUseUInt32ElementIndex) {
        if (geometry.instanced) {
          gl.drawElementsInstanced(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize, instanceCount || 1);
        } else {
          gl.drawElements(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize);
        }
      } else {
        console.warn("unsupported index buffer type: uint32");
      }
    } else if (geometry.instanced) {
      gl.drawArraysInstanced(type, start, size || geometry.getSize(), instanceCount || 1);
    } else {
      gl.drawArrays(type, start, size || geometry.getSize());
    }
    return this;
  }
  unbind() {
    this.gl.bindVertexArray(null);
    this._activeVao = null;
    this._activeGeometry = null;
  }
  destroy() {
    this.renderer = null;
  }
}
GeometrySystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "geometry"
};
extensions$1.add(GeometrySystem);

const tempMat$1 = new Matrix();
class TextureMatrix {
  constructor(texture, clampMargin) {
    this._texture = texture;
    this.mapCoord = new Matrix();
    this.uClampFrame = new Float32Array(4);
    this.uClampOffset = new Float32Array(2);
    this._textureID = -1;
    this._updateID = 0;
    this.clampOffset = 0;
    this.clampMargin = typeof clampMargin === "undefined" ? 0.5 : clampMargin;
    this.isSimple = false;
  }
  get texture() {
    return this._texture;
  }
  set texture(value) {
    this._texture = value;
    this._textureID = -1;
  }
  multiplyUvs(uvs, out) {
    if (out === void 0) {
      out = uvs;
    }
    const mat = this.mapCoord;
    for (let i = 0; i < uvs.length; i += 2) {
      const x = uvs[i];
      const y = uvs[i + 1];
      out[i] = x * mat.a + y * mat.c + mat.tx;
      out[i + 1] = x * mat.b + y * mat.d + mat.ty;
    }
    return out;
  }
  update(forceUpdate) {
    const tex = this._texture;
    if (!tex || !tex.valid) {
      return false;
    }
    if (!forceUpdate && this._textureID === tex._updateID) {
      return false;
    }
    this._textureID = tex._updateID;
    this._updateID++;
    const uvs = tex._uvs;
    this.mapCoord.set(uvs.x1 - uvs.x0, uvs.y1 - uvs.y0, uvs.x3 - uvs.x0, uvs.y3 - uvs.y0, uvs.x0, uvs.y0);
    const orig = tex.orig;
    const trim = tex.trim;
    if (trim) {
      tempMat$1.set(orig.width / trim.width, 0, 0, orig.height / trim.height, -trim.x / trim.width, -trim.y / trim.height);
      this.mapCoord.append(tempMat$1);
    }
    const texBase = tex.baseTexture;
    const frame = this.uClampFrame;
    const margin = this.clampMargin / texBase.resolution;
    const offset = this.clampOffset;
    frame[0] = (tex._frame.x + margin + offset) / texBase.width;
    frame[1] = (tex._frame.y + margin + offset) / texBase.height;
    frame[2] = (tex._frame.x + tex._frame.width - margin + offset) / texBase.width;
    frame[3] = (tex._frame.y + tex._frame.height - margin + offset) / texBase.height;
    this.uClampOffset[0] = offset / texBase.realWidth;
    this.uClampOffset[1] = offset / texBase.realHeight;
    this.isSimple = tex._frame.width === texBase.width && tex._frame.height === texBase.height && tex.rotate === 0;
    return true;
  }
}

var fragment$7 = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n";

var vertex$4 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n";

class SpriteMaskFilter extends Filter {
  constructor(vertexSrc, fragmentSrc, uniforms) {
    let sprite = null;
    if (typeof vertexSrc !== "string" && fragmentSrc === void 0 && uniforms === void 0) {
      sprite = vertexSrc;
      vertexSrc = void 0;
      fragmentSrc = void 0;
      uniforms = void 0;
    }
    super(vertexSrc || vertex$4, fragmentSrc || fragment$7, uniforms);
    this.maskSprite = sprite;
    this.maskMatrix = new Matrix();
  }
  get maskSprite() {
    return this._maskSprite;
  }
  set maskSprite(value) {
    this._maskSprite = value;
    if (this._maskSprite) {
      this._maskSprite.renderable = false;
    }
  }
  apply(filterManager, input, output, clearMode) {
    const maskSprite = this._maskSprite;
    const tex = maskSprite._texture;
    if (!tex.valid) {
      return;
    }
    if (!tex.uvMatrix) {
      tex.uvMatrix = new TextureMatrix(tex, 0);
    }
    tex.uvMatrix.update();
    this.uniforms.npmAlpha = tex.baseTexture.alphaMode ? 0 : 1;
    this.uniforms.mask = tex;
    this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite).prepend(tex.uvMatrix.mapCoord);
    this.uniforms.alpha = maskSprite.worldAlpha;
    this.uniforms.maskClamp = tex.uvMatrix.uClampFrame;
    filterManager.applyFilter(this, input, output, clearMode);
  }
}

class MaskData {
  constructor(maskObject = null) {
    this.type = MASK_TYPES.NONE;
    this.autoDetect = true;
    this.maskObject = maskObject || null;
    this.pooled = false;
    this.isMaskData = true;
    this.resolution = null;
    this.multisample = Filter.defaultMultisample;
    this.enabled = true;
    this.colorMask = 15;
    this._filters = null;
    this._stencilCounter = 0;
    this._scissorCounter = 0;
    this._scissorRect = null;
    this._scissorRectLocal = null;
    this._colorMask = 15;
    this._target = null;
  }
  get filter() {
    return this._filters ? this._filters[0] : null;
  }
  set filter(value) {
    if (value) {
      if (this._filters) {
        this._filters[0] = value;
      } else {
        this._filters = [value];
      }
    } else {
      this._filters = null;
    }
  }
  reset() {
    if (this.pooled) {
      this.maskObject = null;
      this.type = MASK_TYPES.NONE;
      this.autoDetect = true;
    }
    this._target = null;
    this._scissorRectLocal = null;
  }
  copyCountersOrReset(maskAbove) {
    if (maskAbove) {
      this._stencilCounter = maskAbove._stencilCounter;
      this._scissorCounter = maskAbove._scissorCounter;
      this._scissorRect = maskAbove._scissorRect;
    } else {
      this._stencilCounter = 0;
      this._scissorCounter = 0;
      this._scissorRect = null;
    }
  }
}

class MaskSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.enableScissor = true;
    this.alphaMaskPool = [];
    this.maskDataPool = [];
    this.maskStack = [];
    this.alphaMaskIndex = 0;
  }
  setMaskStack(maskStack) {
    this.maskStack = maskStack;
    this.renderer.scissor.setMaskStack(maskStack);
    this.renderer.stencil.setMaskStack(maskStack);
  }
  push(target, maskDataOrTarget) {
    let maskData = maskDataOrTarget;
    if (!maskData.isMaskData) {
      const d = this.maskDataPool.pop() || new MaskData();
      d.pooled = true;
      d.maskObject = maskDataOrTarget;
      maskData = d;
    }
    const maskAbove = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
    maskData.copyCountersOrReset(maskAbove);
    maskData._colorMask = maskAbove ? maskAbove._colorMask : 15;
    if (maskData.autoDetect) {
      this.detect(maskData);
    }
    maskData._target = target;
    if (maskData.type !== MASK_TYPES.SPRITE) {
      this.maskStack.push(maskData);
    }
    if (maskData.enabled) {
      switch (maskData.type) {
        case MASK_TYPES.SCISSOR:
          this.renderer.scissor.push(maskData);
          break;
        case MASK_TYPES.STENCIL:
          this.renderer.stencil.push(maskData);
          break;
        case MASK_TYPES.SPRITE:
          maskData.copyCountersOrReset(null);
          this.pushSpriteMask(maskData);
          break;
        case MASK_TYPES.COLOR:
          this.pushColorMask(maskData);
          break;
        default:
          break;
      }
    }
    if (maskData.type === MASK_TYPES.SPRITE) {
      this.maskStack.push(maskData);
    }
  }
  pop(target) {
    const maskData = this.maskStack.pop();
    if (!maskData || maskData._target !== target) {
      return;
    }
    if (maskData.enabled) {
      switch (maskData.type) {
        case MASK_TYPES.SCISSOR:
          this.renderer.scissor.pop(maskData);
          break;
        case MASK_TYPES.STENCIL:
          this.renderer.stencil.pop(maskData.maskObject);
          break;
        case MASK_TYPES.SPRITE:
          this.popSpriteMask(maskData);
          break;
        case MASK_TYPES.COLOR:
          this.popColorMask(maskData);
          break;
        default:
          break;
      }
    }
    maskData.reset();
    if (maskData.pooled) {
      this.maskDataPool.push(maskData);
    }
    if (this.maskStack.length !== 0) {
      const maskCurrent = this.maskStack[this.maskStack.length - 1];
      if (maskCurrent.type === MASK_TYPES.SPRITE && maskCurrent._filters) {
        maskCurrent._filters[0].maskSprite = maskCurrent.maskObject;
      }
    }
  }
  detect(maskData) {
    const maskObject = maskData.maskObject;
    if (!maskObject) {
      maskData.type = MASK_TYPES.COLOR;
    } else if (maskObject.isSprite) {
      maskData.type = MASK_TYPES.SPRITE;
    } else if (this.enableScissor && this.renderer.scissor.testScissor(maskData)) {
      maskData.type = MASK_TYPES.SCISSOR;
    } else {
      maskData.type = MASK_TYPES.STENCIL;
    }
  }
  pushSpriteMask(maskData) {
    const { maskObject } = maskData;
    const target = maskData._target;
    let alphaMaskFilter = maskData._filters;
    if (!alphaMaskFilter) {
      alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex];
      if (!alphaMaskFilter) {
        alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter()];
      }
    }
    const renderer = this.renderer;
    const renderTextureSystem = renderer.renderTexture;
    let resolution;
    let multisample;
    if (renderTextureSystem.current) {
      const renderTexture = renderTextureSystem.current;
      resolution = maskData.resolution || renderTexture.resolution;
      multisample = maskData.multisample ?? renderTexture.multisample;
    } else {
      resolution = maskData.resolution || renderer.resolution;
      multisample = maskData.multisample ?? renderer.multisample;
    }
    alphaMaskFilter[0].resolution = resolution;
    alphaMaskFilter[0].multisample = multisample;
    alphaMaskFilter[0].maskSprite = maskObject;
    const stashFilterArea = target.filterArea;
    target.filterArea = maskObject.getBounds(true);
    renderer.filter.push(target, alphaMaskFilter);
    target.filterArea = stashFilterArea;
    if (!maskData._filters) {
      this.alphaMaskIndex++;
    }
  }
  popSpriteMask(maskData) {
    this.renderer.filter.pop();
    if (maskData._filters) {
      maskData._filters[0].maskSprite = null;
    } else {
      this.alphaMaskIndex--;
      this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null;
    }
  }
  pushColorMask(maskData) {
    const currColorMask = maskData._colorMask;
    const nextColorMask = maskData._colorMask = currColorMask & maskData.colorMask;
    if (nextColorMask !== currColorMask) {
      this.renderer.gl.colorMask((nextColorMask & 1) !== 0, (nextColorMask & 2) !== 0, (nextColorMask & 4) !== 0, (nextColorMask & 8) !== 0);
    }
  }
  popColorMask(maskData) {
    const currColorMask = maskData._colorMask;
    const nextColorMask = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
    if (nextColorMask !== currColorMask) {
      this.renderer.gl.colorMask((nextColorMask & 1) !== 0, (nextColorMask & 2) !== 0, (nextColorMask & 4) !== 0, (nextColorMask & 8) !== 0);
    }
  }
  destroy() {
    this.renderer = null;
  }
}
MaskSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "mask"
};
extensions$1.add(MaskSystem);

class AbstractMaskSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.maskStack = [];
    this.glConst = 0;
  }
  getStackLength() {
    return this.maskStack.length;
  }
  setMaskStack(maskStack) {
    const { gl } = this.renderer;
    const curStackLen = this.getStackLength();
    this.maskStack = maskStack;
    const newStackLen = this.getStackLength();
    if (newStackLen !== curStackLen) {
      if (newStackLen === 0) {
        gl.disable(this.glConst);
      } else {
        gl.enable(this.glConst);
        this._useCurrent();
      }
    }
  }
  _useCurrent() {
  }
  destroy() {
    this.renderer = null;
    this.maskStack = null;
  }
}

const tempMatrix$1 = new Matrix();
const rectPool = [];
const _ScissorSystem = class extends AbstractMaskSystem {
  constructor(renderer) {
    super(renderer);
    this.glConst = settings.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST;
  }
  getStackLength() {
    const maskData = this.maskStack[this.maskStack.length - 1];
    if (maskData) {
      return maskData._scissorCounter;
    }
    return 0;
  }
  calcScissorRect(maskData) {
    if (maskData._scissorRectLocal) {
      return;
    }
    const prevData = maskData._scissorRect;
    const { maskObject } = maskData;
    const { renderer } = this;
    const renderTextureSystem = renderer.renderTexture;
    const rect = maskObject.getBounds(true, rectPool.pop() ?? new Rectangle());
    this.roundFrameToPixels(rect, renderTextureSystem.current ? renderTextureSystem.current.resolution : renderer.resolution, renderTextureSystem.sourceFrame, renderTextureSystem.destinationFrame, renderer.projection.transform);
    if (prevData) {
      rect.fit(prevData);
    }
    maskData._scissorRectLocal = rect;
  }
  static isMatrixRotated(matrix) {
    if (!matrix) {
      return false;
    }
    const { a, b, c, d } = matrix;
    return (Math.abs(b) > 1e-4 || Math.abs(c) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(d) > 1e-4);
  }
  testScissor(maskData) {
    const { maskObject } = maskData;
    if (!maskObject.isFastRect || !maskObject.isFastRect()) {
      return false;
    }
    if (_ScissorSystem.isMatrixRotated(maskObject.worldTransform)) {
      return false;
    }
    if (_ScissorSystem.isMatrixRotated(this.renderer.projection.transform)) {
      return false;
    }
    this.calcScissorRect(maskData);
    const rect = maskData._scissorRectLocal;
    return rect.width > 0 && rect.height > 0;
  }
  roundFrameToPixels(frame, resolution, bindingSourceFrame, bindingDestinationFrame, transform) {
    if (_ScissorSystem.isMatrixRotated(transform)) {
      return;
    }
    transform = transform ? tempMatrix$1.copyFrom(transform) : tempMatrix$1.identity();
    transform.translate(-bindingSourceFrame.x, -bindingSourceFrame.y).scale(bindingDestinationFrame.width / bindingSourceFrame.width, bindingDestinationFrame.height / bindingSourceFrame.height).translate(bindingDestinationFrame.x, bindingDestinationFrame.y);
    this.renderer.filter.transformAABB(transform, frame);
    frame.fit(bindingDestinationFrame);
    frame.x = Math.round(frame.x * resolution);
    frame.y = Math.round(frame.y * resolution);
    frame.width = Math.round(frame.width * resolution);
    frame.height = Math.round(frame.height * resolution);
  }
  push(maskData) {
    if (!maskData._scissorRectLocal) {
      this.calcScissorRect(maskData);
    }
    const { gl } = this.renderer;
    if (!maskData._scissorRect) {
      gl.enable(gl.SCISSOR_TEST);
    }
    maskData._scissorCounter++;
    maskData._scissorRect = maskData._scissorRectLocal;
    this._useCurrent();
  }
  pop(maskData) {
    const { gl } = this.renderer;
    if (maskData) {
      rectPool.push(maskData._scissorRectLocal);
    }
    if (this.getStackLength() > 0) {
      this._useCurrent();
    } else {
      gl.disable(gl.SCISSOR_TEST);
    }
  }
  _useCurrent() {
    const rect = this.maskStack[this.maskStack.length - 1]._scissorRect;
    let y;
    if (this.renderer.renderTexture.current) {
      y = rect.y;
    } else {
      y = this.renderer.height - rect.height - rect.y;
    }
    this.renderer.gl.scissor(rect.x, y, rect.width, rect.height);
  }
};
let ScissorSystem = _ScissorSystem;
ScissorSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "scissor"
};
extensions$1.add(ScissorSystem);

class StencilSystem extends AbstractMaskSystem {
  constructor(renderer) {
    super(renderer);
    this.glConst = settings.ADAPTER.getWebGLRenderingContext().STENCIL_TEST;
  }
  getStackLength() {
    const maskData = this.maskStack[this.maskStack.length - 1];
    if (maskData) {
      return maskData._stencilCounter;
    }
    return 0;
  }
  push(maskData) {
    const maskObject = maskData.maskObject;
    const { gl } = this.renderer;
    const prevMaskCount = maskData._stencilCounter;
    if (prevMaskCount === 0) {
      this.renderer.framebuffer.forceStencil();
      gl.clearStencil(0);
      gl.clear(gl.STENCIL_BUFFER_BIT);
      gl.enable(gl.STENCIL_TEST);
    }
    maskData._stencilCounter++;
    const colorMask = maskData._colorMask;
    if (colorMask !== 0) {
      maskData._colorMask = 0;
      gl.colorMask(false, false, false, false);
    }
    gl.stencilFunc(gl.EQUAL, prevMaskCount, 4294967295);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
    maskObject.renderable = true;
    maskObject.render(this.renderer);
    this.renderer.batch.flush();
    maskObject.renderable = false;
    if (colorMask !== 0) {
      maskData._colorMask = colorMask;
      gl.colorMask((colorMask & 1) !== 0, (colorMask & 2) !== 0, (colorMask & 4) !== 0, (colorMask & 8) !== 0);
    }
    this._useCurrent();
  }
  pop(maskObject) {
    const gl = this.renderer.gl;
    if (this.getStackLength() === 0) {
      gl.disable(gl.STENCIL_TEST);
    } else {
      const maskData = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
      const colorMask = maskData ? maskData._colorMask : 15;
      if (colorMask !== 0) {
        maskData._colorMask = 0;
        gl.colorMask(false, false, false, false);
      }
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
      maskObject.renderable = true;
      maskObject.render(this.renderer);
      this.renderer.batch.flush();
      maskObject.renderable = false;
      if (colorMask !== 0) {
        maskData._colorMask = colorMask;
        gl.colorMask((colorMask & 1) !== 0, (colorMask & 2) !== 0, (colorMask & 4) !== 0, (colorMask & 8) !== 0);
      }
      this._useCurrent();
    }
  }
  _useCurrent() {
    const gl = this.renderer.gl;
    gl.stencilFunc(gl.EQUAL, this.getStackLength(), 4294967295);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
  }
}
StencilSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "stencil"
};
extensions$1.add(StencilSystem);

class PluginSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.plugins = {};
    Object.defineProperties(this.plugins, {
      extract: {
        enumerable: false,
        get() {
          deprecation("7.0.0", "renderer.plugins.extract has moved to renderer.extract");
          return renderer.extract;
        }
      },
      prepare: {
        enumerable: false,
        get() {
          deprecation("7.0.0", "renderer.plugins.prepare has moved to renderer.prepare");
          return renderer.prepare;
        }
      },
      interaction: {
        enumerable: false,
        get() {
          deprecation("7.0.0", "renderer.plugins.interaction has been deprecated, use renderer.events");
          return renderer.events;
        }
      }
    });
  }
  init(staticMap) {
    for (const o in staticMap) {
      this.plugins[o] = new staticMap[o](this.renderer);
    }
  }
  destroy() {
    for (const o in this.plugins) {
      this.plugins[o].destroy();
      this.plugins[o] = null;
    }
  }
}
PluginSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "_plugin"
};
extensions$1.add(PluginSystem);

class ProjectionSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.destinationFrame = null;
    this.sourceFrame = null;
    this.defaultFrame = null;
    this.projectionMatrix = new Matrix();
    this.transform = null;
  }
  update(destinationFrame, sourceFrame, resolution, root) {
    this.destinationFrame = destinationFrame || this.destinationFrame || this.defaultFrame;
    this.sourceFrame = sourceFrame || this.sourceFrame || destinationFrame;
    this.calculateProjection(this.destinationFrame, this.sourceFrame, resolution, root);
    if (this.transform) {
      this.projectionMatrix.append(this.transform);
    }
    const renderer = this.renderer;
    renderer.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix;
    renderer.globalUniforms.update();
    if (renderer.shader.shader) {
      renderer.shader.syncUniformGroup(renderer.shader.shader.uniforms.globals);
    }
  }
  calculateProjection(_destinationFrame, sourceFrame, _resolution, root) {
    const pm = this.projectionMatrix;
    const sign = !root ? 1 : -1;
    pm.identity();
    pm.a = 1 / sourceFrame.width * 2;
    pm.d = sign * (1 / sourceFrame.height * 2);
    pm.tx = -1 - sourceFrame.x * pm.a;
    pm.ty = -sign - sourceFrame.y * pm.d;
  }
  setTransform(_matrix) {
  }
  destroy() {
    this.renderer = null;
  }
}
ProjectionSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "projection"
};
extensions$1.add(ProjectionSystem);

const tempTransform = new Transform();
class GenerateTextureSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this._tempMatrix = new Matrix();
  }
  generateTexture(displayObject, options) {
    const { region: manualRegion, ...textureOptions } = options || {};
    const region = manualRegion || displayObject.getLocalBounds(null, true);
    if (region.width === 0)
      region.width = 1;
    if (region.height === 0)
      region.height = 1;
    const renderTexture = RenderTexture.create({
      width: region.width,
      height: region.height,
      ...textureOptions
    });
    this._tempMatrix.tx = -region.x;
    this._tempMatrix.ty = -region.y;
    const transform = displayObject.transform;
    displayObject.transform = tempTransform;
    this.renderer.render(displayObject, {
      renderTexture,
      transform: this._tempMatrix,
      skipUpdateTransform: !!displayObject.parent,
      blit: true
    });
    displayObject.transform = transform;
    return renderTexture;
  }
  destroy() {
  }
}
GenerateTextureSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "textureGenerator"
};
extensions$1.add(GenerateTextureSystem);

const tempRect = new Rectangle();
const tempRect2 = new Rectangle();
class RenderTextureSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.defaultMaskStack = [];
    this.current = null;
    this.sourceFrame = new Rectangle();
    this.destinationFrame = new Rectangle();
    this.viewportFrame = new Rectangle();
  }
  bind(renderTexture = null, sourceFrame, destinationFrame) {
    const renderer = this.renderer;
    this.current = renderTexture;
    let baseTexture;
    let framebuffer;
    let resolution;
    if (renderTexture) {
      baseTexture = renderTexture.baseTexture;
      resolution = baseTexture.resolution;
      if (!sourceFrame) {
        tempRect.width = renderTexture.frame.width;
        tempRect.height = renderTexture.frame.height;
        sourceFrame = tempRect;
      }
      if (!destinationFrame) {
        tempRect2.x = renderTexture.frame.x;
        tempRect2.y = renderTexture.frame.y;
        tempRect2.width = sourceFrame.width;
        tempRect2.height = sourceFrame.height;
        destinationFrame = tempRect2;
      }
      framebuffer = baseTexture.framebuffer;
    } else {
      resolution = renderer.resolution;
      if (!sourceFrame) {
        tempRect.width = renderer._view.screen.width;
        tempRect.height = renderer._view.screen.height;
        sourceFrame = tempRect;
      }
      if (!destinationFrame) {
        destinationFrame = tempRect;
        destinationFrame.width = sourceFrame.width;
        destinationFrame.height = sourceFrame.height;
      }
    }
    const viewportFrame = this.viewportFrame;
    viewportFrame.x = destinationFrame.x * resolution;
    viewportFrame.y = destinationFrame.y * resolution;
    viewportFrame.width = destinationFrame.width * resolution;
    viewportFrame.height = destinationFrame.height * resolution;
    if (!renderTexture) {
      viewportFrame.y = renderer.view.height - (viewportFrame.y + viewportFrame.height);
    }
    viewportFrame.ceil();
    this.renderer.framebuffer.bind(framebuffer, viewportFrame);
    this.renderer.projection.update(destinationFrame, sourceFrame, resolution, !framebuffer);
    if (renderTexture) {
      this.renderer.mask.setMaskStack(baseTexture.maskStack);
    } else {
      this.renderer.mask.setMaskStack(this.defaultMaskStack);
    }
    this.sourceFrame.copyFrom(sourceFrame);
    this.destinationFrame.copyFrom(destinationFrame);
  }
  clear(clearColor, mask) {
    if (this.current) {
      clearColor = clearColor || this.current.baseTexture.clearColor;
    } else {
      clearColor = clearColor || this.renderer.background.colorRgba;
    }
    const destinationFrame = this.destinationFrame;
    const baseFrame = this.current ? this.current.baseTexture : this.renderer._view.screen;
    const clearMask = destinationFrame.width !== baseFrame.width || destinationFrame.height !== baseFrame.height;
    if (clearMask) {
      let { x, y, width, height } = this.viewportFrame;
      x = Math.round(x);
      y = Math.round(y);
      width = Math.round(width);
      height = Math.round(height);
      this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
      this.renderer.gl.scissor(x, y, width, height);
    }
    this.renderer.framebuffer.clear(clearColor[0], clearColor[1], clearColor[2], clearColor[3], mask);
    if (clearMask) {
      this.renderer.scissor.pop();
    }
  }
  resize() {
    this.bind(null);
  }
  reset() {
    this.bind(null);
  }
  destroy() {
    this.renderer = null;
  }
}
RenderTextureSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "renderTexture"
};
extensions$1.add(RenderTextureSystem);

class IGLUniformData {
}
class GLProgram {
  constructor(program, uniformData) {
    this.program = program;
    this.uniformData = uniformData;
    this.uniformGroups = {};
    this.uniformDirtyGroups = {};
    this.uniformBufferBindings = {};
  }
  destroy() {
    this.uniformData = null;
    this.uniformGroups = null;
    this.uniformDirtyGroups = null;
    this.uniformBufferBindings = null;
    this.program = null;
  }
}

function getAttributeData(program, gl) {
  const attributes = {};
  const totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < totalAttributes; i++) {
    const attribData = gl.getActiveAttrib(program, i);
    if (attribData.name.startsWith("gl_")) {
      continue;
    }
    const type = mapType(gl, attribData.type);
    const data = {
      type,
      name: attribData.name,
      size: mapSize(type),
      location: gl.getAttribLocation(program, attribData.name)
    };
    attributes[attribData.name] = data;
  }
  return attributes;
}

function getUniformData(program, gl) {
  const uniforms = {};
  const totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < totalUniforms; i++) {
    const uniformData = gl.getActiveUniform(program, i);
    const name = uniformData.name.replace(/\[.*?\]$/, "");
    const isArray = !!uniformData.name.match(/\[.*?\]$/);
    const type = mapType(gl, uniformData.type);
    uniforms[name] = {
      name,
      index: i,
      type,
      size: uniformData.size,
      isArray,
      value: defaultValue(type, uniformData.size)
    };
  }
  return uniforms;
}

function generateProgram(gl, program) {
  const glVertShader = compileShader(gl, gl.VERTEX_SHADER, program.vertexSrc);
  const glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, program.fragmentSrc);
  const webGLProgram = gl.createProgram();
  gl.attachShader(webGLProgram, glVertShader);
  gl.attachShader(webGLProgram, glFragShader);
  const transformFeedbackVaryings = program.extra?.transformFeedbackVaryings;
  if (transformFeedbackVaryings) {
    if (typeof gl.transformFeedbackVaryings !== "function") {
      console.warn(`TransformFeedback is not supported but TransformFeedbackVaryings are given.`);
    } else {
      gl.transformFeedbackVaryings(webGLProgram, transformFeedbackVaryings.names, transformFeedbackVaryings.bufferMode === "separate" ? gl.SEPARATE_ATTRIBS : gl.INTERLEAVED_ATTRIBS);
    }
  }
  gl.linkProgram(webGLProgram);
  if (!gl.getProgramParameter(webGLProgram, gl.LINK_STATUS)) {
    logProgramError(gl, webGLProgram, glVertShader, glFragShader);
  }
  program.attributeData = getAttributeData(webGLProgram, gl);
  program.uniformData = getUniformData(webGLProgram, gl);
  if (!/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(program.vertexSrc)) {
    const keys = Object.keys(program.attributeData);
    keys.sort((a, b) => a > b ? 1 : -1);
    for (let i = 0; i < keys.length; i++) {
      program.attributeData[keys[i]].location = i;
      gl.bindAttribLocation(webGLProgram, i, keys[i]);
    }
    gl.linkProgram(webGLProgram);
  }
  gl.deleteShader(glVertShader);
  gl.deleteShader(glFragShader);
  const uniformData = {};
  for (const i in program.uniformData) {
    const data = program.uniformData[i];
    uniformData[i] = {
      location: gl.getUniformLocation(webGLProgram, i),
      value: defaultValue(data.type, data.size)
    };
  }
  const glProgram = new GLProgram(webGLProgram, uniformData);
  return glProgram;
}

function uboUpdate(_ud, _uv, _renderer, _syncData, buffer) {
  _renderer.buffer.update(buffer);
}
const UBO_TO_SINGLE_SETTERS = {
  float: `
        data[offset] = v;
    `,
  vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
  vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
  vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
  mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
  mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
  mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
};
const GLSL_TO_STD40_SIZE = {
  float: 4,
  vec2: 8,
  vec3: 12,
  vec4: 16,
  int: 4,
  ivec2: 8,
  ivec3: 12,
  ivec4: 16,
  uint: 4,
  uvec2: 8,
  uvec3: 12,
  uvec4: 16,
  bool: 4,
  bvec2: 8,
  bvec3: 12,
  bvec4: 16,
  mat2: 16 * 2,
  mat3: 16 * 3,
  mat4: 16 * 4
};
function createUBOElements(uniformData) {
  const uboElements = uniformData.map((data) => ({
    data,
    offset: 0,
    dataLen: 0,
    dirty: 0
  }));
  let size = 0;
  let chunkSize = 0;
  let offset = 0;
  for (let i = 0; i < uboElements.length; i++) {
    const uboElement = uboElements[i];
    size = GLSL_TO_STD40_SIZE[uboElement.data.type];
    if (uboElement.data.size > 1) {
      size = Math.max(size, 16) * uboElement.data.size;
    }
    uboElement.dataLen = size;
    if (chunkSize % size !== 0 && chunkSize < 16) {
      const lineUpValue = chunkSize % size % 16;
      chunkSize += lineUpValue;
      offset += lineUpValue;
    }
    if (chunkSize + size > 16) {
      offset = Math.ceil(offset / 16) * 16;
      uboElement.offset = offset;
      offset += size;
      chunkSize = size;
    } else {
      uboElement.offset = offset;
      chunkSize += size;
      offset += size;
    }
  }
  offset = Math.ceil(offset / 16) * 16;
  return { uboElements, size: offset };
}
function getUBOData(uniforms, uniformData) {
  const usedUniformDatas = [];
  for (const i in uniforms) {
    if (uniformData[i]) {
      usedUniformDatas.push(uniformData[i]);
    }
  }
  usedUniformDatas.sort((a, b) => a.index - b.index);
  return usedUniformDatas;
}
function generateUniformBufferSync(group, uniformData) {
  if (!group.autoManage) {
    return { size: 0, syncFunc: uboUpdate };
  }
  const usedUniformDatas = getUBOData(group.uniforms, uniformData);
  const { uboElements, size } = createUBOElements(usedUniformDatas);
  const funcFragments = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];
  for (let i = 0; i < uboElements.length; i++) {
    const uboElement = uboElements[i];
    const uniform = group.uniforms[uboElement.data.name];
    const name = uboElement.data.name;
    let parsed = false;
    for (let j = 0; j < uniformParsers.length; j++) {
      const uniformParser = uniformParsers[j];
      if (uniformParser.codeUbo && uniformParser.test(uboElement.data, uniform)) {
        funcFragments.push(`offset = ${uboElement.offset / 4};`, uniformParsers[j].codeUbo(uboElement.data.name, uniform));
        parsed = true;
        break;
      }
    }
    if (!parsed) {
      if (uboElement.data.size > 1) {
        const size2 = mapSize(uboElement.data.type);
        const rowSize = Math.max(GLSL_TO_STD40_SIZE[uboElement.data.type] / 16, 1);
        const elementSize = size2 / rowSize;
        const remainder = (4 - elementSize % 4) % 4;
        funcFragments.push(`
                cv = ud.${name}.value;
                v = uv.${name};
                offset = ${uboElement.offset / 4};

                t = 0;

                for(var i=0; i < ${uboElement.data.size * rowSize}; i++)
                {
                    for(var j = 0; j < ${elementSize}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${remainder};
                }

                `);
      } else {
        const template = UBO_TO_SINGLE_SETTERS[uboElement.data.type];
        funcFragments.push(`
                cv = ud.${name}.value;
                v = uv.${name};
                offset = ${uboElement.offset / 4};
                ${template};
                `);
      }
    }
  }
  funcFragments.push(`
       renderer.buffer.update(buffer);
    `);
  return {
    size,
    syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", funcFragments.join("\n"))
  };
}

let UID = 0;
const defaultSyncData = { textureCount: 0, uboCount: 0 };
class ShaderSystem {
  constructor(renderer) {
    this.destroyed = false;
    this.renderer = renderer;
    this.systemCheck();
    this.gl = null;
    this.shader = null;
    this.program = null;
    this.cache = {};
    this._uboCache = {};
    this.id = UID++;
  }
  systemCheck() {
    if (!unsafeEvalSupported()) {
      throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
    }
  }
  contextChange(gl) {
    this.gl = gl;
    this.reset();
  }
  bind(shader, dontSync) {
    shader.disposeRunner.add(this);
    shader.uniforms.globals = this.renderer.globalUniforms;
    const program = shader.program;
    const glProgram = program.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(shader);
    this.shader = shader;
    if (this.program !== program) {
      this.program = program;
      this.gl.useProgram(glProgram.program);
    }
    if (!dontSync) {
      defaultSyncData.textureCount = 0;
      defaultSyncData.uboCount = 0;
      this.syncUniformGroup(shader.uniformGroup, defaultSyncData);
    }
    return glProgram;
  }
  setUniforms(uniforms) {
    const shader = this.shader.program;
    const glProgram = shader.glPrograms[this.renderer.CONTEXT_UID];
    shader.syncUniforms(glProgram.uniformData, uniforms, this.renderer);
  }
  syncUniformGroup(group, syncData) {
    const glProgram = this.getGlProgram();
    if (!group.static || group.dirtyId !== glProgram.uniformDirtyGroups[group.id]) {
      glProgram.uniformDirtyGroups[group.id] = group.dirtyId;
      this.syncUniforms(group, glProgram, syncData);
    }
  }
  syncUniforms(group, glProgram, syncData) {
    const syncFunc = group.syncUniforms[this.shader.program.id] || this.createSyncGroups(group);
    syncFunc(glProgram.uniformData, group.uniforms, this.renderer, syncData);
  }
  createSyncGroups(group) {
    const id = this.getSignature(group, this.shader.program.uniformData, "u");
    if (!this.cache[id]) {
      this.cache[id] = generateUniformsSync(group, this.shader.program.uniformData);
    }
    group.syncUniforms[this.shader.program.id] = this.cache[id];
    return group.syncUniforms[this.shader.program.id];
  }
  syncUniformBufferGroup(group, name) {
    const glProgram = this.getGlProgram();
    if (!group.static || group.dirtyId !== 0 || !glProgram.uniformGroups[group.id]) {
      group.dirtyId = 0;
      const syncFunc = glProgram.uniformGroups[group.id] || this.createSyncBufferGroup(group, glProgram, name);
      group.buffer.update();
      syncFunc(glProgram.uniformData, group.uniforms, this.renderer, defaultSyncData, group.buffer);
    }
    this.renderer.buffer.bindBufferBase(group.buffer, glProgram.uniformBufferBindings[name]);
  }
  createSyncBufferGroup(group, glProgram, name) {
    const { gl } = this.renderer;
    this.renderer.buffer.bind(group.buffer);
    const uniformBlockIndex = this.gl.getUniformBlockIndex(glProgram.program, name);
    glProgram.uniformBufferBindings[name] = this.shader.uniformBindCount;
    gl.uniformBlockBinding(glProgram.program, uniformBlockIndex, this.shader.uniformBindCount);
    this.shader.uniformBindCount++;
    const id = this.getSignature(group, this.shader.program.uniformData, "ubo");
    let uboData = this._uboCache[id];
    if (!uboData) {
      uboData = this._uboCache[id] = generateUniformBufferSync(group, this.shader.program.uniformData);
    }
    if (group.autoManage) {
      const data = new Float32Array(uboData.size / 4);
      group.buffer.update(data);
    }
    glProgram.uniformGroups[group.id] = uboData.syncFunc;
    return glProgram.uniformGroups[group.id];
  }
  getSignature(group, uniformData, preFix) {
    const uniforms = group.uniforms;
    const strings = [`${preFix}-`];
    for (const i in uniforms) {
      strings.push(i);
      if (uniformData[i]) {
        strings.push(uniformData[i].type);
      }
    }
    return strings.join("-");
  }
  getGlProgram() {
    if (this.shader) {
      return this.shader.program.glPrograms[this.renderer.CONTEXT_UID];
    }
    return null;
  }
  generateProgram(shader) {
    const gl = this.gl;
    const program = shader.program;
    const glProgram = generateProgram(gl, program);
    program.glPrograms[this.renderer.CONTEXT_UID] = glProgram;
    return glProgram;
  }
  reset() {
    this.program = null;
    this.shader = null;
  }
  disposeShader(shader) {
    if (this.shader === shader) {
      this.shader = null;
    }
  }
  destroy() {
    this.renderer = null;
    this.destroyed = true;
  }
}
ShaderSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "shader"
};
extensions$1.add(ShaderSystem);

class StartupSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  run(options) {
    const renderer = this.renderer;
    renderer.emitWithCustomOptions(renderer.runners.init, options);
    if (options.hello) {
      console.log(`PixiJS ${"7.1.1"} - ${renderer.rendererLogId} - https://pixijs.com`);
    }
    renderer.resize(this.renderer.screen.width, this.renderer.screen.height);
  }
  destroy() {
  }
}
StartupSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "startup"
};
extensions$1.add(StartupSystem);

function mapWebGLBlendModesToPixi(gl, array = []) {
  array[BLEND_MODES.NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.ADD] = [gl.ONE, gl.ONE];
  array[BLEND_MODES.MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SCREEN] = [gl.ONE, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.NONE] = [0, 0];
  array[BLEND_MODES.NORMAL_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.ADD_NPM] = [gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE];
  array[BLEND_MODES.SCREEN_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SRC_IN] = [gl.DST_ALPHA, gl.ZERO];
  array[BLEND_MODES.SRC_OUT] = [gl.ONE_MINUS_DST_ALPHA, gl.ZERO];
  array[BLEND_MODES.SRC_ATOP] = [gl.DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.DST_OVER] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE];
  array[BLEND_MODES.DST_IN] = [gl.ZERO, gl.SRC_ALPHA];
  array[BLEND_MODES.DST_OUT] = [gl.ZERO, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.DST_ATOP] = [gl.ONE_MINUS_DST_ALPHA, gl.SRC_ALPHA];
  array[BLEND_MODES.XOR] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA];
  array[BLEND_MODES.SUBTRACT] = [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_REVERSE_SUBTRACT, gl.FUNC_ADD];
  return array;
}

const BLEND = 0;
const OFFSET = 1;
const CULLING = 2;
const DEPTH_TEST = 3;
const WINDING = 4;
const DEPTH_MASK = 5;
const _StateSystem = class {
  constructor() {
    this.gl = null;
    this.stateId = 0;
    this.polygonOffset = 0;
    this.blendMode = BLEND_MODES.NONE;
    this._blendEq = false;
    this.map = [];
    this.map[BLEND] = this.setBlend;
    this.map[OFFSET] = this.setOffset;
    this.map[CULLING] = this.setCullFace;
    this.map[DEPTH_TEST] = this.setDepthTest;
    this.map[WINDING] = this.setFrontFace;
    this.map[DEPTH_MASK] = this.setDepthMask;
    this.checks = [];
    this.defaultState = new State();
    this.defaultState.blend = true;
  }
  contextChange(gl) {
    this.gl = gl;
    this.blendModes = mapWebGLBlendModesToPixi(gl);
    this.set(this.defaultState);
    this.reset();
  }
  set(state) {
    state = state || this.defaultState;
    if (this.stateId !== state.data) {
      let diff = this.stateId ^ state.data;
      let i = 0;
      while (diff) {
        if (diff & 1) {
          this.map[i].call(this, !!(state.data & 1 << i));
        }
        diff = diff >> 1;
        i++;
      }
      this.stateId = state.data;
    }
    for (let i = 0; i < this.checks.length; i++) {
      this.checks[i](this, state);
    }
  }
  forceState(state) {
    state = state || this.defaultState;
    for (let i = 0; i < this.map.length; i++) {
      this.map[i].call(this, !!(state.data & 1 << i));
    }
    for (let i = 0; i < this.checks.length; i++) {
      this.checks[i](this, state);
    }
    this.stateId = state.data;
  }
  setBlend(value) {
    this.updateCheck(_StateSystem.checkBlendMode, value);
    this.gl[value ? "enable" : "disable"](this.gl.BLEND);
  }
  setOffset(value) {
    this.updateCheck(_StateSystem.checkPolygonOffset, value);
    this.gl[value ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
  }
  setDepthTest(value) {
    this.gl[value ? "enable" : "disable"](this.gl.DEPTH_TEST);
  }
  setDepthMask(value) {
    this.gl.depthMask(value);
  }
  setCullFace(value) {
    this.gl[value ? "enable" : "disable"](this.gl.CULL_FACE);
  }
  setFrontFace(value) {
    this.gl.frontFace(this.gl[value ? "CW" : "CCW"]);
  }
  setBlendMode(value) {
    if (value === this.blendMode) {
      return;
    }
    this.blendMode = value;
    const mode = this.blendModes[value];
    const gl = this.gl;
    if (mode.length === 2) {
      gl.blendFunc(mode[0], mode[1]);
    } else {
      gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
    }
    if (mode.length === 6) {
      this._blendEq = true;
      gl.blendEquationSeparate(mode[4], mode[5]);
    } else if (this._blendEq) {
      this._blendEq = false;
      gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    }
  }
  setPolygonOffset(value, scale) {
    this.gl.polygonOffset(value, scale);
  }
  reset() {
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
    this.forceState(this.defaultState);
    this._blendEq = true;
    this.blendMode = -1;
    this.setBlendMode(0);
  }
  updateCheck(func, value) {
    const index = this.checks.indexOf(func);
    if (value && index === -1) {
      this.checks.push(func);
    } else if (!value && index !== -1) {
      this.checks.splice(index, 1);
    }
  }
  static checkBlendMode(system, state) {
    system.setBlendMode(state.blendMode);
  }
  static checkPolygonOffset(system, state) {
    system.setPolygonOffset(1, state.polygonOffset);
  }
  destroy() {
    this.gl = null;
  }
};
let StateSystem = _StateSystem;
StateSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "state"
};
extensions$1.add(StateSystem);

class SystemManager extends eventemitter3 {
  constructor() {
    super(...arguments);
    this.runners = {};
    this._systemsHash = {};
  }
  setup(config) {
    this.addRunners(...config.runners);
    const priority = (config.priority ?? []).filter((key) => config.systems[key]);
    const orderByPriority = [
      ...priority,
      ...Object.keys(config.systems).filter((key) => !priority.includes(key))
    ];
    for (const i of orderByPriority) {
      this.addSystem(config.systems[i], i);
    }
  }
  addRunners(...runnerIds) {
    runnerIds.forEach((runnerId) => {
      this.runners[runnerId] = new Runner(runnerId);
    });
  }
  addSystem(ClassRef, name) {
    const system = new ClassRef(this);
    if (this[name]) {
      throw new Error(`Whoops! The name "${name}" is already in use`);
    }
    this[name] = system;
    this._systemsHash[name] = system;
    for (const i in this.runners) {
      this.runners[i].add(system);
    }
    return this;
  }
  emitWithCustomOptions(runner, options) {
    const systemHashKeys = Object.keys(this._systemsHash);
    runner.items.forEach((system) => {
      const systemName = systemHashKeys.find((systemId) => this._systemsHash[systemId] === system);
      system[runner.name](options[systemName]);
    });
  }
  destroy() {
    Object.values(this.runners).forEach((runner) => {
      runner.destroy();
    });
    this._systemsHash = {};
  }
}

const _TextureGCSystem = class {
  constructor(renderer) {
    this.renderer = renderer;
    this.count = 0;
    this.checkCount = 0;
    this.maxIdle = _TextureGCSystem.defaultMaxIdle;
    this.checkCountMax = _TextureGCSystem.defaultCheckCountMax;
    this.mode = _TextureGCSystem.defaultMode;
  }
  postrender() {
    if (!this.renderer.objectRenderer.renderingToScreen) {
      return;
    }
    this.count++;
    if (this.mode === GC_MODES.MANUAL) {
      return;
    }
    this.checkCount++;
    if (this.checkCount > this.checkCountMax) {
      this.checkCount = 0;
      this.run();
    }
  }
  run() {
    const tm = this.renderer.texture;
    const managedTextures = tm.managedTextures;
    let wasRemoved = false;
    for (let i = 0; i < managedTextures.length; i++) {
      const texture = managedTextures[i];
      if (!texture.framebuffer && this.count - texture.touched > this.maxIdle) {
        tm.destroyTexture(texture, true);
        managedTextures[i] = null;
        wasRemoved = true;
      }
    }
    if (wasRemoved) {
      let j = 0;
      for (let i = 0; i < managedTextures.length; i++) {
        if (managedTextures[i] !== null) {
          managedTextures[j++] = managedTextures[i];
        }
      }
      managedTextures.length = j;
    }
  }
  unload(displayObject) {
    const tm = this.renderer.texture;
    const texture = displayObject._texture;
    if (texture && !texture.framebuffer) {
      tm.destroyTexture(texture);
    }
    for (let i = displayObject.children.length - 1; i >= 0; i--) {
      this.unload(displayObject.children[i]);
    }
  }
  destroy() {
    this.renderer = null;
  }
};
let TextureGCSystem = _TextureGCSystem;
TextureGCSystem.defaultMode = GC_MODES.AUTO;
TextureGCSystem.defaultMaxIdle = 60 * 60;
TextureGCSystem.defaultCheckCountMax = 60 * 10;
TextureGCSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "textureGC"
};
extensions$1.add(TextureGCSystem);

class GLTexture {
  constructor(texture) {
    this.texture = texture;
    this.width = -1;
    this.height = -1;
    this.dirtyId = -1;
    this.dirtyStyleId = -1;
    this.mipmap = false;
    this.wrapMode = 33071;
    this.type = TYPES.UNSIGNED_BYTE;
    this.internalFormat = FORMATS.RGBA;
    this.samplerType = 0;
  }
}

function mapTypeAndFormatToInternalFormat(gl) {
  let table;
  if ("WebGL2RenderingContext" in globalThis && gl instanceof globalThis.WebGL2RenderingContext) {
    table = {
      [TYPES.UNSIGNED_BYTE]: {
        [FORMATS.RGBA]: gl.RGBA8,
        [FORMATS.RGB]: gl.RGB8,
        [FORMATS.RG]: gl.RG8,
        [FORMATS.RED]: gl.R8,
        [FORMATS.RGBA_INTEGER]: gl.RGBA8UI,
        [FORMATS.RGB_INTEGER]: gl.RGB8UI,
        [FORMATS.RG_INTEGER]: gl.RG8UI,
        [FORMATS.RED_INTEGER]: gl.R8UI,
        [FORMATS.ALPHA]: gl.ALPHA,
        [FORMATS.LUMINANCE]: gl.LUMINANCE,
        [FORMATS.LUMINANCE_ALPHA]: gl.LUMINANCE_ALPHA
      },
      [TYPES.BYTE]: {
        [FORMATS.RGBA]: gl.RGBA8_SNORM,
        [FORMATS.RGB]: gl.RGB8_SNORM,
        [FORMATS.RG]: gl.RG8_SNORM,
        [FORMATS.RED]: gl.R8_SNORM,
        [FORMATS.RGBA_INTEGER]: gl.RGBA8I,
        [FORMATS.RGB_INTEGER]: gl.RGB8I,
        [FORMATS.RG_INTEGER]: gl.RG8I,
        [FORMATS.RED_INTEGER]: gl.R8I
      },
      [TYPES.UNSIGNED_SHORT]: {
        [FORMATS.RGBA_INTEGER]: gl.RGBA16UI,
        [FORMATS.RGB_INTEGER]: gl.RGB16UI,
        [FORMATS.RG_INTEGER]: gl.RG16UI,
        [FORMATS.RED_INTEGER]: gl.R16UI,
        [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT16
      },
      [TYPES.SHORT]: {
        [FORMATS.RGBA_INTEGER]: gl.RGBA16I,
        [FORMATS.RGB_INTEGER]: gl.RGB16I,
        [FORMATS.RG_INTEGER]: gl.RG16I,
        [FORMATS.RED_INTEGER]: gl.R16I
      },
      [TYPES.UNSIGNED_INT]: {
        [FORMATS.RGBA_INTEGER]: gl.RGBA32UI,
        [FORMATS.RGB_INTEGER]: gl.RGB32UI,
        [FORMATS.RG_INTEGER]: gl.RG32UI,
        [FORMATS.RED_INTEGER]: gl.R32UI,
        [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT24
      },
      [TYPES.INT]: {
        [FORMATS.RGBA_INTEGER]: gl.RGBA32I,
        [FORMATS.RGB_INTEGER]: gl.RGB32I,
        [FORMATS.RG_INTEGER]: gl.RG32I,
        [FORMATS.RED_INTEGER]: gl.R32I
      },
      [TYPES.FLOAT]: {
        [FORMATS.RGBA]: gl.RGBA32F,
        [FORMATS.RGB]: gl.RGB32F,
        [FORMATS.RG]: gl.RG32F,
        [FORMATS.RED]: gl.R32F,
        [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT32F
      },
      [TYPES.HALF_FLOAT]: {
        [FORMATS.RGBA]: gl.RGBA16F,
        [FORMATS.RGB]: gl.RGB16F,
        [FORMATS.RG]: gl.RG16F,
        [FORMATS.RED]: gl.R16F
      },
      [TYPES.UNSIGNED_SHORT_5_6_5]: {
        [FORMATS.RGB]: gl.RGB565
      },
      [TYPES.UNSIGNED_SHORT_4_4_4_4]: {
        [FORMATS.RGBA]: gl.RGBA4
      },
      [TYPES.UNSIGNED_SHORT_5_5_5_1]: {
        [FORMATS.RGBA]: gl.RGB5_A1
      },
      [TYPES.UNSIGNED_INT_2_10_10_10_REV]: {
        [FORMATS.RGBA]: gl.RGB10_A2,
        [FORMATS.RGBA_INTEGER]: gl.RGB10_A2UI
      },
      [TYPES.UNSIGNED_INT_10F_11F_11F_REV]: {
        [FORMATS.RGB]: gl.R11F_G11F_B10F
      },
      [TYPES.UNSIGNED_INT_5_9_9_9_REV]: {
        [FORMATS.RGB]: gl.RGB9_E5
      },
      [TYPES.UNSIGNED_INT_24_8]: {
        [FORMATS.DEPTH_STENCIL]: gl.DEPTH24_STENCIL8
      },
      [TYPES.FLOAT_32_UNSIGNED_INT_24_8_REV]: {
        [FORMATS.DEPTH_STENCIL]: gl.DEPTH32F_STENCIL8
      }
    };
  } else {
    table = {
      [TYPES.UNSIGNED_BYTE]: {
        [FORMATS.RGBA]: gl.RGBA,
        [FORMATS.RGB]: gl.RGB,
        [FORMATS.ALPHA]: gl.ALPHA,
        [FORMATS.LUMINANCE]: gl.LUMINANCE,
        [FORMATS.LUMINANCE_ALPHA]: gl.LUMINANCE_ALPHA
      },
      [TYPES.UNSIGNED_SHORT_5_6_5]: {
        [FORMATS.RGB]: gl.RGB
      },
      [TYPES.UNSIGNED_SHORT_4_4_4_4]: {
        [FORMATS.RGBA]: gl.RGBA
      },
      [TYPES.UNSIGNED_SHORT_5_5_5_1]: {
        [FORMATS.RGBA]: gl.RGBA
      }
    };
  }
  return table;
}

class TextureSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.boundTextures = [];
    this.currentLocation = -1;
    this.managedTextures = [];
    this._unknownBoundTextures = false;
    this.unknownTexture = new BaseTexture();
    this.hasIntegerTextures = false;
  }
  contextChange() {
    const gl = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    this.webGLVersion = this.renderer.context.webGLVersion;
    this.internalFormats = mapTypeAndFormatToInternalFormat(gl);
    const maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this.boundTextures.length = maxTextures;
    for (let i = 0; i < maxTextures; i++) {
      this.boundTextures[i] = null;
    }
    this.emptyTextures = {};
    const emptyTexture2D = new GLTexture(gl.createTexture());
    gl.bindTexture(gl.TEXTURE_2D, emptyTexture2D.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
    this.emptyTextures[gl.TEXTURE_2D] = emptyTexture2D;
    this.emptyTextures[gl.TEXTURE_CUBE_MAP] = new GLTexture(gl.createTexture());
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.emptyTextures[gl.TEXTURE_CUBE_MAP].texture);
    for (let i = 0; i < 6; i++) {
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    for (let i = 0; i < this.boundTextures.length; i++) {
      this.bind(null, i);
    }
  }
  bind(texture, location = 0) {
    const { gl } = this;
    texture = texture?.castToBaseTexture();
    if (texture?.valid && !texture.parentTextureArray) {
      texture.touched = this.renderer.textureGC.count;
      const glTexture = texture._glTextures[this.CONTEXT_UID] || this.initTexture(texture);
      if (this.boundTextures[location] !== texture) {
        if (this.currentLocation !== location) {
          this.currentLocation = location;
          gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(texture.target, glTexture.texture);
      }
      if (glTexture.dirtyId !== texture.dirtyId) {
        if (this.currentLocation !== location) {
          this.currentLocation = location;
          gl.activeTexture(gl.TEXTURE0 + location);
        }
        this.updateTexture(texture);
      } else if (glTexture.dirtyStyleId !== texture.dirtyStyleId) {
        this.updateTextureStyle(texture);
      }
      this.boundTextures[location] = texture;
    } else {
      if (this.currentLocation !== location) {
        this.currentLocation = location;
        gl.activeTexture(gl.TEXTURE0 + location);
      }
      gl.bindTexture(gl.TEXTURE_2D, this.emptyTextures[gl.TEXTURE_2D].texture);
      this.boundTextures[location] = null;
    }
  }
  reset() {
    this._unknownBoundTextures = true;
    this.hasIntegerTextures = false;
    this.currentLocation = -1;
    for (let i = 0; i < this.boundTextures.length; i++) {
      this.boundTextures[i] = this.unknownTexture;
    }
  }
  unbind(texture) {
    const { gl, boundTextures } = this;
    if (this._unknownBoundTextures) {
      this._unknownBoundTextures = false;
      for (let i = 0; i < boundTextures.length; i++) {
        if (boundTextures[i] === this.unknownTexture) {
          this.bind(null, i);
        }
      }
    }
    for (let i = 0; i < boundTextures.length; i++) {
      if (boundTextures[i] === texture) {
        if (this.currentLocation !== i) {
          gl.activeTexture(gl.TEXTURE0 + i);
          this.currentLocation = i;
        }
        gl.bindTexture(texture.target, this.emptyTextures[texture.target].texture);
        boundTextures[i] = null;
      }
    }
  }
  ensureSamplerType(maxTextures) {
    const { boundTextures, hasIntegerTextures, CONTEXT_UID } = this;
    if (!hasIntegerTextures) {
      return;
    }
    for (let i = maxTextures - 1; i >= 0; --i) {
      const tex = boundTextures[i];
      if (tex) {
        const glTexture = tex._glTextures[CONTEXT_UID];
        if (glTexture.samplerType !== SAMPLER_TYPES.FLOAT) {
          this.renderer.texture.unbind(tex);
        }
      }
    }
  }
  initTexture(texture) {
    const glTexture = new GLTexture(this.gl.createTexture());
    glTexture.dirtyId = -1;
    texture._glTextures[this.CONTEXT_UID] = glTexture;
    this.managedTextures.push(texture);
    texture.on("dispose", this.destroyTexture, this);
    return glTexture;
  }
  initTextureType(texture, glTexture) {
    glTexture.internalFormat = this.internalFormats[texture.type]?.[texture.format] ?? texture.format;
    if (this.webGLVersion === 2 && texture.type === TYPES.HALF_FLOAT) {
      glTexture.type = this.gl.HALF_FLOAT;
    } else {
      glTexture.type = texture.type;
    }
  }
  updateTexture(texture) {
    const glTexture = texture._glTextures[this.CONTEXT_UID];
    if (!glTexture) {
      return;
    }
    const renderer = this.renderer;
    this.initTextureType(texture, glTexture);
    if (texture.resource?.upload(renderer, texture, glTexture)) {
      if (glTexture.samplerType !== SAMPLER_TYPES.FLOAT) {
        this.hasIntegerTextures = true;
      }
    } else {
      const width = texture.realWidth;
      const height = texture.realHeight;
      const gl = renderer.gl;
      if (glTexture.width !== width || glTexture.height !== height || glTexture.dirtyId < 0) {
        glTexture.width = width;
        glTexture.height = height;
        gl.texImage2D(texture.target, 0, glTexture.internalFormat, width, height, 0, texture.format, glTexture.type, null);
      }
    }
    if (texture.dirtyStyleId !== glTexture.dirtyStyleId) {
      this.updateTextureStyle(texture);
    }
    glTexture.dirtyId = texture.dirtyId;
  }
  destroyTexture(texture, skipRemove) {
    const { gl } = this;
    texture = texture.castToBaseTexture();
    if (texture._glTextures[this.CONTEXT_UID]) {
      this.unbind(texture);
      gl.deleteTexture(texture._glTextures[this.CONTEXT_UID].texture);
      texture.off("dispose", this.destroyTexture, this);
      delete texture._glTextures[this.CONTEXT_UID];
      if (!skipRemove) {
        const i = this.managedTextures.indexOf(texture);
        if (i !== -1) {
          removeItems(this.managedTextures, i, 1);
        }
      }
    }
  }
  updateTextureStyle(texture) {
    const glTexture = texture._glTextures[this.CONTEXT_UID];
    if (!glTexture) {
      return;
    }
    if ((texture.mipmap === MIPMAP_MODES.POW2 || this.webGLVersion !== 2) && !texture.isPowerOfTwo) {
      glTexture.mipmap = false;
    } else {
      glTexture.mipmap = texture.mipmap >= 1;
    }
    if (this.webGLVersion !== 2 && !texture.isPowerOfTwo) {
      glTexture.wrapMode = WRAP_MODES.CLAMP;
    } else {
      glTexture.wrapMode = texture.wrapMode;
    }
    if (texture.resource?.style(this.renderer, texture, glTexture)) {
    } else {
      this.setStyle(texture, glTexture);
    }
    glTexture.dirtyStyleId = texture.dirtyStyleId;
  }
  setStyle(texture, glTexture) {
    const gl = this.gl;
    if (glTexture.mipmap && texture.mipmap !== MIPMAP_MODES.ON_MANUAL) {
      gl.generateMipmap(texture.target);
    }
    gl.texParameteri(texture.target, gl.TEXTURE_WRAP_S, glTexture.wrapMode);
    gl.texParameteri(texture.target, gl.TEXTURE_WRAP_T, glTexture.wrapMode);
    if (glTexture.mipmap) {
      gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
      const anisotropicExt = this.renderer.context.extensions.anisotropicFiltering;
      if (anisotropicExt && texture.anisotropicLevel > 0 && texture.scaleMode === SCALE_MODES.LINEAR) {
        const level = Math.min(texture.anisotropicLevel, gl.getParameter(anisotropicExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
        gl.texParameterf(texture.target, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, level);
      }
    } else {
      gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST);
    }
    gl.texParameteri(texture.target, gl.TEXTURE_MAG_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST);
  }
  destroy() {
    this.renderer = null;
  }
}
TextureSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "texture"
};
extensions$1.add(TextureSystem);

class TransformFeedbackSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  contextChange() {
    this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  bind(transformFeedback) {
    const { gl, CONTEXT_UID } = this;
    const glTransformFeedback = transformFeedback._glTransformFeedbacks[CONTEXT_UID] || this.createGLTransformFeedback(transformFeedback);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, glTransformFeedback);
  }
  unbind() {
    const { gl } = this;
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
  }
  beginTransformFeedback(drawMode, shader) {
    const { gl, renderer } = this;
    if (shader) {
      renderer.shader.bind(shader);
    }
    gl.beginTransformFeedback(drawMode);
  }
  endTransformFeedback() {
    const { gl } = this;
    gl.endTransformFeedback();
  }
  createGLTransformFeedback(tf) {
    const { gl, renderer, CONTEXT_UID } = this;
    const glTransformFeedback = gl.createTransformFeedback();
    tf._glTransformFeedbacks[CONTEXT_UID] = glTransformFeedback;
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, glTransformFeedback);
    for (let i = 0; i < tf.buffers.length; i++) {
      const buffer = tf.buffers[i];
      if (!buffer)
        continue;
      renderer.buffer.update(buffer);
      buffer._glBuffers[CONTEXT_UID].refCount++;
      gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, i, buffer._glBuffers[CONTEXT_UID].buffer || null);
    }
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    tf.disposeRunner.add(this);
    return glTransformFeedback;
  }
  disposeTransformFeedback(tf, contextLost) {
    const glTF = tf._glTransformFeedbacks[this.CONTEXT_UID];
    const gl = this.gl;
    tf.disposeRunner.remove(this);
    const bufferSystem = this.renderer.buffer;
    if (bufferSystem) {
      for (let i = 0; i < tf.buffers.length; i++) {
        const buffer = tf.buffers[i];
        if (!buffer)
          continue;
        const buf = buffer._glBuffers[this.CONTEXT_UID];
        if (buf) {
          buf.refCount--;
          if (buf.refCount === 0 && !contextLost) {
            bufferSystem.dispose(buffer, contextLost);
          }
        }
      }
    }
    if (!glTF) {
      return;
    }
    if (!contextLost) {
      gl.deleteTransformFeedback(glTF);
    }
    delete tf._glTransformFeedbacks[this.CONTEXT_UID];
  }
  destroy() {
    this.renderer = null;
  }
}
TransformFeedbackSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "transformFeedback"
};
extensions$1.add(TransformFeedbackSystem);

class ViewSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  init(options) {
    this.screen = new Rectangle(0, 0, options.width, options.height);
    this.element = options.view || settings.ADAPTER.createCanvas();
    this.resolution = options.resolution || settings.RESOLUTION;
    this.autoDensity = !!options.autoDensity;
  }
  resizeView(desiredScreenWidth, desiredScreenHeight) {
    this.element.width = Math.round(desiredScreenWidth * this.resolution);
    this.element.height = Math.round(desiredScreenHeight * this.resolution);
    const screenWidth = this.element.width / this.resolution;
    const screenHeight = this.element.height / this.resolution;
    this.screen.width = screenWidth;
    this.screen.height = screenHeight;
    if (this.autoDensity) {
      this.element.style.width = `${screenWidth}px`;
      this.element.style.height = `${screenHeight}px`;
    }
    this.renderer.emit("resize", screenWidth, screenHeight);
    this.renderer.runners.resize.emit(this.screen.width, this.screen.height);
  }
  destroy(removeView) {
    if (removeView) {
      this.element.parentNode?.removeChild(this.element);
    }
    this.renderer = null;
    this.element = null;
    this.screen = null;
  }
}
ViewSystem.extension = {
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ],
  name: "_view"
};
extensions$1.add(ViewSystem);

settings.PREFER_ENV = ENV.WEBGL2;
settings.STRICT_TEXTURE_CACHE = false;
Object.defineProperties(settings, {
  WRAP_MODE: {
    get() {
      return BaseTexture.defaultOptions.wrapMode;
    },
    set(value) {
      deprecation("7.1.0", "settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode");
      BaseTexture.defaultOptions.wrapMode = value;
    }
  },
  SCALE_MODE: {
    get() {
      return BaseTexture.defaultOptions.scaleMode;
    },
    set(value) {
      deprecation("7.1.0", "settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode");
      BaseTexture.defaultOptions.scaleMode = value;
    }
  },
  MIPMAP_TEXTURES: {
    get() {
      return BaseTexture.defaultOptions.mipmap;
    },
    set(value) {
      deprecation("7.1.0", "settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap");
      BaseTexture.defaultOptions.mipmap = value;
    }
  },
  ANISOTROPIC_LEVEL: {
    get() {
      return BaseTexture.defaultOptions.anisotropicLevel;
    },
    set(value) {
      deprecation("7.1.0", "settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel");
      BaseTexture.defaultOptions.anisotropicLevel = value;
    }
  },
  FILTER_RESOLUTION: {
    get() {
      deprecation("7.1.0", "settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution");
      return Filter.defaultResolution;
    },
    set(value) {
      Filter.defaultResolution = value;
    }
  },
  FILTER_MULTISAMPLE: {
    get() {
      deprecation("7.1.0", "settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample");
      return Filter.defaultMultisample;
    },
    set(value) {
      Filter.defaultMultisample = value;
    }
  },
  SPRITE_MAX_TEXTURES: {
    get() {
      return BatchRenderer.defaultMaxTextures;
    },
    set(value) {
      deprecation("7.1.0", "settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures");
      BatchRenderer.defaultMaxTextures = value;
    }
  },
  SPRITE_BATCH_SIZE: {
    get() {
      return BatchRenderer.defaultBatchSize;
    },
    set(value) {
      deprecation("7.1.0", "settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize");
      BatchRenderer.defaultBatchSize = value;
    }
  },
  CAN_UPLOAD_SAME_BUFFER: {
    get() {
      return BatchRenderer.canUploadSameBuffer;
    },
    set(value) {
      deprecation("7.1.0", "settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer");
      BatchRenderer.canUploadSameBuffer = value;
    }
  },
  GC_MODE: {
    get() {
      return TextureGCSystem.defaultMode;
    },
    set(value) {
      deprecation("7.1.0", "settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode");
      TextureGCSystem.defaultMode = value;
    }
  },
  GC_MAX_IDLE: {
    get() {
      return TextureGCSystem.defaultMaxIdle;
    },
    set(value) {
      deprecation("7.1.0", "settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle");
      TextureGCSystem.defaultMaxIdle = value;
    }
  },
  GC_MAX_CHECK_COUNT: {
    get() {
      return TextureGCSystem.defaultCheckCountMax;
    },
    set(value) {
      deprecation("7.1.0", "settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax");
      TextureGCSystem.defaultCheckCountMax = value;
    }
  },
  PRECISION_VERTEX: {
    get() {
      return Program.defaultVertexPrecision;
    },
    set(value) {
      deprecation("7.1.0", "settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision");
      Program.defaultVertexPrecision = value;
    }
  },
  PRECISION_FRAGMENT: {
    get() {
      return Program.defaultFragmentPrecision;
    },
    set(value) {
      deprecation("7.1.0", "settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision");
      Program.defaultFragmentPrecision = value;
    }
  }
});

var UPDATE_PRIORITY = /* @__PURE__ */ ((UPDATE_PRIORITY2) => {
  UPDATE_PRIORITY2[UPDATE_PRIORITY2["HIGH"] = 25] = "HIGH";
  UPDATE_PRIORITY2[UPDATE_PRIORITY2["NORMAL"] = 0] = "NORMAL";
  UPDATE_PRIORITY2[UPDATE_PRIORITY2["LOW"] = -25] = "LOW";
  UPDATE_PRIORITY2[UPDATE_PRIORITY2["UTILITY"] = -50] = "UTILITY";
  return UPDATE_PRIORITY2;
})(UPDATE_PRIORITY || {});

class TickerListener {
  constructor(fn, context = null, priority = 0, once = false) {
    this.next = null;
    this.previous = null;
    this._destroyed = false;
    this.fn = fn;
    this.context = context;
    this.priority = priority;
    this.once = once;
  }
  match(fn, context = null) {
    return this.fn === fn && this.context === context;
  }
  emit(deltaTime) {
    if (this.fn) {
      if (this.context) {
        this.fn.call(this.context, deltaTime);
      } else {
        this.fn(deltaTime);
      }
    }
    const redirect = this.next;
    if (this.once) {
      this.destroy(true);
    }
    if (this._destroyed) {
      this.next = null;
    }
    return redirect;
  }
  connect(previous) {
    this.previous = previous;
    if (previous.next) {
      previous.next.previous = this;
    }
    this.next = previous.next;
    previous.next = this;
  }
  destroy(hard = false) {
    this._destroyed = true;
    this.fn = null;
    this.context = null;
    if (this.previous) {
      this.previous.next = this.next;
    }
    if (this.next) {
      this.next.previous = this.previous;
    }
    const redirect = this.next;
    this.next = hard ? null : redirect;
    this.previous = null;
    return redirect;
  }
}

const _Ticker = class {
  constructor() {
    this.autoStart = false;
    this.deltaTime = 1;
    this.lastTime = -1;
    this.speed = 1;
    this.started = false;
    this._requestId = null;
    this._maxElapsedMS = 100;
    this._minElapsedMS = 0;
    this._protected = false;
    this._lastFrame = -1;
    this._head = new TickerListener(null, null, Infinity);
    this.deltaMS = 1 / _Ticker.targetFPMS;
    this.elapsedMS = 1 / _Ticker.targetFPMS;
    this._tick = (time) => {
      this._requestId = null;
      if (this.started) {
        this.update(time);
        if (this.started && this._requestId === null && this._head.next) {
          this._requestId = requestAnimationFrame(this._tick);
        }
      }
    };
  }
  _requestIfNeeded() {
    if (this._requestId === null && this._head.next) {
      this.lastTime = performance.now();
      this._lastFrame = this.lastTime;
      this._requestId = requestAnimationFrame(this._tick);
    }
  }
  _cancelIfNeeded() {
    if (this._requestId !== null) {
      cancelAnimationFrame(this._requestId);
      this._requestId = null;
    }
  }
  _startIfPossible() {
    if (this.started) {
      this._requestIfNeeded();
    } else if (this.autoStart) {
      this.start();
    }
  }
  add(fn, context, priority = UPDATE_PRIORITY.NORMAL) {
    return this._addListener(new TickerListener(fn, context, priority));
  }
  addOnce(fn, context, priority = UPDATE_PRIORITY.NORMAL) {
    return this._addListener(new TickerListener(fn, context, priority, true));
  }
  _addListener(listener) {
    let current = this._head.next;
    let previous = this._head;
    if (!current) {
      listener.connect(previous);
    } else {
      while (current) {
        if (listener.priority > current.priority) {
          listener.connect(previous);
          break;
        }
        previous = current;
        current = current.next;
      }
      if (!listener.previous) {
        listener.connect(previous);
      }
    }
    this._startIfPossible();
    return this;
  }
  remove(fn, context) {
    let listener = this._head.next;
    while (listener) {
      if (listener.match(fn, context)) {
        listener = listener.destroy();
      } else {
        listener = listener.next;
      }
    }
    if (!this._head.next) {
      this._cancelIfNeeded();
    }
    return this;
  }
  get count() {
    if (!this._head) {
      return 0;
    }
    let count = 0;
    let current = this._head;
    while (current = current.next) {
      count++;
    }
    return count;
  }
  start() {
    if (!this.started) {
      this.started = true;
      this._requestIfNeeded();
    }
  }
  stop() {
    if (this.started) {
      this.started = false;
      this._cancelIfNeeded();
    }
  }
  destroy() {
    if (!this._protected) {
      this.stop();
      let listener = this._head.next;
      while (listener) {
        listener = listener.destroy(true);
      }
      this._head.destroy();
      this._head = null;
    }
  }
  update(currentTime = performance.now()) {
    let elapsedMS;
    if (currentTime > this.lastTime) {
      elapsedMS = this.elapsedMS = currentTime - this.lastTime;
      if (elapsedMS > this._maxElapsedMS) {
        elapsedMS = this._maxElapsedMS;
      }
      elapsedMS *= this.speed;
      if (this._minElapsedMS) {
        const delta = currentTime - this._lastFrame | 0;
        if (delta < this._minElapsedMS) {
          return;
        }
        this._lastFrame = currentTime - delta % this._minElapsedMS;
      }
      this.deltaMS = elapsedMS;
      this.deltaTime = this.deltaMS * _Ticker.targetFPMS;
      const head = this._head;
      let listener = head.next;
      while (listener) {
        listener = listener.emit(this.deltaTime);
      }
      if (!head.next) {
        this._cancelIfNeeded();
      }
    } else {
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    }
    this.lastTime = currentTime;
  }
  get FPS() {
    return 1e3 / this.elapsedMS;
  }
  get minFPS() {
    return 1e3 / this._maxElapsedMS;
  }
  set minFPS(fps) {
    const minFPS = Math.min(this.maxFPS, fps);
    const minFPMS = Math.min(Math.max(0, minFPS) / 1e3, _Ticker.targetFPMS);
    this._maxElapsedMS = 1 / minFPMS;
  }
  get maxFPS() {
    if (this._minElapsedMS) {
      return Math.round(1e3 / this._minElapsedMS);
    }
    return 0;
  }
  set maxFPS(fps) {
    if (fps === 0) {
      this._minElapsedMS = 0;
    } else {
      const maxFPS = Math.max(this.minFPS, fps);
      this._minElapsedMS = 1 / (maxFPS / 1e3);
    }
  }
  static get shared() {
    if (!_Ticker._shared) {
      const shared = _Ticker._shared = new _Ticker();
      shared.autoStart = true;
      shared._protected = true;
    }
    return _Ticker._shared;
  }
  static get system() {
    if (!_Ticker._system) {
      const system = _Ticker._system = new _Ticker();
      system.autoStart = true;
      system._protected = true;
    }
    return _Ticker._system;
  }
};
let Ticker = _Ticker;
Ticker.targetFPMS = 0.06;

Object.defineProperties(settings, {
  TARGET_FPMS: {
    get() {
      return Ticker.targetFPMS;
    },
    set(value) {
      deprecation("7.1.0", "settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS");
      Ticker.targetFPMS = value;
    }
  }
});

class TickerPlugin {
  static init(options) {
    options = Object.assign({
      autoStart: true,
      sharedTicker: false
    }, options);
    Object.defineProperty(this, "ticker", {
      set(ticker) {
        if (this._ticker) {
          this._ticker.remove(this.render, this);
        }
        this._ticker = ticker;
        if (ticker) {
          ticker.add(this.render, this, UPDATE_PRIORITY.LOW);
        }
      },
      get() {
        return this._ticker;
      }
    });
    this.stop = () => {
      this._ticker.stop();
    };
    this.start = () => {
      this._ticker.start();
    };
    this._ticker = null;
    this.ticker = options.sharedTicker ? Ticker.shared : new Ticker();
    if (options.autoStart) {
      this.start();
    }
  }
  static destroy() {
    if (this._ticker) {
      const oldTicker = this._ticker;
      this.ticker = null;
      oldTicker.destroy();
    }
  }
}
TickerPlugin.extension = ExtensionType.Application;
extensions$1.add(TickerPlugin);

const renderers = [];
extensions$1.handleByList(ExtensionType.Renderer, renderers);
function autoDetectRenderer(options) {
  for (const RendererType of renderers) {
    if (RendererType.test(options)) {
      return new RendererType(options);
    }
  }
  throw new Error("Unable to auto-detect a suitable renderer.");
}

var $defaultVertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";

var $defaultFilterVertex = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";

const defaultVertex = $defaultVertex;
const defaultFilterVertex = $defaultFilterVertex;

class MultisampleSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  contextChange(gl) {
    let samples;
    if (this.renderer.context.webGLVersion === 1) {
      const framebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      samples = gl.getParameter(gl.SAMPLES);
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    } else {
      const framebuffer = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING);
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
      samples = gl.getParameter(gl.SAMPLES);
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, framebuffer);
    }
    if (samples >= MSAA_QUALITY.HIGH) {
      this.multisample = MSAA_QUALITY.HIGH;
    } else if (samples >= MSAA_QUALITY.MEDIUM) {
      this.multisample = MSAA_QUALITY.MEDIUM;
    } else if (samples >= MSAA_QUALITY.LOW) {
      this.multisample = MSAA_QUALITY.LOW;
    } else {
      this.multisample = MSAA_QUALITY.NONE;
    }
  }
  destroy() {
  }
}
MultisampleSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "_multisample"
};
extensions$1.add(MultisampleSystem);

class GLBuffer {
  constructor(buffer) {
    this.buffer = buffer || null;
    this.updateID = -1;
    this.byteLength = -1;
    this.refCount = 0;
  }
}

class BufferSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.managedBuffers = {};
    this.boundBufferBases = {};
  }
  destroy() {
    this.renderer = null;
  }
  contextChange() {
    this.disposeAll(true);
    this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  bind(buffer) {
    const { gl, CONTEXT_UID } = this;
    const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
    gl.bindBuffer(buffer.type, glBuffer.buffer);
  }
  unbind(type) {
    const { gl } = this;
    gl.bindBuffer(type, null);
  }
  bindBufferBase(buffer, index) {
    const { gl, CONTEXT_UID } = this;
    if (this.boundBufferBases[index] !== buffer) {
      const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
      this.boundBufferBases[index] = buffer;
      gl.bindBufferBase(gl.UNIFORM_BUFFER, index, glBuffer.buffer);
    }
  }
  bindBufferRange(buffer, index, offset) {
    const { gl, CONTEXT_UID } = this;
    offset = offset || 0;
    const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
    gl.bindBufferRange(gl.UNIFORM_BUFFER, index || 0, glBuffer.buffer, offset * 256, 256);
  }
  update(buffer) {
    const { gl, CONTEXT_UID } = this;
    const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
    if (buffer._updateID === glBuffer.updateID) {
      return;
    }
    glBuffer.updateID = buffer._updateID;
    gl.bindBuffer(buffer.type, glBuffer.buffer);
    if (glBuffer.byteLength >= buffer.data.byteLength) {
      gl.bufferSubData(buffer.type, 0, buffer.data);
    } else {
      const drawType = buffer.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;
      glBuffer.byteLength = buffer.data.byteLength;
      gl.bufferData(buffer.type, buffer.data, drawType);
    }
  }
  dispose(buffer, contextLost) {
    if (!this.managedBuffers[buffer.id]) {
      return;
    }
    delete this.managedBuffers[buffer.id];
    const glBuffer = buffer._glBuffers[this.CONTEXT_UID];
    const gl = this.gl;
    buffer.disposeRunner.remove(this);
    if (!glBuffer) {
      return;
    }
    if (!contextLost) {
      gl.deleteBuffer(glBuffer.buffer);
    }
    delete buffer._glBuffers[this.CONTEXT_UID];
  }
  disposeAll(contextLost) {
    const all = Object.keys(this.managedBuffers);
    for (let i = 0; i < all.length; i++) {
      this.dispose(this.managedBuffers[all[i]], contextLost);
    }
  }
  createGLBuffer(buffer) {
    const { CONTEXT_UID, gl } = this;
    buffer._glBuffers[CONTEXT_UID] = new GLBuffer(gl.createBuffer());
    this.managedBuffers[buffer.id] = buffer;
    buffer.disposeRunner.add(this);
    return buffer._glBuffers[CONTEXT_UID];
  }
}
BufferSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "buffer"
};
extensions$1.add(BufferSystem);

class ObjectRendererSystem {
  constructor(renderer) {
    this.renderer = renderer;
  }
  render(displayObject, options) {
    const renderer = this.renderer;
    let renderTexture;
    let clear;
    let transform;
    let skipUpdateTransform;
    if (options) {
      renderTexture = options.renderTexture;
      clear = options.clear;
      transform = options.transform;
      skipUpdateTransform = options.skipUpdateTransform;
    }
    this.renderingToScreen = !renderTexture;
    renderer.runners.prerender.emit();
    renderer.emit("prerender");
    renderer.projection.transform = transform;
    if (renderer.context.isLost) {
      return;
    }
    if (!renderTexture) {
      this.lastObjectRendered = displayObject;
    }
    if (!skipUpdateTransform) {
      const cacheParent = displayObject.enableTempParent();
      displayObject.updateTransform();
      displayObject.disableTempParent(cacheParent);
    }
    renderer.renderTexture.bind(renderTexture);
    renderer.batch.currentRenderer.start();
    if (clear ?? renderer.background.clearBeforeRender) {
      renderer.renderTexture.clear();
    }
    displayObject.render(renderer);
    renderer.batch.currentRenderer.flush();
    if (renderTexture) {
      if (options.blit) {
        renderer.framebuffer.blit();
      }
      renderTexture.baseTexture.update();
    }
    renderer.runners.postrender.emit();
    renderer.projection.transform = null;
    renderer.emit("postrender");
  }
  destroy() {
    this.renderer = null;
    this.lastObjectRendered = null;
  }
}
ObjectRendererSystem.extension = {
  type: ExtensionType.RendererSystem,
  name: "objectRenderer"
};
extensions$1.add(ObjectRendererSystem);

const _Renderer = class extends SystemManager {
  constructor(options) {
    super();
    options = Object.assign({}, settings.RENDER_OPTIONS, options);
    this.gl = null;
    this.CONTEXT_UID = 0;
    this.globalUniforms = new UniformGroup({
      projectionMatrix: new Matrix()
    }, true);
    const systemConfig = {
      runners: [
        "init",
        "destroy",
        "contextChange",
        "resolutionChange",
        "reset",
        "update",
        "postrender",
        "prerender",
        "resize"
      ],
      systems: _Renderer.__systems,
      priority: [
        "_view",
        "textureGenerator",
        "background",
        "_plugin",
        "startup",
        "context",
        "state",
        "texture",
        "buffer",
        "geometry",
        "framebuffer",
        "transformFeedback",
        "mask",
        "scissor",
        "stencil",
        "projection",
        "textureGC",
        "filter",
        "renderTexture",
        "batch",
        "objectRenderer",
        "_multisample"
      ]
    };
    this.setup(systemConfig);
    if ("useContextAlpha" in options) {
      deprecation("7.0.0", "options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead");
      options.premultipliedAlpha = options.useContextAlpha && options.useContextAlpha !== "notMultiplied";
      options.backgroundAlpha = options.useContextAlpha === false ? 1 : options.backgroundAlpha;
    }
    const startupOptions = {
      hello: options.hello,
      _plugin: _Renderer.__plugins,
      background: {
        alpha: options.backgroundAlpha,
        color: options.background ?? options.backgroundColor,
        clearBeforeRender: options.clearBeforeRender
      },
      _view: {
        height: options.height,
        width: options.width,
        autoDensity: options.autoDensity,
        resolution: options.resolution,
        view: options.view
      },
      context: {
        antialias: options.antialias,
        context: options.context,
        powerPreference: options.powerPreference,
        premultipliedAlpha: options.premultipliedAlpha,
        preserveDrawingBuffer: options.preserveDrawingBuffer
      }
    };
    this.startup.run(startupOptions);
    this.options = options;
  }
  static test(options) {
    if (options?.forceCanvas) {
      return false;
    }
    return isWebGLSupported();
  }
  render(displayObject, options) {
    this.objectRenderer.render(displayObject, options);
  }
  resize(desiredScreenWidth, desiredScreenHeight) {
    this._view.resizeView(desiredScreenWidth, desiredScreenHeight);
  }
  reset() {
    this.runners.reset.emit();
    return this;
  }
  clear() {
    this.renderTexture.bind();
    this.renderTexture.clear();
  }
  destroy(removeView = false) {
    this.runners.destroy.items.reverse();
    this.emitWithCustomOptions(this.runners.destroy, {
      _view: removeView
    });
    super.destroy();
  }
  get plugins() {
    return this._plugin.plugins;
  }
  get multisample() {
    return this._multisample.multisample;
  }
  get width() {
    return this._view.element.width;
  }
  get height() {
    return this._view.element.height;
  }
  get resolution() {
    return this._view.resolution;
  }
  set resolution(value) {
    this._view.resolution = value;
    this.runners.resolutionChange.emit(value);
  }
  get autoDensity() {
    return this._view.autoDensity;
  }
  get view() {
    return this._view.element;
  }
  get screen() {
    return this._view.screen;
  }
  get lastObjectRendered() {
    return this.objectRenderer.lastObjectRendered;
  }
  get renderingToScreen() {
    return this.objectRenderer.renderingToScreen;
  }
  get rendererLogId() {
    return `WebGL ${this.context.webGLVersion}`;
  }
  get clearBeforeRender() {
    deprecation("7.0.0", "renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead.");
    return this.background.clearBeforeRender;
  }
  get useContextAlpha() {
    deprecation("7.0.0", "renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead.");
    return this.context.useContextAlpha;
  }
  get preserveDrawingBuffer() {
    deprecation("7.0.0", "renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context");
    return this.context.preserveDrawingBuffer;
  }
  get backgroundColor() {
    deprecation("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead.");
    return this.background.color;
  }
  set backgroundColor(value) {
    deprecation("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead.");
    this.background.color = value;
  }
  get backgroundAlpha() {
    deprecation("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead.");
    return this.background.color;
  }
  set backgroundAlpha(value) {
    deprecation("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead.");
    this.background.alpha = value;
  }
  get powerPreference() {
    deprecation("7.0.0", "renderer.powerPreference has been deprecated, we can only know this if pixi creates the context");
    return this.context.powerPreference;
  }
  generateTexture(displayObject, options) {
    return this.textureGenerator.generateTexture(displayObject, options);
  }
};
let Renderer = _Renderer;
Renderer.extension = {
  type: ExtensionType.Renderer,
  priority: 1
};
Renderer.__plugins = {};
Renderer.__systems = {};
extensions$1.handleByMap(ExtensionType.RendererPlugin, Renderer.__plugins);
extensions$1.handleByMap(ExtensionType.RendererSystem, Renderer.__systems);
extensions$1.add(Renderer);

class AbstractMultiResource extends Resource {
  constructor(length, options) {
    const { width, height } = options || {};
    super(width, height);
    this.items = [];
    this.itemDirtyIds = [];
    for (let i = 0; i < length; i++) {
      const partTexture = new BaseTexture();
      this.items.push(partTexture);
      this.itemDirtyIds.push(-2);
    }
    this.length = length;
    this._load = null;
    this.baseTexture = null;
  }
  initFromArray(resources, options) {
    for (let i = 0; i < this.length; i++) {
      if (!resources[i]) {
        continue;
      }
      if (resources[i].castToBaseTexture) {
        this.addBaseTextureAt(resources[i].castToBaseTexture(), i);
      } else if (resources[i] instanceof Resource) {
        this.addResourceAt(resources[i], i);
      } else {
        this.addResourceAt(autoDetectResource(resources[i], options), i);
      }
    }
  }
  dispose() {
    for (let i = 0, len = this.length; i < len; i++) {
      this.items[i].destroy();
    }
    this.items = null;
    this.itemDirtyIds = null;
    this._load = null;
  }
  addResourceAt(resource, index) {
    if (!this.items[index]) {
      throw new Error(`Index ${index} is out of bounds`);
    }
    if (resource.valid && !this.valid) {
      this.resize(resource.width, resource.height);
    }
    this.items[index].setResource(resource);
    return this;
  }
  bind(baseTexture) {
    if (this.baseTexture !== null) {
      throw new Error("Only one base texture per TextureArray is allowed");
    }
    super.bind(baseTexture);
    for (let i = 0; i < this.length; i++) {
      this.items[i].parentTextureArray = baseTexture;
      this.items[i].on("update", baseTexture.update, baseTexture);
    }
  }
  unbind(baseTexture) {
    super.unbind(baseTexture);
    for (let i = 0; i < this.length; i++) {
      this.items[i].parentTextureArray = null;
      this.items[i].off("update", baseTexture.update, baseTexture);
    }
  }
  load() {
    if (this._load) {
      return this._load;
    }
    const resources = this.items.map((item) => item.resource).filter((item) => item);
    const promises = resources.map((item) => item.load());
    this._load = Promise.all(promises).then(() => {
      const { realWidth, realHeight } = this.items[0];
      this.resize(realWidth, realHeight);
      return Promise.resolve(this);
    });
    return this._load;
  }
}

class ArrayResource extends AbstractMultiResource {
  constructor(source, options) {
    const { width, height } = options || {};
    let urls;
    let length;
    if (Array.isArray(source)) {
      urls = source;
      length = source.length;
    } else {
      length = source;
    }
    super(length, { width, height });
    if (urls) {
      this.initFromArray(urls, options);
    }
  }
  addBaseTextureAt(baseTexture, index) {
    if (baseTexture.resource) {
      this.addResourceAt(baseTexture.resource, index);
    } else {
      throw new Error("ArrayResource does not support RenderTexture");
    }
    return this;
  }
  bind(baseTexture) {
    super.bind(baseTexture);
    baseTexture.target = TARGETS.TEXTURE_2D_ARRAY;
  }
  upload(renderer, texture, glTexture) {
    const { length, itemDirtyIds, items } = this;
    const { gl } = renderer;
    if (glTexture.dirtyId < 0) {
      gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, glTexture.internalFormat, this._width, this._height, length, 0, texture.format, glTexture.type, null);
    }
    for (let i = 0; i < length; i++) {
      const item = items[i];
      if (itemDirtyIds[i] < item.dirtyId) {
        itemDirtyIds[i] = item.dirtyId;
        if (item.valid) {
          gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i, item.resource.width, item.resource.height, 1, texture.format, glTexture.type, item.resource.source);
        }
      }
    }
    return true;
  }
}

class CanvasResource extends BaseImageResource {
  constructor(source) {
    super(source);
  }
  static test(source) {
    const { OffscreenCanvas } = globalThis;
    if (OffscreenCanvas && source instanceof OffscreenCanvas) {
      return true;
    }
    return globalThis.HTMLCanvasElement && source instanceof HTMLCanvasElement;
  }
}

const _CubeResource = class extends AbstractMultiResource {
  constructor(source, options) {
    const { width, height, autoLoad, linkBaseTexture } = options || {};
    if (source && source.length !== _CubeResource.SIDES) {
      throw new Error(`Invalid length. Got ${source.length}, expected 6`);
    }
    super(6, { width, height });
    for (let i = 0; i < _CubeResource.SIDES; i++) {
      this.items[i].target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + i;
    }
    this.linkBaseTexture = linkBaseTexture !== false;
    if (source) {
      this.initFromArray(source, options);
    }
    if (autoLoad !== false) {
      this.load();
    }
  }
  bind(baseTexture) {
    super.bind(baseTexture);
    baseTexture.target = TARGETS.TEXTURE_CUBE_MAP;
  }
  addBaseTextureAt(baseTexture, index, linkBaseTexture) {
    if (linkBaseTexture === void 0) {
      linkBaseTexture = this.linkBaseTexture;
    }
    if (!this.items[index]) {
      throw new Error(`Index ${index} is out of bounds`);
    }
    if (!this.linkBaseTexture || baseTexture.parentTextureArray || Object.keys(baseTexture._glTextures).length > 0) {
      if (baseTexture.resource) {
        this.addResourceAt(baseTexture.resource, index);
      } else {
        throw new Error(`CubeResource does not support copying of renderTexture.`);
      }
    } else {
      baseTexture.target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + index;
      baseTexture.parentTextureArray = this.baseTexture;
      this.items[index] = baseTexture;
    }
    if (baseTexture.valid && !this.valid) {
      this.resize(baseTexture.realWidth, baseTexture.realHeight);
    }
    this.items[index] = baseTexture;
    return this;
  }
  upload(renderer, _baseTexture, glTexture) {
    const dirty = this.itemDirtyIds;
    for (let i = 0; i < _CubeResource.SIDES; i++) {
      const side = this.items[i];
      if (dirty[i] < side.dirtyId || glTexture.dirtyId < _baseTexture.dirtyId) {
        if (side.valid && side.resource) {
          side.resource.upload(renderer, side, glTexture);
          dirty[i] = side.dirtyId;
        } else if (dirty[i] < -1) {
          renderer.gl.texImage2D(side.target, 0, glTexture.internalFormat, _baseTexture.realWidth, _baseTexture.realHeight, 0, _baseTexture.format, glTexture.type, null);
          dirty[i] = -1;
        }
      }
    }
    return true;
  }
  static test(source) {
    return Array.isArray(source) && source.length === _CubeResource.SIDES;
  }
};
let CubeResource = _CubeResource;
CubeResource.SIDES = 6;

class ImageBitmapResource extends BaseImageResource {
  constructor(source, options) {
    options = options || {};
    let baseSource;
    let url;
    if (typeof source === "string") {
      baseSource = ImageBitmapResource.EMPTY;
      url = source;
    } else {
      baseSource = source;
      url = null;
    }
    super(baseSource);
    this.url = url;
    this.crossOrigin = options.crossOrigin ?? true;
    this.alphaMode = typeof options.alphaMode === "number" ? options.alphaMode : null;
    this._load = null;
    if (options.autoLoad !== false) {
      this.load();
    }
  }
  load() {
    if (this._load) {
      return this._load;
    }
    this._load = new Promise(async (resolve, reject) => {
      if (this.url === null) {
        resolve(this);
        return;
      }
      try {
        const response = await settings.ADAPTER.fetch(this.url, {
          mode: this.crossOrigin ? "cors" : "no-cors"
        });
        if (this.destroyed)
          return;
        const imageBlob = await response.blob();
        if (this.destroyed)
          return;
        const imageBitmap = await createImageBitmap(imageBlob, {
          premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
        });
        if (this.destroyed)
          return;
        this.source = imageBitmap;
        this.update();
        resolve(this);
      } catch (e) {
        if (this.destroyed)
          return;
        reject(e);
        this.onError.emit(e);
      }
    });
    return this._load;
  }
  upload(renderer, baseTexture, glTexture) {
    if (!(this.source instanceof ImageBitmap)) {
      this.load();
      return false;
    }
    if (typeof this.alphaMode === "number") {
      baseTexture.alphaMode = this.alphaMode;
    }
    return super.upload(renderer, baseTexture, glTexture);
  }
  dispose() {
    if (this.source instanceof ImageBitmap) {
      this.source.close();
    }
    super.dispose();
    this._load = null;
  }
  static test(source) {
    return !!globalThis.createImageBitmap && typeof ImageBitmap !== "undefined" && (typeof source === "string" || source instanceof ImageBitmap);
  }
  static get EMPTY() {
    ImageBitmapResource._EMPTY = ImageBitmapResource._EMPTY ?? settings.ADAPTER.createCanvas(0, 0);
    return ImageBitmapResource._EMPTY;
  }
}

const _SVGResource = class extends BaseImageResource {
  constructor(sourceBase64, options) {
    options = options || {};
    super(settings.ADAPTER.createCanvas());
    this._width = 0;
    this._height = 0;
    this.svg = sourceBase64;
    this.scale = options.scale || 1;
    this._overrideWidth = options.width;
    this._overrideHeight = options.height;
    this._resolve = null;
    this._crossorigin = options.crossorigin;
    this._load = null;
    if (options.autoLoad !== false) {
      this.load();
    }
  }
  load() {
    if (this._load) {
      return this._load;
    }
    this._load = new Promise((resolve) => {
      this._resolve = () => {
        this.resize(this.source.width, this.source.height);
        resolve(this);
      };
      if (_SVGResource.SVG_XML.test(this.svg.trim())) {
        if (!btoa) {
          throw new Error("Your browser doesn't support base64 conversions.");
        }
        this.svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`;
      }
      this._loadSvg();
    });
    return this._load;
  }
  _loadSvg() {
    const tempImage = new Image();
    BaseImageResource.crossOrigin(tempImage, this.svg, this._crossorigin);
    tempImage.src = this.svg;
    tempImage.onerror = (event) => {
      if (!this._resolve) {
        return;
      }
      tempImage.onerror = null;
      this.onError.emit(event);
    };
    tempImage.onload = () => {
      if (!this._resolve) {
        return;
      }
      const svgWidth = tempImage.width;
      const svgHeight = tempImage.height;
      if (!svgWidth || !svgHeight) {
        throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
      }
      let width = svgWidth * this.scale;
      let height = svgHeight * this.scale;
      if (this._overrideWidth || this._overrideHeight) {
        width = this._overrideWidth || this._overrideHeight / svgHeight * svgWidth;
        height = this._overrideHeight || this._overrideWidth / svgWidth * svgHeight;
      }
      width = Math.round(width);
      height = Math.round(height);
      const canvas = this.source;
      canvas.width = width;
      canvas.height = height;
      canvas._pixiId = `canvas_${uid()}`;
      canvas.getContext("2d").drawImage(tempImage, 0, 0, svgWidth, svgHeight, 0, 0, width, height);
      this._resolve();
      this._resolve = null;
    };
  }
  static getSize(svgString) {
    const sizeMatch = _SVGResource.SVG_SIZE.exec(svgString);
    const size = {};
    if (sizeMatch) {
      size[sizeMatch[1]] = Math.round(parseFloat(sizeMatch[3]));
      size[sizeMatch[5]] = Math.round(parseFloat(sizeMatch[7]));
    }
    return size;
  }
  dispose() {
    super.dispose();
    this._resolve = null;
    this._crossorigin = null;
  }
  static test(source, extension) {
    return extension === "svg" || typeof source === "string" && source.startsWith("data:image/svg+xml") || typeof source === "string" && _SVGResource.SVG_XML.test(source);
  }
};
let SVGResource = _SVGResource;
SVGResource.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m;
SVGResource.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;

const _VideoResource = class extends BaseImageResource {
  constructor(source, options) {
    options = options || {};
    if (!(source instanceof HTMLVideoElement)) {
      const videoElement = document.createElement("video");
      videoElement.setAttribute("preload", "auto");
      videoElement.setAttribute("webkit-playsinline", "");
      videoElement.setAttribute("playsinline", "");
      if (typeof source === "string") {
        source = [source];
      }
      const firstSrc = source[0].src || source[0];
      BaseImageResource.crossOrigin(videoElement, firstSrc, options.crossorigin);
      for (let i = 0; i < source.length; ++i) {
        const sourceElement = document.createElement("source");
        let { src, mime } = source[i];
        src = src || source[i];
        const baseSrc = src.split("?").shift().toLowerCase();
        const ext = baseSrc.slice(baseSrc.lastIndexOf(".") + 1);
        mime = mime || _VideoResource.MIME_TYPES[ext] || `video/${ext}`;
        sourceElement.src = src;
        sourceElement.type = mime;
        videoElement.appendChild(sourceElement);
      }
      source = videoElement;
    }
    super(source);
    this.noSubImage = true;
    this._autoUpdate = true;
    this._isConnectedToTicker = false;
    this._updateFPS = options.updateFPS || 0;
    this._msToNextUpdate = 0;
    this.autoPlay = options.autoPlay !== false;
    this._load = null;
    this._resolve = null;
    this._onCanPlay = this._onCanPlay.bind(this);
    this._onError = this._onError.bind(this);
    if (options.autoLoad !== false) {
      this.load();
    }
  }
  update(_deltaTime = 0) {
    if (!this.destroyed) {
      const elapsedMS = Ticker.shared.elapsedMS * this.source.playbackRate;
      this._msToNextUpdate = Math.floor(this._msToNextUpdate - elapsedMS);
      if (!this._updateFPS || this._msToNextUpdate <= 0) {
        super.update();
        this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0;
      }
    }
  }
  load() {
    if (this._load) {
      return this._load;
    }
    const source = this.source;
    if ((source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height) {
      source.complete = true;
    }
    source.addEventListener("play", this._onPlayStart.bind(this));
    source.addEventListener("pause", this._onPlayStop.bind(this));
    if (!this._isSourceReady()) {
      source.addEventListener("canplay", this._onCanPlay);
      source.addEventListener("canplaythrough", this._onCanPlay);
      source.addEventListener("error", this._onError, true);
    } else {
      this._onCanPlay();
    }
    this._load = new Promise((resolve) => {
      if (this.valid) {
        resolve(this);
      } else {
        this._resolve = resolve;
        source.load();
      }
    });
    return this._load;
  }
  _onError(event) {
    this.source.removeEventListener("error", this._onError, true);
    this.onError.emit(event);
  }
  _isSourcePlaying() {
    const source = this.source;
    return !source.paused && !source.ended && this._isSourceReady();
  }
  _isSourceReady() {
    const source = this.source;
    return source.readyState > 2;
  }
  _onPlayStart() {
    if (!this.valid) {
      this._onCanPlay();
    }
    if (this.autoUpdate && !this._isConnectedToTicker) {
      Ticker.shared.add(this.update, this);
      this._isConnectedToTicker = true;
    }
  }
  _onPlayStop() {
    if (this._isConnectedToTicker) {
      Ticker.shared.remove(this.update, this);
      this._isConnectedToTicker = false;
    }
  }
  _onCanPlay() {
    const source = this.source;
    source.removeEventListener("canplay", this._onCanPlay);
    source.removeEventListener("canplaythrough", this._onCanPlay);
    const valid = this.valid;
    this.resize(source.videoWidth, source.videoHeight);
    if (!valid && this._resolve) {
      this._resolve(this);
      this._resolve = null;
    }
    if (this._isSourcePlaying()) {
      this._onPlayStart();
    } else if (this.autoPlay) {
      source.play();
    }
  }
  dispose() {
    if (this._isConnectedToTicker) {
      Ticker.shared.remove(this.update, this);
      this._isConnectedToTicker = false;
    }
    const source = this.source;
    if (source) {
      source.removeEventListener("error", this._onError, true);
      source.pause();
      source.src = "";
      source.load();
    }
    super.dispose();
  }
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(value) {
    if (value !== this._autoUpdate) {
      this._autoUpdate = value;
      if (!this._autoUpdate && this._isConnectedToTicker) {
        Ticker.shared.remove(this.update, this);
        this._isConnectedToTicker = false;
      } else if (this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying()) {
        Ticker.shared.add(this.update, this);
        this._isConnectedToTicker = true;
      }
    }
  }
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(value) {
    if (value !== this._updateFPS) {
      this._updateFPS = value;
    }
  }
  static test(source, extension) {
    return globalThis.HTMLVideoElement && source instanceof HTMLVideoElement || _VideoResource.TYPES.includes(extension);
  }
};
let VideoResource = _VideoResource;
VideoResource.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"];
VideoResource.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};

INSTALLED.push(ImageBitmapResource, ImageResource, CanvasResource, VideoResource, SVGResource, BufferResource, CubeResource, ArrayResource);

class TransformFeedback {
  constructor() {
    this._glTransformFeedbacks = {};
    this.buffers = [];
    this.disposeRunner = new Runner("disposeTransformFeedback");
  }
  bindBuffer(index, buffer) {
    this.buffers[index] = buffer;
  }
  destroy() {
    this.disposeRunner.emit(this, false);
  }
}

const VERSION = "7.1.1";

class Bounds {
  constructor() {
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = -Infinity;
    this.maxY = -Infinity;
    this.rect = null;
    this.updateID = -1;
  }
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
  clear() {
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = -Infinity;
    this.maxY = -Infinity;
  }
  getRectangle(rect) {
    if (this.minX > this.maxX || this.minY > this.maxY) {
      return Rectangle.EMPTY;
    }
    rect = rect || new Rectangle(0, 0, 1, 1);
    rect.x = this.minX;
    rect.y = this.minY;
    rect.width = this.maxX - this.minX;
    rect.height = this.maxY - this.minY;
    return rect;
  }
  addPoint(point) {
    this.minX = Math.min(this.minX, point.x);
    this.maxX = Math.max(this.maxX, point.x);
    this.minY = Math.min(this.minY, point.y);
    this.maxY = Math.max(this.maxY, point.y);
  }
  addPointMatrix(matrix, point) {
    const { a, b, c, d, tx, ty } = matrix;
    const x = a * point.x + c * point.y + tx;
    const y = b * point.x + d * point.y + ty;
    this.minX = Math.min(this.minX, x);
    this.maxX = Math.max(this.maxX, x);
    this.minY = Math.min(this.minY, y);
    this.maxY = Math.max(this.maxY, y);
  }
  addQuad(vertices) {
    let minX = this.minX;
    let minY = this.minY;
    let maxX = this.maxX;
    let maxY = this.maxY;
    let x = vertices[0];
    let y = vertices[1];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    x = vertices[2];
    y = vertices[3];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    x = vertices[4];
    y = vertices[5];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    x = vertices[6];
    y = vertices[7];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }
  addFrame(transform, x0, y0, x1, y1) {
    this.addFrameMatrix(transform.worldTransform, x0, y0, x1, y1);
  }
  addFrameMatrix(matrix, x0, y0, x1, y1) {
    const a = matrix.a;
    const b = matrix.b;
    const c = matrix.c;
    const d = matrix.d;
    const tx = matrix.tx;
    const ty = matrix.ty;
    let minX = this.minX;
    let minY = this.minY;
    let maxX = this.maxX;
    let maxY = this.maxY;
    let x = a * x0 + c * y0 + tx;
    let y = b * x0 + d * y0 + ty;
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    x = a * x1 + c * y0 + tx;
    y = b * x1 + d * y0 + ty;
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    x = a * x0 + c * y1 + tx;
    y = b * x0 + d * y1 + ty;
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    x = a * x1 + c * y1 + tx;
    y = b * x1 + d * y1 + ty;
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }
  addVertexData(vertexData, beginOffset, endOffset) {
    let minX = this.minX;
    let minY = this.minY;
    let maxX = this.maxX;
    let maxY = this.maxY;
    for (let i = beginOffset; i < endOffset; i += 2) {
      const x = vertexData[i];
      const y = vertexData[i + 1];
      minX = x < minX ? x : minX;
      minY = y < minY ? y : minY;
      maxX = x > maxX ? x : maxX;
      maxY = y > maxY ? y : maxY;
    }
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }
  addVertices(transform, vertices, beginOffset, endOffset) {
    this.addVerticesMatrix(transform.worldTransform, vertices, beginOffset, endOffset);
  }
  addVerticesMatrix(matrix, vertices, beginOffset, endOffset, padX = 0, padY = padX) {
    const a = matrix.a;
    const b = matrix.b;
    const c = matrix.c;
    const d = matrix.d;
    const tx = matrix.tx;
    const ty = matrix.ty;
    let minX = this.minX;
    let minY = this.minY;
    let maxX = this.maxX;
    let maxY = this.maxY;
    for (let i = beginOffset; i < endOffset; i += 2) {
      const rawX = vertices[i];
      const rawY = vertices[i + 1];
      const x = a * rawX + c * rawY + tx;
      const y = d * rawY + b * rawX + ty;
      minX = Math.min(minX, x - padX);
      maxX = Math.max(maxX, x + padX);
      minY = Math.min(minY, y - padY);
      maxY = Math.max(maxY, y + padY);
    }
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }
  addBounds(bounds) {
    const minX = this.minX;
    const minY = this.minY;
    const maxX = this.maxX;
    const maxY = this.maxY;
    this.minX = bounds.minX < minX ? bounds.minX : minX;
    this.minY = bounds.minY < minY ? bounds.minY : minY;
    this.maxX = bounds.maxX > maxX ? bounds.maxX : maxX;
    this.maxY = bounds.maxY > maxY ? bounds.maxY : maxY;
  }
  addBoundsMask(bounds, mask) {
    const _minX = bounds.minX > mask.minX ? bounds.minX : mask.minX;
    const _minY = bounds.minY > mask.minY ? bounds.minY : mask.minY;
    const _maxX = bounds.maxX < mask.maxX ? bounds.maxX : mask.maxX;
    const _maxY = bounds.maxY < mask.maxY ? bounds.maxY : mask.maxY;
    if (_minX <= _maxX && _minY <= _maxY) {
      const minX = this.minX;
      const minY = this.minY;
      const maxX = this.maxX;
      const maxY = this.maxY;
      this.minX = _minX < minX ? _minX : minX;
      this.minY = _minY < minY ? _minY : minY;
      this.maxX = _maxX > maxX ? _maxX : maxX;
      this.maxY = _maxY > maxY ? _maxY : maxY;
    }
  }
  addBoundsMatrix(bounds, matrix) {
    this.addFrameMatrix(matrix, bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
  }
  addBoundsArea(bounds, area) {
    const _minX = bounds.minX > area.x ? bounds.minX : area.x;
    const _minY = bounds.minY > area.y ? bounds.minY : area.y;
    const _maxX = bounds.maxX < area.x + area.width ? bounds.maxX : area.x + area.width;
    const _maxY = bounds.maxY < area.y + area.height ? bounds.maxY : area.y + area.height;
    if (_minX <= _maxX && _minY <= _maxY) {
      const minX = this.minX;
      const minY = this.minY;
      const maxX = this.maxX;
      const maxY = this.maxY;
      this.minX = _minX < minX ? _minX : minX;
      this.minY = _minY < minY ? _minY : minY;
      this.maxX = _maxX > maxX ? _maxX : maxX;
      this.maxY = _maxY > maxY ? _maxY : maxY;
    }
  }
  pad(paddingX = 0, paddingY = paddingX) {
    if (!this.isEmpty()) {
      this.minX -= paddingX;
      this.maxX += paddingX;
      this.minY -= paddingY;
      this.maxY += paddingY;
    }
  }
  addFramePad(x0, y0, x1, y1, padX, padY) {
    x0 -= padX;
    y0 -= padY;
    x1 += padX;
    y1 += padY;
    this.minX = this.minX < x0 ? this.minX : x0;
    this.maxX = this.maxX > x1 ? this.maxX : x1;
    this.minY = this.minY < y0 ? this.minY : y0;
    this.maxY = this.maxY > y1 ? this.maxY : y1;
  }
}

class DisplayObject extends eventemitter3 {
  constructor() {
    super();
    this.tempDisplayObjectParent = null;
    this.transform = new Transform();
    this.alpha = 1;
    this.visible = true;
    this.renderable = true;
    this.cullable = false;
    this.cullArea = null;
    this.parent = null;
    this.worldAlpha = 1;
    this._lastSortedIndex = 0;
    this._zIndex = 0;
    this.filterArea = null;
    this.filters = null;
    this._enabledFilters = null;
    this._bounds = new Bounds();
    this._localBounds = null;
    this._boundsID = 0;
    this._boundsRect = null;
    this._localBoundsRect = null;
    this._mask = null;
    this._maskRefCount = 0;
    this._destroyed = false;
    this.isSprite = false;
    this.isMask = false;
  }
  static mixin(source) {
    const keys = Object.keys(source);
    for (let i = 0; i < keys.length; ++i) {
      const propertyName = keys[i];
      Object.defineProperty(DisplayObject.prototype, propertyName, Object.getOwnPropertyDescriptor(source, propertyName));
    }
  }
  get destroyed() {
    return this._destroyed;
  }
  _recursivePostUpdateTransform() {
    if (this.parent) {
      this.parent._recursivePostUpdateTransform();
      this.transform.updateTransform(this.parent.transform);
    } else {
      this.transform.updateTransform(this._tempDisplayObjectParent.transform);
    }
  }
  updateTransform() {
    this._boundsID++;
    this.transform.updateTransform(this.parent.transform);
    this.worldAlpha = this.alpha * this.parent.worldAlpha;
  }
  getBounds(skipUpdate, rect) {
    if (!skipUpdate) {
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent;
        this.updateTransform();
        this.parent = null;
      } else {
        this._recursivePostUpdateTransform();
        this.updateTransform();
      }
    }
    if (this._bounds.updateID !== this._boundsID) {
      this.calculateBounds();
      this._bounds.updateID = this._boundsID;
    }
    if (!rect) {
      if (!this._boundsRect) {
        this._boundsRect = new Rectangle();
      }
      rect = this._boundsRect;
    }
    return this._bounds.getRectangle(rect);
  }
  getLocalBounds(rect) {
    if (!rect) {
      if (!this._localBoundsRect) {
        this._localBoundsRect = new Rectangle();
      }
      rect = this._localBoundsRect;
    }
    if (!this._localBounds) {
      this._localBounds = new Bounds();
    }
    const transformRef = this.transform;
    const parentRef = this.parent;
    this.parent = null;
    this.transform = this._tempDisplayObjectParent.transform;
    const worldBounds = this._bounds;
    const worldBoundsID = this._boundsID;
    this._bounds = this._localBounds;
    const bounds = this.getBounds(false, rect);
    this.parent = parentRef;
    this.transform = transformRef;
    this._bounds = worldBounds;
    this._bounds.updateID += this._boundsID - worldBoundsID;
    return bounds;
  }
  toGlobal(position, point, skipUpdate = false) {
    if (!skipUpdate) {
      this._recursivePostUpdateTransform();
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent;
        this.displayObjectUpdateTransform();
        this.parent = null;
      } else {
        this.displayObjectUpdateTransform();
      }
    }
    return this.worldTransform.apply(position, point);
  }
  toLocal(position, from, point, skipUpdate) {
    if (from) {
      position = from.toGlobal(position, point, skipUpdate);
    }
    if (!skipUpdate) {
      this._recursivePostUpdateTransform();
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent;
        this.displayObjectUpdateTransform();
        this.parent = null;
      } else {
        this.displayObjectUpdateTransform();
      }
    }
    return this.worldTransform.applyInverse(position, point);
  }
  setParent(container) {
    if (!container || !container.addChild) {
      throw new Error("setParent: Argument must be a Container");
    }
    container.addChild(this);
    return container;
  }
  removeFromParent() {
    this.parent?.removeChild(this);
  }
  setTransform(x = 0, y = 0, scaleX = 1, scaleY = 1, rotation = 0, skewX = 0, skewY = 0, pivotX = 0, pivotY = 0) {
    this.position.x = x;
    this.position.y = y;
    this.scale.x = !scaleX ? 1 : scaleX;
    this.scale.y = !scaleY ? 1 : scaleY;
    this.rotation = rotation;
    this.skew.x = skewX;
    this.skew.y = skewY;
    this.pivot.x = pivotX;
    this.pivot.y = pivotY;
    return this;
  }
  destroy(_options) {
    this.removeFromParent();
    this._destroyed = true;
    this.transform = null;
    this.parent = null;
    this._bounds = null;
    this.mask = null;
    this.cullArea = null;
    this.filters = null;
    this.filterArea = null;
    this.hitArea = null;
    this.interactive = false;
    this.interactiveChildren = false;
    this.emit("destroyed");
    this.removeAllListeners();
  }
  get _tempDisplayObjectParent() {
    if (this.tempDisplayObjectParent === null) {
      this.tempDisplayObjectParent = new TemporaryDisplayObject();
    }
    return this.tempDisplayObjectParent;
  }
  enableTempParent() {
    const myParent = this.parent;
    this.parent = this._tempDisplayObjectParent;
    return myParent;
  }
  disableTempParent(cacheParent) {
    this.parent = cacheParent;
  }
  get x() {
    return this.position.x;
  }
  set x(value) {
    this.transform.position.x = value;
  }
  get y() {
    return this.position.y;
  }
  set y(value) {
    this.transform.position.y = value;
  }
  get worldTransform() {
    return this.transform.worldTransform;
  }
  get localTransform() {
    return this.transform.localTransform;
  }
  get position() {
    return this.transform.position;
  }
  set position(value) {
    this.transform.position.copyFrom(value);
  }
  get scale() {
    return this.transform.scale;
  }
  set scale(value) {
    this.transform.scale.copyFrom(value);
  }
  get pivot() {
    return this.transform.pivot;
  }
  set pivot(value) {
    this.transform.pivot.copyFrom(value);
  }
  get skew() {
    return this.transform.skew;
  }
  set skew(value) {
    this.transform.skew.copyFrom(value);
  }
  get rotation() {
    return this.transform.rotation;
  }
  set rotation(value) {
    this.transform.rotation = value;
  }
  get angle() {
    return this.transform.rotation * RAD_TO_DEG;
  }
  set angle(value) {
    this.transform.rotation = value * DEG_TO_RAD;
  }
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(value) {
    this._zIndex = value;
    if (this.parent) {
      this.parent.sortDirty = true;
    }
  }
  get worldVisible() {
    let item = this;
    do {
      if (!item.visible) {
        return false;
      }
      item = item.parent;
    } while (item);
    return true;
  }
  get mask() {
    return this._mask;
  }
  set mask(value) {
    if (this._mask === value) {
      return;
    }
    if (this._mask) {
      const maskObject = this._mask.isMaskData ? this._mask.maskObject : this._mask;
      if (maskObject) {
        maskObject._maskRefCount--;
        if (maskObject._maskRefCount === 0) {
          maskObject.renderable = true;
          maskObject.isMask = false;
        }
      }
    }
    this._mask = value;
    if (this._mask) {
      const maskObject = this._mask.isMaskData ? this._mask.maskObject : this._mask;
      if (maskObject) {
        if (maskObject._maskRefCount === 0) {
          maskObject.renderable = false;
          maskObject.isMask = true;
        }
        maskObject._maskRefCount++;
      }
    }
  }
}
class TemporaryDisplayObject extends DisplayObject {
  constructor() {
    super(...arguments);
    this.sortDirty = null;
  }
}
DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;

const tempMatrix = new Matrix();
function sortChildren(a, b) {
  if (a.zIndex === b.zIndex) {
    return a._lastSortedIndex - b._lastSortedIndex;
  }
  return a.zIndex - b.zIndex;
}
const _Container = class extends DisplayObject {
  constructor() {
    super();
    this.children = [];
    this.sortableChildren = _Container.defaultSortableChildren;
    this.sortDirty = false;
  }
  onChildrenChange(_length) {
  }
  addChild(...children) {
    if (children.length > 1) {
      for (let i = 0; i < children.length; i++) {
        this.addChild(children[i]);
      }
    } else {
      const child = children[0];
      if (child.parent) {
        child.parent.removeChild(child);
      }
      child.parent = this;
      this.sortDirty = true;
      child.transform._parentID = -1;
      this.children.push(child);
      this._boundsID++;
      this.onChildrenChange(this.children.length - 1);
      this.emit("childAdded", child, this, this.children.length - 1);
      child.emit("added", this);
    }
    return children[0];
  }
  addChildAt(child, index) {
    if (index < 0 || index > this.children.length) {
      throw new Error(`${child}addChildAt: The index ${index} supplied is out of bounds ${this.children.length}`);
    }
    if (child.parent) {
      child.parent.removeChild(child);
    }
    child.parent = this;
    this.sortDirty = true;
    child.transform._parentID = -1;
    this.children.splice(index, 0, child);
    this._boundsID++;
    this.onChildrenChange(index);
    child.emit("added", this);
    this.emit("childAdded", child, this, index);
    return child;
  }
  swapChildren(child, child2) {
    if (child === child2) {
      return;
    }
    const index1 = this.getChildIndex(child);
    const index2 = this.getChildIndex(child2);
    this.children[index1] = child2;
    this.children[index2] = child;
    this.onChildrenChange(index1 < index2 ? index1 : index2);
  }
  getChildIndex(child) {
    const index = this.children.indexOf(child);
    if (index === -1) {
      throw new Error("The supplied DisplayObject must be a child of the caller");
    }
    return index;
  }
  setChildIndex(child, index$1) {
    if (index$1 < 0 || index$1 >= this.children.length) {
      throw new Error(`The index ${index$1} supplied is out of bounds ${this.children.length}`);
    }
    const currentIndex = this.getChildIndex(child);
    removeItems(this.children, currentIndex, 1);
    this.children.splice(index$1, 0, child);
    this.onChildrenChange(index$1);
  }
  getChildAt(index) {
    if (index < 0 || index >= this.children.length) {
      throw new Error(`getChildAt: Index (${index}) does not exist.`);
    }
    return this.children[index];
  }
  removeChild(...children) {
    if (children.length > 1) {
      for (let i = 0; i < children.length; i++) {
        this.removeChild(children[i]);
      }
    } else {
      const child = children[0];
      const index$1 = this.children.indexOf(child);
      if (index$1 === -1)
        return null;
      child.parent = null;
      child.transform._parentID = -1;
      removeItems(this.children, index$1, 1);
      this._boundsID++;
      this.onChildrenChange(index$1);
      child.emit("removed", this);
      this.emit("childRemoved", child, this, index$1);
    }
    return children[0];
  }
  removeChildAt(index$1) {
    const child = this.getChildAt(index$1);
    child.parent = null;
    child.transform._parentID = -1;
    removeItems(this.children, index$1, 1);
    this._boundsID++;
    this.onChildrenChange(index$1);
    child.emit("removed", this);
    this.emit("childRemoved", child, this, index$1);
    return child;
  }
  removeChildren(beginIndex = 0, endIndex = this.children.length) {
    const begin = beginIndex;
    const end = endIndex;
    const range = end - begin;
    let removed;
    if (range > 0 && range <= end) {
      removed = this.children.splice(begin, range);
      for (let i = 0; i < removed.length; ++i) {
        removed[i].parent = null;
        if (removed[i].transform) {
          removed[i].transform._parentID = -1;
        }
      }
      this._boundsID++;
      this.onChildrenChange(beginIndex);
      for (let i = 0; i < removed.length; ++i) {
        removed[i].emit("removed", this);
        this.emit("childRemoved", removed[i], this, i);
      }
      return removed;
    } else if (range === 0 && this.children.length === 0) {
      return [];
    }
    throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
  }
  sortChildren() {
    let sortRequired = false;
    for (let i = 0, j = this.children.length; i < j; ++i) {
      const child = this.children[i];
      child._lastSortedIndex = i;
      if (!sortRequired && child.zIndex !== 0) {
        sortRequired = true;
      }
    }
    if (sortRequired && this.children.length > 1) {
      this.children.sort(sortChildren);
    }
    this.sortDirty = false;
  }
  updateTransform() {
    if (this.sortableChildren && this.sortDirty) {
      this.sortChildren();
    }
    this._boundsID++;
    this.transform.updateTransform(this.parent.transform);
    this.worldAlpha = this.alpha * this.parent.worldAlpha;
    for (let i = 0, j = this.children.length; i < j; ++i) {
      const child = this.children[i];
      if (child.visible) {
        child.updateTransform();
      }
    }
  }
  calculateBounds() {
    this._bounds.clear();
    this._calculateBounds();
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (!child.visible || !child.renderable) {
        continue;
      }
      child.calculateBounds();
      if (child._mask) {
        const maskObject = child._mask.isMaskData ? child._mask.maskObject : child._mask;
        if (maskObject) {
          maskObject.calculateBounds();
          this._bounds.addBoundsMask(child._bounds, maskObject._bounds);
        } else {
          this._bounds.addBounds(child._bounds);
        }
      } else if (child.filterArea) {
        this._bounds.addBoundsArea(child._bounds, child.filterArea);
      } else {
        this._bounds.addBounds(child._bounds);
      }
    }
    this._bounds.updateID = this._boundsID;
  }
  getLocalBounds(rect, skipChildrenUpdate = false) {
    const result = super.getLocalBounds(rect);
    if (!skipChildrenUpdate) {
      for (let i = 0, j = this.children.length; i < j; ++i) {
        const child = this.children[i];
        if (child.visible) {
          child.updateTransform();
        }
      }
    }
    return result;
  }
  _calculateBounds() {
  }
  _renderWithCulling(renderer) {
    const sourceFrame = renderer.renderTexture.sourceFrame;
    if (!(sourceFrame.width > 0 && sourceFrame.height > 0)) {
      return;
    }
    let bounds;
    let transform;
    if (this.cullArea) {
      bounds = this.cullArea;
      transform = this.worldTransform;
    } else if (this._render !== _Container.prototype._render) {
      bounds = this.getBounds(true);
    }
    const projectionTransform = renderer.projection.transform;
    if (projectionTransform) {
      if (transform) {
        transform = tempMatrix.copyFrom(transform);
        transform.prepend(projectionTransform);
      } else {
        transform = projectionTransform;
      }
    }
    if (bounds && sourceFrame.intersects(bounds, transform)) {
      this._render(renderer);
    } else if (this.cullArea) {
      return;
    }
    for (let i = 0, j = this.children.length; i < j; ++i) {
      const child = this.children[i];
      const childCullable = child.cullable;
      child.cullable = childCullable || !this.cullArea;
      child.render(renderer);
      child.cullable = childCullable;
    }
  }
  render(renderer) {
    if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
      return;
    }
    if (this._mask || this.filters?.length) {
      this.renderAdvanced(renderer);
    } else if (this.cullable) {
      this._renderWithCulling(renderer);
    } else {
      this._render(renderer);
      for (let i = 0, j = this.children.length; i < j; ++i) {
        this.children[i].render(renderer);
      }
    }
  }
  renderAdvanced(renderer) {
    const filters = this.filters;
    const mask = this._mask;
    if (filters) {
      if (!this._enabledFilters) {
        this._enabledFilters = [];
      }
      this._enabledFilters.length = 0;
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].enabled) {
          this._enabledFilters.push(filters[i]);
        }
      }
    }
    const flush = filters && this._enabledFilters?.length || mask && (!mask.isMaskData || mask.enabled && (mask.autoDetect || mask.type !== MASK_TYPES.NONE));
    if (flush) {
      renderer.batch.flush();
    }
    if (filters && this._enabledFilters?.length) {
      renderer.filter.push(this, this._enabledFilters);
    }
    if (mask) {
      renderer.mask.push(this, this._mask);
    }
    if (this.cullable) {
      this._renderWithCulling(renderer);
    } else {
      this._render(renderer);
      for (let i = 0, j = this.children.length; i < j; ++i) {
        this.children[i].render(renderer);
      }
    }
    if (flush) {
      renderer.batch.flush();
    }
    if (mask) {
      renderer.mask.pop(this);
    }
    if (filters && this._enabledFilters?.length) {
      renderer.filter.pop();
    }
  }
  _render(_renderer) {
  }
  destroy(options) {
    super.destroy();
    this.sortDirty = false;
    const destroyChildren = typeof options === "boolean" ? options : options?.children;
    const oldChildren = this.removeChildren(0, this.children.length);
    if (destroyChildren) {
      for (let i = 0; i < oldChildren.length; ++i) {
        oldChildren[i].destroy(options);
      }
    }
  }
  get width() {
    return this.scale.x * this.getLocalBounds().width;
  }
  set width(value) {
    const width = this.getLocalBounds().width;
    if (width !== 0) {
      this.scale.x = value / width;
    } else {
      this.scale.x = 1;
    }
    this._width = value;
  }
  get height() {
    return this.scale.y * this.getLocalBounds().height;
  }
  set height(value) {
    const height = this.getLocalBounds().height;
    if (height !== 0) {
      this.scale.y = value / height;
    } else {
      this.scale.y = 1;
    }
    this._height = value;
  }
};
let Container = _Container;
Container.defaultSortableChildren = false;
Container.prototype.containerUpdateTransform = Container.prototype.updateTransform;

Object.defineProperties(settings, {
  SORTABLE_CHILDREN: {
    get() {
      return Container.defaultSortableChildren;
    },
    set(value) {
      deprecation("7.1.0", "settings.SORTABLE_CHILDREN is deprecated, use Container.defaultSortableChildren");
      Container.defaultSortableChildren = value;
    }
  }
});

const tempPoint$2 = new Point();
const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
class Sprite extends Container {
  constructor(texture) {
    super();
    this._anchor = new ObservablePoint(this._onAnchorUpdate, this, texture ? texture.defaultAnchor.x : 0, texture ? texture.defaultAnchor.y : 0);
    this._texture = null;
    this._width = 0;
    this._height = 0;
    this._tint = null;
    this._tintRGB = null;
    this.tint = 16777215;
    this.blendMode = BLEND_MODES.NORMAL;
    this._cachedTint = 16777215;
    this.uvs = null;
    this.texture = texture || Texture.EMPTY;
    this.vertexData = new Float32Array(8);
    this.vertexTrimmedData = null;
    this._transformID = -1;
    this._textureID = -1;
    this._transformTrimmedID = -1;
    this._textureTrimmedID = -1;
    this.indices = indices;
    this.pluginName = "batch";
    this.isSprite = true;
    this._roundPixels = settings.ROUND_PIXELS;
  }
  _onTextureUpdate() {
    this._textureID = -1;
    this._textureTrimmedID = -1;
    this._cachedTint = 16777215;
    if (this._width) {
      this.scale.x = sign(this.scale.x) * this._width / this._texture.orig.width;
    }
    if (this._height) {
      this.scale.y = sign(this.scale.y) * this._height / this._texture.orig.height;
    }
  }
  _onAnchorUpdate() {
    this._transformID = -1;
    this._transformTrimmedID = -1;
  }
  calculateVertices() {
    const texture = this._texture;
    if (this._transformID === this.transform._worldID && this._textureID === texture._updateID) {
      return;
    }
    if (this._textureID !== texture._updateID) {
      this.uvs = this._texture._uvs.uvsFloat32;
    }
    this._transformID = this.transform._worldID;
    this._textureID = texture._updateID;
    const wt = this.transform.worldTransform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    const tx = wt.tx;
    const ty = wt.ty;
    const vertexData = this.vertexData;
    const trim = texture.trim;
    const orig = texture.orig;
    const anchor = this._anchor;
    let w0 = 0;
    let w1 = 0;
    let h0 = 0;
    let h1 = 0;
    if (trim) {
      w1 = trim.x - anchor._x * orig.width;
      w0 = w1 + trim.width;
      h1 = trim.y - anchor._y * orig.height;
      h0 = h1 + trim.height;
    } else {
      w1 = -anchor._x * orig.width;
      w0 = w1 + orig.width;
      h1 = -anchor._y * orig.height;
      h0 = h1 + orig.height;
    }
    vertexData[0] = a * w1 + c * h1 + tx;
    vertexData[1] = d * h1 + b * w1 + ty;
    vertexData[2] = a * w0 + c * h1 + tx;
    vertexData[3] = d * h1 + b * w0 + ty;
    vertexData[4] = a * w0 + c * h0 + tx;
    vertexData[5] = d * h0 + b * w0 + ty;
    vertexData[6] = a * w1 + c * h0 + tx;
    vertexData[7] = d * h0 + b * w1 + ty;
    if (this._roundPixels) {
      const resolution = settings.RESOLUTION;
      for (let i = 0; i < vertexData.length; ++i) {
        vertexData[i] = Math.round(vertexData[i] * resolution) / resolution;
      }
    }
  }
  calculateTrimmedVertices() {
    if (!this.vertexTrimmedData) {
      this.vertexTrimmedData = new Float32Array(8);
    } else if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) {
      return;
    }
    this._transformTrimmedID = this.transform._worldID;
    this._textureTrimmedID = this._texture._updateID;
    const texture = this._texture;
    const vertexData = this.vertexTrimmedData;
    const orig = texture.orig;
    const anchor = this._anchor;
    const wt = this.transform.worldTransform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    const tx = wt.tx;
    const ty = wt.ty;
    const w1 = -anchor._x * orig.width;
    const w0 = w1 + orig.width;
    const h1 = -anchor._y * orig.height;
    const h0 = h1 + orig.height;
    vertexData[0] = a * w1 + c * h1 + tx;
    vertexData[1] = d * h1 + b * w1 + ty;
    vertexData[2] = a * w0 + c * h1 + tx;
    vertexData[3] = d * h1 + b * w0 + ty;
    vertexData[4] = a * w0 + c * h0 + tx;
    vertexData[5] = d * h0 + b * w0 + ty;
    vertexData[6] = a * w1 + c * h0 + tx;
    vertexData[7] = d * h0 + b * w1 + ty;
  }
  _render(renderer) {
    this.calculateVertices();
    renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
    renderer.plugins[this.pluginName].render(this);
  }
  _calculateBounds() {
    const trim = this._texture.trim;
    const orig = this._texture.orig;
    if (!trim || trim.width === orig.width && trim.height === orig.height) {
      this.calculateVertices();
      this._bounds.addQuad(this.vertexData);
    } else {
      this.calculateTrimmedVertices();
      this._bounds.addQuad(this.vertexTrimmedData);
    }
  }
  getLocalBounds(rect) {
    if (this.children.length === 0) {
      if (!this._localBounds) {
        this._localBounds = new Bounds();
      }
      this._localBounds.minX = this._texture.orig.width * -this._anchor._x;
      this._localBounds.minY = this._texture.orig.height * -this._anchor._y;
      this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x);
      this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y);
      if (!rect) {
        if (!this._localBoundsRect) {
          this._localBoundsRect = new Rectangle();
        }
        rect = this._localBoundsRect;
      }
      return this._localBounds.getRectangle(rect);
    }
    return super.getLocalBounds.call(this, rect);
  }
  containsPoint(point) {
    this.worldTransform.applyInverse(point, tempPoint$2);
    const width = this._texture.orig.width;
    const height = this._texture.orig.height;
    const x1 = -width * this.anchor.x;
    let y1 = 0;
    if (tempPoint$2.x >= x1 && tempPoint$2.x < x1 + width) {
      y1 = -height * this.anchor.y;
      if (tempPoint$2.y >= y1 && tempPoint$2.y < y1 + height) {
        return true;
      }
    }
    return false;
  }
  destroy(options) {
    super.destroy(options);
    this._texture.off("update", this._onTextureUpdate, this);
    this._anchor = null;
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyBaseTexture = typeof options === "boolean" ? options : options?.baseTexture;
      this._texture.destroy(!!destroyBaseTexture);
    }
    this._texture = null;
  }
  static from(source, options) {
    const texture = source instanceof Texture ? source : Texture.from(source, options);
    return new Sprite(texture);
  }
  set roundPixels(value) {
    if (this._roundPixels !== value) {
      this._transformID = -1;
    }
    this._roundPixels = value;
  }
  get roundPixels() {
    return this._roundPixels;
  }
  get width() {
    return Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(value) {
    const s = sign(this.scale.x) || 1;
    this.scale.x = s * value / this._texture.orig.width;
    this._width = value;
  }
  get height() {
    return Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(value) {
    const s = sign(this.scale.y) || 1;
    this.scale.y = s * value / this._texture.orig.height;
    this._height = value;
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(value) {
    this._anchor.copyFrom(value);
  }
  get tint() {
    return this._tint;
  }
  set tint(value) {
    this._tint = value;
    this._tintRGB = (value >> 16) + (value & 65280) + ((value & 255) << 16);
  }
  get texture() {
    return this._texture;
  }
  set texture(value) {
    if (this._texture === value) {
      return;
    }
    if (this._texture) {
      this._texture.off("update", this._onTextureUpdate, this);
    }
    this._texture = value || Texture.EMPTY;
    this._cachedTint = 16777215;
    this._textureID = -1;
    this._textureTrimmedID = -1;
    if (value) {
      if (value.baseTexture.valid) {
        this._onTextureUpdate();
      } else {
        value.once("update", this._onTextureUpdate, this);
      }
    }
  }
}

const _tempMatrix = new Matrix();
DisplayObject.prototype._cacheAsBitmap = false;
DisplayObject.prototype._cacheData = null;
DisplayObject.prototype._cacheAsBitmapResolution = null;
DisplayObject.prototype._cacheAsBitmapMultisample = null;
class CacheData {
  constructor() {
    this.textureCacheId = null;
    this.originalRender = null;
    this.originalRenderCanvas = null;
    this.originalCalculateBounds = null;
    this.originalGetLocalBounds = null;
    this.originalUpdateTransform = null;
    this.originalDestroy = null;
    this.originalMask = null;
    this.originalFilterArea = null;
    this.originalContainsPoint = null;
    this.sprite = null;
  }
}
Object.defineProperties(DisplayObject.prototype, {
  cacheAsBitmapResolution: {
    get() {
      return this._cacheAsBitmapResolution;
    },
    set(resolution) {
      if (resolution === this._cacheAsBitmapResolution) {
        return;
      }
      this._cacheAsBitmapResolution = resolution;
      if (this.cacheAsBitmap) {
        this.cacheAsBitmap = false;
        this.cacheAsBitmap = true;
      }
    }
  },
  cacheAsBitmapMultisample: {
    get() {
      return this._cacheAsBitmapMultisample;
    },
    set(multisample) {
      if (multisample === this._cacheAsBitmapMultisample) {
        return;
      }
      this._cacheAsBitmapMultisample = multisample;
      if (this.cacheAsBitmap) {
        this.cacheAsBitmap = false;
        this.cacheAsBitmap = true;
      }
    }
  },
  cacheAsBitmap: {
    get() {
      return this._cacheAsBitmap;
    },
    set(value) {
      if (this._cacheAsBitmap === value) {
        return;
      }
      this._cacheAsBitmap = value;
      let data;
      if (value) {
        if (!this._cacheData) {
          this._cacheData = new CacheData();
        }
        data = this._cacheData;
        data.originalRender = this.render;
        data.originalRenderCanvas = this.renderCanvas;
        data.originalUpdateTransform = this.updateTransform;
        data.originalCalculateBounds = this.calculateBounds;
        data.originalGetLocalBounds = this.getLocalBounds;
        data.originalDestroy = this.destroy;
        data.originalContainsPoint = this.containsPoint;
        data.originalMask = this._mask;
        data.originalFilterArea = this.filterArea;
        this.render = this._renderCached;
        this.renderCanvas = this._renderCachedCanvas;
        this.destroy = this._cacheAsBitmapDestroy;
      } else {
        data = this._cacheData;
        if (data.sprite) {
          this._destroyCachedDisplayObject();
        }
        this.render = data.originalRender;
        this.renderCanvas = data.originalRenderCanvas;
        this.calculateBounds = data.originalCalculateBounds;
        this.getLocalBounds = data.originalGetLocalBounds;
        this.destroy = data.originalDestroy;
        this.updateTransform = data.originalUpdateTransform;
        this.containsPoint = data.originalContainsPoint;
        this._mask = data.originalMask;
        this.filterArea = data.originalFilterArea;
      }
    }
  }
});
DisplayObject.prototype._renderCached = function _renderCached(renderer) {
  if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
    return;
  }
  this._initCachedDisplayObject(renderer);
  this._cacheData.sprite.transform._worldID = this.transform._worldID;
  this._cacheData.sprite.worldAlpha = this.worldAlpha;
  this._cacheData.sprite._render(renderer);
};
DisplayObject.prototype._initCachedDisplayObject = function _initCachedDisplayObject(renderer) {
  if (this._cacheData?.sprite) {
    return;
  }
  const cacheAlpha = this.alpha;
  this.alpha = 1;
  renderer.batch.flush();
  const bounds = this.getLocalBounds(null, true).clone();
  if (this.filters?.length) {
    const padding = this.filters[0].padding;
    bounds.pad(padding);
  }
  bounds.ceil(settings.RESOLUTION);
  const cachedRenderTexture = renderer.renderTexture.current;
  const cachedSourceFrame = renderer.renderTexture.sourceFrame.clone();
  const cachedDestinationFrame = renderer.renderTexture.destinationFrame.clone();
  const cachedProjectionTransform = renderer.projection.transform;
  const renderTexture = RenderTexture.create({
    width: bounds.width,
    height: bounds.height,
    resolution: this.cacheAsBitmapResolution || renderer.resolution,
    multisample: this.cacheAsBitmapMultisample ?? renderer.multisample
  });
  const textureCacheId = `cacheAsBitmap_${uid()}`;
  this._cacheData.textureCacheId = textureCacheId;
  BaseTexture.addToCache(renderTexture.baseTexture, textureCacheId);
  Texture.addToCache(renderTexture, textureCacheId);
  const m = this.transform.localTransform.copyTo(_tempMatrix).invert().translate(-bounds.x, -bounds.y);
  this.render = this._cacheData.originalRender;
  renderer.render(this, { renderTexture, clear: true, transform: m, skipUpdateTransform: false });
  renderer.framebuffer.blit();
  renderer.projection.transform = cachedProjectionTransform;
  renderer.renderTexture.bind(cachedRenderTexture, cachedSourceFrame, cachedDestinationFrame);
  this.render = this._renderCached;
  this.updateTransform = this.displayObjectUpdateTransform;
  this.calculateBounds = this._calculateCachedBounds;
  this.getLocalBounds = this._getCachedLocalBounds;
  this._mask = null;
  this.filterArea = null;
  this.alpha = cacheAlpha;
  const cachedSprite = new Sprite(renderTexture);
  cachedSprite.transform.worldTransform = this.transform.worldTransform;
  cachedSprite.anchor.x = -(bounds.x / bounds.width);
  cachedSprite.anchor.y = -(bounds.y / bounds.height);
  cachedSprite.alpha = cacheAlpha;
  cachedSprite._bounds = this._bounds;
  this._cacheData.sprite = cachedSprite;
  this.transform._parentID = -1;
  if (!this.parent) {
    this.enableTempParent();
    this.updateTransform();
    this.disableTempParent(null);
  } else {
    this.updateTransform();
  }
  this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite);
};
DisplayObject.prototype._renderCachedCanvas = function _renderCachedCanvas(renderer) {
  if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
    return;
  }
  this._initCachedDisplayObjectCanvas(renderer);
  this._cacheData.sprite.worldAlpha = this.worldAlpha;
  this._cacheData.sprite._renderCanvas(renderer);
};
DisplayObject.prototype._initCachedDisplayObjectCanvas = function _initCachedDisplayObjectCanvas(renderer) {
  if (this._cacheData?.sprite) {
    return;
  }
  const bounds = this.getLocalBounds(null, true);
  const cacheAlpha = this.alpha;
  this.alpha = 1;
  const cachedRenderTarget = renderer.canvasContext.activeContext;
  const cachedProjectionTransform = renderer._projTransform;
  bounds.ceil(settings.RESOLUTION);
  const renderTexture = RenderTexture.create({ width: bounds.width, height: bounds.height });
  const textureCacheId = `cacheAsBitmap_${uid()}`;
  this._cacheData.textureCacheId = textureCacheId;
  BaseTexture.addToCache(renderTexture.baseTexture, textureCacheId);
  Texture.addToCache(renderTexture, textureCacheId);
  const m = _tempMatrix;
  this.transform.localTransform.copyTo(m);
  m.invert();
  m.tx -= bounds.x;
  m.ty -= bounds.y;
  this.renderCanvas = this._cacheData.originalRenderCanvas;
  renderer.render(this, { renderTexture, clear: true, transform: m, skipUpdateTransform: false });
  renderer.canvasContext.activeContext = cachedRenderTarget;
  renderer._projTransform = cachedProjectionTransform;
  this.renderCanvas = this._renderCachedCanvas;
  this.updateTransform = this.displayObjectUpdateTransform;
  this.calculateBounds = this._calculateCachedBounds;
  this.getLocalBounds = this._getCachedLocalBounds;
  this._mask = null;
  this.filterArea = null;
  this.alpha = cacheAlpha;
  const cachedSprite = new Sprite(renderTexture);
  cachedSprite.transform.worldTransform = this.transform.worldTransform;
  cachedSprite.anchor.x = -(bounds.x / bounds.width);
  cachedSprite.anchor.y = -(bounds.y / bounds.height);
  cachedSprite.alpha = cacheAlpha;
  cachedSprite._bounds = this._bounds;
  this._cacheData.sprite = cachedSprite;
  this.transform._parentID = -1;
  if (!this.parent) {
    this.parent = renderer._tempDisplayObjectParent;
    this.updateTransform();
    this.parent = null;
  } else {
    this.updateTransform();
  }
  this.containsPoint = cachedSprite.containsPoint.bind(cachedSprite);
};
DisplayObject.prototype._calculateCachedBounds = function _calculateCachedBounds() {
  this._bounds.clear();
  this._cacheData.sprite.transform._worldID = this.transform._worldID;
  this._cacheData.sprite._calculateBounds();
  this._bounds.updateID = this._boundsID;
};
DisplayObject.prototype._getCachedLocalBounds = function _getCachedLocalBounds() {
  return this._cacheData.sprite.getLocalBounds(null);
};
DisplayObject.prototype._destroyCachedDisplayObject = function _destroyCachedDisplayObject() {
  this._cacheData.sprite._texture.destroy(true);
  this._cacheData.sprite = null;
  BaseTexture.removeFromCache(this._cacheData.textureCacheId);
  Texture.removeFromCache(this._cacheData.textureCacheId);
  this._cacheData.textureCacheId = null;
};
DisplayObject.prototype._cacheAsBitmapDestroy = function _cacheAsBitmapDestroy(options) {
  this.cacheAsBitmap = false;
  this.destroy(options);
};

DisplayObject.prototype.name = null;
Container.prototype.getChildByName = function getChildByName(name, deep) {
  for (let i = 0, j = this.children.length; i < j; i++) {
    if (this.children[i].name === name) {
      return this.children[i];
    }
  }
  if (deep) {
    for (let i = 0, j = this.children.length; i < j; i++) {
      const child = this.children[i];
      if (!child.getChildByName) {
        continue;
      }
      const target = child.getChildByName(name, true);
      if (target) {
        return target;
      }
    }
  }
  return null;
};

DisplayObject.prototype.getGlobalPosition = function getGlobalPosition(point = new Point(), skipUpdate = false) {
  if (this.parent) {
    this.parent.toGlobal(this.position, point, skipUpdate);
  } else {
    point.x = this.position.x;
    point.y = this.position.y;
  }
  return point;
};

var fragment$6 = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n";

class AlphaFilter extends Filter {
  constructor(alpha = 1) {
    super(defaultVertex, fragment$6, { uAlpha: 1 });
    this.alpha = alpha;
  }
  get alpha() {
    return this.uniforms.uAlpha;
  }
  set alpha(value) {
    this.uniforms.uAlpha = value;
  }
}

const GAUSSIAN_VALUES = {
  5: [0.153388, 0.221461, 0.250301],
  7: [0.071303, 0.131514, 0.189879, 0.214607],
  9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
  11: [93e-4, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
  13: [2406e-6, 9255e-6, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
  15: [489e-6, 2403e-6, 9246e-6, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
};
const fragTemplate = [
  "varying vec2 vBlurTexCoords[%size%];",
  "uniform sampler2D uSampler;",
  "void main(void)",
  "{",
  "    gl_FragColor = vec4(0.0);",
  "    %blur%",
  "}"
].join("\n");
function generateBlurFragSource(kernelSize) {
  const kernel = GAUSSIAN_VALUES[kernelSize];
  const halfLength = kernel.length;
  let fragSource = fragTemplate;
  let blurLoop = "";
  const template = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;";
  let value;
  for (let i = 0; i < kernelSize; i++) {
    let blur = template.replace("%index%", i.toString());
    value = i;
    if (i >= halfLength) {
      value = kernelSize - i - 1;
    }
    blur = blur.replace("%value%", kernel[value].toString());
    blurLoop += blur;
    blurLoop += "\n";
  }
  fragSource = fragSource.replace("%blur%", blurLoop);
  fragSource = fragSource.replace("%size%", kernelSize.toString());
  return fragSource;
}

const vertTemplate = `
    attribute vec2 aVertexPosition;

    uniform mat3 projectionMatrix;

    uniform float strength;

    varying vec2 vBlurTexCoords[%size%];

    uniform vec4 inputSize;
    uniform vec4 outputFrame;

    vec4 filterVertexPosition( void )
    {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }

    vec2 filterTextureCoord( void )
    {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;
function generateBlurVertSource(kernelSize, x) {
  const halfLength = Math.ceil(kernelSize / 2);
  let vertSource = vertTemplate;
  let blurLoop = "";
  let template;
  if (x) {
    template = "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);";
  } else {
    template = "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
  }
  for (let i = 0; i < kernelSize; i++) {
    let blur = template.replace("%index%", i.toString());
    blur = blur.replace("%sampleIndex%", `${i - (halfLength - 1)}.0`);
    blurLoop += blur;
    blurLoop += "\n";
  }
  vertSource = vertSource.replace("%blur%", blurLoop);
  vertSource = vertSource.replace("%size%", kernelSize.toString());
  return vertSource;
}

class BlurFilterPass extends Filter {
  constructor(horizontal, strength = 8, quality = 4, resolution = Filter.defaultResolution, kernelSize = 5) {
    const vertSrc = generateBlurVertSource(kernelSize, horizontal);
    const fragSrc = generateBlurFragSource(kernelSize);
    super(vertSrc, fragSrc);
    this.horizontal = horizontal;
    this.resolution = resolution;
    this._quality = 0;
    this.quality = quality;
    this.blur = strength;
  }
  apply(filterManager, input, output, clearMode) {
    if (output) {
      if (this.horizontal) {
        this.uniforms.strength = 1 / output.width * (output.width / input.width);
      } else {
        this.uniforms.strength = 1 / output.height * (output.height / input.height);
      }
    } else {
      if (this.horizontal) {
        this.uniforms.strength = 1 / filterManager.renderer.width * (filterManager.renderer.width / input.width);
      } else {
        this.uniforms.strength = 1 / filterManager.renderer.height * (filterManager.renderer.height / input.height);
      }
    }
    this.uniforms.strength *= this.strength;
    this.uniforms.strength /= this.passes;
    if (this.passes === 1) {
      filterManager.applyFilter(this, input, output, clearMode);
    } else {
      const renderTarget = filterManager.getFilterTexture();
      const renderer = filterManager.renderer;
      let flip = input;
      let flop = renderTarget;
      this.state.blend = false;
      filterManager.applyFilter(this, flip, flop, CLEAR_MODES.CLEAR);
      for (let i = 1; i < this.passes - 1; i++) {
        filterManager.bindAndClear(flip, CLEAR_MODES.BLIT);
        this.uniforms.uSampler = flop;
        const temp = flop;
        flop = flip;
        flip = temp;
        renderer.shader.bind(this);
        renderer.geometry.draw(5);
      }
      this.state.blend = true;
      filterManager.applyFilter(this, flop, output, clearMode);
      filterManager.returnFilterTexture(renderTarget);
    }
  }
  get blur() {
    return this.strength;
  }
  set blur(value) {
    this.padding = 1 + Math.abs(value) * 2;
    this.strength = value;
  }
  get quality() {
    return this._quality;
  }
  set quality(value) {
    this._quality = value;
    this.passes = value;
  }
}

class BlurFilter extends Filter {
  constructor(strength = 8, quality = 4, resolution = Filter.defaultResolution, kernelSize = 5) {
    super();
    this.blurXFilter = new BlurFilterPass(true, strength, quality, resolution, kernelSize);
    this.blurYFilter = new BlurFilterPass(false, strength, quality, resolution, kernelSize);
    this.resolution = resolution;
    this.quality = quality;
    this.blur = strength;
    this.repeatEdgePixels = false;
  }
  apply(filterManager, input, output, clearMode) {
    const xStrength = Math.abs(this.blurXFilter.strength);
    const yStrength = Math.abs(this.blurYFilter.strength);
    if (xStrength && yStrength) {
      const renderTarget = filterManager.getFilterTexture();
      this.blurXFilter.apply(filterManager, input, renderTarget, CLEAR_MODES.CLEAR);
      this.blurYFilter.apply(filterManager, renderTarget, output, clearMode);
      filterManager.returnFilterTexture(renderTarget);
    } else if (yStrength) {
      this.blurYFilter.apply(filterManager, input, output, clearMode);
    } else {
      this.blurXFilter.apply(filterManager, input, output, clearMode);
    }
  }
  updatePadding() {
    if (this._repeatEdgePixels) {
      this.padding = 0;
    } else {
      this.padding = Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2;
    }
  }
  get blur() {
    return this.blurXFilter.blur;
  }
  set blur(value) {
    this.blurXFilter.blur = this.blurYFilter.blur = value;
    this.updatePadding();
  }
  get quality() {
    return this.blurXFilter.quality;
  }
  set quality(value) {
    this.blurXFilter.quality = this.blurYFilter.quality = value;
  }
  get blurX() {
    return this.blurXFilter.blur;
  }
  set blurX(value) {
    this.blurXFilter.blur = value;
    this.updatePadding();
  }
  get blurY() {
    return this.blurYFilter.blur;
  }
  set blurY(value) {
    this.blurYFilter.blur = value;
    this.updatePadding();
  }
  get blendMode() {
    return this.blurYFilter.blendMode;
  }
  set blendMode(value) {
    this.blurYFilter.blendMode = value;
  }
  get repeatEdgePixels() {
    return this._repeatEdgePixels;
  }
  set repeatEdgePixels(value) {
    this._repeatEdgePixels = value;
    this.updatePadding();
  }
}

var fragment$5 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n";

class ColorMatrixFilter extends Filter {
  constructor() {
    const uniforms = {
      m: new Float32Array([
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ]),
      uAlpha: 1
    };
    super(defaultFilterVertex, fragment$5, uniforms);
    this.alpha = 1;
  }
  _loadMatrix(matrix, multiply = false) {
    let newMatrix = matrix;
    if (multiply) {
      this._multiply(newMatrix, this.uniforms.m, matrix);
      newMatrix = this._colorMatrix(newMatrix);
    }
    this.uniforms.m = newMatrix;
  }
  _multiply(out, a, b) {
    out[0] = a[0] * b[0] + a[1] * b[5] + a[2] * b[10] + a[3] * b[15];
    out[1] = a[0] * b[1] + a[1] * b[6] + a[2] * b[11] + a[3] * b[16];
    out[2] = a[0] * b[2] + a[1] * b[7] + a[2] * b[12] + a[3] * b[17];
    out[3] = a[0] * b[3] + a[1] * b[8] + a[2] * b[13] + a[3] * b[18];
    out[4] = a[0] * b[4] + a[1] * b[9] + a[2] * b[14] + a[3] * b[19] + a[4];
    out[5] = a[5] * b[0] + a[6] * b[5] + a[7] * b[10] + a[8] * b[15];
    out[6] = a[5] * b[1] + a[6] * b[6] + a[7] * b[11] + a[8] * b[16];
    out[7] = a[5] * b[2] + a[6] * b[7] + a[7] * b[12] + a[8] * b[17];
    out[8] = a[5] * b[3] + a[6] * b[8] + a[7] * b[13] + a[8] * b[18];
    out[9] = a[5] * b[4] + a[6] * b[9] + a[7] * b[14] + a[8] * b[19] + a[9];
    out[10] = a[10] * b[0] + a[11] * b[5] + a[12] * b[10] + a[13] * b[15];
    out[11] = a[10] * b[1] + a[11] * b[6] + a[12] * b[11] + a[13] * b[16];
    out[12] = a[10] * b[2] + a[11] * b[7] + a[12] * b[12] + a[13] * b[17];
    out[13] = a[10] * b[3] + a[11] * b[8] + a[12] * b[13] + a[13] * b[18];
    out[14] = a[10] * b[4] + a[11] * b[9] + a[12] * b[14] + a[13] * b[19] + a[14];
    out[15] = a[15] * b[0] + a[16] * b[5] + a[17] * b[10] + a[18] * b[15];
    out[16] = a[15] * b[1] + a[16] * b[6] + a[17] * b[11] + a[18] * b[16];
    out[17] = a[15] * b[2] + a[16] * b[7] + a[17] * b[12] + a[18] * b[17];
    out[18] = a[15] * b[3] + a[16] * b[8] + a[17] * b[13] + a[18] * b[18];
    out[19] = a[15] * b[4] + a[16] * b[9] + a[17] * b[14] + a[18] * b[19] + a[19];
    return out;
  }
  _colorMatrix(matrix) {
    const m = new Float32Array(matrix);
    m[4] /= 255;
    m[9] /= 255;
    m[14] /= 255;
    m[19] /= 255;
    return m;
  }
  brightness(b, multiply) {
    const matrix = [
      b,
      0,
      0,
      0,
      0,
      0,
      b,
      0,
      0,
      0,
      0,
      0,
      b,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  tint(color, multiply) {
    const r = color >> 16 & 255;
    const g = color >> 8 & 255;
    const b = color & 255;
    const matrix = [
      r / 255,
      0,
      0,
      0,
      0,
      0,
      g / 255,
      0,
      0,
      0,
      0,
      0,
      b / 255,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  greyscale(scale, multiply) {
    const matrix = [
      scale,
      scale,
      scale,
      0,
      0,
      scale,
      scale,
      scale,
      0,
      0,
      scale,
      scale,
      scale,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  blackAndWhite(multiply) {
    const matrix = [
      0.3,
      0.6,
      0.1,
      0,
      0,
      0.3,
      0.6,
      0.1,
      0,
      0,
      0.3,
      0.6,
      0.1,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  hue(rotation, multiply) {
    rotation = (rotation || 0) / 180 * Math.PI;
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    const sqrt = Math.sqrt;
    const w = 1 / 3;
    const sqrW = sqrt(w);
    const a00 = cosR + (1 - cosR) * w;
    const a01 = w * (1 - cosR) - sqrW * sinR;
    const a02 = w * (1 - cosR) + sqrW * sinR;
    const a10 = w * (1 - cosR) + sqrW * sinR;
    const a11 = cosR + w * (1 - cosR);
    const a12 = w * (1 - cosR) - sqrW * sinR;
    const a20 = w * (1 - cosR) - sqrW * sinR;
    const a21 = w * (1 - cosR) + sqrW * sinR;
    const a22 = cosR + w * (1 - cosR);
    const matrix = [
      a00,
      a01,
      a02,
      0,
      0,
      a10,
      a11,
      a12,
      0,
      0,
      a20,
      a21,
      a22,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  contrast(amount, multiply) {
    const v = (amount || 0) + 1;
    const o = -0.5 * (v - 1);
    const matrix = [
      v,
      0,
      0,
      0,
      o,
      0,
      v,
      0,
      0,
      o,
      0,
      0,
      v,
      0,
      o,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  saturate(amount = 0, multiply) {
    const x = amount * 2 / 3 + 1;
    const y = (x - 1) * -0.5;
    const matrix = [
      x,
      y,
      y,
      0,
      0,
      y,
      x,
      y,
      0,
      0,
      y,
      y,
      x,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  desaturate() {
    this.saturate(-1);
  }
  negative(multiply) {
    const matrix = [
      -1,
      0,
      0,
      1,
      0,
      0,
      -1,
      0,
      1,
      0,
      0,
      0,
      -1,
      1,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  sepia(multiply) {
    const matrix = [
      0.393,
      0.7689999,
      0.18899999,
      0,
      0,
      0.349,
      0.6859999,
      0.16799999,
      0,
      0,
      0.272,
      0.5339999,
      0.13099999,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  technicolor(multiply) {
    const matrix = [
      1.9125277891456083,
      -0.8545344976951645,
      -0.09155508482755585,
      0,
      11.793603434377337,
      -0.3087833385928097,
      1.7658908555458428,
      -0.10601743074722245,
      0,
      -70.35205161461398,
      -0.231103377548616,
      -0.7501899197440212,
      1.847597816108189,
      0,
      30.950940869491138,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  polaroid(multiply) {
    const matrix = [
      1.438,
      -0.062,
      -0.062,
      0,
      0,
      -0.122,
      1.378,
      -0.122,
      0,
      0,
      -0.016,
      -0.016,
      1.483,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  toBGR(multiply) {
    const matrix = [
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  kodachrome(multiply) {
    const matrix = [
      1.1285582396593525,
      -0.3967382283601348,
      -0.03992559172921793,
      0,
      63.72958762196502,
      -0.16404339962244616,
      1.0835251566291304,
      -0.05498805115633132,
      0,
      24.732407896706203,
      -0.16786010706155763,
      -0.5603416277695248,
      1.6014850761964943,
      0,
      35.62982807460946,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  browni(multiply) {
    const matrix = [
      0.5997023498159715,
      0.34553243048391263,
      -0.2708298674538042,
      0,
      47.43192855600873,
      -0.037703249837783157,
      0.8609577587992641,
      0.15059552388459913,
      0,
      -36.96841498319127,
      0.24113635128153335,
      -0.07441037908422492,
      0.44972182064877153,
      0,
      -7.562075277591283,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  vintage(multiply) {
    const matrix = [
      0.6279345635605994,
      0.3202183420819367,
      -0.03965408211312453,
      0,
      9.651285835294123,
      0.02578397704808868,
      0.6441188644374771,
      0.03259127616149294,
      0,
      7.462829176470591,
      0.0466055556782719,
      -0.0851232987247891,
      0.5241648018700465,
      0,
      5.159190588235296,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  colorTone(desaturation, toned, lightColor, darkColor, multiply) {
    desaturation = desaturation || 0.2;
    toned = toned || 0.15;
    lightColor = lightColor || 16770432;
    darkColor = darkColor || 3375104;
    const lR = (lightColor >> 16 & 255) / 255;
    const lG = (lightColor >> 8 & 255) / 255;
    const lB = (lightColor & 255) / 255;
    const dR = (darkColor >> 16 & 255) / 255;
    const dG = (darkColor >> 8 & 255) / 255;
    const dB = (darkColor & 255) / 255;
    const matrix = [
      0.3,
      0.59,
      0.11,
      0,
      0,
      lR,
      lG,
      lB,
      desaturation,
      0,
      dR,
      dG,
      dB,
      toned,
      0,
      lR - dR,
      lG - dG,
      lB - dB,
      0,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  night(intensity, multiply) {
    intensity = intensity || 0.1;
    const matrix = [
      intensity * -2,
      -intensity,
      0,
      0,
      0,
      -intensity,
      0,
      intensity,
      0,
      0,
      0,
      intensity,
      intensity * 2,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  predator(amount, multiply) {
    const matrix = [
      11.224130630493164 * amount,
      -4.794486999511719 * amount,
      -2.8746118545532227 * amount,
      0 * amount,
      0.40342438220977783 * amount,
      -3.6330697536468506 * amount,
      9.193157196044922 * amount,
      -2.951810836791992 * amount,
      0 * amount,
      -1.316135048866272 * amount,
      -3.2184197902679443 * amount,
      -4.2375030517578125 * amount,
      7.476448059082031 * amount,
      0 * amount,
      0.8044459223747253 * amount,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  lsd(multiply) {
    const matrix = [
      2,
      -0.4,
      0.5,
      0,
      0,
      -0.5,
      2,
      -0.4,
      0,
      0,
      -0.4,
      -0.5,
      3,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, multiply);
  }
  reset() {
    const matrix = [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(matrix, false);
  }
  get matrix() {
    return this.uniforms.m;
  }
  set matrix(value) {
    this.uniforms.m = value;
  }
  get alpha() {
    return this.uniforms.uAlpha;
  }
  set alpha(value) {
    this.uniforms.uAlpha = value;
  }
}
ColorMatrixFilter.prototype.grayscale = ColorMatrixFilter.prototype.greyscale;

var fragment$4 = "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\nuniform mat2 rotation;\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform highp vec4 inputSize;\nuniform vec4 inputClamp;\n\nvoid main(void)\n{\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n  map -= 0.5;\n  map.xy = scale * inputSize.zw * (rotation * map.xy);\n\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));\n}\n";

var vertex$3 = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n\tgl_Position = filterVertexPosition();\n\tvTextureCoord = filterTextureCoord();\n\tvFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;\n}\n";

class DisplacementFilter extends Filter {
  constructor(sprite, scale) {
    const maskMatrix = new Matrix();
    sprite.renderable = false;
    super(vertex$3, fragment$4, {
      mapSampler: sprite._texture,
      filterMatrix: maskMatrix,
      scale: { x: 1, y: 1 },
      rotation: new Float32Array([1, 0, 0, 1])
    });
    this.maskSprite = sprite;
    this.maskMatrix = maskMatrix;
    if (scale === null || scale === void 0) {
      scale = 20;
    }
    this.scale = new Point(scale, scale);
  }
  apply(filterManager, input, output, clearMode) {
    this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, this.maskSprite);
    this.uniforms.scale.x = this.scale.x;
    this.uniforms.scale.y = this.scale.y;
    const wt = this.maskSprite.worldTransform;
    const lenX = Math.sqrt(wt.a * wt.a + wt.b * wt.b);
    const lenY = Math.sqrt(wt.c * wt.c + wt.d * wt.d);
    if (lenX !== 0 && lenY !== 0) {
      this.uniforms.rotation[0] = wt.a / lenX;
      this.uniforms.rotation[1] = wt.b / lenX;
      this.uniforms.rotation[2] = wt.c / lenY;
      this.uniforms.rotation[3] = wt.d / lenY;
    }
    filterManager.applyFilter(this, input, output, clearMode);
  }
  get map() {
    return this.uniforms.mapSampler;
  }
  set map(value) {
    this.uniforms.mapSampler = value;
  }
}

var fragment$3 = "varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\nuniform sampler2D uSampler;\nuniform highp vec4 inputSize;\n\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it's\n unsupported by WebGL.\n\n --\n\n From:\n https://github.com/mitsuhiko/webgl-meincraft\n\n Copyright (c) 2011 by Armin Ronacher.\n\n Some rights reserved.\n\n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n\n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n\n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n\n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec4 color;\n\n      color = fxaa(uSampler, vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n";

var vertex$2 = "\nattribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvoid texcoords(vec2 fragCoord, vec2 inverseVP,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = filterVertexPosition();\n\n   vFragCoord = aVertexPosition * outputFrame.zw;\n\n   texcoords(vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n";

class FXAAFilter extends Filter {
  constructor() {
    super(vertex$2, fragment$3);
  }
}

var fragment$2 = "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n";

class NoiseFilter extends Filter {
  constructor(noise = 0.5, seed = Math.random()) {
    super(defaultFilterVertex, fragment$2, {
      uNoise: 0,
      uSeed: 0
    });
    this.noise = noise;
    this.seed = seed;
  }
  get noise() {
    return this.uniforms.uNoise;
  }
  set noise(value) {
    this.uniforms.uNoise = value;
  }
  get seed() {
    return this.uniforms.uSeed;
  }
  set seed(value) {
    this.uniforms.uSeed = value;
  }
}

const filters = {
  AlphaFilter,
  BlurFilter,
  BlurFilterPass,
  ColorMatrixFilter,
  DisplacementFilter,
  FXAAFilter,
  NoiseFilter
};
Object.entries(filters).forEach(([key, FilterClass]) => {
  Object.defineProperty(filters, key, {
    get() {
      deprecation("7.1.0", `filters.${key} has moved to ${key}`);
      return FilterClass;
    }
  });
});

class FederatedEvent {
  constructor(manager) {
    this.bubbles = true;
    this.cancelBubble = true;
    this.cancelable = false;
    this.composed = false;
    this.defaultPrevented = false;
    this.eventPhase = FederatedEvent.prototype.NONE;
    this.propagationStopped = false;
    this.propagationImmediatelyStopped = false;
    this.layer = new Point();
    this.page = new Point();
    this.AT_TARGET = 1;
    this.BUBBLING_PHASE = 2;
    this.CAPTURING_PHASE = 3;
    this.NONE = 0;
    this.manager = manager;
  }
  get layerX() {
    return this.layer.x;
  }
  get layerY() {
    return this.layer.y;
  }
  get pageX() {
    return this.page.x;
  }
  get pageY() {
    return this.page.y;
  }
  get data() {
    return this;
  }
  composedPath() {
    if (this.manager && (!this.path || this.path[this.path.length - 1] !== this.target)) {
      this.path = this.target ? this.manager.propagationPath(this.target) : [];
    }
    return this.path;
  }
  initEvent(_type, _bubbles, _cancelable) {
    throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
  }
  initUIEvent(_typeArg, _bubblesArg, _cancelableArg, _viewArg, _detailArg) {
    throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
  }
  preventDefault() {
    if (this.nativeEvent instanceof Event && this.nativeEvent.cancelable) {
      this.nativeEvent.preventDefault();
    }
    this.defaultPrevented = true;
  }
  stopImmediatePropagation() {
    this.propagationImmediatelyStopped = true;
  }
  stopPropagation() {
    this.propagationStopped = true;
  }
}

class FederatedMouseEvent extends FederatedEvent {
  constructor() {
    super(...arguments);
    this.client = new Point();
    this.movement = new Point();
    this.offset = new Point();
    this.global = new Point();
    this.screen = new Point();
  }
  get clientX() {
    return this.client.x;
  }
  get clientY() {
    return this.client.y;
  }
  get x() {
    return this.clientX;
  }
  get y() {
    return this.clientY;
  }
  get movementX() {
    return this.movement.x;
  }
  get movementY() {
    return this.movement.y;
  }
  get offsetX() {
    return this.offset.x;
  }
  get offsetY() {
    return this.offset.y;
  }
  get globalX() {
    return this.global.x;
  }
  get globalY() {
    return this.global.y;
  }
  get screenX() {
    return this.screen.x;
  }
  get screenY() {
    return this.screen.y;
  }
  getModifierState(key) {
    return "getModifierState" in this.nativeEvent && this.nativeEvent.getModifierState(key);
  }
  initMouseEvent(_typeArg, _canBubbleArg, _cancelableArg, _viewArg, _detailArg, _screenXArg, _screenYArg, _clientXArg, _clientYArg, _ctrlKeyArg, _altKeyArg, _shiftKeyArg, _metaKeyArg, _buttonArg, _relatedTargetArg) {
    throw new Error("Method not implemented.");
  }
}

class FederatedPointerEvent extends FederatedMouseEvent {
  constructor() {
    super(...arguments);
    this.width = 0;
    this.height = 0;
    this.isPrimary = false;
  }
  getCoalescedEvents() {
    if (this.type === "pointermove" || this.type === "mousemove" || this.type === "touchmove") {
      return [this];
    }
    return [];
  }
  getPredictedEvents() {
    throw new Error("getPredictedEvents is not supported!");
  }
}

class FederatedWheelEvent extends FederatedMouseEvent {
  constructor() {
    super(...arguments);
    this.DOM_DELTA_LINE = 0;
    this.DOM_DELTA_PAGE = 1;
    this.DOM_DELTA_PIXEL = 2;
  }
}

const PROPAGATION_LIMIT = 2048;
const tempHitLocation = new Point();
const tempLocalMapping = new Point();
class EventBoundary {
  constructor(rootTarget) {
    this.dispatch = new eventemitter3();
    this.moveOnAll = false;
    this.mappingState = {
      trackingData: {}
    };
    this.eventPool = /* @__PURE__ */ new Map();
    this.rootTarget = rootTarget;
    this.hitPruneFn = this.hitPruneFn.bind(this);
    this.hitTestFn = this.hitTestFn.bind(this);
    this.mapPointerDown = this.mapPointerDown.bind(this);
    this.mapPointerMove = this.mapPointerMove.bind(this);
    this.mapPointerOut = this.mapPointerOut.bind(this);
    this.mapPointerOver = this.mapPointerOver.bind(this);
    this.mapPointerUp = this.mapPointerUp.bind(this);
    this.mapPointerUpOutside = this.mapPointerUpOutside.bind(this);
    this.mapWheel = this.mapWheel.bind(this);
    this.mappingTable = {};
    this.addEventMapping("pointerdown", this.mapPointerDown);
    this.addEventMapping("pointermove", this.mapPointerMove);
    this.addEventMapping("pointerout", this.mapPointerOut);
    this.addEventMapping("pointerleave", this.mapPointerOut);
    this.addEventMapping("pointerover", this.mapPointerOver);
    this.addEventMapping("pointerup", this.mapPointerUp);
    this.addEventMapping("pointerupoutside", this.mapPointerUpOutside);
    this.addEventMapping("wheel", this.mapWheel);
  }
  addEventMapping(type, fn) {
    if (!this.mappingTable[type]) {
      this.mappingTable[type] = [];
    }
    this.mappingTable[type].push({
      fn,
      priority: 0
    });
    this.mappingTable[type].sort((a, b) => a.priority - b.priority);
  }
  dispatchEvent(e, type) {
    e.propagationStopped = false;
    e.propagationImmediatelyStopped = false;
    this.propagate(e, type);
    this.dispatch.emit(type || e.type, e);
  }
  mapEvent(e) {
    if (!this.rootTarget) {
      return;
    }
    const mappers = this.mappingTable[e.type];
    if (mappers) {
      for (let i = 0, j = mappers.length; i < j; i++) {
        mappers[i].fn(e);
      }
    } else {
      console.warn(`[EventBoundary]: Event mapping not defined for ${e.type}`);
    }
  }
  hitTest(x, y) {
    const invertedPath = this.hitTestRecursive(this.rootTarget, this.rootTarget.interactive, tempHitLocation.set(x, y), this.hitTestFn, this.hitPruneFn);
    return invertedPath && invertedPath[0];
  }
  propagate(e, type) {
    if (!e.target) {
      return;
    }
    const composedPath = e.composedPath();
    e.eventPhase = e.CAPTURING_PHASE;
    for (let i = 0, j = composedPath.length - 1; i < j; i++) {
      e.currentTarget = composedPath[i];
      this.notifyTarget(e, type);
      if (e.propagationStopped || e.propagationImmediatelyStopped)
        return;
    }
    e.eventPhase = e.AT_TARGET;
    e.currentTarget = e.target;
    this.notifyTarget(e, type);
    if (e.propagationStopped || e.propagationImmediatelyStopped)
      return;
    e.eventPhase = e.BUBBLING_PHASE;
    for (let i = composedPath.length - 2; i >= 0; i--) {
      e.currentTarget = composedPath[i];
      this.notifyTarget(e, type);
      if (e.propagationStopped || e.propagationImmediatelyStopped)
        return;
    }
  }
  all(e, type, target = this.rootTarget) {
    e.eventPhase = e.BUBBLING_PHASE;
    const children = target.children;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        this.all(e, type, children[i]);
      }
    }
    e.currentTarget = target;
    this.notifyTarget(e, type);
  }
  propagationPath(target) {
    const propagationPath = [target];
    for (let i = 0; i < PROPAGATION_LIMIT && target !== this.rootTarget; i++) {
      if (!target.parent) {
        throw new Error("Cannot find propagation path to disconnected target");
      }
      propagationPath.push(target.parent);
      target = target.parent;
    }
    propagationPath.reverse();
    return propagationPath;
  }
  hitTestRecursive(currentTarget, interactive, location, testFn, pruneFn) {
    if (!currentTarget || !currentTarget.visible) {
      return null;
    }
    if (pruneFn(currentTarget, location)) {
      return null;
    }
    if (currentTarget.interactiveChildren && currentTarget.children) {
      const children = currentTarget.children;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        const nestedHit = this.hitTestRecursive(child, interactive || child.interactive, location, testFn, pruneFn);
        if (nestedHit) {
          if (nestedHit.length > 0 && !nestedHit[nestedHit.length - 1].parent) {
            continue;
          }
          if (nestedHit.length > 0 || currentTarget.interactive) {
            nestedHit.push(currentTarget);
          }
          return nestedHit;
        }
      }
    }
    if (interactive && testFn(currentTarget, location)) {
      return currentTarget.interactive ? [currentTarget] : [];
    }
    return null;
  }
  hitPruneFn(displayObject, location) {
    if (displayObject.hitArea) {
      displayObject.worldTransform.applyInverse(location, tempLocalMapping);
      if (!displayObject.hitArea.contains(tempLocalMapping.x, tempLocalMapping.y)) {
        return true;
      }
    }
    if (displayObject._mask) {
      const maskObject = displayObject._mask.isMaskData ? displayObject._mask.maskObject : displayObject._mask;
      if (maskObject && !maskObject.containsPoint?.(location)) {
        return true;
      }
    }
    return false;
  }
  hitTestFn(displayObject, location) {
    if (displayObject.hitArea) {
      return true;
    }
    if (displayObject.containsPoint) {
      return displayObject.containsPoint(location);
    }
    return false;
  }
  notifyTarget(e, type) {
    type = type ?? e.type;
    const handlerKey = `on${type}`;
    e.currentTarget[handlerKey]?.(e);
    const key = e.eventPhase === e.CAPTURING_PHASE || e.eventPhase === e.AT_TARGET ? `${type}capture` : type;
    this.notifyListeners(e, key);
    if (e.eventPhase === e.AT_TARGET) {
      this.notifyListeners(e, type);
    }
  }
  mapPointerDown(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = this.createPointerEvent(from);
    this.dispatchEvent(e, "pointerdown");
    if (e.pointerType === "touch") {
      this.dispatchEvent(e, "touchstart");
    } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
      const isRightButton = e.button === 2;
      this.dispatchEvent(e, isRightButton ? "rightdown" : "mousedown");
    }
    const trackingData = this.trackingData(from.pointerId);
    trackingData.pressTargetsByButton[from.button] = e.composedPath();
    this.freeEvent(e);
  }
  mapPointerMove(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const e = this.createPointerEvent(from);
    const isMouse = e.pointerType === "mouse" || e.pointerType === "pen";
    const trackingData = this.trackingData(from.pointerId);
    const outTarget = this.findMountedTarget(trackingData.overTargets);
    if (trackingData.overTargets?.length > 0 && outTarget !== e.target) {
      const outType = from.type === "mousemove" ? "mouseout" : "pointerout";
      const outEvent = this.createPointerEvent(from, outType, outTarget);
      this.dispatchEvent(outEvent, "pointerout");
      if (isMouse)
        this.dispatchEvent(outEvent, "mouseout");
      if (!e.composedPath().includes(outTarget)) {
        const leaveEvent = this.createPointerEvent(from, "pointerleave", outTarget);
        leaveEvent.eventPhase = leaveEvent.AT_TARGET;
        while (leaveEvent.target && !e.composedPath().includes(leaveEvent.target)) {
          leaveEvent.currentTarget = leaveEvent.target;
          this.notifyTarget(leaveEvent);
          if (isMouse)
            this.notifyTarget(leaveEvent, "mouseleave");
          leaveEvent.target = leaveEvent.target.parent;
        }
        this.freeEvent(leaveEvent);
      }
      this.freeEvent(outEvent);
    }
    if (outTarget !== e.target) {
      const overType = from.type === "mousemove" ? "mouseover" : "pointerover";
      const overEvent = this.clonePointerEvent(e, overType);
      this.dispatchEvent(overEvent, "pointerover");
      if (isMouse)
        this.dispatchEvent(overEvent, "mouseover");
      let overTargetAncestor = outTarget?.parent;
      while (overTargetAncestor && overTargetAncestor !== this.rootTarget.parent) {
        if (overTargetAncestor === e.target)
          break;
        overTargetAncestor = overTargetAncestor.parent;
      }
      const didPointerEnter = !overTargetAncestor || overTargetAncestor === this.rootTarget.parent;
      if (didPointerEnter) {
        const enterEvent = this.clonePointerEvent(e, "pointerenter");
        enterEvent.eventPhase = enterEvent.AT_TARGET;
        while (enterEvent.target && enterEvent.target !== outTarget && enterEvent.target !== this.rootTarget.parent) {
          enterEvent.currentTarget = enterEvent.target;
          this.notifyTarget(enterEvent);
          if (isMouse)
            this.notifyTarget(enterEvent, "mouseenter");
          enterEvent.target = enterEvent.target.parent;
        }
        this.freeEvent(enterEvent);
      }
      this.freeEvent(overEvent);
    }
    const propagationMethod = this.moveOnAll ? "all" : "dispatchEvent";
    this[propagationMethod](e, "pointermove");
    this.all(e, "globalpointermove");
    if (e.pointerType === "touch") {
      this[propagationMethod](e, "touchmove");
      this.all(e, "globaltouchmove");
    }
    if (isMouse) {
      this[propagationMethod](e, "mousemove");
      this.all(e, "globalmousemove");
      this.cursor = e.target?.cursor;
    }
    trackingData.overTargets = e.composedPath();
    this.freeEvent(e);
  }
  mapPointerOver(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const trackingData = this.trackingData(from.pointerId);
    const e = this.createPointerEvent(from);
    const isMouse = e.pointerType === "mouse" || e.pointerType === "pen";
    this.dispatchEvent(e, "pointerover");
    if (isMouse)
      this.dispatchEvent(e, "mouseover");
    if (e.pointerType === "mouse")
      this.cursor = e.target?.cursor;
    const enterEvent = this.clonePointerEvent(e, "pointerenter");
    enterEvent.eventPhase = enterEvent.AT_TARGET;
    while (enterEvent.target && enterEvent.target !== this.rootTarget.parent) {
      enterEvent.currentTarget = enterEvent.target;
      this.notifyTarget(enterEvent);
      if (isMouse)
        this.notifyTarget(enterEvent, "mouseenter");
      enterEvent.target = enterEvent.target.parent;
    }
    trackingData.overTargets = e.composedPath();
    this.freeEvent(e);
    this.freeEvent(enterEvent);
  }
  mapPointerOut(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const trackingData = this.trackingData(from.pointerId);
    if (trackingData.overTargets) {
      const isMouse = from.pointerType === "mouse" || from.pointerType === "pen";
      const outTarget = this.findMountedTarget(trackingData.overTargets);
      const outEvent = this.createPointerEvent(from, "pointerout", outTarget);
      this.dispatchEvent(outEvent);
      if (isMouse)
        this.dispatchEvent(outEvent, "mouseout");
      const leaveEvent = this.createPointerEvent(from, "pointerleave", outTarget);
      leaveEvent.eventPhase = leaveEvent.AT_TARGET;
      while (leaveEvent.target && leaveEvent.target !== this.rootTarget.parent) {
        leaveEvent.currentTarget = leaveEvent.target;
        this.notifyTarget(leaveEvent);
        if (isMouse)
          this.notifyTarget(leaveEvent, "mouseleave");
        leaveEvent.target = leaveEvent.target.parent;
      }
      trackingData.overTargets = null;
      this.freeEvent(outEvent);
      this.freeEvent(leaveEvent);
    }
    this.cursor = null;
  }
  mapPointerUp(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const now = performance.now();
    const e = this.createPointerEvent(from);
    this.dispatchEvent(e, "pointerup");
    if (e.pointerType === "touch") {
      this.dispatchEvent(e, "touchend");
    } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
      const isRightButton = e.button === 2;
      this.dispatchEvent(e, isRightButton ? "rightup" : "mouseup");
    }
    const trackingData = this.trackingData(from.pointerId);
    const pressTarget = this.findMountedTarget(trackingData.pressTargetsByButton[from.button]);
    let clickTarget = pressTarget;
    if (pressTarget && !e.composedPath().includes(pressTarget)) {
      let currentTarget = pressTarget;
      while (currentTarget && !e.composedPath().includes(currentTarget)) {
        e.currentTarget = currentTarget;
        this.notifyTarget(e, "pointerupoutside");
        if (e.pointerType === "touch") {
          this.notifyTarget(e, "touchendoutside");
        } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
          const isRightButton = e.button === 2;
          this.notifyTarget(e, isRightButton ? "rightupoutside" : "mouseupoutside");
        }
        currentTarget = currentTarget.parent;
      }
      delete trackingData.pressTargetsByButton[from.button];
      clickTarget = currentTarget;
    }
    if (clickTarget) {
      const clickEvent = this.clonePointerEvent(e, "click");
      clickEvent.target = clickTarget;
      clickEvent.path = null;
      if (!trackingData.clicksByButton[from.button]) {
        trackingData.clicksByButton[from.button] = {
          clickCount: 0,
          target: clickEvent.target,
          timeStamp: now
        };
      }
      const clickHistory = trackingData.clicksByButton[from.button];
      if (clickHistory.target === clickEvent.target && now - clickHistory.timeStamp < 200) {
        ++clickHistory.clickCount;
      } else {
        clickHistory.clickCount = 1;
      }
      clickHistory.target = clickEvent.target;
      clickHistory.timeStamp = now;
      clickEvent.detail = clickHistory.clickCount;
      if (clickEvent.pointerType === "mouse") {
        this.dispatchEvent(clickEvent, "click");
      } else if (clickEvent.pointerType === "touch") {
        this.dispatchEvent(clickEvent, "tap");
      }
      this.dispatchEvent(clickEvent, "pointertap");
      this.freeEvent(clickEvent);
    }
    this.freeEvent(e);
  }
  mapPointerUpOutside(from) {
    if (!(from instanceof FederatedPointerEvent)) {
      console.warn("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const trackingData = this.trackingData(from.pointerId);
    const pressTarget = this.findMountedTarget(trackingData.pressTargetsByButton[from.button]);
    const e = this.createPointerEvent(from);
    if (pressTarget) {
      let currentTarget = pressTarget;
      while (currentTarget) {
        e.currentTarget = currentTarget;
        this.notifyTarget(e, "pointerupoutside");
        if (e.pointerType === "touch") {
          this.notifyTarget(e, "touchendoutside");
        } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
          this.notifyTarget(e, e.button === 2 ? "rightupoutside" : "mouseupoutside");
        }
        currentTarget = currentTarget.parent;
      }
      delete trackingData.pressTargetsByButton[from.button];
    }
    this.freeEvent(e);
  }
  mapWheel(from) {
    if (!(from instanceof FederatedWheelEvent)) {
      console.warn("EventBoundary cannot map a non-wheel event as a wheel event");
      return;
    }
    const wheelEvent = this.createWheelEvent(from);
    this.dispatchEvent(wheelEvent);
    this.freeEvent(wheelEvent);
  }
  findMountedTarget(propagationPath) {
    if (!propagationPath) {
      return null;
    }
    let currentTarget = propagationPath[0];
    for (let i = 1; i < propagationPath.length; i++) {
      if (propagationPath[i].parent === currentTarget) {
        currentTarget = propagationPath[i];
      } else {
        break;
      }
    }
    return currentTarget;
  }
  createPointerEvent(from, type, target) {
    const event = this.allocateEvent(FederatedPointerEvent);
    this.copyPointerData(from, event);
    this.copyMouseData(from, event);
    this.copyData(from, event);
    event.nativeEvent = from.nativeEvent;
    event.originalEvent = from;
    event.target = target ?? this.hitTest(event.global.x, event.global.y);
    if (typeof type === "string") {
      event.type = type;
    }
    return event;
  }
  createWheelEvent(from) {
    const event = this.allocateEvent(FederatedWheelEvent);
    this.copyWheelData(from, event);
    this.copyMouseData(from, event);
    this.copyData(from, event);
    event.nativeEvent = from.nativeEvent;
    event.originalEvent = from;
    event.target = this.hitTest(event.global.x, event.global.y);
    return event;
  }
  clonePointerEvent(from, type) {
    const event = this.allocateEvent(FederatedPointerEvent);
    event.nativeEvent = from.nativeEvent;
    event.originalEvent = from.originalEvent;
    this.copyPointerData(from, event);
    this.copyMouseData(from, event);
    this.copyData(from, event);
    event.target = from.target;
    event.path = from.composedPath().slice();
    event.type = type ?? event.type;
    return event;
  }
  copyWheelData(from, to) {
    to.deltaMode = from.deltaMode;
    to.deltaX = from.deltaX;
    to.deltaY = from.deltaY;
    to.deltaZ = from.deltaZ;
  }
  copyPointerData(from, to) {
    if (!(from instanceof FederatedPointerEvent && to instanceof FederatedPointerEvent))
      return;
    to.pointerId = from.pointerId;
    to.width = from.width;
    to.height = from.height;
    to.isPrimary = from.isPrimary;
    to.pointerType = from.pointerType;
    to.pressure = from.pressure;
    to.tangentialPressure = from.tangentialPressure;
    to.tiltX = from.tiltX;
    to.tiltY = from.tiltY;
    to.twist = from.twist;
  }
  copyMouseData(from, to) {
    if (!(from instanceof FederatedMouseEvent && to instanceof FederatedMouseEvent))
      return;
    to.altKey = from.altKey;
    to.button = from.button;
    to.buttons = from.buttons;
    to.client.copyFrom(from.client);
    to.ctrlKey = from.ctrlKey;
    to.metaKey = from.metaKey;
    to.movement.copyFrom(from.movement);
    to.screen.copyFrom(from.screen);
    to.global.copyFrom(from.global);
  }
  copyData(from, to) {
    to.isTrusted = from.isTrusted;
    to.srcElement = from.srcElement;
    to.timeStamp = performance.now();
    to.type = from.type;
    to.detail = from.detail;
    to.view = from.view;
    to.which = from.which;
    to.layer.copyFrom(from.layer);
    to.page.copyFrom(from.page);
  }
  trackingData(id) {
    if (!this.mappingState.trackingData[id]) {
      this.mappingState.trackingData[id] = {
        pressTargetsByButton: {},
        clicksByButton: {},
        overTarget: null
      };
    }
    return this.mappingState.trackingData[id];
  }
  allocateEvent(constructor) {
    if (!this.eventPool.has(constructor)) {
      this.eventPool.set(constructor, []);
    }
    const event = this.eventPool.get(constructor).pop() || new constructor(this);
    event.eventPhase = event.NONE;
    event.currentTarget = null;
    event.path = null;
    event.target = null;
    return event;
  }
  freeEvent(event) {
    if (event.manager !== this)
      throw new Error("It is illegal to free an event not managed by this EventBoundary!");
    const constructor = event.constructor;
    if (!this.eventPool.has(constructor)) {
      this.eventPool.set(constructor, []);
    }
    this.eventPool.get(constructor).push(event);
  }
  notifyListeners(e, type) {
    const listeners = e.currentTarget._events[type];
    if (!listeners)
      return;
    if ("fn" in listeners) {
      listeners.fn.call(listeners.context, e);
    } else {
      for (let i = 0, j = listeners.length; i < j && !e.propagationImmediatelyStopped; i++) {
        listeners[i].fn.call(listeners[i].context, e);
      }
    }
  }
}

const MOUSE_POINTER_ID = 1;
const TOUCH_TO_POINTER = {
  touchstart: "pointerdown",
  touchend: "pointerup",
  touchendoutside: "pointerupoutside",
  touchmove: "pointermove",
  touchcancel: "pointercancel"
};
class EventSystem {
  constructor(renderer) {
    this.supportsTouchEvents = "ontouchstart" in globalThis;
    this.supportsPointerEvents = !!globalThis.PointerEvent;
    this.domElement = null;
    this.resolution = 1;
    this.renderer = renderer;
    this.rootBoundary = new EventBoundary(null);
    this.autoPreventDefault = true;
    this.eventsAdded = false;
    this.rootPointerEvent = new FederatedPointerEvent(null);
    this.rootWheelEvent = new FederatedWheelEvent(null);
    this.cursorStyles = {
      default: "inherit",
      pointer: "pointer"
    };
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerOverOut = this.onPointerOverOut.bind(this);
    this.onWheel = this.onWheel.bind(this);
  }
  init() {
    const { view, resolution } = this.renderer;
    this.setTargetElement(view);
    this.resolution = resolution;
  }
  resolutionChange(resolution) {
    this.resolution = resolution;
  }
  destroy() {
    this.setTargetElement(null);
    this.renderer = null;
  }
  setCursor(mode) {
    mode = mode || "default";
    let applyStyles = true;
    if (globalThis.OffscreenCanvas && this.domElement instanceof OffscreenCanvas) {
      applyStyles = false;
    }
    if (this.currentCursor === mode) {
      return;
    }
    this.currentCursor = mode;
    const style = this.cursorStyles[mode];
    if (style) {
      switch (typeof style) {
        case "string":
          if (applyStyles) {
            this.domElement.style.cursor = style;
          }
          break;
        case "function":
          style(mode);
          break;
        case "object":
          if (applyStyles) {
            Object.assign(this.domElement.style, style);
          }
          break;
      }
    } else if (applyStyles && typeof mode === "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, mode)) {
      this.domElement.style.cursor = mode;
    }
  }
  onPointerDown(nativeEvent) {
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    if (this.supportsTouchEvents && nativeEvent.pointerType === "touch")
      return;
    const events = this.normalizeToPointerData(nativeEvent);
    if (this.autoPreventDefault && events[0].isNormalized) {
      const cancelable = nativeEvent.cancelable || !("cancelable" in nativeEvent);
      if (cancelable) {
        nativeEvent.preventDefault();
      }
    }
    for (let i = 0, j = events.length; i < j; i++) {
      const nativeEvent2 = events[i];
      const federatedEvent = this.bootstrapEvent(this.rootPointerEvent, nativeEvent2);
      this.rootBoundary.mapEvent(federatedEvent);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  onPointerMove(nativeEvent) {
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    if (this.supportsTouchEvents && nativeEvent.pointerType === "touch")
      return;
    const normalizedEvents = this.normalizeToPointerData(nativeEvent);
    for (let i = 0, j = normalizedEvents.length; i < j; i++) {
      const event = this.bootstrapEvent(this.rootPointerEvent, normalizedEvents[i]);
      this.rootBoundary.mapEvent(event);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  onPointerUp(nativeEvent) {
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    if (this.supportsTouchEvents && nativeEvent.pointerType === "touch")
      return;
    let target = nativeEvent.target;
    if (nativeEvent.composedPath && nativeEvent.composedPath().length > 0) {
      target = nativeEvent.composedPath()[0];
    }
    const outside = target !== this.domElement ? "outside" : "";
    const normalizedEvents = this.normalizeToPointerData(nativeEvent);
    for (let i = 0, j = normalizedEvents.length; i < j; i++) {
      const event = this.bootstrapEvent(this.rootPointerEvent, normalizedEvents[i]);
      event.type += outside;
      this.rootBoundary.mapEvent(event);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  onPointerOverOut(nativeEvent) {
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    if (this.supportsTouchEvents && nativeEvent.pointerType === "touch")
      return;
    const normalizedEvents = this.normalizeToPointerData(nativeEvent);
    for (let i = 0, j = normalizedEvents.length; i < j; i++) {
      const event = this.bootstrapEvent(this.rootPointerEvent, normalizedEvents[i]);
      this.rootBoundary.mapEvent(event);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  onWheel(nativeEvent) {
    const wheelEvent = this.normalizeWheelEvent(nativeEvent);
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    this.rootBoundary.mapEvent(wheelEvent);
  }
  setTargetElement(element) {
    this.removeEvents();
    this.domElement = element;
    this.addEvents();
  }
  addEvents() {
    if (this.eventsAdded || !this.domElement) {
      return;
    }
    const style = this.domElement.style;
    if (style) {
      if (globalThis.navigator.msPointerEnabled) {
        style.msContentZooming = "none";
        style.msTouchAction = "none";
      } else if (this.supportsPointerEvents) {
        style.touchAction = "none";
      }
    }
    if (this.supportsPointerEvents) {
      globalThis.document.addEventListener("pointermove", this.onPointerMove, true);
      this.domElement.addEventListener("pointerdown", this.onPointerDown, true);
      this.domElement.addEventListener("pointerleave", this.onPointerOverOut, true);
      this.domElement.addEventListener("pointerover", this.onPointerOverOut, true);
      globalThis.addEventListener("pointerup", this.onPointerUp, true);
    } else {
      globalThis.document.addEventListener("mousemove", this.onPointerMove, true);
      this.domElement.addEventListener("mousedown", this.onPointerDown, true);
      this.domElement.addEventListener("mouseout", this.onPointerOverOut, true);
      this.domElement.addEventListener("mouseover", this.onPointerOverOut, true);
      globalThis.addEventListener("mouseup", this.onPointerUp, true);
    }
    if (this.supportsTouchEvents) {
      this.domElement.addEventListener("touchstart", this.onPointerDown, true);
      this.domElement.addEventListener("touchend", this.onPointerUp, true);
      this.domElement.addEventListener("touchmove", this.onPointerMove, true);
    }
    this.domElement.addEventListener("wheel", this.onWheel, {
      passive: true,
      capture: true
    });
    this.eventsAdded = true;
  }
  removeEvents() {
    if (!this.eventsAdded || !this.domElement) {
      return;
    }
    const style = this.domElement.style;
    if (globalThis.navigator.msPointerEnabled) {
      style.msContentZooming = "";
      style.msTouchAction = "";
    } else if (this.supportsPointerEvents) {
      style.touchAction = "";
    }
    if (this.supportsPointerEvents) {
      globalThis.document.removeEventListener("pointermove", this.onPointerMove, true);
      this.domElement.removeEventListener("pointerdown", this.onPointerDown, true);
      this.domElement.removeEventListener("pointerleave", this.onPointerOverOut, true);
      this.domElement.removeEventListener("pointerover", this.onPointerOverOut, true);
      globalThis.removeEventListener("pointerup", this.onPointerUp, true);
    } else {
      globalThis.document.removeEventListener("mousemove", this.onPointerMove, true);
      this.domElement.removeEventListener("mousedown", this.onPointerDown, true);
      this.domElement.removeEventListener("mouseout", this.onPointerOverOut, true);
      this.domElement.removeEventListener("mouseover", this.onPointerOverOut, true);
      globalThis.removeEventListener("mouseup", this.onPointerUp, true);
    }
    if (this.supportsTouchEvents) {
      this.domElement.removeEventListener("touchstart", this.onPointerDown, true);
      this.domElement.removeEventListener("touchend", this.onPointerUp, true);
      this.domElement.removeEventListener("touchmove", this.onPointerMove, true);
    }
    this.domElement.removeEventListener("wheel", this.onWheel, true);
    this.domElement = null;
    this.eventsAdded = false;
  }
  mapPositionToPoint(point, x, y) {
    let rect;
    if (!this.domElement.parentElement) {
      rect = {
        x: 0,
        y: 0,
        width: this.domElement.width,
        height: this.domElement.height,
        left: 0,
        top: 0
      };
    } else {
      rect = this.domElement.getBoundingClientRect();
    }
    const resolutionMultiplier = 1 / this.resolution;
    point.x = (x - rect.left) * (this.domElement.width / rect.width) * resolutionMultiplier;
    point.y = (y - rect.top) * (this.domElement.height / rect.height) * resolutionMultiplier;
  }
  normalizeToPointerData(event) {
    const normalizedEvents = [];
    if (this.supportsTouchEvents && event instanceof TouchEvent) {
      for (let i = 0, li = event.changedTouches.length; i < li; i++) {
        const touch = event.changedTouches[i];
        if (typeof touch.button === "undefined")
          touch.button = 0;
        if (typeof touch.buttons === "undefined")
          touch.buttons = 1;
        if (typeof touch.isPrimary === "undefined") {
          touch.isPrimary = event.touches.length === 1 && event.type === "touchstart";
        }
        if (typeof touch.width === "undefined")
          touch.width = touch.radiusX || 1;
        if (typeof touch.height === "undefined")
          touch.height = touch.radiusY || 1;
        if (typeof touch.tiltX === "undefined")
          touch.tiltX = 0;
        if (typeof touch.tiltY === "undefined")
          touch.tiltY = 0;
        if (typeof touch.pointerType === "undefined")
          touch.pointerType = "touch";
        if (typeof touch.pointerId === "undefined")
          touch.pointerId = touch.identifier || 0;
        if (typeof touch.pressure === "undefined")
          touch.pressure = touch.force || 0.5;
        if (typeof touch.twist === "undefined")
          touch.twist = 0;
        if (typeof touch.tangentialPressure === "undefined")
          touch.tangentialPressure = 0;
        if (typeof touch.layerX === "undefined")
          touch.layerX = touch.offsetX = touch.clientX;
        if (typeof touch.layerY === "undefined")
          touch.layerY = touch.offsetY = touch.clientY;
        touch.isNormalized = true;
        touch.type = event.type;
        normalizedEvents.push(touch);
      }
    } else if (!globalThis.MouseEvent || event instanceof MouseEvent && (!this.supportsPointerEvents || !(event instanceof globalThis.PointerEvent))) {
      const tempEvent = event;
      if (typeof tempEvent.isPrimary === "undefined")
        tempEvent.isPrimary = true;
      if (typeof tempEvent.width === "undefined")
        tempEvent.width = 1;
      if (typeof tempEvent.height === "undefined")
        tempEvent.height = 1;
      if (typeof tempEvent.tiltX === "undefined")
        tempEvent.tiltX = 0;
      if (typeof tempEvent.tiltY === "undefined")
        tempEvent.tiltY = 0;
      if (typeof tempEvent.pointerType === "undefined")
        tempEvent.pointerType = "mouse";
      if (typeof tempEvent.pointerId === "undefined")
        tempEvent.pointerId = MOUSE_POINTER_ID;
      if (typeof tempEvent.pressure === "undefined")
        tempEvent.pressure = 0.5;
      if (typeof tempEvent.twist === "undefined")
        tempEvent.twist = 0;
      if (typeof tempEvent.tangentialPressure === "undefined")
        tempEvent.tangentialPressure = 0;
      tempEvent.isNormalized = true;
      normalizedEvents.push(tempEvent);
    } else {
      normalizedEvents.push(event);
    }
    return normalizedEvents;
  }
  normalizeWheelEvent(nativeEvent) {
    const event = this.rootWheelEvent;
    this.transferMouseData(event, nativeEvent);
    event.deltaX = nativeEvent.deltaX;
    event.deltaY = nativeEvent.deltaY;
    event.deltaZ = nativeEvent.deltaZ;
    event.deltaMode = nativeEvent.deltaMode;
    this.mapPositionToPoint(event.screen, nativeEvent.clientX, nativeEvent.clientY);
    event.global.copyFrom(event.screen);
    event.offset.copyFrom(event.screen);
    event.nativeEvent = nativeEvent;
    event.type = nativeEvent.type;
    return event;
  }
  bootstrapEvent(event, nativeEvent) {
    event.originalEvent = null;
    event.nativeEvent = nativeEvent;
    event.pointerId = nativeEvent.pointerId;
    event.width = nativeEvent.width;
    event.height = nativeEvent.height;
    event.isPrimary = nativeEvent.isPrimary;
    event.pointerType = nativeEvent.pointerType;
    event.pressure = nativeEvent.pressure;
    event.tangentialPressure = nativeEvent.tangentialPressure;
    event.tiltX = nativeEvent.tiltX;
    event.tiltY = nativeEvent.tiltY;
    event.twist = nativeEvent.twist;
    this.transferMouseData(event, nativeEvent);
    this.mapPositionToPoint(event.screen, nativeEvent.clientX, nativeEvent.clientY);
    event.global.copyFrom(event.screen);
    event.offset.copyFrom(event.screen);
    event.isTrusted = nativeEvent.isTrusted;
    if (event.type === "pointerleave") {
      event.type = "pointerout";
    }
    if (event.type.startsWith("mouse")) {
      event.type = event.type.replace("mouse", "pointer");
    }
    if (event.type.startsWith("touch")) {
      event.type = TOUCH_TO_POINTER[event.type] || event.type;
    }
    return event;
  }
  transferMouseData(event, nativeEvent) {
    event.isTrusted = nativeEvent.isTrusted;
    event.srcElement = nativeEvent.srcElement;
    event.timeStamp = performance.now();
    event.type = nativeEvent.type;
    event.altKey = nativeEvent.altKey;
    event.button = nativeEvent.button;
    event.buttons = nativeEvent.buttons;
    event.client.x = nativeEvent.clientX;
    event.client.y = nativeEvent.clientY;
    event.ctrlKey = nativeEvent.ctrlKey;
    event.metaKey = nativeEvent.metaKey;
    event.movement.x = nativeEvent.movementX;
    event.movement.y = nativeEvent.movementY;
    event.page.x = nativeEvent.pageX;
    event.page.y = nativeEvent.pageY;
    event.relatedTarget = null;
    event.shiftKey = nativeEvent.shiftKey;
  }
}
EventSystem.extension = {
  name: "events",
  type: [
    ExtensionType.RendererSystem,
    ExtensionType.CanvasRendererSystem
  ]
};
extensions$1.add(EventSystem);

const FederatedDisplayObject = {
  onclick: null,
  onmousedown: null,
  onmouseenter: null,
  onmouseleave: null,
  onmousemove: null,
  onglobalmousemove: null,
  onmouseout: null,
  onmouseover: null,
  onmouseup: null,
  onmouseupoutside: null,
  onpointercancel: null,
  onpointerdown: null,
  onpointerenter: null,
  onpointerleave: null,
  onpointermove: null,
  onglobalpointermove: null,
  onpointerout: null,
  onpointerover: null,
  onpointertap: null,
  onpointerup: null,
  onpointerupoutside: null,
  onrightclick: null,
  onrightdown: null,
  onrightup: null,
  onrightupoutside: null,
  ontap: null,
  ontouchcancel: null,
  ontouchend: null,
  ontouchendoutside: null,
  ontouchmove: null,
  onglobaltouchmove: null,
  ontouchstart: null,
  onwheel: null,
  interactive: false,
  interactiveChildren: true,
  hitArea: null,
  addEventListener(type, listener, options) {
    const capture = typeof options === "boolean" && options || typeof options === "object" && options.capture;
    const context = typeof listener === "function" ? void 0 : listener;
    type = capture ? `${type}capture` : type;
    listener = typeof listener === "function" ? listener : listener.handleEvent;
    this.on(type, listener, context);
  },
  removeEventListener(type, listener, options) {
    const capture = typeof options === "boolean" && options || typeof options === "object" && options.capture;
    const context = typeof listener === "function" ? void 0 : listener;
    type = capture ? `${type}capture` : type;
    listener = typeof listener === "function" ? listener : listener.handleEvent;
    this.off(type, listener, context);
  },
  dispatchEvent(e) {
    if (!(e instanceof FederatedEvent)) {
      throw new Error("DisplayObject cannot propagate events outside of the Federated Events API");
    }
    e.defaultPrevented = false;
    e.path = null;
    e.target = this;
    e.manager.dispatchEvent(e);
    return !e.defaultPrevented;
  }
};
DisplayObject.mixin(FederatedDisplayObject);

const accessibleTarget = {
  accessible: false,
  accessibleTitle: null,
  accessibleHint: null,
  tabIndex: 0,
  _accessibleActive: false,
  _accessibleDiv: null,
  accessibleType: "button",
  accessiblePointerEvents: "auto",
  accessibleChildren: true,
  renderId: -1
};

DisplayObject.mixin(accessibleTarget);
const KEY_CODE_TAB = 9;
const DIV_TOUCH_SIZE = 100;
const DIV_TOUCH_POS_X = 0;
const DIV_TOUCH_POS_Y = 0;
const DIV_TOUCH_ZINDEX = 2;
const DIV_HOOK_SIZE = 1;
const DIV_HOOK_POS_X = -1e3;
const DIV_HOOK_POS_Y = -1e3;
const DIV_HOOK_ZINDEX = 2;
class AccessibilityManager {
  constructor(renderer) {
    this.debug = false;
    this._isActive = false;
    this._isMobileAccessibility = false;
    this.pool = [];
    this.renderId = 0;
    this.children = [];
    this.androidUpdateCount = 0;
    this.androidUpdateFrequency = 500;
    this._hookDiv = null;
    if (isMobile.tablet || isMobile.phone) {
      this.createTouchHook();
    }
    const div = document.createElement("div");
    div.style.width = `${DIV_TOUCH_SIZE}px`;
    div.style.height = `${DIV_TOUCH_SIZE}px`;
    div.style.position = "absolute";
    div.style.top = `${DIV_TOUCH_POS_X}px`;
    div.style.left = `${DIV_TOUCH_POS_Y}px`;
    div.style.zIndex = DIV_TOUCH_ZINDEX.toString();
    this.div = div;
    this.renderer = renderer;
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    globalThis.addEventListener("keydown", this._onKeyDown, false);
  }
  get isActive() {
    return this._isActive;
  }
  get isMobileAccessibility() {
    return this._isMobileAccessibility;
  }
  createTouchHook() {
    const hookDiv = document.createElement("button");
    hookDiv.style.width = `${DIV_HOOK_SIZE}px`;
    hookDiv.style.height = `${DIV_HOOK_SIZE}px`;
    hookDiv.style.position = "absolute";
    hookDiv.style.top = `${DIV_HOOK_POS_X}px`;
    hookDiv.style.left = `${DIV_HOOK_POS_Y}px`;
    hookDiv.style.zIndex = DIV_HOOK_ZINDEX.toString();
    hookDiv.style.backgroundColor = "#FF0000";
    hookDiv.title = "select to enable accessibility for this content";
    hookDiv.addEventListener("focus", () => {
      this._isMobileAccessibility = true;
      this.activate();
      this.destroyTouchHook();
    });
    document.body.appendChild(hookDiv);
    this._hookDiv = hookDiv;
  }
  destroyTouchHook() {
    if (!this._hookDiv) {
      return;
    }
    document.body.removeChild(this._hookDiv);
    this._hookDiv = null;
  }
  activate() {
    if (this._isActive) {
      return;
    }
    this._isActive = true;
    globalThis.document.addEventListener("mousemove", this._onMouseMove, true);
    globalThis.removeEventListener("keydown", this._onKeyDown, false);
    this.renderer.on("postrender", this.update, this);
    this.renderer.view.parentNode?.appendChild(this.div);
  }
  deactivate() {
    if (!this._isActive || this._isMobileAccessibility) {
      return;
    }
    this._isActive = false;
    globalThis.document.removeEventListener("mousemove", this._onMouseMove, true);
    globalThis.addEventListener("keydown", this._onKeyDown, false);
    this.renderer.off("postrender", this.update);
    this.div.parentNode?.removeChild(this.div);
  }
  updateAccessibleObjects(displayObject) {
    if (!displayObject.visible || !displayObject.accessibleChildren) {
      return;
    }
    if (displayObject.accessible && displayObject.interactive) {
      if (!displayObject._accessibleActive) {
        this.addChild(displayObject);
      }
      displayObject.renderId = this.renderId;
    }
    const children = displayObject.children;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        this.updateAccessibleObjects(children[i]);
      }
    }
  }
  update() {
    const now = performance.now();
    if (isMobile.android.device && now < this.androidUpdateCount) {
      return;
    }
    this.androidUpdateCount = now + this.androidUpdateFrequency;
    if (!this.renderer.renderingToScreen) {
      return;
    }
    if (this.renderer.lastObjectRendered) {
      this.updateAccessibleObjects(this.renderer.lastObjectRendered);
    }
    const { x, y, width, height } = this.renderer.view.getBoundingClientRect();
    const { width: viewWidth, height: viewHeight, resolution } = this.renderer;
    const sx = width / viewWidth * resolution;
    const sy = height / viewHeight * resolution;
    let div = this.div;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.style.width = `${viewWidth}px`;
    div.style.height = `${viewHeight}px`;
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.renderId !== this.renderId) {
        child._accessibleActive = false;
        removeItems(this.children, i, 1);
        this.div.removeChild(child._accessibleDiv);
        this.pool.push(child._accessibleDiv);
        child._accessibleDiv = null;
        i--;
      } else {
        div = child._accessibleDiv;
        let hitArea = child.hitArea;
        const wt = child.worldTransform;
        if (child.hitArea) {
          div.style.left = `${(wt.tx + hitArea.x * wt.a) * sx}px`;
          div.style.top = `${(wt.ty + hitArea.y * wt.d) * sy}px`;
          div.style.width = `${hitArea.width * wt.a * sx}px`;
          div.style.height = `${hitArea.height * wt.d * sy}px`;
        } else {
          hitArea = child.getBounds();
          this.capHitArea(hitArea);
          div.style.left = `${hitArea.x * sx}px`;
          div.style.top = `${hitArea.y * sy}px`;
          div.style.width = `${hitArea.width * sx}px`;
          div.style.height = `${hitArea.height * sy}px`;
          if (div.title !== child.accessibleTitle && child.accessibleTitle !== null) {
            div.title = child.accessibleTitle;
          }
          if (div.getAttribute("aria-label") !== child.accessibleHint && child.accessibleHint !== null) {
            div.setAttribute("aria-label", child.accessibleHint);
          }
        }
        if (child.accessibleTitle !== div.title || child.tabIndex !== div.tabIndex) {
          div.title = child.accessibleTitle;
          div.tabIndex = child.tabIndex;
          if (this.debug)
            this.updateDebugHTML(div);
        }
      }
    }
    this.renderId++;
  }
  updateDebugHTML(div) {
    div.innerHTML = `type: ${div.type}</br> title : ${div.title}</br> tabIndex: ${div.tabIndex}`;
  }
  capHitArea(hitArea) {
    if (hitArea.x < 0) {
      hitArea.width += hitArea.x;
      hitArea.x = 0;
    }
    if (hitArea.y < 0) {
      hitArea.height += hitArea.y;
      hitArea.y = 0;
    }
    const { width: viewWidth, height: viewHeight } = this.renderer;
    if (hitArea.x + hitArea.width > viewWidth) {
      hitArea.width = viewWidth - hitArea.x;
    }
    if (hitArea.y + hitArea.height > viewHeight) {
      hitArea.height = viewHeight - hitArea.y;
    }
  }
  addChild(displayObject) {
    let div = this.pool.pop();
    if (!div) {
      div = document.createElement("button");
      div.style.width = `${DIV_TOUCH_SIZE}px`;
      div.style.height = `${DIV_TOUCH_SIZE}px`;
      div.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent";
      div.style.position = "absolute";
      div.style.zIndex = DIV_TOUCH_ZINDEX.toString();
      div.style.borderStyle = "none";
      if (navigator.userAgent.toLowerCase().includes("chrome")) {
        div.setAttribute("aria-live", "off");
      } else {
        div.setAttribute("aria-live", "polite");
      }
      if (navigator.userAgent.match(/rv:.*Gecko\//)) {
        div.setAttribute("aria-relevant", "additions");
      } else {
        div.setAttribute("aria-relevant", "text");
      }
      div.addEventListener("click", this._onClick.bind(this));
      div.addEventListener("focus", this._onFocus.bind(this));
      div.addEventListener("focusout", this._onFocusOut.bind(this));
    }
    div.style.pointerEvents = displayObject.accessiblePointerEvents;
    div.type = displayObject.accessibleType;
    if (displayObject.accessibleTitle && displayObject.accessibleTitle !== null) {
      div.title = displayObject.accessibleTitle;
    } else if (!displayObject.accessibleHint || displayObject.accessibleHint === null) {
      div.title = `displayObject ${displayObject.tabIndex}`;
    }
    if (displayObject.accessibleHint && displayObject.accessibleHint !== null) {
      div.setAttribute("aria-label", displayObject.accessibleHint);
    }
    if (this.debug)
      this.updateDebugHTML(div);
    displayObject._accessibleActive = true;
    displayObject._accessibleDiv = div;
    div.displayObject = displayObject;
    this.children.push(displayObject);
    this.div.appendChild(displayObject._accessibleDiv);
    displayObject._accessibleDiv.tabIndex = displayObject.tabIndex;
  }
  _dispatchEvent(e, type) {
    const { displayObject: target } = e.target;
    const boundry = this.renderer.events.rootBoundary;
    const event = Object.assign(new FederatedEvent(boundry), { target });
    boundry.rootTarget = this.renderer.lastObjectRendered;
    type.forEach((type2) => boundry.dispatchEvent(event, type2));
  }
  _onClick(e) {
    this._dispatchEvent(e, ["click", "pointertap", "tap"]);
  }
  _onFocus(e) {
    if (!e.target.getAttribute("aria-live")) {
      e.target.setAttribute("aria-live", "assertive");
    }
    this._dispatchEvent(e, ["mouseover"]);
  }
  _onFocusOut(e) {
    if (!e.target.getAttribute("aria-live")) {
      e.target.setAttribute("aria-live", "polite");
    }
    this._dispatchEvent(e, ["mouseout"]);
  }
  _onKeyDown(e) {
    if (e.keyCode !== KEY_CODE_TAB) {
      return;
    }
    this.activate();
  }
  _onMouseMove(e) {
    if (e.movementX === 0 && e.movementY === 0) {
      return;
    }
    this.deactivate();
  }
  destroy() {
    this.destroyTouchHook();
    this.div = null;
    globalThis.document.removeEventListener("mousemove", this._onMouseMove, true);
    globalThis.removeEventListener("keydown", this._onKeyDown);
    this.pool = null;
    this.children = null;
    this.renderer = null;
  }
}
AccessibilityManager.extension = {
  name: "accessibility",
  type: [
    ExtensionType.RendererPlugin,
    ExtensionType.CanvasRendererPlugin
  ]
};
extensions$1.add(AccessibilityManager);

const _Application = class {
  constructor(options) {
    this.stage = new Container();
    options = Object.assign({
      forceCanvas: false
    }, options);
    this.renderer = autoDetectRenderer(options);
    _Application._plugins.forEach((plugin) => {
      plugin.init.call(this, options);
    });
  }
  render() {
    this.renderer.render(this.stage);
  }
  get view() {
    return this.renderer.view;
  }
  get screen() {
    return this.renderer.screen;
  }
  destroy(removeView, stageOptions) {
    const plugins = _Application._plugins.slice(0);
    plugins.reverse();
    plugins.forEach((plugin) => {
      plugin.destroy.call(this);
    });
    this.stage.destroy(stageOptions);
    this.stage = null;
    this.renderer.destroy(removeView);
    this.renderer = null;
  }
};
let Application = _Application;
Application._plugins = [];
extensions$1.handleByList(ExtensionType.Application, Application._plugins);

class ResizePlugin {
  static init(options) {
    Object.defineProperty(this, "resizeTo", {
      set(dom) {
        globalThis.removeEventListener("resize", this.queueResize);
        this._resizeTo = dom;
        if (dom) {
          globalThis.addEventListener("resize", this.queueResize);
          this.resize();
        }
      },
      get() {
        return this._resizeTo;
      }
    });
    this.queueResize = () => {
      if (!this._resizeTo) {
        return;
      }
      this.cancelResize();
      this._resizeId = requestAnimationFrame(() => this.resize());
    };
    this.cancelResize = () => {
      if (this._resizeId) {
        cancelAnimationFrame(this._resizeId);
        this._resizeId = null;
      }
    };
    this.resize = () => {
      if (!this._resizeTo) {
        return;
      }
      this.cancelResize();
      let width;
      let height;
      if (this._resizeTo === globalThis.window) {
        width = globalThis.innerWidth;
        height = globalThis.innerHeight;
      } else {
        const { clientWidth, clientHeight } = this._resizeTo;
        width = clientWidth;
        height = clientHeight;
      }
      this.renderer.resize(width, height);
      this.render();
    };
    this._resizeId = null;
    this._resizeTo = null;
    this.resizeTo = options.resizeTo || null;
  }
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize);
    this.cancelResize();
    this.cancelResize = null;
    this.queueResize = null;
    this.resizeTo = null;
    this.resize = null;
  }
}
ResizePlugin.extension = ExtensionType.Application;
extensions$1.add(ResizePlugin);

const assetKeyMap = {
  loader: ExtensionType.LoadParser,
  resolver: ExtensionType.ResolveParser,
  cache: ExtensionType.CacheParser,
  detection: ExtensionType.DetectionParser
};
extensions$1.handle(ExtensionType.Asset, (extension) => {
  const ref = extension.ref;
  Object.entries(assetKeyMap).filter(([key]) => !!ref[key]).forEach(([key, type]) => extensions$1.add(Object.assign(ref[key], { extension: ref[key].extension ?? type })));
}, (extension) => {
  const ref = extension.ref;
  Object.keys(assetKeyMap).filter((key) => !!ref[key]).forEach((key) => extensions$1.remove(ref[key]));
});

class BackgroundLoader {
  constructor(loader, verbose = false) {
    this._loader = loader;
    this._assetList = [];
    this._isLoading = false;
    this._maxConcurrent = 1;
    this.verbose = verbose;
  }
  add(assetUrls) {
    assetUrls.forEach((a) => {
      this._assetList.push(a);
    });
    if (this.verbose)
      console.log("[BackgroundLoader] assets: ", this._assetList);
    if (this._isActive && !this._isLoading) {
      this._next();
    }
  }
  async _next() {
    if (this._assetList.length && this._isActive) {
      this._isLoading = true;
      const toLoad = [];
      const toLoadAmount = Math.min(this._assetList.length, this._maxConcurrent);
      for (let i = 0; i < toLoadAmount; i++) {
        toLoad.push(this._assetList.pop());
      }
      await this._loader.load(toLoad);
      this._isLoading = false;
      this._next();
    }
  }
  get active() {
    return this._isActive;
  }
  set active(value) {
    if (this._isActive === value)
      return;
    this._isActive = value;
    if (value && !this._isLoading) {
      this._next();
    }
  }
}

function checkDataUrl(url, mimes) {
  if (Array.isArray(mimes)) {
    for (const mime of mimes) {
      if (url.startsWith(`data:${mime}`))
        return true;
    }
    return false;
  }
  return url.startsWith(`data:${mimes}`);
}

function checkExtension(url, extension) {
  const tempURL = url.split("?")[0];
  const ext = path.extname(tempURL).toLowerCase();
  if (Array.isArray(extension)) {
    return extension.includes(ext);
  }
  return ext === extension;
}

const convertToList = (input, transform) => {
  if (!Array.isArray(input)) {
    input = [input];
  }
  if (!transform) {
    return input;
  }
  return input.map((item) => {
    if (typeof item === "string") {
      return transform(item);
    }
    return item;
  });
};

const copySearchParams = (targetUrl, sourceUrl) => {
  const searchParams = sourceUrl.split("?")[1];
  if (searchParams) {
    targetUrl += `?${searchParams}`;
  }
  return targetUrl;
};

function processX(base, ids, depth, result, tags) {
  const id = ids[depth];
  for (let i = 0; i < id.length; i++) {
    const value = id[i];
    if (depth < ids.length - 1) {
      processX(base.replace(result[depth], value), ids, depth + 1, result, tags);
    } else {
      tags.push(base.replace(result[depth], value));
    }
  }
}
function createStringVariations(string) {
  const regex = /\{(.*?)\}/g;
  const result = string.match(regex);
  const tags = [];
  if (result) {
    const ids = [];
    result.forEach((vars) => {
      const split = vars.substring(1, vars.length - 1).split(",");
      ids.push(split);
    });
    processX(string, ids, 0, result, tags);
  } else {
    tags.push(string);
  }
  return tags;
}

const isSingleItem = (item) => !Array.isArray(item);

class CacheClass {
  constructor() {
    this._parsers = [];
    this._cache = /* @__PURE__ */ new Map();
    this._cacheMap = /* @__PURE__ */ new Map();
  }
  reset() {
    this._cacheMap.clear();
    this._cache.clear();
  }
  has(key) {
    return this._cache.has(key);
  }
  get(key) {
    const result = this._cache.get(key);
    if (!result) {
      console.warn(`[Assets] Asset id ${key} was not found in the Cache`);
    }
    return result;
  }
  set(key, value) {
    const keys = convertToList(key);
    let cacheableAssets;
    for (let i = 0; i < this.parsers.length; i++) {
      const parser = this.parsers[i];
      if (parser.test(value)) {
        cacheableAssets = parser.getCacheableAssets(keys, value);
        break;
      }
    }
    if (!cacheableAssets) {
      cacheableAssets = {};
      keys.forEach((key2) => {
        cacheableAssets[key2] = value;
      });
    }
    const cacheKeys = Object.keys(cacheableAssets);
    const cachedAssets = {
      cacheKeys,
      keys
    };
    keys.forEach((key2) => {
      this._cacheMap.set(key2, cachedAssets);
    });
    cacheKeys.forEach((key2) => {
      if (this._cache.has(key2) && this._cache.get(key2) !== value) {
        console.warn("[Cache] already has key:", key2);
      }
      this._cache.set(key2, cacheableAssets[key2]);
    });
    if (value instanceof Texture) {
      const texture = value;
      keys.forEach((key2) => {
        if (texture.baseTexture !== Texture.EMPTY.baseTexture) {
          BaseTexture.addToCache(texture.baseTexture, key2);
        }
        Texture.addToCache(texture, key2);
      });
    }
  }
  remove(key) {
    this._cacheMap.get(key);
    if (!this._cacheMap.has(key)) {
      console.warn(`[Assets] Asset id ${key} was not found in the Cache`);
      return;
    }
    const cacheMap = this._cacheMap.get(key);
    const cacheKeys = cacheMap.cacheKeys;
    cacheKeys.forEach((key2) => {
      this._cache.delete(key2);
    });
    cacheMap.keys.forEach((key2) => {
      this._cacheMap.delete(key2);
    });
  }
  get parsers() {
    return this._parsers;
  }
}
const Cache = new CacheClass();

class Loader {
  constructor() {
    this._parsers = [];
    this.promiseCache = {};
  }
  reset() {
    this.promiseCache = {};
  }
  _getLoadPromiseAndParser(url, data) {
    const result = {
      promise: null,
      parser: null
    };
    result.promise = (async () => {
      let asset = null;
      for (let i = 0; i < this.parsers.length; i++) {
        const parser = this.parsers[i];
        if (parser.load && parser.test?.(url, data, this)) {
          asset = await parser.load(url, data, this);
          result.parser = parser;
          break;
        }
      }
      if (!result.parser) {
        console.warn(`[Assets] ${url} could not be loaded as we don't know how to parse it, ensure the correct parser has being added`);
        return null;
      }
      for (let i = 0; i < this.parsers.length; i++) {
        const parser = this.parsers[i];
        if (parser.parse) {
          if (parser.parse && await parser.testParse?.(asset, data, this)) {
            asset = await parser.parse(asset, data, this) || asset;
            result.parser = parser;
          }
        }
      }
      return asset;
    })();
    return result;
  }
  async load(assetsToLoadIn, onProgress) {
    let count = 0;
    const assets = {};
    const singleAsset = isSingleItem(assetsToLoadIn);
    const assetsToLoad = convertToList(assetsToLoadIn, (item) => ({
      src: item
    }));
    const total = assetsToLoad.length;
    const promises = assetsToLoad.map(async (asset) => {
      const url = path.toAbsolute(asset.src);
      if (!assets[asset.src]) {
        try {
          if (!this.promiseCache[url]) {
            this.promiseCache[url] = this._getLoadPromiseAndParser(url, asset);
          }
          assets[asset.src] = await this.promiseCache[url].promise;
          if (onProgress)
            onProgress(++count / total);
        } catch (e) {
          delete this.promiseCache[url];
          delete assets[asset.src];
          throw new Error(`[Loader.load] Failed to load ${url}.
${e}`);
        }
      }
    });
    await Promise.all(promises);
    return singleAsset ? assets[assetsToLoad[0].src] : assets;
  }
  async unload(assetsToUnloadIn) {
    const assetsToUnload = convertToList(assetsToUnloadIn, (item) => ({
      src: item
    }));
    const promises = assetsToUnload.map(async (asset) => {
      const url = path.toAbsolute(asset.src);
      const loadPromise = this.promiseCache[url];
      if (loadPromise) {
        const loadedAsset = await loadPromise.promise;
        loadPromise.parser?.unload?.(loadedAsset, asset, this);
        delete this.promiseCache[url];
      }
    });
    await Promise.all(promises);
  }
  get parsers() {
    return this._parsers;
  }
}

var LoaderParserPriority = /* @__PURE__ */ ((LoaderParserPriority2) => {
  LoaderParserPriority2[LoaderParserPriority2["Low"] = 0] = "Low";
  LoaderParserPriority2[LoaderParserPriority2["Normal"] = 1] = "Normal";
  LoaderParserPriority2[LoaderParserPriority2["High"] = 2] = "High";
  return LoaderParserPriority2;
})(LoaderParserPriority || {});

const loadJson = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low
  },
  test(url) {
    return path.extname(url).toLowerCase() === ".json";
  },
  async load(url) {
    const response = await settings.ADAPTER.fetch(url);
    const json = await response.json();
    return json;
  }
};
extensions$1.add(loadJson);

const loadTxt = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low
  },
  test(url) {
    return path.extname(url).toLowerCase() === ".txt";
  },
  async load(url) {
    const response = await settings.ADAPTER.fetch(url);
    const txt = await response.text();
    return txt;
  }
};
extensions$1.add(loadTxt);

const validWeights = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
];
const validFontExtensions = [".ttf", ".otf", ".woff", ".woff2"];
const validFontMIMEs = [
  "font/ttf",
  "font/otf",
  "font/woff",
  "font/woff2"
];
function getFontFamilyName(url) {
  const ext = path.extname(url);
  const name = path.basename(url, ext);
  const nameWithSpaces = name.replace(/(-|_)/g, " ");
  const nameTitleCase = nameWithSpaces.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return nameTitleCase;
}
const loadWebFont = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low
  },
  test(url) {
    return checkDataUrl(url, validFontMIMEs) || checkExtension(url, validFontExtensions);
  },
  async load(url, options) {
    if (!globalThis.navigator.onLine) {
      throw new Error("[loadWebFont] Cannot load font - navigator is offline");
    }
    const fonts = settings.ADAPTER.getFontFaceSet();
    if (fonts) {
      const fontFaces = [];
      const name = options.data?.family ?? getFontFamilyName(url);
      const weights = options.data?.weights?.filter((weight) => validWeights.includes(weight)) ?? ["normal"];
      const data = options.data ?? {};
      for (let i = 0; i < weights.length; i++) {
        const weight = weights[i];
        const font = new FontFace(name, `url(${encodeURI(url)})`, {
          ...data,
          weight
        });
        await font.load();
        fonts.add(font);
        fontFaces.push(font);
      }
      return fontFaces.length === 1 ? fontFaces[0] : fontFaces;
    }
    console.warn("[loadWebFont] FontFace API is not supported. Skipping loading font");
    return null;
  },
  unload(font) {
    (Array.isArray(font) ? font : [font]).forEach((t) => settings.ADAPTER.getFontFaceSet().delete(t));
  }
};
extensions$1.add(loadWebFont);

let UUID = 0;
let MAX_WORKERS;
const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
const checkImageBitmapCode = {
  id: "checkImageBitmap",
  code: `
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('${WHITE_PNG}');
            const imageBlob =  await response.blob();
            const imageBitmap = await createImageBitmap(imageBlob);

            return imageBitmap.width === 1 && imageBitmap.height === 1;
        }
        catch (e)
        {
            return false;
        }
    }
    checkImageBitmap().then((result) => { self.postMessage(result); });
    `
};
const workerCode = {
  id: "loadImageBitmap",
  code: `
    async function loadImageBitmap(url)
    {
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \`
                + \`\${response.status} \${response.statusText}\`);
        }

        const imageBlob =  await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);

        return imageBitmap;
    }
    self.onmessage = async (event) =>
    {
        try
        {
            const imageBitmap = await loadImageBitmap(event.data.data[0]);

            self.postMessage({
                data: imageBitmap,
                uuid: event.data.uuid,
                id: event.data.id,
            }, [imageBitmap]);
        }
        catch(e)
        {
            self.postMessage({
                error: e,
                uuid: event.data.uuid,
                id: event.data.id,
            });
        }
    };`
};
let workerURL;
class WorkerManagerClass {
  constructor() {
    this._initialized = false;
    this._createdWorkers = 0;
    this.workerPool = [];
    this.queue = [];
    this.resolveHash = {};
  }
  isImageBitmapSupported() {
    if (this._isImageBitmapSupported !== void 0)
      return this._isImageBitmapSupported;
    this._isImageBitmapSupported = new Promise((resolve) => {
      const workerURL2 = URL.createObjectURL(new Blob([checkImageBitmapCode.code], { type: "application/javascript" }));
      const worker = new Worker(workerURL2);
      worker.addEventListener("message", (event) => {
        worker.terminate();
        URL.revokeObjectURL(workerURL2);
        resolve(event.data);
      });
    });
    return this._isImageBitmapSupported;
  }
  loadImageBitmap(src) {
    return this._run("loadImageBitmap", [src]);
  }
  async _initWorkers() {
    if (this._initialized)
      return;
    this._initialized = true;
  }
  getWorker() {
    if (MAX_WORKERS === void 0) {
      MAX_WORKERS = navigator.hardwareConcurrency || 4;
    }
    let worker = this.workerPool.pop();
    if (!worker && this._createdWorkers < MAX_WORKERS) {
      if (!workerURL) {
        workerURL = URL.createObjectURL(new Blob([workerCode.code], { type: "application/javascript" }));
      }
      this._createdWorkers++;
      worker = new Worker(workerURL);
      worker.addEventListener("message", (event) => {
        this.complete(event.data);
        this.returnWorker(event.target);
        this.next();
      });
    }
    return worker;
  }
  returnWorker(worker) {
    this.workerPool.push(worker);
  }
  complete(data) {
    if (data.error !== void 0) {
      this.resolveHash[data.uuid].reject(data.error);
    } else {
      this.resolveHash[data.uuid].resolve(data.data);
    }
    this.resolveHash[data.uuid] = null;
  }
  async _run(id, args) {
    await this._initWorkers();
    const promise = new Promise((resolve, reject) => {
      this.queue.push({ id, arguments: args, resolve, reject });
    });
    this.next();
    return promise;
  }
  next() {
    if (!this.queue.length)
      return;
    const worker = this.getWorker();
    if (!worker) {
      return;
    }
    const toDo = this.queue.pop();
    const id = toDo.id;
    this.resolveHash[UUID] = { resolve: toDo.resolve, reject: toDo.reject };
    worker.postMessage({
      data: toDo.arguments,
      uuid: UUID++,
      id
    });
  }
}
const WorkerManager = new WorkerManagerClass();

function createTexture(base, loader, url) {
  const texture = new Texture(base);
  texture.baseTexture.on("dispose", () => {
    delete loader.promiseCache[url];
  });
  return texture;
}

const validImageExtensions = [".jpeg", ".jpg", ".png", ".webp", ".avif"];
const validImageMIMEs = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
];
async function loadImageBitmap(url) {
  const response = await settings.ADAPTER.fetch(url);
  if (!response.ok) {
    throw new Error(`[loadImageBitmap] Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const imageBlob = await response.blob();
  const imageBitmap = await createImageBitmap(imageBlob);
  return imageBitmap;
}
const loadTextures = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  config: {
    preferWorkers: true
  },
  test(url) {
    return checkDataUrl(url, validImageMIMEs) || checkExtension(url, validImageExtensions);
  },
  async load(url, asset, loader) {
    let src = null;
    if (globalThis.createImageBitmap) {
      if (this.config.preferWorkers && await WorkerManager.isImageBitmapSupported()) {
        src = await WorkerManager.loadImageBitmap(url);
      } else {
        src = await loadImageBitmap(url);
      }
    } else {
      src = await new Promise((resolve) => {
        src = new Image();
        src.crossOrigin = "anonymous";
        src.src = url;
        if (src.complete) {
          resolve(src);
        } else {
          src.onload = () => {
            resolve(src);
          };
        }
      });
    }
    const base = new BaseTexture(src, {
      resolution: getResolutionOfUrl(url),
      ...asset.data
    });
    base.resource.src = url;
    return createTexture(base, loader, url);
  },
  unload(texture) {
    texture.destroy(true);
  }
};
extensions$1.add(loadTextures);

const loadSVG = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  test(url) {
    return path.extname(url).toLowerCase() === ".svg";
  },
  async testParse(data) {
    return SVGResource.test(data);
  },
  async parse(asset, data, loader) {
    const src = new SVGResource(asset, data?.data?.resourceOptions);
    const base = new BaseTexture(src, {
      resolution: getResolutionOfUrl(asset),
      ...data?.data
    });
    base.resource.src = asset;
    const texture = createTexture(base, loader, asset);
    if (!data?.data?.resourceOptions?.autoLoad) {
      await src.load();
    }
    return texture;
  },
  async load(url, _options) {
    const response = await settings.ADAPTER.fetch(url);
    return response.text();
  },
  unload: loadTextures.unload
};
extensions$1.add(loadSVG);

class Resolver {
  constructor() {
    this._bundleIdConnector = "-";
    this._createBundleAssetId = (bundleId, assetId) => `${bundleId}${this._bundleIdConnector}${assetId}`;
    this._extractAssetIdFromBundle = (bundleId, assetBundleId) => assetBundleId.replace(`${bundleId}${this._bundleIdConnector}`, "");
    this._assetMap = {};
    this._preferredOrder = [];
    this._parsers = [];
    this._resolverHash = {};
    this._bundles = {};
  }
  setBundleIdentifier(bundleIdentifier) {
    this._bundleIdConnector = bundleIdentifier.connector ?? this._bundleIdConnector;
    this._createBundleAssetId = bundleIdentifier.createBundleAssetId ?? this._createBundleAssetId;
    this._extractAssetIdFromBundle = bundleIdentifier.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle;
    if (this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar") {
      throw new Error("[Resolver] GenerateBundleAssetId are not working correctly");
    }
  }
  prefer(...preferOrders) {
    preferOrders.forEach((prefer) => {
      this._preferredOrder.push(prefer);
      if (!prefer.priority) {
        prefer.priority = Object.keys(prefer.params);
      }
    });
    this._resolverHash = {};
  }
  set basePath(basePath) {
    this._basePath = basePath;
  }
  get basePath() {
    return this._basePath;
  }
  set rootPath(rootPath) {
    this._rootPath = rootPath;
  }
  get rootPath() {
    return this._rootPath;
  }
  get parsers() {
    return this._parsers;
  }
  reset() {
    this._preferredOrder = [];
    this._resolverHash = {};
    this._assetMap = {};
    this._rootPath = null;
    this._basePath = null;
    this._manifest = null;
  }
  setDefaultSearchParams(searchParams) {
    if (typeof searchParams === "string") {
      this._defaultSearchParams = searchParams;
    } else {
      const queryValues = searchParams;
      this._defaultSearchParams = Object.keys(queryValues).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryValues[key])}`).join("&");
    }
  }
  addManifest(manifest) {
    if (this._manifest) {
      console.warn("[Resolver] Manifest already exists, this will be overwritten");
    }
    this._manifest = manifest;
    manifest.bundles.forEach((bundle) => {
      this.addBundle(bundle.name, bundle.assets);
    });
  }
  addBundle(bundleId, assets) {
    const assetNames = [];
    if (Array.isArray(assets)) {
      assets.forEach((asset) => {
        if (typeof asset.name === "string") {
          const bundleAssetId = this._createBundleAssetId(bundleId, asset.name);
          assetNames.push(bundleAssetId);
          this.add([asset.name, bundleAssetId], asset.srcs, asset.data);
        } else {
          const bundleIds = asset.name.map((name) => this._createBundleAssetId(bundleId, name));
          bundleIds.forEach((bundleId2) => {
            assetNames.push(bundleId2);
          });
          this.add([...asset.name, ...bundleIds], asset.srcs);
        }
      });
    } else {
      Object.keys(assets).forEach((key) => {
        assetNames.push(this._createBundleAssetId(bundleId, key));
        this.add([key, this._createBundleAssetId(bundleId, key)], assets[key]);
      });
    }
    this._bundles[bundleId] = assetNames;
  }
  add(keysIn, assetsIn, data) {
    const keys = convertToList(keysIn);
    keys.forEach((key) => {
      if (this._assetMap[key]) {
        console.warn(`[Resolver] already has key: ${key} overwriting`);
      }
    });
    if (!Array.isArray(assetsIn)) {
      if (typeof assetsIn === "string") {
        assetsIn = createStringVariations(assetsIn);
      } else {
        assetsIn = [assetsIn];
      }
    }
    const assetMap = assetsIn.map((asset) => {
      let formattedAsset = asset;
      if (typeof asset === "string") {
        let parsed = false;
        for (let i = 0; i < this._parsers.length; i++) {
          const parser = this._parsers[i];
          if (parser.test(asset)) {
            formattedAsset = parser.parse(asset);
            parsed = true;
            break;
          }
        }
        if (!parsed) {
          formattedAsset = {
            src: asset
          };
        }
      }
      if (!formattedAsset.format) {
        formattedAsset.format = formattedAsset.src.split(".").pop();
      }
      if (!formattedAsset.alias) {
        formattedAsset.alias = keys;
      }
      if (this._basePath || this._rootPath) {
        formattedAsset.src = path.toAbsolute(formattedAsset.src, this._basePath, this._rootPath);
      }
      formattedAsset.src = this._appendDefaultSearchParams(formattedAsset.src);
      formattedAsset.data = formattedAsset.data ?? data;
      return formattedAsset;
    });
    keys.forEach((key) => {
      this._assetMap[key] = assetMap;
    });
  }
  resolveBundle(bundleIds) {
    const singleAsset = isSingleItem(bundleIds);
    bundleIds = convertToList(bundleIds);
    const out = {};
    bundleIds.forEach((bundleId) => {
      const assetNames = this._bundles[bundleId];
      if (assetNames) {
        const results = this.resolve(assetNames);
        const assets = {};
        for (const key in results) {
          const asset = results[key];
          assets[this._extractAssetIdFromBundle(bundleId, key)] = asset;
        }
        out[bundleId] = assets;
      }
    });
    return singleAsset ? out[bundleIds[0]] : out;
  }
  resolveUrl(key) {
    const result = this.resolve(key);
    if (typeof key !== "string") {
      const out = {};
      for (const i in result) {
        out[i] = result[i].src;
      }
      return out;
    }
    return result.src;
  }
  resolve(keys) {
    const singleAsset = isSingleItem(keys);
    keys = convertToList(keys);
    const result = {};
    keys.forEach((key) => {
      if (!this._resolverHash[key]) {
        if (this._assetMap[key]) {
          let assets = this._assetMap[key];
          const preferredOrder = this._getPreferredOrder(assets);
          const bestAsset = assets[0];
          preferredOrder?.priority.forEach((priorityKey) => {
            preferredOrder.params[priorityKey].forEach((value) => {
              const filteredAssets = assets.filter((asset) => {
                if (asset[priorityKey]) {
                  return asset[priorityKey] === value;
                }
                return false;
              });
              if (filteredAssets.length) {
                assets = filteredAssets;
              }
            });
          });
          this._resolverHash[key] = assets[0] ?? bestAsset;
        } else {
          let src = key;
          if (this._basePath || this._rootPath) {
            src = path.toAbsolute(src, this._basePath, this._rootPath);
          }
          src = this._appendDefaultSearchParams(src);
          this._resolverHash[key] = {
            src
          };
        }
      }
      result[key] = this._resolverHash[key];
    });
    return singleAsset ? result[keys[0]] : result;
  }
  _getPreferredOrder(assets) {
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[0];
      const preferred = this._preferredOrder.find((preference) => preference.params.format.includes(asset.format));
      if (preferred) {
        return preferred;
      }
    }
    return this._preferredOrder[0];
  }
  _appendDefaultSearchParams(url) {
    if (!this._defaultSearchParams)
      return url;
    const paramConnector = /\?/.test(url) ? "&" : "?";
    return `${url}${paramConnector}${this._defaultSearchParams}`;
  }
}

class AssetsClass {
  constructor() {
    this._detections = [];
    this._initialized = false;
    this.resolver = new Resolver();
    this.loader = new Loader();
    this.cache = Cache;
    this._backgroundLoader = new BackgroundLoader(this.loader);
    this._backgroundLoader.active = true;
    this.reset();
  }
  async init(options = {}) {
    if (this._initialized) {
      console.warn("[Assets]AssetManager already initialized, did you load before calling this Asset.init()?");
      return;
    }
    this._initialized = true;
    if (options.defaultSearchParams) {
      this.resolver.setDefaultSearchParams(options.defaultSearchParams);
    }
    if (options.basePath) {
      this.resolver.basePath = options.basePath;
    }
    if (options.bundleIdentifier) {
      this.resolver.setBundleIdentifier(options.bundleIdentifier);
    }
    if (options.manifest) {
      let manifest = options.manifest;
      if (typeof manifest === "string") {
        manifest = await this.load(manifest);
      }
      this.resolver.addManifest(manifest);
    }
    const resolutionPref = options.texturePreference?.resolution ?? 1;
    const resolution = typeof resolutionPref === "number" ? [resolutionPref] : resolutionPref;
    let formats = [];
    if (options.texturePreference?.format) {
      const formatPref = options.texturePreference?.format;
      formats = typeof formatPref === "string" ? [formatPref] : formatPref;
      for (const detection of this._detections) {
        if (!await detection.test()) {
          formats = await detection.remove(formats);
        }
      }
    } else {
      for (const detection of this._detections) {
        if (await detection.test()) {
          formats = await detection.add(formats);
        }
      }
    }
    this.resolver.prefer({
      params: {
        format: formats,
        resolution
      }
    });
  }
  add(keysIn, assetsIn, data) {
    this.resolver.add(keysIn, assetsIn, data);
  }
  async load(urls, onProgress) {
    if (!this._initialized) {
      await this.init();
    }
    const singleAsset = isSingleItem(urls);
    const urlArray = convertToList(urls).map((url) => {
      if (typeof url !== "string") {
        this.resolver.add(url.src, url);
        return url.src;
      }
      return url;
    });
    const resolveResults = this.resolver.resolve(urlArray);
    const out = await this._mapLoadToResolve(resolveResults, onProgress);
    return singleAsset ? out[urlArray[0]] : out;
  }
  addBundle(bundleId, assets) {
    this.resolver.addBundle(bundleId, assets);
  }
  async loadBundle(bundleIds, onProgress) {
    if (!this._initialized) {
      await this.init();
    }
    let singleAsset = false;
    if (typeof bundleIds === "string") {
      singleAsset = true;
      bundleIds = [bundleIds];
    }
    const resolveResults = this.resolver.resolveBundle(bundleIds);
    const out = {};
    const keys = Object.keys(resolveResults);
    let count = 0;
    let total = 0;
    const _onProgress = () => {
      onProgress?.(++count / total);
    };
    const promises = keys.map((bundleId) => {
      const resolveResult = resolveResults[bundleId];
      total += Object.keys(resolveResult).length;
      return this._mapLoadToResolve(resolveResult, _onProgress).then((resolveResult2) => {
        out[bundleId] = resolveResult2;
      });
    });
    await Promise.all(promises);
    return singleAsset ? out[bundleIds[0]] : out;
  }
  async backgroundLoad(urls) {
    if (!this._initialized) {
      await this.init();
    }
    if (typeof urls === "string") {
      urls = [urls];
    }
    const resolveResults = this.resolver.resolve(urls);
    this._backgroundLoader.add(Object.values(resolveResults));
  }
  async backgroundLoadBundle(bundleIds) {
    if (!this._initialized) {
      await this.init();
    }
    if (typeof bundleIds === "string") {
      bundleIds = [bundleIds];
    }
    const resolveResults = this.resolver.resolveBundle(bundleIds);
    Object.values(resolveResults).forEach((resolveResult) => {
      this._backgroundLoader.add(Object.values(resolveResult));
    });
  }
  reset() {
    this.resolver.reset();
    this.loader.reset();
    this.cache.reset();
    this._initialized = false;
  }
  get(keys) {
    if (typeof keys === "string") {
      return Cache.get(keys);
    }
    const assets = {};
    for (let i = 0; i < keys.length; i++) {
      assets[i] = Cache.get(keys[i]);
    }
    return assets;
  }
  async _mapLoadToResolve(resolveResults, onProgress) {
    const resolveArray = Object.values(resolveResults);
    const resolveKeys = Object.keys(resolveResults);
    this._backgroundLoader.active = false;
    const loadedAssets = await this.loader.load(resolveArray, onProgress);
    this._backgroundLoader.active = true;
    const out = {};
    resolveArray.forEach((resolveResult, i) => {
      const asset = loadedAssets[resolveResult.src];
      const keys = [resolveResult.src];
      if (resolveResult.alias) {
        keys.push(...resolveResult.alias);
      }
      out[resolveKeys[i]] = asset;
      Cache.set(keys, asset);
    });
    return out;
  }
  async unload(urls) {
    if (!this._initialized) {
      await this.init();
    }
    const urlArray = convertToList(urls).map((url) => typeof url !== "string" ? url.src : url);
    const resolveResults = this.resolver.resolve(urlArray);
    await this._unloadFromResolved(resolveResults);
  }
  async unloadBundle(bundleIds) {
    if (!this._initialized) {
      await this.init();
    }
    bundleIds = convertToList(bundleIds);
    const resolveResults = this.resolver.resolveBundle(bundleIds);
    const promises = Object.keys(resolveResults).map((bundleId) => this._unloadFromResolved(resolveResults[bundleId]));
    await Promise.all(promises);
  }
  async _unloadFromResolved(resolveResult) {
    const resolveArray = Object.values(resolveResult);
    resolveArray.forEach((resolveResult2) => {
      Cache.remove(resolveResult2.src);
    });
    await this.loader.unload(resolveArray);
  }
  get detections() {
    return this._detections;
  }
  get preferWorkers() {
    return loadTextures.config.preferWorkers;
  }
  set preferWorkers(value) {
    loadTextures.config.preferWorkers = value;
  }
}
const Assets = new AssetsClass();
extensions$1.handleByList(ExtensionType.LoadParser, Assets.loader.parsers).handleByList(ExtensionType.ResolveParser, Assets.resolver.parsers).handleByList(ExtensionType.CacheParser, Assets.cache.parsers).handleByList(ExtensionType.DetectionParser, Assets.detections);

const cacheTextureArray = {
  extension: ExtensionType.CacheParser,
  test: (asset) => Array.isArray(asset) && asset.every((t) => t instanceof Texture),
  getCacheableAssets: (keys, asset) => {
    const out = {};
    keys.forEach((key) => {
      asset.forEach((item, i) => {
        out[key + (i === 0 ? "" : i + 1)] = item;
      });
    });
    return out;
  }
};
extensions$1.add(cacheTextureArray);

const detectAvif = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 1
  },
  test: async () => {
    if (!globalThis.createImageBitmap)
      return false;
    const avifData = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    const blob = await settings.ADAPTER.fetch(avifData).then((r) => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  },
  add: async (formats) => [...formats, "avif"],
  remove: async (formats) => formats.filter((f) => f !== "avif")
};
extensions$1.add(detectAvif);

const detectWebp = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 0
  },
  test: async () => {
    if (!globalThis.createImageBitmap)
      return false;
    const webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
    const blob = await settings.ADAPTER.fetch(webpData).then((r) => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  },
  add: async (formats) => [...formats, "webp"],
  remove: async (formats) => formats.filter((f) => f !== "webp")
};
extensions$1.add(detectWebp);

const imageFormats = ["png", "jpg", "jpeg"];
const detectDefaults = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: -1
  },
  test: () => Promise.resolve(true),
  add: async (formats) => [...formats, ...imageFormats],
  remove: async (formats) => formats.filter((f) => !imageFormats.includes(f))
};
extensions$1.add(detectDefaults);

const resolveTextureUrl = {
  extension: ExtensionType.ResolveParser,
  test: loadTextures.test,
  parse: (value) => ({
    resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
    format: value.split(".").pop(),
    src: value
  })
};
extensions$1.add(resolveTextureUrl);

var INTERNAL_FORMATS = /* @__PURE__ */ ((INTERNAL_FORMATS2) => {
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGBA_S3TC_DXT1_EXT"] = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGBA_S3TC_DXT3_EXT"] = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT"] = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT"] = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT"] = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_SRGB_S3TC_DXT1_EXT"] = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_R11_EAC"] = 37488] = "COMPRESSED_R11_EAC";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_SIGNED_R11_EAC"] = 37489] = "COMPRESSED_SIGNED_R11_EAC";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RG11_EAC"] = 37490] = "COMPRESSED_RG11_EAC";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_SIGNED_RG11_EAC"] = 37491] = "COMPRESSED_SIGNED_RG11_EAC";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGB8_ETC2"] = 37492] = "COMPRESSED_RGB8_ETC2";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGBA8_ETC2_EAC"] = 37496] = "COMPRESSED_RGBA8_ETC2_EAC";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_SRGB8_ETC2"] = 37493] = "COMPRESSED_SRGB8_ETC2";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_SRGB8_ALPHA8_ETC2_EAC"] = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGB_PVRTC_2BPPV1_IMG"] = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGBA_PVRTC_2BPPV1_IMG"] = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGB_ATC_WEBGL"] = 35986] = "COMPRESSED_RGB_ATC_WEBGL";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL"] = 35986] = "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL"] = 34798] = "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL";
  INTERNAL_FORMATS2[INTERNAL_FORMATS2["COMPRESSED_RGBA_ASTC_4x4_KHR"] = 37808] = "COMPRESSED_RGBA_ASTC_4x4_KHR";
  return INTERNAL_FORMATS2;
})(INTERNAL_FORMATS || {});
const INTERNAL_FORMAT_TO_BYTES_PER_PIXEL = {
  [33776 /* COMPRESSED_RGB_S3TC_DXT1_EXT */]: 0.5,
  [33777 /* COMPRESSED_RGBA_S3TC_DXT1_EXT */]: 0.5,
  [33778 /* COMPRESSED_RGBA_S3TC_DXT3_EXT */]: 1,
  [33779 /* COMPRESSED_RGBA_S3TC_DXT5_EXT */]: 1,
  [35916 /* COMPRESSED_SRGB_S3TC_DXT1_EXT */]: 0.5,
  [35917 /* COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT */]: 0.5,
  [35918 /* COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT */]: 1,
  [35919 /* COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT */]: 1,
  [37488 /* COMPRESSED_R11_EAC */]: 0.5,
  [37489 /* COMPRESSED_SIGNED_R11_EAC */]: 0.5,
  [37490 /* COMPRESSED_RG11_EAC */]: 1,
  [37491 /* COMPRESSED_SIGNED_RG11_EAC */]: 1,
  [37492 /* COMPRESSED_RGB8_ETC2 */]: 0.5,
  [37496 /* COMPRESSED_RGBA8_ETC2_EAC */]: 1,
  [37493 /* COMPRESSED_SRGB8_ETC2 */]: 0.5,
  [37497 /* COMPRESSED_SRGB8_ALPHA8_ETC2_EAC */]: 1,
  [37494 /* COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 */]: 0.5,
  [37495 /* COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 */]: 0.5,
  [35840 /* COMPRESSED_RGB_PVRTC_4BPPV1_IMG */]: 0.5,
  [35842 /* COMPRESSED_RGBA_PVRTC_4BPPV1_IMG */]: 0.5,
  [35841 /* COMPRESSED_RGB_PVRTC_2BPPV1_IMG */]: 0.25,
  [35843 /* COMPRESSED_RGBA_PVRTC_2BPPV1_IMG */]: 0.25,
  [36196 /* COMPRESSED_RGB_ETC1_WEBGL */]: 0.5,
  [35986 /* COMPRESSED_RGB_ATC_WEBGL */]: 0.5,
  [35986 /* COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL */]: 1,
  [34798 /* COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL */]: 1,
  [37808 /* COMPRESSED_RGBA_ASTC_4x4_KHR */]: 1
};

let storedGl;
let extensions;
function getCompressedTextureExtensions() {
  extensions = {
    s3tc: storedGl.getExtension("WEBGL_compressed_texture_s3tc"),
    s3tc_sRGB: storedGl.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
    etc: storedGl.getExtension("WEBGL_compressed_texture_etc"),
    etc1: storedGl.getExtension("WEBGL_compressed_texture_etc1"),
    pvrtc: storedGl.getExtension("WEBGL_compressed_texture_pvrtc") || storedGl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
    atc: storedGl.getExtension("WEBGL_compressed_texture_atc"),
    astc: storedGl.getExtension("WEBGL_compressed_texture_astc")
  };
}
const detectCompressedTextures = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 2
  },
  test: async () => {
    const canvas = settings.ADAPTER.createCanvas();
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not available for compressed textures.");
      return false;
    }
    storedGl = gl;
    return true;
  },
  add: async (formats) => {
    if (!extensions)
      getCompressedTextureExtensions();
    const textureFormats = [];
    for (const extensionName in extensions) {
      const extension = extensions[extensionName];
      if (!extension) {
        continue;
      }
      textureFormats.push(extensionName);
    }
    return [...textureFormats, ...formats];
  },
  remove: async (formats) => {
    if (!extensions)
      getCompressedTextureExtensions();
    return formats.filter((f) => !(f in extensions));
  }
};
extensions$1.add(detectCompressedTextures);

class BlobResource extends BufferResource {
  constructor(source, options = { width: 1, height: 1, autoLoad: true }) {
    let origin;
    let data;
    if (typeof source === "string") {
      origin = source;
      data = new Uint8Array();
    } else {
      origin = null;
      data = source;
    }
    super(data, options);
    this.origin = origin;
    this.buffer = data ? new ViewableBuffer(data) : null;
    if (this.origin && options.autoLoad !== false) {
      this.load();
    }
    if (data?.length) {
      this.loaded = true;
      this.onBlobLoaded(this.buffer.rawBinaryData);
    }
  }
  onBlobLoaded(_data) {
  }
  async load() {
    const response = await fetch(this.origin);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    this.data = new Uint32Array(arrayBuffer);
    this.buffer = new ViewableBuffer(arrayBuffer);
    this.loaded = true;
    this.onBlobLoaded(arrayBuffer);
    this.update();
    return this;
  }
}

class CompressedTextureResource extends BlobResource {
  constructor(source, options) {
    super(source, options);
    this.format = options.format;
    this.levels = options.levels || 1;
    this._width = options.width;
    this._height = options.height;
    this._extension = CompressedTextureResource._formatToExtension(this.format);
    if (options.levelBuffers || this.buffer) {
      this._levelBuffers = options.levelBuffers || CompressedTextureResource._createLevelBuffers(source instanceof Uint8Array ? source : this.buffer.uint8View, this.format, this.levels, 4, 4, this.width, this.height);
    }
  }
  upload(renderer, _texture, _glTexture) {
    const gl = renderer.gl;
    const extension = renderer.context.extensions[this._extension];
    if (!extension) {
      throw new Error(`${this._extension} textures are not supported on the current machine`);
    }
    if (!this._levelBuffers) {
      return false;
    }
    for (let i = 0, j = this.levels; i < j; i++) {
      const { levelID, levelWidth, levelHeight, levelBuffer } = this._levelBuffers[i];
      gl.compressedTexImage2D(gl.TEXTURE_2D, levelID, this.format, levelWidth, levelHeight, 0, levelBuffer);
    }
    return true;
  }
  onBlobLoaded() {
    this._levelBuffers = CompressedTextureResource._createLevelBuffers(this.buffer.uint8View, this.format, this.levels, 4, 4, this.width, this.height);
  }
  static _formatToExtension(format) {
    if (format >= 33776 && format <= 33779) {
      return "s3tc";
    } else if (format >= 37488 && format <= 37497) {
      return "etc";
    } else if (format >= 35840 && format <= 35843) {
      return "pvrtc";
    } else if (format >= 36196) {
      return "etc1";
    } else if (format >= 35986 && format <= 34798) {
      return "atc";
    }
    throw new Error("Invalid (compressed) texture format given!");
  }
  static _createLevelBuffers(buffer, format, levels, blockWidth, blockHeight, imageWidth, imageHeight) {
    const buffers = new Array(levels);
    let offset = buffer.byteOffset;
    let levelWidth = imageWidth;
    let levelHeight = imageHeight;
    let alignedLevelWidth = levelWidth + blockWidth - 1 & ~(blockWidth - 1);
    let alignedLevelHeight = levelHeight + blockHeight - 1 & ~(blockHeight - 1);
    let levelSize = alignedLevelWidth * alignedLevelHeight * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[format];
    for (let i = 0; i < levels; i++) {
      buffers[i] = {
        levelID: i,
        levelWidth: levels > 1 ? levelWidth : alignedLevelWidth,
        levelHeight: levels > 1 ? levelHeight : alignedLevelHeight,
        levelBuffer: new Uint8Array(buffer.buffer, offset, levelSize)
      };
      offset += levelSize;
      levelWidth = levelWidth >> 1 || 1;
      levelHeight = levelHeight >> 1 || 1;
      alignedLevelWidth = levelWidth + blockWidth - 1 & ~(blockWidth - 1);
      alignedLevelHeight = levelHeight + blockHeight - 1 & ~(blockHeight - 1);
      levelSize = alignedLevelWidth * alignedLevelHeight * INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[format];
    }
    return buffers;
  }
}

const DDS_MAGIC_SIZE = 4;
const DDS_HEADER_SIZE = 124;
const DDS_HEADER_PF_SIZE = 32;
const DDS_HEADER_DX10_SIZE = 20;
const DDS_MAGIC = 542327876;
const DDS_FIELDS = {
  SIZE: 1,
  FLAGS: 2,
  HEIGHT: 3,
  WIDTH: 4,
  MIPMAP_COUNT: 7,
  PIXEL_FORMAT: 19
};
const DDS_PF_FIELDS = {
  SIZE: 0,
  FLAGS: 1,
  FOURCC: 2,
  RGB_BITCOUNT: 3,
  R_BIT_MASK: 4,
  G_BIT_MASK: 5,
  B_BIT_MASK: 6,
  A_BIT_MASK: 7
};
const DDS_DX10_FIELDS = {
  DXGI_FORMAT: 0,
  RESOURCE_DIMENSION: 1,
  MISC_FLAG: 2,
  ARRAY_SIZE: 3,
  MISC_FLAGS2: 4
};
var DXGI_FORMAT = /* @__PURE__ */ ((DXGI_FORMAT2) => {
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_UNKNOWN"] = 0] = "DXGI_FORMAT_UNKNOWN";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32A32_TYPELESS"] = 1] = "DXGI_FORMAT_R32G32B32A32_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32A32_FLOAT"] = 2] = "DXGI_FORMAT_R32G32B32A32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32A32_UINT"] = 3] = "DXGI_FORMAT_R32G32B32A32_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32A32_SINT"] = 4] = "DXGI_FORMAT_R32G32B32A32_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32_TYPELESS"] = 5] = "DXGI_FORMAT_R32G32B32_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32_FLOAT"] = 6] = "DXGI_FORMAT_R32G32B32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32_UINT"] = 7] = "DXGI_FORMAT_R32G32B32_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32_SINT"] = 8] = "DXGI_FORMAT_R32G32B32_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_TYPELESS"] = 9] = "DXGI_FORMAT_R16G16B16A16_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_FLOAT"] = 10] = "DXGI_FORMAT_R16G16B16A16_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_UNORM"] = 11] = "DXGI_FORMAT_R16G16B16A16_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_UINT"] = 12] = "DXGI_FORMAT_R16G16B16A16_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_SNORM"] = 13] = "DXGI_FORMAT_R16G16B16A16_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_SINT"] = 14] = "DXGI_FORMAT_R16G16B16A16_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32_TYPELESS"] = 15] = "DXGI_FORMAT_R32G32_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32_FLOAT"] = 16] = "DXGI_FORMAT_R32G32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32_UINT"] = 17] = "DXGI_FORMAT_R32G32_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32_SINT"] = 18] = "DXGI_FORMAT_R32G32_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G8X24_TYPELESS"] = 19] = "DXGI_FORMAT_R32G8X24_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_D32_FLOAT_S8X24_UINT"] = 20] = "DXGI_FORMAT_D32_FLOAT_S8X24_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS"] = 21] = "DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_X32_TYPELESS_G8X24_UINT"] = 22] = "DXGI_FORMAT_X32_TYPELESS_G8X24_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R10G10B10A2_TYPELESS"] = 23] = "DXGI_FORMAT_R10G10B10A2_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R10G10B10A2_UNORM"] = 24] = "DXGI_FORMAT_R10G10B10A2_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R10G10B10A2_UINT"] = 25] = "DXGI_FORMAT_R10G10B10A2_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R11G11B10_FLOAT"] = 26] = "DXGI_FORMAT_R11G11B10_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_TYPELESS"] = 27] = "DXGI_FORMAT_R8G8B8A8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_UNORM"] = 28] = "DXGI_FORMAT_R8G8B8A8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_UNORM_SRGB"] = 29] = "DXGI_FORMAT_R8G8B8A8_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_UINT"] = 30] = "DXGI_FORMAT_R8G8B8A8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_SNORM"] = 31] = "DXGI_FORMAT_R8G8B8A8_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_SINT"] = 32] = "DXGI_FORMAT_R8G8B8A8_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_TYPELESS"] = 33] = "DXGI_FORMAT_R16G16_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_FLOAT"] = 34] = "DXGI_FORMAT_R16G16_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_UNORM"] = 35] = "DXGI_FORMAT_R16G16_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_UINT"] = 36] = "DXGI_FORMAT_R16G16_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_SNORM"] = 37] = "DXGI_FORMAT_R16G16_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_SINT"] = 38] = "DXGI_FORMAT_R16G16_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_TYPELESS"] = 39] = "DXGI_FORMAT_R32_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_D32_FLOAT"] = 40] = "DXGI_FORMAT_D32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_FLOAT"] = 41] = "DXGI_FORMAT_R32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_UINT"] = 42] = "DXGI_FORMAT_R32_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_SINT"] = 43] = "DXGI_FORMAT_R32_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R24G8_TYPELESS"] = 44] = "DXGI_FORMAT_R24G8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_D24_UNORM_S8_UINT"] = 45] = "DXGI_FORMAT_D24_UNORM_S8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R24_UNORM_X8_TYPELESS"] = 46] = "DXGI_FORMAT_R24_UNORM_X8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_X24_TYPELESS_G8_UINT"] = 47] = "DXGI_FORMAT_X24_TYPELESS_G8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_TYPELESS"] = 48] = "DXGI_FORMAT_R8G8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_UNORM"] = 49] = "DXGI_FORMAT_R8G8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_UINT"] = 50] = "DXGI_FORMAT_R8G8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_SNORM"] = 51] = "DXGI_FORMAT_R8G8_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_SINT"] = 52] = "DXGI_FORMAT_R8G8_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_TYPELESS"] = 53] = "DXGI_FORMAT_R16_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_FLOAT"] = 54] = "DXGI_FORMAT_R16_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_D16_UNORM"] = 55] = "DXGI_FORMAT_D16_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_UNORM"] = 56] = "DXGI_FORMAT_R16_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_UINT"] = 57] = "DXGI_FORMAT_R16_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_SNORM"] = 58] = "DXGI_FORMAT_R16_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_SINT"] = 59] = "DXGI_FORMAT_R16_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_TYPELESS"] = 60] = "DXGI_FORMAT_R8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_UNORM"] = 61] = "DXGI_FORMAT_R8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_UINT"] = 62] = "DXGI_FORMAT_R8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_SNORM"] = 63] = "DXGI_FORMAT_R8_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_SINT"] = 64] = "DXGI_FORMAT_R8_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_A8_UNORM"] = 65] = "DXGI_FORMAT_A8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R1_UNORM"] = 66] = "DXGI_FORMAT_R1_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R9G9B9E5_SHAREDEXP"] = 67] = "DXGI_FORMAT_R9G9B9E5_SHAREDEXP";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_B8G8_UNORM"] = 68] = "DXGI_FORMAT_R8G8_B8G8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_G8R8_G8B8_UNORM"] = 69] = "DXGI_FORMAT_G8R8_G8B8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC1_TYPELESS"] = 70] = "DXGI_FORMAT_BC1_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC1_UNORM"] = 71] = "DXGI_FORMAT_BC1_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC1_UNORM_SRGB"] = 72] = "DXGI_FORMAT_BC1_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC2_TYPELESS"] = 73] = "DXGI_FORMAT_BC2_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC2_UNORM"] = 74] = "DXGI_FORMAT_BC2_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC2_UNORM_SRGB"] = 75] = "DXGI_FORMAT_BC2_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC3_TYPELESS"] = 76] = "DXGI_FORMAT_BC3_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC3_UNORM"] = 77] = "DXGI_FORMAT_BC3_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC3_UNORM_SRGB"] = 78] = "DXGI_FORMAT_BC3_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC4_TYPELESS"] = 79] = "DXGI_FORMAT_BC4_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC4_UNORM"] = 80] = "DXGI_FORMAT_BC4_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC4_SNORM"] = 81] = "DXGI_FORMAT_BC4_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC5_TYPELESS"] = 82] = "DXGI_FORMAT_BC5_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC5_UNORM"] = 83] = "DXGI_FORMAT_BC5_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC5_SNORM"] = 84] = "DXGI_FORMAT_BC5_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B5G6R5_UNORM"] = 85] = "DXGI_FORMAT_B5G6R5_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B5G5R5A1_UNORM"] = 86] = "DXGI_FORMAT_B5G5R5A1_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8A8_UNORM"] = 87] = "DXGI_FORMAT_B8G8R8A8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8X8_UNORM"] = 88] = "DXGI_FORMAT_B8G8R8X8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM"] = 89] = "DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8A8_TYPELESS"] = 90] = "DXGI_FORMAT_B8G8R8A8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8A8_UNORM_SRGB"] = 91] = "DXGI_FORMAT_B8G8R8A8_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8X8_TYPELESS"] = 92] = "DXGI_FORMAT_B8G8R8X8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8X8_UNORM_SRGB"] = 93] = "DXGI_FORMAT_B8G8R8X8_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC6H_TYPELESS"] = 94] = "DXGI_FORMAT_BC6H_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC6H_UF16"] = 95] = "DXGI_FORMAT_BC6H_UF16";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC6H_SF16"] = 96] = "DXGI_FORMAT_BC6H_SF16";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC7_TYPELESS"] = 97] = "DXGI_FORMAT_BC7_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC7_UNORM"] = 98] = "DXGI_FORMAT_BC7_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC7_UNORM_SRGB"] = 99] = "DXGI_FORMAT_BC7_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_AYUV"] = 100] = "DXGI_FORMAT_AYUV";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_Y410"] = 101] = "DXGI_FORMAT_Y410";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_Y416"] = 102] = "DXGI_FORMAT_Y416";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_NV12"] = 103] = "DXGI_FORMAT_NV12";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_P010"] = 104] = "DXGI_FORMAT_P010";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_P016"] = 105] = "DXGI_FORMAT_P016";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_420_OPAQUE"] = 106] = "DXGI_FORMAT_420_OPAQUE";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_YUY2"] = 107] = "DXGI_FORMAT_YUY2";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_Y210"] = 108] = "DXGI_FORMAT_Y210";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_Y216"] = 109] = "DXGI_FORMAT_Y216";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_NV11"] = 110] = "DXGI_FORMAT_NV11";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_AI44"] = 111] = "DXGI_FORMAT_AI44";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_IA44"] = 112] = "DXGI_FORMAT_IA44";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_P8"] = 113] = "DXGI_FORMAT_P8";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_A8P8"] = 114] = "DXGI_FORMAT_A8P8";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B4G4R4A4_UNORM"] = 115] = "DXGI_FORMAT_B4G4R4A4_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_P208"] = 116] = "DXGI_FORMAT_P208";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_V208"] = 117] = "DXGI_FORMAT_V208";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_V408"] = 118] = "DXGI_FORMAT_V408";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE"] = 119] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE"] = 120] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_FORCE_UINT"] = 121] = "DXGI_FORMAT_FORCE_UINT";
  return DXGI_FORMAT2;
})(DXGI_FORMAT || {});
var D3D10_RESOURCE_DIMENSION = /* @__PURE__ */ ((D3D10_RESOURCE_DIMENSION2) => {
  D3D10_RESOURCE_DIMENSION2[D3D10_RESOURCE_DIMENSION2["DDS_DIMENSION_TEXTURE1D"] = 2] = "DDS_DIMENSION_TEXTURE1D";
  D3D10_RESOURCE_DIMENSION2[D3D10_RESOURCE_DIMENSION2["DDS_DIMENSION_TEXTURE2D"] = 3] = "DDS_DIMENSION_TEXTURE2D";
  D3D10_RESOURCE_DIMENSION2[D3D10_RESOURCE_DIMENSION2["DDS_DIMENSION_TEXTURE3D"] = 6] = "DDS_DIMENSION_TEXTURE3D";
  return D3D10_RESOURCE_DIMENSION2;
})(D3D10_RESOURCE_DIMENSION || {});
const PF_FLAGS = 1;
const DDPF_ALPHA = 2;
const DDPF_FOURCC = 4;
const DDPF_RGB = 64;
const DDPF_YUV = 512;
const DDPF_LUMINANCE = 131072;
const FOURCC_DXT1 = 827611204;
const FOURCC_DXT3 = 861165636;
const FOURCC_DXT5 = 894720068;
const FOURCC_DX10 = 808540228;
const DDS_RESOURCE_MISC_TEXTURECUBE = 4;
const FOURCC_TO_FORMAT = {
  [FOURCC_DXT1]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT,
  [FOURCC_DXT3]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT,
  [FOURCC_DXT5]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT
};
const DXGI_TO_FORMAT = {
  [70 /* DXGI_FORMAT_BC1_TYPELESS */]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT,
  [71 /* DXGI_FORMAT_BC1_UNORM */]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT1_EXT,
  [73 /* DXGI_FORMAT_BC2_TYPELESS */]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT,
  [74 /* DXGI_FORMAT_BC2_UNORM */]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT3_EXT,
  [76 /* DXGI_FORMAT_BC3_TYPELESS */]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT,
  [77 /* DXGI_FORMAT_BC3_UNORM */]: INTERNAL_FORMATS.COMPRESSED_RGBA_S3TC_DXT5_EXT,
  [72 /* DXGI_FORMAT_BC1_UNORM_SRGB */]: INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,
  [75 /* DXGI_FORMAT_BC2_UNORM_SRGB */]: INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,
  [78 /* DXGI_FORMAT_BC3_UNORM_SRGB */]: INTERNAL_FORMATS.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
};
function parseDDS(arrayBuffer) {
  const data = new Uint32Array(arrayBuffer);
  const magicWord = data[0];
  if (magicWord !== DDS_MAGIC) {
    throw new Error("Invalid DDS file magic word");
  }
  const header = new Uint32Array(arrayBuffer, 0, DDS_HEADER_SIZE / Uint32Array.BYTES_PER_ELEMENT);
  const height = header[DDS_FIELDS.HEIGHT];
  const width = header[DDS_FIELDS.WIDTH];
  const mipmapCount = header[DDS_FIELDS.MIPMAP_COUNT];
  const pixelFormat = new Uint32Array(arrayBuffer, DDS_FIELDS.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT, DDS_HEADER_PF_SIZE / Uint32Array.BYTES_PER_ELEMENT);
  const formatFlags = pixelFormat[PF_FLAGS];
  if (formatFlags & DDPF_FOURCC) {
    const fourCC = pixelFormat[DDS_PF_FIELDS.FOURCC];
    if (fourCC !== FOURCC_DX10) {
      const internalFormat2 = FOURCC_TO_FORMAT[fourCC];
      const dataOffset2 = DDS_MAGIC_SIZE + DDS_HEADER_SIZE;
      const texData = new Uint8Array(arrayBuffer, dataOffset2);
      const resource = new CompressedTextureResource(texData, {
        format: internalFormat2,
        width,
        height,
        levels: mipmapCount
      });
      return [resource];
    }
    const dx10Offset = DDS_MAGIC_SIZE + DDS_HEADER_SIZE;
    const dx10Header = new Uint32Array(data.buffer, dx10Offset, DDS_HEADER_DX10_SIZE / Uint32Array.BYTES_PER_ELEMENT);
    const dxgiFormat = dx10Header[DDS_DX10_FIELDS.DXGI_FORMAT];
    const resourceDimension = dx10Header[DDS_DX10_FIELDS.RESOURCE_DIMENSION];
    const miscFlag = dx10Header[DDS_DX10_FIELDS.MISC_FLAG];
    const arraySize = dx10Header[DDS_DX10_FIELDS.ARRAY_SIZE];
    const internalFormat = DXGI_TO_FORMAT[dxgiFormat];
    if (internalFormat === void 0) {
      throw new Error(`DDSParser cannot parse texture data with DXGI format ${dxgiFormat}`);
    }
    if (miscFlag === DDS_RESOURCE_MISC_TEXTURECUBE) {
      throw new Error("DDSParser does not support cubemap textures");
    }
    if (resourceDimension === 6 /* DDS_DIMENSION_TEXTURE3D */) {
      throw new Error("DDSParser does not supported 3D texture data");
    }
    const imageBuffers = new Array();
    const dataOffset = DDS_MAGIC_SIZE + DDS_HEADER_SIZE + DDS_HEADER_DX10_SIZE;
    if (arraySize === 1) {
      imageBuffers.push(new Uint8Array(arrayBuffer, dataOffset));
    } else {
      const pixelSize = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[internalFormat];
      let imageSize = 0;
      let levelWidth = width;
      let levelHeight = height;
      for (let i = 0; i < mipmapCount; i++) {
        const alignedLevelWidth = Math.max(1, levelWidth + 3 & ~3);
        const alignedLevelHeight = Math.max(1, levelHeight + 3 & ~3);
        const levelSize = alignedLevelWidth * alignedLevelHeight * pixelSize;
        imageSize += levelSize;
        levelWidth = levelWidth >>> 1;
        levelHeight = levelHeight >>> 1;
      }
      let imageOffset = dataOffset;
      for (let i = 0; i < arraySize; i++) {
        imageBuffers.push(new Uint8Array(arrayBuffer, imageOffset, imageSize));
        imageOffset += imageSize;
      }
    }
    return imageBuffers.map((buffer) => new CompressedTextureResource(buffer, {
      format: internalFormat,
      width,
      height,
      levels: mipmapCount
    }));
  }
  if (formatFlags & DDPF_RGB) {
    throw new Error("DDSParser does not support uncompressed texture data.");
  }
  if (formatFlags & DDPF_YUV) {
    throw new Error("DDSParser does not supported YUV uncompressed texture data.");
  }
  if (formatFlags & DDPF_LUMINANCE) {
    throw new Error("DDSParser does not support single-channel (lumninance) texture data!");
  }
  if (formatFlags & DDPF_ALPHA) {
    throw new Error("DDSParser does not support single-channel (alpha) texture data!");
  }
  throw new Error("DDSParser failed to load a texture file due to an unknown reason!");
}

const FILE_IDENTIFIER = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10];
const ENDIANNESS = 67305985;
const KTX_FIELDS = {
  FILE_IDENTIFIER: 0,
  ENDIANNESS: 12,
  GL_TYPE: 16,
  GL_TYPE_SIZE: 20,
  GL_FORMAT: 24,
  GL_INTERNAL_FORMAT: 28,
  GL_BASE_INTERNAL_FORMAT: 32,
  PIXEL_WIDTH: 36,
  PIXEL_HEIGHT: 40,
  PIXEL_DEPTH: 44,
  NUMBER_OF_ARRAY_ELEMENTS: 48,
  NUMBER_OF_FACES: 52,
  NUMBER_OF_MIPMAP_LEVELS: 56,
  BYTES_OF_KEY_VALUE_DATA: 60
};
const FILE_HEADER_SIZE = 64;
const TYPES_TO_BYTES_PER_COMPONENT = {
  [TYPES.UNSIGNED_BYTE]: 1,
  [TYPES.UNSIGNED_SHORT]: 2,
  [TYPES.INT]: 4,
  [TYPES.UNSIGNED_INT]: 4,
  [TYPES.FLOAT]: 4,
  [TYPES.HALF_FLOAT]: 8
};
const FORMATS_TO_COMPONENTS = {
  [FORMATS.RGBA]: 4,
  [FORMATS.RGB]: 3,
  [FORMATS.RG]: 2,
  [FORMATS.RED]: 1,
  [FORMATS.LUMINANCE]: 1,
  [FORMATS.LUMINANCE_ALPHA]: 2,
  [FORMATS.ALPHA]: 1
};
const TYPES_TO_BYTES_PER_PIXEL = {
  [TYPES.UNSIGNED_SHORT_4_4_4_4]: 2,
  [TYPES.UNSIGNED_SHORT_5_5_5_1]: 2,
  [TYPES.UNSIGNED_SHORT_5_6_5]: 2
};
function parseKTX(url, arrayBuffer, loadKeyValueData = false) {
  const dataView = new DataView(arrayBuffer);
  if (!validate(url, dataView)) {
    return null;
  }
  const littleEndian = dataView.getUint32(KTX_FIELDS.ENDIANNESS, true) === ENDIANNESS;
  const glType = dataView.getUint32(KTX_FIELDS.GL_TYPE, littleEndian);
  const glFormat = dataView.getUint32(KTX_FIELDS.GL_FORMAT, littleEndian);
  const glInternalFormat = dataView.getUint32(KTX_FIELDS.GL_INTERNAL_FORMAT, littleEndian);
  const pixelWidth = dataView.getUint32(KTX_FIELDS.PIXEL_WIDTH, littleEndian);
  const pixelHeight = dataView.getUint32(KTX_FIELDS.PIXEL_HEIGHT, littleEndian) || 1;
  const pixelDepth = dataView.getUint32(KTX_FIELDS.PIXEL_DEPTH, littleEndian) || 1;
  const numberOfArrayElements = dataView.getUint32(KTX_FIELDS.NUMBER_OF_ARRAY_ELEMENTS, littleEndian) || 1;
  const numberOfFaces = dataView.getUint32(KTX_FIELDS.NUMBER_OF_FACES, littleEndian);
  const numberOfMipmapLevels = dataView.getUint32(KTX_FIELDS.NUMBER_OF_MIPMAP_LEVELS, littleEndian);
  const bytesOfKeyValueData = dataView.getUint32(KTX_FIELDS.BYTES_OF_KEY_VALUE_DATA, littleEndian);
  if (pixelHeight === 0 || pixelDepth !== 1) {
    throw new Error("Only 2D textures are supported");
  }
  if (numberOfFaces !== 1) {
    throw new Error("CubeTextures are not supported by KTXLoader yet!");
  }
  if (numberOfArrayElements !== 1) {
    throw new Error("WebGL does not support array textures");
  }
  const blockWidth = 4;
  const blockHeight = 4;
  const alignedWidth = pixelWidth + 3 & ~3;
  const alignedHeight = pixelHeight + 3 & ~3;
  const imageBuffers = new Array(numberOfArrayElements);
  let imagePixels = pixelWidth * pixelHeight;
  if (glType === 0) {
    imagePixels = alignedWidth * alignedHeight;
  }
  let imagePixelByteSize;
  if (glType !== 0) {
    if (TYPES_TO_BYTES_PER_COMPONENT[glType]) {
      imagePixelByteSize = TYPES_TO_BYTES_PER_COMPONENT[glType] * FORMATS_TO_COMPONENTS[glFormat];
    } else {
      imagePixelByteSize = TYPES_TO_BYTES_PER_PIXEL[glType];
    }
  } else {
    imagePixelByteSize = INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[glInternalFormat];
  }
  if (imagePixelByteSize === void 0) {
    throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
  }
  const kvData = loadKeyValueData ? parseKvData(dataView, bytesOfKeyValueData, littleEndian) : null;
  const imageByteSize = imagePixels * imagePixelByteSize;
  let mipByteSize = imageByteSize;
  let mipWidth = pixelWidth;
  let mipHeight = pixelHeight;
  let alignedMipWidth = alignedWidth;
  let alignedMipHeight = alignedHeight;
  let imageOffset = FILE_HEADER_SIZE + bytesOfKeyValueData;
  for (let mipmapLevel = 0; mipmapLevel < numberOfMipmapLevels; mipmapLevel++) {
    const imageSize = dataView.getUint32(imageOffset, littleEndian);
    let elementOffset = imageOffset + 4;
    for (let arrayElement = 0; arrayElement < numberOfArrayElements; arrayElement++) {
      let mips = imageBuffers[arrayElement];
      if (!mips) {
        mips = imageBuffers[arrayElement] = new Array(numberOfMipmapLevels);
      }
      mips[mipmapLevel] = {
        levelID: mipmapLevel,
        levelWidth: numberOfMipmapLevels > 1 || glType !== 0 ? mipWidth : alignedMipWidth,
        levelHeight: numberOfMipmapLevels > 1 || glType !== 0 ? mipHeight : alignedMipHeight,
        levelBuffer: new Uint8Array(arrayBuffer, elementOffset, mipByteSize)
      };
      elementOffset += mipByteSize;
    }
    imageOffset += imageSize + 4;
    imageOffset = imageOffset % 4 !== 0 ? imageOffset + 4 - imageOffset % 4 : imageOffset;
    mipWidth = mipWidth >> 1 || 1;
    mipHeight = mipHeight >> 1 || 1;
    alignedMipWidth = mipWidth + blockWidth - 1 & ~(blockWidth - 1);
    alignedMipHeight = mipHeight + blockHeight - 1 & ~(blockHeight - 1);
    mipByteSize = alignedMipWidth * alignedMipHeight * imagePixelByteSize;
  }
  if (glType !== 0) {
    return {
      uncompressed: imageBuffers.map((levelBuffers) => {
        let buffer = levelBuffers[0].levelBuffer;
        let convertToInt = false;
        if (glType === TYPES.FLOAT) {
          buffer = new Float32Array(levelBuffers[0].levelBuffer.buffer, levelBuffers[0].levelBuffer.byteOffset, levelBuffers[0].levelBuffer.byteLength / 4);
        } else if (glType === TYPES.UNSIGNED_INT) {
          convertToInt = true;
          buffer = new Uint32Array(levelBuffers[0].levelBuffer.buffer, levelBuffers[0].levelBuffer.byteOffset, levelBuffers[0].levelBuffer.byteLength / 4);
        } else if (glType === TYPES.INT) {
          convertToInt = true;
          buffer = new Int32Array(levelBuffers[0].levelBuffer.buffer, levelBuffers[0].levelBuffer.byteOffset, levelBuffers[0].levelBuffer.byteLength / 4);
        }
        return {
          resource: new BufferResource(buffer, {
            width: levelBuffers[0].levelWidth,
            height: levelBuffers[0].levelHeight
          }),
          type: glType,
          format: convertToInt ? convertFormatToInteger(glFormat) : glFormat
        };
      }),
      kvData
    };
  }
  return {
    compressed: imageBuffers.map((levelBuffers) => new CompressedTextureResource(null, {
      format: glInternalFormat,
      width: pixelWidth,
      height: pixelHeight,
      levels: numberOfMipmapLevels,
      levelBuffers
    })),
    kvData
  };
}
function validate(url, dataView) {
  for (let i = 0; i < FILE_IDENTIFIER.length; i++) {
    if (dataView.getUint8(i) !== FILE_IDENTIFIER[i]) {
      console.error(`${url} is not a valid *.ktx file!`);
      return false;
    }
  }
  return true;
}
function convertFormatToInteger(format) {
  switch (format) {
    case FORMATS.RGBA:
      return FORMATS.RGBA_INTEGER;
    case FORMATS.RGB:
      return FORMATS.RGB_INTEGER;
    case FORMATS.RG:
      return FORMATS.RG_INTEGER;
    case FORMATS.RED:
      return FORMATS.RED_INTEGER;
    default:
      return format;
  }
}
function parseKvData(dataView, bytesOfKeyValueData, littleEndian) {
  const kvData = /* @__PURE__ */ new Map();
  let bytesIntoKeyValueData = 0;
  while (bytesIntoKeyValueData < bytesOfKeyValueData) {
    const keyAndValueByteSize = dataView.getUint32(FILE_HEADER_SIZE + bytesIntoKeyValueData, littleEndian);
    const keyAndValueByteOffset = FILE_HEADER_SIZE + bytesIntoKeyValueData + 4;
    const valuePadding = 3 - (keyAndValueByteSize + 3) % 4;
    if (keyAndValueByteSize === 0 || keyAndValueByteSize > bytesOfKeyValueData - bytesIntoKeyValueData) {
      console.error("KTXLoader: keyAndValueByteSize out of bounds");
      break;
    }
    let keyNulByte = 0;
    for (; keyNulByte < keyAndValueByteSize; keyNulByte++) {
      if (dataView.getUint8(keyAndValueByteOffset + keyNulByte) === 0) {
        break;
      }
    }
    if (keyNulByte === -1) {
      console.error("KTXLoader: Failed to find null byte terminating kvData key");
      break;
    }
    const key = new TextDecoder().decode(new Uint8Array(dataView.buffer, keyAndValueByteOffset, keyNulByte));
    const value = new DataView(dataView.buffer, keyAndValueByteOffset + keyNulByte + 1, keyAndValueByteSize - keyNulByte - 1);
    kvData.set(key, value);
    bytesIntoKeyValueData += 4 + keyAndValueByteSize + valuePadding;
  }
  return kvData;
}

const loadDDS = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  test(url) {
    return checkExtension(url, ".dds");
  },
  async load(url, asset, loader) {
    const response = await settings.ADAPTER.fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const resources = parseDDS(arrayBuffer);
    const textures = resources.map((resource) => {
      const base = new BaseTexture(resource, {
        mipmap: MIPMAP_MODES.OFF,
        alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA,
        resolution: getResolutionOfUrl(url),
        ...asset.data
      });
      return createTexture(base, loader, url);
    });
    return textures.length === 1 ? textures[0] : textures;
  },
  unload(texture) {
    if (Array.isArray(texture)) {
      texture.forEach((t) => t.destroy(true));
    } else {
      texture.destroy(true);
    }
  }
};
extensions$1.add(loadDDS);

const loadKTX = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High
  },
  test(url) {
    return checkExtension(url, ".ktx");
  },
  async load(url, asset, loader) {
    const response = await settings.ADAPTER.fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const { compressed, uncompressed, kvData } = parseKTX(url, arrayBuffer);
    const resources = compressed ?? uncompressed;
    const options = {
      mipmap: MIPMAP_MODES.OFF,
      alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA,
      resolution: getResolutionOfUrl(url),
      ...asset.data
    };
    const textures = resources.map((resource) => {
      if (resources === uncompressed) {
        Object.assign(options, {
          type: resource.type,
          format: resource.format
        });
      }
      const base = new BaseTexture(resource, options);
      base.ktxKeyValueData = kvData;
      return createTexture(base, loader, url);
    });
    return textures.length === 1 ? textures[0] : textures;
  },
  unload(texture) {
    if (Array.isArray(texture)) {
      texture.forEach((t) => t.destroy(true));
    } else {
      texture.destroy(true);
    }
  }
};
extensions$1.add(loadKTX);

const resolveCompressedTextureUrl = {
  extension: ExtensionType.ResolveParser,
  test: (value) => {
    const temp = value.split("?")[0];
    const extension = temp.split(".").pop();
    return ["basis", "ktx", "dds"].includes(extension);
  },
  parse: (value) => {
    const temp = value.split("?")[0];
    const extension = temp.split(".").pop();
    if (extension === "ktx") {
      const extensions2 = [
        ".s3tc.ktx",
        ".s3tc_sRGB.ktx",
        ".etc.ktx",
        ".etc1.ktx",
        ".pvrt.ktx",
        ".atc.ktx",
        ".astc.ktx"
      ];
      if (extensions2.some((ext) => value.endsWith(ext))) {
        return {
          resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
          format: extensions2.find((ext) => value.endsWith(ext)),
          src: value
        };
      }
    }
    return {
      resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
      format: value.split(".").pop(),
      src: value
    };
  }
};
extensions$1.add(resolveCompressedTextureUrl);

const TEMP_RECT = new Rectangle();
const BYTES_PER_PIXEL = 4;
const _Extract = class {
  constructor(renderer) {
    this.renderer = renderer;
  }
  async image(target, format, quality) {
    const image = new Image();
    image.src = await this.base64(target, format, quality);
    return image;
  }
  async base64(target, format, quality) {
    const canvas = this.canvas(target);
    if (canvas.toDataURL !== void 0) {
      return canvas.toDataURL(format, quality);
    }
    if (canvas.convertToBlob !== void 0) {
      const blob = await canvas.convertToBlob({ type: format, quality });
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }
    throw new Error("Extract.base64() requires ICanvas.toDataURL or ICanvas.convertToBlob to be implemented");
  }
  canvas(target, frame) {
    const renderer = this.renderer;
    let resolution;
    let flipY = false;
    let renderTexture;
    let generated = false;
    if (target) {
      if (target instanceof RenderTexture) {
        renderTexture = target;
      } else {
        renderTexture = this.renderer.generateTexture(target);
        generated = true;
      }
    }
    if (renderTexture) {
      resolution = renderTexture.baseTexture.resolution;
      frame = frame ?? renderTexture.frame;
      flipY = false;
      renderer.renderTexture.bind(renderTexture);
    } else {
      resolution = renderer.resolution;
      if (!frame) {
        frame = TEMP_RECT;
        frame.width = renderer.width;
        frame.height = renderer.height;
      }
      flipY = true;
      renderer.renderTexture.bind(null);
    }
    const width = Math.round(frame.width * resolution);
    const height = Math.round(frame.height * resolution);
    let canvasBuffer = new CanvasRenderTarget(width, height, 1);
    const webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height);
    const gl = renderer.gl;
    gl.readPixels(Math.round(frame.x * resolution), Math.round(frame.y * resolution), width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels);
    const canvasData = canvasBuffer.context.getImageData(0, 0, width, height);
    _Extract.arrayPostDivide(webglPixels, canvasData.data);
    canvasBuffer.context.putImageData(canvasData, 0, 0);
    if (flipY) {
      const target2 = new CanvasRenderTarget(canvasBuffer.width, canvasBuffer.height, 1);
      target2.context.scale(1, -1);
      target2.context.drawImage(canvasBuffer.canvas, 0, -height);
      canvasBuffer.destroy();
      canvasBuffer = target2;
    }
    if (generated) {
      renderTexture.destroy(true);
    }
    return canvasBuffer.canvas;
  }
  pixels(target, frame) {
    const renderer = this.renderer;
    let resolution;
    let renderTexture;
    let generated = false;
    if (target) {
      if (target instanceof RenderTexture) {
        renderTexture = target;
      } else {
        renderTexture = this.renderer.generateTexture(target);
        generated = true;
      }
    }
    if (renderTexture) {
      resolution = renderTexture.baseTexture.resolution;
      frame = frame ?? renderTexture.frame;
      renderer.renderTexture.bind(renderTexture);
    } else {
      resolution = renderer.resolution;
      if (!frame) {
        frame = TEMP_RECT;
        frame.width = renderer.width;
        frame.height = renderer.height;
      }
      renderer.renderTexture.bind(null);
    }
    const width = Math.round(frame.width * resolution);
    const height = Math.round(frame.height * resolution);
    const webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height);
    const gl = renderer.gl;
    gl.readPixels(Math.round(frame.x * resolution), Math.round(frame.y * resolution), width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels);
    if (generated) {
      renderTexture.destroy(true);
    }
    _Extract.arrayPostDivide(webglPixels, webglPixels);
    return webglPixels;
  }
  destroy() {
    this.renderer = null;
  }
  static arrayPostDivide(pixels, out) {
    for (let i = 0; i < pixels.length; i += 4) {
      const alpha = out[i + 3] = pixels[i + 3];
      if (alpha !== 0) {
        out[i] = Math.round(Math.min(pixels[i] * 255 / alpha, 255));
        out[i + 1] = Math.round(Math.min(pixels[i + 1] * 255 / alpha, 255));
        out[i + 2] = Math.round(Math.min(pixels[i + 2] * 255 / alpha, 255));
      } else {
        out[i] = pixels[i];
        out[i + 1] = pixels[i + 1];
        out[i + 2] = pixels[i + 2];
      }
    }
  }
};
let Extract = _Extract;
Extract.extension = {
  name: "extract",
  type: ExtensionType.RendererSystem
};
extensions$1.add(Extract);

const buildCircle = {
  build(graphicsData) {
    const points = graphicsData.points;
    let x;
    let y;
    let dx;
    let dy;
    let rx;
    let ry;
    if (graphicsData.type === SHAPES.CIRC) {
      const circle = graphicsData.shape;
      x = circle.x;
      y = circle.y;
      rx = ry = circle.radius;
      dx = dy = 0;
    } else if (graphicsData.type === SHAPES.ELIP) {
      const ellipse = graphicsData.shape;
      x = ellipse.x;
      y = ellipse.y;
      rx = ellipse.width;
      ry = ellipse.height;
      dx = dy = 0;
    } else {
      const roundedRect = graphicsData.shape;
      const halfWidth = roundedRect.width / 2;
      const halfHeight = roundedRect.height / 2;
      x = roundedRect.x + halfWidth;
      y = roundedRect.y + halfHeight;
      rx = ry = Math.max(0, Math.min(roundedRect.radius, Math.min(halfWidth, halfHeight)));
      dx = halfWidth - rx;
      dy = halfHeight - ry;
    }
    if (!(rx >= 0 && ry >= 0 && dx >= 0 && dy >= 0)) {
      points.length = 0;
      return;
    }
    const n = Math.ceil(2.3 * Math.sqrt(rx + ry));
    const m = n * 8 + (dx ? 4 : 0) + (dy ? 4 : 0);
    points.length = m;
    if (m === 0) {
      return;
    }
    if (n === 0) {
      points.length = 8;
      points[0] = points[6] = x + dx;
      points[1] = points[3] = y + dy;
      points[2] = points[4] = x - dx;
      points[5] = points[7] = y - dy;
      return;
    }
    let j1 = 0;
    let j2 = n * 4 + (dx ? 2 : 0) + 2;
    let j3 = j2;
    let j4 = m;
    {
      const x0 = dx + rx;
      const y0 = dy;
      const x1 = x + x0;
      const x2 = x - x0;
      const y1 = y + y0;
      points[j1++] = x1;
      points[j1++] = y1;
      points[--j2] = y1;
      points[--j2] = x2;
      if (dy) {
        const y2 = y - y0;
        points[j3++] = x2;
        points[j3++] = y2;
        points[--j4] = y2;
        points[--j4] = x1;
      }
    }
    for (let i = 1; i < n; i++) {
      const a = Math.PI / 2 * (i / n);
      const x0 = dx + Math.cos(a) * rx;
      const y0 = dy + Math.sin(a) * ry;
      const x1 = x + x0;
      const x2 = x - x0;
      const y1 = y + y0;
      const y2 = y - y0;
      points[j1++] = x1;
      points[j1++] = y1;
      points[--j2] = y1;
      points[--j2] = x2;
      points[j3++] = x2;
      points[j3++] = y2;
      points[--j4] = y2;
      points[--j4] = x1;
    }
    {
      const x0 = dx;
      const y0 = dy + ry;
      const x1 = x + x0;
      const x2 = x - x0;
      const y1 = y + y0;
      const y2 = y - y0;
      points[j1++] = x1;
      points[j1++] = y1;
      points[--j4] = y2;
      points[--j4] = x1;
      if (dx) {
        points[j1++] = x2;
        points[j1++] = y1;
        points[--j4] = y2;
        points[--j4] = x2;
      }
    }
  },
  triangulate(graphicsData, graphicsGeometry) {
    const points = graphicsData.points;
    const verts = graphicsGeometry.points;
    const indices = graphicsGeometry.indices;
    if (points.length === 0) {
      return;
    }
    let vertPos = verts.length / 2;
    const center = vertPos;
    let x;
    let y;
    if (graphicsData.type !== SHAPES.RREC) {
      const circle = graphicsData.shape;
      x = circle.x;
      y = circle.y;
    } else {
      const roundedRect = graphicsData.shape;
      x = roundedRect.x + roundedRect.width / 2;
      y = roundedRect.y + roundedRect.height / 2;
    }
    const matrix = graphicsData.matrix;
    verts.push(graphicsData.matrix ? matrix.a * x + matrix.c * y + matrix.tx : x, graphicsData.matrix ? matrix.b * x + matrix.d * y + matrix.ty : y);
    vertPos++;
    verts.push(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2) {
      verts.push(points[i], points[i + 1]);
      indices.push(vertPos++, center, vertPos);
    }
    indices.push(center + 1, center, vertPos);
  }
};

function fixOrientation(points, hole = false) {
  const m = points.length;
  if (m < 6) {
    return;
  }
  let area = 0;
  for (let i = 0, x1 = points[m - 2], y1 = points[m - 1]; i < m; i += 2) {
    const x2 = points[i];
    const y2 = points[i + 1];
    area += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }
  if (!hole && area > 0 || hole && area <= 0) {
    const n = m / 2;
    for (let i = n + n % 2; i < m; i += 2) {
      const i1 = m - i - 2;
      const i2 = m - i - 1;
      const i3 = i;
      const i4 = i + 1;
      [points[i1], points[i3]] = [points[i3], points[i1]];
      [points[i2], points[i4]] = [points[i4], points[i2]];
    }
  }
}
const buildPoly = {
  build(graphicsData) {
    graphicsData.points = graphicsData.shape.points.slice();
  },
  triangulate(graphicsData, graphicsGeometry) {
    let points = graphicsData.points;
    const holes = graphicsData.holes;
    const verts = graphicsGeometry.points;
    const indices = graphicsGeometry.indices;
    if (points.length >= 6) {
      fixOrientation(points, false);
      const holeArray = [];
      for (let i = 0; i < holes.length; i++) {
        const hole = holes[i];
        fixOrientation(hole.points, true);
        holeArray.push(points.length / 2);
        points = points.concat(hole.points);
      }
      const triangles = earcut_1(points, holeArray, 2);
      if (!triangles) {
        return;
      }
      const vertPos = verts.length / 2;
      for (let i = 0; i < triangles.length; i += 3) {
        indices.push(triangles[i] + vertPos);
        indices.push(triangles[i + 1] + vertPos);
        indices.push(triangles[i + 2] + vertPos);
      }
      for (let i = 0; i < points.length; i++) {
        verts.push(points[i]);
      }
    }
  }
};

const buildRectangle = {
  build(graphicsData) {
    const rectData = graphicsData.shape;
    const x = rectData.x;
    const y = rectData.y;
    const width = rectData.width;
    const height = rectData.height;
    const points = graphicsData.points;
    points.length = 0;
    if (!(width >= 0 && height >= 0)) {
      return;
    }
    points.push(x, y, x + width, y, x + width, y + height, x, y + height);
  },
  triangulate(graphicsData, graphicsGeometry) {
    const points = graphicsData.points;
    const verts = graphicsGeometry.points;
    if (points.length === 0) {
      return;
    }
    const vertPos = verts.length / 2;
    verts.push(points[0], points[1], points[2], points[3], points[6], points[7], points[4], points[5]);
    graphicsGeometry.indices.push(vertPos, vertPos + 1, vertPos + 2, vertPos + 1, vertPos + 2, vertPos + 3);
  }
};

const buildRoundedRectangle = {
  build(graphicsData) {
    buildCircle.build(graphicsData);
  },
  triangulate(graphicsData, graphicsGeometry) {
    buildCircle.triangulate(graphicsData, graphicsGeometry);
  }
};

var LINE_JOIN = /* @__PURE__ */ ((LINE_JOIN2) => {
  LINE_JOIN2["MITER"] = "miter";
  LINE_JOIN2["BEVEL"] = "bevel";
  LINE_JOIN2["ROUND"] = "round";
  return LINE_JOIN2;
})(LINE_JOIN || {});
var LINE_CAP = /* @__PURE__ */ ((LINE_CAP2) => {
  LINE_CAP2["BUTT"] = "butt";
  LINE_CAP2["ROUND"] = "round";
  LINE_CAP2["SQUARE"] = "square";
  return LINE_CAP2;
})(LINE_CAP || {});
const curves = {
  adaptive: true,
  maxLength: 10,
  minSegments: 8,
  maxSegments: 2048,
  epsilon: 1e-4,
  _segmentsCount(length, defaultSegments = 20) {
    if (!this.adaptive || !length || isNaN(length)) {
      return defaultSegments;
    }
    let result = Math.ceil(length / this.maxLength);
    if (result < this.minSegments) {
      result = this.minSegments;
    } else if (result > this.maxSegments) {
      result = this.maxSegments;
    }
    return result;
  }
};
const GRAPHICS_CURVES = curves;

class ArcUtils {
  static curveTo(x1, y1, x2, y2, radius, points) {
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    const a1 = fromY - y1;
    const b1 = fromX - x1;
    const a2 = y2 - y1;
    const b2 = x2 - x1;
    const mm = Math.abs(a1 * b2 - b1 * a2);
    if (mm < 1e-8 || radius === 0) {
      if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
        points.push(x1, y1);
      }
      return null;
    }
    const dd = a1 * a1 + b1 * b1;
    const cc = a2 * a2 + b2 * b2;
    const tt = a1 * a2 + b1 * b2;
    const k1 = radius * Math.sqrt(dd) / mm;
    const k2 = radius * Math.sqrt(cc) / mm;
    const j1 = k1 * tt / dd;
    const j2 = k2 * tt / cc;
    const cx = k1 * b2 + k2 * b1;
    const cy = k1 * a2 + k2 * a1;
    const px = b1 * (k2 + j1);
    const py = a1 * (k2 + j1);
    const qx = b2 * (k1 + j2);
    const qy = a2 * (k1 + j2);
    const startAngle = Math.atan2(py - cy, px - cx);
    const endAngle = Math.atan2(qy - cy, qx - cx);
    return {
      cx: cx + x1,
      cy: cy + y1,
      radius,
      startAngle,
      endAngle,
      anticlockwise: b1 * a2 > b2 * a1
    };
  }
  static arc(_startX, _startY, cx, cy, radius, startAngle, endAngle, _anticlockwise, points) {
    const sweep = endAngle - startAngle;
    const n = curves._segmentsCount(Math.abs(sweep) * radius, Math.ceil(Math.abs(sweep) / PI_2) * 40);
    const theta = sweep / (n * 2);
    const theta2 = theta * 2;
    const cTheta = Math.cos(theta);
    const sTheta = Math.sin(theta);
    const segMinus = n - 1;
    const remainder = segMinus % 1 / segMinus;
    for (let i = 0; i <= segMinus; ++i) {
      const real = i + remainder * i;
      const angle = theta + startAngle + theta2 * real;
      const c = Math.cos(angle);
      const s = -Math.sin(angle);
      points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy);
    }
  }
}

class BatchPart {
  constructor() {
    this.reset();
  }
  begin(style, startIndex, attribStart) {
    this.reset();
    this.style = style;
    this.start = startIndex;
    this.attribStart = attribStart;
  }
  end(endIndex, endAttrib) {
    this.attribSize = endAttrib - this.attribStart;
    this.size = endIndex - this.start;
  }
  reset() {
    this.style = null;
    this.size = 0;
    this.start = 0;
    this.attribStart = 0;
    this.attribSize = 0;
  }
}

class BezierUtils {
  static curveLength(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY) {
    const n = 10;
    let result = 0;
    let t = 0;
    let t2 = 0;
    let t3 = 0;
    let nt = 0;
    let nt2 = 0;
    let nt3 = 0;
    let x = 0;
    let y = 0;
    let dx = 0;
    let dy = 0;
    let prevX = fromX;
    let prevY = fromY;
    for (let i = 1; i <= n; ++i) {
      t = i / n;
      t2 = t * t;
      t3 = t2 * t;
      nt = 1 - t;
      nt2 = nt * nt;
      nt3 = nt2 * nt;
      x = nt3 * fromX + 3 * nt2 * t * cpX + 3 * nt * t2 * cpX2 + t3 * toX;
      y = nt3 * fromY + 3 * nt2 * t * cpY + 3 * nt * t2 * cpY2 + t3 * toY;
      dx = prevX - x;
      dy = prevY - y;
      prevX = x;
      prevY = y;
      result += Math.sqrt(dx * dx + dy * dy);
    }
    return result;
  }
  static curveTo(cpX, cpY, cpX2, cpY2, toX, toY, points) {
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    points.length -= 2;
    const n = curves._segmentsCount(BezierUtils.curveLength(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY));
    let dt = 0;
    let dt2 = 0;
    let dt3 = 0;
    let t2 = 0;
    let t3 = 0;
    points.push(fromX, fromY);
    for (let i = 1, j = 0; i <= n; ++i) {
      j = i / n;
      dt = 1 - j;
      dt2 = dt * dt;
      dt3 = dt2 * dt;
      t2 = j * j;
      t3 = t2 * j;
      points.push(dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX, dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
    }
  }
}

function square(x, y, nx, ny, innerWeight, outerWeight, clockwise, verts) {
  const ix = x - nx * innerWeight;
  const iy = y - ny * innerWeight;
  const ox = x + nx * outerWeight;
  const oy = y + ny * outerWeight;
  let exx;
  let eyy;
  if (clockwise) {
    exx = ny;
    eyy = -nx;
  } else {
    exx = -ny;
    eyy = nx;
  }
  const eix = ix + exx;
  const eiy = iy + eyy;
  const eox = ox + exx;
  const eoy = oy + eyy;
  verts.push(eix, eiy);
  verts.push(eox, eoy);
  return 2;
}
function round(cx, cy, sx, sy, ex, ey, verts, clockwise) {
  const cx2p0x = sx - cx;
  const cy2p0y = sy - cy;
  let angle0 = Math.atan2(cx2p0x, cy2p0y);
  let angle1 = Math.atan2(ex - cx, ey - cy);
  if (clockwise && angle0 < angle1) {
    angle0 += Math.PI * 2;
  } else if (!clockwise && angle0 > angle1) {
    angle1 += Math.PI * 2;
  }
  let startAngle = angle0;
  const angleDiff = angle1 - angle0;
  const absAngleDiff = Math.abs(angleDiff);
  const radius = Math.sqrt(cx2p0x * cx2p0x + cy2p0y * cy2p0y);
  const segCount = (15 * absAngleDiff * Math.sqrt(radius) / Math.PI >> 0) + 1;
  const angleInc = angleDiff / segCount;
  startAngle += angleInc;
  if (clockwise) {
    verts.push(cx, cy);
    verts.push(sx, sy);
    for (let i = 1, angle = startAngle; i < segCount; i++, angle += angleInc) {
      verts.push(cx, cy);
      verts.push(cx + Math.sin(angle) * radius, cy + Math.cos(angle) * radius);
    }
    verts.push(cx, cy);
    verts.push(ex, ey);
  } else {
    verts.push(sx, sy);
    verts.push(cx, cy);
    for (let i = 1, angle = startAngle; i < segCount; i++, angle += angleInc) {
      verts.push(cx + Math.sin(angle) * radius, cy + Math.cos(angle) * radius);
      verts.push(cx, cy);
    }
    verts.push(ex, ey);
    verts.push(cx, cy);
  }
  return segCount * 2;
}
function buildNonNativeLine(graphicsData, graphicsGeometry) {
  const shape = graphicsData.shape;
  let points = graphicsData.points || shape.points.slice();
  const eps = graphicsGeometry.closePointEps;
  if (points.length === 0) {
    return;
  }
  const style = graphicsData.lineStyle;
  const firstPoint = new Point(points[0], points[1]);
  const lastPoint = new Point(points[points.length - 2], points[points.length - 1]);
  const closedShape = shape.type !== SHAPES.POLY || shape.closeStroke;
  const closedPath = Math.abs(firstPoint.x - lastPoint.x) < eps && Math.abs(firstPoint.y - lastPoint.y) < eps;
  if (closedShape) {
    points = points.slice();
    if (closedPath) {
      points.pop();
      points.pop();
      lastPoint.set(points[points.length - 2], points[points.length - 1]);
    }
    const midPointX = (firstPoint.x + lastPoint.x) * 0.5;
    const midPointY = (lastPoint.y + firstPoint.y) * 0.5;
    points.unshift(midPointX, midPointY);
    points.push(midPointX, midPointY);
  }
  const verts = graphicsGeometry.points;
  const length = points.length / 2;
  let indexCount = points.length;
  const indexStart = verts.length / 2;
  const width = style.width / 2;
  const widthSquared = width * width;
  const miterLimitSquared = style.miterLimit * style.miterLimit;
  let x0 = points[0];
  let y0 = points[1];
  let x1 = points[2];
  let y1 = points[3];
  let x2 = 0;
  let y2 = 0;
  let perpx = -(y0 - y1);
  let perpy = x0 - x1;
  let perp1x = 0;
  let perp1y = 0;
  let dist = Math.sqrt(perpx * perpx + perpy * perpy);
  perpx /= dist;
  perpy /= dist;
  perpx *= width;
  perpy *= width;
  const ratio = style.alignment;
  const innerWeight = (1 - ratio) * 2;
  const outerWeight = ratio * 2;
  if (!closedShape) {
    if (style.cap === LINE_CAP.ROUND) {
      indexCount += round(x0 - perpx * (innerWeight - outerWeight) * 0.5, y0 - perpy * (innerWeight - outerWeight) * 0.5, x0 - perpx * innerWeight, y0 - perpy * innerWeight, x0 + perpx * outerWeight, y0 + perpy * outerWeight, verts, true) + 2;
    } else if (style.cap === LINE_CAP.SQUARE) {
      indexCount += square(x0, y0, perpx, perpy, innerWeight, outerWeight, true, verts);
    }
  }
  verts.push(x0 - perpx * innerWeight, y0 - perpy * innerWeight);
  verts.push(x0 + perpx * outerWeight, y0 + perpy * outerWeight);
  for (let i = 1; i < length - 1; ++i) {
    x0 = points[(i - 1) * 2];
    y0 = points[(i - 1) * 2 + 1];
    x1 = points[i * 2];
    y1 = points[i * 2 + 1];
    x2 = points[(i + 1) * 2];
    y2 = points[(i + 1) * 2 + 1];
    perpx = -(y0 - y1);
    perpy = x0 - x1;
    dist = Math.sqrt(perpx * perpx + perpy * perpy);
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;
    perp1x = -(y1 - y2);
    perp1y = x1 - x2;
    dist = Math.sqrt(perp1x * perp1x + perp1y * perp1y);
    perp1x /= dist;
    perp1y /= dist;
    perp1x *= width;
    perp1y *= width;
    const dx0 = x1 - x0;
    const dy0 = y0 - y1;
    const dx1 = x1 - x2;
    const dy1 = y2 - y1;
    const dot = dx0 * dx1 + dy0 * dy1;
    const cross = dy0 * dx1 - dy1 * dx0;
    const clockwise = cross < 0;
    if (Math.abs(cross) < 1e-3 * Math.abs(dot)) {
      verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight);
      verts.push(x1 + perpx * outerWeight, y1 + perpy * outerWeight);
      if (dot >= 0) {
        if (style.join === LINE_JOIN.ROUND) {
          indexCount += round(x1, y1, x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 - perp1x * innerWeight, y1 - perp1y * innerWeight, verts, false) + 4;
        } else {
          indexCount += 2;
        }
        verts.push(x1 - perp1x * outerWeight, y1 - perp1y * outerWeight);
        verts.push(x1 + perp1x * innerWeight, y1 + perp1y * innerWeight);
      }
      continue;
    }
    const c1 = (-perpx + x0) * (-perpy + y1) - (-perpx + x1) * (-perpy + y0);
    const c2 = (-perp1x + x2) * (-perp1y + y1) - (-perp1x + x1) * (-perp1y + y2);
    const px = (dx0 * c2 - dx1 * c1) / cross;
    const py = (dy1 * c1 - dy0 * c2) / cross;
    const pdist = (px - x1) * (px - x1) + (py - y1) * (py - y1);
    const imx = x1 + (px - x1) * innerWeight;
    const imy = y1 + (py - y1) * innerWeight;
    const omx = x1 - (px - x1) * outerWeight;
    const omy = y1 - (py - y1) * outerWeight;
    const smallerInsideSegmentSq = Math.min(dx0 * dx0 + dy0 * dy0, dx1 * dx1 + dy1 * dy1);
    const insideWeight = clockwise ? innerWeight : outerWeight;
    const smallerInsideDiagonalSq = smallerInsideSegmentSq + insideWeight * insideWeight * widthSquared;
    const insideMiterOk = pdist <= smallerInsideDiagonalSq;
    if (insideMiterOk) {
      if (style.join === LINE_JOIN.BEVEL || pdist / widthSquared > miterLimitSquared) {
        if (clockwise) {
          verts.push(imx, imy);
          verts.push(x1 + perpx * outerWeight, y1 + perpy * outerWeight);
          verts.push(imx, imy);
          verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
        } else {
          verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight);
          verts.push(omx, omy);
          verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
          verts.push(omx, omy);
        }
        indexCount += 2;
      } else if (style.join === LINE_JOIN.ROUND) {
        if (clockwise) {
          verts.push(imx, imy);
          verts.push(x1 + perpx * outerWeight, y1 + perpy * outerWeight);
          indexCount += round(x1, y1, x1 + perpx * outerWeight, y1 + perpy * outerWeight, x1 + perp1x * outerWeight, y1 + perp1y * outerWeight, verts, true) + 4;
          verts.push(imx, imy);
          verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
        } else {
          verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight);
          verts.push(omx, omy);
          indexCount += round(x1, y1, x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 - perp1x * innerWeight, y1 - perp1y * innerWeight, verts, false) + 4;
          verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
          verts.push(omx, omy);
        }
      } else {
        verts.push(imx, imy);
        verts.push(omx, omy);
      }
    } else {
      verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight);
      verts.push(x1 + perpx * outerWeight, y1 + perpy * outerWeight);
      if (style.join === LINE_JOIN.ROUND) {
        if (clockwise) {
          indexCount += round(x1, y1, x1 + perpx * outerWeight, y1 + perpy * outerWeight, x1 + perp1x * outerWeight, y1 + perp1y * outerWeight, verts, true) + 2;
        } else {
          indexCount += round(x1, y1, x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 - perp1x * innerWeight, y1 - perp1y * innerWeight, verts, false) + 2;
        }
      } else if (style.join === LINE_JOIN.MITER && pdist / widthSquared <= miterLimitSquared) {
        if (clockwise) {
          verts.push(omx, omy);
          verts.push(omx, omy);
        } else {
          verts.push(imx, imy);
          verts.push(imx, imy);
        }
        indexCount += 2;
      }
      verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
      verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
      indexCount += 2;
    }
  }
  x0 = points[(length - 2) * 2];
  y0 = points[(length - 2) * 2 + 1];
  x1 = points[(length - 1) * 2];
  y1 = points[(length - 1) * 2 + 1];
  perpx = -(y0 - y1);
  perpy = x0 - x1;
  dist = Math.sqrt(perpx * perpx + perpy * perpy);
  perpx /= dist;
  perpy /= dist;
  perpx *= width;
  perpy *= width;
  verts.push(x1 - perpx * innerWeight, y1 - perpy * innerWeight);
  verts.push(x1 + perpx * outerWeight, y1 + perpy * outerWeight);
  if (!closedShape) {
    if (style.cap === LINE_CAP.ROUND) {
      indexCount += round(x1 - perpx * (innerWeight - outerWeight) * 0.5, y1 - perpy * (innerWeight - outerWeight) * 0.5, x1 - perpx * innerWeight, y1 - perpy * innerWeight, x1 + perpx * outerWeight, y1 + perpy * outerWeight, verts, false) + 2;
    } else if (style.cap === LINE_CAP.SQUARE) {
      indexCount += square(x1, y1, perpx, perpy, innerWeight, outerWeight, false, verts);
    }
  }
  const indices = graphicsGeometry.indices;
  const eps2 = curves.epsilon * curves.epsilon;
  for (let i = indexStart; i < indexCount + indexStart - 2; ++i) {
    x0 = verts[i * 2];
    y0 = verts[i * 2 + 1];
    x1 = verts[(i + 1) * 2];
    y1 = verts[(i + 1) * 2 + 1];
    x2 = verts[(i + 2) * 2];
    y2 = verts[(i + 2) * 2 + 1];
    if (Math.abs(x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1)) < eps2) {
      continue;
    }
    indices.push(i, i + 1, i + 2);
  }
}
function buildNativeLine(graphicsData, graphicsGeometry) {
  let i = 0;
  const shape = graphicsData.shape;
  const points = graphicsData.points || shape.points;
  const closedShape = shape.type !== SHAPES.POLY || shape.closeStroke;
  if (points.length === 0)
    return;
  const verts = graphicsGeometry.points;
  const indices = graphicsGeometry.indices;
  const length = points.length / 2;
  const startIndex = verts.length / 2;
  let currentIndex = startIndex;
  verts.push(points[0], points[1]);
  for (i = 1; i < length; i++) {
    verts.push(points[i * 2], points[i * 2 + 1]);
    indices.push(currentIndex, currentIndex + 1);
    currentIndex++;
  }
  if (closedShape) {
    indices.push(currentIndex, startIndex);
  }
}
function buildLine(graphicsData, graphicsGeometry) {
  if (graphicsData.lineStyle.native) {
    buildNativeLine(graphicsData, graphicsGeometry);
  } else {
    buildNonNativeLine(graphicsData, graphicsGeometry);
  }
}

class QuadraticUtils {
  static curveLength(fromX, fromY, cpX, cpY, toX, toY) {
    const ax = fromX - 2 * cpX + toX;
    const ay = fromY - 2 * cpY + toY;
    const bx = 2 * cpX - 2 * fromX;
    const by = 2 * cpY - 2 * fromY;
    const a = 4 * (ax * ax + ay * ay);
    const b = 4 * (ax * bx + ay * by);
    const c = bx * bx + by * by;
    const s = 2 * Math.sqrt(a + b + c);
    const a2 = Math.sqrt(a);
    const a32 = 2 * a * a2;
    const c2 = 2 * Math.sqrt(c);
    const ba = b / a2;
    return (a32 * s + a2 * b * (s - c2) + (4 * c * a - b * b) * Math.log((2 * a2 + ba + s) / (ba + c2))) / (4 * a32);
  }
  static curveTo(cpX, cpY, toX, toY, points) {
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    const n = curves._segmentsCount(QuadraticUtils.curveLength(fromX, fromY, cpX, cpY, toX, toY));
    let xa = 0;
    let ya = 0;
    for (let i = 1; i <= n; ++i) {
      const j = i / n;
      xa = fromX + (cpX - fromX) * j;
      ya = fromY + (cpY - fromY) * j;
      points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
    }
  }
}

const FILL_COMMANDS = {
  [SHAPES.POLY]: buildPoly,
  [SHAPES.CIRC]: buildCircle,
  [SHAPES.ELIP]: buildCircle,
  [SHAPES.RECT]: buildRectangle,
  [SHAPES.RREC]: buildRoundedRectangle
};
const BATCH_POOL = [];
const DRAW_CALL_POOL = [];

class GraphicsData {
  constructor(shape, fillStyle = null, lineStyle = null, matrix = null) {
    this.points = [];
    this.holes = [];
    this.shape = shape;
    this.lineStyle = lineStyle;
    this.fillStyle = fillStyle;
    this.matrix = matrix;
    this.type = shape.type;
  }
  clone() {
    return new GraphicsData(this.shape, this.fillStyle, this.lineStyle, this.matrix);
  }
  destroy() {
    this.shape = null;
    this.holes.length = 0;
    this.holes = null;
    this.points.length = 0;
    this.points = null;
    this.lineStyle = null;
    this.fillStyle = null;
  }
}

const tmpPoint = new Point();
const _GraphicsGeometry = class extends BatchGeometry {
  constructor() {
    super();
    this.closePointEps = 1e-4;
    this.boundsPadding = 0;
    this.uvsFloat32 = null;
    this.indicesUint16 = null;
    this.batchable = false;
    this.points = [];
    this.colors = [];
    this.uvs = [];
    this.indices = [];
    this.textureIds = [];
    this.graphicsData = [];
    this.drawCalls = [];
    this.batchDirty = -1;
    this.batches = [];
    this.dirty = 0;
    this.cacheDirty = -1;
    this.clearDirty = 0;
    this.shapeIndex = 0;
    this._bounds = new Bounds();
    this.boundsDirty = -1;
  }
  get bounds() {
    this.updateBatches();
    if (this.boundsDirty !== this.dirty) {
      this.boundsDirty = this.dirty;
      this.calculateBounds();
    }
    return this._bounds;
  }
  invalidate() {
    this.boundsDirty = -1;
    this.dirty++;
    this.batchDirty++;
    this.shapeIndex = 0;
    this.points.length = 0;
    this.colors.length = 0;
    this.uvs.length = 0;
    this.indices.length = 0;
    this.textureIds.length = 0;
    for (let i = 0; i < this.drawCalls.length; i++) {
      this.drawCalls[i].texArray.clear();
      DRAW_CALL_POOL.push(this.drawCalls[i]);
    }
    this.drawCalls.length = 0;
    for (let i = 0; i < this.batches.length; i++) {
      const batchPart = this.batches[i];
      batchPart.reset();
      BATCH_POOL.push(batchPart);
    }
    this.batches.length = 0;
  }
  clear() {
    if (this.graphicsData.length > 0) {
      this.invalidate();
      this.clearDirty++;
      this.graphicsData.length = 0;
    }
    return this;
  }
  drawShape(shape, fillStyle = null, lineStyle = null, matrix = null) {
    const data = new GraphicsData(shape, fillStyle, lineStyle, matrix);
    this.graphicsData.push(data);
    this.dirty++;
    return this;
  }
  drawHole(shape, matrix = null) {
    if (!this.graphicsData.length) {
      return null;
    }
    const data = new GraphicsData(shape, null, null, matrix);
    const lastShape = this.graphicsData[this.graphicsData.length - 1];
    data.lineStyle = lastShape.lineStyle;
    lastShape.holes.push(data);
    this.dirty++;
    return this;
  }
  destroy() {
    super.destroy();
    for (let i = 0; i < this.graphicsData.length; ++i) {
      this.graphicsData[i].destroy();
    }
    this.points.length = 0;
    this.points = null;
    this.colors.length = 0;
    this.colors = null;
    this.uvs.length = 0;
    this.uvs = null;
    this.indices.length = 0;
    this.indices = null;
    this.indexBuffer.destroy();
    this.indexBuffer = null;
    this.graphicsData.length = 0;
    this.graphicsData = null;
    this.drawCalls.length = 0;
    this.drawCalls = null;
    this.batches.length = 0;
    this.batches = null;
    this._bounds = null;
  }
  containsPoint(point) {
    const graphicsData = this.graphicsData;
    for (let i = 0; i < graphicsData.length; ++i) {
      const data = graphicsData[i];
      if (!data.fillStyle.visible) {
        continue;
      }
      if (data.shape) {
        if (data.matrix) {
          data.matrix.applyInverse(point, tmpPoint);
        } else {
          tmpPoint.copyFrom(point);
        }
        if (data.shape.contains(tmpPoint.x, tmpPoint.y)) {
          let hitHole = false;
          if (data.holes) {
            for (let i2 = 0; i2 < data.holes.length; i2++) {
              const hole = data.holes[i2];
              if (hole.shape.contains(tmpPoint.x, tmpPoint.y)) {
                hitHole = true;
                break;
              }
            }
          }
          if (!hitHole) {
            return true;
          }
        }
      }
    }
    return false;
  }
  updateBatches() {
    if (!this.graphicsData.length) {
      this.batchable = true;
      return;
    }
    if (!this.validateBatching()) {
      return;
    }
    this.cacheDirty = this.dirty;
    const uvs = this.uvs;
    const graphicsData = this.graphicsData;
    let batchPart = null;
    let currentStyle = null;
    if (this.batches.length > 0) {
      batchPart = this.batches[this.batches.length - 1];
      currentStyle = batchPart.style;
    }
    for (let i = this.shapeIndex; i < graphicsData.length; i++) {
      this.shapeIndex++;
      const data = graphicsData[i];
      const fillStyle = data.fillStyle;
      const lineStyle = data.lineStyle;
      const command = FILL_COMMANDS[data.type];
      command.build(data);
      if (data.matrix) {
        this.transformPoints(data.points, data.matrix);
      }
      if (fillStyle.visible || lineStyle.visible) {
        this.processHoles(data.holes);
      }
      for (let j = 0; j < 2; j++) {
        const style = j === 0 ? fillStyle : lineStyle;
        if (!style.visible)
          continue;
        const nextTexture = style.texture.baseTexture;
        const index2 = this.indices.length;
        const attribIndex = this.points.length / 2;
        nextTexture.wrapMode = WRAP_MODES.REPEAT;
        if (j === 0) {
          this.processFill(data);
        } else {
          this.processLine(data);
        }
        const size = this.points.length / 2 - attribIndex;
        if (size === 0)
          continue;
        if (batchPart && !this._compareStyles(currentStyle, style)) {
          batchPart.end(index2, attribIndex);
          batchPart = null;
        }
        if (!batchPart) {
          batchPart = BATCH_POOL.pop() || new BatchPart();
          batchPart.begin(style, index2, attribIndex);
          this.batches.push(batchPart);
          currentStyle = style;
        }
        this.addUvs(this.points, uvs, style.texture, attribIndex, size, style.matrix);
      }
    }
    const index = this.indices.length;
    const attrib = this.points.length / 2;
    if (batchPart) {
      batchPart.end(index, attrib);
    }
    if (this.batches.length === 0) {
      this.batchable = true;
      return;
    }
    const need32 = attrib > 65535;
    if (this.indicesUint16 && this.indices.length === this.indicesUint16.length && need32 === this.indicesUint16.BYTES_PER_ELEMENT > 2) {
      this.indicesUint16.set(this.indices);
    } else {
      this.indicesUint16 = need32 ? new Uint32Array(this.indices) : new Uint16Array(this.indices);
    }
    this.batchable = this.isBatchable();
    if (this.batchable) {
      this.packBatches();
    } else {
      this.buildDrawCalls();
    }
  }
  _compareStyles(styleA, styleB) {
    if (!styleA || !styleB) {
      return false;
    }
    if (styleA.texture.baseTexture !== styleB.texture.baseTexture) {
      return false;
    }
    if (styleA.color + styleA.alpha !== styleB.color + styleB.alpha) {
      return false;
    }
    if (!!styleA.native !== !!styleB.native) {
      return false;
    }
    return true;
  }
  validateBatching() {
    if (this.dirty === this.cacheDirty || !this.graphicsData.length) {
      return false;
    }
    for (let i = 0, l = this.graphicsData.length; i < l; i++) {
      const data = this.graphicsData[i];
      const fill = data.fillStyle;
      const line = data.lineStyle;
      if (fill && !fill.texture.baseTexture.valid)
        return false;
      if (line && !line.texture.baseTexture.valid)
        return false;
    }
    return true;
  }
  packBatches() {
    this.batchDirty++;
    this.uvsFloat32 = new Float32Array(this.uvs);
    const batches = this.batches;
    for (let i = 0, l = batches.length; i < l; i++) {
      const batch = batches[i];
      for (let j = 0; j < batch.size; j++) {
        const index = batch.start + j;
        this.indicesUint16[index] = this.indicesUint16[index] - batch.attribStart;
      }
    }
  }
  isBatchable() {
    if (this.points.length > 65535 * 2) {
      return false;
    }
    const batches = this.batches;
    for (let i = 0; i < batches.length; i++) {
      if (batches[i].style.native) {
        return false;
      }
    }
    return this.points.length < _GraphicsGeometry.BATCHABLE_SIZE * 2;
  }
  buildDrawCalls() {
    let TICK = ++BaseTexture._globalBatch;
    for (let i = 0; i < this.drawCalls.length; i++) {
      this.drawCalls[i].texArray.clear();
      DRAW_CALL_POOL.push(this.drawCalls[i]);
    }
    this.drawCalls.length = 0;
    const colors = this.colors;
    const textureIds = this.textureIds;
    let currentGroup = DRAW_CALL_POOL.pop();
    if (!currentGroup) {
      currentGroup = new BatchDrawCall();
      currentGroup.texArray = new BatchTextureArray();
    }
    currentGroup.texArray.count = 0;
    currentGroup.start = 0;
    currentGroup.size = 0;
    currentGroup.type = DRAW_MODES.TRIANGLES;
    let textureCount = 0;
    let currentTexture = null;
    let textureId = 0;
    let native = false;
    let drawMode = DRAW_MODES.TRIANGLES;
    let index = 0;
    this.drawCalls.push(currentGroup);
    for (let i = 0; i < this.batches.length; i++) {
      const data = this.batches[i];
      const maxTextures = 8;
      const style = data.style;
      const nextTexture = style.texture.baseTexture;
      if (native !== !!style.native) {
        native = !!style.native;
        drawMode = native ? DRAW_MODES.LINES : DRAW_MODES.TRIANGLES;
        currentTexture = null;
        textureCount = maxTextures;
        TICK++;
      }
      if (currentTexture !== nextTexture) {
        currentTexture = nextTexture;
        if (nextTexture._batchEnabled !== TICK) {
          if (textureCount === maxTextures) {
            TICK++;
            textureCount = 0;
            if (currentGroup.size > 0) {
              currentGroup = DRAW_CALL_POOL.pop();
              if (!currentGroup) {
                currentGroup = new BatchDrawCall();
                currentGroup.texArray = new BatchTextureArray();
              }
              this.drawCalls.push(currentGroup);
            }
            currentGroup.start = index;
            currentGroup.size = 0;
            currentGroup.texArray.count = 0;
            currentGroup.type = drawMode;
          }
          nextTexture.touched = 1;
          nextTexture._batchEnabled = TICK;
          nextTexture._batchLocation = textureCount;
          nextTexture.wrapMode = WRAP_MODES.REPEAT;
          currentGroup.texArray.elements[currentGroup.texArray.count++] = nextTexture;
          textureCount++;
        }
      }
      currentGroup.size += data.size;
      index += data.size;
      textureId = nextTexture._batchLocation;
      this.addColors(colors, style.color, style.alpha, data.attribSize, data.attribStart);
      this.addTextureIds(textureIds, textureId, data.attribSize, data.attribStart);
    }
    BaseTexture._globalBatch = TICK;
    this.packAttributes();
  }
  packAttributes() {
    const verts = this.points;
    const uvs = this.uvs;
    const colors = this.colors;
    const textureIds = this.textureIds;
    const glPoints = new ArrayBuffer(verts.length * 3 * 4);
    const f32 = new Float32Array(glPoints);
    const u32 = new Uint32Array(glPoints);
    let p = 0;
    for (let i = 0; i < verts.length / 2; i++) {
      f32[p++] = verts[i * 2];
      f32[p++] = verts[i * 2 + 1];
      f32[p++] = uvs[i * 2];
      f32[p++] = uvs[i * 2 + 1];
      u32[p++] = colors[i];
      f32[p++] = textureIds[i];
    }
    this._buffer.update(glPoints);
    this._indexBuffer.update(this.indicesUint16);
  }
  processFill(data) {
    if (data.holes.length) {
      buildPoly.triangulate(data, this);
    } else {
      const command = FILL_COMMANDS[data.type];
      command.triangulate(data, this);
    }
  }
  processLine(data) {
    buildLine(data, this);
    for (let i = 0; i < data.holes.length; i++) {
      buildLine(data.holes[i], this);
    }
  }
  processHoles(holes) {
    for (let i = 0; i < holes.length; i++) {
      const hole = holes[i];
      const command = FILL_COMMANDS[hole.type];
      command.build(hole);
      if (hole.matrix) {
        this.transformPoints(hole.points, hole.matrix);
      }
    }
  }
  calculateBounds() {
    const bounds = this._bounds;
    bounds.clear();
    bounds.addVertexData(this.points, 0, this.points.length);
    bounds.pad(this.boundsPadding, this.boundsPadding);
  }
  transformPoints(points, matrix) {
    for (let i = 0; i < points.length / 2; i++) {
      const x = points[i * 2];
      const y = points[i * 2 + 1];
      points[i * 2] = matrix.a * x + matrix.c * y + matrix.tx;
      points[i * 2 + 1] = matrix.b * x + matrix.d * y + matrix.ty;
    }
  }
  addColors(colors, color, alpha, size, offset = 0) {
    const rgb = (color >> 16) + (color & 65280) + ((color & 255) << 16);
    const rgba = premultiplyTint(rgb, alpha);
    colors.length = Math.max(colors.length, offset + size);
    for (let i = 0; i < size; i++) {
      colors[offset + i] = rgba;
    }
  }
  addTextureIds(textureIds, id, size, offset = 0) {
    textureIds.length = Math.max(textureIds.length, offset + size);
    for (let i = 0; i < size; i++) {
      textureIds[offset + i] = id;
    }
  }
  addUvs(verts, uvs, texture, start, size, matrix = null) {
    let index = 0;
    const uvsStart = uvs.length;
    const frame = texture.frame;
    while (index < size) {
      let x = verts[(start + index) * 2];
      let y = verts[(start + index) * 2 + 1];
      if (matrix) {
        const nx = matrix.a * x + matrix.c * y + matrix.tx;
        y = matrix.b * x + matrix.d * y + matrix.ty;
        x = nx;
      }
      index++;
      uvs.push(x / frame.width, y / frame.height);
    }
    const baseTexture = texture.baseTexture;
    if (frame.width < baseTexture.width || frame.height < baseTexture.height) {
      this.adjustUvs(uvs, texture, uvsStart, size);
    }
  }
  adjustUvs(uvs, texture, start, size) {
    const baseTexture = texture.baseTexture;
    const eps = 1e-6;
    const finish = start + size * 2;
    const frame = texture.frame;
    const scaleX = frame.width / baseTexture.width;
    const scaleY = frame.height / baseTexture.height;
    let offsetX = frame.x / frame.width;
    let offsetY = frame.y / frame.height;
    let minX = Math.floor(uvs[start] + eps);
    let minY = Math.floor(uvs[start + 1] + eps);
    for (let i = start + 2; i < finish; i += 2) {
      minX = Math.min(minX, Math.floor(uvs[i] + eps));
      minY = Math.min(minY, Math.floor(uvs[i + 1] + eps));
    }
    offsetX -= minX;
    offsetY -= minY;
    for (let i = start; i < finish; i += 2) {
      uvs[i] = (uvs[i] + offsetX) * scaleX;
      uvs[i + 1] = (uvs[i + 1] + offsetY) * scaleY;
    }
  }
};
let GraphicsGeometry = _GraphicsGeometry;
GraphicsGeometry.BATCHABLE_SIZE = 100;

class FillStyle {
  constructor() {
    this.color = 16777215;
    this.alpha = 1;
    this.texture = Texture.WHITE;
    this.matrix = null;
    this.visible = false;
    this.reset();
  }
  clone() {
    const obj = new FillStyle();
    obj.color = this.color;
    obj.alpha = this.alpha;
    obj.texture = this.texture;
    obj.matrix = this.matrix;
    obj.visible = this.visible;
    return obj;
  }
  reset() {
    this.color = 16777215;
    this.alpha = 1;
    this.texture = Texture.WHITE;
    this.matrix = null;
    this.visible = false;
  }
  destroy() {
    this.texture = null;
    this.matrix = null;
  }
}

class LineStyle extends FillStyle {
  constructor() {
    super(...arguments);
    this.width = 0;
    this.alignment = 0.5;
    this.native = false;
    this.cap = LINE_CAP.BUTT;
    this.join = LINE_JOIN.MITER;
    this.miterLimit = 10;
  }
  clone() {
    const obj = new LineStyle();
    obj.color = this.color;
    obj.alpha = this.alpha;
    obj.texture = this.texture;
    obj.matrix = this.matrix;
    obj.visible = this.visible;
    obj.width = this.width;
    obj.alignment = this.alignment;
    obj.native = this.native;
    obj.cap = this.cap;
    obj.join = this.join;
    obj.miterLimit = this.miterLimit;
    return obj;
  }
  reset() {
    super.reset();
    this.color = 0;
    this.alignment = 0.5;
    this.width = 0;
    this.native = false;
  }
}

const temp = new Float32Array(3);
const DEFAULT_SHADERS = {};
const _Graphics = class extends Container {
  constructor(geometry = null) {
    super();
    this.shader = null;
    this.pluginName = "batch";
    this.currentPath = null;
    this.batches = [];
    this.batchTint = -1;
    this.batchDirty = -1;
    this.vertexData = null;
    this._fillStyle = new FillStyle();
    this._lineStyle = new LineStyle();
    this._matrix = null;
    this._holeMode = false;
    this.state = State.for2d();
    this._geometry = geometry || new GraphicsGeometry();
    this._geometry.refCount++;
    this._transformID = -1;
    this.tint = 16777215;
    this.blendMode = BLEND_MODES.NORMAL;
  }
  get geometry() {
    return this._geometry;
  }
  clone() {
    this.finishPoly();
    return new _Graphics(this._geometry);
  }
  set blendMode(value) {
    this.state.blendMode = value;
  }
  get blendMode() {
    return this.state.blendMode;
  }
  get tint() {
    return this._tint;
  }
  set tint(value) {
    this._tint = value;
  }
  get fill() {
    return this._fillStyle;
  }
  get line() {
    return this._lineStyle;
  }
  lineStyle(options = null, color = 0, alpha = 1, alignment = 0.5, native = false) {
    if (typeof options === "number") {
      options = { width: options, color, alpha, alignment, native };
    }
    return this.lineTextureStyle(options);
  }
  lineTextureStyle(options) {
    options = Object.assign({
      width: 0,
      texture: Texture.WHITE,
      color: options?.texture ? 16777215 : 0,
      alpha: 1,
      matrix: null,
      alignment: 0.5,
      native: false,
      cap: LINE_CAP.BUTT,
      join: LINE_JOIN.MITER,
      miterLimit: 10
    }, options);
    if (this.currentPath) {
      this.startPoly();
    }
    const visible = options.width > 0 && options.alpha > 0;
    if (!visible) {
      this._lineStyle.reset();
    } else {
      if (options.matrix) {
        options.matrix = options.matrix.clone();
        options.matrix.invert();
      }
      Object.assign(this._lineStyle, { visible }, options);
    }
    return this;
  }
  startPoly() {
    if (this.currentPath) {
      const points = this.currentPath.points;
      const len = this.currentPath.points.length;
      if (len > 2) {
        this.drawShape(this.currentPath);
        this.currentPath = new Polygon();
        this.currentPath.closeStroke = false;
        this.currentPath.points.push(points[len - 2], points[len - 1]);
      }
    } else {
      this.currentPath = new Polygon();
      this.currentPath.closeStroke = false;
    }
  }
  finishPoly() {
    if (this.currentPath) {
      if (this.currentPath.points.length > 2) {
        this.drawShape(this.currentPath);
        this.currentPath = null;
      } else {
        this.currentPath.points.length = 0;
      }
    }
  }
  moveTo(x, y) {
    this.startPoly();
    this.currentPath.points[0] = x;
    this.currentPath.points[1] = y;
    return this;
  }
  lineTo(x, y) {
    if (!this.currentPath) {
      this.moveTo(0, 0);
    }
    const points = this.currentPath.points;
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    if (fromX !== x || fromY !== y) {
      points.push(x, y);
    }
    return this;
  }
  _initCurve(x = 0, y = 0) {
    if (this.currentPath) {
      if (this.currentPath.points.length === 0) {
        this.currentPath.points = [x, y];
      }
    } else {
      this.moveTo(x, y);
    }
  }
  quadraticCurveTo(cpX, cpY, toX, toY) {
    this._initCurve();
    const points = this.currentPath.points;
    if (points.length === 0) {
      this.moveTo(0, 0);
    }
    QuadraticUtils.curveTo(cpX, cpY, toX, toY, points);
    return this;
  }
  bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY) {
    this._initCurve();
    BezierUtils.curveTo(cpX, cpY, cpX2, cpY2, toX, toY, this.currentPath.points);
    return this;
  }
  arcTo(x1, y1, x2, y2, radius) {
    this._initCurve(x1, y1);
    const points = this.currentPath.points;
    const result = ArcUtils.curveTo(x1, y1, x2, y2, radius, points);
    if (result) {
      const { cx, cy, radius: radius2, startAngle, endAngle, anticlockwise } = result;
      this.arc(cx, cy, radius2, startAngle, endAngle, anticlockwise);
    }
    return this;
  }
  arc(cx, cy, radius, startAngle, endAngle, anticlockwise = false) {
    if (startAngle === endAngle) {
      return this;
    }
    if (!anticlockwise && endAngle <= startAngle) {
      endAngle += PI_2;
    } else if (anticlockwise && startAngle <= endAngle) {
      startAngle += PI_2;
    }
    const sweep = endAngle - startAngle;
    if (sweep === 0) {
      return this;
    }
    const startX = cx + Math.cos(startAngle) * radius;
    const startY = cy + Math.sin(startAngle) * radius;
    const eps = this._geometry.closePointEps;
    let points = this.currentPath ? this.currentPath.points : null;
    if (points) {
      const xDiff = Math.abs(points[points.length - 2] - startX);
      const yDiff = Math.abs(points[points.length - 1] - startY);
      if (xDiff < eps && yDiff < eps) {
      } else {
        points.push(startX, startY);
      }
    } else {
      this.moveTo(startX, startY);
      points = this.currentPath.points;
    }
    ArcUtils.arc(startX, startY, cx, cy, radius, startAngle, endAngle, anticlockwise, points);
    return this;
  }
  beginFill(color = 0, alpha = 1) {
    return this.beginTextureFill({ texture: Texture.WHITE, color, alpha });
  }
  beginTextureFill(options) {
    options = Object.assign({
      texture: Texture.WHITE,
      color: 16777215,
      alpha: 1,
      matrix: null
    }, options);
    if (this.currentPath) {
      this.startPoly();
    }
    const visible = options.alpha > 0;
    if (!visible) {
      this._fillStyle.reset();
    } else {
      if (options.matrix) {
        options.matrix = options.matrix.clone();
        options.matrix.invert();
      }
      Object.assign(this._fillStyle, { visible }, options);
    }
    return this;
  }
  endFill() {
    this.finishPoly();
    this._fillStyle.reset();
    return this;
  }
  drawRect(x, y, width, height) {
    return this.drawShape(new Rectangle(x, y, width, height));
  }
  drawRoundedRect(x, y, width, height, radius) {
    return this.drawShape(new RoundedRectangle(x, y, width, height, radius));
  }
  drawCircle(x, y, radius) {
    return this.drawShape(new Circle(x, y, radius));
  }
  drawEllipse(x, y, width, height) {
    return this.drawShape(new Ellipse(x, y, width, height));
  }
  drawPolygon(...path) {
    let points;
    let closeStroke = true;
    const poly = path[0];
    if (poly.points) {
      closeStroke = poly.closeStroke;
      points = poly.points;
    } else if (Array.isArray(path[0])) {
      points = path[0];
    } else {
      points = path;
    }
    const shape = new Polygon(points);
    shape.closeStroke = closeStroke;
    this.drawShape(shape);
    return this;
  }
  drawShape(shape) {
    if (!this._holeMode) {
      this._geometry.drawShape(shape, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix);
    } else {
      this._geometry.drawHole(shape, this._matrix);
    }
    return this;
  }
  clear() {
    this._geometry.clear();
    this._lineStyle.reset();
    this._fillStyle.reset();
    this._boundsID++;
    this._matrix = null;
    this._holeMode = false;
    this.currentPath = null;
    return this;
  }
  isFastRect() {
    const data = this._geometry.graphicsData;
    return data.length === 1 && data[0].shape.type === SHAPES.RECT && !data[0].matrix && !data[0].holes.length && !(data[0].lineStyle.visible && data[0].lineStyle.width);
  }
  _render(renderer) {
    this.finishPoly();
    const geometry = this._geometry;
    geometry.updateBatches();
    if (geometry.batchable) {
      if (this.batchDirty !== geometry.batchDirty) {
        this._populateBatches();
      }
      this._renderBatched(renderer);
    } else {
      renderer.batch.flush();
      this._renderDirect(renderer);
    }
  }
  _populateBatches() {
    const geometry = this._geometry;
    const blendMode = this.blendMode;
    const len = geometry.batches.length;
    this.batchTint = -1;
    this._transformID = -1;
    this.batchDirty = geometry.batchDirty;
    this.batches.length = len;
    this.vertexData = new Float32Array(geometry.points);
    for (let i = 0; i < len; i++) {
      const gI = geometry.batches[i];
      const color = gI.style.color;
      const vertexData = new Float32Array(this.vertexData.buffer, gI.attribStart * 4 * 2, gI.attribSize * 2);
      const uvs = new Float32Array(geometry.uvsFloat32.buffer, gI.attribStart * 4 * 2, gI.attribSize * 2);
      const indices = new Uint16Array(geometry.indicesUint16.buffer, gI.start * 2, gI.size);
      const batch = {
        vertexData,
        blendMode,
        indices,
        uvs,
        _batchRGB: hex2rgb(color),
        _tintRGB: color,
        _texture: gI.style.texture,
        alpha: gI.style.alpha,
        worldAlpha: 1
      };
      this.batches[i] = batch;
    }
  }
  _renderBatched(renderer) {
    if (!this.batches.length) {
      return;
    }
    renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
    this.calculateVertices();
    this.calculateTints();
    for (let i = 0, l = this.batches.length; i < l; i++) {
      const batch = this.batches[i];
      batch.worldAlpha = this.worldAlpha * batch.alpha;
      renderer.plugins[this.pluginName].render(batch);
    }
  }
  _renderDirect(renderer) {
    const shader = this._resolveDirectShader(renderer);
    const geometry = this._geometry;
    const tint = this.tint;
    const worldAlpha = this.worldAlpha;
    const uniforms = shader.uniforms;
    const drawCalls = geometry.drawCalls;
    uniforms.translationMatrix = this.transform.worldTransform;
    uniforms.tint[0] = (tint >> 16 & 255) / 255 * worldAlpha;
    uniforms.tint[1] = (tint >> 8 & 255) / 255 * worldAlpha;
    uniforms.tint[2] = (tint & 255) / 255 * worldAlpha;
    uniforms.tint[3] = worldAlpha;
    renderer.shader.bind(shader);
    renderer.geometry.bind(geometry, shader);
    renderer.state.set(this.state);
    for (let i = 0, l = drawCalls.length; i < l; i++) {
      this._renderDrawCallDirect(renderer, geometry.drawCalls[i]);
    }
  }
  _renderDrawCallDirect(renderer, drawCall) {
    const { texArray, type, size, start } = drawCall;
    const groupTextureCount = texArray.count;
    for (let j = 0; j < groupTextureCount; j++) {
      renderer.texture.bind(texArray.elements[j], j);
    }
    renderer.geometry.draw(type, size, start);
  }
  _resolveDirectShader(renderer) {
    let shader = this.shader;
    const pluginName = this.pluginName;
    if (!shader) {
      if (!DEFAULT_SHADERS[pluginName]) {
        const { maxTextures } = renderer.plugins[pluginName];
        const sampleValues = new Int32Array(maxTextures);
        for (let i = 0; i < maxTextures; i++) {
          sampleValues[i] = i;
        }
        const uniforms = {
          tint: new Float32Array([1, 1, 1, 1]),
          translationMatrix: new Matrix(),
          default: UniformGroup.from({ uSamplers: sampleValues }, true)
        };
        const program = renderer.plugins[pluginName]._shader.program;
        DEFAULT_SHADERS[pluginName] = new Shader(program, uniforms);
      }
      shader = DEFAULT_SHADERS[pluginName];
    }
    return shader;
  }
  _calculateBounds() {
    this.finishPoly();
    const geometry = this._geometry;
    if (!geometry.graphicsData.length) {
      return;
    }
    const { minX, minY, maxX, maxY } = geometry.bounds;
    this._bounds.addFrame(this.transform, minX, minY, maxX, maxY);
  }
  containsPoint(point) {
    this.worldTransform.applyInverse(point, _Graphics._TEMP_POINT);
    return this._geometry.containsPoint(_Graphics._TEMP_POINT);
  }
  calculateTints() {
    if (this.batchTint !== this.tint) {
      this.batchTint = this.tint;
      const tintRGB = hex2rgb(this.tint, temp);
      for (let i = 0; i < this.batches.length; i++) {
        const batch = this.batches[i];
        const batchTint = batch._batchRGB;
        const r = tintRGB[0] * batchTint[0] * 255;
        const g = tintRGB[1] * batchTint[1] * 255;
        const b = tintRGB[2] * batchTint[2] * 255;
        const color = (r << 16) + (g << 8) + (b | 0);
        batch._tintRGB = (color >> 16) + (color & 65280) + ((color & 255) << 16);
      }
    }
  }
  calculateVertices() {
    const wtID = this.transform._worldID;
    if (this._transformID === wtID) {
      return;
    }
    this._transformID = wtID;
    const wt = this.transform.worldTransform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    const tx = wt.tx;
    const ty = wt.ty;
    const data = this._geometry.points;
    const vertexData = this.vertexData;
    let count = 0;
    for (let i = 0; i < data.length; i += 2) {
      const x = data[i];
      const y = data[i + 1];
      vertexData[count++] = a * x + c * y + tx;
      vertexData[count++] = d * y + b * x + ty;
    }
  }
  closePath() {
    const currentPath = this.currentPath;
    if (currentPath) {
      currentPath.closeStroke = true;
      this.finishPoly();
    }
    return this;
  }
  setMatrix(matrix) {
    this._matrix = matrix;
    return this;
  }
  beginHole() {
    this.finishPoly();
    this._holeMode = true;
    return this;
  }
  endHole() {
    this.finishPoly();
    this._holeMode = false;
    return this;
  }
  destroy(options) {
    this._geometry.refCount--;
    if (this._geometry.refCount === 0) {
      this._geometry.dispose();
    }
    this._matrix = null;
    this.currentPath = null;
    this._lineStyle.destroy();
    this._lineStyle = null;
    this._fillStyle.destroy();
    this._fillStyle = null;
    this._geometry = null;
    this.shader = null;
    this.vertexData = null;
    this.batches.length = 0;
    this.batches = null;
    super.destroy(options);
  }
};
let Graphics = _Graphics;
Graphics.curves = curves;
Graphics._TEMP_POINT = new Point();

const graphicsUtils = {
  buildPoly,
  buildCircle,
  buildRectangle,
  buildRoundedRectangle,
  buildLine,
  ArcUtils,
  BezierUtils,
  QuadraticUtils,
  BatchPart,
  FILL_COMMANDS,
  BATCH_POOL,
  DRAW_CALL_POOL
};

class MeshBatchUvs {
  constructor(uvBuffer, uvMatrix) {
    this.uvBuffer = uvBuffer;
    this.uvMatrix = uvMatrix;
    this.data = null;
    this._bufferUpdateId = -1;
    this._textureUpdateId = -1;
    this._updateID = 0;
  }
  update(forceUpdate) {
    if (!forceUpdate && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID) {
      return;
    }
    this._bufferUpdateId = this.uvBuffer._updateID;
    this._textureUpdateId = this.uvMatrix._updateID;
    const data = this.uvBuffer.data;
    if (!this.data || this.data.length !== data.length) {
      this.data = new Float32Array(data.length);
    }
    this.uvMatrix.multiplyUvs(data, this.data);
    this._updateID++;
  }
}

const tempPoint$1 = new Point();
const tempPolygon = new Polygon();
const _Mesh = class extends Container {
  constructor(geometry, shader, state, drawMode = DRAW_MODES.TRIANGLES) {
    super();
    this.geometry = geometry;
    this.shader = shader;
    this.state = state || State.for2d();
    this.drawMode = drawMode;
    this.start = 0;
    this.size = 0;
    this.uvs = null;
    this.indices = null;
    this.vertexData = new Float32Array(1);
    this.vertexDirty = -1;
    this._transformID = -1;
    this._roundPixels = settings.ROUND_PIXELS;
    this.batchUvs = null;
  }
  get geometry() {
    return this._geometry;
  }
  set geometry(value) {
    if (this._geometry === value) {
      return;
    }
    if (this._geometry) {
      this._geometry.refCount--;
      if (this._geometry.refCount === 0) {
        this._geometry.dispose();
      }
    }
    this._geometry = value;
    if (this._geometry) {
      this._geometry.refCount++;
    }
    this.vertexDirty = -1;
  }
  get uvBuffer() {
    return this.geometry.buffers[1];
  }
  get verticesBuffer() {
    return this.geometry.buffers[0];
  }
  set material(value) {
    this.shader = value;
  }
  get material() {
    return this.shader;
  }
  set blendMode(value) {
    this.state.blendMode = value;
  }
  get blendMode() {
    return this.state.blendMode;
  }
  set roundPixels(value) {
    if (this._roundPixels !== value) {
      this._transformID = -1;
    }
    this._roundPixels = value;
  }
  get roundPixels() {
    return this._roundPixels;
  }
  get tint() {
    return "tint" in this.shader ? this.shader.tint : null;
  }
  set tint(value) {
    this.shader.tint = value;
  }
  get texture() {
    return "texture" in this.shader ? this.shader.texture : null;
  }
  set texture(value) {
    this.shader.texture = value;
  }
  _render(renderer) {
    const vertices = this.geometry.buffers[0].data;
    const shader = this.shader;
    if (shader.batchable && this.drawMode === DRAW_MODES.TRIANGLES && vertices.length < _Mesh.BATCHABLE_SIZE * 2) {
      this._renderToBatch(renderer);
    } else {
      this._renderDefault(renderer);
    }
  }
  _renderDefault(renderer) {
    const shader = this.shader;
    shader.alpha = this.worldAlpha;
    if (shader.update) {
      shader.update();
    }
    renderer.batch.flush();
    shader.uniforms.translationMatrix = this.transform.worldTransform.toArray(true);
    renderer.shader.bind(shader);
    renderer.state.set(this.state);
    renderer.geometry.bind(this.geometry, shader);
    renderer.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
  }
  _renderToBatch(renderer) {
    const geometry = this.geometry;
    const shader = this.shader;
    if (shader.uvMatrix) {
      shader.uvMatrix.update();
      this.calculateUvs();
    }
    this.calculateVertices();
    this.indices = geometry.indexBuffer.data;
    this._tintRGB = shader._tintRGB;
    this._texture = shader.texture;
    const pluginName = this.material.pluginName;
    renderer.batch.setObjectRenderer(renderer.plugins[pluginName]);
    renderer.plugins[pluginName].render(this);
  }
  calculateVertices() {
    const geometry = this.geometry;
    const verticesBuffer = geometry.buffers[0];
    const vertices = verticesBuffer.data;
    const vertexDirtyId = verticesBuffer._updateID;
    if (vertexDirtyId === this.vertexDirty && this._transformID === this.transform._worldID) {
      return;
    }
    this._transformID = this.transform._worldID;
    if (this.vertexData.length !== vertices.length) {
      this.vertexData = new Float32Array(vertices.length);
    }
    const wt = this.transform.worldTransform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    const tx = wt.tx;
    const ty = wt.ty;
    const vertexData = this.vertexData;
    for (let i = 0; i < vertexData.length / 2; i++) {
      const x = vertices[i * 2];
      const y = vertices[i * 2 + 1];
      vertexData[i * 2] = a * x + c * y + tx;
      vertexData[i * 2 + 1] = b * x + d * y + ty;
    }
    if (this._roundPixels) {
      const resolution = settings.RESOLUTION;
      for (let i = 0; i < vertexData.length; ++i) {
        vertexData[i] = Math.round(vertexData[i] * resolution) / resolution;
      }
    }
    this.vertexDirty = vertexDirtyId;
  }
  calculateUvs() {
    const geomUvs = this.geometry.buffers[1];
    const shader = this.shader;
    if (!shader.uvMatrix.isSimple) {
      if (!this.batchUvs) {
        this.batchUvs = new MeshBatchUvs(geomUvs, shader.uvMatrix);
      }
      this.batchUvs.update();
      this.uvs = this.batchUvs.data;
    } else {
      this.uvs = geomUvs.data;
    }
  }
  _calculateBounds() {
    this.calculateVertices();
    this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
  }
  containsPoint(point) {
    if (!this.getBounds().contains(point.x, point.y)) {
      return false;
    }
    this.worldTransform.applyInverse(point, tempPoint$1);
    const vertices = this.geometry.getBuffer("aVertexPosition").data;
    const points = tempPolygon.points;
    const indices = this.geometry.getIndex().data;
    const len = indices.length;
    const step = this.drawMode === 4 ? 3 : 1;
    for (let i = 0; i + 2 < len; i += step) {
      const ind0 = indices[i] * 2;
      const ind1 = indices[i + 1] * 2;
      const ind2 = indices[i + 2] * 2;
      points[0] = vertices[ind0];
      points[1] = vertices[ind0 + 1];
      points[2] = vertices[ind1];
      points[3] = vertices[ind1 + 1];
      points[4] = vertices[ind2];
      points[5] = vertices[ind2 + 1];
      if (tempPolygon.contains(tempPoint$1.x, tempPoint$1.y)) {
        return true;
      }
    }
    return false;
  }
  destroy(options) {
    super.destroy(options);
    if (this._cachedTexture) {
      this._cachedTexture.destroy();
      this._cachedTexture = null;
    }
    this.geometry = null;
    this.shader = null;
    this.state = null;
    this.uvs = null;
    this.indices = null;
    this.vertexData = null;
  }
};
let Mesh = _Mesh;
Mesh.BATCHABLE_SIZE = 100;

class MeshGeometry extends Geometry {
  constructor(vertices, uvs, index) {
    super();
    const verticesBuffer = new Buffer(vertices);
    const uvsBuffer = new Buffer(uvs, true);
    const indexBuffer = new Buffer(index, true, true);
    this.addAttribute("aVertexPosition", verticesBuffer, 2, false, TYPES.FLOAT).addAttribute("aTextureCoord", uvsBuffer, 2, false, TYPES.FLOAT).addIndex(indexBuffer);
    this._updateId = -1;
  }
  get vertexDirtyId() {
    return this.buffers[0]._updateID;
  }
}

var fragment$1 = "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n";

var vertex$1 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTextureMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\n}\n";

class MeshMaterial extends Shader {
  constructor(uSampler, options) {
    const uniforms = {
      uSampler,
      alpha: 1,
      uTextureMatrix: Matrix.IDENTITY,
      uColor: new Float32Array([1, 1, 1, 1])
    };
    options = Object.assign({
      tint: 16777215,
      alpha: 1,
      pluginName: "batch"
    }, options);
    if (options.uniforms) {
      Object.assign(uniforms, options.uniforms);
    }
    super(options.program || Program.from(vertex$1, fragment$1), uniforms);
    this._colorDirty = false;
    this.uvMatrix = new TextureMatrix(uSampler);
    this.batchable = options.program === void 0;
    this.pluginName = options.pluginName;
    this.tint = options.tint;
    this.alpha = options.alpha;
  }
  get texture() {
    return this.uniforms.uSampler;
  }
  set texture(value) {
    if (this.uniforms.uSampler !== value) {
      if (!this.uniforms.uSampler.baseTexture.alphaMode !== !value.baseTexture.alphaMode) {
        this._colorDirty = true;
      }
      this.uniforms.uSampler = value;
      this.uvMatrix.texture = value;
    }
  }
  set alpha(value) {
    if (value === this._alpha)
      return;
    this._alpha = value;
    this._colorDirty = true;
  }
  get alpha() {
    return this._alpha;
  }
  set tint(value) {
    if (value === this._tint)
      return;
    this._tint = value;
    this._tintRGB = (value >> 16) + (value & 65280) + ((value & 255) << 16);
    this._colorDirty = true;
  }
  get tint() {
    return this._tint;
  }
  update() {
    if (this._colorDirty) {
      this._colorDirty = false;
      const baseTexture = this.texture.baseTexture;
      premultiplyTintToRgba(this._tint, this._alpha, this.uniforms.uColor, baseTexture.alphaMode);
    }
    if (this.uvMatrix.update()) {
      this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord;
    }
  }
}

class PlaneGeometry extends MeshGeometry {
  constructor(width = 100, height = 100, segWidth = 10, segHeight = 10) {
    super();
    this.segWidth = segWidth;
    this.segHeight = segHeight;
    this.width = width;
    this.height = height;
    this.build();
  }
  build() {
    const total = this.segWidth * this.segHeight;
    const verts = [];
    const uvs = [];
    const indices = [];
    const segmentsX = this.segWidth - 1;
    const segmentsY = this.segHeight - 1;
    const sizeX = this.width / segmentsX;
    const sizeY = this.height / segmentsY;
    for (let i = 0; i < total; i++) {
      const x = i % this.segWidth;
      const y = i / this.segWidth | 0;
      verts.push(x * sizeX, y * sizeY);
      uvs.push(x / segmentsX, y / segmentsY);
    }
    const totalSub = segmentsX * segmentsY;
    for (let i = 0; i < totalSub; i++) {
      const xpos = i % segmentsX;
      const ypos = i / segmentsX | 0;
      const value = ypos * this.segWidth + xpos;
      const value2 = ypos * this.segWidth + xpos + 1;
      const value3 = (ypos + 1) * this.segWidth + xpos;
      const value4 = (ypos + 1) * this.segWidth + xpos + 1;
      indices.push(value, value2, value3, value2, value4, value3);
    }
    this.buffers[0].data = new Float32Array(verts);
    this.buffers[1].data = new Float32Array(uvs);
    this.indexBuffer.data = new Uint16Array(indices);
    this.buffers[0].update();
    this.buffers[1].update();
    this.indexBuffer.update();
  }
}

class RopeGeometry extends MeshGeometry {
  constructor(width = 200, points, textureScale = 0) {
    super(new Float32Array(points.length * 4), new Float32Array(points.length * 4), new Uint16Array((points.length - 1) * 6));
    this.points = points;
    this._width = width;
    this.textureScale = textureScale;
    this.build();
  }
  get width() {
    return this._width;
  }
  build() {
    const points = this.points;
    if (!points)
      return;
    const vertexBuffer = this.getBuffer("aVertexPosition");
    const uvBuffer = this.getBuffer("aTextureCoord");
    const indexBuffer = this.getIndex();
    if (points.length < 1) {
      return;
    }
    if (vertexBuffer.data.length / 4 !== points.length) {
      vertexBuffer.data = new Float32Array(points.length * 4);
      uvBuffer.data = new Float32Array(points.length * 4);
      indexBuffer.data = new Uint16Array((points.length - 1) * 6);
    }
    const uvs = uvBuffer.data;
    const indices = indexBuffer.data;
    uvs[0] = 0;
    uvs[1] = 0;
    uvs[2] = 0;
    uvs[3] = 1;
    let amount = 0;
    let prev = points[0];
    const textureWidth = this._width * this.textureScale;
    const total = points.length;
    for (let i = 0; i < total; i++) {
      const index = i * 4;
      if (this.textureScale > 0) {
        const dx = prev.x - points[i].x;
        const dy = prev.y - points[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        prev = points[i];
        amount += distance / textureWidth;
      } else {
        amount = i / (total - 1);
      }
      uvs[index] = amount;
      uvs[index + 1] = 0;
      uvs[index + 2] = amount;
      uvs[index + 3] = 1;
    }
    let indexCount = 0;
    for (let i = 0; i < total - 1; i++) {
      const index = i * 2;
      indices[indexCount++] = index;
      indices[indexCount++] = index + 1;
      indices[indexCount++] = index + 2;
      indices[indexCount++] = index + 2;
      indices[indexCount++] = index + 1;
      indices[indexCount++] = index + 3;
    }
    uvBuffer.update();
    indexBuffer.update();
    this.updateVertices();
  }
  updateVertices() {
    const points = this.points;
    if (points.length < 1) {
      return;
    }
    let lastPoint = points[0];
    let nextPoint;
    let perpX = 0;
    let perpY = 0;
    const vertices = this.buffers[0].data;
    const total = points.length;
    for (let i = 0; i < total; i++) {
      const point = points[i];
      const index = i * 4;
      if (i < points.length - 1) {
        nextPoint = points[i + 1];
      } else {
        nextPoint = point;
      }
      perpY = -(nextPoint.x - lastPoint.x);
      perpX = nextPoint.y - lastPoint.y;
      let ratio = (1 - i / (total - 1)) * 10;
      if (ratio > 1) {
        ratio = 1;
      }
      const perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
      const num = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
      perpX /= perpLength;
      perpY /= perpLength;
      perpX *= num;
      perpY *= num;
      vertices[index] = point.x + perpX;
      vertices[index + 1] = point.y + perpY;
      vertices[index + 2] = point.x - perpX;
      vertices[index + 3] = point.y - perpY;
      lastPoint = point;
    }
    this.buffers[0].update();
  }
  update() {
    if (this.textureScale > 0) {
      this.build();
    } else {
      this.updateVertices();
    }
  }
}

class SimplePlane extends Mesh {
  constructor(texture, verticesX, verticesY) {
    const planeGeometry = new PlaneGeometry(texture.width, texture.height, verticesX, verticesY);
    const meshMaterial = new MeshMaterial(Texture.WHITE);
    super(planeGeometry, meshMaterial);
    this.texture = texture;
    this.autoResize = true;
  }
  textureUpdated() {
    this._textureID = this.shader.texture._updateID;
    const geometry = this.geometry;
    const { width, height } = this.shader.texture;
    if (this.autoResize && (geometry.width !== width || geometry.height !== height)) {
      geometry.width = this.shader.texture.width;
      geometry.height = this.shader.texture.height;
      geometry.build();
    }
  }
  set texture(value) {
    if (this.shader.texture === value) {
      return;
    }
    this.shader.texture = value;
    this._textureID = -1;
    if (value.baseTexture.valid) {
      this.textureUpdated();
    } else {
      value.once("update", this.textureUpdated, this);
    }
  }
  get texture() {
    return this.shader.texture;
  }
  _render(renderer) {
    if (this._textureID !== this.shader.texture._updateID) {
      this.textureUpdated();
    }
    super._render(renderer);
  }
  destroy(options) {
    this.shader.texture.off("update", this.textureUpdated, this);
    super.destroy(options);
  }
}

const DEFAULT_BORDER_SIZE = 10;
class NineSlicePlane extends SimplePlane {
  constructor(texture, leftWidth = DEFAULT_BORDER_SIZE, topHeight = DEFAULT_BORDER_SIZE, rightWidth = DEFAULT_BORDER_SIZE, bottomHeight = DEFAULT_BORDER_SIZE) {
    super(Texture.WHITE, 4, 4);
    this._origWidth = texture.orig.width;
    this._origHeight = texture.orig.height;
    this._width = this._origWidth;
    this._height = this._origHeight;
    this._leftWidth = leftWidth;
    this._rightWidth = rightWidth;
    this._topHeight = topHeight;
    this._bottomHeight = bottomHeight;
    this.texture = texture;
  }
  textureUpdated() {
    this._textureID = this.shader.texture._updateID;
    this._refresh();
  }
  get vertices() {
    return this.geometry.getBuffer("aVertexPosition").data;
  }
  set vertices(value) {
    this.geometry.getBuffer("aVertexPosition").data = value;
  }
  updateHorizontalVertices() {
    const vertices = this.vertices;
    const scale = this._getMinScale();
    vertices[9] = vertices[11] = vertices[13] = vertices[15] = this._topHeight * scale;
    vertices[17] = vertices[19] = vertices[21] = vertices[23] = this._height - this._bottomHeight * scale;
    vertices[25] = vertices[27] = vertices[29] = vertices[31] = this._height;
  }
  updateVerticalVertices() {
    const vertices = this.vertices;
    const scale = this._getMinScale();
    vertices[2] = vertices[10] = vertices[18] = vertices[26] = this._leftWidth * scale;
    vertices[4] = vertices[12] = vertices[20] = vertices[28] = this._width - this._rightWidth * scale;
    vertices[6] = vertices[14] = vertices[22] = vertices[30] = this._width;
  }
  _getMinScale() {
    const w = this._leftWidth + this._rightWidth;
    const scaleW = this._width > w ? 1 : this._width / w;
    const h = this._topHeight + this._bottomHeight;
    const scaleH = this._height > h ? 1 : this._height / h;
    const scale = Math.min(scaleW, scaleH);
    return scale;
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
    this._refresh();
  }
  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
    this._refresh();
  }
  get leftWidth() {
    return this._leftWidth;
  }
  set leftWidth(value) {
    this._leftWidth = value;
    this._refresh();
  }
  get rightWidth() {
    return this._rightWidth;
  }
  set rightWidth(value) {
    this._rightWidth = value;
    this._refresh();
  }
  get topHeight() {
    return this._topHeight;
  }
  set topHeight(value) {
    this._topHeight = value;
    this._refresh();
  }
  get bottomHeight() {
    return this._bottomHeight;
  }
  set bottomHeight(value) {
    this._bottomHeight = value;
    this._refresh();
  }
  _refresh() {
    const texture = this.texture;
    const uvs = this.geometry.buffers[1].data;
    this._origWidth = texture.orig.width;
    this._origHeight = texture.orig.height;
    const _uvw = 1 / this._origWidth;
    const _uvh = 1 / this._origHeight;
    uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0;
    uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0;
    uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1;
    uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1;
    uvs[2] = uvs[10] = uvs[18] = uvs[26] = _uvw * this._leftWidth;
    uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - _uvw * this._rightWidth;
    uvs[9] = uvs[11] = uvs[13] = uvs[15] = _uvh * this._topHeight;
    uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - _uvh * this._bottomHeight;
    this.updateHorizontalVertices();
    this.updateVerticalVertices();
    this.geometry.buffers[0].update();
    this.geometry.buffers[1].update();
  }
}

class SimpleMesh extends Mesh {
  constructor(texture = Texture.EMPTY, vertices, uvs, indices, drawMode) {
    const geometry = new MeshGeometry(vertices, uvs, indices);
    geometry.getBuffer("aVertexPosition").static = false;
    const meshMaterial = new MeshMaterial(texture);
    super(geometry, meshMaterial, null, drawMode);
    this.autoUpdate = true;
  }
  get vertices() {
    return this.geometry.getBuffer("aVertexPosition").data;
  }
  set vertices(value) {
    this.geometry.getBuffer("aVertexPosition").data = value;
  }
  _render(renderer) {
    if (this.autoUpdate) {
      this.geometry.getBuffer("aVertexPosition").update();
    }
    super._render(renderer);
  }
}

class SimpleRope extends Mesh {
  constructor(texture, points, textureScale = 0) {
    const ropeGeometry = new RopeGeometry(texture.height, points, textureScale);
    const meshMaterial = new MeshMaterial(texture);
    if (textureScale > 0) {
      texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
    }
    super(ropeGeometry, meshMaterial);
    this.autoUpdate = true;
  }
  _render(renderer) {
    const geometry = this.geometry;
    if (this.autoUpdate || geometry._width !== this.shader.texture.height) {
      geometry._width = this.shader.texture.height;
      geometry.update();
    }
    super._render(renderer);
  }
}

class ParticleContainer extends Container {
  constructor(maxSize = 1500, properties, batchSize = 16384, autoResize = false) {
    super();
    const maxBatchSize = 16384;
    if (batchSize > maxBatchSize) {
      batchSize = maxBatchSize;
    }
    this._properties = [false, true, false, false, false];
    this._maxSize = maxSize;
    this._batchSize = batchSize;
    this._buffers = null;
    this._bufferUpdateIDs = [];
    this._updateID = 0;
    this.interactiveChildren = false;
    this.blendMode = BLEND_MODES.NORMAL;
    this.autoResize = autoResize;
    this.roundPixels = true;
    this.baseTexture = null;
    this.setProperties(properties);
    this._tint = 0;
    this.tintRgb = new Float32Array(4);
    this.tint = 16777215;
  }
  setProperties(properties) {
    if (properties) {
      this._properties[0] = "vertices" in properties || "scale" in properties ? !!properties.vertices || !!properties.scale : this._properties[0];
      this._properties[1] = "position" in properties ? !!properties.position : this._properties[1];
      this._properties[2] = "rotation" in properties ? !!properties.rotation : this._properties[2];
      this._properties[3] = "uvs" in properties ? !!properties.uvs : this._properties[3];
      this._properties[4] = "tint" in properties || "alpha" in properties ? !!properties.tint || !!properties.alpha : this._properties[4];
    }
  }
  updateTransform() {
    this.displayObjectUpdateTransform();
  }
  get tint() {
    return this._tint;
  }
  set tint(value) {
    this._tint = value;
    hex2rgb(value, this.tintRgb);
  }
  render(renderer) {
    if (!this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable) {
      return;
    }
    if (!this.baseTexture) {
      this.baseTexture = this.children[0]._texture.baseTexture;
      if (!this.baseTexture.valid) {
        this.baseTexture.once("update", () => this.onChildrenChange(0));
      }
    }
    renderer.batch.setObjectRenderer(renderer.plugins.particle);
    renderer.plugins.particle.render(this);
  }
  onChildrenChange(smallestChildIndex) {
    const bufferIndex = Math.floor(smallestChildIndex / this._batchSize);
    while (this._bufferUpdateIDs.length < bufferIndex) {
      this._bufferUpdateIDs.push(0);
    }
    this._bufferUpdateIDs[bufferIndex] = ++this._updateID;
  }
  dispose() {
    if (this._buffers) {
      for (let i = 0; i < this._buffers.length; ++i) {
        this._buffers[i].destroy();
      }
      this._buffers = null;
    }
  }
  destroy(options) {
    super.destroy(options);
    this.dispose();
    this._properties = null;
    this._buffers = null;
    this._bufferUpdateIDs = null;
  }
}

class ParticleBuffer {
  constructor(properties, dynamicPropertyFlags, size) {
    this.geometry = new Geometry();
    this.indexBuffer = null;
    this.size = size;
    this.dynamicProperties = [];
    this.staticProperties = [];
    for (let i = 0; i < properties.length; ++i) {
      let property = properties[i];
      property = {
        attributeName: property.attributeName,
        size: property.size,
        uploadFunction: property.uploadFunction,
        type: property.type || TYPES.FLOAT,
        offset: property.offset
      };
      if (dynamicPropertyFlags[i]) {
        this.dynamicProperties.push(property);
      } else {
        this.staticProperties.push(property);
      }
    }
    this.staticStride = 0;
    this.staticBuffer = null;
    this.staticData = null;
    this.staticDataUint32 = null;
    this.dynamicStride = 0;
    this.dynamicBuffer = null;
    this.dynamicData = null;
    this.dynamicDataUint32 = null;
    this._updateID = 0;
    this.initBuffers();
  }
  initBuffers() {
    const geometry = this.geometry;
    let dynamicOffset = 0;
    this.indexBuffer = new Buffer(createIndicesForQuads(this.size), true, true);
    geometry.addIndex(this.indexBuffer);
    this.dynamicStride = 0;
    for (let i = 0; i < this.dynamicProperties.length; ++i) {
      const property = this.dynamicProperties[i];
      property.offset = dynamicOffset;
      dynamicOffset += property.size;
      this.dynamicStride += property.size;
    }
    const dynBuffer = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
    this.dynamicData = new Float32Array(dynBuffer);
    this.dynamicDataUint32 = new Uint32Array(dynBuffer);
    this.dynamicBuffer = new Buffer(this.dynamicData, false, false);
    let staticOffset = 0;
    this.staticStride = 0;
    for (let i = 0; i < this.staticProperties.length; ++i) {
      const property = this.staticProperties[i];
      property.offset = staticOffset;
      staticOffset += property.size;
      this.staticStride += property.size;
    }
    const statBuffer = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
    this.staticData = new Float32Array(statBuffer);
    this.staticDataUint32 = new Uint32Array(statBuffer);
    this.staticBuffer = new Buffer(this.staticData, true, false);
    for (let i = 0; i < this.dynamicProperties.length; ++i) {
      const property = this.dynamicProperties[i];
      geometry.addAttribute(property.attributeName, this.dynamicBuffer, 0, property.type === TYPES.UNSIGNED_BYTE, property.type, this.dynamicStride * 4, property.offset * 4);
    }
    for (let i = 0; i < this.staticProperties.length; ++i) {
      const property = this.staticProperties[i];
      geometry.addAttribute(property.attributeName, this.staticBuffer, 0, property.type === TYPES.UNSIGNED_BYTE, property.type, this.staticStride * 4, property.offset * 4);
    }
  }
  uploadDynamic(children, startIndex, amount) {
    for (let i = 0; i < this.dynamicProperties.length; i++) {
      const property = this.dynamicProperties[i];
      property.uploadFunction(children, startIndex, amount, property.type === TYPES.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, property.offset);
    }
    this.dynamicBuffer._updateID++;
  }
  uploadStatic(children, startIndex, amount) {
    for (let i = 0; i < this.staticProperties.length; i++) {
      const property = this.staticProperties[i];
      property.uploadFunction(children, startIndex, amount, property.type === TYPES.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, property.offset);
    }
    this.staticBuffer._updateID++;
  }
  destroy() {
    this.indexBuffer = null;
    this.dynamicProperties = null;
    this.dynamicBuffer = null;
    this.dynamicData = null;
    this.dynamicDataUint32 = null;
    this.staticProperties = null;
    this.staticBuffer = null;
    this.staticData = null;
    this.staticDataUint32 = null;
    this.geometry.destroy();
  }
}

var fragment = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n    gl_FragColor = color;\n}";

var vertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nattribute vec2 aPositionCoord;\nattribute float aRotation;\n\nuniform mat3 translationMatrix;\nuniform vec4 uColor;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void){\n    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);\n    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);\n\n    vec2 v = vec2(x, y);\n    v = v + aPositionCoord;\n\n    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vColor = aColor * uColor;\n}\n";

class ParticleRenderer extends ObjectRenderer {
  constructor(renderer) {
    super(renderer);
    this.shader = null;
    this.properties = null;
    this.tempMatrix = new Matrix();
    this.properties = [
      {
        attributeName: "aVertexPosition",
        size: 2,
        uploadFunction: this.uploadVertices,
        offset: 0
      },
      {
        attributeName: "aPositionCoord",
        size: 2,
        uploadFunction: this.uploadPosition,
        offset: 0
      },
      {
        attributeName: "aRotation",
        size: 1,
        uploadFunction: this.uploadRotation,
        offset: 0
      },
      {
        attributeName: "aTextureCoord",
        size: 2,
        uploadFunction: this.uploadUvs,
        offset: 0
      },
      {
        attributeName: "aColor",
        size: 1,
        type: TYPES.UNSIGNED_BYTE,
        uploadFunction: this.uploadTint,
        offset: 0
      }
    ];
    this.shader = Shader.from(vertex, fragment, {});
    this.state = State.for2d();
  }
  render(container) {
    const children = container.children;
    const maxSize = container._maxSize;
    const batchSize = container._batchSize;
    const renderer = this.renderer;
    let totalChildren = children.length;
    if (totalChildren === 0) {
      return;
    } else if (totalChildren > maxSize && !container.autoResize) {
      totalChildren = maxSize;
    }
    let buffers = container._buffers;
    if (!buffers) {
      buffers = container._buffers = this.generateBuffers(container);
    }
    const baseTexture = children[0]._texture.baseTexture;
    const premultiplied = baseTexture.alphaMode > 0;
    this.state.blendMode = correctBlendMode(container.blendMode, premultiplied);
    renderer.state.set(this.state);
    const gl = renderer.gl;
    const m = container.worldTransform.copyTo(this.tempMatrix);
    m.prepend(renderer.globalUniforms.uniforms.projectionMatrix);
    this.shader.uniforms.translationMatrix = m.toArray(true);
    this.shader.uniforms.uColor = premultiplyRgba(container.tintRgb, container.worldAlpha, this.shader.uniforms.uColor, premultiplied);
    this.shader.uniforms.uSampler = baseTexture;
    this.renderer.shader.bind(this.shader);
    let updateStatic = false;
    for (let i = 0, j = 0; i < totalChildren; i += batchSize, j += 1) {
      let amount = totalChildren - i;
      if (amount > batchSize) {
        amount = batchSize;
      }
      if (j >= buffers.length) {
        buffers.push(this._generateOneMoreBuffer(container));
      }
      const buffer = buffers[j];
      buffer.uploadDynamic(children, i, amount);
      const bid = container._bufferUpdateIDs[j] || 0;
      updateStatic = updateStatic || buffer._updateID < bid;
      if (updateStatic) {
        buffer._updateID = container._updateID;
        buffer.uploadStatic(children, i, amount);
      }
      renderer.geometry.bind(buffer.geometry);
      gl.drawElements(gl.TRIANGLES, amount * 6, gl.UNSIGNED_SHORT, 0);
    }
  }
  generateBuffers(container) {
    const buffers = [];
    const size = container._maxSize;
    const batchSize = container._batchSize;
    const dynamicPropertyFlags = container._properties;
    for (let i = 0; i < size; i += batchSize) {
      buffers.push(new ParticleBuffer(this.properties, dynamicPropertyFlags, batchSize));
    }
    return buffers;
  }
  _generateOneMoreBuffer(container) {
    const batchSize = container._batchSize;
    const dynamicPropertyFlags = container._properties;
    return new ParticleBuffer(this.properties, dynamicPropertyFlags, batchSize);
  }
  uploadVertices(children, startIndex, amount, array, stride, offset) {
    let w0 = 0;
    let w1 = 0;
    let h0 = 0;
    let h1 = 0;
    for (let i = 0; i < amount; ++i) {
      const sprite = children[startIndex + i];
      const texture = sprite._texture;
      const sx = sprite.scale.x;
      const sy = sprite.scale.y;
      const trim = texture.trim;
      const orig = texture.orig;
      if (trim) {
        w1 = trim.x - sprite.anchor.x * orig.width;
        w0 = w1 + trim.width;
        h1 = trim.y - sprite.anchor.y * orig.height;
        h0 = h1 + trim.height;
      } else {
        w0 = orig.width * (1 - sprite.anchor.x);
        w1 = orig.width * -sprite.anchor.x;
        h0 = orig.height * (1 - sprite.anchor.y);
        h1 = orig.height * -sprite.anchor.y;
      }
      array[offset] = w1 * sx;
      array[offset + 1] = h1 * sy;
      array[offset + stride] = w0 * sx;
      array[offset + stride + 1] = h1 * sy;
      array[offset + stride * 2] = w0 * sx;
      array[offset + stride * 2 + 1] = h0 * sy;
      array[offset + stride * 3] = w1 * sx;
      array[offset + stride * 3 + 1] = h0 * sy;
      offset += stride * 4;
    }
  }
  uploadPosition(children, startIndex, amount, array, stride, offset) {
    for (let i = 0; i < amount; i++) {
      const spritePosition = children[startIndex + i].position;
      array[offset] = spritePosition.x;
      array[offset + 1] = spritePosition.y;
      array[offset + stride] = spritePosition.x;
      array[offset + stride + 1] = spritePosition.y;
      array[offset + stride * 2] = spritePosition.x;
      array[offset + stride * 2 + 1] = spritePosition.y;
      array[offset + stride * 3] = spritePosition.x;
      array[offset + stride * 3 + 1] = spritePosition.y;
      offset += stride * 4;
    }
  }
  uploadRotation(children, startIndex, amount, array, stride, offset) {
    for (let i = 0; i < amount; i++) {
      const spriteRotation = children[startIndex + i].rotation;
      array[offset] = spriteRotation;
      array[offset + stride] = spriteRotation;
      array[offset + stride * 2] = spriteRotation;
      array[offset + stride * 3] = spriteRotation;
      offset += stride * 4;
    }
  }
  uploadUvs(children, startIndex, amount, array, stride, offset) {
    for (let i = 0; i < amount; ++i) {
      const textureUvs = children[startIndex + i]._texture._uvs;
      if (textureUvs) {
        array[offset] = textureUvs.x0;
        array[offset + 1] = textureUvs.y0;
        array[offset + stride] = textureUvs.x1;
        array[offset + stride + 1] = textureUvs.y1;
        array[offset + stride * 2] = textureUvs.x2;
        array[offset + stride * 2 + 1] = textureUvs.y2;
        array[offset + stride * 3] = textureUvs.x3;
        array[offset + stride * 3 + 1] = textureUvs.y3;
        offset += stride * 4;
      } else {
        array[offset] = 0;
        array[offset + 1] = 0;
        array[offset + stride] = 0;
        array[offset + stride + 1] = 0;
        array[offset + stride * 2] = 0;
        array[offset + stride * 2 + 1] = 0;
        array[offset + stride * 3] = 0;
        array[offset + stride * 3 + 1] = 0;
        offset += stride * 4;
      }
    }
  }
  uploadTint(children, startIndex, amount, array, stride, offset) {
    for (let i = 0; i < amount; ++i) {
      const sprite = children[startIndex + i];
      const premultiplied = sprite._texture.baseTexture.alphaMode > 0;
      const alpha = sprite.alpha;
      const argb = alpha < 1 && premultiplied ? premultiplyTint(sprite._tintRGB, alpha) : sprite._tintRGB + (alpha * 255 << 24);
      array[offset] = argb;
      array[offset + stride] = argb;
      array[offset + stride * 2] = argb;
      array[offset + stride * 3] = argb;
      offset += stride * 4;
    }
  }
  destroy() {
    super.destroy();
    if (this.shader) {
      this.shader.destroy();
      this.shader = null;
    }
    this.tempMatrix = null;
  }
}
ParticleRenderer.extension = {
  name: "particle",
  type: ExtensionType.RendererPlugin
};
extensions$1.add(ParticleRenderer);

var TEXT_GRADIENT = /* @__PURE__ */ ((TEXT_GRADIENT2) => {
  TEXT_GRADIENT2[TEXT_GRADIENT2["LINEAR_VERTICAL"] = 0] = "LINEAR_VERTICAL";
  TEXT_GRADIENT2[TEXT_GRADIENT2["LINEAR_HORIZONTAL"] = 1] = "LINEAR_HORIZONTAL";
  return TEXT_GRADIENT2;
})(TEXT_GRADIENT || {});

const contextSettings = {
  willReadFrequently: true
};
const _TextMetrics = class {
  static get experimentalLetterSpacingSupported() {
    let result = _TextMetrics._experimentalLetterSpacingSupported;
    if (result !== void 0) {
      const proto = settings.ADAPTER.getCanvasRenderingContext2D().prototype;
      result = _TextMetrics._experimentalLetterSpacingSupported = "letterSpacing" in proto || "textLetterSpacing" in proto;
    }
    return result;
  }
  constructor(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
    this.text = text;
    this.style = style;
    this.width = width;
    this.height = height;
    this.lines = lines;
    this.lineWidths = lineWidths;
    this.lineHeight = lineHeight;
    this.maxLineWidth = maxLineWidth;
    this.fontProperties = fontProperties;
  }
  static measureText(text, style, wordWrap, canvas = _TextMetrics._canvas) {
    wordWrap = wordWrap === void 0 || wordWrap === null ? style.wordWrap : wordWrap;
    const font = style.toFontString();
    const fontProperties = _TextMetrics.measureFont(font);
    if (fontProperties.fontSize === 0) {
      fontProperties.fontSize = style.fontSize;
      fontProperties.ascent = style.fontSize;
    }
    const context = canvas.getContext("2d", contextSettings);
    context.font = font;
    const outputText = wordWrap ? _TextMetrics.wordWrap(text, style, canvas) : text;
    const lines = outputText.split(/(?:\r\n|\r|\n)/);
    const lineWidths = new Array(lines.length);
    let maxLineWidth = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineWidth = _TextMetrics._measureText(lines[i], style.letterSpacing, context);
      lineWidths[i] = lineWidth;
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }
    let width = maxLineWidth + style.strokeThickness;
    if (style.dropShadow) {
      width += style.dropShadowDistance;
    }
    const lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness;
    let height = Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness * 2) + (lines.length - 1) * (lineHeight + style.leading);
    if (style.dropShadow) {
      height += style.dropShadowDistance;
    }
    return new _TextMetrics(text, style, width, height, lines, lineWidths, lineHeight + style.leading, maxLineWidth, fontProperties);
  }
  static _measureText(text, letterSpacing, context) {
    let useExperimentalLetterSpacing = false;
    if (_TextMetrics.experimentalLetterSpacingSupported) {
      if (_TextMetrics.experimentalLetterSpacing) {
        context.letterSpacing = `${letterSpacing}px`;
        context.textLetterSpacing = `${letterSpacing}px`;
        useExperimentalLetterSpacing = true;
      } else {
        context.letterSpacing = "0px";
        context.textLetterSpacing = "0px";
      }
    }
    let width = context.measureText(text).width;
    if (width > 0) {
      if (useExperimentalLetterSpacing) {
        width -= letterSpacing;
      } else {
        width += (_TextMetrics.graphemeSegmenter(text).length - 1) * letterSpacing;
      }
    }
    return width;
  }
  static wordWrap(text, style, canvas = _TextMetrics._canvas) {
    const context = canvas.getContext("2d", contextSettings);
    let width = 0;
    let line = "";
    let lines = "";
    const cache = /* @__PURE__ */ Object.create(null);
    const { letterSpacing, whiteSpace } = style;
    const collapseSpaces = _TextMetrics.collapseSpaces(whiteSpace);
    const collapseNewlines = _TextMetrics.collapseNewlines(whiteSpace);
    let canPrependSpaces = !collapseSpaces;
    const wordWrapWidth = style.wordWrapWidth + letterSpacing;
    const tokens = _TextMetrics.tokenize(text);
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (_TextMetrics.isNewline(token)) {
        if (!collapseNewlines) {
          lines += _TextMetrics.addLine(line);
          canPrependSpaces = !collapseSpaces;
          line = "";
          width = 0;
          continue;
        }
        token = " ";
      }
      if (collapseSpaces) {
        const currIsBreakingSpace = _TextMetrics.isBreakingSpace(token);
        const lastIsBreakingSpace = _TextMetrics.isBreakingSpace(line[line.length - 1]);
        if (currIsBreakingSpace && lastIsBreakingSpace) {
          continue;
        }
      }
      const tokenWidth = _TextMetrics.getFromCache(token, letterSpacing, cache, context);
      if (tokenWidth > wordWrapWidth) {
        if (line !== "") {
          lines += _TextMetrics.addLine(line);
          line = "";
          width = 0;
        }
        if (_TextMetrics.canBreakWords(token, style.breakWords)) {
          const characters = _TextMetrics.wordWrapSplit(token);
          for (let j = 0; j < characters.length; j++) {
            let char = characters[j];
            let lastChar = char;
            let k = 1;
            while (characters[j + k]) {
              const nextChar = characters[j + k];
              if (!_TextMetrics.canBreakChars(lastChar, nextChar, token, j, style.breakWords)) {
                char += nextChar;
              } else {
                break;
              }
              lastChar = nextChar;
              k++;
            }
            j += k - 1;
            const characterWidth = _TextMetrics.getFromCache(char, letterSpacing, cache, context);
            if (characterWidth + width > wordWrapWidth) {
              lines += _TextMetrics.addLine(line);
              canPrependSpaces = false;
              line = "";
              width = 0;
            }
            line += char;
            width += characterWidth;
          }
        } else {
          if (line.length > 0) {
            lines += _TextMetrics.addLine(line);
            line = "";
            width = 0;
          }
          const isLastToken = i === tokens.length - 1;
          lines += _TextMetrics.addLine(token, !isLastToken);
          canPrependSpaces = false;
          line = "";
          width = 0;
        }
      } else {
        if (tokenWidth + width > wordWrapWidth) {
          canPrependSpaces = false;
          lines += _TextMetrics.addLine(line);
          line = "";
          width = 0;
        }
        if (line.length > 0 || !_TextMetrics.isBreakingSpace(token) || canPrependSpaces) {
          line += token;
          width += tokenWidth;
        }
      }
    }
    lines += _TextMetrics.addLine(line, false);
    return lines;
  }
  static addLine(line, newLine = true) {
    line = _TextMetrics.trimRight(line);
    line = newLine ? `${line}
` : line;
    return line;
  }
  static getFromCache(key, letterSpacing, cache, context) {
    let width = cache[key];
    if (typeof width !== "number") {
      width = _TextMetrics._measureText(key, letterSpacing, context) + letterSpacing;
      cache[key] = width;
    }
    return width;
  }
  static collapseSpaces(whiteSpace) {
    return whiteSpace === "normal" || whiteSpace === "pre-line";
  }
  static collapseNewlines(whiteSpace) {
    return whiteSpace === "normal";
  }
  static trimRight(text) {
    if (typeof text !== "string") {
      return "";
    }
    for (let i = text.length - 1; i >= 0; i--) {
      const char = text[i];
      if (!_TextMetrics.isBreakingSpace(char)) {
        break;
      }
      text = text.slice(0, -1);
    }
    return text;
  }
  static isNewline(char) {
    if (typeof char !== "string") {
      return false;
    }
    return _TextMetrics._newlines.includes(char.charCodeAt(0));
  }
  static isBreakingSpace(char, _nextChar) {
    if (typeof char !== "string") {
      return false;
    }
    return _TextMetrics._breakingSpaces.includes(char.charCodeAt(0));
  }
  static tokenize(text) {
    const tokens = [];
    let token = "";
    if (typeof text !== "string") {
      return tokens;
    }
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      if (_TextMetrics.isBreakingSpace(char, nextChar) || _TextMetrics.isNewline(char)) {
        if (token !== "") {
          tokens.push(token);
          token = "";
        }
        tokens.push(char);
        continue;
      }
      token += char;
    }
    if (token !== "") {
      tokens.push(token);
    }
    return tokens;
  }
  static canBreakWords(_token, breakWords) {
    return breakWords;
  }
  static canBreakChars(_char, _nextChar, _token, _index, _breakWords) {
    return true;
  }
  static wordWrapSplit(token) {
    return _TextMetrics.graphemeSegmenter(token);
  }
  static measureFont(font) {
    if (_TextMetrics._fonts[font]) {
      return _TextMetrics._fonts[font];
    }
    const properties = {
      ascent: 0,
      descent: 0,
      fontSize: 0
    };
    const canvas = _TextMetrics._canvas;
    const context = _TextMetrics._context;
    context.font = font;
    const metricsString = _TextMetrics.METRICS_STRING + _TextMetrics.BASELINE_SYMBOL;
    const width = Math.ceil(context.measureText(metricsString).width);
    let baseline = Math.ceil(context.measureText(_TextMetrics.BASELINE_SYMBOL).width);
    const height = Math.ceil(_TextMetrics.HEIGHT_MULTIPLIER * baseline);
    baseline = baseline * _TextMetrics.BASELINE_MULTIPLIER | 0;
    if (width === 0 || height === 0) {
      _TextMetrics._fonts[font] = properties;
      return properties;
    }
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = "#f00";
    context.fillRect(0, 0, width, height);
    context.font = font;
    context.textBaseline = "alphabetic";
    context.fillStyle = "#000";
    context.fillText(metricsString, 0, baseline);
    const imagedata = context.getImageData(0, 0, width, height).data;
    const pixels = imagedata.length;
    const line = width * 4;
    let i = 0;
    let idx = 0;
    let stop = false;
    for (i = 0; i < baseline; ++i) {
      for (let j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }
      if (!stop) {
        idx += line;
      } else {
        break;
      }
    }
    properties.ascent = baseline - i;
    idx = pixels - line;
    stop = false;
    for (i = height; i > baseline; --i) {
      for (let j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }
      if (!stop) {
        idx -= line;
      } else {
        break;
      }
    }
    properties.descent = i - baseline;
    properties.fontSize = properties.ascent + properties.descent;
    _TextMetrics._fonts[font] = properties;
    return properties;
  }
  static clearMetrics(font = "") {
    if (font) {
      delete _TextMetrics._fonts[font];
    } else {
      _TextMetrics._fonts = {};
    }
  }
  static get _canvas() {
    if (!_TextMetrics.__canvas) {
      let canvas;
      try {
        const c = new OffscreenCanvas(0, 0);
        const context = c.getContext("2d", contextSettings);
        if (context?.measureText) {
          _TextMetrics.__canvas = c;
          return c;
        }
        canvas = settings.ADAPTER.createCanvas();
      } catch (ex) {
        canvas = settings.ADAPTER.createCanvas();
      }
      canvas.width = canvas.height = 10;
      _TextMetrics.__canvas = canvas;
    }
    return _TextMetrics.__canvas;
  }
  static get _context() {
    if (!_TextMetrics.__context) {
      _TextMetrics.__context = _TextMetrics._canvas.getContext("2d", contextSettings);
    }
    return _TextMetrics.__context;
  }
};
let TextMetrics = _TextMetrics;
TextMetrics.METRICS_STRING = "|\xC9q\xC5";
TextMetrics.BASELINE_SYMBOL = "M";
TextMetrics.BASELINE_MULTIPLIER = 1.4;
TextMetrics.HEIGHT_MULTIPLIER = 2;
TextMetrics.graphemeSegmenter = (() => {
  if (typeof Intl?.Segmenter === "function") {
    const segmenter = new Intl.Segmenter();
    return (s) => [...segmenter.segment(s)].map((x) => x.segment);
  }
  return (s) => [...s];
})();
TextMetrics.experimentalLetterSpacing = false;
TextMetrics._fonts = {};
TextMetrics._newlines = [
  10,
  13
];
TextMetrics._breakingSpaces = [
  9,
  32,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8200,
  8201,
  8202,
  8287,
  12288
];

const genericFontFamilies = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
const _TextStyle = class {
  constructor(style) {
    this.styleID = 0;
    this.reset();
    deepCopyProperties(this, style, style);
  }
  clone() {
    const clonedProperties = {};
    deepCopyProperties(clonedProperties, this, _TextStyle.defaultStyle);
    return new _TextStyle(clonedProperties);
  }
  reset() {
    deepCopyProperties(this, _TextStyle.defaultStyle, _TextStyle.defaultStyle);
  }
  get align() {
    return this._align;
  }
  set align(align) {
    if (this._align !== align) {
      this._align = align;
      this.styleID++;
    }
  }
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(breakWords) {
    if (this._breakWords !== breakWords) {
      this._breakWords = breakWords;
      this.styleID++;
    }
  }
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(dropShadow) {
    if (this._dropShadow !== dropShadow) {
      this._dropShadow = dropShadow;
      this.styleID++;
    }
  }
  get dropShadowAlpha() {
    return this._dropShadowAlpha;
  }
  set dropShadowAlpha(dropShadowAlpha) {
    if (this._dropShadowAlpha !== dropShadowAlpha) {
      this._dropShadowAlpha = dropShadowAlpha;
      this.styleID++;
    }
  }
  get dropShadowAngle() {
    return this._dropShadowAngle;
  }
  set dropShadowAngle(dropShadowAngle) {
    if (this._dropShadowAngle !== dropShadowAngle) {
      this._dropShadowAngle = dropShadowAngle;
      this.styleID++;
    }
  }
  get dropShadowBlur() {
    return this._dropShadowBlur;
  }
  set dropShadowBlur(dropShadowBlur) {
    if (this._dropShadowBlur !== dropShadowBlur) {
      this._dropShadowBlur = dropShadowBlur;
      this.styleID++;
    }
  }
  get dropShadowColor() {
    return this._dropShadowColor;
  }
  set dropShadowColor(dropShadowColor) {
    const outputColor = getColor(dropShadowColor);
    if (this._dropShadowColor !== outputColor) {
      this._dropShadowColor = outputColor;
      this.styleID++;
    }
  }
  get dropShadowDistance() {
    return this._dropShadowDistance;
  }
  set dropShadowDistance(dropShadowDistance) {
    if (this._dropShadowDistance !== dropShadowDistance) {
      this._dropShadowDistance = dropShadowDistance;
      this.styleID++;
    }
  }
  get fill() {
    return this._fill;
  }
  set fill(fill) {
    const outputColor = getColor(fill);
    if (this._fill !== outputColor) {
      this._fill = outputColor;
      this.styleID++;
    }
  }
  get fillGradientType() {
    return this._fillGradientType;
  }
  set fillGradientType(fillGradientType) {
    if (this._fillGradientType !== fillGradientType) {
      this._fillGradientType = fillGradientType;
      this.styleID++;
    }
  }
  get fillGradientStops() {
    return this._fillGradientStops;
  }
  set fillGradientStops(fillGradientStops) {
    if (!areArraysEqual(this._fillGradientStops, fillGradientStops)) {
      this._fillGradientStops = fillGradientStops;
      this.styleID++;
    }
  }
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(fontFamily) {
    if (this.fontFamily !== fontFamily) {
      this._fontFamily = fontFamily;
      this.styleID++;
    }
  }
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(fontSize) {
    if (this._fontSize !== fontSize) {
      this._fontSize = fontSize;
      this.styleID++;
    }
  }
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(fontStyle) {
    if (this._fontStyle !== fontStyle) {
      this._fontStyle = fontStyle;
      this.styleID++;
    }
  }
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(fontVariant) {
    if (this._fontVariant !== fontVariant) {
      this._fontVariant = fontVariant;
      this.styleID++;
    }
  }
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(fontWeight) {
    if (this._fontWeight !== fontWeight) {
      this._fontWeight = fontWeight;
      this.styleID++;
    }
  }
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(letterSpacing) {
    if (this._letterSpacing !== letterSpacing) {
      this._letterSpacing = letterSpacing;
      this.styleID++;
    }
  }
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(lineHeight) {
    if (this._lineHeight !== lineHeight) {
      this._lineHeight = lineHeight;
      this.styleID++;
    }
  }
  get leading() {
    return this._leading;
  }
  set leading(leading) {
    if (this._leading !== leading) {
      this._leading = leading;
      this.styleID++;
    }
  }
  get lineJoin() {
    return this._lineJoin;
  }
  set lineJoin(lineJoin) {
    if (this._lineJoin !== lineJoin) {
      this._lineJoin = lineJoin;
      this.styleID++;
    }
  }
  get miterLimit() {
    return this._miterLimit;
  }
  set miterLimit(miterLimit) {
    if (this._miterLimit !== miterLimit) {
      this._miterLimit = miterLimit;
      this.styleID++;
    }
  }
  get padding() {
    return this._padding;
  }
  set padding(padding) {
    if (this._padding !== padding) {
      this._padding = padding;
      this.styleID++;
    }
  }
  get stroke() {
    return this._stroke;
  }
  set stroke(stroke) {
    const outputColor = getColor(stroke);
    if (this._stroke !== outputColor) {
      this._stroke = outputColor;
      this.styleID++;
    }
  }
  get strokeThickness() {
    return this._strokeThickness;
  }
  set strokeThickness(strokeThickness) {
    if (this._strokeThickness !== strokeThickness) {
      this._strokeThickness = strokeThickness;
      this.styleID++;
    }
  }
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(textBaseline) {
    if (this._textBaseline !== textBaseline) {
      this._textBaseline = textBaseline;
      this.styleID++;
    }
  }
  get trim() {
    return this._trim;
  }
  set trim(trim) {
    if (this._trim !== trim) {
      this._trim = trim;
      this.styleID++;
    }
  }
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(whiteSpace) {
    if (this._whiteSpace !== whiteSpace) {
      this._whiteSpace = whiteSpace;
      this.styleID++;
    }
  }
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(wordWrap) {
    if (this._wordWrap !== wordWrap) {
      this._wordWrap = wordWrap;
      this.styleID++;
    }
  }
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(wordWrapWidth) {
    if (this._wordWrapWidth !== wordWrapWidth) {
      this._wordWrapWidth = wordWrapWidth;
      this.styleID++;
    }
  }
  toFontString() {
    const fontSizeString = typeof this.fontSize === "number" ? `${this.fontSize}px` : this.fontSize;
    let fontFamilies = this.fontFamily;
    if (!Array.isArray(this.fontFamily)) {
      fontFamilies = this.fontFamily.split(",");
    }
    for (let i = fontFamilies.length - 1; i >= 0; i--) {
      let fontFamily = fontFamilies[i].trim();
      if (!/([\"\'])[^\'\"]+\1/.test(fontFamily) && !genericFontFamilies.includes(fontFamily)) {
        fontFamily = `"${fontFamily}"`;
      }
      fontFamilies[i] = fontFamily;
    }
    return `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${fontSizeString} ${fontFamilies.join(",")}`;
  }
};
let TextStyle = _TextStyle;
TextStyle.defaultStyle = {
  align: "left",
  breakWords: false,
  dropShadow: false,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: "black",
  dropShadowDistance: 5,
  fill: "black",
  fillGradientType: TEXT_GRADIENT.LINEAR_VERTICAL,
  fillGradientStops: [],
  fontFamily: "Arial",
  fontSize: 26,
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  leading: 0,
  letterSpacing: 0,
  lineHeight: 0,
  lineJoin: "miter",
  miterLimit: 10,
  padding: 0,
  stroke: "black",
  strokeThickness: 0,
  textBaseline: "alphabetic",
  trim: false,
  whiteSpace: "pre",
  wordWrap: false,
  wordWrapWidth: 100
};
function getSingleColor(color) {
  if (typeof color === "number") {
    return hex2string(color);
  } else if (typeof color === "string") {
    if (color.startsWith("0x")) {
      color = color.replace("0x", "#");
    }
  }
  return color;
}
function getColor(color) {
  if (!Array.isArray(color)) {
    return getSingleColor(color);
  } else {
    for (let i = 0; i < color.length; ++i) {
      color[i] = getSingleColor(color[i]);
    }
    return color;
  }
}
function areArraysEqual(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return false;
  }
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; ++i) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}
function deepCopyProperties(target, source, propertyObj) {
  for (const prop in propertyObj) {
    if (Array.isArray(source[prop])) {
      target[prop] = source[prop].slice();
    } else {
      target[prop] = source[prop];
    }
  }
}

const defaultDestroyOptions = {
  texture: true,
  children: false,
  baseTexture: true
};
const _Text = class extends Sprite {
  constructor(text, style, canvas) {
    let ownCanvas = false;
    if (!canvas) {
      canvas = settings.ADAPTER.createCanvas();
      ownCanvas = true;
    }
    canvas.width = 3;
    canvas.height = 3;
    const texture = Texture.from(canvas);
    texture.orig = new Rectangle();
    texture.trim = new Rectangle();
    super(texture);
    this._ownCanvas = ownCanvas;
    this.canvas = canvas;
    this.context = canvas.getContext("2d", {
      willReadFrequently: true
    });
    this._resolution = _Text.defaultResolution ?? settings.RESOLUTION;
    this._autoResolution = _Text.defaultAutoResolution;
    this._text = null;
    this._style = null;
    this._styleListener = null;
    this._font = "";
    this.text = text;
    this.style = style;
    this.localStyleID = -1;
  }
  static get experimentalLetterSpacing() {
    return TextMetrics.experimentalLetterSpacing;
  }
  static set experimentalLetterSpacing(value) {
    deprecation("7.1.0", "Text.experimentalLetterSpacing is deprecated, use TextMetrics.experimentalLetterSpacing");
    TextMetrics.experimentalLetterSpacing = value;
  }
  updateText(respectDirty) {
    const style = this._style;
    if (this.localStyleID !== style.styleID) {
      this.dirty = true;
      this.localStyleID = style.styleID;
    }
    if (!this.dirty && respectDirty) {
      return;
    }
    this._font = this._style.toFontString();
    const context = this.context;
    const measured = TextMetrics.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas);
    const width = measured.width;
    const height = measured.height;
    const lines = measured.lines;
    const lineHeight = measured.lineHeight;
    const lineWidths = measured.lineWidths;
    const maxLineWidth = measured.maxLineWidth;
    const fontProperties = measured.fontProperties;
    this.canvas.width = Math.ceil(Math.ceil(Math.max(1, width) + style.padding * 2) * this._resolution);
    this.canvas.height = Math.ceil(Math.ceil(Math.max(1, height) + style.padding * 2) * this._resolution);
    context.scale(this._resolution, this._resolution);
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.font = this._font;
    context.lineWidth = style.strokeThickness;
    context.textBaseline = style.textBaseline;
    context.lineJoin = style.lineJoin;
    context.miterLimit = style.miterLimit;
    let linePositionX;
    let linePositionY;
    const passesCount = style.dropShadow ? 2 : 1;
    for (let i = 0; i < passesCount; ++i) {
      const isShadowPass = style.dropShadow && i === 0;
      const dsOffsetText = isShadowPass ? Math.ceil(Math.max(1, height) + style.padding * 2) : 0;
      const dsOffsetShadow = dsOffsetText * this._resolution;
      if (isShadowPass) {
        context.fillStyle = "black";
        context.strokeStyle = "black";
        const dropShadowColor = style.dropShadowColor;
        const rgb = hex2rgb(typeof dropShadowColor === "number" ? dropShadowColor : string2hex(dropShadowColor));
        const dropShadowBlur = style.dropShadowBlur * this._resolution;
        const dropShadowDistance = style.dropShadowDistance * this._resolution;
        context.shadowColor = `rgba(${rgb[0] * 255},${rgb[1] * 255},${rgb[2] * 255},${style.dropShadowAlpha})`;
        context.shadowBlur = dropShadowBlur;
        context.shadowOffsetX = Math.cos(style.dropShadowAngle) * dropShadowDistance;
        context.shadowOffsetY = Math.sin(style.dropShadowAngle) * dropShadowDistance + dsOffsetShadow;
      } else {
        context.fillStyle = this._generateFillStyle(style, lines, measured);
        context.strokeStyle = style.stroke;
        context.shadowColor = "black";
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
      }
      let linePositionYShift = (lineHeight - fontProperties.fontSize) / 2;
      if (lineHeight - fontProperties.fontSize < 0) {
        linePositionYShift = 0;
      }
      for (let i2 = 0; i2 < lines.length; i2++) {
        linePositionX = style.strokeThickness / 2;
        linePositionY = style.strokeThickness / 2 + i2 * lineHeight + fontProperties.ascent + linePositionYShift;
        if (style.align === "right") {
          linePositionX += maxLineWidth - lineWidths[i2];
        } else if (style.align === "center") {
          linePositionX += (maxLineWidth - lineWidths[i2]) / 2;
        }
        if (style.stroke && style.strokeThickness) {
          this.drawLetterSpacing(lines[i2], linePositionX + style.padding, linePositionY + style.padding - dsOffsetText, true);
        }
        if (style.fill) {
          this.drawLetterSpacing(lines[i2], linePositionX + style.padding, linePositionY + style.padding - dsOffsetText);
        }
      }
    }
    this.updateTexture();
  }
  drawLetterSpacing(text, x, y, isStroke = false) {
    const style = this._style;
    const letterSpacing = style.letterSpacing;
    let useExperimentalLetterSpacing = false;
    if (TextMetrics.experimentalLetterSpacingSupported) {
      if (TextMetrics.experimentalLetterSpacing) {
        this.context.letterSpacing = `${letterSpacing}px`;
        this.context.textLetterSpacing = `${letterSpacing}px`;
        useExperimentalLetterSpacing = true;
      } else {
        this.context.letterSpacing = "0px";
        this.context.textLetterSpacing = "0px";
      }
    }
    if (letterSpacing === 0 || useExperimentalLetterSpacing) {
      if (isStroke) {
        this.context.strokeText(text, x, y);
      } else {
        this.context.fillText(text, x, y);
      }
      return;
    }
    let currentPosition = x;
    const stringArray = TextMetrics.graphemeSegmenter(text);
    let previousWidth = this.context.measureText(text).width;
    let currentWidth = 0;
    for (let i = 0; i < stringArray.length; ++i) {
      const currentChar = stringArray[i];
      if (isStroke) {
        this.context.strokeText(currentChar, currentPosition, y);
      } else {
        this.context.fillText(currentChar, currentPosition, y);
      }
      let textStr = "";
      for (let j = i + 1; j < stringArray.length; ++j) {
        textStr += stringArray[j];
      }
      currentWidth = this.context.measureText(textStr).width;
      currentPosition += previousWidth - currentWidth + letterSpacing;
      previousWidth = currentWidth;
    }
  }
  updateTexture() {
    const canvas = this.canvas;
    if (this._style.trim) {
      const trimmed = trimCanvas(canvas);
      if (trimmed.data) {
        canvas.width = trimmed.width;
        canvas.height = trimmed.height;
        this.context.putImageData(trimmed.data, 0, 0);
      }
    }
    const texture = this._texture;
    const style = this._style;
    const padding = style.trim ? 0 : style.padding;
    const baseTexture = texture.baseTexture;
    texture.trim.width = texture._frame.width = canvas.width / this._resolution;
    texture.trim.height = texture._frame.height = canvas.height / this._resolution;
    texture.trim.x = -padding;
    texture.trim.y = -padding;
    texture.orig.width = texture._frame.width - padding * 2;
    texture.orig.height = texture._frame.height - padding * 2;
    this._onTextureUpdate();
    baseTexture.setRealSize(canvas.width, canvas.height, this._resolution);
    texture.updateUvs();
    this.dirty = false;
  }
  _render(renderer) {
    if (this._autoResolution && this._resolution !== renderer.resolution) {
      this._resolution = renderer.resolution;
      this.dirty = true;
    }
    this.updateText(true);
    super._render(renderer);
  }
  updateTransform() {
    this.updateText(true);
    super.updateTransform();
  }
  getBounds(skipUpdate, rect) {
    this.updateText(true);
    if (this._textureID === -1) {
      skipUpdate = false;
    }
    return super.getBounds(skipUpdate, rect);
  }
  getLocalBounds(rect) {
    this.updateText(true);
    return super.getLocalBounds.call(this, rect);
  }
  _calculateBounds() {
    this.calculateVertices();
    this._bounds.addQuad(this.vertexData);
  }
  _generateFillStyle(style, lines, metrics) {
    const fillStyle = style.fill;
    if (!Array.isArray(fillStyle)) {
      return fillStyle;
    } else if (fillStyle.length === 1) {
      return fillStyle[0];
    }
    let gradient;
    const dropShadowCorrection = style.dropShadow ? style.dropShadowDistance : 0;
    const padding = style.padding || 0;
    const width = this.canvas.width / this._resolution - dropShadowCorrection - padding * 2;
    const height = this.canvas.height / this._resolution - dropShadowCorrection - padding * 2;
    const fill = fillStyle.slice();
    const fillGradientStops = style.fillGradientStops.slice();
    if (!fillGradientStops.length) {
      const lengthPlus1 = fill.length + 1;
      for (let i = 1; i < lengthPlus1; ++i) {
        fillGradientStops.push(i / lengthPlus1);
      }
    }
    fill.unshift(fillStyle[0]);
    fillGradientStops.unshift(0);
    fill.push(fillStyle[fillStyle.length - 1]);
    fillGradientStops.push(1);
    if (style.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
      gradient = this.context.createLinearGradient(width / 2, padding, width / 2, height + padding);
      const textHeight = metrics.fontProperties.fontSize + style.strokeThickness;
      for (let i = 0; i < lines.length; i++) {
        const lastLineBottom = metrics.lineHeight * (i - 1) + textHeight;
        const thisLineTop = metrics.lineHeight * i;
        let thisLineGradientStart = thisLineTop;
        if (i > 0 && lastLineBottom > thisLineTop) {
          thisLineGradientStart = (thisLineTop + lastLineBottom) / 2;
        }
        const thisLineBottom = thisLineTop + textHeight;
        const nextLineTop = metrics.lineHeight * (i + 1);
        let thisLineGradientEnd = thisLineBottom;
        if (i + 1 < lines.length && nextLineTop < thisLineBottom) {
          thisLineGradientEnd = (thisLineBottom + nextLineTop) / 2;
        }
        const gradStopLineHeight = (thisLineGradientEnd - thisLineGradientStart) / height;
        for (let j = 0; j < fill.length; j++) {
          let lineStop = 0;
          if (typeof fillGradientStops[j] === "number") {
            lineStop = fillGradientStops[j];
          } else {
            lineStop = j / fill.length;
          }
          let globalStop = Math.min(1, Math.max(0, thisLineGradientStart / height + lineStop * gradStopLineHeight));
          globalStop = Number(globalStop.toFixed(5));
          gradient.addColorStop(globalStop, fill[j]);
        }
      }
    } else {
      gradient = this.context.createLinearGradient(padding, height / 2, width + padding, height / 2);
      const totalIterations = fill.length + 1;
      let currentIteration = 1;
      for (let i = 0; i < fill.length; i++) {
        let stop;
        if (typeof fillGradientStops[i] === "number") {
          stop = fillGradientStops[i];
        } else {
          stop = currentIteration / totalIterations;
        }
        gradient.addColorStop(stop, fill[i]);
        currentIteration++;
      }
    }
    return gradient;
  }
  destroy(options) {
    if (typeof options === "boolean") {
      options = { children: options };
    }
    options = Object.assign({}, defaultDestroyOptions, options);
    super.destroy(options);
    if (this._ownCanvas) {
      this.canvas.height = this.canvas.width = 0;
    }
    this.context = null;
    this.canvas = null;
    this._style = null;
  }
  get width() {
    this.updateText(true);
    return Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(value) {
    this.updateText(true);
    const s = sign(this.scale.x) || 1;
    this.scale.x = s * value / this._texture.orig.width;
    this._width = value;
  }
  get height() {
    this.updateText(true);
    return Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(value) {
    this.updateText(true);
    const s = sign(this.scale.y) || 1;
    this.scale.y = s * value / this._texture.orig.height;
    this._height = value;
  }
  get style() {
    return this._style;
  }
  set style(style) {
    style = style || {};
    if (style instanceof TextStyle) {
      this._style = style;
    } else {
      this._style = new TextStyle(style);
    }
    this.localStyleID = -1;
    this.dirty = true;
  }
  get text() {
    return this._text;
  }
  set text(text) {
    text = String(text === null || text === void 0 ? "" : text);
    if (this._text === text) {
      return;
    }
    this._text = text;
    this.dirty = true;
  }
  get resolution() {
    return this._resolution;
  }
  set resolution(value) {
    this._autoResolution = false;
    if (this._resolution === value) {
      return;
    }
    this._resolution = value;
    this.dirty = true;
  }
};
let Text = _Text;
Text.defaultAutoResolution = true;

class CountLimiter {
  constructor(maxItemsPerFrame) {
    this.maxItemsPerFrame = maxItemsPerFrame;
    this.itemsLeft = 0;
  }
  beginFrame() {
    this.itemsLeft = this.maxItemsPerFrame;
  }
  allowedToUpload() {
    return this.itemsLeft-- > 0;
  }
}

function findMultipleBaseTextures(item, queue) {
  let result = false;
  if (item?._textures?.length) {
    for (let i = 0; i < item._textures.length; i++) {
      if (item._textures[i] instanceof Texture) {
        const baseTexture = item._textures[i].baseTexture;
        if (!queue.includes(baseTexture)) {
          queue.push(baseTexture);
          result = true;
        }
      }
    }
  }
  return result;
}
function findBaseTexture(item, queue) {
  if (item.baseTexture instanceof BaseTexture) {
    const texture = item.baseTexture;
    if (!queue.includes(texture)) {
      queue.push(texture);
    }
    return true;
  }
  return false;
}
function findTexture(item, queue) {
  if (item._texture && item._texture instanceof Texture) {
    const texture = item._texture.baseTexture;
    if (!queue.includes(texture)) {
      queue.push(texture);
    }
    return true;
  }
  return false;
}
function drawText(_helper, item) {
  if (item instanceof Text) {
    item.updateText(true);
    return true;
  }
  return false;
}
function calculateTextStyle(_helper, item) {
  if (item instanceof TextStyle) {
    const font = item.toFontString();
    TextMetrics.measureFont(font);
    return true;
  }
  return false;
}
function findText(item, queue) {
  if (item instanceof Text) {
    if (!queue.includes(item.style)) {
      queue.push(item.style);
    }
    if (!queue.includes(item)) {
      queue.push(item);
    }
    const texture = item._texture.baseTexture;
    if (!queue.includes(texture)) {
      queue.push(texture);
    }
    return true;
  }
  return false;
}
function findTextStyle(item, queue) {
  if (item instanceof TextStyle) {
    if (!queue.includes(item)) {
      queue.push(item);
    }
    return true;
  }
  return false;
}
const _BasePrepare = class {
  constructor(renderer) {
    this.limiter = new CountLimiter(_BasePrepare.uploadsPerFrame);
    this.renderer = renderer;
    this.uploadHookHelper = null;
    this.queue = [];
    this.addHooks = [];
    this.uploadHooks = [];
    this.completes = [];
    this.ticking = false;
    this.delayedTick = () => {
      if (!this.queue) {
        return;
      }
      this.prepareItems();
    };
    this.registerFindHook(findText);
    this.registerFindHook(findTextStyle);
    this.registerFindHook(findMultipleBaseTextures);
    this.registerFindHook(findBaseTexture);
    this.registerFindHook(findTexture);
    this.registerUploadHook(drawText);
    this.registerUploadHook(calculateTextStyle);
  }
  upload(item) {
    return new Promise((resolve) => {
      if (item) {
        this.add(item);
      }
      if (this.queue.length) {
        this.completes.push(resolve);
        if (!this.ticking) {
          this.ticking = true;
          Ticker.system.addOnce(this.tick, this, UPDATE_PRIORITY.UTILITY);
        }
      } else {
        resolve();
      }
    });
  }
  tick() {
    setTimeout(this.delayedTick, 0);
  }
  prepareItems() {
    this.limiter.beginFrame();
    while (this.queue.length && this.limiter.allowedToUpload()) {
      const item = this.queue[0];
      let uploaded = false;
      if (item && !item._destroyed) {
        for (let i = 0, len = this.uploadHooks.length; i < len; i++) {
          if (this.uploadHooks[i](this.uploadHookHelper, item)) {
            this.queue.shift();
            uploaded = true;
            break;
          }
        }
      }
      if (!uploaded) {
        this.queue.shift();
      }
    }
    if (!this.queue.length) {
      this.ticking = false;
      const completes = this.completes.slice(0);
      this.completes.length = 0;
      for (let i = 0, len = completes.length; i < len; i++) {
        completes[i]();
      }
    } else {
      Ticker.system.addOnce(this.tick, this, UPDATE_PRIORITY.UTILITY);
    }
  }
  registerFindHook(addHook) {
    if (addHook) {
      this.addHooks.push(addHook);
    }
    return this;
  }
  registerUploadHook(uploadHook) {
    if (uploadHook) {
      this.uploadHooks.push(uploadHook);
    }
    return this;
  }
  add(item) {
    for (let i = 0, len = this.addHooks.length; i < len; i++) {
      if (this.addHooks[i](item, this.queue)) {
        break;
      }
    }
    if (item instanceof Container) {
      for (let i = item.children.length - 1; i >= 0; i--) {
        this.add(item.children[i]);
      }
    }
    return this;
  }
  destroy() {
    if (this.ticking) {
      Ticker.system.remove(this.tick, this);
    }
    this.ticking = false;
    this.addHooks = null;
    this.uploadHooks = null;
    this.renderer = null;
    this.completes = null;
    this.queue = null;
    this.limiter = null;
    this.uploadHookHelper = null;
  }
};
let BasePrepare = _BasePrepare;
BasePrepare.uploadsPerFrame = 4;

Object.defineProperties(settings, {
  UPLOADS_PER_FRAME: {
    get() {
      return BasePrepare.uploadsPerFrame;
    },
    set(value) {
      deprecation("7.1.0", "settings.UPLOADS_PER_FRAME is deprecated, use prepare.BasePrepare.uploadsPerFrame");
      BasePrepare.uploadsPerFrame = value;
    }
  }
});

function uploadBaseTextures(renderer, item) {
  if (item instanceof BaseTexture) {
    if (!item._glTextures[renderer.CONTEXT_UID]) {
      renderer.texture.bind(item);
    }
    return true;
  }
  return false;
}
function uploadGraphics(renderer, item) {
  if (!(item instanceof Graphics)) {
    return false;
  }
  const { geometry } = item;
  item.finishPoly();
  geometry.updateBatches();
  const { batches } = geometry;
  for (let i = 0; i < batches.length; i++) {
    const { texture } = batches[i].style;
    if (texture) {
      uploadBaseTextures(renderer, texture.baseTexture);
    }
  }
  if (!geometry.batchable) {
    renderer.geometry.bind(geometry, item._resolveDirectShader(renderer));
  }
  return true;
}
function findGraphics(item, queue) {
  if (item instanceof Graphics) {
    queue.push(item);
    return true;
  }
  return false;
}
class Prepare extends BasePrepare {
  constructor(renderer) {
    super(renderer);
    this.uploadHookHelper = this.renderer;
    this.registerFindHook(findGraphics);
    this.registerUploadHook(uploadBaseTextures);
    this.registerUploadHook(uploadGraphics);
  }
}
Prepare.extension = {
  name: "prepare",
  type: ExtensionType.RendererSystem
};
extensions$1.add(Prepare);

class TimeLimiter {
  constructor(maxMilliseconds) {
    this.maxMilliseconds = maxMilliseconds;
    this.frameStart = 0;
  }
  beginFrame() {
    this.frameStart = Date.now();
  }
  allowedToUpload() {
    return Date.now() - this.frameStart < this.maxMilliseconds;
  }
}

class AnimatedSprite extends Sprite {
  constructor(textures, autoUpdate = true) {
    super(textures[0] instanceof Texture ? textures[0] : textures[0].texture);
    this._textures = null;
    this._durations = null;
    this._autoUpdate = autoUpdate;
    this._isConnectedToTicker = false;
    this.animationSpeed = 1;
    this.loop = true;
    this.updateAnchor = false;
    this.onComplete = null;
    this.onFrameChange = null;
    this.onLoop = null;
    this._currentTime = 0;
    this._playing = false;
    this._previousFrame = null;
    this.textures = textures;
  }
  stop() {
    if (!this._playing) {
      return;
    }
    this._playing = false;
    if (this._autoUpdate && this._isConnectedToTicker) {
      Ticker.shared.remove(this.update, this);
      this._isConnectedToTicker = false;
    }
  }
  play() {
    if (this._playing) {
      return;
    }
    this._playing = true;
    if (this._autoUpdate && !this._isConnectedToTicker) {
      Ticker.shared.add(this.update, this, UPDATE_PRIORITY.HIGH);
      this._isConnectedToTicker = true;
    }
  }
  gotoAndStop(frameNumber) {
    this.stop();
    this.currentFrame = frameNumber;
  }
  gotoAndPlay(frameNumber) {
    this.currentFrame = frameNumber;
    this.play();
  }
  update(deltaTime) {
    if (!this._playing) {
      return;
    }
    const elapsed = this.animationSpeed * deltaTime;
    const previousFrame = this.currentFrame;
    if (this._durations !== null) {
      let lag = this._currentTime % 1 * this._durations[this.currentFrame];
      lag += elapsed / 60 * 1e3;
      while (lag < 0) {
        this._currentTime--;
        lag += this._durations[this.currentFrame];
      }
      const sign = Math.sign(this.animationSpeed * deltaTime);
      this._currentTime = Math.floor(this._currentTime);
      while (lag >= this._durations[this.currentFrame]) {
        lag -= this._durations[this.currentFrame] * sign;
        this._currentTime += sign;
      }
      this._currentTime += lag / this._durations[this.currentFrame];
    } else {
      this._currentTime += elapsed;
    }
    if (this._currentTime < 0 && !this.loop) {
      this.gotoAndStop(0);
      if (this.onComplete) {
        this.onComplete();
      }
    } else if (this._currentTime >= this._textures.length && !this.loop) {
      this.gotoAndStop(this._textures.length - 1);
      if (this.onComplete) {
        this.onComplete();
      }
    } else if (previousFrame !== this.currentFrame) {
      if (this.loop && this.onLoop) {
        if (this.animationSpeed > 0 && this.currentFrame < previousFrame || this.animationSpeed < 0 && this.currentFrame > previousFrame) {
          this.onLoop();
        }
      }
      this.updateTexture();
    }
  }
  updateTexture() {
    const currentFrame = this.currentFrame;
    if (this._previousFrame === currentFrame) {
      return;
    }
    this._previousFrame = currentFrame;
    this._texture = this._textures[currentFrame];
    this._textureID = -1;
    this._textureTrimmedID = -1;
    this._cachedTint = 16777215;
    this.uvs = this._texture._uvs.uvsFloat32;
    if (this.updateAnchor) {
      this._anchor.copyFrom(this._texture.defaultAnchor);
    }
    if (this.onFrameChange) {
      this.onFrameChange(this.currentFrame);
    }
  }
  destroy(options) {
    this.stop();
    super.destroy(options);
    this.onComplete = null;
    this.onFrameChange = null;
    this.onLoop = null;
  }
  static fromFrames(frames) {
    const textures = [];
    for (let i = 0; i < frames.length; ++i) {
      textures.push(Texture.from(frames[i]));
    }
    return new AnimatedSprite(textures);
  }
  static fromImages(images) {
    const textures = [];
    for (let i = 0; i < images.length; ++i) {
      textures.push(Texture.from(images[i]));
    }
    return new AnimatedSprite(textures);
  }
  get totalFrames() {
    return this._textures.length;
  }
  get textures() {
    return this._textures;
  }
  set textures(value) {
    if (value[0] instanceof Texture) {
      this._textures = value;
      this._durations = null;
    } else {
      this._textures = [];
      this._durations = [];
      for (let i = 0; i < value.length; i++) {
        this._textures.push(value[i].texture);
        this._durations.push(value[i].time);
      }
    }
    this._previousFrame = null;
    this.gotoAndStop(0);
    this.updateTexture();
  }
  get currentFrame() {
    let currentFrame = Math.floor(this._currentTime) % this._textures.length;
    if (currentFrame < 0) {
      currentFrame += this._textures.length;
    }
    return currentFrame;
  }
  set currentFrame(value) {
    if (value < 0 || value > this.totalFrames - 1) {
      throw new Error(`[AnimatedSprite]: Invalid frame index value ${value}, expected to be between 0 and totalFrames ${this.totalFrames}.`);
    }
    const previousFrame = this.currentFrame;
    this._currentTime = value;
    if (previousFrame !== this.currentFrame) {
      this.updateTexture();
    }
  }
  get playing() {
    return this._playing;
  }
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(value) {
    if (value !== this._autoUpdate) {
      this._autoUpdate = value;
      if (!this._autoUpdate && this._isConnectedToTicker) {
        Ticker.shared.remove(this.update, this);
        this._isConnectedToTicker = false;
      } else if (this._autoUpdate && !this._isConnectedToTicker && this._playing) {
        Ticker.shared.add(this.update, this);
        this._isConnectedToTicker = true;
      }
    }
  }
}

const tempPoint = new Point();
class TilingSprite extends Sprite {
  constructor(texture, width = 100, height = 100) {
    super(texture);
    this.tileTransform = new Transform();
    this._width = width;
    this._height = height;
    this.uvMatrix = this.texture.uvMatrix || new TextureMatrix(texture);
    this.pluginName = "tilingSprite";
    this.uvRespectAnchor = false;
  }
  get clampMargin() {
    return this.uvMatrix.clampMargin;
  }
  set clampMargin(value) {
    this.uvMatrix.clampMargin = value;
    this.uvMatrix.update(true);
  }
  get tileScale() {
    return this.tileTransform.scale;
  }
  set tileScale(value) {
    this.tileTransform.scale.copyFrom(value);
  }
  get tilePosition() {
    return this.tileTransform.position;
  }
  set tilePosition(value) {
    this.tileTransform.position.copyFrom(value);
  }
  _onTextureUpdate() {
    if (this.uvMatrix) {
      this.uvMatrix.texture = this._texture;
    }
    this._cachedTint = 16777215;
  }
  _render(renderer) {
    const texture = this._texture;
    if (!texture || !texture.valid) {
      return;
    }
    this.tileTransform.updateLocalTransform();
    this.uvMatrix.update();
    renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
    renderer.plugins[this.pluginName].render(this);
  }
  _calculateBounds() {
    const minX = this._width * -this._anchor._x;
    const minY = this._height * -this._anchor._y;
    const maxX = this._width * (1 - this._anchor._x);
    const maxY = this._height * (1 - this._anchor._y);
    this._bounds.addFrame(this.transform, minX, minY, maxX, maxY);
  }
  getLocalBounds(rect) {
    if (this.children.length === 0) {
      this._bounds.minX = this._width * -this._anchor._x;
      this._bounds.minY = this._height * -this._anchor._y;
      this._bounds.maxX = this._width * (1 - this._anchor._x);
      this._bounds.maxY = this._height * (1 - this._anchor._y);
      if (!rect) {
        if (!this._localBoundsRect) {
          this._localBoundsRect = new Rectangle();
        }
        rect = this._localBoundsRect;
      }
      return this._bounds.getRectangle(rect);
    }
    return super.getLocalBounds.call(this, rect);
  }
  containsPoint(point) {
    this.worldTransform.applyInverse(point, tempPoint);
    const width = this._width;
    const height = this._height;
    const x1 = -width * this.anchor._x;
    if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
      const y1 = -height * this.anchor._y;
      if (tempPoint.y >= y1 && tempPoint.y < y1 + height) {
        return true;
      }
    }
    return false;
  }
  destroy(options) {
    super.destroy(options);
    this.tileTransform = null;
    this.uvMatrix = null;
  }
  static from(source, options) {
    const texture = source instanceof Texture ? source : Texture.from(source, options);
    return new TilingSprite(texture, options.width, options.height);
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
  }
}

var gl2FragmentSrc = "#version 300 es\n#define SHADER_NAME Tiling-Sprite-100\n\nprecision lowp float;\n\nin vec2 vTextureCoord;\n\nout vec4 fragmentColor;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    vec2 unclamped = coord;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 texSample = texture(uSampler, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0\n\n    fragmentColor = texSample * uColor;\n}\n";

var gl2VertexSrc = "#version 300 es\n#define SHADER_NAME Tiling-Sprite-300\n\nprecision lowp float;\n\nin vec2 aVertexPosition;\nin vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nout vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n";

var gl1FragmentSrc = "#version 100\n#ifdef GL_EXT_shader_texture_lod\n    #extension GL_EXT_shader_texture_lod : enable\n#endif\n#define SHADER_NAME Tiling-Sprite-100\n\nprecision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    vec2 unclamped = coord;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    #ifdef GL_EXT_shader_texture_lod\n        vec4 texSample = unclamped == coord\n            ? texture2D(uSampler, coord) \n            : texture2DLodEXT(uSampler, coord, 0);\n    #else\n        vec4 texSample = texture2D(uSampler, coord);\n    #endif\n\n    gl_FragColor = texSample * uColor;\n}\n";

var gl1VertexSrc = "#version 100\n#define SHADER_NAME Tiling-Sprite-100\n\nprecision lowp float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n";

var fragmentSimpleSrc = "#version 100\n#define SHADER_NAME Tiling-Sprite-Simple-100\n\nprecision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 texSample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = texSample * uColor;\n}\n";

const tempMat = new Matrix();
class TilingSpriteRenderer extends ObjectRenderer {
  constructor(renderer) {
    super(renderer);
    renderer.runners.contextChange.add(this);
    this.quad = new QuadUv();
    this.state = State.for2d();
  }
  contextChange() {
    const renderer = this.renderer;
    const uniforms = { globals: renderer.globalUniforms };
    this.simpleShader = Shader.from(gl1VertexSrc, fragmentSimpleSrc, uniforms);
    this.shader = renderer.context.webGLVersion > 1 ? Shader.from(gl2VertexSrc, gl2FragmentSrc, uniforms) : Shader.from(gl1VertexSrc, gl1FragmentSrc, uniforms);
  }
  render(ts) {
    const renderer = this.renderer;
    const quad = this.quad;
    let vertices = quad.vertices;
    vertices[0] = vertices[6] = ts._width * -ts.anchor.x;
    vertices[1] = vertices[3] = ts._height * -ts.anchor.y;
    vertices[2] = vertices[4] = ts._width * (1 - ts.anchor.x);
    vertices[5] = vertices[7] = ts._height * (1 - ts.anchor.y);
    const anchorX = ts.uvRespectAnchor ? ts.anchor.x : 0;
    const anchorY = ts.uvRespectAnchor ? ts.anchor.y : 0;
    vertices = quad.uvs;
    vertices[0] = vertices[6] = -anchorX;
    vertices[1] = vertices[3] = -anchorY;
    vertices[2] = vertices[4] = 1 - anchorX;
    vertices[5] = vertices[7] = 1 - anchorY;
    quad.invalidate();
    const tex = ts._texture;
    const baseTex = tex.baseTexture;
    const premultiplied = baseTex.alphaMode > 0;
    const lt = ts.tileTransform.localTransform;
    const uv = ts.uvMatrix;
    let isSimple = baseTex.isPowerOfTwo && tex.frame.width === baseTex.width && tex.frame.height === baseTex.height;
    if (isSimple) {
      if (!baseTex._glTextures[renderer.CONTEXT_UID]) {
        if (baseTex.wrapMode === WRAP_MODES.CLAMP) {
          baseTex.wrapMode = WRAP_MODES.REPEAT;
        }
      } else {
        isSimple = baseTex.wrapMode !== WRAP_MODES.CLAMP;
      }
    }
    const shader = isSimple ? this.simpleShader : this.shader;
    const w = tex.width;
    const h = tex.height;
    const W = ts._width;
    const H = ts._height;
    tempMat.set(lt.a * w / W, lt.b * w / H, lt.c * h / W, lt.d * h / H, lt.tx / W, lt.ty / H);
    tempMat.invert();
    if (isSimple) {
      tempMat.prepend(uv.mapCoord);
    } else {
      shader.uniforms.uMapCoord = uv.mapCoord.toArray(true);
      shader.uniforms.uClampFrame = uv.uClampFrame;
      shader.uniforms.uClampOffset = uv.uClampOffset;
    }
    shader.uniforms.uTransform = tempMat.toArray(true);
    shader.uniforms.uColor = premultiplyTintToRgba(ts.tint, ts.worldAlpha, shader.uniforms.uColor, premultiplied);
    shader.uniforms.translationMatrix = ts.transform.worldTransform.toArray(true);
    shader.uniforms.uSampler = tex;
    renderer.shader.bind(shader);
    renderer.geometry.bind(quad);
    this.state.blendMode = correctBlendMode(ts.blendMode, premultiplied);
    renderer.state.set(this.state);
    renderer.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
  }
}
TilingSpriteRenderer.extension = {
  name: "tilingSprite",
  type: ExtensionType.RendererPlugin
};
extensions$1.add(TilingSpriteRenderer);

const _Spritesheet = class {
  constructor(texture, data, resolutionFilename = null) {
    this.linkedSheets = [];
    this._texture = texture instanceof Texture ? texture : null;
    this.baseTexture = texture instanceof BaseTexture ? texture : this._texture.baseTexture;
    this.textures = {};
    this.animations = {};
    this.data = data;
    const resource = this.baseTexture.resource;
    this.resolution = this._updateResolution(resolutionFilename || (resource ? resource.url : null));
    this._frames = this.data.frames;
    this._frameKeys = Object.keys(this._frames);
    this._batchIndex = 0;
    this._callback = null;
  }
  _updateResolution(resolutionFilename = null) {
    const { scale } = this.data.meta;
    let resolution = getResolutionOfUrl(resolutionFilename, null);
    if (resolution === null) {
      resolution = parseFloat(scale ?? "1");
    }
    if (resolution !== 1) {
      this.baseTexture.setResolution(resolution);
    }
    return resolution;
  }
  parse() {
    return new Promise((resolve) => {
      this._callback = resolve;
      this._batchIndex = 0;
      if (this._frameKeys.length <= _Spritesheet.BATCH_SIZE) {
        this._processFrames(0);
        this._processAnimations();
        this._parseComplete();
      } else {
        this._nextBatch();
      }
    });
  }
  _processFrames(initialFrameIndex) {
    let frameIndex = initialFrameIndex;
    const maxFrames = _Spritesheet.BATCH_SIZE;
    while (frameIndex - initialFrameIndex < maxFrames && frameIndex < this._frameKeys.length) {
      const i = this._frameKeys[frameIndex];
      const data = this._frames[i];
      const rect = data.frame;
      if (rect) {
        let frame = null;
        let trim = null;
        const sourceSize = data.trimmed !== false && data.sourceSize ? data.sourceSize : data.frame;
        const orig = new Rectangle(0, 0, Math.floor(sourceSize.w) / this.resolution, Math.floor(sourceSize.h) / this.resolution);
        if (data.rotated) {
          frame = new Rectangle(Math.floor(rect.x) / this.resolution, Math.floor(rect.y) / this.resolution, Math.floor(rect.h) / this.resolution, Math.floor(rect.w) / this.resolution);
        } else {
          frame = new Rectangle(Math.floor(rect.x) / this.resolution, Math.floor(rect.y) / this.resolution, Math.floor(rect.w) / this.resolution, Math.floor(rect.h) / this.resolution);
        }
        if (data.trimmed !== false && data.spriteSourceSize) {
          trim = new Rectangle(Math.floor(data.spriteSourceSize.x) / this.resolution, Math.floor(data.spriteSourceSize.y) / this.resolution, Math.floor(rect.w) / this.resolution, Math.floor(rect.h) / this.resolution);
        }
        this.textures[i] = new Texture(this.baseTexture, frame, orig, trim, data.rotated ? 2 : 0, data.anchor);
        Texture.addToCache(this.textures[i], i);
      }
      frameIndex++;
    }
  }
  _processAnimations() {
    const animations = this.data.animations || {};
    for (const animName in animations) {
      this.animations[animName] = [];
      for (let i = 0; i < animations[animName].length; i++) {
        const frameName = animations[animName][i];
        this.animations[animName].push(this.textures[frameName]);
      }
    }
  }
  _parseComplete() {
    const callback = this._callback;
    this._callback = null;
    this._batchIndex = 0;
    callback.call(this, this.textures);
  }
  _nextBatch() {
    this._processFrames(this._batchIndex * _Spritesheet.BATCH_SIZE);
    this._batchIndex++;
    setTimeout(() => {
      if (this._batchIndex * _Spritesheet.BATCH_SIZE < this._frameKeys.length) {
        this._nextBatch();
      } else {
        this._processAnimations();
        this._parseComplete();
      }
    }, 0);
  }
  destroy(destroyBase = false) {
    for (const i in this.textures) {
      this.textures[i].destroy();
    }
    this._frames = null;
    this._frameKeys = null;
    this.data = null;
    this.textures = null;
    if (destroyBase) {
      this._texture?.destroy();
      this.baseTexture.destroy();
    }
    this._texture = null;
    this.baseTexture = null;
    this.linkedSheets = [];
  }
};
let Spritesheet = _Spritesheet;
Spritesheet.BATCH_SIZE = 1e3;

const validImages = ["jpg", "png", "jpeg", "avif", "webp"];
function getCacheableAssets(keys, asset, ignoreMultiPack) {
  const out = {};
  keys.forEach((key) => {
    out[key] = asset;
  });
  Object.keys(asset.textures).forEach((key) => {
    out[key] = asset.textures[key];
  });
  if (!ignoreMultiPack) {
    const basePath = path.dirname(keys[0]);
    asset.linkedSheets.forEach((item, i) => {
      const out2 = getCacheableAssets([`${basePath}/${asset.data.meta.related_multi_packs[i]}`], item, true);
      Object.assign(out, out2);
    });
  }
  return out;
}
const spritesheetAsset = {
  extension: ExtensionType.Asset,
  cache: {
    test: (asset) => asset instanceof Spritesheet,
    getCacheableAssets: (keys, asset) => getCacheableAssets(keys, asset, false)
  },
  resolver: {
    test: (value) => {
      const tempURL = value.split("?")[0];
      const split = tempURL.split(".");
      const extension = split.pop();
      const format = split.pop();
      return extension === "json" && validImages.includes(format);
    },
    parse: (value) => {
      const split = value.split(".");
      return {
        resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
        format: split[split.length - 2],
        src: value
      };
    }
  },
  loader: {
    extension: {
      type: ExtensionType.LoadParser,
      priority: LoaderParserPriority.Normal
    },
    async testParse(asset, options) {
      return path.extname(options.src).toLowerCase() === ".json" && !!asset.frames;
    },
    async parse(asset, options, loader) {
      let basePath = path.dirname(options.src);
      if (basePath && basePath.lastIndexOf("/") !== basePath.length - 1) {
        basePath += "/";
      }
      let imagePath = basePath + asset.meta.image;
      imagePath = copySearchParams(imagePath, options.src);
      const assets = await loader.load([imagePath]);
      const texture = assets[imagePath];
      const spritesheet = new Spritesheet(texture.baseTexture, asset, options.src);
      await spritesheet.parse();
      const multiPacks = asset?.meta?.related_multi_packs;
      if (Array.isArray(multiPacks)) {
        const promises = [];
        for (const item of multiPacks) {
          if (typeof item !== "string") {
            continue;
          }
          let itemUrl = basePath + item;
          if (options.data?.ignoreMultiPack) {
            continue;
          }
          itemUrl = copySearchParams(itemUrl, options.src);
          promises.push(loader.load({
            src: itemUrl,
            data: {
              ignoreMultiPack: true
            }
          }));
        }
        const res = await Promise.all(promises);
        spritesheet.linkedSheets = res;
        res.forEach((item) => {
          item.linkedSheets = [spritesheet].concat(spritesheet.linkedSheets.filter((sp) => sp !== item));
        });
      }
      return spritesheet;
    },
    unload(spritesheet) {
      spritesheet.destroy(true);
    }
  }
};
extensions$1.add(spritesheetAsset);

class BitmapFontData {
  constructor() {
    this.info = [];
    this.common = [];
    this.page = [];
    this.char = [];
    this.kerning = [];
    this.distanceField = [];
  }
}

class TextFormat {
  static test(data) {
    return typeof data === "string" && data.startsWith("info face=");
  }
  static parse(txt) {
    const items = txt.match(/^[a-z]+\s+.+$/gm);
    const rawData = {
      info: [],
      common: [],
      page: [],
      char: [],
      chars: [],
      kerning: [],
      kernings: [],
      distanceField: []
    };
    for (const i in items) {
      const name = items[i].match(/^[a-z]+/gm)[0];
      const attributeList = items[i].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm);
      const itemData = {};
      for (const i2 in attributeList) {
        const split = attributeList[i2].split("=");
        const key = split[0];
        const strValue = split[1].replace(/"/gm, "");
        const floatValue = parseFloat(strValue);
        const value = isNaN(floatValue) ? strValue : floatValue;
        itemData[key] = value;
      }
      rawData[name].push(itemData);
    }
    const font = new BitmapFontData();
    rawData.info.forEach((info) => font.info.push({
      face: info.face,
      size: parseInt(info.size, 10)
    }));
    rawData.common.forEach((common) => font.common.push({
      lineHeight: parseInt(common.lineHeight, 10)
    }));
    rawData.page.forEach((page) => font.page.push({
      id: parseInt(page.id, 10),
      file: page.file
    }));
    rawData.char.forEach((char) => font.char.push({
      id: parseInt(char.id, 10),
      page: parseInt(char.page, 10),
      x: parseInt(char.x, 10),
      y: parseInt(char.y, 10),
      width: parseInt(char.width, 10),
      height: parseInt(char.height, 10),
      xoffset: parseInt(char.xoffset, 10),
      yoffset: parseInt(char.yoffset, 10),
      xadvance: parseInt(char.xadvance, 10)
    }));
    rawData.kerning.forEach((kerning) => font.kerning.push({
      first: parseInt(kerning.first, 10),
      second: parseInt(kerning.second, 10),
      amount: parseInt(kerning.amount, 10)
    }));
    rawData.distanceField.forEach((df) => font.distanceField.push({
      distanceRange: parseInt(df.distanceRange, 10),
      fieldType: df.fieldType
    }));
    return font;
  }
}

class XMLFormat {
  static test(data) {
    const xml = data;
    return "getElementsByTagName" in xml && xml.getElementsByTagName("page").length && xml.getElementsByTagName("info")[0].getAttribute("face") !== null;
  }
  static parse(xml) {
    const data = new BitmapFontData();
    const info = xml.getElementsByTagName("info");
    const common = xml.getElementsByTagName("common");
    const page = xml.getElementsByTagName("page");
    const char = xml.getElementsByTagName("char");
    const kerning = xml.getElementsByTagName("kerning");
    const distanceField = xml.getElementsByTagName("distanceField");
    for (let i = 0; i < info.length; i++) {
      data.info.push({
        face: info[i].getAttribute("face"),
        size: parseInt(info[i].getAttribute("size"), 10)
      });
    }
    for (let i = 0; i < common.length; i++) {
      data.common.push({
        lineHeight: parseInt(common[i].getAttribute("lineHeight"), 10)
      });
    }
    for (let i = 0; i < page.length; i++) {
      data.page.push({
        id: parseInt(page[i].getAttribute("id"), 10) || 0,
        file: page[i].getAttribute("file")
      });
    }
    for (let i = 0; i < char.length; i++) {
      const letter = char[i];
      data.char.push({
        id: parseInt(letter.getAttribute("id"), 10),
        page: parseInt(letter.getAttribute("page"), 10) || 0,
        x: parseInt(letter.getAttribute("x"), 10),
        y: parseInt(letter.getAttribute("y"), 10),
        width: parseInt(letter.getAttribute("width"), 10),
        height: parseInt(letter.getAttribute("height"), 10),
        xoffset: parseInt(letter.getAttribute("xoffset"), 10),
        yoffset: parseInt(letter.getAttribute("yoffset"), 10),
        xadvance: parseInt(letter.getAttribute("xadvance"), 10)
      });
    }
    for (let i = 0; i < kerning.length; i++) {
      data.kerning.push({
        first: parseInt(kerning[i].getAttribute("first"), 10),
        second: parseInt(kerning[i].getAttribute("second"), 10),
        amount: parseInt(kerning[i].getAttribute("amount"), 10)
      });
    }
    for (let i = 0; i < distanceField.length; i++) {
      data.distanceField.push({
        fieldType: distanceField[i].getAttribute("fieldType"),
        distanceRange: parseInt(distanceField[i].getAttribute("distanceRange"), 10)
      });
    }
    return data;
  }
}

class XMLStringFormat {
  static test(data) {
    if (typeof data === "string" && data.includes("<font>")) {
      return XMLFormat.test(settings.ADAPTER.parseXML(data));
    }
    return false;
  }
  static parse(xmlTxt) {
    return XMLFormat.parse(settings.ADAPTER.parseXML(xmlTxt));
  }
}

const formats = [
  TextFormat,
  XMLFormat,
  XMLStringFormat
];
function autoDetectFormat(data) {
  for (let i = 0; i < formats.length; i++) {
    if (formats[i].test(data)) {
      return formats[i];
    }
  }
  return null;
}

function generateFillStyle(canvas, context, style, resolution, lines, metrics) {
  const fillStyle = style.fill;
  if (!Array.isArray(fillStyle)) {
    return fillStyle;
  } else if (fillStyle.length === 1) {
    return fillStyle[0];
  }
  let gradient;
  const dropShadowCorrection = style.dropShadow ? style.dropShadowDistance : 0;
  const padding = style.padding || 0;
  const width = canvas.width / resolution - dropShadowCorrection - padding * 2;
  const height = canvas.height / resolution - dropShadowCorrection - padding * 2;
  const fill = fillStyle.slice();
  const fillGradientStops = style.fillGradientStops.slice();
  if (!fillGradientStops.length) {
    const lengthPlus1 = fill.length + 1;
    for (let i = 1; i < lengthPlus1; ++i) {
      fillGradientStops.push(i / lengthPlus1);
    }
  }
  fill.unshift(fillStyle[0]);
  fillGradientStops.unshift(0);
  fill.push(fillStyle[fillStyle.length - 1]);
  fillGradientStops.push(1);
  if (style.fillGradientType === TEXT_GRADIENT.LINEAR_VERTICAL) {
    gradient = context.createLinearGradient(width / 2, padding, width / 2, height + padding);
    let lastIterationStop = 0;
    const textHeight = metrics.fontProperties.fontSize + style.strokeThickness;
    const gradStopLineHeight = textHeight / height;
    for (let i = 0; i < lines.length; i++) {
      const thisLineTop = metrics.lineHeight * i;
      for (let j = 0; j < fill.length; j++) {
        let lineStop = 0;
        if (typeof fillGradientStops[j] === "number") {
          lineStop = fillGradientStops[j];
        } else {
          lineStop = j / fill.length;
        }
        const globalStop = thisLineTop / height + lineStop * gradStopLineHeight;
        let clampedStop = Math.max(lastIterationStop, globalStop);
        clampedStop = Math.min(clampedStop, 1);
        gradient.addColorStop(clampedStop, fill[j]);
        lastIterationStop = clampedStop;
      }
    }
  } else {
    gradient = context.createLinearGradient(padding, height / 2, width + padding, height / 2);
    const totalIterations = fill.length + 1;
    let currentIteration = 1;
    for (let i = 0; i < fill.length; i++) {
      let stop;
      if (typeof fillGradientStops[i] === "number") {
        stop = fillGradientStops[i];
      } else {
        stop = currentIteration / totalIterations;
      }
      gradient.addColorStop(stop, fill[i]);
      currentIteration++;
    }
  }
  return gradient;
}

function drawGlyph(canvas, context, metrics, x, y, resolution, style) {
  const char = metrics.text;
  const fontProperties = metrics.fontProperties;
  context.translate(x, y);
  context.scale(resolution, resolution);
  const tx = style.strokeThickness / 2;
  const ty = -(style.strokeThickness / 2);
  context.font = style.toFontString();
  context.lineWidth = style.strokeThickness;
  context.textBaseline = style.textBaseline;
  context.lineJoin = style.lineJoin;
  context.miterLimit = style.miterLimit;
  context.fillStyle = generateFillStyle(canvas, context, style, resolution, [char], metrics);
  context.strokeStyle = style.stroke;
  if (style.dropShadow) {
    const dropShadowColor = style.dropShadowColor;
    const rgb = hex2rgb(typeof dropShadowColor === "number" ? dropShadowColor : string2hex(dropShadowColor));
    const dropShadowBlur = style.dropShadowBlur * resolution;
    const dropShadowDistance = style.dropShadowDistance * resolution;
    context.shadowColor = `rgba(${rgb[0] * 255},${rgb[1] * 255},${rgb[2] * 255},${style.dropShadowAlpha})`;
    context.shadowBlur = dropShadowBlur;
    context.shadowOffsetX = Math.cos(style.dropShadowAngle) * dropShadowDistance;
    context.shadowOffsetY = Math.sin(style.dropShadowAngle) * dropShadowDistance;
  } else {
    context.shadowColor = "black";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }
  if (style.stroke && style.strokeThickness) {
    context.strokeText(char, tx, ty + metrics.lineHeight - fontProperties.descent);
  }
  if (style.fill) {
    context.fillText(char, tx, ty + metrics.lineHeight - fontProperties.descent);
  }
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.fillStyle = "rgba(0, 0, 0, 0)";
}

function extractCharCode(str) {
  return str.codePointAt ? str.codePointAt(0) : str.charCodeAt(0);
}

function splitTextToCharacters(text) {
  return Array.from ? Array.from(text) : text.split("");
}

function resolveCharacters(chars) {
  if (typeof chars === "string") {
    chars = [chars];
  }
  const result = [];
  for (let i = 0, j = chars.length; i < j; i++) {
    const item = chars[i];
    if (Array.isArray(item)) {
      if (item.length !== 2) {
        throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${item.length}.`);
      }
      const startCode = item[0].charCodeAt(0);
      const endCode = item[1].charCodeAt(0);
      if (endCode < startCode) {
        throw new Error("[BitmapFont]: Invalid character range.");
      }
      for (let i2 = startCode, j2 = endCode; i2 <= j2; i2++) {
        result.push(String.fromCharCode(i2));
      }
    } else {
      result.push(...splitTextToCharacters(item));
    }
  }
  if (result.length === 0) {
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  }
  return result;
}

const _BitmapFont = class {
  constructor(data, textures, ownsTextures) {
    const [info] = data.info;
    const [common] = data.common;
    const [page] = data.page;
    const [distanceField] = data.distanceField;
    const res = getResolutionOfUrl(page.file);
    const pageTextures = {};
    this._ownsTextures = ownsTextures;
    this.font = info.face;
    this.size = info.size;
    this.lineHeight = common.lineHeight / res;
    this.chars = {};
    this.pageTextures = pageTextures;
    for (let i = 0; i < data.page.length; i++) {
      const { id, file } = data.page[i];
      pageTextures[id] = textures instanceof Array ? textures[i] : textures[file];
      if (distanceField?.fieldType && distanceField.fieldType !== "none") {
        pageTextures[id].baseTexture.alphaMode = ALPHA_MODES.NO_PREMULTIPLIED_ALPHA;
        pageTextures[id].baseTexture.mipmap = MIPMAP_MODES.OFF;
      }
    }
    for (let i = 0; i < data.char.length; i++) {
      const { id, page: page2 } = data.char[i];
      let { x, y, width, height, xoffset, yoffset, xadvance } = data.char[i];
      x /= res;
      y /= res;
      width /= res;
      height /= res;
      xoffset /= res;
      yoffset /= res;
      xadvance /= res;
      const rect = new Rectangle(x + pageTextures[page2].frame.x / res, y + pageTextures[page2].frame.y / res, width, height);
      this.chars[id] = {
        xOffset: xoffset,
        yOffset: yoffset,
        xAdvance: xadvance,
        kerning: {},
        texture: new Texture(pageTextures[page2].baseTexture, rect),
        page: page2
      };
    }
    for (let i = 0; i < data.kerning.length; i++) {
      let { first, second, amount } = data.kerning[i];
      first /= res;
      second /= res;
      amount /= res;
      if (this.chars[second]) {
        this.chars[second].kerning[first] = amount;
      }
    }
    this.distanceFieldRange = distanceField?.distanceRange;
    this.distanceFieldType = distanceField?.fieldType?.toLowerCase() ?? "none";
  }
  destroy() {
    for (const id in this.chars) {
      this.chars[id].texture.destroy();
      this.chars[id].texture = null;
    }
    for (const id in this.pageTextures) {
      if (this._ownsTextures) {
        this.pageTextures[id].destroy(true);
      }
      this.pageTextures[id] = null;
    }
    this.chars = null;
    this.pageTextures = null;
  }
  static install(data, textures, ownsTextures) {
    let fontData;
    if (data instanceof BitmapFontData) {
      fontData = data;
    } else {
      const format = autoDetectFormat(data);
      if (!format) {
        throw new Error("Unrecognized data format for font.");
      }
      fontData = format.parse(data);
    }
    if (textures instanceof Texture) {
      textures = [textures];
    }
    const font = new _BitmapFont(fontData, textures, ownsTextures);
    _BitmapFont.available[font.font] = font;
    return font;
  }
  static uninstall(name) {
    const font = _BitmapFont.available[name];
    if (!font) {
      throw new Error(`No font found named '${name}'`);
    }
    font.destroy();
    delete _BitmapFont.available[name];
  }
  static from(name, textStyle, options) {
    if (!name) {
      throw new Error("[BitmapFont] Property `name` is required.");
    }
    const {
      chars,
      padding,
      resolution,
      textureWidth,
      textureHeight,
      ...baseOptions
    } = Object.assign({}, _BitmapFont.defaultOptions, options);
    const charsList = resolveCharacters(chars);
    const style = textStyle instanceof TextStyle ? textStyle : new TextStyle(textStyle);
    const lineWidth = textureWidth;
    const fontData = new BitmapFontData();
    fontData.info[0] = {
      face: style.fontFamily,
      size: style.fontSize
    };
    fontData.common[0] = {
      lineHeight: style.fontSize
    };
    let positionX = 0;
    let positionY = 0;
    let canvas;
    let context;
    let baseTexture;
    let maxCharHeight = 0;
    const baseTextures = [];
    const textures = [];
    for (let i = 0; i < charsList.length; i++) {
      if (!canvas) {
        canvas = settings.ADAPTER.createCanvas();
        canvas.width = textureWidth;
        canvas.height = textureHeight;
        context = canvas.getContext("2d");
        baseTexture = new BaseTexture(canvas, { resolution, ...baseOptions });
        baseTextures.push(baseTexture);
        textures.push(new Texture(baseTexture));
        fontData.page.push({
          id: textures.length - 1,
          file: ""
        });
      }
      const character = charsList[i];
      const metrics = TextMetrics.measureText(character, style, false, canvas);
      const width = metrics.width;
      const height = Math.ceil(metrics.height);
      const textureGlyphWidth = Math.ceil((style.fontStyle === "italic" ? 2 : 1) * width);
      if (positionY >= textureHeight - height * resolution) {
        if (positionY === 0) {
          throw new Error(`[BitmapFont] textureHeight ${textureHeight}px is too small (fontFamily: '${style.fontFamily}', fontSize: ${style.fontSize}px, char: '${character}')`);
        }
        --i;
        canvas = null;
        context = null;
        baseTexture = null;
        positionY = 0;
        positionX = 0;
        maxCharHeight = 0;
        continue;
      }
      maxCharHeight = Math.max(height + metrics.fontProperties.descent, maxCharHeight);
      if (textureGlyphWidth * resolution + positionX >= lineWidth) {
        if (positionX === 0) {
          throw new Error(`[BitmapFont] textureWidth ${textureWidth}px is too small (fontFamily: '${style.fontFamily}', fontSize: ${style.fontSize}px, char: '${character}')`);
        }
        --i;
        positionY += maxCharHeight * resolution;
        positionY = Math.ceil(positionY);
        positionX = 0;
        maxCharHeight = 0;
        continue;
      }
      drawGlyph(canvas, context, metrics, positionX, positionY, resolution, style);
      const id = extractCharCode(metrics.text);
      fontData.char.push({
        id,
        page: textures.length - 1,
        x: positionX / resolution,
        y: positionY / resolution,
        width: textureGlyphWidth,
        height,
        xoffset: 0,
        yoffset: 0,
        xadvance: width - (style.dropShadow ? style.dropShadowDistance : 0) - (style.stroke ? style.strokeThickness : 0)
      });
      positionX += (textureGlyphWidth + 2 * padding) * resolution;
      positionX = Math.ceil(positionX);
    }
    for (let i = 0, len = charsList.length; i < len; i++) {
      const first = charsList[i];
      for (let j = 0; j < len; j++) {
        const second = charsList[j];
        const c1 = context.measureText(first).width;
        const c2 = context.measureText(second).width;
        const total = context.measureText(first + second).width;
        const amount = total - (c1 + c2);
        if (amount) {
          fontData.kerning.push({
            first: extractCharCode(first),
            second: extractCharCode(second),
            amount
          });
        }
      }
    }
    const font = new _BitmapFont(fontData, textures, true);
    if (_BitmapFont.available[name] !== void 0) {
      _BitmapFont.uninstall(name);
    }
    _BitmapFont.available[name] = font;
    return font;
  }
};
let BitmapFont = _BitmapFont;
BitmapFont.ALPHA = [["a", "z"], ["A", "Z"], " "];
BitmapFont.NUMERIC = [["0", "9"]];
BitmapFont.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "];
BitmapFont.ASCII = [[" ", "~"]];
BitmapFont.defaultOptions = {
  resolution: 1,
  textureWidth: 512,
  textureHeight: 512,
  padding: 4,
  chars: _BitmapFont.ALPHANUMERIC
};
BitmapFont.available = {};

var msdfFrag = "// Pixi texture info\r\nvarying vec2 vTextureCoord;\r\nuniform sampler2D uSampler;\r\n\r\n// Tint\r\nuniform vec4 uColor;\r\n\r\n// on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange\r\nuniform float uFWidth;\r\n\r\nvoid main(void) {\r\n\r\n  // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\r\n  vec4 texColor = texture2D(uSampler, vTextureCoord);\r\n\r\n  // MSDF\r\n  float median = texColor.r + texColor.g + texColor.b -\r\n                  min(texColor.r, min(texColor.g, texColor.b)) -\r\n                  max(texColor.r, max(texColor.g, texColor.b));\r\n  // SDF\r\n  median = min(median, texColor.a);\r\n\r\n  float screenPxDistance = uFWidth * (median - 0.5);\r\n  float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\r\n  if (median < 0.01) {\r\n    alpha = 0.0;\r\n  } else if (median > 0.99) {\r\n    alpha = 1.0;\r\n  }\r\n\r\n  // NPM Textures, NPM outputs\r\n  gl_FragColor = vec4(uColor.rgb, uColor.a * alpha);\r\n\r\n}\r\n";

var msdfVert = "// Mesh material default fragment\r\nattribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\n\r\nuniform mat3 projectionMatrix;\r\nuniform mat3 translationMatrix;\r\nuniform mat3 uTextureMatrix;\r\n\r\nvarying vec2 vTextureCoord;\r\n\r\nvoid main(void)\r\n{\r\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r\n\r\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\r\n}\r\n";

const pageMeshDataDefaultPageMeshData = [];
const pageMeshDataMSDFPageMeshData = [];
const charRenderDataPool = [];
const _BitmapText = class extends Container {
  constructor(text, style = {}) {
    super();
    this._tint = 16777215;
    const { align, tint, maxWidth, letterSpacing, fontName, fontSize } = Object.assign({}, _BitmapText.styleDefaults, style);
    if (!BitmapFont.available[fontName]) {
      throw new Error(`Missing BitmapFont "${fontName}"`);
    }
    this._activePagesMeshData = [];
    this._textWidth = 0;
    this._textHeight = 0;
    this._align = align;
    this._tint = tint;
    this._font = void 0;
    this._fontName = fontName;
    this._fontSize = fontSize;
    this.text = text;
    this._maxWidth = maxWidth;
    this._maxLineHeight = 0;
    this._letterSpacing = letterSpacing;
    this._anchor = new ObservablePoint(() => {
      this.dirty = true;
    }, this, 0, 0);
    this._roundPixels = settings.ROUND_PIXELS;
    this.dirty = true;
    this._resolution = settings.RESOLUTION;
    this._autoResolution = true;
    this._textureCache = {};
  }
  updateText() {
    const data = BitmapFont.available[this._fontName];
    const fontSize = this.fontSize;
    const scale = fontSize / data.size;
    const pos = new Point();
    const chars = [];
    const lineWidths = [];
    const lineSpaces = [];
    const text = this._text.replace(/(?:\r\n|\r)/g, "\n") || " ";
    const charsInput = splitTextToCharacters(text);
    const maxWidth = this._maxWidth * data.size / fontSize;
    const pageMeshDataPool = data.distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData;
    let prevCharCode = null;
    let lastLineWidth = 0;
    let maxLineWidth = 0;
    let line = 0;
    let lastBreakPos = -1;
    let lastBreakWidth = 0;
    let spacesRemoved = 0;
    let maxLineHeight = 0;
    let spaceCount = 0;
    for (let i = 0; i < charsInput.length; i++) {
      const char = charsInput[i];
      const charCode = extractCharCode(char);
      if (/(?:\s)/.test(char)) {
        lastBreakPos = i;
        lastBreakWidth = lastLineWidth;
        spaceCount++;
      }
      if (char === "\r" || char === "\n") {
        lineWidths.push(lastLineWidth);
        lineSpaces.push(-1);
        maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
        ++line;
        ++spacesRemoved;
        pos.x = 0;
        pos.y += data.lineHeight;
        prevCharCode = null;
        spaceCount = 0;
        continue;
      }
      const charData = data.chars[charCode];
      if (!charData) {
        continue;
      }
      if (prevCharCode && charData.kerning[prevCharCode]) {
        pos.x += charData.kerning[prevCharCode];
      }
      const charRenderData = charRenderDataPool.pop() || {
        texture: Texture.EMPTY,
        line: 0,
        charCode: 0,
        prevSpaces: 0,
        position: new Point()
      };
      charRenderData.texture = charData.texture;
      charRenderData.line = line;
      charRenderData.charCode = charCode;
      charRenderData.position.x = Math.round(pos.x + charData.xOffset + this._letterSpacing / 2);
      charRenderData.position.y = Math.round(pos.y + charData.yOffset);
      charRenderData.prevSpaces = spaceCount;
      chars.push(charRenderData);
      lastLineWidth = charRenderData.position.x + Math.max(charData.xAdvance - charData.xOffset, charData.texture.orig.width);
      pos.x += charData.xAdvance + this._letterSpacing;
      maxLineHeight = Math.max(maxLineHeight, charData.yOffset + charData.texture.height);
      prevCharCode = charCode;
      if (lastBreakPos !== -1 && maxWidth > 0 && pos.x > maxWidth) {
        ++spacesRemoved;
        removeItems(chars, 1 + lastBreakPos - spacesRemoved, 1 + i - lastBreakPos);
        i = lastBreakPos;
        lastBreakPos = -1;
        lineWidths.push(lastBreakWidth);
        lineSpaces.push(chars.length > 0 ? chars[chars.length - 1].prevSpaces : 0);
        maxLineWidth = Math.max(maxLineWidth, lastBreakWidth);
        line++;
        pos.x = 0;
        pos.y += data.lineHeight;
        prevCharCode = null;
        spaceCount = 0;
      }
    }
    const lastChar = charsInput[charsInput.length - 1];
    if (lastChar !== "\r" && lastChar !== "\n") {
      if (/(?:\s)/.test(lastChar)) {
        lastLineWidth = lastBreakWidth;
      }
      lineWidths.push(lastLineWidth);
      maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
      lineSpaces.push(-1);
    }
    const lineAlignOffsets = [];
    for (let i = 0; i <= line; i++) {
      let alignOffset = 0;
      if (this._align === "right") {
        alignOffset = maxLineWidth - lineWidths[i];
      } else if (this._align === "center") {
        alignOffset = (maxLineWidth - lineWidths[i]) / 2;
      } else if (this._align === "justify") {
        alignOffset = lineSpaces[i] < 0 ? 0 : (maxLineWidth - lineWidths[i]) / lineSpaces[i];
      }
      lineAlignOffsets.push(alignOffset);
    }
    const lenChars = chars.length;
    const pagesMeshData = {};
    const newPagesMeshData = [];
    const activePagesMeshData = this._activePagesMeshData;
    pageMeshDataPool.push(...activePagesMeshData);
    for (let i = 0; i < lenChars; i++) {
      const texture = chars[i].texture;
      const baseTextureUid = texture.baseTexture.uid;
      if (!pagesMeshData[baseTextureUid]) {
        let pageMeshData = pageMeshDataPool.pop();
        if (!pageMeshData) {
          const geometry = new MeshGeometry();
          let material;
          let meshBlendMode;
          if (data.distanceFieldType === "none") {
            material = new MeshMaterial(Texture.EMPTY);
            meshBlendMode = BLEND_MODES.NORMAL;
          } else {
            material = new MeshMaterial(Texture.EMPTY, { program: Program.from(msdfVert, msdfFrag), uniforms: { uFWidth: 0 } });
            meshBlendMode = BLEND_MODES.NORMAL_NPM;
          }
          const mesh = new Mesh(geometry, material);
          mesh.blendMode = meshBlendMode;
          pageMeshData = {
            index: 0,
            indexCount: 0,
            vertexCount: 0,
            uvsCount: 0,
            total: 0,
            mesh,
            vertices: null,
            uvs: null,
            indices: null
          };
        }
        pageMeshData.index = 0;
        pageMeshData.indexCount = 0;
        pageMeshData.vertexCount = 0;
        pageMeshData.uvsCount = 0;
        pageMeshData.total = 0;
        const { _textureCache } = this;
        _textureCache[baseTextureUid] = _textureCache[baseTextureUid] || new Texture(texture.baseTexture);
        pageMeshData.mesh.texture = _textureCache[baseTextureUid];
        pageMeshData.mesh.tint = this._tint;
        newPagesMeshData.push(pageMeshData);
        pagesMeshData[baseTextureUid] = pageMeshData;
      }
      pagesMeshData[baseTextureUid].total++;
    }
    for (let i = 0; i < activePagesMeshData.length; i++) {
      if (!newPagesMeshData.includes(activePagesMeshData[i])) {
        this.removeChild(activePagesMeshData[i].mesh);
      }
    }
    for (let i = 0; i < newPagesMeshData.length; i++) {
      if (newPagesMeshData[i].mesh.parent !== this) {
        this.addChild(newPagesMeshData[i].mesh);
      }
    }
    this._activePagesMeshData = newPagesMeshData;
    for (const i in pagesMeshData) {
      const pageMeshData = pagesMeshData[i];
      const total = pageMeshData.total;
      if (!(pageMeshData.indices?.length > 6 * total) || pageMeshData.vertices.length < Mesh.BATCHABLE_SIZE * 2) {
        pageMeshData.vertices = new Float32Array(4 * 2 * total);
        pageMeshData.uvs = new Float32Array(4 * 2 * total);
        pageMeshData.indices = new Uint16Array(6 * total);
      } else {
        const total2 = pageMeshData.total;
        const vertices = pageMeshData.vertices;
        for (let i2 = total2 * 4 * 2; i2 < vertices.length; i2++) {
          vertices[i2] = 0;
        }
      }
      pageMeshData.mesh.size = 6 * total;
    }
    for (let i = 0; i < lenChars; i++) {
      const char = chars[i];
      let offset = char.position.x + lineAlignOffsets[char.line] * (this._align === "justify" ? char.prevSpaces : 1);
      if (this._roundPixels) {
        offset = Math.round(offset);
      }
      const xPos = offset * scale;
      const yPos = char.position.y * scale;
      const texture = char.texture;
      const pageMesh = pagesMeshData[texture.baseTexture.uid];
      const textureFrame = texture.frame;
      const textureUvs = texture._uvs;
      const index = pageMesh.index++;
      pageMesh.indices[index * 6 + 0] = 0 + index * 4;
      pageMesh.indices[index * 6 + 1] = 1 + index * 4;
      pageMesh.indices[index * 6 + 2] = 2 + index * 4;
      pageMesh.indices[index * 6 + 3] = 0 + index * 4;
      pageMesh.indices[index * 6 + 4] = 2 + index * 4;
      pageMesh.indices[index * 6 + 5] = 3 + index * 4;
      pageMesh.vertices[index * 8 + 0] = xPos;
      pageMesh.vertices[index * 8 + 1] = yPos;
      pageMesh.vertices[index * 8 + 2] = xPos + textureFrame.width * scale;
      pageMesh.vertices[index * 8 + 3] = yPos;
      pageMesh.vertices[index * 8 + 4] = xPos + textureFrame.width * scale;
      pageMesh.vertices[index * 8 + 5] = yPos + textureFrame.height * scale;
      pageMesh.vertices[index * 8 + 6] = xPos;
      pageMesh.vertices[index * 8 + 7] = yPos + textureFrame.height * scale;
      pageMesh.uvs[index * 8 + 0] = textureUvs.x0;
      pageMesh.uvs[index * 8 + 1] = textureUvs.y0;
      pageMesh.uvs[index * 8 + 2] = textureUvs.x1;
      pageMesh.uvs[index * 8 + 3] = textureUvs.y1;
      pageMesh.uvs[index * 8 + 4] = textureUvs.x2;
      pageMesh.uvs[index * 8 + 5] = textureUvs.y2;
      pageMesh.uvs[index * 8 + 6] = textureUvs.x3;
      pageMesh.uvs[index * 8 + 7] = textureUvs.y3;
    }
    this._textWidth = maxLineWidth * scale;
    this._textHeight = (pos.y + data.lineHeight) * scale;
    for (const i in pagesMeshData) {
      const pageMeshData = pagesMeshData[i];
      if (this.anchor.x !== 0 || this.anchor.y !== 0) {
        let vertexCount = 0;
        const anchorOffsetX = this._textWidth * this.anchor.x;
        const anchorOffsetY = this._textHeight * this.anchor.y;
        for (let i2 = 0; i2 < pageMeshData.total; i2++) {
          pageMeshData.vertices[vertexCount++] -= anchorOffsetX;
          pageMeshData.vertices[vertexCount++] -= anchorOffsetY;
          pageMeshData.vertices[vertexCount++] -= anchorOffsetX;
          pageMeshData.vertices[vertexCount++] -= anchorOffsetY;
          pageMeshData.vertices[vertexCount++] -= anchorOffsetX;
          pageMeshData.vertices[vertexCount++] -= anchorOffsetY;
          pageMeshData.vertices[vertexCount++] -= anchorOffsetX;
          pageMeshData.vertices[vertexCount++] -= anchorOffsetY;
        }
      }
      this._maxLineHeight = maxLineHeight * scale;
      const vertexBuffer = pageMeshData.mesh.geometry.getBuffer("aVertexPosition");
      const textureBuffer = pageMeshData.mesh.geometry.getBuffer("aTextureCoord");
      const indexBuffer = pageMeshData.mesh.geometry.getIndex();
      vertexBuffer.data = pageMeshData.vertices;
      textureBuffer.data = pageMeshData.uvs;
      indexBuffer.data = pageMeshData.indices;
      vertexBuffer.update();
      textureBuffer.update();
      indexBuffer.update();
    }
    for (let i = 0; i < chars.length; i++) {
      charRenderDataPool.push(chars[i]);
    }
    this._font = data;
    this.dirty = false;
  }
  updateTransform() {
    this.validate();
    this.containerUpdateTransform();
  }
  _render(renderer) {
    if (this._autoResolution && this._resolution !== renderer.resolution) {
      this._resolution = renderer.resolution;
      this.dirty = true;
    }
    const { distanceFieldRange, distanceFieldType, size } = BitmapFont.available[this._fontName];
    if (distanceFieldType !== "none") {
      const { a, b, c, d } = this.worldTransform;
      const dx = Math.sqrt(a * a + b * b);
      const dy = Math.sqrt(c * c + d * d);
      const worldScale = (Math.abs(dx) + Math.abs(dy)) / 2;
      const fontScale = this.fontSize / size;
      const resolution = renderer._view.resolution;
      for (const mesh of this._activePagesMeshData) {
        mesh.mesh.shader.uniforms.uFWidth = worldScale * distanceFieldRange * fontScale * resolution;
      }
    }
    super._render(renderer);
  }
  getLocalBounds() {
    this.validate();
    return super.getLocalBounds();
  }
  validate() {
    const font = BitmapFont.available[this._fontName];
    if (!font) {
      throw new Error(`Missing BitmapFont "${this._fontName}"`);
    }
    if (this._font !== font) {
      this.dirty = true;
    }
    if (this.dirty) {
      this.updateText();
    }
  }
  get tint() {
    return this._tint;
  }
  set tint(value) {
    if (this._tint === value)
      return;
    this._tint = value;
    for (let i = 0; i < this._activePagesMeshData.length; i++) {
      this._activePagesMeshData[i].mesh.tint = value;
    }
  }
  get align() {
    return this._align;
  }
  set align(value) {
    if (this._align !== value) {
      this._align = value;
      this.dirty = true;
    }
  }
  get fontName() {
    return this._fontName;
  }
  set fontName(value) {
    if (!BitmapFont.available[value]) {
      throw new Error(`Missing BitmapFont "${value}"`);
    }
    if (this._fontName !== value) {
      this._fontName = value;
      this.dirty = true;
    }
  }
  get fontSize() {
    return this._fontSize ?? BitmapFont.available[this._fontName].size;
  }
  set fontSize(value) {
    if (this._fontSize !== value) {
      this._fontSize = value;
      this.dirty = true;
    }
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(value) {
    if (typeof value === "number") {
      this._anchor.set(value);
    } else {
      this._anchor.copyFrom(value);
    }
  }
  get text() {
    return this._text;
  }
  set text(text) {
    text = String(text === null || text === void 0 ? "" : text);
    if (this._text === text) {
      return;
    }
    this._text = text;
    this.dirty = true;
  }
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(value) {
    if (this._maxWidth === value) {
      return;
    }
    this._maxWidth = value;
    this.dirty = true;
  }
  get maxLineHeight() {
    this.validate();
    return this._maxLineHeight;
  }
  get textWidth() {
    this.validate();
    return this._textWidth;
  }
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(value) {
    if (this._letterSpacing !== value) {
      this._letterSpacing = value;
      this.dirty = true;
    }
  }
  get roundPixels() {
    return this._roundPixels;
  }
  set roundPixels(value) {
    if (value !== this._roundPixels) {
      this._roundPixels = value;
      this.dirty = true;
    }
  }
  get textHeight() {
    this.validate();
    return this._textHeight;
  }
  get resolution() {
    return this._resolution;
  }
  set resolution(value) {
    this._autoResolution = false;
    if (this._resolution === value) {
      return;
    }
    this._resolution = value;
    this.dirty = true;
  }
  destroy(options) {
    const { _textureCache } = this;
    const data = BitmapFont.available[this._fontName];
    const pageMeshDataPool = data.distanceFieldType === "none" ? pageMeshDataDefaultPageMeshData : pageMeshDataMSDFPageMeshData;
    pageMeshDataPool.push(...this._activePagesMeshData);
    for (const pageMeshData of this._activePagesMeshData) {
      this.removeChild(pageMeshData.mesh);
    }
    this._activePagesMeshData = [];
    pageMeshDataPool.filter((page) => _textureCache[page.mesh.texture.baseTexture.uid]).forEach((page) => {
      page.mesh.texture = Texture.EMPTY;
    });
    for (const id in _textureCache) {
      const texture = _textureCache[id];
      texture.destroy();
      delete _textureCache[id];
    }
    this._font = null;
    this._textureCache = null;
    super.destroy(options);
  }
};
let BitmapText = _BitmapText;
BitmapText.styleDefaults = {
  align: "left",
  tint: 16777215,
  maxWidth: 0,
  letterSpacing: 0
};

const validExtensions = [".xml", ".fnt"];
const loadBitmapFont = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Normal
  },
  test(url) {
    return validExtensions.includes(path.extname(url).toLowerCase());
  },
  async testParse(data) {
    return TextFormat.test(data) || XMLStringFormat.test(data);
  },
  async parse(asset, data, loader) {
    const fontData = TextFormat.test(asset) ? TextFormat.parse(asset) : XMLStringFormat.parse(asset);
    const { src } = data;
    const { page: pages } = fontData;
    const textureUrls = [];
    for (let i = 0; i < pages.length; ++i) {
      const pageFile = pages[i].file;
      let imagePath = path.join(path.dirname(src), pageFile);
      imagePath = copySearchParams(imagePath, src);
      textureUrls.push(imagePath);
    }
    const loadedTextures = await loader.load(textureUrls);
    const textures = textureUrls.map((url) => loadedTextures[url]);
    return BitmapFont.install(fontData, textures, true);
  },
  async load(url, _options) {
    const response = await settings.ADAPTER.fetch(url);
    return response.text();
  },
  unload(bitmapFont) {
    bitmapFont.destroy();
  }
};
extensions$1.add(loadBitmapFont);

export { ALPHA_MODES, AbstractMultiResource, AccessibilityManager, AlphaFilter, AnimatedSprite, Application, ArrayResource, Assets, AssetsClass, Attribute, BLEND_MODES, BUFFER_BITS, BUFFER_TYPE, BackgroundSystem, BaseImageResource, BasePrepare, BaseRenderTexture, BaseTexture, BatchDrawCall, BatchGeometry, BatchRenderer, BatchShaderGenerator, BatchSystem, BatchTextureArray, BitmapFont, BitmapFontData, BitmapText, BlobResource, BlurFilter, BlurFilterPass, Bounds, BrowserAdapter, Buffer, BufferResource, BufferSystem, CLEAR_MODES, COLOR_MASK_BITS, Cache, CanvasResource, Circle, ColorMatrixFilter, CompressedTextureResource, Container, ContextSystem, CountLimiter, CubeResource, DEG_TO_RAD, DRAW_MODES, DisplacementFilter, DisplayObject, ENV, Ellipse, EventBoundary, EventSystem, ExtensionType, Extract, FORMATS, FORMATS_TO_COMPONENTS, FXAAFilter, FederatedDisplayObject, FederatedEvent, FederatedMouseEvent, FederatedPointerEvent, FederatedWheelEvent, FillStyle, Filter, FilterState, FilterSystem, Framebuffer, FramebufferSystem, GC_MODES, GLFramebuffer, GLProgram, GLTexture, GRAPHICS_CURVES, GenerateTextureSystem, Geometry, GeometrySystem, Graphics, GraphicsData, GraphicsGeometry, IGLUniformData, INSTALLED, INTERNAL_FORMATS, INTERNAL_FORMAT_TO_BYTES_PER_PIXEL, ImageBitmapResource, ImageResource, LINE_CAP, LINE_JOIN, LineStyle, LoaderParserPriority, MASK_TYPES, MIPMAP_MODES, MSAA_QUALITY, MaskData, MaskSystem, Matrix, Mesh, MeshBatchUvs, MeshGeometry, MeshMaterial, MultisampleSystem, NineSlicePlane, NoiseFilter, ObjectRenderer, ObjectRendererSystem, ObservablePoint, PI_2, PRECISION, ParticleContainer, ParticleRenderer, PlaneGeometry, PluginSystem, Point, Polygon, Prepare, Program, ProjectionSystem, Quad, QuadUv, RAD_TO_DEG, RENDERER_TYPE, Rectangle, RenderTexture, RenderTexturePool, RenderTextureSystem, Renderer, ResizePlugin, Resource, RopeGeometry, RoundedRectangle, Runner, SAMPLER_TYPES, SCALE_MODES, SHAPES, SVGResource, ScissorSystem, Shader, ShaderSystem, SimpleMesh, SimplePlane, SimpleRope, Sprite, SpriteMaskFilter, Spritesheet, StartupSystem, State, StateSystem, StencilSystem, SystemManager, TARGETS, TEXT_GRADIENT, TYPES, TYPES_TO_BYTES_PER_COMPONENT, TYPES_TO_BYTES_PER_PIXEL, TemporaryDisplayObject, Text, TextFormat, TextMetrics, TextStyle, Texture, TextureGCSystem, TextureMatrix, TextureSystem, TextureUvs, Ticker, TickerPlugin, TilingSprite, TilingSpriteRenderer, TimeLimiter, Transform, TransformFeedback, TransformFeedbackSystem, UPDATE_PRIORITY, UniformGroup, VERSION, VideoResource, ViewSystem, ViewableBuffer, WRAP_MODES, XMLFormat, XMLStringFormat, accessibleTarget, autoDetectFormat, autoDetectRenderer, autoDetectResource, cacheTextureArray, checkDataUrl, checkExtension, checkMaxIfStatementsInShader, convertToList, copySearchParams, createStringVariations, createTexture, createUBOElements, curves, defaultFilterVertex, defaultVertex, detectAvif, detectCompressedTextures, detectDefaults, detectWebp, extensions$1 as extensions, filters, generateProgram, generateUniformBufferSync, getFontFamilyName, getTestContext, getUBOData, graphicsUtils, groupD8, isMobile, isSingleItem, loadBitmapFont, loadDDS, loadImageBitmap, loadJson, loadKTX, loadSVG, loadTextures, loadTxt, loadWebFont, parseDDS, parseKTX, resolveCompressedTextureUrl, resolveTextureUrl, settings, spritesheetAsset, uniformParsers, unsafeEvalSupported, index as utils };
//# sourceMappingURL=pixi.mjs.map
