(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.TWEEN = global.TWEEN || {})));
}(this, (function (exports) { 'use strict';

/* global global */
var root = typeof (window) !== 'undefined' ? window : typeof (global) !== 'undefined' ? global : this;

if (!Object.assign) {
  Object.assign = function (source) {
    var args = [], len$1 = arguments.length - 1;
    while ( len$1-- > 0 ) args[ len$1 ] = arguments[ len$1 + 1 ];

    for (var i = 0, len = args.length; i < len; i++) {
      var arg = args[i];
      for (var p in arg) {
        source[p] = arg[p];
      }
    }
    return source
  };
}
if (!Object.create) {
  Object.create = function (source) {
    return Object.assign({}, source || {})
  };
}
if (!Array.isArray) {
  Array.isArray = function (source) { return source && source.push && source.splice; };
}
if (typeof (requestAnimationFrame) === 'undefined') {
  root.requestAnimationFrame = function (fn) { return root.setTimeout(fn, 16); };
}
if (typeof (cancelAnimationFrame) === 'undefined') {
  root.cancelAnimationFrame = function (id) { return root.clearTimeout(id); };
}

/* global process */
var _tweens = [];
var isStarted = false;
var _autoPlay = false;
var _tick;
var _ticker = root.requestAnimationFrame;
var _stopTicker = root.cancelAnimationFrame;

var add = function (tween) {
  _tweens.push(tween);

  if (_autoPlay && !isStarted) {
    _tick = _ticker(update);
    isStarted = true;
  }
};

var getAll = function () { return _tweens; };

var autoPlay = function (state) {
  _autoPlay = state;
};

var removeAll = function () {
  _tweens.length = 0;
};

var get = function (tween) {
  for (var i = 0; i < _tweens.length; i++) {
    if (tween === _tweens[i]) {
      return _tweens[i]
    }
  }

  return null
};

var has = function (tween) {
  return get(tween) !== null
};

var remove = function (tween) {
  var i = _tweens.indexOf(tween);
  if (i !== -1) {
    _tweens.splice(i, 1);
  }
};

var now = (function () {
  if (typeof (process) !== 'undefined' && process.hrtime !== undefined) {
    return function () {
      var time = process.hrtime();

      // Convert [seconds, nanoseconds] to milliseconds.
      return time[0] * 1000 + time[1] / 1000000
    }
  // In a browser, use window.performance.now if it is available.
  } else if (root.performance !== undefined &&
   root.performance.now !== undefined) {
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    return root.performance.now.bind(root.performance)
  // Use Date.now if it is available.
  } else {
    var offset = root.performance && root.performance.timing && root.performance.timing.navigationStart ? root.performance.timing.navigationStart : Date.now();
    return function () {
      return Date.now() - offset
    }
  }
}());

var update = function (time, preserve) {
  time = time !== undefined ? time : now();

  _tick = _ticker(update);

  if (_tweens.length === 0) {
    _stopTicker(_tick);
    isStarted = false;
    return false
  }

  var i = 0;
  while (i < _tweens.length) {
    _tweens[i].update(time, preserve);
    i++;
  }

  return true
};

var isRunning = function () { return isStarted; };

var Plugins = {};

// Normalise time when visiblity is changed (if available) ...
if (root.document && root.document.addEventListener) {
  var doc = root.document;
  var timeDiff = 0;
  var timePause = 0;
  doc.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      timePause = now();
      _stopTicker(_tick);
      isStarted = false;
    } else {
      timeDiff = now() - timePause;

      for (var i = 0, length = _tweens.length; i < length; i++) {
        _tweens[i]._startTime += timeDiff;
      }
      _tick = _ticker(update);
      isStarted = true;
    }

    return true
  });
}

var Easing = {

  Linear: {

    None: function None (k) {
      return k
    }

  },

  Quadratic: {

    In: function In (k) {
      return k * k
    },

    Out: function Out (k) {
      return k * (2 - k)
    },

    InOut: function InOut (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k
      }

      return -0.5 * (--k * (k - 2) - 1)
    }

  },

  Cubic: {

    In: function In (k) {
      return k * k * k
    },

    Out: function Out (k) {
      return --k * k * k + 1
    },

    InOut: function InOut (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k
      }

      return 0.5 * ((k -= 2) * k * k + 2)
    }

  },

  Quartic: {

    In: function In (k) {
      return k * k * k * k
    },

    Out: function Out (k) {
      return 1 - (--k * k * k * k)
    },

    InOut: function InOut (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k
      }

      return -0.5 * ((k -= 2) * k * k * k - 2)
    }

  },

  Quintic: {

    In: function In (k) {
      return k * k * k * k * k
    },

    Out: function Out (k) {
      return --k * k * k * k * k + 1
    },

    InOut: function InOut (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k
      }

      return 0.5 * ((k -= 2) * k * k * k * k + 2)
    }

  },

  Sinusoidal: {

    In: function In (k) {
      return 1 - Math.cos(k * Math.PI / 2)
    },

    Out: function Out (k) {
      return Math.sin(k * Math.PI / 2)
    },

    InOut: function InOut (k) {
      return 0.5 * (1 - Math.cos(Math.PI * k))
    }

  },

  Exponential: {

    In: function In (k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1)
    },

    Out: function Out (k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k)
    },

    InOut: function InOut (k) {
      if (k === 0) {
        return 0
      }

      if (k === 1) {
        return 1
      }

      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1)
      }

      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2)
    }

  },

  Circular: {

    In: function In (k) {
      return 1 - Math.sqrt(1 - k * k)
    },

    Out: function Out (k) {
      return Math.sqrt(1 - (--k * k))
    },

    InOut: function InOut (k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1)
      }

      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
    }

  },

  Elastic: {

    In: function In (k) {
      if (k === 0) {
        return 0
      }

      if (k === 1) {
        return 1
      }

      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI)
    },

    Out: function Out (k) {
      if (k === 0) {
        return 0
      }

      if (k === 1) {
        return 1
      }

      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1
    },

    InOut: function InOut (k) {
      if (k === 0) {
        return 0
      }

      if (k === 1) {
        return 1
      }

      k *= 2;

      if (k < 1) {
        return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI)
      }

      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1
    }

  },

  Back: {

    In: function In (k) {
      var s = 1.70158;

      return k * k * ((s + 1) * k - s)
    },

    Out: function Out (k) {
      var s = 1.70158;

      return --k * k * ((s + 1) * k + s) + 1
    },

    InOut: function InOut (k) {
      var s = 1.70158 * 1.525;

      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s))
      }

      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
    }

  },

  Bounce: {

    In: function In (k) {
      return 1 - Easing.Bounce.Out(1 - k)
    },

    Out: function Out (k) {
      if (k < (1 / 2.75)) {
        return 7.5625 * k * k
      } else if (k < (2 / 2.75)) {
        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75
      } else if (k < (2.5 / 2.75)) {
        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375
      } else {
        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375
      }
    },

    InOut: function InOut (k) {
      if (k < 0.5) {
        return Easing.Bounce.In(k * 2) * 0.5
      }

      return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5
    }

  }

};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var intertween = createCommonjsModule(function (module) {
/**
 * @name InterTween
 * @description The lightweight, fastest, smartest, effecient value interpolator with no-dependecy, zero-configuration and relative interpolation
 * @author dalisoft (https://github.com/dalisoft)
 * @license MIT-License
 * First Release at 20 August 2017, by @dalisoft
 */

(function (root, factory) {
    if (typeof undefined === 'function' && undefined.amd) {
        undefined([], factory);
    } else if ('object' !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        root.InterTween = factory();
    }
}
    (typeof(window) !== 'undefined' ? window : commonjsGlobal, function () {

        // RegExp variables
        var colorMatch = /rgb/g;
        var isIncrementReqForColor = /argb/g;
        // This RegExp (numRegExp) is original from @jkroso string tweening and optimized by @dalisoft
        var numRegExp =
                /\s+|([A-Za-z?().,{}:""[\]#]+)|([-+/*%]+=)?([-+*/%]+)?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
        var hexColor = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
        var trimRegExp = /\n|\r|\t/g;
        var rgbMax = 255;

        // Helpers
        function s2f(val) {
            var floatedVal = parseFloat(val);
            return typeof floatedVal === "number" && !isNaN(floatedVal) ? floatedVal : val;
        }
        var isArray = Array.isArray;

        function h2r_f(all, hex) {
            var r;
            var g;
            var b;
            if (hex.length === 3) {
                r = hex[0];
                g = hex[1];
                b = hex[2];
                hex = r + r + g + g + b + b;
            }
            var color = parseInt(hex, 16);
            r = color >> 16 & rgbMax;
            g = color >> 8 & rgbMax;
            b = color & rgbMax;
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        function trim(str) {
            return typeof str === "string" ? str.replace(trimRegExp, "") : str;
        }
        var relativeModes = {
            '+=': 1,
            '-=': 1,
            '*=': 2,
            '/=': 3,
            '%=': 4
        };

        function r2n(s, e) {
            if (typeof e === 'number') {
                return e;
            } else {
                var rv = relativeModes[e.substr(0, 2)],
                v = e.substr(2);
                if (rv === 1) {
                    var e2 = e[0] + v;
                    return s + parseFloat(e2);
                } else if (rv === 2) {
                    return s * +v;
                } else if (rv === 3) {
                    return s / +v;
                } else if (rv === 4) {
                    return s * (+v / 100);
                }
            }
            return e;
        }

        var h2r = function (hex) {
            return typeof hex !== 'string' ? hex : trim(hex)
            .replace(hexColor, h2r_f);
        };

        function s2n(str) {
            return h2r(str).match(numRegExp).map(s2f);
        }

        // Splitted functions
        function stringTween(s, e, d) {
            d = d !== undefined ? d : 10000;
            if (!numRegExp.test(e))
                { return e; }
            var sv = s2n(s);
            var ev = s2n(e);
            var uv = unitTween(sv, ev, d);
            if (uv) {
                return uv;
            }
            uv = null;
            var cm = null;
            var cmls = null;
            var rv = [];
            for (var i = 0, len = ev.length; i < len; i++) {
                var ve = ev[i],
                vs = sv[i];
                rv[i] = typeof ve === 'string' && ve.indexOf('=') === 1 ? e : null;
                if (isIncrementReqForColor.test(ve)) {
                    cm = i + 2;
                    cmls = i + 11;
                } else if (colorMatch.test(ve)) {
                    cm = i;
                    cmls = i + 9;
                }
                ev[i] = vs === ve ? null : rv[i] !== null ? r2n(vs, ve) : typeof ve === 'number' ? ve - vs : ve;
            }
            return function (t) {
                var str = '';
                for (var i = 0, len = ev.length; i < len; i++) {
                    var a = sv[i],
                    b = ev[i],
                    r = rv[i];
                    str += typeof b === 'number' ? cm !== null && i > cm &&
                    i < cmls ? (a + b * t) | 0 : (((a + b * t) * d) |
                        0) / d : a;
                    if (t === 1 && r !== null) {
                        sv[i] += b;
                        ev[i] = r2n(sv[i], r);
                    }
                }
                return str;
            }
        }

        function tweenThemTo(sv, ev) {
            var vs = [];
            for (var i = 0, len = sv.length; i < len; i++) {
                var s = sv[i];
                vs[i] = isArray(s) ? arrayTween(s, ev) : typeof s === 'object' ? objectTween(s, ev) : typeof s === 'string' ? stringTween(s, ev) : s;
            }
            return function (t) {
                for (var i = 0, len = vs.length; i < len; i++) {
                    sv[i] = vs[i](t);
                }
                return sv;
            }
        }

        function parseInterpolatables(sv, ev) {
            var vs = [];
            for (var i = 0, len = ev.length; i < len; i++) {
                var e = ev[i];
                vs[i] = mainTween(i === 0 ? sv : ev[i - 1], e);
            }
			var lastItem = ev[ev.length - 1];
			vs.push(mainTween(lastItem, lastItem));
			var endLength = vs.length - 1;
            return function (t) {
				var totalTime = t * endLength;
				var roundedTime = Math.floor(totalTime);
				var elapsed = totalTime - roundedTime;

				var item = vs[roundedTime];
				var interpolated = item(elapsed);
				return interpolated;
			};
        }

        function arrayTween(sv, ev, d) {
            d = d !== undefined ? d : 10000;
            var s = sv.slice();
            var rv = [];
			var minLength = Math.min(sv.length, ev.length);
            for (var i = 0; i < minLength; i++) {
                var vs = s[i],
                ve = ev[i];
                rv[i] = typeof ve === 'string' && ve.indexOf('=') === 1 ? ve : null;
                s[i] = ve.nodeType ? ve : ve.update ? ve : vs === ve ? null : isArray(ve) ?
                    isArray(vs) && ve.length === vs.length ? arrayTween(vs, ve, d) : parseInterpolatables(vs, ve) : isArray(vs) ? tweenThemTo(vs, ve) : typeof vs === 'object' ?
                    objectTween(vs, ve, d) : typeof vs === 'string' ?
                    stringTween(vs, ve, d) : vs !== undefined ? vs : ve;
				ev[i] = rv[i] !== null ? r2n(
                        vs, ve) : ve;
            }
            return function (t) {
                for (var i = 0; i < minLength; i++) {
                    var a = s[i],
                    b = ev[i],
                    r = rv[i];
                    if (a === null || a === undefined)
                        { continue; }
                    sv[i] = typeof a === 'number' ? (((a + (b - a) * t) * d) | 0) /
                        d : typeof a === 'function' ? a(t) : a.update ? a.update(t) : b && b.update ? b.update(t) : b;
                    if (r && t === 1) {
                        s[i] = b;
                        ev[i] = r2n(s[i], r);
                    }
                }
                return sv;
            }
        }

        var units = ["px", "pt", "pc", "deg", "rad", "turn", "em", "ex", "cm", "mm", "dm", "inch", "in", "rem", "vw", "vh", "vmin", "vmax", "%"];
        function unitTween(sv, ev, d) {
            d = d !== undefined ? d : 10000;
            if (ev.length === 2 && sv.length === 2) {
                var unidx = units.indexOf(ev[1]);
                if (unidx !== -1) {
                    var s = +sv[0],
                    e = +ev[0],
                    u = ev[1],
					r = typeof ev[0] === 'string' && ev[0].indexOf('=') === 1 ? ev[0] : null;
					if (r) {
						e = r2n(s, e);
					}
                    return function (t) {
                        var v = ((((s + (e - s) * t) * d) | 0) / d) + u;
						if (r && t === 1) {
							s = e;
							e = r2n(s, r);
						}
						return v;
                    }
                }
            }
            return false;
        }

        function objectTween(sv, ev, d) {
            d = d !== undefined ? d : 10000;
            var rv = {};
            var s = {};
            for (var i in sv) {
                s[i] = sv[i];
                var vs = s[i],
                ve = ev[i];
                rv[i] = typeof ve === 'string' && ve.indexOf('=') === 1 ? ve : null;
				if (ve === undefined) { continue; }
                s[i] = ve.nodeType || ve.update ? ve : vs === ve ? null : isArray(ve) ?
                    isArray(vs) && ve.length === vs.length ? arrayTween(vs, ve, d) : parseInterpolatables(vs, ve) : isArray(vs) ? tweenThemTo(vs, ve) : typeof vs === 'object' ?
                    objectTween(vs, ve, d) : typeof vs === 'string' ?
                    stringTween(vs, ve, d) : vs !== undefined ? vs : ve;
				ev[i] = rv[i] !== null ? r2n(vs, ve) : ve;
            }
            return function (t) {
                for (var i in ev) {
                    var a = s[i],
                    b = ev[i],
                    r = rv[i];
                    if (a === null || a === undefined)
                        { continue; }
                    sv[i] = typeof a === 'number' ? (((a + (b - a) * t) * d) | 0) /
                        d : typeof a === 'function' ? a(t) : a.update ? a.update(t) : b.update ? b.update(t) : b;
                    if (r && t === 1) {
                        s[i] = b;
                        ev[i] = r2n(s[i], r);
                    }
                }
                return sv;
            }
        }

        function mainTween(sv, ev, d) {
            d = d !== undefined ? d : 10000;
			var rv = typeof(ev) === 'string' && typeof sv === 'number' && ev.indexOf('=') === 1 ? ev : null;
			if (rv) {
				ev = r2n(sv, rv);
			}
            return ev.nodeType ? ev : sv.nodeType ? sv : isArray(ev) ? isArray(sv) && sv.length === ev.length ? arrayTween(sv, ev, d) : parseInterpolatables(sv, ev) : isArray(sv) ? tweenThemTo(sv, ev) : typeof ev === 'object' ?
            objectTween(sv, ev, d) : typeof ev === 'string' ? stringTween(sv, ev, d) :
            typeof ev === 'function' ? ev : function (t) {
				var vv = typeof ev === 'number' ? (((sv + (ev - sv) * t) *
                        d) | 0) / d : sv;
				if (rv && t === 1) {
					sv += ev;
					ev = r2n(sv, rv);
				}
                return vv;
            }
        }

        return mainTween;

    }));
});

var Store = {};
var NodeCache = function (node, tween) {
  if (!node || !node.nodeType) { return tween }
  var ID = node.queueID || 'queue_' + Math.round(Math.random() * 1000 + Date.now());
  if (!node.queueID) {
    node.queueID = ID;
  }
  if (Store[ID]) {
    if (tween) {
      Store[ID] = Object.assign(Store[ID], tween);
    }
    return Store[ID]
  }

  Store[ID] = tween;
  return Store[ID]
};

var EventClass = function EventClass () {
  this._events = {};
};

EventClass.prototype.on = function on (event, callback) {
  if (!this._events[event]) {
    this._events[event] = [];
  }

  this._events[event].push(callback);
  return this
};

EventClass.prototype.once = function once (event, callback) {
    var this$1 = this;

  if (!this._events[event]) {
    this._events[event] = [];
  }

  var ref = this;
    var _events = ref._events;
  var spliceIndex = _events[event].length;
  this._events[event].push(function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    callback.apply(this$1, args);
    _events[event].splice(spliceIndex, 1);
  });
  return this
};

EventClass.prototype.off = function off (event, callback) {
  var ref = this;
    var _events = ref._events;

  if (event === undefined || !_events[event]) {
    return this
  }

  if (callback) {
    this._events[event] = this._events[event].filter(function (cb) { return cb !== callback; });
  } else {
    this._events[event].length = 0;
  }

  return this
};

EventClass.prototype.emit = function emit (event, arg1, arg2, arg3, arg4) {
  var ref = this;
    var _events = ref._events;

  var _event = _events[event];

  if (!_event || !_event.length) {
    return this
  }

  var i = 0;
  var len = _event.length;
  for (; i < len; i++) {
    _event[i](arg1, arg2, arg3, arg4);
  }
};

// Events list
var EVENT_UPDATE = 'update';
var EVENT_COMPLETE = 'complete';
var EVENT_START = 'start';
var EVENT_REPEAT = 'repeat';
var EVENT_REVERSE = 'reverse';
var EVENT_PAUSE = 'pause';
var EVENT_PLAY = 'play';
var EVENT_RS = 'restart';
var EVENT_STOP = 'stop';
var EVENT_SEEK = 'seek';

var _id = 0; // Unique ID

var Tween = (function (EventClass$$1) {
  function Tween (node, object) {
    EventClass$$1.call(this);

    this.id = _id++;
    if (typeof node !== 'undefined' && !object && !node.nodeType) {
      object = this.object = node;
      node = null;
    } else if (typeof node !== 'undefined') {
      this.node = node;
      if (typeof object === 'object') {
        object = this.object = NodeCache(node, object);
      } else {
        this.object = object;
      }
    }
    var isArr = this.isArr = Array.isArray(object);
    this._valuesStart = isArr ? [] : {};
    this._valuesEnd = null;

    this._duration = 1000;
    this._easingFunction = Easing.Linear.None;

    this._startTime = 0;
    this._delayTime = 0;
    this._repeat = 0;
    this._r = 0;
    this._isPlaying = false;
    this._yoyo = false;
    this._reversed = false;

    this._onStartCallbackFired = false;
    this._pausedTime = null;
    this._isFinite = true;

    return this
  }

  if ( EventClass$$1 ) Tween.__proto__ = EventClass$$1;
  Tween.prototype = Object.create( EventClass$$1 && EventClass$$1.prototype );
  Tween.prototype.constructor = Tween;

  Tween.prototype.isPlaying = function isPlaying () {
    return this._isPlaying
  };

  Tween.prototype.isStarted = function isStarted () {
    return this._onStartCallbackFired
  };

  Tween.prototype.reverse = function reverse () {
    var ref = this;
    var _reversed = ref._reversed;

    this._reversed = !_reversed;

    return this
  };

  Tween.prototype.reversed = function reversed () {
    return this._reversed
  };

  Tween.prototype.pause = function pause () {
    if (!this._isPlaying) {
      return this
    }

    this._isPlaying = false;

    remove(this);
    this._pausedTime = now();

    return this.emit(EVENT_PAUSE, this.object)
  };

  Tween.prototype.play = function play () {
    if (this._isPlaying) {
      return this
    }

    this._isPlaying = true;

    this._startTime += now() - this._pausedTime;
    add(this);
    this._pausedTime = now();

    return this.emit(EVENT_PLAY, this.object)
  };

  Tween.prototype.restart = function restart (noDelay) {
    this._repeat = this._r;
    this._startTime = now() + (noDelay ? 0 : this._delayTime);

    if (!this._isPlaying) {
      add(this);
    }

    return this.emit(EVENT_RS, this._object)
  };

  Tween.prototype.seek = function seek (time, keepPlaying) {
    this._startTime = now() + Math.max(0, Math.min(
      time, this._duration));

    this.emit(EVENT_SEEK, time, this._object);

    return keepPlaying ? this : this.pause()
  };

  Tween.prototype.duration = function duration (amount) {
    this._duration = typeof (amount) === 'function' ? amount(this._duration) : amount;

    return this
  };

  Tween.prototype.to = function to (properties, duration) {
    var this$1 = this;
    if ( duration === void 0 ) duration = 1000;

    this._valuesEnd = properties;

    if (typeof duration === 'number' || typeof (duration) === 'function') {
      this._duration = typeof (duration) === 'function' ? duration(this._duration) : duration;
    } else if (typeof duration === 'object') {
      for (var prop in duration) {
        if (this$1[prop]) {
          (ref = this$1)[prop].apply(ref, (Array.isArray(duration) ? duration : [duration]));
        }
      }
    }

    return this
    var ref;
  };

  Tween.prototype.render = function render () {
    var this$1 = this;

    if (this._rendered) {
      return this
    }

    var ref = this;
    var _valuesEnd = ref._valuesEnd;
    var _valuesStart = ref._valuesStart;
    var object = ref.object;
    var Renderer = ref.Renderer;

    for (var property in _valuesEnd) {
      var start = object[property];
      var end = _valuesEnd[property];

      if (Plugins[property]) {
        _valuesEnd[property] = new Plugins[property](this$1, start, end);
        continue
      }

      if (object[property] === undefined) {
        continue
      }

      if (typeof start === 'number' && typeof end === 'number') {
        _valuesStart[property] = start;
        _valuesEnd[property] = end;
      } else {
        _valuesEnd[property] = intertween(start, end);
      }
    }

    if (Renderer && this.node) {
      this.__render = new Renderer(this, object, _valuesEnd);
    }

    return this
  };

  Tween.prototype.start = function start (time) {
    this._startTime = time !== undefined ? time : now();
    this._startTime += this._delayTime;

    add(this);

    this._isPlaying = true;

    return this
  };

  Tween.prototype.stop = function stop () {
    var ref = this;
    var _isPlaying = ref._isPlaying;
    var object = ref.object;

    if (!_isPlaying) {
      return this
    }

    remove(this);
    this._isPlaying = false;

    return this.emit(EVENT_STOP, object)
  };

  Tween.prototype.end = function end () {
    var ref = this;
    var _startTime = ref._startTime;
    var _duration = ref._duration;

    return this.update(_startTime + _duration)
  };

  Tween.prototype.delay = function delay (amount) {
    this._delayTime = typeof (amount) === 'function' ? amount(this._delayTime) : amount;
    this._startTime += this._delayTime;

    return this
  };

  Tween.prototype.repeat = function repeat (amount) {
    this._repeat = typeof (amount) === 'function' ? amount(this._repeat) : amount;
    this._r = this._repeat;
    this._isFinite = isFinite(amount);

    return this
  };

  Tween.prototype.repeatDelay = function repeatDelay (amount) {
    this._repeatDelayTime = typeof (amount) === 'function' ? amount(this._repeatDelayTime) : amount;

    return this
  };

  Tween.prototype.reverseDelay = function reverseDelay (amount) {
    this._reverseDelayTime = typeof (amount) === 'function' ? amount(this._reverseDelayTime) : amount;

    return this
  };

  Tween.prototype.yoyo = function yoyo (state) {
    this._yoyo = typeof (state) === 'function' ? state(this._yoyo) : state;

    return this
  };

  Tween.prototype.easing = function easing (fn) {
    this._easingFunction = fn;

    return this
  };

  Tween.prototype.reassignValues = function reassignValues () {
    var ref = this;
    var _valuesStart = ref._valuesStart;
    var _valuesEnd = ref._valuesEnd;
    var object = ref.object;
    var isArr = ref.isArr;

    for (var property in _valuesEnd) {
      if (isArr) {
        property *= 1;
      }

      var start = _valuesStart[property];
      var end = _valuesEnd[property];

      object[property] = typeof end === 'function' ? end(0) : start;
    }

    return this
  };

  Tween.prototype.get = function get$$1 (time) {
    this.update(time);
    return this.object
  };

  Tween.prototype.update = function update$$1 (time, preserve) {
    var ref = this;
    var _onStartCallbackFired = ref._onStartCallbackFired;
    var _easingFunction = ref._easingFunction;
    var _repeat = ref._repeat;
    var _repeatDelayTime = ref._repeatDelayTime;
    var _reverseDelayTime = ref._reverseDelayTime;
    var _yoyo = ref._yoyo;
    var _reversed = ref._reversed;
    var _startTime = ref._startTime;
    var _duration = ref._duration;
    var _valuesStart = ref._valuesStart;
    var _valuesEnd = ref._valuesEnd;
    var object = ref.object;
    var _isFinite = ref._isFinite;
    var __render = ref.__render;

    var elapsed;
    var value;
    var property;

    time = time !== undefined ? time : now();

    if (time < _startTime) {
      return true
    }

    if (!_onStartCallbackFired) {
      if (!this._rendered) {
        this.render();
        this._rendered = true;
      }

      this.emit(EVENT_START, object);

      this._onStartCallbackFired = true;
    }

    elapsed = (time - _startTime) / _duration;
    elapsed = elapsed > 1 ? 1 : elapsed;
    elapsed = _reversed ? 1 - elapsed : elapsed;

    for (property in _valuesEnd) {
      value = _easingFunction[property] ? _easingFunction[property](elapsed) : _easingFunction(elapsed);

      var start = _valuesStart[property];
      var end = _valuesEnd[property];

      if (typeof end === 'number') {
        object[property] = start + (end - start) * value;
      } else if (typeof end === 'function') {
        object[property] = end(value);
      }
    }

    if (__render) {
      __render.update(object, elapsed);
    }

    this.emit(EVENT_UPDATE, object, elapsed);

    if (elapsed === 1 || (_reversed && elapsed === 0)) {
      if (_repeat) {
        if (_isFinite) {
          this._repeat--;
        }

        if (_yoyo) {
          this._reversed = !_reversed;
        }

        if (!_reversed && _repeatDelayTime) {
          this._startTime = time + _repeatDelayTime;
        } else if (_reversed && _reverseDelayTime) {
          this._startTime = time + _reverseDelayTime;
        } else {
          this._startTime = time;
        }

        return true
      } else {
        if (!preserve) {
          remove(this);
        }
        this.emit(EVENT_COMPLETE, object);
        this._repeat = this._r;

        return false
      }
    }

    return true
  };

  return Tween;
}(EventClass));

var PlaybackPosition = function PlaybackPosition () {
  this.totalTime = 0;
  this.labels = [];
  this.offsets = [];
};
PlaybackPosition.prototype.parseLabel = function parseLabel (name, offset) {
  var ref = this;
    var offsets = ref.offsets;
    var labels = ref.labels;
  var i = labels.indexOf(name);
  if (typeof name === 'string' && name.indexOf('=') !== -1 && !offset && i === -1) {
    var rty = name.substr(name.indexOf('=') - 1, 2);
    var rt = name.split(rty);
    offset = rt.length === 2 ? rty + rt[1] : null;
    name = rt[0];
    i = labels.indexOf(name);
  }
  if (i !== -1 && name) {
    var currOffset = offsets[i] || 0;
    if (typeof offset === 'number') {
      currOffset = offset;
    } else if (typeof offset === 'string') {
      if (offset.indexOf('=') !== -1) {
        var type = offset.charAt(0);
        offset = Number(offset.substr(2));
        if (type === '+' || type === '-') {
          currOffset += parseFloat(type + offset);
        } else if (type === '*') {
          currOffset *= offset;
        } else if (type === '/') {
          currOffset /= offset;
        } else if (type === '%') {
          currOffset *= offset / 100;
        }
      }
    }
    return currOffset
  }
  return typeof offset === 'number' ? offset : 0
};
PlaybackPosition.prototype.addLabel = function addLabel (name, offset) {
  this.labels.push(name);
  this.offsets.push(this.parseLabel(name, offset));
  return this
};
PlaybackPosition.prototype.setLabel = function setLabel (name, offset) {
  var i = this.labels.indexOf(name);
  if (i !== -1) {
    this.offsets.splice(i, 1, this.parseLabel(name, offset));
  }
  return this
};
PlaybackPosition.prototype.eraseLabel = function eraseLabel (name) {
  var i = this.labels.indexOf(name);
  if (i !== -1) {
    this.labels.splice(i, 1);
    this.offsets.splice(i, 1);
  }
  return this
};

var _id$1 = 0;
var Timeline = (function (Tween$$1) {
  function Timeline (params) {
    Tween$$1.call(this);
    this._totalDuration = 0;
    this._startTime = now();
    this._tweens = {};
    this._elapsed = 0;
    this._id = _id$1++;
    this._defaultParams = params;
    this.position = new PlaybackPosition();
    this.position.addLabel('afterLast', this._totalDuration);
    this.position.addLabel('afterInit', this._startTime);

    return this
  }

  if ( Tween$$1 ) Timeline.__proto__ = Tween$$1;
  Timeline.prototype = Object.create( Tween$$1 && Tween$$1.prototype );
  Timeline.prototype.constructor = Timeline;

  Timeline.prototype.addLabel = function addLabel (name, offset) {
    this.position.addLabel(name, offset);
    return this
  };

  Timeline.prototype.map = function map (fn) {
    var this$1 = this;

    for (var tween in this$1._tweens) {
      var _tween = this$1._tweens[tween];
      fn(_tween, +tween);
      this$1._totalDuration = Math.max(this$1._totalDuration, _tween._duration + _tween._startTime);
    }
    return this
  };

  Timeline.prototype.add = function add$$1 (tween, position) {
    var this$1 = this;

    if (Array.isArray(tween)) {
      tween.map(function (_tween) {
        this$1.add(_tween, position);
      });
      return this
    } else if (typeof tween === 'object' && !(tween instanceof Tween$$1)) {
      tween = new Tween$$1(tween.from).to(tween.to, tween);
    }

    var ref = this;
    var _defaultParams = ref._defaultParams;
    var _totalDuration = ref._totalDuration;

    if (_defaultParams) {
      for (var method in _defaultParams) {
        tween[method](_defaultParams[method]);
      }
    }

    var offset = typeof position === 'number' ? position : this.position.parseLabel(typeof position !== 'undefined' ? position : 'afterLast', null);
    tween._startTime = this._startTime;
    tween._startTime += offset;
    this._totalDuration = Math.max(_totalDuration, tween._startTime + tween._delayTime + tween._duration);
    this._tweens[tween.id] = tween;
    this.position.setLabel('afterLast', this._totalDuration);
    return this
  };

  Timeline.prototype.restart = function restart () {
    this._startTime += now();

    add(this);

    return this.emit(EVENT_RS)
  };

  Timeline.prototype.easing = function easing (easing$1) {
    return this.map(function (tween) { return tween.easing(easing$1); })
  };

  Timeline.prototype.interpolation = function interpolation (interpolation$1) {
    return this.map(function (tween) { return tween.interpolation(interpolation$1); })
  };

  Timeline.prototype.reverse = function reverse () {
    this._reversed = !this._reversed;
    return this.emit(EVENT_REVERSE)
  };

  Timeline.prototype.update = function update$$1 (time) {
    var ref = this;
    var _tweens = ref._tweens;
    var _totalDuration = ref._totalDuration;
    var _repeatDelayTime = ref._repeatDelayTime;
    var _reverseDelayTime = ref._reverseDelayTime;
    var _startTime = ref._startTime;
    var _reversed = ref._reversed;
    var _yoyo = ref._yoyo;
    var _repeat = ref._repeat;
    var _isFinite = ref._isFinite;

    if (time < _startTime) {
      return true
    }

    var elapsed = Math.min(1, Math.max(0, (time - _startTime) / _totalDuration));
    elapsed = _reversed ? 1 - elapsed : elapsed;
    this._elapsed = elapsed;

    var timing = time - _startTime;
    var _timing = _reversed ? _totalDuration - timing : timing;

    for (var tween in _tweens) {
      var _tween = _tweens[tween];
      if (_tween.skip) {
        _tween.skip = false;
      } else if (_tween.update(_timing)) {
        continue
      } else {
        _tween.skip = true;
      }
    }

    this.emit(EVENT_UPDATE, elapsed, timing);

    if (elapsed === 1 || (_reversed && elapsed === 0)) {
      if (_repeat) {
        if (_isFinite) {
          this._repeat--;
        }

        this.emit(_reversed ? EVENT_REVERSE : EVENT_REPEAT);

        if (_yoyo) {
          this.reverse();
        }

        if (!_reversed && _repeatDelayTime) {
          this._startTime += _totalDuration + _repeatDelayTime;
        } else if (_reversed && _reverseDelayTime) {
          this._startTime += _totalDuration + _reverseDelayTime;
        } else {
          this._startTime += _totalDuration;
        }

        for (var tween$1 in _tweens) {
          var _tween$1 = _tweens[tween$1];
          if (_tween$1.skip) {
            _tween$1.skip = false;
          }
          _tween$1.reassignValues();
        }

        return true
      } else {
        this.emit(EVENT_COMPLETE);
        this._repeat = this._r;

        for (var tween$2 in _tweens) {
          var _tween$2 = _tweens[tween$2];
          if (_tween$2.skip) {
            _tween$2.skip = false;
          }
        }

        return false
      }
    }

    return true
  };

  Timeline.prototype.elapsed = function elapsed (value) {
    return value !== undefined ? this.update(value * this._totalDuration) : this._elapsed
  };

  Timeline.prototype.seek = function seek (value) {
    return this.update(value < 1.1 ? value * this._totalDuration : value)
  };

  return Timeline;
}(Tween));

exports.Plugins = Plugins;
exports.Interpolator = intertween;
exports.has = has;
exports.get = get;
exports.getAll = getAll;
exports.removeAll = removeAll;
exports.remove = remove;
exports.add = add;
exports.now = now;
exports.update = update;
exports.autoPlay = autoPlay;
exports.isRunning = isRunning;
exports.Tween = Tween;
exports.Easing = Easing;
exports.Timeline = Timeline;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Tween.js.map
