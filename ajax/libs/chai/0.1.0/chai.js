
// CommonJS require()

function require(p){
    var path = require.resolve(p)
      , mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  }

require.modules = {};

require.resolve = function (path){
    var orig = path
      , reg = path + '.js'
      , index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  };

require.register = function (path, fn){
    require.modules[path] = fn;
  };

require.relative = function (parent) {
    return function(p){
      if ('.' != p[0]) return require(p);

      var path = parent.split('/')
        , segs = p.split('/');
      path.pop();

      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }

      return require(path.join('/'));
    };
  };


require.register("assertion.js", function(module, exports, require){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * Primarily a refactor of: should.js
 * https://github.com/visionmedia/should.js
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var AssertionError = require('./error')
  , eql = require('./utils/eql')
  , inspect = require('./utils/inspect');

module.exports = Assertion;

function Assertion (obj, msg) {
  this.obj = obj;
  this.msg = msg;
}

Assertion.prototype.assert = function (expr, msg, negateMsg) {
  var msg = (this.msg ? this.msg + ': ' : '') + (this.negate ? negateMsg : msg)
    , ok = this.negate ? !expr : expr;

  if (!ok) {
    throw new AssertionError({
      message: msg,
      startStackFunction: this.assert
    });
  }
};

Assertion.prototype.__defineGetter__('inspect', function () {
  return inspect(this.obj);
});

Assertion.prototype.__defineGetter__('arguments', function () {
  this.assert(
      '[object Arguments]' == Object.prototype.toString.call(this.obj)
    , 'expected ' + this.inspect + ' to be arguments'
    , 'expected ' + this.inspect + ' to not be arguments');

  return this;
});

Assertion.prototype.__defineGetter__('to', function () {
  return this;
});

Assertion.prototype.__defineGetter__('be', function () {
  return this;
});

Assertion.prototype.__defineGetter__('an', function () {
  return this;
});

Assertion.prototype.__defineGetter__('is', function () {
  return this;
});

Assertion.prototype.__defineGetter__('and', function () {
  return this;
});

Assertion.prototype.__defineGetter__('have', function () {
  return this;
});

Assertion.prototype.__defineGetter__('include', function () {
  this.includes = true;
  return this;
});

Assertion.prototype.__defineGetter__('with', function () {
  return this;
});

Assertion.prototype.__defineGetter__('not', function () {
  this.negate = true;
  return this;
});

Assertion.prototype.__defineGetter__('ok', function () {
  this.assert(
      this.obj
    , 'expected ' + this.inspect + ' to be truthy'
    , 'expected ' + this.inspect + ' to be falsey');

  return this;
});

Assertion.prototype.__defineGetter__('true', function () {
  this.assert(
      true === this.obj
    , 'expected ' + this.inspect + ' to be true'
    , 'expected ' + this.inspect + ' to be false');

  return this;
});

Assertion.prototype.__defineGetter__('false', function () {
  this.assert(
      false === this.obj
    , 'expected ' + this.inspect + ' to be false'
    , 'expected ' + this.inspect + ' to be true');

  return this;
});

Assertion.prototype.__defineGetter__('exist', function () {
  this.assert(
      null != this.obj
    , 'expected ' + this.inspect + ' to exist'
    , 'expected ' + this.inspect + ' to not exist');

  return this;
});

Assertion.prototype.__defineGetter__('empty', function () {
  new Assertion(this.obj).to.have.property('length');

  this.assert(
      0 === this.obj.length
    , 'expected ' + this.inspect + ' to be empty'
    , 'expected ' + this.inspect + ' not to be empty');

  return this;
});

Assertion.prototype.equal = function (val) {
  this.assert(
      val === this.obj
    , 'expected ' + this.inspect + ' to equal ' + inspect(val)
    , 'expected ' + this.inspect + ' to not equal ' + inspect(val));

  return this;
};

Assertion.prototype.eql = function (obj) {
  this.assert(
      eql(obj, this.obj)
    , 'expected ' + this.inspect + ' to equal ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not equal ' + inspect(obj));
  return this;
};

Assertion.prototype.above = function (val) {
  this.assert(
      this.obj > val
    , 'expected ' + this.inspect + ' to be above ' + val
    , 'expected ' + this.inspect + ' to be below ' + val);

  return this;
};

Assertion.prototype.below = function (val) {
  this.assert(
      this.obj < val
    , 'expected ' + this.inspect + ' to be below ' + val
    , 'expected ' + this.inspect + ' to be above ' + val);

  return this;
};

Assertion.prototype.a = function (type) {
  this.assert(
      type == typeof this.obj
    , 'expected ' + this.inspect + ' to be a ' + type
    , 'expected ' + this.inspect + ' not to be a ' + type);

  return this;
};

Assertion.prototype.instanceof = function (constructor) {
  var name = constructor.name;
  this.assert(
      this.obj instanceof constructor
    , 'expected ' + this.inspect + ' to be an instance of ' + name
    , 'expected ' + this.inspect + ' to not be an instance of ' + name);

  return this;
};

Assertion.prototype.respondTo = function (method) {
  this.assert(
    'function' == typeof this.obj[method]
    , 'expected ' + this.inspect + ' to respond to ' + method + '()'
    , 'expected ' + this.inspect + ' to not respond to ' + method + '()');

  return this;
}

Assertion.prototype.property = function (name, val) {
  if (this.negate && undefined !== val) {
    if (undefined === this.obj[name]) {
      throw new Error(this.inspect + ' has no property ' + inspect(name));
    }
  } else {
    this.assert(
        undefined !== this.obj[name]
      , 'expected ' + this.inspect + ' to have a property ' + inspect(name)
      , 'expected ' + this.inspect + ' to not have property ' + inspect(name));
  }

  if (undefined !== val) {
    this.assert(
        val === this.obj[name]
      , 'expected ' + this.inspect + ' to have a property ' + inspect(name) + ' of ' +
          inspect(val) + ', but got ' + inspect(this.obj[name])
      , 'expected ' + this.inspect + ' to not have a property ' + inspect(name) + ' of ' +  inspect(val));
  }

  this.obj = this.obj[name];
  return this;
};

Assertion.prototype.ownProperty = function (name) {
  this.assert(
      this.obj.hasOwnProperty(name)
    , 'expected ' + this.inspect + ' to have own property ' + inspect(name)
    , 'expected ' + this.inspect + ' to not have own property ' + inspect(name));
  return this;
};

Assertion.prototype.length = function (n) {
  new Assertion(this.obj).to.have.property('length');
  var len = this.obj.length;

  this.assert(
      len == n
    , 'expected ' + this.inspect + ' to have a length of ' + n + ' but got ' + len
    , 'expected ' + this.inspect + ' to not have a length of ' + len);

  return this;
};

Assertion.prototype.match = function (re) {
  this.assert(
      re.exec(this.obj)
    , 'expected ' + this.inspect + ' to match ' + re
    , 'expected ' + this.inspect + ' not to match ' + re);

  return this;
};

Assertion.prototype.contain = function (obj) {
  new Assertion(this.obj).to.be.an.instanceof(Array);

  this.assert(
      ~this.obj.indexOf(obj)
    , 'expected ' + this.inspect + ' to contain ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not contain ' + inspect(obj));

  return this;
};

Assertion.prototype.within = function (start, finish) {
  var range = start + '..' + finish;

  this.assert(
      this.obj >= start && this.obj <= finish
    , 'expected ' + this.inspect + ' to be within ' + range
    , 'expected ' + this.inspect + ' to not be within ' + range);

  return this;
};

Assertion.prototype.greaterThan = function (val) {
  this.assert(
      this.obj > val
    , 'expected ' + this.inspect + ' to be greater than ' + inspect(val)
    , 'expected ' + this.inspect + ' to not be greater than ' + inspect(val));

  return this;
};

Assertion.prototype.string = function (str) {
  new Assertion(this.obj).is.a('string');

  this.assert(
      ~this.obj.indexOf(str)
    , 'expected ' + this.inspect + ' to include ' + inspect(str)
    , 'expected ' + this.inspect + ' to not include ' + inspect(str));

  return this;
};

Assertion.prototype.object = function(obj){
  new Assertion(this.obj).is.a('object');

  var included = true;

  for (var key in obj) {
    if (obj.hasOwnProperty(key) && !eql(obj[key], this.obj[key])) {
      included = false;
      break;
    }
  }

  this.assert(
      included
    , 'expected ' + this.inspect + ' to include ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not include ' + inspect(obj));

  return this;
}

Assertion.prototype.keys = function(keys) {
  var str
    , ok = true;

  keys = keys instanceof Array
    ? keys
    : Array.prototype.slice.call(arguments);

  if (!keys.length) throw new Error('keys required');

  var actual = Object.keys(this.obj)
    , len = keys.length;

  // Inclusion
  ok = keys.every(function(key){
    return ~actual.indexOf(key);
  });

  // Strict
  if (!this.negate && !this.includes) {
    ok = ok && keys.length == actual.length;
  }

  // Key string
  if (len > 1) {
    keys = keys.map(function(key){
      return inspect(key);
    });
    var last = keys.pop();
    str = keys.join(', ') + ', and ' + last;
  } else {
    str = inspect(keys[0]);
  }

  // Form
  str = (len > 1 ? 'keys ' : 'key ') + str;

  // Have / include
  str = (this.includes ? 'include ' : 'have ') + str;

  // Assertion
  this.assert(
      ok
    , 'expected ' + this.inspect + ' to ' + str
    , 'expected ' + this.inspect + ' to not ' + str);

  return this;
}

Assertion.prototype.throw = function (constructor) {
  new Assertion(this.obj).is.a('function');

  constructor = constructor || Error;
  var name = constructor.name
    , thrown = false;

  try {
    this.obj();
  } catch (err) {
    thrown = true;
    this.assert(
        err instanceof constructor
      , 'expected ' + this.inspect + ' to throw ' + name
      , 'expected ' + this.inspect + ' to not throw ' + name);
    return this;
  }

  this.assert(
      thrown === true
    , 'expected ' + this.inspect + ' to throw ' + name
    , 'expected ' + this.inspect + ' to not throw ' + name);
};

/**
 * Aliases.
 */

(function alias(name, as){
  Assertion.prototype[as] = Assertion.prototype[name];
  return alias;
})
('length', 'lengthOf')
('keys', 'key')
('ownProperty', 'haveOwnProperty')
('above', 'greaterThan')
('below', 'lessThan');
}); // module: assertion.js

require.register("chai.js", function(module, exports, require){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var exports = module.exports = {};

exports.version = '0.1.0';

exports.expect = require('./interface/expect');
exports.assert = require('./interface/assert');
exports.should = require('./interface/should');


exports.Assertion = require('./assertion');
exports.AssertionError = require('./error');

exports.fail = function (actual, expected, message, operator, stackStartFunction) {
  throw new exports.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}
}); // module: chai.js

require.register("error.js", function(module, exports, require){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var fail = require('./chai').fail;

module.exports = AssertionError;

/*!
 * Inspired by node.js assert module
 * https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/assert.js
 */
function AssertionError (options) {
  options = options || {};
  this.name = 'AssertionError';
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
}

AssertionError.prototype.__proto__ = Error.prototype;

AssertionError.prototype.summary = function() {
  return this.name + (this.message ? ': ' + this.message : '');
};

AssertionError.prototype.details = function() {
  return 'In "' + this.operator + '":\n\tExpected: ' + this.expected + '\n\tFound: ' + this.actual;
};

AssertionError.prototype.toString = function() {
  return this.summary();
};
}); // module: error.js

require.register("interface/assert.js", function(module, exports, require){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var Assertion = require('../assertion');

var assert = module.exports = {};

assert.ok = function (val, msg) {
  new Assertion(val, msg).is.ok;
};

assert.equal = function (act, exp, msg) {
  new Assertion(act, msg).to.equal(exp);
};

assert.notEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.not.equal(exp);
};

assert.deepEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.eql(exp);
};

assert.notDeepEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.not.eql(exp);
};

assert.isTrue = function (val, msg) {
  new Assertion(val, msg).is.true;
};

assert.isFalse = function (val, msg) {
  new Assertion(val, msg).is.false;
};

assert.isNull = function (val, msg) {
  new Assertion(val, msg).to.not.exist;
};

assert.isNotNull = function (val, msg) {
  new Assertion(val, msg).to.exist;
};

assert.isUndefined = function (val, msg) {
  new Assertion(val, msg).to.equal(undefined);
};

assert.isNan = function (val, msg) {
  new Assertion(val, msg).to.not.equal(val);
};

assert.isFunction = function (val, msg) {
  new Assertion(val, msg).to.be.a('function');
};

assert.isObject = function (val, msg) {
  new Assertion(val, msg).to.be.an('object');
};

assert.isString = function (val, msg) {
  new Assertion(val, msg).to.be.a('string');
};

assert.isArray = function (val, msg) {
  new Assertion(val, msg).to.be.instanceof(Array);
};

assert.isNumber = function (val, msg) {
  new Assertion(val, msg).to.be.instanceof(Number);
};

assert.isBoolean = function (val, msg) {
  new Assertion(val, msg).to.be.a('boolean');
};

assert.typeOf = function (val, type, msg) {
  new Assertion(val, msg).to.be.a(type);
};

assert.instanceOf = function (val, type, msg) {
  new Assertion(val, msg).to.be.instanceof(type);
};

assert.include = function (exp, inc, msg) {
  new Assertion(exp, msg).to.include(inc);
};

assert.match = function (exp, re, msg) {
  new Assertion(exp, msg).to.match(re);
};

assert.length = function (exp, len, msg) {
  new Assertion(exp, msg).to.have.length(len);
};

assert.throws = function (fn, type, msg) {
  new Assertions(fn, msg).to.throw(type);
};
}); // module: interface/assert.js

require.register("interface/expect.js", function(module, exports, require){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var Assertion = require('../assertion');

module.exports = function (val, message) {
  return new Assertion(val, message);
};
}); // module: interface/expect.js

require.register("interface/should.js", function(module, exports, require){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var Assertion = require('../assertion');

/**
 * Expose api via `Object#should`.
 *
 * @api public
 */

module.exports = function () {

  /*!
   * Originally from: should.js
   * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
   * MIT Licensed
   */
  Object.defineProperty(Object.prototype, 'should', {
    set: function(){},
    get: function(){
      return new Assertion(this);
    },
    configurable: true
  });

  var should = {};

  should.equal = function (val1, val2) {
    new Assertion(val1).to.equal(val2);
  };

  return should;
};
}); // module: interface/should.js

require.register("utils/eql.js", function(module, exports, require){
// This is directly from Node.js assert
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/assert.js


module.exports = _deepEqual;

// For browser implementation
if (!Buffer) {
  var Buffer = {
    isBuffer: function () {
      return false;
    }
  };
}

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return actual === expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
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
    return _deepEqual(a, b);
  }
  try {
    var ka = Object.keys(a),
        kb = Object.keys(b),
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
}); // module: utils/eql.js

require.register("utils/inspect.js", function(module, exports, require){
// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

module.exports = inspect;

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function (str) { return str; }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    return value.inspect(recurseTimes);
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var visibleKeys = Object.keys(value);
  var keys = ctx.showHidden ? Object.getOwnPropertyNames(value) : visibleKeys;

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (typeof value === 'function') {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
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
  if (typeof value === 'function') {
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
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
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
  var name, str;
  if (value.__lookupGetter__) {
    if (value.__lookupGetter__(key)) {
      if (value.__lookupSetter__(key)) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (value.__lookupSetter__(key)) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
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
  if (typeof name === 'undefined') {
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
    return prev + cur.length + 1;
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

function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}

function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}

function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
}); // module: utils/inspect.js
chai = require('chai');

expect = chai.expect;
assert = chai.assert;

