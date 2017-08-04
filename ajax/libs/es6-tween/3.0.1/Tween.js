(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.TWEEN = global.TWEEN || {})));
}(this, (function (exports) { 'use strict';

/* global global, window, Object, document, process, requestAnimationFrame, cancelAnimationFrame, setTimeout, clearTimeout */

var _tweens = {};
var isStarted = false;
var _autoPlay = false;
var _tick;
var root = typeof (window) !== 'undefined' ? window : typeof (global) !== 'undefined' ? global : {};
var _nextId = 0;

var _ticker = function (fn) { return typeof (requestAnimationFrame) !== 'undefined' ? requestAnimationFrame(fn) : setTimeout(fn, 16.6); };
var _stopTicker = function (fn) { return typeof (cancelAnimationFrame) !== 'undefined' ? cancelAnimationFrame(fn) : clearTimeout(fn); };

var setProp = function (o, p, param) { return Object.defineProperty(o, p, param); };
setProp(_tweens, 'length', {enumerable: false, writable: true, value: 0});

var add = function (tween) {
  var id = tween.id;
  _tweens[id] = tween;
  _tweens.length++;

  if (_autoPlay && !isStarted) {
    update();
    isStarted = true;
  }
};

var nextId = function () {
  var id = _nextId;
  _nextId++;
  return id
};

var getAll = function () {
  return _tweens
};

var autoPlay = function (state) {
  _autoPlay = state;
};

var removeAll = function () {
  for (var id in _tweens) {
    _tweens[+id] = null;
    delete _tweens[+id];
  }
  _tweens.length = 0;
};

var get = function (tween) {
  for (var searchTween in _tweens) {
    if (tween.id === +searchTween) {
      return _tweens[+searchTween]
    }
  }

  return null
};

var has = function (tween) {
  return get(tween) !== null
};

var remove = function (tween) {
  for (var searchTween in _tweens) {
    if (tween.id === +searchTween) {
      delete _tweens[+searchTween];
      _tweens.length--;
    }
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

  if (_autoPlay) {
    _tick = _ticker(update);
  }

  if (_tweens.length === 0) {
    isStarted = false;
    _stopTicker(_tick);
    return false
  }

  for (var i in _tweens) {
    if (_tweens[i].update(time) || preserve) {
      i++;
    } else {
      delete _tweens[+i];
      _tweens.length--;
    }
  }

  return true
};

var Plugins = {};

// Normalise time when visiblity is changed (if available) ...
if (root.document) {
  var doc = root.document;
  var timeDiff = 0;
  var timePause = 0;
  doc.addEventListener('visibilitychange', function () {
    if (_tweens.length === 0) {
      return false
    }

    if (document.hidden) {
      timePause = now();
    } else {
      timeDiff = now() - timePause;

      for (var tween in _tweens) {
        _tweens[tween]._startTime += timeDiff;
      }
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

var Interpolation = {

  Linear: function Linear (v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.Linear;

    if (k < 0) {
      return fn(v[0], v[1], f)
    }

    if (k > 1) {
      return fn(v[m], v[m - 1], m - f)
    }

    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i)
  },

  Bezier: function Bezier (v, k) {
    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = Interpolation.Utils.Bernstein;

    for (var i = 0; i <= n; i++) {
      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }

    return b
  },

  CatmullRom: function CatmullRom (v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.CatmullRom;

    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }

      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i)
    } else {
      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0])
      }

      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m])
      }

      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i)
    }
  },

  Utils: {

    Linear: function Linear (p0, p1, t) {
      return typeof p1 === 'function' ? p1(t) : (p1 - p0) * t + p0
    },

    Bernstein: function Bernstein (n, i) {
      var fc = Interpolation.Utils.Factorial;

      return fc(n) / fc(i) / fc(n - i)
    },

    Factorial: (function () {
      var a = [1];

      return function (n) {
        var s = 1;

        if (a[n]) {
          return a[n]
        }

        for (var i = n; i > 1; i--) {
          s *= i;
        }

        a[n] = s;
        return s
      }
    })(),

    CatmullRom: function CatmullRom (p0, p1, p2, p3, t) {
      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      var t2 = t * t;
      var t3 = t * t2;

      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
    }

  }

};

function toNumber (val) {
  var floatedVal = parseFloat(val);
  return typeof floatedVal === 'number' && !isNaN(floatedVal) ? floatedVal : val
}

var colorMatch = /rgb|hsl|hsv/g;
var isIncrementReqForColor = /ahsv|ahsl|argb/g;

// Credits:
// @jkroso for string parse library
// Optimized, Extended by @dalisoft
var numRegExp =
  /\s+|([A-Za-z?().,{}:""[\]#]+)|([-+/*%]+=)?([-+*/%]+)?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var hexColor = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
var trimRegExp = /\n|\r|\t/g;
var hexReplace = function (all, hex) {
  var r;
  var g;
  var b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 6), 16);
  }

  return ("rgb(" + r + "," + g + "," + b + ")")
};
var trim = function (str) { return typeof str === 'string' ? str.replace(trimRegExp, '') : str; };

var SubTween = function (start, end, roundv) {
  if ( roundv === void 0 ) roundv = 10000;

  if (typeof end === 'function' || (end && end.nodeType)) {
	return end;
  } else if (start && start.nodeType) {
	return start;
  } else if (Array.isArray(start)) {
    var isColorPropsExist = null;
    var startIndex = null;
    end = end.map(function (v, i) { return typeof v === "string" && colorMatch.test(v) ? ((isColorPropsExist = v), (startIndex = i), null) : v === start[i] ? null : typeof v === 'number' ? (v - start[i]) : typeof v === "string" && numRegExp.test(v) ? SubTween(trim(start[i]), trim(v)) : SubTween(start[i], v); });
    var endIndex = startIndex !== null ? startIndex + 6 : null;
    if (isColorPropsExist && isIncrementReqForColor.test(isColorPropsExist)) {
      startIndex++;
      endIndex++;
    }

    var map = [].concat( start );
    return function (t) {
      for (var i = 0, v = (void 0), length = end.length; i < length; i++) {
        v = end[i];
        if (typeof v === 'function') {
          map[i] = v(t);
        } else if (typeof v === 'number') {
          map[i] = (((start[i] + v * t) * roundv) | 0) / roundv;

          if (startIndex !== null && i > startIndex && i < endIndex) {
            map[i] = map[i] | 0;
          }
        }
      }

      return map
    }
  } else if (typeof start === 'object') {
    for (var property in end) {
      if (end[property] === start[property]) {
        end[property] = null;
      } else if (typeof start[property] === 'number') {
        end[property] -= start[property];
      } else if (typeof end[property] === 'object' || (typeof end[property] === 'string' && numRegExp.test(end[property]))) {
        end[property] = SubTween(start[property], end[property]);
      }
    }

    var map$1 = Object.assign({}, start);
    return function (t) {
      for (var property in end) {
        var to = end[property];
        if (typeof to === 'function') {
          map$1[property] = to(t);
        } else if (typeof to === 'number') {
          map$1[property] = (((start[property] + to * t) * roundv) | 0) / roundv;
        }
      }

      return map$1
    }
  } else if (typeof start === 'number') {
    end -= start;
    var isSame = start === end;
    return function (t) {
      return isSame ? end : (((start + end * t) * roundv) | 0) / roundv
    }
  } else if ((typeof start === 'string' && typeof end === 'string' && numRegExp.test(start) && numRegExp.test(end)) || (typeof end === 'string' && start && (hexColor.test(start) || hexColor.test(end)))) {
    var _startMap = trim(start).replace(hexColor, hexReplace).match(numRegExp).map(toNumber);
    var _endMap = trim(end).replace(hexColor, hexReplace).match(numRegExp).map(toNumber);
    var _tween = SubTween(_startMap, _endMap);
    return function (t) {
      var _t = _tween(t);
      var i = 0;
      var s = '';
      while (i < _t.length) {
        s += _t[i];
        i++;
      }

      return s
    }
  } else if (!Array.isArray(start) && Array.isArray(end)) {
    end.unshift(start);
    end.push(end[end.length - 1]);
    return end.map(function (v, i) { return SubTween(i === 0 ? start : end[i - 1], v); })
  } else {
    return end
  }
};

var Store = {
  add: function (tween) {
    if (Store[tween] && JSON.stringify(tween) && JSON.stringify(Store[tween])) {
      return Store[tween]
    }

    Store[tween] = tween;
    return tween
  }
};

var EventClass = function EventClass () {
  this._events = {};
};

EventClass.prototype.bind = function bind (scope) {
  this._bind = scope;
  return this
};

EventClass.prototype.on = function on (event, callback) {
  if (!this._events[event]) {
    this._events[event] = [];
  }

  this._events[event].push(callback);
  return this
};

EventClass.prototype.once = function once (event, callback) {
  if (!this._events[event]) {
    this._events[event] = [];
  }

  var ref = this;
    var _events = ref._events;
    var _bind = ref._bind;
  var spliceIndex = _events[event].length;
  this._events[event].push(function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    callback.apply(_bind, args);
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
    var _bind = ref._bind;

  if (event === undefined || !_events[event]) {
    return this
  }

  var _event = _events[event];

  for (var i = 0, length = _event.length; i < length; i++) {
    _event[i].call(_bind, arg1, arg2, arg3, arg4);
  }
};

var defaultEasing = Easing.Linear.None;

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

var Tween = (function (EventClass$$1) {
  function Tween (object, instate) {
    if ( object === void 0 ) object = {};

    EventClass$$1.call(this);

	if (object.node) {
    this.node = object.node;
	delete object.node;
	}
    this.object = object;
    this._valuesStart = Tween.createEmptyConst(object);
    this._valuesEnd = Tween.createEmptyConst(object);

    this._duration = 1000;
    this._easingFunction = defaultEasing;
    this._interpolationFunction = Interpolation.Linear;

    this._startTime = 0;
    this._delayTime = 0;
    this._repeat = 0;
    this._r = 0;
    this._isPlaying = false;
    this._yoyo = false;
    this._reversed = false;

    this._onStartCallbackFired = false;
    this._pausedTime = null;
    this.id = nextId();
    this._plugins = {};

    if (instate && instate.to) {
      return new Tween(object)
        .to(instate.to, instate)
    }

    return this
  }

  if ( EventClass$$1 ) Tween.__proto__ = EventClass$$1;
  Tween.prototype = Object.create( EventClass$$1 && EventClass$$1.prototype );
  Tween.prototype.constructor = Tween;

  Tween.createEmptyConst = function createEmptyConst (oldObject) {
    return typeof (oldObject) === 'number' ? 0 : Array.isArray(oldObject) ? [] : typeof (oldObject) === 'object' ? {}
      : ''
  };

  Tween.checkValidness = function checkValidness (valid) {
    return valid !== undefined && valid !== null && valid !== '' && ((typeof valid === 'number' && !isNaN(valid)) || typeof valid !== 'number') && valid !== Infinity
  };

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

  Tween.prototype.useActiveMode = function useActiveMode () {
    this.object = Store.add(this.object);
    return this
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
    if ( properties === void 0 ) properties = {};
    if ( duration === void 0 ) duration = 1000;

    if (typeof properties === 'object') {
      this._valuesEnd = properties;
    }

    if (typeof duration === 'number') {
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
    var object = ref.object;

    for (var property in _valuesEnd) {
      var isPluginProp = Plugins[property];
      if (isPluginProp) {
        isPluginProp = this$1._plugins[property] = new Plugins[property](this$1, object[property], _valuesEnd[property]);
        isPluginProp.preprocess && isPluginProp.preprocess(object[property], _valuesEnd[property]);
      }
      if (typeof _valuesEnd[property] === 'object' && _valuesEnd[property]) {
        this$1._valuesEnd[property] = SubTween(object[property], _valuesEnd[property]);
        if (typeof this$1._valuesEnd[property] === 'function') {
          this$1.object[property] = this$1._valuesEnd[property](0);
        }
      } else if (typeof _valuesEnd[property] === 'string' && typeof object[property] === 'string') {
        this$1._valuesEnd[property] = SubTween(object[property], _valuesEnd[property]);
        if (typeof this$1._valuesEnd[property] === 'function') {
          this$1.object[property] = this$1._valuesEnd[property](0);
        }
      }

      // If `to()` specifies a property that doesn't exist in the source object,
      // we should not set that property in the object
      if (Tween.checkValidness(object[property]) === false) {
        continue
      }

      // If duplicate or non-tweening numerics matched,
      // we should skip from adding to _valuesStart
      if (object[property] === _valuesEnd[property]) {
        continue
      }

      this$1._valuesStart[property] = object[property];

      if (isPluginProp) {
        isPluginProp.postprocess && isPluginProp.postprocess(this$1.object[property], this$1._valuesEnd[property]);
      }
    }

    return this
  };

  Tween.prototype.start = function start (time) {
    this._startTime = time !== undefined ? time : now();
    this._startTime += this._delayTime;

    this.render();
    this._rendered = true;

    add(this);

    this.emit(EVENT_START, this.object);

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

  Tween.prototype.interpolation = function interpolation (fn) {
    this._interpolationFunction = fn;

    return this
  };

  Tween.prototype.get = function get$$1 (time) {
    this.update(time);
    return this.object
  };

  Tween.prototype.update = function update$$1 (time) {
    var this$1 = this;

    var ref = this;
    var _onStartCallbackFired = ref._onStartCallbackFired;
    var _easingFunction = ref._easingFunction;
    var _interpolationFunction = ref._interpolationFunction;
    var _repeat = ref._repeat;
    var _repeatDelayTime = ref._repeatDelayTime;
    var _reverseDelayTime = ref._reverseDelayTime;
    var _yoyo = ref._yoyo;
    var _reversed = ref._reversed;
    var _startTime = ref._startTime;
    var _duration = ref._duration;
    var _valuesStart = ref._valuesStart;
    var _valuesEnd = ref._valuesEnd;
    var _plugins = ref._plugins;
    var object = ref.object;

    var property;
    var elapsed;
    var value;

    time = time !== undefined ? time : now();

    if (time < _startTime) {
      return true
    }

    if (!_onStartCallbackFired) {
      if (!this._rendered) {
        this.render();

        this.emit(EVENT_START, object);

        this._rendered = true;
      }

      this._onStartCallbackFired = true;
    }

    elapsed = (time - _startTime) / _duration;
    elapsed = elapsed > 1 ? 1 : elapsed;
    elapsed = _reversed ? 1 - elapsed : elapsed;

    value = typeof _easingFunction === 'function' ? _easingFunction(elapsed) : defaultEasing(elapsed);

    for (property in _valuesEnd) {
      // Don't update properties that do not exist in the source object
      if (_valuesStart[property] === undefined) {
        continue
      }

      var start = _valuesStart[property];
      var end = _valuesEnd[property];
      var plugin = _plugins[property];
      value = _easingFunction[property] ? _easingFunction[property](elapsed) : value;

      if (plugin) {
        plugin.update(value, elapsed, _reversed);
      } else if (typeof end === 'function') {
        object[property] = end(value);
      } else if (Array.isArray(end)) {
        object[property] = _interpolationFunction(end, value);
      } else if (typeof (end) === 'string') {
        if (end.charAt(0) === '+' || end.charAt(0) === '-') {
          end = start + parseFloat(end);
        } else {
          end = parseFloat(end);
        }

        // Protect against non numeric properties.
        if (typeof (end) === 'number') {
          object[property] = start + (end - start) * value;
        }
      } else if (typeof (start) === 'number') {
        object[property] = start + (end - start) * value;
      }
    }

    this.emit(EVENT_UPDATE, object, value, elapsed);

    this.object = object;

    if (elapsed === 1 || (_reversed && elapsed === 0)) {
      if (_repeat) {
        if (isFinite(_repeat)) {
          this._repeat--;
        }

        for (property in _valuesEnd) {
          if (typeof (_valuesEnd[property]) === 'string' && typeof (_valuesStart[property]) === 'number') {
            this$1._valuesStart[property] = _valuesStart[property] + parseFloat(_valuesEnd[property]);
          }
        }

        // Reassign starting values, restart by making startTime = now
        this.emit(_reversed ? EVENT_REVERSE : EVENT_REPEAT, object);

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

        return true
      } else {
        this.emit(EVENT_COMPLETE, object);
        this._repeat = this._r;

        return false
      }
    }

    return true
  };

  return Tween;
}(EventClass));

var Timeline = (function (Tween$$1) {
  function Timeline (params) {
    Tween$$1.call(this);
    this._totalDuration = 0;
    this._startTime = now();
    this._tweens = {};
    this._elapsed = 0;
    this._id = nextId();
    this._labels = {};
    this._defaultParams = params;

    return this
  }

  if ( Tween$$1 ) Timeline.__proto__ = Tween$$1;
  Timeline.prototype = Object.create( Tween$$1 && Tween$$1.prototype );
  Timeline.prototype.constructor = Timeline;

  Timeline.prototype.setLabel = function setLabel (name, value) {
    this._labels[name] = this.parsePosition(0, value, 0);
    return this
  };

  Timeline.prototype.parsePosition = function parsePosition (startTime, input, total) {
    var this$1 = this;

    var position = startTime + total;

    if (typeof input === 'string') {
      for (var label in this$1._labels) {
        if (input.indexOf(label) === 0) {
          var inp = input.split(label)[1];

          if (inp.length === 0 || (inp[0] === '+' || inp[0] === '-')) {
            position = this$1._labels[label] + startTime;
            input = input.replace(label, '');
          }
        }
      }

      if (input.indexOf('+') === 0 || input.indexOf('-') === 0) {
        position += parseFloat(input);
      }
    } else if (typeof input === 'number') {
      position += input;
    }

    return position
  };

  Timeline.prototype.map = function map (fn) {
    var this$1 = this;

    for (var tween in this$1._tweens) {
      fn(this$1._tweens[tween]);
    }

    return this
  };

  Timeline.prototype.add = function add$$1 (tween, position) {
    if (typeof tween === 'object' && !(tween instanceof Tween$$1)) {
      tween = new Tween$$1(tween.from, tween);
    }

    var ref = this;
    var _defaultParams = ref._defaultParams;
    var _totalDuration = ref._totalDuration;

    if (_defaultParams) {
      for (var method in _defaultParams) {
        tween[method](_defaultParams[method]);
      }
    }

    tween._startTime = this.parsePosition(0, position, _totalDuration);
    tween._startTime += now();
    this._totalDuration = Math.max(_totalDuration, tween._duration + tween._startTime);
    this._tweens[tween.id] = tween;
    return this
  };

  Timeline.prototype.restart = function restart () {
    this._startTime += now();

    add(this);

    return this.emit('restart')
  };

  Timeline.prototype.easing = function easing (easing$1) {
    return this.map(function (tween) { return tween.easing(easing$1); })
  };

  Timeline.prototype.interpolation = function interpolation (interpolation$1) {
    return this.map(function (tween) { return tween.interpolation(interpolation$1); })
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
      if (_tween.skip || _tween.update(_timing)) {
        continue
      } else {
        _tween.skip = true;
      }
    }

    this.emit('update', elapsed, timing);

    if (elapsed === 1 || (_reversed && elapsed === 0)) {
      if (_repeat) {
        if (isFinite(_repeat)) {
          this._repeat--;
        }

        // Reassign starting values, restart by making startTime = now
        this.emit(_reversed ? 'reverse' : 'repeat');

        if (_yoyo) {
          this._reversed = !_reversed;
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
        }

        return true
      } else {
        this.emit('complete');
        this._repeat = this._r;

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

var lin = function (k) { return k; };

function TweenInit (target) {
  var from = target.from;
  var to = target.to;
  var duration = target.duration; if ( duration === void 0 ) duration = 1000;
  var easing = target.easing; if ( easing === void 0 ) easing = lin;
  var events = target.events;
  var instance = target.instance;
  var tweenInstance = new Tween(from, instance).to(to, duration).easing(easing);
  if (events) {
    tweenInstance._events = events;
  }

  target.start = tweenInstance.start.bind(tweenInstance);
}

exports.Plugins = Plugins;
exports.TweenInit = TweenInit;
exports.Interpolator = SubTween;
exports.nextId = nextId;
exports.has = has;
exports.get = get;
exports.getAll = getAll;
exports.removeAll = removeAll;
exports.remove = remove;
exports.add = add;
exports.now = now;
exports.update = update;
exports.autoPlay = autoPlay;
exports.Tween = Tween;
exports.Easing = Easing;
exports.Interpolation = Interpolation;
exports.Timeline = Timeline;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Tween.js.map
