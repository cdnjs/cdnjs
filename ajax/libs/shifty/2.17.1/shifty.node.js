/*! Shifty 2.17.1 - https://github.com/jeremyckahn/shifty */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("shifty", [], factory);
	else if(typeof exports === 'object')
		exports["shifty"] = factory();
	else
		root["shifty"] = factory();
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 720:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Scene": () => /* reexport */ Scene,
  "Tweenable": () => /* reexport */ Tweenable,
  "interpolate": () => /* reexport */ interpolate,
  "processTweens": () => /* reexport */ processTweens,
  "setBezierFunction": () => /* reexport */ setBezierFunction,
  "tween": () => /* reexport */ tween,
  "unsetBezierFunction": () => /* reexport */ unsetBezierFunction
});

// NAMESPACE OBJECT: ./src/easing-functions.js
var easing_functions_namespaceObject = {};
__webpack_require__.r(easing_functions_namespaceObject);
__webpack_require__.d(easing_functions_namespaceObject, {
  "bounce": () => bounce,
  "bouncePast": () => bouncePast,
  "easeFrom": () => easeFrom,
  "easeFromTo": () => easeFromTo,
  "easeInBack": () => easeInBack,
  "easeInCirc": () => easeInCirc,
  "easeInCubic": () => easeInCubic,
  "easeInExpo": () => easeInExpo,
  "easeInOutBack": () => easeInOutBack,
  "easeInOutCirc": () => easeInOutCirc,
  "easeInOutCubic": () => easeInOutCubic,
  "easeInOutExpo": () => easeInOutExpo,
  "easeInOutQuad": () => easeInOutQuad,
  "easeInOutQuart": () => easeInOutQuart,
  "easeInOutQuint": () => easeInOutQuint,
  "easeInOutSine": () => easeInOutSine,
  "easeInQuad": () => easeInQuad,
  "easeInQuart": () => easeInQuart,
  "easeInQuint": () => easeInQuint,
  "easeInSine": () => easeInSine,
  "easeOutBack": () => easeOutBack,
  "easeOutBounce": () => easeOutBounce,
  "easeOutCirc": () => easeOutCirc,
  "easeOutCubic": () => easeOutCubic,
  "easeOutExpo": () => easeOutExpo,
  "easeOutQuad": () => easeOutQuad,
  "easeOutQuart": () => easeOutQuart,
  "easeOutQuint": () => easeOutQuint,
  "easeOutSine": () => easeOutSine,
  "easeTo": () => easeTo,
  "elastic": () => elastic,
  "linear": () => linear,
  "swingFrom": () => swingFrom,
  "swingFromTo": () => swingFromTo,
  "swingTo": () => swingTo
});

// NAMESPACE OBJECT: ./src/token.js
var token_namespaceObject = {};
__webpack_require__.r(token_namespaceObject);
__webpack_require__.d(token_namespaceObject, {
  "afterTween": () => afterTween,
  "beforeTween": () => beforeTween,
  "doesApply": () => doesApply,
  "tweenCreated": () => tweenCreated
});

;// CONCATENATED MODULE: ./src/easing-functions.js
/** @typedef {import(".").shifty.easingFunction} shifty.easingFunction */

/*!
 * All equations are adapted from Thomas Fuchs'
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
 *
 * Based on Easing Equations (c) 2003 [Robert
 * Penner](http://www.robertpenner.com/), all rights reserved. This work is
 * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
 */

/*!
 *  TERMS OF USE - EASING EQUATIONS
 *  Open source under the BSD License.
 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
 */

/**
 * @member Tweenable.formulas
 * @description A static Object of {@link shifty.easingFunction}s that can by
 * used by Shifty. The default values are defined in
 * [`easing-functions.js`](easing-functions.js.html), but you can add your own
 * {@link shifty.easingFunction}s by defining them as keys to this Object.
 *
 * Shifty ships with an implementation of [Robert Penner's easing
 * equations](http://robertpenner.com/easing/), as adapted from
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js)'s
 * implementation.
 * <p data-height="934" data-theme-id="0" data-slug-hash="wqObdO"
 * data-default-tab="js,result" data-user="jeremyckahn" data-embed-version="2"
 * data-pen-title="Shifty - Easing formula names" class="codepen">See the Pen <a
 * href="https://codepen.io/jeremyckahn/pen/wqObdO/">Shifty - Easing formula
 * names</a> by Jeremy Kahn (<a
 * href="https://codepen.io/jeremyckahn">@jeremyckahn</a>) on <a
 * href="https://codepen.io">CodePen</a>.</p>
 * <script async
 * src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
 * @type {Object.<shifty.easingFunction>}
 * @static
 */

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
var linear = function linear(pos) {
  return pos;
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInQuad = function easeInQuad(pos) {
  return Math.pow(pos, 2);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeOutQuad = function easeOutQuad(pos) {
  return -(Math.pow(pos - 1, 2) - 1);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInOutQuad = function easeInOutQuad(pos) {
  return (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 2) : -0.5 * ((pos -= 2) * pos - 2);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInCubic = function easeInCubic(pos) {
  return Math.pow(pos, 3);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeOutCubic = function easeOutCubic(pos) {
  return Math.pow(pos - 1, 3) + 1;
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInOutCubic = function easeInOutCubic(pos) {
  return (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 3) : 0.5 * (Math.pow(pos - 2, 3) + 2);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInQuart = function easeInQuart(pos) {
  return Math.pow(pos, 4);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeOutQuart = function easeOutQuart(pos) {
  return -(Math.pow(pos - 1, 4) - 1);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInOutQuart = function easeInOutQuart(pos) {
  return (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 4) : -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInQuint = function easeInQuint(pos) {
  return Math.pow(pos, 5);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeOutQuint = function easeOutQuint(pos) {
  return Math.pow(pos - 1, 5) + 1;
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInOutQuint = function easeInOutQuint(pos) {
  return (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 5) : 0.5 * (Math.pow(pos - 2, 5) + 2);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInSine = function easeInSine(pos) {
  return -Math.cos(pos * (Math.PI / 2)) + 1;
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeOutSine = function easeOutSine(pos) {
  return Math.sin(pos * (Math.PI / 2));
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInOutSine = function easeInOutSine(pos) {
  return -0.5 * (Math.cos(Math.PI * pos) - 1);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInExpo = function easeInExpo(pos) {
  return pos === 0 ? 0 : Math.pow(2, 10 * (pos - 1));
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeOutExpo = function easeOutExpo(pos) {
  return pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1;
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInOutExpo = function easeInOutExpo(pos) {
  if (pos === 0) {
    return 0;
  }

  if (pos === 1) {
    return 1;
  }

  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(2, 10 * (pos - 1));
  }

  return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInCirc = function easeInCirc(pos) {
  return -(Math.sqrt(1 - pos * pos) - 1);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeOutCirc = function easeOutCirc(pos) {
  return Math.sqrt(1 - Math.pow(pos - 1, 2));
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInOutCirc = function easeInOutCirc(pos) {
  return (pos /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - pos * pos) - 1) : 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeOutBounce = function easeOutBounce(pos) {
  if (pos < 1 / 2.75) {
    return 7.5625 * pos * pos;
  } else if (pos < 2 / 2.75) {
    return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
  } else if (pos < 2.5 / 2.75) {
    return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
  } else {
    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
  }
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInBack = function easeInBack(pos) {
  var s = 1.70158;
  return pos * pos * ((s + 1) * pos - s);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeOutBack = function easeOutBack(pos) {
  var s = 1.70158;
  return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeInOutBack = function easeInOutBack(pos) {
  var s = 1.70158;

  if ((pos /= 0.5) < 1) {
    return 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s));
  }

  return 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var elastic = function elastic(pos) {
  return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var swingFromTo = function swingFromTo(pos) {
  var s = 1.70158;
  return (pos /= 0.5) < 1 ? 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s)) : 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var swingFrom = function swingFrom(pos) {
  var s = 1.70158;
  return pos * pos * ((s + 1) * pos - s);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var swingTo = function swingTo(pos) {
  var s = 1.70158;
  return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var bounce = function bounce(pos) {
  if (pos < 1 / 2.75) {
    return 7.5625 * pos * pos;
  } else if (pos < 2 / 2.75) {
    return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
  } else if (pos < 2.5 / 2.75) {
    return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
  } else {
    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
  }
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var bouncePast = function bouncePast(pos) {
  if (pos < 1 / 2.75) {
    return 7.5625 * pos * pos;
  } else if (pos < 2 / 2.75) {
    return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75);
  } else if (pos < 2.5 / 2.75) {
    return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375);
  } else {
    return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375);
  }
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeFromTo = function easeFromTo(pos) {
  return (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 4) : -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeFrom = function easeFrom(pos) {
  return Math.pow(pos, 4);
};
/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */

var easeTo = function easeTo(pos) {
  return Math.pow(pos, 0.25);
};
;// CONCATENATED MODULE: ./src/tweenable.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/** @typedef {import("./index").shifty.filter} shifty.filter */

/** @typedef {import("./index").shifty.tweenConfig} shifty.tweenConfig */

/** @typedef {import("./index").shifty.scheduleFunction} shifty.scheduleFunction */
// CONSTANTS

var DEFAULT_EASING = 'linear';
var DEFAULT_DURATION = 500;
var UPDATE_TIME = 1000 / 60;
var root = typeof window !== 'undefined' ? window : global;
var AFTER_TWEEN = 'afterTween';
var AFTER_TWEEN_END = 'afterTweenEnd';
var BEFORE_TWEEN = 'beforeTween';
var TWEEN_CREATED = 'tweenCreated';
var TYPE_FUNCTION = 'function';
var TYPE_STRING = 'string'; // requestAnimationFrame() shim by Paul Irish (modified for Shifty)
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/

var scheduleFunction = root.requestAnimationFrame || root.webkitRequestAnimationFrame || root.oRequestAnimationFrame || root.msRequestAnimationFrame || root.mozCancelRequestAnimationFrame && root.mozRequestAnimationFrame || setTimeout;

var noop = function noop() {};

var listHead = null;
var listTail = null;
/**
 * Strictly for testing.
 * @private
 * @internal
 */

var resetList = function resetList() {
  listHead = listTail = null;
};
/**
 * Strictly for testing.
 * @returns {Tweenable}
 * @private
 * @internal
 */

var getListHead = function getListHead() {
  return listHead;
};
/**
 * Strictly for testing.
 * @returns {Tweenable}
 * @private
 * @internal
 */

var getListTail = function getListTail() {
  return listTail;
};

var formulas = _objectSpread({}, easing_functions_namespaceObject);
/**
 * Calculates the interpolated tween values of an Object for a given
 * timestamp.
 * @param {number} forPosition The position to compute the state for.
 * @param {Object} currentState Current state properties.
 * @param {Object} originalState: The original state properties the Object is
 * tweening from.
 * @param {Object} targetState: The destination state properties the Object
 * is tweening to.
 * @param {number} duration: The length of the tween in milliseconds.
 * @param {number} timestamp: The UNIX epoch time at which the tween began.
 * @param {Record<string, string|Function>} easing: This Object's keys must correspond
 * to the keys in targetState.
 * @returns {Object}
 * @private
 */


var tweenProps = function tweenProps(forPosition, currentState, originalState, targetState, duration, timestamp, easing) {
  var easedPosition;
  var easingObjectProp;
  var start;
  var normalizedPosition = forPosition < timestamp ? 0 : (forPosition - timestamp) / duration;
  var easingFn = null;
  var hasOneEase = false;

  if (easing && easing.call) {
    hasOneEase = true;
    easedPosition = easing(normalizedPosition);
  }

  for (var key in currentState) {
    if (!hasOneEase) {
      easingObjectProp = easing[key];
      easingFn = easingObjectProp.call ? easingObjectProp : formulas[easingObjectProp];
      easedPosition = easingFn(normalizedPosition);
    }

    start = originalState[key];
    currentState[key] = start + (targetState[key] - start) * easedPosition;
  }

  return currentState;
};

var processTween = function processTween(tween, currentTime) {
  var timestamp = tween._timestamp;
  var currentState = tween._currentState;
  var delay = tween._delay;

  if (currentTime < timestamp + delay) {
    return;
  }

  var duration = tween._duration;
  var targetState = tween._targetState;
  var endTime = timestamp + delay + duration;
  var timeToCompute = currentTime > endTime ? endTime : currentTime;
  var hasEnded = timeToCompute >= endTime;
  var offset = duration - (endTime - timeToCompute);
  var hasFilters = tween._filters.length > 0;

  if (hasEnded) {
    tween._render(targetState, tween._data, offset);

    return tween.stop(true);
  }

  if (hasFilters) {
    tween._applyFilter(BEFORE_TWEEN);
  } // If the animation has not yet reached the start point (e.g., there was
  // delay that has not yet completed), just interpolate the starting
  // position of the tween.


  if (timeToCompute < timestamp + delay) {
    timestamp = duration = timeToCompute = 1;
  } else {
    timestamp += delay;
  }

  tweenProps(timeToCompute, currentState, tween._originalState, targetState, duration, timestamp, tween._easing);

  if (hasFilters) {
    tween._applyFilter(AFTER_TWEEN);
  }

  tween._render(currentState, tween._data, offset);
};
/**
 * Process all tweens currently managed by Shifty for the current tick. This
 * does not perform any timing or update scheduling; it is the logic that is
 * run *by* the scheduling functionality. Specifically, it computes the state
 * and calls all of the relevant {@link shifty.tweenConfig} functions supplied
 * to each of the tweens for the current point in time (as determined by {@link
 * Tweenable.now}.
 *
 * This is a low-level API that won't be needed in the majority of situations.
 * It is primarily useful as a hook for higher-level animation systems that are
 * built on top of Shifty. If you need this function, it is likely you need to
 * pass something like `() => {}` to {@link
 * Tweenable.setScheduleFunction}, override {@link Tweenable.now}
 * and manage the scheduling logic yourself.
 *
 * @method shifty.processTweens
 * @see https://github.com/jeremyckahn/shifty/issues/109
 */


var processTweens = function processTweens() {
  var nextTweenToProcess;
  var currentTime = Tweenable.now();
  var currentTween = listHead;

  while (currentTween) {
    nextTweenToProcess = currentTween._next;
    processTween(currentTween, currentTime);
    currentTween = nextTweenToProcess;
  }
};

var getCurrentTime = Date.now || function () {
  return +new Date();
};

var now;
/**
 * Handles the update logic for one tick of a tween.
 * @param {number} [currentTimeOverride] Needed for accurate timestamp in
 * Tweenable#seek.
 * @private
 */

var scheduleUpdate = function scheduleUpdate() {
  now = getCurrentTime();
  scheduleFunction.call(root, scheduleUpdate, UPDATE_TIME);
  processTweens();
};
/**
 * Creates a usable easing Object from a string, a function or another easing
 * Object.  If `easing` is an Object, then this function clones it and fills
 * in the missing properties with `"linear"`.
 *
 * If the tween has only one easing across all properties, that function is
 * returned directly.
 * @param {Record<string, string|Function>} fromTweenParams
 * @param {Object|string|Function} [easing]
 * @param {Object} [composedEasing] Reused composedEasing object (used internally)
 * @return {Record<string, string|Function>|Function}
 * @private
 */

var composeEasingObject = function composeEasingObject(fromTweenParams) {
  var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_EASING;
  var composedEasing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var typeofEasing = _typeof(easing);

  if (formulas[easing]) {
    return formulas[easing];
  }

  if (typeofEasing === TYPE_STRING || typeofEasing === TYPE_FUNCTION) {
    for (var prop in fromTweenParams) {
      composedEasing[prop] = easing;
    }
  } else {
    for (var _prop in fromTweenParams) {
      composedEasing[_prop] = easing[_prop] || DEFAULT_EASING;
    }
  }

  return composedEasing;
}; // Private declarations used below

var remove = function (previousTween, nextTween) {
  return function (tween) {
    // Adapted from:
    // https://github.com/trekhleb/javascript-algorithms/blob/7c9601df3e8ca4206d419ce50b88bd13ff39deb6/src/data-structures/doubly-linked-list/DoublyLinkedList.js#L73-L121
    if (tween === listHead) {
      listHead = tween._next;

      if (listHead) {
        listHead._previous = null;
      } else {
        listTail = null;
      }
    } else if (tween === listTail) {
      listTail = tween._previous;

      if (listTail) {
        listTail._next = null;
      } else {
        listHead = null;
      }
    } else {
      previousTween = tween._previous;
      nextTween = tween._next;
      previousTween._next = nextTween;
      nextTween._previous = previousTween;
    } // Clean up any references in case the tween is restarted later.


    tween._previous = tween._next = null;
  };
}();

var defaultPromiseCtor = typeof Promise === 'function' ? Promise : null;
var Tweenable = /*#__PURE__*/function () {
  /**
   * @method Tweenable.now
   * @static
   * @returns {number} The current timestamp.
   */

  /**
   * @param {Object} [initialState={}] The values that the initial tween should
   * start at if a `from` value is not provided to {@link
   * Tweenable#tween} or {@link Tweenable#setConfig}.
   * @param {shifty.tweenConfig} [config] Configuration object to be passed to
   * {@link Tweenable#setConfig}.
   * @constructs Tweenable
   * @memberof shifty
   */
  function Tweenable() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, Tweenable);

    /** @private */
    this._config = {};
    /** @private */

    this._data = {};
    /** @private */

    this._delay = 0;
    /** @private */

    this._filters = [];
    /** @private */

    this._next = null;
    /** @private */

    this._previous = null;
    /** @private */

    this._timestamp = null;
    /** @private */

    this._resolve = null;
    /** @private */

    this._reject = null;
    /** @private */

    this._currentState = initialState || {};
    /** @private */

    this._originalState = {};
    /** @private */

    this._targetState = {};
    /** @private */

    this._start = noop;
    /** @private */

    this._render = noop;
    /** @private */

    this._promiseCtor = defaultPromiseCtor; // To prevent unnecessary calls to setConfig do not set default
    // configuration here.  Only set default configuration immediately before
    // tweening if none has been set.

    if (config) {
      this.setConfig(config);
    }
  }
  /**
   * Applies a filter to Tweenable instance.
   * @param {string} filterName The name of the filter to apply.
   * @private
   */


  _createClass(Tweenable, [{
    key: "_applyFilter",
    value: function _applyFilter(filterName) {
      for (var i = this._filters.length; i > 0; i--) {
        var filterType = this._filters[i - i];
        var filter = filterType[filterName];

        if (filter) {
          filter(this);
        }
      }
    }
    /**
     * Configure and start a tween. If this {@link Tweenable}'s instance
     * is already running, then it will stop playing the old tween and
     * immediately play the new one.
     * @method Tweenable#tween
     * @param {shifty.tweenConfig} [config] Gets passed to {@link
     * Tweenable#setConfig}.
     * @return {Tweenable}
     */

  }, {
    key: "tween",
    value: function tween() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (this._isPlaying) {
        this.stop();
      }

      if (config || !this._config) {
        this.setConfig(config);
      }
      /** @private */


      this._pausedAtTime = null;
      this._timestamp = Tweenable.now();

      this._start(this.get(), this._data);

      if (this._delay) {
        this._render(this._currentState, this._data, 0);
      }

      return this._resume(this._timestamp);
    }
    /**
     * Configure a tween that will start at some point in the future. Aside from
     * `delay`, `from`, and `to`, each configuration option will automatically
     * default to the same option used in the preceding tween of this {@link
     * Tweenable} instance.
     * @method Tweenable#setConfig
     * @param {shifty.tweenConfig} [config={}]
     * @return {Tweenable}
     */

  }, {
    key: "setConfig",
    value: function setConfig() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _config = this._config;

      for (var key in config) {
        _config[key] = config[key];
      } // Configuration options to reuse from previous tweens


      var _config$promise = _config.promise,
          promise = _config$promise === void 0 ? this._promiseCtor : _config$promise,
          _config$start = _config.start,
          start = _config$start === void 0 ? noop : _config$start,
          finish = _config.finish,
          _config$render = _config.render,
          render = _config$render === void 0 ? this._config.step || noop : _config$render,
          _config$step = _config.step,
          step = _config$step === void 0 ? noop : _config$step; // Attach something to this Tweenable instance (e.g.: a DOM element, an
      // object, a string, etc.);

      this._data = _config.data || _config.attachment || this._data; // Init the internal state

      /** @private */

      this._isPlaying = false;
      /** @private */

      this._pausedAtTime = null;
      /** @private */

      this._scheduleId = null;
      /** @private */

      this._delay = config.delay || 0;
      /** @private */

      this._start = start;
      /** @private */

      this._render = render || step;
      /** @private */

      this._duration = _config.duration || DEFAULT_DURATION;
      /** @private */

      this._promiseCtor = promise;

      if (finish) {
        this._resolve = finish;
      }

      var from = config.from,
          _config$to = config.to,
          to = _config$to === void 0 ? {} : _config$to;
      var _currentState = this._currentState,
          _originalState = this._originalState,
          _targetState = this._targetState;

      for (var _key in from) {
        _currentState[_key] = from[_key];
      }

      var anyPropsAreStrings = false;

      for (var _key2 in _currentState) {
        var currentProp = _currentState[_key2];

        if (!anyPropsAreStrings && _typeof(currentProp) === TYPE_STRING) {
          anyPropsAreStrings = true;
        }

        _originalState[_key2] = currentProp; // Ensure that there is always something to tween to.

        _targetState[_key2] = to.hasOwnProperty(_key2) ? to[_key2] : currentProp;
      }
      /** @private */


      this._easing = composeEasingObject(this._currentState, _config.easing, this._easing);
      this._filters.length = 0;

      if (anyPropsAreStrings) {
        for (var _key3 in Tweenable.filters) {
          if (Tweenable.filters[_key3].doesApply(this)) {
            this._filters.push(Tweenable.filters[_key3]);
          }
        }

        this._applyFilter(TWEEN_CREATED);
      }

      return this;
    }
    /**
     * Overrides any `finish` function passed via a {@link shifty.tweenConfig}.
     * @method Tweenable#then
     * @param {function} onFulfilled Receives {@link shifty.promisedData} as the
     * first parameter.
     * @param {function} onRejected Receives {@link shifty.promisedData} as the
     * first parameter.
     * @return {Promise<Object>}
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
     */

  }, {
    key: "then",
    value: function then(onFulfilled, onRejected) {
      var _this = this;

      /** @private */
      this._promise = new this._promiseCtor(function (resolve, reject) {
        _this._resolve = resolve;
        _this._reject = reject;
      });
      return this._promise.then(onFulfilled, onRejected);
    }
    /**
     * @method Tweenable#catch
     * @param {function} onRejected Receives {@link shifty.promisedData} as the
     * first parameter.
     * @return {Promise<Object>}
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
     */

  }, {
    key: "catch",
    value: function _catch(onRejected) {
      return this.then()["catch"](onRejected);
    }
    /**
     * @method Tweenable#get
     * @return {Object} The current state.
     */

  }, {
    key: "get",
    value: function get() {
      return _objectSpread({}, this._currentState);
    }
    /**
     * Set the current state.
     * @method Tweenable#set
     * @param {Object} state The state to set.
     */

  }, {
    key: "set",
    value: function set(state) {
      this._currentState = state;
    }
    /**
     * Pause a tween. Paused tweens can be resumed from the point at which they
     * were paused. If a tween is not running, this is a no-op.
     * @method Tweenable#pause
     * @return {Tweenable}
     */

  }, {
    key: "pause",
    value: function pause() {
      if (!this._isPlaying) {
        return;
      }

      this._pausedAtTime = Tweenable.now();
      this._isPlaying = false;
      remove(this);
      return this;
    }
    /**
     * Resume a paused tween.
     * @method Tweenable#resume
     * @return {Tweenable}
     */

  }, {
    key: "resume",
    value: function resume() {
      return this._resume();
    }
    /**
     * @private
     * @param {number} currentTime
     * @returns {Tweenable}
     */

  }, {
    key: "_resume",
    value: function _resume() {
      var currentTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Tweenable.now();

      if (this._timestamp === null) {
        return this.tween();
      }

      if (this._isPlaying) {
        return this._promise;
      }

      if (this._pausedAtTime) {
        this._timestamp += currentTime - this._pausedAtTime;
        this._pausedAtTime = null;
      }

      this._isPlaying = true;

      if (listHead === null) {
        listHead = this;
        listTail = this;
      } else {
        this._previous = listTail;
        listTail._next = this;
        listTail = this;
      }

      return this;
    }
    /**
     * Move the state of the animation to a specific point in the tween's
     * timeline.  If the animation is not running, this will cause {@link
     * shifty.renderFunction} handlers to be called.
     * @method Tweenable#seek
     * @param {number} millisecond The millisecond of the animation to seek
     * to.  This must not be less than `0`.
     * @return {Tweenable}
     */

  }, {
    key: "seek",
    value: function seek(millisecond) {
      millisecond = Math.max(millisecond, 0);
      var currentTime = Tweenable.now();

      if (this._timestamp + millisecond === 0) {
        return this;
      }

      this._timestamp = currentTime - millisecond; // Make sure that any render handlers are run.

      processTween(this, currentTime);
      return this;
    }
    /**
     * Stops a tween. If a tween is not running, this is a no-op. This method
     * does not cancel the tween {@link external:Promise}. For that, use {@link
     * Tweenable#cancel}.
     * @param {boolean} [gotoEnd] If `false`, the tween just stops at its current
     * state.  If `true`, the tweened object's values are instantly set to the
     * target values.
     * @method Tweenable#stop
     * @return {Tweenable}
     */

  }, {
    key: "stop",
    value: function stop() {
      var gotoEnd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this._isPlaying) {
        return this;
      }

      this._isPlaying = false;
      remove(this);
      var hasFilters = this._filters.length > 0;

      if (gotoEnd) {
        if (hasFilters) {
          this._applyFilter(BEFORE_TWEEN);
        }

        tweenProps(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing);

        if (hasFilters) {
          this._applyFilter(AFTER_TWEEN);

          this._applyFilter(AFTER_TWEEN_END);
        }
      }

      if (this._resolve) {
        this._resolve({
          data: this._data,
          state: this._currentState,
          tweenable: this
        });
      }

      this._resolve = null;
      this._reject = null;
      return this;
    }
    /**
     * {@link Tweenable#stop}s a tween and also `reject`s its {@link
     * external:Promise}. If a tween is not running, this is a no-op. Prevents
     * calling any provided `finish` function.
     * @param {boolean} [gotoEnd] Is propagated to {@link Tweenable#stop}.
     * @method Tweenable#cancel
     * @return {Tweenable}
     * @see https://github.com/jeremyckahn/shifty/issues/122
     */

  }, {
    key: "cancel",
    value: function cancel() {
      var gotoEnd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _currentState = this._currentState,
          _data = this._data,
          _isPlaying = this._isPlaying;

      if (!_isPlaying) {
        return this;
      }

      if (this._reject) {
        this._reject({
          data: _data,
          state: _currentState,
          tweenable: this
        });
      }

      this._resolve = null;
      this._reject = null;
      return this.stop(gotoEnd);
    }
    /**
     * Whether or not a tween is running.
     * @method Tweenable#isPlaying
     * @return {boolean}
     */

  }, {
    key: "isPlaying",
    value: function isPlaying() {
      return this._isPlaying;
    }
    /**
     * @method Tweenable#setScheduleFunction
     * @param {shifty.scheduleFunction} scheduleFunction
     * @deprecated Will be removed in favor of {@link Tweenable.setScheduleFunction} in 3.0.
     */

  }, {
    key: "setScheduleFunction",
    value: function setScheduleFunction(scheduleFunction) {
      Tweenable.setScheduleFunction(scheduleFunction);
    }
    /**
     * Get and optionally set the data that gets passed as `data` to {@link
     * shifty.promisedData}, {@link shifty.startFunction} and {@link
     * shifty.renderFunction}.
     * @param {Object} [data]
     * @method Tweenable#data
     * @return {Object} The internally stored `data`.
     */

  }, {
    key: "data",
    value: function data() {
      var _data2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (_data2) {
        this._data = _objectSpread({}, _data2);
      }

      return this._data;
    }
    /**
     * `delete` all "own" properties.  Call this when the {@link
     * Tweenable} instance is no longer needed to free memory.
     * @method Tweenable#dispose
     */

  }, {
    key: "dispose",
    value: function dispose() {
      for (var prop in this) {
        delete this[prop];
      }
    }
  }]);

  return Tweenable;
}(); // TODO: Make these proper static methods.

/**
 * Set a custom schedule function.
 *
 * By default,
 * [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
 * is used if available, otherwise
 * [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)
 * is used.
 * @method Tweenable.setScheduleFunction
 * @param {shifty.scheduleFunction} fn The function to be
 * used to schedule the next frame to be rendered.
 * @return {shifty.scheduleFunction} The function that was set.
 */

_defineProperty(Tweenable, "now", function () {
  return now;
});

Tweenable.setScheduleFunction = function (fn) {
  return scheduleFunction = fn;
};

Tweenable.formulas = formulas;
/**
 * The {@link shifty.filter}s available for use.  These filters are
 * automatically applied at tween-time by Shifty. You can define your own
 * {@link shifty.filter}s and attach them to this object.
 * @member Tweenable.filters
 * @type {Record<string, shifty.filter>}
 */

Tweenable.filters = {};
/**
 * @method shifty.tween
 * @param {shifty.tweenConfig} [config={}]
 * @description Standalone convenience method that functions identically to
 * {@link Tweenable#tween}.  You can use this to create tweens without
 * needing to set up a {@link Tweenable} instance.
 *
 * ```
 * import { tween } from 'shifty';
 *
 * tween({ from: { x: 0 }, to: { x: 10 } }).then(
 *   () => console.log('All done!')
 * );
 * ```
 *
 * @returns {Tweenable} A new {@link Tweenable} instance.
 */

function tween() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var tweenable = new Tweenable();
  tweenable.tween(config); // This is strictly a legacy shim from when this function returned a Promise.
  // REMOVE THIS LINE IN THE NEXT MAJOR VERSION

  tweenable.tweenable = tweenable;
  return tweenable;
}
scheduleUpdate();
;// CONCATENATED MODULE: ./src/token.js
/** @typedef {import("./tweenable").Tweenable} Tweenable */
var R_NUMBER_COMPONENT = /(\d|-|\.)/;
var R_FORMAT_CHUNKS = /([^\-0-9.]+)/g;
var R_UNFORMATTED_VALUES = /[0-9.-]+/g;

var R_RGBA = function () {
  var number = R_UNFORMATTED_VALUES.source;
  var comma = /,\s*/.source;
  return new RegExp("rgba?\\(".concat(number).concat(comma).concat(number).concat(comma).concat(number, "(").concat(comma).concat(number, ")?\\)"), 'g');
}();

var R_RGBA_PREFIX = /^.*\(/;
var R_HEX = /#([0-9]|[a-f]){3,6}/gi;
var VALUE_PLACEHOLDER = 'VAL'; // HELPERS

/**
 * @param {Array.number} rawValues
 * @param {string} prefix
 *
 * @return {Array.<string>}
 * @private
 */

var getFormatChunksFrom = function getFormatChunksFrom(rawValues, prefix) {
  return rawValues.map(function (val, i) {
    return "_".concat(prefix, "_").concat(i);
  });
};
/**
 * @param {string} formattedString
 *
 * @return {string}
 * @private
 */


var getFormatStringFrom = function getFormatStringFrom(formattedString) {
  var chunks = formattedString.match(R_FORMAT_CHUNKS);

  if (!chunks) {
    // chunks will be null if there were no tokens to parse in
    // formattedString (for example, if formattedString is '2').  Coerce
    // chunks to be useful here.
    chunks = ['', '']; // If there is only one chunk, assume that the string is a number
    // followed by a token...
    // NOTE: This may be an unwise assumption.
  } else if (chunks.length === 1 || // ...or if the string starts with a number component (".", "-", or a
  // digit)...
  formattedString.charAt(0).match(R_NUMBER_COMPONENT)) {
    // ...prepend an empty string here to make sure that the formatted number
    // is properly replaced by VALUE_PLACEHOLDER
    chunks.unshift('');
  }

  return chunks.join(VALUE_PLACEHOLDER);
};
/**
 * Convert a base-16 number to base-10.
 *
 * @param {number|string} hex The value to convert.
 *
 * @returns {number} The base-10 equivalent of `hex`.
 * @private
 */


function hexToDec(hex) {
  return parseInt(hex, 16);
}
/**
 * Convert a hexadecimal string to an array with three items, one each for
 * the red, blue, and green decimal values.
 *
 * @param {string} hex A hexadecimal string.
 *
 * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
 * valid string, or an Array of three 0's.
 * @private
 */


var hexToRGBArray = function hexToRGBArray(hex) {
  hex = hex.replace(/#/, ''); // If the string is a shorthand three digit hex notation, normalize it to
  // the standard six digit notation

  if (hex.length === 3) {
    hex = hex.split('');
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  return [hexToDec(hex.substr(0, 2)), hexToDec(hex.substr(2, 2)), hexToDec(hex.substr(4, 2))];
};
/**
 * @param {string} hexString
 *
 * @return {string}
 * @private
 */


var convertHexToRGB = function convertHexToRGB(hexString) {
  return "rgb(".concat(hexToRGBArray(hexString).join(','), ")");
};
/**
 * TODO: Can this be rewritten to leverage String#replace more efficiently?
 * Runs a filter operation on all chunks of a string that match a RegExp.
 *
 * @param {RegExp} pattern
 * @param {string} unfilteredString
 * @param {function(string)} filter
 *
 * @return {string}
 * @private
 */


var filterStringChunks = function filterStringChunks(pattern, unfilteredString, filter) {
  var patternMatches = unfilteredString.match(pattern);
  var filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);

  if (patternMatches) {
    patternMatches.forEach(function (match) {
      return filteredString = filteredString.replace(VALUE_PLACEHOLDER, filter(match));
    });
  }

  return filteredString;
};
/**
 * @param {string} str
 *
 * @return {string}
 * @private
 */


var sanitizeHexChunksToRGB = function sanitizeHexChunksToRGB(str) {
  return filterStringChunks(R_HEX, str, convertHexToRGB);
};
/**
 * Convert all hex color values within a string to an rgb string.
 *
 * @param {Object} stateObject
 * @private
 */


var sanitizeObjectForHexProps = function sanitizeObjectForHexProps(stateObject) {
  for (var prop in stateObject) {
    var currentProp = stateObject[prop];

    if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
      stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
    }
  }
};
/**
 * @param {string} rgbChunk
 *
 * @return {string}
 * @private
 */


var sanitizeRGBAChunk = function sanitizeRGBAChunk(rgbChunk) {
  var rgbaRawValues = rgbChunk.match(R_UNFORMATTED_VALUES);
  var rgbNumbers = rgbaRawValues.slice(0, 3).map(Math.floor);
  var prefix = rgbChunk.match(R_RGBA_PREFIX)[0];

  if (rgbaRawValues.length === 3) {
    return "".concat(prefix).concat(rgbNumbers.join(','), ")");
  } else if (rgbaRawValues.length === 4) {
    return "".concat(prefix).concat(rgbNumbers.join(','), ",").concat(rgbaRawValues[3], ")");
  }

  throw new Error("Invalid rgbChunk: ".concat(rgbChunk));
};
/**
 * Check for floating point values within rgb strings and round them.
 *
 * @param {string} formattedString
 *
 * @return {string}
 * @private
 */


var sanitizeRGBChunks = function sanitizeRGBChunks(formattedString) {
  return filterStringChunks(R_RGBA, formattedString, sanitizeRGBAChunk);
};
/**
 * Note: It's the duty of the caller to convert the Array elements of the
 * return value into numbers.  This is a performance optimization.
 *
 * @param {string} formattedString
 *
 * @return {Array.<string>|null}
 * @private
 */


var getValuesFrom = function getValuesFrom(formattedString) {
  return formattedString.match(R_UNFORMATTED_VALUES);
};
/**
 * @param {Object} stateObject
 *
 * @return {Object} An Object of formatSignatures that correspond to
 * the string properties of stateObject.
 * @private
 */


var getFormatSignatures = function getFormatSignatures(stateObject) {
  var signatures = {};

  for (var propertyName in stateObject) {
    var property = stateObject[propertyName];

    if (typeof property === 'string') {
      signatures[propertyName] = {
        formatString: getFormatStringFrom(property),
        chunkNames: getFormatChunksFrom(getValuesFrom(property), propertyName)
      };
    }
  }

  return signatures;
};
/**
 * @param {Object} stateObject
 * @param {Object} formatSignatures
 * @private
 */


var expandFormattedProperties = function expandFormattedProperties(stateObject, formatSignatures) {
  var _loop = function _loop(propertyName) {
    getValuesFrom(stateObject[propertyName]).forEach(function (number, i) {
      return stateObject[formatSignatures[propertyName].chunkNames[i]] = +number;
    });
    delete stateObject[propertyName];
  };

  for (var propertyName in formatSignatures) {
    _loop(propertyName);
  }
};
/**
 * @param {Object} stateObject
 * @param {Array.<string>} chunkNames
 *
 * @return {Object} The extracted value chunks.
 * @private
 */


var extractPropertyChunks = function extractPropertyChunks(stateObject, chunkNames) {
  var extractedValues = {};
  chunkNames.forEach(function (chunkName) {
    extractedValues[chunkName] = stateObject[chunkName];
    delete stateObject[chunkName];
  });
  return extractedValues;
};
/**
 * @param {Object} stateObject
 * @param {Array.<string>} chunkNames
 *
 * @return {Array.<number>}
 * @private
 */


var getValuesList = function getValuesList(stateObject, chunkNames) {
  return chunkNames.map(function (chunkName) {
    return stateObject[chunkName];
  });
};
/**
 * @param {string} formatString
 * @param {Array.<number>} rawValues
 *
 * @return {string}
 * @private
 */


var getFormattedValues = function getFormattedValues(formatString, rawValues) {
  rawValues.forEach(function (rawValue) {
    return formatString = formatString.replace(VALUE_PLACEHOLDER, +rawValue.toFixed(4));
  });
  return formatString;
};
/**
 * @param {Object} stateObject
 * @param {Object} formatSignatures
 * @private
 */


var collapseFormattedProperties = function collapseFormattedProperties(stateObject, formatSignatures) {
  for (var prop in formatSignatures) {
    var _formatSignatures$pro = formatSignatures[prop],
        chunkNames = _formatSignatures$pro.chunkNames,
        formatString = _formatSignatures$pro.formatString;
    var currentProp = getFormattedValues(formatString, getValuesList(extractPropertyChunks(stateObject, chunkNames), chunkNames));
    stateObject[prop] = sanitizeRGBChunks(currentProp);
  }
};
/**
 * @param {Object} easingObject
 * @param {Object} tokenData
 * @private
 */


var expandEasingObject = function expandEasingObject(easingObject, tokenData) {
  var _loop2 = function _loop2(prop) {
    var chunkNames = tokenData[prop].chunkNames;
    var easing = easingObject[prop];

    if (typeof easing === 'string') {
      var easingNames = easing.split(' ');
      var defaultEasing = easingNames[easingNames.length - 1];
      chunkNames.forEach(function (chunkName, i) {
        return easingObject[chunkName] = easingNames[i] || defaultEasing;
      });
    } else {
      // easing is a function
      chunkNames.forEach(function (chunkName) {
        return easingObject[chunkName] = easing;
      });
    }

    delete easingObject[prop];
  };

  for (var prop in tokenData) {
    _loop2(prop);
  }
};
/**
 * @param {Object} easingObject
 * @param {Object} tokenData
 * @private
 */


var collapseEasingObject = function collapseEasingObject(easingObject, tokenData) {
  for (var prop in tokenData) {
    var chunkNames = tokenData[prop].chunkNames;
    var firstEasing = easingObject[chunkNames[0]];

    if (typeof firstEasing === 'string') {
      easingObject[prop] = chunkNames.map(function (chunkName) {
        var easingName = easingObject[chunkName];
        delete easingObject[chunkName];
        return easingName;
      }).join(' ');
    } else {
      // firstEasing is a function
      easingObject[prop] = firstEasing;
    }
  }
};
/**
 * @memberof Tweenable.filters.token
 * @param {Tweenable} tweenable
 * @returns {boolean}
 */


var doesApply = function doesApply(tweenable) {
  for (var key in tweenable._currentState) {
    if (typeof tweenable._currentState[key] === 'string') {
      return true;
    }
  }

  return false;
};
/**
 * @memberof Tweenable.filters.token
 * @param {Tweenable} tweenable
 */

function tweenCreated(tweenable) {
  var _currentState = tweenable._currentState,
      _originalState = tweenable._originalState,
      _targetState = tweenable._targetState;
  [_currentState, _originalState, _targetState].forEach(sanitizeObjectForHexProps);
  tweenable._tokenData = getFormatSignatures(_currentState);
}
/**
 * @memberof Tweenable.filters.token
 * @param {Tweenable} tweenable
 */

function beforeTween(tweenable) {
  var _currentState = tweenable._currentState,
      _originalState = tweenable._originalState,
      _targetState = tweenable._targetState,
      _easing = tweenable._easing,
      _tokenData = tweenable._tokenData;
  expandEasingObject(_easing, _tokenData);
  [_currentState, _originalState, _targetState].forEach(function (state) {
    return expandFormattedProperties(state, _tokenData);
  });
}
/**
 * @memberof Tweenable.filters.token
 * @param {Tweenable} tweenable
 */

function afterTween(tweenable) {
  var _currentState = tweenable._currentState,
      _originalState = tweenable._originalState,
      _targetState = tweenable._targetState,
      _easing = tweenable._easing,
      _tokenData = tweenable._tokenData;
  [_currentState, _originalState, _targetState].forEach(function (state) {
    return collapseFormattedProperties(state, _tokenData);
  });
  collapseEasingObject(_easing, _tokenData);
}
;// CONCATENATED MODULE: ./src/interpolate.js
function interpolate_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function interpolate_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { interpolate_ownKeys(Object(source), true).forEach(function (key) { interpolate_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { interpolate_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function interpolate_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/** @typedef {import("./index").shifty.easingFunction} shifty.easingFunction */
// Fake a Tweenable and patch some internals.  This approach allows us to
// skip uneccessary processing and object recreation, cutting down on garbage
// collection pauses.

var mockTweenable = new Tweenable();
var filters = Tweenable.filters;
/**
 * Compute the midpoint of two Objects.  This method effectively calculates a
 * specific frame of animation that {@link Tweenable#tween} does many times
 * over the course of a full tween.
 *
 * ```
 * import { interpolate } from 'shifty';
 *
 * const interpolatedValues = interpolate({
 *     width: '100px',
 *     opacity: 0,
 *     color: '#fff'
 *   }, {
 *     width: '200px',
 *     opacity: 1,
 *     color: '#000'
 *   },
 *   0.5
 * );
 *
 * console.log(interpolatedValues); // Logs: {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
 * ```
 *
 * @method shifty.interpolate
 * @template T
 * @param {T} from The starting values to tween from.
 * @param {T} to The ending values to tween to.
 * @param {number} position The normalized position value (between `0.0` and
 * `1.0`) to interpolate the values between `from` and `to` for.  `from`
 * represents `0` and `to` represents `1`.
 * @param {Record<string, string | shifty.easingFunction> | string | shifty.easingFunction} easing
 * The easing curve(s) to calculate the midpoint against.  You can
 * reference any easing function attached to {@link Tweenable.formulas},
 * or provide the {@link shifty.easingFunction}(s) directly.  If omitted, this
 * defaults to "linear".
 * @param {number} [delay=0] Optional delay to pad the beginning of the
 * interpolated tween with.  This increases the range of `position` from (`0`
 * through `1`) to (`0` through `1 + delay`).  So, a delay of `0.5` would
 * increase all valid values of `position` to numbers between `0` and `1.5`.
 * @return {T}
 */

var interpolate = function interpolate(from, to, position, easing) {
  var delay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  var current = interpolate_objectSpread({}, from);

  var easingObject = composeEasingObject(from, easing);
  mockTweenable._filters.length = 0;
  mockTweenable.set({});
  mockTweenable._currentState = current;
  mockTweenable._originalState = from;
  mockTweenable._targetState = to;
  mockTweenable._easing = easingObject;

  for (var name in filters) {
    if (filters[name].doesApply(mockTweenable)) {
      mockTweenable._filters.push(filters[name]);
    }
  } // Any defined value transformation must be applied


  mockTweenable._applyFilter('tweenCreated');

  mockTweenable._applyFilter('beforeTween');

  var interpolatedValues = tweenProps(position, current, from, to, 1, delay, easingObject); // Transform data in interpolatedValues back into its original format

  mockTweenable._applyFilter('afterTween');

  return interpolatedValues;
};
;// CONCATENATED MODULE: ./src/scene.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function scene_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function scene_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function scene_createClass(Constructor, protoProps, staticProps) { if (protoProps) scene_defineProperties(Constructor.prototype, protoProps); if (staticProps) scene_defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _tweenables = new WeakMap();

/** @typedef {import("./tweenable").Tweenable} Tweenable */
var Scene = /*#__PURE__*/function () {
  /**
   * The {@link Scene} class provides a way to control groups of {@link
   * Tweenable}s. It is lightweight, minimalistic, and meant to provide
   * performant {@link Tweenable} batch control that users of Shifty
   * might otherwise have to implement themselves. It is **not** a robust
   * timeline solution, and it does **not** provide utilities for sophisticated
   * animation sequencing or orchestration. If that is what you need for your
   * project, consider using a more robust tool such as
   * [Rekapi](http://jeremyckahn.github.io/rekapi/doc/) (a timeline layer built
   * on top of Shifty).
   *
   * Please be aware that {@link Scene} does **not** perform any
   * automatic cleanup. If you want to remove a {@link Tweenable} from a
   * {@link Scene}, you must do so explicitly with either {@link
   * Scene#remove} or {@link Scene#empty}.
   *
   * <p class="codepen" data-height="677" data-theme-id="0" data-default-tab="js,result" data-user="jeremyckahn" data-slug-hash="qvZKbe" style="height: 677px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Shifty Scene Demo">
   * <span>See the Pen <a href="https://codepen.io/jeremyckahn/pen/qvZKbe/">
   * Shifty Scene Demo</a> by Jeremy Kahn (<a href="https://codepen.io/jeremyckahn">@jeremyckahn</a>)
   * on <a href="https://codepen.io">CodePen</a>.</span>
   * </p>
   * <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
   * @param {...Tweenable} tweenables
   * @see https://codepen.io/jeremyckahn/pen/qvZKbe
   * @constructs Scene
   * @memberof shifty
   */
  function Scene() {
    scene_classCallCheck(this, Scene);

    _tweenables.set(this, {
      writable: true,
      value: []
    });

    for (var _len = arguments.length, tweenables = new Array(_len), _key = 0; _key < _len; _key++) {
      tweenables[_key] = arguments[_key];
    }

    tweenables.forEach(this.add.bind(this));
  }
  /**
   * A copy of the internal {@link Tweenable}s array.
   * @member Scene#tweenables
   * @type {Array.<Tweenable>}
   */


  scene_createClass(Scene, [{
    key: "add",

    /**
     * Add a {@link Tweenable} to be controlled by this {@link
     * Scene}.
     * @method Scene#add
     * @param {Tweenable} tweenable
     * @return {Tweenable} The {@link Tweenable} that was added.
     */
    value: function add(tweenable) {
      _classPrivateFieldGet(this, _tweenables).push(tweenable);

      return tweenable;
    }
    /**
     * Remove a {@link Tweenable} that is controlled by this {@link
     * Scene}.
     * @method Scene#remove
     * @param {Tweenable} tweenable
     * @return {Tweenable} The {@link Tweenable} that was removed.
     */

  }, {
    key: "remove",
    value: function remove(tweenable) {
      var index = _classPrivateFieldGet(this, _tweenables).indexOf(tweenable);

      if (~index) {
        _classPrivateFieldGet(this, _tweenables).splice(index, 1);
      }

      return tweenable;
    }
    /**
     * [Remove]{@link Scene#remove} all {@link Tweenable}s in this {@link
     * Scene}.
     * @method Scene#empty
     * @return {Array.<Tweenable>} The {@link Tweenable}s that were
     * removed.
     */

  }, {
    key: "empty",
    value: function empty() {
      // Deliberate of the tweenables getter here to create a temporary array
      return this.tweenables.map(this.remove.bind(this));
    }
    /**
     * Is `true` if any {@link Tweenable} in this {@link Scene} is
     * playing.
     * @method Scene#isPlaying
     * @return {boolean}
     */

  }, {
    key: "isPlaying",
    value: function isPlaying() {
      return _classPrivateFieldGet(this, _tweenables).some(function (tweenable) {
        return tweenable.isPlaying();
      });
    }
    /**
     * Play all {@link Tweenable}s from their beginning.
     * @method Scene#play
     * @return {Scene}
     */

  }, {
    key: "play",
    value: function play() {
      _classPrivateFieldGet(this, _tweenables).forEach(function (tweenable) {
        return tweenable.tween();
      });

      return this;
    }
    /**
     * {@link Tweenable#pause} all {@link Tweenable}s in this
     * {@link Scene}.
     * @method Scene#pause
     * @return {Scene}
     */

  }, {
    key: "pause",
    value: function pause() {
      _classPrivateFieldGet(this, _tweenables).forEach(function (tweenable) {
        return tweenable.pause();
      });

      return this;
    }
    /**
     * {@link Tweenable#resume} all paused {@link Tweenable}s.
     * @method Scene#resume
     * @return {Scene}
     */

  }, {
    key: "resume",
    value: function resume() {
      _classPrivateFieldGet(this, _tweenables).forEach(function (tweenable) {
        return tweenable.resume();
      });

      return this;
    }
    /**
     * {@link Tweenable#stop} all {@link Tweenable}s in this {@link
     * Scene}.
     * @method Scene#stop
     * @param {boolean} [gotoEnd]
     * @return {Scene}
     */

  }, {
    key: "stop",
    value: function stop(gotoEnd) {
      _classPrivateFieldGet(this, _tweenables).forEach(function (tweenable) {
        return tweenable.stop(gotoEnd);
      });

      return this;
    }
  }, {
    key: "tweenables",
    get: function get() {
      return _toConsumableArray(_classPrivateFieldGet(this, _tweenables));
    }
    /**
     * The {@link external:Promise}s for all {@link Tweenable}s in this
     * {@link Scene} that have been configured with {@link
     * Tweenable#setConfig}. Note that each call of {@link
     * Scene#play} or {@link Scene#pause} creates new {@link
     * external:Promise}s:
     *
     *     const scene = new Scene(new Tweenable());
     *     scene.play();
     *
     *     Promise.all(scene.promises).then(() =>
     *       // Plays the scene again upon completion, but a new promise is
     *       // created so this line only runs once.
     *       scene.play()
     *     );
     *
     * @member Scene#promises
     * @type {Array.<Promise<any>>}
     */

  }, {
    key: "promises",
    get: function get() {
      return _classPrivateFieldGet(this, _tweenables).map(function (tweenable) {
        return tweenable.then();
      });
    }
  }]);

  return Scene;
}();
;// CONCATENATED MODULE: ./src/bezier.js

/** @typedef {import(".").shifty.easingFunction} shifty.easingFunction */

/**
 * The Bezier magic in this file is adapted/copied almost wholesale from
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/cubic-bezier.js),
 * which was adapted from Apple code (which probably came from
 * [here](http://opensource.apple.com/source/WebCore/WebCore-955.66/platform/graphics/UnitBezier.h)).
 * Special thanks to Apple and Thomas Fuchs for much of this code.
 */

/**
 *  Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder(s) nor the names of any
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 *  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 *  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 *  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 *  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
// port of webkit cubic bezier handling by http://www.netzgesta.de/dev/

/**
 * @param {number} t
 * @param {number} p1x
 * @param {number} p1y
 * @param {number} p2x
 * @param {number} p2y
 * @param {number} duration
 * @returns {Function}
 * @private
 */

function cubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
  var ax = 0,
      bx = 0,
      cx = 0,
      ay = 0,
      by = 0,
      cy = 0;

  var sampleCurveX = function sampleCurveX(t) {
    return ((ax * t + bx) * t + cx) * t;
  };

  var sampleCurveY = function sampleCurveY(t) {
    return ((ay * t + by) * t + cy) * t;
  };

  var sampleCurveDerivativeX = function sampleCurveDerivativeX(t) {
    return (3 * ax * t + 2 * bx) * t + cx;
  };

  var solveEpsilon = function solveEpsilon(duration) {
    return 1 / (200 * duration);
  };

  var fabs = function fabs(n) {
    return n >= 0 ? n : 0 - n;
  };

  var solveCurveX = function solveCurveX(x, epsilon) {
    var t0, t1, t2, x2, d2, i;

    for (t2 = x, i = 0; i < 8; i++) {
      x2 = sampleCurveX(t2) - x;

      if (fabs(x2) < epsilon) {
        return t2;
      }

      d2 = sampleCurveDerivativeX(t2);

      if (fabs(d2) < 1e-6) {
        break;
      }

      t2 = t2 - x2 / d2;
    }

    t0 = 0;
    t1 = 1;
    t2 = x;

    if (t2 < t0) {
      return t0;
    }

    if (t2 > t1) {
      return t1;
    }

    while (t0 < t1) {
      x2 = sampleCurveX(t2);

      if (fabs(x2 - x) < epsilon) {
        return t2;
      }

      if (x > x2) {
        t0 = t2;
      } else {
        t1 = t2;
      }

      t2 = (t1 - t0) * 0.5 + t0;
    }

    return t2; // Failure.
  };

  var solve = function solve(x, epsilon) {
    return sampleCurveY(solveCurveX(x, epsilon));
  };

  cx = 3 * p1x;
  bx = 3 * (p2x - p1x) - cx;
  ax = 1 - cx - bx;
  cy = 3 * p1y;
  by = 3 * (p2y - p1y) - cy;
  ay = 1 - cy - by;
  return solve(t, solveEpsilon(duration));
} // End ported code

/**
 *  GetCubicBezierTransition(x1, y1, x2, y2) -> Function.
 *
 *  Generates a transition easing function that is compatible
 *  with WebKit's CSS transitions `-webkit-transition-timing-function`
 *  CSS property.
 *
 *  The W3C has more information about CSS3 transition timing functions:
 *  http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
 *
 *  @param {number} x1
 *  @param {number} y1
 *  @param {number} x2
 *  @param {number} y2
 *  @return {Function}
 *  @private
 */


var getCubicBezierTransition = function getCubicBezierTransition(x1, y1, x2, y2) {
  return function (pos) {
    return cubicBezierAtTime(pos, x1, y1, x2, y2, 1);
  };
};
/**
 * Create a Bezier easing function and attach it to {@link
 * Tweenable.formulas}.  This function gives you total control over the
 * easing curve.  Matthew Lein's [Ceaser](http://matthewlein.com/ceaser/) is a
 * useful tool for visualizing the curves you can make with this function.
 * @method shifty.setBezierFunction
 * @param {string} name The name of the easing curve.  Overwrites the old
 * easing function on {@link Tweenable.formulas} if it exists.
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {shifty.easingFunction} The {@link shifty.easingFunction} that was
 * attached to {@link Tweenable.formulas}.
 */


var setBezierFunction = function setBezierFunction(name, x1, y1, x2, y2) {
  var cubicBezierTransition = getCubicBezierTransition(x1, y1, x2, y2);
  cubicBezierTransition.displayName = name;
  cubicBezierTransition.x1 = x1;
  cubicBezierTransition.y1 = y1;
  cubicBezierTransition.x2 = x2;
  cubicBezierTransition.y2 = y2;
  return Tweenable.formulas[name] = cubicBezierTransition;
};
/**
 * `delete` an easing function from {@link Tweenable.formulas}.  Be
 * careful with this method, as it `delete`s whatever easing formula matches
 * `name` (which means you can delete standard Shifty easing functions).
 * @method shifty.unsetBezierFunction
 * @param {string} name The name of the easing function to delete.
 * @return {boolean} Whether or not the functions was `delete`d.
 */

var unsetBezierFunction = function unsetBezierFunction(name) {
  return delete Tweenable.formulas[name];
};
;// CONCATENATED MODULE: ./src/index.js
/**
 * @namespace shifty
 */


Tweenable.filters.token = token_namespaceObject;




/**
 * @external Promise
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
 */

/**
 * @external thenable
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then}
 */

/**
 * @callback shifty.easingFunction
 * @param {number} position The normalized (0-1) position of the tween.
 * @return {number} The curve-adjusted value.
 */

/**
 * @callback shifty.startFunction
 * @param {Object} state The current state of the tween.
 * @param {Object|undefined} [data] User-defined data provided via a {@link
 * shifty.tweenConfig}.
 * @returns {void}
 */

/**
 * @callback shifty.finishFunction
 * @param {shifty.promisedData} promisedData
 * @returns {void}
 */

/**
 * Gets called for every tick of the tween.  This function is not called on the
 * final tick of the animation.
 * @callback shifty.renderFunction
 * @param {Object} state The current state of the tween.
 * @param {Object|undefined} data User-defined data provided via a {@link
 * shifty.tweenConfig}.
 * @param {number} timeElapsed The time elapsed since the start of the tween.
 * @returns {void}
 */

/**
 * @callback shifty.scheduleFunction
 * @param {Function} callback
 * @param {number} timeout
 * @returns {void}
 */

/**
 * @typedef {Object} shifty.tweenConfig
 * @property {Object} [from] Starting position.  If omitted, {@link
 * Tweenable#get} is used.
 * @property {Object} [to] Ending position.  The keys of this Object should
 * match those of `to`.
 * @property {number} [duration] How many milliseconds to animate for.
 * @property {number} [delay] How many milliseconds to wait before starting the
 * tween.
 * @property {shifty.startFunction} [start] Executes when the tween begins.
 * @property {shifty.finishFunction} [finish] Executes when the tween
 * completes. This will get overridden by {@link Tweenable#then} if that
 * is called, and it will not fire if {@link Tweenable#cancel} is
 * called.
 * @property {shifty.renderFunction} [render] Executes on every tick. Shifty
 * assumes a [retained mode](https://en.wikipedia.org/wiki/Retained_mode)
 * rendering environment, which in practice means that `render` only gets
 * called when the tween state changes. Importantly, this means that `render`
 * is _not_ called when a tween is not animating (for instance, when it is
 * paused or waiting to start via the `delay` option). This works naturally
 * with DOM environments, but you may need to account for this design in more
 * custom environments such as `<canvas>`.
 *
 * Legacy property name: `step`.
 * @property {Object<string|shifty.easingFunction>|string|shifty.easingFunction} [easing]
 * Easing curve name(s) or {@link shifty.easingFunction}(s) to apply
 * to the properties of the tween.  If this is an Object, the keys should
 * correspond to `to`/`from`.  You can learn more about this in the {@tutorial
 * easing-function-in-depth} tutorial.
 * @property {Object} [data] Data that is passed to {@link
 * shifty.startFunction}, {@link shifty.renderFunction}, and {@link
 * shifty.promisedData}. Legacy property name: `attachment`.
 * @property {Function} [promise] Promise constructor for when you want
 * to use Promise library or polyfill Promises in unsupported environments.
 */

/**
 * @typedef {Object} shifty.promisedData
 * @property {Object} state The current state of the tween.
 * @property {Object} data The `data` Object that the tween was configured with.
 * @property {Tweenable} tweenable The {@link Tweenable} instance to
 * which the tween belonged.
 */

/**
 * Is called when a tween is created to determine if a filter is needed.
 * Filters are only added to a tween when it is created so that they are not
 * unnecessarily processed if they don't apply during an update tick.
 * @callback shifty.doesApplyFilter
 * @param {Tweenable} tweenable The {@link Tweenable} instance.
 * @return {boolean}
 */

/**
 * Is called when a tween is created.  This should perform any setup needed by
 * subsequent per-tick calls to {@link shifty.beforeTween} and {@link
 * shifty.afterTween}.
 * @callback shifty.tweenCreatedFilter
 * @param {Tweenable} tweenable The {@link Tweenable} instance.
 * @returns {void}
 */

/**
 * Is called right before a tween is processed in a tick.
 * @callback shifty.beforeTweenFilter
 * @param {Tweenable} tweenable The {@link Tweenable} instance.
 * @returns {void}
 */

/**
 * Is called right after a tween is processed in a tick.
 * @callback shifty.afterTweenFilter
 * @param {Tweenable} tweenable The {@link Tweenable} instance.
 * @returns {void}
 */

/**
 * An Object that contains functions that are called at key points in a tween's
 * lifecycle.  Shifty can only process `Number`s internally, but filters can
 * expand support for any type of data.  This is the mechanism that powers
 * [string interpolation]{@tutorial string-interpolation}.
 * @typedef {Object} shifty.filter
 * @property {shifty.doesApplyFilter} doesApply Is called when a tween is
 * created.
 * @property {shifty.tweenCreatedFilter} tweenCreated Is called when a tween is
 * created.
 * @property {shifty.beforeTweenFilter} beforeTween Is called right before a
 * tween starts.
 * @property {shifty.afterTweenFilter} afterTween Is called right after a tween
 * ends.
 */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(720);
/******/ })()
;
});
//# sourceMappingURL=shifty.node.js.map