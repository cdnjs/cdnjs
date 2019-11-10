(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TWEEN.js
var _tweens = [];
var _time = 0;
var isStarted = false;
var _autoPlay = false;
var _tick = void 0;

var autoStart = function autoStart(time) {
		if (TWEEN.update(_time)) {
				_time = time;
				_tick = requestAnimationFrame(autoStart);
		} else {
				isStarted = false;
				cancelAnimationFrame(_tick);
		}
};

var TWEEN = function () {
		function TWEEN() {
				_classCallCheck(this, TWEEN);
		}

		_createClass(TWEEN, null, [{
				key: "getAll",
				value: function getAll() {
						return _tweens;
				}
		}, {
				key: "autoPlay",
				value: function autoPlay(state) {
						_autoPlay = state;
				}
		}, {
				key: "removeAll",
				value: function removeAll() {
						_tweens = [];
				}
		}, {
				key: "add",
				value: function add(tween) {
						_tweens.push(tween);

						if (_autoPlay && !isStarted) {
								autoStart(TWEEN.now());
								isStarted = true;
						}
				}
		}, {
				key: "remove",
				value: function remove(tween) {
						_tweens.filter(function (tweens) {
								return tweens !== tween;
						});
				}
		}, {
				key: "now",
				value: function now() {
						return _time;
				}
		}, {
				key: "update",
				value: function update(time, preserve) {

						time = time !== undefined ? time : TWEEN.now();

						_time = time;

						if (_tweens.length === 0) {

								return false;
						}

						var i = 0;

						while (i < _tweens.length) {

								if (_tweens[i].update(time) || preserve) {
										i++;
								} else {
										_tweens.splice(i, 1);
								}
						}

						return true;
				}
		}]);

		return TWEEN;
}();

// TWEEN.Tween.js


TWEEN.Tween = function () {
		function _class() {
				var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				_classCallCheck(this, _class);

				this.object = object;
				this._valuesStart = Object.assign({}, object);
				this._valuesStartRepeat = Object.assign({}, object);
				this._valuesEnd = {};
				this._chainedTweens = [];

				this._duration = 1000;
				this._easingFunction = TWEEN.Easing.Linear.None;
				this._interpolationFunction = TWEEN.Interpolation.None;

				this._startTime = null;
				this._delayTime = 0;
				this._repeat = 0;
				this._repeatDelayTime = 0;
				this._isPlaying = false;
				this._yoyo = false;
				this._reversed = false;

				this._onStartCallbackFired = false;
				this._events = new Map();
				this._pausedTime = 0;

				return this;
		}

		_createClass(_class, [{
				key: "emit",
				value: function emit(name, fn, a2, a3, a4) {

						if (name !== undefined && typeof fn === "function") {
								this._events.set(name, fn);
						} else if (typeof fn !== "function" && this._events.get(name) !== undefined) {
								this._events.get(name).call(this, fn, a2, a3, a4);
						}
						return this;
				}
		}, {
				key: "pause",
				value: function pause() {

						if (!this._isPlaying) {
								return this;
						}

						this._isPlaying = false;

						TWEEN.remove(this);
						this._pausedTime = TWEEN.now();

						return this.emit('pause', this.object);
				}
		}, {
				key: "play",
				value: function play() {

						if (this._isPlaying) {
								return this;
						}

						this._isPlaying = true;

						this._startTime += TWEEN.now() - this._pausedTime;
						TWEEN.add(this);
						this._pausedTime = TWEEN.now();

						return this.emit('play', this.object);
				}
		}, {
				key: "duration",
				value: function duration(amount) {

						this._duration = amount;

						return this;
				}
		}, {
				key: "to",
				value: function to() {
						var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
						var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;


						this._valuesEnd = properties;
						this._duration = duration;

						return this;
				}
		}, {
				key: "start",
				value: function start(time) {
						var _startTime = this._startTime,
						    _delayTime = this._delayTime;


						_startTime = time !== undefined ? time : TWEEN.now();
						_startTime += _delayTime;

						this._startTime = _startTime;

						TWEEN.add(this);

						this._isPlaying = true;

						return this;
				}
		}, {
				key: "stop",
				value: function stop() {
						var _isPlaying = this._isPlaying,
						    _onStopCallback = this._onStopCallback,
						    object = this.object;


						if (!_isPlaying) {
								return this;
						}

						TWEEN.remove(this);
						this._isPlaying = false;

						this.stopChainedTweens();
						return this.emit('stop', object);
				}
		}, {
				key: "end",
				value: function end() {
						var _startTime = this._startTime,
						    _duration = this._duration;


						return this.update(_startTime + _duration);
				}
		}, {
				key: "stopChainedTweens",
				value: function stopChainedTweens() {
						var _chainedTweens = this._chainedTweens;


						_chainedTweens.map(function (item) {
								return item.stop();
						});

						return this;
				}
		}, {
				key: "delay",
				value: function delay(amount) {

						this._delayTime = amount;

						return this;
				}
		}, {
				key: "repeat",
				value: function repeat(times) {

						this._repeat = times;

						return this;
				}
		}, {
				key: "repeatDelay",
				value: function repeatDelay(amount) {

						this._repeatDelayTime = amount;

						return this;
				}
		}, {
				key: "yoyo",
				value: function yoyo(state) {

						this._yoyo = state;

						return this;
				}
		}, {
				key: "easing",
				value: function easing(fn) {

						this._easingFunction = fn;

						return this;
				}
		}, {
				key: "interpolation",
				value: function interpolation(fn) {

						this._interpolationFunction = fn;

						return this;
				}
		}, {
				key: "chain",
				value: function chain() {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
								args[_key] = arguments[_key];
						}

						this._chainedTweens = args;

						return this;
				}
		}, {
				key: "update",
				value: function update(time) {
						var _onUpdateCallback = this._onUpdateCallback,
						    _onStartCallback = this._onStartCallback,
						    _onStartCallbackFired = this._onStartCallbackFired,
						    _onCompleteCallback = this._onCompleteCallback,
						    _chainedTweens = this._chainedTweens,
						    _easingFunction = this._easingFunction,
						    _interpolationFunction = this._interpolationFunction,
						    _repeat = this._repeat,
						    _repeatDelayTime = this._repeatDelayTime,
						    _delayTime = this._delayTime,
						    _yoyo = this._yoyo,
						    _reversed = this._reversed,
						    _startTime = this._startTime,
						    _duration = this._duration,
						    _valuesStart = this._valuesStart,
						    _valuesStartRepeat = this._valuesStartRepeat,
						    _valuesEnd = this._valuesEnd,
						    object = this.object;


						var property = void 0;
						var elapsed = void 0;
						var value = void 0;

						if (time < _startTime) {
								return true;
						}

						if (_onStartCallbackFired === false) {

								this.emit('start', object);

								this._onStartCallbackFired = true;
						}

						elapsed = (time - _startTime) / _duration;
						elapsed = elapsed > 1 ? 1 : elapsed;

						value = _easingFunction(elapsed);

						for (property in _valuesEnd) {

								var start = _valuesStart[property];
								var end = _valuesEnd[property];

								if (end instanceof Array) {

										object[property] = _interpolationFunction(end, value);
								} else {

										// Parses relative end values with start as base (e.g.: +10, -3)
										if (typeof end === 'string') {

												if (end.charAt(0) === '+' || end.charAt(0) === '-') {
														end = start + parseFloat(end);
												} else {
														end = parseFloat(end);
												}
										}

										// Protect against non numeric properties.
										if (typeof end === 'number') {
												object[property] = start + (end - start) * value;
										}
								}
						}

						this.emit('update', object, elapsed);

						if (elapsed === 1) {

								if (_repeat > 0) {

										if (isFinite(_repeat)) {
												_repeat--;
										}

										// Reassign starting values, restart by making startTime = now
										for (property in _valuesStartRepeat) {

												if (typeof _valuesEnd[property] === 'string') {
														_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property]);
												}

												if (_yoyo) {
														var tmp = _valuesStartRepeat[property];

														_valuesStartRepeat[property] = _valuesEnd[property];
														_valuesEnd[property] = tmp;
												}

												_valuesStart[property] = _valuesStartRepeat[property];
										}

										this.emit('repeat', object, _reversed);

										if (_yoyo) {
												this._reversed = !_reversed;
										}

										if (_repeatDelayTime) {
												this._startTime = time + _repeatDelayTime;
										} else {
												this._startTime = time + _delayTime;
										}

										return true;
								} else {

										this.emit('complete', object);

										_chainedTweens.map(function (tween) {
												return tween.start(_startTime + _duration);
										});

										return false;
								}
						}
						return true;
				}
		}]);

		return _class;
}();

TWEEN.Easing = {

		Linear: {
				None: function None(k) {

						return k;
				}
		},

		Quadratic: {
				In: function In(k) {

						return k * k;
				},
				Out: function Out(k) {

						return k * (2 - k);
				},
				InOut: function InOut(k) {

						if ((k *= 2) < 1) {
								return 0.5 * k * k;
						}

						return -0.5 * (--k * (k - 2) - 1);
				}
		},

		Cubic: {
				In: function In(k) {

						return k * k * k;
				},
				Out: function Out(k) {

						return --k * k * k + 1;
				},
				InOut: function InOut(k) {

						if ((k *= 2) < 1) {
								return 0.5 * k * k * k;
						}

						return 0.5 * ((k -= 2) * k * k + 2);
				}
		},

		Quartic: {
				In: function In(k) {

						return k * k * k * k;
				},
				Out: function Out(k) {

						return 1 - --k * k * k * k;
				},
				InOut: function InOut(k) {

						if ((k *= 2) < 1) {
								return 0.5 * k * k * k * k;
						}

						return -0.5 * ((k -= 2) * k * k * k - 2);
				}
		},

		Quintic: {
				In: function In(k) {

						return k * k * k * k * k;
				},
				Out: function Out(k) {

						return --k * k * k * k * k + 1;
				},
				InOut: function InOut(k) {

						if ((k *= 2) < 1) {
								return 0.5 * k * k * k * k * k;
						}

						return 0.5 * ((k -= 2) * k * k * k * k + 2);
				}
		},

		Sinusoidal: {
				In: function In(k) {

						return 1 - Math.cos(k * Math.PI / 2);
				},
				Out: function Out(k) {

						return Math.sin(k * Math.PI / 2);
				},
				InOut: function InOut(k) {

						return 0.5 * (1 - Math.cos(Math.PI * k));
				}
		},

		Exponential: {
				In: function In(k) {

						return k === 0 ? 0 : Math.pow(1024, k - 1);
				},
				Out: function Out(k) {

						return k === 1 ? 1 : 1 - Math.pow(-10 * k, 2);
				},
				InOut: function InOut(k) {

						if (k === 0) {
								return 0;
						}

						if (k === 1) {
								return 1;
						}

						if ((k *= 2) < 1) {
								return 0.5 * Math.pow(1024, k - 1);
						}

						return 0.5 * (-Math.pow(-10 * (k - 1), 2) + 2);
				}
		},

		Circular: {
				In: function In(k) {

						return 1 - Math.sqrt(1 - k * k);
				},
				Out: function Out(k) {

						return Math.sqrt(1 - --k * k);
				},
				InOut: function InOut(k) {

						if ((k *= 2) < 1) {
								return -0.5 * (Math.sqrt(1 - k * k) - 1);
						}

						return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
				}
		},

		Elastic: {
				In: function In(k) {

						if (k === 0) {
								return 0;
						}

						if (k === 1) {
								return 1;
						}

						return -Math.pow(10 * (k - 1), 2) * Math.sin((k - 1.1) * 5 * Math.PI);
				},
				Out: function Out(k) {

						if (k === 0) {
								return 0;
						}

						if (k === 1) {
								return 1;
						}

						return Math.pow(-10 * k, 2) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
				},
				InOut: function InOut(k) {

						if (k === 0) {
								return 0;
						}

						if (k === 1) {
								return 1;
						}

						k *= 2;

						if (k < 1) {
								return -0.5 * Math.pow(10 * (k - 1), 2) * Math.sin((k - 1.1) * 5 * Math.PI);
						}

						return 0.5 * Math.pow(-10 * (k - 1), 2) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
				}
		},

		Back: {
				In: function In(k) {

						var s = 1.70158;

						return k * k * ((s + 1) * k - s);
				},
				Out: function Out(k) {

						var s = 1.70158;

						return --k * k * ((s + 1) * k + s) + 1;
				},
				InOut: function InOut(k) {

						var s = 1.70158 * 1.525;

						if ((k *= 2) < 1) {
								return 0.5 * (k * k * ((s + 1) * k - s));
						}

						return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
				}
		},

		Bounce: {
				In: function In(k) {

						return 1 - TWEEN.Easing.Bounce.Out(1 - k);
				},
				Out: function Out(k) {

						if (k < 1 / 2.75) {
								return 7.5625 * k * k;
						} else if (k < 2 / 2.75) {
								return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
						} else if (k < 2.5 / 2.75) {
								return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
						} else {
								return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
						}
				},
				InOut: function InOut(k) {

						if (k < 0.5) {
								return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
						}

						return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
				}
		}

};

TWEEN.Interpolation = {
		Linear: function Linear(v, k) {

				var m = v.length - 1;
				var f = m * k;
				var i = Math.floor(f);
				var fn = TWEEN.Interpolation.Utils.Linear;

				if (k < 0) {
						return fn(v[0], v[1], f);
				}

				if (k > 1) {
						return fn(v[m], v[m - 1], m - f);
				}

				return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
		},
		Bezier: function Bezier(v, k) {

				var b = 0;
				var n = v.length - 1;
				var pw = Math.pow;
				var bn = TWEEN.Interpolation.Utils.Bernstein;

				for (var i = 0; i <= n; i++) {
						b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
				}

				return b;
		},
		CatmullRom: function CatmullRom(v, k) {

				var m = v.length - 1;
				var f = m * k;
				var i = Math.floor(f);
				var fn = TWEEN.Interpolation.Utils.CatmullRom;

				if (v[0] === v[m]) {

						if (k < 0) {
								i = Math.floor(f = m * (1 + k));
						}

						return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
				} else {

						if (k < 0) {
								return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
						}

						if (k > 1) {
								return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
						}

						return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
				}
		},


		Utils: {
				Linear: function Linear(p0, p1, t) {

						return (p1 - p0) * t + p0;
				},
				Bernstein: function Bernstein(n, i) {

						var fc = TWEEN.Interpolation.Utils.Factorial;

						return fc(n) / fc(i) / fc(n - i);
				},


				Factorial: function () {

						var a = [1];

						return function (n) {

								var s = 1;

								if (a[n]) {
										return a[n];
								}

								for (var i = n; i > 1; i--) {
										s *= i;
								}

								a[n] = s;
								return s;
						};
				}(),

				CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {

						var v0 = (p2 - p0) * 0.5;
						var v1 = (p3 - p1) * 0.5;
						var t2 = t * t;
						var t3 = t * t2;

						return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
				}
		}
};

// AMD/RequireJS
if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return TWEEN;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		// NodeJS
} else if (typeof module !== "undefined" && module.exports) {
		module.exports = TWEEN;
		// Browser
} else if (typeof window !== "undefined" && window.document) {
		window.TWEEN = TWEEN;
		// WebWorker
} else if (typeof self !== "undefined" && self.importScripts !== undefined) {
		self.TWEEN = TWEEN;
		// On somecase (on TV with QT (JS compiler) this worked)
} else if (typeof exports !== "undefined" && typeof global !== "undefined") {
		exports.TWEEN = Tween;
		// Else somewhere
} else if (typeof undefined !== "undefined") {
		undefined.TWEEN = TWEEN;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=Tween.js.map