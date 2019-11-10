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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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


	// Adapted from https://github.com/michaelvillar/dynamics.js
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// TWEEN.js
var _tweens = [];
var _time = 0;
var isStarted = false;
var _autoPlay = false;
var _tick = void 0;
var _events = {};

var getAll = function getAll() {
	return _tweens;
};

var autoPlay = function autoPlay(state) {
	_autoPlay = state;
};

var removeAll = function removeAll() {
	_tweens = [];
};

var emit = function emit(ev) {
	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	if (_events[ev] !== undefined) {
		_events[ev].map(function (event) {
			return event.apply(undefined, args);
		});
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
		autoStart(now());
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

var now = function now() {
	return _time;
};

var update = function update() {
	var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : now();
	var preserve = arguments[1];


	time = time !== undefined ? time : now();

	_time = time;

	emit('update', time, _tweens);

	if (_tweens.length === 0) {

		return false;
	}

	emit('realupdate', time, _tweens);

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

function autoStart(time) {
	if (update(_time)) {
		_time = time;
		_tick = requestAnimationFrame(autoStart);
		emit('autostart', time);
	} else {
		isStarted = false;
		cancelAnimationFrame(_tick);
		emit('stop', time);
	}
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(2);

var _Easing = __webpack_require__(0);

var _Easing2 = _interopRequireDefault(_Easing);

var _Interpolation = __webpack_require__(1);

var _Interpolation2 = _interopRequireDefault(_Interpolation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tween = function () {
	function Tween() {
		var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Tween);

		this.object = object;
		this._valuesStart = Tween.createEmptyConst(object);
		this._valuesStartRepeat = Tween.createEmptyConst(object);
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
			var _valuesStartRepeat = this._valuesStartRepeat,
			    _yoyo = this._yoyo,
			    _valuesEnd = this._valuesEnd,
			    _valuesStart = this._valuesStart;

			// Reassign starting values, restart by making startTime = now

			for (var property in _valuesStartRepeat) {

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

			this._reversed = !this._reversed;

			return this;
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
		value: function emit(name) {
			var _this2 = this;

			for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				args[_key2 - 1] = arguments[_key2];
			}

			if (this._events[name] === undefined) {
				return this;
			}
			this._events[name].map(function (event) {
				event.call.apply(event, [_this2].concat(args));
			});
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

			this._duration = amount;

			return this;
		}
	}, {
		key: 'to',
		value: function to() {
			var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;


			if (typeof properties === "number") {
				var _vE = { Number: properties };
				this._valuesEnd = _vE;
			} else {
				this._valuesEnd = properties;
			}

			if (typeof duration === "number") {
				this._duration = duration;
			} else if ((typeof duration === 'undefined' ? 'undefined' : _typeof(duration)) === "object") {
				for (var prop in duration) {
					this[prop](duration[prop]);
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
			    _valuesStartRepeat = this._valuesStartRepeat,
			    object = this.object;


			_startTime = time !== undefined ? time : (0, _core.now)();
			_startTime += _delayTime;

			this._startTime = _startTime;

			for (var property in _valuesEnd) {

				// Check if an Array was provided as property value
				if (typeof object[property] === "number" && _valuesEnd[property] instanceof Array) {

					if (_valuesEnd[property].length === 0) {
						continue;
					}

					// Create a local copy of the Array with the start value at the front
					this._valuesEnd[property] = [object[property]].concat(_valuesEnd[property]);
				}

				// If `to()` specifies a property that doesn't exist in the source object,
				// we should not set that property in the object
				if (Tween.checkValidness(object[property]) === false) {
					continue;
				}

				this._valuesStart[property] = object[property];

				this._valuesStartRepeat[property] = _valuesStart[property] || 0;
			}

			(0, _core.add)(this);

			this._isPlaying = true;

			return this;
		}
	}, {
		key: 'stop',
		value: function stop() {
			var _isPlaying = this._isPlaying,
			    _onStopCallback = this._onStopCallback,
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

			this._delayTime = amount;

			return this;
		}
	}, {
		key: 'repeat',
		value: function repeat(times) {

			this._repeat = times;
			this._r = times;

			return this;
		}
	}, {
		key: 'repeatDelay',
		value: function repeatDelay(amount) {

			this._repeatDelayTime = amount;

			return this;
		}
	}, {
		key: 'reverseDelay',
		value: function reverseDelay(amount) {

			this._reverseDelayTime = amount;

			return this;
		}
	}, {
		key: 'yoyo',
		value: function yoyo(state) {

			this._yoyo = state;

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
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			this._chainedTweens = args;

			return this;
		}
	}, {
		key: 'get',
		value: function get(time) {
			this.update(time);
			return this._object;
		}
	}, {
		key: 'update',
		value: function update() {
			var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _core.now)();
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

				// Don't update properties that do not exist in the source object
				if (_valuesStart[property] === undefined) {
					continue;
				}

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
						this._repeat--;
					}

					// Reassign starting values, restart by making startTime = now
					this.reverse();

					this.emit(_reversed ? 'reverse' : 'repeat', object);

					if (_yoyo) {
						this._reversed = !_reversed;
					}

					if (!_reversed && _repeatDelayTime !== undefined) {
						this._startTime += _duration + _repeatDelayTime;
					} else if (_reversed && _reverseDelayTime !== undefined) {
						this._startTime += _duration + _reverseDelayTime;
					} else {
						this._startTime += _duration + _delayTime;
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
/* 4 */
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
/* 5 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Interpolation = exports.Easing = exports.Tween = exports.now = exports.autoPlay = exports.update = exports.remove = exports.removeAll = exports.add = exports.getAll = undefined;

__webpack_require__(4);

__webpack_require__(5);

var _core = __webpack_require__(2);

var _Easing = __webpack_require__(0);

var _Easing2 = _interopRequireDefault(_Easing);

var _Tween = __webpack_require__(3);

var _Tween2 = _interopRequireDefault(_Tween);

var _Interpolation = __webpack_require__(1);

var _Interpolation2 = _interopRequireDefault(_Interpolation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getAll = _core.getAll;
exports.add = _core.add;
exports.removeAll = _core.removeAll;
exports.remove = _core.remove;
exports.update = _core.update;
exports.autoPlay = _core.autoPlay;
exports.now = _core.now;
exports.Tween = _Tween2.default;
exports.Easing = _Easing2.default;
exports.Interpolation = _Interpolation2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=Tween.js.map