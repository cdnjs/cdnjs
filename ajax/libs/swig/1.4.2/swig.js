/*! Swig v1.4.2 | https://paularmstrong.github.com/swig | @license https://github.com/paularmstrong/swig/blob/master/LICENSE */
/*! DateZ (c) 2011 Tomo Universalis | @license https://github.com/TomoUniversalis/DateZ/blob/master/LISENCE */
;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var swig = require('../lib/swig');

if (typeof window.define === 'function' && typeof window.define.amd === 'object') {
  window.define('swig', [], function () {
    return swig;
  });
} else {
  window.swig = swig;
}

},{"../lib/swig":9}],2:[function(require,module,exports){
var utils = require('./utils');

var _months = {
    full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    abbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  _days = {
    full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    abbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    alt: {'-1': 'Yesterday', 0: 'Today', 1: 'Tomorrow'}
  };

/*
DateZ is licensed under the MIT License:
Copyright (c) 2011 Tomo Universalis (http://tomouniversalis.com)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
exports.tzOffset = 0;
exports.DateZ = function () {
  var members = {
      'default': ['getUTCDate', 'getUTCDay', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'toISOString', 'toGMTString', 'toUTCString', 'valueOf', 'getTime'],
      z: ['getDate', 'getDay', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getYear', 'toDateString', 'toLocaleDateString', 'toLocaleTimeString']
    },
    d = this;

  d.date = d.dateZ = (arguments.length > 1) ? new Date(Date.UTC.apply(Date, arguments) + ((new Date()).getTimezoneOffset() * 60000)) : (arguments.length === 1) ? new Date(new Date(arguments['0'])) : new Date();

  d.timezoneOffset = d.dateZ.getTimezoneOffset();

  utils.each(members.z, function (name) {
    d[name] = function () {
      return d.dateZ[name]();
    };
  });
  utils.each(members['default'], function (name) {
    d[name] = function () {
      return d.date[name]();
    };
  });

  this.setTimezoneOffset(exports.tzOffset);
};
exports.DateZ.prototype = {
  getTimezoneOffset: function () {
    return this.timezoneOffset;
  },
  setTimezoneOffset: function (offset) {
    this.timezoneOffset = offset;
    this.dateZ = new Date(this.date.getTime() + this.date.getTimezoneOffset() * 60000 - this.timezoneOffset * 60000);
    return this;
  }
};

// Day
exports.d = function (input) {
  return (input.getDate() < 10 ? '0' : '') + input.getDate();
};
exports.D = function (input) {
  return _days.abbr[input.getDay()];
};
exports.j = function (input) {
  return input.getDate();
};
exports.l = function (input) {
  return _days.full[input.getDay()];
};
exports.N = function (input) {
  var d = input.getDay();
  return (d >= 1) ? d : 7;
};
exports.S = function (input) {
  var d = input.getDate();
  return (d % 10 === 1 && d !== 11 ? 'st' : (d % 10 === 2 && d !== 12 ? 'nd' : (d % 10 === 3 && d !== 13 ? 'rd' : 'th')));
};
exports.w = function (input) {
  return input.getDay();
};
exports.z = function (input, offset, abbr) {
  var year = input.getFullYear(),
    e = new exports.DateZ(year, input.getMonth(), input.getDate(), 12, 0, 0),
    d = new exports.DateZ(year, 0, 1, 12, 0, 0);

  e.setTimezoneOffset(offset, abbr);
  d.setTimezoneOffset(offset, abbr);
  return Math.round((e - d) / 86400000);
};

// Week
exports.W = function (input) {
  var target = new Date(input.valueOf()),
    dayNr = (input.getDay() + 6) % 7,
    fThurs;

  target.setDate(target.getDate() - dayNr + 3);
  fThurs = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }

  return 1 + Math.ceil((fThurs - target) / 604800000);
};

// Month
exports.F = function (input) {
  return _months.full[input.getMonth()];
};
exports.m = function (input) {
  return (input.getMonth() < 9 ? '0' : '') + (input.getMonth() + 1);
};
exports.M = function (input) {
  return _months.abbr[input.getMonth()];
};
exports.n = function (input) {
  return input.getMonth() + 1;
};
exports.t = function (input) {
  return 32 - (new Date(input.getFullYear(), input.getMonth(), 32).getDate());
};

// Year
exports.L = function (input) {
  return new Date(input.getFullYear(), 1, 29).getDate() === 29;
};
exports.o = function (input) {
  var target = new Date(input.valueOf());
  target.setDate(target.getDate() - ((input.getDay() + 6) % 7) + 3);
  return target.getFullYear();
};
exports.Y = function (input) {
  return input.getFullYear();
};
exports.y = function (input) {
  return (input.getFullYear().toString()).substr(2);
};

// Time
exports.a = function (input) {
  return input.getHours() < 12 ? 'am' : 'pm';
};
exports.A = function (input) {
  return input.getHours() < 12 ? 'AM' : 'PM';
};
exports.B = function (input) {
  var hours = input.getUTCHours(), beats;
  hours = (hours === 23) ? 0 : hours + 1;
  beats = Math.abs(((((hours * 60) + input.getUTCMinutes()) * 60) + input.getUTCSeconds()) / 86.4).toFixed(0);
  return ('000'.concat(beats).slice(beats.length));
};
exports.g = function (input) {
  var h = input.getHours();
  return h === 0 ? 12 : (h > 12 ? h - 12 : h);
};
exports.G = function (input) {
  return input.getHours();
};
exports.h = function (input) {
  var h = input.getHours();
  return ((h < 10 || (12 < h && 22 > h)) ? '0' : '') + ((h < 12) ? h : h - 12);
};
exports.H = function (input) {
  var h = input.getHours();
  return (h < 10 ? '0' : '') + h;
};
exports.i = function (input) {
  var m = input.getMinutes();
  return (m < 10 ? '0' : '') + m;
};
exports.s = function (input) {
  var s = input.getSeconds();
  return (s < 10 ? '0' : '') + s;
};
//u = function () { return ''; },

// Timezone
//e = function () { return ''; },
//I = function () { return ''; },
exports.O = function (input) {
  var tz = input.getTimezoneOffset();
  return (tz < 0 ? '-' : '+') + (tz / 60 < 10 ? '0' : '') + Math.abs((tz / 60)) + '00';
};
//T = function () { return ''; },
exports.Z = function (input) {
  return input.getTimezoneOffset() * 60;
};

// Full Date/Time
exports.c = function (input) {
  return input.toISOString();
};
exports.r = function (input) {
  return input.toUTCString();
};
exports.U = function (input) {
  return input.getTime() / 1000;
};

},{"./utils":26}],3:[function(require,module,exports){
var utils = require('./utils'),
  dateFormatter = require('./dateformatter');

/**
 * Helper method to recursively run a filter across an object/array and apply it to all of the object/array's values.
 * @param  {*} input
 * @return {*}
 * @private
 */
function iterateFilter(input) {
  var self = this,
    out = {};

  if (utils.isArray(input)) {
    return utils.map(input, function (value) {
      return self.apply(null, arguments);
    });
  }

  if (typeof input === 'object') {
    utils.each(input, function (value, key) {
      out[key] = self.apply(null, arguments);
    });
    return out;
  }

  return;
}

/**
 * Backslash-escape characters that need to be escaped.
 *
 * @example
 * {{ "\"quoted string\""|addslashes }}
 * // => \"quoted string\"
 *
 * @param  {*}  input
 * @return {*}        Backslash-escaped string.
 */
exports.addslashes = function (input) {
  var out = iterateFilter.apply(exports.addslashes, arguments);
  if (out !== undefined) {
    return out;
  }

  return input.replace(/\\/g, '\\\\').replace(/\'/g, "\\'").replace(/\"/g, '\\"');
};

/**
 * Upper-case the first letter of the input and lower-case the rest.
 *
 * @example
 * {{ "i like Burritos"|capitalize }}
 * // => I like burritos
 *
 * @param  {*} input  If given an array or object, each string member will be run through the filter individually.
 * @return {*}        Returns the same type as the input.
 */
exports.capitalize = function (input) {
  var out = iterateFilter.apply(exports.capitalize, arguments);
  if (out !== undefined) {
    return out;
  }

  return input.toString().charAt(0).toUpperCase() + input.toString().substr(1).toLowerCase();
};

/**
 * Format a date or Date-compatible string.
 *
 * @example
 * // now = new Date();
 * {{ now|date('Y-m-d') }}
 * // => 2013-08-14
 * @example
 * // now = new Date();
 * {{ now|date('jS \o\f F') }}
 * // => 4th of July
 *
 * @param  {?(string|date)}   input
 * @param  {string}           format  PHP-style date format compatible string. Escape characters with <code>\</code> for string literals.
 * @param  {number=}          offset  Timezone offset from GMT in minutes.
 * @param  {string=}          abbr    Timezone abbreviation. Used for output only.
 * @return {string}                   Formatted date string.
 */
exports.date = function (input, format, offset, abbr) {
  var l = format.length,
    date = new dateFormatter.DateZ(input),
    cur,
    i = 0,
    out = '';

  if (offset) {
    date.setTimezoneOffset(offset, abbr);
  }

  for (i; i < l; i += 1) {
    cur = format.charAt(i);
    if (cur === '\\') {
      i += 1;
      out += (i < l) ? format.charAt(i) : cur;
    } else if (dateFormatter.hasOwnProperty(cur)) {
      out += dateFormatter[cur](date, offset, abbr);
    } else {
      out += cur;
    }
  }
  return out;
};

/**
 * If the input is `undefined`, `null`, or `false`, a default return value can be specified.
 *
 * @example
 * {{ null_value|default('Tacos') }}
 * // => Tacos
 *
 * @example
 * {{ "Burritos"|default("Tacos") }}
 * // => Burritos
 *
 * @param  {*}  input
 * @param  {*}  def     Value to return if `input` is `undefined`, `null`, or `false`.
 * @return {*}          `input` or `def` value.
 */
exports["default"] = function (input, def) {
  return (typeof input !== 'undefined' && (input || typeof input === 'number')) ? input : def;
};

/**
 * Force escape the output of the variable. Optionally use `e` as a shortcut filter name. This filter will be applied by default if autoescape is turned on.
 *
 * @example
 * {{ "<blah>"|escape }}
 * // => &lt;blah&gt;
 *
 * @example
 * {{ "<blah>"|e("js") }}
 * // => \u003Cblah\u003E
 *
 * @param  {*} input
 * @param  {string} [type='html']   If you pass the string js in as the type, output will be escaped so that it is safe for JavaScript execution.
 * @return {string}         Escaped string.
 */
exports.escape = function (input, type) {
  var out = iterateFilter.apply(exports.escape, arguments),
    inp = input,
    i = 0,
    code;

  if (out !== undefined) {
    return out;
  }

  if (typeof input !== 'string') {
    return input;
  }

  out = '';

  switch (type) {
  case 'js':
    inp = inp.replace(/\\/g, '\\u005C');
    for (i; i < inp.length; i += 1) {
      code = inp.charCodeAt(i);
      if (code < 32) {
        code = code.toString(16).toUpperCase();
        code = (code.length < 2) ? '0' + code : code;
        out += '\\u00' + code;
      } else {
        out += inp[i];
      }
    }
    return out.replace(/&/g, '\\u0026')
      .replace(/</g, '\\u003C')
      .replace(/>/g, '\\u003E')
      .replace(/\'/g, '\\u0027')
      .replace(/"/g, '\\u0022')
      .replace(/\=/g, '\\u003D')
      .replace(/-/g, '\\u002D')
      .replace(/;/g, '\\u003B');

  default:
    return inp.replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};
exports.e = exports.escape;

/**
 * Get the first item in an array or character in a string. All other objects will attempt to return the first value available.
 *
 * @example
 * // my_arr = ['a', 'b', 'c']
 * {{ my_arr|first }}
 * // => a
 *
 * @example
 * // my_val = 'Tacos'
 * {{ my_val|first }}
 * // T
 *
 * @param  {*} input
 * @return {*}        The first item of the array or first character of the string input.
 */
exports.first = function (input) {
  if (typeof input === 'object' && !utils.isArray(input)) {
    var keys = utils.keys(input);
    return input[keys[0]];
  }

  if (typeof input === 'string') {
    return input.substr(0, 1);
  }

  return input[0];
};

/**
 * Group an array of objects by a common key. If an array is not provided, the input value will be returned untouched.
 *
 * @example
 * // people = [{ age: 23, name: 'Paul' }, { age: 26, name: 'Jane' }, { age: 23, name: 'Jim' }];
 * {% for agegroup in people|groupBy('age') %}
 *   <h2>{{ loop.key }}</h2>
 *   <ul>
 *     {% for person in agegroup %}
 *     <li>{{ person.name }}</li>
 *     {% endfor %}
 *   </ul>
 * {% endfor %}
 *
 * @param  {*}      input Input object.
 * @param  {string} key   Key to group by.
 * @return {object}       Grouped arrays by given key.
 */
exports.groupBy = function (input, key) {
  if (!utils.isArray(input)) {
    return input;
  }

  var out = {};

  utils.each(input, function (value) {
    if (!value.hasOwnProperty(key)) {
      return;
    }

    var keyname = value[key],
      newVal = utils.extend({}, value);
    delete value[key];

    if (!out[keyname]) {
      out[keyname] = [];
    }

    out[keyname].push(value);
  });

  return out;
};

/**
 * Join the input with a string.
 *
 * @example
 * // my_array = ['foo', 'bar', 'baz']
 * {{ my_array|join(', ') }}
 * // => foo, bar, baz
 *
 * @example
 * // my_key_object = { a: 'foo', b: 'bar', c: 'baz' }
 * {{ my_key_object|join(' and ') }}
 * // => foo and bar and baz
 *
 * @param  {*}  input
 * @param  {string} glue    String value to join items together.
 * @return {string}
 */
exports.join = function (input, glue) {
  if (utils.isArray(input)) {
    return input.join(glue);
  }

  if (typeof input === 'object') {
    var out = [];
    utils.each(input, function (value) {
      out.push(value);
    });
    return out.join(glue);
  }
  return input;
};

/**
 * Return a string representation of an JavaScript object.
 *
 * Backwards compatible with swig@0.x.x using `json_encode`.
 *
 * @example
 * // val = { a: 'b' }
 * {{ val|json }}
 * // => {"a":"b"}
 *
 * @example
 * // val = { a: 'b' }
 * {{ val|json(4) }}
 * // => {
 * //        "a": "b"
 * //    }
 *
 * @param  {*}    input
 * @param  {number}  [indent]  Number of spaces to indent for pretty-formatting.
 * @return {string}           A valid JSON string.
 */
exports.json = function (input, indent) {
  return JSON.stringify(input, null, indent || 0);
};
exports.json_encode = exports.json;

/**
 * Get the last item in an array or character in a string. All other objects will attempt to return the last value available.
 *
 * @example
 * // my_arr = ['a', 'b', 'c']
 * {{ my_arr|last }}
 * // => c
 *
 * @example
 * // my_val = 'Tacos'
 * {{ my_val|last }}
 * // s
 *
 * @param  {*} input
 * @return {*}          The last item of the array or last character of the string.input.
 */
exports.last = function (input) {
  if (typeof input === 'object' && !utils.isArray(input)) {
    var keys = utils.keys(input);
    return input[keys[keys.length - 1]];
  }

  if (typeof input === 'string') {
    return input.charAt(input.length - 1);
  }

  return input[input.length - 1];
};

/**
 * Return the input in all lowercase letters.
 *
 * @example
 * {{ "FOOBAR"|lower }}
 * // => foobar
 *
 * @example
 * // myObj = { a: 'FOO', b: 'BAR' }
 * {{ myObj|lower|join('') }}
 * // => foobar
 *
 * @param  {*}  input
 * @return {*}          Returns the same type as the input.
 */
exports.lower = function (input) {
  var out = iterateFilter.apply(exports.lower, arguments);
  if (out !== undefined) {
    return out;
  }

  return input.toString().toLowerCase();
};

/**
 * Deprecated in favor of <a href="#safe">safe</a>.
 */
exports.raw = function (input) {
  return exports.safe(input);
};
exports.raw.safe = true;

/**
 * Returns a new string with the matched search pattern replaced by the given replacement string. Uses JavaScript's built-in String.replace() method.
 *
 * @example
 * // my_var = 'foobar';
 * {{ my_var|replace('o', 'e', 'g') }}
 * // => feebar
 *
 * @example
 * // my_var = "farfegnugen";
 * {{ my_var|replace('^f', 'p') }}
 * // => parfegnugen
 *
 * @example
 * // my_var = 'a1b2c3';
 * {{ my_var|replace('\w', '0', 'g') }}
 * // => 010203
 *
 * @param  {string} input
 * @param  {string} search      String or pattern to replace from the input.
 * @param  {string} replacement String to replace matched pattern.
 * @param  {string} [flags]      Regular Expression flags. 'g': global match, 'i': ignore case, 'm': match over multiple lines
 * @return {string}             Replaced string.
 */
exports.replace = function (input, search, replacement, flags) {
  var r = new RegExp(search, flags);
  return input.replace(r, replacement);
};

/**
 * Reverse sort the input. This is an alias for <code data-language="swig">{{ input|sort(true) }}</code>.
 *
 * @example
 * // val = [1, 2, 3];
 * {{ val|reverse }}
 * // => 3,2,1
 *
 * @param  {array}  input
 * @return {array}        Reversed array. The original input object is returned if it was not an array.
 */
exports.reverse = function (input) {
  return exports.sort(input, true);
};

/**
 * Forces the input to not be auto-escaped. Use this only on content that you know is safe to be rendered on your page.
 *
 * @example
 * // my_var = "<p>Stuff</p>";
 * {{ my_var|safe }}
 * // => <p>Stuff</p>
 *
 * @param  {*}  input
 * @return {*}          The input exactly how it was given, regardless of autoescaping status.
 */
exports.safe = function (input) {
  // This is a magic filter. Its logic is hard-coded into Swig's parser.
  return input;
};
exports.safe.safe = true;

/**
 * Sort the input in an ascending direction.
 * If given an object, will return the keys as a sorted array.
 * If given a string, each character will be sorted individually.
 *
 * @example
 * // val = [2, 6, 4];
 * {{ val|sort }}
 * // => 2,4,6
 *
 * @example
 * // val = 'zaq';
 * {{ val|sort }}
 * // => aqz
 *
 * @example
 * // val = { bar: 1, foo: 2 }
 * {{ val|sort(true) }}
 * // => foo,bar
 *
 * @param  {*} input
 * @param {boolean} [reverse=false] Output is given reverse-sorted if true.
 * @return {*}        Sorted array;
 */
exports.sort = function (input, reverse) {
  var out;
  if (utils.isArray(input)) {
    out = input.sort();
  } else {
    switch (typeof input) {
    case 'object':
      out = utils.keys(input).sort();
      break;
    case 'string':
      out = input.split('');
      if (reverse) {
        return out.reverse().join('');
      }
      return out.sort().join('');
    }
  }

  if (out && reverse) {
    return out.reverse();
  }

  return out || input;
};

/**
 * Strip HTML tags.
 *
 * @example
 * // stuff = '<p>foobar</p>';
 * {{ stuff|striptags }}
 * // => foobar
 *
 * @param  {*}  input
 * @return {*}        Returns the same object as the input, but with all string values stripped of tags.
 */
exports.striptags = function (input) {
  var out = iterateFilter.apply(exports.striptags, arguments);
  if (out !== undefined) {
    return out;
  }

  return input.toString().replace(/(<([^>]+)>)/ig, '');
};

/**
 * Capitalizes every word given and lower-cases all other letters.
 *
 * @example
 * // my_str = 'this is soMe text';
 * {{ my_str|title }}
 * // => This Is Some Text
 *
 * @example
 * // my_arr = ['hi', 'this', 'is', 'an', 'array'];
 * {{ my_arr|title|join(' ') }}
 * // => Hi This Is An Array
 *
 * @param  {*}  input
 * @return {*}        Returns the same object as the input, but with all words in strings title-cased.
 */
exports.title = function (input) {
  var out = iterateFilter.apply(exports.title, arguments);
  if (out !== undefined) {
    return out;
  }

  return input.toString().replace(/\w\S*/g, function (str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  });
};

/**
 * Remove all duplicate items from an array.
 *
 * @example
 * // my_arr = [1, 2, 3, 4, 4, 3, 2, 1];
 * {{ my_arr|uniq|join(',') }}
 * // => 1,2,3,4
 *
 * @param  {array}  input
 * @return {array}        Array with unique items. If input was not an array, the original item is returned untouched.
 */
exports.uniq = function (input) {
  var result;

  if (!input || !utils.isArray(input)) {
    return '';
  }

  result = [];
  utils.each(input, function (v) {
    if (result.indexOf(v) === -1) {
      result.push(v);
    }
  });
  return result;
};

/**
 * Convert the input to all uppercase letters. If an object or array is provided, all values will be uppercased.
 *
 * @example
 * // my_str = 'tacos';
 * {{ my_str|upper }}
 * // => TACOS
 *
 * @example
 * // my_arr = ['tacos', 'burritos'];
 * {{ my_arr|upper|join(' & ') }}
 * // => TACOS & BURRITOS
 *
 * @param  {*}  input
 * @return {*}        Returns the same type as the input, with all strings upper-cased.
 */
exports.upper = function (input) {
  var out = iterateFilter.apply(exports.upper, arguments);
  if (out !== undefined) {
    return out;
  }

  return input.toString().toUpperCase();
};

/**
 * URL-encode a string. If an object or array is passed, all values will be URL-encoded.
 *
 * @example
 * // my_str = 'param=1&anotherParam=2';
 * {{ my_str|url_encode }}
 * // => param%3D1%26anotherParam%3D2
 *
 * @param  {*} input
 * @return {*}       URL-encoded string.
 */
exports.url_encode = function (input) {
  var out = iterateFilter.apply(exports.url_encode, arguments);
  if (out !== undefined) {
    return out;
  }
  return encodeURIComponent(input);
};

/**
 * URL-decode a string. If an object or array is passed, all values will be URL-decoded.
 *
 * @example
 * // my_str = 'param%3D1%26anotherParam%3D2';
 * {{ my_str|url_decode }}
 * // => param=1&anotherParam=2
 *
 * @param  {*} input
 * @return {*}       URL-decoded string.
 */
exports.url_decode = function (input) {
  var out = iterateFilter.apply(exports.url_decode, arguments);
  if (out !== undefined) {
    return out;
  }
  return decodeURIComponent(input);
};

},{"./dateformatter":2,"./utils":26}],4:[function(require,module,exports){
var utils = require('./utils');

/**
 * A lexer token.
 * @typedef {object} LexerToken
 * @property {string} match  The string that was matched.
 * @property {number} type   Lexer type enum.
 * @property {number} length Length of the original string processed.
 */

/**
 * Enum for token types.
 * @readonly
 * @enum {number}
 */
var TYPES = {
    /** Whitespace */
    WHITESPACE: 0,
    /** Plain string */
    STRING: 1,
    /** Variable filter */
    FILTER: 2,
    /** Empty variable filter */
    FILTEREMPTY: 3,
    /** Function */
    FUNCTION: 4,
    /** Function with no arguments */
    FUNCTIONEMPTY: 5,
    /** Open parenthesis */
    PARENOPEN: 6,
    /** Close parenthesis */
    PARENCLOSE: 7,
    /** Comma */
    COMMA: 8,
    /** Variable */
    VAR: 9,
    /** Number */
    NUMBER: 10,
    /** Math operator */
    OPERATOR: 11,
    /** Open square bracket */
    BRACKETOPEN: 12,
    /** Close square bracket */
    BRACKETCLOSE: 13,
    /** Key on an object using dot-notation */
    DOTKEY: 14,
    /** Start of an array */
    ARRAYOPEN: 15,
    /** End of an array
     * Currently unused
    ARRAYCLOSE: 16, */
    /** Open curly brace */
    CURLYOPEN: 17,
    /** Close curly brace */
    CURLYCLOSE: 18,
    /** Colon (:) */
    COLON: 19,
    /** JavaScript-valid comparator */
    COMPARATOR: 20,
    /** Boolean logic */
    LOGIC: 21,
    /** Boolean logic "not" */
    NOT: 22,
    /** true or false */
    BOOL: 23,
    /** Variable assignment */
    ASSIGNMENT: 24,
    /** Start of a method */
    METHODOPEN: 25,
    /** End of a method
     * Currently unused
    METHODEND: 26, */
    /** Unknown type */
    UNKNOWN: 100
  },
  rules = [
    {
      type: TYPES.WHITESPACE,
      regex: [
        /^\s+/
      ]
    },
    {
      type: TYPES.STRING,
      regex: [
        /^""/,
        /^".*?[^\\]"/,
        /^''/,
        /^'.*?[^\\]'/
      ]
    },
    {
      type: TYPES.FILTER,
      regex: [
        /^\|\s*(\w+)\(/
      ],
      idx: 1
    },
    {
      type: TYPES.FILTEREMPTY,
      regex: [
        /^\|\s*(\w+)/
      ],
      idx: 1
    },
    {
      type: TYPES.FUNCTIONEMPTY,
      regex: [
        /^\s*(\w+)\(\)/
      ],
      idx: 1
    },
    {
      type: TYPES.FUNCTION,
      regex: [
        /^\s*(\w+)\(/
      ],
      idx: 1
    },
    {
      type: TYPES.PARENOPEN,
      regex: [
        /^\(/
      ]
    },
    {
      type: TYPES.PARENCLOSE,
      regex: [
        /^\)/
      ]
    },
    {
      type: TYPES.COMMA,
      regex: [
        /^,/
      ]
    },
    {
      type: TYPES.LOGIC,
      regex: [
        /^(&&|\|\|)\s*/,
        /^(and|or)\s+/
      ],
      idx: 1,
      replace: {
        'and': '&&',
        'or': '||'
      }
    },
    {
      type: TYPES.COMPARATOR,
      regex: [
        /^(===|==|\!==|\!=|<=|<|>=|>|in\s|gte\s|gt\s|lte\s|lt\s)\s*/
      ],
      idx: 1,
      replace: {
        'gte': '>=',
        'gt': '>',
        'lte': '<=',
        'lt': '<'
      }
    },
    {
      type: TYPES.ASSIGNMENT,
      regex: [
        /^(=|\+=|-=|\*=|\/=)/
      ]
    },
    {
      type: TYPES.NOT,
      regex: [
        /^\!\s*/,
        /^not\s+/
      ],
      replace: {
        'not': '!'
      }
    },
    {
      type: TYPES.BOOL,
      regex: [
        /^(true|false)\s+/,
        /^(true|false)$/
      ],
      idx: 1
    },
    {
      type: TYPES.VAR,
      regex: [
        /^[a-zA-Z_$]\w*((\.\$?\w*)+)?/,
        /^[a-zA-Z_$]\w*/
      ]
    },
    {
      type: TYPES.BRACKETOPEN,
      regex: [
        /^\[/
      ]
    },
    {
      type: TYPES.BRACKETCLOSE,
      regex: [
        /^\]/
      ]
    },
    {
      type: TYPES.CURLYOPEN,
      regex: [
        /^\{/
      ]
    },
    {
      type: TYPES.COLON,
      regex: [
        /^\:/
      ]
    },
    {
      type: TYPES.CURLYCLOSE,
      regex: [
        /^\}/
      ]
    },
    {
      type: TYPES.DOTKEY,
      regex: [
        /^\.(\w+)/
      ],
      idx: 1
    },
    {
      type: TYPES.NUMBER,
      regex: [
        /^[+\-]?\d+(\.\d+)?/
      ]
    },
    {
      type: TYPES.OPERATOR,
      regex: [
        /^(\+|\-|\/|\*|%)/
      ]
    }
  ];

exports.types = TYPES;

/**
 * Return the token type object for a single chunk of a string.
 * @param  {string} str String chunk.
 * @return {LexerToken}     Defined type, potentially stripped or replaced with more suitable content.
 * @private
 */
function reader(str) {
  var matched;

  utils.some(rules, function (rule) {
    return utils.some(rule.regex, function (regex) {
      var match = str.match(regex),
        normalized;

      if (!match) {
        return;
      }

      normalized = match[rule.idx || 0].replace(/\s*$/, '');
      normalized = (rule.hasOwnProperty('replace') && rule.replace.hasOwnProperty(normalized)) ? rule.replace[normalized] : normalized;

      matched = {
        match: normalized,
        type: rule.type,
        length: match[0].length
      };
      return true;
    });
  });

  if (!matched) {
    matched = {
      match: str,
      type: TYPES.UNKNOWN,
      length: str.length
    };
  }

  return matched;
}

/**
 * Read a string and break it into separate token types.
 * @param  {string} str
 * @return {Array.LexerToken}     Array of defined types, potentially stripped or replaced with more suitable content.
 * @private
 */
exports.read = function (str) {
  var offset = 0,
    tokens = [],
    substr,
    match;
  while (offset < str.length) {
    substr = str.substring(offset);
    match = reader(substr);
    offset += match.length;
    tokens.push(match);
  }
  return tokens;
};

},{"./utils":26}],5:[function(require,module,exports){
var process=require("__browserify_process");var fs = require('fs'),
  path = require('path');

/**
 * Loads templates from the file system.
 * @alias swig.loaders.fs
 * @example
 * swig.setDefaults({ loader: swig.loaders.fs() });
 * @example
 * // Load Templates from a specific directory (does not require using relative paths in your templates)
 * swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/templates' )});
 * @param {string}   [basepath='']     Path to the templates as string. Assigning this value allows you to use semi-absolute paths to templates instead of relative paths.
 * @param {string}   [encoding='utf8']   Template encoding
 */
module.exports = function (basepath, encoding) {
  var ret = {};

  encoding = encoding || 'utf8';
  basepath = (basepath) ? path.normalize(basepath) : null;

  /**
   * Resolves <var>to</var> to an absolute path or unique identifier. This is used for building correct, normalized, and absolute paths to a given template.
   * @alias resolve
   * @param  {string} to        Non-absolute identifier or pathname to a file.
   * @param  {string} [from]    If given, should attempt to find the <var>to</var> path in relation to this given, known path.
   * @return {string}
   */
  ret.resolve = function (to, from) {
    if (basepath) {
      from = basepath;
    } else {
      from = (from) ? path.dirname(from) : process.cwd();
    }
    return path.resolve(from, to);
  };

  /**
   * Loads a single template. Given a unique <var>identifier</var> found by the <var>resolve</var> method this should return the given template.
   * @alias load
   * @param  {string}   identifier  Unique identifier of a template (possibly an absolute path).
   * @param  {function} [cb]        Asynchronous callback function. If not provided, this method should run synchronously.
   * @return {string}               Template source string.
   */
  ret.load = function (identifier, cb) {
    if (!fs || (cb && !fs.readFile) || !fs.readFileSync) {
      throw new Error('Unable to find file ' + identifier + ' because there is no filesystem to read from.');
    }

    identifier = ret.resolve(identifier);

    if (cb) {
      fs.readFile(identifier, encoding, cb);
      return;
    }
    return fs.readFileSync(identifier, encoding);
  };

  return ret;
};

},{"__browserify_process":31,"fs":28,"path":29}],6:[function(require,module,exports){
/**
 * @namespace TemplateLoader
 * @description Swig is able to accept custom template loaders written by you, so that your templates can come from your favorite storage medium without needing to be part of the core library.
 * A template loader consists of two methods: <var>resolve</var> and <var>load</var>. Each method is used internally by Swig to find and load the source of the template before attempting to parse and compile it.
 * @example
 * // A theoretical memcached loader
 * var path = require('path'),
 *   Memcached = require('memcached');
 * function memcachedLoader(locations, options) {
 *   var memcached = new Memcached(locations, options);
 *   return {
 *     resolve: function (to, from) {
 *       return path.resolve(from, to);
 *     },
 *     load: function (identifier, cb) {
 *       memcached.get(identifier, function (err, data) {
 *         // if (!data) { load from filesystem; }
 *         cb(err, data);
 *       });
 *     }
 *   };
 * };
 * // Tell swig about the loader:
 * swig.setDefaults({ loader: memcachedLoader(['192.168.0.2']) });
 */

/**
 * @function
 * @name resolve
 * @memberof TemplateLoader
 * @description
 * Resolves <var>to</var> to an absolute path or unique identifier. This is used for building correct, normalized, and absolute paths to a given template.
 * @param  {string} to        Non-absolute identifier or pathname to a file.
 * @param  {string} [from]    If given, should attempt to find the <var>to</var> path in relation to this given, known path.
 * @return {string}
 */

/**
 * @function
 * @name load
 * @memberof TemplateLoader
 * @description
 * Loads a single template. Given a unique <var>identifier</var> found by the <var>resolve</var> method this should return the given template.
 * @param  {string}   identifier  Unique identifier of a template (possibly an absolute path).
 * @param  {function} [cb]        Asynchronous callback function. If not provided, this method should run synchronously.
 * @return {string}               Template source string.
 */

/**
 * @private
 */
exports.fs = require('./filesystem');
exports.memory = require('./memory');

},{"./filesystem":5,"./memory":7}],7:[function(require,module,exports){
var path = require('path'),
  utils = require('../utils');

/**
 * Loads templates from a provided object mapping.
 * @alias swig.loaders.memory
 * @example
 * var templates = {
 *   "layout": "{% block content %}{% endblock %}",
 *   "home.html": "{% extends 'layout.html' %}{% block content %}...{% endblock %}"
 * };
 * swig.setDefaults({ loader: swig.loaders.memory(templates) });
 *
 * @param {object} mapping Hash object with template paths as keys and template sources as values.
 * @param {string} [basepath] Path to the templates as string. Assigning this value allows you to use semi-absolute paths to templates instead of relative paths.
 */
module.exports = function (mapping, basepath) {
  var ret = {};

  basepath = (basepath) ? path.normalize(basepath) : null;

  /**
   * Resolves <var>to</var> to an absolute path or unique identifier. This is used for building correct, normalized, and absolute paths to a given template.
   * @alias resolve
   * @param  {string} to        Non-absolute identifier or pathname to a file.
   * @param  {string} [from]    If given, should attempt to find the <var>to</var> path in relation to this given, known path.
   * @return {string}
   */
  ret.resolve = function (to, from) {
    if (basepath) {
      from = basepath;
    } else {
      from = (from) ? path.dirname(from) : '/';
    }
    return path.resolve(from, to);
  };

  /**
   * Loads a single template. Given a unique <var>identifier</var> found by the <var>resolve</var> method this should return the given template.
   * @alias load
   * @param  {string}   identifier  Unique identifier of a template (possibly an absolute path).
   * @param  {function} [cb]        Asynchronous callback function. If not provided, this method should run synchronously.
   * @return {string}               Template source string.
   */
  ret.load = function (pathname, cb) {
    var src, paths;

    paths = [pathname, pathname.replace(/^(\/|\\)/, '')];

    src = mapping[paths[0]] || mapping[paths[1]];
    if (!src) {
      utils.throwError('Unable to find template "' + pathname + '".');
    }

    if (cb) {
      cb(null, src);
      return;
    }
    return src;
  };

  return ret;
};

},{"../utils":26,"path":29}],8:[function(require,module,exports){
var utils = require('./utils'),
  lexer = require('./lexer');

var _t = lexer.types,
  _reserved = ['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with'];


/**
 * Filters are simply functions that perform transformations on their first input argument.
 * Filters are run at render time, so they may not directly modify the compiled template structure in any way.
 * All of Swig's built-in filters are written in this same way. For more examples, reference the `filters.js` file in Swig's source.
 *
 * To disable auto-escaping on a custom filter, simply add a property to the filter method `safe = true;` and the output from this will not be escaped, no matter what the global settings are for Swig.
 *
 * @typedef {function} Filter
 *
 * @example
 * // This filter will return 'bazbop' if the idx on the input is not 'foobar'
 * swig.setFilter('foobar', function (input, idx) {
 *   return input[idx] === 'foobar' ? input[idx] : 'bazbop';
 * });
 * // myvar = ['foo', 'bar', 'baz', 'bop'];
 * // => {{ myvar|foobar(3) }}
 * // Since myvar[3] !== 'foobar', we render:
 * // => bazbop
 *
 * @example
 * // This filter will disable auto-escaping on its output:
 * function bazbop (input) { return input; }
 * bazbop.safe = true;
 * swig.setFilter('bazbop', bazbop);
 * // => {{ "<p>"|bazbop }}
 * // => <p>
 *
 * @param {*} input Input argument, automatically sent from Swig's built-in parser.
 * @param {...*} [args] All other arguments are defined by the Filter author.
 * @return {*}
 */

/*!
 * Makes a string safe for a regular expression.
 * @param  {string} str
 * @return {string}
 * @private
 */
function escapeRegExp(str) {
  return str.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, '\\$&');
}

/**
 * Parse strings of variables and tags into tokens for future compilation.
 * @class
 * @param {array}   tokens     Pre-split tokens read by the Lexer.
 * @param {object}  filters    Keyed object of filters that may be applied to variables.
 * @param {boolean} autoescape Whether or not this should be autoescaped.
 * @param {number}  line       Beginning line number for the first token.
 * @param {string}  [filename] Name of the file being parsed.
 * @private
 */
function TokenParser(tokens, filters, autoescape, line, filename) {
  this.out = [];
  this.state = [];
  this.filterApplyIdx = [];
  this._parsers = {};
  this.line = line;
  this.filename = filename;
  this.filters = filters;
  this.escape = autoescape;

  this.parse = function () {
    var self = this;

    if (self._parsers.start) {
      self._parsers.start.call(self);
    }
    utils.each(tokens, function (token, i) {
      var prevToken = tokens[i - 1];
      self.isLast = (i === tokens.length - 1);
      if (prevToken) {
        while (prevToken.type === _t.WHITESPACE) {
          i -= 1;
          prevToken = tokens[i - 1];
        }
      }
      self.prevToken = prevToken;
      self.parseToken(token);
    });
    if (self._parsers.end) {
      self._parsers.end.call(self);
    }

    if (self.escape) {
      self.filterApplyIdx = [0];
      if (typeof self.escape === 'string') {
        self.parseToken({ type: _t.FILTER, match: 'e' });
        self.parseToken({ type: _t.COMMA, match: ',' });
        self.parseToken({ type: _t.STRING, match: String(autoescape) });
        self.parseToken({ type: _t.PARENCLOSE, match: ')'});
      } else {
        self.parseToken({ type: _t.FILTEREMPTY, match: 'e' });
      }
    }

    return self.out;
  };
}

TokenParser.prototype = {
  /**
   * Set a custom method to be called when a token type is found.
   *
   * @example
   * parser.on(types.STRING, function (token) {
   *   this.out.push(token.match);
   * });
   * @example
   * parser.on('start', function () {
   *   this.out.push('something at the beginning of your args')
   * });
   * parser.on('end', function () {
   *   this.out.push('something at the end of your args');
   * });
   *
   * @param  {number}   type Token type ID. Found in the Lexer.
   * @param  {Function} fn   Callback function. Return true to continue executing the default parsing function.
   * @return {undefined}
   */
  on: function (type, fn) {
    this._parsers[type] = fn;
  },

  /**
   * Parse a single token.
   * @param  {{match: string, type: number, line: number}} token Lexer token object.
   * @return {undefined}
   * @private
   */
  parseToken: function (token) {
    var self = this,
      fn = self._parsers[token.type] || self._parsers['*'],
      match = token.match,
      prevToken = self.prevToken,
      prevTokenType = prevToken ? prevToken.type : null,
      lastState = (self.state.length) ? self.state[self.state.length - 1] : null,
      temp;

    if (fn && typeof fn === 'function') {
      if (!fn.call(this, token)) {
        return;
      }
    }

    if (lastState && prevToken &&
        lastState === _t.FILTER &&
        prevTokenType === _t.FILTER &&
        token.type !== _t.PARENCLOSE &&
        token.type !== _t.COMMA &&
        token.type !== _t.OPERATOR &&
        token.type !== _t.FILTER &&
        token.type !== _t.FILTEREMPTY) {
      self.out.push(', ');
    }

    if (lastState && lastState === _t.METHODOPEN) {
      self.state.pop();
      if (token.type !== _t.PARENCLOSE) {
        self.out.push(', ');
      }
    }

    switch (token.type) {
    case _t.WHITESPACE:
      break;

    case _t.STRING:
      self.filterApplyIdx.push(self.out.length);
      self.out.push(match.replace(/\\/g, '\\\\'));
      break;

    case _t.NUMBER:
    case _t.BOOL:
      self.filterApplyIdx.push(self.out.length);
      self.out.push(match);
      break;

    case _t.FILTER:
      if (!self.filters.hasOwnProperty(match) || typeof self.filters[match] !== "function") {
        utils.throwError('Invalid filter "' + match + '"', self.line, self.filename);
      }
      self.escape = self.filters[match].safe ? false : self.escape;
      self.out.splice(self.filterApplyIdx[self.filterApplyIdx.length - 1], 0, '_filters["' + match + '"](');
      self.state.push(token.type);
      break;

    case _t.FILTEREMPTY:
      if (!self.filters.hasOwnProperty(match) || typeof self.filters[match] !== "function") {
        utils.throwError('Invalid filter "' + match + '"', self.line, self.filename);
      }
      self.escape = self.filters[match].safe ? false : self.escape;
      self.out.splice(self.filterApplyIdx[self.filterApplyIdx.length - 1], 0, '_filters["' + match + '"](');
      self.out.push(')');
      break;

    case _t.FUNCTION:
    case _t.FUNCTIONEMPTY:
      self.out.push('((typeof _ctx.' + match + ' !== "undefined") ? _ctx.' + match +
        ' : ((typeof ' + match + ' !== "undefined") ? ' + match +
        ' : _fn))(');
      self.escape = false;
      if (token.type === _t.FUNCTIONEMPTY) {
        self.out[self.out.length - 1] = self.out[self.out.length - 1] + ')';
      } else {
        self.state.push(token.type);
      }
      self.filterApplyIdx.push(self.out.length - 1);
      break;

    case _t.PARENOPEN:
      self.state.push(token.type);
      if (self.filterApplyIdx.length) {
        self.out.splice(self.filterApplyIdx[self.filterApplyIdx.length - 1], 0, '(');
        if (prevToken && prevTokenType === _t.VAR) {
          temp = prevToken.match.split('.').slice(0, -1);
          self.out.push(' || _fn).call(' + self.checkMatch(temp));
          self.state.push(_t.METHODOPEN);
          self.escape = false;
        } else {
          self.out.push(' || _fn)(');
        }
        self.filterApplyIdx.push(self.out.length - 3);
      } else {
        self.out.push('(');
        self.filterApplyIdx.push(self.out.length - 1);
      }
      break;

    case _t.PARENCLOSE:
      temp = self.state.pop();
      if (temp !== _t.PARENOPEN && temp !== _t.FUNCTION && temp !== _t.FILTER) {
        utils.throwError('Mismatched nesting state', self.line, self.filename);
      }
      self.out.push(')');
      // Once off the previous entry
      self.filterApplyIdx.pop();
      if (temp !== _t.FILTER) {
        // Once for the open paren
        self.filterApplyIdx.pop();
      }
      break;

    case _t.COMMA:
      if (lastState !== _t.FUNCTION &&
          lastState !== _t.FILTER &&
          lastState !== _t.ARRAYOPEN &&
          lastState !== _t.CURLYOPEN &&
          lastState !== _t.PARENOPEN &&
          lastState !== _t.COLON) {
        utils.throwError('Unexpected comma', self.line, self.filename);
      }
      if (lastState === _t.COLON) {
        self.state.pop();
      }
      self.out.push(', ');
      self.filterApplyIdx.pop();
      break;

    case _t.LOGIC:
    case _t.COMPARATOR:
      if (!prevToken ||
          prevTokenType === _t.COMMA ||
          prevTokenType === token.type ||
          prevTokenType === _t.BRACKETOPEN ||
          prevTokenType === _t.CURLYOPEN ||
          prevTokenType === _t.PARENOPEN ||
          prevTokenType === _t.FUNCTION) {
        utils.throwError('Unexpected logic', self.line, self.filename);
      }
      self.out.push(token.match);
      break;

    case _t.NOT:
      self.out.push(token.match);
      break;

    case _t.VAR:
      self.parseVar(token, match, lastState);
      break;

    case _t.BRACKETOPEN:
      if (!prevToken ||
          (prevTokenType !== _t.VAR &&
            prevTokenType !== _t.BRACKETCLOSE &&
            prevTokenType !== _t.PARENCLOSE)) {
        self.state.push(_t.ARRAYOPEN);
        self.filterApplyIdx.push(self.out.length);
      } else {
        self.state.push(token.type);
      }
      self.out.push('[');
      break;

    case _t.BRACKETCLOSE:
      temp = self.state.pop();
      if (temp !== _t.BRACKETOPEN && temp !== _t.ARRAYOPEN) {
        utils.throwError('Unexpected closing square bracket', self.line, self.filename);
      }
      self.out.push(']');
      self.filterApplyIdx.pop();
      break;

    case _t.CURLYOPEN:
      self.state.push(token.type);
      self.out.push('{');
      self.filterApplyIdx.push(self.out.length - 1);
      break;

    case _t.COLON:
      if (lastState !== _t.CURLYOPEN) {
        utils.throwError('Unexpected colon', self.line, self.filename);
      }
      self.state.push(token.type);
      self.out.push(':');
      self.filterApplyIdx.pop();
      break;

    case _t.CURLYCLOSE:
      if (lastState === _t.COLON) {
        self.state.pop();
      }
      if (self.state.pop() !== _t.CURLYOPEN) {
        utils.throwError('Unexpected closing curly brace', self.line, self.filename);
      }
      self.out.push('}');

      self.filterApplyIdx.pop();
      break;

    case _t.DOTKEY:
      if (!prevToken || (
          prevTokenType !== _t.VAR &&
          prevTokenType !== _t.BRACKETCLOSE &&
          prevTokenType !== _t.DOTKEY &&
          prevTokenType !== _t.PARENCLOSE &&
          prevTokenType !== _t.FUNCTIONEMPTY &&
          prevTokenType !== _t.FILTEREMPTY &&
          prevTokenType !== _t.CURLYCLOSE
        )) {
        utils.throwError('Unexpected key "' + match + '"', self.line, self.filename);
      }
      self.out.push('.' + match);
      break;

    case _t.OPERATOR:
      self.out.push(' ' + match + ' ');
      self.filterApplyIdx.pop();
      break;
    }
  },

  /**
   * Parse variable token
   * @param  {{match: string, type: number, line: number}} token      Lexer token object.
   * @param  {string} match       Shortcut for token.match
   * @param  {number} lastState   Lexer token type state.
   * @return {undefined}
   * @private
   */
  parseVar: function (token, match, lastState) {
    var self = this;

    match = match.split('.');

    if (_reserved.indexOf(match[0]) !== -1) {
      utils.throwError('Reserved keyword "' + match[0] + '" attempted to be used as a variable', self.line, self.filename);
    }

    self.filterApplyIdx.push(self.out.length);
    if (lastState === _t.CURLYOPEN) {
      if (match.length > 1) {
        utils.throwError('Unexpected dot', self.line, self.filename);
      }
      self.out.push(match[0]);
      return;
    }

    self.out.push(self.checkMatch(match));
  },

  /**
   * Return contextual dot-check string for a match
   * @param  {string} match       Shortcut for token.match
   * @private
   */
  checkMatch: function (match) {
    var temp = match[0], result;

    function checkDot(ctx) {
      var c = ctx + temp,
        m = match,
        build = '';

      build = '(typeof ' + c + ' !== "undefined" && ' + c + ' !== null';
      utils.each(m, function (v, i) {
        if (i === 0) {
          return;
        }
        build += ' && ' + c + '.' + v + ' !== undefined && ' + c + '.' + v + ' !== null';
        c += '.' + v;
      });
      build += ')';

      return build;
    }

    function buildDot(ctx) {
      return '(' + checkDot(ctx) + ' ? ' + ctx + match.join('.') + ' : "")';
    }
    result = '(' + checkDot('_ctx.') + ' ? ' + buildDot('_ctx.') + ' : ' + buildDot('') + ')';
    return '(' + result + ' !== null ? ' + result + ' : ' + '"" )';
  }
};

/**
 * Parse a source string into tokens that are ready for compilation.
 *
 * @example
 * exports.parse('{{ tacos }}', {}, tags, filters);
 * // => [{ compile: [Function], ... }]
 *
 * @params {object} swig    The current Swig instance
 * @param  {string} source  Swig template source.
 * @param  {object} opts    Swig options object.
 * @param  {object} tags    Keyed object of tags that can be parsed and compiled.
 * @param  {object} filters Keyed object of filters that may be applied to variables.
 * @return {array}          List of tokens ready for compilation.
 */
exports.parse = function (swig, source, opts, tags, filters) {
  source = source.replace(/\r\n/g, '\n');
  var escape = opts.autoescape,
    tagOpen = opts.tagControls[0],
    tagClose = opts.tagControls[1],
    varOpen = opts.varControls[0],
    varClose = opts.varControls[1],
    escapedTagOpen = escapeRegExp(tagOpen),
    escapedTagClose = escapeRegExp(tagClose),
    escapedVarOpen = escapeRegExp(varOpen),
    escapedVarClose = escapeRegExp(varClose),
    tagStrip = new RegExp('^' + escapedTagOpen + '-?\\s*-?|-?\\s*-?' + escapedTagClose + '$', 'g'),
    tagStripBefore = new RegExp('^' + escapedTagOpen + '-'),
    tagStripAfter = new RegExp('-' + escapedTagClose + '$'),
    varStrip = new RegExp('^' + escapedVarOpen + '-?\\s*-?|-?\\s*-?' + escapedVarClose + '$', 'g'),
    varStripBefore = new RegExp('^' + escapedVarOpen + '-'),
    varStripAfter = new RegExp('-' + escapedVarClose + '$'),
    cmtOpen = opts.cmtControls[0],
    cmtClose = opts.cmtControls[1],
    anyChar = '[\\s\\S]*?',
    // Split the template source based on variable, tag, and comment blocks
    // /(\{%[\s\S]*?%\}|\{\{[\s\S]*?\}\}|\{#[\s\S]*?#\})/
    splitter = new RegExp(
      '(' +
        escapedTagOpen + anyChar + escapedTagClose + '|' +
        escapedVarOpen + anyChar + escapedVarClose + '|' +
        escapeRegExp(cmtOpen) + anyChar + escapeRegExp(cmtClose) +
        ')'
    ),
    line = 1,
    stack = [],
    parent = null,
    tokens = [],
    blocks = {},
    inRaw = false,
    stripNext;

  /**
   * Parse a variable.
   * @param  {string} str  String contents of the variable, between <i>{{</i> and <i>}}</i>
   * @param  {number} line The line number that this variable starts on.
   * @return {VarToken}      Parsed variable token object.
   * @private
   */
  function parseVariable(str, line) {
    var tokens = lexer.read(utils.strip(str)),
      parser,
      out;

    parser = new TokenParser(tokens, filters, escape, line, opts.filename);
    out = parser.parse().join('');

    if (parser.state.length) {
      utils.throwError('Unable to parse "' + str + '"', line, opts.filename);
    }

    /**
     * A parsed variable token.
     * @typedef {object} VarToken
     * @property {function} compile Method for compiling this token.
     */
    return {
      compile: function () {
        return '_output += ' + out + ';\n';
      }
    };
  }
  exports.parseVariable = parseVariable;

  /**
   * Parse a tag.
   * @param  {string} str  String contents of the tag, between <i>{%</i> and <i>%}</i>
   * @param  {number} line The line number that this tag starts on.
   * @return {TagToken}      Parsed token object.
   * @private
   */
  function parseTag(str, line) {
    var tokens, parser, chunks, tagName, tag, args, last;

    if (utils.startsWith(str, 'end')) {
      last = stack[stack.length - 1];
      if (last && last.name === str.split(/\s+/)[0].replace(/^end/, '') && last.ends) {
        switch (last.name) {
        case 'autoescape':
          escape = opts.autoescape;
          break;
        case 'raw':
          inRaw = false;
          break;
        }
        stack.pop();
        return;
      }

      if (!inRaw) {
        utils.throwError('Unexpected end of tag "' + str.replace(/^end/, '') + '"', line, opts.filename);
      }
    }

    if (inRaw) {
      return;
    }

    chunks = str.split(/\s+(.+)?/);
    tagName = chunks.shift();

    if (!tags.hasOwnProperty(tagName)) {
      utils.throwError('Unexpected tag "' + str + '"', line, opts.filename);
    }

    tokens = lexer.read(utils.strip(chunks.join(' ')));
    parser = new TokenParser(tokens, filters, false, line, opts.filename);
    tag = tags[tagName];

    /**
     * Define custom parsing methods for your tag.
     * @callback parse
     *
     * @example
     * exports.parse = function (str, line, parser, types, options, swig) {
     *   parser.on('start', function () {
     *     // ...
     *   });
     *   parser.on(types.STRING, function (token) {
     *     // ...
     *   });
     * };
     *
     * @param {string} str The full token string of the tag.
     * @param {number} line The line number that this tag appears on.
     * @param {TokenParser} parser A TokenParser instance.
     * @param {TYPES} types Lexer token type enum.
     * @param {TagToken[]} stack The current stack of open tags.
     * @param {SwigOpts} options Swig Options Object.
     * @param {object} swig The Swig instance (gives acces to loaders, parsers, etc)
     */
    if (!tag.parse(chunks[1], line, parser, _t, stack, opts, swig)) {
      utils.throwError('Unexpected tag "' + tagName + '"', line, opts.filename);
    }

    parser.parse();
    args = parser.out;

    switch (tagName) {
    case 'autoescape':
      escape = (args[0] !== 'false') ? args[0] : false;
      break;
    case 'raw':
      inRaw = true;
      break;
    }

    /**
     * A parsed tag token.
     * @typedef {Object} TagToken
     * @property {compile} [compile] Method for compiling this token.
     * @property {array} [args] Array of arguments for the tag.
     * @property {Token[]} [content=[]] An array of tokens that are children of this Token.
     * @property {boolean} [ends] Whether or not this tag requires an end tag.
     * @property {string} name The name of this tag.
     */
    return {
      block: !!tags[tagName].block,
      compile: tag.compile,
      args: args,
      content: [],
      ends: tag.ends,
      name: tagName
    };
  }

  /**
   * Strip the whitespace from the previous token, if it is a string.
   * @param  {object} token Parsed token.
   * @return {object}       If the token was a string, trailing whitespace will be stripped.
   */
  function stripPrevToken(token) {
    if (typeof token === 'string') {
      token = token.replace(/\s*$/, '');
    }
    return token;
  }

  /*!
   * Loop over the source, split via the tag/var/comment regular expression splitter.
   * Send each chunk to the appropriate parser.
   */
  utils.each(source.split(splitter), function (chunk) {
    var token, lines, stripPrev, prevToken, prevChildToken;

    if (!chunk) {
      return;
    }

    // Is a variable?
    if (!inRaw && utils.startsWith(chunk, varOpen) && utils.endsWith(chunk, varClose)) {
      stripPrev = varStripBefore.test(chunk);
      stripNext = varStripAfter.test(chunk);
      token = parseVariable(chunk.replace(varStrip, ''), line);
    // Is a tag?
    } else if (utils.startsWith(chunk, tagOpen) && utils.endsWith(chunk, tagClose)) {
      stripPrev = tagStripBefore.test(chunk);
      stripNext = tagStripAfter.test(chunk);
      token = parseTag(chunk.replace(tagStrip, ''), line);
      if (token) {
        if (token.name === 'extends') {
          parent = token.args.join('').replace(/^\'|\'$/g, '').replace(/^\"|\"$/g, '');
        } else if (token.block && !stack.length) {
          blocks[token.args.join('')] = token;
        }
      }
      if (inRaw && !token) {
        token = chunk;
      }
    // Is a content string?
    } else if (inRaw || (!utils.startsWith(chunk, cmtOpen) && !utils.endsWith(chunk, cmtClose))) {
      token = (stripNext) ? chunk.replace(/^\s*/, '') : chunk;
      stripNext = false;
    } else if (utils.startsWith(chunk, cmtOpen) && utils.endsWith(chunk, cmtClose)) {
      return;
    }

    // Did this tag ask to strip previous whitespace? <code>{%- ... %}</code> or <code>{{- ... }}</code>
    if (stripPrev && tokens.length) {
      prevToken = tokens.pop();
      if (typeof prevToken === 'string') {
        prevToken = stripPrevToken(prevToken);
      } else if (prevToken.content && prevToken.content.length) {
        prevChildToken = stripPrevToken(prevToken.content.pop());
        prevToken.content.push(prevChildToken);
      }
      tokens.push(prevToken);
    }

    // This was a comment, so let's just keep going.
    if (!token) {
      return;
    }

    // If there's an open item in the stack, add this to its content.
    if (stack.length) {
      stack[stack.length - 1].content.push(token);
    } else {
      tokens.push(token);
    }

    // If the token is a tag that requires an end tag, open it on the stack.
    if (token.name && token.ends) {
      stack.push(token);
    }

    lines = chunk.match(/\n/g);
    line += (lines) ? lines.length : 0;
  });

  return {
    name: opts.filename,
    parent: parent,
    tokens: tokens,
    blocks: blocks
  };
};


/**
 * Compile an array of tokens.
 * @param  {Token[]} template     An array of template tokens.
 * @param  {Templates[]} parents  Array of parent templates.
 * @param  {SwigOpts} [options]   Swig options object.
 * @param  {string} [blockName]   Name of the current block context.
 * @return {string}               Partial for a compiled JavaScript method that will output a rendered template.
 */
exports.compile = function (template, parents, options, blockName) {
  var out = '',
    tokens = utils.isArray(template) ? template : template.tokens;

  utils.each(tokens, function (token) {
    var o;
    if (typeof token === 'string') {
      out += '_output += "' + token.replace(/\\/g, '\\\\').replace(/\n|\r/g, '\\n').replace(/"/g, '\\"') + '";\n';
      return;
    }

    /**
     * Compile callback for VarToken and TagToken objects.
     * @callback compile
     *
     * @example
     * exports.compile = function (compiler, args, content, parents, options, blockName) {
     *   if (args[0] === 'foo') {
     *     return compiler(content, parents, options, blockName) + '\n';
     *   }
     *   return '_output += "fallback";\n';
     * };
     *
     * @param {parserCompiler} compiler
     * @param {array} [args] Array of parsed arguments on the for the token.
     * @param {array} [content] Array of content within the token.
     * @param {array} [parents] Array of parent templates for the current template context.
     * @param {SwigOpts} [options] Swig Options Object
     * @param {string} [blockName] Name of the direct block parent, if any.
     */
    o = token.compile(exports.compile, token.args ? token.args.slice(0) : [], token.content ? token.content.slice(0) : [], parents, options, blockName);
    out += o || '';
  });

  return out;
};

},{"./lexer":4,"./utils":26}],9:[function(require,module,exports){
var utils = require('./utils'),
  _tags = require('./tags'),
  _filters = require('./filters'),
  parser = require('./parser'),
  dateformatter = require('./dateformatter'),
  loaders = require('./loaders');

/**
 * Swig version number as a string.
 * @example
 * if (swig.version === "1.4.2") { ... }
 *
 * @type {String}
 */
exports.version = "1.4.2";

/**
 * Swig Options Object. This object can be passed to many of the API-level Swig methods to control various aspects of the engine. All keys are optional.
 * @typedef {Object} SwigOpts
 * @property {boolean} autoescape  Controls whether or not variable output will automatically be escaped for safe HTML output. Defaults to <code data-language="js">true</code>. Functions executed in variable statements will not be auto-escaped. Your application/functions should take care of their own auto-escaping.
 * @property {array}   varControls Open and close controls for variables. Defaults to <code data-language="js">['{{', '}}']</code>.
 * @property {array}   tagControls Open and close controls for tags. Defaults to <code data-language="js">['{%', '%}']</code>.
 * @property {array}   cmtControls Open and close controls for comments. Defaults to <code data-language="js">['{#', '#}']</code>.
 * @property {object}  locals      Default variable context to be passed to <strong>all</strong> templates.
 * @property {CacheOptions} cache Cache control for templates. Defaults to saving in <code data-language="js">'memory'</code>. Send <code data-language="js">false</code> to disable. Send an object with <code data-language="js">get</code> and <code data-language="js">set</code> functions to customize.
 * @property {TemplateLoader} loader The method that Swig will use to load templates. Defaults to <var>swig.loaders.fs</var>.
 */
var defaultOptions = {
    autoescape: true,
    varControls: ['{{', '}}'],
    tagControls: ['{%', '%}'],
    cmtControls: ['{#', '#}'],
    locals: {},
    /**
     * Cache control for templates. Defaults to saving all templates into memory.
     * @typedef {boolean|string|object} CacheOptions
     * @example
     * // Default
     * swig.setDefaults({ cache: 'memory' });
     * @example
     * // Disables caching in Swig.
     * swig.setDefaults({ cache: false });
     * @example
     * // Custom cache storage and retrieval
     * swig.setDefaults({
     *   cache: {
     *     get: function (key) { ... },
     *     set: function (key, val) { ... }
     *   }
     * });
     */
    cache: 'memory',
    /**
     * Configure Swig to use either the <var>swig.loaders.fs</var> or <var>swig.loaders.memory</var> template loader. Or, you can write your own!
     * For more information, please see the <a href="../loaders/">Template Loaders documentation</a>.
     * @typedef {class} TemplateLoader
     * @example
     * // Default, FileSystem loader
     * swig.setDefaults({ loader: swig.loaders.fs() });
     * @example
     * // FileSystem loader allowing a base path
     * // With this, you don't use relative URLs in your template references
     * swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/templates') });
     * @example
     * // Memory Loader
     * swig.setDefaults({ loader: swig.loaders.memory({
     *   layout: '{% block foo %}{% endblock %}',
     *   page1: '{% extends "layout" %}{% block foo %}Tacos!{% endblock %}'
     * })});
     */
    loader: loaders.fs()
  },
  defaultInstance;

/**
 * Empty function, used in templates.
 * @return {string} Empty string
 * @private
 */
function efn() { return ''; }

/**
 * Validate the Swig options object.
 * @param  {?SwigOpts} options Swig options object.
 * @return {undefined}      This method will throw errors if anything is wrong.
 * @private
 */
function validateOptions(options) {
  if (!options) {
    return;
  }

  utils.each(['varControls', 'tagControls', 'cmtControls'], function (key) {
    if (!options.hasOwnProperty(key)) {
      return;
    }
    if (!utils.isArray(options[key]) || options[key].length !== 2) {
      throw new Error('Option "' + key + '" must be an array containing 2 different control strings.');
    }
    if (options[key][0] === options[key][1]) {
      throw new Error('Option "' + key + '" open and close controls must not be the same.');
    }
    utils.each(options[key], function (a, i) {
      if (a.length < 2) {
        throw new Error('Option "' + key + '" ' + ((i) ? 'open ' : 'close ') + 'control must be at least 2 characters. Saw "' + a + '" instead.');
      }
    });
  });

  if (options.hasOwnProperty('cache')) {
    if (options.cache && options.cache !== 'memory') {
      if (!options.cache.get || !options.cache.set) {
        throw new Error('Invalid cache option ' + JSON.stringify(options.cache) + ' found. Expected "memory" or { get: function (key) { ... }, set: function (key, value) { ... } }.');
      }
    }
  }
  if (options.hasOwnProperty('loader')) {
    if (options.loader) {
      if (!options.loader.load || !options.loader.resolve) {
        throw new Error('Invalid loader option ' + JSON.stringify(options.loader) + ' found. Expected { load: function (pathname, cb) { ... }, resolve: function (to, from) { ... } }.');
      }
    }
  }

}

/**
 * Set defaults for the base and all new Swig environments.
 *
 * @example
 * swig.setDefaults({ cache: false });
 * // => Disables Cache
 *
 * @example
 * swig.setDefaults({ locals: { now: function () { return new Date(); } }});
 * // => sets a globally accessible method for all template
 * //    contexts, allowing you to print the current date
 * // => {{ now()|date('F jS, Y') }}
 *
 * @param  {SwigOpts} [options={}] Swig options object.
 * @return {undefined}
 */
exports.setDefaults = function (options) {
  validateOptions(options);
  defaultInstance.options = utils.extend(defaultInstance.options, options);
};

/**
 * Set the default TimeZone offset for date formatting via the date filter. This is a global setting and will affect all Swig environments, old or new.
 * @param  {number} offset Offset from GMT, in minutes.
 * @return {undefined}
 */
exports.setDefaultTZOffset = function (offset) {
  dateformatter.tzOffset = offset;
};

/**
 * Create a new, separate Swig compile/render environment.
 *
 * @example
 * var swig = require('swig');
 * var myswig = new swig.Swig({varControls: ['<%=', '%>']});
 * myswig.render('Tacos are <%= tacos =>!', { locals: { tacos: 'delicious' }});
 * // => Tacos are delicious!
 * swig.render('Tacos are <%= tacos =>!', { locals: { tacos: 'delicious' }});
 * // => 'Tacos are <%= tacos =>!'
 *
 * @param  {SwigOpts} [opts={}] Swig options object.
 * @return {object}      New Swig environment.
 */
exports.Swig = function (opts) {
  validateOptions(opts);
  this.options = utils.extend({}, defaultOptions, opts || {});
  this.cache = {};
  this.extensions = {};
  var self = this,
    tags = _tags,
    filters = _filters;

  /**
   * Get combined locals context.
   * @param  {?SwigOpts} [options] Swig options object.
   * @return {object}         Locals context.
   * @private
   */
  function getLocals(options) {
    if (!options || !options.locals) {
      return self.options.locals;
    }

    return utils.extend({}, self.options.locals, options.locals);
  }

  /**
   * Determine whether caching is enabled via the options provided and/or defaults
   * @param  {SwigOpts} [options={}] Swig Options Object
   * @return {boolean}
   * @private
   */
  function shouldCache(options) {
    options = options || {};
    return (options.hasOwnProperty('cache') && !options.cache) || !self.options.cache;
  }

  /**
   * Get compiled template from the cache.
   * @param  {string} key           Name of template.
   * @return {object|undefined}     Template function and tokens.
   * @private
   */
  function cacheGet(key, options) {
    if (shouldCache(options)) {
      return;
    }

    if (self.options.cache === 'memory') {
      return self.cache[key];
    }

    return self.options.cache.get(key);
  }

  /**
   * Store a template in the cache.
   * @param  {string} key Name of template.
   * @param  {object} val Template function and tokens.
   * @return {undefined}
   * @private
   */
  function cacheSet(key, options, val) {
    if (shouldCache(options)) {
      return;
    }

    if (self.options.cache === 'memory') {
      self.cache[key] = val;
      return;
    }

    self.options.cache.set(key, val);
  }

  /**
   * Clears the in-memory template cache.
   *
   * @example
   * swig.invalidateCache();
   *
   * @return {undefined}
   */
  this.invalidateCache = function () {
    if (self.options.cache === 'memory') {
      self.cache = {};
    }
  };

  /**
   * Add a custom filter for swig variables.
   *
   * @example
   * function replaceMs(input) { return input.replace(/m/g, 'f'); }
   * swig.setFilter('replaceMs', replaceMs);
   * // => {{ "onomatopoeia"|replaceMs }}
   * // => onofatopeia
   *
   * @param {string}    name    Name of filter, used in templates. <strong>Will</strong> overwrite previously defined filters, if using the same name.
   * @param {function}  method  Function that acts against the input. See <a href="/docs/filters/#custom">Custom Filters</a> for more information.
   * @return {undefined}
   */
  this.setFilter = function (name, method) {
    if (typeof method !== "function") {
      throw new Error('Filter "' + name + '" is not a valid function.');
    }
    filters[name] = method;
  };

  /**
   * Add a custom tag. To expose your own extensions to compiled template code, see <code data-language="js">swig.setExtension</code>.
   *
   * For a more in-depth explanation of writing custom tags, see <a href="../extending/#tags">Custom Tags</a>.
   *
   * @example
   * var tacotag = require('./tacotag');
   * swig.setTag('tacos', tacotag.parse, tacotag.compile, tacotag.ends, tacotag.blockLevel);
   * // => {% tacos %}Make this be tacos.{% endtacos %}
   * // => Tacos tacos tacos tacos.
   *
   * @param  {string} name      Tag name.
   * @param  {function} parse   Method for parsing tokens.
   * @param  {function} compile Method for compiling renderable output.
   * @param  {boolean} [ends=false]     Whether or not this tag requires an <i>end</i> tag.
   * @param  {boolean} [blockLevel=false] If false, this tag will not be compiled outside of <code>block</code> tags when extending a parent template.
   * @return {undefined}
   */
  this.setTag = function (name, parse, compile, ends, blockLevel) {
    if (typeof parse !== 'function') {
      throw new Error('Tag "' + name + '" parse method is not a valid function.');
    }

    if (typeof compile !== 'function') {
      throw new Error('Tag "' + name + '" compile method is not a valid function.');
    }

    tags[name] = {
      parse: parse,
      compile: compile,
      ends: ends || false,
      block: !!blockLevel
    };
  };

  /**
   * Add extensions for custom tags. This allows any custom tag to access a globally available methods via a special globally available object, <var>_ext</var>, in templates.
   *
   * @example
   * swig.setExtension('trans', function (v) { return translate(v); });
   * function compileTrans(compiler, args, content, parent, options) {
   *   return '_output += _ext.trans(' + args[0] + ');'
   * };
   * swig.setTag('trans', parseTrans, compileTrans, true);
   *
   * @param  {string} name   Key name of the extension. Accessed via <code data-language="js">_ext[name]</code>.
   * @param  {*}      object The method, value, or object that should be available via the given name.
   * @return {undefined}
   */
  this.setExtension = function (name, object) {
    self.extensions[name] = object;
  };

  /**
   * Parse a given source string into tokens.
   *
   * @param  {string} source  Swig template source.
   * @param  {SwigOpts} [options={}] Swig options object.
   * @return {object} parsed  Template tokens object.
   * @private
   */
  this.parse = function (source, options) {
    validateOptions(options);

    var locals = getLocals(options),
      opts = {},
      k;

    for (k in options) {
      if (options.hasOwnProperty(k) && k !== 'locals') {
        opts[k] = options[k];
      }
    }

    options = utils.extend({}, self.options, opts);
    options.locals = locals;

    return parser.parse(this, source, options, tags, filters);
  };

  /**
   * Parse a given file into tokens.
   *
   * @param  {string} pathname  Full path to file to parse.
   * @param  {SwigOpts} [options={}]   Swig options object.
   * @return {object} parsed    Template tokens object.
   * @private
   */
  this.parseFile = function (pathname, options) {
    var src;

    if (!options) {
      options = {};
    }

    pathname = self.options.loader.resolve(pathname, options.resolveFrom);

    src = self.options.loader.load(pathname);

    if (!options.filename) {
      options = utils.extend({ filename: pathname }, options);
    }

    return self.parse(src, options);
  };

  /**
   * Re-Map blocks within a list of tokens to the template's block objects.
   * @param  {array}  tokens   List of tokens for the parent object.
   * @param  {object} template Current template that needs to be mapped to the  parent's block and token list.
   * @return {array}
   * @private
   */
  function remapBlocks(blocks, tokens) {
    return utils.map(tokens, function (token) {
      var args = token.args ? token.args.join('') : '';
      if (token.name === 'block' && blocks[args]) {
        token = blocks[args];
      }
      if (token.content && token.content.length) {
        token.content = remapBlocks(blocks, token.content);
      }
      return token;
    });
  }

  /**
   * Import block-level tags to the token list that are not actual block tags.
   * @param  {array} blocks List of block-level tags.
   * @param  {array} tokens List of tokens to render.
   * @return {undefined}
   * @private
   */
  function importNonBlocks(blocks, tokens) {
    var temp = [];
    utils.each(blocks, function (block) { temp.push(block); });
    utils.each(temp.reverse(), function (block) {
      if (block.name !== 'block') {
        tokens.unshift(block);
      }
    });
  }

  /**
   * Recursively compile and get parents of given parsed token object.
   *
   * @param  {object} tokens    Parsed tokens from template.
   * @param  {SwigOpts} [options={}]   Swig options object.
   * @return {object}           Parsed tokens from parent templates.
   * @private
   */
  function getParents(tokens, options) {
    var parentName = tokens.parent,
      parentFiles = [],
      parents = [],
      parentFile,
      parent,
      l;

    while (parentName) {
      if (!options || !options.filename) {
        throw new Error('Cannot extend "' + parentName + '" because current template has no filename.');
      }

      parentFile = parentFile || options.filename;
      parentFile = self.options.loader.resolve(parentName, parentFile);
      parent = cacheGet(parentFile, options) || self.parseFile(parentFile, utils.extend({}, options, { filename: parentFile }));
      parentName = parent.parent;

      if (parentFiles.indexOf(parentFile) !== -1) {
        throw new Error('Illegal circular extends of "' + parentFile + '".');
      }
      parentFiles.push(parentFile);

      parents.push(parent);
    }

    // Remap each parents'(1) blocks onto its own parent(2), receiving the full token list for rendering the original parent(1) on its own.
    l = parents.length;
    for (l = parents.length - 2; l >= 0; l -= 1) {
      parents[l].tokens = remapBlocks(parents[l].blocks, parents[l + 1].tokens);
      importNonBlocks(parents[l].blocks, parents[l].tokens);
    }

    return parents;
  }

  /**
   * Pre-compile a source string into a cache-able template function.
   *
   * @example
   * swig.precompile('{{ tacos }}');
   * // => {
   * //      tpl: function (_swig, _locals, _filters, _utils, _fn) { ... },
   * //      tokens: {
   * //        name: undefined,
   * //        parent: null,
   * //        tokens: [...],
   * //        blocks: {}
   * //      }
   * //    }
   *
   * In order to render a pre-compiled template, you must have access to filters and utils from Swig. <var>efn</var> is simply an empty function that does nothing.
   *
   * @param  {string} source  Swig template source string.
   * @param  {SwigOpts} [options={}] Swig options object.
   * @return {object}         Renderable function and tokens object.
   */
  this.precompile = function (source, options) {
    var tokens = self.parse(source, options),
      parents = getParents(tokens, options),
      tpl,
      err;

    if (parents.length) {
      // Remap the templates first-parent's tokens using this template's blocks.
      tokens.tokens = remapBlocks(tokens.blocks, parents[0].tokens);
      importNonBlocks(tokens.blocks, tokens.tokens);
    }

    try {
      tpl = new Function('_swig', '_ctx', '_filters', '_utils', '_fn',
        '  var _ext = _swig.extensions,\n' +
        '    _output = "";\n' +
        parser.compile(tokens, parents, options) + '\n' +
        '  return _output;\n'
        );
    } catch (e) {
      utils.throwError(e, null, options.filename);
    }

    return { tpl: tpl, tokens: tokens };
  };

  /**
   * Compile and render a template string for final output.
   *
   * When rendering a source string, a file path should be specified in the options object in order for <var>extends</var>, <var>include</var>, and <var>import</var> to work properly. Do this by adding <code data-language="js">{ filename: '/absolute/path/to/mytpl.html' }</code> to the options argument.
   *
   * @example
   * swig.render('{{ tacos }}', { locals: { tacos: 'Tacos!!!!' }});
   * // => Tacos!!!!
   *
   * @param  {string} source    Swig template source string.
   * @param  {SwigOpts} [options={}] Swig options object.
   * @return {string}           Rendered output.
   */
  this.render = function (source, options) {
    return self.compile(source, options)();
  };

  /**
   * Compile and render a template file for final output. This is most useful for libraries like Express.js.
   *
   * @example
   * swig.renderFile('./template.html', {}, function (err, output) {
   *   if (err) {
   *     throw err;
   *   }
   *   console.log(output);
   * });
   *
   * @example
   * swig.renderFile('./template.html', {});
   * // => output
   *
   * @param  {string}   pathName    File location.
   * @param  {object}   [locals={}] Template variable context.
   * @param  {Function} [cb] Asyncronous callback function. If not provided, <var>compileFile</var> will run syncronously.
   * @return {string}             Rendered output.
   */
  this.renderFile = function (pathName, locals, cb) {
    if (cb) {
      self.compileFile(pathName, {}, function (err, fn) {
        var result;

        if (err) {
          cb(err);
          return;
        }

        try {
          result = fn(locals);
        } catch (err2) {
          cb(err2);
          return;
        }

        cb(null, result);
      });
      return;
    }

    return self.compileFile(pathName)(locals);
  };

  /**
   * Compile string source into a renderable template function.
   *
   * @example
   * var tpl = swig.compile('{{ tacos }}');
   * // => {
   * //      [Function: compiled]
   * //      parent: null,
   * //      tokens: [{ compile: [Function] }],
   * //      blocks: {}
   * //    }
   * tpl({ tacos: 'Tacos!!!!' });
   * // => Tacos!!!!
   *
   * When compiling a source string, a file path should be specified in the options object in order for <var>extends</var>, <var>include</var>, and <var>import</var> to work properly. Do this by adding <code data-language="js">{ filename: '/absolute/path/to/mytpl.html' }</code> to the options argument.
   *
   * @param  {string} source    Swig template source string.
   * @param  {SwigOpts} [options={}] Swig options object.
   * @return {function}         Renderable function with keys for parent, blocks, and tokens.
   */
  this.compile = function (source, options) {
    var key = options ? options.filename : null,
      cached = key ? cacheGet(key, options) : null,
      context,
      contextLength,
      pre;

    if (cached) {
      return cached;
    }

    context = getLocals(options);
    contextLength = utils.keys(context).length;
    pre = this.precompile(source, options);

    function compiled(locals) {
      var lcls;
      if (locals && contextLength) {
        lcls = utils.extend({}, context, locals);
      } else if (locals && !contextLength) {
        lcls = locals;
      } else if (!locals && contextLength) {
        lcls = context;
      } else {
        lcls = {};
      }
      return pre.tpl(self, lcls, filters, utils, efn);
    }

    utils.extend(compiled, pre.tokens);

    if (key) {
      cacheSet(key, options, compiled);
    }

    return compiled;
  };

  /**
   * Compile a source file into a renderable template function.
   *
   * @example
   * var tpl = swig.compileFile('./mytpl.html');
   * // => {
   * //      [Function: compiled]
   * //      parent: null,
   * //      tokens: [{ compile: [Function] }],
   * //      blocks: {}
   * //    }
   * tpl({ tacos: 'Tacos!!!!' });
   * // => Tacos!!!!
   *
   * @example
   * swig.compileFile('/myfile.txt', { varControls: ['<%=', '=%>'], tagControls: ['<%', '%>']});
   * // => will compile 'myfile.txt' using the var and tag controls as specified.
   *
   * @param  {string} pathname  File location.
   * @param  {SwigOpts} [options={}] Swig options object.
   * @param  {Function} [cb] Asyncronous callback function. If not provided, <var>compileFile</var> will run syncronously.
   * @return {function}         Renderable function with keys for parent, blocks, and tokens.
   */
  this.compileFile = function (pathname, options, cb) {
    var src, cached;

    if (!options) {
      options = {};
    }

    pathname = self.options.loader.resolve(pathname, options.resolveFrom);
    if (!options.filename) {
      options = utils.extend({ filename: pathname }, options);
    }
    cached = cacheGet(pathname, options);

    if (cached) {
      if (cb) {
        cb(null, cached);
        return;
      }
      return cached;
    }

    if (cb) {
      self.options.loader.load(pathname, function (err, src) {
        if (err) {
          cb(err);
          return;
        }
        var compiled;

        try {
          compiled = self.compile(src, options);
        } catch (err2) {
          cb(err2);
          return;
        }

        cb(err, compiled);
      });
      return;
    }

    src = self.options.loader.load(pathname);
    return self.compile(src, options);
  };

  /**
   * Run a pre-compiled template function. This is most useful in the browser when you've pre-compiled your templates with the Swig command-line tool.
   *
   * @example
   * $ swig compile ./mytpl.html --wrap-start="var mytpl = " > mytpl.js
   * @example
   * <script src="mytpl.js"></script>
   * <script>
   *   swig.run(mytpl, {});
   *   // => "rendered template..."
   * </script>
   *
   * @param  {function} tpl       Pre-compiled Swig template function. Use the Swig CLI to compile your templates.
   * @param  {object} [locals={}] Template variable context.
   * @param  {string} [filepath]  Filename used for caching the template.
   * @return {string}             Rendered output.
   */
  this.run = function (tpl, locals, filepath) {
    var context = getLocals({ locals: locals });
    if (filepath) {
      cacheSet(filepath, {}, tpl);
    }
    return tpl(self, context, filters, utils, efn);
  };
};

/*!
 * Export methods publicly
 */
defaultInstance = new exports.Swig();
exports.setFilter = defaultInstance.setFilter;
exports.setTag = defaultInstance.setTag;
exports.setExtension = defaultInstance.setExtension;
exports.parseFile = defaultInstance.parseFile;
exports.precompile = defaultInstance.precompile;
exports.compile = defaultInstance.compile;
exports.compileFile = defaultInstance.compileFile;
exports.render = defaultInstance.render;
exports.renderFile = defaultInstance.renderFile;
exports.run = defaultInstance.run;
exports.invalidateCache = defaultInstance.invalidateCache;
exports.loaders = loaders;

},{"./dateformatter":2,"./filters":3,"./loaders":6,"./parser":8,"./tags":20,"./utils":26}],10:[function(require,module,exports){
var utils = require('../utils'),
  strings = ['html', 'js'];

/**
 * Control auto-escaping of variable output from within your templates.
 *
 * @alias autoescape
 *
 * @example
 * // myvar = '<foo>';
 * {% autoescape true %}{{ myvar }}{% endautoescape %}
 * // => &lt;foo&gt;
 * {% autoescape false %}{{ myvar }}{% endautoescape %}
 * // => <foo>
 *
 * @param {boolean|string} control One of `true`, `false`, `"js"` or `"html"`.
 */
exports.compile = function (compiler, args, content, parents, options, blockName) {
  return compiler(content, parents, options, blockName);
};
exports.parse = function (str, line, parser, types, stack, opts) {
  var matched;
  parser.on('*', function (token) {
    if (!matched &&
        (token.type === types.BOOL ||
          (token.type === types.STRING && strings.indexOf(token.match) === -1))
        ) {
      this.out.push(token.match);
      matched = true;
      return;
    }
    utils.throwError('Unexpected token "' + token.match + '" in autoescape tag', line, opts.filename);
  });

  return true;
};
exports.ends = true;

},{"../utils":26}],11:[function(require,module,exports){
/**
 * Defines a block in a template that can be overridden by a template extending this one and/or will override the current template's parent template block of the same name.
 *
 * See <a href="#inheritance">Template Inheritance</a> for more information.
 *
 * @alias block
 *
 * @example
 * {% block body %}...{% endblock %}
 *
 * @param {literal}  name   Name of the block for use in parent and extended templates.
 */
exports.compile = function (compiler, args, content, parents, options) {
  return compiler(content, parents, options, args.join(''));
};

exports.parse = function (str, line, parser) {
  parser.on('*', function (token) {
    this.out.push(token.match);
  });
  return true;
};

exports.ends = true;
exports.block = true;

},{}],12:[function(require,module,exports){
/**
 * Used within an <code data-language="swig">{% if %}</code> tag, the code block following this tag up until <code data-language="swig">{% endif %}</code> will be rendered if the <i>if</i> statement returns false.
 *
 * @alias else
 *
 * @example
 * {% if false %}
 *   statement1
 * {% else %}
 *   statement2
 * {% endif %}
 * // => statement2
 *
 */
exports.compile = function () {
  return '} else {\n';
};

exports.parse = function (str, line, parser, types, stack) {
  parser.on('*', function (token) {
    throw new Error('"else" tag does not accept any tokens. Found "' + token.match + '" on line ' + line + '.');
  });

  return (stack.length && stack[stack.length - 1].name === 'if');
};

},{}],13:[function(require,module,exports){
var ifparser = require('./if').parse;

/**
 * Like <code data-language="swig">{% else %}</code>, except this tag can take more conditional statements.
 *
 * @alias elseif
 * @alias elif
 *
 * @example
 * {% if false %}
 *   Tacos
 * {% elseif true %}
 *   Burritos
 * {% else %}
 *   Churros
 * {% endif %}
 * // => Burritos
 *
 * @param {...mixed} conditional  Conditional statement that returns a truthy or falsy value.
 */
exports.compile = function (compiler, args) {
  return '} else if (' + args.join(' ') + ') {\n';
};

exports.parse = function (str, line, parser, types, stack) {
  var okay = ifparser(str, line, parser, types, stack);
  return okay && (stack.length && stack[stack.length - 1].name === 'if');
};

},{"./if":17}],14:[function(require,module,exports){
/**
 * Makes the current template extend a parent template. This tag must be the first item in your template.
 *
 * See <a href="#inheritance">Template Inheritance</a> for more information.
 *
 * @alias extends
 *
 * @example
 * {% extends "./layout.html" %}
 *
 * @param {string} parentFile  Relative path to the file that this template extends.
 */
exports.compile = function () {};

exports.parse = function () {
  return true;
};

exports.ends = false;

},{}],15:[function(require,module,exports){
var filters = require('../filters');

/**
 * Apply a filter to an entire block of template.
 *
 * @alias filter
 *
 * @example
 * {% filter uppercase %}oh hi, {{ name }}{% endfilter %}
 * // => OH HI, PAUL
 *
 * @example
 * {% filter replace(".", "!", "g") %}Hi. My name is Paul.{% endfilter %}
 * // => Hi! My name is Paul!
 *
 * @param {function} filter  The filter that should be applied to the contents of the tag.
 */

exports.compile = function (compiler, args, content, parents, options, blockName) {
  var filter = args.shift().replace(/\($/, ''),
    val = '(function () {\n' +
      '  var _output = "";\n' +
      compiler(content, parents, options, blockName) +
      '  return _output;\n' +
      '})()';

  if (args[args.length - 1] === ')') {
    args.pop();
  }

  args = (args.length) ? ', ' + args.join('') : '';
  return '_output += _filters["' + filter + '"](' + val + args + ');\n';
};

exports.parse = function (str, line, parser, types) {
  var filter;

  function check(filter) {
    if (!filters.hasOwnProperty(filter)) {
      throw new Error('Filter "' + filter + '" does not exist on line ' + line + '.');
    }
  }

  parser.on(types.FUNCTION, function (token) {
    if (!filter) {
      filter = token.match.replace(/\($/, '');
      check(filter);
      this.out.push(token.match);
      this.state.push(token.type);
      return;
    }
    return true;
  });

  parser.on(types.VAR, function (token) {
    if (!filter) {
      filter = token.match;
      check(filter);
      this.out.push(filter);
      return;
    }
    return true;
  });

  return true;
};

exports.ends = true;

},{"../filters":3}],16:[function(require,module,exports){
var ctx = '_ctx.',
  ctxloop = ctx + 'loop';

/**
 * Loop over objects and arrays.
 *
 * @alias for
 *
 * @example
 * // obj = { one: 'hi', two: 'bye' };
 * {% for x in obj %}
 *   {% if loop.first %}<ul>{% endif %}
 *   <li>{{ loop.index }} - {{ loop.key }}: {{ x }}</li>
 *   {% if loop.last %}</ul>{% endif %}
 * {% endfor %}
 * // => <ul>
 * //    <li>1 - one: hi</li>
 * //    <li>2 - two: bye</li>
 * //    </ul>
 *
 * @example
 * // arr = [1, 2, 3]
 * // Reverse the array, shortcut the key/index to `key`
 * {% for key, val in arr|reverse %}
 * {{ key }} -- {{ val }}
 * {% endfor %}
 * // => 0 -- 3
 * //    1 -- 2
 * //    2 -- 1
 *
 * @param {literal} [key]     A shortcut to the index of the array or current key accessor.
 * @param {literal} variable  The current value will be assigned to this variable name temporarily. The variable will be reset upon ending the for tag.
 * @param {literal} in        Literally, "in". This token is required.
 * @param {object}  object    An enumerable object that will be iterated over.
 *
 * @return {loop.index} The current iteration of the loop (1-indexed)
 * @return {loop.index0} The current iteration of the loop (0-indexed)
 * @return {loop.revindex} The number of iterations from the end of the loop (1-indexed)
 * @return {loop.revindex0} The number of iterations from the end of the loop (0-indexed)
 * @return {loop.key} If the iterator is an object, this will be the key of the current item, otherwise it will be the same as the loop.index.
 * @return {loop.first} True if the current object is the first in the object or array.
 * @return {loop.last} True if the current object is the last in the object or array.
 */
exports.compile = function (compiler, args, content, parents, options, blockName) {
  var val = args.shift(),
    key = '__k',
    ctxloopcache = (ctx + '__loopcache' + Math.random()).replace(/\./g, ''),
    last;

  if (args[0] && args[0] === ',') {
    args.shift();
    key = val;
    val = args.shift();
  }

  last = args.join('');

  return [
    '(function () {\n',
    '  var __l = ' + last + ', __len = (_utils.isArray(__l) || typeof __l === "string") ? __l.length : _utils.keys(__l).length;\n',
    '  if (!__l) { return; }\n',
    '    var ' + ctxloopcache + ' = { loop: ' + ctxloop + ', ' + val + ': ' + ctx + val + ', ' + key + ': ' + ctx + key + ' };\n',
    '    ' + ctxloop + ' = { first: false, index: 1, index0: 0, revindex: __len, revindex0: __len - 1, length: __len, last: false };\n',
    '  _utils.each(__l, function (' + val + ', ' + key + ') {\n',
    '    ' + ctx + val + ' = ' + val + ';\n',
    '    ' + ctx + key + ' = ' + key + ';\n',
    '    ' + ctxloop + '.key = ' + key + ';\n',
    '    ' + ctxloop + '.first = (' + ctxloop + '.index0 === 0);\n',
    '    ' + ctxloop + '.last = (' + ctxloop + '.revindex0 === 0);\n',
    '    ' + compiler(content, parents, options, blockName),
    '    ' + ctxloop + '.index += 1; ' + ctxloop + '.index0 += 1; ' + ctxloop + '.revindex -= 1; ' + ctxloop + '.revindex0 -= 1;\n',
    '  });\n',
    '  ' + ctxloop + ' = ' + ctxloopcache + '.loop;\n',
    '  ' + ctx + val + ' = ' + ctxloopcache + '.' + val + ';\n',
    '  ' + ctx + key + ' = ' + ctxloopcache + '.' + key + ';\n',
    '  ' + ctxloopcache + ' = undefined;\n',
    '})();\n'
  ].join('');
};

exports.parse = function (str, line, parser, types) {
  var firstVar, ready;

  parser.on(types.NUMBER, function (token) {
    var lastState = this.state.length ? this.state[this.state.length - 1] : null;
    if (!ready ||
        (lastState !== types.ARRAYOPEN &&
          lastState !== types.CURLYOPEN &&
          lastState !== types.CURLYCLOSE &&
          lastState !== types.FUNCTION &&
          lastState !== types.FILTER)
        ) {
      throw new Error('Unexpected number "' + token.match + '" on line ' + line + '.');
    }
    return true;
  });

  parser.on(types.VAR, function (token) {
    if (ready && firstVar) {
      return true;
    }

    if (!this.out.length) {
      firstVar = true;
    }

    this.out.push(token.match);
  });

  parser.on(types.COMMA, function (token) {
    if (firstVar && this.prevToken.type === types.VAR) {
      this.out.push(token.match);
      return;
    }

    return true;
  });

  parser.on(types.COMPARATOR, function (token) {
    if (token.match !== 'in' || !firstVar) {
      throw new Error('Unexpected token "' + token.match + '" on line ' + line + '.');
    }
    ready = true;
    this.filterApplyIdx.push(this.out.length);
  });

  return true;
};

exports.ends = true;

},{}],17:[function(require,module,exports){
/**
 * Used to create conditional statements in templates. Accepts most JavaScript valid comparisons.
 *
 * Can be used in conjunction with <a href="#elseif"><code data-language="swig">{% elseif ... %}</code></a> and <a href="#else"><code data-language="swig">{% else %}</code></a> tags.
 *
 * @alias if
 *
 * @example
 * {% if x %}{% endif %}
 * {% if !x %}{% endif %}
 * {% if not x %}{% endif %}
 *
 * @example
 * {% if x and y %}{% endif %}
 * {% if x && y %}{% endif %}
 * {% if x or y %}{% endif %}
 * {% if x || y %}{% endif %}
 * {% if x || (y && z) %}{% endif %}
 *
 * @example
 * {% if x [operator] y %}
 *   Operators: ==, !=, <, <=, >, >=, ===, !==
 * {% endif %}
 *
 * @example
 * {% if x == 'five' %}
 *   The operands can be also be string or number literals
 * {% endif %}
 *
 * @example
 * {% if x|lower === 'tacos' %}
 *   You can use filters on any operand in the statement.
 * {% endif %}
 *
 * @example
 * {% if x in y %}
 *   If x is a value that is present in y, this will return true.
 * {% endif %}
 *
 * @param {...mixed} conditional Conditional statement that returns a truthy or falsy value.
 */
exports.compile = function (compiler, args, content, parents, options, blockName) {
  return 'if (' + args.join(' ') + ') { \n' +
    compiler(content, parents, options, blockName) + '\n' +
    '}';
};

exports.parse = function (str, line, parser, types) {
  if (typeof str === "undefined") {
    throw new Error('No conditional statement provided on line ' + line + '.');
  }

  parser.on(types.COMPARATOR, function (token) {
    if (this.isLast) {
      throw new Error('Unexpected logic "' + token.match + '" on line ' + line + '.');
    }
    if (this.prevToken.type === types.NOT) {
      throw new Error('Attempted logic "not ' + token.match + '" on line ' + line + '. Use !(foo ' + token.match + ') instead.');
    }
    this.out.push(token.match);
    this.filterApplyIdx.push(this.out.length);
  });

  parser.on(types.NOT, function (token) {
    if (this.isLast) {
      throw new Error('Unexpected logic "' + token.match + '" on line ' + line + '.');
    }
    this.out.push(token.match);
  });

  parser.on(types.BOOL, function (token) {
    this.out.push(token.match);
  });

  parser.on(types.LOGIC, function (token) {
    if (!this.out.length || this.isLast) {
      throw new Error('Unexpected logic "' + token.match + '" on line ' + line + '.');
    }
    this.out.push(token.match);
    this.filterApplyIdx.pop();
  });

  return true;
};

exports.ends = true;

},{}],18:[function(require,module,exports){
var utils = require('../utils');

/**
 * Allows you to import macros from another file directly into your current context.
 * The import tag is specifically designed for importing macros into your template with a specific context scope. This is very useful for keeping your macros from overriding template context that is being injected by your server-side page generation.
 *
 * @alias import
 *
 * @example
 * {% import './formmacros.html' as forms %}
 * {{ form.input("text", "name") }}
 * // => <input type="text" name="name">
 *
 * @example
 * {% import "../shared/tags.html" as tags %}
 * {{ tags.stylesheet('global') }}
 * // => <link rel="stylesheet" href="/global.css">
 *
 * @param {string|var}  file      Relative path from the current template file to the file to import macros from.
 * @param {literal}     as        Literally, "as".
 * @param {literal}     varname   Local-accessible object name to assign the macros to.
 */
exports.compile = function (compiler, args) {
  var ctx = args.pop(),
    out = '_ctx.' + ctx + ' = {};\n  var _output = "";\n',
    replacements = utils.map(args, function (arg) {
      return {
        ex: new RegExp('_ctx.' + arg.name, 'g'),
        re: '_ctx.' + ctx + '.' + arg.name
      };
    });

  // Replace all occurrences of all macros in this file with
  // proper namespaced definitions and calls
  utils.each(args, function (arg) {
    var c = arg.compiled;
    utils.each(replacements, function (re) {
      c = c.replace(re.ex, re.re);
    });
    out += c;
  });

  return out;
};

exports.parse = function (str, line, parser, types, stack, opts, swig) {
  var compiler = require('../parser').compile,
    parseOpts = { resolveFrom: opts.filename },
    compileOpts = utils.extend({}, opts, parseOpts),
    tokens,
    ctx;

  parser.on(types.STRING, function (token) {
    var self = this;
    if (!tokens) {
      tokens = swig.parseFile(token.match.replace(/^("|')|("|')$/g, ''), parseOpts).tokens;
      utils.each(tokens, function (token) {
        var out = '',
          macroName;
        if (!token || token.name !== 'macro' || !token.compile) {
          return;
        }
        macroName = token.args[0];
        out += token.compile(compiler, token.args, token.content, [], compileOpts) + '\n';
        self.out.push({compiled: out, name: macroName});
      });
      return;
    }

    throw new Error('Unexpected string ' + token.match + ' on line ' + line + '.');
  });

  parser.on(types.VAR, function (token) {
    var self = this;
    if (!tokens || ctx) {
      throw new Error('Unexpected variable "' + token.match + '" on line ' + line + '.');
    }

    if (token.match === 'as') {
      return;
    }

    ctx = token.match;
    self.out.push(ctx);
    return false;
  });

  return true;
};

exports.block = true;

},{"../parser":8,"../utils":26}],19:[function(require,module,exports){
var ignore = 'ignore',
  missing = 'missing',
  only = 'only';

/**
 * Includes a template partial in place. The template is rendered within the current locals variable context.
 *
 * @alias include
 *
 * @example
 * // food = 'burritos';
 * // drink = 'lemonade';
 * {% include "./partial.html" %}
 * // => I like burritos and lemonade.
 *
 * @example
 * // my_obj = { food: 'tacos', drink: 'horchata' };
 * {% include "./partial.html" with my_obj only %}
 * // => I like tacos and horchata.
 *
 * @example
 * {% include "/this/file/does/not/exist" ignore missing %}
 * // => (Nothing! empty string)
 *
 * @param {string|var}  file      The path, relative to the template root, to render into the current context.
 * @param {literal}     [with]    Literally, "with".
 * @param {object}      [context] Local variable key-value object context to provide to the included file.
 * @param {literal}     [only]    Restricts to <strong>only</strong> passing the <code>with context</code> as local variables–the included template will not be aware of any other local variables in the parent template. For best performance, usage of this option is recommended if possible.
 * @param {literal}     [ignore missing] Will output empty string if not found instead of throwing an error.
 */
exports.compile = function (compiler, args) {
  var file = args.shift(),
    onlyIdx = args.indexOf(only),
    onlyCtx = onlyIdx !== -1 ? args.splice(onlyIdx, 1) : false,
    parentFile = (args.pop() || '').replace(/\\/g, '\\\\'),
    ignore = args[args.length - 1] === missing ? (args.pop()) : false,
    w = args.join('');

  return (ignore ? '  try {\n' : '') +
    '_output += _swig.compileFile(' + file + ', {' +
    'resolveFrom: "' + parentFile + '"' +
    '})(' +
    ((onlyCtx && w) ? w : (!w ? '_ctx' : '_utils.extend({}, _ctx, ' + w + ')')) +
    ');\n' +
    (ignore ? '} catch (e) {}\n' : '');
};

exports.parse = function (str, line, parser, types, stack, opts) {
  var file, w;
  parser.on(types.STRING, function (token) {
    if (!file) {
      file = token.match;
      this.out.push(file);
      return;
    }

    return true;
  });

  parser.on(types.VAR, function (token) {
    if (!file) {
      file = token.match;
      return true;
    }

    if (!w && token.match === 'with') {
      w = true;
      return;
    }

    if (w && token.match === only && this.prevToken.match !== 'with') {
      this.out.push(token.match);
      return;
    }

    if (token.match === ignore) {
      return false;
    }

    if (token.match === missing) {
      if (this.prevToken.match !== ignore) {
        throw new Error('Unexpected token "' + missing + '" on line ' + line + '.');
      }
      this.out.push(token.match);
      return false;
    }

    if (this.prevToken.match === ignore) {
      throw new Error('Expected "' + missing + '" on line ' + line + ' but found "' + token.match + '".');
    }

    return true;
  });

  parser.on('end', function () {
    this.out.push(opts.filename || null);
  });

  return true;
};

},{}],20:[function(require,module,exports){
exports.autoescape = require('./autoescape');
exports.block = require('./block');
exports["else"] = require('./else');
exports.elseif = require('./elseif');
exports.elif = exports.elseif;
exports["extends"] = require('./extends');
exports.filter = require('./filter');
exports["for"] = require('./for');
exports["if"] = require('./if');
exports["import"] = require('./import');
exports.include = require('./include');
exports.macro = require('./macro');
exports.parent = require('./parent');
exports.raw = require('./raw');
exports.set = require('./set');
exports.spaceless = require('./spaceless');

},{"./autoescape":10,"./block":11,"./else":12,"./elseif":13,"./extends":14,"./filter":15,"./for":16,"./if":17,"./import":18,"./include":19,"./macro":21,"./parent":22,"./raw":23,"./set":24,"./spaceless":25}],21:[function(require,module,exports){
/**
 * Create custom, reusable snippets within your templates.
 * Can be imported from one template to another using the <a href="#import"><code data-language="swig">{% import ... %}</code></a> tag.
 *
 * @alias macro
 *
 * @example
 * {% macro input(type, name, id, label, value, error) %}
 *   <label for="{{ name }}">{{ label }}</label>
 *   <input type="{{ type }}" name="{{ name }}" id="{{ id }}" value="{{ value }}"{% if error %} class="error"{% endif %}>
 * {% endmacro %}
 *
 * {{ input("text", "fname", "fname", "First Name", fname.value, fname.errors) }}
 * // => <label for="fname">First Name</label>
 * //    <input type="text" name="fname" id="fname" value="">
 *
 * @param {...arguments} arguments  User-defined arguments.
 */
exports.compile = function (compiler, args, content, parents, options, blockName) {
  var fnName = args.shift();

  return '_ctx.' + fnName + ' = function (' + args.join('') + ') {\n' +
    '  var _output = "",\n' +
    '    __ctx = _utils.extend({}, _ctx);\n' +
    '  _utils.each(_ctx, function (v, k) {\n' +
    '    if (["' + args.join('","') + '"].indexOf(k) !== -1) { delete _ctx[k]; }\n' +
    '  });\n' +
    compiler(content, parents, options, blockName) + '\n' +
    ' _ctx = _utils.extend(_ctx, __ctx);\n' +
    '  return _output;\n' +
    '};\n' +
    '_ctx.' + fnName + '.safe = true;\n';
};

exports.parse = function (str, line, parser, types) {
  var name;

  parser.on(types.VAR, function (token) {
    if (token.match.indexOf('.') !== -1) {
      throw new Error('Unexpected dot in macro argument "' + token.match + '" on line ' + line + '.');
    }
    this.out.push(token.match);
  });

  parser.on(types.FUNCTION, function (token) {
    if (!name) {
      name = token.match;
      this.out.push(name);
      this.state.push(types.FUNCTION);
    }
  });

  parser.on(types.FUNCTIONEMPTY, function (token) {
    if (!name) {
      name = token.match;
      this.out.push(name);
    }
  });

  parser.on(types.PARENCLOSE, function () {
    if (this.isLast) {
      return;
    }
    throw new Error('Unexpected parenthesis close on line ' + line + '.');
  });

  parser.on(types.COMMA, function () {
    return true;
  });

  parser.on('*', function () {
    return;
  });

  return true;
};

exports.ends = true;
exports.block = true;

},{}],22:[function(require,module,exports){
/**
 * Inject the content from the parent template's block of the same name into the current block.
 *
 * See <a href="#inheritance">Template Inheritance</a> for more information.
 *
 * @alias parent
 *
 * @example
 * {% extends "./foo.html" %}
 * {% block content %}
 *   My content.
 *   {% parent %}
 * {% endblock %}
 *
 */
exports.compile = function (compiler, args, content, parents, options, blockName) {
  if (!parents || !parents.length) {
    return '';
  }

  var parentFile = args[0],
    breaker = true,
    l = parents.length,
    i = 0,
    parent,
    block;

  for (i; i < l; i += 1) {
    parent = parents[i];
    if (!parent.blocks || !parent.blocks.hasOwnProperty(blockName)) {
      continue;
    }
    // Silly JSLint "Strange Loop" requires return to be in a conditional
    if (breaker && parentFile !== parent.name) {
      block = parent.blocks[blockName];
      return block.compile(compiler, [blockName], block.content, parents.slice(i + 1), options) + '\n';
    }
  }
};

exports.parse = function (str, line, parser, types, stack, opts) {
  parser.on('*', function (token) {
    throw new Error('Unexpected argument "' + token.match + '" on line ' + line + '.');
  });

  parser.on('end', function () {
    this.out.push(opts.filename);
  });

  return true;
};

},{}],23:[function(require,module,exports){
// Magic tag, hardcoded into parser

/**
 * Forces the content to not be auto-escaped. All swig instructions will be ignored and the content will be rendered exactly as it was given.
 *
 * @alias raw
 *
 * @example
 * // foobar = '<p>'
 * {% raw %}{{ foobar }}{% endraw %}
 * // => {{ foobar }}
 *
 */
exports.compile = function (compiler, args, content, parents, options, blockName) {
  return compiler(content, parents, options, blockName);
};
exports.parse = function (str, line, parser) {
  parser.on('*', function (token) {
    throw new Error('Unexpected token "' + token.match + '" in raw tag on line ' + line + '.');
  });
  return true;
};
exports.ends = true;

},{}],24:[function(require,module,exports){
/**
 * Set a variable for re-use in the current context. This will over-write any value already set to the context for the given <var>varname</var>.
 *
 * @alias set
 *
 * @example
 * {% set foo = "anything!" %}
 * {{ foo }}
 * // => anything!
 *
 * @example
 * // index = 2;
 * {% set bar = 1 %}
 * {% set bar += index|default(3) %}
 * // => 3
 *
 * @example
 * // foods = {};
 * // food = 'chili';
 * {% set foods[food] = "con queso" %}
 * {{ foods.chili }}
 * // => con queso
 *
 * @example
 * // foods = { chili: 'chili con queso' }
 * {% set foods.chili = "guatamalan insanity pepper" %}
 * {{ foods.chili }}
 * // => guatamalan insanity pepper
 *
 * @param {literal} varname   The variable name to assign the value to.
 * @param {literal} assignement   Any valid JavaScript assignement. <code data-language="js">=, +=, *=, /=, -=</code>
 * @param {*}   value     Valid variable output.
 */
exports.compile = function (compiler, args) {
  return args.join(' ') + ';\n';
};

exports.parse = function (str, line, parser, types) {
  var nameSet = '',
    propertyName;

  parser.on(types.VAR, function (token) {
    if (propertyName) {
      // Tell the parser where to find the variable
      propertyName += '_ctx.' + token.match;
      return;
    }

    if (!parser.out.length) {
      nameSet += token.match;
      return;
    }

    return true;
  });

  parser.on(types.BRACKETOPEN, function (token) {
    if (!propertyName && !this.out.length) {
      propertyName = token.match;
      return;
    }

    return true;
  });

  parser.on(types.STRING, function (token) {
    if (propertyName && !this.out.length) {
      propertyName += token.match;
      return;
    }

    return true;
  });

  parser.on(types.BRACKETCLOSE, function (token) {
    if (propertyName && !this.out.length) {
      nameSet += propertyName + token.match;
      propertyName = undefined;
      return;
    }

    return true;
  });

  parser.on(types.DOTKEY, function (token) {
    if (!propertyName && !nameSet) {
      return true;
    }
    nameSet += '.' + token.match;
    return;
  });

  parser.on(types.ASSIGNMENT, function (token) {
    if (this.out.length || !nameSet) {
      throw new Error('Unexpected assignment "' + token.match + '" on line ' + line + '.');
    }

    this.out.push(
      // Prevent the set from spilling into global scope
      '_ctx.' + nameSet
    );
    this.out.push(token.match);
    this.filterApplyIdx.push(this.out.length);
  });

  return true;
};

exports.block = true;

},{}],25:[function(require,module,exports){
var utils = require('../utils');

/**
 * Attempts to remove whitespace between HTML tags. Use at your own risk.
 *
 * @alias spaceless
 *
 * @example
 * {% spaceless %}
 *   {% for num in foo %}
 *   <li>{{ loop.index }}</li>
 *   {% endfor %}
 * {% endspaceless %}
 * // => <li>1</li><li>2</li><li>3</li>
 *
 */
exports.compile = function (compiler, args, content, parents, options, blockName) {
  function stripWhitespace(tokens) {
    return utils.map(tokens, function (token) {
      if (token.content || typeof token !== 'string') {
        token.content = stripWhitespace(token.content);
        return token;
      }

      return token.replace(/^\s+/, '')
        .replace(/>\s+</g, '><')
        .replace(/\s+$/, '');
    });
  }

  return compiler(stripWhitespace(content), parents, options, blockName);
};

exports.parse = function (str, line, parser) {
  parser.on('*', function (token) {
    throw new Error('Unexpected token "' + token.match + '" on line ' + line + '.');
  });

  return true;
};

exports.ends = true;

},{"../utils":26}],26:[function(require,module,exports){
var isArray;

/**
 * Strip leading and trailing whitespace from a string.
 * @param  {string} input
 * @return {string}       Stripped input.
 */
exports.strip = function (input) {
  return input.replace(/^\s+|\s+$/g, '');
};

/**
 * Test if a string starts with a given prefix.
 * @param  {string} str    String to test against.
 * @param  {string} prefix Prefix to check for.
 * @return {boolean}
 */
exports.startsWith = function (str, prefix) {
  return str.indexOf(prefix) === 0;
};

/**
 * Test if a string ends with a given suffix.
 * @param  {string} str    String to test against.
 * @param  {string} suffix Suffix to check for.
 * @return {boolean}
 */
exports.endsWith = function (str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

/**
 * Iterate over an array or object.
 * @param  {array|object} obj Enumerable object.
 * @param  {Function}     fn  Callback function executed for each item.
 * @return {array|object}     The original input object.
 */
exports.each = function (obj, fn) {
  var i, l;

  if (isArray(obj)) {
    i = 0;
    l = obj.length;
    for (i; i < l; i += 1) {
      if (fn(obj[i], i, obj) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (fn(obj[i], i, obj) === false) {
          break;
        }
      }
    }
  }

  return obj;
};

/**
 * Test if an object is an Array.
 * @param {object} obj
 * @return {boolean}
 */
exports.isArray = isArray = (Array.hasOwnProperty('isArray')) ? Array.isArray : function (obj) {
  return (obj) ? (typeof obj === 'object' && Object.prototype.toString.call(obj).indexOf() !== -1) : false;
};

/**
 * Test if an item in an enumerable matches your conditions.
 * @param  {array|object}   obj   Enumerable object.
 * @param  {Function}       fn    Executed for each item. Return true if your condition is met.
 * @return {boolean}
 */
exports.some = function (obj, fn) {
  var i = 0,
    result,
    l;
  if (isArray(obj)) {
    l = obj.length;

    for (i; i < l; i += 1) {
      result = fn(obj[i], i, obj);
      if (result) {
        break;
      }
    }
  } else {
    exports.each(obj, function (value, index) {
      result = fn(value, index, obj);
      return !(result);
    });
  }
  return !!result;
};

/**
 * Return a new enumerable, mapped by a given iteration function.
 * @param  {object}   obj Enumerable object.
 * @param  {Function} fn  Executed for each item. Return the item to replace the original item with.
 * @return {object}       New mapped object.
 */
exports.map = function (obj, fn) {
  var i = 0,
    result = [],
    l;

  if (isArray(obj)) {
    l = obj.length;
    for (i; i < l; i += 1) {
      result[i] = fn(obj[i], i);
    }
  } else {
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[i] = fn(obj[i], i);
      }
    }
  }
  return result;
};

/**
 * Copy all of the properties in the source objects over to the destination object, and return the destination object. It's in-order, so the last source will override properties of the same name in previous arguments.
 * @param {...object} arguments
 * @return {object}
 */
exports.extend = function () {
  var args = arguments,
    target = args[0],
    objs = (args.length > 1) ? Array.prototype.slice.call(args, 1) : [],
    i = 0,
    l = objs.length,
    key,
    obj;

  for (i; i < l; i += 1) {
    obj = objs[i] || {};
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        target[key] = obj[key];
      }
    }
  }
  return target;
};

/**
 * Get all of the keys on an object.
 * @param  {object} obj
 * @return {array}
 */
exports.keys = function (obj) {
  if (!obj) {
    return [];
  }

  if (Object.keys) {
    return Object.keys(obj);
  }

  return exports.map(obj, function (v, k) {
    return k;
  });
};

/**
 * Throw an error with possible line number and source file.
 * @param  {string} message Error message
 * @param  {number} [line]  Line number in template.
 * @param  {string} [file]  Template file the error occured in.
 * @throws {Error} No seriously, the point is to throw an error.
 */
exports.throwError = function (message, line, file) {
  if (line) {
    message += ' on line ' + line;
  }
  if (file) {
    message += ' in file ' + file;
  }
  throw new Error(message + '.');
};

},{}],27:[function(require,module,exports){


//
// The shims in this file are not fully implemented shims for the ES5
// features, but do work for the particular usecases there is in
// the other modules.
//

var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

// Array.isArray is supported in IE9
function isArray(xs) {
  return toString.call(xs) === '[object Array]';
}
exports.isArray = typeof Array.isArray === 'function' ? Array.isArray : isArray;

// Array.prototype.indexOf is supported in IE9
exports.indexOf = function indexOf(xs, x) {
  if (xs.indexOf) return xs.indexOf(x);
  for (var i = 0; i < xs.length; i++) {
    if (x === xs[i]) return i;
  }
  return -1;
};

// Array.prototype.filter is supported in IE9
exports.filter = function filter(xs, fn) {
  if (xs.filter) return xs.filter(fn);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (fn(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
};

// Array.prototype.forEach is supported in IE9
exports.forEach = function forEach(xs, fn, self) {
  if (xs.forEach) return xs.forEach(fn, self);
  for (var i = 0; i < xs.length; i++) {
    fn.call(self, xs[i], i, xs);
  }
};

// Array.prototype.map is supported in IE9
exports.map = function map(xs, fn) {
  if (xs.map) return xs.map(fn);
  var out = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    out[i] = fn(xs[i], i, xs);
  }
  return out;
};

// Array.prototype.reduce is supported in IE9
exports.reduce = function reduce(array, callback, opt_initialValue) {
  if (array.reduce) return array.reduce(callback, opt_initialValue);
  var value, isValueSet = false;

  if (2 < arguments.length) {
    value = opt_initialValue;
    isValueSet = true;
  }
  for (var i = 0, l = array.length; l > i; ++i) {
    if (array.hasOwnProperty(i)) {
      if (isValueSet) {
        value = callback(value, array[i], i, array);
      }
      else {
        value = array[i];
        isValueSet = true;
      }
    }
  }

  return value;
};

// String.prototype.substr - negative index don't work in IE8
if ('ab'.substr(-1) !== 'b') {
  exports.substr = function (str, start, length) {
    // did we get a negative start, calculate how much it is from the beginning of the string
    if (start < 0) start = str.length + start;

    // call the original function
    return str.substr(start, length);
  };
} else {
  exports.substr = function (str, start, length) {
    return str.substr(start, length);
  };
}

// String.prototype.trim is supported in IE9
exports.trim = function (str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
};

// Function.prototype.bind is supported in IE9
exports.bind = function () {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.shift();
  if (fn.bind) return fn.bind.apply(fn, args);
  var self = args.shift();
  return function () {
    fn.apply(self, args.concat([Array.prototype.slice.call(arguments)]));
  };
};

// Object.create is supported in IE9
function create(prototype, properties) {
  var object;
  if (prototype === null) {
    object = { '__proto__' : null };
  }
  else {
    if (typeof prototype !== 'object') {
      throw new TypeError(
        'typeof prototype[' + (typeof prototype) + '] != \'object\''
      );
    }
    var Type = function () {};
    Type.prototype = prototype;
    object = new Type();
    object.__proto__ = prototype;
  }
  if (typeof properties !== 'undefined' && Object.defineProperties) {
    Object.defineProperties(object, properties);
  }
  return object;
}
exports.create = typeof Object.create === 'function' ? Object.create : create;

// Object.keys and Object.getOwnPropertyNames is supported in IE9 however
// they do show a description and number property on Error objects
function notObject(object) {
  return ((typeof object != "object" && typeof object != "function") || object === null);
}

function keysShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.keys called on a non-object");
  }

  var result = [];
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result.push(name);
    }
  }
  return result;
}

// getOwnPropertyNames is almost the same as Object.keys one key feature
//  is that it returns hidden properties, since that can't be implemented,
//  this feature gets reduced so it just shows the length property on arrays
function propertyShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.getOwnPropertyNames called on a non-object");
  }

  var result = keysShim(object);
  if (exports.isArray(object) && exports.indexOf(object, 'length') === -1) {
    result.push('length');
  }
  return result;
}

var keys = typeof Object.keys === 'function' ? Object.keys : keysShim;
var getOwnPropertyNames = typeof Object.getOwnPropertyNames === 'function' ?
  Object.getOwnPropertyNames : propertyShim;

if (new Error().hasOwnProperty('description')) {
  var ERROR_PROPERTY_FILTER = function (obj, array) {
    if (toString.call(obj) === '[object Error]') {
      array = exports.filter(array, function (name) {
        return name !== 'description' && name !== 'number' && name !== 'message';
      });
    }
    return array;
  };

  exports.keys = function (object) {
    return ERROR_PROPERTY_FILTER(object, keys(object));
  };
  exports.getOwnPropertyNames = function (object) {
    return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
  };
} else {
  exports.keys = keys;
  exports.getOwnPropertyNames = getOwnPropertyNames;
}

// Object.getOwnPropertyDescriptor - supported in IE8 but only on dom elements
function valueObject(value, key) {
  return { value: value[key] };
}

if (typeof Object.getOwnPropertyDescriptor === 'function') {
  try {
    Object.getOwnPropertyDescriptor({'a': 1}, 'a');
    exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  } catch (e) {
    // IE8 dom element issue - use a try catch and default to valueObject
    exports.getOwnPropertyDescriptor = function (value, key) {
      try {
        return Object.getOwnPropertyDescriptor(value, key);
      } catch (e) {
        return valueObject(value, key);
      }
    };
  }
} else {
  exports.getOwnPropertyDescriptor = valueObject;
}

},{}],28:[function(require,module,exports){

// not implemented
// The reason for having an empty file and not throwing is to allow
// untraditional implementation of this module.

},{}],29:[function(require,module,exports){
var process=require("__browserify_process");// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util');
var shims = require('_shims');

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(shims.filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = shims.substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(shims.filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(shims.filter(paths, function(p, index) {
    if (!util.isString(p)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

},{"__browserify_process":31,"_shims":27,"util":30}],30:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var shims = require('_shims');

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  shims.forEach(array, function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = shims.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = shims.getOwnPropertyNames(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  shims.forEach(keys, function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = shims.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (shims.indexOf(ctx.seen, desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = shims.reduce(output, function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return shims.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && objectToString(e) === '[object Error]';
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.binarySlice === 'function'
  ;
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = shims.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = shims.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

},{"_shims":27}],31:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[1])
;