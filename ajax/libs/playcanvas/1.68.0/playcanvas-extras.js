/**
 * @license
 * PlayCanvas Engine v1.68.0 revision c318cb382
 * Copyright 2011-2024 PlayCanvas Ltd. All rights reserved.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('playcanvas')) :
	typeof define === 'function' && define.amd ? define(['exports', 'playcanvas'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.pcx = {}, global.pc));
})(this, (function (exports, playcanvas) { 'use strict';

	function _regeneratorRuntime() {
	  _regeneratorRuntime = function () {
	    return e;
	  };
	  var t,
	    e = {},
	    r = Object.prototype,
	    n = r.hasOwnProperty,
	    o = Object.defineProperty || function (t, e, r) {
	      t[e] = r.value;
	    },
	    i = "function" == typeof Symbol ? Symbol : {},
	    a = i.iterator || "@@iterator",
	    c = i.asyncIterator || "@@asyncIterator",
	    u = i.toStringTag || "@@toStringTag";
	  function define(t, e, r) {
	    return Object.defineProperty(t, e, {
	      value: r,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), t[e];
	  }
	  try {
	    define({}, "");
	  } catch (t) {
	    define = function (t, e, r) {
	      return t[e] = r;
	    };
	  }
	  function wrap(t, e, r, n) {
	    var i = e && e.prototype instanceof Generator ? e : Generator,
	      a = Object.create(i.prototype),
	      c = new Context(n || []);
	    return o(a, "_invoke", {
	      value: makeInvokeMethod(t, r, c)
	    }), a;
	  }
	  function tryCatch(t, e, r) {
	    try {
	      return {
	        type: "normal",
	        arg: t.call(e, r)
	      };
	    } catch (t) {
	      return {
	        type: "throw",
	        arg: t
	      };
	    }
	  }
	  e.wrap = wrap;
	  var h = "suspendedStart",
	    l = "suspendedYield",
	    f = "executing",
	    s = "completed",
	    y = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  var p = {};
	  define(p, a, function () {
	    return this;
	  });
	  var d = Object.getPrototypeOf,
	    v = d && d(d(values([])));
	  v && v !== r && n.call(v, a) && (p = v);
	  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
	  function defineIteratorMethods(t) {
	    ["next", "throw", "return"].forEach(function (e) {
	      define(t, e, function (t) {
	        return this._invoke(e, t);
	      });
	    });
	  }
	  function AsyncIterator(t, e) {
	    function invoke(r, o, i, a) {
	      var c = tryCatch(t[r], t, o);
	      if ("throw" !== c.type) {
	        var u = c.arg,
	          h = u.value;
	        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
	          invoke("next", t, i, a);
	        }, function (t) {
	          invoke("throw", t, i, a);
	        }) : e.resolve(h).then(function (t) {
	          u.value = t, i(u);
	        }, function (t) {
	          return invoke("throw", t, i, a);
	        });
	      }
	      a(c.arg);
	    }
	    var r;
	    o(this, "_invoke", {
	      value: function (t, n) {
	        function callInvokeWithMethodAndArg() {
	          return new e(function (e, r) {
	            invoke(t, n, e, r);
	          });
	        }
	        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }
	    });
	  }
	  function makeInvokeMethod(e, r, n) {
	    var o = h;
	    return function (i, a) {
	      if (o === f) throw new Error("Generator is already running");
	      if (o === s) {
	        if ("throw" === i) throw a;
	        return {
	          value: t,
	          done: !0
	        };
	      }
	      for (n.method = i, n.arg = a;;) {
	        var c = n.delegate;
	        if (c) {
	          var u = maybeInvokeDelegate(c, n);
	          if (u) {
	            if (u === y) continue;
	            return u;
	          }
	        }
	        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
	          if (o === h) throw o = s, n.arg;
	          n.dispatchException(n.arg);
	        } else "return" === n.method && n.abrupt("return", n.arg);
	        o = f;
	        var p = tryCatch(e, r, n);
	        if ("normal" === p.type) {
	          if (o = n.done ? s : l, p.arg === y) continue;
	          return {
	            value: p.arg,
	            done: n.done
	          };
	        }
	        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
	      }
	    };
	  }
	  function maybeInvokeDelegate(e, r) {
	    var n = r.method,
	      o = e.iterator[n];
	    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
	    var i = tryCatch(o, e.iterator, r.arg);
	    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
	    var a = i.arg;
	    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
	  }
	  function pushTryEntry(t) {
	    var e = {
	      tryLoc: t[0]
	    };
	    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
	  }
	  function resetTryEntry(t) {
	    var e = t.completion || {};
	    e.type = "normal", delete e.arg, t.completion = e;
	  }
	  function Context(t) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], t.forEach(pushTryEntry, this), this.reset(!0);
	  }
	  function values(e) {
	    if (e || "" === e) {
	      var r = e[a];
	      if (r) return r.call(e);
	      if ("function" == typeof e.next) return e;
	      if (!isNaN(e.length)) {
	        var o = -1,
	          i = function next() {
	            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
	            return next.value = t, next.done = !0, next;
	          };
	        return i.next = i;
	      }
	    }
	    throw new TypeError(typeof e + " is not iterable");
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
	    value: GeneratorFunctionPrototype,
	    configurable: !0
	  }), o(GeneratorFunctionPrototype, "constructor", {
	    value: GeneratorFunction,
	    configurable: !0
	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
	    var e = "function" == typeof t && t.constructor;
	    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
	  }, e.mark = function (t) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
	  }, e.awrap = function (t) {
	    return {
	      __await: t
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
	    return this;
	  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
	    void 0 === i && (i = Promise);
	    var a = new AsyncIterator(wrap(t, r, n, o), i);
	    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
	      return t.done ? t.value : a.next();
	    });
	  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
	    return this;
	  }), define(g, "toString", function () {
	    return "[object Generator]";
	  }), e.keys = function (t) {
	    var e = Object(t),
	      r = [];
	    for (var n in e) r.push(n);
	    return r.reverse(), function next() {
	      for (; r.length;) {
	        var t = r.pop();
	        if (t in e) return next.value = t, next.done = !1, next;
	      }
	      return next.done = !0, next;
	    };
	  }, e.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function (e) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
	    },
	    stop: function () {
	      this.done = !0;
	      var t = this.tryEntries[0].completion;
	      if ("throw" === t.type) throw t.arg;
	      return this.rval;
	    },
	    dispatchException: function (e) {
	      if (this.done) throw e;
	      var r = this;
	      function handle(n, o) {
	        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
	      }
	      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
	        var i = this.tryEntries[o],
	          a = i.completion;
	        if ("root" === i.tryLoc) return handle("end");
	        if (i.tryLoc <= this.prev) {
	          var c = n.call(i, "catchLoc"),
	            u = n.call(i, "finallyLoc");
	          if (c && u) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          } else if (c) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	          } else {
	            if (!u) throw new Error("try statement without catch or finally");
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function (t, e) {
	      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
	        var o = this.tryEntries[r];
	        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
	          var i = o;
	          break;
	        }
	      }
	      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
	      var a = i ? i.completion : {};
	      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
	    },
	    complete: function (t, e) {
	      if ("throw" === t.type) throw t.arg;
	      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
	    },
	    finish: function (t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
	      }
	    },
	    catch: function (t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.tryLoc === t) {
	          var n = r.completion;
	          if ("throw" === n.type) {
	            var o = n.arg;
	            resetTryEntry(r);
	          }
	          return o;
	        }
	      }
	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function (e, r, n) {
	      return this.delegate = {
	        iterator: values(e),
	        resultName: r,
	        nextLoc: n
	      }, "next" === this.method && (this.arg = t), y;
	    }
	  }, e;
	}
	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }
	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}
	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	      args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);
	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }
	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }
	      _next(undefined);
	    });
	  };
	}
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}
	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  _setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };
	  return _setPrototypeOf(o, p);
	}
	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	function _createForOfIteratorHelperLoose(o, allowArrayLike) {
	  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
	  if (it) return (it = it.call(o)).next.bind(it);
	  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	    if (it) o = it;
	    var i = 0;
	    return function () {
	      if (i >= o.length) return {
	        done: true
	      };
	      return {
	        done: false,
	        value: o[i++]
	      };
	    };
	  }
	  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _toPrimitive(input, hint) {
	  if (typeof input !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];
	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (typeof res !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (hint === "string" ? String : Number)(input);
	}
	function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");
	  return typeof key === "symbol" ? key : String(key);
	}

	var CpuTimer = function () {
		function CpuTimer(app) {
			this._frameIndex = 0;
			this._frameTimings = [];
			this._timings = [];
			this._prevTimings = [];
			this.unitsName = 'ms';
			this.decimalPlaces = 1;
			this.enabled = true;
			app.on('frameupdate', this.begin.bind(this, 'update'));
			app.on('framerender', this.mark.bind(this, 'render'));
			app.on('frameend', this.mark.bind(this, 'other'));
		}
		var _proto = CpuTimer.prototype;
		_proto.begin = function begin(name) {
			if (!this.enabled) {
				return;
			}
			if (this._frameIndex < this._frameTimings.length) {
				this._frameTimings.splice(this._frameIndex);
			}
			var tmp = this._prevTimings;
			this._prevTimings = this._timings;
			this._timings = this._frameTimings;
			this._frameTimings = tmp;
			this._frameIndex = 0;
			this.mark(name);
		};
		_proto.mark = function mark(name) {
			if (!this.enabled) {
				return;
			}
			var timestamp = playcanvas.now();
			if (this._frameIndex > 0) {
				var prev = this._frameTimings[this._frameIndex - 1];
				prev[1] = timestamp - prev[1];
			} else if (this._timings.length > 0) {
				var _prev = this._timings[this._timings.length - 1];
				_prev[1] = timestamp - _prev[1];
			}
			if (this._frameIndex >= this._frameTimings.length) {
				this._frameTimings.push([name, timestamp]);
			} else {
				var timing = this._frameTimings[this._frameIndex];
				timing[0] = name;
				timing[1] = timestamp;
			}
			this._frameIndex++;
		};
		_createClass(CpuTimer, [{
			key: "timings",
			get: function get() {
				return this._timings.slice(0, -1).map(function (v) {
					return v[1];
				});
			}
		}]);
		return CpuTimer;
	}();

	var GpuTimer = function () {
		function GpuTimer(device) {
			this.device = device;
			device.gpuProfiler.enabled = true;
			this.enabled = true;
			this.unitsName = 'ms';
			this.decimalPlaces = 1;
			this._timings = [];
		}
		_createClass(GpuTimer, [{
			key: "timings",
			get: function get() {
				this._timings[0] = this.device.gpuProfiler._frameTime;
				return this._timings;
			}
		}]);
		return GpuTimer;
	}();

	var StatsTimer = function () {
		function StatsTimer(app, statNames, decimalPlaces, unitsName, multiplier) {
			var _this = this;
			this.app = app;
			this.values = [];
			this.statNames = statNames;
			if (this.statNames.length > 3) this.statNames.length = 3;
			this.unitsName = unitsName;
			this.decimalPlaces = decimalPlaces;
			this.multiplier = multiplier || 1;
			var resolve = function resolve(path, obj) {
				return path.split('.').reduce(function (prev, curr) {
					return prev ? prev[curr] : null;
				}, obj || _this);
			};
			app.on('frameupdate', function (ms) {
				for (var i = 0; i < _this.statNames.length; i++) {
					_this.values[i] = resolve(_this.statNames[i], _this.app.stats) * _this.multiplier;
				}
			});
		}
		_createClass(StatsTimer, [{
			key: "timings",
			get: function get() {
				return this.values;
			}
		}]);
		return StatsTimer;
	}();

	var Graph = function () {
		function Graph(name, app, watermark, textRefreshRate, timer) {
			this.app = app;
			this.name = name;
			this.device = app.graphicsDevice;
			this.timer = timer;
			this.watermark = watermark;
			this.enabled = false;
			this.textRefreshRate = textRefreshRate;
			this.avgTotal = 0;
			this.avgTimer = 0;
			this.avgCount = 0;
			this.timingText = '';
			this.texture = null;
			this.yOffset = 0;
			this.cursor = 0;
			this.sample = new Uint8ClampedArray(4);
			this.sample.set([0, 0, 0, 255]);
			this.counter = 0;
			this.app.on('frameupdate', this.update, this);
		}
		var _proto = Graph.prototype;
		_proto.destroy = function destroy() {
			this.app.off('frameupdate', this.update, this);
		};
		_proto.loseContext = function loseContext() {
			if (this.timer && typeof this.timer.loseContext === 'function') {
				this.timer.loseContext();
			}
		};
		_proto.update = function update(ms) {
			var timings = this.timer.timings;
			var total = timings.reduce(function (a, v) {
				return a + v;
			}, 0);
			this.avgTotal += total;
			this.avgTimer += ms;
			this.avgCount++;
			if (this.avgTimer > this.textRefreshRate) {
				this.timingText = (this.avgTotal / this.avgCount).toFixed(this.timer.decimalPlaces);
				this.avgTimer = 0;
				this.avgTotal = 0;
				this.avgCount = 0;
			}
			if (this.enabled) {
				var value = 0;
				var range = 1.5 * this.watermark;
				for (var i = 0; i < timings.length; ++i) {
					value += Math.floor(timings[i] / range * 255);
					this.sample[i] = value;
				}
				this.sample[3] = this.watermark / range * 255;
				var data = this.texture.lock();
				data.set(this.sample, (this.cursor + this.yOffset * this.texture.width) * 4);
				this.texture.unlock();
				this.cursor++;
				if (this.cursor === this.texture.width) {
					this.cursor = 0;
				}
			}
		};
		_proto.render = function render(render2d, x, y, w, h) {
			render2d.quad(x + w, y, -w, h, this.enabled ? this.cursor : 0, this.enabled ? 0.5 + this.yOffset : this.texture.height - 1, -w, 0, this.texture, 0);
		};
		return Graph;
	}();

	var WordAtlas = function () {
		function WordAtlas(device, words) {
			var initContext = function initContext(context) {
				context.font = '10px "Lucida Console", Monaco, monospace';
				context.textAlign = 'left';
				context.textBaseline = 'alphabetic';
			};
			var isNumber = function isNumber(word) {
				return word === '.' || word.length === 1 && word.charCodeAt(0) >= 48 && word.charCodeAt(0) <= 57;
			};
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d', {
				alpha: true
			});
			initContext(context);
			var placements = new Map();
			var padding = 5;
			var width = 512;
			var x = padding;
			var y = padding;
			words.forEach(function (word) {
				var measurement = context.measureText(word);
				var l = Math.ceil(-measurement.actualBoundingBoxLeft);
				var r = Math.ceil(measurement.actualBoundingBoxRight);
				var a = Math.ceil(measurement.actualBoundingBoxAscent);
				var d = Math.ceil(measurement.actualBoundingBoxDescent);
				var w = l + r;
				var h = a + d;
				if (x + w + padding >= width) {
					x = padding;
					y += 16;
				}
				placements.set(word, {
					l: l,
					r: r,
					a: a,
					d: d,
					w: w,
					h: h,
					x: x,
					y: y
				});
				x += w + padding;
			});
			canvas.width = 512;
			canvas.height = playcanvas.math.nextPowerOfTwo(y + 16 + padding);
			initContext(context);
			context.fillStyle = 'rgb(0, 0, 0)';
			context.fillRect(0, 0, canvas.width, canvas.height);
			placements.forEach(function (m, word) {
				context.fillStyle = isNumber(word) ? 'rgb(255, 255, 255)' : 'rgb(170, 170, 170)';
				context.fillText(word, m.x - m.l, m.y + m.a);
			});
			this.placements = placements;
			var data = context.getImageData(0, 0, canvas.width, canvas.height).data;
			for (var i = 0; i < data.length; i += 4) {
				data[i + 3] = data[i + 0];
				data[i + 0] = 255;
				data[i + 1] = 255;
				data[i + 2] = 255;
			}
			this.texture = new playcanvas.Texture(device, {
				name: 'mini-stats-word-atlas',
				width: canvas.width,
				height: canvas.height,
				mipmaps: false,
				minFilter: playcanvas.FILTER_NEAREST,
				magFilter: playcanvas.FILTER_NEAREST,
				levels: [data]
			});
		}
		var _proto = WordAtlas.prototype;
		_proto.destroy = function destroy() {
			this.texture.destroy();
			this.texture = null;
		};
		_proto.render = function render(render2d, word, x, y) {
			var p = this.placements.get(word);
			if (p) {
				var padding = 1;
				render2d.quad(x + p.l - padding, y - p.d + padding, p.w + padding * 2, p.h + padding * 2, p.x - padding, this.texture.height - p.y - p.h - padding, undefined, undefined, this.texture, 1);
				return p.w;
			}
			return 0;
		};
		return WordAtlas;
	}();

	var vertexShader = "\nattribute vec3 vertex_position;         // unnormalized xy, word flag\nattribute vec4 vertex_texCoord0;        // unnormalized texture space uv, normalized uv\n\nvarying vec4 uv0;\nvarying float wordFlag;\n\nvoid main(void) {\n    gl_Position = vec4(vertex_position.xy * 2.0 - 1.0, 0.5, 1.0);\n    uv0 = vertex_texCoord0;\n    wordFlag = vertex_position.z;\n}";
	var fragmentShader$1 = "\nvarying vec4 uv0;\nvarying float wordFlag;\n\nuniform vec4 clr;\nuniform sampler2D graphTex;\nuniform sampler2D wordsTex;\n\nvoid main (void) {\n    vec4 graphSample = texture2D(graphTex, uv0.xy);\n\n    vec4 graph;\n    if (uv0.w < graphSample.r)\n        graph = vec4(0.7, 0.2, 0.2, 1.0);\n    else if (uv0.w < graphSample.g)\n        graph = vec4(0.2, 0.7, 0.2, 1.0);\n    else if (uv0.w < graphSample.b)\n        graph = vec4(0.2, 0.2, 0.7, 1.0);\n    else\n        graph = vec4(0.0, 0.0, 0.0, 1.0 - 0.25 * sin(uv0.w * 3.14159));\n\n    vec4 words = texture2D(wordsTex, vec2(uv0.x, 1.0 - uv0.y));\n\n    gl_FragColor = mix(graph, words, wordFlag) * clr;\n}";
	var Render2d = function () {
		function Render2d(device, maxQuads) {
			if (maxQuads === void 0) {
				maxQuads = 512;
			}
			var format = new playcanvas.VertexFormat(device, [{
				semantic: playcanvas.SEMANTIC_POSITION,
				components: 3,
				type: playcanvas.TYPE_FLOAT32
			}, {
				semantic: playcanvas.SEMANTIC_TEXCOORD0,
				components: 4,
				type: playcanvas.TYPE_FLOAT32
			}]);
			var indices = new Uint16Array(maxQuads * 6);
			for (var i = 0; i < maxQuads; ++i) {
				indices[i * 6 + 0] = i * 4;
				indices[i * 6 + 1] = i * 4 + 1;
				indices[i * 6 + 2] = i * 4 + 2;
				indices[i * 6 + 3] = i * 4;
				indices[i * 6 + 4] = i * 4 + 2;
				indices[i * 6 + 5] = i * 4 + 3;
			}
			var shader = playcanvas.shaderChunks.createShaderFromCode(device, vertexShader, fragmentShader$1, 'mini-stats');
			this.device = device;
			this.buffer = new playcanvas.VertexBuffer(device, format, maxQuads * 4, playcanvas.BUFFER_STREAM);
			this.data = new Float32Array(this.buffer.numBytes / 4);
			this.indexBuffer = new playcanvas.IndexBuffer(device, playcanvas.INDEXFORMAT_UINT16, maxQuads * 6, playcanvas.BUFFER_STATIC, indices);
			this.prim = {
				type: playcanvas.PRIMITIVE_TRIANGLES,
				indexed: true,
				base: 0,
				count: 0
			};
			this.quads = 0;
			this.mesh = new playcanvas.Mesh(device);
			this.mesh.vertexBuffer = this.buffer;
			this.mesh.indexBuffer[0] = this.indexBuffer;
			this.mesh.primitive = [this.prim];
			var material = new playcanvas.Material();
			this.material = material;
			material.cull = playcanvas.CULLFACE_NONE;
			material.shader = shader;
			material.depthState = playcanvas.DepthState.NODEPTH;
			material.blendState = new playcanvas.BlendState(true, playcanvas.BLENDEQUATION_ADD, playcanvas.BLENDMODE_SRC_ALPHA, playcanvas.BLENDMODE_ONE_MINUS_SRC_ALPHA, playcanvas.BLENDEQUATION_ADD, playcanvas.BLENDMODE_ONE, playcanvas.BLENDMODE_ONE);
			material.update();
			this.meshInstance = new playcanvas.MeshInstance(this.mesh, material, new playcanvas.GraphNode('MiniStatsMesh'));
			this.uniforms = {
				clr: new Float32Array(4)
			};
			this.targetSize = {
				width: device.width,
				height: device.height
			};
		}
		var _proto = Render2d.prototype;
		_proto.quad = function quad(x, y, w, h, u, v, uw, uh, texture, wordFlag) {
			if (wordFlag === void 0) {
				wordFlag = 0;
			}
			var rw = this.targetSize.width;
			var rh = this.targetSize.height;
			var x0 = x / rw;
			var y0 = y / rh;
			var x1 = (x + w) / rw;
			var y1 = (y + h) / rh;
			var tw = texture.width;
			var th = texture.height;
			var u0 = u / tw;
			var v0 = v / th;
			var u1 = (u + (uw != null ? uw : w)) / tw;
			var v1 = (v + (uh != null ? uh : h)) / th;
			this.data.set([x0, y0, wordFlag, u0, v0, 0, 0, x1, y0, wordFlag, u1, v0, 1, 0, x1, y1, wordFlag, u1, v1, 1, 1, x0, y1, wordFlag, u0, v1, 0, 1], 4 * 7 * this.quads);
			this.quads++;
			this.prim.count += 6;
		};
		_proto.startFrame = function startFrame() {
			this.quads = 0;
			this.prim.count = 0;
			this.targetSize.width = this.device.canvas.scrollWidth;
			this.targetSize.height = this.device.canvas.scrollHeight;
		};
		_proto.render = function render(app, layer, graphTexture, wordsTexture, clr, height) {
			this.buffer.setData(this.data.buffer);
			this.uniforms.clr.set(clr, 0);
			this.material.setParameter('clr', this.uniforms.clr);
			this.material.setParameter('graphTex', graphTexture);
			this.material.setParameter('wordsTex', wordsTexture);
			app.drawMeshInstance(this.meshInstance, layer);
		};
		return Render2d;
	}();

	var MiniStats = function () {
		function MiniStats(app, options) {
			var _this = this;
			var device = app.graphicsDevice;
			options = options || MiniStats.getDefaultOptions();
			this.initGraphs(app, device, options);
			var words = new Set(['', 'ms', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].concat(this.graphs.map(function (graph) {
				return graph.name;
			})).concat(options.stats ? options.stats.map(function (stat) {
				return stat.unitsName;
			}) : []).filter(function (item) {
				return !!item;
			}));
			this.wordAtlas = new WordAtlas(device, words);
			this.sizes = options.sizes;
			this._activeSizeIndex = options.startSizeIndex;
			var div = document.createElement('div');
			div.setAttribute('id', 'mini-stats');
			div.style.cssText = 'position:fixed;bottom:0;left:0;background:transparent;';
			document.body.appendChild(div);
			div.addEventListener('mouseenter', function (event) {
				_this.opacity = 1.0;
			});
			div.addEventListener('mouseleave', function (event) {
				_this.opacity = 0.7;
			});
			div.addEventListener('click', function (event) {
				event.preventDefault();
				if (_this._enabled) {
					_this.activeSizeIndex = (_this.activeSizeIndex + 1) % _this.sizes.length;
					_this.resize(_this.sizes[_this.activeSizeIndex].width, _this.sizes[_this.activeSizeIndex].height, _this.sizes[_this.activeSizeIndex].graphs);
				}
			});
			device.on('resizecanvas', this.updateDiv, this);
			device.on('losecontext', this.loseContext, this);
			app.on('postrender', this.postRender, this);
			this.app = app;
			this.drawLayer = app.scene.layers.getLayerById(playcanvas.LAYERID_UI);
			this.device = device;
			this.render2d = new Render2d(device);
			this.div = div;
			this.width = 0;
			this.height = 0;
			this.gspacing = 2;
			this.clr = [1, 1, 1, 0.5];
			this._enabled = true;
			this.activeSizeIndex = this._activeSizeIndex;
		}
		var _proto = MiniStats.prototype;
		_proto.destroy = function destroy() {
			this.device.off('resizecanvas', this.updateDiv, this);
			this.device.off('losecontext', this.loseContext, this);
			this.app.off('postrender', this.postRender, this);
			this.graphs.forEach(function (graph) {
				return graph.destroy();
			});
			this.wordAtlas.destroy();
			this.texture.destroy();
		};
		MiniStats.getDefaultOptions = function getDefaultOptions() {
			return {
				sizes: [{
					width: 100,
					height: 16,
					spacing: 0,
					graphs: false
				}, {
					width: 128,
					height: 32,
					spacing: 2,
					graphs: true
				}, {
					width: 256,
					height: 64,
					spacing: 2,
					graphs: true
				}],
				startSizeIndex: 0,
				textRefreshRate: 500,
				cpu: {
					enabled: true,
					watermark: 33
				},
				gpu: {
					enabled: true,
					watermark: 33
				},
				stats: [{
					name: 'Frame',
					stats: ['frame.ms'],
					decimalPlaces: 1,
					unitsName: 'ms',
					watermark: 33
				}, {
					name: 'DrawCalls',
					stats: ['drawCalls.total'],
					watermark: 1000
				}]
			};
		};
		_proto.initGraphs = function initGraphs(app, device, options) {
			var _this2 = this;
			this.graphs = [];
			if (options.cpu.enabled) {
				var timer = new CpuTimer(app);
				var graph = new Graph('CPU', app, options.cpu.watermark, options.textRefreshRate, timer);
				this.graphs.push(graph);
			}
			if (options.gpu.enabled) {
				var _timer = new GpuTimer(device);
				var _graph = new Graph('GPU', app, options.gpu.watermark, options.textRefreshRate, _timer);
				this.graphs.push(_graph);
			}
			if (options.stats) {
				options.stats.forEach(function (entry) {
					var timer = new StatsTimer(app, entry.stats, entry.decimalPlaces, entry.unitsName, entry.multiplier);
					var graph = new Graph(entry.name, app, entry.watermark, options.textRefreshRate, timer);
					_this2.graphs.push(graph);
				});
			}
			var maxWidth = options.sizes.reduce(function (max, v) {
				return v.width > max ? v.width : max;
			}, 0);
			this.texture = new playcanvas.Texture(device, {
				name: 'mini-stats-graph-texture',
				width: playcanvas.math.nextPowerOfTwo(maxWidth),
				height: playcanvas.math.nextPowerOfTwo(this.graphs.length),
				mipmaps: false,
				minFilter: playcanvas.FILTER_NEAREST,
				magFilter: playcanvas.FILTER_NEAREST,
				addressU: playcanvas.ADDRESS_REPEAT,
				addressV: playcanvas.ADDRESS_REPEAT
			});
			this.graphs.forEach(function (graph, i) {
				graph.texture = _this2.texture;
				graph.yOffset = i;
			});
		};
		_proto.render = function render() {
			var graphs = this.graphs;
			var wordAtlas = this.wordAtlas;
			var render2d = this.render2d;
			var width = this.width;
			var height = this.height;
			var gspacing = this.gspacing;
			render2d.startFrame();
			for (var i = 0; i < graphs.length; ++i) {
				var graph = graphs[i];
				var y = i * (height + gspacing);
				graph.render(render2d, 0, y, width, height);
				var x = 1;
				y += height - 13;
				x += wordAtlas.render(render2d, graph.name, x, y) + 10;
				var timingText = graph.timingText;
				for (var j = 0; j < timingText.length; ++j) {
					x += wordAtlas.render(render2d, timingText[j], x, y);
				}
				if (graph.timer.unitsName) {
					x += 3;
					wordAtlas.render(render2d, graph.timer.unitsName, x, y);
				}
			}
			render2d.render(this.app, this.drawLayer, this.texture, this.wordAtlas.texture, this.clr, height);
		};
		_proto.resize = function resize(width, height, showGraphs) {
			var graphs = this.graphs;
			for (var i = 0; i < graphs.length; ++i) {
				graphs[i].enabled = showGraphs;
			}
			this.width = width;
			this.height = height;
			this.updateDiv();
		};
		_proto.updateDiv = function updateDiv() {
			var rect = this.device.canvas.getBoundingClientRect();
			this.div.style.left = rect.left + 'px';
			this.div.style.bottom = window.innerHeight - rect.bottom + 'px';
			this.div.style.width = this.width + 'px';
			this.div.style.height = this.overallHeight + 'px';
		};
		_proto.loseContext = function loseContext() {
			this.graphs.forEach(function (graph) {
				return graph.loseContext();
			});
		};
		_proto.postRender = function postRender() {
			if (this._enabled) {
				this.render();
			}
		};
		_createClass(MiniStats, [{
			key: "activeSizeIndex",
			get: function get() {
				return this._activeSizeIndex;
			},
			set: function set(value) {
				this._activeSizeIndex = value;
				this.gspacing = this.sizes[value].spacing;
				this.resize(this.sizes[value].width, this.sizes[value].height, this.sizes[value].graphs);
			}
		}, {
			key: "opacity",
			get: function get() {
				return this.clr[3];
			},
			set: function set(value) {
				this.clr[3] = value;
			}
		}, {
			key: "overallHeight",
			get: function get() {
				var graphs = this.graphs;
				var spacing = this.gspacing;
				return this.height * graphs.length + spacing * (graphs.length - 1);
			}
		}, {
			key: "enabled",
			get: function get() {
				return this._enabled;
			},
			set: function set(value) {
				if (value !== this._enabled) {
					this._enabled = value;
					for (var i = 0; i < this.graphs.length; ++i) {
						this.graphs[i].enabled = value;
						this.graphs[i].timer.enabled = value;
					}
				}
			}
		}]);
		return MiniStats;
	}();

	var textureBlitVertexShader = "\n    attribute vec2 vertex_position;\n    varying vec2 uv0;\n    void main(void) {\n        gl_Position = vec4(vertex_position, 0.5, 1.0);\n        uv0 = vertex_position.xy * 0.5 + 0.5;\n    }";
	var textureBlitFragmentShader = "\n    varying vec2 uv0;\n    uniform sampler2D blitTexture;\n    void main(void) {\n        gl_FragColor = texture2D(blitTexture, uv0);\n    }";
	var CoreExporter = function () {
		function CoreExporter() {}
		var _proto = CoreExporter.prototype;
		_proto.textureToCanvas = function textureToCanvas(texture, options) {
			if (options === void 0) {
				options = {};
			}
			var image = texture.getSource();
			if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof OffscreenCanvas !== 'undefined' && image instanceof OffscreenCanvas || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
				var _this$calcTextureSize = this.calcTextureSize(image.width, image.height, options.maxTextureSize),
					_width = _this$calcTextureSize.width,
					_height = _this$calcTextureSize.height;
				var _canvas = document.createElement('canvas');
				_canvas.width = _width;
				_canvas.height = _height;
				var context = _canvas.getContext('2d');
				context.drawImage(image, 0, 0, _canvas.width, _canvas.height);
				if (options.color) {
					var _options$color = options.color,
						r = _options$color.r,
						g = _options$color.g,
						b = _options$color.b;
					var imagedata = context.getImageData(0, 0, _width, _height);
					var data = imagedata.data;
					for (var i = 0; i < data.length; i += 4) {
						data[i + 0] = data[i + 0] * r;
						data[i + 1] = data[i + 1] * g;
						data[i + 2] = data[i + 2] * b;
					}
					context.putImageData(imagedata, 0, 0);
				}
				return Promise.resolve(_canvas);
			}
			var device = texture.device;
			var _this$calcTextureSize2 = this.calcTextureSize(texture.width, texture.height, options.maxTextureSize),
				width = _this$calcTextureSize2.width,
				height = _this$calcTextureSize2.height;
			var dstTexture = new playcanvas.Texture(device, {
				name: 'ExtractedTexture',
				width: width,
				height: height,
				format: texture.format,
				cubemap: false,
				mipmaps: false,
				minFilter: playcanvas.FILTER_LINEAR,
				magFilter: playcanvas.FILTER_LINEAR,
				addressU: playcanvas.ADDRESS_CLAMP_TO_EDGE,
				addressV: playcanvas.ADDRESS_CLAMP_TO_EDGE
			});
			var renderTarget = new playcanvas.RenderTarget({
				colorBuffer: dstTexture,
				depth: false
			});
			var shader = playcanvas.createShaderFromCode(device, textureBlitVertexShader, textureBlitFragmentShader, 'ShaderCoreExporterBlit');
			device.scope.resolve('blitTexture').setValue(texture);
			device.setBlendState(playcanvas.BlendState.NOBLEND);
			playcanvas.drawQuadWithShader(device, renderTarget, shader);
			var pixels = new Uint8ClampedArray(width * height * 4);
			device.readPixels(0, 0, width, height, pixels);
			dstTexture.destroy();
			renderTarget.destroy();
			var newImage = new ImageData(pixels, width, height);
			var canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			var newContext = canvas.getContext('2d');
			newContext.putImageData(newImage, 0, 0);
			return Promise.resolve(canvas);
		};
		_proto.calcTextureSize = function calcTextureSize(width, height, maxTextureSize) {
			if (maxTextureSize) {
				var scale = Math.min(maxTextureSize / Math.max(width, height), 1);
				width = Math.round(width * scale);
				height = Math.round(height * scale);
			}
			return {
				width: width,
				height: height
			};
		};
		return CoreExporter;
	}();

	var u8 = Uint8Array,
		u16 = Uint16Array,
		i32 = Int32Array;
	var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
	var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
	var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
	var freb = function freb(eb, start) {
		var b = new u16(31);
		for (var i = 0; i < 31; ++i) {
			b[i] = start += 1 << eb[i - 1];
		}
		var r = new i32(b[30]);
		for (var i = 1; i < 30; ++i) {
			for (var j = b[i]; j < b[i + 1]; ++j) {
				r[j] = j - b[i] << 5 | i;
			}
		}
		return {
			b: b,
			r: r
		};
	};
	var _a = freb(fleb, 2),
		fl = _a.b,
		revfl = _a.r;
	fl[28] = 258, revfl[258] = 28;
	var _b = freb(fdeb, 0),
		revfd = _b.r;
	var rev = new u16(32768);
	for (var i = 0; i < 32768; ++i) {
		var x = (i & 0xAAAA) >> 1 | (i & 0x5555) << 1;
		x = (x & 0xCCCC) >> 2 | (x & 0x3333) << 2;
		x = (x & 0xF0F0) >> 4 | (x & 0x0F0F) << 4;
		rev[i] = ((x & 0xFF00) >> 8 | (x & 0x00FF) << 8) >> 1;
	}
	var hMap = function hMap(cd, mb, r) {
		var s = cd.length;
		var i = 0;
		var l = new u16(mb);
		for (; i < s; ++i) {
			if (cd[i]) ++l[cd[i] - 1];
		}
		var le = new u16(mb);
		for (i = 1; i < mb; ++i) {
			le[i] = le[i - 1] + l[i - 1] << 1;
		}
		var co;
		if (r) {
			co = new u16(1 << mb);
			var rvb = 15 - mb;
			for (i = 0; i < s; ++i) {
				if (cd[i]) {
					var sv = i << 4 | cd[i];
					var r_1 = mb - cd[i];
					var v = le[cd[i] - 1]++ << r_1;
					for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
						co[rev[v] >> rvb] = sv;
					}
				}
			}
		} else {
			co = new u16(s);
			for (i = 0; i < s; ++i) {
				if (cd[i]) {
					co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
				}
			}
		}
		return co;
	};
	var flt = new u8(288);
	for (var i = 0; i < 144; ++i) flt[i] = 8;
	for (var i = 144; i < 256; ++i) flt[i] = 9;
	for (var i = 256; i < 280; ++i) flt[i] = 7;
	for (var i = 280; i < 288; ++i) flt[i] = 8;
	var fdt = new u8(32);
	for (var i = 0; i < 32; ++i) fdt[i] = 5;
	var flm = hMap(flt, 9, 0);
		hMap(flt, 9, 1);
	var fdm = hMap(fdt, 5, 0);
		hMap(fdt, 5, 1);
	var shft = function shft(p) {
		return (p + 7) / 8 | 0;
	};
	var slc = function slc(v, s, e) {
		if (s == null || s < 0) s = 0;
		if (e == null || e > v.length) e = v.length;
		return new u8(v.subarray(s, e));
	};
	var ec = ['unexpected EOF', 'invalid block type', 'invalid length/literal', 'invalid distance', 'stream finished', 'no stream handler',, 'no callback', 'invalid UTF-8 data', 'extra field too long', 'date not in range 1980-2099', 'filename too long', 'stream finishing', 'invalid zip data'];
	var err = function err(ind, msg, nt) {
		var e = new Error(msg || ec[ind]);
		e.code = ind;
		if (Error.captureStackTrace) Error.captureStackTrace(e, err);
		if (!nt) throw e;
		return e;
	};
	var wbits = function wbits(d, p, v) {
		v <<= p & 7;
		var o = p / 8 | 0;
		d[o] |= v;
		d[o + 1] |= v >> 8;
	};
	var wbits16 = function wbits16(d, p, v) {
		v <<= p & 7;
		var o = p / 8 | 0;
		d[o] |= v;
		d[o + 1] |= v >> 8;
		d[o + 2] |= v >> 16;
	};
	var hTree = function hTree(d, mb) {
		var t = [];
		for (var i = 0; i < d.length; ++i) {
			if (d[i]) t.push({
				s: i,
				f: d[i]
			});
		}
		var s = t.length;
		var t2 = t.slice();
		if (!s) return {
			t: et,
			l: 0
		};
		if (s == 1) {
			var v = new u8(t[0].s + 1);
			v[t[0].s] = 1;
			return {
				t: v,
				l: 1
			};
		}
		t.sort(function (a, b) {
			return a.f - b.f;
		});
		t.push({
			s: -1,
			f: 25001
		});
		var l = t[0],
			r = t[1],
			i0 = 0,
			i1 = 1,
			i2 = 2;
		t[0] = {
			s: -1,
			f: l.f + r.f,
			l: l,
			r: r
		};
		while (i1 != s - 1) {
			l = t[t[i0].f < t[i2].f ? i0++ : i2++];
			r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
			t[i1++] = {
				s: -1,
				f: l.f + r.f,
				l: l,
				r: r
			};
		}
		var maxSym = t2[0].s;
		for (var i = 1; i < s; ++i) {
			if (t2[i].s > maxSym) maxSym = t2[i].s;
		}
		var tr = new u16(maxSym + 1);
		var mbt = ln(t[i1 - 1], tr, 0);
		if (mbt > mb) {
			var i = 0,
				dt = 0;
			var lft = mbt - mb,
				cst = 1 << lft;
			t2.sort(function (a, b) {
				return tr[b.s] - tr[a.s] || a.f - b.f;
			});
			for (; i < s; ++i) {
				var i2_1 = t2[i].s;
				if (tr[i2_1] > mb) {
					dt += cst - (1 << mbt - tr[i2_1]);
					tr[i2_1] = mb;
				} else break;
			}
			dt >>= lft;
			while (dt > 0) {
				var i2_2 = t2[i].s;
				if (tr[i2_2] < mb) dt -= 1 << mb - tr[i2_2]++ - 1;else ++i;
			}
			for (; i >= 0 && dt; --i) {
				var i2_3 = t2[i].s;
				if (tr[i2_3] == mb) {
					--tr[i2_3];
					++dt;
				}
			}
			mbt = mb;
		}
		return {
			t: new u8(tr),
			l: mbt
		};
	};
	var ln = function ln(n, l, d) {
		return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
	};
	var lc = function lc(c) {
		var s = c.length;
		while (s && !c[--s]);
		var cl = new u16(++s);
		var cli = 0,
			cln = c[0],
			cls = 1;
		var w = function w(v) {
			cl[cli++] = v;
		};
		for (var i = 1; i <= s; ++i) {
			if (c[i] == cln && i != s) ++cls;else {
				if (!cln && cls > 2) {
					for (; cls > 138; cls -= 138) w(32754);
					if (cls > 2) {
						w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
						cls = 0;
					}
				} else if (cls > 3) {
					w(cln), --cls;
					for (; cls > 6; cls -= 6) w(8304);
					if (cls > 2) w(cls - 3 << 5 | 8208), cls = 0;
				}
				while (cls--) w(cln);
				cls = 1;
				cln = c[i];
			}
		}
		return {
			c: cl.subarray(0, cli),
			n: s
		};
	};
	var clen = function clen(cf, cl) {
		var l = 0;
		for (var i = 0; i < cl.length; ++i) l += cf[i] * cl[i];
		return l;
	};
	var wfblk = function wfblk(out, pos, dat) {
		var s = dat.length;
		var o = shft(pos + 2);
		out[o] = s & 255;
		out[o + 1] = s >> 8;
		out[o + 2] = out[o] ^ 255;
		out[o + 3] = out[o + 1] ^ 255;
		for (var i = 0; i < s; ++i) out[o + i + 4] = dat[i];
		return (o + 4 + s) * 8;
	};
	var wblk = function wblk(dat, out, _final2, syms, lf, df, eb, li, bs, bl, p) {
		wbits(out, p++, _final2);
		++lf[256];
		var _a = hTree(lf, 15),
			dlt = _a.t,
			mlb = _a.l;
		var _b = hTree(df, 15),
			ddt = _b.t,
			mdb = _b.l;
		var _c = lc(dlt),
			lclt = _c.c,
			nlc = _c.n;
		var _d = lc(ddt),
			lcdt = _d.c,
			ndc = _d.n;
		var lcfreq = new u16(19);
		for (var i = 0; i < lclt.length; ++i) ++lcfreq[lclt[i] & 31];
		for (var i = 0; i < lcdt.length; ++i) ++lcfreq[lcdt[i] & 31];
		var _e = hTree(lcfreq, 7),
			lct = _e.t,
			mlcb = _e.l;
		var nlcc = 19;
		for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc);
		var flen = bl + 5 << 3;
		var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
		var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
		if (bs >= 0 && flen <= ftlen && flen <= dtlen) return wfblk(out, p, dat.subarray(bs, bs + bl));
		var lm, ll, dm, dl;
		wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
		if (dtlen < ftlen) {
			lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
			var llm = hMap(lct, mlcb, 0);
			wbits(out, p, nlc - 257);
			wbits(out, p + 5, ndc - 1);
			wbits(out, p + 10, nlcc - 4);
			p += 14;
			for (var i = 0; i < nlcc; ++i) wbits(out, p + 3 * i, lct[clim[i]]);
			p += 3 * nlcc;
			var lcts = [lclt, lcdt];
			for (var it = 0; it < 2; ++it) {
				var clct = lcts[it];
				for (var i = 0; i < clct.length; ++i) {
					var len = clct[i] & 31;
					wbits(out, p, llm[len]), p += lct[len];
					if (len > 15) wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
				}
			}
		} else {
			lm = flm, ll = flt, dm = fdm, dl = fdt;
		}
		for (var i = 0; i < li; ++i) {
			var sym = syms[i];
			if (sym > 255) {
				var len = sym >> 18 & 31;
				wbits16(out, p, lm[len + 257]), p += ll[len + 257];
				if (len > 7) wbits(out, p, sym >> 23 & 31), p += fleb[len];
				var dst = sym & 31;
				wbits16(out, p, dm[dst]), p += dl[dst];
				if (dst > 3) wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
			} else {
				wbits16(out, p, lm[sym]), p += ll[sym];
			}
		}
		wbits16(out, p, lm[256]);
		return p + ll[256];
	};
	var deo = new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
	var et = new u8(0);
	var dflt = function dflt(dat, lvl, plvl, pre, post, st) {
		var s = st.z || dat.length;
		var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
		var w = o.subarray(pre, o.length - post);
		var lst = st.l;
		var pos = (st.r || 0) & 7;
		if (lvl) {
			if (pos) w[0] = st.r >> 3;
			var opt = deo[lvl - 1];
			var n = opt >> 13,
				c = opt & 8191;
			var msk_1 = (1 << plvl) - 1;
			var prev = st.p || new u16(32768),
				head = st.h || new u16(msk_1 + 1);
			var bs1_1 = Math.ceil(plvl / 3),
				bs2_1 = 2 * bs1_1;
			var hsh = function hsh(i) {
				return (dat[i] ^ dat[i + 1] << bs1_1 ^ dat[i + 2] << bs2_1) & msk_1;
			};
			var syms = new i32(25000);
			var lf = new u16(288),
				df = new u16(32);
			var lc_1 = 0,
				eb = 0,
				i = st.i || 0,
				li = 0,
				wi = st.w || 0,
				bs = 0;
			for (; i + 2 < s; ++i) {
				var hv = hsh(i);
				var imod = i & 32767,
					pimod = head[hv];
				prev[imod] = pimod;
				head[hv] = imod;
				if (wi <= i) {
					var rem = s - i;
					if ((lc_1 > 7000 || li > 24576) && (rem > 423 || !lst)) {
						pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
						li = lc_1 = eb = 0, bs = i;
						for (var j = 0; j < 286; ++j) lf[j] = 0;
						for (var j = 0; j < 30; ++j) df[j] = 0;
					}
					var l = 2,
						d = 0,
						ch_1 = c,
						dif = imod - pimod & 32767;
					if (rem > 2 && hv == hsh(i - dif)) {
						var maxn = Math.min(n, rem) - 1;
						var maxd = Math.min(32767, i);
						var ml = Math.min(258, rem);
						while (dif <= maxd && --ch_1 && imod != pimod) {
							if (dat[i + l] == dat[i + l - dif]) {
								var nl = 0;
								for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl);
								if (nl > l) {
									l = nl, d = dif;
									if (nl > maxn) break;
									var mmd = Math.min(dif, nl - 2);
									var md = 0;
									for (var j = 0; j < mmd; ++j) {
										var ti = i - dif + j & 32767;
										var pti = prev[ti];
										var cd = ti - pti & 32767;
										if (cd > md) md = cd, pimod = ti;
									}
								}
							}
							imod = pimod, pimod = prev[imod];
							dif += imod - pimod & 32767;
						}
					}
					if (d) {
						syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
						var lin = revfl[l] & 31,
							din = revfd[d] & 31;
						eb += fleb[lin] + fdeb[din];
						++lf[257 + lin];
						++df[din];
						wi = i + l;
						++lc_1;
					} else {
						syms[li++] = dat[i];
						++lf[dat[i]];
					}
				}
			}
			for (i = Math.max(i, wi); i < s; ++i) {
				syms[li++] = dat[i];
				++lf[dat[i]];
			}
			pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
			if (!lst) {
				st.r = pos & 7 | w[pos / 8 | 0] << 3;
				pos -= 7;
				st.h = head, st.p = prev, st.i = i, st.w = wi;
			}
		} else {
			for (var i = st.w || 0; i < s + lst; i += 65535) {
				var e = i + 65535;
				if (e >= s) {
					w[pos / 8 | 0] = lst;
					e = s;
				}
				pos = wfblk(w, pos + 1, dat.subarray(i, e));
			}
			st.i = s;
		}
		return slc(o, 0, pre + shft(pos) + post);
	};
	var crct = function () {
		var t = new Int32Array(256);
		for (var i = 0; i < 256; ++i) {
			var c = i,
				k = 9;
			while (--k) c = (c & 1 && -306674912) ^ c >>> 1;
			t[i] = c;
		}
		return t;
	}();
	var crc = function crc() {
		var c = -1;
		return {
			p: function p(d) {
				var cr = c;
				for (var i = 0; i < d.length; ++i) cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
				c = cr;
			},
			d: function d() {
				return ~c;
			}
		};
	};
	var dopt = function dopt(dat, opt, pre, post, st) {
		if (!st) {
			st = {
				l: 1
			};
			if (opt.dictionary) {
				var dict = opt.dictionary.subarray(-32768);
				var newDat = new u8(dict.length + dat.length);
				newDat.set(dict);
				newDat.set(dat, dict.length);
				dat = newDat;
				st.w = dict.length;
			}
		}
		return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, st);
	};
	var mrg = function mrg(a, b) {
		var o = {};
		for (var k in a) o[k] = a[k];
		for (var k in b) o[k] = b[k];
		return o;
	};
	var wbytes = function wbytes(d, b, v) {
		for (; v; ++b) d[b] = v, v >>>= 8;
	};
	function deflateSync(data, opts) {
		return dopt(data, opts || {}, 0, 0);
	}
	var fltn = function fltn(d, p, t, o) {
		for (var k in d) {
			var val = d[k],
				n = p + k,
				op = o;
			if (Array.isArray(val)) op = mrg(o, val[1]), val = val[0];
			if (val instanceof u8) t[n] = [val, op];else {
				t[n += '/'] = [new u8(0), op];
				fltn(val, n, t, o);
			}
		}
	};
	var te = typeof TextEncoder != 'undefined' && new TextEncoder();
	var td = typeof TextDecoder != 'undefined' && new TextDecoder();
	var tds = 0;
	try {
		td.decode(et, {
			stream: true
		});
		tds = 1;
	} catch (e) {}
	function strToU8(str, latin1) {
		if (latin1) {
			var ar_1 = new u8(str.length);
			for (var i = 0; i < str.length; ++i) ar_1[i] = str.charCodeAt(i);
			return ar_1;
		}
		if (te) return te.encode(str);
		var l = str.length;
		var ar = new u8(str.length + (str.length >> 1));
		var ai = 0;
		var w = function w(v) {
			ar[ai++] = v;
		};
		for (var i = 0; i < l; ++i) {
			if (ai + 5 > ar.length) {
				var n = new u8(ai + 8 + (l - i << 1));
				n.set(ar);
				ar = n;
			}
			var c = str.charCodeAt(i);
			if (c < 128 || latin1) w(c);else if (c < 2048) w(192 | c >> 6), w(128 | c & 63);else if (c > 55295 && c < 57344) c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);else w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
		}
		return slc(ar, 0, ai);
	}
	var exfl = function exfl(ex) {
		var le = 0;
		if (ex) {
			for (var k in ex) {
				var l = ex[k].length;
				if (l > 65535) err(9);
				le += l + 4;
			}
		}
		return le;
	};
	var wzh = function wzh(d, b, f, fn, u, c, ce, co) {
		var fl = fn.length,
			ex = f.extra,
			col = co && co.length;
		var exl = exfl(ex);
		wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
		if (ce != null) d[b++] = 20, d[b++] = f.os;
		d[b] = 20, b += 2;
		d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
		d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
		var dt = new Date(f.mtime == null ? Date.now() : f.mtime),
			y = dt.getFullYear() - 1980;
		if (y < 0 || y > 119) err(10);
		wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
		if (c != -1) {
			wbytes(d, b, f.crc);
			wbytes(d, b + 4, c < 0 ? -c - 2 : c);
			wbytes(d, b + 8, f.size);
		}
		wbytes(d, b + 12, fl);
		wbytes(d, b + 14, exl), b += 16;
		if (ce != null) {
			wbytes(d, b, col);
			wbytes(d, b + 6, f.attrs);
			wbytes(d, b + 10, ce), b += 14;
		}
		d.set(fn, b);
		b += fl;
		if (exl) {
			for (var k in ex) {
				var exf = ex[k],
					l = exf.length;
				wbytes(d, b, +k);
				wbytes(d, b + 2, l);
				d.set(exf, b + 4), b += 4 + l;
			}
		}
		if (col) d.set(co, b), b += col;
		return b;
	};
	var wzf = function wzf(o, b, c, d, e) {
		wbytes(o, b, 0x6054B50);
		wbytes(o, b + 8, c);
		wbytes(o, b + 10, c);
		wbytes(o, b + 12, d);
		wbytes(o, b + 16, e);
	};
	function zipSync(data, opts) {
		if (!opts) opts = {};
		var r = {};
		var files = [];
		fltn(data, '', r, opts);
		var o = 0;
		var tot = 0;
		for (var fn in r) {
			var _a = r[fn],
				file = _a[0],
				p = _a[1];
			var compression = p.level == 0 ? 0 : 8;
			var f = strToU8(fn),
				s = f.length;
			var com = p.comment,
				m = com && strToU8(com),
				ms = m && m.length;
			var exl = exfl(p.extra);
			if (s > 65535) err(11);
			var d = compression ? deflateSync(file, p) : file,
				l = d.length;
			var c = crc();
			c.p(file);
			files.push(mrg(p, {
				size: file.length,
				crc: c.d(),
				c: d,
				f: f,
				m: m,
				u: s != fn.length || m && com.length != ms,
				o: o,
				compression: compression
			}));
			o += 30 + s + exl + l;
			tot += 76 + 2 * (s + exl) + (ms || 0) + l;
		}
		var out = new u8(tot + 22),
			oe = o,
			cdl = tot - o;
		for (var i = 0; i < files.length; ++i) {
			var f = files[i];
			wzh(out, f.o, f, f.f, f.u, f.c.length);
			var badd = 30 + f.f.length + exfl(f.extra);
			out.set(f.c, f.o + badd);
			wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
		}
		wzf(out, o, files.length, cdl, oe);
		return out;
	}

	var ROOT_FILE_NAME = 'root';
	var header = "#usda 1.0\n(\n    customLayerData = {\n        string creator = \"PlayCanvas UsdzExporter\"\n    }\n    metersPerUnit = 1\n    upAxis = \"Y\"\n)\n";
	var materialListTemplate = function materialListTemplate(materials) {
		return "\ndef \"Materials\"\n{\n    " + materials.join('\n') + "\n}\n";
	};
	var meshTemplate = function meshTemplate(faceVertexCounts, indices, normals, positions, uv0, uv1) {
		return "\ndef \"Mesh\"\n{\n    def Mesh \"Mesh\"\n    {\n        int[] faceVertexCounts = [" + faceVertexCounts + "]\n        int[] faceVertexIndices = [" + indices + "]\n        normal3f[] normals = [" + normals + "] (\n            interpolation = \"vertex\"\n        )\n        point3f[] points = [" + positions + "]\n        texCoord2f[] primvars:st = [" + uv0 + "] (\n            interpolation = \"vertex\"\n        )\n        texCoord2f[] primvars:st1 = [" + uv1 + "] (\n            interpolation = \"vertex\"\n        )\n        uniform token subdivisionScheme = \"none\"\n    }\n}\n";
	};
	var meshInstanceTemplate = function meshInstanceTemplate(nodeName, meshRefPath, worldMatrix, materialRefPath) {
		return "\ndef Xform \"" + nodeName + "\" (\n    prepend references = " + meshRefPath + "\n)\n{\n    matrix4d xformOp:transform = " + worldMatrix + "\n    uniform token[] xformOpOrder = [\"xformOp:transform\"]\n\n    rel material:binding = " + materialRefPath + "\n}\n";
	};
	var materialValueTemplate = function materialValueTemplate(type, name, value) {
		return "                    " + type + " inputs:" + name + " = " + value;
	};
	var UsdzExporter = function (_CoreExporter) {
		_inheritsLoose(UsdzExporter, _CoreExporter);
		function UsdzExporter() {
			var _this;
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
			_this = _CoreExporter.call.apply(_CoreExporter, [this].concat(args)) || this;
			_this.meshMap = void 0;
			_this.materialMap = void 0;
			_this.materials = void 0;
			_this.textureMap = void 0;
			_this.nodeNames = void 0;
			_this.files = void 0;
			return _this;
		}
		var _proto = UsdzExporter.prototype;
		_proto.init = function init() {
			this.meshMap = new Map();
			this.textureMap = new Map();
			this.materialMap = new Map();
			this.materials = [];
			this.files = {};
			this.nodeNames = new Set();
		};
		_proto.done = function done() {
			this.meshMap = null;
			this.textureMap = null;
			this.materialMap = null;
			this.materials = null;
			this.files = null;
			this.nodeNames = null;
		};
		_proto.build = function build(entity, options) {
			var _this2 = this;
			if (options === void 0) {
				options = {};
			}
			this.init();
			this.addFile(null, ROOT_FILE_NAME);
			var allMeshInstances = [];
			if (entity) {
				var renders = entity.findComponents("render");
				renders.forEach(function (render) {
					allMeshInstances.push.apply(allMeshInstances, render.meshInstances);
				});
			}
			var rootContent = '';
			allMeshInstances.forEach(function (meshInstance) {
				rootContent += _this2.buildMeshInstance(meshInstance);
			});
			rootContent += materialListTemplate(this.materials);
			this.addFile(null, ROOT_FILE_NAME, '', rootContent);
			var textureOptions = {
				maxTextureSize: options.maxTextureSize
			};
			var textureArray = Array.from(this.textureMap.keys());
			var promises = [];
			var _loop = function _loop() {
				var mimeType = 'image/png' ;
				var texture = textureArray[i];
				var texturePromise = _this2.textureToCanvas(texture, textureOptions).then(function (canvas) {
					if (canvas) {
						return new Promise(function (resolve) {
							return canvas.toBlob(resolve, mimeType, 1);
						}).then(function (blob) {
							return blob.arrayBuffer();
						});
					}
					console.warn("Export of texture " + texture.name + " is not currently supported.");
					return new Promise(function (resolve) {
						return resolve(null);
					});
				});
				promises.push(texturePromise);
			};
			for (var i = 0; i < textureArray.length; i++) {
				_loop();
			}
			var finalData = Promise.all(promises).then(function (values) {
				values.forEach(function (textureArrayBuffer, index) {
					var texture = textureArray[index];
					var ids = _this2.getTextureFileIds(texture);
					_this2.files[ids.fileName] = new Uint8Array(textureArrayBuffer);
				});
				_this2.alignFiles();
				var arraybuffer = zipSync(_this2.files, {
					level: 0
				});
				_this2.done();
				return arraybuffer;
			});
			return finalData;
		};
		_proto.alignFiles = function alignFiles() {
			var offset = 0;
			for (var filename in this.files) {
				var file = this.files[filename];
				var headerSize = 34 + filename.length;
				offset += headerSize;
				var offsetMod64 = offset & 63;
				if (offsetMod64 !== 4) {
					var padLength = 64 - offsetMod64;
					var padding = new Uint8Array(padLength);
					this.files[filename] = [file, {
						extra: {
							12345: padding
						}
					}];
				}
				offset = file.length;
			}
		};
		_proto.getFileIds = function getFileIds(category, name, ref, extension) {
			if (extension === void 0) {
				extension = 'usda';
			}
			var fileName = (category ? category + "/" : '') + (name + "." + extension);
			var refName = "@./" + fileName + "@</" + ref + ">";
			return {
				name: name,
				fileName: fileName,
				refName: refName
			};
		};
		_proto.getTextureFileIds = function getTextureFileIds(texture) {
			return this.getFileIds('texture', "Texture_" + texture.id, 'Texture', 'png');
		};
		_proto.addFile = function addFile(category, uniqueId, refName, content) {
			if (refName === void 0) {
				refName = '';
			}
			if (content === void 0) {
				content = null;
			}
			var contentU8 = null;
			if (content) {
				content = header + '\n' + content;
				contentU8 = strToU8(content);
			}
			var ids = this.getFileIds(category, uniqueId, refName);
			this.files[ids.fileName] = contentU8;
			return ids.refName;
		};
		_proto.getMaterialRef = function getMaterialRef(material) {
			var materialRef = this.materialMap.get(material);
			if (!materialRef) {
				materialRef = this.buildMaterial(material);
				this.materialMap.set(material, materialRef);
			}
			return materialRef;
		};
		_proto.getMeshRef = function getMeshRef(mesh) {
			var meshRef = this.meshMap.get(mesh);
			if (!meshRef) {
				meshRef = this.buildMesh(mesh);
				this.meshMap.set(mesh, meshRef);
			}
			return meshRef;
		};
		_proto.buildArray2 = function buildArray2(array) {
			var components = [];
			var count = array.length;
			for (var i = 0; i < count; i += 2) {
				components.push("(" + array[i] + ", " + (1 - array[i + 1]) + ")");
			}
			return components.join(', ');
		};
		_proto.buildArray3 = function buildArray3(array) {
			var components = [];
			var count = array.length;
			for (var i = 0; i < count; i += 3) {
				components.push("(" + array[i] + ", " + array[i + 1] + ", " + array[i + 2] + ")");
			}
			return components.join(', ');
		};
		_proto.buildMat4 = function buildMat4(mat) {
			var data = mat.data;
			var vectors = [];
			for (var i = 0; i < 16; i += 4) {
				vectors.push("(" + data[i] + ", " + data[i + 1] + ", " + data[i + 2] + ", " + data[i + 3] + ")");
			}
			return "( " + vectors.join(', ') + " )";
		};
		_proto.buildMaterial = function buildMaterial(material) {
			var _this3 = this;
			var materialName = "Material_" + material.id;
			var materialPath = "/Materials/" + materialName;
			var materialPropertyPath = function materialPropertyPath(property) {
				return "<" + materialPath + property + ">";
			};
			var buildTexture = function buildTexture(texture, textureIds, mapType, uvChannel, tiling, offset, rotation, tintColor) {
				return "\n                def Shader \"Transform2d_" + mapType + "\" (\n                    sdrMetadata = {\n                        string role = \"math\"\n                    }\n                )\n                {\n                    uniform token info:id = \"UsdTransform2d\"\n                    float2 inputs:in.connect = " + materialPropertyPath("/uvReader_" + uvChannel + ".outputs:result") + "\n                    float inputs:rotation = " + rotation + "\n                    float2 inputs:scale = (" + tiling.x + ", " + tiling.y + ")\n                    float2 inputs:translation = (" + offset.x + ", " + offset.y + ")\n                    float2 outputs:result\n                }\n\n                def Shader \"Texture_" + texture.id + "_" + mapType + "\"\n                {\n                    uniform token info:id = \"UsdUVTexture\"\n                    asset inputs:file = @" + textureIds.fileName + "@\n                    float2 inputs:st.connect = " + materialPropertyPath("/Transform2d_" + mapType + ".outputs:result") + "\n                    token inputs:wrapS = \"repeat\"\n                    token inputs:wrapT = \"repeat\"\n                    float4 inputs:scale = (" + tintColor.r + ", " + tintColor.g + ", " + tintColor.b + ", " + tintColor.a + ")\n                    float outputs:r\n                    float outputs:g\n                    float outputs:b\n                    float3 outputs:rgb\n                    float outputs:a\n                }\n            ";
			};
			var inputs = [];
			var samplers = [];
			var addTexture = function addTexture(textureSlot, uniform, propType, propName, valueName, handleOpacity, tintTexture) {
				if (handleOpacity === void 0) {
					handleOpacity = false;
				}
				if (tintTexture === void 0) {
					tintTexture = false;
				}
				var texture = material[textureSlot];
				if (texture) {
					var textureIds = _this3.getTextureFileIds(texture);
					_this3.textureMap.set(texture, textureIds.refName);
					var channel = material[textureSlot + 'Channel'] || 'rgb';
					var textureValue = materialPropertyPath("/" + textureIds.name + "_" + valueName + ".outputs:" + channel);
					inputs.push(materialValueTemplate(propType, propName + ".connect", textureValue));
					if (handleOpacity) {
						if (material.alphaTest > 0.0) ;
					}
					var tiling = material[textureSlot + 'Tiling'];
					var offset = material[textureSlot + 'Offset'];
					var rotation = material[textureSlot + 'Rotation'];
					var uvChannel = material[textureSlot + 'Uv'] === 1 ? 'st1' : 'st';
					var tintColor = tintTexture && uniform ? uniform : playcanvas.Color.WHITE;
					samplers.push(buildTexture(texture, textureIds, valueName, uvChannel, tiling, offset, rotation, tintColor));
				} else if (uniform) {
					var value = propType === 'float' ? "" + uniform : "(" + uniform.r + ", " + uniform.g + ", " + uniform.b + ")";
					inputs.push(materialValueTemplate(propType, propName, value));
				}
			};
			addTexture('diffuseMap', material.diffuse, 'color3f', 'diffuseColor', 'diffuse', false, true);
			if (material.transparent || material.alphaTest > 0.0) {
				addTexture('opacityMap', material.opacity, 'float', 'opacity', 'opacity', true);
			}
			addTexture('normalMap', null, 'normal3f', 'normal', 'normal');
			addTexture('emissiveMap', material.emissive, 'color3f', 'emissiveColor', 'emissive', false, true);
			addTexture('aoMap', null, 'float', 'occlusion', 'occlusion');
			addTexture('metalnessMap', material.metalness, 'float', 'metallic', 'metallic');
			addTexture('glossMap', material.gloss, 'float', 'roughness', 'roughness');
			var materialObject = "\n            def Material \"" + materialName + "\"\n            {\n                def Shader \"PreviewSurface\"\n                {\n                    uniform token info:id = \"UsdPreviewSurface\"\n" + inputs.join('\n') + "\n                    int inputs:useSpecularWorkflow = 0\n                    token outputs:surface\n                }\n\n                token outputs:surface.connect = " + materialPropertyPath('/PreviewSurface.outputs:surface') + "\n\n                def Shader \"uvReader_st\"\n                {\n                    uniform token info:id = \"UsdPrimvarReader_float2\"\n                    token inputs:varname = \"st\"\n                    float2 inputs:fallback = (0.0, 0.0)\n                    float2 outputs:result\n                }\n\n                def Shader \"uvReader_st1\"\n                {\n                    uniform token info:id = \"UsdPrimvarReader_float2\"\n                    token inputs:varname = \"st1\"\n                    float2 inputs:fallback = (0.0, 0.0)\n                    float2 outputs:result\n                }\n\n                " + samplers.join('\n') + "\n            }\n        ";
			this.materials.push(materialObject);
			return materialPropertyPath('');
		};
		_proto.buildMesh = function buildMesh(mesh) {
			var positions = [];
			var indices = [];
			var normals = [];
			var uv0 = [];
			var uv1 = [];
			mesh.getVertexStream(playcanvas.SEMANTIC_POSITION, positions);
			mesh.getVertexStream(playcanvas.SEMANTIC_NORMAL, normals);
			mesh.getVertexStream(playcanvas.SEMANTIC_TEXCOORD0, uv0);
			mesh.getVertexStream(playcanvas.SEMANTIC_TEXCOORD1, uv1);
			mesh.getIndices(indices);
			var indicesCount = indices.length || positions.length;
			var faceVertexCounts = Array(indicesCount / 3).fill(3).join(', ');
			if (!indices.length) {
				for (var i = 0; i < indicesCount; i++) indices[i] = i;
			}
			var numVerts = positions.length / 3;
			normals = normals.length ? normals : Array(numVerts * 3).fill(0);
			uv0 = uv0.length ? uv0 : Array(numVerts * 2).fill(0);
			uv1 = uv1.length ? uv1 : Array(numVerts * 2).fill(0);
			positions = this.buildArray3(positions);
			normals = this.buildArray3(normals);
			uv0 = this.buildArray2(uv0);
			uv1 = this.buildArray2(uv1);
			var meshObject = meshTemplate(faceVertexCounts, indices, normals, positions, uv0, uv1);
			var refPath = this.addFile('mesh', "Mesh_" + mesh.id, 'Mesh', meshObject);
			return refPath;
		};
		_proto.buildMeshInstance = function buildMeshInstance(meshInstance) {
			var meshRefPath = this.getMeshRef(meshInstance.mesh);
			var materialRefPath = this.getMaterialRef(meshInstance.material);
			var worldMatrix = this.buildMat4(meshInstance.node.getWorldTransform());
			var name = meshInstance.node.name.replace(/[^a-z0-9]/gi, '_');
			var nodeName = name;
			while (this.nodeNames.has(nodeName)) {
				nodeName = name + "_" + Math.random().toString(36).slice(2, 7);
			}
			this.nodeNames.add(nodeName);
			return meshInstanceTemplate(nodeName, meshRefPath, worldMatrix, materialRefPath);
		};
		return UsdzExporter;
	}(CoreExporter);

	var ARRAY_BUFFER = 34962;
	var ELEMENT_ARRAY_BUFFER = 34963;
	var getIndexComponentType = function getIndexComponentType(indexFormat) {
		switch (indexFormat) {
			case playcanvas.INDEXFORMAT_UINT8:
				return 5121;
			case playcanvas.INDEXFORMAT_UINT16:
				return 5123;
			case playcanvas.INDEXFORMAT_UINT32:
				return 5125;
		}
		return 0;
	};
	var getComponentType = function getComponentType(dataType) {
		switch (dataType) {
			case playcanvas.TYPE_INT8:
				return 5120;
			case playcanvas.TYPE_UINT8:
				return 5121;
			case playcanvas.TYPE_INT16:
				return 5122;
			case playcanvas.TYPE_UINT16:
				return 5123;
			case playcanvas.TYPE_INT32:
				return 5124;
			case playcanvas.TYPE_UINT32:
				return 5125;
			case playcanvas.TYPE_FLOAT32:
				return 5126;
		}
		return 0;
	};
	var getAccessorType = function getAccessorType(componentCount) {
		switch (componentCount) {
			case 1:
				return 'SCALAR';
			case 2:
				return 'VEC2';
			case 3:
				return 'VEC3';
			case 4:
				return 'VEC4';
		}
		return 0;
	};
	var getSemantic = function getSemantic(engineSemantic) {
		switch (engineSemantic) {
			case playcanvas.SEMANTIC_POSITION:
				return 'POSITION';
			case playcanvas.SEMANTIC_NORMAL:
				return 'NORMAL';
			case playcanvas.SEMANTIC_TANGENT:
				return 'TANGENT';
			case playcanvas.SEMANTIC_COLOR:
				return 'COLOR_0';
			case playcanvas.SEMANTIC_BLENDINDICES:
				return 'JOINTS_0';
			case playcanvas.SEMANTIC_BLENDWEIGHT:
				return 'WEIGHTS_0';
			case playcanvas.SEMANTIC_TEXCOORD0:
				return 'TEXCOORD_0';
			case playcanvas.SEMANTIC_TEXCOORD1:
				return 'TEXCOORD_1';
			case playcanvas.SEMANTIC_TEXCOORD2:
				return 'TEXCOORD_2';
			case playcanvas.SEMANTIC_TEXCOORD3:
				return 'TEXCOORD_3';
			case playcanvas.SEMANTIC_TEXCOORD4:
				return 'TEXCOORD_4';
			case playcanvas.SEMANTIC_TEXCOORD5:
				return 'TEXCOORD_5';
			case playcanvas.SEMANTIC_TEXCOORD6:
				return 'TEXCOORD_6';
			case playcanvas.SEMANTIC_TEXCOORD7:
				return 'TEXCOORD_7';
		}
	};
	var getFilter = function getFilter(filter) {
		switch (filter) {
			case playcanvas.FILTER_NEAREST:
				return 9728;
			case playcanvas.FILTER_LINEAR:
				return 9729;
			case playcanvas.FILTER_NEAREST_MIPMAP_NEAREST:
				return 9984;
			case playcanvas.FILTER_LINEAR_MIPMAP_NEAREST:
				return 9985;
			case playcanvas.FILTER_NEAREST_MIPMAP_LINEAR:
				return 9986;
			case playcanvas.FILTER_LINEAR_MIPMAP_LINEAR:
				return 9987;
		}
	};
	var getWrap = function getWrap(wrap) {
		switch (wrap) {
			case playcanvas.ADDRESS_CLAMP_TO_EDGE:
				return 33071;
			case playcanvas.ADDRESS_MIRRORED_REPEAT:
				return 33648;
			case playcanvas.ADDRESS_REPEAT:
				return 10497;
		}
	};
	function isCanvasTransparent(canvas) {
		var context = canvas.getContext('2d');
		var pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
		for (var i = 3; i < pixelData.length; i += 4) {
			if (pixelData[i] < 255) {
				return true;
			}
		}
		return false;
	}
	var textureSemantics = ['diffuseMap', 'colorMap', 'normalMap', 'metalnessMap', 'emissiveMap'];
	var GltfExporter = function (_CoreExporter) {
		_inheritsLoose(GltfExporter, _CoreExporter);
		function GltfExporter() {
			return _CoreExporter.apply(this, arguments) || this;
		}
		var _proto = GltfExporter.prototype;
		_proto.collectResources = function collectResources(root) {
			var resources = {
				buffers: [],
				cameras: [],
				entities: [],
				materials: [],
				textures: [],
				entityMeshInstances: [],
				bufferViewMap: new Map(),
				compressableTexture: new Set()
			};
			var materials = resources.materials,
				buffers = resources.buffers,
				entityMeshInstances = resources.entityMeshInstances,
				textures = resources.textures;
			root.forEach(function (entity) {
				resources.entities.push(entity);
			});
			var collectMeshInstances = function collectMeshInstances(meshInstances) {
				meshInstances.forEach(function (meshInstance) {
					var material = meshInstance.material;
					if (materials.indexOf(material) < 0) {
						resources.materials.push(material);
						textureSemantics.forEach(function (semantic) {
							var texture = material[semantic];
							if (texture && textures.indexOf(texture) < 0) {
								if (semantic !== 'normalMap') {
									resources.compressableTexture.add(texture);
								}
								textures.push(texture);
							}
						});
					}
					var node = meshInstance.node;
					var nodeMeshInstances = entityMeshInstances.find(function (e) {
						return e.node === node;
					});
					if (!nodeMeshInstances) {
						nodeMeshInstances = {
							node: node,
							meshInstances: []
						};
						entityMeshInstances.push(nodeMeshInstances);
					}
					nodeMeshInstances.meshInstances.push(meshInstance);
					var mesh = meshInstance.mesh;
					var vertexBuffer = mesh.vertexBuffer;
					if (buffers.indexOf(vertexBuffer) < 0) {
						buffers.unshift(vertexBuffer);
					}
					var indexBuffer = mesh.indexBuffer[0];
					if (buffers.indexOf(indexBuffer) < 0) {
						buffers.push(indexBuffer);
					}
				});
			};
			resources.entities.forEach(function (entity) {
				if (entity.camera) {
					resources.cameras.push(entity.camera);
				}
				if (entity.render && entity.render.enabled) {
					collectMeshInstances(entity.render.meshInstances);
				}
				if (entity.model && entity.model.enabled && entity.model.meshInstances) {
					collectMeshInstances(entity.model.meshInstances);
				}
			});
			return resources;
		};
		_proto.writeBufferViews = function writeBufferViews(resources, json) {
			json.bufferViews = [];
			for (var _iterator = _createForOfIteratorHelperLoose(resources.buffers), _step; !(_step = _iterator()).done;) {
				var buffer = _step.value;
				GltfExporter.writeBufferView(resources, json, buffer);
			}
		};
		GltfExporter.writeBufferView = function writeBufferView(resources, json, buffer) {
			var _json$buffers, _json$buffers$;
			json.buffers = (_json$buffers = json.buffers) != null ? _json$buffers : [];
			json.buffers[0] = (_json$buffers$ = json.buffers[0]) != null ? _json$buffers$ : {
				byteLength: 0
			};
			var bufferInfo = json.buffers[0];
			bufferInfo.byteLength = playcanvas.math.roundUp(bufferInfo.byteLength, 4);
			var offset = bufferInfo.byteLength;
			var addBufferView = function addBufferView(target, byteLength, byteOffset, byteStride) {
				var bufferView = {
					target: target,
					buffer: 0,
					byteLength: byteLength,
					byteOffset: byteOffset,
					byteStride: byteStride
				};
				return json.bufferViews.push(bufferView) - 1;
			};
			var arrayBuffer;
			if (buffer instanceof playcanvas.VertexBuffer) {
				arrayBuffer = buffer.lock();
				var format = buffer.getFormat();
				if (format.interleaved) {
					var bufferViewIndex = addBufferView(ARRAY_BUFFER, arrayBuffer.byteLength, offset, format.size);
					resources.bufferViewMap.set(buffer, [bufferViewIndex]);
				} else {
					var bufferViewIndices = [];
					for (var _iterator2 = _createForOfIteratorHelperLoose(format.elements), _step2; !(_step2 = _iterator2()).done;) {
						var element = _step2.value;
						var _bufferViewIndex = addBufferView(ARRAY_BUFFER, element.size * format.vertexCount, offset + element.offset, element.size);
						bufferViewIndices.push(_bufferViewIndex);
					}
					resources.bufferViewMap.set(buffer, bufferViewIndices);
				}
			} else if (buffer instanceof playcanvas.IndexBuffer) {
				arrayBuffer = buffer.lock();
				var _bufferViewIndex2 = addBufferView(ARRAY_BUFFER, arrayBuffer.byteLength, offset);
				resources.bufferViewMap.set(buffer, [_bufferViewIndex2]);
			} else {
				arrayBuffer = buffer;
				var _bufferViewIndex3 = addBufferView(ELEMENT_ARRAY_BUFFER, arrayBuffer.byteLength, offset);
				resources.bufferViewMap.set(buffer, [_bufferViewIndex3]);
			}
			bufferInfo.byteLength += arrayBuffer.byteLength;
		};
		_proto.writeCameras = function writeCameras(resources, json) {
			if (resources.cameras.length > 0) {
				json.cameras = resources.cameras.map(function (cam) {
					var projection = cam.projection;
					var nearClip = cam.nearClip;
					var farClip = cam.farClip;
					var camera = {};
					if (projection === playcanvas.PROJECTION_ORTHOGRAPHIC) {
						camera.type = 'orthographic';
						camera.orthographic = {
							xmag: 1,
							ymag: 1,
							znear: nearClip,
							zfar: farClip
						};
					} else {
						var fov = cam.fov;
						camera.type = 'perspective';
						camera.perspective = {
							yfov: fov * Math.PI / 180,
							znear: nearClip,
							zfar: farClip
						};
					}
					return camera;
				});
			}
		};
		_proto.attachTexture = function attachTexture(resources, material, destination, name, textureSemantic, json) {
			var texture = material[textureSemantic];
			if (texture) {
				var textureIndex = resources.textures.indexOf(texture);
				if (textureIndex < 0) console.warn("Texture " + texture.name + " wasn't collected.");
				destination[name] = {
					index: textureIndex
				};
				var scale = material[textureSemantic + "Tiling"];
				var offset = material[textureSemantic + "Offset"];
				var rotation = material[textureSemantic + "Rotation"];
				if (scale && !scale.equals(playcanvas.Vec2.ONE) || offset && !offset.equals(playcanvas.Vec2.ZERO) || rotation !== 0) {
					var _json$extensionsUsed, _json$extensionsRequi;
					destination[name].extensions = {
						KHR_texture_transform: {}
					};
					json.extensionsUsed = (_json$extensionsUsed = json.extensionsUsed) != null ? _json$extensionsUsed : [];
					if (json.extensionsUsed.indexOf('KHR_texture_transform') < 0) {
						json.extensionsUsed.push('KHR_texture_transform');
					}
					json.extensionsRequired = (_json$extensionsRequi = json.extensionsRequired) != null ? _json$extensionsRequi : [];
					if (json.extensionsRequired.indexOf('KHR_texture_transform') < 0) {
						json.extensionsRequired.push('KHR_texture_transform');
					}
					if (scale && !scale.equals(playcanvas.Vec2.ONE)) {
						destination[name].extensions.KHR_texture_transform.scale = [scale.x, scale.y];
					}
					if (offset && !offset.equals(playcanvas.Vec2.ZERO)) {
						destination[name].extensions.KHR_texture_transform.offset = [offset.x, offset.y - 1 + scale.y];
					}
					if (rotation !== 0) {
						destination[name].extensions.KHR_texture_transform.rotation = rotation * playcanvas.math.DEG_TO_RAD;
					}
				}
			}
		};
		_proto.writeStandardMaterial = function writeStandardMaterial(resources, mat, output, json) {
			var diffuse = mat.diffuse,
				emissive = mat.emissive,
				opacity = mat.opacity,
				metalness = mat.metalness,
				gloss = mat.gloss,
				glossInvert = mat.glossInvert;
			var pbr = output.pbrMetallicRoughness;
			if (!diffuse.equals(playcanvas.Color.WHITE) || opacity !== 1) {
				pbr.baseColorFactor = [diffuse.r, diffuse.g, diffuse.b, opacity];
			}
			if (metalness !== 1) {
				pbr.metallicFactor = metalness;
			}
			var roughness = glossInvert ? gloss : 1 - gloss;
			if (roughness !== 1) {
				pbr.roughnessFactor = roughness;
			}
			this.attachTexture(resources, mat, pbr, 'baseColorTexture', 'diffuseMap', json);
			this.attachTexture(resources, mat, pbr, 'metallicRoughnessTexture', 'metalnessMap', json);
			if (!emissive.equals(playcanvas.Color.BLACK)) {
				output.emissiveFactor = [emissive.r, emissive.g, emissive.b];
			}
		};
		_proto.writeBasicMaterial = function writeBasicMaterial(resources, mat, output, json) {
			var color = mat.color;
			var pbr = output.pbrMetallicRoughness;
			if (!color.equals(playcanvas.Color.WHITE)) {
				pbr.baseColorFactor = [color.r, color.g, color.b, color];
			}
			this.attachTexture(resources, mat, pbr, 'baseColorTexture', 'colorMap', json);
		};
		_proto.writeMaterials = function writeMaterials(resources, json) {
			var _this = this;
			if (resources.materials.length > 0) {
				json.materials = resources.materials.map(function (mat) {
					var name = mat.name,
						blendType = mat.blendType,
						cull = mat.cull,
						alphaTest = mat.alphaTest;
					var material = {
						pbrMetallicRoughness: {}
					};
					if (name && name.length > 0) {
						material.name = name;
					}
					if (mat instanceof playcanvas.StandardMaterial) {
						_this.writeStandardMaterial(resources, mat, material, json);
					}
					if (mat instanceof playcanvas.BasicMaterial) {
						_this.writeBasicMaterial(resources, mat, material, json);
					}
					if (blendType === playcanvas.BLEND_NORMAL) {
						material.alphaMode = 'BLEND';
					} else if (blendType === playcanvas.BLEND_NONE) {
						if (alphaTest !== 0) {
							material.alphaMode = 'MASK';
							material.alphaCutoff = alphaTest;
						}
					}
					if (cull === playcanvas.CULLFACE_NONE) {
						material.doubleSided = true;
					}
					_this.attachTexture(resources, mat, material, 'normalTexture', 'normalMap', json);
					_this.attachTexture(resources, mat, material, 'occlusionTexture', 'aoMap', json);
					_this.attachTexture(resources, mat, material, 'emissiveTexture', 'emissiveMap', json);
					return material;
				});
			}
		};
		_proto.writeNodes = function writeNodes(resources, json) {
			if (resources.entities.length > 0) {
				json.nodes = resources.entities.map(function (entity) {
					var name = entity.name;
					var t = entity.getLocalPosition();
					var r = entity.getLocalRotation();
					var s = entity.getLocalScale();
					var node = {};
					if (name && name.length > 0) {
						node.name = name;
					}
					if (!t.equals(playcanvas.Vec3.ZERO)) {
						node.translation = [t.x, t.y, t.z];
					}
					if (!r.equals(playcanvas.Quat.IDENTITY)) {
						node.rotation = [r.x, r.y, r.z, r.w];
					}
					if (!s.equals(playcanvas.Vec3.ONE)) {
						node.scale = [s.x, s.y, s.z];
					}
					if (entity.camera && entity.camera.enabled) {
						node.camera = resources.cameras.indexOf(entity.camera);
					}
					var entityMeshInstance = resources.entityMeshInstances.find(function (e) {
						return e.node === entity;
					});
					if (entityMeshInstance) {
						node.mesh = resources.entityMeshInstances.indexOf(entityMeshInstance);
					}
					if (entity.children.length > 0) {
						node.children = [];
						entity.children.forEach(function (child) {
							node.children.push(resources.entities.indexOf(child));
						});
					}
					return node;
				});
			}
		};
		_proto.writeMeshes = function writeMeshes(resources, json) {
			if (resources.entityMeshInstances.length > 0) {
				json.accessors = [];
				json.meshes = [];
				resources.entityMeshInstances.forEach(function (entityMeshInstances) {
					var mesh = {
						primitives: []
					};
					var meshInstances = entityMeshInstances.meshInstances;
					meshInstances.forEach(function (meshInstance) {
						var primitive = GltfExporter.createPrimitive(resources, json, meshInstance.mesh);
						primitive.material = resources.materials.indexOf(meshInstance.material);
						mesh.primitives.push(primitive);
					});
					json.meshes.push(mesh);
				});
			}
		};
		GltfExporter.createPrimitive = function createPrimitive(resources, json, mesh) {
			var primitive = {
				attributes: {}
			};
			var vertexBuffer = mesh.vertexBuffer;
			var format = vertexBuffer.format;
			var interleaved = format.interleaved,
				elements = format.elements;
			var numVertices = vertexBuffer.getNumVertices();
			elements.forEach(function (element, elementIndex) {
				var bufferView = resources.bufferViewMap.get(vertexBuffer);
				if (!bufferView) {
					GltfExporter.writeBufferView(resources, json, vertexBuffer);
					resources.buffers.push(vertexBuffer);
					bufferView = resources.bufferViewMap.get(vertexBuffer);
				}
				var viewIndex = bufferView[interleaved ? 0 : elementIndex];
				var accessor = {
					bufferView: viewIndex,
					byteOffset: interleaved ? element.offset : 0,
					componentType: getComponentType(element.dataType),
					type: getAccessorType(element.numComponents),
					count: numVertices
				};
				var idx = json.accessors.push(accessor) - 1;
				primitive.attributes[getSemantic(element.name)] = idx;
				if (element.name === playcanvas.SEMANTIC_POSITION) {
					var positions = [];
					mesh.getPositions(positions);
					var min = new playcanvas.Vec3();
					var max = new playcanvas.Vec3();
					playcanvas.BoundingBox.computeMinMax(positions, min, max);
					accessor.min = [min.x, min.y, min.z];
					accessor.max = [max.x, max.y, max.z];
				}
			});
			var indexBuffer = mesh.indexBuffer[0];
			if (indexBuffer) {
				var bufferView = resources.bufferViewMap.get(indexBuffer);
				if (!bufferView) {
					GltfExporter.writeBufferView(resources, json, indexBuffer);
					resources.buffers.push(indexBuffer);
					bufferView = resources.bufferViewMap.get(indexBuffer);
				}
				var viewIndex = bufferView[0];
				var accessor = {
					bufferView: viewIndex,
					componentType: getIndexComponentType(indexBuffer.getFormat()),
					count: indexBuffer.getNumIndices(),
					type: 'SCALAR'
				};
				var idx = json.accessors.push(accessor) - 1;
				primitive.indices = idx;
			}
			return primitive;
		};
		_proto.convertTextures = function convertTextures(srcTextures, options) {
			var _this2 = this;
			var textureOptions = {
				maxTextureSize: options.maxTextureSize
			};
			var promises = [];
			srcTextures.forEach(function (srcTexture) {
				var promise = _this2.textureToCanvas(srcTexture, textureOptions);
				promise.then(function (canvas) {
					return new Promise(function (resolve) {
						return resolve(canvas);
					});
				});
				promises.push(promise);
			});
			return promises;
		};
		_proto.writeTextures = function writeTextures(resources, textureCanvases, json, options) {
			var _this3 = this;
			var textures = resources.textures;
			var promises = [];
			var _loop = function _loop(i) {
				var texture = textures[i];
				var canvas = textureCanvases[i];
				var isRGBA = isCanvasTransparent(canvas) || !resources.compressableTexture.has(texture);
				var mimeType = isRGBA ? 'image/png' : 'image/jpeg';
				promises.push(_this3.getBlob(canvas, mimeType).then(function (blob) {
					var reader = new FileReader();
					reader.readAsArrayBuffer(blob);
					return new Promise(function (resolve) {
						reader.onloadend = function () {
							resolve(reader);
						};
					});
				}).then(function (reader) {
					var buffer = _this3.getPaddedArrayBuffer(reader.result);
					GltfExporter.writeBufferView(resources, json, buffer);
					resources.buffers.push(buffer);
					var bufferView = resources.bufferViewMap.get(buffer);
					json.images[i] = {
						mimeType: mimeType,
						bufferView: bufferView[0]
					};
					json.samplers[i] = {
						minFilter: getFilter(texture.minFilter),
						magFilter: getFilter(texture.magFilter),
						wrapS: getWrap(texture.addressU),
						wrapT: getWrap(texture.addressV)
					};
					json.textures[i] = {
						sampler: i,
						source: i
					};
				}));
			};
			for (var i = 0; i < textureCanvases.length; i++) {
				_loop(i);
			}
			return Promise.all(promises);
		};
		_proto.getBlob = function getBlob(canvas, mimeType) {
			if (canvas.toBlob !== undefined) {
				return new Promise(function (resolve) {
					canvas.toBlob(resolve, mimeType);
				});
			}
			var quality = 1.0;
			if (mimeType === 'image/jpeg') {
				quality = 0.92;
			}
			return canvas.convertToBlob({
				type: mimeType,
				quality: quality
			});
		};
		_proto.getPaddedArrayBuffer = function getPaddedArrayBuffer(arrayBuffer, paddingByte) {
			if (paddingByte === void 0) {
				paddingByte = 0;
			}
			var paddedLength = playcanvas.math.roundUp(arrayBuffer.byteLength, 4);
			if (paddedLength !== arrayBuffer.byteLength) {
				var array = new Uint8Array(paddedLength);
				array.set(new Uint8Array(arrayBuffer));
				if (paddingByte !== 0) {
					for (var i = arrayBuffer.byteLength; i < paddedLength; i++) {
						array[i] = paddingByte;
					}
				}
				return array.buffer;
			}
			return arrayBuffer;
		};
		_proto.buildJson = function buildJson(resources, options) {
			var _this4 = this;
			var promises = this.convertTextures(resources.textures, options);
			return Promise.all(promises).then(function () {
				var _ref = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(textureCanvases) {
					var json;
					return _regeneratorRuntime().wrap(function _callee$(_context) {
						while (1) switch (_context.prev = _context.next) {
							case 0:
								json = {
									asset: {
										version: '2.0',
										generator: 'PlayCanvas GltfExporter'
									},
									scenes: [{
										nodes: [0]
									}],
									images: [],
									samplers: [],
									textures: [],
									scene: 0
								};
								_this4.writeBufferViews(resources, json);
								_this4.writeCameras(resources, json);
								_this4.writeMeshes(resources, json);
								_this4.writeMaterials(resources, json);
								_this4.writeNodes(resources, json, options);
								_context.next = 8;
								return _this4.writeTextures(resources, textureCanvases, json, options);
							case 8:
								if (!json.images.length) delete json.images;
								if (!json.samplers.length) delete json.samplers;
								if (!json.textures.length) delete json.textures;
								return _context.abrupt("return", json);
							case 12:
							case "end":
								return _context.stop();
						}
					}, _callee);
				}));
				return function (_x) {
					return _ref.apply(this, arguments);
				};
			}());
		};
		_proto.build = function build(entity, options) {
			if (options === void 0) {
				options = {};
			}
			var resources = this.collectResources(entity);
			return this.buildJson(resources, options).then(function (json) {
				var jsonText = JSON.stringify(json);
				var headerLength = 12;
				var jsonHeaderLength = 8;
				var jsonDataLength = jsonText.length;
				var jsonPaddingLength = 4 - (jsonDataLength & 3) & 3;
				var binaryHeaderLength = 8;
				var binaryDataLength = json.buffers.reduce(function (total, buffer) {
					return playcanvas.math.roundUp(total + buffer.byteLength, 4);
				}, 0);
				var totalLength = headerLength + jsonHeaderLength + jsonDataLength + jsonPaddingLength;
				if (binaryDataLength > 0) {
					totalLength += binaryHeaderLength + binaryDataLength;
				}
				var glbBuffer = new ArrayBuffer(totalLength);
				var glbView = new DataView(glbBuffer);
				glbView.setUint32(0, 0x46546C67, true);
				glbView.setUint32(4, 2, true);
				glbView.setUint32(8, totalLength, true);
				glbView.setUint32(12, jsonDataLength + jsonPaddingLength, true);
				glbView.setUint32(16, 0x4E4F534A, true);
				var offset = headerLength + jsonHeaderLength;
				for (var i = 0; i < jsonDataLength; i++) {
					glbView.setUint8(offset + i, jsonText.charCodeAt(i));
				}
				offset += jsonDataLength;
				for (var _i = 0; _i < jsonPaddingLength; _i++) {
					glbView.setUint8(offset + _i, 0x20);
				}
				offset += jsonPaddingLength;
				if (binaryDataLength > 0) {
					glbView.setUint32(offset, binaryDataLength, true);
					glbView.setUint32(offset + 4, 0x004E4942, true);
					offset += binaryHeaderLength;
					resources.buffers.forEach(function (buffer) {
						var src;
						var bufferViewId = resources.bufferViewMap.get(buffer)[0];
						var bufferOffset = json.bufferViews[bufferViewId].byteOffset;
						if (buffer instanceof ArrayBuffer) {
							src = new Uint8Array(buffer);
						} else {
							var srcBuffer = buffer.lock();
							if (srcBuffer instanceof ArrayBuffer) {
								src = new Uint8Array(srcBuffer);
							} else {
								src = new Uint8Array(srcBuffer.buffer, srcBuffer.byteOffset, srcBuffer.byteLength);
							}
						}
						var dst = new Uint8Array(glbBuffer, offset + bufferOffset, src.byteLength);
						dst.set(src);
					});
				}
				return Promise.resolve(glbBuffer);
			});
		};
		return GltfExporter;
	}(CoreExporter);

	var RenderPassDownsample = function (_RenderPassShaderQuad) {
		_inheritsLoose(RenderPassDownsample, _RenderPassShaderQuad);
		function RenderPassDownsample(device, sourceTexture) {
			var _this;
			_this = _RenderPassShaderQuad.call(this, device) || this;
			_this.sourceTexture = sourceTexture;
			_this.shader = _this.createQuadShader('DownSampleShader', "\n\n            uniform sampler2D sourceTexture;\n            uniform vec2 sourceInvResolution;\n            varying vec2 uv0;\n\n            void main()\n            {\n                float x = sourceInvResolution.x;\n                float y = sourceInvResolution.y;\n\n                vec3 a = texture2D (sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y + 2.0 * y)).rgb;\n                vec3 b = texture2D (sourceTexture, vec2 (uv0.x,           uv0.y + 2.0 * y)).rgb;\n                vec3 c = texture2D (sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y + 2.0 * y)).rgb;\n\n                vec3 d = texture2D (sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y)).rgb;\n                vec3 e = texture2D (sourceTexture, vec2 (uv0.x,           uv0.y)).rgb;\n                vec3 f = texture2D (sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y)).rgb;\n\n                vec3 g = texture2D (sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y - 2.0 * y)).rgb;\n                vec3 h = texture2D (sourceTexture, vec2 (uv0.x,           uv0.y - 2.0 * y)).rgb;\n                vec3 i = texture2D (sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y - 2.0 * y)).rgb;\n\n                vec3 j = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y + y)).rgb;\n                vec3 k = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y + y)).rgb;\n                vec3 l = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y - y)).rgb;\n                vec3 m = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y - y)).rgb;\n\n                vec3 value = e * 0.125;\n                value += (a + c + g + i) * 0.03125;\n                value += (b + d + f + h) * 0.0625;\n                value += (j + k + l + m) * 0.125;\n\n                gl_FragColor = vec4(value, 1.0);\n            }");
			_this.sourceTextureId = device.scope.resolve('sourceTexture');
			_this.sourceInvResolutionId = device.scope.resolve('sourceInvResolution');
			_this.sourceInvResolutionValue = new Float32Array(2);
			return _this;
		}
		var _proto = RenderPassDownsample.prototype;
		_proto.execute = function execute() {
			this.sourceTextureId.setValue(this.sourceTexture);
			this.sourceInvResolutionValue[0] = 1.0 / this.sourceTexture.width;
			this.sourceInvResolutionValue[1] = 1.0 / this.sourceTexture.height;
			this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue);
			_RenderPassShaderQuad.prototype.execute.call(this);
		};
		return RenderPassDownsample;
	}(playcanvas.RenderPassShaderQuad);

	var RenderPassUpsample = function (_RenderPassShaderQuad) {
		_inheritsLoose(RenderPassUpsample, _RenderPassShaderQuad);
		function RenderPassUpsample(device, sourceTexture) {
			var _this;
			_this = _RenderPassShaderQuad.call(this, device) || this;
			_this.sourceTexture = sourceTexture;
			_this.shader = _this.createQuadShader('UpSampleShader', "\n\n            uniform sampler2D sourceTexture;\n            uniform vec2 sourceInvResolution;\n            varying vec2 uv0;\n\n            void main()\n            {\n                float x = sourceInvResolution.x;\n                float y = sourceInvResolution.y;\n\n                vec3 a = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y + y)).rgb;\n                vec3 b = texture2D (sourceTexture, vec2 (uv0.x,     uv0.y + y)).rgb;\n                vec3 c = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y + y)).rgb;\n\n                vec3 d = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y)).rgb;\n                vec3 e = texture2D (sourceTexture, vec2 (uv0.x,     uv0.y)).rgb;\n                vec3 f = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y)).rgb;\n\n                vec3 g = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y - y)).rgb;\n                vec3 h = texture2D (sourceTexture, vec2 (uv0.x,     uv0.y - y)).rgb;\n                vec3 i = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y - y)).rgb;\n\n                vec3 value = e * 4.0;\n                value += (b + d + f + h) * 2.0;\n                value += (a + c + g + i);\n                value *= 1.0 / 16.0;\n\n                gl_FragColor = vec4(value, 1.0);\n            }");
			_this.sourceTextureId = device.scope.resolve('sourceTexture');
			_this.sourceInvResolutionId = device.scope.resolve('sourceInvResolution');
			_this.sourceInvResolutionValue = new Float32Array(2);
			return _this;
		}
		var _proto = RenderPassUpsample.prototype;
		_proto.execute = function execute() {
			this.sourceTextureId.setValue(this.sourceTexture);
			this.sourceInvResolutionValue[0] = 1.0 / this.sourceTexture.width;
			this.sourceInvResolutionValue[1] = 1.0 / this.sourceTexture.height;
			this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue);
			_RenderPassShaderQuad.prototype.execute.call(this);
		};
		return RenderPassUpsample;
	}(playcanvas.RenderPassShaderQuad);

	var RenderPassBloom = function (_RenderPass) {
		_inheritsLoose(RenderPassBloom, _RenderPass);
		function RenderPassBloom(device, sourceTexture, format) {
			var _this;
			_this = _RenderPass.call(this, device) || this;
			_this.bloomTexture = void 0;
			_this.lastMipLevel = 1;
			_this.bloomRenderTarget = void 0;
			_this.textureFormat = void 0;
			_this.renderTargets = [];
			_this.sourceTexture = sourceTexture;
			_this.textureFormat = format;
			_this.bloomRenderTarget = _this.createRenderTarget(0);
			_this.bloomTexture = _this.bloomRenderTarget.colorBuffer;
			return _this;
		}
		var _proto = RenderPassBloom.prototype;
		_proto.destroy = function destroy() {
			this.destroyRenderPasses();
			this.destroyRenderTargets();
		};
		_proto.destroyRenderTargets = function destroyRenderTargets(startIndex) {
			if (startIndex === void 0) {
				startIndex = 0;
			}
			for (var i = startIndex; i < this.renderTargets.length; i++) {
				var rt = this.renderTargets[i];
				rt.destroyTextureBuffers();
				rt.destroy();
			}
			this.renderTargets.length = 0;
		};
		_proto.destroyRenderPasses = function destroyRenderPasses() {
			for (var i = 0; i < this.beforePasses.length; i++) {
				this.beforePasses[i].destroy();
			}
			this.beforePasses.length = 0;
		};
		_proto.createRenderTarget = function createRenderTarget(index) {
			return new playcanvas.RenderTarget({
				depth: false,
				colorBuffer: new playcanvas.Texture(this.device, {
					name: "BloomTexture" + index,
					width: 1,
					height: 1,
					format: this.textureFormat,
					mipmaps: false,
					minFilter: playcanvas.FILTER_LINEAR,
					magFilter: playcanvas.FILTER_LINEAR,
					addressU: playcanvas.ADDRESS_CLAMP_TO_EDGE,
					addressV: playcanvas.ADDRESS_CLAMP_TO_EDGE
				})
			});
		};
		_proto.createRenderTargets = function createRenderTargets(count) {
			for (var i = 0; i < count; i++) {
				var rt = i === 0 ? this.bloomRenderTarget : this.createRenderTarget(i);
				this.renderTargets.push(rt);
			}
		};
		_proto.calcMipLevels = function calcMipLevels(width, height, minSize) {
			var min = Math.min(width, height);
			return Math.floor(Math.log2(min) - Math.log2(minSize));
		};
		_proto.createRenderPasses = function createRenderPasses(numPasses) {
			var device = this.device;
			var passSourceTexture = this.sourceTexture;
			for (var i = 0; i < numPasses; i++) {
				var pass = new RenderPassDownsample(device, passSourceTexture);
				var rt = this.renderTargets[i];
				pass.init(rt, {
					resizeSource: passSourceTexture,
					scaleX: 0.5,
					scaleY: 0.5
				});
				pass.setClearColor(playcanvas.Color.BLACK);
				this.beforePasses.push(pass);
				passSourceTexture = rt.colorBuffer;
			}
			passSourceTexture = this.renderTargets[numPasses - 1].colorBuffer;
			for (var _i = numPasses - 2; _i >= 0; _i--) {
				var _pass = new RenderPassUpsample(device, passSourceTexture);
				var _rt = this.renderTargets[_i];
				_pass.init(_rt);
				_pass.blendState = playcanvas.BlendState.ADDBLEND;
				this.beforePasses.push(_pass);
				passSourceTexture = _rt.colorBuffer;
			}
		};
		_proto.onDisable = function onDisable() {
			var _this$renderTargets$;
			(_this$renderTargets$ = this.renderTargets[0]) == null || _this$renderTargets$.resize(1, 1);
			this.destroyRenderPasses();
			this.destroyRenderTargets(1);
		};
		_proto.frameUpdate = function frameUpdate() {
			_RenderPass.prototype.frameUpdate.call(this);
			var numPasses = this.calcMipLevels(this.sourceTexture.width, this.sourceTexture.height, Math.pow(2, this.lastMipLevel));
			numPasses = Math.max(1, numPasses);
			if (this.renderTargets.length !== numPasses) {
				this.destroyRenderPasses();
				this.destroyRenderTargets(1);
				this.createRenderTargets(numPasses);
				this.createRenderPasses(numPasses);
			}
		};
		return RenderPassBloom;
	}(playcanvas.RenderPass);

	var fragmentShader = "\n    varying vec2 uv0;\n    uniform sampler2D sceneTexture;\n\n    #ifdef BLOOM\n        uniform sampler2D bloomTexture;\n        uniform float bloomIntensity;\n    #endif\n\n    #ifdef GRADING\n        uniform vec3 brightnessContrastSaturation;\n\n        // for all parameters, 1.0 is the no-change value\n        vec3 contrastSaturationBrightness(vec3 color, float brt, float sat, float con)\n        {\n            color = color * brt;\n            float grey = dot(color, vec3(0.3, 0.59, 0.11));\n            color  = mix(vec3(grey), color, sat);\n            return max(mix(vec3(0.5), color, con), 0.0);\n        }\n    \n    #endif\n\n    #ifdef VIGNETTE\n\n        uniform vec4 vignetterParams;\n\n        float vignette(vec2 uv) {\n\n            float inner = vignetterParams.x;\n            float outer = vignetterParams.y;\n            float curvature = vignetterParams.z;\n            float intensity = vignetterParams.w;\n\n            // edge curvature\n            vec2 curve = pow(abs(uv * 2.0 -1.0), vec2(1.0 / curvature));\n\n            // distance to edge\n            float edge = pow(length(curve), curvature);\n\n            // gradient and intensity\n            return 1.0 - intensity * smoothstep(inner, outer, edge);\n        }        \n\n    #endif\n\n    #ifdef FRINGING\n\n        uniform float fringingIntensity;\n\n        vec3 fringing(vec2 uv, vec3 color) {\n\n            // offset depends on the direction from the center, raised to power to make it stronger away from the center\n            vec2 centerDistance = uv0 - 0.5;\n            vec2 offset = fringingIntensity * pow(centerDistance, vec2(2.0, 2.0));\n\n            color.r = texture2D(sceneTexture, uv0 - offset).r;\n            color.b = texture2D(sceneTexture, uv0 + offset).b;\n            return color;\n        }\n\n    #endif\n\n    void main() {\n        vec4 scene = texture2D(sceneTexture, uv0);\n        vec3 result = scene.rgb;\n\n        #ifdef FRINGING\n            result = fringing(uv0, result);\n        #endif\n\n        #ifdef BLOOM\n            vec3 bloom = texture2D(bloomTexture, uv0).rgb;\n            result += bloom * bloomIntensity;\n        #endif\n\n        #ifdef GRADING\n            result = contrastSaturationBrightness(result, brightnessContrastSaturation.x, brightnessContrastSaturation.z, brightnessContrastSaturation.y);\n        #endif\n\n        result = toneMap(result);\n\n        #ifdef VIGNETTE\n            result *= vignette(uv0);\n        #endif\n\n        result = gammaCorrectOutput(result);\n\n        gl_FragColor = vec4(result, scene.a);\n    }\n";
	var RenderPassCompose = function (_RenderPassShaderQuad) {
		_inheritsLoose(RenderPassCompose, _RenderPassShaderQuad);
		function RenderPassCompose(graphicsDevice) {
			var _this;
			_this = _RenderPassShaderQuad.call(this, graphicsDevice) || this;
			_this.sceneTexture = null;
			_this.bloomIntensity = 0.01;
			_this._bloomTexture = null;
			_this._toneMapping = playcanvas.TONEMAP_ACES2;
			_this._gradingEnabled = false;
			_this.gradingSaturation = 1;
			_this.gradingContrast = 1;
			_this.gradingBrightness = 1;
			_this._shaderDirty = true;
			_this._vignetteEnabled = false;
			_this.vignetteInner = 0.5;
			_this.vignetteOuter = 1.0;
			_this.vignetteCurvature = 0.5;
			_this.vignetteIntensity = 0.3;
			_this._fringingEnabled = false;
			_this.fringingIntensity = 10;
			_this._key = '';
			_this.sceneTextureId = graphicsDevice.scope.resolve('sceneTexture');
			_this.bloomTextureId = graphicsDevice.scope.resolve('bloomTexture');
			_this.bloomIntensityId = graphicsDevice.scope.resolve('bloomIntensity');
			_this.bcsId = graphicsDevice.scope.resolve('brightnessContrastSaturation');
			_this.vignetterParamsId = graphicsDevice.scope.resolve('vignetterParams');
			_this.fringingIntensityId = graphicsDevice.scope.resolve('fringingIntensity');
			return _this;
		}
		var _proto = RenderPassCompose.prototype;
		_proto.postInit = function postInit() {
			this.setClearColor(playcanvas.Color.BLACK);
			this.setClearDepth(1.0);
			this.setClearStencil(0);
		};
		_proto.frameUpdate = function frameUpdate() {
			if (this._shaderDirty) {
				this._shaderDirty = false;
				var key = "" + this.toneMapping + ("-" + (this.bloomTexture ? 'bloom' : 'nobloom')) + ("-" + (this.gradingEnabled ? 'grading' : 'nograding')) + ("-" + (this.vignetteEnabled ? 'vignette' : 'novignette')) + ("-" + (this.fringingEnabled ? 'fringing' : 'nofringing'));
				if (this._key !== key) {
					this._key = key;
					var defines = (this.bloomTexture ? "#define BLOOM\n" : '') + (this.gradingEnabled ? "#define GRADING\n" : '') + (this.vignetteEnabled ? "#define VIGNETTE\n" : '') + (this.fringingEnabled ? "#define FRINGING\n" : '');
					var fsChunks = playcanvas.shaderChunks.decodePS + playcanvas.shaderChunks.gamma2_2PS + this.toneMapChunk;
					this.shader = this.createQuadShader("ComposeShader-" + key, defines + fsChunks + fragmentShader);
				}
			}
		};
		_proto.execute = function execute() {
			this.sceneTextureId.setValue(this.sceneTexture);
			if (this._bloomTexture) {
				this.bloomTextureId.setValue(this._bloomTexture);
				this.bloomIntensityId.setValue(this.bloomIntensity);
			}
			if (this._gradingEnabled) {
				this.bcsId.setValue([this.gradingBrightness, this.gradingContrast, this.gradingSaturation]);
			}
			if (this._vignetteEnabled) {
				this.vignetterParamsId.setValue([this.vignetteInner, this.vignetteOuter, this.vignetteCurvature, this.vignetteIntensity]);
			}
			if (this._fringingEnabled) {
				this.fringingIntensityId.setValue(this.fringingIntensity / 1024);
			}
			_RenderPassShaderQuad.prototype.execute.call(this);
		};
		_createClass(RenderPassCompose, [{
			key: "bloomTexture",
			get: function get() {
				return this._bloomTexture;
			},
			set: function set(value) {
				if (this._bloomTexture !== value) {
					this._bloomTexture = value;
					this._shaderDirty = true;
				}
			}
		}, {
			key: "gradingEnabled",
			get: function get() {
				return this._gradingEnabled;
			},
			set: function set(value) {
				if (this._gradingEnabled !== value) {
					this._gradingEnabled = value;
					this._shaderDirty = true;
				}
			}
		}, {
			key: "vignetteEnabled",
			get: function get() {
				return this._vignetteEnabled;
			},
			set: function set(value) {
				if (this._vignetteEnabled !== value) {
					this._vignetteEnabled = value;
					this._shaderDirty = true;
				}
			}
		}, {
			key: "fringingEnabled",
			get: function get() {
				return this._fringingEnabled;
			},
			set: function set(value) {
				if (this._fringingEnabled !== value) {
					this._fringingEnabled = value;
					this._shaderDirty = true;
				}
			}
		}, {
			key: "toneMapping",
			get: function get() {
				return this._toneMapping;
			},
			set: function set(value) {
				if (this._toneMapping !== value) {
					this._toneMapping = value;
					this._shaderDirty = true;
				}
			}
		}, {
			key: "toneMapChunk",
			get: function get() {
				switch (this.toneMapping) {
					case playcanvas.TONEMAP_LINEAR:
						return playcanvas.shaderChunks.tonemappingLinearPS;
					case playcanvas.TONEMAP_FILMIC:
						return playcanvas.shaderChunks.tonemappingFilmicPS;
					case playcanvas.TONEMAP_HEJL:
						return playcanvas.shaderChunks.tonemappingHejlPS;
					case playcanvas.TONEMAP_ACES:
						return playcanvas.shaderChunks.tonemappingAcesPS;
					case playcanvas.TONEMAP_ACES2:
						return playcanvas.shaderChunks.tonemappingAces2PS;
				}
				return playcanvas.shaderChunks.tonemappingNonePS;
			}
		}]);
		return RenderPassCompose;
	}(playcanvas.RenderPassShaderQuad);

	var RenderPassTAA = function (_RenderPassShaderQuad) {
		_inheritsLoose(RenderPassTAA, _RenderPassShaderQuad);
		function RenderPassTAA(device, sourceTexture) {
			var _this;
			_this = _RenderPassShaderQuad.call(this, device) || this;
			_this.accumulationTexture = void 0;
			_this.sourceTexture = sourceTexture;
			_this.shader = _this.createQuadShader('TaaResolveShader', "\n\n            uniform sampler2D sourceTexture;\n            varying vec2 uv0;\n\n            void main()\n            {\n                vec4 src = texture2D(sourceTexture, uv0);\n                gl_FragColor = src;\n            }");
			_this.sourceTextureId = device.scope.resolve('sourceTexture');
			_this.blendState = new playcanvas.BlendState(true, playcanvas.BLENDEQUATION_ADD, playcanvas.BLENDMODE_CONSTANT, playcanvas.BLENDMODE_ONE_MINUS_CONSTANT);
			_this.setup();
			return _this;
		}
		var _proto = RenderPassTAA.prototype;
		_proto.destroy = function destroy() {
			if (this.renderTarget) {
				this.renderTarget.destroyTextureBuffers();
				this.renderTarget.destroy();
				this.renderTarget = null;
			}
		};
		_proto.setup = function setup() {
			var device = this.device;
			var texture = new playcanvas.Texture(device, {
				name: 'TAA Accumulation Texture',
				width: 4,
				height: 4,
				format: this.sourceTexture.format,
				mipmaps: false,
				minFilter: playcanvas.FILTER_LINEAR,
				magFilter: playcanvas.FILTER_LINEAR,
				addressU: playcanvas.ADDRESS_CLAMP_TO_EDGE,
				addressV: playcanvas.ADDRESS_CLAMP_TO_EDGE
			});
			this.accumulationTexture = texture;
			var rt = new playcanvas.RenderTarget({
				colorBuffer: texture,
				depth: false
			});
			this.init(rt, {
				resizeSource: this.sourceTexture
			});
			this.setClearColor(playcanvas.Color.BLACK);
		};
		_proto.execute = function execute() {
			this.sourceTextureId.setValue(this.sourceTexture);
			var blend = 0.05;
			this.device.setBlendColor(blend, blend, blend, blend);
			_RenderPassShaderQuad.prototype.execute.call(this);
			this.setClearColor();
		};
		return RenderPassTAA;
	}(playcanvas.RenderPassShaderQuad);

	var RenderPassCameraFrame = function (_RenderPass) {
		_inheritsLoose(RenderPassCameraFrame, _RenderPass);
		function RenderPassCameraFrame(app, options) {
			var _this;
			if (options === void 0) {
				options = {};
			}
			_this = _RenderPass.call(this, app.graphicsDevice) || this;
			_this.app = void 0;
			_this.scenePass = void 0;
			_this.composePass = void 0;
			_this.bloomPass = void 0;
			_this._bloomEnabled = true;
			_this._renderTargetScale = 1;
			_this._rt = null;
			_this.app = app;
			_this.options = _this.sanitizeOptions(options);
			_this.setupRenderPasses(_this.options);
			return _this;
		}
		var _proto = RenderPassCameraFrame.prototype;
		_proto.destroy = function destroy() {
			if (this._rt) {
				this._rt.destroyTextureBuffers();
				this._rt.destroy();
				this._rt = null;
			}
			this.beforePasses.forEach(function (pass) {
				return pass.destroy();
			});
			this.beforePasses = null;
		};
		_proto.sanitizeOptions = function sanitizeOptions(options) {
			var defaults = {
				camera: null,
				samples: 2,
				sceneColorMap: true,
				lastGrabLayerId: playcanvas.LAYERID_SKYBOX,
				lastGrabLayerIsTransparent: false,
				lastSceneLayerId: playcanvas.LAYERID_IMMEDIATE,
				lastSceneLayerIsTransparent: true,
				taaEnabled: false
			};
			return Object.assign({}, defaults, options);
		};
		_proto.setupRenderPasses = function setupRenderPasses(options) {
			var app = this.app,
				device = this.device;
			var scene = app.scene,
				renderer = app.renderer;
			var composition = scene.layers;
			var cameraComponent = options.camera;
			var targetRenderTarget = cameraComponent.renderTarget;
			var format = device.getRenderableHdrFormat() || playcanvas.PIXELFORMAT_RGBA8;
			var sceneTexture = new playcanvas.Texture(device, {
				name: 'SceneTexture',
				width: 4,
				height: 4,
				format: format,
				mipmaps: false,
				minFilter: playcanvas.FILTER_LINEAR,
				magFilter: playcanvas.FILTER_LINEAR,
				addressU: playcanvas.ADDRESS_CLAMP_TO_EDGE,
				addressV: playcanvas.ADDRESS_CLAMP_TO_EDGE
			});
			var rt = new playcanvas.RenderTarget({
				colorBuffer: sceneTexture,
				depth: true,
				samples: options.samples
			});
			this._rt = rt;
			this.scenePass = new playcanvas.RenderPassForward(device, composition, scene, renderer);
			this.scenePass.init(rt, {
				resizeSource: targetRenderTarget,
				scaleX: this.renderTargetScale,
				scaleY: this.renderTargetScale
			});
			var lastLayerId = options.sceneColorMap ? options.lastGrabLayerId : options.lastSceneLayerId;
			var lastLayerIsTransparent = options.sceneColorMap ? options.lastGrabLayerIsTransparent : options.lastSceneLayerIsTransparent;
			var clearRenderTarget = true;
			var lastAddedIndex = 0;
			lastAddedIndex = this.scenePass.addLayers(composition, cameraComponent, lastAddedIndex, clearRenderTarget, lastLayerId, lastLayerIsTransparent);
			clearRenderTarget = false;
			var colorGrabPass;
			var scenePassTransparent;
			if (options.sceneColorMap) {
				colorGrabPass = new playcanvas.RenderPassColorGrab(device);
				colorGrabPass.source = rt;
				scenePassTransparent = new playcanvas.RenderPassForward(device, composition, scene, renderer);
				scenePassTransparent.init(rt);
				lastAddedIndex = scenePassTransparent.addLayers(composition, cameraComponent, lastAddedIndex, clearRenderTarget, options.lastSceneLayerId, options.lastSceneLayerIsTransparent);
			}
			var taaPass;
			var sceneTextureWithTaa = sceneTexture;
			if (options.taaEnabled) {
				taaPass = new RenderPassTAA(device, sceneTexture);
				sceneTextureWithTaa = taaPass.accumulationTexture;
			}
			this.bloomPass = new RenderPassBloom(app.graphicsDevice, sceneTextureWithTaa, format);
			this.composePass = new RenderPassCompose(app.graphicsDevice);
			this.composePass.sceneTexture = sceneTextureWithTaa;
			this.composePass.bloomTexture = this.bloomPass.bloomTexture;
			this.composePass.init(targetRenderTarget);
			var afterPass = new playcanvas.RenderPassForward(device, composition, scene, renderer);
			afterPass.init(targetRenderTarget);
			afterPass.addLayers(composition, cameraComponent, lastAddedIndex, clearRenderTarget);
			var allPasses = [this.scenePass, colorGrabPass, scenePassTransparent, taaPass, this.bloomPass, this.composePass, afterPass];
			this.beforePasses = allPasses.filter(function (element) {
				return element !== undefined;
			});
		};
		_createClass(RenderPassCameraFrame, [{
			key: "renderTargetScale",
			get: function get() {
				return this._renderTargetScale;
			},
			set: function set(value) {
				this._renderTargetScale = value;
				if (this.scenePass) {
					this.scenePass.options.scaleX = value;
					this.scenePass.options.scaleY = value;
				}
			}
		}, {
			key: "bloomEnabled",
			get: function get() {
				return this._bloomEnabled;
			},
			set: function set(value) {
				if (this._bloomEnabled !== value) {
					this._bloomEnabled = value;
					this.composePass.bloomTexture = value ? this.bloomPass.bloomTexture : null;
					this.bloomPass.enabled = value;
				}
			}
		}, {
			key: "lastMipLevel",
			get: function get() {
				return this.bloomPass.lastMipLevel;
			},
			set: function set(value) {
				this.bloomPass.lastMipLevel = value;
			}
		}]);
		return RenderPassCameraFrame;
	}(playcanvas.RenderPass);

	var tmpV1$5 = new playcanvas.Vec3();
	var tmpM1$1 = new playcanvas.Mat4();
	var tmpM2 = new playcanvas.Mat4();
	var xstart = new playcanvas.Vec3();
	var xdir = new playcanvas.Vec3();
	var MIN_GIZMO_SCALE = 1e-4;
	var PERS_SCALE_RATIO = 0.3;
	var ORTHO_SCALE_RATIO = 0.32;
	var GIZMO_LOCAL = 'local';
	var GIZMO_WORLD = 'world';
	var Gizmo = function (_EventHandler) {
		_inheritsLoose(Gizmo, _EventHandler);
		function Gizmo(app, camera, layer) {
			var _this;
			_this = _EventHandler.call(this) || this;
			_this._size = 1;
			_this._scale = 1;
			_this._coordSpace = GIZMO_WORLD;
			_this._app = void 0;
			_this._device = void 0;
			_this._camera = void 0;
			_this._layer = void 0;
			_this.nodes = [];
			_this.root = void 0;
			_this.intersectData = [];
			_this._app = app;
			_this._device = app.graphicsDevice;
			_this._camera = camera;
			_this._layer = layer;
			_this._createGizmo();
			_this._updateScale();
			_this._onPointerDown = function (e) {
				if (!_this.root.enabled || document.pointerLockElement) {
					return;
				}
				var selection = _this._getSelection(e.offsetX, e.offsetY);
				if (selection[0]) {
					e.preventDefault();
				}
				_this.fire(Gizmo.EVENT_POINTERDOWN, e.offsetX, e.offsetY, selection[0]);
			};
			_this._onPointerMove = function (e) {
				if (!_this.root.enabled || document.pointerLockElement) {
					return;
				}
				var selection = _this._getSelection(e.offsetX, e.offsetY);
				if (selection[0]) {
					e.preventDefault();
				}
				_this.fire(Gizmo.EVENT_POINTERMOVE, e.offsetX, e.offsetY, selection[0]);
			};
			_this._onPointerUp = function (e) {
				if (!_this.root.enabled || document.pointerLockElement) {
					return;
				}
				_this.fire(Gizmo.EVENT_POINTERUP);
			};
			_this._device.canvas.addEventListener('pointerdown', _this._onPointerDown);
			_this._device.canvas.addEventListener('pointermove', _this._onPointerMove);
			_this._device.canvas.addEventListener('pointerup', _this._onPointerUp);
			app.on('update', function () {
				return _this._updateScale();
			});
			app.on('destroy', function () {
				return _this.destroy();
			});
			return _this;
		}
		var _proto = Gizmo.prototype;
		_proto._getProjFrustumWidth = function _getProjFrustumWidth() {
			var gizmoPos = this.root.getPosition();
			var cameraPos = this._camera.entity.getPosition();
			var dist = tmpV1$5.copy(gizmoPos).sub(cameraPos).dot(this._camera.entity.forward);
			return dist * Math.tan(this._camera.fov * playcanvas.math.DEG_TO_RAD / 2);
		};
		_proto._createGizmo = function _createGizmo() {
			this.root = new playcanvas.Entity('gizmo');
			this._app.root.addChild(this.root);
			this.root.enabled = false;
		};
		_proto._updatePosition = function _updatePosition() {
			tmpV1$5.set(0, 0, 0);
			for (var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				tmpV1$5.add(node.getPosition());
			}
			tmpV1$5.mulScalar(1.0 / (this.nodes.length || 1));
			this.root.setPosition(tmpV1$5);
			this.fire(Gizmo.EVENT_POSITIONUPDATE, tmpV1$5);
		};
		_proto._updateRotation = function _updateRotation() {
			tmpV1$5.set(0, 0, 0);
			if (this._coordSpace === GIZMO_LOCAL && this.nodes.length !== 0) {
				tmpV1$5.copy(this.nodes[this.nodes.length - 1].getEulerAngles());
			}
			this.root.setEulerAngles(tmpV1$5);
			this.fire(Gizmo.EVENT_ROTATIONUPDATE, tmpV1$5);
		};
		_proto._updateScale = function _updateScale() {
			if (this._camera.projection === playcanvas.PROJECTION_PERSPECTIVE) {
				this._scale = this._getProjFrustumWidth() * PERS_SCALE_RATIO;
			} else {
				this._scale = this._camera.orthoHeight * ORTHO_SCALE_RATIO;
			}
			this._scale = Math.max(this._scale * this._size, MIN_GIZMO_SCALE);
			this.root.setLocalScale(this._scale, this._scale, this._scale);
			this.fire(Gizmo.EVENT_SCALEUPDATE, this._scale);
		};
		_proto._getSelection = function _getSelection(x, y) {
			var start = this._camera.screenToWorld(x, y, 1);
			var end = this._camera.screenToWorld(x, y, this._camera.farClip);
			var dir = end.clone().sub(start).normalize();
			var selection = [];
			for (var i = 0; i < this.intersectData.length; i++) {
				var _this$intersectData$i = this.intersectData[i],
					meshTriDataList = _this$intersectData$i.meshTriDataList,
					parent = _this$intersectData$i.parent,
					meshInstances = _this$intersectData$i.meshInstances;
				var wtm = parent.getWorldTransform().clone();
				for (var j = 0; j < meshTriDataList.length; j++) {
					var _meshTriDataList$j = meshTriDataList[j],
						tris = _meshTriDataList$j.tris,
						ptm = _meshTriDataList$j.ptm,
						priority = _meshTriDataList$j.priority;
					tmpM1$1.copy(wtm).mul(ptm);
					tmpM2.copy(tmpM1$1).invert();
					tmpM2.transformPoint(start, xstart);
					tmpM2.transformVector(dir, xdir);
					xdir.normalize();
					for (var k = 0; k < tris.length; k++) {
						if (tris[k].intersectRay(xstart, xdir, tmpV1$5)) {
							selection.push({
								dist: tmpM1$1.transformPoint(tmpV1$5).sub(start).length(),
								meshInstances: meshInstances,
								priority: priority
							});
						}
					}
				}
			}
			if (selection.length) {
				selection.sort(function (s0, s1) {
					if (s0.priority !== 0 && s1.priority !== 0) {
						return s1.priority - s0.priority;
					}
					return s0.dist - s1.dist;
				});
				return selection[0].meshInstances;
			}
			return [];
		};
		_proto.attach = function attach(nodes) {
			if (nodes === void 0) {
				nodes = [];
			}
			if (nodes.length === 0) {
				return;
			}
			this.nodes = nodes;
			this._updatePosition();
			this._updateRotation();
			this.fire(Gizmo.EVENT_NODESATTACH);
			this.root.enabled = true;
			this.fire(Gizmo.EVENT_RENDERUPDATE);
		};
		_proto.detach = function detach() {
			this.root.enabled = false;
			this.fire(Gizmo.EVENT_RENDERUPDATE);
			this.fire(Gizmo.EVENT_NODESDETACH);
			this.nodes = [];
		};
		_proto.destroy = function destroy() {
			this.detach();
			this._device.canvas.removeEventListener('pointerdown', this._onPointerDown);
			this._device.canvas.removeEventListener('pointermove', this._onPointerMove);
			this._device.canvas.removeEventListener('pointerup', this._onPointerUp);
			this.root.destroy();
		};
		_createClass(Gizmo, [{
			key: "coordSpace",
			get: function get() {
				return this._coordSpace;
			},
			set: function set(value) {
				this._coordSpace = value != null ? value : GIZMO_WORLD;
				this._updateRotation();
			}
		}, {
			key: "size",
			get: function get() {
				return this._size;
			},
			set: function set(value) {
				this._size = value;
				this._updateScale();
			}
		}]);
		return Gizmo;
	}(playcanvas.EventHandler);
	Gizmo.EVENT_POINTERDOWN = 'pointer:down';
	Gizmo.EVENT_POINTERMOVE = 'pointer:move';
	Gizmo.EVENT_POINTERUP = 'pointer:up';
	Gizmo.EVENT_POSITIONUPDATE = 'position:update';
	Gizmo.EVENT_ROTATIONUPDATE = 'rotation:update';
	Gizmo.EVENT_SCALEUPDATE = 'scale:update';
	Gizmo.EVENT_NODESATTACH = 'nodes:attach';
	Gizmo.EVENT_NODESDETACH = 'nodes:detach';
	Gizmo.EVENT_RENDERUPDATE = 'render:update';

	var tmpV1$4 = new playcanvas.Vec3();
	var tmpV2$4 = new playcanvas.Vec3();
	var tmpV3$1 = new playcanvas.Vec3();
	var tmpQ1$3 = new playcanvas.Quat();
	var pointDelta = new playcanvas.Vec3();
	var VEC3_AXES = Object.keys(tmpV1$4);
	var FACING_EPSILON = 0.2;
	var SPANLINE_SIZE = 1e3;
	var ROTATE_SCALE = 900;
	var RED_COLOR = new playcanvas.Color(1, 0.3, 0.3);
	var SEMI_RED_COLOR = new playcanvas.Color(1, 0.3, 0.3, 0.6);
	var GREEN_COLOR = new playcanvas.Color(0.3, 1, 0.3);
	var SEMI_GREEN_COLOR = new playcanvas.Color(0.3, 1, 0.3, 0.6);
	var BLUE_COLOR = new playcanvas.Color(0.3, 0.3, 1);
	var SEMI_BLUE_COLOR = new playcanvas.Color(0.3, 0.3, 1, 0.6);
	var YELLOW_COLOR = new playcanvas.Color(1, 1, 0.5);
	var WHITE_COLOR = new playcanvas.Color(1, 1, 1);
	var SEMI_WHITE_COLOR = new playcanvas.Color(1, 1, 1, 0.6);
	var GRAY_COLOR = new playcanvas.Color(0.5, 0.5, 0.5, 0.5);
	var TransformGizmo = function (_Gizmo) {
		_inheritsLoose(TransformGizmo, _Gizmo);
		function TransformGizmo(app, camera, layer) {
			var _this;
			_this = _Gizmo.call(this, app, camera, layer) || this;
			_this._materials = {
				axis: {
					x: {
						cullBack: _this._createMaterial(SEMI_RED_COLOR),
						cullNone: _this._createMaterial(SEMI_RED_COLOR, playcanvas.CULLFACE_NONE)
					},
					y: {
						cullBack: _this._createMaterial(SEMI_GREEN_COLOR),
						cullNone: _this._createMaterial(SEMI_GREEN_COLOR, playcanvas.CULLFACE_NONE)
					},
					z: {
						cullBack: _this._createMaterial(SEMI_BLUE_COLOR),
						cullNone: _this._createMaterial(SEMI_BLUE_COLOR, playcanvas.CULLFACE_NONE)
					},
					face: _this._createMaterial(SEMI_WHITE_COLOR),
					xyz: _this._createMaterial(SEMI_WHITE_COLOR)
				},
				hover: {
					x: {
						cullBack: _this._createMaterial(RED_COLOR),
						cullNone: _this._createMaterial(RED_COLOR, playcanvas.CULLFACE_NONE)
					},
					y: {
						cullBack: _this._createMaterial(GREEN_COLOR),
						cullNone: _this._createMaterial(GREEN_COLOR, playcanvas.CULLFACE_NONE)
					},
					z: {
						cullBack: _this._createMaterial(BLUE_COLOR),
						cullNone: _this._createMaterial(BLUE_COLOR, playcanvas.CULLFACE_NONE)
					},
					face: _this._createMaterial(YELLOW_COLOR),
					xyz: _this._createMaterial(WHITE_COLOR)
				},
				disabled: {
					cullBack: _this._createMaterial(GRAY_COLOR),
					cullNone: _this._createMaterial(GRAY_COLOR, playcanvas.CULLFACE_NONE)
				}
			};
			_this._guideColors = {
				x: RED_COLOR,
				y: GREEN_COLOR,
				z: BLUE_COLOR,
				face: YELLOW_COLOR
			};
			_this._gizmoRotationStart = new playcanvas.Quat();
			_this._shapes = {};
			_this._shapeMap = new Map();
			_this._hoverShape = null;
			_this._hoverAxis = '';
			_this._hoverIsPlane = false;
			_this._selectedAxis = '';
			_this._selectedIsPlane = false;
			_this._selectionStartPoint = new playcanvas.Vec3();
			_this._selectionStartAngle = 0;
			_this._isRotation = false;
			_this._useUniformScaling = false;
			_this._dragging = false;
			_this._snap = false;
			_this.snapIncrement = 1;
			app.on('update', function () {
				if (!_this.root.enabled) {
					return;
				}
				_this._drawGuideLines();
			});
			_this.on('pointer:down', function (x, y, meshInstance) {
				var shape = _this._shapeMap.get(meshInstance);
				if (shape != null && shape.disabled) {
					return;
				}
				if (_this._dragging) {
					return;
				}
				if (!meshInstance) {
					return;
				}
				_this._selectedAxis = _this._getAxis(meshInstance);
				_this._selectedIsPlane = _this._getIsPlane(meshInstance);
				_this._gizmoRotationStart.copy(_this.root.getRotation());
				var pointInfo = _this._calcPoint(x, y);
				_this._selectionStartPoint.copy(pointInfo.point);
				_this._selectionStartAngle = pointInfo.angle;
				_this._dragging = true;
				_this.fire(TransformGizmo.EVENT_TRANSFORMSTART);
			});
			_this.on('pointer:move', function (x, y, meshInstance) {
				var shape = _this._shapeMap.get(meshInstance);
				if (shape != null && shape.disabled) {
					return;
				}
				_this._hover(meshInstance);
				if (!_this._dragging) {
					return;
				}
				var pointInfo = _this._calcPoint(x, y);
				pointDelta.copy(pointInfo.point).sub(_this._selectionStartPoint);
				var angleDelta = pointInfo.angle - _this._selectionStartAngle;
				_this.fire(TransformGizmo.EVENT_TRANSFORMMOVE, pointDelta, angleDelta);
				_this._hoverAxis = '';
				_this._hoverIsPlane = false;
			});
			_this.on('pointer:up', function () {
				if (!_this._dragging) {
					return;
				}
				_this._dragging = false;
				_this.fire(TransformGizmo.EVENT_TRANSFORMEND);
				_this._selectedAxis = '';
				_this._selectedIsPlane = false;
			});
			_this.on('nodes:detach', function () {
				_this.snap = false;
				_this._hoverAxis = '';
				_this._hoverIsPlane = false;
				_this._hover(null);
				_this.fire('pointer:up');
			});
			return _this;
		}
		var _proto = TransformGizmo.prototype;
		_proto._updateAxisColor = function _updateAxisColor(axis, value) {
			this._guideColors[axis].copy(value);
			this._materials.axis[axis].cullBack.emissive.copy(value);
			this._materials.axis[axis].cullNone.emissive.copy(value);
			this._materials.hover[axis].cullBack.emissive.copy(value);
			this._materials.hover[axis].cullNone.emissive.copy(value);
			this._materials.axis[axis].cullBack.update();
			this._materials.axis[axis].cullNone.update();
			this._materials.hover[axis].cullBack.update();
			this._materials.hover[axis].cullNone.update();
		};
		_proto._getAxis = function _getAxis(meshInstance) {
			if (!meshInstance) {
				return '';
			}
			return meshInstance.node.name.split(":")[1];
		};
		_proto._getIsPlane = function _getIsPlane(meshInstance) {
			if (!meshInstance) {
				return false;
			}
			return meshInstance.node.name.indexOf('plane') !== -1;
		};
		_proto._hover = function _hover(meshInstance) {
			if (this._dragging) {
				return;
			}
			this._hoverAxis = this._getAxis(meshInstance);
			this._hoverIsPlane = this._getIsPlane(meshInstance);
			var shape = this._shapeMap.get(meshInstance) || null;
			if (shape === this._hoverShape) {
				return;
			}
			if (this._hoverShape) {
				this._hoverShape.hover(false);
				this._hoverShape = null;
			}
			if (shape) {
				shape.hover(true);
				this._hoverShape = shape;
			}
			this.fire('render:update');
		};
		_proto._calcPoint = function _calcPoint(x, y) {
			var gizmoPos = this.root.getPosition();
			var mouseWPos = this._camera.screenToWorld(x, y, 1);
			var cameraRot = this._camera.entity.getRotation();
			var rayOrigin = this._camera.entity.getPosition();
			var rayDir = new playcanvas.Vec3();
			var planeNormal = new playcanvas.Vec3();
			var axis = this._selectedAxis;
			var isPlane = this._selectedIsPlane;
			var isRotation = this._isRotation;
			var isUniform = this._useUniformScaling && isPlane;
			var isAllAxes = axis === 'xyz';
			var isFacing = axis === 'face';
			if (this._camera.projection === playcanvas.PROJECTION_PERSPECTIVE) {
				rayDir.copy(mouseWPos).sub(rayOrigin).normalize();
			} else {
				rayOrigin.add(mouseWPos);
				this._camera.entity.getWorldTransform().transformVector(tmpV1$4.set(0, 0, -1), rayDir);
			}
			if (isUniform || isAllAxes || isFacing) {
				planeNormal.copy(rayOrigin).sub(gizmoPos).normalize();
			} else {
				planeNormal[axis] = 1;
				tmpQ1$3.copy(this._gizmoRotationStart).transformVector(planeNormal, planeNormal);
				if (!isPlane && !isRotation) {
					tmpV1$4.copy(rayOrigin).sub(gizmoPos).normalize();
					planeNormal.copy(tmpV1$4.sub(planeNormal.mulScalar(planeNormal.dot(tmpV1$4))).normalize());
				}
			}
			var rayPlaneDot = planeNormal.dot(rayDir);
			var planeDist = gizmoPos.dot(planeNormal);
			var pointPlaneDist = (planeNormal.dot(rayOrigin) - planeDist) / rayPlaneDot;
			var point = rayDir.mulScalar(-pointPlaneDist).add(rayOrigin);
			if (isRotation) {
				point.sub(gizmoPos);
			}
			if (isUniform) {
				tmpV1$4.copy(point).sub(gizmoPos).normalize();
				switch (axis) {
					case 'x':
						tmpV2$4.copy(this.root.up);
						tmpV3$1.copy(this.root.forward).mulScalar(-1);
						break;
					case 'y':
						tmpV2$4.copy(this.root.right);
						tmpV3$1.copy(this.root.forward).mulScalar(-1);
						break;
					case 'z':
						tmpV2$4.copy(this.root.up);
						tmpV3$1.copy(this.root.right);
						break;
					default:
						tmpV2$4.set(0, 0, 0);
						tmpV3$1.set(0, 0, 0);
						break;
				}
				tmpV2$4.add(tmpV3$1).normalize();
				var v = point.sub(gizmoPos).length() * tmpV1$4.dot(tmpV2$4);
				point.set(v, v, v);
				point[axis] = 1;
			} else if (isAllAxes) {
				tmpV1$4.copy(point).sub(gizmoPos).normalize();
				tmpV2$4.copy(this._camera.entity.up).add(this._camera.entity.right).normalize();
				var _v = point.sub(gizmoPos).length() * tmpV1$4.dot(tmpV2$4);
				point.set(_v, _v, _v);
			} else if (!isFacing) {
				if (!isPlane && !isRotation) {
					planeNormal.set(0, 0, 0);
					planeNormal[axis] = 1;
					tmpQ1$3.transformVector(planeNormal, planeNormal);
					point.copy(planeNormal.mulScalar(planeNormal.dot(point)));
				}
				tmpQ1$3.invert().transformVector(point, point);
				if (!isPlane && !isRotation) {
					var _v2 = point[axis];
					point.set(0, 0, 0);
					point[axis] = _v2;
				}
			}
			var angle = 0;
			if (isRotation) {
				var isAxisFacing = isFacing;
				tmpV1$4.copy(rayOrigin).sub(gizmoPos).normalize();
				tmpV2$4.cross(planeNormal, tmpV1$4);
				isAxisFacing || (isAxisFacing = tmpV2$4.length() < FACING_EPSILON);
				if (isAxisFacing) {
					switch (axis) {
						case 'x':
							angle = Math.atan2(point.z, point.y) * playcanvas.math.RAD_TO_DEG;
							break;
						case 'y':
							angle = Math.atan2(point.x, point.z) * playcanvas.math.RAD_TO_DEG;
							break;
						case 'z':
							angle = Math.atan2(point.y, point.x) * playcanvas.math.RAD_TO_DEG;
							break;
						case 'face':
							cameraRot.invert().transformVector(point, tmpV1$4);
							angle = Math.atan2(tmpV1$4.y, tmpV1$4.x) * playcanvas.math.RAD_TO_DEG;
							break;
					}
				} else {
					angle = mouseWPos.dot(tmpV2$4.normalize()) * ROTATE_SCALE;
				}
			}
			return {
				point: point,
				angle: angle
			};
		};
		_proto._drawGuideLines = function _drawGuideLines() {
			var gizmoPos = this.root.getPosition();
			var gizmoRot = tmpQ1$3.copy(this.root.getRotation());
			var checkAxis = this._hoverAxis || this._selectedAxis;
			var checkIsPlane = this._hoverIsPlane || this._selectedIsPlane;
			for (var i = 0; i < VEC3_AXES.length; i++) {
				var axis = VEC3_AXES[i];
				if (checkAxis === 'xyz') {
					this._drawSpanLine(gizmoPos, gizmoRot, axis);
					continue;
				}
				if (checkIsPlane) {
					if (axis !== checkAxis) {
						this._drawSpanLine(gizmoPos, gizmoRot, axis);
					}
				} else {
					if (axis === checkAxis) {
						this._drawSpanLine(gizmoPos, gizmoRot, axis);
					}
				}
			}
		};
		_proto._drawSpanLine = function _drawSpanLine(pos, rot, axis) {
			tmpV1$4.set(0, 0, 0);
			tmpV1$4[axis] = 1;
			tmpV1$4.mulScalar(SPANLINE_SIZE);
			tmpV2$4.copy(tmpV1$4).mulScalar(-1);
			rot.transformVector(tmpV1$4, tmpV1$4);
			rot.transformVector(tmpV2$4, tmpV2$4);
			this._app.drawLine(tmpV1$4.add(pos), tmpV2$4.add(pos), this._guideColors[axis], true);
		};
		_proto._createMaterial = function _createMaterial(color, cull) {
			if (cull === void 0) {
				cull = playcanvas.CULLFACE_BACK;
			}
			var material = new playcanvas.StandardMaterial();
			material.emissive = color;
			material.emissiveVertexColor = true;
			material.cull = cull;
			material.blendType = playcanvas.BLEND_NORMAL;
			if (color.a !== 1) {
				material.opacity = color.a;
			}
			return material;
		};
		_proto._createTransform = function _createTransform() {
			for (var key in this._shapes) {
				var shape = this._shapes[key];
				this.root.addChild(shape.entity);
				this.intersectData.push({
					meshTriDataList: shape.meshTriDataList,
					parent: shape.entity,
					meshInstances: shape.meshInstances
				});
				for (var i = 0; i < shape.meshInstances.length; i++) {
					this._shapeMap.set(shape.meshInstances[i], shape);
				}
			}
		};
		_proto.enableShape = function enableShape(shapeAxis, enabled) {
			if (!this._shapes.hasOwnProperty(shapeAxis)) {
				return;
			}
			this._shapes[shapeAxis].disabled = !enabled;
		};
		_proto.isShapeEnabled = function isShapeEnabled(shapeAxis) {
			if (!this._shapes.hasOwnProperty(shapeAxis)) {
				return false;
			}
			return !this._shapes[shapeAxis].disabled;
		};
		_proto.destroy = function destroy() {
			for (var key in this._shapes) {
				this._shapes[key].destroy();
			}
			_Gizmo.prototype.destroy.call(this);
		};
		_createClass(TransformGizmo, [{
			key: "snap",
			get: function get() {
				return this._snap;
			},
			set: function set(value) {
				this._snap = this.root.enabled && value;
			}
		}, {
			key: "xAxisColor",
			get: function get() {
				return this._materials.axis.x.cullBack.emissive;
			},
			set: function set(value) {
				this._updateAxisColor('x', value);
			}
		}, {
			key: "yAxisColor",
			get: function get() {
				return this._materials.axis.y.cullBack.emissive;
			},
			set: function set(value) {
				this._updateAxisColor('y', value);
			}
		}, {
			key: "zAxisColor",
			get: function get() {
				return this._materials.axis.z.cullBack.emissive;
			},
			set: function set(value) {
				this._updateAxisColor('z', value);
			}
		}]);
		return TransformGizmo;
	}(Gizmo);
	TransformGizmo.EVENT_TRANSFORMSTART = 'transform:start';
	TransformGizmo.EVENT_TRANSFORMMOVE = 'transform:move';
	TransformGizmo.EVENT_TRANSFORMEND = 'transform:end';

	var e1 = new playcanvas.Vec3();
	var e2 = new playcanvas.Vec3();
	var h = new playcanvas.Vec3();
	var s = new playcanvas.Vec3();
	var q = new playcanvas.Vec3();
	var EPSILON = 1e-6;
	var Tri = function () {
		function Tri(v0, v1, v2) {
			this.v0 = new playcanvas.Vec3();
			this.v1 = new playcanvas.Vec3();
			this.v2 = new playcanvas.Vec3();
			this.set(v0, v1, v2);
		}
		var _proto = Tri.prototype;
		_proto.set = function set(v0, v1, v2) {
			this.v0.copy(v0);
			this.v1.copy(v1);
			this.v2.copy(v2);
			return this;
		};
		_proto.intersectRay = function intersectRay(origin, dir, out, epsilon) {
			if (epsilon === void 0) {
				epsilon = EPSILON;
			}
			e1.sub2(this.v1, this.v0);
			e2.sub2(this.v2, this.v0);
			h.cross(dir, e2);
			var a = e1.dot(h);
			if (a > -epsilon && a < epsilon) {
				return false;
			}
			var f = 1 / a;
			s.sub2(origin, this.v0);
			var u = f * s.dot(h);
			if (u < 0 || u > 1) {
				return false;
			}
			q.cross(s, e1);
			var v = f * dir.dot(q);
			if (v < 0 || u + v > 1) {
				return false;
			}
			var t = f * e2.dot(q);
			if (t > epsilon) {
				if (out instanceof playcanvas.Vec3) {
					out.copy(dir).mulScalar(t).add(origin);
				}
				return true;
			}
			return false;
		};
		return Tri;
	}();

	var tmpV1$3 = new playcanvas.Vec3();
	var tmpV2$3 = new playcanvas.Vec3();
	var tmpV3 = new playcanvas.Vec3();
	var MeshTriData = function () {
		function MeshTriData(mesh, priority) {
			if (priority === void 0) {
				priority = 0;
			}
			this._priority = 0;
			this._ptm = new playcanvas.Mat4();
			this.tris = void 0;
			this.setTris(mesh);
			this._priority = priority;
		}
		var _proto = MeshTriData.prototype;
		_proto._trisFromMesh = function _trisFromMesh(mesh, destroy) {
			if (destroy === void 0) {
				destroy = true;
			}
			var tris = [];
			var pos = [];
			var indices = [];
			mesh.getPositions(pos);
			mesh.getIndices(indices);
			if (destroy) {
				mesh.destroy();
			}
			for (var k = 0; k < indices.length; k += 3) {
				var i1 = indices[k];
				var i2 = indices[k + 1];
				var i3 = indices[k + 2];
				tmpV1$3.set(pos[i1 * 3], pos[i1 * 3 + 1], pos[i1 * 3 + 2]);
				tmpV2$3.set(pos[i2 * 3], pos[i2 * 3 + 1], pos[i2 * 3 + 2]);
				tmpV3.set(pos[i3 * 3], pos[i3 * 3 + 1], pos[i3 * 3 + 2]);
				var tri = new Tri(tmpV1$3, tmpV2$3, tmpV3);
				tris.push(tri);
			}
			return tris;
		};
		_proto.setTransform = function setTransform(pos, rot, scale) {
			if (pos === void 0) {
				pos = new playcanvas.Vec3();
			}
			if (rot === void 0) {
				rot = new playcanvas.Quat();
			}
			if (scale === void 0) {
				scale = new playcanvas.Vec3();
			}
			this.ptm.setTRS(pos, rot, scale);
		};
		_proto.setTris = function setTris(mesh) {
			if (!mesh || !(mesh instanceof playcanvas.Mesh)) {
				throw new Error('No mesh provided.');
			}
			this.tris = this._trisFromMesh(mesh);
		};
		_createClass(MeshTriData, [{
			key: "ptm",
			get: function get() {
				return this._ptm;
			}
		}, {
			key: "priority",
			get: function get() {
				return this._priority;
			}
		}]);
		return MeshTriData;
	}();

	var SHADOW_DAMP_SCALE = 0.25;
	var SHADOW_DAMP_OFFSET = 0.75;
	var TORUS_RENDER_SEGMENTS = 80;
	var TORUS_INTERSECT_SEGMENTS = 20;
	var LIGHT_DIR = new playcanvas.Vec3(1, 2, 3);
	var MESH_TEMPLATES = {
		box: playcanvas.createBox,
		cone: playcanvas.createCone,
		cylinder: playcanvas.createCylinder,
		plane: playcanvas.createPlane,
		torus: playcanvas.createTorus
	};
	var tmpV1$2 = new playcanvas.Vec3();
	var tmpV2$2 = new playcanvas.Vec3();
	var tmpQ1$2 = new playcanvas.Quat();
	function createShadowMesh(device, entity, type, templateOpts) {
		if (templateOpts === void 0) {
			templateOpts = {};
		}
		var createTemplate = MESH_TEMPLATES[type];
		if (!createTemplate) {
			throw new Error('Invalid primitive type.');
		}
		var mesh = createTemplate(device, templateOpts);
		var options = {
			positions: [],
			normals: [],
			indices: [],
			colors: []
		};
		mesh.getPositions(options.positions);
		mesh.getNormals(options.normals);
		mesh.getIndices(options.indices);
		var wtm = entity.getWorldTransform().clone().invert();
		tmpV1$2.copy(LIGHT_DIR);
		wtm.transformVector(tmpV1$2, tmpV1$2);
		tmpV1$2.normalize();
		var numVertices = mesh.vertexBuffer.numVertices;
		calculateShadowColors(tmpV1$2, numVertices, options.normals, options.colors);
		return playcanvas.createMesh(device, options.positions, options);
	}
	function calculateShadowColors(lightDir, numVertices, normals, colors) {
		if (colors === void 0) {
			colors = [];
		}
		for (var i = 0; i < numVertices; i++) {
			var x = normals[i * 3];
			var y = normals[i * 3 + 1];
			var z = normals[i * 3 + 2];
			tmpV2$2.set(x, y, z);
			var dot = lightDir.dot(tmpV2$2);
			var shadow = dot * SHADOW_DAMP_SCALE + SHADOW_DAMP_OFFSET;
			colors.push(shadow * 255, shadow * 255, shadow * 255, 1);
		}
		return colors;
	}
	var AxisShape = function () {
		function AxisShape(device, options) {
			var _options$axis, _options$position, _options$rotation, _options$scale, _options$disabled, _options$layers;
			this._position = void 0;
			this._rotation = void 0;
			this._scale = void 0;
			this._layers = [];
			this._disabled = void 0;
			this._defaultMaterial = void 0;
			this._hoverMaterial = void 0;
			this._disabledMaterial = void 0;
			this.device = void 0;
			this.axis = void 0;
			this.entity = void 0;
			this.meshTriDataList = [];
			this.meshInstances = [];
			this.device = device;
			this.axis = (_options$axis = options.axis) != null ? _options$axis : 'x';
			this._position = (_options$position = options.position) != null ? _options$position : new playcanvas.Vec3();
			this._rotation = (_options$rotation = options.rotation) != null ? _options$rotation : new playcanvas.Vec3();
			this._scale = (_options$scale = options.scale) != null ? _options$scale : new playcanvas.Vec3(1, 1, 1);
			this._disabled = (_options$disabled = options.disabled) != null ? _options$disabled : false;
			this._layers = (_options$layers = options.layers) != null ? _options$layers : this._layers;
			if (!(options.defaultMaterial instanceof playcanvas.Material)) {
				throw new Error('No default material provided.');
			}
			this._defaultMaterial = options.defaultMaterial;
			if (!(options.hoverMaterial instanceof playcanvas.Material)) {
				throw new Error('No hover material provided.');
			}
			this._hoverMaterial = options.hoverMaterial;
			if (!(options.disabledMaterial instanceof playcanvas.Material)) {
				throw new Error('No disabled material provided.');
			}
			this._disabledMaterial = options.disabledMaterial;
		}
		var _proto = AxisShape.prototype;
		_proto._createRoot = function _createRoot(name) {
			this.entity = new playcanvas.Entity(name + ':' + this.axis);
			this._updateRootTransform();
		};
		_proto._updateRootTransform = function _updateRootTransform() {
			this.entity.setLocalPosition(this._position);
			this.entity.setLocalEulerAngles(this._rotation);
			this.entity.setLocalScale(this._scale);
		};
		_proto._addRenderMeshes = function _addRenderMeshes(entity, meshes) {
			var meshInstances = [];
			for (var i = 0; i < meshes.length; i++) {
				var mi = new playcanvas.MeshInstance(meshes[i], this._disabled ? this._disabledMaterial : this._defaultMaterial);
				meshInstances.push(mi);
				this.meshInstances.push(mi);
			}
			entity.addComponent('render', {
				meshInstances: meshInstances,
				layers: this._layers,
				castShadows: false
			});
		};
		_proto._addRenderShadowMesh = function _addRenderShadowMesh(entity, type) {
			var mesh = createShadowMesh(this.device, entity, type);
			this._addRenderMeshes(entity, [mesh]);
		};
		_proto.hover = function hover(state) {
			if (this._disabled) {
				return;
			}
			var material = state ? this._hoverMaterial : this._defaultMaterial;
			for (var i = 0; i < this.meshInstances.length; i++) {
				this.meshInstances[i].material = material;
			}
		};
		_proto.destroy = function destroy() {
			this.entity.destroy();
		};
		_createClass(AxisShape, [{
			key: "disabled",
			get: function get() {
				return this._disabled;
			},
			set: function set(value) {
				for (var i = 0; i < this.meshInstances.length; i++) {
					this.meshInstances[i].material = value ? this._disabledMaterial : this._defaultMaterial;
				}
				this._disabled = value != null ? value : false;
			}
		}]);
		return AxisShape;
	}();
	var AxisArrow = function (_AxisShape) {
		_inheritsLoose(AxisArrow, _AxisShape);
		function AxisArrow(device, options) {
			var _this;
			if (options === void 0) {
				options = {};
			}
			_this = _AxisShape.call(this, device, options) || this;
			_this._gap = 0;
			_this._lineThickness = 0.02;
			_this._lineLength = 0.5;
			_this._arrowThickness = 0.12;
			_this._arrowLength = 0.18;
			_this._tolerance = 0.1;
			_this.meshTriDataList = [new MeshTriData(playcanvas.createCone(_this.device)), new MeshTriData(playcanvas.createCylinder(_this.device), 1)];
			_this._createArrow();
			return _this;
		}
		var _proto2 = AxisArrow.prototype;
		_proto2._createArrow = function _createArrow() {
			this._createRoot('arrow');
			this._head = new playcanvas.Entity('head:' + this.axis);
			this.entity.addChild(this._head);
			this._updateHead();
			this._addRenderShadowMesh(this._head, 'cone');
			this._line = new playcanvas.Entity('line:' + this.axis);
			this.entity.addChild(this._line);
			this._updateLine();
			this._addRenderShadowMesh(this._line, 'cylinder');
		};
		_proto2._updateHead = function _updateHead() {
			tmpV1$2.set(0, this._gap + this._arrowLength * 0.5 + this._lineLength, 0);
			tmpQ1$2.set(0, 0, 0, 1);
			tmpV2$2.set(this._arrowThickness, this._arrowLength, this._arrowThickness);
			this.meshTriDataList[0].setTransform(tmpV1$2, tmpQ1$2, tmpV2$2);
			this._head.setLocalPosition(0, this._gap + this._arrowLength * 0.5 + this._lineLength, 0);
			this._head.setLocalScale(this._arrowThickness, this._arrowLength, this._arrowThickness);
		};
		_proto2._updateLine = function _updateLine() {
			tmpV1$2.set(0, this._gap + this._lineLength * 0.5, 0);
			tmpQ1$2.set(0, 0, 0, 1);
			tmpV2$2.set(this._lineThickness + this._tolerance, this._lineLength, this._lineThickness + this._tolerance);
			this.meshTriDataList[1].setTransform(tmpV1$2, tmpQ1$2, tmpV2$2);
			this._line.setLocalPosition(0, this._gap + this._lineLength * 0.5, 0);
			this._line.setLocalScale(this._lineThickness, this._lineLength, this._lineThickness);
		};
		_createClass(AxisArrow, [{
			key: "gap",
			get: function get() {
				return this._gap;
			},
			set: function set(value) {
				this._gap = value != null ? value : 0;
				this._updateHead();
				this._updateLine();
			}
		}, {
			key: "lineThickness",
			get: function get() {
				return this._lineThickness;
			},
			set: function set(value) {
				this._lineThickness = value != null ? value : 1;
				this._updateHead();
				this._updateLine();
			}
		}, {
			key: "lineLength",
			get: function get() {
				return this._lineLength;
			},
			set: function set(value) {
				this._lineLength = value != null ? value : 1;
				this._updateHead();
				this._updateLine();
			}
		}, {
			key: "arrowThickness",
			get: function get() {
				return this._arrowThickness;
			},
			set: function set(value) {
				this._arrowThickness = value != null ? value : 1;
				this._updateHead();
			}
		}, {
			key: "arrowLength",
			get: function get() {
				return this._arrowLength;
			},
			set: function set(value) {
				this._arrowLength = value != null ? value : 1;
				this._updateHead();
			}
		}, {
			key: "tolerance",
			get: function get() {
				return this._tolerance;
			},
			set: function set(value) {
				this._tolerance = value;
				this._updateLine();
			}
		}]);
		return AxisArrow;
	}(AxisShape);
	var AxisBoxCenter = function (_AxisShape2) {
		_inheritsLoose(AxisBoxCenter, _AxisShape2);
		function AxisBoxCenter(device, options) {
			var _this2;
			if (options === void 0) {
				options = {};
			}
			_this2 = _AxisShape2.call(this, device, options) || this;
			_this2._size = 0.12;
			_this2._tolerance = 0.05;
			_this2.meshTriDataList = [new MeshTriData(playcanvas.createBox(_this2.device), 2)];
			_this2._createCenter();
			return _this2;
		}
		var _proto3 = AxisBoxCenter.prototype;
		_proto3._createCenter = function _createCenter() {
			this._createRoot('boxCenter');
			this._updateTransform();
			this._addRenderShadowMesh(this.entity, 'box');
		};
		_proto3._updateTransform = function _updateTransform() {
			this.entity.setLocalScale(this._size, this._size, this._size);
		};
		_createClass(AxisBoxCenter, [{
			key: "size",
			get: function get() {
				return this._size;
			},
			set: function set(value) {
				this._size = value != null ? value : 1;
				this._updateTransform();
			}
		}, {
			key: "tolerance",
			get: function get() {
				return this._tolerance;
			},
			set: function set(value) {
				this._tolerance = value;
				this._updateTransform();
			}
		}]);
		return AxisBoxCenter;
	}(AxisShape);
	var AxisBoxLine = function (_AxisShape3) {
		_inheritsLoose(AxisBoxLine, _AxisShape3);
		function AxisBoxLine(device, options) {
			var _this3;
			if (options === void 0) {
				options = {};
			}
			_this3 = _AxisShape3.call(this, device, options) || this;
			_this3._gap = 0;
			_this3._lineThickness = 0.02;
			_this3._lineLength = 0.5;
			_this3._boxSize = 0.12;
			_this3._tolerance = 0.1;
			_this3.meshTriDataList = [new MeshTriData(playcanvas.createBox(_this3.device)), new MeshTriData(playcanvas.createCylinder(_this3.device), 1)];
			_this3._createBoxLine();
			return _this3;
		}
		var _proto4 = AxisBoxLine.prototype;
		_proto4._createBoxLine = function _createBoxLine() {
			this._createRoot('boxLine');
			this._box = new playcanvas.Entity('box:' + this.axis);
			this.entity.addChild(this._box);
			this._updateBox();
			this._addRenderShadowMesh(this._box, 'box');
			this._line = new playcanvas.Entity('line:' + this.axis);
			this.entity.addChild(this._line);
			this._updateLine();
			this._addRenderShadowMesh(this._line, 'cylinder');
		};
		_proto4._updateBox = function _updateBox() {
			tmpV1$2.set(0, this._gap + this._boxSize * 0.5 + this._lineLength, 0);
			tmpQ1$2.set(0, 0, 0, 1);
			tmpV2$2.set(this._boxSize, this._boxSize, this._boxSize);
			this.meshTriDataList[0].setTransform(tmpV1$2, tmpQ1$2, tmpV2$2);
			this._box.setLocalPosition(0, this._gap + this._boxSize * 0.5 + this._lineLength, 0);
			this._box.setLocalScale(this._boxSize, this._boxSize, this._boxSize);
		};
		_proto4._updateLine = function _updateLine() {
			tmpV1$2.set(0, this._gap + this._lineLength * 0.5, 0);
			tmpQ1$2.set(0, 0, 0, 1);
			tmpV2$2.set(this._lineThickness + this._tolerance, this._lineLength, this._lineThickness + this._tolerance);
			this.meshTriDataList[1].setTransform(tmpV1$2, tmpQ1$2, tmpV2$2);
			this._line.setLocalPosition(0, this._gap + this._lineLength * 0.5, 0);
			this._line.setLocalScale(this._lineThickness, this._lineLength, this._lineThickness);
		};
		_createClass(AxisBoxLine, [{
			key: "gap",
			get: function get() {
				return this._gap;
			},
			set: function set(value) {
				this._gap = value != null ? value : 0;
				this._updateLine();
				this._updateBox();
			}
		}, {
			key: "lineThickness",
			get: function get() {
				return this._lineThickness;
			},
			set: function set(value) {
				this._lineThickness = value != null ? value : 1;
				this._updateLine();
				this._updateBox();
			}
		}, {
			key: "lineLength",
			get: function get() {
				return this._lineLength;
			},
			set: function set(value) {
				this._lineLength = value != null ? value : 1;
				this._updateLine();
				this._updateBox();
			}
		}, {
			key: "boxSize",
			get: function get() {
				return this._boxSize;
			},
			set: function set(value) {
				this._boxSize = value != null ? value : 1;
				this._updateBox();
			}
		}, {
			key: "tolerance",
			get: function get() {
				return this._tolerance;
			},
			set: function set(value) {
				this._tolerance = value;
				this._updateLine();
			}
		}]);
		return AxisBoxLine;
	}(AxisShape);
	var AxisDisk = function (_AxisShape4) {
		_inheritsLoose(AxisDisk, _AxisShape4);
		function AxisDisk(device, options) {
			var _options$tubeRadius, _options$ringRadius, _options$sectorAngle;
			var _this4;
			if (options === void 0) {
				options = {};
			}
			_this4 = _AxisShape4.call(this, device, options) || this;
			_this4._tubeRadius = 0.01;
			_this4._ringRadius = 0.5;
			_this4._sectorAngle = void 0;
			_this4._lightDir = void 0;
			_this4._tolerance = 0.05;
			_this4._tubeRadius = (_options$tubeRadius = options.tubeRadius) != null ? _options$tubeRadius : _this4._tubeRadius;
			_this4._ringRadius = (_options$ringRadius = options.ringRadius) != null ? _options$ringRadius : _this4._ringRadius;
			_this4._sectorAngle = (_options$sectorAngle = options.sectorAngle) != null ? _options$sectorAngle : _this4._sectorAngle;
			_this4.meshTriDataList = [new MeshTriData(_this4._createIntersectTorus())];
			_this4._createDisk();
			return _this4;
		}
		var _proto5 = AxisDisk.prototype;
		_proto5._createIntersectTorus = function _createIntersectTorus() {
			return playcanvas.createTorus(this.device, {
				tubeRadius: this._tubeRadius + this._tolerance,
				ringRadius: this._ringRadius,
				sectorAngle: this._sectorAngle,
				segments: TORUS_INTERSECT_SEGMENTS
			});
		};
		_proto5._createRenderTorus = function _createRenderTorus(sectorAngle) {
			return createShadowMesh(this.device, this.entity, 'torus', {
				tubeRadius: this._tubeRadius,
				ringRadius: this._ringRadius,
				sectorAngle: sectorAngle,
				segments: TORUS_RENDER_SEGMENTS
			});
		};
		_proto5._createDisk = function _createDisk() {
			this._createRoot('disk');
			this._addRenderMeshes(this.entity, [this._createRenderTorus(this._sectorAngle), this._createRenderTorus(360)]);
			this.drag(false);
		};
		_proto5._updateTransform = function _updateTransform() {
			this.meshTriDataList[0].setTris(this._createIntersectTorus());
			this.meshInstances[0].mesh = this._createRenderTorus(this._sectorAngle);
			this.meshInstances[1].mesh = this._createRenderTorus(360);
		};
		_proto5.drag = function drag(state) {
			this.meshInstances[0].visible = !state;
			this.meshInstances[1].visible = state;
		};
		_proto5.hide = function hide(state) {
			if (state) {
				this.meshInstances[0].visible = false;
				this.meshInstances[1].visible = false;
				return;
			}
			this.drag(false);
		};
		_createClass(AxisDisk, [{
			key: "tubeRadius",
			get: function get() {
				return this._tubeRadius;
			},
			set: function set(value) {
				this._tubeRadius = value != null ? value : 0.1;
				this._updateTransform();
			}
		}, {
			key: "ringRadius",
			get: function get() {
				return this._ringRadius;
			},
			set: function set(value) {
				this._ringRadius = value != null ? value : 0.1;
				this._updateTransform();
			}
		}, {
			key: "tolerance",
			get: function get() {
				return this._tolerance;
			},
			set: function set(value) {
				this._tolerance = value;
				this._updateTransform();
			}
		}]);
		return AxisDisk;
	}(AxisShape);
	var AxisPlane = function (_AxisShape5) {
		_inheritsLoose(AxisPlane, _AxisShape5);
		function AxisPlane(device, options) {
			var _this5;
			if (options === void 0) {
				options = {};
			}
			_this5 = _AxisShape5.call(this, device, options) || this;
			_this5._size = 0.2;
			_this5._gap = 0.1;
			_this5.meshTriDataList = [new MeshTriData(playcanvas.createPlane(_this5.device))];
			_this5._createPlane();
			return _this5;
		}
		var _proto6 = AxisPlane.prototype;
		_proto6._getPosition = function _getPosition() {
			var offset = this._size / 2 + this._gap;
			var position = new playcanvas.Vec3(offset, offset, offset);
			position[this.axis] = 0;
			return position;
		};
		_proto6._createPlane = function _createPlane() {
			this._createRoot('plane');
			this._updateTransform();
			this._addRenderShadowMesh(this.entity, 'plane');
		};
		_proto6._updateTransform = function _updateTransform() {
			this.entity.setLocalPosition(this._getPosition());
			this.entity.setLocalEulerAngles(this._rotation);
			this.entity.setLocalScale(this._size, this._size, this._size);
		};
		_createClass(AxisPlane, [{
			key: "size",
			get: function get() {
				return this._size;
			},
			set: function set(value) {
				this._size = value != null ? value : 1;
				this._updateTransform();
			}
		}, {
			key: "gap",
			get: function get() {
				return this._gap;
			},
			set: function set(value) {
				this._gap = value != null ? value : 0;
				this._updateTransform();
			}
		}]);
		return AxisPlane;
	}(AxisShape);

	var tmpV1$1 = new playcanvas.Vec3();
	var tmpV2$1 = new playcanvas.Vec3();
	var tmpQ1$1 = new playcanvas.Quat();
	var TranslateGizmo = function (_TransformGizmo) {
		_inheritsLoose(TranslateGizmo, _TransformGizmo);
		function TranslateGizmo(app, camera, layer) {
			var _this;
			_this = _TransformGizmo.call(this, app, camera, layer) || this;
			_this._shapes = {
				yz: new AxisPlane(_this._device, {
					axis: 'x',
					flipAxis: 'y',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, -90),
					defaultMaterial: _this._materials.axis.x.cullNone,
					hoverMaterial: _this._materials.hover.x.cullNone,
					disabledMaterial: _this._materials.disabled.cullNone
				}),
				xz: new AxisPlane(_this._device, {
					axis: 'y',
					flipAxis: 'z',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, 0),
					defaultMaterial: _this._materials.axis.y.cullNone,
					hoverMaterial: _this._materials.hover.y.cullNone,
					disabledMaterial: _this._materials.disabled.cullNone
				}),
				xy: new AxisPlane(_this._device, {
					axis: 'z',
					flipAxis: 'x',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(90, 0, 0),
					defaultMaterial: _this._materials.axis.z.cullNone,
					hoverMaterial: _this._materials.hover.z.cullNone,
					disabledMaterial: _this._materials.disabled.cullNone
				}),
				x: new AxisArrow(_this._device, {
					axis: 'x',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, -90),
					defaultMaterial: _this._materials.axis.x.cullBack,
					hoverMaterial: _this._materials.hover.x.cullBack,
					disabledMaterial: _this._materials.disabled.cullBack
				}),
				y: new AxisArrow(_this._device, {
					axis: 'y',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, 0),
					defaultMaterial: _this._materials.axis.y.cullBack,
					hoverMaterial: _this._materials.hover.y.cullBack,
					disabledMaterial: _this._materials.disabled.cullBack
				}),
				z: new AxisArrow(_this._device, {
					axis: 'z',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(90, 0, 0),
					defaultMaterial: _this._materials.axis.z.cullBack,
					hoverMaterial: _this._materials.hover.z.cullBack,
					disabledMaterial: _this._materials.disabled.cullBack
				})
			};
			_this._nodeLocalPositions = new Map();
			_this._nodePositions = new Map();
			_this.snapIncrement = 1;
			_this._createTransform();
			_this.on('transform:start', function () {
				_this._storeNodePositions();
			});
			_this.on('transform:move', function (pointDelta) {
				if (_this.snap) {
					pointDelta.mulScalar(1 / _this.snapIncrement);
					pointDelta.round();
					pointDelta.mulScalar(_this.snapIncrement);
				}
				_this._setNodePositions(pointDelta);
			});
			_this.on('nodes:detach', function () {
				_this._nodeLocalPositions.clear();
				_this._nodePositions.clear();
			});
			return _this;
		}
		var _proto = TranslateGizmo.prototype;
		_proto._setArrowProp = function _setArrowProp(prop, value) {
			this._shapes.x[prop] = value;
			this._shapes.y[prop] = value;
			this._shapes.z[prop] = value;
		};
		_proto._setPlaneProp = function _setPlaneProp(prop, value) {
			this._shapes.yz[prop] = value;
			this._shapes.xz[prop] = value;
			this._shapes.xy[prop] = value;
		};
		_proto._storeNodePositions = function _storeNodePositions() {
			for (var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				this._nodeLocalPositions.set(node, node.getLocalPosition().clone());
				this._nodePositions.set(node, node.getPosition().clone());
			}
		};
		_proto._setNodePositions = function _setNodePositions(pointDelta) {
			for (var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				if (this._coordSpace === GIZMO_LOCAL) {
					tmpV1$1.copy(pointDelta);
					node.parent.getWorldTransform().getScale(tmpV2$1);
					tmpV2$1.x = 1 / tmpV2$1.x;
					tmpV2$1.y = 1 / tmpV2$1.y;
					tmpV2$1.z = 1 / tmpV2$1.z;
					tmpQ1$1.copy(node.getLocalRotation()).transformVector(tmpV1$1, tmpV1$1);
					tmpV1$1.mul(tmpV2$1);
					node.setLocalPosition(this._nodeLocalPositions.get(node).clone().add(tmpV1$1));
				} else {
					node.setPosition(this._nodePositions.get(node).clone().add(pointDelta));
				}
			}
			this._updatePosition();
		};
		_createClass(TranslateGizmo, [{
			key: "axisGap",
			get: function get() {
				return this._shapes.x.gap;
			},
			set: function set(value) {
				this._setArrowProp('gap', value);
			}
		}, {
			key: "axisLineThickness",
			get: function get() {
				return this._shapes.x.lineThickness;
			},
			set: function set(value) {
				this._setArrowProp('lineThickness', value);
			}
		}, {
			key: "axisLineLength",
			get: function get() {
				return this._shapes.x.lineLength;
			},
			set: function set(value) {
				this._setArrowProp('lineLength', value);
			}
		}, {
			key: "axisLineTolerance",
			get: function get() {
				return this._shapes.x.tolerance;
			},
			set: function set(value) {
				this._setArrowProp('tolerance', value);
			}
		}, {
			key: "axisArrowThickness",
			get: function get() {
				return this._shapes.x.arrowThickness;
			},
			set: function set(value) {
				this._setArrowProp('arrowThickness', value);
			}
		}, {
			key: "axisArrowLength",
			get: function get() {
				return this._shapes.x.arrowLength;
			},
			set: function set(value) {
				this._setArrowProp('arrowLength', value);
			}
		}, {
			key: "axisPlaneSize",
			get: function get() {
				return this._shapes.yz.size;
			},
			set: function set(value) {
				this._setPlaneProp('size', value);
			}
		}, {
			key: "axisPlaneGap",
			get: function get() {
				return this._shapes.yz.gap;
			},
			set: function set(value) {
				this._setPlaneProp('gap', value);
			}
		}]);
		return TranslateGizmo;
	}(TransformGizmo);

	var tmpV1 = new playcanvas.Vec3();
	var tmpV2 = new playcanvas.Vec3();
	var tmpM1 = new playcanvas.Mat4();
	var tmpQ1 = new playcanvas.Quat();
	var tmpQ2 = new playcanvas.Quat();
	var RotateGizmo = function (_TransformGizmo) {
		_inheritsLoose(RotateGizmo, _TransformGizmo);
		function RotateGizmo(app, camera, layer) {
			var _this;
			_this = _TransformGizmo.call(this, app, camera, layer) || this;
			_this._shapes = {
				z: new AxisDisk(_this._device, {
					axis: 'z',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(90, 0, 90),
					defaultMaterial: _this._materials.axis.z.cullBack,
					hoverMaterial: _this._materials.hover.z.cullBack,
					disabledMaterial: _this._materials.disabled.cullBack,
					sectorAngle: 180
				}),
				x: new AxisDisk(_this._device, {
					axis: 'x',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, -90),
					defaultMaterial: _this._materials.axis.x.cullBack,
					hoverMaterial: _this._materials.hover.x.cullBack,
					disabledMaterial: _this._materials.disabled.cullBack,
					sectorAngle: 180
				}),
				y: new AxisDisk(_this._device, {
					axis: 'y',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, 0),
					defaultMaterial: _this._materials.axis.y.cullBack,
					hoverMaterial: _this._materials.hover.y.cullBack,
					disabledMaterial: _this._materials.disabled.cullBack,
					sectorAngle: 180
				}),
				face: new AxisDisk(_this._device, {
					axis: 'face',
					layers: [_this._layer.id],
					rotation: _this._getLookAtEulerAngles(_this._camera.entity.getPosition()),
					defaultMaterial: _this._materials.axis.face,
					hoverMaterial: _this._materials.hover.face,
					disabledMaterial: _this._materials.disabled.cullBack,
					ringRadius: 0.55
				})
			};
			_this._isRotation = true;
			_this._nodeLocalRotations = new Map();
			_this._nodeRotations = new Map();
			_this._nodeOffsets = new Map();
			_this._guideAngleStartColor = new playcanvas.Color(0, 0, 0, 0.3);
			_this._guideAngleStart = new playcanvas.Vec3();
			_this._guideAngleEnd = new playcanvas.Vec3();
			_this.snapIncrement = 5;
			_this._createTransform();
			_this.on('transform:start', function () {
				var axis = _this._selectedAxis;
				var isFacing = axis === 'face';
				var scale = isFacing ? _this.faceRingRadius : _this.xyzRingRadius;
				_this._storeNodeRotations();
				_this._guideAngleStart.copy(_this._selectionStartPoint).normalize();
				_this._guideAngleStart.mulScalar(scale);
				_this._gizmoRotationStart.transformVector(_this._guideAngleStart, _this._guideAngleStart);
				_this._guideAngleEnd.copy(_this._guideAngleStart);
				_this._drag(true);
			});
			_this.on('transform:move', function (pointDelta, angleDelta) {
				var gizmoPos = _this.root.getPosition();
				var cameraPos = _this._camera.entity.getPosition();
				var axis = _this._selectedAxis;
				var isFacing = axis === 'face';
				if (_this.snap) {
					angleDelta = Math.round(angleDelta / _this.snapIncrement) * _this.snapIncrement;
				}
				_this._setNodeRotations(axis, angleDelta);
				tmpV1.set(0, 0, 0);
				if (isFacing) {
					tmpV1.copy(cameraPos).sub(gizmoPos).normalize();
				} else {
					tmpV1[axis] = 1;
				}
				_this._gizmoRotationStart.transformVector(tmpV1, tmpV1);
				tmpQ1.setFromAxisAngle(tmpV1, angleDelta);
				tmpQ1.transformVector(_this._guideAngleStart, _this._guideAngleEnd);
			});
			_this.on('transform:end', function () {
				_this._drag(false);
			});
			_this.on('nodes:detach', function () {
				_this._nodeLocalRotations.clear();
				_this._nodeRotations.clear();
				_this._nodeOffsets.clear();
			});
			app.on('update', function () {
				var cameraPos = _this._camera.entity.getPosition();
				_this._faceAxisLookAt(cameraPos);
				_this._xyzAxisLookAt(cameraPos);
				if (_this._dragging) {
					var gizmoPos = _this.root.getPosition();
					_this._drawGuideAngleLine(gizmoPos, _this._selectedAxis, _this._guideAngleStart, _this._guideAngleStartColor);
					_this._drawGuideAngleLine(gizmoPos, _this._selectedAxis, _this._guideAngleEnd);
				}
			});
			return _this;
		}
		var _proto = RotateGizmo.prototype;
		_proto._setDiskProp = function _setDiskProp(prop, value) {
			this._shapes.x[prop] = value;
			this._shapes.y[prop] = value;
			this._shapes.z[prop] = value;
		};
		_proto._drawGuideAngleLine = function _drawGuideAngleLine(pos, axis, point, color) {
			if (color === void 0) {
				color = this._guideColors[axis];
			}
			tmpV1.set(0, 0, 0);
			tmpV2.copy(point).mulScalar(this._scale);
			this._app.drawLine(tmpV1.add(pos), tmpV2.add(pos), color, false, this._layer);
		};
		_proto._getLookAtEulerAngles = function _getLookAtEulerAngles(position) {
			tmpV1.set(0, 0, 0);
			tmpM1.setLookAt(tmpV1, position, playcanvas.Vec3.UP);
			tmpQ1.setFromMat4(tmpM1);
			tmpQ1.getEulerAngles(tmpV1);
			tmpV1.x += 90;
			return tmpV1;
		};
		_proto._faceAxisLookAt = function _faceAxisLookAt(position) {
			this._shapes.face.entity.lookAt(position);
			this._shapes.face.entity.rotateLocal(90, 0, 0);
		};
		_proto._xyzAxisLookAt = function _xyzAxisLookAt(position) {
			tmpV1.copy(position).sub(this.root.getPosition());
			tmpQ1.copy(this.root.getRotation()).invert().transformVector(tmpV1, tmpV1);
			var angle = Math.atan2(tmpV1.z, tmpV1.y) * playcanvas.math.RAD_TO_DEG;
			this._shapes.x.entity.setLocalEulerAngles(0, angle - 90, -90);
			angle = Math.atan2(tmpV1.x, tmpV1.z) * playcanvas.math.RAD_TO_DEG;
			this._shapes.y.entity.setLocalEulerAngles(0, angle, 0);
			angle = Math.atan2(tmpV1.y, tmpV1.x) * playcanvas.math.RAD_TO_DEG;
			this._shapes.z.entity.setLocalEulerAngles(90, 0, angle + 90);
		};
		_proto._drag = function _drag(state) {
			for (var _axis in this._shapes) {
				var shape = this._shapes[_axis];
				if (_axis === this._selectedAxis) {
					shape.drag(state);
				} else {
					shape.hide(state);
				}
			}
			this.fire('render:update');
		};
		_proto._storeNodeRotations = function _storeNodeRotations() {
			var gizmoPos = this.root.getPosition();
			for (var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				this._nodeLocalRotations.set(node, node.getLocalRotation().clone());
				this._nodeRotations.set(node, node.getRotation().clone());
				this._nodeOffsets.set(node, node.getPosition().clone().sub(gizmoPos));
			}
		};
		_proto._setNodeRotations = function _setNodeRotations(axis, angleDelta) {
			var gizmoPos = this.root.getPosition();
			var cameraPos = this._camera.entity.getPosition();
			var isFacing = axis === 'face';
			for (var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				if (isFacing) {
					tmpV1.copy(cameraPos).sub(gizmoPos).normalize();
				} else {
					tmpV1.set(0, 0, 0);
					tmpV1[axis] = 1;
				}
				tmpQ1.setFromAxisAngle(tmpV1, angleDelta);
				if (!isFacing && this._coordSpace === GIZMO_LOCAL) {
					tmpQ2.copy(this._nodeLocalRotations.get(node)).mul(tmpQ1);
					node.setLocalRotation(tmpQ2);
				} else {
					tmpV1.copy(this._nodeOffsets.get(node));
					tmpQ1.transformVector(tmpV1, tmpV1);
					tmpQ2.copy(tmpQ1).mul(this._nodeRotations.get(node));
					node.setEulerAngles(tmpQ2.getEulerAngles());
					node.setPosition(tmpV1.add(gizmoPos));
				}
			}
			if (this._coordSpace === GIZMO_LOCAL) {
				this._updateRotation();
			}
		};
		_createClass(RotateGizmo, [{
			key: "xyzTubeRadius",
			get: function get() {
				return this._shapes.x.tubeRadius;
			},
			set: function set(value) {
				this._setDiskProp('tubeRadius', value);
			}
		}, {
			key: "xyzRingRadius",
			get: function get() {
				return this._shapes.x.ringRadius;
			},
			set: function set(value) {
				this._setDiskProp('ringRadius', value);
			}
		}, {
			key: "faceTubeRadius",
			get: function get() {
				return this._shapes.face.tubeRadius;
			},
			set: function set(value) {
				this._shapes.face.tubeRadius = value;
			}
		}, {
			key: "faceRingRadius",
			get: function get() {
				return this._shapes.face.ringRadius;
			},
			set: function set(value) {
				this._shapes.face.ringRadius = value;
			}
		}, {
			key: "ringTolerance",
			get: function get() {
				return this._shapes.x.tolerance;
			},
			set: function set(value) {
				this._setDiskProp('tolerance', value);
				this._shapes.face.tolerance = value;
			}
		}]);
		return RotateGizmo;
	}(TransformGizmo);

	var ScaleGizmo = function (_TransformGizmo) {
		_inheritsLoose(ScaleGizmo, _TransformGizmo);
		function ScaleGizmo(app, camera, layer) {
			var _this;
			_this = _TransformGizmo.call(this, app, camera, layer) || this;
			_this._shapes = {
				xyz: new AxisBoxCenter(_this._device, {
					axis: 'xyz',
					layers: [_this._layer.id],
					defaultMaterial: _this._materials.axis.xyz,
					hoverMaterial: _this._materials.hover.xyz,
					disabledMaterial: _this._materials.disabled.cullBack
				}),
				yz: new AxisPlane(_this._device, {
					axis: 'x',
					flipAxis: 'y',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, -90),
					defaultMaterial: _this._materials.axis.x.cullNone,
					hoverMaterial: _this._materials.hover.x.cullNone,
					disabledMaterial: _this._materials.disabled.cullNone
				}),
				xz: new AxisPlane(_this._device, {
					axis: 'y',
					flipAxis: 'z',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, 0),
					defaultMaterial: _this._materials.axis.y.cullNone,
					hoverMaterial: _this._materials.hover.y.cullNone,
					disabledMaterial: _this._materials.disabled.cullNone
				}),
				xy: new AxisPlane(_this._device, {
					axis: 'z',
					flipAxis: 'x',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(90, 0, 0),
					defaultMaterial: _this._materials.axis.z.cullNone,
					hoverMaterial: _this._materials.hover.z.cullNone,
					disabledMaterial: _this._materials.disabled.cullNone
				}),
				x: new AxisBoxLine(_this._device, {
					axis: 'x',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, -90),
					defaultMaterial: _this._materials.axis.x.cullBack,
					hoverMaterial: _this._materials.hover.x.cullBack,
					disabledMaterial: _this._materials.disabled.cullBack
				}),
				y: new AxisBoxLine(_this._device, {
					axis: 'y',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(0, 0, 0),
					defaultMaterial: _this._materials.axis.y.cullBack,
					hoverMaterial: _this._materials.hover.y.cullBack,
					disabledMaterial: _this._materials.disabled.cullBack
				}),
				z: new AxisBoxLine(_this._device, {
					axis: 'z',
					layers: [_this._layer.id],
					rotation: new playcanvas.Vec3(90, 0, 0),
					defaultMaterial: _this._materials.axis.z.cullBack,
					hoverMaterial: _this._materials.hover.z.cullBack,
					disabledMaterial: _this._materials.disabled.cullBack
				})
			};
			_this._coordSpace = GIZMO_LOCAL;
			_this._nodeScales = new Map();
			_this.snapIncrement = 1;
			_this._createTransform();
			_this.on('transform:start', function () {
				_this._selectionStartPoint.sub(playcanvas.Vec3.ONE);
				_this._storeNodeScales();
			});
			_this.on('transform:move', function (pointDelta) {
				if (_this.snap) {
					pointDelta.mulScalar(1 / _this.snapIncrement);
					pointDelta.round();
					pointDelta.mulScalar(_this.snapIncrement);
				}
				_this._setNodeScales(pointDelta);
			});
			_this.on('nodes:detach', function () {
				_this._nodeScales.clear();
			});
			return _this;
		}
		var _proto = ScaleGizmo.prototype;
		_proto._setArrowProp = function _setArrowProp(prop, value) {
			this._shapes.x[prop] = value;
			this._shapes.y[prop] = value;
			this._shapes.z[prop] = value;
		};
		_proto._setPlaneProp = function _setPlaneProp(prop, value) {
			this._shapes.yz[prop] = value;
			this._shapes.xz[prop] = value;
			this._shapes.xy[prop] = value;
		};
		_proto._storeNodeScales = function _storeNodeScales() {
			for (var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				this._nodeScales.set(node, node.getLocalScale().clone());
			}
		};
		_proto._setNodeScales = function _setNodeScales(pointDelta) {
			for (var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				node.setLocalScale(this._nodeScales.get(node).clone().mul(pointDelta));
			}
		};
		_createClass(ScaleGizmo, [{
			key: "coordSpace",
			get: function get() {
				return this._coordSpace;
			},
			set: function set(value) {}
		}, {
			key: "uniform",
			get: function get() {
				return this._useUniformScaling;
			},
			set: function set(value) {
				this._useUniformScaling = value != null ? value : true;
			}
		}, {
			key: "axisGap",
			get: function get() {
				return this._shapes.x.gap;
			},
			set: function set(value) {
				this._setArrowProp('gap', value);
			}
		}, {
			key: "axisLineThickness",
			get: function get() {
				return this._shapes.x.lineThickness;
			},
			set: function set(value) {
				this._setArrowProp('lineThickness', value);
			}
		}, {
			key: "axisLineLength",
			get: function get() {
				return this._shapes.x.lineLength;
			},
			set: function set(value) {
				this._setArrowProp('lineLength', value);
			}
		}, {
			key: "axisLineTolerance",
			get: function get() {
				return this._shapes.x.tolerance;
			},
			set: function set(value) {
				this._setArrowProp('tolerance', value);
			}
		}, {
			key: "axisBoxSize",
			get: function get() {
				return this._shapes.x.boxSize;
			},
			set: function set(value) {
				this._setArrowProp('boxSize', value);
			}
		}, {
			key: "axisPlaneSize",
			get: function get() {
				return this._shapes.yz.size;
			},
			set: function set(value) {
				this._setPlaneProp('size', value);
			}
		}, {
			key: "axisPlaneGap",
			get: function get() {
				return this._shapes.yz.gap;
			},
			set: function set(value) {
				this._setPlaneProp('gap', value);
			}
		}, {
			key: "axisCenterSize",
			get: function get() {
				return this._shapes.xyz.size;
			},
			set: function set(value) {
				this._shapes.xyz.size = value;
			}
		}, {
			key: "axisCenterTolerance",
			get: function get() {
				return this._shapes.xyz.tolerance;
			},
			set: function set(value) {
				this._shapes.xyz.tolerance = value;
			}
		}]);
		return ScaleGizmo;
	}(TransformGizmo);

	exports.GIZMO_LOCAL = GIZMO_LOCAL;
	exports.GIZMO_WORLD = GIZMO_WORLD;
	exports.Gizmo = Gizmo;
	exports.GltfExporter = GltfExporter;
	exports.MiniStats = MiniStats;
	exports.RenderPassBloom = RenderPassBloom;
	exports.RenderPassCameraFrame = RenderPassCameraFrame;
	exports.RenderPassCompose = RenderPassCompose;
	exports.RenderPassDownsample = RenderPassDownsample;
	exports.RenderPassTAA = RenderPassTAA;
	exports.RenderPassUpsample = RenderPassUpsample;
	exports.RotateGizmo = RotateGizmo;
	exports.ScaleGizmo = ScaleGizmo;
	exports.TransformGizmo = TransformGizmo;
	exports.TranslateGizmo = TranslateGizmo;
	exports.UsdzExporter = UsdzExporter;

}));
