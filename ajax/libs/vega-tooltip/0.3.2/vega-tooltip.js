(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vegaTooltip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// https://d3js.org/d3-collection/ Version 1.0.3. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

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

var nest = function() {
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

  function entries(map$$1, depth) {
    if (++depth > keys.length) return map$$1;
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map$$1.entries();
    else array = [], map$$1.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
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
};

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return map();
}

function setMap(map$$1, key, value) {
  map$$1.set(key, value);
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

var keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};

var values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};

var entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};

exports.nest = nest;
exports.set = set;
exports.map = map;
exports.keys = keys;
exports.values = values;
exports.entries = entries;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],2:[function(require,module,exports){
// https://d3js.org/d3-format/ Version 1.2.0. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
var formatDecimal = function(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
};

var exponent = function(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
};

var formatGroup = function(grouping, thousands) {
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
};

var formatNumerals = function(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
};

var formatDefault = function(x, p) {
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
};

var prefixExponent;

var formatPrefixAuto = function(x, p) {
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
};

var formatRounded = function(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};

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

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

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

var identity = function(x) {
  return x;
};

var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

var formatLocale = function(locale) {
  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity,
      percent = locale.percent || "%";

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
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

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

        // Perform the initial formatting.
        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision);

        // If a negative value rounds to zero during formatting, treat as positive.
        if (valueNegative && +value === 0) valueNegative = false;

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
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
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
};

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

var precisionFixed = function(step) {
  return Math.max(0, -exponent(Math.abs(step)));
};

var precisionPrefix = function(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
};

var precisionRound = function(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
};

exports.formatDefaultLocale = defaultLocale;
exports.formatLocale = formatLocale;
exports.formatSpecifier = formatSpecifier;
exports.precisionFixed = precisionFixed;
exports.precisionPrefix = precisionPrefix;
exports.precisionRound = precisionRound;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],3:[function(require,module,exports){
// https://d3js.org/d3-selection/ Version 1.0.6. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

var namespace = function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
};

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

var creator = function(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
};

var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

var matcher = function(selector) {
  return function() {
    return this.matches(selector);
  };
};

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!element.matches) {
    var vendorMatches = element.webkitMatchesSelector
        || element.msMatchesSelector
        || element.mozMatchesSelector
        || element.oMatchesSelector;
    matcher = function(selector) {
      return function() {
        return vendorMatches.call(this, selector);
      };
    };
  }
}

var matcher$1 = matcher;

var filterEvents = {};

exports.event = null;

if (typeof document !== "undefined") {
  var element$1 = document.documentElement;
  if (!("onmouseenter" in element$1)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = exports.event; // Events can be reentrant (e.g., focus).
    exports.event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      exports.event = event0;
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

var selection_on = function(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
};

function customEvent(event1, listener, that, args) {
  var event0 = exports.event;
  event1.sourceEvent = exports.event;
  exports.event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    exports.event = event0;
  }
}

var sourceEvent = function() {
  var current = exports.event, source;
  while (source = current.sourceEvent) current = source;
  return current;
};

var point = function(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
};

var mouse = function(node) {
  var event = sourceEvent();
  if (event.changedTouches) event = event.changedTouches[0];
  return point(node, event);
};

function none() {}

var selector = function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
};

var selection_select = function(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
};

function empty() {
  return [];
}

var selectorAll = function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
};

var selection_selectAll = function(select) {
  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
};

var selection_filter = function(match) {
  if (typeof match !== "function") match = matcher$1(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
};

var sparse = function(update) {
  return new Array(update.length);
};

var selection_enter = function() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
};

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

var constant = function(x) {
  return function() {
    return x;
  };
};

var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

var selection_data = function(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
};

var selection_exit = function() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
};

var selection_merge = function(selection) {

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
};

var selection_order = function() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
};

var selection_sort = function(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
};

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

var selection_call = function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
};

var selection_nodes = function() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
};

var selection_node = function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
};

var selection_size = function() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
};

var selection_empty = function() {
  return !this.node();
};

var selection_each = function(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
};

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

var selection_attr = function(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
};

var defaultView = function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
};

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

var selection_style = function(name, value, priority) {
  var node;
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : defaultView(node = this.node())
          .getComputedStyle(node, null)
          .getPropertyValue(name);
};

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

var selection_property = function(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
};

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

var selection_classed = function(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
};

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

var selection_text = function(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
};

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

var selection_html = function(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
};

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

var selection_raise = function() {
  return this.each(raise);
};

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

var selection_lower = function() {
  return this.each(lower);
};

var selection_append = function(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
};

function constantNull() {
  return null;
}

var selection_insert = function(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
};

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

var selection_remove = function() {
  return this.each(remove);
};

var selection_datum = function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
};

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

var selection_dispatch = function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
};

var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selection_selectAll,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  merge: selection_merge,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch
};

var select = function(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
};

var selectAll = function(selector) {
  return typeof selector === "string"
      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection([selector == null ? [] : selector], root);
};

var touch = function(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point(node, touch);
    }
  }

  return null;
};

var touches = function(node, touches) {
  if (touches == null) touches = sourceEvent().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = point(node, touches[i]);
  }

  return points;
};

exports.creator = creator;
exports.local = local;
exports.matcher = matcher$1;
exports.mouse = mouse;
exports.namespace = namespace;
exports.namespaces = namespaces;
exports.select = select;
exports.selectAll = selectAll;
exports.selection = selection;
exports.selector = selector;
exports.selectorAll = selectorAll;
exports.touch = touch;
exports.touches = touches;
exports.window = defaultView;
exports.customEvent = customEvent;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],4:[function(require,module,exports){
// https://d3js.org/d3-time-format/ Version 2.0.5. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-time')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-time'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Time) { 'use strict';

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

var locale$1;





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
  locale$1 = formatLocale(definition);
  exports.timeFormat = locale$1.format;
  exports.timeParse = locale$1.parse;
  exports.utcFormat = locale$1.utcFormat;
  exports.utcParse = locale$1.utcParse;
  return locale$1;
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

})));

},{"d3-time":5}],5:[function(require,module,exports){
// https://d3js.org/d3-time/ Version 1.0.6. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

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
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) while (--step >= 0) while (offseti(date, 1), !test(date)) {} // eslint-disable-line no-empty
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

})));

},{}],6:[function(require,module,exports){
"use strict";
/** Constants and utilities for data type */
/** Data type based on level of measurement */
Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type.QUANTITATIVE = 'quantitative';
    Type.ORDINAL = 'ordinal';
    Type.TEMPORAL = 'temporal';
    Type.NOMINAL = 'nominal';
})(Type = exports.Type || (exports.Type = {}));
exports.QUANTITATIVE = Type.QUANTITATIVE;
exports.ORDINAL = Type.ORDINAL;
exports.TEMPORAL = Type.TEMPORAL;
exports.NOMINAL = Type.NOMINAL;
/**
 * Get full, lowercase type name for a given type.
 * @param  type
 * @return Full type name.
 */
function getFullName(type) {
    if (type) {
        type = type.toLowerCase();
        switch (type) {
            case 'q':
            case exports.QUANTITATIVE:
                return 'quantitative';
            case 't':
            case exports.TEMPORAL:
                return 'temporal';
            case 'o':
            case exports.ORDINAL:
                return 'ordinal';
            case 'n':
            case exports.NOMINAL:
                return 'nominal';
        }
    }
    // If we get invalid input, return undefined type.
    return undefined;
}
exports.getFullName = getFullName;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_format_1 = require("d3-format");
var d3_time_1 = require("d3-time");
var d3_time_format_1 = require("d3-time-format");
/**
 * Format value using formatType and format
 * @param value - a field value to be formatted
 * @param formatType - the formatType can be: "time", "number", or "string"
 * @param format - a time time format specifier, or a time number format specifier, or undefined
 * @return the formatted value, or undefined if value or formatType is missing
 */
function customFormat(value, formatType, format) {
    if (value === undefined || value === null) {
        return undefined;
    }
    if (!formatType) {
        return undefined;
    }
    switch (formatType) {
        case 'time':
            return format ? d3_time_format_1.timeFormat(format)(value) : autoTimeFormat(value);
        case 'number':
            return format ? d3_format_1.format(format)(value) : autoNumberFormat(value);
        case 'string':
        default:
            return value;
    }
}
exports.customFormat = customFormat;
/**
 * Automatically format a time, number or string value
 * @return the formatted time, number or string value
 */
function autoFormat(value) {
    if (typeof value === 'number') {
        return autoNumberFormat(value);
    }
    else if (value instanceof Date) {
        return autoTimeFormat(value);
    }
    else {
        return value;
    }
}
exports.autoFormat = autoFormat;
/**
 * Automatically format a number based on its decimal.
 * @param value number to be formatted
 * @return If it's a decimal number, return a fixed two points precision.
 * If it's a whole number, return the original value without any format.
 */
function autoNumberFormat(value) {
    return value % 1 === 0 ? d3_format_1.format(',')(value) : d3_format_1.format(',.2f')(value);
}
exports.autoNumberFormat = autoNumberFormat;
/**
 * Automatically format a time based on its date.
 * @param date object to be formatted
 * @return a formatted time string depending on the time. For example,
 * the start of February is formatted as "February", while February second is formatted as "Feb 2".
 */
function autoTimeFormat(date) {
    var formatMillisecond = d3_time_format_1.timeFormat('.%L'), formatSecond = d3_time_format_1.timeFormat(':%S'), formatMinute = d3_time_format_1.timeFormat('%I:%M'), formatHour = d3_time_format_1.timeFormat('%I %p'), formatDay = d3_time_format_1.timeFormat('%a %d'), formatWeek = d3_time_format_1.timeFormat('%b %d'), formatMonth = d3_time_format_1.timeFormat('%B'), formatYear = d3_time_format_1.timeFormat('%Y');
    return (d3_time_1.timeSecond(date) < date ? formatMillisecond
        : d3_time_1.timeMinute(date) < date ? formatSecond
            : d3_time_1.timeHour(date) < date ? formatMinute
                : d3_time_1.timeDay(date) < date ? formatHour
                    : d3_time_1.timeMonth(date) < date ? (d3_time_1.timeWeek(date) < date ? formatDay : formatWeek)
                        : d3_time_1.timeYear(date) < date ? formatMonth
                            : formatYear)(date);
}
exports.autoTimeFormat = autoTimeFormat;

},{"d3-format":2,"d3-time":5,"d3-time-format":4}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_selection_1 = require("d3-selection");
var options_1 = require("./options");
var parseOption_1 = require("./parseOption");
var supplementField_1 = require("./supplementField");
var tooltipDisplay_1 = require("./tooltipDisplay");
var tooltipPromise = undefined;
var tooltipActive = false;
/**
 * Export API for Vega visualizations: vg.tooltip(vgView, options)
 * options can specify whether to show all fields or to show only custom fields
 * It can also provide custom title and format for fields
 */
function vega(vgView, options) {
    if (options === void 0) { options = { showAllFields: true }; }
    // initialize tooltip with item data and options on mouse over
    vgView.addEventListener('mouseover.tooltipInit', function (event, item) {
        if (shouldShowTooltip(item)) {
            // clear existing promise because mouse can only point at one thing at a time
            cancelPromise();
            tooltipPromise = window.setTimeout(function () {
                init(event, item, options);
            }, options.delay || options_1.DELAY);
        }
    });
    // update tooltip position on mouse move
    // (important for large marks e.g. bars)
    vgView.addEventListener('mousemove.tooltipUpdate', function (event, item) {
        if (shouldShowTooltip(item) && tooltipActive) {
            update(event, item, options);
        }
    });
    // clear tooltip on mouse out
    vgView.addEventListener('mouseout.tooltipRemove', function (event, item) {
        if (shouldShowTooltip(item)) {
            cancelPromise();
            if (tooltipActive) {
                clear(event, item, options);
            }
        }
    });
    return {
        destroy: function () {
            // remove event listeners
            vgView.removeEventListener('mouseover.tooltipInit');
            vgView.removeEventListener('mousemove.tooltipUpdate');
            vgView.removeEventListener('mouseout.tooltipRemove');
            cancelPromise(); // clear tooltip promise
        }
    };
}
exports.vega = vega;
;
function vegaLite(vgView, vlSpec, options) {
    if (options === void 0) { options = {}; }
    options = supplementField_1.supplementOptions(options, vlSpec);
    // TODO: update this to use new vega-view api (addEventListener)
    // initialize tooltip with item data and options on mouse over
    vgView.addEventListener('mouseover.tooltipInit', function (event, item) {
        if (shouldShowTooltip(item)) {
            // clear existing promise because mouse can only point at one thing at a time
            cancelPromise();
            // make a new promise with time delay for tooltip
            tooltipPromise = window.setTimeout(function () {
                init(event, item, options);
            }, options.delay || options_1.DELAY);
        }
    });
    // update tooltip position on mouse move
    // (important for large marks e.g. bars)
    vgView.addEventListener('mousemove.tooltipUpdate', function (event, item) {
        if (shouldShowTooltip(item) && tooltipActive) {
            update(event, item, options);
        }
    });
    // clear tooltip on mouse out
    vgView.addEventListener('mouseout.tooltipRemove', function (event, item) {
        if (shouldShowTooltip(item)) {
            cancelPromise();
            if (tooltipActive) {
                clear(event, item, options);
            }
        }
    });
    return {
        destroy: function () {
            // remove event listeners
            vgView.removeEventListener('mouseover.tooltipInit');
            vgView.removeEventListener('mousemove.tooltipUpdate');
            vgView.removeEventListener('mouseout.tooltipRemove');
            cancelPromise(); // clear tooltip promise
        }
    };
}
exports.vegaLite = vegaLite;
;
/* Cancel tooltip promise */
function cancelPromise() {
    /* We don't check if tooltipPromise is valid because passing
     an invalid ID to clearTimeout does not have any effect
     (and doesn't throw an exception). */
    if (tooltipPromise) {
        window.clearTimeout(tooltipPromise);
        tooltipPromise = undefined;
    }
}
/* Initialize tooltip with data */
function init(event, item, options) {
    // get tooltip HTML placeholder
    var tooltipPlaceholder = tooltipDisplay_1.getTooltipPlaceholder();
    // prepare data for tooltip
    var tooltipData = parseOption_1.getTooltipData(item, options);
    if (!tooltipData || tooltipData.length === 0) {
        return undefined;
    }
    // bind data to tooltip HTML placeholder
    tooltipDisplay_1.bindData(tooltipPlaceholder, tooltipData);
    tooltipDisplay_1.updatePosition(event, options);
    tooltipDisplay_1.updateColorTheme(options);
    d3_selection_1.select('#vis-tooltip').style('visibility', 'visible');
    tooltipActive = true;
    // invoke user-provided callback
    if (options.onAppear) {
        options.onAppear(event, item);
    }
}
/* Update tooltip position on mousemove */
function update(event, item, options) {
    tooltipDisplay_1.updatePosition(event, options);
    // invoke user-provided callback
    if (options.onMove) {
        options.onMove(event, item);
    }
}
/* Clear tooltip */
function clear(event, item, options) {
    // visibility hidden instead of display none
    // because we need computed tooltip width and height to best position it
    d3_selection_1.select('#vis-tooltip').style('visibility', 'hidden');
    tooltipActive = false;
    tooltipDisplay_1.clearData();
    tooltipDisplay_1.clearColorTheme();
    tooltipDisplay_1.clearPosition();
    // invoke user-provided callback
    if (options.onDisappear) {
        options.onDisappear(event, item);
    }
}
/* Decide if a Scenegraph item deserves tooltip */
function shouldShowTooltip(item) {
    // no data, no show
    if (!item || !item.datum) {
        return false;
    }
    // (small multiples) avoid showing tooltip for a facet's background
    if (item.datum._facetID) {
        return false;
    }
    // avoid showing tooltip for axis title and labels
    if (!item.datum._id) {
        return false;
    }
    return true;
}

},{"./options":9,"./parseOption":10,"./supplementField":11,"./tooltipDisplay":12,"d3-selection":3}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELAY = 100;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_collection_1 = require("d3-collection");
var formatFieldValue_1 = require("./formatFieldValue");
/**
 * Prepare data for the tooltip
 * @return An array of tooltip data [{ title: ..., value: ...}]
 */
// TODO: add marktype
function getTooltipData(item, options) {
    // ignore the data for group type that represents white space
    if (item.mark.marktype === 'group' && item.mark.name === 'nested_main_group') {
        return undefined;
    }
    // this array will be bind to the tooltip element
    var tooltipData;
    var itemData = d3_collection_1.map(item.datum);
    var removeKeys = [
        '_id', '_prev', 'width', 'height',
        'count_start', 'count_end',
        'layout_start', 'layout_mid', 'layout_end', 'layout_path', 'layout_x', 'layout_y'
    ];
    removeFields(itemData, removeKeys);
    // remove duplicate time fields (if any)
    removeDuplicateTimeFields(itemData, options.fields);
    // combine multiple rows of a binned field into a single row
    combineBinFields(itemData, options.fields);
    // TODO(zening): use Vega-Lite layering to support tooltip on line and area charts (#1)
    dropFieldsForLineArea(item.mark.marktype, itemData);
    if (options.showAllFields === true) {
        tooltipData = prepareAllFieldsData(itemData, options);
    }
    else {
        tooltipData = prepareCustomFieldsData(itemData, options);
    }
    return tooltipData;
}
exports.getTooltipData = getTooltipData;
/**
 * Prepare custom fields data for tooltip. This function formats
 * field titles and values and returns an array of formatted fields.
 *
 * @param {time.map} itemData - a map of item.datum
 * @param {Object} options - user-provided options
 * @return An array of formatted fields specified by options [{ title: ..., value: ...}]
 */
function prepareCustomFieldsData(itemData, options) {
    var tooltipData = [];
    options.fields.forEach(function (fieldOption) {
        // prepare field title
        var title = fieldOption.title ? fieldOption.title : fieldOption.field;
        // get (raw) field value
        var value = getValue(itemData, fieldOption.field);
        if (value === undefined) {
            return undefined;
        }
        // format value
        var formattedValue = formatFieldValue_1.customFormat(value, fieldOption.formatType, fieldOption.format) || formatFieldValue_1.autoFormat(value);
        // add formatted data to tooltipData
        tooltipData.push({ title: title, value: formattedValue });
    });
    return tooltipData;
}
exports.prepareCustomFieldsData = prepareCustomFieldsData;
/**
 * Get a field value from a data map.
 * @param {time.map} itemData - a map of item.datum
 * @param {string} field - the name of the field. It can contain "." to specify
 * that the field is not a direct child of item.datum
 * @return the field value on success, undefined otherwise
 */
// TODO(zening): Mute "Cannot find field" warnings for composite vis (issue #39)
function getValue(itemData, field) {
    var value;
    var accessors = field.split('.');
    // get the first accessor and remove it from the array
    var firstAccessor = accessors[0];
    accessors.shift();
    if (itemData.has(firstAccessor)) {
        value = itemData.get(firstAccessor);
        // if we still have accessors, use them to get the value
        accessors.forEach(function (a) {
            if (value[a]) {
                value = value[a];
            }
        });
    }
    if (value === undefined) {
        console.warn('[Tooltip] Cannot find field ' + field + ' in data.');
        return undefined;
    }
    else {
        return value;
    }
}
exports.getValue = getValue;
/**
 * Prepare data for all fields in itemData for tooltip. This function
 * formats field titles and values and returns an array of formatted fields.
 *
 * @param {time.map} itemData - a map of item.datum
 * @param {Object} options - user-provided options
 * @return All fields in itemData, formatted, in the form of an array: [{ title: ..., value: ...}]
 *
 * Please note that this function expects itemData to be simple {field:value} pairs.
 * It will not try to parse value if it is an object. If value is an object, please
 * use prepareCustomFieldsData() instead.
 */
function prepareAllFieldsData(itemData, options) {
    var tooltipData = [];
    // here, fieldOptions still provides format
    var fieldOptions = d3_collection_1.map(options.fields, function (d) { return d.field; });
    itemData.each(function (value, field) {
        // prepare title
        var title;
        if (fieldOptions.has(field) && fieldOptions.get(field).title) {
            title = fieldOptions.get(field).title;
        }
        else {
            title = field;
        }
        var formatType;
        var format;
        // format value
        if (fieldOptions.has(field)) {
            formatType = fieldOptions.get(field).formatType;
            format = fieldOptions.get(field).format;
        }
        var formattedValue = formatFieldValue_1.customFormat(value, formatType, format) || formatFieldValue_1.autoFormat(value);
        // add formatted data to tooltipData
        tooltipData.push({ title: title, value: formattedValue });
    });
    return tooltipData;
}
exports.prepareAllFieldsData = prepareAllFieldsData;
/**
 * Remove multiple fields from a tooltip data map, using removeKeys
 *
 * Certain meta data fields (e.g. "_id", "_prev") should be hidden in the tooltip
 * by default. This function can be used to remove these fields from tooltip data.
 * @param {time.map} dataMap - the data map that contains tooltip data.
 * @param {string[]} removeKeys - the fields that should be removed from dataMap.
 */
function removeFields(dataMap, removeKeys) {
    removeKeys.forEach(function (key) {
        dataMap.remove(key);
    });
}
exports.removeFields = removeFields;
/**
 * When a temporal field has timeUnit, itemData will give us duplicated fields
 * (e.g., Year and YEAR(Year)). In tooltip want to display the field WITH the
 * timeUnit and remove the field that doesn't have timeUnit.
 */
function removeDuplicateTimeFields(itemData, optFields) {
    if (!optFields) {
        return undefined;
    }
    optFields.forEach(function (optField) {
        if (optField.removeOriginalTemporalField) {
            removeFields(itemData, [optField.removeOriginalTemporalField]);
        }
    });
}
exports.removeDuplicateTimeFields = removeDuplicateTimeFields;
/**
 * Combine multiple binned fields in itemData into one field. The value of the field
 * is a string that describes the bin range.
 *
 * @param {time.map} itemData - a map of item.datum
 * @param {Object[]} fieldOptions - a list of field options (i.e. options.fields[])
 * @return itemData with combined bin fields
 */
function combineBinFields(itemData, fieldOptions) {
    if (!fieldOptions) {
        return undefined;
    }
    fieldOptions.forEach(function (fieldOption) {
        if (fieldOption.bin === true) {
            // get binned field names
            var binFieldRange = fieldOption.field;
            var binFieldStart = binFieldRange.concat('_start');
            var binFieldMid = binFieldRange.concat('_mid');
            var binFieldEnd = binFieldRange.concat('_end');
            // use start value and end value to compute range
            // save the computed range in binFieldStart
            var startValue = itemData.get(binFieldStart);
            var endValue = itemData.get(binFieldEnd);
            if ((startValue !== undefined) && (endValue !== undefined)) {
                var range = startValue + '-' + endValue;
                itemData.set(binFieldRange, range);
            }
            // remove binFieldMid, binFieldEnd, and binFieldRange from itemData
            var binRemoveKeys = [];
            binRemoveKeys.push(binFieldStart, binFieldMid, binFieldEnd);
            removeFields(itemData, binRemoveKeys);
        }
    });
    return itemData;
}
exports.combineBinFields = combineBinFields;
/**
 * Drop fields for line and area marks.
 *
 * Lines and areas are defined by a series of datum. We overlay point marks
 * on top of lines and areas to allow tooltip to show all data in the series.
 * For the line marks and area marks underneath, we only show nominal fields
 * in tooltip. This is because line / area marks only give us the last datum
 * in their series. It only make sense to show the nominal fields (e.g., symbol
 * = APPL, AMZN, GOOG, IBM, MSFT) because these fields don't tend to change along
 * the line / area border.
 */
function dropFieldsForLineArea(marktype, itemData) {
    if (marktype === 'line' || marktype === 'area') {
        var quanKeys_1 = [];
        itemData.each(function (value, field) {
            if (value instanceof Date) {
                quanKeys_1.push(field);
            }
        });
        removeFields(itemData, quanKeys_1);
    }
}
exports.dropFieldsForLineArea = dropFieldsForLineArea;

},{"./formatFieldValue":7,"d3-collection":1}],11:[function(require,module,exports){
(function (global){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vl = (typeof window !== "undefined" ? window['vl'] : typeof global !== "undefined" ? global['vl'] : null);
var type_1 = require("vega-lite/build/src/type");
/* mapping from fieldDef.type to formatType */
var formatTypeMap = {
    'quantitative': 'number',
    'temporal': 'time',
    'ordinal': undefined,
    'nominal': undefined
};
/**
 * (Vega-Lite only) Supplement options with vlSpec
 *
 * @param options - user-provided options
 * @param vlSpec - vega-lite spec
 * @return the vlSpec-supplemented options object
 *
 * if options.showAllFields is true or undefined, vlSpec will supplement
 * options.fields with all fields in the spec
 * if options.showAllFields is false, vlSpec will only supplement existing fields
 * in options.fields
 */
function supplementOptions(options, vlSpec) {
    // fields to be supplemented by vlSpec
    var supplementedFields = [];
    // if showAllFields is true or undefined, supplement all fields in vlSpec
    if (options.showAllFields !== false) {
        vl.spec.fieldDefs(vlSpec).forEach(function (fieldDef) {
            // get a fieldOption in options that matches the fieldDef
            var fieldOption = getFieldOption(options.fields, fieldDef);
            // supplement the fieldOption with fieldDef and config
            var supplementedFieldOption = supplementFieldOption(fieldOption, fieldDef, vlSpec);
            supplementedFields.push(supplementedFieldOption);
        });
    }
    else {
        if (options.fields) {
            options.fields.forEach(function (fieldOption) {
                // get the fieldDef in vlSpec that matches the fieldOption
                var fieldDef = getFieldDef(vl.spec.fieldDefs(vlSpec), fieldOption);
                // supplement the fieldOption with fieldDef and config
                var supplementedFieldOption = supplementFieldOption(fieldOption, fieldDef, vlSpec);
                supplementedFields.push(supplementedFieldOption);
            });
        }
    }
    options.fields = supplementedFields;
    return options;
}
exports.supplementOptions = supplementOptions;
/**
 * Find a fieldOption in fieldOptions that matches a fieldDef
 *
 * @param {Object[]} fieldOptionss - a list of field options (i.e. options.fields[])
 * @param {Object} fieldDef - from vlSpec
 * @return the matching fieldOption, or undefined if no match was found
 *
 * If the fieldDef is aggregated, find a fieldOption that matches the field name and
 * the aggregation of the fieldDef.
 * If the fieldDef is not aggregated, find a fieldOption that matches the field name.
 */
function getFieldOption(fieldOptions, fieldDef) {
    if (!fieldDef || !fieldOptions || fieldOptions.length <= 0) {
        return undefined;
    }
    // if aggregate, match field name and aggregate operation
    if (fieldDef.aggregate) {
        // try find the perfect match: field name equals, aggregate operation equals
        for (var _i = 0, fieldOptions_1 = fieldOptions; _i < fieldOptions_1.length; _i++) {
            var item = fieldOptions_1[_i];
            if (item.field === fieldDef.field && item.aggregate === fieldDef.aggregate) {
                return item;
            }
        }
        // try find the second-best match: field name equals, field.aggregate is not specified
        for (var _a = 0, fieldOptions_2 = fieldOptions; _a < fieldOptions_2.length; _a++) {
            var item = fieldOptions_2[_a];
            if (item.field === fieldDef.field && !item.aggregate) {
                return item;
            }
        }
        // return undefined if no match was found
        return undefined;
    }
    else {
        for (var _b = 0, fieldOptions_3 = fieldOptions; _b < fieldOptions_3.length; _b++) {
            var item = fieldOptions_3[_b];
            if (item.field === fieldDef.field) {
                return item;
            }
        }
        // return undefined if no match was found
        return undefined;
    }
}
exports.getFieldOption = getFieldOption;
/**
 * Find a fieldDef that matches a fieldOption
 *
 * @param {Object} fieldOption - a field option (a member in options.fields[])
 * @return the matching fieldDef, or undefined if no match was found
 *
 * A matching fieldDef should have the same field name as fieldOption.
 * If the matching fieldDef is aggregated, the aggregation should not contradict
 * with that of the fieldOption.
 */
function getFieldDef(fieldDefs, fieldOption) {
    if (!fieldOption || !fieldOption.field || !fieldDefs) {
        return undefined;
    }
    // field name should match, aggregation should not disagree
    for (var _i = 0, fieldDefs_1 = fieldDefs; _i < fieldDefs_1.length; _i++) {
        var item = fieldDefs_1[_i];
        if (item.field === fieldOption.field) {
            if (item.aggregate) {
                if (item.aggregate === fieldOption.aggregate || !fieldOption.aggregate) {
                    return item;
                }
            }
            else {
                return item;
            }
        }
    }
    // return undefined if no match was found
    return undefined;
}
exports.getFieldDef = getFieldDef;
/**
 * Supplement a fieldOption (from options.fields[]) with a fieldDef, config
 * (which provides timeFormat, numberFormat, countTitle)
 * Either fieldOption or fieldDef can be undefined, but they cannot both be undefined.
 * config (and its members timeFormat, numberFormat and countTitle) can be undefined.
 * @return the supplemented fieldOption, or undefined on error
 */
function supplementFieldOption(fieldOption, fieldDef, vlSpec) {
    // many specs don't have config
    var config = vl.util.extend({}, vlSpec.config);
    // at least one of fieldOption and fieldDef should exist
    if (!fieldOption && !fieldDef) {
        console.error('[Tooltip] Cannot supplement a field when field and fieldDef are both empty.');
        return undefined;
    }
    // if either one of fieldOption and fieldDef is undefined, make it an empty object
    if (!fieldOption && fieldDef) {
        fieldOption = {};
    }
    if (fieldOption && !fieldDef) {
        fieldDef = {};
    }
    // the supplemented field option
    var supplementedFieldOption = {};
    // supplement a user-provided field name with underscore prefixes and suffixes to
    // match the field names in item.datum
    // for aggregation, this will add prefix "mean_" etc.
    // for timeUnit, this will add prefix "yearmonth_" etc.
    // for bin, this will add prefix "bin_" and suffix "_start". Later we will replace "_start" with "_range".
    supplementedFieldOption.field = fieldDef.field ?
        vl.fieldDef.field(fieldDef) : fieldOption.field;
    // If a fieldDef is a (TIMEUNIT)T, we check if the original T is present in the vlSpec.
    // If only (TIMEUNIT)T is present in vlSpec, we set `removeOriginalTemporalField` to T,
    // which will cause function removeDuplicateTimeFields() to remove T and only keep (TIMEUNIT)T
    // in item data.
    // If both (TIMEUNIT)T and T are in vlSpec, we set `removeOriginalTemporalField` to undefined,
    // which will leave both T and (TIMEUNIT)T in item data.
    // Note: user should never have to provide this boolean in options
    if (fieldDef.type === type_1.TEMPORAL && fieldDef.timeUnit) {
        // in most cases, if it's a (TIMEUNIT)T, we remove original T
        var originalTemporalField = fieldDef.field;
        supplementedFieldOption.removeOriginalTemporalField = originalTemporalField;
        // handle corner case: if T is present in vlSpec, then we keep both T and (TIMEUNIT)T
        var fieldDefs = vl.spec.fieldDefs(vlSpec);
        for (var _i = 0, fieldDefs_2 = fieldDefs; _i < fieldDefs_2.length; _i++) {
            var items = fieldDefs_2[_i];
            if (items.field === originalTemporalField && !items.timeUnit) {
                supplementedFieldOption.removeOriginalTemporalField = undefined;
                break;
            }
        }
    }
    // supplement title
    if (!config.countTitle) {
        config.countTitle = vl.config.defaultConfig.countTitle; // use vl default countTitle
    }
    supplementedFieldOption.title = fieldOption.title ?
        fieldOption.title : vl.fieldDef.title(fieldDef, config);
    // supplement formatType
    supplementedFieldOption.formatType = fieldOption.formatType ?
        fieldOption.formatType : formatTypeMap[fieldDef.type];
    // supplement format
    if (fieldOption.format) {
        supplementedFieldOption.format = fieldOption.format;
    }
    else {
        switch (supplementedFieldOption.formatType) {
            case 'time':
                supplementedFieldOption.format = fieldDef.timeUnit ?
                    // TODO(zening): use template for all time fields, to be consistent with Vega-Lite
                    vl.timeUnit.formatExpression(fieldDef.timeUnit, '', false).split("'")[1]
                    : config.timeFormat || vl.config.defaultConfig.timeFormat;
                break;
            case 'number':
                supplementedFieldOption.format = config.numberFormat;
                break;
            case 'string':
            default:
        }
    }
    // supplement bin from fieldDef, user should never have to provide bin in options
    if (fieldDef.bin) {
        supplementedFieldOption.field = supplementedFieldOption.field.replace('_start', '_range'); // replace suffix
        supplementedFieldOption.bin = true;
        supplementedFieldOption.formatType = 'string'; // we show bin range as string (e.g. "5-10")
    }
    return supplementedFieldOption;
}
exports.supplementFieldOption = supplementFieldOption;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vega-lite/build/src/type":6}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_selection_1 = require("d3-selection");
/**
 * Get the tooltip HTML placeholder by id selector "#vis-tooltip"
 * If none exists, create a placeholder.
 * @returns the HTML placeholder for tooltip
 */
function getTooltipPlaceholder() {
    var tooltipPlaceholder;
    if (d3_selection_1.select('#vis-tooltip').empty()) {
        tooltipPlaceholder = d3_selection_1.select('body').append('div')
            .attr('id', 'vis-tooltip')
            .attr('class', 'vg-tooltip');
    }
    else {
        tooltipPlaceholder = d3_selection_1.select('#vis-tooltip');
    }
    return tooltipPlaceholder;
}
exports.getTooltipPlaceholder = getTooltipPlaceholder;
/**
 * Bind tooltipData to the tooltip placeholder
 */
function bindData(tooltipPlaceholder, tooltipData) {
    tooltipPlaceholder.selectAll('table').remove();
    var tooltipRows = tooltipPlaceholder.append('table').selectAll('.tooltip-row')
        .data(tooltipData);
    tooltipRows.exit().remove();
    var row = tooltipRows.enter().append('tr')
        .attr('class', 'tooltip-row');
    row.append('td').attr('class', 'key').text(function (d) { return d.title + ':'; });
    row.append('td').attr('class', 'value').text(function (d) { return d.value; });
}
exports.bindData = bindData;
/**
 * Clear tooltip data
 */
function clearData() {
    d3_selection_1.select('#vis-tooltip').selectAll('.tooltip-row').data([])
        .exit().remove();
}
exports.clearData = clearData;
/**
 * Update tooltip position
 * Default position is 10px right of and 10px below the cursor. This can be
 * overwritten by options.offset
 */
function updatePosition(event, options) {
    // determine x and y offsets, defaults are 10px
    var offsetX = 10;
    var offsetY = 10;
    if (options && options.offset && (options.offset.x !== undefined) && (options.offset.x !== null)) {
        offsetX = options.offset.x;
    }
    if (options && options.offset && (options.offset.y !== undefined) && (options.offset.y !== null)) {
        offsetY = options.offset.y;
    }
    // TODO: use the correct time type
    d3_selection_1.select('#vis-tooltip')
        .style('top', function () {
        // by default: put tooltip 10px below cursor
        // if tooltip is close to the bottom of the window, put tooltip 10px above cursor
        var tooltipHeight = this.getBoundingClientRect().height;
        if (event.clientY + tooltipHeight + offsetY < window.innerHeight) {
            return '' + (event.clientY + offsetY) + 'px';
        }
        else {
            return '' + (event.clientY - tooltipHeight - offsetY) + 'px';
        }
    })
        .style('left', function () {
        // by default: put tooltip 10px to the right of cursor
        // if tooltip is close to the right edge of the window, put tooltip 10 px to the left of cursor
        var tooltipWidth = this.getBoundingClientRect().width;
        if (event.clientX + tooltipWidth + offsetX < window.innerWidth) {
            return '' + (event.clientX + offsetX) + 'px';
        }
        else {
            return '' + (event.clientX - tooltipWidth - offsetX) + 'px';
        }
    });
}
exports.updatePosition = updatePosition;
/* Clear tooltip position */
function clearPosition() {
    d3_selection_1.select('#vis-tooltip')
        .style('top', '-9999px')
        .style('left', '-9999px');
}
exports.clearPosition = clearPosition;
/**
 * Update tooltip color theme according to options.colorTheme
 *
 * If colorTheme === "dark", apply dark theme to tooltip.
 * Otherwise apply light color theme.
 */
function updateColorTheme(options) {
    clearColorTheme();
    if (options && options.colorTheme === 'dark') {
        d3_selection_1.select('#vis-tooltip').classed('dark-theme', true);
    }
    else {
        d3_selection_1.select('#vis-tooltip').classed('light-theme', true);
    }
}
exports.updateColorTheme = updateColorTheme;
/* Clear color themes */
function clearColorTheme() {
    d3_selection_1.select('#vis-tooltip').classed('dark-theme light-theme', false);
}
exports.clearColorTheme = clearColorTheme;

},{"d3-selection":3}]},{},[8])(8)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZDMtY29sbGVjdGlvbi9idWlsZC9kMy1jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9idWlsZC9kMy1mb3JtYXQuanMiLCJub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL2J1aWxkL2QzLXNlbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9kMy10aW1lLWZvcm1hdC9idWlsZC9kMy10aW1lLWZvcm1hdC5qcyIsIm5vZGVfbW9kdWxlcy9kMy10aW1lL2J1aWxkL2QzLXRpbWUuanMiLCJub2RlX21vZHVsZXMvdmVnYS1saXRlL2J1aWxkL3NyYy90eXBlLmpzIiwic3JjL2Zvcm1hdEZpZWxkVmFsdWUudHMiLCJzcmMvaW5kZXgudHMiLCJzcmMvb3B0aW9ucy50cyIsInNyYy9wYXJzZU9wdGlvbi50cyIsInNyYy9zdXBwbGVtZW50RmllbGQudHMiLCJzcmMvdG9vbHRpcERpc3BsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzc4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUMsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDN0MscUJBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLHFCQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0FBQ0gsQ0FBQztBQVJELDRDQVFDO0FBRUQsd0JBQXdCO0FBQ3hCO0lBQ0UscUJBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUZELDBDQUVDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGh0dHBzOi8vZDNqcy5vcmcvZDMtY29sbGVjdGlvbi8gVmVyc2lvbiAxLjAuMy4gQ29weXJpZ2h0IDIwMTcgTWlrZSBCb3N0b2NrLlxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLmQzID0gZ2xvYmFsLmQzIHx8IHt9KSkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJlZml4ID0gXCIkXCI7XG5cbmZ1bmN0aW9uIE1hcCgpIHt9XG5cbk1hcC5wcm90b3R5cGUgPSBtYXAucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogTWFwLFxuICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiAocHJlZml4ICsga2V5KSBpbiB0aGlzO1xuICB9LFxuICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiB0aGlzW3ByZWZpeCArIGtleV07XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHRoaXNbcHJlZml4ICsga2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICByZW1vdmU6IGZ1bmN0aW9uKGtleSkge1xuICAgIHZhciBwcm9wZXJ0eSA9IHByZWZpeCArIGtleTtcbiAgICByZXR1cm4gcHJvcGVydHkgaW4gdGhpcyAmJiBkZWxldGUgdGhpc1twcm9wZXJ0eV07XG4gIH0sXG4gIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgZGVsZXRlIHRoaXNbcHJvcGVydHldO1xuICB9LFxuICBrZXlzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMpIGlmIChwcm9wZXJ0eVswXSA9PT0gcHJlZml4KSBrZXlzLnB1c2gocHJvcGVydHkuc2xpY2UoMSkpO1xuICAgIHJldHVybiBrZXlzO1xuICB9LFxuICB2YWx1ZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgdmFsdWVzLnB1c2godGhpc1twcm9wZXJ0eV0pO1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH0sXG4gIGVudHJpZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbnRyaWVzID0gW107XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcykgaWYgKHByb3BlcnR5WzBdID09PSBwcmVmaXgpIGVudHJpZXMucHVzaCh7a2V5OiBwcm9wZXJ0eS5zbGljZSgxKSwgdmFsdWU6IHRoaXNbcHJvcGVydHldfSk7XG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH0sXG4gIHNpemU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzaXplID0gMDtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgKytzaXplO1xuICAgIHJldHVybiBzaXplO1xuICB9LFxuICBlbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcykgaWYgKHByb3BlcnR5WzBdID09PSBwcmVmaXgpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgZWFjaDogZnVuY3Rpb24oZikge1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMpIGlmIChwcm9wZXJ0eVswXSA9PT0gcHJlZml4KSBmKHRoaXNbcHJvcGVydHldLCBwcm9wZXJ0eS5zbGljZSgxKSwgdGhpcyk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIG1hcChvYmplY3QsIGYpIHtcbiAgdmFyIG1hcCA9IG5ldyBNYXA7XG5cbiAgLy8gQ29weSBjb25zdHJ1Y3Rvci5cbiAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1hcCkgb2JqZWN0LmVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkgeyBtYXAuc2V0KGtleSwgdmFsdWUpOyB9KTtcblxuICAvLyBJbmRleCBhcnJheSBieSBudW1lcmljIGluZGV4IG9yIHNwZWNpZmllZCBrZXkgZnVuY3Rpb24uXG4gIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgIHZhciBpID0gLTEsXG4gICAgICAgIG4gPSBvYmplY3QubGVuZ3RoLFxuICAgICAgICBvO1xuXG4gICAgaWYgKGYgPT0gbnVsbCkgd2hpbGUgKCsraSA8IG4pIG1hcC5zZXQoaSwgb2JqZWN0W2ldKTtcbiAgICBlbHNlIHdoaWxlICgrK2kgPCBuKSBtYXAuc2V0KGYobyA9IG9iamVjdFtpXSwgaSwgb2JqZWN0KSwgbyk7XG4gIH1cblxuICAvLyBDb252ZXJ0IG9iamVjdCB0byBtYXAuXG4gIGVsc2UgaWYgKG9iamVjdCkgZm9yICh2YXIga2V5IGluIG9iamVjdCkgbWFwLnNldChrZXksIG9iamVjdFtrZXldKTtcblxuICByZXR1cm4gbWFwO1xufVxuXG52YXIgbmVzdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIga2V5cyA9IFtdLFxuICAgICAgc29ydEtleXMgPSBbXSxcbiAgICAgIHNvcnRWYWx1ZXMsXG4gICAgICByb2xsdXAsXG4gICAgICBuZXN0O1xuXG4gIGZ1bmN0aW9uIGFwcGx5KGFycmF5LCBkZXB0aCwgY3JlYXRlUmVzdWx0LCBzZXRSZXN1bHQpIHtcbiAgICBpZiAoZGVwdGggPj0ga2V5cy5sZW5ndGgpIHJldHVybiByb2xsdXAgIT0gbnVsbFxuICAgICAgICA/IHJvbGx1cChhcnJheSkgOiAoc29ydFZhbHVlcyAhPSBudWxsXG4gICAgICAgID8gYXJyYXkuc29ydChzb3J0VmFsdWVzKVxuICAgICAgICA6IGFycmF5KTtcblxuICAgIHZhciBpID0gLTEsXG4gICAgICAgIG4gPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIGtleSA9IGtleXNbZGVwdGgrK10sXG4gICAgICAgIGtleVZhbHVlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdmFsdWVzQnlLZXkgPSBtYXAoKSxcbiAgICAgICAgdmFsdWVzLFxuICAgICAgICByZXN1bHQgPSBjcmVhdGVSZXN1bHQoKTtcblxuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAodmFsdWVzID0gdmFsdWVzQnlLZXkuZ2V0KGtleVZhbHVlID0ga2V5KHZhbHVlID0gYXJyYXlbaV0pICsgXCJcIikpIHtcbiAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVzQnlLZXkuc2V0KGtleVZhbHVlLCBbdmFsdWVdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWx1ZXNCeUtleS5lYWNoKGZ1bmN0aW9uKHZhbHVlcywga2V5KSB7XG4gICAgICBzZXRSZXN1bHQocmVzdWx0LCBrZXksIGFwcGx5KHZhbHVlcywgZGVwdGgsIGNyZWF0ZVJlc3VsdCwgc2V0UmVzdWx0KSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gZW50cmllcyhtYXAkJDEsIGRlcHRoKSB7XG4gICAgaWYgKCsrZGVwdGggPiBrZXlzLmxlbmd0aCkgcmV0dXJuIG1hcCQkMTtcbiAgICB2YXIgYXJyYXksIHNvcnRLZXkgPSBzb3J0S2V5c1tkZXB0aCAtIDFdO1xuICAgIGlmIChyb2xsdXAgIT0gbnVsbCAmJiBkZXB0aCA+PSBrZXlzLmxlbmd0aCkgYXJyYXkgPSBtYXAkJDEuZW50cmllcygpO1xuICAgIGVsc2UgYXJyYXkgPSBbXSwgbWFwJCQxLmVhY2goZnVuY3Rpb24odiwgaykgeyBhcnJheS5wdXNoKHtrZXk6IGssIHZhbHVlczogZW50cmllcyh2LCBkZXB0aCl9KTsgfSk7XG4gICAgcmV0dXJuIHNvcnRLZXkgIT0gbnVsbCA/IGFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gc29ydEtleShhLmtleSwgYi5rZXkpOyB9KSA6IGFycmF5O1xuICB9XG5cbiAgcmV0dXJuIG5lc3QgPSB7XG4gICAgb2JqZWN0OiBmdW5jdGlvbihhcnJheSkgeyByZXR1cm4gYXBwbHkoYXJyYXksIDAsIGNyZWF0ZU9iamVjdCwgc2V0T2JqZWN0KTsgfSxcbiAgICBtYXA6IGZ1bmN0aW9uKGFycmF5KSB7IHJldHVybiBhcHBseShhcnJheSwgMCwgY3JlYXRlTWFwLCBzZXRNYXApOyB9LFxuICAgIGVudHJpZXM6IGZ1bmN0aW9uKGFycmF5KSB7IHJldHVybiBlbnRyaWVzKGFwcGx5KGFycmF5LCAwLCBjcmVhdGVNYXAsIHNldE1hcCksIDApOyB9LFxuICAgIGtleTogZnVuY3Rpb24oZCkgeyBrZXlzLnB1c2goZCk7IHJldHVybiBuZXN0OyB9LFxuICAgIHNvcnRLZXlzOiBmdW5jdGlvbihvcmRlcikgeyBzb3J0S2V5c1trZXlzLmxlbmd0aCAtIDFdID0gb3JkZXI7IHJldHVybiBuZXN0OyB9LFxuICAgIHNvcnRWYWx1ZXM6IGZ1bmN0aW9uKG9yZGVyKSB7IHNvcnRWYWx1ZXMgPSBvcmRlcjsgcmV0dXJuIG5lc3Q7IH0sXG4gICAgcm9sbHVwOiBmdW5jdGlvbihmKSB7IHJvbGx1cCA9IGY7IHJldHVybiBuZXN0OyB9XG4gIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVPYmplY3QoKSB7XG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gc2V0T2JqZWN0KG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNYXAoKSB7XG4gIHJldHVybiBtYXAoKTtcbn1cblxuZnVuY3Rpb24gc2V0TWFwKG1hcCQkMSwga2V5LCB2YWx1ZSkge1xuICBtYXAkJDEuc2V0KGtleSwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBTZXQoKSB7fVxuXG52YXIgcHJvdG8gPSBtYXAucHJvdG90eXBlO1xuXG5TZXQucHJvdG90eXBlID0gc2V0LnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFNldCxcbiAgaGFzOiBwcm90by5oYXMsXG4gIGFkZDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YWx1ZSArPSBcIlwiO1xuICAgIHRoaXNbcHJlZml4ICsgdmFsdWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHJlbW92ZTogcHJvdG8ucmVtb3ZlLFxuICBjbGVhcjogcHJvdG8uY2xlYXIsXG4gIHZhbHVlczogcHJvdG8ua2V5cyxcbiAgc2l6ZTogcHJvdG8uc2l6ZSxcbiAgZW1wdHk6IHByb3RvLmVtcHR5LFxuICBlYWNoOiBwcm90by5lYWNoXG59O1xuXG5mdW5jdGlvbiBzZXQob2JqZWN0LCBmKSB7XG4gIHZhciBzZXQgPSBuZXcgU2V0O1xuXG4gIC8vIENvcHkgY29uc3RydWN0b3IuXG4gIGlmIChvYmplY3QgaW5zdGFuY2VvZiBTZXQpIG9iamVjdC5lYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IHNldC5hZGQodmFsdWUpOyB9KTtcblxuICAvLyBPdGhlcndpc2UsIGFzc3VtZSBpdOKAmXMgYW4gYXJyYXkuXG4gIGVsc2UgaWYgKG9iamVjdCkge1xuICAgIHZhciBpID0gLTEsIG4gPSBvYmplY3QubGVuZ3RoO1xuICAgIGlmIChmID09IG51bGwpIHdoaWxlICgrK2kgPCBuKSBzZXQuYWRkKG9iamVjdFtpXSk7XG4gICAgZWxzZSB3aGlsZSAoKytpIDwgbikgc2V0LmFkZChmKG9iamVjdFtpXSwgaSwgb2JqZWN0KSk7XG4gIH1cblxuICByZXR1cm4gc2V0O1xufVxuXG52YXIga2V5cyA9IGZ1bmN0aW9uKG1hcCkge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gbWFwKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59O1xuXG52YXIgdmFsdWVzID0gZnVuY3Rpb24obWFwKSB7XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG1hcCkgdmFsdWVzLnB1c2gobWFwW2tleV0pO1xuICByZXR1cm4gdmFsdWVzO1xufTtcblxudmFyIGVudHJpZXMgPSBmdW5jdGlvbihtYXApIHtcbiAgdmFyIGVudHJpZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG1hcCkgZW50cmllcy5wdXNoKHtrZXk6IGtleSwgdmFsdWU6IG1hcFtrZXldfSk7XG4gIHJldHVybiBlbnRyaWVzO1xufTtcblxuZXhwb3J0cy5uZXN0ID0gbmVzdDtcbmV4cG9ydHMuc2V0ID0gc2V0O1xuZXhwb3J0cy5tYXAgPSBtYXA7XG5leHBvcnRzLmtleXMgPSBrZXlzO1xuZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5leHBvcnRzLmVudHJpZXMgPSBlbnRyaWVzO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuIiwiLy8gaHR0cHM6Ly9kM2pzLm9yZy9kMy1mb3JtYXQvIFZlcnNpb24gMS4yLjAuIENvcHlyaWdodCAyMDE3IE1pa2UgQm9zdG9jay5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5kMyA9IGdsb2JhbC5kMyB8fCB7fSkpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuLy8gQ29tcHV0ZXMgdGhlIGRlY2ltYWwgY29lZmZpY2llbnQgYW5kIGV4cG9uZW50IG9mIHRoZSBzcGVjaWZpZWQgbnVtYmVyIHggd2l0aFxuLy8gc2lnbmlmaWNhbnQgZGlnaXRzIHAsIHdoZXJlIHggaXMgcG9zaXRpdmUgYW5kIHAgaXMgaW4gWzEsIDIxXSBvciB1bmRlZmluZWQuXG4vLyBGb3IgZXhhbXBsZSwgZm9ybWF0RGVjaW1hbCgxLjIzKSByZXR1cm5zIFtcIjEyM1wiLCAwXS5cbnZhciBmb3JtYXREZWNpbWFsID0gZnVuY3Rpb24oeCwgcCkge1xuICBpZiAoKGkgPSAoeCA9IHAgPyB4LnRvRXhwb25lbnRpYWwocCAtIDEpIDogeC50b0V4cG9uZW50aWFsKCkpLmluZGV4T2YoXCJlXCIpKSA8IDApIHJldHVybiBudWxsOyAvLyBOYU4sIMKxSW5maW5pdHlcbiAgdmFyIGksIGNvZWZmaWNpZW50ID0geC5zbGljZSgwLCBpKTtcblxuICAvLyBUaGUgc3RyaW5nIHJldHVybmVkIGJ5IHRvRXhwb25lbnRpYWwgZWl0aGVyIGhhcyB0aGUgZm9ybSBcXGRcXC5cXGQrZVstK11cXGQrXG4gIC8vIChlLmcuLCAxLjJlKzMpIG9yIHRoZSBmb3JtIFxcZGVbLStdXFxkKyAoZS5nLiwgMWUrMykuXG4gIHJldHVybiBbXG4gICAgY29lZmZpY2llbnQubGVuZ3RoID4gMSA/IGNvZWZmaWNpZW50WzBdICsgY29lZmZpY2llbnQuc2xpY2UoMikgOiBjb2VmZmljaWVudCxcbiAgICAreC5zbGljZShpICsgMSlcbiAgXTtcbn07XG5cbnZhciBleHBvbmVudCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggPSBmb3JtYXREZWNpbWFsKE1hdGguYWJzKHgpKSwgeCA/IHhbMV0gOiBOYU47XG59O1xuXG52YXIgZm9ybWF0R3JvdXAgPSBmdW5jdGlvbihncm91cGluZywgdGhvdXNhbmRzKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgd2lkdGgpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmxlbmd0aCxcbiAgICAgICAgdCA9IFtdLFxuICAgICAgICBqID0gMCxcbiAgICAgICAgZyA9IGdyb3VwaW5nWzBdLFxuICAgICAgICBsZW5ndGggPSAwO1xuXG4gICAgd2hpbGUgKGkgPiAwICYmIGcgPiAwKSB7XG4gICAgICBpZiAobGVuZ3RoICsgZyArIDEgPiB3aWR0aCkgZyA9IE1hdGgubWF4KDEsIHdpZHRoIC0gbGVuZ3RoKTtcbiAgICAgIHQucHVzaCh2YWx1ZS5zdWJzdHJpbmcoaSAtPSBnLCBpICsgZykpO1xuICAgICAgaWYgKChsZW5ndGggKz0gZyArIDEpID4gd2lkdGgpIGJyZWFrO1xuICAgICAgZyA9IGdyb3VwaW5nW2ogPSAoaiArIDEpICUgZ3JvdXBpbmcubGVuZ3RoXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdC5yZXZlcnNlKCkuam9pbih0aG91c2FuZHMpO1xuICB9O1xufTtcblxudmFyIGZvcm1hdE51bWVyYWxzID0gZnVuY3Rpb24obnVtZXJhbHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1swLTldL2csIGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBudW1lcmFsc1sraV07XG4gICAgfSk7XG4gIH07XG59O1xuXG52YXIgZm9ybWF0RGVmYXVsdCA9IGZ1bmN0aW9uKHgsIHApIHtcbiAgeCA9IHgudG9QcmVjaXNpb24ocCk7XG5cbiAgb3V0OiBmb3IgKHZhciBuID0geC5sZW5ndGgsIGkgPSAxLCBpMCA9IC0xLCBpMTsgaSA8IG47ICsraSkge1xuICAgIHN3aXRjaCAoeFtpXSkge1xuICAgICAgY2FzZSBcIi5cIjogaTAgPSBpMSA9IGk7IGJyZWFrO1xuICAgICAgY2FzZSBcIjBcIjogaWYgKGkwID09PSAwKSBpMCA9IGk7IGkxID0gaTsgYnJlYWs7XG4gICAgICBjYXNlIFwiZVwiOiBicmVhayBvdXQ7XG4gICAgICBkZWZhdWx0OiBpZiAoaTAgPiAwKSBpMCA9IDA7IGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpMCA+IDAgPyB4LnNsaWNlKDAsIGkwKSArIHguc2xpY2UoaTEgKyAxKSA6IHg7XG59O1xuXG52YXIgcHJlZml4RXhwb25lbnQ7XG5cbnZhciBmb3JtYXRQcmVmaXhBdXRvID0gZnVuY3Rpb24oeCwgcCkge1xuICB2YXIgZCA9IGZvcm1hdERlY2ltYWwoeCwgcCk7XG4gIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgZXhwb25lbnQgPSBkWzFdLFxuICAgICAgaSA9IGV4cG9uZW50IC0gKHByZWZpeEV4cG9uZW50ID0gTWF0aC5tYXgoLTgsIE1hdGgubWluKDgsIE1hdGguZmxvb3IoZXhwb25lbnQgLyAzKSkpICogMykgKyAxLFxuICAgICAgbiA9IGNvZWZmaWNpZW50Lmxlbmd0aDtcbiAgcmV0dXJuIGkgPT09IG4gPyBjb2VmZmljaWVudFxuICAgICAgOiBpID4gbiA/IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGkgLSBuICsgMSkuam9pbihcIjBcIilcbiAgICAgIDogaSA+IDAgPyBjb2VmZmljaWVudC5zbGljZSgwLCBpKSArIFwiLlwiICsgY29lZmZpY2llbnQuc2xpY2UoaSlcbiAgICAgIDogXCIwLlwiICsgbmV3IEFycmF5KDEgLSBpKS5qb2luKFwiMFwiKSArIGZvcm1hdERlY2ltYWwoeCwgTWF0aC5tYXgoMCwgcCArIGkgLSAxKSlbMF07IC8vIGxlc3MgdGhhbiAxeSFcbn07XG5cbnZhciBmb3JtYXRSb3VuZGVkID0gZnVuY3Rpb24oeCwgcCkge1xuICB2YXIgZCA9IGZvcm1hdERlY2ltYWwoeCwgcCk7XG4gIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgZXhwb25lbnQgPSBkWzFdO1xuICByZXR1cm4gZXhwb25lbnQgPCAwID8gXCIwLlwiICsgbmV3IEFycmF5KC1leHBvbmVudCkuam9pbihcIjBcIikgKyBjb2VmZmljaWVudFxuICAgICAgOiBjb2VmZmljaWVudC5sZW5ndGggPiBleHBvbmVudCArIDEgPyBjb2VmZmljaWVudC5zbGljZSgwLCBleHBvbmVudCArIDEpICsgXCIuXCIgKyBjb2VmZmljaWVudC5zbGljZShleHBvbmVudCArIDEpXG4gICAgICA6IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGV4cG9uZW50IC0gY29lZmZpY2llbnQubGVuZ3RoICsgMikuam9pbihcIjBcIik7XG59O1xuXG52YXIgZm9ybWF0VHlwZXMgPSB7XG4gIFwiXCI6IGZvcm1hdERlZmF1bHQsXG4gIFwiJVwiOiBmdW5jdGlvbih4LCBwKSB7IHJldHVybiAoeCAqIDEwMCkudG9GaXhlZChwKTsgfSxcbiAgXCJiXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMik7IH0sXG4gIFwiY1wiOiBmdW5jdGlvbih4KSB7IHJldHVybiB4ICsgXCJcIjsgfSxcbiAgXCJkXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMTApOyB9LFxuICBcImVcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4geC50b0V4cG9uZW50aWFsKHApOyB9LFxuICBcImZcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4geC50b0ZpeGVkKHApOyB9LFxuICBcImdcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4geC50b1ByZWNpc2lvbihwKTsgfSxcbiAgXCJvXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoOCk7IH0sXG4gIFwicFwiOiBmdW5jdGlvbih4LCBwKSB7IHJldHVybiBmb3JtYXRSb3VuZGVkKHggKiAxMDAsIHApOyB9LFxuICBcInJcIjogZm9ybWF0Um91bmRlZCxcbiAgXCJzXCI6IGZvcm1hdFByZWZpeEF1dG8sXG4gIFwiWFwiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpOyB9LFxuICBcInhcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNik7IH1cbn07XG5cbi8vIFtbZmlsbF1hbGlnbl1bc2lnbl1bc3ltYm9sXVswXVt3aWR0aF1bLF1bLnByZWNpc2lvbl1bdHlwZV1cbnZhciByZSA9IC9eKD86KC4pPyhbPD49Xl0pKT8oWytcXC1cXCggXSk/KFskI10pPygwKT8oXFxkKyk/KCwpPyhcXC5cXGQrKT8oW2EteiVdKT8kL2k7XG5cbmZ1bmN0aW9uIGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpIHtcbiAgcmV0dXJuIG5ldyBGb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKTtcbn1cblxuZm9ybWF0U3BlY2lmaWVyLnByb3RvdHlwZSA9IEZvcm1hdFNwZWNpZmllci5wcm90b3R5cGU7IC8vIGluc3RhbmNlb2ZcblxuZnVuY3Rpb24gRm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcikge1xuICBpZiAoIShtYXRjaCA9IHJlLmV4ZWMoc3BlY2lmaWVyKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZm9ybWF0OiBcIiArIHNwZWNpZmllcik7XG5cbiAgdmFyIG1hdGNoLFxuICAgICAgZmlsbCA9IG1hdGNoWzFdIHx8IFwiIFwiLFxuICAgICAgYWxpZ24gPSBtYXRjaFsyXSB8fCBcIj5cIixcbiAgICAgIHNpZ24gPSBtYXRjaFszXSB8fCBcIi1cIixcbiAgICAgIHN5bWJvbCA9IG1hdGNoWzRdIHx8IFwiXCIsXG4gICAgICB6ZXJvID0gISFtYXRjaFs1XSxcbiAgICAgIHdpZHRoID0gbWF0Y2hbNl0gJiYgK21hdGNoWzZdLFxuICAgICAgY29tbWEgPSAhIW1hdGNoWzddLFxuICAgICAgcHJlY2lzaW9uID0gbWF0Y2hbOF0gJiYgK21hdGNoWzhdLnNsaWNlKDEpLFxuICAgICAgdHlwZSA9IG1hdGNoWzldIHx8IFwiXCI7XG5cbiAgLy8gVGhlIFwiblwiIHR5cGUgaXMgYW4gYWxpYXMgZm9yIFwiLGdcIi5cbiAgaWYgKHR5cGUgPT09IFwiblwiKSBjb21tYSA9IHRydWUsIHR5cGUgPSBcImdcIjtcblxuICAvLyBNYXAgaW52YWxpZCB0eXBlcyB0byB0aGUgZGVmYXVsdCBmb3JtYXQuXG4gIGVsc2UgaWYgKCFmb3JtYXRUeXBlc1t0eXBlXSkgdHlwZSA9IFwiXCI7XG5cbiAgLy8gSWYgemVybyBmaWxsIGlzIHNwZWNpZmllZCwgcGFkZGluZyBnb2VzIGFmdGVyIHNpZ24gYW5kIGJlZm9yZSBkaWdpdHMuXG4gIGlmICh6ZXJvIHx8IChmaWxsID09PSBcIjBcIiAmJiBhbGlnbiA9PT0gXCI9XCIpKSB6ZXJvID0gdHJ1ZSwgZmlsbCA9IFwiMFwiLCBhbGlnbiA9IFwiPVwiO1xuXG4gIHRoaXMuZmlsbCA9IGZpbGw7XG4gIHRoaXMuYWxpZ24gPSBhbGlnbjtcbiAgdGhpcy5zaWduID0gc2lnbjtcbiAgdGhpcy5zeW1ib2wgPSBzeW1ib2w7XG4gIHRoaXMuemVybyA9IHplcm87XG4gIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgdGhpcy5jb21tYSA9IGNvbW1hO1xuICB0aGlzLnByZWNpc2lvbiA9IHByZWNpc2lvbjtcbiAgdGhpcy50eXBlID0gdHlwZTtcbn1cblxuRm9ybWF0U3BlY2lmaWVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5maWxsXG4gICAgICArIHRoaXMuYWxpZ25cbiAgICAgICsgdGhpcy5zaWduXG4gICAgICArIHRoaXMuc3ltYm9sXG4gICAgICArICh0aGlzLnplcm8gPyBcIjBcIiA6IFwiXCIpXG4gICAgICArICh0aGlzLndpZHRoID09IG51bGwgPyBcIlwiIDogTWF0aC5tYXgoMSwgdGhpcy53aWR0aCB8IDApKVxuICAgICAgKyAodGhpcy5jb21tYSA/IFwiLFwiIDogXCJcIilcbiAgICAgICsgKHRoaXMucHJlY2lzaW9uID09IG51bGwgPyBcIlwiIDogXCIuXCIgKyBNYXRoLm1heCgwLCB0aGlzLnByZWNpc2lvbiB8IDApKVxuICAgICAgKyB0aGlzLnR5cGU7XG59O1xuXG52YXIgaWRlbnRpdHkgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiB4O1xufTtcblxudmFyIHByZWZpeGVzID0gW1wieVwiLFwielwiLFwiYVwiLFwiZlwiLFwicFwiLFwiblwiLFwiwrVcIixcIm1cIixcIlwiLFwia1wiLFwiTVwiLFwiR1wiLFwiVFwiLFwiUFwiLFwiRVwiLFwiWlwiLFwiWVwiXTtcblxudmFyIGZvcm1hdExvY2FsZSA9IGZ1bmN0aW9uKGxvY2FsZSkge1xuICB2YXIgZ3JvdXAgPSBsb2NhbGUuZ3JvdXBpbmcgJiYgbG9jYWxlLnRob3VzYW5kcyA/IGZvcm1hdEdyb3VwKGxvY2FsZS5ncm91cGluZywgbG9jYWxlLnRob3VzYW5kcykgOiBpZGVudGl0eSxcbiAgICAgIGN1cnJlbmN5ID0gbG9jYWxlLmN1cnJlbmN5LFxuICAgICAgZGVjaW1hbCA9IGxvY2FsZS5kZWNpbWFsLFxuICAgICAgbnVtZXJhbHMgPSBsb2NhbGUubnVtZXJhbHMgPyBmb3JtYXROdW1lcmFscyhsb2NhbGUubnVtZXJhbHMpIDogaWRlbnRpdHksXG4gICAgICBwZXJjZW50ID0gbG9jYWxlLnBlcmNlbnQgfHwgXCIlXCI7XG5cbiAgZnVuY3Rpb24gbmV3Rm9ybWF0KHNwZWNpZmllcikge1xuICAgIHNwZWNpZmllciA9IGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpO1xuXG4gICAgdmFyIGZpbGwgPSBzcGVjaWZpZXIuZmlsbCxcbiAgICAgICAgYWxpZ24gPSBzcGVjaWZpZXIuYWxpZ24sXG4gICAgICAgIHNpZ24gPSBzcGVjaWZpZXIuc2lnbixcbiAgICAgICAgc3ltYm9sID0gc3BlY2lmaWVyLnN5bWJvbCxcbiAgICAgICAgemVybyA9IHNwZWNpZmllci56ZXJvLFxuICAgICAgICB3aWR0aCA9IHNwZWNpZmllci53aWR0aCxcbiAgICAgICAgY29tbWEgPSBzcGVjaWZpZXIuY29tbWEsXG4gICAgICAgIHByZWNpc2lvbiA9IHNwZWNpZmllci5wcmVjaXNpb24sXG4gICAgICAgIHR5cGUgPSBzcGVjaWZpZXIudHlwZTtcblxuICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgIC8vIEZvciBTSS1wcmVmaXgsIHRoZSBzdWZmaXggaXMgbGF6aWx5IGNvbXB1dGVkLlxuICAgIHZhciBwcmVmaXggPSBzeW1ib2wgPT09IFwiJFwiID8gY3VycmVuY3lbMF0gOiBzeW1ib2wgPT09IFwiI1wiICYmIC9bYm94WF0vLnRlc3QodHlwZSkgPyBcIjBcIiArIHR5cGUudG9Mb3dlckNhc2UoKSA6IFwiXCIsXG4gICAgICAgIHN1ZmZpeCA9IHN5bWJvbCA9PT0gXCIkXCIgPyBjdXJyZW5jeVsxXSA6IC9bJXBdLy50ZXN0KHR5cGUpID8gcGVyY2VudCA6IFwiXCI7XG5cbiAgICAvLyBXaGF0IGZvcm1hdCBmdW5jdGlvbiBzaG91bGQgd2UgdXNlP1xuICAgIC8vIElzIHRoaXMgYW4gaW50ZWdlciB0eXBlP1xuICAgIC8vIENhbiB0aGlzIHR5cGUgZ2VuZXJhdGUgZXhwb25lbnRpYWwgbm90YXRpb24/XG4gICAgdmFyIGZvcm1hdFR5cGUgPSBmb3JtYXRUeXBlc1t0eXBlXSxcbiAgICAgICAgbWF5YmVTdWZmaXggPSAhdHlwZSB8fCAvW2RlZmdwcnMlXS8udGVzdCh0eXBlKTtcblxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBwcmVjaXNpb24gaWYgbm90IHNwZWNpZmllZCxcbiAgICAvLyBvciBjbGFtcCB0aGUgc3BlY2lmaWVkIHByZWNpc2lvbiB0byB0aGUgc3VwcG9ydGVkIHJhbmdlLlxuICAgIC8vIEZvciBzaWduaWZpY2FudCBwcmVjaXNpb24sIGl0IG11c3QgYmUgaW4gWzEsIDIxXS5cbiAgICAvLyBGb3IgZml4ZWQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFswLCAyMF0uXG4gICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uID09IG51bGwgPyAodHlwZSA/IDYgOiAxMilcbiAgICAgICAgOiAvW2dwcnNdLy50ZXN0KHR5cGUpID8gTWF0aC5tYXgoMSwgTWF0aC5taW4oMjEsIHByZWNpc2lvbikpXG4gICAgICAgIDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMjAsIHByZWNpc2lvbikpO1xuXG4gICAgZnVuY3Rpb24gZm9ybWF0KHZhbHVlKSB7XG4gICAgICB2YXIgdmFsdWVQcmVmaXggPSBwcmVmaXgsXG4gICAgICAgICAgdmFsdWVTdWZmaXggPSBzdWZmaXgsXG4gICAgICAgICAgaSwgbiwgYztcblxuICAgICAgaWYgKHR5cGUgPT09IFwiY1wiKSB7XG4gICAgICAgIHZhbHVlU3VmZml4ID0gZm9ybWF0VHlwZSh2YWx1ZSkgKyB2YWx1ZVN1ZmZpeDtcbiAgICAgICAgdmFsdWUgPSBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSArdmFsdWU7XG5cbiAgICAgICAgLy8gUGVyZm9ybSB0aGUgaW5pdGlhbCBmb3JtYXR0aW5nLlxuICAgICAgICB2YXIgdmFsdWVOZWdhdGl2ZSA9IHZhbHVlIDwgMDtcbiAgICAgICAgdmFsdWUgPSBmb3JtYXRUeXBlKE1hdGguYWJzKHZhbHVlKSwgcHJlY2lzaW9uKTtcblxuICAgICAgICAvLyBJZiBhIG5lZ2F0aXZlIHZhbHVlIHJvdW5kcyB0byB6ZXJvIGR1cmluZyBmb3JtYXR0aW5nLCB0cmVhdCBhcyBwb3NpdGl2ZS5cbiAgICAgICAgaWYgKHZhbHVlTmVnYXRpdmUgJiYgK3ZhbHVlID09PSAwKSB2YWx1ZU5lZ2F0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgcHJlZml4IGFuZCBzdWZmaXguXG4gICAgICAgIHZhbHVlUHJlZml4ID0gKHZhbHVlTmVnYXRpdmUgPyAoc2lnbiA9PT0gXCIoXCIgPyBzaWduIDogXCItXCIpIDogc2lnbiA9PT0gXCItXCIgfHwgc2lnbiA9PT0gXCIoXCIgPyBcIlwiIDogc2lnbikgKyB2YWx1ZVByZWZpeDtcbiAgICAgICAgdmFsdWVTdWZmaXggPSB2YWx1ZVN1ZmZpeCArICh0eXBlID09PSBcInNcIiA/IHByZWZpeGVzWzggKyBwcmVmaXhFeHBvbmVudCAvIDNdIDogXCJcIikgKyAodmFsdWVOZWdhdGl2ZSAmJiBzaWduID09PSBcIihcIiA/IFwiKVwiIDogXCJcIik7XG5cbiAgICAgICAgLy8gQnJlYWsgdGhlIGZvcm1hdHRlZCB2YWx1ZSBpbnRvIHRoZSBpbnRlZ2VyIOKAnHZhbHVl4oCdIHBhcnQgdGhhdCBjYW4gYmVcbiAgICAgICAgLy8gZ3JvdXBlZCwgYW5kIGZyYWN0aW9uYWwgb3IgZXhwb25lbnRpYWwg4oCcc3VmZml44oCdIHBhcnQgdGhhdCBpcyBub3QuXG4gICAgICAgIGlmIChtYXliZVN1ZmZpeCkge1xuICAgICAgICAgIGkgPSAtMSwgbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgICAgaWYgKGMgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpLCA0OCA+IGMgfHwgYyA+IDU3KSB7XG4gICAgICAgICAgICAgIHZhbHVlU3VmZml4ID0gKGMgPT09IDQ2ID8gZGVjaW1hbCArIHZhbHVlLnNsaWNlKGkgKyAxKSA6IHZhbHVlLnNsaWNlKGkpKSArIHZhbHVlU3VmZml4O1xuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGZpbGwgY2hhcmFjdGVyIGlzIG5vdCBcIjBcIiwgZ3JvdXBpbmcgaXMgYXBwbGllZCBiZWZvcmUgcGFkZGluZy5cbiAgICAgIGlmIChjb21tYSAmJiAhemVybykgdmFsdWUgPSBncm91cCh2YWx1ZSwgSW5maW5pdHkpO1xuXG4gICAgICAvLyBDb21wdXRlIHRoZSBwYWRkaW5nLlxuICAgICAgdmFyIGxlbmd0aCA9IHZhbHVlUHJlZml4Lmxlbmd0aCArIHZhbHVlLmxlbmd0aCArIHZhbHVlU3VmZml4Lmxlbmd0aCxcbiAgICAgICAgICBwYWRkaW5nID0gbGVuZ3RoIDwgd2lkdGggPyBuZXcgQXJyYXkod2lkdGggLSBsZW5ndGggKyAxKS5qb2luKGZpbGwpIDogXCJcIjtcblxuICAgICAgLy8gSWYgdGhlIGZpbGwgY2hhcmFjdGVyIGlzIFwiMFwiLCBncm91cGluZyBpcyBhcHBsaWVkIGFmdGVyIHBhZGRpbmcuXG4gICAgICBpZiAoY29tbWEgJiYgemVybykgdmFsdWUgPSBncm91cChwYWRkaW5nICsgdmFsdWUsIHBhZGRpbmcubGVuZ3RoID8gd2lkdGggLSB2YWx1ZVN1ZmZpeC5sZW5ndGggOiBJbmZpbml0eSksIHBhZGRpbmcgPSBcIlwiO1xuXG4gICAgICAvLyBSZWNvbnN0cnVjdCB0aGUgZmluYWwgb3V0cHV0IGJhc2VkIG9uIHRoZSBkZXNpcmVkIGFsaWdubWVudC5cbiAgICAgIHN3aXRjaCAoYWxpZ24pIHtcbiAgICAgICAgY2FzZSBcIjxcIjogdmFsdWUgPSB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXggKyBwYWRkaW5nOyBicmVhaztcbiAgICAgICAgY2FzZSBcIj1cIjogdmFsdWUgPSB2YWx1ZVByZWZpeCArIHBhZGRpbmcgKyB2YWx1ZSArIHZhbHVlU3VmZml4OyBicmVhaztcbiAgICAgICAgY2FzZSBcIl5cIjogdmFsdWUgPSBwYWRkaW5nLnNsaWNlKDAsIGxlbmd0aCA9IHBhZGRpbmcubGVuZ3RoID4+IDEpICsgdmFsdWVQcmVmaXggKyB2YWx1ZSArIHZhbHVlU3VmZml4ICsgcGFkZGluZy5zbGljZShsZW5ndGgpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDogdmFsdWUgPSBwYWRkaW5nICsgdmFsdWVQcmVmaXggKyB2YWx1ZSArIHZhbHVlU3VmZml4OyBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bWVyYWxzKHZhbHVlKTtcbiAgICB9XG5cbiAgICBmb3JtYXQudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzcGVjaWZpZXIgKyBcIlwiO1xuICAgIH07XG5cbiAgICByZXR1cm4gZm9ybWF0O1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0UHJlZml4KHNwZWNpZmllciwgdmFsdWUpIHtcbiAgICB2YXIgZiA9IG5ld0Zvcm1hdCgoc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllciksIHNwZWNpZmllci50eXBlID0gXCJmXCIsIHNwZWNpZmllcikpLFxuICAgICAgICBlID0gTWF0aC5tYXgoLTgsIE1hdGgubWluKDgsIE1hdGguZmxvb3IoZXhwb25lbnQodmFsdWUpIC8gMykpKSAqIDMsXG4gICAgICAgIGsgPSBNYXRoLnBvdygxMCwgLWUpLFxuICAgICAgICBwcmVmaXggPSBwcmVmaXhlc1s4ICsgZSAvIDNdO1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGYoayAqIHZhbHVlKSArIHByZWZpeDtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmb3JtYXQ6IG5ld0Zvcm1hdCxcbiAgICBmb3JtYXRQcmVmaXg6IGZvcm1hdFByZWZpeFxuICB9O1xufTtcblxudmFyIGxvY2FsZTtcblxuXG5cbmRlZmF1bHRMb2NhbGUoe1xuICBkZWNpbWFsOiBcIi5cIixcbiAgdGhvdXNhbmRzOiBcIixcIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIiRcIiwgXCJcIl1cbn0pO1xuXG5mdW5jdGlvbiBkZWZhdWx0TG9jYWxlKGRlZmluaXRpb24pIHtcbiAgbG9jYWxlID0gZm9ybWF0TG9jYWxlKGRlZmluaXRpb24pO1xuICBleHBvcnRzLmZvcm1hdCA9IGxvY2FsZS5mb3JtYXQ7XG4gIGV4cG9ydHMuZm9ybWF0UHJlZml4ID0gbG9jYWxlLmZvcm1hdFByZWZpeDtcbiAgcmV0dXJuIGxvY2FsZTtcbn1cblxudmFyIHByZWNpc2lvbkZpeGVkID0gZnVuY3Rpb24oc3RlcCkge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgLWV4cG9uZW50KE1hdGguYWJzKHN0ZXApKSk7XG59O1xuXG52YXIgcHJlY2lzaW9uUHJlZml4ID0gZnVuY3Rpb24oc3RlcCwgdmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50KHZhbHVlKSAvIDMpKSkgKiAzIC0gZXhwb25lbnQoTWF0aC5hYnMoc3RlcCkpKTtcbn07XG5cbnZhciBwcmVjaXNpb25Sb3VuZCA9IGZ1bmN0aW9uKHN0ZXAsIG1heCkge1xuICBzdGVwID0gTWF0aC5hYnMoc3RlcCksIG1heCA9IE1hdGguYWJzKG1heCkgLSBzdGVwO1xuICByZXR1cm4gTWF0aC5tYXgoMCwgZXhwb25lbnQobWF4KSAtIGV4cG9uZW50KHN0ZXApKSArIDE7XG59O1xuXG5leHBvcnRzLmZvcm1hdERlZmF1bHRMb2NhbGUgPSBkZWZhdWx0TG9jYWxlO1xuZXhwb3J0cy5mb3JtYXRMb2NhbGUgPSBmb3JtYXRMb2NhbGU7XG5leHBvcnRzLmZvcm1hdFNwZWNpZmllciA9IGZvcm1hdFNwZWNpZmllcjtcbmV4cG9ydHMucHJlY2lzaW9uRml4ZWQgPSBwcmVjaXNpb25GaXhlZDtcbmV4cG9ydHMucHJlY2lzaW9uUHJlZml4ID0gcHJlY2lzaW9uUHJlZml4O1xuZXhwb3J0cy5wcmVjaXNpb25Sb3VuZCA9IHByZWNpc2lvblJvdW5kO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuIiwiLy8gaHR0cHM6Ly9kM2pzLm9yZy9kMy1zZWxlY3Rpb24vIFZlcnNpb24gMS4wLjYuIENvcHlyaWdodCAyMDE3IE1pa2UgQm9zdG9jay5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5kMyA9IGdsb2JhbC5kMyB8fCB7fSkpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIHhodG1sID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI7XG5cbnZhciBuYW1lc3BhY2VzID0ge1xuICBzdmc6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgeGh0bWw6IHhodG1sLFxuICB4bGluazogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsXG4gIHhtbDogXCJodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2VcIixcbiAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIlxufTtcblxudmFyIG5hbWVzcGFjZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIHByZWZpeCA9IG5hbWUgKz0gXCJcIiwgaSA9IHByZWZpeC5pbmRleE9mKFwiOlwiKTtcbiAgaWYgKGkgPj0gMCAmJiAocHJlZml4ID0gbmFtZS5zbGljZSgwLCBpKSkgIT09IFwieG1sbnNcIikgbmFtZSA9IG5hbWUuc2xpY2UoaSArIDEpO1xuICByZXR1cm4gbmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShwcmVmaXgpID8ge3NwYWNlOiBuYW1lc3BhY2VzW3ByZWZpeF0sIGxvY2FsOiBuYW1lfSA6IG5hbWU7XG59O1xuXG5mdW5jdGlvbiBjcmVhdG9ySW5oZXJpdChuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnQsXG4gICAgICAgIHVyaSA9IHRoaXMubmFtZXNwYWNlVVJJO1xuICAgIHJldHVybiB1cmkgPT09IHhodG1sICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IHhodG1sXG4gICAgICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxuICAgICAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh1cmksIG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdG9yRml4ZWQoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbnZhciBjcmVhdG9yID0gZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiAoZnVsbG5hbWUubG9jYWxcbiAgICAgID8gY3JlYXRvckZpeGVkXG4gICAgICA6IGNyZWF0b3JJbmhlcml0KShmdWxsbmFtZSk7XG59O1xuXG52YXIgbmV4dElkID0gMDtcblxuZnVuY3Rpb24gbG9jYWwoKSB7XG4gIHJldHVybiBuZXcgTG9jYWw7XG59XG5cbmZ1bmN0aW9uIExvY2FsKCkge1xuICB0aGlzLl8gPSBcIkBcIiArICgrK25leHRJZCkudG9TdHJpbmcoMzYpO1xufVxuXG5Mb2NhbC5wcm90b3R5cGUgPSBsb2NhbC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBMb2NhbCxcbiAgZ2V0OiBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIGlkID0gdGhpcy5fO1xuICAgIHdoaWxlICghKGlkIGluIG5vZGUpKSBpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkgcmV0dXJuO1xuICAgIHJldHVybiBub2RlW2lkXTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihub2RlLCB2YWx1ZSkge1xuICAgIHJldHVybiBub2RlW3RoaXMuX10gPSB2YWx1ZTtcbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuXyBpbiBub2RlICYmIGRlbGV0ZSBub2RlW3RoaXMuX107XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fO1xuICB9XG59O1xuXG52YXIgbWF0Y2hlciA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgfTtcbn07XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIGlmICghZWxlbWVudC5tYXRjaGVzKSB7XG4gICAgdmFyIHZlbmRvck1hdGNoZXMgPSBlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvclxuICAgICAgICB8fCBlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgIHx8IGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgIHx8IGVsZW1lbnQub01hdGNoZXNTZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZlbmRvck1hdGNoZXMuY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cblxudmFyIG1hdGNoZXIkMSA9IG1hdGNoZXI7XG5cbnZhciBmaWx0ZXJFdmVudHMgPSB7fTtcblxuZXhwb3J0cy5ldmVudCA9IG51bGw7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgdmFyIGVsZW1lbnQkMSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgaWYgKCEoXCJvbm1vdXNlZW50ZXJcIiBpbiBlbGVtZW50JDEpKSB7XG4gICAgZmlsdGVyRXZlbnRzID0ge21vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsIG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIn07XG4gIH1cbn1cblxuZnVuY3Rpb24gZmlsdGVyQ29udGV4dExpc3RlbmVyKGxpc3RlbmVyLCBpbmRleCwgZ3JvdXApIHtcbiAgbGlzdGVuZXIgPSBjb250ZXh0TGlzdGVuZXIobGlzdGVuZXIsIGluZGV4LCBncm91cCk7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciByZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldDtcbiAgICBpZiAoIXJlbGF0ZWQgfHwgKHJlbGF0ZWQgIT09IHRoaXMgJiYgIShyZWxhdGVkLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKHRoaXMpICYgOCkpKSB7XG4gICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbnRleHRMaXN0ZW5lcihsaXN0ZW5lciwgaW5kZXgsIGdyb3VwKSB7XG4gIHJldHVybiBmdW5jdGlvbihldmVudDEpIHtcbiAgICB2YXIgZXZlbnQwID0gZXhwb3J0cy5ldmVudDsgLy8gRXZlbnRzIGNhbiBiZSByZWVudHJhbnQgKGUuZy4sIGZvY3VzKS5cbiAgICBleHBvcnRzLmV2ZW50ID0gZXZlbnQxO1xuICAgIHRyeSB7XG4gICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIHRoaXMuX19kYXRhX18sIGluZGV4LCBncm91cCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGV4cG9ydHMuZXZlbnQgPSBldmVudDA7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvblJlbW92ZSh0eXBlbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uID0gdGhpcy5fX29uO1xuICAgIGlmICghb24pIHJldHVybjtcbiAgICBmb3IgKHZhciBqID0gMCwgaSA9IC0xLCBtID0gb24ubGVuZ3RoLCBvOyBqIDwgbTsgKytqKSB7XG4gICAgICBpZiAobyA9IG9uW2pdLCAoIXR5cGVuYW1lLnR5cGUgfHwgby50eXBlID09PSB0eXBlbmFtZS50eXBlKSAmJiBvLm5hbWUgPT09IHR5cGVuYW1lLm5hbWUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciwgby5jYXB0dXJlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uWysraV0gPSBvO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoKytpKSBvbi5sZW5ndGggPSBpO1xuICAgIGVsc2UgZGVsZXRlIHRoaXMuX19vbjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25BZGQodHlwZW5hbWUsIHZhbHVlLCBjYXB0dXJlKSB7XG4gIHZhciB3cmFwID0gZmlsdGVyRXZlbnRzLmhhc093blByb3BlcnR5KHR5cGVuYW1lLnR5cGUpID8gZmlsdGVyQ29udGV4dExpc3RlbmVyIDogY29udGV4dExpc3RlbmVyO1xuICByZXR1cm4gZnVuY3Rpb24oZCwgaSwgZ3JvdXApIHtcbiAgICB2YXIgb24gPSB0aGlzLl9fb24sIG8sIGxpc3RlbmVyID0gd3JhcCh2YWx1ZSwgaSwgZ3JvdXApO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICAgIGlmICgobyA9IG9uW2pdKS50eXBlID09PSB0eXBlbmFtZS50eXBlICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLmNhcHR1cmUpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyID0gbGlzdGVuZXIsIG8uY2FwdHVyZSA9IGNhcHR1cmUpO1xuICAgICAgICBvLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGVuYW1lLnR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICBvID0ge3R5cGU6IHR5cGVuYW1lLnR5cGUsIG5hbWU6IHR5cGVuYW1lLm5hbWUsIHZhbHVlOiB2YWx1ZSwgbGlzdGVuZXI6IGxpc3RlbmVyLCBjYXB0dXJlOiBjYXB0dXJlfTtcbiAgICBpZiAoIW9uKSB0aGlzLl9fb24gPSBbb107XG4gICAgZWxzZSBvbi5wdXNoKG8pO1xuICB9O1xufVxuXG52YXIgc2VsZWN0aW9uX29uID0gZnVuY3Rpb24odHlwZW5hbWUsIHZhbHVlLCBjYXB0dXJlKSB7XG4gIHZhciB0eXBlbmFtZXMgPSBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZSArIFwiXCIpLCBpLCBuID0gdHlwZW5hbWVzLmxlbmd0aCwgdDtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgb24gPSB0aGlzLm5vZGUoKS5fX29uO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGgsIG87IGogPCBtOyArK2opIHtcbiAgICAgIGZvciAoaSA9IDAsIG8gPSBvbltqXTsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAoKHQgPSB0eXBlbmFtZXNbaV0pLnR5cGUgPT09IG8udHlwZSAmJiB0Lm5hbWUgPT09IG8ubmFtZSkge1xuICAgICAgICAgIHJldHVybiBvLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIG9uID0gdmFsdWUgPyBvbkFkZCA6IG9uUmVtb3ZlO1xuICBpZiAoY2FwdHVyZSA9PSBudWxsKSBjYXB0dXJlID0gZmFsc2U7XG4gIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHRoaXMuZWFjaChvbih0eXBlbmFtZXNbaV0sIHZhbHVlLCBjYXB0dXJlKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gY3VzdG9tRXZlbnQoZXZlbnQxLCBsaXN0ZW5lciwgdGhhdCwgYXJncykge1xuICB2YXIgZXZlbnQwID0gZXhwb3J0cy5ldmVudDtcbiAgZXZlbnQxLnNvdXJjZUV2ZW50ID0gZXhwb3J0cy5ldmVudDtcbiAgZXhwb3J0cy5ldmVudCA9IGV2ZW50MTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJncyk7XG4gIH0gZmluYWxseSB7XG4gICAgZXhwb3J0cy5ldmVudCA9IGV2ZW50MDtcbiAgfVxufVxuXG52YXIgc291cmNlRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGN1cnJlbnQgPSBleHBvcnRzLmV2ZW50LCBzb3VyY2U7XG4gIHdoaWxlIChzb3VyY2UgPSBjdXJyZW50LnNvdXJjZUV2ZW50KSBjdXJyZW50ID0gc291cmNlO1xuICByZXR1cm4gY3VycmVudDtcbn07XG5cbnZhciBwb2ludCA9IGZ1bmN0aW9uKG5vZGUsIGV2ZW50KSB7XG4gIHZhciBzdmcgPSBub2RlLm93bmVyU1ZHRWxlbWVudCB8fCBub2RlO1xuXG4gIGlmIChzdmcuY3JlYXRlU1ZHUG9pbnQpIHtcbiAgICB2YXIgcG9pbnQgPSBzdmcuY3JlYXRlU1ZHUG9pbnQoKTtcbiAgICBwb2ludC54ID0gZXZlbnQuY2xpZW50WCwgcG9pbnQueSA9IGV2ZW50LmNsaWVudFk7XG4gICAgcG9pbnQgPSBwb2ludC5tYXRyaXhUcmFuc2Zvcm0obm9kZS5nZXRTY3JlZW5DVE0oKS5pbnZlcnNlKCkpO1xuICAgIHJldHVybiBbcG9pbnQueCwgcG9pbnQueV07XG4gIH1cblxuICB2YXIgcmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiBbZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCAtIG5vZGUuY2xpZW50TGVmdCwgZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wIC0gbm9kZS5jbGllbnRUb3BdO1xufTtcblxudmFyIG1vdXNlID0gZnVuY3Rpb24obm9kZSkge1xuICB2YXIgZXZlbnQgPSBzb3VyY2VFdmVudCgpO1xuICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIGV2ZW50ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gIHJldHVybiBwb2ludChub2RlLCBldmVudCk7XG59O1xuXG5mdW5jdGlvbiBub25lKCkge31cblxudmFyIHNlbGVjdG9yID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBub25lIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH07XG59O1xuXG52YXIgc2VsZWN0aW9uX3NlbGVjdCA9IGZ1bmN0aW9uKHNlbGVjdCkge1xuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMpO1xufTtcblxuZnVuY3Rpb24gZW1wdHkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxudmFyIHNlbGVjdG9yQWxsID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBlbXB0eSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICB9O1xufTtcblxudmFyIHNlbGVjdGlvbl9zZWxlY3RBbGwgPSBmdW5jdGlvbihzZWxlY3QpIHtcbiAgaWYgKHR5cGVvZiBzZWxlY3QgIT09IFwiZnVuY3Rpb25cIikgc2VsZWN0ID0gc2VsZWN0b3JBbGwoc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBbXSwgcGFyZW50cyA9IFtdLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzdWJncm91cHMucHVzaChzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpO1xuICAgICAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCBwYXJlbnRzKTtcbn07XG5cbnZhciBzZWxlY3Rpb25fZmlsdGVyID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIkMShtYXRjaCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IFtdLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIG1hdGNoLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSB7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzKTtcbn07XG5cbnZhciBzcGFyc2UgPSBmdW5jdGlvbih1cGRhdGUpIHtcbiAgcmV0dXJuIG5ldyBBcnJheSh1cGRhdGUubGVuZ3RoKTtcbn07XG5cbnZhciBzZWxlY3Rpb25fZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZW50ZXIgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn07XG5cbmZ1bmN0aW9uIEVudGVyTm9kZShwYXJlbnQsIGRhdHVtKSB7XG4gIHRoaXMub3duZXJEb2N1bWVudCA9IHBhcmVudC5vd25lckRvY3VtZW50O1xuICB0aGlzLm5hbWVzcGFjZVVSSSA9IHBhcmVudC5uYW1lc3BhY2VVUkk7XG4gIHRoaXMuX25leHQgPSBudWxsO1xuICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX19kYXRhX18gPSBkYXR1bTtcbn1cblxuRW50ZXJOb2RlLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEVudGVyTm9kZSxcbiAgYXBwZW5kQ2hpbGQ6IGZ1bmN0aW9uKGNoaWxkKSB7IHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCB0aGlzLl9uZXh0KTsgfSxcbiAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbihjaGlsZCwgbmV4dCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbmV4dCk7IH0sXG4gIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbn07XG5cbnZhciBjb25zdGFudCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufTtcblxudmFyIGtleVByZWZpeCA9IFwiJFwiOyAvLyBQcm90ZWN0IGFnYWluc3Qga2V5cyBsaWtlIOKAnF9fcHJvdG9fX+KAnS5cblxuZnVuY3Rpb24gYmluZEluZGV4KHBhcmVudCwgZ3JvdXAsIGVudGVyLCB1cGRhdGUsIGV4aXQsIGRhdGEpIHtcbiAgdmFyIGkgPSAwLFxuICAgICAgbm9kZSxcbiAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXG4gIC8vIFB1dCBhbnkgbm9uLW51bGwgbm9kZXMgdGhhdCBmaXQgaW50byB1cGRhdGUuXG4gIC8vIFB1dCBhbnkgbnVsbCBub2RlcyBpbnRvIGVudGVyLlxuICAvLyBQdXQgYW55IHJlbWFpbmluZyBkYXRhIGludG8gZW50ZXIuXG4gIGZvciAoOyBpIDwgZGF0YUxlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgbm9kZS5fX2RhdGFfXyA9IGRhdGFbaV07XG4gICAgICB1cGRhdGVbaV0gPSBub2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbnRlcltpXSA9IG5ldyBFbnRlck5vZGUocGFyZW50LCBkYXRhW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBQdXQgYW55IG5vbi1udWxsIG5vZGVzIHRoYXQgZG9u4oCZdCBmaXQgaW50byBleGl0LlxuICBmb3IgKDsgaSA8IGdyb3VwTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICBleGl0W2ldID0gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYmluZEtleShwYXJlbnQsIGdyb3VwLCBlbnRlciwgdXBkYXRlLCBleGl0LCBkYXRhLCBrZXkpIHtcbiAgdmFyIGksXG4gICAgICBub2RlLFxuICAgICAgbm9kZUJ5S2V5VmFsdWUgPSB7fSxcbiAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAga2V5VmFsdWVzID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKSxcbiAgICAgIGtleVZhbHVlO1xuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBub2RlLlxuICAvLyBJZiBtdWx0aXBsZSBub2RlcyBoYXZlIHRoZSBzYW1lIGtleSwgdGhlIGR1cGxpY2F0ZXMgYXJlIGFkZGVkIHRvIGV4aXQuXG4gIGZvciAoaSA9IDA7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAga2V5VmFsdWVzW2ldID0ga2V5VmFsdWUgPSBrZXlQcmVmaXggKyBrZXkuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCk7XG4gICAgICBpZiAoa2V5VmFsdWUgaW4gbm9kZUJ5S2V5VmFsdWUpIHtcbiAgICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlQnlLZXlWYWx1ZVtrZXlWYWx1ZV0gPSBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBkYXR1bS5cbiAgLy8gSWYgdGhlcmUgYSBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGtleSwgam9pbiBhbmQgYWRkIGl0IHRvIHVwZGF0ZS5cbiAgLy8gSWYgdGhlcmUgaXMgbm90IChvciB0aGUga2V5IGlzIGEgZHVwbGljYXRlKSwgYWRkIGl0IHRvIGVudGVyLlxuICBmb3IgKGkgPSAwOyBpIDwgZGF0YUxlbmd0aDsgKytpKSB7XG4gICAga2V5VmFsdWUgPSBrZXlQcmVmaXggKyBrZXkuY2FsbChwYXJlbnQsIGRhdGFbaV0sIGksIGRhdGEpO1xuICAgIGlmIChub2RlID0gbm9kZUJ5S2V5VmFsdWVba2V5VmFsdWVdKSB7XG4gICAgICB1cGRhdGVbaV0gPSBub2RlO1xuICAgICAgbm9kZS5fX2RhdGFfXyA9IGRhdGFbaV07XG4gICAgICBub2RlQnlLZXlWYWx1ZVtrZXlWYWx1ZV0gPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbnRlcltpXSA9IG5ldyBFbnRlck5vZGUocGFyZW50LCBkYXRhW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgYW55IHJlbWFpbmluZyBub2RlcyB0aGF0IHdlcmUgbm90IGJvdW5kIHRvIGRhdGEgdG8gZXhpdC5cbiAgZm9yIChpID0gMDsgaSA8IGdyb3VwTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKG5vZGVCeUtleVZhbHVlW2tleVZhbHVlc1tpXV0gPT09IG5vZGUpKSB7XG4gICAgICBleGl0W2ldID0gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHNlbGVjdGlvbl9kYXRhID0gZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgZGF0YSA9IG5ldyBBcnJheSh0aGlzLnNpemUoKSksIGogPSAtMTtcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oZCkgeyBkYXRhWysral0gPSBkOyB9KTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHZhciBiaW5kID0ga2V5ID8gYmluZEtleSA6IGJpbmRJbmRleCxcbiAgICAgIHBhcmVudHMgPSB0aGlzLl9wYXJlbnRzLFxuICAgICAgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdmFsdWUgPSBjb25zdGFudCh2YWx1ZSk7XG5cbiAgZm9yICh2YXIgbSA9IGdyb3Vwcy5sZW5ndGgsIHVwZGF0ZSA9IG5ldyBBcnJheShtKSwgZW50ZXIgPSBuZXcgQXJyYXkobSksIGV4aXQgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgdmFyIHBhcmVudCA9IHBhcmVudHNbal0sXG4gICAgICAgIGdyb3VwID0gZ3JvdXBzW2pdLFxuICAgICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgICAgZGF0YSA9IHZhbHVlLmNhbGwocGFyZW50LCBwYXJlbnQgJiYgcGFyZW50Ll9fZGF0YV9fLCBqLCBwYXJlbnRzKSxcbiAgICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAgICBlbnRlckdyb3VwID0gZW50ZXJbal0gPSBuZXcgQXJyYXkoZGF0YUxlbmd0aCksXG4gICAgICAgIHVwZGF0ZUdyb3VwID0gdXBkYXRlW2pdID0gbmV3IEFycmF5KGRhdGFMZW5ndGgpLFxuICAgICAgICBleGl0R3JvdXAgPSBleGl0W2pdID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKTtcblxuICAgIGJpbmQocGFyZW50LCBncm91cCwgZW50ZXJHcm91cCwgdXBkYXRlR3JvdXAsIGV4aXRHcm91cCwgZGF0YSwga2V5KTtcblxuICAgIC8vIE5vdyBjb25uZWN0IHRoZSBlbnRlciBub2RlcyB0byB0aGVpciBmb2xsb3dpbmcgdXBkYXRlIG5vZGUsIHN1Y2ggdGhhdFxuICAgIC8vIGFwcGVuZENoaWxkIGNhbiBpbnNlcnQgdGhlIG1hdGVyaWFsaXplZCBlbnRlciBub2RlIGJlZm9yZSB0aGlzIG5vZGUsXG4gICAgLy8gcmF0aGVyIHRoYW4gYXQgdGhlIGVuZCBvZiB0aGUgcGFyZW50IG5vZGUuXG4gICAgZm9yICh2YXIgaTAgPSAwLCBpMSA9IDAsIHByZXZpb3VzLCBuZXh0OyBpMCA8IGRhdGFMZW5ndGg7ICsraTApIHtcbiAgICAgIGlmIChwcmV2aW91cyA9IGVudGVyR3JvdXBbaTBdKSB7XG4gICAgICAgIGlmIChpMCA+PSBpMSkgaTEgPSBpMCArIDE7XG4gICAgICAgIHdoaWxlICghKG5leHQgPSB1cGRhdGVHcm91cFtpMV0pICYmICsraTEgPCBkYXRhTGVuZ3RoKTtcbiAgICAgICAgcHJldmlvdXMuX25leHQgPSBuZXh0IHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlID0gbmV3IFNlbGVjdGlvbih1cGRhdGUsIHBhcmVudHMpO1xuICB1cGRhdGUuX2VudGVyID0gZW50ZXI7XG4gIHVwZGF0ZS5fZXhpdCA9IGV4aXQ7XG4gIHJldHVybiB1cGRhdGU7XG59O1xuXG52YXIgc2VsZWN0aW9uX2V4aXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZXhpdCB8fCB0aGlzLl9ncm91cHMubWFwKHNwYXJzZSksIHRoaXMuX3BhcmVudHMpO1xufTtcblxudmFyIHNlbGVjdGlvbl9tZXJnZSA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuXG4gIGZvciAodmFyIGdyb3VwczAgPSB0aGlzLl9ncm91cHMsIGdyb3VwczEgPSBzZWxlY3Rpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24obWVyZ2VzLCB0aGlzLl9wYXJlbnRzKTtcbn07XG5cbnZhciBzZWxlY3Rpb25fb3JkZXIgPSBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAtMSwgbSA9IGdyb3Vwcy5sZW5ndGg7ICsraiA8IG07KSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSBncm91cC5sZW5ndGggLSAxLCBuZXh0ID0gZ3JvdXBbaV0sIG5vZGU7IC0taSA+PSAwOykge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBpZiAobmV4dCAmJiBuZXh0ICE9PSBub2RlLm5leHRTaWJsaW5nKSBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpO1xuICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnZhciBzZWxlY3Rpb25fc29ydCA9IGZ1bmN0aW9uKGNvbXBhcmUpIHtcbiAgaWYgKCFjb21wYXJlKSBjb21wYXJlID0gYXNjZW5kaW5nO1xuXG4gIGZ1bmN0aW9uIGNvbXBhcmVOb2RlKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gY29tcGFyZShhLl9fZGF0YV9fLCBiLl9fZGF0YV9fKSA6ICFhIC0gIWI7XG4gIH1cblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzb3J0Z3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzb3J0Z3JvdXAgPSBzb3J0Z3JvdXBzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzb3J0Z3JvdXBbaV0gPSBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3J0Z3JvdXAuc29ydChjb21wYXJlTm9kZSk7XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzb3J0Z3JvdXBzLCB0aGlzLl9wYXJlbnRzKS5vcmRlcigpO1xufTtcblxuZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHtcbiAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiBhID49IGIgPyAwIDogTmFOO1xufVxuXG52YXIgc2VsZWN0aW9uX2NhbGwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzBdO1xuICBhcmd1bWVudHNbMF0gPSB0aGlzO1xuICBjYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnZhciBzZWxlY3Rpb25fbm9kZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG5vZGVzID0gbmV3IEFycmF5KHRoaXMuc2l6ZSgpKSwgaSA9IC0xO1xuICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7IG5vZGVzWysraV0gPSB0aGlzOyB9KTtcbiAgcmV0dXJuIG5vZGVzO1xufTtcblxudmFyIHNlbGVjdGlvbl9ub2RlID0gZnVuY3Rpb24oKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIHZhciBub2RlID0gZ3JvdXBbaV07XG4gICAgICBpZiAobm9kZSkgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG52YXIgc2VsZWN0aW9uX3NpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNpemUgPSAwO1xuICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7ICsrc2l6ZTsgfSk7XG4gIHJldHVybiBzaXplO1xufTtcblxudmFyIHNlbGVjdGlvbl9lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gIXRoaXMubm9kZSgpO1xufTtcblxudmFyIHNlbGVjdGlvbl9lYWNoID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkgY2FsbGJhY2suY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlTlMoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50KG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudE5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uTlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIHYpO1xuICB9O1xufVxuXG52YXIgc2VsZWN0aW9uX2F0dHIgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUoKTtcbiAgICByZXR1cm4gZnVsbG5hbWUubG9jYWxcbiAgICAgICAgPyBub2RlLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbClcbiAgICAgICAgOiBub2RlLmdldEF0dHJpYnV0ZShmdWxsbmFtZSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJSZW1vdmVOUyA6IGF0dHJSZW1vdmUpIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJGdW5jdGlvbk5TIDogYXR0ckZ1bmN0aW9uKVxuICAgICAgOiAoZnVsbG5hbWUubG9jYWwgPyBhdHRyQ29uc3RhbnROUyA6IGF0dHJDb25zdGFudCkpKShmdWxsbmFtZSwgdmFsdWUpKTtcbn07XG5cbnZhciBkZWZhdWx0VmlldyA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgcmV0dXJuIChub2RlLm93bmVyRG9jdW1lbnQgJiYgbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSAvLyBub2RlIGlzIGEgTm9kZVxuICAgICAgfHwgKG5vZGUuZG9jdW1lbnQgJiYgbm9kZSkgLy8gbm9kZSBpcyBhIFdpbmRvd1xuICAgICAgfHwgbm9kZS5kZWZhdWx0VmlldzsgLy8gbm9kZSBpcyBhIERvY3VtZW50XG59O1xuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gICAgZWxzZSB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHYsIHByaW9yaXR5KTtcbiAgfTtcbn1cblxudmFyIHNlbGVjdGlvbl9zdHlsZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgbm9kZTtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgICAgPyBzdHlsZVJlbW92ZSA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICA/IHN0eWxlRnVuY3Rpb25cbiAgICAgICAgICAgIDogc3R5bGVDb25zdGFudCkobmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKVxuICAgICAgOiBkZWZhdWx0Vmlldyhub2RlID0gdGhpcy5ub2RlKCkpXG4gICAgICAgICAgLmdldENvbXB1dGVkU3R5bGUobm9kZSwgbnVsbClcbiAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTtcbn07XG5cbmZ1bmN0aW9uIHByb3BlcnR5UmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSB0aGlzW25hbWVdO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUNvbnN0YW50KG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzW25hbWVdID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByb3BlcnR5RnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSBkZWxldGUgdGhpc1tuYW1lXTtcbiAgICBlbHNlIHRoaXNbbmFtZV0gPSB2O1xuICB9O1xufVxuXG52YXIgc2VsZWN0aW9uX3Byb3BlcnR5ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gcHJvcGVydHlSZW1vdmUgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gcHJvcGVydHlGdW5jdGlvblxuICAgICAgICAgIDogcHJvcGVydHlDb25zdGFudCkobmFtZSwgdmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKVtuYW1lXTtcbn07XG5cbmZ1bmN0aW9uIGNsYXNzQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudHJpbSgpLnNwbGl0KC9efFxccysvKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NMaXN0KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuY2xhc3NMaXN0IHx8IG5ldyBDbGFzc0xpc3Qobm9kZSk7XG59XG5cbmZ1bmN0aW9uIENsYXNzTGlzdChub2RlKSB7XG4gIHRoaXMuX25vZGUgPSBub2RlO1xuICB0aGlzLl9uYW1lcyA9IGNsYXNzQXJyYXkobm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKTtcbn1cblxuQ2xhc3NMaXN0LnByb3RvdHlwZSA9IHtcbiAgYWRkOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpIDwgMCkge1xuICAgICAgdGhpcy5fbmFtZXMucHVzaChuYW1lKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHRoaXMuX25hbWVzLnNwbGljZShpLCAxKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgY29udGFpbnM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKSA+PSAwO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjbGFzc2VkQWRkKG5vZGUsIG5hbWVzKSB7XG4gIHZhciBsaXN0ID0gY2xhc3NMaXN0KG5vZGUpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBsaXN0LmFkZChuYW1lc1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRSZW1vdmUobm9kZSwgbmFtZXMpIHtcbiAgdmFyIGxpc3QgPSBjbGFzc0xpc3Qobm9kZSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IG4pIGxpc3QucmVtb3ZlKG5hbWVzW2ldKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZFRydWUobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRBZGQodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRmFsc2UobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRSZW1vdmUodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRnVuY3Rpb24obmFtZXMsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAodmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA/IGNsYXNzZWRBZGQgOiBjbGFzc2VkUmVtb3ZlKSh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbnZhciBzZWxlY3Rpb25fY2xhc3NlZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBuYW1lcyA9IGNsYXNzQXJyYXkobmFtZSArIFwiXCIpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBsaXN0ID0gY2xhc3NMaXN0KHRoaXMubm9kZSgpKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWxpc3QuY29udGFpbnMobmFtZXNbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBjbGFzc2VkRnVuY3Rpb24gOiB2YWx1ZVxuICAgICAgPyBjbGFzc2VkVHJ1ZVxuICAgICAgOiBjbGFzc2VkRmFsc2UpKG5hbWVzLCB2YWx1ZSkpO1xufTtcblxuZnVuY3Rpb24gdGV4dFJlbW92ZSgpIHtcbiAgdGhpcy50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIHRleHRDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gIH07XG59XG5cbnZhciBzZWxlY3Rpb25fdGV4dCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyB0ZXh0UmVtb3ZlIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyB0ZXh0RnVuY3Rpb25cbiAgICAgICAgICA6IHRleHRDb25zdGFudCkodmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKS50ZXh0Q29udGVudDtcbn07XG5cbmZ1bmN0aW9uIGh0bWxSZW1vdmUoKSB7XG4gIHRoaXMuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gaHRtbENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBodG1sRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmlubmVySFRNTCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICB9O1xufVxuXG52YXIgc2VsZWN0aW9uX2h0bWwgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gaHRtbFJlbW92ZSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gaHRtbEZ1bmN0aW9uXG4gICAgICAgICAgOiBodG1sQ29uc3RhbnQpKHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKCkuaW5uZXJIVE1MO1xufTtcblxuZnVuY3Rpb24gcmFpc2UoKSB7XG4gIGlmICh0aGlzLm5leHRTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcyk7XG59XG5cbnZhciBzZWxlY3Rpb25fcmFpc2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChyYWlzZSk7XG59O1xuXG5mdW5jdGlvbiBsb3dlcigpIHtcbiAgaWYgKHRoaXMucHJldmlvdXNTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMsIHRoaXMucGFyZW50Tm9kZS5maXJzdENoaWxkKTtcbn1cblxudmFyIHNlbGVjdGlvbl9sb3dlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKGxvd2VyKTtcbn07XG5cbnZhciBzZWxlY3Rpb25fYXBwZW5kID0gZnVuY3Rpb24obmFtZSkge1xuICB2YXIgY3JlYXRlID0gdHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIiA/IG5hbWUgOiBjcmVhdG9yKG5hbWUpO1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kQ2hpbGQoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNvbnN0YW50TnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbnZhciBzZWxlY3Rpb25faW5zZXJ0ID0gZnVuY3Rpb24obmFtZSwgYmVmb3JlKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSksXG4gICAgICBzZWxlY3QgPSBiZWZvcmUgPT0gbnVsbCA/IGNvbnN0YW50TnVsbCA6IHR5cGVvZiBiZWZvcmUgPT09IFwiZnVuY3Rpb25cIiA/IGJlZm9yZSA6IHNlbGVjdG9yKGJlZm9yZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IG51bGwpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufVxuXG52YXIgc2VsZWN0aW9uX3JlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKHJlbW92ZSk7XG59O1xuXG52YXIgc2VsZWN0aW9uX2RhdHVtID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5wcm9wZXJ0eShcIl9fZGF0YV9fXCIsIHZhbHVlKVxuICAgICAgOiB0aGlzLm5vZGUoKS5fX2RhdGFfXztcbn07XG5cbmZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQobm9kZSwgdHlwZSwgcGFyYW1zKSB7XG4gIHZhciB3aW5kb3cgPSBkZWZhdWx0Vmlldyhub2RlKSxcbiAgICAgIGV2ZW50ID0gd2luZG93LkN1c3RvbUV2ZW50O1xuXG4gIGlmICh0eXBlb2YgZXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50ID0gbmV3IGV2ZW50KHR5cGUsIHBhcmFtcyk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudFwiKTtcbiAgICBpZiAocGFyYW1zKSBldmVudC5pbml0RXZlbnQodHlwZSwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlKSwgZXZlbnQuZGV0YWlsID0gcGFyYW1zLmRldGFpbDtcbiAgICBlbHNlIGV2ZW50LmluaXRFdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hDb25zdGFudCh0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KHRoaXMsIHR5cGUsIHBhcmFtcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoRnVuY3Rpb24odHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hFdmVudCh0aGlzLCB0eXBlLCBwYXJhbXMuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbnZhciBzZWxlY3Rpb25fZGlzcGF0Y2ggPSBmdW5jdGlvbih0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaCgodHlwZW9mIHBhcmFtcyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IGRpc3BhdGNoRnVuY3Rpb25cbiAgICAgIDogZGlzcGF0Y2hDb25zdGFudCkodHlwZSwgcGFyYW1zKSk7XG59O1xuXG52YXIgcm9vdCA9IFtudWxsXTtcblxuZnVuY3Rpb24gU2VsZWN0aW9uKGdyb3VwcywgcGFyZW50cykge1xuICB0aGlzLl9ncm91cHMgPSBncm91cHM7XG4gIHRoaXMuX3BhcmVudHMgPSBwYXJlbnRzO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKFtbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XV0sIHJvb3QpO1xufVxuXG5TZWxlY3Rpb24ucHJvdG90eXBlID0gc2VsZWN0aW9uLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFNlbGVjdGlvbixcbiAgc2VsZWN0OiBzZWxlY3Rpb25fc2VsZWN0LFxuICBzZWxlY3RBbGw6IHNlbGVjdGlvbl9zZWxlY3RBbGwsXG4gIGZpbHRlcjogc2VsZWN0aW9uX2ZpbHRlcixcbiAgZGF0YTogc2VsZWN0aW9uX2RhdGEsXG4gIGVudGVyOiBzZWxlY3Rpb25fZW50ZXIsXG4gIGV4aXQ6IHNlbGVjdGlvbl9leGl0LFxuICBtZXJnZTogc2VsZWN0aW9uX21lcmdlLFxuICBvcmRlcjogc2VsZWN0aW9uX29yZGVyLFxuICBzb3J0OiBzZWxlY3Rpb25fc29ydCxcbiAgY2FsbDogc2VsZWN0aW9uX2NhbGwsXG4gIG5vZGVzOiBzZWxlY3Rpb25fbm9kZXMsXG4gIG5vZGU6IHNlbGVjdGlvbl9ub2RlLFxuICBzaXplOiBzZWxlY3Rpb25fc2l6ZSxcbiAgZW1wdHk6IHNlbGVjdGlvbl9lbXB0eSxcbiAgZWFjaDogc2VsZWN0aW9uX2VhY2gsXG4gIGF0dHI6IHNlbGVjdGlvbl9hdHRyLFxuICBzdHlsZTogc2VsZWN0aW9uX3N0eWxlLFxuICBwcm9wZXJ0eTogc2VsZWN0aW9uX3Byb3BlcnR5LFxuICBjbGFzc2VkOiBzZWxlY3Rpb25fY2xhc3NlZCxcbiAgdGV4dDogc2VsZWN0aW9uX3RleHQsXG4gIGh0bWw6IHNlbGVjdGlvbl9odG1sLFxuICByYWlzZTogc2VsZWN0aW9uX3JhaXNlLFxuICBsb3dlcjogc2VsZWN0aW9uX2xvd2VyLFxuICBhcHBlbmQ6IHNlbGVjdGlvbl9hcHBlbmQsXG4gIGluc2VydDogc2VsZWN0aW9uX2luc2VydCxcbiAgcmVtb3ZlOiBzZWxlY3Rpb25fcmVtb3ZlLFxuICBkYXR1bTogc2VsZWN0aW9uX2RhdHVtLFxuICBvbjogc2VsZWN0aW9uX29uLFxuICBkaXNwYXRjaDogc2VsZWN0aW9uX2Rpc3BhdGNoXG59O1xuXG52YXIgc2VsZWN0ID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBuZXcgU2VsZWN0aW9uKFtbZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcildXSwgW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudF0pXG4gICAgICA6IG5ldyBTZWxlY3Rpb24oW1tzZWxlY3Rvcl1dLCByb290KTtcbn07XG5cbnZhciBzZWxlY3RBbGwgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiXG4gICAgICA/IG5ldyBTZWxlY3Rpb24oW2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXSwgW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudF0pXG4gICAgICA6IG5ldyBTZWxlY3Rpb24oW3NlbGVjdG9yID09IG51bGwgPyBbXSA6IHNlbGVjdG9yXSwgcm9vdCk7XG59O1xuXG52YXIgdG91Y2ggPSBmdW5jdGlvbihub2RlLCB0b3VjaGVzLCBpZGVudGlmaWVyKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykgaWRlbnRpZmllciA9IHRvdWNoZXMsIHRvdWNoZXMgPSBzb3VyY2VFdmVudCgpLmNoYW5nZWRUb3VjaGVzO1xuXG4gIGZvciAodmFyIGkgPSAwLCBuID0gdG91Y2hlcyA/IHRvdWNoZXMubGVuZ3RoIDogMCwgdG91Y2g7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAoKHRvdWNoID0gdG91Y2hlc1tpXSkuaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIHBvaW50KG5vZGUsIHRvdWNoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbnZhciB0b3VjaGVzID0gZnVuY3Rpb24obm9kZSwgdG91Y2hlcykge1xuICBpZiAodG91Y2hlcyA9PSBudWxsKSB0b3VjaGVzID0gc291cmNlRXZlbnQoKS50b3VjaGVzO1xuXG4gIGZvciAodmFyIGkgPSAwLCBuID0gdG91Y2hlcyA/IHRvdWNoZXMubGVuZ3RoIDogMCwgcG9pbnRzID0gbmV3IEFycmF5KG4pOyBpIDwgbjsgKytpKSB7XG4gICAgcG9pbnRzW2ldID0gcG9pbnQobm9kZSwgdG91Y2hlc1tpXSk7XG4gIH1cblxuICByZXR1cm4gcG9pbnRzO1xufTtcblxuZXhwb3J0cy5jcmVhdG9yID0gY3JlYXRvcjtcbmV4cG9ydHMubG9jYWwgPSBsb2NhbDtcbmV4cG9ydHMubWF0Y2hlciA9IG1hdGNoZXIkMTtcbmV4cG9ydHMubW91c2UgPSBtb3VzZTtcbmV4cG9ydHMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuZXhwb3J0cy5uYW1lc3BhY2VzID0gbmFtZXNwYWNlcztcbmV4cG9ydHMuc2VsZWN0ID0gc2VsZWN0O1xuZXhwb3J0cy5zZWxlY3RBbGwgPSBzZWxlY3RBbGw7XG5leHBvcnRzLnNlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbmV4cG9ydHMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbmV4cG9ydHMuc2VsZWN0b3JBbGwgPSBzZWxlY3RvckFsbDtcbmV4cG9ydHMudG91Y2ggPSB0b3VjaDtcbmV4cG9ydHMudG91Y2hlcyA9IHRvdWNoZXM7XG5leHBvcnRzLndpbmRvdyA9IGRlZmF1bHRWaWV3O1xuZXhwb3J0cy5jdXN0b21FdmVudCA9IGN1c3RvbUV2ZW50O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuIiwiLy8gaHR0cHM6Ly9kM2pzLm9yZy9kMy10aW1lLWZvcm1hdC8gVmVyc2lvbiAyLjAuNS4gQ29weXJpZ2h0IDIwMTcgTWlrZSBCb3N0b2NrLlxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCdkMy10aW1lJykpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cycsICdkMy10aW1lJ10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5kMyA9IGdsb2JhbC5kMyB8fCB7fSksZ2xvYmFsLmQzKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cyxkM1RpbWUpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBsb2NhbERhdGUoZCkge1xuICBpZiAoMCA8PSBkLnkgJiYgZC55IDwgMTAwKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgtMSwgZC5tLCBkLmQsIGQuSCwgZC5NLCBkLlMsIGQuTCk7XG4gICAgZGF0ZS5zZXRGdWxsWWVhcihkLnkpO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG4gIHJldHVybiBuZXcgRGF0ZShkLnksIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpO1xufVxuXG5mdW5jdGlvbiB1dGNEYXRlKGQpIHtcbiAgaWYgKDAgPD0gZC55ICYmIGQueSA8IDEwMCkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoLTEsIGQubSwgZC5kLCBkLkgsIGQuTSwgZC5TLCBkLkwpKTtcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGQueSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbiAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKGQueSwgZC5tLCBkLmQsIGQuSCwgZC5NLCBkLlMsIGQuTCkpO1xufVxuXG5mdW5jdGlvbiBuZXdZZWFyKHkpIHtcbiAgcmV0dXJuIHt5OiB5LCBtOiAwLCBkOiAxLCBIOiAwLCBNOiAwLCBTOiAwLCBMOiAwfTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0TG9jYWxlKGxvY2FsZSkge1xuICB2YXIgbG9jYWxlX2RhdGVUaW1lID0gbG9jYWxlLmRhdGVUaW1lLFxuICAgICAgbG9jYWxlX2RhdGUgPSBsb2NhbGUuZGF0ZSxcbiAgICAgIGxvY2FsZV90aW1lID0gbG9jYWxlLnRpbWUsXG4gICAgICBsb2NhbGVfcGVyaW9kcyA9IGxvY2FsZS5wZXJpb2RzLFxuICAgICAgbG9jYWxlX3dlZWtkYXlzID0gbG9jYWxlLmRheXMsXG4gICAgICBsb2NhbGVfc2hvcnRXZWVrZGF5cyA9IGxvY2FsZS5zaG9ydERheXMsXG4gICAgICBsb2NhbGVfbW9udGhzID0gbG9jYWxlLm1vbnRocyxcbiAgICAgIGxvY2FsZV9zaG9ydE1vbnRocyA9IGxvY2FsZS5zaG9ydE1vbnRocztcblxuICB2YXIgcGVyaW9kUmUgPSBmb3JtYXRSZShsb2NhbGVfcGVyaW9kcyksXG4gICAgICBwZXJpb2RMb29rdXAgPSBmb3JtYXRMb29rdXAobG9jYWxlX3BlcmlvZHMpLFxuICAgICAgd2Vla2RheVJlID0gZm9ybWF0UmUobG9jYWxlX3dlZWtkYXlzKSxcbiAgICAgIHdlZWtkYXlMb29rdXAgPSBmb3JtYXRMb29rdXAobG9jYWxlX3dlZWtkYXlzKSxcbiAgICAgIHNob3J0V2Vla2RheVJlID0gZm9ybWF0UmUobG9jYWxlX3Nob3J0V2Vla2RheXMpLFxuICAgICAgc2hvcnRXZWVrZGF5TG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9zaG9ydFdlZWtkYXlzKSxcbiAgICAgIG1vbnRoUmUgPSBmb3JtYXRSZShsb2NhbGVfbW9udGhzKSxcbiAgICAgIG1vbnRoTG9va3VwID0gZm9ybWF0TG9va3VwKGxvY2FsZV9tb250aHMpLFxuICAgICAgc2hvcnRNb250aFJlID0gZm9ybWF0UmUobG9jYWxlX3Nob3J0TW9udGhzKSxcbiAgICAgIHNob3J0TW9udGhMb29rdXAgPSBmb3JtYXRMb29rdXAobG9jYWxlX3Nob3J0TW9udGhzKTtcblxuICB2YXIgZm9ybWF0cyA9IHtcbiAgICBcImFcIjogZm9ybWF0U2hvcnRXZWVrZGF5LFxuICAgIFwiQVwiOiBmb3JtYXRXZWVrZGF5LFxuICAgIFwiYlwiOiBmb3JtYXRTaG9ydE1vbnRoLFxuICAgIFwiQlwiOiBmb3JtYXRNb250aCxcbiAgICBcImNcIjogbnVsbCxcbiAgICBcImRcIjogZm9ybWF0RGF5T2ZNb250aCxcbiAgICBcImVcIjogZm9ybWF0RGF5T2ZNb250aCxcbiAgICBcIkhcIjogZm9ybWF0SG91cjI0LFxuICAgIFwiSVwiOiBmb3JtYXRIb3VyMTIsXG4gICAgXCJqXCI6IGZvcm1hdERheU9mWWVhcixcbiAgICBcIkxcIjogZm9ybWF0TWlsbGlzZWNvbmRzLFxuICAgIFwibVwiOiBmb3JtYXRNb250aE51bWJlcixcbiAgICBcIk1cIjogZm9ybWF0TWludXRlcyxcbiAgICBcInBcIjogZm9ybWF0UGVyaW9kLFxuICAgIFwiU1wiOiBmb3JtYXRTZWNvbmRzLFxuICAgIFwiVVwiOiBmb3JtYXRXZWVrTnVtYmVyU3VuZGF5LFxuICAgIFwid1wiOiBmb3JtYXRXZWVrZGF5TnVtYmVyLFxuICAgIFwiV1wiOiBmb3JtYXRXZWVrTnVtYmVyTW9uZGF5LFxuICAgIFwieFwiOiBudWxsLFxuICAgIFwiWFwiOiBudWxsLFxuICAgIFwieVwiOiBmb3JtYXRZZWFyLFxuICAgIFwiWVwiOiBmb3JtYXRGdWxsWWVhcixcbiAgICBcIlpcIjogZm9ybWF0Wm9uZSxcbiAgICBcIiVcIjogZm9ybWF0TGl0ZXJhbFBlcmNlbnRcbiAgfTtcblxuICB2YXIgdXRjRm9ybWF0cyA9IHtcbiAgICBcImFcIjogZm9ybWF0VVRDU2hvcnRXZWVrZGF5LFxuICAgIFwiQVwiOiBmb3JtYXRVVENXZWVrZGF5LFxuICAgIFwiYlwiOiBmb3JtYXRVVENTaG9ydE1vbnRoLFxuICAgIFwiQlwiOiBmb3JtYXRVVENNb250aCxcbiAgICBcImNcIjogbnVsbCxcbiAgICBcImRcIjogZm9ybWF0VVRDRGF5T2ZNb250aCxcbiAgICBcImVcIjogZm9ybWF0VVRDRGF5T2ZNb250aCxcbiAgICBcIkhcIjogZm9ybWF0VVRDSG91cjI0LFxuICAgIFwiSVwiOiBmb3JtYXRVVENIb3VyMTIsXG4gICAgXCJqXCI6IGZvcm1hdFVUQ0RheU9mWWVhcixcbiAgICBcIkxcIjogZm9ybWF0VVRDTWlsbGlzZWNvbmRzLFxuICAgIFwibVwiOiBmb3JtYXRVVENNb250aE51bWJlcixcbiAgICBcIk1cIjogZm9ybWF0VVRDTWludXRlcyxcbiAgICBcInBcIjogZm9ybWF0VVRDUGVyaW9kLFxuICAgIFwiU1wiOiBmb3JtYXRVVENTZWNvbmRzLFxuICAgIFwiVVwiOiBmb3JtYXRVVENXZWVrTnVtYmVyU3VuZGF5LFxuICAgIFwid1wiOiBmb3JtYXRVVENXZWVrZGF5TnVtYmVyLFxuICAgIFwiV1wiOiBmb3JtYXRVVENXZWVrTnVtYmVyTW9uZGF5LFxuICAgIFwieFwiOiBudWxsLFxuICAgIFwiWFwiOiBudWxsLFxuICAgIFwieVwiOiBmb3JtYXRVVENZZWFyLFxuICAgIFwiWVwiOiBmb3JtYXRVVENGdWxsWWVhcixcbiAgICBcIlpcIjogZm9ybWF0VVRDWm9uZSxcbiAgICBcIiVcIjogZm9ybWF0TGl0ZXJhbFBlcmNlbnRcbiAgfTtcblxuICB2YXIgcGFyc2VzID0ge1xuICAgIFwiYVwiOiBwYXJzZVNob3J0V2Vla2RheSxcbiAgICBcIkFcIjogcGFyc2VXZWVrZGF5LFxuICAgIFwiYlwiOiBwYXJzZVNob3J0TW9udGgsXG4gICAgXCJCXCI6IHBhcnNlTW9udGgsXG4gICAgXCJjXCI6IHBhcnNlTG9jYWxlRGF0ZVRpbWUsXG4gICAgXCJkXCI6IHBhcnNlRGF5T2ZNb250aCxcbiAgICBcImVcIjogcGFyc2VEYXlPZk1vbnRoLFxuICAgIFwiSFwiOiBwYXJzZUhvdXIyNCxcbiAgICBcIklcIjogcGFyc2VIb3VyMjQsXG4gICAgXCJqXCI6IHBhcnNlRGF5T2ZZZWFyLFxuICAgIFwiTFwiOiBwYXJzZU1pbGxpc2Vjb25kcyxcbiAgICBcIm1cIjogcGFyc2VNb250aE51bWJlcixcbiAgICBcIk1cIjogcGFyc2VNaW51dGVzLFxuICAgIFwicFwiOiBwYXJzZVBlcmlvZCxcbiAgICBcIlNcIjogcGFyc2VTZWNvbmRzLFxuICAgIFwiVVwiOiBwYXJzZVdlZWtOdW1iZXJTdW5kYXksXG4gICAgXCJ3XCI6IHBhcnNlV2Vla2RheU51bWJlcixcbiAgICBcIldcIjogcGFyc2VXZWVrTnVtYmVyTW9uZGF5LFxuICAgIFwieFwiOiBwYXJzZUxvY2FsZURhdGUsXG4gICAgXCJYXCI6IHBhcnNlTG9jYWxlVGltZSxcbiAgICBcInlcIjogcGFyc2VZZWFyLFxuICAgIFwiWVwiOiBwYXJzZUZ1bGxZZWFyLFxuICAgIFwiWlwiOiBwYXJzZVpvbmUsXG4gICAgXCIlXCI6IHBhcnNlTGl0ZXJhbFBlcmNlbnRcbiAgfTtcblxuICAvLyBUaGVzZSByZWN1cnNpdmUgZGlyZWN0aXZlIGRlZmluaXRpb25zIG11c3QgYmUgZGVmZXJyZWQuXG4gIGZvcm1hdHMueCA9IG5ld0Zvcm1hdChsb2NhbGVfZGF0ZSwgZm9ybWF0cyk7XG4gIGZvcm1hdHMuWCA9IG5ld0Zvcm1hdChsb2NhbGVfdGltZSwgZm9ybWF0cyk7XG4gIGZvcm1hdHMuYyA9IG5ld0Zvcm1hdChsb2NhbGVfZGF0ZVRpbWUsIGZvcm1hdHMpO1xuICB1dGNGb3JtYXRzLnggPSBuZXdGb3JtYXQobG9jYWxlX2RhdGUsIHV0Y0Zvcm1hdHMpO1xuICB1dGNGb3JtYXRzLlggPSBuZXdGb3JtYXQobG9jYWxlX3RpbWUsIHV0Y0Zvcm1hdHMpO1xuICB1dGNGb3JtYXRzLmMgPSBuZXdGb3JtYXQobG9jYWxlX2RhdGVUaW1lLCB1dGNGb3JtYXRzKTtcblxuICBmdW5jdGlvbiBuZXdGb3JtYXQoc3BlY2lmaWVyLCBmb3JtYXRzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBzdHJpbmcgPSBbXSxcbiAgICAgICAgICBpID0gLTEsXG4gICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgbiA9IHNwZWNpZmllci5sZW5ndGgsXG4gICAgICAgICAgYyxcbiAgICAgICAgICBwYWQsXG4gICAgICAgICAgZm9ybWF0O1xuXG4gICAgICBpZiAoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSk7XG5cbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGlmIChzcGVjaWZpZXIuY2hhckNvZGVBdChpKSA9PT0gMzcpIHtcbiAgICAgICAgICBzdHJpbmcucHVzaChzcGVjaWZpZXIuc2xpY2UoaiwgaSkpO1xuICAgICAgICAgIGlmICgocGFkID0gcGFkc1tjID0gc3BlY2lmaWVyLmNoYXJBdCgrK2kpXSkgIT0gbnVsbCkgYyA9IHNwZWNpZmllci5jaGFyQXQoKytpKTtcbiAgICAgICAgICBlbHNlIHBhZCA9IGMgPT09IFwiZVwiID8gXCIgXCIgOiBcIjBcIjtcbiAgICAgICAgICBpZiAoZm9ybWF0ID0gZm9ybWF0c1tjXSkgYyA9IGZvcm1hdChkYXRlLCBwYWQpO1xuICAgICAgICAgIHN0cmluZy5wdXNoKGMpO1xuICAgICAgICAgIGogPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzdHJpbmcucHVzaChzcGVjaWZpZXIuc2xpY2UoaiwgaSkpO1xuICAgICAgcmV0dXJuIHN0cmluZy5qb2luKFwiXCIpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBuZXdQYXJzZShzcGVjaWZpZXIsIG5ld0RhdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICB2YXIgZCA9IG5ld1llYXIoMTkwMCksXG4gICAgICAgICAgaSA9IHBhcnNlU3BlY2lmaWVyKGQsIHNwZWNpZmllciwgc3RyaW5nICs9IFwiXCIsIDApO1xuICAgICAgaWYgKGkgIT0gc3RyaW5nLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICAgIC8vIFRoZSBhbS1wbSBmbGFnIGlzIDAgZm9yIEFNLCBhbmQgMSBmb3IgUE0uXG4gICAgICBpZiAoXCJwXCIgaW4gZCkgZC5IID0gZC5IICUgMTIgKyBkLnAgKiAxMjtcblxuICAgICAgLy8gQ29udmVydCBkYXktb2Ytd2VlayBhbmQgd2Vlay1vZi15ZWFyIHRvIGRheS1vZi15ZWFyLlxuICAgICAgaWYgKFwiV1wiIGluIGQgfHwgXCJVXCIgaW4gZCkge1xuICAgICAgICBpZiAoIShcIndcIiBpbiBkKSkgZC53ID0gXCJXXCIgaW4gZCA/IDEgOiAwO1xuICAgICAgICB2YXIgZGF5ID0gXCJaXCIgaW4gZCA/IHV0Y0RhdGUobmV3WWVhcihkLnkpKS5nZXRVVENEYXkoKSA6IG5ld0RhdGUobmV3WWVhcihkLnkpKS5nZXREYXkoKTtcbiAgICAgICAgZC5tID0gMDtcbiAgICAgICAgZC5kID0gXCJXXCIgaW4gZCA/IChkLncgKyA2KSAlIDcgKyBkLlcgKiA3IC0gKGRheSArIDUpICUgNyA6IGQudyArIGQuVSAqIDcgLSAoZGF5ICsgNikgJSA3O1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBhIHRpbWUgem9uZSBpcyBzcGVjaWZpZWQsIGFsbCBmaWVsZHMgYXJlIGludGVycHJldGVkIGFzIFVUQyBhbmQgdGhlblxuICAgICAgLy8gb2Zmc2V0IGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIHRpbWUgem9uZS5cbiAgICAgIGlmIChcIlpcIiBpbiBkKSB7XG4gICAgICAgIGQuSCArPSBkLlogLyAxMDAgfCAwO1xuICAgICAgICBkLk0gKz0gZC5aICUgMTAwO1xuICAgICAgICByZXR1cm4gdXRjRGF0ZShkKTtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlLCBhbGwgZmllbGRzIGFyZSBpbiBsb2NhbCB0aW1lLlxuICAgICAgcmV0dXJuIG5ld0RhdGUoZCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlU3BlY2lmaWVyKGQsIHNwZWNpZmllciwgc3RyaW5nLCBqKSB7XG4gICAgdmFyIGkgPSAwLFxuICAgICAgICBuID0gc3BlY2lmaWVyLmxlbmd0aCxcbiAgICAgICAgbSA9IHN0cmluZy5sZW5ndGgsXG4gICAgICAgIGMsXG4gICAgICAgIHBhcnNlO1xuXG4gICAgd2hpbGUgKGkgPCBuKSB7XG4gICAgICBpZiAoaiA+PSBtKSByZXR1cm4gLTE7XG4gICAgICBjID0gc3BlY2lmaWVyLmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgIGlmIChjID09PSAzNykge1xuICAgICAgICBjID0gc3BlY2lmaWVyLmNoYXJBdChpKyspO1xuICAgICAgICBwYXJzZSA9IHBhcnNlc1tjIGluIHBhZHMgPyBzcGVjaWZpZXIuY2hhckF0KGkrKykgOiBjXTtcbiAgICAgICAgaWYgKCFwYXJzZSB8fCAoKGogPSBwYXJzZShkLCBzdHJpbmcsIGopKSA8IDApKSByZXR1cm4gLTE7XG4gICAgICB9IGVsc2UgaWYgKGMgIT0gc3RyaW5nLmNoYXJDb2RlQXQoaisrKSkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGo7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVBlcmlvZChkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IHBlcmlvZFJlLmV4ZWMoc3RyaW5nLnNsaWNlKGkpKTtcbiAgICByZXR1cm4gbiA/IChkLnAgPSBwZXJpb2RMb29rdXBbblswXS50b0xvd2VyQ2FzZSgpXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VTaG9ydFdlZWtkYXkoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBzaG9ydFdlZWtkYXlSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgcmV0dXJuIG4gPyAoZC53ID0gc2hvcnRXZWVrZGF5TG9va3VwW25bMF0udG9Mb3dlckNhc2UoKV0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlV2Vla2RheShkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IHdlZWtkYXlSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gICAgcmV0dXJuIG4gPyAoZC53ID0gd2Vla2RheUxvb2t1cFtuWzBdLnRvTG93ZXJDYXNlKCldLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVNob3J0TW9udGgoZCwgc3RyaW5nLCBpKSB7XG4gICAgdmFyIG4gPSBzaG9ydE1vbnRoUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgIHJldHVybiBuID8gKGQubSA9IHNob3J0TW9udGhMb29rdXBbblswXS50b0xvd2VyQ2FzZSgpXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VNb250aChkLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IG1vbnRoUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSkpO1xuICAgIHJldHVybiBuID8gKGQubSA9IG1vbnRoTG9va3VwW25bMF0udG9Mb3dlckNhc2UoKV0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTG9jYWxlRGF0ZVRpbWUoZCwgc3RyaW5nLCBpKSB7XG4gICAgcmV0dXJuIHBhcnNlU3BlY2lmaWVyKGQsIGxvY2FsZV9kYXRlVGltZSwgc3RyaW5nLCBpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTG9jYWxlRGF0ZShkLCBzdHJpbmcsIGkpIHtcbiAgICByZXR1cm4gcGFyc2VTcGVjaWZpZXIoZCwgbG9jYWxlX2RhdGUsIHN0cmluZywgaSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUxvY2FsZVRpbWUoZCwgc3RyaW5nLCBpKSB7XG4gICAgcmV0dXJuIHBhcnNlU3BlY2lmaWVyKGQsIGxvY2FsZV90aW1lLCBzdHJpbmcsIGkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0U2hvcnRXZWVrZGF5KGQpIHtcbiAgICByZXR1cm4gbG9jYWxlX3Nob3J0V2Vla2RheXNbZC5nZXREYXkoKV07XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRXZWVrZGF5KGQpIHtcbiAgICByZXR1cm4gbG9jYWxlX3dlZWtkYXlzW2QuZ2V0RGF5KCldO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0U2hvcnRNb250aChkKSB7XG4gICAgcmV0dXJuIGxvY2FsZV9zaG9ydE1vbnRoc1tkLmdldE1vbnRoKCldO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0TW9udGgoZCkge1xuICAgIHJldHVybiBsb2NhbGVfbW9udGhzW2QuZ2V0TW9udGgoKV07XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRQZXJpb2QoZCkge1xuICAgIHJldHVybiBsb2NhbGVfcGVyaW9kc1srKGQuZ2V0SG91cnMoKSA+PSAxMildO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDU2hvcnRXZWVrZGF5KGQpIHtcbiAgICByZXR1cm4gbG9jYWxlX3Nob3J0V2Vla2RheXNbZC5nZXRVVENEYXkoKV07XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENXZWVrZGF5KGQpIHtcbiAgICByZXR1cm4gbG9jYWxlX3dlZWtkYXlzW2QuZ2V0VVRDRGF5KCldO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDU2hvcnRNb250aChkKSB7XG4gICAgcmV0dXJuIGxvY2FsZV9zaG9ydE1vbnRoc1tkLmdldFVUQ01vbnRoKCldO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VVRDTW9udGgoZCkge1xuICAgIHJldHVybiBsb2NhbGVfbW9udGhzW2QuZ2V0VVRDTW9udGgoKV07XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRVVENQZXJpb2QoZCkge1xuICAgIHJldHVybiBsb2NhbGVfcGVyaW9kc1srKGQuZ2V0VVRDSG91cnMoKSA+PSAxMildO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmb3JtYXQ6IGZ1bmN0aW9uKHNwZWNpZmllcikge1xuICAgICAgdmFyIGYgPSBuZXdGb3JtYXQoc3BlY2lmaWVyICs9IFwiXCIsIGZvcm1hdHMpO1xuICAgICAgZi50b1N0cmluZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3BlY2lmaWVyOyB9O1xuICAgICAgcmV0dXJuIGY7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24oc3BlY2lmaWVyKSB7XG4gICAgICB2YXIgcCA9IG5ld1BhcnNlKHNwZWNpZmllciArPSBcIlwiLCBsb2NhbERhdGUpO1xuICAgICAgcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3BlY2lmaWVyOyB9O1xuICAgICAgcmV0dXJuIHA7XG4gICAgfSxcbiAgICB1dGNGb3JtYXQ6IGZ1bmN0aW9uKHNwZWNpZmllcikge1xuICAgICAgdmFyIGYgPSBuZXdGb3JtYXQoc3BlY2lmaWVyICs9IFwiXCIsIHV0Y0Zvcm1hdHMpO1xuICAgICAgZi50b1N0cmluZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3BlY2lmaWVyOyB9O1xuICAgICAgcmV0dXJuIGY7XG4gICAgfSxcbiAgICB1dGNQYXJzZTogZnVuY3Rpb24oc3BlY2lmaWVyKSB7XG4gICAgICB2YXIgcCA9IG5ld1BhcnNlKHNwZWNpZmllciwgdXRjRGF0ZSk7XG4gICAgICBwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiBzcGVjaWZpZXI7IH07XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gIH07XG59XG5cbnZhciBwYWRzID0ge1wiLVwiOiBcIlwiLCBcIl9cIjogXCIgXCIsIFwiMFwiOiBcIjBcIn07XG52YXIgbnVtYmVyUmUgPSAvXlxccypcXGQrLztcbnZhciBwZXJjZW50UmUgPSAvXiUvO1xudmFyIHJlcXVvdGVSZSA9IC9bXFxcXFxcXlxcJFxcKlxcK1xcP1xcfFxcW1xcXVxcKFxcKVxcLlxce1xcfV0vZztcblxuZnVuY3Rpb24gcGFkKHZhbHVlLCBmaWxsLCB3aWR0aCkge1xuICB2YXIgc2lnbiA9IHZhbHVlIDwgMCA/IFwiLVwiIDogXCJcIixcbiAgICAgIHN0cmluZyA9IChzaWduID8gLXZhbHVlIDogdmFsdWUpICsgXCJcIixcbiAgICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gIHJldHVybiBzaWduICsgKGxlbmd0aCA8IHdpZHRoID8gbmV3IEFycmF5KHdpZHRoIC0gbGVuZ3RoICsgMSkuam9pbihmaWxsKSArIHN0cmluZyA6IHN0cmluZyk7XG59XG5cbmZ1bmN0aW9uIHJlcXVvdGUocykge1xuICByZXR1cm4gcy5yZXBsYWNlKHJlcXVvdGVSZSwgXCJcXFxcJCZcIik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFJlKG5hbWVzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFwiXig/OlwiICsgbmFtZXMubWFwKHJlcXVvdGUpLmpvaW4oXCJ8XCIpICsgXCIpXCIsIFwiaVwiKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0TG9va3VwKG5hbWVzKSB7XG4gIHZhciBtYXAgPSB7fSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICB3aGlsZSAoKytpIDwgbikgbWFwW25hbWVzW2ldLnRvTG93ZXJDYXNlKCldID0gaTtcbiAgcmV0dXJuIG1hcDtcbn1cblxuZnVuY3Rpb24gcGFyc2VXZWVrZGF5TnVtYmVyKGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAxKSk7XG4gIHJldHVybiBuID8gKGQudyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlV2Vla051bWJlclN1bmRheShkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gIHJldHVybiBuID8gKGQuVSA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlV2Vla051bWJlck1vbmRheShkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpKSk7XG4gIHJldHVybiBuID8gKGQuVyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRnVsbFllYXIoZCwgc3RyaW5nLCBpKSB7XG4gIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDQpKTtcbiAgcmV0dXJuIG4gPyAoZC55ID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbn1cblxuZnVuY3Rpb24gcGFyc2VZZWFyKGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gIHJldHVybiBuID8gKGQueSA9ICtuWzBdICsgKCtuWzBdID4gNjggPyAxOTAwIDogMjAwMCksIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbn1cblxuZnVuY3Rpb24gcGFyc2Vab25lKGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IC9eKFopfChbKy1dXFxkXFxkKSg/OlxcOj8oXFxkXFxkKSk/Ly5leGVjKHN0cmluZy5zbGljZShpLCBpICsgNikpO1xuICByZXR1cm4gbiA/IChkLlogPSBuWzFdID8gMCA6IC0oblsyXSArIChuWzNdIHx8IFwiMDBcIikpLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTW9udGhOdW1iZXIoZCwgc3RyaW5nLCBpKSB7XG4gIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDIpKTtcbiAgcmV0dXJuIG4gPyAoZC5tID0gblswXSAtIDEsIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbn1cblxuZnVuY3Rpb24gcGFyc2VEYXlPZk1vbnRoKGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gIHJldHVybiBuID8gKGQuZCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF5T2ZZZWFyKGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAzKSk7XG4gIHJldHVybiBuID8gKGQubSA9IDAsIGQuZCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSG91cjI0KGQsIHN0cmluZywgaSkge1xuICB2YXIgbiA9IG51bWJlclJlLmV4ZWMoc3RyaW5nLnNsaWNlKGksIGkgKyAyKSk7XG4gIHJldHVybiBuID8gKGQuSCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTWludXRlcyhkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSBudW1iZXJSZS5leGVjKHN0cmluZy5zbGljZShpLCBpICsgMikpO1xuICByZXR1cm4gbiA/IChkLk0gPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xufVxuXG5mdW5jdGlvbiBwYXJzZVNlY29uZHMoZCwgc3RyaW5nLCBpKSB7XG4gIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDIpKTtcbiAgcmV0dXJuIG4gPyAoZC5TID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbn1cblxuZnVuY3Rpb24gcGFyc2VNaWxsaXNlY29uZHMoZCwgc3RyaW5nLCBpKSB7XG4gIHZhciBuID0gbnVtYmVyUmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDMpKTtcbiAgcmV0dXJuIG4gPyAoZC5MID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMaXRlcmFsUGVyY2VudChkLCBzdHJpbmcsIGkpIHtcbiAgdmFyIG4gPSBwZXJjZW50UmUuZXhlYyhzdHJpbmcuc2xpY2UoaSwgaSArIDEpKTtcbiAgcmV0dXJuIG4gPyBpICsgblswXS5sZW5ndGggOiAtMTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF5T2ZNb250aChkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXREYXRlKCksIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRIb3VyMjQoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0SG91cnMoKSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhvdXIxMihkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXRIb3VycygpICUgMTIgfHwgMTIsIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXREYXlPZlllYXIoZCwgcCkge1xuICByZXR1cm4gcGFkKDEgKyBkM1RpbWUudGltZURheS5jb3VudChkM1RpbWUudGltZVllYXIoZCksIGQpLCBwLCAzKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0TWlsbGlzZWNvbmRzKGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldE1pbGxpc2Vjb25kcygpLCBwLCAzKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0TW9udGhOdW1iZXIoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0TW9udGgoKSArIDEsIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRNaW51dGVzKGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldE1pbnV0ZXMoKSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFNlY29uZHMoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0U2Vjb25kcygpLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0V2Vla051bWJlclN1bmRheShkLCBwKSB7XG4gIHJldHVybiBwYWQoZDNUaW1lLnRpbWVTdW5kYXkuY291bnQoZDNUaW1lLnRpbWVZZWFyKGQpLCBkKSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFdlZWtkYXlOdW1iZXIoZCkge1xuICByZXR1cm4gZC5nZXREYXkoKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0V2Vla051bWJlck1vbmRheShkLCBwKSB7XG4gIHJldHVybiBwYWQoZDNUaW1lLnRpbWVNb25kYXkuY291bnQoZDNUaW1lLnRpbWVZZWFyKGQpLCBkKSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFllYXIoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0RnVsbFllYXIoKSAlIDEwMCwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEZ1bGxZZWFyKGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldEZ1bGxZZWFyKCkgJSAxMDAwMCwgcCwgNCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFpvbmUoZCkge1xuICB2YXIgeiA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgcmV0dXJuICh6ID4gMCA/IFwiLVwiIDogKHogKj0gLTEsIFwiK1wiKSlcbiAgICAgICsgcGFkKHogLyA2MCB8IDAsIFwiMFwiLCAyKVxuICAgICAgKyBwYWQoeiAlIDYwLCBcIjBcIiwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVUQ0RheU9mTW9udGgoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0VVRDRGF0ZSgpLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDSG91cjI0KGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldFVUQ0hvdXJzKCksIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENIb3VyMTIoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0VVRDSG91cnMoKSAlIDEyIHx8IDEyLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDRGF5T2ZZZWFyKGQsIHApIHtcbiAgcmV0dXJuIHBhZCgxICsgZDNUaW1lLnV0Y0RheS5jb3VudChkM1RpbWUudXRjWWVhcihkKSwgZCksIHAsIDMpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENNaWxsaXNlY29uZHMoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0VVRDTWlsbGlzZWNvbmRzKCksIHAsIDMpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENNb250aE51bWJlcihkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXRVVENNb250aCgpICsgMSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVUQ01pbnV0ZXMoZCwgcCkge1xuICByZXR1cm4gcGFkKGQuZ2V0VVRDTWludXRlcygpLCBwLCAyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDU2Vjb25kcyhkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXRVVENTZWNvbmRzKCksIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENXZWVrTnVtYmVyU3VuZGF5KGQsIHApIHtcbiAgcmV0dXJuIHBhZChkM1RpbWUudXRjU3VuZGF5LmNvdW50KGQzVGltZS51dGNZZWFyKGQpLCBkKSwgcCwgMik7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVUQ1dlZWtkYXlOdW1iZXIoZCkge1xuICByZXR1cm4gZC5nZXRVVENEYXkoKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VVRDV2Vla051bWJlck1vbmRheShkLCBwKSB7XG4gIHJldHVybiBwYWQoZDNUaW1lLnV0Y01vbmRheS5jb3VudChkM1RpbWUudXRjWWVhcihkKSwgZCksIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENZZWFyKGQsIHApIHtcbiAgcmV0dXJuIHBhZChkLmdldFVUQ0Z1bGxZZWFyKCkgJSAxMDAsIHAsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENGdWxsWWVhcihkLCBwKSB7XG4gIHJldHVybiBwYWQoZC5nZXRVVENGdWxsWWVhcigpICUgMTAwMDAsIHAsIDQpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVVENab25lKCkge1xuICByZXR1cm4gXCIrMDAwMFwiO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRMaXRlcmFsUGVyY2VudCgpIHtcbiAgcmV0dXJuIFwiJVwiO1xufVxuXG52YXIgbG9jYWxlJDE7XG5cblxuXG5cblxuZGVmYXVsdExvY2FsZSh7XG4gIGRhdGVUaW1lOiBcIiV4LCAlWFwiLFxuICBkYXRlOiBcIiUtbS8lLWQvJVlcIixcbiAgdGltZTogXCIlLUk6JU06JVMgJXBcIixcbiAgcGVyaW9kczogW1wiQU1cIiwgXCJQTVwiXSxcbiAgZGF5czogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXG4gIHNob3J0RGF5czogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICBtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICBzaG9ydE1vbnRoczogW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdXG59KTtcblxuZnVuY3Rpb24gZGVmYXVsdExvY2FsZShkZWZpbml0aW9uKSB7XG4gIGxvY2FsZSQxID0gZm9ybWF0TG9jYWxlKGRlZmluaXRpb24pO1xuICBleHBvcnRzLnRpbWVGb3JtYXQgPSBsb2NhbGUkMS5mb3JtYXQ7XG4gIGV4cG9ydHMudGltZVBhcnNlID0gbG9jYWxlJDEucGFyc2U7XG4gIGV4cG9ydHMudXRjRm9ybWF0ID0gbG9jYWxlJDEudXRjRm9ybWF0O1xuICBleHBvcnRzLnV0Y1BhcnNlID0gbG9jYWxlJDEudXRjUGFyc2U7XG4gIHJldHVybiBsb2NhbGUkMTtcbn1cblxudmFyIGlzb1NwZWNpZmllciA9IFwiJVktJW0tJWRUJUg6JU06JVMuJUxaXCI7XG5cbmZ1bmN0aW9uIGZvcm1hdElzb05hdGl2ZShkYXRlKSB7XG4gIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCk7XG59XG5cbnZhciBmb3JtYXRJc28gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZ1xuICAgID8gZm9ybWF0SXNvTmF0aXZlXG4gICAgOiBleHBvcnRzLnV0Y0Zvcm1hdChpc29TcGVjaWZpZXIpO1xuXG5mdW5jdGlvbiBwYXJzZUlzb05hdGl2ZShzdHJpbmcpIHtcbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZShzdHJpbmcpO1xuICByZXR1cm4gaXNOYU4oZGF0ZSkgPyBudWxsIDogZGF0ZTtcbn1cblxudmFyIHBhcnNlSXNvID0gK25ldyBEYXRlKFwiMjAwMC0wMS0wMVQwMDowMDowMC4wMDBaXCIpXG4gICAgPyBwYXJzZUlzb05hdGl2ZVxuICAgIDogZXhwb3J0cy51dGNQYXJzZShpc29TcGVjaWZpZXIpO1xuXG5leHBvcnRzLnRpbWVGb3JtYXREZWZhdWx0TG9jYWxlID0gZGVmYXVsdExvY2FsZTtcbmV4cG9ydHMudGltZUZvcm1hdExvY2FsZSA9IGZvcm1hdExvY2FsZTtcbmV4cG9ydHMuaXNvRm9ybWF0ID0gZm9ybWF0SXNvO1xuZXhwb3J0cy5pc29QYXJzZSA9IHBhcnNlSXNvO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuIiwiLy8gaHR0cHM6Ly9kM2pzLm9yZy9kMy10aW1lLyBWZXJzaW9uIDEuMC42LiBDb3B5cmlnaHQgMjAxNyBNaWtlIEJvc3RvY2suXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG5cdChmYWN0b3J5KChnbG9iYWwuZDMgPSBnbG9iYWwuZDMgfHwge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbnZhciB0MCA9IG5ldyBEYXRlO1xudmFyIHQxID0gbmV3IERhdGU7XG5cbmZ1bmN0aW9uIG5ld0ludGVydmFsKGZsb29yaSwgb2Zmc2V0aSwgY291bnQsIGZpZWxkKSB7XG5cbiAgZnVuY3Rpb24gaW50ZXJ2YWwoZGF0ZSkge1xuICAgIHJldHVybiBmbG9vcmkoZGF0ZSA9IG5ldyBEYXRlKCtkYXRlKSksIGRhdGU7XG4gIH1cblxuICBpbnRlcnZhbC5mbG9vciA9IGludGVydmFsO1xuXG4gIGludGVydmFsLmNlaWwgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGZsb29yaShkYXRlID0gbmV3IERhdGUoZGF0ZSAtIDEpKSwgb2Zmc2V0aShkYXRlLCAxKSwgZmxvb3JpKGRhdGUpLCBkYXRlO1xuICB9O1xuXG4gIGludGVydmFsLnJvdW5kID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgIHZhciBkMCA9IGludGVydmFsKGRhdGUpLFxuICAgICAgICBkMSA9IGludGVydmFsLmNlaWwoZGF0ZSk7XG4gICAgcmV0dXJuIGRhdGUgLSBkMCA8IGQxIC0gZGF0ZSA/IGQwIDogZDE7XG4gIH07XG5cbiAgaW50ZXJ2YWwub2Zmc2V0ID0gZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIHJldHVybiBvZmZzZXRpKGRhdGUgPSBuZXcgRGF0ZSgrZGF0ZSksIHN0ZXAgPT0gbnVsbCA/IDEgOiBNYXRoLmZsb29yKHN0ZXApKSwgZGF0ZTtcbiAgfTtcblxuICBpbnRlcnZhbC5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgdmFyIHJhbmdlID0gW107XG4gICAgc3RhcnQgPSBpbnRlcnZhbC5jZWlsKHN0YXJ0KTtcbiAgICBzdGVwID0gc3RlcCA9PSBudWxsID8gMSA6IE1hdGguZmxvb3Ioc3RlcCk7XG4gICAgaWYgKCEoc3RhcnQgPCBzdG9wKSB8fCAhKHN0ZXAgPiAwKSkgcmV0dXJuIHJhbmdlOyAvLyBhbHNvIGhhbmRsZXMgSW52YWxpZCBEYXRlXG4gICAgZG8gcmFuZ2UucHVzaChuZXcgRGF0ZSgrc3RhcnQpKTsgd2hpbGUgKG9mZnNldGkoc3RhcnQsIHN0ZXApLCBmbG9vcmkoc3RhcnQpLCBzdGFydCA8IHN0b3ApXG4gICAgcmV0dXJuIHJhbmdlO1xuICB9O1xuXG4gIGludGVydmFsLmZpbHRlciA9IGZ1bmN0aW9uKHRlc3QpIHtcbiAgICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgaWYgKGRhdGUgPj0gZGF0ZSkgd2hpbGUgKGZsb29yaShkYXRlKSwgIXRlc3QoZGF0ZSkpIGRhdGUuc2V0VGltZShkYXRlIC0gMSk7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgICAgaWYgKGRhdGUgPj0gZGF0ZSkgd2hpbGUgKC0tc3RlcCA+PSAwKSB3aGlsZSAob2Zmc2V0aShkYXRlLCAxKSwgIXRlc3QoZGF0ZSkpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcbiAgICB9KTtcbiAgfTtcblxuICBpZiAoY291bnQpIHtcbiAgICBpbnRlcnZhbC5jb3VudCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgIHQwLnNldFRpbWUoK3N0YXJ0KSwgdDEuc2V0VGltZSgrZW5kKTtcbiAgICAgIGZsb29yaSh0MCksIGZsb29yaSh0MSk7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihjb3VudCh0MCwgdDEpKTtcbiAgICB9O1xuXG4gICAgaW50ZXJ2YWwuZXZlcnkgPSBmdW5jdGlvbihzdGVwKSB7XG4gICAgICBzdGVwID0gTWF0aC5mbG9vcihzdGVwKTtcbiAgICAgIHJldHVybiAhaXNGaW5pdGUoc3RlcCkgfHwgIShzdGVwID4gMCkgPyBudWxsXG4gICAgICAgICAgOiAhKHN0ZXAgPiAxKSA/IGludGVydmFsXG4gICAgICAgICAgOiBpbnRlcnZhbC5maWx0ZXIoZmllbGRcbiAgICAgICAgICAgICAgPyBmdW5jdGlvbihkKSB7IHJldHVybiBmaWVsZChkKSAlIHN0ZXAgPT09IDA7IH1cbiAgICAgICAgICAgICAgOiBmdW5jdGlvbihkKSB7IHJldHVybiBpbnRlcnZhbC5jb3VudCgwLCBkKSAlIHN0ZXAgPT09IDA7IH0pO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gaW50ZXJ2YWw7XG59XG5cbnZhciBtaWxsaXNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKCkge1xuICAvLyBub29wXG59LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXApO1xufSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICByZXR1cm4gZW5kIC0gc3RhcnQ7XG59KTtcblxuLy8gQW4gb3B0aW1pemVkIGltcGxlbWVudGF0aW9uIGZvciB0aGlzIHNpbXBsZSBjYXNlLlxubWlsbGlzZWNvbmQuZXZlcnkgPSBmdW5jdGlvbihrKSB7XG4gIGsgPSBNYXRoLmZsb29yKGspO1xuICBpZiAoIWlzRmluaXRlKGspIHx8ICEoayA+IDApKSByZXR1cm4gbnVsbDtcbiAgaWYgKCEoayA+IDEpKSByZXR1cm4gbWlsbGlzZWNvbmQ7XG4gIHJldHVybiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRUaW1lKE1hdGguZmxvb3IoZGF0ZSAvIGspICogayk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogayk7XG4gIH0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGs7XG4gIH0pO1xufTtcblxudmFyIG1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kLnJhbmdlO1xuXG52YXIgZHVyYXRpb25TZWNvbmQgPSAxZTM7XG52YXIgZHVyYXRpb25NaW51dGUgPSA2ZTQ7XG52YXIgZHVyYXRpb25Ib3VyID0gMzZlNTtcbnZhciBkdXJhdGlvbkRheSA9IDg2NGU1O1xudmFyIGR1cmF0aW9uV2VlayA9IDYwNDhlNTtcblxudmFyIHNlY29uZCA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgZGF0ZS5zZXRUaW1lKE1hdGguZmxvb3IoZGF0ZSAvIGR1cmF0aW9uU2Vjb25kKSAqIGR1cmF0aW9uU2Vjb25kKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIGR1cmF0aW9uU2Vjb25kKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBkdXJhdGlvblNlY29uZDtcbn0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuIGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xufSk7XG5cbnZhciBzZWNvbmRzID0gc2Vjb25kLnJhbmdlO1xuXG52YXIgbWludXRlID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICBkYXRlLnNldFRpbWUoTWF0aC5mbG9vcihkYXRlIC8gZHVyYXRpb25NaW51dGUpICogZHVyYXRpb25NaW51dGUpO1xufSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogZHVyYXRpb25NaW51dGUpO1xufSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGR1cmF0aW9uTWludXRlO1xufSwgZnVuY3Rpb24oZGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG59KTtcblxudmFyIG1pbnV0ZXMgPSBtaW51dGUucmFuZ2U7XG5cbnZhciBob3VyID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICB2YXIgb2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpICogZHVyYXRpb25NaW51dGUgJSBkdXJhdGlvbkhvdXI7XG4gIGlmIChvZmZzZXQgPCAwKSBvZmZzZXQgKz0gZHVyYXRpb25Ib3VyO1xuICBkYXRlLnNldFRpbWUoTWF0aC5mbG9vcigoK2RhdGUgLSBvZmZzZXQpIC8gZHVyYXRpb25Ib3VyKSAqIGR1cmF0aW9uSG91ciArIG9mZnNldCk7XG59LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gIGRhdGUuc2V0VGltZSgrZGF0ZSArIHN0ZXAgKiBkdXJhdGlvbkhvdXIpO1xufSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICByZXR1cm4gKGVuZCAtIHN0YXJ0KSAvIGR1cmF0aW9uSG91cjtcbn0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbn0pO1xuXG52YXIgaG91cnMgPSBob3VyLnJhbmdlO1xuXG52YXIgZGF5ID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xufSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBzdGVwKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIChlbmQgLSBzdGFydCAtIChlbmQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHN0YXJ0LmdldFRpbWV6b25lT2Zmc2V0KCkpICogZHVyYXRpb25NaW51dGUpIC8gZHVyYXRpb25EYXk7XG59LCBmdW5jdGlvbihkYXRlKSB7XG4gIHJldHVybiBkYXRlLmdldERhdGUoKSAtIDE7XG59KTtcblxudmFyIGRheXMgPSBkYXkucmFuZ2U7XG5cbmZ1bmN0aW9uIHdlZWtkYXkoaSkge1xuICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIChkYXRlLmdldERheSgpICsgNyAtIGkpICUgNyk7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIHN0ZXAgKiA3KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQgLSAoZW5kLmdldFRpbWV6b25lT2Zmc2V0KCkgLSBzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpKSAqIGR1cmF0aW9uTWludXRlKSAvIGR1cmF0aW9uV2VlaztcbiAgfSk7XG59XG5cbnZhciBzdW5kYXkgPSB3ZWVrZGF5KDApO1xudmFyIG1vbmRheSA9IHdlZWtkYXkoMSk7XG52YXIgdHVlc2RheSA9IHdlZWtkYXkoMik7XG52YXIgd2VkbmVzZGF5ID0gd2Vla2RheSgzKTtcbnZhciB0aHVyc2RheSA9IHdlZWtkYXkoNCk7XG52YXIgZnJpZGF5ID0gd2Vla2RheSg1KTtcbnZhciBzYXR1cmRheSA9IHdlZWtkYXkoNik7XG5cbnZhciBzdW5kYXlzID0gc3VuZGF5LnJhbmdlO1xudmFyIG1vbmRheXMgPSBtb25kYXkucmFuZ2U7XG52YXIgdHVlc2RheXMgPSB0dWVzZGF5LnJhbmdlO1xudmFyIHdlZG5lc2RheXMgPSB3ZWRuZXNkYXkucmFuZ2U7XG52YXIgdGh1cnNkYXlzID0gdGh1cnNkYXkucmFuZ2U7XG52YXIgZnJpZGF5cyA9IGZyaWRheS5yYW5nZTtcbnZhciBzYXR1cmRheXMgPSBzYXR1cmRheS5yYW5nZTtcblxudmFyIG1vbnRoID0gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICBkYXRlLnNldERhdGUoMSk7XG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG59LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgc3RlcCk7XG59LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gIHJldHVybiBlbmQuZ2V0TW9udGgoKSAtIHN0YXJ0LmdldE1vbnRoKCkgKyAoZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpKSAqIDEyO1xufSwgZnVuY3Rpb24oZGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xufSk7XG5cbnZhciBtb250aHMgPSBtb250aC5yYW5nZTtcblxudmFyIHllYXIgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG59LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgc3RlcCk7XG59LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gIHJldHVybiBlbmQuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0LmdldEZ1bGxZZWFyKCk7XG59LCBmdW5jdGlvbihkYXRlKSB7XG4gIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG59KTtcblxuLy8gQW4gb3B0aW1pemVkIGltcGxlbWVudGF0aW9uIGZvciB0aGlzIHNpbXBsZSBjYXNlLlxueWVhci5ldmVyeSA9IGZ1bmN0aW9uKGspIHtcbiAgcmV0dXJuICFpc0Zpbml0ZShrID0gTWF0aC5mbG9vcihrKSkgfHwgIShrID4gMCkgPyBudWxsIDogbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0RnVsbFllYXIoTWF0aC5mbG9vcihkYXRlLmdldEZ1bGxZZWFyKCkgLyBrKSAqIGspO1xuICAgIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgc3RlcCAqIGspO1xuICB9KTtcbn07XG5cbnZhciB5ZWFycyA9IHllYXIucmFuZ2U7XG5cbnZhciB1dGNNaW51dGUgPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gIGRhdGUuc2V0VVRDU2Vjb25kcygwLCAwKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXRUaW1lKCtkYXRlICsgc3RlcCAqIGR1cmF0aW9uTWludXRlKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBkdXJhdGlvbk1pbnV0ZTtcbn0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuIGRhdGUuZ2V0VVRDTWludXRlcygpO1xufSk7XG5cbnZhciB1dGNNaW51dGVzID0gdXRjTWludXRlLnJhbmdlO1xuXG52YXIgdXRjSG91ciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgZGF0ZS5zZXRVVENNaW51dGVzKDAsIDAsIDApO1xufSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICBkYXRlLnNldFRpbWUoK2RhdGUgKyBzdGVwICogZHVyYXRpb25Ib3VyKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIChlbmQgLSBzdGFydCkgLyBkdXJhdGlvbkhvdXI7XG59LCBmdW5jdGlvbihkYXRlKSB7XG4gIHJldHVybiBkYXRlLmdldFVUQ0hvdXJzKCk7XG59KTtcblxudmFyIHV0Y0hvdXJzID0gdXRjSG91ci5yYW5nZTtcblxudmFyIHV0Y0RheSA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgc3RlcCk7XG59LCBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gZHVyYXRpb25EYXk7XG59LCBmdW5jdGlvbihkYXRlKSB7XG4gIHJldHVybiBkYXRlLmdldFVUQ0RhdGUoKSAtIDE7XG59KTtcblxudmFyIHV0Y0RheXMgPSB1dGNEYXkucmFuZ2U7XG5cbmZ1bmN0aW9uIHV0Y1dlZWtkYXkoaSkge1xuICByZXR1cm4gbmV3SW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSAtIChkYXRlLmdldFVUQ0RheSgpICsgNyAtIGkpICUgNyk7XG4gICAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgc3RlcCkge1xuICAgIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIHN0ZXAgKiA3KTtcbiAgfSwgZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAoZW5kIC0gc3RhcnQpIC8gZHVyYXRpb25XZWVrO1xuICB9KTtcbn1cblxudmFyIHV0Y1N1bmRheSA9IHV0Y1dlZWtkYXkoMCk7XG52YXIgdXRjTW9uZGF5ID0gdXRjV2Vla2RheSgxKTtcbnZhciB1dGNUdWVzZGF5ID0gdXRjV2Vla2RheSgyKTtcbnZhciB1dGNXZWRuZXNkYXkgPSB1dGNXZWVrZGF5KDMpO1xudmFyIHV0Y1RodXJzZGF5ID0gdXRjV2Vla2RheSg0KTtcbnZhciB1dGNGcmlkYXkgPSB1dGNXZWVrZGF5KDUpO1xudmFyIHV0Y1NhdHVyZGF5ID0gdXRjV2Vla2RheSg2KTtcblxudmFyIHV0Y1N1bmRheXMgPSB1dGNTdW5kYXkucmFuZ2U7XG52YXIgdXRjTW9uZGF5cyA9IHV0Y01vbmRheS5yYW5nZTtcbnZhciB1dGNUdWVzZGF5cyA9IHV0Y1R1ZXNkYXkucmFuZ2U7XG52YXIgdXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheS5yYW5nZTtcbnZhciB1dGNUaHVyc2RheXMgPSB1dGNUaHVyc2RheS5yYW5nZTtcbnZhciB1dGNGcmlkYXlzID0gdXRjRnJpZGF5LnJhbmdlO1xudmFyIHV0Y1NhdHVyZGF5cyA9IHV0Y1NhdHVyZGF5LnJhbmdlO1xuXG52YXIgdXRjTW9udGggPSBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gIGRhdGUuc2V0VVRDRGF0ZSgxKTtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXRVVENNb250aChkYXRlLmdldFVUQ01vbnRoKCkgKyBzdGVwKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIGVuZC5nZXRVVENNb250aCgpIC0gc3RhcnQuZ2V0VVRDTW9udGgoKSArIChlbmQuZ2V0VVRDRnVsbFllYXIoKSAtIHN0YXJ0LmdldFVUQ0Z1bGxZZWFyKCkpICogMTI7XG59LCBmdW5jdGlvbihkYXRlKSB7XG4gIHJldHVybiBkYXRlLmdldFVUQ01vbnRoKCk7XG59KTtcblxudmFyIHV0Y01vbnRocyA9IHV0Y01vbnRoLnJhbmdlO1xuXG52YXIgdXRjWWVhciA9IG5ld0ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgZGF0ZS5zZXRVVENNb250aCgwLCAxKTtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbn0sIGZ1bmN0aW9uKGRhdGUsIHN0ZXApIHtcbiAgZGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyBzdGVwKTtcbn0sIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIGVuZC5nZXRVVENGdWxsWWVhcigpIC0gc3RhcnQuZ2V0VVRDRnVsbFllYXIoKTtcbn0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuIGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbn0pO1xuXG4vLyBBbiBvcHRpbWl6ZWQgaW1wbGVtZW50YXRpb24gZm9yIHRoaXMgc2ltcGxlIGNhc2UuXG51dGNZZWFyLmV2ZXJ5ID0gZnVuY3Rpb24oaykge1xuICByZXR1cm4gIWlzRmluaXRlKGsgPSBNYXRoLmZsb29yKGspKSB8fCAhKGsgPiAwKSA/IG51bGwgOiBuZXdJbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcihNYXRoLmZsb29yKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSAvIGspICogayk7XG4gICAgZGF0ZS5zZXRVVENNb250aCgwLCAxKTtcbiAgICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB9LCBmdW5jdGlvbihkYXRlLCBzdGVwKSB7XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyBzdGVwICogayk7XG4gIH0pO1xufTtcblxudmFyIHV0Y1llYXJzID0gdXRjWWVhci5yYW5nZTtcblxuZXhwb3J0cy50aW1lSW50ZXJ2YWwgPSBuZXdJbnRlcnZhbDtcbmV4cG9ydHMudGltZU1pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG5leHBvcnRzLnRpbWVNaWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHM7XG5leHBvcnRzLnV0Y01pbGxpc2Vjb25kID0gbWlsbGlzZWNvbmQ7XG5leHBvcnRzLnV0Y01pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbmV4cG9ydHMudGltZVNlY29uZCA9IHNlY29uZDtcbmV4cG9ydHMudGltZVNlY29uZHMgPSBzZWNvbmRzO1xuZXhwb3J0cy51dGNTZWNvbmQgPSBzZWNvbmQ7XG5leHBvcnRzLnV0Y1NlY29uZHMgPSBzZWNvbmRzO1xuZXhwb3J0cy50aW1lTWludXRlID0gbWludXRlO1xuZXhwb3J0cy50aW1lTWludXRlcyA9IG1pbnV0ZXM7XG5leHBvcnRzLnRpbWVIb3VyID0gaG91cjtcbmV4cG9ydHMudGltZUhvdXJzID0gaG91cnM7XG5leHBvcnRzLnRpbWVEYXkgPSBkYXk7XG5leHBvcnRzLnRpbWVEYXlzID0gZGF5cztcbmV4cG9ydHMudGltZVdlZWsgPSBzdW5kYXk7XG5leHBvcnRzLnRpbWVXZWVrcyA9IHN1bmRheXM7XG5leHBvcnRzLnRpbWVTdW5kYXkgPSBzdW5kYXk7XG5leHBvcnRzLnRpbWVTdW5kYXlzID0gc3VuZGF5cztcbmV4cG9ydHMudGltZU1vbmRheSA9IG1vbmRheTtcbmV4cG9ydHMudGltZU1vbmRheXMgPSBtb25kYXlzO1xuZXhwb3J0cy50aW1lVHVlc2RheSA9IHR1ZXNkYXk7XG5leHBvcnRzLnRpbWVUdWVzZGF5cyA9IHR1ZXNkYXlzO1xuZXhwb3J0cy50aW1lV2VkbmVzZGF5ID0gd2VkbmVzZGF5O1xuZXhwb3J0cy50aW1lV2VkbmVzZGF5cyA9IHdlZG5lc2RheXM7XG5leHBvcnRzLnRpbWVUaHVyc2RheSA9IHRodXJzZGF5O1xuZXhwb3J0cy50aW1lVGh1cnNkYXlzID0gdGh1cnNkYXlzO1xuZXhwb3J0cy50aW1lRnJpZGF5ID0gZnJpZGF5O1xuZXhwb3J0cy50aW1lRnJpZGF5cyA9IGZyaWRheXM7XG5leHBvcnRzLnRpbWVTYXR1cmRheSA9IHNhdHVyZGF5O1xuZXhwb3J0cy50aW1lU2F0dXJkYXlzID0gc2F0dXJkYXlzO1xuZXhwb3J0cy50aW1lTW9udGggPSBtb250aDtcbmV4cG9ydHMudGltZU1vbnRocyA9IG1vbnRocztcbmV4cG9ydHMudGltZVllYXIgPSB5ZWFyO1xuZXhwb3J0cy50aW1lWWVhcnMgPSB5ZWFycztcbmV4cG9ydHMudXRjTWludXRlID0gdXRjTWludXRlO1xuZXhwb3J0cy51dGNNaW51dGVzID0gdXRjTWludXRlcztcbmV4cG9ydHMudXRjSG91ciA9IHV0Y0hvdXI7XG5leHBvcnRzLnV0Y0hvdXJzID0gdXRjSG91cnM7XG5leHBvcnRzLnV0Y0RheSA9IHV0Y0RheTtcbmV4cG9ydHMudXRjRGF5cyA9IHV0Y0RheXM7XG5leHBvcnRzLnV0Y1dlZWsgPSB1dGNTdW5kYXk7XG5leHBvcnRzLnV0Y1dlZWtzID0gdXRjU3VuZGF5cztcbmV4cG9ydHMudXRjU3VuZGF5ID0gdXRjU3VuZGF5O1xuZXhwb3J0cy51dGNTdW5kYXlzID0gdXRjU3VuZGF5cztcbmV4cG9ydHMudXRjTW9uZGF5ID0gdXRjTW9uZGF5O1xuZXhwb3J0cy51dGNNb25kYXlzID0gdXRjTW9uZGF5cztcbmV4cG9ydHMudXRjVHVlc2RheSA9IHV0Y1R1ZXNkYXk7XG5leHBvcnRzLnV0Y1R1ZXNkYXlzID0gdXRjVHVlc2RheXM7XG5leHBvcnRzLnV0Y1dlZG5lc2RheSA9IHV0Y1dlZG5lc2RheTtcbmV4cG9ydHMudXRjV2VkbmVzZGF5cyA9IHV0Y1dlZG5lc2RheXM7XG5leHBvcnRzLnV0Y1RodXJzZGF5ID0gdXRjVGh1cnNkYXk7XG5leHBvcnRzLnV0Y1RodXJzZGF5cyA9IHV0Y1RodXJzZGF5cztcbmV4cG9ydHMudXRjRnJpZGF5ID0gdXRjRnJpZGF5O1xuZXhwb3J0cy51dGNGcmlkYXlzID0gdXRjRnJpZGF5cztcbmV4cG9ydHMudXRjU2F0dXJkYXkgPSB1dGNTYXR1cmRheTtcbmV4cG9ydHMudXRjU2F0dXJkYXlzID0gdXRjU2F0dXJkYXlzO1xuZXhwb3J0cy51dGNNb250aCA9IHV0Y01vbnRoO1xuZXhwb3J0cy51dGNNb250aHMgPSB1dGNNb250aHM7XG5leHBvcnRzLnV0Y1llYXIgPSB1dGNZZWFyO1xuZXhwb3J0cy51dGNZZWFycyA9IHV0Y1llYXJzO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiogQ29uc3RhbnRzIGFuZCB1dGlsaXRpZXMgZm9yIGRhdGEgdHlwZSAqL1xuLyoqIERhdGEgdHlwZSBiYXNlZCBvbiBsZXZlbCBvZiBtZWFzdXJlbWVudCAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFR5cGU7XG4oZnVuY3Rpb24gKFR5cGUpIHtcbiAgICBUeXBlLlFVQU5USVRBVElWRSA9ICdxdWFudGl0YXRpdmUnO1xuICAgIFR5cGUuT1JESU5BTCA9ICdvcmRpbmFsJztcbiAgICBUeXBlLlRFTVBPUkFMID0gJ3RlbXBvcmFsJztcbiAgICBUeXBlLk5PTUlOQUwgPSAnbm9taW5hbCc7XG59KShUeXBlID0gZXhwb3J0cy5UeXBlIHx8IChleHBvcnRzLlR5cGUgPSB7fSkpO1xuZXhwb3J0cy5RVUFOVElUQVRJVkUgPSBUeXBlLlFVQU5USVRBVElWRTtcbmV4cG9ydHMuT1JESU5BTCA9IFR5cGUuT1JESU5BTDtcbmV4cG9ydHMuVEVNUE9SQUwgPSBUeXBlLlRFTVBPUkFMO1xuZXhwb3J0cy5OT01JTkFMID0gVHlwZS5OT01JTkFMO1xuLyoqXG4gKiBHZXQgZnVsbCwgbG93ZXJjYXNlIHR5cGUgbmFtZSBmb3IgYSBnaXZlbiB0eXBlLlxuICogQHBhcmFtICB0eXBlXG4gKiBAcmV0dXJuIEZ1bGwgdHlwZSBuYW1lLlxuICovXG5mdW5jdGlvbiBnZXRGdWxsTmFtZSh0eXBlKSB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdxJzpcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RVUFOVElUQVRJVkU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdxdWFudGl0YXRpdmUnO1xuICAgICAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuVEVNUE9SQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd0ZW1wb3JhbCc7XG4gICAgICAgICAgICBjYXNlICdvJzpcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5PUkRJTkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnb3JkaW5hbCc7XG4gICAgICAgICAgICBjYXNlICduJzpcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5OT01JTkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbm9taW5hbCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgd2UgZ2V0IGludmFsaWQgaW5wdXQsIHJldHVybiB1bmRlZmluZWQgdHlwZS5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0cy5nZXRGdWxsTmFtZSA9IGdldEZ1bGxOYW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEhsd1pTNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMM055WXk5MGVYQmxMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFTdzBRMEZCTkVNN1FVRkROVU1zT0VOQlFUaERPenRCUVVVNVF5eEpRVUZwUWl4SlFVRkpMRU5CUzNCQ08wRkJURVFzVjBGQmFVSXNTVUZCU1R0SlFVTk9MR2xDUVVGWkxFZEJRVzFDTEdOQlFXTXNRMEZCUXp0SlFVTTVReXhaUVVGUExFZEJRV01zVTBGQlV5eERRVUZETzBsQlF5OUNMR0ZCUVZFc1IwRkJaU3hWUVVGVkxFTkJRVU03U1VGRGJFTXNXVUZCVHl4SFFVRmpMRk5CUVZNc1EwRkJRenRCUVVNNVF5eERRVUZETEVWQlRHZENMRWxCUVVrc1IwRkJTaXhaUVVGSkxFdEJRVW9zV1VGQlNTeFJRVXR3UWp0QlFVZFpMRkZCUVVFc1dVRkJXU3hIUVVGSExFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTTdRVUZEYWtNc1VVRkJRU3hQUVVGUExFZEJRVWNzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXp0QlFVTjJRaXhSUVVGQkxGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRPMEZCUTNwQ0xGRkJRVUVzVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN1FVRkZjRU03T3pzN1IwRkpSenRCUVVOSUxIRkNRVUUwUWl4SlFVRnBRanRKUVVNelF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRSUVVNeFFpeE5RVUZOTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMklzUzBGQlN5eEhRVUZITEVOQlFVTTdXVUZEVkN4TFFVRkxMRzlDUVVGWk8yZENRVU5tTEUxQlFVMHNRMEZCUXl4alFVRmpMRU5CUVVNN1dVRkRlRUlzUzBGQlN5eEhRVUZITEVOQlFVTTdXVUZEVkN4TFFVRkxMR2RDUVVGUk8yZENRVU5ZTEUxQlFVMHNRMEZCUXl4VlFVRlZMRU5CUVVNN1dVRkRjRUlzUzBGQlN5eEhRVUZITEVOQlFVTTdXVUZEVkN4TFFVRkxMR1ZCUVU4N1owSkJRMVlzVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXp0WlFVTnVRaXhMUVVGTExFZEJRVWNzUTBGQlF6dFpRVU5VTEV0QlFVc3NaVUZCVHp0blFrRkRWaXhOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETzFGQlEzSkNMRU5CUVVNN1NVRkRTQ3hEUVVGRE8wbEJRMFFzYTBSQlFXdEVPMGxCUTJ4RUxFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTTdRVUZEYmtJc1EwRkJRenRCUVhCQ1JDeHJRMEZ2UWtNaWZRPT0iLCJpbXBvcnQge2Zvcm1hdCBhcyBkM051bWJlckZvcm1hdH0gZnJvbSAnZDMtZm9ybWF0JztcbmltcG9ydCB7dGltZURheSwgdGltZUhvdXIsIHRpbWVNaW51dGUsIHRpbWVNb250aCwgdGltZVNlY29uZCwgdGltZVdlZWssIHRpbWVZZWFyfSBmcm9tICdkMy10aW1lJztcbmltcG9ydCB7dGltZUZvcm1hdH0gZnJvbSAnZDMtdGltZS1mb3JtYXQnO1xuXG4vKipcbiAqIEZvcm1hdCB2YWx1ZSB1c2luZyBmb3JtYXRUeXBlIGFuZCBmb3JtYXRcbiAqIEBwYXJhbSB2YWx1ZSAtIGEgZmllbGQgdmFsdWUgdG8gYmUgZm9ybWF0dGVkXG4gKiBAcGFyYW0gZm9ybWF0VHlwZSAtIHRoZSBmb3JtYXRUeXBlIGNhbiBiZTogXCJ0aW1lXCIsIFwibnVtYmVyXCIsIG9yIFwic3RyaW5nXCJcbiAqIEBwYXJhbSBmb3JtYXQgLSBhIHRpbWUgdGltZSBmb3JtYXQgc3BlY2lmaWVyLCBvciBhIHRpbWUgbnVtYmVyIGZvcm1hdCBzcGVjaWZpZXIsIG9yIHVuZGVmaW5lZFxuICogQHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlLCBvciB1bmRlZmluZWQgaWYgdmFsdWUgb3IgZm9ybWF0VHlwZSBpcyBtaXNzaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21Gb3JtYXQodmFsdWU6IG51bWJlciB8IHN0cmluZyB8IERhdGUsIGZvcm1hdFR5cGU6IHN0cmluZywgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKCFmb3JtYXRUeXBlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHN3aXRjaCAoZm9ybWF0VHlwZSkge1xuICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgcmV0dXJuIGZvcm1hdCA/IHRpbWVGb3JtYXQoZm9ybWF0KSh2YWx1ZSBhcyBEYXRlKSA6IGF1dG9UaW1lRm9ybWF0KHZhbHVlIGFzIERhdGUpO1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gZm9ybWF0ID8gZDNOdW1iZXJGb3JtYXQoZm9ybWF0KSh2YWx1ZSBhcyBudW1iZXIpIDogYXV0b051bWJlckZvcm1hdCh2YWx1ZSBhcyBudW1iZXIpO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZSBhcyBzdHJpbmc7XG4gIH1cbn1cblxuLyoqXG4gKiBBdXRvbWF0aWNhbGx5IGZvcm1hdCBhIHRpbWUsIG51bWJlciBvciBzdHJpbmcgdmFsdWVcbiAqIEByZXR1cm4gdGhlIGZvcm1hdHRlZCB0aW1lLCBudW1iZXIgb3Igc3RyaW5nIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdXRvRm9ybWF0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gYXV0b051bWJlckZvcm1hdCh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGF1dG9UaW1lRm9ybWF0KHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBBdXRvbWF0aWNhbGx5IGZvcm1hdCBhIG51bWJlciBiYXNlZCBvbiBpdHMgZGVjaW1hbC5cbiAqIEBwYXJhbSB2YWx1ZSBudW1iZXIgdG8gYmUgZm9ybWF0dGVkXG4gKiBAcmV0dXJuIElmIGl0J3MgYSBkZWNpbWFsIG51bWJlciwgcmV0dXJuIGEgZml4ZWQgdHdvIHBvaW50cyBwcmVjaXNpb24uXG4gKiBJZiBpdCdzIGEgd2hvbGUgbnVtYmVyLCByZXR1cm4gdGhlIG9yaWdpbmFsIHZhbHVlIHdpdGhvdXQgYW55IGZvcm1hdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF1dG9OdW1iZXJGb3JtYXQodmFsdWU6IG51bWJlcikge1xuICByZXR1cm4gdmFsdWUgJSAxID09PSAwID8gZDNOdW1iZXJGb3JtYXQoJywnKSh2YWx1ZSkgOiBkM051bWJlckZvcm1hdCgnLC4yZicpKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBBdXRvbWF0aWNhbGx5IGZvcm1hdCBhIHRpbWUgYmFzZWQgb24gaXRzIGRhdGUuXG4gKiBAcGFyYW0gZGF0ZSBvYmplY3QgdG8gYmUgZm9ybWF0dGVkXG4gKiBAcmV0dXJuIGEgZm9ybWF0dGVkIHRpbWUgc3RyaW5nIGRlcGVuZGluZyBvbiB0aGUgdGltZS4gRm9yIGV4YW1wbGUsXG4gKiB0aGUgc3RhcnQgb2YgRmVicnVhcnkgaXMgZm9ybWF0dGVkIGFzIFwiRmVicnVhcnlcIiwgd2hpbGUgRmVicnVhcnkgc2Vjb25kIGlzIGZvcm1hdHRlZCBhcyBcIkZlYiAyXCIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdXRvVGltZUZvcm1hdChkYXRlOiBEYXRlKSB7XG4gIGNvbnN0IGZvcm1hdE1pbGxpc2Vjb25kID0gdGltZUZvcm1hdCgnLiVMJyksXG4gICAgZm9ybWF0U2Vjb25kID0gdGltZUZvcm1hdCgnOiVTJyksXG4gICAgZm9ybWF0TWludXRlID0gdGltZUZvcm1hdCgnJUk6JU0nKSxcbiAgICBmb3JtYXRIb3VyID0gdGltZUZvcm1hdCgnJUkgJXAnKSxcbiAgICBmb3JtYXREYXkgPSB0aW1lRm9ybWF0KCclYSAlZCcpLFxuICAgIGZvcm1hdFdlZWsgPSB0aW1lRm9ybWF0KCclYiAlZCcpLFxuICAgIGZvcm1hdE1vbnRoID0gdGltZUZvcm1hdCgnJUInKSxcbiAgICBmb3JtYXRZZWFyID0gdGltZUZvcm1hdCgnJVknKTtcblxuICByZXR1cm4gKHRpbWVTZWNvbmQoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWlsbGlzZWNvbmRcbiAgICA6IHRpbWVNaW51dGUoZGF0ZSkgPCBkYXRlID8gZm9ybWF0U2Vjb25kXG4gICAgICA6IHRpbWVIb3VyKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbnV0ZVxuICAgICAgICA6IHRpbWVEYXkoZGF0ZSkgPCBkYXRlID8gZm9ybWF0SG91clxuICAgICAgICAgIDogdGltZU1vbnRoKGRhdGUpIDwgZGF0ZSA/ICh0aW1lV2VlayhkYXRlKSA8IGRhdGUgPyBmb3JtYXREYXkgOiBmb3JtYXRXZWVrKVxuICAgICAgICAgICAgOiB0aW1lWWVhcihkYXRlKSA8IGRhdGUgPyBmb3JtYXRNb250aFxuICAgICAgICAgICAgICA6IGZvcm1hdFllYXIpKGRhdGUpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3R9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG5pbXBvcnQge1RvcExldmVsRXh0ZW5kZWRTcGVjfSBmcm9tICd2ZWdhLWxpdGUvYnVpbGQvc3JjL3NwZWMnO1xuaW1wb3J0IHtERUxBWSwgT3B0aW9uLCBTY2VuZWdyYXBoLCBWZ1ZpZXd9IGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQge2dldFRvb2x0aXBEYXRhfSBmcm9tICcuL3BhcnNlT3B0aW9uJztcbmltcG9ydCB7c3VwcGxlbWVudE9wdGlvbnN9IGZyb20gJy4vc3VwcGxlbWVudEZpZWxkJztcbmltcG9ydCB7YmluZERhdGEsIGNsZWFyQ29sb3JUaGVtZSwgY2xlYXJEYXRhLCBjbGVhclBvc2l0aW9uLCBnZXRUb29sdGlwUGxhY2Vob2xkZXIsIHVwZGF0ZUNvbG9yVGhlbWUsIHVwZGF0ZVBvc2l0aW9ufSBmcm9tICcuL3Rvb2x0aXBEaXNwbGF5JztcblxubGV0IHRvb2x0aXBQcm9taXNlOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbmxldCB0b29sdGlwQWN0aXZlID0gZmFsc2U7XG5cbi8qKlxuICogRXhwb3J0IEFQSSBmb3IgVmVnYSB2aXN1YWxpemF0aW9uczogdmcudG9vbHRpcCh2Z1ZpZXcsIG9wdGlvbnMpXG4gKiBvcHRpb25zIGNhbiBzcGVjaWZ5IHdoZXRoZXIgdG8gc2hvdyBhbGwgZmllbGRzIG9yIHRvIHNob3cgb25seSBjdXN0b20gZmllbGRzXG4gKiBJdCBjYW4gYWxzbyBwcm92aWRlIGN1c3RvbSB0aXRsZSBhbmQgZm9ybWF0IGZvciBmaWVsZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZlZ2EodmdWaWV3OiBWZ1ZpZXcsIG9wdGlvbnM6IE9wdGlvbiA9IHtzaG93QWxsRmllbGRzOiB0cnVlfSkge1xuICAvLyBpbml0aWFsaXplIHRvb2x0aXAgd2l0aCBpdGVtIGRhdGEgYW5kIG9wdGlvbnMgb24gbW91c2Ugb3ZlclxuICB2Z1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyLnRvb2x0aXBJbml0JywgZnVuY3Rpb24gKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBTY2VuZWdyYXBoKSB7XG4gICAgaWYgKHNob3VsZFNob3dUb29sdGlwKGl0ZW0pKSB7XG4gICAgICAvLyBjbGVhciBleGlzdGluZyBwcm9taXNlIGJlY2F1c2UgbW91c2UgY2FuIG9ubHkgcG9pbnQgYXQgb25lIHRoaW5nIGF0IGEgdGltZVxuICAgICAgY2FuY2VsUHJvbWlzZSgpO1xuXG4gICAgICB0b29sdGlwUHJvbWlzZSA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5pdChldmVudCwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICB9LCBvcHRpb25zLmRlbGF5IHx8IERFTEFZKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHVwZGF0ZSB0b29sdGlwIHBvc2l0aW9uIG9uIG1vdXNlIG1vdmVcbiAgLy8gKGltcG9ydGFudCBmb3IgbGFyZ2UgbWFya3MgZS5nLiBiYXJzKVxuICB2Z1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlLnRvb2x0aXBVcGRhdGUnLCBmdW5jdGlvbiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IFNjZW5lZ3JhcGgpIHtcbiAgICBpZiAoc2hvdWxkU2hvd1Rvb2x0aXAoaXRlbSkgJiYgdG9vbHRpcEFjdGl2ZSkge1xuICAgICAgdXBkYXRlKGV2ZW50LCBpdGVtLCBvcHRpb25zKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGNsZWFyIHRvb2x0aXAgb24gbW91c2Ugb3V0XG4gIHZnVmlldy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dC50b29sdGlwUmVtb3ZlJywgZnVuY3Rpb24gKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBTY2VuZWdyYXBoKSB7XG4gICAgaWYgKHNob3VsZFNob3dUb29sdGlwKGl0ZW0pKSB7XG4gICAgICBjYW5jZWxQcm9taXNlKCk7XG5cbiAgICAgIGlmICh0b29sdGlwQWN0aXZlKSB7XG4gICAgICAgIGNsZWFyKGV2ZW50LCBpdGVtLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgdmdWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3Zlci50b29sdGlwSW5pdCcpO1xuICAgICAgdmdWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZS50b29sdGlwVXBkYXRlJyk7XG4gICAgICB2Z1ZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQudG9vbHRpcFJlbW92ZScpO1xuXG4gICAgICBjYW5jZWxQcm9taXNlKCk7IC8vIGNsZWFyIHRvb2x0aXAgcHJvbWlzZVxuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZWdhTGl0ZSh2Z1ZpZXc6IFZnVmlldywgdmxTcGVjOiBUb3BMZXZlbEV4dGVuZGVkU3BlYywgb3B0aW9uczogT3B0aW9uID0ge30pIHtcbiAgb3B0aW9ucyA9IHN1cHBsZW1lbnRPcHRpb25zKG9wdGlvbnMsIHZsU3BlYyk7XG5cbiAgLy8gVE9ETzogdXBkYXRlIHRoaXMgdG8gdXNlIG5ldyB2ZWdhLXZpZXcgYXBpIChhZGRFdmVudExpc3RlbmVyKVxuICAvLyBpbml0aWFsaXplIHRvb2x0aXAgd2l0aCBpdGVtIGRhdGEgYW5kIG9wdGlvbnMgb24gbW91c2Ugb3ZlclxuICB2Z1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyLnRvb2x0aXBJbml0JywgZnVuY3Rpb24gKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBTY2VuZWdyYXBoKSB7XG4gICAgaWYgKHNob3VsZFNob3dUb29sdGlwKGl0ZW0pKSB7XG4gICAgICAvLyBjbGVhciBleGlzdGluZyBwcm9taXNlIGJlY2F1c2UgbW91c2UgY2FuIG9ubHkgcG9pbnQgYXQgb25lIHRoaW5nIGF0IGEgdGltZVxuICAgICAgY2FuY2VsUHJvbWlzZSgpO1xuXG4gICAgICAvLyBtYWtlIGEgbmV3IHByb21pc2Ugd2l0aCB0aW1lIGRlbGF5IGZvciB0b29sdGlwXG4gICAgICB0b29sdGlwUHJvbWlzZSA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5pdChldmVudCwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICB9LCBvcHRpb25zLmRlbGF5IHx8IERFTEFZKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHVwZGF0ZSB0b29sdGlwIHBvc2l0aW9uIG9uIG1vdXNlIG1vdmVcbiAgLy8gKGltcG9ydGFudCBmb3IgbGFyZ2UgbWFya3MgZS5nLiBiYXJzKVxuICB2Z1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlLnRvb2x0aXBVcGRhdGUnLCBmdW5jdGlvbiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IFNjZW5lZ3JhcGgpIHtcbiAgICBpZiAoc2hvdWxkU2hvd1Rvb2x0aXAoaXRlbSkgJiYgdG9vbHRpcEFjdGl2ZSkge1xuICAgICAgdXBkYXRlKGV2ZW50LCBpdGVtLCBvcHRpb25zKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGNsZWFyIHRvb2x0aXAgb24gbW91c2Ugb3V0XG4gIHZnVmlldy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dC50b29sdGlwUmVtb3ZlJywgZnVuY3Rpb24gKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBTY2VuZWdyYXBoKSB7XG4gICAgaWYgKHNob3VsZFNob3dUb29sdGlwKGl0ZW0pKSB7XG4gICAgICBjYW5jZWxQcm9taXNlKCk7XG5cbiAgICAgIGlmICh0b29sdGlwQWN0aXZlKSB7XG4gICAgICAgIGNsZWFyKGV2ZW50LCBpdGVtLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgdmdWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3Zlci50b29sdGlwSW5pdCcpO1xuICAgICAgdmdWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZS50b29sdGlwVXBkYXRlJyk7XG4gICAgICB2Z1ZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQudG9vbHRpcFJlbW92ZScpO1xuXG4gICAgICBjYW5jZWxQcm9taXNlKCk7IC8vIGNsZWFyIHRvb2x0aXAgcHJvbWlzZVxuICAgIH1cbiAgfTtcbn07XG5cbi8qIENhbmNlbCB0b29sdGlwIHByb21pc2UgKi9cbmZ1bmN0aW9uIGNhbmNlbFByb21pc2UoKSB7XG4gIC8qIFdlIGRvbid0IGNoZWNrIGlmIHRvb2x0aXBQcm9taXNlIGlzIHZhbGlkIGJlY2F1c2UgcGFzc2luZ1xuICAgYW4gaW52YWxpZCBJRCB0byBjbGVhclRpbWVvdXQgZG9lcyBub3QgaGF2ZSBhbnkgZWZmZWN0XG4gICAoYW5kIGRvZXNuJ3QgdGhyb3cgYW4gZXhjZXB0aW9uKS4gKi9cbiAgaWYgKHRvb2x0aXBQcm9taXNlKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0b29sdGlwUHJvbWlzZSk7XG4gICAgdG9vbHRpcFByb21pc2UgPSB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyogSW5pdGlhbGl6ZSB0b29sdGlwIHdpdGggZGF0YSAqL1xuZnVuY3Rpb24gaW5pdChldmVudDogTW91c2VFdmVudCwgaXRlbTogU2NlbmVncmFwaCwgb3B0aW9uczogT3B0aW9uKSB7XG4gIC8vIGdldCB0b29sdGlwIEhUTUwgcGxhY2Vob2xkZXJcbiAgY29uc3QgdG9vbHRpcFBsYWNlaG9sZGVyID0gZ2V0VG9vbHRpcFBsYWNlaG9sZGVyKCk7XG5cbiAgLy8gcHJlcGFyZSBkYXRhIGZvciB0b29sdGlwXG4gIGNvbnN0IHRvb2x0aXBEYXRhID0gZ2V0VG9vbHRpcERhdGEoaXRlbSwgb3B0aW9ucyk7XG4gIGlmICghdG9vbHRpcERhdGEgfHwgdG9vbHRpcERhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIGJpbmQgZGF0YSB0byB0b29sdGlwIEhUTUwgcGxhY2Vob2xkZXJcbiAgYmluZERhdGEodG9vbHRpcFBsYWNlaG9sZGVyLCB0b29sdGlwRGF0YSk7XG5cbiAgdXBkYXRlUG9zaXRpb24oZXZlbnQsIG9wdGlvbnMpO1xuICB1cGRhdGVDb2xvclRoZW1lKG9wdGlvbnMpO1xuICBzZWxlY3QoJyN2aXMtdG9vbHRpcCcpLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgdG9vbHRpcEFjdGl2ZSA9IHRydWU7XG5cbiAgLy8gaW52b2tlIHVzZXItcHJvdmlkZWQgY2FsbGJhY2tcbiAgaWYgKG9wdGlvbnMub25BcHBlYXIpIHtcbiAgICBvcHRpb25zLm9uQXBwZWFyKGV2ZW50LCBpdGVtKTtcbiAgfVxufVxuXG4vKiBVcGRhdGUgdG9vbHRpcCBwb3NpdGlvbiBvbiBtb3VzZW1vdmUgKi9cbmZ1bmN0aW9uIHVwZGF0ZShldmVudDogTW91c2VFdmVudCwgaXRlbTogU2NlbmVncmFwaCwgb3B0aW9uczogT3B0aW9uKSB7XG4gIHVwZGF0ZVBvc2l0aW9uKGV2ZW50LCBvcHRpb25zKTtcblxuICAvLyBpbnZva2UgdXNlci1wcm92aWRlZCBjYWxsYmFja1xuICBpZiAob3B0aW9ucy5vbk1vdmUpIHtcbiAgICBvcHRpb25zLm9uTW92ZShldmVudCwgaXRlbSk7XG4gIH1cbn1cblxuLyogQ2xlYXIgdG9vbHRpcCAqL1xuZnVuY3Rpb24gY2xlYXIoZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IFNjZW5lZ3JhcGgsIG9wdGlvbnM6IE9wdGlvbikge1xuICAvLyB2aXNpYmlsaXR5IGhpZGRlbiBpbnN0ZWFkIG9mIGRpc3BsYXkgbm9uZVxuICAvLyBiZWNhdXNlIHdlIG5lZWQgY29tcHV0ZWQgdG9vbHRpcCB3aWR0aCBhbmQgaGVpZ2h0IHRvIGJlc3QgcG9zaXRpb24gaXRcbiAgc2VsZWN0KCcjdmlzLXRvb2x0aXAnKS5zdHlsZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblxuICB0b29sdGlwQWN0aXZlID0gZmFsc2U7XG4gIGNsZWFyRGF0YSgpO1xuICBjbGVhckNvbG9yVGhlbWUoKTtcbiAgY2xlYXJQb3NpdGlvbigpO1xuXG4gIC8vIGludm9rZSB1c2VyLXByb3ZpZGVkIGNhbGxiYWNrXG4gIGlmIChvcHRpb25zLm9uRGlzYXBwZWFyKSB7XG4gICAgb3B0aW9ucy5vbkRpc2FwcGVhcihldmVudCwgaXRlbSk7XG4gIH1cbn1cblxuLyogRGVjaWRlIGlmIGEgU2NlbmVncmFwaCBpdGVtIGRlc2VydmVzIHRvb2x0aXAgKi9cbmZ1bmN0aW9uIHNob3VsZFNob3dUb29sdGlwKGl0ZW06IFNjZW5lZ3JhcGgpIHtcbiAgLy8gbm8gZGF0YSwgbm8gc2hvd1xuICBpZiAoIWl0ZW0gfHwgIWl0ZW0uZGF0dW0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gKHNtYWxsIG11bHRpcGxlcykgYXZvaWQgc2hvd2luZyB0b29sdGlwIGZvciBhIGZhY2V0J3MgYmFja2dyb3VuZFxuICBpZiAoaXRlbS5kYXR1bS5fZmFjZXRJRCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBhdm9pZCBzaG93aW5nIHRvb2x0aXAgZm9yIGF4aXMgdGl0bGUgYW5kIGxhYmVsc1xuICBpZiAoIWl0ZW0uZGF0dW0uX2lkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuIiwiZXhwb3J0IGludGVyZmFjZSBPcHRpb24ge1xuICBzaG93QWxsRmllbGRzPzogYm9vbGVhbjtcbiAgZmllbGRzPzogRmllbGRPcHRpb25bXTtcbiAgZGVsYXk/OiBudW1iZXI7XG4gIG9mZnNldD86IHtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyXG4gIH07XG4gIG9uQXBwZWFyPyhldmVudDogRXZlbnQsIGl0ZW06IG9iamVjdCk6IHZvaWQ7XG4gIG9uTW92ZT8oZXZlbnQ6IEV2ZW50LCBpdGVtOiBvYmplY3QpOiB2b2lkO1xuICBvbkRpc2FwcGVhcj8oZXZlbnQ6IEV2ZW50LCBpdGVtOiBvYmplY3QpOiB2b2lkO1xuICBjb2xvclRoZW1lPzogJ2xpZ2h0JyB8ICdkYXJrJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZE9wdGlvbiB7XG4gIGZpZWxkPzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgZm9ybWF0VHlwZT86ICdudW1iZXInIHwgJ3RpbWUnIHwgJ3N0cmluZyc7XG4gIGZvcm1hdD86IHN0cmluZztcbiAgYWdncmVnYXRlPzogc3RyaW5nO1xuICBiaW4/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uIGV4dGVuZHMgRmllbGRPcHRpb24ge1xuICByZW1vdmVPcmlnaW5hbFRlbXBvcmFsRmllbGQ/OiBzdHJpbmc7XG4gIGJpbj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIFRvb2x0aXBEYXRhID0ge3RpdGxlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXJ9O1xuXG5leHBvcnQgdHlwZSBTY2VuZWdyYXBoID0ge1xuICBkYXR1bToge1xuICAgIF9mYWNldElEOiBudW1iZXIsXG4gICAgX2lkOiBudW1iZXJcbiAgfSxcbiAgbWFyazoge1xuICAgIG1hcmt0eXBlOiBzdHJpbmcsXG4gICAgaXRlbXM6IG9iamVjdCxcbiAgICBuYW1lOiBzdHJpbmdcbiAgfVxufTtcblxuZXhwb3J0IHR5cGUgVmdWaWV3ID0gYW55O1xuXG5leHBvcnQgY29uc3QgREVMQVkgPSAxMDA7XG4iLCJpbXBvcnQge01hcCwgbWFwIGFzIGQzbWFwfSBmcm9tICdkMy1jb2xsZWN0aW9uJztcbmltcG9ydCB7YXV0b0Zvcm1hdCwgY3VzdG9tRm9ybWF0fSBmcm9tICcuL2Zvcm1hdEZpZWxkVmFsdWUnO1xuaW1wb3J0IHtGaWVsZE9wdGlvbiwgT3B0aW9uLCBTY2VuZWdyYXBoLCBTdXBwbGVtZW50ZWRGaWVsZE9wdGlvbiwgVG9vbHRpcERhdGF9IGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogUHJlcGFyZSBkYXRhIGZvciB0aGUgdG9vbHRpcFxuICogQHJldHVybiBBbiBhcnJheSBvZiB0b29sdGlwIGRhdGEgW3sgdGl0bGU6IC4uLiwgdmFsdWU6IC4uLn1dXG4gKi9cbi8vIFRPRE86IGFkZCBtYXJrdHlwZVxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvb2x0aXBEYXRhKGl0ZW06IFNjZW5lZ3JhcGgsIG9wdGlvbnM6IE9wdGlvbikge1xuICAvLyBpZ25vcmUgdGhlIGRhdGEgZm9yIGdyb3VwIHR5cGUgdGhhdCByZXByZXNlbnRzIHdoaXRlIHNwYWNlXG4gIGlmIChpdGVtLm1hcmsubWFya3R5cGUgPT09ICdncm91cCcgJiYgaXRlbS5tYXJrLm5hbWUgPT09ICduZXN0ZWRfbWFpbl9ncm91cCcpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gdGhpcyBhcnJheSB3aWxsIGJlIGJpbmQgdG8gdGhlIHRvb2x0aXAgZWxlbWVudFxuICBsZXQgdG9vbHRpcERhdGE6IFRvb2x0aXBEYXRhW107XG4gIGNvbnN0IGl0ZW1EYXRhOiBNYXA8YW55PiA9IGQzbWFwKGl0ZW0uZGF0dW0pO1xuXG4gIGNvbnN0IHJlbW92ZUtleXMgPSBbXG4gICAgJ19pZCcsICdfcHJldicsICd3aWR0aCcsICdoZWlnaHQnLFxuICAgICdjb3VudF9zdGFydCcsICdjb3VudF9lbmQnLFxuICAgICdsYXlvdXRfc3RhcnQnLCAnbGF5b3V0X21pZCcsICdsYXlvdXRfZW5kJywgJ2xheW91dF9wYXRoJywgJ2xheW91dF94JywgJ2xheW91dF95J1xuICBdO1xuICByZW1vdmVGaWVsZHMoaXRlbURhdGEsIHJlbW92ZUtleXMpO1xuXG4gIC8vIHJlbW92ZSBkdXBsaWNhdGUgdGltZSBmaWVsZHMgKGlmIGFueSlcbiAgcmVtb3ZlRHVwbGljYXRlVGltZUZpZWxkcyhpdGVtRGF0YSwgb3B0aW9ucy5maWVsZHMpO1xuXG4gIC8vIGNvbWJpbmUgbXVsdGlwbGUgcm93cyBvZiBhIGJpbm5lZCBmaWVsZCBpbnRvIGEgc2luZ2xlIHJvd1xuICBjb21iaW5lQmluRmllbGRzKGl0ZW1EYXRhLCBvcHRpb25zLmZpZWxkcyk7XG5cbiAgLy8gVE9ETyh6ZW5pbmcpOiB1c2UgVmVnYS1MaXRlIGxheWVyaW5nIHRvIHN1cHBvcnQgdG9vbHRpcCBvbiBsaW5lIGFuZCBhcmVhIGNoYXJ0cyAoIzEpXG4gIGRyb3BGaWVsZHNGb3JMaW5lQXJlYShpdGVtLm1hcmsubWFya3R5cGUsIGl0ZW1EYXRhKTtcblxuICBpZiAob3B0aW9ucy5zaG93QWxsRmllbGRzID09PSB0cnVlKSB7XG4gICAgdG9vbHRpcERhdGEgPSBwcmVwYXJlQWxsRmllbGRzRGF0YShpdGVtRGF0YSwgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgdG9vbHRpcERhdGEgPSBwcmVwYXJlQ3VzdG9tRmllbGRzRGF0YShpdGVtRGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gdG9vbHRpcERhdGE7XG59XG5cbi8qKlxuICogUHJlcGFyZSBjdXN0b20gZmllbGRzIGRhdGEgZm9yIHRvb2x0aXAuIFRoaXMgZnVuY3Rpb24gZm9ybWF0c1xuICogZmllbGQgdGl0bGVzIGFuZCB2YWx1ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgZm9ybWF0dGVkIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge3RpbWUubWFwfSBpdGVtRGF0YSAtIGEgbWFwIG9mIGl0ZW0uZGF0dW1cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdXNlci1wcm92aWRlZCBvcHRpb25zXG4gKiBAcmV0dXJuIEFuIGFycmF5IG9mIGZvcm1hdHRlZCBmaWVsZHMgc3BlY2lmaWVkIGJ5IG9wdGlvbnMgW3sgdGl0bGU6IC4uLiwgdmFsdWU6IC4uLn1dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlQ3VzdG9tRmllbGRzRGF0YShpdGVtRGF0YTogTWFwPGFueT4sIG9wdGlvbnM6IE9wdGlvbikge1xuICBjb25zdCB0b29sdGlwRGF0YTogVG9vbHRpcERhdGFbXSA9IFtdO1xuXG4gIG9wdGlvbnMuZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkT3B0aW9uKSB7XG4gICAgLy8gcHJlcGFyZSBmaWVsZCB0aXRsZVxuICAgIGNvbnN0IHRpdGxlID0gZmllbGRPcHRpb24udGl0bGUgPyBmaWVsZE9wdGlvbi50aXRsZSA6IGZpZWxkT3B0aW9uLmZpZWxkO1xuXG4gICAgLy8gZ2V0IChyYXcpIGZpZWxkIHZhbHVlXG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZShpdGVtRGF0YSwgZmllbGRPcHRpb24uZmllbGQpO1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIGZvcm1hdCB2YWx1ZVxuICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gY3VzdG9tRm9ybWF0KHZhbHVlLCBmaWVsZE9wdGlvbi5mb3JtYXRUeXBlLCBmaWVsZE9wdGlvbi5mb3JtYXQpIHx8IGF1dG9Gb3JtYXQodmFsdWUpO1xuXG4gICAgLy8gYWRkIGZvcm1hdHRlZCBkYXRhIHRvIHRvb2x0aXBEYXRhXG4gICAgdG9vbHRpcERhdGEucHVzaCh7dGl0bGU6IHRpdGxlLCB2YWx1ZTogZm9ybWF0dGVkVmFsdWV9KTtcblxuICB9KTtcblxuICByZXR1cm4gdG9vbHRpcERhdGE7XG59XG5cbi8qKlxuICogR2V0IGEgZmllbGQgdmFsdWUgZnJvbSBhIGRhdGEgbWFwLlxuICogQHBhcmFtIHt0aW1lLm1hcH0gaXRlbURhdGEgLSBhIG1hcCBvZiBpdGVtLmRhdHVtXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGQgLSB0aGUgbmFtZSBvZiB0aGUgZmllbGQuIEl0IGNhbiBjb250YWluIFwiLlwiIHRvIHNwZWNpZnlcbiAqIHRoYXQgdGhlIGZpZWxkIGlzIG5vdCBhIGRpcmVjdCBjaGlsZCBvZiBpdGVtLmRhdHVtXG4gKiBAcmV0dXJuIHRoZSBmaWVsZCB2YWx1ZSBvbiBzdWNjZXNzLCB1bmRlZmluZWQgb3RoZXJ3aXNlXG4gKi9cbi8vIFRPRE8oemVuaW5nKTogTXV0ZSBcIkNhbm5vdCBmaW5kIGZpZWxkXCIgd2FybmluZ3MgZm9yIGNvbXBvc2l0ZSB2aXMgKGlzc3VlICMzOSlcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYWx1ZShpdGVtRGF0YTogTWFwPGFueT4sIGZpZWxkOiBzdHJpbmcpIHtcbiAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlO1xuXG4gIGNvbnN0IGFjY2Vzc29yczogc3RyaW5nW10gPSBmaWVsZC5zcGxpdCgnLicpO1xuXG4gIC8vIGdldCB0aGUgZmlyc3QgYWNjZXNzb3IgYW5kIHJlbW92ZSBpdCBmcm9tIHRoZSBhcnJheVxuICBjb25zdCBmaXJzdEFjY2Vzc29yOiBzdHJpbmcgPSBhY2Nlc3NvcnNbMF07XG4gIGFjY2Vzc29ycy5zaGlmdCgpO1xuICBpZiAoaXRlbURhdGEuaGFzKGZpcnN0QWNjZXNzb3IpKSB7XG4gICAgdmFsdWUgPSBpdGVtRGF0YS5nZXQoZmlyc3RBY2Nlc3Nvcik7XG5cbiAgICAvLyBpZiB3ZSBzdGlsbCBoYXZlIGFjY2Vzc29ycywgdXNlIHRoZW0gdG8gZ2V0IHRoZSB2YWx1ZVxuICAgIGFjY2Vzc29ycy5mb3JFYWNoKGZ1bmN0aW9uIChhKSB7XG4gICAgICBpZiAodmFsdWVbYV0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVthXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc29sZS53YXJuKCdbVG9vbHRpcF0gQ2Fubm90IGZpbmQgZmllbGQgJyArIGZpZWxkICsgJyBpbiBkYXRhLicpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cblxuLyoqXG4gKiBQcmVwYXJlIGRhdGEgZm9yIGFsbCBmaWVsZHMgaW4gaXRlbURhdGEgZm9yIHRvb2x0aXAuIFRoaXMgZnVuY3Rpb25cbiAqIGZvcm1hdHMgZmllbGQgdGl0bGVzIGFuZCB2YWx1ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgZm9ybWF0dGVkIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge3RpbWUubWFwfSBpdGVtRGF0YSAtIGEgbWFwIG9mIGl0ZW0uZGF0dW1cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdXNlci1wcm92aWRlZCBvcHRpb25zXG4gKiBAcmV0dXJuIEFsbCBmaWVsZHMgaW4gaXRlbURhdGEsIGZvcm1hdHRlZCwgaW4gdGhlIGZvcm0gb2YgYW4gYXJyYXk6IFt7IHRpdGxlOiAuLi4sIHZhbHVlOiAuLi59XVxuICpcbiAqIFBsZWFzZSBub3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBleHBlY3RzIGl0ZW1EYXRhIHRvIGJlIHNpbXBsZSB7ZmllbGQ6dmFsdWV9IHBhaXJzLlxuICogSXQgd2lsbCBub3QgdHJ5IHRvIHBhcnNlIHZhbHVlIGlmIGl0IGlzIGFuIG9iamVjdC4gSWYgdmFsdWUgaXMgYW4gb2JqZWN0LCBwbGVhc2VcbiAqIHVzZSBwcmVwYXJlQ3VzdG9tRmllbGRzRGF0YSgpIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlQWxsRmllbGRzRGF0YShpdGVtRGF0YTogTWFwPGFueT4sIG9wdGlvbnM6IE9wdGlvbikge1xuICBjb25zdCB0b29sdGlwRGF0YTogVG9vbHRpcERhdGFbXSA9IFtdO1xuXG4gIC8vIGhlcmUsIGZpZWxkT3B0aW9ucyBzdGlsbCBwcm92aWRlcyBmb3JtYXRcbiAgY29uc3QgZmllbGRPcHRpb25zID0gZDNtYXAob3B0aW9ucy5maWVsZHMsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLmZpZWxkOyB9KTtcblxuICBpdGVtRGF0YS5lYWNoKGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nLCBmaWVsZDogc3RyaW5nKSB7XG4gICAgLy8gcHJlcGFyZSB0aXRsZVxuICAgIGxldCB0aXRsZTtcbiAgICBpZiAoZmllbGRPcHRpb25zLmhhcyhmaWVsZCkgJiYgZmllbGRPcHRpb25zLmdldChmaWVsZCkudGl0bGUpIHtcbiAgICAgIHRpdGxlID0gZmllbGRPcHRpb25zLmdldChmaWVsZCkudGl0bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlID0gZmllbGQ7XG4gICAgfVxuXG4gICAgbGV0IGZvcm1hdFR5cGU7XG4gICAgbGV0IGZvcm1hdDtcbiAgICAvLyBmb3JtYXQgdmFsdWVcbiAgICBpZiAoZmllbGRPcHRpb25zLmhhcyhmaWVsZCkpIHtcbiAgICAgIGZvcm1hdFR5cGUgPSBmaWVsZE9wdGlvbnMuZ2V0KGZpZWxkKS5mb3JtYXRUeXBlO1xuICAgICAgZm9ybWF0ID0gZmllbGRPcHRpb25zLmdldChmaWVsZCkuZm9ybWF0O1xuICAgIH1cbiAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IGN1c3RvbUZvcm1hdCh2YWx1ZSwgZm9ybWF0VHlwZSwgZm9ybWF0KSB8fCBhdXRvRm9ybWF0KHZhbHVlKTtcblxuICAgIC8vIGFkZCBmb3JtYXR0ZWQgZGF0YSB0byB0b29sdGlwRGF0YVxuICAgIHRvb2x0aXBEYXRhLnB1c2goe3RpdGxlOiB0aXRsZSwgdmFsdWU6IGZvcm1hdHRlZFZhbHVlfSk7XG4gIH0pO1xuXG4gIHJldHVybiB0b29sdGlwRGF0YTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgbXVsdGlwbGUgZmllbGRzIGZyb20gYSB0b29sdGlwIGRhdGEgbWFwLCB1c2luZyByZW1vdmVLZXlzXG4gKlxuICogQ2VydGFpbiBtZXRhIGRhdGEgZmllbGRzIChlLmcuIFwiX2lkXCIsIFwiX3ByZXZcIikgc2hvdWxkIGJlIGhpZGRlbiBpbiB0aGUgdG9vbHRpcFxuICogYnkgZGVmYXVsdC4gVGhpcyBmdW5jdGlvbiBjYW4gYmUgdXNlZCB0byByZW1vdmUgdGhlc2UgZmllbGRzIGZyb20gdG9vbHRpcCBkYXRhLlxuICogQHBhcmFtIHt0aW1lLm1hcH0gZGF0YU1hcCAtIHRoZSBkYXRhIG1hcCB0aGF0IGNvbnRhaW5zIHRvb2x0aXAgZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHJlbW92ZUtleXMgLSB0aGUgZmllbGRzIHRoYXQgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSBkYXRhTWFwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRmllbGRzKGRhdGFNYXA6IE1hcDxhbnk+LCByZW1vdmVLZXlzOiBzdHJpbmdbXSkge1xuICByZW1vdmVLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGRhdGFNYXAucmVtb3ZlKGtleSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFdoZW4gYSB0ZW1wb3JhbCBmaWVsZCBoYXMgdGltZVVuaXQsIGl0ZW1EYXRhIHdpbGwgZ2l2ZSB1cyBkdXBsaWNhdGVkIGZpZWxkc1xuICogKGUuZy4sIFllYXIgYW5kIFlFQVIoWWVhcikpLiBJbiB0b29sdGlwIHdhbnQgdG8gZGlzcGxheSB0aGUgZmllbGQgV0lUSCB0aGVcbiAqIHRpbWVVbml0IGFuZCByZW1vdmUgdGhlIGZpZWxkIHRoYXQgZG9lc24ndCBoYXZlIHRpbWVVbml0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlVGltZUZpZWxkcyhpdGVtRGF0YTogTWFwPGFueT4sIG9wdEZpZWxkczogU3VwcGxlbWVudGVkRmllbGRPcHRpb25bXSkge1xuICBpZiAoIW9wdEZpZWxkcykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBvcHRGaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAob3B0RmllbGQpIHtcbiAgICBpZiAob3B0RmllbGQucmVtb3ZlT3JpZ2luYWxUZW1wb3JhbEZpZWxkKSB7XG4gICAgICByZW1vdmVGaWVsZHMoaXRlbURhdGEsIFtvcHRGaWVsZC5yZW1vdmVPcmlnaW5hbFRlbXBvcmFsRmllbGRdKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbWJpbmUgbXVsdGlwbGUgYmlubmVkIGZpZWxkcyBpbiBpdGVtRGF0YSBpbnRvIG9uZSBmaWVsZC4gVGhlIHZhbHVlIG9mIHRoZSBmaWVsZFxuICogaXMgYSBzdHJpbmcgdGhhdCBkZXNjcmliZXMgdGhlIGJpbiByYW5nZS5cbiAqXG4gKiBAcGFyYW0ge3RpbWUubWFwfSBpdGVtRGF0YSAtIGEgbWFwIG9mIGl0ZW0uZGF0dW1cbiAqIEBwYXJhbSB7T2JqZWN0W119IGZpZWxkT3B0aW9ucyAtIGEgbGlzdCBvZiBmaWVsZCBvcHRpb25zIChpLmUuIG9wdGlvbnMuZmllbGRzW10pXG4gKiBAcmV0dXJuIGl0ZW1EYXRhIHdpdGggY29tYmluZWQgYmluIGZpZWxkc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUJpbkZpZWxkcyhpdGVtRGF0YTogTWFwPGFueT4sIGZpZWxkT3B0aW9uczogRmllbGRPcHRpb25bXSkge1xuICBpZiAoIWZpZWxkT3B0aW9ucykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBmaWVsZE9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGRPcHRpb24pIHtcbiAgICBpZiAoZmllbGRPcHRpb24uYmluID09PSB0cnVlKSB7XG4gICAgICAvLyBnZXQgYmlubmVkIGZpZWxkIG5hbWVzXG4gICAgICBjb25zdCBiaW5GaWVsZFJhbmdlID0gZmllbGRPcHRpb24uZmllbGQ7XG4gICAgICBjb25zdCBiaW5GaWVsZFN0YXJ0ID0gYmluRmllbGRSYW5nZS5jb25jYXQoJ19zdGFydCcpO1xuICAgICAgY29uc3QgYmluRmllbGRNaWQgPSBiaW5GaWVsZFJhbmdlLmNvbmNhdCgnX21pZCcpO1xuICAgICAgY29uc3QgYmluRmllbGRFbmQgPSBiaW5GaWVsZFJhbmdlLmNvbmNhdCgnX2VuZCcpO1xuXG4gICAgICAvLyB1c2Ugc3RhcnQgdmFsdWUgYW5kIGVuZCB2YWx1ZSB0byBjb21wdXRlIHJhbmdlXG4gICAgICAvLyBzYXZlIHRoZSBjb21wdXRlZCByYW5nZSBpbiBiaW5GaWVsZFN0YXJ0XG4gICAgICBjb25zdCBzdGFydFZhbHVlID0gaXRlbURhdGEuZ2V0KGJpbkZpZWxkU3RhcnQpO1xuICAgICAgY29uc3QgZW5kVmFsdWUgPSBpdGVtRGF0YS5nZXQoYmluRmllbGRFbmQpO1xuICAgICAgaWYgKChzdGFydFZhbHVlICE9PSB1bmRlZmluZWQpICYmIChlbmRWYWx1ZSAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICBjb25zdCByYW5nZSA9IHN0YXJ0VmFsdWUgKyAnLScgKyBlbmRWYWx1ZTtcbiAgICAgICAgaXRlbURhdGEuc2V0KGJpbkZpZWxkUmFuZ2UsIHJhbmdlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGJpbkZpZWxkTWlkLCBiaW5GaWVsZEVuZCwgYW5kIGJpbkZpZWxkUmFuZ2UgZnJvbSBpdGVtRGF0YVxuICAgICAgY29uc3QgYmluUmVtb3ZlS2V5cyA9IFtdO1xuICAgICAgYmluUmVtb3ZlS2V5cy5wdXNoKGJpbkZpZWxkU3RhcnQsIGJpbkZpZWxkTWlkLCBiaW5GaWVsZEVuZCk7XG4gICAgICByZW1vdmVGaWVsZHMoaXRlbURhdGEsIGJpblJlbW92ZUtleXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGl0ZW1EYXRhO1xufVxuXG4vKipcbiAqIERyb3AgZmllbGRzIGZvciBsaW5lIGFuZCBhcmVhIG1hcmtzLlxuICpcbiAqIExpbmVzIGFuZCBhcmVhcyBhcmUgZGVmaW5lZCBieSBhIHNlcmllcyBvZiBkYXR1bS4gV2Ugb3ZlcmxheSBwb2ludCBtYXJrc1xuICogb24gdG9wIG9mIGxpbmVzIGFuZCBhcmVhcyB0byBhbGxvdyB0b29sdGlwIHRvIHNob3cgYWxsIGRhdGEgaW4gdGhlIHNlcmllcy5cbiAqIEZvciB0aGUgbGluZSBtYXJrcyBhbmQgYXJlYSBtYXJrcyB1bmRlcm5lYXRoLCB3ZSBvbmx5IHNob3cgbm9taW5hbCBmaWVsZHNcbiAqIGluIHRvb2x0aXAuIFRoaXMgaXMgYmVjYXVzZSBsaW5lIC8gYXJlYSBtYXJrcyBvbmx5IGdpdmUgdXMgdGhlIGxhc3QgZGF0dW1cbiAqIGluIHRoZWlyIHNlcmllcy4gSXQgb25seSBtYWtlIHNlbnNlIHRvIHNob3cgdGhlIG5vbWluYWwgZmllbGRzIChlLmcuLCBzeW1ib2xcbiAqID0gQVBQTCwgQU1aTiwgR09PRywgSUJNLCBNU0ZUKSBiZWNhdXNlIHRoZXNlIGZpZWxkcyBkb24ndCB0ZW5kIHRvIGNoYW5nZSBhbG9uZ1xuICogdGhlIGxpbmUgLyBhcmVhIGJvcmRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyb3BGaWVsZHNGb3JMaW5lQXJlYShtYXJrdHlwZTogc3RyaW5nLCBpdGVtRGF0YTogTWFwPGFueT4pIHtcbiAgaWYgKG1hcmt0eXBlID09PSAnbGluZScgfHwgbWFya3R5cGUgPT09ICdhcmVhJykge1xuICAgIGNvbnN0IHF1YW5LZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGl0ZW1EYXRhLmVhY2goZnVuY3Rpb24gKHZhbHVlLCBmaWVsZCkge1xuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBxdWFuS2V5cy5wdXNoKGZpZWxkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZW1vdmVGaWVsZHMoaXRlbURhdGEsIHF1YW5LZXlzKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgdmwgZnJvbSAndmVnYS1saXRlJztcbmltcG9ydCB7RmllbGREZWZ9IGZyb20gJ3ZlZ2EtbGl0ZS9idWlsZC9zcmMvZmllbGRkZWYnO1xuaW1wb3J0IHtUb3BMZXZlbEV4dGVuZGVkU3BlY30gZnJvbSAndmVnYS1saXRlL2J1aWxkL3NyYy9zcGVjJztcbmltcG9ydCB7VEVNUE9SQUx9IGZyb20gJ3ZlZ2EtbGl0ZS9idWlsZC9zcmMvdHlwZSc7XG5pbXBvcnQge0ZpZWxkT3B0aW9uLCBPcHRpb259IGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQge1N1cHBsZW1lbnRlZEZpZWxkT3B0aW9ufSBmcm9tICcuL29wdGlvbnMnO1xuXG4vKiBtYXBwaW5nIGZyb20gZmllbGREZWYudHlwZSB0byBmb3JtYXRUeXBlICovXG5jb25zdCBmb3JtYXRUeXBlTWFwOiB7IFt0eXBlOiBzdHJpbmddOiAnbnVtYmVyJyB8ICd0aW1lJyB9ID0ge1xuICAncXVhbnRpdGF0aXZlJzogJ251bWJlcicsXG4gICd0ZW1wb3JhbCc6ICd0aW1lJyxcbiAgJ29yZGluYWwnOiB1bmRlZmluZWQsXG4gICdub21pbmFsJzogdW5kZWZpbmVkXG59O1xuXG4vKipcbiAqIChWZWdhLUxpdGUgb25seSkgU3VwcGxlbWVudCBvcHRpb25zIHdpdGggdmxTcGVjXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgLSB1c2VyLXByb3ZpZGVkIG9wdGlvbnNcbiAqIEBwYXJhbSB2bFNwZWMgLSB2ZWdhLWxpdGUgc3BlY1xuICogQHJldHVybiB0aGUgdmxTcGVjLXN1cHBsZW1lbnRlZCBvcHRpb25zIG9iamVjdFxuICpcbiAqIGlmIG9wdGlvbnMuc2hvd0FsbEZpZWxkcyBpcyB0cnVlIG9yIHVuZGVmaW5lZCwgdmxTcGVjIHdpbGwgc3VwcGxlbWVudFxuICogb3B0aW9ucy5maWVsZHMgd2l0aCBhbGwgZmllbGRzIGluIHRoZSBzcGVjXG4gKiBpZiBvcHRpb25zLnNob3dBbGxGaWVsZHMgaXMgZmFsc2UsIHZsU3BlYyB3aWxsIG9ubHkgc3VwcGxlbWVudCBleGlzdGluZyBmaWVsZHNcbiAqIGluIG9wdGlvbnMuZmllbGRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdXBwbGVtZW50T3B0aW9ucyhvcHRpb25zOiBPcHRpb24sIHZsU3BlYzogVG9wTGV2ZWxFeHRlbmRlZFNwZWMpIHtcbiAgLy8gZmllbGRzIHRvIGJlIHN1cHBsZW1lbnRlZCBieSB2bFNwZWNcbiAgY29uc3Qgc3VwcGxlbWVudGVkRmllbGRzOiBGaWVsZE9wdGlvbltdID0gW107XG5cbiAgLy8gaWYgc2hvd0FsbEZpZWxkcyBpcyB0cnVlIG9yIHVuZGVmaW5lZCwgc3VwcGxlbWVudCBhbGwgZmllbGRzIGluIHZsU3BlY1xuICBpZiAob3B0aW9ucy5zaG93QWxsRmllbGRzICE9PSBmYWxzZSkge1xuICAgIHZsLnNwZWMuZmllbGREZWZzKHZsU3BlYykuZm9yRWFjaChmdW5jdGlvbiAoZmllbGREZWY6IEZpZWxkRGVmPHN0cmluZz4pIHtcbiAgICAgIC8vIGdldCBhIGZpZWxkT3B0aW9uIGluIG9wdGlvbnMgdGhhdCBtYXRjaGVzIHRoZSBmaWVsZERlZlxuICAgICAgY29uc3QgZmllbGRPcHRpb24gPSBnZXRGaWVsZE9wdGlvbihvcHRpb25zLmZpZWxkcywgZmllbGREZWYpO1xuXG4gICAgICAvLyBzdXBwbGVtZW50IHRoZSBmaWVsZE9wdGlvbiB3aXRoIGZpZWxkRGVmIGFuZCBjb25maWdcbiAgICAgIGNvbnN0IHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uID0gc3VwcGxlbWVudEZpZWxkT3B0aW9uKGZpZWxkT3B0aW9uLCBmaWVsZERlZiwgdmxTcGVjKTtcblxuICAgICAgc3VwcGxlbWVudGVkRmllbGRzLnB1c2goc3VwcGxlbWVudGVkRmllbGRPcHRpb24pO1xuICAgIH0pO1xuICB9IGVsc2UgeyAvLyBpZiBzaG93QWxsRmllbGRzIGlzIGZhbHNlLCBvbmx5IHN1cHBsZW1lbnQgZXhpc3RpbmcgZmllbGRzIGluIG9wdGlvbnMuZmllbGRzXG4gICAgaWYgKG9wdGlvbnMuZmllbGRzKSB7XG4gICAgICBvcHRpb25zLmZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZE9wdGlvbjogRmllbGRPcHRpb24pIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBmaWVsZERlZiBpbiB2bFNwZWMgdGhhdCBtYXRjaGVzIHRoZSBmaWVsZE9wdGlvblxuICAgICAgICBjb25zdCBmaWVsZERlZiA9IGdldEZpZWxkRGVmKHZsLnNwZWMuZmllbGREZWZzKHZsU3BlYykgYXMgRmllbGREZWY8c3RyaW5nPltdLCBmaWVsZE9wdGlvbik7XG5cbiAgICAgICAgLy8gc3VwcGxlbWVudCB0aGUgZmllbGRPcHRpb24gd2l0aCBmaWVsZERlZiBhbmQgY29uZmlnXG4gICAgICAgIGNvbnN0IHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uID0gc3VwcGxlbWVudEZpZWxkT3B0aW9uKGZpZWxkT3B0aW9uLCBmaWVsZERlZiwgdmxTcGVjKTtcblxuICAgICAgICBzdXBwbGVtZW50ZWRGaWVsZHMucHVzaChzdXBwbGVtZW50ZWRGaWVsZE9wdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvcHRpb25zLmZpZWxkcyA9IHN1cHBsZW1lbnRlZEZpZWxkcztcblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuLyoqXG4gKiBGaW5kIGEgZmllbGRPcHRpb24gaW4gZmllbGRPcHRpb25zIHRoYXQgbWF0Y2hlcyBhIGZpZWxkRGVmXG4gKlxuICogQHBhcmFtIHtPYmplY3RbXX0gZmllbGRPcHRpb25zcyAtIGEgbGlzdCBvZiBmaWVsZCBvcHRpb25zIChpLmUuIG9wdGlvbnMuZmllbGRzW10pXG4gKiBAcGFyYW0ge09iamVjdH0gZmllbGREZWYgLSBmcm9tIHZsU3BlY1xuICogQHJldHVybiB0aGUgbWF0Y2hpbmcgZmllbGRPcHRpb24sIG9yIHVuZGVmaW5lZCBpZiBubyBtYXRjaCB3YXMgZm91bmRcbiAqXG4gKiBJZiB0aGUgZmllbGREZWYgaXMgYWdncmVnYXRlZCwgZmluZCBhIGZpZWxkT3B0aW9uIHRoYXQgbWF0Y2hlcyB0aGUgZmllbGQgbmFtZSBhbmRcbiAqIHRoZSBhZ2dyZWdhdGlvbiBvZiB0aGUgZmllbGREZWYuXG4gKiBJZiB0aGUgZmllbGREZWYgaXMgbm90IGFnZ3JlZ2F0ZWQsIGZpbmQgYSBmaWVsZE9wdGlvbiB0aGF0IG1hdGNoZXMgdGhlIGZpZWxkIG5hbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWVsZE9wdGlvbihmaWVsZE9wdGlvbnM6IEZpZWxkT3B0aW9uW10sIGZpZWxkRGVmOiBGaWVsZERlZjxzdHJpbmc+KSB7XG4gIGlmICghZmllbGREZWYgfHwgIWZpZWxkT3B0aW9ucyB8fCBmaWVsZE9wdGlvbnMubGVuZ3RoIDw9IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gaWYgYWdncmVnYXRlLCBtYXRjaCBmaWVsZCBuYW1lIGFuZCBhZ2dyZWdhdGUgb3BlcmF0aW9uXG4gIGlmIChmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICAvLyB0cnkgZmluZCB0aGUgcGVyZmVjdCBtYXRjaDogZmllbGQgbmFtZSBlcXVhbHMsIGFnZ3JlZ2F0ZSBvcGVyYXRpb24gZXF1YWxzXG4gICAgZm9yIChsZXQgaXRlbSBvZiBmaWVsZE9wdGlvbnMpIHtcbiAgICAgIGlmIChpdGVtLmZpZWxkID09PSBmaWVsZERlZi5maWVsZCAmJiBpdGVtLmFnZ3JlZ2F0ZSA9PT0gZmllbGREZWYuYWdncmVnYXRlKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyeSBmaW5kIHRoZSBzZWNvbmQtYmVzdCBtYXRjaDogZmllbGQgbmFtZSBlcXVhbHMsIGZpZWxkLmFnZ3JlZ2F0ZSBpcyBub3Qgc3BlY2lmaWVkXG4gICAgZm9yIChsZXQgaXRlbSBvZiBmaWVsZE9wdGlvbnMpIHtcbiAgICAgIGlmIChpdGVtLmZpZWxkID09PSBmaWVsZERlZi5maWVsZCAmJiAhaXRlbS5hZ2dyZWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIHVuZGVmaW5lZCBpZiBubyBtYXRjaCB3YXMgZm91bmRcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGVsc2UgeyAvLyBpZiBub3QgYWdncmVnYXRlLCBqdXN0IG1hdGNoIGZpZWxkIG5hbWVcbiAgICBmb3IgKGxldCBpdGVtIG9mIGZpZWxkT3B0aW9ucykge1xuICAgICAgaWYgKGl0ZW0uZmllbGQgPT09IGZpZWxkRGVmLmZpZWxkKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybiB1bmRlZmluZWQgaWYgbm8gbWF0Y2ggd2FzIGZvdW5kXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIEZpbmQgYSBmaWVsZERlZiB0aGF0IG1hdGNoZXMgYSBmaWVsZE9wdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBmaWVsZE9wdGlvbiAtIGEgZmllbGQgb3B0aW9uIChhIG1lbWJlciBpbiBvcHRpb25zLmZpZWxkc1tdKVxuICogQHJldHVybiB0aGUgbWF0Y2hpbmcgZmllbGREZWYsIG9yIHVuZGVmaW5lZCBpZiBubyBtYXRjaCB3YXMgZm91bmRcbiAqXG4gKiBBIG1hdGNoaW5nIGZpZWxkRGVmIHNob3VsZCBoYXZlIHRoZSBzYW1lIGZpZWxkIG5hbWUgYXMgZmllbGRPcHRpb24uXG4gKiBJZiB0aGUgbWF0Y2hpbmcgZmllbGREZWYgaXMgYWdncmVnYXRlZCwgdGhlIGFnZ3JlZ2F0aW9uIHNob3VsZCBub3QgY29udHJhZGljdFxuICogd2l0aCB0aGF0IG9mIHRoZSBmaWVsZE9wdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpZWxkRGVmKGZpZWxkRGVmczogRmllbGREZWY8c3RyaW5nPltdLCBmaWVsZE9wdGlvbjogRmllbGRPcHRpb24pOiBGaWVsZERlZjxzdHJpbmc+IHtcbiAgaWYgKCFmaWVsZE9wdGlvbiB8fCAhZmllbGRPcHRpb24uZmllbGQgfHwgIWZpZWxkRGVmcykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBmaWVsZCBuYW1lIHNob3VsZCBtYXRjaCwgYWdncmVnYXRpb24gc2hvdWxkIG5vdCBkaXNhZ3JlZVxuICBmb3IgKGxldCBpdGVtIG9mIGZpZWxkRGVmcykge1xuICAgIGlmIChpdGVtLmZpZWxkID09PSBmaWVsZE9wdGlvbi5maWVsZCkge1xuICAgICAgaWYgKGl0ZW0uYWdncmVnYXRlKSB7XG4gICAgICAgIGlmIChpdGVtLmFnZ3JlZ2F0ZSA9PT0gZmllbGRPcHRpb24uYWdncmVnYXRlIHx8ICFmaWVsZE9wdGlvbi5hZ2dyZWdhdGUpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcmV0dXJuIHVuZGVmaW5lZCBpZiBubyBtYXRjaCB3YXMgZm91bmRcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBTdXBwbGVtZW50IGEgZmllbGRPcHRpb24gKGZyb20gb3B0aW9ucy5maWVsZHNbXSkgd2l0aCBhIGZpZWxkRGVmLCBjb25maWdcbiAqICh3aGljaCBwcm92aWRlcyB0aW1lRm9ybWF0LCBudW1iZXJGb3JtYXQsIGNvdW50VGl0bGUpXG4gKiBFaXRoZXIgZmllbGRPcHRpb24gb3IgZmllbGREZWYgY2FuIGJlIHVuZGVmaW5lZCwgYnV0IHRoZXkgY2Fubm90IGJvdGggYmUgdW5kZWZpbmVkLlxuICogY29uZmlnIChhbmQgaXRzIG1lbWJlcnMgdGltZUZvcm1hdCwgbnVtYmVyRm9ybWF0IGFuZCBjb3VudFRpdGxlKSBjYW4gYmUgdW5kZWZpbmVkLlxuICogQHJldHVybiB0aGUgc3VwcGxlbWVudGVkIGZpZWxkT3B0aW9uLCBvciB1bmRlZmluZWQgb24gZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1cHBsZW1lbnRGaWVsZE9wdGlvbihmaWVsZE9wdGlvbjogRmllbGRPcHRpb24sIGZpZWxkRGVmOiBGaWVsZERlZjxzdHJpbmc+LCB2bFNwZWM6IFRvcExldmVsRXh0ZW5kZWRTcGVjKSB7XG4gIC8vIG1hbnkgc3BlY3MgZG9uJ3QgaGF2ZSBjb25maWdcbiAgY29uc3QgY29uZmlnID0gdmwudXRpbC5leHRlbmQoe30sIHZsU3BlYy5jb25maWcpO1xuXG4gIC8vIGF0IGxlYXN0IG9uZSBvZiBmaWVsZE9wdGlvbiBhbmQgZmllbGREZWYgc2hvdWxkIGV4aXN0XG4gIGlmICghZmllbGRPcHRpb24gJiYgIWZpZWxkRGVmKSB7XG4gICAgY29uc29sZS5lcnJvcignW1Rvb2x0aXBdIENhbm5vdCBzdXBwbGVtZW50IGEgZmllbGQgd2hlbiBmaWVsZCBhbmQgZmllbGREZWYgYXJlIGJvdGggZW1wdHkuJyk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIGlmIGVpdGhlciBvbmUgb2YgZmllbGRPcHRpb24gYW5kIGZpZWxkRGVmIGlzIHVuZGVmaW5lZCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3RcbiAgaWYgKCFmaWVsZE9wdGlvbiAmJiBmaWVsZERlZikge1xuICAgIGZpZWxkT3B0aW9uID0ge307XG4gIH1cbiAgaWYgKGZpZWxkT3B0aW9uICYmICFmaWVsZERlZikge1xuICAgIGZpZWxkRGVmID0ge307XG4gIH1cblxuICAvLyB0aGUgc3VwcGxlbWVudGVkIGZpZWxkIG9wdGlvblxuICBjb25zdCBzdXBwbGVtZW50ZWRGaWVsZE9wdGlvbjogU3VwcGxlbWVudGVkRmllbGRPcHRpb24gPSB7fTtcblxuICAvLyBzdXBwbGVtZW50IGEgdXNlci1wcm92aWRlZCBmaWVsZCBuYW1lIHdpdGggdW5kZXJzY29yZSBwcmVmaXhlcyBhbmQgc3VmZml4ZXMgdG9cbiAgLy8gbWF0Y2ggdGhlIGZpZWxkIG5hbWVzIGluIGl0ZW0uZGF0dW1cbiAgLy8gZm9yIGFnZ3JlZ2F0aW9uLCB0aGlzIHdpbGwgYWRkIHByZWZpeCBcIm1lYW5fXCIgZXRjLlxuICAvLyBmb3IgdGltZVVuaXQsIHRoaXMgd2lsbCBhZGQgcHJlZml4IFwieWVhcm1vbnRoX1wiIGV0Yy5cbiAgLy8gZm9yIGJpbiwgdGhpcyB3aWxsIGFkZCBwcmVmaXggXCJiaW5fXCIgYW5kIHN1ZmZpeCBcIl9zdGFydFwiLiBMYXRlciB3ZSB3aWxsIHJlcGxhY2UgXCJfc3RhcnRcIiB3aXRoIFwiX3JhbmdlXCIuXG4gIHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uLmZpZWxkID0gZmllbGREZWYuZmllbGQgP1xuICAgIHZsLmZpZWxkRGVmLmZpZWxkKGZpZWxkRGVmKSA6IGZpZWxkT3B0aW9uLmZpZWxkO1xuXG4gIC8vIElmIGEgZmllbGREZWYgaXMgYSAoVElNRVVOSVQpVCwgd2UgY2hlY2sgaWYgdGhlIG9yaWdpbmFsIFQgaXMgcHJlc2VudCBpbiB0aGUgdmxTcGVjLlxuICAvLyBJZiBvbmx5IChUSU1FVU5JVClUIGlzIHByZXNlbnQgaW4gdmxTcGVjLCB3ZSBzZXQgYHJlbW92ZU9yaWdpbmFsVGVtcG9yYWxGaWVsZGAgdG8gVCxcbiAgLy8gd2hpY2ggd2lsbCBjYXVzZSBmdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVUaW1lRmllbGRzKCkgdG8gcmVtb3ZlIFQgYW5kIG9ubHkga2VlcCAoVElNRVVOSVQpVFxuICAvLyBpbiBpdGVtIGRhdGEuXG4gIC8vIElmIGJvdGggKFRJTUVVTklUKVQgYW5kIFQgYXJlIGluIHZsU3BlYywgd2Ugc2V0IGByZW1vdmVPcmlnaW5hbFRlbXBvcmFsRmllbGRgIHRvIHVuZGVmaW5lZCxcbiAgLy8gd2hpY2ggd2lsbCBsZWF2ZSBib3RoIFQgYW5kIChUSU1FVU5JVClUIGluIGl0ZW0gZGF0YS5cbiAgLy8gTm90ZTogdXNlciBzaG91bGQgbmV2ZXIgaGF2ZSB0byBwcm92aWRlIHRoaXMgYm9vbGVhbiBpbiBvcHRpb25zXG4gIGlmIChmaWVsZERlZi50eXBlID09PSBURU1QT1JBTCAmJiBmaWVsZERlZi50aW1lVW5pdCkge1xuICAgIC8vIGluIG1vc3QgY2FzZXMsIGlmIGl0J3MgYSAoVElNRVVOSVQpVCwgd2UgcmVtb3ZlIG9yaWdpbmFsIFRcbiAgICBjb25zdCBvcmlnaW5hbFRlbXBvcmFsRmllbGQgPSBmaWVsZERlZi5maWVsZDtcbiAgICBzdXBwbGVtZW50ZWRGaWVsZE9wdGlvbi5yZW1vdmVPcmlnaW5hbFRlbXBvcmFsRmllbGQgPSBvcmlnaW5hbFRlbXBvcmFsRmllbGQ7XG5cbiAgICAvLyBoYW5kbGUgY29ybmVyIGNhc2U6IGlmIFQgaXMgcHJlc2VudCBpbiB2bFNwZWMsIHRoZW4gd2Uga2VlcCBib3RoIFQgYW5kIChUSU1FVU5JVClUXG4gICAgY29uc3QgZmllbGREZWZzID0gdmwuc3BlYy5maWVsZERlZnModmxTcGVjKTtcbiAgICBmb3IgKGxldCBpdGVtcyBvZiBmaWVsZERlZnMpIHtcbiAgICAgIGlmIChpdGVtcy5maWVsZCA9PT0gb3JpZ2luYWxUZW1wb3JhbEZpZWxkICYmICFpdGVtcy50aW1lVW5pdCkge1xuICAgICAgICBzdXBwbGVtZW50ZWRGaWVsZE9wdGlvbi5yZW1vdmVPcmlnaW5hbFRlbXBvcmFsRmllbGQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHN1cHBsZW1lbnQgdGl0bGVcbiAgaWYgKCFjb25maWcuY291bnRUaXRsZSkge1xuICAgIGNvbmZpZy5jb3VudFRpdGxlID0gdmwuY29uZmlnLmRlZmF1bHRDb25maWcuY291bnRUaXRsZTsgLy8gdXNlIHZsIGRlZmF1bHQgY291bnRUaXRsZVxuICB9XG4gIHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uLnRpdGxlID0gZmllbGRPcHRpb24udGl0bGUgP1xuICAgIGZpZWxkT3B0aW9uLnRpdGxlIDogdmwuZmllbGREZWYudGl0bGUoZmllbGREZWYsIGNvbmZpZyk7XG5cbiAgLy8gc3VwcGxlbWVudCBmb3JtYXRUeXBlXG4gIHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uLmZvcm1hdFR5cGUgPSBmaWVsZE9wdGlvbi5mb3JtYXRUeXBlID9cbiAgICBmaWVsZE9wdGlvbi5mb3JtYXRUeXBlIDogZm9ybWF0VHlwZU1hcFtmaWVsZERlZi50eXBlXTtcblxuICAvLyBzdXBwbGVtZW50IGZvcm1hdFxuICBpZiAoZmllbGRPcHRpb24uZm9ybWF0KSB7XG4gICAgc3VwcGxlbWVudGVkRmllbGRPcHRpb24uZm9ybWF0ID0gZmllbGRPcHRpb24uZm9ybWF0O1xuICB9IGVsc2UgeyAvLyB3aGVuIHVzZXIgZG9lc24ndCBwcm92aWRlIGZvcm1hdCwgc3VwcGxlbWVudCBmb3JtYXQgdXNpbmcgdGltZVVuaXQsIHRpbWVGb3JtYXQsIGFuZCBudW1iZXJGb3JtYXRcbiAgICBzd2l0Y2ggKHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uLmZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICBzdXBwbGVtZW50ZWRGaWVsZE9wdGlvbi5mb3JtYXQgPSBmaWVsZERlZi50aW1lVW5pdCA/XG4gICAgICAgICAgLy8gVE9ETyh6ZW5pbmcpOiB1c2UgdGVtcGxhdGUgZm9yIGFsbCB0aW1lIGZpZWxkcywgdG8gYmUgY29uc2lzdGVudCB3aXRoIFZlZ2EtTGl0ZVxuICAgICAgICAgIHZsLnRpbWVVbml0LmZvcm1hdEV4cHJlc3Npb24oZmllbGREZWYudGltZVVuaXQsICcnLCBmYWxzZSkuc3BsaXQoXCInXCIpWzFdXG4gICAgICAgICAgOiBjb25maWcudGltZUZvcm1hdCB8fCB2bC5jb25maWcuZGVmYXVsdENvbmZpZy50aW1lRm9ybWF0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uLmZvcm1hdCA9IGNvbmZpZy5udW1iZXJGb3JtYXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9XG5cbiAgLy8gc3VwcGxlbWVudCBiaW4gZnJvbSBmaWVsZERlZiwgdXNlciBzaG91bGQgbmV2ZXIgaGF2ZSB0byBwcm92aWRlIGJpbiBpbiBvcHRpb25zXG4gIGlmIChmaWVsZERlZi5iaW4pIHtcbiAgICBzdXBwbGVtZW50ZWRGaWVsZE9wdGlvbi5maWVsZCA9IHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uLmZpZWxkLnJlcGxhY2UoJ19zdGFydCcsICdfcmFuZ2UnKTsgLy8gcmVwbGFjZSBzdWZmaXhcbiAgICBzdXBwbGVtZW50ZWRGaWVsZE9wdGlvbi5iaW4gPSB0cnVlO1xuICAgIHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uLmZvcm1hdFR5cGUgPSAnc3RyaW5nJzsgLy8gd2Ugc2hvdyBiaW4gcmFuZ2UgYXMgc3RyaW5nIChlLmcuIFwiNS0xMFwiKVxuICB9XG5cbiAgcmV0dXJuIHN1cHBsZW1lbnRlZEZpZWxkT3B0aW9uO1xufVxuIiwiaW1wb3J0IHtFbnRlckVsZW1lbnQsIHNlbGVjdCwgU2VsZWN0aW9ufSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IHtPcHRpb24sIFRvb2x0aXBEYXRhfSBmcm9tICcuL29wdGlvbnMnO1xuXG4vKipcbiAqIEdldCB0aGUgdG9vbHRpcCBIVE1MIHBsYWNlaG9sZGVyIGJ5IGlkIHNlbGVjdG9yIFwiI3Zpcy10b29sdGlwXCJcbiAqIElmIG5vbmUgZXhpc3RzLCBjcmVhdGUgYSBwbGFjZWhvbGRlci5cbiAqIEByZXR1cm5zIHRoZSBIVE1MIHBsYWNlaG9sZGVyIGZvciB0b29sdGlwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb29sdGlwUGxhY2Vob2xkZXIoKSB7XG4gIGxldCB0b29sdGlwUGxhY2Vob2xkZXI7XG5cbiAgaWYgKHNlbGVjdCgnI3Zpcy10b29sdGlwJykuZW1wdHkoKSkge1xuICAgIHRvb2x0aXBQbGFjZWhvbGRlciA9IHNlbGVjdCgnYm9keScpLmFwcGVuZCgnZGl2JylcbiAgICAgIC5hdHRyKCdpZCcsICd2aXMtdG9vbHRpcCcpXG4gICAgICAuYXR0cignY2xhc3MnLCAndmctdG9vbHRpcCcpO1xuICB9IGVsc2Uge1xuICAgIHRvb2x0aXBQbGFjZWhvbGRlciA9IHNlbGVjdCgnI3Zpcy10b29sdGlwJyk7XG4gIH1cblxuICByZXR1cm4gdG9vbHRpcFBsYWNlaG9sZGVyO1xufVxuXG4vKipcbiAqIEJpbmQgdG9vbHRpcERhdGEgdG8gdGhlIHRvb2x0aXAgcGxhY2Vob2xkZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmREYXRhKHRvb2x0aXBQbGFjZWhvbGRlcjogU2VsZWN0aW9uPEVsZW1lbnQgfCBFbnRlckVsZW1lbnQgfCBEb2N1bWVudCB8IFdpbmRvdywge30sIEhUTUxFbGVtZW50LCBhbnk+LCB0b29sdGlwRGF0YTogVG9vbHRpcERhdGFbXSkge1xuICB0b29sdGlwUGxhY2Vob2xkZXIuc2VsZWN0QWxsKCd0YWJsZScpLnJlbW92ZSgpO1xuICBjb25zdCB0b29sdGlwUm93cyA9IHRvb2x0aXBQbGFjZWhvbGRlci5hcHBlbmQoJ3RhYmxlJykuc2VsZWN0QWxsKCcudG9vbHRpcC1yb3cnKVxuICAgIC5kYXRhKHRvb2x0aXBEYXRhKTtcblxuICB0b29sdGlwUm93cy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgY29uc3Qgcm93ID0gdG9vbHRpcFJvd3MuZW50ZXIoKS5hcHBlbmQoJ3RyJylcbiAgICAuYXR0cignY2xhc3MnLCAndG9vbHRpcC1yb3cnKTtcbiAgcm93LmFwcGVuZCgndGQnKS5hdHRyKCdjbGFzcycsICdrZXknKS50ZXh0KGZ1bmN0aW9uIChkOiBUb29sdGlwRGF0YSkgeyByZXR1cm4gZC50aXRsZSArICc6JzsgfSk7XG4gIHJvdy5hcHBlbmQoJ3RkJykuYXR0cignY2xhc3MnLCAndmFsdWUnKS50ZXh0KGZ1bmN0aW9uIChkOiBUb29sdGlwRGF0YSkgeyByZXR1cm4gZC52YWx1ZTsgfSk7XG59XG5cbi8qKlxuICogQ2xlYXIgdG9vbHRpcCBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckRhdGEoKSB7XG4gIHNlbGVjdCgnI3Zpcy10b29sdGlwJykuc2VsZWN0QWxsKCcudG9vbHRpcC1yb3cnKS5kYXRhKFtdKVxuICAgIC5leGl0KCkucmVtb3ZlKCk7XG59XG5cbi8qKlxuICogVXBkYXRlIHRvb2x0aXAgcG9zaXRpb25cbiAqIERlZmF1bHQgcG9zaXRpb24gaXMgMTBweCByaWdodCBvZiBhbmQgMTBweCBiZWxvdyB0aGUgY3Vyc29yLiBUaGlzIGNhbiBiZVxuICogb3ZlcndyaXR0ZW4gYnkgb3B0aW9ucy5vZmZzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uKGV2ZW50OiBNb3VzZUV2ZW50LCBvcHRpb25zOiBPcHRpb24pIHtcbiAgLy8gZGV0ZXJtaW5lIHggYW5kIHkgb2Zmc2V0cywgZGVmYXVsdHMgYXJlIDEwcHhcbiAgbGV0IG9mZnNldFggPSAxMDtcbiAgbGV0IG9mZnNldFkgPSAxMDtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vZmZzZXQgJiYgKG9wdGlvbnMub2Zmc2V0LnggIT09IHVuZGVmaW5lZCkgJiYgKG9wdGlvbnMub2Zmc2V0LnggIT09IG51bGwpKSB7XG4gICAgb2Zmc2V0WCA9IG9wdGlvbnMub2Zmc2V0Lng7XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vZmZzZXQgJiYgKG9wdGlvbnMub2Zmc2V0LnkgIT09IHVuZGVmaW5lZCkgJiYgKG9wdGlvbnMub2Zmc2V0LnkgIT09IG51bGwpKSB7XG4gICAgb2Zmc2V0WSA9IG9wdGlvbnMub2Zmc2V0Lnk7XG4gIH1cblxuICAvLyBUT0RPOiB1c2UgdGhlIGNvcnJlY3QgdGltZSB0eXBlXG4gIHNlbGVjdCgnI3Zpcy10b29sdGlwJylcbiAgICAuc3R5bGUoJ3RvcCcsIGZ1bmN0aW9uICh0aGlzOiBIVE1MRWxlbWVudCkge1xuICAgICAgLy8gYnkgZGVmYXVsdDogcHV0IHRvb2x0aXAgMTBweCBiZWxvdyBjdXJzb3JcbiAgICAgIC8vIGlmIHRvb2x0aXAgaXMgY2xvc2UgdG8gdGhlIGJvdHRvbSBvZiB0aGUgd2luZG93LCBwdXQgdG9vbHRpcCAxMHB4IGFib3ZlIGN1cnNvclxuICAgICAgY29uc3QgdG9vbHRpcEhlaWdodCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgaWYgKGV2ZW50LmNsaWVudFkgKyB0b29sdGlwSGVpZ2h0ICsgb2Zmc2V0WSA8IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICByZXR1cm4gJycgKyAoZXZlbnQuY2xpZW50WSArIG9mZnNldFkpICsgJ3B4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnJyArIChldmVudC5jbGllbnRZIC0gdG9vbHRpcEhlaWdodCAtIG9mZnNldFkpICsgJ3B4JztcbiAgICAgIH1cbiAgICB9KVxuICAgIC5zdHlsZSgnbGVmdCcsIGZ1bmN0aW9uICh0aGlzOiBIVE1MRWxlbWVudCkge1xuICAgICAgLy8gYnkgZGVmYXVsdDogcHV0IHRvb2x0aXAgMTBweCB0byB0aGUgcmlnaHQgb2YgY3Vyc29yXG4gICAgICAvLyBpZiB0b29sdGlwIGlzIGNsb3NlIHRvIHRoZSByaWdodCBlZGdlIG9mIHRoZSB3aW5kb3csIHB1dCB0b29sdGlwIDEwIHB4IHRvIHRoZSBsZWZ0IG9mIGN1cnNvclxuICAgICAgY29uc3QgdG9vbHRpcFdpZHRoID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgIGlmIChldmVudC5jbGllbnRYICsgdG9vbHRpcFdpZHRoICsgb2Zmc2V0WCA8IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICAgIHJldHVybiAnJyArIChldmVudC5jbGllbnRYICsgb2Zmc2V0WCkgKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICcnICsgKGV2ZW50LmNsaWVudFggLSB0b29sdGlwV2lkdGggLSBvZmZzZXRYKSArICdweCc7XG4gICAgICB9XG4gICAgfSk7XG59XG5cbi8qIENsZWFyIHRvb2x0aXAgcG9zaXRpb24gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclBvc2l0aW9uKCkge1xuICBzZWxlY3QoJyN2aXMtdG9vbHRpcCcpXG4gICAgLnN0eWxlKCd0b3AnLCAnLTk5OTlweCcpXG4gICAgLnN0eWxlKCdsZWZ0JywgJy05OTk5cHgnKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgdG9vbHRpcCBjb2xvciB0aGVtZSBhY2NvcmRpbmcgdG8gb3B0aW9ucy5jb2xvclRoZW1lXG4gKlxuICogSWYgY29sb3JUaGVtZSA9PT0gXCJkYXJrXCIsIGFwcGx5IGRhcmsgdGhlbWUgdG8gdG9vbHRpcC5cbiAqIE90aGVyd2lzZSBhcHBseSBsaWdodCBjb2xvciB0aGVtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNvbG9yVGhlbWUob3B0aW9uczogT3B0aW9uKSB7XG4gIGNsZWFyQ29sb3JUaGVtZSgpO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuY29sb3JUaGVtZSA9PT0gJ2RhcmsnKSB7XG4gICAgc2VsZWN0KCcjdmlzLXRvb2x0aXAnKS5jbGFzc2VkKCdkYXJrLXRoZW1lJywgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc2VsZWN0KCcjdmlzLXRvb2x0aXAnKS5jbGFzc2VkKCdsaWdodC10aGVtZScsIHRydWUpO1xuICB9XG59XG5cbi8qIENsZWFyIGNvbG9yIHRoZW1lcyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29sb3JUaGVtZSgpIHtcbiAgc2VsZWN0KCcjdmlzLXRvb2x0aXAnKS5jbGFzc2VkKCdkYXJrLXRoZW1lIGxpZ2h0LXRoZW1lJywgZmFsc2UpO1xufVxuIl19
