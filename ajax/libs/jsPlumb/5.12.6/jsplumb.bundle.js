var jsPlumbBrowserUI = (function (exports) {
  'use strict';

  function filterList(list, value, missingIsFalse) {
    if (list === "*") {
      return true;
    }
    return list.length > 0 ? list.indexOf(value) !== -1 : !missingIsFalse;
  }
  function extend(o1, o2, keys) {
    var i;
    o1 = o1 || {};
    o2 = o2 || {};
    var _o1 = o1,
        _o2 = o2;
    if (keys) {
      for (i = 0; i < keys.length; i++) {
        _o1[keys[i]] = _o2[keys[i]];
      }
    } else {
      for (i in _o2) {
        _o1[i] = _o2[i];
      }
    }
    return o1;
  }
  function isNumber(n) {
    return Object.prototype.toString.call(n) === "[object Number]";
  }
  function isString(s) {
    return typeof s === "string";
  }
  function isBoolean(s) {
    return typeof s === "boolean";
  }
  function isObject(o) {
    return o == null ? false : Object.prototype.toString.call(o) === "[object Object]";
  }
  function isDate(o) {
    return Object.prototype.toString.call(o) === "[object Date]";
  }
  function isFunction(o) {
    return Object.prototype.toString.call(o) === "[object Function]";
  }
  function isNamedFunction(o) {
    return isFunction(o) && o.name != null && o.name.length > 0;
  }
  function isEmpty(o) {
    for (var i in o) {
      if (o.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }
  function clone(a) {
    if (isString(a)) {
      return "" + a;
    } else if (isBoolean(a)) {
      return !!a;
    } else if (isDate(a)) {
      return new Date(a.getTime());
    } else if (isFunction(a)) {
      return a;
    } else if (Array.isArray(a)) {
      var _b = [];
      for (var i = 0; i < a.length; i++) {
        _b.push(clone(a[i]));
      }
      return _b;
    } else if (isObject(a)) {
      var c = {};
      for (var j in a) {
        c[j] = clone(a[j]);
      }
      return c;
    } else {
      return a;
    }
  }
  function filterNull(obj) {
    var o = {};
    for (var k in obj) {
      if (obj[k] != null) {
        o[k] = obj[k];
      }
    }
    return o;
  }
  function merge(a, b, collations, overwrites) {
    var cMap = {},
        ar,
        i,
        oMap = {};
    collations = collations || [];
    overwrites = overwrites || [];
    for (i = 0; i < collations.length; i++) {
      cMap[collations[i]] = true;
    }
    for (i = 0; i < overwrites.length; i++) {
      oMap[overwrites[i]] = true;
    }
    var c = clone(a);
    for (i in b) {
      if (c[i] == null || oMap[i]) {
        c[i] = b[i];
      } else if (cMap[i]) {
        ar = [];
        ar.push.apply(ar, Array.isArray(c[i]) ? c[i] : [c[i]]);
        ar.push(b[i]);
        c[i] = ar;
      } else if (isString(b[i]) || isBoolean(b[i]) || isFunction(b[i]) || isNumber(b[i])) {
        c[i] = b[i];
      } else {
        if (Array.isArray(b[i])) {
          ar = [];
          if (Array.isArray(c[i])) {
            ar.push.apply(ar, c[i]);
          }
          ar.push.apply(ar, b[i]);
          c[i] = ar;
        } else if (isObject(b[i])) {
          if (!isObject(c[i])) {
            c[i] = {};
          }
          for (var j in b[i]) {
            c[i][j] = b[i][j];
          }
        }
      }
    }
    return c;
  }
  function _areEqual(a, b) {
    if (a != null && b == null) {
      return false;
    } else {
      if ((a == null || isString(a) || isBoolean(a) || isNumber(a)) && a !== b) {
        return false;
      } else {
        if (Array.isArray(a)) {
          if (!Array.isArray(b)) {
            return false;
          } else {
            if (!arraysEqual(a, b)) {
              return false;
            }
          }
        } else if (isObject(a)) {
          if (!isObject(a)) {
            return false;
          } else {
            if (!objectsEqual(a, b)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  function arraysEqual(a, b) {
    if (a == null && b == null) {
      return true;
    } else if (a == null && b != null) {
      return false;
    } else if (a != null && b == null) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    } else {
      for (var i = 0; i < a.length; i++) {
        if (!_areEqual(a[i], b[i])) {
          return false;
        }
      }
    }
    return true;
  }
  function objectsEqual(a, b) {
    if (a == null && b == null) {
      return true;
    } else if (a == null && b != null) {
      return false;
    } else if (a != null && b == null) {
      return false;
    }
    for (var key in a) {
      var va = a[key],
          vb = b[key];
      if (!_areEqual(va, vb)) {
        return false;
      }
    }
    return true;
  }
  function replace(inObj, path, value) {
    if (inObj == null) {
      return;
    }
    var q = inObj,
        t = q;
    path.replace(/([^\.])+/g, function (term, lc, pos, str) {
      var array = term.match(/([^\[0-9]+){1}(\[)([0-9+])/),
          last = pos + term.length >= str.length,
          _getArray = function _getArray() {
        return t[array[1]] || function () {
          t[array[1]] = [];
          return t[array[1]];
        }();
      };
      if (last) {
        if (array) {
          _getArray()[array[3]] = value;
        } else {
          t[term] = value;
        }
      } else {
        if (array) {
          var _a2 = _getArray();
          t = _a2[array[3]] || function () {
            _a2[array[3]] = {};
            return _a2[array[3]];
          }();
        } else {
          t = t[term] || function () {
            t[term] = {};
            return t[term];
          }();
        }
      }
      return "";
    });
    return inObj;
  }
  function functionChain(successValue, failValue, fns) {
    for (var i = 0; i < fns.length; i++) {
      var o = fns[i][0][fns[i][1]].apply(fns[i][0], fns[i][2]);
      if (o === failValue) {
        return o;
      }
    }
    return successValue;
  }
  function populate(model, values, functionPrefix, doNotExpandFunctions) {
    var getValue = function getValue(fromString) {
      var matches = fromString.match(/(\${.*?})/g);
      if (matches != null) {
        for (var i = 0; i < matches.length; i++) {
          var val = values[matches[i].substring(2, matches[i].length - 1)] || "";
          if (val != null) {
            fromString = fromString.replace(matches[i], val);
          }
        }
      }
      matches = fromString.match(/({{.*?}})/g);
      if (matches != null) {
        for (var _i = 0; _i < matches.length; _i++) {
          var _val = values[matches[_i].substring(2, matches[_i].length - 2)] || "";
          if (_val != null) {
            fromString = fromString.replace(matches[_i], _val);
          }
        }
      }
      return fromString;
    };
    var _one = function _one(d) {
      if (d != null) {
        if (isString(d)) {
          return getValue(d);
        } else if (isFunction(d) && !doNotExpandFunctions && (functionPrefix == null || (d.name || "").indexOf(functionPrefix) === 0)) {
          return d(values);
        } else if (Array.isArray(d)) {
          var r = [];
          for (var i = 0; i < d.length; i++) {
            r.push(_one(d[i]));
          }
          return r;
        } else if (isObject(d)) {
          var s = {};
          for (var j in d) {
            s[j] = _one(d[j]);
          }
          return s;
        } else {
          return d;
        }
      }
    };
    return _one(model);
  }
  function forEach(a, f) {
    if (a) {
      for (var i = 0; i < a.length; i++) {
        f(a[i]);
      }
    } else {
      return null;
    }
  }
  function findWithFunction(a, f) {
    if (a) {
      for (var i = 0; i < a.length; i++) {
        if (f(a[i])) {
          return i;
        }
      }
    }
    return -1;
  }
  function findAllWithFunction(a, predicate) {
    var o = [];
    if (a) {
      for (var i = 0; i < a.length; i++) {
        if (predicate(a[i])) {
          o.push(i);
        }
      }
    }
    return o;
  }
  function getWithFunction(a, f) {
    var idx = findWithFunction(a, f);
    return idx === -1 ? null : a[idx];
  }
  function getAllWithFunction(a, f) {
    var indexes = findAllWithFunction(a, f);
    return indexes.map(function (i) {
      return a[i];
    });
  }
  function getFromSetWithFunction(s, f) {
    var out = null;
    s.forEach(function (t) {
      if (f(t)) {
        out = t;
      }
    });
    return out;
  }
  function setToArray(s) {
    var a = [];
    s.forEach(function (t) {
      a.push(t);
    });
    return a;
  }
  function removeWithFunction(a, f) {
    var idx = findWithFunction(a, f);
    if (idx > -1) {
      a.splice(idx, 1);
    }
    return idx !== -1;
  }
  function fromArray(a) {
    if (Array.fromArray != null) {
      return Array.from(a);
    } else {
      var arr = [];
      Array.prototype.push.apply(arr, a);
      return arr;
    }
  }
  function remove(l, v) {
    var idx = l.indexOf(v);
    if (idx > -1) {
      l.splice(idx, 1);
    }
    return idx !== -1;
  }
  function addWithFunction(list, item, hashFunction) {
    if (findWithFunction(list, hashFunction) === -1) {
      list.push(item);
    }
  }
  function addToDictionary(map, key, value, insertAtStart) {
    var l = map[key];
    if (l == null) {
      l = [];
      map[key] = l;
    }
    l[insertAtStart ? "unshift" : "push"](value);
    return l;
  }
  function addToList(map, key, value, insertAtStart) {
    var l = map.get(key);
    if (l == null) {
      l = [];
      map.set(key, l);
    }
    l[insertAtStart ? "unshift" : "push"](value);
    return l;
  }
  function suggest(list, item, insertAtHead) {
    if (list.indexOf(item) === -1) {
      if (insertAtHead) {
        list.unshift(item);
      } else {
        list.push(item);
      }
      return true;
    }
    return false;
  }
  var lut = [];
  for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + i.toString(16);
  }
  function uuid() {
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
  }
  function rotatePoint(point, center, rotation) {
    var radial = {
      x: point.x - center.x,
      y: point.y - center.y
    },
        cr = Math.cos(rotation / 360 * Math.PI * 2),
        sr = Math.sin(rotation / 360 * Math.PI * 2);
    return {
      x: radial.x * cr - radial.y * sr + center.x,
      y: radial.y * cr + radial.x * sr + center.y,
      cr: cr,
      sr: sr
    };
  }
  function rotateAnchorOrientation(orientation, rotation) {
    var r = rotatePoint({
      x: orientation[0],
      y: orientation[1]
    }, {
      x: 0,
      y: 0
    }, rotation);
    return [Math.round(r.x), Math.round(r.y)];
  }
  function fastTrim(s) {
    if (s == null) {
      return null;
    }
    var str = s.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;
    while (ws.test(str.charAt(--i))) {}
    return str.slice(0, i + 1);
  }
  function each(obj, fn) {
    obj = obj.length == null || typeof obj === "string" ? [obj] : obj;
    for (var _i2 = 0; _i2 < obj.length; _i2++) {
      fn(obj[_i2]);
    }
  }
  function map(obj, fn) {
    var o = [];
    for (var _i3 = 0; _i3 < obj.length; _i3++) {
      o.push(fn(obj[_i3]));
    }
    return o;
  }
  var logEnabled = true;
  function log() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof console !== "undefined") {
      try {
        var msg = arguments[arguments.length - 1];
        console.log(msg);
      } catch (e) {}
    }
  }
  function sgn$1(x) {
    return x < 0 ? -1 : x > 0 ? 1 : 0;
  }
  function wrap(wrappedFunction, newFunction, returnOnThisValue) {
    return function () {
      var r = null;
      try {
        if (newFunction != null) {
          r = newFunction.apply(this, arguments);
        }
      } catch (e) {
        log("jsPlumb function failed : " + e);
      }
      if (wrappedFunction != null && (returnOnThisValue == null || r !== returnOnThisValue)) {
        try {
          r = wrappedFunction.apply(this, arguments);
        } catch (e) {
          log("wrapped function failed : " + e);
        }
      }
      return r;
    };
  }
  function getsert(map, key, valueGenerator) {
    if (!map.has(key)) {
      map.set(key, valueGenerator());
    }
    return map.get(key);
  }
  function isAssignableFrom(object, cls) {
    var proto = object.__proto__;
    while (proto != null) {
      if (proto instanceof cls) {
        return true;
      } else {
        proto = proto.__proto__;
      }
    }
    return false;
  }
  function insertSorted(value, array, comparator, sortDescending) {
    if (array.length === 0) {
      array.push(value);
    } else {
      var flip = sortDescending ? -1 : 1;
      var min = 0;
      var max = array.length;
      var index = Math.floor((min + max) / 2);
      while (max > min) {
        var c = comparator(value, array[index]) * flip;
        if (c < 0) {
          max = index;
        } else {
          min = index + 1;
        }
        index = Math.floor((min + max) / 2);
      }
      array.splice(index, 0, value);
    }
  }

  function _classCallCheck$5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$5(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$5(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$5(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$5(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$5(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits$4(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf$4(subClass, superClass);
  }

  function _getPrototypeOf$4(o) {
    _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$4(o);
  }

  function _setPrototypeOf$4(o, p) {
    _setPrototypeOf$4 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$4(o, p);
  }

  function _isNativeReflectConstruct$4() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized$4(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn$4(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$4(self);
  }

  function _createSuper$4(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$4();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf$4(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf$4(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn$4(this, result);
    };
  }

  var EventGenerator = function () {
    function EventGenerator() {
      _classCallCheck$5(this, EventGenerator);
      _defineProperty$5(this, "_listeners", {});
      _defineProperty$5(this, "eventsSuspended", false);
      _defineProperty$5(this, "tick", false);
      _defineProperty$5(this, "eventsToDieOn", {
        "ready": true
      });
      _defineProperty$5(this, "queue", []);
    }
    _createClass$5(EventGenerator, [{
      key: "fire",
      value: function fire(event, value, originalEvent) {
        var ret = null;
        if (!this.tick) {
          this.tick = true;
          if (!this.eventsSuspended && this._listeners[event]) {
            var l = this._listeners[event].length,
                i = 0,
                _gone = false;
            if (!this.shouldFireEvent || this.shouldFireEvent(event, value, originalEvent)) {
              while (!_gone && i < l && ret !== false) {
                if (this.eventsToDieOn[event]) {
                  this._listeners[event][i](value, originalEvent);
                } else {
                  try {
                    ret = this._listeners[event][i](value, originalEvent);
                  } catch (e) {
                    log("jsPlumb: fire failed for event " + event + " : " + (e.message || e));
                  }
                }
                i++;
                if (this._listeners == null || this._listeners[event] == null) {
                  _gone = true;
                }
              }
            }
          }
          this.tick = false;
          this._drain();
        } else {
          this.queue.unshift(arguments);
        }
        return ret;
      }
    }, {
      key: "_drain",
      value: function _drain() {
        var n = this.queue.pop();
        if (n) {
          this.fire.apply(this, n);
        }
      }
    }, {
      key: "unbind",
      value: function unbind(eventOrListener, listener) {
        if (arguments.length === 0) {
          this._listeners = {};
        } else if (arguments.length === 1) {
          if (typeof eventOrListener === "string") {
            delete this._listeners[eventOrListener];
          } else if (eventOrListener.__jsPlumb) {
            var evt;
            for (var i in eventOrListener.__jsPlumb) {
              evt = eventOrListener.__jsPlumb[i];
              remove(this._listeners[evt] || [], eventOrListener);
            }
          }
        } else if (arguments.length === 2) {
          remove(this._listeners[eventOrListener] || [], listener);
        }
        return this;
      }
    }, {
      key: "getListener",
      value: function getListener(forEvent) {
        return this._listeners[forEvent] || [];
      }
    }, {
      key: "isSuspendEvents",
      value: function isSuspendEvents() {
        return this.eventsSuspended;
      }
    }, {
      key: "setSuspendEvents",
      value: function setSuspendEvents(val) {
        this.eventsSuspended = val;
      }
    }, {
      key: "bind",
      value: function bind(event, listener, insertAtStart) {
        var _this = this;
        var _one = function _one(evt) {
          addToDictionary(_this._listeners, evt, listener, insertAtStart);
          listener.__jsPlumb = listener.__jsPlumb || {};
          listener.__jsPlumb[uuid()] = evt;
        };
        if (typeof event === "string") {
          _one(event);
        } else if (event.length != null) {
          for (var i = 0; i < event.length; i++) {
            _one(event[i]);
          }
        }
        return this;
      }
    }, {
      key: "silently",
      value: function silently(fn) {
        this.setSuspendEvents(true);
        try {
          fn();
        } catch (e) {
          log("Cannot execute silent function " + e);
        }
        this.setSuspendEvents(false);
      }
    }]);
    return EventGenerator;
  }();
  var OptimisticEventGenerator = function (_EventGenerator) {
    _inherits$4(OptimisticEventGenerator, _EventGenerator);
    var _super = _createSuper$4(OptimisticEventGenerator);
    function OptimisticEventGenerator() {
      _classCallCheck$5(this, OptimisticEventGenerator);
      return _super.apply(this, arguments);
    }
    _createClass$5(OptimisticEventGenerator, [{
      key: "shouldFireEvent",
      value: function shouldFireEvent(event, value, originalEvent) {
        return true;
      }
    }]);
    return OptimisticEventGenerator;
  }(EventGenerator);

  var segmentMultipliers = [null, [1, -1], [1, 1], [-1, 1], [-1, -1]];
  var inverseSegmentMultipliers = [null, [-1, -1], [-1, 1], [1, 1], [1, -1]];
  var TWO_PI = 2 * Math.PI;
  function add(p1, p2) {
    return {
      x: p1.x + p2.x,
      y: p1.y + p2.y
    };
  }
  function subtract(p1, p2) {
    return {
      x: p1.x - p2.x,
      y: p1.y - p2.y
    };
  }
  function gradient(p1, p2) {
    if (p2.x === p1.x) return p2.y > p1.y ? Infinity : -Infinity;else if (p2.y === p1.y) return p2.x > p1.x ? 0 : -0;else return (p2.y - p1.y) / (p2.x - p1.x);
  }
  function normal(p1, p2) {
    return -1 / gradient(p1, p2);
  }
  function lineLength(p1, p2) {
    return Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));
  }
  function quadrant(p1, p2) {
    if (p2.x > p1.x) {
      return p2.y > p1.y ? 2 : 1;
    } else if (p2.x == p1.x) {
      return p2.y > p1.y ? 2 : 1;
    } else {
      return p2.y > p1.y ? 3 : 4;
    }
  }
  function theta(p1, p2) {
    var m = gradient(p1, p2),
        t = Math.atan(m),
        s = quadrant(p1, p2);
    if (s == 4 || s == 3) t += Math.PI;
    if (t < 0) t += 2 * Math.PI;
    return t;
  }
  function intersects(r1, r2) {
    var x1 = r1.x,
        x2 = r1.x + r1.w,
        y1 = r1.y,
        y2 = r1.y + r1.h,
        a1 = r2.x,
        a2 = r2.x + r2.w,
        b1 = r2.y,
        b2 = r2.y + r2.h;
    return x1 <= a1 && a1 <= x2 && y1 <= b1 && b1 <= y2 || x1 <= a2 && a2 <= x2 && y1 <= b1 && b1 <= y2 || x1 <= a1 && a1 <= x2 && y1 <= b2 && b2 <= y2 || x1 <= a2 && a1 <= x2 && y1 <= b2 && b2 <= y2 || a1 <= x1 && x1 <= a2 && b1 <= y1 && y1 <= b2 || a1 <= x2 && x2 <= a2 && b1 <= y1 && y1 <= b2 || a1 <= x1 && x1 <= a2 && b1 <= y2 && y2 <= b2 || a1 <= x2 && x1 <= a2 && b1 <= y2 && y2 <= b2;
  }
  function toABC(line) {
    var A = line[1].y - line[0].y;
    var B = line[0].x - line[1].x;
    return {
      A: A,
      B: B,
      C: fixPrecision(A * line[0].x + B * line[0].y)
    };
  }
  function fixPrecision(n, digits) {
    digits = digits == null ? 3 : digits;
    return Math.floor(n * Math.pow(10, digits)) / Math.pow(10, digits);
  }
  function lineIntersection(l1, l2) {
    var abc1 = toABC(l1),
        abc2 = toABC(l2),
        det = abc1.A * abc2.B - abc2.A * abc1.B;
    if (det == 0) {
      return null;
    } else {
      var candidate = {
        x: Math.round((abc2.B * abc1.C - abc1.B * abc2.C) / det),
        y: Math.round((abc1.A * abc2.C - abc2.A * abc1.C) / det)
      },
          l1xmin = Math.floor(Math.min(l1[0].x, l1[1].x)),
          l1xmax = Math.round(Math.max(l1[0].x, l1[1].x)),
          l1ymin = Math.floor(Math.min(l1[0].y, l1[1].y)),
          l1ymax = Math.round(Math.max(l1[0].y, l1[1].y)),
          l2xmin = Math.floor(Math.min(l2[0].x, l2[1].x)),
          l2xmax = Math.round(Math.max(l2[0].x, l2[1].x)),
          l2ymin = Math.floor(Math.min(l2[0].y, l2[1].y)),
          l2ymax = Math.round(Math.max(l2[0].y, l2[1].y));
      if (candidate.x >= l1xmin && candidate.x <= l1xmax && candidate.y >= l1ymin && candidate.y <= l1ymax && candidate.x >= l2xmin && candidate.x <= l2xmax && candidate.y >= l2ymin && candidate.y <= l2ymax) {
        return candidate;
      } else {
        return null;
      }
    }
  }
  function lineRectangleIntersection(line, r) {
    var out = [],
        rectangleLines = [[{
      x: r.x,
      y: r.y
    }, {
      x: r.x + r.w,
      y: r.y
    }], [{
      x: r.x + r.w,
      y: r.y
    }, {
      x: r.x + r.w,
      y: r.y + r.h
    }], [{
      x: r.x,
      y: r.y
    }, {
      x: r.x,
      y: r.y + r.h
    }], [{
      x: r.x,
      y: r.y + r.h
    }, {
      x: r.x + r.w,
      y: r.y + r.h
    }]];
    forEach(rectangleLines, function (rLine) {
      var intersection = lineIntersection(line, rLine);
      if (intersection != null) {
        out.push(intersection);
      }
    });
    return out;
  }
  function encloses(r1, r2, allowSharedEdges) {
    var x1 = r1.x,
        x2 = r1.x + r1.w,
        y1 = r1.y,
        y2 = r1.y + r1.h,
        a1 = r2.x,
        a2 = r2.x + r2.w,
        b1 = r2.y,
        b2 = r2.y + r2.h,
        c = function c(v1, v2, v3, v4) {
      return allowSharedEdges ? v1 <= v2 && v3 >= v4 : v1 < v2 && v3 > v4;
    };
    return c(x1, a1, x2, a2) && c(y1, b1, y2, b2);
  }
  function pointOnLine(fromPoint, toPoint, distance) {
    var m = gradient(fromPoint, toPoint),
        s = quadrant(fromPoint, toPoint),
        segmentMultiplier = distance > 0 ? segmentMultipliers[s] : inverseSegmentMultipliers[s],
        theta = Math.atan(m),
        y = Math.abs(distance * Math.sin(theta)) * segmentMultiplier[1],
        x = Math.abs(distance * Math.cos(theta)) * segmentMultiplier[0];
    return {
      x: fromPoint.x + x,
      y: fromPoint.y + y
    };
  }
  function perpendicularLineTo(fromPoint, toPoint, length) {
    var m = gradient(fromPoint, toPoint),
        theta2 = Math.atan(-1 / m),
        y = length / 2 * Math.sin(theta2),
        x = length / 2 * Math.cos(theta2);
    return [{
      x: toPoint.x + x,
      y: toPoint.y + y
    }, {
      x: toPoint.x - x,
      y: toPoint.y - y
    }];
  }
  function snapToGrid(pos, grid, thresholdX, thresholdY) {
    thresholdX = thresholdX == null ? grid.thresholdX == null ? grid.w / 2 : grid.thresholdX : thresholdX;
    thresholdY = thresholdY == null ? grid.thresholdY == null ? grid.h / 2 : grid.thresholdY : thresholdY;
    var _dx = Math.floor(pos.x / grid.w),
        _dxl = grid.w * _dx,
        _dxt = _dxl + grid.w,
        x = Math.abs(pos.x - _dxl) <= thresholdX ? _dxl : Math.abs(_dxt - pos.x) <= thresholdX ? _dxt : pos.x;
    var _dy = Math.floor(pos.y / grid.h),
        _dyl = grid.h * _dy,
        _dyt = _dyl + grid.h,
        y = Math.abs(pos.y - _dyl) <= thresholdY ? _dyl : Math.abs(_dyt - pos.y) <= thresholdY ? _dyt : pos.y;
    return {
      x: x,
      y: y
    };
  }

  exports.PerimeterAnchorShapes = void 0;
  (function (PerimeterAnchorShapes) {
    PerimeterAnchorShapes["Circle"] = "Circle";
    PerimeterAnchorShapes["Ellipse"] = "Ellipse";
    PerimeterAnchorShapes["Triangle"] = "Triangle";
    PerimeterAnchorShapes["Diamond"] = "Diamond";
    PerimeterAnchorShapes["Rectangle"] = "Rectangle";
    PerimeterAnchorShapes["Square"] = "Square";
  })(exports.PerimeterAnchorShapes || (exports.PerimeterAnchorShapes = {}));
  exports.AnchorLocations = void 0;
  (function (AnchorLocations) {
    AnchorLocations["Assign"] = "Assign";
    AnchorLocations["AutoDefault"] = "AutoDefault";
    AnchorLocations["Bottom"] = "Bottom";
    AnchorLocations["BottomLeft"] = "BottomLeft";
    AnchorLocations["BottomRight"] = "BottomRight";
    AnchorLocations["Center"] = "Center";
    AnchorLocations["Continuous"] = "Continuous";
    AnchorLocations["ContinuousBottom"] = "ContinuousBottom";
    AnchorLocations["ContinuousLeft"] = "ContinuousLeft";
    AnchorLocations["ContinuousRight"] = "ContinuousRight";
    AnchorLocations["ContinuousTop"] = "ContinuousTop";
    AnchorLocations["ContinuousLeftRight"] = "ContinuousLeftRight";
    AnchorLocations["ContinuousTopBottom"] = "ContinuousTopBottom";
    AnchorLocations["Left"] = "Left";
    AnchorLocations["Perimeter"] = "Perimeter";
    AnchorLocations["Right"] = "Right";
    AnchorLocations["Top"] = "Top";
    AnchorLocations["TopLeft"] = "TopLeft";
    AnchorLocations["TopRight"] = "TopRight";
  })(exports.AnchorLocations || (exports.AnchorLocations = {}));

  function _classCallCheck$4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$4(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$4(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$4(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$4(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$4(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function noSuchPoint() {
    return {
      d: Infinity,
      x: null,
      y: null,
      l: null,
      x1: null,
      y1: null,
      x2: null,
      y2: null
    };
  }
  function EMPTY_BOUNDS() {
    return {
      xmin: Infinity,
      xmax: -Infinity,
      ymin: Infinity,
      ymax: -Infinity
    };
  }
  var AbstractSegment = function () {
    function AbstractSegment(params) {
      _classCallCheck$4(this, AbstractSegment);
      this.params = params;
      _defineProperty$4(this, "x1", void 0);
      _defineProperty$4(this, "x2", void 0);
      _defineProperty$4(this, "y1", void 0);
      _defineProperty$4(this, "y2", void 0);
      _defineProperty$4(this, "extents", EMPTY_BOUNDS());
      _defineProperty$4(this, "type", void 0);
      this.x1 = params.x1;
      this.y1 = params.y1;
      this.x2 = params.x2;
      this.y2 = params.y2;
    }
    _createClass$4(AbstractSegment, [{
      key: "findClosestPointOnPath",
      value: function findClosestPointOnPath(x, y) {
        return noSuchPoint();
      }
    }, {
      key: "lineIntersection",
      value: function lineIntersection(x1, y1, x2, y2) {
        return [];
      }
    }, {
      key: "boxIntersection",
      value: function boxIntersection(x, y, w, h) {
        var a = [];
        a.push.apply(a, this.lineIntersection(x, y, x + w, y));
        a.push.apply(a, this.lineIntersection(x + w, y, x + w, y + h));
        a.push.apply(a, this.lineIntersection(x + w, y + h, x, y + h));
        a.push.apply(a, this.lineIntersection(x, y + h, x, y));
        return a;
      }
    }, {
      key: "boundingBoxIntersection",
      value: function boundingBoxIntersection(box) {
        return this.boxIntersection(box.x, box.y, box.w, box.h);
      }
    }]);
    return AbstractSegment;
  }();

  var UNDEFINED = "undefined";
  var DEFAULT = "default";
  var TRUE$1 = "true";
  var FALSE$1 = "false";
  var WILDCARD = "*";

  function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$3(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$3(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$3(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$3(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits$3(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf$3(subClass, superClass);
  }

  function _getPrototypeOf$3(o) {
    _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$3(o);
  }

  function _setPrototypeOf$3(o, p) {
    _setPrototypeOf$3 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$3(o, p);
  }

  function _isNativeReflectConstruct$3() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized$3(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn$3(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$3(self);
  }

  function _createSuper$3(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$3();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf$3(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf$3(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn$3(this, result);
    };
  }

  function _superPropBase$1(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$3(object);
      if (object === null) break;
    }

    return object;
  }

  function _get$1(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get$1 = Reflect.get;
    } else {
      _get$1 = function _get(target, property, receiver) {
        var base = _superPropBase$1(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get$1(target, property, receiver || target);
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
  }

  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
  }

  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit$1(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var endpointMap$1 = {};
  var endpointComputers = {};
  var handlers = {};
  var EndpointFactory = {
    get: function get(ep, name, params) {
      var e = endpointMap$1[name];
      if (!e) {
        throw {
          message: "jsPlumb: unknown endpoint type '" + name + "'"
        };
      } else {
        return new e(ep, params);
      }
    },
    clone: function clone(epr) {
      var handler = handlers[epr.type];
      return EndpointFactory.get(epr.endpoint, epr.type, handler.getParams(epr));
    },
    compute: function compute(endpoint, anchorPoint, orientation, endpointStyle) {
      var c = endpointComputers[endpoint.type];
      if (c != null) {
        return c(endpoint, anchorPoint, orientation, endpointStyle);
      } else {
        log("jsPlumb: cannot find endpoint calculator for endpoint of type ", endpoint.type);
      }
    },
    registerHandler: function registerHandler(eph) {
      handlers[eph.type] = eph;
      endpointMap$1[eph.type] = eph.cls;
      endpointComputers[eph.type] = eph.compute;
    }
  };

  var EndpointRepresentation = function () {
    function EndpointRepresentation(endpoint, params) {
      _classCallCheck$3(this, EndpointRepresentation);
      this.endpoint = endpoint;
      _defineProperty$3(this, "typeId", void 0);
      _defineProperty$3(this, "x", void 0);
      _defineProperty$3(this, "y", void 0);
      _defineProperty$3(this, "w", void 0);
      _defineProperty$3(this, "h", void 0);
      _defineProperty$3(this, "computedValue", void 0);
      _defineProperty$3(this, "bounds", EMPTY_BOUNDS());
      _defineProperty$3(this, "classes", []);
      _defineProperty$3(this, "instance", void 0);
      _defineProperty$3(this, "type", void 0);
      params = params || {};
      this.instance = endpoint.instance;
      if (endpoint.cssClass) {
        this.classes.push(endpoint.cssClass);
      }
      if (params.cssClass) {
        this.classes.push(params.cssClass);
      }
    }
    _createClass$3(EndpointRepresentation, [{
      key: "addClass",
      value: function addClass(c) {
        this.classes.push(c);
        this.instance.addEndpointClass(this.endpoint, c);
      }
    }, {
      key: "removeClass",
      value: function removeClass(c) {
        this.classes = this.classes.filter(function (_c) {
          return _c !== c;
        });
        this.instance.removeEndpointClass(this.endpoint, c);
      }
    }, {
      key: "compute",
      value: function compute(anchorPoint, orientation, endpointStyle) {
        this.computedValue = EndpointFactory.compute(this, anchorPoint, orientation, endpointStyle);
        this.bounds.xmin = this.x;
        this.bounds.ymin = this.y;
        this.bounds.xmax = this.x + this.w;
        this.bounds.ymax = this.y + this.h;
      }
    }, {
      key: "setVisible",
      value: function setVisible(v) {
        this.instance.setEndpointVisible(this.endpoint, v);
      }
    }]);
    return EndpointRepresentation;
  }();

  var DotEndpoint = function (_EndpointRepresentati) {
    _inherits$3(DotEndpoint, _EndpointRepresentati);
    var _super = _createSuper$3(DotEndpoint);
    function DotEndpoint(endpoint, params) {
      var _this;
      _classCallCheck$3(this, DotEndpoint);
      _this = _super.call(this, endpoint, params);
      _defineProperty$3(_assertThisInitialized$3(_this), "radius", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "defaultOffset", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "defaultInnerRadius", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "type", DotEndpoint.type);
      params = params || {};
      _this.radius = params.radius || 5;
      _this.defaultOffset = 0.5 * _this.radius;
      _this.defaultInnerRadius = _this.radius / 3;
      return _this;
    }
    return DotEndpoint;
  }(EndpointRepresentation);
  _defineProperty$3(DotEndpoint, "type", "Dot");
  var DotEndpointHandler = {
    type: DotEndpoint.type,
    cls: DotEndpoint,
    compute: function compute(ep, anchorPoint, orientation, endpointStyle) {
      var x = anchorPoint.curX - ep.radius,
          y = anchorPoint.curY - ep.radius,
          w = ep.radius * 2,
          h = ep.radius * 2;
      if (endpointStyle && endpointStyle.stroke) {
        var lw = endpointStyle.strokeWidth || 1;
        x -= lw;
        y -= lw;
        w += lw * 2;
        h += lw * 2;
      }
      ep.x = x;
      ep.y = y;
      ep.w = w;
      ep.h = h;
      return [x, y, w, h, ep.radius];
    },
    getParams: function getParams(ep) {
      return {
        radius: ep.radius
      };
    }
  };

  var BlankEndpoint = function (_EndpointRepresentati) {
    _inherits$3(BlankEndpoint, _EndpointRepresentati);
    var _super = _createSuper$3(BlankEndpoint);
    function BlankEndpoint(endpoint, params) {
      var _this;
      _classCallCheck$3(this, BlankEndpoint);
      _this = _super.call(this, endpoint, params);
      _defineProperty$3(_assertThisInitialized$3(_this), "type", BlankEndpoint.type);
      return _this;
    }
    return BlankEndpoint;
  }(EndpointRepresentation);
  _defineProperty$3(BlankEndpoint, "type", "Blank");
  var BlankEndpointHandler = {
    type: BlankEndpoint.type,
    cls: BlankEndpoint,
    compute: function compute(ep, anchorPoint, orientation, endpointStyle) {
      ep.x = anchorPoint.curX;
      ep.y = anchorPoint.curY;
      ep.w = 10;
      ep.h = 0;
      return [anchorPoint.curX, anchorPoint.curY, 10, 0];
    },
    getParams: function getParams(ep) {
      return {};
    }
  };

  var RectangleEndpoint = function (_EndpointRepresentati) {
    _inherits$3(RectangleEndpoint, _EndpointRepresentati);
    var _super = _createSuper$3(RectangleEndpoint);
    function RectangleEndpoint(endpoint, params) {
      var _this;
      _classCallCheck$3(this, RectangleEndpoint);
      _this = _super.call(this, endpoint, params);
      _defineProperty$3(_assertThisInitialized$3(_this), "width", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "height", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "type", RectangleEndpoint.type);
      params = params || {};
      _this.width = params.width || 10;
      _this.height = params.height || 10;
      return _this;
    }
    _createClass$3(RectangleEndpoint, null, [{
      key: "_getParams",
      value: function _getParams(ep) {
        return {
          width: ep.width,
          height: ep.height
        };
      }
    }]);
    return RectangleEndpoint;
  }(EndpointRepresentation);
  _defineProperty$3(RectangleEndpoint, "type", "Rectangle");
  var RectangleEndpointHandler = {
    type: RectangleEndpoint.type,
    cls: RectangleEndpoint,
    compute: function compute(ep, anchorPoint, orientation, endpointStyle) {
      var width = endpointStyle.width || ep.width,
          height = endpointStyle.height || ep.height,
          x = anchorPoint.curX - width / 2,
          y = anchorPoint.curY - height / 2;
      ep.x = x;
      ep.y = y;
      ep.w = width;
      ep.h = height;
      return [x, y, width, height];
    },
    getParams: function getParams(ep) {
      return {
        width: ep.width,
        height: ep.height
      };
    }
  };

  var AbstractConnector = function () {
    function AbstractConnector(connection, params) {
      _classCallCheck$3(this, AbstractConnector);
      this.connection = connection;
      _defineProperty$3(this, "type", void 0);
      _defineProperty$3(this, "edited", false);
      _defineProperty$3(this, "stub", void 0);
      _defineProperty$3(this, "sourceStub", void 0);
      _defineProperty$3(this, "targetStub", void 0);
      _defineProperty$3(this, "maxStub", void 0);
      _defineProperty$3(this, "typeId", void 0);
      _defineProperty$3(this, "gap", void 0);
      _defineProperty$3(this, "sourceGap", void 0);
      _defineProperty$3(this, "targetGap", void 0);
      _defineProperty$3(this, "segments", []);
      _defineProperty$3(this, "totalLength", 0);
      _defineProperty$3(this, "segmentProportions", []);
      _defineProperty$3(this, "segmentProportionalLengths", []);
      _defineProperty$3(this, "paintInfo", null);
      _defineProperty$3(this, "strokeWidth", void 0);
      _defineProperty$3(this, "x", void 0);
      _defineProperty$3(this, "y", void 0);
      _defineProperty$3(this, "w", void 0);
      _defineProperty$3(this, "h", void 0);
      _defineProperty$3(this, "segment", void 0);
      _defineProperty$3(this, "bounds", EMPTY_BOUNDS());
      _defineProperty$3(this, "cssClass", void 0);
      _defineProperty$3(this, "hoverClass", void 0);
      _defineProperty$3(this, "geometry", void 0);
      this.stub = params.stub || this.getDefaultStubs();
      this.sourceStub = Array.isArray(this.stub) ? this.stub[0] : this.stub;
      this.targetStub = Array.isArray(this.stub) ? this.stub[1] : this.stub;
      this.gap = params.gap || 0;
      this.sourceGap = Array.isArray(this.gap) ? this.gap[0] : this.gap;
      this.targetGap = Array.isArray(this.gap) ? this.gap[1] : this.gap;
      this.maxStub = Math.max(this.sourceStub, this.targetStub);
      this.cssClass = params.cssClass || "";
      this.hoverClass = params.hoverClass || "";
    }
    _createClass$3(AbstractConnector, [{
      key: "getTypeDescriptor",
      value: function getTypeDescriptor() {
        return "connector";
      }
    }, {
      key: "getIdPrefix",
      value: function getIdPrefix() {
        return "_jsplumb_connector";
      }
    }, {
      key: "setGeometry",
      value: function setGeometry(g, internal) {
        this.geometry = g;
        this.edited = g != null && !internal;
      }
    }, {
      key: "exportGeometry",
      value: function exportGeometry() {
        return this.geometry;
      }
    }, {
      key: "importGeometry",
      value: function importGeometry(g) {
        this.geometry = g;
        return true;
      }
    }, {
      key: "resetGeometry",
      value: function resetGeometry() {
        this.geometry = null;
        this.edited = false;
      }
    }, {
      key: "transformAnchorPlacement",
      value:
      function transformAnchorPlacement(a, dx, dy) {
        return {
          x: a.x,
          y: a.y,
          ox: a.ox,
          oy: a.oy,
          curX: a.curX + dx,
          curY: a.curY + dy
        };
      }
    }, {
      key: "resetBounds",
      value: function resetBounds() {
        this.bounds = EMPTY_BOUNDS();
      }
    }, {
      key: "findSegmentForPoint",
      value: function findSegmentForPoint(x, y) {
        var out = {
          d: Infinity,
          s: null,
          x: null,
          y: null,
          l: null,
          x1: null,
          y1: null,
          x2: null,
          y2: null,
          index: null,
          connectorLocation: null
        };
        for (var i = 0; i < this.segments.length; i++) {
          var _s = this.segments[i].findClosestPointOnPath(x, y);
          if (_s.d < out.d) {
            out.d = _s.d;
            out.l = _s.l;
            out.x = _s.x;
            out.y = _s.y;
            out.s = this.segments[i];
            out.x1 = _s.x1;
            out.x2 = _s.x2;
            out.y1 = _s.y1;
            out.y2 = _s.y2;
            out.index = i;
            out.connectorLocation = this.segmentProportions[i][0] + _s.l * (this.segmentProportions[i][1] - this.segmentProportions[i][0]);
          }
        }
        return out;
      }
    }, {
      key: "lineIntersection",
      value: function lineIntersection(x1, y1, x2, y2) {
        var out = [];
        for (var i = 0; i < this.segments.length; i++) {
          out.push.apply(out, this.segments[i].lineIntersection(x1, y1, x2, y2));
        }
        return out;
      }
    }, {
      key: "boxIntersection",
      value: function boxIntersection(x, y, w, h) {
        var out = [];
        for (var i = 0; i < this.segments.length; i++) {
          out.push.apply(out, this.segments[i].boxIntersection(x, y, w, h));
        }
        return out;
      }
    }, {
      key: "boundingBoxIntersection",
      value: function boundingBoxIntersection(box) {
        var out = [];
        for (var i = 0; i < this.segments.length; i++) {
          out.push.apply(out, this.segments[i].boundingBoxIntersection(box));
        }
        return out;
      }
    }, {
      key: "_updateSegmentProportions",
      value: function _updateSegmentProportions() {
        var curLoc = 0;
        for (var i = 0; i < this.segments.length; i++) {
          var sl = this.segments[i].getLength();
          this.segmentProportionalLengths[i] = sl / this.totalLength;
          this.segmentProportions[i] = [curLoc, curLoc += sl / this.totalLength];
        }
      }
    }, {
      key: "_findSegmentForLocation",
      value: function _findSegmentForLocation(location, absolute) {
        var idx, i, inSegmentProportion;
        if (absolute) {
          location = location > 0 ? location / this.totalLength : (this.totalLength + location) / this.totalLength;
        }
        if (location === 1) {
          idx = this.segments.length - 1;
          inSegmentProportion = 1;
        } else if (location === 0) {
          inSegmentProportion = 0;
          idx = 0;
        } else {
          if (location >= 0.5) {
            idx = 0;
            inSegmentProportion = 0;
            for (i = this.segmentProportions.length - 1; i > -1; i--) {
              if (this.segmentProportions[i][1] >= location && this.segmentProportions[i][0] <= location) {
                idx = i;
                inSegmentProportion = (location - this.segmentProportions[i][0]) / this.segmentProportionalLengths[i];
                break;
              }
            }
          } else {
            idx = this.segmentProportions.length - 1;
            inSegmentProportion = 1;
            for (i = 0; i < this.segmentProportions.length; i++) {
              if (this.segmentProportions[i][1] >= location) {
                idx = i;
                inSegmentProportion = (location - this.segmentProportions[i][0]) / this.segmentProportionalLengths[i];
                break;
              }
            }
          }
        }
        return {
          segment: this.segments[idx],
          proportion: inSegmentProportion,
          index: idx
        };
      }
    }, {
      key: "_addSegment",
      value: function _addSegment(clazz, params) {
        if (params.x1 === params.x2 && params.y1 === params.y2) {
          return;
        }
        var s = new clazz(params);
        this.segments.push(s);
        this.totalLength += s.getLength();
        this.updateBounds(s);
      }
    }, {
      key: "_clearSegments",
      value: function _clearSegments() {
        this.totalLength = 0;
        this.segments.length = 0;
        this.segmentProportions.length = 0;
        this.segmentProportionalLengths.length = 0;
      }
    }, {
      key: "getLength",
      value: function getLength() {
        return this.totalLength;
      }
    }, {
      key: "_prepareCompute",
      value: function _prepareCompute(params) {
        this.strokeWidth = params.strokeWidth;
        var x1 = params.sourcePos.curX,
            x2 = params.targetPos.curX,
            y1 = params.sourcePos.curY,
            y2 = params.targetPos.curY,
            segment = quadrant({
          x: x1,
          y: y1
        }, {
          x: x2,
          y: y2
        }),
            swapX = x2 < x1,
            swapY = y2 < y1,
            so = [params.sourcePos.ox, params.sourcePos.oy],
            to = [params.targetPos.ox, params.targetPos.oy],
            x = swapX ? x2 : x1,
            y = swapY ? y2 : y1,
            w = Math.abs(x2 - x1),
            h = Math.abs(y2 - y1);
        var noSourceOrientation = so[0] === 0 && so[1] === 0;
        var noTargetOrientation = to[0] === 0 && to[1] === 0;
        if (noSourceOrientation || noTargetOrientation) {
          var index = w > h ? 0 : 1,
              oIndex = [1, 0][index],
              v1 = index === 0 ? x1 : y1,
              v2 = index === 0 ? x2 : y2;
          if (noSourceOrientation) {
            so[index] = v1 > v2 ? -1 : 1;
            so[oIndex] = 0;
          }
          if (noTargetOrientation) {
            to[index] = v1 > v2 ? 1 : -1;
            to[oIndex] = 0;
          }
        }
        var sx = swapX ? w + this.sourceGap * so[0] : this.sourceGap * so[0],
            sy = swapY ? h + this.sourceGap * so[1] : this.sourceGap * so[1],
            tx = swapX ? this.targetGap * to[0] : w + this.targetGap * to[0],
            ty = swapY ? this.targetGap * to[1] : h + this.targetGap * to[1],
            oProduct = so[0] * to[0] + so[1] * to[1];
        var result = {
          sx: sx,
          sy: sy,
          tx: tx,
          ty: ty,
          xSpan: Math.abs(tx - sx),
          ySpan: Math.abs(ty - sy),
          mx: (sx + tx) / 2,
          my: (sy + ty) / 2,
          so: so,
          to: to,
          x: x,
          y: y,
          w: w,
          h: h,
          segment: segment,
          startStubX: sx + so[0] * this.sourceStub,
          startStubY: sy + so[1] * this.sourceStub,
          endStubX: tx + to[0] * this.targetStub,
          endStubY: ty + to[1] * this.targetStub,
          isXGreaterThanStubTimes2: Math.abs(sx - tx) > this.sourceStub + this.targetStub,
          isYGreaterThanStubTimes2: Math.abs(sy - ty) > this.sourceStub + this.targetStub,
          opposite: oProduct === -1,
          perpendicular: oProduct === 0,
          orthogonal: oProduct === 1,
          sourceAxis: so[0] === 0 ? "y" : "x",
          points: [x, y, w, h, sx, sy, tx, ty],
          stubs: [this.sourceStub, this.targetStub]
        };
        result.anchorOrientation = result.opposite ? "opposite" : result.orthogonal ? "orthogonal" : "perpendicular";
        return result;
      }
    }, {
      key: "updateBounds",
      value: function updateBounds(segment) {
        var segBounds = segment.extents;
        this.bounds.xmin = Math.min(this.bounds.xmin, segBounds.xmin);
        this.bounds.xmax = Math.max(this.bounds.xmax, segBounds.xmax);
        this.bounds.ymin = Math.min(this.bounds.ymin, segBounds.ymin);
        this.bounds.ymax = Math.max(this.bounds.ymax, segBounds.ymax);
      }
    }, {
      key: "dumpSegmentsToConsole",
      value: function dumpSegmentsToConsole() {
        log("SEGMENTS:");
        for (var i = 0; i < this.segments.length; i++) {
          log(this.segments[i].type, "" + this.segments[i].getLength(), "" + this.segmentProportions[i]);
        }
      }
    }, {
      key: "pointOnPath",
      value: function pointOnPath(location, absolute) {
        var seg = this._findSegmentForLocation(location, absolute);
        return seg.segment && seg.segment.pointOnPath(seg.proportion, false) || {
          x: 0,
          y: 0
        };
      }
    }, {
      key: "gradientAtPoint",
      value: function gradientAtPoint(location, absolute) {
        var seg = this._findSegmentForLocation(location, absolute);
        return seg.segment && seg.segment.gradientAtPoint(seg.proportion, false) || 0;
      }
    }, {
      key: "pointAlongPathFrom",
      value: function pointAlongPathFrom(location, distance, absolute) {
        var seg = this._findSegmentForLocation(location, absolute);
        return seg.segment && seg.segment.pointAlongPathFrom(seg.proportion, distance, false) || {
          x: 0,
          y: 0
        };
      }
    }, {
      key: "compute",
      value: function compute(params) {
        this.paintInfo = this._prepareCompute(params);
        this._clearSegments();
        this._compute(this.paintInfo, params);
        this.x = this.paintInfo.points[0];
        this.y = this.paintInfo.points[1];
        this.w = this.paintInfo.points[2];
        this.h = this.paintInfo.points[3];
        this.segment = this.paintInfo.segment;
        this._updateSegmentProportions();
      }
    }, {
      key: "setAnchorOrientation",
      value: function setAnchorOrientation(idx, orientation) {}
    }]);
    return AbstractConnector;
  }();

  var StraightSegment = function (_AbstractSegment) {
    _inherits$3(StraightSegment, _AbstractSegment);
    var _super = _createSuper$3(StraightSegment);
    function StraightSegment(params) {
      var _this;
      _classCallCheck$3(this, StraightSegment);
      _this = _super.call(this, params);
      _defineProperty$3(_assertThisInitialized$3(_this), "length", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "m", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "m2", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "type", StraightSegment.segmentType);
      _this._setCoordinates({
        x1: params.x1,
        y1: params.y1,
        x2: params.x2,
        y2: params.y2
      });
      return _this;
    }
    _createClass$3(StraightSegment, [{
      key: "getPath",
      value: function getPath(isFirstSegment) {
        return (isFirstSegment ? "M " + this.x1 + " " + this.y1 + " " : "") + "L " + this.x2 + " " + this.y2;
      }
    }, {
      key: "_recalc",
      value: function _recalc() {
        this.length = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
        this.m = gradient({
          x: this.x1,
          y: this.y1
        }, {
          x: this.x2,
          y: this.y2
        });
        this.m2 = -1 / this.m;
        this.extents = {
          xmin: Math.min(this.x1, this.x2),
          ymin: Math.min(this.y1, this.y2),
          xmax: Math.max(this.x1, this.x2),
          ymax: Math.max(this.y1, this.y2)
        };
      }
    }, {
      key: "getLength",
      value: function getLength() {
        return this.length;
      }
    }, {
      key: "getGradient",
      value: function getGradient() {
        return this.m;
      }
    }, {
      key: "_setCoordinates",
      value: function _setCoordinates(coords) {
        this.x1 = coords.x1;
        this.y1 = coords.y1;
        this.x2 = coords.x2;
        this.y2 = coords.y2;
        this._recalc();
      }
    }, {
      key: "pointOnPath",
      value: function pointOnPath(location, absolute) {
        if (location === 0 && !absolute) {
          return {
            x: this.x1,
            y: this.y1
          };
        } else if (location === 1 && !absolute) {
          return {
            x: this.x2,
            y: this.y2
          };
        } else {
          var l = absolute ? location > 0 ? location : this.length + location : location * this.length;
          return pointOnLine({
            x: this.x1,
            y: this.y1
          }, {
            x: this.x2,
            y: this.y2
          }, l);
        }
      }
    }, {
      key: "gradientAtPoint",
      value: function gradientAtPoint(location, absolute) {
        return this.m;
      }
    }, {
      key: "pointAlongPathFrom",
      value: function pointAlongPathFrom(location, distance, absolute) {
        var p = this.pointOnPath(location, absolute),
            farAwayPoint = distance <= 0 ? {
          x: this.x1,
          y: this.y1
        } : {
          x: this.x2,
          y: this.y2
        };
        if (distance <= 0 && Math.abs(distance) > 1) {
          distance *= -1;
        }
        return pointOnLine(p, farAwayPoint, distance);
      }
    }, {
      key: "within",
      value: function within(a, b, c) {
        return c >= Math.min(a, b) && c <= Math.max(a, b);
      }
    }, {
      key: "closest",
      value: function closest(a, b, c) {
        return Math.abs(c - a) < Math.abs(c - b) ? a : b;
      }
    }, {
      key: "findClosestPointOnPath",
      value: function findClosestPointOnPath(x, y) {
        var out = {
          d: Infinity,
          x: null,
          y: null,
          l: null,
          x1: this.x1,
          x2: this.x2,
          y1: this.y1,
          y2: this.y2
        };
        if (this.m === 0) {
          out.y = this.y1;
          out.x = this.within(this.x1, this.x2, x) ? x : this.closest(this.x1, this.x2, x);
        } else if (this.m === Infinity || this.m === -Infinity) {
          out.x = this.x1;
          out.y = this.within(this.y1, this.y2, y) ? y : this.closest(this.y1, this.y2, y);
        } else {
          var b = this.y1 - this.m * this.x1,
              b2 = y - this.m2 * x,
          _x1 = (b2 - b) / (this.m - this.m2),
              _y1 = this.m * _x1 + b;
          out.x = this.within(this.x1, this.x2, _x1) ? _x1 : this.closest(this.x1, this.x2, _x1);
          out.y = this.within(this.y1, this.y2, _y1) ? _y1 : this.closest(this.y1, this.y2, _y1);
        }
        var fractionInSegment = lineLength({
          x: out.x,
          y: out.y
        }, {
          x: this.x1,
          y: this.y1
        });
        out.d = lineLength({
          x: x,
          y: y
        }, out);
        out.l = fractionInSegment / length;
        return out;
      }
    }, {
      key: "_pointLiesBetween",
      value: function _pointLiesBetween(q, p1, p2) {
        return p2 > p1 ? p1 <= q && q <= p2 : p1 >= q && q >= p2;
      }
    }, {
      key: "lineIntersection",
      value: function lineIntersection(_x1, _y1, _x2, _y2) {
        var m2 = Math.abs(gradient({
          x: _x1,
          y: _y1
        }, {
          x: _x2,
          y: _y2
        })),
            m1 = Math.abs(this.m),
            b = m1 === Infinity ? this.x1 : this.y1 - m1 * this.x1,
            out = [],
            b2 = m2 === Infinity ? _x1 : _y1 - m2 * _x1;
        if (m2 !== m1) {
          if (m2 === Infinity && m1 === 0) {
            if (this._pointLiesBetween(_x1, this.x1, this.x2) && this._pointLiesBetween(this.y1, _y1, _y2)) {
              out.push({
                x: _x1,
                y: this.y1
              });
            }
          } else if (m2 === 0 && m1 === Infinity) {
            if (this._pointLiesBetween(_y1, this.y1, this.y2) && this._pointLiesBetween(this.x1, _x1, _x2)) {
              out.push({
                x: this.x1,
                y: _y1
              });
            }
          } else {
            var X, Y;
            if (m2 === Infinity) {
              X = _x1;
              if (this._pointLiesBetween(X, this.x1, this.x2)) {
                Y = m1 * _x1 + b;
                if (this._pointLiesBetween(Y, _y1, _y2)) {
                  out.push({
                    x: X,
                    y: Y
                  });
                }
              }
            } else if (m2 === 0) {
              Y = _y1;
              if (this._pointLiesBetween(Y, this.y1, this.y2)) {
                X = (_y1 - b) / m1;
                if (this._pointLiesBetween(X, _x1, _x2)) {
                  out.push({
                    x: X,
                    y: Y
                  });
                }
              }
            } else {
              X = (b2 - b) / (m1 - m2);
              Y = m1 * X + b;
              if (this._pointLiesBetween(X, this.x1, this.x2) && this._pointLiesBetween(Y, this.y1, this.y2)) {
                out.push({
                  x: X,
                  y: Y
                });
              }
            }
          }
        }
        return out;
      }
    }, {
      key: "boxIntersection",
      value: function boxIntersection(x, y, w, h) {
        var a = [];
        a.push.apply(a, this.lineIntersection(x, y, x + w, y));
        a.push.apply(a, this.lineIntersection(x + w, y, x + w, y + h));
        a.push.apply(a, this.lineIntersection(x + w, y + h, x, y + h));
        a.push.apply(a, this.lineIntersection(x, y + h, x, y));
        return a;
      }
    }]);
    return StraightSegment;
  }(AbstractSegment);
  _defineProperty$3(StraightSegment, "segmentType", "Straight");

  var StraightConnector = function (_AbstractConnector) {
    _inherits$3(StraightConnector, _AbstractConnector);
    var _super = _createSuper$3(StraightConnector);
    function StraightConnector() {
      var _this;
      _classCallCheck$3(this, StraightConnector);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty$3(_assertThisInitialized$3(_this), "type", StraightConnector.type);
      return _this;
    }
    _createClass$3(StraightConnector, [{
      key: "getDefaultStubs",
      value: function getDefaultStubs() {
        return [0, 0];
      }
    }, {
      key: "_compute",
      value: function _compute(paintInfo, p) {
        this._addSegment(StraightSegment, {
          x1: paintInfo.sx,
          y1: paintInfo.sy,
          x2: paintInfo.startStubX,
          y2: paintInfo.startStubY
        });
        this._addSegment(StraightSegment, {
          x1: paintInfo.startStubX,
          y1: paintInfo.startStubY,
          x2: paintInfo.endStubX,
          y2: paintInfo.endStubY
        });
        this._addSegment(StraightSegment, {
          x1: paintInfo.endStubX,
          y1: paintInfo.endStubY,
          x2: paintInfo.tx,
          y2: paintInfo.ty
        });
        this.geometry = {
          source: p.sourcePos,
          target: p.targetPos
        };
      }
    }, {
      key: "transformGeometry",
      value: function transformGeometry(g, dx, dy) {
        return {
          source: this.transformAnchorPlacement(g.source, dx, dy),
          target: this.transformAnchorPlacement(g.target, dx, dy)
        };
      }
    }]);
    return StraightConnector;
  }(AbstractConnector);
  _defineProperty$3(StraightConnector, "type", "Straight");

  var connectorMap = {};
  var Connectors = {
    get: function get(connection, name, params) {
      var c = connectorMap[name];
      if (!c) {
        throw {
          message: "jsPlumb: unknown connector type '" + name + "'"
        };
      } else {
        return new c(connection, params);
      }
    },
    register: function register(name, conn) {
      connectorMap[name] = conn;
    }
  };

  function cls() {
    for (var _len = arguments.length, className = new Array(_len), _key = 0; _key < _len; _key++) {
      className[_key] = arguments[_key];
    }
    return className.map(function (cn) {
      return "." + cn;
    }).join(",");
  }
  function classList() {
    for (var _len2 = arguments.length, className = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      className[_key2] = arguments[_key2];
    }
    return className.join(" ");
  }
  function att() {
    for (var _len3 = arguments.length, attName = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      attName[_key3] = arguments[_key3];
    }
    return attName.map(function (an) {
      return "[" + an + "]";
    }).join(",");
  }
  var SOURCE = "source";
  var TARGET = "target";
  var BLOCK = "block";
  var NONE = "none";
  var SOURCE_INDEX = 0;
  var TARGET_INDEX = 1;
  var ABSOLUTE = "absolute";
  var FIXED = "fixed";
  var STATIC = "static";
  var ATTRIBUTE_GROUP = "data-jtk-group";
  var ATTRIBUTE_MANAGED = "data-jtk-managed";
  var ATTRIBUTE_NOT_DRAGGABLE = "data-jtk-not-draggable";
  var ATTRIBUTE_TABINDEX = "tabindex";
  var ATTRIBUTE_SCOPE = "data-jtk-scope";
  var ATTRIBUTE_SCOPE_PREFIX = ATTRIBUTE_SCOPE + "-";
  var CHECK_CONDITION = "checkCondition";
  var CHECK_DROP_ALLOWED = "checkDropAllowed";
  var CLASS_CONNECTOR = "jtk-connector";
  var CLASS_CONNECTOR_OUTLINE = "jtk-connector-outline";
  var CLASS_CONNECTED = "jtk-connected";
  var CLASS_ENDPOINT = "jtk-endpoint";
  var CLASS_ENDPOINT_CONNECTED = "jtk-endpoint-connected";
  var CLASS_ENDPOINT_FULL = "jtk-endpoint-full";
  var CLASS_ENDPOINT_FLOATING = "jtk-floating-endpoint";
  var CLASS_ENDPOINT_DROP_ALLOWED = "jtk-endpoint-drop-allowed";
  var CLASS_ENDPOINT_DROP_FORBIDDEN = "jtk-endpoint-drop-forbidden";
  var CLASS_ENDPOINT_ANCHOR_PREFIX = "jtk-endpoint-anchor";
  var CLASS_GROUP_COLLAPSED = "jtk-group-collapsed";
  var CLASS_GROUP_EXPANDED = "jtk-group-expanded";
  var CLASS_OVERLAY = "jtk-overlay";
  var EVENT_ANCHOR_CHANGED = "anchor:changed";
  var EVENT_CONNECTION = "connection";
  var EVENT_INTERNAL_CONNECTION = "internal.connection";
  var EVENT_CONNECTION_DETACHED = "connection:detach";
  var EVENT_CONNECTION_MOVED = "connection:move";
  var EVENT_CONTAINER_CHANGE = "container:change";
  var EVENT_ENDPOINT_REPLACED = "endpoint:replaced";
  var EVENT_INTERNAL_ENDPOINT_UNREGISTERED = "internal.endpoint:unregistered";
  var EVENT_INTERNAL_CONNECTION_DETACHED = "internal.connection:detached";
  var EVENT_MANAGE_ELEMENT = "element:manage";
  var EVENT_GROUP_ADDED = "group:added";
  var EVENT_GROUP_COLLAPSE = "group:collapse";
  var EVENT_GROUP_EXPAND = "group:expand";
  var EVENT_GROUP_MEMBER_ADDED = "group:member:added";
  var EVENT_GROUP_MEMBER_REMOVED = "group:member:removed";
  var EVENT_GROUP_REMOVED = "group:removed";
  var EVENT_MAX_CONNECTIONS = "maxConnections";
  var EVENT_NESTED_GROUP_ADDED = "group:nested:added";
  var EVENT_NESTED_GROUP_REMOVED = "group:nested:removed";
  var EVENT_UNMANAGE_ELEMENT = "element:unmanage";
  var EVENT_ZOOM = "zoom";
  var IS_DETACH_ALLOWED = "isDetachAllowed";
  var INTERCEPT_BEFORE_DRAG = "beforeDrag";
  var INTERCEPT_BEFORE_DROP = "beforeDrop";
  var INTERCEPT_BEFORE_DETACH = "beforeDetach";
  var INTERCEPT_BEFORE_START_DETACH = "beforeStartDetach";
  var SELECTOR_MANAGED_ELEMENT = att(ATTRIBUTE_MANAGED);
  var ERROR_SOURCE_ENDPOINT_FULL = "Cannot establish connection: source endpoint is full";
  var ERROR_TARGET_ENDPOINT_FULL = "Cannot establish connection: target endpoint is full";
  var ERROR_SOURCE_DOES_NOT_EXIST = "Cannot establish connection: source does not exist";
  var ERROR_TARGET_DOES_NOT_EXIST = "Cannot establish connection: target does not exist";
  var KEY_CONNECTION_OVERLAYS = "connectionOverlays";

  var DEFAULT_KEY_ALLOW_NESTED_GROUPS = "allowNestedGroups";
  var DEFAULT_KEY_ANCHOR = "anchor";
  var DEFAULT_KEY_ANCHORS = "anchors";
  var DEFAULT_KEY_CONNECTION_OVERLAYS = "connectionOverlays";
  var DEFAULT_KEY_CONNECTIONS_DETACHABLE = "connectionsDetachable";
  var DEFAULT_KEY_CONNECTOR = "connector";
  var DEFAULT_KEY_CONTAINER = "container";
  var DEFAULT_KEY_ENDPOINT = "endpoint";
  var DEFAULT_KEY_ENDPOINT_OVERLAYS = "endpointOverlays";
  var DEFAULT_KEY_ENDPOINTS = "endpoints";
  var DEFAULT_KEY_ENDPOINT_STYLE = "endpointStyle";
  var DEFAULT_KEY_ENDPOINT_STYLES = "endpointStyles";
  var DEFAULT_KEY_ENDPOINT_HOVER_STYLE = "endpointHoverStyle";
  var DEFAULT_KEY_ENDPOINT_HOVER_STYLES = "endpointHoverStyles";
  var DEFAULT_KEY_HOVER_CLASS = "hoverClass";
  var DEFAULT_KEY_HOVER_PAINT_STYLE = "hoverPaintStyle";
  var DEFAULT_KEY_LIST_STYLE = "listStyle";
  var DEFAULT_KEY_MAX_CONNECTIONS = "maxConnections";
  var DEFAULT_KEY_PAINT_STYLE = "paintStyle";
  var DEFAULT_KEY_REATTACH_CONNECTIONS = "reattachConnections";
  var DEFAULT_KEY_SCOPE = "scope";

  function isFullOverlaySpec(o) {
    return o.type != null && o.options != null;
  }
  function convertToFullOverlaySpec(spec) {
    var o = null;
    if (isString(spec)) {
      o = {
        type: spec,
        options: {}
      };
    } else {
      o = spec;
    }
    o.options.id = o.options.id || uuid();
    return o;
  }
  var Overlay = function (_EventGenerator) {
    _inherits$3(Overlay, _EventGenerator);
    var _super = _createSuper$3(Overlay);
    function Overlay(instance, component, p) {
      var _this;
      _classCallCheck$3(this, Overlay);
      _this = _super.call(this);
      _this.instance = instance;
      _this.component = component;
      _defineProperty$3(_assertThisInitialized$3(_this), "id", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "type", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "cssClass", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "visible", true);
      _defineProperty$3(_assertThisInitialized$3(_this), "location", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "events", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "attributes", void 0);
      p = p || {};
      _this.id = p.id || uuid();
      _this.cssClass = p.cssClass || "";
      _this.setLocation(p.location);
      _this.events = p.events || {};
      _this.attributes = p.attributes || {};
      for (var _event in _this.events) {
        _this.bind(_event, _this.events[_event]);
      }
      return _this;
    }
    _createClass$3(Overlay, [{
      key: "setLocation",
      value: function setLocation(l) {
        var newLocation = this.location == null ? 0.5 : this.location;
        if (l != null) {
          try {
            var _l = typeof l === "string" ? parseFloat(l) : l;
            if (!isNaN(_l)) {
              newLocation = _l;
            }
          } catch (e) {
          }
        }
        this.location = newLocation;
      }
    }, {
      key: "shouldFireEvent",
      value: function shouldFireEvent(event, value, originalEvent) {
        return true;
      }
    }, {
      key: "setVisible",
      value: function setVisible(v) {
        this.visible = v;
        this.instance.setOverlayVisible(this, v);
      }
    }, {
      key: "isVisible",
      value: function isVisible() {
        return this.visible;
      }
    }]);
    return Overlay;
  }(EventGenerator);

  var overlayMap = {};
  var OverlayFactory = {
    get: function get(instance, name, component, params) {
      var c = overlayMap[name];
      if (!c) {
        throw {
          message: "jsPlumb: unknown overlay type '" + name + "'"
        };
      } else {
        return new c(instance, component, params);
      }
    },
    register: function register(name, overlay) {
      overlayMap[name] = overlay;
    }
  };

  var LabelOverlay = function (_Overlay) {
    _inherits$3(LabelOverlay, _Overlay);
    var _super = _createSuper$3(LabelOverlay);
    function LabelOverlay(instance, component, p) {
      var _this;
      _classCallCheck$3(this, LabelOverlay);
      _this = _super.call(this, instance, component, p);
      _this.instance = instance;
      _this.component = component;
      _defineProperty$3(_assertThisInitialized$3(_this), "label", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "labelText", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "type", LabelOverlay.type);
      _defineProperty$3(_assertThisInitialized$3(_this), "cachedDimensions", void 0);
      p = p || {
        label: ""
      };
      _this.setLabel(p.label);
      return _this;
    }
    _createClass$3(LabelOverlay, [{
      key: "getLabel",
      value: function getLabel() {
        if (isFunction(this.label)) {
          return this.label(this);
        } else {
          return this.labelText;
        }
      }
    }, {
      key: "setLabel",
      value: function setLabel(l) {
        this.label = l;
        this.labelText = null;
        this.instance.updateLabel(this);
      }
    }, {
      key: "getDimensions",
      value: function getDimensions() {
        return {
          w: 1,
          h: 1
        };
      }
    }, {
      key: "updateFrom",
      value: function updateFrom(d) {
        if (d.label != null) {
          this.setLabel(d.label);
        }
        if (d.location != null) {
          this.setLocation(d.location);
          this.instance.updateLabel(this);
        }
      }
    }]);
    return LabelOverlay;
  }(Overlay);
  _defineProperty$3(LabelOverlay, "type", "Label");
  function isLabelOverlay(o) {
    return o.type === LabelOverlay.type;
  }
  OverlayFactory.register(LabelOverlay.type, LabelOverlay);

  function _splitType(t) {
    return t == null ? null : t.split(" ").filter(function (t) {
      return t != null && t.length > 0;
    });
  }
  function _mapType(map, obj, typeId) {
    for (var i in obj) {
      map[i] = typeId;
    }
  }
  var CONNECTOR = "connector";
  var MERGE_STRATEGY_OVERRIDE = "override";
  var CSS_CLASS = "cssClass";
  var DEFAULT_TYPE_KEY = "__default";
  var ANCHOR = "anchor";
  var ANCHORS = "anchors";
  var _internalLabelOverlayId = "__label";
  var _internalLabelOverlayClass = "jtk-default-label";
  var TYPE_ITEM_OVERLAY = "overlay";
  var LOCATION_ATTRIBUTE = "labelLocation";
  var ACTION_ADD = "add";
  var ACTION_REMOVE = "remove";
  function _applyTypes(component, params) {
    if (component.getDefaultType) {
      var td = component.getTypeDescriptor(),
          map = {};
      var defType = component.getDefaultType();
      var o = extend({}, defType);
      _mapType(map, defType, DEFAULT_TYPE_KEY);
      component._types.forEach(function (tid) {
        if (tid !== DEFAULT_TYPE_KEY) {
          var _t = component.instance.getType(tid, td);
          if (_t != null) {
            var overrides = new Set([CONNECTOR, ANCHOR, ANCHORS]);
            if (_t.mergeStrategy === MERGE_STRATEGY_OVERRIDE) {
              for (var k in _t) {
                overrides.add(k);
              }
            }
            o = merge(o, _t, [CSS_CLASS], setToArray(overrides));
            _mapType(map, _t, tid);
          }
        }
      });
      if (params) {
        o = populate(o, params, "_");
      }
      component.applyType(o, map);
    }
  }
  function _removeTypeCssHelper(component, typeId) {
    var type = component.instance.getType(typeId, component.getTypeDescriptor());
    if (type != null && type.cssClass) {
      component.removeClass(type.cssClass);
    }
  }
  function _updateHoverStyle(component) {
    if (component.paintStyle && component.hoverPaintStyle) {
      var mergedHoverStyle = {};
      extend(mergedHoverStyle, component.paintStyle);
      extend(mergedHoverStyle, component.hoverPaintStyle);
      component.hoverPaintStyle = mergedHoverStyle;
    }
  }
  var ADD_CLASS_ACTION = "add";
  var REMOVE_CLASS_ACTION = "remove";
  function _makeLabelOverlay(component, params) {
    var _params = {
      cssClass: params.cssClass,
      id: _internalLabelOverlayId,
      component: component
    },
        mergedParams = extend(_params, params);
    return new LabelOverlay(component.instance, component, mergedParams);
  }
  function _processOverlay(component, o) {
    var _newOverlay = null;
    if (isString(o)) {
      _newOverlay = OverlayFactory.get(component.instance, o, component, {});
    } else if (o.type != null && o.options != null) {
      var oa = o;
      var p = extend({}, oa.options);
      _newOverlay = OverlayFactory.get(component.instance, oa.type, component, p);
    } else {
      _newOverlay = o;
    }
    _newOverlay.id = _newOverlay.id || uuid();
    component.cacheTypeItem(TYPE_ITEM_OVERLAY, _newOverlay, _newOverlay.id);
    component.overlays[_newOverlay.id] = _newOverlay;
    return _newOverlay;
  }
  var Component = function (_EventGenerator) {
    _inherits$3(Component, _EventGenerator);
    var _super = _createSuper$3(Component);
    function Component(instance, params) {
      var _this;
      _classCallCheck$3(this, Component);
      _this = _super.call(this);
      _this.instance = instance;
      _defineProperty$3(_assertThisInitialized$3(_this), "defaultLabelLocation", 0.5);
      _defineProperty$3(_assertThisInitialized$3(_this), "overlays", {});
      _defineProperty$3(_assertThisInitialized$3(_this), "overlayPositions", {});
      _defineProperty$3(_assertThisInitialized$3(_this), "overlayPlacements", {});
      _defineProperty$3(_assertThisInitialized$3(_this), "clone", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "deleted", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "segment", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "x", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "y", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "w", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "h", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "id", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "visible", true);
      _defineProperty$3(_assertThisInitialized$3(_this), "typeId", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "params", {});
      _defineProperty$3(_assertThisInitialized$3(_this), "paintStyle", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "hoverPaintStyle", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "paintStyleInUse", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_hover", false);
      _defineProperty$3(_assertThisInitialized$3(_this), "lastPaintedAt", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "data", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_defaultType", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "events", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "parameters", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_types", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_typeCache", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "cssClass", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "hoverClass", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "beforeDetach", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "beforeDrop", void 0);
      params = params || {};
      _this.cssClass = params.cssClass || "";
      _this.hoverClass = params.hoverClass || instance.defaults.hoverClass;
      _this.beforeDetach = params.beforeDetach;
      _this.beforeDrop = params.beforeDrop;
      _this._types = new Set();
      _this._typeCache = {};
      _this.parameters = clone(params.parameters || {});
      _this.id = params.id || _this.getIdPrefix() + new Date().getTime();
      _this._defaultType = {
        parameters: _this.parameters,
        scope: params.scope || _this.instance.defaultScope,
        overlays: {}
      };
      if (params.events) {
        for (var evtName in params.events) {
          _this.bind(evtName, params.events[evtName]);
        }
      }
      _this.clone = function () {
        var o = Object.create(_this.constructor.prototype);
        _this.constructor.apply(o, [instance, params]);
        return o;
      };
      _this.overlays = {};
      _this.overlayPositions = {};
      var o = params.overlays || [],
          oo = {};
      var defaultOverlayKey = _this.getDefaultOverlayKey();
      if (defaultOverlayKey) {
        var defaultOverlays = _this.instance.defaults[defaultOverlayKey];
        if (defaultOverlays) {
          o.push.apply(o, _toConsumableArray$1(defaultOverlays));
        }
        for (var i = 0; i < o.length; i++) {
          var fo = convertToFullOverlaySpec(o[i]);
          oo[fo.options.id] = fo;
        }
      }
      _this._defaultType.overlays = oo;
      if (params.label) {
        _this.getDefaultType().overlays[_internalLabelOverlayId] = {
          type: LabelOverlay.type,
          options: {
            label: params.label,
            location: params.labelLocation || _this.defaultLabelLocation,
            id: _internalLabelOverlayId,
            cssClass: _internalLabelOverlayClass
          }
        };
      }
      return _this;
    }
    _createClass$3(Component, [{
      key: "isDetachAllowed",
      value: function isDetachAllowed(connection) {
        var r = true;
        if (this.beforeDetach) {
          try {
            r = this.beforeDetach(connection);
          } catch (e) {
            log("jsPlumb: beforeDetach callback failed", e);
          }
        }
        return r;
      }
    }, {
      key: "isDropAllowed",
      value: function isDropAllowed(sourceId, targetId, scope, connection, dropEndpoint) {
        var r;
        var payload = {
          sourceId: sourceId,
          targetId: targetId,
          scope: scope,
          connection: connection,
          dropEndpoint: dropEndpoint
        };
        if (this.beforeDrop) {
          try {
            r = this.beforeDrop(payload);
          } catch (e) {
            log("jsPlumb: beforeDrop callback failed", e);
          }
        } else {
          r = this.instance.checkCondition(INTERCEPT_BEFORE_DROP, payload);
        }
        return r;
      }
    }, {
      key: "getDefaultType",
      value: function getDefaultType() {
        return this._defaultType;
      }
    }, {
      key: "appendToDefaultType",
      value: function appendToDefaultType(obj) {
        for (var i in obj) {
          this._defaultType[i] = obj[i];
        }
      }
    }, {
      key: "getId",
      value: function getId() {
        return this.id;
      }
    }, {
      key: "cacheTypeItem",
      value: function cacheTypeItem(key, item, typeId) {
        this._typeCache[typeId] = this._typeCache[typeId] || {};
        this._typeCache[typeId][key] = item;
      }
    }, {
      key: "getCachedTypeItem",
      value: function getCachedTypeItem(key, typeId) {
        return this._typeCache[typeId] ? this._typeCache[typeId][key] : null;
      }
    }, {
      key: "setType",
      value: function setType(typeId, params) {
        this.clearTypes();
        (_splitType(typeId) || []).forEach(this._types.add, this._types);
        _applyTypes(this, params);
      }
    }, {
      key: "getType",
      value: function getType() {
        return Array.from(this._types.keys());
      }
    }, {
      key: "reapplyTypes",
      value: function reapplyTypes(params) {
        _applyTypes(this, params);
      }
    }, {
      key: "hasType",
      value: function hasType(typeId) {
        return this._types.has(typeId);
      }
    }, {
      key: "addType",
      value: function addType(typeId, params) {
        var t = _splitType(typeId),
            _somethingAdded = false;
        if (t != null) {
          for (var i = 0, j = t.length; i < j; i++) {
            if (!this._types.has(t[i])) {
              this._types.add(t[i]);
              _somethingAdded = true;
            }
          }
          if (_somethingAdded) {
            _applyTypes(this, params);
          }
        }
      }
    }, {
      key: "removeType",
      value: function removeType(typeId, params) {
        var _this2 = this;
        var t = _splitType(typeId),
            _cont = false,
            _one = function _one(tt) {
          if (_this2._types.has(tt)) {
            _removeTypeCssHelper(_this2, tt);
            _this2._types["delete"](tt);
            return true;
          }
          return false;
        };
        if (t != null) {
          for (var i = 0, j = t.length; i < j; i++) {
            _cont = _one(t[i]) || _cont;
          }
          if (_cont) {
            _applyTypes(this, params);
          }
        }
      }
    }, {
      key: "clearTypes",
      value: function clearTypes(params) {
        var _this3 = this;
        this._types.forEach(function (t) {
          _removeTypeCssHelper(_this3, t);
        });
        this._types.clear();
        _applyTypes(this, params);
      }
    }, {
      key: "toggleType",
      value: function toggleType(typeId, params) {
        var t = _splitType(typeId);
        if (t != null) {
          for (var i = 0, j = t.length; i < j; i++) {
            if (this._types.has(t[i])) {
              _removeTypeCssHelper(this, t[i]);
              this._types["delete"](t[i]);
            } else {
              this._types.add(t[i]);
            }
          }
          _applyTypes(this, params);
        }
      }
    }, {
      key: "applyType",
      value: function applyType(t, params) {
        this.setPaintStyle(t.paintStyle);
        this.setHoverPaintStyle(t.hoverPaintStyle);
        this.mergeParameters(t.parameters);
        this.paintStyleInUse = this.getPaintStyle();
        if (t.overlays) {
          var keep = {},
              i;
          for (i in t.overlays) {
            var existing = this.overlays[t.overlays[i].options.id];
            if (existing) {
              existing.updateFrom(t.overlays[i].options);
              keep[t.overlays[i].options.id] = true;
              this.instance.reattachOverlay(existing, this);
            } else {
              var _c = this.getCachedTypeItem(TYPE_ITEM_OVERLAY, t.overlays[i].options.id);
              if (_c != null) {
                this.instance.reattachOverlay(_c, this);
                _c.setVisible(true);
                _c.updateFrom(t.overlays[i].options);
                this.overlays[_c.id] = _c;
              } else {
                _c = this.addOverlay(t.overlays[i]);
              }
              keep[_c.id] = true;
            }
          }
          for (i in this.overlays) {
            if (keep[this.overlays[i].id] == null) {
              this.removeOverlay(this.overlays[i].id, true);
            }
          }
        }
      }
    }, {
      key: "setPaintStyle",
      value: function setPaintStyle(style) {
        this.paintStyle = style;
        this.paintStyleInUse = this.paintStyle;
        _updateHoverStyle(this);
      }
    }, {
      key: "getPaintStyle",
      value: function getPaintStyle() {
        return this.paintStyle;
      }
    }, {
      key: "setHoverPaintStyle",
      value: function setHoverPaintStyle(style) {
        this.hoverPaintStyle = style;
        _updateHoverStyle(this);
      }
    }, {
      key: "getHoverPaintStyle",
      value: function getHoverPaintStyle() {
        return this.hoverPaintStyle;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        for (var i in this.overlays) {
          this.instance.destroyOverlay(this.overlays[i]);
        }
        this.overlays = {};
        this.overlayPositions = {};
        this.unbind();
        this.clone = null;
      }
    }, {
      key: "isHover",
      value: function isHover() {
        return this._hover;
      }
    }, {
      key: "mergeParameters",
      value: function mergeParameters(p) {
        if (p != null) {
          extend(this.parameters, p);
        }
      }
    }, {
      key: "setVisible",
      value: function setVisible(v) {
        this.visible = v;
        if (v) {
          this.showOverlays();
        } else {
          this.hideOverlays();
        }
      }
    }, {
      key: "isVisible",
      value: function isVisible() {
        return this.visible;
      }
    }, {
      key: "setAbsoluteOverlayPosition",
      value: function setAbsoluteOverlayPosition(overlay, xy) {
        this.overlayPositions[overlay.id] = xy;
      }
    }, {
      key: "getAbsoluteOverlayPosition",
      value: function getAbsoluteOverlayPosition(overlay) {
        return this.overlayPositions ? this.overlayPositions[overlay.id] : null;
      }
    }, {
      key: "_clazzManip",
      value: function _clazzManip(action, clazz) {
        for (var i in this.overlays) {
          if (action === ACTION_ADD) {
            this.instance.addOverlayClass(this.overlays[i], clazz);
          } else if (action === ACTION_REMOVE) {
            this.instance.removeOverlayClass(this.overlays[i], clazz);
          }
        }
      }
    }, {
      key: "addClass",
      value: function addClass(clazz, cascade) {
        var parts = (this.cssClass || "").split(" ");
        parts.push(clazz);
        this.cssClass = parts.join(" ");
        this._clazzManip(ACTION_ADD, clazz);
      }
    }, {
      key: "removeClass",
      value: function removeClass(clazz, cascade) {
        var parts = (this.cssClass || "").split(" ");
        this.cssClass = parts.filter(function (p) {
          return p !== clazz;
        }).join(" ");
        this._clazzManip(ACTION_REMOVE, clazz);
      }
    }, {
      key: "getClass",
      value: function getClass() {
        return this.cssClass;
      }
    }, {
      key: "shouldFireEvent",
      value: function shouldFireEvent(event, value, originalEvent) {
        return true;
      }
    }, {
      key: "getData",
      value: function getData() {
        return this.data;
      }
    }, {
      key: "setData",
      value: function setData(d) {
        this.data = d || {};
      }
    }, {
      key: "mergeData",
      value: function mergeData(d) {
        this.data = extend(this.data, d);
      }
    }, {
      key: "addOverlay",
      value: function addOverlay(overlay) {
        var o = _processOverlay(this, overlay);
        if (this.getData && o.type === LabelOverlay.type && !isString(overlay)) {
          var d = this.getData(),
              p = overlay.options;
          if (d) {
            var locationAttribute = p.labelLocationAttribute || LOCATION_ATTRIBUTE;
            var loc = d[locationAttribute];
            if (loc) {
              o.location = loc;
            }
          }
        }
        return o;
      }
    }, {
      key: "getOverlay",
      value: function getOverlay(id) {
        return this.overlays[id];
      }
    }, {
      key: "getOverlays",
      value: function getOverlays() {
        return this.overlays;
      }
    }, {
      key: "hideOverlay",
      value: function hideOverlay(id) {
        var o = this.getOverlay(id);
        if (o) {
          o.setVisible(false);
        }
      }
    }, {
      key: "hideOverlays",
      value: function hideOverlays() {
        for (var _len = arguments.length, ids = new Array(_len), _key = 0; _key < _len; _key++) {
          ids[_key] = arguments[_key];
        }
        ids = ids || [];
        for (var i in this.overlays) {
          if (ids.length === 0 || ids.indexOf(i) !== -1) {
            this.overlays[i].setVisible(false);
          }
        }
      }
    }, {
      key: "showOverlay",
      value: function showOverlay(id) {
        var o = this.getOverlay(id);
        if (o) {
          o.setVisible(true);
        }
      }
    }, {
      key: "showOverlays",
      value: function showOverlays() {
        for (var _len2 = arguments.length, ids = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          ids[_key2] = arguments[_key2];
        }
        ids = ids || [];
        for (var i in this.overlays) {
          if (ids.length === 0 || ids.indexOf(i) !== -1) {
            this.overlays[i].setVisible(true);
          }
        }
      }
    }, {
      key: "removeAllOverlays",
      value: function removeAllOverlays() {
        for (var i in this.overlays) {
          this.instance.destroyOverlay(this.overlays[i]);
        }
        this.overlays = {};
        this.overlayPositions = null;
        this.overlayPlacements = {};
      }
    }, {
      key: "removeOverlay",
      value: function removeOverlay(overlayId, dontCleanup) {
        var o = this.overlays[overlayId];
        if (o) {
          o.setVisible(false);
          if (!dontCleanup) {
            this.instance.destroyOverlay(o);
          }
          delete this.overlays[overlayId];
          if (this.overlayPositions) {
            delete this.overlayPositions[overlayId];
          }
          if (this.overlayPlacements) {
            delete this.overlayPlacements[overlayId];
          }
        }
      }
    }, {
      key: "removeOverlays",
      value: function removeOverlays() {
        for (var _len3 = arguments.length, overlays = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          overlays[_key3] = arguments[_key3];
        }
        for (var i = 0, j = overlays.length; i < j; i++) {
          this.removeOverlay(arguments[i]);
        }
      }
    }, {
      key: "getLabel",
      value: function getLabel() {
        var lo = this.getLabelOverlay();
        return lo != null ? lo.getLabel() : null;
      }
    }, {
      key: "getLabelOverlay",
      value: function getLabelOverlay() {
        return this.getOverlay(_internalLabelOverlayId);
      }
    }, {
      key: "setLabel",
      value: function setLabel(l) {
        var lo = this.getLabelOverlay();
        if (!lo) {
          var _params2 = isString(l) || isFunction(l) ? {
            label: l
          } : l;
          lo = _makeLabelOverlay(this, _params2);
          this.overlays[_internalLabelOverlayId] = lo;
        } else {
          if (isString(l) || isFunction(l)) {
            lo.setLabel(l);
          } else {
            var ll = l;
            if (ll.label) {
              lo.setLabel(ll.label);
            }
            if (ll.location) {
              lo.location = ll.location;
            }
          }
        }
      }
    }]);
    return Component;
  }(EventGenerator);

  var _opposites, _clockwiseOptions, _antiClockwiseOptions;
  var FaceValues;
  (function (FaceValues) {
    FaceValues["top"] = "top";
    FaceValues["left"] = "left";
    FaceValues["right"] = "right";
    FaceValues["bottom"] = "bottom";
  })(FaceValues || (FaceValues = {}));
  var TOP = FaceValues.top;
  var LEFT = FaceValues.left;
  var RIGHT = FaceValues.right;
  var BOTTOM = FaceValues.bottom;
  var X_AXIS_FACES = [LEFT, RIGHT];
  var Y_AXIS_FACES = [TOP, BOTTOM];
  var LightweightFloatingAnchor = function () {
    function LightweightFloatingAnchor(instance, element, elementId) {
      _classCallCheck$3(this, LightweightFloatingAnchor);
      this.instance = instance;
      this.element = element;
      _defineProperty$3(this, "isFloating", true);
      _defineProperty$3(this, "isContinuous", void 0);
      _defineProperty$3(this, "isDynamic", void 0);
      _defineProperty$3(this, "locations", []);
      _defineProperty$3(this, "currentLocation", 0);
      _defineProperty$3(this, "locked", false);
      _defineProperty$3(this, "cssClass", '');
      _defineProperty$3(this, "timestamp", null);
      _defineProperty$3(this, "type", "Floating");
      _defineProperty$3(this, "id", uuid());
      _defineProperty$3(this, "orientation", [0, 0]);
      _defineProperty$3(this, "size", void 0);
      this.size = instance.viewport.getPosition(elementId);
      this.locations.push({
        x: 0.5,
        y: 0.5,
        ox: this.orientation[0],
        oy: this.orientation[1],
        offx: 0,
        offy: 0,
        iox: this.orientation[0],
        ioy: this.orientation[1],
        cls: ''
      });
    }
    _createClass$3(LightweightFloatingAnchor, [{
      key: "_updateOrientationInRouter",
      value: function _updateOrientationInRouter() {
        this.instance.router.setAnchorOrientation(this, [this.locations[0].ox, this.locations[0].oy]);
      }
    }, {
      key: "over",
      value: function over(endpoint) {
        this.orientation = this.instance.router.getEndpointOrientation(endpoint);
        this.locations[0].ox = this.orientation[0];
        this.locations[0].oy = this.orientation[1];
        this._updateOrientationInRouter();
      }
    }, {
      key: "out",
      value: function out() {
        this.orientation = null;
        this.locations[0].ox = this.locations[0].iox;
        this.locations[0].oy = this.locations[0].ioy;
        this._updateOrientationInRouter();
      }
    }]);
    return LightweightFloatingAnchor;
  }();
  var opposites = (_opposites = {}, _defineProperty$3(_opposites, TOP, BOTTOM), _defineProperty$3(_opposites, RIGHT, LEFT), _defineProperty$3(_opposites, LEFT, RIGHT), _defineProperty$3(_opposites, BOTTOM, TOP), _opposites);
  var clockwiseOptions = (_clockwiseOptions = {}, _defineProperty$3(_clockwiseOptions, TOP, RIGHT), _defineProperty$3(_clockwiseOptions, RIGHT, BOTTOM), _defineProperty$3(_clockwiseOptions, LEFT, TOP), _defineProperty$3(_clockwiseOptions, BOTTOM, LEFT), _clockwiseOptions);
  var antiClockwiseOptions = (_antiClockwiseOptions = {}, _defineProperty$3(_antiClockwiseOptions, TOP, LEFT), _defineProperty$3(_antiClockwiseOptions, RIGHT, TOP), _defineProperty$3(_antiClockwiseOptions, LEFT, BOTTOM), _defineProperty$3(_antiClockwiseOptions, BOTTOM, RIGHT), _antiClockwiseOptions);
  function getDefaultFace(a) {
    return a.faces.length === 0 ? TOP : a.faces[0];
  }
  function _isFaceAvailable(a, face) {
    return a.faces.indexOf(face) !== -1;
  }
  function _secondBest(a, edge) {
    return (a.clockwise ? clockwiseOptions : antiClockwiseOptions)[edge];
  }
  function _lastChoice(a, edge) {
    return (a.clockwise ? antiClockwiseOptions : clockwiseOptions)[edge];
  }
  function isEdgeSupported(a, edge) {
    return a.lockedAxis == null ? a.lockedFace == null ? _isFaceAvailable(a, edge) === true : a.lockedFace === edge : a.lockedAxis.indexOf(edge) !== -1;
  }
  function verifyFace(a, edge) {
    if (_isFaceAvailable(a, edge)) {
      return edge;
    } else if (_isFaceAvailable(a, opposites[edge])) {
      return opposites[edge];
    } else {
      var secondBest = _secondBest(a, edge);
      if (_isFaceAvailable(a, secondBest)) {
        return secondBest;
      } else {
        var lastChoice = _lastChoice(a, edge);
        if (_isFaceAvailable(a, lastChoice)) {
          return lastChoice;
        }
      }
    }
    return edge;
  }
  var _top = {
    x: 0.5,
    y: 0,
    ox: 0,
    oy: -1,
    offx: 0,
    offy: 0
  },
      _bottom = {
    x: 0.5,
    y: 1,
    ox: 0,
    oy: 1,
    offx: 0,
    offy: 0
  },
      _left = {
    x: 0,
    y: 0.5,
    ox: -1,
    oy: 0,
    offx: 0,
    offy: 0
  },
      _right = {
    x: 1,
    y: 0.5,
    ox: 1,
    oy: 0,
    offx: 0,
    offy: 0
  },
      _topLeft = {
    x: 0,
    y: 0,
    ox: 0,
    oy: -1,
    offx: 0,
    offy: 0
  },
      _topRight = {
    x: 1,
    y: 0,
    ox: 1,
    oy: -1,
    offx: 0,
    offy: 0
  },
      _bottomLeft = {
    x: 0,
    y: 1,
    ox: 0,
    oy: 1,
    offx: 0,
    offy: 0
  },
      _bottomRight = {
    x: 1,
    y: 1,
    ox: 0,
    oy: 1,
    offx: 0,
    offy: 0
  },
      _center = {
    x: 0.5,
    y: 0.5,
    ox: 0,
    oy: 0,
    offx: 0,
    offy: 0
  };
  var namedValues = {
    "Top": [_top],
    "Bottom": [_bottom],
    "Left": [_left],
    "Right": [_right],
    "TopLeft": [_topLeft],
    "TopRight": [_topRight],
    "BottomLeft": [_bottomLeft],
    "BottomRight": [_bottomRight],
    "Center": [_center],
    "AutoDefault": [_top, _left, _bottom, _right]
  };
  var namedContinuousValues = {
    "Continuous": {
      faces: [TOP, LEFT, BOTTOM, RIGHT]
    },
    "ContinuousTop": {
      faces: [TOP]
    },
    "ContinuousRight": {
      faces: [RIGHT]
    },
    "ContinuousBottom": {
      faces: [BOTTOM]
    },
    "ContinuousLeft": {
      faces: [LEFT]
    },
    "ContinuousLeftRight": {
      faces: [LEFT, RIGHT]
    },
    "ContinuousTopBottom": {
      faces: [TOP, BOTTOM]
    }
  };
  function getNamedAnchor(name, params) {
    params = params || {};
    if (name === exports.AnchorLocations.Perimeter) {
      return _createPerimeterAnchor(params);
    }
    var a = namedValues[name];
    if (a != null) {
      return _createAnchor(name, map(a, function (_a) {
        return extend({
          iox: _a.ox,
          ioy: _a.oy
        }, _a);
      }), params);
    }
    a = namedContinuousValues[name];
    if (a != null) {
      return _createContinuousAnchor(name, a.faces, params);
    }
    throw {
      message: "jsPlumb: unknown anchor type '" + name + "'"
    };
  }
  function _createAnchor(type, locations, params) {
    return {
      type: type,
      locations: locations,
      currentLocation: 0,
      locked: false,
      id: uuid(),
      isFloating: false,
      isContinuous: false,
      isDynamic: locations.length > 1,
      timestamp: null,
      cssClass: params.cssClass || ""
    };
  }
  function createFloatingAnchor(instance, element, elementId) {
    return new LightweightFloatingAnchor(instance, element, elementId);
  }
  var PROPERTY_CURRENT_FACE = "currentFace";
  function _createContinuousAnchor(type, faces, params) {
    var ca = {
      type: type,
      locations: [],
      currentLocation: 0,
      locked: false,
      id: uuid(),
      cssClass: params.cssClass || "",
      isFloating: false,
      isContinuous: true,
      timestamp: null,
      faces: params.faces || faces,
      lockedFace: null,
      lockedAxis: null,
      clockwise: !(params.clockwise === false),
      __currentFace: null
    };
    Object.defineProperty(ca, PROPERTY_CURRENT_FACE, {
      get: function get() {
        return this.__currentFace;
      },
      set: function set(f) {
        this.__currentFace = verifyFace(this, f);
      }
    });
    return ca;
  }
  function isPrimitiveAnchorSpec(sa) {
    return sa.length < 7 && sa.every(isNumber) || sa.length === 7 && sa.slice(0, 5).every(isNumber) && isString(sa[6]);
  }
  function makeLightweightAnchorFromSpec(spec) {
    if (isString(spec)) {
      return getNamedAnchor(spec, null);
    } else if (Array.isArray(spec)) {
      if (isPrimitiveAnchorSpec(spec)) {
        var _spec = spec;
        return _createAnchor(null, [{
          x: _spec[0],
          y: _spec[1],
          ox: _spec[2],
          oy: _spec[3],
          offx: _spec[4] == null ? 0 : _spec[4],
          offy: _spec[5] == null ? 0 : _spec[5],
          iox: _spec[2],
          ioy: _spec[3],
          cls: _spec[6] || ""
        }], {
          cssClass: _spec[6] || ""
        });
      } else {
        var locations = map(spec, function (aSpec) {
          if (isString(aSpec)) {
            var a = namedValues[aSpec];
            return a != null ? extend({
              iox: a[0].ox,
              ioy: a[0].oy,
              cls: ""
            }, a[0]) : null;
          } else if (isPrimitiveAnchorSpec(aSpec)) {
            return {
              x: aSpec[0],
              y: aSpec[1],
              ox: aSpec[2],
              oy: aSpec[3],
              offx: aSpec[4] == null ? 0 : aSpec[4],
              offy: aSpec[5] == null ? 0 : aSpec[5],
              iox: aSpec[2],
              ioy: aSpec[3],
              cls: aSpec[6] || ""
            };
          }
        }).filter(function (ar) {
          return ar != null;
        });
        return _createAnchor("Dynamic", locations, {});
      }
    } else {
      var sa = spec;
      return getNamedAnchor(sa.type, sa.options);
    }
  }
  function circleGenerator(anchorCount) {
    var r = 0.5,
        step = Math.PI * 2 / anchorCount,
        a = [];
    var current = 0;
    for (var i = 0; i < anchorCount; i++) {
      var x = r + r * Math.sin(current),
          y = r + r * Math.cos(current);
      a.push({
        x: x,
        y: y,
        ox: 0,
        oy: 0,
        offx: 0,
        offy: 0,
        iox: 0,
        ioy: 0,
        cls: ''
      });
      current += step;
    }
    return a;
  }
  function _path(segments, anchorCount) {
    var anchorsPerFace = anchorCount / segments.length,
        a = [],
        _computeFace = function _computeFace(x1, y1, x2, y2, fractionalLength, ox, oy) {
      anchorsPerFace = anchorCount * fractionalLength;
      var dx = (x2 - x1) / anchorsPerFace,
          dy = (y2 - y1) / anchorsPerFace;
      for (var i = 0; i < anchorsPerFace; i++) {
        a.push({
          x: x1 + dx * i,
          y: y1 + dy * i,
          ox: ox == null ? 0 : ox,
          oy: oy == null ? 0 : oy,
          offx: 0,
          offy: 0,
          iox: 0,
          ioy: 0,
          cls: ''
        });
      }
    };
    for (var i = 0; i < segments.length; i++) {
      _computeFace.apply(null, segments[i]);
    }
    return a;
  }
  function shapeGenerator(faces, anchorCount) {
    var s = [];
    for (var i = 0; i < faces.length; i++) {
      s.push([faces[i][0], faces[i][1], faces[i][2], faces[i][3], 1 / faces.length, faces[i][4], faces[i][5]]);
    }
    return _path(s, anchorCount);
  }
  function rectangleGenerator(anchorCount) {
    return shapeGenerator([[0, 0, 1, 0, 0, -1], [1, 0, 1, 1, 1, 0], [1, 1, 0, 1, 0, 1], [0, 1, 0, 0, -1, 0]], anchorCount);
  }
  function diamondGenerator(anchorCount) {
    return shapeGenerator([[0.5, 0, 1, 0.5], [1, 0.5, 0.5, 1], [0.5, 1, 0, 0.5], [0, 0.5, 0.5, 0]], anchorCount);
  }
  function triangleGenerator(anchorCount) {
    return shapeGenerator([[0.5, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0.5, 0]], anchorCount);
  }
  function rotate$1(points, amountInDegrees) {
    var o = [],
        theta = amountInDegrees / 180 * Math.PI;
    for (var i = 0; i < points.length; i++) {
      var _x = points[i].x - 0.5,
          _y = points[i].y - 0.5;
      o.push({
        x: 0.5 + (_x * Math.cos(theta) - _y * Math.sin(theta)),
        y: 0.5 + (_x * Math.sin(theta) + _y * Math.cos(theta)),
        ox: points[i].ox,
        oy: points[i].oy,
        offx: 0,
        offy: 0,
        iox: 0,
        ioy: 0,
        cls: ''
      });
    }
    return o;
  }
  var anchorGenerators = new Map();
  anchorGenerators.set(exports.PerimeterAnchorShapes.Circle, circleGenerator);
  anchorGenerators.set(exports.PerimeterAnchorShapes.Ellipse, circleGenerator);
  anchorGenerators.set(exports.PerimeterAnchorShapes.Rectangle, rectangleGenerator);
  anchorGenerators.set(exports.PerimeterAnchorShapes.Square, rectangleGenerator);
  anchorGenerators.set(exports.PerimeterAnchorShapes.Diamond, diamondGenerator);
  anchorGenerators.set(exports.PerimeterAnchorShapes.Triangle, triangleGenerator);
  function _createPerimeterAnchor(params) {
    params = params || {};
    var anchorCount = params.anchorCount || 60,
        shape = params.shape;
    if (!shape) {
      throw new Error("no shape supplied to Perimeter Anchor type");
    }
    if (!anchorGenerators.has(shape)) {
      throw new Error("Shape [" + shape + "] is unknown by Perimeter Anchor type");
    }
    var da = anchorGenerators.get(shape)(anchorCount);
    if (params.rotation) {
      da = rotate$1(da, params.rotation);
    }
    var a = _createAnchor(exports.AnchorLocations.Perimeter, da, params);
    var aa = extend(a, {
      shape: shape
    });
    return aa;
  }

  var TYPE_ITEM_ANCHORS = "anchors";
  var TYPE_ITEM_CONNECTOR = "connector";
  function prepareEndpoint(conn, existing, index, anchor, element, elementId, endpoint) {
    var e;
    if (existing) {
      conn.endpoints[index] = existing;
      existing.addConnection(conn);
    } else {
      var ep = endpoint || conn.endpointSpec || conn.endpointsSpec[index] || conn.instance.defaults.endpoints[index] || conn.instance.defaults.endpoint;
      var es = conn.endpointStyles[index] || conn.endpointStyle || conn.instance.defaults.endpointStyles[index] || conn.instance.defaults.endpointStyle;
      if (es.fill == null && conn.paintStyle != null) {
        es.fill = conn.paintStyle.stroke;
      }
      if (es.outlineStroke == null && conn.paintStyle != null) {
        es.outlineStroke = conn.paintStyle.outlineStroke;
      }
      if (es.outlineWidth == null && conn.paintStyle != null) {
        es.outlineWidth = conn.paintStyle.outlineWidth;
      }
      var ehs = conn.endpointHoverStyles[index] || conn.endpointHoverStyle || conn.endpointHoverStyle || conn.instance.defaults.endpointHoverStyles[index] || conn.instance.defaults.endpointHoverStyle;
      if (conn.hoverPaintStyle != null) {
        if (ehs == null) {
          ehs = {};
        }
        if (ehs.fill == null) {
          ehs.fill = conn.hoverPaintStyle.stroke;
        }
      }
      var u = conn.uuids ? conn.uuids[index] : null;
      anchor = anchor != null ? anchor : conn.instance.defaults.anchors != null ? conn.instance.defaults.anchors[index] : conn.instance.defaults.anchor;
      e = conn.instance._internal_newEndpoint({
        paintStyle: es,
        hoverPaintStyle: ehs,
        endpoint: ep,
        connections: [conn],
        uuid: u,
        element: element,
        scope: conn.scope,
        anchor: anchor,
        reattachConnections: conn.reattach || conn.instance.defaults.reattachConnections,
        connectionsDetachable: conn.detachable || conn.instance.defaults.connectionsDetachable
      });
      conn.instance._refreshEndpoint(e);
      if (existing == null) {
        e.deleteOnEmpty = true;
      }
      conn.endpoints[index] = e;
    }
    return e;
  }
  var Connection = function (_Component) {
    _inherits$3(Connection, _Component);
    var _super = _createSuper$3(Connection);
    function Connection(instance, params) {
      var _this;
      _classCallCheck$3(this, Connection);
      _this = _super.call(this, instance, params);
      _this.instance = instance;
      _defineProperty$3(_assertThisInitialized$3(_this), "connector", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "defaultLabelLocation", 0.5);
      _defineProperty$3(_assertThisInitialized$3(_this), "scope", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "typeId", "_jsplumb_connection");
      _defineProperty$3(_assertThisInitialized$3(_this), "previousConnection", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "sourceId", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "targetId", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "source", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "target", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "detachable", true);
      _defineProperty$3(_assertThisInitialized$3(_this), "reattach", false);
      _defineProperty$3(_assertThisInitialized$3(_this), "uuids", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "cost", 1);
      _defineProperty$3(_assertThisInitialized$3(_this), "directed", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpoints", [null, null]);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointStyles", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointSpec", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointsSpec", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointStyle", {});
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointHoverStyle", {});
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointHoverStyles", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "suspendedEndpoint", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "suspendedIndex", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "suspendedElement", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "suspendedElementId", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "suspendedElementType", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_forceReattach", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_forceDetach", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "proxies", []);
      _defineProperty$3(_assertThisInitialized$3(_this), "pending", false);
      _this.id = params.id;
      _this.previousConnection = params.previousConnection;
      _this.source = params.source;
      _this.target = params.target;
      if (params.sourceEndpoint) {
        _this.source = params.sourceEndpoint.element;
        _this.sourceId = params.sourceEndpoint.elementId;
      } else {
        _this.sourceId = instance.getId(_this.source);
      }
      if (params.targetEndpoint) {
        _this.target = params.targetEndpoint.element;
        _this.targetId = params.targetEndpoint.elementId;
      } else {
        _this.targetId = instance.getId(_this.target);
      }
      _this.scope = params.scope;
      var sourceAnchor = params.anchors ? params.anchors[0] : params.anchor;
      var targetAnchor = params.anchors ? params.anchors[1] : params.anchor;
      instance.manage(_this.source);
      instance.manage(_this.target);
      _this.visible = true;
      _this.params = {
        cssClass: params.cssClass,
        hoverClass: params.hoverClass,
        "pointer-events": params["pointer-events"],
        overlays: params.overlays
      };
      _this.lastPaintedAt = null;
      if (params.type) {
        params.endpoints = params.endpoints || _this.instance._deriveEndpointAndAnchorSpec(params.type).endpoints;
      }
      _this.endpointSpec = params.endpoint;
      _this.endpointsSpec = params.endpoints || [null, null];
      _this.endpointStyle = params.endpointStyle;
      _this.endpointHoverStyle = params.endpointHoverStyle;
      _this.endpointStyles = params.endpointStyles || [null, null];
      _this.endpointHoverStyles = params.endpointHoverStyles || [null, null];
      _this.paintStyle = params.paintStyle;
      _this.hoverPaintStyle = params.hoverPaintStyle;
      _this.uuids = params.uuids;
      _this.makeEndpoint(true, _this.source, _this.sourceId, sourceAnchor, params.sourceEndpoint);
      _this.makeEndpoint(false, _this.target, _this.targetId, targetAnchor, params.targetEndpoint);
      if (!_this.scope) {
        _this.scope = _this.endpoints[0].scope;
      }
      if (params.deleteEndpointsOnEmpty != null) {
        _this.endpoints[0].deleteOnEmpty = params.deleteEndpointsOnEmpty;
        _this.endpoints[1].deleteOnEmpty = params.deleteEndpointsOnEmpty;
      }
      var _detachable = _this.instance.defaults.connectionsDetachable;
      if (params.detachable === false) {
        _detachable = false;
      }
      if (_this.endpoints[0].connectionsDetachable === false) {
        _detachable = false;
      }
      if (_this.endpoints[1].connectionsDetachable === false) {
        _detachable = false;
      }
      _this.endpointsSpec = params.endpoints || [null, null];
      _this.endpointSpec = params.endpoint || null;
      var _reattach = params.reattach || _this.endpoints[0].reattachConnections || _this.endpoints[1].reattachConnections || _this.instance.defaults.reattachConnections;
      var initialPaintStyle = extend({}, _this.endpoints[0].connectorStyle || _this.endpoints[1].connectorStyle || params.paintStyle || _this.instance.defaults.paintStyle);
      _this.appendToDefaultType({
        detachable: _detachable,
        reattach: _reattach,
        paintStyle: initialPaintStyle,
        hoverPaintStyle: extend({}, _this.endpoints[0].connectorHoverStyle || _this.endpoints[1].connectorHoverStyle || params.hoverPaintStyle || _this.instance.defaults.hoverPaintStyle)
      });
      if (params.outlineWidth) {
        initialPaintStyle.outlineWidth = params.outlineWidth;
      }
      if (params.outlineColor) {
        initialPaintStyle.outlineStroke = params.outlineColor;
      }
      if (params.lineWidth) {
        initialPaintStyle.strokeWidth = params.lineWidth;
      }
      if (params.color) {
        initialPaintStyle.stroke = params.color;
      }
      if (!_this.instance._suspendDrawing) {
        var initialTimestamp = _this.instance._suspendedAt || uuid();
        _this.instance._paintEndpoint(_this.endpoints[0], {
          timestamp: initialTimestamp
        });
        _this.instance._paintEndpoint(_this.endpoints[1], {
          timestamp: initialTimestamp
        });
      }
      _this.cost = params.cost || _this.endpoints[0].connectionCost;
      _this.directed = params.directed;
      if (params.directed == null) {
        _this.directed = _this.endpoints[0].connectionsDirected;
      }
      var _p = extend({}, _this.endpoints[1].parameters);
      extend(_p, _this.endpoints[0].parameters);
      extend(_p, _this.parameters);
      _this.parameters = _p;
      _this.paintStyleInUse = _this.getPaintStyle() || {};
      _this._setConnector(_this.endpoints[0].connector || _this.endpoints[1].connector || params.connector || _this.instance.defaults.connector, true);
      var data = params.data == null || !isObject(params.data) ? {} : params.data;
      _this.setData(data);
      var _types = [DEFAULT, _this.endpoints[0].edgeType, _this.endpoints[1].edgeType, params.type].join(" ");
      if (/[^\s]/.test(_types)) {
        _this.addType(_types, params.data);
      }
      return _this;
    }
    _createClass$3(Connection, [{
      key: "getIdPrefix",
      value: function getIdPrefix() {
        return "_jsPlumb_c";
      }
    }, {
      key: "getDefaultOverlayKey",
      value: function getDefaultOverlayKey() {
        return KEY_CONNECTION_OVERLAYS;
      }
    }, {
      key: "getXY",
      value: function getXY() {
        return {
          x: this.connector.x,
          y: this.connector.y
        };
      }
    }, {
      key: "makeEndpoint",
      value: function makeEndpoint(isSource, el, elId, anchor, ep) {
        elId = elId || this.instance.getId(el);
        return prepareEndpoint(this, ep, isSource ? 0 : 1, anchor, el);
      }
    }, {
      key: "getTypeDescriptor",
      value: function getTypeDescriptor() {
        return Connection.type;
      }
    }, {
      key: "isDetachable",
      value: function isDetachable(ep) {
        return this.detachable === false ? false : ep != null ? ep.connectionsDetachable === true : this.detachable === true;
      }
    }, {
      key: "setDetachable",
      value: function setDetachable(detachable) {
        this.detachable = detachable === true;
      }
    }, {
      key: "isReattach",
      value: function isReattach() {
        return this.reattach === true || this.endpoints[0].reattachConnections === true || this.endpoints[1].reattachConnections === true;
      }
    }, {
      key: "setReattach",
      value: function setReattach(reattach) {
        this.reattach = reattach === true;
      }
    }, {
      key: "applyType",
      value: function applyType(t, typeMap) {
        var _connector = null;
        if (t.connector != null) {
          _connector = this.getCachedTypeItem(TYPE_ITEM_CONNECTOR, typeMap.connector);
          if (_connector == null) {
            _connector = this.prepareConnector(t.connector, typeMap.connector);
            this.cacheTypeItem(TYPE_ITEM_CONNECTOR, _connector, typeMap.connector);
          }
          this.setPreparedConnector(_connector);
        }
        _get$1(_getPrototypeOf$3(Connection.prototype), "applyType", this).call(this, t, typeMap);
        if (t.detachable != null) {
          this.setDetachable(t.detachable);
        }
        if (t.reattach != null) {
          this.setReattach(t.reattach);
        }
        if (t.scope) {
          this.scope = t.scope;
        }
        var _anchors = null;
        if (t.anchor) {
          _anchors = this.getCachedTypeItem(TYPE_ITEM_ANCHORS, typeMap.anchor);
          if (_anchors == null) {
            _anchors = [makeLightweightAnchorFromSpec(t.anchor), makeLightweightAnchorFromSpec(t.anchor)];
            this.cacheTypeItem(TYPE_ITEM_ANCHORS, _anchors, typeMap.anchor);
          }
        } else if (t.anchors) {
          _anchors = this.getCachedTypeItem(TYPE_ITEM_ANCHORS, typeMap.anchors);
          if (_anchors == null) {
            _anchors = [makeLightweightAnchorFromSpec(t.anchors[0]), makeLightweightAnchorFromSpec(t.anchors[1])];
            this.cacheTypeItem(TYPE_ITEM_ANCHORS, _anchors, typeMap.anchors);
          }
        }
        if (_anchors != null) {
          this.instance.router.setConnectionAnchors(this, _anchors);
          if (this.instance.router.isDynamicAnchor(this.endpoints[1])) {
            this.instance.repaint(this.endpoints[1].element);
          }
        }
        this.instance.applyConnectorType(this.connector, t);
      }
    }, {
      key: "addClass",
      value: function addClass(c, cascade) {
        _get$1(_getPrototypeOf$3(Connection.prototype), "addClass", this).call(this, c);
        if (cascade) {
          this.endpoints[0].addClass(c);
          this.endpoints[1].addClass(c);
          if (this.suspendedEndpoint) {
            this.suspendedEndpoint.addClass(c);
          }
        }
        if (this.connector) {
          this.instance.addConnectorClass(this.connector, c);
        }
      }
    }, {
      key: "removeClass",
      value: function removeClass(c, cascade) {
        _get$1(_getPrototypeOf$3(Connection.prototype), "removeClass", this).call(this, c);
        if (cascade) {
          this.endpoints[0].removeClass(c);
          this.endpoints[1].removeClass(c);
          if (this.suspendedEndpoint) {
            this.suspendedEndpoint.removeClass(c);
          }
        }
        if (this.connector) {
          this.instance.removeConnectorClass(this.connector, c);
        }
      }
    }, {
      key: "setVisible",
      value: function setVisible(v) {
        _get$1(_getPrototypeOf$3(Connection.prototype), "setVisible", this).call(this, v);
        if (this.connector) {
          this.instance.setConnectorVisible(this.connector, v);
        }
        this.instance._paintConnection(this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get$1(_getPrototypeOf$3(Connection.prototype), "destroy", this).call(this);
        this.endpoints = null;
        this.endpointStyles = null;
        this.source = null;
        this.target = null;
        this.instance.destroyConnector(this);
        this.connector = null;
        this.deleted = true;
      }
    }, {
      key: "getUuids",
      value: function getUuids() {
        return [this.endpoints[0].getUuid(), this.endpoints[1].getUuid()];
      }
    }, {
      key: "prepareConnector",
      value: function prepareConnector(connectorSpec, typeId) {
        var connectorArgs = {
          cssClass: this.params.cssClass,
          hoverClass: this.params.hoverClass,
          "pointer-events": this.params["pointer-events"]
        },
            connector;
        if (isString(connectorSpec)) {
          connector = this.instance._makeConnector(this, connectorSpec, connectorArgs);
        } else {
          var co = connectorSpec;
          connector = this.instance._makeConnector(this, co.type, merge(co.options || {}, connectorArgs));
        }
        if (typeId != null) {
          connector.typeId = typeId;
        }
        return connector;
      }
    }, {
      key: "setPreparedConnector",
      value: function setPreparedConnector(connector, doNotRepaint, doNotChangeListenerComponent, typeId) {
        if (this.connector !== connector) {
          var previous,
              previousClasses = "";
          if (this.connector != null) {
            previous = this.connector;
            previousClasses = this.instance.getConnectorClass(this.connector);
            this.instance.destroyConnector(this);
          }
          this.connector = connector;
          if (typeId) {
            this.cacheTypeItem(TYPE_ITEM_CONNECTOR, connector, typeId);
          }
          this.addClass(previousClasses);
          if (previous != null) {
            var o = this.getOverlays();
            for (var i in o) {
              this.instance.reattachOverlay(o[i], this);
            }
          }
          if (!doNotRepaint) {
            this.instance._paintConnection(this);
          }
        }
      }
    }, {
      key: "_setConnector",
      value: function _setConnector(connectorSpec, doNotRepaint, doNotChangeListenerComponent, typeId) {
        var connector = this.prepareConnector(connectorSpec, typeId);
        this.setPreparedConnector(connector, doNotRepaint, doNotChangeListenerComponent, typeId);
      }
    }, {
      key: "replaceEndpoint",
      value: function replaceEndpoint(idx, endpointDef) {
        var current = this.endpoints[idx],
            elId = current.elementId,
            ebe = this.instance.getEndpoints(current.element),
            _idx = ebe.indexOf(current),
            _new = prepareEndpoint(this, null, idx, null, current.element, elId, endpointDef);
        this.endpoints[idx] = _new;
        ebe.splice(_idx, 1, _new);
        current.detachFromConnection(this);
        this.instance.deleteEndpoint(current);
        this.instance.fire(EVENT_ENDPOINT_REPLACED, {
          previous: current,
          current: _new
        });
      }
    }]);
    return Connection;
  }(Component);
  _defineProperty$3(Connection, "type", "connection");

  var typeParameters = ["connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass"];
  var Endpoint = function (_Component) {
    _inherits$3(Endpoint, _Component);
    var _super = _createSuper$3(Endpoint);
    function Endpoint(instance, params) {
      var _this;
      _classCallCheck$3(this, Endpoint);
      _this = _super.call(this, instance, params);
      _this.instance = instance;
      _defineProperty$3(_assertThisInitialized$3(_this), "connections", []);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpoint", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "element", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "elementId", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "dragAllowedWhenFull", true);
      _defineProperty$3(_assertThisInitialized$3(_this), "timestamp", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "portId", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "maxConnections", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "proxiedBy", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectorClass", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectorHoverClass", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "finalEndpoint", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "enabled", true);
      _defineProperty$3(_assertThisInitialized$3(_this), "isSource", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "isTarget", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "isTemporarySource", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectionCost", 1);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectionsDirected", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectionsDetachable", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "reattachConnections", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "currentAnchorClass", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "referenceEndpoint", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "edgeType", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "connector", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectorOverlays", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectorStyle", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectorHoverStyle", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "deleteOnEmpty", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "uuid", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "scope", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_anchor", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "defaultLabelLocation", [0.5, 0.5]);
      _this.appendToDefaultType({
        edgeType: params.edgeType,
        maxConnections: params.maxConnections == null ? _this.instance.defaults.maxConnections : params.maxConnections,
        paintStyle: params.paintStyle || _this.instance.defaults.endpointStyle,
        hoverPaintStyle: params.hoverPaintStyle || _this.instance.defaults.endpointHoverStyle,
        connectorStyle: params.connectorStyle,
        connectorHoverStyle: params.connectorHoverStyle,
        connectorClass: params.connectorClass,
        connectorHoverClass: params.connectorHoverClass,
        connectorOverlays: params.connectorOverlays,
        connector: params.connector
      });
      _this.enabled = !(params.enabled === false);
      _this.visible = true;
      _this.element = params.element;
      _this.uuid = params.uuid;
      _this.portId = params.portId;
      _this.elementId = params.elementId;
      _this.connectionCost = params.connectionCost == null ? 1 : params.connectionCost;
      _this.connectionsDirected = params.connectionsDirected;
      _this.currentAnchorClass = "";
      _this.events = {};
      _this.connectorOverlays = params.connectorOverlays;
      _this.connectorStyle = params.connectorStyle;
      _this.connectorHoverStyle = params.connectorHoverStyle;
      _this.connector = params.connector;
      _this.edgeType = params.edgeType;
      _this.connectorClass = params.connectorClass;
      _this.connectorHoverClass = params.connectorHoverClass;
      _this.deleteOnEmpty = params.deleteOnEmpty === true;
      _this.isSource = params.source || false;
      _this.isTemporarySource = params.isTemporarySource || false;
      _this.isTarget = params.target || false;
      _this.connections = params.connections || [];
      _this.scope = params.scope || instance.defaultScope;
      _this.timestamp = null;
      _this.reattachConnections = params.reattachConnections || instance.defaults.reattachConnections;
      _this.connectionsDetachable = instance.defaults.connectionsDetachable;
      if (params.connectionsDetachable === false) {
        _this.connectionsDetachable = false;
      }
      _this.dragAllowedWhenFull = params.dragAllowedWhenFull !== false;
      if (params.onMaxConnections) {
        _this.bind(EVENT_MAX_CONNECTIONS, params.onMaxConnections);
      }
      var ep = params.endpoint || params.existingEndpoint || instance.defaults.endpoint;
      _this.setEndpoint(ep);
      if (params.preparedAnchor != null) {
        _this.setPreparedAnchor(params.preparedAnchor);
      } else {
        var anchorParamsToUse = params.anchor ? params.anchor : params.anchors ? params.anchors : instance.defaults.anchor || exports.AnchorLocations.Top;
        _this.setAnchor(anchorParamsToUse);
      }
      var type = [DEFAULT, params.type || ""].join(" ");
      _this.addType(type, params.data);
      return _this;
    }
    _createClass$3(Endpoint, [{
      key: "getIdPrefix",
      value: function getIdPrefix() {
        return "_jsplumb_e";
      }
    }, {
      key: "getTypeDescriptor",
      value: function getTypeDescriptor() {
        return "endpoint";
      }
    }, {
      key: "getXY",
      value: function getXY() {
        return {
          x: this.endpoint.x,
          y: this.endpoint.y
        };
      }
    }, {
      key: "getDefaultOverlayKey",
      value: function getDefaultOverlayKey() {
        return "endpointOverlays";
      }
    }, {
      key: "_updateAnchorClass",
      value: function _updateAnchorClass() {
        var ac = this._anchor && this._anchor.cssClass;
        if (ac != null && ac.length > 0) {
          var oldAnchorClass = this.instance.endpointAnchorClassPrefix + "-" + this.currentAnchorClass;
          this.currentAnchorClass = ac;
          var anchorClass = this.instance.endpointAnchorClassPrefix + (this.currentAnchorClass ? "-" + this.currentAnchorClass : "");
          if (oldAnchorClass !== anchorClass) {
            this.removeClass(oldAnchorClass);
            this.addClass(anchorClass);
            this.instance.removeClass(this.element, oldAnchorClass);
            this.instance.addClass(this.element, anchorClass);
          }
        }
      }
    }, {
      key: "setPreparedAnchor",
      value: function setPreparedAnchor(anchor) {
        this.instance.router.setAnchor(this, anchor);
        this._updateAnchorClass();
        return this;
      }
    }, {
      key: "_anchorLocationChanged",
      value: function _anchorLocationChanged(currentAnchor) {
        this.fire(EVENT_ANCHOR_CHANGED, {
          endpoint: this,
          anchor: currentAnchor
        });
        this._updateAnchorClass();
      }
    }, {
      key: "setAnchor",
      value: function setAnchor(anchorParams) {
        var a = this.instance.router.prepareAnchor(anchorParams);
        this.setPreparedAnchor(a);
        return this;
      }
    }, {
      key: "addConnection",
      value: function addConnection(conn) {
        this.connections.push(conn);
        this.instance._refreshEndpoint(this);
      }
    }, {
      key: "detachFromConnection",
      value: function detachFromConnection(connection, idx, transientDetach) {
        idx = idx == null ? this.connections.indexOf(connection) : idx;
        if (idx >= 0) {
          this.connections.splice(idx, 1);
          this.instance._refreshEndpoint(this);
        }
        if (!transientDetach && this.deleteOnEmpty && this.connections.length === 0) {
          this.instance.deleteEndpoint(this);
        }
      }
    }, {
      key: "deleteEveryConnection",
      value: function deleteEveryConnection(params) {
        var c = this.connections.length;
        for (var i = 0; i < c; i++) {
          this.instance.deleteConnection(this.connections[0], params);
        }
      }
    }, {
      key: "detachFrom",
      value: function detachFrom(otherEndpoint) {
        var c = [];
        for (var i = 0; i < this.connections.length; i++) {
          if (this.connections[i].endpoints[1] === otherEndpoint || this.connections[i].endpoints[0] === otherEndpoint) {
            c.push(this.connections[i]);
          }
        }
        for (var j = 0, count = c.length; j < count; j++) {
          this.instance.deleteConnection(c[0]);
        }
        return this;
      }
    }, {
      key: "setVisible",
      value: function setVisible(v, doNotChangeConnections, doNotNotifyOtherEndpoint) {
        _get$1(_getPrototypeOf$3(Endpoint.prototype), "setVisible", this).call(this, v);
        this.endpoint.setVisible(v);
        if (v) {
          this.showOverlays();
        } else {
          this.hideOverlays();
        }
        if (!doNotChangeConnections) {
          for (var i = 0; i < this.connections.length; i++) {
            this.connections[i].setVisible(v);
            if (!doNotNotifyOtherEndpoint) {
              var oIdx = this === this.connections[i].endpoints[0] ? 1 : 0;
              if (this.connections[i].endpoints[oIdx].connections.length === 1) {
                this.connections[i].endpoints[oIdx].setVisible(v, true, true);
              }
            }
          }
        }
      }
    }, {
      key: "applyType",
      value: function applyType(t, typeMap) {
        _get$1(_getPrototypeOf$3(Endpoint.prototype), "applyType", this).call(this, t, typeMap);
        this.setPaintStyle(t.endpointStyle || t.paintStyle);
        this.setHoverPaintStyle(t.endpointHoverStyle || t.hoverPaintStyle);
        this.connectorStyle = t.connectorStyle;
        this.connectorHoverStyle = t.connectorHoverStyle;
        this.connector = t.connector;
        this.connectorOverlays = t.connectorOverlays;
        this.edgeType = t.edgeType;
        if (t.maxConnections != null) {
          this.maxConnections = t.maxConnections;
        }
        if (t.scope) {
          this.scope = t.scope;
        }
        extend(t, typeParameters);
        this.instance.applyEndpointType(this, t);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get$1(_getPrototypeOf$3(Endpoint.prototype), "destroy", this).call(this);
        this.deleted = true;
        if (this.endpoint != null) {
          this.instance.destroyEndpoint(this);
        }
      }
    }, {
      key: "isFull",
      value: function isFull() {
        return this.maxConnections === 0 ? true : !(this.isFloating() || this.maxConnections < 0 || this.connections.length < this.maxConnections);
      }
    }, {
      key: "isFloating",
      value: function isFloating() {
        return this.instance.router.isFloating(this);
      }
    }, {
      key: "isConnectedTo",
      value: function isConnectedTo(otherEndpoint) {
        var found = false;
        if (otherEndpoint) {
          for (var i = 0; i < this.connections.length; i++) {
            if (this.connections[i].endpoints[1] === otherEndpoint || this.connections[i].endpoints[0] === otherEndpoint) {
              found = true;
              break;
            }
          }
        }
        return found;
      }
    }, {
      key: "setDragAllowedWhenFull",
      value: function setDragAllowedWhenFull(allowed) {
        this.dragAllowedWhenFull = allowed;
      }
    }, {
      key: "getUuid",
      value: function getUuid() {
        return this.uuid;
      }
    }, {
      key: "connectorSelector",
      value: function connectorSelector() {
        return this.connections[0];
      }
    }, {
      key: "prepareEndpoint",
      value: function prepareEndpoint(ep, typeId) {
        var endpointArgs = {
          cssClass: this.cssClass,
          endpoint: this
        };
        var endpoint;
        if (isAssignableFrom(ep, EndpointRepresentation)) {
          var epr = ep;
          endpoint = EndpointFactory.clone(epr);
          endpoint.classes = endpointArgs.cssClass.split(" ");
        } else if (isString(ep)) {
          endpoint = EndpointFactory.get(this, ep, endpointArgs);
        } else {
          var fep = ep;
          extend(endpointArgs, fep.options || {});
          endpoint = EndpointFactory.get(this, fep.type, endpointArgs);
        }
        endpoint.typeId = typeId;
        return endpoint;
      }
    }, {
      key: "setEndpoint",
      value: function setEndpoint(ep) {
        var _ep = this.prepareEndpoint(ep);
        this.setPreparedEndpoint(_ep);
      }
    }, {
      key: "setPreparedEndpoint",
      value: function setPreparedEndpoint(ep) {
        if (this.endpoint != null) {
          this.instance.destroyEndpoint(this);
        }
        this.endpoint = ep;
      }
    }, {
      key: "addClass",
      value: function addClass(clazz, cascade) {
        _get$1(_getPrototypeOf$3(Endpoint.prototype), "addClass", this).call(this, clazz, cascade);
        if (this.endpoint != null) {
          this.endpoint.addClass(clazz);
        }
      }
    }, {
      key: "removeClass",
      value: function removeClass(clazz, cascade) {
        _get$1(_getPrototypeOf$3(Endpoint.prototype), "removeClass", this).call(this, clazz, cascade);
        if (this.endpoint != null) {
          this.endpoint.removeClass(clazz);
        }
      }
    }]);
    return Endpoint;
  }(Component);

  var UINode = function UINode(instance, el) {
    _classCallCheck$3(this, UINode);
    this.instance = instance;
    this.el = el;
    _defineProperty$3(this, "group", void 0);
  };
  var UIGroup = function (_UINode) {
    _inherits$3(UIGroup, _UINode);
    var _super = _createSuper$3(UIGroup);
    function UIGroup(instance, el, options) {
      var _this;
      _classCallCheck$3(this, UIGroup);
      _this = _super.call(this, instance, el);
      _this.instance = instance;
      _defineProperty$3(_assertThisInitialized$3(_this), "children", []);
      _defineProperty$3(_assertThisInitialized$3(_this), "collapsed", false);
      _defineProperty$3(_assertThisInitialized$3(_this), "droppable", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "enabled", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "orphan", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "constrain", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "proxied", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "ghost", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "revert", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "prune", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "dropOverride", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "anchor", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpoint", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "connections", {
        source: [],
        target: [],
        internal: []
      });
      _defineProperty$3(_assertThisInitialized$3(_this), "manager", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "id", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "elId", void 0);
      var jel = _this.el;
      jel._isJsPlumbGroup = true;
      jel._jsPlumbGroup = _assertThisInitialized$3(_this);
      _this.elId = instance.getId(el);
      _this.orphan = options.orphan === true;
      _this.revert = _this.orphan === true ? false : options.revert !== false;
      _this.droppable = options.droppable !== false;
      _this.ghost = options.ghost === true;
      _this.enabled = options.enabled !== false;
      _this.prune = _this.orphan !== true && options.prune === true;
      _this.constrain = _this.ghost || options.constrain === true;
      _this.proxied = options.proxied !== false;
      _this.id = options.id || uuid();
      _this.dropOverride = options.dropOverride === true;
      _this.anchor = options.anchor;
      _this.endpoint = options.endpoint;
      _this.anchor = options.anchor;
      instance.setAttribute(el, ATTRIBUTE_GROUP, "");
      return _this;
    }
    _createClass$3(UIGroup, [{
      key: "contentArea",
      get: function get() {
        return this.instance.getGroupContentArea(this);
      }
    }, {
      key: "overrideDrop",
      value: function overrideDrop(el, targetGroup) {
        return this.dropOverride && (this.revert || this.prune || this.orphan);
      }
    }, {
      key: "getAnchor",
      value: function getAnchor(conn, endpointIndex) {
        return this.anchor || "Continuous";
      }
    }, {
      key: "getEndpoint",
      value: function getEndpoint(conn, endpointIndex) {
        return this.endpoint || {
          type: DotEndpoint.type,
          options: {
            radius: 10
          }
        };
      }
    }, {
      key: "add",
      value: function add(_el, doNotFireEvent) {
        var dragArea = this.instance.getGroupContentArea(this);
        var __el = _el;
        if (__el._jsPlumbParentGroup != null) {
          if (__el._jsPlumbParentGroup === this) {
            return;
          } else {
            __el._jsPlumbParentGroup.remove(_el, true, doNotFireEvent, false);
          }
        }
        __el._jsPlumbParentGroup = this;
        this.children.push(new UINode(this.instance, _el));
        this.instance._appendElement(__el, dragArea);
        this.manager._updateConnectionsForGroup(this);
      }
    }, {
      key: "resolveNode",
      value: function resolveNode(el) {
        return el == null ? null : getWithFunction(this.children, function (u) {
          return u.el === el;
        });
      }
    }, {
      key: "remove",
      value: function remove(el, manipulateDOM, doNotFireEvent, doNotUpdateConnections, targetGroup) {
        var uiNode = this.resolveNode(el);
        if (uiNode != null) {
          this._doRemove(uiNode, manipulateDOM, doNotFireEvent, doNotUpdateConnections, targetGroup);
        }
      }
    }, {
      key: "_doRemove",
      value: function _doRemove(child, manipulateDOM, doNotFireEvent, doNotUpdateConnections, targetGroup) {
        var __el = child.el;
        delete __el._jsPlumbParentGroup;
        removeWithFunction(this.children, function (e) {
          return e === child;
        });
        if (manipulateDOM) {
          try {
            this.instance.getGroupContentArea(this).removeChild(__el);
          } catch (e) {
            log("Could not remove element from Group " + e);
          }
        }
        if (!doNotFireEvent) {
          var p = {
            group: this,
            el: __el
          };
          if (targetGroup) {
            p.targetGroup = targetGroup;
          }
          this.instance.fire(EVENT_GROUP_MEMBER_REMOVED, p);
        }
        if (!doNotUpdateConnections) {
          this.manager._updateConnectionsForGroup(this);
        }
      }
    }, {
      key: "removeAll",
      value: function removeAll(manipulateDOM, doNotFireEvent) {
        for (var i = 0, l = this.children.length; i < l; i++) {
          var child = this.children[0];
          this._doRemove(child, manipulateDOM, doNotFireEvent, true);
          this.instance.unmanage(child.el, true);
        }
        this.children.length = 0;
        this.manager._updateConnectionsForGroup(this);
      }
    }, {
      key: "orphanAll",
      value: function orphanAll() {
        var orphanedPositions = {};
        for (var i = 0; i < this.children.length; i++) {
          var newPosition = this.manager.orphan(this.children[i].el, false);
          orphanedPositions[newPosition.id] = newPosition.pos;
        }
        this.children.length = 0;
        return orphanedPositions;
      }
    }, {
      key: "addGroup",
      value: function addGroup(group) {
        if (this.instance.allowNestedGroups && group !== this) {
          if (this.instance.groupManager.isAncestor(this, group)) {
            return false;
          }
          if (group.group != null) {
            group.group.removeGroup(group);
          }
          var groupElId = this.instance.getId(group.el);
          var entry = this.instance.getManagedElements()[groupElId];
          entry.group = this.elId;
          var elpos = this.instance.getOffsetRelativeToRoot(group.el);
          var cpos = this.collapsed ? this.instance.getOffsetRelativeToRoot(this.el) : this.instance.getOffsetRelativeToRoot(this.instance.getGroupContentArea(this));
          group.el._jsPlumbParentGroup = this;
          this.children.push(group);
          this.instance._appendElementToGroup(this, group.el);
          group.group = this;
          var newPosition = {
            x: elpos.x - cpos.x,
            y: elpos.y - cpos.y
          };
          this.instance.setPosition(group.el, newPosition);
          this.instance.fire(EVENT_NESTED_GROUP_ADDED, {
            parent: this,
            child: group
          });
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "removeGroup",
      value: function removeGroup(group) {
        if (group.group === this) {
          var jel = group.el;
          var d = this.instance.getGroupContentArea(this);
          if (d === jel.parentNode) {
            d.removeChild(group.el);
          }
          var groupElId = this.instance.getId(group.el);
          var entry = this.instance.getManagedElements()[groupElId];
          if (entry) {
            delete entry.group;
          }
          this.children = this.children.filter(function (cg) {
            return cg.id !== group.id;
          });
          delete group.group;
          delete jel._jsPlumbParentGroup;
          this.instance.fire(EVENT_NESTED_GROUP_REMOVED, {
            parent: this,
            child: group
          });
        }
      }
    }, {
      key: "getGroups",
      value: function getGroups() {
        return this.children.filter(function (cg) {
          return cg.constructor === UIGroup;
        });
      }
    }, {
      key: "getNodes",
      value: function getNodes() {
        return this.children.filter(function (cg) {
          return cg.constructor === UINode;
        });
      }
    }, {
      key: "collapseParent",
      get: function get() {
        var cg = null;
        if (this.group == null) {
          return null;
        } else {
          var g = this.group;
          while (g != null) {
            if (g.collapsed) {
              cg = g;
            }
            g = g.group;
          }
          return cg;
        }
      }
    }]);
    return UIGroup;
  }(UINode);

  var GroupManager = function () {
    function GroupManager(instance) {
      var _this = this;
      _classCallCheck$3(this, GroupManager);
      this.instance = instance;
      _defineProperty$3(this, "groupMap", {});
      _defineProperty$3(this, "_connectionSourceMap", {});
      _defineProperty$3(this, "_connectionTargetMap", {});
      instance.bind(EVENT_INTERNAL_CONNECTION, function (p) {
        var sourceGroup = _this.getGroupFor(p.source);
        var targetGroup = _this.getGroupFor(p.target);
        if (sourceGroup != null && targetGroup != null && sourceGroup === targetGroup) {
          _this._connectionSourceMap[p.connection.id] = sourceGroup;
          _this._connectionTargetMap[p.connection.id] = sourceGroup;
          suggest(sourceGroup.connections.internal, p.connection);
        } else {
          if (sourceGroup != null) {
            if (p.target._jsPlumbGroup === sourceGroup) {
              suggest(sourceGroup.connections.internal, p.connection);
            } else {
              suggest(sourceGroup.connections.source, p.connection);
            }
            _this._connectionSourceMap[p.connection.id] = sourceGroup;
          }
          if (targetGroup != null) {
            if (p.source._jsPlumbGroup === targetGroup) {
              suggest(targetGroup.connections.internal, p.connection);
            } else {
              suggest(targetGroup.connections.target, p.connection);
            }
            _this._connectionTargetMap[p.connection.id] = targetGroup;
          }
        }
      });
      instance.bind(EVENT_INTERNAL_CONNECTION_DETACHED, function (p) {
        _this._cleanupDetachedConnection(p.connection);
      });
      instance.bind(EVENT_CONNECTION_MOVED, function (p) {
        var originalElement = p.originalEndpoint.element,
            originalGroup = _this.getGroupFor(originalElement),
            newEndpoint = p.connection.endpoints[p.index],
            newElement = newEndpoint.element,
            newGroup = _this.getGroupFor(newElement),
            connMap = p.index === 0 ? _this._connectionSourceMap : _this._connectionTargetMap,
            otherConnMap = p.index === 0 ? _this._connectionTargetMap : _this._connectionSourceMap;
        if (newGroup != null) {
          connMap[p.connection.id] = newGroup;
          if (p.connection.source === p.connection.target) {
            otherConnMap[p.connection.id] = newGroup;
          }
        } else {
          delete connMap[p.connection.id];
          if (p.connection.source === p.connection.target) {
            delete otherConnMap[p.connection.id];
          }
        }
        if (originalGroup != null) {
          _this._updateConnectionsForGroup(originalGroup);
        }
        if (newGroup != null) {
          _this._updateConnectionsForGroup(newGroup);
        }
      });
    }
    _createClass$3(GroupManager, [{
      key: "_cleanupDetachedConnection",
      value: function _cleanupDetachedConnection(conn) {
        conn.proxies.length = 0;
        var group = this._connectionSourceMap[conn.id],
            f;
        if (group != null) {
          f = function f(c) {
            return c.id === conn.id;
          };
          removeWithFunction(group.connections.source, f);
          removeWithFunction(group.connections.target, f);
          removeWithFunction(group.connections.internal, f);
          delete this._connectionSourceMap[conn.id];
        }
        group = this._connectionTargetMap[conn.id];
        if (group != null) {
          f = function f(c) {
            return c.id === conn.id;
          };
          removeWithFunction(group.connections.source, f);
          removeWithFunction(group.connections.target, f);
          removeWithFunction(group.connections.internal, f);
          delete this._connectionTargetMap[conn.id];
        }
      }
    }, {
      key: "addGroup",
      value: function addGroup(params) {
        var jel = params.el;
        if (this.groupMap[params.id] != null) {
          throw new Error("cannot create Group [" + params.id + "]; a Group with that ID exists");
        }
        if (jel._isJsPlumbGroup != null) {
          throw new Error("cannot create Group [" + params.id + "]; the given element is already a Group");
        }
        var group = new UIGroup(this.instance, params.el, params);
        this.groupMap[group.id] = group;
        if (params.collapsed) {
          this.collapseGroup(group);
        }
        this.instance.manage(group.el);
        this.instance.addClass(group.el, CLASS_GROUP_EXPANDED);
        group.manager = this;
        this._updateConnectionsForGroup(group);
        this.instance.fire(EVENT_GROUP_ADDED, {
          group: group
        });
        return group;
      }
    }, {
      key: "getGroup",
      value: function getGroup(groupId) {
        var group = groupId;
        if (isString(groupId)) {
          group = this.groupMap[groupId];
          if (group == null) {
            throw new Error("No such group [" + groupId + "]");
          }
        }
        return group;
      }
    }, {
      key: "getGroupFor",
      value: function getGroupFor(el) {
        var jel = el;
        var c = this.instance.getContainer();
        var abort = false,
            g = null;
        while (!abort) {
          if (jel == null || jel === c) {
            abort = true;
          } else {
            if (jel._jsPlumbParentGroup) {
              g = jel._jsPlumbParentGroup;
              abort = true;
            } else {
              jel = jel.parentNode;
            }
          }
        }
        return g;
      }
    }, {
      key: "getGroups",
      value: function getGroups() {
        var g = [];
        for (var key in this.groupMap) {
          g.push(this.groupMap[key]);
        }
        return g;
      }
    }, {
      key: "removeGroup",
      value: function removeGroup(group, deleteMembers, manipulateView, doNotFireEvent) {
        var _this2 = this;
        var actualGroup = this.getGroup(group);
        this.expandGroup(actualGroup, true);
        var newPositions = {};
        forEach(actualGroup.children, function (uiNode) {
          var entry = _this2.instance.getManagedElements()[_this2.instance.getId(uiNode.el)];
          if (entry) {
            delete entry.group;
          }
        });
        if (deleteMembers) {
          forEach(actualGroup.getGroups(), function (cg) {
            return _this2.removeGroup(cg, deleteMembers, manipulateView);
          });
          actualGroup.removeAll(manipulateView, doNotFireEvent);
        } else {
          if (actualGroup.group) {
            forEach(actualGroup.children, function (c) {
              return actualGroup.group.add(c.el);
            });
          }
          newPositions = actualGroup.orphanAll();
        }
        if (actualGroup.group) {
          actualGroup.group.removeGroup(actualGroup);
        }
        this.instance.unmanage(actualGroup.el, true);
        delete this.groupMap[actualGroup.id];
        this.instance.fire(EVENT_GROUP_REMOVED, {
          group: actualGroup
        });
        return newPositions;
      }
    }, {
      key: "removeAllGroups",
      value: function removeAllGroups(deleteMembers, manipulateView, doNotFireEvent) {
        for (var _g in this.groupMap) {
          this.removeGroup(this.groupMap[_g], deleteMembers, manipulateView, doNotFireEvent);
        }
      }
    }, {
      key: "forEach",
      value: function forEach(f) {
        for (var key in this.groupMap) {
          f(this.groupMap[key]);
        }
      }
    }, {
      key: "orphan",
      value: function orphan(el, doNotTransferToAncestor) {
        var jel = el;
        if (jel._jsPlumbParentGroup) {
          var currentParent = jel._jsPlumbParentGroup;
          var id = this.instance.getId(jel);
          var pos = this.instance.getOffset(el);
          if (doNotTransferToAncestor !== true && currentParent.group) {
            this.instance._appendElementToGroup(currentParent.group, el);
          } else {
            this.instance._appendElementToContainer(el);
          }
          this.instance.setPosition(el, pos);
          delete jel._jsPlumbParentGroup;
          return {
            id: id,
            pos: pos
          };
        }
      }
    }, {
      key: "_updateConnectionsForGroup",
      value: function _updateConnectionsForGroup(group) {
        var _this3 = this;
        group.connections.source.length = 0;
        group.connections.target.length = 0;
        group.connections.internal.length = 0;
        var members = group.children.slice().map(function (cn) {
          return cn.el;
        });
        var childMembers = [];
        forEach(members, function (member) {
          Array.prototype.push.apply(childMembers, _this3.instance.getSelector(member, SELECTOR_MANAGED_ELEMENT));
        });
        Array.prototype.push.apply(members, childMembers);
        if (members.length > 0) {
          var c1 = this.instance.getConnections({
            source: members,
            scope: WILDCARD
          }, true);
          var c2 = this.instance.getConnections({
            target: members,
            scope: WILDCARD
          }, true);
          var processed = {};
          var gs, gt;
          var oneSet = function oneSet(c) {
            for (var i = 0; i < c.length; i++) {
              if (processed[c[i].id]) {
                continue;
              }
              processed[c[i].id] = true;
              gs = _this3.getGroupFor(c[i].source);
              gt = _this3.getGroupFor(c[i].target);
              if (c[i].source === group.el && gt === group || c[i].target === group.el && gs === group) {
                group.connections.internal.push(c[i]);
              } else if (gs === group) {
                if (gt !== group) {
                  group.connections.source.push(c[i]);
                } else {
                  group.connections.internal.push(c[i]);
                }
                _this3._connectionSourceMap[c[i].id] = group;
              } else if (gt === group) {
                group.connections.target.push(c[i]);
                _this3._connectionTargetMap[c[i].id] = group;
              }
            }
          };
          oneSet(c1);
          oneSet(c2);
        }
      }
    }, {
      key: "_collapseConnection",
      value: function _collapseConnection(conn, index, group) {
        var otherEl = conn.endpoints[index === 0 ? 1 : 0].element;
        if (otherEl._jsPlumbParentGroup && !otherEl._jsPlumbParentGroup.proxied && otherEl._jsPlumbParentGroup.collapsed) {
          return false;
        }
        var es = conn.endpoints[0].element,
            esg = es._jsPlumbParentGroup,
            esgcp = esg != null ? esg.collapseParent || esg : null,
            et = conn.endpoints[1].element,
            etg = et._jsPlumbParentGroup,
            etgcp = etg != null ? etg.collapseParent || etg : null;
        if (esgcp == null || etgcp == null || esgcp.id !== etgcp.id) {
          var groupEl = group.el;
              this.instance.getId(groupEl);
          this.instance.proxyConnection(conn, index, groupEl,
          function (conn, index) {
            return group.getEndpoint(conn, index);
          }, function (conn, index) {
            return group.getAnchor(conn, index);
          });
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "_expandConnection",
      value: function _expandConnection(c, index, group) {
        this.instance.unproxyConnection(c, index);
      }
    }, {
      key: "isElementDescendant",
      value: function isElementDescendant(el, parentEl) {
        var c = this.instance.getContainer();
        var abort = false;
        while (!abort) {
          if (el == null || el === c) {
            return false;
          } else {
            if (el === parentEl) {
              return true;
            } else {
              el = el.parentNode;
            }
          }
        }
      }
    }, {
      key: "collapseGroup",
      value: function collapseGroup(group) {
        var _this4 = this;
        var actualGroup = this.getGroup(group);
        if (actualGroup == null || actualGroup.collapsed) {
          return;
        }
        var groupEl = actualGroup.el;
        if (actualGroup.collapseParent == null) {
          this.instance.setGroupVisible(actualGroup, false);
          actualGroup.collapsed = true;
          this.instance.removeClass(groupEl, CLASS_GROUP_EXPANDED);
          this.instance.addClass(groupEl, CLASS_GROUP_COLLAPSED);
          if (actualGroup.proxied) {
            var collapsedConnectionIds = new Set();
            var _collapseSet = function _collapseSet(conns, index) {
              for (var i = 0; i < conns.length; i++) {
                var c = conns[i];
                if (_this4._collapseConnection(c, index, actualGroup) === true) {
                  collapsedConnectionIds.add(c.id);
                }
              }
            };
            _collapseSet(actualGroup.connections.source, 0);
            _collapseSet(actualGroup.connections.target, 1);
            forEach(actualGroup.getGroups(), function (cg) {
              _this4.cascadeCollapse(actualGroup, cg, collapsedConnectionIds);
            });
          }
          this.instance.revalidate(groupEl);
          this.repaintGroup(actualGroup);
          this.instance.fire(EVENT_GROUP_COLLAPSE, {
            group: actualGroup
          });
        } else {
          actualGroup.collapsed = true;
          this.instance.removeClass(groupEl, CLASS_GROUP_EXPANDED);
          this.instance.addClass(groupEl, CLASS_GROUP_COLLAPSED);
        }
      }
    }, {
      key: "cascadeCollapse",
      value: function cascadeCollapse(collapsedGroup, targetGroup, collapsedIds) {
        var _this5 = this;
        if (collapsedGroup.proxied) {
          var _collapseSet = function _collapseSet(conns, index) {
            for (var i = 0; i < conns.length; i++) {
              var c = conns[i];
              if (!collapsedIds.has(c.id)) {
                if (_this5._collapseConnection(c, index, collapsedGroup) === true) {
                  collapsedIds.add(c.id);
                }
              }
            }
          };
          _collapseSet(targetGroup.connections.source, 0);
          _collapseSet(targetGroup.connections.target, 1);
        }
        forEach(targetGroup.getGroups(), function (cg) {
          _this5.cascadeCollapse(collapsedGroup, cg, collapsedIds);
        });
      }
    }, {
      key: "expandGroup",
      value: function expandGroup(group, doNotFireEvent) {
        var _this6 = this;
        var actualGroup = this.getGroup(group);
        if (actualGroup == null) {
          return;
        }
        var groupEl = actualGroup.el;
        if (actualGroup.collapseParent == null) {
          this.instance.setGroupVisible(actualGroup, true);
          actualGroup.collapsed = false;
          this.instance.addClass(groupEl, CLASS_GROUP_EXPANDED);
          this.instance.removeClass(groupEl, CLASS_GROUP_COLLAPSED);
          if (actualGroup.proxied) {
            var _expandSet = function _expandSet(conns, index) {
              for (var i = 0; i < conns.length; i++) {
                var c = conns[i];
                _this6._expandConnection(c, index, actualGroup);
              }
            };
            _expandSet(actualGroup.connections.source, 0);
            _expandSet(actualGroup.connections.target, 1);
            var _expandNestedGroup = function _expandNestedGroup(group, ignoreCollapsedStateForNested) {
              if (ignoreCollapsedStateForNested || group.collapsed) {
                var _collapseSet = function _collapseSet(conns, index) {
                  for (var i = 0; i < conns.length; i++) {
                    var c = conns[i];
                    _this6._collapseConnection(c, index, group.collapseParent || group);
                  }
                };
                _collapseSet(group.connections.source, 0);
                _collapseSet(group.connections.target, 1);
                forEach(group.connections.internal, function (c) {
                  return c.setVisible(false);
                });
                forEach(group.getGroups(), function (g) {
                  return _expandNestedGroup(g, true);
                });
              } else {
                _this6.expandGroup(group, true);
              }
            };
            forEach(actualGroup.getGroups(), _expandNestedGroup);
          }
          this.instance.revalidate(groupEl);
          this.repaintGroup(actualGroup);
          if (!doNotFireEvent) {
            this.instance.fire(EVENT_GROUP_EXPAND, {
              group: actualGroup
            });
          }
        } else {
          actualGroup.collapsed = false;
          this.instance.addClass(groupEl, CLASS_GROUP_EXPANDED);
          this.instance.removeClass(groupEl, CLASS_GROUP_COLLAPSED);
        }
      }
    }, {
      key: "toggleGroup",
      value: function toggleGroup(group) {
        group = this.getGroup(group);
        if (group != null) {
          if (group.collapsed) {
            this.expandGroup(group);
          } else {
            this.collapseGroup(group);
          }
        }
      }
    }, {
      key: "repaintGroup",
      value: function repaintGroup(group) {
        var actualGroup = this.getGroup(group);
        var m = actualGroup.children;
        for (var i = 0; i < m.length; i++) {
          this.instance.revalidate(m[i].el);
        }
      }
    }, {
      key: "addToGroup",
      value: function addToGroup(group, doNotFireEvent) {
        var _this7 = this;
        var actualGroup = this.getGroup(group);
        if (actualGroup) {
          var groupEl = actualGroup.el;
          var _one = function _one(el) {
            var jel = el;
            var isGroup = jel._isJsPlumbGroup != null,
                droppingGroup = jel._jsPlumbGroup;
            var currentGroup = jel._jsPlumbParentGroup;
            if (currentGroup !== actualGroup) {
              var entry = _this7.instance.manage(el);
              var elpos = _this7.instance.getOffset(el);
              var cpos = actualGroup.collapsed ? _this7.instance.getOffsetRelativeToRoot(groupEl) : _this7.instance.getOffset(_this7.instance.getGroupContentArea(actualGroup));
              entry.group = actualGroup.elId;
              if (currentGroup != null) {
                currentGroup.remove(el, false, doNotFireEvent, false, actualGroup);
                _this7._updateConnectionsForGroup(currentGroup);
              }
              if (isGroup) {
                actualGroup.addGroup(droppingGroup);
              } else {
                actualGroup.add(el, doNotFireEvent);
              }
              var handleDroppedConnections = function handleDroppedConnections(list, index) {
                var oidx = index === 0 ? 1 : 0;
                list.each(function (c) {
                  c.setVisible(false);
                  if (c.endpoints[oidx].element._jsPlumbGroup === actualGroup) {
                    c.endpoints[oidx].setVisible(false);
                    _this7._expandConnection(c, oidx, actualGroup);
                  } else {
                    c.endpoints[index].setVisible(false);
                    _this7._collapseConnection(c, index, actualGroup);
                  }
                });
              };
              if (actualGroup.collapsed) {
                handleDroppedConnections(_this7.instance.select({
                  source: el
                }), 0);
                handleDroppedConnections(_this7.instance.select({
                  target: el
                }), 1);
              }
              _this7.instance.getId(el);
              var newPosition = {
                x: elpos.x - cpos.x,
                y: elpos.y - cpos.y
              };
              _this7.instance.setPosition(el, newPosition);
              _this7._updateConnectionsForGroup(actualGroup);
              _this7.instance.revalidate(el);
              if (!doNotFireEvent) {
                var p = {
                  group: actualGroup,
                  el: el,
                  pos: newPosition
                };
                if (currentGroup) {
                  p.sourceGroup = currentGroup;
                }
                _this7.instance.fire(EVENT_GROUP_MEMBER_ADDED, p);
              }
            }
          };
          for (var _len = arguments.length, el = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            el[_key - 2] = arguments[_key];
          }
          forEach(el, _one);
        }
      }
    }, {
      key: "removeFromGroup",
      value: function removeFromGroup(group, doNotFireEvent) {
        var _this8 = this;
        var actualGroup = this.getGroup(group);
        if (actualGroup) {
          var _one = function _one(_el) {
            if (actualGroup.collapsed) {
              var _expandSet = function _expandSet(conns, index) {
                for (var i = 0; i < conns.length; i++) {
                  var c = conns[i];
                  if (c.proxies) {
                    for (var j = 0; j < c.proxies.length; j++) {
                      if (c.proxies[j] != null) {
                        var proxiedElement = c.proxies[j].originalEp.element;
                        if (proxiedElement === _el || _this8.isElementDescendant(proxiedElement, _el)) {
                          _this8._expandConnection(c, index, actualGroup);
                        }
                      }
                    }
                  }
                }
              };
              _expandSet(actualGroup.connections.source.slice(), 0);
              _expandSet(actualGroup.connections.target.slice(), 1);
            }
            actualGroup.remove(_el, null, doNotFireEvent);
            var entry = _this8.instance.getManagedElements()[_this8.instance.getId(_el)];
            if (entry) {
              delete entry.group;
            }
          };
          for (var _len2 = arguments.length, el = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            el[_key2 - 2] = arguments[_key2];
          }
          forEach(el, _one);
        }
      }
    }, {
      key: "getAncestors",
      value: function getAncestors(group) {
        var ancestors = [];
        var p = group.group;
        while (p != null) {
          ancestors.push(p);
          p = p.group;
        }
        return ancestors;
      }
    }, {
      key: "isAncestor",
      value: function isAncestor(group, possibleAncestor) {
        if (group == null || possibleAncestor == null) {
          return false;
        }
        return this.getAncestors(group).indexOf(possibleAncestor) !== -1;
      }
    }, {
      key: "getDescendants",
      value: function getDescendants(group) {
        var d = [];
        var _one = function _one(g) {
          var childGroups = g.getGroups();
          d.push.apply(d, _toConsumableArray$1(childGroups));
          forEach(childGroups, _one);
        };
        _one(group);
        return d;
      }
    }, {
      key: "isDescendant",
      value: function isDescendant(possibleDescendant, ancestor) {
        if (possibleDescendant == null || ancestor == null) {
          return false;
        }
        return this.getDescendants(ancestor).indexOf(possibleDescendant) !== -1;
      }
    }, {
      key: "reset",
      value: function reset() {
        this._connectionSourceMap = {};
        this._connectionTargetMap = {};
        this.groupMap = {};
      }
    }]);
    return GroupManager;
  }();

  var SelectionBase = function () {
    function SelectionBase(instance, entries) {
      _classCallCheck$3(this, SelectionBase);
      this.instance = instance;
      this.entries = entries;
    }
    _createClass$3(SelectionBase, [{
      key: "length",
      get: function get() {
        return this.entries.length;
      }
    }, {
      key: "each",
      value: function each(handler) {
        forEach(this.entries, function (e) {
          return handler(e);
        });
        return this;
      }
    }, {
      key: "get",
      value: function get(index) {
        return this.entries[index];
      }
    }, {
      key: "addClass",
      value: function addClass(clazz, cascade) {
        this.each(function (c) {
          return c.addClass(clazz, cascade);
        });
        return this;
      }
    }, {
      key: "removeClass",
      value: function removeClass(clazz, cascade) {
        this.each(function (c) {
          return c.removeClass(clazz, cascade);
        });
        return this;
      }
    }, {
      key: "removeAllOverlays",
      value: function removeAllOverlays() {
        this.each(function (c) {
          return c.removeAllOverlays();
        });
        return this;
      }
    }, {
      key: "setLabel",
      value: function setLabel(label) {
        this.each(function (c) {
          return c.setLabel(label);
        });
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.entries.length = 0;
        return this;
      }
    }, {
      key: "map",
      value: function map(fn) {
        var a = [];
        this.each(function (e) {
          return a.push(fn(e));
        });
        return a;
      }
    }, {
      key: "addOverlay",
      value: function addOverlay(spec) {
        this.each(function (c) {
          return c.addOverlay(spec);
        });
        return this;
      }
    }, {
      key: "removeOverlay",
      value: function removeOverlay(id) {
        this.each(function (c) {
          return c.removeOverlay(id);
        });
        return this;
      }
    }, {
      key: "removeOverlays",
      value: function removeOverlays() {
        this.each(function (c) {
          return c.removeOverlays();
        });
        return this;
      }
    }, {
      key: "showOverlay",
      value: function showOverlay(id) {
        this.each(function (c) {
          return c.showOverlay(id);
        });
        return this;
      }
    }, {
      key: "hideOverlay",
      value: function hideOverlay(id) {
        this.each(function (c) {
          return c.hideOverlay(id);
        });
        return this;
      }
    }, {
      key: "setPaintStyle",
      value: function setPaintStyle(style) {
        this.each(function (c) {
          return c.setPaintStyle(style);
        });
        return this;
      }
    }, {
      key: "setHoverPaintStyle",
      value: function setHoverPaintStyle(style) {
        this.each(function (c) {
          return c.setHoverPaintStyle(style);
        });
        return this;
      }
    }, {
      key: "setSuspendEvents",
      value: function setSuspendEvents(suspend) {
        this.each(function (c) {
          return c.setSuspendEvents(suspend);
        });
        return this;
      }
    }, {
      key: "setParameter",
      value: function setParameter(name, value) {
        this.each(function (c) {
          return c.parameters[name] = value;
        });
        return this;
      }
    }, {
      key: "setParameters",
      value: function setParameters(p) {
        this.each(function (c) {
          return c.parameters = p;
        });
        return this;
      }
    }, {
      key: "setVisible",
      value: function setVisible(v) {
        this.each(function (c) {
          return c.setVisible(v);
        });
        return this;
      }
    }, {
      key: "addType",
      value: function addType(name) {
        this.each(function (c) {
          return c.addType(name);
        });
        return this;
      }
    }, {
      key: "toggleType",
      value: function toggleType(name) {
        this.each(function (c) {
          return c.toggleType(name);
        });
        return this;
      }
    }, {
      key: "removeType",
      value: function removeType(name) {
        this.each(function (c) {
          return c.removeType(name);
        });
        return this;
      }
    }, {
      key: "bind",
      value: function bind(evt, handler) {
        this.each(function (c) {
          return c.bind(evt, handler);
        });
        return this;
      }
    }, {
      key: "unbind",
      value: function unbind(evt, handler) {
        this.each(function (c) {
          return c.unbind(evt, handler);
        });
        return this;
      }
    }, {
      key: "setHover",
      value: function setHover(h) {
        var _this = this;
        this.each(function (c) {
          return _this.instance.setHover(c, h);
        });
        return this;
      }
    }]);
    return SelectionBase;
  }();

  var EndpointSelection = function (_SelectionBase) {
    _inherits$3(EndpointSelection, _SelectionBase);
    var _super = _createSuper$3(EndpointSelection);
    function EndpointSelection() {
      _classCallCheck$3(this, EndpointSelection);
      return _super.apply(this, arguments);
    }
    _createClass$3(EndpointSelection, [{
      key: "setEnabled",
      value: function setEnabled(e) {
        this.each(function (ep) {
          return ep.enabled = e;
        });
        return this;
      }
    }, {
      key: "setAnchor",
      value: function setAnchor(a) {
        this.each(function (ep) {
          return ep.setAnchor(a);
        });
        return this;
      }
    }, {
      key: "deleteEveryConnection",
      value: function deleteEveryConnection() {
        this.each(function (ep) {
          return ep.deleteEveryConnection();
        });
        return this;
      }
    }, {
      key: "deleteAll",
      value: function deleteAll() {
        var _this = this;
        this.each(function (ep) {
          return _this.instance.deleteEndpoint(ep);
        });
        this.clear();
        return this;
      }
    }]);
    return EndpointSelection;
  }(SelectionBase);

  var ConnectionSelection = function (_SelectionBase) {
    _inherits$3(ConnectionSelection, _SelectionBase);
    var _super = _createSuper$3(ConnectionSelection);
    function ConnectionSelection() {
      _classCallCheck$3(this, ConnectionSelection);
      return _super.apply(this, arguments);
    }
    _createClass$3(ConnectionSelection, [{
      key: "setDetachable",
      value: function setDetachable(d) {
        this.each(function (c) {
          return c.setDetachable(d);
        });
        return this;
      }
    }, {
      key: "setReattach",
      value: function setReattach(d) {
        this.each(function (c) {
          return c.setReattach(d);
        });
        return this;
      }
    }, {
      key: "setConnector",
      value: function setConnector(spec) {
        this.each(function (c) {
          return c._setConnector(spec);
        });
        return this;
      }
    }, {
      key: "deleteAll",
      value: function deleteAll() {
        var _this = this;
        this.each(function (c) {
          return _this.instance.deleteConnection(c);
        });
        this.clear();
      }
    }, {
      key: "repaint",
      value: function repaint() {
        var _this2 = this;
        this.each(function (c) {
          return _this2.instance._paintConnection(c);
        });
        return this;
      }
    }]);
    return ConnectionSelection;
  }(SelectionBase);

  var Transaction = function Transaction() {
    _classCallCheck$3(this, Transaction);
    _defineProperty$3(this, "affectedElements", new Set());
  };
  function EMPTY_POSITION() {
    return {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      r: 0,
      c: {
        x: 0,
        y: 0
      },
      x2: 0,
      y2: 0,
      t: {
        x: 0,
        y: 0,
        c: {
          x: 0,
          y: 0
        },
        w: 0,
        h: 0,
        r: 0,
        x2: 0,
        y2: 0,
        cr: 0,
        sr: 0
      },
      dirty: true
    };
  }
  function rotate(x, y, w, h, r) {
    var center = {
      x: x + w / 2,
      y: y + h / 2
    },
        cr = Math.cos(r / 360 * Math.PI * 2),
        sr = Math.sin(r / 360 * Math.PI * 2),
        _point = function _point(x, y) {
      return {
        x: center.x + Math.round((x - center.x) * cr - (y - center.y) * sr),
        y: center.y + Math.round((y - center.y) * cr - (x - center.x) * sr)
      };
    };
    var p1 = _point(x, y),
        p2 = _point(x + w, y),
        p3 = _point(x + w, y + h),
        p4 = _point(x, y + h),
        c = _point(x + w / 2, y + h / 2);
    var xmin = Math.min(p1.x, p2.x, p3.x, p4.x),
        xmax = Math.max(p1.x, p2.x, p3.x, p4.x),
        ymin = Math.min(p1.y, p2.y, p3.y, p4.y),
        ymax = Math.max(p1.y, p2.y, p3.y, p4.y);
    return {
      x: xmin,
      y: ymin,
      w: xmax - xmin,
      h: ymax - ymin,
      c: c,
      r: r,
      x2: xmax,
      y2: ymax,
      cr: cr,
      sr: sr
    };
  }
  var entryComparator = function entryComparator(value, arrayEntry) {
    var c = 0;
    if (arrayEntry[1] > value[1]) {
      c = -1;
    } else if (arrayEntry[1] < value[1]) {
      c = 1;
    }
    return c;
  };
  var reverseEntryComparator = function reverseEntryComparator(value, arrayEntry) {
    return entryComparator(value, arrayEntry) * -1;
  };
  function _updateElementIndex(id, value, array, sortDescending) {
    insertSorted([id, value], array, entryComparator, sortDescending);
  }
  function _clearElementIndex(id, array) {
    var idx = findWithFunction(array, function (entry) {
      return entry[0] === id;
    });
    if (idx > -1) {
      array.splice(idx, 1);
    }
  }
  var Viewport = function (_EventGenerator) {
    _inherits$3(Viewport, _EventGenerator);
    var _super = _createSuper$3(Viewport);
    function Viewport(instance) {
      var _this;
      _classCallCheck$3(this, Viewport);
      _this = _super.call(this);
      _this.instance = instance;
      _defineProperty$3(_assertThisInitialized$3(_this), "_currentTransaction", null);
      _defineProperty$3(_assertThisInitialized$3(_this), "_sortedElements", {
        xmin: [],
        xmax: [],
        ymin: [],
        ymax: []
      });
      _defineProperty$3(_assertThisInitialized$3(_this), "_elementMap", new Map());
      _defineProperty$3(_assertThisInitialized$3(_this), "_transformedElementMap", new Map());
      _defineProperty$3(_assertThisInitialized$3(_this), "_bounds", {
        minx: 0,
        maxx: 0,
        miny: 0,
        maxy: 0
      });
      return _this;
    }
    _createClass$3(Viewport, [{
      key: "_updateBounds",
      value: function _updateBounds(id, updatedElement, doNotRecalculateBounds) {
        if (updatedElement != null) {
          _clearElementIndex(id, this._sortedElements.xmin);
          _clearElementIndex(id, this._sortedElements.xmax);
          _clearElementIndex(id, this._sortedElements.ymin);
          _clearElementIndex(id, this._sortedElements.ymax);
          _updateElementIndex(id, updatedElement.t.x, this._sortedElements.xmin, false);
          _updateElementIndex(id, updatedElement.t.x + updatedElement.t.w, this._sortedElements.xmax, true);
          _updateElementIndex(id, updatedElement.t.y, this._sortedElements.ymin, false);
          _updateElementIndex(id, updatedElement.t.y + updatedElement.t.h, this._sortedElements.ymax, true);
          if (doNotRecalculateBounds !== true) {
            this._recalculateBounds();
          }
        }
      }
    }, {
      key: "_recalculateBounds",
      value: function _recalculateBounds() {
        this._bounds.minx = this._sortedElements.xmin.length > 0 ? this._sortedElements.xmin[0][1] : 0;
        this._bounds.maxx = this._sortedElements.xmax.length > 0 ? this._sortedElements.xmax[0][1] : 0;
        this._bounds.miny = this._sortedElements.ymin.length > 0 ? this._sortedElements.ymin[0][1] : 0;
        this._bounds.maxy = this._sortedElements.ymax.length > 0 ? this._sortedElements.ymax[0][1] : 0;
      }
    }, {
      key: "recomputeBounds",
      value: function recomputeBounds() {
        var _this2 = this;
        this._sortedElements.xmin.length = 0;
        this._sortedElements.xmax.length = 0;
        this._sortedElements.ymin.length = 0;
        this._sortedElements.ymax.length = 0;
        this._elementMap.forEach(function (vp, id) {
          _this2._sortedElements.xmin.push([id, vp.t.x]);
          _this2._sortedElements.xmax.push([id, vp.t.x + vp.t.w]);
          _this2._sortedElements.ymin.push([id, vp.t.y]);
          _this2._sortedElements.ymax.push([id, vp.t.y + vp.t.h]);
        });
        this._sortedElements.xmin.sort(entryComparator);
        this._sortedElements.ymin.sort(entryComparator);
        this._sortedElements.xmax.sort(reverseEntryComparator);
        this._sortedElements.ymax.sort(reverseEntryComparator);
        this._recalculateBounds();
      }
    }, {
      key: "_finaliseUpdate",
      value: function _finaliseUpdate(id, e, doNotRecalculateBounds) {
        e.t = rotate(e.x, e.y, e.w, e.h, e.r);
        this._transformedElementMap.set(id, e.t);
        if (doNotRecalculateBounds !== true) {
          this._updateBounds(id, e, doNotRecalculateBounds);
        }
      }
    }, {
      key: "shouldFireEvent",
      value: function shouldFireEvent(event, value, originalEvent) {
        return true;
      }
    }, {
      key: "startTransaction",
      value: function startTransaction() {
        if (this._currentTransaction != null) {
          throw new Error("Viewport: cannot start transaction; a transaction is currently active.");
        }
        this._currentTransaction = new Transaction();
      }
    }, {
      key: "endTransaction",
      value: function endTransaction() {
        var _this3 = this;
        if (this._currentTransaction != null) {
          this._currentTransaction.affectedElements.forEach(function (id) {
            var entry = _this3.getPosition(id);
            _this3._finaliseUpdate(id, entry, true);
          });
          this.recomputeBounds();
          this._currentTransaction = null;
        }
      }
    }, {
      key: "updateElements",
      value: function updateElements(entries) {
        var _this4 = this;
        forEach(entries, function (e) {
          return _this4.updateElement(e.id, e.x, e.y, e.width, e.height, e.rotation);
        });
      }
    }, {
      key: "updateElement",
      value: function updateElement(id, x, y, width, height, rotation, doNotRecalculateBounds) {
        var e = getsert(this._elementMap, id, EMPTY_POSITION);
        e.dirty = x == null && e.x == null || y == null && e.y == null || width == null && e.w == null || height == null && e.h == null;
        if (x != null) {
          e.x = x;
        }
        if (y != null) {
          e.y = y;
        }
        if (width != null) {
          e.w = width;
        }
        if (height != null) {
          e.h = height;
        }
        if (rotation != null) {
          e.r = rotation || 0;
        }
        e.c.x = e.x + e.w / 2;
        e.c.y = e.y + e.h / 2;
        e.x2 = e.x + e.w;
        e.y2 = e.y + e.h;
        if (this._currentTransaction == null) {
          this._finaliseUpdate(id, e, doNotRecalculateBounds);
        } else {
          this._currentTransaction.affectedElements.add(id);
        }
        return e;
      }
    }, {
      key: "refreshElement",
      value: function refreshElement(elId, doNotRecalculateBounds) {
        var me = this.instance.getManagedElements();
        var s = me[elId] ? me[elId].el : null;
        if (s != null) {
          var size = this.getSize(s);
          var offset = this.getOffset(s);
          return this.updateElement(elId, offset.x, offset.y, size.w, size.h, null, doNotRecalculateBounds);
        } else {
          return null;
        }
      }
    }, {
      key: "getSize",
      value: function getSize(el) {
        return this.instance.getSize(el);
      }
    }, {
      key: "getOffset",
      value: function getOffset(el) {
        return this.instance.getOffset(el);
      }
    }, {
      key: "registerElement",
      value: function registerElement(id, doNotRecalculateBounds) {
        return this.updateElement(id, 0, 0, 0, 0, 0, doNotRecalculateBounds);
      }
    }, {
      key: "addElement",
      value: function addElement(id, x, y, width, height, rotation) {
        return this.updateElement(id, x, y, width, height, rotation);
      }
    }, {
      key: "rotateElement",
      value: function rotateElement(id, rotation) {
        var e = getsert(this._elementMap, id, EMPTY_POSITION);
        e.r = rotation || 0;
        this._finaliseUpdate(id, e);
        return e;
      }
    }, {
      key: "getBoundsWidth",
      value: function getBoundsWidth() {
        return this._bounds.maxx - this._bounds.minx;
      }
    }, {
      key: "getBoundsHeight",
      value: function getBoundsHeight() {
        return this._bounds.maxy - this._bounds.miny;
      }
    }, {
      key: "getX",
      value: function getX() {
        return this._bounds.minx;
      }
    }, {
      key: "getY",
      value: function getY() {
        return this._bounds.miny;
      }
    }, {
      key: "setSize",
      value: function setSize(id, w, h) {
        if (this._elementMap.has(id)) {
          return this.updateElement(id, null, null, w, h, null);
        }
      }
    }, {
      key: "setPosition",
      value: function setPosition(id, x, y) {
        if (this._elementMap.has(id)) {
          return this.updateElement(id, x, y, null, null, null);
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this._sortedElements.xmin.length = 0;
        this._sortedElements.xmax.length = 0;
        this._sortedElements.ymin.length = 0;
        this._sortedElements.ymax.length = 0;
        this._elementMap.clear();
        this._transformedElementMap.clear();
        this._recalculateBounds();
      }
    }, {
      key: "remove",
      value: function remove(id) {
        _clearElementIndex(id, this._sortedElements.xmin);
        _clearElementIndex(id, this._sortedElements.xmax);
        _clearElementIndex(id, this._sortedElements.ymin);
        _clearElementIndex(id, this._sortedElements.ymax);
        this._elementMap["delete"](id);
        this._transformedElementMap["delete"](id);
        this._recalculateBounds();
      }
    }, {
      key: "getPosition",
      value: function getPosition(id) {
        return this._elementMap.get(id);
      }
    }, {
      key: "getElements",
      value: function getElements() {
        return this._elementMap;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this._elementMap.size === 0;
      }
    }]);
    return Viewport;
  }(EventGenerator);

  var _edgeSortFunctions;
  function _placeAnchorsOnLine(element, connections, horizontal, otherMultiplier, reverse) {
    var sizeInAxis = horizontal ? element.w : element.h;
    var sizeInOtherAxis = horizontal ? element.h : element.w;
    var a = [],
        step = sizeInAxis / (connections.length + 1);
    for (var i = 0; i < connections.length; i++) {
      var val = (i + 1) * step,
          other = otherMultiplier * sizeInOtherAxis;
      if (reverse) {
        val = sizeInAxis - val;
      }
      var dx = horizontal ? val : other,
          x = element.x + dx,
          xp = dx / element.w;
      var dy = horizontal ? other : val,
          y = element.y + dy,
          yp = dy / element.h;
      if (element.r !== 0 && element.r != null) {
        var rotated = rotatePoint({
          x: x,
          y: y
        }, element.c, element.r);
        x = rotated.x;
        y = rotated.y;
      }
      a.push({
        x: x,
        y: y,
        xLoc: xp,
        yLoc: yp,
        c: connections[i].c
      });
    }
    return a;
  }
  function _rightAndBottomSort(a, b) {
    return b.theta - a.theta;
  }
  function _leftAndTopSort(a, b) {
    var p1 = a.theta < 0 ? -Math.PI - a.theta : Math.PI - a.theta,
        p2 = b.theta < 0 ? -Math.PI - b.theta : Math.PI - b.theta;
    return p1 - p2;
  }
  var edgeSortFunctions = (_edgeSortFunctions = {}, _defineProperty$3(_edgeSortFunctions, TOP, _leftAndTopSort), _defineProperty$3(_edgeSortFunctions, RIGHT, _rightAndBottomSort), _defineProperty$3(_edgeSortFunctions, BOTTOM, _rightAndBottomSort), _defineProperty$3(_edgeSortFunctions, LEFT, _leftAndTopSort), _edgeSortFunctions);
  function isContinuous(a) {
    return a.isContinuous === true;
  }
  function _isFloating(a) {
    return a.isContinuous === true;
  }
  function isDynamic(a) {
    return a.locations.length > 1;
  }
  function getCurrentLocation(anchor) {
    return [anchor.currentLocation, anchor.locations[anchor.currentLocation]];
  }
  var LightweightRouter = function () {
    function LightweightRouter(instance) {
      var _this = this;
      _classCallCheck$3(this, LightweightRouter);
      this.instance = instance;
      _defineProperty$3(this, "anchorLists", new Map());
      _defineProperty$3(this, "anchorLocations", new Map());
      instance.bind(EVENT_INTERNAL_CONNECTION_DETACHED, function (p) {
        if (p.sourceEndpoint._anchor.isContinuous) {
          _this._removeEndpointFromAnchorLists(p.sourceEndpoint);
        }
        if (p.targetEndpoint._anchor.isContinuous) {
          _this._removeEndpointFromAnchorLists(p.targetEndpoint);
        }
      });
      instance.bind(EVENT_INTERNAL_ENDPOINT_UNREGISTERED, function (ep) {
        _this._removeEndpointFromAnchorLists(ep);
      });
    }
    _createClass$3(LightweightRouter, [{
      key: "getAnchorOrientation",
      value: function getAnchorOrientation(anchor) {
        var loc = this.anchorLocations.get(anchor.id);
        return loc ? [loc.ox, loc.oy] : [0, 0];
      }
    }, {
      key: "_distance",
      value: function _distance(anchor, cx, cy, xy, wh, rotation, targetRotation) {
        var ax = xy.x + anchor.x * wh.w,
            ay = xy.y + anchor.y * wh.h,
            acx = xy.x + wh.w / 2,
            acy = xy.y + wh.h / 2;
        if (rotation != null && rotation.length > 0) {
          var rotated = this.instance._applyRotations([ax, ay, 0, 0], rotation);
          ax = rotated.x;
          ay = rotated.y;
        }
        return Math.sqrt(Math.pow(cx - ax, 2) + Math.pow(cy - ay, 2)) + Math.sqrt(Math.pow(acx - ax, 2) + Math.pow(acy - ay, 2));
      }
    }, {
      key: "_anchorSelector",
      value: function _anchorSelector(xy, wh, txy, twh, rotation, targetRotation, locations) {
        var cx = txy.x + twh.w / 2,
            cy = txy.y + twh.h / 2;
        var minIdx = -1,
            minDist = Infinity;
        for (var i = 0; i < locations.length; i++) {
          var d = this._distance(locations[i], cx, cy, xy, wh, rotation, targetRotation);
          if (d < minDist) {
            minIdx = i + 0;
            minDist = d;
          }
        }
        return [minIdx, locations[minIdx]];
      }
    }, {
      key: "_floatingAnchorCompute",
      value: function _floatingAnchorCompute(anchor, params) {
        var xy = params.xy;
        var pos = {
          curX: xy.x + anchor.size.w / 2,
          curY: xy.y + anchor.size.h / 2,
          x: 0,
          y: 0,
          ox: 0,
          oy: 0
        };
        return this._setComputedPosition(anchor, pos);
      }
    }, {
      key: "_setComputedPosition",
      value: function _setComputedPosition(anchor, pos, timestamp) {
        this.anchorLocations.set(anchor.id, pos);
        anchor.computedPosition = pos;
        if (timestamp) {
          anchor.timestamp = timestamp;
        }
        return pos;
      }
    }, {
      key: "_computeSingleLocation",
      value: function _computeSingleLocation(loc, xy, wh, params) {
        var pos;
        var rotation = params.rotation;
        var candidate = {
          curX: xy.x + loc.x * wh.w + loc.offx,
          curY: xy.y + loc.y * wh.h + loc.offy,
          x: loc.x,
          y: loc.y,
          ox: 0,
          oy: 0
        };
        if (rotation != null && rotation.length > 0) {
          var o = [loc.iox, loc.ioy],
              current = {
            x: candidate.curX,
            y: candidate.curY,
            cr: 0,
            sr: 0
          };
          forEach(rotation, function (r) {
            current = rotatePoint(current, r.c, r.r);
            var _o = [Math.round(o[0] * current.cr - o[1] * current.sr), Math.round(o[1] * current.cr + o[0] * current.sr)];
            o = _o.slice();
          });
          loc.ox = o[0];
          loc.oy = o[1];
          pos = {
            curX: current.x,
            curY: current.y,
            x: loc.x,
            y: loc.y,
            ox: o[0],
            oy: o[1]
          };
        } else {
          loc.ox = loc.iox;
          loc.oy = loc.ioy;
          pos = extend({
            ox: loc.iox,
            oy: loc.ioy
          }, candidate);
        }
        return pos;
      }
    }, {
      key: "_singleAnchorCompute",
      value: function _singleAnchorCompute(anchor, params) {
        var xy = params.xy,
            wh = params.wh,
            timestamp = params.timestamp,
            pos = this.anchorLocations.get(anchor.id);
        if (pos != null && timestamp && timestamp === anchor.timestamp) {
          return pos;
        }
        var _getCurrentLocation = getCurrentLocation(anchor),
            _getCurrentLocation2 = _slicedToArray$1(_getCurrentLocation, 2);
            _getCurrentLocation2[0];
            var currentLoc = _getCurrentLocation2[1];
        pos = this._computeSingleLocation(currentLoc, xy, wh, params);
        return this._setComputedPosition(anchor, pos, timestamp);
      }
    }, {
      key: "_defaultAnchorCompute",
      value: function _defaultAnchorCompute(anchor, params) {
        var pos;
        if (anchor.locations.length === 1) {
          return this._singleAnchorCompute(anchor, params);
        }
        var xy = params.xy,
            wh = params.wh,
            txy = params.txy,
            twh = params.twh;
        var _getCurrentLocation3 = getCurrentLocation(anchor),
            _getCurrentLocation4 = _slicedToArray$1(_getCurrentLocation3, 2),
            currentIdx = _getCurrentLocation4[0],
            currentLoc = _getCurrentLocation4[1];
        if (anchor.locked || txy == null || twh == null) {
          pos = this._computeSingleLocation(currentLoc, xy, wh, params);
        } else {
          var _this$_anchorSelector = this._anchorSelector(xy, wh, txy, twh, params.rotation, params.tRotation, anchor.locations),
              _this$_anchorSelector2 = _slicedToArray$1(_this$_anchorSelector, 2),
              newIdx = _this$_anchorSelector2[0],
              newLoc = _this$_anchorSelector2[1];
          anchor.currentLocation = newIdx;
          if (newIdx !== currentIdx) {
            anchor.cssClass = newLoc.cls || anchor.cssClass;
            params.element._anchorLocationChanged(anchor);
          }
          pos = this._computeSingleLocation(newLoc, xy, wh, params);
        }
        return this._setComputedPosition(anchor, pos, params.timestamp);
      }
    }, {
      key: "_placeAnchors",
      value: function _placeAnchors(elementId, _anchorLists) {
        var _this2 = this;
        var cd = this.instance.viewport.getPosition(elementId),
            placeSomeAnchors = function placeSomeAnchors(desc, element, unsortedConnections, isHorizontal, otherMultiplier, orientation) {
          if (unsortedConnections.length > 0) {
            var sc = unsortedConnections.sort(edgeSortFunctions[desc]),
            reverse = desc === RIGHT || desc === TOP,
                anchors = _placeAnchorsOnLine(cd, sc, isHorizontal, otherMultiplier, reverse);
            for (var i = 0; i < anchors.length; i++) {
              var c = anchors[i].c,
                  weAreSource = c.endpoints[0].elementId === elementId,
                  ep = weAreSource ? c.endpoints[0] : c.endpoints[1];
              _this2._setComputedPosition(ep._anchor, {
                curX: anchors[i].x,
                curY: anchors[i].y,
                x: anchors[i].xLoc,
                y: anchors[i].yLoc,
                ox: orientation[0],
                oy: orientation[1]
              });
            }
          }
        };
        placeSomeAnchors(BOTTOM, cd, _anchorLists.bottom, true, 1, [0, 1]);
        placeSomeAnchors(TOP, cd, _anchorLists.top, true, 0, [0, -1]);
        placeSomeAnchors(LEFT, cd, _anchorLists.left, false, 0, [-1, 0]);
        placeSomeAnchors(RIGHT, cd, _anchorLists.right, false, 1, [1, 0]);
      }
    }, {
      key: "_updateAnchorList",
      value: function _updateAnchorList(lists, theta, order, conn, aBoolean, otherElId, idx, reverse, edgeId, connsToPaint, endpointsToPaint) {
        var endpoint = conn.endpoints[idx],
            endpointId = endpoint.id,
            oIdx = [1, 0][idx],
            values = {
          theta: theta,
          order: order,
          c: conn,
          b: aBoolean,
          elId: otherElId,
          epId: endpointId
        },
            listToAddTo = lists[edgeId],
            listToRemoveFrom = endpoint._continuousAnchorEdge ? lists[endpoint._continuousAnchorEdge] : null,
            candidate;
        if (listToRemoveFrom) {
          var rIdx = findWithFunction(listToRemoveFrom, function (e) {
            return e.epId === endpointId;
          });
          if (rIdx !== -1) {
            listToRemoveFrom.splice(rIdx, 1);
            for (var i = 0; i < listToRemoveFrom.length; i++) {
              candidate = listToRemoveFrom[i].c;
              if (candidate.placeholder !== true) {
                connsToPaint.add(candidate);
              }
              endpointsToPaint.add(listToRemoveFrom[i].c.endpoints[idx]);
              endpointsToPaint.add(listToRemoveFrom[i].c.endpoints[oIdx]);
            }
          }
        }
        for (var _i = 0; _i < listToAddTo.length; _i++) {
          candidate = listToAddTo[_i].c;
          if (candidate.placeholder !== true) {
            connsToPaint.add(candidate);
          }
          endpointsToPaint.add(listToAddTo[_i].c.endpoints[idx]);
          endpointsToPaint.add(listToAddTo[_i].c.endpoints[oIdx]);
        }
        {
          var insertIdx = reverse ? 0 : listToAddTo.length;
          listToAddTo.splice(insertIdx, 0, values);
        }
        endpoint._continuousAnchorEdge = edgeId;
      }
    }, {
      key: "_removeEndpointFromAnchorLists",
      value: function _removeEndpointFromAnchorLists(endpoint) {
        var listsForElement = this.anchorLists.get(endpoint.elementId);
        var total = 0;
        (function (list, eId) {
          if (list) {
            var f = function f(e) {
              return e.epId === eId;
            };
            removeWithFunction(list.top, f);
            removeWithFunction(list.left, f);
            removeWithFunction(list.bottom, f);
            removeWithFunction(list.right, f);
            total += list.top.length;
            total += list.left.length;
            total += list.bottom.length;
            total += list.right.length;
          }
        })(listsForElement, endpoint.id);
        if (total === 0) {
          this.anchorLists["delete"](endpoint.elementId);
        }
        this.anchorLocations["delete"](endpoint._anchor.id);
      }
    }, {
      key: "computeAnchorLocation",
      value: function computeAnchorLocation(anchor, params) {
        var pos;
        if (isContinuous(anchor)) {
          pos = this.anchorLocations.get(anchor.id) || {
            curX: 0,
            curY: 0,
            x: 0,
            y: 0,
            ox: 0,
            oy: 0
          };
        } else if (_isFloating(anchor)) {
          pos = this._floatingAnchorCompute(anchor, params);
        } else {
          pos = this._defaultAnchorCompute(anchor, params);
        }
        anchor.timestamp = params.timestamp;
        return pos;
      }
    }, {
      key: "computePath",
      value: function computePath(connection, timestamp) {
        var sourceInfo = this.instance.viewport.getPosition(connection.sourceId),
            targetInfo = this.instance.viewport.getPosition(connection.targetId),
            sE = connection.endpoints[0],
            tE = connection.endpoints[1];
        var sAnchorP = this.getEndpointLocation(sE, {
          xy: sourceInfo,
          wh: sourceInfo,
          element: sE,
          timestamp: timestamp,
          rotation: this.instance._getRotations(connection.sourceId)
        }),
            tAnchorP = this.getEndpointLocation(tE, {
          xy: targetInfo,
          wh: targetInfo,
          element: tE,
          timestamp: timestamp,
          rotation: this.instance._getRotations(connection.targetId)
        });
        connection.connector.resetBounds();
        connection.connector.compute({
          sourcePos: sAnchorP,
          targetPos: tAnchorP,
          sourceEndpoint: connection.endpoints[0],
          targetEndpoint: connection.endpoints[1],
          strokeWidth: connection.paintStyleInUse.strokeWidth,
          sourceInfo: sourceInfo,
          targetInfo: targetInfo
        });
      }
    }, {
      key: "getEndpointLocation",
      value: function getEndpointLocation(endpoint, params) {
        params = params || {};
        var anchor = endpoint._anchor;
        var pos = this.anchorLocations.get(anchor.id);
        if (pos == null || params.timestamp != null && anchor.timestamp !== params.timestamp) {
          pos = this.computeAnchorLocation(anchor, params);
          this._setComputedPosition(anchor, pos, params.timestamp);
        }
        return pos;
      }
    }, {
      key: "getEndpointOrientation",
      value: function getEndpointOrientation(ep) {
        return ep._anchor ? this.getAnchorOrientation(ep._anchor) : [0, 0];
      }
    }, {
      key: "setAnchorOrientation",
      value: function setAnchorOrientation(anchor, orientation) {
        var anchorLoc = this.anchorLocations.get(anchor.id);
        if (anchorLoc != null) {
          anchorLoc.ox = orientation[0];
          anchorLoc.oy = orientation[1];
        }
      }
    }, {
      key: "isDynamicAnchor",
      value: function isDynamicAnchor(ep) {
        return ep._anchor ? !isContinuous(ep._anchor) && ep._anchor.locations.length > 1 : false;
      }
    }, {
      key: "isFloating",
      value: function isFloating(ep) {
        return ep._anchor ? _isFloating(ep._anchor) : false;
      }
    }, {
      key: "prepareAnchor",
      value: function prepareAnchor(params) {
        return makeLightweightAnchorFromSpec(params);
      }
    }, {
      key: "redraw",
      value: function redraw(elementId, timestamp, offsetToUI) {
        var _this3 = this;
        var connectionsToPaint = new Set(),
            endpointsToPaint = new Set(),
            anchorsToUpdate = new Set();
        if (!this.instance._suspendDrawing) {
          var ep = this.instance.endpointsByElement[elementId] || [];
          timestamp = timestamp || uuid();
          var orientationCache = {},
              a,
              anEndpoint;
          for (var i = 0; i < ep.length; i++) {
            anEndpoint = ep[i];
            endpointsToPaint.add(anEndpoint);
            a = anEndpoint._anchor;
            if (anEndpoint.connections.length === 0) {
              if (isContinuous(a)) {
                if (!this.anchorLists.has(elementId)) {
                  this.anchorLists.set(elementId, {
                    top: [],
                    right: [],
                    bottom: [],
                    left: []
                  });
                }
                this._updateAnchorList(this.anchorLists.get(elementId), -Math.PI / 2, 0, {
                  endpoints: [anEndpoint, anEndpoint],
                  placeholder: true
                }, false, elementId, 0, false, getDefaultFace(a), connectionsToPaint, endpointsToPaint);
                anchorsToUpdate.add(elementId);
              }
            } else {
              for (var _i2 = 0; _i2 < anEndpoint.connections.length; _i2++) {
                var conn = anEndpoint.connections[_i2],
                    sourceId = conn.sourceId,
                    targetId = conn.targetId,
                    sourceContinuous = isContinuous(conn.endpoints[0]._anchor),
                    targetContinuous = isContinuous(conn.endpoints[1]._anchor);
                if (sourceContinuous || targetContinuous) {
                  var c1 = (conn.endpoints[0]._anchor.faces || []).join("-"),
                      c2 = (conn.endpoints[1]._anchor.faces || []).join("-"),
                      oKey = [sourceId, c1, targetId, c2].join("-"),
                      o = orientationCache[oKey],
                      oIdx = conn.sourceId === elementId ? 1 : 0;
                  if (sourceContinuous && !this.anchorLists.has(sourceId)) {
                    this.anchorLists.set(sourceId, {
                      top: [],
                      right: [],
                      bottom: [],
                      left: []
                    });
                  }
                  if (targetContinuous && !this.anchorLists.has(targetId)) {
                    this.anchorLists.set(targetId, {
                      top: [],
                      right: [],
                      bottom: [],
                      left: []
                    });
                  }
                  var td = this.instance.viewport.getPosition(targetId),
                      sd = this.instance.viewport.getPosition(sourceId);
                  if (targetId === sourceId && (sourceContinuous || targetContinuous)) {
                    this._updateAnchorList(this.anchorLists.get(sourceId), -Math.PI / 2, 0, conn, false, targetId, 0, false, TOP, connectionsToPaint, endpointsToPaint);
                    this._updateAnchorList(this.anchorLists.get(targetId), -Math.PI / 2, 0, conn, false, sourceId, 1, false, TOP, connectionsToPaint, endpointsToPaint);
                  } else {
                    var sourceRotation = this.instance._getRotations(sourceId);
                    var targetRotation = this.instance._getRotations(targetId);
                    if (!o) {
                      o = this._calculateOrientation(sourceId, targetId, sd, td, conn.endpoints[0]._anchor, conn.endpoints[1]._anchor, sourceRotation, targetRotation);
                      orientationCache[oKey] = o;
                    }
                    if (sourceContinuous) {
                      this._updateAnchorList(this.anchorLists.get(sourceId), o.theta, 0, conn, false, targetId, 0, false, o.a[0], connectionsToPaint, endpointsToPaint);
                    }
                    if (targetContinuous) {
                      this._updateAnchorList(this.anchorLists.get(targetId), o.theta2, -1, conn, true, sourceId, 1, true, o.a[1], connectionsToPaint, endpointsToPaint);
                    }
                  }
                  if (sourceContinuous) {
                    anchorsToUpdate.add(sourceId);
                  }
                  if (targetContinuous) {
                    anchorsToUpdate.add(targetId);
                  }
                  connectionsToPaint.add(conn);
                  if (sourceContinuous && oIdx === 0 || targetContinuous && oIdx === 1) {
                    endpointsToPaint.add(conn.endpoints[oIdx]);
                  }
                } else {
                  var otherEndpoint = anEndpoint.connections[_i2].endpoints[conn.sourceId === elementId ? 1 : 0],
                      otherAnchor = otherEndpoint._anchor;
                  if (isDynamic(otherAnchor)) {
                    this.instance._paintEndpoint(otherEndpoint, {
                      elementWithPrecedence: elementId,
                      timestamp: timestamp
                    });
                    connectionsToPaint.add(anEndpoint.connections[_i2]);
                    for (var k = 0; k < otherEndpoint.connections.length; k++) {
                      if (otherEndpoint.connections[k] !== anEndpoint.connections[_i2]) {
                        connectionsToPaint.add(otherEndpoint.connections[k]);
                      }
                    }
                  } else {
                    connectionsToPaint.add(anEndpoint.connections[_i2]);
                  }
                }
              }
            }
          }
          anchorsToUpdate.forEach(function (anchor) {
            _this3._placeAnchors(anchor, _this3.anchorLists.get(anchor));
          });
          endpointsToPaint.forEach(function (ep) {
            var cd = _this3.instance.viewport.getPosition(ep.elementId);
            _this3.instance._paintEndpoint(ep, {
              timestamp: timestamp,
              offset: cd
            });
          });
          connectionsToPaint.forEach(function (c) {
            _this3.instance._paintConnection(c, {
              timestamp: timestamp
            });
          });
        }
        return {
          c: connectionsToPaint,
          e: endpointsToPaint
        };
      }
    }, {
      key: "reset",
      value: function reset() {
        this.anchorLocations.clear();
        this.anchorLists.clear();
      }
    }, {
      key: "setAnchor",
      value: function setAnchor(endpoint, anchor) {
        if (anchor != null) {
          endpoint._anchor = anchor;
        }
      }
    }, {
      key: "setConnectionAnchors",
      value: function setConnectionAnchors(conn, anchors) {
        conn.endpoints[0]._anchor = anchors[0];
        conn.endpoints[1]._anchor = anchors[1];
      }
    }, {
      key: "_calculateOrientation",
      value: function _calculateOrientation(sourceId, targetId, sd, td, sourceAnchor, targetAnchor, sourceRotation, targetRotation) {
        var _this4 = this;
        var Orientation = {
          HORIZONTAL: "horizontal",
          VERTICAL: "vertical",
          DIAGONAL: "diagonal",
          IDENTITY: "identity"
        };
        if (sourceId === targetId) {
          return {
            orientation: Orientation.IDENTITY,
            a: [TOP, TOP]
          };
        }
        var theta = Math.atan2(td.c.y - sd.c.y, td.c.x - sd.c.x),
            theta2 = Math.atan2(sd.c.y - td.c.y, sd.c.x - td.c.x);
        var candidates = [],
            midpoints = {};
        (function (types, dim) {
          for (var i = 0; i < types.length; i++) {
            var _midpoints$types$i;
            midpoints[types[i]] = (_midpoints$types$i = {}, _defineProperty$3(_midpoints$types$i, LEFT, {
              x: dim[i][0].x,
              y: dim[i][0].c.y
            }), _defineProperty$3(_midpoints$types$i, RIGHT, {
              x: dim[i][0].x + dim[i][0].w,
              y: dim[i][0].c.y
            }), _defineProperty$3(_midpoints$types$i, TOP, {
              x: dim[i][0].c.x,
              y: dim[i][0].y
            }), _defineProperty$3(_midpoints$types$i, BOTTOM, {
              x: dim[i][0].c.x,
              y: dim[i][0].y + dim[i][0].h
            }), _midpoints$types$i);
            if (dim[i][1] != null && dim[i][1].length > 0) {
              for (var axis in midpoints[types[i]]) {
                midpoints[types[i]][axis] = _this4.instance._applyRotationsXY(midpoints[types[i]][axis], dim[i][1]);
              }
            }
          }
        })([SOURCE, TARGET], [[sd, sourceRotation], [td, targetRotation]]);
        var FACES = [TOP, LEFT, RIGHT, BOTTOM];
        for (var sf = 0; sf < FACES.length; sf++) {
          for (var tf = 0; tf < FACES.length; tf++) {
            candidates.push({
              source: FACES[sf],
              target: FACES[tf],
              dist: lineLength(midpoints.source[FACES[sf]], midpoints.target[FACES[tf]])
            });
          }
        }
        candidates.sort(function (a, b) {
          if (a.dist < b.dist) {
            return -1;
          } else if (b.dist < a.dist) {
            return 1;
          } else {
            var _axisIndices;
            var axisIndices = (_axisIndices = {}, _defineProperty$3(_axisIndices, LEFT, 0), _defineProperty$3(_axisIndices, TOP, 1), _defineProperty$3(_axisIndices, RIGHT, 2), _defineProperty$3(_axisIndices, BOTTOM, 3), _axisIndices),
                ais = axisIndices[a.source],
                bis = axisIndices[b.source],
                ait = axisIndices[a.target],
                bit = axisIndices[b.target];
            return ais < bis ? -1 : bis < ais ? 1 : ait < bit ? -1 : bit < ait ? 1 : 0;
          }
        });
        var sourceEdge = candidates[0].source,
            targetEdge = candidates[0].target;
        for (var i = 0; i < candidates.length; i++) {
          if (isContinuous(sourceAnchor) && sourceAnchor.locked) {
            sourceEdge = sourceAnchor.currentFace;
          } else if (!sourceAnchor.isContinuous || isEdgeSupported(sourceAnchor, candidates[i].source)) {
            sourceEdge = candidates[i].source;
          } else {
            sourceEdge = null;
          }
          if (targetAnchor.isContinuous && targetAnchor.locked) {
            targetEdge = targetAnchor.currentFace;
          } else if (!targetAnchor.isContinuous || isEdgeSupported(targetAnchor, candidates[i].target)) {
            targetEdge = candidates[i].target;
          } else {
            targetEdge = null;
          }
          if (sourceEdge != null && targetEdge != null) {
            break;
          }
        }
        if (sourceAnchor.isContinuous) {
          this.setCurrentFace(sourceAnchor, sourceEdge);
        }
        if (targetAnchor.isContinuous) {
          this.setCurrentFace(targetAnchor, targetEdge);
        }
        return {
          a: [sourceEdge, targetEdge],
          theta: theta,
          theta2: theta2
        };
      }
    }, {
      key: "setCurrentFace",
      value: function setCurrentFace(a, face, overrideLock) {
        a.currentFace = face;
        if (overrideLock && a.lockedFace != null) {
          a.lockedFace = a.currentFace;
        }
      }
    }, {
      key: "lock",
      value: function lock(a) {
        a.locked = true;
        if (isContinuous(a)) {
          a.lockedFace = a.currentFace;
        }
      }
    }, {
      key: "unlock",
      value: function unlock(a) {
        a.locked = false;
        if (isContinuous(a)) {
          a.lockedFace = null;
        }
      }
    }, {
      key: "selectAnchorLocation",
      value: function selectAnchorLocation(a, coords) {
        var idx = findWithFunction(a.locations, function (loc) {
          return loc.x === coords.x && loc.y === coords.y;
        });
        if (idx !== -1) {
          a.currentLocation = idx;
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "lockCurrentAxis",
      value: function lockCurrentAxis(a) {
        if (a.currentFace != null) {
          a.lockedAxis = a.currentFace === LEFT || a.currentFace === RIGHT ? X_AXIS_FACES : Y_AXIS_FACES;
        }
      }
    }, {
      key: "unlockCurrentAxis",
      value: function unlockCurrentAxis(a) {
        a.lockedAxis = null;
      }
    }, {
      key: "anchorsEqual",
      value: function anchorsEqual(a1, a2) {
        if (!a1 || !a2) {
          return false;
        }
        var l1 = a1.locations[a1.currentLocation],
            l2 = a2.locations[a2.currentLocation];
        return l1.x === l2.x && l1.y === l2.y && l1.offx === l2.offx && l1.offy === l2.offy && l1.ox === l2.ox && l1.oy === l2.oy;
      }
    }]);
    return LightweightRouter;
  }();

  var ConnectionDragSelector = function () {
    function ConnectionDragSelector(selector, def) {
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      _classCallCheck$3(this, ConnectionDragSelector);
      this.selector = selector;
      this.def = def;
      this.exclude = exclude;
      _defineProperty$3(this, "id", void 0);
      _defineProperty$3(this, "redrop", void 0);
      this.id = uuid();
      this.redrop = def.def.redrop || REDROP_POLICY_STRICT;
    }
    _createClass$3(ConnectionDragSelector, [{
      key: "setEnabled",
      value: function setEnabled(enabled) {
        this.def.enabled = enabled;
      }
    }, {
      key: "isEnabled",
      value: function isEnabled() {
        return this.def.enabled !== false;
      }
    }]);
    return ConnectionDragSelector;
  }();
  var REDROP_POLICY_STRICT = "strict";
  var REDROP_POLICY_ANY = "any";
  var REDROP_POLICY_ANY_SOURCE = "anySource";
  var REDROP_POLICY_ANY_TARGET = "anyTarget";
  var REDROP_POLICY_ANY_SOURCE_OR_TARGET = "anySourceOrTarget";

  function _scopeMatch(e1, e2) {
    var s1 = e1.scope.split(/\s/),
        s2 = e2.scope.split(/\s/);
    for (var i = 0; i < s1.length; i++) {
      for (var j = 0; j < s2.length; j++) {
        if (s2[j] === s1[i]) {
          return true;
        }
      }
    }
    return false;
  }
  function prepareList(instance, input, doNotGetIds) {
    var r = [];
    var _resolveId = function _resolveId(i) {
      if (isString(i)) {
        return i;
      } else {
        return instance.getId(i);
      }
    };
    if (input) {
      if (typeof input === 'string') {
        if (input === "*") {
          return input;
        }
        r.push(input);
      } else {
        if (doNotGetIds) {
          r = input;
        } else {
          if (input.length != null) {
            var _r;
            (_r = r).push.apply(_r, _toConsumableArray$1(_toConsumableArray$1(input).map(_resolveId)));
          } else {
            r.push(_resolveId(input));
          }
        }
      }
    }
    return r;
  }
  function addManagedEndpoint(managedElement, ep) {
    if (managedElement != null) {
      managedElement.endpoints.push(ep);
    }
  }
  function removeManagedEndpoint(managedElement, endpoint) {
    if (managedElement != null) {
      removeWithFunction(managedElement.endpoints, function (ep) {
        return ep === endpoint;
      });
    }
  }
  function addManagedConnection(connection, sourceEl, targetEl) {
    if (sourceEl != null) {
      sourceEl.connections.push(connection);
      if (sourceEl.connections.length === 1) {
        connection.instance.addClass(connection.source, connection.instance.connectedClass);
      }
    }
    if (targetEl != null) {
      if (sourceEl == null || connection.sourceId !== connection.targetId) {
        targetEl.connections.push(connection);
        if (targetEl.connections.length === 1) {
          connection.instance.addClass(connection.target, connection.instance.connectedClass);
        }
      }
    }
  }
  function removeManagedConnection(connection, sourceEl, targetEl) {
    if (sourceEl != null) {
      var sourceCount = sourceEl.connections.length;
      removeWithFunction(sourceEl.connections, function (_c) {
        return connection.id === _c.id;
      });
      if (sourceCount > 0 && sourceEl.connections.length === 0) {
        connection.instance.removeClass(connection.source, connection.instance.connectedClass);
      }
    }
    if (targetEl != null) {
      var targetCount = targetEl.connections.length;
      if (sourceEl == null || connection.sourceId !== connection.targetId) {
        removeWithFunction(targetEl.connections, function (_c) {
          return connection.id === _c.id;
        });
      }
      if (targetCount > 0 && targetEl.connections.length === 0) {
        connection.instance.removeClass(connection.target, connection.instance.connectedClass);
      }
    }
  }
  var JsPlumbInstance = function (_EventGenerator) {
    _inherits$3(JsPlumbInstance, _EventGenerator);
    var _super = _createSuper$3(JsPlumbInstance);
    function JsPlumbInstance(_instanceIndex, defaults) {
      var _this;
      _classCallCheck$3(this, JsPlumbInstance);
      _this = _super.call(this);
      _this._instanceIndex = _instanceIndex;
      _defineProperty$3(_assertThisInitialized$3(_this), "defaults", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_initialDefaults", {});
      _defineProperty$3(_assertThisInitialized$3(_this), "isConnectionBeingDragged", false);
      _defineProperty$3(_assertThisInitialized$3(_this), "currentlyDragging", false);
      _defineProperty$3(_assertThisInitialized$3(_this), "hoverSuspended", false);
      _defineProperty$3(_assertThisInitialized$3(_this), "_suspendDrawing", false);
      _defineProperty$3(_assertThisInitialized$3(_this), "_suspendedAt", null);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectorClass", CLASS_CONNECTOR);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectorOutlineClass", CLASS_CONNECTOR_OUTLINE);
      _defineProperty$3(_assertThisInitialized$3(_this), "connectedClass", CLASS_CONNECTED);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointClass", CLASS_ENDPOINT);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointConnectedClass", CLASS_ENDPOINT_CONNECTED);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointFullClass", CLASS_ENDPOINT_FULL);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointFloatingClass", CLASS_ENDPOINT_FLOATING);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointDropAllowedClass", CLASS_ENDPOINT_DROP_ALLOWED);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointDropForbiddenClass", CLASS_ENDPOINT_DROP_FORBIDDEN);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointAnchorClassPrefix", CLASS_ENDPOINT_ANCHOR_PREFIX);
      _defineProperty$3(_assertThisInitialized$3(_this), "overlayClass", CLASS_OVERLAY);
      _defineProperty$3(_assertThisInitialized$3(_this), "connections", []);
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointsByElement", {});
      _defineProperty$3(_assertThisInitialized$3(_this), "endpointsByUUID", new Map());
      _defineProperty$3(_assertThisInitialized$3(_this), "sourceSelectors", []);
      _defineProperty$3(_assertThisInitialized$3(_this), "targetSelectors", []);
      _defineProperty$3(_assertThisInitialized$3(_this), "allowNestedGroups", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_curIdStamp", 1);
      _defineProperty$3(_assertThisInitialized$3(_this), "viewport", new Viewport(_assertThisInitialized$3(_this)));
      _defineProperty$3(_assertThisInitialized$3(_this), "router", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "groupManager", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_connectionTypes", new Map());
      _defineProperty$3(_assertThisInitialized$3(_this), "_endpointTypes", new Map());
      _defineProperty$3(_assertThisInitialized$3(_this), "_container", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_managedElements", {});
      _defineProperty$3(_assertThisInitialized$3(_this), "DEFAULT_SCOPE", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "_zoom", 1);
      _this.defaults = {
        anchor: exports.AnchorLocations.Bottom,
        anchors: [null, null],
        connectionsDetachable: true,
        connectionOverlays: [],
        connector: StraightConnector.type,
        container: null,
        endpoint: DotEndpoint.type,
        endpointOverlays: [],
        endpoints: [null, null],
        endpointStyle: {
          fill: "#456"
        },
        endpointStyles: [null, null],
        endpointHoverStyle: null,
        endpointHoverStyles: [null, null],
        hoverPaintStyle: null,
        listStyle: {},
        maxConnections: 1,
        paintStyle: {
          strokeWidth: 2,
          stroke: "#456"
        },
        reattachConnections: false,
        scope: "jsplumb_defaultscope",
        allowNestedGroups: true
      };
      if (defaults) {
        extend(_this.defaults, defaults);
      }
      extend(_this._initialDefaults, _this.defaults);
      if (_this._initialDefaults[DEFAULT_KEY_PAINT_STYLE] != null) {
        _this._initialDefaults[DEFAULT_KEY_PAINT_STYLE].strokeWidth = _this._initialDefaults[DEFAULT_KEY_PAINT_STYLE].strokeWidth || 2;
      }
      _this.DEFAULT_SCOPE = _this.defaults[DEFAULT_KEY_SCOPE];
      _this.allowNestedGroups = _this._initialDefaults[DEFAULT_KEY_ALLOW_NESTED_GROUPS] !== false;
      _this.router = new LightweightRouter(_assertThisInitialized$3(_this));
      _this.groupManager = new GroupManager(_assertThisInitialized$3(_this));
      _this.setContainer(_this._initialDefaults.container);
      return _this;
    }
    _createClass$3(JsPlumbInstance, [{
      key: "defaultScope",
      get: function get() {
        return this.DEFAULT_SCOPE;
      }
    }, {
      key: "currentZoom",
      get: function get() {
        return this._zoom;
      }
    }, {
      key: "areDefaultAnchorsSet",
      value: function areDefaultAnchorsSet() {
        return this.validAnchorsSpec(this.defaults.anchors);
      }
    }, {
      key: "validAnchorsSpec",
      value: function validAnchorsSpec(anchors) {
        return anchors != null && anchors[0] != null && anchors[1] != null;
      }
    }, {
      key: "getContainer",
      value: function getContainer() {
        return this._container;
      }
    }, {
      key: "setZoom",
      value: function setZoom(z, repaintEverything) {
        this._zoom = z;
        this.fire(EVENT_ZOOM, this._zoom);
        if (repaintEverything) {
          this.repaintEverything();
        }
        return true;
      }
    }, {
      key: "_idstamp",
      value: function _idstamp() {
        return "" + this._curIdStamp++;
      }
    }, {
      key: "checkCondition",
      value: function checkCondition(conditionName, args) {
        var l = this.getListener(conditionName),
            r = true;
        if (l && l.length > 0) {
          var values = Array.prototype.slice.call(arguments, 1);
          try {
            for (var i = 0, j = l.length; i < j; i++) {
              r = r && l[i].apply(l[i], values);
            }
          } catch (e) {
            log("cannot check condition [" + conditionName + "]" + e);
          }
        }
        return r;
      }
    }, {
      key: "getId",
      value: function getId(element, uuid) {
        if (element == null) {
          return null;
        }
        var id = this.getAttribute(element, ATTRIBUTE_MANAGED);
        if (!id || id === "undefined") {
          if (arguments.length === 2 && arguments[1] !== undefined) {
            id = uuid;
          } else if (arguments.length === 1 || arguments.length === 3 && !arguments[2]) {
            id = "jsplumb-" + this._instanceIndex + "-" + this._idstamp();
          }
          this.setAttribute(element, ATTRIBUTE_MANAGED, id);
        }
        return id;
      }
    }, {
      key: "getConnections",
      value: function getConnections(options, flat) {
        if (!options) {
          options = {};
        } else if (options.constructor === String) {
          options = {
            "scope": options
          };
        }
        var scope = options.scope || this.defaultScope,
            scopes = prepareList(this, scope, true),
            sources = prepareList(this, options.source),
            targets = prepareList(this, options.target),
            results = !flat && scopes.length > 1 ? {} : [],
            _addOne = function _addOne(scope, obj) {
          if (!flat && scopes.length > 1) {
            var ss = results[scope];
            if (ss == null) {
              ss = results[scope] = [];
            }
            ss.push(obj);
          } else {
            results.push(obj);
          }
        };
        for (var j = 0, jj = this.connections.length; j < jj; j++) {
          var _c2 = this.connections[j],
              sourceId = _c2.proxies && _c2.proxies[0] ? _c2.proxies[0].originalEp.elementId : _c2.sourceId,
              targetId = _c2.proxies && _c2.proxies[1] ? _c2.proxies[1].originalEp.elementId : _c2.targetId;
          if (filterList(scopes, _c2.scope) && filterList(sources, sourceId) && filterList(targets, targetId)) {
            _addOne(_c2.scope, _c2);
          }
        }
        return results;
      }
    }, {
      key: "select",
      value: function select(params) {
        params = params || {};
        params.scope = params.scope || "*";
        return new ConnectionSelection(this, params.connections || this.getConnections(params, true));
      }
    }, {
      key: "selectEndpoints",
      value: function selectEndpoints(params) {
        params = params || {};
        params.scope = params.scope || WILDCARD;
        var noElementFilters = !params.element && !params.source && !params.target,
            elements = noElementFilters ? WILDCARD : prepareList(this, params.element),
            sources = noElementFilters ? WILDCARD : prepareList(this, params.source),
            targets = noElementFilters ? WILDCARD : prepareList(this, params.target),
            scopes = prepareList(this, params.scope, true);
        var ep = [];
        for (var _el2 in this.endpointsByElement) {
          var either = filterList(elements, _el2, true),
              source = filterList(sources, _el2, true),
              sourceMatchExact = sources !== "*",
              target = filterList(targets, _el2, true),
              targetMatchExact = targets !== "*";
          if (either || source || target) {
            inner: for (var i = 0, ii = this.endpointsByElement[_el2].length; i < ii; i++) {
              var _ep = this.endpointsByElement[_el2][i];
              if (filterList(scopes, _ep.scope, true)) {
                var noMatchSource = sourceMatchExact && sources.length > 0 && !_ep.isSource,
                    noMatchTarget = targetMatchExact && targets.length > 0 && !_ep.isTarget;
                if (noMatchSource || noMatchTarget) {
                  continue inner;
                }
                ep.push(_ep);
              }
            }
          }
        }
        return new EndpointSelection(this, ep);
      }
    }, {
      key: "setContainer",
      value: function setContainer(c) {
        this._container = c;
        this.fire(EVENT_CONTAINER_CHANGE, this._container);
      }
    }, {
      key: "_set",
      value: function _set(c, el, idx) {
        var stTypes = [{
          el: "source",
          elId: "sourceId"
        }, {
          el: "target",
          elId: "targetId"
        }];
        var ep,
            _st = stTypes[idx],
            cId = c[_st.elId],
            sid,
            oldEndpoint = c.endpoints[idx];
        var evtParams = {
          index: idx,
          originalEndpoint: oldEndpoint,
          originalSourceId: idx === 0 ? cId : c.sourceId,
          newSourceId: c.sourceId,
          originalTargetId: idx === 1 ? cId : c.targetId,
          newTargetId: c.targetId,
          connection: c,
          newEndpoint: oldEndpoint
        };
        if (el instanceof Endpoint) {
          ep = el;
          ep.addConnection(c);
        } else {
          sid = this.getId(el);
          if (sid === c[_st.elId]) {
            ep = null;
          } else {
            ep = c.makeEndpoint(idx === 0, el, sid);
          }
        }
        if (ep != null) {
          evtParams.newEndpoint = ep;
          oldEndpoint.detachFromConnection(c);
          c.endpoints[idx] = ep;
          c[_st.el] = ep.element;
          c[_st.elId] = ep.elementId;
          evtParams[idx === 0 ? "newSourceId" : "newTargetId"] = ep.elementId;
          this.fireMoveEvent(evtParams);
          this._paintConnection(c);
        }
        return evtParams;
      }
    }, {
      key: "setSource",
      value: function setSource(connection, el) {
        removeManagedConnection(connection, this._managedElements[connection.sourceId]);
        var p = this._set(connection, el, 0);
        addManagedConnection(connection, this._managedElements[p.newSourceId]);
      }
    }, {
      key: "setTarget",
      value: function setTarget(connection, el) {
        removeManagedConnection(connection, this._managedElements[connection.targetId]);
        var p = this._set(connection, el, 1);
        addManagedConnection(connection, this._managedElements[p.newTargetId]);
      }
    }, {
      key: "setConnectionType",
      value: function setConnectionType(connection, type, params) {
        connection.setType(type, params);
        this._paintConnection(connection);
      }
    }, {
      key: "isHoverSuspended",
      value: function isHoverSuspended() {
        return this.hoverSuspended;
      }
    }, {
      key: "setSuspendDrawing",
      value: function setSuspendDrawing(val, repaintAfterwards) {
        var curVal = this._suspendDrawing;
        this._suspendDrawing = val;
        if (val) {
          this._suspendedAt = "" + new Date().getTime();
        } else {
          this._suspendedAt = null;
          this.viewport.recomputeBounds();
        }
        if (repaintAfterwards) {
          this.repaintEverything();
        }
        return curVal;
      }
    }, {
      key: "getSuspendedAt",
      value: function getSuspendedAt() {
        return this._suspendedAt;
      }
    }, {
      key: "batch",
      value: function batch(fn, doNotRepaintAfterwards) {
        var _wasSuspended = this._suspendDrawing === true;
        if (!_wasSuspended) {
          this.setSuspendDrawing(true);
        }
        fn();
        if (!_wasSuspended) {
          this.setSuspendDrawing(false, !doNotRepaintAfterwards);
        }
      }
    }, {
      key: "each",
      value: function each(spec, fn) {
        if (spec == null) {
          return;
        }
        if (spec.length != null) {
          for (var i = 0; i < spec.length; i++) {
            fn(spec[i]);
          }
        } else {
          fn(spec);
        }
        return this;
      }
    }, {
      key: "updateOffset",
      value: function updateOffset(params) {
        var elId = params.elId;
        if (params.recalc) {
          return this.viewport.refreshElement(elId);
        } else {
          return this.viewport.getPosition(elId);
        }
      }
    }, {
      key: "deleteConnection",
      value: function deleteConnection(connection, params) {
        if (connection != null && connection.deleted !== true) {
          params = params || {};
          if (params.force || functionChain(true, false, [[connection.endpoints[0], IS_DETACH_ALLOWED, [connection]], [connection.endpoints[1], IS_DETACH_ALLOWED, [connection]], [connection, IS_DETACH_ALLOWED, [connection]], [this, CHECK_CONDITION, [INTERCEPT_BEFORE_DETACH, connection]]])) {
            removeManagedConnection(connection, this._managedElements[connection.sourceId], this._managedElements[connection.targetId]);
            this.fireDetachEvent(connection, !connection.pending && params.fireEvent !== false, params.originalEvent);
            var _sourceEndpoint = connection.endpoints[0];
            var targetEndpoint = connection.endpoints[1];
            if (_sourceEndpoint !== params.endpointToIgnore) {
              _sourceEndpoint.detachFromConnection(connection, null, true);
            }
            if (targetEndpoint !== params.endpointToIgnore) {
              targetEndpoint.detachFromConnection(connection, null, true);
            }
            removeWithFunction(this.connections, function (_c) {
              return connection.id === _c.id;
            });
            connection.destroy();
            if (_sourceEndpoint !== params.endpointToIgnore && _sourceEndpoint.deleteOnEmpty && _sourceEndpoint.connections.length === 0) {
              this.deleteEndpoint(_sourceEndpoint);
            }
            if (targetEndpoint !== params.endpointToIgnore && targetEndpoint.deleteOnEmpty && targetEndpoint.connections.length === 0) {
              this.deleteEndpoint(targetEndpoint);
            }
            return true;
          }
        }
        return false;
      }
    }, {
      key: "deleteEveryConnection",
      value: function deleteEveryConnection(params) {
        var _this2 = this;
        params = params || {};
        var count = this.connections.length,
            deletedCount = 0;
        this.batch(function () {
          for (var i = 0; i < count; i++) {
            deletedCount += _this2.deleteConnection(_this2.connections[0], params) ? 1 : 0;
          }
        });
        return deletedCount;
      }
    }, {
      key: "deleteConnectionsForElement",
      value: function deleteConnectionsForElement(el, params) {
        var id = this.getId(el),
            m = this._managedElements[id];
        if (m) {
          var l = m.connections.length;
          for (var i = 0; i < l; i++) {
            this.deleteConnection(m.connections[0], params);
          }
        }
        return this;
      }
    }, {
      key: "fireDetachEvent",
      value: function fireDetachEvent(jpc, doFireEvent, originalEvent) {
        var argIsConnection = jpc.id != null,
            params = argIsConnection ? {
          connection: jpc,
          source: jpc.source,
          target: jpc.target,
          sourceId: jpc.sourceId,
          targetId: jpc.targetId,
          sourceEndpoint: jpc.endpoints[0],
          targetEndpoint: jpc.endpoints[1]
        } : jpc;
        if (doFireEvent) {
          this.fire(EVENT_CONNECTION_DETACHED, params, originalEvent);
        }
        this.fire(EVENT_INTERNAL_CONNECTION_DETACHED, params, originalEvent);
      }
    }, {
      key: "fireMoveEvent",
      value: function fireMoveEvent(params, evt) {
        this.fire(EVENT_CONNECTION_MOVED, params, evt);
      }
    }, {
      key: "manageAll",
      value: function manageAll(elements, recalc) {
        var nl = isString(elements) ? this.getSelector(this.getContainer(), elements) : elements;
        for (var i = 0; i < nl.length; i++) {
          this.manage(nl[i], null, recalc);
        }
      }
    }, {
      key: "manage",
      value: function manage(element, internalId, _recalc) {
        if (this.getAttribute(element, ATTRIBUTE_MANAGED) == null) {
          internalId = internalId || this.getAttribute(element, "id") || uuid();
          this.setAttribute(element, ATTRIBUTE_MANAGED, internalId);
        }
        var elId = this.getId(element);
        if (!this._managedElements[elId]) {
          var obj = {
            el: element,
            endpoints: [],
            connections: [],
            rotation: 0,
            data: {}
          };
          this._managedElements[elId] = obj;
          if (this._suspendDrawing) {
            obj.viewportElement = this.viewport.registerElement(elId, true);
          } else {
            obj.viewportElement = this.updateOffset({
              elId: elId,
              recalc: true
            });
          }
          this.fire(EVENT_MANAGE_ELEMENT, {
            el: element
          });
        } else {
          if (_recalc) {
            this._managedElements[elId].viewportElement = this.updateOffset({
              elId: elId,
              timestamp: null,
              recalc: true
            });
          }
        }
        return this._managedElements[elId];
      }
    }, {
      key: "getManagedData",
      value: function getManagedData(elementId, dataIdentifier, key) {
        if (this._managedElements[elementId]) {
          var data = this._managedElements[elementId].data[dataIdentifier];
          return data != null ? data[key] : null;
        }
      }
    }, {
      key: "setManagedData",
      value: function setManagedData(elementId, dataIdentifier, key, data) {
        if (this._managedElements[elementId]) {
          this._managedElements[elementId].data[dataIdentifier] = this._managedElements[elementId].data[dataIdentifier] || {};
          this._managedElements[elementId].data[dataIdentifier][key] = data;
        }
      }
    }, {
      key: "getManagedElement",
      value: function getManagedElement(id) {
        return this._managedElements[id] ? this._managedElements[id].el : null;
      }
    }, {
      key: "unmanage",
      value: function unmanage(el, removeElement) {
        var _this3 = this;
        this.removeAllEndpoints(el, true);
        var _one = function _one(_el) {
          var id = _this3.getId(_el);
          _this3.removeAttribute(_el, ATTRIBUTE_MANAGED);
          delete _this3._managedElements[id];
          _this3.viewport.remove(id);
          _this3.fire(EVENT_UNMANAGE_ELEMENT, {
            el: _el,
            id: id
          });
          if (_el && removeElement) {
            _this3._removeElement(_el);
          }
        };
        this._getAssociatedElements(el).map(_one);
        _one(el);
      }
    }, {
      key: "rotate",
      value: function rotate(element, rotation, _doNotRepaint) {
        var elementId = this.getId(element);
        if (this._managedElements[elementId]) {
          this._managedElements[elementId].rotation = rotation;
          this.viewport.rotateElement(elementId, rotation);
          if (_doNotRepaint !== true) {
            return this.revalidate(element);
          }
        }
        return {
          c: new Set(),
          e: new Set()
        };
      }
    }, {
      key: "_getRotation",
      value: function _getRotation(elementId) {
        var entry = this._managedElements[elementId];
        if (entry != null) {
          return entry.rotation || 0;
        } else {
          return 0;
        }
      }
    }, {
      key: "_getRotations",
      value: function _getRotations(elementId) {
        var _this4 = this;
        var rotations = [];
        var entry = this._managedElements[elementId];
        var _oneLevel = function _oneLevel(e) {
          if (e.group != null) {
            var gEntry = _this4._managedElements[e.group];
            if (gEntry != null) {
              rotations.push({
                r: gEntry.viewportElement.r,
                c: gEntry.viewportElement.c
              });
              _oneLevel(gEntry);
            }
          }
        };
        if (entry != null) {
          rotations.push({
            r: entry.viewportElement.r || 0,
            c: entry.viewportElement.c
          });
          _oneLevel(entry);
        }
        return rotations;
      }
    }, {
      key: "_applyRotations",
      value: function _applyRotations(point, rotations) {
        var sl = point.slice();
        var current = {
          x: sl[0],
          y: sl[1],
          cr: 0,
          sr: 0
        };
        forEach(rotations, function (rotation) {
          current = rotatePoint(current, rotation.c, rotation.r);
        });
        return current;
      }
    }, {
      key: "_applyRotationsXY",
      value: function _applyRotationsXY(point, rotations) {
        forEach(rotations, function (rotation) {
          point = rotatePoint(point, rotation.c, rotation.r);
        });
        return point;
      }
    }, {
      key: "_internal_newEndpoint",
      value: function _internal_newEndpoint(params) {
        var _p = extend({}, params);
        var managedElement = this.manage(_p.element);
        _p.elementId = this.getId(_p.element);
        _p.id = "ep_" + this._idstamp();
        var ep = new Endpoint(this, _p);
        addManagedEndpoint(managedElement, ep);
        if (params.uuid) {
          this.endpointsByUUID.set(params.uuid, ep);
        }
        addToDictionary(this.endpointsByElement, ep.elementId, ep);
        if (!this._suspendDrawing) {
          this._paintEndpoint(ep, {
            timestamp: this._suspendedAt
          });
        }
        return ep;
      }
    }, {
      key: "_deriveEndpointAndAnchorSpec",
      value: function _deriveEndpointAndAnchorSpec(type, dontPrependDefault) {
        var bits = ((dontPrependDefault ? "" : "default ") + type).split(/[\s]/),
            eps = null,
            ep = null,
            a = null,
            as = null;
        for (var i = 0; i < bits.length; i++) {
          var _t = this.getConnectionType(bits[i]);
          if (_t) {
            if (_t.endpoints) {
              eps = _t.endpoints;
            }
            if (_t.endpoint) {
              ep = _t.endpoint;
            }
            if (_t.anchors) {
              as = _t.anchors;
            }
            if (_t.anchor) {
              a = _t.anchor;
            }
          }
        }
        return {
          endpoints: eps ? eps : [ep, ep],
          anchors: as ? as : [a, a]
        };
      }
    }, {
      key: "revalidate",
      value: function revalidate(el, timestamp) {
        var elId = this.getId(el);
        this.updateOffset({
          elId: elId,
          recalc: true,
          timestamp: timestamp
        });
        return this.repaint(el);
      }
    }, {
      key: "repaintEverything",
      value: function repaintEverything() {
        var timestamp = uuid(),
            elId;
        for (elId in this._managedElements) {
          this.viewport.refreshElement(elId, true);
        }
        this.viewport.recomputeBounds();
        for (elId in this._managedElements) {
          this.repaint(this._managedElements[elId].el, timestamp, true);
        }
        return this;
      }
    }, {
      key: "setElementPosition",
      value: function setElementPosition(el, x, y) {
        var id = this.getId(el);
        this.viewport.setPosition(id, x, y);
        return this.repaint(el);
      }
    }, {
      key: "repaint",
      value: function repaint(el, timestamp, offsetsWereJustCalculated) {
        var r = {
          c: new Set(),
          e: new Set()
        };
        var _mergeRedraw = function _mergeRedraw(r2) {
          r2.c.forEach(function (c) {
            return r.c.add(c);
          });
          r2.e.forEach(function (e) {
            return r.e.add(e);
          });
        };
        if (!this._suspendDrawing) {
          var id = this.getId(el);
          if (el != null) {
            var repaintEls = this._getAssociatedElements(el);
            if (timestamp == null) {
              timestamp = uuid();
            }
            if (!offsetsWereJustCalculated) {
              for (var i = 0; i < repaintEls.length; i++) {
                this.updateOffset({
                  elId: this.getId(repaintEls[i]),
                  recalc: true,
                  timestamp: timestamp
                });
              }
            }
            _mergeRedraw(this.router.redraw(id, timestamp, null));
            if (repaintEls.length > 0) {
              for (var j = 0; j < repaintEls.length; j++) {
                _mergeRedraw(this.router.redraw(this.getId(repaintEls[j]), timestamp, null));
              }
            }
          }
        }
        return r;
      }
    }, {
      key: "unregisterEndpoint",
      value: function unregisterEndpoint(endpoint) {
        var uuid = endpoint.getUuid();
        if (uuid) {
          this.endpointsByUUID["delete"](uuid);
        }
        removeManagedEndpoint(this._managedElements[endpoint.elementId], endpoint);
        var ebe = this.endpointsByElement[endpoint.elementId];
        if (ebe != null) {
          if (ebe.length > 1) {
            this.endpointsByElement[endpoint.elementId] = ebe.filter(function (e) {
              return e !== endpoint;
            });
          } else {
            delete this.endpointsByElement[endpoint.elementId];
          }
        }
        this.fire(EVENT_INTERNAL_ENDPOINT_UNREGISTERED, endpoint);
      }
    }, {
      key: "_maybePruneEndpoint",
      value: function _maybePruneEndpoint(endpoint) {
        if (endpoint.deleteOnEmpty && endpoint.connections.length === 0) {
          this.deleteEndpoint(endpoint);
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "deleteEndpoint",
      value: function deleteEndpoint(object) {
        var _this5 = this;
        var endpoint = typeof object === "string" ? this.endpointsByUUID.get(object) : object;
        if (endpoint) {
          var proxy = endpoint.proxiedBy;
          var connectionsToDelete = endpoint.connections.slice();
          forEach(connectionsToDelete, function (connection) {
            endpoint.detachFromConnection(connection, null, true);
          });
          this.unregisterEndpoint(endpoint);
          endpoint.destroy();
          forEach(connectionsToDelete, function (connection) {
            _this5.deleteConnection(connection, {
              force: true,
              endpointToIgnore: endpoint
            });
          });
          if (proxy != null) {
            this.deleteEndpoint(proxy);
          }
        }
        return this;
      }
    }, {
      key: "addEndpoint",
      value: function addEndpoint(el, params, referenceParams) {
        referenceParams = referenceParams || {};
        var p = extend({}, referenceParams);
        extend(p, params || {});
        var _p = extend({
          element: el
        }, p);
        return this._internal_newEndpoint(_p);
      }
    }, {
      key: "addEndpoints",
      value: function addEndpoints(el, endpoints, referenceParams) {
        var results = [];
        for (var i = 0, j = endpoints.length; i < j; i++) {
          results.push(this.addEndpoint(el, endpoints[i], referenceParams));
        }
        return results;
      }
    }, {
      key: "reset",
      value: function reset() {
        var _this6 = this;
        this.silently(function () {
          _this6.endpointsByElement = {};
          _this6._managedElements = {};
          _this6.endpointsByUUID.clear();
          _this6.viewport.reset();
          _this6.router.reset();
          _this6.groupManager.reset();
          _this6.connections.length = 0;
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.reset();
        this.unbind();
        this.sourceSelectors.length = 0;
        this.targetSelectors.length = 0;
        this._connectionTypes.clear();
        this._endpointTypes.clear();
      }
    }, {
      key: "getEndpoints",
      value: function getEndpoints(el) {
        return this.endpointsByElement[this.getId(el)] || [];
      }
    }, {
      key: "getEndpoint",
      value: function getEndpoint(uuid) {
        return this.endpointsByUUID.get(uuid);
      }
    }, {
      key: "setEndpointUuid",
      value: function setEndpointUuid(endpoint, uuid) {
        if (endpoint.uuid) {
          this.endpointsByUUID["delete"](endpoint.uuid);
        }
        endpoint.uuid = uuid;
        this.endpointsByUUID.set(uuid, endpoint);
      }
    }, {
      key: "connect",
      value: function connect(params, referenceParams) {
        try {
          var _p = this._prepareConnectionParams(params, referenceParams),
              jpc = this._newConnection(_p);
          this._finaliseConnection(jpc, _p);
          return jpc;
        } catch (errorMessage) {
          log(errorMessage);
          return;
        }
      }
    }, {
      key: "_prepareConnectionParams",
      value: function _prepareConnectionParams(params, referenceParams) {
        var temp = extend({}, params);
        if (referenceParams) {
          extend(temp, referenceParams);
        }
        var _p = temp;
        if (_p.source) {
          if (_p.source.endpoint) {
            _p.sourceEndpoint = _p.source;
          }
        }
        if (_p.target) {
          if (_p.target.endpoint) {
            _p.targetEndpoint = _p.target;
          }
        }
        if (params.uuids) {
          _p.sourceEndpoint = this.getEndpoint(params.uuids[0]);
          _p.targetEndpoint = this.getEndpoint(params.uuids[1]);
        }
        if (_p.sourceEndpoint != null) {
          if (_p.sourceEndpoint.isFull()) {
            throw ERROR_SOURCE_ENDPOINT_FULL;
          }
          if (!_p.type) {
            _p.type = _p.sourceEndpoint.edgeType;
          }
          if (_p.sourceEndpoint.connectorOverlays) {
            _p.overlays = _p.overlays || [];
            for (var i = 0, j = _p.sourceEndpoint.connectorOverlays.length; i < j; i++) {
              _p.overlays.push(_p.sourceEndpoint.connectorOverlays[i]);
            }
          }
          if (_p.sourceEndpoint.scope) {
            _p.scope = _p.sourceEndpoint.scope;
          }
        } else {
          if (_p.source == null) {
            throw ERROR_SOURCE_DOES_NOT_EXIST;
          }
        }
        if (_p.targetEndpoint != null) {
          if (_p.targetEndpoint.isFull()) {
            throw ERROR_TARGET_ENDPOINT_FULL;
          }
        } else {
          if (_p.target == null) {
            throw ERROR_TARGET_DOES_NOT_EXIST;
          }
        }
        if (_p.sourceEndpoint && _p.targetEndpoint) {
          if (!_scopeMatch(_p.sourceEndpoint, _p.targetEndpoint)) {
            throw "Cannot establish connection: scopes do not match";
          }
        }
        return _p;
      }
    }, {
      key: "_newConnection",
      value: function _newConnection(params) {
        params.id = "con_" + this._idstamp();
        var c = new Connection(this, params);
        addManagedConnection(c, this._managedElements[c.sourceId], this._managedElements[c.targetId]);
        this._paintConnection(c);
        return c;
      }
    }, {
      key: "_finaliseConnection",
      value: function _finaliseConnection(jpc, params, originalEvent) {
        params = params || {};
        if (!jpc.suspendedEndpoint) {
          this.connections.push(jpc);
        }
        jpc.pending = null;
        jpc.endpoints[0].isTemporarySource = false;
        this.repaint(jpc.source);
        var payload = {
          connection: jpc,
          source: jpc.source,
          target: jpc.target,
          sourceId: jpc.sourceId,
          targetId: jpc.targetId,
          sourceEndpoint: jpc.endpoints[0],
          targetEndpoint: jpc.endpoints[1]
        };
        this.fire(EVENT_INTERNAL_CONNECTION, payload, originalEvent);
        if (!params.doNotFireConnectionEvent && params.fireEvent !== false) {
          this.fire(EVENT_CONNECTION, payload, originalEvent);
        }
      }
    }, {
      key: "removeAllEndpoints",
      value: function removeAllEndpoints(el, recurse) {
        var _this7 = this;
        var _one = function _one(_el) {
          var id = _this7.getId(_el),
              ebe = _this7.endpointsByElement[id],
              i,
              ii;
          if (ebe) {
            for (i = 0, ii = ebe.length; i < ii; i++) {
              _this7.deleteEndpoint(ebe[i]);
            }
          }
          delete _this7.endpointsByElement[id];
        };
        if (recurse) {
          this._getAssociatedElements(el).map(_one);
        }
        _one(el);
        return this;
      }
    }, {
      key: "_createSourceDefinition",
      value: function _createSourceDefinition(params, referenceParams) {
        var p = extend({}, referenceParams);
        extend(p, params);
        p.edgeType = p.edgeType || DEFAULT;
        var aae = this._deriveEndpointAndAnchorSpec(p.edgeType);
        p.endpoint = p.endpoint || aae.endpoints[0];
        p.anchor = p.anchor || aae.anchors[0];
        var maxConnections = p.maxConnections || -1;
        var _def = {
          def: extend({}, p),
          uniqueEndpoint: p.uniqueEndpoint,
          maxConnections: maxConnections,
          enabled: true,
          endpoint: null
        };
        return _def;
      }
    }, {
      key: "addSourceSelector",
      value: function addSourceSelector(selector, params) {
        var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _def = this._createSourceDefinition(params);
        var sel = new ConnectionDragSelector(selector, _def, exclude);
        this.sourceSelectors.push(sel);
        return sel;
      }
    }, {
      key: "removeSourceSelector",
      value: function removeSourceSelector(selector) {
        removeWithFunction(this.sourceSelectors, function (s) {
          return s === selector;
        });
      }
    }, {
      key: "removeTargetSelector",
      value: function removeTargetSelector(selector) {
        removeWithFunction(this.targetSelectors, function (s) {
          return s === selector;
        });
      }
    }, {
      key: "addTargetSelector",
      value: function addTargetSelector(selector, params) {
        var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _def = this._createTargetDefinition(params);
        var sel = new ConnectionDragSelector(selector, _def, exclude);
        this.targetSelectors.push(sel);
        return sel;
      }
    }, {
      key: "_createTargetDefinition",
      value: function _createTargetDefinition(params, referenceParams) {
        var p = extend({}, referenceParams);
        extend(p, params);
        p.edgeType = p.edgeType || DEFAULT;
        var maxConnections = p.maxConnections || -1;
        var _def = {
          def: extend({}, p),
          uniqueEndpoint: p.uniqueEndpoint,
          maxConnections: maxConnections,
          enabled: true,
          endpoint: null
        };
        return _def;
      }
    }, {
      key: "show",
      value: function show(el, changeEndpoints) {
        return this._setVisible(el, BLOCK, changeEndpoints);
      }
    }, {
      key: "hide",
      value: function hide(el, changeEndpoints) {
        return this._setVisible(el, NONE, changeEndpoints);
      }
    }, {
      key: "_setVisible",
      value: function _setVisible(el, state, alsoChangeEndpoints) {
        var visible = state === BLOCK;
        var endpointFunc = null;
        if (alsoChangeEndpoints) {
          endpointFunc = function endpointFunc(ep) {
            ep.setVisible(visible, true, true);
          };
        }
        var id = this.getId(el);
        this._operation(el, function (jpc) {
          if (visible && alsoChangeEndpoints) {
            var oidx = jpc.sourceId === id ? 1 : 0;
            if (jpc.endpoints[oidx].isVisible()) {
              jpc.setVisible(true);
            }
          } else {
            jpc.setVisible(visible);
          }
        }, endpointFunc);
        return this;
      }
    }, {
      key: "toggleVisible",
      value: function toggleVisible(el, changeEndpoints) {
        var endpointFunc = null;
        if (changeEndpoints) {
          endpointFunc = function endpointFunc(ep) {
            var state = ep.isVisible();
            ep.setVisible(!state);
          };
        }
        this._operation(el, function (jpc) {
          var state = jpc.isVisible();
          jpc.setVisible(!state);
        }, endpointFunc);
      }
    }, {
      key: "_operation",
      value: function _operation(el, func, endpointFunc) {
        var elId = this.getId(el);
        var endpoints = this.endpointsByElement[elId];
        if (endpoints && endpoints.length) {
          for (var i = 0, ii = endpoints.length; i < ii; i++) {
            for (var j = 0, jj = endpoints[i].connections.length; j < jj; j++) {
              var retVal = func(endpoints[i].connections[j]);
              if (retVal) {
                return;
              }
            }
            if (endpointFunc) {
              endpointFunc(endpoints[i]);
            }
          }
        }
      }
    }, {
      key: "registerConnectionType",
      value: function registerConnectionType(id, type) {
        this._connectionTypes.set(id, extend({}, type));
        if (type.overlays) {
          var to = {};
          for (var i = 0; i < type.overlays.length; i++) {
            var fo = convertToFullOverlaySpec(type.overlays[i]);
            to[fo.options.id] = fo;
          }
          this._connectionTypes.get(id).overlays = to;
        }
      }
    }, {
      key: "registerConnectionTypes",
      value: function registerConnectionTypes(types) {
        for (var i in types) {
          this.registerConnectionType(i, types[i]);
        }
      }
    }, {
      key: "registerEndpointType",
      value: function registerEndpointType(id, type) {
        this._endpointTypes.set(id, extend({}, type));
        if (type.overlays) {
          var to = {};
          for (var i = 0; i < type.overlays.length; i++) {
            var fo = convertToFullOverlaySpec(type.overlays[i]);
            to[fo.options.id] = fo;
          }
          this._endpointTypes.get(id).overlays = to;
        }
      }
    }, {
      key: "registerEndpointTypes",
      value: function registerEndpointTypes(types) {
        for (var i in types) {
          this.registerEndpointType(i, types[i]);
        }
      }
    }, {
      key: "getType",
      value: function getType(id, typeDescriptor) {
        return typeDescriptor === "connection" ? this.getConnectionType(id) : this.getEndpointType(id);
      }
    }, {
      key: "getConnectionType",
      value: function getConnectionType(id) {
        return this._connectionTypes.get(id);
      }
    }, {
      key: "getEndpointType",
      value: function getEndpointType(id) {
        return this._endpointTypes.get(id);
      }
    }, {
      key: "importDefaults",
      value: function importDefaults(d) {
        for (var i in d) {
          this.defaults[i] = d[i];
        }
        if (this.defaults[DEFAULT_KEY_PAINT_STYLE] != null) {
          this.defaults[DEFAULT_KEY_PAINT_STYLE].strokeWidth = this.defaults[DEFAULT_KEY_PAINT_STYLE].strokeWidth || 2;
        }
        if (d.container) {
          this.setContainer(d.container);
        }
        return this;
      }
    }, {
      key: "restoreDefaults",
      value: function restoreDefaults() {
        this.defaults = extend({}, this._initialDefaults);
        return this;
      }
    }, {
      key: "getManagedElements",
      value: function getManagedElements() {
        return this._managedElements;
      }
    }, {
      key: "proxyConnection",
      value: function proxyConnection(connection, index, proxyEl, endpointGenerator, anchorGenerator) {
        var alreadyProxied = connection.proxies[index] != null,
            proxyEp,
            originalElementId = alreadyProxied ? connection.proxies[index].originalEp.elementId : connection.endpoints[index].elementId,
            originalEndpoint = alreadyProxied ? connection.proxies[index].originalEp : connection.endpoints[index],
            proxyElId = this.getId(proxyEl);
        if (connection.proxies[index]) {
          if (connection.proxies[index].ep.elementId === proxyElId) {
            proxyEp = connection.proxies[index].ep;
          } else {
            connection.proxies[index].ep.detachFromConnection(connection, index);
            proxyEp = this._internal_newEndpoint({
              element: proxyEl,
              endpoint: endpointGenerator(connection, index),
              anchor: anchorGenerator(connection, index),
              parameters: {
                isProxyEndpoint: true
              }
            });
          }
        } else {
          proxyEp = this._internal_newEndpoint({
            element: proxyEl,
            endpoint: endpointGenerator(connection, index),
            anchor: anchorGenerator(connection, index),
            parameters: {
              isProxyEndpoint: true
            }
          });
        }
        proxyEp.deleteOnEmpty = true;
        connection.proxies[index] = {
          ep: proxyEp,
          originalEp: originalEndpoint
        };
        this.sourceOrTargetChanged(originalElementId, proxyElId, connection, proxyEl, index);
        originalEndpoint.detachFromConnection(connection, null, true);
        proxyEp.connections = [connection];
        connection.endpoints[index] = proxyEp;
        originalEndpoint.proxiedBy = proxyEp;
        originalEndpoint.setVisible(false);
        connection.setVisible(true);
        this.revalidate(proxyEl);
      }
    }, {
      key: "unproxyConnection",
      value: function unproxyConnection(connection, index) {
        if (connection.proxies == null || connection.proxies[index] == null) {
          return;
        }
        var originalElement = connection.proxies[index].originalEp.element,
            originalElementId = connection.proxies[index].originalEp.elementId,
            proxyElId = connection.proxies[index].ep.elementId;
        connection.endpoints[index] = connection.proxies[index].originalEp;
        delete connection.proxies[index].originalEp.proxiedBy;
        this.sourceOrTargetChanged(proxyElId, originalElementId, connection, originalElement, index);
        connection.proxies[index].ep.detachFromConnection(connection, null);
        connection.proxies[index].originalEp.addConnection(connection);
        if (connection.isVisible()) {
          connection.proxies[index].originalEp.setVisible(true);
        }
        connection.proxies[index] = null;
        if (findWithFunction(connection.proxies, function (p) {
          return p != null;
        }) === -1) {
          connection.proxies.length = 0;
        }
      }
    }, {
      key: "sourceOrTargetChanged",
      value: function sourceOrTargetChanged(originalId, newId, connection, newElement, index) {
        if (originalId !== newId) {
          if (index === 0) {
            connection.sourceId = newId;
            connection.source = newElement;
          } else if (index === 1) {
            connection.targetId = newId;
            connection.target = newElement;
          }
          removeManagedConnection(connection, this._managedElements[originalId]);
          addManagedConnection(connection, this._managedElements[newId]);
        }
      }
    }, {
      key: "getGroup",
      value:
      function getGroup(groupId) {
        return this.groupManager.getGroup(groupId);
      }
    }, {
      key: "getGroupFor",
      value: function getGroupFor(el) {
        return this.groupManager.getGroupFor(el);
      }
    }, {
      key: "addGroup",
      value: function addGroup(params) {
        return this.groupManager.addGroup(params);
      }
    }, {
      key: "addToGroup",
      value: function addToGroup(group) {
        var _this$groupManager;
        for (var _len = arguments.length, el = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          el[_key - 1] = arguments[_key];
        }
        return (_this$groupManager = this.groupManager).addToGroup.apply(_this$groupManager, [group, false].concat(el));
      }
    }, {
      key: "collapseGroup",
      value: function collapseGroup(group) {
        this.groupManager.collapseGroup(group);
      }
    }, {
      key: "expandGroup",
      value: function expandGroup(group) {
        this.groupManager.expandGroup(group);
      }
    }, {
      key: "toggleGroup",
      value: function toggleGroup(group) {
        this.groupManager.toggleGroup(group);
      }
    }, {
      key: "removeGroup",
      value: function removeGroup(group, deleteMembers, _manipulateView, _doNotFireEvent) {
        return this.groupManager.removeGroup(group, deleteMembers, _manipulateView, _doNotFireEvent);
      }
    }, {
      key: "removeAllGroups",
      value: function removeAllGroups(deleteMembers, _manipulateView) {
        this.groupManager.removeAllGroups(deleteMembers, _manipulateView, false);
      }
    }, {
      key: "removeFromGroup",
      value: function removeFromGroup(group, el, _doNotFireEvent) {
        this.groupManager.removeFromGroup(group, _doNotFireEvent, el);
        this._appendElement(el, this.getContainer());
        this.updateOffset({
          recalc: true,
          elId: this.getId(el)
        });
      }
    }, {
      key: "_paintEndpoint",
      value: function _paintEndpoint(endpoint, params) {
        function findConnectionToUseForDynamicAnchor(ep) {
          var idx = 0;
          if (params.elementWithPrecedence != null) {
            for (var i = 0; i < ep.connections.length; i++) {
              if (ep.connections[i].sourceId === params.elementWithPrecedence || ep.connections[i].targetId === params.elementWithPrecedence) {
                idx = i;
                break;
              }
            }
          }
          return ep.connections[idx];
        }
        params = params || {};
        var timestamp = params.timestamp,
            recalc = !(params.recalc === false);
        if (!timestamp || endpoint.timestamp !== timestamp) {
          var info = this.viewport.getPosition(endpoint.elementId);
          var xy = params.offset ? {
            x: params.offset.x,
            y: params.offset.y
          } : {
            x: info.x,
            y: info.y
          };
          if (xy != null) {
            var ap = params.anchorLoc;
            if (ap == null) {
              var anchorParams = {
                xy: xy,
                wh: info,
                element: endpoint,
                timestamp: timestamp
              };
              if (recalc && this.router.isDynamicAnchor(endpoint) && endpoint.connections.length > 0) {
                var _c3 = findConnectionToUseForDynamicAnchor(endpoint),
                    oIdx = _c3.endpoints[0] === endpoint ? 1 : 0,
                    oId = oIdx === 0 ? _c3.sourceId : _c3.targetId,
                    oInfo = this.viewport.getPosition(oId);
                anchorParams.index = oIdx === 0 ? 1 : 0;
                anchorParams.connection = _c3;
                anchorParams.txy = oInfo;
                anchorParams.twh = oInfo;
                anchorParams.tElement = _c3.endpoints[oIdx];
                anchorParams.tRotation = this._getRotations(oId);
              } else if (endpoint.connections.length > 0) {
                anchorParams.connection = endpoint.connections[0];
              }
              anchorParams.rotation = this._getRotations(endpoint.elementId);
              ap = this.router.computeAnchorLocation(endpoint._anchor, anchorParams);
            }
            endpoint.endpoint.compute(ap, this.router.getEndpointOrientation(endpoint), endpoint.paintStyleInUse);
            this.renderEndpoint(endpoint, endpoint.paintStyleInUse);
            endpoint.timestamp = timestamp;
            for (var i in endpoint.overlays) {
              if (endpoint.overlays.hasOwnProperty(i)) {
                var _o = endpoint.overlays[i];
                if (_o.isVisible()) {
                  endpoint.overlayPlacements[i] = this.drawOverlay(_o, endpoint.endpoint, endpoint.paintStyleInUse, endpoint.getAbsoluteOverlayPosition(_o));
                  this._paintOverlay(_o, endpoint.overlayPlacements[i], {
                    xmin: 0,
                    ymin: 0
                  });
                }
              }
            }
          }
        }
      }
    }, {
      key: "_paintConnection",
      value: function _paintConnection(connection, params) {
        if (!this._suspendDrawing && connection.visible !== false) {
          params = params || {};
          var timestamp = params.timestamp;
          if (timestamp != null && timestamp === connection.lastPaintedAt) {
            return;
          }
          if (timestamp == null || timestamp !== connection.lastPaintedAt) {
            this.router.computePath(connection, timestamp);
            var overlayExtents = {
              xmin: Infinity,
              ymin: Infinity,
              xmax: -Infinity,
              ymax: -Infinity
            };
            for (var i in connection.overlays) {
              if (connection.overlays.hasOwnProperty(i)) {
                var _o2 = connection.overlays[i];
                if (_o2.isVisible()) {
                  connection.overlayPlacements[i] = this.drawOverlay(_o2, connection.connector, connection.paintStyleInUse, connection.getAbsoluteOverlayPosition(_o2));
                  overlayExtents.xmin = Math.min(overlayExtents.xmin, connection.overlayPlacements[i].xmin);
                  overlayExtents.xmax = Math.max(overlayExtents.xmax, connection.overlayPlacements[i].xmax);
                  overlayExtents.ymin = Math.min(overlayExtents.ymin, connection.overlayPlacements[i].ymin);
                  overlayExtents.ymax = Math.max(overlayExtents.ymax, connection.overlayPlacements[i].ymax);
                }
              }
            }
            var lineWidth = parseFloat("" + connection.paintStyleInUse.strokeWidth || "1") / 2,
                outlineWidth = parseFloat("" + connection.paintStyleInUse.strokeWidth || "0"),
                _extents = {
              xmin: Math.min(connection.connector.bounds.xmin - (lineWidth + outlineWidth), overlayExtents.xmin),
              ymin: Math.min(connection.connector.bounds.ymin - (lineWidth + outlineWidth), overlayExtents.ymin),
              xmax: Math.max(connection.connector.bounds.xmax + (lineWidth + outlineWidth), overlayExtents.xmax),
              ymax: Math.max(connection.connector.bounds.ymax + (lineWidth + outlineWidth), overlayExtents.ymax)
            };
            this.paintConnector(connection.connector, connection.paintStyleInUse, _extents);
            for (var j in connection.overlays) {
              if (connection.overlays.hasOwnProperty(j)) {
                var _p2 = connection.overlays[j];
                if (_p2.isVisible()) {
                  this._paintOverlay(_p2, connection.overlayPlacements[j], _extents);
                }
              }
            }
          }
          connection.lastPaintedAt = timestamp;
        }
      }
    }, {
      key: "_refreshEndpoint",
      value: function _refreshEndpoint(endpoint) {
        if (!endpoint._anchor.isFloating) {
          if (endpoint.connections.length > 0) {
            this.addEndpointClass(endpoint, this.endpointConnectedClass);
          } else {
            this.removeEndpointClass(endpoint, this.endpointConnectedClass);
          }
          if (endpoint.isFull()) {
            this.addEndpointClass(endpoint, this.endpointFullClass);
          } else {
            this.removeEndpointClass(endpoint, this.endpointFullClass);
          }
        }
      }
    }, {
      key: "_makeConnector",
      value: function _makeConnector(connection, name, args) {
        return Connectors.get(connection, name, args);
      }
    }, {
      key: "addOverlay",
      value: function addOverlay(component, overlay, doNotRevalidate) {
        component.addOverlay(overlay);
        if (!doNotRevalidate) {
          var relatedElement = component instanceof Endpoint ? component.element : component.source;
          this.revalidate(relatedElement);
        }
      }
    }, {
      key: "removeOverlay",
      value: function removeOverlay(component, overlayId) {
        component.removeOverlay(overlayId);
        var relatedElement = component instanceof Endpoint ? component.element : component.source;
        this.revalidate(relatedElement);
      }
    }, {
      key: "setOutlineColor",
      value: function setOutlineColor(conn, color) {
        conn.paintStyleInUse.outlineStroke = color;
        this._paintConnection(conn);
      }
    }, {
      key: "setOutlineWidth",
      value: function setOutlineWidth(conn, width) {
        conn.paintStyleInUse.outlineWidth = width;
        this._paintConnection(conn);
      }
    }, {
      key: "setColor",
      value: function setColor(conn, color) {
        conn.paintStyleInUse.stroke = color;
        this._paintConnection(conn);
      }
    }, {
      key: "setLineWidth",
      value: function setLineWidth(conn, width) {
        conn.paintStyleInUse.strokeWidth = width;
        this._paintConnection(conn);
      }
    }, {
      key: "setLineStyle",
      value: function setLineStyle(conn, style) {
        if (style.lineWidth != null) {
          conn.paintStyleInUse.strokeWidth = style.lineWidth;
        }
        if (style.outlineWidth != null) {
          conn.paintStyleInUse.outlineWidth = style.outlineWidth;
        }
        if (style.color != null) {
          conn.paintStyleInUse.stroke = style.color;
        }
        if (style.outlineColor != null) {
          conn.paintStyleInUse.outlineStroke = style.outlineColor;
        }
        this._paintConnection(conn);
      }
    }, {
      key: "getPathData",
      value:
      function getPathData(connector) {
        var p = "";
        for (var i = 0; i < connector.segments.length; i++) {
          p += connector.segments[i].getPath(i === 0);
          p += " ";
        }
        return p;
      }
    }]);
    return JsPlumbInstance;
  }(EventGenerator);

  var VERY_SMALL_VALUE = 0.0000000001;
  function gentleRound(n) {
    var f = Math.floor(n),
        r = Math.ceil(n);
    if (n - f < VERY_SMALL_VALUE) {
      return f;
    } else if (r - n < VERY_SMALL_VALUE) {
      return r;
    }
    return n;
  }
  var ArcSegment = function (_AbstractSegment) {
    _inherits$3(ArcSegment, _AbstractSegment);
    var _super = _createSuper$3(ArcSegment);
    function ArcSegment(params) {
      var _this;
      _classCallCheck$3(this, ArcSegment);
      _this = _super.call(this, params);
      _defineProperty$3(_assertThisInitialized$3(_this), "type", ArcSegment.segmentType);
      _defineProperty$3(_assertThisInitialized$3(_this), "cx", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "cy", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "radius", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "anticlockwise", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "startAngle", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "endAngle", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "sweep", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "length", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "circumference", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "frac", void 0);
      _this.cx = params.cx;
      _this.cy = params.cy;
      _this.radius = params.r;
      _this.anticlockwise = params.ac;
      if (params.startAngle && params.endAngle) {
        _this.startAngle = params.startAngle;
        _this.endAngle = params.endAngle;
        _this.x1 = _this.cx + _this.radius * Math.cos(_this.startAngle);
        _this.y1 = _this.cy + _this.radius * Math.sin(_this.startAngle);
        _this.x2 = _this.cx + _this.radius * Math.cos(_this.endAngle);
        _this.y2 = _this.cy + _this.radius * Math.sin(_this.endAngle);
      } else {
        _this.startAngle = _this._calcAngle(_this.x1, _this.y1);
        _this.endAngle = _this._calcAngle(_this.x2, _this.y2);
      }
      if (_this.endAngle < 0) {
        _this.endAngle += TWO_PI;
      }
      if (_this.startAngle < 0) {
        _this.startAngle += TWO_PI;
      }
      var ea = _this.endAngle < _this.startAngle ? _this.endAngle + TWO_PI : _this.endAngle;
      _this.sweep = Math.abs(ea - _this.startAngle);
      if (_this.anticlockwise) {
        _this.sweep = TWO_PI - _this.sweep;
      }
      _this.circumference = 2 * Math.PI * _this.radius;
      _this.frac = _this.sweep / TWO_PI;
      _this.length = _this.circumference * _this.frac;
      _this.extents = {
        xmin: _this.cx - _this.radius,
        xmax: _this.cx + _this.radius,
        ymin: _this.cy - _this.radius,
        ymax: _this.cy + _this.radius
      };
      return _this;
    }
    _createClass$3(ArcSegment, [{
      key: "_calcAngle",
      value: function _calcAngle(_x, _y) {
        return theta({
          x: this.cx,
          y: this.cy
        }, {
          x: _x,
          y: _y
        });
      }
    }, {
      key: "_calcAngleForLocation",
      value: function _calcAngleForLocation(segment, location) {
        if (segment.anticlockwise) {
          var sa = segment.startAngle < segment.endAngle ? segment.startAngle + TWO_PI : segment.startAngle,
              s = Math.abs(sa - segment.endAngle);
          return sa - s * location;
        } else {
          var ea = segment.endAngle < segment.startAngle ? segment.endAngle + TWO_PI : segment.endAngle,
              ss = Math.abs(ea - segment.startAngle);
          return segment.startAngle + ss * location;
        }
      }
    }, {
      key: "getPath",
      value: function getPath(isFirstSegment) {
        var laf = this.sweep > Math.PI ? 1 : 0,
            sf = this.anticlockwise ? 0 : 1;
        return (isFirstSegment ? "M" + this.x1 + " " + this.y1 + " " : "") + "A " + this.radius + " " + this.radius + " 0 " + laf + "," + sf + " " + this.x2 + " " + this.y2;
      }
    }, {
      key: "getLength",
      value: function getLength() {
        return this.length;
      }
    }, {
      key: "pointOnPath",
      value: function pointOnPath(location, absolute) {
        if (location === 0) {
          return {
            x: this.x1,
            y: this.y1,
            theta: this.startAngle
          };
        } else if (location === 1) {
          return {
            x: this.x2,
            y: this.y2,
            theta: this.endAngle
          };
        }
        if (absolute) {
          location = location / length;
        }
        var angle = this._calcAngleForLocation(this, location),
            _x = this.cx + this.radius * Math.cos(angle),
            _y = this.cy + this.radius * Math.sin(angle);
        return {
          x: gentleRound(_x),
          y: gentleRound(_y),
          theta: angle
        };
      }
    }, {
      key: "gradientAtPoint",
      value: function gradientAtPoint(location, absolute) {
        var p = this.pointOnPath(location, absolute);
        var m = normal({
          x: this.cx,
          y: this.cy
        }, p);
        if (!this.anticlockwise && (m === Infinity || m === -Infinity)) {
          m *= -1;
        }
        return m;
      }
    }, {
      key: "pointAlongPathFrom",
      value: function pointAlongPathFrom(location, distance, absolute) {
        var p = this.pointOnPath(location, absolute),
            arcSpan = distance / this.circumference * 2 * Math.PI,
            dir = this.anticlockwise ? -1 : 1,
            startAngle = p.theta + dir * arcSpan,
            startX = this.cx + this.radius * Math.cos(startAngle),
            startY = this.cy + this.radius * Math.sin(startAngle);
        return {
          x: startX,
          y: startY
        };
      }
    }]);
    return ArcSegment;
  }(AbstractSegment);
  _defineProperty$3(ArcSegment, "segmentType", "Arc");

  var DEFAULT_WIDTH = 20;
  var DEFAULT_LENGTH = 20;
  var ArrowOverlay = function (_Overlay) {
    _inherits$3(ArrowOverlay, _Overlay);
    var _super = _createSuper$3(ArrowOverlay);
    function ArrowOverlay(instance, component, p) {
      var _this;
      _classCallCheck$3(this, ArrowOverlay);
      _this = _super.call(this, instance, component, p);
      _this.instance = instance;
      _this.component = component;
      _defineProperty$3(_assertThisInitialized$3(_this), "width", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "length", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "foldback", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "direction", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "location", 0.5);
      _defineProperty$3(_assertThisInitialized$3(_this), "paintStyle", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "type", ArrowOverlay.type);
      _defineProperty$3(_assertThisInitialized$3(_this), "cachedDimensions", void 0);
      p = p || {};
      _this.width = p.width || DEFAULT_WIDTH;
      _this.length = p.length || DEFAULT_LENGTH;
      _this.direction = (p.direction || 1) < 0 ? -1 : 1;
      _this.foldback = p.foldback || 0.623;
      _this.paintStyle = p.paintStyle || {
        "strokeWidth": 1
      };
      _this.location = p.location == null ? _this.location : Array.isArray(p.location) ? p.location[0] : p.location;
      return _this;
    }
    _createClass$3(ArrowOverlay, [{
      key: "draw",
      value: function draw(component, currentConnectionPaintStyle, absolutePosition) {
        if (component instanceof AbstractConnector) {
          var connector = component;
          var hxy, mid, txy, tail, cxy;
          if (this.location > 1 || this.location < 0) {
            var fromLoc = this.location < 0 ? 1 : 0;
            hxy = connector.pointAlongPathFrom(fromLoc, this.location, false);
            mid = connector.pointAlongPathFrom(fromLoc, this.location - this.direction * this.length / 2, false);
            txy = pointOnLine(hxy, mid, this.length);
          } else if (this.location === 1) {
            hxy = connector.pointOnPath(this.location);
            mid = connector.pointAlongPathFrom(this.location, -this.length);
            txy = pointOnLine(hxy, mid, this.length);
            if (this.direction === -1) {
              var _ = txy;
              txy = hxy;
              hxy = _;
            }
          } else if (this.location === 0) {
            txy = connector.pointOnPath(this.location);
            mid = connector.pointAlongPathFrom(this.location, this.length);
            hxy = pointOnLine(txy, mid, this.length);
            if (this.direction === -1) {
              var __ = txy;
              txy = hxy;
              hxy = __;
            }
          } else {
            hxy = connector.pointAlongPathFrom(this.location, this.direction * this.length / 2);
            mid = connector.pointOnPath(this.location);
            txy = pointOnLine(hxy, mid, this.length);
          }
          tail = perpendicularLineTo(hxy, txy, this.width);
          cxy = pointOnLine(hxy, txy, this.foldback * this.length);
          var d = {
            hxy: hxy,
            tail: tail,
            cxy: cxy
          },
              stroke = this.paintStyle.stroke || currentConnectionPaintStyle.stroke,
              fill = this.paintStyle.fill || currentConnectionPaintStyle.stroke,
              lineWidth = this.paintStyle.strokeWidth || currentConnectionPaintStyle.strokeWidth;
          return {
            component: component,
            d: d,
            "stroke-width": lineWidth,
            stroke: stroke,
            fill: fill,
            xmin: Math.min(hxy.x, tail[0].x, tail[1].x),
            xmax: Math.max(hxy.x, tail[0].x, tail[1].x),
            ymin: Math.min(hxy.y, tail[0].y, tail[1].y),
            ymax: Math.max(hxy.y, tail[0].y, tail[1].y)
          };
        }
      }
    }, {
      key: "updateFrom",
      value: function updateFrom(d) {}
    }]);
    return ArrowOverlay;
  }(Overlay);
  _defineProperty$3(ArrowOverlay, "type", "Arrow");
  function isArrowOverlay(o) {
    return o.type === ArrowOverlay.type;
  }
  OverlayFactory.register(ArrowOverlay.type, ArrowOverlay);

  var PlainArrowOverlay = function (_ArrowOverlay) {
    _inherits$3(PlainArrowOverlay, _ArrowOverlay);
    var _super = _createSuper$3(PlainArrowOverlay);
    function PlainArrowOverlay(instance, component, p) {
      var _this;
      _classCallCheck$3(this, PlainArrowOverlay);
      _this = _super.call(this, instance, component, p);
      _this.instance = instance;
      _defineProperty$3(_assertThisInitialized$3(_this), "type", PlainArrowOverlay.type);
      _this.foldback = 1;
      return _this;
    }
    return PlainArrowOverlay;
  }(ArrowOverlay);
  _defineProperty$3(PlainArrowOverlay, "type", "PlainArrow");
  function isPlainArrowOverlay(o) {
    return o.type === PlainArrowOverlay.type;
  }
  OverlayFactory.register("PlainArrow", PlainArrowOverlay);

  var DiamondOverlay = function (_ArrowOverlay) {
    _inherits$3(DiamondOverlay, _ArrowOverlay);
    var _super = _createSuper$3(DiamondOverlay);
    function DiamondOverlay(instance, component, p) {
      var _this;
      _classCallCheck$3(this, DiamondOverlay);
      _this = _super.call(this, instance, component, p);
      _this.instance = instance;
      _defineProperty$3(_assertThisInitialized$3(_this), "type", DiamondOverlay.type);
      _this.length = _this.length / 2;
      _this.foldback = 2;
      return _this;
    }
    return DiamondOverlay;
  }(ArrowOverlay);
  _defineProperty$3(DiamondOverlay, "type", "Diamond");
  function isDiamondOverlay(o) {
    return o.type === DiamondOverlay.type;
  }
  OverlayFactory.register(DiamondOverlay.type, DiamondOverlay);

  var CustomOverlay = function (_Overlay) {
    _inherits$3(CustomOverlay, _Overlay);
    var _super = _createSuper$3(CustomOverlay);
    function CustomOverlay(instance, component, p) {
      var _this;
      _classCallCheck$3(this, CustomOverlay);
      _this = _super.call(this, instance, component, p);
      _this.instance = instance;
      _this.component = component;
      _defineProperty$3(_assertThisInitialized$3(_this), "create", void 0);
      _defineProperty$3(_assertThisInitialized$3(_this), "type", CustomOverlay.type);
      _this.create = p.create;
      return _this;
    }
    _createClass$3(CustomOverlay, [{
      key: "updateFrom",
      value: function updateFrom(d) {}
    }]);
    return CustomOverlay;
  }(Overlay);
  _defineProperty$3(CustomOverlay, "type", "Custom");
  function isCustomOverlay(o) {
    return o.type === CustomOverlay.type;
  }
  OverlayFactory.register(CustomOverlay.type, CustomOverlay);

  EndpointFactory.registerHandler(DotEndpointHandler);
  EndpointFactory.registerHandler(RectangleEndpointHandler);
  EndpointFactory.registerHandler(BlankEndpointHandler);
  Connectors.register(StraightConnector.type, StraightConnector);

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$2(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits$2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf$2(subClass, superClass);
  }

  function _getPrototypeOf$2(o) {
    _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$2(o);
  }

  function _setPrototypeOf$2(o, p) {
    _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$2(o, p);
  }

  function _isNativeReflectConstruct$2() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized$2(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn$2(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$2(self);
  }

  function _createSuper$2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$2();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf$2(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf$2(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn$2(this, result);
    };
  }

  function sgn(n) {
    return n < 0 ? -1 : n === 0 ? 0 : 1;
  }
  function segmentDirections(segment) {
    return [sgn(segment[2] - segment[0]), sgn(segment[3] - segment[1])];
  }
  function segLength(s) {
    return Math.sqrt(Math.pow(s[0] - s[2], 2) + Math.pow(s[1] - s[3], 2));
  }
  function _cloneArray(a) {
    var _a = [];
    _a.push.apply(_a, a);
    return _a;
  }
  var FlowchartConnector = function (_AbstractConnector) {
    _inherits$2(FlowchartConnector, _AbstractConnector);
    var _super = _createSuper$2(FlowchartConnector);
    function FlowchartConnector(connection, params) {
      var _this;
      _classCallCheck$2(this, FlowchartConnector);
      _this = _super.call(this, connection, params);
      _this.connection = connection;
      _defineProperty$2(_assertThisInitialized$2(_this), "type", FlowchartConnector.type);
      _defineProperty$2(_assertThisInitialized$2(_this), "internalSegments", []);
      _defineProperty$2(_assertThisInitialized$2(_this), "midpoint", void 0);
      _defineProperty$2(_assertThisInitialized$2(_this), "alwaysRespectStubs", void 0);
      _defineProperty$2(_assertThisInitialized$2(_this), "cornerRadius", void 0);
      _defineProperty$2(_assertThisInitialized$2(_this), "lastx", void 0);
      _defineProperty$2(_assertThisInitialized$2(_this), "lasty", void 0);
      _defineProperty$2(_assertThisInitialized$2(_this), "lastOrientation", void 0);
      _defineProperty$2(_assertThisInitialized$2(_this), "loopbackRadius", void 0);
      _defineProperty$2(_assertThisInitialized$2(_this), "isLoopbackCurrently", void 0);
      _this.midpoint = params.midpoint == null || isNaN(params.midpoint) ? 0.5 : params.midpoint;
      _this.cornerRadius = params.cornerRadius != null ? params.cornerRadius : 0;
      _this.alwaysRespectStubs = params.alwaysRespectStubs === true;
      _this.lastx = null;
      _this.lasty = null;
      _this.lastOrientation = null;
      _this.loopbackRadius = params.loopbackRadius || 25;
      _this.isLoopbackCurrently = false;
      return _this;
    }
    _createClass$2(FlowchartConnector, [{
      key: "getDefaultStubs",
      value: function getDefaultStubs() {
        return [30, 30];
      }
    }, {
      key: "addASegment",
      value: function addASegment(x, y, paintInfo) {
        if (this.lastx === x && this.lasty === y) {
          return;
        }
        var lx = this.lastx == null ? paintInfo.sx : this.lastx,
            ly = this.lasty == null ? paintInfo.sy : this.lasty,
            o = lx === x ? "v" : "h";
        this.lastx = x;
        this.lasty = y;
        this.internalSegments.push([lx, ly, x, y, o]);
      }
    }, {
      key: "writeSegments",
      value: function writeSegments(paintInfo) {
        var current = null,
            next,
            currentDirection,
            nextDirection;
        for (var i = 0; i < this.internalSegments.length - 1; i++) {
          current = current || _cloneArray(this.internalSegments[i]);
          next = _cloneArray(this.internalSegments[i + 1]);
          currentDirection = segmentDirections(current);
          nextDirection = segmentDirections(next);
          if (this.cornerRadius > 0 && current[4] !== next[4]) {
            var minSegLength = Math.min(segLength(current), segLength(next));
            var radiusToUse = Math.min(this.cornerRadius, minSegLength / 2);
            current[2] -= currentDirection[0] * radiusToUse;
            current[3] -= currentDirection[1] * radiusToUse;
            next[0] += nextDirection[0] * radiusToUse;
            next[1] += nextDirection[1] * radiusToUse;
            var ac = currentDirection[1] === nextDirection[0] && nextDirection[0] === 1 || currentDirection[1] === nextDirection[0] && nextDirection[0] === 0 && currentDirection[0] !== nextDirection[1] || currentDirection[1] === nextDirection[0] && nextDirection[0] === -1,
                sgny = next[1] > current[3] ? 1 : -1,
                sgnx = next[0] > current[2] ? 1 : -1,
                sgnEqual = sgny === sgnx,
                cx = sgnEqual && ac || !sgnEqual && !ac ? next[0] : current[2],
                cy = sgnEqual && ac || !sgnEqual && !ac ? current[3] : next[1];
            this._addSegment(StraightSegment, {
              x1: current[0],
              y1: current[1],
              x2: current[2],
              y2: current[3]
            });
            this._addSegment(ArcSegment, {
              r: radiusToUse,
              x1: current[2],
              y1: current[3],
              x2: next[0],
              y2: next[1],
              cx: cx,
              cy: cy,
              ac: ac
            });
          } else {
            this._addSegment(StraightSegment, {
              x1: current[0],
              y1: current[1],
              x2: current[2],
              y2: current[3]
            });
          }
          current = next;
        }
        if (next != null) {
          this._addSegment(StraightSegment, {
            x1: next[0],
            y1: next[1],
            x2: next[2],
            y2: next[3]
          });
        }
      }
    }, {
      key: "_compute",
      value: function _compute(paintInfo, params) {
        var _this2 = this;
        this.internalSegments.length = 0;
        this.lastx = null;
        this.lasty = null;
        this.lastOrientation = null;
        var commonStubCalculator = function commonStubCalculator(axis) {
          return [paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY];
        },
            stubCalculators = {
          perpendicular: commonStubCalculator,
          orthogonal: commonStubCalculator,
          opposite: function opposite(axis) {
            var pi = paintInfo,
                idx = axis === "x" ? 0 : 1,
                areInProximity = {
              "x": function x() {
                return pi.so[idx] === 1 && (pi.startStubX > pi.endStubX && pi.tx > pi.startStubX || pi.sx > pi.endStubX && pi.tx > pi.sx) || pi.so[idx] === -1 && (pi.startStubX < pi.endStubX && pi.tx < pi.startStubX || pi.sx < pi.endStubX && pi.tx < pi.sx);
              },
              "y": function y() {
                return pi.so[idx] === 1 && (pi.startStubY > pi.endStubY && pi.ty > pi.startStubY || pi.sy > pi.endStubY && pi.ty > pi.sy) || pi.so[idx] === -1 && (pi.startStubY < pi.endStubY && pi.ty < pi.startStubY || pi.sy < pi.endStubY && pi.ty < pi.sy);
              }
            };
            if (!_this2.alwaysRespectStubs && areInProximity[axis]()) {
              return {
                "x": [(paintInfo.sx + paintInfo.tx) / 2, paintInfo.startStubY, (paintInfo.sx + paintInfo.tx) / 2, paintInfo.endStubY],
                "y": [paintInfo.startStubX, (paintInfo.sy + paintInfo.ty) / 2, paintInfo.endStubX, (paintInfo.sy + paintInfo.ty) / 2]
              }[axis];
            } else {
              return [paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY];
            }
          }
        };
        var stubs = stubCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis),
            idx = paintInfo.sourceAxis === "x" ? 0 : 1,
            oidx = paintInfo.sourceAxis === "x" ? 1 : 0,
            ss = stubs[idx],
            oss = stubs[oidx],
            es = stubs[idx + 2],
            oes = stubs[oidx + 2];
        this.addASegment(stubs[0], stubs[1], paintInfo);
        var midx = paintInfo.startStubX + (paintInfo.endStubX - paintInfo.startStubX) * this.midpoint,
            midy = paintInfo.startStubY + (paintInfo.endStubY - paintInfo.startStubY) * this.midpoint;
        var orientations = {
          x: [0, 1],
          y: [1, 0]
        },
            lineCalculators = {
          perpendicular: function perpendicular(axis, ss, oss, es, oes) {
            var pi = paintInfo,
                sis = {
              x: [[[1, 2, 3, 4], null, [2, 1, 4, 3]], null, [[4, 3, 2, 1], null, [3, 4, 1, 2]]],
              y: [[[3, 2, 1, 4], null, [2, 3, 4, 1]], null, [[4, 1, 2, 3], null, [1, 4, 3, 2]]]
            },
                stubs = {
              x: [[pi.startStubX, pi.endStubX], null, [pi.endStubX, pi.startStubX]],
              y: [[pi.startStubY, pi.endStubY], null, [pi.endStubY, pi.startStubY]]
            },
                midLines = {
              x: [[midx, pi.startStubY], [midx, pi.endStubY]],
              y: [[pi.startStubX, midy], [pi.endStubX, midy]]
            },
                linesToEnd = {
              x: [[pi.endStubX, pi.startStubY]],
              y: [[pi.startStubX, pi.endStubY]]
            },
                startToEnd = {
              x: [[pi.startStubX, pi.endStubY], [pi.endStubX, pi.endStubY]],
              y: [[pi.endStubX, pi.startStubY], [pi.endStubX, pi.endStubY]]
            },
                startToMidToEnd = {
              x: [[pi.startStubX, midy], [pi.endStubX, midy], [pi.endStubX, pi.endStubY]],
              y: [[midx, pi.startStubY], [midx, pi.endStubY], [pi.endStubX, pi.endStubY]]
            },
                otherStubs = {
              x: [pi.startStubY, pi.endStubY],
              y: [pi.startStubX, pi.endStubX]
            },
                soIdx = orientations[axis][0],
                toIdx = orientations[axis][1],
                _so = pi.so[soIdx] + 1,
                _to = pi.to[toIdx] + 1,
                otherFlipped = pi.to[toIdx] === -1 && otherStubs[axis][1] < otherStubs[axis][0] || pi.to[toIdx] === 1 && otherStubs[axis][1] > otherStubs[axis][0],
                stub1 = stubs[axis][_so][0],
                stub2 = stubs[axis][_so][1],
                segmentIndexes = sis[axis][_so][_to];
            if (pi.segment === segmentIndexes[3] || pi.segment === segmentIndexes[2] && otherFlipped) {
              return midLines[axis];
            } else if (pi.segment === segmentIndexes[2] && stub2 < stub1) {
              return linesToEnd[axis];
            } else if (pi.segment === segmentIndexes[2] && stub2 >= stub1 || pi.segment === segmentIndexes[1] && !otherFlipped) {
              return startToMidToEnd[axis];
            } else if (pi.segment === segmentIndexes[0] || pi.segment === segmentIndexes[1] && otherFlipped) {
              return startToEnd[axis];
            }
          },
          orthogonal: function orthogonal(axis, startStub, otherStartStub, endStub, otherEndStub) {
            var pi = paintInfo,
                extent = {
              "x": pi.so[0] === -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub),
              "y": pi.so[1] === -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub)
            }[axis];
            return {
              "x": [[extent, otherStartStub], [extent, otherEndStub], [endStub, otherEndStub]],
              "y": [[otherStartStub, extent], [otherEndStub, extent], [otherEndStub, endStub]]
            }[axis];
          },
          opposite: function opposite(axis, ss, oss, es, oes) {
            var pi = paintInfo,
                otherAxis = {
              "x": "y",
              "y": "x"
            }[axis],
                dim = {
              "x": "h",
              "y": "w"
            }[axis],
                comparator = pi["is" + axis.toUpperCase() + "GreaterThanStubTimes2"];
            if (params.sourceEndpoint.elementId === params.targetEndpoint.elementId) {
              var _val = oss + (1 - params.sourceEndpoint._anchor.computedPosition[otherAxis]) * params.sourceInfo[dim] + _this2.maxStub;
              return {
                "x": [[ss, _val], [es, _val]],
                "y": [[_val, ss], [_val, es]]
              }[axis];
            } else if (!comparator || pi.so[idx] === 1 && ss > es || pi.so[idx] === -1 && ss < es) {
              return {
                "x": [[ss, midy], [es, midy]],
                "y": [[midx, ss], [midx, es]]
              }[axis];
            } else if (pi.so[idx] === 1 && ss < es || pi.so[idx] === -1 && ss > es) {
              return {
                "x": [[midx, pi.sy], [midx, pi.ty]],
                "y": [[pi.sx, midy], [pi.tx, midy]]
              }[axis];
            }
          }
        };
        var p = lineCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis, ss, oss, es, oes);
        if (p) {
          for (var i = 0; i < p.length; i++) {
            this.addASegment(p[i][0], p[i][1], paintInfo);
          }
        }
        this.addASegment(stubs[2], stubs[3], paintInfo);
        this.addASegment(paintInfo.tx, paintInfo.ty, paintInfo);
        this.writeSegments(paintInfo);
      }
    }, {
      key: "transformGeometry",
      value: function transformGeometry(g, dx, dy) {
        return g;
      }
    }]);
    return FlowchartConnector;
  }(AbstractConnector);
  _defineProperty$2(FlowchartConnector, "type", "Flowchart");

  Connectors.register(FlowchartConnector.type, FlowchartConnector);

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf$1(subClass, superClass);
  }

  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$1(o);
  }

  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$1(o, p);
  }

  function _isNativeReflectConstruct$1() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$1(self);
  }

  function _createSuper$1(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$1();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf$1(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf$1(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn$1(this, result);
    };
  }

  var AbstractBezierConnector = function (_AbstractConnector) {
    _inherits$1(AbstractBezierConnector, _AbstractConnector);
    var _super = _createSuper$1(AbstractBezierConnector);
    function AbstractBezierConnector(connection, params) {
      var _this;
      _classCallCheck$1(this, AbstractBezierConnector);
      _this = _super.call(this, connection, params);
      _this.connection = connection;
      _defineProperty$1(_assertThisInitialized$1(_this), "showLoopback", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "curviness", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "margin", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "proximityLimit", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "orientation", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "loopbackRadius", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "clockwise", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "isLoopbackCurrently", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "geometry", null);
      params = params || {};
      _this.showLoopback = params.showLoopback !== false;
      _this.curviness = params.curviness || 10;
      _this.margin = params.margin || 5;
      _this.proximityLimit = params.proximityLimit || 80;
      _this.clockwise = params.orientation && params.orientation === "clockwise";
      _this.loopbackRadius = params.loopbackRadius || 25;
      _this.isLoopbackCurrently = false;
      return _this;
    }
    _createClass$1(AbstractBezierConnector, [{
      key: "getDefaultStubs",
      value: function getDefaultStubs() {
        return [0, 0];
      }
    }, {
      key: "_compute",
      value: function _compute(paintInfo, p) {
        var sp = p.sourcePos,
            tp = p.targetPos,
            _w = Math.abs(sp.curX - tp.curX),
            _h = Math.abs(sp.curY - tp.curY);
        if (!this.showLoopback || p.sourceEndpoint.elementId !== p.targetEndpoint.elementId) {
          this.isLoopbackCurrently = false;
          this._computeBezier(paintInfo, p, sp, tp, _w, _h);
        } else {
          this.isLoopbackCurrently = true;
          var x1 = p.sourcePos.curX,
              y1 = p.sourcePos.curY - this.margin,
              cx = x1,
              cy = y1 - this.loopbackRadius,
          _x = cx - this.loopbackRadius,
              _y = cy - this.loopbackRadius;
          _w = 2 * this.loopbackRadius;
          _h = 2 * this.loopbackRadius;
          paintInfo.points[0] = _x;
          paintInfo.points[1] = _y;
          paintInfo.points[2] = _w;
          paintInfo.points[3] = _h;
          this._addSegment(ArcSegment, {
            loopback: true,
            x1: x1 - _x + 4,
            y1: y1 - _y,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            r: this.loopbackRadius,
            ac: !this.clockwise,
            x2: x1 - _x - 4,
            y2: y1 - _y,
            cx: cx - _x,
            cy: cy - _y
          });
        }
      }
    }, {
      key: "exportGeometry",
      value: function exportGeometry() {
        if (this.geometry == null) {
          return null;
        } else {
          return {
            controlPoints: [extend({}, this.geometry.controlPoints[0]), extend({}, this.geometry.controlPoints[1])],
            source: extend({}, this.geometry.source),
            target: extend({}, this.geometry.target)
          };
        }
      }
    }, {
      key: "transformGeometry",
      value: function transformGeometry(g, dx, dy) {
        return {
          controlPoints: [{
            x: g.controlPoints[0].x + dx,
            y: g.controlPoints[0].y + dy
          }, {
            x: g.controlPoints[1].x + dx,
            y: g.controlPoints[1].y + dy
          }],
          source: this.transformAnchorPlacement(g.source, dx, dy),
          target: this.transformAnchorPlacement(g.target, dx, dy)
        };
      }
    }, {
      key: "importGeometry",
      value: function importGeometry(geometry) {
        if (geometry != null) {
          if (geometry.controlPoints == null || geometry.controlPoints.length != 2) {
            log("jsPlumb Bezier: cannot import geometry; controlPoints missing or does not have length 2");
            this.setGeometry(null, true);
            return false;
          }
          if (geometry.controlPoints[0].x == null || geometry.controlPoints[0].y == null || geometry.controlPoints[1].x == null || geometry.controlPoints[1].y == null) {
            log("jsPlumb Bezier: cannot import geometry; controlPoints malformed");
            this.setGeometry(null, true);
            return false;
          }
          if (geometry.source == null || geometry.source.curX == null || geometry.source.curY == null) {
            log("jsPlumb Bezier: cannot import geometry; source missing or malformed");
            this.setGeometry(null, true);
            return false;
          }
          if (geometry.target == null || geometry.target.curX == null || geometry.target.curY == null) {
            log("jsPlumb Bezier: cannot import geometry; target missing or malformed");
            this.setGeometry(null, true);
            return false;
          }
          this.setGeometry(geometry, false);
          return true;
        } else {
          return false;
        }
      }
    }]);
    return AbstractBezierConnector;
  }(AbstractConnector);

  var Vectors = {
    subtract: function subtract(v1, v2) {
      return {
        x: v1.x - v2.x,
        y: v1.y - v2.y
      };
    },
    dotProduct: function dotProduct(v1, v2) {
      return v1.x * v2.x + v1.y * v2.y;
    },
    square: function square(v) {
      return Math.sqrt(v.x * v.x + v.y * v.y);
    },
    scale: function scale(v, s) {
      return {
        x: v.x * s,
        y: v.y * s
      };
    }
  };
  var maxRecursion = 64;
  var flatnessTolerance = Math.pow(2.0, -maxRecursion - 1);
  function distanceFromCurve(point, curve) {
    var candidates = [],
        w = _convertToBezier(point, curve),
        degree = curve.length - 1,
        higherDegree = 2 * degree - 1,
        numSolutions = _findRoots(w, higherDegree, candidates, 0),
        v = Vectors.subtract(point, curve[0]),
        dist = Vectors.square(v),
        t = 0.0,
        newDist;
    for (var i = 0; i < numSolutions; i++) {
      v = Vectors.subtract(point, _bezier(curve, degree, candidates[i], null, null));
      newDist = Vectors.square(v);
      if (newDist < dist) {
        dist = newDist;
        t = candidates[i];
      }
    }
    v = Vectors.subtract(point, curve[degree]);
    newDist = Vectors.square(v);
    if (newDist < dist) {
      dist = newDist;
      t = 1.0;
    }
    return {
      location: t,
      distance: dist
    };
  }
  function nearestPointOnCurve(point, curve) {
    var td = distanceFromCurve(point, curve);
    return {
      point: _bezier(curve, curve.length - 1, td.location, null, null),
      location: td.location
    };
  }
  function _convertToBezier(point, curve) {
    var degree = curve.length - 1,
        higherDegree = 2 * degree - 1,
        c = [],
        d = [],
        cdTable = [],
        w = [],
        z = [[1.0, 0.6, 0.3, 0.1], [0.4, 0.6, 0.6, 0.4], [0.1, 0.3, 0.6, 1.0]];
    for (var i = 0; i <= degree; i++) {
      c[i] = Vectors.subtract(curve[i], point);
    }
    for (var _i = 0; _i <= degree - 1; _i++) {
      d[_i] = Vectors.subtract(curve[_i + 1], curve[_i]);
      d[_i] = Vectors.scale(d[_i], 3.0);
    }
    for (var row = 0; row <= degree - 1; row++) {
      for (var column = 0; column <= degree; column++) {
        if (!cdTable[row]) cdTable[row] = [];
        cdTable[row][column] = Vectors.dotProduct(d[row], c[column]);
      }
    }
    for (var _i2 = 0; _i2 <= higherDegree; _i2++) {
      if (!w[_i2]) {
        w[_i2] = [];
      }
      w[_i2].y = 0.0;
      w[_i2].x = parseFloat("" + _i2) / higherDegree;
    }
    var n = degree,
        m = degree - 1;
    for (var k = 0; k <= n + m; k++) {
      var lb = Math.max(0, k - m),
          ub = Math.min(k, n);
      for (var _i3 = lb; _i3 <= ub; _i3++) {
        var j = k - _i3;
        w[_i3 + j].y += cdTable[j][_i3] * z[j][_i3];
      }
    }
    return w;
  }
  function _findRoots(w, degree, t, depth) {
    var left = [],
        right = [],
        left_count,
        right_count,
        left_t = [],
        right_t = [];
    switch (_getCrossingCount(w, degree)) {
      case 0:
        {
          return 0;
        }
      case 1:
        {
          if (depth >= maxRecursion) {
            t[0] = (w[0].x + w[degree].x) / 2.0;
            return 1;
          }
          if (_isFlatEnough(w, degree)) {
            t[0] = _computeXIntercept(w, degree);
            return 1;
          }
          break;
        }
    }
    _bezier(w, degree, 0.5, left, right);
    left_count = _findRoots(left, degree, left_t, depth + 1);
    right_count = _findRoots(right, degree, right_t, depth + 1);
    for (var i = 0; i < left_count; i++) {
      t[i] = left_t[i];
    }
    for (var _i4 = 0; _i4 < right_count; _i4++) {
      t[_i4 + left_count] = right_t[_i4];
    }
    return left_count + right_count;
  }
  function _getCrossingCount(curve, degree) {
    var n_crossings = 0,
        sign,
        old_sign;
    sign = old_sign = sgn$1(curve[0].y);
    for (var i = 1; i <= degree; i++) {
      sign = sgn$1(curve[i].y);
      if (sign != old_sign) n_crossings++;
      old_sign = sign;
    }
    return n_crossings;
  }
  function _isFlatEnough(curve, degree) {
    var error, intercept_1, intercept_2, left_intercept, right_intercept, a, b, c, det, dInv, a1, b1, c1, a2, b2, c2;
    a = curve[0].y - curve[degree].y;
    b = curve[degree].x - curve[0].x;
    c = curve[0].x * curve[degree].y - curve[degree].x * curve[0].y;
    var max_distance_above, max_distance_below;
    max_distance_above = max_distance_below = 0.0;
    for (var i = 1; i < degree; i++) {
      var value = a * curve[i].x + b * curve[i].y + c;
      if (value > max_distance_above) {
        max_distance_above = value;
      } else if (value < max_distance_below) {
        max_distance_below = value;
      }
    }
    a1 = 0.0;
    b1 = 1.0;
    c1 = 0.0;
    a2 = a;
    b2 = b;
    c2 = c - max_distance_above;
    det = a1 * b2 - a2 * b1;
    dInv = 1.0 / det;
    intercept_1 = (b1 * c2 - b2 * c1) * dInv;
    a2 = a;
    b2 = b;
    c2 = c - max_distance_below;
    det = a1 * b2 - a2 * b1;
    dInv = 1.0 / det;
    intercept_2 = (b1 * c2 - b2 * c1) * dInv;
    left_intercept = Math.min(intercept_1, intercept_2);
    right_intercept = Math.max(intercept_1, intercept_2);
    error = right_intercept - left_intercept;
    return error < flatnessTolerance ? 1 : 0;
  }
  function _computeXIntercept(curve, degree) {
    var XLK = 1.0,
        YLK = 0.0,
        XNM = curve[degree].x - curve[0].x,
        YNM = curve[degree].y - curve[0].y,
        XMK = curve[0].x - 0.0,
        YMK = curve[0].y - 0.0,
        det = XNM * YLK - YNM * XLK,
        detInv = 1.0 / det,
        S = (XNM * YMK - YNM * XMK) * detInv;
    return 0.0 + XLK * S;
  }
  function _bezier(curve, degree, t, left, right) {
    var temp = [[]];
    for (var j = 0; j <= degree; j++) {
      temp[0][j] = curve[j];
    }
    for (var i = 1; i <= degree; i++) {
      for (var _j = 0; _j <= degree - i; _j++) {
        if (!temp[i]) temp[i] = [];
        if (!temp[i][_j]) temp[i][_j] = {};
        temp[i][_j].x = (1.0 - t) * temp[i - 1][_j].x + t * temp[i - 1][_j + 1].x;
        temp[i][_j].y = (1.0 - t) * temp[i - 1][_j].y + t * temp[i - 1][_j + 1].y;
      }
    }
    if (left != null) {
      for (var _j2 = 0; _j2 <= degree; _j2++) {
        left[_j2] = temp[_j2][0];
      }
    }
    if (right != null) {
      for (var _j3 = 0; _j3 <= degree; _j3++) {
        right[_j3] = temp[degree - _j3][_j3];
      }
    }
    return temp[degree][0];
  }
  function _getLUT(steps, curve) {
    var out = [];
    steps--;
    for (var n = 0; n <= steps; n++) {
      out.push(_computeLookup(n / steps, curve));
    }
    return out;
  }
  function _computeLookup(e, curve) {
    var EMPTY_POINT = {
      x: 0,
      y: 0
    };
    if (e === 0) {
      return curve[0];
    }
    var degree = curve.length - 1;
    if (e === 1) {
      return curve[degree];
    }
    var o = curve;
    var s = 1 - e;
    if (degree === 0) {
      return curve[0];
    }
    if (degree === 1) {
      return {
        x: s * o[0].x + e * o[1].x,
        y: s * o[0].y + e * o[1].y
      };
    }
    if (4 > degree) {
      var l = s * s,
          h = e * e,
          u = 0,
          m,
          g,
          f;
      if (degree === 2) {
        o = [o[0], o[1], o[2], EMPTY_POINT];
        m = l;
        g = 2 * (s * e);
        f = h;
      } else if (degree === 3) {
        m = l * s;
        g = 3 * (l * e);
        f = 3 * (s * h);
        u = e * h;
      }
      return {
        x: m * o[0].x + g * o[1].x + f * o[2].x + u * o[3].x,
        y: m * o[0].y + g * o[1].y + f * o[2].y + u * o[3].y
      };
    } else {
      return EMPTY_POINT;
    }
  }
  function computeBezierLength(curve) {
    var length = 0;
    if (!isPoint(curve)) {
      var steps = 16;
      var lut = _getLUT(steps, curve);
      for (var i = 0; i < steps - 1; i++) {
        var a = lut[i],
            b = lut[i + 1];
        length += dist(a, b);
      }
    }
    return length;
  }
  var _curveFunctionCache = new Map();
  function _getCurveFunctions(order) {
    var fns = _curveFunctionCache.get(order);
    if (!fns) {
      fns = [];
      var f_term = function f_term() {
        return function (t) {
          return Math.pow(t, order);
        };
      },
          l_term = function l_term() {
        return function (t) {
          return Math.pow(1 - t, order);
        };
      },
          c_term = function c_term(c) {
        return function (t) {
          return c;
        };
      },
          t_term = function t_term() {
        return function (t) {
          return t;
        };
      },
          one_minus_t_term = function one_minus_t_term() {
        return function (t) {
          return 1 - t;
        };
      },
          _termFunc = function _termFunc(terms) {
        return function (t) {
          var p = 1;
          for (var i = 0; i < terms.length; i++) {
            p = p * terms[i](t);
          }
          return p;
        };
      };
      fns.push(f_term());
      for (var i = 1; i < order; i++) {
        var terms = [c_term(order)];
        for (var j = 0; j < order - i; j++) {
          terms.push(t_term());
        }
        for (var _j4 = 0; _j4 < i; _j4++) {
          terms.push(one_minus_t_term());
        }
        fns.push(_termFunc(terms));
      }
      fns.push(l_term());
      _curveFunctionCache.set(order, fns);
    }
    return fns;
  }
  function pointOnCurve(curve, location) {
    var cc = _getCurveFunctions(curve.length - 1),
        _x = 0,
        _y = 0;
    for (var i = 0; i < curve.length; i++) {
      _x = _x + curve[i].x * cc[i](location);
      _y = _y + curve[i].y * cc[i](location);
    }
    return {
      x: _x,
      y: _y
    };
  }
  function dist(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }
  function isPoint(curve) {
    return curve[0].x === curve[1].x && curve[0].y === curve[1].y;
  }
  function pointAlongPath(curve, location, distance) {
    if (isPoint(curve)) {
      return {
        point: curve[0],
        location: location
      };
    }
    var prev = pointOnCurve(curve, location),
        tally = 0,
        curLoc = location,
        direction = distance > 0 ? 1 : -1,
        cur = null;
    while (tally < Math.abs(distance)) {
      curLoc += 0.005 * direction;
      cur = pointOnCurve(curve, curLoc);
      tally += dist(cur, prev);
      prev = cur;
    }
    return {
      point: cur,
      location: curLoc
    };
  }
  function pointAlongCurveFrom(curve, location, distance) {
    return pointAlongPath(curve, location, distance).point;
  }
  function locationAlongCurveFrom(curve, location, distance) {
    return pointAlongPath(curve, location, distance).location;
  }
  function gradientAtPoint(curve, location) {
    var p1 = pointOnCurve(curve, location),
        p2 = pointOnCurve(curve.slice(0, curve.length - 1), location),
        dy = p2.y - p1.y,
        dx = p2.x - p1.x;
    return dy === 0 ? Infinity : Math.atan(dy / dx);
  }
  function gradientAtPointAlongPathFrom(curve, location, distance) {
    var p = pointAlongPath(curve, location, distance);
    if (p.location > 1) p.location = 1;
    if (p.location < 0) p.location = 0;
    return gradientAtPoint(curve, p.location);
  }
  function perpendicularToPathAt(curve, location, length, distance) {
    distance = distance == null ? 0 : distance;
    var p = pointAlongPath(curve, location, distance),
        m = gradientAtPoint(curve, p.location),
        _theta2 = Math.atan(-1 / m),
        y = length / 2 * Math.sin(_theta2),
        x = length / 2 * Math.cos(_theta2);
    return [{
      x: p.point.x + x,
      y: p.point.y + y
    }, {
      x: p.point.x - x,
      y: p.point.y - y
    }];
  }
  function bezierLineIntersection(x1, y1, x2, y2, curve) {
    var a = y2 - y1,
        b = x1 - x2,
        c = x1 * (y1 - y2) + y1 * (x2 - x1),
        coeffs = _computeCoefficients(curve),
        p = [a * coeffs[0][0] + b * coeffs[1][0], a * coeffs[0][1] + b * coeffs[1][1], a * coeffs[0][2] + b * coeffs[1][2], a * coeffs[0][3] + b * coeffs[1][3] + c],
        r = _cubicRoots.apply(null, p),
        intersections = [];
    if (r != null) {
      for (var i = 0; i < 3; i++) {
        var _t = r[i],
            t2 = Math.pow(_t, 2),
            t3 = Math.pow(_t, 3),
            x = {
          x: coeffs[0][0] * t3 + coeffs[0][1] * t2 + coeffs[0][2] * _t + coeffs[0][3],
          y: coeffs[1][0] * t3 + coeffs[1][1] * t2 + coeffs[1][2] * _t + coeffs[1][3]
        };
        var s = void 0;
        if (x2 - x1 !== 0) {
          s = (x[0] - x1) / (x2 - x1);
        } else {
          s = (x[1] - y1) / (y2 - y1);
        }
        if (_t >= 0 && _t <= 1.0 && s >= 0 && s <= 1.0) {
          intersections.push(x);
        }
      }
    }
    return intersections;
  }
  function boxIntersection(x, y, w, h, curve) {
    var i = [];
    i.push.apply(i, bezierLineIntersection(x, y, x + w, y, curve));
    i.push.apply(i, bezierLineIntersection(x + w, y, x + w, y + h, curve));
    i.push.apply(i, bezierLineIntersection(x + w, y + h, x, y + h, curve));
    i.push.apply(i, bezierLineIntersection(x, y + h, x, y, curve));
    return i;
  }
  function boundingBoxIntersection(boundingBox, curve) {
    var i = [];
    i.push.apply(i, bezierLineIntersection(boundingBox.x, boundingBox.y, boundingBox.x + boundingBox.w, boundingBox.y, curve));
    i.push.apply(i, bezierLineIntersection(boundingBox.x + boundingBox.w, boundingBox.y, boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h, curve));
    i.push.apply(i, bezierLineIntersection(boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h, boundingBox.x, boundingBox.y + boundingBox.h, curve));
    i.push.apply(i, bezierLineIntersection(boundingBox.x, boundingBox.y + boundingBox.h, boundingBox.x, boundingBox.y, curve));
    return i;
  }
  function _computeCoefficientsForAxis(curve, axis) {
    return [-curve[0][axis] + 3 * curve[1][axis] + -3 * curve[2][axis] + curve[3][axis], 3 * curve[0][axis] - 6 * curve[1][axis] + 3 * curve[2][axis], -3 * curve[0][axis] + 3 * curve[1][axis], curve[0][axis]];
  }
  function _computeCoefficients(curve) {
    return [_computeCoefficientsForAxis(curve, "x"), _computeCoefficientsForAxis(curve, "y")];
  }
  function _cubicRoots(a, b, c, d) {
    var A = b / a,
        B = c / a,
        C = d / a,
        Q = (3 * B - Math.pow(A, 2)) / 9,
        R = (9 * A * B - 27 * C - 2 * Math.pow(A, 3)) / 54,
        D = Math.pow(Q, 3) + Math.pow(R, 2),
        S,
        T,
        t = [0, 0, 0];
    if (D >= 0)
      {
        S = sgn$1(R + Math.sqrt(D)) * Math.pow(Math.abs(R + Math.sqrt(D)), 1 / 3);
        T = sgn$1(R - Math.sqrt(D)) * Math.pow(Math.abs(R - Math.sqrt(D)), 1 / 3);
        t[0] = -A / 3 + (S + T);
        t[1] = -A / 3 - (S + T) / 2;
        t[2] = -A / 3 - (S + T) / 2;
        if (Math.abs(Math.sqrt(3) * (S - T) / 2) !== 0) {
          t[1] = -1;
          t[2] = -1;
        }
      } else
      {
        var th = Math.acos(R / Math.sqrt(-Math.pow(Q, 3)));
        t[0] = 2 * Math.sqrt(-Q) * Math.cos(th / 3) - A / 3;
        t[1] = 2 * Math.sqrt(-Q) * Math.cos((th + 2 * Math.PI) / 3) - A / 3;
        t[2] = 2 * Math.sqrt(-Q) * Math.cos((th + 4 * Math.PI) / 3) - A / 3;
      }
    for (var i = 0; i < 3; i++) {
      if (t[i] < 0 || t[i] > 1.0) {
        t[i] = -1;
      }
    }
    return t;
  }

  var BezierSegment = function (_AbstractSegment) {
    _inherits$1(BezierSegment, _AbstractSegment);
    var _super = _createSuper$1(BezierSegment);
    function BezierSegment(params) {
      var _this;
      _classCallCheck$1(this, BezierSegment);
      _this = _super.call(this, params);
      _defineProperty$1(_assertThisInitialized$1(_this), "curve", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "cp1x", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "cp1y", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "cp2x", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "cp2y", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "length", 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "type", BezierSegment.segmentType);
      _this.cp1x = params.cp1x;
      _this.cp1y = params.cp1y;
      _this.cp2x = params.cp2x;
      _this.cp2y = params.cp2y;
      _this.x1 = params.x1;
      _this.x2 = params.x2;
      _this.y1 = params.y1;
      _this.y2 = params.y2;
      _this.curve = [{
        x: _this.x1,
        y: _this.y1
      }, {
        x: _this.cp1x,
        y: _this.cp1y
      }, {
        x: _this.cp2x,
        y: _this.cp2y
      }, {
        x: _this.x2,
        y: _this.y2
      }];
      _this.extents = {
        xmin: Math.min(_this.x1, _this.x2, _this.cp1x, _this.cp2x),
        ymin: Math.min(_this.y1, _this.y2, _this.cp1y, _this.cp2y),
        xmax: Math.max(_this.x1, _this.x2, _this.cp1x, _this.cp2x),
        ymax: Math.max(_this.y1, _this.y2, _this.cp1y, _this.cp2y)
      };
      return _this;
    }
    _createClass$1(BezierSegment, [{
      key: "getPath",
      value: function getPath(isFirstSegment) {
        return (isFirstSegment ? "M " + this.x2 + " " + this.y2 + " " : "") + "C " + this.cp2x + " " + this.cp2y + " " + this.cp1x + " " + this.cp1y + " " + this.x1 + " " + this.y1;
      }
    }, {
      key: "pointOnPath",
      value: function pointOnPath(location, absolute) {
        location = BezierSegment._translateLocation(this.curve, location, absolute);
        return pointOnCurve(this.curve, location);
      }
    }, {
      key: "gradientAtPoint",
      value: function gradientAtPoint$1(location, absolute) {
        location = BezierSegment._translateLocation(this.curve, location, absolute);
        return gradientAtPoint(this.curve, location);
      }
    }, {
      key: "pointAlongPathFrom",
      value: function pointAlongPathFrom(location, distance, absolute) {
        location = BezierSegment._translateLocation(this.curve, location, absolute);
        return pointAlongCurveFrom(this.curve, location, distance);
      }
    }, {
      key: "getLength",
      value: function getLength() {
        if (this.length == null || this.length === 0) {
          this.length = computeBezierLength(this.curve);
        }
        return this.length;
      }
    }, {
      key: "findClosestPointOnPath",
      value: function findClosestPointOnPath(x, y) {
        var p = nearestPointOnCurve({
          x: x,
          y: y
        }, this.curve);
        return {
          d: Math.sqrt(Math.pow(p.point.x - x, 2) + Math.pow(p.point.y - y, 2)),
          x: p.point.x,
          y: p.point.y,
          l: 1 - p.location,
          s: this,
          x1: null,
          y1: null,
          x2: null,
          y2: null
        };
      }
    }, {
      key: "lineIntersection",
      value: function lineIntersection(x1, y1, x2, y2) {
        return bezierLineIntersection(x1, y1, x2, y2, this.curve);
      }
    }], [{
      key: "_translateLocation",
      value: function _translateLocation(_curve, location, absolute) {
        if (absolute) {
          location = locationAlongCurveFrom(_curve, location > 0 ? 0 : 1, location);
        }
        return location;
      }
    }]);
    return BezierSegment;
  }(AbstractSegment);
  _defineProperty$1(BezierSegment, "segmentType", "Bezier");

  var BezierConnector = function (_AbstractBezierConnec) {
    _inherits$1(BezierConnector, _AbstractBezierConnec);
    var _super = _createSuper$1(BezierConnector);
    function BezierConnector(connection, params) {
      var _this;
      _classCallCheck$1(this, BezierConnector);
      _this = _super.call(this, connection, params);
      _this.connection = connection;
      _defineProperty$1(_assertThisInitialized$1(_this), "type", BezierConnector.type);
      _defineProperty$1(_assertThisInitialized$1(_this), "majorAnchor", void 0);
      _defineProperty$1(_assertThisInitialized$1(_this), "minorAnchor", void 0);
      params = params || {};
      _this.majorAnchor = params.curviness || 150;
      _this.minorAnchor = 10;
      return _this;
    }
    _createClass$1(BezierConnector, [{
      key: "getCurviness",
      value: function getCurviness() {
        return this.majorAnchor;
      }
    }, {
      key: "_findControlPoint",
      value: function _findControlPoint(point, sourceAnchorPosition, targetAnchorPosition, soo, too) {
        var perpendicular = soo[0] !== too[0] || soo[1] === too[1],
            p = {
          x: 0,
          y: 0
        };
        if (!perpendicular) {
          if (soo[0] === 0) {
            p.x = sourceAnchorPosition.curX < targetAnchorPosition.curX ? point.x + this.minorAnchor : point.x - this.minorAnchor;
          } else {
            p.x = point.x - this.majorAnchor * soo[0];
          }
          if (soo[1] === 0) {
            p.y = sourceAnchorPosition.curY < targetAnchorPosition.curY ? point.y + this.minorAnchor : point.y - this.minorAnchor;
          } else {
            p.y = point.y + this.majorAnchor * too[1];
          }
        } else {
          if (too[0] === 0) {
            p.x = targetAnchorPosition.curX < sourceAnchorPosition.curX ? point.x + this.minorAnchor : point.x - this.minorAnchor;
          } else {
            p.x = point.x + this.majorAnchor * too[0];
          }
          if (too[1] === 0) {
            p.y = targetAnchorPosition.curY < sourceAnchorPosition.curY ? point.y + this.minorAnchor : point.y - this.minorAnchor;
          } else {
            p.y = point.y + this.majorAnchor * soo[1];
          }
        }
        return p;
      }
    }, {
      key: "_computeBezier",
      value: function _computeBezier(paintInfo, p, sp, tp, _w, _h) {
        var _CP,
            _CP2,
            _sx = sp.curX < tp.curX ? _w : 0,
            _sy = sp.curY < tp.curY ? _h : 0,
            _tx = sp.curX < tp.curX ? 0 : _w,
            _ty = sp.curY < tp.curY ? 0 : _h;
        if (this.edited !== true) {
          _CP = this._findControlPoint({
            x: _sx,
            y: _sy
          }, sp, tp, paintInfo.so, paintInfo.to);
          _CP2 = this._findControlPoint({
            x: _tx,
            y: _ty
          }, tp, sp, paintInfo.to, paintInfo.so);
        } else {
          _CP = this.geometry.controlPoints[0];
          _CP2 = this.geometry.controlPoints[1];
        }
        this.geometry = {
          controlPoints: [_CP, _CP2],
          source: p.sourcePos,
          target: p.targetPos
        };
        this._addSegment(BezierSegment, {
          x1: _sx,
          y1: _sy,
          x2: _tx,
          y2: _ty,
          cp1x: _CP.x,
          cp1y: _CP.y,
          cp2x: _CP2.x,
          cp2y: _CP2.y
        });
      }
    }]);
    return BezierConnector;
  }(AbstractBezierConnector);
  _defineProperty$1(BezierConnector, "type", "Bezier");

  function _segment(x1, y1, x2, y2) {
    if (x1 <= x2 && y2 <= y1) {
      return 1;
    } else if (x1 <= x2 && y1 <= y2) {
      return 2;
    } else if (x2 <= x1 && y2 >= y1) {
      return 3;
    }
    return 4;
  }
  function _findControlPoint(midx, midy, segment, sourceEdge, targetEdge, dx, dy, distance, proximityLimit) {
    if (distance <= proximityLimit) {
      return {
        x: midx,
        y: midy
      };
    }
    if (segment === 1) {
      if (sourceEdge.curY <= 0 && targetEdge.curY >= 1) {
        return {
          x: midx + (sourceEdge.x < 0.5 ? -1 * dx : dx),
          y: midy
        };
      } else if (sourceEdge.curX >= 1 && targetEdge.curX <= 0) {
        return {
          x: midx,
          y: midy + (sourceEdge.y < 0.5 ? -1 * dy : dy)
        };
      } else {
        return {
          x: midx + -1 * dx,
          y: midy + -1 * dy
        };
      }
    } else if (segment === 2) {
      if (sourceEdge.curY >= 1 && targetEdge.curY <= 0) {
        return {
          x: midx + (sourceEdge.x < 0.5 ? -1 * dx : dx),
          y: midy
        };
      } else if (sourceEdge.curX >= 1 && targetEdge.curX <= 0) {
        return {
          x: midx,
          y: midy + (sourceEdge.y < 0.5 ? -1 * dy : dy)
        };
      } else {
        return {
          x: midx + dx,
          y: midy + -1 * dy
        };
      }
    } else if (segment === 3) {
      if (sourceEdge.curY >= 1 && targetEdge.curY <= 0) {
        return {
          x: midx + (sourceEdge.x < 0.5 ? -1 * dx : dx),
          y: midy
        };
      } else if (sourceEdge.curX <= 0 && targetEdge.curX >= 1) {
        return {
          x: midx,
          y: midy + (sourceEdge.y < 0.5 ? -1 * dy : dy)
        };
      } else {
        return {
          x: midx + -1 * dx,
          y: midy + -1 * dy
        };
      }
    } else if (segment === 4) {
      if (sourceEdge.curY <= 0 && targetEdge.curY >= 1) {
        return {
          x: midx + (sourceEdge.x < 0.5 ? -1 * dx : dx),
          y: midy
        };
      } else if (sourceEdge.curX <= 0 && targetEdge.curX >= 1) {
        return {
          x: midx,
          y: midy + (sourceEdge.y < 0.5 ? -1 * dy : dy)
        };
      } else {
        return {
          x: midx + dx,
          y: midy + -1 * dy
        };
      }
    }
  }
  var StateMachineConnector = function (_AbstractBezierConnec) {
    _inherits$1(StateMachineConnector, _AbstractBezierConnec);
    var _super = _createSuper$1(StateMachineConnector);
    function StateMachineConnector(connection, params) {
      var _this;
      _classCallCheck$1(this, StateMachineConnector);
      _this = _super.call(this, connection, params);
      _this.connection = connection;
      _defineProperty$1(_assertThisInitialized$1(_this), "type", StateMachineConnector.type);
      _defineProperty$1(_assertThisInitialized$1(_this), "_controlPoint", void 0);
      _this.curviness = params.curviness || 10;
      _this.margin = params.margin || 5;
      _this.proximityLimit = params.proximityLimit || 80;
      _this.clockwise = params.orientation && params.orientation === "clockwise";
      return _this;
    }
    _createClass$1(StateMachineConnector, [{
      key: "_computeBezier",
      value: function _computeBezier(paintInfo, params, sp, tp, w, h) {
        var _sx = sp.curX < tp.curX ? 0 : w,
            _sy = sp.curY < tp.curY ? 0 : h,
            _tx = sp.curX < tp.curX ? w : 0,
            _ty = sp.curY < tp.curY ? h : 0;
        if (sp.x === 0) {
          _sx -= this.margin;
        }
        if (sp.x === 1) {
          _sx += this.margin;
        }
        if (sp.y === 0) {
          _sy -= this.margin;
        }
        if (sp.y === 1) {
          _sy += this.margin;
        }
        if (tp.x === 0) {
          _tx -= this.margin;
        }
        if (tp.x === 1) {
          _tx += this.margin;
        }
        if (tp.y === 0) {
          _ty -= this.margin;
        }
        if (tp.y === 1) {
          _ty += this.margin;
        }
        if (this.edited !== true) {
          var _midx = (_sx + _tx) / 2,
              _midy = (_sy + _ty) / 2,
              segment = _segment(_sx, _sy, _tx, _ty),
              distance = Math.sqrt(Math.pow(_tx - _sx, 2) + Math.pow(_ty - _sy, 2));
          this._controlPoint = _findControlPoint(_midx, _midy, segment, params.sourcePos, params.targetPos, this.curviness, this.curviness, distance, this.proximityLimit);
        } else {
          this._controlPoint = this.geometry.controlPoints[0];
        }
        var cp1x, cp2x, cp1y, cp2y;
        cp1x = this._controlPoint.x;
        cp2x = this._controlPoint.x;
        cp1y = this._controlPoint.y;
        cp2y = this._controlPoint.y;
        this.geometry = {
          controlPoints: [this._controlPoint, this._controlPoint],
          source: params.sourcePos,
          target: params.targetPos
        };
        this._addSegment(BezierSegment, {
          x1: _tx,
          y1: _ty,
          x2: _sx,
          y2: _sy,
          cp1x: cp1x,
          cp1y: cp1y,
          cp2x: cp2x,
          cp2y: cp2y
        });
      }
    }]);
    return StateMachineConnector;
  }(AbstractBezierConnector);
  _defineProperty$1(StateMachineConnector, "type", "StateMachine");

  Connectors.register(BezierConnector.type, BezierConnector);
  Connectors.register(StateMachineConnector.type, StateMachineConnector);

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function matchesSelector$1(el, selector, ctx) {
    ctx = ctx || el.parentNode;
    var possibles = ctx.querySelectorAll(selector);
    for (var i = 0; i < possibles.length; i++) {
      if (possibles[i] === el) {
        return true;
      }
    }
    return false;
  }
  function consume(e, doNotPreventDefault) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.returnValue = false;
    }
    if (!doNotPreventDefault && e.preventDefault) {
      e.preventDefault();
    }
  }
  function findParent(el, selector, container, matchOnElementAlso) {
    if (matchOnElementAlso && matchesSelector$1(el, selector, container)) {
      return el;
    } else {
      el = el.parentNode;
    }
    while (el != null && el !== container) {
      if (matchesSelector$1(el, selector)) {
        return el;
      } else {
        el = el.parentNode;
      }
    }
  }
  function getEventSource(e) {
    return e.srcElement || e.target;
  }
  function _setClassName(el, cn, classList) {
    cn = fastTrim(cn);
    if (typeof el.className.baseVal !== "undefined") {
      el.className.baseVal = cn;
    } else {
      el.className = cn;
    }
    try {
      var cl = el.classList;
      if (cl != null) {
        while (cl.length > 0) {
          cl.remove(cl.item(0));
        }
        for (var i = 0; i < classList.length; i++) {
          if (classList[i]) {
            cl.add(classList[i]);
          }
        }
      }
    } catch (e) {
      log("WARN: cannot set class list", e);
    }
  }
  function _getClassName(el) {
    return el.className != null ? typeof el.className.baseVal === "undefined" ? el.className : el.className.baseVal : "";
  }
  function _classManip(el, classesToAdd, classesToRemove) {
    var cta = classesToAdd == null ? [] : Array.isArray(classesToAdd) ? classesToAdd : classesToAdd.split(/\s+/);
    var ctr = classesToRemove == null ? [] : Array.isArray(classesToRemove) ? classesToRemove : classesToRemove.split(/\s+/);
    var className = _getClassName(el),
        curClasses = className.split(/\s+/);
    var _oneSet = function _oneSet(add, classes) {
      for (var i = 0; i < classes.length; i++) {
        if (add) {
          if (curClasses.indexOf(classes[i]) === -1) {
            curClasses.push(classes[i]);
          }
        } else {
          var idx = curClasses.indexOf(classes[i]);
          if (idx !== -1) {
            curClasses.splice(idx, 1);
          }
        }
      }
    };
    _oneSet(true, cta);
    _oneSet(false, ctr);
    _setClassName(el, curClasses.join(" "), curClasses);
  }
  function isNodeList(el) {
    return !isString(el) && !Array.isArray(el) && el.length != null && el.documentElement == null && el.nodeType == null;
  }
  function isArrayLike(el) {
    return !isString(el) && (Array.isArray(el) || isNodeList(el));
  }
  function getClass(el) {
    return _getClassName(el);
  }
  function addClass(el, clazz) {
    var _one = function _one(el, clazz) {
      if (el != null && clazz != null && clazz.length > 0) {
        if (el.classList) {
          var parts = fastTrim(clazz).split(/\s+/);
          forEach(parts, function (part) {
            el.classList.add(part);
          });
        } else {
          _classManip(el, clazz);
        }
      }
    };
    if (isNodeList(el)) {
      forEach(el, function (el) {
        return _one(el, clazz);
      });
    } else {
      _one(el, clazz);
    }
  }
  function hasClass(el, clazz) {
    if (el.classList) {
      return el.classList.contains(clazz);
    } else {
      return _getClassName(el).indexOf(clazz) !== -1;
    }
  }
  function removeClass(el, clazz) {
    var _one = function _one(el, clazz) {
      if (el != null && clazz != null && clazz.length > 0) {
        if (el.classList) {
          var parts = fastTrim(clazz).split(/\s+/);
          parts.forEach(function (part) {
            el.classList.remove(part);
          });
        } else {
          _classManip(el, null, clazz);
        }
      }
    };
    if (isNodeList(el)) {
      forEach(el, function (el) {
        return _one(el, clazz);
      });
    } else {
      _one(el, clazz);
    }
  }
  function toggleClass(el, clazz) {
    var _this = this;
    var _one = function _one(el, clazz) {
      if (el != null && clazz != null && clazz.length > 0) {
        if (el.classList) {
          el.classList.toggle(clazz);
        } else {
          if (_this.hasClass(el, clazz)) {
            _this.removeClass(el, clazz);
          } else {
            _this.addClass(el, clazz);
          }
        }
      }
    };
    if (isNodeList(el)) {
      forEach(el, function (el) {
        return _one(el, clazz);
      });
    } else {
      _one(el, clazz);
    }
  }
  function createElement(tag, style, clazz, atts) {
    return createElementNS(null, tag, style, clazz, atts);
  }
  function createElementNS(ns, tag, style, clazz, atts) {
    var e = ns == null ? document.createElement(tag) : document.createElementNS(ns, tag);
    var i;
    style = style || {};
    for (i in style) {
      e.style[i] = style[i];
    }
    if (clazz) {
      e.className = clazz;
    }
    atts = atts || {};
    for (i in atts) {
      e.setAttribute(i, "" + atts[i]);
    }
    return e;
  }
  function offsetRelativeToRoot(el) {
    var box = el.getBoundingClientRect(),
        body = document.body,
        docElem = document.documentElement,
    scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
    clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
    top = box.top + scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;
    return {
      x: Math.round(left),
      y: Math.round(top)
    };
  }
  function offsetSize(el) {
    return {
      w: el.offsetWidth,
      h: el.offsetHeight
    };
  }
  function svgWidthHeightSize(el) {
    try {
      return {
        w: parseFloat(el.width.baseVal.value),
        h: parseFloat(el.height.baseVal.value)
      };
    } catch (e) {
      return {
        w: 0,
        h: 0
      };
    }
  }
  function svgXYPosition(el) {
    try {
      return {
        x: parseFloat(el.x.baseVal.value),
        y: parseFloat(el.y.baseVal.value)
      };
    } catch (e) {
      return {
        x: 0,
        y: 0
      };
    }
  }
  function getElementPosition(el, instance) {
    var pc = instance.getContainer().getBoundingClientRect();
    var ec = el.getBoundingClientRect();
    var z = instance.currentZoom;
    return {
      x: (ec.left - pc.left) / z,
      y: (ec.top - pc.top) / z
    };
  }
  function getElementSize(el, instance) {
    var ec = el.getBoundingClientRect();
    var z = instance.currentZoom;
    return {
      w: ec.width / z,
      h: ec.height / z
    };
  }
  exports.ElementTypes = void 0;
  (function (ElementTypes) {
    ElementTypes["SVG"] = "SVG";
    ElementTypes["HTML"] = "HTML";
  })(exports.ElementTypes || (exports.ElementTypes = {}));
  function getElementType(el) {
    return el instanceof SVGElement ? exports.ElementTypes.SVG : exports.ElementTypes.HTML;
  }
  function isSVGElement(el) {
    return getElementType(el) === exports.ElementTypes.SVG;
  }

  var svgAttributeMap = {
    "stroke-linejoin": "stroke-linejoin",
    "stroke-dashoffset": "stroke-dashoffset",
    "stroke-linecap": "stroke-linecap"
  };
  var STROKE_DASHARRAY = "stroke-dasharray";
  var DASHSTYLE = "dashstyle";
  var FILL = "fill";
  var STROKE = "stroke";
  var STROKE_WIDTH = "stroke-width";
  var LINE_WIDTH = "strokeWidth";
  var ELEMENT_SVG = "svg";
  var ELEMENT_PATH = "path";
  var ns = {
    svg: "http://www.w3.org/2000/svg"
  };
  function _attr(node, attributes) {
    for (var i in attributes) {
      node.setAttribute(i, "" + attributes[i]);
    }
  }
  function _node(name, attributes) {
    attributes = attributes || {};
    attributes.version = "1.1";
    attributes.xmlns = ns.svg;
    return createElementNS(ns.svg, name, null, null, attributes);
  }
  function _pos(d) {
    return "position:absolute;left:" + d[0] + "px;top:" + d[1] + "px";
  }
  function _applyStyles(parent, node, style) {
    node.setAttribute(FILL, style.fill ? style.fill : NONE);
    node.setAttribute(STROKE, style.stroke ? style.stroke : NONE);
    if (style.strokeWidth) {
      node.setAttribute(STROKE_WIDTH, style.strokeWidth);
    }
    if (style[DASHSTYLE] && style[LINE_WIDTH] && !style[STROKE_DASHARRAY]) {
      var sep = style[DASHSTYLE].indexOf(",") === -1 ? " " : ",",
          parts = style[DASHSTYLE].split(sep),
          styleToUse = "";
      forEach(parts, function (p) {
        styleToUse += Math.floor(p * style.strokeWidth) + sep;
      });
      node.setAttribute(STROKE_DASHARRAY, styleToUse);
    } else if (style[STROKE_DASHARRAY]) {
      node.setAttribute(STROKE_DASHARRAY, style[STROKE_DASHARRAY]);
    }
    for (var i in svgAttributeMap) {
      if (style[i]) {
        node.setAttribute(svgAttributeMap[i], style[i]);
      }
    }
  }
  function _appendAtIndex(svg, path, idx) {
    if (svg.childNodes.length > idx) {
      svg.insertBefore(path, svg.childNodes[idx]);
    } else {
      svg.appendChild(path);
    }
  }
  var svg = {
    attr: _attr,
    node: _node,
    ns: ns
  };

  function compoundEvent(stem, event, subevent) {
    var a = [stem, event];
    if (subevent) {
      a.push(subevent);
    }
    return a.join(":");
  }
  var ATTRIBUTE_CONTAINER = "data-jtk-container";
  var ATTRIBUTE_GROUP_CONTENT = "data-jtk-group-content";
  var ATTRIBUTE_JTK_ENABLED = "data-jtk-enabled";
  var ATTRIBUTE_JTK_SCOPE = "data-jtk-scope";
  var ENDPOINT = "endpoint";
  var ELEMENT = "element";
  var CONNECTION = "connection";
  var ELEMENT_DIV = "div";
  var EVENT_CLICK = "click";
  var EVENT_CONTEXTMENU = "contextmenu";
  var EVENT_DBL_CLICK = "dblclick";
  var EVENT_DBL_TAP = "dbltap";
  var EVENT_FOCUS = "focus";
  var EVENT_MOUSEDOWN = "mousedown";
  var EVENT_MOUSEENTER = "mouseenter";
  var EVENT_MOUSEEXIT = "mouseexit";
  var EVENT_MOUSEMOVE = "mousemove";
  var EVENT_MOUSEUP = "mouseup";
  var EVENT_MOUSEOUT = "mouseout";
  var EVENT_MOUSEOVER = "mouseover";
  var EVENT_TAP = "tap";
  var EVENT_TOUCHSTART = "touchstart";
  var EVENT_TOUCHEND = "touchend";
  var EVENT_TOUCHMOVE = "touchmove";
  var EVENT_DRAG_MOVE = "drag:move";
  var EVENT_DRAG_STOP = "drag:stop";
  var EVENT_DRAG_START = "drag:start";
  var EVENT_REVERT = "revert";
  var EVENT_CONNECTION_ABORT = "connection:abort";
  var EVENT_CONNECTION_DRAG = "connection:drag";
  var EVENT_ELEMENT_CLICK = compoundEvent(ELEMENT, EVENT_CLICK);
  var EVENT_ELEMENT_DBL_CLICK = compoundEvent(ELEMENT, EVENT_DBL_CLICK);
  var EVENT_ELEMENT_DBL_TAP = compoundEvent(ELEMENT, EVENT_DBL_TAP);
  var EVENT_ELEMENT_MOUSE_OUT = compoundEvent(ELEMENT, EVENT_MOUSEOUT);
  var EVENT_ELEMENT_MOUSE_OVER = compoundEvent(ELEMENT, EVENT_MOUSEOVER);
  var EVENT_ELEMENT_MOUSE_MOVE = compoundEvent(ELEMENT, EVENT_MOUSEMOVE);
  var EVENT_ELEMENT_MOUSE_UP = compoundEvent(ELEMENT, EVENT_MOUSEUP);
  var EVENT_ELEMENT_MOUSE_DOWN = compoundEvent(ELEMENT, EVENT_MOUSEDOWN);
  var EVENT_ELEMENT_CONTEXTMENU = compoundEvent(ELEMENT, EVENT_CONTEXTMENU);
  var EVENT_ELEMENT_TAP = compoundEvent(ELEMENT, EVENT_TAP);
  var EVENT_ENDPOINT_CLICK = compoundEvent(ENDPOINT, EVENT_CLICK);
  var EVENT_ENDPOINT_DBL_CLICK = compoundEvent(ENDPOINT, EVENT_DBL_CLICK);
  var EVENT_ENDPOINT_DBL_TAP = compoundEvent(ENDPOINT, EVENT_DBL_TAP);
  var EVENT_ENDPOINT_MOUSEOUT = compoundEvent(ENDPOINT, EVENT_MOUSEOUT);
  var EVENT_ENDPOINT_MOUSEOVER = compoundEvent(ENDPOINT, EVENT_MOUSEOVER);
  var EVENT_ENDPOINT_MOUSEUP = compoundEvent(ENDPOINT, EVENT_MOUSEUP);
  var EVENT_ENDPOINT_MOUSEDOWN = compoundEvent(ENDPOINT, EVENT_MOUSEDOWN);
  var EVENT_ENDPOINT_TAP = compoundEvent(ENDPOINT, EVENT_TAP);
  var EVENT_CONNECTION_CLICK = compoundEvent(CONNECTION, EVENT_CLICK);
  var EVENT_CONNECTION_DBL_CLICK = compoundEvent(CONNECTION, EVENT_DBL_CLICK);
  var EVENT_CONNECTION_DBL_TAP = compoundEvent(CONNECTION, EVENT_DBL_TAP);
  var EVENT_CONNECTION_MOUSEOUT = compoundEvent(CONNECTION, EVENT_MOUSEOUT);
  var EVENT_CONNECTION_MOUSEOVER = compoundEvent(CONNECTION, EVENT_MOUSEOVER);
  var EVENT_CONNECTION_MOUSEUP = compoundEvent(CONNECTION, EVENT_MOUSEUP);
  var EVENT_CONNECTION_MOUSEDOWN = compoundEvent(CONNECTION, EVENT_MOUSEDOWN);
  var EVENT_CONNECTION_CONTEXTMENU = compoundEvent(CONNECTION, EVENT_CONTEXTMENU);
  var EVENT_CONNECTION_TAP = compoundEvent(CONNECTION, EVENT_TAP);
  var PROPERTY_POSITION = "position";
  var SELECTOR_CONNECTOR = cls(CLASS_CONNECTOR);
  var SELECTOR_ENDPOINT = cls(CLASS_ENDPOINT);
  var SELECTOR_GROUP = att(ATTRIBUTE_GROUP);
  var SELECTOR_GROUP_CONTAINER = att(ATTRIBUTE_GROUP_CONTENT);
  var SELECTOR_OVERLAY = cls(CLASS_OVERLAY);

  var _touchMap, _tapProfiles2;
  function _touch(target, pageX, pageY, screenX, screenY, clientX, clientY) {
    return new Touch({
      target: target,
      identifier: uuid(),
      pageX: pageX,
      pageY: pageY,
      screenX: screenX,
      screenY: screenY,
      clientX: clientX || screenX,
      clientY: clientY || screenY
    });
  }
  function _touchList() {
    var list = [];
    list.push.apply(list, arguments);
    list.item = function (index) {
      return this[index];
    };
    return list;
  }
  function _touchAndList(target, pageX, pageY, screenX, screenY, clientX, clientY) {
    return _touchList(_touch(target, pageX, pageY, screenX, screenY, clientX, clientY));
  }
  function matchesSelector(el, selector, ctx) {
    ctx = ctx || el.parentNode;
    var possibles = ctx.querySelectorAll(selector);
    for (var i = 0; i < possibles.length; i++) {
      if (possibles[i] === el) {
        return true;
      }
    }
    return false;
  }
  function _t(e) {
    return e.srcElement || e.target;
  }
  function _pi(e, target, obj, doCompute) {
    if (!doCompute) {
      return {
        path: [target],
        end: 1
      };
    } else {
      var path = e.composedPath ? e.composedPath() : e.path;
      if (typeof path !== "undefined" && path.indexOf) {
        return {
          path: path,
          end: path.indexOf(obj)
        };
      } else {
        var out = {
          path: [],
          end: -1
        },
            _one = function _one(el) {
          out.path.push(el);
          if (el === obj) {
            out.end = out.path.length - 1;
          } else if (el.parentNode != null) {
            _one(el.parentNode);
          }
        };
        _one(target);
        return out;
      }
    }
  }
  function _d(l, fn) {
    var i = 0,
        j;
    for (i = 0, j = l.length; i < j; i++) {
      if (l[i][0] === fn) {
        break;
      }
    }
    if (i < l.length) {
      l.splice(i, 1);
    }
  }
  var guid = 1;
  var forceTouchEvents = false;
  var forceMouseEvents = false;
  function isTouchDevice() {
    return forceTouchEvents || "ontouchstart" in document.documentElement || navigator.maxTouchPoints != null && navigator.maxTouchPoints > 0;
  }
  function isMouseDevice() {
    return forceMouseEvents || "onmousedown" in document.documentElement;
  }
  var touchMap = (_touchMap = {}, _defineProperty(_touchMap, EVENT_MOUSEDOWN, EVENT_TOUCHSTART), _defineProperty(_touchMap, EVENT_MOUSEUP, EVENT_TOUCHEND), _defineProperty(_touchMap, EVENT_MOUSEMOVE, EVENT_TOUCHMOVE), _touchMap);
  var PAGE = "page";
  var SCREEN = "screen";
  var CLIENT = "client";
  function _genLoc(e, prefix) {
    if (e == null) return {
      x: 0,
      y: 0
    };
    var ts = touches(e),
        t = getTouch(ts, 0);
    return {
      x: t[prefix + "X"],
      y: t[prefix + "Y"]
    };
  }
  function pageLocation(e) {
    return _genLoc(e, PAGE);
  }
  function screenLocation(e) {
    return _genLoc(e, SCREEN);
  }
  function clientLocation(e) {
    return _genLoc(e, CLIENT);
  }
  function getTouch(touches, idx) {
    return touches.item ? touches.item(idx) : touches[idx];
  }
  function touches(e) {
    return e.touches && e.touches.length > 0 ? e.touches : e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches : e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches : [e];
  }
  function touchCount(e) {
    return touches(e).length;
  }
  function getPageLocation(e) {
    if (e == null) {
      return {
        x: 0,
        y: 0
      };
    } else if (e.pageX !== null) {
      return {
        x: e.pageX,
        y: e.pageY
      };
    } else {
      var ts = touches(e),
          t = getTouch(ts, 0);
      if (t != null && t.pageX != null) {
        return {
          x: t.pageX,
          y: t.pageY
        };
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    }
  }
  function _bind(obj, type, fn, originalFn, options) {
    _store(obj, type, fn);
    originalFn.__tauid = fn.__tauid;
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false, options);
    } else if (obj.attachEvent) {
      var key = type + fn.__tauid;
      obj["e" + key] = fn;
      obj[key] = function () {
        obj["e" + key] && obj["e" + key](window.event);
      };
      obj.attachEvent("on" + type, obj[key]);
    }
  }
  function _unbind(obj, type, fn) {
    var _this = this;
    if (fn == null) return;
    _each$1(obj, function (_el) {
      _unstore(_el, type, fn);
      if (fn.__tauid != null) {
        if (_el.removeEventListener) {
          _el.removeEventListener(type, fn, false);
          if (isTouchDevice() && touchMap[type]) _el.removeEventListener(touchMap[type], fn, false);
        } else if (_this.detachEvent) {
          var key = type + fn.__tauid;
          _el[key] && _el.detachEvent("on" + type, _el[key]);
          _el[key] = null;
          _el["e" + key] = null;
        }
      }
      if (fn.__taTouchProxy) {
        _unbind(obj, fn.__taTouchProxy[1], fn.__taTouchProxy[0]);
      }
    });
  }
  function _each$1(obj, fn) {
    if (obj == null) return;
    var entries = typeof obj === "string" ? document.querySelectorAll(obj) : obj.length != null ? obj : [obj];
    for (var i = 0; i < entries.length; i++) {
      fn(entries[i]);
    }
  }
  function _store(obj, event, fn) {
    var g = guid++;
    obj.__ta = obj.__ta || {};
    obj.__ta[event] = obj.__ta[event] || {};
    obj.__ta[event][g] = fn;
    fn.__tauid = g;
    return g;
  }
  function _unstore(obj, event, fn) {
    obj.__ta && obj.__ta[event] && delete obj.__ta[event][fn.__tauid];
    if (fn.__taExtra) {
      for (var i = 0; i < fn.__taExtra.length; i++) {
        _unbind(obj, fn.__taExtra[i][0], fn.__taExtra[i][1]);
      }
      fn.__taExtra.length = 0;
    }
    fn.__taUnstore && fn.__taUnstore();
  }
  var NOT_SELECTOR_REGEX = /:not\(([^)]+)\)/;
  function _curryChildFilter(children, obj, fn, evt) {
    if (children == null) {
      return fn;
    } else {
      var c = children.split(","),
          pc = [],
          nc = [];
      forEach(c, function (sel) {
        var m = sel.match(NOT_SELECTOR_REGEX);
        if (m != null) {
          nc.push(m[1]);
        } else {
          pc.push(sel);
        }
      });
      if (nc.length > 0 && pc.length === 0) {
        pc.push(WILDCARD);
      }
      var _fn = function _fn(e) {
        _fn.__tauid = fn.__tauid;
        var t = _t(e);
        var done = false;
        var target = t;
        var pathInfo = _pi(e, t, obj, children != null);
        if (pathInfo.end != -1) {
          for (var p = 0; !done && p < pathInfo.end; p++) {
            target = pathInfo.path[p];
            for (var i = 0; i < nc.length; i++) {
              if (matchesSelector(target, nc[i], obj)) {
                return;
              }
            }
            for (var _i = 0; !done && _i < pc.length; _i++) {
              if (matchesSelector(target, pc[_i], obj)) {
                fn.apply(target, [e, target]);
                done = true;
                break;
              }
            }
          }
        }
      };
      registerExtraFunction(fn, evt, _fn);
      return _fn;
    }
  }
  function registerExtraFunction(fn, evt, newFn) {
    fn.__taExtra = fn.__taExtra || [];
    fn.__taExtra.push([evt, newFn]);
  }
  var DefaultHandler = function DefaultHandler(obj, evt, fn, children, options) {
    if (isTouchDevice() && touchMap[evt]) {
      var tfn = _curryChildFilter(children, obj, fn, touchMap[evt]);
      _bind(obj, touchMap[evt], tfn, fn, options);
    }
    if (evt === EVENT_FOCUS && obj.getAttribute(ATTRIBUTE_TABINDEX) == null) {
      obj.setAttribute(ATTRIBUTE_TABINDEX, "1");
    }
    _bind(obj, evt, _curryChildFilter(children, obj, fn, evt), fn, options);
  };
  var _tapProfiles = (_tapProfiles2 = {}, _defineProperty(_tapProfiles2, EVENT_TAP, {
    touches: 1,
    taps: 1
  }), _defineProperty(_tapProfiles2, EVENT_DBL_TAP, {
    touches: 1,
    taps: 2
  }), _defineProperty(_tapProfiles2, EVENT_CONTEXTMENU, {
    touches: 2,
    taps: 1
  }), _tapProfiles2);
  function meeHelper(type, evt, obj, target) {
    for (var i in obj.__tamee[type]) {
      if (obj.__tamee[type].hasOwnProperty(i)) {
        obj.__tamee[type][i].apply(target, [evt]);
      }
    }
  }
  var TapHandler = function () {
    function TapHandler() {
      _classCallCheck(this, TapHandler);
    }
    _createClass(TapHandler, null, [{
      key: "generate",
      value: function generate(clickThreshold, dblClickThreshold) {
        return function (obj, evt, fn, children) {
          if (evt == EVENT_CONTEXTMENU && isMouseDevice()) DefaultHandler(obj, evt, fn, children);else {
            if (obj.__taTapHandler == null) {
              var tt = obj.__taTapHandler = {
                tap: [],
                dbltap: [],
                down: false,
                taps: 0,
                downSelectors: []
              };
              var down = function down(e) {
                var target = _t(e),
                    pathInfo = _pi(e, target, obj, children != null),
                    finished = false;
                for (var p = 0; p < pathInfo.end; p++) {
                  if (finished) return;
                  target = pathInfo.path[p];
                  for (var i = 0; i < tt.downSelectors.length; i++) {
                    if (tt.downSelectors[i] == null || matchesSelector(target, tt.downSelectors[i], obj)) {
                      tt.down = true;
                      setTimeout(clearSingle, clickThreshold);
                      setTimeout(clearDouble, dblClickThreshold);
                      finished = true;
                      break;
                    }
                  }
                }
              },
                  up = function up(e) {
                if (tt.down) {
                  var target = _t(e),
                      currentTarget,
                      pathInfo;
                  tt.taps++;
                  var tc = touchCount(e);
                  for (var eventId in _tapProfiles) {
                    if (_tapProfiles.hasOwnProperty(eventId)) {
                      var p = _tapProfiles[eventId];
                      if (p.touches === tc && (p.taps === 1 || p.taps === tt.taps)) {
                        for (var i = 0; i < tt[eventId].length; i++) {
                          pathInfo = _pi(e, target, obj, tt[eventId][i][1] != null);
                          for (var pLoop = 0; pLoop < pathInfo.end; pLoop++) {
                            currentTarget = pathInfo.path[pLoop];
                            if (tt[eventId][i][1] == null || matchesSelector(currentTarget, tt[eventId][i][1], obj)) {
                              tt[eventId][i][0].apply(currentTarget, [e, currentTarget]);
                              break;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
                  clearSingle = function clearSingle() {
                tt.down = false;
              },
                  clearDouble = function clearDouble() {
                tt.taps = 0;
              };
              obj.__taTapHandler.downHandler = down;
              obj.__taTapHandler.upHandler = up;
              DefaultHandler(obj, EVENT_MOUSEDOWN, down);
              DefaultHandler(obj, EVENT_MOUSEUP, up);
            }
            obj.__taTapHandler.downSelectors.push(children);
            obj.__taTapHandler[evt].push([fn, children]);
            fn.__taUnstore = function () {
              if (obj.__taTapHandler != null) {
                removeWithFunction(obj.__taTapHandler.downSelectors, function (ds) {
                  return ds === children;
                });
                _d(obj.__taTapHandler[evt], fn);
                if (obj.__taTapHandler.downSelectors.length === 0) {
                  _unbind(obj, EVENT_MOUSEDOWN, obj.__taTapHandler.downHandler);
                  _unbind(obj, EVENT_MOUSEUP, obj.__taTapHandler.upHandler);
                  delete obj.__taTapHandler;
                }
              }
            };
          }
        };
      }
    }]);
    return TapHandler;
  }();
  var MouseEnterExitHandler = function () {
    function MouseEnterExitHandler() {
      _classCallCheck(this, MouseEnterExitHandler);
    }
    _createClass(MouseEnterExitHandler, null, [{
      key: "generate",
      value: function generate() {
        var activeElements = [];
        return function (obj, evt, fn, children) {
          if (!obj.__tamee) {
            obj.__tamee = {
              over: false,
              mouseenter: [],
              mouseexit: []
            };
            var over = function over(e) {
              var t = _t(e);
              if (children == null && t == obj && !obj.__tamee.over || matchesSelector(t, children, obj) && (t.__tamee == null || !t.__tamee.over)) {
                meeHelper(EVENT_MOUSEENTER, e, obj, t);
                t.__tamee = t.__tamee || {};
                t.__tamee.over = true;
                activeElements.push(t);
              }
            },
                out = function out(e) {
              var t = _t(e);
              for (var i = 0; i < activeElements.length; i++) {
                if (t == activeElements[i] && !matchesSelector(e.relatedTarget || e.toElement, "*", t)) {
                  t.__tamee.over = false;
                  activeElements.splice(i, 1);
                  meeHelper(EVENT_MOUSEEXIT, e, obj, t);
                }
              }
            };
            _bind(obj, EVENT_MOUSEOVER, _curryChildFilter(children, obj, over, EVENT_MOUSEOVER), over);
            _bind(obj, EVENT_MOUSEOUT, _curryChildFilter(children, obj, out, EVENT_MOUSEOUT), out);
          }
          fn.__taUnstore = function () {
            delete obj.__tamee[evt][fn.__tauid];
          };
          _store(obj, evt, fn);
          obj.__tamee[evt][fn.__tauid] = fn;
        };
      }
    }]);
    return MouseEnterExitHandler;
  }();
  var EventManager = function () {
    function EventManager(params) {
      _classCallCheck(this, EventManager);
      _defineProperty(this, "clickThreshold", void 0);
      _defineProperty(this, "dblClickThreshold", void 0);
      _defineProperty(this, "tapHandler", void 0);
      _defineProperty(this, "mouseEnterExitHandler", void 0);
      params = params || {};
      this.clickThreshold = params.clickThreshold || 250;
      this.dblClickThreshold = params.dblClickThreshold || 450;
      this.mouseEnterExitHandler = MouseEnterExitHandler.generate();
      this.tapHandler = TapHandler.generate(this.clickThreshold, this.dblClickThreshold);
    }
    _createClass(EventManager, [{
      key: "_doBind",
      value: function _doBind(el, evt, fn, children, options) {
        if (fn == null) return;
        var jel = el;
        if (evt === EVENT_TAP || evt === EVENT_DBL_TAP || evt === EVENT_CONTEXTMENU) {
          this.tapHandler(jel, evt, fn, children, options);
        } else if (evt === EVENT_MOUSEENTER || evt == EVENT_MOUSEEXIT) this.mouseEnterExitHandler(jel, evt, fn, children, options);else {
          DefaultHandler(jel, evt, fn, children, options);
        }
      }
    }, {
      key: "on",
      value: function on(el, event, children, fn, options) {
        var _c = fn == null ? null : children,
            _f = fn == null ? children : fn;
        this._doBind(el, event, _f, _c, options);
        return this;
      }
    }, {
      key: "off",
      value: function off(el, event, fn) {
        _unbind(el, event, fn);
        return this;
      }
    }, {
      key: "trigger",
      value: function trigger(el, event, originalEvent, payload, detail) {
        var originalIsMouse = isMouseDevice() && (typeof MouseEvent === "undefined" || originalEvent == null || originalEvent.constructor === MouseEvent);
        var eventToBind = isTouchDevice() && !isMouseDevice() && touchMap[event] ? touchMap[event] : event,
            bindingAMouseEvent = !(isTouchDevice() && !isMouseDevice() && touchMap[event]);
        var pl = pageLocation(originalEvent),
            sl = screenLocation(originalEvent),
            cl = clientLocation(originalEvent);
        _each$1(el, function (_el) {
          var evt;
          originalEvent = originalEvent || {
            screenX: sl.x,
            screenY: sl.y,
            clientX: cl.x,
            clientY: cl.y
          };
          var _decorate = function _decorate(_evt) {
            if (payload) {
              _evt.payload = payload;
            }
          };
          var eventGenerators = {
            "TouchEvent": function TouchEvent(evt) {
              var touchList = _touchAndList(_el, pl.x, pl.y, sl.x, sl.y, cl.x, cl.y),
                  init = evt.initTouchEvent || evt.initEvent;
              init(eventToBind, true, true, window, null, sl.x, sl.y, cl.x, cl.y, false, false, false, false, touchList, touchList, touchList, 1, 0);
            },
            "MouseEvents": function MouseEvents(evt) {
              evt.initMouseEvent(eventToBind, true, true, window, detail == null ? 1 : detail, sl.x, sl.y, cl.x, cl.y, false, false, false, false, 1, _el);
            }
          };
          var ite = !bindingAMouseEvent && !originalIsMouse && isTouchDevice() && touchMap[event],
              evtName = ite ? "TouchEvent" : "MouseEvents";
          evt = document.createEvent(evtName);
          eventGenerators[evtName](evt);
          _decorate(evt);
          _el.dispatchEvent(evt);
        });
        return this;
      }
    }]);
    return EventManager;
  }();
  function setForceTouchEvents(value) {
    forceTouchEvents = value;
  }
  function setForceMouseEvents(value) {
    forceMouseEvents = value;
  }

  function findDelegateElement(parentElement, childElement, selector) {
    if (matchesSelector$1(childElement, selector, parentElement)) {
      return childElement;
    } else {
      var currentParent = childElement.parentNode;
      while (currentParent != null && currentParent !== parentElement) {
        if (matchesSelector$1(currentParent, selector, parentElement)) {
          return currentParent;
        } else {
          currentParent = currentParent.parentNode;
        }
      }
    }
  }
  function _assignId(obj) {
    if (typeof obj === "function") {
      obj._katavorioId = uuid();
      return obj._katavorioId;
    } else {
      return obj;
    }
  }
  function isInsideParent(instance, _el, pos) {
    var p = _el.parentNode,
        s = instance.getSize(p),
        ss = instance.getSize(_el),
        leftEdge = pos.x,
        rightEdge = leftEdge + ss.w,
        topEdge = pos.y,
        bottomEdge = topEdge + ss.h;
    return rightEdge > 0 && leftEdge < s.w && bottomEdge > 0 && topEdge < s.h;
  }
  function findMatchingSelector(availableSelectors, parentElement, childElement) {
    var el = null;
    var draggableId = parentElement.getAttribute("katavorio-draggable"),
        prefix = draggableId != null ? "[katavorio-draggable='" + draggableId + "'] " : "";
    for (var i = 0; i < availableSelectors.length; i++) {
      el = findDelegateElement(parentElement, childElement, prefix + availableSelectors[i].selector);
      if (el != null) {
        if (availableSelectors[i].filter) {
          var matches = matchesSelector$1(childElement, availableSelectors[i].filter, el),
              exclude = availableSelectors[i].filterExclude === true;
          if (exclude && !matches || matches) {
            return null;
          }
        }
        return [availableSelectors[i], el];
      }
    }
    return null;
  }
  var EVENT_START = "start";
  var EVENT_BEFORE_START = "beforeStart";
  var EVENT_DRAG = "drag";
  var EVENT_DROP = "drop";
  var EVENT_OVER = "over";
  var EVENT_OUT = "out";
  var EVENT_STOP = "stop";
  var ATTRIBUTE_DRAGGABLE = "katavorio-draggable";
  var CLASS_DRAGGABLE$1 = ATTRIBUTE_DRAGGABLE;
  var DEFAULT_GRID_X = 10;
  var DEFAULT_GRID_Y = 10;
  var TRUE = function TRUE() {
    return true;
  };
  var FALSE = function FALSE() {
    return false;
  };
  var _classes = {
    delegatedDraggable: "katavorio-delegated-draggable",
    draggable: CLASS_DRAGGABLE$1,
    drag: "katavorio-drag",
    selected: "katavorio-drag-selected",
    noSelect: "katavorio-drag-no-select",
    ghostProxy: "katavorio-ghost-proxy",
    clonedDrag: "katavorio-clone-drag"
  };
  exports.PositioningStrategies = void 0;
  (function (PositioningStrategies) {
    PositioningStrategies["absolutePosition"] = "absolutePosition";
    PositioningStrategies["transform"] = "transform";
    PositioningStrategies["xyAttributes"] = "xyAttributes";
  })(exports.PositioningStrategies || (exports.PositioningStrategies = {}));
  var positionerSetters = new Map();
  positionerSetters.set(exports.PositioningStrategies.absolutePosition, function (el, p) {
    el.style.left = "".concat(p.x, "px");
    el.style.top = "".concat(p.y, "px");
  });
  positionerSetters.set(exports.PositioningStrategies.xyAttributes, function (el, p) {
    el.setAttribute("x", "".concat(p.x));
    el.setAttribute("y", "".concat(p.y));
  });
  var positionerGetters = new Map();
  positionerGetters.set(exports.PositioningStrategies.absolutePosition, function (el) {
    return {
      x: el.offsetLeft,
      y: el.offsetTop
    };
  });
  positionerGetters.set(exports.PositioningStrategies.xyAttributes, function (el) {
    return {
      x: parseFloat(el.getAttribute("x")),
      y: parseFloat(el.getAttribute("y"))
    };
  });
  var sizeSetters = new Map();
  sizeSetters.set(exports.PositioningStrategies.absolutePosition, function (el, s) {
    el.style.width = "".concat(s.w, "px");
    el.style.height = "".concat(s.h, "px");
  });
  sizeSetters.set(exports.PositioningStrategies.xyAttributes, function (el, s) {
    el.setAttribute("width", "".concat(s.w));
    el.setAttribute("height", "".concat(s.h));
  });
  var sizeGetters = new Map();
  sizeGetters.set(exports.PositioningStrategies.absolutePosition, function (el) {
    return {
      w: el.offsetWidth,
      h: el.offsetHeight
    };
  });
  sizeGetters.set(exports.PositioningStrategies.xyAttributes, function (el) {
    return {
      w: parseFloat(el.getAttribute("width")),
      h: parseFloat(el.getAttribute("height"))
    };
  });
  var _events = [EVENT_STOP, EVENT_START, EVENT_DRAG, EVENT_DROP, EVENT_OVER, EVENT_OUT, EVENT_BEFORE_START];
  var _devNull = function _devNull() {};
  var _each = function _each(obj, fn) {
    if (obj == null) return;
    obj = !isString(obj) && obj.tagName == null && obj.length != null ? obj : [obj];
    for (var i = 0; i < obj.length; i++) {
      fn.apply(obj[i], [obj[i]]);
    }
  };
  var _inputFilter = function _inputFilter(e, el, collicat) {
    var t = e.srcElement || e.target;
    return !matchesSelector$1(t, collicat.getInputFilterSelector(), el);
  };
  var Base = function () {
    function Base(el, manager) {
      _classCallCheck(this, Base);
      this.el = el;
      this.manager = manager;
      _defineProperty(this, "_class", void 0);
      _defineProperty(this, "uuid", uuid());
      _defineProperty(this, "enabled", true);
      _defineProperty(this, "scopes", []);
      _defineProperty(this, "eventManager", void 0);
      this.eventManager = manager.eventManager;
    }
    _createClass(Base, [{
      key: "setEnabled",
      value: function setEnabled(e) {
        this.enabled = e;
      }
    }, {
      key: "isEnabled",
      value: function isEnabled() {
        return this.enabled;
      }
    }, {
      key: "toggleEnabled",
      value: function toggleEnabled() {
        this.enabled = !this.enabled;
      }
    }, {
      key: "addScope",
      value: function addScope(scopes) {
        var m = {};
        _each(this.scopes, function (s) {
          m[s] = true;
        });
        _each(scopes ? scopes.split(/\s+/) : [], function (s) {
          m[s] = true;
        });
        this.scopes.length = 0;
        for (var i in m) {
          this.scopes.push(i);
        }
      }
    }, {
      key: "removeScope",
      value: function removeScope(scopes) {
        var m = {};
        _each(this.scopes, function (s) {
          m[s] = true;
        });
        _each(scopes ? scopes.split(/\s+/) : [], function (s) {
          delete m[s];
        });
        this.scopes.length = 0;
        for (var i in m) {
          this.scopes.push(i);
        }
      }
    }, {
      key: "toggleScope",
      value: function toggleScope(scopes) {
        var m = {};
        _each(this.scopes, function (s) {
          m[s] = true;
        });
        _each(scopes ? scopes.split(/\s+/) : [], function (s) {
          if (m[s]) delete m[s];else m[s] = true;
        });
        this.scopes.length = 0;
        for (var i in m) {
          this.scopes.push(i);
        }
      }
    }]);
    return Base;
  }();
  function getConstrainingRectangle(el) {
    return {
      w: el.parentNode.offsetWidth + el.parentNode.scrollLeft,
      h: el.parentNode.offsetHeight + el.parentNode.scrollTop
    };
  }
  exports.ContainmentType = void 0;
  (function (ContainmentType) {
    ContainmentType["notNegative"] = "notNegative";
    ContainmentType["parent"] = "parent";
    ContainmentType["parentEnclosed"] = "parentEnclosed";
  })(exports.ContainmentType || (exports.ContainmentType = {}));
  var Drag = function (_Base) {
    _inherits(Drag, _Base);
    var _super = _createSuper(Drag);
    function Drag(el, params, manager) {
      var _this;
      _classCallCheck(this, Drag);
      _this = _super.call(this, el, manager);
      _defineProperty(_assertThisInitialized(_this), "_class", void 0);
      _defineProperty(_assertThisInitialized(_this), "rightButtonCanDrag", void 0);
      _defineProperty(_assertThisInitialized(_this), "consumeStartEvent", void 0);
      _defineProperty(_assertThisInitialized(_this), "clone", void 0);
      _defineProperty(_assertThisInitialized(_this), "scroll", void 0);
      _defineProperty(_assertThisInitialized(_this), "trackScroll", void 0);
      _defineProperty(_assertThisInitialized(_this), "_downAt", void 0);
      _defineProperty(_assertThisInitialized(_this), "_posAtDown", void 0);
      _defineProperty(_assertThisInitialized(_this), "_pagePosAtDown", void 0);
      _defineProperty(_assertThisInitialized(_this), "_pageDelta", {
        x: 0,
        y: 0
      });
      _defineProperty(_assertThisInitialized(_this), "_moving", void 0);
      _defineProperty(_assertThisInitialized(_this), "_lastPosition", void 0);
      _defineProperty(_assertThisInitialized(_this), "_lastScrollValues", {
        x: 0,
        y: 0
      });
      _defineProperty(_assertThisInitialized(_this), "_initialScroll", {
        x: 0,
        y: 0
      });
      _defineProperty(_assertThisInitialized(_this), "_size", void 0);
      _defineProperty(_assertThisInitialized(_this), "_currentParentPosition", void 0);
      _defineProperty(_assertThisInitialized(_this), "_ghostParentPosition", void 0);
      _defineProperty(_assertThisInitialized(_this), "_dragEl", void 0);
      _defineProperty(_assertThisInitialized(_this), "_multipleDrop", void 0);
      _defineProperty(_assertThisInitialized(_this), "_ghostProxyOffsets", void 0);
      _defineProperty(_assertThisInitialized(_this), "_ghostDx", void 0);
      _defineProperty(_assertThisInitialized(_this), "_ghostDy", void 0);
      _defineProperty(_assertThisInitialized(_this), "_isConstrained", false);
      _defineProperty(_assertThisInitialized(_this), "_ghostProxyParent", void 0);
      _defineProperty(_assertThisInitialized(_this), "_useGhostProxy", void 0);
      _defineProperty(_assertThisInitialized(_this), "_ghostProxyFunction", void 0);
      _defineProperty(_assertThisInitialized(_this), "_activeSelectorParams", void 0);
      _defineProperty(_assertThisInitialized(_this), "_availableSelectors", []);
      _defineProperty(_assertThisInitialized(_this), "_canDrag", void 0);
      _defineProperty(_assertThisInitialized(_this), "_consumeFilteredEvents", void 0);
      _defineProperty(_assertThisInitialized(_this), "_parent", void 0);
      _defineProperty(_assertThisInitialized(_this), "_ignoreZoom", void 0);
      _defineProperty(_assertThisInitialized(_this), "_filters", {});
      _defineProperty(_assertThisInitialized(_this), "_constrainRect", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementToDrag", void 0);
      _defineProperty(_assertThisInitialized(_this), "downListener", void 0);
      _defineProperty(_assertThisInitialized(_this), "moveListener", void 0);
      _defineProperty(_assertThisInitialized(_this), "upListener", void 0);
      _defineProperty(_assertThisInitialized(_this), "scrollTracker", void 0);
      _defineProperty(_assertThisInitialized(_this), "listeners", {
        "start": [],
        "drag": [],
        "stop": [],
        "over": [],
        "out": [],
        "beforeStart": [],
        "revert": []
      });
      _this._class = _this.manager.css.draggable;
      addClass(_this.el, _this._class);
      _this.downListener = _this._downListener.bind(_assertThisInitialized(_this));
      _this.upListener = _this._upListener.bind(_assertThisInitialized(_this));
      _this.moveListener = _this._moveListener.bind(_assertThisInitialized(_this));
      _this.rightButtonCanDrag = params.rightButtonCanDrag === true;
      _this.consumeStartEvent = params.consumeStartEvent !== false;
      _this._dragEl = _this.el;
      _this.clone = params.clone === true;
      _this.scroll = params.scroll === true;
      _this.trackScroll = params.trackScroll !== false;
      _this._multipleDrop = params.multipleDrop !== false;
      _this._canDrag = params.canDrag || TRUE;
      _this._consumeFilteredEvents = params.consumeFilteredEvents;
      _this._parent = params.parent;
      _this._ignoreZoom = params.ignoreZoom === true;
      _this._ghostProxyParent = params.ghostProxyParent;
      if (_this.trackScroll) {
        _this.scrollTracker = _this._trackScroll.bind(_assertThisInitialized(_this));
        document.addEventListener("scroll", _this.scrollTracker);
      }
      if (params.ghostProxy === true) {
        _this._useGhostProxy = TRUE;
      } else {
        if (params.ghostProxy && typeof params.ghostProxy === "function") {
          _this._useGhostProxy = params.ghostProxy;
        } else {
          _this._useGhostProxy = function (container, dragEl) {
            if (_this._activeSelectorParams && _this._activeSelectorParams.useGhostProxy) {
              return _this._activeSelectorParams.useGhostProxy(container, dragEl);
            } else {
              return false;
            }
          };
        }
      }
      if (params.makeGhostProxy) {
        _this._ghostProxyFunction = params.makeGhostProxy;
      } else {
        _this._ghostProxyFunction = function (el) {
          if (_this._activeSelectorParams && _this._activeSelectorParams.makeGhostProxy) {
            return _this._activeSelectorParams.makeGhostProxy(el);
          } else {
            return el.cloneNode(true);
          }
        };
      }
      if (params.selector) {
        var draggableId = _this.el.getAttribute(ATTRIBUTE_DRAGGABLE);
        if (draggableId == null) {
          draggableId = "" + new Date().getTime();
          _this.el.setAttribute("katavorio-draggable", draggableId);
        }
        _this._availableSelectors.push(params);
      }
      _this.eventManager.on(_this.el, EVENT_MOUSEDOWN, _this.downListener);
      return _this;
    }
    _createClass(Drag, [{
      key: "_trackScroll",
      value: function _trackScroll(e) {
        if (this._moving) {
          var currentScrollValues = {
            x: document.documentElement.scrollLeft,
            y: document.documentElement.scrollTop
          },
              dsx = currentScrollValues.x - this._lastScrollValues.x,
              dsy = currentScrollValues.y - this._lastScrollValues.y,
              _pos = {
            x: dsx + this._lastPosition.x,
            y: dsy + this._lastPosition.y
          },
          dx = _pos.x - this._downAt.x,
              dy = _pos.y - this._downAt.y,
              _z = this._ignoreZoom ? 1 : this.manager.getZoom();
          if (this._dragEl && this._dragEl.parentNode) {
            dx += this._dragEl.parentNode.scrollLeft - this._initialScroll.x;
            dy += this._dragEl.parentNode.scrollTop - this._initialScroll.y;
          }
          dx /= _z;
          dy /= _z;
          this.moveBy(dx, dy, e);
          this._lastPosition = _pos;
          this._lastScrollValues = currentScrollValues;
        }
      }
    }, {
      key: "on",
      value: function on(evt, fn) {
        if (this.listeners[evt]) {
          this.listeners[evt].push(fn);
        }
      }
    }, {
      key: "off",
      value: function off(evt, fn) {
        if (this.listeners[evt]) {
          var l = [];
          for (var i = 0; i < this.listeners[evt].length; i++) {
            if (this.listeners[evt][i] !== fn) {
              l.push(this.listeners[evt][i]);
            }
          }
          this.listeners[evt] = l;
        }
      }
    }, {
      key: "_upListener",
      value: function _upListener(e) {
        if (this._downAt) {
          this._downAt = null;
          this.eventManager.off(document, EVENT_MOUSEMOVE, this.moveListener);
          this.eventManager.off(document, EVENT_MOUSEUP, this.upListener);
          removeClass(document.body, _classes.noSelect);
          this.unmark(e);
          this.stop(e);
          this._moving = false;
          if (this.clone) {
            this._dragEl && this._dragEl.parentNode && this._dragEl.parentNode.removeChild(this._dragEl);
            this._dragEl = null;
          } else {
            if (this._activeSelectorParams && this._activeSelectorParams.revertFunction) {
              if (this._activeSelectorParams.revertFunction(this._dragEl, this.manager.getPosition(this._dragEl)) === true) {
                this.manager.setPosition(this._dragEl, this._posAtDown);
                this._dispatch(EVENT_REVERT, this._dragEl);
              }
            }
          }
        }
      }
    }, {
      key: "_downListener",
      value: function _downListener(e) {
        if (e.defaultPrevented) {
          return;
        }
        var isNotRightClick = this.rightButtonCanDrag || e.which !== 3 && e.button !== 2;
        if (isNotRightClick && this.isEnabled() && this._canDrag()) {
          var _f = this._testFilter(e) && _inputFilter(e, this.el, this.manager);
          if (_f) {
            this._activeSelectorParams = null;
            this._elementToDrag = null;
            if (this._availableSelectors.length === 0) {
              console.log("JSPLUMB: no available drag selectors");
            }
            var eventTarget = e.target || e.srcElement;
            var match = findMatchingSelector(this._availableSelectors, this.el, eventTarget);
            if (match != null) {
              this._activeSelectorParams = match[0];
              this._elementToDrag = match[1];
            }
            if (this._activeSelectorParams == null || this._elementToDrag == null) {
              return;
            }
            var initial = this._activeSelectorParams.dragInit ? this._activeSelectorParams.dragInit(this._elementToDrag, e) : null;
            if (initial != null) {
              this._elementToDrag = initial;
            }
            if (this.clone) {
              this._dragEl = this._elementToDrag.cloneNode(true);
              addClass(this._dragEl, _classes.clonedDrag);
              this._dragEl.setAttribute("id", null);
              this._dragEl.style.position = "absolute";
              if (this._parent != null) {
                var _p2 = this.manager.getPosition(this.el);
                this._dragEl.style.left = _p2.x + "px";
                this._dragEl.style.top = _p2.y + "px";
                this._parent.appendChild(this._dragEl);
              } else {
                var b = offsetRelativeToRoot(this._elementToDrag);
                this._dragEl.style.left = b.x + "px";
                this._dragEl.style.top = b.y + "px";
                document.body.appendChild(this._dragEl);
              }
            } else {
              this._dragEl = this._elementToDrag;
            }
            if (this.consumeStartEvent) {
              consume(e);
            }
            this._downAt = pageLocation(e);
            if (this._dragEl && this._dragEl.parentNode) {
              this._initialScroll = {
                x: this._dragEl.parentNode.scrollLeft,
                y: this._dragEl.parentNode.scrollTop
              };
            }
            this._posAtDown = this.manager.getPosition(this._dragEl);
            this._pagePosAtDown = offsetRelativeToRoot(this._dragEl);
            this._pageDelta = {
              x: this._pagePosAtDown.x - this._posAtDown.x,
              y: this._pagePosAtDown.y - this._posAtDown.y
            };
            this._size = this.manager.getSize(this._dragEl);
            this.eventManager.on(document, EVENT_MOUSEMOVE, this.moveListener);
            this.eventManager.on(document, EVENT_MOUSEUP, this.upListener);
            addClass(document.body, _classes.noSelect);
            this._dispatch(EVENT_BEFORE_START, {
              el: this.el,
              pos: this._posAtDown,
              e: e,
              drag: this,
              size: this._size
            });
          } else if (this._consumeFilteredEvents) {
            consume(e);
          }
        }
      }
    }, {
      key: "_moveListener",
      value: function _moveListener(e) {
        if (this._downAt) {
          if (!this._moving) {
            var dispatchResult = this._dispatch(EVENT_START, {
              el: this.el,
              pos: this._posAtDown,
              e: e,
              drag: this,
              size: this._size
            });
            if (dispatchResult !== false) {
              if (!this._downAt) {
                return;
              }
              this.mark(dispatchResult);
              this._moving = true;
            } else {
              this.abort();
            }
          }
          if (this._downAt) {
            var _pos2 = pageLocation(e),
                dx = _pos2.x - this._downAt.x,
                dy = _pos2.y - this._downAt.y,
                _z2 = this._ignoreZoom ? 1 : this.manager.getZoom();
            this._lastPosition = {
              x: _pos2.x,
              y: _pos2.y
            };
            this._lastScrollValues = {
              x: document.documentElement.scrollLeft,
              y: document.documentElement.scrollTop
            };
            if (this._dragEl && this._dragEl.parentNode) {
              dx += this._dragEl.parentNode.scrollLeft - this._initialScroll.x;
              dy += this._dragEl.parentNode.scrollTop - this._initialScroll.y;
            }
            dx /= _z2;
            dy /= _z2;
            this.moveBy(dx, dy, e);
          }
        }
      }
    }, {
      key: "getDragDelta",
      value: function getDragDelta() {
        if (this._posAtDown != null && this._downAt != null) {
          return {
            x: this._downAt.x - this._posAtDown.x,
            y: this._downAt.y - this._posAtDown.y
          };
        } else {
          return {
            x: 0,
            y: 0
          };
        }
      }
    }, {
      key: "mark",
      value: function mark(payload) {
        this._posAtDown = this.manager.getPosition(this._dragEl);
        this._pagePosAtDown = offsetRelativeToRoot(this._dragEl);
        this._pageDelta = {
          x: this._pagePosAtDown.x - this._posAtDown.x,
          y: this._pagePosAtDown.y - this._posAtDown.y
        };
        this._size = this.manager.getSize(this._dragEl);
        addClass(this._dragEl, this.manager.css.drag);
        this._constrainRect = getConstrainingRectangle(this._dragEl);
        this._ghostDx = 0;
        this._ghostDy = 0;
      }
    }, {
      key: "unmark",
      value: function unmark(e) {
        if (this._isConstrained && this._useGhostProxy(this._elementToDrag, this._dragEl)) {
          this._ghostProxyOffsets = {
            x: this._dragEl.offsetLeft - this._ghostDx,
            y: this._dragEl.offsetTop - this._ghostDy
          };
          this._dragEl.parentNode.removeChild(this._dragEl);
          this._dragEl = this._elementToDrag;
        } else {
          this._ghostProxyOffsets = null;
        }
        removeClass(this._dragEl, this.manager.css.drag);
        this._isConstrained = false;
      }
    }, {
      key: "moveBy",
      value: function moveBy(dx, dy, e) {
        var desiredLoc = this.toGrid({
          x: this._posAtDown.x + dx,
          y: this._posAtDown.y + dy
        }),
            cPos = this._doConstrain(desiredLoc, this._dragEl, this._constrainRect, this._size, e);
        if (cPos != null) {
          if (this._useGhostProxy(this.el, this._dragEl)) {
            if (desiredLoc.x !== cPos.x || desiredLoc.y !== cPos.y) {
              if (!this._isConstrained) {
                var gp = this._ghostProxyFunction(this._elementToDrag);
                addClass(gp, _classes.ghostProxy);
                if (this._ghostProxyParent) {
                  this._ghostProxyParent.appendChild(gp);
                  this._currentParentPosition = offsetRelativeToRoot(this._elementToDrag.parentNode);
                  this._ghostParentPosition = offsetRelativeToRoot(this._ghostProxyParent);
                  this._ghostDx = this._currentParentPosition.x - this._ghostParentPosition.x;
                  this._ghostDy = this._currentParentPosition.y - this._ghostParentPosition.y;
                } else {
                  this._elementToDrag.parentNode.appendChild(gp);
                }
                this._dragEl = gp;
                this._isConstrained = true;
              }
              cPos = desiredLoc;
            } else {
              if (this._isConstrained) {
                this._dragEl.parentNode.removeChild(this._dragEl);
                this._dragEl = this._elementToDrag;
                this._isConstrained = false;
                this._currentParentPosition = null;
                this._ghostParentPosition = null;
                this._ghostDx = 0;
                this._ghostDy = 0;
              }
            }
          }
          this.manager.setPosition(this._dragEl, {
            x: cPos.x + this._ghostDx,
            y: cPos.y + this._ghostDy
          });
          this._dispatch(EVENT_DRAG, {
            el: this.el,
            pos: cPos,
            e: e,
            drag: this,
            size: this._size,
            originalPos: this._posAtDown
          });
        }
      }
    }, {
      key: "abort",
      value: function abort() {
        if (this._downAt != null) {
          this._upListener();
        }
      }
    }, {
      key: "getDragElement",
      value: function getDragElement(retrieveOriginalElement) {
        return retrieveOriginalElement ? this._elementToDrag || this.el : this._dragEl || this.el;
      }
    }, {
      key: "stop",
      value: function stop(e, force) {
        if (force || this._moving) {
          var positions = [],
              dPos = this.manager.getPosition(this._dragEl);
          positions.push([this._dragEl, dPos, this, this._size]);
          this._dispatch(EVENT_STOP, {
            el: this._dragEl,
            pos: this._ghostProxyOffsets || dPos,
            finalPos: dPos,
            e: e,
            drag: this,
            selection: positions,
            size: this._size,
            originalPos: {
              x: this._posAtDown.x,
              y: this._posAtDown.y
            }
          });
        } else if (!this._moving) {
          this._activeSelectorParams.dragAbort ? this._activeSelectorParams.dragAbort(this._elementToDrag) : null;
        }
      }
    }, {
      key: "_dispatch",
      value: function _dispatch(evt, value) {
        var result = null;
        if (this._activeSelectorParams && this._activeSelectorParams[evt]) {
          result = this._activeSelectorParams[evt](value);
        } else if (this.listeners[evt]) {
          for (var i = 0; i < this.listeners[evt].length; i++) {
            try {
              var v = this.listeners[evt][i](value);
              if (v != null) {
                result = v;
              }
            } catch (e) {}
          }
        }
        return result;
      }
    }, {
      key: "resolveGrid",
      value: function resolveGrid() {
        var out = {
          grid: null,
          thresholdX: DEFAULT_GRID_X / 2,
          thresholdY: DEFAULT_GRID_Y / 2
        };
        if (this._activeSelectorParams != null && this._activeSelectorParams.grid != null) {
          out.grid = this._activeSelectorParams.grid;
          if (this._activeSelectorParams.snapThreshold != null) {
            out.thresholdX = this._activeSelectorParams.snapThreshold;
            out.thresholdY = this._activeSelectorParams.snapThreshold;
          }
        }
        return out;
      }
    }, {
      key: "toGrid",
      value: function toGrid(pos) {
        var _this$resolveGrid = this.resolveGrid(),
            grid = _this$resolveGrid.grid,
            thresholdX = _this$resolveGrid.thresholdX,
            thresholdY = _this$resolveGrid.thresholdY;
        if (grid == null) {
          return pos;
        } else {
          var tx = grid ? grid.w / 2 : thresholdX,
              ty = grid ? grid.h / 2 : thresholdY;
          return snapToGrid(pos, grid, tx, ty);
        }
      }
    }, {
      key: "setUseGhostProxy",
      value: function setUseGhostProxy(val) {
        this._useGhostProxy = val ? TRUE : FALSE;
      }
    }, {
      key: "_doConstrain",
      value: function _doConstrain(pos, dragEl, _constrainRect, _size, e) {
        if (this._activeSelectorParams != null && this._activeSelectorParams.constrainFunction && typeof this._activeSelectorParams.constrainFunction === "function") {
          return this._activeSelectorParams.constrainFunction(pos, dragEl, _constrainRect, _size, e);
        } else {
          return pos;
        }
      }
    }, {
      key: "_testFilter",
      value: function _testFilter(e) {
        for (var key in this._filters) {
          var f = this._filters[key];
          var rv = f[0](e);
          if (f[1]) {
            rv = !rv;
          }
          if (!rv) {
            return false;
          }
        }
        return true;
      }
    }, {
      key: "addFilter",
      value: function addFilter(f, _exclude) {
        var _this2 = this;
        if (f) {
          var key = _assignId(f);
          this._filters[key] = [function (e) {
            var t = e.srcElement || e.target;
            var m;
            if (isString(f)) {
              m = matchesSelector$1(t, f, _this2.el);
            } else if (typeof f === "function") {
              m = f(e, _this2.el);
            }
            return m;
          }, _exclude !== false];
        }
      }
    }, {
      key: "removeFilter",
      value: function removeFilter(f) {
        var key = typeof f === "function" ? f._katavorioId : f;
        delete this._filters[key];
      }
    }, {
      key: "clearAllFilters",
      value: function clearAllFilters() {
        this._filters = {};
      }
    }, {
      key: "addSelector",
      value: function addSelector(params, atStart) {
        if (params.selector) {
          if (atStart) {
            this._availableSelectors.unshift(params);
          } else {
            this._availableSelectors.push(params);
          }
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.eventManager.off(this.el, EVENT_MOUSEDOWN, this.downListener);
        this.eventManager.off(document, EVENT_MOUSEMOVE, this.moveListener);
        this.eventManager.off(document, EVENT_MOUSEUP, this.upListener);
        this.downListener = null;
        this.upListener = null;
        this.moveListener = null;
        if (this.scrollTracker != null) {
          document.removeEventListener("scroll", this.scrollTracker);
        }
      }
    }]);
    return Drag;
  }(Base);
  var DEFAULT_INPUTS = ["input", "textarea", "select", "button", "option"];
  var DEFAULT_INPUT_FILTER_SELECTOR = DEFAULT_INPUTS.join(",");
  var Collicat = function () {
    function Collicat(options) {
      _classCallCheck(this, Collicat);
      _defineProperty(this, "eventManager", void 0);
      _defineProperty(this, "zoom", 1);
      _defineProperty(this, "css", {});
      _defineProperty(this, "inputFilterSelector", void 0);
      _defineProperty(this, "positioningStrategy", void 0);
      _defineProperty(this, "_positionSetter", void 0);
      _defineProperty(this, "_positionGetter", void 0);
      _defineProperty(this, "_sizeSetter", void 0);
      _defineProperty(this, "_sizeGetter", void 0);
      options = options || {};
      this.inputFilterSelector = options.inputFilterSelector || DEFAULT_INPUT_FILTER_SELECTOR;
      this.eventManager = new EventManager();
      this.zoom = options.zoom || 1;
      this.positioningStrategy = options.positioningStrategy || exports.PositioningStrategies.absolutePosition;
      this._positionGetter = positionerGetters.get(this.positioningStrategy);
      this._positionSetter = positionerSetters.get(this.positioningStrategy);
      this._sizeGetter = sizeGetters.get(this.positioningStrategy);
      this._sizeSetter = sizeSetters.get(this.positioningStrategy);
      var _c = options.css || {};
      extend(this.css, _c);
    }
    _createClass(Collicat, [{
      key: "getPosition",
      value: function getPosition(el) {
        return this._positionGetter(el);
      }
    }, {
      key: "setPosition",
      value: function setPosition(el, p) {
        this._positionSetter(el, p);
      }
    }, {
      key: "getSize",
      value: function getSize(el) {
        return this._sizeGetter(el);
      }
    }, {
      key: "getZoom",
      value: function getZoom() {
        return this.zoom;
      }
    }, {
      key: "setZoom",
      value: function setZoom(z) {
        this.zoom = z;
      }
    }, {
      key: "_prepareParams",
      value: function _prepareParams(p) {
        p = p || {};
        var _p = {
          events: {}
        },
            i;
        for (i in p) {
          _p[i] = p[i];
        }
        for (i = 0; i < _events.length; i++) {
          _p.events[_events[i]] = p[_events[i]] || _devNull;
        }
        return _p;
      }
    }, {
      key: "getInputFilterSelector",
      value: function getInputFilterSelector() {
        return this.inputFilterSelector;
      }
    }, {
      key: "setInputFilterSelector",
      value: function setInputFilterSelector(selector) {
        this.inputFilterSelector = selector;
        return this;
      }
    }, {
      key: "draggable",
      value: function draggable(el, params) {
        if (el._katavorioDrag == null) {
          var _p3 = this._prepareParams(params);
          var d = new Drag(el, _p3, this);
          addClass(el, _classes.delegatedDraggable);
          el._katavorioDrag = d;
          return d;
        } else {
          return el._katavorioDrag;
        }
      }
    }, {
      key: "destroyDraggable",
      value: function destroyDraggable(el) {
        if (el._katavorioDrag) {
          el._katavorioDrag.destroy();
          delete el._katavorioDrag;
        }
      }
    }]);
    return Collicat;
  }();

  var CLASS_DRAG_SELECTED = "jtk-drag-selected";
  var DragSelection = function () {
    function DragSelection(instance) {
      _classCallCheck(this, DragSelection);
      this.instance = instance;
      _defineProperty(this, "_dragSelection", []);
      _defineProperty(this, "_dragSizes", new Map());
      _defineProperty(this, "_dragElements", new Map());
      _defineProperty(this, "_dragElementStartPositions", new Map());
      _defineProperty(this, "_dragElementPositions", new Map());
      _defineProperty(this, "__activeSet", void 0);
    }
    _createClass(DragSelection, [{
      key: "_activeSet",
      get: function get() {
        if (this.__activeSet == null) {
          return this._dragSelection;
        } else {
          return this.__activeSet;
        }
      }
    }, {
      key: "length",
      get: function get() {
        return this._dragSelection.length;
      }
    }, {
      key: "filterActiveSet",
      value: function filterActiveSet(fn) {
        var _this = this;
        this.__activeSet = [];
        forEach(this._dragSelection, function (p) {
          if (fn(p)) {
            _this.__activeSet.push(p);
          }
        });
      }
    }, {
      key: "clear",
      value: function clear() {
        var _this2 = this;
        this.reset();
        forEach(this._dragSelection, function (p) {
          return _this2.instance.removeClass(p.jel, CLASS_DRAG_SELECTED);
        });
        this._dragSelection.length = 0;
      }
    }, {
      key: "reset",
      value: function reset() {
        this._dragElementStartPositions.clear();
        this._dragElementPositions.clear();
        this._dragSizes.clear();
        this._dragElements.clear();
        this.__activeSet = null;
      }
    }, {
      key: "initialisePositions",
      value: function initialisePositions() {
        var _this3 = this;
        forEach(this._activeSet, function (p) {
          var vp = _this3.instance.viewport.getPosition(p.id);
          var off = {
            x: parseInt("" + p.jel.offsetLeft, 10),
            y: parseInt("" + p.jel.offsetTop, 10)
          };
          _this3._dragElementStartPositions.set(p.id, off);
          _this3._dragElementPositions.set(p.id, off);
          _this3._dragSizes.set(p.id, {
            w: vp.w,
            h: vp.h
          });
        });
      }
    }, {
      key: "updatePositions",
      value: function updatePositions(currentPosition, originalPosition, callback) {
        var _this4 = this;
        var dx = currentPosition.x - originalPosition.x,
            dy = currentPosition.y - originalPosition.y;
        forEach(this._activeSet, function (p) {
          var op = _this4._dragElementStartPositions.get(p.id);
          if (op) {
            var x = op.x + dx,
                y = op.y + dy;
            var _s = _this4._dragSizes.get(p.id);
            var _b = {
              x: x,
              y: y,
              w: _s.w,
              h: _s.h
            };
            if (p.jel._jsPlumbParentGroup && p.jel._jsPlumbParentGroup.constrain) {
              var constrainRect = {
                w: p.jel.parentNode.offsetWidth + p.jel.parentNode.scrollLeft,
                h: p.jel.parentNode.offsetHeight + p.jel.parentNode.scrollTop
              };
              _b.x = Math.max(_b.x, 0);
              _b.y = Math.max(_b.y, 0);
              _b.x = Math.min(_b.x, constrainRect.w - _s.w);
              _b.y = Math.min(_b.y, constrainRect.h - _s.h);
            }
            _this4._dragElementPositions.set(p.id, {
              x: x,
              y: y
            });
            p.jel.style.left = _b.x + "px";
            p.jel.style.top = _b.y + "px";
            callback(p.jel, p.id, _s, _b);
          }
        });
      }
    }, {
      key: "each",
      value: function each(f) {
        var _this5 = this;
        forEach(this._activeSet, function (p) {
          var s = _this5._dragSizes.get(p.id);
          var o = _this5._dragElementPositions.get(p.id);
          var orig = _this5._dragElementStartPositions.get(p.id);
          f(p.jel, p.id, o, s, orig);
        });
      }
    }, {
      key: "add",
      value: function add(el, id) {
        var jel = el;
        id = id || this.instance.getId(jel);
        var idx = findWithFunction(this._dragSelection, function (p) {
          return p.id === id;
        });
        if (idx === -1) {
          this.instance.addClass(el, CLASS_DRAG_SELECTED);
          this._dragSelection.push({
            id: id,
            jel: jel
          });
        }
      }
    }, {
      key: "remove",
      value: function remove(el) {
        var _this6 = this;
        var jel = el;
        this._dragSelection = this._dragSelection.filter(function (p) {
          var out = p.jel !== jel;
          if (!out) {
            _this6.instance.removeClass(p.jel, CLASS_DRAG_SELECTED);
          }
          return out;
        });
      }
    }, {
      key: "toggle",
      value: function toggle(el) {
        var jel = el;
        var idx = findWithFunction(this._dragSelection, function (p) {
          return p.jel === jel;
        });
        if (idx !== -1) {
          this.remove(jel);
        } else {
          this.add(el);
        }
      }
    }]);
    return DragSelection;
  }();

  var CLASS_DELEGATED_DRAGGABLE = "jtk-delegated-draggable";
  var CLASS_DRAGGABLE = "jtk-draggable";
  var CLASS_DRAG_CONTAINER = "jtk-drag";
  var CLASS_GHOST_PROXY = "jtk-ghost-proxy";
  var CLASS_DRAG_ACTIVE = "jtk-drag-active";
  var CLASS_DRAGGED = "jtk-dragged";
  var CLASS_DRAG_HOVER = "jtk-drag-hover";
  var DragManager = function () {
    function DragManager(instance, dragSelection, options) {
      var _this = this;
      _classCallCheck(this, DragManager);
      this.instance = instance;
      this.dragSelection = dragSelection;
      _defineProperty(this, "collicat", void 0);
      _defineProperty(this, "drag", void 0);
      _defineProperty(this, "_draggables", {});
      _defineProperty(this, "_dlist", []);
      _defineProperty(this, "_elementsWithEndpoints", {});
      _defineProperty(this, "_draggablesForElements", {});
      _defineProperty(this, "handlers", []);
      _defineProperty(this, "_trackScroll", void 0);
      _defineProperty(this, "_filtersToAdd", []);
      this.collicat = new Collicat({
        zoom: this.instance.currentZoom,
        css: {
          noSelect: this.instance.dragSelectClass,
          delegatedDraggable: CLASS_DELEGATED_DRAGGABLE,
          draggable: CLASS_DRAGGABLE,
          drag: CLASS_DRAG_CONTAINER,
          selected: CLASS_DRAG_SELECTED,
          active: CLASS_DRAG_ACTIVE,
          hover: CLASS_DRAG_HOVER,
          ghostProxy: CLASS_GHOST_PROXY
        }
      });
      this.instance.bind(EVENT_ZOOM, function (z) {
        _this.collicat.setZoom(z);
      });
      options = options || {};
      this._trackScroll = options.trackScroll !== false;
    }
    _createClass(DragManager, [{
      key: "addHandler",
      value: function addHandler(handler, dragOptions) {
        var _this2 = this;
        var o = extend({
          selector: handler.selector
        }, dragOptions || {});
        o.start = wrap(o.start, function (p) {
          return handler.onStart(p);
        }, false);
        o.drag = wrap(o.drag, function (p) {
          return handler.onDrag(p);
        });
        o.stop = wrap(o.stop, function (p) {
          return handler.onStop(p);
        });
        var handlerBeforeStart = (handler.onBeforeStart || function (p) {}).bind(handler);
        o.beforeStart = wrap(o.beforeStart, function (p) {
          return handlerBeforeStart(p);
        });
        o.dragInit = function (el, e) {
          return handler.onDragInit(el, e);
        };
        o.dragAbort = function (el) {
          return handler.onDragAbort(el);
        };
        if (handler.useGhostProxy) {
          o.useGhostProxy = handler.useGhostProxy;
          o.makeGhostProxy = handler.makeGhostProxy;
        }
        if (o.constrainFunction == null && o.containment != null) {
          switch (o.containment) {
            case exports.ContainmentType.notNegative:
              {
                o.constrainFunction = function (pos, dragEl, _constrainRect, _size) {
                  return {
                    x: Math.max(0, Math.min(pos.x)),
                    y: Math.max(0, Math.min(pos.y))
                  };
                };
                break;
              }
            case exports.ContainmentType.parent:
              {
                var padding = o.containmentPadding || 5;
                o.constrainFunction = function (pos, dragEl, _constrainRect, _size) {
                  var x = pos.x < 0 ? 0 : pos.x > _constrainRect.w - padding ? _constrainRect.w - padding : pos.x;
                  var y = pos.y < 0 ? 0 : pos.y > _constrainRect.h - padding ? _constrainRect.h - padding : pos.y;
                  return {
                    x: x,
                    y: y
                  };
                };
                break;
              }
            case exports.ContainmentType.parentEnclosed:
              {
                o.constrainFunction = function (pos, dragEl, _constrainRect, _size) {
                  var x = pos.x < 0 ? 0 : pos.x + _size.w > _constrainRect.w ? _constrainRect.w - _size.w : pos.x;
                  var y = pos.y < 0 ? 0 : pos.y + _size.h > _constrainRect.h ? _constrainRect.h - _size.h : pos.y;
                  return {
                    x: x,
                    y: y
                  };
                };
                break;
              }
          }
        }
        if (this.drag == null) {
          o.trackScroll = this._trackScroll;
          this.drag = this.collicat.draggable(this.instance.getContainer(), o);
          forEach(this._filtersToAdd, function (filterToAdd) {
            return _this2.drag.addFilter(filterToAdd[0], filterToAdd[1]);
          });
          this.drag.on(EVENT_REVERT, function (el) {
            _this2.instance.revalidate(el);
          });
        } else {
          this.drag.addSelector(o);
        }
        this.handlers.push({
          handler: handler,
          options: o
        });
        handler.init(this.drag);
      }
    }, {
      key: "addSelector",
      value: function addSelector(params, atStart) {
        this.drag && this.drag.addSelector(params, atStart);
      }
    }, {
      key: "addFilter",
      value: function addFilter(filter, exclude) {
        if (this.drag == null) {
          this._filtersToAdd.push([filter, exclude === true]);
        } else {
          this.drag.addFilter(filter, exclude);
        }
      }
    }, {
      key: "removeFilter",
      value: function removeFilter(filter) {
        if (this.drag != null) {
          this.drag.removeFilter(filter);
        }
      }
    }, {
      key: "setFilters",
      value: function setFilters(filters) {
        var _this3 = this;
        forEach(filters, function (f) {
          _this3.drag.addFilter(f[0], f[1]);
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        var out = [];
        forEach(this.handlers, function (p) {
          p.handler.reset();
        });
        this.handlers.length = 0;
        if (this.drag != null) {
          var currentFilters = this.drag._filters;
          for (var f in currentFilters) {
            out.push([f, currentFilters[f][1]]);
          }
          this.collicat.destroyDraggable(this.instance.getContainer());
        }
        delete this.drag;
        return out;
      }
    }, {
      key: "setOption",
      value: function setOption(handler, options) {
        var handlerAndOptions = getWithFunction(this.handlers, function (p) {
          return p.handler === handler;
        });
        if (handlerAndOptions != null) {
          extend(handlerAndOptions.options, options || {});
        }
      }
    }]);
    return DragManager;
  }();

  function decodeDragGroupSpec(instance, spec) {
    if (isString(spec)) {
      return {
        id: spec,
        active: true
      };
    } else {
      return {
        id: spec.id,
        active: spec.active
      };
    }
  }
  function isActiveDragGroupMember(dragGroup, el) {
    var details = getFromSetWithFunction(dragGroup.members, function (m) {
      return m.el === el;
    });
    if (details !== null) {
      return details.active === true;
    } else {
      return false;
    }
  }
  function getAncestors(el) {
    var ancestors = [];
    var p = el._jsPlumbParentGroup;
    while (p != null) {
      ancestors.push(p.el);
      p = p.group;
    }
    return ancestors;
  }
  var ElementDragHandler = function () {
    function ElementDragHandler(instance, _dragSelection) {
      _classCallCheck(this, ElementDragHandler);
      this.instance = instance;
      this._dragSelection = _dragSelection;
      _defineProperty(this, "selector", "> " + SELECTOR_MANAGED_ELEMENT + ":not(" + cls(CLASS_OVERLAY) + ")");
      _defineProperty(this, "_dragOffset", null);
      _defineProperty(this, "_groupLocations", []);
      _defineProperty(this, "_intersectingGroups", []);
      _defineProperty(this, "_currentDragParentGroup", null);
      _defineProperty(this, "_dragGroupByElementIdMap", {});
      _defineProperty(this, "_dragGroupMap", {});
      _defineProperty(this, "_currentDragGroup", null);
      _defineProperty(this, "_currentDragGroupOffsets", new Map());
      _defineProperty(this, "_currentDragGroupSizes", new Map());
      _defineProperty(this, "_currentDragGroupOriginalPositions", new Map());
      _defineProperty(this, "_dragPayload", null);
      _defineProperty(this, "drag", void 0);
      _defineProperty(this, "originalPosition", void 0);
    }
    _createClass(ElementDragHandler, [{
      key: "onDragInit",
      value: function onDragInit(el) {
        return null;
      }
    }, {
      key: "onDragAbort",
      value: function onDragAbort(el) {
        return null;
      }
    }, {
      key: "getDropGroup",
      value: function getDropGroup() {
        var dropGroup = null;
        if (this._intersectingGroups.length > 0) {
          var targetGroup = this._intersectingGroups[0].groupLoc.group;
          var intersectingElement = this._intersectingGroups[0].intersectingElement;
          var currentGroup = intersectingElement._jsPlumbParentGroup;
          if (currentGroup !== targetGroup) {
            if (currentGroup == null || !currentGroup.overrideDrop(intersectingElement, targetGroup)) {
              dropGroup = this._intersectingGroups[0];
            }
          }
        }
        return dropGroup;
      }
    }, {
      key: "onStop",
      value: function onStop(params) {
        var _this$_currentDragGro,
            _this = this;
        var jel = params.drag.getDragElement();
        var dropGroup = this.getDropGroup();
        var elementsToProcess = [];
        elementsToProcess.push({
          el: jel,
          id: this.instance.getId(jel),
          pos: params.finalPos,
          originalGroup: jel._jsPlumbParentGroup,
          redrawResult: null,
          originalPos: params.originalPos,
          reverted: false,
          dropGroup: dropGroup != null ? dropGroup.groupLoc.group : null
        });
        function addElementToProcess(el, id, currentPos, s, originalPosition) {
          var x = currentPos.x,
              y = currentPos.y;
          if (el._jsPlumbParentGroup && el._jsPlumbParentGroup.constrain) {
            var constrainRect = {
              w: el.parentNode.offsetWidth + el.parentNode.scrollLeft,
              h: el.parentNode.offsetHeight + el.parentNode.scrollTop
            };
            x = Math.max(x, 0);
            y = Math.max(y, 0);
            x = Math.min(x, constrainRect.w - s.w);
            y = Math.min(y, constrainRect.h - s.h);
            currentPos.x = x;
            currentPos.y = y;
          }
          elementsToProcess.push({
            el: el,
            id: id,
            pos: currentPos,
            originalPos: originalPosition,
            originalGroup: el._jsPlumbParentGroup,
            redrawResult: null,
            reverted: false,
            dropGroup: dropGroup === null || dropGroup === void 0 ? void 0 : dropGroup.groupLoc.group
          });
        }
        this._dragSelection.each(function (el, id, o, s, originalPosition) {
          if (el !== params.el) {
            addElementToProcess(el, id, {
              x: o.x,
              y: o.y
            }, s, originalPosition);
          }
        });
        (_this$_currentDragGro = this._currentDragGroup) === null || _this$_currentDragGro === void 0 ? void 0 : _this$_currentDragGro.members.forEach(function (d) {
          if (d.el !== params.el) {
            var offset = _this._currentDragGroupOffsets.get(d.elId);
            var s = _this._currentDragGroupSizes.get(d.elId);
            var pp = {
              x: params.finalPos.x + offset[0].x,
              y: params.finalPos.y + offset[0].y
            };
            addElementToProcess(d.el, d.elId, pp, s, _this._currentDragGroupOriginalPositions.get(d.elId));
          }
        });
        forEach(elementsToProcess, function (p) {
          var wasInGroup = p.originalGroup != null,
              isInOriginalGroup = wasInGroup && isInsideParent(_this.instance, p.el, p.pos),
              parentOffset = {
            x: 0,
            y: 0
          };
          if (wasInGroup && !isInOriginalGroup) {
            if (dropGroup == null) {
              var orphanedPosition = _this._pruneOrOrphan(p, true, true);
              if (orphanedPosition.pos != null) {
                p.pos = orphanedPosition.pos.pos;
              } else {
                if (!orphanedPosition.pruned && p.originalGroup.revert) {
                  p.pos = p.originalPos;
                  p.reverted = true;
                }
              }
            }
          } else if (wasInGroup && isInOriginalGroup) {
            parentOffset = _this._computeOffsetByParentGroup(p.originalGroup);
          }
          if (dropGroup != null && !isInOriginalGroup) {
            _this.instance.groupManager.addToGroup(dropGroup.groupLoc.group, false, p.el);
          } else {
            p.dropGroup = null;
          }
          if (p.reverted) {
            _this.instance.setPosition(p.el, p.pos);
          }
          p.redrawResult = _this.instance.setElementPosition(p.el, p.pos.x + parentOffset.x, p.pos.y + parentOffset.y);
          _this.instance.removeClass(p.el, CLASS_DRAGGED);
          _this.instance.select({
            source: p.el
          }).removeClass(_this.instance.elementDraggingClass + " " + _this.instance.sourceElementDraggingClass, true);
          _this.instance.select({
            target: p.el
          }).removeClass(_this.instance.elementDraggingClass + " " + _this.instance.targetElementDraggingClass, true);
        });
        if (elementsToProcess[0].originalGroup != null) {
          var currentGroup = jel._jsPlumbParentGroup;
          if (currentGroup !== elementsToProcess[0].originalGroup) {
            var originalElement = params.drag.getDragElement(true);
            if (elementsToProcess[0].originalGroup.ghost) {
              var o1 = this.instance.getPosition(this.instance.getGroupContentArea(currentGroup));
              var o2 = this.instance.getPosition(this.instance.getGroupContentArea(elementsToProcess[0].originalGroup));
              var o = {
                x: o2.x + params.pos.x - o1.x,
                y: o2.y + params.pos.y - o1.y
              };
              originalElement.style.left = o.x + "px";
              originalElement.style.top = o.y + "px";
              this.instance.revalidate(originalElement);
            }
          }
        }
        this.instance.fire(EVENT_DRAG_STOP, {
          elements: elementsToProcess,
          e: params.e,
          el: jel,
          payload: this._dragPayload
        });
        this._cleanup();
      }
    }, {
      key: "_cleanup",
      value: function _cleanup() {
        var _this2 = this;
        forEach(this._groupLocations, function (groupLoc) {
          _this2.instance.removeClass(groupLoc.el, CLASS_DRAG_ACTIVE);
          _this2.instance.removeClass(groupLoc.el, CLASS_DRAG_HOVER);
        });
        this._currentDragParentGroup = null;
        this._groupLocations.length = 0;
        this.instance.hoverSuspended = false;
        this._dragOffset = null;
        this._dragSelection.reset();
        this._dragPayload = null;
        this._currentDragGroupOffsets.clear();
        this._currentDragGroupSizes.clear();
        this._currentDragGroupOriginalPositions.clear();
        this._currentDragGroup = null;
      }
    }, {
      key: "reset",
      value: function reset() {}
    }, {
      key: "init",
      value: function init(drag) {
        this.drag = drag;
      }
    }, {
      key: "onDrag",
      value: function onDrag(params) {
        var _this3 = this;
        var el = params.drag.getDragElement();
        var id = this.instance.getId(el);
        var finalPos = params.pos;
        var elSize = this.instance.viewport.getPosition(id);
        var ui = {
          x: finalPos.x,
          y: finalPos.y
        };
        this._intersectingGroups.length = 0;
        if (this._dragOffset != null) {
          ui.x += this._dragOffset.x;
          ui.y += this._dragOffset.y;
        }
        var _one = function _one(el, bounds, findIntersectingGroups) {
          if (findIntersectingGroups) {
            var ancestorsOfIntersectingGroups = new Set();
            forEach(_this3._groupLocations, function (groupLoc) {
              if (!ancestorsOfIntersectingGroups.has(groupLoc.group.id) && intersects(bounds, groupLoc.r)) {
                if (groupLoc.group !== _this3._currentDragParentGroup) {
                  _this3.instance.addClass(groupLoc.el, CLASS_DRAG_HOVER);
                }
                _this3._intersectingGroups.push({
                  groupLoc: groupLoc,
                  intersectingElement: params.drag.getDragElement(true),
                  d: 0
                });
                forEach(_this3.instance.groupManager.getAncestors(groupLoc.group), function (g) {
                  return ancestorsOfIntersectingGroups.add(g.id);
                });
              } else {
                _this3.instance.removeClass(groupLoc.el, CLASS_DRAG_HOVER);
              }
            });
          }
          _this3.instance.setElementPosition(el, bounds.x, bounds.y);
          _this3.instance.fire(EVENT_DRAG_MOVE, {
            el: el,
            e: params.e,
            pos: {
              x: bounds.x,
              y: bounds.y
            },
            originalPosition: _this3.originalPosition,
            payload: _this3._dragPayload
          });
        };
        var elBounds = {
          x: ui.x,
          y: ui.y,
          w: elSize.w,
          h: elSize.h
        };
        _one(el, elBounds, true);
        this._dragSelection.updatePositions(finalPos, this.originalPosition, function (el, id, s, b) {
          _one(el, b, false);
        });
        this._currentDragGroupOffsets.forEach(function (v, k) {
          var s = _this3._currentDragGroupSizes.get(k);
          var _b = {
            x: elBounds.x + v[0].x,
            y: elBounds.y + v[0].y,
            w: s.w,
            h: s.h
          };
          v[1].style.left = _b.x + "px";
          v[1].style.top = _b.y + "px";
          _one(v[1], _b, false);
        });
      }
    }, {
      key: "_computeOffsetByParentGroup",
      value: function _computeOffsetByParentGroup(group) {
        var parentGroupOffset = this.instance.getPosition(group.el);
        var contentArea = group.contentArea;
        if (contentArea !== group.el) {
          var caOffset = this.instance.getPosition(contentArea);
          parentGroupOffset.x += caOffset.x;
          parentGroupOffset.y += caOffset.y;
        }
        if (group.el._jsPlumbParentGroup) {
          var ancestorOffset = this._computeOffsetByParentGroup(group.el._jsPlumbParentGroup);
          parentGroupOffset.x += ancestorOffset.x;
          parentGroupOffset.y += ancestorOffset.y;
        }
        return parentGroupOffset;
      }
    }, {
      key: "onStart",
      value: function onStart(params) {
        var _this4 = this;
        var el = params.drag.getDragElement();
        var elOffset = this.instance.getPosition(el);
        this.originalPosition = {
          x: params.pos.x,
          y: params.pos.y
        };
        if (el._jsPlumbParentGroup) {
          this._dragOffset = this._computeOffsetByParentGroup(el._jsPlumbParentGroup);
          this._currentDragParentGroup = el._jsPlumbParentGroup;
        }
        var cont = true;
        var nd = el.getAttribute(ATTRIBUTE_NOT_DRAGGABLE);
        if (this.instance.elementsDraggable === false || nd != null && nd !== FALSE$1) {
          cont = false;
        }
        if (cont) {
          this._groupLocations.length = 0;
          this._intersectingGroups.length = 0;
          this.instance.hoverSuspended = true;
          var originalElement = params.drag.getDragElement(true),
              descendants = originalElement.querySelectorAll(SELECTOR_MANAGED_ELEMENT),
              ancestors = getAncestors(originalElement),
              a = [];
          Array.prototype.push.apply(a, descendants);
          Array.prototype.push.apply(a, ancestors);
          this._dragSelection.filterActiveSet(function (p) {
            return a.indexOf(p.jel) === -1;
          });
          this._dragSelection.initialisePositions();
          var _one = function _one(_el, dragGroup, dragGroupMemberSpec) {
            if (!_el._isJsPlumbGroup || _this4.instance.allowNestedGroups) {
              var isNotInAGroup = !_el._jsPlumbParentGroup;
              var membersAreDroppable = isNotInAGroup || _el._jsPlumbParentGroup.dropOverride !== true;
              var isGhostOrNotConstrained = !isNotInAGroup && (_el._jsPlumbParentGroup.ghost || _el._jsPlumbParentGroup.constrain !== true);
              if (isNotInAGroup || membersAreDroppable && isGhostOrNotConstrained) {
                forEach(_this4.instance.groupManager.getGroups(), function (group) {
                  var elementGroup = _el._jsPlumbGroup;
                  if (group.droppable !== false && group.enabled !== false && _el._jsPlumbGroup !== group && !_this4.instance.groupManager.isDescendant(group, elementGroup)) {
                    var groupEl = group.el,
                        groupElId = _this4.instance.getId(groupEl),
                        p = _this4.instance.viewport.getPosition(groupElId),
                        boundingRect = {
                      x: p.x,
                      y: p.y,
                      w: p.w,
                      h: p.h
                    };
                    var groupLocation = {
                      el: groupEl,
                      r: boundingRect,
                      group: group
                    };
                    _this4._groupLocations.push(groupLocation);
                    if (group !== _this4._currentDragParentGroup) {
                      _this4.instance.addClass(groupEl, CLASS_DRAG_ACTIVE);
                    }
                  }
                });
                _this4._groupLocations.sort(function (a, b) {
                  if (_this4.instance.groupManager.isDescendant(a.group, b.group)) {
                    return -1;
                  } else if (_this4.instance.groupManager.isAncestor(b.group, a.group)) {
                    return 1;
                  } else {
                    return 0;
                  }
                });
              }
            }
            _this4.instance.select({
              source: _el
            }).addClass(_this4.instance.elementDraggingClass + " " + _this4.instance.sourceElementDraggingClass, true);
            _this4.instance.select({
              target: _el
            }).addClass(_this4.instance.elementDraggingClass + " " + _this4.instance.targetElementDraggingClass, true);
            return _this4.instance.fire(EVENT_DRAG_START, {
              el: _el,
              e: params.e,
              originalPosition: _this4.originalPosition,
              pos: _this4.originalPosition,
              dragGroup: dragGroup,
              dragGroupMemberSpec: dragGroupMemberSpec
            });
          };
          var elId = this.instance.getId(el);
          this._currentDragGroup = this._dragGroupByElementIdMap[elId];
          if (this._currentDragGroup && !isActiveDragGroupMember(this._currentDragGroup, el)) {
            this._currentDragGroup = null;
          }
          var dragStartReturn = _one(el);
          if (dragStartReturn === false) {
            this._cleanup();
            return false;
          } else {
            this._dragPayload = dragStartReturn;
          }
          if (this._currentDragGroup != null) {
            this._currentDragGroupOffsets.clear();
            this._currentDragGroupSizes.clear();
            this._currentDragGroup.members.forEach(function (jel) {
              var vp = _this4.instance.viewport.getPosition(jel.elId);
              _this4._currentDragGroupOffsets.set(jel.elId, [{
                x: vp.x - elOffset.x,
                y: vp.y - elOffset.y
              }, jel.el]);
              _this4._currentDragGroupSizes.set(jel.elId, vp);
              _this4._currentDragGroupOriginalPositions.set(jel.elId, {
                x: vp.x,
                y: vp.y
              });
              _one(jel.el, _this4._currentDragGroup, jel);
            });
          }
        }
        return cont;
      }
    }, {
      key: "addToDragGroup",
      value: function addToDragGroup(spec) {
        var _this5 = this;
        var details = decodeDragGroupSpec(this.instance, spec);
        var dragGroup = this._dragGroupMap[details.id];
        if (dragGroup == null) {
          dragGroup = {
            id: details.id,
            members: new Set()
          };
          this._dragGroupMap[details.id] = dragGroup;
        }
        for (var _len = arguments.length, els = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          els[_key - 1] = arguments[_key];
        }
        this.removeFromDragGroup.apply(this, els);
        forEach(els, function (el) {
          var elId = _this5.instance.getId(el);
          dragGroup.members.add({
            elId: elId,
            el: el,
            active: details.active
          });
          _this5._dragGroupByElementIdMap[elId] = dragGroup;
        });
      }
    }, {
      key: "removeFromDragGroup",
      value: function removeFromDragGroup() {
        var _this6 = this;
        for (var _len2 = arguments.length, els = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          els[_key2] = arguments[_key2];
        }
        forEach(els, function (el) {
          var id = _this6.instance.getId(el);
          var dragGroup = _this6._dragGroupByElementIdMap[id];
          if (dragGroup != null) {
            var s = new Set();
            dragGroup.members.forEach(function (member) {
              if (member.el !== el) {
                s.add(member);
              }
            });
            dragGroup.members = s;
            delete _this6._dragGroupByElementIdMap[id];
          }
        });
      }
    }, {
      key: "setDragGroupState",
      value: function setDragGroupState(active) {
        var _this7 = this;
        for (var _len3 = arguments.length, els = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          els[_key3 - 1] = arguments[_key3];
        }
        var elementIds = els.map(function (el) {
          return _this7.instance.getId(el);
        });
        forEach(elementIds, function (id) {
          var dragGroup = _this7._dragGroupByElementIdMap[id];
          if (dragGroup != null) {
            var member = getFromSetWithFunction(dragGroup.members, function (m) {
              return m.elId === id;
            });
            if (member != null) {
              member.active = active;
            }
          }
        });
      }
    }, {
      key: "clearDragGroup",
      value: function clearDragGroup(name) {
        var _this8 = this;
        var dragGroup = this._dragGroupMap[name];
        if (dragGroup != null) {
          dragGroup.members.forEach(function (member) {
            delete _this8._dragGroupByElementIdMap[member.elId];
          });
          dragGroup.members.clear();
        }
      }
    }, {
      key: "_pruneOrOrphan",
      value: function _pruneOrOrphan(params, doNotTransferToAncestor, isDefinitelyNotInsideParent) {
        var jel = params.el;
        var orphanedPosition = {
          pruned: false,
          pos: null
        };
        if (isDefinitelyNotInsideParent || !isInsideParent(this.instance, jel, params.pos)) {
          var group = jel._jsPlumbParentGroup;
          if (group.prune) {
            if (jel._isJsPlumbGroup) {
              this.instance.removeGroup(jel._jsPlumbGroup);
            } else {
              group.remove(params.el, true);
            }
            orphanedPosition.pruned = true;
          } else if (group.orphan) {
            orphanedPosition.pos = this.instance.groupManager.orphan(params.el, doNotTransferToAncestor);
            if (jel._isJsPlumbGroup) {
              group.removeGroup(jel._jsPlumbGroup);
            } else {
              group.remove(params.el);
            }
          }
        }
        return orphanedPosition;
      }
    }]);
    return ElementDragHandler;
  }();

  function _makeFloatingEndpoint(ep, endpoint, referenceCanvas, sourceElement, sourceElementId, instance) {
    var floatingAnchor = createFloatingAnchor(instance, sourceElement, sourceElementId);
    var p = {
      paintStyle: ep.getPaintStyle(),
      preparedAnchor: floatingAnchor,
      element: sourceElement,
      scope: ep.scope,
      cssClass: [CLASS_ENDPOINT_FLOATING, ep.cssClass].join(" ")
    };
    if (endpoint != null) {
      if (isAssignableFrom(endpoint, EndpointRepresentation)) {
        p.existingEndpoint = endpoint;
      } else {
        p.endpoint = endpoint;
      }
    }
    var actualEndpoint = instance._internal_newEndpoint(p);
    instance._paintEndpoint(actualEndpoint, {});
    return actualEndpoint;
  }
  function selectorFilter(evt, _el, selector, _instance, negate) {
    var t = evt.target || evt.srcElement,
        ok = false,
        sel = _instance.getSelector(_el, selector);
    for (var j = 0; j < sel.length; j++) {
      if (sel[j] === t) {
        ok = true;
        break;
      }
    }
    return negate ? !ok : ok;
  }
  var SELECTOR_DRAG_ACTIVE_OR_HOVER = cls(CLASS_DRAG_ACTIVE, CLASS_DRAG_HOVER);
  var SOURCE_SELECTOR_UNIQUE_ENDPOINT_DATA = "sourceSelectorEndpoint";
  var EndpointDragHandler = function () {
    function EndpointDragHandler(instance) {
      _classCallCheck(this, EndpointDragHandler);
      this.instance = instance;
      _defineProperty(this, "jpc", void 0);
      _defineProperty(this, "existingJpc", void 0);
      _defineProperty(this, "_originalAnchorSpec", void 0);
      _defineProperty(this, "ep", void 0);
      _defineProperty(this, "endpointRepresentation", void 0);
      _defineProperty(this, "canvasElement", void 0);
      _defineProperty(this, "_activeDefinition", void 0);
      _defineProperty(this, "placeholderInfo", {
        id: null,
        element: null
      });
      _defineProperty(this, "floatingIndex", void 0);
      _defineProperty(this, "floatingId", void 0);
      _defineProperty(this, "floatingElement", void 0);
      _defineProperty(this, "floatingEndpoint", void 0);
      _defineProperty(this, "floatingAnchor", void 0);
      _defineProperty(this, "_stopped", void 0);
      _defineProperty(this, "inPlaceCopy", void 0);
      _defineProperty(this, "endpointDropTargets", []);
      _defineProperty(this, "currentDropTarget", null);
      _defineProperty(this, "payload", void 0);
      _defineProperty(this, "floatingConnections", {});
      _defineProperty(this, "_forceReattach", void 0);
      _defineProperty(this, "_forceDetach", void 0);
      _defineProperty(this, "mousedownHandler", void 0);
      _defineProperty(this, "mouseupHandler", void 0);
      _defineProperty(this, "selector", cls(CLASS_ENDPOINT));
      var container = instance.getContainer();
      this.mousedownHandler = this._mousedownHandler.bind(this);
      this.mouseupHandler = this._mouseupHandler.bind(this);
      instance.on(container, EVENT_MOUSEDOWN, SELECTOR_MANAGED_ELEMENT, this.mousedownHandler);
      instance.on(container, EVENT_MOUSEUP, [SELECTOR_MANAGED_ELEMENT, cls(CLASS_ENDPOINT)].join(","), this.mouseupHandler);
    }
    _createClass(EndpointDragHandler, [{
      key: "_resolveDragParent",
      value: function _resolveDragParent(def, eventTarget) {
        var container = this.instance.getContainer();
        var parent = findParent(eventTarget, SELECTOR_MANAGED_ELEMENT, container, true);
        if (def.parentSelector != null) {
          var child = findParent(eventTarget, def.parentSelector, container, true);
          if (child != null) {
            parent = findParent(child.parentNode, SELECTOR_MANAGED_ELEMENT, container, false);
          }
          return child || parent;
        } else {
          return parent;
        }
      }
    }, {
      key: "_mousedownHandler",
      value: function _mousedownHandler(e) {
        var sourceEl;
        var sourceSelector;
        if (e.which === 3 || e.button === 2) {
          return;
        }
        var eventTarget = e.target || e.srcElement;
        sourceSelector = this._getSourceDefinition(e);
        if (sourceSelector != null) {
          sourceEl = this._resolveDragParent(sourceSelector.def.def, eventTarget);
          if (sourceEl == null || sourceEl.getAttribute(ATTRIBUTE_JTK_ENABLED) === FALSE$1) {
            return;
          }
        }
        if (sourceSelector) {
          var sourceElement = e.currentTarget,
              def;
          if (eventTarget.getAttribute(ATTRIBUTE_JTK_ENABLED) !== FALSE$1) {
            consume(e);
            this._activeDefinition = sourceSelector;
            def = sourceSelector.def.def;
            if (def.canAcceptNewConnection != null && !def.canAcceptNewConnection(sourceEl, e)) {
              return false;
            }
            var elxy = getPositionOnElement(e, sourceEl, this.instance.currentZoom);
            var tempEndpointParams = {
              element: sourceEl
            };
            extend(tempEndpointParams, def);
            tempEndpointParams.isTemporarySource = true;
            if (def.scope) {
              tempEndpointParams.scope = def.scope;
            } else {
              var scopeFromElement = eventTarget.getAttribute(ATTRIBUTE_JTK_SCOPE);
              if (scopeFromElement != null) {
                tempEndpointParams.scope = scopeFromElement;
              }
            }
            var extractedParameters = def.parameterExtractor ? def.parameterExtractor(sourceEl, eventTarget, e) : {};
            tempEndpointParams = merge(tempEndpointParams, extractedParameters);
            if (tempEndpointParams.maxConnections != null && tempEndpointParams.maxConnections >= 0) {
              var sourceCount = this.instance.select({
                source: sourceEl
              }).length;
              if (sourceCount >= tempEndpointParams.maxConnections) {
                consume(e);
                if (def.onMaxConnections) {
                  def.onMaxConnections({
                    element: sourceEl,
                    maxConnections: tempEndpointParams.maxConnections
                  }, e);
                }
                e.stopImmediatePropagation && e.stopImmediatePropagation();
                return false;
              }
            }
            if (def.anchorPositionFinder) {
              var maybeAnchorSpec = def.anchorPositionFinder(sourceEl, elxy, def, e);
              if (maybeAnchorSpec != null) {
                tempEndpointParams.anchor = maybeAnchorSpec;
              }
            }
            this._originalAnchorSpec = tempEndpointParams.anchor || (this.instance.areDefaultAnchorsSet() ? this.instance.defaults.anchors[0] : this.instance.defaults.anchor);
            var _originalAnchor = this.instance.router.prepareAnchor(this._originalAnchorSpec);
            var anchorSpecToUse = [elxy.x, elxy.y, 0, 0];
            if (_originalAnchor.locations.length > 0) {
              anchorSpecToUse[2] = _originalAnchor.locations[0].ox;
              anchorSpecToUse[3] = _originalAnchor.locations[0].oy;
            } else if (_originalAnchor.isContinuous) {
              var dx = elxy.x < 0.5 ? elxy.x : 1 - elxy.x;
              var dy = elxy.y < 0.5 ? elxy.y : 1 - elxy.y;
              anchorSpecToUse[2] = dx < dy ? elxy.x < 0.5 ? -1 : 1 : 0;
              anchorSpecToUse[3] = dy < dx ? elxy.y < 0.5 ? -1 : 1 : 0;
            }
            tempEndpointParams.anchor = anchorSpecToUse;
            tempEndpointParams.deleteOnEmpty = true;
            this.ep = this.instance._internal_newEndpoint(tempEndpointParams);
            var payload = {};
            if (def.extract) {
              for (var att in def.extract) {
                var v = eventTarget.getAttribute(att);
                if (v) {
                  payload[def.extract[att]] = v;
                }
              }
              this.ep.mergeParameters(payload);
            }
            if (tempEndpointParams.uniqueEndpoint) {
              var elementId = this.ep.elementId;
              var existingUniqueEndpoint = this.instance.getManagedData(elementId, SOURCE_SELECTOR_UNIQUE_ENDPOINT_DATA, sourceSelector.id);
              if (existingUniqueEndpoint == null) {
                this.instance.setManagedData(elementId, SOURCE_SELECTOR_UNIQUE_ENDPOINT_DATA, sourceSelector.id, this.ep);
                this.ep.deleteOnEmpty = false;
              } else {
                this.ep.finalEndpoint = existingUniqueEndpoint;
              }
            }
            sourceElement._jsPlumbOrphanedEndpoints = sourceElement._jsPlumbOrphanedEndpoints || [];
            sourceElement._jsPlumbOrphanedEndpoints.push(this.ep);
            this.instance.trigger(this.ep.endpoint.canvas, EVENT_MOUSEDOWN, e, payload);
          }
        }
      }
    }, {
      key: "_mouseupHandler",
      value: function _mouseupHandler(e) {
        var el = e.currentTarget || e.srcElement;
        if (el._jsPlumbOrphanedEndpoints) {
          each(el._jsPlumbOrphanedEndpoints, this.instance._maybePruneEndpoint.bind(this.instance));
          el._jsPlumbOrphanedEndpoints.length = 0;
        }
        this._activeDefinition = null;
      }
    }, {
      key: "onDragInit",
      value: function onDragInit(el) {
        var ipco = getElementPosition(el, this.instance),
            ips = getElementSize(el, this.instance);
        this._makeDraggablePlaceholder(ipco, ips);
        this.placeholderInfo.element.jtk = el.jtk;
        return this.placeholderInfo.element;
      }
    }, {
      key: "onDragAbort",
      value: function onDragAbort(el) {
        this._cleanupDraggablePlaceholder();
      }
    }, {
      key: "_makeDraggablePlaceholder",
      value: function _makeDraggablePlaceholder(ipco, ips) {
        this.placeholderInfo = this.placeholderInfo || {};
        var n = createElement(ELEMENT_DIV, {
          position: "absolute"
        });
        this.instance._appendElementToContainer(n);
        var id = this.instance.getId(n);
        this.instance.setPosition(n, ipco);
        n.style.width = ips.w + "px";
        n.style.height = ips.h + "px";
        this.instance.manage(n);
        this.placeholderInfo.id = id;
        this.placeholderInfo.element = n;
        return n;
      }
    }, {
      key: "_cleanupDraggablePlaceholder",
      value: function _cleanupDraggablePlaceholder() {
        if (this.placeholderInfo.element) {
          this.instance.unmanage(this.placeholderInfo.element, true);
          delete this.placeholderInfo.element;
          delete this.placeholderInfo.id;
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        var c = this.instance.getContainer();
        this.instance.off(c, EVENT_MOUSEUP, this.mouseupHandler);
        this.instance.off(c, EVENT_MOUSEDOWN, this.mousedownHandler);
      }
    }, {
      key: "init",
      value: function init(drag) {}
    }, {
      key: "startNewConnectionDrag",
      value: function startNewConnectionDrag(scope, data) {
        this.jpc = this.instance._newConnection({
          sourceEndpoint: this.ep,
          targetEndpoint: this.floatingEndpoint,
          source: this.ep.element,
          target: this.placeholderInfo.element,
          paintStyle: this.ep.connectorStyle,
          hoverPaintStyle: this.ep.connectorHoverStyle,
          connector: this.ep.connector,
          overlays: this.ep.connectorOverlays,
          type: this.ep.edgeType,
          cssClass: this.ep.connectorClass,
          hoverClass: this.ep.connectorHoverClass,
          scope: scope,
          data: data
        });
        this.jpc.pending = true;
        this.jpc.addClass(this.instance.draggingClass);
        this.ep.addClass(this.instance.draggingClass);
        this.instance.fire(EVENT_CONNECTION_DRAG, this.jpc);
      }
    }, {
      key: "startExistingConnectionDrag",
      value: function startExistingConnectionDrag() {
        this.existingJpc = true;
        this.instance.setHover(this.jpc, false);
        var anchorIdx = this.jpc.endpoints[0].id === this.ep.id ? 0 : 1;
        this.ep.detachFromConnection(this.jpc, null, true);
        this.floatingEndpoint.addConnection(this.jpc);
        this.instance.fire(EVENT_CONNECTION_DRAG, this.jpc);
        this.instance.sourceOrTargetChanged(this.jpc.endpoints[anchorIdx].elementId, this.placeholderInfo.id, this.jpc, this.placeholderInfo.element, anchorIdx);
        this.jpc.suspendedEndpoint = this.jpc.endpoints[anchorIdx];
        this.jpc.suspendedElement = this.jpc.endpoints[anchorIdx].element;
        this.jpc.suspendedElementId = this.jpc.endpoints[anchorIdx].elementId;
        this.jpc.suspendedElementType = anchorIdx === 0 ? SOURCE : TARGET;
        this.instance.setHover(this.jpc.suspendedEndpoint, false);
        this.floatingEndpoint.referenceEndpoint = this.jpc.suspendedEndpoint;
        this.floatingEndpoint.mergeParameters(this.jpc.suspendedEndpoint.parameters);
        this.jpc.endpoints[anchorIdx] = this.floatingEndpoint;
        this.jpc.addClass(this.instance.draggingClass);
        this.floatingId = this.placeholderInfo.id;
        this.floatingIndex = anchorIdx;
        this.instance._refreshEndpoint(this.ep);
      }
    }, {
      key: "_shouldStartDrag",
      value: function _shouldStartDrag() {
        var _continue = true;
        if (!this.ep.enabled) {
          _continue = false;
        }
        if (this.jpc == null && !this.ep.isSource && !this.ep.isTemporarySource) {
          _continue = false;
        }
        if (this.ep.isSource && this.ep.isFull() && !(this.jpc != null && this.ep.dragAllowedWhenFull)) {
          _continue = false;
        }
        if (this.jpc != null && !this.jpc.isDetachable(this.ep)) {
          if (this.ep.isFull()) {
            _continue = false;
          } else {
            this.jpc = null;
          }
        }
        var payload = {};
        var beforeDrag = this.instance.checkCondition(this.jpc == null ? INTERCEPT_BEFORE_DRAG : INTERCEPT_BEFORE_START_DETACH, {
          endpoint: this.ep,
          source: this.ep.element,
          sourceId: this.ep.elementId,
          connection: this.jpc
        });
        if (beforeDrag === false) {
          _continue = false;
        }
        else if (_typeof(beforeDrag) === "object") {
          payload = beforeDrag;
          extend(payload, this.payload || {});
        } else {
          payload = this.payload || {};
        }
        return [_continue, payload];
      }
    }, {
      key: "_createFloatingEndpoint",
      value: function _createFloatingEndpoint(canvasElement) {
        var endpointToFloat = this.ep.endpoint;
        if (this.ep.edgeType != null) {
          var aae = this.instance._deriveEndpointAndAnchorSpec(this.ep.edgeType);
          endpointToFloat = aae.endpoints[1];
        }
        this.floatingEndpoint = _makeFloatingEndpoint(this.ep, endpointToFloat, canvasElement, this.placeholderInfo.element, this.placeholderInfo.id, this.instance);
        this.floatingAnchor = this.floatingEndpoint._anchor;
        this.floatingEndpoint.deleteOnEmpty = true;
        this.floatingElement = this.floatingEndpoint.endpoint.canvas;
        this.floatingId = this.instance.getId(this.floatingElement);
      }
    }, {
      key: "_populateTargets",
      value: function _populateTargets(canvasElement, event) {
        var _this = this;
        var isSourceDrag = this.jpc && this.jpc.endpoints[0] === this.ep;
        var boundingRect;
        var matchingEndpoints = this.instance.getContainer().querySelectorAll([".", CLASS_ENDPOINT, "[", ATTRIBUTE_SCOPE_PREFIX, this.ep.scope, "]:not(.", CLASS_ENDPOINT_FLOATING, ")"].join(""));
        forEach(matchingEndpoints, function (candidate) {
          if ((_this.jpc != null || candidate !== canvasElement) && candidate !== _this.floatingElement && (_this.jpc != null || !candidate.jtk.endpoint.isFull())) {
            if (isSourceDrag && candidate.jtk.endpoint.isSource || !isSourceDrag && candidate.jtk.endpoint.isTarget) {
              var o = getElementPosition(candidate, _this.instance),
                  s = getElementSize(candidate, _this.instance);
              boundingRect = {
                x: o.x,
                y: o.y,
                w: s.w,
                h: s.h
              };
              _this.endpointDropTargets.push({
                el: candidate,
                targetEl: candidate,
                r: boundingRect,
                endpoint: candidate.jtk.endpoint,
                def: null
              });
              _this.instance.addClass(candidate, CLASS_DRAG_ACTIVE);
            }
          }
        });
        if (isSourceDrag) {
          var sourceDef = getWithFunction(this.instance.sourceSelectors, function (sSel) {
            return sSel.isEnabled() && (sSel.def.def.scope == null || sSel.def.def.scope === _this.ep.scope);
          });
          if (sourceDef != null) {
            var targetZones = this._findTargetZones(sourceDef);
            forEach(targetZones, function (el) {
              if (el.getAttribute(ATTRIBUTE_JTK_ENABLED) !== FALSE$1) {
                var scopeFromElement = el.getAttribute(ATTRIBUTE_JTK_SCOPE);
                if (scopeFromElement != null && scopeFromElement !== _this.ep.scope) {
                  return;
                }
                var d = {
                  r: null,
                  el: el
                };
                d.targetEl = findParent(el, SELECTOR_MANAGED_ELEMENT, _this.instance.getContainer(), true);
                var o = getElementPosition(d.el, _this.instance),
                    s = getElementSize(d.el, _this.instance);
                d.r = {
                  x: o.x,
                  y: o.y,
                  w: s.w,
                  h: s.h
                };
                if (sourceDef.def.def.rank != null) {
                  d.rank = sourceDef.def.def.rank;
                }
                d.def = sourceDef.def;
                _this.endpointDropTargets.push(d);
                _this.instance.addClass(d.targetEl, CLASS_DRAG_ACTIVE);
              }
            });
          }
        } else {
          var targetDefs = getAllWithFunction(this.instance.targetSelectors, function (tSel) {
            return tSel.isEnabled();
          });
          targetDefs.forEach(function (targetDef) {
            var targetZones = _this._findTargetZones(targetDef);
            forEach(targetZones, function (el) {
              if (el.getAttribute(ATTRIBUTE_JTK_ENABLED) !== FALSE$1) {
                var scopeFromElement = el.getAttribute(ATTRIBUTE_JTK_SCOPE);
                if (scopeFromElement != null && scopeFromElement !== _this.ep.scope) {
                  return;
                }
                var d = {
                  r: null,
                  el: el
                };
                if (targetDef.def.def.parentSelector != null) {
                  d.targetEl = findParent(el, targetDef.def.def.parentSelector, _this.instance.getContainer(), true);
                }
                if (d.targetEl == null) {
                  d.targetEl = findParent(el, SELECTOR_MANAGED_ELEMENT, _this.instance.getContainer(), true);
                }
                if (targetDef.def.def.allowLoopback === false || _this._activeDefinition && _this._activeDefinition.def.def.allowLoopback === false) {
                  if (d.targetEl === _this.ep.element) {
                    return;
                  }
                }
                if (targetDef.def.def.canAcceptNewConnection != null && !targetDef.def.def.canAcceptNewConnection(d.targetEl, event)) {
                  return;
                }
                var maxConnections = targetDef.def.def.maxConnections;
                if (maxConnections != null && maxConnections !== -1) {
                  if (_this.instance.select({
                    target: d.targetEl
                  }).length >= maxConnections) {
                    return;
                  }
                }
                var o = getElementPosition(el, _this.instance),
                    s = getElementSize(el, _this.instance);
                d.r = {
                  x: o.x,
                  y: o.y,
                  w: s.w,
                  h: s.h
                };
                d.def = targetDef.def;
                if (targetDef.def.def.rank != null) {
                  d.rank = targetDef.def.def.rank;
                }
                _this.endpointDropTargets.push(d);
                _this.instance.addClass(d.targetEl, CLASS_DRAG_ACTIVE);
              }
            });
          });
        }
        this.endpointDropTargets.sort(function (a, b) {
          if (a.targetEl._isJsPlumbGroup && !b.targetEl._isJsPlumbGroup) {
            return 1;
          } else if (!a.targetEl._isJsPlumbGroup && b.targetEl._isJsPlumbGroup) {
            return -1;
          } else {
            if (a.targetEl._isJsPlumbGroup && b.targetEl._isJsPlumbGroup) {
              if (_this.instance.groupManager.isAncestor(a.targetEl._jsPlumbGroup, b.targetEl._jsPlumbGroup)) {
                return -1;
              } else if (_this.instance.groupManager.isAncestor(b.targetEl._jsPlumbGroup, a.targetEl._jsPlumbGroup)) {
                return 1;
              }
            } else {
              if (a.rank != null && b.rank != null) {
                if (a.rank > b.rank) {
                  return -1;
                } else if (a.rank < b.rank) {
                  return 1;
                } else ;
              } else {
                return 0;
              }
            }
          }
        });
      }
    }, {
      key: "_findTargetZones",
      value: function _findTargetZones(dragSelector) {
        var targetZonesSelector;
        if (dragSelector.redrop === REDROP_POLICY_ANY) {
          var t = this.instance.targetSelectors.map(function (s) {
            return s.selector;
          });
          t.push.apply(t, _toConsumableArray(this.instance.sourceSelectors.map(function (s) {
            return s.selector;
          })));
          t.push(SELECTOR_MANAGED_ELEMENT);
          targetZonesSelector = t.join(",");
        } else if (dragSelector.redrop === REDROP_POLICY_STRICT) {
          targetZonesSelector = dragSelector.selector;
        } else if (dragSelector.redrop === REDROP_POLICY_ANY_SOURCE) {
          targetZonesSelector = this.instance.sourceSelectors.map(function (s) {
            return s.selector;
          }).join(",");
        } else if (dragSelector.redrop === REDROP_POLICY_ANY_TARGET) {
          targetZonesSelector = this.instance.targetSelectors.map(function (s) {
            return s.selector;
          }).join(",");
        } else if (dragSelector.redrop === REDROP_POLICY_ANY_SOURCE_OR_TARGET) {
          var _t = this.instance.targetSelectors.map(function (s) {
            return s.selector;
          });
          _t.push.apply(_t, _toConsumableArray(this.instance.sourceSelectors.map(function (s) {
            return s.selector;
          })));
          targetZonesSelector = _t.join(",");
        }
        return this.instance.getContainer().querySelectorAll(targetZonesSelector);
      }
    }, {
      key: "onStart",
      value: function onStart(p) {
        this.endpointDropTargets.length = 0;
        this.currentDropTarget = null;
        this._stopped = false;
        var dragEl = p.drag.getDragElement();
        this.ep = dragEl.jtk.endpoint;
        if (!this.ep) {
          return false;
        }
        this.endpointRepresentation = this.ep.endpoint;
        this.canvasElement = this.endpointRepresentation.canvas;
        this.jpc = this.ep.connectorSelector();
        var _this$_shouldStartDra = this._shouldStartDrag(),
            _this$_shouldStartDra2 = _slicedToArray(_this$_shouldStartDra, 2),
            _continue = _this$_shouldStartDra2[0],
            payload = _this$_shouldStartDra2[1];
        if (_continue === false) {
          this._stopped = true;
          return false;
        }
        this.instance.setHover(this.ep, false);
        this.instance.isConnectionBeingDragged = true;
        if (this.jpc && !this.ep.isFull() && this.ep.isSource) {
          this.jpc = null;
        }
        this._createFloatingEndpoint(this.canvasElement);
        this._populateTargets(this.canvasElement, p.e);
        if (this.jpc == null) {
          this.startNewConnectionDrag(this.ep.scope, payload);
        } else {
          this.startExistingConnectionDrag();
        }
        this._registerFloatingConnection(this.placeholderInfo, this.jpc);
        this.instance.currentlyDragging = true;
      }
    }, {
      key: "onBeforeStart",
      value: function onBeforeStart(beforeStartParams) {
        this.payload = beforeStartParams.e.payload || {};
      }
    }, {
      key: "onDrag",
      value: function onDrag(params) {
        if (this._stopped) {
          return true;
        }
        if (this.placeholderInfo.element) {
          var floatingElementSize = getElementSize(this.floatingElement, this.instance);
          this.instance.setElementPosition(this.placeholderInfo.element, params.pos.x, params.pos.y);
          var boundingRect = {
            x: params.pos.x,
            y: params.pos.y,
            w: floatingElementSize.w,
            h: floatingElementSize.h
          },
              newDropTarget,
              idx,
              _cont;
          for (var i = 0; i < this.endpointDropTargets.length; i++) {
            if (intersects(boundingRect, this.endpointDropTargets[i].r)) {
              newDropTarget = this.endpointDropTargets[i];
              break;
            }
          }
          if (newDropTarget !== this.currentDropTarget && this.currentDropTarget != null) {
            idx = this._getFloatingAnchorIndex();
            this.instance.removeClass(this.currentDropTarget.el, CLASS_DRAG_HOVER);
            if (this.currentDropTarget.endpoint) {
              this.currentDropTarget.endpoint.endpoint.removeClass(this.instance.endpointDropAllowedClass);
              this.currentDropTarget.endpoint.endpoint.removeClass(this.instance.endpointDropForbiddenClass);
            }
            this.floatingAnchor.out();
          }
          if (newDropTarget != null) {
            this.instance.addClass(newDropTarget.el, CLASS_DRAG_HOVER);
            idx = this._getFloatingAnchorIndex();
            if (newDropTarget.endpoint != null) {
              _cont = newDropTarget.endpoint.isSource && idx === 0 || newDropTarget.endpoint.isTarget && idx !== 0 || this.jpc.suspendedEndpoint && newDropTarget.endpoint.referenceEndpoint && newDropTarget.endpoint.referenceEndpoint.id === this.jpc.suspendedEndpoint.id;
              if (_cont) {
                var bb = this.instance.checkCondition(CHECK_DROP_ALLOWED, {
                  sourceEndpoint: this.jpc.endpoints[idx],
                  targetEndpoint: newDropTarget.endpoint.endpoint,
                  connection: this.jpc
                });
                if (bb) {
                  newDropTarget.endpoint.endpoint.addClass(this.instance.endpointDropAllowedClass);
                  newDropTarget.endpoint.endpoint.removeClass(this.instance.endpointDropForbiddenClass);
                } else {
                  newDropTarget.endpoint.endpoint.removeClass(this.instance.endpointDropAllowedClass);
                  newDropTarget.endpoint.endpoint.addClass(this.instance.endpointDropForbiddenClass);
                }
                this.floatingAnchor.over(newDropTarget.endpoint);
                this.instance._paintConnection(this.jpc);
              } else {
                newDropTarget = null;
              }
            }
          }
          this.currentDropTarget = newDropTarget;
        }
      }
    }, {
      key: "_maybeCleanup",
      value: function _maybeCleanup(ep) {
        if (ep._mtNew && ep.connections.length === 0) {
          this.instance.deleteEndpoint(ep);
        } else {
          delete ep._mtNew;
        }
      }
    }, {
      key: "_reattachOrDiscard",
      value: function _reattachOrDiscard(originalEvent) {
        var existingConnection = this.jpc.suspendedEndpoint != null;
        var idx = this._getFloatingAnchorIndex();
        if (existingConnection && this._shouldReattach()) {
          if (idx === 0) {
            this.jpc.source = this.jpc.suspendedElement;
            this.jpc.sourceId = this.jpc.suspendedElementId;
          } else {
            this.jpc.target = this.jpc.suspendedElement;
            this.jpc.targetId = this.jpc.suspendedElementId;
          }
          this._doForceReattach(idx);
          return true;
        } else {
          this._discard(idx, originalEvent);
          return false;
        }
      }
    }, {
      key: "onStop",
      value: function onStop(p) {
        var _this2 = this;
        var originalEvent = p.e;
        this.instance.isConnectionBeingDragged = false;
        this.instance.currentlyDragging = false;
        var classesToRemove = classList(CLASS_DRAG_HOVER, CLASS_DRAG_ACTIVE);
        var matchingSelectors = this.instance.getContainer().querySelectorAll(SELECTOR_DRAG_ACTIVE_OR_HOVER);
        forEach(matchingSelectors, function (el) {
          _this2.instance.removeClass(el, classesToRemove);
        });
        if (this.jpc && this.jpc.endpoints != null) {
          var existingConnection = this.jpc.suspendedEndpoint != null;
          var idx = this._getFloatingAnchorIndex();
          var suspendedEndpoint = this.jpc.suspendedEndpoint;
          var dropEndpoint;
          if (this.currentDropTarget != null) {
            dropEndpoint = this._getDropEndpoint(p, this.jpc);
            if (dropEndpoint == null) {
              this._reattachOrDiscard(p.e);
            } else {
              if (suspendedEndpoint && suspendedEndpoint.id === dropEndpoint.id) {
                this._doForceReattach(idx);
              } else {
                if (!dropEndpoint.enabled) {
                  this._reattachOrDiscard(p.e);
                } else if (dropEndpoint.isFull()) {
                  dropEndpoint.fire(EVENT_MAX_CONNECTIONS, {
                    endpoint: this,
                    connection: this.jpc,
                    maxConnections: this.instance.defaults.maxConnections
                  }, originalEvent);
                  this._reattachOrDiscard(p.e);
                } else {
                  if (idx === 0) {
                    this.jpc.source = dropEndpoint.element;
                    this.jpc.sourceId = dropEndpoint.elementId;
                  } else {
                    this.jpc.target = dropEndpoint.element;
                    this.jpc.targetId = dropEndpoint.elementId;
                  }
                  var _doContinue = true;
                  if (existingConnection && this.jpc.suspendedEndpoint.id !== dropEndpoint.id) {
                    if (!this.jpc.isDetachAllowed(this.jpc) || !this.jpc.endpoints[idx].isDetachAllowed(this.jpc) || !this.jpc.suspendedEndpoint.isDetachAllowed(this.jpc) || !this.instance.checkCondition("beforeDetach", this.jpc)) {
                      _doContinue = false;
                    }
                  }
                  _doContinue = _doContinue && dropEndpoint.isDropAllowed(this.jpc.sourceId, this.jpc.targetId, this.jpc.scope, this.jpc, dropEndpoint);
                  if (_doContinue) {
                    this._drop(dropEndpoint, idx, originalEvent, _doContinue);
                  } else {
                    this._reattachOrDiscard(p.e);
                  }
                }
              }
            }
          } else {
            this._reattachOrDiscard(p.e);
          }
          this.instance._refreshEndpoint(this.ep);
          this.ep.removeClass(this.instance.draggingClass);
          this._cleanupDraggablePlaceholder();
          this.jpc.removeClass(this.instance.draggingClass);
          delete this.jpc.suspendedEndpoint;
          delete this.jpc.suspendedElement;
          delete this.jpc.suspendedElementType;
          delete this.jpc.suspendedElementId;
          delete this.jpc.suspendedIndex;
          delete this.floatingId;
          delete this.floatingIndex;
          delete this.floatingElement;
          delete this.floatingEndpoint;
          delete this.floatingAnchor;
          delete this.jpc.pending;
          if (dropEndpoint != null) {
            this._maybeCleanup(dropEndpoint);
          }
        }
      }
    }, {
      key: "_getSourceDefinition",
      value: function _getSourceDefinition(evt) {
        var selector;
        var container = this.instance.getContainer();
        for (var i = 0; i < this.instance.sourceSelectors.length; i++) {
          selector = this.instance.sourceSelectors[i];
          if (selector.isEnabled()) {
            var r = selectorFilter(evt, container, selector.selector, this.instance, selector.exclude);
            if (r !== false) {
              return selector;
            }
          }
        }
      }
    }, {
      key: "_getDropEndpoint",
      value: function _getDropEndpoint(p, jpc) {
        var dropEndpoint;
        if (this.currentDropTarget.endpoint == null) {
          var targetDefinition = this.currentDropTarget.def;
          var eventTarget = p.e.target || p.e.srcElement;
          if (targetDefinition == null) {
            return null;
          }
          var targetElement = this.currentDropTarget.targetEl;
          var elxy = getPositionOnElement(p.e, targetElement, this.instance.currentZoom);
          var eps = this.instance._deriveEndpointAndAnchorSpec(jpc.getType().join(" "), true);
          var pp = eps.endpoints ? extend(p, {
            endpoint: targetDefinition.def.endpoint || eps.endpoints[1],
            cssClass: targetDefinition.def.cssClass || "",
            source: targetDefinition.def.source === true,
            target: targetDefinition.def.target === true
          }) : p;
          var anchorsToUse = this.instance.validAnchorsSpec(eps.anchors) ? eps.anchors : this.instance.areDefaultAnchorsSet() ? this.instance.defaults.anchors : null;
          var anchorFromDef = targetDefinition.def.anchor;
          var anchorFromPositionFinder = targetDefinition.def.anchorPositionFinder ? targetDefinition.def.anchorPositionFinder(targetElement, elxy, targetDefinition.def, p.e) : null;
          var dropAnchor = anchorFromPositionFinder != null ? anchorFromPositionFinder : anchorFromDef != null ? anchorFromDef : anchorsToUse != null && anchorsToUse[1] != null ? anchorsToUse[1] : null;
          if (dropAnchor != null) {
            pp = extend(pp, {
              anchor: dropAnchor
            });
          }
          if (targetDefinition.def.portId != null) {
            pp.portId = targetDefinition.def.portId;
          }
          var extractedParameters = targetDefinition.def.parameterExtractor ? targetDefinition.def.parameterExtractor(this.currentDropTarget.el, eventTarget, p.e) : {};
          pp = merge(pp, extractedParameters);
          pp.element = targetElement;
          dropEndpoint = this.instance._internal_newEndpoint(pp);
          dropEndpoint._mtNew = true;
          dropEndpoint.deleteOnEmpty = true;
          if (targetDefinition.def.parameters) {
            dropEndpoint.mergeParameters(targetDefinition.def.parameters);
          }
          if (targetDefinition.def.extract) {
            var tpayload = {};
            for (var att in targetDefinition.def.extract) {
              var v = this.currentDropTarget.el.getAttribute(att);
              if (v) {
                tpayload[targetDefinition.def.extract[att]] = v;
              }
            }
            dropEndpoint.mergeParameters(tpayload);
          }
        } else {
          dropEndpoint = this.currentDropTarget.endpoint;
        }
        if (dropEndpoint) {
          dropEndpoint.removeClass(this.instance.endpointDropAllowedClass);
          dropEndpoint.removeClass(this.instance.endpointDropForbiddenClass);
        }
        return dropEndpoint;
      }
    }, {
      key: "_doForceReattach",
      value: function _doForceReattach(idx) {
        this.floatingEndpoint.detachFromConnection(this.jpc, null, true);
        this.jpc.endpoints[idx] = this.jpc.suspendedEndpoint;
        this.instance.setHover(this.jpc, false);
        this.jpc._forceDetach = true;
        this.jpc.suspendedEndpoint.addConnection(this.jpc);
        this.instance.sourceOrTargetChanged(this.floatingId, this.jpc.suspendedEndpoint.elementId, this.jpc, this.jpc.suspendedEndpoint.element, idx);
        this.instance.deleteEndpoint(this.floatingEndpoint);
        this.instance.repaint(this.jpc.source);
        delete this.jpc._forceDetach;
      }
    }, {
      key: "_shouldReattach",
      value: function _shouldReattach() {
        if (this.jpc.isReattach() || this.jpc._forceReattach) {
          return true;
        } else {
          var suspendedEndpoint = this.jpc.suspendedEndpoint,
              otherEndpointIdx = this.jpc.suspendedElementType == SOURCE ? 1 : 0,
              otherEndpoint = this.jpc.endpoints[otherEndpointIdx];
          return !functionChain(true, false, [[suspendedEndpoint, IS_DETACH_ALLOWED, [this.jpc]], [otherEndpoint, IS_DETACH_ALLOWED, [this.jpc]], [this.jpc, IS_DETACH_ALLOWED, [this.jpc]], [this.instance, CHECK_CONDITION, [INTERCEPT_BEFORE_DETACH, this.jpc]]]);
        }
      }
    }, {
      key: "_discard",
      value: function _discard(idx, originalEvent) {
        if (this.jpc.pending) {
          this.instance.fire(EVENT_CONNECTION_ABORT, this.jpc, originalEvent);
        } else {
          if (idx === 0) {
            this.jpc.source = this.jpc.suspendedEndpoint.element;
            this.jpc.sourceId = this.jpc.suspendedEndpoint.elementId;
          } else {
            this.jpc.target = this.jpc.suspendedEndpoint.element;
            this.jpc.targetId = this.jpc.suspendedEndpoint.elementId;
          }
          this.jpc.endpoints[idx] = this.jpc.suspendedEndpoint;
        }
        if (this.floatingEndpoint) {
          this.floatingEndpoint.detachFromConnection(this.jpc);
        }
        this.instance.deleteConnection(this.jpc, {
          originalEvent: originalEvent,
          force: true
        });
      }
    }, {
      key: "_drop",
      value: function _drop(dropEndpoint, idx, originalEvent, optionalData) {
        this.jpc.endpoints[idx].detachFromConnection(this.jpc);
        if (this.jpc.suspendedEndpoint) {
          this.jpc.suspendedEndpoint.detachFromConnection(this.jpc);
        }
        this.jpc.endpoints[idx] = dropEndpoint;
        dropEndpoint.addConnection(this.jpc);
        if (this.jpc.suspendedEndpoint) {
          var suspendedElementId = this.jpc.suspendedEndpoint.elementId;
          this.instance.fireMoveEvent({
            index: idx,
            originalSourceId: idx === 0 ? suspendedElementId : this.jpc.sourceId,
            newSourceId: idx === 0 ? dropEndpoint.elementId : this.jpc.sourceId,
            originalTargetId: idx === 1 ? suspendedElementId : this.jpc.targetId,
            newTargetId: idx === 1 ? dropEndpoint.elementId : this.jpc.targetId,
            originalEndpoint: this.jpc.suspendedEndpoint,
            connection: this.jpc,
            newEndpoint: dropEndpoint
          }, originalEvent);
        }
        if (idx === 1) {
          this.instance.sourceOrTargetChanged(this.floatingId, this.jpc.targetId, this.jpc, this.jpc.target, 1);
        } else {
          this.instance.sourceOrTargetChanged(this.floatingId, this.jpc.sourceId, this.jpc, this.jpc.source, 0);
        }
        if (this.jpc.endpoints[0].finalEndpoint) {
          var _toDelete = this.jpc.endpoints[0];
          _toDelete.detachFromConnection(this.jpc);
          this.jpc.endpoints[0] = this.jpc.endpoints[0].finalEndpoint;
          this.jpc.endpoints[0].addConnection(this.jpc);
        }
        if (isObject(optionalData)) {
          this.jpc.mergeData(optionalData);
        }
        if (this._originalAnchorSpec) {
          this.jpc.endpoints[0].setAnchor(this._originalAnchorSpec);
          this._originalAnchorSpec = null;
        }
        this.instance._finaliseConnection(this.jpc, null, originalEvent);
        this.instance.setHover(this.jpc, false);
        this.instance.revalidate(this.jpc.endpoints[0].element);
      }
    }, {
      key: "_registerFloatingConnection",
      value: function _registerFloatingConnection(info, conn) {
        this.floatingConnections[info.id] = conn;
      }
    }, {
      key: "_getFloatingAnchorIndex",
      value: function _getFloatingAnchorIndex() {
        return this.floatingIndex == null ? 1 : this.floatingIndex;
      }
    }]);
    return EndpointDragHandler;
  }();

  var GroupDragHandler = function (_ElementDragHandler) {
    _inherits(GroupDragHandler, _ElementDragHandler);
    var _super = _createSuper(GroupDragHandler);
    function GroupDragHandler(instance, dragSelection) {
      var _this;
      _classCallCheck(this, GroupDragHandler);
      _this = _super.call(this, instance, dragSelection);
      _this.instance = instance;
      _this.dragSelection = dragSelection;
      _defineProperty(_assertThisInitialized(_this), "selector", [">", SELECTOR_GROUP, SELECTOR_MANAGED_ELEMENT].join(" "));
      _defineProperty(_assertThisInitialized(_this), "doRevalidate", void 0);
      _this.doRevalidate = _this._revalidate.bind(_assertThisInitialized(_this));
      return _this;
    }
    _createClass(GroupDragHandler, [{
      key: "reset",
      value: function reset() {
        this.drag.off(EVENT_REVERT, this.doRevalidate);
      }
    }, {
      key: "_revalidate",
      value: function _revalidate(el) {
        this.instance.revalidate(el);
      }
    }, {
      key: "init",
      value: function init(drag) {
        this.drag = drag;
        drag.on(EVENT_REVERT, this.doRevalidate);
      }
    }, {
      key: "useGhostProxy",
      value: function useGhostProxy(container, dragEl) {
        var group = dragEl._jsPlumbParentGroup;
        return group == null ? false : group.ghost === true;
      }
    }, {
      key: "makeGhostProxy",
      value: function makeGhostProxy(el) {
        var jel = el;
        var newEl = jel.cloneNode(true);
        newEl._jsPlumbParentGroup = jel._jsPlumbParentGroup;
        return newEl;
      }
    }]);
    return GroupDragHandler;
  }(ElementDragHandler);

  var HTMLElementOverlay = function () {
    function HTMLElementOverlay(instance, overlay) {
      _classCallCheck(this, HTMLElementOverlay);
      this.instance = instance;
      this.overlay = overlay;
      _defineProperty(this, "htmlElementOverlay", void 0);
      this.htmlElementOverlay = overlay;
    }
    _createClass(HTMLElementOverlay, null, [{
      key: "getElement",
      value: function getElement(o, component, elementCreator) {
        if (o.canvas == null) {
          if (elementCreator && component) {
            o.canvas = elementCreator(component);
            var cls = o.instance.overlayClass + " " + (o.cssClass ? o.cssClass : "");
            o.instance.addClass(o.canvas, cls);
          } else {
            o.canvas = createElement(ELEMENT_DIV, {}, o.instance.overlayClass + " " + (o.cssClass ? o.cssClass : ""));
          }
          o.instance.setAttribute(o.canvas, "jtk-overlay-id", o.id);
          for (var att in o.attributes) {
            o.instance.setAttribute(o.canvas, att, o.attributes[att]);
          }
          o.canvas.style.position = ABSOLUTE;
          o.instance._appendElement(o.canvas, o.instance.getContainer());
          o.instance.getId(o.canvas);
          var ts = "translate(-50%, -50%)";
          o.canvas.style.webkitTransform = ts;
          o.canvas.style.mozTransform = ts;
          o.canvas.style.msTransform = ts;
          o.canvas.style.oTransform = ts;
          o.canvas.style.transform = ts;
          if (!o.isVisible()) {
            o.canvas.style.display = NONE;
          }
          o.canvas.jtk = {
            overlay: o
          };
        }
        return o.canvas;
      }
    }, {
      key: "destroy",
      value: function destroy(o) {
        o.canvas && o.canvas.parentNode && o.canvas.parentNode.removeChild(o.canvas);
        delete o.canvas;
        delete o.cachedDimensions;
      }
    }, {
      key: "_getDimensions",
      value: function _getDimensions(o, forceRefresh) {
        if (o.cachedDimensions == null || forceRefresh) {
          o.cachedDimensions = {
            w: 1,
            h: 1
          };
        }
        return o.cachedDimensions;
      }
    }]);
    return HTMLElementOverlay;
  }();

  function ensureSVGOverlayPath(o) {
    if (o.path == null) {
      var atts = extend({
        "jtk-overlay-id": o.id
      }, o.attributes);
      o.path = _node(ELEMENT_PATH, atts);
      var cls = o.instance.overlayClass + " " + (o.cssClass ? o.cssClass : "");
      o.instance.addClass(o.path, cls);
      o.path.jtk = {
        overlay: o
      };
    }
    var parent = o.path.parentNode;
    if (parent == null) {
      if (o.component instanceof Connection) {
        var connector = o.component.connector;
        parent = connector != null ? connector.canvas : null;
      } else if (o.component instanceof Endpoint) {
        var endpoint = o.component.endpoint;
        parent = endpoint != null ? endpoint.canvas : endpoint;
      }
      if (parent != null) {
        _appendAtIndex(parent, o.path, 1);
      }
    }
    return o.path;
  }
  function paintSVGOverlay(o, path, params, extents) {
    ensureSVGOverlayPath(o);
    var offset = [0, 0];
    if (extents.xmin < 0) {
      offset[0] = -extents.xmin;
    }
    if (extents.ymin < 0) {
      offset[1] = -extents.ymin;
    }
    var a = {
      "d": path,
      stroke: params.stroke ? params.stroke : null,
      fill: params.fill ? params.fill : null,
      transform: "translate(" + offset[0] + "," + offset[1] + ")",
      "pointer-events": "visibleStroke"
    };
    _attr(o.path, a);
  }
  function destroySVGOverlay(o, force) {
    var _o = o;
    if (_o.path != null && _o.path.parentNode != null) {
      _o.path.parentNode.removeChild(_o.path);
    }
    if (_o.bgPath != null && _o.bgPath.parentNode != null) {
      _o.bgPath.parentNode.removeChild(_o.bgPath);
    }
    delete _o.path;
    delete _o.bgPath;
  }
  (function (_Overlay) {
    _inherits(SVGElementOverlay, _Overlay);
    var _super = _createSuper(SVGElementOverlay);
    function SVGElementOverlay() {
      var _this;
      _classCallCheck(this, SVGElementOverlay);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty(_assertThisInitialized(_this), "path", void 0);
      return _this;
    }
    return SVGElementOverlay;
  })(Overlay);

  var SvgComponent = function () {
    function SvgComponent() {
      _classCallCheck(this, SvgComponent);
    }
    _createClass(SvgComponent, null, [{
      key: "paint",
      value: function paint(connector, instance, paintStyle, extents) {
        if (paintStyle != null) {
          var xy = [connector.x, connector.y],
              wh = [connector.w, connector.h];
          if (extents != null) {
            if (extents.xmin < 0) {
              xy[0] += extents.xmin;
            }
            if (extents.ymin < 0) {
              xy[1] += extents.ymin;
            }
            wh[0] = extents.xmax + (extents.xmin < 0 ? -extents.xmin : 0);
            wh[1] = extents.ymax + (extents.ymin < 0 ? -extents.ymin : 0);
          }
          if (isFinite(wh[0]) && isFinite(wh[1])) {
            var attrs = {
              "width": "" + (wh[0] || 0),
              "height": "" + (wh[1] || 0)
            };
            if (instance.containerType === exports.ElementTypes.HTML) {
              _attr(connector.canvas, extend(attrs, {
                style: _pos([xy[0], xy[1]])
              }));
            } else {
              _attr(connector.canvas, extend(attrs, {
                x: xy[0],
                y: xy[1]
              }));
            }
          }
        }
      }
    }]);
    return SvgComponent;
  }();

  function paintSvgConnector(instance, connector, paintStyle, extents) {
    getConnectorElement(instance, connector);
    SvgComponent.paint(connector, instance, paintStyle, extents);
    var p = "",
        offset = [0, 0];
    if (extents.xmin < 0) {
      offset[0] = -extents.xmin;
    }
    if (extents.ymin < 0) {
      offset[1] = -extents.ymin;
    }
    if (connector.segments.length > 0) {
      p = instance.getPathData(connector);
      var a = {
        d: p,
        transform: "translate(" + offset[0] + "," + offset[1] + ")",
        "pointer-events": "visibleStroke"
      },
          outlineStyle = null;
      if (paintStyle.outlineStroke) {
        var outlineWidth = paintStyle.outlineWidth || 1,
            outlineStrokeWidth = paintStyle.strokeWidth + 2 * outlineWidth;
        outlineStyle = extend({}, paintStyle);
        outlineStyle.stroke = paintStyle.outlineStroke;
        outlineStyle.strokeWidth = outlineStrokeWidth;
        if (connector.bgPath == null) {
          connector.bgPath = _node(ELEMENT_PATH, a);
          instance.addClass(connector.bgPath, instance.connectorOutlineClass);
          _appendAtIndex(connector.canvas, connector.bgPath, 0);
        } else {
          _attr(connector.bgPath, a);
        }
        _applyStyles(connector.canvas, connector.bgPath, outlineStyle);
      }
      var cany = connector;
      if (cany.path == null) {
        cany.path = _node(ELEMENT_PATH, a);
        _appendAtIndex(cany.canvas, cany.path, paintStyle.outlineStroke ? 1 : 0);
      } else {
        if (cany.path.parentNode !== cany.canvas) {
          _appendAtIndex(cany.canvas, cany.path, paintStyle.outlineStroke ? 1 : 0);
        }
        _attr(connector.path, a);
      }
      _applyStyles(connector.canvas, connector.path, paintStyle);
    }
  }
  function getConnectorElement(instance, c) {
    if (c.canvas != null) {
      return c.canvas;
    } else {
      var svg = _node(ELEMENT_SVG, {
        "style": "",
        "width": "0",
        "height": "0",
        "pointer-events": NONE,
        "position": ABSOLUTE
      });
      c.canvas = svg;
      instance._appendElement(c.canvas, instance.getContainer());
      if (c.cssClass != null) {
        instance.addClass(svg, c.cssClass);
      }
      instance.addClass(svg, instance.connectorClass);
      svg.jtk = svg.jtk || {};
      svg.jtk.connector = c;
      return svg;
    }
  }

  var SvgEndpoint = function () {
    function SvgEndpoint() {
      _classCallCheck(this, SvgEndpoint);
    }
    _createClass(SvgEndpoint, null, [{
      key: "getEndpointElement",
      value: function getEndpointElement(ep) {
        if (ep.canvas != null) {
          return ep.canvas;
        } else {
          var canvas = _node(ELEMENT_SVG, {
            "style": "",
            "width": "0",
            "height": "0",
            "pointer-events": "all",
            "position": ABSOLUTE
          });
          ep.canvas = canvas;
          var classes = ep.classes.join(" ");
          ep.instance.addClass(canvas, classes);
          var scopes = ep.endpoint.scope.split(/\s/);
          for (var i = 0; i < scopes.length; i++) {
            ep.instance.setAttribute(canvas, ATTRIBUTE_SCOPE_PREFIX + scopes[i], TRUE$1);
          }
          ep.instance._appendElementToContainer(canvas);
          if (ep.cssClass != null) {
            ep.instance.addClass(canvas, ep.cssClass);
          }
          ep.instance.addClass(canvas, ep.instance.endpointClass);
          canvas.jtk = canvas.jtk || {};
          canvas.jtk.endpoint = ep.endpoint;
          canvas.style.display = ep.endpoint.visible !== false ? BLOCK : NONE;
          return canvas;
        }
      }
    }, {
      key: "paint",
      value: function paint(ep, handlers, paintStyle) {
        if (ep.endpoint.deleted !== true) {
          this.getEndpointElement(ep);
          SvgComponent.paint(ep, ep.instance, paintStyle);
          var s = extend({}, paintStyle);
          if (s.outlineStroke) {
            s.stroke = s.outlineStroke;
          }
          if (ep.node == null) {
            ep.node = handlers.makeNode(ep, s);
            ep.canvas.appendChild(ep.node);
          } else if (handlers.updateNode != null) {
            handlers.updateNode(ep, ep.node);
          }
          _applyStyles(ep.canvas, ep.node, s);
        }
      }
    }]);
    return SvgEndpoint;
  }();

  var endpointMap = {};
  function registerEndpointRenderer(name, fns) {
    endpointMap[name] = fns;
  }
  function getPositionOnElement(evt, el, zoom) {
    var jel = el;
    var box = _typeof(el.getBoundingClientRect) !== UNDEFINED ? el.getBoundingClientRect() : {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    },
        body = document.body,
        docElem = document.documentElement,
        scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        pst = 0,
        psl = 0,
        top = box.top + scrollTop - clientTop + pst * zoom,
        left = box.left + scrollLeft - clientLeft + psl * zoom,
        cl = pageLocation(evt),
        w = box.width || jel.offsetWidth * zoom,
        h = box.height || jel.offsetHeight * zoom,
        x = (cl.x - left) / w,
        y = (cl.y - top) / h;
    return {
      x: x,
      y: y
    };
  }
  function isSVGElementOverlay(o) {
    return isArrowOverlay(o) || isDiamondOverlay(o) || isPlainArrowOverlay(o);
  }
  function setVisible(component, v) {
    if (component.canvas) {
      component.canvas.style.display = v ? "block" : "none";
    }
  }
  function cleanup(component) {
    if (component.canvas) {
      component.canvas.parentNode.removeChild(component.canvas);
    }
    delete component.canvas;
  }
  function getEndpointCanvas(ep) {
    return ep.canvas;
  }
  function getLabelElement(o) {
    return HTMLElementOverlay.getElement(o);
  }
  function getCustomElement(o) {
    return HTMLElementOverlay.getElement(o, o.component, function (c) {
      var el = o.create(c);
      o.instance.addClass(el, o.instance.overlayClass);
      return el;
    });
  }
  function groupDragConstrain(desiredLoc, dragEl, constrainRect, size) {
    var x = desiredLoc.x,
        y = desiredLoc.y;
    if (dragEl._jsPlumbParentGroup && dragEl._jsPlumbParentGroup.constrain) {
      x = Math.max(desiredLoc.x, 0);
      y = Math.max(desiredLoc.y, 0);
      x = Math.min(x, constrainRect.w - size.w);
      y = Math.min(y, constrainRect.h - size.h);
    }
    return {
      x: x,
      y: y
    };
  }
  var BrowserJsPlumbInstance = function (_JsPlumbInstance) {
    _inherits(BrowserJsPlumbInstance, _JsPlumbInstance);
    var _super = _createSuper(BrowserJsPlumbInstance);
    function BrowserJsPlumbInstance(_instanceIndex, defaults) {
      var _this;
      _classCallCheck(this, BrowserJsPlumbInstance);
      _this = _super.call(this, _instanceIndex, defaults);
      _this._instanceIndex = _instanceIndex;
      _defineProperty(_assertThisInitialized(_this), "containerType", null);
      _defineProperty(_assertThisInitialized(_this), "dragSelection", void 0);
      _defineProperty(_assertThisInitialized(_this), "dragManager", void 0);
      _defineProperty(_assertThisInitialized(_this), "_connectorClick", void 0);
      _defineProperty(_assertThisInitialized(_this), "_connectorDblClick", void 0);
      _defineProperty(_assertThisInitialized(_this), "_connectorTap", void 0);
      _defineProperty(_assertThisInitialized(_this), "_connectorDblTap", void 0);
      _defineProperty(_assertThisInitialized(_this), "_endpointClick", void 0);
      _defineProperty(_assertThisInitialized(_this), "_endpointDblClick", void 0);
      _defineProperty(_assertThisInitialized(_this), "_overlayClick", void 0);
      _defineProperty(_assertThisInitialized(_this), "_overlayDblClick", void 0);
      _defineProperty(_assertThisInitialized(_this), "_overlayTap", void 0);
      _defineProperty(_assertThisInitialized(_this), "_overlayDblTap", void 0);
      _defineProperty(_assertThisInitialized(_this), "_connectorMouseover", void 0);
      _defineProperty(_assertThisInitialized(_this), "_connectorMouseout", void 0);
      _defineProperty(_assertThisInitialized(_this), "_endpointMouseover", void 0);
      _defineProperty(_assertThisInitialized(_this), "_endpointMouseout", void 0);
      _defineProperty(_assertThisInitialized(_this), "_connectorContextmenu", void 0);
      _defineProperty(_assertThisInitialized(_this), "_connectorMousedown", void 0);
      _defineProperty(_assertThisInitialized(_this), "_connectorMouseup", void 0);
      _defineProperty(_assertThisInitialized(_this), "_endpointMousedown", void 0);
      _defineProperty(_assertThisInitialized(_this), "_endpointMouseup", void 0);
      _defineProperty(_assertThisInitialized(_this), "_overlayMouseover", void 0);
      _defineProperty(_assertThisInitialized(_this), "_overlayMouseout", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementClick", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementTap", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementDblTap", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementMouseenter", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementMouseexit", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementMousemove", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementMouseup", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementMousedown", void 0);
      _defineProperty(_assertThisInitialized(_this), "_elementContextmenu", void 0);
      _defineProperty(_assertThisInitialized(_this), "_resizeObserver", void 0);
      _defineProperty(_assertThisInitialized(_this), "eventManager", void 0);
      _defineProperty(_assertThisInitialized(_this), "draggingClass", "jtk-dragging");
      _defineProperty(_assertThisInitialized(_this), "elementDraggingClass", "jtk-element-dragging");
      _defineProperty(_assertThisInitialized(_this), "hoverClass", "jtk-hover");
      _defineProperty(_assertThisInitialized(_this), "sourceElementDraggingClass", "jtk-source-element-dragging");
      _defineProperty(_assertThisInitialized(_this), "targetElementDraggingClass", "jtk-target-element-dragging");
      _defineProperty(_assertThisInitialized(_this), "hoverSourceClass", "jtk-source-hover");
      _defineProperty(_assertThisInitialized(_this), "hoverTargetClass", "jtk-target-hover");
      _defineProperty(_assertThisInitialized(_this), "dragSelectClass", "jtk-drag-select");
      _defineProperty(_assertThisInitialized(_this), "managedElementsSelector", void 0);
      _defineProperty(_assertThisInitialized(_this), "elementsDraggable", void 0);
      _defineProperty(_assertThisInitialized(_this), "elementDragHandler", void 0);
      _defineProperty(_assertThisInitialized(_this), "groupDragOptions", void 0);
      _defineProperty(_assertThisInitialized(_this), "elementDragOptions", void 0);
      _defineProperty(_assertThisInitialized(_this), "svg", {
        node: function node(name, attributes) {
          return _node(name, attributes);
        },
        attr: function attr(node, attributes) {
          return _attr(node, attributes);
        },
        pos: function pos(d) {
          return _pos(d);
        }
      });
      defaults = defaults || {};
      _this.containerType = getElementType(_this.getContainer());
      _this.elementsDraggable = defaults && defaults.elementsDraggable !== false;
      _this.managedElementsSelector = defaults ? defaults.managedElementsSelector || SELECTOR_MANAGED_ELEMENT : SELECTOR_MANAGED_ELEMENT;
      _this.eventManager = new EventManager();
      _this.dragSelection = new DragSelection(_assertThisInitialized(_this));
      _this.dragManager = new DragManager(_assertThisInitialized(_this), _this.dragSelection);
      _this.dragManager.addHandler(new EndpointDragHandler(_assertThisInitialized(_this)));
      _this.groupDragOptions = {
        constrainFunction: groupDragConstrain
      };
      _this.dragManager.addHandler(new GroupDragHandler(_assertThisInitialized(_this), _this.dragSelection), _this.groupDragOptions);
      _this.elementDragHandler = new ElementDragHandler(_assertThisInitialized(_this), _this.dragSelection);
      _this.elementDragOptions = defaults && defaults.dragOptions || {};
      _this.dragManager.addHandler(_this.elementDragHandler, _this.elementDragOptions);
      if (defaults && defaults.dragOptions && defaults.dragOptions.filter) {
        _this.dragManager.addFilter(defaults.dragOptions.filter);
      }
      _this._createEventListeners();
      _this._attachEventDelegates();
      if (defaults.resizeObserver !== false) {
        try {
          _this._resizeObserver = new ResizeObserver(function (entries) {
            var updates = entries.filter(function (e) {
              var a = _this.getAttribute(e.target, ATTRIBUTE_MANAGED);
              if (a != null) {
                var v = _this.viewport._elementMap.get(a);
                return v ? v.w !== e.contentRect.width || v.h !== e.contentRect.height : false;
              } else {
                return false;
              }
            });
            updates.forEach(function (el) {
              return _this.revalidate(el.target);
            });
          });
        } catch (e) {
          log("WARN: ResizeObserver could not be attached.");
        }
      }
      return _this;
    }
    _createClass(BrowserJsPlumbInstance, [{
      key: "fireOverlayMethod",
      value: function fireOverlayMethod(overlay, event, e) {
        var stem = overlay.component instanceof Connection ? CONNECTION : ENDPOINT;
        var mappedEvent = compoundEvent(stem, event)
        ;
        e._jsPlumbOverlay = overlay;
        overlay.fire(event, {
          e: e,
          overlay: overlay
        });
        this.fire(mappedEvent, overlay.component, e);
      }
    }, {
      key: "addDragFilter",
      value: function addDragFilter(filter, exclude) {
        this.dragManager.addFilter(filter, exclude);
      }
    }, {
      key: "removeDragFilter",
      value: function removeDragFilter(filter) {
        this.dragManager.removeFilter(filter);
      }
    }, {
      key: "setDragGrid",
      value: function setDragGrid(grid) {
        this.dragManager.setOption(this.elementDragHandler, {
          grid: grid
        });
      }
    }, {
      key: "setDragConstrainFunction",
      value: function setDragConstrainFunction(constrainFunction) {
        this.dragManager.setOption(this.elementDragHandler, {
          constrainFunction: constrainFunction
        });
      }
    }, {
      key: "_removeElement",
      value: function _removeElement(element) {
        element.parentNode && element.parentNode.removeChild(element);
      }
    }, {
      key: "_appendElement",
      value: function _appendElement(el, parent) {
        if (parent) {
          parent.appendChild(el);
        }
      }
    }, {
      key: "_appendElementToGroup",
      value: function _appendElementToGroup(group, el) {
        this.getGroupContentArea(group).appendChild(el);
      }
    }, {
      key: "_appendElementToContainer",
      value: function _appendElementToContainer(el) {
        this._appendElement(el, this.getContainer());
      }
    }, {
      key: "_getAssociatedElements",
      value: function _getAssociatedElements(el) {
        var a = [];
        if (el.nodeType !== 3 && el.nodeType !== 8) {
          var els = el.querySelectorAll(SELECTOR_MANAGED_ELEMENT);
          Array.prototype.push.apply(a, els);
        }
        return a.filter(function (_a) {
          return _a.nodeType !== 3 && _a.nodeType !== 8;
        });
      }
    }, {
      key: "shouldFireEvent",
      value: function shouldFireEvent(event, value, originalEvent) {
        return true;
      }
    }, {
      key: "getClass",
      value: function getClass$1(el) {
        return getClass(el);
      }
    }, {
      key: "addClass",
      value: function addClass$1(el, clazz) {
        addClass(el, clazz);
      }
    }, {
      key: "hasClass",
      value: function hasClass$1(el, clazz) {
        return hasClass(el, clazz);
      }
    }, {
      key: "removeClass",
      value: function removeClass$1(el, clazz) {
        removeClass(el, clazz);
      }
    }, {
      key: "toggleClass",
      value: function toggleClass$1(el, clazz) {
        toggleClass(el, clazz);
      }
    }, {
      key: "setAttribute",
      value: function setAttribute(el, name, value) {
        el.setAttribute(name, value);
      }
    }, {
      key: "getAttribute",
      value: function getAttribute(el, name) {
        return el.getAttribute(name);
      }
    }, {
      key: "setAttributes",
      value: function setAttributes(el, atts) {
        for (var i in atts) {
          el.setAttribute(i, atts[i]);
        }
      }
    }, {
      key: "removeAttribute",
      value: function removeAttribute(el, attName) {
        el.removeAttribute && el.removeAttribute(attName);
      }
    }, {
      key: "on",
      value: function on(el, event, callbackOrSelector, callback) {
        var _this2 = this;
        var _one = function _one(_el) {
          if (callback == null) {
            _this2.eventManager.on(_el, event, callbackOrSelector);
          } else {
            _this2.eventManager.on(_el, event, callbackOrSelector, callback);
          }
        };
        if (isNodeList(el)) {
          forEach(el, function (el) {
            return _one(el);
          });
        } else {
          _one(el);
        }
        return this;
      }
    }, {
      key: "off",
      value: function off(el, event, callback) {
        var _this3 = this;
        if (isNodeList(el)) {
          forEach(el, function (_el) {
            return _this3.eventManager.off(_el, event, callback);
          });
        } else {
          this.eventManager.off(el, event, callback);
        }
        return this;
      }
    }, {
      key: "trigger",
      value: function trigger(el, event, originalEvent, payload, detail) {
        this.eventManager.trigger(el, event, originalEvent, payload, detail);
      }
    }, {
      key: "getOffsetRelativeToRoot",
      value: function getOffsetRelativeToRoot(el) {
        return offsetRelativeToRoot(el);
      }
    }, {
      key: "getOffset",
      value: function getOffset(el) {
        var jel = el;
        var container = this.getContainer();
        var out = this.getPosition(jel),
            op = el !== container && jel.offsetParent !== container ? jel.offsetParent : null,
            _maybeAdjustScroll = function _maybeAdjustScroll(offsetParent) {
          if (offsetParent != null && offsetParent !== document.body && (offsetParent.scrollTop > 0 || offsetParent.scrollLeft > 0)) {
            out.x -= offsetParent.scrollLeft;
            out.y -= offsetParent.scrollTop;
          }
        };
        while (op != null) {
          out.x += op.offsetLeft;
          out.y += op.offsetTop;
          _maybeAdjustScroll(op);
          op = op.offsetParent === container ? null : op.offsetParent;
        }
        if (container != null && (container.scrollTop > 0 || container.scrollLeft > 0)) {
          var pp = jel.offsetParent != null ? this.getStyle(jel.offsetParent, PROPERTY_POSITION) : STATIC,
          p = this.getStyle(jel, PROPERTY_POSITION);
          if (p !== ABSOLUTE && p !== FIXED && pp !== ABSOLUTE && pp !== FIXED) {
            out.x -= container.scrollLeft;
            out.y -= container.scrollTop;
          }
        }
        return out;
      }
    }, {
      key: "getSize",
      value: function getSize(el) {
        var _el = el;
        if (_el.offsetWidth != null) {
          return offsetSize(el);
        } else if (_el.width && _el.width.baseVal) {
          return svgWidthHeightSize(_el);
        }
      }
    }, {
      key: "getPosition",
      value: function getPosition(el) {
        var _el = el;
        if (_el.offsetLeft != null) {
          return {
            x: parseFloat(_el.offsetLeft),
            y: parseFloat(_el.offsetTop)
          };
        } else if (_el.x && _el.x.baseVal) {
          return svgXYPosition(_el);
        }
      }
    }, {
      key: "getStyle",
      value: function getStyle(el, prop) {
        if (_typeof(window.getComputedStyle) !== UNDEFINED) {
          return getComputedStyle(el, null).getPropertyValue(prop);
        } else {
          return el.currentStyle[prop];
        }
      }
    }, {
      key: "getGroupContentArea",
      value: function getGroupContentArea(group) {
        var da = this.getSelector(group.el, SELECTOR_GROUP_CONTAINER);
        return da && da.length > 0 ? da[0] : group.el;
      }
    }, {
      key: "getSelector",
      value: function getSelector(ctx, spec) {
        var sel = null;
        if (arguments.length === 1) {
          if (!isString(ctx)) {
            var nodeList = document.createDocumentFragment();
            nodeList.appendChild(ctx);
            return fromArray(nodeList.childNodes);
          }
          sel = fromArray(document.querySelectorAll(ctx));
        } else {
          sel = fromArray(ctx.querySelectorAll(spec));
        }
        return sel;
      }
    }, {
      key: "setPosition",
      value: function setPosition(el, p) {
        var jel = el;
        jel.style.left = p.x + "px";
        jel.style.top = p.y + "px";
      }
    }, {
      key: "setDraggable",
      value: function setDraggable(element, draggable) {
        if (draggable) {
          this.removeAttribute(element, ATTRIBUTE_NOT_DRAGGABLE);
        } else {
          this.setAttribute(element, ATTRIBUTE_NOT_DRAGGABLE, TRUE$1);
        }
      }
    }, {
      key: "isDraggable",
      value: function isDraggable(el) {
        var d = this.getAttribute(el, ATTRIBUTE_NOT_DRAGGABLE);
        return d == null || d === FALSE$1;
      }
    }, {
      key: "toggleDraggable",
      value: function toggleDraggable(el) {
        var state = this.isDraggable(el);
        this.setDraggable(el, !state);
        return !state;
      }
    }, {
      key: "_createEventListeners",
      value: function _createEventListeners() {
        var _connClick = function _connClick(event, e) {
          if (!e.defaultPrevented && e._jsPlumbOverlay == null) {
            var connectorElement = findParent(getEventSource(e), SELECTOR_CONNECTOR, this.getContainer(), true);
            this.fire(event, connectorElement.jtk.connector.connection, e);
          }
        };
        this._connectorClick = _connClick.bind(this, EVENT_CONNECTION_CLICK);
        this._connectorDblClick = _connClick.bind(this, EVENT_CONNECTION_DBL_CLICK);
        this._connectorTap = _connClick.bind(this, EVENT_CONNECTION_TAP);
        this._connectorDblTap = _connClick.bind(this, EVENT_CONNECTION_DBL_TAP);
        var _connectorHover = function _connectorHover(state, e) {
          var el = getEventSource(e).parentNode;
          if (el.jtk && el.jtk.connector) {
            var connector = el.jtk.connector;
            var connection = connector.connection;
            this.setConnectorHover(connector, state);
            if (state) {
              this.addClass(connection.source, this.hoverSourceClass);
              this.addClass(connection.target, this.hoverTargetClass);
            } else {
              this.removeClass(connection.source, this.hoverSourceClass);
              this.removeClass(connection.target, this.hoverTargetClass);
            }
            this.fire(state ? EVENT_CONNECTION_MOUSEOVER : EVENT_CONNECTION_MOUSEOUT, el.jtk.connector.connection, e);
          }
        };
        this._connectorMouseover = _connectorHover.bind(this, true);
        this._connectorMouseout = _connectorHover.bind(this, false);
        var _connectorMouseupdown = function _connectorMouseupdown(state, e) {
          var el = getEventSource(e).parentNode;
          if (el.jtk && el.jtk.connector) {
            this.fire(state ? EVENT_CONNECTION_MOUSEUP : EVENT_CONNECTION_MOUSEDOWN, el.jtk.connector.connection, e);
          }
        };
        this._connectorMouseup = _connectorMouseupdown.bind(this, true);
        this._connectorMousedown = _connectorMouseupdown.bind(this, false);
        this._connectorContextmenu = function (e) {
          var el = getEventSource(e).parentNode;
          if (el.jtk && el.jtk.connector) {
            this.fire(EVENT_CONNECTION_CONTEXTMENU, el.jtk.connector.connection, e);
          }
        }.bind(this);
        var _epClick = function _epClick(event, e, endpointElement) {
          if (!e.defaultPrevented && e._jsPlumbOverlay == null) {
            this.fire(event, endpointElement.jtk.endpoint, e);
          }
        };
        this._endpointClick = _epClick.bind(this, EVENT_ENDPOINT_CLICK);
        this._endpointDblClick = _epClick.bind(this, EVENT_ENDPOINT_DBL_CLICK);
        var _endpointHover = function _endpointHover(state, e) {
          var el = getEventSource(e);
          if (el.jtk && el.jtk.endpoint) {
            this.setEndpointHover(el.jtk.endpoint, state);
            this.fire(state ? EVENT_ENDPOINT_MOUSEOVER : EVENT_ENDPOINT_MOUSEOUT, el.jtk.endpoint, e);
          }
        };
        this._endpointMouseover = _endpointHover.bind(this, true);
        this._endpointMouseout = _endpointHover.bind(this, false);
        var _endpointMouseupdown = function _endpointMouseupdown(state, e) {
          var el = getEventSource(e);
          if (el.jtk && el.jtk.endpoint) {
            this.fire(state ? EVENT_ENDPOINT_MOUSEUP : EVENT_ENDPOINT_MOUSEDOWN, el.jtk.endpoint, e);
          }
        };
        this._endpointMouseup = _endpointMouseupdown.bind(this, true);
        this._endpointMousedown = _endpointMouseupdown.bind(this, false);
        var _oClick = function (method, e) {
          var overlayElement = findParent(getEventSource(e), SELECTOR_OVERLAY, this.getContainer(), true);
          var overlay = overlayElement.jtk.overlay;
          if (overlay) {
            this.fireOverlayMethod(overlay, method, e);
          }
        }.bind(this);
        this._overlayClick = _oClick.bind(this, EVENT_CLICK);
        this._overlayDblClick = _oClick.bind(this, EVENT_DBL_CLICK);
        this._overlayTap = _oClick.bind(this, EVENT_TAP);
        this._overlayDblTap = _oClick.bind(this, EVENT_DBL_TAP);
        var _overlayHover = function _overlayHover(state, e) {
          var overlayElement = findParent(getEventSource(e), SELECTOR_OVERLAY, this.getContainer(), true);
          var overlay = overlayElement.jtk.overlay;
          if (overlay) {
            this.setOverlayHover(overlay, state);
          }
        };
        this._overlayMouseover = _overlayHover.bind(this, true);
        this._overlayMouseout = _overlayHover.bind(this, false);
        var _elementClick = function _elementClick(event, e, target) {
          if (!e.defaultPrevented) {
            this.fire(e.detail === 1 ? EVENT_ELEMENT_CLICK : EVENT_ELEMENT_DBL_CLICK, target, e);
          }
        };
        this._elementClick = _elementClick.bind(this, EVENT_ELEMENT_CLICK);
        var _elementTap = function _elementTap(event, e, target) {
          if (!e.defaultPrevented) {
            this.fire(EVENT_ELEMENT_TAP, target, e);
          }
        };
        this._elementTap = _elementTap.bind(this, EVENT_ELEMENT_TAP);
        var _elementDblTap = function _elementDblTap(event, e, target) {
          if (!e.defaultPrevented) {
            this.fire(EVENT_ELEMENT_DBL_TAP, target, e);
          }
        };
        this._elementDblTap = _elementDblTap.bind(this, EVENT_ELEMENT_DBL_TAP);
        var _elementHover = function _elementHover(state, e) {
          this.fire(state ? EVENT_ELEMENT_MOUSE_OVER : EVENT_ELEMENT_MOUSE_OUT, getEventSource(e), e);
        };
        this._elementMouseenter = _elementHover.bind(this, true);
        this._elementMouseexit = _elementHover.bind(this, false);
        this._elementMousemove = function (e) {
          this.fire(EVENT_ELEMENT_MOUSE_MOVE, getEventSource(e), e);
        }.bind(this);
        this._elementMouseup = function (e) {
          this.fire(EVENT_ELEMENT_MOUSE_UP, getEventSource(e), e);
        }.bind(this);
        this._elementMousedown = function (e) {
          this.fire(EVENT_ELEMENT_MOUSE_DOWN, getEventSource(e), e);
        }.bind(this);
        this._elementContextmenu = function (e) {
          this.fire(EVENT_ELEMENT_CONTEXTMENU, getEventSource(e), e);
        }.bind(this);
      }
    }, {
      key: "_attachEventDelegates",
      value: function _attachEventDelegates() {
        var currentContainer = this.getContainer();
        this.eventManager.on(currentContainer, EVENT_CLICK, SELECTOR_OVERLAY, this._overlayClick);
        this.eventManager.on(currentContainer, EVENT_DBL_CLICK, SELECTOR_OVERLAY, this._overlayDblClick);
        this.eventManager.on(currentContainer, EVENT_TAP, SELECTOR_OVERLAY, this._overlayTap);
        this.eventManager.on(currentContainer, EVENT_DBL_TAP, SELECTOR_OVERLAY, this._overlayDblTap);
        this.eventManager.on(currentContainer, EVENT_CLICK, SELECTOR_CONNECTOR, this._connectorClick);
        this.eventManager.on(currentContainer, EVENT_DBL_CLICK, SELECTOR_CONNECTOR, this._connectorDblClick);
        this.eventManager.on(currentContainer, EVENT_TAP, SELECTOR_CONNECTOR, this._connectorTap);
        this.eventManager.on(currentContainer, EVENT_DBL_TAP, SELECTOR_CONNECTOR, this._connectorDblTap);
        this.eventManager.on(currentContainer, EVENT_CLICK, SELECTOR_ENDPOINT, this._endpointClick);
        this.eventManager.on(currentContainer, EVENT_DBL_CLICK, SELECTOR_ENDPOINT, this._endpointDblClick);
        this.eventManager.on(currentContainer, EVENT_CLICK, this.managedElementsSelector, this._elementClick);
        this.eventManager.on(currentContainer, EVENT_TAP, this.managedElementsSelector, this._elementTap);
        this.eventManager.on(currentContainer, EVENT_DBL_TAP, this.managedElementsSelector, this._elementDblTap);
        this.eventManager.on(currentContainer, EVENT_MOUSEOVER, SELECTOR_CONNECTOR, this._connectorMouseover);
        this.eventManager.on(currentContainer, EVENT_MOUSEOUT, SELECTOR_CONNECTOR, this._connectorMouseout);
        this.eventManager.on(currentContainer, EVENT_CONTEXTMENU, SELECTOR_CONNECTOR, this._connectorContextmenu);
        this.eventManager.on(currentContainer, EVENT_MOUSEUP, SELECTOR_CONNECTOR, this._connectorMouseup);
        this.eventManager.on(currentContainer, EVENT_MOUSEDOWN, SELECTOR_CONNECTOR, this._connectorMousedown);
        this.eventManager.on(currentContainer, EVENT_MOUSEOVER, SELECTOR_ENDPOINT, this._endpointMouseover);
        this.eventManager.on(currentContainer, EVENT_MOUSEOUT, SELECTOR_ENDPOINT, this._endpointMouseout);
        this.eventManager.on(currentContainer, EVENT_MOUSEUP, SELECTOR_ENDPOINT, this._endpointMouseup);
        this.eventManager.on(currentContainer, EVENT_MOUSEDOWN, SELECTOR_ENDPOINT, this._endpointMousedown);
        this.eventManager.on(currentContainer, EVENT_MOUSEOVER, SELECTOR_OVERLAY, this._overlayMouseover);
        this.eventManager.on(currentContainer, EVENT_MOUSEOUT, SELECTOR_OVERLAY, this._overlayMouseout);
        this.eventManager.on(currentContainer, EVENT_MOUSEOVER, SELECTOR_MANAGED_ELEMENT, this._elementMouseenter);
        this.eventManager.on(currentContainer, EVENT_MOUSEOUT, SELECTOR_MANAGED_ELEMENT, this._elementMouseexit);
        this.eventManager.on(currentContainer, EVENT_MOUSEMOVE, SELECTOR_MANAGED_ELEMENT, this._elementMousemove);
        this.eventManager.on(currentContainer, EVENT_MOUSEUP, SELECTOR_MANAGED_ELEMENT, this._elementMouseup);
        this.eventManager.on(currentContainer, EVENT_MOUSEDOWN, SELECTOR_MANAGED_ELEMENT, this._elementMousedown);
        this.eventManager.on(currentContainer, EVENT_CONTEXTMENU, SELECTOR_MANAGED_ELEMENT, this._elementContextmenu);
      }
    }, {
      key: "_detachEventDelegates",
      value: function _detachEventDelegates() {
        var currentContainer = this.getContainer();
        if (currentContainer) {
          this.eventManager.off(currentContainer, EVENT_CLICK, this._connectorClick);
          this.eventManager.off(currentContainer, EVENT_DBL_CLICK, this._connectorDblClick);
          this.eventManager.off(currentContainer, EVENT_TAP, this._connectorTap);
          this.eventManager.off(currentContainer, EVENT_DBL_TAP, this._connectorDblTap);
          this.eventManager.off(currentContainer, EVENT_CLICK, this._endpointClick);
          this.eventManager.off(currentContainer, EVENT_DBL_CLICK, this._endpointDblClick);
          this.eventManager.off(currentContainer, EVENT_CLICK, this._overlayClick);
          this.eventManager.off(currentContainer, EVENT_DBL_CLICK, this._overlayDblClick);
          this.eventManager.off(currentContainer, EVENT_TAP, this._overlayTap);
          this.eventManager.off(currentContainer, EVENT_DBL_TAP, this._overlayDblTap);
          this.eventManager.off(currentContainer, EVENT_CLICK, this._elementClick);
          this.eventManager.off(currentContainer, EVENT_TAP, this._elementTap);
          this.eventManager.off(currentContainer, EVENT_DBL_TAP, this._elementDblTap);
          this.eventManager.off(currentContainer, EVENT_MOUSEOVER, this._connectorMouseover);
          this.eventManager.off(currentContainer, EVENT_MOUSEOUT, this._connectorMouseout);
          this.eventManager.off(currentContainer, EVENT_CONTEXTMENU, this._connectorContextmenu);
          this.eventManager.off(currentContainer, EVENT_MOUSEUP, this._connectorMouseup);
          this.eventManager.off(currentContainer, EVENT_MOUSEDOWN, this._connectorMousedown);
          this.eventManager.off(currentContainer, EVENT_MOUSEOVER, this._endpointMouseover);
          this.eventManager.off(currentContainer, EVENT_MOUSEOUT, this._endpointMouseout);
          this.eventManager.off(currentContainer, EVENT_MOUSEUP, this._endpointMouseup);
          this.eventManager.off(currentContainer, EVENT_MOUSEDOWN, this._endpointMousedown);
          this.eventManager.off(currentContainer, EVENT_MOUSEOVER, this._overlayMouseover);
          this.eventManager.off(currentContainer, EVENT_MOUSEOUT, this._overlayMouseout);
          this.eventManager.off(currentContainer, EVENT_MOUSEENTER, this._elementMouseenter);
          this.eventManager.off(currentContainer, EVENT_MOUSEEXIT, this._elementMouseexit);
          this.eventManager.off(currentContainer, EVENT_MOUSEMOVE, this._elementMousemove);
          this.eventManager.off(currentContainer, EVENT_MOUSEUP, this._elementMouseup);
          this.eventManager.off(currentContainer, EVENT_MOUSEDOWN, this._elementMousedown);
          this.eventManager.off(currentContainer, EVENT_CONTEXTMENU, this._elementContextmenu);
        }
      }
    }, {
      key: "setContainer",
      value: function setContainer(newContainer) {
        var _this4 = this;
        if (newContainer === document || newContainer === document.body) {
          throw new Error("Cannot set document or document.body as container element");
        }
        this._detachEventDelegates();
        var dragFilters;
        if (this.dragManager != null) {
          dragFilters = this.dragManager.reset();
        }
        this.setAttribute(newContainer, ATTRIBUTE_CONTAINER, uuid().replace("-", ""));
        var currentContainer = this.getContainer();
        if (currentContainer != null) {
          currentContainer.removeAttribute(ATTRIBUTE_CONTAINER);
          var children = fromArray(currentContainer.childNodes).filter(function (cn) {
            return cn != null && (_this4.hasClass(cn, CLASS_CONNECTOR) || _this4.hasClass(cn, CLASS_ENDPOINT) || _this4.hasClass(cn, CLASS_OVERLAY) || cn.getAttribute && cn.getAttribute(ATTRIBUTE_MANAGED) != null);
          });
          forEach(children, function (el) {
            newContainer.appendChild(el);
          });
        }
        _get(_getPrototypeOf(BrowserJsPlumbInstance.prototype), "setContainer", this).call(this, newContainer);
        this.containerType = getElementType(newContainer);
        if (this.eventManager != null) {
          this._attachEventDelegates();
        }
        if (this.dragManager != null) {
          this.dragManager.addHandler(new EndpointDragHandler(this));
          this.dragManager.addHandler(new GroupDragHandler(this, this.dragSelection), this.groupDragOptions);
          this.elementDragHandler = new ElementDragHandler(this, this.dragSelection);
          this.dragManager.addHandler(this.elementDragHandler, this.elementDragOptions);
          if (dragFilters != null) {
            this.dragManager.setFilters(dragFilters);
          }
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        _get(_getPrototypeOf(BrowserJsPlumbInstance.prototype), "reset", this).call(this);
        if (this._resizeObserver) {
          this._resizeObserver.disconnect();
        }
        var container = this.getContainer();
        var els = container.querySelectorAll([SELECTOR_MANAGED_ELEMENT, SELECTOR_ENDPOINT, SELECTOR_CONNECTOR, SELECTOR_OVERLAY].join(","));
        forEach(els, function (el) {
          return el.parentNode && el.parentNode.removeChild(el);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._detachEventDelegates();
        if (this.dragManager != null) {
          this.dragManager.reset();
        }
        this.clearDragSelection();
        _get(_getPrototypeOf(BrowserJsPlumbInstance.prototype), "destroy", this).call(this);
      }
    }, {
      key: "unmanage",
      value: function unmanage(el, removeElement) {
        if (this._resizeObserver != null) {
          this._resizeObserver.unobserve(el);
        }
        this.removeFromDragSelection(el);
        _get(_getPrototypeOf(BrowserJsPlumbInstance.prototype), "unmanage", this).call(this, el, removeElement);
      }
    }, {
      key: "addToDragSelection",
      value: function addToDragSelection() {
        var _this5 = this;
        for (var _len = arguments.length, el = new Array(_len), _key = 0; _key < _len; _key++) {
          el[_key] = arguments[_key];
        }
        forEach(el, function (_el) {
          return _this5.dragSelection.add(_el);
        });
      }
    }, {
      key: "clearDragSelection",
      value: function clearDragSelection() {
        this.dragSelection.clear();
      }
    }, {
      key: "removeFromDragSelection",
      value: function removeFromDragSelection() {
        var _this6 = this;
        for (var _len2 = arguments.length, el = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          el[_key2] = arguments[_key2];
        }
        forEach(el, function (_el) {
          return _this6.dragSelection.remove(_el);
        });
      }
    }, {
      key: "toggleDragSelection",
      value: function toggleDragSelection() {
        var _this7 = this;
        for (var _len3 = arguments.length, el = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          el[_key3] = arguments[_key3];
        }
        forEach(el, function (_el) {
          return _this7.dragSelection.toggle(_el);
        });
      }
    }, {
      key: "addToDragGroup",
      value: function addToDragGroup(spec) {
        var _this$elementDragHand;
        for (var _len4 = arguments.length, els = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          els[_key4 - 1] = arguments[_key4];
        }
        (_this$elementDragHand = this.elementDragHandler).addToDragGroup.apply(_this$elementDragHand, [spec].concat(els));
      }
    }, {
      key: "removeFromDragGroup",
      value: function removeFromDragGroup() {
        var _this$elementDragHand2;
        (_this$elementDragHand2 = this.elementDragHandler).removeFromDragGroup.apply(_this$elementDragHand2, arguments);
      }
    }, {
      key: "setDragGroupState",
      value: function setDragGroupState(state) {
        var _this$elementDragHand3;
        for (var _len5 = arguments.length, els = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          els[_key5 - 1] = arguments[_key5];
        }
        (_this$elementDragHand3 = this.elementDragHandler).setDragGroupState.apply(_this$elementDragHand3, [state].concat(els));
      }
    }, {
      key: "clearDragGroup",
      value: function clearDragGroup(name) {
        this.elementDragHandler.clearDragGroup(name);
      }
    }, {
      key: "consume",
      value: function consume$1(e, doNotPreventDefault) {
        consume(e, doNotPreventDefault);
      }
    }, {
      key: "rotate",
      value: function rotate(element, rotation, doNotRepaint) {
        var elementId = this.getId(element);
        if (this._managedElements[elementId]) {
          this._managedElements[elementId].el.style.transform = "rotate(" + rotation + "deg)";
          this._managedElements[elementId].el.style.transformOrigin = "center center";
          return _get(_getPrototypeOf(BrowserJsPlumbInstance.prototype), "rotate", this).call(this, element, rotation, doNotRepaint);
        }
        return {
          c: new Set(),
          e: new Set()
        };
      }
    }, {
      key: "addOverlayClass",
      value:
      function addOverlayClass(o, clazz) {
        if (isLabelOverlay(o)) {
          o.instance.addClass(getLabelElement(o), clazz);
        } else if (isSVGElementOverlay(o)) {
          o.instance.addClass(ensureSVGOverlayPath(o), clazz);
        } else if (isCustomOverlay(o)) {
          o.instance.addClass(getCustomElement(o), clazz);
        } else {
          throw "Could not add class to overlay of type [" + o.type + "]";
        }
      }
    }, {
      key: "removeOverlayClass",
      value: function removeOverlayClass(o, clazz) {
        if (isLabelOverlay(o)) {
          o.instance.removeClass(getLabelElement(o), clazz);
        } else if (isSVGElementOverlay(o)) {
          o.instance.removeClass(ensureSVGOverlayPath(o), clazz);
        } else if (isCustomOverlay(o)) {
          o.instance.removeClass(getCustomElement(o), clazz);
        } else {
          throw "Could not remove class from overlay of type [" + o.type + "]";
        }
      }
    }, {
      key: "_paintOverlay",
      value: function _paintOverlay(o, params, extents) {
        if (isLabelOverlay(o)) {
          getLabelElement(o);
          var XY = o.component.getXY();
          o.canvas.style.left = XY.x + params.d.minx + "px";
          o.canvas.style.top = XY.y + params.d.miny + "px";
        } else if (isSVGElementOverlay(o)) {
          var path = isNaN(params.d.cxy.x) || isNaN(params.d.cxy.y) ? "M 0 0" : "M" + params.d.hxy.x + "," + params.d.hxy.y + " L" + params.d.tail[0].x + "," + params.d.tail[0].y + " L" + params.d.cxy.x + "," + params.d.cxy.y + " L" + params.d.tail[1].x + "," + params.d.tail[1].y + " Z";
          paintSVGOverlay(o, path, params, extents);
        } else if (isCustomOverlay(o)) {
          getCustomElement(o);
          var _XY = o.component.getXY();
          o.canvas.style.left = _XY.x + params.d.minx + "px";
          o.canvas.style.top = _XY.y + params.d.miny + "px";
        } else {
          throw "Could not paint overlay of type [" + o.type + "]";
        }
      }
    }, {
      key: "setOverlayVisible",
      value: function setOverlayVisible(o, visible) {
        var d = visible ? "block" : "none";
        function s(el) {
          if (el != null) {
            el.style.display = d;
          }
        }
        if (isLabelOverlay(o)) {
          s(getLabelElement(o));
        } else if (isCustomOverlay(o)) {
          s(getCustomElement(o));
        } else if (isSVGElementOverlay(o)) {
          s(o.path);
        }
      }
    }, {
      key: "reattachOverlay",
      value: function reattachOverlay(o, c) {
        if (isLabelOverlay(o)) {
          o.instance._appendElement(getLabelElement(o), this.getContainer());
        } else if (isCustomOverlay(o)) {
          o.instance._appendElement(getCustomElement(o), this.getContainer());
        } else if (isSVGElementOverlay(o)) {
          this._appendElement(ensureSVGOverlayPath(o), c.connector.canvas);
        }
      }
    }, {
      key: "setOverlayHover",
      value: function setOverlayHover(o, hover) {
        var canvas;
        if (isLabelOverlay(o)) {
          canvas = getLabelElement(o);
        } else if (isCustomOverlay(o)) {
          canvas = getCustomElement(o);
        } else if (isSVGElementOverlay(o)) {
          canvas = ensureSVGOverlayPath(o);
        }
        if (canvas != null) {
          if (this.hoverClass != null) {
            if (hover) {
              this.addClass(canvas, this.hoverClass);
            } else {
              this.removeClass(canvas, this.hoverClass);
            }
          }
          this.setHover(o.component, hover);
        }
      }
    }, {
      key: "destroyOverlay",
      value: function destroyOverlay(o) {
        if (isLabelOverlay(o)) {
          var _el2 = getLabelElement(o);
          _el2.parentNode.removeChild(_el2);
          delete o.canvas;
          delete o.cachedDimensions;
        } else if (isArrowOverlay(o) || isDiamondOverlay(o) || isPlainArrowOverlay(o)) {
          destroySVGOverlay(o);
        } else if (isCustomOverlay(o)) {
          var _el3 = getCustomElement(o);
          _el3.parentNode.removeChild(_el3);
          delete o.canvas;
          delete o.cachedDimensions;
        }
      }
    }, {
      key: "drawOverlay",
      value: function drawOverlay(o, component, paintStyle, absolutePosition) {
        if (isLabelOverlay(o) || isCustomOverlay(o)) {
          var td = HTMLElementOverlay._getDimensions(o);
          if (td != null && td.w != null && td.h != null) {
            var cxy = {
              x: 0,
              y: 0
            };
            if (absolutePosition) {
              cxy = {
                x: absolutePosition.x,
                y: absolutePosition.y
              };
            } else if (component instanceof EndpointRepresentation) {
              var locToUse = Array.isArray(o.location) ? o.location : [o.location, o.location];
              cxy = {
                x: locToUse[0] * component.w,
                y: locToUse[1] * component.h
              };
            } else {
              var loc = o.location,
                  absolute = false;
              if (isString(o.location) || o.location < 0 || o.location > 1) {
                loc = parseInt("" + o.location, 10);
                absolute = true;
              }
              cxy = component.pointOnPath(loc, absolute);
            }
            var minx = cxy.x - td.w / 2,
                miny = cxy.y - td.h / 2;
            return {
              component: o,
              d: {
                minx: minx,
                miny: miny,
                td: td,
                cxy: cxy
              },
              xmin: minx,
              xmax: minx + td.w,
              ymin: miny,
              ymax: miny + td.h
            };
          } else {
            return {
              xmin: 0,
              xmax: 0,
              ymin: 0,
              ymax: 0
            };
          }
        } else if (isArrowOverlay(o) || isDiamondOverlay(o) || isPlainArrowOverlay(o)) {
          return o.draw(component, paintStyle, absolutePosition);
        } else {
          throw "Could not draw overlay of type [" + o.type + "]";
        }
      }
    }, {
      key: "updateLabel",
      value: function updateLabel(o) {
        if (isFunction(o.label)) {
          var lt = o.label(this);
          if (lt != null) {
            getLabelElement(o).innerText = lt;
          } else {
            getLabelElement(o).innerText = "";
          }
        } else {
          if (o.labelText == null) {
            o.labelText = o.label;
            if (o.labelText != null) {
              getLabelElement(o).innerText = o.labelText;
            } else {
              getLabelElement(o).innerText = "";
            }
          }
        }
      }
    }, {
      key: "setHover",
      value: function setHover(component, hover) {
        component._hover = hover;
        if (component instanceof Endpoint && component.endpoint != null) {
          this.setEndpointHover(component, hover, -1);
        } else if (component instanceof Connection && component.connector != null) {
          this.setConnectorHover(component.connector, hover);
        }
      }
    }, {
      key: "paintConnector",
      value: function paintConnector(connector, paintStyle, extents) {
        paintSvgConnector(this, connector, paintStyle, extents);
      }
    }, {
      key: "setConnectorHover",
      value: function setConnectorHover(connector, hover, sourceEndpoint) {
        if (hover === false || !this.currentlyDragging && !this.isHoverSuspended()) {
          var canvas = connector.canvas;
          if (canvas != null) {
            if (connector.hoverClass != null) {
              if (hover) {
                this.addClass(canvas, connector.hoverClass);
              } else {
                this.removeClass(canvas, connector.hoverClass);
              }
            }
            if (hover) {
              this.addClass(canvas, this.hoverClass);
            } else {
              this.removeClass(canvas, this.hoverClass);
            }
          }
          if (connector.connection.hoverPaintStyle != null) {
            connector.connection.paintStyleInUse = hover ? connector.connection.hoverPaintStyle : connector.connection.paintStyle;
            if (!this._suspendDrawing) {
              this._paintConnection(connector.connection);
            }
          }
          if (connector.connection.endpoints[0] !== sourceEndpoint) {
            this.setEndpointHover(connector.connection.endpoints[0], hover, 0, true);
          }
          if (connector.connection.endpoints[1] !== sourceEndpoint) {
            this.setEndpointHover(connector.connection.endpoints[1], hover, 1, true);
          }
        }
      }
    }, {
      key: "destroyConnector",
      value: function destroyConnector(connection) {
        if (connection.connector != null) {
          cleanup(connection.connector);
        }
      }
    }, {
      key: "addConnectorClass",
      value: function addConnectorClass(connector, clazz) {
        if (connector.canvas) {
          this.addClass(connector.canvas, clazz);
        }
      }
    }, {
      key: "removeConnectorClass",
      value: function removeConnectorClass(connector, clazz) {
        if (connector.canvas) {
          this.removeClass(connector.canvas, clazz);
        }
      }
    }, {
      key: "getConnectorClass",
      value: function getConnectorClass(connector) {
        if (connector.canvas) {
          return connector.canvas.className.baseVal;
        } else {
          return "";
        }
      }
    }, {
      key: "setConnectorVisible",
      value: function setConnectorVisible(connector, v) {
        setVisible(connector, v);
      }
    }, {
      key: "applyConnectorType",
      value: function applyConnectorType(connector, t) {
        if (connector.canvas && t.cssClass) {
          var classes = Array.isArray(t.cssClass) ? t.cssClass : [t.cssClass];
          this.addClass(connector.canvas, classes.join(" "));
        }
      }
    }, {
      key: "addEndpointClass",
      value: function addEndpointClass(ep, c) {
        var canvas = getEndpointCanvas(ep.endpoint);
        if (canvas != null) {
          this.addClass(canvas, c);
        }
      }
    }, {
      key: "applyEndpointType",
      value: function applyEndpointType(ep, t) {
        if (t.cssClass) {
          var canvas = getEndpointCanvas(ep.endpoint);
          if (canvas) {
            var classes = Array.isArray(t.cssClass) ? t.cssClass : [t.cssClass];
            this.addClass(canvas, classes.join(" "));
          }
        }
      }
    }, {
      key: "destroyEndpoint",
      value: function destroyEndpoint(ep) {
        var anchorClass = this.endpointAnchorClassPrefix + (ep.currentAnchorClass ? "-" + ep.currentAnchorClass : "");
        this.removeClass(ep.element, anchorClass);
        cleanup(ep.endpoint);
      }
    }, {
      key: "renderEndpoint",
      value: function renderEndpoint(ep, paintStyle) {
        var renderer = endpointMap[ep.endpoint.type];
        if (renderer != null) {
          SvgEndpoint.paint(ep.endpoint, renderer, paintStyle);
        } else {
          log("jsPlumb: no endpoint renderer found for type [" + ep.endpoint.type + "]");
        }
      }
    }, {
      key: "removeEndpointClass",
      value: function removeEndpointClass(ep, c) {
        var canvas = getEndpointCanvas(ep.endpoint);
        if (canvas != null) {
          this.removeClass(canvas, c);
        }
      }
    }, {
      key: "getEndpointClass",
      value: function getEndpointClass(ep) {
        var canvas = getEndpointCanvas(ep.endpoint);
        if (canvas != null) {
          return canvas.className;
        } else {
          return "";
        }
      }
    }, {
      key: "setEndpointHover",
      value: function setEndpointHover(endpoint, hover, endpointIndex, doNotCascade) {
        if (endpoint != null && (hover === false || !this.currentlyDragging && !this.isHoverSuspended())) {
          var canvas = getEndpointCanvas(endpoint.endpoint);
          if (canvas != null) {
            if (endpoint.hoverClass != null) {
              if (hover) {
                this.addClass(canvas, endpoint.hoverClass);
              } else {
                this.removeClass(canvas, endpoint.hoverClass);
              }
            }
            if (endpointIndex === 0 || endpointIndex === 1) {
              var genericHoverClass = endpointIndex === 0 ? this.hoverSourceClass : this.hoverTargetClass;
              if (hover) {
                this.addClass(canvas, genericHoverClass);
              } else {
                this.removeClass(canvas, genericHoverClass);
              }
            }
          }
          if (endpoint.hoverPaintStyle != null) {
            endpoint.paintStyleInUse = hover ? endpoint.hoverPaintStyle : endpoint.paintStyle;
            if (!this._suspendDrawing) {
              this.renderEndpoint(endpoint, endpoint.paintStyleInUse);
            }
          }
          if (!doNotCascade) {
            for (var i = 0; i < endpoint.connections.length; i++) {
              this.setConnectorHover(endpoint.connections[i].connector, hover, endpoint);
            }
          }
        }
      }
    }, {
      key: "setEndpointVisible",
      value: function setEndpointVisible(ep, v) {
        setVisible(ep.endpoint, v);
      }
    }, {
      key: "setGroupVisible",
      value: function setGroupVisible(group, state) {
        var m = group.el.querySelectorAll(SELECTOR_MANAGED_ELEMENT);
        for (var i = 0; i < m.length; i++) {
          if (state) {
            this.show(m[i], true);
          } else {
            this.hide(m[i], true);
          }
        }
      }
    }, {
      key: "deleteConnection",
      value: function deleteConnection(connection, params) {
        if (connection != null && connection.deleted !== true) {
          if (connection.endpoints[0].deleted !== true) {
            this.setEndpointHover(connection.endpoints[0], false, 0, true);
          }
          if (connection.endpoints[1].deleted !== true) {
            this.setEndpointHover(connection.endpoints[1], false, 1, true);
          }
          return _get(_getPrototypeOf(BrowserJsPlumbInstance.prototype), "deleteConnection", this).call(this, connection, params);
        } else {
          return false;
        }
      }
    }, {
      key: "addSourceSelector",
      value: function addSourceSelector(selector, params, exclude) {
        this.addDragFilter(selector);
        return _get(_getPrototypeOf(BrowserJsPlumbInstance.prototype), "addSourceSelector", this).call(this, selector, params, exclude);
      }
    }, {
      key: "removeSourceSelector",
      value: function removeSourceSelector(selector) {
        this.removeDragFilter(selector.selector);
        _get(_getPrototypeOf(BrowserJsPlumbInstance.prototype), "removeSourceSelector", this).call(this, selector);
      }
    }, {
      key: "manage",
      value: function manage(element, internalId, _recalc) {
        if (this.containerType === exports.ElementTypes.SVG && !isSVGElement(element)) {
          throw new Error("ERROR: cannot manage non-svg element when container is an SVG element.");
        }
        var managedElement = _get(_getPrototypeOf(BrowserJsPlumbInstance.prototype), "manage", this).call(this, element, internalId, _recalc);
        if (managedElement != null) {
          if (this._resizeObserver != null) {
            this._resizeObserver.observe(managedElement.el);
          }
        }
        return managedElement;
      }
    }]);
    return BrowserJsPlumbInstance;
  }(JsPlumbInstance);

  var CIRCLE = "circle";
  var register$2 = function register() {
    registerEndpointRenderer(DotEndpoint.type, {
      makeNode: function makeNode(ep, style) {
        return _node(CIRCLE, {
          "cx": ep.w / 2,
          "cy": ep.h / 2,
          "r": ep.radius
        });
      },
      updateNode: function updateNode(ep, node) {
        _attr(node, {
          "cx": "" + ep.w / 2,
          "cy": "" + ep.h / 2,
          "r": "" + ep.radius
        });
      }
    });
  };

  var RECT = "rect";
  var register$1 = function register() {
    registerEndpointRenderer(RectangleEndpoint.type, {
      makeNode: function makeNode(ep, style) {
        return _node(RECT, {
          "width": ep.w,
          "height": ep.h
        });
      },
      updateNode: function updateNode(ep, node) {
        _attr(node, {
          "width": ep.w,
          "height": ep.h
        });
      }
    });
  };

  var BLANK_ATTRIBUTES = {
    "width": 10,
    "height": 0,
    "fill": "transparent",
    "stroke": "transparent"
  };
  var register = function register() {
    registerEndpointRenderer(BlankEndpoint.type, {
      makeNode: function makeNode(ep, style) {
        return _node("rect", BLANK_ATTRIBUTES);
      },
      updateNode: function updateNode(ep, node) {
        _attr(node, BLANK_ATTRIBUTES);
      }
    });
  };

  register$2();
  register();
  register$1();
  var _jsPlumbInstanceIndex = 0;
  function getInstanceIndex() {
    var i = _jsPlumbInstanceIndex + 1;
    _jsPlumbInstanceIndex++;
    return i;
  }
  function newInstance(defaults) {
    return new BrowserJsPlumbInstance(getInstanceIndex(), defaults);
  }
  function ready(f) {
    var _do = function _do() {
      if (/complete|loaded|interactive/.test(document.readyState) && typeof document.body !== "undefined" && document.body != null) {
        f();
      } else {
        setTimeout(_do, 9);
      }
    };
    _do();
  }

  exports.ABSOLUTE = ABSOLUTE;
  exports.ADD_CLASS_ACTION = ADD_CLASS_ACTION;
  exports.ATTRIBUTE_CONTAINER = ATTRIBUTE_CONTAINER;
  exports.ATTRIBUTE_GROUP = ATTRIBUTE_GROUP;
  exports.ATTRIBUTE_GROUP_CONTENT = ATTRIBUTE_GROUP_CONTENT;
  exports.ATTRIBUTE_JTK_ENABLED = ATTRIBUTE_JTK_ENABLED;
  exports.ATTRIBUTE_JTK_SCOPE = ATTRIBUTE_JTK_SCOPE;
  exports.ATTRIBUTE_MANAGED = ATTRIBUTE_MANAGED;
  exports.ATTRIBUTE_NOT_DRAGGABLE = ATTRIBUTE_NOT_DRAGGABLE;
  exports.ATTRIBUTE_SCOPE = ATTRIBUTE_SCOPE;
  exports.ATTRIBUTE_SCOPE_PREFIX = ATTRIBUTE_SCOPE_PREFIX;
  exports.ATTRIBUTE_TABINDEX = ATTRIBUTE_TABINDEX;
  exports.AbstractBezierConnector = AbstractBezierConnector;
  exports.AbstractConnector = AbstractConnector;
  exports.AbstractSegment = AbstractSegment;
  exports.ArcSegment = ArcSegment;
  exports.ArrowOverlay = ArrowOverlay;
  exports.BLOCK = BLOCK;
  exports.BOTTOM = BOTTOM;
  exports.BezierConnector = BezierConnector;
  exports.BezierSegment = BezierSegment;
  exports.BlankEndpoint = BlankEndpoint;
  exports.BlankEndpointHandler = BlankEndpointHandler;
  exports.BrowserJsPlumbInstance = BrowserJsPlumbInstance;
  exports.CHECK_CONDITION = CHECK_CONDITION;
  exports.CHECK_DROP_ALLOWED = CHECK_DROP_ALLOWED;
  exports.CLASS_CONNECTED = CLASS_CONNECTED;
  exports.CLASS_CONNECTOR = CLASS_CONNECTOR;
  exports.CLASS_CONNECTOR_OUTLINE = CLASS_CONNECTOR_OUTLINE;
  exports.CLASS_DELEGATED_DRAGGABLE = CLASS_DELEGATED_DRAGGABLE;
  exports.CLASS_DRAGGABLE = CLASS_DRAGGABLE;
  exports.CLASS_DRAGGED = CLASS_DRAGGED;
  exports.CLASS_DRAG_ACTIVE = CLASS_DRAG_ACTIVE;
  exports.CLASS_DRAG_CONTAINER = CLASS_DRAG_CONTAINER;
  exports.CLASS_DRAG_HOVER = CLASS_DRAG_HOVER;
  exports.CLASS_ENDPOINT = CLASS_ENDPOINT;
  exports.CLASS_ENDPOINT_ANCHOR_PREFIX = CLASS_ENDPOINT_ANCHOR_PREFIX;
  exports.CLASS_ENDPOINT_CONNECTED = CLASS_ENDPOINT_CONNECTED;
  exports.CLASS_ENDPOINT_DROP_ALLOWED = CLASS_ENDPOINT_DROP_ALLOWED;
  exports.CLASS_ENDPOINT_DROP_FORBIDDEN = CLASS_ENDPOINT_DROP_FORBIDDEN;
  exports.CLASS_ENDPOINT_FLOATING = CLASS_ENDPOINT_FLOATING;
  exports.CLASS_ENDPOINT_FULL = CLASS_ENDPOINT_FULL;
  exports.CLASS_GHOST_PROXY = CLASS_GHOST_PROXY;
  exports.CLASS_GROUP_COLLAPSED = CLASS_GROUP_COLLAPSED;
  exports.CLASS_GROUP_EXPANDED = CLASS_GROUP_EXPANDED;
  exports.CLASS_OVERLAY = CLASS_OVERLAY;
  exports.CONNECTION = CONNECTION;
  exports.Collicat = Collicat;
  exports.Component = Component;
  exports.Connection = Connection;
  exports.ConnectionDragSelector = ConnectionDragSelector;
  exports.ConnectionSelection = ConnectionSelection;
  exports.Connectors = Connectors;
  exports.CustomOverlay = CustomOverlay;
  exports.DEFAULT = DEFAULT;
  exports.DEFAULT_KEY_ALLOW_NESTED_GROUPS = DEFAULT_KEY_ALLOW_NESTED_GROUPS;
  exports.DEFAULT_KEY_ANCHOR = DEFAULT_KEY_ANCHOR;
  exports.DEFAULT_KEY_ANCHORS = DEFAULT_KEY_ANCHORS;
  exports.DEFAULT_KEY_CONNECTIONS_DETACHABLE = DEFAULT_KEY_CONNECTIONS_DETACHABLE;
  exports.DEFAULT_KEY_CONNECTION_OVERLAYS = DEFAULT_KEY_CONNECTION_OVERLAYS;
  exports.DEFAULT_KEY_CONNECTOR = DEFAULT_KEY_CONNECTOR;
  exports.DEFAULT_KEY_CONTAINER = DEFAULT_KEY_CONTAINER;
  exports.DEFAULT_KEY_ENDPOINT = DEFAULT_KEY_ENDPOINT;
  exports.DEFAULT_KEY_ENDPOINTS = DEFAULT_KEY_ENDPOINTS;
  exports.DEFAULT_KEY_ENDPOINT_HOVER_STYLE = DEFAULT_KEY_ENDPOINT_HOVER_STYLE;
  exports.DEFAULT_KEY_ENDPOINT_HOVER_STYLES = DEFAULT_KEY_ENDPOINT_HOVER_STYLES;
  exports.DEFAULT_KEY_ENDPOINT_OVERLAYS = DEFAULT_KEY_ENDPOINT_OVERLAYS;
  exports.DEFAULT_KEY_ENDPOINT_STYLE = DEFAULT_KEY_ENDPOINT_STYLE;
  exports.DEFAULT_KEY_ENDPOINT_STYLES = DEFAULT_KEY_ENDPOINT_STYLES;
  exports.DEFAULT_KEY_HOVER_CLASS = DEFAULT_KEY_HOVER_CLASS;
  exports.DEFAULT_KEY_HOVER_PAINT_STYLE = DEFAULT_KEY_HOVER_PAINT_STYLE;
  exports.DEFAULT_KEY_LIST_STYLE = DEFAULT_KEY_LIST_STYLE;
  exports.DEFAULT_KEY_MAX_CONNECTIONS = DEFAULT_KEY_MAX_CONNECTIONS;
  exports.DEFAULT_KEY_PAINT_STYLE = DEFAULT_KEY_PAINT_STYLE;
  exports.DEFAULT_KEY_REATTACH_CONNECTIONS = DEFAULT_KEY_REATTACH_CONNECTIONS;
  exports.DEFAULT_KEY_SCOPE = DEFAULT_KEY_SCOPE;
  exports.DiamondOverlay = DiamondOverlay;
  exports.DotEndpoint = DotEndpoint;
  exports.DotEndpointHandler = DotEndpointHandler;
  exports.Drag = Drag;
  exports.DragManager = DragManager;
  exports.ELEMENT = ELEMENT;
  exports.ELEMENT_DIV = ELEMENT_DIV;
  exports.EMPTY_BOUNDS = EMPTY_BOUNDS;
  exports.ENDPOINT = ENDPOINT;
  exports.ERROR_SOURCE_DOES_NOT_EXIST = ERROR_SOURCE_DOES_NOT_EXIST;
  exports.ERROR_SOURCE_ENDPOINT_FULL = ERROR_SOURCE_ENDPOINT_FULL;
  exports.ERROR_TARGET_DOES_NOT_EXIST = ERROR_TARGET_DOES_NOT_EXIST;
  exports.ERROR_TARGET_ENDPOINT_FULL = ERROR_TARGET_ENDPOINT_FULL;
  exports.EVENT_ANCHOR_CHANGED = EVENT_ANCHOR_CHANGED;
  exports.EVENT_BEFORE_START = EVENT_BEFORE_START;
  exports.EVENT_CLICK = EVENT_CLICK;
  exports.EVENT_CONNECTION = EVENT_CONNECTION;
  exports.EVENT_CONNECTION_ABORT = EVENT_CONNECTION_ABORT;
  exports.EVENT_CONNECTION_CLICK = EVENT_CONNECTION_CLICK;
  exports.EVENT_CONNECTION_CONTEXTMENU = EVENT_CONNECTION_CONTEXTMENU;
  exports.EVENT_CONNECTION_DBL_CLICK = EVENT_CONNECTION_DBL_CLICK;
  exports.EVENT_CONNECTION_DBL_TAP = EVENT_CONNECTION_DBL_TAP;
  exports.EVENT_CONNECTION_DETACHED = EVENT_CONNECTION_DETACHED;
  exports.EVENT_CONNECTION_DRAG = EVENT_CONNECTION_DRAG;
  exports.EVENT_CONNECTION_MOUSEDOWN = EVENT_CONNECTION_MOUSEDOWN;
  exports.EVENT_CONNECTION_MOUSEOUT = EVENT_CONNECTION_MOUSEOUT;
  exports.EVENT_CONNECTION_MOUSEOVER = EVENT_CONNECTION_MOUSEOVER;
  exports.EVENT_CONNECTION_MOUSEUP = EVENT_CONNECTION_MOUSEUP;
  exports.EVENT_CONNECTION_MOVED = EVENT_CONNECTION_MOVED;
  exports.EVENT_CONNECTION_TAP = EVENT_CONNECTION_TAP;
  exports.EVENT_CONTAINER_CHANGE = EVENT_CONTAINER_CHANGE;
  exports.EVENT_CONTEXTMENU = EVENT_CONTEXTMENU;
  exports.EVENT_DBL_CLICK = EVENT_DBL_CLICK;
  exports.EVENT_DBL_TAP = EVENT_DBL_TAP;
  exports.EVENT_DRAG = EVENT_DRAG;
  exports.EVENT_DRAG_MOVE = EVENT_DRAG_MOVE;
  exports.EVENT_DRAG_START = EVENT_DRAG_START;
  exports.EVENT_DRAG_STOP = EVENT_DRAG_STOP;
  exports.EVENT_DROP = EVENT_DROP;
  exports.EVENT_ELEMENT_CLICK = EVENT_ELEMENT_CLICK;
  exports.EVENT_ELEMENT_CONTEXTMENU = EVENT_ELEMENT_CONTEXTMENU;
  exports.EVENT_ELEMENT_DBL_CLICK = EVENT_ELEMENT_DBL_CLICK;
  exports.EVENT_ELEMENT_DBL_TAP = EVENT_ELEMENT_DBL_TAP;
  exports.EVENT_ELEMENT_MOUSE_DOWN = EVENT_ELEMENT_MOUSE_DOWN;
  exports.EVENT_ELEMENT_MOUSE_MOVE = EVENT_ELEMENT_MOUSE_MOVE;
  exports.EVENT_ELEMENT_MOUSE_OUT = EVENT_ELEMENT_MOUSE_OUT;
  exports.EVENT_ELEMENT_MOUSE_OVER = EVENT_ELEMENT_MOUSE_OVER;
  exports.EVENT_ELEMENT_MOUSE_UP = EVENT_ELEMENT_MOUSE_UP;
  exports.EVENT_ELEMENT_TAP = EVENT_ELEMENT_TAP;
  exports.EVENT_ENDPOINT_CLICK = EVENT_ENDPOINT_CLICK;
  exports.EVENT_ENDPOINT_DBL_CLICK = EVENT_ENDPOINT_DBL_CLICK;
  exports.EVENT_ENDPOINT_DBL_TAP = EVENT_ENDPOINT_DBL_TAP;
  exports.EVENT_ENDPOINT_MOUSEDOWN = EVENT_ENDPOINT_MOUSEDOWN;
  exports.EVENT_ENDPOINT_MOUSEOUT = EVENT_ENDPOINT_MOUSEOUT;
  exports.EVENT_ENDPOINT_MOUSEOVER = EVENT_ENDPOINT_MOUSEOVER;
  exports.EVENT_ENDPOINT_MOUSEUP = EVENT_ENDPOINT_MOUSEUP;
  exports.EVENT_ENDPOINT_REPLACED = EVENT_ENDPOINT_REPLACED;
  exports.EVENT_ENDPOINT_TAP = EVENT_ENDPOINT_TAP;
  exports.EVENT_FOCUS = EVENT_FOCUS;
  exports.EVENT_GROUP_ADDED = EVENT_GROUP_ADDED;
  exports.EVENT_GROUP_COLLAPSE = EVENT_GROUP_COLLAPSE;
  exports.EVENT_GROUP_EXPAND = EVENT_GROUP_EXPAND;
  exports.EVENT_GROUP_MEMBER_ADDED = EVENT_GROUP_MEMBER_ADDED;
  exports.EVENT_GROUP_MEMBER_REMOVED = EVENT_GROUP_MEMBER_REMOVED;
  exports.EVENT_GROUP_REMOVED = EVENT_GROUP_REMOVED;
  exports.EVENT_INTERNAL_CONNECTION = EVENT_INTERNAL_CONNECTION;
  exports.EVENT_INTERNAL_CONNECTION_DETACHED = EVENT_INTERNAL_CONNECTION_DETACHED;
  exports.EVENT_INTERNAL_ENDPOINT_UNREGISTERED = EVENT_INTERNAL_ENDPOINT_UNREGISTERED;
  exports.EVENT_MANAGE_ELEMENT = EVENT_MANAGE_ELEMENT;
  exports.EVENT_MAX_CONNECTIONS = EVENT_MAX_CONNECTIONS;
  exports.EVENT_MOUSEDOWN = EVENT_MOUSEDOWN;
  exports.EVENT_MOUSEENTER = EVENT_MOUSEENTER;
  exports.EVENT_MOUSEEXIT = EVENT_MOUSEEXIT;
  exports.EVENT_MOUSEMOVE = EVENT_MOUSEMOVE;
  exports.EVENT_MOUSEOUT = EVENT_MOUSEOUT;
  exports.EVENT_MOUSEOVER = EVENT_MOUSEOVER;
  exports.EVENT_MOUSEUP = EVENT_MOUSEUP;
  exports.EVENT_NESTED_GROUP_ADDED = EVENT_NESTED_GROUP_ADDED;
  exports.EVENT_NESTED_GROUP_REMOVED = EVENT_NESTED_GROUP_REMOVED;
  exports.EVENT_OUT = EVENT_OUT;
  exports.EVENT_OVER = EVENT_OVER;
  exports.EVENT_REVERT = EVENT_REVERT;
  exports.EVENT_START = EVENT_START;
  exports.EVENT_STOP = EVENT_STOP;
  exports.EVENT_TAP = EVENT_TAP;
  exports.EVENT_TOUCHEND = EVENT_TOUCHEND;
  exports.EVENT_TOUCHMOVE = EVENT_TOUCHMOVE;
  exports.EVENT_TOUCHSTART = EVENT_TOUCHSTART;
  exports.EVENT_UNMANAGE_ELEMENT = EVENT_UNMANAGE_ELEMENT;
  exports.EVENT_ZOOM = EVENT_ZOOM;
  exports.ElementDragHandler = ElementDragHandler;
  exports.Endpoint = Endpoint;
  exports.EndpointFactory = EndpointFactory;
  exports.EndpointRepresentation = EndpointRepresentation;
  exports.EndpointSelection = EndpointSelection;
  exports.EventGenerator = EventGenerator;
  exports.EventManager = EventManager;
  exports.FALSE = FALSE$1;
  exports.FIXED = FIXED;
  exports.FlowchartConnector = FlowchartConnector;
  exports.GroupManager = GroupManager;
  exports.INTERCEPT_BEFORE_DETACH = INTERCEPT_BEFORE_DETACH;
  exports.INTERCEPT_BEFORE_DRAG = INTERCEPT_BEFORE_DRAG;
  exports.INTERCEPT_BEFORE_DROP = INTERCEPT_BEFORE_DROP;
  exports.INTERCEPT_BEFORE_START_DETACH = INTERCEPT_BEFORE_START_DETACH;
  exports.IS_DETACH_ALLOWED = IS_DETACH_ALLOWED;
  exports.JsPlumbInstance = JsPlumbInstance;
  exports.KEY_CONNECTION_OVERLAYS = KEY_CONNECTION_OVERLAYS;
  exports.LEFT = LEFT;
  exports.LabelOverlay = LabelOverlay;
  exports.LightweightFloatingAnchor = LightweightFloatingAnchor;
  exports.LightweightRouter = LightweightRouter;
  exports.NONE = NONE;
  exports.OptimisticEventGenerator = OptimisticEventGenerator;
  exports.Overlay = Overlay;
  exports.OverlayFactory = OverlayFactory;
  exports.PROPERTY_POSITION = PROPERTY_POSITION;
  exports.PlainArrowOverlay = PlainArrowOverlay;
  exports.REDROP_POLICY_ANY = REDROP_POLICY_ANY;
  exports.REDROP_POLICY_ANY_SOURCE = REDROP_POLICY_ANY_SOURCE;
  exports.REDROP_POLICY_ANY_SOURCE_OR_TARGET = REDROP_POLICY_ANY_SOURCE_OR_TARGET;
  exports.REDROP_POLICY_ANY_TARGET = REDROP_POLICY_ANY_TARGET;
  exports.REDROP_POLICY_STRICT = REDROP_POLICY_STRICT;
  exports.REMOVE_CLASS_ACTION = REMOVE_CLASS_ACTION;
  exports.RIGHT = RIGHT;
  exports.RectangleEndpoint = RectangleEndpoint;
  exports.RectangleEndpointHandler = RectangleEndpointHandler;
  exports.SELECTOR_CONNECTOR = SELECTOR_CONNECTOR;
  exports.SELECTOR_ENDPOINT = SELECTOR_ENDPOINT;
  exports.SELECTOR_GROUP = SELECTOR_GROUP;
  exports.SELECTOR_GROUP_CONTAINER = SELECTOR_GROUP_CONTAINER;
  exports.SELECTOR_MANAGED_ELEMENT = SELECTOR_MANAGED_ELEMENT;
  exports.SELECTOR_OVERLAY = SELECTOR_OVERLAY;
  exports.SOURCE = SOURCE;
  exports.SOURCE_INDEX = SOURCE_INDEX;
  exports.STATIC = STATIC;
  exports.StateMachineConnector = StateMachineConnector;
  exports.StraightConnector = StraightConnector;
  exports.StraightSegment = StraightSegment;
  exports.TARGET = TARGET;
  exports.TARGET_INDEX = TARGET_INDEX;
  exports.TOP = TOP;
  exports.TRUE = TRUE$1;
  exports.TWO_PI = TWO_PI;
  exports.UIGroup = UIGroup;
  exports.UINode = UINode;
  exports.UNDEFINED = UNDEFINED;
  exports.Viewport = Viewport;
  exports.WILDCARD = WILDCARD;
  exports.X_AXIS_FACES = X_AXIS_FACES;
  exports.Y_AXIS_FACES = Y_AXIS_FACES;
  exports._createPerimeterAnchor = _createPerimeterAnchor;
  exports._removeTypeCssHelper = _removeTypeCssHelper;
  exports._updateHoverStyle = _updateHoverStyle;
  exports.add = add;
  exports.addClass = addClass;
  exports.addToDictionary = addToDictionary;
  exports.addToList = addToList;
  exports.addWithFunction = addWithFunction;
  exports.arraysEqual = arraysEqual;
  exports.att = att;
  exports.bezierLineIntersection = bezierLineIntersection;
  exports.boundingBoxIntersection = boundingBoxIntersection;
  exports.boxIntersection = boxIntersection;
  exports.classList = classList;
  exports.clone = clone;
  exports.cls = cls;
  exports.compoundEvent = compoundEvent;
  exports.computeBezierLength = computeBezierLength;
  exports.consume = consume;
  exports.convertToFullOverlaySpec = convertToFullOverlaySpec;
  exports.createElement = createElement;
  exports.createElementNS = createElementNS;
  exports.createFloatingAnchor = createFloatingAnchor;
  exports.dist = dist;
  exports.distanceFromCurve = distanceFromCurve;
  exports.each = each;
  exports.encloses = encloses;
  exports.extend = extend;
  exports.fastTrim = fastTrim;
  exports.filterList = filterList;
  exports.filterNull = filterNull;
  exports.findAllWithFunction = findAllWithFunction;
  exports.findParent = findParent;
  exports.findWithFunction = findWithFunction;
  exports.fixPrecision = fixPrecision;
  exports.forEach = forEach;
  exports.fromArray = fromArray;
  exports.functionChain = functionChain;
  exports.getAllWithFunction = getAllWithFunction;
  exports.getClass = getClass;
  exports.getDefaultFace = getDefaultFace;
  exports.getElementPosition = getElementPosition;
  exports.getElementSize = getElementSize;
  exports.getElementType = getElementType;
  exports.getEventSource = getEventSource;
  exports.getFromSetWithFunction = getFromSetWithFunction;
  exports.getPageLocation = getPageLocation;
  exports.getPositionOnElement = getPositionOnElement;
  exports.getTouch = getTouch;
  exports.getWithFunction = getWithFunction;
  exports.getsert = getsert;
  exports.gradient = gradient;
  exports.gradientAtPoint = gradientAtPoint;
  exports.gradientAtPointAlongPathFrom = gradientAtPointAlongPathFrom;
  exports.groupDragConstrain = groupDragConstrain;
  exports.hasClass = hasClass;
  exports.insertSorted = insertSorted;
  exports.intersects = intersects;
  exports.isArrayLike = isArrayLike;
  exports.isArrowOverlay = isArrowOverlay;
  exports.isAssignableFrom = isAssignableFrom;
  exports.isBoolean = isBoolean;
  exports.isContinuous = isContinuous;
  exports.isCustomOverlay = isCustomOverlay;
  exports.isDate = isDate;
  exports.isDiamondOverlay = isDiamondOverlay;
  exports.isDynamic = isDynamic;
  exports.isEdgeSupported = isEdgeSupported;
  exports.isEmpty = isEmpty;
  exports.isFloating = _isFloating;
  exports.isFullOverlaySpec = isFullOverlaySpec;
  exports.isFunction = isFunction;
  exports.isInsideParent = isInsideParent;
  exports.isLabelOverlay = isLabelOverlay;
  exports.isMouseDevice = isMouseDevice;
  exports.isNamedFunction = isNamedFunction;
  exports.isNodeList = isNodeList;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isPlainArrowOverlay = isPlainArrowOverlay;
  exports.isPoint = isPoint;
  exports.isSVGElement = isSVGElement;
  exports.isString = isString;
  exports.isTouchDevice = isTouchDevice;
  exports.lineIntersection = lineIntersection;
  exports.lineLength = lineLength;
  exports.lineRectangleIntersection = lineRectangleIntersection;
  exports.locationAlongCurveFrom = locationAlongCurveFrom;
  exports.log = log;
  exports.logEnabled = logEnabled;
  exports.makeLightweightAnchorFromSpec = makeLightweightAnchorFromSpec;
  exports.map = map;
  exports.matchesSelector = matchesSelector$1;
  exports.merge = merge;
  exports.nearestPointOnCurve = nearestPointOnCurve;
  exports.newInstance = newInstance;
  exports.normal = normal;
  exports.objectsEqual = objectsEqual;
  exports.offsetRelativeToRoot = offsetRelativeToRoot;
  exports.offsetSize = offsetSize;
  exports.pageLocation = pageLocation;
  exports.perpendicularLineTo = perpendicularLineTo;
  exports.perpendicularToPathAt = perpendicularToPathAt;
  exports.pointAlongCurveFrom = pointAlongCurveFrom;
  exports.pointAlongPath = pointAlongPath;
  exports.pointOnCurve = pointOnCurve;
  exports.pointOnLine = pointOnLine;
  exports.populate = populate;
  exports.quadrant = quadrant;
  exports.ready = ready;
  exports.registerEndpointRenderer = registerEndpointRenderer;
  exports.remove = remove;
  exports.removeClass = removeClass;
  exports.removeWithFunction = removeWithFunction;
  exports.replace = replace;
  exports.rotateAnchorOrientation = rotateAnchorOrientation;
  exports.rotatePoint = rotatePoint;
  exports.setForceMouseEvents = setForceMouseEvents;
  exports.setForceTouchEvents = setForceTouchEvents;
  exports.setToArray = setToArray;
  exports.sgn = sgn$1;
  exports.snapToGrid = snapToGrid;
  exports.subtract = subtract;
  exports.suggest = suggest;
  exports.svg = svg;
  exports.svgWidthHeightSize = svgWidthHeightSize;
  exports.svgXYPosition = svgXYPosition;
  exports.theta = theta;
  exports.toggleClass = toggleClass;
  exports.touchCount = touchCount;
  exports.touches = touches;
  exports.uuid = uuid;
  exports.wrap = wrap;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
