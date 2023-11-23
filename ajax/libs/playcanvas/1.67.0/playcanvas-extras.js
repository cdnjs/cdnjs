/**
 * @license
 * PlayCanvas Engine v1.67.0 revision ea736291a
 * Copyright 2011-2023 PlayCanvas Ltd. All rights reserved.
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
	var wblk = function wblk(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
		wbits(out, p++, final);
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
				if (textureIndex < 0) console.logWarn("Texture " + texture.name + " wasn't collected.");
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

	var splatCoreVS = "\n    attribute vec3 vertex_position;\n\n    uniform mat4 matrix_model;\n    uniform mat4 matrix_view;\n    uniform mat4 matrix_projection;\n    uniform mat4 matrix_viewProjection;\n\n    uniform vec2 viewport;\n\n    varying vec2 texCoord;\n    varying vec4 color;\n\n    mat3 quatToMat3(vec3 R)\n    {\n        float x = R.x;\n        float y = R.y;\n        float z = R.z;\n        float w = sqrt(1.0 - dot(R, R));\n\n        return mat3(\n            1.0 - 2.0 * (z * z + w * w),\n                2.0 * (y * z + x * w),\n                2.0 * (y * w - x * z),\n\n                2.0 * (y * z - x * w),\n            1.0 - 2.0 * (y * y + w * w),\n                2.0 * (z * w + x * y),\n\n                2.0 * (y * w + x * z),\n                2.0 * (z * w - x * y),\n            1.0 - 2.0 * (y * y + z * z)\n        );\n    }\n\n    uniform vec4 tex_params;\n    uniform sampler2D splatColor;\n    uniform highp sampler2D splatScale;\n    uniform highp sampler2D splatRotation;\n    uniform highp sampler2D splatCenter;\n\n    #ifdef INT_INDICES\n\n        attribute uint vertex_id;\n        ivec2 dataUV;\n        void evalDataUV() {\n\n            // turn vertex_id into int grid coordinates\n            ivec2 textureSize = ivec2(tex_params.xy);\n            vec2 invTextureSize = tex_params.zw;\n\n            int gridV = int(float(vertex_id) * invTextureSize.x);\n            int gridU = int(vertex_id) - gridV * textureSize.x;\n            dataUV = ivec2(gridU, gridV);\n        }\n\n        vec4 getColor() {\n            return texelFetch(splatColor, dataUV, 0);\n        }\n\n        vec3 getScale() {\n            return texelFetch(splatScale, dataUV, 0).xyz;\n        }\n\n        vec3 getRotation() {\n            return texelFetch(splatRotation, dataUV, 0).xyz;\n        }\n\n        vec3 getCenter() {\n            return texelFetch(splatCenter, dataUV, 0).xyz;\n        }\n\n    #else\n\n        // TODO: use texture2DLodEXT on WebGL\n\n        attribute float vertex_id;\n        vec2 dataUV;\n        void evalDataUV() {\n            vec2 textureSize = tex_params.xy;\n            vec2 invTextureSize = tex_params.zw;\n\n            // turn vertex_id into int grid coordinates\n            float gridV = floor(vertex_id * invTextureSize.x);\n            float gridU = vertex_id - (gridV * textureSize.x);\n\n            // convert grid coordinates to uv coordinates with half pixel offset\n            dataUV = vec2(gridU, gridV) * invTextureSize + (0.5 * invTextureSize);\n        }\n\n        vec4 getColor() {\n            return texture2D(splatColor, dataUV);\n        }\n\n        vec3 getScale() {\n            return texture2D(splatScale, dataUV).xyz;\n        }\n\n        vec3 getRotation() {\n            return texture2D(splatRotation, dataUV).xyz;\n        }\n\n        vec3 getCenter() {\n            return texture2D(splatCenter, dataUV).xyz;\n        }\n\n    #endif\n\n    void computeCov3d(in mat3 rot, in vec3 scale, out vec3 covA, out vec3 covB)\n    {\n        // M = S * R\n        float M0 = scale.x * rot[0][0];\n        float M1 = scale.x * rot[0][1];\n        float M2 = scale.x * rot[0][2];\n        float M3 = scale.y * rot[1][0];\n        float M4 = scale.y * rot[1][1];\n        float M5 = scale.y * rot[1][2];\n        float M6 = scale.z * rot[2][0];\n        float M7 = scale.z * rot[2][1];\n        float M8 = scale.z * rot[2][2];\n\n        covA = vec3(\n            M0 * M0 + M3 * M3 + M6 * M6,\n            M0 * M1 + M3 * M4 + M6 * M7,\n            M0 * M2 + M3 * M5 + M6 * M8\n        );\n\n        covB = vec3(\n            M1 * M1 + M4 * M4 + M7 * M7,\n            M1 * M2 + M4 * M5 + M7 * M8,\n            M2 * M2 + M5 * M5 + M8 * M8\n        );\n    }\n\n    vec3 evalCenter() {\n        evalDataUV();\n        return getCenter();\n    }\n\n    #ifndef GL2\n    #ifndef WEBGPU\n    mat3 transpose(in mat3 m) {\n        return mat3(\n            m[0].x, m[1].x, m[2].x,\n            m[0].y, m[1].y, m[2].y,\n            m[0].z, m[1].z, m[2].z\n        );\n    }\n    #endif\n    #endif\n\n    vec4 evalSplat(vec4 centerWorld)\n    {\n        vec4 splat_cam = matrix_view * centerWorld;\n        vec4 splat_proj = matrix_projection * splat_cam;\n\n        // cull behind camera\n        if (splat_proj.z < -splat_proj.w) {\n            return vec4(0.0, 0.0, 2.0, 1.0);\n        }\n\n        vec3 scale = getScale();\n        vec3 rotation = getRotation();\n\n        color = getColor();\n\n        #ifdef DEBUG_RENDER\n            vec3 local = quatToMat3(rotation) * (vertex_position * scale * 2.0) + center;\n            return matrix_viewProjection * matrix_model * vec4(local, 1.0);\n        #else\n            vec3 splat_cova;\n            vec3 splat_covb;\n            computeCov3d(mat3(matrix_model) * quatToMat3(rotation), scale, splat_cova, splat_covb);\n\n            mat3 Vrk = mat3(\n                splat_cova.x, splat_cova.y, splat_cova.z, \n                splat_cova.y, splat_covb.x, splat_covb.y,\n                splat_cova.z, splat_covb.y, splat_covb.z\n            );\n\n            float focal = viewport.x * matrix_projection[0][0];\n\n            mat3 J = mat3(\n                focal / splat_cam.z, 0., -(focal * splat_cam.x) / (splat_cam.z * splat_cam.z), \n                0., focal / splat_cam.z, -(focal * splat_cam.y) / (splat_cam.z * splat_cam.z), \n                0., 0., 0.\n            );\n\n            mat3 W = transpose(mat3(matrix_view));\n            mat3 T = W * J;\n            mat3 cov = transpose(T) * Vrk * T;\n\n            float diagonal1 = cov[0][0] + 0.3;\n            float offDiagonal = cov[0][1];\n            float diagonal2 = cov[1][1] + 0.3;\n\n            float mid = 0.5 * (diagonal1 + diagonal2);\n            float radius = length(vec2((diagonal1 - diagonal2) / 2.0, offDiagonal));\n            float lambda1 = mid + radius;\n            float lambda2 = max(mid - radius, 0.1);\n            vec2 diagonalVector = normalize(vec2(offDiagonal, lambda1 - diagonal1));\n            vec2 v1 = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;\n            vec2 v2 = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);\n\n            // early out tiny splats\n            // TODO: figure out length units and expose as uniform parameter\n            // TODO: perhaps make this a shader compile-time option\n            if (dot(v1, v1) < 4.0 && dot(v2, v2) < 4.0) {\n                return vec4(0.0, 0.0, 2.0, 1.0);\n            }\n\n            texCoord = vertex_position.xy * 2.0;\n\n            return splat_proj +\n                vec4((vertex_position.x * v1 + vertex_position.y * v2) / viewport * 2.0,\n                    0.0, 0.0) * splat_proj.w;\n        #endif\n    }\n";
	var splatMainVS = "\n    void main(void)\n    {\n        vec3 centerLocal = evalCenter();\n        vec4 centerWorld = matrix_model * vec4(centerLocal, 1.0);\n\n        gl_Position = evalSplat(centerWorld);\n    }\n";
	var splatCoreFS = "\n    varying vec2 texCoord;\n    varying vec4 color;\n\n    vec4 evalSplat() {\n\n        #ifdef DEBUG_RENDER\n\n            if (color.a < 0.2) discard;\n            return color;\n\n        #else\n\n            float A = -dot(texCoord, texCoord);\n            if (A < -4.0) discard;\n            float B = exp(A) * color.a;\n            return vec4(color.rgb, B);\n\n        #endif\n    }\n";
	var splatMainFS = "\n    void main(void)\n    {\n        gl_FragColor = evalSplat();\n    }\n";
	var hashCode = function hashCode(str) {
		var hash = 0;
		for (var i = 0, len = str.length; i < len; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash |= 0;
		}
		return hash;
	};
	var createSplatMaterial = function createSplatMaterial(device, options) {
		var _options$vertex, _options$fragment;
		if (options === void 0) {
			options = {};
		}
		var debugRender = options.debugRender;
		var result = new playcanvas.Material();
		result.name = 'splatMaterial';
		result.cull = debugRender ? playcanvas.CULLFACE_BACK : playcanvas.CULLFACE_NONE;
		result.blendType = playcanvas.BLEND_NORMAL;
		result.depthWrite = false;
		var defines = (debugRender ? '#define DEBUG_RENDER\n' : '') + (device.isWebGL1 ? '' : '#define INT_INDICES\n');
		var vs = defines + splatCoreVS + ((_options$vertex = options.vertex) != null ? _options$vertex : splatMainVS);
		var fs = defines + splatCoreFS + ((_options$fragment = options.fragment) != null ? _options$fragment : splatMainFS);
		var vsHash = hashCode(vs);
		var fsHash = hashCode(fs);
		result.shader = playcanvas.createShaderFromCode(device, vs, fs, "splatShader-" + debugRender + "-" + vsHash + "-" + fsHash, {
			vertex_position: playcanvas.SEMANTIC_POSITION,
			vertex_id: playcanvas.SEMANTIC_ATTR13
		});
		result.update();
		return result;
	};

	var Splat = function () {
		function Splat(device, numSplats, aabb) {
			this.device = void 0;
			this.numSplats = void 0;
			this.vertexFormat = void 0;
			this.format = void 0;
			this.colorTexture = void 0;
			this.scaleTexture = void 0;
			this.rotationTexture = void 0;
			this.centerTexture = void 0;
			this.centers = void 0;
			this.aabb = void 0;
			this.device = device;
			this.numSplats = numSplats;
			this.aabb = aabb;
			this.vertexFormat = new playcanvas.VertexFormat(device, [{
				semantic: playcanvas.SEMANTIC_ATTR13,
				components: 1,
				type: device.isWebGL1 ? playcanvas.TYPE_FLOAT32 : playcanvas.TYPE_UINT32,
				asInt: !device.isWebGL1
			}]);
			var size = this.evalTextureSize(numSplats);
			this.format = this.getTextureFormat(device, false);
			this.colorTexture = this.createTexture(device, 'splatColor', playcanvas.PIXELFORMAT_RGBA8, size);
			this.scaleTexture = this.createTexture(device, 'splatScale', this.format.format, size);
			this.rotationTexture = this.createTexture(device, 'splatRotation', this.format.format, size);
			this.centerTexture = this.createTexture(device, 'splatCenter', this.format.format, size);
		}
		var _proto = Splat.prototype;
		_proto.destroy = function destroy() {
			this.colorTexture.destroy();
			this.scaleTexture.destroy();
			this.rotationTexture.destroy();
			this.centerTexture.destroy();
		};
		_proto.createMaterial = function createMaterial(options) {
			var material = createSplatMaterial(this.device, options);
			var _this$colorTexture = this.colorTexture,
				width = _this$colorTexture.width,
				height = _this$colorTexture.height;
			material.setParameter('splatColor', this.colorTexture);
			material.setParameter('splatScale', this.scaleTexture);
			material.setParameter('splatRotation', this.rotationTexture);
			material.setParameter('splatCenter', this.centerTexture);
			material.setParameter('tex_params', new Float32Array([width, height, 1 / width, 1 / height]));
			return material;
		};
		_proto.evalTextureSize = function evalTextureSize(count) {
			var width = Math.ceil(Math.sqrt(count));
			var height = Math.ceil(count / width);
			return new playcanvas.Vec2(width, height);
		};
		_proto.createTexture = function createTexture(device, name, format, size) {
			return new playcanvas.Texture(device, {
				name: name,
				width: size.x,
				height: size.y,
				format: format,
				cubemap: false,
				mipmaps: false,
				minFilter: playcanvas.FILTER_NEAREST,
				magFilter: playcanvas.FILTER_NEAREST,
				addressU: playcanvas.ADDRESS_CLAMP_TO_EDGE,
				addressV: playcanvas.ADDRESS_CLAMP_TO_EDGE
			});
		};
		_proto.getTextureFormat = function getTextureFormat(device, preferHighPrecision) {
			var halfFormat = device.extTextureHalfFloat && device.textureHalfFloatUpdatable ? playcanvas.PIXELFORMAT_RGBA16F : undefined;
			var half = halfFormat ? {
				format: halfFormat,
				numComponents: 4,
				isHalf: true
			} : undefined;
			var floatFormat = device.isWebGPU ? playcanvas.PIXELFORMAT_RGBA32F : device.extTextureFloat ? playcanvas.PIXELFORMAT_RGB32F : undefined;
			var float = floatFormat ? {
				format: floatFormat,
				numComponents: floatFormat === playcanvas.PIXELFORMAT_RGBA32F ? 4 : 3,
				isHalf: false
			} : undefined;
			return preferHighPrecision ? float != null ? float : half : half != null ? half : float;
		};
		_proto.updateColorData = function updateColorData(c0, c1, c2, opacity) {
			var SH_C0 = 0.28209479177387814;
			var texture = this.colorTexture;
			var data = texture.lock();
			var sigmoid = function sigmoid(v) {
				if (v > 0) {
					return 1 / (1 + Math.exp(-v));
				}
				var t = Math.exp(v);
				return t / (1 + t);
			};
			for (var i = 0; i < this.numSplats; ++i) {
				if (c0 && c1 && c2) {
					data[i * 4 + 0] = playcanvas.math.clamp((0.5 + SH_C0 * c0[i]) * 255, 0, 255);
					data[i * 4 + 1] = playcanvas.math.clamp((0.5 + SH_C0 * c1[i]) * 255, 0, 255);
					data[i * 4 + 2] = playcanvas.math.clamp((0.5 + SH_C0 * c2[i]) * 255, 0, 255);
				}
				data[i * 4 + 3] = opacity ? playcanvas.math.clamp(sigmoid(opacity[i]) * 255, 0, 255) : 255;
			}
			texture.unlock();
		};
		_proto.updateScaleData = function updateScaleData(scale0, scale1, scale2) {
			var _this$format = this.format,
				numComponents = _this$format.numComponents,
				isHalf = _this$format.isHalf;
			var texture = this.scaleTexture;
			var data = texture.lock();
			var float2Half = playcanvas.FloatPacking.float2Half;
			for (var i = 0; i < this.numSplats; i++) {
				var sx = Math.exp(scale0[i]);
				var sy = Math.exp(scale1[i]);
				var sz = Math.exp(scale2[i]);
				if (isHalf) {
					data[i * numComponents + 0] = float2Half(sx);
					data[i * numComponents + 1] = float2Half(sy);
					data[i * numComponents + 2] = float2Half(sz);
				} else {
					data[i * numComponents + 0] = sx;
					data[i * numComponents + 1] = sy;
					data[i * numComponents + 2] = sz;
				}
			}
			texture.unlock();
		};
		_proto.updateRotationData = function updateRotationData(rot0, rot1, rot2, rot3) {
			var _this$format2 = this.format,
				numComponents = _this$format2.numComponents,
				isHalf = _this$format2.isHalf;
			var quat = new playcanvas.Quat();
			var texture = this.rotationTexture;
			var data = texture.lock();
			var float2Half = playcanvas.FloatPacking.float2Half;
			for (var i = 0; i < this.numSplats; i++) {
				quat.set(rot0[i], rot1[i], rot2[i], rot3[i]).normalize();
				if (quat.w < 0) {
					quat.conjugate();
				}
				if (isHalf) {
					data[i * numComponents + 0] = float2Half(quat.x);
					data[i * numComponents + 1] = float2Half(quat.y);
					data[i * numComponents + 2] = float2Half(quat.z);
				} else {
					data[i * numComponents + 0] = quat.x;
					data[i * numComponents + 1] = quat.y;
					data[i * numComponents + 2] = quat.z;
				}
			}
			texture.unlock();
		};
		_proto.updateCenterData = function updateCenterData(x, y, z) {
			var _this$format3 = this.format,
				numComponents = _this$format3.numComponents,
				isHalf = _this$format3.isHalf;
			var texture = this.centerTexture;
			var data = texture.lock();
			var float2Half = playcanvas.FloatPacking.float2Half;
			for (var i = 0; i < this.numSplats; i++) {
				if (isHalf) {
					data[i * numComponents + 0] = float2Half(x[i]);
					data[i * numComponents + 1] = float2Half(y[i]);
					data[i * numComponents + 2] = float2Half(z[i]);
				} else {
					data[i * numComponents + 0] = x[i];
					data[i * numComponents + 1] = y[i];
					data[i * numComponents + 2] = z[i];
				}
			}
			texture.unlock();
		};
		return Splat;
	}();

	function SortWorker() {
		var compareBits = 16;
		var bucketCount = Math.pow(2, compareBits) + 1;
		var data;
		var centers;
		var cameraPosition;
		var cameraDirection;
		var intIndices;
		var lastCameraPosition = {
			x: 0,
			y: 0,
			z: 0
		};
		var lastCameraDirection = {
			x: 0,
			y: 0,
			z: 0
		};
		var boundMin = {
			x: 0,
			y: 0,
			z: 0
		};
		var boundMax = {
			x: 0,
			y: 0,
			z: 0
		};
		var distances;
		var indices;
		var target;
		var countBuffer;
		var update = function update() {
			var _distances;
			if (!centers || !data || !cameraPosition || !cameraDirection) return;
			var px = cameraPosition.x;
			var py = cameraPosition.y;
			var pz = cameraPosition.z;
			var dx = cameraDirection.x;
			var dy = cameraDirection.y;
			var dz = cameraDirection.z;
			var epsilon = 0.001;
			if (Math.abs(px - lastCameraPosition.x) < epsilon && Math.abs(py - lastCameraPosition.y) < epsilon && Math.abs(pz - lastCameraPosition.z) < epsilon && Math.abs(dx - lastCameraDirection.x) < epsilon && Math.abs(dy - lastCameraDirection.y) < epsilon && Math.abs(dz - lastCameraDirection.z) < epsilon) {
				return;
			}
			lastCameraPosition.x = px;
			lastCameraPosition.y = py;
			lastCameraPosition.z = pz;
			lastCameraDirection.x = dx;
			lastCameraDirection.y = dy;
			lastCameraDirection.z = dz;
			var numVertices = centers.length / 3;
			if (((_distances = distances) == null ? void 0 : _distances.length) !== numVertices) {
				distances = new Uint32Array(numVertices);
				indices = new Uint32Array(numVertices);
				target = new Float32Array(numVertices);
			}
			var minDist;
			var maxDist;
			for (var i = 0; i < 8; ++i) {
				var x = i & 1 ? boundMin.x : boundMax.x;
				var y = i & 2 ? boundMin.y : boundMax.y;
				var z = i & 4 ? boundMin.z : boundMax.z;
				var d = (x - px) * dx + (y - py) * dy + (z - pz) * dz;
				if (i === 0) {
					minDist = maxDist = d;
				} else {
					minDist = Math.min(minDist, d);
					maxDist = Math.max(maxDist, d);
				}
			}
			if (!countBuffer) countBuffer = new Uint32Array(bucketCount);
			for (var _i = 0; _i < bucketCount; _i++) countBuffer[_i] = 0;
			var range = maxDist - minDist;
			var divider = 1 / range * Math.pow(2, compareBits);
			for (var _i2 = 0; _i2 < numVertices; ++_i2) {
				var istride = _i2 * 3;
				var _d = (centers[istride + 0] - px) * dx + (centers[istride + 1] - py) * dy + (centers[istride + 2] - pz) * dz;
				var sortKey = Math.floor((_d - minDist) * divider);
				distances[_i2] = sortKey;
				indices[_i2] = _i2;
				countBuffer[sortKey]++;
			}
			for (var _i3 = 1; _i3 < bucketCount; _i3++) countBuffer[_i3] += countBuffer[_i3 - 1];
			var outputArray = intIndices ? new Uint32Array(target.buffer) : target;
			var offset = intIndices ? 0 : 0.2;
			for (var _i4 = numVertices - 1; _i4 >= 0; _i4--) {
				var distance = distances[_i4];
				var index = indices[_i4];
				outputArray[countBuffer[distance] - 1] = index + offset;
				countBuffer[distance]--;
			}
			var tmp = data;
			data = target;
			target = tmp;
			self.postMessage({
				data: data.buffer
			}, [data.buffer]);
			data = null;
		};
		self.onmessage = function (message) {
			if (message.data.data) {
				data = new Float32Array(message.data.data);
			}
			if (message.data.centers) {
				centers = new Float32Array(message.data.centers);
				boundMin.x = boundMax.x = centers[0];
				boundMin.y = boundMax.y = centers[1];
				boundMin.z = boundMax.z = centers[2];
				var numVertices = centers.length / 3;
				for (var i = 1; i < numVertices; ++i) {
					var x = centers[i * 3 + 0];
					var y = centers[i * 3 + 1];
					var z = centers[i * 3 + 2];
					boundMin.x = Math.min(boundMin.x, x);
					boundMin.y = Math.min(boundMin.y, y);
					boundMin.z = Math.min(boundMin.z, z);
					boundMax.x = Math.max(boundMax.x, x);
					boundMax.y = Math.max(boundMax.y, y);
					boundMax.z = Math.max(boundMax.z, z);
				}
			}
			if (message.data.intIndices) {
				intIndices = message.data.intIndices;
			}
			if (message.data.cameraPosition) cameraPosition = message.data.cameraPosition;
			if (message.data.cameraDirection) cameraDirection = message.data.cameraDirection;
			update();
		};
	}
	var SplatSorter = function (_EventHandler) {
		_inheritsLoose(SplatSorter, _EventHandler);
		function SplatSorter() {
			var _this;
			_this = _EventHandler.call(this) || this;
			_this.worker = void 0;
			_this.vertexBuffer = void 0;
			_this.worker = new Worker(URL.createObjectURL(new Blob(["(" + SortWorker.toString() + ")()"], {
				type: 'application/javascript'
			})));
			_this.worker.onmessage = function (message) {
				var newData = message.data.data;
				var oldData = _this.vertexBuffer.storage;
				_this.worker.postMessage({
					data: oldData
				}, [oldData]);
				setTimeout(function () {
					_this.vertexBuffer.setData(newData);
					_this.fire('updated');
				});
			};
			return _this;
		}
		var _proto = SplatSorter.prototype;
		_proto.destroy = function destroy() {
			this.worker.terminate();
			this.worker = null;
		};
		_proto.init = function init(vertexBuffer, centers, intIndices) {
			this.vertexBuffer = vertexBuffer;
			var buf = vertexBuffer.storage.slice(0);
			this.worker.postMessage({
				data: buf,
				centers: centers.buffer,
				intIndices: intIndices
			}, [buf, centers.buffer]);
		};
		_proto.setCamera = function setCamera(pos, dir) {
			this.worker.postMessage({
				cameraPosition: {
					x: pos.x,
					y: pos.y,
					z: pos.z
				},
				cameraDirection: {
					x: dir.x,
					y: dir.y,
					z: dir.z
				}
			});
		};
		return SplatSorter;
	}(playcanvas.EventHandler);

	var mat = new playcanvas.Mat4();
	var cameraPosition = new playcanvas.Vec3();
	var cameraDirection = new playcanvas.Vec3();
	var viewport = [0, 0];
	var SplatInstance = function () {
		function SplatInstance(splat, options) {
			var _this = this;
			this.splat = void 0;
			this.mesh = void 0;
			this.meshInstance = void 0;
			this.material = void 0;
			this.vb = void 0;
			this.sorter = void 0;
			this.lastCameraPosition = new playcanvas.Vec3();
			this.lastCameraDirection = new playcanvas.Vec3();
			this.splat = splat;
			var debugRender = options.debugRender;
			this.material = splat.createMaterial(options);
			var device = splat.device;
			if (debugRender) {
				this.mesh = playcanvas.createBox(device, {
					halfExtents: new playcanvas.Vec3(1.0, 1.0, 1.0)
				});
			} else {
				this.mesh = new playcanvas.Mesh(device);
				this.mesh.setPositions(new Float32Array([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1]), 2);
				this.mesh.update();
			}
			this.mesh.aabb.copy(splat.aabb);
			var numSplats = splat.numSplats;
			var indexData;
			if (!device.isWebGL1) {
				indexData = new Uint32Array(numSplats);
				for (var i = 0; i < numSplats; ++i) {
					indexData[i] = i;
				}
			} else {
				indexData = new Float32Array(numSplats);
				for (var _i = 0; _i < numSplats; ++_i) {
					indexData[_i] = _i + 0.2;
				}
			}
			var vb = new playcanvas.VertexBuffer(device, splat.vertexFormat, numSplats, playcanvas.BUFFER_DYNAMIC, indexData.buffer);
			this.vb = vb;
			this.meshInstance = new playcanvas.MeshInstance(this.mesh, this.material);
			this.meshInstance.setInstancing(vb, true);
			this.meshInstance.splatInstance = this;
			this.centers = new Float32Array(splat.centers);
			this.sorter = new SplatSorter();
			this.sorter.init(this.vb, this.centers, !this.splat.device.isWebGL1);
			var cameraEntity = options.cameraEntity;
			if (cameraEntity) {
				this.callbackHandle = cameraEntity._app.on('prerender', function () {
					_this.sort(cameraEntity);
				});
			}
			this.updateViewport();
		}
		var _proto = SplatInstance.prototype;
		_proto.destroy = function destroy() {
			var _this$callbackHandle;
			this.material.destroy();
			this.vb.destroy();
			this.meshInstance.destroy();
			this.sorter.destroy();
			(_this$callbackHandle = this.callbackHandle) == null || _this$callbackHandle.off();
		};
		_proto.updateViewport = function updateViewport() {
			var device = this.splat.device;
			viewport[0] = device.width;
			viewport[1] = device.height;
			this.material.setParameter('viewport', viewport);
		};
		_proto.sort = function sort(camera) {
			var sorted = false;
			var cameraMat = camera.getWorldTransform();
			cameraMat.getTranslation(cameraPosition);
			cameraMat.getZ(cameraDirection);
			var modelMat = this.meshInstance.node.getWorldTransform();
			var invModelMat = mat.invert(modelMat);
			invModelMat.transformPoint(cameraPosition, cameraPosition);
			invModelMat.transformVector(cameraDirection, cameraDirection);
			if (!cameraPosition.equalsApprox(this.lastCameraPosition) || !cameraDirection.equalsApprox(this.lastCameraDirection)) {
				this.lastCameraPosition.copy(cameraPosition);
				this.lastCameraDirection.copy(cameraDirection);
				sorted = true;
				this.sorter.setCamera(cameraPosition, cameraDirection);
			}
			this.updateViewport();
			return sorted;
		};
		return SplatInstance;
	}();

	var SplatContainerResource = function (_ContainerResource) {
		_inheritsLoose(SplatContainerResource, _ContainerResource);
		function SplatContainerResource(device, splatData) {
			var _this;
			_this = _ContainerResource.call(this) || this;
			_this.device = void 0;
			_this.splatData = void 0;
			_this.splat = void 0;
			_this.device = device;
			_this.splatData = splatData.isCompressed ? splatData.decompress() : splatData;
			return _this;
		}
		var _proto = SplatContainerResource.prototype;
		_proto.destroy = function destroy() {
			var _this$splat;
			this.device = null;
			this.splatData = null;
			(_this$splat = this.splat) == null || _this$splat.destroy();
			this.splat = null;
		};
		_proto.createSplat = function createSplat() {
			if (!this.splat) {
				var splatData = this.splatData;
				var aabb = new playcanvas.BoundingBox();
				this.splatData.calcAabb(aabb);
				var splat = new Splat(this.device, splatData.numSplats, aabb);
				this.splat = splat;
				splat.updateColorData(splatData.getProp('f_dc_0'), splatData.getProp('f_dc_1'), splatData.getProp('f_dc_2'), splatData.getProp('opacity'));
				splat.updateScaleData(splatData.getProp('scale_0'), splatData.getProp('scale_1'), splatData.getProp('scale_2'));
				splat.updateRotationData(splatData.getProp('rot_0'), splatData.getProp('rot_1'), splatData.getProp('rot_2'), splatData.getProp('rot_3'));
				splat.updateCenterData(splatData.getProp('x'), splatData.getProp('y'), splatData.getProp('z'));
				var x = splatData.getProp('x');
				var y = splatData.getProp('y');
				var z = splatData.getProp('z');
				var centers = new Float32Array(this.splatData.numSplats * 3);
				for (var i = 0; i < this.splatData.numSplats; ++i) {
					centers[i * 3 + 0] = x[i];
					centers[i * 3 + 1] = y[i];
					centers[i * 3 + 2] = z[i];
				}
				splat.centers = centers;
			}
			return this.splat;
		};
		_proto.instantiateModelEntity = function instantiateModelEntity() {
			return null;
		};
		_proto.instantiateRenderEntity = function instantiateRenderEntity(options) {
			if (options === void 0) {
				options = {};
			}
			var splat = this.createSplat();
			var splatInstance = new SplatInstance(splat, options);
			var entity = new playcanvas.Entity('Splat');
			entity.addComponent('render', {
				type: 'asset',
				meshInstances: [splatInstance.meshInstance],
				castShadows: false
			});
			entity.render.customAabb = splat.aabb.clone();
			entity.render.splatInstance = splatInstance;
			entity.render.system.on('beforeremove', function (entity, component) {
				if (component.splatInstance) {
					var _component$splatInsta;
					(_component$splatInsta = component.splatInstance) == null || _component$splatInsta.destroy();
					component.splatInstance = null;
				}
			}, this);
			return entity;
		};
		return SplatContainerResource;
	}(playcanvas.ContainerResource);

	var vec3 = new playcanvas.Vec3();
	var mat4 = new playcanvas.Mat4();
	var quat = new playcanvas.Quat();
	var quat2 = new playcanvas.Quat();
	var aabb = new playcanvas.BoundingBox();
	var aabb2 = new playcanvas.BoundingBox();
	var debugPoints = [new playcanvas.Vec3(), new playcanvas.Vec3(), new playcanvas.Vec3(), new playcanvas.Vec3(), new playcanvas.Vec3(), new playcanvas.Vec3(), new playcanvas.Vec3(), new playcanvas.Vec3()];
	var debugLines = [debugPoints[0], debugPoints[1], debugPoints[1], debugPoints[3], debugPoints[3], debugPoints[2], debugPoints[2], debugPoints[0], debugPoints[4], debugPoints[5], debugPoints[5], debugPoints[7], debugPoints[7], debugPoints[6], debugPoints[6], debugPoints[4], debugPoints[0], debugPoints[4], debugPoints[1], debugPoints[5], debugPoints[2], debugPoints[6], debugPoints[3], debugPoints[7]];
	var debugColor = new playcanvas.Color(1, 1, 0, 0.4);
	var calcSplatMat = function calcSplatMat(result, data) {
		var px = data.x;
		var py = data.y;
		var pz = data.z;
		var d = Math.sqrt(data.rx * data.rx + data.ry * data.ry + data.rz * data.rz + data.rw * data.rw);
		var x = data.rx / d;
		var y = data.ry / d;
		var z = data.rz / d;
		var w = data.rw / d;
		result.data.set([1.0 - 2.0 * (z * z + w * w), 2.0 * (y * z + x * w), 2.0 * (y * w - x * z), 0, 2.0 * (y * z - x * w), 1.0 - 2.0 * (y * y + w * w), 2.0 * (z * w + x * y), 0, 2.0 * (y * w + x * z), 2.0 * (z * w - x * y), 1.0 - 2.0 * (y * y + z * z), 0, px, py, pz, 1]);
	};
	var SplatData = function () {
		function SplatData(elements, performZScale) {
			if (performZScale === void 0) {
				performZScale = true;
			}
			this.elements = void 0;
			this.vertexElement = void 0;
			this.elements = elements;
			this.vertexElement = elements.find(function (element) {
				return element.name === 'vertex';
			});
			if (!this.isCompressed && performZScale) {
				mat4.setScale(-1, -1, 1);
				this.transform(mat4);
			}
		}
		SplatData.calcSplatAabb = function calcSplatAabb(result, data) {
			calcSplatMat(mat4, data);
			aabb.center.set(0, 0, 0);
			aabb.halfExtents.set(data.sx * 2, data.sy * 2, data.sz * 2);
			result.setFromTransformedAabb(aabb, mat4);
		};
		var _proto = SplatData.prototype;
		_proto.transform = function transform(mat) {
			var x = this.getProp('x');
			var y = this.getProp('y');
			var z = this.getProp('z');
			var rx = this.getProp('rot_0');
			var ry = this.getProp('rot_1');
			var rz = this.getProp('rot_2');
			var rw = this.getProp('rot_3');
			quat2.setFromMat4(mat);
			for (var i = 0; i < this.numSplats; ++i) {
				vec3.set(x[i], y[i], z[i]);
				mat.transformPoint(vec3, vec3);
				x[i] = vec3.x;
				y[i] = vec3.y;
				z[i] = vec3.z;
				quat.set(ry[i], rz[i], rw[i], rx[i]).mul2(quat2, quat);
				rx[i] = quat.w;
				ry[i] = quat.x;
				rz[i] = quat.y;
				rw[i] = quat.z;
			}
		};
		_proto.getProp = function getProp(name) {
			var _this$vertexElement$p;
			return (_this$vertexElement$p = this.vertexElement.properties.find(function (property) {
				return property.name === name && property.storage;
			})) == null ? void 0 : _this$vertexElement$p.storage;
		};
		_proto.addProp = function addProp(name, storage) {
			this.vertexElement.properties.push({
				type: 'float',
				name: name,
				storage: storage,
				byteSize: 4
			});
		};
		_proto.calcAabb = function calcAabb(result, pred) {
			var x = this.getProp('x');
			var y = this.getProp('y');
			var z = this.getProp('z');
			var rx = this.getProp('rot_0');
			var ry = this.getProp('rot_1');
			var rz = this.getProp('rot_2');
			var rw = this.getProp('rot_3');
			var sx = this.getProp('scale_0');
			var sy = this.getProp('scale_1');
			var sz = this.getProp('scale_2');
			var splat = {
				x: 0,
				y: 0,
				z: 0,
				rx: 0,
				ry: 0,
				rz: 0,
				rw: 0,
				sx: 0,
				sy: 0,
				sz: 0
			};
			var first = true;
			for (var i = 0; i < this.numSplats; ++i) {
				if (pred && !pred(i)) {
					continue;
				}
				splat.x = x[i];
				splat.y = y[i];
				splat.z = z[i];
				splat.rx = rx[i];
				splat.ry = ry[i];
				splat.rz = rz[i];
				splat.rw = rw[i];
				splat.sx = Math.exp(sx[i]);
				splat.sy = Math.exp(sy[i]);
				splat.sz = Math.exp(sz[i]);
				if (first) {
					first = false;
					SplatData.calcSplatAabb(result, splat);
				} else {
					SplatData.calcSplatAabb(aabb2, splat);
					result.add(aabb2);
				}
			}
			return !first;
		};
		_proto.calcFocalPoint = function calcFocalPoint(result, pred) {
			var x = this.getProp('x');
			var y = this.getProp('y');
			var z = this.getProp('z');
			var sx = this.getProp('scale_0');
			var sy = this.getProp('scale_1');
			var sz = this.getProp('scale_2');
			result.x = 0;
			result.y = 0;
			result.z = 0;
			var sum = 0;
			for (var i = 0; i < this.numSplats; ++i) {
				if (pred && !pred(i)) {
					continue;
				}
				var weight = 1.0 / (1.0 + Math.exp(Math.max(sx[i], sy[i], sz[i])));
				result.x += x[i] * weight;
				result.y += y[i] * weight;
				result.z += z[i] * weight;
				sum += weight;
			}
			result.mulScalar(1 / sum);
		};
		_proto.renderWireframeBounds = function renderWireframeBounds(app, worldMat) {
			var x = this.getProp('x');
			var y = this.getProp('y');
			var z = this.getProp('z');
			var rx = this.getProp('rot_0');
			var ry = this.getProp('rot_1');
			var rz = this.getProp('rot_2');
			var rw = this.getProp('rot_3');
			var sx = this.getProp('scale_0');
			var sy = this.getProp('scale_1');
			var sz = this.getProp('scale_2');
			var splat = {
				x: 0,
				y: 0,
				z: 0,
				rx: 0,
				ry: 0,
				rz: 0,
				rw: 0,
				sx: 0,
				sy: 0,
				sz: 0
			};
			for (var i = 0; i < this.numSplats; ++i) {
				splat.x = x[i];
				splat.y = y[i];
				splat.z = z[i];
				splat.rx = rx[i];
				splat.ry = ry[i];
				splat.rz = rz[i];
				splat.rw = rw[i];
				splat.sx = Math.exp(sx[i]);
				splat.sy = Math.exp(sy[i]);
				splat.sz = Math.exp(sz[i]);
				calcSplatMat(mat4, splat);
				mat4.mul2(worldMat, mat4);
				for (var j = 0; j < 8; ++j) {
					vec3.set(splat.sx * 2 * (j & 1 ? 1 : -1), splat.sy * 2 * (j & 2 ? 1 : -1), splat.sz * 2 * (j & 4 ? 1 : -1));
					mat4.transformPoint(vec3, debugPoints[j]);
				}
				app.drawLines(debugLines, debugColor);
			}
		};
		_proto.decompress = function decompress() {
			var members = ['x', 'y', 'z', 'f_dc_0', 'f_dc_1', 'f_dc_2', 'opacity', 'rot_0', 'rot_1', 'rot_2', 'rot_3', 'scale_0', 'scale_1', 'scale_2'];
			var chunks = this.elements.find(function (e) {
				return e.name === 'chunk';
			});
			var vertices = this.vertexElement;
			var data = {};
			members.forEach(function (name) {
				data[name] = new Float32Array(vertices.count);
			});
			var getChunkProp = function getChunkProp(name) {
				var _chunks$properties$fi;
				return (_chunks$properties$fi = chunks.properties.find(function (p) {
					return p.name === name && p.storage;
				})) == null ? void 0 : _chunks$properties$fi.storage;
			};
			var min_x = getChunkProp('min_x');
			var min_y = getChunkProp('min_y');
			var min_z = getChunkProp('min_z');
			var max_x = getChunkProp('max_x');
			var max_y = getChunkProp('max_y');
			var max_z = getChunkProp('max_z');
			var min_scale_x = getChunkProp('min_scale_x');
			var min_scale_y = getChunkProp('min_scale_y');
			var min_scale_z = getChunkProp('min_scale_z');
			var max_scale_x = getChunkProp('max_scale_x');
			var max_scale_y = getChunkProp('max_scale_y');
			var max_scale_z = getChunkProp('max_scale_z');
			var position = this.getProp('packed_position');
			var rotation = this.getProp('packed_rotation');
			var scale = this.getProp('packed_scale');
			var color = this.getProp('packed_color');
			var unpackUnorm = function unpackUnorm(value, bits) {
				var t = (1 << bits) - 1;
				return (value & t) / t;
			};
			var unpack111011 = function unpack111011(result, value) {
				result.x = unpackUnorm(value >>> 21, 11);
				result.y = unpackUnorm(value >>> 11, 10);
				result.z = unpackUnorm(value, 11);
			};
			var unpack8888 = function unpack8888(result, value) {
				result.x = unpackUnorm(value >>> 24, 8);
				result.y = unpackUnorm(value >>> 16, 8);
				result.z = unpackUnorm(value >>> 8, 8);
				result.w = unpackUnorm(value, 8);
			};
			var unpackRot = function unpackRot(result, value) {
				var norm = 1.0 / (Math.sqrt(2) * 0.5);
				var a = (unpackUnorm(value >>> 20, 10) - 0.5) * norm;
				var b = (unpackUnorm(value >>> 10, 10) - 0.5) * norm;
				var c = (unpackUnorm(value, 10) - 0.5) * norm;
				var m = Math.sqrt(1.0 - (a * a + b * b + c * c));
				switch (value >>> 30) {
					case 0:
						result.set(m, a, b, c);
						break;
					case 1:
						result.set(a, m, b, c);
						break;
					case 2:
						result.set(a, b, m, c);
						break;
					case 3:
						result.set(a, b, c, m);
						break;
				}
			};
			var lerp = function lerp(a, b, t) {
				return a * (1 - t) + b * t;
			};
			var p = new playcanvas.Vec3();
			var r = new playcanvas.Quat();
			var s = new playcanvas.Vec3();
			var c = new playcanvas.Vec4();
			for (var i = 0; i < vertices.count; ++i) {
				var ci = Math.floor(i / 256);
				unpack111011(p, position[i]);
				unpackRot(r, rotation[i]);
				unpack111011(s, scale[i]);
				unpack8888(c, color[i]);
				data.x[i] = lerp(min_x[ci], max_x[ci], p.x);
				data.y[i] = lerp(min_y[ci], max_y[ci], p.y);
				data.z[i] = lerp(min_z[ci], max_z[ci], p.z);
				data.rot_0[i] = r.x;
				data.rot_1[i] = r.y;
				data.rot_2[i] = r.z;
				data.rot_3[i] = r.w;
				data.scale_0[i] = lerp(min_scale_x[ci], max_scale_x[ci], s.x);
				data.scale_1[i] = lerp(min_scale_y[ci], max_scale_y[ci], s.y);
				data.scale_2[i] = lerp(min_scale_z[ci], max_scale_z[ci], s.z);
				var SH_C0 = 0.28209479177387814;
				data.f_dc_0[i] = (c.x - 0.5) / SH_C0;
				data.f_dc_1[i] = (c.y - 0.5) / SH_C0;
				data.f_dc_2[i] = (c.z - 0.5) / SH_C0;
				data.opacity[i] = -Math.log(1 / c.w - 1);
			}
			return new SplatData([{
				name: 'vertex',
				count: vertices.count,
				properties: members.map(function (name) {
					return {
						name: name,
						type: 'float',
						byteSize: 4,
						storage: data[name]
					};
				})
			}], false);
		};
		_createClass(SplatData, [{
			key: "numSplats",
			get: function get() {
				return this.vertexElement.count;
			}
		}, {
			key: "isCompressed",
			get: function get() {
				var _this = this;
				return this.elements.some(function (e) {
					return e.name === 'chunk';
				}) && ['packed_position', 'packed_rotation', 'packed_scale', 'packed_color'].every(function (name) {
					return _this.getProp(name);
				});
			}
		}]);
		return SplatData;
	}();

	var magicBytes = new Uint8Array([112, 108, 121, 10]);
	var endHeaderBytes = new Uint8Array([10, 101, 110, 100, 95, 104, 101, 97, 100, 101, 114, 10]);
	var dataTypeMap = new Map([['char', Int8Array], ['uchar', Uint8Array], ['short', Int16Array], ['ushort', Uint16Array], ['int', Int32Array], ['uint', Uint32Array], ['float', Float32Array], ['double', Float64Array]]);
	var readPly = function () {
		var _ref = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(reader, propertyFilter) {
			var concat, find, startsWith, buf, endHeaderIndex, _yield$reader$read, value, done, headerText, headerLines, elements, i, words, element, storageType, storage, readIndex, remaining, dataView, _i, _element, e, j, property, _yield$reader$read2, _value, _done, tmp;
			return _regeneratorRuntime().wrap(function _callee$(_context) {
				while (1) switch (_context.prev = _context.next) {
					case 0:
						if (propertyFilter === void 0) {
							propertyFilter = null;
						}
						concat = function concat(a, b) {
							var c = new Uint8Array(a.byteLength + b.byteLength);
							c.set(a);
							c.set(b, a.byteLength);
							return c;
						};
						find = function find(buf, search) {
							var endIndex = buf.length - search.length;
							var i, j;
							for (i = 0; i < endIndex; ++i) {
								for (j = 0; j < search.length; ++j) {
									if (buf[i + j] !== search[j]) {
										break;
									}
								}
								if (j === search.length) {
									return i;
								}
							}
							return -1;
						};
						startsWith = function startsWith(a, b) {
							if (a.length < b.length) {
								return false;
							}
							for (var i = 0; i < b.length; ++i) {
								if (a[i] !== b[i]) {
									return false;
								}
							}
							return true;
						};
					case 4:
						_context.next = 7;
						return reader.read();
					case 7:
						_yield$reader$read = _context.sent;
						value = _yield$reader$read.value;
						done = _yield$reader$read.done;
						if (!done) {
							_context.next = 12;
							break;
						}
						throw new Error('Stream finished before end of header');
					case 12:
						buf = buf ? concat(buf, value) : value;
						if (!(buf.length >= magicBytes.length && !startsWith(buf, magicBytes))) {
							_context.next = 15;
							break;
						}
						throw new Error('Invalid ply header');
					case 15:
						endHeaderIndex = find(buf, endHeaderBytes);
						if (!(endHeaderIndex !== -1)) {
							_context.next = 18;
							break;
						}
						return _context.abrupt("break", 20);
					case 18:
						_context.next = 4;
						break;
					case 20:
						headerText = new TextDecoder('ascii').decode(buf.slice(0, endHeaderIndex));
						headerLines = headerText.split('\n').filter(function (line) {
							return !line.startsWith('comment ');
						});
						elements = [];
						i = 1;
					case 24:
						if (!(i < headerLines.length)) {
							_context.next = 45;
							break;
						}
						words = headerLines[i].split(' ');
						_context.t0 = words[0];
						_context.next = _context.t0 === 'format' ? 29 : _context.t0 === 'element' ? 32 : _context.t0 === 'property' ? 34 : 41;
						break;
					case 29:
						if (!(words[1] !== 'binary_little_endian')) {
							_context.next = 31;
							break;
						}
						throw new Error('Unsupported ply format');
					case 31:
						return _context.abrupt("break", 42);
					case 32:
						elements.push({
							name: words[1],
							count: parseInt(words[2], 10),
							properties: []
						});
						return _context.abrupt("break", 42);
					case 34:
						if (dataTypeMap.has(words[1])) {
							_context.next = 36;
							break;
						}
						throw new Error("Unrecognized property data type '" + words[1] + "' in ply header");
					case 36:
						element = elements[elements.length - 1];
						storageType = dataTypeMap.get(words[1]);
						storage = !propertyFilter || propertyFilter(words[2]) ? new storageType(element.count) : null;
						element.properties.push({
							type: words[1],
							name: words[2],
							storage: storage,
							byteSize: storageType.BYTES_PER_ELEMENT
						});
						return _context.abrupt("break", 42);
					case 41:
						throw new Error("Unrecognized header value '" + words[0] + "' in ply header");
					case 42:
						++i;
						_context.next = 24;
						break;
					case 45:
						readIndex = endHeaderIndex + endHeaderBytes.length;
						remaining = buf.length - readIndex;
						dataView = new DataView(buf.buffer);
						_i = 0;
					case 49:
						if (!(_i < elements.length)) {
							_context.next = 104;
							break;
						}
						_element = elements[_i];
						e = 0;
					case 52:
						if (!(e < _element.count)) {
							_context.next = 101;
							break;
						}
						j = 0;
					case 54:
						if (!(j < _element.properties.length)) {
							_context.next = 98;
							break;
						}
						property = _element.properties[j];
					case 56:
						if (!(remaining < property.byteSize)) {
							_context.next = 73;
							break;
						}
						_context.next = 59;
						return reader.read();
					case 59:
						_yield$reader$read2 = _context.sent;
						_value = _yield$reader$read2.value;
						_done = _yield$reader$read2.done;
						if (!_done) {
							_context.next = 64;
							break;
						}
						throw new Error('Stream finished before end of data');
					case 64:
						tmp = new Uint8Array(remaining + _value.byteLength);
						tmp.set(buf.slice(readIndex));
						tmp.set(_value, remaining);
						buf = tmp;
						dataView = new DataView(buf.buffer);
						readIndex = 0;
						remaining = buf.length;
						_context.next = 56;
						break;
					case 73:
						if (!property.storage) {
							_context.next = 93;
							break;
						}
						_context.t1 = property.type;
						_context.next = _context.t1 === 'char' ? 77 : _context.t1 === 'uchar' ? 79 : _context.t1 === 'short' ? 81 : _context.t1 === 'ushort' ? 83 : _context.t1 === 'int' ? 85 : _context.t1 === 'uint' ? 87 : _context.t1 === 'float' ? 89 : _context.t1 === 'double' ? 91 : 93;
						break;
					case 77:
						property.storage[e] = dataView.getInt8(readIndex);
						return _context.abrupt("break", 93);
					case 79:
						property.storage[e] = dataView.getUint8(readIndex);
						return _context.abrupt("break", 93);
					case 81:
						property.storage[e] = dataView.getInt16(readIndex, true);
						return _context.abrupt("break", 93);
					case 83:
						property.storage[e] = dataView.getUint16(readIndex, true);
						return _context.abrupt("break", 93);
					case 85:
						property.storage[e] = dataView.getInt32(readIndex, true);
						return _context.abrupt("break", 93);
					case 87:
						property.storage[e] = dataView.getUint32(readIndex, true);
						return _context.abrupt("break", 93);
					case 89:
						property.storage[e] = dataView.getFloat32(readIndex, true);
						return _context.abrupt("break", 93);
					case 91:
						property.storage[e] = dataView.getFloat64(readIndex, true);
						return _context.abrupt("break", 93);
					case 93:
						readIndex += property.byteSize;
						remaining -= property.byteSize;
					case 95:
						++j;
						_context.next = 54;
						break;
					case 98:
						++e;
						_context.next = 52;
						break;
					case 101:
						++_i;
						_context.next = 49;
						break;
					case 104:
						return _context.abrupt("return", elements);
					case 105:
					case "end":
						return _context.stop();
				}
			}, _callee);
		}));
		return function readPly(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();

	var defaultElements = ['x', 'y', 'z', 'f_dc_0', 'f_dc_1', 'f_dc_2', 'opacity', 'rot_0', 'rot_1', 'rot_2', 'rot_3', 'scale_0', 'scale_1', 'scale_2'];
	var defaultElementsSet = new Set(defaultElements);
	var defaultElementFilter = function defaultElementFilter(val) {
		return defaultElementsSet.has(val);
	};
	var PlyParser = function () {
		function PlyParser(device, assets, maxRetries) {
			this.device = void 0;
			this.assets = void 0;
			this.maxRetries = void 0;
			this.device = device;
			this.assets = assets;
			this.maxRetries = maxRetries;
		}
		var _proto = PlyParser.prototype;
		_proto.load = function () {
			var _load = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(url, callback, asset) {
				var _asset$data$elementFi,
					_this = this;
				var response;
				return _regeneratorRuntime().wrap(function _callee$(_context) {
					while (1) switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return fetch(url.load);
						case 2:
							response = _context.sent;
							readPly(response.body.getReader(), (_asset$data$elementFi = asset.data.elementFilter) != null ? _asset$data$elementFi : defaultElementFilter).then(function (response) {
								callback(null, new SplatContainerResource(_this.device, new SplatData(response)));
							}).catch(function (err) {
								callback(err, null);
							});
						case 4:
						case "end":
							return _context.stop();
					}
				}, _callee);
			}));
			function load(_x, _x2, _x3) {
				return _load.apply(this, arguments);
			}
			return load;
		}();
		_proto.open = function open(url, data) {
			return data;
		};
		return PlyParser;
	}();
	var registerPlyParser = function registerPlyParser(app) {
		var containerHandler = app.loader.getHandler('container');
		containerHandler.parsers.ply = new PlyParser(app.graphicsDevice, app.assets, app.loader.maxRetries);
	};
	var getDefaultPlyElements = function getDefaultPlyElements() {
		return defaultElements.slice();
	};

	var fragmentShader = "\n    uniform sampler2D sceneTexture;\n    uniform sampler2D bloomTexture;\n    uniform float bloomIntensity;\n    varying vec2 uv0;\n    void main() {\n        vec4 scene = texture2D(sceneTexture, uv0);\n        vec3 bloom = texture2D(bloomTexture, uv0).rgb;\n\n        vec3 result = scene.rgb;\n        result += bloom * bloomIntensity;\n        result = toneMap(result);\n        result = gammaCorrectOutput(result);\n\n        gl_FragColor = vec4(result, scene.a);\n    }\n";
	var RenderPassCompose = function (_RenderPassShaderQuad) {
		_inheritsLoose(RenderPassCompose, _RenderPassShaderQuad);
		function RenderPassCompose(graphicsDevice) {
			var _this;
			_this = _RenderPassShaderQuad.call(this, graphicsDevice) || this;
			_this.bloomIntensity = 0.01;
			_this._toneMapping = playcanvas.TONEMAP_ACES2;
			_this._shaderDirty = true;
			_this._key = '';
			_this.sceneTextureId = graphicsDevice.scope.resolve('sceneTexture');
			_this.bloomTextureId = graphicsDevice.scope.resolve('bloomTexture');
			_this.bloomIntensityId = graphicsDevice.scope.resolve('bloomIntensity');
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
				var key = "" + this.toneMapping;
				if (this._key !== key) {
					this._key = key;
					var fsChunks = playcanvas.shaderChunks.decodePS + playcanvas.shaderChunks.gamma2_2PS + this.toneMapChunk;
					this.shader = this.createQuadShader("ComposeShader-" + key, fsChunks + fragmentShader);
				}
			}
		};
		_proto.execute = function execute() {
			this.sceneTextureId.setValue(this.sceneTexture);
			this.bloomTextureId.setValue(this.bloomTexture);
			this.bloomIntensityId.setValue(this.bloomIntensity);
			_RenderPassShaderQuad.prototype.execute.call(this);
		};
		_createClass(RenderPassCompose, [{
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

	var RenderPassDownSample = function (_RenderPassShaderQuad) {
		_inheritsLoose(RenderPassDownSample, _RenderPassShaderQuad);
		function RenderPassDownSample(device, sourceTexture) {
			var _this;
			_this = _RenderPassShaderQuad.call(this, device) || this;
			_this.sourceTexture = sourceTexture;
			_this.shader = _this.createQuadShader('DownSampleShader', "\n\n            uniform sampler2D sourceTexture;\n            uniform vec2 sourceInvResolution;\n            varying vec2 uv0;\n\n            void main()\n            {\n                float x = sourceInvResolution.x;\n                float y = sourceInvResolution.y;\n\n                vec3 a = texture2D (sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y + 2.0 * y)).rgb;\n                vec3 b = texture2D (sourceTexture, vec2 (uv0.x,           uv0.y + 2.0 * y)).rgb;\n                vec3 c = texture2D (sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y + 2.0 * y)).rgb;\n\n                vec3 d = texture2D (sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y)).rgb;\n                vec3 e = texture2D (sourceTexture, vec2 (uv0.x,           uv0.y)).rgb;\n                vec3 f = texture2D (sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y)).rgb;\n\n                vec3 g = texture2D (sourceTexture, vec2 (uv0.x - 2.0 * x, uv0.y - 2.0 * y)).rgb;\n                vec3 h = texture2D (sourceTexture, vec2 (uv0.x,           uv0.y - 2.0 * y)).rgb;\n                vec3 i = texture2D (sourceTexture, vec2 (uv0.x + 2.0 * x, uv0.y - 2.0 * y)).rgb;\n\n                vec3 j = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y + y)).rgb;\n                vec3 k = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y + y)).rgb;\n                vec3 l = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y - y)).rgb;\n                vec3 m = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y - y)).rgb;\n\n                vec3 value = e * 0.125;\n                value += (a + c + g + i) * 0.03125;\n                value += (b + d + f + h) * 0.0625;\n                value += (j + k + l + m) * 0.125;\n\n                gl_FragColor = vec4(value, 1.0);\n            }");
			_this.sourceTextureId = device.scope.resolve('sourceTexture');
			_this.sourceInvResolutionId = device.scope.resolve('sourceInvResolution');
			_this.sourceInvResolutionValue = new Float32Array(2);
			return _this;
		}
		var _proto = RenderPassDownSample.prototype;
		_proto.execute = function execute() {
			this.sourceTextureId.setValue(this.sourceTexture);
			this.sourceInvResolutionValue[0] = 1.0 / this.sourceTexture.width;
			this.sourceInvResolutionValue[1] = 1.0 / this.sourceTexture.height;
			this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue);
			_RenderPassShaderQuad.prototype.execute.call(this);
		};
		return RenderPassDownSample;
	}(playcanvas.RenderPassShaderQuad);

	var RenderPassUpSample = function (_RenderPassShaderQuad) {
		_inheritsLoose(RenderPassUpSample, _RenderPassShaderQuad);
		function RenderPassUpSample(device, sourceTexture) {
			var _this;
			_this = _RenderPassShaderQuad.call(this, device) || this;
			_this.sourceTexture = sourceTexture;
			_this.shader = _this.createQuadShader('UpSampleShader', "\n\n            uniform sampler2D sourceTexture;\n            uniform vec2 sourceInvResolution;\n            varying vec2 uv0;\n\n            void main()\n            {\n                float x = sourceInvResolution.x;\n                float y = sourceInvResolution.y;\n\n                vec3 a = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y + y)).rgb;\n                vec3 b = texture2D (sourceTexture, vec2 (uv0.x,     uv0.y + y)).rgb;\n                vec3 c = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y + y)).rgb;\n\n                vec3 d = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y)).rgb;\n                vec3 e = texture2D (sourceTexture, vec2 (uv0.x,     uv0.y)).rgb;\n                vec3 f = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y)).rgb;\n\n                vec3 g = texture2D (sourceTexture, vec2 (uv0.x - x, uv0.y - y)).rgb;\n                vec3 h = texture2D (sourceTexture, vec2 (uv0.x,     uv0.y - y)).rgb;\n                vec3 i = texture2D (sourceTexture, vec2 (uv0.x + x, uv0.y - y)).rgb;\n\n                vec3 value = e * 4.0;\n                value += (b + d + f + h) * 2.0;\n                value += (a + c + g + i);\n                value *= 1.0 / 16.0;\n\n                gl_FragColor = vec4(value, 1.0);\n            }");
			_this.sourceTextureId = device.scope.resolve('sourceTexture');
			_this.sourceInvResolutionId = device.scope.resolve('sourceInvResolution');
			_this.sourceInvResolutionValue = new Float32Array(2);
			return _this;
		}
		var _proto = RenderPassUpSample.prototype;
		_proto.execute = function execute() {
			this.sourceTextureId.setValue(this.sourceTexture);
			this.sourceInvResolutionValue[0] = 1.0 / this.sourceTexture.width;
			this.sourceInvResolutionValue[1] = 1.0 / this.sourceTexture.height;
			this.sourceInvResolutionId.setValue(this.sourceInvResolutionValue);
			_RenderPassShaderQuad.prototype.execute.call(this);
		};
		return RenderPassUpSample;
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
				var pass = new RenderPassDownSample(device, passSourceTexture);
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
				var _pass = new RenderPassUpSample(device, passSourceTexture);
				var _rt = this.renderTargets[_i];
				_pass.init(_rt);
				_pass.blendState = playcanvas.BlendState.ADDBLEND;
				this.beforePasses.push(_pass);
				passSourceTexture = _rt.colorBuffer;
			}
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

	exports.GltfExporter = GltfExporter;
	exports.MiniStats = MiniStats;
	exports.RenderPassBloom = RenderPassBloom;
	exports.RenderPassCompose = RenderPassCompose;
	exports.RenderPassDownSample = RenderPassDownSample;
	exports.RenderPassUpSample = RenderPassUpSample;
	exports.Splat = Splat;
	exports.SplatData = SplatData;
	exports.SplatInstance = SplatInstance;
	exports.UsdzExporter = UsdzExporter;
	exports.getDefaultPlyElements = getDefaultPlyElements;
	exports.registerPlyParser = registerPlyParser;

}));
