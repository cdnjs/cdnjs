(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// https://d3js.org/d3-array/ Version 1.0.1. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector(compare) {
    if (compare.length === 1) compare = ascendingComparator(compare);
    return {
      left: function(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid;
          else lo = mid + 1;
        }
        return lo;
      }
    };
  }

  function ascendingComparator(f) {
    return function(d, x) {
      return ascending(f(d), x);
    };
  }

  var ascendingBisect = bisector(ascending);
  var bisectRight = ascendingBisect.right;
  var bisectLeft = ascendingBisect.left;

  function descending(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  }

  function number(x) {
    return x === null ? NaN : +x;
  }

  function variance(array, f) {
    var n = array.length,
        m = 0,
        a,
        d,
        s = 0,
        i = -1,
        j = 0;

    if (f == null) {
      while (++i < n) {
        if (!isNaN(a = number(array[i]))) {
          d = a - m;
          m += d / ++j;
          s += d * (a - m);
        }
      }
    }

    else {
      while (++i < n) {
        if (!isNaN(a = number(f(array[i], i, array)))) {
          d = a - m;
          m += d / ++j;
          s += d * (a - m);
        }
      }
    }

    if (j > 1) return s / (j - 1);
  }

  function deviation(array, f) {
    var v = variance(array, f);
    return v ? Math.sqrt(v) : v;
  }

  function extent(array, f) {
    var i = -1,
        n = array.length,
        a,
        b,
        c;

    if (f == null) {
      while (++i < n) if ((b = array[i]) != null && b >= b) { a = c = b; break; }
      while (++i < n) if ((b = array[i]) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    }

    else {
      while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = c = b; break; }
      while (++i < n) if ((b = f(array[i], i, array)) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    }

    return [a, c];
  }

  var array = Array.prototype;

  var slice = array.slice;
  var map = array.map;

  function constant(x) {
    return function() {
      return x;
    };
  }

  function identity(x) {
    return x;
  }

  function range(start, stop, step) {
    start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

    var i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        range = new Array(n);

    while (++i < n) {
      range[i] = start + i * step;
    }

    return range;
  }

  var e10 = Math.sqrt(50);
  var e5 = Math.sqrt(10);
  var e2 = Math.sqrt(2);
  function ticks(start, stop, count) {
    var step = tickStep(start, stop, count);
    return range(
      Math.ceil(start / step) * step,
      Math.floor(stop / step) * step + step / 2, // inclusive
      step
    );
  }

  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count),
        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
        error = step0 / step1;
    if (error >= e10) step1 *= 10;
    else if (error >= e5) step1 *= 5;
    else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  function sturges(values) {
    return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
  }

  function histogram() {
    var value = identity,
        domain = extent,
        threshold = sturges;

    function histogram(data) {
      var i,
          n = data.length,
          x,
          values = new Array(n);

      for (i = 0; i < n; ++i) {
        values[i] = value(data[i], i, data);
      }

      var xz = domain(values),
          x0 = xz[0],
          x1 = xz[1],
          tz = threshold(values, x0, x1);

      // Convert number of thresholds into uniform thresholds.
      if (!Array.isArray(tz)) tz = ticks(x0, x1, tz);

      // Remove any thresholds outside the domain.
      var m = tz.length;
      while (tz[0] <= x0) tz.shift(), --m;
      while (tz[m - 1] >= x1) tz.pop(), --m;

      var bins = new Array(m + 1),
          bin;

      // Initialize bins.
      for (i = 0; i <= m; ++i) {
        bin = bins[i] = [];
        bin.x0 = i > 0 ? tz[i - 1] : x0;
        bin.x1 = i < m ? tz[i] : x1;
      }

      // Assign data to bins by value, ignoring any outside the domain.
      for (i = 0; i < n; ++i) {
        x = values[i];
        if (x0 <= x && x <= x1) {
          bins[bisectRight(tz, x, 0, m)].push(data[i]);
        }
      }

      return bins;
    }

    histogram.value = function(_) {
      return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
    };

    histogram.domain = function(_) {
      return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
    };

    histogram.thresholds = function(_) {
      return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
    };

    return histogram;
  }

  function quantile(array, p, f) {
    if (f == null) f = number;
    if (!(n = array.length)) return;
    if ((p = +p) <= 0 || n < 2) return +f(array[0], 0, array);
    if (p >= 1) return +f(array[n - 1], n - 1, array);
    var n,
        h = (n - 1) * p,
        i = Math.floor(h),
        a = +f(array[i], i, array),
        b = +f(array[i + 1], i + 1, array);
    return a + (b - a) * (h - i);
  }

  function freedmanDiaconis(values, min, max) {
    values = map.call(values, number).sort(ascending);
    return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
  }

  function scott(values, min, max) {
    return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
  }

  function max(array, f) {
    var i = -1,
        n = array.length,
        a,
        b;

    if (f == null) {
      while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
    }

    else {
      while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
      while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
    }

    return a;
  }

  function mean(array, f) {
    var s = 0,
        n = array.length,
        a,
        i = -1,
        j = n;

    if (f == null) {
      while (++i < n) if (!isNaN(a = number(array[i]))) s += a; else --j;
    }

    else {
      while (++i < n) if (!isNaN(a = number(f(array[i], i, array)))) s += a; else --j;
    }

    if (j) return s / j;
  }

  function median(array, f) {
    var numbers = [],
        n = array.length,
        a,
        i = -1;

    if (f == null) {
      while (++i < n) if (!isNaN(a = number(array[i]))) numbers.push(a);
    }

    else {
      while (++i < n) if (!isNaN(a = number(f(array[i], i, array)))) numbers.push(a);
    }

    return quantile(numbers.sort(ascending), 0.5);
  }

  function merge(arrays) {
    var n = arrays.length,
        m,
        i = -1,
        j = 0,
        merged,
        array;

    while (++i < n) j += arrays[i].length;
    merged = new Array(j);

    while (--n >= 0) {
      array = arrays[n];
      m = array.length;
      while (--m >= 0) {
        merged[--j] = array[m];
      }
    }

    return merged;
  }

  function min(array, f) {
    var i = -1,
        n = array.length,
        a,
        b;

    if (f == null) {
      while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
    }

    else {
      while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
      while (++i < n) if ((b = f(array[i], i, array)) != null && a > b) a = b;
    }

    return a;
  }

  function pairs(array) {
    var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
    while (i < n) pairs[i] = [p, p = array[++i]];
    return pairs;
  }

  function permute(array, indexes) {
    var i = indexes.length, permutes = new Array(i);
    while (i--) permutes[i] = array[indexes[i]];
    return permutes;
  }

  function scan(array, compare) {
    if (!(n = array.length)) return;
    var i = 0,
        n,
        j = 0,
        xi,
        xj = array[j];

    if (!compare) compare = ascending;

    while (++i < n) if (compare(xi = array[i], xj) < 0 || compare(xj, xj) !== 0) xj = xi, j = i;

    if (compare(xj, xj) === 0) return j;
  }

  function shuffle(array, i0, i1) {
    var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
        t,
        i;

    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m + i0];
      array[m + i0] = array[i + i0];
      array[i + i0] = t;
    }

    return array;
  }

  function sum(array, f) {
    var s = 0,
        n = array.length,
        a,
        i = -1;

    if (f == null) {
      while (++i < n) if (a = +array[i]) s += a; // Note: zero and null are equivalent.
    }

    else {
      while (++i < n) if (a = +f(array[i], i, array)) s += a;
    }

    return s;
  }

  function transpose(matrix) {
    if (!(n = matrix.length)) return [];
    for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
      for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
        row[j] = matrix[j][i];
      }
    }
    return transpose;
  }

  function length(d) {
    return d.length;
  }

  function zip() {
    return transpose(arguments);
  }

  exports.bisect = bisectRight;
  exports.bisectRight = bisectRight;
  exports.bisectLeft = bisectLeft;
  exports.ascending = ascending;
  exports.bisector = bisector;
  exports.descending = descending;
  exports.deviation = deviation;
  exports.extent = extent;
  exports.histogram = histogram;
  exports.thresholdFreedmanDiaconis = freedmanDiaconis;
  exports.thresholdScott = scott;
  exports.thresholdSturges = sturges;
  exports.max = max;
  exports.mean = mean;
  exports.median = median;
  exports.merge = merge;
  exports.min = min;
  exports.pairs = pairs;
  exports.permute = permute;
  exports.quantile = quantile;
  exports.range = range;
  exports.scan = scan;
  exports.shuffle = shuffle;
  exports.sum = sum;
  exports.ticks = ticks;
  exports.tickStep = tickStep;
  exports.transpose = transpose;
  exports.variance = variance;
  exports.zip = zip;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{}],2:[function(require,module,exports){
// https://d3js.org/d3-collection/ Version 1.0.1. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  var prefix = "$";

  function Map() {}

  Map.prototype = map.prototype = {
    constructor: Map,
    has: function(key) {
      return (prefix + key) in this;
    },
    get: function(key) {
      return this[prefix + key];
    },
    set: function(key, value) {
      this[prefix + key] = value;
      return this;
    },
    remove: function(key) {
      var property = prefix + key;
      return property in this && delete this[property];
    },
    clear: function() {
      for (var property in this) if (property[0] === prefix) delete this[property];
    },
    keys: function() {
      var keys = [];
      for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
      return keys;
    },
    values: function() {
      var values = [];
      for (var property in this) if (property[0] === prefix) values.push(this[property]);
      return values;
    },
    entries: function() {
      var entries = [];
      for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
      return entries;
    },
    size: function() {
      var size = 0;
      for (var property in this) if (property[0] === prefix) ++size;
      return size;
    },
    empty: function() {
      for (var property in this) if (property[0] === prefix) return false;
      return true;
    },
    each: function(f) {
      for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
    }
  };

  function map(object, f) {
    var map = new Map;

    // Copy constructor.
    if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

    // Index array by numeric index or specified key function.
    else if (Array.isArray(object)) {
      var i = -1,
          n = object.length,
          o;

      if (f == null) while (++i < n) map.set(i, object[i]);
      else while (++i < n) map.set(f(o = object[i], i, object), o);
    }

    // Convert object to map.
    else if (object) for (var key in object) map.set(key, object[key]);

    return map;
  }

  function nest() {
    var keys = [],
        sortKeys = [],
        sortValues,
        rollup,
        nest;

    function apply(array, depth, createResult, setResult) {
      if (depth >= keys.length) return rollup != null
          ? rollup(array) : (sortValues != null
          ? array.sort(sortValues)
          : array);

      var i = -1,
          n = array.length,
          key = keys[depth++],
          keyValue,
          value,
          valuesByKey = map(),
          values,
          result = createResult();

      while (++i < n) {
        if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
          values.push(value);
        } else {
          valuesByKey.set(keyValue, [value]);
        }
      }

      valuesByKey.each(function(values, key) {
        setResult(result, key, apply(values, depth, createResult, setResult));
      });

      return result;
    }

    function entries(map, depth) {
      if (++depth > keys.length) return map;
      var array, sortKey = sortKeys[depth - 1];
      if (rollup != null && depth >= keys.length) array = map.entries();
      else array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
      return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
    }

    return nest = {
      object: function(array) { return apply(array, 0, createObject, setObject); },
      map: function(array) { return apply(array, 0, createMap, setMap); },
      entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
      key: function(d) { keys.push(d); return nest; },
      sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
      sortValues: function(order) { sortValues = order; return nest; },
      rollup: function(f) { rollup = f; return nest; }
    };
  }

  function createObject() {
    return {};
  }

  function setObject(object, key, value) {
    object[key] = value;
  }

  function createMap() {
    return map();
  }

  function setMap(map, key, value) {
    map.set(key, value);
  }

  function Set() {}

  var proto = map.prototype;

  Set.prototype = set.prototype = {
    constructor: Set,
    has: proto.has,
    add: function(value) {
      value += "";
      this[prefix + value] = value;
      return this;
    },
    remove: proto.remove,
    clear: proto.clear,
    values: proto.keys,
    size: proto.size,
    empty: proto.empty,
    each: proto.each
  };

  function set(object, f) {
    var set = new Set;

    // Copy constructor.
    if (object instanceof Set) object.each(function(value) { set.add(value); });

    // Otherwise, assume it’s an array.
    else if (object) {
      var i = -1, n = object.length;
      if (f == null) while (++i < n) set.add(object[i]);
      else while (++i < n) set.add(f(object[i], i, object));
    }

    return set;
  }

  function keys(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  }

  function values(map) {
    var values = [];
    for (var key in map) values.push(map[key]);
    return values;
  }

  function entries(map) {
    var entries = [];
    for (var key in map) entries.push({key: key, value: map[key]});
    return entries;
  }

  exports.nest = nest;
  exports.set = set;
  exports.map = map;
  exports.keys = keys;
  exports.values = values;
  exports.entries = entries;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{}],3:[function(require,module,exports){
// https://d3js.org/d3-color/ Version 1.0.1. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reHex3 = /^#([0-9a-f]{3})$/;
  var reHex6 = /^#([0-9a-f]{6})$/;
  var reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
  var reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
  var reRgbaInteger = /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
  var reRgbaPercent = /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
  var reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
  var reHslaPercent = /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define(Color, color, {
    displayable: function() {
      return this.rgb().displayable();
    },
    toString: function() {
      return this.rgb() + "";
    }
  });

  function color(format) {
    var m;
    format = (format + "").trim().toLowerCase();
    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
        : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format])
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
      return this;
    },
    displayable: function() {
      return (0 <= this.r && this.r <= 255)
          && (0 <= this.g && this.g <= 255)
          && (0 <= this.b && this.b <= 255)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    toString: function() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(")
          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
          + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    displayable: function() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    }
  }));

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var deg2rad = Math.PI / 180;
  var rad2deg = 180 / Math.PI;

  var Kn = 18;
  var Xn = 0.950470;
  var Yn = 1;
  var Zn = 1.088830;
  var t0 = 4 / 29;
  var t1 = 6 / 29;
  var t2 = 3 * t1 * t1;
  var t3 = t1 * t1 * t1;
  function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl) {
      var h = o.h * deg2rad;
      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
    }
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var b = rgb2xyz(o.r),
        a = rgb2xyz(o.g),
        l = rgb2xyz(o.b),
        x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
        y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
        z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }

  function lab(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
  }

  function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Lab, lab, extend(Color, {
    brighter: function(k) {
      return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker: function(k) {
      return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb: function() {
      var y = (this.l + 16) / 116,
          x = isNaN(this.a) ? y : y + this.a / 500,
          z = isNaN(this.b) ? y : y - this.b / 200;
      y = Yn * lab2xyz(y);
      x = Xn * lab2xyz(x);
      z = Zn * lab2xyz(z);
      return new Rgb(
        xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
        xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
        xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
        this.opacity
      );
    }
  }));

  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }

  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }

  function xyz2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  function rgb2xyz(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  function hclConvert(o) {
    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab)) o = labConvert(o);
    var h = Math.atan2(o.b, o.a) * rad2deg;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }

  function hcl(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
  }

  function Hcl(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hcl, hcl, extend(Color, {
    brighter: function(k) {
      return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
    },
    darker: function(k) {
      return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
    },
    rgb: function() {
      return labConvert(this).rgb();
    }
  }));

  var A = -0.14861;
  var B = +1.78277;
  var C = -0.29227;
  var D = -0.90649;
  var E = +1.97294;
  var ED = E * D;
  var EB = E * B;
  var BC_DA = B * C - D * A;
  function cubehelixConvert(o) {
    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
        bl = b - l,
        k = (E * (g - l) - C * bl) / D,
        s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
        h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
  }

  function cubehelix(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
  }

  function Cubehelix(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Cubehelix, cubehelix, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
      var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
          l = +this.l,
          a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
          cosh = Math.cos(h),
          sinh = Math.sin(h);
      return new Rgb(
        255 * (l + a * (A * cosh + B * sinh)),
        255 * (l + a * (C * cosh + D * sinh)),
        255 * (l + a * (E * cosh)),
        this.opacity
      );
    }
  }));

  exports.color = color;
  exports.rgb = rgb;
  exports.hsl = hsl;
  exports.lab = lab;
  exports.hcl = hcl;
  exports.cubehelix = cubehelix;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{}],4:[function(require,module,exports){
// https://d3js.org/d3-dispatch/ Version 1.0.1. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  var noop = {value: function() {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  exports.dispatch = dispatch;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{}],5:[function(require,module,exports){
// https://d3js.org/d3-format/ Version 1.0.2. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimal(1.23) returns ["123", 0].
  function formatDecimal(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  }

  function exponent(x) {
    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatDefault(x, p) {
    x = x.toPrecision(p);

    out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (x[i]) {
        case ".": i0 = i1 = i; break;
        case "0": if (i0 === 0) i0 = i; i1 = i; break;
        case "e": break out;
        default: if (i0 > 0) i0 = 0; break;
      }
    }

    return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
  }

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient
        : i > n ? coefficient + new Array(i - n + 1).join("0")
        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
        : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "": formatDefault,
    "%": function(x, p) { return (x * 100).toFixed(p); },
    "b": function(x) { return Math.round(x).toString(2); },
    "c": function(x) { return x + ""; },
    "d": function(x) { return Math.round(x).toString(10); },
    "e": function(x, p) { return x.toExponential(p); },
    "f": function(x, p) { return x.toFixed(p); },
    "g": function(x, p) { return x.toPrecision(p); },
    "o": function(x) { return Math.round(x).toString(8); },
    "p": function(x, p) { return formatRounded(x * 100, p); },
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
    "x": function(x) { return Math.round(x).toString(16); }
  };

  // [[fill]align][sign][symbol][0][width][,][.precision][type]
  var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    return new FormatSpecifier(specifier);
  }

  function FormatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);

    var match,
        fill = match[1] || " ",
        align = match[2] || ">",
        sign = match[3] || "-",
        symbol = match[4] || "",
        zero = !!match[5],
        width = match[6] && +match[6],
        comma = !!match[7],
        precision = match[8] && +match[8].slice(1),
        type = match[9] || "";

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // Map invalid types to the default format.
    else if (!formatTypes[type]) type = "";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    this.fill = fill;
    this.align = align;
    this.sign = sign;
    this.symbol = symbol;
    this.zero = zero;
    this.width = width;
    this.comma = comma;
    this.precision = precision;
    this.type = type;
  }

  FormatSpecifier.prototype.toString = function() {
    return this.fill
        + this.align
        + this.sign
        + this.symbol
        + (this.zero ? "0" : "")
        + (this.width == null ? "" : Math.max(1, this.width | 0))
        + (this.comma ? "," : "")
        + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
        + this.type;
  };

  var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

  function identity(x) {
    return x;
  }

  function formatLocale(locale) {
    var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
        currency = locale.currency,
        decimal = locale.decimal;

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          type = specifier.type;

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? "%" : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
          maybeSuffix = !type || /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision == null ? (type ? 6 : 12)
          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
          : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i, n, c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Convert negative to positive, and compute the prefix.
          // Note that -0 is not less than 0, but 1 / -0 is!
          var valueNegative = (value < 0 || 1 / value < 0) && (value *= -1, true);

          // Perform the initial formatting.
          value = formatType(value, precision);

          // If the original value was negative, it may be rounded to zero during
          // formatting; treat this as (positive) zero.
          if (valueNegative) {
            i = -1, n = value.length;
            valueNegative = false;
            while (++i < n) {
              if (c = value.charCodeAt(i), (48 < c && c < 58)
                  || (type === "x" && 96 < c && c < 103)
                  || (type === "X" && 64 < c && c < 71)) {
                valueNegative = true;
                break;
              }
            }
          }

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<": return valuePrefix + value + valueSuffix + padding;
          case "=": return valuePrefix + padding + value + valueSuffix;
          case "^": return padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
        }
        return padding + valuePrefix + value + valueSuffix;
      }

      format.toString = function() {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function(value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale;
  defaultLocale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  function defaultLocale(definition) {
    locale = formatLocale(definition);
    exports.format = locale.format;
    exports.formatPrefix = locale.formatPrefix;
    return locale;
  }

  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  exports.formatDefaultLocale = defaultLocale;
  exports.formatLocale = formatLocale;
  exports.formatSpecifier = formatSpecifier;
  exports.precisionFixed = precisionFixed;
  exports.precisionPrefix = precisionPrefix;
  exports.precisionRound = precisionRound;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{}],6:[function(require,module,exports){
// https://d3js.org/d3-interpolate/ Version 1.1.1. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-color')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3));
}(this, function (exports,d3Color) { 'use strict';

  function basis(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0
        + (4 - 6 * t2 + 3 * t3) * v1
        + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
        + t3 * v3) / 6;
  }

  function basis$1(values) {
    var n = values.length - 1;
    return function(t) {
      var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
          v1 = values[i],
          v2 = values[i + 1],
          v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
          v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  function basisClosed(values) {
    var n = values.length;
    return function(t) {
      var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
          v0 = values[(i + n - 1) % n],
          v1 = values[i % n],
          v2 = values[(i + 1) % n],
          v3 = values[(i + 2) % n];
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  function constant(x) {
    return function() {
      return x;
    };
  }

  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function hue(a, b) {
    var d = b - a;
    return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
  }

  var rgb$1 = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb(start, end) {
      var r = color((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = color(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb.gamma = rgbGamma;

    return rgb;
  })(1);

  function rgbSpline(spline) {
    return function(colors) {
      var n = colors.length,
          r = new Array(n),
          g = new Array(n),
          b = new Array(n),
          i, color;
      for (i = 0; i < n; ++i) {
        color = d3Color.rgb(colors[i]);
        r[i] = color.r || 0;
        g[i] = color.g || 0;
        b[i] = color.b || 0;
      }
      r = spline(r);
      g = spline(g);
      b = spline(b);
      color.opacity = 1;
      return function(t) {
        color.r = r(t);
        color.g = g(t);
        color.b = b(t);
        return color + "";
      };
    };
  }

  var rgbBasis = rgbSpline(basis$1);
  var rgbBasisClosed = rgbSpline(basisClosed);

  function array(a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(nb),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
    for (; i < nb; ++i) c[i] = b[i];

    return function(t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);
      return c;
    };
  }

  function date(a, b) {
    var d = new Date;
    return a = +a, b -= a, function(t) {
      return d.setTime(a + b * t), d;
    };
  }

  function number(a, b) {
    return a = +a, b -= a, function(t) {
      return a + b * t;
    };
  }

  function object(a, b) {
    var i = {},
        c = {},
        k;

    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = value(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  var reB = new RegExp(reA.source, "g");
  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function string(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: number(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  function value(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? constant(b)
        : (t === "number" ? number
        : t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb$1) : string)
        : b instanceof d3Color.color ? rgb$1
        : b instanceof Date ? date
        : Array.isArray(b) ? array
        : isNaN(b) ? object
        : number)(a, b);
  }

  function round(a, b) {
    return a = +a, b -= a, function(t) {
      return Math.round(a + b * t);
    };
  }

  var degrees = 180 / Math.PI;

  var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var cssNode;
  var cssRoot;
  var cssView;
  var svgNode;
  function parseCss(value) {
    if (value === "none") return identity;
    if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
    cssNode.style.transform = value;
    value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
    cssRoot.removeChild(cssNode);
    value = value.slice(7, -1).split(",");
    return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
  }

  function parseSvg(value) {
    if (value == null) return identity;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  var rho = Math.SQRT2;
  var rho2 = 2;
  var rho4 = 4;
  var epsilon2 = 1e-12;
  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }

  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }

  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      }
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      }
    }

    i.duration = S * 1000;

    return i;
  }

  function hsl$1(hue) {
    return function(start, end) {
      var h = hue((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }
  }

  var hsl$2 = hsl$1(hue);
  var hslLong = hsl$1(nogamma);

  function lab$1(start, end) {
    var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
        a = nogamma(start.a, end.a),
        b = nogamma(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.l = l(t);
      start.a = a(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  function hcl$1(hue) {
    return function(start, end) {
      var h = hue((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
          c = nogamma(start.c, end.c),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.c = c(t);
        start.l = l(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }
  }

  var hcl$2 = hcl$1(hue);
  var hclLong = hcl$1(nogamma);

  function cubehelix$1(hue) {
    return (function cubehelixGamma(y) {
      y = +y;

      function cubehelix(start, end) {
        var h = hue((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
            s = nogamma(start.s, end.s),
            l = nogamma(start.l, end.l),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.h = h(t);
          start.s = s(t);
          start.l = l(Math.pow(t, y));
          start.opacity = opacity(t);
          return start + "";
        };
      }

      cubehelix.gamma = cubehelixGamma;

      return cubehelix;
    })(1);
  }

  var cubehelix$2 = cubehelix$1(hue);
  var cubehelixLong = cubehelix$1(nogamma);

  function quantize(interpolator, n) {
    var samples = new Array(n);
    for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
    return samples;
  }

  exports.interpolate = value;
  exports.interpolateArray = array;
  exports.interpolateBasis = basis$1;
  exports.interpolateBasisClosed = basisClosed;
  exports.interpolateDate = date;
  exports.interpolateNumber = number;
  exports.interpolateObject = object;
  exports.interpolateRound = round;
  exports.interpolateString = string;
  exports.interpolateTransformCss = interpolateTransformCss;
  exports.interpolateTransformSvg = interpolateTransformSvg;
  exports.interpolateZoom = zoom;
  exports.interpolateRgb = rgb$1;
  exports.interpolateRgbBasis = rgbBasis;
  exports.interpolateRgbBasisClosed = rgbBasisClosed;
  exports.interpolateHsl = hsl$2;
  exports.interpolateHslLong = hslLong;
  exports.interpolateLab = lab$1;
  exports.interpolateHcl = hcl$2;
  exports.interpolateHclLong = hclLong;
  exports.interpolateCubehelix = cubehelix$2;
  exports.interpolateCubehelixLong = cubehelixLong;
  exports.quantize = quantize;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{"d3-color":3}],7:[function(require,module,exports){
// https://d3js.org/d3-scale/ Version 1.0.3. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-interpolate'), require('d3-format'), require('d3-time'), require('d3-time-format'), require('d3-color')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-collection', 'd3-interpolate', 'd3-format', 'd3-time', 'd3-time-format', 'd3-color'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
}(this, function (exports,d3Array,d3Collection,d3Interpolate,d3Format,d3Time,d3TimeFormat,d3Color) { 'use strict';

  var array = Array.prototype;

  var map$1 = array.map;
  var slice = array.slice;

  var implicit = {name: "implicit"};

  function ordinal(range) {
    var index = d3Collection.map(),
        domain = [],
        unknown = implicit;

    range = range == null ? [] : slice.call(range);

    function scale(d) {
      var key = d + "", i = index.get(key);
      if (!i) {
        if (unknown !== implicit) return unknown;
        index.set(key, i = domain.push(d));
      }
      return range[(i - 1) % range.length];
    }

    scale.domain = function(_) {
      if (!arguments.length) return domain.slice();
      domain = [], index = d3Collection.map();
      var i = -1, n = _.length, d, key;
      while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
      return scale;
    };

    scale.range = function(_) {
      return arguments.length ? (range = slice.call(_), scale) : range.slice();
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function() {
      return ordinal()
          .domain(domain)
          .range(range)
          .unknown(unknown);
    };

    return scale;
  }

  function band() {
    var scale = ordinal().unknown(undefined),
        domain = scale.domain,
        ordinalRange = scale.range,
        range = [0, 1],
        step,
        bandwidth,
        round = false,
        paddingInner = 0,
        paddingOuter = 0,
        align = 0.5;

    delete scale.unknown;

    function rescale() {
      var n = domain().length,
          reverse = range[1] < range[0],
          start = range[reverse - 0],
          stop = range[1 - reverse];
      step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
      if (round) step = Math.floor(step);
      start += (stop - start - step * (n - paddingInner)) * align;
      bandwidth = step * (1 - paddingInner);
      if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
      var values = d3Array.range(n).map(function(i) { return start + step * i; });
      return ordinalRange(reverse ? values.reverse() : values);
    }

    scale.domain = function(_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.range = function(_) {
      return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
    };

    scale.rangeRound = function(_) {
      return range = [+_[0], +_[1]], round = true, rescale();
    };

    scale.bandwidth = function() {
      return bandwidth;
    };

    scale.step = function() {
      return step;
    };

    scale.round = function(_) {
      return arguments.length ? (round = !!_, rescale()) : round;
    };

    scale.padding = function(_) {
      return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
    };

    scale.paddingInner = function(_) {
      return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
    };

    scale.paddingOuter = function(_) {
      return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
    };

    scale.align = function(_) {
      return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
    };

    scale.copy = function() {
      return band()
          .domain(domain())
          .range(range)
          .round(round)
          .paddingInner(paddingInner)
          .paddingOuter(paddingOuter)
          .align(align);
    };

    return rescale();
  }

  function pointish(scale) {
    var copy = scale.copy;

    scale.padding = scale.paddingOuter;
    delete scale.paddingInner;
    delete scale.paddingOuter;

    scale.copy = function() {
      return pointish(copy());
    };

    return scale;
  }

  function point() {
    return pointish(band().paddingInner(1));
  }

  function constant(x) {
    return function() {
      return x;
    };
  }

  function number(x) {
    return +x;
  }

  var unit = [0, 1];

  function deinterpolate(a, b) {
    return (b -= (a = +a))
        ? function(x) { return (x - a) / b; }
        : constant(b);
  }

  function deinterpolateClamp(deinterpolate) {
    return function(a, b) {
      var d = deinterpolate(a = +a, b = +b);
      return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
    };
  }

  function reinterpolateClamp(reinterpolate) {
    return function(a, b) {
      var r = reinterpolate(a = +a, b = +b);
      return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
    };
  }

  function bimap(domain, range, deinterpolate, reinterpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);
    else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
    return function(x) { return r0(d0(x)); };
  }

  function polymap(domain, range, deinterpolate, reinterpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1;

    // Reverse descending domains.
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = deinterpolate(domain[i], domain[i + 1]);
      r[i] = reinterpolate(range[i], range[i + 1]);
    }

    return function(x) {
      var i = d3Array.bisect(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target
        .domain(source.domain())
        .range(source.range())
        .interpolate(source.interpolate())
        .clamp(source.clamp());
  }

  // deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
  function continuous(deinterpolate$$, reinterpolate) {
    var domain = unit,
        range = unit,
        interpolate = d3Interpolate.interpolate,
        clamp = false,
        piecewise,
        output,
        input;

    function rescale() {
      piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return (output || (output = piecewise(domain, range, clamp ? deinterpolateClamp(deinterpolate$$) : deinterpolate$$, interpolate)))(+x);
    }

    scale.invert = function(y) {
      return (input || (input = piecewise(range, domain, deinterpolate, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
    };

    scale.domain = function(_) {
      return arguments.length ? (domain = map$1.call(_, number), rescale()) : domain.slice();
    };

    scale.range = function(_) {
      return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
    };

    scale.rangeRound = function(_) {
      return range = slice.call(_), interpolate = d3Interpolate.interpolateRound, rescale();
    };

    scale.clamp = function(_) {
      return arguments.length ? (clamp = !!_, rescale()) : clamp;
    };

    scale.interpolate = function(_) {
      return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };

    return rescale();
  }

  function tickFormat(domain, count, specifier) {
    var start = domain[0],
        stop = domain[domain.length - 1],
        step = d3Array.tickStep(start, stop, count == null ? 10 : count),
        precision;
    specifier = d3Format.formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = d3Format.precisionPrefix(step, value))) specifier.precision = precision;
        return d3Format.formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = d3Format.precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = d3Format.precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return d3Format.format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function(count) {
      var d = domain();
      return d3Array.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function(count, specifier) {
      return tickFormat(domain(), count, specifier);
    };

    scale.nice = function(count) {
      var d = domain(),
          i = d.length - 1,
          n = count == null ? 10 : count,
          start = d[0],
          stop = d[i],
          step = d3Array.tickStep(start, stop, n);

      if (step) {
        step = d3Array.tickStep(Math.floor(start / step) * step, Math.ceil(stop / step) * step, n);
        d[0] = Math.floor(start / step) * step;
        d[i] = Math.ceil(stop / step) * step;
        domain(d);
      }

      return scale;
    };

    return scale;
  }

  function linear() {
    var scale = continuous(deinterpolate, d3Interpolate.interpolateNumber);

    scale.copy = function() {
      return copy(scale, linear());
    };

    return linearish(scale);
  }

  function identity() {
    var domain = [0, 1];

    function scale(x) {
      return +x;
    }

    scale.invert = scale;

    scale.domain = scale.range = function(_) {
      return arguments.length ? (domain = map$1.call(_, number), scale) : domain.slice();
    };

    scale.copy = function() {
      return identity().domain(domain);
    };

    return linearish(scale);
  }

  function nice(domain, interval) {
    domain = domain.slice();

    var i0 = 0,
        i1 = domain.length - 1,
        x0 = domain[i0],
        x1 = domain[i1],
        t;

    if (x1 < x0) {
      t = i0, i0 = i1, i1 = t;
      t = x0, x0 = x1, x1 = t;
    }

    domain[i0] = interval.floor(x0);
    domain[i1] = interval.ceil(x1);
    return domain;
  }

  function deinterpolate$1(a, b) {
    return (b = Math.log(b / a))
        ? function(x) { return Math.log(x / a) / b; }
        : constant(b);
  }

  function reinterpolate(a, b) {
    return a < 0
        ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
        : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
  }

  function pow10(x) {
    return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
  }

  function powp(base) {
    return base === 10 ? pow10
        : base === Math.E ? Math.exp
        : function(x) { return Math.pow(base, x); };
  }

  function logp(base) {
    return base === Math.E ? Math.log
        : base === 10 && Math.log10
        || base === 2 && Math.log2
        || (base = Math.log(base), function(x) { return Math.log(x) / base; });
  }

  function reflect(f) {
    return function(x) {
      return -f(-x);
    };
  }

  function log() {
    var scale = continuous(deinterpolate$1, reinterpolate).domain([1, 10]),
        domain = scale.domain,
        base = 10,
        logs = logp(10),
        pows = powp(10);

    function rescale() {
      logs = logp(base), pows = powp(base);
      if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
      return scale;
    }

    scale.base = function(_) {
      return arguments.length ? (base = +_, rescale()) : base;
    };

    scale.domain = function(_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.ticks = function(count) {
      var d = domain(),
          u = d[0],
          v = d[d.length - 1],
          r;

      if (r = v < u) i = u, u = v, v = i;

      var i = logs(u),
          j = logs(v),
          p,
          k,
          t,
          n = count == null ? 10 : +count,
          z = [];

      if (!(base % 1) && j - i < n) {
        i = Math.round(i) - 1, j = Math.round(j) + 1;
        if (u > 0) for (; i < j; ++i) {
          for (k = 1, p = pows(i); k < base; ++k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        } else for (; i < j; ++i) {
          for (k = base - 1, p = pows(i); k >= 1; --k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        }
      } else {
        z = d3Array.ticks(i, j, Math.min(j - i, n)).map(pows);
      }

      return r ? z.reverse() : z;
    };

    scale.tickFormat = function(count, specifier) {
      if (specifier == null) specifier = base === 10 ? ".0e" : ",";
      if (typeof specifier !== "function") specifier = d3Format.format(specifier);
      if (count === Infinity) return specifier;
      if (count == null) count = 10;
      var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
      return function(d) {
        var i = d / pows(Math.round(logs(d)));
        if (i * base < base - 0.5) i *= base;
        return i <= k ? specifier(d) : "";
      };
    };

    scale.nice = function() {
      return domain(nice(domain(), {
        floor: function(x) { return pows(Math.floor(logs(x))); },
        ceil: function(x) { return pows(Math.ceil(logs(x))); }
      }));
    };

    scale.copy = function() {
      return copy(scale, log().base(base));
    };

    return scale;
  }

  function raise(x, exponent) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  }

  function pow() {
    var exponent = 1,
        scale = continuous(deinterpolate, reinterpolate),
        domain = scale.domain;

    function deinterpolate(a, b) {
      return (b = raise(b, exponent) - (a = raise(a, exponent)))
          ? function(x) { return (raise(x, exponent) - a) / b; }
          : constant(b);
    }

    function reinterpolate(a, b) {
      b = raise(b, exponent) - (a = raise(a, exponent));
      return function(t) { return raise(a + b * t, 1 / exponent); };
    }

    scale.exponent = function(_) {
      return arguments.length ? (exponent = +_, domain(domain())) : exponent;
    };

    scale.copy = function() {
      return copy(scale, pow().exponent(exponent));
    };

    return linearish(scale);
  }

  function sqrt() {
    return pow().exponent(0.5);
  }

  function quantile$1() {
    var domain = [],
        range = [],
        thresholds = [];

    function rescale() {
      var i = 0, n = Math.max(1, range.length);
      thresholds = new Array(n - 1);
      while (++i < n) thresholds[i - 1] = d3Array.quantile(domain, i / n);
      return scale;
    }

    function scale(x) {
      if (!isNaN(x = +x)) return range[d3Array.bisect(thresholds, x)];
    }

    scale.invertExtent = function(y) {
      var i = range.indexOf(y);
      return i < 0 ? [NaN, NaN] : [
        i > 0 ? thresholds[i - 1] : domain[0],
        i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
      ];
    };

    scale.domain = function(_) {
      if (!arguments.length) return domain.slice();
      domain = [];
      for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
      domain.sort(d3Array.ascending);
      return rescale();
    };

    scale.range = function(_) {
      return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
    };

    scale.quantiles = function() {
      return thresholds.slice();
    };

    scale.copy = function() {
      return quantile$1()
          .domain(domain)
          .range(range);
    };

    return scale;
  }

  function quantize() {
    var x0 = 0,
        x1 = 1,
        n = 1,
        domain = [0.5],
        range = [0, 1];

    function scale(x) {
      if (x <= x) return range[d3Array.bisect(domain, x, 0, n)];
    }

    function rescale() {
      var i = -1;
      domain = new Array(n);
      while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
      return scale;
    }

    scale.domain = function(_) {
      return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
    };

    scale.range = function(_) {
      return arguments.length ? (n = (range = slice.call(_)).length - 1, rescale()) : range.slice();
    };

    scale.invertExtent = function(y) {
      var i = range.indexOf(y);
      return i < 0 ? [NaN, NaN]
          : i < 1 ? [x0, domain[0]]
          : i >= n ? [domain[n - 1], x1]
          : [domain[i - 1], domain[i]];
    };

    scale.copy = function() {
      return quantize()
          .domain([x0, x1])
          .range(range);
    };

    return linearish(scale);
  }

  function threshold() {
    var domain = [0.5],
        range = [0, 1],
        n = 1;

    function scale(x) {
      if (x <= x) return range[d3Array.bisect(domain, x, 0, n)];
    }

    scale.domain = function(_) {
      return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
    };

    scale.range = function(_) {
      return arguments.length ? (range = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
    };

    scale.invertExtent = function(y) {
      var i = range.indexOf(y);
      return [domain[i - 1], domain[i]];
    };

    scale.copy = function() {
      return threshold()
          .domain(domain)
          .range(range);
    };

    return scale;
  }

  var durationSecond = 1000;
  var durationMinute = durationSecond * 60;
  var durationHour = durationMinute * 60;
  var durationDay = durationHour * 24;
  var durationWeek = durationDay * 7;
  var durationMonth = durationDay * 30;
  var durationYear = durationDay * 365;
  function date(t) {
    return new Date(t);
  }

  function number$1(t) {
    return t instanceof Date ? +t : +new Date(+t);
  }

  function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
    var scale = continuous(deinterpolate, d3Interpolate.interpolateNumber),
        invert = scale.invert,
        domain = scale.domain;

    var formatMillisecond = format(".%L"),
        formatSecond = format(":%S"),
        formatMinute = format("%I:%M"),
        formatHour = format("%I %p"),
        formatDay = format("%a %d"),
        formatWeek = format("%b %d"),
        formatMonth = format("%B"),
        formatYear = format("%Y");

    var tickIntervals = [
      [second,  1,      durationSecond],
      [second,  5,  5 * durationSecond],
      [second, 15, 15 * durationSecond],
      [second, 30, 30 * durationSecond],
      [minute,  1,      durationMinute],
      [minute,  5,  5 * durationMinute],
      [minute, 15, 15 * durationMinute],
      [minute, 30, 30 * durationMinute],
      [  hour,  1,      durationHour  ],
      [  hour,  3,  3 * durationHour  ],
      [  hour,  6,  6 * durationHour  ],
      [  hour, 12, 12 * durationHour  ],
      [   day,  1,      durationDay   ],
      [   day,  2,  2 * durationDay   ],
      [  week,  1,      durationWeek  ],
      [ month,  1,      durationMonth ],
      [ month,  3,  3 * durationMonth ],
      [  year,  1,      durationYear  ]
    ];

    function tickFormat(date) {
      return (second(date) < date ? formatMillisecond
          : minute(date) < date ? formatSecond
          : hour(date) < date ? formatMinute
          : day(date) < date ? formatHour
          : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
          : year(date) < date ? formatMonth
          : formatYear)(date);
    }

    function tickInterval(interval, start, stop, step) {
      if (interval == null) interval = 10;

      // If a desired tick count is specified, pick a reasonable tick interval
      // based on the extent of the domain and a rough estimate of tick size.
      // Otherwise, assume interval is already a time interval and use it.
      if (typeof interval === "number") {
        var target = Math.abs(stop - start) / interval,
            i = d3Array.bisector(function(i) { return i[2]; }).right(tickIntervals, target);
        if (i === tickIntervals.length) {
          step = d3Array.tickStep(start / durationYear, stop / durationYear, interval);
          interval = year;
        } else if (i) {
          i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
          step = i[1];
          interval = i[0];
        } else {
          step = d3Array.tickStep(start, stop, interval);
          interval = millisecond;
        }
      }

      return step == null ? interval : interval.every(step);
    }

    scale.invert = function(y) {
      return new Date(invert(y));
    };

    scale.domain = function(_) {
      return arguments.length ? domain(map$1.call(_, number$1)) : domain().map(date);
    };

    scale.ticks = function(interval, step) {
      var d = domain(),
          t0 = d[0],
          t1 = d[d.length - 1],
          r = t1 < t0,
          t;
      if (r) t = t0, t0 = t1, t1 = t;
      t = tickInterval(interval, t0, t1, step);
      t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
      return r ? t.reverse() : t;
    };

    scale.tickFormat = function(count, specifier) {
      return specifier == null ? tickFormat : format(specifier);
    };

    scale.nice = function(interval, step) {
      var d = domain();
      return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
          ? domain(nice(d, interval))
          : scale;
    };

    scale.copy = function() {
      return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
    };

    return scale;
  }

  function time() {
    return calendar(d3Time.timeYear, d3Time.timeMonth, d3Time.timeWeek, d3Time.timeDay, d3Time.timeHour, d3Time.timeMinute, d3Time.timeSecond, d3Time.timeMillisecond, d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
  }

  function utcTime() {
    return calendar(d3Time.utcYear, d3Time.utcMonth, d3Time.utcWeek, d3Time.utcDay, d3Time.utcHour, d3Time.utcMinute, d3Time.utcSecond, d3Time.utcMillisecond, d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
  }

  function colors(s) {
    return s.match(/.{6}/g).map(function(x) {
      return "#" + x;
    });
  }

  var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

  var category20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");

  var category20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");

  var category20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");

  var cubehelix$1 = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(300, 0.5, 0.0), d3Color.cubehelix(-240, 0.5, 1.0));

  var warm = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(-100, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8));

  var cool = d3Interpolate.interpolateCubehelixLong(d3Color.cubehelix(260, 0.75, 0.35), d3Color.cubehelix(80, 1.50, 0.8));

  var rainbow = d3Color.cubehelix();

  function rainbow$1(t) {
    if (t < 0 || t > 1) t -= Math.floor(t);
    var ts = Math.abs(t - 0.5);
    rainbow.h = 360 * t - 100;
    rainbow.s = 1.5 - 1.5 * ts;
    rainbow.l = 0.8 - 0.9 * ts;
    return rainbow + "";
  }

  function ramp(range) {
    var n = range.length;
    return function(t) {
      return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
    };
  }

  var viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));

  var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

  var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

  var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

  function sequential(interpolator) {
    var x0 = 0,
        x1 = 1,
        clamp = false;

    function scale(x) {
      var t = (x - x0) / (x1 - x0);
      return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
    }

    scale.domain = function(_) {
      return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
    };

    scale.clamp = function(_) {
      return arguments.length ? (clamp = !!_, scale) : clamp;
    };

    scale.interpolator = function(_) {
      return arguments.length ? (interpolator = _, scale) : interpolator;
    };

    scale.copy = function() {
      return sequential(interpolator).domain([x0, x1]).clamp(clamp);
    };

    return linearish(scale);
  }

  exports.scaleBand = band;
  exports.scalePoint = point;
  exports.scaleIdentity = identity;
  exports.scaleLinear = linear;
  exports.scaleLog = log;
  exports.scaleOrdinal = ordinal;
  exports.scaleImplicit = implicit;
  exports.scalePow = pow;
  exports.scaleSqrt = sqrt;
  exports.scaleQuantile = quantile$1;
  exports.scaleQuantize = quantize;
  exports.scaleThreshold = threshold;
  exports.scaleTime = time;
  exports.scaleUtc = utcTime;
  exports.schemeCategory10 = category10;
  exports.schemeCategory20b = category20b;
  exports.schemeCategory20c = category20c;
  exports.schemeCategory20 = category20;
  exports.interpolateCubehelixDefault = cubehelix$1;
  exports.interpolateRainbow = rainbow$1;
  exports.interpolateWarm = warm;
  exports.interpolateCool = cool;
  exports.interpolateViridis = viridis;
  exports.interpolateMagma = magma;
  exports.interpolateInferno = inferno;
  exports.interpolatePlasma = plasma;
  exports.scaleSequential = sequential;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{"d3-array":1,"d3-collection":2,"d3-color":3,"d3-format":5,"d3-interpolate":6,"d3-time":9,"d3-time-format":8}],8:[function(require,module,exports){
// https://d3js.org/d3-time-format/ Version 2.0.2. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-time')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-time'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3));
}(this, function (exports,d3Time) { 'use strict';

  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date.setFullYear(d.y);
      return date;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }

  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date.setUTCFullYear(d.y);
      return date;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }

  function newYear(y) {
    return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
  }

  function formatLocale(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_weekdays = locale.days,
        locale_shortWeekdays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;

    var periodRe = formatRe(locale_periods),
        periodLookup = formatLookup(locale_periods),
        weekdayRe = formatRe(locale_weekdays),
        weekdayLookup = formatLookup(locale_weekdays),
        shortWeekdayRe = formatRe(locale_shortWeekdays),
        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
        monthRe = formatRe(locale_months),
        monthLookup = formatLookup(locale_months),
        shortMonthRe = formatRe(locale_shortMonths),
        shortMonthLookup = formatLookup(locale_shortMonths);

    var formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "S": formatSeconds,
      "U": formatWeekNumberSunday,
      "w": formatWeekdayNumber,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    };

    var utcFormats = {
      "a": formatUTCShortWeekday,
      "A": formatUTCWeekday,
      "b": formatUTCShortMonth,
      "B": formatUTCMonth,
      "c": null,
      "d": formatUTCDayOfMonth,
      "e": formatUTCDayOfMonth,
      "H": formatUTCHour24,
      "I": formatUTCHour12,
      "j": formatUTCDayOfYear,
      "L": formatUTCMilliseconds,
      "m": formatUTCMonthNumber,
      "M": formatUTCMinutes,
      "p": formatUTCPeriod,
      "S": formatUTCSeconds,
      "U": formatUTCWeekNumberSunday,
      "w": formatUTCWeekdayNumber,
      "W": formatUTCWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatUTCYear,
      "Y": formatUTCFullYear,
      "Z": formatUTCZone,
      "%": formatLiteralPercent
    };

    var parses = {
      "a": parseShortWeekday,
      "A": parseWeekday,
      "b": parseShortMonth,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDayOfMonth,
      "e": parseDayOfMonth,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parsePeriod,
      "S": parseSeconds,
      "U": parseWeekNumberSunday,
      "w": parseWeekdayNumber,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    };

    // These recursive directive definitions must be deferred.
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);

    function newFormat(specifier, formats) {
      return function(date) {
        var string = [],
            i = -1,
            j = 0,
            n = specifier.length,
            c,
            pad,
            format;

        if (!(date instanceof Date)) date = new Date(+date);

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
            else pad = c === "e" ? " " : "0";
            if (format = formats[c]) c = format(date, pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }

    function newParse(specifier, newDate) {
      return function(string) {
        var d = newYear(1900),
            i = parseSpecifier(d, specifier, string += "", 0);
        if (i != string.length) return null;

        // The am-pm flag is 0 for AM, and 1 for PM.
        if ("p" in d) d.H = d.H % 12 + d.p * 12;

        // Convert day-of-week and week-of-year to day-of-year.
        if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "W" in d ? 1 : 0;
          var day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
          d.m = 0;
          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
        }

        // If a time zone is specified, all fields are interpreted as UTC and then
        // offset according to the specified time zone.
        if ("Z" in d) {
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        }

        // Otherwise, all fields are in local time.
        return newDate(d);
      };
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
          n = specifier.length,
          m = string.length,
          c,
          parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);
        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }

    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }

    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }

    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }

    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }

    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }

    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }

    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }

    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }

    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }

    return {
      format: function(specifier) {
        var f = newFormat(specifier += "", formats);
        f.toString = function() { return specifier; };
        return f;
      },
      parse: function(specifier) {
        var p = newParse(specifier += "", localDate);
        p.toString = function() { return specifier; };
        return p;
      },
      utcFormat: function(specifier) {
        var f = newFormat(specifier += "", utcFormats);
        f.toString = function() { return specifier; };
        return f;
      },
      utcParse: function(specifier) {
        var p = newParse(specifier, utcDate);
        p.toString = function() { return specifier; };
        return p;
      }
    };
  }

  var pads = {"-": "", "_": " ", "0": "0"};
  var numberRe = /^\s*\d+/;
  var percentRe = /^%/;
  var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  function pad(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function formatLookup(names) {
    var map = {}, i = -1, n = names.length;
    while (++i < n) map[names[i].toLowerCase()] = i;
    return map;
  }

  function parseWeekdayNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
  }

  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }

  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }

  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
  }

  function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
  }

  function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
  }

  function formatDayOfYear(d, p) {
    return pad(1 + d3Time.timeDay.count(d3Time.timeYear(d), d), p, 3);
  }

  function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
  }

  function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
  }

  function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
  }

  function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
  }

  function formatWeekNumberSunday(d, p) {
    return pad(d3Time.timeSunday.count(d3Time.timeYear(d), d), p, 2);
  }

  function formatWeekdayNumber(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad(d3Time.timeMonday.count(d3Time.timeYear(d), d), p, 2);
  }

  function formatYear(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
  }

  function formatFullYear(d, p) {
    return pad(d.getFullYear() % 10000, p, 4);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+"))
        + pad(z / 60 | 0, "0", 2)
        + pad(z % 60, "0", 2);
  }

  function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
  }

  function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
  }

  function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
  }

  function formatUTCDayOfYear(d, p) {
    return pad(1 + d3Time.utcDay.count(d3Time.utcYear(d), d), p, 3);
  }

  function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
  }

  function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
  }

  function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
  }

  function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
  }

  function formatUTCWeekNumberSunday(d, p) {
    return pad(d3Time.utcSunday.count(d3Time.utcYear(d), d), p, 2);
  }

  function formatUTCWeekdayNumber(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad(d3Time.utcMonday.count(d3Time.utcYear(d), d), p, 2);
  }

  function formatUTCYear(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCZone() {
    return "+0000";
  }

  function formatLiteralPercent() {
    return "%";
  }

  var locale;
  defaultLocale({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });

  function defaultLocale(definition) {
    locale = formatLocale(definition);
    exports.timeFormat = locale.format;
    exports.timeParse = locale.parse;
    exports.utcFormat = locale.utcFormat;
    exports.utcParse = locale.utcParse;
    return locale;
  }

  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

  function formatIsoNative(date) {
    return date.toISOString();
  }

  var formatIso = Date.prototype.toISOString
      ? formatIsoNative
      : exports.utcFormat(isoSpecifier);

  function parseIsoNative(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  }

  var parseIso = +new Date("2000-01-01T00:00:00.000Z")
      ? parseIsoNative
      : exports.utcParse(isoSpecifier);

  exports.timeFormatDefaultLocale = defaultLocale;
  exports.timeFormatLocale = formatLocale;
  exports.isoFormat = formatIso;
  exports.isoParse = parseIso;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{"d3-time":9}],9:[function(require,module,exports){
// https://d3js.org/d3-time/ Version 1.0.2. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  var t0 = new Date;
  var t1 = new Date;
  function newInterval(floori, offseti, count, field) {

    function interval(date) {
      return floori(date = new Date(+date)), date;
    }

    interval.floor = interval;

    interval.ceil = function(date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
    };

    interval.round = function(date) {
      var d0 = interval(date),
          d1 = interval.ceil(date);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.offset = function(date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function(start, stop, step) {
      var range = [];
      start = interval.ceil(start);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
      do range.push(new Date(+start)); while (offseti(start, step), floori(start), start < stop)
      return range;
    };

    interval.filter = function(test) {
      return newInterval(function(date) {
        while (floori(date), !test(date)) date.setTime(date - 1);
      }, function(date, step) {
        while (--step >= 0) while (offseti(date, 1), !test(date));
      });
    };

    if (count) {
      interval.count = function(start, end) {
        t0.setTime(+start), t1.setTime(+end);
        floori(t0), floori(t1);
        return Math.floor(count(t0, t1));
      };

      interval.every = function(step) {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0) ? null
            : !(step > 1) ? interval
            : interval.filter(field
                ? function(d) { return field(d) % step === 0; }
                : function(d) { return interval.count(0, d) % step === 0; });
      };
    }

    return interval;
  }

  var millisecond = newInterval(function() {
    // noop
  }, function(date, step) {
    date.setTime(+date + step);
  }, function(start, end) {
    return end - start;
  });

  // An optimized implementation for this simple case.
  millisecond.every = function(k) {
    k = Math.floor(k);
    if (!isFinite(k) || !(k > 0)) return null;
    if (!(k > 1)) return millisecond;
    return newInterval(function(date) {
      date.setTime(Math.floor(date / k) * k);
    }, function(date, step) {
      date.setTime(+date + step * k);
    }, function(start, end) {
      return (end - start) / k;
    });
  };

  var milliseconds = millisecond.range;

  var durationSecond = 1e3;
  var durationMinute = 6e4;
  var durationHour = 36e5;
  var durationDay = 864e5;
  var durationWeek = 6048e5;

  var second = newInterval(function(date) {
    date.setTime(Math.floor(date / durationSecond) * durationSecond);
  }, function(date, step) {
    date.setTime(+date + step * durationSecond);
  }, function(start, end) {
    return (end - start) / durationSecond;
  }, function(date) {
    return date.getUTCSeconds();
  });

  var seconds = second.range;

  var minute = newInterval(function(date) {
    date.setTime(Math.floor(date / durationMinute) * durationMinute);
  }, function(date, step) {
    date.setTime(+date + step * durationMinute);
  }, function(start, end) {
    return (end - start) / durationMinute;
  }, function(date) {
    return date.getMinutes();
  });

  var minutes = minute.range;

  var hour = newInterval(function(date) {
    var offset = date.getTimezoneOffset() * durationMinute % durationHour;
    if (offset < 0) offset += durationHour;
    date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
  }, function(date, step) {
    date.setTime(+date + step * durationHour);
  }, function(start, end) {
    return (end - start) / durationHour;
  }, function(date) {
    return date.getHours();
  });

  var hours = hour.range;

  var day = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
  }, function(date) {
    return date.getDate() - 1;
  });

  var days = day.range;

  function weekday(i) {
    return newInterval(function(date) {
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
      date.setHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setDate(date.getDate() + step * 7);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
    });
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);

  var sundays = sunday.range;
  var mondays = monday.range;
  var tuesdays = tuesday.range;
  var wednesdays = wednesday.range;
  var thursdays = thursday.range;
  var fridays = friday.range;
  var saturdays = saturday.range;

  var month = newInterval(function(date) {
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setMonth(date.getMonth() + step);
  }, function(start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  }, function(date) {
    return date.getMonth();
  });

  var months = month.range;

  var year = newInterval(function(date) {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  }, function(date) {
    return date.getFullYear();
  });

  // An optimized implementation for this simple case.
  year.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
      date.setFullYear(Math.floor(date.getFullYear() / k) * k);
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setFullYear(date.getFullYear() + step * k);
    });
  };

  var years = year.range;

  var utcMinute = newInterval(function(date) {
    date.setUTCSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * durationMinute);
  }, function(start, end) {
    return (end - start) / durationMinute;
  }, function(date) {
    return date.getUTCMinutes();
  });

  var utcMinutes = utcMinute.range;

  var utcHour = newInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * durationHour);
  }, function(start, end) {
    return (end - start) / durationHour;
  }, function(date) {
    return date.getUTCHours();
  });

  var utcHours = utcHour.range;

  var utcDay = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function(start, end) {
    return (end - start) / durationDay;
  }, function(date) {
    return date.getUTCDate() - 1;
  });

  var utcDays = utcDay.range;

  function utcWeekday(i) {
    return newInterval(function(date) {
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
      date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, function(start, end) {
      return (end - start) / durationWeek;
    });
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);

  var utcSundays = utcSunday.range;
  var utcMondays = utcMonday.range;
  var utcTuesdays = utcTuesday.range;
  var utcWednesdays = utcWednesday.range;
  var utcThursdays = utcThursday.range;
  var utcFridays = utcFriday.range;
  var utcSaturdays = utcSaturday.range;

  var utcMonth = newInterval(function(date) {
    date.setUTCDate(1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
  }, function(start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  }, function(date) {
    return date.getUTCMonth();
  });

  var utcMonths = utcMonth.range;

  var utcYear = newInterval(function(date) {
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  }, function(date) {
    return date.getUTCFullYear();
  });

  // An optimized implementation for this simple case.
  utcYear.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
      date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setUTCFullYear(date.getUTCFullYear() + step * k);
    });
  };

  var utcYears = utcYear.range;

  exports.timeInterval = newInterval;
  exports.timeMillisecond = millisecond;
  exports.timeMilliseconds = milliseconds;
  exports.utcMillisecond = millisecond;
  exports.utcMilliseconds = milliseconds;
  exports.timeSecond = second;
  exports.timeSeconds = seconds;
  exports.utcSecond = second;
  exports.utcSeconds = seconds;
  exports.timeMinute = minute;
  exports.timeMinutes = minutes;
  exports.timeHour = hour;
  exports.timeHours = hours;
  exports.timeDay = day;
  exports.timeDays = days;
  exports.timeWeek = sunday;
  exports.timeWeeks = sundays;
  exports.timeSunday = sunday;
  exports.timeSundays = sundays;
  exports.timeMonday = monday;
  exports.timeMondays = mondays;
  exports.timeTuesday = tuesday;
  exports.timeTuesdays = tuesdays;
  exports.timeWednesday = wednesday;
  exports.timeWednesdays = wednesdays;
  exports.timeThursday = thursday;
  exports.timeThursdays = thursdays;
  exports.timeFriday = friday;
  exports.timeFridays = fridays;
  exports.timeSaturday = saturday;
  exports.timeSaturdays = saturdays;
  exports.timeMonth = month;
  exports.timeMonths = months;
  exports.timeYear = year;
  exports.timeYears = years;
  exports.utcMinute = utcMinute;
  exports.utcMinutes = utcMinutes;
  exports.utcHour = utcHour;
  exports.utcHours = utcHours;
  exports.utcDay = utcDay;
  exports.utcDays = utcDays;
  exports.utcWeek = utcSunday;
  exports.utcWeeks = utcSundays;
  exports.utcSunday = utcSunday;
  exports.utcSundays = utcSundays;
  exports.utcMonday = utcMonday;
  exports.utcMondays = utcMondays;
  exports.utcTuesday = utcTuesday;
  exports.utcTuesdays = utcTuesdays;
  exports.utcWednesday = utcWednesday;
  exports.utcWednesdays = utcWednesdays;
  exports.utcThursday = utcThursday;
  exports.utcThursdays = utcThursdays;
  exports.utcFriday = utcFriday;
  exports.utcFridays = utcFridays;
  exports.utcSaturday = utcSaturday;
  exports.utcSaturdays = utcSaturdays;
  exports.utcMonth = utcMonth;
  exports.utcMonths = utcMonths;
  exports.utcYear = utcYear;
  exports.utcYears = utcYears;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = color;

var _legend = require('./legend');

var _legend2 = _interopRequireDefault(_legend);

var _d3Dispatch = require('d3-dispatch');

var _d3Scale = require('d3-scale');

var _d3Format = require('d3-format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function color() {

  var scale = (0, _d3Scale.scaleLinear)(),
      shape = "rect",
      shapeWidth = 15,
      shapeHeight = 15,
      shapeRadius = 10,
      shapePadding = 2,
      cells = [5],
      labels = [],
      classPrefix = "",
      useClass = false,
      title = "",
      labelFormat = (0, _d3Format.format)(".01f"),
      labelOffset = 10,
      labelAlign = "middle",
      labelDelimiter = "to",
      orient = "vertical",
      ascending = false,
      path,
      legendDispatcher = (0, _d3Dispatch.dispatch)("cellover", "cellout", "cellclick");

  function legend(svg) {

    var type = _legend2.default.d3_calcType(scale, ascending, cells, labels, labelFormat, labelDelimiter),
        legendG = svg.selectAll('g').data([scale]);

    legendG.enter().append('g').attr('class', classPrefix + 'legendCells');

    var cell = svg.select('.' + classPrefix + 'legendCells').selectAll("." + classPrefix + "cell").data(type.data),
        cellEnter = cell.enter().append("g").attr("class", classPrefix + "cell"),
        //.merge(cell).style("opacity", 1e-6),
    shapeEnter = cellEnter.append(shape).attr("class", classPrefix + "swatch"),
        shapes = svg.selectAll("g." + classPrefix + "cell " + shape);

    //add event handlers
    _legend2.default.d3_addEvents(cellEnter, legendDispatcher);

    cell.exit().transition().style("opacity", 0).remove();

    _legend2.default.d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, path);

    _legend2.default.d3_addText(svg, cellEnter, type.labels, classPrefix);

    // we need to merge the selection, otherwise changes in the legend (e.g. change of orientation) are applied only to the new cells and not the existing ones.
    cell = cellEnter.merge(cell);

    // sets placement
    var text = cell.selectAll("text"),
        shapeSize = shapes.nodes().map(function (d) {
      return d.getBBox();
    });

    //sets scale
    //everything is fill except for line which is stroke,
    if (!useClass) {
      if (shape == "line") {
        shapes.style("stroke", type.feature);
      } else {
        shapes.style("fill", type.feature);
      }
    } else {
      shapes.attr("class", function (d) {
        return classPrefix + "swatch " + type.feature(d);
      });
    }

    var cellTrans,
        textTrans,
        textAlign = labelAlign == "start" ? 0 : labelAlign == "middle" ? 0.5 : 1;

    //positions cells and text
    if (orient === "vertical") {
      cellTrans = function cellTrans(d, i) {
        return "translate(0, " + i * (shapeSize[i].height + shapePadding) + ")";
      };
      textTrans = function textTrans(d, i) {
        return "translate(" + (shapeSize[i].width + shapeSize[i].x + labelOffset) + "," + (shapeSize[i].y + shapeSize[i].height / 2 + 5) + ")";
      };
    } else if (orient === "horizontal") {
      cellTrans = function cellTrans(d, i) {
        return "translate(" + i * (shapeSize[i].width + shapePadding) + ",0)";
      };
      textTrans = function textTrans(d, i) {
        return "translate(" + (shapeSize[i].width * textAlign + shapeSize[i].x) + "," + (shapeSize[i].height + shapeSize[i].y + labelOffset + 8) + ")";
      };
    }

    _legend2.default.d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign);
    _legend2.default.d3_title(svg, title, classPrefix);

    cell.transition().style("opacity", 1);
  }

  legend.scale = function (_) {
    if (!arguments.length) return scale;
    scale = _;
    return legend;
  };

  legend.cells = function (_) {
    if (!arguments.length) return cells;
    if (_.length > 1 || _ >= 2) {
      cells = _;
    }
    return legend;
  };

  legend.shape = function (_, d) {
    if (!arguments.length) return shape;
    if (_ == "rect" || _ == "circle" || _ == "line" || _ == "path" && typeof d === 'string') {
      shape = _;
      path = d;
    }
    return legend;
  };

  legend.shapeWidth = function (_) {
    if (!arguments.length) return shapeWidth;
    shapeWidth = +_;
    return legend;
  };

  legend.shapeHeight = function (_) {
    if (!arguments.length) return shapeHeight;
    shapeHeight = +_;
    return legend;
  };

  legend.shapeRadius = function (_) {
    if (!arguments.length) return shapeRadius;
    shapeRadius = +_;
    return legend;
  };

  legend.shapePadding = function (_) {
    if (!arguments.length) return shapePadding;
    shapePadding = +_;
    return legend;
  };

  legend.labels = function (_) {
    if (!arguments.length) return labels;
    labels = _;
    return legend;
  };

  legend.labelAlign = function (_) {
    if (!arguments.length) return labelAlign;
    if (_ == "start" || _ == "end" || _ == "middle") {
      labelAlign = _;
    }
    return legend;
  };

  legend.labelFormat = function (_) {
    if (!arguments.length) return labelFormat;
    labelFormat = typeof _ === 'string' ? (0, _d3Format.format)(_) : _;
    return legend;
  };

  legend.labelOffset = function (_) {
    if (!arguments.length) return labelOffset;
    labelOffset = +_;
    return legend;
  };

  legend.labelDelimiter = function (_) {
    if (!arguments.length) return labelDelimiter;
    labelDelimiter = _;
    return legend;
  };

  legend.useClass = function (_) {
    if (!arguments.length) return useClass;
    if (_ === true || _ === false) {
      useClass = _;
    }
    return legend;
  };

  legend.orient = function (_) {
    if (!arguments.length) return orient;
    _ = _.toLowerCase();
    if (_ == "horizontal" || _ == "vertical") {
      orient = _;
    }
    return legend;
  };

  legend.ascending = function (_) {
    if (!arguments.length) return ascending;
    ascending = !!_;
    return legend;
  };

  legend.classPrefix = function (_) {
    if (!arguments.length) return classPrefix;
    classPrefix = _;
    return legend;
  };

  legend.title = function (_) {
    if (!arguments.length) return title;
    title = _;
    return legend;
  };

  legend.on = function () {
    var value = legendDispatcher.on.apply(legendDispatcher, arguments);
    return value === legendDispatcher ? legend : value;
  };

  return legend;
};

},{"./legend":12,"d3-dispatch":4,"d3-format":5,"d3-scale":7}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var thresholdLabels = exports.thresholdLabels = function thresholdLabels(_ref) {
  var i = _ref.i;
  var genLength = _ref.genLength;
  var generatedLabels = _ref.generatedLabels;


  if (i === 0) {
    return generatedLabels[i].replace('NaN to', 'Less than');
  } else if (i === genLength - 1) {
    return 'More than ' + generatedLabels[genLength - 1].replace(' to NaN', '');
  }
  return generatedLabels[i];
};

exports.default = {
  thresholdLabels: thresholdLabels
};

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = {

  d3_identity: function d3_identity(d) {
    return d;
  },

  d3_mergeLabels: function d3_mergeLabels() {
    var gen = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var labels = arguments[1];
    var domain = arguments[2];
    var range = arguments[3];


    if ((typeof labels === "undefined" ? "undefined" : _typeof(labels)) === "object") {
      if (labels.length === 0) return gen;

      var i = labels.length;
      for (; i < gen.length; i++) {
        labels.push(gen[i]);
      }
      return labels;
    } else if (typeof labels === "function") {
      var customLabels = [];
      var genLength = gen.length;
      for (var _i = 0; _i < genLength; _i++) {
        customLabels.push(labels({
          i: _i,
          genLength: genLength,
          generatedLabels: gen,
          domain: domain,
          range: range }));
      }
      return customLabels;
    }

    return gen;
  },

  d3_linearLegend: function d3_linearLegend(scale, cells, labelFormat) {
    var data = [];

    if (cells.length > 1) {
      data = cells;
    } else {
      var domain = scale.domain(),
          increment = (domain[domain.length - 1] - domain[0]) / (cells - 1),
          i = 0;

      for (; i < cells; i++) {
        data.push(domain[0] + i * increment);
      }
    }

    var labels = data.map(labelFormat);

    return { data: data,
      labels: labels,
      feature: function feature(d) {
        return scale(d);
      } };
  },

  d3_quantLegend: function d3_quantLegend(scale, labelFormat, labelDelimiter) {
    var labels = scale.range().map(function (d) {
      var invert = scale.invertExtent(d);

      return labelFormat(invert[0]) + " " + labelDelimiter + " " + labelFormat(invert[1]);
    });

    return { data: scale.range(),
      labels: labels,
      feature: this.d3_identity
    };
  },

  d3_ordinalLegend: function d3_ordinalLegend(scale) {
    return { data: scale.domain(),
      labels: scale.domain(),
      feature: function feature(d) {
        return scale(d);
      } };
  },

  d3_drawShapes: function d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, path) {
    if (shape === "rect") {
      shapes.attr("height", shapeHeight).attr("width", shapeWidth);
    } else if (shape === "circle") {
      shapes.attr("r", shapeRadius); //.attr("cx", shapeRadius).attr("cy", shapeRadius);
    } else if (shape === "line") {
      shapes.attr("x1", 0).attr("x2", shapeWidth).attr("y1", 0).attr("y2", 0);
    } else if (shape === "path") {
      shapes.attr("d", path);
    }
  },

  d3_addText: function d3_addText(svg, enter, labels, classPrefix) {
    enter.append("text").attr("class", classPrefix + "label");
    svg.selectAll("g." + classPrefix + "cell text").data(labels).text(this.d3_identity);
  },

  d3_calcType: function d3_calcType(scale, ascending, cells, labels, labelFormat, labelDelimiter) {
    var type = scale.invertExtent ? this.d3_quantLegend(scale, labelFormat, labelDelimiter) : scale.ticks ? this.d3_linearLegend(scale, cells, labelFormat) : this.d3_ordinalLegend(scale);

    type.labels = this.d3_mergeLabels(type.labels, labels, scale.domain(), scale.range());

    if (ascending) {
      type.labels = this.d3_reverse(type.labels);
      type.data = this.d3_reverse(type.data);
    }

    return type;
  },

  d3_reverse: function d3_reverse(arr) {
    var mirror = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      mirror[i] = arr[l - i - 1];
    }
    return mirror;
  },

  d3_placement: function d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign) {
    cell.attr("transform", cellTrans);
    text.attr("transform", textTrans);
    if (orient === "horizontal") {
      text.style("text-anchor", labelAlign);
    }
  },

  d3_addEvents: function d3_addEvents(cells, dispatcher) {
    var _ = this;

    cells.on("mouseover.legend", function (d) {
      _.d3_cellOver(dispatcher, d, this);
    }).on("mouseout.legend", function (d) {
      _.d3_cellOut(dispatcher, d, this);
    }).on("click.legend", function (d) {
      _.d3_cellClick(dispatcher, d, this);
    });
  },

  d3_cellOver: function d3_cellOver(cellDispatcher, d, obj) {
    cellDispatcher.call("cellover", obj, d);
  },

  d3_cellOut: function d3_cellOut(cellDispatcher, d, obj) {
    cellDispatcher.call("cellout", obj, d);
  },

  d3_cellClick: function d3_cellClick(cellDispatcher, d, obj) {
    cellDispatcher.call("cellclick", obj, d);
  },

  d3_title: function d3_title(svg, title, classPrefix) {
    if (title !== "") {

      var titleText = svg.selectAll('text.' + classPrefix + 'legendTitle');

      titleText.data([title]).enter().append('text').attr('class', classPrefix + 'legendTitle');

      svg.selectAll('text.' + classPrefix + 'legendTitle').text(title);

      var cellsSvg = svg.select('.' + classPrefix + 'legendCells');

      var yOffset = svg.select('.' + classPrefix + 'legendTitle').nodes().map(function (d) {
        return d.getBBox().height;
      })[0],
          xOffset = -cellsSvg.nodes().map(function (d) {
        return d.getBBox().x;
      })[0];

      cellsSvg.attr('transform', 'translate(' + xOffset + ',' + (yOffset + 10) + ')');
    }
  }
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = size;

var _legend = require('./legend');

var _legend2 = _interopRequireDefault(_legend);

var _d3Dispatch = require('d3-dispatch');

var _d3Scale = require('d3-scale');

var _d3Format = require('d3-format');

var _d3Array = require('d3-array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function size() {

  var scale = (0, _d3Scale.scaleLinear)(),
      shape = "rect",
      shapeWidth = 15,
      shapePadding = 2,
      cells = [5],
      labels = [],
      useStroke = false,
      classPrefix = "",
      title = "",
      labelFormat = (0, _d3Format.format)(".01f"),
      labelOffset = 10,
      labelAlign = "middle",
      labelDelimiter = "to",
      orient = "vertical",
      ascending = false,
      path,
      legendDispatcher = (0, _d3Dispatch.dispatch)("cellover", "cellout", "cellclick");

  function legend(svg) {

    var type = _legend2.default.d3_calcType(scale, ascending, cells, labels, labelFormat, labelDelimiter),
        legendG = svg.selectAll('g').data([scale]);

    legendG.enter().append('g').attr('class', classPrefix + 'legendCells');

    var cell = svg.select('.' + classPrefix + 'legendCells').selectAll("." + classPrefix + "cell").data(type.data),
        cellEnter = cell.enter().append("g").attr("class", classPrefix + "cell"),
        //.merge(cell).style("opacity", 1e-6),
    shapeEnter = cellEnter.append(shape).attr("class", classPrefix + "swatch"),
        shapes = svg.selectAll("g." + classPrefix + "cell " + shape);

    //add event handlers
    _legend2.default.d3_addEvents(cellEnter, legendDispatcher);

    cell.exit().transition().style("opacity", 0).remove();

    //creates shape
    if (shape === "line") {
      _legend2.default.d3_drawShapes(shape, shapes, 0, shapeWidth);
      shapes.attr("stroke-width", type.feature);
    } else {
      _legend2.default.d3_drawShapes(shape, shapes, type.feature, type.feature, type.feature, path);
    }

    _legend2.default.d3_addText(svg, cellEnter, type.labels, classPrefix);

    // we need to merge the selection, otherwise changes in the legend (e.g. change of orientation) are applied only to the new cells and not the existing ones.
    cell = cellEnter.merge(cell);

    //sets placement
    var text = cell.selectAll("text"),
        shapeSize = shapes.nodes().map(function (d, i) {
      var bbox = d.getBBox();
      var stroke = scale(type.data[i]);

      if (shape === "line" && orient === "horizontal") {
        bbox.height = bbox.height + stroke;
      } else if (shape === "line" && orient === "vertical") {
        bbox.width = bbox.width;
      }

      return bbox;
    });

    var maxH = (0, _d3Array.max)(shapeSize, function (d) {
      return d.height + d.y;
    }),
        maxW = (0, _d3Array.max)(shapeSize, function (d) {
      return d.width + d.x;
    });

    var cellTrans,
        textTrans,
        textAlign = labelAlign == "start" ? 0 : labelAlign == "middle" ? 0.5 : 1;

    //positions cells and text
    if (orient === "vertical") {

      cellTrans = function cellTrans(d, i) {
        var height = (0, _d3Array.sum)(shapeSize.slice(0, i + 1), function (d) {
          return d.height;
        });
        return "translate(0, " + (height + i * shapePadding) + ")";
      };

      textTrans = function textTrans(d, i) {
        return "translate(" + (maxW + labelOffset) + "," + (shapeSize[i].y + shapeSize[i].height / 2 + 5) + ")";
      };
    } else if (orient === "horizontal") {
      cellTrans = function cellTrans(d, i) {
        var width = (0, _d3Array.sum)(shapeSize.slice(0, i + 1), function (d) {
          return d.width;
        });
        return "translate(" + (width + i * shapePadding) + ",0)";
      };

      textTrans = function textTrans(d, i) {
        return "translate(" + (shapeSize[i].width * textAlign + shapeSize[i].x) + "," + (maxH + labelOffset) + ")";
      };
    }

    _legend2.default.d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign);
    _legend2.default.d3_title(svg, title, classPrefix);

    cell.transition().style("opacity", 1);
  }

  legend.scale = function (_) {
    if (!arguments.length) return scale;
    scale = _;
    return legend;
  };

  legend.cells = function (_) {
    if (!arguments.length) return cells;
    if (_.length > 1 || _ >= 2) {
      cells = _;
    }
    return legend;
  };

  legend.shape = function (_, d) {
    if (!arguments.length) return shape;
    if (_ == "rect" || _ == "circle" || _ == "line") {
      shape = _;
      path = d;
    }
    return legend;
  };

  legend.shapeWidth = function (_) {
    if (!arguments.length) return shapeWidth;
    shapeWidth = +_;
    return legend;
  };

  legend.shapePadding = function (_) {
    if (!arguments.length) return shapePadding;
    shapePadding = +_;
    return legend;
  };

  legend.labels = function (_) {
    if (!arguments.length) return labels;
    labels = _;
    return legend;
  };

  legend.labelAlign = function (_) {
    if (!arguments.length) return labelAlign;
    if (_ == "start" || _ == "end" || _ == "middle") {
      labelAlign = _;
    }
    return legend;
  };

  legend.labelFormat = function (_) {
    if (!arguments.length) return labelFormat;
    labelFormat = typeof _ === 'string' ? (0, _d3Format.format)(_) : _;
    return legend;
  };

  legend.labelOffset = function (_) {
    if (!arguments.length) return labelOffset;
    labelOffset = +_;
    return legend;
  };

  legend.labelDelimiter = function (_) {
    if (!arguments.length) return labelDelimiter;
    labelDelimiter = _;
    return legend;
  };

  legend.orient = function (_) {
    if (!arguments.length) return orient;
    _ = _.toLowerCase();
    if (_ == "horizontal" || _ == "vertical") {
      orient = _;
    }
    return legend;
  };

  legend.ascending = function (_) {
    if (!arguments.length) return ascending;
    ascending = !!_;
    return legend;
  };

  legend.classPrefix = function (_) {
    if (!arguments.length) return classPrefix;
    classPrefix = _;
    return legend;
  };

  legend.title = function (_) {
    if (!arguments.length) return title;
    title = _;
    return legend;
  };

  legend.on = function () {
    var value = legendDispatcher.on.apply(legendDispatcher, arguments);
    return value === legendDispatcher ? legend : value;
  };

  return legend;
};

},{"./legend":12,"d3-array":1,"d3-dispatch":4,"d3-format":5,"d3-scale":7}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbol;

var _legend = require('./legend');

var _legend2 = _interopRequireDefault(_legend);

var _d3Dispatch = require('d3-dispatch');

var _d3Scale = require('d3-scale');

var _d3Format = require('d3-format');

var _d3Array = require('d3-array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function symbol() {

  var scale = (0, _d3Scale.scaleLinear)(),
      shape = "path",
      shapeWidth = 15,
      shapeHeight = 15,
      shapeRadius = 10,
      shapePadding = 5,
      cells = [5],
      labels = [],
      classPrefix = "",
      useClass = false,
      title = "",
      labelFormat = (0, _d3Format.format)(".01f"),
      labelAlign = "middle",
      labelOffset = 10,
      labelDelimiter = "to",
      orient = "vertical",
      ascending = false,
      legendDispatcher = (0, _d3Dispatch.dispatch)("cellover", "cellout", "cellclick");

  function legend(svg) {

    var type = _legend2.default.d3_calcType(scale, ascending, cells, labels, labelFormat, labelDelimiter),
        legendG = svg.selectAll('g').data([scale]);

    legendG.enter().append('g').attr('class', classPrefix + 'legendCells');

    var cell = svg.select('.' + classPrefix + 'legendCells').selectAll("." + classPrefix + "cell").data(type.data),
        cellEnter = cell.enter().append("g").attr("class", classPrefix + "cell"),
        //.style("opacity", 1e-6),
    shapeEnter = cellEnter.append(shape).attr("class", classPrefix + "swatch"),
        shapes = svg.selectAll("g." + classPrefix + "cell " + shape);

    //add event handlers
    _legend2.default.d3_addEvents(cellEnter, legendDispatcher);

    //remove old shapes
    cell.exit().transition().style("opacity", 0).remove();

    _legend2.default.d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, type.feature);
    _legend2.default.d3_addText(svg, cellEnter, type.labels, classPrefix);

    // we need to merge the selection, otherwise changes in the legend (e.g. change of orientation) are applied only to the new cells and not the existing ones.
    cell = cellEnter.merge(cell);

    // sets placement
    var text = cell.selectAll("text"),
        shapeSize = shapes.nodes().map(function (d) {
      return d.getBBox();
    });

    var maxH = (0, _d3Array.max)(shapeSize, function (d) {
      return d.height;
    }),
        maxW = (0, _d3Array.max)(shapeSize, function (d) {
      return d.width;
    });

    var cellTrans,
        textTrans,
        textAlign = labelAlign == "start" ? 0 : labelAlign == "middle" ? 0.5 : 1;

    //positions cells and text
    if (orient === "vertical") {
      cellTrans = function cellTrans(d, i) {
        return "translate(0, " + i * (maxH + shapePadding) + ")";
      };
      textTrans = function textTrans(d, i) {
        return "translate(" + (maxW + labelOffset) + "," + (shapeSize[i].y + shapeSize[i].height / 2 + 5) + ")";
      };
    } else if (orient === "horizontal") {
      cellTrans = function cellTrans(d, i) {
        return "translate(" + i * (maxW + shapePadding) + ",0)";
      };
      textTrans = function textTrans(d, i) {
        return "translate(" + (shapeSize[i].width * textAlign + shapeSize[i].x) + "," + (maxH + labelOffset) + ")";
      };
    }

    _legend2.default.d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign);
    _legend2.default.d3_title(svg, title, classPrefix);
    cell.transition().style("opacity", 1);
  }

  legend.scale = function (_) {
    if (!arguments.length) return scale;
    scale = _;
    return legend;
  };

  legend.cells = function (_) {
    if (!arguments.length) return cells;
    if (_.length > 1 || _ >= 2) {
      cells = _;
    }
    return legend;
  };

  legend.shapePadding = function (_) {
    if (!arguments.length) return shapePadding;
    shapePadding = +_;
    return legend;
  };

  legend.labels = function (_) {
    if (!arguments.length) return labels;
    labels = _;
    return legend;
  };

  legend.labelAlign = function (_) {
    if (!arguments.length) return labelAlign;
    if (_ == "start" || _ == "end" || _ == "middle") {
      labelAlign = _;
    }
    return legend;
  };

  legend.labelFormat = function (_) {
    if (!arguments.length) return labelFormat;
    labelFormat = typeof _ === 'string' ? (0, _d3Format.format)(_) : _;
    return legend;
  };

  legend.labelOffset = function (_) {
    if (!arguments.length) return labelOffset;
    labelOffset = +_;
    return legend;
  };

  legend.labelDelimiter = function (_) {
    if (!arguments.length) return labelDelimiter;
    labelDelimiter = _;
    return legend;
  };

  legend.orient = function (_) {
    if (!arguments.length) return orient;
    _ = _.toLowerCase();
    if (_ == "horizontal" || _ == "vertical") {
      orient = _;
    }
    return legend;
  };

  legend.ascending = function (_) {
    if (!arguments.length) return ascending;
    ascending = !!_;
    return legend;
  };

  legend.classPrefix = function (_) {
    if (!arguments.length) return classPrefix;
    classPrefix = _;
    return legend;
  };

  legend.title = function (_) {
    if (!arguments.length) return title;
    title = _;
    return legend;
  };

  legend.on = function () {
    var value = legendDispatcher.on.apply(legendDispatcher, arguments);
    return value === legendDispatcher ? legend : value;
  };

  return legend;
};

},{"./legend":12,"d3-array":1,"d3-dispatch":4,"d3-format":5,"d3-scale":7}],15:[function(require,module,exports){
'use strict';

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

var _symbol = require('./symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

d3.legendColor = _color2.default;
d3.legendSize = _size2.default;
d3.legendSymbol = _symbol2.default;
d3.legendHelpers = _helpers2.default;

},{"./color":10,"./helpers":11,"./size":13,"./symbol":14}]},{},[15])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZDMtYXJyYXkvYnVpbGQvZDMtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvZDMtY29sbGVjdGlvbi9idWlsZC9kMy1jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2QzLWNvbG9yL2J1aWxkL2QzLWNvbG9yLmpzIiwibm9kZV9tb2R1bGVzL2QzLWRpc3BhdGNoL2J1aWxkL2QzLWRpc3BhdGNoLmpzIiwibm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9idWlsZC9kMy1mb3JtYXQuanMiLCJub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvYnVpbGQvZDMtaW50ZXJwb2xhdGUuanMiLCJub2RlX21vZHVsZXMvZDMtc2NhbGUvYnVpbGQvZDMtc2NhbGUuanMiLCJub2RlX21vZHVsZXMvZDMtdGltZS1mb3JtYXQvYnVpbGQvZDMtdGltZS1mb3JtYXQuanMiLCJub2RlX21vZHVsZXMvZDMtdGltZS9idWlsZC9kMy10aW1lLmpzIiwic3JjL2NvbG9yLmpzIiwic3JjL2hlbHBlcnMuanMiLCJzcmMvbGVnZW5kLmpzIiwic3JjL3NpemUuanMiLCJzcmMvc3ltYm9sLmpzIiwic3JjL3dlYi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL2NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3I0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztrQkNuWHdCLEs7O0FBTHhCOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFZSxTQUFTLEtBQVQsR0FBZ0I7O0FBRTdCLE1BQUksUUFBUSwyQkFBWjtBQUFBLE1BQ0UsUUFBUSxNQURWO0FBQUEsTUFFRSxhQUFhLEVBRmY7QUFBQSxNQUdFLGNBQWMsRUFIaEI7QUFBQSxNQUlFLGNBQWMsRUFKaEI7QUFBQSxNQUtFLGVBQWUsQ0FMakI7QUFBQSxNQU1FLFFBQVEsQ0FBQyxDQUFELENBTlY7QUFBQSxNQU9FLFNBQVMsRUFQWDtBQUFBLE1BUUUsY0FBYyxFQVJoQjtBQUFBLE1BU0UsV0FBVyxLQVRiO0FBQUEsTUFVRSxRQUFRLEVBVlY7QUFBQSxNQVdFLGNBQWMsc0JBQU8sTUFBUCxDQVhoQjtBQUFBLE1BWUUsY0FBYyxFQVpoQjtBQUFBLE1BYUUsYUFBYSxRQWJmO0FBQUEsTUFjRSxpQkFBaUIsSUFkbkI7QUFBQSxNQWVFLFNBQVMsVUFmWDtBQUFBLE1BZ0JFLFlBQVksS0FoQmQ7QUFBQSxNQWlCRSxJQWpCRjtBQUFBLE1Ba0JFLG1CQUFtQiwwQkFBUyxVQUFULEVBQXFCLFNBQXJCLEVBQWdDLFdBQWhDLENBbEJyQjs7QUFvQkUsV0FBUyxNQUFULENBQWdCLEdBQWhCLEVBQW9COztBQUVsQixRQUFJLE9BQU8saUJBQU8sV0FBUCxDQUFtQixLQUFuQixFQUEwQixTQUExQixFQUFxQyxLQUFyQyxFQUE0QyxNQUE1QyxFQUFvRCxXQUFwRCxFQUFpRSxjQUFqRSxDQUFYO0FBQUEsUUFDRSxVQUFVLElBQUksU0FBSixDQUFjLEdBQWQsRUFBbUIsSUFBbkIsQ0FBd0IsQ0FBQyxLQUFELENBQXhCLENBRFo7O0FBR0EsWUFBUSxLQUFSLEdBQWdCLE1BQWhCLENBQXVCLEdBQXZCLEVBQTRCLElBQTVCLENBQWlDLE9BQWpDLEVBQTBDLGNBQWMsYUFBeEQ7O0FBRUEsUUFBSSxPQUFPLElBQUksTUFBSixDQUFXLE1BQU0sV0FBTixHQUFvQixhQUEvQixFQUNOLFNBRE0sQ0FDSSxNQUFNLFdBQU4sR0FBb0IsTUFEeEIsRUFDZ0MsSUFEaEMsQ0FDcUMsS0FBSyxJQUQxQyxDQUFYO0FBQUEsUUFFRSxZQUFZLEtBQUssS0FBTCxHQUFhLE1BQWIsQ0FBb0IsR0FBcEIsRUFDVCxJQURTLENBQ0osT0FESSxFQUNLLGNBQWMsTUFEbkIsQ0FGZDtBQUFBLFFBR3lDO0FBQ3ZDLGlCQUFhLFVBQVUsTUFBVixDQUFpQixLQUFqQixFQUF3QixJQUF4QixDQUE2QixPQUE3QixFQUFzQyxjQUFjLFFBQXBELENBSmY7QUFBQSxRQUtFLFNBQVMsSUFBSSxTQUFKLENBQWMsT0FBTyxXQUFQLEdBQXFCLE9BQXJCLEdBQStCLEtBQTdDLENBTFg7O0FBT0E7QUFDQSxxQkFBTyxZQUFQLENBQW9CLFNBQXBCLEVBQStCLGdCQUEvQjs7QUFFQSxTQUFLLElBQUwsR0FBWSxVQUFaLEdBQXlCLEtBQXpCLENBQStCLFNBQS9CLEVBQTBDLENBQTFDLEVBQTZDLE1BQTdDOztBQUVBLHFCQUFPLGFBQVAsQ0FBcUIsS0FBckIsRUFBNEIsTUFBNUIsRUFBb0MsV0FBcEMsRUFBaUQsVUFBakQsRUFBNkQsV0FBN0QsRUFBMEUsSUFBMUU7O0FBR0EscUJBQU8sVUFBUCxDQUFtQixHQUFuQixFQUF3QixTQUF4QixFQUFtQyxLQUFLLE1BQXhDLEVBQWdELFdBQWhEOztBQUVBO0FBQ0EsV0FBTyxVQUFVLEtBQVYsQ0FBZ0IsSUFBaEIsQ0FBUDs7QUFFQTtBQUNBLFFBQUksT0FBTyxLQUFLLFNBQUwsQ0FBZSxNQUFmLENBQVg7QUFBQSxRQUNFLFlBQVksT0FBTyxLQUFQLEdBQWUsR0FBZixDQUFvQixVQUFTLENBQVQsRUFBVztBQUFFLGFBQU8sRUFBRSxPQUFGLEVBQVA7QUFBcUIsS0FBdEQsQ0FEZDs7QUFHQTtBQUNBO0FBQ0EsUUFBSSxDQUFDLFFBQUwsRUFBYztBQUNaLFVBQUksU0FBUyxNQUFiLEVBQW9CO0FBQ2xCLGVBQU8sS0FBUCxDQUFhLFFBQWIsRUFBdUIsS0FBSyxPQUE1QjtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sS0FBUCxDQUFhLE1BQWIsRUFBcUIsS0FBSyxPQUExQjtBQUNEO0FBQ0YsS0FORCxNQU1PO0FBQ0wsYUFBTyxJQUFQLENBQVksT0FBWixFQUFxQixVQUFTLENBQVQsRUFBVztBQUFFLGVBQU8sY0FBYyxTQUFkLEdBQTBCLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBakM7QUFBbUQsT0FBckY7QUFDRDs7QUFFRCxRQUFJLFNBQUo7QUFBQSxRQUNBLFNBREE7QUFBQSxRQUVBLFlBQWEsY0FBYyxPQUFmLEdBQTBCLENBQTFCLEdBQStCLGNBQWMsUUFBZixHQUEyQixHQUEzQixHQUFpQyxDQUYzRTs7QUFJQTtBQUNBLFFBQUksV0FBVyxVQUFmLEVBQTBCO0FBQ3hCLGtCQUFZLG1CQUFTLENBQVQsRUFBVyxDQUFYLEVBQWM7QUFBRSxlQUFPLGtCQUFtQixLQUFLLFVBQVUsQ0FBVixFQUFhLE1BQWIsR0FBc0IsWUFBM0IsQ0FBbkIsR0FBK0QsR0FBdEU7QUFBNEUsT0FBeEc7QUFDQSxrQkFBWSxtQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQUUsZUFBTyxnQkFBZ0IsVUFBVSxDQUFWLEVBQWEsS0FBYixHQUFxQixVQUFVLENBQVYsRUFBYSxDQUFsQyxHQUNqRCxXQURpQyxJQUNsQixHQURrQixJQUNYLFVBQVUsQ0FBVixFQUFhLENBQWIsR0FBaUIsVUFBVSxDQUFWLEVBQWEsTUFBYixHQUFvQixDQUFyQyxHQUF5QyxDQUQ5QixJQUNtQyxHQUQxQztBQUNnRCxPQUQ1RTtBQUdELEtBTEQsTUFLTyxJQUFJLFdBQVcsWUFBZixFQUE0QjtBQUNqQyxrQkFBWSxtQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQUUsZUFBTyxlQUFnQixLQUFLLFVBQVUsQ0FBVixFQUFhLEtBQWIsR0FBcUIsWUFBMUIsQ0FBaEIsR0FBMkQsS0FBbEU7QUFBMEUsT0FBdEc7QUFDQSxrQkFBWSxtQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQUUsZUFBTyxnQkFBZ0IsVUFBVSxDQUFWLEVBQWEsS0FBYixHQUFtQixTQUFuQixHQUFnQyxVQUFVLENBQVYsRUFBYSxDQUE3RCxJQUNqQyxHQURpQyxJQUMxQixVQUFVLENBQVYsRUFBYSxNQUFiLEdBQXNCLFVBQVUsQ0FBVixFQUFhLENBQW5DLEdBQXVDLFdBQXZDLEdBQXFELENBRDNCLElBQ2dDLEdBRHZDO0FBQzZDLE9BRHpFO0FBRUQ7O0FBRUQscUJBQU8sWUFBUCxDQUFvQixNQUFwQixFQUE0QixJQUE1QixFQUFrQyxTQUFsQyxFQUE2QyxJQUE3QyxFQUFtRCxTQUFuRCxFQUE4RCxVQUE5RDtBQUNBLHFCQUFPLFFBQVAsQ0FBZ0IsR0FBaEIsRUFBcUIsS0FBckIsRUFBNEIsV0FBNUI7O0FBRUEsU0FBSyxVQUFMLEdBQWtCLEtBQWxCLENBQXdCLFNBQXhCLEVBQW1DLENBQW5DO0FBRUQ7O0FBSUgsU0FBTyxLQUFQLEdBQWUsVUFBUyxDQUFULEVBQVk7QUFDekIsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLEtBQVA7QUFDdkIsWUFBUSxDQUFSO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLEtBQVAsR0FBZSxVQUFTLENBQVQsRUFBWTtBQUN6QixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sS0FBUDtBQUN2QixRQUFJLEVBQUUsTUFBRixHQUFXLENBQVgsSUFBZ0IsS0FBSyxDQUF6QixFQUE0QjtBQUMxQixjQUFRLENBQVI7QUFDRDtBQUNELFdBQU8sTUFBUDtBQUNELEdBTkQ7O0FBUUEsU0FBTyxLQUFQLEdBQWUsVUFBUyxDQUFULEVBQVksQ0FBWixFQUFlO0FBQzVCLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxLQUFQO0FBQ3ZCLFFBQUksS0FBSyxNQUFMLElBQWUsS0FBSyxRQUFwQixJQUFnQyxLQUFLLE1BQXJDLElBQWdELEtBQUssTUFBTCxJQUFnQixPQUFPLENBQVAsS0FBYSxRQUFqRixFQUE2RjtBQUMzRixjQUFRLENBQVI7QUFDQSxhQUFPLENBQVA7QUFDRDtBQUNELFdBQU8sTUFBUDtBQUNELEdBUEQ7O0FBU0EsU0FBTyxVQUFQLEdBQW9CLFVBQVMsQ0FBVCxFQUFZO0FBQzlCLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxVQUFQO0FBQ3ZCLGlCQUFhLENBQUMsQ0FBZDtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxXQUFQLEdBQXFCLFVBQVMsQ0FBVCxFQUFZO0FBQy9CLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxXQUFQO0FBQ3ZCLGtCQUFjLENBQUMsQ0FBZjtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxXQUFQLEdBQXFCLFVBQVMsQ0FBVCxFQUFZO0FBQy9CLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxXQUFQO0FBQ3ZCLGtCQUFjLENBQUMsQ0FBZjtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxZQUFQLEdBQXNCLFVBQVMsQ0FBVCxFQUFZO0FBQ2hDLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxZQUFQO0FBQ3ZCLG1CQUFlLENBQUMsQ0FBaEI7QUFDQSxXQUFPLE1BQVA7QUFDRCxHQUpEOztBQU1BLFNBQU8sTUFBUCxHQUFnQixVQUFTLENBQVQsRUFBWTtBQUMxQixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sTUFBUDtBQUN2QixhQUFTLENBQVQ7QUFDQSxXQUFPLE1BQVA7QUFDRCxHQUpEOztBQU1BLFNBQU8sVUFBUCxHQUFvQixVQUFTLENBQVQsRUFBWTtBQUM5QixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sVUFBUDtBQUN2QixRQUFJLEtBQUssT0FBTCxJQUFnQixLQUFLLEtBQXJCLElBQThCLEtBQUssUUFBdkMsRUFBaUQ7QUFDL0MsbUJBQWEsQ0FBYjtBQUNEO0FBQ0QsV0FBTyxNQUFQO0FBQ0QsR0FORDs7QUFRQSxTQUFPLFdBQVAsR0FBcUIsVUFBUyxDQUFULEVBQVk7QUFDL0IsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLFdBQVA7QUFDdkIsa0JBQWMsT0FBTyxDQUFQLEtBQWMsUUFBZCxHQUF5QixzQkFBTyxDQUFQLENBQXpCLEdBQXFDLENBQW5EO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLFdBQVAsR0FBcUIsVUFBUyxDQUFULEVBQVk7QUFDL0IsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLFdBQVA7QUFDdkIsa0JBQWMsQ0FBQyxDQUFmO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLGNBQVAsR0FBd0IsVUFBUyxDQUFULEVBQVk7QUFDbEMsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLGNBQVA7QUFDdkIscUJBQWlCLENBQWpCO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLFFBQVAsR0FBa0IsVUFBUyxDQUFULEVBQVk7QUFDNUIsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLFFBQVA7QUFDdkIsUUFBSSxNQUFNLElBQU4sSUFBYyxNQUFNLEtBQXhCLEVBQThCO0FBQzVCLGlCQUFXLENBQVg7QUFDRDtBQUNELFdBQU8sTUFBUDtBQUNELEdBTkQ7O0FBUUEsU0FBTyxNQUFQLEdBQWdCLFVBQVMsQ0FBVCxFQUFXO0FBQ3pCLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxNQUFQO0FBQ3ZCLFFBQUksRUFBRSxXQUFGLEVBQUo7QUFDQSxRQUFJLEtBQUssWUFBTCxJQUFxQixLQUFLLFVBQTlCLEVBQTBDO0FBQ3hDLGVBQVMsQ0FBVDtBQUNEO0FBQ0QsV0FBTyxNQUFQO0FBQ0QsR0FQRDs7QUFTQSxTQUFPLFNBQVAsR0FBbUIsVUFBUyxDQUFULEVBQVk7QUFDN0IsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLFNBQVA7QUFDdkIsZ0JBQVksQ0FBQyxDQUFDLENBQWQ7QUFDQSxXQUFPLE1BQVA7QUFDRCxHQUpEOztBQU1BLFNBQU8sV0FBUCxHQUFxQixVQUFTLENBQVQsRUFBWTtBQUMvQixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sV0FBUDtBQUN2QixrQkFBYyxDQUFkO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLEtBQVAsR0FBZSxVQUFTLENBQVQsRUFBWTtBQUN6QixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sS0FBUDtBQUN2QixZQUFRLENBQVI7QUFDQSxXQUFPLE1BQVA7QUFDRCxHQUpEOztBQU1BLFNBQU8sRUFBUCxHQUFZLFlBQVU7QUFDcEIsUUFBSSxRQUFRLGlCQUFpQixFQUFqQixDQUFvQixLQUFwQixDQUEwQixnQkFBMUIsRUFBNEMsU0FBNUMsQ0FBWjtBQUNBLFdBQU8sVUFBVSxnQkFBVixHQUE2QixNQUE3QixHQUFzQyxLQUE3QztBQUNELEdBSEQ7O0FBS0EsU0FBTyxNQUFQO0FBRUQ7Ozs7Ozs7O0FDeE5NLElBQU0sNENBQWtCLFNBQWxCLGVBQWtCLE9BQTJDO0FBQUEsTUFBaEMsQ0FBZ0MsUUFBaEMsQ0FBZ0M7QUFBQSxNQUE3QixTQUE2QixRQUE3QixTQUE2QjtBQUFBLE1BQWxCLGVBQWtCLFFBQWxCLGVBQWtCOzs7QUFFeEUsTUFBSSxNQUFNLENBQVYsRUFBYTtBQUNYLFdBQU8sZ0JBQWdCLENBQWhCLEVBQW1CLE9BQW5CLENBQTJCLFFBQTNCLEVBQXFDLFdBQXJDLENBQVA7QUFDRCxHQUZELE1BRU8sSUFBSSxNQUFNLFlBQVksQ0FBdEIsRUFBeUI7QUFDOUIsMEJBQW9CLGdCQUFnQixZQUFZLENBQTVCLEVBQStCLE9BQS9CLENBQXVDLFNBQXZDLEVBQWtELEVBQWxELENBQXBCO0FBQ0Q7QUFDRCxTQUFPLGdCQUFnQixDQUFoQixDQUFQO0FBQ0QsQ0FSTTs7a0JBVVE7QUFDYjtBQURhLEM7Ozs7Ozs7Ozs7O2tCQ1ZBOztBQUViLGVBQWEscUJBQVUsQ0FBVixFQUFhO0FBQ3hCLFdBQU8sQ0FBUDtBQUNELEdBSlk7O0FBTWIsa0JBQWdCLDBCQUF5QztBQUFBLFFBQS9CLEdBQStCLHlEQUEzQixFQUEyQjtBQUFBLFFBQXZCLE1BQXVCO0FBQUEsUUFBZixNQUFlO0FBQUEsUUFBUCxLQUFPOzs7QUFFckQsUUFBSSxRQUFPLE1BQVAseUNBQU8sTUFBUCxPQUFrQixRQUF0QixFQUErQjtBQUM3QixVQUFHLE9BQU8sTUFBUCxLQUFrQixDQUFyQixFQUF3QixPQUFPLEdBQVA7O0FBRXhCLFVBQUksSUFBSSxPQUFPLE1BQWY7QUFDQSxhQUFPLElBQUksSUFBSSxNQUFmLEVBQXVCLEdBQXZCLEVBQTRCO0FBQzFCLGVBQU8sSUFBUCxDQUFZLElBQUksQ0FBSixDQUFaO0FBQ0Q7QUFDRCxhQUFPLE1BQVA7QUFDRCxLQVJELE1BUU8sSUFBSSxPQUFPLE1BQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDdkMsVUFBTSxlQUFlLEVBQXJCO0FBQ0EsVUFBTSxZQUFZLElBQUksTUFBdEI7QUFDQSxXQUFLLElBQUksS0FBRSxDQUFYLEVBQWMsS0FBSSxTQUFsQixFQUE2QixJQUE3QixFQUFpQztBQUMvQixxQkFBYSxJQUFiLENBQWtCLE9BQU87QUFDdkIsZUFEdUI7QUFFdkIsOEJBRnVCO0FBR3ZCLDJCQUFrQixHQUhLO0FBSXZCLHdCQUp1QjtBQUt2QixzQkFMdUIsRUFBUCxDQUFsQjtBQU1EO0FBQ0QsYUFBTyxZQUFQO0FBQ0Q7O0FBRUQsV0FBTyxHQUFQO0FBQ0QsR0EvQlU7O0FBaUNiLG1CQUFpQix5QkFBVSxLQUFWLEVBQWlCLEtBQWpCLEVBQXdCLFdBQXhCLEVBQXFDO0FBQ3BELFFBQUksT0FBTyxFQUFYOztBQUVBLFFBQUksTUFBTSxNQUFOLEdBQWUsQ0FBbkIsRUFBcUI7QUFDbkIsYUFBTyxLQUFQO0FBRUQsS0FIRCxNQUdPO0FBQ0wsVUFBSSxTQUFTLE1BQU0sTUFBTixFQUFiO0FBQUEsVUFDQSxZQUFZLENBQUMsT0FBTyxPQUFPLE1BQVAsR0FBZ0IsQ0FBdkIsSUFBNEIsT0FBTyxDQUFQLENBQTdCLEtBQXlDLFFBQVEsQ0FBakQsQ0FEWjtBQUFBLFVBRUEsSUFBSSxDQUZKOztBQUlBLGFBQU8sSUFBSSxLQUFYLEVBQWtCLEdBQWxCLEVBQXNCO0FBQ3BCLGFBQUssSUFBTCxDQUFVLE9BQU8sQ0FBUCxJQUFZLElBQUUsU0FBeEI7QUFDRDtBQUNGOztBQUVELFFBQUksU0FBUyxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQWI7O0FBRUEsV0FBTyxFQUFDLE1BQU0sSUFBUDtBQUNDLGNBQVEsTUFEVDtBQUVDLGVBQVMsaUJBQVMsQ0FBVCxFQUFXO0FBQUUsZUFBTyxNQUFNLENBQU4sQ0FBUDtBQUFrQixPQUZ6QyxFQUFQO0FBR0QsR0F0RFk7O0FBd0RiLGtCQUFnQix3QkFBVSxLQUFWLEVBQWlCLFdBQWpCLEVBQThCLGNBQTlCLEVBQThDO0FBQzVELFFBQUksU0FBUyxNQUFNLEtBQU4sR0FBYyxHQUFkLENBQWtCLFVBQVMsQ0FBVCxFQUFXO0FBQ3hDLFVBQUksU0FBUyxNQUFNLFlBQU4sQ0FBbUIsQ0FBbkIsQ0FBYjs7QUFFQSxhQUFPLFlBQVksT0FBTyxDQUFQLENBQVosSUFBeUIsR0FBekIsR0FBK0IsY0FBL0IsR0FBZ0QsR0FBaEQsR0FBc0QsWUFBWSxPQUFPLENBQVAsQ0FBWixDQUE3RDtBQUVELEtBTFksQ0FBYjs7QUFPQSxXQUFPLEVBQUMsTUFBTSxNQUFNLEtBQU4sRUFBUDtBQUNDLGNBQVEsTUFEVDtBQUVDLGVBQVMsS0FBSztBQUZmLEtBQVA7QUFJRCxHQXBFWTs7QUFzRWIsb0JBQWtCLDBCQUFVLEtBQVYsRUFBaUI7QUFDakMsV0FBTyxFQUFDLE1BQU0sTUFBTSxNQUFOLEVBQVA7QUFDQyxjQUFRLE1BQU0sTUFBTixFQURUO0FBRUMsZUFBUyxpQkFBUyxDQUFULEVBQVc7QUFBRSxlQUFPLE1BQU0sQ0FBTixDQUFQO0FBQWtCLE9BRnpDLEVBQVA7QUFHRCxHQTFFWTs7QUE0RWIsaUJBQWUsdUJBQVUsS0FBVixFQUFpQixNQUFqQixFQUF5QixXQUF6QixFQUFzQyxVQUF0QyxFQUFrRCxXQUFsRCxFQUErRCxJQUEvRCxFQUFxRTtBQUNsRixRQUFJLFVBQVUsTUFBZCxFQUFxQjtBQUNqQixhQUFPLElBQVAsQ0FBWSxRQUFaLEVBQXNCLFdBQXRCLEVBQW1DLElBQW5DLENBQXdDLE9BQXhDLEVBQWlELFVBQWpEO0FBRUgsS0FIRCxNQUdPLElBQUksVUFBVSxRQUFkLEVBQXdCO0FBQzNCLGFBQU8sSUFBUCxDQUFZLEdBQVosRUFBaUIsV0FBakIsRUFEMkIsQ0FDRTtBQUVoQyxLQUhNLE1BR0EsSUFBSSxVQUFVLE1BQWQsRUFBc0I7QUFDekIsYUFBTyxJQUFQLENBQVksSUFBWixFQUFrQixDQUFsQixFQUFxQixJQUFyQixDQUEwQixJQUExQixFQUFnQyxVQUFoQyxFQUE0QyxJQUE1QyxDQUFpRCxJQUFqRCxFQUF1RCxDQUF2RCxFQUEwRCxJQUExRCxDQUErRCxJQUEvRCxFQUFxRSxDQUFyRTtBQUVILEtBSE0sTUFHQSxJQUFJLFVBQVUsTUFBZCxFQUFzQjtBQUMzQixhQUFPLElBQVAsQ0FBWSxHQUFaLEVBQWlCLElBQWpCO0FBQ0Q7QUFDRixHQXpGWTs7QUEyRmIsY0FBWSxvQkFBVSxHQUFWLEVBQWUsS0FBZixFQUFzQixNQUF0QixFQUE4QixXQUE5QixFQUEwQztBQUNwRCxVQUFNLE1BQU4sQ0FBYSxNQUFiLEVBQXFCLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DLGNBQWMsT0FBakQ7QUFDQSxRQUFJLFNBQUosQ0FBYyxPQUFPLFdBQVAsR0FBcUIsV0FBbkMsRUFBZ0QsSUFBaEQsQ0FBcUQsTUFBckQsRUFBNkQsSUFBN0QsQ0FBa0UsS0FBSyxXQUF2RTtBQUNELEdBOUZZOztBQWdHYixlQUFhLHFCQUFVLEtBQVYsRUFBaUIsU0FBakIsRUFBNEIsS0FBNUIsRUFBbUMsTUFBbkMsRUFBMkMsV0FBM0MsRUFBd0QsY0FBeEQsRUFBdUU7QUFDbEYsUUFBSSxPQUFPLE1BQU0sWUFBTixHQUNILEtBQUssY0FBTCxDQUFvQixLQUFwQixFQUEyQixXQUEzQixFQUF3QyxjQUF4QyxDQURHLEdBQ3VELE1BQU0sS0FBTixHQUMxRCxLQUFLLGVBQUwsQ0FBcUIsS0FBckIsRUFBNEIsS0FBNUIsRUFBbUMsV0FBbkMsQ0FEMEQsR0FDUixLQUFLLGdCQUFMLENBQXNCLEtBQXRCLENBRjFEOztBQUlBLFNBQUssTUFBTCxHQUFjLEtBQUssY0FBTCxDQUFvQixLQUFLLE1BQXpCLEVBQWlDLE1BQWpDLEVBQXlDLE1BQU0sTUFBTixFQUF6QyxFQUF5RCxNQUFNLEtBQU4sRUFBekQsQ0FBZDs7QUFFQSxRQUFJLFNBQUosRUFBZTtBQUNiLFdBQUssTUFBTCxHQUFjLEtBQUssVUFBTCxDQUFnQixLQUFLLE1BQXJCLENBQWQ7QUFDQSxXQUFLLElBQUwsR0FBWSxLQUFLLFVBQUwsQ0FBZ0IsS0FBSyxJQUFyQixDQUFaO0FBQ0Q7O0FBRUQsV0FBTyxJQUFQO0FBQ0QsR0E3R1k7O0FBK0diLGNBQVksb0JBQVMsR0FBVCxFQUFjO0FBQ3hCLFFBQUksU0FBUyxFQUFiO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBUixFQUFXLElBQUksSUFBSSxNQUF4QixFQUFnQyxJQUFJLENBQXBDLEVBQXVDLEdBQXZDLEVBQTRDO0FBQzFDLGFBQU8sQ0FBUCxJQUFZLElBQUksSUFBRSxDQUFGLEdBQUksQ0FBUixDQUFaO0FBQ0Q7QUFDRCxXQUFPLE1BQVA7QUFDRCxHQXJIWTs7QUF1SGIsZ0JBQWMsc0JBQVUsTUFBVixFQUFrQixJQUFsQixFQUF3QixTQUF4QixFQUFtQyxJQUFuQyxFQUF5QyxTQUF6QyxFQUFvRCxVQUFwRCxFQUFnRTtBQUM1RSxTQUFLLElBQUwsQ0FBVSxXQUFWLEVBQXVCLFNBQXZCO0FBQ0EsU0FBSyxJQUFMLENBQVUsV0FBVixFQUF1QixTQUF2QjtBQUNBLFFBQUksV0FBVyxZQUFmLEVBQTRCO0FBQzFCLFdBQUssS0FBTCxDQUFXLGFBQVgsRUFBMEIsVUFBMUI7QUFDRDtBQUNGLEdBN0hZOztBQStIYixnQkFBYyxzQkFBUyxLQUFULEVBQWdCLFVBQWhCLEVBQTJCO0FBQ3ZDLFFBQUksSUFBSSxJQUFSOztBQUVFLFVBQU0sRUFBTixDQUFTLGtCQUFULEVBQTZCLFVBQVUsQ0FBVixFQUFhO0FBQUUsUUFBRSxXQUFGLENBQWMsVUFBZCxFQUEwQixDQUExQixFQUE2QixJQUE3QjtBQUFxQyxLQUFqRixFQUNLLEVBREwsQ0FDUSxpQkFEUixFQUMyQixVQUFVLENBQVYsRUFBYTtBQUFFLFFBQUUsVUFBRixDQUFhLFVBQWIsRUFBeUIsQ0FBekIsRUFBNEIsSUFBNUI7QUFBb0MsS0FEOUUsRUFFSyxFQUZMLENBRVEsY0FGUixFQUV3QixVQUFVLENBQVYsRUFBYTtBQUFFLFFBQUUsWUFBRixDQUFlLFVBQWYsRUFBMkIsQ0FBM0IsRUFBOEIsSUFBOUI7QUFBc0MsS0FGN0U7QUFHSCxHQXJJWTs7QUF1SWIsZUFBYSxxQkFBUyxjQUFULEVBQXlCLENBQXpCLEVBQTRCLEdBQTVCLEVBQWdDO0FBQzNDLG1CQUFlLElBQWYsQ0FBb0IsVUFBcEIsRUFBZ0MsR0FBaEMsRUFBcUMsQ0FBckM7QUFDRCxHQXpJWTs7QUEySWIsY0FBWSxvQkFBUyxjQUFULEVBQXlCLENBQXpCLEVBQTRCLEdBQTVCLEVBQWdDO0FBQzFDLG1CQUFlLElBQWYsQ0FBb0IsU0FBcEIsRUFBK0IsR0FBL0IsRUFBb0MsQ0FBcEM7QUFDRCxHQTdJWTs7QUErSWIsZ0JBQWMsc0JBQVMsY0FBVCxFQUF5QixDQUF6QixFQUE0QixHQUE1QixFQUFnQztBQUM1QyxtQkFBZSxJQUFmLENBQW9CLFdBQXBCLEVBQWlDLEdBQWpDLEVBQXNDLENBQXRDO0FBQ0QsR0FqSlk7O0FBbUpiLFlBQVUsa0JBQVMsR0FBVCxFQUFjLEtBQWQsRUFBcUIsV0FBckIsRUFBaUM7QUFDekMsUUFBSSxVQUFVLEVBQWQsRUFBaUI7O0FBRWYsVUFBSSxZQUFZLElBQUksU0FBSixDQUFjLFVBQVUsV0FBVixHQUF3QixhQUF0QyxDQUFoQjs7QUFFQSxnQkFBVSxJQUFWLENBQWUsQ0FBQyxLQUFELENBQWYsRUFDRyxLQURILEdBRUcsTUFGSCxDQUVVLE1BRlYsRUFHRyxJQUhILENBR1EsT0FIUixFQUdpQixjQUFjLGFBSC9COztBQUtFLFVBQUksU0FBSixDQUFjLFVBQVUsV0FBVixHQUF3QixhQUF0QyxFQUNLLElBREwsQ0FDVSxLQURWOztBQUdGLFVBQUksV0FBVyxJQUFJLE1BQUosQ0FBVyxNQUFNLFdBQU4sR0FBb0IsYUFBL0IsQ0FBZjs7QUFFQSxVQUFJLFVBQVUsSUFBSSxNQUFKLENBQVcsTUFBTSxXQUFOLEdBQW9CLGFBQS9CLEVBQThDLEtBQTlDLEdBQ1QsR0FEUyxDQUNMLFVBQVMsQ0FBVCxFQUFZO0FBQUUsZUFBTyxFQUFFLE9BQUYsR0FBWSxNQUFuQjtBQUEwQixPQURuQyxFQUNxQyxDQURyQyxDQUFkO0FBQUEsVUFFQSxVQUFVLENBQUMsU0FBUyxLQUFULEdBQWlCLEdBQWpCLENBQXFCLFVBQVMsQ0FBVCxFQUFZO0FBQUUsZUFBTyxFQUFFLE9BQUYsR0FBWSxDQUFuQjtBQUFxQixPQUF4RCxFQUEwRCxDQUExRCxDQUZYOztBQUlBLGVBQVMsSUFBVCxDQUFjLFdBQWQsRUFBMkIsZUFBZSxPQUFmLEdBQXlCLEdBQXpCLElBQWdDLFVBQVUsRUFBMUMsSUFBZ0QsR0FBM0U7QUFFRDtBQUNGO0FBektZLEM7Ozs7Ozs7O2tCQ01TLEk7O0FBTnhCOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFZSxTQUFTLElBQVQsR0FBZTs7QUFFNUIsTUFBSSxRQUFRLDJCQUFaO0FBQUEsTUFDRSxRQUFRLE1BRFY7QUFBQSxNQUVFLGFBQWEsRUFGZjtBQUFBLE1BR0UsZUFBZSxDQUhqQjtBQUFBLE1BSUUsUUFBUSxDQUFDLENBQUQsQ0FKVjtBQUFBLE1BS0UsU0FBUyxFQUxYO0FBQUEsTUFNRSxZQUFZLEtBTmQ7QUFBQSxNQU9FLGNBQWMsRUFQaEI7QUFBQSxNQVFFLFFBQVEsRUFSVjtBQUFBLE1BU0UsY0FBYyxzQkFBTyxNQUFQLENBVGhCO0FBQUEsTUFVRSxjQUFjLEVBVmhCO0FBQUEsTUFXRSxhQUFhLFFBWGY7QUFBQSxNQVlFLGlCQUFpQixJQVpuQjtBQUFBLE1BYUUsU0FBUyxVQWJYO0FBQUEsTUFjRSxZQUFZLEtBZGQ7QUFBQSxNQWVFLElBZkY7QUFBQSxNQWdCRSxtQkFBbUIsMEJBQVMsVUFBVCxFQUFxQixTQUFyQixFQUFnQyxXQUFoQyxDQWhCckI7O0FBa0JFLFdBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFvQjs7QUFFbEIsUUFBSSxPQUFPLGlCQUFPLFdBQVAsQ0FBbUIsS0FBbkIsRUFBMEIsU0FBMUIsRUFBcUMsS0FBckMsRUFBNEMsTUFBNUMsRUFBb0QsV0FBcEQsRUFBaUUsY0FBakUsQ0FBWDtBQUFBLFFBQ0UsVUFBVSxJQUFJLFNBQUosQ0FBYyxHQUFkLEVBQW1CLElBQW5CLENBQXdCLENBQUMsS0FBRCxDQUF4QixDQURaOztBQUdBLFlBQVEsS0FBUixHQUFnQixNQUFoQixDQUF1QixHQUF2QixFQUE0QixJQUE1QixDQUFpQyxPQUFqQyxFQUEwQyxjQUFjLGFBQXhEOztBQUVBLFFBQUksT0FBTyxJQUFJLE1BQUosQ0FBVyxNQUFNLFdBQU4sR0FBb0IsYUFBL0IsRUFDTixTQURNLENBQ0ksTUFBTSxXQUFOLEdBQW9CLE1BRHhCLEVBQ2dDLElBRGhDLENBQ3FDLEtBQUssSUFEMUMsQ0FBWDtBQUFBLFFBRUUsWUFBWSxLQUFLLEtBQUwsR0FBYSxNQUFiLENBQW9CLEdBQXBCLEVBQ1QsSUFEUyxDQUNKLE9BREksRUFDSyxjQUFjLE1BRG5CLENBRmQ7QUFBQSxRQUd5QztBQUN2QyxpQkFBYSxVQUFVLE1BQVYsQ0FBaUIsS0FBakIsRUFBd0IsSUFBeEIsQ0FBNkIsT0FBN0IsRUFBc0MsY0FBYyxRQUFwRCxDQUpmO0FBQUEsUUFLRSxTQUFTLElBQUksU0FBSixDQUFjLE9BQU8sV0FBUCxHQUFxQixPQUFyQixHQUErQixLQUE3QyxDQUxYOztBQU9BO0FBQ0EscUJBQU8sWUFBUCxDQUFvQixTQUFwQixFQUErQixnQkFBL0I7O0FBRUEsU0FBSyxJQUFMLEdBQVksVUFBWixHQUF5QixLQUF6QixDQUErQixTQUEvQixFQUEwQyxDQUExQyxFQUE2QyxNQUE3Qzs7QUFFQTtBQUNBLFFBQUksVUFBVSxNQUFkLEVBQXFCO0FBQ25CLHVCQUFPLGFBQVAsQ0FBcUIsS0FBckIsRUFBNEIsTUFBNUIsRUFBb0MsQ0FBcEMsRUFBdUMsVUFBdkM7QUFDQSxhQUFPLElBQVAsQ0FBWSxjQUFaLEVBQTRCLEtBQUssT0FBakM7QUFDRCxLQUhELE1BR087QUFDTCx1QkFBTyxhQUFQLENBQXFCLEtBQXJCLEVBQTRCLE1BQTVCLEVBQW9DLEtBQUssT0FBekMsRUFBa0QsS0FBSyxPQUF2RCxFQUFnRSxLQUFLLE9BQXJFLEVBQThFLElBQTlFO0FBQ0Q7O0FBRUQscUJBQU8sVUFBUCxDQUFtQixHQUFuQixFQUF3QixTQUF4QixFQUFtQyxLQUFLLE1BQXhDLEVBQWdELFdBQWhEOztBQUVBO0FBQ0EsV0FBTyxVQUFVLEtBQVYsQ0FBZ0IsSUFBaEIsQ0FBUDs7QUFFQTtBQUNBLFFBQUksT0FBTyxLQUFLLFNBQUwsQ0FBZSxNQUFmLENBQVg7QUFBQSxRQUNFLFlBQVksT0FBTyxLQUFQLEdBQWUsR0FBZixDQUNWLFVBQVMsQ0FBVCxFQUFZLENBQVosRUFBYztBQUNaLFVBQUksT0FBTyxFQUFFLE9BQUYsRUFBWDtBQUNBLFVBQUksU0FBUyxNQUFNLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBTixDQUFiOztBQUVBLFVBQUksVUFBVSxNQUFWLElBQW9CLFdBQVcsWUFBbkMsRUFBaUQ7QUFDL0MsYUFBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLEdBQWMsTUFBNUI7QUFDRCxPQUZELE1BRU8sSUFBSSxVQUFVLE1BQVYsSUFBb0IsV0FBVyxVQUFuQyxFQUE4QztBQUNuRCxhQUFLLEtBQUwsR0FBYSxLQUFLLEtBQWxCO0FBQ0Q7O0FBRUQsYUFBTyxJQUFQO0FBQ0gsS0FaVyxDQURkOztBQWVBLFFBQUksT0FBTyxrQkFBSSxTQUFKLEVBQWUsVUFBUyxDQUFULEVBQVc7QUFBRSxhQUFPLEVBQUUsTUFBRixHQUFXLEVBQUUsQ0FBcEI7QUFBd0IsS0FBcEQsQ0FBWDtBQUFBLFFBQ0EsT0FBTyxrQkFBSSxTQUFKLEVBQWUsVUFBUyxDQUFULEVBQVc7QUFBRSxhQUFPLEVBQUUsS0FBRixHQUFVLEVBQUUsQ0FBbkI7QUFBdUIsS0FBbkQsQ0FEUDs7QUFHQSxRQUFJLFNBQUo7QUFBQSxRQUNBLFNBREE7QUFBQSxRQUVBLFlBQWEsY0FBYyxPQUFmLEdBQTBCLENBQTFCLEdBQStCLGNBQWMsUUFBZixHQUEyQixHQUEzQixHQUFpQyxDQUYzRTs7QUFJQTtBQUNBLFFBQUksV0FBVyxVQUFmLEVBQTBCOztBQUV4QixrQkFBWSxtQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQ3RCLFlBQUksU0FBUyxrQkFBSSxVQUFVLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsSUFBSSxDQUF2QixDQUFKLEVBQWdDLFVBQVMsQ0FBVCxFQUFXO0FBQUUsaUJBQU8sRUFBRSxNQUFUO0FBQWtCLFNBQS9ELENBQWI7QUFDQSxlQUFPLG1CQUFtQixTQUFTLElBQUUsWUFBOUIsSUFBOEMsR0FBckQ7QUFBMkQsT0FGL0Q7O0FBSUEsa0JBQVksbUJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYztBQUFFLGVBQU8sZ0JBQWdCLE9BQU8sV0FBdkIsSUFBc0MsR0FBdEMsSUFDaEMsVUFBVSxDQUFWLEVBQWEsQ0FBYixHQUFpQixVQUFVLENBQVYsRUFBYSxNQUFiLEdBQW9CLENBQXJDLEdBQXlDLENBRFQsSUFDYyxHQURyQjtBQUMyQixPQUR2RDtBQUdELEtBVEQsTUFTTyxJQUFJLFdBQVcsWUFBZixFQUE0QjtBQUNqQyxrQkFBWSxtQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQ3RCLFlBQUksUUFBUSxrQkFBSSxVQUFVLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsSUFBSSxDQUF2QixDQUFKLEVBQWdDLFVBQVMsQ0FBVCxFQUFXO0FBQUUsaUJBQU8sRUFBRSxLQUFUO0FBQWlCLFNBQTlELENBQVo7QUFDQSxlQUFPLGdCQUFnQixRQUFRLElBQUUsWUFBMUIsSUFBMEMsS0FBakQ7QUFBeUQsT0FGN0Q7O0FBSUEsa0JBQVksbUJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYztBQUFFLGVBQU8sZ0JBQWdCLFVBQVUsQ0FBVixFQUFhLEtBQWIsR0FBbUIsU0FBbkIsR0FBZ0MsVUFBVSxDQUFWLEVBQWEsQ0FBN0QsSUFBa0UsR0FBbEUsSUFDNUIsT0FBTyxXQURxQixJQUNMLEdBREY7QUFDUSxPQURwQztBQUVEOztBQUVELHFCQUFPLFlBQVAsQ0FBb0IsTUFBcEIsRUFBNEIsSUFBNUIsRUFBa0MsU0FBbEMsRUFBNkMsSUFBN0MsRUFBbUQsU0FBbkQsRUFBOEQsVUFBOUQ7QUFDQSxxQkFBTyxRQUFQLENBQWdCLEdBQWhCLEVBQXFCLEtBQXJCLEVBQTRCLFdBQTVCOztBQUVBLFNBQUssVUFBTCxHQUFrQixLQUFsQixDQUF3QixTQUF4QixFQUFtQyxDQUFuQztBQUVEOztBQUVILFNBQU8sS0FBUCxHQUFlLFVBQVMsQ0FBVCxFQUFZO0FBQ3pCLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxLQUFQO0FBQ3ZCLFlBQVEsQ0FBUjtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxLQUFQLEdBQWUsVUFBUyxDQUFULEVBQVk7QUFDekIsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLEtBQVA7QUFDdkIsUUFBSSxFQUFFLE1BQUYsR0FBVyxDQUFYLElBQWdCLEtBQUssQ0FBekIsRUFBNEI7QUFDMUIsY0FBUSxDQUFSO0FBQ0Q7QUFDRCxXQUFPLE1BQVA7QUFDRCxHQU5EOztBQVNBLFNBQU8sS0FBUCxHQUFlLFVBQVMsQ0FBVCxFQUFZLENBQVosRUFBZTtBQUM1QixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sS0FBUDtBQUN2QixRQUFJLEtBQUssTUFBTCxJQUFlLEtBQUssUUFBcEIsSUFBZ0MsS0FBSyxNQUF6QyxFQUFpRDtBQUMvQyxjQUFRLENBQVI7QUFDQSxhQUFPLENBQVA7QUFDRDtBQUNELFdBQU8sTUFBUDtBQUNELEdBUEQ7O0FBU0EsU0FBTyxVQUFQLEdBQW9CLFVBQVMsQ0FBVCxFQUFZO0FBQzlCLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxVQUFQO0FBQ3ZCLGlCQUFhLENBQUMsQ0FBZDtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxZQUFQLEdBQXNCLFVBQVMsQ0FBVCxFQUFZO0FBQ2hDLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxZQUFQO0FBQ3ZCLG1CQUFlLENBQUMsQ0FBaEI7QUFDQSxXQUFPLE1BQVA7QUFDRCxHQUpEOztBQU1BLFNBQU8sTUFBUCxHQUFnQixVQUFTLENBQVQsRUFBWTtBQUMxQixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sTUFBUDtBQUN2QixhQUFTLENBQVQ7QUFDQSxXQUFPLE1BQVA7QUFDRCxHQUpEOztBQU1BLFNBQU8sVUFBUCxHQUFvQixVQUFTLENBQVQsRUFBWTtBQUM5QixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sVUFBUDtBQUN2QixRQUFJLEtBQUssT0FBTCxJQUFnQixLQUFLLEtBQXJCLElBQThCLEtBQUssUUFBdkMsRUFBaUQ7QUFDL0MsbUJBQWEsQ0FBYjtBQUNEO0FBQ0QsV0FBTyxNQUFQO0FBQ0QsR0FORDs7QUFRQSxTQUFPLFdBQVAsR0FBcUIsVUFBUyxDQUFULEVBQVk7QUFDL0IsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLFdBQVA7QUFDdkIsa0JBQWMsT0FBTyxDQUFQLEtBQWMsUUFBZCxHQUF5QixzQkFBTyxDQUFQLENBQXpCLEdBQXFDLENBQW5EO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLFdBQVAsR0FBcUIsVUFBUyxDQUFULEVBQVk7QUFDL0IsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLFdBQVA7QUFDdkIsa0JBQWMsQ0FBQyxDQUFmO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLGNBQVAsR0FBd0IsVUFBUyxDQUFULEVBQVk7QUFDbEMsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLGNBQVA7QUFDdkIscUJBQWlCLENBQWpCO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLE1BQVAsR0FBZ0IsVUFBUyxDQUFULEVBQVc7QUFDekIsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLE1BQVA7QUFDdkIsUUFBSSxFQUFFLFdBQUYsRUFBSjtBQUNBLFFBQUksS0FBSyxZQUFMLElBQXFCLEtBQUssVUFBOUIsRUFBMEM7QUFDeEMsZUFBUyxDQUFUO0FBQ0Q7QUFDRCxXQUFPLE1BQVA7QUFDRCxHQVBEOztBQVNBLFNBQU8sU0FBUCxHQUFtQixVQUFTLENBQVQsRUFBWTtBQUM3QixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sU0FBUDtBQUN2QixnQkFBWSxDQUFDLENBQUMsQ0FBZDtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxXQUFQLEdBQXFCLFVBQVMsQ0FBVCxFQUFZO0FBQy9CLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxXQUFQO0FBQ3ZCLGtCQUFjLENBQWQ7QUFDQSxXQUFPLE1BQVA7QUFDRCxHQUpEOztBQU1BLFNBQU8sS0FBUCxHQUFlLFVBQVMsQ0FBVCxFQUFZO0FBQ3pCLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxLQUFQO0FBQ3ZCLFlBQVEsQ0FBUjtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxFQUFQLEdBQVksWUFBVTtBQUNwQixRQUFJLFFBQVEsaUJBQWlCLEVBQWpCLENBQW9CLEtBQXBCLENBQTBCLGdCQUExQixFQUE0QyxTQUE1QyxDQUFaO0FBQ0EsV0FBTyxVQUFVLGdCQUFWLEdBQTZCLE1BQTdCLEdBQXNDLEtBQTdDO0FBQ0QsR0FIRDs7QUFLQSxTQUFPLE1BQVA7QUFFRDs7Ozs7Ozs7a0JDM011QixNOztBQU54Qjs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRWUsU0FBUyxNQUFULEdBQWlCOztBQUU5QixNQUFJLFFBQVEsMkJBQVo7QUFBQSxNQUNFLFFBQVEsTUFEVjtBQUFBLE1BRUUsYUFBYSxFQUZmO0FBQUEsTUFHRSxjQUFjLEVBSGhCO0FBQUEsTUFJRSxjQUFjLEVBSmhCO0FBQUEsTUFLRSxlQUFlLENBTGpCO0FBQUEsTUFNRSxRQUFRLENBQUMsQ0FBRCxDQU5WO0FBQUEsTUFPRSxTQUFTLEVBUFg7QUFBQSxNQVFFLGNBQWMsRUFSaEI7QUFBQSxNQVNFLFdBQVcsS0FUYjtBQUFBLE1BVUUsUUFBUSxFQVZWO0FBQUEsTUFXRSxjQUFjLHNCQUFPLE1BQVAsQ0FYaEI7QUFBQSxNQVlFLGFBQWEsUUFaZjtBQUFBLE1BYUUsY0FBYyxFQWJoQjtBQUFBLE1BY0UsaUJBQWlCLElBZG5CO0FBQUEsTUFlRSxTQUFTLFVBZlg7QUFBQSxNQWdCRSxZQUFZLEtBaEJkO0FBQUEsTUFpQkUsbUJBQW1CLDBCQUFTLFVBQVQsRUFBcUIsU0FBckIsRUFBZ0MsV0FBaEMsQ0FqQnJCOztBQW1CRSxXQUFTLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBb0I7O0FBRWxCLFFBQUksT0FBTyxpQkFBTyxXQUFQLENBQW1CLEtBQW5CLEVBQTBCLFNBQTFCLEVBQXFDLEtBQXJDLEVBQTRDLE1BQTVDLEVBQW9ELFdBQXBELEVBQWlFLGNBQWpFLENBQVg7QUFBQSxRQUNFLFVBQVUsSUFBSSxTQUFKLENBQWMsR0FBZCxFQUFtQixJQUFuQixDQUF3QixDQUFDLEtBQUQsQ0FBeEIsQ0FEWjs7QUFHQSxZQUFRLEtBQVIsR0FBZ0IsTUFBaEIsQ0FBdUIsR0FBdkIsRUFBNEIsSUFBNUIsQ0FBaUMsT0FBakMsRUFBMEMsY0FBYyxhQUF4RDs7QUFFQSxRQUFJLE9BQU8sSUFBSSxNQUFKLENBQVcsTUFBTSxXQUFOLEdBQW9CLGFBQS9CLEVBQ04sU0FETSxDQUNJLE1BQU0sV0FBTixHQUFvQixNQUR4QixFQUNnQyxJQURoQyxDQUNxQyxLQUFLLElBRDFDLENBQVg7QUFBQSxRQUVFLFlBQVksS0FBSyxLQUFMLEdBQWEsTUFBYixDQUFvQixHQUFwQixFQUNULElBRFMsQ0FDSixPQURJLEVBQ0ssY0FBYyxNQURuQixDQUZkO0FBQUEsUUFHeUM7QUFDdkMsaUJBQWEsVUFBVSxNQUFWLENBQWlCLEtBQWpCLEVBQXdCLElBQXhCLENBQTZCLE9BQTdCLEVBQXNDLGNBQWMsUUFBcEQsQ0FKZjtBQUFBLFFBS0UsU0FBUyxJQUFJLFNBQUosQ0FBYyxPQUFPLFdBQVAsR0FBcUIsT0FBckIsR0FBK0IsS0FBN0MsQ0FMWDs7QUFPQTtBQUNBLHFCQUFPLFlBQVAsQ0FBb0IsU0FBcEIsRUFBK0IsZ0JBQS9COztBQUVBO0FBQ0EsU0FBSyxJQUFMLEdBQVksVUFBWixHQUF5QixLQUF6QixDQUErQixTQUEvQixFQUEwQyxDQUExQyxFQUE2QyxNQUE3Qzs7QUFFQSxxQkFBTyxhQUFQLENBQXFCLEtBQXJCLEVBQTRCLE1BQTVCLEVBQW9DLFdBQXBDLEVBQWlELFVBQWpELEVBQTZELFdBQTdELEVBQTBFLEtBQUssT0FBL0U7QUFDQSxxQkFBTyxVQUFQLENBQW1CLEdBQW5CLEVBQXdCLFNBQXhCLEVBQW1DLEtBQUssTUFBeEMsRUFBZ0QsV0FBaEQ7O0FBRUE7QUFDQSxXQUFPLFVBQVUsS0FBVixDQUFnQixJQUFoQixDQUFQOztBQUVBO0FBQ0EsUUFBSSxPQUFPLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBWDtBQUFBLFFBQ0UsWUFBWSxPQUFPLEtBQVAsR0FBZSxHQUFmLENBQW9CLFVBQVMsQ0FBVCxFQUFXO0FBQUUsYUFBTyxFQUFFLE9BQUYsRUFBUDtBQUFxQixLQUF0RCxDQURkOztBQUdBLFFBQUksT0FBTyxrQkFBSSxTQUFKLEVBQWUsVUFBUyxDQUFULEVBQVc7QUFBRSxhQUFPLEVBQUUsTUFBVDtBQUFrQixLQUE5QyxDQUFYO0FBQUEsUUFDQSxPQUFPLGtCQUFJLFNBQUosRUFBZSxVQUFTLENBQVQsRUFBVztBQUFFLGFBQU8sRUFBRSxLQUFUO0FBQWlCLEtBQTdDLENBRFA7O0FBR0EsUUFBSSxTQUFKO0FBQUEsUUFDQSxTQURBO0FBQUEsUUFFQSxZQUFhLGNBQWMsT0FBZixHQUEwQixDQUExQixHQUErQixjQUFjLFFBQWYsR0FBMkIsR0FBM0IsR0FBaUMsQ0FGM0U7O0FBSUE7QUFDQSxRQUFJLFdBQVcsVUFBZixFQUEwQjtBQUN4QixrQkFBWSxtQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQUUsZUFBTyxrQkFBbUIsS0FBSyxPQUFPLFlBQVosQ0FBbkIsR0FBZ0QsR0FBdkQ7QUFBNkQsT0FBekY7QUFDQSxrQkFBWSxtQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQUUsZUFBTyxnQkFBZ0IsT0FBTyxXQUF2QixJQUFzQyxHQUF0QyxJQUM1QixVQUFVLENBQVYsRUFBYSxDQUFiLEdBQWlCLFVBQVUsQ0FBVixFQUFhLE1BQWIsR0FBb0IsQ0FBckMsR0FBeUMsQ0FEYixJQUNrQixHQUR6QjtBQUMrQixPQUQzRDtBQUdELEtBTEQsTUFLTyxJQUFJLFdBQVcsWUFBZixFQUE0QjtBQUNqQyxrQkFBWSxtQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFjO0FBQUUsZUFBTyxlQUFnQixLQUFLLE9BQU8sWUFBWixDQUFoQixHQUE2QyxLQUFwRDtBQUE0RCxPQUF4RjtBQUNBLGtCQUFZLG1CQUFTLENBQVQsRUFBVyxDQUFYLEVBQWM7QUFBRSxlQUFPLGdCQUFnQixVQUFVLENBQVYsRUFBYSxLQUFiLEdBQW1CLFNBQW5CLEdBQWdDLFVBQVUsQ0FBVixFQUFhLENBQTdELElBQWtFLEdBQWxFLElBQzVCLE9BQU8sV0FEcUIsSUFDTCxHQURGO0FBQ1EsT0FEcEM7QUFFRDs7QUFFRCxxQkFBTyxZQUFQLENBQW9CLE1BQXBCLEVBQTRCLElBQTVCLEVBQWtDLFNBQWxDLEVBQTZDLElBQTdDLEVBQW1ELFNBQW5ELEVBQThELFVBQTlEO0FBQ0EscUJBQU8sUUFBUCxDQUFnQixHQUFoQixFQUFxQixLQUFyQixFQUE0QixXQUE1QjtBQUNBLFNBQUssVUFBTCxHQUFrQixLQUFsQixDQUF3QixTQUF4QixFQUFtQyxDQUFuQztBQUVEOztBQUdILFNBQU8sS0FBUCxHQUFlLFVBQVMsQ0FBVCxFQUFZO0FBQ3pCLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxLQUFQO0FBQ3ZCLFlBQVEsQ0FBUjtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxLQUFQLEdBQWUsVUFBUyxDQUFULEVBQVk7QUFDekIsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLEtBQVA7QUFDdkIsUUFBSSxFQUFFLE1BQUYsR0FBVyxDQUFYLElBQWdCLEtBQUssQ0FBekIsRUFBNEI7QUFDMUIsY0FBUSxDQUFSO0FBQ0Q7QUFDRCxXQUFPLE1BQVA7QUFDRCxHQU5EOztBQVFBLFNBQU8sWUFBUCxHQUFzQixVQUFTLENBQVQsRUFBWTtBQUNoQyxRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sWUFBUDtBQUN2QixtQkFBZSxDQUFDLENBQWhCO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLE1BQVAsR0FBZ0IsVUFBUyxDQUFULEVBQVk7QUFDMUIsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLE1BQVA7QUFDdkIsYUFBUyxDQUFUO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLFVBQVAsR0FBb0IsVUFBUyxDQUFULEVBQVk7QUFDOUIsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLFVBQVA7QUFDdkIsUUFBSSxLQUFLLE9BQUwsSUFBZ0IsS0FBSyxLQUFyQixJQUE4QixLQUFLLFFBQXZDLEVBQWlEO0FBQy9DLG1CQUFhLENBQWI7QUFDRDtBQUNELFdBQU8sTUFBUDtBQUNELEdBTkQ7O0FBUUEsU0FBTyxXQUFQLEdBQXFCLFVBQVMsQ0FBVCxFQUFZO0FBQy9CLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxXQUFQO0FBQ3ZCLGtCQUFjLE9BQU8sQ0FBUCxLQUFjLFFBQWQsR0FBeUIsc0JBQU8sQ0FBUCxDQUF6QixHQUFxQyxDQUFuRDtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxXQUFQLEdBQXFCLFVBQVMsQ0FBVCxFQUFZO0FBQy9CLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxXQUFQO0FBQ3ZCLGtCQUFjLENBQUMsQ0FBZjtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxjQUFQLEdBQXdCLFVBQVMsQ0FBVCxFQUFZO0FBQ2xDLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxjQUFQO0FBQ3ZCLHFCQUFpQixDQUFqQjtBQUNBLFdBQU8sTUFBUDtBQUNELEdBSkQ7O0FBTUEsU0FBTyxNQUFQLEdBQWdCLFVBQVMsQ0FBVCxFQUFXO0FBQ3pCLFFBQUksQ0FBQyxVQUFVLE1BQWYsRUFBdUIsT0FBTyxNQUFQO0FBQ3ZCLFFBQUksRUFBRSxXQUFGLEVBQUo7QUFDQSxRQUFJLEtBQUssWUFBTCxJQUFxQixLQUFLLFVBQTlCLEVBQTBDO0FBQ3hDLGVBQVMsQ0FBVDtBQUNEO0FBQ0QsV0FBTyxNQUFQO0FBQ0QsR0FQRDs7QUFTQSxTQUFPLFNBQVAsR0FBbUIsVUFBUyxDQUFULEVBQVk7QUFDN0IsUUFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLFNBQVA7QUFDdkIsZ0JBQVksQ0FBQyxDQUFDLENBQWQ7QUFDQSxXQUFPLE1BQVA7QUFDRCxHQUpEOztBQU1BLFNBQU8sV0FBUCxHQUFxQixVQUFTLENBQVQsRUFBWTtBQUMvQixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sV0FBUDtBQUN2QixrQkFBYyxDQUFkO0FBQ0EsV0FBTyxNQUFQO0FBQ0QsR0FKRDs7QUFNQSxTQUFPLEtBQVAsR0FBZSxVQUFTLENBQVQsRUFBWTtBQUN6QixRQUFJLENBQUMsVUFBVSxNQUFmLEVBQXVCLE9BQU8sS0FBUDtBQUN2QixZQUFRLENBQVI7QUFDQSxXQUFPLE1BQVA7QUFDRCxHQUpEOztBQU1BLFNBQU8sRUFBUCxHQUFZLFlBQVU7QUFDcEIsUUFBSSxRQUFRLGlCQUFpQixFQUFqQixDQUFvQixLQUFwQixDQUEwQixnQkFBMUIsRUFBNEMsU0FBNUMsQ0FBWjtBQUNBLFdBQU8sVUFBVSxnQkFBVixHQUE2QixNQUE3QixHQUFzQyxLQUE3QztBQUNELEdBSEQ7O0FBS0EsU0FBTyxNQUFQO0FBRUQ7Ozs7O0FDektEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxHQUFHLFdBQUg7QUFDQSxHQUFHLFVBQUg7QUFDQSxHQUFHLFlBQUg7QUFDQSxHQUFHLGFBQUgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gaHR0cHM6Ly9kM2pzLm9yZy9kMy1hcnJheS8gVmVyc2lvbiAxLjAuMS4gQ29weXJpZ2h0IDIwMTYgTWlrZSBCb3N0b2NrLlxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgoZ2xvYmFsLmQzID0gZ2xvYmFsLmQzIHx8IHt9KSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHtcbiAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IGEgPj0gYiA/IDAgOiBOYU47XG4gIH1cblxuICBmdW5jdGlvbiBiaXNlY3Rvcihjb21wYXJlKSB7XG4gICAgaWYgKGNvbXBhcmUubGVuZ3RoID09PSAxKSBjb21wYXJlID0gYXNjZW5kaW5nQ29tcGFyYXRvcihjb21wYXJlKTtcbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogZnVuY3Rpb24oYSwgeCwgbG8sIGhpKSB7XG4gICAgICAgIGlmIChsbyA9PSBudWxsKSBsbyA9IDA7XG4gICAgICAgIGlmIChoaSA9PSBudWxsKSBoaSA9IGEubGVuZ3RoO1xuICAgICAgICB3aGlsZSAobG8gPCBoaSkge1xuICAgICAgICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgICAgICAgIGlmIChjb21wYXJlKGFbbWlkXSwgeCkgPCAwKSBsbyA9IG1pZCArIDE7XG4gICAgICAgICAgZWxzZSBoaSA9IG1pZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG87XG4gICAgICB9LFxuICAgICAgcmlnaHQ6IGZ1bmN0aW9uKGEsIHgsIGxvLCBoaSkge1xuICAgICAgICBpZiAobG8gPT0gbnVsbCkgbG8gPSAwO1xuICAgICAgICBpZiAoaGkgPT0gbnVsbCkgaGkgPSBhLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgICAgICB2YXIgbWlkID0gbG8gKyBoaSA+Pj4gMTtcbiAgICAgICAgICBpZiAoY29tcGFyZShhW21pZF0sIHgpID4gMCkgaGkgPSBtaWQ7XG4gICAgICAgICAgZWxzZSBsbyA9IG1pZCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBhc2NlbmRpbmdDb21wYXJhdG9yKGYpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZCwgeCkge1xuICAgICAgcmV0dXJuIGFzY2VuZGluZyhmKGQpLCB4KTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0Jpc2VjdCA9IGJpc2VjdG9yKGFzY2VuZGluZyk7XG4gIHZhciBiaXNlY3RSaWdodCA9IGFzY2VuZGluZ0Jpc2VjdC5yaWdodDtcbiAgdmFyIGJpc2VjdExlZnQgPSBhc2NlbmRpbmdCaXNlY3QubGVmdDtcblxuICBmdW5jdGlvbiBkZXNjZW5kaW5nKGEsIGIpIHtcbiAgICByZXR1cm4gYiA8IGEgPyAtMSA6IGIgPiBhID8gMSA6IGIgPj0gYSA/IDAgOiBOYU47XG4gIH1cblxuICBmdW5jdGlvbiBudW1iZXIoeCkge1xuICAgIHJldHVybiB4ID09PSBudWxsID8gTmFOIDogK3g7XG4gIH1cblxuICBmdW5jdGlvbiB2YXJpYW5jZShhcnJheSwgZikge1xuICAgIHZhciBuID0gYXJyYXkubGVuZ3RoLFxuICAgICAgICBtID0gMCxcbiAgICAgICAgYSxcbiAgICAgICAgZCxcbiAgICAgICAgcyA9IDAsXG4gICAgICAgIGkgPSAtMSxcbiAgICAgICAgaiA9IDA7XG5cbiAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBpZiAoIWlzTmFOKGEgPSBudW1iZXIoYXJyYXlbaV0pKSkge1xuICAgICAgICAgIGQgPSBhIC0gbTtcbiAgICAgICAgICBtICs9IGQgLyArK2o7XG4gICAgICAgICAgcyArPSBkICogKGEgLSBtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGVsc2Uge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgaWYgKCFpc05hTihhID0gbnVtYmVyKGYoYXJyYXlbaV0sIGksIGFycmF5KSkpKSB7XG4gICAgICAgICAgZCA9IGEgLSBtO1xuICAgICAgICAgIG0gKz0gZCAvICsrajtcbiAgICAgICAgICBzICs9IGQgKiAoYSAtIG0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGogPiAxKSByZXR1cm4gcyAvIChqIC0gMSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXZpYXRpb24oYXJyYXksIGYpIHtcbiAgICB2YXIgdiA9IHZhcmlhbmNlKGFycmF5LCBmKTtcbiAgICByZXR1cm4gdiA/IE1hdGguc3FydCh2KSA6IHY7XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbnQoYXJyYXksIGYpIHtcbiAgICB2YXIgaSA9IC0xLFxuICAgICAgICBuID0gYXJyYXkubGVuZ3RoLFxuICAgICAgICBhLFxuICAgICAgICBiLFxuICAgICAgICBjO1xuXG4gICAgaWYgKGYgPT0gbnVsbCkge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgoYiA9IGFycmF5W2ldKSAhPSBudWxsICYmIGIgPj0gYikgeyBhID0gYyA9IGI7IGJyZWFrOyB9XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKChiID0gYXJyYXlbaV0pICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGEgPiBiKSBhID0gYjtcbiAgICAgICAgaWYgKGMgPCBiKSBjID0gYjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbHNlIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKGIgPSBmKGFycmF5W2ldLCBpLCBhcnJheSkpICE9IG51bGwgJiYgYiA+PSBiKSB7IGEgPSBjID0gYjsgYnJlYWs7IH1cbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKGIgPSBmKGFycmF5W2ldLCBpLCBhcnJheSkpICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGEgPiBiKSBhID0gYjtcbiAgICAgICAgaWYgKGMgPCBiKSBjID0gYjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2EsIGNdO1xuICB9XG5cbiAgdmFyIGFycmF5ID0gQXJyYXkucHJvdG90eXBlO1xuXG4gIHZhciBzbGljZSA9IGFycmF5LnNsaWNlO1xuICB2YXIgbWFwID0gYXJyYXkubWFwO1xuXG4gIGZ1bmN0aW9uIGNvbnN0YW50KHgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaWRlbnRpdHkoeCkge1xuICAgIHJldHVybiB4O1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBzdGFydCA9ICtzdGFydCwgc3RvcCA9ICtzdG9wLCBzdGVwID0gKG4gPSBhcmd1bWVudHMubGVuZ3RoKSA8IDIgPyAoc3RvcCA9IHN0YXJ0LCBzdGFydCA9IDAsIDEpIDogbiA8IDMgPyAxIDogK3N0ZXA7XG5cbiAgICB2YXIgaSA9IC0xLFxuICAgICAgICBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCkpIHwgMCxcbiAgICAgICAgcmFuZ2UgPSBuZXcgQXJyYXkobik7XG5cbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgcmFuZ2VbaV0gPSBzdGFydCArIGkgKiBzdGVwO1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfVxuXG4gIHZhciBlMTAgPSBNYXRoLnNxcnQoNTApO1xuICB2YXIgZTUgPSBNYXRoLnNxcnQoMTApO1xuICB2YXIgZTIgPSBNYXRoLnNxcnQoMik7XG4gIGZ1bmN0aW9uIHRpY2tzKHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICAgIHZhciBzdGVwID0gdGlja1N0ZXAoc3RhcnQsIHN0b3AsIGNvdW50KTtcbiAgICByZXR1cm4gcmFuZ2UoXG4gICAgICBNYXRoLmNlaWwoc3RhcnQgLyBzdGVwKSAqIHN0ZXAsXG4gICAgICBNYXRoLmZsb29yKHN0b3AgLyBzdGVwKSAqIHN0ZXAgKyBzdGVwIC8gMiwgLy8gaW5jbHVzaXZlXG4gICAgICBzdGVwXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpY2tTdGVwKHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICAgIHZhciBzdGVwMCA9IE1hdGguYWJzKHN0b3AgLSBzdGFydCkgLyBNYXRoLm1heCgwLCBjb3VudCksXG4gICAgICAgIHN0ZXAxID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2coc3RlcDApIC8gTWF0aC5MTjEwKSksXG4gICAgICAgIGVycm9yID0gc3RlcDAgLyBzdGVwMTtcbiAgICBpZiAoZXJyb3IgPj0gZTEwKSBzdGVwMSAqPSAxMDtcbiAgICBlbHNlIGlmIChlcnJvciA+PSBlNSkgc3RlcDEgKj0gNTtcbiAgICBlbHNlIGlmIChlcnJvciA+PSBlMikgc3RlcDEgKj0gMjtcbiAgICByZXR1cm4gc3RvcCA8IHN0YXJ0ID8gLXN0ZXAxIDogc3RlcDE7XG4gIH1cblxuICBmdW5jdGlvbiBzdHVyZ2VzKHZhbHVlcykge1xuICAgIHJldHVybiBNYXRoLmNlaWwoTWF0aC5sb2codmFsdWVzLmxlbmd0aCkgLyBNYXRoLkxOMikgKyAxO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlzdG9ncmFtKCkge1xuICAgIHZhciB2YWx1ZSA9IGlkZW50aXR5LFxuICAgICAgICBkb21haW4gPSBleHRlbnQsXG4gICAgICAgIHRocmVzaG9sZCA9IHN0dXJnZXM7XG5cbiAgICBmdW5jdGlvbiBoaXN0b2dyYW0oZGF0YSkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAgbiA9IGRhdGEubGVuZ3RoLFxuICAgICAgICAgIHgsXG4gICAgICAgICAgdmFsdWVzID0gbmV3IEFycmF5KG4pO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlKGRhdGFbaV0sIGksIGRhdGEpO1xuICAgICAgfVxuXG4gICAgICB2YXIgeHogPSBkb21haW4odmFsdWVzKSxcbiAgICAgICAgICB4MCA9IHh6WzBdLFxuICAgICAgICAgIHgxID0geHpbMV0sXG4gICAgICAgICAgdHogPSB0aHJlc2hvbGQodmFsdWVzLCB4MCwgeDEpO1xuXG4gICAgICAvLyBDb252ZXJ0IG51bWJlciBvZiB0aHJlc2hvbGRzIGludG8gdW5pZm9ybSB0aHJlc2hvbGRzLlxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHR6KSkgdHogPSB0aWNrcyh4MCwgeDEsIHR6KTtcblxuICAgICAgLy8gUmVtb3ZlIGFueSB0aHJlc2hvbGRzIG91dHNpZGUgdGhlIGRvbWFpbi5cbiAgICAgIHZhciBtID0gdHoubGVuZ3RoO1xuICAgICAgd2hpbGUgKHR6WzBdIDw9IHgwKSB0ei5zaGlmdCgpLCAtLW07XG4gICAgICB3aGlsZSAodHpbbSAtIDFdID49IHgxKSB0ei5wb3AoKSwgLS1tO1xuXG4gICAgICB2YXIgYmlucyA9IG5ldyBBcnJheShtICsgMSksXG4gICAgICAgICAgYmluO1xuXG4gICAgICAvLyBJbml0aWFsaXplIGJpbnMuXG4gICAgICBmb3IgKGkgPSAwOyBpIDw9IG07ICsraSkge1xuICAgICAgICBiaW4gPSBiaW5zW2ldID0gW107XG4gICAgICAgIGJpbi54MCA9IGkgPiAwID8gdHpbaSAtIDFdIDogeDA7XG4gICAgICAgIGJpbi54MSA9IGkgPCBtID8gdHpbaV0gOiB4MTtcbiAgICAgIH1cblxuICAgICAgLy8gQXNzaWduIGRhdGEgdG8gYmlucyBieSB2YWx1ZSwgaWdub3JpbmcgYW55IG91dHNpZGUgdGhlIGRvbWFpbi5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgeCA9IHZhbHVlc1tpXTtcbiAgICAgICAgaWYgKHgwIDw9IHggJiYgeCA8PSB4MSkge1xuICAgICAgICAgIGJpbnNbYmlzZWN0UmlnaHQodHosIHgsIDAsIG0pXS5wdXNoKGRhdGFbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBiaW5zO1xuICAgIH1cblxuICAgIGhpc3RvZ3JhbS52YWx1ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHZhbHVlID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudChfKSwgaGlzdG9ncmFtKSA6IHZhbHVlO1xuICAgIH07XG5cbiAgICBoaXN0b2dyYW0uZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZG9tYWluID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudChbX1swXSwgX1sxXV0pLCBoaXN0b2dyYW0pIDogZG9tYWluO1xuICAgIH07XG5cbiAgICBoaXN0b2dyYW0udGhyZXNob2xkcyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHRocmVzaG9sZCA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogQXJyYXkuaXNBcnJheShfKSA/IGNvbnN0YW50KHNsaWNlLmNhbGwoXykpIDogY29uc3RhbnQoXyksIGhpc3RvZ3JhbSkgOiB0aHJlc2hvbGQ7XG4gICAgfTtcblxuICAgIHJldHVybiBoaXN0b2dyYW07XG4gIH1cblxuICBmdW5jdGlvbiBxdWFudGlsZShhcnJheSwgcCwgZikge1xuICAgIGlmIChmID09IG51bGwpIGYgPSBudW1iZXI7XG4gICAgaWYgKCEobiA9IGFycmF5Lmxlbmd0aCkpIHJldHVybjtcbiAgICBpZiAoKHAgPSArcCkgPD0gMCB8fCBuIDwgMikgcmV0dXJuICtmKGFycmF5WzBdLCAwLCBhcnJheSk7XG4gICAgaWYgKHAgPj0gMSkgcmV0dXJuICtmKGFycmF5W24gLSAxXSwgbiAtIDEsIGFycmF5KTtcbiAgICB2YXIgbixcbiAgICAgICAgaCA9IChuIC0gMSkgKiBwLFxuICAgICAgICBpID0gTWF0aC5mbG9vcihoKSxcbiAgICAgICAgYSA9ICtmKGFycmF5W2ldLCBpLCBhcnJheSksXG4gICAgICAgIGIgPSArZihhcnJheVtpICsgMV0sIGkgKyAxLCBhcnJheSk7XG4gICAgcmV0dXJuIGEgKyAoYiAtIGEpICogKGggLSBpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZyZWVkbWFuRGlhY29uaXModmFsdWVzLCBtaW4sIG1heCkge1xuICAgIHZhbHVlcyA9IG1hcC5jYWxsKHZhbHVlcywgbnVtYmVyKS5zb3J0KGFzY2VuZGluZyk7XG4gICAgcmV0dXJuIE1hdGguY2VpbCgobWF4IC0gbWluKSAvICgyICogKHF1YW50aWxlKHZhbHVlcywgMC43NSkgLSBxdWFudGlsZSh2YWx1ZXMsIDAuMjUpKSAqIE1hdGgucG93KHZhbHVlcy5sZW5ndGgsIC0xIC8gMykpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjb3R0KHZhbHVlcywgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKChtYXggLSBtaW4pIC8gKDMuNSAqIGRldmlhdGlvbih2YWx1ZXMpICogTWF0aC5wb3codmFsdWVzLmxlbmd0aCwgLTEgLyAzKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWF4KGFycmF5LCBmKSB7XG4gICAgdmFyIGkgPSAtMSxcbiAgICAgICAgbiA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAgYSxcbiAgICAgICAgYjtcblxuICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKGIgPSBhcnJheVtpXSkgIT0gbnVsbCAmJiBiID49IGIpIHsgYSA9IGI7IGJyZWFrOyB9XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKChiID0gYXJyYXlbaV0pICE9IG51bGwgJiYgYiA+IGEpIGEgPSBiO1xuICAgIH1cblxuICAgIGVsc2Uge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgoYiA9IGYoYXJyYXlbaV0sIGksIGFycmF5KSkgIT0gbnVsbCAmJiBiID49IGIpIHsgYSA9IGI7IGJyZWFrOyB9XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKChiID0gZihhcnJheVtpXSwgaSwgYXJyYXkpKSAhPSBudWxsICYmIGIgPiBhKSBhID0gYjtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYW4oYXJyYXksIGYpIHtcbiAgICB2YXIgcyA9IDAsXG4gICAgICAgIG4gPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIGEsXG4gICAgICAgIGkgPSAtMSxcbiAgICAgICAgaiA9IG47XG5cbiAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFpc05hTihhID0gbnVtYmVyKGFycmF5W2ldKSkpIHMgKz0gYTsgZWxzZSAtLWo7XG4gICAgfVxuXG4gICAgZWxzZSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFpc05hTihhID0gbnVtYmVyKGYoYXJyYXlbaV0sIGksIGFycmF5KSkpKSBzICs9IGE7IGVsc2UgLS1qO1xuICAgIH1cblxuICAgIGlmIChqKSByZXR1cm4gcyAvIGo7XG4gIH1cblxuICBmdW5jdGlvbiBtZWRpYW4oYXJyYXksIGYpIHtcbiAgICB2YXIgbnVtYmVycyA9IFtdLFxuICAgICAgICBuID0gYXJyYXkubGVuZ3RoLFxuICAgICAgICBhLFxuICAgICAgICBpID0gLTE7XG5cbiAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFpc05hTihhID0gbnVtYmVyKGFycmF5W2ldKSkpIG51bWJlcnMucHVzaChhKTtcbiAgICB9XG5cbiAgICBlbHNlIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWlzTmFOKGEgPSBudW1iZXIoZihhcnJheVtpXSwgaSwgYXJyYXkpKSkpIG51bWJlcnMucHVzaChhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVhbnRpbGUobnVtYmVycy5zb3J0KGFzY2VuZGluZyksIDAuNSk7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZShhcnJheXMpIHtcbiAgICB2YXIgbiA9IGFycmF5cy5sZW5ndGgsXG4gICAgICAgIG0sXG4gICAgICAgIGkgPSAtMSxcbiAgICAgICAgaiA9IDAsXG4gICAgICAgIG1lcmdlZCxcbiAgICAgICAgYXJyYXk7XG5cbiAgICB3aGlsZSAoKytpIDwgbikgaiArPSBhcnJheXNbaV0ubGVuZ3RoO1xuICAgIG1lcmdlZCA9IG5ldyBBcnJheShqKTtcblxuICAgIHdoaWxlICgtLW4gPj0gMCkge1xuICAgICAgYXJyYXkgPSBhcnJheXNbbl07XG4gICAgICBtID0gYXJyYXkubGVuZ3RoO1xuICAgICAgd2hpbGUgKC0tbSA+PSAwKSB7XG4gICAgICAgIG1lcmdlZFstLWpdID0gYXJyYXlbbV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lcmdlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1pbihhcnJheSwgZikge1xuICAgIHZhciBpID0gLTEsXG4gICAgICAgIG4gPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIGEsXG4gICAgICAgIGI7XG5cbiAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKChiID0gYXJyYXlbaV0pICE9IG51bGwgJiYgYiA+PSBiKSB7IGEgPSBiOyBicmVhazsgfVxuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgoYiA9IGFycmF5W2ldKSAhPSBudWxsICYmIGEgPiBiKSBhID0gYjtcbiAgICB9XG5cbiAgICBlbHNlIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKGIgPSBmKGFycmF5W2ldLCBpLCBhcnJheSkpICE9IG51bGwgJiYgYiA+PSBiKSB7IGEgPSBiOyBicmVhazsgfVxuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgoYiA9IGYoYXJyYXlbaV0sIGksIGFycmF5KSkgIT0gbnVsbCAmJiBhID4gYikgYSA9IGI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBmdW5jdGlvbiBwYWlycyhhcnJheSkge1xuICAgIHZhciBpID0gMCwgbiA9IGFycmF5Lmxlbmd0aCAtIDEsIHAgPSBhcnJheVswXSwgcGFpcnMgPSBuZXcgQXJyYXkobiA8IDAgPyAwIDogbik7XG4gICAgd2hpbGUgKGkgPCBuKSBwYWlyc1tpXSA9IFtwLCBwID0gYXJyYXlbKytpXV07XG4gICAgcmV0dXJuIHBhaXJzO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVybXV0ZShhcnJheSwgaW5kZXhlcykge1xuICAgIHZhciBpID0gaW5kZXhlcy5sZW5ndGgsIHBlcm11dGVzID0gbmV3IEFycmF5KGkpO1xuICAgIHdoaWxlIChpLS0pIHBlcm11dGVzW2ldID0gYXJyYXlbaW5kZXhlc1tpXV07XG4gICAgcmV0dXJuIHBlcm11dGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gc2NhbihhcnJheSwgY29tcGFyZSkge1xuICAgIGlmICghKG4gPSBhcnJheS5sZW5ndGgpKSByZXR1cm47XG4gICAgdmFyIGkgPSAwLFxuICAgICAgICBuLFxuICAgICAgICBqID0gMCxcbiAgICAgICAgeGksXG4gICAgICAgIHhqID0gYXJyYXlbal07XG5cbiAgICBpZiAoIWNvbXBhcmUpIGNvbXBhcmUgPSBhc2NlbmRpbmc7XG5cbiAgICB3aGlsZSAoKytpIDwgbikgaWYgKGNvbXBhcmUoeGkgPSBhcnJheVtpXSwgeGopIDwgMCB8fCBjb21wYXJlKHhqLCB4aikgIT09IDApIHhqID0geGksIGogPSBpO1xuXG4gICAgaWYgKGNvbXBhcmUoeGosIHhqKSA9PT0gMCkgcmV0dXJuIGo7XG4gIH1cblxuICBmdW5jdGlvbiBzaHVmZmxlKGFycmF5LCBpMCwgaTEpIHtcbiAgICB2YXIgbSA9IChpMSA9PSBudWxsID8gYXJyYXkubGVuZ3RoIDogaTEpIC0gKGkwID0gaTAgPT0gbnVsbCA/IDAgOiAraTApLFxuICAgICAgICB0LFxuICAgICAgICBpO1xuXG4gICAgd2hpbGUgKG0pIHtcbiAgICAgIGkgPSBNYXRoLnJhbmRvbSgpICogbS0tIHwgMDtcbiAgICAgIHQgPSBhcnJheVttICsgaTBdO1xuICAgICAgYXJyYXlbbSArIGkwXSA9IGFycmF5W2kgKyBpMF07XG4gICAgICBhcnJheVtpICsgaTBdID0gdDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICBmdW5jdGlvbiBzdW0oYXJyYXksIGYpIHtcbiAgICB2YXIgcyA9IDAsXG4gICAgICAgIG4gPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIGEsXG4gICAgICAgIGkgPSAtMTtcblxuICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoYSA9ICthcnJheVtpXSkgcyArPSBhOyAvLyBOb3RlOiB6ZXJvIGFuZCBudWxsIGFyZSBlcXVpdmFsZW50LlxuICAgIH1cblxuICAgIGVsc2Uge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmIChhID0gK2YoYXJyYXlbaV0sIGksIGFycmF5KSkgcyArPSBhO1xuICAgIH1cblxuICAgIHJldHVybiBzO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNwb3NlKG1hdHJpeCkge1xuICAgIGlmICghKG4gPSBtYXRyaXgubGVuZ3RoKSkgcmV0dXJuIFtdO1xuICAgIGZvciAodmFyIGkgPSAtMSwgbSA9IG1pbihtYXRyaXgsIGxlbmd0aCksIHRyYW5zcG9zZSA9IG5ldyBBcnJheShtKTsgKytpIDwgbTspIHtcbiAgICAgIGZvciAodmFyIGogPSAtMSwgbiwgcm93ID0gdHJhbnNwb3NlW2ldID0gbmV3IEFycmF5KG4pOyArK2ogPCBuOykge1xuICAgICAgICByb3dbal0gPSBtYXRyaXhbal1baV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cmFuc3Bvc2U7XG4gIH1cblxuICBmdW5jdGlvbiBsZW5ndGgoZCkge1xuICAgIHJldHVybiBkLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHppcCgpIHtcbiAgICByZXR1cm4gdHJhbnNwb3NlKGFyZ3VtZW50cyk7XG4gIH1cblxuICBleHBvcnRzLmJpc2VjdCA9IGJpc2VjdFJpZ2h0O1xuICBleHBvcnRzLmJpc2VjdFJpZ2h0ID0gYmlzZWN0UmlnaHQ7XG4gIGV4cG9ydHMuYmlzZWN0TGVmdCA9IGJpc2VjdExlZnQ7XG4gIGV4cG9ydHMuYXNjZW5kaW5nID0gYXNjZW5kaW5nO1xuICBleHBvcnRzLmJpc2VjdG9yID0gYmlzZWN0b3I7XG4gIGV4cG9ydHMuZGVzY2VuZGluZyA9IGRlc2NlbmRpbmc7XG4gIGV4cG9ydHMuZGV2aWF0aW9uID0gZGV2aWF0aW9uO1xuICBleHBvcnRzLmV4dGVudCA9IGV4dGVudDtcbiAgZXhwb3J0cy5oaXN0b2dyYW0gPSBoaXN0b2dyYW07XG4gIGV4cG9ydHMudGhyZXNob2xkRnJlZWRtYW5EaWFjb25pcyA9IGZyZWVkbWFuRGlhY29uaXM7XG4gIGV4cG9ydHMudGhyZXNob2xkU2NvdHQgPSBzY290dDtcbiAgZXhwb3J0cy50aHJlc2hvbGRTdHVyZ2VzID0gc3R1cmdlcztcbiAgZXhwb3J0cy5tYXggPSBtYXg7XG4gIGV4cG9ydHMubWVhbiA9IG1lYW47XG4gIGV4cG9ydHMubWVkaWFuID0gbWVkaWFuO1xuICBleHBvcnRzLm1lcmdlID0gbWVyZ2U7XG4gIGV4cG9ydHMubWluID0gbWluO1xuICBleHBvcnRzLnBhaXJzID0gcGFpcnM7XG4gIGV4cG9ydHMucGVybXV0ZSA9IHBlcm11dGU7XG4gIGV4cG9ydHMucXVhbnRpbGUgPSBxdWFudGlsZTtcbiAgZXhwb3J0cy5yYW5nZSA9IHJhbmdlO1xuICBleHBvcnRzLnNjYW4gPSBzY2FuO1xuICBleHBvcnRzLnNodWZmbGUgPSBzaHVmZmxlO1xuICBleHBvcnRzLnN1bSA9IHN1bTtcbiAgZXhwb3J0cy50aWNrcyA9IHRpY2tzO1xuICBleHBvcnRzLnRpY2tTdGVwID0gdGlja1N0ZXA7XG4gIGV4cG9ydHMudHJhbnNwb3NlID0gdHJhbnNwb3NlO1xuICBleHBvcnRzLnZhcmlhbmNlID0gdmFyaWFuY2U7XG4gIGV4cG9ydHMuemlwID0gemlwO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKTsiLCIvLyBodHRwczovL2QzanMub3JnL2QzLWNvbGxlY3Rpb24vIFZlcnNpb24gMS4wLjEuIENvcHlyaWdodCAyMDE2IE1pa2UgQm9zdG9jay5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgKGZhY3RvcnkoKGdsb2JhbC5kMyA9IGdsb2JhbC5kMyB8fCB7fSkpKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBwcmVmaXggPSBcIiRcIjtcblxuICBmdW5jdGlvbiBNYXAoKSB7fVxuXG4gIE1hcC5wcm90b3R5cGUgPSBtYXAucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBNYXAsXG4gICAgaGFzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiAocHJlZml4ICsga2V5KSBpbiB0aGlzO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzW3ByZWZpeCArIGtleV07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHRoaXNbcHJlZml4ICsga2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIHByb3BlcnR5ID0gcHJlZml4ICsga2V5O1xuICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRoaXMgJiYgZGVsZXRlIHRoaXNbcHJvcGVydHldO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcykgaWYgKHByb3BlcnR5WzBdID09PSBwcmVmaXgpIGRlbGV0ZSB0aGlzW3Byb3BlcnR5XTtcbiAgICB9LFxuICAgIGtleXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMpIGlmIChwcm9wZXJ0eVswXSA9PT0gcHJlZml4KSBrZXlzLnB1c2gocHJvcGVydHkuc2xpY2UoMSkpO1xuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcykgaWYgKHByb3BlcnR5WzBdID09PSBwcmVmaXgpIHZhbHVlcy5wdXNoKHRoaXNbcHJvcGVydHldKTtcbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfSxcbiAgICBlbnRyaWVzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbnRyaWVzID0gW107XG4gICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgZW50cmllcy5wdXNoKHtrZXk6IHByb3BlcnR5LnNsaWNlKDEpLCB2YWx1ZTogdGhpc1twcm9wZXJ0eV19KTtcbiAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgIH0sXG4gICAgc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2l6ZSA9IDA7XG4gICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgKytzaXplO1xuICAgICAgcmV0dXJuIHNpemU7XG4gICAgfSxcbiAgICBlbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBlYWNoOiBmdW5jdGlvbihmKSB7XG4gICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgZih0aGlzW3Byb3BlcnR5XSwgcHJvcGVydHkuc2xpY2UoMSksIHRoaXMpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBtYXAob2JqZWN0LCBmKSB7XG4gICAgdmFyIG1hcCA9IG5ldyBNYXA7XG5cbiAgICAvLyBDb3B5IGNvbnN0cnVjdG9yLlxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNYXApIG9iamVjdC5lYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHsgbWFwLnNldChrZXksIHZhbHVlKTsgfSk7XG5cbiAgICAvLyBJbmRleCBhcnJheSBieSBudW1lcmljIGluZGV4IG9yIHNwZWNpZmllZCBrZXkgZnVuY3Rpb24uXG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgIG4gPSBvYmplY3QubGVuZ3RoLFxuICAgICAgICAgIG87XG5cbiAgICAgIGlmIChmID09IG51bGwpIHdoaWxlICgrK2kgPCBuKSBtYXAuc2V0KGksIG9iamVjdFtpXSk7XG4gICAgICBlbHNlIHdoaWxlICgrK2kgPCBuKSBtYXAuc2V0KGYobyA9IG9iamVjdFtpXSwgaSwgb2JqZWN0KSwgbyk7XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCBvYmplY3QgdG8gbWFwLlxuICAgIGVsc2UgaWYgKG9iamVjdCkgZm9yICh2YXIga2V5IGluIG9iamVjdCkgbWFwLnNldChrZXksIG9iamVjdFtrZXldKTtcblxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBmdW5jdGlvbiBuZXN0KCkge1xuICAgIHZhciBrZXlzID0gW10sXG4gICAgICAgIHNvcnRLZXlzID0gW10sXG4gICAgICAgIHNvcnRWYWx1ZXMsXG4gICAgICAgIHJvbGx1cCxcbiAgICAgICAgbmVzdDtcblxuICAgIGZ1bmN0aW9uIGFwcGx5KGFycmF5LCBkZXB0aCwgY3JlYXRlUmVzdWx0LCBzZXRSZXN1bHQpIHtcbiAgICAgIGlmIChkZXB0aCA+PSBrZXlzLmxlbmd0aCkgcmV0dXJuIHJvbGx1cCAhPSBudWxsXG4gICAgICAgICAgPyByb2xsdXAoYXJyYXkpIDogKHNvcnRWYWx1ZXMgIT0gbnVsbFxuICAgICAgICAgID8gYXJyYXkuc29ydChzb3J0VmFsdWVzKVxuICAgICAgICAgIDogYXJyYXkpO1xuXG4gICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgIG4gPSBhcnJheS5sZW5ndGgsXG4gICAgICAgICAga2V5ID0ga2V5c1tkZXB0aCsrXSxcbiAgICAgICAgICBrZXlWYWx1ZSxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICB2YWx1ZXNCeUtleSA9IG1hcCgpLFxuICAgICAgICAgIHZhbHVlcyxcbiAgICAgICAgICByZXN1bHQgPSBjcmVhdGVSZXN1bHQoKTtcblxuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgaWYgKHZhbHVlcyA9IHZhbHVlc0J5S2V5LmdldChrZXlWYWx1ZSA9IGtleSh2YWx1ZSA9IGFycmF5W2ldKSArIFwiXCIpKSB7XG4gICAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlc0J5S2V5LnNldChrZXlWYWx1ZSwgW3ZhbHVlXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFsdWVzQnlLZXkuZWFjaChmdW5jdGlvbih2YWx1ZXMsIGtleSkge1xuICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCBrZXksIGFwcGx5KHZhbHVlcywgZGVwdGgsIGNyZWF0ZVJlc3VsdCwgc2V0UmVzdWx0KSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbnRyaWVzKG1hcCwgZGVwdGgpIHtcbiAgICAgIGlmICgrK2RlcHRoID4ga2V5cy5sZW5ndGgpIHJldHVybiBtYXA7XG4gICAgICB2YXIgYXJyYXksIHNvcnRLZXkgPSBzb3J0S2V5c1tkZXB0aCAtIDFdO1xuICAgICAgaWYgKHJvbGx1cCAhPSBudWxsICYmIGRlcHRoID49IGtleXMubGVuZ3RoKSBhcnJheSA9IG1hcC5lbnRyaWVzKCk7XG4gICAgICBlbHNlIGFycmF5ID0gW10sIG1hcC5lYWNoKGZ1bmN0aW9uKHYsIGspIHsgYXJyYXkucHVzaCh7a2V5OiBrLCB2YWx1ZXM6IGVudHJpZXModiwgZGVwdGgpfSk7IH0pO1xuICAgICAgcmV0dXJuIHNvcnRLZXkgIT0gbnVsbCA/IGFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gc29ydEtleShhLmtleSwgYi5rZXkpOyB9KSA6IGFycmF5O1xuICAgIH1cblxuICAgIHJldHVybiBuZXN0ID0ge1xuICAgICAgb2JqZWN0OiBmdW5jdGlvbihhcnJheSkgeyByZXR1cm4gYXBwbHkoYXJyYXksIDAsIGNyZWF0ZU9iamVjdCwgc2V0T2JqZWN0KTsgfSxcbiAgICAgIG1hcDogZnVuY3Rpb24oYXJyYXkpIHsgcmV0dXJuIGFwcGx5KGFycmF5LCAwLCBjcmVhdGVNYXAsIHNldE1hcCk7IH0sXG4gICAgICBlbnRyaWVzOiBmdW5jdGlvbihhcnJheSkgeyByZXR1cm4gZW50cmllcyhhcHBseShhcnJheSwgMCwgY3JlYXRlTWFwLCBzZXRNYXApLCAwKTsgfSxcbiAgICAgIGtleTogZnVuY3Rpb24oZCkgeyBrZXlzLnB1c2goZCk7IHJldHVybiBuZXN0OyB9LFxuICAgICAgc29ydEtleXM6IGZ1bmN0aW9uKG9yZGVyKSB7IHNvcnRLZXlzW2tleXMubGVuZ3RoIC0gMV0gPSBvcmRlcjsgcmV0dXJuIG5lc3Q7IH0sXG4gICAgICBzb3J0VmFsdWVzOiBmdW5jdGlvbihvcmRlcikgeyBzb3J0VmFsdWVzID0gb3JkZXI7IHJldHVybiBuZXN0OyB9LFxuICAgICAgcm9sbHVwOiBmdW5jdGlvbihmKSB7IHJvbGx1cCA9IGY7IHJldHVybiBuZXN0OyB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdCgpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBmdW5jdGlvbiBzZXRPYmplY3Qob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU1hcCgpIHtcbiAgICByZXR1cm4gbWFwKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRNYXAobWFwLCBrZXksIHZhbHVlKSB7XG4gICAgbWFwLnNldChrZXksIHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFNldCgpIHt9XG5cbiAgdmFyIHByb3RvID0gbWFwLnByb3RvdHlwZTtcblxuICBTZXQucHJvdG90eXBlID0gc2V0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogU2V0LFxuICAgIGhhczogcHJvdG8uaGFzLFxuICAgIGFkZDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhbHVlICs9IFwiXCI7XG4gICAgICB0aGlzW3ByZWZpeCArIHZhbHVlXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICByZW1vdmU6IHByb3RvLnJlbW92ZSxcbiAgICBjbGVhcjogcHJvdG8uY2xlYXIsXG4gICAgdmFsdWVzOiBwcm90by5rZXlzLFxuICAgIHNpemU6IHByb3RvLnNpemUsXG4gICAgZW1wdHk6IHByb3RvLmVtcHR5LFxuICAgIGVhY2g6IHByb3RvLmVhY2hcbiAgfTtcblxuICBmdW5jdGlvbiBzZXQob2JqZWN0LCBmKSB7XG4gICAgdmFyIHNldCA9IG5ldyBTZXQ7XG5cbiAgICAvLyBDb3B5IGNvbnN0cnVjdG9yLlxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBTZXQpIG9iamVjdC5lYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IHNldC5hZGQodmFsdWUpOyB9KTtcblxuICAgIC8vIE90aGVyd2lzZSwgYXNzdW1lIGl04oCZcyBhbiBhcnJheS5cbiAgICBlbHNlIGlmIChvYmplY3QpIHtcbiAgICAgIHZhciBpID0gLTEsIG4gPSBvYmplY3QubGVuZ3RoO1xuICAgICAgaWYgKGYgPT0gbnVsbCkgd2hpbGUgKCsraSA8IG4pIHNldC5hZGQob2JqZWN0W2ldKTtcbiAgICAgIGVsc2Ugd2hpbGUgKCsraSA8IG4pIHNldC5hZGQoZihvYmplY3RbaV0sIGksIG9iamVjdCkpO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICBmdW5jdGlvbiBrZXlzKG1hcCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG1hcCkga2V5cy5wdXNoKGtleSk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH1cblxuICBmdW5jdGlvbiB2YWx1ZXMobWFwKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBtYXApIHZhbHVlcy5wdXNoKG1hcFtrZXldKTtcbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG5cbiAgZnVuY3Rpb24gZW50cmllcyhtYXApIHtcbiAgICB2YXIgZW50cmllcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBtYXApIGVudHJpZXMucHVzaCh7a2V5OiBrZXksIHZhbHVlOiBtYXBba2V5XX0pO1xuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG5cbiAgZXhwb3J0cy5uZXN0ID0gbmVzdDtcbiAgZXhwb3J0cy5zZXQgPSBzZXQ7XG4gIGV4cG9ydHMubWFwID0gbWFwO1xuICBleHBvcnRzLmtleXMgPSBrZXlzO1xuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcbiAgZXhwb3J0cy5lbnRyaWVzID0gZW50cmllcztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSk7IiwiLy8gaHR0cHM6Ly9kM2pzLm9yZy9kMy1jb2xvci8gVmVyc2lvbiAxLjAuMS4gQ29weXJpZ2h0IDIwMTYgTWlrZSBCb3N0b2NrLlxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgoZ2xvYmFsLmQzID0gZ2xvYmFsLmQzIHx8IHt9KSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKGNvbnN0cnVjdG9yLCBmYWN0b3J5LCBwcm90b3R5cGUpIHtcbiAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBmYWN0b3J5LnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICBwcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZChwYXJlbnQsIGRlZmluaXRpb24pIHtcbiAgICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGVmaW5pdGlvbikgcHJvdG90eXBlW2tleV0gPSBkZWZpbml0aW9uW2tleV07XG4gICAgcmV0dXJuIHByb3RvdHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbG9yKCkge31cblxuICB2YXIgZGFya2VyID0gMC43O1xuICB2YXIgYnJpZ2h0ZXIgPSAxIC8gZGFya2VyO1xuXG4gIHZhciByZUhleDMgPSAvXiMoWzAtOWEtZl17M30pJC87XG4gIHZhciByZUhleDYgPSAvXiMoWzAtOWEtZl17Nn0pJC87XG4gIHZhciByZVJnYkludGVnZXIgPSAvXnJnYlxcKFxccyooWy0rXT9cXGQrKVxccyosXFxzKihbLStdP1xcZCspXFxzKixcXHMqKFstK10/XFxkKylcXHMqXFwpJC87XG4gIHZhciByZVJnYlBlcmNlbnQgPSAvXnJnYlxcKFxccyooWy0rXT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooWy0rXT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooWy0rXT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqXFwpJC87XG4gIHZhciByZVJnYmFJbnRlZ2VyID0gL15yZ2JhXFwoXFxzKihbLStdP1xcZCspXFxzKixcXHMqKFstK10/XFxkKylcXHMqLFxccyooWy0rXT9cXGQrKVxccyosXFxzKihbLStdP1xcZCsoPzpcXC5cXGQrKT8pXFxzKlxcKSQvO1xuICB2YXIgcmVSZ2JhUGVyY2VudCA9IC9ecmdiYVxcKFxccyooWy0rXT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooWy0rXT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooWy0rXT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooWy0rXT9cXGQrKD86XFwuXFxkKyk/KVxccypcXCkkLztcbiAgdmFyIHJlSHNsUGVyY2VudCA9IC9eaHNsXFwoXFxzKihbLStdP1xcZCsoPzpcXC5cXGQrKT8pXFxzKixcXHMqKFstK10/XFxkKyg/OlxcLlxcZCspPyklXFxzKixcXHMqKFstK10/XFxkKyg/OlxcLlxcZCspPyklXFxzKlxcKSQvO1xuICB2YXIgcmVIc2xhUGVyY2VudCA9IC9eaHNsYVxcKFxccyooWy0rXT9cXGQrKD86XFwuXFxkKyk/KVxccyosXFxzKihbLStdP1xcZCsoPzpcXC5cXGQrKT8pJVxccyosXFxzKihbLStdP1xcZCsoPzpcXC5cXGQrKT8pJVxccyosXFxzKihbLStdP1xcZCsoPzpcXC5cXGQrKT8pXFxzKlxcKSQvO1xuICB2YXIgbmFtZWQgPSB7XG4gICAgYWxpY2VibHVlOiAweGYwZjhmZixcbiAgICBhbnRpcXVld2hpdGU6IDB4ZmFlYmQ3LFxuICAgIGFxdWE6IDB4MDBmZmZmLFxuICAgIGFxdWFtYXJpbmU6IDB4N2ZmZmQ0LFxuICAgIGF6dXJlOiAweGYwZmZmZixcbiAgICBiZWlnZTogMHhmNWY1ZGMsXG4gICAgYmlzcXVlOiAweGZmZTRjNCxcbiAgICBibGFjazogMHgwMDAwMDAsXG4gICAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICAgIGJsdWU6IDB4MDAwMGZmLFxuICAgIGJsdWV2aW9sZXQ6IDB4OGEyYmUyLFxuICAgIGJyb3duOiAweGE1MmEyYSxcbiAgICBidXJseXdvb2Q6IDB4ZGViODg3LFxuICAgIGNhZGV0Ymx1ZTogMHg1ZjllYTAsXG4gICAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gICAgY2hvY29sYXRlOiAweGQyNjkxZSxcbiAgICBjb3JhbDogMHhmZjdmNTAsXG4gICAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICAgIGNvcm5zaWxrOiAweGZmZjhkYyxcbiAgICBjcmltc29uOiAweGRjMTQzYyxcbiAgICBjeWFuOiAweDAwZmZmZixcbiAgICBkYXJrYmx1ZTogMHgwMDAwOGIsXG4gICAgZGFya2N5YW46IDB4MDA4YjhiLFxuICAgIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICAgIGRhcmtncmF5OiAweGE5YTlhOSxcbiAgICBkYXJrZ3JlZW46IDB4MDA2NDAwLFxuICAgIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgICBkYXJra2hha2k6IDB4YmRiNzZiLFxuICAgIGRhcmttYWdlbnRhOiAweDhiMDA4YixcbiAgICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gICAgZGFya29yYW5nZTogMHhmZjhjMDAsXG4gICAgZGFya29yY2hpZDogMHg5OTMyY2MsXG4gICAgZGFya3JlZDogMHg4YjAwMDAsXG4gICAgZGFya3NhbG1vbjogMHhlOTk2N2EsXG4gICAgZGFya3NlYWdyZWVuOiAweDhmYmM4ZixcbiAgICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgICBkYXJrc2xhdGVncmF5OiAweDJmNGY0ZixcbiAgICBkYXJrc2xhdGVncmV5OiAweDJmNGY0ZixcbiAgICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgICBkYXJrdmlvbGV0OiAweDk0MDBkMyxcbiAgICBkZWVwcGluazogMHhmZjE0OTMsXG4gICAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICAgIGRpbWdyYXk6IDB4Njk2OTY5LFxuICAgIGRpbWdyZXk6IDB4Njk2OTY5LFxuICAgIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICAgIGZpcmVicmljazogMHhiMjIyMjIsXG4gICAgZmxvcmFsd2hpdGU6IDB4ZmZmYWYwLFxuICAgIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgICBmdWNoc2lhOiAweGZmMDBmZixcbiAgICBnYWluc2Jvcm86IDB4ZGNkY2RjLFxuICAgIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICAgIGdvbGQ6IDB4ZmZkNzAwLFxuICAgIGdvbGRlbnJvZDogMHhkYWE1MjAsXG4gICAgZ3JheTogMHg4MDgwODAsXG4gICAgZ3JlZW46IDB4MDA4MDAwLFxuICAgIGdyZWVueWVsbG93OiAweGFkZmYyZixcbiAgICBncmV5OiAweDgwODA4MCxcbiAgICBob25leWRldzogMHhmMGZmZjAsXG4gICAgaG90cGluazogMHhmZjY5YjQsXG4gICAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgICBpbmRpZ286IDB4NGIwMDgyLFxuICAgIGl2b3J5OiAweGZmZmZmMCxcbiAgICBraGFraTogMHhmMGU2OGMsXG4gICAgbGF2ZW5kZXI6IDB4ZTZlNmZhLFxuICAgIGxhdmVuZGVyYmx1c2g6IDB4ZmZmMGY1LFxuICAgIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gICAgbGVtb25jaGlmZm9uOiAweGZmZmFjZCxcbiAgICBsaWdodGJsdWU6IDB4YWRkOGU2LFxuICAgIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICAgIGxpZ2h0Y3lhbjogMHhlMGZmZmYsXG4gICAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6IDB4ZmFmYWQyLFxuICAgIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gICAgbGlnaHRncmVlbjogMHg5MGVlOTAsXG4gICAgbGlnaHRncmV5OiAweGQzZDNkMyxcbiAgICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICAgIGxpZ2h0c2FsbW9uOiAweGZmYTA3YSxcbiAgICBsaWdodHNlYWdyZWVuOiAweDIwYjJhYSxcbiAgICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICAgIGxpZ2h0c2xhdGVncmF5OiAweDc3ODg5OSxcbiAgICBsaWdodHNsYXRlZ3JleTogMHg3Nzg4OTksXG4gICAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICAgIGxpZ2h0eWVsbG93OiAweGZmZmZlMCxcbiAgICBsaW1lOiAweDAwZmYwMCxcbiAgICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICAgIGxpbmVuOiAweGZhZjBlNixcbiAgICBtYWdlbnRhOiAweGZmMDBmZixcbiAgICBtYXJvb246IDB4ODAwMDAwLFxuICAgIG1lZGl1bWFxdWFtYXJpbmU6IDB4NjZjZGFhLFxuICAgIG1lZGl1bWJsdWU6IDB4MDAwMGNkLFxuICAgIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gICAgbWVkaXVtcHVycGxlOiAweDkzNzBkYixcbiAgICBtZWRpdW1zZWFncmVlbjogMHgzY2IzNzEsXG4gICAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgICBtZWRpdW1zcHJpbmdncmVlbjogMHgwMGZhOWEsXG4gICAgbWVkaXVtdHVycXVvaXNlOiAweDQ4ZDFjYyxcbiAgICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICAgIG1pZG5pZ2h0Ymx1ZTogMHgxOTE5NzAsXG4gICAgbWludGNyZWFtOiAweGY1ZmZmYSxcbiAgICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICAgIG1vY2Nhc2luOiAweGZmZTRiNSxcbiAgICBuYXZham93aGl0ZTogMHhmZmRlYWQsXG4gICAgbmF2eTogMHgwMDAwODAsXG4gICAgb2xkbGFjZTogMHhmZGY1ZTYsXG4gICAgb2xpdmU6IDB4ODA4MDAwLFxuICAgIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gICAgb3JhbmdlOiAweGZmYTUwMCxcbiAgICBvcmFuZ2VyZWQ6IDB4ZmY0NTAwLFxuICAgIG9yY2hpZDogMHhkYTcwZDYsXG4gICAgcGFsZWdvbGRlbnJvZDogMHhlZWU4YWEsXG4gICAgcGFsZWdyZWVuOiAweDk4ZmI5OCxcbiAgICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgICBwYWxldmlvbGV0cmVkOiAweGRiNzA5MyxcbiAgICBwYXBheWF3aGlwOiAweGZmZWZkNSxcbiAgICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICAgIHBlcnU6IDB4Y2Q4NTNmLFxuICAgIHBpbms6IDB4ZmZjMGNiLFxuICAgIHBsdW06IDB4ZGRhMGRkLFxuICAgIHBvd2RlcmJsdWU6IDB4YjBlMGU2LFxuICAgIHB1cnBsZTogMHg4MDAwODAsXG4gICAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gICAgcmVkOiAweGZmMDAwMCxcbiAgICByb3N5YnJvd246IDB4YmM4ZjhmLFxuICAgIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gICAgc2FkZGxlYnJvd246IDB4OGI0NTEzLFxuICAgIHNhbG1vbjogMHhmYTgwNzIsXG4gICAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gICAgc2VhZ3JlZW46IDB4MmU4YjU3LFxuICAgIHNlYXNoZWxsOiAweGZmZjVlZSxcbiAgICBzaWVubmE6IDB4YTA1MjJkLFxuICAgIHNpbHZlcjogMHhjMGMwYzAsXG4gICAgc2t5Ymx1ZTogMHg4N2NlZWIsXG4gICAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgICBzbGF0ZWdyYXk6IDB4NzA4MDkwLFxuICAgIHNsYXRlZ3JleTogMHg3MDgwOTAsXG4gICAgc25vdzogMHhmZmZhZmEsXG4gICAgc3ByaW5nZ3JlZW46IDB4MDBmZjdmLFxuICAgIHN0ZWVsYmx1ZTogMHg0NjgyYjQsXG4gICAgdGFuOiAweGQyYjQ4YyxcbiAgICB0ZWFsOiAweDAwODA4MCxcbiAgICB0aGlzdGxlOiAweGQ4YmZkOCxcbiAgICB0b21hdG86IDB4ZmY2MzQ3LFxuICAgIHR1cnF1b2lzZTogMHg0MGUwZDAsXG4gICAgdmlvbGV0OiAweGVlODJlZSxcbiAgICB3aGVhdDogMHhmNWRlYjMsXG4gICAgd2hpdGU6IDB4ZmZmZmZmLFxuICAgIHdoaXRlc21va2U6IDB4ZjVmNWY1LFxuICAgIHllbGxvdzogMHhmZmZmMDAsXG4gICAgeWVsbG93Z3JlZW46IDB4OWFjZDMyXG4gIH07XG5cbiAgZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICAgIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnJnYigpLmRpc3BsYXlhYmxlKCk7XG4gICAgfSxcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZ2IoKSArIFwiXCI7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBjb2xvcihmb3JtYXQpIHtcbiAgICB2YXIgbTtcbiAgICBmb3JtYXQgPSAoZm9ybWF0ICsgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIChtID0gcmVIZXgzLmV4ZWMoZm9ybWF0KSkgPyAobSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweDBmMCksIChtID4+IDQgJiAweGYpIHwgKG0gJiAweGYwKSwgKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSwgMSkpIC8vICNmMDBcbiAgICAgICAgOiAobSA9IHJlSGV4Ni5leGVjKGZvcm1hdCkpID8gcmdibihwYXJzZUludChtWzFdLCAxNikpIC8vICNmZjAwMDBcbiAgICAgICAgOiAobSA9IHJlUmdiSW50ZWdlci5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdLCBtWzJdLCBtWzNdLCAxKSAvLyByZ2IoMjU1LCAwLCAwKVxuICAgICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICAgIDogKG0gPSByZVJnYmFJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0sIG1bMl0sIG1bM10sIG1bNF0pIC8vIHJnYmEoMjU1LCAwLCAwLCAxKVxuICAgICAgICA6IChtID0gcmVSZ2JhUGVyY2VudC5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCBtWzRdKSAvLyByZ2IoMTAwJSwgMCUsIDAlLCAxKVxuICAgICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgICA6IChtID0gcmVIc2xhUGVyY2VudC5leGVjKGZvcm1hdCkpID8gaHNsYShtWzFdLCBtWzJdIC8gMTAwLCBtWzNdIC8gMTAwLCBtWzRdKSAvLyBoc2xhKDEyMCwgNTAlLCA1MCUsIDEpXG4gICAgICAgIDogbmFtZWQuaGFzT3duUHJvcGVydHkoZm9ybWF0KSA/IHJnYm4obmFtZWRbZm9ybWF0XSlcbiAgICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgICAgOiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gcmdibihuKSB7XG4gICAgcmV0dXJuIG5ldyBSZ2IobiA+PiAxNiAmIDB4ZmYsIG4gPj4gOCAmIDB4ZmYsIG4gJiAweGZmLCAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICAgIGlmIChhIDw9IDApIHIgPSBnID0gYiA9IE5hTjtcbiAgICByZXR1cm4gbmV3IFJnYihyLCBnLCBiLCBhKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJnYkNvbnZlcnQobykge1xuICAgIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgICBpZiAoIW8pIHJldHVybiBuZXcgUmdiO1xuICAgIG8gPSBvLnJnYigpO1xuICAgIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG4gIH1cblxuICBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gcmdiQ29udmVydChyKSA6IG5ldyBSZ2IociwgZywgYiwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xuICB9XG5cbiAgZnVuY3Rpb24gUmdiKHIsIGcsIGIsIG9wYWNpdHkpIHtcbiAgICB0aGlzLnIgPSArcjtcbiAgICB0aGlzLmcgPSArZztcbiAgICB0aGlzLmIgPSArYjtcbiAgICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbiAgfVxuXG4gIGRlZmluZShSZ2IsIHJnYiwgZXh0ZW5kKENvbG9yLCB7XG4gICAgYnJpZ2h0ZXI6IGZ1bmN0aW9uKGspIHtcbiAgICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICAgIHJldHVybiBuZXcgUmdiKHRoaXMuciAqIGssIHRoaXMuZyAqIGssIHRoaXMuYiAqIGssIHRoaXMub3BhY2l0eSk7XG4gICAgfSxcbiAgICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICAgIGsgPSBrID09IG51bGwgPyBkYXJrZXIgOiBNYXRoLnBvdyhkYXJrZXIsIGspO1xuICAgICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgICB9LFxuICAgIHJnYjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoMCA8PSB0aGlzLnIgJiYgdGhpcy5yIDw9IDI1NSlcbiAgICAgICAgICAmJiAoMCA8PSB0aGlzLmcgJiYgdGhpcy5nIDw9IDI1NSlcbiAgICAgICAgICAmJiAoMCA8PSB0aGlzLmIgJiYgdGhpcy5iIDw9IDI1NSlcbiAgICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICAgIH0sXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGEgPSB0aGlzLm9wYWNpdHk7IGEgPSBpc05hTihhKSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBhKSk7XG4gICAgICByZXR1cm4gKGEgPT09IDEgPyBcInJnYihcIiA6IFwicmdiYShcIilcbiAgICAgICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh0aGlzLnIpIHx8IDApKSArIFwiLCBcIlxuICAgICAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHRoaXMuZykgfHwgMCkpICsgXCIsIFwiXG4gICAgICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodGhpcy5iKSB8fCAwKSlcbiAgICAgICAgICArIChhID09PSAxID8gXCIpXCIgOiBcIiwgXCIgKyBhICsgXCIpXCIpO1xuICAgIH1cbiAgfSkpO1xuXG4gIGZ1bmN0aW9uIGhzbGEoaCwgcywgbCwgYSkge1xuICAgIGlmIChhIDw9IDApIGggPSBzID0gbCA9IE5hTjtcbiAgICBlbHNlIGlmIChsIDw9IDAgfHwgbCA+PSAxKSBoID0gcyA9IE5hTjtcbiAgICBlbHNlIGlmIChzIDw9IDApIGggPSBOYU47XG4gICAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgYSk7XG4gIH1cblxuICBmdW5jdGlvbiBoc2xDb252ZXJ0KG8pIHtcbiAgICBpZiAobyBpbnN0YW5jZW9mIEhzbCkgcmV0dXJuIG5ldyBIc2woby5oLCBvLnMsIG8ubCwgby5vcGFjaXR5KTtcbiAgICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gICAgaWYgKCFvKSByZXR1cm4gbmV3IEhzbDtcbiAgICBpZiAobyBpbnN0YW5jZW9mIEhzbCkgcmV0dXJuIG87XG4gICAgbyA9IG8ucmdiKCk7XG4gICAgdmFyIHIgPSBvLnIgLyAyNTUsXG4gICAgICAgIGcgPSBvLmcgLyAyNTUsXG4gICAgICAgIGIgPSBvLmIgLyAyNTUsXG4gICAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgaCA9IE5hTixcbiAgICAgICAgcyA9IG1heCAtIG1pbixcbiAgICAgICAgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgICBpZiAocykge1xuICAgICAgaWYgKHIgPT09IG1heCkgaCA9IChnIC0gYikgLyBzICsgKGcgPCBiKSAqIDY7XG4gICAgICBlbHNlIGlmIChnID09PSBtYXgpIGggPSAoYiAtIHIpIC8gcyArIDI7XG4gICAgICBlbHNlIGggPSAociAtIGcpIC8gcyArIDQ7XG4gICAgICBzIC89IGwgPCAwLjUgPyBtYXggKyBtaW4gOiAyIC0gbWF4IC0gbWluO1xuICAgICAgaCAqPSA2MDtcbiAgICB9IGVsc2Uge1xuICAgICAgcyA9IGwgPiAwICYmIGwgPCAxID8gMCA6IGg7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIG8ub3BhY2l0eSk7XG4gIH1cblxuICBmdW5jdGlvbiBoc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gaHNsQ29udmVydChoKSA6IG5ldyBIc2woaCwgcywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xuICB9XG5cbiAgZnVuY3Rpb24gSHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgICB0aGlzLmggPSAraDtcbiAgICB0aGlzLnMgPSArcztcbiAgICB0aGlzLmwgPSArbDtcbiAgICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbiAgfVxuXG4gIGRlZmluZShIc2wsIGhzbCwgZXh0ZW5kKENvbG9yLCB7XG4gICAgYnJpZ2h0ZXI6IGZ1bmN0aW9uKGspIHtcbiAgICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICAgIHJldHVybiBuZXcgSHNsKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICAgIH0sXG4gICAgZGFya2VyOiBmdW5jdGlvbihrKSB7XG4gICAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICAgIHJldHVybiBuZXcgSHNsKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICAgIH0sXG4gICAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoID0gdGhpcy5oICUgMzYwICsgKHRoaXMuaCA8IDApICogMzYwLFxuICAgICAgICAgIHMgPSBpc05hTihoKSB8fCBpc05hTih0aGlzLnMpID8gMCA6IHRoaXMucyxcbiAgICAgICAgICBsID0gdGhpcy5sLFxuICAgICAgICAgIG0yID0gbCArIChsIDwgMC41ID8gbCA6IDEgLSBsKSAqIHMsXG4gICAgICAgICAgbTEgPSAyICogbCAtIG0yO1xuICAgICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICAgIGhzbDJyZ2IoaCA+PSAyNDAgPyBoIC0gMjQwIDogaCArIDEyMCwgbTEsIG0yKSxcbiAgICAgICAgaHNsMnJnYihoLCBtMSwgbTIpLFxuICAgICAgICBoc2wycmdiKGggPCAxMjAgPyBoICsgMjQwIDogaCAtIDEyMCwgbTEsIG0yKSxcbiAgICAgICAgdGhpcy5vcGFjaXR5XG4gICAgICApO1xuICAgIH0sXG4gICAgZGlzcGxheWFibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICgwIDw9IHRoaXMucyAmJiB0aGlzLnMgPD0gMSB8fCBpc05hTih0aGlzLnMpKVxuICAgICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICAgIH1cbiAgfSkpO1xuXG4gIC8qIEZyb20gRnZEIDEzLjM3LCBDU1MgQ29sb3IgTW9kdWxlIExldmVsIDMgKi9cbiAgZnVuY3Rpb24gaHNsMnJnYihoLCBtMSwgbTIpIHtcbiAgICByZXR1cm4gKGggPCA2MCA/IG0xICsgKG0yIC0gbTEpICogaCAvIDYwXG4gICAgICAgIDogaCA8IDE4MCA/IG0yXG4gICAgICAgIDogaCA8IDI0MCA/IG0xICsgKG0yIC0gbTEpICogKDI0MCAtIGgpIC8gNjBcbiAgICAgICAgOiBtMSkgKiAyNTU7XG4gIH1cblxuICB2YXIgZGVnMnJhZCA9IE1hdGguUEkgLyAxODA7XG4gIHZhciByYWQyZGVnID0gMTgwIC8gTWF0aC5QSTtcblxuICB2YXIgS24gPSAxODtcbiAgdmFyIFhuID0gMC45NTA0NzA7XG4gIHZhciBZbiA9IDE7XG4gIHZhciBabiA9IDEuMDg4ODMwO1xuICB2YXIgdDAgPSA0IC8gMjk7XG4gIHZhciB0MSA9IDYgLyAyOTtcbiAgdmFyIHQyID0gMyAqIHQxICogdDE7XG4gIHZhciB0MyA9IHQxICogdDEgKiB0MTtcbiAgZnVuY3Rpb24gbGFiQ29udmVydChvKSB7XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBMYWIpIHJldHVybiBuZXcgTGFiKG8ubCwgby5hLCBvLmIsIG8ub3BhY2l0eSk7XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBIY2wpIHtcbiAgICAgIHZhciBoID0gby5oICogZGVnMnJhZDtcbiAgICAgIHJldHVybiBuZXcgTGFiKG8ubCwgTWF0aC5jb3MoaCkgKiBvLmMsIE1hdGguc2luKGgpICogby5jLCBvLm9wYWNpdHkpO1xuICAgIH1cbiAgICBpZiAoIShvIGluc3RhbmNlb2YgUmdiKSkgbyA9IHJnYkNvbnZlcnQobyk7XG4gICAgdmFyIGIgPSByZ2IyeHl6KG8uciksXG4gICAgICAgIGEgPSByZ2IyeHl6KG8uZyksXG4gICAgICAgIGwgPSByZ2IyeHl6KG8uYiksXG4gICAgICAgIHggPSB4eXoybGFiKCgwLjQxMjQ1NjQgKiBiICsgMC4zNTc1NzYxICogYSArIDAuMTgwNDM3NSAqIGwpIC8gWG4pLFxuICAgICAgICB5ID0geHl6MmxhYigoMC4yMTI2NzI5ICogYiArIDAuNzE1MTUyMiAqIGEgKyAwLjA3MjE3NTAgKiBsKSAvIFluKSxcbiAgICAgICAgeiA9IHh5ejJsYWIoKDAuMDE5MzMzOSAqIGIgKyAwLjExOTE5MjAgKiBhICsgMC45NTAzMDQxICogbCkgLyBabik7XG4gICAgcmV0dXJuIG5ldyBMYWIoMTE2ICogeSAtIDE2LCA1MDAgKiAoeCAtIHkpLCAyMDAgKiAoeSAtIHopLCBvLm9wYWNpdHkpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGFiKGwsIGEsIGIsIG9wYWNpdHkpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGxhYkNvbnZlcnQobCkgOiBuZXcgTGFiKGwsIGEsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIExhYihsLCBhLCBiLCBvcGFjaXR5KSB7XG4gICAgdGhpcy5sID0gK2w7XG4gICAgdGhpcy5hID0gK2E7XG4gICAgdGhpcy5iID0gK2I7XG4gICAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG4gIH1cblxuICBkZWZpbmUoTGFiLCBsYWIsIGV4dGVuZChDb2xvciwge1xuICAgIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgICByZXR1cm4gbmV3IExhYih0aGlzLmwgKyBLbiAqIChrID09IG51bGwgPyAxIDogayksIHRoaXMuYSwgdGhpcy5iLCB0aGlzLm9wYWNpdHkpO1xuICAgIH0sXG4gICAgZGFya2VyOiBmdW5jdGlvbihrKSB7XG4gICAgICByZXR1cm4gbmV3IExhYih0aGlzLmwgLSBLbiAqIChrID09IG51bGwgPyAxIDogayksIHRoaXMuYSwgdGhpcy5iLCB0aGlzLm9wYWNpdHkpO1xuICAgIH0sXG4gICAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB5ID0gKHRoaXMubCArIDE2KSAvIDExNixcbiAgICAgICAgICB4ID0gaXNOYU4odGhpcy5hKSA/IHkgOiB5ICsgdGhpcy5hIC8gNTAwLFxuICAgICAgICAgIHogPSBpc05hTih0aGlzLmIpID8geSA6IHkgLSB0aGlzLmIgLyAyMDA7XG4gICAgICB5ID0gWW4gKiBsYWIyeHl6KHkpO1xuICAgICAgeCA9IFhuICogbGFiMnh5eih4KTtcbiAgICAgIHogPSBabiAqIGxhYjJ4eXooeik7XG4gICAgICByZXR1cm4gbmV3IFJnYihcbiAgICAgICAgeHl6MnJnYiggMy4yNDA0NTQyICogeCAtIDEuNTM3MTM4NSAqIHkgLSAwLjQ5ODUzMTQgKiB6KSwgLy8gRDY1IC0+IHNSR0JcbiAgICAgICAgeHl6MnJnYigtMC45NjkyNjYwICogeCArIDEuODc2MDEwOCAqIHkgKyAwLjA0MTU1NjAgKiB6KSxcbiAgICAgICAgeHl6MnJnYiggMC4wNTU2NDM0ICogeCAtIDAuMjA0MDI1OSAqIHkgKyAxLjA1NzIyNTIgKiB6KSxcbiAgICAgICAgdGhpcy5vcGFjaXR5XG4gICAgICApO1xuICAgIH1cbiAgfSkpO1xuXG4gIGZ1bmN0aW9uIHh5ejJsYWIodCkge1xuICAgIHJldHVybiB0ID4gdDMgPyBNYXRoLnBvdyh0LCAxIC8gMykgOiB0IC8gdDIgKyB0MDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxhYjJ4eXoodCkge1xuICAgIHJldHVybiB0ID4gdDEgPyB0ICogdCAqIHQgOiB0MiAqICh0IC0gdDApO1xuICB9XG5cbiAgZnVuY3Rpb24geHl6MnJnYih4KSB7XG4gICAgcmV0dXJuIDI1NSAqICh4IDw9IDAuMDAzMTMwOCA/IDEyLjkyICogeCA6IDEuMDU1ICogTWF0aC5wb3coeCwgMSAvIDIuNCkgLSAwLjA1NSk7XG4gIH1cblxuICBmdW5jdGlvbiByZ2IyeHl6KHgpIHtcbiAgICByZXR1cm4gKHggLz0gMjU1KSA8PSAwLjA0MDQ1ID8geCAvIDEyLjkyIDogTWF0aC5wb3coKHggKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhjbENvbnZlcnQobykge1xuICAgIGlmIChvIGluc3RhbmNlb2YgSGNsKSByZXR1cm4gbmV3IEhjbChvLmgsIG8uYywgby5sLCBvLm9wYWNpdHkpO1xuICAgIGlmICghKG8gaW5zdGFuY2VvZiBMYWIpKSBvID0gbGFiQ29udmVydChvKTtcbiAgICB2YXIgaCA9IE1hdGguYXRhbjIoby5iLCBvLmEpICogcmFkMmRlZztcbiAgICByZXR1cm4gbmV3IEhjbChoIDwgMCA/IGggKyAzNjAgOiBoLCBNYXRoLnNxcnQoby5hICogby5hICsgby5iICogby5iKSwgby5sLCBvLm9wYWNpdHkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGNsKGgsIGMsIGwsIG9wYWNpdHkpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGhjbENvbnZlcnQoaCkgOiBuZXcgSGNsKGgsIGMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEhjbChoLCBjLCBsLCBvcGFjaXR5KSB7XG4gICAgdGhpcy5oID0gK2g7XG4gICAgdGhpcy5jID0gK2M7XG4gICAgdGhpcy5sID0gK2w7XG4gICAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG4gIH1cblxuICBkZWZpbmUoSGNsLCBoY2wsIGV4dGVuZChDb2xvciwge1xuICAgIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgICByZXR1cm4gbmV3IEhjbCh0aGlzLmgsIHRoaXMuYywgdGhpcy5sICsgS24gKiAoayA9PSBudWxsID8gMSA6IGspLCB0aGlzLm9wYWNpdHkpO1xuICAgIH0sXG4gICAgZGFya2VyOiBmdW5jdGlvbihrKSB7XG4gICAgICByZXR1cm4gbmV3IEhjbCh0aGlzLmgsIHRoaXMuYywgdGhpcy5sIC0gS24gKiAoayA9PSBudWxsID8gMSA6IGspLCB0aGlzLm9wYWNpdHkpO1xuICAgIH0sXG4gICAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBsYWJDb252ZXJ0KHRoaXMpLnJnYigpO1xuICAgIH1cbiAgfSkpO1xuXG4gIHZhciBBID0gLTAuMTQ4NjE7XG4gIHZhciBCID0gKzEuNzgyNzc7XG4gIHZhciBDID0gLTAuMjkyMjc7XG4gIHZhciBEID0gLTAuOTA2NDk7XG4gIHZhciBFID0gKzEuOTcyOTQ7XG4gIHZhciBFRCA9IEUgKiBEO1xuICB2YXIgRUIgPSBFICogQjtcbiAgdmFyIEJDX0RBID0gQiAqIEMgLSBEICogQTtcbiAgZnVuY3Rpb24gY3ViZWhlbGl4Q29udmVydChvKSB7XG4gICAgaWYgKG8gaW5zdGFuY2VvZiBDdWJlaGVsaXgpIHJldHVybiBuZXcgQ3ViZWhlbGl4KG8uaCwgby5zLCBvLmwsIG8ub3BhY2l0eSk7XG4gICAgaWYgKCEobyBpbnN0YW5jZW9mIFJnYikpIG8gPSByZ2JDb252ZXJ0KG8pO1xuICAgIHZhciByID0gby5yIC8gMjU1LFxuICAgICAgICBnID0gby5nIC8gMjU1LFxuICAgICAgICBiID0gby5iIC8gMjU1LFxuICAgICAgICBsID0gKEJDX0RBICogYiArIEVEICogciAtIEVCICogZykgLyAoQkNfREEgKyBFRCAtIEVCKSxcbiAgICAgICAgYmwgPSBiIC0gbCxcbiAgICAgICAgayA9IChFICogKGcgLSBsKSAtIEMgKiBibCkgLyBELFxuICAgICAgICBzID0gTWF0aC5zcXJ0KGsgKiBrICsgYmwgKiBibCkgLyAoRSAqIGwgKiAoMSAtIGwpKSwgLy8gTmFOIGlmIGw9MCBvciBsPTFcbiAgICAgICAgaCA9IHMgPyBNYXRoLmF0YW4yKGssIGJsKSAqIHJhZDJkZWcgLSAxMjAgOiBOYU47XG4gICAgcmV0dXJuIG5ldyBDdWJlaGVsaXgoaCA8IDAgPyBoICsgMzYwIDogaCwgcywgbCwgby5vcGFjaXR5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGN1YmVoZWxpeChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBjdWJlaGVsaXhDb252ZXJ0KGgpIDogbmV3IEN1YmVoZWxpeChoLCBzLCBsLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG4gIH1cblxuICBmdW5jdGlvbiBDdWJlaGVsaXgoaCwgcywgbCwgb3BhY2l0eSkge1xuICAgIHRoaXMuaCA9ICtoO1xuICAgIHRoaXMucyA9ICtzO1xuICAgIHRoaXMubCA9ICtsO1xuICAgIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xuICB9XG5cbiAgZGVmaW5lKEN1YmVoZWxpeCwgY3ViZWhlbGl4LCBleHRlbmQoQ29sb3IsIHtcbiAgICBicmlnaHRlcjogZnVuY3Rpb24oaykge1xuICAgICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgICAgcmV0dXJuIG5ldyBDdWJlaGVsaXgodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gICAgfSxcbiAgICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICAgIGsgPSBrID09IG51bGwgPyBkYXJrZXIgOiBNYXRoLnBvdyhkYXJrZXIsIGspO1xuICAgICAgcmV0dXJuIG5ldyBDdWJlaGVsaXgodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gICAgfSxcbiAgICByZ2I6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGggPSBpc05hTih0aGlzLmgpID8gMCA6ICh0aGlzLmggKyAxMjApICogZGVnMnJhZCxcbiAgICAgICAgICBsID0gK3RoaXMubCxcbiAgICAgICAgICBhID0gaXNOYU4odGhpcy5zKSA/IDAgOiB0aGlzLnMgKiBsICogKDEgLSBsKSxcbiAgICAgICAgICBjb3NoID0gTWF0aC5jb3MoaCksXG4gICAgICAgICAgc2luaCA9IE1hdGguc2luKGgpO1xuICAgICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICAgIDI1NSAqIChsICsgYSAqIChBICogY29zaCArIEIgKiBzaW5oKSksXG4gICAgICAgIDI1NSAqIChsICsgYSAqIChDICogY29zaCArIEQgKiBzaW5oKSksXG4gICAgICAgIDI1NSAqIChsICsgYSAqIChFICogY29zaCkpLFxuICAgICAgICB0aGlzLm9wYWNpdHlcbiAgICAgICk7XG4gICAgfVxuICB9KSk7XG5cbiAgZXhwb3J0cy5jb2xvciA9IGNvbG9yO1xuICBleHBvcnRzLnJnYiA9IHJnYjtcbiAgZXhwb3J0cy5oc2wgPSBoc2w7XG4gIGV4cG9ydHMubGFiID0gbGFiO1xuICBleHBvcnRzLmhjbCA9IGhjbDtcbiAgZXhwb3J0cy5jdWJlaGVsaXggPSBjdWJlaGVsaXg7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpOyIsIi8vIGh0dHBzOi8vZDNqcy5vcmcvZDMtZGlzcGF0Y2gvIFZlcnNpb24gMS4wLjEuIENvcHlyaWdodCAyMDE2IE1pa2UgQm9zdG9jay5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgKGZhY3RvcnkoKGdsb2JhbC5kMyA9IGdsb2JhbC5kMyB8fCB7fSkpKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBub29wID0ge3ZhbHVlOiBmdW5jdGlvbigpIHt9fTtcblxuICBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IGFyZ3VtZW50cy5sZW5ndGgsIF8gPSB7fSwgdDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKCEodCA9IGFyZ3VtZW50c1tpXSArIFwiXCIpIHx8ICh0IGluIF8pKSB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIHR5cGU6IFwiICsgdCk7XG4gICAgICBfW3RdID0gW107XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGlzcGF0Y2goXyk7XG4gIH1cblxuICBmdW5jdGlvbiBEaXNwYXRjaChfKSB7XG4gICAgdGhpcy5fID0gXztcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcywgdHlwZXMpIHtcbiAgICByZXR1cm4gdHlwZW5hbWVzLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHZhciBuYW1lID0gXCJcIiwgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgICAgaWYgKHQgJiYgIXR5cGVzLmhhc093blByb3BlcnR5KHQpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdCk7XG4gICAgICByZXR1cm4ge3R5cGU6IHQsIG5hbWU6IG5hbWV9O1xuICAgIH0pO1xuICB9XG5cbiAgRGlzcGF0Y2gucHJvdG90eXBlID0gZGlzcGF0Y2gucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBEaXNwYXRjaCxcbiAgICBvbjogZnVuY3Rpb24odHlwZW5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgXyA9IHRoaXMuXyxcbiAgICAgICAgICBUID0gcGFyc2VUeXBlbmFtZXModHlwZW5hbWUgKyBcIlwiLCBfKSxcbiAgICAgICAgICB0LFxuICAgICAgICAgIGkgPSAtMSxcbiAgICAgICAgICBuID0gVC5sZW5ndGg7XG5cbiAgICAgIC8vIElmIG5vIGNhbGxiYWNrIHdhcyBzcGVjaWZpZWQsIHJldHVybiB0aGUgY2FsbGJhY2sgb2YgdGhlIGdpdmVuIHR5cGUgYW5kIG5hbWUuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpICYmICh0ID0gZ2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUpKSkgcmV0dXJuIHQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYSB0eXBlIHdhcyBzcGVjaWZpZWQsIHNldCB0aGUgY2FsbGJhY2sgZm9yIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBpZiBhIG51bGwgY2FsbGJhY2sgd2FzIHNwZWNpZmllZCwgcmVtb3ZlIGNhbGxiYWNrcyBvZiB0aGUgZ2l2ZW4gbmFtZS5cbiAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGNhbGxiYWNrOiBcIiArIGNhbGxiYWNrKTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGlmICh0ID0gKHR5cGVuYW1lID0gVFtpXSkudHlwZSkgX1t0XSA9IHNldChfW3RdLCB0eXBlbmFtZS5uYW1lLCBjYWxsYmFjayk7XG4gICAgICAgIGVsc2UgaWYgKGNhbGxiYWNrID09IG51bGwpIGZvciAodCBpbiBfKSBfW3RdID0gc2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUsIG51bGwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNvcHkgPSB7fSwgXyA9IHRoaXMuXztcbiAgICAgIGZvciAodmFyIHQgaW4gXykgY29weVt0XSA9IF9bdF0uc2xpY2UoKTtcbiAgICAgIHJldHVybiBuZXcgRGlzcGF0Y2goY29weSk7XG4gICAgfSxcbiAgICBjYWxsOiBmdW5jdGlvbih0eXBlLCB0aGF0KSB7XG4gICAgICBpZiAoKG4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMikgPiAwKSBmb3IgKHZhciBhcmdzID0gbmV3IEFycmF5KG4pLCBpID0gMCwgbiwgdDsgaSA8IG47ICsraSkgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgICBpZiAoIXRoaXMuXy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHR5cGUpO1xuICAgICAgZm9yICh0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgIH0sXG4gICAgYXBwbHk6IGZ1bmN0aW9uKHR5cGUsIHRoYXQsIGFyZ3MpIHtcbiAgICAgIGlmICghdGhpcy5fLmhhc093blByb3BlcnR5KHR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdHlwZSk7XG4gICAgICBmb3IgKHZhciB0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBnZXQodHlwZSwgbmFtZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gdHlwZS5sZW5ndGgsIGM7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgoYyA9IHR5cGVbaV0pLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGMudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KHR5cGUsIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0eXBlLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKHR5cGVbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICB0eXBlW2ldID0gbm9vcCwgdHlwZSA9IHR5cGUuc2xpY2UoMCwgaSkuY29uY2F0KHR5cGUuc2xpY2UoaSArIDEpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB0eXBlLnB1c2goe25hbWU6IG5hbWUsIHZhbHVlOiBjYWxsYmFja30pO1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgZXhwb3J0cy5kaXNwYXRjaCA9IGRpc3BhdGNoO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKTsiLCIvLyBodHRwczovL2QzanMub3JnL2QzLWZvcm1hdC8gVmVyc2lvbiAxLjAuMi4gQ29weXJpZ2h0IDIwMTYgTWlrZSBCb3N0b2NrLlxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgoZ2xvYmFsLmQzID0gZ2xvYmFsLmQzIHx8IHt9KSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ29tcHV0ZXMgdGhlIGRlY2ltYWwgY29lZmZpY2llbnQgYW5kIGV4cG9uZW50IG9mIHRoZSBzcGVjaWZpZWQgbnVtYmVyIHggd2l0aFxuICAvLyBzaWduaWZpY2FudCBkaWdpdHMgcCwgd2hlcmUgeCBpcyBwb3NpdGl2ZSBhbmQgcCBpcyBpbiBbMSwgMjFdIG9yIHVuZGVmaW5lZC5cbiAgLy8gRm9yIGV4YW1wbGUsIGZvcm1hdERlY2ltYWwoMS4yMykgcmV0dXJucyBbXCIxMjNcIiwgMF0uXG4gIGZ1bmN0aW9uIGZvcm1hdERlY2ltYWwoeCwgcCkge1xuICAgIGlmICgoaSA9ICh4ID0gcCA/IHgudG9FeHBvbmVudGlhbChwIC0gMSkgOiB4LnRvRXhwb25lbnRpYWwoKSkuaW5kZXhPZihcImVcIikpIDwgMCkgcmV0dXJuIG51bGw7IC8vIE5hTiwgwrFJbmZpbml0eVxuICAgIHZhciBpLCBjb2VmZmljaWVudCA9IHguc2xpY2UoMCwgaSk7XG5cbiAgICAvLyBUaGUgc3RyaW5nIHJldHVybmVkIGJ5IHRvRXhwb25lbnRpYWwgZWl0aGVyIGhhcyB0aGUgZm9ybSBcXGRcXC5cXGQrZVstK11cXGQrXG4gICAgLy8gKGUuZy4sIDEuMmUrMykgb3IgdGhlIGZvcm0gXFxkZVstK11cXGQrIChlLmcuLCAxZSszKS5cbiAgICByZXR1cm4gW1xuICAgICAgY29lZmZpY2llbnQubGVuZ3RoID4gMSA/IGNvZWZmaWNpZW50WzBdICsgY29lZmZpY2llbnQuc2xpY2UoMikgOiBjb2VmZmljaWVudCxcbiAgICAgICt4LnNsaWNlKGkgKyAxKVxuICAgIF07XG4gIH1cblxuICBmdW5jdGlvbiBleHBvbmVudCh4KSB7XG4gICAgcmV0dXJuIHggPSBmb3JtYXREZWNpbWFsKE1hdGguYWJzKHgpKSwgeCA/IHhbMV0gOiBOYU47XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRHcm91cChncm91cGluZywgdGhvdXNhbmRzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCB3aWR0aCkge1xuICAgICAgdmFyIGkgPSB2YWx1ZS5sZW5ndGgsXG4gICAgICAgICAgdCA9IFtdLFxuICAgICAgICAgIGogPSAwLFxuICAgICAgICAgIGcgPSBncm91cGluZ1swXSxcbiAgICAgICAgICBsZW5ndGggPSAwO1xuXG4gICAgICB3aGlsZSAoaSA+IDAgJiYgZyA+IDApIHtcbiAgICAgICAgaWYgKGxlbmd0aCArIGcgKyAxID4gd2lkdGgpIGcgPSBNYXRoLm1heCgxLCB3aWR0aCAtIGxlbmd0aCk7XG4gICAgICAgIHQucHVzaCh2YWx1ZS5zdWJzdHJpbmcoaSAtPSBnLCBpICsgZykpO1xuICAgICAgICBpZiAoKGxlbmd0aCArPSBnICsgMSkgPiB3aWR0aCkgYnJlYWs7XG4gICAgICAgIGcgPSBncm91cGluZ1tqID0gKGogKyAxKSAlIGdyb3VwaW5nLmxlbmd0aF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0LnJldmVyc2UoKS5qb2luKHRob3VzYW5kcyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdERlZmF1bHQoeCwgcCkge1xuICAgIHggPSB4LnRvUHJlY2lzaW9uKHApO1xuXG4gICAgb3V0OiBmb3IgKHZhciBuID0geC5sZW5ndGgsIGkgPSAxLCBpMCA9IC0xLCBpMTsgaSA8IG47ICsraSkge1xuICAgICAgc3dpdGNoICh4W2ldKSB7XG4gICAgICAgIGNhc2UgXCIuXCI6IGkwID0gaTEgPSBpOyBicmVhaztcbiAgICAgICAgY2FzZSBcIjBcIjogaWYgKGkwID09PSAwKSBpMCA9IGk7IGkxID0gaTsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlXCI6IGJyZWFrIG91dDtcbiAgICAgICAgZGVmYXVsdDogaWYgKGkwID4gMCkgaTAgPSAwOyBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaTAgPiAwID8geC5zbGljZSgwLCBpMCkgKyB4LnNsaWNlKGkxICsgMSkgOiB4O1xuICB9XG5cbiAgdmFyIHByZWZpeEV4cG9uZW50O1xuXG4gIGZ1bmN0aW9uIGZvcm1hdFByZWZpeEF1dG8oeCwgcCkge1xuICAgIHZhciBkID0gZm9ybWF0RGVjaW1hbCh4LCBwKTtcbiAgICBpZiAoIWQpIHJldHVybiB4ICsgXCJcIjtcbiAgICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgICBleHBvbmVudCA9IGRbMV0sXG4gICAgICAgIGkgPSBleHBvbmVudCAtIChwcmVmaXhFeHBvbmVudCA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50IC8gMykpKSAqIDMpICsgMSxcbiAgICAgICAgbiA9IGNvZWZmaWNpZW50Lmxlbmd0aDtcbiAgICByZXR1cm4gaSA9PT0gbiA/IGNvZWZmaWNpZW50XG4gICAgICAgIDogaSA+IG4gPyBjb2VmZmljaWVudCArIG5ldyBBcnJheShpIC0gbiArIDEpLmpvaW4oXCIwXCIpXG4gICAgICAgIDogaSA+IDAgPyBjb2VmZmljaWVudC5zbGljZSgwLCBpKSArIFwiLlwiICsgY29lZmZpY2llbnQuc2xpY2UoaSlcbiAgICAgICAgOiBcIjAuXCIgKyBuZXcgQXJyYXkoMSAtIGkpLmpvaW4oXCIwXCIpICsgZm9ybWF0RGVjaW1hbCh4LCBNYXRoLm1heCgwLCBwICsgaSAtIDEpKVswXTsgLy8gbGVzcyB0aGFuIDF5IVxuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Um91bmRlZCh4LCBwKSB7XG4gICAgdmFyIGQgPSBmb3JtYXREZWNpbWFsKHgsIHApO1xuICAgIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICAgIHZhciBjb2VmZmljaWVudCA9IGRbMF0sXG4gICAgICAgIGV4cG9uZW50ID0gZFsxXTtcbiAgICByZXR1cm4gZXhwb25lbnQgPCAwID8gXCIwLlwiICsgbmV3IEFycmF5KC1leHBvbmVudCkuam9pbihcIjBcIikgKyBjb2VmZmljaWVudFxuICAgICAgICA6IGNvZWZmaWNpZW50Lmxlbmd0aCA+IGV4cG9uZW50ICsgMSA/IGNvZWZmaWNpZW50LnNsaWNlKDAsIGV4cG9uZW50ICsgMSkgKyBcIi5cIiArIGNvZWZmaWNpZW50LnNsaWNlKGV4cG9uZW50ICsgMSlcbiAgICAgICAgOiBjb2VmZmljaWVudCArIG5ldyBBcnJheShleHBvbmVudCAtIGNvZWZmaWNpZW50Lmxlbmd0aCArIDIpLmpvaW4oXCIwXCIpO1xuICB9XG5cbiAgdmFyIGZvcm1hdFR5cGVzID0ge1xuICAgIFwiXCI6IGZvcm1hdERlZmF1bHQsXG4gICAgXCIlXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuICh4ICogMTAwKS50b0ZpeGVkKHApOyB9LFxuICAgIFwiYlwiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDIpOyB9LFxuICAgIFwiY1wiOiBmdW5jdGlvbih4KSB7IHJldHVybiB4ICsgXCJcIjsgfSxcbiAgICBcImRcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxMCk7IH0sXG4gICAgXCJlXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9FeHBvbmVudGlhbChwKTsgfSxcbiAgICBcImZcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4geC50b0ZpeGVkKHApOyB9LFxuICAgIFwiZ1wiOiBmdW5jdGlvbih4LCBwKSB7IHJldHVybiB4LnRvUHJlY2lzaW9uKHApOyB9LFxuICAgIFwib1wiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDgpOyB9LFxuICAgIFwicFwiOiBmdW5jdGlvbih4LCBwKSB7IHJldHVybiBmb3JtYXRSb3VuZGVkKHggKiAxMDAsIHApOyB9LFxuICAgIFwiclwiOiBmb3JtYXRSb3VuZGVkLFxuICAgIFwic1wiOiBmb3JtYXRQcmVmaXhBdXRvLFxuICAgIFwiWFwiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpOyB9LFxuICAgIFwieFwiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDE2KTsgfVxuICB9O1xuXG4gIC8vIFtbZmlsbF1hbGlnbl1bc2lnbl1bc3ltYm9sXVswXVt3aWR0aF1bLF1bLnByZWNpc2lvbl1bdHlwZV1cbiAgdmFyIHJlID0gL14oPzooLik/KFs8Pj1eXSkpPyhbK1xcLVxcKCBdKT8oWyQjXSk/KDApPyhcXGQrKT8oLCk/KFxcLlxcZCspPyhbYS16JV0pPyQvaTtcblxuICBmdW5jdGlvbiBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gICAgcmV0dXJuIG5ldyBGb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpIHtcbiAgICBpZiAoIShtYXRjaCA9IHJlLmV4ZWMoc3BlY2lmaWVyKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZm9ybWF0OiBcIiArIHNwZWNpZmllcik7XG5cbiAgICB2YXIgbWF0Y2gsXG4gICAgICAgIGZpbGwgPSBtYXRjaFsxXSB8fCBcIiBcIixcbiAgICAgICAgYWxpZ24gPSBtYXRjaFsyXSB8fCBcIj5cIixcbiAgICAgICAgc2lnbiA9IG1hdGNoWzNdIHx8IFwiLVwiLFxuICAgICAgICBzeW1ib2wgPSBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICB6ZXJvID0gISFtYXRjaFs1XSxcbiAgICAgICAgd2lkdGggPSBtYXRjaFs2XSAmJiArbWF0Y2hbNl0sXG4gICAgICAgIGNvbW1hID0gISFtYXRjaFs3XSxcbiAgICAgICAgcHJlY2lzaW9uID0gbWF0Y2hbOF0gJiYgK21hdGNoWzhdLnNsaWNlKDEpLFxuICAgICAgICB0eXBlID0gbWF0Y2hbOV0gfHwgXCJcIjtcblxuICAgIC8vIFRoZSBcIm5cIiB0eXBlIGlzIGFuIGFsaWFzIGZvciBcIixnXCIuXG4gICAgaWYgKHR5cGUgPT09IFwiblwiKSBjb21tYSA9IHRydWUsIHR5cGUgPSBcImdcIjtcblxuICAgIC8vIE1hcCBpbnZhbGlkIHR5cGVzIHRvIHRoZSBkZWZhdWx0IGZvcm1hdC5cbiAgICBlbHNlIGlmICghZm9ybWF0VHlwZXNbdHlwZV0pIHR5cGUgPSBcIlwiO1xuXG4gICAgLy8gSWYgemVybyBmaWxsIGlzIHNwZWNpZmllZCwgcGFkZGluZyBnb2VzIGFmdGVyIHNpZ24gYW5kIGJlZm9yZSBkaWdpdHMuXG4gICAgaWYgKHplcm8gfHwgKGZpbGwgPT09IFwiMFwiICYmIGFsaWduID09PSBcIj1cIikpIHplcm8gPSB0cnVlLCBmaWxsID0gXCIwXCIsIGFsaWduID0gXCI9XCI7XG5cbiAgICB0aGlzLmZpbGwgPSBmaWxsO1xuICAgIHRoaXMuYWxpZ24gPSBhbGlnbjtcbiAgICB0aGlzLnNpZ24gPSBzaWduO1xuICAgIHRoaXMuc3ltYm9sID0gc3ltYm9sO1xuICAgIHRoaXMuemVybyA9IHplcm87XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuY29tbWEgPSBjb21tYTtcbiAgICB0aGlzLnByZWNpc2lvbiA9IHByZWNpc2lvbjtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgRm9ybWF0U3BlY2lmaWVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmZpbGxcbiAgICAgICAgKyB0aGlzLmFsaWduXG4gICAgICAgICsgdGhpcy5zaWduXG4gICAgICAgICsgdGhpcy5zeW1ib2xcbiAgICAgICAgKyAodGhpcy56ZXJvID8gXCIwXCIgOiBcIlwiKVxuICAgICAgICArICh0aGlzLndpZHRoID09IG51bGwgPyBcIlwiIDogTWF0aC5tYXgoMSwgdGhpcy53aWR0aCB8IDApKVxuICAgICAgICArICh0aGlzLmNvbW1hID8gXCIsXCIgOiBcIlwiKVxuICAgICAgICArICh0aGlzLnByZWNpc2lvbiA9PSBudWxsID8gXCJcIiA6IFwiLlwiICsgTWF0aC5tYXgoMCwgdGhpcy5wcmVjaXNpb24gfCAwKSlcbiAgICAgICAgKyB0aGlzLnR5cGU7XG4gIH07XG5cbiAgdmFyIHByZWZpeGVzID0gW1wieVwiLFwielwiLFwiYVwiLFwiZlwiLFwicFwiLFwiblwiLFwiwrVcIixcIm1cIixcIlwiLFwia1wiLFwiTVwiLFwiR1wiLFwiVFwiLFwiUFwiLFwiRVwiLFwiWlwiLFwiWVwiXTtcblxuICBmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRMb2NhbGUobG9jYWxlKSB7XG4gICAgdmFyIGdyb3VwID0gbG9jYWxlLmdyb3VwaW5nICYmIGxvY2FsZS50aG91c2FuZHMgPyBmb3JtYXRHcm91cChsb2NhbGUuZ3JvdXBpbmcsIGxvY2FsZS50aG91c2FuZHMpIDogaWRlbnRpdHksXG4gICAgICAgIGN1cnJlbmN5ID0gbG9jYWxlLmN1cnJlbmN5LFxuICAgICAgICBkZWNpbWFsID0gbG9jYWxlLmRlY2ltYWw7XG5cbiAgICBmdW5jdGlvbiBuZXdGb3JtYXQoc3BlY2lmaWVyKSB7XG4gICAgICBzcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKTtcblxuICAgICAgdmFyIGZpbGwgPSBzcGVjaWZpZXIuZmlsbCxcbiAgICAgICAgICBhbGlnbiA9IHNwZWNpZmllci5hbGlnbixcbiAgICAgICAgICBzaWduID0gc3BlY2lmaWVyLnNpZ24sXG4gICAgICAgICAgc3ltYm9sID0gc3BlY2lmaWVyLnN5bWJvbCxcbiAgICAgICAgICB6ZXJvID0gc3BlY2lmaWVyLnplcm8sXG4gICAgICAgICAgd2lkdGggPSBzcGVjaWZpZXIud2lkdGgsXG4gICAgICAgICAgY29tbWEgPSBzcGVjaWZpZXIuY29tbWEsXG4gICAgICAgICAgcHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbixcbiAgICAgICAgICB0eXBlID0gc3BlY2lmaWVyLnR5cGU7XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgICAgLy8gRm9yIFNJLXByZWZpeCwgdGhlIHN1ZmZpeCBpcyBsYXppbHkgY29tcHV0ZWQuXG4gICAgICB2YXIgcHJlZml4ID0gc3ltYm9sID09PSBcIiRcIiA/IGN1cnJlbmN5WzBdIDogc3ltYm9sID09PSBcIiNcIiAmJiAvW2JveFhdLy50ZXN0KHR5cGUpID8gXCIwXCIgKyB0eXBlLnRvTG93ZXJDYXNlKCkgOiBcIlwiLFxuICAgICAgICAgIHN1ZmZpeCA9IHN5bWJvbCA9PT0gXCIkXCIgPyBjdXJyZW5jeVsxXSA6IC9bJXBdLy50ZXN0KHR5cGUpID8gXCIlXCIgOiBcIlwiO1xuXG4gICAgICAvLyBXaGF0IGZvcm1hdCBmdW5jdGlvbiBzaG91bGQgd2UgdXNlP1xuICAgICAgLy8gSXMgdGhpcyBhbiBpbnRlZ2VyIHR5cGU/XG4gICAgICAvLyBDYW4gdGhpcyB0eXBlIGdlbmVyYXRlIGV4cG9uZW50aWFsIG5vdGF0aW9uP1xuICAgICAgdmFyIGZvcm1hdFR5cGUgPSBmb3JtYXRUeXBlc1t0eXBlXSxcbiAgICAgICAgICBtYXliZVN1ZmZpeCA9ICF0eXBlIHx8IC9bZGVmZ3BycyVdLy50ZXN0KHR5cGUpO1xuXG4gICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgcHJlY2lzaW9uIGlmIG5vdCBzcGVjaWZpZWQsXG4gICAgICAvLyBvciBjbGFtcCB0aGUgc3BlY2lmaWVkIHByZWNpc2lvbiB0byB0aGUgc3VwcG9ydGVkIHJhbmdlLlxuICAgICAgLy8gRm9yIHNpZ25pZmljYW50IHByZWNpc2lvbiwgaXQgbXVzdCBiZSBpbiBbMSwgMjFdLlxuICAgICAgLy8gRm9yIGZpeGVkIHByZWNpc2lvbiwgaXQgbXVzdCBiZSBpbiBbMCwgMjBdLlxuICAgICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uID09IG51bGwgPyAodHlwZSA/IDYgOiAxMilcbiAgICAgICAgICA6IC9bZ3Byc10vLnRlc3QodHlwZSkgPyBNYXRoLm1heCgxLCBNYXRoLm1pbigyMSwgcHJlY2lzaW9uKSlcbiAgICAgICAgICA6IE1hdGgubWF4KDAsIE1hdGgubWluKDIwLCBwcmVjaXNpb24pKTtcblxuICAgICAgZnVuY3Rpb24gZm9ybWF0KHZhbHVlKSB7XG4gICAgICAgIHZhciB2YWx1ZVByZWZpeCA9IHByZWZpeCxcbiAgICAgICAgICAgIHZhbHVlU3VmZml4ID0gc3VmZml4LFxuICAgICAgICAgICAgaSwgbiwgYztcblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJjXCIpIHtcbiAgICAgICAgICB2YWx1ZVN1ZmZpeCA9IGZvcm1hdFR5cGUodmFsdWUpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgICAgdmFsdWUgPSBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuXG4gICAgICAgICAgLy8gQ29udmVydCBuZWdhdGl2ZSB0byBwb3NpdGl2ZSwgYW5kIGNvbXB1dGUgdGhlIHByZWZpeC5cbiAgICAgICAgICAvLyBOb3RlIHRoYXQgLTAgaXMgbm90IGxlc3MgdGhhbiAwLCBidXQgMSAvIC0wIGlzIVxuICAgICAgICAgIHZhciB2YWx1ZU5lZ2F0aXZlID0gKHZhbHVlIDwgMCB8fCAxIC8gdmFsdWUgPCAwKSAmJiAodmFsdWUgKj0gLTEsIHRydWUpO1xuXG4gICAgICAgICAgLy8gUGVyZm9ybSB0aGUgaW5pdGlhbCBmb3JtYXR0aW5nLlxuICAgICAgICAgIHZhbHVlID0gZm9ybWF0VHlwZSh2YWx1ZSwgcHJlY2lzaW9uKTtcblxuICAgICAgICAgIC8vIElmIHRoZSBvcmlnaW5hbCB2YWx1ZSB3YXMgbmVnYXRpdmUsIGl0IG1heSBiZSByb3VuZGVkIHRvIHplcm8gZHVyaW5nXG4gICAgICAgICAgLy8gZm9ybWF0dGluZzsgdHJlYXQgdGhpcyBhcyAocG9zaXRpdmUpIHplcm8uXG4gICAgICAgICAgaWYgKHZhbHVlTmVnYXRpdmUpIHtcbiAgICAgICAgICAgIGkgPSAtMSwgbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIHZhbHVlTmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICAgIGlmIChjID0gdmFsdWUuY2hhckNvZGVBdChpKSwgKDQ4IDwgYyAmJiBjIDwgNTgpXG4gICAgICAgICAgICAgICAgICB8fCAodHlwZSA9PT0gXCJ4XCIgJiYgOTYgPCBjICYmIGMgPCAxMDMpXG4gICAgICAgICAgICAgICAgICB8fCAodHlwZSA9PT0gXCJYXCIgJiYgNjQgPCBjICYmIGMgPCA3MSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZU5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgICAgICAgIHZhbHVlUHJlZml4ID0gKHZhbHVlTmVnYXRpdmUgPyAoc2lnbiA9PT0gXCIoXCIgPyBzaWduIDogXCItXCIpIDogc2lnbiA9PT0gXCItXCIgfHwgc2lnbiA9PT0gXCIoXCIgPyBcIlwiIDogc2lnbikgKyB2YWx1ZVByZWZpeDtcbiAgICAgICAgICB2YWx1ZVN1ZmZpeCA9IHZhbHVlU3VmZml4ICsgKHR5cGUgPT09IFwic1wiID8gcHJlZml4ZXNbOCArIHByZWZpeEV4cG9uZW50IC8gM10gOiBcIlwiKSArICh2YWx1ZU5lZ2F0aXZlICYmIHNpZ24gPT09IFwiKFwiID8gXCIpXCIgOiBcIlwiKTtcblxuICAgICAgICAgIC8vIEJyZWFrIHRoZSBmb3JtYXR0ZWQgdmFsdWUgaW50byB0aGUgaW50ZWdlciDigJx2YWx1ZeKAnSBwYXJ0IHRoYXQgY2FuIGJlXG4gICAgICAgICAgLy8gZ3JvdXBlZCwgYW5kIGZyYWN0aW9uYWwgb3IgZXhwb25lbnRpYWwg4oCcc3VmZml44oCdIHBhcnQgdGhhdCBpcyBub3QuXG4gICAgICAgICAgaWYgKG1heWJlU3VmZml4KSB7XG4gICAgICAgICAgICBpID0gLTEsIG4gPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgICAgICBpZiAoYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSksIDQ4ID4gYyB8fCBjID4gNTcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVN1ZmZpeCA9IChjID09PSA0NiA/IGRlY2ltYWwgKyB2YWx1ZS5zbGljZShpICsgMSkgOiB2YWx1ZS5zbGljZShpKSkgKyB2YWx1ZVN1ZmZpeDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIGZpbGwgY2hhcmFjdGVyIGlzIG5vdCBcIjBcIiwgZ3JvdXBpbmcgaXMgYXBwbGllZCBiZWZvcmUgcGFkZGluZy5cbiAgICAgICAgaWYgKGNvbW1hICYmICF6ZXJvKSB2YWx1ZSA9IGdyb3VwKHZhbHVlLCBJbmZpbml0eSk7XG5cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgcGFkZGluZy5cbiAgICAgICAgdmFyIGxlbmd0aCA9IHZhbHVlUHJlZml4Lmxlbmd0aCArIHZhbHVlLmxlbmd0aCArIHZhbHVlU3VmZml4Lmxlbmd0aCxcbiAgICAgICAgICAgIHBhZGRpbmcgPSBsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheSh3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oZmlsbCkgOiBcIlwiO1xuXG4gICAgICAgIC8vIElmIHRoZSBmaWxsIGNoYXJhY3RlciBpcyBcIjBcIiwgZ3JvdXBpbmcgaXMgYXBwbGllZCBhZnRlciBwYWRkaW5nLlxuICAgICAgICBpZiAoY29tbWEgJiYgemVybykgdmFsdWUgPSBncm91cChwYWRkaW5nICsgdmFsdWUsIHBhZGRpbmcubGVuZ3RoID8gd2lkdGggLSB2YWx1ZVN1ZmZpeC5sZW5ndGggOiBJbmZpbml0eSksIHBhZGRpbmcgPSBcIlwiO1xuXG4gICAgICAgIC8vIFJlY29uc3RydWN0IHRoZSBmaW5hbCBvdXRwdXQgYmFzZWQgb24gdGhlIGRlc2lyZWQgYWxpZ25tZW50LlxuICAgICAgICBzd2l0Y2ggKGFsaWduKSB7XG4gICAgICAgICAgY2FzZSBcIjxcIjogcmV0dXJuIHZhbHVlUHJlZml4ICsgdmFsdWUgKyB2YWx1ZVN1ZmZpeCArIHBhZGRpbmc7XG4gICAgICAgICAgY2FzZSBcIj1cIjogcmV0dXJuIHZhbHVlUHJlZml4ICsgcGFkZGluZyArIHZhbHVlICsgdmFsdWVTdWZmaXg7XG4gICAgICAgICAgY2FzZSBcIl5cIjogcmV0dXJuIHBhZGRpbmcuc2xpY2UoMCwgbGVuZ3RoID0gcGFkZGluZy5sZW5ndGggPj4gMSkgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXggKyBwYWRkaW5nLnNsaWNlKGxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZGRpbmcgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXg7XG4gICAgICB9XG5cbiAgICAgIGZvcm1hdC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc3BlY2lmaWVyICsgXCJcIjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0UHJlZml4KHNwZWNpZmllciwgdmFsdWUpIHtcbiAgICAgIHZhciBmID0gbmV3Rm9ybWF0KChzcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSwgc3BlY2lmaWVyLnR5cGUgPSBcImZcIiwgc3BlY2lmaWVyKSksXG4gICAgICAgICAgZSA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50KHZhbHVlKSAvIDMpKSkgKiAzLFxuICAgICAgICAgIGsgPSBNYXRoLnBvdygxMCwgLWUpLFxuICAgICAgICAgIHByZWZpeCA9IHByZWZpeGVzWzggKyBlIC8gM107XG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGYoayAqIHZhbHVlKSArIHByZWZpeDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdDogbmV3Rm9ybWF0LFxuICAgICAgZm9ybWF0UHJlZml4OiBmb3JtYXRQcmVmaXhcbiAgICB9O1xuICB9XG5cbiAgdmFyIGxvY2FsZTtcbiAgZGVmYXVsdExvY2FsZSh7XG4gICAgZGVjaW1hbDogXCIuXCIsXG4gICAgdGhvdXNhbmRzOiBcIixcIixcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbXCIkXCIsIFwiXCJdXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRMb2NhbGUoZGVmaW5pdGlvbikge1xuICAgIGxvY2FsZSA9IGZvcm1hdExvY2FsZShkZWZpbml0aW9uKTtcbiAgICBleHBvcnRzLmZvcm1hdCA9IGxvY2FsZS5mb3JtYXQ7XG4gICAgZXhwb3J0cy5mb3JtYXRQcmVmaXggPSBsb2NhbGUuZm9ybWF0UHJlZml4O1xuICAgIHJldHVybiBsb2NhbGU7XG4gIH1cblxuICBmdW5jdGlvbiBwcmVjaXNpb25GaXhlZChzdGVwKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIC1leHBvbmVudChNYXRoLmFicyhzdGVwKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlY2lzaW9uUHJlZml4KHN0ZXAsIHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50KHZhbHVlKSAvIDMpKSkgKiAzIC0gZXhwb25lbnQoTWF0aC5hYnMoc3RlcCkpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZWNpc2lvblJvdW5kKHN0ZXAsIG1heCkge1xuICAgIHN0ZXAgPSBNYXRoLmFicyhzdGVwKSwgbWF4ID0gTWF0aC5hYnMobWF4KSAtIHN0ZXA7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGV4cG9uZW50KG1heCkgLSBleHBvbmVudChzdGVwKSkgKyAxO1xuICB9XG5cbiAgZXhwb3J0cy5mb3JtYXREZWZhdWx0TG9jYWxlID0gZGVmYXVsdExvY2FsZTtcbiAgZXhwb3J0cy5mb3JtYXRMb2NhbGUgPSBmb3JtYXRMb2NhbGU7XG4gIGV4cG9ydHMuZm9ybWF0U3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyO1xuICBleHBvcnRzLnByZWNpc2lvbkZpeGVkID0gcHJlY2lzaW9uRml4ZWQ7XG4gIGV4cG9ydHMucHJlY2lzaW9uUHJlZml4ID0gcHJlY2lzaW9uUHJlZml4O1xuICBleHBvcnRzLnByZWNpc2lvblJvdW5kID0gcHJlY2lzaW9uUm91bmQ7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpOyIsIi8vIGh0dHBzOi8vZDNqcy5vcmcvZDMtaW50ZXJwb2xhdGUvIFZlcnNpb24gMS4xLjEuIENvcHlyaWdodCAyMDE2IE1pa2UgQm9zdG9jay5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnZDMtY29sb3InKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJywgJ2QzLWNvbG9yJ10sIGZhY3RvcnkpIDpcbiAgKGZhY3RvcnkoKGdsb2JhbC5kMyA9IGdsb2JhbC5kMyB8fCB7fSksZ2xvYmFsLmQzKSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLGQzQ29sb3IpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIGJhc2lzKHQxLCB2MCwgdjEsIHYyLCB2Mykge1xuICAgIHZhciB0MiA9IHQxICogdDEsIHQzID0gdDIgKiB0MTtcbiAgICByZXR1cm4gKCgxIC0gMyAqIHQxICsgMyAqIHQyIC0gdDMpICogdjBcbiAgICAgICAgKyAoNCAtIDYgKiB0MiArIDMgKiB0MykgKiB2MVxuICAgICAgICArICgxICsgMyAqIHQxICsgMyAqIHQyIC0gMyAqIHQzKSAqIHYyXG4gICAgICAgICsgdDMgKiB2MykgLyA2O1xuICB9XG5cbiAgZnVuY3Rpb24gYmFzaXMkMSh2YWx1ZXMpIHtcbiAgICB2YXIgbiA9IHZhbHVlcy5sZW5ndGggLSAxO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgaSA9IHQgPD0gMCA/ICh0ID0gMCkgOiB0ID49IDEgPyAodCA9IDEsIG4gLSAxKSA6IE1hdGguZmxvb3IodCAqIG4pLFxuICAgICAgICAgIHYxID0gdmFsdWVzW2ldLFxuICAgICAgICAgIHYyID0gdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgICB2MCA9IGkgPiAwID8gdmFsdWVzW2kgLSAxXSA6IDIgKiB2MSAtIHYyLFxuICAgICAgICAgIHYzID0gaSA8IG4gLSAxID8gdmFsdWVzW2kgKyAyXSA6IDIgKiB2MiAtIHYxO1xuICAgICAgcmV0dXJuIGJhc2lzKCh0IC0gaSAvIG4pICogbiwgdjAsIHYxLCB2MiwgdjMpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBiYXNpc0Nsb3NlZCh2YWx1ZXMpIHtcbiAgICB2YXIgbiA9IHZhbHVlcy5sZW5ndGg7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHZhciBpID0gTWF0aC5mbG9vcigoKHQgJT0gMSkgPCAwID8gKyt0IDogdCkgKiBuKSxcbiAgICAgICAgICB2MCA9IHZhbHVlc1soaSArIG4gLSAxKSAlIG5dLFxuICAgICAgICAgIHYxID0gdmFsdWVzW2kgJSBuXSxcbiAgICAgICAgICB2MiA9IHZhbHVlc1soaSArIDEpICUgbl0sXG4gICAgICAgICAgdjMgPSB2YWx1ZXNbKGkgKyAyKSAlIG5dO1xuICAgICAgcmV0dXJuIGJhc2lzKCh0IC0gaSAvIG4pICogbiwgdjAsIHYxLCB2MiwgdjMpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjb25zdGFudCh4KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpbmVhcihhLCBkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBhICsgdCAqIGQ7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4cG9uZW50aWFsKGEsIGIsIHkpIHtcbiAgICByZXR1cm4gYSA9IE1hdGgucG93KGEsIHkpLCBiID0gTWF0aC5wb3coYiwgeSkgLSBhLCB5ID0gMSAvIHksIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBNYXRoLnBvdyhhICsgdCAqIGIsIHkpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBodWUoYSwgYikge1xuICAgIHZhciBkID0gYiAtIGE7XG4gICAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCA+IDE4MCB8fCBkIDwgLTE4MCA/IGQgLSAzNjAgKiBNYXRoLnJvdW5kKGQgLyAzNjApIDogZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdhbW1hKHkpIHtcbiAgICByZXR1cm4gKHkgPSAreSkgPT09IDEgPyBub2dhbW1hIDogZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGIgLSBhID8gZXhwb25lbnRpYWwoYSwgYiwgeSkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9nYW1tYShhLCBiKSB7XG4gICAgdmFyIGQgPSBiIC0gYTtcbiAgICByZXR1cm4gZCA/IGxpbmVhcihhLCBkKSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xuICB9XG5cbiAgdmFyIHJnYiQxID0gKGZ1bmN0aW9uIHJnYkdhbW1hKHkpIHtcbiAgICB2YXIgY29sb3IgPSBnYW1tYSh5KTtcblxuICAgIGZ1bmN0aW9uIHJnYihzdGFydCwgZW5kKSB7XG4gICAgICB2YXIgciA9IGNvbG9yKChzdGFydCA9IGQzQ29sb3IucmdiKHN0YXJ0KSkuciwgKGVuZCA9IGQzQ29sb3IucmdiKGVuZCkpLnIpLFxuICAgICAgICAgIGcgPSBjb2xvcihzdGFydC5nLCBlbmQuZyksXG4gICAgICAgICAgYiA9IGNvbG9yKHN0YXJ0LmIsIGVuZC5iKSxcbiAgICAgICAgICBvcGFjaXR5ID0gY29sb3Ioc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgc3RhcnQuciA9IHIodCk7XG4gICAgICAgIHN0YXJ0LmcgPSBnKHQpO1xuICAgICAgICBzdGFydC5iID0gYih0KTtcbiAgICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJnYi5nYW1tYSA9IHJnYkdhbW1hO1xuXG4gICAgcmV0dXJuIHJnYjtcbiAgfSkoMSk7XG5cbiAgZnVuY3Rpb24gcmdiU3BsaW5lKHNwbGluZSkge1xuICAgIHJldHVybiBmdW5jdGlvbihjb2xvcnMpIHtcbiAgICAgIHZhciBuID0gY29sb3JzLmxlbmd0aCxcbiAgICAgICAgICByID0gbmV3IEFycmF5KG4pLFxuICAgICAgICAgIGcgPSBuZXcgQXJyYXkobiksXG4gICAgICAgICAgYiA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgICBpLCBjb2xvcjtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgY29sb3IgPSBkM0NvbG9yLnJnYihjb2xvcnNbaV0pO1xuICAgICAgICByW2ldID0gY29sb3IuciB8fCAwO1xuICAgICAgICBnW2ldID0gY29sb3IuZyB8fCAwO1xuICAgICAgICBiW2ldID0gY29sb3IuYiB8fCAwO1xuICAgICAgfVxuICAgICAgciA9IHNwbGluZShyKTtcbiAgICAgIGcgPSBzcGxpbmUoZyk7XG4gICAgICBiID0gc3BsaW5lKGIpO1xuICAgICAgY29sb3Iub3BhY2l0eSA9IDE7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICBjb2xvci5yID0gcih0KTtcbiAgICAgICAgY29sb3IuZyA9IGcodCk7XG4gICAgICAgIGNvbG9yLmIgPSBiKHQpO1xuICAgICAgICByZXR1cm4gY29sb3IgKyBcIlwiO1xuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIHJnYkJhc2lzID0gcmdiU3BsaW5lKGJhc2lzJDEpO1xuICB2YXIgcmdiQmFzaXNDbG9zZWQgPSByZ2JTcGxpbmUoYmFzaXNDbG9zZWQpO1xuXG4gIGZ1bmN0aW9uIGFycmF5KGEsIGIpIHtcbiAgICB2YXIgbmIgPSBiID8gYi5sZW5ndGggOiAwLFxuICAgICAgICBuYSA9IGEgPyBNYXRoLm1pbihuYiwgYS5sZW5ndGgpIDogMCxcbiAgICAgICAgeCA9IG5ldyBBcnJheShuYiksXG4gICAgICAgIGMgPSBuZXcgQXJyYXkobmIpLFxuICAgICAgICBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG5hOyArK2kpIHhbaV0gPSB2YWx1ZShhW2ldLCBiW2ldKTtcbiAgICBmb3IgKDsgaSA8IG5iOyArK2kpIGNbaV0gPSBiW2ldO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuYTsgKytpKSBjW2ldID0geFtpXSh0KTtcbiAgICAgIHJldHVybiBjO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBkYXRlKGEsIGIpIHtcbiAgICB2YXIgZCA9IG5ldyBEYXRlO1xuICAgIHJldHVybiBhID0gK2EsIGIgLT0gYSwgZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIGQuc2V0VGltZShhICsgYiAqIHQpLCBkO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBudW1iZXIoYSwgYikge1xuICAgIHJldHVybiBhID0gK2EsIGIgLT0gYSwgZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIGEgKyBiICogdDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0KGEsIGIpIHtcbiAgICB2YXIgaSA9IHt9LFxuICAgICAgICBjID0ge30sXG4gICAgICAgIGs7XG5cbiAgICBpZiAoYSA9PT0gbnVsbCB8fCB0eXBlb2YgYSAhPT0gXCJvYmplY3RcIikgYSA9IHt9O1xuICAgIGlmIChiID09PSBudWxsIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKSBiID0ge307XG5cbiAgICBmb3IgKGsgaW4gYikge1xuICAgICAgaWYgKGsgaW4gYSkge1xuICAgICAgICBpW2tdID0gdmFsdWUoYVtrXSwgYltrXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjW2tdID0gYltrXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgZm9yIChrIGluIGkpIGNba10gPSBpW2tdKHQpO1xuICAgICAgcmV0dXJuIGM7XG4gICAgfTtcbiAgfVxuXG4gIHZhciByZUEgPSAvWy0rXT8oPzpcXGQrXFwuP1xcZCp8XFwuP1xcZCspKD86W2VFXVstK10/XFxkKyk/L2c7XG4gIHZhciByZUIgPSBuZXcgUmVnRXhwKHJlQS5zb3VyY2UsIFwiZ1wiKTtcbiAgZnVuY3Rpb24gemVybyhiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZShiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBiKHQpICsgXCJcIjtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc3RyaW5nKGEsIGIpIHtcbiAgICB2YXIgYmkgPSByZUEubGFzdEluZGV4ID0gcmVCLmxhc3RJbmRleCA9IDAsIC8vIHNjYW4gaW5kZXggZm9yIG5leHQgbnVtYmVyIGluIGJcbiAgICAgICAgYW0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYVxuICAgICAgICBibSwgLy8gY3VycmVudCBtYXRjaCBpbiBiXG4gICAgICAgIGJzLCAvLyBzdHJpbmcgcHJlY2VkaW5nIGN1cnJlbnQgbnVtYmVyIGluIGIsIGlmIGFueVxuICAgICAgICBpID0gLTEsIC8vIGluZGV4IGluIHNcbiAgICAgICAgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgICAgcSA9IFtdOyAvLyBudW1iZXIgaW50ZXJwb2xhdG9yc1xuXG4gICAgLy8gQ29lcmNlIGlucHV0cyB0byBzdHJpbmdzLlxuICAgIGEgPSBhICsgXCJcIiwgYiA9IGIgKyBcIlwiO1xuXG4gICAgLy8gSW50ZXJwb2xhdGUgcGFpcnMgb2YgbnVtYmVycyBpbiBhICYgYi5cbiAgICB3aGlsZSAoKGFtID0gcmVBLmV4ZWMoYSkpXG4gICAgICAgICYmIChibSA9IHJlQi5leGVjKGIpKSkge1xuICAgICAgaWYgKChicyA9IGJtLmluZGV4KSA+IGJpKSB7IC8vIGEgc3RyaW5nIHByZWNlZGVzIHRoZSBuZXh0IG51bWJlciBpbiBiXG4gICAgICAgIGJzID0gYi5zbGljZShiaSwgYnMpO1xuICAgICAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgICAgZWxzZSBzWysraV0gPSBicztcbiAgICAgIH1cbiAgICAgIGlmICgoYW0gPSBhbVswXSkgPT09IChibSA9IGJtWzBdKSkgeyAvLyBudW1iZXJzIGluIGEgJiBiIG1hdGNoXG4gICAgICAgIGlmIChzW2ldKSBzW2ldICs9IGJtOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgICAgICBlbHNlIHNbKytpXSA9IGJtO1xuICAgICAgfSBlbHNlIHsgLy8gaW50ZXJwb2xhdGUgbm9uLW1hdGNoaW5nIG51bWJlcnNcbiAgICAgICAgc1srK2ldID0gbnVsbDtcbiAgICAgICAgcS5wdXNoKHtpOiBpLCB4OiBudW1iZXIoYW0sIGJtKX0pO1xuICAgICAgfVxuICAgICAgYmkgPSByZUIubGFzdEluZGV4O1xuICAgIH1cblxuICAgIC8vIEFkZCByZW1haW5zIG9mIGIuXG4gICAgaWYgKGJpIDwgYi5sZW5ndGgpIHtcbiAgICAgIGJzID0gYi5zbGljZShiaSk7XG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYnM7XG4gICAgfVxuXG4gICAgLy8gU3BlY2lhbCBvcHRpbWl6YXRpb24gZm9yIG9ubHkgYSBzaW5nbGUgbWF0Y2guXG4gICAgLy8gT3RoZXJ3aXNlLCBpbnRlcnBvbGF0ZSBlYWNoIG9mIHRoZSBudW1iZXJzIGFuZCByZWpvaW4gdGhlIHN0cmluZy5cbiAgICByZXR1cm4gcy5sZW5ndGggPCAyID8gKHFbMF1cbiAgICAgICAgPyBvbmUocVswXS54KVxuICAgICAgICA6IHplcm8oYikpXG4gICAgICAgIDogKGIgPSBxLmxlbmd0aCwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG87IGkgPCBiOyArK2kpIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgICAgICAgIHJldHVybiBzLmpvaW4oXCJcIik7XG4gICAgICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB2YWx1ZShhLCBiKSB7XG4gICAgdmFyIHQgPSB0eXBlb2YgYiwgYztcbiAgICByZXR1cm4gYiA9PSBudWxsIHx8IHQgPT09IFwiYm9vbGVhblwiID8gY29uc3RhbnQoYilcbiAgICAgICAgOiAodCA9PT0gXCJudW1iZXJcIiA/IG51bWJlclxuICAgICAgICA6IHQgPT09IFwic3RyaW5nXCIgPyAoKGMgPSBkM0NvbG9yLmNvbG9yKGIpKSA/IChiID0gYywgcmdiJDEpIDogc3RyaW5nKVxuICAgICAgICA6IGIgaW5zdGFuY2VvZiBkM0NvbG9yLmNvbG9yID8gcmdiJDFcbiAgICAgICAgOiBiIGluc3RhbmNlb2YgRGF0ZSA/IGRhdGVcbiAgICAgICAgOiBBcnJheS5pc0FycmF5KGIpID8gYXJyYXlcbiAgICAgICAgOiBpc05hTihiKSA/IG9iamVjdFxuICAgICAgICA6IG51bWJlcikoYSwgYik7XG4gIH1cblxuICBmdW5jdGlvbiByb3VuZChhLCBiKSB7XG4gICAgcmV0dXJuIGEgPSArYSwgYiAtPSBhLCBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChhICsgYiAqIHQpO1xuICAgIH07XG4gIH1cblxuICB2YXIgZGVncmVlcyA9IDE4MCAvIE1hdGguUEk7XG5cbiAgdmFyIGlkZW50aXR5ID0ge1xuICAgIHRyYW5zbGF0ZVg6IDAsXG4gICAgdHJhbnNsYXRlWTogMCxcbiAgICByb3RhdGU6IDAsXG4gICAgc2tld1g6IDAsXG4gICAgc2NhbGVYOiAxLFxuICAgIHNjYWxlWTogMVxuICB9O1xuXG4gIGZ1bmN0aW9uIGRlY29tcG9zZShhLCBiLCBjLCBkLCBlLCBmKSB7XG4gICAgdmFyIHNjYWxlWCwgc2NhbGVZLCBza2V3WDtcbiAgICBpZiAoc2NhbGVYID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpKSBhIC89IHNjYWxlWCwgYiAvPSBzY2FsZVg7XG4gICAgaWYgKHNrZXdYID0gYSAqIGMgKyBiICogZCkgYyAtPSBhICogc2tld1gsIGQgLT0gYiAqIHNrZXdYO1xuICAgIGlmIChzY2FsZVkgPSBNYXRoLnNxcnQoYyAqIGMgKyBkICogZCkpIGMgLz0gc2NhbGVZLCBkIC89IHNjYWxlWSwgc2tld1ggLz0gc2NhbGVZO1xuICAgIGlmIChhICogZCA8IGIgKiBjKSBhID0gLWEsIGIgPSAtYiwgc2tld1ggPSAtc2tld1gsIHNjYWxlWCA9IC1zY2FsZVg7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zbGF0ZVg6IGUsXG4gICAgICB0cmFuc2xhdGVZOiBmLFxuICAgICAgcm90YXRlOiBNYXRoLmF0YW4yKGIsIGEpICogZGVncmVlcyxcbiAgICAgIHNrZXdYOiBNYXRoLmF0YW4oc2tld1gpICogZGVncmVlcyxcbiAgICAgIHNjYWxlWDogc2NhbGVYLFxuICAgICAgc2NhbGVZOiBzY2FsZVlcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNzc05vZGU7XG4gIHZhciBjc3NSb290O1xuICB2YXIgY3NzVmlldztcbiAgdmFyIHN2Z05vZGU7XG4gIGZ1bmN0aW9uIHBhcnNlQ3NzKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBcIm5vbmVcIikgcmV0dXJuIGlkZW50aXR5O1xuICAgIGlmICghY3NzTm9kZSkgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIiksIGNzc1Jvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGNzc1ZpZXcgPSBkb2N1bWVudC5kZWZhdWx0VmlldztcbiAgICBjc3NOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IHZhbHVlO1xuICAgIHZhbHVlID0gY3NzVmlldy5nZXRDb21wdXRlZFN0eWxlKGNzc1Jvb3QuYXBwZW5kQ2hpbGQoY3NzTm9kZSksIG51bGwpLmdldFByb3BlcnR5VmFsdWUoXCJ0cmFuc2Zvcm1cIik7XG4gICAgY3NzUm9vdC5yZW1vdmVDaGlsZChjc3NOb2RlKTtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDcsIC0xKS5zcGxpdChcIixcIik7XG4gICAgcmV0dXJuIGRlY29tcG9zZSgrdmFsdWVbMF0sICt2YWx1ZVsxXSwgK3ZhbHVlWzJdLCArdmFsdWVbM10sICt2YWx1ZVs0XSwgK3ZhbHVlWzVdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlU3ZnKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBpZGVudGl0eTtcbiAgICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gICAgc3ZnTm9kZS5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdmFsdWUpO1xuICAgIGlmICghKHZhbHVlID0gc3ZnTm9kZS50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpKSkgcmV0dXJuIGlkZW50aXR5O1xuICAgIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICAgIHJldHVybiBkZWNvbXBvc2UodmFsdWUuYSwgdmFsdWUuYiwgdmFsdWUuYywgdmFsdWUuZCwgdmFsdWUuZSwgdmFsdWUuZik7XG4gIH1cblxuICBmdW5jdGlvbiBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZSwgcHhDb21tYSwgcHhQYXJlbiwgZGVnUGFyZW4pIHtcblxuICAgIGZ1bmN0aW9uIHBvcChzKSB7XG4gICAgICByZXR1cm4gcy5sZW5ndGggPyBzLnBvcCgpICsgXCIgXCIgOiBcIlwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSh4YSwgeWEsIHhiLCB5YiwgcywgcSkge1xuICAgICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgICAgdmFyIGkgPSBzLnB1c2goXCJ0cmFuc2xhdGUoXCIsIG51bGwsIHB4Q29tbWEsIG51bGwsIHB4UGFyZW4pO1xuICAgICAgICBxLnB1c2goe2k6IGkgLSA0LCB4OiBudW1iZXIoeGEsIHhiKX0sIHtpOiBpIC0gMiwgeDogbnVtYmVyKHlhLCB5Yil9KTtcbiAgICAgIH0gZWxzZSBpZiAoeGIgfHwgeWIpIHtcbiAgICAgICAgcy5wdXNoKFwidHJhbnNsYXRlKFwiICsgeGIgKyBweENvbW1hICsgeWIgKyBweFBhcmVuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByb3RhdGUoYSwgYiwgcywgcSkge1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgLSBiID4gMTgwKSBiICs9IDM2MDsgZWxzZSBpZiAoYiAtIGEgPiAxODApIGEgKz0gMzYwOyAvLyBzaG9ydGVzdCBwYXRoXG4gICAgICAgIHEucHVzaCh7aTogcy5wdXNoKHBvcChzKSArIFwicm90YXRlKFwiLCBudWxsLCBkZWdQYXJlbikgLSAyLCB4OiBudW1iZXIoYSwgYil9KTtcbiAgICAgIH0gZWxzZSBpZiAoYikge1xuICAgICAgICBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNrZXdYKGEsIGIsIHMsIHEpIHtcbiAgICAgIGlmIChhICE9PSBiKSB7XG4gICAgICAgIHEucHVzaCh7aTogcy5wdXNoKHBvcChzKSArIFwic2tld1goXCIsIG51bGwsIGRlZ1BhcmVuKSAtIDIsIHg6IG51bWJlcihhLCBiKX0pO1xuICAgICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICAgIHMucHVzaChwb3AocykgKyBcInNrZXdYKFwiICsgYiArIGRlZ1BhcmVuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FsZSh4YSwgeWEsIHhiLCB5YiwgcywgcSkge1xuICAgICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgICAgdmFyIGkgPSBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiwgbnVsbCwgXCIsXCIsIG51bGwsIFwiKVwiKTtcbiAgICAgICAgcS5wdXNoKHtpOiBpIC0gNCwgeDogbnVtYmVyKHhhLCB4Yil9LCB7aTogaSAtIDIsIHg6IG51bWJlcih5YSwgeWIpfSk7XG4gICAgICB9IGVsc2UgaWYgKHhiICE9PSAxIHx8IHliICE9PSAxKSB7XG4gICAgICAgIHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiICsgeGIgKyBcIixcIiArIHliICsgXCIpXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICB2YXIgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG4gICAgICBhID0gcGFyc2UoYSksIGIgPSBwYXJzZShiKTtcbiAgICAgIHRyYW5zbGF0ZShhLnRyYW5zbGF0ZVgsIGEudHJhbnNsYXRlWSwgYi50cmFuc2xhdGVYLCBiLnRyYW5zbGF0ZVksIHMsIHEpO1xuICAgICAgcm90YXRlKGEucm90YXRlLCBiLnJvdGF0ZSwgcywgcSk7XG4gICAgICBza2V3WChhLnNrZXdYLCBiLnNrZXdYLCBzLCBxKTtcbiAgICAgIHNjYWxlKGEuc2NhbGVYLCBhLnNjYWxlWSwgYi5zY2FsZVgsIGIuc2NhbGVZLCBzLCBxKTtcbiAgICAgIGEgPSBiID0gbnVsbDsgLy8gZ2NcbiAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHZhciBpID0gLTEsIG4gPSBxLmxlbmd0aCwgbztcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIHZhciBpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyA9IGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlQ3NzLCBcInB4LCBcIiwgXCJweClcIiwgXCJkZWcpXCIpO1xuICB2YXIgaW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmcgPSBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZVN2ZywgXCIsIFwiLCBcIilcIiwgXCIpXCIpO1xuXG4gIHZhciByaG8gPSBNYXRoLlNRUlQyO1xuICB2YXIgcmhvMiA9IDI7XG4gIHZhciByaG80ID0gNDtcbiAgdmFyIGVwc2lsb24yID0gMWUtMTI7XG4gIGZ1bmN0aW9uIGNvc2goeCkge1xuICAgIHJldHVybiAoKHggPSBNYXRoLmV4cCh4KSkgKyAxIC8geCkgLyAyO1xuICB9XG5cbiAgZnVuY3Rpb24gc2luaCh4KSB7XG4gICAgcmV0dXJuICgoeCA9IE1hdGguZXhwKHgpKSAtIDEgLyB4KSAvIDI7XG4gIH1cblxuICBmdW5jdGlvbiB0YW5oKHgpIHtcbiAgICByZXR1cm4gKCh4ID0gTWF0aC5leHAoMiAqIHgpKSAtIDEpIC8gKHggKyAxKTtcbiAgfVxuXG4gIC8vIHAwID0gW3V4MCwgdXkwLCB3MF1cbiAgLy8gcDEgPSBbdXgxLCB1eTEsIHcxXVxuICBmdW5jdGlvbiB6b29tKHAwLCBwMSkge1xuICAgIHZhciB1eDAgPSBwMFswXSwgdXkwID0gcDBbMV0sIHcwID0gcDBbMl0sXG4gICAgICAgIHV4MSA9IHAxWzBdLCB1eTEgPSBwMVsxXSwgdzEgPSBwMVsyXSxcbiAgICAgICAgZHggPSB1eDEgLSB1eDAsXG4gICAgICAgIGR5ID0gdXkxIC0gdXkwLFxuICAgICAgICBkMiA9IGR4ICogZHggKyBkeSAqIGR5LFxuICAgICAgICBpLFxuICAgICAgICBTO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciB1MCDiiYUgdTEuXG4gICAgaWYgKGQyIDwgZXBzaWxvbjIpIHtcbiAgICAgIFMgPSBNYXRoLmxvZyh3MSAvIHcwKSAvIHJobztcbiAgICAgIGkgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgdXgwICsgdCAqIGR4LFxuICAgICAgICAgIHV5MCArIHQgKiBkeSxcbiAgICAgICAgICB3MCAqIE1hdGguZXhwKHJobyAqIHQgKiBTKVxuICAgICAgICBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbmVyYWwgY2FzZS5cbiAgICBlbHNlIHtcbiAgICAgIHZhciBkMSA9IE1hdGguc3FydChkMiksXG4gICAgICAgICAgYjAgPSAodzEgKiB3MSAtIHcwICogdzAgKyByaG80ICogZDIpIC8gKDIgKiB3MCAqIHJobzIgKiBkMSksXG4gICAgICAgICAgYjEgPSAodzEgKiB3MSAtIHcwICogdzAgLSByaG80ICogZDIpIC8gKDIgKiB3MSAqIHJobzIgKiBkMSksXG4gICAgICAgICAgcjAgPSBNYXRoLmxvZyhNYXRoLnNxcnQoYjAgKiBiMCArIDEpIC0gYjApLFxuICAgICAgICAgIHIxID0gTWF0aC5sb2coTWF0aC5zcXJ0KGIxICogYjEgKyAxKSAtIGIxKTtcbiAgICAgIFMgPSAocjEgLSByMCkgLyByaG87XG4gICAgICBpID0gZnVuY3Rpb24odCkge1xuICAgICAgICB2YXIgcyA9IHQgKiBTLFxuICAgICAgICAgICAgY29zaHIwID0gY29zaChyMCksXG4gICAgICAgICAgICB1ID0gdzAgLyAocmhvMiAqIGQxKSAqIChjb3NocjAgKiB0YW5oKHJobyAqIHMgKyByMCkgLSBzaW5oKHIwKSk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgdXgwICsgdSAqIGR4LFxuICAgICAgICAgIHV5MCArIHUgKiBkeSxcbiAgICAgICAgICB3MCAqIGNvc2hyMCAvIGNvc2gocmhvICogcyArIHIwKVxuICAgICAgICBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGkuZHVyYXRpb24gPSBTICogMTAwMDtcblxuICAgIHJldHVybiBpO1xuICB9XG5cbiAgZnVuY3Rpb24gaHNsJDEoaHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHZhciBoID0gaHVlKChzdGFydCA9IGQzQ29sb3IuaHNsKHN0YXJ0KSkuaCwgKGVuZCA9IGQzQ29sb3IuaHNsKGVuZCkpLmgpLFxuICAgICAgICAgIHMgPSBub2dhbW1hKHN0YXJ0LnMsIGVuZC5zKSxcbiAgICAgICAgICBsID0gbm9nYW1tYShzdGFydC5sLCBlbmQubCksXG4gICAgICAgICAgb3BhY2l0eSA9IG5vZ2FtbWEoc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgc3RhcnQuaCA9IGgodCk7XG4gICAgICAgIHN0YXJ0LnMgPSBzKHQpO1xuICAgICAgICBzdGFydC5sID0gbCh0KTtcbiAgICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBoc2wkMiA9IGhzbCQxKGh1ZSk7XG4gIHZhciBoc2xMb25nID0gaHNsJDEobm9nYW1tYSk7XG5cbiAgZnVuY3Rpb24gbGFiJDEoc3RhcnQsIGVuZCkge1xuICAgIHZhciBsID0gbm9nYW1tYSgoc3RhcnQgPSBkM0NvbG9yLmxhYihzdGFydCkpLmwsIChlbmQgPSBkM0NvbG9yLmxhYihlbmQpKS5sKSxcbiAgICAgICAgYSA9IG5vZ2FtbWEoc3RhcnQuYSwgZW5kLmEpLFxuICAgICAgICBiID0gbm9nYW1tYShzdGFydC5iLCBlbmQuYiksXG4gICAgICAgIG9wYWNpdHkgPSBub2dhbW1hKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQubCA9IGwodCk7XG4gICAgICBzdGFydC5hID0gYSh0KTtcbiAgICAgIHN0YXJ0LmIgPSBiKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBoY2wkMShodWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgdmFyIGggPSBodWUoKHN0YXJ0ID0gZDNDb2xvci5oY2woc3RhcnQpKS5oLCAoZW5kID0gZDNDb2xvci5oY2woZW5kKSkuaCksXG4gICAgICAgICAgYyA9IG5vZ2FtbWEoc3RhcnQuYywgZW5kLmMpLFxuICAgICAgICAgIGwgPSBub2dhbW1hKHN0YXJ0LmwsIGVuZC5sKSxcbiAgICAgICAgICBvcGFjaXR5ID0gbm9nYW1tYShzdGFydC5vcGFjaXR5LCBlbmQub3BhY2l0eSk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICBzdGFydC5oID0gaCh0KTtcbiAgICAgICAgc3RhcnQuYyA9IGModCk7XG4gICAgICAgIHN0YXJ0LmwgPSBsKHQpO1xuICAgICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0ICsgXCJcIjtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIGhjbCQyID0gaGNsJDEoaHVlKTtcbiAgdmFyIGhjbExvbmcgPSBoY2wkMShub2dhbW1hKTtcblxuICBmdW5jdGlvbiBjdWJlaGVsaXgkMShodWUpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIGN1YmVoZWxpeEdhbW1hKHkpIHtcbiAgICAgIHkgPSAreTtcblxuICAgICAgZnVuY3Rpb24gY3ViZWhlbGl4KHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdmFyIGggPSBodWUoKHN0YXJ0ID0gZDNDb2xvci5jdWJlaGVsaXgoc3RhcnQpKS5oLCAoZW5kID0gZDNDb2xvci5jdWJlaGVsaXgoZW5kKSkuaCksXG4gICAgICAgICAgICBzID0gbm9nYW1tYShzdGFydC5zLCBlbmQucyksXG4gICAgICAgICAgICBsID0gbm9nYW1tYShzdGFydC5sLCBlbmQubCksXG4gICAgICAgICAgICBvcGFjaXR5ID0gbm9nYW1tYShzdGFydC5vcGFjaXR5LCBlbmQub3BhY2l0eSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgc3RhcnQuaCA9IGgodCk7XG4gICAgICAgICAgc3RhcnQucyA9IHModCk7XG4gICAgICAgICAgc3RhcnQubCA9IGwoTWF0aC5wb3codCwgeSkpO1xuICAgICAgICAgIHN0YXJ0Lm9wYWNpdHkgPSBvcGFjaXR5KHQpO1xuICAgICAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGN1YmVoZWxpeC5nYW1tYSA9IGN1YmVoZWxpeEdhbW1hO1xuXG4gICAgICByZXR1cm4gY3ViZWhlbGl4O1xuICAgIH0pKDEpO1xuICB9XG5cbiAgdmFyIGN1YmVoZWxpeCQyID0gY3ViZWhlbGl4JDEoaHVlKTtcbiAgdmFyIGN1YmVoZWxpeExvbmcgPSBjdWJlaGVsaXgkMShub2dhbW1hKTtcblxuICBmdW5jdGlvbiBxdWFudGl6ZShpbnRlcnBvbGF0b3IsIG4pIHtcbiAgICB2YXIgc2FtcGxlcyA9IG5ldyBBcnJheShuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSkgc2FtcGxlc1tpXSA9IGludGVycG9sYXRvcihpIC8gKG4gLSAxKSk7XG4gICAgcmV0dXJuIHNhbXBsZXM7XG4gIH1cblxuICBleHBvcnRzLmludGVycG9sYXRlID0gdmFsdWU7XG4gIGV4cG9ydHMuaW50ZXJwb2xhdGVBcnJheSA9IGFycmF5O1xuICBleHBvcnRzLmludGVycG9sYXRlQmFzaXMgPSBiYXNpcyQxO1xuICBleHBvcnRzLmludGVycG9sYXRlQmFzaXNDbG9zZWQgPSBiYXNpc0Nsb3NlZDtcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZURhdGUgPSBkYXRlO1xuICBleHBvcnRzLmludGVycG9sYXRlTnVtYmVyID0gbnVtYmVyO1xuICBleHBvcnRzLmludGVycG9sYXRlT2JqZWN0ID0gb2JqZWN0O1xuICBleHBvcnRzLmludGVycG9sYXRlUm91bmQgPSByb3VuZDtcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZVN0cmluZyA9IHN0cmluZztcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyA9IGludGVycG9sYXRlVHJhbnNmb3JtQ3NzO1xuICBleHBvcnRzLmludGVycG9sYXRlVHJhbnNmb3JtU3ZnID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm1Tdmc7XG4gIGV4cG9ydHMuaW50ZXJwb2xhdGVab29tID0gem9vbTtcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZVJnYiA9IHJnYiQxO1xuICBleHBvcnRzLmludGVycG9sYXRlUmdiQmFzaXMgPSByZ2JCYXNpcztcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZVJnYkJhc2lzQ2xvc2VkID0gcmdiQmFzaXNDbG9zZWQ7XG4gIGV4cG9ydHMuaW50ZXJwb2xhdGVIc2wgPSBoc2wkMjtcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZUhzbExvbmcgPSBoc2xMb25nO1xuICBleHBvcnRzLmludGVycG9sYXRlTGFiID0gbGFiJDE7XG4gIGV4cG9ydHMuaW50ZXJwb2xhdGVIY2wgPSBoY2wkMjtcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZUhjbExvbmcgPSBoY2xMb25nO1xuICBleHBvcnRzLmludGVycG9sYXRlQ3ViZWhlbGl4ID0gY3ViZWhlbGl4JDI7XG4gIGV4cG9ydHMuaW50ZXJwb2xhdGVDdWJlaGVsaXhMb25nID0gY3ViZWhlbGl4TG9uZztcbiAgZXhwb3J0cy5xdWFudGl6ZSA9IHF1YW50aXplO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKTsiLCIvLyBodHRwczovL2QzanMub3JnL2QzLXNjYWxlLyBWZXJzaW9uIDEuMC4zLiBDb3B5cmlnaHQgMjAxNiBNaWtlIEJvc3RvY2suXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJ2QzLWFycmF5JyksIHJlcXVpcmUoJ2QzLWNvbGxlY3Rpb24nKSwgcmVxdWlyZSgnZDMtaW50ZXJwb2xhdGUnKSwgcmVxdWlyZSgnZDMtZm9ybWF0JyksIHJlcXVpcmUoJ2QzLXRpbWUnKSwgcmVxdWlyZSgnZDMtdGltZS1mb3JtYXQnKSwgcmVxdWlyZSgnZDMtY29sb3InKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJywgJ2QzLWFycmF5JywgJ2QzLWNvbGxlY3Rpb24nLCAnZDMtaW50ZXJwb2xhdGUnLCAnZDMtZm9ybWF0JywgJ2QzLXRpbWUnLCAnZDMtdGltZS1mb3JtYXQnLCAnZDMtY29sb3InXSwgZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgoZ2xvYmFsLmQzID0gZ2xvYmFsLmQzIHx8IHt9KSxnbG9iYWwuZDMsZ2xvYmFsLmQzLGdsb2JhbC5kMyxnbG9iYWwuZDMsZ2xvYmFsLmQzLGdsb2JhbC5kMyxnbG9iYWwuZDMpKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsZDNBcnJheSxkM0NvbGxlY3Rpb24sZDNJbnRlcnBvbGF0ZSxkM0Zvcm1hdCxkM1RpbWUsZDNUaW1lRm9ybWF0LGQzQ29sb3IpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBhcnJheSA9IEFycmF5LnByb3RvdHlwZTtcblxuICB2YXIgbWFwJDEgPSBhcnJheS5tYXA7XG4gIHZhciBzbGljZSA9IGFycmF5LnNsaWNlO1xuXG4gIHZhciBpbXBsaWNpdCA9IHtuYW1lOiBcImltcGxpY2l0XCJ9O1xuXG4gIGZ1bmN0aW9uIG9yZGluYWwocmFuZ2UpIHtcbiAgICB2YXIgaW5kZXggPSBkM0NvbGxlY3Rpb24ubWFwKCksXG4gICAgICAgIGRvbWFpbiA9IFtdLFxuICAgICAgICB1bmtub3duID0gaW1wbGljaXQ7XG5cbiAgICByYW5nZSA9IHJhbmdlID09IG51bGwgPyBbXSA6IHNsaWNlLmNhbGwocmFuZ2UpO1xuXG4gICAgZnVuY3Rpb24gc2NhbGUoZCkge1xuICAgICAgdmFyIGtleSA9IGQgKyBcIlwiLCBpID0gaW5kZXguZ2V0KGtleSk7XG4gICAgICBpZiAoIWkpIHtcbiAgICAgICAgaWYgKHVua25vd24gIT09IGltcGxpY2l0KSByZXR1cm4gdW5rbm93bjtcbiAgICAgICAgaW5kZXguc2V0KGtleSwgaSA9IGRvbWFpbi5wdXNoKGQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByYW5nZVsoaSAtIDEpICUgcmFuZ2UubGVuZ3RoXTtcbiAgICB9XG5cbiAgICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkb21haW4uc2xpY2UoKTtcbiAgICAgIGRvbWFpbiA9IFtdLCBpbmRleCA9IGQzQ29sbGVjdGlvbi5tYXAoKTtcbiAgICAgIHZhciBpID0gLTEsIG4gPSBfLmxlbmd0aCwgZCwga2V5O1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICghaW5kZXguaGFzKGtleSA9IChkID0gX1tpXSkgKyBcIlwiKSkgaW5kZXguc2V0KGtleSwgZG9tYWluLnB1c2goZCkpO1xuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH07XG5cbiAgICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHJhbmdlID0gc2xpY2UuY2FsbChfKSwgc2NhbGUpIDogcmFuZ2Uuc2xpY2UoKTtcbiAgICB9O1xuXG4gICAgc2NhbGUudW5rbm93biA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHVua25vd24gPSBfLCBzY2FsZSkgOiB1bmtub3duO1xuICAgIH07XG5cbiAgICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gb3JkaW5hbCgpXG4gICAgICAgICAgLmRvbWFpbihkb21haW4pXG4gICAgICAgICAgLnJhbmdlKHJhbmdlKVxuICAgICAgICAgIC51bmtub3duKHVua25vd24pO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICBmdW5jdGlvbiBiYW5kKCkge1xuICAgIHZhciBzY2FsZSA9IG9yZGluYWwoKS51bmtub3duKHVuZGVmaW5lZCksXG4gICAgICAgIGRvbWFpbiA9IHNjYWxlLmRvbWFpbixcbiAgICAgICAgb3JkaW5hbFJhbmdlID0gc2NhbGUucmFuZ2UsXG4gICAgICAgIHJhbmdlID0gWzAsIDFdLFxuICAgICAgICBzdGVwLFxuICAgICAgICBiYW5kd2lkdGgsXG4gICAgICAgIHJvdW5kID0gZmFsc2UsXG4gICAgICAgIHBhZGRpbmdJbm5lciA9IDAsXG4gICAgICAgIHBhZGRpbmdPdXRlciA9IDAsXG4gICAgICAgIGFsaWduID0gMC41O1xuXG4gICAgZGVsZXRlIHNjYWxlLnVua25vd247XG5cbiAgICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgICAgdmFyIG4gPSBkb21haW4oKS5sZW5ndGgsXG4gICAgICAgICAgcmV2ZXJzZSA9IHJhbmdlWzFdIDwgcmFuZ2VbMF0sXG4gICAgICAgICAgc3RhcnQgPSByYW5nZVtyZXZlcnNlIC0gMF0sXG4gICAgICAgICAgc3RvcCA9IHJhbmdlWzEgLSByZXZlcnNlXTtcbiAgICAgIHN0ZXAgPSAoc3RvcCAtIHN0YXJ0KSAvIE1hdGgubWF4KDEsIG4gLSBwYWRkaW5nSW5uZXIgKyBwYWRkaW5nT3V0ZXIgKiAyKTtcbiAgICAgIGlmIChyb3VuZCkgc3RlcCA9IE1hdGguZmxvb3Ioc3RlcCk7XG4gICAgICBzdGFydCArPSAoc3RvcCAtIHN0YXJ0IC0gc3RlcCAqIChuIC0gcGFkZGluZ0lubmVyKSkgKiBhbGlnbjtcbiAgICAgIGJhbmR3aWR0aCA9IHN0ZXAgKiAoMSAtIHBhZGRpbmdJbm5lcik7XG4gICAgICBpZiAocm91bmQpIHN0YXJ0ID0gTWF0aC5yb3VuZChzdGFydCksIGJhbmR3aWR0aCA9IE1hdGgucm91bmQoYmFuZHdpZHRoKTtcbiAgICAgIHZhciB2YWx1ZXMgPSBkM0FycmF5LnJhbmdlKG4pLm1hcChmdW5jdGlvbihpKSB7IHJldHVybiBzdGFydCArIHN0ZXAgKiBpOyB9KTtcbiAgICAgIHJldHVybiBvcmRpbmFsUmFuZ2UocmV2ZXJzZSA/IHZhbHVlcy5yZXZlcnNlKCkgOiB2YWx1ZXMpO1xuICAgIH1cblxuICAgIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGRvbWFpbihfKSwgcmVzY2FsZSgpKSA6IGRvbWFpbigpO1xuICAgIH07XG5cbiAgICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHJhbmdlID0gWytfWzBdLCArX1sxXV0sIHJlc2NhbGUoKSkgOiByYW5nZS5zbGljZSgpO1xuICAgIH07XG5cbiAgICBzY2FsZS5yYW5nZVJvdW5kID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIHJhbmdlID0gWytfWzBdLCArX1sxXV0sIHJvdW5kID0gdHJ1ZSwgcmVzY2FsZSgpO1xuICAgIH07XG5cbiAgICBzY2FsZS5iYW5kd2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBiYW5kd2lkdGg7XG4gICAgfTtcblxuICAgIHNjYWxlLnN0ZXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzdGVwO1xuICAgIH07XG5cbiAgICBzY2FsZS5yb3VuZCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHJvdW5kID0gISFfLCByZXNjYWxlKCkpIDogcm91bmQ7XG4gICAgfTtcblxuICAgIHNjYWxlLnBhZGRpbmcgPSBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChwYWRkaW5nSW5uZXIgPSBwYWRkaW5nT3V0ZXIgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBfKSksIHJlc2NhbGUoKSkgOiBwYWRkaW5nSW5uZXI7XG4gICAgfTtcblxuICAgIHNjYWxlLnBhZGRpbmdJbm5lciA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHBhZGRpbmdJbm5lciA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIF8pKSwgcmVzY2FsZSgpKSA6IHBhZGRpbmdJbm5lcjtcbiAgICB9O1xuXG4gICAgc2NhbGUucGFkZGluZ091dGVyID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocGFkZGluZ091dGVyID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgXykpLCByZXNjYWxlKCkpIDogcGFkZGluZ091dGVyO1xuICAgIH07XG5cbiAgICBzY2FsZS5hbGlnbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGFsaWduID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgXykpLCByZXNjYWxlKCkpIDogYWxpZ247XG4gICAgfTtcblxuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBiYW5kKClcbiAgICAgICAgICAuZG9tYWluKGRvbWFpbigpKVxuICAgICAgICAgIC5yYW5nZShyYW5nZSlcbiAgICAgICAgICAucm91bmQocm91bmQpXG4gICAgICAgICAgLnBhZGRpbmdJbm5lcihwYWRkaW5nSW5uZXIpXG4gICAgICAgICAgLnBhZGRpbmdPdXRlcihwYWRkaW5nT3V0ZXIpXG4gICAgICAgICAgLmFsaWduKGFsaWduKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50aXNoKHNjYWxlKSB7XG4gICAgdmFyIGNvcHkgPSBzY2FsZS5jb3B5O1xuXG4gICAgc2NhbGUucGFkZGluZyA9IHNjYWxlLnBhZGRpbmdPdXRlcjtcbiAgICBkZWxldGUgc2NhbGUucGFkZGluZ0lubmVyO1xuICAgIGRlbGV0ZSBzY2FsZS5wYWRkaW5nT3V0ZXI7XG5cbiAgICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcG9pbnRpc2goY29weSgpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNjYWxlO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnQoKSB7XG4gICAgcmV0dXJuIHBvaW50aXNoKGJhbmQoKS5wYWRkaW5nSW5uZXIoMSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3RhbnQoeCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBudW1iZXIoeCkge1xuICAgIHJldHVybiAreDtcbiAgfVxuXG4gIHZhciB1bml0ID0gWzAsIDFdO1xuXG4gIGZ1bmN0aW9uIGRlaW50ZXJwb2xhdGUoYSwgYikge1xuICAgIHJldHVybiAoYiAtPSAoYSA9ICthKSlcbiAgICAgICAgPyBmdW5jdGlvbih4KSB7IHJldHVybiAoeCAtIGEpIC8gYjsgfVxuICAgICAgICA6IGNvbnN0YW50KGIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVpbnRlcnBvbGF0ZUNsYW1wKGRlaW50ZXJwb2xhdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIGQgPSBkZWludGVycG9sYXRlKGEgPSArYSwgYiA9ICtiKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbih4KSB7IHJldHVybiB4IDw9IGEgPyAwIDogeCA+PSBiID8gMSA6IGQoeCk7IH07XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlaW50ZXJwb2xhdGVDbGFtcChyZWludGVycG9sYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciByID0gcmVpbnRlcnBvbGF0ZShhID0gK2EsIGIgPSArYik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gdCA8PSAwID8gYSA6IHQgPj0gMSA/IGIgOiByKHQpOyB9O1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBiaW1hcChkb21haW4sIHJhbmdlLCBkZWludGVycG9sYXRlLCByZWludGVycG9sYXRlKSB7XG4gICAgdmFyIGQwID0gZG9tYWluWzBdLCBkMSA9IGRvbWFpblsxXSwgcjAgPSByYW5nZVswXSwgcjEgPSByYW5nZVsxXTtcbiAgICBpZiAoZDEgPCBkMCkgZDAgPSBkZWludGVycG9sYXRlKGQxLCBkMCksIHIwID0gcmVpbnRlcnBvbGF0ZShyMSwgcjApO1xuICAgIGVsc2UgZDAgPSBkZWludGVycG9sYXRlKGQwLCBkMSksIHIwID0gcmVpbnRlcnBvbGF0ZShyMCwgcjEpO1xuICAgIHJldHVybiBmdW5jdGlvbih4KSB7IHJldHVybiByMChkMCh4KSk7IH07XG4gIH1cblxuICBmdW5jdGlvbiBwb2x5bWFwKGRvbWFpbiwgcmFuZ2UsIGRlaW50ZXJwb2xhdGUsIHJlaW50ZXJwb2xhdGUpIHtcbiAgICB2YXIgaiA9IE1hdGgubWluKGRvbWFpbi5sZW5ndGgsIHJhbmdlLmxlbmd0aCkgLSAxLFxuICAgICAgICBkID0gbmV3IEFycmF5KGopLFxuICAgICAgICByID0gbmV3IEFycmF5KGopLFxuICAgICAgICBpID0gLTE7XG5cbiAgICAvLyBSZXZlcnNlIGRlc2NlbmRpbmcgZG9tYWlucy5cbiAgICBpZiAoZG9tYWluW2pdIDwgZG9tYWluWzBdKSB7XG4gICAgICBkb21haW4gPSBkb21haW4uc2xpY2UoKS5yZXZlcnNlKCk7XG4gICAgICByYW5nZSA9IHJhbmdlLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIHdoaWxlICgrK2kgPCBqKSB7XG4gICAgICBkW2ldID0gZGVpbnRlcnBvbGF0ZShkb21haW5baV0sIGRvbWFpbltpICsgMV0pO1xuICAgICAgcltpXSA9IHJlaW50ZXJwb2xhdGUocmFuZ2VbaV0sIHJhbmdlW2kgKyAxXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgIHZhciBpID0gZDNBcnJheS5iaXNlY3QoZG9tYWluLCB4LCAxLCBqKSAtIDE7XG4gICAgICByZXR1cm4gcltpXShkW2ldKHgpKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29weShzb3VyY2UsIHRhcmdldCkge1xuICAgIHJldHVybiB0YXJnZXRcbiAgICAgICAgLmRvbWFpbihzb3VyY2UuZG9tYWluKCkpXG4gICAgICAgIC5yYW5nZShzb3VyY2UucmFuZ2UoKSlcbiAgICAgICAgLmludGVycG9sYXRlKHNvdXJjZS5pbnRlcnBvbGF0ZSgpKVxuICAgICAgICAuY2xhbXAoc291cmNlLmNsYW1wKCkpO1xuICB9XG5cbiAgLy8gZGVpbnRlcnBvbGF0ZShhLCBiKSh4KSB0YWtlcyBhIGRvbWFpbiB2YWx1ZSB4IGluIFthLGJdIGFuZCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHBhcmFtZXRlciB0IGluIFswLDFdLlxuICAvLyByZWludGVycG9sYXRlKGEsIGIpKHQpIHRha2VzIGEgcGFyYW1ldGVyIHQgaW4gWzAsMV0gYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgZG9tYWluIHZhbHVlIHggaW4gW2EsYl0uXG4gIGZ1bmN0aW9uIGNvbnRpbnVvdXMoZGVpbnRlcnBvbGF0ZSQkLCByZWludGVycG9sYXRlKSB7XG4gICAgdmFyIGRvbWFpbiA9IHVuaXQsXG4gICAgICAgIHJhbmdlID0gdW5pdCxcbiAgICAgICAgaW50ZXJwb2xhdGUgPSBkM0ludGVycG9sYXRlLmludGVycG9sYXRlLFxuICAgICAgICBjbGFtcCA9IGZhbHNlLFxuICAgICAgICBwaWVjZXdpc2UsXG4gICAgICAgIG91dHB1dCxcbiAgICAgICAgaW5wdXQ7XG5cbiAgICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgICAgcGllY2V3aXNlID0gTWF0aC5taW4oZG9tYWluLmxlbmd0aCwgcmFuZ2UubGVuZ3RoKSA+IDIgPyBwb2x5bWFwIDogYmltYXA7XG4gICAgICBvdXRwdXQgPSBpbnB1dCA9IG51bGw7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgICAgcmV0dXJuIChvdXRwdXQgfHwgKG91dHB1dCA9IHBpZWNld2lzZShkb21haW4sIHJhbmdlLCBjbGFtcCA/IGRlaW50ZXJwb2xhdGVDbGFtcChkZWludGVycG9sYXRlJCQpIDogZGVpbnRlcnBvbGF0ZSQkLCBpbnRlcnBvbGF0ZSkpKSgreCk7XG4gICAgfVxuXG4gICAgc2NhbGUuaW52ZXJ0ID0gZnVuY3Rpb24oeSkge1xuICAgICAgcmV0dXJuIChpbnB1dCB8fCAoaW5wdXQgPSBwaWVjZXdpc2UocmFuZ2UsIGRvbWFpbiwgZGVpbnRlcnBvbGF0ZSwgY2xhbXAgPyByZWludGVycG9sYXRlQ2xhbXAocmVpbnRlcnBvbGF0ZSkgOiByZWludGVycG9sYXRlKSkpKCt5KTtcbiAgICB9O1xuXG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZG9tYWluID0gbWFwJDEuY2FsbChfLCBudW1iZXIpLCByZXNjYWxlKCkpIDogZG9tYWluLnNsaWNlKCk7XG4gICAgfTtcblxuICAgIHNjYWxlLnJhbmdlID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocmFuZ2UgPSBzbGljZS5jYWxsKF8pLCByZXNjYWxlKCkpIDogcmFuZ2Uuc2xpY2UoKTtcbiAgICB9O1xuXG4gICAgc2NhbGUucmFuZ2VSb3VuZCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiByYW5nZSA9IHNsaWNlLmNhbGwoXyksIGludGVycG9sYXRlID0gZDNJbnRlcnBvbGF0ZS5pbnRlcnBvbGF0ZVJvdW5kLCByZXNjYWxlKCk7XG4gICAgfTtcblxuICAgIHNjYWxlLmNsYW1wID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoY2xhbXAgPSAhIV8sIHJlc2NhbGUoKSkgOiBjbGFtcDtcbiAgICB9O1xuXG4gICAgc2NhbGUuaW50ZXJwb2xhdGUgPSBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChpbnRlcnBvbGF0ZSA9IF8sIHJlc2NhbGUoKSkgOiBpbnRlcnBvbGF0ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpY2tGb3JtYXQoZG9tYWluLCBjb3VudCwgc3BlY2lmaWVyKSB7XG4gICAgdmFyIHN0YXJ0ID0gZG9tYWluWzBdLFxuICAgICAgICBzdG9wID0gZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXSxcbiAgICAgICAgc3RlcCA9IGQzQXJyYXkudGlja1N0ZXAoc3RhcnQsIHN0b3AsIGNvdW50ID09IG51bGwgPyAxMCA6IGNvdW50KSxcbiAgICAgICAgcHJlY2lzaW9uO1xuICAgIHNwZWNpZmllciA9IGQzRm9ybWF0LmZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIgPT0gbnVsbCA/IFwiLGZcIiA6IHNwZWNpZmllcik7XG4gICAgc3dpdGNoIChzcGVjaWZpZXIudHlwZSkge1xuICAgICAgY2FzZSBcInNcIjoge1xuICAgICAgICB2YXIgdmFsdWUgPSBNYXRoLm1heChNYXRoLmFicyhzdGFydCksIE1hdGguYWJzKHN0b3ApKTtcbiAgICAgICAgaWYgKHNwZWNpZmllci5wcmVjaXNpb24gPT0gbnVsbCAmJiAhaXNOYU4ocHJlY2lzaW9uID0gZDNGb3JtYXQucHJlY2lzaW9uUHJlZml4KHN0ZXAsIHZhbHVlKSkpIHNwZWNpZmllci5wcmVjaXNpb24gPSBwcmVjaXNpb247XG4gICAgICAgIHJldHVybiBkM0Zvcm1hdC5mb3JtYXRQcmVmaXgoc3BlY2lmaWVyLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiXCI6XG4gICAgICBjYXNlIFwiZVwiOlxuICAgICAgY2FzZSBcImdcIjpcbiAgICAgIGNhc2UgXCJwXCI6XG4gICAgICBjYXNlIFwiclwiOiB7XG4gICAgICAgIGlmIChzcGVjaWZpZXIucHJlY2lzaW9uID09IG51bGwgJiYgIWlzTmFOKHByZWNpc2lvbiA9IGQzRm9ybWF0LnByZWNpc2lvblJvdW5kKHN0ZXAsIE1hdGgubWF4KE1hdGguYWJzKHN0YXJ0KSwgTWF0aC5hYnMoc3RvcCkpKSkpIHNwZWNpZmllci5wcmVjaXNpb24gPSBwcmVjaXNpb24gLSAoc3BlY2lmaWVyLnR5cGUgPT09IFwiZVwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZlwiOlxuICAgICAgY2FzZSBcIiVcIjoge1xuICAgICAgICBpZiAoc3BlY2lmaWVyLnByZWNpc2lvbiA9PSBudWxsICYmICFpc05hTihwcmVjaXNpb24gPSBkM0Zvcm1hdC5wcmVjaXNpb25GaXhlZChzdGVwKSkpIHNwZWNpZmllci5wcmVjaXNpb24gPSBwcmVjaXNpb24gLSAoc3BlY2lmaWVyLnR5cGUgPT09IFwiJVwiKSAqIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZDNGb3JtYXQuZm9ybWF0KHNwZWNpZmllcik7XG4gIH1cblxuICBmdW5jdGlvbiBsaW5lYXJpc2goc2NhbGUpIHtcbiAgICB2YXIgZG9tYWluID0gc2NhbGUuZG9tYWluO1xuXG4gICAgc2NhbGUudGlja3MgPSBmdW5jdGlvbihjb3VudCkge1xuICAgICAgdmFyIGQgPSBkb21haW4oKTtcbiAgICAgIHJldHVybiBkM0FycmF5LnRpY2tzKGRbMF0sIGRbZC5sZW5ndGggLSAxXSwgY291bnQgPT0gbnVsbCA/IDEwIDogY291bnQpO1xuICAgIH07XG5cbiAgICBzY2FsZS50aWNrRm9ybWF0ID0gZnVuY3Rpb24oY291bnQsIHNwZWNpZmllcikge1xuICAgICAgcmV0dXJuIHRpY2tGb3JtYXQoZG9tYWluKCksIGNvdW50LCBzcGVjaWZpZXIpO1xuICAgIH07XG5cbiAgICBzY2FsZS5uaWNlID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICAgIHZhciBkID0gZG9tYWluKCksXG4gICAgICAgICAgaSA9IGQubGVuZ3RoIC0gMSxcbiAgICAgICAgICBuID0gY291bnQgPT0gbnVsbCA/IDEwIDogY291bnQsXG4gICAgICAgICAgc3RhcnQgPSBkWzBdLFxuICAgICAgICAgIHN0b3AgPSBkW2ldLFxuICAgICAgICAgIHN0ZXAgPSBkM0FycmF5LnRpY2tTdGVwKHN0YXJ0LCBzdG9wLCBuKTtcblxuICAgICAgaWYgKHN0ZXApIHtcbiAgICAgICAgc3RlcCA9IGQzQXJyYXkudGlja1N0ZXAoTWF0aC5mbG9vcihzdGFydCAvIHN0ZXApICogc3RlcCwgTWF0aC5jZWlsKHN0b3AgLyBzdGVwKSAqIHN0ZXAsIG4pO1xuICAgICAgICBkWzBdID0gTWF0aC5mbG9vcihzdGFydCAvIHN0ZXApICogc3RlcDtcbiAgICAgICAgZFtpXSA9IE1hdGguY2VpbChzdG9wIC8gc3RlcCkgKiBzdGVwO1xuICAgICAgICBkb21haW4oZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNjYWxlO1xuICB9XG5cbiAgZnVuY3Rpb24gbGluZWFyKCkge1xuICAgIHZhciBzY2FsZSA9IGNvbnRpbnVvdXMoZGVpbnRlcnBvbGF0ZSwgZDNJbnRlcnBvbGF0ZS5pbnRlcnBvbGF0ZU51bWJlcik7XG5cbiAgICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY29weShzY2FsZSwgbGluZWFyKCkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gbGluZWFyaXNoKHNjYWxlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlkZW50aXR5KCkge1xuICAgIHZhciBkb21haW4gPSBbMCwgMV07XG5cbiAgICBmdW5jdGlvbiBzY2FsZSh4KSB7XG4gICAgICByZXR1cm4gK3g7XG4gICAgfVxuXG4gICAgc2NhbGUuaW52ZXJ0ID0gc2NhbGU7XG5cbiAgICBzY2FsZS5kb21haW4gPSBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGRvbWFpbiA9IG1hcCQxLmNhbGwoXywgbnVtYmVyKSwgc2NhbGUpIDogZG9tYWluLnNsaWNlKCk7XG4gICAgfTtcblxuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBpZGVudGl0eSgpLmRvbWFpbihkb21haW4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gbGluZWFyaXNoKHNjYWxlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5pY2UoZG9tYWluLCBpbnRlcnZhbCkge1xuICAgIGRvbWFpbiA9IGRvbWFpbi5zbGljZSgpO1xuXG4gICAgdmFyIGkwID0gMCxcbiAgICAgICAgaTEgPSBkb21haW4ubGVuZ3RoIC0gMSxcbiAgICAgICAgeDAgPSBkb21haW5baTBdLFxuICAgICAgICB4MSA9IGRvbWFpbltpMV0sXG4gICAgICAgIHQ7XG5cbiAgICBpZiAoeDEgPCB4MCkge1xuICAgICAgdCA9IGkwLCBpMCA9IGkxLCBpMSA9IHQ7XG4gICAgICB0ID0geDAsIHgwID0geDEsIHgxID0gdDtcbiAgICB9XG5cbiAgICBkb21haW5baTBdID0gaW50ZXJ2YWwuZmxvb3IoeDApO1xuICAgIGRvbWFpbltpMV0gPSBpbnRlcnZhbC5jZWlsKHgxKTtcbiAgICByZXR1cm4gZG9tYWluO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVpbnRlcnBvbGF0ZSQxKGEsIGIpIHtcbiAgICByZXR1cm4gKGIgPSBNYXRoLmxvZyhiIC8gYSkpXG4gICAgICAgID8gZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5sb2coeCAvIGEpIC8gYjsgfVxuICAgICAgICA6IGNvbnN0YW50KGIpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVpbnRlcnBvbGF0ZShhLCBiKSB7XG4gICAgcmV0dXJuIGEgPCAwXG4gICAgICAgID8gZnVuY3Rpb24odCkgeyByZXR1cm4gLU1hdGgucG93KC1iLCB0KSAqIE1hdGgucG93KC1hLCAxIC0gdCk7IH1cbiAgICAgICAgOiBmdW5jdGlvbih0KSB7IHJldHVybiBNYXRoLnBvdyhiLCB0KSAqIE1hdGgucG93KGEsIDEgLSB0KTsgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvdzEwKHgpIHtcbiAgICByZXR1cm4gaXNGaW5pdGUoeCkgPyArKFwiMWVcIiArIHgpIDogeCA8IDAgPyAwIDogeDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvd3AoYmFzZSkge1xuICAgIHJldHVybiBiYXNlID09PSAxMCA/IHBvdzEwXG4gICAgICAgIDogYmFzZSA9PT0gTWF0aC5FID8gTWF0aC5leHBcbiAgICAgICAgOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnBvdyhiYXNlLCB4KTsgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ3AoYmFzZSkge1xuICAgIHJldHVybiBiYXNlID09PSBNYXRoLkUgPyBNYXRoLmxvZ1xuICAgICAgICA6IGJhc2UgPT09IDEwICYmIE1hdGgubG9nMTBcbiAgICAgICAgfHwgYmFzZSA9PT0gMiAmJiBNYXRoLmxvZzJcbiAgICAgICAgfHwgKGJhc2UgPSBNYXRoLmxvZyhiYXNlKSwgZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5sb2coeCkgLyBiYXNlOyB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZmxlY3QoZikge1xuICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gLWYoLXgpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsb2coKSB7XG4gICAgdmFyIHNjYWxlID0gY29udGludW91cyhkZWludGVycG9sYXRlJDEsIHJlaW50ZXJwb2xhdGUpLmRvbWFpbihbMSwgMTBdKSxcbiAgICAgICAgZG9tYWluID0gc2NhbGUuZG9tYWluLFxuICAgICAgICBiYXNlID0gMTAsXG4gICAgICAgIGxvZ3MgPSBsb2dwKDEwKSxcbiAgICAgICAgcG93cyA9IHBvd3AoMTApO1xuXG4gICAgZnVuY3Rpb24gcmVzY2FsZSgpIHtcbiAgICAgIGxvZ3MgPSBsb2dwKGJhc2UpLCBwb3dzID0gcG93cChiYXNlKTtcbiAgICAgIGlmIChkb21haW4oKVswXSA8IDApIGxvZ3MgPSByZWZsZWN0KGxvZ3MpLCBwb3dzID0gcmVmbGVjdChwb3dzKTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9XG5cbiAgICBzY2FsZS5iYXNlID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoYmFzZSA9ICtfLCByZXNjYWxlKCkpIDogYmFzZTtcbiAgICB9O1xuXG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZG9tYWluKF8pLCByZXNjYWxlKCkpIDogZG9tYWluKCk7XG4gICAgfTtcblxuICAgIHNjYWxlLnRpY2tzID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICAgIHZhciBkID0gZG9tYWluKCksXG4gICAgICAgICAgdSA9IGRbMF0sXG4gICAgICAgICAgdiA9IGRbZC5sZW5ndGggLSAxXSxcbiAgICAgICAgICByO1xuXG4gICAgICBpZiAociA9IHYgPCB1KSBpID0gdSwgdSA9IHYsIHYgPSBpO1xuXG4gICAgICB2YXIgaSA9IGxvZ3ModSksXG4gICAgICAgICAgaiA9IGxvZ3ModiksXG4gICAgICAgICAgcCxcbiAgICAgICAgICBrLFxuICAgICAgICAgIHQsXG4gICAgICAgICAgbiA9IGNvdW50ID09IG51bGwgPyAxMCA6ICtjb3VudCxcbiAgICAgICAgICB6ID0gW107XG5cbiAgICAgIGlmICghKGJhc2UgJSAxKSAmJiBqIC0gaSA8IG4pIHtcbiAgICAgICAgaSA9IE1hdGgucm91bmQoaSkgLSAxLCBqID0gTWF0aC5yb3VuZChqKSArIDE7XG4gICAgICAgIGlmICh1ID4gMCkgZm9yICg7IGkgPCBqOyArK2kpIHtcbiAgICAgICAgICBmb3IgKGsgPSAxLCBwID0gcG93cyhpKTsgayA8IGJhc2U7ICsraykge1xuICAgICAgICAgICAgdCA9IHAgKiBrO1xuICAgICAgICAgICAgaWYgKHQgPCB1KSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICh0ID4gdikgYnJlYWs7XG4gICAgICAgICAgICB6LnB1c2godCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgZm9yICg7IGkgPCBqOyArK2kpIHtcbiAgICAgICAgICBmb3IgKGsgPSBiYXNlIC0gMSwgcCA9IHBvd3MoaSk7IGsgPj0gMTsgLS1rKSB7XG4gICAgICAgICAgICB0ID0gcCAqIGs7XG4gICAgICAgICAgICBpZiAodCA8IHUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKHQgPiB2KSBicmVhaztcbiAgICAgICAgICAgIHoucHVzaCh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHogPSBkM0FycmF5LnRpY2tzKGksIGosIE1hdGgubWluKGogLSBpLCBuKSkubWFwKHBvd3MpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gciA/IHoucmV2ZXJzZSgpIDogejtcbiAgICB9O1xuXG4gICAgc2NhbGUudGlja0Zvcm1hdCA9IGZ1bmN0aW9uKGNvdW50LCBzcGVjaWZpZXIpIHtcbiAgICAgIGlmIChzcGVjaWZpZXIgPT0gbnVsbCkgc3BlY2lmaWVyID0gYmFzZSA9PT0gMTAgPyBcIi4wZVwiIDogXCIsXCI7XG4gICAgICBpZiAodHlwZW9mIHNwZWNpZmllciAhPT0gXCJmdW5jdGlvblwiKSBzcGVjaWZpZXIgPSBkM0Zvcm1hdC5mb3JtYXQoc3BlY2lmaWVyKTtcbiAgICAgIGlmIChjb3VudCA9PT0gSW5maW5pdHkpIHJldHVybiBzcGVjaWZpZXI7XG4gICAgICBpZiAoY291bnQgPT0gbnVsbCkgY291bnQgPSAxMDtcbiAgICAgIHZhciBrID0gTWF0aC5tYXgoMSwgYmFzZSAqIGNvdW50IC8gc2NhbGUudGlja3MoKS5sZW5ndGgpOyAvLyBUT0RPIGZhc3QgZXN0aW1hdGU/XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgaSA9IGQgLyBwb3dzKE1hdGgucm91bmQobG9ncyhkKSkpO1xuICAgICAgICBpZiAoaSAqIGJhc2UgPCBiYXNlIC0gMC41KSBpICo9IGJhc2U7XG4gICAgICAgIHJldHVybiBpIDw9IGsgPyBzcGVjaWZpZXIoZCkgOiBcIlwiO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2NhbGUubmljZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGRvbWFpbihuaWNlKGRvbWFpbigpLCB7XG4gICAgICAgIGZsb29yOiBmdW5jdGlvbih4KSB7IHJldHVybiBwb3dzKE1hdGguZmxvb3IobG9ncyh4KSkpOyB9LFxuICAgICAgICBjZWlsOiBmdW5jdGlvbih4KSB7IHJldHVybiBwb3dzKE1hdGguY2VpbChsb2dzKHgpKSk7IH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNvcHkoc2NhbGUsIGxvZygpLmJhc2UoYmFzZSkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICBmdW5jdGlvbiByYWlzZSh4LCBleHBvbmVudCkge1xuICAgIHJldHVybiB4IDwgMCA/IC1NYXRoLnBvdygteCwgZXhwb25lbnQpIDogTWF0aC5wb3coeCwgZXhwb25lbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcG93KCkge1xuICAgIHZhciBleHBvbmVudCA9IDEsXG4gICAgICAgIHNjYWxlID0gY29udGludW91cyhkZWludGVycG9sYXRlLCByZWludGVycG9sYXRlKSxcbiAgICAgICAgZG9tYWluID0gc2NhbGUuZG9tYWluO1xuXG4gICAgZnVuY3Rpb24gZGVpbnRlcnBvbGF0ZShhLCBiKSB7XG4gICAgICByZXR1cm4gKGIgPSByYWlzZShiLCBleHBvbmVudCkgLSAoYSA9IHJhaXNlKGEsIGV4cG9uZW50KSkpXG4gICAgICAgICAgPyBmdW5jdGlvbih4KSB7IHJldHVybiAocmFpc2UoeCwgZXhwb25lbnQpIC0gYSkgLyBiOyB9XG4gICAgICAgICAgOiBjb25zdGFudChiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWludGVycG9sYXRlKGEsIGIpIHtcbiAgICAgIGIgPSByYWlzZShiLCBleHBvbmVudCkgLSAoYSA9IHJhaXNlKGEsIGV4cG9uZW50KSk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gcmFpc2UoYSArIGIgKiB0LCAxIC8gZXhwb25lbnQpOyB9O1xuICAgIH1cblxuICAgIHNjYWxlLmV4cG9uZW50ID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZXhwb25lbnQgPSArXywgZG9tYWluKGRvbWFpbigpKSkgOiBleHBvbmVudDtcbiAgICB9O1xuXG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNvcHkoc2NhbGUsIHBvdygpLmV4cG9uZW50KGV4cG9uZW50KSk7XG4gICAgfTtcblxuICAgIHJldHVybiBsaW5lYXJpc2goc2NhbGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3FydCgpIHtcbiAgICByZXR1cm4gcG93KCkuZXhwb25lbnQoMC41KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1YW50aWxlJDEoKSB7XG4gICAgdmFyIGRvbWFpbiA9IFtdLFxuICAgICAgICByYW5nZSA9IFtdLFxuICAgICAgICB0aHJlc2hvbGRzID0gW107XG5cbiAgICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgICAgdmFyIGkgPSAwLCBuID0gTWF0aC5tYXgoMSwgcmFuZ2UubGVuZ3RoKTtcbiAgICAgIHRocmVzaG9sZHMgPSBuZXcgQXJyYXkobiAtIDEpO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHRocmVzaG9sZHNbaSAtIDFdID0gZDNBcnJheS5xdWFudGlsZShkb21haW4sIGkgLyBuKTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FsZSh4KSB7XG4gICAgICBpZiAoIWlzTmFOKHggPSAreCkpIHJldHVybiByYW5nZVtkM0FycmF5LmJpc2VjdCh0aHJlc2hvbGRzLCB4KV07XG4gICAgfVxuXG4gICAgc2NhbGUuaW52ZXJ0RXh0ZW50ID0gZnVuY3Rpb24oeSkge1xuICAgICAgdmFyIGkgPSByYW5nZS5pbmRleE9mKHkpO1xuICAgICAgcmV0dXJuIGkgPCAwID8gW05hTiwgTmFOXSA6IFtcbiAgICAgICAgaSA+IDAgPyB0aHJlc2hvbGRzW2kgLSAxXSA6IGRvbWFpblswXSxcbiAgICAgICAgaSA8IHRocmVzaG9sZHMubGVuZ3RoID8gdGhyZXNob2xkc1tpXSA6IGRvbWFpbltkb21haW4ubGVuZ3RoIC0gMV1cbiAgICAgIF07XG4gICAgfTtcblxuICAgIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRvbWFpbi5zbGljZSgpO1xuICAgICAgZG9tYWluID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IF8ubGVuZ3RoLCBkOyBpIDwgbjsgKytpKSBpZiAoZCA9IF9baV0sIGQgIT0gbnVsbCAmJiAhaXNOYU4oZCA9ICtkKSkgZG9tYWluLnB1c2goZCk7XG4gICAgICBkb21haW4uc29ydChkM0FycmF5LmFzY2VuZGluZyk7XG4gICAgICByZXR1cm4gcmVzY2FsZSgpO1xuICAgIH07XG5cbiAgICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHJhbmdlID0gc2xpY2UuY2FsbChfKSwgcmVzY2FsZSgpKSA6IHJhbmdlLnNsaWNlKCk7XG4gICAgfTtcblxuICAgIHNjYWxlLnF1YW50aWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRocmVzaG9sZHMuc2xpY2UoKTtcbiAgICB9O1xuXG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHF1YW50aWxlJDEoKVxuICAgICAgICAgIC5kb21haW4oZG9tYWluKVxuICAgICAgICAgIC5yYW5nZShyYW5nZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBzY2FsZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1YW50aXplKCkge1xuICAgIHZhciB4MCA9IDAsXG4gICAgICAgIHgxID0gMSxcbiAgICAgICAgbiA9IDEsXG4gICAgICAgIGRvbWFpbiA9IFswLjVdLFxuICAgICAgICByYW5nZSA9IFswLCAxXTtcblxuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIGlmICh4IDw9IHgpIHJldHVybiByYW5nZVtkM0FycmF5LmJpc2VjdChkb21haW4sIHgsIDAsIG4pXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgICAgdmFyIGkgPSAtMTtcbiAgICAgIGRvbWFpbiA9IG5ldyBBcnJheShuKTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBkb21haW5baV0gPSAoKGkgKyAxKSAqIHgxIC0gKGkgLSBuKSAqIHgwKSAvIChuICsgMSk7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfVxuXG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeDAgPSArX1swXSwgeDEgPSArX1sxXSwgcmVzY2FsZSgpKSA6IFt4MCwgeDFdO1xuICAgIH07XG5cbiAgICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG4gPSAocmFuZ2UgPSBzbGljZS5jYWxsKF8pKS5sZW5ndGggLSAxLCByZXNjYWxlKCkpIDogcmFuZ2Uuc2xpY2UoKTtcbiAgICB9O1xuXG4gICAgc2NhbGUuaW52ZXJ0RXh0ZW50ID0gZnVuY3Rpb24oeSkge1xuICAgICAgdmFyIGkgPSByYW5nZS5pbmRleE9mKHkpO1xuICAgICAgcmV0dXJuIGkgPCAwID8gW05hTiwgTmFOXVxuICAgICAgICAgIDogaSA8IDEgPyBbeDAsIGRvbWFpblswXV1cbiAgICAgICAgICA6IGkgPj0gbiA/IFtkb21haW5bbiAtIDFdLCB4MV1cbiAgICAgICAgICA6IFtkb21haW5baSAtIDFdLCBkb21haW5baV1dO1xuICAgIH07XG5cbiAgICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcXVhbnRpemUoKVxuICAgICAgICAgIC5kb21haW4oW3gwLCB4MV0pXG4gICAgICAgICAgLnJhbmdlKHJhbmdlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGxpbmVhcmlzaChzY2FsZSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aHJlc2hvbGQoKSB7XG4gICAgdmFyIGRvbWFpbiA9IFswLjVdLFxuICAgICAgICByYW5nZSA9IFswLCAxXSxcbiAgICAgICAgbiA9IDE7XG5cbiAgICBmdW5jdGlvbiBzY2FsZSh4KSB7XG4gICAgICBpZiAoeCA8PSB4KSByZXR1cm4gcmFuZ2VbZDNBcnJheS5iaXNlY3QoZG9tYWluLCB4LCAwLCBuKV07XG4gICAgfVxuXG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZG9tYWluID0gc2xpY2UuY2FsbChfKSwgbiA9IE1hdGgubWluKGRvbWFpbi5sZW5ndGgsIHJhbmdlLmxlbmd0aCAtIDEpLCBzY2FsZSkgOiBkb21haW4uc2xpY2UoKTtcbiAgICB9O1xuXG4gICAgc2NhbGUucmFuZ2UgPSBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChyYW5nZSA9IHNsaWNlLmNhbGwoXyksIG4gPSBNYXRoLm1pbihkb21haW4ubGVuZ3RoLCByYW5nZS5sZW5ndGggLSAxKSwgc2NhbGUpIDogcmFuZ2Uuc2xpY2UoKTtcbiAgICB9O1xuXG4gICAgc2NhbGUuaW52ZXJ0RXh0ZW50ID0gZnVuY3Rpb24oeSkge1xuICAgICAgdmFyIGkgPSByYW5nZS5pbmRleE9mKHkpO1xuICAgICAgcmV0dXJuIFtkb21haW5baSAtIDFdLCBkb21haW5baV1dO1xuICAgIH07XG5cbiAgICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhyZXNob2xkKClcbiAgICAgICAgICAuZG9tYWluKGRvbWFpbilcbiAgICAgICAgICAucmFuZ2UocmFuZ2UpO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICB2YXIgZHVyYXRpb25TZWNvbmQgPSAxMDAwO1xuICB2YXIgZHVyYXRpb25NaW51dGUgPSBkdXJhdGlvblNlY29uZCAqIDYwO1xuICB2YXIgZHVyYXRpb25Ib3VyID0gZHVyYXRpb25NaW51dGUgKiA2MDtcbiAgdmFyIGR1cmF0aW9uRGF5ID0gZHVyYXRpb25Ib3VyICogMjQ7XG4gIHZhciBkdXJhdGlvbldlZWsgPSBkdXJhdGlvbkRheSAqIDc7XG4gIHZhciBkdXJhdGlvbk1vbnRoID0gZHVyYXRpb25EYXkgKiAzMDtcbiAgdmFyIGR1cmF0aW9uWWVhciA9IGR1cmF0aW9uRGF5ICogMzY1O1xuICBmdW5jdGlvbiBkYXRlKHQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodCk7XG4gIH1cblxuICBmdW5jdGlvbiBudW1iZXIkMSh0KSB7XG4gICAgcmV0dXJuIHQgaW5zdGFuY2VvZiBEYXRlID8gK3QgOiArbmV3IERhdGUoK3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsZW5kYXIoeWVhciwgbW9udGgsIHdlZWssIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2Vjb25kLCBmb3JtYXQpIHtcbiAgICB2YXIgc2NhbGUgPSBjb250aW51b3VzKGRlaW50ZXJwb2xhdGUsIGQzSW50ZXJwb2xhdGUuaW50ZXJwb2xhdGVOdW1iZXIpLFxuICAgICAgICBpbnZlcnQgPSBzY2FsZS5pbnZlcnQsXG4gICAgICAgIGRvbWFpbiA9IHNjYWxlLmRvbWFpbjtcblxuICAgIHZhciBmb3JtYXRNaWxsaXNlY29uZCA9IGZvcm1hdChcIi4lTFwiKSxcbiAgICAgICAgZm9ybWF0U2Vjb25kID0gZm9ybWF0KFwiOiVTXCIpLFxuICAgICAgICBmb3JtYXRNaW51dGUgPSBmb3JtYXQoXCIlSTolTVwiKSxcbiAgICAgICAgZm9ybWF0SG91ciA9IGZvcm1hdChcIiVJICVwXCIpLFxuICAgICAgICBmb3JtYXREYXkgPSBmb3JtYXQoXCIlYSAlZFwiKSxcbiAgICAgICAgZm9ybWF0V2VlayA9IGZvcm1hdChcIiViICVkXCIpLFxuICAgICAgICBmb3JtYXRNb250aCA9IGZvcm1hdChcIiVCXCIpLFxuICAgICAgICBmb3JtYXRZZWFyID0gZm9ybWF0KFwiJVlcIik7XG5cbiAgICB2YXIgdGlja0ludGVydmFscyA9IFtcbiAgICAgIFtzZWNvbmQsICAxLCAgICAgIGR1cmF0aW9uU2Vjb25kXSxcbiAgICAgIFtzZWNvbmQsICA1LCAgNSAqIGR1cmF0aW9uU2Vjb25kXSxcbiAgICAgIFtzZWNvbmQsIDE1LCAxNSAqIGR1cmF0aW9uU2Vjb25kXSxcbiAgICAgIFtzZWNvbmQsIDMwLCAzMCAqIGR1cmF0aW9uU2Vjb25kXSxcbiAgICAgIFttaW51dGUsICAxLCAgICAgIGR1cmF0aW9uTWludXRlXSxcbiAgICAgIFttaW51dGUsICA1LCAgNSAqIGR1cmF0aW9uTWludXRlXSxcbiAgICAgIFttaW51dGUsIDE1LCAxNSAqIGR1cmF0aW9uTWludXRlXSxcbiAgICAgIFttaW51dGUsIDMwLCAzMCAqIGR1cmF0aW9uTWludXRlXSxcbiAgICAgIFsgIGhvdXIsICAxLCAgICAgIGR1cmF0aW9uSG91ciAgXSxcbiAgICAgIFsgIGhvdXIsICAzLCAgMyAqIGR1cmF0aW9uSG91ciAgXSxcbiAgICAgIFsgIGhvdXIsICA2LCAgNiAqIGR1cmF0aW9uSG91ciAgXSxcbiAgICAgIFsgIGhvdXIsIDEyLCAxMiAqIGR1cmF0aW9uSG91ciAgXSxcbiAgICAgIFsgICBkYXksICAxLCAgICAgIGR1cmF0aW9uRGF5ICAgXSxcbiAgICAgIFsgICBkYXksICAyLCAgMiAqIGR1cmF0aW9uRGF5ICAgXSxcbiAgICAgIFsgIHdlZWssICAxLCAgICAgIGR1cmF0aW9uV2VlayAgXSxcbiAgICAgIFsgbW9udGgsICAxLCAgICAgIGR1cmF0aW9uTW9udGggXSxcbiAgICAgIFsgbW9udGgsICAzLCAgMyAqIGR1cmF0aW9uTW9udGggXSxcbiAgICAgIFsgIHllYXIsICAxLCAgICAgIGR1cmF0aW9uWWVhciAgXVxuICAgIF07XG5cbiAgICBmdW5jdGlvbiB0aWNrRm9ybWF0KGRhdGUpIHtcbiAgICAgIHJldHVybiAoc2Vjb25kKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbGxpc2Vjb25kXG4gICAgICAgICAgOiBtaW51dGUoZGF0ZSkgPCBkYXRlID8gZm9ybWF0U2Vjb25kXG4gICAgICAgICAgOiBob3VyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICAgIDogZGF5KGRhdGUpIDwgZGF0ZSA/IGZvcm1hdEhvdXJcbiAgICAgICAgICA6IG1vbnRoKGRhdGUpIDwgZGF0ZSA/ICh3ZWVrKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdERheSA6IGZvcm1hdFdlZWspXG4gICAgICAgICAgOiB5ZWFyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1vbnRoXG4gICAgICAgICAgOiBmb3JtYXRZZWFyKShkYXRlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aWNrSW50ZXJ2YWwoaW50ZXJ2YWwsIHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgICBpZiAoaW50ZXJ2YWwgPT0gbnVsbCkgaW50ZXJ2YWwgPSAxMDtcblxuICAgICAgLy8gSWYgYSBkZXNpcmVkIHRpY2sgY291bnQgaXMgc3BlY2lmaWVkLCBwaWNrIGEgcmVhc29uYWJsZSB0aWNrIGludGVydmFsXG4gICAgICAvLyBiYXNlZCBvbiB0aGUgZXh0ZW50IG9mIHRoZSBkb21haW4gYW5kIGEgcm91Z2ggZXN0aW1hdGUgb2YgdGljayBzaXplLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBhc3N1bWUgaW50ZXJ2YWwgaXMgYWxyZWFkeSBhIHRpbWUgaW50ZXJ2YWwgYW5kIHVzZSBpdC5cbiAgICAgIGlmICh0eXBlb2YgaW50ZXJ2YWwgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IE1hdGguYWJzKHN0b3AgLSBzdGFydCkgLyBpbnRlcnZhbCxcbiAgICAgICAgICAgIGkgPSBkM0FycmF5LmJpc2VjdG9yKGZ1bmN0aW9uKGkpIHsgcmV0dXJuIGlbMl07IH0pLnJpZ2h0KHRpY2tJbnRlcnZhbHMsIHRhcmdldCk7XG4gICAgICAgIGlmIChpID09PSB0aWNrSW50ZXJ2YWxzLmxlbmd0aCkge1xuICAgICAgICAgIHN0ZXAgPSBkM0FycmF5LnRpY2tTdGVwKHN0YXJ0IC8gZHVyYXRpb25ZZWFyLCBzdG9wIC8gZHVyYXRpb25ZZWFyLCBpbnRlcnZhbCk7XG4gICAgICAgICAgaW50ZXJ2YWwgPSB5ZWFyO1xuICAgICAgICB9IGVsc2UgaWYgKGkpIHtcbiAgICAgICAgICBpID0gdGlja0ludGVydmFsc1t0YXJnZXQgLyB0aWNrSW50ZXJ2YWxzW2kgLSAxXVsyXSA8IHRpY2tJbnRlcnZhbHNbaV1bMl0gLyB0YXJnZXQgPyBpIC0gMSA6IGldO1xuICAgICAgICAgIHN0ZXAgPSBpWzFdO1xuICAgICAgICAgIGludGVydmFsID0gaVswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGVwID0gZDNBcnJheS50aWNrU3RlcChzdGFydCwgc3RvcCwgaW50ZXJ2YWwpO1xuICAgICAgICAgIGludGVydmFsID0gbWlsbGlzZWNvbmQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0ZXAgPT0gbnVsbCA/IGludGVydmFsIDogaW50ZXJ2YWwuZXZlcnkoc3RlcCk7XG4gICAgfVxuXG4gICAgc2NhbGUuaW52ZXJ0ID0gZnVuY3Rpb24oeSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKGludmVydCh5KSk7XG4gICAgfTtcblxuICAgIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gZG9tYWluKG1hcCQxLmNhbGwoXywgbnVtYmVyJDEpKSA6IGRvbWFpbigpLm1hcChkYXRlKTtcbiAgICB9O1xuXG4gICAgc2NhbGUudGlja3MgPSBmdW5jdGlvbihpbnRlcnZhbCwgc3RlcCkge1xuICAgICAgdmFyIGQgPSBkb21haW4oKSxcbiAgICAgICAgICB0MCA9IGRbMF0sXG4gICAgICAgICAgdDEgPSBkW2QubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgciA9IHQxIDwgdDAsXG4gICAgICAgICAgdDtcbiAgICAgIGlmIChyKSB0ID0gdDAsIHQwID0gdDEsIHQxID0gdDtcbiAgICAgIHQgPSB0aWNrSW50ZXJ2YWwoaW50ZXJ2YWwsIHQwLCB0MSwgc3RlcCk7XG4gICAgICB0ID0gdCA/IHQucmFuZ2UodDAsIHQxICsgMSkgOiBbXTsgLy8gaW5jbHVzaXZlIHN0b3BcbiAgICAgIHJldHVybiByID8gdC5yZXZlcnNlKCkgOiB0O1xuICAgIH07XG5cbiAgICBzY2FsZS50aWNrRm9ybWF0ID0gZnVuY3Rpb24oY291bnQsIHNwZWNpZmllcikge1xuICAgICAgcmV0dXJuIHNwZWNpZmllciA9PSBudWxsID8gdGlja0Zvcm1hdCA6IGZvcm1hdChzcGVjaWZpZXIpO1xuICAgIH07XG5cbiAgICBzY2FsZS5uaWNlID0gZnVuY3Rpb24oaW50ZXJ2YWwsIHN0ZXApIHtcbiAgICAgIHZhciBkID0gZG9tYWluKCk7XG4gICAgICByZXR1cm4gKGludGVydmFsID0gdGlja0ludGVydmFsKGludGVydmFsLCBkWzBdLCBkW2QubGVuZ3RoIC0gMV0sIHN0ZXApKVxuICAgICAgICAgID8gZG9tYWluKG5pY2UoZCwgaW50ZXJ2YWwpKVxuICAgICAgICAgIDogc2NhbGU7XG4gICAgfTtcblxuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjb3B5KHNjYWxlLCBjYWxlbmRhcih5ZWFyLCBtb250aCwgd2VlaywgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmQsIGZvcm1hdCkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lKCkge1xuICAgIHJldHVybiBjYWxlbmRhcihkM1RpbWUudGltZVllYXIsIGQzVGltZS50aW1lTW9udGgsIGQzVGltZS50aW1lV2VlaywgZDNUaW1lLnRpbWVEYXksIGQzVGltZS50aW1lSG91ciwgZDNUaW1lLnRpbWVNaW51dGUsIGQzVGltZS50aW1lU2Vjb25kLCBkM1RpbWUudGltZU1pbGxpc2Vjb25kLCBkM1RpbWVGb3JtYXQudGltZUZvcm1hdCkuZG9tYWluKFtuZXcgRGF0ZSgyMDAwLCAwLCAxKSwgbmV3IERhdGUoMjAwMCwgMCwgMildKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHV0Y1RpbWUoKSB7XG4gICAgcmV0dXJuIGNhbGVuZGFyKGQzVGltZS51dGNZZWFyLCBkM1RpbWUudXRjTW9udGgsIGQzVGltZS51dGNXZWVrLCBkM1RpbWUudXRjRGF5LCBkM1RpbWUudXRjSG91ciwgZDNUaW1lLnV0Y01pbnV0ZSwgZDNUaW1lLnV0Y1NlY29uZCwgZDNUaW1lLnV0Y01pbGxpc2Vjb25kLCBkM1RpbWVGb3JtYXQudXRjRm9ybWF0KS5kb21haW4oW0RhdGUuVVRDKDIwMDAsIDAsIDEpLCBEYXRlLlVUQygyMDAwLCAwLCAyKV0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY29sb3JzKHMpIHtcbiAgICByZXR1cm4gcy5tYXRjaCgvLns2fS9nKS5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIFwiI1wiICsgeDtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBjYXRlZ29yeTEwID0gY29sb3JzKFwiMWY3N2I0ZmY3ZjBlMmNhMDJjZDYyNzI4OTQ2N2JkOGM1NjRiZTM3N2MyN2Y3ZjdmYmNiZDIyMTdiZWNmXCIpO1xuXG4gIHZhciBjYXRlZ29yeTIwYiA9IGNvbG9ycyhcIjM5M2I3OTUyNTRhMzZiNmVjZjljOWVkZTYzNzkzOThjYTI1MmI1Y2Y2YmNlZGI5YzhjNmQzMWJkOWUzOWU3YmE1MmU3Y2I5NDg0M2MzOWFkNDk0YWQ2NjE2YmU3OTY5YzdiNDE3M2E1NTE5NGNlNmRiZGRlOWVkNlwiKTtcblxuICB2YXIgY2F0ZWdvcnkyMGMgPSBjb2xvcnMoXCIzMTgyYmQ2YmFlZDY5ZWNhZTFjNmRiZWZlNjU1MGRmZDhkM2NmZGFlNmJmZGQwYTIzMWEzNTQ3NGM0NzZhMWQ5OWJjN2U5YzA3NTZiYjE5ZTlhYzhiY2JkZGNkYWRhZWI2MzYzNjM5Njk2OTZiZGJkYmRkOWQ5ZDlcIik7XG5cbiAgdmFyIGNhdGVnb3J5MjAgPSBjb2xvcnMoXCIxZjc3YjRhZWM3ZThmZjdmMGVmZmJiNzgyY2EwMmM5OGRmOGFkNjI3MjhmZjk4OTY5NDY3YmRjNWIwZDU4YzU2NGJjNDljOTRlMzc3YzJmN2I2ZDI3ZjdmN2ZjN2M3YzdiY2JkMjJkYmRiOGQxN2JlY2Y5ZWRhZTVcIik7XG5cbiAgdmFyIGN1YmVoZWxpeCQxID0gZDNJbnRlcnBvbGF0ZS5pbnRlcnBvbGF0ZUN1YmVoZWxpeExvbmcoZDNDb2xvci5jdWJlaGVsaXgoMzAwLCAwLjUsIDAuMCksIGQzQ29sb3IuY3ViZWhlbGl4KC0yNDAsIDAuNSwgMS4wKSk7XG5cbiAgdmFyIHdhcm0gPSBkM0ludGVycG9sYXRlLmludGVycG9sYXRlQ3ViZWhlbGl4TG9uZyhkM0NvbG9yLmN1YmVoZWxpeCgtMTAwLCAwLjc1LCAwLjM1KSwgZDNDb2xvci5jdWJlaGVsaXgoODAsIDEuNTAsIDAuOCkpO1xuXG4gIHZhciBjb29sID0gZDNJbnRlcnBvbGF0ZS5pbnRlcnBvbGF0ZUN1YmVoZWxpeExvbmcoZDNDb2xvci5jdWJlaGVsaXgoMjYwLCAwLjc1LCAwLjM1KSwgZDNDb2xvci5jdWJlaGVsaXgoODAsIDEuNTAsIDAuOCkpO1xuXG4gIHZhciByYWluYm93ID0gZDNDb2xvci5jdWJlaGVsaXgoKTtcblxuICBmdW5jdGlvbiByYWluYm93JDEodCkge1xuICAgIGlmICh0IDwgMCB8fCB0ID4gMSkgdCAtPSBNYXRoLmZsb29yKHQpO1xuICAgIHZhciB0cyA9IE1hdGguYWJzKHQgLSAwLjUpO1xuICAgIHJhaW5ib3cuaCA9IDM2MCAqIHQgLSAxMDA7XG4gICAgcmFpbmJvdy5zID0gMS41IC0gMS41ICogdHM7XG4gICAgcmFpbmJvdy5sID0gMC44IC0gMC45ICogdHM7XG4gICAgcmV0dXJuIHJhaW5ib3cgKyBcIlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFtcChyYW5nZSkge1xuICAgIHZhciBuID0gcmFuZ2UubGVuZ3RoO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gcmFuZ2VbTWF0aC5tYXgoMCwgTWF0aC5taW4obiAtIDEsIE1hdGguZmxvb3IodCAqIG4pKSldO1xuICAgIH07XG4gIH1cblxuICB2YXIgdmlyaWRpcyA9IHJhbXAoY29sb3JzKFwiNDQwMTU0NDQwMjU2NDUwNDU3NDUwNTU5NDYwNzVhNDYwODVjNDYwYTVkNDYwYjVlNDcwZDYwNDcwZTYxNDcxMDYzNDcxMTY0NDcxMzY1NDgxNDY3NDgxNjY4NDgxNzY5NDgxODZhNDgxYTZjNDgxYjZkNDgxYzZlNDgxZDZmNDgxZjcwNDgyMDcxNDgyMTczNDgyMzc0NDgyNDc1NDgyNTc2NDgyNjc3NDgyODc4NDgyOTc5NDcyYTdhNDcyYzdhNDcyZDdiNDcyZTdjNDcyZjdkNDYzMDdlNDYzMjdlNDYzMzdmNDYzNDgwNDUzNTgxNDUzNzgxNDUzODgyNDQzOTgzNDQzYTgzNDQzYjg0NDMzZDg0NDMzZTg1NDIzZjg1NDI0MDg2NDI0MTg2NDE0Mjg3NDE0NDg3NDA0NTg4NDA0Njg4M2Y0Nzg4M2Y0ODg5M2U0OTg5M2U0YTg5M2U0YzhhM2Q0ZDhhM2Q0ZThhM2M0ZjhhM2M1MDhiM2I1MThiM2I1MjhiM2E1MzhiM2E1NDhjMzk1NThjMzk1NjhjMzg1ODhjMzg1OThjMzc1YThjMzc1YjhkMzY1YzhkMzY1ZDhkMzU1ZThkMzU1ZjhkMzQ2MDhkMzQ2MThkMzM2MjhkMzM2MzhkMzI2NDhlMzI2NThlMzE2NjhlMzE2NzhlMzE2ODhlMzA2OThlMzA2YThlMmY2YjhlMmY2YzhlMmU2ZDhlMmU2ZThlMmU2ZjhlMmQ3MDhlMmQ3MThlMmM3MThlMmM3MjhlMmM3MzhlMmI3NDhlMmI3NThlMmE3NjhlMmE3NzhlMmE3ODhlMjk3OThlMjk3YThlMjk3YjhlMjg3YzhlMjg3ZDhlMjc3ZThlMjc3ZjhlMjc4MDhlMjY4MThlMjY4MjhlMjY4MjhlMjU4MzhlMjU4NDhlMjU4NThlMjQ4NjhlMjQ4NzhlMjM4ODhlMjM4OThlMjM4YThkMjI4YjhkMjI4YzhkMjI4ZDhkMjE4ZThkMjE4ZjhkMjE5MDhkMjE5MThjMjA5MjhjMjA5MjhjMjA5MzhjMWY5NDhjMWY5NThiMWY5NjhiMWY5NzhiMWY5ODhiMWY5OThhMWY5YThhMWU5YjhhMWU5Yzg5MWU5ZDg5MWY5ZTg5MWY5Zjg4MWZhMDg4MWZhMTg4MWZhMTg3MWZhMjg3MjBhMzg2MjBhNDg2MjFhNTg1MjFhNjg1MjJhNzg1MjJhODg0MjNhOTgzMjRhYTgzMjVhYjgyMjVhYzgyMjZhZDgxMjdhZDgxMjhhZTgwMjlhZjdmMmFiMDdmMmNiMTdlMmRiMjdkMmViMzdjMmZiNDdjMzFiNTdiMzJiNjdhMzRiNjc5MzViNzc5MzdiODc4MzhiOTc3M2FiYTc2M2JiYjc1M2RiYzc0M2ZiYzczNDBiZDcyNDJiZTcxNDRiZjcwNDZjMDZmNDhjMTZlNGFjMTZkNGNjMjZjNGVjMzZiNTBjNDZhNTJjNTY5NTRjNTY4NTZjNjY3NThjNzY1NWFjODY0NWNjODYzNWVjOTYyNjBjYTYwNjNjYjVmNjVjYjVlNjdjYzVjNjljZDViNmNjZDVhNmVjZTU4NzBjZjU3NzNkMDU2NzVkMDU0NzdkMTUzN2FkMTUxN2NkMjUwN2ZkMzRlODFkMzRkODRkNDRiODZkNTQ5ODlkNTQ4OGJkNjQ2OGVkNjQ1OTBkNzQzOTNkNzQxOTVkODQwOThkODNlOWJkOTNjOWRkOTNiYTBkYTM5YTJkYTM3YTVkYjM2YThkYjM0YWFkYzMyYWRkYzMwYjBkZDJmYjJkZDJkYjVkZTJiYjhkZTI5YmFkZTI4YmRkZjI2YzBkZjI1YzJkZjIzYzVlMDIxYzhlMDIwY2FlMTFmY2RlMTFkZDBlMTFjZDJlMjFiZDVlMjFhZDhlMjE5ZGFlMzE5ZGRlMzE4ZGZlMzE4ZTJlNDE4ZTVlNDE5ZTdlNDE5ZWFlNTFhZWNlNTFiZWZlNTFjZjFlNTFkZjRlNjFlZjZlNjIwZjhlNjIxZmJlNzIzZmRlNzI1XCIpKTtcblxuICB2YXIgbWFnbWEgPSByYW1wKGNvbG9ycyhcIjAwMDAwNDAxMDAwNTAxMDEwNjAxMDEwODAyMDEwOTAyMDIwYjAyMDIwZDAzMDMwZjAzMDMxMjA0MDQxNDA1MDQxNjA2MDUxODA2MDUxYTA3MDYxYzA4MDcxZTA5MDcyMDBhMDgyMjBiMDkyNDBjMDkyNjBkMGEyOTBlMGIyYjEwMGIyZDExMGMyZjEyMGQzMTEzMGQzNDE0MGUzNjE1MGUzODE2MGYzYjE4MGYzZDE5MTAzZjFhMTA0MjFjMTA0NDFkMTE0NzFlMTE0OTIwMTE0YjIxMTE0ZTIyMTE1MDI0MTI1MzI1MTI1NTI3MTI1ODI5MTE1YTJhMTE1YzJjMTE1ZjJkMTE2MTJmMTE2MzMxMTE2NTMzMTA2NzM0MTA2OTM2MTA2YjM4MTA2YzM5MGY2ZTNiMGY3MDNkMGY3MTNmMGY3MjQwMGY3NDQyMGY3NTQ0MGY3NjQ1MTA3NzQ3MTA3ODQ5MTA3ODRhMTA3OTRjMTE3YTRlMTE3YjRmMTI3YjUxMTI3YzUyMTM3YzU0MTM3ZDU2MTQ3ZDU3MTU3ZTU5MTU3ZTVhMTY3ZTVjMTY3ZjVkMTc3ZjVmMTg3ZjYwMTg4MDYyMTk4MDY0MWE4MDY1MWE4MDY3MWI4MDY4MWM4MTZhMWM4MTZiMWQ4MTZkMWQ4MTZlMWU4MTcwMWY4MTcyMWY4MTczMjA4MTc1MjE4MTc2MjE4MTc4MjI4MTc5MjI4MjdiMjM4MjdjMjM4MjdlMjQ4MjgwMjU4MjgxMjU4MTgzMjY4MTg0MjY4MTg2Mjc4MTg4Mjc4MTg5Mjg4MThiMjk4MThjMjk4MThlMmE4MTkwMmE4MTkxMmI4MTkzMmI4MDk0MmM4MDk2MmM4MDk4MmQ4MDk5MmQ4MDliMmU3ZjljMmU3ZjllMmY3ZmEwMmY3ZmExMzA3ZWEzMzA3ZWE1MzE3ZWE2MzE3ZGE4MzI3ZGFhMzM3ZGFiMzM3Y2FkMzQ3Y2FlMzQ3YmIwMzU3YmIyMzU3YmIzMzY3YWI1MzY3YWI3Mzc3OWI4Mzc3OWJhMzg3OGJjMzk3OGJkMzk3N2JmM2E3N2MwM2E3NmMyM2I3NWM0M2M3NWM1M2M3NGM3M2Q3M2M4M2U3M2NhM2U3MmNjM2Y3MWNkNDA3MWNmNDA3MGQwNDE2ZmQyNDI2ZmQzNDM2ZWQ1NDQ2ZGQ2NDU2Y2Q4NDU2Y2Q5NDY2YmRiNDc2YWRjNDg2OWRlNDk2OGRmNGE2OGUwNGM2N2UyNGQ2NmUzNGU2NWU0NGY2NGU1NTA2NGU3NTI2M2U4NTM2MmU5NTQ2MmVhNTY2MWViNTc2MGVjNTg2MGVkNWE1ZmVlNWI1ZWVmNWQ1ZWYwNWY1ZWYxNjA1ZGYyNjI1ZGYyNjQ1Y2YzNjU1Y2Y0Njc1Y2Y0Njk1Y2Y1NmI1Y2Y2NmM1Y2Y2NmU1Y2Y3NzA1Y2Y3NzI1Y2Y4NzQ1Y2Y4NzY1Y2Y5Nzg1ZGY5Nzk1ZGY5N2I1ZGZhN2Q1ZWZhN2Y1ZWZhODE1ZmZiODM1ZmZiODU2MGZiODc2MWZjODk2MWZjOGE2MmZjOGM2M2ZjOGU2NGZjOTA2NWZkOTI2NmZkOTQ2N2ZkOTY2OGZkOTg2OWZkOWE2YWZkOWI2YmZlOWQ2Y2ZlOWY2ZGZlYTE2ZWZlYTM2ZmZlYTU3MWZlYTc3MmZlYTk3M2ZlYWE3NGZlYWM3NmZlYWU3N2ZlYjA3OGZlYjI3YWZlYjQ3YmZlYjY3Y2ZlYjc3ZWZlYjk3ZmZlYmI4MWZlYmQ4MmZlYmY4NGZlYzE4NWZlYzI4N2ZlYzQ4OGZlYzY4YWZlYzg4Y2ZlY2E4ZGZlY2M4ZmZlY2Q5MGZlY2Y5MmZlZDE5NGZlZDM5NWZlZDU5N2ZlZDc5OWZlZDg5YWZkZGE5Y2ZkZGM5ZWZkZGVhMGZkZTBhMWZkZTJhM2ZkZTNhNWZkZTVhN2ZkZTdhOWZkZTlhYWZkZWJhY2ZjZWNhZWZjZWViMGZjZjBiMmZjZjJiNGZjZjRiNmZjZjZiOGZjZjdiOWZjZjliYmZjZmJiZGZjZmRiZlwiKSk7XG5cbiAgdmFyIGluZmVybm8gPSByYW1wKGNvbG9ycyhcIjAwMDAwNDAxMDAwNTAxMDEwNjAxMDEwODAyMDEwYTAyMDIwYzAyMDIwZTAzMDIxMDA0MDMxMjA0MDMxNDA1MDQxNzA2MDQxOTA3MDUxYjA4MDUxZDA5MDYxZjBhMDcyMjBiMDcyNDBjMDgyNjBkMDgyOTBlMDkyYjEwMDkyZDExMGEzMDEyMGEzMjE0MGIzNDE1MGIzNzE2MGIzOTE4MGMzYzE5MGMzZTFiMGM0MTFjMGM0MzFlMGM0NTFmMGM0ODIxMGM0YTIzMGM0YzI0MGM0ZjI2MGM1MTI4MGI1MzI5MGI1NTJiMGI1NzJkMGI1OTJmMGE1YjMxMGE1YzMyMGE1ZTM0MGE1ZjM2MDk2MTM4MDk2MjM5MDk2MzNiMDk2NDNkMDk2NTNlMDk2NjQwMGE2NzQyMGE2ODQ0MGE2ODQ1MGE2OTQ3MGI2YTQ5MGI2YTRhMGM2YjRjMGM2YjRkMGQ2YzRmMGQ2YzUxMGU2YzUyMGU2ZDU0MGY2ZDU1MGY2ZDU3MTA2ZTU5MTA2ZTVhMTE2ZTVjMTI2ZTVkMTI2ZTVmMTM2ZTYxMTM2ZTYyMTQ2ZTY0MTU2ZTY1MTU2ZTY3MTY2ZTY5MTY2ZTZhMTc2ZTZjMTg2ZTZkMTg2ZTZmMTk2ZTcxMTk2ZTcyMWE2ZTc0MWE2ZTc1MWI2ZTc3MWM2ZDc4MWM2ZDdhMWQ2ZDdjMWQ2ZDdkMWU2ZDdmMWU2YzgwMWY2YzgyMjA2Yzg0MjA2Yjg1MjE2Yjg3MjE2Yjg4MjI2YThhMjI2YThjMjM2OThkMjM2OThmMjQ2OTkwMjU2ODkyMjU2ODkzMjY2Nzk1MjY2Nzk3Mjc2Njk4Mjc2NjlhMjg2NTliMjk2NDlkMjk2NDlmMmE2M2EwMmE2M2EyMmI2MmEzMmM2MWE1MmM2MGE2MmQ2MGE4MmU1ZmE5MmU1ZWFiMmY1ZWFkMzA1ZGFlMzA1Y2IwMzE1YmIxMzI1YWIzMzI1YWI0MzM1OWI2MzQ1OGI3MzU1N2I5MzU1NmJhMzY1NWJjMzc1NGJkMzg1M2JmMzk1MmMwM2E1MWMxM2E1MGMzM2I0ZmM0M2M0ZWM2M2Q0ZGM3M2U0Y2M4M2Y0YmNhNDA0YWNiNDE0OWNjNDI0OGNlNDM0N2NmNDQ0NmQwNDU0NWQyNDY0NGQzNDc0M2Q0NDg0MmQ1NGE0MWQ3NGIzZmQ4NGMzZWQ5NGQzZGRhNGUzY2RiNTAzYmRkNTEzYWRlNTIzOGRmNTMzN2UwNTUzNmUxNTYzNWUyNTczNGUzNTkzM2U0NWEzMWU1NWMzMGU2NWQyZmU3NWUyZWU4NjAyZGU5NjEyYmVhNjMyYWViNjQyOWViNjYyOGVjNjcyNmVkNjkyNWVlNmEyNGVmNmMyM2VmNmUyMWYwNmYyMGYxNzExZmYxNzMxZGYyNzQxY2YzNzYxYmYzNzgxOWY0NzkxOGY1N2IxN2Y1N2QxNWY2N2UxNGY2ODAxM2Y3ODIxMmY3ODQxMGY4ODUwZmY4ODcwZWY4ODkwY2Y5OGIwYmY5OGMwYWY5OGUwOWZhOTAwOGZhOTIwN2ZhOTQwN2ZiOTYwNmZiOTcwNmZiOTkwNmZiOWIwNmZiOWQwN2ZjOWYwN2ZjYTEwOGZjYTMwOWZjYTUwYWZjYTYwY2ZjYTgwZGZjYWEwZmZjYWMxMWZjYWUxMmZjYjAxNGZjYjIxNmZjYjQxOGZiYjYxYWZiYjgxZGZiYmExZmZiYmMyMWZiYmUyM2ZhYzAyNmZhYzIyOGZhYzQyYWZhYzYyZGY5YzcyZmY5YzkzMmY5Y2IzNWY4Y2QzN2Y4Y2YzYWY3ZDEzZGY3ZDM0MGY2ZDU0M2Y2ZDc0NmY1ZDk0OWY1ZGI0Y2Y0ZGQ0ZmY0ZGY1M2Y0ZTE1NmYzZTM1YWYzZTU1ZGYyZTY2MWYyZTg2NWYyZWE2OWYxZWM2ZGYxZWQ3MWYxZWY3NWYxZjE3OWYyZjI3ZGYyZjQ4MmYzZjU4NmYzZjY4YWY0Zjg4ZWY1Zjk5MmY2ZmE5NmY4ZmI5YWY5ZmM5ZGZhZmRhMWZjZmZhNFwiKSk7XG5cbiAgdmFyIHBsYXNtYSA9IHJhbXAoY29sb3JzKFwiMGQwODg3MTAwNzg4MTMwNzg5MTYwNzhhMTkwNjhjMWIwNjhkMWQwNjhlMjAwNjhmMjIwNjkwMjQwNjkxMjYwNTkxMjgwNTkyMmEwNTkzMmMwNTk0MmUwNTk1MmYwNTk2MzEwNTk3MzMwNTk3MzUwNDk4MzcwNDk5MzgwNDlhM2EwNDlhM2MwNDliM2UwNDljM2YwNDljNDEwNDlkNDMwMzllNDQwMzllNDYwMzlmNDgwMzlmNDkwM2EwNGIwM2ExNGMwMmExNGUwMmEyNTAwMmEyNTEwMmEzNTMwMmEzNTUwMmE0NTYwMWE0NTgwMWE0NTkwMWE1NWIwMWE1NWMwMWE2NWUwMWE2NjAwMWE2NjEwMGE3NjMwMGE3NjQwMGE3NjYwMGE3NjcwMGE4NjkwMGE4NmEwMGE4NmMwMGE4NmUwMGE4NmYwMGE4NzEwMGE4NzIwMWE4NzQwMWE4NzUwMWE4NzcwMWE4NzgwMWE4N2EwMmE4N2IwMmE4N2QwM2E4N2UwM2E4ODAwNGE4ODEwNGE3ODMwNWE3ODQwNWE3ODYwNmE2ODcwN2E2ODgwOGE2OGEwOWE1OGIwYWE1OGQwYmE1OGUwY2E0OGYwZGE0OTEwZWEzOTIwZmEzOTQxMGEyOTUxMWExOTYxM2ExOTgxNGEwOTkxNTlmOWExNjlmOWMxNzllOWQxODlkOWUxOTlkYTAxYTljYTExYjliYTIxZDlhYTMxZTlhYTUxZjk5YTYyMDk4YTcyMTk3YTgyMjk2YWEyMzk1YWIyNDk0YWMyNjk0YWQyNzkzYWUyODkyYjAyOTkxYjEyYTkwYjIyYjhmYjMyYzhlYjQyZThkYjUyZjhjYjYzMDhiYjczMThhYjgzMjg5YmEzMzg4YmIzNDg4YmMzNTg3YmQzNzg2YmUzODg1YmYzOTg0YzAzYTgzYzEzYjgyYzIzYzgxYzMzZDgwYzQzZTdmYzU0MDdlYzY0MTdkYzc0MjdjYzg0MzdiYzk0NDdhY2E0NTdhY2I0Njc5Y2M0Nzc4Y2M0OTc3Y2Q0YTc2Y2U0Yjc1Y2Y0Yzc0ZDA0ZDczZDE0ZTcyZDI0ZjcxZDM1MTcxZDQ1MjcwZDU1MzZmZDU1NDZlZDY1NTZkZDc1NjZjZDg1NzZiZDk1ODZhZGE1YTZhZGE1YjY5ZGI1YzY4ZGM1ZDY3ZGQ1ZTY2ZGU1ZjY1ZGU2MTY0ZGY2MjYzZTA2MzYzZTE2NDYyZTI2NTYxZTI2NjYwZTM2ODVmZTQ2OTVlZTU2YTVkZTU2YjVkZTY2YzVjZTc2ZTViZTc2ZjVhZTg3MDU5ZTk3MTU4ZTk3MjU3ZWE3NDU3ZWI3NTU2ZWI3NjU1ZWM3NzU0ZWQ3OTUzZWQ3YTUyZWU3YjUxZWY3YzUxZWY3ZTUwZjA3ZjRmZjA4MDRlZjE4MTRkZjE4MzRjZjI4NDRiZjM4NTRiZjM4NzRhZjQ4ODQ5ZjQ4OTQ4ZjU4YjQ3ZjU4YzQ2ZjY4ZDQ1ZjY4ZjQ0Zjc5MDQ0Zjc5MTQzZjc5MzQyZjg5NDQxZjg5NTQwZjk5NzNmZjk5ODNlZjk5YTNlZmE5YjNkZmE5YzNjZmE5ZTNiZmI5ZjNhZmJhMTM5ZmJhMjM4ZmNhMzM4ZmNhNTM3ZmNhNjM2ZmNhODM1ZmNhOTM0ZmRhYjMzZmRhYzMzZmRhZTMyZmRhZjMxZmRiMTMwZmRiMjJmZmRiNDJmZmRiNTJlZmViNzJkZmViODJjZmViYTJjZmViYjJiZmViZDJhZmViZTJhZmVjMDI5ZmRjMjI5ZmRjMzI4ZmRjNTI3ZmRjNjI3ZmRjODI3ZmRjYTI2ZmRjYjI2ZmNjZDI1ZmNjZTI1ZmNkMDI1ZmNkMjI1ZmJkMzI0ZmJkNTI0ZmJkNzI0ZmFkODI0ZmFkYTI0ZjlkYzI0ZjlkZDI1ZjhkZjI1ZjhlMTI1ZjdlMjI1ZjdlNDI1ZjZlNjI2ZjZlODI2ZjVlOTI2ZjVlYjI3ZjRlZDI3ZjNlZTI3ZjNmMDI3ZjJmMjI3ZjFmNDI2ZjFmNTI1ZjBmNzI0ZjBmOTIxXCIpKTtcblxuICBmdW5jdGlvbiBzZXF1ZW50aWFsKGludGVycG9sYXRvcikge1xuICAgIHZhciB4MCA9IDAsXG4gICAgICAgIHgxID0gMSxcbiAgICAgICAgY2xhbXAgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIHZhciB0ID0gKHggLSB4MCkgLyAoeDEgLSB4MCk7XG4gICAgICByZXR1cm4gaW50ZXJwb2xhdG9yKGNsYW1wID8gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdCkpIDogdCk7XG4gICAgfVxuXG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeDAgPSArX1swXSwgeDEgPSArX1sxXSwgc2NhbGUpIDogW3gwLCB4MV07XG4gICAgfTtcblxuICAgIHNjYWxlLmNsYW1wID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoY2xhbXAgPSAhIV8sIHNjYWxlKSA6IGNsYW1wO1xuICAgIH07XG5cbiAgICBzY2FsZS5pbnRlcnBvbGF0b3IgPSBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChpbnRlcnBvbGF0b3IgPSBfLCBzY2FsZSkgOiBpbnRlcnBvbGF0b3I7XG4gICAgfTtcblxuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzZXF1ZW50aWFsKGludGVycG9sYXRvcikuZG9tYWluKFt4MCwgeDFdKS5jbGFtcChjbGFtcCk7XG4gICAgfTtcblxuICAgIHJldHVybiBsaW5lYXJpc2goc2NhbGUpO1xuICB9XG5cbiAgZXhwb3J0cy5zY2FsZUJhbmQgPSBiYW5kO1xuICBleHBvcnRzLnNjYWxlUG9pbnQgPSBwb2ludDtcbiAgZXhwb3J0cy5zY2FsZUlkZW50aXR5ID0gaWRlbnRpdHk7XG4gIGV4cG9ydHMuc2NhbGVMaW5lYXIgPSBsaW5lYXI7XG4gIGV4cG9ydHMuc2NhbGVMb2cgPSBsb2c7XG4gIGV4cG9ydHMuc2NhbGVPcmRpbmFsID0gb3JkaW5hbDtcbiAgZXhwb3J0cy5zY2FsZUltcGxpY2l0ID0gaW1wbGljaXQ7XG4gIGV4cG9ydHMuc2NhbGVQb3cgPSBwb3c7XG4gIGV4cG9ydHMuc2NhbGVTcXJ0ID0gc3FydDtcbiAgZXhwb3J0cy5zY2FsZVF1YW50aWxlID0gcXVhbnRpbGUkMTtcbiAgZXhwb3J0cy5zY2FsZVF1YW50aXplID0gcXVhbnRpemU7XG4gIGV4cG9ydHMuc2NhbGVUaHJlc2hvbGQgPSB0aHJlc2hvbGQ7XG4gIGV4cG9ydHMuc2NhbGVUaW1lID0gdGltZTtcbiAgZXhwb3J0cy5zY2FsZVV0YyA9IHV0Y1RpbWU7XG4gIGV4cG9ydHMuc2NoZW1lQ2F0ZWdvcnkxMCA9IGNhdGVnb3J5MTA7XG4gIGV4cG9ydHMuc2NoZW1lQ2F0ZWdvcnkyMGIgPSBjYXRlZ29yeTIwYjtcbiAgZXhwb3J0cy5zY2hlbWVDYXRlZ29yeTIwYyA9IGNhdGVnb3J5MjBjO1xuICBleHBvcnRzLnNjaGVtZUNhdGVnb3J5MjAgPSBjYXRlZ29yeTIwO1xuICBleHBvcnRzLmludGVycG9sYXRlQ3ViZWhlbGl4RGVmYXVsdCA9IGN1YmVoZWxpeCQxO1xuICBleHBvcnRzLmludGVycG9sYXRlUmFpbmJvdyA9IHJhaW5ib3ckMTtcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZVdhcm0gPSB3YXJtO1xuICBleHBvcnRzLmludGVycG9sYXRlQ29vbCA9IGNvb2w7XG4gIGV4cG9ydHMuaW50ZXJwb2xhdGVWaXJpZGlzID0gdmlyaWRpcztcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZU1hZ21hID0gbWFnbWE7XG4gIGV4cG9ydHMuaW50ZXJwb2xhdGVJbmZlcm5vID0gaW5mZXJubztcbiAgZXhwb3J0cy5pbnRlcnBvbGF0ZVBsYXNtYSA9IHBsYXNtYTtcbiAgZXhwb3J0cy5zY2FsZVNlcXVlbnRpYWwgPSBzZXF1ZW50aWFsO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKTsiLCIvLyBodHRwczovL2QzanMub3JnL2QzLXRpbWUtZm9ybWF0LyBWZXJzaW9uIDIuMC4yLiBDb3B5cmlnaHQgMjAxNiBNaWtlIEJvc3RvY2suXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJ2QzLXRpbWUnKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJywgJ2QzLXRpbWUnXSwgZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgoZ2xvYmFsLmQzID0gZ2xvYmFsLmQzIHx8IHt9KSxnbG9iYWwuZDMpKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsZDNUaW1lKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBsb2NhbERhdGUoZCkge1xuICAgIGlmICgwIDw9IGQueSAmJiBkLnkgPCAxMDApIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoLTEsIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpO1xuICAgICAgZGF0ZS5zZXRGdWxsWWVhcihkLnkpO1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZShkLnksIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXRjRGF0ZShkKSB7XG4gICAgaWYgKDAgPD0gZC55ICYmIGQueSA8IDEwMCkge1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygtMSwgZC5tLCBkLmQsIGQuSCwgZC5NLCBkLlMsIGQuTCkpO1xuICAgICAgZGF0ZS5zZXRVVENGdWxsWWVhcihkLnkpO1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyhkLnksIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld1llYXIoeSkge1xuICAgIHJldHVybiB7eTogeSwgbTogMCwgZDogMSwgSDogMCwgTTogMCwgUzogMCwgTDogMH07XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRMb2NhbGUobG9jYWxlKSB7XG4gICAgdmFyIGxvY2FsZV9kYXRlVGltZSA9IGxvY2FsZS5kYXRlVGltZSxcbiAgICAgICAgbG9jYWxlX2RhdGUgPSBsb2NhbGUuZGF0ZSxcbiAgICAgICAgbG9jYWxlX3RpbWUgPSBsb2NhbGUudGltZSxcbiAgICAgICAgbG9jYWxlX3BlcmlvZHMgPSBsb2NhbGUucGVyaW9kcyxcbiAgICAgICAgbG9jYWxlX3dlZWtkYXlzID0gbG9jYWxlLmRheXMsXG4gICAgICAgIGxvY2FsZV9zaG9ydFdlZWtkYXlzID0gbG9jYWxlLnNob3J0RGF5cyxcbiAgICAgICAgbG9jYWxlX21vbnRocyA9IGxvY2FsZS5tb250aHMsXG4gICAgICAgIGxvY2FsZV9zaG9ydE1vbnRocyA9IGxvY2FsZS5zaG9ydE1vbnRocztcblxuICAgIHZhciBwZXJpb2RSZSA9IGZvcm1hdFJlKGxvY2FsZV9wZXJpb2RzKSxcbiAgICAgICAgcGVyaW9kTG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9wZXJpb2RzKSxcbiAgICAgICAgd2Vla2RheVJlID0gZm9ybWF0UmUobG9jYWxlX3dlZWtkYXlzKSxcbiAgICAgICAgd2Vla2RheUxvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfd2Vla2RheXMpLFxuICAgICAgICBzaG9ydFdlZWtkYXlSZSA9IGZvcm1hdFJlKGxvY2FsZV9zaG9ydFdlZWtkYXlzKSxcbiAgICAgICAgc2hvcnRXZWVrZGF5TG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9zaG9ydFdlZWtkYXlzKSxcbiAgICAgICAgbW9udGhSZSA9IGZvcm1hdFJlKGxvY2FsZV9tb250aHMpLFxuICAgICAgICBtb250aExvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfbW9udGhzKSxcbiAgICAgICAgc2hvcnRNb250aFJlID0gZm9ybWF0UmUobG9jYWxlX3Nob3J0TW9udGhzKSxcbiAgICAgICAgc2hvcnRNb250aExvb2t1cCA9IGZvcm1hdExvb2t1cChsb2NhbGVfc2hvcnRNb250aHMpO1xuXG4gICAgdmFyIGZvcm1hdHMgPSB7XG4gICAgICBcImFcIjogZm9ybWF0U2hvcnRXZWVrZGF5LFxuICAgICAgXCJBXCI6IGZvcm1hdFdlZWtkYXksXG4gICAgICBcImJcIjogZm9ybWF0U2hvcnRNb250aCxcbiAgICAgIFwiQlwiOiBmb3JtYXRNb250aCxcbiAgICAgIFwiY1wiOiBudWxsLFxuICAgICAgXCJkXCI6IGZvcm1hdERheU9mTW9udGgsXG4gICAgICBcImVcIjogZm9ybWF0RGF5T2ZNb250aCxcbiAgICAgIFwiSFwiOiBmb3JtYXRIb3VyMjQsXG4gICAgICBcIklcIjogZm9ybWF0SG91cjEyLFxuICAgICAgXCJqXCI6IGZvcm1hdERheU9mWWVhcixcbiAgICAgIFwiTFwiOiBmb3JtYXRNaWxsaXNlY29uZHMsXG4gICAgICBcIm1cIjogZm9ybWF0TW9udGhOdW1iZXIsXG4gICAgICBcIk1cIjogZm9ybWF0TWludXRlcyxcbiAgICAgIFwicFwiOiBmb3JtYXRQZXJpb2QsXG4gICAgICBcIlNcIjogZm9ybWF0U2Vjb25kcyxcbiAgICAgIFwiVVwiOiBmb3JtYXRXZWVrTnVtYmVyU3VuZGF5LFxuICAgICAgXCJ3XCI6IGZvcm1hdFdlZWtkYXlOdW1iZXIsXG4gICAgICBcIldcIjogZm9ybWF0V2Vla051bWJlck1vbmRheSxcbiAgICAgIFwieFwiOiBudWxsLFxuICAgICAgXCJYXCI6IG51bGwsXG4gICAgICBcInlcIjogZm9ybWF0WWVhcixcbiAgICAgIFwiWVwiOiBmb3JtYXRGdWxsWWVhcixcbiAgICAgIFwiWlwiOiBmb3JtYXRab25lLFxuICAgICAgXCIlXCI6IGZvcm1hdExpdGVyYWxQZXJjZW50XG4gICAgfTtcblxuICAgIHZhciB1dGNGb3JtYXRzID0ge1xuICAgICAgXCJhXCI6IGZvcm1hdFVUQ1Nob3J0V2Vla2RheSxcbiAgICAgIFwiQVwiOiBmb3JtYXRVVENXZWVrZGF5LFxuICAgICAgXCJiXCI6IGZvcm1hdFVUQ1Nob3J0TW9udGgsXG4gICAgICBcIkJcIjogZm9ybWF0VVRDTW9udGgsXG4gICAgICBcImNcIjogbnVsbCxcbiAgICAgIFwiZFwiOiBmb3JtYXRVVENEYXlPZk1vbnRoLFxuICAgICAgXCJlXCI6IGZvcm1hdFVUQ0RheU9mTW9udGgsXG4gICAgICBcIkhcIjogZm9ybWF0VVRDSG91cjI0LFxuICAgICAgXCJJXCI6IGZvcm1hdFVUQ0hvdXIxMixcbiAgICAgIFwialwiOiBmb3JtYXRVVENEYXlPZlllYXIsXG4gICAgICBcIkxcIjogZm9ybWF0VVRDTWlsbGlzZWNvbmRzLFxuICAgICAgXCJtXCI6IGZvcm1hdFVUQ01vbnRoTnVtYmVyLFxuICAgICAgXCJNXCI6IGZvcm1hdFVUQ01pbnV0ZXMsXG4gICAgICBcInBcIjogZm9ybWF0VVRDUGVyaW9kLFxuICAgICAgXCJTXCI6IGZvcm1hdFVUQ1NlY29uZHMsXG4gICAgICBcIlVcIjogZm9ybWF0VVRDV2Vla051bWJlclN1bmRheSxcbiAgICAgIFwid1wiOiBmb3JtYXRVVENXZWVrZGF5TnVtYmVyLFxuICAgICAgXCJXXCI6IGZvcm1hdFVUQ1dlZWtOdW1iZXJNb25kYXksXG4gICAgICBcInhcIjogbnVsbCxcbiAgICAgIFwiWFwiOiBudWxsLFxuICAgICAgXCJ5XCI6IGZvcm1hdFVUQ1llYXIsXG4gICAgICBcIllcIjogZm9ybWF0VVRDRnVsbFllYXIsXG4gICAgICBcIlpcIjogZm9ybWF0VVRDWm9uZSxcbiAgICAgIFwiJVwiOiBmb3JtYXRMaXRlcmFsUGVyY2VudFxuICAgIH07XG5cbiAgICB2YXIgcGFyc2VzID0ge1xuICAgICAgXCJhXCI6IHBhcnNlU2hvcnRXZWVrZGF5LFxuICAgICAgXCJBXCI6IHBhcnNlV2Vla2RheSxcbiAgICAgIFwiYlwiOiBwYXJzZVNob3J0TW9udGgsXG4gICAgICBcIkJcIjogcGFyc2VNb250aCxcbiAgICAgIFwiY1wiOiBwYXJzZUxvY2FsZURhdGVUaW1lLFxuICAgICAgXCJkXCI6IHBhcnNlRGF5T2ZNb250aCxcbiAgICAgIFwiZVwiOiBwYXJzZURheU9mTW9udGgsXG4gICAgICBcIkhcIjogcGFyc2VIb3VyMjQsXG4gICAgICBcIklcIjogcGFyc2VIb3VyMjQsXG4gICAgICBcImpcIjogcGFyc2VEYXlPZlllYXIsXG4gICAgICBcIkxcIjogcGFyc2VNaWxsaXNlY29uZHMsXG4gICAgICBcIm1cIjogcGFyc2VNb250aE51bWJlcixcbiAgICAgIFwiTVwiOiBwYXJzZU1pbnV0ZXMsXG4gICAgICBcInBcIjogcGFyc2VQZXJpb2QsXG4gICAgICBcIlNcIjogcGFyc2VTZWNvbmRzLFxuICAgICAgXCJVXCI6IHBhcnNlV2Vla051bWJlclN1bmRheSxcbiAgICAgIFwid1wiOiBwYXJzZVdlZWtkYXlOdW1iZXIsXG4gICAgICBcIldcIjogcGFyc2VXZWVrTnVtYmVyTW9uZGF5LFxuICAgICAgXCJ4XCI6IHBhcnNlTG9jYWxlRGF0ZSxcbiAgICAgIFwiWFwiOiBwYXJzZUxvY2FsZVRpbWUsXG4gICAgICBcInlcIjogcGFyc2VZZWFyLFxuICAgICAgXCJZXCI6IHBhcnNlRnVsbFllYXIsXG4gICAgICBcIlpcIjogcGFyc2Vab25lLFxuICAgICAgXCIlXCI6IHBhcnNlTGl0ZXJhbFBlcmNlbnRcbiAgICB9O1xuXG4gICAgLy8gVGhlc2UgcmVjdXJzaXZlIGRpcmVjdGl2ZSBkZWZpbml0aW9ucyBtdXN0IGJlIGRlZmVycmVkLlxuICAgIGZvcm1hdHMueCA9IG5ld0Zvcm1hdChsb2NhbGVfZGF0ZSwgZm9ybWF0cyk7XG4gICAgZm9ybWF0cy5YID0gbmV3Rm9ybWF0KGxvY2FsZV90aW1lLCBmb3JtYXRzKTtcbiAgICBmb3JtYXRzLmMgPSBuZXdGb3JtYXQobG9jYWxlX2RhdGVUaW1lLCBmb3JtYXRzKTtcbiAgICB1dGNGb3JtYXRzLnggPSBuZXdGb3JtYXQobG9jYWxlX2RhdGUsIHV0Y0Zvcm1hdHMpO1xuICAgIHV0Y0Zvcm1hdHMuWCA9IG5ld0Zvcm1hdChsb2NhbGVfdGltZSwgdXRjRm9ybWF0cyk7XG4gICAgdXRjRm9ybWF0cy5jID0gbmV3Rm9ybWF0KGxvY2FsZV9kYXRlVGltZSwgdXRjRm9ybWF0cyk7XG5cbiAgICBmdW5jdGlvbiBuZXdGb3JtYXQoc3BlY2lmaWVyLCBmb3JtYXRzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICB2YXIgc3RyaW5nID0gW10sXG4gICAgICAgICAgICBpID0gLTEsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIG4gPSBzcGVjaWZpZXIubGVuZ3RoLFxuICAgICAgICAgICAgYyxcbiAgICAgICAgICAgIHBhZCxcbiAgICAgICAgICAgIGZvcm1hdDtcblxuICAgICAgICBpZiAoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSk7XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICBpZiAoc3BlY2lmaWVyLmNoYXJDb2RlQXQoaSkgPT09IDM3KSB7XG4gICAgICAgICAgICBzdHJpbmcucHVzaChzcGVjaWZpZXIuc2xpY2UoaiwgaSkpO1xuICAgICAgICAgICAgaWYgKChwYWQgPSBwYWRzW2MgPSBzcGVjaWZpZXIuY2hhckF0KCsraSldKSAhPSBudWxsKSBjID0gc3BlY2lmaWVyLmNoYXJBdCgrK2kpO1xuICAgICAgICAgICAgZWxzZSBwYWQgPSBjID09PSBcImVcIiA/IFwiIFwiIDogXCIwXCI7XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID0gZm9ybWF0c1tjXSkgYyA9IGZvcm1hdChkYXRlLCBwYWQpO1xuICAgICAgICAgICAgc3RyaW5nLnB1c2goYyk7XG4gICAgICAgICAgICBqID0gaSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RyaW5nLnB1c2goc3BlY2lmaWVyLnNsaWNlKGosIGkpKTtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5qb2luKFwiXCIpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdQYXJzZShzcGVjaWZpZXIsIG5ld0RhdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgICAgdmFyIGQgPSBuZXdZZWFyKDE5MDApLFxuICAgICAgICAgICAgaSA9IHBhcnNlU3BlY2lmaWVyKGQsIHNwZWNpZmllciwgc3RyaW5nICs9IFwiXCIsIDApO1xuICAgICAgICBpZiAoaSAhPSBzdHJpbmcubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAvLyBUaGUgYW0tcG0gZmxhZyBpcyAwIGZvciBBTSwgYW5kIDEgZm9yIFBNLlxuICAgICAgICBpZiAoXCJwXCIgaW4gZCkgZC5IID0gZC5IICUgMTIgKyBkLnAgKiAxMjtcblxuICAgICAgICAvLyBDb252ZXJ0IGRheS1vZi13ZWVrIGFuZCB3ZWVrLW9mLXllYXIgdG8gZGF5LW9mLXllYXIuXG4gICAgICAgIGlmIChcIldcIiBpbiBkIHx8IFwiVVwiIGluIGQpIHtcbiAgICAgICAgICBpZiAoIShcIndcIiBpbiBkKSkgZC53ID0gXCJXXCIgaW4gZCA/IDEgOiAwO1xuICAgICAgICAgIHZhciBkYXkgPSBcIlpcIiBpbiBkID8gdXRjRGF0ZShuZXdZZWFyKGQueSkpLmdldFVUQ0RheSgpIDogbmV3RGF0ZShuZXdZZWFyKGQueSkpLmdldERheSgpO1xuICAgICAgICAgIGQubSA9IDA7XG4gICAgICAgICAgZC5kID0gXCJXXCIgaW4gZCA/IChkLncgKyA2KSAlIDcgKyBkLlcgKiA3IC0gKGRheSArIDUpICUgNyA6IGQudyArIGQuVSAqIDcgLSAoZGF5ICsgNikgJSA3O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYSB0aW1lIHpvbmUgaXMgc3BlY2lmaWVkLCBhbGwgZmllbGRzIGFyZSBpbnRlcnByZXRlZCBhcyBVVEMgYW5kIHRoZW5cbiAgICAgICAgLy8gb2Zmc2V0IGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIHRpbWUgem9uZS5cbiAgICAgICAgaWYgKFwiWlwiIGluIGQpIHtcbiAgICAgICAgICBkLkggKz0gZC5aIC8gMTAwIHwgMDtcbiAgICAgICAgICBkLk0gKz0gZC5aICUgMTAwO1xuICAgICAgICAgIHJldHVybiB1dGNEYXRlKGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBhbGwgZmllbGRzIGFyZSBpbiBsb2NhbCB0aW1lLlxuICAgICAgICByZXR1cm4gbmV3RGF0ZShkKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTcGVjaWZpZXIoZCwgc3BlY2lmaWVyLCBzdHJpbmcsIGopIHtcbiAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICBuID0gc3BlY2lmaWVyLmxlbmd0aCxcbiAgICAgICAgICBtID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICBjLFxuICAgICAgICAgIHBhcnNlO1xuXG4gICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgaWYgKGogPj0gbSkgcmV0dXJuIC0xO1xuICAgICAgICBjID0gc3BlY2lmaWVyLmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgICAgaWYgKGMgPT09IDM3KSB7XG4gICAgICAgICAgYyA9IHNwZWNpZmllci5jaGFyQXQoaSsrKTtcbiAgICAgICAgICBwYXJzZSA9IHBhcnNlc1tjIGluIHBhZHMgPyBzcGVjaWZpZXIuY2hhckF0KGkrKykgOiBjXTtcbiAgICAgICAgICBpZiAoIXBhcnNlIHx8ICgoaiA9IHBhcnNlKGQsIHN0cmluZywgaikpIDwgMCkpIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChjICE9IHN0cmluZy5jaGFyQ29kZUF0KGorKykpIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGo7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VQZXJpb2QoZCwgc3RyaW5nLCBpKSB7XG4gICAgICB2YXIgbiA9IHBlcmlvZFJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICAgIHJldHVybiBuID8gKGQucCA9IHBlcmlvZExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTaG9ydFdlZWtkYXkoZCwgc3RyaW5nLCBpKSB7XG4gICAgICB2YXIgbiA9IHNob3J0V2Vla2RheVJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICAgIHJldHVybiBuID8gKGQudyA9IHNob3J0V2Vla2RheUxvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VXZWVrZGF5KGQsIHN0cmluZywgaSkge1xuICAgICAgdmFyIG4gPSB3ZWVrZGF5UmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgICAgcmV0dXJuIG4gPyAoZC53ID0gd2Vla2RheUxvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTaG9ydE1vbnRoKGQsIHN0cmluZywgaSkge1xuICAgICAgdmFyIG4gPSBzaG9ydE1vbnRoUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgICAgcmV0dXJuIG4gPyAoZC5tID0gc2hvcnRNb250aExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNb250aChkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHZhciBuID0gbW9udGhSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgICByZXR1cm4gbiA/IChkLm0gPSBtb250aExvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2NhbGVEYXRlVGltZShkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHJldHVybiBwYXJzZVNwZWNpZmllcihkLCBsb2NhbGVfZGF0ZVRpbWUsIHN0cmluZywgaSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VMb2NhbGVEYXRlKGQsIHN0cmluZywgaSkge1xuICAgICAgcmV0dXJuIHBhcnNlU3BlY2lmaWVyKGQsIGxvY2FsZV9kYXRlLCBzdHJpbmcsIGkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTG9jYWxlVGltZShkLCBzdHJpbmcsIGkpIHtcbiAgICAgIHJldHVybiBwYXJzZVNwZWNpZmllcihkLCBsb2NhbGVfdGltZSwgc3RyaW5nLCBpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRTaG9ydFdlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9zaG9ydFdlZWtkYXlzW2QuZ2V0RGF5KCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFdlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV93ZWVrZGF5c1tkLmdldERheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRTaG9ydE1vbnRoKGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfc2hvcnRNb250aHNbZC5nZXRNb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRNb250aChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX21vbnRoc1tkLmdldE1vbnRoKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFBlcmlvZChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX3BlcmlvZHNbKyhkLmdldEhvdXJzKCkgPj0gMTIpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENTaG9ydFdlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV9zaG9ydFdlZWtkYXlzW2QuZ2V0VVRDRGF5KCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFVUQ1dlZWtkYXkoZCkge1xuICAgICAgcmV0dXJuIGxvY2FsZV93ZWVrZGF5c1tkLmdldFVUQ0RheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENTaG9ydE1vbnRoKGQpIHtcbiAgICAgIHJldHVybiBsb2NhbGVfc2hvcnRNb250aHNbZC5nZXRVVENNb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRVVENNb250aChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX21vbnRoc1tkLmdldFVUQ01vbnRoKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFVUQ1BlcmlvZChkKSB7XG4gICAgICByZXR1cm4gbG9jYWxlX3BlcmlvZHNbKyhkLmdldFVUQ0hvdXJzKCkgPj0gMTIpXTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZm9ybWF0OiBmdW5jdGlvbihzcGVjaWZpZXIpIHtcbiAgICAgICAgdmFyIGYgPSBuZXdGb3JtYXQoc3BlY2lmaWVyICs9IFwiXCIsIGZvcm1hdHMpO1xuICAgICAgICBmLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiBzcGVjaWZpZXI7IH07XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfSxcbiAgICAgIHBhcnNlOiBmdW5jdGlvbihzcGVjaWZpZXIpIHtcbiAgICAgICAgdmFyIHAgPSBuZXdQYXJzZShzcGVjaWZpZXIgKz0gXCJcIiwgbG9jYWxEYXRlKTtcbiAgICAgICAgcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3BlY2lmaWVyOyB9O1xuICAgICAgICByZXR1cm4gcDtcbiAgICAgIH0sXG4gICAgICB1dGNGb3JtYXQ6IGZ1bmN0aW9uKHNwZWNpZmllcikge1xuICAgICAgICB2YXIgZiA9IG5ld0Zvcm1hdChzcGVjaWZpZXIgKz0gXCJcIiwgdXRjRm9ybWF0cyk7XG4gICAgICAgIGYudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHNwZWNpZmllcjsgfTtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgICB9LFxuICAgICAgdXRjUGFyc2U6IGZ1bmN0aW9uKHNwZWNpZmllcikge1xuICAgICAgICB2YXIgcCA9IG5ld1BhcnNlKHNwZWNpZmllciwgdXRjRGF0ZSk7XG4gICAgICAgIHAudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHNwZWNpZmllcjsgfTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHZhciBwYWRzID0ge1wiLVwiOiBcIlwiLCBcIl9cIjogXCIgXCIsIFwiMFwiOiBcIjBcIn07XG4gIHZhciBudW1iZXJSZSA9IC9eXFxzKlxcZCsvO1xuICB2YXIgcGVyY2VudFJlID0gL14lLztcbiAgdmFyIHJlcXVvdGVSZSA9IC9bXFxcXFxcXlxcJFxcKlxcK1xcP1xcfFxcW1xcXVxcKFxcKVxcLlxce1xcfV0vZztcbiAgZnVuY3Rpb24gcGFkKHZhbHVlLCBmaWxsLCB3aWR0aCkge1xuICAgIHZhciBzaWduID0gdmFsdWUgPCAwID8gXCItXCIgOiBcIlwiLFxuICAgICAgICBzdHJpbmcgPSAoc2lnbiA/IC12YWx1ZSA6IHZhbHVlKSArIFwiXCIsXG4gICAgICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgcmV0dXJuIHNpZ24gKyAobGVuZ3RoIDwgd2lkdGggPyBuZXcgQXJyYXkod2lkdGggLSBsZW5ndGggKyAxKS5qb2luKGZpbGwpICsgc3RyaW5nIDogc3RyaW5nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcXVvdGUocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UocmVxdW90ZVJlLCBcIlxcXFwkJlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFJlKG5hbWVzKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKD86XCIgKyBuYW1lcy5tYXAocmVxdW90ZSkuam9pbihcInxcIikgKyBcIilcIiwgXCJpXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0TG9va3VwKG5hbWVzKSB7XG4gICAgdmFyIG1hcCA9IHt9LCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gICAgd2hpbGUgKCsraSA8IG4pIG1hcFtuYW1lc1tpXS50b0xvd2VyQ2FzZSgpXSA9IGk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlV2Vla2RheU51bWJlcihkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAxKSk7XG4gICAgcmV0dXJuIG4gPyAoZC53ID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlV2Vla051bWJlclN1bmRheShkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICByZXR1cm4gbiA/IChkLlUgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VXZWVrTnVtYmVyTW9uZGF5KGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgIHJldHVybiBuID8gKGQuVyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUZ1bGxZZWFyKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDQpKTtcbiAgICByZXR1cm4gbiA/IChkLnkgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VZZWFyKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDIpKTtcbiAgICByZXR1cm4gbiA/IChkLnkgPSArblswXSArICgrblswXSA+IDY4ID8gMTkwMCA6IDIwMDApLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVpvbmUoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSAvXihaKXwoWystXVxcZFxcZCkoPzpcXDo/KFxcZFxcZCkpPy8uZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDYpKTtcbiAgICByZXR1cm4gbiA/IChkLlogPSBuWzFdID8gMCA6IC0oblsyXSArIChuWzNdIHx8IFwiMDBcIikpLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZU1vbnRoTnVtYmVyKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDIpKTtcbiAgICByZXR1cm4gbiA/IChkLm0gPSBuWzBdIC0gMSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VEYXlPZk1vbnRoKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDIpKTtcbiAgICByZXR1cm4gbiA/IChkLmQgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VEYXlPZlllYXIoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMykpO1xuICAgIHJldHVybiBuID8gKGQubSA9IDAsIGQuZCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhvdXIyNChkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5IID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTWludXRlcyhkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5NID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlU2Vjb25kcyhkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZC5TID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTWlsbGlzZWNvbmRzKGQsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDMpKTtcbiAgICByZXR1cm4gbiA/IChkLkwgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VMaXRlcmFsUGVyY2VudChkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IHBlcmNlbnRSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMSkpO1xuICAgIHJldHVybiBuID8gaSArIG5bMF0ubGVuZ3RoIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXREYXlPZk1vbnRoKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0RGF0ZSgpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdEhvdXIyNChkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldEhvdXJzKCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0SG91cjEyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0SG91cnMoKSAlIDEyIHx8IDEyLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdERheU9mWWVhcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZCgxICsgZDNUaW1lLnRpbWVEYXkuY291bnQoZDNUaW1lLnRpbWVZZWFyKGQpLCBkKSwgcCwgMyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRNaWxsaXNlY29uZHMoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRNaWxsaXNlY29uZHMoKSwgcCwgMyk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRNb250aE51bWJlcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldE1vbnRoKCkgKyAxLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdE1pbnV0ZXMoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRNaW51dGVzKCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0U2Vjb25kcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFNlY29uZHMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRXZWVrTnVtYmVyU3VuZGF5KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQzVGltZS50aW1lU3VuZGF5LmNvdW50KGQzVGltZS50aW1lWWVhcihkKSwgZCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0V2Vla2RheU51bWJlcihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0RGF5KCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRXZWVrTnVtYmVyTW9uZGF5KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQzVGltZS50aW1lTW9uZGF5LmNvdW50KGQzVGltZS50aW1lWWVhcihkKSwgZCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0WWVhcihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldEZ1bGxZZWFyKCkgJSAxMDAsIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0RnVsbFllYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRGdWxsWWVhcigpICUgMTAwMDAsIHAsIDQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Wm9uZShkKSB7XG4gICAgdmFyIHogPSBkLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgcmV0dXJuICh6ID4gMCA/IFwiLVwiIDogKHogKj0gLTEsIFwiK1wiKSlcbiAgICAgICAgKyBwYWQoeiAvIDYwIHwgMCwgXCIwXCIsIDIpXG4gICAgICAgICsgcGFkKHogJSA2MCwgXCIwXCIsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDRGF5T2ZNb250aChkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ0RhdGUoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENIb3VyMjQoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENIb3VycygpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ0hvdXIxMihkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ0hvdXJzKCkgJSAxMiB8fCAxMiwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENEYXlPZlllYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoMSArIGQzVGltZS51dGNEYXkuY291bnQoZDNUaW1lLnV0Y1llYXIoZCksIGQpLCBwLCAzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ01pbGxpc2Vjb25kcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ01pbGxpc2Vjb25kcygpLCBwLCAzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ01vbnRoTnVtYmVyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0VVRDTW9udGgoKSArIDEsIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDTWludXRlcyhkLCBwKSB7XG4gICAgcmV0dXJuIHBhZChkLmdldFVUQ01pbnV0ZXMoKSwgcCwgMik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENTZWNvbmRzKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0VVRDU2Vjb25kcygpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1dlZWtOdW1iZXJTdW5kYXkoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZDNUaW1lLnV0Y1N1bmRheS5jb3VudChkM1RpbWUudXRjWWVhcihkKSwgZCksIHAsIDIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDV2Vla2RheU51bWJlcihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0VVRDRGF5KCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENXZWVrTnVtYmVyTW9uZGF5KGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQzVGltZS51dGNNb25kYXkuY291bnQoZDNUaW1lLnV0Y1llYXIoZCksIGQpLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1llYXIoZCwgcCkge1xuICAgIHJldHVybiBwYWQoZC5nZXRVVENGdWxsWWVhcigpICUgMTAwLCBwLCAyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ0Z1bGxZZWFyKGQsIHApIHtcbiAgICByZXR1cm4gcGFkKGQuZ2V0VVRDRnVsbFllYXIoKSAlIDEwMDAwLCBwLCA0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFVUQ1pvbmUoKSB7XG4gICAgcmV0dXJuIFwiKzAwMDBcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdExpdGVyYWxQZXJjZW50KCkge1xuICAgIHJldHVybiBcIiVcIjtcbiAgfVxuXG4gIHZhciBsb2NhbGU7XG4gIGRlZmF1bHRMb2NhbGUoe1xuICAgIGRhdGVUaW1lOiBcIiV4LCAlWFwiLFxuICAgIGRhdGU6IFwiJS1tLyUtZC8lWVwiLFxuICAgIHRpbWU6IFwiJS1JOiVNOiVTICVwXCIsXG4gICAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICBkYXlzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcbiAgICBzaG9ydERheXM6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICBtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICAgIHNob3J0TW9udGhzOiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZGVmYXVsdExvY2FsZShkZWZpbml0aW9uKSB7XG4gICAgbG9jYWxlID0gZm9ybWF0TG9jYWxlKGRlZmluaXRpb24pO1xuICAgIGV4cG9ydHMudGltZUZvcm1hdCA9IGxvY2FsZS5mb3JtYXQ7XG4gICAgZXhwb3J0cy50aW1lUGFyc2UgPSBsb2NhbGUucGFyc2U7XG4gICAgZXhwb3J0cy51dGNGb3JtYXQgPSBsb2NhbGUudXRjRm9ybWF0O1xuICAgIGV4cG9ydHMudXRjUGFyc2UgPSBsb2NhbGUudXRjUGFyc2U7XG4gICAgcmV0dXJuIGxvY2FsZTtcbiAgfVxuXG4gIHZhciBpc29TcGVjaWZpZXIgPSBcIiVZLSVtLSVkVCVIOiVNOiVTLiVMWlwiO1xuXG4gIGZ1bmN0aW9uIGZvcm1hdElzb05hdGl2ZShkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKTtcbiAgfVxuXG4gIHZhciBmb3JtYXRJc28gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZ1xuICAgICAgPyBmb3JtYXRJc29OYXRpdmVcbiAgICAgIDogZXhwb3J0cy51dGNGb3JtYXQoaXNvU3BlY2lmaWVyKTtcblxuICBmdW5jdGlvbiBwYXJzZUlzb05hdGl2ZShzdHJpbmcpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0cmluZyk7XG4gICAgcmV0dXJuIGlzTmFOKGRhdGUpID8gbnVsbCA6IGRhdGU7XG4gIH1cblxuICB2YXIgcGFyc2VJc28gPSArbmV3IERhdGUoXCIyMDAwLTAxLTAxVDAwOjAwOjAwLjAwMFpcIilcbiAgICAgID8gcGFyc2VJc29OYXRpdmVcbiAgICAgIDogZXhwb3J0cy51dGNQYXJzZShpc29TcGVjaWZpZXIpO1xuXG4gIGV4cG9ydHMudGltZUZvcm1hdERlZmF1bHRMb2NhbGUgPSBkZWZhdWx0TG9jYWxlO1xuICBleHBvcnRzLnRpbWVGb3JtYXRMb2NhbGUgPSBmb3JtYXRMb2NhbGU7XG4gIGV4cG9ydHMuaXNvRm9ybWF0ID0gZm9ybWF0SXNvO1xuICBleHBvcnRzLmlzb1BhcnNlID0gcGFyc2VJc287XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpOyIsIi8vIGh0dHBzOi8vZDNqcy5vcmcvZDMtdGltZS8gVmVyc2lvbiAxLjAuMi4gQ29weXJpZ2h0IDIwMTYgTWlrZSBCb3N0b2NrLlxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgoZ2xvYmFsLmQzID0gZ2xvYmFsLmQzIHx8IHt9KSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHQwID0gbmV3IERhdGU7XG4gIHZhciB0MSA9IG5ldyBEYXRlO1xuICBmdW5jdGlvbiBuZXdJbnRlcnZhbChmbG9vcmksIG9mZnNldGksIGNvdW50LCBmaWVsZCkge1xuXG4gICAgZnVuY3Rpb24gaW50ZXJ2YWwoZGF0ZSkge1xuICAgICAgcmV0dXJuIGZsb29yaShkYXRlID0gbmV3IERhdGUoK2RhdGUpKSwgZGF0ZTtcbiAgICB9XG5cbiAgICBpbnRlcnZhbC5mbG9vciA9IGludGVydmFsO1xuXG4gICAgaW50ZXJ2YWwuY2VpbCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKGRhdGUgLSAxKSksIG9mZnNldGkoZGF0ZSwgMSksIGZsb29yaShkYXRlKSwgZGF0ZTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwucm91bmQgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICB2YXIgZDAgPSBpbnRlcnZhbChkYXRlKSxcbiAgICAgICAgICBkMSA9IGludGVydmFsLmNlaWwoZGF0ZSk7XG4gICAgICByZXR1cm4gZGF0ZSAtIGQwIDwgZDEgLSBkYXRlID8gZDAgOiBkMTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwub2Zmc2V0ID0gZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgcmV0dXJuIG9mZnNldGkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSwgc3RlcCA9PSBudWxsID8gMSA6IE1hdGguZmxvb3Ioc3RlcCkpLCBkYXRlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgICB2YXIgcmFuZ2UgPSBbXTtcbiAgICAgIHN0YXJ0ID0gaW50ZXJ2YWwuY2VpbChzdGFydCk7XG4gICAgICBzdGVwID0gc3RlcCA9PSBudWxsID8gMSA6IE1hdGguZmxvb3Ioc3RlcCk7XG4gICAgICBpZiAoIShzdGFydCA8IHN0b3ApIHx8ICEoc3RlcCA+IDApKSByZXR1cm4gcmFuZ2U7IC8vIGFsc28gaGFuZGxlcyBJbnZhbGlkIERhdGVcbiAgICAgIGRvIHJhbmdlLnB1c2gobmV3IERhdGUoK3N0YXJ0KSk7IHdoaWxlIChvZmZzZXRpKHN0YXJ0LCBzdGVwKSwgZmxvb3JpKHN0YXJ0KSwgc3RhcnQgPCBzdG9wKVxuICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH07XG5cbiAgICBpbnRlcnZhbC5maWx0ZXIgPSBmdW5jdGlvbih0ZXN0KSB7XG4gICAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICB3aGlsZSAoZmxvb3JpKGRhdGUpLCAhdGVzdChkYXRlKSkgZGF0ZS5zZXRUaW1lKGRhdGUgLSAxKTtcbiAgICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgICAgd2hpbGUgKC0tc3RlcCA+PSAwKSB3aGlsZSAob2Zmc2V0aShkYXRlLCAxKSwgIXRlc3QoZGF0ZSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmIChjb3VudCkge1xuICAgICAgaW50ZXJ2YWwuY291bnQgPSBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICAgIHQwLnNldFRpbWUoK3N0YXJ0KSwgdDEuc2V0VGltZSgrZW5kKTtcbiAgICAgICAgZmxvb3JpKHQwKSwgZmxvb3JpKHQxKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoY291bnQodDAsIHQxKSk7XG4gICAgICB9O1xuXG4gICAgICBpbnRlcnZhbC5ldmVyeSA9IGZ1bmN0aW9uKHN0ZXApIHtcbiAgICAgICAgc3RlcCA9IE1hdGguZmxvb3Ioc3RlcCk7XG4gICAgICAgIHJldHVybiAhaXNGaW5pdGUoc3RlcCkgfHwgIShzdGVwID4gMCkgPyBudWxsXG4gICAgICAgICAgICA6ICEoc3RlcCA+IDEpID8gaW50ZXJ2YWxcbiAgICAgICAgICAgIDogaW50ZXJ2YWwuZmlsdGVyKGZpZWxkXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbihkKSB7IHJldHVybiBmaWVsZChkKSAlIHN0ZXAgPT09IDA7IH1cbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGludGVydmFsLmNvdW50KDAsIGQpICUgc3RlcCA9PT0gMDsgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcnZhbDtcbiAgfVxuXG4gIHZhciBtaWxsaXNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIC8vIG5vb3BcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZCAtIHN0YXJ0O1xuICB9KTtcblxuICAvLyBBbiBvcHRpbWl6ZWQgaW1wbGVtZW50YXRpb24gZm9yIHRoaXMgc2ltcGxlIGNhc2UuXG4gIG1pbGxpc2Vjb25kLmV2ZXJ5ID0gZnVuY3Rpb24oaykge1xuICAgIGsgPSBNYXRoLmZsb29yKGspO1xuICAgIGlmICghaXNGaW5pdGUoaykgfHwgIShrID4gMCkpIHJldHVybiBudWxsO1xuICAgIGlmICghKGsgPiAxKSkgcmV0dXJuIG1pbGxpc2Vjb25kO1xuICAgIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFRpbWUoTWF0aC5mbG9vcihkYXRlIC8gaykgKiBrKTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogayk7XG4gICAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBrO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBtaWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZC5yYW5nZTtcblxuICB2YXIgZHVyYXRpb25TZWNvbmQgPSAxZTM7XG4gIHZhciBkdXJhdGlvbk1pbnV0ZSA9IDZlNDtcbiAgdmFyIGR1cmF0aW9uSG91ciA9IDM2ZTU7XG4gIHZhciBkdXJhdGlvbkRheSA9IDg2NGU1O1xuICB2YXIgZHVyYXRpb25XZWVrID0gNjA0OGU1O1xuXG4gIHZhciBzZWNvbmQgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRUaW1lKE1hdGguZmxvb3IoZGF0ZSAvIGR1cmF0aW9uU2Vjb25kKSAqIGR1cmF0aW9uU2Vjb25kKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiBkdXJhdGlvblNlY29uZCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGR1cmF0aW9uU2Vjb25kO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICB9KTtcblxuICB2YXIgc2Vjb25kcyA9IHNlY29uZC5yYW5nZTtcblxuICB2YXIgbWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VGltZShNYXRoLmZsb29yKGRhdGUgLyBkdXJhdGlvbk1pbnV0ZSkgKiBkdXJhdGlvbk1pbnV0ZSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogZHVyYXRpb25NaW51dGUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBkdXJhdGlvbk1pbnV0ZTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIG1pbnV0ZXMgPSBtaW51dGUucmFuZ2U7XG5cbiAgdmFyIGhvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgdmFyIG9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIGR1cmF0aW9uTWludXRlICUgZHVyYXRpb25Ib3VyO1xuICAgIGlmIChvZmZzZXQgPCAwKSBvZmZzZXQgKz0gZHVyYXRpb25Ib3VyO1xuICAgIGRhdGUuc2V0VGltZShNYXRoLmZsb29yKCgrZGF0ZSAtIG9mZnNldCkgLyBkdXJhdGlvbkhvdXIpICogZHVyYXRpb25Ib3VyICsgb2Zmc2V0KTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiBkdXJhdGlvbkhvdXIpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBkdXJhdGlvbkhvdXI7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICB9KTtcblxuICB2YXIgaG91cnMgPSBob3VyLnJhbmdlO1xuXG4gIHZhciBkYXkgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogZHVyYXRpb25NaW51dGUpIC8gZHVyYXRpb25EYXk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgLSAxO1xuICB9KTtcblxuICB2YXIgZGF5cyA9IGRheS5yYW5nZTtcblxuICBmdW5jdGlvbiB3ZWVrZGF5KGkpIHtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gKGRhdGUuZ2V0RGF5KCkgKyA3IC0gaSkgJSA3KTtcbiAgICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc3RlcCAqIDcpO1xuICAgIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHJldHVybiAoZW5kIC0gc3RhcnQgLSAoZW5kLmdldFRpbWV6b25lT2Zmc2V0KCkgLSBzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpKSAqIGR1cmF0aW9uTWludXRlKSAvIGR1cmF0aW9uV2VlaztcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzdW5kYXkgPSB3ZWVrZGF5KDApO1xuICB2YXIgbW9uZGF5ID0gd2Vla2RheSgxKTtcbiAgdmFyIHR1ZXNkYXkgPSB3ZWVrZGF5KDIpO1xuICB2YXIgd2VkbmVzZGF5ID0gd2Vla2RheSgzKTtcbiAgdmFyIHRodXJzZGF5ID0gd2Vla2RheSg0KTtcbiAgdmFyIGZyaWRheSA9IHdlZWtkYXkoNSk7XG4gIHZhciBzYXR1cmRheSA9IHdlZWtkYXkoNik7XG5cbiAgdmFyIHN1bmRheXMgPSBzdW5kYXkucmFuZ2U7XG4gIHZhciBtb25kYXlzID0gbW9uZGF5LnJhbmdlO1xuICB2YXIgdHVlc2RheXMgPSB0dWVzZGF5LnJhbmdlO1xuICB2YXIgd2VkbmVzZGF5cyA9IHdlZG5lc2RheS5yYW5nZTtcbiAgdmFyIHRodXJzZGF5cyA9IHRodXJzZGF5LnJhbmdlO1xuICB2YXIgZnJpZGF5cyA9IGZyaWRheS5yYW5nZTtcbiAgdmFyIHNhdHVyZGF5cyA9IHNhdHVyZGF5LnJhbmdlO1xuXG4gIHZhciBtb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldERhdGUoMSk7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldE1vbnRoKCkgLSBzdGFydC5nZXRNb250aCgpICsgKGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciBtb250aHMgPSBtb250aC5yYW5nZTtcblxuICB2YXIgeWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldE1vbnRoKDAsIDEpO1xuICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH0pO1xuXG4gIC8vIEFuIG9wdGltaXplZCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhpcyBzaW1wbGUgY2FzZS5cbiAgeWVhci5ldmVyeSA9IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gIWlzRmluaXRlKGsgPSBNYXRoLmZsb29yKGspKSB8fCAhKGsgPiAwKSA/IG51bGwgOiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldEZ1bGxZZWFyKE1hdGguZmxvb3IoZGF0ZS5nZXRGdWxsWWVhcigpIC8gaykgKiBrKTtcbiAgICAgIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gICAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgc3RlcCAqIGspO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciB5ZWFycyA9IHllYXIucmFuZ2U7XG5cbiAgdmFyIHV0Y01pbnV0ZSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ1NlY29uZHMoMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogZHVyYXRpb25NaW51dGUpO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBkdXJhdGlvbk1pbnV0ZTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgfSk7XG5cbiAgdmFyIHV0Y01pbnV0ZXMgPSB1dGNNaW51dGUucmFuZ2U7XG5cbiAgdmFyIHV0Y0hvdXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENNaW51dGVzKDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIGR1cmF0aW9uSG91cik7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGR1cmF0aW9uSG91cjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0hvdXJzKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNIb3VycyA9IHV0Y0hvdXIucmFuZ2U7XG5cbiAgdmFyIHV0Y0RheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGR1cmF0aW9uRGF5O1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRGF0ZSgpIC0gMTtcbiAgfSk7XG5cbiAgdmFyIHV0Y0RheXMgPSB1dGNEYXkucmFuZ2U7XG5cbiAgZnVuY3Rpb24gdXRjV2Vla2RheShpKSB7XG4gICAgcmV0dXJuIG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSAtIChkYXRlLmdldFVUQ0RheSgpICsgNyAtIGkpICUgNyk7XG4gICAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXAgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGR1cmF0aW9uV2VlaztcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB1dGNTdW5kYXkgPSB1dGNXZWVrZGF5KDApO1xuICB2YXIgdXRjTW9uZGF5ID0gdXRjV2Vla2RheSgxKTtcbiAgdmFyIHV0Y1R1ZXNkYXkgPSB1dGNXZWVrZGF5KDIpO1xuICB2YXIgdXRjV2VkbmVzZGF5ID0gdXRjV2Vla2RheSgzKTtcbiAgdmFyIHV0Y1RodXJzZGF5ID0gdXRjV2Vla2RheSg0KTtcbiAgdmFyIHV0Y0ZyaWRheSA9IHV0Y1dlZWtkYXkoNSk7XG4gIHZhciB1dGNTYXR1cmRheSA9IHV0Y1dlZWtkYXkoNik7XG5cbiAgdmFyIHV0Y1N1bmRheXMgPSB1dGNTdW5kYXkucmFuZ2U7XG4gIHZhciB1dGNNb25kYXlzID0gdXRjTW9uZGF5LnJhbmdlO1xuICB2YXIgdXRjVHVlc2RheXMgPSB1dGNUdWVzZGF5LnJhbmdlO1xuICB2YXIgdXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheS5yYW5nZTtcbiAgdmFyIHV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5LnJhbmdlO1xuICB2YXIgdXRjRnJpZGF5cyA9IHV0Y0ZyaWRheS5yYW5nZTtcbiAgdmFyIHV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5LnJhbmdlO1xuXG4gIHZhciB1dGNNb250aCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ0RhdGUoMSk7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDTW9udGgoZGF0ZS5nZXRVVENNb250aCgpICsgc3RlcCk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZW5kLmdldFVUQ01vbnRoKCkgLSBzdGFydC5nZXRVVENNb250aCgpICsgKGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKSkgKiAxMjtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01vbnRoKCk7XG4gIH0pO1xuXG4gIHZhciB1dGNNb250aHMgPSB1dGNNb250aC5yYW5nZTtcblxuICB2YXIgdXRjWWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlLnNldFVUQ01vbnRoKDAsIDEpO1xuICAgIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSArIHN0ZXApO1xuICB9LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gIH0pO1xuXG4gIC8vIEFuIG9wdGltaXplZCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhpcyBzaW1wbGUgY2FzZS5cbiAgdXRjWWVhci5ldmVyeSA9IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gIWlzRmluaXRlKGsgPSBNYXRoLmZsb29yKGspKSB8fCAhKGsgPiAwKSA/IG51bGwgOiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKE1hdGguZmxvb3IoZGF0ZS5nZXRVVENGdWxsWWVhcigpIC8gaykgKiBrKTtcbiAgICAgIGRhdGUuc2V0VVRDTW9udGgoMCwgMSk7XG4gICAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpICsgc3RlcCAqIGspO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciB1dGNZZWFycyA9IHV0Y1llYXIucmFuZ2U7XG5cbiAgZXhwb3J0cy50aW1lSW50ZXJ2YWwgPSBuZXdJbnRlcnZhbDtcbiAgZXhwb3J0cy50aW1lTWlsbGlzZWNvbmQgPSBtaWxsaXNlY29uZDtcbiAgZXhwb3J0cy50aW1lTWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICBleHBvcnRzLnV0Y01pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG4gIGV4cG9ydHMudXRjTWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICBleHBvcnRzLnRpbWVTZWNvbmQgPSBzZWNvbmQ7XG4gIGV4cG9ydHMudGltZVNlY29uZHMgPSBzZWNvbmRzO1xuICBleHBvcnRzLnV0Y1NlY29uZCA9IHNlY29uZDtcbiAgZXhwb3J0cy51dGNTZWNvbmRzID0gc2Vjb25kcztcbiAgZXhwb3J0cy50aW1lTWludXRlID0gbWludXRlO1xuICBleHBvcnRzLnRpbWVNaW51dGVzID0gbWludXRlcztcbiAgZXhwb3J0cy50aW1lSG91ciA9IGhvdXI7XG4gIGV4cG9ydHMudGltZUhvdXJzID0gaG91cnM7XG4gIGV4cG9ydHMudGltZURheSA9IGRheTtcbiAgZXhwb3J0cy50aW1lRGF5cyA9IGRheXM7XG4gIGV4cG9ydHMudGltZVdlZWsgPSBzdW5kYXk7XG4gIGV4cG9ydHMudGltZVdlZWtzID0gc3VuZGF5cztcbiAgZXhwb3J0cy50aW1lU3VuZGF5ID0gc3VuZGF5O1xuICBleHBvcnRzLnRpbWVTdW5kYXlzID0gc3VuZGF5cztcbiAgZXhwb3J0cy50aW1lTW9uZGF5ID0gbW9uZGF5O1xuICBleHBvcnRzLnRpbWVNb25kYXlzID0gbW9uZGF5cztcbiAgZXhwb3J0cy50aW1lVHVlc2RheSA9IHR1ZXNkYXk7XG4gIGV4cG9ydHMudGltZVR1ZXNkYXlzID0gdHVlc2RheXM7XG4gIGV4cG9ydHMudGltZVdlZG5lc2RheSA9IHdlZG5lc2RheTtcbiAgZXhwb3J0cy50aW1lV2VkbmVzZGF5cyA9IHdlZG5lc2RheXM7XG4gIGV4cG9ydHMudGltZVRodXJzZGF5ID0gdGh1cnNkYXk7XG4gIGV4cG9ydHMudGltZVRodXJzZGF5cyA9IHRodXJzZGF5cztcbiAgZXhwb3J0cy50aW1lRnJpZGF5ID0gZnJpZGF5O1xuICBleHBvcnRzLnRpbWVGcmlkYXlzID0gZnJpZGF5cztcbiAgZXhwb3J0cy50aW1lU2F0dXJkYXkgPSBzYXR1cmRheTtcbiAgZXhwb3J0cy50aW1lU2F0dXJkYXlzID0gc2F0dXJkYXlzO1xuICBleHBvcnRzLnRpbWVNb250aCA9IG1vbnRoO1xuICBleHBvcnRzLnRpbWVNb250aHMgPSBtb250aHM7XG4gIGV4cG9ydHMudGltZVllYXIgPSB5ZWFyO1xuICBleHBvcnRzLnRpbWVZZWFycyA9IHllYXJzO1xuICBleHBvcnRzLnV0Y01pbnV0ZSA9IHV0Y01pbnV0ZTtcbiAgZXhwb3J0cy51dGNNaW51dGVzID0gdXRjTWludXRlcztcbiAgZXhwb3J0cy51dGNIb3VyID0gdXRjSG91cjtcbiAgZXhwb3J0cy51dGNIb3VycyA9IHV0Y0hvdXJzO1xuICBleHBvcnRzLnV0Y0RheSA9IHV0Y0RheTtcbiAgZXhwb3J0cy51dGNEYXlzID0gdXRjRGF5cztcbiAgZXhwb3J0cy51dGNXZWVrID0gdXRjU3VuZGF5O1xuICBleHBvcnRzLnV0Y1dlZWtzID0gdXRjU3VuZGF5cztcbiAgZXhwb3J0cy51dGNTdW5kYXkgPSB1dGNTdW5kYXk7XG4gIGV4cG9ydHMudXRjU3VuZGF5cyA9IHV0Y1N1bmRheXM7XG4gIGV4cG9ydHMudXRjTW9uZGF5ID0gdXRjTW9uZGF5O1xuICBleHBvcnRzLnV0Y01vbmRheXMgPSB1dGNNb25kYXlzO1xuICBleHBvcnRzLnV0Y1R1ZXNkYXkgPSB1dGNUdWVzZGF5O1xuICBleHBvcnRzLnV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheXM7XG4gIGV4cG9ydHMudXRjV2VkbmVzZGF5ID0gdXRjV2VkbmVzZGF5O1xuICBleHBvcnRzLnV0Y1dlZG5lc2RheXMgPSB1dGNXZWRuZXNkYXlzO1xuICBleHBvcnRzLnV0Y1RodXJzZGF5ID0gdXRjVGh1cnNkYXk7XG4gIGV4cG9ydHMudXRjVGh1cnNkYXlzID0gdXRjVGh1cnNkYXlzO1xuICBleHBvcnRzLnV0Y0ZyaWRheSA9IHV0Y0ZyaWRheTtcbiAgZXhwb3J0cy51dGNGcmlkYXlzID0gdXRjRnJpZGF5cztcbiAgZXhwb3J0cy51dGNTYXR1cmRheSA9IHV0Y1NhdHVyZGF5O1xuICBleHBvcnRzLnV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5cztcbiAgZXhwb3J0cy51dGNNb250aCA9IHV0Y01vbnRoO1xuICBleHBvcnRzLnV0Y01vbnRocyA9IHV0Y01vbnRocztcbiAgZXhwb3J0cy51dGNZZWFyID0gdXRjWWVhcjtcbiAgZXhwb3J0cy51dGNZZWFycyA9IHV0Y1llYXJzO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKTsiLCJpbXBvcnQgaGVscGVyIGZyb20gJy4vbGVnZW5kJztcbmltcG9ydCB7IGRpc3BhdGNoIH0gZnJvbSAnZDMtZGlzcGF0Y2gnO1xuaW1wb3J0IHsgc2NhbGVMaW5lYXIgfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkMy1mb3JtYXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvcigpe1xuXG4gIHZhciBzY2FsZSA9IHNjYWxlTGluZWFyKCksXG4gICAgc2hhcGUgPSBcInJlY3RcIixcbiAgICBzaGFwZVdpZHRoID0gMTUsXG4gICAgc2hhcGVIZWlnaHQgPSAxNSxcbiAgICBzaGFwZVJhZGl1cyA9IDEwLFxuICAgIHNoYXBlUGFkZGluZyA9IDIsXG4gICAgY2VsbHMgPSBbNV0sXG4gICAgbGFiZWxzID0gW10sXG4gICAgY2xhc3NQcmVmaXggPSBcIlwiLFxuICAgIHVzZUNsYXNzID0gZmFsc2UsXG4gICAgdGl0bGUgPSBcIlwiLFxuICAgIGxhYmVsRm9ybWF0ID0gZm9ybWF0KFwiLjAxZlwiKSxcbiAgICBsYWJlbE9mZnNldCA9IDEwLFxuICAgIGxhYmVsQWxpZ24gPSBcIm1pZGRsZVwiLFxuICAgIGxhYmVsRGVsaW1pdGVyID0gXCJ0b1wiLFxuICAgIG9yaWVudCA9IFwidmVydGljYWxcIixcbiAgICBhc2NlbmRpbmcgPSBmYWxzZSxcbiAgICBwYXRoLFxuICAgIGxlZ2VuZERpc3BhdGNoZXIgPSBkaXNwYXRjaChcImNlbGxvdmVyXCIsIFwiY2VsbG91dFwiLCBcImNlbGxjbGlja1wiKTtcblxuICAgIGZ1bmN0aW9uIGxlZ2VuZChzdmcpe1xuXG4gICAgICB2YXIgdHlwZSA9IGhlbHBlci5kM19jYWxjVHlwZShzY2FsZSwgYXNjZW5kaW5nLCBjZWxscywgbGFiZWxzLCBsYWJlbEZvcm1hdCwgbGFiZWxEZWxpbWl0ZXIpLFxuICAgICAgICBsZWdlbmRHID0gc3ZnLnNlbGVjdEFsbCgnZycpLmRhdGEoW3NjYWxlXSk7XG5cbiAgICAgIGxlZ2VuZEcuZW50ZXIoKS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsIGNsYXNzUHJlZml4ICsgJ2xlZ2VuZENlbGxzJyk7XG5cbiAgICAgIHZhciBjZWxsID0gc3ZnLnNlbGVjdCgnLicgKyBjbGFzc1ByZWZpeCArICdsZWdlbmRDZWxscycpXG4gICAgICAgICAgLnNlbGVjdEFsbChcIi5cIiArIGNsYXNzUHJlZml4ICsgXCJjZWxsXCIpLmRhdGEodHlwZS5kYXRhKSxcbiAgICAgICAgY2VsbEVudGVyID0gY2VsbC5lbnRlcigpLmFwcGVuZChcImdcIilcbiAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIGNsYXNzUHJlZml4ICsgXCJjZWxsXCIpLC8vLm1lcmdlKGNlbGwpLnN0eWxlKFwib3BhY2l0eVwiLCAxZS02KSxcbiAgICAgICAgc2hhcGVFbnRlciA9IGNlbGxFbnRlci5hcHBlbmQoc2hhcGUpLmF0dHIoXCJjbGFzc1wiLCBjbGFzc1ByZWZpeCArIFwic3dhdGNoXCIpLFxuICAgICAgICBzaGFwZXMgPSBzdmcuc2VsZWN0QWxsKFwiZy5cIiArIGNsYXNzUHJlZml4ICsgXCJjZWxsIFwiICsgc2hhcGUpO1xuXG4gICAgICAvL2FkZCBldmVudCBoYW5kbGVyc1xuICAgICAgaGVscGVyLmQzX2FkZEV2ZW50cyhjZWxsRW50ZXIsIGxlZ2VuZERpc3BhdGNoZXIpO1xuXG4gICAgICBjZWxsLmV4aXQoKS50cmFuc2l0aW9uKCkuc3R5bGUoXCJvcGFjaXR5XCIsIDApLnJlbW92ZSgpO1xuXG4gICAgICBoZWxwZXIuZDNfZHJhd1NoYXBlcyhzaGFwZSwgc2hhcGVzLCBzaGFwZUhlaWdodCwgc2hhcGVXaWR0aCwgc2hhcGVSYWRpdXMsIHBhdGgpO1xuXG5cbiAgICAgIGhlbHBlci5kM19hZGRUZXh0KCBzdmcsIGNlbGxFbnRlciwgdHlwZS5sYWJlbHMsIGNsYXNzUHJlZml4KVxuICAgICAgXG4gICAgICAvLyB3ZSBuZWVkIHRvIG1lcmdlIHRoZSBzZWxlY3Rpb24sIG90aGVyd2lzZSBjaGFuZ2VzIGluIHRoZSBsZWdlbmQgKGUuZy4gY2hhbmdlIG9mIG9yaWVudGF0aW9uKSBhcmUgYXBwbGllZCBvbmx5IHRvIHRoZSBuZXcgY2VsbHMgYW5kIG5vdCB0aGUgZXhpc3Rpbmcgb25lcy5cbiAgICAgIGNlbGwgPSBjZWxsRW50ZXIubWVyZ2UoY2VsbCk7XG5cbiAgICAgIC8vIHNldHMgcGxhY2VtZW50XG4gICAgICB2YXIgdGV4dCA9IGNlbGwuc2VsZWN0QWxsKFwidGV4dFwiKSxcbiAgICAgICAgc2hhcGVTaXplID0gc2hhcGVzLm5vZGVzKCkubWFwKCBmdW5jdGlvbihkKXsgcmV0dXJuIGQuZ2V0QkJveCgpOyB9KTtcblxuICAgICAgLy9zZXRzIHNjYWxlXG4gICAgICAvL2V2ZXJ5dGhpbmcgaXMgZmlsbCBleGNlcHQgZm9yIGxpbmUgd2hpY2ggaXMgc3Ryb2tlLFxuICAgICAgaWYgKCF1c2VDbGFzcyl7XG4gICAgICAgIGlmIChzaGFwZSA9PSBcImxpbmVcIil7XG4gICAgICAgICAgc2hhcGVzLnN0eWxlKFwic3Ryb2tlXCIsIHR5cGUuZmVhdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2hhcGVzLnN0eWxlKFwiZmlsbFwiLCB0eXBlLmZlYXR1cmUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGFwZXMuYXR0cihcImNsYXNzXCIsIGZ1bmN0aW9uKGQpeyByZXR1cm4gY2xhc3NQcmVmaXggKyBcInN3YXRjaCBcIiArIHR5cGUuZmVhdHVyZShkKTsgfSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjZWxsVHJhbnMsXG4gICAgICB0ZXh0VHJhbnMsXG4gICAgICB0ZXh0QWxpZ24gPSAobGFiZWxBbGlnbiA9PSBcInN0YXJ0XCIpID8gMCA6IChsYWJlbEFsaWduID09IFwibWlkZGxlXCIpID8gMC41IDogMTtcblxuICAgICAgLy9wb3NpdGlvbnMgY2VsbHMgYW5kIHRleHRcbiAgICAgIGlmIChvcmllbnQgPT09IFwidmVydGljYWxcIil7XG4gICAgICAgIGNlbGxUcmFucyA9IGZ1bmN0aW9uKGQsaSkgeyByZXR1cm4gXCJ0cmFuc2xhdGUoMCwgXCIgKyAoaSAqIChzaGFwZVNpemVbaV0uaGVpZ2h0ICsgc2hhcGVQYWRkaW5nKSkgKyBcIilcIjsgfTtcbiAgICAgICAgdGV4dFRyYW5zID0gZnVuY3Rpb24oZCxpKSB7IHJldHVybiBcInRyYW5zbGF0ZShcIiArIChzaGFwZVNpemVbaV0ud2lkdGggKyBzaGFwZVNpemVbaV0ueCArXG4gICAgICAgICAgbGFiZWxPZmZzZXQpICsgXCIsXCIgKyAoc2hhcGVTaXplW2ldLnkgKyBzaGFwZVNpemVbaV0uaGVpZ2h0LzIgKyA1KSArIFwiKVwiOyB9O1xuXG4gICAgICB9IGVsc2UgaWYgKG9yaWVudCA9PT0gXCJob3Jpem9udGFsXCIpe1xuICAgICAgICBjZWxsVHJhbnMgPSBmdW5jdGlvbihkLGkpIHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgKGkgKiAoc2hhcGVTaXplW2ldLndpZHRoICsgc2hhcGVQYWRkaW5nKSkgKyBcIiwwKVwiOyB9XG4gICAgICAgIHRleHRUcmFucyA9IGZ1bmN0aW9uKGQsaSkgeyByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyAoc2hhcGVTaXplW2ldLndpZHRoKnRleHRBbGlnbiAgKyBzaGFwZVNpemVbaV0ueCkgK1xuICAgICAgICAgIFwiLFwiICsgKHNoYXBlU2l6ZVtpXS5oZWlnaHQgKyBzaGFwZVNpemVbaV0ueSArIGxhYmVsT2Zmc2V0ICsgOCkgKyBcIilcIjsgfTtcbiAgICAgIH1cblxuICAgICAgaGVscGVyLmQzX3BsYWNlbWVudChvcmllbnQsIGNlbGwsIGNlbGxUcmFucywgdGV4dCwgdGV4dFRyYW5zLCBsYWJlbEFsaWduKTtcbiAgICAgIGhlbHBlci5kM190aXRsZShzdmcsIHRpdGxlLCBjbGFzc1ByZWZpeCk7XG5cbiAgICAgIGNlbGwudHJhbnNpdGlvbigpLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcblxuICAgIH1cblxuXG5cbiAgbGVnZW5kLnNjYWxlID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNjYWxlO1xuICAgIHNjYWxlID0gXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5jZWxscyA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjZWxscztcbiAgICBpZiAoXy5sZW5ndGggPiAxIHx8IF8gPj0gMiApe1xuICAgICAgY2VsbHMgPSBfO1xuICAgIH1cbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5zaGFwZSA9IGZ1bmN0aW9uKF8sIGQpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzaGFwZTtcbiAgICBpZiAoXyA9PSBcInJlY3RcIiB8fCBfID09IFwiY2lyY2xlXCIgfHwgXyA9PSBcImxpbmVcIiB8fCAoXyA9PSBcInBhdGhcIiAmJiAodHlwZW9mIGQgPT09ICdzdHJpbmcnKSkgKXtcbiAgICAgIHNoYXBlID0gXztcbiAgICAgIHBhdGggPSBkO1xuICAgIH1cbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5zaGFwZVdpZHRoID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNoYXBlV2lkdGg7XG4gICAgc2hhcGVXaWR0aCA9ICtfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLnNoYXBlSGVpZ2h0ID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNoYXBlSGVpZ2h0O1xuICAgIHNoYXBlSGVpZ2h0ID0gK187XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQuc2hhcGVSYWRpdXMgPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2hhcGVSYWRpdXM7XG4gICAgc2hhcGVSYWRpdXMgPSArXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5zaGFwZVBhZGRpbmcgPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2hhcGVQYWRkaW5nO1xuICAgIHNoYXBlUGFkZGluZyA9ICtfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmxhYmVscyA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsYWJlbHM7XG4gICAgbGFiZWxzID0gXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5sYWJlbEFsaWduID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxhYmVsQWxpZ247XG4gICAgaWYgKF8gPT0gXCJzdGFydFwiIHx8IF8gPT0gXCJlbmRcIiB8fCBfID09IFwibWlkZGxlXCIpIHtcbiAgICAgIGxhYmVsQWxpZ24gPSBfO1xuICAgIH1cbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5sYWJlbEZvcm1hdCA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsYWJlbEZvcm1hdDtcbiAgICBsYWJlbEZvcm1hdCA9IHR5cGVvZihfKSA9PT0gJ3N0cmluZycgPyBmb3JtYXQoXykgOiBfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmxhYmVsT2Zmc2V0ID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxhYmVsT2Zmc2V0O1xuICAgIGxhYmVsT2Zmc2V0ID0gK187XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQubGFiZWxEZWxpbWl0ZXIgPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbGFiZWxEZWxpbWl0ZXI7XG4gICAgbGFiZWxEZWxpbWl0ZXIgPSBfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLnVzZUNsYXNzID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHVzZUNsYXNzO1xuICAgIGlmIChfID09PSB0cnVlIHx8IF8gPT09IGZhbHNlKXtcbiAgICAgIHVzZUNsYXNzID0gXztcbiAgICB9XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQub3JpZW50ID0gZnVuY3Rpb24oXyl7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3JpZW50O1xuICAgIF8gPSBfLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKF8gPT0gXCJob3Jpem9udGFsXCIgfHwgXyA9PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIG9yaWVudCA9IF87XG4gICAgfVxuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmFzY2VuZGluZyA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBhc2NlbmRpbmc7XG4gICAgYXNjZW5kaW5nID0gISFfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmNsYXNzUHJlZml4ID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNsYXNzUHJlZml4O1xuICAgIGNsYXNzUHJlZml4ID0gXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC50aXRsZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aXRsZTtcbiAgICB0aXRsZSA9IF87XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQub24gPSBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IGxlZ2VuZERpc3BhdGNoZXIub24uYXBwbHkobGVnZW5kRGlzcGF0Y2hlciwgYXJndW1lbnRzKVxuICAgIHJldHVybiB2YWx1ZSA9PT0gbGVnZW5kRGlzcGF0Y2hlciA/IGxlZ2VuZCA6IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGxlZ2VuZDtcblxufTtcbiIsImV4cG9ydCBjb25zdCB0aHJlc2hvbGRMYWJlbHMgPSBmdW5jdGlvbih7IGksIGdlbkxlbmd0aCwgZ2VuZXJhdGVkTGFiZWxzIH0pe1xuXG4gIGlmIChpID09PSAwICl7XG4gICAgcmV0dXJuIGdlbmVyYXRlZExhYmVsc1tpXS5yZXBsYWNlKCdOYU4gdG8nLCAnTGVzcyB0aGFuJylcbiAgfSBlbHNlIGlmIChpID09PSBnZW5MZW5ndGggLSAxKSB7XG4gICAgcmV0dXJuIGBNb3JlIHRoYW4gJHtnZW5lcmF0ZWRMYWJlbHNbZ2VuTGVuZ3RoIC0gMV0ucmVwbGFjZSgnIHRvIE5hTicsICcnKX1gXG4gIH1cbiAgcmV0dXJuIGdlbmVyYXRlZExhYmVsc1tpXVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRocmVzaG9sZExhYmVsc1xufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuXG4gIGQzX2lkZW50aXR5OiBmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBkO1xuICB9LFxuXG4gIGQzX21lcmdlTGFiZWxzOiBmdW5jdGlvbiAoZ2VuPVtdLCBsYWJlbHMsIGRvbWFpbiwgcmFuZ2UpIHtcblxuICAgICAgaWYgKHR5cGVvZiBsYWJlbHMgPT09IFwib2JqZWN0XCIpe1xuICAgICAgICBpZihsYWJlbHMubGVuZ3RoID09PSAwKSByZXR1cm4gZ2VuO1xuXG4gICAgICAgIGxldCBpID0gbGFiZWxzLmxlbmd0aDtcbiAgICAgICAgZm9yICg7IGkgPCBnZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsYWJlbHMucHVzaChnZW5baV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYWJlbHM7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsYWJlbHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb25zdCBjdXN0b21MYWJlbHMgPSBbXVxuICAgICAgICBjb25zdCBnZW5MZW5ndGggPSBnZW4ubGVuZ3RoXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGdlbkxlbmd0aDsgaSsrKXtcbiAgICAgICAgICBjdXN0b21MYWJlbHMucHVzaChsYWJlbHMoe1xuICAgICAgICAgICAgaSwgXG4gICAgICAgICAgICBnZW5MZW5ndGgsXG4gICAgICAgICAgICBnZW5lcmF0ZWRMYWJlbHMgOiBnZW4sXG4gICAgICAgICAgICBkb21haW4sXG4gICAgICAgICAgICByYW5nZSB9KSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VzdG9tTGFiZWxzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZW47XG4gICAgfSxcblxuICBkM19saW5lYXJMZWdlbmQ6IGZ1bmN0aW9uIChzY2FsZSwgY2VsbHMsIGxhYmVsRm9ybWF0KSB7XG4gICAgdmFyIGRhdGEgPSBbXTtcblxuICAgIGlmIChjZWxscy5sZW5ndGggPiAxKXtcbiAgICAgIGRhdGEgPSBjZWxscztcblxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZG9tYWluID0gc2NhbGUuZG9tYWluKCksXG4gICAgICBpbmNyZW1lbnQgPSAoZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXSAtIGRvbWFpblswXSkvKGNlbGxzIC0gMSksXG4gICAgICBpID0gMDtcblxuICAgICAgZm9yICg7IGkgPCBjZWxsczsgaSsrKXtcbiAgICAgICAgZGF0YS5wdXNoKGRvbWFpblswXSArIGkqaW5jcmVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFiZWxzID0gZGF0YS5tYXAobGFiZWxGb3JtYXQpO1xuXG4gICAgcmV0dXJuIHtkYXRhOiBkYXRhLFxuICAgICAgICAgICAgbGFiZWxzOiBsYWJlbHMsXG4gICAgICAgICAgICBmZWF0dXJlOiBmdW5jdGlvbihkKXsgcmV0dXJuIHNjYWxlKGQpOyB9fTtcbiAgfSxcblxuICBkM19xdWFudExlZ2VuZDogZnVuY3Rpb24gKHNjYWxlLCBsYWJlbEZvcm1hdCwgbGFiZWxEZWxpbWl0ZXIpIHtcbiAgICB2YXIgbGFiZWxzID0gc2NhbGUucmFuZ2UoKS5tYXAoZnVuY3Rpb24oZCl7XG4gICAgICB2YXIgaW52ZXJ0ID0gc2NhbGUuaW52ZXJ0RXh0ZW50KGQpO1xuXG4gICAgICByZXR1cm4gbGFiZWxGb3JtYXQoaW52ZXJ0WzBdKSArIFwiIFwiICsgbGFiZWxEZWxpbWl0ZXIgKyBcIiBcIiArIGxhYmVsRm9ybWF0KGludmVydFsxXSk7XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB7ZGF0YTogc2NhbGUucmFuZ2UoKSxcbiAgICAgICAgICAgIGxhYmVsczogbGFiZWxzLFxuICAgICAgICAgICAgZmVhdHVyZTogdGhpcy5kM19pZGVudGl0eVxuICAgICAgICAgIH07XG4gIH0sXG5cbiAgZDNfb3JkaW5hbExlZ2VuZDogZnVuY3Rpb24gKHNjYWxlKSB7XG4gICAgcmV0dXJuIHtkYXRhOiBzY2FsZS5kb21haW4oKSxcbiAgICAgICAgICAgIGxhYmVsczogc2NhbGUuZG9tYWluKCksXG4gICAgICAgICAgICBmZWF0dXJlOiBmdW5jdGlvbihkKXsgcmV0dXJuIHNjYWxlKGQpOyB9fTtcbiAgfSxcblxuICBkM19kcmF3U2hhcGVzOiBmdW5jdGlvbiAoc2hhcGUsIHNoYXBlcywgc2hhcGVIZWlnaHQsIHNoYXBlV2lkdGgsIHNoYXBlUmFkaXVzLCBwYXRoKSB7XG4gICAgaWYgKHNoYXBlID09PSBcInJlY3RcIil7XG4gICAgICAgIHNoYXBlcy5hdHRyKFwiaGVpZ2h0XCIsIHNoYXBlSGVpZ2h0KS5hdHRyKFwid2lkdGhcIiwgc2hhcGVXaWR0aCk7XG5cbiAgICB9IGVsc2UgaWYgKHNoYXBlID09PSBcImNpcmNsZVwiKSB7XG4gICAgICAgIHNoYXBlcy5hdHRyKFwiclwiLCBzaGFwZVJhZGl1cykvLy5hdHRyKFwiY3hcIiwgc2hhcGVSYWRpdXMpLmF0dHIoXCJjeVwiLCBzaGFwZVJhZGl1cyk7XG5cbiAgICB9IGVsc2UgaWYgKHNoYXBlID09PSBcImxpbmVcIikge1xuICAgICAgICBzaGFwZXMuYXR0cihcIngxXCIsIDApLmF0dHIoXCJ4MlwiLCBzaGFwZVdpZHRoKS5hdHRyKFwieTFcIiwgMCkuYXR0cihcInkyXCIsIDApO1xuXG4gICAgfSBlbHNlIGlmIChzaGFwZSA9PT0gXCJwYXRoXCIpIHtcbiAgICAgIHNoYXBlcy5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICB9XG4gIH0sXG5cbiAgZDNfYWRkVGV4dDogZnVuY3Rpb24gKHN2ZywgZW50ZXIsIGxhYmVscywgY2xhc3NQcmVmaXgpe1xuICAgIGVudGVyLmFwcGVuZChcInRleHRcIikuYXR0cihcImNsYXNzXCIsIGNsYXNzUHJlZml4ICsgXCJsYWJlbFwiKTtcbiAgICBzdmcuc2VsZWN0QWxsKFwiZy5cIiArIGNsYXNzUHJlZml4ICsgXCJjZWxsIHRleHRcIikuZGF0YShsYWJlbHMpLnRleHQodGhpcy5kM19pZGVudGl0eSk7XG4gIH0sXG5cbiAgZDNfY2FsY1R5cGU6IGZ1bmN0aW9uIChzY2FsZSwgYXNjZW5kaW5nLCBjZWxscywgbGFiZWxzLCBsYWJlbEZvcm1hdCwgbGFiZWxEZWxpbWl0ZXIpe1xuICAgIHZhciB0eXBlID0gc2NhbGUuaW52ZXJ0RXh0ZW50ID9cbiAgICAgICAgICAgIHRoaXMuZDNfcXVhbnRMZWdlbmQoc2NhbGUsIGxhYmVsRm9ybWF0LCBsYWJlbERlbGltaXRlcikgOiBzY2FsZS50aWNrcyA/XG4gICAgICAgICAgICB0aGlzLmQzX2xpbmVhckxlZ2VuZChzY2FsZSwgY2VsbHMsIGxhYmVsRm9ybWF0KSA6IHRoaXMuZDNfb3JkaW5hbExlZ2VuZChzY2FsZSk7XG5cbiAgICB0eXBlLmxhYmVscyA9IHRoaXMuZDNfbWVyZ2VMYWJlbHModHlwZS5sYWJlbHMsIGxhYmVscywgc2NhbGUuZG9tYWluKCksIHNjYWxlLnJhbmdlKCkpO1xuXG4gICAgaWYgKGFzY2VuZGluZykge1xuICAgICAgdHlwZS5sYWJlbHMgPSB0aGlzLmQzX3JldmVyc2UodHlwZS5sYWJlbHMpO1xuICAgICAgdHlwZS5kYXRhID0gdGhpcy5kM19yZXZlcnNlKHR5cGUuZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH0sXG5cbiAgZDNfcmV2ZXJzZTogZnVuY3Rpb24oYXJyKSB7XG4gICAgdmFyIG1pcnJvciA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbWlycm9yW2ldID0gYXJyW2wtaS0xXTtcbiAgICB9XG4gICAgcmV0dXJuIG1pcnJvcjtcbiAgfSxcblxuICBkM19wbGFjZW1lbnQ6IGZ1bmN0aW9uIChvcmllbnQsIGNlbGwsIGNlbGxUcmFucywgdGV4dCwgdGV4dFRyYW5zLCBsYWJlbEFsaWduKSB7XG4gICAgY2VsbC5hdHRyKFwidHJhbnNmb3JtXCIsIGNlbGxUcmFucyk7XG4gICAgdGV4dC5hdHRyKFwidHJhbnNmb3JtXCIsIHRleHRUcmFucyk7XG4gICAgaWYgKG9yaWVudCA9PT0gXCJob3Jpem9udGFsXCIpe1xuICAgICAgdGV4dC5zdHlsZShcInRleHQtYW5jaG9yXCIsIGxhYmVsQWxpZ24pO1xuICAgIH1cbiAgfSxcblxuICBkM19hZGRFdmVudHM6IGZ1bmN0aW9uKGNlbGxzLCBkaXNwYXRjaGVyKXtcbiAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgIGNlbGxzLm9uKFwibW91c2VvdmVyLmxlZ2VuZFwiLCBmdW5jdGlvbiAoZCkgeyBfLmQzX2NlbGxPdmVyKGRpc3BhdGNoZXIsIGQsIHRoaXMpOyB9KVxuICAgICAgICAgIC5vbihcIm1vdXNlb3V0LmxlZ2VuZFwiLCBmdW5jdGlvbiAoZCkgeyBfLmQzX2NlbGxPdXQoZGlzcGF0Y2hlciwgZCwgdGhpcyk7IH0pXG4gICAgICAgICAgLm9uKFwiY2xpY2subGVnZW5kXCIsIGZ1bmN0aW9uIChkKSB7IF8uZDNfY2VsbENsaWNrKGRpc3BhdGNoZXIsIGQsIHRoaXMpOyB9KTtcbiAgfSxcblxuICBkM19jZWxsT3ZlcjogZnVuY3Rpb24oY2VsbERpc3BhdGNoZXIsIGQsIG9iail7XG4gICAgY2VsbERpc3BhdGNoZXIuY2FsbChcImNlbGxvdmVyXCIsIG9iaiwgZCk7XG4gIH0sXG5cbiAgZDNfY2VsbE91dDogZnVuY3Rpb24oY2VsbERpc3BhdGNoZXIsIGQsIG9iail7XG4gICAgY2VsbERpc3BhdGNoZXIuY2FsbChcImNlbGxvdXRcIiwgb2JqLCBkKTtcbiAgfSxcblxuICBkM19jZWxsQ2xpY2s6IGZ1bmN0aW9uKGNlbGxEaXNwYXRjaGVyLCBkLCBvYmope1xuICAgIGNlbGxEaXNwYXRjaGVyLmNhbGwoXCJjZWxsY2xpY2tcIiwgb2JqLCBkKTtcbiAgfSxcblxuICBkM190aXRsZTogZnVuY3Rpb24oc3ZnLCB0aXRsZSwgY2xhc3NQcmVmaXgpe1xuICAgIGlmICh0aXRsZSAhPT0gXCJcIil7XG5cbiAgICAgIHZhciB0aXRsZVRleHQgPSBzdmcuc2VsZWN0QWxsKCd0ZXh0LicgKyBjbGFzc1ByZWZpeCArICdsZWdlbmRUaXRsZScpO1xuXG4gICAgICB0aXRsZVRleHQuZGF0YShbdGl0bGVdKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgY2xhc3NQcmVmaXggKyAnbGVnZW5kVGl0bGUnKTtcblxuICAgICAgICBzdmcuc2VsZWN0QWxsKCd0ZXh0LicgKyBjbGFzc1ByZWZpeCArICdsZWdlbmRUaXRsZScpXG4gICAgICAgICAgICAudGV4dCh0aXRsZSlcblxuICAgICAgdmFyIGNlbGxzU3ZnID0gc3ZnLnNlbGVjdCgnLicgKyBjbGFzc1ByZWZpeCArICdsZWdlbmRDZWxscycpXG5cbiAgICAgIHZhciB5T2Zmc2V0ID0gc3ZnLnNlbGVjdCgnLicgKyBjbGFzc1ByZWZpeCArICdsZWdlbmRUaXRsZScpLm5vZGVzKClcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuZ2V0QkJveCgpLmhlaWdodH0pWzBdLFxuICAgICAgeE9mZnNldCA9IC1jZWxsc1N2Zy5ub2RlcygpLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLmdldEJCb3goKS54fSlbMF07XG5cbiAgICAgIGNlbGxzU3ZnLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHhPZmZzZXQgKyAnLCcgKyAoeU9mZnNldCArIDEwKSArICcpJyk7XG5cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBoZWxwZXIgZnJvbSAnLi9sZWdlbmQnO1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICdkMy1kaXNwYXRjaCc7XG5pbXBvcnQgeyBzY2FsZUxpbmVhciB9IGZyb20gJ2QzLXNjYWxlJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2QzLWZvcm1hdCc7XG5pbXBvcnQgeyBzdW0sIG1heCB9IGZyb20gJ2QzLWFycmF5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2l6ZSgpe1xuXG4gIHZhciBzY2FsZSA9IHNjYWxlTGluZWFyKCksXG4gICAgc2hhcGUgPSBcInJlY3RcIixcbiAgICBzaGFwZVdpZHRoID0gMTUsXG4gICAgc2hhcGVQYWRkaW5nID0gMixcbiAgICBjZWxscyA9IFs1XSxcbiAgICBsYWJlbHMgPSBbXSxcbiAgICB1c2VTdHJva2UgPSBmYWxzZSxcbiAgICBjbGFzc1ByZWZpeCA9IFwiXCIsXG4gICAgdGl0bGUgPSBcIlwiLFxuICAgIGxhYmVsRm9ybWF0ID0gZm9ybWF0KFwiLjAxZlwiKSxcbiAgICBsYWJlbE9mZnNldCA9IDEwLFxuICAgIGxhYmVsQWxpZ24gPSBcIm1pZGRsZVwiLFxuICAgIGxhYmVsRGVsaW1pdGVyID0gXCJ0b1wiLFxuICAgIG9yaWVudCA9IFwidmVydGljYWxcIixcbiAgICBhc2NlbmRpbmcgPSBmYWxzZSxcbiAgICBwYXRoLFxuICAgIGxlZ2VuZERpc3BhdGNoZXIgPSBkaXNwYXRjaChcImNlbGxvdmVyXCIsIFwiY2VsbG91dFwiLCBcImNlbGxjbGlja1wiKTtcblxuICAgIGZ1bmN0aW9uIGxlZ2VuZChzdmcpe1xuXG4gICAgICB2YXIgdHlwZSA9IGhlbHBlci5kM19jYWxjVHlwZShzY2FsZSwgYXNjZW5kaW5nLCBjZWxscywgbGFiZWxzLCBsYWJlbEZvcm1hdCwgbGFiZWxEZWxpbWl0ZXIpLFxuICAgICAgICBsZWdlbmRHID0gc3ZnLnNlbGVjdEFsbCgnZycpLmRhdGEoW3NjYWxlXSk7XG5cbiAgICAgIGxlZ2VuZEcuZW50ZXIoKS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsIGNsYXNzUHJlZml4ICsgJ2xlZ2VuZENlbGxzJyk7XG5cbiAgICAgIHZhciBjZWxsID0gc3ZnLnNlbGVjdCgnLicgKyBjbGFzc1ByZWZpeCArICdsZWdlbmRDZWxscycpXG4gICAgICAgICAgLnNlbGVjdEFsbChcIi5cIiArIGNsYXNzUHJlZml4ICsgXCJjZWxsXCIpLmRhdGEodHlwZS5kYXRhKSxcbiAgICAgICAgY2VsbEVudGVyID0gY2VsbC5lbnRlcigpLmFwcGVuZChcImdcIilcbiAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIGNsYXNzUHJlZml4ICsgXCJjZWxsXCIpLC8vLm1lcmdlKGNlbGwpLnN0eWxlKFwib3BhY2l0eVwiLCAxZS02KSxcbiAgICAgICAgc2hhcGVFbnRlciA9IGNlbGxFbnRlci5hcHBlbmQoc2hhcGUpLmF0dHIoXCJjbGFzc1wiLCBjbGFzc1ByZWZpeCArIFwic3dhdGNoXCIpLFxuICAgICAgICBzaGFwZXMgPSBzdmcuc2VsZWN0QWxsKFwiZy5cIiArIGNsYXNzUHJlZml4ICsgXCJjZWxsIFwiICsgc2hhcGUpO1xuXG4gICAgICAvL2FkZCBldmVudCBoYW5kbGVyc1xuICAgICAgaGVscGVyLmQzX2FkZEV2ZW50cyhjZWxsRW50ZXIsIGxlZ2VuZERpc3BhdGNoZXIpO1xuXG4gICAgICBjZWxsLmV4aXQoKS50cmFuc2l0aW9uKCkuc3R5bGUoXCJvcGFjaXR5XCIsIDApLnJlbW92ZSgpO1xuXG4gICAgICAvL2NyZWF0ZXMgc2hhcGVcbiAgICAgIGlmIChzaGFwZSA9PT0gXCJsaW5lXCIpe1xuICAgICAgICBoZWxwZXIuZDNfZHJhd1NoYXBlcyhzaGFwZSwgc2hhcGVzLCAwLCBzaGFwZVdpZHRoKTtcbiAgICAgICAgc2hhcGVzLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgdHlwZS5mZWF0dXJlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlbHBlci5kM19kcmF3U2hhcGVzKHNoYXBlLCBzaGFwZXMsIHR5cGUuZmVhdHVyZSwgdHlwZS5mZWF0dXJlLCB0eXBlLmZlYXR1cmUsIHBhdGgpO1xuICAgICAgfVxuXG4gICAgICBoZWxwZXIuZDNfYWRkVGV4dCggc3ZnLCBjZWxsRW50ZXIsIHR5cGUubGFiZWxzLCBjbGFzc1ByZWZpeClcblxuICAgICAgLy8gd2UgbmVlZCB0byBtZXJnZSB0aGUgc2VsZWN0aW9uLCBvdGhlcndpc2UgY2hhbmdlcyBpbiB0aGUgbGVnZW5kIChlLmcuIGNoYW5nZSBvZiBvcmllbnRhdGlvbikgYXJlIGFwcGxpZWQgb25seSB0byB0aGUgbmV3IGNlbGxzIGFuZCBub3QgdGhlIGV4aXN0aW5nIG9uZXMuXG4gICAgICBjZWxsID0gY2VsbEVudGVyLm1lcmdlKGNlbGwpO1xuXG4gICAgICAvL3NldHMgcGxhY2VtZW50XG4gICAgICB2YXIgdGV4dCA9IGNlbGwuc2VsZWN0QWxsKFwidGV4dFwiKSxcbiAgICAgICAgc2hhcGVTaXplID0gc2hhcGVzLm5vZGVzKCkubWFwKFxuICAgICAgICAgIGZ1bmN0aW9uKGQsIGkpe1xuICAgICAgICAgICAgdmFyIGJib3ggPSBkLmdldEJCb3goKVxuICAgICAgICAgICAgdmFyIHN0cm9rZSA9IHNjYWxlKHR5cGUuZGF0YVtpXSk7XG5cbiAgICAgICAgICAgIGlmIChzaGFwZSA9PT0gXCJsaW5lXCIgJiYgb3JpZW50ID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgICBiYm94LmhlaWdodCA9IGJib3guaGVpZ2h0ICsgc3Ryb2tlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGFwZSA9PT0gXCJsaW5lXCIgJiYgb3JpZW50ID09PSBcInZlcnRpY2FsXCIpe1xuICAgICAgICAgICAgICBiYm94LndpZHRoID0gYmJveC53aWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJib3g7XG4gICAgICAgIH0pO1xuXG4gICAgICB2YXIgbWF4SCA9IG1heChzaGFwZVNpemUsIGZ1bmN0aW9uKGQpeyByZXR1cm4gZC5oZWlnaHQgKyBkLnk7IH0pLFxuICAgICAgbWF4VyA9IG1heChzaGFwZVNpemUsIGZ1bmN0aW9uKGQpeyByZXR1cm4gZC53aWR0aCArIGQueDsgfSk7XG5cbiAgICAgIHZhciBjZWxsVHJhbnMsXG4gICAgICB0ZXh0VHJhbnMsXG4gICAgICB0ZXh0QWxpZ24gPSAobGFiZWxBbGlnbiA9PSBcInN0YXJ0XCIpID8gMCA6IChsYWJlbEFsaWduID09IFwibWlkZGxlXCIpID8gMC41IDogMTtcblxuICAgICAgLy9wb3NpdGlvbnMgY2VsbHMgYW5kIHRleHRcbiAgICAgIGlmIChvcmllbnQgPT09IFwidmVydGljYWxcIil7XG5cbiAgICAgICAgY2VsbFRyYW5zID0gZnVuY3Rpb24oZCxpKSB7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gc3VtKHNoYXBlU2l6ZS5zbGljZSgwLCBpICsgMSApLCBmdW5jdGlvbihkKXsgcmV0dXJuIGQuaGVpZ2h0OyB9KTtcbiAgICAgICAgICAgIHJldHVybiBcInRyYW5zbGF0ZSgwLCBcIiArIChoZWlnaHQgKyBpKnNoYXBlUGFkZGluZykgKyBcIilcIjsgfTtcblxuICAgICAgICB0ZXh0VHJhbnMgPSBmdW5jdGlvbihkLGkpIHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgKG1heFcgKyBsYWJlbE9mZnNldCkgKyBcIixcIiArXG4gICAgICAgICAgKHNoYXBlU2l6ZVtpXS55ICsgc2hhcGVTaXplW2ldLmhlaWdodC8yICsgNSkgKyBcIilcIjsgfTtcblxuICAgICAgfSBlbHNlIGlmIChvcmllbnQgPT09IFwiaG9yaXpvbnRhbFwiKXtcbiAgICAgICAgY2VsbFRyYW5zID0gZnVuY3Rpb24oZCxpKSB7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSBzdW0oc2hhcGVTaXplLnNsaWNlKDAsIGkgKyAxICksIGZ1bmN0aW9uKGQpeyByZXR1cm4gZC53aWR0aDsgfSk7XG4gICAgICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyAod2lkdGggKyBpKnNoYXBlUGFkZGluZykgKyBcIiwwKVwiOyB9O1xuXG4gICAgICAgIHRleHRUcmFucyA9IGZ1bmN0aW9uKGQsaSkgeyByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyAoc2hhcGVTaXplW2ldLndpZHRoKnRleHRBbGlnbiAgKyBzaGFwZVNpemVbaV0ueCkgKyBcIixcIiArXG4gICAgICAgICAgICAgIChtYXhIICsgbGFiZWxPZmZzZXQgKSArIFwiKVwiOyB9O1xuICAgICAgfVxuXG4gICAgICBoZWxwZXIuZDNfcGxhY2VtZW50KG9yaWVudCwgY2VsbCwgY2VsbFRyYW5zLCB0ZXh0LCB0ZXh0VHJhbnMsIGxhYmVsQWxpZ24pO1xuICAgICAgaGVscGVyLmQzX3RpdGxlKHN2ZywgdGl0bGUsIGNsYXNzUHJlZml4KTtcblxuICAgICAgY2VsbC50cmFuc2l0aW9uKCkuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuXG4gICAgfVxuXG4gIGxlZ2VuZC5zY2FsZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzY2FsZTtcbiAgICBzY2FsZSA9IF87XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQuY2VsbHMgPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY2VsbHM7XG4gICAgaWYgKF8ubGVuZ3RoID4gMSB8fCBfID49IDIgKXtcbiAgICAgIGNlbGxzID0gXztcbiAgICB9XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuXG4gIGxlZ2VuZC5zaGFwZSA9IGZ1bmN0aW9uKF8sIGQpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzaGFwZTtcbiAgICBpZiAoXyA9PSBcInJlY3RcIiB8fCBfID09IFwiY2lyY2xlXCIgfHwgXyA9PSBcImxpbmVcIiApe1xuICAgICAgc2hhcGUgPSBfO1xuICAgICAgcGF0aCA9IGQ7XG4gICAgfVxuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLnNoYXBlV2lkdGggPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2hhcGVXaWR0aDtcbiAgICBzaGFwZVdpZHRoID0gK187XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQuc2hhcGVQYWRkaW5nID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNoYXBlUGFkZGluZztcbiAgICBzaGFwZVBhZGRpbmcgPSArXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5sYWJlbHMgPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbGFiZWxzO1xuICAgIGxhYmVscyA9IF87XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQubGFiZWxBbGlnbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsYWJlbEFsaWduO1xuICAgIGlmIChfID09IFwic3RhcnRcIiB8fCBfID09IFwiZW5kXCIgfHwgXyA9PSBcIm1pZGRsZVwiKSB7XG4gICAgICBsYWJlbEFsaWduID0gXztcbiAgICB9XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQubGFiZWxGb3JtYXQgPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbGFiZWxGb3JtYXQ7XG4gICAgbGFiZWxGb3JtYXQgPSB0eXBlb2YoXykgPT09ICdzdHJpbmcnID8gZm9ybWF0KF8pIDogXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5sYWJlbE9mZnNldCA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsYWJlbE9mZnNldDtcbiAgICBsYWJlbE9mZnNldCA9ICtfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmxhYmVsRGVsaW1pdGVyID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxhYmVsRGVsaW1pdGVyO1xuICAgIGxhYmVsRGVsaW1pdGVyID0gXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5vcmllbnQgPSBmdW5jdGlvbihfKXtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcmllbnQ7XG4gICAgXyA9IF8udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoXyA9PSBcImhvcml6b250YWxcIiB8fCBfID09IFwidmVydGljYWxcIikge1xuICAgICAgb3JpZW50ID0gXztcbiAgICB9XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQuYXNjZW5kaW5nID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGFzY2VuZGluZztcbiAgICBhc2NlbmRpbmcgPSAhIV87XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQuY2xhc3NQcmVmaXggPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY2xhc3NQcmVmaXg7XG4gICAgY2xhc3NQcmVmaXggPSBfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLnRpdGxlID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRpdGxlO1xuICAgIHRpdGxlID0gXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5vbiA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gbGVnZW5kRGlzcGF0Y2hlci5vbi5hcHBseShsZWdlbmREaXNwYXRjaGVyLCBhcmd1bWVudHMpXG4gICAgcmV0dXJuIHZhbHVlID09PSBsZWdlbmREaXNwYXRjaGVyID8gbGVnZW5kIDogdmFsdWU7XG4gIH1cblxuICByZXR1cm4gbGVnZW5kO1xuXG59O1xuIiwiaW1wb3J0IGhlbHBlciBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJ2QzLWRpc3BhdGNoJztcbmltcG9ydCB7IHNjYWxlTGluZWFyIH0gZnJvbSAnZDMtc2NhbGUnO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZDMtZm9ybWF0JztcbmltcG9ydCB7IG1heCB9IGZyb20gJ2QzLWFycmF5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sKCl7XG5cbiAgdmFyIHNjYWxlID0gc2NhbGVMaW5lYXIoKSxcbiAgICBzaGFwZSA9IFwicGF0aFwiLFxuICAgIHNoYXBlV2lkdGggPSAxNSxcbiAgICBzaGFwZUhlaWdodCA9IDE1LFxuICAgIHNoYXBlUmFkaXVzID0gMTAsXG4gICAgc2hhcGVQYWRkaW5nID0gNSxcbiAgICBjZWxscyA9IFs1XSxcbiAgICBsYWJlbHMgPSBbXSxcbiAgICBjbGFzc1ByZWZpeCA9IFwiXCIsXG4gICAgdXNlQ2xhc3MgPSBmYWxzZSxcbiAgICB0aXRsZSA9IFwiXCIsXG4gICAgbGFiZWxGb3JtYXQgPSBmb3JtYXQoXCIuMDFmXCIpLFxuICAgIGxhYmVsQWxpZ24gPSBcIm1pZGRsZVwiLFxuICAgIGxhYmVsT2Zmc2V0ID0gMTAsXG4gICAgbGFiZWxEZWxpbWl0ZXIgPSBcInRvXCIsXG4gICAgb3JpZW50ID0gXCJ2ZXJ0aWNhbFwiLFxuICAgIGFzY2VuZGluZyA9IGZhbHNlLFxuICAgIGxlZ2VuZERpc3BhdGNoZXIgPSBkaXNwYXRjaChcImNlbGxvdmVyXCIsIFwiY2VsbG91dFwiLCBcImNlbGxjbGlja1wiKTtcblxuICAgIGZ1bmN0aW9uIGxlZ2VuZChzdmcpe1xuXG4gICAgICB2YXIgdHlwZSA9IGhlbHBlci5kM19jYWxjVHlwZShzY2FsZSwgYXNjZW5kaW5nLCBjZWxscywgbGFiZWxzLCBsYWJlbEZvcm1hdCwgbGFiZWxEZWxpbWl0ZXIpLFxuICAgICAgICBsZWdlbmRHID0gc3ZnLnNlbGVjdEFsbCgnZycpLmRhdGEoW3NjYWxlXSk7XG5cbiAgICAgIGxlZ2VuZEcuZW50ZXIoKS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsIGNsYXNzUHJlZml4ICsgJ2xlZ2VuZENlbGxzJyk7XG5cbiAgICAgIHZhciBjZWxsID0gc3ZnLnNlbGVjdCgnLicgKyBjbGFzc1ByZWZpeCArICdsZWdlbmRDZWxscycpXG4gICAgICAgICAgLnNlbGVjdEFsbChcIi5cIiArIGNsYXNzUHJlZml4ICsgXCJjZWxsXCIpLmRhdGEodHlwZS5kYXRhKSxcbiAgICAgICAgY2VsbEVudGVyID0gY2VsbC5lbnRlcigpLmFwcGVuZChcImdcIilcbiAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIGNsYXNzUHJlZml4ICsgXCJjZWxsXCIpLC8vLnN0eWxlKFwib3BhY2l0eVwiLCAxZS02KSxcbiAgICAgICAgc2hhcGVFbnRlciA9IGNlbGxFbnRlci5hcHBlbmQoc2hhcGUpLmF0dHIoXCJjbGFzc1wiLCBjbGFzc1ByZWZpeCArIFwic3dhdGNoXCIpLFxuICAgICAgICBzaGFwZXMgPSBzdmcuc2VsZWN0QWxsKFwiZy5cIiArIGNsYXNzUHJlZml4ICsgXCJjZWxsIFwiICsgc2hhcGUpO1xuXG4gICAgICAvL2FkZCBldmVudCBoYW5kbGVyc1xuICAgICAgaGVscGVyLmQzX2FkZEV2ZW50cyhjZWxsRW50ZXIsIGxlZ2VuZERpc3BhdGNoZXIpO1xuXG4gICAgICAvL3JlbW92ZSBvbGQgc2hhcGVzXG4gICAgICBjZWxsLmV4aXQoKS50cmFuc2l0aW9uKCkuc3R5bGUoXCJvcGFjaXR5XCIsIDApLnJlbW92ZSgpO1xuXG4gICAgICBoZWxwZXIuZDNfZHJhd1NoYXBlcyhzaGFwZSwgc2hhcGVzLCBzaGFwZUhlaWdodCwgc2hhcGVXaWR0aCwgc2hhcGVSYWRpdXMsIHR5cGUuZmVhdHVyZSk7XG4gICAgICBoZWxwZXIuZDNfYWRkVGV4dCggc3ZnLCBjZWxsRW50ZXIsIHR5cGUubGFiZWxzLCBjbGFzc1ByZWZpeClcblxuICAgICAgLy8gd2UgbmVlZCB0byBtZXJnZSB0aGUgc2VsZWN0aW9uLCBvdGhlcndpc2UgY2hhbmdlcyBpbiB0aGUgbGVnZW5kIChlLmcuIGNoYW5nZSBvZiBvcmllbnRhdGlvbikgYXJlIGFwcGxpZWQgb25seSB0byB0aGUgbmV3IGNlbGxzIGFuZCBub3QgdGhlIGV4aXN0aW5nIG9uZXMuXG4gICAgICBjZWxsID0gY2VsbEVudGVyLm1lcmdlKGNlbGwpO1xuXG4gICAgICAvLyBzZXRzIHBsYWNlbWVudFxuICAgICAgdmFyIHRleHQgPSBjZWxsLnNlbGVjdEFsbChcInRleHRcIiksXG4gICAgICAgIHNoYXBlU2l6ZSA9IHNoYXBlcy5ub2RlcygpLm1hcCggZnVuY3Rpb24oZCl7IHJldHVybiBkLmdldEJCb3goKTsgfSk7XG5cbiAgICAgIHZhciBtYXhIID0gbWF4KHNoYXBlU2l6ZSwgZnVuY3Rpb24oZCl7IHJldHVybiBkLmhlaWdodDsgfSksXG4gICAgICBtYXhXID0gbWF4KHNoYXBlU2l6ZSwgZnVuY3Rpb24oZCl7IHJldHVybiBkLndpZHRoOyB9KTtcblxuICAgICAgdmFyIGNlbGxUcmFucyxcbiAgICAgIHRleHRUcmFucyxcbiAgICAgIHRleHRBbGlnbiA9IChsYWJlbEFsaWduID09IFwic3RhcnRcIikgPyAwIDogKGxhYmVsQWxpZ24gPT0gXCJtaWRkbGVcIikgPyAwLjUgOiAxO1xuXG4gICAgICAvL3Bvc2l0aW9ucyBjZWxscyBhbmQgdGV4dFxuICAgICAgaWYgKG9yaWVudCA9PT0gXCJ2ZXJ0aWNhbFwiKXtcbiAgICAgICAgY2VsbFRyYW5zID0gZnVuY3Rpb24oZCxpKSB7IHJldHVybiBcInRyYW5zbGF0ZSgwLCBcIiArIChpICogKG1heEggKyBzaGFwZVBhZGRpbmcpKSArIFwiKVwiOyB9O1xuICAgICAgICB0ZXh0VHJhbnMgPSBmdW5jdGlvbihkLGkpIHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgKG1heFcgKyBsYWJlbE9mZnNldCkgKyBcIixcIiArXG4gICAgICAgICAgICAgIChzaGFwZVNpemVbaV0ueSArIHNoYXBlU2l6ZVtpXS5oZWlnaHQvMiArIDUpICsgXCIpXCI7IH07XG5cbiAgICAgIH0gZWxzZSBpZiAob3JpZW50ID09PSBcImhvcml6b250YWxcIil7XG4gICAgICAgIGNlbGxUcmFucyA9IGZ1bmN0aW9uKGQsaSkgeyByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyAoaSAqIChtYXhXICsgc2hhcGVQYWRkaW5nKSkgKyBcIiwwKVwiOyB9O1xuICAgICAgICB0ZXh0VHJhbnMgPSBmdW5jdGlvbihkLGkpIHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgKHNoYXBlU2l6ZVtpXS53aWR0aCp0ZXh0QWxpZ24gICsgc2hhcGVTaXplW2ldLngpICsgXCIsXCIgK1xuICAgICAgICAgICAgICAobWF4SCArIGxhYmVsT2Zmc2V0ICkgKyBcIilcIjsgfTtcbiAgICAgIH1cblxuICAgICAgaGVscGVyLmQzX3BsYWNlbWVudChvcmllbnQsIGNlbGwsIGNlbGxUcmFucywgdGV4dCwgdGV4dFRyYW5zLCBsYWJlbEFsaWduKTtcbiAgICAgIGhlbHBlci5kM190aXRsZShzdmcsIHRpdGxlLCBjbGFzc1ByZWZpeCk7XG4gICAgICBjZWxsLnRyYW5zaXRpb24oKS5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG5cbiAgICB9XG5cblxuICBsZWdlbmQuc2NhbGUgPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2NhbGU7XG4gICAgc2NhbGUgPSBfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmNlbGxzID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNlbGxzO1xuICAgIGlmIChfLmxlbmd0aCA+IDEgfHwgXyA+PSAyICl7XG4gICAgICBjZWxscyA9IF87XG4gICAgfVxuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLnNoYXBlUGFkZGluZyA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzaGFwZVBhZGRpbmc7XG4gICAgc2hhcGVQYWRkaW5nID0gK187XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQubGFiZWxzID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxhYmVscztcbiAgICBsYWJlbHMgPSBfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmxhYmVsQWxpZ24gPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbGFiZWxBbGlnbjtcbiAgICBpZiAoXyA9PSBcInN0YXJ0XCIgfHwgXyA9PSBcImVuZFwiIHx8IF8gPT0gXCJtaWRkbGVcIikge1xuICAgICAgbGFiZWxBbGlnbiA9IF87XG4gICAgfVxuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmxhYmVsRm9ybWF0ID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxhYmVsRm9ybWF0O1xuICAgIGxhYmVsRm9ybWF0ID0gdHlwZW9mKF8pID09PSAnc3RyaW5nJyA/IGZvcm1hdChfKSA6IF87XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQubGFiZWxPZmZzZXQgPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbGFiZWxPZmZzZXQ7XG4gICAgbGFiZWxPZmZzZXQgPSArXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC5sYWJlbERlbGltaXRlciA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsYWJlbERlbGltaXRlcjtcbiAgICBsYWJlbERlbGltaXRlciA9IF87XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQub3JpZW50ID0gZnVuY3Rpb24oXyl7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3JpZW50O1xuICAgIF8gPSBfLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKF8gPT0gXCJob3Jpem9udGFsXCIgfHwgXyA9PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIG9yaWVudCA9IF87XG4gICAgfVxuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmFzY2VuZGluZyA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBhc2NlbmRpbmc7XG4gICAgYXNjZW5kaW5nID0gISFfO1xuICAgIHJldHVybiBsZWdlbmQ7XG4gIH07XG5cbiAgbGVnZW5kLmNsYXNzUHJlZml4ID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNsYXNzUHJlZml4O1xuICAgIGNsYXNzUHJlZml4ID0gXztcbiAgICByZXR1cm4gbGVnZW5kO1xuICB9O1xuXG4gIGxlZ2VuZC50aXRsZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aXRsZTtcbiAgICB0aXRsZSA9IF87XG4gICAgcmV0dXJuIGxlZ2VuZDtcbiAgfTtcblxuICBsZWdlbmQub24gPSBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IGxlZ2VuZERpc3BhdGNoZXIub24uYXBwbHkobGVnZW5kRGlzcGF0Y2hlciwgYXJndW1lbnRzKVxuICAgIHJldHVybiB2YWx1ZSA9PT0gbGVnZW5kRGlzcGF0Y2hlciA/IGxlZ2VuZCA6IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGxlZ2VuZDtcblxufTtcbiIsImltcG9ydCBjb2xvciBmcm9tICcuL2NvbG9yJ1xuaW1wb3J0IHNpemUgZnJvbSAnLi9zaXplJ1xuaW1wb3J0IHN5bWJvbCBmcm9tICcuL3N5bWJvbCdcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycydcblxuZDMubGVnZW5kQ29sb3IgPSBjb2xvclxuZDMubGVnZW5kU2l6ZSA9IHNpemVcbmQzLmxlZ2VuZFN5bWJvbCA9IHN5bWJvbFxuZDMubGVnZW5kSGVscGVycyA9IGhlbHBlcnNcbiJdfQ==
