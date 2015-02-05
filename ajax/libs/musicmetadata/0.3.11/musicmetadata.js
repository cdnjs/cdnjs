!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.musicmetadata=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = _dereq_('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":4}],3:[function(_dereq_,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],4:[function(_dereq_,module,exports){
(function (process,global){
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


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
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

  array.forEach(function(val, idx) {
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
    var ret = value.inspect(recurseTimes, ctx);
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
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
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
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
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
    if (ctx.seen.indexOf(desc.value) < 0) {
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
  var length = output.reduce(function(prev, cur) {
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
  return Array.isArray(ar);
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
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
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

exports.isBuffer = _dereq_('./support/isBuffer');

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
exports.inherits = _dereq_('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,_dereq_("/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":3,"/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":10,"inherits":9}],5:[function(_dereq_,module,exports){
/**
 * The buffer module from node.js, for the browser.
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install buffer`
 */

var base64 = _dereq_('base64-js')
var ieee754 = _dereq_('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":6,"ieee754":7}],6:[function(_dereq_,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var ZERO   = '0'.charCodeAt(0)
	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	module.exports.toByteArray = b64ToByteArray
	module.exports.fromByteArray = uint8ToBase64
}())

},{}],7:[function(_dereq_,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],8:[function(_dereq_,module,exports){
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

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      console.trace();
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],9:[function(_dereq_,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],10:[function(_dereq_,module,exports){
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

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],11:[function(_dereq_,module,exports){
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

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

module.exports = Duplex;
var inherits = _dereq_('inherits');
var setImmediate = _dereq_('process/browser.js').nextTick;
var Readable = _dereq_('./readable.js');
var Writable = _dereq_('./writable.js');

inherits(Duplex, Readable);

Duplex.prototype.write = Writable.prototype.write;
Duplex.prototype.end = Writable.prototype.end;
Duplex.prototype._write = Writable.prototype._write;

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  var self = this;
  setImmediate(function () {
    self.end();
  });
}

},{"./readable.js":15,"./writable.js":17,"inherits":9,"process/browser.js":13}],12:[function(_dereq_,module,exports){
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

module.exports = Stream;

var EE = _dereq_('events').EventEmitter;
var inherits = _dereq_('inherits');

inherits(Stream, EE);
Stream.Readable = _dereq_('./readable.js');
Stream.Writable = _dereq_('./writable.js');
Stream.Duplex = _dereq_('./duplex.js');
Stream.Transform = _dereq_('./transform.js');
Stream.PassThrough = _dereq_('./passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"./duplex.js":11,"./passthrough.js":14,"./readable.js":15,"./transform.js":16,"./writable.js":17,"events":8,"inherits":9}],13:[function(_dereq_,module,exports){
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

},{}],14:[function(_dereq_,module,exports){
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

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;

var Transform = _dereq_('./transform.js');
var inherits = _dereq_('inherits');
inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./transform.js":16,"inherits":9}],15:[function(_dereq_,module,exports){
(function (process){
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

module.exports = Readable;
Readable.ReadableState = ReadableState;

var EE = _dereq_('events').EventEmitter;
var Stream = _dereq_('./index.js');
var Buffer = _dereq_('buffer').Buffer;
var setImmediate = _dereq_('process/browser.js').nextTick;
var StringDecoder;

var inherits = _dereq_('inherits');
inherits(Readable, Stream);

function ReadableState(options, stream) {
  options = options || {};

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = false;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // In streams that never have any data, and do push(null) right away,
  // the consumer can miss the 'end' event if they do some I/O before
  // consuming the stream.  So, we don't emit('end') until some reading
  // happens.
  this.calledRead = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, becuase any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;


  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = _dereq_('string_decoder').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (typeof chunk === 'string' && !state.objectMode) {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null || chunk === undefined) {
    state.reading = false;
    if (!state.ended)
      onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      // update the buffer info.
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront) {
        state.buffer.unshift(chunk);
      } else {
        state.reading = false;
        state.buffer.push(chunk);
      }

      if (state.needReadable)
        emitReadable(stream);

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}



// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = _dereq_('string_decoder').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
};

// Don't raise the hwm > 128MB
var MAX_HWM = 0x800000;
function roundUpToNextPowerOf2(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
    n++;
  }
  return n;
}

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (isNaN(n) || n === null) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = roundUpToNextPowerOf2(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else
      return state.length;
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  var state = this._readableState;
  state.calledRead = true;
  var nOrig = n;

  if (typeof n !== 'number' || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;

  // if we currently have less than the highWaterMark, then also read some
  if (state.length - n <= state.highWaterMark)
    doRead = true;

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading)
    doRead = false;

  if (doRead) {
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read called its callback synchronously, then `reading`
  // will be false, and we need to re-evaluate how much data we
  // can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  var ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we happened to read() exactly the remaining amount in the
  // buffer, and the EOF has been seen at this point, then make sure
  // that we emit 'end' on the very next tick.
  if (state.ended && !state.endEmitted && state.length === 0)
    endReadable(this);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) &&
      'string' !== typeof chunk &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode &&
      !er) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}


function onEofChunk(stream, state) {
  if (state.decoder && !state.ended) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // if we've ended and we have some data left, then emit
  // 'readable' now to make sure it gets picked up.
  if (state.length > 0)
    emitReadable(stream);
  else
    endReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (state.emittedReadable)
    return;

  state.emittedReadable = true;
  if (state.sync)
    setImmediate(function() {
      emitReadable_(stream);
    });
  else
    emitReadable_(stream);
}

function emitReadable_(stream) {
  stream.emit('readable');
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    setImmediate(function() {
      maybeReadMore_(stream, state);
    });
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    setImmediate(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    if (readable !== src) return;
    cleanup();
  }

  function onend() {
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  function cleanup() {
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (!dest._writableState || dest._writableState.needDrain)
      ondrain();
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  // check for listeners before emit removes one-time listeners.
  var errListeners = EE.listenerCount(dest, 'error');
  function onerror(er) {
    unpipe();
    if (errListeners === 0 && EE.listenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  dest.once('error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    // the handler that waits for readable events after all
    // the data gets sucked out in flow.
    // This would be easier to follow with a .once() handler
    // in flow(), but that is too slow.
    this.on('readable', pipeOnReadable);

    state.flowing = true;
    setImmediate(function() {
      flow(src);
    });
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var dest = this;
    var state = src._readableState;
    state.awaitDrain--;
    if (state.awaitDrain === 0)
      flow(src);
  };
}

function flow(src) {
  var state = src._readableState;
  var chunk;
  state.awaitDrain = 0;

  function write(dest, i, list) {
    var written = dest.write(chunk);
    if (false === written) {
      state.awaitDrain++;
    }
  }

  while (state.pipesCount && null !== (chunk = src.read())) {

    if (state.pipesCount === 1)
      write(state.pipes, 0, null);
    else
      forEach(state.pipes, write);

    src.emit('data', chunk);

    // if anyone needs a drain, then we have to wait for that.
    if (state.awaitDrain > 0)
      return;
  }

  // if every destination was unpiped, either before entering this
  // function, or in the while loop, then stop flowing.
  //
  // NB: This is a pretty rare edge case.
  if (state.pipesCount === 0) {
    state.flowing = false;

    // if there were data event listeners added, then switch to old mode.
    if (EE.listenerCount(src, 'data') > 0)
      emitDataEvents(src);
    return;
  }

  // at this point, no one needed a drain, so we just ran out of data
  // on the next readable event, start it over again.
  state.ranOut = true;
}

function pipeOnReadable() {
  if (this._readableState.ranOut) {
    this._readableState.ranOut = false;
    flow(this);
  }
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    this.removeListener('readable', pipeOnReadable);
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    this.removeListener('readable', pipeOnReadable);
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data' && !this._readableState.flowing)
    emitDataEvents(this);

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        this.read(0);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  emitDataEvents(this);
  this.read(0);
  this.emit('resume');
};

Readable.prototype.pause = function() {
  emitDataEvents(this, true);
  this.emit('pause');
};

function emitDataEvents(stream, startPaused) {
  var state = stream._readableState;

  if (state.flowing) {
    // https://github.com/isaacs/readable-stream/issues/16
    throw new Error('Cannot switch to old mode now.');
  }

  var paused = startPaused || false;
  var readable = false;

  // convert to an old-style stream.
  stream.readable = true;
  stream.pipe = Stream.prototype.pipe;
  stream.on = stream.addListener = Stream.prototype.on;

  stream.on('readable', function() {
    readable = true;

    var c;
    while (!paused && (null !== (c = stream.read())))
      stream.emit('data', c);

    if (c === null) {
      readable = false;
      stream._readableState.needReadable = true;
    }
  });

  stream.pause = function() {
    paused = true;
    this.emit('pause');
  };

  stream.resume = function() {
    paused = false;
    if (readable)
      setImmediate(function() {
        stream.emit('readable');
      });
    else
      this.read(0);
    this.emit('resume');
  };

  // now make it start, just in case it hadn't already.
  stream.emit('readable');
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    if (state.decoder)
      chunk = state.decoder.write(chunk);
    if (!chunk || !state.objectMode && !chunk.length)
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (typeof stream[i] === 'function' &&
        typeof this[i] === 'undefined') {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }}(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, function (x) {
      return self.emit.apply(self, ev, x);
    });
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};



// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted && state.calledRead) {
    state.ended = true;
    setImmediate(function() {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    });
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,_dereq_("/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"./index.js":12,"/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":10,"buffer":5,"events":8,"inherits":9,"process/browser.js":13,"string_decoder":18}],16:[function(_dereq_,module,exports){
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

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;

var Duplex = _dereq_('./duplex.js');
var inherits = _dereq_('inherits');
inherits(Transform, Duplex);


function TransformState(options, stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined)
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  var ts = this._transformState = new TransformState(options, this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  this.once('finish', function() {
    if ('function' === typeof this._flush)
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (ts.writechunk && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var rs = stream._readableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./duplex.js":11,"inherits":9}],17:[function(_dereq_,module,exports){
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

// A bit simpler than readable streams.
// Implement an async ._write(chunk, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;
Writable.WritableState = WritableState;

var isUint8Array = typeof Uint8Array !== 'undefined'
  ? function (x) { return x instanceof Uint8Array }
  : function (x) {
    return x && x.constructor && x.constructor.name === 'Uint8Array'
  }
;
var isArrayBuffer = typeof ArrayBuffer !== 'undefined'
  ? function (x) { return x instanceof ArrayBuffer }
  : function (x) {
    return x && x.constructor && x.constructor.name === 'ArrayBuffer'
  }
;

var inherits = _dereq_('inherits');
var Stream = _dereq_('./index.js');
var setImmediate = _dereq_('process/browser.js').nextTick;
var Buffer = _dereq_('buffer').Buffer;

inherits(Writable, Stream);

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
}

function WritableState(options, stream) {
  options = options || {};

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, becuase any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.buffer = [];
}

function Writable(options) {
  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Stream.Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, state, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  setImmediate(function() {
    cb(er);
  });
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  if (!Buffer.isBuffer(chunk) &&
      'string' !== typeof chunk &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    setImmediate(function() {
      cb(er);
    });
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (!Buffer.isBuffer(chunk) && isUint8Array(chunk))
    chunk = new Buffer(chunk);
  if (isArrayBuffer(chunk) && typeof Uint8Array !== 'undefined')
    chunk = new Buffer(new Uint8Array(chunk));
  
  if (Buffer.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (typeof cb !== 'function')
    cb = function() {};

  if (state.ended)
    writeAfterEnd(this, state, cb);
  else if (validChunk(this, state, chunk, cb))
    ret = writeOrBuffer(this, state, chunk, encoding, cb);

  return ret;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      typeof chunk === 'string') {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  state.needDrain = !ret;

  if (state.writing)
    state.buffer.push(new WriteReq(chunk, encoding, cb));
  else
    doWrite(stream, state, len, chunk, encoding, cb);

  return ret;
}

function doWrite(stream, state, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  if (sync)
    setImmediate(function() {
      cb(er);
    });
  else
    cb(er);

  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(stream, state);

    if (!finished && !state.bufferProcessing && state.buffer.length)
      clearBuffer(stream, state);

    if (sync) {
      setImmediate(function() {
        afterWrite(stream, state, finished, cb);
      });
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  cb();
  if (finished)
    finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;

  for (var c = 0; c < state.buffer.length; c++) {
    var entry = state.buffer[c];
    var chunk = entry.chunk;
    var encoding = entry.encoding;
    var cb = entry.callback;
    var len = state.objectMode ? 1 : chunk.length;

    doWrite(stream, state, len, chunk, encoding, cb);

    // if we didn't call the onwrite immediately, then
    // it means that we need to wait until it does.
    // also, that means that the chunk and cb are currently
    // being processed, so move the buffer counter past them.
    if (state.writing) {
      c++;
      break;
    }
  }

  state.bufferProcessing = false;
  if (c < state.buffer.length)
    state.buffer = state.buffer.slice(c);
  else
    state.buffer.length = 0;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (typeof chunk !== 'undefined' && chunk !== null)
    this.write(chunk, encoding);

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(stream, state) {
  return (state.ending &&
          state.length === 0 &&
          !state.finished &&
          !state.writing);
}

function finishMaybe(stream, state) {
  var need = needFinish(stream, state);
  if (need) {
    state.finished = true;
    stream.emit('finish');
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      setImmediate(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

},{"./index.js":12,"buffer":5,"inherits":9,"process/browser.js":13}],18:[function(_dereq_,module,exports){
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

var Buffer = _dereq_('buffer').Buffer;

function assertEncoding(encoding) {
  if (encoding && !Buffer.isEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  this.charBuffer = new Buffer(6);
  this.charReceived = 0;
  this.charLength = 0;
};


StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  var offset = 0;

  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var i = (buffer.length >= this.charLength - this.charReceived) ?
                this.charLength - this.charReceived :
                buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, offset, i);
    this.charReceived += (i - offset);
    offset = i;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (i == buffer.length) return charStr;

    // otherwise cut off the characters end from the beginning of this buffer
    buffer = buffer.slice(i, buffer.length);
    break;
  }

  var lenIncomplete = this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - lenIncomplete, end);
    this.charReceived = lenIncomplete;
    end -= lenIncomplete;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    this.charBuffer.write(charStr.charAt(charStr.length - 1), this.encoding);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }

  return i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 2;
  this.charLength = incomplete ? 2 : 0;
  return incomplete;
}

function base64DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 3;
  this.charLength = incomplete ? 3 : 0;
  return incomplete;
}

},{"buffer":5}],19:[function(_dereq_,module,exports){
module.exports=_dereq_(3)
},{}],20:[function(_dereq_,module,exports){
module.exports=_dereq_(4)
},{"./support/isBuffer":19,"/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":10,"inherits":9}],21:[function(_dereq_,module,exports){
(function (Buffer){
var fs = _dereq_('fs');
var util = _dereq_('util');
var events = _dereq_('events');
var strtok = _dereq_('strtok2');
var common = _dereq_('./common');
var bufferEqual = _dereq_('buffer-equal');

module.exports = function (stream, callback, done) {
  var currentState = startState;

  strtok.parse(stream, function (v, cb) {
    currentState = currentState.parse(callback, v, done);
    return currentState.getExpectedType();
  })
};

var startState = {
  parse: function (callback) {
    return idState;
  },
}

var finishedState = {
  parse: function (callback) {
    return this;
  },
  getExpectedType: function () {
    return strtok.DONE;
  }
}

var idState = {
  parse: function (callback, data, done) {
    if (! bufferEqual(common.asfGuidBuf, data)) {
      done(new Error('expected asf header but was not found'));
      return finishedState;
    }
    return headerDataState;
  },
  getExpectedType: function () {
    return new strtok.BufferType(common.asfGuidBuf.length);
  }
};

function ReadObjectState(size, objectCount) {
  this.size = size;
  this.objectCount = objectCount;
}

ReadObjectState.prototype.parse = function(callback, data, done) {
  var guid = data.slice(0, 16);
  var size = common.readUInt64LE(data, 16);
  var State = stateByGuid(guid) || IgnoreObjectState;
  this.objectCount -= 1;
  this.size -= size;
  var nextState = (this.objectCount <= 0) ? finishedState : this;
  return new State(nextState, size - 24);
}

ReadObjectState.prototype.getExpectedType = function() {
  return new strtok.BufferType(24);
}

var headerDataState = {
  parse: function (callback, data, done) {
    var size = common.readUInt64LE(data, 0);
    var objectCount = data.readUInt32LE(8);
    return new ReadObjectState(size, objectCount);
  },
  getExpectedType: function () {
    // 8 bytes size
    // 4 bytes object count
    // 2 bytes ignore
    return new strtok.BufferType(14);
  }
};

function IgnoreObjectState(nextState, size) {
  this.nextState = nextState;
  this.size = size;
}

IgnoreObjectState.prototype.parse = function(callback, data, done) {
  if (this.nextState === finishedState) done();
  return this.nextState;
}

IgnoreObjectState.prototype.getExpectedType = function() {
  return new strtok.IgnoreType(this.size);
}

function ContentDescriptionObjectState(nextState, size) {
  this.nextState = nextState;
  this.size = size;
}

var contentDescTags = ['Title', 'Author', 'Copyright', 'Description', 'Rating'];
ContentDescriptionObjectState.prototype.parse = function(callback, data, done) {
  var lengths = [
    data.readUInt16LE(0),
    data.readUInt16LE(2),
    data.readUInt16LE(4),
    data.readUInt16LE(6),
    data.readUInt16LE(8),
  ];
  var pos = 10;
  for (var i = 0; i < contentDescTags.length; i += 1) {
    var tagName = contentDescTags[i];
    var length = lengths[i];
    var end = pos + length;
    if (length > 0) {
      var value = parseUnicodeAttr(data.slice(pos, end));
      callback(tagName, value);
    }
    pos = end;
  }
  if (this.nextState === finishedState) done();
  return this.nextState;
}

ContentDescriptionObjectState.prototype.getExpectedType = function() {
  return new strtok.BufferType(this.size);
}

ContentDescriptionObjectState.guid = new Buffer([
    0x33, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11,
    0xA6, 0xD9, 0x00, 0xAA, 0x00, 0x62, 0xCE, 0x6C
  ]);

function ExtendedContentDescriptionObjectState(nextState, size) {
  this.nextState = nextState;
  this.size = size;
}

var attributeParsers = [
  parseUnicodeAttr,
  parseByteArrayAttr,
  parseBoolAttr,
  parseDWordAttr,
  parseQWordAttr,
  parseWordAttr,
  parseByteArrayAttr,
];

ExtendedContentDescriptionObjectState.prototype.parse = function(callback, data, done) {
  var attrCount = data.readUInt16LE(0);
  var pos = 2;
  for (var i = 0; i < attrCount; i += 1) {
    var nameLen = data.readUInt16LE(pos);
    pos += 2;
    var name = parseUnicodeAttr(data.slice(pos, pos + nameLen));
    pos += nameLen;
    var valueType = data.readUInt16LE(pos);
    pos += 2;
    var valueLen = data.readUInt16LE(pos);
    pos += 2;
    var value = data.slice(pos, pos + valueLen);
    pos += valueLen;
    var parseAttr = attributeParsers[valueType];
    if (!parseAttr) {
      done(new Error('unexpected value type: ' + valueType));
      return finishedState;
    }
    var attr = parseAttr(value);
    callback(name, attr);
  }
  if (this.nextState === finishedState) done();
  return this.nextState;
}

ExtendedContentDescriptionObjectState.prototype.getExpectedType = function() {
  return new strtok.BufferType(this.size);
}

ExtendedContentDescriptionObjectState.guid = new Buffer([
    0x40, 0xA4, 0xD0, 0xD2, 0x07, 0xE3, 0xD2, 0x11,
    0x97, 0xF0, 0x00, 0xA0, 0xC9, 0x5E, 0xA8, 0x50
  ]);

var guidStates = [
  ContentDescriptionObjectState,
  ExtendedContentDescriptionObjectState,
];
function stateByGuid(guidBuf) {
  for (var i = 0; i < guidStates.length; i += 1) {
    var GuidState = guidStates[i];
    if (bufferEqual(GuidState.guid, guidBuf)) return GuidState;
  }
  return null;
}

function parseUnicodeAttr(buf) {
  return common.stripNulls(common.readUTF16String(buf));
}

function parseByteArrayAttr(buf) {
  var newBuf = new Buffer(buf.length);
  buf.copy(newBuf);
  return newBuf;
}

function parseBoolAttr(buf) {
  return parseDWordAttr(buf) === 1;
}

function parseDWordAttr(buf) {
  return buf.readUInt32LE(0);
}

function parseQWordAttr(buf) {
  return common.readUInt64LE(buf);
}

function parseWordAttr(buf) {
  return buf.readUInt16LE(0);
}

}).call(this,_dereq_("buffer").Buffer)
},{"./common":23,"buffer":5,"buffer-equal":32,"events":8,"fs":1,"strtok2":38,"util":20}],22:[function(_dereq_,module,exports){
(function (process){
var readStream = _dereq_('filereader-stream')
var through = _dereq_('through')
var musicmetadata = _dereq_('./index')


module.exports = function (stream, opts) {
  return musicmetadata(wrapFileWithStream(stream), opts)
}

function wrapFileWithStream (file) {
  if (file instanceof FileList) {
    throw new Error('You have passed a FileList object but we expected a File');
  }
  if (!(file instanceof File || file instanceof Blob)) {
    throw new Error('You must provide a valid File or Blob object');
  }
  var stream = through(null, null, {autoDestroy: false});
  stream.fileSize = function (cb) {
    process.nextTick(function () {
      cb(file.size);
    })
  }
  return readStream(file).pipe(stream);
}
}).call(this,_dereq_("/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"./index":29,"/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":10,"filereader-stream":36,"through":39}],23:[function(_dereq_,module,exports){
(function (Buffer){
var strtok = _dereq_('strtok2');
var bufferEqual = _dereq_('buffer-equal');
var equal = _dereq_('deep-equal');

var asfGuidBuf = new Buffer([
    0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11,
    0xA6, 0xD9, 0x00, 0xAA, 0x00, 0x62, 0xCE, 0x6C
  ]);
exports.asfGuidBuf = asfGuidBuf;

exports.getParserForMediaType = function (types, header) {
  for (var i = 0; i < types.length; i += 1) {
    var type = types[i];
    var offset = type.offset || 0;
    if (header.length >= offset + type.buf.length &&
        bufferEqual(header.slice(offset, offset + type.buf.length), type.buf))
    {
      return type.tag;
    }
  }
  // default to id3v1.1 if we cannot detect any other tags
  return _dereq_('./id3v1');
}

exports.streamOnRealEnd = function(stream, callback) {
  stream.on('end', done);
  stream.on('close', done);
  function done() {
    stream.removeListener('end', done);
    stream.removeListener('close', done);
    callback();
  }
};

exports.readVorbisPicture = function (buffer) {
  var picture = {};
  var offset = 0;

  picture.type = PICTURE_TYPE[strtok.UINT32_BE.get(buffer, 0)];

  var mimeLen = strtok.UINT32_BE.get(buffer, offset += 4);
  picture.format = buffer.toString('utf-8', offset += 4, offset + mimeLen);

  var descLen = strtok.UINT32_BE.get(buffer, offset += mimeLen);
  picture.description = buffer.toString('utf-8', offset += 4, offset + descLen);

  picture.width = strtok.UINT32_BE.get(buffer, offset += descLen);
  picture.height = strtok.UINT32_BE.get(buffer, offset += 4);
  picture.colour_depth = strtok.UINT32_BE.get(buffer, offset += 4);
  picture.indexed_color = strtok.UINT32_BE.get(buffer, offset += 4);

  var picDataLen = strtok.UINT32_BE.get(buffer, offset += 4);
  picture.data = buffer.slice(offset += 4, offset + picDataLen);

  return picture;
}

exports.removeUnsyncBytes = function (buffer) {
  var readI = 0;
  var writeI = 0;
  while (readI < buffer.length -1) {
    if (readI !== writeI) {
      buffer[writeI] = buffer[readI];
    }
    readI += (buffer[readI] === 0xFF && buffer[readI + 1] === 0) ? 2 : 1;
    writeI++;
  }
  if (readI < buffer.length) {
    buffer[writeI++] = buffer[readI++];
  }
  return buffer.slice(0, writeI);
}

exports.findZero = function (buffer, start, end, encoding) {
  var i = start;
  if (encoding === 'utf16') {
    while (buffer[i] !== 0 || buffer[i+1] !== 0) {
      if (i >= end) return end;
      i++;
    }
  } else {
    while (buffer[i] !== 0) {
      if (i >= end) return end;
      i++;
    }
  }
  return i;
}

var decodeString = exports.decodeString = function (b, encoding, start, end) {
  var text = '';
  if (encoding == 'utf16') {
    text = readUTF16String(b.slice(start, end));
  } else {
    var enc = (encoding == 'iso-8859-1') ? 'binary' : 'utf8';
    text = b.toString(enc, start, end);
  }
  return { text : text, length : end - start }
}

exports.parseGenre = function (origVal) {
  // match everything inside parentheses
  var split = origVal.trim().split(/\((.*?)\)/g)
    .filter(function (val) { return val !== ''; });

  var array = [];
  for (var i = 0; i < split.length; i++) {
    var cur = split[i];
    if (!isNaN(parseInt(cur))) cur = GENRES[cur];
    array.push(cur);
  }

  return array.join('/');
}

var readUTF16String = exports.readUTF16String = function (bytes) {
  var ix      = 0,
      offset1 = 1,
      offset2 = 0,
      maxBytes = bytes.length;

  if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
    ix        = 2;
    offset1   = 0;
    offset2   = 1;
  } else if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
    ix = 2;
  }

  var str = '';
  for (var j = 0; ix < maxBytes; j++) {
    var byte1 = bytes[ix + offset1],
        byte2 = bytes[ix + offset2],
        word1 = (byte1 << 8) + byte2;
    ix += 2;

    if (word1 === 0x0000) {
      break;
    } else if (byte1 < 0xD8 || byte1 >= 0xE0) {
      str += String.fromCharCode(word1);
    } else {
      var byte3 = bytes[ix+offset1],
          byte4 = bytes[ix+offset2],
          word2 = (byte3 << 8) + byte4;
      ix += 2;
      str += String.fromCharCode(word1, word2);
    }
  }
  return str;
};

exports.readUInt64LE = function(buffer, offset) {
  var val = 0;
  for (var i = 0; i < 8; i += 1) {
    val += buffer[offset + i] * Math.pow(2, 8 * i);
  }
  return val;
}

exports.stripNulls = function(str) {
  str = str.replace(/^\x00+/g, "");
  str = str.replace(/\x00+$/g, "");
  return str;
}

exports.strtokUINT24_BE = {
  len: 3,
  get: function(buf, off) {
    return (((buf[off] << 8) + buf[off + 1]) << 8) + buf[off + 2];
  }
}

exports.strtokBITSET = {
  len: 1,
  get: function(buf, off, bit) {
    return (buf[off] & (1 << bit)) !== 0;
  }
}

exports.strtokINT32SYNCSAFE = {
  len: 4,
  get: function(buf, off) {
    return buf[off + 3] & 0x7f | ((buf[off + 2]) << 7) |
      ((buf[off + 1]) << 14) | ((buf[off]) << 21);
  }
}

var PICTURE_TYPE = exports.PICTURE_TYPE = [
  "Other",
  "32x32 pixels 'file icon' (PNG only)",
  "Other file icon",
  "Cover (front)",
  "Cover (back)",
  "Leaflet page",
  "Media (e.g. lable side of CD)",
  "Lead artist/lead performer/soloist",
  "Artist/performer",
  "Conductor",
  "Band/Orchestra",
  "Composer",
  "Lyricist/text writer",
  "Recording Location",
  "During recording",
  "During performance",
  "Movie/video screen capture",
  "A bright coloured fish",
  "Illustration",
  "Band/artist logotype",
  "Publisher/Studio logotype"
]

var GENRES = exports.GENRES = [
  'Blues','Classic Rock','Country','Dance','Disco','Funk','Grunge','Hip-Hop',
  'Jazz','Metal','New Age','Oldies','Other','Pop','R&B','Rap','Reggae','Rock',
  'Techno','Industrial','Alternative','Ska','Death Metal','Pranks','Soundtrack',
  'Euro-Techno','Ambient','Trip-Hop','Vocal','Jazz+Funk','Fusion','Trance',
  'Classical','Instrumental','Acid','House','Game','Sound Clip','Gospel','Noise',
  'Alt. Rock','Bass','Soul','Punk','Space','Meditative','Instrumental Pop',
  'Instrumental Rock','Ethnic','Gothic','Darkwave','Techno-Industrial',
  'Electronic','Pop-Folk','Eurodance','Dream','Southern Rock','Comedy','Cult',
  'Gangsta Rap','Top 40','Christian Rap','Pop/Funk','Jungle','Native American',
  'Cabaret','New Wave','Psychedelic','Rave','Showtunes','Trailer','Lo-Fi','Tribal',
  'Acid Punk','Acid Jazz','Polka','Retro','Musical','Rock & Roll','Hard Rock',
  'Folk','Folk/Rock','National Folk','Swing','Fast-Fusion','Bebob','Latin','Revival',
  'Celtic','Bluegrass','Avantgarde','Gothic Rock','Progressive Rock','Psychedelic Rock',
  'Symphonic Rock','Slow Rock','Big Band','Chorus','Easy Listening','Acoustic','Humour',
  'Speech','Chanson','Opera','Chamber Music','Sonata','Symphony','Booty Bass','Primus',
  'Porn Groove','Satire','Slow Jam','Club','Tango','Samba','Folklore',
  'Ballad','Power Ballad','Rhythmic Soul','Freestyle','Duet','Punk Rock','Drum Solo',
  'A Cappella','Euro-House','Dance Hall','Goa','Drum & Bass','Club-House',
  'Hardcore','Terror','Indie','BritPop','Negerpunk','Polsk Punk','Beat',
  'Christian Gangsta Rap','Heavy Metal','Black Metal','Crossover','Contemporary Christian',
  'Christian Rock','Merengue','Salsa','Thrash Metal','Anime','JPop','Synthpop'
]

exports.id3BitrateCalculator = function (bits, mpegVersion, layer) {
  if (equal(bits, [0, 0, 0, 0])) {
    return 'free';
  }
  if (equal(bits, [1, 1, 1, 1])) {
    return 'reserved';
  }
  if (mpegVersion === 1 && layer === 1) {
    if (equal(bits, [0, 0, 0, 1])) return 32;
    if (equal(bits, [0, 0, 1, 0])) return 64;
    if (equal(bits, [0, 0, 1, 1])) return 96;
    if (equal(bits, [0, 1, 0, 0])) return 128;
    if (equal(bits, [0, 1, 0, 1])) return 160;
    if (equal(bits, [0, 1, 1, 0])) return 192;
    if (equal(bits, [0, 1, 1, 1])) return 224;
    if (equal(bits, [1, 0, 0, 0])) return 256;
    if (equal(bits, [1, 0, 0, 1])) return 288;
    if (equal(bits, [1, 0, 1, 0])) return 320;
    if (equal(bits, [1, 0, 1, 1])) return 352;
    if (equal(bits, [1, 1, 0, 0])) return 384;
    if (equal(bits, [1, 1, 0, 1])) return 416;
    if (equal(bits, [1, 1, 1, 0])) return 448;
  } else if (mpegVersion === 1 && layer === 2) {
    if (equal(bits, [0, 0, 0, 1])) return 32;
    if (equal(bits, [0, 0, 1, 0])) return 48;
    if (equal(bits, [0, 0, 1, 1])) return 56;
    if (equal(bits, [0, 1, 0, 0])) return 64;
    if (equal(bits, [0, 1, 0, 1])) return 80;
    if (equal(bits, [0, 1, 1, 0])) return 96;
    if (equal(bits, [0, 1, 1, 1])) return 112;
    if (equal(bits, [1, 0, 0, 0])) return 128;
    if (equal(bits, [1, 0, 0, 1])) return 160;
    if (equal(bits, [1, 0, 1, 0])) return 192;
    if (equal(bits, [1, 0, 1, 1])) return 224;
    if (equal(bits, [1, 1, 0, 0])) return 256;
    if (equal(bits, [1, 1, 0, 1])) return 320;
    if (equal(bits, [1, 1, 1, 0])) return 384;
  } else if (mpegVersion === 1 && layer === 3) {
    if (equal(bits, [0, 0, 0, 1])) return 32;
    if (equal(bits, [0, 0, 1, 0])) return 40;
    if (equal(bits, [0, 0, 1, 1])) return 48;
    if (equal(bits, [0, 1, 0, 0])) return 56;
    if (equal(bits, [0, 1, 0, 1])) return 64;
    if (equal(bits, [0, 1, 1, 0])) return 80;
    if (equal(bits, [0, 1, 1, 1])) return 96;
    if (equal(bits, [1, 0, 0, 0])) return 112;
    if (equal(bits, [1, 0, 0, 1])) return 128;
    if (equal(bits, [1, 0, 1, 0])) return 160;
    if (equal(bits, [1, 0, 1, 1])) return 192;
    if (equal(bits, [1, 1, 0, 0])) return 224;
    if (equal(bits, [1, 1, 0, 1])) return 256;
    if (equal(bits, [1, 1, 1, 0])) return 320;
  } else if (mpegVersion === 2 && layer === 1) {
    if (equal(bits, [0, 0, 0, 1])) return 32;
    if (equal(bits, [0, 0, 1, 0])) return 48;
    if (equal(bits, [0, 0, 1, 1])) return 56;
    if (equal(bits, [0, 1, 0, 0])) return 64;
    if (equal(bits, [0, 1, 0, 1])) return 80;
    if (equal(bits, [0, 1, 1, 0])) return 96;
    if (equal(bits, [0, 1, 1, 1])) return 112;
    if (equal(bits, [1, 0, 0, 0])) return 128;
    if (equal(bits, [1, 0, 0, 1])) return 144;
    if (equal(bits, [1, 0, 1, 0])) return 160;
    if (equal(bits, [1, 0, 1, 1])) return 176;
    if (equal(bits, [1, 1, 0, 0])) return 192;
    if (equal(bits, [1, 1, 0, 1])) return 224;
    if (equal(bits, [1, 1, 1, 0])) return 256;
  } else if (mpegVersion === 2 && (layer === 2 || layer === 3)) {
    if (equal(bits, [0, 0, 0, 1])) return 8;
    if (equal(bits, [0, 0, 1, 0])) return 16;
    if (equal(bits, [0, 0, 1, 1])) return 24;
    if (equal(bits, [0, 1, 0, 0])) return 32;
    if (equal(bits, [0, 1, 0, 1])) return 40;
    if (equal(bits, [0, 1, 1, 0])) return 48;
    if (equal(bits, [0, 1, 1, 1])) return 56;
    if (equal(bits, [1, 0, 0, 0])) return 64;
    if (equal(bits, [1, 0, 0, 1])) return 80;
    if (equal(bits, [1, 0, 1, 0])) return 96;
    if (equal(bits, [1, 0, 1, 1])) return 112;
    if (equal(bits, [1, 1, 0, 0])) return 128;
    if (equal(bits, [1, 1, 0, 1])) return 144;
    if (equal(bits, [1, 1, 1, 0])) return 160;
  }
}

exports.samplingRateCalculator = function (bits, mpegVersion) {
  if (equal(bits, [1, 1])) {
    return 'reserved';
  }
  if (mpegVersion === 1) {
    if (equal(bits, [0, 0])) return 44100;
    if (equal(bits, [0, 1])) return 48000;
    if (equal(bits, [1, 0])) return 32000;
  } else if (mpegVersion === 2) {
    if (equal(bits, [0, 0])) return 22050;
    if (equal(bits, [0, 1])) return 24000;
    if (equal(bits, [1, 0])) return 16000;
  } else if (mpegVersion === 2.5) {
    if (equal(bits, [0, 0])) return 11025;
    if (equal(bits, [0, 1])) return 12000;
    if (equal(bits, [1, 0])) return 8000;
  }
}

}).call(this,_dereq_("buffer").Buffer)
},{"./id3v1":25,"buffer":5,"buffer-equal":32,"deep-equal":33,"strtok2":38}],24:[function(_dereq_,module,exports){
var strtok = _dereq_('strtok2');
var common = _dereq_('./common');

module.exports = function (stream, callback, done) {
  var currentState = startState;

  strtok.parse(stream, function (v, cb) {
    currentState = currentState.parse(callback, v, done);
    return currentState.getExpectedType();
  })
}

var DataDecoder = function (data) {
  this.data = data;
  this.offset = 0;
}

DataDecoder.prototype.readInt32 = function () {
  var value = strtok.UINT32_LE.get(this.data, this.offset);
  this.offset += 4;
  return value;
}

DataDecoder.prototype.readStringUtf8 = function () {
  var len = this.readInt32();
  var value = this.data.toString('utf8', this.offset, this.offset + len);
  this.offset += len;
  return value;
};

var finishedState = {
  parse: function (callback) {
    return this;
  },
  getExpectedType: function () {
    return strtok.DONE;
  }
}

var BlockDataState = function (type, length, nextStateFactory) {
  this.type = type;
  this.length = length;
  this.nextStateFactory = nextStateFactory;
}

BlockDataState.prototype.parse = function (callback, data) {
  if (this.type === 4) {
    var decoder = new DataDecoder(data);
    var vendorString = decoder.readStringUtf8();
    var commentListLength = decoder.readInt32();
    var comment;
    var split;
    var i;

    for (i = 0; i < commentListLength; i++) {
      comment = decoder.readStringUtf8();
      split = comment.split('=');
      callback(split[0].toUpperCase(), split[1]);
    }
  } else if (this.type === 6) {
    var picture = common.readVorbisPicture(data);
    callback('METADATA_BLOCK_PICTURE', picture);
  }

  return this.nextStateFactory();
}

BlockDataState.prototype.getExpectedType = function () {
  return new strtok.BufferType(this.length);
}

var blockHeaderState = {
  parse: function (callback, data, done) {
    var header = {
      lastBlock: (data[0] & 0x80) == 0x80,
      type: data[0] & 0x7f,
      length: common.strtokUINT24_BE.get(data, 1)
    }
    var followingStateFactory = header.lastBlock ? function() {
        done();
        return finishedState;
      } : function() {
        return blockHeaderState;
      }

    return new BlockDataState(header.type, header.length, followingStateFactory);
  },
  getExpectedType: function () {
    return new strtok.BufferType(4);
  }
}

var idState = {
  parse: function (callback, data, done) {
    if (data !== 'fLaC') {
      done(new Error('expected flac header but was not found'));
    }
    return blockHeaderState;
  },
  getExpectedType: function () {
    return new strtok.StringType(4);
  }
};

var startState = {
  parse: function (callback) {
    return idState;
  },
  getExpectedType: function () {
    return strtok.DONE;
  }
}

},{"./common":23,"strtok2":38}],25:[function(_dereq_,module,exports){
var util = _dereq_('util');
var common = _dereq_('./common');

module.exports = function (stream, callback, done) {
  var endData = null;
  stream.on('data', function (data) {
    endData = data;
  });
  common.streamOnRealEnd(stream, function () {
    var offset = endData.length - 128;
    var header = endData.toString('ascii', offset, offset += 3);
    if (header !== 'TAG') {
      return done(new Error('Could not find metadata header'));
    }

    var title = endData.toString('ascii', offset, offset += 30);
    callback('title', title.trim().replace(/\x00/g, ''));

    var artist = endData.toString('ascii', offset, offset += 30);
    callback('artist', artist.trim().replace(/\x00/g, ''));

    var album = endData.toString('ascii', offset, offset += 30);
    callback('album', album.trim().replace(/\x00/g, ''));

    var year = endData.toString('ascii', offset, offset += 4);
    callback('year', year.trim().replace(/\x00/g, ''));

    var comment = endData.toString('ascii', offset, offset += 28);
    callback('comment', comment.trim().replace(/\x00/g, ''));

    var track = endData[endData.length - 2];
    callback('track', track);

    if (endData[endData.length - 1] in common.GENRES) {
      var genre = common.GENRES[endData[endData.length - 1]];
      callback('genre', genre);
    }
    return done();
  });
}

},{"./common":23,"util":20}],26:[function(_dereq_,module,exports){
var strtok = _dereq_('strtok2');
var parser = _dereq_('./id3v2_frames');
var common = _dereq_('./common');
var BitArray = _dereq_('node-bitarray');
var equal = _dereq_('deep-equal');

module.exports = function (stream, callback, done, readDuration) {

  var frameCount = 0;
  var audioFrameHeader;
  var bitrates = [];

  strtok.parse(stream, function (v, cb) {
    if (!v) {
      cb.state = 0;
      return new strtok.BufferType(10);
    }

    switch (cb.state) {
      case 0: // header
        if (v.toString('ascii', 0, 3) !== 'ID3') {
          return done(new Error('expected id3 header but was not found'));
        }
        cb.id3Header = {
          version: '2.' + v[3] + '.' + v[4],
          major: v[3],
          unsync: common.strtokBITSET.get(v, 5, 7),
          xheader: common.strtokBITSET.get(v, 5, 6),
          xindicator: common.strtokBITSET.get(v, 5, 5),
          footer: common.strtokBITSET.get(v, 5, 4),
          size: common.strtokINT32SYNCSAFE.get(v, 6)
        }
        cb.state = 1;
        return new strtok.BufferType(cb.id3Header.size);

      case 1: // id3 data
        parseMetadata(v, cb.id3Header, callback);
        if (readDuration) {
          cb.state = 2;
          return new strtok.BufferType(4);
        }
        return done();
      case 2: // audio frame header

        // we have found the id3 tag at the end of the file, ignore
        if (v.slice(0, 3).toString() === 'TAG') {
          return strtok.DONE;
        }

        var bts = BitArray.fromBuffer(v);

        var syncWordBits = bts.slice(0, 11);
        if (sum(syncWordBits) != 11) {
          // keep scanning for frame header, id3 tag may
          // have some padding (0x00) at the end
          if (frameCount === 0) {
            return new strtok.BufferType(4);
          }
          return done(new Error('expected frame header but was not found'));
        }

        var header = {
          'version': readMpegVersion(bts.slice(11, 13)),
          'layer': readLayer(bts.slice(13, 15)),
          'protection': !bts.__bits[15],
          'padding': !!bts.__bits[22],
          'mode': readMode(bts.slice(22, 24))
        }

        header.samples_per_frame = calcSamplesPerFrame(
          header.version, header.layer);

        header.bitrate = common.id3BitrateCalculator(
          bts.slice(16, 20), header.version, header.layer);

        header.sample_rate = common.samplingRateCalculator(
          bts.slice(20, 22), header.version);

        header.slot_size = calcSlotSize(header.layer);

        header.sideinfo_length = calculateSideInfoLength(
          header.layer, header.mode, header.version);

        var bps = header.samples_per_frame / 8.0;
        var fsize = (bps * (header.bitrate * 1000) / header.sample_rate) +
          ((header.padding) ? header.slot_size : 0);
        header.frame_size = Math.floor(fsize);

        audioFrameHeader = header;
        frameCount++;
        bitrates.push(header.bitrate);

        // xtra header only exists in first frame
        if (frameCount === 1) {
          cb.offset = header.sideinfo_length;
          cb.state = 3;
          return new strtok.BufferType(header.sideinfo_length);
        }

        // the stream is CBR if the first 3 frame bitrates are the same
        if (readDuration && stream.fileSize && frameCount === 3 && areAllSame(bitrates)) {
          stream.fileSize(function (size) {
            var kbps = (header.bitrate * 1000) / 8;
            callback('duration', Math.round(size / kbps));
            cb(done());
          })
          return strtok.DEFER;
        }

        // once we know the file is VBR attach listener to end of
        // stream so we can do the duration calculation when we
        // have counted all the frames
        if (readDuration && frameCount === 4) {
          stream.once('end', function () {
            callback('duration', calcDuration(frameCount,
              header.samples_per_frame, header.sample_rate))
            done()
          })
        }

        cb.state = 5;
        return new strtok.BufferType(header.frame_size - 4);

      case 3: // side information
        cb.offset += 12;
        cb.state = 4;
        return new strtok.BufferType(12);

      case 4: // xtra / info header
        cb.state = 5;
        var frameDataLeft = audioFrameHeader.frame_size - 4 - cb.offset;

        var id = v.toString('ascii', 0, 4);
        if (id !== 'Xtra' && id !== 'Info') {
          return new strtok.BufferType(frameDataLeft);
        }

        var bits = BitArray.fromBuffer(v.slice(4, 8));
        // frames field is not present
        if (bits.__bits[bits.__bits.length-1] !== 1) {
          return new strtok.BufferType(frameDataLeft);
        }

        var numFrames = v.readUInt32BE(8);
        var ah = audioFrameHeader;
        callback('duration', calcDuration(numFrames, ah.samples_per_frame, ah.sample_rate));
        return done();

      case 5: // skip frame data
        cb.state = 2;
        return new strtok.BufferType(4);
    }
  })
}

function areAllSame (array) {
  var first = array[0];
  return array.every(function (element) {
    return element === first;
  });
}

function calcDuration (numFrames, samplesPerFrame, sampleRate) {
  return Math.round(numFrames * (samplesPerFrame / sampleRate));
}

function parseMetadata (data, header, callback) {
  var offset = 0;

  if (header.xheader) {
    offset += data.readUInt32BE(0);
  }

  while (true) {
    if (offset === data.length) break;
    var frameHeaderBytes = data.slice(offset, offset += getFrameHeaderLength(header.major));
    var frameHeader = readFrameHeader(frameHeaderBytes, header.major);

    // Last frame. Check first char is a letter, bit of defensive programming  
    if (frameHeader.id === '' || frameHeader.id === '\u0000\u0000\u0000\u0000' ||
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.search(frameHeader.id[0]) === -1) {
      break;
    }

    var frameDataBytes = data.slice(offset, offset += frameHeader.length);
    var frameData = readFrameData(frameDataBytes, frameHeader, header.major);
    callback(frameHeader.id, frameData);
  }
}

function readFrameData (v, frameHeader, majorVer) {
  switch (majorVer) {
    case 2:
      return parser.readData(v, frameHeader.id, null, majorVer);
    case 3:
    case 4:
      if (frameHeader.flags.format.unsync) {
        v = common.removeUnsyncBytes(v);
      }
      if (frameHeader.flags.format.data_length_indicator) {
        v = v.slice(4, v.length);
      }
      return parser.readData(v, frameHeader.id, frameHeader.flags, majorVer);
  }
}

function readFrameHeader (v, majorVer) {
  var header = {};
  switch (majorVer) {
    case 2:
      header.id = v.toString('ascii', 0, 3);
      header.length = common.strtokUINT24_BE.get(v, 3, 6);
      break;
    case 3:
      header.id = v.toString('ascii', 0, 4);
      header.length = strtok.UINT32_BE.get(v, 4, 8);
      header.flags = readFrameFlags(v.slice(8, 10));
      break;
    case 4:
      header.id = v.toString('ascii', 0, 4);
      header.length = common.strtokINT32SYNCSAFE.get(v, 4, 8);
      header.flags = readFrameFlags(v.slice(8, 10));
      break;
  }
  return header;
}

function getFrameHeaderLength (majorVer) {
  switch (majorVer) {
    case 2:
      return 6;
    case 3:
    case 4:
      return 10;
    default:
      return done(new Error('header version is incorrect'));
  }
}

function readFrameFlags (b) {
  return {
    status: {
      tag_alter_preservation: common.strtokBITSET.get(b, 0, 6),
      file_alter_preservation: common.strtokBITSET.get(b, 0, 5),
      read_only: common.strtokBITSET.get(b, 0, 4)
    },
    format: {
      grouping_identity: common.strtokBITSET.get(b, 1, 7),
      compression: common.strtokBITSET.get(b, 1, 3),
      encryption: common.strtokBITSET.get(b, 1, 2),
      unsync: common.strtokBITSET.get(b, 1, 1),
      data_length_indicator: common.strtokBITSET.get(b, 1, 0)
    }
  }
}

function sum (array) {
  var result = 0;
  for (var i = 0; i < array.length; i++) {
    result += array[i]
  }
  return result;
}

function readMpegVersion (bits) {
  if (equal(bits, [0, 0])) {
    return 2.5;
  } else if (equal(bits, [0, 1])) {
    return 'reserved';
  } else if (equal(bits, [1, 0])) {
    return 2;
  } else if (equal(bits, [1, 1])) {
    return 1;
  }
}

function readLayer (bits) {
  if (equal(bits, [0, 0])) {
    return 'reserved';
  } else if (equal(bits, [0, 1])) {
    return 3;
  } else if (equal(bits, [1, 0])) {
    return 2;
  } else if (equal(bits, [1, 1])) {
    return 1;
  }
}

function readMode (bits) {
  if (equal(bits, [0, 0])) {
    return 'stereo';
  } else if (equal(bits, [0, 1])) {
    return 'joint_stereo';
  } else if (equal(bits, [1, 0])) {
    return 'dual_channel';
  } else if (equal(bits, [1, 1])) {
    return 'mono';
  }
}

function calcSamplesPerFrame (version, layer) {
  if (layer === 1) return 384;
  if (layer === 2) return 1152;
  if (layer === 3 && version === 1) return 1152;
  if (layer === 3 && (version === 2 || version === 2.5)) return 576;
}

function calculateSideInfoLength (layer, mode, version) {
  if (layer !== 3) return 2;
  if (['stereo', 'joint_stereo', 'dual_channel'].indexOf(mode) >= 0) {
    if (version === 1) {
      return 32;
    } else if (version === 2 || version === 2.5) {
      return 17;
    }
  } else if (mode === 'mono') {
    if (version === 1) {
      return 17;
    } else if (version === 2 || version === 2.5) {
      return 9;
    }
  }
}

function calcSlotSize (layer) {
  if (layer === 0) return 'reserved';
  if (layer === 1) return 4;
  if (layer === 2) return 1;
  if (layer === 3) return 1;
}

},{"./common":23,"./id3v2_frames":27,"deep-equal":33,"node-bitarray":37,"strtok2":38}],27:[function(_dereq_,module,exports){
var Buffer       = _dereq_('buffer').Buffer;
var strtok       = _dereq_('strtok2');
var common       = _dereq_('./common');
var findZero     = common.findZero;
var decodeString = common.decodeString;

exports.readData = function readData(b, type, flags, major) {
  var encoding;
  var length = b.length;
  var offset = 0;
          
  if (type[0] === 'T') {
    type = 'T*';
    encoding = getTextEncoding(b[0]);
  }

  switch (type) {
    case 'T*':
      var text = decodeString(b, encoding, 1, length).text;
      //trim any whitespace and any leading or trailing null characters
      text = text.trim().replace(/^\x00+/,'').replace(/\x00+$/,'');
      text = text.replace(/^\uFEFF/, ''); //REMOVE BOM
      //convert nulls into /
      text = text.replace(/\x00/g, '/');
      return text;
      
    case 'PIC':
    case 'APIC':
      var pic = {};
      encoding = getTextEncoding(b[0]);
      
      offset += 1;
        
      switch (major) {
        case 2:
          pic.format = decodeString(b, encoding, offset, offset + 3).text;
          offset += 3;
          break;
        case 3:
        case 4:
          pic.format = decodeString(b, encoding, offset, findZero(b, offset, length, encoding));
          offset += 1 + pic.format.length;
          pic.format = pic.format.text;
          break;
      }
    
      pic.type = common.PICTURE_TYPE[b[offset]];
      offset += 1;
    
      pic.description = decodeString(b, encoding, offset, findZero(b, offset, length, encoding));
      offset += 1 + pic.description.length;
      pic.description = pic.description.text;
    
      pic.data = b.slice(offset, length);
      return pic;

    case 'COM':
    case 'COMM':
      var comment = {};

      encoding = getTextEncoding(b[0]);
      offset +=1;

      comment.language = decodeString(b, encoding, offset, offset + 3).text;
      offset += 3;
      
      comment.short_description = decodeString(
        b, encoding, offset, findZero(b, offset, length, encoding));
      offset += 1 + comment.short_description.length;
      comment.short_description = comment.short_description.text.trim().replace(/\x00/g,'');
      comment.text = decodeString(b, encoding, offset, length).text.trim().replace(/\x00/g,'');
      return comment;

    case 'CNT':
    case 'PCNT':
      return strtok.UINT32_BE.get(b, 0);

    case 'ULT':
    case 'USLT':
      var lyrics  = {};
        
      encoding = getTextEncoding(b[0]);
      offset += 1;

      lyrics.language = decodeString(b, encoding, offset, offset + 3).text;
      offset += 3;
        
      lyrics.descriptor = decodeString(b, encoding, offset, findZero(b, offset, length, encoding));
      offset += 1 + lyrics.descriptor.length;        
      lyrics.descriptor = lyrics.descriptor.text;
        
      lyrics.text = decodeString(b, encoding, offset, length);
      lyrics.text = lyrics.text.text;
        
      return lyrics;
  }

  // unrecognized tag
  return null;
};

function getTextEncoding(byte) {
  switch (byte) {
    case 0x00:
      return 'iso-8859-1'; //binary
    case 0x01:
    case 0x02:
      return 'utf16'; //01 = with bom, 02 = without bom
    case 0x03:
      return 'utf8';
    default:
      return 'utf8';
  }
}

},{"./common":23,"buffer":5,"strtok2":38}],28:[function(_dereq_,module,exports){
var strtok = _dereq_('strtok2');
var common = _dereq_('./common');

module.exports = function (stream, callback, done, readDuration) {
  strtok.parse(stream, function (v, cb) {
    // we can stop processing atoms once we get to the end of the ilst atom
    if (cb.metaAtomsTotalLength >= cb.atomContainerLength - 8) {
      return done();
    }

    // the very first thing we expect to see is the first atom's length
    if (!v) {
      cb.metaAtomsTotalLength = 0;
      cb.state = 0;
      return strtok.UINT32_BE;
    }

    switch (cb.state) {
      case -1: // skip
        cb.state = 0;
        return strtok.UINT32_BE;

      case 0: // atom length
        cb.atomLength = v;
        cb.state++;
        return new strtok.StringType(4, 'binary');

      case 1: // atom name
        cb.atomName = v;

        // meta has 4 bytes padding at the start (skip)
        if (v === 'meta') {
          cb.state = -1; // what to do for skip?
          return new strtok.BufferType(4);
        }

        if (readDuration) {
          if (v === 'mdhd') {
            cb.state = 3;
            return new strtok.BufferType(cb.atomLength - 8);
          }
        }

        if (!~CONTAINER_ATOMS.indexOf(v)) {
          // whats the num for ilst?
          cb.state = (cb.atomContainer === 'ilst') ? 2 : -1;
          return new strtok.BufferType(cb.atomLength - 8);
        }

        // dig into container atoms
        cb.atomContainer = v;
        cb.atomContainerLength = cb.atomLength;
        cb.state--;
        return strtok.UINT32_BE;

      case 2: // ilst atom
        cb.metaAtomsTotalLength += cb.atomLength;
        var result = processMetaAtom(v, cb.atomName, cb.atomLength - 8);
        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            callback(cb.atomName, result[i]);
          }
        }
        cb.state = 0;
        return strtok.UINT32_BE;

      case 3: // mdhd atom
        // TODO: support version 1
        var sampleRate = v.readUInt32BE(12);
        var duration = v.readUInt32BE(16);
        callback('duration', Math.floor(duration / sampleRate));
        cb.state = 0;
        return strtok.UINT32_BE;
    }

    // if we ever get this this point something bad has happened
    return done(new Error('error parsing'));
  })
}

function processMetaAtom (data, atomName, atomLength) {
  var result = [];
  var offset = 0;

  // ignore proprietary iTunes atoms (for now)
  if (atomName === '----') return result;

  while (offset < atomLength) {
    var length = strtok.UINT32_BE.get(data, offset);
    var type = TYPES[strtok.UINT32_BE.get(data, offset + 8)];

    var content = processMetaDataAtom(data.slice(offset + 12, offset + length), type, atomName);

    result.push(content);
    offset += length;
  }

  return result;

  function processMetaDataAtom (data, type, atomName) {
    switch (type) {
      case 'text':
        return data.toString('utf8', 4);

      case 'uint8':
        if (atomName === 'gnre') {
          var genreInt = strtok.UINT16_BE.get(data, 4);
          return common.GENRES[genreInt - 1];
        }
        if (atomName === 'trkn' || atomName === 'disk') {
          return data[7] + '/' + data[9];
        }

        return strtok.UINT16_BE.get(data, 4);

      case 'jpeg':
      case 'png':
        return {
          format: 'image/' + type,
          data: data.slice(4)
        };
    }
  }
}

var TYPES = {
  '0': 'uint8',
  '1': 'text',
  '13': 'jpeg',
  '14': 'png',
  '21': 'uint8'
}

var CONTAINER_ATOMS = ['moov', 'udta', 'meta', 'ilst', 'trak', 'mdia'];

},{"./common":23,"strtok2":38}],29:[function(_dereq_,module,exports){
(function (process,Buffer){
var util = _dereq_('util');
var events = _dereq_('events');
var common = _dereq_('./common');
var strtok = _dereq_('strtok2');
var fs = _dereq_('fs')

var MusicMetadata = module.exports = function (stream, opts) {
  if (!(this instanceof MusicMetadata)) return new MusicMetadata(stream, opts);
  opts = opts || {};
  var self = this;

  stream.fileSize = function (cb) {
    if (stream.hasOwnProperty('path')) {
      fs.stat(stream.path, function (err, stats) {
        if (err) throw err;
        cb(stats.size);
      });
    } else if (opts.fileSize) {
      process.nextTick(function() {
        cb(opts.fileSize);
      });
    } else if (opts.duration) {
      self.emit(
        'done',
        Error('for non file streams, specify the size of the stream with a fileSize option'));
    }
  }

  this.stream = stream;

  this.metadata = {
    title: '',
    artist: [],
    albumartist: [],
    album: '',
    year: '',
    track: { no: 0, of: 0 },
    genre: [],
    disk: { no: 0, of: 0 },
    picture: [],
    duration: 0
  }

  this.aliased = {};

  this.stream.once('data', function (result) {
    var parser = common.getParserForMediaType(headerTypes, result);
    parser(self.stream, self.readEvent.bind(self), done,
      opts.hasOwnProperty('duration'));
    // re-emitting the first data chunk so the
    // parser picks the stream up from the start
    self.stream.emit('data', result);
  });

  this.stream.on('close', onClose);

  function onClose () {
    done(new Error('Unexpected end of stream'));
  }

  function done (exception) {
    self.stream.removeListener('close', onClose);
    self.readEvent('done', exception);
    return strtok.DONE;
  }

  events.EventEmitter.call(this);
}

util.inherits(MusicMetadata, events.EventEmitter);

MusicMetadata.prototype.readEvent = function (event, value) {
  // We only emit aliased events once the 'done' event has been raised,
  // this is because an alias like 'artist' could have values split
  // over many data chunks.
  if (event === 'done') {
    for (var _alias in this.aliased) {
      if (this.aliased.hasOwnProperty(_alias)) {
        var val;
        if (_alias === 'title' || _alias === 'album' ||
            _alias === 'year' || _alias === 'duration') {
          val = this.aliased[_alias][0];
        } else {
          val = this.aliased[_alias];
        }

        this.emit(_alias, val);

        if (this.metadata.hasOwnProperty(_alias)) {
          this.metadata[_alias] = val;
        }
      }
    }

    // don't emit the metadata event if nothing
    // ever gets added to the metadata object
    if (Object.keys(this.aliased).length > 0) {
      this.emit('metadata', this.metadata);
    }

    this.emit('done', value);
    return;
  }

  var alias = lookupAlias(event);

  // emit original event & value
  if (event !== alias) {
    this.emit(event, value);
  }
  if (value === null) return;

  // we need to do something special for these events
  var cleaned;
  if (event === 'TRACKTOTAL' || event === 'DISCTOTAL') {
    var evt;
    if (event === 'TRACKTOTAL') evt = 'track';
    if (event === 'DISCTOTAL') evt = 'disk';

    cleaned = parseInt(value, 10);
    if (isNaN(cleaned)) cleaned = 0;
    if (!this.aliased.hasOwnProperty(evt)) {
      this.aliased[evt] = { no: 0, of: cleaned };
    } else {
      this.aliased[evt].of = cleaned;
    }
  }

  // if the event has been aliased then we need to clean it before
  // it is emitted to the user. e.g. genre (20) -> Electronic
  if (alias) {
    cleaned = value;
    if (alias === 'genre') cleaned = common.parseGenre(value);
    if (alias === 'picture') cleaned = cleanupPicture(value);

    if (alias === 'track' || alias === 'disk') {
      cleaned = cleanupTrack(value);

      if (this.aliased[alias]) {
        this.aliased[alias].no = cleaned.no;
        return;
      } else {
        this.aliased[alias] = cleaned;
        return;
      }
    }

    // many tagging libraries use forward slashes to separate artists etc
    // within a string, this code separates those strings into an array
    if (cleaned.constructor === String) {
      // limit to these three aliases, we don't want to be splitting anything else
      if (alias === 'artist' || alias === 'albumartist' || alias === 'genre') {
        cleaned = cleaned.split('/');
        if (cleaned.length === 1) cleaned = cleaned[0];
      }
    }

    // if we haven't previously seen this tag then
    // initialize it to an array, ready for values to be entered
    if (!this.aliased.hasOwnProperty(alias)) {
      this.aliased[alias] = [];
    }

    if (cleaned.constructor === Array) {
      this.aliased[alias] = cleaned;
    } else {
      this.aliased[alias].push(cleaned);
    }
  }
}

function lookupAlias (event) {
  var alias;
  for (var i = 0; i < MAPPINGS.length; i++) {
    for (var j = 0; j < MAPPINGS[i].length; j++) {
      var cur = MAPPINGS[i][j];
      if (cur.toUpperCase() === event.toUpperCase()) {
        alias = MAPPINGS[i][0];
        break;
      }
    }
  }
  return alias;
}

function cleanupArtist (origVal) {
  return origVal.split('/');
}

// TODO: a string of 1of1 would fail to be converted
// converts 1/10 to no : 1, of : 10
// or 1 to no : 1, of : 0
function cleanupTrack (origVal) {
  var split = origVal.toString().split('/');
  var number = parseInt(split[0], 10) || 0;
  var total = parseInt(split[1], 10) || 0;
  return { no: number, of: total }
}

function cleanupPicture (picture) {
  var newFormat;
  if (picture.format) {
    var split = picture.format.toLowerCase().split('/');
    newFormat = (split.length > 1) ? split[1] : split[0];
    if (newFormat === 'jpeg') newFormat = 'jpg';
  } else {
    newFormat = 'jpg';
  }
  return { format: newFormat, data: picture.data }
}

var headerTypes = [
  {
    buf: common.asfGuidBuf,
    tag: _dereq_('./asf'),
  },
  {
    buf: new Buffer('ID3'),
    tag: _dereq_('./id3v2'),
  },
  {
    buf: new Buffer('ftypM4A'),
    tag: _dereq_('./id4'),
    offset: 4,
  },
  {
    buf: new Buffer('ftypmp42'),
    tag: _dereq_('./id4'),
    offset: 4,
  },
  {
    buf: new Buffer('OggS'),
    tag: _dereq_('./ogg'),
  },
  {
    buf: new Buffer('fLaC'),
    tag: _dereq_('./flac'),
  },
  {
    buf: new Buffer('MAC'),
    tag: _dereq_('./monkeysaudio'),
  },
];

// mappings for common metadata types(id3v2.3, id3v2.2, id4, vorbis, APEv2)
var MAPPINGS = [
  ['title', 'TIT2', 'TT2', '©nam', 'TITLE', 'Title'],
  ['artist', 'TPE1', 'TP1', '©ART', 'ARTIST', 'Author'],
  ['albumartist', 'TPE2', 'TP2', 'aART', 'ALBUMARTIST', 'ENSEMBLE', 'WM/AlbumArtist'],
  ['album', 'TALB', 'TAL', '©alb', 'ALBUM', 'WM/AlbumTitle'],
  ['year', 'TDRC', 'TYER', 'TYE', '©day', 'DATE', 'Year', 'WM/Year'],
  ['comment', 'COMM', 'COM', '©cmt', 'COMMENT'],
  ['track', 'TRCK', 'TRK', 'trkn', 'TRACKNUMBER', 'Track', 'WM/TrackNumber'],
  ['disk', 'TPOS', 'TPA', 'disk', 'DISCNUMBER', 'Disk'],
  ['genre', 'TCON', 'TCO', '©gen', 'gnre', 'GENRE', 'WM/Genre'],
  ['picture', 'APIC', 'PIC', 'covr', 'METADATA_BLOCK_PICTURE',
    'Cover Art (Front)', 'Cover Art (Back)'],
  ['composer', 'TCOM', 'TCM', '©wrt', 'COMPOSER'],
  ['duration']
];

}).call(this,_dereq_("/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),_dereq_("buffer").Buffer)
},{"./asf":21,"./common":23,"./flac":24,"./id3v2":26,"./id4":28,"./monkeysaudio":30,"./ogg":31,"/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":10,"buffer":5,"events":8,"fs":1,"strtok2":38,"util":20}],30:[function(_dereq_,module,exports){
(function (Buffer){
var common = _dereq_('./common');
var strtok = _dereq_('strtok2');

module.exports = function (stream, callback, done) {
  var bufs = [];

  // TODO: need to be able to parse the tag if its at the start of the file
  stream.on('data', function (data) {
    bufs.push(data);
  })

  common.streamOnRealEnd(stream, function () {
    var buffer = Buffer.concat(bufs);
    var offset = buffer.length - 32;

    if ('APETAGEX' !== buffer.toString('utf8', offset, offset += 8)) {
      done(new Error('expected APE header but wasn\'t found'));
    }

    var footer = {
      version: strtok.UINT32_LE.get(buffer, offset, offset + 4),
      size: strtok.UINT32_LE.get(buffer, offset + 4, offset + 8),
      count: strtok.UINT32_LE.get(buffer, offset + 8, offset + 12)
    }

    //go 'back' to where the 'tags' start
    offset = buffer.length - footer.size;

    for (var i = 0; i < footer.count; i++) {
      var size = strtok.UINT32_LE.get(buffer, offset, offset += 4);
      var flags = strtok.UINT32_LE.get(buffer, offset, offset += 4);
      var kind = (flags & 6) >> 1;

      var zero = common.findZero(buffer, offset, buffer.length);
      var key = buffer.toString('ascii', offset, zero);
      offset = zero + 1;

      var value;
      if (kind === 0) { // utf-8 textstring
        value = buffer.toString('utf8', offset, offset += size);
        value = value.replace(/\x00/g, '/');
      } else if (kind === 1) { //binary (probably artwork)
        if (key === 'Cover Art (Front)' || key === 'Cover Art (Back)') {
          var picData = buffer.slice(offset, offset + size);

          var off = 0;
          zero = common.findZero(picData, off, picData.length);
          var description = picData.toString('utf8', off, zero);
          off = zero + 1;

          var picture = {
            description: description,
            data: picData.slice(off)
          };

          value = picture;
          offset += size;
        }
      }
      callback(key, value);
    }
    return done();
  })
}

}).call(this,_dereq_("buffer").Buffer)
},{"./common":23,"buffer":5,"strtok2":38}],31:[function(_dereq_,module,exports){
(function (Buffer){
var fs = _dereq_('fs');
var util = _dereq_('util');
var events = _dereq_('events');
var strtok = _dereq_('strtok2');
var common = _dereq_('./common');

module.exports = function (stream, callback, done, readDuration) {
  var innerStream = new events.EventEmitter();

  var pageLength = 0;
  var sampleRate = 0;
  var header;
  var stop = false;

  stream.on('end', function () {
    if (readDuration) {
      callback('duration', Math.floor(header.pcm_sample_pos / sampleRate));
      done();
    }
  })

  // top level parser that handles the parsing of pages
  strtok.parse(stream, function (v, cb) {
    if (!v) {
      cb.state = 0;
      return new strtok.BufferType(27);
    }

    if (stop) {
      return done();
    }

    switch (cb.state) {
      case 0: // header
        header = {
          type: v.toString('ascii', 0, 4),
          version: v[4],
          packet_flag: v[5],
          pcm_sample_pos: (v.readUInt32LE(10) << 32) + v.readUInt32LE(6),
          stream_serial_num: strtok.UINT32_LE.get(v, 14),
          page_number: strtok.UINT32_LE.get(v, 18),
          check_sum: strtok.UINT32_LE.get(v, 22),
          segments: v[26]
        }
        if (header.type !== 'OggS') {
          return done(new Error('expected ogg header but was not found'));
        }
        cb.pageNumber = header.page_number;
        cb.state++;
        return new strtok.BufferType(header.segments);

      case 1: // segments
        var pageLen = 0;
        for (var i = 0; i < v.length; i++) {
          pageLen += v[i];
        }
        cb.state++;
        pageLength = pageLen;
        return new strtok.BufferType(pageLen);

      case 2: // page data
        innerStream.emit('data', new Buffer(v));
        cb.state = 0;
        return new strtok.BufferType(27);
    }
  })

  // Second level parser that handles the parsing of metadata.
  // The top level parser emits data that this parser should
  // handle.
  strtok.parse(innerStream, function (v, cb) {
    if (!v) {
      cb.commentsRead = 0;
      cb.state = 0;
      return new strtok.BufferType(7);
    }

    switch (cb.state) {
      case 0: // type
        if (v.toString() === '\x01vorbis') {
          cb.state = 6;
          return new strtok.BufferType(23);
        } else if (v.toString() === '\x03vorbis') {
          cb.state++;
          return strtok.UINT32_LE;
        } else {
          return done(new Error('expected vorbis header but found something else'));
        }
        break;

      case 1: // vendor length
        cb.state++;
        return new strtok.StringType(v);

      case 2: // vendor string
        cb.state++;
        return new strtok.BufferType(4);

      case 3: // user comment list length
        cb.commentsLength = v.readUInt32LE(0);
        // no metadata, stop parsing
        if (cb.commentsLength === 0) return strtok.DONE;
        cb.state++;
        return strtok.UINT32_LE;

      case 4: // comment length
        cb.state++;
        return new strtok.StringType(v);

      case 5: // comment
        cb.commentsRead++;

        var idx = v.indexOf('=');
        var key = v.slice(0, idx).toUpperCase();
        var value = v.slice(idx+1);

        if (key === 'METADATA_BLOCK_PICTURE') {
          value = common.readVorbisPicture(new Buffer(value, 'base64'));
        }

        callback(key, value);

        if (cb.commentsRead === cb.commentsLength) {
          // if we don't want to read the duration
          // then tell the parent stream to stop
          stop = !readDuration;
          return strtok.DONE;
        }

        cb.state--; // back to comment length
        return strtok.UINT32_LE;

      case 6: // vorbis info
        var info = {
          'version': v.readUInt32LE(0),
          'channel_mode': v.readUInt8(4),
          'sample_rate': v.readUInt32LE(5),
          'bitrate_nominal': v.readUInt32LE(13)
        }
        sampleRate = info.sample_rate;
        cb.state = 0;
        return new strtok.BufferType(7);
    }
  })
}

}).call(this,_dereq_("buffer").Buffer)
},{"./common":23,"buffer":5,"events":8,"fs":1,"strtok2":38,"util":20}],32:[function(_dereq_,module,exports){
var Buffer = _dereq_('buffer').Buffer; // for use with browserify

module.exports = function (a, b) {
    if (!Buffer.isBuffer(a)) return undefined;
    if (!Buffer.isBuffer(b)) return undefined;
    if (a.length !== b.length) return false;
    
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    
    return true;
};

},{"buffer":5}],33:[function(_dereq_,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = _dereq_('./lib/keys.js');
var isArguments = _dereq_('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function objEquiv(a, b, opts) {
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return true;
}

},{"./lib/is_arguments.js":34,"./lib/keys.js":35}],34:[function(_dereq_,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],35:[function(_dereq_,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],36:[function(_dereq_,module,exports){
(function (Buffer){
module.exports = FileStream;

function FileStream(file, options) {
  if (!(this instanceof FileStream))
    return new FileStream(file, options);
  options = options || {};
  options.output = options.output || 'arraybuffer';
  this.options = options;
  this._file = file;
  this.readable = true;
  this.offset = 0;
  this.chunkSize = this.options.chunkSize || 8128;
  ['name',
   'size',
   'type',
   'lastModifiedDate'].forEach(function (thing) {
     this[thing] = file[thing];
   }, this);
};

FileStream.prototype.readChunk = function(outputType) {
  var end = this.offset + this.chunkSize;
  var slice = this._file.slice(this.offset, end);
  this.offset = end;
  if (outputType === 'binary')
    this.reader.readAsBinaryString(slice);
  else if (outputType === 'dataurl')
    this.reader.readAsDataURL(slice);
  else if (outputType === 'arraybuffer')
    this.reader.readAsArrayBuffer(slice);
  else if (outputType === 'text')
    this.reader.readAsText(slice);
}

FileStream.prototype.pipe = function pipe(dest, options) {
  var self = this;
  const outputType = this.options.output;
  this.reader = new FileReader();
  this.reader.onloadend = function loaded(event) {
    var data = event.target.result;
    if (data instanceof ArrayBuffer)
      data = new Buffer(new Uint8Array(event.target.result));
    dest.write(data);
    if (self.offset < self._file.size) {
      self.readChunk(outputType)
      return;
    }
    if (dest !== console && (!options || options.end !== false)) {
      if (dest.end)
        dest.end();
      if (dest.close)
        dest.close();
    }
  };
  self.readChunk(outputType);
  return dest;
};

}).call(this,_dereq_("buffer").Buffer)
},{"buffer":5}],37:[function(_dereq_,module,exports){
(function (Buffer){
'use strict';

/*!
 * Module dependencies.
 */

var slice = Array.prototype.slice

/*!
 * Array proxy methods.
 */

var methods = ['concat', 'every', 'filter', 'forEach', 'indexOf', 
, 'join', 'lastIndexOf', 'map', 'pop', 'push', 'reduce', 'reduceRight'
, 'reverse', 'shift', 'slice', 'some', 'sort', 'splice', 'unshift'
]

/**
 * Utility: Find the longest array or string in argument list
 *
 * @param {...} arrays or strings to check
 * @return {Array} longest array
 * @api private
 */

function longest() {
  var args = slice.call(arguments)
    , len = 0, resp, arg
  for (var i = 0; i < args.length; i++) {
    arg = args[i]
    if (arg.length >= len) {
      len = arg.length
      resp = arg
    }
  }
  return resp
}

/**
 * BitArray constructor
 *
 * @param {Buffer} buffer of 32bit integers
 * @param {Number} set length of bits
 * @return {BitArray} new BitArray instance
 */

function BitArray(x, len, oct) {
  this.__bits = BitArray.parse(x, oct)
  this.__defineGetter__('length', function() {
    return this.__bits.length
  })
  len && this.fill(len)
  this.__len = len
}

/*!
 * Current library version, should match `package.json`
 */

BitArray.VERSION = '0.0.2'

/*!
 * Max length or size for a bit array (2^32 - 1)
 */

BitArray.max = Math.pow(2, 32) - 1

/*!
 * Utilities.
 */

/**
 * Factory method for help with Array.map calls
 *
 * @param {Buffer} buffer of 32bit integers
 * @param {Number} set length of bits
 * @return {BitArray} new BitArray instance
 */

BitArray.factory = function(x, len, oct) {
  return new BitArray(x, len, oct)
}

/**
 * Ensure the given array is in the form of an octet, or, has
 * a length with a multiple of 8, zero fill missing indexes
 *
 * @param {Array} target
 * @return {Array} zero filled octet array
 */

BitArray.octet = function(arr) {
  var len = arr.length
    , fill = len + (8 - len % 8)
  
  if (len !== 0 && len % 8 === 0) {
    return arr
  }
  for (var i = len; i < fill; i++) {
    arr[i] = 0
  }
  return arr
}

/**
 * Cast a 32bit integer or an array or buffer of 32bit integers into a bitmap 
 * array, ensuring that they are a full octet length if specified
 *
 * @param {Number|Array|Buffer} 32bit integer or array or buffer of 32bit ints
 * @param {Boolean} ensure octet
 * @return {Array} bitmap array
 */

BitArray.parse = function(x, oct) {
  var bits = []
    , tmp = x

  if (typeof x === 'undefined') {
    return bits
  }
  // Check for binary string
  if (typeof x === 'string') {
    for (var i = 0; i < x.length; i++) {
      bits.push(+x[i])
    }
    return bits.reverse()
  }
  // Check for single 32bit integer
  if (typeof x === 'number') {
    while (tmp > 0) {
      bits.push(tmp % 2)
      tmp = Math.floor(tmp / 2)
    }
    oct && (bits = BitArray.octet(bits))
    return bits.reverse()
  }
  // Check for direct bit array
  if (Array.isArray(x)) {
    return x
  }
  // Assumed to be array / buffer of 32bit integers
  for (var i = 0; i < x.length; i++) {
    bits = bits.concat(BitArray.parse(x[i], true))
  }
  return bits
}

/**
 * Perform an equality check on two bit arrays, they are equal if
 * all bits are the same
 *
 * @param {BitArray} first
 * @param {BitArray} second
 * @return {Boolean} equal
 */

BitArray.equals = function(a, b) {
  if (a.__bits.length !== b.__bits.length) return false
  for (var i = 0; i < a.__bits.length; i++) {
    if (a.__bits[i] !== b.__bits[i]) return false
  }
  return true
}

/*!
 * Instantiation methods.
 */

/**
 * Create a new BitArray instance from a binary string
 *
 * @param {String} binary data
 * @return {BitArray} new instance
 */

BitArray.fromBinary = function(str) {
  var bits = []
  for (var i = 0; i < str.length; i++) {
    bits.push(+str[i])
  }
  return new BitArray().set(bits.reverse())
}

/**
 * Create a new BitArray instance setting values from offsets
 *
 * @param {Array} offset positions
 * @return {BitArray} new instance
 */

BitArray.fromOffsets = function(offs) {
  var bits = new BitArray()
  for (var i = 0; i < offs.length; i++) {
    bits.set(offs[i], 1)
  }
  return bits
}

/**
 * Create a new BitArray instance converting from a base 10 number
 *
 * @param {Number|String} number value
 * @return {BitArray} new instance
 */

BitArray.fromDecimal =
BitArray.fromNumber = function(num) {
  var bits = [], tmp = +num
  while (tmp > 0) {
    bits.push(tmp % 2)
    tmp = Math.floor(tmp / 2)
  }
  return new BitArray().set(bits)
}

/**
 * Create a new BitArray instance converting from a base 16 number
 *
 * @param {Number|String} hexidecimal value
 * @return {BitArray} new instance
 */

BitArray.fromHex =
BitArray.fromHexadecimal = function(hex) {
  hex = ('' + hex).toLowerCase()
  if (!~(hex).indexOf('0x')) hex = '0x' + hex
  return BitArray.fromDecimal(+hex)
}

/**
 * Create a new BitArray instance from a 32bit integer
 *
 * @param {Number} 32bit integer
 * @return {BitArray} new instance
 */

BitArray.from32Integer = function(num) {
  var bits = []
    , tmp = num
  
  while (tmp > 0) {
    bits.push(tmp % 2)
    tmp = Math.floor(tmp / 2)
  }
  bits = BitArray.octet(bits)
  return new BitArray().set(bits.reverse())
}

/**
 * Create a new BitArray instance from a node Buffer
 *
 * @param {Buffer} buffer of 32bit integers
 * @return {BitArray} new instance
 */

BitArray.fromRedis =
BitArray.fromBuffer = function(buf) {
  var bits = []
  for (var i = 0; i < buf.length; i++) {
    bits = bits.concat(BitArray.from32Integer(buf[i]).toJSON())
  }
  return new BitArray().set(bits)
}

/**
 * Find the offsets of all flipped bits
 *
 * @param {Array} bit array
 * @return {Array} list of offsets
 */

BitArray.toOffsets = function(bits) {
  var offs = []
  for (var i = 0; i < bits.length; i++) {
    bits[i] === 1 && offs.push(i)
  }
  return offs
}

/*!
 * Output methods.
 */

/**
 * Convert a bit array to a node Buffer object
 *
 * @param {Array} bit array
 * @return {Buffer} buffer of 32bit integers
 */

BitArray.toBuffer = function(bits) {
  var buf = [], int32, tmp
  for (var i = 0; i < bits.length; i += 8) {
    int32 = 0
    tmp = bits.slice(i, i + 8)
    for (var k = 0; k < tmp.length; k++) {
      int32 = (int32 * 2) + tmp[k]
    }
    buf.push(int32)
  }
  return new Buffer(buf)
}

/**
 * Convert a bit array into a base 10 number
 *
 * @param {Array} bit array
 * @return {Number} base 10 conversion
 */

BitArray.toNumber = function(bits) {
  var num = 0
  for (var i = 0; i < bits.length; i++) {
    if (bits[i]) num += Math.pow(2, i)
  }
  return num
}

/**
 * Convert a bit array into hexadecimal
 *
 * @param {Array} bit array
 * @return {String} hexadecimal conversion
 */

BitArray.toHex =
BitArray.toHexadecimal = function(bits) {
  return BitArray.toNumber(bits).toString(16)
}

/*!
 * Bitwise operations.
 */

/**
 * Perform a bitwise intersection, `AND` of bit arrays
 *
 * @param {...} any number of bit arrays
 * @return {Array} intersected bit array
 */

BitArray.and =
BitArray.intersect = function() {
  var args = slice.call(arguments)
    , src = longest.apply(null, arguments)
    , len = args.length
    , bits = [], aLen

  for (var i = 0; i < src.length; i++) {
    aLen = args.filter(function(x) {
      return x[i] === 1
    }).length
    bits.push(aLen === len ? 1 : 0)
  }
  return bits
}

/**
 * Perform a bitwise union, `OR` of bit arrays
 *
 * @param {...} any number of bit arrays
 * @return {Array} unioned bit array
 */

BitArray.or =
BitArray.union = function() {
  var args = slice.call(arguments)
    , src = longest.apply(null, args)
    , bits = [], aLen

  for (var i = 0; i < src.length; i++) {
    aLen = args.filter(function(x) {
      return x[i] === 1
    }).length
    bits.push(aLen ? 1 : 0)
  }
  return bits
}

/**
 * Perform a bitwise difference, `XOR` of two bit arrays
 *
 * @param {...} any number of bit arrays
 * @return {Array} difference array
 */

BitArray.xor =
BitArray.difference = function() {
  var args = slice.call(arguments)
    , aLen = args.length
    , src = longest.apply(null, args)
    , bits = [], bLen

  for (var i = 0; i < src.length; i++) {
    var bit = src[i]
    bLen = args.filter(function(x) {
      return x[i] === 1
    }).length
    bits.push(bLen === 1 || bLen === aLen ? 1 : 0)
  }
  return bits
}

/**
 * Perform a bitwise `NOT` operation on a single bit array
 *
 * @param {Array} bit array
 * @return {Array} bit array
 */

BitArray.not = 
BitArray.reverse = function(arr) {
  var bits = []
  for (var i = 0; i < arr.length; i++) {
    bits.push(arr[i] === 1 ? 0 : 1)
  }
  return bits
}

/**
 * Find cardinality from a 32bit integer, a bit array, or a node buffer of 32bit
 * integers, which will buffer 4 octects at a time for performance increase.
 *
 * @param {Number|Array|Buffer} 32bit integer, bitarray, buffered 32bit integers
 * @return {Number} cardinality
 */

BitArray.count =
BitArray.population =
BitArray.bitcount =
BitArray.cardinality = function(x) {
  var val = 0
    , tmp = 0
  // Check for 32bit integer
  if (typeof x === 'number') {
    x -= ((x >> 1) & 0x55555555)
    x = (((x >> 2) & 0x33333333) + (x & 0x33333333))
    x = (((x >> 4) + x) & 0x0f0f0f0f)
    x += (x >> 8)
    x += (x >> 16)
    return(x & 0x0000003f)
  }
  // Check for array of bits
  if (Array.isArray(x)) {
    for (var i = 0; i < x.length; i++) {
      if (x[i]) val += 1
    }
    return val
  }
  // Assumed to be a buffer
  for (var i = 0; i < x.length ; i+=4) {
    tmp = x[i];
    tmp += x[i + 1] << 8
    tmp += x[i + 2] << 16
    tmp += x[i + 3] << 24
    val += BitArray.cardinality(tmp)
  }
  return val
}

/*!
 * Instance methods.
 */

/**
 * Zerofill the current bit array to a given offset
 *
 * @param {Number} offset index
 */

BitArray.prototype.fill = function(idx) {
  while (idx > this.__bits.length) {
    this.__bits.push(0)
  }
  return this
}

/**
 * Copy the current bits into a new BitArray instance
 *
 * @return {BitArray} cloned instance
 */

BitArray.prototype.clone =
BitArray.prototype.copy = function() {
  return new BitArray().set(this.toBits())
}

/**
 * Reset to factory defaults
 */

BitArray.prototype.clear =
BitArray.prototype.reset = function() {
  this.__bits = []
  this.__len && this.fill(this.__len)
  return this
}

/**
 * Perform an equality check against another bit array
 *
 * @param {BitArray} compare
 * @return {Boolean} equal
 */

BitArray.prototype.equals = function(b) {
  return BitArray.equals(this, b)
}

/**
 * Set the bit for a given offset
 *
 * @param {Number} offset index
 * @param {Number} bit value
 */

BitArray.prototype.set = function(idx, val) {
  if (Array.isArray(idx)) {
    this.__bits = idx
    this.__len && this.fill(this.__len)
    return this
  }
  this.fill(idx)
  this.__bits[idx] = val ? 1 : 0
  return this
}

/**
 * Get the bit at a given offset
 *
 * @param {Number} offset index
 * @param {Number} bit value
 */

BitArray.prototype.get = function(idx, val) {
  this.fill(idx)
  return this.__bits[idx]
}

/**
 * Find the cardinality of the current bit array
 *
 * @return {Number} cardinality
 */

BitArray.prototype.count =
BitArray.prototype.population =
BitArray.prototype.bitcount =
BitArray.prototype.cardinality = function() {
  return BitArray.cardinality(this.__bits)
}

/**
 * Find the offsets of all flipped bits
 *
 * @return {Array} list of offsets
 */

BitArray.prototype.toOffsets = function() {
  return BitArray.toOffsets(this.__bits)
}

/**
 * Get the binary value of the current bits
 *
 * @return {String} binary conversion
 */

BitArray.prototype.toString = function() {
  return this.__bits.slice().reverse().join('')
}

/**
 * Get the bitmap array of the current bits
 *
 * @return {Array} bit array
 */

BitArray.prototype.toBits =
BitArray.prototype.toArray =
BitArray.prototype.toJSON = function() {
  return this.__bits.slice()
}

/**
 * Convert the current bit array into a base 10 number
 *
 * @return {Number} base 10 conversion
 */

BitArray.prototype.valueOf =
BitArray.prototype.toNumber = function() {
  return BitArray.toNumber(this.__bits)
}

/**
 * Convert the current bit array into hexadecimal
 *
 * @return {String} hexadecimal conversion
 */

BitArray.prototype.toHex = function() {
  return BitArray.toHex(this.__bits)
}

/**
 * Convert the current bits into a node Buffer
 *
 * @return {Buffer} buffer of 32bit integers
 */

BitArray.prototype.toBuffer = function() {
  return BitArray.toBuffer(this.__bits)
}

/*!
 * Proxy all Array methods to the current bits
 */

methods.forEach(function(method) {
  BitArray.prototype[method] = function() {
    return Array.prototype[method].apply(this.__bits, arguments)
  }
})

/*!
 * Module exports.
 */

module.exports = BitArray

}).call(this,_dereq_("buffer").Buffer)
},{"buffer":5}],38:[function(_dereq_,module,exports){
// A fast streaming parser library.

var assert = _dereq_('assert');
var Buffer = _dereq_('buffer').Buffer;

// Buffer for parse() to handle types that span more than one buffer
var SPANNING_BUF = new Buffer(1024);

// Possibly call flush()
var maybeFlush = function(b, o, len, flush) {
    if (o + len > b.length) {
        if (typeof(flush) !== 'function') {
            throw new Error(
                'Buffer out of space and no valid flush() function found'
            );
        }

        flush(b, o);

        return 0;
    }

    return o;
};

// Sentinel types

var DEFER = {};
exports.DEFER = DEFER;

var DONE = {};
exports.DONE = DONE;

// Primitive types

var UINT8 = {
    len : 1,
    get : function(buf, off) {
        return buf[off];
    },
    put : function(b, o, v, flush) {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= 0 && v <= 0xff);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        var no = maybeFlush(b, o, this.len, flush);
        b[no] = v & 0xff;

        return (no - o) + this.len;
    }
};
exports.UINT8 = UINT8;

var UINT16_LE = {
    len : 2,
    get : function(buf, off) {
        return buf[off] | (buf[off + 1] << 8);
    },
    put : function(b, o, v, flush) {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= 0 && v <= 0xffff);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        var no = maybeFlush(b, o, this.len, flush);
        b[no] = v & 0xff;
        b[no + 1] = (v >>> 8) & 0xff;

        return (no - o) + this.len;
    }
};
exports.UINT16_LE = UINT16_LE;

var UINT16_BE = {
    len : 2,
    get : function(buf, off) {
        return (buf[off] << 8) | buf[off + 1];
    },
    put : function(b, o, v, flush) {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= 0 && v <= 0xffff);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        var no = maybeFlush(b, o, this.len, flush);
        b[no] = (v >>> 8) & 0xff;
        b[no + 1] = v & 0xff;

        return (no - o) + this.len;
    }
};
exports.UINT16_BE = UINT16_BE;

var UINT32_LE = {
    len : 4,
    get : function(buf, off) {
        // Shifting the MSB by 24 directly causes it to go negative if its
        // last bit is high, so we instead shift by 23 and multiply by 2.
        // Also, using binary OR to count the MSB if its last bit is high
        // causes the value to go negative. Use addition there.
        return (buf[off] | (buf[off + 1] << 8) | (buf[off + 2] << 16)) +
               ((buf[off + 3] << 23) * 2);
    },
    put : function(b, o, v, flush) {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= 0 && v <= 0xffffffff);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        var no = maybeFlush(b, o, this.len, flush);
        b[no] = v & 0xff;
        b[no + 1] = (v >>> 8) & 0xff;
        b[no + 2] = (v >>> 16) & 0xff;
        b[no + 3] = (v >>> 24) & 0xff;

        return (no - o) + this.len;
    }
};
exports.UINT32_LE = UINT32_LE;

var UINT32_BE = {
    len : 4,
    get : function(buf, off) {
        // See comments in UINT32_LE.get()
        return ((buf[off] << 23) * 2) +
               ((buf[off + 1] << 16) | (buf[off + 2] << 8) | buf[off + 3]);
    },
    put : function(b, o, v, flush) {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= 0 && v <= 0xffffffff);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        var no = maybeFlush(b, o, this.len, flush);
        b[no] = (v >>> 24) & 0xff;
        b[no + 1] = (v >>> 16) & 0xff;
        b[no + 2] = (v >>> 8) & 0xff;
        b[no + 3] = v & 0xff;

        return (no - o) + this.len;
    }
};
exports.UINT32_BE = UINT32_BE;

var INT8 = {
    len : 1,
    get : function(buf, off)  {
        var v = UINT8.get(buf, off);
        return ((v & 0x80) === 0x80) ?
            (-128 + (v & 0x7f)) :
            v;
    },
    put : function(b, o, v, flush) {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= -128 && v <= 127);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        var no = maybeFlush(b, o, this.len, flush);
        b[no] = v & 0xff;

        return (no - o) + this.len;
    }
};
exports.INT8 = INT8;

var INT16_BE = {
    len : 2,
    get : function(buf, off)  {
        var v = UINT16_BE.get(buf, off);
        return ((v & 0x8000) === 0x8000) ?
            (-32768 + (v & 0x7fff)) :
            v;
    },
    put : function(b, o, v, flush) {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= -32768 && v <= 32767);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        var no = maybeFlush(b, o, this.len, flush);
        b[no] = ((v & 0xffff) >>> 8) & 0xff;
        b[no + 1] = v & 0xff;

        return (no - o) + this.len;
    }
};
exports.INT16_BE = INT16_BE;

var INT32_BE = {
    len : 4,
    get : function(buf, off)  {
        // We cannot check for 0x80000000 directly, as this always returns
        // false. Instead, check for the two's-compliment value, which
        // behaves as expected. Also, we cannot subtract our value all at
        // once, so do it in two steps to avoid sign busting.
        var v = UINT32_BE.get(buf, off);
        return ((v & 0x80000000) === -2147483648) ?
            ((v & 0x7fffffff) - 1073741824 - 1073741824) :
            v;
    },
    put : function(b, o, v, flush) {
        assert.equal(typeof o, 'number');
        assert.equal(typeof v, 'number');
        assert.ok(v >= -2147483648 && v <= 2147483647);
        assert.ok(o >= 0);
        assert.ok(this.len <= b.length);

        var no = maybeFlush(b, o, this.len, flush);
        b[no] = (v >>> 24) & 0xff;
        b[no + 1] = (v >>> 16) & 0xff;
        b[no + 2] = (v >>> 8) & 0xff;
        b[no + 3] = v & 0xff;

        return (no - o) + this.len;
    }
};
exports.INT32_BE = INT32_BE;

// Complex types
//
// These types are intended to allow callers to re-use them by manipulating
// the 'len' and other properties directly.

var IgnoreType = function(l) {
  this.len = l;
  this.get = function() {
    return null;
  };
};
exports.IgnoreType = IgnoreType;


var BufferType = function(l) {
    var self = this;

    self.len = l;

    self.get = function(buf, off) {
        return buf.slice(off, off + this.len);
    };
};
exports.BufferType = BufferType;

var StringType = function(l, e) {
    var self = this;

    self.len = l;

    self.encoding = e;

    self.get = function(buf, off) {
        return buf.toString(e, off, off + this.len);
    };
};
exports.StringType = StringType;

// Parse a stream
var parse = function(s, cb) {
    // Type of data that we're to parse next; if DEFER, we're awaiting
    // an invocation of typeCallback
    var type = DEFER;

    // Data that we've seen but not yet processed / handed off to cb; first
    // valid byte to process is always bufs[0][bufOffset]
    var bufs = [];
    var bufsLen = 0;
    var bufOffset = 0;
    var ignoreLen = 0;

    // Callback for FSM to tell us what type to expect next
    var typeCallback = function(t) {
        if (type !== DEFER) {
            throw new Error('refusing to overwrite non-DEFER type');
        }

        type = t;

        emitData();
    };

    // Process data that we have accumulated so far, emitting any type(s)
    // collected. This is the main parsing loop.
    //
    // Out strategy for handling buffers is to shift them off of the bufs[]
    // array until we have enough accumulated to account for type.len bytes.
    var emitData = function() {
        var b;
        while (type !== DONE && type !== DEFER && bufsLen >= type.len) {
            b = bufs[0];
            var bo = bufOffset;

            assert.ok(bufOffset >= 0 && bufOffset < b.length);

            if ((b.length - bufOffset) < type.len) {
                if (SPANNING_BUF.length < type.len) {
                    SPANNING_BUF = new Buffer(
                        Math.pow(2, Math.ceil(Math.log(type.len) / Math.log(2)))
                    );
                }

                b = SPANNING_BUF;
                bo = 0;

                var bytesCopied = 0;
                while (bytesCopied < type.len && bufs.length > 0) {
                    var bb = bufs[0];
                    var copyLength = Math.min(type.len - bytesCopied, bb.length - bufOffset);

                    // TODO: Manually copy bytes if we don't need many of them.
                    //       Bouncing down into C++ land to invoke
                    //       Buffer.copy() is expensive enough that we
                    //       shouldnt' do it unless we have a lot of dato to
                    //       copy.
                    bb.copy(
                        b,
                        bytesCopied,
                        bufOffset,
                        bufOffset + copyLength
                    );

                    bytesCopied += copyLength;

                    if (copyLength < (bb.length - bufOffset)) {
                        assert.equal(bytesCopied, type.len);
                        bufOffset += copyLength;
                    } else {
                        assert.equal(bufOffset + copyLength, bb.length);
                        bufs.shift();
                        bufOffset = 0;
                    }
                }

                assert.equal(bytesCopied, type.len);
            } else if ((b.length - bufOffset) === type.len) {
                bufs.shift();
                bufOffset = 0;
            } else {
                bufOffset += type.len;
            }

            bufsLen -= type.len;
            type = cb(type.get(b, bo), typeCallback);
            if (type instanceof IgnoreType) {
              ignoreLen += type.len;
              if (ignoreLen >= bufsLen) {
                // clear all buffers
                ignoreLen -= bufsLen;
                bufsLen = 0;
                bufs = [];
                bufOffset = 0;
              } else if (ignoreLen < bufs[0].length - bufOffset) {
                // set bufOffset correctly
                bufsLen -= ignoreLen;
                bufOffset += ignoreLen;
                ignoreLen = 0;
              } else if (bufsLen > 0) {
                // shift some buffers and set bufOffset correctly.
                bufsLen -= ignoreLen;
                ignoreLen += bufOffset;
                while (ignoreLen >= bufs[0].length) {
                  ignoreLen -= bufs.shift().length;
                }
                bufOffset = ignoreLen;
                ignoreLen = 0;
              }
              type = cb(type.get(), typeCallback);
            }
        }

        if (type === DONE) {
            s.removeListener('data', dataListener);

            // Pump all of the buffers that we already saw back through the
            // stream; the protocol layer will have set up listeners for this
            // event if it cares about the remaining data.
            while (bufs.length > 0) {
                b = bufs.shift();

                if (bufOffset > 0) {
                    b = b.slice(bufOffset, b.length);
                    bufOffset = 0;
                }

                s.emit('data', b);
            }
        }
    };

    // Listen for data from our stream
    var dataListener = function(d) {
        if (d.length <= ignoreLen) {
          // ignore this data
          assert.strictEqual(bufsLen, 0);
          assert.strictEqual(bufs.length, 0);
          ignoreLen -= d.length;
        } else if (ignoreLen > 0) {
          assert.strictEqual(bufsLen, 0);
          bufsLen = d.length - ignoreLen;
          bufs.push(d.slice(ignoreLen));
          ignoreLen = 0;
          emitData();
        } else {
          bufs.push(d);
          bufsLen += d.length;
          emitData();
        }
    };

    // Get the initial type
    type = cb(undefined, typeCallback);
    if (type !== DONE) {
        s.on('data', dataListener);
    }
};
exports.parse = parse;

},{"assert":2,"buffer":5}],39:[function(_dereq_,module,exports){
(function (process){
var Stream = _dereq_('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data == null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this,_dereq_("/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/leetreveil/.npm-packages/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":10,"stream":12}]},{},[22])
(22)
});