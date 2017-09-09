/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/jquery-pauseresume project is licensed under the MIT license
 * 
 * @egjs/jquery-pauseresume JavaScript library
 * 
 * 
 * @version 2.0.1
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _AniPropertyManager = __webpack_require__(2);

var _AniPropertyManager2 = _interopRequireDefault(_AniPropertyManager);

var _MathUtil = __webpack_require__(4);

var _MathUtil2 = _interopRequireDefault(_MathUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @namespace jQuery
 */
exports["default"] = function ($) {
	var animateFn = $.fn.animate;
	var stopFn = $.fn.stop;
	var delayFn = $.fn.delay;

	/**
  * Generate a new easing function.
  *
  * function to avoid JS Hint error "Don't make functions within a loop"
  */
	function generateNewEasingFunc(resumePercent, remainPercent, scale, originalEasing) {
		return function easingFunc(percent) {
			var newPercent = resumePercent + remainPercent * percent;

			return scale(originalEasing(newPercent));
		};
	}

	$.fn.animate = function (prop, speed, easing, callback) {
		return this.each(function () {
			// optall should be made for each elements.
			var optall = $.speed(speed, easing, callback);

			// prepare next animation when current animation completed.
			optall.complete = function () {
				_AniPropertyManager2["default"].prepareNextAniProp(this);
			};

			// Queue animation property to recover the current animation.
			_AniPropertyManager2["default"].addAniProperty("animate", this, prop, optall);
			animateFn.call($(this), prop, optall);
		});

		// TODO: Below code is more reasonable?
		// return animateFn.call(this, prop, optall); // and declare optall at outside this.each loop.
	};

	/**
  * Set a timer to delay execution of subsequent items in the queue.
  * And it internally manages "fx"queue to support pause/resume if "fx" type.
  *
  * @param {Number} An integer indicating the number of milliseconds to delay execution of the next item in the queue.
  * @param {String} A string containing the name of the queue. Defaults to fx, the standard effects queue.
  */
	$.fn.delay = function (time, type) {
		var t = void 0;
		var isCallByResume = arguments.length <= 2 ? undefined : arguments[2]; // internal used value.

		if (type && type !== "fx") {
			return delayFn.call(this, time, type);
		}

		t = parseInt(time, 10);
		t = isNaN(t) ? 0 : t;

		return this.each(function () {
			var _this = this;

			if (!isCallByResume) {
				// Queue delay property to recover the current animation.
				// Don't add property when delay is called by resume.
				_AniPropertyManager2["default"].addAniProperty("delay", this, null, { duration: t });
			}

			delayFn.call($(this), time).queue(function (next) {
				next();

				// Remove delay property when delay has been expired.
				_AniPropertyManager2["default"].removeAniProperty(_this);
			});
		});
	};

	/**
  * Pauses the animation executed through a call to the jQuery <a href=http://api.jquery.com/animate/>.animate()</a> method.
  * @ko jQuery의<a href=http://api.jquery.com/animate/>animate() 메서드</a>가 실행한 애니메이션을 일시 정지한다
  *
  * @name jQuery#pause
  * @method
  * @support {"ie": "10+", "ch" : "latest", "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
  * @example
  * $("#box").pause(); //paused the current animation
  */
	$.fn.pause = function () {
		return this.each(function () {
			var p = void 0;

			if (_AniPropertyManager2["default"].getStatus(this) !== "inprogress") {
				return;
			}
			// Clear fx-queue except 1 dummy function
			// for promise not to be expired when calling stop()
			$.queue(this, "fx", [$.noop]);
			stopFn.call($(this));

			// Remember current animation property
			p = this.__aniProps[0];
			if (p) {
				p.elapsed += $.now() - p.start;

				// Complement native timer's inaccuracy (complete timer can be different from your request.)
				// (eg. your request:400ms -> real :396 ~ 415 ms ))
				if (p.elapsed >= p.opt.duration) {
					p = _AniPropertyManager2["default"].prepareNextAniProp(this);
				}

				p && (p.paused = true);
			}
		});
	};

	/**
  * Resumes the animation paused through a call to the pause() method.
  * @ko pause() 메서드가 일시 정지한 애니메이션을 다시 실행한다
  *
  * @name jQuery#resume
  * @alias eg.Pause
  * @method
  * @support {"ie": "10+", "ch" : "latest", "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
  * @example
  * $("#box").resume(); //resume the paused animation
  */
	$.fn.resume = function () {
		return this.each(function () {
			var type = "fx";
			var p = void 0;
			var i = void 0;

			if (_AniPropertyManager2["default"].getStatus(this) !== "paused") {
				return;
			}

			// Clear fx-queue,
			// And this queue will be initialized by animate call.
			$.queue(this, type || "fx", []);

			// Restore __aniProps
			i = 0;
			p = this.__aniProps[i];

			while (p) {
				// Restore easing status
				if (p.elapsed > 0 && p.opt.easing) {
					var resumePercent = p.elapsed / p.opt.duration;
					var remainPercent = 1 - resumePercent;
					var originalEasing = $.easing[p.opt.easing];
					var startEasingValue = originalEasing(resumePercent);
					var scale = _MathUtil2["default"].scaler([startEasingValue, 1], [0, 1]);
					var newEasingName = p.opt.easing + "_" + p.uuid;

					// Make new easing function that continues from pause point.
					$.easing[newEasingName] = generateNewEasingFunc(resumePercent, remainPercent, scale, originalEasing);
					p.opt.easing = newEasingName;

					// Store new easing function to clear it later.
					p.addEasingFn(newEasingName);
				}

				p.paused = false;
				p.opt.duration -= p.elapsed;

				// If duration remains, request 'animate' with storing aniProps
				if (p.opt.duration > 0 || p.elapsed === 0) {
					i === 0 && p.init();

					if (p.type === "delay") {
						// pass last parameter 'true' not to add an aniProperty.
						$(this).delay(p.opt.duration, "fx", true);
					} else {
						animateFn.call($(this), p.prop, p.opt);
					}
				}

				i++;
				p = this.__aniProps[i];
			}
		});
	};

	$.fn.stop = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var type = args[0];
		var clearQ = args[1];

		stopFn.apply(this, args);

		if (typeof type !== "string") {
			clearQ = type;
		}

		return this.each(function () {
			var p = void 0;

			// When this element was not animated properly, do nothing.
			if (_AniPropertyManager2["default"].getStatus(this) === "empty") {
				return;
			}

			if (!clearQ) {
				p = this.__aniProps.shift();
				p && p.clearEasingFn();
			} else {
				// If clearQueue is requested,
				// then all properties must be initialized
				// for element not to be resumed.
				p = this.__aniProps.shift();
				while (p) {
					p.clearEasingFn();
					p = this.__aniProps.shift();
				}
				this.__aniProps = [];
			}
		});
	};

	$.expr.filters.paused = function (elem) {
		return _AniPropertyManager2["default"].getStatus(elem) === "paused";
	};
}(_jquery2["default"]);

module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _AniProperty = __webpack_require__(3);

var _AniProperty2 = _interopRequireDefault(_AniProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AniPropertyManager = function () {
	function AniPropertyManager() {
		_classCallCheck(this, AniPropertyManager);
	}

	AniPropertyManager.addAniProperty = function addAniProperty(type, el, prop, optall) {
		var newProp = new _AniProperty2["default"](type, el, prop, optall);

		el.__aniProps = el.__aniProps || [];

		// Animation is excuted immediately.
		if (el.__aniProps.length === 0) {
			newProp.init();
		}
		el.__aniProps.push(newProp);
	};

	AniPropertyManager.removeAniProperty = function removeAniProperty(el) {
		var removeProp = el.__aniProps.shift();

		removeProp && removeProp.clearEasingFn();
		el.__aniProps[0] && el.__aniProps[0].init();
	};

	AniPropertyManager.prepareNextAniProp = function prepareNextAniProp(el) {
		// Dequeue animation property that was ended.
		var removeProp = el.__aniProps.shift();
		var userCallback = removeProp.opt.old;

		removeProp.clearEasingFn();

		// Callback should be called before aniProps.init()
		if (userCallback && typeof userCallback === "function") {
			userCallback.call(el);
		}

		// If next ani property exists
		el.__aniProps[0] && el.__aniProps[0].init();
		return el.__aniProps[0];
	};

	// Check if this element can be paused/resume.


	AniPropertyManager.getStatus = function getStatus(el) {
		if (!el.__aniProps || el.__aniProps.length === 0) {
			// Current element doesn't have animation information.
			// Check 'animate' is applied to this element.
			return "empty";
		}

		return el.__aniProps[0].paused ? "paused" : "inprogress";
	};

	return AniPropertyManager;
}();

exports["default"] = AniPropertyManager;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = _jquery2["default"];
var uuid = 1;

var AniProperty = function () {
	function AniProperty(type, el, prop, optall) {
		_classCallCheck(this, AniProperty);

		this.el = el;
		this.opt = optall;
		this.start = -1;
		this.elapsed = 0;
		this.paused = false;
		this.uuid = uuid++;
		this.easingNames = [];
		this.prop = prop;
		this.type = type;
	}

	AniProperty.prototype.init = function init() {
		this.start = $.now();
		this.elapsed = 0;

		for (var propName in this.prop) {
			var propValue = this.prop[propName];

			// DO NOT SUPPORT TRANSFORM YET
			// TODO: convert from relative value to absolute value on transform
			if (propName === "transform") {
				continue;
			}

			if (typeof propValue !== "string") {
				continue;
			}

			// If it has a absoulte value.
			var markIndex = propValue.search(/[+|-]=/);

			if (markIndex < 0) {
				// this.prop[propName] = propValue;
				continue;
			}

			// If it has a relative value
			var sign = propValue.charAt(markIndex) === "-" ? -1 : 1;

			// Current value
			var currValue = $.css(this.el, propName);

			// CurrValue + (relativeValue)
			this.prop[propName] = propValue.replace(/([-|+])*([\d|.])+/g, AniProperty.generateAbsoluteValMaker(currValue, propName, sign)).replace(/[-|+]+=/g, "");
		}
	};

	AniProperty.prototype.addEasingFn = function addEasingFn(easingName) {
		this.easingNames.push(easingName);
	};

	AniProperty.prototype.clearEasingFn = function clearEasingFn() {
		var easing = void 0;

		easing = this.easingNames.shift();
		while (easing) {
			delete $.easing[easing];
			easing = this.easingNames.shift();
		}
		this.easingNames = [];
	};

	/**
  * Generate a new absolute value maker.
  *
  * function to avoid JS Hint error "Don't make functions within a loop"
  */


	AniProperty.generateAbsoluteValMaker = function generateAbsoluteValMaker(prevValue, propName, sign) {
		var prev = prevValue;

		return function absoluteValMaker(match) {
			if (!prev || prev === "auto") {
				// Empty strings, null, undefined and "auto" are converted to 0.
				// This solution is somewhat extracted from jQuery Tween.propHooks._default.get
				// TODO: Should we consider adopting a Tween.propHooks?
				prev = 0;
			} else {
				prev = parseFloat(prev);
			}
			return prev + match * sign;
		};
	};

	return AniProperty;
}();

exports["default"] = AniProperty;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathUtil = function () {
	function MathUtil() {
		_classCallCheck(this, MathUtil);
	}

	MathUtil.interpolateNumber = function interpolateNumber(a, b) {
		var numA = +a;
		var numB = +b;

		return function (t) {
			return numA * (1 - t) + numB * t;
		};
	};

	MathUtil.uninterpolateNumber = function uninterpolateNumber(a, b) {
		var numA = +a;
		var numB = b - numA;

		numB = numB || 1 / numB;

		return function (x) {
			return (x - numA) / numB;
		};
	};

	// Adopt linear scale from d3


	MathUtil.scaler = function scaler(domain, range) {
		var u = MathUtil.uninterpolateNumber(domain[0], domain[1]);
		var i = MathUtil.interpolateNumber(range[0], range[1]);

		return function (x) {
			return i(u(x));
		};
	};

	return MathUtil;
}();

exports["default"] = MathUtil;
module.exports = exports["default"];

/***/ })
/******/ ]);
});