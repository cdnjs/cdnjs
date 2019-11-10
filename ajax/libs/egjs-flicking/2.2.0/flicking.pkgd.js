/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/flicking project is licensed under the MIT <https://naver.github.io/egjs/license.txt> license
 * 
 * @egjs/flicking JavaScript library
 * https://github.com/naver/egjs-flicking
 * 
 * @version 2.2.0
 * 
 * All-in-one packaged file for ease use of '@egjs/flicking' with below dependencies.
 * NOTE: This is not an official distribution file and is only for user convenience.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Flicking", [], factory);
	else if(typeof exports === 'object')
		exports["Flicking"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Flicking"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function toArray(nodes) {
    // const el = Array.prototype.slice.call(nodes);
    // for IE8
    var el = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
        el.push(nodes[i]);
    }
    return el;
}
exports.toArray = toArray;
function $(param, multi) {
    if (multi === void 0) { multi = false; }
    var el;
    if (typeof param === "string") {
        // check if string is HTML tag format
        var match = param.match(/^<([a-z]+)\s*([^>]*)>/);
        // creating element
        if (match) {
            var dummy = document.createElement("div");
            dummy.innerHTML = param;
            el = toArray(dummy.childNodes);
        }
        else {
            el = toArray(document.querySelectorAll(param));
        }
        if (!multi) {
            el = el.length >= 1 ? el[0] : undefined;
        }
    }
    else if (param === window) {
        el = param;
    }
    else if (param.nodeName &&
        (param.nodeType === 1 || param.nodeType === 9)) {
        el = param;
    }
    else if (("jQuery" in window && param instanceof jQuery) ||
        param.constructor.prototype.jquery) {
        el = multi ? param.toArray() : param.get(0);
    }
    else if (Array.isArray(param)) {
        el = param.map(function (v) { return $(v); });
        if (!multi) {
            el = el.length >= 1 ? el[0] : undefined;
        }
    }
    return el;
}
exports.$ = $;
var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
var caf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
if (raf && !caf) {
    var keyInfo_1 = {};
    var oldraf_1 = raf;
    raf = function (callback) {
        function wrapCallback(timestamp) {
            if (keyInfo_1[key]) {
                callback(timestamp);
            }
        }
        var key = oldraf_1(wrapCallback);
        keyInfo_1[key] = true;
        return key;
    };
    caf = function (key) {
        delete keyInfo_1[key];
    };
}
else if (!(raf && caf)) {
    raf = function (callback) {
        return window.setTimeout(function () {
            callback(window.performance && window.performance.now && window.performance.now() || new Date().getTime());
        }, 16);
    };
    caf = window.clearTimeout;
}
/**
 * A polyfill for the window.requestAnimationFrame() method.
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * @private
 */
function requestAnimationFrame(fp) {
    return raf(fp);
}
exports.requestAnimationFrame = requestAnimationFrame;
;
/**
* A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
* @param {Number} key −	The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드가 반환한 아이디 값</ko>
* @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
* @private
*/
function cancelAnimationFrame(key) {
    caf(key);
}
exports.cancelAnimationFrame = cancelAnimationFrame;
;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Hammer = __webpack_require__(4);
exports.SUPPORT_POINTER_EVENTS = "PointerEvent" in window || "MSPointerEvent" in window;
exports.SUPPORT_TOUCH = "ontouchstart" in window;
exports.UNIQUEKEY = "_EGJS_AXES_INPUTTYPE_";
function toAxis(source, offset) {
    return offset.reduce(function (acc, v, i) {
        if (source[i]) {
            acc[source[i]] = v;
        }
        return acc;
    }, {});
}
exports.toAxis = toAxis;
;
function createHammer(element, options) {
    try {
        // create Hammer
        return new Hammer.Manager(element, __assign({}, options));
    }
    catch (e) {
        return null;
    }
}
exports.createHammer = createHammer;
;
function convertInputType(inputType) {
    if (inputType === void 0) { inputType = []; }
    var hasTouch = false;
    var hasMouse = false;
    var hasPointer = false;
    inputType.forEach(function (v) {
        switch (v) {
            case "mouse":
                hasMouse = true;
                break;
            case "touch":
                hasTouch = exports.SUPPORT_TOUCH;
                break;
            case "pointer": hasPointer = exports.SUPPORT_POINTER_EVENTS;
        }
    });
    if (hasPointer) {
        return Hammer.PointerEventInput;
    }
    else if (hasTouch && hasMouse) {
        return Hammer.TouchMouseInput;
    }
    else if (hasTouch) {
        return Hammer.TouchInput;
    }
    else if (hasMouse) {
        return Hammer.MouseInput;
    }
    return null;
}
exports.convertInputType = convertInputType;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Coordinate = {
    getInsidePosition: function (destPos, range, circular, bounce) {
        var toDestPos = destPos;
        var targetRange = [
            circular[0] ? range[0] : (bounce ? range[0] - bounce[0] : range[0]),
            circular[1] ? range[1] : (bounce ? range[1] + bounce[1] : range[1])
        ];
        toDestPos = Math.max(targetRange[0], toDestPos);
        toDestPos = Math.min(targetRange[1], toDestPos);
        return +toDestPos.toFixed(5);
    },
    // determine outside
    isOutside: function (pos, range) {
        return pos < range[0] || pos > range[1];
    },
    getDuration: function (distance, deceleration) {
        var duration = Math.sqrt(distance / deceleration * 2);
        // when duration is under 100, then value is zero
        return duration < 100 ? 0 : duration;
    },
    isCircularable: function (destPos, range, circular) {
        return (circular[1] && destPos > range[1]) ||
            (circular[0] && destPos < range[0]);
    },
    getCirculatedPos: function (pos, range, circular) {
        var toPos = pos;
        var min = range[0];
        var max = range[1];
        var length = max - min;
        if (circular[1] && pos > max) {
            toPos = (toPos - max) % length + min;
        }
        if (circular[0] && pos < min) {
            toPos = (toPos - min) % length + max;
        }
        return +toPos.toFixed(5);
    }
};
exports["default"] = Coordinate;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Coordinate_1 = __webpack_require__(2);
;
var AxisManager = /** @class */ (function () {
    function AxisManager(axis, options) {
        var _this = this;
        this.axis = axis;
        this.options = options;
        this._complementOptions();
        this._pos = Object.keys(this.axis).reduce(function (acc, v) {
            acc[v] = _this.axis[v].range[0];
            return acc;
        }, {});
    }
    AxisManager.equal = function (target, base) {
        for (var k in target) {
            if (target[k] !== base[k]) {
                return false;
            }
        }
        return true;
    };
    /**
       * set up 'css' expression
       * @private
       */
    AxisManager.prototype._complementOptions = function () {
        var _this = this;
        Object.keys(this.axis).forEach(function (axis) {
            _this.axis[axis] = __assign({
                range: [0, 100],
                bounce: [0, 0],
                circular: [false, false]
            }, _this.axis[axis]);
            ["bounce", "circular"].forEach(function (v) {
                var axisOption = _this.axis;
                var key = axisOption[axis][v];
                if (/string|number|boolean/.test(typeof key)) {
                    axisOption[axis][v] = [key, key];
                }
            });
        });
    };
    AxisManager.prototype.getDelta = function (depaPos, destPos) {
        var fullDepaPos = this.get(depaPos);
        return this.map(this.get(destPos), function (v, k) { return v - fullDepaPos[k]; });
    };
    AxisManager.prototype.get = function (axes) {
        var _this = this;
        if (axes && Array.isArray(axes)) {
            return axes.reduce(function (acc, v) {
                if (v && (v in _this._pos)) {
                    acc[v] = _this._pos[v];
                }
                return acc;
            }, {});
        }
        else {
            return __assign({}, this._pos, (axes || {}));
        }
    };
    AxisManager.prototype.moveTo = function (pos) {
        var _this = this;
        var delta = this.map(this._pos, function (v, key) {
            return pos[key] ? pos[key] - _this._pos[key] : 0;
        });
        this.set(pos);
        return {
            pos: __assign({}, this._pos),
            delta: delta
        };
    };
    AxisManager.prototype.set = function (pos) {
        for (var k in pos) {
            if (k && (k in this._pos)) {
                this._pos[k] = pos[k];
            }
        }
    };
    AxisManager.prototype.every = function (pos, callback) {
        var axisOptions = this.axis;
        for (var k in pos) {
            if (k) {
                if (!callback(pos[k], k, axisOptions[k])) {
                    return false;
                }
            }
        }
        return true;
    };
    AxisManager.prototype.filter = function (pos, callback) {
        var filtered = {};
        var axisOptions = this.axis;
        for (var k in pos) {
            if (k) {
                callback(pos[k], k, axisOptions[k]) && (filtered[k] = pos[k]);
            }
        }
        return filtered;
    };
    AxisManager.prototype.map = function (pos, callback) {
        var tranformed = {};
        var axisOptions = this.axis;
        for (var k in pos) {
            if (k) {
                tranformed[k] = callback(pos[k], k, axisOptions[k]);
            }
        }
        return tranformed;
    };
    AxisManager.prototype.isOutside = function (axes) {
        return !this.every(axes ? this.get(axes) : this._pos, function (v, k, opt) { return !Coordinate_1["default"].isOutside(v, opt.range); });
    };
    return AxisManager;
}());
exports.AxisManager = AxisManager;
;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable no-new-func, no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && (self.Math === Math ? self : Function("return this")());
/* eslint-enable no-new-func, no-nested-ternary */

var document = win.document;

exports.window = win;
exports.document = document;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/component project is licensed under the MIT license
 * 
 * @egjs/component JavaScript library
 * http://naver.github.io/egjs/component
 * 
 * @version 2.1.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Component"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Component = __webpack_require__(1);

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Component2["default"].VERSION = "2.1.0";
module.exports = _Component2["default"];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A class used to manage events and options in a component
 * @ko 컴포넌트의 이벤트와 옵션을 관리할 수 있게 하는 클래스
 * @alias eg.Component
 */
var Component = function () {
	/**
  * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
  */
	function Component() {
		_classCallCheck(this, Component);

		this._eventHandler = {};
		this.options = {};
	}
	/**
  * Triggers a custom event.
  * @ko 커스텀 이벤트를 발생시킨다
  * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
  * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
  * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
  * @example
 class Some extends eg.Component {
  some(){
  	if(this.trigger("beforeHi")){ // When event call to stop return false.
 	this.trigger("hi");// fire hi event.
  	}
  }
 }
 const some = new Some();
 some.on("beforeHi", (e) => {
 if(condition){
 	e.stop(); // When event call to stop, `hi` event not call.
 }
 });
 some.on("hi", (e) => {
 // `currentTarget` is component instance.
 console.log(some === e.currentTarget); // true
 });
 // If you want to more know event design. You can see article.
 // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
  */


	Component.prototype.trigger = function trigger(eventName) {
		var customEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var handlerList = this._eventHandler[eventName] || [];
		var hasHandlerList = handlerList.length > 0;

		if (!hasHandlerList) {
			return true;
		}

		// If detach method call in handler in first time then handeler list calls.
		handlerList = handlerList.concat();

		customEvent.eventType = eventName;

		var isCanceled = false;
		var arg = [customEvent];
		var i = 0;

		customEvent.stop = function () {
			isCanceled = true;
		};
		customEvent.currentTarget = this;

		for (var _len = arguments.length, restParam = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			restParam[_key - 2] = arguments[_key];
		}

		if (restParam.length >= 1) {
			arg = arg.concat(restParam);
		}

		for (i = 0; handlerList[i]; i++) {
			handlerList[i].apply(this, arg);
		}

		return !isCanceled;
	};
	/**
  * Executed event just one time.
  * @ko 이벤트가 한번만 실행된다.
  * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
  * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
  * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
  * @example
 class Some extends eg.Component {
  hi() {
    alert("hi");
  }
  thing() {
    this.once("hi", this.hi);
  }
 }
 var some = new Some();
 some.thing();
 some.trigger("hi");
 // fire alert("hi");
 some.trigger("hi");
 // Nothing happens
  */


	Component.prototype.once = function once(eventName, handlerToAttach) {
		if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
			var eventHash = eventName;
			var i = void 0;

			for (i in eventHash) {
				this.once(i, eventHash[i]);
			}
			return this;
		} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
			var self = this;

			this.on(eventName, function listener() {
				for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					arg[_key2] = arguments[_key2];
				}

				handlerToAttach.apply(self, arg);
				self.off(eventName, listener);
			});
		}

		return this;
	};

	/**
  * Checks whether an event has been attached to a component.
  * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
  * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
  * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
  * @example
 class Some extends eg.Component {
  some() {
    this.hasOn("hi");// check hi event.
  }
 }
  */


	Component.prototype.hasOn = function hasOn(eventName) {
		return !!this._eventHandler[eventName];
	};

	/**
  * Attaches an event to a component.
  * @ko 컴포넌트에 이벤트를 등록한다.
  * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
  * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
  * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
  * @example
 class Some extends eg.Component {
  hi() {
    console.log("hi");
  }
  some() {
    this.on("hi",this.hi); //attach event
  }
 }
 */


	Component.prototype.on = function on(eventName, handlerToAttach) {
		if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
			var eventHash = eventName;
			var name = void 0;

			for (name in eventHash) {
				this.on(name, eventHash[name]);
			}
			return this;
		} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
			var handlerList = this._eventHandler[eventName];

			if (typeof handlerList === "undefined") {
				this._eventHandler[eventName] = [];
				handlerList = this._eventHandler[eventName];
			}

			handlerList.push(handlerToAttach);
		}

		return this;
	};
	/**
  * Detaches an event from the component.
  * @ko 컴포넌트에 등록된 이벤트를 해제한다
  * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
  * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
  * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
  * @example
 class Some extends eg.Component {
  hi() {
    console.log("hi");
  }
  some() {
    this.off("hi",this.hi); //detach event
  }
 }
  */


	Component.prototype.off = function off(eventName, handlerToDetach) {
		// All event detach.
		if (typeof eventName === "undefined") {
			this._eventHandler = {};
			return this;
		}

		// All handler of specific event detach.
		if (typeof handlerToDetach === "undefined") {
			if (typeof eventName === "string") {
				this._eventHandler[eventName] = undefined;
				return this;
			} else {
				var eventHash = eventName;
				var name = void 0;

				for (name in eventHash) {
					this.off(name, eventHash[name]);
				}
				return this;
			}
		}

		// The handler of specific event detach.
		var handlerList = this._eventHandler[eventName];

		if (handlerList) {
			var k = void 0;
			var handlerFunction = void 0;

			for (k = 0; (handlerFunction = handlerList[k]) !== undefined; k++) {
				if (handlerFunction === handlerToDetach) {
					handlerList = handlerList.splice(k, 1);
					break;
				}
			}
		}

		return this;
	};

	return Component;
}();

exports["default"] = Component;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=component.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["DIRECTION_NONE"] = 1] = "DIRECTION_NONE";
    DIRECTION[DIRECTION["DIRECTION_LEFT"] = 2] = "DIRECTION_LEFT";
    DIRECTION[DIRECTION["DIRECTION_RIGHT"] = 4] = "DIRECTION_RIGHT";
    DIRECTION[DIRECTION["DIRECTION_HORIZONTAL"] = 6] = "DIRECTION_HORIZONTAL";
    DIRECTION[DIRECTION["DIRECTION_UP"] = 8] = "DIRECTION_UP";
    DIRECTION[DIRECTION["DIRECTION_DOWN"] = 16] = "DIRECTION_DOWN";
    DIRECTION[DIRECTION["DIRECTION_VERTICAL"] = 24] = "DIRECTION_VERTICAL";
    DIRECTION[DIRECTION["DIRECTION_ALL"] = 30] = "DIRECTION_ALL";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
exports.TRANSFORM = (function () {
    var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
    var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];
    for (var i = 0, len = target.length; i < len; i++) {
        if (target[i] in bodyStyle) {
            return target[i];
        }
    }
    return "";
})();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.DATA_HEIGHT = exports.IS_ANDROID2 = exports.SUPPORT_WILLCHANGE = exports.TRANSFORM = exports.EVENTS = undefined;

var _browser = __webpack_require__(5);

// define custom events name
var EVENTS = {
	beforeFlickStart: "beforeFlickStart",
	beforeRestore: "beforeRestore",
	flick: "flick",
	flickEnd: "flickEnd",
	restore: "restore"
};

// check for the transform property
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
var TRANSFORM = {
	name: "transform"
};

TRANSFORM.support = function () {
	var style = _browser.document.documentElement.style;

	return TRANSFORM.name in style || (TRANSFORM.name = "webkitTransform") in style;
}();

// check for will-change support
var SUPPORT_WILLCHANGE = _browser.window.CSS && _browser.window.CSS.supports && _browser.window.CSS.supports("will-change", "transform");

// check for Android 2.x
var IS_ANDROID2 = /Android 2\./.test(navigator.userAgent);

// data-height attribute's name for adaptiveHeight option
var DATA_HEIGHT = "data-height";

exports.EVENTS = EVENTS;
exports.TRANSFORM = TRANSFORM;
exports.SUPPORT_WILLCHANGE = SUPPORT_WILLCHANGE;
exports.IS_ANDROID2 = IS_ANDROID2;
exports.DATA_HEIGHT = DATA_HEIGHT;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Flicking = __webpack_require__(10);

var _Flicking2 = _interopRequireDefault(_Flicking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Flicking2["default"].VERSION = "2.2.0"; /**
                                          * Copyright (c) 2015 NAVER Corp.
                                          * egjs projects are licensed under the MIT license
                                          */

module.exports = _Flicking2["default"];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(6);

var _component2 = _interopRequireDefault(_component);

var _axes = __webpack_require__(11);

var _axes2 = _interopRequireDefault(_axes);

var _utils = __webpack_require__(21);

var _consts = __webpack_require__(8);

var consts = _interopRequireWildcard(_consts);

var _config = __webpack_require__(22);

var _browser = __webpack_require__(5);

var _eventHandler = __webpack_require__(23);

var _eventHandler2 = _interopRequireDefault(_eventHandler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Create an instance of the eg.Flicking class. Create a flicking UI that sweeps a side-by-side panel with mouse move or touch move input and moves to the next or previous panel.
 * @ko eg.Flicking 클래스의 인스턴스를 생성한다. 나란히 배치한 패널을 마우스 이동(move) 혹은 터치 이동(move) 입력을 받아 쓸어 넘겨 다음 패널이나 이전 패널로 이동하는 UI를 만든다.
 * @alias eg.Flicking
 * @extends eg.Component
 * @requires {@link https://github.com/naver/egjs-component|eg.Component}
 * @requires {@link https://github.com/naver/egjs-axes|eg.Axes}
 * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}). <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@link https://jqueryui.com/easing})를 사용한다</ko>
 * @throws {Error} An Error occur when given base element doesn't exist or it hasn't proper DOM structure to be initialized. <ko>주어진 기본 요소가 존재하지 않거나 초기화 할 적절한 DOM 구조가없는 경우 오류가 발생한다.</ko>
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 * @example
 * A common example.
 * 일반적인 예.
 * ```html
 * <div id="flick">
 * 	<div><p>panel 0</p></div>
 * 	<div><p>panel 1</p></div>
 * 	<div><p>panel 2</p></div>
 * </div>
 * ```
 * ```javascript
 * // Examples to omit and omit optional options.
 * // 생략가능한 옵션은 생략하고 생성하는 예.
 * new eg.Flicking("#flick");
 *
 * // An example of specifying and generating values for all optional parameters.
 * // 모든 옵션의 값을 지정하고 생성하는 예.
 * new eg.Flicking("#flick", {
 * 	hwAccelerable: true,
 * 	prefix: "eg-flick",
 * 	deceleration: 0.0006,
 * 	horizontal: true,
 * 	circular: false,
 * 	previewPadding: [0 0],
 * 	bounce: [10, 10],
 * 	threshold: 40,
 * 	duration: 100,
 * 	panelEffect: x => 1 - Math.pow(1 - x, 3),
 * 	defaultIndex: 0,
 * 	inputType: ["touch", "mouse"],
 * 	thresholdAngle: 45,
 * 	adaptiveHeight: false
 * });
 * ```
 * @example
 * Example of constructor element parameter value specification.
 * 생성자 element 파라미터 값 지정 예.
 * ```javascript
 * // An example of assigning HTMLElement to an element parameter.
 * // element 파라미터에 HTMLElement를 지정하는 예.
 * new eg.Flicking(document.getElementById("flick"));
 *
 * // An example of assigning a jQuery object to an element parameter.
 * // element 파라미터에 jQuery객체를 지정하는 예.
 * new eg.Flicking($("#flick")[0]);
 *
 * // An example of assigning a css selector string to an element parameter.
 * // element 파라미터에 css 선택자 문자열을 지정하는 예.
 * new eg.Flicking("#flick");
 * ```
 * @example
 * Panel element definition location example.
 * 패널 요소 정의 위치 예.
 * ```html
 * <!--An example of defining a panel element as a child of a base element.-->
 * <!--패널 요소를 기준 요소의 자식으로 정의한 예.-->
 * <div id="flick">
 * 	<div><p>panel 0</p></div>
 * 	<div><p>panel 1</p></div>
 * 	<div><p>panel 2</p></div>
 * </div>
 *
 * <!--An example of defining a panel element as a child of a container element.-->
 * <!--패널 요소를 컨테이너 요소의 자식으로 정의한 예.-->
 * <div id="flick2">
 * 	<div class="eg-flick-container">
 * 		<div><p>panel 0</p></div>
 * 		<div><p>panel 1</p></div>
 * 		<div><p>panel 2</p></div>
 * 	<div>
 * </div>
 * ```
 * @example
 * An example where only one panel is defined and created with a circular.
 * 패널을 하나만 정의하고 순환으로 생성하는 예.
 * ```html
 * <div id="flick">
 * 	<div><p>panel 0</p></div>
 * </div>
 * ```
 * ```javascript
 * // If the number of defined panels is less than the minimum number required for the circulation operation, the necessary number of panel elements are generated.
 * // 정의된 패널의 수가 순환동작에 필요한 최소 개수보다 적으면 필요한 수만큼의 패널 요소가 생성된다.
 * new eg.Flicking("#flick", {
 * 	circular: true
 * })
 * ```
 * @example
 * For error occurrence example. There is no panel element.
 * 오류 발생 예. 패널 요소가 하나도 없는 경우.
 * ```html
 * <div id="flick"></div>
 * ```
 * ```javascript
 * try{
 * 	new eg.Flicking("#flick");
 * } catch(e) {
 * 	// An error occurs because there are no child elements in the reference element.
 *	// 기준 요소안에 자식 요소가 하나도 없으므로 에러가 발생한다.
 * }
 * ```
 */
var Flicking = function (_Mixin$with) {
	_inherits(Flicking, _Mixin$with);

	/**
  * Constructor
  * @param {HTMLElement|String} element A base element for the eg.Flicking module. When specifying a value as a `String` type, you must specify a css selector string to select the element.<ko>eg.Flicking 모듈을 사용할 기준 요소. `String`타입으로 값 지정시 요소를 선택하기 위한 css 선택자 문자열을 지정해야 한다.</ko>
  * @param {Object} [options] The option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
  * @param {Boolean} [options.hwAccelerable=true] Force hardware compositing.<ko>하드웨어 가속 사용 여부.</ko>
  * @param {String} [options.prefix="eg-flick"] A prefix for class names of the panel elements.<ko>패널 요소의 클래스 이름 접두사.</ko>
  * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time.<ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
  * @param {Boolean} [options.horizontal=true] Direction of the panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true 가로방향, false 세로방향)</ko>
  * @param {Boolean} [options.circular=false] Whether to let the first panel flick right to the end panel (let the left panel flick from the end panel to move to the first panel). (The term 'circulation')<ko>첫 패널에서 우 액션 입력하여 끝 패널로 이동하게 할지와 끝 패널에서 우 액션 입력하여 첫 패널로 이동할하게 할지 여부. (통칭 '순환')</ko>
  * @param {Number|Array} [options.previewPadding=[0,0]] The preview size value(unit: pixel) for the previous or next panel. If direction is set to "horizontal", the preview section will be displayed on the left and right of the panel. If direction is set to "vertical", it will be displayed on the top and bottom of the panel.<ko>이전 패널과 다음 패널을 미리 보는 영역의 크기값(단위: 픽셀). 패널 이동 방향이 가로 방향이면 패널 좌우에, 세로 방향이면 패널 상하에 미리 보는 영역이 나타난다.</ko>
  * @param {Number|Array} [options.bounce=[10,10]] The size value(unit: pixel) of the bounce area. If `circular=false`, the panel can be moved by this value when inputting a right gesture in the first panel or inputting a left gesture in the end panel. When the input is completed while moving, it returns to its original position.<ko>바운스 영역의 크기값(단위: 픽셀). `circular=false`인 경우, 첫 패널에서 우 액션 입력시, 끝 패널에서 좌 액션 입력시 이 값 만큼만 패널이 이동할 수 있고 이동한 상태에서 입력을 마치면 원래 자리로 돌아온다.</ko>
  * @param {Number} [options.threshold=40] Movement threshold to destination panel(unit: pixel). A panel element must be dragged beyond the threshold to move to the destination panel.<ko>목적 패널로의 이동 임계값 (단위: 픽셀). 패널 요소를 임계값 이상으로 끌어다 놓아야만이 목적 패널로 이동한다.</ko>
  * @param {Number} [options.duration=100] Duration of the panel movement. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
  * @param {Function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] The easing function to apply to a panel moving animation. The default function is easeOutCubic.<ko>패널 이동 애니메이션에 적용할 `easing`함수. 기본값은 `easeOutCubic`이다.</ko>
  * @param {Number} [options.defaultIndex=0] The panel index number to specify when initializing the module. A zero-based integer.<ko>모듈 초기화시 지정할 패널 인덱스 번호. 0부터 시작하는 정수.</ko>
  * @param {Array} [options.inputType=["touch,"mouse"]] Types of input devices. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput Reference})<br>- "touch": A touch input device.<br>- "mouse": A mouse.<ko>입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput 참고})<br>- "touch": 터치 입력 장치.<br>- "mouse": 마우스.</ko>
  * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user input is horizontal or vertical. (0 ~ 90)<ko>사용자의 입력이 가로 방향인지 세로 방향인지 판단하는 기준 각도 (0 ~ 90)</ko>
  * @param {Boolean} [options.adaptiveHeight=false] Whether the height of the container element reflects the height value of the panel after completing the movement.<br>(Note: on Android 4.1.x stock browser, has rendering bug which not correctly render height value on panel with single node. To avoid just append another empty node at the end.)<ko>목적 패널로 이동한 후 그 패널의 높이값을 컨테이너 요소의 높이값에 반영할지 여부.<br>(참고: Android 4.1.x 스톡 브라우저에서 단일 노드로 구성된 패널의 높이값 변경이 제대로 렌더링 되지 않는 버그가 있음. 비어있는 노드를 추가하면 해결이 가능하다.)</ko>
 */
	function Flicking(element, options, _prefix) {
		_classCallCheck(this, Flicking);

		var _this = _possibleConstructorReturn(this, _Mixin$with.call(this));

		_this.$wrapper = _utils.utils.$(element);
		var $children = _this.$wrapper && _this.$wrapper.children;

		if (!_this.$wrapper || !$children || !$children.length) {
			// eslint-disable validateLineBreaks, maximumLineLength
			throw new Error("Given base element doesn't exist or it hasn't proper DOM structure to be initialized.");

			// eslint-enable validateLineBreaks, maximumLineLength
		}

		_this._setOptions(options);
		_this._setConfig($children, _prefix);

		!_utils.utils.hasClickBug() && (_this._setPointerEvents = function () {});

		_this._build();
		_this._bindEvents(true);

		_this._applyPanelsCss();
		_this._arrangePanels();

		_this.options.hwAccelerable && consts.SUPPORT_WILLCHANGE && _this._setHint();
		_this.options.adaptiveHeight && _this._setAdaptiveHeight();

		_this._adjustContainerCss("end");
		return _this;
	}

	/**
  * Set options values
  * @private
  * @param {Object} options
  */


	Flicking.prototype._setOptions = function _setOptions(options) {
		// default value of previewPadding and bounce
		var arrVal = {
			previewPadding: [0, 0],
			bounce: [10, 10]
		};

		this.options = _utils.utils.extend(_utils.utils.extend({}, _config.OPTIONS), arrVal, options);

		for (var key in arrVal) {
			var val = this.options[key];

			if (typeof val === "number") {
				val = [val, val];
			} else if (!_utils.utils.isArray(val)) {
				val = arrVal[key];
			}

			this.options[key] = val;
		}
	};

	/**
  * Set config values
  * @private
  * @param {HTMLCollection} $children wrappers' children elements
  * @param {String} _prefix event prefix
  * @return {HTMLElement}
  */


	Flicking.prototype._setConfig = function _setConfig($children, _prefix) {
		var options = this.options;
		var padding = options.previewPadding;
		var $nodes = $children;

		if (_utils.utils.classList($nodes[0], options.prefix + "-container")) {
			$nodes = $nodes[0];
			this.$container = $nodes;
			$nodes = $nodes.children;
		}

		// convert to array
		$nodes = [].slice.call($nodes);

		// config value
		var conf = this._conf = _utils.utils.extend(_utils.utils.extend({}, _config.CONFIG), {
			panel: {
				$list: $nodes,
				minCount: padding[0] + padding[1] > 0 ? 5 : 3 // minimum panel count
			},
			// remember original class and inline style in case of restoration on destroy()
			origPanelStyle: {
				wrapper: {
					className: this.$wrapper.getAttribute("class") || null,
					style: this.$wrapper.getAttribute("style") || null
				},
				container: {
					className: this.$container && this.$container.getAttribute("class") || null,
					style: this.$container && this.$container.getAttribute("style") || null
				},
				list: $nodes.map(function (v) {
					return {
						className: v.getAttribute("class") || null,
						style: v.getAttribute("style") || null
					};
				})
			},
			useLayerHack: options.hwAccelerable && !consts.SUPPORT_WILLCHANGE,
			eventPrefix: _prefix || ""
		});

		[["LEFT", "RIGHT"], ["UP", "DOWN"]][+!options.horizontal].forEach(function (v) {
			return conf.dirData.push(_axes2["default"]["DIRECTION_" + v]);
		});
	};

	/**
  * Build and set panel nodes to make flicking structure
  * @private
  */


	Flicking.prototype._build = function _build() {
		var panel = this._conf.panel;
		var options = this.options;
		var $children = panel.$list;
		var padding = options.previewPadding.concat();
		var prefix = options.prefix;
		var horizontal = options.horizontal;
		var panelCount = panel.count = panel.origCount = $children.length;
		var bounce = options.bounce;

		this._setPadding(padding, true);
		var sizeValue = this._getDataByDirection([panel.size, "100%"]);

		// container element style
		var cssValue = {
			position: "relative",
			zIndex: 2000,
			width: "100%",
			height: "100%"
		};

		horizontal && (cssValue.top = "0px");

		if (this.$container) {
			_utils.utils.css(this.$container, cssValue);
		} else {
			var $parent = $children[0].parentNode;
			var $container = _browser.document.createElement("div");

			$container.className = prefix + "-container";
			_utils.utils.css($container, cssValue);

			$children.forEach(function (v) {
				return $container.appendChild(v);
			});

			$parent.appendChild($container);
			this.$container = $container;
		}

		// panels' css values
		$children.forEach(function (v) {
			_utils.utils.classList(v, prefix + "-panel", true);

			_utils.utils.css(v, {
				position: "absolute",
				width: _utils.utils.getUnitValue(sizeValue[0]),
				height: _utils.utils.getUnitValue(sizeValue[1]),
				boxSizing: "border-box",
				top: 0,
				left: 0
			});
		});

		if (this._addClonePanels()) {
			panelCount = panel.count = (panel.$list = [].slice.call(this.$container.children)).length;
		}

		// create Axes instance
		this._axesInst = new _axes2["default"]({
			flick: {
				range: [0, panel.size * (panelCount - 1)],
				bounce: bounce
			}
		}, {
			easing: options.panelEffect,
			deceleration: options.deceleration,
			interruptable: false
		});

		this._setDefaultPanel(options.defaultIndex);
	};

	/**
  * Set preview padding value
  * @private
  * @param {Array} padding
  * @param {Boolean} build
  */


	Flicking.prototype._setPadding = function _setPadding(padding, build) {
		var horizontal = this.options.horizontal;
		var panel = this._conf.panel;
		var paddingSum = padding[0] + padding[1];
		var cssValue = {};

		if (paddingSum || !build) {
			cssValue.padding = horizontal ? "0 " + padding.reverse().join("px 0 ") + "px" : padding.join("px 0 ") + "px";
		}

		if (build) {
			cssValue.overflow = "hidden";
			cssValue.boxSizing = "border-box";
		}

		Object.keys(cssValue).length && _utils.utils.css(this.$wrapper, cssValue);

		var wrapperStyle = getComputedStyle(this.$wrapper);
		var paddingType = horizontal ? ["Left", "Right"] : ["Top", "Bottom"];
		var wrapperSize = Math.max(this.$wrapper["offset" + (horizontal ? "Width" : "Height")], _utils.utils.getNumValue(wrapperStyle[horizontal ? "width" : "height"]));

		panel.size = wrapperSize - (_utils.utils.getNumValue(wrapperStyle["padding" + paddingType[0]]) + _utils.utils.getNumValue(wrapperStyle["padding" + paddingType[1]]));
	};

	/**
  * To fulfill minimum panel count cloning original node when circular or previewPadding option are set
  * @private
  * @return {Boolean} true : added clone node, false : not added
  */


	Flicking.prototype._addClonePanels = function _addClonePanels() {
		var _this2 = this;

		var panel = this._conf.panel;
		var panelCount = panel.origCount;
		var cloneCount = panel.minCount - panelCount;
		var list = panel.$list;
		var cloneNodes = void 0;

		// if panels are given less than required when circular option is set, then clone node to apply circular mode
		if (this.options.circular && panelCount < panel.minCount) {
			cloneNodes = list.map(function (v) {
				return v.cloneNode(true);
			});

			while (cloneNodes.length < cloneCount) {
				cloneNodes = cloneNodes.concat(list.map(function (v) {
					return v.cloneNode(true);
				}));
			}

			cloneNodes.forEach(function (v) {
				return _this2.$container.appendChild(v);
			});

			return !!cloneNodes.length;
		}

		return false;
	};

	/**
  * Move panel's position within array
  * @private
  * @param {Number} count element counts to move
  * @param {Boolean} append where the list to be appended(moved) (true: to the end, false: to the beginning)
  */


	Flicking.prototype._movePanelPosition = function _movePanelPosition(count, append) {
		var panel = this._conf.panel;
		var list = panel.$list;
		var listToMove = list.splice(append ? 0 : panel.count - count, count);

		panel.$list = append ? list.concat(listToMove) : listToMove.concat(list);
	};

	/**
  * Set default panel to show
  * @private
  * @param {Number} index
  */


	Flicking.prototype._setDefaultPanel = function _setDefaultPanel(index) {
		var panel = this._conf.panel;
		var lastIndex = panel.count - 1;
		var coords = void 0;
		var baseIndex = void 0;

		if (this.options.circular) {
			// if default index is given, then move correspond panel to the first position
			if (index > 0 && index <= lastIndex) {
				this._movePanelPosition(index, true);
			}

			// set first panel's position according physical node length
			baseIndex = this._getBasePositionIndex();
			this._movePanelPosition(baseIndex, false);

			this._setPanelNo({
				no: index,
				currNo: index
			});
			// if defaultIndex option is given, then move to that index panel
		} else if (index > 0 && index <= lastIndex) {
			this._setPanelNo({
				index: index,
				no: index,
				currIndex: index,
				currNo: index
			});

			coords = [-(panel.size * index), 0];

			this._setTranslate(coords);
			this._setAxes("setTo", Math.abs(coords[0]), 0);
		}
	};

	/**
  * Arrange panels' position
  * @private
  * @param {Boolean} sort Need to sort panel's position
  * @param {Number} indexToMove Number to move from current position (negative: left, positive: right)
  */


	Flicking.prototype._arrangePanels = function _arrangePanels(sort, indexToMove) {
		var conf = this._conf;
		var panel = conf.panel;
		var touch = conf.touch;
		var dirData = conf.dirData;
		var baseIndex = void 0;

		if (this.options.circular) {
			// when arranging panels, set flag to not trigger flick custom event
			conf.customEvent.flick = false;

			// move elements according direction
			if (sort) {
				indexToMove && (touch.direction = dirData[+!(indexToMove > 0)]);
				this._arrangePanelPosition(touch.direction, indexToMove);
			}

			// set index for base element's position
			baseIndex = this._getBasePositionIndex();

			this._setPanelNo({
				index: baseIndex,
				currIndex: baseIndex
			});

			// arrange Axes' coord position
			conf.customEvent.flick = !!this._setAxes("setTo", panel.size * panel.index, 0);
		}

		this._applyPanelsPos();
	};

	/**
  * Set each panel's position in DOM
  * @private
  */


	Flicking.prototype._applyPanelsPos = function _applyPanelsPos() {
		this._conf.panel.$list.forEach(this._applyPanelsCss.bind(this));
	};

	/**
  * Set CSS style values to move elements
  *
  * Initialize setting up checking if browser support transform css property.
  * If browser doesn't support transform, then use left/top properties instead.
  * @private
  * @param {HTMLElement} $el
  * @param {Array} coordsValue
  */


	Flicking.prototype._setMoveStyle = function _setMoveStyle($el, coordsValue) {
		var transform = consts.TRANSFORM;

		this._setMoveStyle = transform.support ? function ($element, coords) {
			var _utils$css;

			_utils.utils.css($element, (_utils$css = {}, _utils$css[transform.name] = _utils.utils.translate(coords[0], coords[1], this._conf.useLayerHack), _utils$css));
		} : function ($element, coords) {
			_utils.utils.css($element, { left: coords[0], top: coords[1] });
		};

		this._setMoveStyle($el, coordsValue);
	};

	/**
  * Callback function for applying CSS values to each panels
  * Need to be initialized before use, to set up for Android 2.x browsers or others.
  * @private
  */


	Flicking.prototype._applyPanelsCss = function _applyPanelsCss() {
		var conf = this._conf;
		var dummyAnchorClassName = "__dummy_anchor";

		if (consts.IS_ANDROID2) {
			conf.$dummyAnchor = _utils.utils.$("." + dummyAnchorClassName);

			!conf.$dummyAnchor && this.$wrapper.appendChild(conf.$dummyAnchor = _utils.utils.$("<a href=\"javascript:void(0)\" class=\"" + dummyAnchorClassName + "\" style=\"position:absolute;height:0px;width:0px\">"));

			this._applyPanelsCss = function applyCss(v, i) {
				var coords = this._getDataByDirection([this._conf.panel.size * i + "px", 0]);

				_utils.utils.css(v, {
					left: coords[0],
					top: coords[1]
				});
			};
		} else {
			this._applyPanelsCss = function applyCss(v, i) {
				var coords = this._getDataByDirection([consts.TRANSFORM.support ? 100 * i + "%" : this._conf.panel.size * i + "px", 0]);

				this._setMoveStyle(v, coords);
			};
		}
	};

	/**
  * Adjust container's css value to handle Android 2.x link highlighting bug
  * @private
  * @param {String} phase
  *    start - set left/top value to 0
  *    end - set translate value to 0
  * @param {Array} toValue coordinate value
  */


	Flicking.prototype._adjustContainerCss = function _adjustContainerCss(phase, toValue) {
		var conf = this._conf;
		var panel = conf.panel;
		var options = this.options;
		var horizontal = options.horizontal;
		var paddingTop = options.previewPadding[0];
		var container = this.$container;
		var to = toValue;
		var value = void 0;

		if (consts.IS_ANDROID2) {
			if (!to) {
				to = -panel.size * panel.index;
			}

			if (phase === "start") {
				container = container.style;
				value = parseInt(container[horizontal ? "left" : "top"], 10);

				if (horizontal) {
					value && (container.left = "0px");
				} else {
					value !== paddingTop && (container.top = "0px");
				}

				this._setTranslate([-to, 0]);
			} else if (phase === "end") {
				var _utils$css2;

				to = this._getCoordsValue([to, 0]);

				_utils.utils.css(container, (_utils$css2 = {
					left: to.x,
					top: to.y
				}, _utils$css2[consts.TRANSFORM.name] = _utils.utils.translate(0, 0, conf.useLayerHack), _utils$css2));

				conf.$dummyAnchor.focus();
			}
		}
	};

	/**
  * Set Axes coord value
  * @private
  * @param {String} method
  * @param {Number} flick destination value
  * @param {Number} duration
  * @return {eg.Axes} Axes instance
  */


	Flicking.prototype._setAxes = function _setAxes(method, flick, duration) {
		return this._axesInst[method]({ flick: flick }, duration);
	};

	/**
  * Set hint for browser to decide efficient way of doing transform changes(or animation)
  * https://dev.opera.com/articles/css-will-change-property/
  * @private
  */


	Flicking.prototype._setHint = function _setHint() {
		var style = { willChange: "transform" };

		_utils.utils.css(this.$container, style);
		_utils.utils.css(this._conf.panel.$list, style);
	};

	/**
  * Get data according options.horizontal value
  * @private
  * @param {Array} value primary data to handle
  * @return {Array}
  */


	Flicking.prototype._getDataByDirection = function _getDataByDirection(value) {
		var data = value.concat();

		!this.options.horizontal && data.reverse();
		return data;
	};

	/**
  * Move nodes
  * @private
  * @param {Boolean} direction
  * @param {Number} indexToMove
  */


	Flicking.prototype._arrangePanelPosition = function _arrangePanelPosition(direction, indexToMove) {
		var next = direction === this._conf.dirData[0];

		this._movePanelPosition(Math.abs(indexToMove || 1), next);
	};

	/**
  * Get the base position index of the panel
  * @private
  */


	Flicking.prototype._getBasePositionIndex = function _getBasePositionIndex() {
		return Math.floor(this._conf.panel.count / 2 - 0.1);
	};

	/**
  * Bind events
  * @private
  * @param {Boolean} bind
  */


	Flicking.prototype._bindEvents = function _bindEvents(bind) {
		var options = this.options;
		var $wrapper = this.$wrapper;
		var axesInst = this._axesInst;

		if (bind) {
			this._panInput = new _axes.PanInput($wrapper, {
				inputType: options.inputType,
				thresholdAngle: options.thresholdAngle,
				scale: this._getDataByDirection([-1, 0])
			});

			axesInst.on({
				hold: this._holdHandler.bind(this),
				change: this._changeHandler.bind(this),
				release: this._releaseHandler.bind(this),
				animationStart: this._animationStartHandler.bind(this),
				animationEnd: this._animationEndHandler.bind(this)
			}).connect(this._getDataByDirection(["flick", ""]), this._panInput);
		} else {
			this.disableInput();
			axesInst.off();
		}
	};

	/**
  * Set container's height value according to children's height
  * @private
  * @param {Number} direction
  */


	Flicking.prototype._setAdaptiveHeight = function _setAdaptiveHeight(direction) {
		var conf = this._conf;
		var indexToMove = conf.indexToMove;
		var $children = void 0;
		var height = void 0;

		var $panel = indexToMove === 0 ?

		// panel moved by 1
		this["get" + (direction === _axes2["default"].DIRECTION_LEFT && "Next" || direction === _axes2["default"].DIRECTION_RIGHT && "Prev" || "") + "Element"]() :

		// panel moved by .moveTo()
		conf.panel.$list[conf.panel.currIndex + indexToMove];

		var $first = $panel.querySelector(":first-child");

		if ($first) {
			height = $first.getAttribute(consts.DATA_HEIGHT);

			if (!height) {
				$children = $panel.children;

				height = _utils.utils.outerHeight($children.length > 1 ? ($panel.style.height = "auto", $panel) : $first);

				height > 0 && $first.setAttribute(consts.DATA_HEIGHT, height);
			}

			height > 0 && (this.$wrapper.style.height = height + "px");
		}
	};

	/**
  * Trigger beforeRestore event
  * @private
  * @param {Object} e event object
  */


	Flicking.prototype._triggerBeforeRestore = function _triggerBeforeRestore(e) {
		var conf = this._conf;
		var touch = conf.touch;

		// reverse direction value when restore
		touch.direction = +conf.dirData.join("").replace(touch.direction, "");

		/**
   * This event occurs before the current panel starts to return to its original position. Followes [flick]{@link eg.Flicking#event:flick} and [restore]{@link eg.Flicking#event:restore} events. The conditions of occurrence are as follows.<br><br>1. The user has finished input but does not exceed the panel movement threshold.<br>2. Call the [restore()]{@link eg.Flicking#restore} method. (Prevent the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event.)
   * @ko 현재 패널이 원래 위치로 되돌아가기 시작전에 발생하는 이벤트이다. 뒤이어 [flick]{@link eg.Flicking#event:flick}과 [restore]{@link eg.Flicking#event:restore}이벤트가 발생한다. 발생조건은 아래와 같다.<br><br>1. 사용자 입력이 끝났는데 패널 이동 임계점을 넘지 않은 경우.<br>2. [restore()]{@link eg.Flicking#restore} 메서드 호출.([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} 이벤트의 기본동작 방지 전제)
   * @name eg.Flicking#beforeRestore
   * @event
   * @property {String} eventType The name of the event <ko>이벤트 명</ko>
   * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
   * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
   * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
   * @property {Number} depaPos Starting coordinate. <ko>출발점 좌표.</ko>
   * @property {Number} destPos Destination coordinate. <ko>도착점 좌표.</ko>
   * @see eg.Flicking#event:flick
   * @see eg.Flicking#event:restore
   * @see eg.Flicking#restore
   * @example
   * // The order of event occurrence.
   * // 이벤트 발생 순서
   * beforeRestore (once) > flick (many times) > restore (once)
   */
		conf.customEvent.restore = this._triggerEvent(consts.EVENTS.beforeRestore, {
			depaPos: e.depaPos.flick,
			destPos: e.destPos.flick
		});

		if (!conf.customEvent.restore) {
			"stop" in e && e.stop();
			conf.panel.animating = false;
		}
	};

	/**
  * Trigger restore event
  * @private
  */


	Flicking.prototype._triggerRestore = function _triggerRestore() {
		var customEvent = this._conf.customEvent;

		/**
   * The event that occurs after completing the move by [restore()]{@link eg.Flicking#restore} method.
   * @ko [restore()]{@link eg.Flicking#restore} 메서드에 의해 패널이 원래 위치로 이동을 완료한 다음 발생하는 이벤트.
   * @name eg.Flicking#restore
   * @event
   * @property {String} eventType The name of the event <ko>이벤트 명</ko>
   * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
   * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
   * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
   * @see eg.Flicking#event:beforeRestore
   * @see eg.Flicking#event:flick
   * @see eg.Flicking#restore
   * @example
   * // The order of event occurrence.
   * // 이벤트 발생 순서
   * beforeRestore (once) > flick (many times) > restore (once)
   */
		customEvent.restore && this._triggerEvent(consts.EVENTS.restore);
		customEvent.restore = customEvent.restoreCall = false;
	};

	/**
  * Set value when panel changes
  * @private
  * @param {String} phase - [start|end]
  * @param {Object} pos
  */


	Flicking.prototype._setPhaseValue = function _setPhaseValue(phase, pos) {
		var conf = this._conf;
		var options = this.options;
		var panel = conf.panel;

		if (phase === "start" && (panel.changed = this._isMovable())) {
			/**
    * An event that occurs before a user action or [moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next} method initiates a move to the destination panel. If you do not prevent the default behavior, then many [flick]{@link eg.Flicking#event:flick} events and one [flickEnd]{@link eg.Flicking#event:flickEnd} event will occur.
    * @ko 사용자 액션 혹은 [moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next} 메서드에 의해 목적 패널로의 이동 시작전 발생하는 이벤트. 기본동작을 막지 않는다면 뒤이어 다수의 [flick]{@link eg.Flicking#event:flick}이벤트와 그 뒤 한 번의 [flickEnd]{@link eg.Flicking#event:flickEnd}이벤트가 발생한다.
    * @name eg.Flicking#beforeFlickStart
    * @event
    * @property {String} eventType The name of the event <ko>이벤트 명</ko>
    * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`</ko>
    * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
    * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
    * @property {Number} depaPos Starting coordinate. <ko>출발점 좌표.</ko>
    * @property {Number} destPos Destination coordinate. <ko>도착점 좌표.</ko>
    * @property {Function} stop Cancels the default action. (Default action: Move to destination panel.) The panel element stays at the position of the call to `stop()`. To return to the original position, you must call the [restore()]{@link eg.Flicking#restore} method.<ko>기본동작을 취소한다. (기본동작: 목적 패널로의 이동.) 패널 요소가 `stop()`호출시점의 위치에 머물러 있는다. 원래 자리로 되돌리려면 [restore()]{@link eg.Flicking#restore} 메서드를 호출해야 한다.</ko>
    * @see eg.Flicking#event:flick
    * @see eg.Flicking#event:flickEnd
    * @see eg.Flicking#moveTo
    * @see eg.Flicking#prev
    * @see eg.Flicking#next
    * @example
    * // The order of event occurrence.
    * // 이벤트 발생 순서
    * beforeFlickStart (once) > flick (many times) > flickEnd (once)
    * @example
    * // An example to prevent the default behavior.
    * // 기본동작을 막는 예.
    * new eg.Flicking("#flick").on("beforeFlickStart", e => {
    * 	e.stop();
    * });
    */
			if (!this._triggerEvent(consts.EVENTS.beforeFlickStart, pos)) {
				panel.changed = panel.animating = false;
				return false;
			} else {
				options.adaptiveHeight && this._setAdaptiveHeight(conf.touch.direction);
			}

			conf.indexToMove === 0 && this._setPanelNo();
		} else if (phase === "end") {
			if (options.circular && panel.changed) {
				this._arrangePanels(true, conf.indexToMove);
			}

			!consts.IS_ANDROID2 && this._setTranslate([-panel.size * panel.index, 0]);
			conf.touch.distance = conf.indexToMove = 0;

			/**
    * The event that occurs after completing the move to the destination panel. It occurs in the following cases.<br><br>- After completing the movement to the destination panel by user's move input.<br>- `moveTo()`, `prev()`, `next()` method call. (It does not occur if you have disabled the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event.)
    * @ko 목적 패널로의 이동을 완료한 다음 발생하는 이벤트. 아래의 경우에 발생한다.<br><br>- 사용자의 이동(move) 액션 입력에 의한 목적 패널로의 이동완료 후.<br>- `moveTo()`, `prev()`, `next()` 메서드 호출.([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}이벤트의 기본동작을 막았다면 발생하지 않는다.)
    * @name eg.Flicking#flickEnd
    * @event
    * @property {String} eventType The name of the event.<ko>이벤트 명</ko>
    * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
    * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
    * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
    * @see eg.Flicking#event:beforeFlickStart
    * @see eg.Flicking#event:flick
    * @see eg.Flicking#moveTo
    * @see eg.Flicking#prev
    * @see eg.Flicking#next
    * @example
    * // The order of event occurrence.
    * // 이벤트 발생 순서
    * beforeFlickStart (once) > flick (many times) > flickEnd (once)
    */
			panel.changed && this._triggerEvent(consts.EVENTS.flickEnd);
		}

		this._adjustContainerCss(phase);
		return true;
	};

	/**
  * Get positive or negative according direction
  * @private
  */


	Flicking.prototype._getNumByDirection = function _getNumByDirection() {
		var conf = this._conf;

		return conf.touch.direction === conf.dirData[0] ? 1 : -1;
	};

	/**
  * Revert panel number
  * @private
  */


	Flicking.prototype._revertPanelNo = function _revertPanelNo() {
		var panel = this._conf.panel;
		var num = this._getNumByDirection();

		var index = panel.currIndex >= 0 ? panel.currIndex : panel.index - num;
		var no = panel.currNo >= 0 ? panel.currNo : panel.no - num;

		this._setPanelNo({
			index: index,
			no: no
		});
	};

	/**
  * Set the panel number
  * @private
  * @param {Object} obj number object
  */


	Flicking.prototype._setPanelNo = function _setPanelNo(obj) {
		var panel = this._conf.panel;
		var count = panel.origCount - 1;
		var num = this._getNumByDirection();

		if (_utils.utils.isObject(obj)) {
			for (var key in obj) {
				panel[key] = obj[key];
			}
		} else {
			// remember current value
			panel.currIndex = panel.index;
			panel.currNo = panel.no;

			panel.index += num;
			panel.no += num;
		}

		if (panel.no > count) {
			panel.no = 0;
		} else if (panel.no < 0) {
			panel.no = count;
		}
	};

	/**
  * Set pointerEvents css property on container element due to the iOS click bug
  * @private
  * @param {Event} e
  */


	Flicking.prototype._setPointerEvents = function _setPointerEvents(e) {
		var pointer = _utils.utils.css(this.$container, "pointerEvents");
		var val = void 0;

		if (e && e.holding && e.inputEvent && e.inputEvent.preventSystemEvent && pointer !== "none") {
			val = "none";
		} else if (!e && pointer !== "auto") {
			val = "auto";
		}

		val && _utils.utils.css(this.$container, { pointerEvents: val });
	};

	/**
  * Get coordinate value with unit
  * @private
  * @param coordsValue {Array} x,y numeric value
  * @return {Object} x,y coordinate value with unit
  */


	Flicking.prototype._getCoordsValue = function _getCoordsValue(coordsValue) {
		// the param comes as [ val, 0 ], whatever the direction. So reorder the value depend the direction.
		var coords = this._getDataByDirection(coordsValue);

		return {
			x: _utils.utils.getUnitValue(coords[0]),
			y: _utils.utils.getUnitValue(coords[1])
		};
	};

	/**
  * Set translate property value
  * @private
  * @param {Array} coordsValue coordinate x,y value
  */


	Flicking.prototype._setTranslate = function _setTranslate(coordsValue) {
		var coords = this._getCoordsValue(coordsValue);

		this._setMoveStyle(this.$container, [coords.x, coords.y]);
	};

	/**
  * Check if panel passed through threshold pixel
  * @private
  */


	Flicking.prototype._isMovable = function _isMovable() {
		var options = this.options;
		var axesInst = this._axesInst;
		var isMovable = Math.abs(this._conf.touch.distance) >= options.threshold;
		var max = void 0;
		var currPos = void 0;

		if (!options.circular && isMovable) {
			max = axesInst.axis.flick.range[1];
			currPos = axesInst.get().flick;

			// if current position out of range
			if (currPos < 0 || currPos > max) {
				return false;
			}
		}

		return isMovable;
	};

	/**
  * Trigger custom events
  * @private
  * @param {String} name - event name
  * @param {Object} param - additional event value
  * @return {Boolean}
  */


	Flicking.prototype._triggerEvent = function _triggerEvent(name, param) {
		var conf = this._conf;
		var panel = conf.panel;

		// pass changed panel no only on 'flickEnd' event
		if (name === consts.EVENTS.flickEnd) {
			panel.currNo = panel.no;
			panel.currIndex = panel.index;
		}

		return this.trigger(conf.eventPrefix + name, _utils.utils.extend({
			eventType: name,
			no: panel.currNo,
			direction: conf.touch.direction,
			isTrusted: conf.touch.isTrusted
		}, param));
	};

	/**
  * Get next/prev panel element/index.
  * @private
  * @param {Boolean} direction
  * @param {Boolean} element - true:to get element, false:to get index
  * @param {Number} physical - true : physical, false : logical (@deprecated since 2.2.0)
  * @return {HTMLElement|Number}
  */


	Flicking.prototype._getElement = function _getElement(direction, element, physical) {
		var panel = this._conf.panel;
		var circular = this.options.circular;
		var pos = panel.currIndex;
		var next = direction === this._conf.dirData[0];
		var result = null;
		var total = void 0;
		var index = void 0;

		if (physical) {
			total = panel.count;
			index = pos;
		} else {
			total = panel.origCount;
			index = panel.currNo;
		}

		var currentIndex = index;

		if (next) {
			if (index < total - 1) {
				index++;
			} else if (circular) {
				index = 0;
			}
		} else {
			if (index > 0) {
				index--;
			} else if (circular) {
				index = total - 1;
			}
		}

		if (currentIndex !== index) {
			result = element ? panel.$list[next ? pos + 1 : pos - 1] : index;
		}

		return result;
	};

	/**
  * Set value to force move panels when duration is 0
  * @private
  * @param {Boolean} next
  */


	Flicking.prototype._setValueToMove = function _setValueToMove(next) {
		var conf = this._conf;

		conf.touch.distance = this.options.threshold + 1;
		conf.touch.direction = conf.dirData[+!next];
	};

	/**
  * Returns the index number of the current panel element.
  * @ko 현재 패널 요소의 인덱스 번호를 반환한다.
  * @method eg.Flicking#getIndex
  * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers.<br>- true (Physical): Math.floor({Total number of panels} / 2 - 0.1) value. (Increase by 1 for every two panels.) If the circular option is false, it equals physical=false.<br>- false (Logical): The value of how the content(innerHTML) of the current panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류.<br>- true (물리적): `Math.floor({패널 총 개수} / 2 - 0.1)` 값. (패널이 2개 늘어날 때마다 1씩 증가) `circular`옵션이 `false`이면 `physical=false`와 동일한 값.<br>- false (논리적): 현재 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
  * @return {Number} Index number of the current panel element. A zero-based integer.<ko>현재 패널의 인덱스 번호. 0부터 시작하는 정수.</ko>
  * @see eg.Flicking#getPrevIndex
  * @see eg.Flicking#getNextIndex
  * @example
  * ```html
  * <div id="flick">
  * 	<div><p>panel 0</p></div>
  * 	<div><p>panel 1</p></div>
  * 	<div><p>panel 2</p></div>
  * 	<div><p>panel 3</p></div>
  * </div>
  * ```
  * ```javascript
  * // circular off and left flicking.
  * // 순환을 끄고 좌 플리킹.
  * new eg.Flicking("#flick").on("flickEnd", {currentTarget} => {
  * 	console.log(currentTarget.getIndex()); // 1 > 2 > 3
  * 	console.log(currentTarget.getIndex(true)); // 1 > 2 > 3
  * };
  *
  * // circular on and left flicking.
  * // 순환을 켜고 좌 플리킹.
  * new eg.Flicking("#flick", {circular: true}).on("flickEnd", {currentTarget} => {
  * 	console.log(currentTarget.getIndex()); // 1 > 2 > 3 > 0 > 1 > 2 > 3 > 0 ...
  * 	console.log(currentTarget.getIndex(true)); // 1 > 1 > 1 > 1 > 1 > 1 > 1 > 1 ...
  * };
  * ```
  * @example
  * ```html
  * <!--Define only two panels.-->
  * <!--패널을 두 개만 정의한다.-->
  * <div id="flick2">
  * 	<div><p>panel 0</p></div>
  * 	<div><p>panel 1</p></div>
  * </div>
  * ```
  * ```javascript
  * // (In the case of circulation) If the number of defined panel elements is less than the minimum number required, the number of panels is created.
  * // Therefore, it is described as 'the number of panel definitions of the contents of the panel.'
  * // (순환인 경우) 정의된 패널 요소의 개수가 필요 최소개수보다 적으면 그 수만큼의 패널을 생성한다.
  * // 그렇기 때문에 '패널이 담고 있는 컨텐트의 패널 정의 순성상의 번호'라고 설명한다.
  * const flick = new eg.Flicking("flick2", {
  * 	circular: true
  * });
  *
  * // The content of the current panel is the first in the panel definition order.
  * // 현재 패널이 담고 있는 컨텐트는 패널 정의 순서상 첫 번째이다.
  * flick.getIndex(); // 0
  *
  * // The content of the next panel is the second in the panel definition order.
  * // 다음 패널이 담고 있는 컨텐트는 패널 정의 순서상 두 번째이다.
  * flick.getNextIndex(); // 1
  *
  * // The content of the previous panel is the second in the panel definition order.
  * // 이전 패널이 담고 있는 컨텐트는 패널 정의 순서상 두 번째이다.
  * flick.getPrevIndex(); // 1
  * ```
  */


	Flicking.prototype.getIndex = function getIndex(physical) {
		return this._conf.panel[physical ? "currIndex" : "currNo"];
	};

	/**
  * Returns the reference of the current panel element.
  * @ko 현재 패널 요소의 레퍼런스를 반환한다.
  * @method eg.Flicking#getElement
  * @return {HTMLElement} Current panel element.<ko>현재 패널 요소.</ko>
  * @see eg.Flicking#getPrevElement
  * @see eg.Flicking#getNextElement
  */


	Flicking.prototype.getElement = function getElement() {
		var panel = this._conf.panel;

		return panel.$list[panel.currIndex];
	};

	/**
  * Returns the reference of the next panel element.
  * @ko 다음 패널 요소의 레퍼런스를 반환한다.
  * @method eg.Flicking#getNextElement
  * @return {HTMLElement|null} Next panel element or `null` if it does not exist.<ko>다음 패널 요소. 패널이 없으면 `null`을 반환한다.</ko>
  * @see eg.Flicking#getElement
  * @see eg.Flicking#getPrevElement
  */


	Flicking.prototype.getNextElement = function getNextElement() {
		return this._getElement(this._conf.dirData[0], true);
	};

	/**
  * Returns the index number of the next panel element.
  * @ko 다음 패널 요소의 인덱스 번호를 반환한다.
  * @method eg.Flicking#getNextIndex
  * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers<br>- true (Physical): Plus one of [getIndex()]{@link eg.Flicking#getIndex} return value.<br>- false (Logical): The value of how the content(innerHTML) of the next panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류.<br>- true (물리적): [getIndex()]{@link eg.Flicking#getIndex} 반환값에 1을 더한 값.<br>- false (논리적): 다음 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
  * @return {Number|null} Index number of the next panel element or null if it does not exist. A zero-based integer.<ko>다음 패널 요소의 인덱스 번호. 0부터 시작하는 정수. 패널이 없으면 `null`을 반환한다.</ko>
  * @see eg.Flicking#getIndex
  * @see eg.Flicking#getPrevIndex
  */


	Flicking.prototype.getNextIndex = function getNextIndex(physical) {
		return this._getElement(this._conf.dirData[0], false, physical);
	};

	/**
  * Returns a reference to all panel elements.
  * @ko 모든 패널 요소의 레퍼런스를 반환한다.
  * @method eg.Flicking#getAllElements
  * @return {HTMLElement[]} Whole panel elements.<ko>모든 패널 요소.</ko>
  */


	Flicking.prototype.getAllElements = function getAllElements() {
		return this._conf.panel.$list;
	};

	/**
  * Returns the reference of the previous panel element.
  * @ko 이전 패널 요소의 레퍼런스를 반환한다.
  * @method eg.Flicking#getPrevElement
  * @return {HTMLElement|null} Previous panel element or `null` if it does not exist.<ko>이전 패널 요소. 패널이 없으면 `null`을 반환한다.</ko>
  * @see eg.Flicking#getElement
  * @see eg.Flicking#getNextElement
  */


	Flicking.prototype.getPrevElement = function getPrevElement() {
		return this._getElement(this._conf.dirData[1], true);
	};

	/**
  * Returns the index number of the previous panel element.
  * @ko 이전 패널 요소의 인덱스 번호를 반환한다.
  * @method eg.Flicking#getPrevIndex
  * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers<br>- true (Physical): Minus one of [getIndex()]{@link eg.Flicking#getIndex} return value.<br>- false (Logical): The value of how the content(innerHTML) of the current panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류<br>- true (물리적): [getIndex()]{@link eg.Flicking#getIndex} 반환값에 1을 뺀 값.<br>- false (논리적): 이전 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
  * @return {Number|null} Previous element index value or null if no more element exist. A zero-based integer.<ko>이전 패널 요소의 인덱스 번호. 0부터 시작하는 정수. 패널이 없는 경우는 `null`.</ko>
  * @see eg.Flicking#getIndex
  * @see eg.Flicking#getNextIndex
  */


	Flicking.prototype.getPrevIndex = function getPrevIndex(physical) {
		return this._getElement(this._conf.dirData[1], false, physical);
	};

	/**
  * Checks whether the animated panel is playing.
  * @ko 패널 이동 애니메이션이 진행 중인지 확인한다.
  * @method eg.Flicking#isPlaying
  * @return {Boolean} Indicates whether the animated panel is playing <ko>패널 이동 애니메이션 진행 중 여부</ko>
  */


	Flicking.prototype.isPlaying = function isPlaying() {
		return this._conf.panel.animating;
	};

	/**
  * Move panel to the given direction
  * @private
  * @param {Boolean} next
  * @param {Number} duration
  */


	Flicking.prototype._movePanel = function _movePanel(next, duration) {
		var conf = this._conf;
		var panel = conf.panel;
		var options = this.options;

		if (panel.animating || conf.touch.holding) {
			return undefined;
		}

		this._setValueToMove(next);

		if (options.circular || this["get" + (next ? "Next" : "Prev") + "Index"]() !== null) {
			this._movePanelByPhase("setBy", panel.size * (next ? 1 : -1), duration);
		}

		return this;
	};

	/**
  * Move panel applying start/end phase value
  * @private
  * @param {String} method Axes' method name
  * @param {Number} to destination value
  * @param {Number} durationValue duration value
  */


	Flicking.prototype._movePanelByPhase = function _movePanelByPhase(method, to, durationValue) {
		var duration = _utils.utils.getNumValue(durationValue, this.options.duration);

		if (this._setPhaseValue("start") !== false) {
			this._setAxes(method, to, duration);
			!duration && this._setPhaseValue("end");
		}
	};

	/**
  * Moves an element to the next panel. If `horizontal=true`is right panel. If `horizontal=false`is lower panel.
  * @ko 다음 패널로 이동한다. `horizontal=true`이면 우측 패널. `horizontal=false`이면 하측 패널.
  * @method eg.Flicking#next
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  * @fires eg.Flicking#beforeFlickStart
  * @fires eg.Flicking#flick
  * @fires eg.Flicking#flickEnd
  * @see eg.Flicking#moveTo
  * @see eg.Flicking#prev
  */


	Flicking.prototype.next = function next(duration) {
		return this._movePanel(true, duration);
	};

	/**
  * Moves an element to the previous panel. If `horizontal=true`is left panel. If `horizontal=false`is upper panel.
  * @ko 이전 패널로 이동한다. `horizontal=true`이면 좌측 패널. `horizontal=false`이면 상측 패널.
  * @method eg.Flicking#prev
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @fires eg.Flicking#beforeFlickStart
  * @fires eg.Flicking#flick
  * @fires eg.Flicking#flickEnd
  * @see eg.Flicking#moveTo
  * @see eg.Flicking#next
  */


	Flicking.prototype.prev = function prev(duration) {
		return this._movePanel(false, duration);
	};

	/**
  * Moves to the panel in the order specified in `noValue`. If noValue is equal to the current logical index numbering, no action is taken. [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}, [flick]{@link eg.Flicking#event:flick}, [flickEnd]{@link eg.Flicking#event:flickEnd} events occur one after the other.
  * @ko `noValue`에 지정한 순서의 패널로 이동한다. `noValue`값이 현재의 논리적 인덱스 번호와 같다면 아무동작 하지 않는다. [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}, [flick]{@link eg.Flicking#event:flick}, [flickEnd]{@link eg.Flicking#event:flickEnd} 이벤트가 차례로 발생한다.
  * @method eg.Flicking#moveTo
  * @param {Number} noValue The logical index number of the panel element to be moved. (Based on the defined order of the panel elements.)<ko>이동할 패널 요소의 논리적 인덱스 번호. ([getIndex()]{@link eg.Flicking#getIndex}메서드 참조.)</ko>
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @fires eg.Flicking#beforeFlickStart
  * @fires eg.Flicking#flick
  * @fires eg.Flicking#flickEnd
  * @see eg.Flicking#prev
  * @see eg.Flicking#next
  */


	Flicking.prototype.moveTo = function moveTo(noValue, duration) {
		var conf = this._conf;
		var panel = conf.panel;
		var circular = this.options.circular;
		var currentIndex = panel.index;
		var indexToMove = void 0;
		var isPositive = void 0;
		var no = noValue;

		no = _utils.utils.getNumValue(no, -1);

		if (no < 0 || no >= panel.origCount || no === panel.no || panel.animating || conf.touch.holding) {
			return this;
		}

		indexToMove = no - (circular ? panel.no : currentIndex);
		isPositive = indexToMove > 0;

		// check for real panel count which can be moved on each sides in circular mode
		if (circular && Math.abs(indexToMove) > (isPositive ? panel.count - (currentIndex + 1) : currentIndex)) {
			indexToMove += (isPositive ? -1 : 1) * panel.count;
			isPositive = indexToMove > 0;
		}

		this._setPanelNo(circular ? { no: no } : { no: no, index: no });
		this._conf.indexToMove = indexToMove;
		this._setValueToMove(isPositive);

		this._movePanelByPhase(circular ? "setBy" : "setTo", panel.size * (circular ? indexToMove : no), duration);

		return this;
	};

	/**
  * The horizontal or vertical length of the panel is updated according to the base element. If `horizontal=true` is horizontal. If `horizontal=false` is vertical.
  * @ko 패널의 가로 혹은 세로 길이를 기준요소에 맞춰 갱신한다. `horizontal=true`이면 가로, `horizontal=false`이면 세로.
  * @method eg.Flicking#resize
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * const flick = new eg.Flicking("#flick", {
  * 	previewPadding: [10, 10]
  * });
  *
  * // When device orientaion changes.
  * // 단말기를 회전했을 때.
  * flick.resize();
  *
  * // Or when changes previewPadding option from its original value.
  * // 또는 previewPadding옵션값을 변경했을 때.
  * flick.options.previewPadding = [20, 30];
  * flick.resize();
  */


	Flicking.prototype.resize = function resize() {
		var conf = this._conf;
		var options = this.options;
		var panel = conf.panel;
		var horizontal = options.horizontal;
		var panelSize = void 0;

		if (!this.isPlaying()) {
			var _utils$css3;

			if (_utils.utils.isArray(options.previewPadding) && typeof +options.previewPadding.join("") === "number") {
				this._setPadding(options.previewPadding.concat());
				panelSize = panel.size;
			} else if (horizontal) {
				panelSize = panel.size = _utils.utils.css(this.$wrapper, "width", true);
			}

			var max = panelSize * (panel.count - 1);
			var maxCoords = this._getDataByDirection([max, 0]);

			// resize elements
			horizontal && _utils.utils.css(this.$container, { width: maxCoords[0] + panelSize + "px" });
			_utils.utils.css(panel.$list, (_utils$css3 = {}, _utils$css3[horizontal ? "width" : "height"] = _utils.utils.getUnitValue(panelSize), _utils$css3));

			// remove data-height attribute and re-evaluate panel's height
			if (options.adaptiveHeight) {
				var $panel = this.$container.querySelectorAll("[" + consts.DATA_HEIGHT + "]");

				if ($panel.length) {
					[].slice.call($panel).forEach(function (v) {
						return v.removeAttribute(consts.DATA_HEIGHT);
					});

					this._setAdaptiveHeight();
				}
			}

			this._axesInst.axis.flick.range = [0, max];
			this._setAxes("setTo", panelSize * panel.index, 0);

			if (consts.IS_ANDROID2) {
				this._applyPanelsPos();
				this._adjustContainerCss("end");
			}
		}

		return this;
	};

	/**
  * Return the panel to its original position. (It only works when the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event is canceled.) [beforeRestore]{@link eg.Flicking#event:beforeRestore}, [flick]{@link eg.Flicking#event:flick}, [restore]{@link eg.Flicking#event:restore} events are occur in order.
  * @ko 패널의 위치를 원래 자리로 되돌린다. ([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} 이벤트의 기본동작을 취소한 경우에만 동작함.) [beforeRestore]{@link eg.Flicking#event:beforeRestore}, [flick]{@link eg.Flicking#event:flick}, [restore]{@link eg.Flicking#event:restore} 이벤트가 차례로 발생한다.
  * @method eg.Flicking#restore
  * @param {Number} [durationValue=options.duration] Duration of the panel movement (unit: ms)<ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @fires eg.Flicking#event:beforeRestore
  * @fires eg.Flicking#event:flick
  * @fires eg.Flicking#event:restore
  * @example
  * new eg.Flicking("#flick").on("beforeFlickStart", e => {
  * 	if (e.no === 2) {
  * 		// Cancels the default behavior of the 'beforeFlickStart' event.
  * 		// 'beforeFlickStart' 이벤트 기본동작 취소.
  * 		e.stop();
  *
  * 		// Return to original position.
  * 		// 원래 자리로 되돌림.
  * 		this.restore(100);
  * 	}
  * });
  */


	Flicking.prototype.restore = function restore(durationValue) {
		var conf = this._conf;
		var panel = conf.panel;
		var currPos = this._axesInst.get().flick;
		var duration = durationValue;
		var destPos = void 0;

		// check if the panel isn't in right position
		if (currPos !== panel.currIndex * panel.size) {
			conf.customEvent.restoreCall = true;
			duration = _utils.utils.getNumValue(duration, this.options.duration);

			this._revertPanelNo();
			destPos = panel.size * panel.index;

			this._triggerBeforeRestore({ depaPos: currPos, destPos: destPos });
			this._setAxes("setTo", destPos, duration);

			if (!duration) {
				this._adjustContainerCss("end");
				this._triggerRestore();
			}

			// to handle on api call
		} else if (panel.changed) {
			this._revertPanelNo();
			conf.touch.distance = conf.indexToMove = 0;
		}

		return this;
	};

	/**
  * The input from the input device is not blocked so that the panel can be moved by the input device.
  * @ko 막았던 입력 장치로부터의 입력을 푼다.
  * @method eg.Flicking#enableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  * @see eg.Flicking#disableInput
  */


	Flicking.prototype.enableInput = function enableInput() {
		this._panInput.enable();
		return this;
	};

	/**
  * The input from the input device is blocked so that the panel is not moved by the input device.
  * @ko 패널이 입력 장치에 의해 움직이지 않도록 입력 장치로부터의 입력을 막는다.
  * @method eg.Flicking#disableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  * @see eg.Flicking#enableInput
  */


	Flicking.prototype.disableInput = function disableInput() {
		this._panInput.disable();
		return this;
	};

	/**
  * Get current flicking status. If the returned value is specified as a [setStatus()]{@link eg.Flicking#setStatus} method argument, it can be returned to its value state.
  * @ko 현재 상태 값을 반환한다. 반환받은 값을 [setStatus()]{@link eg.Flicking#setStatus} 메서드 인자로 지정하면 그 값 상태로 되돌릴 수 있다.
  * @method eg.Flicking#getStatus
  * @param {Boolean} [stringify] Set true if want get stringified status value.<ko>true 지정시 json문자열 형태로 반환한다.</ko>
  * @return {Status|String} An object with current state value information.<ko>현재 상태값 정보를 가진 객체.</ko>
  * @see eg.Flicking#setStatus
  * @example
  * const flick = new eg.Flicking("flick");
  * const status = flick.getStatus();
  * const jsonStaus = flick.getStatus(true);
  *
  * console.log(status); // {panel: {...}, $list: Array(7)}
  * console.log(jsonStatus); // "{\"panel\":{\"index\":3,\"no\":6,\"currIndex\":3,\"currNo\":6},\"$list\":[{\"style\":\"background-color: rgb(155, 49, 137); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 3&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(51, 172, 91); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 4&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(116, 38, 241); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 5&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(141, 139, 24); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 6&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(204, 102, 204); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 0&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(54, 53, 156); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 1&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(196, 218, 72); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 2&lt;/p&gt;\n\t\t\t\t\t\t\"}]}"
  */
	/**
  * The return value specification of the getStatus () method.
  * @ko getStatus() 메서드의 반환값 명세.
  * @typedef {Object} Status
  * @property {Object} panel current panel position<ko>현재 패널 위치</ko>
  * @property {Number} panel.index Physical index number.<ko>물리적 인덱스 번호.</ko>
  * @property {Number} panel.currIndex Current physical index number.<ko>현재 물리적 인덱스 번호.</ko>
  * @property {Number} panel.no Logical index number.<ko>논리적 인덱스 번호.</ko>
  * @property {Number} panel.currNo Current logical index number.<ko>현재 논리적 인덱스 번호.</ko>
  * @property {Array.<{style: String, className: String, html: String}>} $list panel's html<ko>패널 정보</ko>
  * @property {Object} $list.obj For convenience, the element is denoted by obj.<ko>편의상 원소를 obj로 표기함</ko>
  * @property {String} $list.obj.style The value of the style attribute of the panel element. ('transform', 'left', 'top', 'will-change', 'box-sizing', 'width' style has been deleted.)<ko>패널 요소의 style 속성 값. ('transform', 'left', 'top', 'will-change', 'box-sizing', 'width' style은 삭제됨)</ko>
  * @property {String} $list.obj.className The class name of the panel element.<ko>패널 요소의 class 이름.</ko>
  * @property {String} $list.obj.html The innerHTML value of the panel element.<ko>패널 요소의 innerHTML 값.</ko>
  * @see eg.Flicking#getIndex
  */


	Flicking.prototype.getStatus = function getStatus(stringify) {
		var panel = this._conf.panel;
		var rxStyle = /((?:-webkit-)?transform|left|top|will-change|box-sizing|width):[^;]*;/g;
		var status = {
			// current panel position
			panel: {
				index: panel.index,
				no: panel.no,
				currIndex: panel.currIndex,
				currNo: panel.currNo
			},

			// panel's html
			$list: panel.$list.map(function (v) {
				return {
					style: v.style.cssText.replace(rxStyle, "").trim(),
					className: v.className,
					html: v.innerHTML
				};
			})
		};

		return stringify ? JSON.stringify(status) : status;
	};

	/**
  * Restore to the state of the `statusValue`.
  * @ko `statusValue`의 상태로 복원한다.
  * @method eg.Flicking#setStatus
  * @param {Status|String} statusValue Status value to be restored. You can specify the return value of the [getStatus()]{@link eg.Flicking#getStatus} method.<ko>복원할 상태 값. [getStatus()]{@link eg.Flicking#getStatus}메서드 반환값을 지정하면 된다.</ko>
  * @see eg.Flicking#getStatus
  * @example
  * const flick = new eg.Flicking("flick");
  * const status = flick.getStatus();
  *
  * // Move to arbitrary panel.
  * // 임의 패널로 이동
  * flick.moveTo(2);
  *
  * // Restore to status.
  * // status 상태로 복원
  * flick.setStatus(status);
  */


	Flicking.prototype.setStatus = function setStatus(statusValue) {
		var panel = this._conf.panel;
		var isAdaptiveHeight = this.options.adaptiveHeight;
		var status = typeof statusValue === "string" ? JSON.parse(statusValue) : statusValue;

		if (status) {
			for (var x in status.panel) {
				x in panel && (panel[x] = status.panel[x]);
			}

			panel.$list.forEach(function (v, i) {
				var data = status.$list[i];
				var style = data.style;
				var className = data.className;
				var html = data.html;

				style && (v.style.cssText += style);
				className && (v.className = className);
				html && (v.innerHTML = html);
			});

			isAdaptiveHeight && this._setAdaptiveHeight();
		}
	};

	/**
  * Returns the reference element and its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).
  * @ko 기준 요소와 그 하위 요소를 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.
  * @method eg.Flicking#destroy
  * @example
  * const flick = new eg.Flicking("flick");
  * flick.destroy();
  * console.log(flick.moveTo); // null
  */


	Flicking.prototype.destroy = function destroy() {
		var conf = this._conf;
		var origPanelStyle = conf.origPanelStyle;
		var wrapper = origPanelStyle.wrapper;
		var container = origPanelStyle.container;
		var list = origPanelStyle.list;

		// unwrap container element and restore original inline style
		// restore wrapper style
		var $wrapper = this.$wrapper;

		$wrapper.setAttribute("class", wrapper.className);
		$wrapper[wrapper.style ? "setAttribute" : "removeAttribute"]("style", wrapper.style);

		// restore container style
		var $container = this.$container;
		var $children = [].slice.call($container.children);

		if (origPanelStyle.container.className) {
			$container.setAttribute("class", container.className);
			$container[container.style ? "setAttribute" : "removeAttribute"]("style", container.style);
		} else {
			$children.forEach(function (v) {
				return $wrapper.appendChild(v);
			});
			$container.parentNode.removeChild($container);
		}

		for (var i = 0, $el; $el = $children[i]; i++) {
			if (i > list.length - 1) {
				$el.parentNode.removeChild($el);
			} else {
				var className = list[i].className;
				var style = list[i].style;

				$el[className ? "setAttribute" : "removeAttribute"]("class", className);
				$el[style ? "setAttribute" : "removeAttribute"]("style", style);
			}
		}

		// unbind events
		this._bindEvents(false);
		this.off();

		// destroy eg.Axes instance
		this._axesInst.destroy();
		this._panInput.destroy();

		// release resources
		for (var x in this) {
			this[x] = null;
		}
	};

	/**
  * Constant value for none direction.
  * @ko none 방향에 대한 상수 값.
  * @name DIRECTION_NONE
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 1
  */


	/**
  * Constant value for left direction.
  * @ko left 방향에 대한 상수 값.
  * @name DIRECTION_LEFT
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 2
  */


	/**
  * Constant value for right direction.
  * @ko right 방향에 대한 상수 값.
  * @name DIRECTION_RIGHT
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 4
  */


	/**
  * Constant value for up direction.
  * @ko up 방향에 대한 상수 값.
  * @name DIRECTION_UP
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 8
  */


	/**
  * Constant value for down direction.
  * @ko down 방향에 대한 상수 값.
  * @name DIRECTION_DOWN
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 16
  */


	/**
  * Constant value for horizontal direction.
  * @ko horizontal 방향에 대한 상수 값.
  * @name DIRECTION_HORIZONTAL
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 6
  */


	/**
  * Constant value for vertical direction.
  * @ko vertical 방향에 대한 상수 값.
  * @name DIRECTION_VERTICAL
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 24
  */


	/**
  * Constant value for all direction.
  * @ko all 방향에 대한 상수 값.
  * @name DIRECTION_ALL
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 30
  */


	return Flicking;
}((0, _utils.Mixin)(_component2["default"])["with"](_eventHandler2["default"]));

Flicking.DIRECTION_NONE = _axes2["default"].DIRECTION_NONE;
Flicking.DIRECTION_LEFT = _axes2["default"].DIRECTION_LEFT;
Flicking.DIRECTION_RIGHT = _axes2["default"].DIRECTION_RIGHT;
Flicking.DIRECTION_UP = _axes2["default"].DIRECTION_UP;
Flicking.DIRECTION_DOWN = _axes2["default"].DIRECTION_DOWN;
Flicking.DIRECTION_HORIZONTAL = _axes2["default"].DIRECTION_HORIZONTAL;
Flicking.DIRECTION_VERTICAL = _axes2["default"].DIRECTION_VERTICAL;
Flicking.DIRECTION_ALL = _axes2["default"].DIRECTION_ALL;
exports["default"] = Flicking;
module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Axes_1 = __webpack_require__(12);
var PanInput_1 = __webpack_require__(17);
exports.PanInput = PanInput_1.PanInput;
var PinchInput_1 = __webpack_require__(18);
exports.PinchInput = PinchInput_1.PinchInput;
var WheelInput_1 = __webpack_require__(19);
exports.WheelInput = WheelInput_1.WheelInput;
var MoveKeyInput_1 = __webpack_require__(20);
exports.MoveKeyInput = MoveKeyInput_1.MoveKeyInput;
exports["default"] = Axes_1["default"];


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Component = __webpack_require__(6);
var AnimationManager_1 = __webpack_require__(13);
var EventManager_1 = __webpack_require__(14);
var InterruptManager_1 = __webpack_require__(15);
var AxisManager_1 = __webpack_require__(3);
var InputObserver_1 = __webpack_require__(16);
var const_1 = __webpack_require__(7);
/**
 * @typedef {Object} AxisOption The Axis information. The key of the axis specifies the name to use as the logical virtual coordinate system.
 * @ko 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.
 * @property {Number[]} [range] The coordinate of range <ko>좌표 범위</ko>
 * @property {Number} [range.0=0] The coordinate of the minimum <ko>최소 좌표</ko>
 * @property {Number} [range.1=0] The coordinate of the maximum <ko>최대 좌표</ko>
 * @property {Number[]} [bounce] The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
 * @property {Number} [bounce.0=0] The size of coordinate of the minimum area <ko>최소 좌표 바운스 영역의 크기</ko>
 * @property {Number} [bounce.1=0] The size of coordinate of the maximum area <ko>최대 좌표 바운스 영역의 크기</ko>
 * @property {Boolean[]} [circular] Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
 * @property {Boolean} [circular.0=false] Indicates whether to circulate to the coordinate of the minimum <ko>최소 좌표 방향의 순환 여부</ko>
 * @property {Boolean} [circular.1=false] Indicates whether to circulate to the coordinate of the maximum <ko>최대 좌표 방향의 순환 여부</ko>
**/
/**
 * @typedef {Object} AxesOption The option object of the eg.Axes module
 * @ko eg.Axes 모듈의 옵션 객체
 * @property {Function} [easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
 * @property {Number} [maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
 * @property {Number} [minimumDuration=0] Minimum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최소 좌표 이동 시간</ko>
 * @property {Number} [deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
 * @property {Boolean} [interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>진행 중인 애니메이션 중지 가능 여부.<br>- true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.<br>- false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
**/
/**
 * @class eg.Axes
 * @classdesc A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions.
 * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치를 통해 전달 받은 사용자의 동작을 논리적인 가상 좌표로 변경하는 모듈이다. 사용자 동작에 반응하는 UI를 손쉽게 만들수 있다.
 * @extends eg.Component
 *
 * @param {Object.<string, AxisOption>} axis Axis information managed by eg.Axes. The key of the axis specifies the name to use as the logical virtual coordinate system.  <ko>eg.Axes가 관리하는 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.</ko>
 * @param {AxesOption} [options] The option object of the eg.Axes module<ko>eg.Axes 모듈의 옵션 객체</ko>
 * @param {Object.<string, number>} [startPos] The coordinates to be moved when creating an instance. not triggering change event.<ko>인스턴스 생성시 이동할 좌표, change 이벤트는 발생하지 않음.</ko>
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 * @example
 *
 * // 1. Initialize eg.Axes
 * const axes = new eg.Axes({
 *	something1: {
 *		range: [0, 150],
 *		bounce: 50
 *	},
 *	something2: {
 *		range: [0, 200],
 *		bounce: 100
 *	},
 *	somethingN: {
 *		range: [1, 10],
 *	}
 * }, {
 *  deceleration : 0.0024
 * });
 *
 * // 2. attach event handler
 * axes.on({
 *	"hold" : function(evt) {
 *	},
 *	"release" : function(evt) {
 *	},
 *	"animationStart" : function(evt) {
 *	},
 *	"animationEnd" : function(evt) {
 *	},
 *	"change" : function(evt) {
 *	}
 * });
 *
 * // 3. Initialize inputTypes
 * const panInputArea = new eg.Axes.PanInput("#area", {
 *	scale: [0.5, 1]
 * });
 * const panInputHmove = new eg.Axes.PanInput("#hmove");
 * const panInputVmove = new eg.Axes.PanInput("#vmove");
 * const pinchInputArea = new eg.Axes.PinchInput("#area", {
 *	scale: 1.5
 * });
 *
 * // 4. Connect eg.Axes and InputTypes
 * // [PanInput] When the mouse or touchscreen is down and moved.
 * // Connect the 'something2' axis to the mouse or touchscreen x position and
 * // connect the 'somethingN' axis to the mouse or touchscreen y position.
 * axes.connect(["something2", "somethingN"], panInputArea); // or axes.connect("something2 somethingN", panInputArea);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position.
 * axes.connect(["something1"], panInputHmove); // or axes.connect("something1", panInputHmove);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position.
 * axes.connect(["", "something2"], panInputVmove); // or axes.connect(" something2", panInputVmove);
 *
 * // [PinchInput] Connect 'something2' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something2", pinchInputArea);
 */
var Axes = /** @class */ (function (_super) {
    __extends(Axes, _super);
    function Axes(axis, options, startPos) {
        if (axis === void 0) { axis = {}; }
        var _this = _super.call(this) || this;
        _this.axis = axis;
        _this._inputs = [];
        _this.options = __assign({
            easing: function easeOutCubic(x) {
                return 1 - Math.pow(1 - x, 3);
            },
            interruptable: true,
            maximumDuration: Infinity,
            minimumDuration: 0,
            deceleration: 0.0006
        }, options);
        _this.itm = new InterruptManager_1.InterruptManager(_this.options);
        _this.axm = new AxisManager_1.AxisManager(_this.axis, _this.options);
        _this.em = new EventManager_1.EventManager(_this);
        _this.am = new AnimationManager_1.AnimationManager(_this);
        _this.io = new InputObserver_1.InputObserver(_this);
        _this.em.setAnimationManager(_this.am);
        startPos && _this.em.triggerChange(startPos);
        return _this;
    }
    /**
     * Connect the axis of eg.Axes to the inputType.
     * @ko eg.Axes의 축과 inputType을 연결한다
     * @method eg.Axes#connect
     * @param {(String[]|String)} axes The name of the axis to associate with inputType <ko>inputType과 연결할 축의 이름</ko>
     * @param {Object} inputType The inputType instance to associate with the axis of eg.Axes <ko>eg.Axes의 축과 연결할 inputType 인스턴스<ko>
     * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   }
     * });
     *
     * axes.connect("x", new eg.Axes.PanInput("#area1"))
     *    .connect("x xOther", new eg.Axes.PanInput("#area2"))
     *    .connect(" xOther", new eg.Axes.PanInput("#area3"))
     *    .connect(["x"], new eg.Axes.PanInput("#area4"))
     *    .connect(["xOther", "x"], new eg.Axes.PanInput("#area5"))
     *    .connect(["", "xOther"], new eg.Axes.PanInput("#area6"));
     */
    Axes.prototype.connect = function (axes, inputType) {
        var mapped;
        if (typeof axes === "string") {
            mapped = axes.split(" ");
        }
        else {
            mapped = axes.concat();
        }
        // check same instance
        if (~this._inputs.indexOf(inputType)) {
            this.disconnect(inputType);
        }
        // check same element in hammer type for share
        if ("hammer" in inputType) {
            var targets = this._inputs.filter(function (v) { return v.hammer && v.element === inputType.element; });
            if (targets.length) {
                inputType.hammer = targets[0].hammer;
            }
        }
        inputType.mapAxes(mapped);
        inputType.connect(this.io);
        this._inputs.push(inputType);
        return this;
    };
    /**
     * Disconnect the axis of eg.Axes from the inputType.
     * @ko eg.Axes의 축과 inputType의 연결을 끊는다.
     * @method eg.Axes#disconnect
     * @param {Object} [inputType] An inputType instance associated with the axis of eg.Axes <ko>eg.Axes의 축과 연결한 inputType 인스턴스<ko>
     * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   }
     * });
     *
     * const input1 = new eg.Axes.PanInput("#area1");
     * const input2 = new eg.Axes.PanInput("#area2");
     * const input3 = new eg.Axes.PanInput("#area3");
     *
     * axes.connect("x", input1);
     *    .connect("x xOther", input2)
     *    .connect(["xOther", "x"], input3);
     *
     * axes.disconnect(input1); // disconnects input1
     * axes.disconnect(); // disconnects all of them
     */
    Axes.prototype.disconnect = function (inputType) {
        if (inputType) {
            var index = this._inputs.indexOf(inputType);
            if (index >= 0) {
                this._inputs[index].disconnect();
                this._inputs.splice(index, 1);
            }
        }
        else {
            this._inputs.forEach(function (v) { return v.disconnect(); });
            this._inputs = [];
        }
        return this;
    };
    /**
     * Returns the current position of the coordinates.
     * @ko 좌표의 현재 위치를 반환한다
     * @method eg.Axes#get
     * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
     * @return {Object.<string, number>} Axis coordinate information <ko>축 좌표 정보</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   },
     * 	 "zoom": {
     *      range: [50, 30]
     *   }
     * });
     *
     * axes.get(); // {"x": 0, "xOther": -100, "zoom": 50}
     * axes.get(["x", "zoom"]); // {"x": 0, "zoom": 50}
     */
    Axes.prototype.get = function (axes) {
        return this.axm.get(axes);
    };
    /**
     * Moves an axis to specific coordinates.
     * @ko 좌표를 이동한다.
     * @method eg.Axes#setTo
     * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
     * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   },
     * 	 "zoom": {
     *      range: [50, 30]
     *   }
     * });
     *
     * axes.setTo({"x": 30, "zoom": 60});
     * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
     *
     * axes.setTo({"x": 100, "xOther": 60}, 1000); // animatation
     *
     * // after 1000 ms
     * axes.get(); // {"x": 100, "xOther": 60, "zoom": 60}
     */
    Axes.prototype.setTo = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        this.am.setTo(pos, duration);
        return this;
    };
    /**
     * Moves an axis from the current coordinates to specific coordinates.
     * @ko 현재 좌표를 기준으로 좌표를 이동한다.
     * @method eg.Axes#setBy
     * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
     * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   },
     * 	 "zoom": {
     *      range: [50, 30]
     *   }
     * });
     *
     * axes.setBy({"x": 30, "zoom": 10});
     * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
     *
     * axes.setBy({"x": 70, "xOther": 60}, 1000); // animatation
     *
     * // after 1000 ms
     * axes.get(); // {"x": 100, "xOther": -40, "zoom": 60}
     */
    Axes.prototype.setBy = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        this.am.setBy(pos, duration);
        return this;
    };
    /**
     * Returns whether there is a coordinate in the bounce area of ​​the target axis.
     * @ko 대상 축 중 bounce영역에 좌표가 존재하는지를 반환한다
     * @method eg.Axes#isBounceArea
     * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
     * @return {Boolen} Whether the bounce area exists. <ko>bounce 영역 존재 여부</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "xOther": {
     *      range: [-100, 100]
     *   },
     * 	 "zoom": {
     *      range: [50, 30]
     *   }
     * });
     *
     * axes.isBounceArea(["x"]);
     * axes.isBounceArea(["x", "zoom"]);
     * axes.isBounceArea();
     */
    Axes.prototype.isBounceArea = function (axes) {
        return this.axm.isOutside(axes);
    };
    /**
    * Destroys properties, and events used in a module and disconnect all connections to inputTypes.
    * @ko 모듈에 사용한 속성, 이벤트를 해제한다. 모든 inputType과의 연결을 끊는다.
    * @method eg.Axes#destroy
    */
    Axes.prototype.destroy = function () {
        this.disconnect();
        this.em.destroy();
    };
    Axes.VERSION = "2.2.0";
    /**
     * @name eg.Axes.TRANSFORM
     * @desc Returns the transform attribute with CSS vendor prefixes.
     * @ko CSS vendor prefixes를 붙인 transform 속성을 반환한다.
     *
     * @constant
     * @type {String}
     * @example
     * eg.Axes.TRANSFORM; // "transform" or "webkitTransform"
     */
    Axes.TRANSFORM = const_1.TRANSFORM;
    /**
     * @name eg.Axes.DIRECTION_NONE
     * @constant
     * @type {Number}
     */
    Axes.DIRECTION_NONE = const_1.DIRECTION.DIRECTION_NONE;
    /**
     * @name eg.Axes.DIRECTION_LEFT
     * @constant
     * @type {Number}
    */
    Axes.DIRECTION_LEFT = const_1.DIRECTION.DIRECTION_LEFT;
    /**
     * @name eg.Axes.DIRECTION_RIGHT
     * @constant
     * @type {Number}
    */
    Axes.DIRECTION_RIGHT = const_1.DIRECTION.DIRECTION_RIGHT;
    /**
     * @name eg.Axes.DIRECTION_UP
     * @constant
     * @type {Number}
    */
    Axes.DIRECTION_UP = const_1.DIRECTION.DIRECTION_UP;
    /**
     * @name eg.Axes.DIRECTION_DOWN
     * @constant
     * @type {Number}
    */
    Axes.DIRECTION_DOWN = const_1.DIRECTION.DIRECTION_DOWN;
    /**
     * @name eg.Axes.DIRECTION_HORIZONTAL
     * @constant
     * @type {Number}
    */
    Axes.DIRECTION_HORIZONTAL = const_1.DIRECTION.DIRECTION_HORIZONTAL;
    /**
     * @name eg.Axes.DIRECTION_VERTICAL
     * @constant
     * @type {Number}
    */
    Axes.DIRECTION_VERTICAL = const_1.DIRECTION.DIRECTION_VERTICAL;
    /**
     * @name eg.Axes.DIRECTION_ALL
     * @constant
     * @type {Number}
    */
    Axes.DIRECTION_ALL = const_1.DIRECTION.DIRECTION_ALL;
    return Axes;
}(Component));
exports["default"] = Axes;
;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Coordinate_1 = __webpack_require__(2);
var AxisManager_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var AnimationManager = /** @class */ (function () {
    function AnimationManager(_a) {
        var options = _a.options, itm = _a.itm, em = _a.em, axm = _a.axm;
        this.options = options;
        this.itm = itm;
        this.em = em;
        this.axm = axm;
        this.animationEnd = this.animationEnd.bind(this);
    }
    AnimationManager.getDuration = function (duration, min, max) {
        return Math.max(Math.min(duration, max), min);
    };
    AnimationManager.prototype.getDuration = function (depaPos, destPos, wishDuration) {
        var _this = this;
        var duration;
        if (typeof wishDuration !== "undefined") {
            duration = wishDuration;
        }
        else {
            var durations_1 = this.axm.map(destPos, function (v, k) { return Coordinate_1["default"].getDuration(Math.abs(Math.abs(v) - Math.abs(depaPos[k])), _this.options.deceleration); });
            duration = Object.keys(durations_1).reduce(function (max, v) { return Math.max(max, durations_1[v]); }, -Infinity);
        }
        return AnimationManager.getDuration(duration, this.options.minimumDuration, this.options.maximumDuration);
    };
    AnimationManager.prototype.createAnimationParam = function (pos, duration, option) {
        var depaPos = this.axm.get();
        var destPos = pos;
        var inputEvent = option && option.event || null;
        return {
            depaPos: depaPos,
            destPos: destPos,
            duration: AnimationManager.getDuration(duration, this.options.minimumDuration, this.options.maximumDuration),
            delta: this.axm.getDelta(depaPos, destPos),
            inputEvent: inputEvent,
            input: option && option.input || null,
            isTrusted: !!inputEvent,
            done: this.animationEnd
        };
    };
    AnimationManager.prototype.grab = function (axes, option) {
        if (this._animateParam && axes.length) {
            var orgPos_1 = this.axm.get(axes);
            var pos = this.axm.map(orgPos_1, function (v, k, opt) { return Coordinate_1["default"].getCirculatedPos(v, opt.range, opt.circular); });
            if (!this.axm.every(pos, function (v, k) { return orgPos_1[k] === v; })) {
                this.em.triggerChange(pos, option, !!option);
            }
            this._animateParam = null;
            this._raf && utils_1.cancelAnimationFrame(this._raf);
            this._raf = null;
            this.em.triggerAnimationEnd(!!(option && option.event));
        }
    };
    AnimationManager.prototype.getEventInfo = function () {
        if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
            return {
                input: this._animateParam.input,
                event: this._animateParam.inputEvent
            };
        }
        else {
            return null;
        }
    };
    AnimationManager.prototype.restore = function (option) {
        var pos = this.axm.get();
        var destPos = this.axm.map(pos, function (v, k, opt) { return Math.min(opt.range[1], Math.max(opt.range[0], v)); });
        this.animateTo(destPos, this.getDuration(pos, destPos), option);
    };
    AnimationManager.prototype.animationEnd = function () {
        var beforeParam = this.getEventInfo();
        this._animateParam = null;
        // for Circular
        var circularTargets = this.axm.filter(this.axm.get(), function (v, k, opt) { return Coordinate_1["default"].isCircularable(v, opt.range, opt.circular); });
        Object.keys(circularTargets).length > 0 && this.setTo(this.axm.map(circularTargets, function (v, k, opt) { return Coordinate_1["default"].getCirculatedPos(v, opt.range, opt.circular); }));
        this.itm.setInterrupt(false);
        this.em.triggerAnimationEnd(!!beforeParam);
        if (this.axm.isOutside()) {
            this.restore(beforeParam);
        }
        else {
            this.em.triggerFinish(!!beforeParam);
        }
    };
    AnimationManager.prototype.animateLoop = function (param, complete) {
        this._animateParam = __assign({}, param);
        this._animateParam.startTime = new Date().getTime();
        if (param.duration) {
            var info_1 = this._animateParam;
            var self_1 = this;
            (function loop() {
                self_1._raf = null;
                if (self_1.frame(info_1) >= 1) {
                    if (!AxisManager_1.AxisManager.equal(param.destPos, self_1.axm.get(Object.keys(param.destPos)))) {
                        self_1.em.triggerChange(param.destPos);
                    }
                    complete();
                    return;
                } // animationEnd
                self_1._raf = utils_1.requestAnimationFrame(loop);
            })();
        }
        else {
            this.em.triggerChange(param.destPos);
            complete();
        }
    };
    AnimationManager.prototype.getUserControll = function (param) {
        var userWish = param.setTo();
        userWish.destPos = this.axm.get(userWish.destPos);
        userWish.duration = AnimationManager.getDuration(userWish.duration, this.options.minimumDuration, this.options.maximumDuration);
        return userWish;
    };
    AnimationManager.prototype.animateTo = function (destPos, duration, option) {
        var _this = this;
        var param = this.createAnimationParam(destPos, duration, option);
        var depaPos = __assign({}, param.depaPos);
        var retTrigger = this.em.triggerAnimationStart(param);
        // to control
        var userWish = this.getUserControll(param);
        // You can't stop the 'animationStart' event when 'circular' is true.
        if (!retTrigger && this.axm.every(userWish.destPos, function (v, k, opt) { return Coordinate_1["default"].isCircularable(v, opt.range, opt.circular); })) {
            console.warn("You can't stop the 'animation' event when 'circular' is true.");
        }
        if (retTrigger && !AxisManager_1.AxisManager.equal(userWish.destPos, depaPos)) {
            var inputEvent = option && option.event || null;
            this.animateLoop({
                depaPos: depaPos,
                destPos: userWish.destPos,
                duration: userWish.duration,
                delta: this.axm.getDelta(depaPos, userWish.destPos),
                isTrusted: !!inputEvent,
                inputEvent: inputEvent,
                input: option && option.input || null
            }, function () { return _this.animationEnd(); });
        }
    };
    // animation frame (0~1)
    AnimationManager.prototype.frame = function (param) {
        var curTime = new Date().getTime() - param.startTime;
        var easingPer = this.easing(curTime / param.duration);
        var toPos = param.depaPos;
        toPos = this.axm.map(toPos, function (v, k, opt) {
            v += param.delta[k] * easingPer;
            return Coordinate_1["default"].getCirculatedPos(v, opt.range, opt.circular);
        });
        this.em.triggerChange(toPos);
        return easingPer;
    };
    AnimationManager.prototype.easing = function (p) {
        return p > 1 ? 1 : this.options.easing(p);
    };
    AnimationManager.prototype.setTo = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        var axes = Object.keys(pos);
        this.grab(axes);
        var orgPos = this.axm.get(axes);
        if (AxisManager_1.AxisManager.equal(pos, orgPos)) {
            return this;
        }
        this.itm.setInterrupt(true);
        var movedPos = this.axm.filter(pos, function (v, k) { return orgPos[k] !== v; });
        if (!Object.keys(movedPos).length) {
            return this;
        }
        movedPos = this.axm.map(movedPos, function (v, k, opt) {
            if (opt.circular && (opt.circular[0] || opt.circular[1])) {
                return duration > 0 ? v : Coordinate_1["default"].getCirculatedPos(v, opt.range, opt.circular);
            }
            else {
                return Coordinate_1["default"].getInsidePosition(v, opt.range, opt.circular);
            }
        });
        if (AxisManager_1.AxisManager.equal(movedPos, orgPos)) {
            return this;
        }
        if (duration > 0) {
            this.animateTo(movedPos, duration);
        }
        else {
            this.em.triggerChange(movedPos);
            this.itm.setInterrupt(false);
        }
        return this;
    };
    AnimationManager.prototype.setBy = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        return this.setTo(this.axm.map(this.axm.get(Object.keys(pos)), function (v, k) { return v + pos[k]; }), duration);
    };
    return AnimationManager;
}());
exports.AnimationManager = AnimationManager;
;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var EventManager = /** @class */ (function () {
    function EventManager(axes) {
        this.axes = axes;
    }
    /**
     * This event is fired when a user holds an element on the screen of the device.
     * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
     * @name eg.Axes#hold
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Object.<string, number>} pos coordinate <ko>좌표 정보</ko>
     * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
     * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("hold", function(event) {
     *   // event.pos
     *   // event.input
     *   // event.inputEvent
     *   // isTrusted
     * });
     */
    EventManager.prototype.triggerHold = function (pos, option) {
        this.axes.trigger("hold", {
            pos: pos,
            input: option.input || null,
            inputEvent: option.event || null,
            isTrusted: true
        });
    };
    /** Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
     * @ko 'change' 이벤트 이후 이동할 좌표를 지정한다. change이벤트의 holding 값이 true일 경우에 동작한다
     * @name set
   * @function
     * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("change", function(event) {
     *   event.holding && event.set({x: 10});
     * });
     */
    /** Specifies the animation coordinates to move after the 'release' or 'animationStart' events.
     * @ko 'release' 또는 'animationStart' 이벤트 이후 이동할 좌표를 지정한다.
     * @name setTo
   * @function
     * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
     * @param {Number} [duration] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("animationStart", function(event) {
     *   event.setTo({x: 10}, 2000);
     * });
     */
    /**
     * This event is fired when a user release an element on the screen of the device.
     * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
     * @name eg.Axes#release
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Object.<string, number>} depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
     * @property {Object.<string, number>} destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
     * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
     * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
     * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
     * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("release", function(event) {
     *   // event.depaPos
     *   // event.destPos
     *   // event.delta
     *   // event.input
     *   // event.inputEvent
     *   // event.setTo
     *   // event.isTrusted
     *
     *   // if you want to change the animation coordinates to move after the 'release' event.
     *   event.setTo({x: 10}, 2000);
     * });
     */
    EventManager.prototype.triggerRelease = function (param) {
        param.setTo = this.createUserControll(param.destPos, param.duration);
        this.axes.trigger("release", param);
    };
    /**
     * This event is fired when coordinate changes.
     * @ko 좌표가 변경됐을 때 발생하는 이벤트
     * @name eg.Axes#change
     * @event
     * @type {object} The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Object.<string, number>} pos  The coordinate <ko>좌표</ko>
     * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
     * @property {Boolean} holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
     * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
     * @property {Object} inputEvent The event object received from inputType. If the value is changed by animation, it returns 'null'.<ko>inputType으로 부터 받은 이벤트 객체. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
     * @property {set} set Specifies the coordinates to move after the event. It works when the holding value is true <ko>이벤트 이후 이동할 좌표를 지정한다. holding 값이 true일 경우에 동작한다.</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("change", function(event) {
     *   // event.pos
     *   // event.delta
     *   // event.input
     *   // event.inputEvent
     *   // event.holding
     *   // event.set
     *   // event.isTrusted
     *
     *   // if you want to change the coordinates to move after the 'change' event.
     *   // it works when the holding value of the change event is true.
     *   event.holding && event.set({x: 10});
     * });
     */
    EventManager.prototype.triggerChange = function (pos, option, holding) {
        if (option === void 0) { option = null; }
        if (holding === void 0) { holding = false; }
        var eventInfo = this.am.getEventInfo();
        var moveTo = this.am.axm.moveTo(pos);
        var inputEvent = option && option.event || eventInfo && eventInfo.event || null;
        var param = {
            pos: moveTo.pos,
            delta: moveTo.delta,
            holding: holding,
            inputEvent: inputEvent,
            isTrusted: !!inputEvent,
            input: option && option.input || eventInfo && eventInfo.input || null,
            set: inputEvent ? this.createUserControll(moveTo.pos) : function () { }
        };
        this.axes.trigger("change", param);
        inputEvent && this.am.axm.set(param.set()["destPos"]);
    };
    /**
     * This event is fired when animation starts.
     * @ko 에니메이션이 시작할 때 발생한다.
     * @name eg.Axes#animationStart
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Object.<string, number>} depaPos The coordinates when animation starts<ko>애니메이션이 시작 되었을 때의 좌표 </ko>
     * @property {Object.<string, number>} destPos The coordinates to move to. If you change this value, you can run the animation<ko>이동할 좌표. 이값을 변경하여 애니메이션을 동작시킬수 있다</ko>
     * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
     * @property {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>애니메이션 진행 시간(단위: ms). 이값을 변경하여 애니메이션의 이동시간을 조절할 수 있다.</ko>
     * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
     * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
     * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("release", function(event) {
     *   // event.depaPos
     *   // event.destPos
     *   // event.delta
     *   // event.input
     *   // event.inputEvent
     *   // event.setTo
     *   // event.isTrusted
     *
     *   // if you want to change the animation coordinates to move after the 'animationStart' event.
     *   event.setTo({x: 10}, 2000);
     * });
     */
    EventManager.prototype.triggerAnimationStart = function (param) {
        param.setTo = this.createUserControll(param.destPos, param.duration);
        return this.axes.trigger("animationStart", param);
    };
    /**
     * This event is fired when animation ends.
     * @ko 에니메이션이 끝났을 때 발생한다.
     * @name eg.Axes#animationEnd
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("animationEnd", function(event) {
     *   // event.isTrusted
     * });
     */
    EventManager.prototype.triggerAnimationEnd = function (isTrusted) {
        if (isTrusted === void 0) { isTrusted = false; }
        this.axes.trigger("animationEnd", {
            isTrusted: isTrusted
        });
    };
    /**
     * This event is fired when all actions have been completed.
     * @ko 에니메이션이 끝났을 때 발생한다.
     * @name eg.Axes#finish
     * @event
     * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
     *
     * @example
     * const axes = new eg.Axes({
     *   "x": {
     *      range: [0, 100]
     *   },
     *   "zoom": {
     *      range: [50, 30]
     *   }
     * }).on("finish", function(event) {
     *   // event.isTrusted
     * });
     */
    EventManager.prototype.triggerFinish = function (isTrusted) {
        if (isTrusted === void 0) { isTrusted = false; }
        this.axes.trigger("finish", {
            isTrusted: isTrusted
        });
    };
    EventManager.prototype.createUserControll = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        // to controll
        var userControl = {
            destPos: __assign({}, pos),
            duration: duration
        };
        return function (toPos, userDuration) {
            toPos && (userControl.destPos = __assign({}, toPos));
            (userDuration !== undefined) && (userControl.duration = userDuration);
            return userControl;
        };
    };
    EventManager.prototype.setAnimationManager = function (am) {
        this.am = am;
    };
    EventManager.prototype.destroy = function () {
        this.axes.off();
    };
    return EventManager;
}());
exports.EventManager = EventManager;
;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var InterruptManager = /** @class */ (function () {
    function InterruptManager(options) {
        this.options = options;
        this._prevented = false; //  check whether the animation event was prevented
    }
    InterruptManager.prototype.isInterrupting = function () {
        // when interruptable is 'true', return value is always 'true'.
        return this.options.interruptable || this._prevented;
    };
    InterruptManager.prototype.isInterrupted = function () {
        return !this.options.interruptable && this._prevented;
    };
    InterruptManager.prototype.setInterrupt = function (prevented) {
        !this.options.interruptable && (this._prevented = prevented);
    };
    return InterruptManager;
}());
exports.InterruptManager = InterruptManager;
;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var AxisManager_1 = __webpack_require__(3);
var Coordinate_1 = __webpack_require__(2);
var InputObserver = /** @class */ (function () {
    function InputObserver(_a) {
        var options = _a.options, itm = _a.itm, em = _a.em, axm = _a.axm, am = _a.am;
        this.isOutside = false;
        this.moveDistance = null;
        this.options = options;
        this.itm = itm;
        this.em = em;
        this.axm = axm;
        this.am = am;
    }
    // when move pointer is held in outside
    InputObserver.prototype.atOutside = function (pos) {
        var _this = this;
        if (this.isOutside) {
            return this.axm.map(pos, function (v, k, opt) {
                var tn = opt.range[0] - opt.bounce[0];
                var tx = opt.range[1] + opt.bounce[1];
                return v > tx ? tx : (v < tn ? tn : v);
            });
        }
        else {
            // when start pointer is held in inside
            // get a initialization slope value to prevent smooth animation.
            var initSlope_1 = this.am.easing(0.00001) / 0.00001;
            return this.axm.map(pos, function (v, k, opt) {
                var min = opt.range[0];
                var max = opt.range[1];
                var out = opt.bounce;
                if (v < min) {
                    return min - _this.am.easing((min - v) / (out[0] * initSlope_1)) * out[0];
                }
                else if (v > max) {
                    return max + _this.am.easing((v - max) / (out[1] * initSlope_1)) * out[1];
                }
                return v;
            });
        }
    };
    InputObserver.prototype.get = function (input) {
        return this.axm.get(input.axes);
    };
    InputObserver.prototype.hold = function (input, event) {
        if (this.itm.isInterrupted() || !input.axes.length) {
            return;
        }
        var changeOption = {
            input: input,
            event: event
        };
        this.itm.setInterrupt(true);
        this.am.grab(input.axes, changeOption);
        !this.moveDistance && this.em.triggerHold(this.axm.get(), changeOption);
        this.isOutside = this.axm.isOutside(input.axes);
        this.moveDistance = this.axm.get(input.axes);
    };
    InputObserver.prototype.change = function (input, event, offset) {
        if (!this.itm.isInterrupting() || this.axm.every(offset, function (v) { return v === 0; })) {
            return;
        }
        var depaPos = this.axm.get(input.axes);
        var destPos;
        // for outside logic
        destPos = this.axm.map(this.moveDistance || depaPos, function (v, k) { return v + (offset[k] || 0); });
        this.moveDistance && (this.moveDistance = destPos);
        destPos = this.axm.map(destPos, function (v, k, opt) { return Coordinate_1["default"].getCirculatedPos(v, opt.range, opt.circular); });
        // from outside to inside
        if (this.isOutside &&
            this.axm.every(depaPos, function (v, k, opt) { return !Coordinate_1["default"].isOutside(v, opt.range); })) {
            this.isOutside = false;
        }
        destPos = this.atOutside(destPos);
        this.em.triggerChange(destPos, {
            input: input,
            event: event
        }, true);
    };
    InputObserver.prototype.release = function (input, event, offset, inputDuration) {
        if (!this.itm.isInterrupting()) {
            return;
        }
        if (!this.moveDistance) {
            return;
        }
        var pos = this.axm.get(input.axes);
        var depaPos = this.axm.get();
        var destPos = this.axm.get(this.axm.map(offset, function (v, k, opt) {
            if (opt.circular && (opt.circular[0] || opt.circular[1])) {
                return pos[k] + v;
            }
            else {
                return Coordinate_1["default"].getInsidePosition(pos[k] + v, opt.range, opt.circular, opt.bounce);
            }
        }));
        var duration = this.am.getDuration(destPos, pos, inputDuration);
        if (duration === 0) {
            destPos = __assign({}, depaPos);
        }
        // prepare params
        var param = {
            depaPos: depaPos,
            destPos: destPos,
            duration: duration,
            delta: this.axm.getDelta(depaPos, destPos),
            inputEvent: event,
            input: input,
            isTrusted: true
        };
        this.em.triggerRelease(param);
        this.moveDistance = null;
        // to contol
        var userWish = this.am.getUserControll(param);
        var isEqual = AxisManager_1.AxisManager.equal(userWish.destPos, depaPos);
        var changeOption = {
            input: input,
            event: event
        };
        if (isEqual || userWish.duration === 0) {
            !isEqual && this.em.triggerChange(userWish.destPos, changeOption, true);
            this.itm.setInterrupt(false);
            if (this.axm.isOutside()) {
                this.am.restore(changeOption);
            }
            else {
                this.em.triggerFinish(true);
            }
        }
        else {
            this.am.animateTo(userWish.destPos, userWish.duration, changeOption);
        }
    };
    return InputObserver;
}());
exports.InputObserver = InputObserver;
;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Hammer = __webpack_require__(4);
var const_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(0);
var InputType_1 = __webpack_require__(1);
/**
 * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
 * @ko eg.Axes.PanInput 모듈의 옵션 객체
 * @property {String[]} [inputType=["touch","mouse", "pointer"]] Types of input devices.<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
 * @property {Number[]} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @property {Number} [scale.0=1] horizontal axis scale <ko>수평축 배율</ko>
 * @property {Number} [scale.1=1] vertical axis scale <ko>수직축 배율</ko>
 * @property {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
 * @property {Number} [threshold=0] Minimal pan distance required before recognizing <ko>사용자의 Pan 동작을 인식하기 위해산 최소한의 거리</ko>
 * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager의 옵션</ko>
**/
/**
 * @class eg.Axes.PanInput
 * @classdesc A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
 * @ko 마우스나 터치 스크린을 누르고 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
 *
 * @example
 * const pan = new eg.Axes.PanInput("#area", {
 * 		inputType: ["touch"],
 * 		scale: [1, 1.3],
 * });
 *
 * // Connect the 'something2' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * // Connect the 'somethingN' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * axes.connect(["something1"], pan); // or axes.connect("something1", pan);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 */
var PanInput = /** @class */ (function () {
    function PanInput(el, options) {
        this.axes = [];
        this.hammer = null;
        this.element = null;
        /**
         * Hammer helps you add support for touch gestures to your page
         *
         * @external Hammer
         * @see {@link http://hammerjs.github.io|Hammer.JS}
         * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
         * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
         */
        if (typeof Hammer === "undefined") {
            throw new Error("The Hammerjs must be loaded before eg.Axes.PanInput.\nhttp://hammerjs.github.io/");
        }
        this.element = utils_1.$(el);
        this.options = __assign({
            inputType: ["touch", "mouse", "pointer"],
            scale: [1, 1],
            thresholdAngle: 45,
            threshold: 0,
            hammerManagerOptions: {
                // css properties were removed due to usablility issue
                // http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    userDrag: "none"
                }
            }
        }, options);
        this.onHammerInput = this.onHammerInput.bind(this);
        this.onPanmove = this.onPanmove.bind(this);
        this.onPanend = this.onPanend.bind(this);
    }
    // get user's direction
    PanInput.getDirectionByAngle = function (angle, thresholdAngle) {
        if (thresholdAngle < 0 || thresholdAngle > 90) {
            return const_1.DIRECTION.DIRECTION_NONE;
        }
        var toAngle = Math.abs(angle);
        return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ?
            const_1.DIRECTION.DIRECTION_VERTICAL : const_1.DIRECTION.DIRECTION_HORIZONTAL;
    };
    PanInput.getNextOffset = function (speeds, deceleration) {
        var normalSpeed = Math.sqrt(speeds[0] * speeds[0] + speeds[1] * speeds[1]);
        var duration = Math.abs(normalSpeed / -deceleration);
        return [
            speeds[0] / 2 * duration,
            speeds[1] / 2 * duration
        ];
    };
    PanInput.useDirection = function (checkType, direction, userDirection) {
        if (userDirection) {
            return !!((direction === const_1.DIRECTION.DIRECTION_ALL) ||
                ((direction & checkType) && (userDirection & checkType)));
        }
        else {
            return !!(direction & checkType);
        }
    };
    PanInput.prototype.mapAxes = function (axes) {
        var useHorizontal = !!axes[0];
        var useVertical = !!axes[1];
        if (useHorizontal && useVertical) {
            this._direction = const_1.DIRECTION.DIRECTION_ALL;
        }
        else if (useHorizontal) {
            this._direction = const_1.DIRECTION.DIRECTION_HORIZONTAL;
        }
        else if (useVertical) {
            this._direction = const_1.DIRECTION.DIRECTION_VERTICAL;
        }
        else {
            this._direction = const_1.DIRECTION.DIRECTION_NONE;
        }
        this.axes = axes;
    };
    PanInput.prototype.connect = function (observer) {
        var hammerOption = {
            direction: this._direction,
            threshold: this.options.threshold
        };
        if (this.hammer) {
            this.dettachEvent();
            // hammer remove previous PanRecognizer.
            this.hammer.add(new Hammer.Pan(hammerOption));
        }
        else {
            var keyValue = this.element[InputType_1.UNIQUEKEY];
            if (keyValue) {
                this.hammer && this.hammer.destroy();
            }
            else {
                keyValue = String(Math.round(Math.random() * new Date().getTime()));
            }
            var inputClass = InputType_1.convertInputType(this.options.inputType);
            if (!inputClass) {
                throw new Error("Wrong inputType parameter!");
            }
            this.hammer = InputType_1.createHammer(this.element, __assign({
                recognizers: [
                    [Hammer.Pan, hammerOption],
                ],
                inputClass: inputClass
            }, this.options.hammerManagerOptions));
            this.element[InputType_1.UNIQUEKEY] = keyValue;
        }
        this.attachEvent(observer);
        return this;
    };
    PanInput.prototype.disconnect = function () {
        if (this.hammer) {
            this.dettachEvent();
        }
        this._direction = const_1.DIRECTION.DIRECTION_NONE;
        return this;
    };
    /**
    * Destroys elements, properties, and events used in a module.
    * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
    * @method eg.Axes.PanInput#destroy
    */
    PanInput.prototype.destroy = function () {
        this.disconnect();
        if (this.hammer) {
            this.hammer.destroy();
        }
        delete this.element[InputType_1.UNIQUEKEY];
        this.element = null;
        this.hammer = null;
    };
    /**
     * Enables input devices
     * @ko 입력 장치를 사용할 수 있게 한다
     * @method eg.Axes.PanInput#enable
     * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    PanInput.prototype.enable = function () {
        this.hammer && (this.hammer.get("pan").options.enable = true);
        return this;
    };
    /**
     * Disables input devices
     * @ko 입력 장치를 사용할 수 없게 한다.
     * @method eg.Axes.PanInput#disable
     * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    PanInput.prototype.disable = function () {
        this.hammer && (this.hammer.get("pan").options.enable = false);
        return this;
    };
    /**
     * Returns whether to use an input device
     * @ko 입력 장치를 사용 여부를 반환한다.
     * @method eg.Axes.PanInput#isEnable
     * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
     */
    PanInput.prototype.isEnable = function () {
        return !!(this.hammer && this.hammer.get("pan").options.enable);
    };
    PanInput.prototype.onHammerInput = function (event) {
        if (this.isEnable()) {
            if (event.isFirst) {
                this.observer.hold(this, event);
            }
            else if (event.isFinal) {
                this.onPanend(event);
            }
        }
    };
    PanInput.prototype.onPanmove = function (event) {
        var userDirection = PanInput.getDirectionByAngle(event.angle, this.options.thresholdAngle);
        // not support offset properties in Hammerjs - start
        var prevInput = this.hammer.session.prevInput;
        /* eslint-disable no-param-reassign */
        if (prevInput) {
            event.offsetX = event.deltaX - prevInput.deltaX;
            event.offsetY = event.deltaY - prevInput.deltaY;
        }
        else {
            event.offsetX = 0;
            event.offsetY = 0;
        }
        var offset = this.getOffset([event.offsetX, event.offsetY], [
            PanInput.useDirection(const_1.DIRECTION.DIRECTION_HORIZONTAL, this._direction, userDirection),
            PanInput.useDirection(const_1.DIRECTION.DIRECTION_VERTICAL, this._direction, userDirection)
        ]);
        var prevent = offset.some(function (v) { return v !== 0; });
        if (prevent) {
            event.srcEvent.preventDefault();
            event.srcEvent.stopPropagation();
        }
        event.preventSystemEvent = prevent;
        prevent && this.observer.change(this, event, InputType_1.toAxis(this.axes, offset));
    };
    PanInput.prototype.onPanend = function (event) {
        var offset = this.getOffset([
            Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1),
            Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1)
        ], [
            PanInput.useDirection(const_1.DIRECTION.DIRECTION_HORIZONTAL, this._direction),
            PanInput.useDirection(const_1.DIRECTION.DIRECTION_VERTICAL, this._direction)
        ]);
        offset = PanInput.getNextOffset(offset, this.observer.options.deceleration);
        this.observer.release(this, event, InputType_1.toAxis(this.axes, offset));
    };
    PanInput.prototype.attachEvent = function (observer) {
        this.observer = observer;
        this.hammer.on("hammer.input", this.onHammerInput)
            .on("panstart panmove", this.onPanmove);
    };
    PanInput.prototype.dettachEvent = function () {
        this.hammer.off("hammer.input", this.onHammerInput)
            .off("panstart panmove", this.onPanmove);
        this.observer = null;
    };
    PanInput.prototype.getOffset = function (properties, useDirection) {
        var offset = [0, 0];
        var scale = this.options.scale;
        if (useDirection[0]) {
            offset[0] = (properties[0] * scale[0]);
        }
        if (useDirection[1]) {
            offset[1] = (properties[1] * scale[1]);
        }
        return offset;
    };
    return PanInput;
}());
exports.PanInput = PanInput;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Hammer = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var InputType_1 = __webpack_require__(1);
/**
 * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
 * @ko eg.Axes.PinchInput 모듈의 옵션 객체
 * @property {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @property {Number} [threshold=0] Minimal scale before recognizing <ko>사용자의 Pinch 동작을 인식하기 위해산 최소한의 배율</ko>
 * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager의 옵션</ko>
**/
/**
 * @class eg.Axes.PinchInput
 * @classdesc A module that passes the amount of change to eg.Axes when two pointers are moving toward (zoom-in) or away from each other (zoom-out). use one axis.
 * @ko 2개의 pointer를 이용하여 zoom-in하거나 zoom-out 하는 동작의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 * @example
 * const pinch = new eg.Axes.PinchInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something", pinch);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PinchInput module <ko>eg.Axes.PinchInput 모듈을 사용할 엘리먼트</ko>
 * @param {PinchInputOption} [options] The option object of the eg.Axes.PinchInput module<ko>eg.Axes.PinchInput 모듈의 옵션 객체</ko>
 */
var PinchInput = /** @class */ (function () {
    function PinchInput(el, options) {
        this.axes = [];
        this.hammer = null;
        this.element = null;
        this._base = null;
        this._prev = null;
        /**
         * Hammer helps you add support for touch gestures to your page
         *
         * @external Hammer
         * @see {@link http://hammerjs.github.io|Hammer.JS}
         * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
         * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
         */
        if (typeof Hammer === "undefined") {
            throw new Error("The Hammerjs must be loaded before eg.Axes.PinchInput.\nhttp://hammerjs.github.io/");
        }
        this.element = utils_1.$(el);
        this.options = __assign({
            scale: 1,
            threshold: 0,
            hammerManagerOptions: {
                // css properties were removed due to usablility issue
                // http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    userDrag: "none"
                }
            }
        }, options);
        this.onPinchStart = this.onPinchStart.bind(this);
        this.onPinchMove = this.onPinchMove.bind(this);
        this.onPinchEnd = this.onPinchEnd.bind(this);
    }
    PinchInput.prototype.mapAxes = function (axes) {
        this.axes = axes;
    };
    PinchInput.prototype.connect = function (observer) {
        var hammerOption = {
            threshold: this.options.threshold
        };
        if (this.hammer) {
            this.dettachEvent();
            // hammer remove previous PinchRecognizer.
            this.hammer.add(new Hammer.Pinch(hammerOption));
        }
        else {
            var keyValue = this.element[InputType_1.UNIQUEKEY];
            if (keyValue) {
                this.hammer.destroy();
            }
            else {
                keyValue = String(Math.round(Math.random() * new Date().getTime()));
            }
            this.hammer = InputType_1.createHammer(this.element, __assign({
                recognizers: [
                    [Hammer.Pinch, hammerOption],
                ],
                inputClass: Hammer.TouchInput
            }, this.options.hammerManagerOptions));
            this.element[InputType_1.UNIQUEKEY] = keyValue;
        }
        this.attachEvent(observer);
        return this;
    };
    PinchInput.prototype.disconnect = function () {
        if (this.hammer) {
            this.dettachEvent();
        }
        return this;
    };
    /**
    * Destroys elements, properties, and events used in a module.
    * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
    * @method eg.Axes.PinchInput#destroy
    */
    PinchInput.prototype.destroy = function () {
        this.disconnect();
        if (this.hammer) {
            this.hammer.destroy();
        }
        delete this.element[InputType_1.UNIQUEKEY];
        this.element = null;
        this.hammer = null;
    };
    PinchInput.prototype.onPinchStart = function (event) {
        this._base = this.observer.get(this)[this.axes[0]];
        var offset = this.getOffset(event.scale);
        this.observer.hold(this, event);
        this.observer.change(this, event, InputType_1.toAxis(this.axes, [offset]));
        this._prev = event.scale;
    };
    PinchInput.prototype.onPinchMove = function (event) {
        var offset = this.getOffset(event.scale, this._prev);
        this.observer.change(this, event, InputType_1.toAxis(this.axes, [offset]));
        this._prev = event.scale;
    };
    PinchInput.prototype.onPinchEnd = function (event) {
        var offset = this.getOffset(event.scale, this._prev);
        this.observer.change(this, event, InputType_1.toAxis(this.axes, [offset]));
        this.observer.release(this, event, InputType_1.toAxis(this.axes, [0]), 0);
        this._base = null;
        this._prev = null;
    };
    PinchInput.prototype.getOffset = function (pinchScale, prev) {
        if (prev === void 0) { prev = 1; }
        return this._base * (pinchScale - prev) * this.options.scale;
    };
    PinchInput.prototype.attachEvent = function (observer) {
        this.observer = observer;
        this.hammer.on("pinchstart", this.onPinchStart)
            .on("pinchmove", this.onPinchMove)
            .on("pinchend", this.onPinchEnd);
    };
    PinchInput.prototype.dettachEvent = function () {
        this.hammer.off("pinchstart", this.onPinchStart)
            .off("pinchmove", this.onPinchMove)
            .off("pinchend", this.onPinchEnd);
        this.observer = null;
        this._prev = null;
    };
    /**
     * Enables input devices
     * @ko 입력 장치를 사용할 수 있게 한다
     * @method eg.Axes.PinchInput#enable
     * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    PinchInput.prototype.enable = function () {
        this.hammer && (this.hammer.get("pinch").options.enable = true);
        return this;
    };
    /**
     * Disables input devices
     * @ko 입력 장치를 사용할 수 없게 한다.
     * @method eg.Axes.PinchInput#disable
     * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    PinchInput.prototype.disable = function () {
        this.hammer && (this.hammer.get("pinch").options.enable = false);
        return this;
    };
    /**
     * Returns whether to use an input device
     * @ko 입력 장치를 사용 여부를 반환한다.
     * @method eg.Axes.PinchInput#isEnable
     * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
     */
    PinchInput.prototype.isEnable = function () {
        return !!(this.hammer && this.hammer.get("pinch").options.enable);
    };
    return PinchInput;
}());
exports.PinchInput = PinchInput;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var utils_1 = __webpack_require__(0);
var InputType_1 = __webpack_require__(1);
/**
 * @typedef {Object} WheelInputOption The option object of the eg.Axes.WheelInput module
 * @ko eg.Axes.WheelInput 모듈의 옵션 객체
 * @property {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
**/
/**
 * @class eg.Axes.WheelInput
 * @classdesc A module that passes the amount of change to eg.Axes when the mouse wheel is moved. use one axis.
 * @ko 마우스 휠이 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 *
 * @example
 * const wheel = new eg.Axes.WheelInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when the mousewheel is moved.
 * axes.connect("something", wheel);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.WheelInput module <ko>eg.Axes.WheelInput 모듈을 사용할 엘리먼트</ko>
 * @param {WheelInputOption} [options] The option object of the eg.Axes.WheelInput module<ko>eg.Axes.WheelInput 모듈의 옵션 객체</ko>
 */
var WheelInput = /** @class */ (function () {
    function WheelInput(el, options) {
        this.axes = [];
        this.element = null;
        this._isEnabled = false;
        this._isHolded = false;
        this._timer = null;
        this.element = utils_1.$(el);
        this.options = __assign({
            scale: 1,
            useNormalized: true
        }, options);
        this.onWheel = this.onWheel.bind(this);
    }
    WheelInput.prototype.mapAxes = function (axes) {
        this.axes = axes;
    };
    WheelInput.prototype.connect = function (observer) {
        this.dettachEvent();
        this.attachEvent(observer);
        return this;
    };
    WheelInput.prototype.disconnect = function () {
        this.dettachEvent();
        return this;
    };
    /**
    * Destroys elements, properties, and events used in a module.
    * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
    * @method eg.Axes.WheelInput#destroy
    */
    WheelInput.prototype.destroy = function () {
        this.disconnect();
        this.element = null;
    };
    WheelInput.prototype.onWheel = function (event) {
        var _this = this;
        if (!this._isEnabled) {
            return;
        }
        event.preventDefault();
        if (event.deltaY === 0) {
            return;
        }
        if (!this._isHolded) {
            this.observer.hold(this, event);
            this._isHolded = true;
        }
        var offset = (event.deltaY > 0 ? -1 : 1) * this.options.scale * (this.options.useNormalized ? 1 : Math.abs(event.deltaY));
        this.observer.change(this, event, InputType_1.toAxis(this.axes, [offset]));
        clearTimeout(this._timer);
        var inst = this;
        this._timer = setTimeout(function () {
            if (_this._isHolded) {
                _this._isHolded = false;
                _this.observer.release(_this, event, InputType_1.toAxis(_this.axes, [0]));
            }
        }, 50);
    };
    WheelInput.prototype.attachEvent = function (observer) {
        this.observer = observer;
        this.element.addEventListener("wheel", this.onWheel);
        this._isEnabled = true;
    };
    WheelInput.prototype.dettachEvent = function () {
        this.element.removeEventListener("wheel", this.onWheel);
        this._isEnabled = false;
        this.observer = null;
    };
    /**
     * Enables input devices
     * @ko 입력 장치를 사용할 수 있게 한다
     * @method eg.Axes.WheelInput#enable
     * @return {eg.Axes.WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    WheelInput.prototype.enable = function () {
        this._isEnabled = true;
        return this;
    };
    /**
     * Disables input devices
     * @ko 입력 장치를 사용할 수 없게 한다.
     * @method eg.Axes.WheelInput#disable
     * @return {eg.Axes.WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    WheelInput.prototype.disable = function () {
        this._isEnabled = false;
        return this;
    };
    /**
     * Returns whether to use an input device
     * @ko 입력 장치를 사용 여부를 반환한다.
     * @method eg.Axes.WheelInput#isEnable
     * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
     */
    WheelInput.prototype.isEnable = function () {
        return this._isEnabled;
    };
    return WheelInput;
}());
exports.WheelInput = WheelInput;
;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var utils_1 = __webpack_require__(0);
var InputType_1 = __webpack_require__(1);
exports.KEYMAP = {
    LEFT_ARROW: 37,
    A: 65,
    UP_ARROW: 38,
    W: 87,
    RIGHT_ARROW: 39,
    D: 68,
    DOWN_ARROW: 40,
    S: 83
};
var DIRECTION_REVERSE = -1;
var DIRECTION_FORWARD = 1;
var DELAY = 80;
/**
 * @typedef {Object} MoveKeyInputOption The option object of the eg.Axes.MoveKeyInput module
 * @ko eg.Axes.MoveKeyInput 모듈의 옵션 객체
 * @property {Array<Number>} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @property {Number} [scale[0]=1] Coordinate scale for the first axis<ko>첫번째 축의 배율</ko>
 * @property {Number} [scale[1]=1] Coordinate scale for the decond axis<ko>두번째 축의 배율</ko>
**/
/**
 * @class eg.Axes.MoveKeyInput
 * @classdesc A module that passes the amount of change to eg.Axes when the move key stroke is occured. use two axis.
 * @ko 이동키 입력이 발생했을 때의 변화량을 eg.Axes에 전달하는 모듈. 두 개 의 축을 사용한다.
 *
 * @example
 * const moveKey = new eg.Axes.MoveKeyInput("#area", {
 * 		scale: [1, 1]
 * });
 *
 * // Connect 'x', 'y' axes when the moveKey is pressed.
 * axes.connect(["x", "y"], moveKey);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.MoveKeyInput module <ko>eg.Axes.MoveKeyInput 모듈을 사용할 엘리먼트</ko>
 * @param {MoveKeyInputOption} [options] The option object of the eg.Axes.MoveKeyInput module<ko>eg.Axes.MoveKeyInput 모듈의 옵션 객체</ko>
 */
var MoveKeyInput = /** @class */ (function () {
    function MoveKeyInput(el, options) {
        this.axes = [];
        this.element = null;
        this._isEnabled = false;
        this._isHolded = false;
        this._timer = null;
        this.element = utils_1.$(el);
        this.options = __assign({
            scale: [1, 1]
        }, options);
        this.onKeydown = this.onKeydown.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
    }
    MoveKeyInput.prototype.mapAxes = function (axes) {
        this.axes = axes;
    };
    MoveKeyInput.prototype.connect = function (observer) {
        this.dettachEvent();
        // add tabindex="0" to the container for making it focusable
        if (this.element.getAttribute("tabindex") !== "0") {
            this.element.setAttribute("tabindex", "0");
        }
        this.attachEvent(observer);
        return this;
    };
    MoveKeyInput.prototype.disconnect = function () {
        this.dettachEvent();
        return this;
    };
    /**
    * Destroys elements, properties, and events used in a module.
    * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
    * @method eg.Axes.MoveKeyInput#destroy
    */
    MoveKeyInput.prototype.destroy = function () {
        this.disconnect();
        this.element = null;
    };
    MoveKeyInput.prototype.onKeydown = function (e) {
        if (!this._isEnabled) {
            return;
        }
        var isMoveKey = true;
        var direction = DIRECTION_FORWARD;
        var offsets;
        switch (e.keyCode) {
            case exports.KEYMAP.LEFT_ARROW:
            case exports.KEYMAP.A:
                direction = DIRECTION_REVERSE;
            case exports.KEYMAP.RIGHT_ARROW:
            case exports.KEYMAP.D:
                if (!this.axes[0]) {
                    isMoveKey = false;
                    break;
                }
                offsets = [+this.options.scale[0] * direction, 0];
                break;
            case exports.KEYMAP.DOWN_ARROW:
            case exports.KEYMAP.S:
                direction = DIRECTION_REVERSE;
            case exports.KEYMAP.UP_ARROW:
            case exports.KEYMAP.W:
                if (!this.axes[1]) {
                    isMoveKey = false;
                    break;
                }
                offsets = [0, +this.options.scale[1] * direction];
                break;
            default:
                isMoveKey = false;
        }
        if (!isMoveKey) {
            return;
        }
        if (!this._isHolded) {
            this.observer.hold(this, event);
            this._isHolded = true;
        }
        clearTimeout(this._timer);
        this.observer.change(this, event, InputType_1.toAxis(this.axes, offsets));
    };
    MoveKeyInput.prototype.onKeyup = function (e) {
        var _this = this;
        if (!this._isHolded) {
            return;
        }
        clearTimeout(this._timer);
        this._timer = setTimeout(function () {
            _this.observer.release(_this, e, InputType_1.toAxis(_this.axes, [0, 0]));
            _this._isHolded = false;
        }, DELAY);
    };
    MoveKeyInput.prototype.attachEvent = function (observer) {
        this.observer = observer;
        this.element.addEventListener("keydown", this.onKeydown, false);
        this.element.addEventListener("keypress", this.onKeydown, false);
        this.element.addEventListener("keyup", this.onKeyup, false);
        this._isEnabled = true;
    };
    MoveKeyInput.prototype.dettachEvent = function () {
        this.element.removeEventListener("keydown", this.onKeydown, false);
        this.element.removeEventListener("keypress", this.onKeydown, false);
        this.element.removeEventListener("keyup", this.onKeyup, false);
        this._isEnabled = false;
        this.observer = null;
    };
    /**
     * Enables input devices
     * @ko 입력 장치를 사용할 수 있게 한다
     * @method eg.Axes.MoveKeyInput#enable
     * @return {eg.Axes.MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    MoveKeyInput.prototype.enable = function () {
        this._isEnabled = true;
        return this;
    };
    /**
     * Disables input devices
     * @ko 입력 장치를 사용할 수 없게 한다.
     * @method eg.Axes.MoveKeyInput#disable
     * @return {eg.Axes.MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */
    MoveKeyInput.prototype.disable = function () {
        this._isEnabled = false;
        return this;
    };
    /**
     * Returns whether to use an input device
     * @ko 입력 장치를 사용 여부를 반환한다.
     * @method eg.Axes.MoveKeyInput#isEnable
     * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
     */
    MoveKeyInput.prototype.isEnable = function () {
        return this._isEnabled;
    };
    return MoveKeyInput;
}());
exports.MoveKeyInput = MoveKeyInput;
;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Mixin = exports.utils = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                               * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                               */


var _browser = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = {
	/**
  * Select or create element
  * @param {String|HTMLElement} param
  *  when string given is as HTML tag, then create element
  *  otherwise it returns selected elements
  * @returns {HTMLElement}
  */
	$: function $(param) {
		var el = null;

		if (typeof param === "string") {
			// check if string is HTML tag format
			var match = param.match(/^<([a-z]+)\s*([^>]*)>/);

			// creating element
			if (match) {
				el = _browser.document.createElement(match[1]);

				// attributes
				match.length === 3 && match[2].split(" ").forEach(function (v) {
					var attr = v.split("=");

					el.setAttribute(attr[0], attr[1].trim().replace(/(^["']|["']$)/g, ""));
				});
			} else {
				el = _browser.document.querySelectorAll(param);

				if (!el.length) {
					el = null;
				} else if (el.length === 1) {
					el = el[0];
				}
			}
		} else if (param.nodeName && param.nodeType === 1) {
			el = param;
		}

		return el;
	},


	/**
  * Check if is array
  * @param arr
  * @returns {Boolean}
  */
	isArray: function isArray(arr) {
		return arr && arr.constructor === Array;
	},


	/**
  * Check if is object
  * @param {Object} obj
  * @returns {Boolean}
  */
	isObject: function isObject(obj) {
		return obj && !obj.nodeType && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && !this.isArray(obj);
	},


	/**
  * Merge object returning new object
  * @param {Object} target
  * @param {Object} objectN
  * @returns {Object} merged target object
  * @example
  *  var target = { a: 1 };
  *  utils.extend(target, { b: 2, c: 3 });
  *  target;  // { a: 1, b: 2, c: 3 };
  */
	extend: function extend(target) {
		var _this = this;

		for (var _len = arguments.length, objectN = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			objectN[_key - 1] = arguments[_key];
		}

		if (!objectN.length || objectN.length === 1 && !objectN[0]) {
			return target;
		}

		var source = objectN.shift();

		if (this.isObject(target) && this.isObject(source)) {
			Object.keys(source).forEach(function (key) {
				var value = source[key];

				if (_this.isObject(value)) {
					!target[key] && (target[key] = {});

					target[key] = _this.extend(target[key], value);
				} else {
					target[key] = _this.isArray(value) ? value.concat() : value;
				}
			});
		}

		return this.extend.apply(this, [target].concat(objectN));
	},


	/**
  * Get or set the style value or apply
  * @param {HTMLElement} el
  * @param {String|Object} style
  *  String: return style property value
  *  Object: set style value
  * @param {Boolean} getAsNumber Get the value as number
  * @returns {String|HTMLElement}
  */
	css: function css(el, style, getAsNumber) {
		if (typeof style === "string") {
			var value = _browser.window.getComputedStyle(el)[style];

			return getAsNumber ? this.getNumValue(value) : value;
		} else {
			var applyStyle = function applyStyle(target, source) {
				return Object.keys(source).forEach(function (v) {
					target[v] = source[v];
				});
			};

			this.isArray(el) ? el.forEach(function (v) {
				return applyStyle(v.style, style);
			}) : applyStyle(el.style, style);
		}

		return el;
	},


	/**
  * classList
  * @param {HTMLElement} el target DOM element
  * @param {String} className class name string to be handled
  * @param {Boolean} add Add or remove class - true: Add, false: Remove
  * @return {Boolean} if add param is missing, then return existence of class name
  */
	classList: function classList(el, className, add) {
		var isAddParam = typeof add === "boolean";
		var res = void 0;

		if (el.classList) {
			res = el.classList[isAddParam && (add ? "add" : "remove") || "contains"](className);
		} else {
			res = el.className;

			if (isAddParam) {
				if (add && res.indexOf(className) === -1) {
					res = el.className = (res + " " + className).replace(/\s{2,}/g, " ");
				} else if (!add) {
					res = el.className = res.replace(className, "");
				}
			} else {
				res = new RegExp("\\b" + className + "\\b").test(res);
			}
		}

		return res;
	},


	/**
  * Check and parse value to number
  * @param {Number|String} val
  * @param {Number} defVal
  * @return {Number}
  */
	getNumValue: function getNumValue(val, defVal) {
		var num = val;

		return isNaN(num = parseInt(num, 10)) ? defVal : num;
	},


	/**
  * Return unit formatted value
  * @param {Number|String} val
  * @return {String} val Value formatted with unit
  */
	getUnitValue: function getUnitValue(val) {
		var rx = /(?:[a-z]{2,}|%)$/;

		return (parseInt(val, 10) || 0) + (String(val).match(rx) || "px");
	},


	/**
  * Get element's outer value
  * @param {HTMLElement} el
  * @param {String} type - [outerWidth|outerHeight]
  * @returns {Number} outer's value
  */
	getOuter: function getOuter(el, type) {
		var _this2 = this;

		var style = _browser.window.getComputedStyle(el);
		var paddingMargin = 0;

		(type === "outerWidth" ? ["Left", "Right"] : ["Top", "Bottom"]).forEach(function (dir) {
			["padding", "margin"].forEach(function (v) {
				paddingMargin += _this2.getNumValue(style["" + v + dir]);
			});
		});

		return this.getNumValue(style[type.replace("outer", "").toLocaleLowerCase()]) + paddingMargin;
	},


	/**
  * Get element's outerWidth value with margin
  * @param {HTMLElement} el
  * @returns {Number}
  */
	outerWidth: function outerWidth(el) {
		return this.getOuter(el, "outerWidth");
	},


	/**
  * Get element's outerHeight value with margin
  * @param {HTMLElement} el
  * @returns {Number}
  */
	outerHeight: function outerHeight(el) {
		return this.getOuter(el, "outerHeight");
	},


	/**
  * Returns the syntax of the translate style which is applied to CSS transition properties.
  *
  * @ko CSS 트랜지션 속성에 적용할 translate 스타일 구문을 반환한다
  * @method eg#translate
  * @param {String} x Distance to move along the X axis <ko>x축을 따라 이동할 거리</ko>
  * @param {String} y Distance to move along the Y axis <ko>y축을 따라 이동할 거리</ko>
  * @param {Boolean} [isHA] Force hardware acceleration <ko>하드웨어 가속 사용 여부</ko>
  * @return {String} Syntax of the translate style <ko>translate 스타일 구문</ko>
  */
	translate: function translate(x, y, isHA) {
		return isHA || false ? "translate3d(" + x + "," + y + ",0)" : "translate(" + x + "," + y + ")";
	},


	// 1. user press one position on screen.
	// 2. user moves to the other position on screen.
	// 3. when user releases fingers on screen, 'click' event is fired at previous position.
	hasClickBug: function hasClickBug() {
		var ua = _browser.window.navigator.userAgent;
		var result = /Safari/.test(ua);

		this.hasClickBug = function () {
			return result;
		};
		return result;
	}
};

var MixinBuilder = function () {
	function MixinBuilder(superclass) {
		_classCallCheck(this, MixinBuilder);

		this.superclass = superclass || function () {
			function _class() {
				_classCallCheck(this, _class);
			}

			return _class;
		}();
	}

	MixinBuilder.prototype["with"] = function _with() {
		for (var _len2 = arguments.length, mixins = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			mixins[_key2] = arguments[_key2];
		}

		return mixins.reduce(function (c, m) {
			return m(c);
		}, this.superclass);
	};

	return MixinBuilder;
}();

var Mixin = function Mixin(superclass) {
	return new MixinBuilder(superclass);
};

exports.utils = utils;
exports.Mixin = Mixin;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
// internal config values
var CONFIG = {
	panel: {
		$list: null, // panel list
		index: 0, // dom index used among process
		no: 0, // panel no used among process
		currIndex: 0, // current physical dom index
		currNo: 0, // current logical panel number
		size: 0, // panel size
		count: 0, // total physical panel count
		origCount: 0, // total count of given original panels
		changed: false, // if panel changed
		animating: false, // current animating status boolean
		minCount: 3 // minimum panel count
	},
	touch: {
		holdPos: 0, // hold x,y coordinate
		destPos: 0, // destination x,y coordinate
		distance: 0, // touch distance pixel of start to end touch
		direction: null, // touch direction
		lastPos: 0, // to determine move on holding
		holding: false,
		isTrusted: false // if event was instantiated by user's action explicitly
	},
	customEvent: { // for custom events value
		flick: true,
		restore: false,
		restoreCall: false
	},
	dirData: [], // direction constant value according horizontal or vertical
	indexToMove: 0,
	$dummyAnchor: null // For buggy link highlighting on Android 2.x
};

// default options
var OPTIONS = {
	hwAccelerable: true, // set for hw acceleration (see https://gist.github.com/netil/c1d1b67e1c1926364c0709f110a09b44 for old devices support)
	prefix: "eg-flick", // prefix value of class name
	deceleration: 0.0006, // deceleration value
	horizontal: true, // move direction (true == horizontal, false == vertical)
	circular: false, // circular mode. In this mode at least 3 panels are required.
	previewPadding: null, // preview padding value in left(up) to right(down) order. In this mode at least 5 panels are required.
	bounce: null, // bounce value in left(up) to right(down) order. Works only in non-circular mode.
	threshold: 40, // the distance pixel threshold value for change panel
	duration: 100, // duration ms for animation
	panelEffect: function panelEffect(x) {
		return 1 - Math.pow(1 - x, 3);
	}, // easing function for panel change animation
	defaultIndex: 0, // initial panel index to be shown
	inputType: [// input type
	"touch", "mouse"],
	thresholdAngle: 45, // the threshold value that determines whether user action is horizontal or vertical (0~90)
	adaptiveHeight: false // Set container's height be adaptive according panel's height
};

exports.CONFIG = CONFIG;
exports.OPTIONS = OPTIONS;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _consts = __webpack_require__(8);

var consts = _interopRequireWildcard(_consts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


exports["default"] = function (superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			_classCallCheck(this, _class);

			return _possibleConstructorReturn(this, _superclass.apply(this, arguments));
		}

		/**
   * 'hold' event handler
   * @private
   */
		_class.prototype._holdHandler = function _holdHandler(e) {
			var conf = this._conf;
			var touch = conf.touch;
			var holdPos = e.pos.flick;

			touch.holdPos = holdPos;
			touch.holding = true;
			touch.isTrusted = true;
			conf.panel.changed = false;

			this._adjustContainerCss("start", holdPos);
		};

		/**
   * 'change' event handler
   * @private
   */


		_class.prototype._changeHandler = function _changeHandler(e) {
			var conf = this._conf;
			var touch = conf.touch;
			var pos = e.pos.flick;
			var holdPos = touch.holdPos;
			var direction = void 0;
			var eventRes = null;
			var movedPx = void 0;

			this._setPointerEvents(e); // for "click" bug

			/**
    * An event that occurs whenever the panel's coordinate value changes. It occurs in the following cases.<br><br>1. When the user is inputing the move.<br>2. When moving to the destination panel after you have finished inputing the move in step 1.<br>3. When the current panel is moving to its original position after the movement is finished in step 1.<br>4. Moving to the destination panel by calling the `moveTo()`, `prev()`, `next()`  method. (Do not prevent the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event.)
    * @ko 패널의 좌표값이 변할 때마다 발생하는 이벤트. 아래의 경우에 발생한다.<br><br>1. 사용자가 이동(move) 액션 입력중일 때.<br>2. 1번에서 이동(move) 액션 입력이 끝나고 목적 패널로 이동중일 때.<br>3. 1번에서 이동(move) 액션 입력이 끝나고 현재 패널의 원래 위치로 이동중일 때.<br>4. `moveTo()`, `prev()`, `next()`, 메서드를 호출하여 목적 패널로 이동중일 때. ([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}이벤트의 기본동작을 막지 않아야 한다.)<br>5. `restore()` 메서드를 호출하여 현재 패널이 원래 위치로 이동중일 때. ([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}이벤트의 기본동작 방지 전제.)
    * @name eg.Flicking#flick
    * @event
    * @property {String} eventType The name of the event<ko>이벤트 명</ko>
    * @property {Boolean} isTrusted true when the event was generated by a user action(`"mouse"` or `"touch"`) otherwise false<ko>사용자 액션(`"mouse"` 또는 `"touch"`)에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`</ko>
    * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
    * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
    * @property {Number} pos current coordinate <ko>현재 좌표.</ko>
    * @property {Boolean} holding Whether the user is inputing through the input device. (Whether it is 'mousedown' for a mouse device or 'touchmove' for a touch device.)<ko>사용자가 입력 장치를 통해 입력중인지 여부. (마우스 장치라면 'mousedown' 여부, 터치 장치라면 'touchmove' 여부)</ko>
    * @property {Number} distance Distance value from the touch starting point. If the `direction` property value is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_UP}, it returns a positive number. {@link eg.Flicking.DIRECTION_RIGHT} or {@link eg.Flicking.DIRECTION_DOWN} returns a negative value.<ko>터치 시작점으로부터 이동한 거리 값. `direction`속성값이 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_UP}이면 양수를, {@link eg.Flicking.DIRECTION_RIGHT} 혹은 {@link eg.Flicking.DIRECTION_DOWN}이면 음수를 반환한다.</ko>
    * @see eg.Flicking#event:beforeRestore
    * @see eg.Flicking#restore
    * @see eg.Flicking#event:beforeFlickStart
    * @see eg.Flicking#event:flickEnd
    * @see eg.Flicking#moveTo
    * @see eg.Flicking#prev
    * @see eg.Flicking#next
    * @example
   	 * The order of event occurrence.
   	 * 이벤트 발생 순서
   	 * ```javascript
   	 * // When moving to the destination panel.
   	 * // 목적 패널로 이동할 때.
   	 * beforeFlickStart (once) > flick (many times) > flickEnd (once)
   	 *
   	 * // When the restore operation.
   	 * // 복원 동작일 때.
   	 * beforeRestore (once) > flick (many times) > restore (once)
   	 * ```
    */
			if (e.inputEvent) {
				direction = e.inputEvent.direction;

				// Adjust direction in case of diagonal touch move
				movedPx = e.inputEvent[this.options.horizontal ? "deltaX" : "deltaY"];

				if (!~conf.dirData.indexOf(direction)) {
					direction = conf.dirData[+(Math.abs(touch.lastPos) <= movedPx)];
				}

				touch.lastPos = movedPx;
			} else {
				touch.lastPos = null;
			}

			conf.customEvent.flick && (eventRes = this._triggerEvent(consts.EVENTS.flick, {
				pos: pos,
				holding: e.holding,
				direction: direction || touch.direction,
				distance: touch.isTrusted ? pos - holdPos : null
			}));

			(eventRes || eventRes === null) && this._setTranslate([-pos, 0]);
		};

		/**
   * 'release' event handler
   * @private
   */


		_class.prototype._releaseHandler = function _releaseHandler(e) {
			var conf = this._conf;
			var touch = conf.touch;
			var holdPos = touch.holdPos;
			var panelSize = conf.panel.size;
			var customEvent = conf.customEvent;
			var isPlusMove = touch.holdPos < e.depaPos.flick;

			touch.distance = e.depaPos.flick - holdPos;
			touch.direction = conf.dirData[+!isPlusMove];
			touch.destPos = holdPos + (isPlusMove ? panelSize : -panelSize);

			var distance = touch.distance;
			var duration = this.options.duration;
			var moveTo = holdPos;

			if (this._isMovable()) {
				!customEvent.restoreCall && (customEvent.restore = false);
				moveTo = touch.destPos;
			} else if (Math.abs(distance) > 0) {
				this._triggerBeforeRestore(e);
			} else {
				duration = 0;
			}

			// trigger animation
			e.setTo({ flick: moveTo }, duration);

			distance === 0 && this._adjustContainerCss("end");
			touch.holding = false;

			this._setPointerEvents(); // for "click" bug
		};

		/**
   * 'animationStart' event handler
   * @private
   */


		_class.prototype._animationStartHandler = function _animationStartHandler(e) {
			var conf = this._conf;
			var panel = conf.panel;
			var customEvent = conf.customEvent;
			var isFromInput = e.inputEvent || conf.touch.lastPos;

			// when animation was started by input action
			if (!customEvent.restoreCall && isFromInput && this._setPhaseValue("start", {
				depaPos: e.depaPos.flick,
				destPos: e.destPos.flick
			}) === false) {
				e.stop();
			}

			if (isFromInput) {
				e.duration = this.options.duration;

				e.destPos.flick = panel.size * (panel.index + conf.indexToMove);
			}

			panel.animating = true;
		};

		/**
   * 'animationEnd' event handler
   * @private
   */


		_class.prototype._animationEndHandler = function _animationEndHandler() {
			var conf = this._conf;

			conf.panel.animating = false;

			this._setPhaseValue("end");
			this._triggerRestore();

			// reset isTrusted
			conf.touch.isTrusted = false;
		};

		return _class;
	}(superclass);
};

module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=flicking.pkgd.js.map