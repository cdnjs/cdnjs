/*
Copyright (c) 2016 Daybrush
name: scenejs
license: MIT
author: Daybrush
repository: https://github.com/daybrush/scenejs.git
version: 1.8.3
*/
'use strict';

var utils = require('@daybrush/utils');
var EventEmitter = require('@scena/event-emitter');
var core = require('@cfcs/core');
var OrderMap = require('order-map');
var styled = require('css-styled');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function cubic(y1, y2, t) {
    var t2 = 1 - t;
    // Bezier Curve Formula
    return t * t * t + 3 * t * t * t2 * y2 + 3 * t * t2 * t2 * y1;
}
function solveFromX(x1, x2, x) {
    // x  0 ~ 1
    // t 0 ~ 1
    var t = x;
    var solveX = x;
    var dx = 1;
    while (Math.abs(dx) > 1 / 1000) {
        // 예상 t초에 의한 _x값
        solveX = cubic(x1, x2, t);
        dx = solveX - x;
        // 차이가 미세하면 그 값을 t로 지정
        if (Math.abs(dx) < 1 / 1000) {
            return t;
        }
        t -= dx / 2;
    }
    return t;
}
/**
 * @namespace easing
 */
/**
* Cubic Bezier curve.
* @memberof easing
* @func bezier
* @param {number} [x1] - point1's x
* @param {number} [y1] - point1's y
* @param {number} [x2] - point2's x
* @param {number} [y2] - point2's y
* @return {function} the curve function
* @example
import {bezier} from "scenejs";
Scene.bezier(0, 0, 1, 1) // LINEAR
Scene.bezier(0.25, 0.1, 0.25, 1) // EASE
*/
function bezier(x1, y1, x2, y2) {
    /*
          x = f(t)
          calculate inverse function by x
          t = f-1(x)
      */
    var func = function (x) {
        var t = solveFromX(x1, x2, utils.between(x, 0, 1));
        return cubic(y1, y2, t);
    };
    func.easingName = "cubic-bezier(".concat(x1, ",").concat(y1, ",").concat(x2, ",").concat(y2, ")");
    return func;
}
/**
* Specifies a stepping function
* @see {@link https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp|CSS3 Timing Function}
* @memberof easing
* @func steps
* @param {number} count - point1's x
* @param {"start" | "end"} postion - point1's y
* @return {function} the curve function
* @example
import {steps} from "scenejs";
Scene.steps(1, "start") // Scene.STEP_START
Scene.steps(1, "end") // Scene.STEP_END
*/
function steps(count, position) {
    var func = function (time) {
        var level = 1 / count;
        if (time >= 1) {
            return 1;
        }
        return (position === "start" ? level : 0) + Math.floor(time / level) * level;
    };
    func.easingName = "steps(".concat(count, ", ").concat(position, ")");
    return func;
}
/**
* Equivalent to steps(1, start)
* @memberof easing
* @name STEP_START
* @static
* @type {function}
* @example
import {STEP_START} from "scenejs";
Scene.STEP_START // steps(1, start)
*/
var STEP_START = /*#__PURE__#*/ steps(1, "start");
/**
* Equivalent to steps(1, end)
* @memberof easing
* @name STEP_END
* @static
* @type {function}
* @example
import {STEP_END} from "scenejs";
Scene.STEP_END // steps(1, end)
*/
var STEP_END = /*#__PURE__#*/ steps(1, "end");
/**
* Linear Speed (0, 0, 1, 1)
* @memberof easing
* @name LINEAR
* @static
* @type {function}
* @example
import {LINEAR} from "scenejs";
Scene.LINEAR
*/
var LINEAR = /*#__PURE__#*/ bezier(0, 0, 1, 1);
/**
* Ease Speed (0.25, 0.1, 0.25, 1)
* @memberof easing
* @name EASE
* @static
* @type {function}
* @example
import {EASE} from "scenejs";
Scene.EASE
*/
var EASE = /*#__PURE__#*/ bezier(0.25, 0.1, 0.25, 1);
/**
* Ease In Speed (0.42, 0, 1, 1)
* @memberof easing
* @name EASE_IN
* @static
* @type {function}
* @example
import {EASE_IN} from "scenejs";
Scene.EASE_IN
*/
var EASE_IN = /*#__PURE__#*/ bezier(0.42, 0, 1, 1);
/**
* Ease Out Speed (0, 0, 0.58, 1)
* @memberof easing
* @name EASE_OUT
* @static
* @type {function}
* @example
import {EASE_OUT} from "scenejs";
Scene.EASE_OUT
*/
var EASE_OUT = /*#__PURE__#*/ bezier(0, 0, 0.58, 1);
/**
* Ease In Out Speed (0.42, 0, 0.58, 1)
* @memberof easing
* @name EASE_IN_OUT
* @static
* @type {function}
* @example
import {EASE_IN_OUT} from "scenejs";
Scene.EASE_IN_OUT
*/
var EASE_IN_OUT = /*#__PURE__#*/ bezier(0.42, 0, 0.58, 1);

var _a;
var PREFIX = "__SCENEJS_";
var DATA_SCENE_ID = "data-scene-id";
var TIMING_FUNCTION = "animation-timing-function";
var ROLES = { transform: {}, filter: {}, attribute: {}, html: true };
var ALIAS = { easing: [TIMING_FUNCTION] };
var FIXED = (_a = {}, _a[TIMING_FUNCTION] = true, _a.contents = true, _a.html = true, _a);
var MAXIMUM = 1000000;
var THRESHOLD = 0.000001;
var DURATION = "duration";
var FILL_MODE = "fillMode";
var DIRECTION = "direction";
var ITERATION_COUNT = "iterationCount";
var DELAY = "delay";
var EASING = "easing";
var PLAY_SPEED = "playSpeed";
var EASING_NAME = "easingName";
var ITERATION_TIME = "iterationTime";
var PAUSED = "paused";
var ENDED = "ended";
var TIMEUPDATE = "timeupdate";
var ANIMATE = "animate";
var PLAY = "play";
var RUNNING = "running";
var ITERATION = "iteration";
var START_ANIMATION = "startAnimation";
var PAUSE_ANIMATION = "pauseAnimation";
var ALTERNATE = "alternate";
var REVERSE = "reverse";
var ALTERNATE_REVERSE = "alternate-reverse";
var NORMAL = "normal";
var INFINITE = "infinite";
var PLAY_STATE = "playState";
var PLAY_CSS = "playCSS";
var PREV_TIME = "prevTime";
var TICK_TIME = "tickTime";
var CURRENT_TIME = "currentTime";
var SELECTOR = "selector";
var TRANSFORM_NAME = "transform";
var EASINGS = {
    "linear": LINEAR,
    "ease": EASE,
    "ease-in": EASE_IN,
    "ease-out": EASE_OUT,
    "ease-in-out": EASE_IN_OUT,
    "step-start": STEP_START,
    "step-end": STEP_END,
};
var NAME_SEPARATOR = "_///_";
/**
* option name list
* @name Scene.OPTIONS
* @memberof Scene
* @static
* @type {$ts:OptionType}
* @example
* Scene.OPTIONS // ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"]
*/
var OPTIONS = [DURATION, FILL_MODE, DIRECTION, ITERATION_COUNT, DELAY, EASING, PLAY_SPEED];
/**
* Event name list
* @name Scene.EVENTS
* @memberof Scene
* @static
* @type {$ts:EventType}
* @example
* Scene.EVENTS // ["paused", "ended", "timeupdate", "animate", "play", "iteration"];
*/
var EVENTS = [PAUSED, ENDED, TIMEUPDATE, ANIMATE, PLAY, ITERATION];

/**
* Make string, array to PropertyObject for the dot product
*/
var PropertyObject = /*#__PURE__*/ (function () {
    /**
      * @param - This value is in the array format.
      * @param - options
      * @example
  var obj = new PropertyObject([100,100,100,0.5], {
      "separator" : ",",
      "prefix" : "rgba(",
      "suffix" : ")"
  });
       */
    function PropertyObject(value, options) {
        this.prefix = "";
        this.suffix = "";
        this.model = "";
        this.type = "";
        this.separator = ",";
        options && this.setOptions(options);
        this.value = utils.isString(value) ? value.split(this.separator) : value;
    }
    PropertyObject.prototype.setOptions = function (newOptions) {
        for (var name_1 in newOptions) {
            this[name_1] = newOptions[name_1];
        }
        return this;
    };
    /**
      * the number of values.
      * @example
  const obj1 = new PropertyObject("1,2,3", ",");

  console.log(obj1.length);
  // 3
       */
    PropertyObject.prototype.size = function () {
        return this.value.length;
    };
    /**
      * retrieve one of values at the index
      * @param {Number} index - index
      * @return {Object} one of values at the index
      * @example
  const obj1 = new PropertyObject("1,2,3", ",");

  console.log(obj1.get(0));
  // 1
       */
    PropertyObject.prototype.get = function (index) {
        return this.value[index];
    };
    /**
      * Set the value at that index
      * @param {Number} index - index
      * @param {Object} value - text, a number, object to set
      * @return {PropertyObject} An instance itself
      * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  obj1.set(0, 2);
  console.log(obj1.toValue());
  // 2,2,3
       */
    PropertyObject.prototype.set = function (index, value) {
        this.value[index] = value;
        return this;
    };
    /**
      * create a copy of an instance itself.
      * @return {PropertyObject} clone
      * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  const obj2 = obj1.clone();
       */
    PropertyObject.prototype.clone = function () {
        var _a = this, separator = _a.separator, prefix = _a.prefix, suffix = _a.suffix, model = _a.model, type = _a.type;
        var arr = this.value.map(function (v) { return (isPropertyObject(v) ? v.clone() : v); });
        return new PropertyObject(arr, {
            separator: separator,
            prefix: prefix,
            suffix: suffix,
            model: model,
            type: type,
        });
    };
    /**
      * Make Property Object to String
      * @return {String} Make Property Object to String
      * @example
  //rgba(100, 100, 100, 0.5)
  const obj4 = new PropertyObject([100,100,100,0.5], {
      "separator" : ",",
      "prefix" : "rgba(",
      "suffix" : ")",
  });
  console.log(obj4.toValue());
  // "rgba(100,100,100,0.5)"
      */
    PropertyObject.prototype.toValue = function () {
        return this.prefix + this.join() + this.suffix;
    };
    /**
      * Make Property Object's array to String
      * @return {String} Join the elements of an array into a string
      * @example
      //rgba(100, 100, 100, 0.5)
      var obj4 = new PropertyObject([100,100,100,0.5], {
          "separator" : ",",
          "prefix" : "rgba(",
          "suffix" : ")"
      });
      obj4.join();  // =>   "100,100,100,0.5"
       */
    PropertyObject.prototype.join = function () {
        return this.value.map(function (v) { return (isPropertyObject(v) ? v.toValue() : v); }).join(this.separator);
    };
    /**
      * executes a provided function once per array element.
      * @param {Function} callback - Function to execute for each element, taking three arguments
      * @param {All} [callback.currentValue] The current element being processed in the array.
      * @param {Number} [callback.index] The index of the current element being processed in the array.
      * @param {Array} [callback.array] the array.
      * @return {PropertyObject} An instance itself
      * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN Array.forEach()} reference to MDN document.
      * @example
  //rgba(100, 100, 100, 0.5)
  var obj4 = new PropertyObject([100,100,100,0.5], {
      "separator" : ",",
      "prefix" : "rgba(",
      "suffix" : ")"
  });

  obj4.forEach(t => {
      console.log(t);
  });  // =>   "100,100,100,0.5"
      */
    PropertyObject.prototype.forEach = function (func) {
        this.value.forEach(func);
        return this;
    };
    return PropertyObject;
}());

/**
* @namespace
* @name Property
*/
function splitStyle(str) {
    var properties = utils.splitText(str, ";");
    var obj = {};
    var totalLength = properties.length;
    var length = totalLength;
    for (var i = 0; i < totalLength; ++i) {
        var matches = utils.splitText(properties[i], ":");
        if (matches.length < 2 || !matches[1]) {
            --length;
            continue;
        }
        obj[matches[0].trim()] = toPropertyObject(matches[1].trim());
    }
    return { styles: obj, length: length };
}
/**
* convert array to PropertyObject[type=color].
* default model "rgba"
* @memberof Property
* @function arrayToColorObject
* @param {Array|PropertyObject} value ex) [0, 0, 0, 1]
* @return {PropertyObject} PropertyObject[type=color]
* @example
arrayToColorObject([0, 0, 0])
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0, 1], separator=",")
*/
function arrayToColorObject(arr) {
    var model = utils.RGBA;
    if (arr.length === 3) {
        arr[3] = 1;
    }
    return new PropertyObject(arr, {
        model: model,
        separator: ",",
        type: "color",
        prefix: "".concat(model, "("),
        suffix: ")",
    });
}
/**
* convert text with parentheses to object.
* @memberof Property
* @function stringToBracketObject
* @param {String} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject
* @example
stringToBracketObject("abcde(0, 0, 0,1)")
// => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
*/
function stringToBracketObject(text) {
    // [prefix, value, other]
    var _a = utils.splitBracket(text), model = _a.prefix, value = _a.value, afterModel = _a.suffix;
    if (typeof value === "undefined") {
        return text;
    }
    if (utils.COLOR_MODELS.indexOf(model) > -1) {
        return arrayToColorObject(utils.stringToRGBA(text));
    }
    // divide comma(,)
    var obj = toPropertyObject(value, model);
    var arr = [value];
    var separator = ",";
    var prefix = "".concat(model, "(");
    var suffix = ")".concat(afterModel);
    if (isPropertyObject(obj)) {
        separator = obj.separator;
        arr = obj.value;
        prefix += obj.prefix;
        suffix = obj.suffix + suffix;
    }
    return new PropertyObject(arr, {
        separator: separator,
        model: model,
        prefix: prefix,
        suffix: suffix,
    });
}
function arrayToPropertyObject(arr, separator) {
    return new PropertyObject(arr, {
        type: "array",
        separator: separator,
    });
}
/**
* convert text with parentheses to PropertyObject[type=color].
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Property
* @function stringToColorObject
* @param {String|PropertyObject} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject[type=color]
* @example
stringToColorObject("rgba(0, 0, 0,1)")
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
*/
function stringToColorObject(value) {
    var result = utils.stringToRGBA(value);
    return result ? arrayToColorObject(result) : value;
}
function toPropertyObject(value, model) {
    if (!utils.isString(value)) {
        if (utils.isArray(value)) {
            return arrayToPropertyObject(value, ",");
        }
        return value;
    }
    var values = utils.splitComma(value);
    if (values.length > 1) {
        return arrayToPropertyObject(values.map(function (v) { return toPropertyObject(v); }), ",");
    }
    values = utils.splitSpace(value);
    if (values.length > 1) {
        return arrayToPropertyObject(values.map(function (v) { return toPropertyObject(v); }), " ");
    }
    values = /^(['"])([^'"]*)(['"])$/g.exec(value);
    if (values && values[1] === values[3]) {
        // Quotes
        return new PropertyObject([toPropertyObject(values[2])], {
            prefix: values[1],
            suffix: values[1],
        });
    }
    else if (value.indexOf("(") !== -1) {
        // color
        return stringToBracketObject(value);
    }
    else if (value.charAt(0) === "#" && model !== "url") {
        return stringToColorObject(value);
    }
    return value;
}
function toObject(object, result) {
    if (result === void 0) { result = {}; }
    var model = object.model;
    if (model) {
        object.setOptions({
            model: "",
            suffix: "",
            prefix: "",
        });
        var value = object.size() > 1 ? object : object.get(0);
        result[model] = value;
    }
    else {
        object.forEach(function (obj) {
            toObject(obj, result);
        });
    }
    return result;
}

function setAlias(name, alias) {
    ALIAS[name] = alias;
}
function setRole(names, isProperty, isFixedProperty) {
    var length = names.length;
    var roles = ROLES;
    var fixed = FIXED;
    for (var i = 0; i < length - 1; ++i) {
        !roles[names[i]] && (roles[names[i]] = {});
        roles = roles[names[i]];
        if (isFixedProperty) {
            !fixed[names[i]] && (fixed[names[i]] = {});
            fixed = fixed[names[i]];
        }
    }
    isFixedProperty && (fixed[names[length - 1]] = true);
    roles[names[length - 1]] = isProperty ? true : {};
}
function getType(value) {
    var type = typeof value;
    if (type === utils.OBJECT) {
        if (utils.isArray(value)) {
            return utils.ARRAY;
        }
        else if (isPropertyObject(value)) {
            return utils.PROPERTY;
        }
    }
    else if (type === utils.STRING || type === utils.NUMBER) {
        return "value";
    }
    return type;
}
function isPureObject(obj) {
    return utils.isObject(obj) && obj.constructor === Object;
}
function getNames(names, stack) {
    var arr = [];
    if (isPureObject(names)) {
        for (var name_1 in names) {
            stack.push(name_1);
            arr = arr.concat(getNames(names[name_1], stack));
            stack.pop();
        }
    }
    else {
        arr.push(stack.slice());
    }
    return arr;
}
function updateFrame(names, properties) {
    for (var name_2 in properties) {
        var value = properties[name_2];
        if (!isPureObject(value)) {
            names[name_2] = true;
            continue;
        }
        if (!utils.isObject(names[name_2])) {
            names[name_2] = {};
        }
        updateFrame(names[name_2], properties[name_2]);
    }
    return names;
}
function toFixed(num) {
    return Math.round(num * MAXIMUM) / MAXIMUM;
}
function getValueByNames(names, properties, length) {
    if (length === void 0) { length = names.length; }
    var value = properties;
    for (var i = 0; i < length; ++i) {
        if (!utils.isObject(value) || value == null) {
            return undefined;
        }
        value = value[names[i]];
    }
    return value;
}
function isInProperties(roles, args, isLast) {
    var length = args.length;
    var role = roles;
    if (length === 0) {
        return false;
    }
    for (var i = 0; i < length; ++i) {
        if (role === true) {
            return false;
        }
        role = role[args[i]];
        if (!role || (!isLast && role === true)) {
            return false;
        }
    }
    return true;
}
/**
 * @memberof Scene
 * @param - Property names
 * @param - Whether the property is the last property that cannot be an object (non-partitionable)
 */
function isRole(args, isLast) {
    return isInProperties(ROLES, args, isLast);
}
function isFixed(args) {
    return isInProperties(FIXED, args, true);
}
function setPlayCSS(item, isActivate) {
    item.state[PLAY_CSS] = isActivate;
}
function isPausedCSS(item) {
    return item.state[PLAY_CSS] && item.isPaused();
}
function isEndedCSS(item) {
    return !item.isEnded() && item.state[PLAY_CSS];
}
function makeId(selector) {
    for (;;) {
        var id = "".concat(Math.floor(Math.random() * 10000000));
        if (!utils.IS_WINDOW || !selector) {
            return id;
        }
        var checkElement = utils.$("[data-scene-id=\"".concat(id, "\"]"));
        if (!checkElement) {
            return id;
        }
    }
}
function getRealId(item) {
    return item.getId() || item.setId(makeId(false)).getId();
}
function toId(text) {
    return "".concat(text).match(/[0-9a-zA-Z]+/g).join("");
}
function playCSS(item, isExportCSS, playClassName, properties) {
    if (properties === void 0) { properties = {}; }
    if (!utils.ANIMATION || item.getPlayState() === RUNNING) {
        return;
    }
    var className = playClassName || START_ANIMATION;
    if (isPausedCSS(item)) {
        item.addPlayClass(true, className, properties);
    }
    else {
        if (item.isEnded()) {
            item.setTime(0);
        }
        isExportCSS && item.exportCSS({ className: className });
        var el = item.addPlayClass(false, className, properties);
        if (!el) {
            return;
        }
        addAnimationEvent(item, el);
        setPlayCSS(item, true);
    }
    item.setPlayState(RUNNING);
}
function addAnimationEvent(item, el) {
    var state = item.state;
    var duration = item.getDuration();
    var isZeroDuration = !duration || !isFinite(duration);
    var animationend = function () {
        setPlayCSS(item, false);
        item.finish();
    };
    var animationstart = function () {
        item.trigger(PLAY);
        utils.addEvent(el, "animationcancel", animationend);
        utils.addEvent(el, "animationend", animationend);
        utils.addEvent(el, "animationiteration", animationiteration);
    };
    item.once(ENDED, function () {
        utils.removeEvent(el, "animationcancel", animationend);
        utils.removeEvent(el, "animationend", animationend);
        utils.removeEvent(el, "animationiteration", animationiteration);
        utils.removeEvent(el, "animationstart", animationstart);
    });
    var animationiteration = function (_a) {
        var elapsedTime = _a.elapsedTime;
        var currentTime = elapsedTime;
        var iterationCount = isZeroDuration ? 0 : (currentTime / duration);
        state[CURRENT_TIME] = currentTime;
        item.setIteration(iterationCount);
    };
    utils.addEvent(el, "animationstart", animationstart);
}
function getEasing(curveArray) {
    var easing;
    if (utils.isString(curveArray)) {
        if (curveArray in EASINGS) {
            easing = EASINGS[curveArray];
        }
        else {
            var obj = toPropertyObject(curveArray);
            if (utils.isString(obj)) {
                return 0;
            }
            else {
                if (obj.model === "cubic-bezier") {
                    curveArray = obj.value.map(function (v) { return parseFloat(v); });
                    easing = bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]);
                }
                else if (obj.model === "steps") {
                    easing = steps(parseFloat(obj.value[0]), obj.value[1]);
                }
                else {
                    return 0;
                }
            }
        }
    }
    else if (utils.isArray(curveArray)) {
        easing = bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]);
    }
    else {
        easing = curveArray;
    }
    return easing;
}
function isPropertyObject(value) {
    if (!value) {
        return false;
    }
    var prototype = value.constructor.prototype;
    return !!(prototype.clone && prototype.get && prototype.setOptions);
}
function isScene(value) {
    return value && !!value.constructor.prototype.getItem;
}
function isSceneItem(value) {
    return (value && !!value.constructor.prototype.getFrame);
}
function isFrame(value) {
    return value && !!value.constructor.prototype.toCSS;
}
function flatSceneObject(obj, seperator) {
    var newObj = {};
    for (var name_3 in obj) {
        var value = obj[name_3];
        if (isFrame(value)) {
            newObj[name_3] = value;
        }
        else if (utils.isObject(value)) {
            var nextObj = flatSceneObject(value, seperator);
            for (var nextName in nextObj) {
                newObj["".concat(name_3).concat(seperator).concat(nextName)] = nextObj[nextName];
            }
        }
    }
    return newObj;
}
function selectorAll(callback, defaultCount) {
    if (defaultCount === void 0) { defaultCount = 0; }
    var nextCallback = callback.bind({});
    nextCallback.defaultCount = defaultCount;
    return nextCallback;
}

function GetterSetter(getter, setter, parent) {
    return function (constructor) {
        var prototype = constructor.prototype;
        getter.forEach(function (name) {
            prototype[utils.camelize("get ".concat(name))] = function () {
                return this[parent][name];
            };
        });
        setter.forEach(function (name) {
            prototype[utils.camelize("set ".concat(name))] = function (value) {
                this[parent][name] = value;
                return this;
            };
        });
    };
}
function isDirectionReverse(iteration, iteraiontCount, direction) {
    if (direction === REVERSE) {
        return true;
    }
    else if (iteraiontCount !== INFINITE && iteration === iteraiontCount && iteraiontCount % 1 === 0) {
        return direction === (iteration % 2 >= 1 ? ALTERNATE_REVERSE : ALTERNATE);
    }
    return direction === (iteration % 2 >= 1 ? ALTERNATE : ALTERNATE_REVERSE);
}
/**
* @typedef {Object} AnimatorState The Animator options. Properties used in css animation.
* @property {number} [duration] The duration property defines how long an animation should take to complete one cycle.
* @property {"none"|"forwards"|"backwards"|"both"} [fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
* @property {"infinite"|number} [iterationCount] The iterationCount property specifies the number of times an animation should be played.
* @property {array|function} [easing] The easing(timing-function) specifies the speed curve of an animation.
* @property {number} [delay] The delay property specifies a delay for the start of an animation.
* @property {"normal"|"reverse"|"alternate"|"alternate-reverse"} [direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
*/
var ANIMATOR_SETTERS = [
    "id", ITERATION_COUNT, DELAY, FILL_MODE,
    DIRECTION, PLAY_SPEED, DURATION,
    PLAY_SPEED, ITERATION_TIME, PLAY_STATE,
];
var ANIMATOR_GETTERS = __spreadArray(__spreadArray([], ANIMATOR_SETTERS, true), [
    EASING, EASING_NAME,
], false);
/**
* play video, animation, the others
* @extends EventEmitter
* @see {@link https://www.w3schools.com/css/css3_animations.asp CSS3 Animation}
*/
var Animator = /*#__PURE__*/ (function (_super) {
    __extends(Animator, _super);
    /**
     * @param - animator's options
     * @example
  const animator = new Animator({
      delay: 2,
      diretion: "alternate",
      duration: 2,
      fillMode: "forwards",
      iterationCount: 3,
      easing: Scene.easing.EASE,
  });
     */
    function Animator(options) {
        var _this = _super.call(this) || this;
        _this.timerId = 0;
        _this.state = core.reactive({
            id: "",
            easing: 0,
            easingName: "linear",
            iterationCount: 1,
            delay: 0,
            fillMode: "forwards",
            direction: NORMAL,
            playSpeed: 1,
            currentTime: 0,
            iterationTime: -1,
            iteration: 0,
            tickTime: 0,
            prevTime: 0,
            playState: PAUSED,
            duration: 0,
        });
        _this.setOptions(options);
        return _this;
    }
    /**
      * set animator's easing.
      * @param curverArray - The speed curve of an animation.
      * @return {Animator} An instance itself.
      * @example
  animator.({
      delay: 2,
      diretion: "alternate",
      duration: 2,
      fillMode: "forwards",
      iterationCount: 3,
      easing: Scene.easing.EASE,
  });
      */
    Animator.prototype.setEasing = function (curveArray) {
        var easing = getEasing(curveArray);
        var easingName = easing && easing[EASING_NAME] || "linear";
        var state = this.state;
        state[EASING] = easing;
        state[EASING_NAME] = easingName;
        return this;
    };
    /**
      * set animator's options.
      * @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
      * @param - animator's options
      * @return {Animator} An instance itself.
      * @example
  animator.({
      delay: 2,
      diretion: "alternate",
      duration: 2,
      fillMode: "forwards",
      iterationCount: 3,
      easing: Scene.eaasing.EASE,
  });
      */
    Animator.prototype.setOptions = function (options) {
        if (options === void 0) { options = {}; }
        for (var name_1 in options) {
            var value = options[name_1];
            if (name_1 === EASING) {
                this.setEasing(value);
                continue;
            }
            else if (name_1 === DURATION) {
                value && this.setDuration(value);
                continue;
            }
            if (OPTIONS.indexOf(name_1) > -1) {
                this.state[name_1] = value;
            }
        }
        return this;
    };
    /**
      * Get the animator's total duration including delay
      * @return {number} Total duration
      * @example
  animator.getTotalDuration();
      */
    Animator.prototype.getTotalDuration = function () {
        return this.getActiveDuration(true);
    };
    /**
      * Get the animator's total duration excluding delay
      * @return {number} Total duration excluding delay
      * @example
  animator.getActiveDuration();
      */
    Animator.prototype.getActiveDuration = function (delay) {
        var state = this.state;
        var count = state[ITERATION_COUNT];
        if (count === INFINITE) {
            return Infinity;
        }
        return (delay ? state[DELAY] : 0) + this.getDuration() * count;
    };
    /**
      * Check if the animator has reached the end.
      * @return {boolean} ended
      * @example
  animator.isEnded(); // true or false
      */
    Animator.prototype.isEnded = function () {
        if (this.state[TICK_TIME] === 0 && this.state[PLAY_STATE] === PAUSED) {
            return true;
        }
        else if (this.getTime() < this.getActiveDuration()) {
            return false;
        }
        return true;
    };
    /**
      *Check if the animator is paused:
      * @return {boolean} paused
      * @example
  animator.isPaused(); // true or false
      */
    Animator.prototype.isPaused = function () {
        return this.state[PLAY_STATE] === PAUSED;
    };
    Animator.prototype.start = function (delay) {
        if (delay === void 0) { delay = this.state[DELAY]; }
        var state = this.state;
        state[PLAY_STATE] = RUNNING;
        if (state[TICK_TIME] >= delay) {
            /**
             * This event is fired when play animator.
             * @event Animator#play
             */
            this.trigger(PLAY);
            return true;
        }
        return false;
    };
    /**
      * play animator
      * @return {Animator} An instance itself.
      */
    Animator.prototype.play = function (toTime) {
        var _this = this;
        var state = this.state;
        var delay = state[DELAY];
        var currentTime = this.getTime();
        state[PLAY_STATE] = RUNNING;
        if (this.isEnded() && (currentTime === 0 || currentTime >= this.getActiveDuration())) {
            this.setTime(-delay, true);
        }
        this.timerId = utils.requestAnimationFrame(function (time) {
            state[PREV_TIME] = time;
            _this.tick(time, toTime);
        });
        this.start();
        return this;
    };
    /**
      * pause animator
      * @return {Animator} An instance itself.
      */
    Animator.prototype.pause = function () {
        var state = this.state;
        if (state[PLAY_STATE] !== PAUSED) {
            state[PLAY_STATE] = PAUSED;
            /**
             * This event is fired when animator is paused.
             * @event Animator#paused
             */
            this.trigger(PAUSED);
        }
        utils.cancelAnimationFrame(this.timerId);
        return this;
    };
    /**
       * end animator
       * @return {Animator} An instance itself.
      */
    Animator.prototype.finish = function () {
        this.setTime(0);
        this.state[TICK_TIME] = 0;
        this.end();
        return this;
    };
    /**
       * end animator
       * @return {Animator} An instance itself.
      */
    Animator.prototype.end = function () {
        this.pause();
        /**
             * This event is fired when animator is ended.
             * @event Animator#ended
             */
        this.trigger(ENDED);
        return this;
    };
    /**
      * set currentTime
      * @param {Number|String} time - currentTime
      * @return {Animator} An instance itself.
      * @example

  animator.setTime("from"); // 0
  animator.setTime("to"); // 100%
  animator.setTime("50%");
  animator.setTime(10);
  animator.getTime() // 10
      */
    Animator.prototype.setTime = function (time, isTick, isParent) {
        var activeDuration = this.getActiveDuration();
        var state = this.state;
        var prevTime = state[TICK_TIME];
        var delay = state[DELAY];
        var currentTime = isTick ? time : this.getUnitTime(time);
        state[TICK_TIME] = delay + currentTime;
        if (currentTime < 0) {
            currentTime = 0;
        }
        else if (currentTime > activeDuration) {
            currentTime = activeDuration;
        }
        state[CURRENT_TIME] = currentTime;
        this.calculate();
        if (isTick && !isParent) {
            var tickTime = state[TICK_TIME];
            if (prevTime < delay && time >= 0) {
                this.start(0);
            }
            if (tickTime < prevTime || this.isEnded()) {
                this.end();
                return this;
            }
        }
        if (this.isDelay()) {
            return this;
        }
        /**
             * This event is fired when the animator updates the time.
             * @event Animator#timeupdate
             * @param {Object} param The object of data to be sent to an event.
             * @param {Number} param.currentTime The total time that the animator is running.
             * @param {Number} param.time The iteration time during duration that the animator is running.
             * @param {Number} param.iterationCount The iteration count that the animator is running.
             */
        this.trigger(TIMEUPDATE, {
            currentTime: currentTime,
            time: this.getIterationTime(),
            iterationCount: state[ITERATION],
        });
        return this;
    };
    /**
      * Get the animator's current time
      * @return {number} current time
      * @example
  animator.getTime();
      */
    Animator.prototype.getTime = function () {
        return this.state[CURRENT_TIME];
    };
    Animator.prototype.getUnitTime = function (time) {
        if (utils.isString(time)) {
            var duration = this.getDuration() || 100;
            if (time === "from") {
                return 0;
            }
            else if (time === "to") {
                return duration;
            }
            var _a = utils.splitUnit(time), unit = _a.unit, value = _a.value;
            if (unit === "%") {
                !this.getDuration() && (this.setDuration(duration));
                return toFixed(parseFloat(time) / 100 * duration);
            }
            else if (unit === ">") {
                return value + THRESHOLD;
            }
            else {
                return value;
            }
        }
        else {
            return toFixed(time);
        }
    };
    /**
       * Check if the current state of animator is delayed.
       * @return {boolean} check delay state
       */
    Animator.prototype.isDelay = function () {
        var state = this.state;
        var delay = state[DELAY];
        var tickTime = state[TICK_TIME];
        return delay > 0 && (tickTime < delay);
    };
    Animator.prototype.setIteration = function (iterationCount) {
        var state = this.state;
        var passIterationCount = Math.floor(iterationCount);
        var maxIterationCount = state[ITERATION_COUNT] === INFINITE ? Infinity : state[ITERATION_COUNT];
        if (state[ITERATION] < passIterationCount && passIterationCount < maxIterationCount) {
            /**
                  * The event is fired when an iteration of an animation ends.
                  * @event Animator#iteration
                  * @param {Object} param The object of data to be sent to an event.
                  * @param {Number} param.currentTime The total time that the animator is running.
                  * @param {Number} param.iterationCount The iteration count that the animator is running.
                  */
            this.trigger(ITERATION, {
                currentTime: state[CURRENT_TIME],
                iterationCount: passIterationCount,
            });
        }
        state[ITERATION] = iterationCount;
        return this;
    };
    Animator.prototype.calculate = function () {
        var state = this.state;
        var iterationCount = state[ITERATION_COUNT];
        var fillMode = state[FILL_MODE];
        var direction = state[DIRECTION];
        var duration = this.getDuration();
        var time = this.getTime();
        var iteration = duration === 0 ? 0 : time / duration;
        var currentIterationTime = duration ? time % duration : 0;
        if (!duration) {
            this.setIterationTime(0);
            return this;
        }
        this.setIteration(iteration);
        // direction : normal, reverse, alternate, alternate-reverse
        // fillMode : forwards, backwards, both, none
        var isReverse = isDirectionReverse(iteration, iterationCount, direction);
        var isFiniteDuration = isFinite(duration);
        if (isFiniteDuration && isReverse) {
            currentIterationTime = duration - currentIterationTime;
        }
        if (isFiniteDuration && iterationCount !== INFINITE) {
            var isForwards = fillMode === "both" || fillMode === "forwards";
            // fill forwards
            if (iteration >= iterationCount) {
                currentIterationTime = duration * (isForwards ? (iterationCount % 1) || 1 : 0);
                isReverse && (currentIterationTime = duration - currentIterationTime);
            }
        }
        this.setIterationTime(currentIterationTime);
        return this;
    };
    Animator.prototype.tick = function (now, to) {
        var _this = this;
        if (this.isPaused()) {
            return;
        }
        var state = this.state;
        var playSpeed = state[PLAY_SPEED];
        var prevTime = state[PREV_TIME];
        var delay = state[DELAY];
        var tickTime = state[TICK_TIME];
        var currentTime = tickTime + Math.min(1000, now - prevTime) / 1000 * playSpeed;
        state[PREV_TIME] = now;
        this.setTime(currentTime - delay, true);
        if (to && to * 1000 < now) {
            this.pause();
        }
        if (state[PLAY_STATE] === PAUSED) {
            return;
        }
        this.timerId = utils.requestAnimationFrame(function (time) {
            _this.tick(time, to);
        });
    };
    Animator = __decorate([
        GetterSetter(ANIMATOR_GETTERS, ANIMATOR_SETTERS, "state")
    ], Animator);
    return Animator;
}(EventEmitter));

function toInnerProperties(obj, orders) {
    if (orders === void 0) { orders = []; }
    if (!obj) {
        return "";
    }
    var arrObj = [];
    var keys = utils.getKeys(obj);
    utils.sortOrders(keys, orders);
    keys.forEach(function (name) {
        arrObj.push("".concat(name.replace(/\d$/g, ""), "(").concat(obj[name], ")"));
    });
    return arrObj.join(" ");
}
/* eslint-disable */
function clone(target, toValue) {
    if (toValue === void 0) { toValue = false; }
    return merge({}, target, toValue);
}
function merge(to, from, toValue) {
    if (toValue === void 0) { toValue = false; }
    for (var name_1 in from) {
        var value = from[name_1];
        var type = getType(value);
        if (type === utils.PROPERTY) {
            to[name_1] = toValue ? value.toValue() : value.clone();
        }
        else if (type === utils.FUNCTION) {
            to[name_1] = toValue ? getValue([name_1], value) : value;
        }
        else if (type === utils.ARRAY) {
            to[name_1] = value.slice();
        }
        else if (type === utils.OBJECT) {
            if (utils.isObject(to[name_1]) && !isPropertyObject(to[name_1])) {
                merge(to[name_1], value, toValue);
            }
            else {
                to[name_1] = clone(value, toValue);
            }
        }
        else {
            to[name_1] = from[name_1];
        }
    }
    return to;
}
/* eslint-enable */
function getPropertyName(args) {
    return args[0] in ALIAS ? ALIAS[args[0]] : args;
}
function getValue(names, value) {
    var type = getType(value);
    if (type === utils.PROPERTY) {
        return value.toValue();
    }
    else if (type === utils.FUNCTION) {
        if (names[0] !== TIMING_FUNCTION) {
            return getValue(names, value());
        }
    }
    else if (type === utils.OBJECT) {
        return clone(value, true);
    }
    return value;
}
/**
* Animation's Frame
*/
var Frame = /*#__PURE__*/ (function (_super) {
    __extends(Frame, _super);
    /**
     * @param - properties
     * @example
  const frame = new Scene.Frame({
      display: "none"
      transform: {
          translate: "50px",
          scale: "5, 5",
      }
  });
     */
    function Frame(properties) {
        if (properties === void 0) { properties = {}; }
        var _this = _super.call(this) || this;
        _this.properties = {};
        _this.orderMap = new OrderMap(NAME_SEPARATOR);
        _this.properties = {};
        // this.orders = [];
        _this.set(properties);
        return _this;
    }
    /**
      * get property value
      * @param {...Number|String|PropertyObject} args - property name or value
      * @example
      frame.get("display") // => "none", "block", ....
      frame.get("transform", "translate") // => "10px,10px"
      */
    Frame.prototype.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value = this.raw.apply(this, args);
        return getValue(getPropertyName(args), value);
    };
    /**
      * get properties orders
      * @param - property names
      * @example
      frame.getOrders(["display"]) // => []
      frame.getOrders(["transform"]) // => ["translate", "scale"]
      */
    Frame.prototype.getOrders = function (names) {
        return this.orderMap.get(names);
    };
    /**
      * set properties orders
      * @param - property names
      * @param - orders
      * @example
      frame.getOrders(["transform"]) // => ["translate", "scale"]
      frame.setOrders(["transform"], ["scale", "tralsate"])
      */
    Frame.prototype.setOrders = function (names, orders) {
        var result = this.orderMap.set(names, orders);
        this._update();
        return result;
    };
    /**
      * get properties order object
      * @example
      console.log(frame.getOrderObject());
      */
    Frame.prototype.getOrderObject = function () {
        return this.orderMap.getObject();
    };
    /**
      * set properties orders object
      * @param - properties orders object
      * @example
      frame.setOrderObject({
          "": ["transform"],
          "transform": ["scale", "tralsate"],
      });
      */
    Frame.prototype.setOrderObject = function (obj) {
        this.orderMap.setObject(obj);
        this._update();
    };
    /**
      * get property keys
      * @param - property names
      * @example
      frame.gets("display") // => []
      frame.gets("transform") // => ["translate"]
      */
    Frame.prototype.getKeys = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value = this.raw.apply(this, args);
        var keys = getType(value) === utils.OBJECT ? utils.getKeys(value) : [];
        utils.sortOrders(keys, this.orderMap.get(args));
        return keys;
    };
    /**
      * get properties array
      * @param - property names
      * @example
      frame.gets("display") // => []
      frame.gets("transform") // => [{ key: "translate", value: "10px, 10px", children: [] }]
      */
    Frame.prototype.gets = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var values = this.get.apply(this, args);
        var keys = this.getKeys.apply(this, args);
        return keys.map(function (key) {
            var nextValue = values[key];
            return { key: key, value: nextValue, children: _this.gets.apply(_this, __spreadArray(__spreadArray([], args, false), [key], false)) };
        });
    };
    Frame.prototype.raw = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return getValueByNames(getPropertyName(args), this.properties);
    };
    /**
      * remove property value
      * @param {...String} args - property name
      * @return {Frame} An instance itself
      * @example
      frame.remove("display")
      */
    Frame.prototype.remove = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = getPropertyName(args);
        var length = params.length;
        if (!length) {
            return this;
        }
        this.orderMap.remove(params);
        var value = getValueByNames(params, this.properties, length - 1);
        if (utils.isObject(value)) {
            delete value[params[length - 1]];
        }
        this._update();
        return this;
    };
    /**
      * set property
      * @param {...Number|String|PropertyObject} args - property names or values
      * @return {Frame} An instance itself
      * @example
  // one parameter
  frame.set({
      display: "none",
      transform: {
          translate: "10px, 10px",
          scale: "1",
      },
      filter: {
          brightness: "50%",
          grayscale: "100%"
      }
  });

  // two parameters
  frame.set("transform", {
      translate: "10px, 10px",
      scale: "1",
  });

  // three parameters
  frame.set("transform", "translate", "50px");
    */
    Frame.prototype.set = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._set.apply(this, args);
        this._update();
        return this;
    };
    /**
      * Gets the names of properties.
      * @return the names of properties.
      * @example
  // one parameter
  frame.set({
      display: "none",
      transform: {
          translate: "10px, 10px",
          scale: "1",
      },
  });

  // [["display"], ["transform", "translate"], ["transform", "scale"]]
  console.log(frame.getNames());
    */
    Frame.prototype.getNames = function () {
        return getNames(this.properties, []);
    };
    /**
      * check that has property.
      * @param {...String} args - property name
      * @example
      frame.has("property", "display") // => true or false
      */
    Frame.prototype.has = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = getPropertyName(args);
        var length = params.length;
        if (!length) {
            return false;
        }
        return !utils.isUndefined(getValueByNames(params, this.properties, length));
    };
    /**
      * clone frame.
      * @return {Frame} An instance of clone
      * @example
      frame.clone();
      */
    Frame.prototype.clone = function () {
        var frame = new Frame();
        frame.setOrderObject(this.orderMap.orderMap);
        return frame.merge(this);
    };
    /**
      * merge one frame to other frame.
      * @param - target frame.
      * @return {Frame} An instance itself
      * @example
      frame.merge(frame2);
      */
    Frame.prototype.merge = function (frame) {
        var properties = this.properties;
        var frameProperties = frame.properties;
        if (frameProperties) {
            merge(properties, frameProperties);
        }
        return this;
    };
    /**
      * Specifies an css object that coverted the frame.
      * @param - If you want to return camel case name like css property or react, use the following parameter
      * @return {object} cssObject
      */
    Frame.prototype.toCSSObject = function (useCamelCase) {
        var properties = this.get();
        var cssObject = {};
        for (var name_2 in properties) {
            if (isRole([name_2], true)) {
                continue;
            }
            var value = properties[name_2];
            if (name_2 === TIMING_FUNCTION) {
                name_2 = TIMING_FUNCTION.replace("animation", utils.ANIMATION);
                value = (utils.isString(value) ? value : value[EASING_NAME]) || "initial";
            }
            if (useCamelCase) {
                name_2 = utils.camelize(name_2.replace(/^[-]+/g, ""));
            }
            cssObject[name_2] = value;
        }
        var transform = toInnerProperties(properties[TRANSFORM_NAME], this.orderMap.get([TRANSFORM_NAME]));
        var filter = toInnerProperties(properties.filter, this.orderMap.get([utils.FILTER]));
        utils.TRANSFORM && transform && (cssObject[utils.TRANSFORM] = transform);
        utils.FILTER && filter && (cssObject[utils.FILTER] = filter);
        return cssObject;
    };
    /**
      * Specifies an css text that coverted the frame.
      * @return {string} cssText
      */
    Frame.prototype.toCSSText = function () {
        var cssObject = this.toCSSObject();
        var cssArray = [];
        var keys = utils.getKeys(cssObject);
        utils.sortOrders(keys, this.orderMap.get([]));
        keys.forEach(function (name) {
            cssArray.push("".concat(utils.decamelize(name, "-"), ":").concat(cssObject[name], ";"));
        });
        return cssArray.join("");
    };
    /**
      * Specifies an css text that coverted the frame.
      * Use `toCSSText()` method.
      * @deprecated
      * @return {string} cssText
      */
    Frame.prototype.toCSS = function () {
        var cssObject = this.toCSSObject();
        var cssArray = [];
        var keys = utils.getKeys(cssObject);
        utils.sortOrders(keys, this.orderMap.get([]));
        keys.forEach(function (name) {
            cssArray.push("".concat(name, ":").concat(cssObject[name], ";"));
        });
        return cssArray.join("");
    };
    /**
      * Remove All Properties
      * @return {Frame} An instance itself
      */
    Frame.prototype.clear = function () {
        this.properties = {};
        this.orderMap.clear();
        return this;
    };
    Frame.prototype._set = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        var length = args.length;
        var params = args.slice(0, -1);
        var value = args[length - 1];
        var firstParam = params[0];
        if (length === 1 && isFrame(value)) {
            self.merge(value);
        }
        else if (firstParam in ALIAS) {
            self._setByPath(ALIAS[firstParam], value);
        }
        else if (length === 2 && utils.isArray(firstParam)) {
            self._setByPath(firstParam, value);
        }
        else if (isPropertyObject(value)) {
            if (isRole(params)) {
                self._set.apply(self, __spreadArray(__spreadArray([], params, false), [toObject(value)], false));
            }
            else {
                self._setByPath(params, value);
            }
        }
        else if (utils.isArray(value)) {
            self._setByPath(params, value);
        }
        else if (utils.isObject(value)) {
            if (!self.has.apply(self, params) && isRole(params)) {
                self._setByPath(params, {});
            }
            for (var name_3 in value) {
                self._set.apply(self, __spreadArray(__spreadArray([], params, false), [name_3, value[name_3]], false));
            }
        }
        else if (utils.isString(value)) {
            if (isRole(params, true)) {
                if (isFixed(params) || !isRole(params)) {
                    this._setByPath(params, value);
                }
                else {
                    var obj = toPropertyObject(value);
                    if (utils.isObject(obj)) {
                        self._set.apply(self, __spreadArray(__spreadArray([], params, false), [obj], false));
                    }
                }
                return this;
            }
            else {
                var _a = splitStyle(value), styles = _a.styles, stylesLength = _a.length;
                for (var name_4 in styles) {
                    self._set.apply(self, __spreadArray(__spreadArray([], params, false), [name_4, styles[name_4]], false));
                }
                if (stylesLength) {
                    return this;
                }
            }
            self._setByPath(params, value);
        }
        else {
            self._setByPath(params, value);
        }
    };
    Frame.prototype._setByPath = function (path, value) {
        var properties = this.properties;
        var length = path.length;
        for (var i = 0; i < length - 1; ++i) {
            var name_5 = path[i];
            !(name_5 in properties) && (properties[name_5] = {});
            properties = properties[name_5];
        }
        if (!length) {
            return;
        }
        var lastParam = path[length - 1];
        this.orderMap.add(path);
        if (length === 1 && lastParam === TIMING_FUNCTION) {
            properties[lastParam] = getEasing(value);
        }
        else {
            properties[lastParam] = utils.isString(value) && !isFixed(path)
                ? toPropertyObject(value, lastParam)
                : value;
        }
    };
    Frame.prototype._update = function () {
        this.emit("update");
    };
    return Frame;
}(EventEmitter));

function dotArray(a1, a2, b1, b2) {
    var length = a2.length;
    return a1.map(function (v1, i) {
        if (i >= length) {
            return v1;
        }
        else {
            return dot(v1, a2[i], b1, b2);
        }
    });
}
function dotColor(color1, color2, b1, b2) {
    // convert array to PropertyObject(type=color)
    var value1 = color1.value;
    var value2 = color2.value;
    // If the model name is not same, the inner product is impossible.
    var model1 = color1.model;
    var model2 = color2.model;
    if (model1 !== model2) {
        // It is recognized as a string.
        return dot(color1.toValue(), color2.toValue(), b1, b2);
    }
    if (value1.length === 3) {
        value1[3] = 1;
    }
    if (value2.length === 3) {
        value2[3] = 1;
    }
    var v = dotArray(value1, value2, b1, b2);
    var colorModel = model1;
    for (var i = 0; i < 3; ++i) {
        v[i] = parseInt(v[i], 10);
    }
    var object = new PropertyObject(v, {
        type: "color",
        model: colorModel,
        prefix: "".concat(colorModel, "("),
        suffix: ")",
    });
    return object;
}
function dotObject(a1, a2, b1, b2) {
    var a1Type = a1.type;
    if (a1Type === "color") {
        return dotColor(a1, a2, b1, b2);
    }
    var value1 = a1.value;
    var value2 = a2.value;
    var arr = dotArray(value1, value2, b1, b2);
    return new PropertyObject(arr, {
        type: a1Type,
        separator: a1.separator || a2.separator,
        prefix: a1.prefix || a2.prefix,
        suffix: a1.suffix || a2.suffix,
        model: a1.model || a2.model,
    });
}
/**
* The dot product of a1 and a2 for the b1 and b2.
* @memberof Dot
* @function dot
* @param {String|Number|PropertyObject} a1 value1
* @param {String|Number|PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {String} Not Array, Not Separator, Only Number & Unit
* @return {PropertyObject} Array with Separator.
* @example
dot(1, 3, 0.3, 0.7);
// => 1.6
*/
function dot(a1, a2, b1, b2) {
    if (b2 === 0) {
        return a2;
    }
    else if (b1 === 0 || b1 + b2 === 0) {
        // prevent division by zero.
        return a1;
    }
    // dot Object
    var type1 = getType(a1);
    var type2 = getType(a2);
    var isFunction1 = type1 === utils.FUNCTION;
    var isFunction2 = type2 === utils.FUNCTION;
    if (isFunction1 || isFunction2) {
        return function () {
            return dot(isFunction1 ? toPropertyObject(a1()) : a1, isFunction2 ? toPropertyObject(a2()) : a2, b1, b2);
        };
    }
    else if (type1 === type2) {
        if (type1 === utils.PROPERTY) {
            return dotObject(a1, a2, b1, b2);
        }
        else if (type1 === utils.ARRAY) {
            return dotArray(a1, a2, b1, b2);
        }
        else if (type1 !== "value") {
            return a1;
        }
    }
    else {
        return a1;
    }
    var v1 = utils.splitUnit("".concat(a1));
    var v2 = utils.splitUnit("".concat(a2));
    var v;
    // 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환
    if (isNaN(v1.value) || isNaN(v2.value)) {
        return a1;
    }
    else {
        v = utils.dot(v1.value, v2.value, b1, b2);
    }
    var prefix = v1.prefix || v2.prefix;
    var unit = v1.unit || v2.unit;
    if (!prefix && !unit) {
        return v;
    }
    return prefix + v + unit;
}
function dotValue(time, prevTime, nextTime, prevValue, nextValue, easing) {
    if (time === prevTime) {
        return prevValue;
    }
    else if (time === nextTime) {
        return nextValue;
    }
    else if (!easing) {
        return dot(prevValue, nextValue, time - prevTime, nextTime - time);
    }
    var ratio = easing((time - prevTime) / (nextTime - prevTime));
    var value = dot(prevValue, nextValue, ratio, 1 - ratio);
    return value;
}

function getNearTimeIndex(times, time) {
    var length = times.length;
    for (var i = 0; i < length; ++i) {
        if (times[i] === time) {
            return [i, i];
        }
        else if (times[i] > time) {
            return [i > 0 ? i - 1 : 0, i];
        }
    }
    return [length - 1, length - 1];
}
function makeAnimationProperties(properties) {
    var cssArray = [];
    for (var name_1 in properties) {
        cssArray.push("".concat(utils.ANIMATION, "-").concat(utils.decamelize(name_1), ":").concat(properties[name_1], ";"));
    }
    return cssArray.join("");
}
function addTime(times, time) {
    var length = times.length;
    for (var i = 0; i < length; ++i) {
        if (time < times[i]) {
            times.splice(i, 0, time);
            return;
        }
    }
    times[length] = time;
}
function addEntry(entries, time, keytime) {
    var prevEntry = entries[entries.length - 1];
    (!prevEntry || prevEntry[0] !== time || prevEntry[1] !== keytime) &&
        entries.push([toFixed(time), toFixed(keytime)]);
}
function getEntries(times, states) {
    var entries = times.map(function (time) { return ([time, time]); });
    var nextEntries = [];
    states.forEach(function (state) {
        var iterationCount = state[ITERATION_COUNT];
        var delay = state[DELAY];
        var playSpeed = state[PLAY_SPEED];
        var direction = state[DIRECTION];
        var intCount = Math.ceil(iterationCount);
        var currentDuration = entries[entries.length - 1][0];
        var length = entries.length;
        var lastTime = currentDuration * iterationCount;
        for (var i = 0; i < intCount; ++i) {
            var isReverse = direction === REVERSE ||
                direction === ALTERNATE && i % 2 ||
                direction === ALTERNATE_REVERSE && !(i % 2);
            for (var j = 0; j < length; ++j) {
                var entry = entries[isReverse ? length - j - 1 : j];
                var time = entry[1];
                var currentTime = currentDuration * i + (isReverse ? currentDuration - entry[0] : entry[0]);
                var prevEntry = entries[isReverse ? length - j : j - 1];
                if (currentTime > lastTime) {
                    if (j !== 0) {
                        var prevTime = currentDuration * i +
                            (isReverse ? currentDuration - prevEntry[0] : prevEntry[0]);
                        var divideTime = utils.dot(prevEntry[1], time, lastTime - prevTime, currentTime - lastTime);
                        addEntry(nextEntries, (delay + currentDuration * iterationCount) / playSpeed, divideTime);
                    }
                    break;
                }
                else if (currentTime === lastTime
                    && nextEntries.length
                    && nextEntries[nextEntries.length - 1][0] === lastTime + delay) {
                    break;
                }
                addEntry(nextEntries, (delay + currentTime) / playSpeed, time);
            }
        }
        // delay time
        delay && nextEntries.unshift([0, nextEntries[0][1]]);
        entries = nextEntries;
        nextEntries = [];
    });
    return entries;
}
/**
* manage Frame Keyframes and play keyframes.
* @extends Animator
* @example
const item = new SceneItem({
    0: {
        display: "none",
    },
    1: {
        display: "block",
        opacity: 0,
    },
    2: {
        opacity: 1,
    }
});
*/
var SceneItem = /*#__PURE__*/ (function (_super) {
    __extends(SceneItem, _super);
    /**
      * @param - properties
      * @param - options
      * @example
      const item = new SceneItem({
          0: {
              display: "none",
          },
          1: {
              display: "block",
              opacity: 0,
          },
          2: {
              opacity: 1,
          }
      });
       */
    function SceneItem(properties, options) {
        var _this = _super.call(this) || this;
        _this.times = [];
        _this.items = {};
        _this.nameMap = new OrderMap(NAME_SEPARATOR);
        _this.elements = [];
        _this.needUpdate = true;
        _this.load(properties, options);
        return _this;
    }
    SceneItem.prototype.getDuration = function () {
        var times = this.times;
        var length = times.length;
        return (length === 0 ? 0 : times[length - 1]) || this.state[DURATION];
    };
    /**
      * get size of list
      * @return {Number} length of list
      */
    SceneItem.prototype.size = function () {
        return this.times.length;
    };
    SceneItem.prototype.setDuration = function (duration) {
        if (!duration) {
            return this;
        }
        var originalDuration = this.getDuration();
        if (originalDuration > 0) {
            var ratio_1 = duration / originalDuration;
            var _a = this, times = _a.times, items_1 = _a.items;
            var obj_1 = {};
            this.times = times.map(function (time) {
                var time2 = toFixed(time * ratio_1);
                obj_1[time2] = items_1[time];
                return time2;
            });
            this.items = obj_1;
        }
        else {
            this.newFrame(duration);
        }
        return this;
    };
    SceneItem.prototype.setId = function (id) {
        var state = this.state;
        var elements = this.elements;
        var length = elements.length;
        state.id = id || makeId(!!length);
        if (length && !state[SELECTOR]) {
            var sceneId_1 = toId(this.getId());
            state[SELECTOR] = "[".concat(DATA_SCENE_ID, "=\"").concat(sceneId_1, "\"]");
            elements.forEach(function (element) {
                element.setAttribute(DATA_SCENE_ID, sceneId_1);
            });
        }
        return this;
    };
    /**
      * Set properties to the sceneItem at that time
      * @param {Number} time - time
      * @param {...String|Object} [properties] - property names or values
      * @return {SceneItem} An instance itself
      * @example
  item.set(0, "a", "b") // item.getFrame(0).set("a", "b")
  console.log(item.get(0, "a")); // "b"
      */
    SceneItem.prototype.set = function (time) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (isSceneItem(time)) {
            return this.set(0, time);
        }
        else if (utils.isArray(time)) {
            var length_1 = time.length;
            for (var i = 0; i < length_1; ++i) {
                var t = length_1 === 1 ? 0 : this.getUnitTime("".concat(i / (length_1 - 1) * 100, "%"));
                this.set(t, time[i]);
            }
        }
        else if (utils.isObject(time)) {
            var _loop_1 = function (t) {
                var value = time[t];
                utils.splitComma(t).forEach(function (eachTime) {
                    var realTime = _this.getUnitTime(eachTime);
                    if (isNaN(realTime)) {
                        getNames(value, [eachTime]).forEach(function (names) {
                            var _a;
                            var innerValue = getValueByNames(names.slice(1), value);
                            var arr = utils.isArray(innerValue) ?
                                innerValue : [getValueByNames(names, _this.target), innerValue];
                            var length = arr.length;
                            for (var i = 0; i < length; ++i) {
                                (_a = _this.newFrame("".concat(i / (length - 1) * 100, "%"))).set.apply(_a, __spreadArray(__spreadArray([], names, false), [arr[i]], false));
                            }
                        });
                    }
                    else {
                        _this.set(realTime, value);
                    }
                });
            };
            for (var t in time) {
                _loop_1(t);
            }
        }
        else if (!utils.isUndefined(time)) {
            var value_1 = args[0];
            utils.splitComma(time + "").forEach(function (eachTime) {
                var realTime = _this.getUnitTime(eachTime);
                if (isSceneItem(value_1)) {
                    var delay = value_1.getDelay();
                    var frames_1 = value_1.toObject(!_this.hasFrame(realTime + delay));
                    var duration = value_1.getDuration();
                    var direction = value_1.getDirection();
                    var isReverse = direction.indexOf("reverse") > -1;
                    for (var frameTime in frames_1) {
                        var nextTime = isReverse ? duration - parseFloat(frameTime) : parseFloat(frameTime);
                        _this.set(realTime + nextTime, frames_1[frameTime]);
                    }
                }
                else if (args.length === 1 && utils.isArray(value_1)) {
                    value_1.forEach(function (item) {
                        _this.set(realTime, item);
                    });
                }
                else {
                    var frame = _this.newFrame(realTime);
                    frame.set.apply(frame, args);
                }
            });
        }
        this.needUpdate = true;
        return this;
    };
    /**
      * Get properties of the sceneItem at that time
      * @param {Number} time - time
      * @param {...String|Object} args property's name or properties
      * @return {Number|String|PropertyObejct} property value
      * @example
  item.get(0, "a"); // item.getFrame(0).get("a");
  item.get(0, "transform", "translate"); // item.getFrame(0).get("transform", "translate");
      */
    SceneItem.prototype.get = function (time) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var frame = this.getFrame(time);
        return frame && frame.get.apply(frame, args);
    };
    /**
      * get properties orders
      * @param - property names
      * @example
      item.getOrders(["display"]) // => []
      item.getOrders(["transform"]) // => ["translate", "scale"]
      */
    SceneItem.prototype.getOrders = function (names) {
        this.needUpdate && this.update();
        return this.nameMap.get(names);
    };
    /**
      * set properties orders
      * @param - property names
      * @param - orders
      * @example
      item.getOrders(["transform"]) // => ["translate", "scale"]
      item.setOrders(["transform"], ["scale", "tralsate"])
      */
    SceneItem.prototype.setOrders = function (names, orders) {
        this.needUpdate && this.update();
        var result = this.nameMap.set(names, orders);
        this.updateFrameOrders();
        return result;
    };
    /**
      * get properties order object
      * @example
      console.log(item.getOrderObject());
      */
    SceneItem.prototype.getOrderObject = function () {
        return this.nameMap.getObject();
    };
    /**
      * set properties orders object
      * @param - properties orders object
      * @example
      item.setOrderObject({
          "": ["transform"],
          "transform": ["scale", "tralsate"],
      });
      */
    SceneItem.prototype.setOrderObject = function (obj) {
        this.nameMap.setObject(obj);
        this.updateFrameOrders();
    };
    /**
      * remove properties to the sceneItem at that time
      * @param {Number} time - time
      * @param {...String|Object} [properties] - property names or values
      * @return {SceneItem} An instance itself
      * @example
  item.remove(0, "a");
      */
    SceneItem.prototype.remove = function (time) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length) {
            var frame = this.getFrame(time);
            frame && frame.remove.apply(frame, args);
        }
        else {
            this.removeFrame(time);
        }
        this.needUpdate = true;
        return this;
    };
    /**
      * Append the item or object at the last time.
      * @param - the scene item or item object
      * @return An instance itself
      * @example
  item.append(new SceneItem({
      0: {
          opacity: 0,
      },
      1: {
          opacity: 1,
      }
  }));
  item.append({
      0: {
          opacity: 0,
      },
      1: {
          opacity: 1,
      }
  });
  item.set(item.getDuration(), {
      0: {
          opacity: 0,
      },
      1: {
          opacity: 1,
      }
  });
      */
    SceneItem.prototype.append = function (item) {
        if (isSceneItem(item)) {
            this.set(this.getDuration(), item);
        }
        else {
            this.append(new SceneItem(item));
        }
        return this;
    };
    /**
      * Push the front frames for the time and prepend the scene item or item object.
      * @param - the scene item or item object
      * @return An instance itself
      */
    SceneItem.prototype.prepend = function (item) {
        if (isSceneItem(item)) {
            var unshiftTime = item.getDuration() + item.getDelay();
            var firstFrame = this.getFrame(0);
            // remove first frame
            this.removeFrame(0);
            this.unshift(unshiftTime);
            this.set(0, item);
            this.set(unshiftTime + THRESHOLD, firstFrame);
        }
        else {
            this.prepend(new SceneItem(item));
        }
        return this;
    };
    /**
     * Push out the amount of time.
     * @param - time to push
     * @example
   item.get(0); // frame 0
   item.unshift(3);
   item.get(3) // frame 0
     */
    SceneItem.prototype.unshift = function (time) {
        var _a = this, times = _a.times, items = _a.items;
        var obj = {};
        this.times = times.map(function (t) {
            var time2 = toFixed(time + t);
            obj[time2] = items[t];
            return time2;
        });
        this.items = obj;
        return this;
    };
    /**
     * Get the frames in the item in object form.
     * @return {}
     * @example
 item.toObject();
 // {0: {display: "none"}, 1: {display: "block"}}
     */
    SceneItem.prototype.toObject = function (isStartZero) {
        if (isStartZero === void 0) { isStartZero = true; }
        var obj = {};
        var delay = this.getDelay();
        this.forEach(function (frame, time) {
            obj[(!time && !isStartZero ? THRESHOLD : 0) + delay + time] = frame.clone();
        });
        return obj;
    };
    /**
     * Specifies an element to synchronize items' keyframes.
     * @param {string} selectors - Selectors to find elements in items.
     * @return {SceneItem} An instance itself
     * @example
item.setSelector("#id.class");
     */
    SceneItem.prototype.setSelector = function (target) {
        if (utils.isFunction(target)) {
            this.setElement(target(this.getId(), 0));
        }
        else {
            this.setElement(target);
        }
        return this;
    };
    /**
     * Get the elements connected to SceneItem.
     */
    SceneItem.prototype.getElements = function () {
        return this.elements;
    };
    /**
     * Specifies an element to synchronize item's keyframes.
     * @param - elements to synchronize item's keyframes.
     * @param - Make sure that you have peusdo.
     * @return {SceneItem} An instance itself
     * @example
item.setElement(document.querySelector("#id.class"));
item.setElement(document.querySelectorAll(".class"));
     */
    SceneItem.prototype.setElements = function (target) {
        return this.setElement(target);
    };
    /**
     * Specifies an element to synchronize item's keyframes.
     * @param - elements to synchronize item's keyframes.
     * @param - Make sure that you have peusdo.
     * @return {SceneItem} An instance itself
     * @example
item.setElement(document.querySelector("#id.class"));
item.setElement(document.querySelectorAll(".class"));
     */
    SceneItem.prototype.setElement = function (target) {
        var state = this.state;
        var elements = [];
        if (!target) {
            return this;
        }
        else if (target === true || utils.isString(target)) {
            var selector = target === true ? "".concat(state.id) : target;
            var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(selector);
            elements = utils.toArray(utils.$(matches ? matches[1] : selector, true));
            state[SELECTOR] = selector;
        }
        else {
            elements = (target instanceof Element) ? [target] : utils.toArray(target);
        }
        if (!elements.length) {
            return this;
        }
        this.elements = elements;
        this.setId(this.getId());
        this.target = elements[0].style;
        this.targetFunc = function (frame) {
            var attributes = frame.get("attribute");
            if (attributes) {
                var _loop_2 = function (name_2) {
                    elements.forEach(function (el) {
                        el.setAttribute(name_2, attributes[name_2]);
                    });
                };
                for (var name_2 in attributes) {
                    _loop_2(name_2);
                }
            }
            if (frame.has("html")) {
                var html_1 = frame.get("html");
                elements.forEach(function (el) {
                    el.innerHTML = html_1;
                });
            }
            var cssText = frame.toCSSText();
            if (state.cssText !== cssText) {
                state.cssText = cssText;
                elements.forEach(function (el) {
                    el.style.cssText += cssText;
                });
                return frame;
            }
        };
        return this;
    };
    SceneItem.prototype.setTarget = function (target) {
        this.target = target;
        this.targetFunc = function (frame) {
            var obj = frame.get();
            for (var name_3 in obj) {
                target[name_3] = obj[name_3];
            }
        };
        return this;
    };
    /**
      * add css styles of items's element to the frame at that time.
      * @param - Time to synchronize and set css
      * @param - elements to synchronize item's keyframes.
      * @return {SceneItem} An instance itself
      * @example
  item.setElement(document.querySelector("#id.class"));
  item.setCSS(0, ["opacity"]);
  item.setCSS(0, ["opacity", "width", "height"]);
      */
    SceneItem.prototype.setCSS = function (time, properties) {
        if (properties === void 0) { properties = []; }
        this.set(time, utils.fromCSS(this.elements, properties));
        return this;
    };
    SceneItem.prototype.setTime = function (time, isTick, isParent, parentEasing) {
        _super.prototype.setTime.call(this, time, isTick, isParent);
        var iterationTime = this.getIterationTime();
        var easing = this.getEasing() || parentEasing;
        var frame = this.getNowFrame(iterationTime, easing);
        var currentTime = this.getTime();
        this.temp = frame;
        /**
         * This event is fired when timeupdate and animate.
         * @event SceneItem#animate
         * @param {Number} param.currentTime The total time that the animator is running.
         * @param {Number} param.time The iteration time during duration that the animator is running.
         * @param {Frame} param.frame frame of that time.
         */
        this.trigger("animate", {
            frame: frame,
            currentTime: currentTime,
            time: iterationTime,
        });
        this.targetFunc && this.targetFunc(frame);
        return this;
    };
    /**
      * update property names used in frames.
      * @return {SceneItem} An instance itself
      * @example
  item.update();
      */
    SceneItem.prototype.update = function () {
        var prevNameMap = this.nameMap;
        var names = {};
        this.forEach(function (frame) {
            updateFrame(names, frame.properties);
        });
        var nameMap = new OrderMap(NAME_SEPARATOR);
        function pushKeys(map, stack) {
            var keys = utils.getKeys(map);
            utils.sortOrders(keys, prevNameMap.get(stack));
            nameMap.set(stack, keys);
            keys.forEach(function (key) {
                var nextMap = map[key];
                if (utils.isObject(nextMap)) {
                    pushKeys(nextMap, __spreadArray(__spreadArray([], stack, true), [key], false));
                }
            });
        }
        pushKeys(names, []);
        this.nameMap = nameMap;
        this.forEach(function (frame) {
            frame.setOrderObject(nameMap.orderMap);
        });
        this.needUpdate = false;
        return this;
    };
    /**
      * Create and add a frame to the sceneItem at that time
      * @param {Number} time - frame's time
      * @return {Frame} Created frame.
      * @example
  item.newFrame(time);
      */
    SceneItem.prototype.newFrame = function (time) {
        var frame = this.getFrame(time);
        if (frame) {
            return frame;
        }
        frame = new Frame();
        this.setFrame(time, frame);
        return frame;
    };
    /**
      * Add a frame to the sceneItem at that time
      * @param {Number} time - frame's time
      * @return {SceneItem} An instance itself
      * @example
  item.setFrame(time, frame);
      */
    SceneItem.prototype.setFrame = function (time, frame) {
        var realTime = this.getUnitTime(time);
        this.items[realTime] = frame;
        addTime(this.times, realTime);
        this.needUpdate = true;
        return this;
    };
    /**
      * get sceneItem's frame at that time
      * @param {Number} time - frame's time
      * @return {Frame} sceneItem's frame at that time
      * @example
  const frame = item.getFrame(time);
      */
    SceneItem.prototype.getFrame = function (time) {
        return this.items[this.getUnitTime(time)];
    };
    /**
      * remove sceneItem's frame at that time
      * @param - frame's time
      * @return {SceneItem} An instance itself
      * @example
  item.removeFrame(time);
      */
    SceneItem.prototype.removeFrame = function (time) {
        var realTime = this.getUnitTime(time);
        var items = this.items;
        var index = this.times.indexOf(realTime);
        delete items[realTime];
        // remove time
        if (index > -1) {
            this.times.splice(index, 1);
        }
        this.needUpdate = true;
        return this;
    };
    /**
      * check if the item has a frame at that time
      * @param {Number} time - frame's time
      * @return {Boolean} true: the item has a frame // false: not
      * @example
  if (item.hasFrame(10)) {
      // has
  } else {
      // not
  }
      */
    SceneItem.prototype.hasFrame = function (time) {
        return this.getUnitTime(time) in this.items;
    };
    /**
      * Check if keyframes has propery's name
      * @param - property's time
      * @return {boolean} true: if has property, false: not
      * @example
    item.hasName(["transform", "translate"]); // true or not
      */
    SceneItem.prototype.hasName = function (args) {
        this.needUpdate && this.update();
        return !!this.nameMap.get(args);
    };
    /**
      * merge frame of the previous time at the next time.
    * @param - The time of the frame to merge
    * @param - The target frame
      * @return {SceneItem} An instance itself
      * @example
  // getFrame(1) contains getFrame(0)
  item.merge(0, 1);
      */
    SceneItem.prototype.mergeFrame = function (time, frame) {
        if (frame) {
            var toFrame = this.newFrame(time);
            toFrame.merge(frame);
        }
        return this;
    };
    /**
      * Get frame of the current time
      * @param {Number} time - the current time
      * @param {function} easing - the speed curve of an animation
      * @return {Frame} frame of the current time
      * @example
  let item = new SceneItem({
      0: {
          display: "none",
      },
      1: {
          display: "block",
          opacity: 0,
      },
      2: {
          opacity: 1,
      }
  });
  // opacity: 0.7; display:"block";
  const frame = item.getNowFrame(1.7);
      */
    SceneItem.prototype.getNowFrame = function (time, parentEasing, isAccurate) {
        var _this = this;
        this.needUpdate && this.update();
        var frame = new Frame();
        var _a = getNearTimeIndex(this.times, time), left = _a[0], right = _a[1];
        var realEasing = this.getEasing() || parentEasing;
        var nameMap = this.nameMap;
        if (this.hasName([TIMING_FUNCTION])) {
            var nowEasing = this.getNowValue(time, [TIMING_FUNCTION], left, right, false, 0, true);
            utils.isFunction(nowEasing) && (realEasing = nowEasing);
        }
        if (isAccurate) {
            var prevFrame_1 = this.getFrame(time);
            var prevOrderMap = prevFrame_1.orderMap.filter([], function (orders) {
                return prevFrame_1.has.apply(prevFrame_1, orders);
            });
            for (var name_4 in ROLES) {
                var orders = nameMap.get([name_4]);
                if (prevOrderMap.get([name_4]) && orders) {
                    prevOrderMap.set([name_4], orders);
                }
            }
            nameMap = prevOrderMap;
        }
        var names = nameMap.gets([]);
        frame.setOrderObject(nameMap.orderMap);
        names.forEach(function (properties) {
            var value = _this.getNowValue(time, properties, left, right, isAccurate, realEasing, isFixed(properties));
            if (utils.isUndefined(value)) {
                return;
            }
            frame.set(properties, value);
        });
        return frame;
    };
    /**
     * Get the current computed frame.
     * (If needUpdate is true, get a new computed frame, not the temp that has already been saved.)
     */
    SceneItem.prototype.getCurrentFrame = function (needUpdate, parentEasing) {
        var iterationTime = this.getIterationTime();
        var frame = needUpdate || this.needUpdate || !this.temp
            ? this.getComputedFrame(iterationTime, parentEasing)
            : this.temp;
        this.temp = frame;
        return frame;
    };
    /**
     * Get the computed frame corresponding to the time.
     */
    SceneItem.prototype.getComputedFrame = function (time, parentEasing, isAccurate) {
        return this.getNowFrame(time, parentEasing, isAccurate);
    };
    SceneItem.prototype.load = function (properties, options) {
        var _a;
        if (properties === void 0) { properties = {}; }
        if (options === void 0) { options = properties.options; }
        options && this.setOptions(options);
        if (utils.isArray(properties)) {
            this.set(properties);
        }
        else if (properties.keyframes) {
            this.set(properties.keyframes);
        }
        else {
            for (var time in properties) {
                if (time !== "options") {
                    this.set((_a = {},
                        _a[time] = properties[time],
                        _a));
                }
            }
        }
        if (options && options[DURATION]) {
            this.setDuration(options[DURATION]);
        }
        return this;
    };
    /**
       * clone SceneItem.
       * @return {SceneItem} An instance of clone
       * @example
       * item.clone();
       */
    SceneItem.prototype.clone = function () {
        var item = new SceneItem();
        item.setOptions(this.state);
        item.setOrderObject(this.nameMap.orderMap);
        this.forEach(function (frame, time) {
            item.setFrame(time, frame.clone());
        });
        return item;
    };
    /**
       * executes a provided function once for each scene item.
       * @param - Function to execute for each element, taking three arguments
       * @return {Keyframes} An instance itself
       */
    SceneItem.prototype.forEach = function (callback) {
        var times = this.times;
        var items = this.items;
        times.forEach(function (time) {
            callback(items[time], time, items);
        });
        return this;
    };
    SceneItem.prototype.setOptions = function (options) {
        if (options === void 0) { options = {}; }
        _super.prototype.setOptions.call(this, options);
        var id = options.id, selector = options.selector, elements = options.elements, element = options.element, target = options.target;
        id && this.setId(id);
        if (target) {
            this.setTarget(target);
        }
        else if (selector) {
            this.setSelector(selector);
        }
        else if (elements || element) {
            this.setElement(elements || element);
        }
        return this;
    };
    SceneItem.prototype.toCSS = function (playCondition, parentDuration, states) {
        if (playCondition === void 0) { playCondition = { className: START_ANIMATION }; }
        if (parentDuration === void 0) { parentDuration = this.getDuration(); }
        if (states === void 0) { states = []; }
        var itemState = this.state;
        var selector = itemState[SELECTOR];
        if (!selector) {
            return "";
        }
        var originalDuration = this.getDuration();
        itemState[DURATION] = originalDuration;
        states.push(itemState);
        var reversedStates = utils.toArray(states).reverse();
        var id = toId(getRealId(this));
        var superParent = states[0];
        var infiniteIndex = utils.findIndex(reversedStates, function (state) {
            return state[ITERATION_COUNT] === INFINITE || !isFinite(state[DURATION]);
        }, states.length - 1);
        var finiteStates = reversedStates.slice(0, infiniteIndex);
        var duration = parentDuration || finiteStates.reduce(function (prev, cur) {
            return (cur[DELAY] + prev * cur[ITERATION_COUNT]) / cur[PLAY_SPEED];
        }, originalDuration);
        var delay = reversedStates.slice(infiniteIndex).reduce(function (prev, cur) {
            return (prev + cur[DELAY]) / cur[PLAY_SPEED];
        }, 0);
        var easingName = utils.find(reversedStates, function (state) { return (state[EASING] && state[EASING_NAME]); }, itemState)[EASING_NAME];
        var iterationCount = reversedStates[infiniteIndex][ITERATION_COUNT];
        var fillMode = superParent[FILL_MODE];
        var direction = reversedStates[infiniteIndex][DIRECTION];
        var cssText = makeAnimationProperties({
            fillMode: fillMode,
            direction: direction,
            iterationCount: iterationCount,
            delay: "".concat(delay, "s"),
            name: "".concat(PREFIX, "KEYFRAMES_").concat(id),
            duration: "".concat(duration / superParent[PLAY_SPEED], "s"),
            timingFunction: easingName,
        });
        var selectors = utils.splitComma(selector).map(function (sel) {
            var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(sel);
            if (matches) {
                return [matches[1], matches[2]];
            }
            else {
                return [sel, ""];
            }
        });
        var className = playCondition.className;
        var selectorCallback = playCondition.selector;
        var preselector = utils.isFunction(selectorCallback) ? selectorCallback(this, selector) : selectorCallback;
        return "\n    ".concat(preselector || selectors.map(function (_a) {
            var sel = _a[0], peusdo = _a[1];
            return "".concat(sel, ".").concat(className).concat(peusdo);
        }), " {").concat(cssText, "}\n    ").concat(selectors.map(function (_a) {
            var sel = _a[0], peusdo = _a[1];
            return "".concat(sel, ".").concat(PAUSE_ANIMATION).concat(peusdo);
        }), " {").concat(utils.ANIMATION, "-play-state: paused;}\n    @").concat(utils.KEYFRAMES, " ").concat(PREFIX, "KEYFRAMES_").concat(id, "{").concat(this._toKeyframes(duration, finiteStates, direction), "}");
    };
    /**
     * Export the CSS of the items to the style.
     * @param - Add a selector or className to play.
     * @return {SceneItem} An instance itself
     */
    SceneItem.prototype.exportCSS = function (playCondition, duration, options) {
        if (!this.elements.length) {
            return "";
        }
        var css = this.toCSS(playCondition, duration, options);
        var isParent = options && !utils.isUndefined(options[ITERATION_COUNT]);
        if (!isParent) {
            if (this.styledInjector) {
                this.styledInjector.destroy();
                this.styledInjector = null;
            }
            this.styled = styled(css);
            this.styledInjector = this.styled.inject(this.getAnimationElement(), { original: true });
        }
        return this;
    };
    SceneItem.prototype.pause = function () {
        _super.prototype.pause.call(this);
        isPausedCSS(this) && this.pauseCSS();
        return this;
    };
    SceneItem.prototype.pauseCSS = function () {
        this.elements.forEach(function (element) {
            utils.addClass(element, PAUSE_ANIMATION);
        });
        return this;
    };
    SceneItem.prototype.endCSS = function () {
        this.elements.forEach(function (element) {
            utils.removeClass(element, PAUSE_ANIMATION);
            utils.removeClass(element, START_ANIMATION);
        });
        setPlayCSS(this, false);
        return this;
    };
    SceneItem.prototype.end = function () {
        isEndedCSS(this) && this.endCSS();
        _super.prototype.end.call(this);
        return this;
    };
    /**
      * Play using the css animation and keyframes.
      * @param - Check if you want to export css.
      * @param [playClassName="startAnimation"] - Add a class name to play.
      * @param - The shorthand properties for six of the animation properties.
      * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
      * @example
  item.playCSS();
  item.playCSS(false, "startAnimation", {
      direction: "reverse",
      fillMode: "forwards",
  });
      */
    SceneItem.prototype.playCSS = function (isExportCSS, playClassName, properties) {
        if (isExportCSS === void 0) { isExportCSS = true; }
        if (properties === void 0) { properties = {}; }
        playCSS(this, isExportCSS, playClassName, properties);
        return this;
    };
    SceneItem.prototype.getAnimationElement = function () {
        return this.elements[0];
    };
    SceneItem.prototype.addPlayClass = function (isPaused, playClassName, properties) {
        if (properties === void 0) { properties = {}; }
        var elements = this.elements;
        var length = elements.length;
        var cssText = makeAnimationProperties(properties);
        if (!length) {
            return;
        }
        if (isPaused) {
            elements.forEach(function (element) {
                utils.removeClass(element, PAUSE_ANIMATION);
            });
        }
        else {
            elements.forEach(function (element) {
                element.style.cssText += cssText;
                if (utils.hasClass(element, START_ANIMATION)) {
                    utils.removeClass(element, START_ANIMATION);
                }
            });
            elements.forEach(function (element) {
                element.clientWidth;
            });
            elements.forEach(function (element) {
                utils.addClass(element, START_ANIMATION);
            });
        }
        return elements[0];
    };
    /**
      * Clear All Frames
      * @return {SceneItem} An instance itself
      */
    SceneItem.prototype.clear = function () {
        this.times = [];
        this.items = {};
        this.nameMap = new OrderMap(NAME_SEPARATOR);
        if (this.styledInjector) {
            this.styledInjector.destroy();
        }
        this.styled = null;
        this.styledInjector = null;
        this.temp = null;
        this.needUpdate = true;
        return this;
    };
    SceneItem.prototype.getNowValue = function (time, properties, left, right, isAccurate, easing, usePrevValue) {
        var times = this.times;
        var length = times.length;
        var prevTime;
        var nextTime;
        var prevFrame;
        var nextFrame;
        var isUndefinedLeft = utils.isUndefined(left);
        var isUndefinedRight = utils.isUndefined(right);
        if (isUndefinedLeft || isUndefinedRight) {
            var indicies = getNearTimeIndex(times, time);
            isUndefinedLeft && (left = indicies[0]);
            isUndefinedRight && (right = indicies[1]);
        }
        for (var i = left; i >= 0; --i) {
            var frame = this.getFrame(times[i]);
            if (frame.has.apply(frame, properties)) {
                prevTime = times[i];
                prevFrame = frame;
                break;
            }
        }
        var prevValue = prevFrame && prevFrame.raw.apply(prevFrame, properties);
        if (isAccurate && !isRole([properties[0]])) {
            return prevTime === time ? prevValue : undefined;
        }
        if (usePrevValue) {
            return prevValue;
        }
        for (var i = right; i < length; ++i) {
            var frame = this.getFrame(times[i]);
            if (frame.has.apply(frame, properties)) {
                nextTime = times[i];
                nextFrame = frame;
                break;
            }
        }
        var nextValue = nextFrame && nextFrame.raw.apply(nextFrame, properties);
        if (!prevFrame || utils.isUndefined(prevValue)) {
            return nextValue;
        }
        if (!nextFrame || utils.isUndefined(nextValue) || prevValue === nextValue) {
            return prevValue;
        }
        return dotValue(time, Math.max(prevTime, 0), nextTime, prevValue, nextValue, easing);
    };
    SceneItem.prototype._toKeyframes = function (duration, states, direction) {
        var _this = this;
        var frames = {};
        var times = this.times.slice();
        if (!times.length) {
            return "";
        }
        var originalDuration = this.getDuration();
        (!this.getFrame(0)) && times.unshift(0);
        (!this.getFrame(originalDuration)) && times.push(originalDuration);
        var entries = getEntries(times, states);
        var lastEntry = entries[entries.length - 1];
        // end delay time
        lastEntry[0] < duration && addEntry(entries, duration, lastEntry[1]);
        var prevTime = -1;
        return entries.map(function (_a) {
            var time = _a[0], keytime = _a[1];
            if (!frames[keytime]) {
                frames[keytime] =
                    (!_this.hasFrame(keytime) || keytime === 0 || keytime === originalDuration ?
                        _this.getNowFrame(keytime) : _this.getNowFrame(keytime, 0, true)).toCSSText();
            }
            var frameTime = time / duration * 100;
            if (frameTime - prevTime < THRESHOLD) {
                frameTime += THRESHOLD;
            }
            prevTime = frameTime;
            return "".concat(Math.min(frameTime, 100), "%{\n                ").concat(time === 0 && !isDirectionReverse(0, 1, direction) ? "" : frames[keytime], "\n            }");
        }).join("");
    };
    SceneItem.prototype.updateFrameOrders = function () {
        var nameMap = this.nameMap.orderMap;
        this.forEach(function (frame) {
            frame.setOrderObject(nameMap);
        });
    };
    return SceneItem;
}(Animator));

/**
 * manage sceneItems and play Scene.
 * @extends Animator
 * @sort 1
 */
var Scene = /*#__PURE__*/ (function (_super) {
    __extends(Scene, _super);
    /**
    * @param - properties
    * @param - options
    * @example
    const scene = new Scene({
      item1: {
        0: {
          display: "none",
        },
        1: {
          display: "block",
          opacity: 0,
        },
        2: {
          opacity: 1,
        },
      },
      item2: {
        2: {
          opacity: 1,
        },
      }
    });
      */
    function Scene(properties, options) {
        var _this = _super.call(this) || this;
        _this.items = {};
        _this.orderMap = new OrderMap(NAME_SEPARATOR);
        _this.load(properties, options);
        return _this;
    }
    Scene.prototype.getDuration = function () {
        var time = 0;
        this.forEach(function (item) {
            time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
        });
        return time || this.state[DURATION];
    };
    Scene.prototype.setDuration = function (duration) {
        this.items;
        var sceneDuration = this.getDuration();
        if (duration === 0 || !isFinite(sceneDuration)) {
            return this;
        }
        if (sceneDuration === 0) {
            this.forEach(function (item) {
                item.setDuration(duration);
            });
        }
        else {
            var ratio_1 = duration / sceneDuration;
            this.forEach(function (item) {
                item.setDelay(item.getDelay() * ratio_1);
                item.setDuration(item.getDuration() * ratio_1);
            });
        }
        _super.prototype.setDuration.call(this, duration);
        return this;
    };
    /**
    * get item in scene by name
    * @param - The item's name
    * @return {Scene | SceneItem} item
    * @example
    const item = scene.getItem("item1")
    */
    Scene.prototype.getItem = function (name) {
        return this.items[name];
    };
    /**
    * create item in scene
    * @param {} name - name of item to create
    * @param {} options - The option object of SceneItem
    * @return {} Newly created item
    * @example
    const item = scene.newItem("item1")
    */
    Scene.prototype.newItem = function (name, options) {
        if (options === void 0) { options = {}; }
        if (this.items[name]) {
            return this.items[name];
        }
        var item = new SceneItem();
        this.setItem(name, item);
        item.setOptions(options);
        return item;
    };
    /**
    * remove item in scene
    * @param - name of item to remove
    * @return  An instance itself
    * @example
    const item = scene.newItem("item1")

    scene.removeItem("item1");
    */
    Scene.prototype.removeItem = function (name) {
        delete this.items[name];
        this.orderMap.remove([name]);
        return this;
    };
    /**
    * add a sceneItem to the scene
    * @param - name of item to create
    * @param - sceneItem
    * @example
    const item = scene.newItem("item1")
    */
    Scene.prototype.setItem = function (name, item) {
        item.setId(name);
        this.items[name] = item;
        this.orderMap.add([name]);
        return this;
    };
    /**
    * Get the current computed frames.
    * (If needUpdate is true, get a new computed frames, not the temp that has already been saved.)
    */
    Scene.prototype.getCurrentFrames = function (needUpdate, parentEasing) {
        var easing = this.getEasing() || parentEasing;
        var frames = {};
        this.forEach(function (item) {
            var id = item.getId();
            if (isScene(item)) {
                frames[id] = item.getCurrentFrames(needUpdate, easing);
            }
            else {
                frames[id] = item.getCurrentFrame(needUpdate, easing);
            }
        });
        this.temp = frames;
        return frames;
    };
    /**
   * Get the current flatted computed frames.
   * (If needUpdate is true, get a new computed frames, not the temp that has already been saved.)
   * If there is a scene in the scene, you can get a flatted frame map.
   * @example
   * import Scene, { NAME_SEPARATOR } from "scenejs";
   *
   * {
   *   "a": Frame,
   *   "b": {
   *     "b1": Frame,
   *     "b2": Frame,
   *   },
   * }
   * const frames = scene.getCurrentFrames();
   * {
   *   "a": Frame,
   *   "b_///_b1": Frame,
   *   "b_///_b2": Frame,
   * }
   * const frames = scene.getCurrentFlattedFrames();
   *
   */
    Scene.prototype.getCurrentFlattedFrames = function (needUpdate, parentEasing) {
        var frames = this.getCurrentFrames(needUpdate, parentEasing);
        return flatSceneObject(frames, NAME_SEPARATOR);
    };
    Scene.prototype.setTime = function (time, isTick, isParent, parentEasing) {
        _super.prototype.setTime.call(this, time, isTick, isParent);
        var iterationTime = this.getIterationTime();
        var easing = this.getEasing() || parentEasing;
        this.forEach(function (item) {
            item.setTime(iterationTime * item.getPlaySpeed() - item.getDelay(), isTick, true, easing);
        });
        var frames = this.getCurrentFrames(false, parentEasing);
        /**
         * This event is fired when timeupdate and animate.
         * @event Scene#animate
         * @param {object} param The object of data to be sent to an event.
         * @param {number} param.currentTime The total time that the animator is running.
         * @param {number} param.time The iteration time during duration that the animator is running.
         * @param {object} param.frames frames of that time.
         * @example
const scene = new Scene({
    a: {
        0: {
            opacity: 0,
        },
        1: {
            opacity: 1,
        }
    },
    b: {
        0: {
            opacity: 0,
        },
        1: {
            opacity: 1,
        }
    }
}).on("animate", e => {
    console.log(e.frames);
    // {a: Frame, b: Frame}
    console.log(e.frames.a.get("opacity"));
});
             */
        this.trigger("animate", {
            frames: frames,
            currentTime: this.getTime(),
            time: iterationTime,
        });
        return this;
    };
    /**
     * executes a provided function once for each scene item.
     * @param - Function to execute for each element, taking three arguments
     * @return {Scene} An instance itself
     */
    Scene.prototype.forEach = function (func) {
        var items = this.items;
        this.getOrders().forEach(function (id, index) {
            func(items[id], id, index, items);
        });
        return this;
    };
    Scene.prototype.toCSS = function (playCondition, duration, parentStates) {
        if (duration === void 0) { duration = this.getDuration(); }
        if (parentStates === void 0) { parentStates = []; }
        var totalDuration = !duration || !isFinite(duration) ? 0 : duration;
        var styles = [];
        var state = this.state;
        state[DURATION] = this.getDuration();
        this.forEach(function (item) {
            styles.push(item.toCSS(playCondition, totalDuration, parentStates.concat(state)));
        });
        return styles.join("");
    };
    /**
     * Export the CSS of the items to the style.
     * @param - Add a selector or className to play.
     * @return {Scene} An instance itself
     */
    Scene.prototype.exportCSS = function (playCondition, duration, parentStates) {
        var css = this.toCSS(playCondition, duration, parentStates);
        if (!parentStates || !parentStates.length) {
            if (this.styledInjector) {
                this.styledInjector.destroy();
                this.styledInjector = null;
            }
            this.styled = styled(css);
            this.styledInjector = this.styled.inject(this.getAnimationElement(), { original: true });
            // && exportCSS(getRealId(this), css);
        }
        return this;
    };
    Scene.prototype.append = function (item) {
        item.setDelay(item.getDelay() + this.getDuration());
        this.setItem(getRealId(item), item);
    };
    Scene.prototype.pauseCSS = function () {
        return this.forEach(function (item) {
            item.pauseCSS();
        });
    };
    Scene.prototype.pause = function () {
        _super.prototype.pause.call(this);
        isPausedCSS(this) && this.pauseCSS();
        this.forEach(function (item) {
            item.pause();
        });
        return this;
    };
    Scene.prototype.endCSS = function () {
        this.forEach(function (item) {
            item.endCSS();
        });
        setPlayCSS(this, false);
    };
    Scene.prototype.end = function () {
        isEndedCSS(this) && this.endCSS();
        _super.prototype.end.call(this);
        return this;
    };
    /**
  * get item orders
  * @example
  scene.getOrders() // => ["item1", "item2"]
  */
    Scene.prototype.getOrders = function () {
        return this.orderMap.get([]) || [];
    };
    /**
      * set item orders
      * @param - orders
      * @example
      frame.setOrders(["item2", "item1"]) // => ["item2", "item1"]
      */
    Scene.prototype.setOrders = function (orders) {
        return this.orderMap.set([], orders);
    };
    Scene.prototype.getAnimationElement = function () {
        var animtionElement;
        this.forEach(function (item) {
            var el = item.getAnimationElement();
            !animtionElement && (animtionElement = el);
        });
        return animtionElement;
    };
    Scene.prototype.addPlayClass = function (isPaused, playClassName, properties) {
        if (properties === void 0) { properties = {}; }
        var animtionElement;
        this.forEach(function (item) {
            var el = item.addPlayClass(isPaused, playClassName, properties);
            !animtionElement && (animtionElement = el);
        });
        return animtionElement;
    };
    /**
    * Play using the css animation and keyframes.
    * @param - Check if you want to export css.
    * @param [playClassName="startAnimation"] - Add a class name to play.
    * @param - The shorthand properties for six of the animation properties.
    * @return {Scene} An instance itself
    * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
    * @example
    scene.playCSS();
    scene.playCSS(false, {
    direction: "reverse",
    fillMode: "forwards",
    });
    */
    Scene.prototype.playCSS = function (isExportCSS, playClassName, properties) {
        if (isExportCSS === void 0) { isExportCSS = true; }
        if (properties === void 0) { properties = {}; }
        playCSS(this, isExportCSS, playClassName, properties);
        return this;
    };
    /**
      * Set properties to the Scene.
      * @param - properties
      * @return An instance itself
      * @example
scene.set({
    ".a": {
        0: {
            opacity: 0,
        },
        1: {
            opacity: 1,
        },
    },
});
// 0
console.log(scene.getItem(".a").get(0, "opacity"));
// 1
console.log(scene.getItem(".a").get(1, "opacity"));
      */
    Scene.prototype.set = function (properties) {
        this.load(properties);
        return this;
    };
    /**
      * Clear All Items
      * @return {Scene} An instance itself
      */
    Scene.prototype.clear = function () {
        this.finish();
        this.items = {};
        this.orderMap = new OrderMap(NAME_SEPARATOR);
        if (this.styledInjector) {
            this.styledInjector.destroy();
        }
        this.styled = null;
        this.styledInjector = null;
    };
    Scene.prototype.load = function (properties, options) {
        if (properties === void 0) { properties = {}; }
        if (options === void 0) { options = properties.options; }
        if (!properties) {
            return this;
        }
        var selector = options && options[SELECTOR] || this.state[SELECTOR];
        var _loop_1 = function (name_1) {
            if (name_1 === "options") {
                return "continue";
            }
            var object = properties[name_1];
            var item = void 0;
            if (isScene(object) || isSceneItem(object)) {
                this_1.setItem(name_1, object);
                item = object;
            }
            else if (utils.isFunction(object)) {
                var elements = [];
                if (selector && utils.IS_WINDOW) {
                    elements = utils.$("".concat(utils.isFunction(selector) ? selector(name_1) : name_1), true);
                }
                var elementsLength = elements.length;
                var length_1 = elementsLength || object.defaultCount || 0;
                var scene = new Scene();
                var ids_1 = [];
                for (var i = 0; i < length_1; ++i) {
                    var element = elements[i];
                    var subItem = scene.newItem(i);
                    subItem.setId().load(object(i, elements[i]));
                    ids_1.push(subItem.getId());
                    if (element) {
                        subItem.setElement(element);
                    }
                }
                if (!elementsLength) {
                    var subElements_1 = [];
                    scene.state[SELECTOR] = function (id) {
                        if (!subElements_1.length) {
                            subElements_1 = utils.$("".concat(utils.isFunction(selector) ? selector(name_1) : name_1), true);
                        }
                        return subElements_1[ids_1.indexOf(id)];
                    };
                }
                this_1.setItem(name_1, scene);
                return "continue";
            }
            else {
                item = this_1.newItem(name_1);
                item.load(object);
            }
            selector && item.setSelector(selector);
        };
        var this_1 = this;
        for (var name_1 in properties) {
            _loop_1(name_1);
        }
        this.setOptions(options);
    };
    Scene.prototype.setOptions = function (options) {
        if (options === void 0) { options = {}; }
        _super.prototype.setOptions.call(this, options);
        var selector = options.selector;
        if (selector) {
            this.state[SELECTOR] = selector;
        }
        return this;
    };
    Scene.prototype.setSelector = function (target) {
        var state = this.state;
        var selector = target === true ? state[SELECTOR] || true : target;
        state[SELECTOR] = selector;
        var isItFunction = utils.isFunction(target);
        if (selector) {
            this.forEach(function (item, name) {
                item.setSelector(isItFunction ? target(name) : selector);
            });
        }
        return this;
    };
    Scene.prototype.start = function (delay) {
        if (delay === void 0) { delay = this.state[DELAY]; }
        var result = _super.prototype.start.call(this, delay);
        if (result) {
            this.forEach(function (item) {
                item.start(0);
            });
        }
        else {
            this.forEach(function (item) {
                item.setPlayState(RUNNING);
            });
        }
        return result;
    };
    /**
    * version info
    * @type {string}
    * @example
    * Scene.VERSION // 1.8.3
    */
    Scene.VERSION = "1.8.3";
    return Scene;
}(Animator));

function animate(properties, options) {
    return new Scene(properties, options).play();
}
function animateItem(properties, options) {
    return new SceneItem(properties, options).play();
}

function getMethodNames(classConstructor) {
    var prototype = classConstructor.prototype;
    return utils.getKeys(prototype).filter(function (name) {
        var descriptor = Object.getOwnPropertyDescriptor(prototype, name);
        return !descriptor.get && !descriptor.set && utils.isFunction(descriptor.value || prototype[name]);
    });
}
var EMITTER_METHODS = getMethodNames(EventEmitter);
var ANIMATOR_METHODS = __spreadArray(__spreadArray([], EMITTER_METHODS, true), getMethodNames(Animator), true);

var SCENE_METHODS = __spreadArray(__spreadArray([], ANIMATOR_METHODS, true), getMethodNames(Scene), true);
var SCENE_REACTIVE = {
    methods: SCENE_METHODS,
    created: function (data) {
        var scene = isScene(data) ? data : new Scene(data === null || data === void 0 ? void 0 : data.props, data === null || data === void 0 ? void 0 : data.options);
        var obj = scene.state;
        var observers = core.getObservers(obj);
        var totalDuration = core.computed(function () {
            return scene.getTotalDuration();
        });
        var nextObj = __assign(__assign({ totalDuration: totalDuration }, observers), SCENE_METHODS.reduce(function (methodObject, cur) {
            methodObject[cur] = function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = scene[cur]).call.apply(_a, __spreadArray([scene], args, false));
            };
            return methodObject;
        }, {}));
        var nextReactiveObject = core.reactive(nextObj);
        return nextReactiveObject;
    },
    on: function (inst, eventName, callback) {
        inst.on(eventName, callback);
    },
    off: function (inst, eventName, callback) {
        inst.off(eventName, callback);
    },
};

var SCENE_ITEM_METHODS = __spreadArray(__spreadArray([], ANIMATOR_METHODS, true), getMethodNames(Scene), true);
var SCENE_ITEM_REACTIVE = {
    methods: SCENE_ITEM_METHODS,
    created: function (data) {
        var sceneItem = isSceneItem(data) ? data : new SceneItem(data === null || data === void 0 ? void 0 : data.props, data === null || data === void 0 ? void 0 : data.options);
        var obj = sceneItem.state;
        var observers = core.getObservers(obj);
        var totalDuration = core.computed(function () {
            return sceneItem.getTotalDuration();
        });
        var nextObj = __assign(__assign({ totalDuration: totalDuration }, observers), SCENE_ITEM_METHODS.reduce(function (methodObject, cur) {
            methodObject[cur] = function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = sceneItem[cur]).call.apply(_a, __spreadArray([sceneItem], args, false));
            };
            return methodObject;
        }, {}));
        var nextReactiveObject = core.reactive(nextObj);
        return nextReactiveObject;
    },
    on: function (inst, eventName, callback) {
        inst.on(eventName, callback);
    },
    off: function (inst, eventName, callback) {
        inst.off(eventName, callback);
    },
};

var FRAME_METHODS = __spreadArray(__spreadArray([], ANIMATOR_METHODS, true), getMethodNames(Frame), true);
var FRAME_REACTIVE = {
    methods: FRAME_METHODS,
    created: function (data) {
        var updateCount = core.observe(0);
        var frame;
        if (core.isObserver(data)) {
            frame = data;
        }
        else {
            frame = core.observe(isFrame(data) ? data : new Frame(data));
        }
        var cssText = core.computed(function () {
            frame.current;
            updateCount.current;
            return frame.current.toCSSText();
        });
        var cssObject = core.computed(function () {
            frame.current;
            cssText.current;
            return frame.current.toCSSObject();
        });
        var camelCasedCSSObject = core.computed(function () {
            frame.current;
            cssText.current;
            return frame.current.toCSSObject(true);
        });
        var onUpdate = function () {
            ++updateCount.current;
        };
        frame.subscribe(function (currentFrame, prevFrame) {
            prevFrame.off("update", onUpdate);
            currentFrame.on("update", onUpdate);
        });
        var nextReactiveObject = core.reactive(__assign({ cssText: cssText, cssObject: cssObject, camelCasedCSSObject: camelCasedCSSObject, onUpdate: onUpdate }, FRAME_METHODS.reduce(function (obj, cur) {
            obj[cur] = function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var currentFrame = frame.current;
                return currentFrame === null || currentFrame === void 0 ? void 0 : (_a = currentFrame[cur]).call.apply(_a, __spreadArray([currentFrame], args, false));
            };
            return obj;
        }, {})));
        return nextReactiveObject;
    },
    destroy: function (inst) {
        inst.off("update", inst.onUpdate);
    },
};

var NOW_FRAME_REACTIVE = __assign(__assign({}, FRAME_REACTIVE), { created: function (data) {
        var frame = core.observe(new Frame());
        data.on("animate", function (e) {
            frame.current = e.frame;
        });
        return FRAME_REACTIVE.created(frame);
    } });

var others = {
    __proto__: null,
    SceneItem: SceneItem,
    Frame: Frame,
    Animator: Animator,
    default: Scene,
    OPTIONS: OPTIONS,
    EVENTS: EVENTS,
    FIXED: FIXED,
    ROLES: ROLES,
    NAME_SEPARATOR: NAME_SEPARATOR,
    setRole: setRole,
    setAlias: setAlias,
    isRole: isRole,
    isScene: isScene,
    isSceneItem: isSceneItem,
    isFrame: isFrame,
    selectorAll: selectorAll,
    bezier: bezier,
    steps: steps,
    STEP_START: STEP_START,
    STEP_END: STEP_END,
    LINEAR: LINEAR,
    EASE: EASE,
    EASE_IN: EASE_IN,
    EASE_OUT: EASE_OUT,
    EASE_IN_OUT: EASE_IN_OUT,
    animate: animate,
    animateItem: animateItem,
    getMethodNames: getMethodNames,
    ANIMATOR_METHODS: ANIMATOR_METHODS,
    SCENE_METHODS: SCENE_METHODS,
    SCENE_REACTIVE: SCENE_REACTIVE,
    SCENE_ITEM_METHODS: SCENE_ITEM_METHODS,
    SCENE_ITEM_REACTIVE: SCENE_ITEM_REACTIVE,
    FRAME_METHODS: FRAME_METHODS,
    FRAME_REACTIVE: FRAME_REACTIVE,
    NOW_FRAME_REACTIVE: NOW_FRAME_REACTIVE
};

for (var name_1 in others) {
    Scene[name_1] = others[name_1];
}

module.exports = Scene;
//# sourceMappingURL=scene.cjs.js.map
