(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TWEEN"] = factory();
	else
		root["TWEEN"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(4);

var _Easing = __webpack_require__(1);

var _Easing2 = _interopRequireDefault(_Easing);

var _Interpolation = __webpack_require__(2);

var _Interpolation2 = _interopRequireDefault(_Interpolation);

var _clone = __webpack_require__(6);

var _clone2 = _interopRequireDefault(_clone);

var _joinToString = __webpack_require__(13);

var _joinToString2 = _interopRequireDefault(_joinToString);

var _toNumber = __webpack_require__(14);

var _toNumber2 = _interopRequireDefault(_toNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Credits:
// @jkroso for string parse library
// Optimized, Extended by @dalisoft
var Number_Match_RegEx = /\s+|([A-Za-z?().,{}:""\[\]#]+)|([-+\/*%]+=)?([-+*\/%]+)?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/gi;

var Tween = function () {
	function Tween() {
		var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var instate = arguments[1];

		_classCallCheck(this, Tween);

		this.object = object;
		this._valuesStart = Tween.createEmptyConst(object);
		this._valuesEnd = Tween.createEmptyConst(object);
		this._chainedTweens = [];

		this._duration = 1000;
		this._easingFunction = _Easing2.default.Linear.None;
		this._interpolationFunction = _Interpolation2.default.None;

		this._startTime = 0;
		this._delayTime = 0;
		this._repeat = 0;
		this._r = 0;
		this._isPlaying = false;
		this._yoyo = false;
		this._reversed = false;

		this._onStartCallbackFired = false;
		this._events = {};
		this._pausedTime = 0;

		if (instate && instate.to) {

			return new Tween(object).to(instate.to, instate);
		}

		return this;
	}

	_createClass(Tween, [{
		key: 'isPlaying',
		value: function isPlaying() {
			return this._isPlaying;
		}
	}, {
		key: 'isStarted',
		value: function isStarted() {
			return this._onStartCallbackFired;
		}
	}, {
		key: 'reverse',
		value: function reverse() {
			var _reversed = this._reversed;


			this._reversed = !_reversed;

			return this;
		}
	}, {
		key: 'reversed',
		value: function reversed() {
			return this._reversed;
		}
	}, {
		key: 'off',
		value: function off(name, fn) {
			if (this._events[name] === undefined) {
				return this;
			}
			if (name !== undefined && fn !== undefined) {
				var eventsList = this._events[name],
				    i = 0;
				while (i < eventsList.length) {
					if (eventsList[i] === fn) {
						eventsList.splice(i, 1);
					}
					i++;
				}
			} else if (name !== undefined && fn === undefined) {
				this._events[name] = [];
			}
			return this;
		}
	}, {
		key: 'on',
		value: function on(name, fn) {
			if (this._events[name] === undefined) {
				this._events[name] = [];
			}
			this._events[name].push(fn);
			return this;
		}
	}, {
		key: 'once',
		value: function once(name, fn) {
			var _this = this;

			if (this._events[name] === undefined) {
				this._events[name] = [];
			}
			return this.on(name, function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				fn.call.apply(fn, [_this].concat(args));
				_this.off(name);
			});
		}
	}, {
		key: 'emit',
		value: function emit(name, a, b, c, d, e) {
			var _events = this._events;


			var eventFn = _events[name];

			if (!eventFn) {
				return this;
			}

			var i = eventFn.length;
			while (i--) {
				eventFn[i].call(this, a, b, c, d, e);
			}
			return this;
		}
	}, {
		key: 'pause',
		value: function pause() {

			if (!this._isPlaying) {
				return this;
			}

			this._isPlaying = false;

			(0, _core.remove)(this);
			this._pausedTime = (0, _core.now)();

			return this.emit('pause', this.object);
		}
	}, {
		key: 'play',
		value: function play() {

			if (this._isPlaying) {
				return this;
			}

			this._isPlaying = true;

			this._startTime += (0, _core.now)() - this._pausedTime;
			(0, _core.add)(this);
			this._pausedTime = (0, _core.now)();

			return this.emit('play', this.object);
		}
	}, {
		key: 'restart',
		value: function restart(noDelay) {

			this._repeat = this._r;
			this._startTime = (0, _core.now)() + (noDelay ? 0 : this._delayTime);

			if (!this._isPlaying) {
				(0, _core.add)(this);
			}

			return this.emit('restart', this._object);
		}
	}, {
		key: 'seek',
		value: function seek(time, keepPlaying) {

			this._startTime = (0, _core.now)() + Math.max(0, Math.min(time, this._duration));

			this.emit('seek', time, this._object);

			return keepPlaying ? this : this.pause();
		}
	}, {
		key: 'duration',
		value: function duration(amount) {

			this._duration = typeof amount === "function" ? amount(this._duration) : amount;

			return this;
		}
	}, {
		key: 'to',
		value: function to() {
			var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;


			if (typeof properties === "number") {
				var _vE = {
					Number: properties
				};
				this._valuesEnd = _vE;
			} else {
				this._valuesEnd = properties;
			}

			if (typeof duration === "number") {
				this._duration = typeof duration === "function" ? duration(this._duration) : duration;
			} else if ((typeof duration === 'undefined' ? 'undefined' : _typeof(duration)) === "object") {
				for (var prop in duration) {
					if (this[prop]) {
						this[prop](typeof duration[prop] === "function" ? duration[prop](this._duration) : duration);
					}
				}
			}

			return this;
		}
	}, {
		key: 'start',
		value: function start(time) {
			var _startTime = this._startTime,
			    _delayTime = this._delayTime,
			    _valuesEnd = this._valuesEnd,
			    _valuesStart = this._valuesStart,
			    object = this.object;


			_startTime = time !== undefined ? time : (0, _core.now)();
			_startTime += _delayTime;

			this._startTime = _startTime;

			for (var property in _valuesEnd) {

				if (_typeof(_valuesEnd[property]) === "object") {
					if (Array.isArray(_valuesEnd[property])) {
						if (typeof object[property] === "number") {
							this._valuesEnd[property] = [object[property]].concat(_valuesEnd[property]);
						} else {
							var clonedTween = (0, _clone2.default)(this, {
								object: object[property],
								_valuesEnd: _valuesEnd[property],
								_events: {}
							}).start().stop();

							this._valuesEnd[property] = clonedTween;
						}
					} else {
						var _clonedTween = (0, _clone2.default)(this, {
							object: object[property],
							_valuesEnd: _valuesEnd[property],
							_events: {}
						}).start().stop();

						this._valuesStart[property] = 1;
						this._valuesEnd[property] = _clonedTween;
					}
				} else if (typeof _valuesEnd[property] === "string" && typeof object[property] === "string" && Number_Match_RegEx.test(object[property]) && Number_Match_RegEx.test(_valuesEnd[property])) {

					var __get__Start = object[property].match(Number_Match_RegEx);
					__get__Start = __get__Start.map(_toNumber2.default);
					var __get__End = _valuesEnd[property].match(Number_Match_RegEx);
					__get__End = __get__End.map(_toNumber2.default);
					var _clonedTween2 = (0, _clone2.default)(this, {
						object: __get__Start,
						_valuesEnd: __get__End,
						_events: {}
					}).start().stop();

					_clonedTween2.join = true; // For string tweening
					this._valuesStart[property] = 1;
					this._valuesEnd[property] = _clonedTween2;
				}

				// If value presented as function,
				// we should convert to value again by passing function
				if (typeof object[property] === "function") {
					object[property] = this.object[property] = object[property](this);
				}

				if (typeof _valuesEnd[property] === "function") {
					this._valuesEnd[property] = _valuesEnd[property](this);
				}

				// If `to()` specifies a property that doesn't exist in the source object,
				// we should not set that property in the object
				if (Tween.checkValidness(object[property]) === false) {
					continue;
				}

				// If duplicate or non-tweening numerics matched,
				// we should skip from adding to _valuesStart
				if (object[property] === _valuesEnd[property]) {
					continue;
				}

				this._valuesStart[property] = object[property];
			}

			(0, _core.add)(this);

			this._isPlaying = true;

			return this;
		}
	}, {
		key: 'stop',
		value: function stop() {
			var _isPlaying = this._isPlaying,
			    object = this.object;


			if (!_isPlaying) {
				return this;
			}

			(0, _core.remove)(this);
			this._isPlaying = false;

			this.stopChainedTweens();
			return this.emit('stop', object);
		}
	}, {
		key: 'end',
		value: function end() {
			var _startTime = this._startTime,
			    _duration = this._duration;


			return this.update(_startTime + _duration);
		}
	}, {
		key: 'stopChainedTweens',
		value: function stopChainedTweens() {
			var _chainedTweens = this._chainedTweens;


			_chainedTweens.map(function (item) {
				return item.stop();
			});

			return this;
		}
	}, {
		key: 'delay',
		value: function delay(amount) {

			this._delayTime = typeof amount === "function" ? amount(this._delayTime) : amount;

			return this;
		}
	}, {
		key: 'repeat',
		value: function repeat(amount) {

			this._repeat = typeof amount === "function" ? amount(this._repeat) : amount;
			this._r = this._repeat;

			return this;
		}
	}, {
		key: 'repeatDelay',
		value: function repeatDelay(amount) {

			this._repeatDelayTime = typeof amount === "function" ? amount(this._repeatDelayTime) : amount;

			return this;
		}
	}, {
		key: 'reverseDelay',
		value: function reverseDelay(amount) {

			this._reverseDelayTime = typeof amount === "function" ? amount(this._reverseDelayTime) : amount;

			return this;
		}
	}, {
		key: 'yoyo',
		value: function yoyo(state) {

			this._yoyo = typeof state === "function" ? state(this._yoyo) : state;

			return this;
		}
	}, {
		key: 'easing',
		value: function easing(fn) {

			this._easingFunction = fn;

			return this;
		}
	}, {
		key: 'interpolation',
		value: function interpolation(fn) {

			this._interpolationFunction = fn;

			return this;
		}
	}, {
		key: 'chain',
		value: function chain() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			this._chainedTweens = args;

			return this;
		}
	}, {
		key: 'get',
		value: function get(time) {
			this.update(time);
			return this.object;
		}
	}, {
		key: 'update',
		value: function update(time) {
			var _onStartCallbackFired = this._onStartCallbackFired,
			    _chainedTweens = this._chainedTweens,
			    _easingFunction = this._easingFunction,
			    _interpolationFunction = this._interpolationFunction,
			    _repeat = this._repeat,
			    _repeatDelayTime = this._repeatDelayTime,
			    _reverseDelayTime = this._reverseDelayTime,
			    _delayTime = this._delayTime,
			    _yoyo = this._yoyo,
			    _reversed = this._reversed,
			    _startTime = this._startTime,
			    _duration = this._duration,
			    _valuesStart = this._valuesStart,
			    _valuesEnd = this._valuesEnd,
			    object = this.object;


			var property = void 0;
			var elapsed = void 0;
			var value = void 0;

			time = time !== undefined ? time : (0, _core.now)();

			if (time < _startTime) {
				return true;
			}

			if (!_onStartCallbackFired) {

				this.emit('start', object);

				this._onStartCallbackFired = true;
			}

			elapsed = (time - _startTime) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;
			elapsed = _reversed ? 1 - elapsed : elapsed;

			value = _easingFunction(elapsed);

			for (property in _valuesEnd) {

				// Don't update properties that do not exist in the source object
				if (_valuesStart[property] === undefined) {
					continue;
				}

				var start = _valuesStart[property];
				var end = _valuesEnd[property];

				if (end instanceof Tween) {

					var getValue = end.get(time);

					if (end.join) {

						object[property] = (0, _joinToString2.default)(getValue);
					} else {

						object[property] = getValue;
					}
				} else if (Array.isArray(end)) {

					object[property] = _interpolationFunction(end, value);
				} else if (typeof end === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}

					// Protect against non numeric properties.
					if (typeof end === 'number') {
						object[property] = start + (end - start) * value;
					}
				} else if (typeof end === 'number') {
					object[property] = start + (end - start) * value;
				}
			}

			this.emit('update', object, value, elapsed);

			if (elapsed === 1 || _reversed && elapsed === 0) {

				if (_repeat) {

					if (isFinite(_repeat)) {
						this._repeat--;
					}

					for (property in _valuesEnd) {

						if (typeof _valuesEnd[property] === 'string' && typeof _valuesStart[property] === 'number') {
							this._valuesStart[property] = _valuesStart[property] + parseFloat(_valuesEnd[property]);
						}
					}

					// Reassign starting values, restart by making startTime = now
					this.emit(_reversed ? 'reverse' : 'repeat', object);

					if (_yoyo) {
						this._reversed = !_reversed;
					}

					if (!_reversed && _repeatDelayTime) {
						this._startTime += _duration + _repeatDelayTime;
					} else if (_reversed && _reverseDelayTime) {
						this._startTime += _duration + _reverseDelayTime;
					} else {
						this._startTime += _duration;
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
	}], [{
		key: 'createEmptyConst',
		value: function createEmptyConst(oldObject) {
			return typeof oldObject === "number" ? 0 : Array.isArray(oldObject) ? [] : (typeof oldObject === 'undefined' ? 'undefined' : _typeof(oldObject)) === "object" ? {} : '';
		}
	}, {
		key: 'checkValidness',
		value: function checkValidness(valid) {
			return valid !== undefined && valid !== null && valid !== '' && valid !== NaN && valid !== Infinity;
		}
	}]);

	return Tween;
}();

exports.default = Tween;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Easing = {

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

			return 1 - Easing.Bounce.Out(1 - k);
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
				return Easing.Bounce.In(k * 2) * 0.5;
			}

			return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
		}
	},

	Stepped: function Stepped(steps) {
		return function (k) {
			return Math.floor(k * steps) / steps;
		};
	},
	Noisy: function Noisy(randomProportion, easingFunction) {
		var normalProportion = 1.0 - randomProportion;
		return function (k) {
			return randomProportion * Math.random() + normalProportion * easingFunction(k);
		};
	},


	// Credits:
	// @michaelvillar for dynamics.js easing/physics
	// Adapted by @dalisoft
	get bezier() {
		var b, d;
		b = function b(_b, d, g, f, h) {
			var k = Math.pow(1 - _b, 3),
			    l = 3 * Math.pow(1 - _b, 2) * _b,
			    m = 3 * (1 - _b) * Math.pow(_b, 2);
			_b = Math.pow(_b, 3);
			return {
				x: k * d.x + l * g.x + m * f.x + _b * h.x,
				y: k * d.y + l * g.y + m * f.y + _b * h.y
			};
		};
		d = function d(b, _d) {
			var g,
			    f,
			    h = 0,
			    k = 0,
			    l = _d.length,
			    m = 0,
			    q = 1,
			    w = (q + m) / 2;
			for (g = null; k < l;) {
				f = _d[k];
				b >= f(0).x && b <= f(1).x && (g = f);
				if (null !== g) break;
				k++;
			}
			if (!g) return 1;
			for (f = g(w).x; 1E-4 < Math.abs(b - f) && 100 > h;) {
				b > f ? m = w : q = w, w = (q + m) / 2, f = g(w).x, h++;
			}return g(w).y;
		};
		return function (c) {
			null == c && (c = {});
			var e = c.points,
			    g = function () {
				var c,
				    d = 0,
				    k = e.length;
				g = [];
				for (c = function c(d, _c) {
					return g.push(function (e) {
						return b(e, d, d.cp[d.cp.length - 1], _c.cp[0], _c);
					});
				}; d < k && !(d >= e.length - 1);) {
					c(e[d], e[d + 1]), d++;
				}return g;
			}();
			return function (b) {
				return d(b, g);
			};
		};
	},
	easeInOut: function easeInOut(b) {
		var d, c;
		null == b && (b = {});
		d = null != (c = b.friction) ? c : Easing.easeInOut.defaults.friction;
		return Easing.bezier({
			points: [{
				x: 0,
				y: 0,
				cp: [{
					x: .92 - d / 1E3,
					y: 0
				}]
			}, {
				x: 1,
				y: 1,
				cp: [{
					x: .08 + d / 1E3,
					y: 1
				}]
			}]
		});
	},
	easeIn: function easeIn(b) {
		var d, c;
		null == b && (b = {});
		d = null != (c = b.friction) ? c : Easing.easeIn.defaults.friction;
		return Easing.bezier({
			points: [{
				x: 0,
				y: 0,
				cp: [{
					x: .92 - d / 1E3,
					y: 0
				}]
			}, {
				x: 1,
				y: 1,
				cp: [{
					x: 1,
					y: 1
				}]
			}]
		});
	},
	easeOut: function easeOut(b) {
		var d, c;
		null == b && (b = {});
		d = null != (c = b.friction) ? c : Easing.easeOut.defaults.friction;
		return Easing.bezier({
			points: [{
				x: 0,
				y: 0,
				cp: [{
					x: 0,
					y: 0
				}]
			}, {
				x: 1,
				y: 1,
				cp: [{
					x: .08 + d / 1E3,
					y: 1
				}]
			}]
		});
	},
	spring: function spring(b) {
		var d, c, e, g, f;
		null == b && (b = {});
		Tools.extend(b, Easing.spring.defaults, true);
		e = Math.max(1, b.frequency / 20);
		g = Math.pow(20, b.friction / 100);
		f = b.anticipationSize / 1E3;
		d = function d(_d2) {
			var c, e;
			e = f / (1 - f);
			c = (e - 0) / (e - 0);
			return (.8 - c) / e * _d2 * b.anticipationStrength / 100 + c;
		};
		c = function c(b) {
			return Math.pow(g / 10, -b) * (1 - b);
		};
		return function (b) {
			var g, l, m, q;
			q = b / (1 - f) - f / (1 - f);
			b < f ? (m = f / (1 - f) - f / (1 - f), g = 0 / (1 - f) - f / (1 - f), m = Math.acos(1 / d(m)), l = (Math.acos(1 / d(g)) - m) / (e * -f), g = d) : (g = c, m = 0, l = 1);
			return 1 - g(q) * Math.cos(e * (b - f) * l + m);
		};
	},
	bounce: function bounce(b) {
		var d, c, e, g;
		null == b && (b = {});
		Tools.extend(b, Easing.bounce.defaults);
		e = Math.max(1, b.frequency / 20);
		g = Math.pow(20, b.friction / 100);
		d = function d(b) {
			return Math.pow(g / 10, -b) * (1 - b);
		};
		c = function c(b) {
			return d(b) * Math.cos(e * b * 1 + -1.57);
		};
		c.initialForce = !0;
		return c;
	},
	gravity: function gravity(b) {
		var d, c, e, g, f, h;
		null == b && (b = {});
		Tools.extend(b, Easing.gravity.defaults);
		c = Math.min(b.bounciness / 1250, .8);
		g = b.elasticity / 1E3;
		e = [];
		d = function () {
			var e;
			e = Math.sqrt(.02);
			e = {
				a: -e,
				b: e,
				H: 1
			};
			b.initialForce && (e.a = 0, e.b *= 2);
			for (; .001 < e.H;) {
				d = e.b - e.a, e = {
					a: e.b,
					b: e.b + d * c,
					H: e.H * c * c
				};
			}return e.b;
		}();
		h = function h(c, e, f, g) {
			d = e - c;
			c = 2 / d * g - 1 - 2 * c / d;
			f = c * c * f - f + 1;
			b.initialForce && (f = 1 - f);
			return f;
		};
		(function () {
			var f, h, m;
			f = Math.sqrt(2 / (100 * d * d));
			h = {
				a: -f,
				b: f,
				H: 1
			};
			b.initialForce && (h.a = 0, h.b *= 2);
			e.push(h);
			for (m = []; 1 > h.b && .001 < h.H;) {
				f = h.b - h.a, h = {
					a: h.b,
					b: h.b + f * c,
					H: h.H * g
				}, m.push(e.push(h));
			}return m;
		})();
		f = function f(c) {
			var d, f;
			f = 0;
			for (d = e[f]; !(c >= d.a && c <= d.b) && (f += 1, d = e[f], d);) {}
			return d ? h(d.a, d.b, d.H, c) : b.initialForce ? 0 : 1;
		};
		f.initialForce = b.initialForce;
		return f;
	},
	forceWithGravity: function forceWithGravity(b) {
		null == b && (b = {});
		Tools.extend(b, Easing.forceWithGravity.defaults);
		b.initialForce = !0;
		return Easing.gravity(b);
	}
};

Easing.spring.defaults = {
	frequency: 300,
	friction: 200,
	anticipationSize: 0,
	anticipationStrength: 0
};
Easing.bounce.defaults = {
	frequency: 300,
	friction: 200
};
Easing.forceWithGravity.defaults = Easing.gravity.defaults = {
	bounciness: 400,
	elasticity: 200
};
Easing.easeInOut.defaults = Easing.easeIn.defaults = Easing.easeOut.defaults = {
	friction: 500
};

exports.default = Easing;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Interpolation = {
	Linear: function Linear(v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = Interpolation.Utils.Linear;

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
		var bn = Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;
	},
	CatmullRom: function CatmullRom(v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = Interpolation.Utils.CatmullRom;

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

			var fc = Interpolation.Utils.Factorial;

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

exports.default = Interpolation;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cache = {
	filter: {
		grayscale: 1,
		brightness: 1,
		sepia: 1,
		invert: 1,
		saturate: 1,
		contrast: 1,
		blur: 1,
		hueRotate: 1,
		dropShadow: 1
	},
	transform: {
		translate: 1,
		translateX: 1,
		translateY: 1,
		translateZ: 1,
		rotate: 1,
		rotateX: 1,
		rotateY: 1,
		rotateZ: 1,
		scale: 1,
		scaleX: 1,
		scaleY: 1,
		scaleZ: 1,
		skew: 1,
		skewX: 1,
		skewY: 1
	}
};

var Plugins = function () {
	function Plugins() {
		_classCallCheck(this, Plugins);
	}

	_createClass(Plugins, null, [{
		key: 'DOM',
		value: function DOM(Composite) {
			var layer = Composite.domNode,
			    style = layer.style;
			return {
				update: function update(Tween, RenderObject) {
					for (var p in RenderObject) {
						style[p] = RenderObject[p];
					}
				}
			};
		}
	}, {
		key: 'Transform',
		value: function Transform(Composite) {
			var layer = Composite.domNode,
			    style = layer.style;
			return {
				update: function update(Tween, RenderObject) {
					var transform = '';
					for (var p in RenderObject) {
						if (p === 'x' || p === 'y' || p === 'z') {
							transform += ' translate3d( ' + (RenderObject.x || '0px') + ', ' + (RenderObject.y || '0px') + ', ' + (RenderObject.z || '0px') + ')';
						} else if (cache.transform[p]) {
							transform += ' ' + p + '( ' + RenderObject[p] + ')';
						}
					}
					if (transform) {
						style.transform = transform;
					}
				}
			};
		}
	}, {
		key: 'Filter',
		value: function Filter(Composite) {
			var layer = Composite.domNode,
			    style = layer.style;
			return {
				update: function update(Tween, RenderObject) {
					var filter = '';
					for (var p in RenderObject) {
						if (cache.filter[p]) {
							filter += ' ' + p + '( ' + RenderObject[p] + ')';
						}
					}
					if (filter) {
						style.webkitFilter = style.filter = filter;
					}
				}
			};
		}
	}, {
		key: 'Scroll',
		value: function Scroll(Composite) {
			var layer = Composite.domNode;
			return {
				update: function update(Tween, RenderObject) {
					for (var p in RenderObject) {
						layer[p] = RenderObject[p];
					}
				}
			};
		}
	}]);

	return Plugins;
}();

exports.default = Plugins;
;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
// TWEEN.js
var _tweens = [];
var isStarted = false;
var _autoPlay = false;
var _tick = void 0;
var _events = {};
var root = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : undefined;

var getAll = function getAll() {
	return _tweens;
};

var autoPlay = function autoPlay(state) {
	_autoPlay = state;
};

var removeAll = function removeAll() {
	_tweens = [];
};

var emit = function emit(name, a, b, c, d, e) {
	var eventFn = _events[name];

	if (eventFn) {
		var i = eventFn.length;
		while (i--) {
			eventFn[i].call(undefined, a, b, c, d, e);
		}
	}
};

var off = function off(ev, fn) {
	if (ev === undefined || _events[ev] === undefined) {
		return;
	}
	if (fn !== undefined) {
		var eventsList = _events[name],
		    i = 0;
		while (i < eventsList.length) {
			if (eventsList[i] === fn) {
				eventsList.splice(i, 1);
			}
			i++;
		}
	} else {
		_events[name] = [];
	}
};

var add = function add(tween) {
	_tweens.push(tween);

	if (_autoPlay && !isStarted) {
		update();
		isStarted = true;
		emit('start');
	}
	emit('add', tween, _tweens);
};

var on = function on(ev, fn) {
	if (_events[ev] === undefined) {
		_events[ev] = [];
	}
	_events[ev].push(fn);
};

var once = function once(ev, fn) {
	if (_events[ev] === undefined) {
		_events[ev] = [];
	}
	on(ev, function () {
		fn.apply(undefined, arguments);
		off(ev);
	});
};

var remove = function remove(tween) {
	_tweens.filter(function (tweens) {
		return tweens !== tween;
	});
	var i = 0,
	    tweenFind = void 0;
	while (i < _tweens.length) {
		tweenFind = _tweens[i];
		if (tweenFind === tween) {
			emit('remove', tween, _tweens);
			_tweens.splice(i, 1);
		}
		i++;
	}
};

var now = function () {
	if (typeof process !== "undefined" && process.hrtime !== undefined) {
		return function () {
			var time = process.hrtime();

			// Convert [seconds, nanoseconds] to milliseconds.
			return time[0] * 1000 + time[1] / 1000000;
		};
	}
	// In a browser, use window.performance.now if it is available.
	else if (root.performance !== undefined && root.performance.now !== undefined) {

			// This must be bound, because directly assigning this function
			// leads to an invocation exception in Chrome.
			return root.performance.now.bind(root.performance);
		}
		// Use Date.now if it is available.
		else {
				var offset = root.performance && root.performance.timing && root.performance.timing.navigationStart ? root.performance.timing.navigationStart : Date.now();
				return function () {
					return Date.now() - offset;
				};
			}
}();

var update = function update(time, preserve) {

	time = time !== undefined ? time : now();

	if (_autoPlay) {
		_tick = requestAnimationFrame(update);
	}
	emit('update', time, _tweens);

	if (_tweens.length === 0) {

		isStarted = false;
		cancelAnimationFrame(_tick);
		emit('stop', time);
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
};

// Normalise time when visiblity is changed ...
if (root.document) {
	var doc = root.document,
	    timeDiff = 0,
	    timePause = 0;
	doc.addEventListener('visibilitychange', function (ev) {
		if (_tweens.length === 0) {
			return false;
		}
		if (document.hidden) {
			timePause = now();
		} else {
			timeDiff = now() - timePause;
			_tweens.map(function (tween) {
				return tween._startTime += timeDiff;
			});
		}
		return true;
	});
}

exports.getAll = getAll;
exports.removeAll = removeAll;
exports.remove = remove;
exports.add = add;
exports.now = now;
exports.update = update;
exports.autoPlay = autoPlay;
exports.on = on;
exports.once = once;
exports.off = off;
exports.emit = emit;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(12)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = cloneTween;

var _Tween = __webpack_require__(0);

var _Tween2 = _interopRequireDefault(_Tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneTween() {
	var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var Constructor_Ex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Tween2.default;

	var copyTween = new Constructor_Ex();
	for (var config in obj) {
		if (configs[config] !== undefined) {
			copyTween[config] = configs[config];
		} else {
			copyTween[config] = obj[config];
		}
	}
	return copyTween;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clone = __webpack_require__(6);

var _clone2 = _interopRequireDefault(_clone);

var _Plugins = __webpack_require__(3);

var _Plugins2 = _interopRequireDefault(_Plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Composite = function () {
			function Composite(domNode) {
						_classCallCheck(this, Composite);

						var self = this;

						this.domNode = domNode;
						this.plugins = {};
						var pluginList = this.plugins;

						this.render = function (object) {

									for (var p in pluginList) {

												pluginList[p] && pluginList[p].update && pluginList[p].update(this, object);
									}

									return this;
						};

						this.fetch = function () {

									if (Object.keys(this.object).length) {

												return this;
									}

									for (var p in pluginList) {

												pluginList[p] && pluginList[p].fetch && pluginList[p].fetch(this);
									}

									return this;
						};

						this.init = function (object) {

									for (var p in pluginList) {

												pluginList[p] && pluginList[p].init && pluginList[p].init(this, object);
									}

									return this;
						};

						return this;
			}

			_createClass(Composite, [{
						key: 'applyPlugin',
						value: function applyPlugin(name) {
									if (_Plugins2.default[name] !== undefined) {
												this.plugins[name] = _Plugins2.default[name](this);
									}
									return this;
						}
			}, {
						key: 'cloneLayer',
						value: function cloneLayer() {
									return (0, _clone2.default)(this, {}, Composite);
						}
			}, {
						key: 'appendTo',
						value: function appendTo(node) {
									node.appendChild(this.domNode);
									return this;
						}
			}, {
						key: 'object',
						set: function set(obj) {
									return this.render(obj);
						}
			}]);

			return Composite;
}();

exports.default = Composite;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tween = __webpack_require__(0);

var _Tween2 = _interopRequireDefault(_Tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timeline = function () {
	function Timeline() {
		_classCallCheck(this, Timeline);

		this._private = {
			tweens: [],
			fullTime: 0
		};
		return this;
	}

	_createClass(Timeline, [{
		key: "add",
		value: function add(tween) {
			var _this = this;

			if (tween instanceof _Tween2.default) {
				this._private.tweens.push(tween);
			} else if (!Array.isArray(tween) && (typeof tween === "undefined" ? "undefined" : _typeof(tween)) === "object") {
				var tweenExample = new _Tween2.default({ x: 0 });
				for (var p in tween) {
					tweenExample[p](tween[p]);
				}
				this.add(tweenExample);
			} else if ((typeof tween === "undefined" ? "undefined" : _typeof(tween)) === "object") {
				tween.map(function (add) {
					_this.add(add);
				});
			}
			return this;
		}
	}, {
		key: "start",
		value: function start() {
			var _this2 = this;

			this._private.tweens.map(function (tween) {
				tween.start(_this2._private.fullTime);
			});
			this._private.fullTime = Math.max.apply(0, this._private.tweens.reduce(function (prev, curr) {
				return curr._duration > prev ? curr._duration : prev;
			}, 0));
			return this;
		}
	}]);

	return Timeline;
}();

exports.default = Timeline;
;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (Array.isArray === undefined) {
	Array.isArray = function (arrayLike) {
		return arrayLike !== undefined && (typeof arrayLike === "undefined" ? "undefined" : _typeof(arrayLike)) === "object" && arrayLike.length && arrayLike.push !== undefined && arrayLike.splice !== undefined;
	};
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (Object.assign === undefined) {
	Object.assign = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var first = args.shift();
		args.map(function (obj) {
			for (var p in obj) {
				first[p] = obj[p];
			}
		});
		return first;
	};
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var ROOT = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : undefined;
var _vendor = ['webkit', 'moz', 'ms', 'o'];
var animFrame = 'AnimationFrame';
var rafSuffixForVendor = 'Request' + animFrame;
var cafSuffixForVendor = 'Cancel' + animFrame;
var cafSuffixForVendor2 = 'CancelRequest' + animFrame;
var _timeout = setTimeout;
var _clearTimeout = clearTimeout;

if (ROOT.requestAnimationFrame === undefined) {

	var _raf = void 0,
	    now = void 0,
	    lastTime = Date.now(),
	    frameMs = 50 / 3,
	    fpsSec = frameMs;

	_vendor.map(function (vendor) {
		if ((_raf = ROOT[vendor + rafSuffixForVendor]) === undefined) {
			_raf = function _raf(fn) {
				return _timeout(function () {
					now = Date.now();
					fn(now - lastTime);
					fpsSec = frameMs + (Date.now() - now);
				}, fpsSec);
			};
		}
	});

	if (_raf !== undefined) {
		ROOT.requestAnimationFrame = _raf;
	}
}

if (ROOT.cancelAnimationFrame === undefined && (ROOT.cancelAnimationFrame = ROOT.cancelRequestAnimationFrame) === undefined) {
	var _caf = void 0;

	_vendor.map(function (vendor) {
		if ((_caf = ROOT[vendor + cafSuffixForVendor]) === undefined && (_caf = ROOT[vendor + cafSuffixForVendor2]) === undefined) {
			_caf = function _caf(fn) {
				return _clearTimeout(fn);
			};
		}
	});

	if (_caf !== undefined) {
		ROOT.cancelAnimationFrame = _caf;
	}
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = joinToString;
function joinToString(__array__like) {
	var str = '';
	for (var i = 0, len = __array__like.length; i < len; i++) {
		str += __array__like[i];
	}
	return str;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = toNumber;
function toNumber(val) {
	var floatedVal = parseFloat(val);
	return typeof floatedVal === "number" && !isNaN(floatedVal) ? floatedVal : val;
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugins = exports.Timeline = exports.Composite = exports.Interpolation = exports.Easing = exports.Tween = exports.emit = exports.off = exports.once = exports.on = exports.autoPlay = exports.update = exports.now = exports.add = exports.remove = exports.removeAll = exports.getAll = undefined;

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(9);

var _core = __webpack_require__(4);

var _Easing = __webpack_require__(1);

var _Easing2 = _interopRequireDefault(_Easing);

var _Tween = __webpack_require__(0);

var _Tween2 = _interopRequireDefault(_Tween);

var _Interpolation = __webpack_require__(2);

var _Interpolation2 = _interopRequireDefault(_Interpolation);

var _Composite = __webpack_require__(7);

var _Composite2 = _interopRequireDefault(_Composite);

var _Timeline = __webpack_require__(8);

var _Timeline2 = _interopRequireDefault(_Timeline);

var _Plugins = __webpack_require__(3);

var _Plugins2 = _interopRequireDefault(_Plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getAll = _core.getAll;
exports.removeAll = _core.removeAll;
exports.remove = _core.remove;
exports.add = _core.add;
exports.now = _core.now;
exports.update = _core.update;
exports.autoPlay = _core.autoPlay;
exports.on = _core.on;
exports.once = _core.once;
exports.off = _core.off;
exports.emit = _core.emit;
exports.Tween = _Tween2.default;
exports.Easing = _Easing2.default;
exports.Interpolation = _Interpolation2.default;
exports.Composite = _Composite2.default;
exports.Timeline = _Timeline2.default;
exports.Plugins = _Plugins2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=Tween.js.map