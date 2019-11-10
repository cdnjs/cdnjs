/*
 * should - test framework agnostic BDD-style assertions
 * @version v5.0.0
 * @author TJ Holowaychuk <tj@vision-media.ca> and contributors
 * @link https://github.com/shouldjs/should.js
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Should=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */


var util = require('./util');

/**
 * Our function should
 *
 * @param {*} obj Object to assert
 * @returns {should.Assertion} Returns new Assertion for beginning assertion chain
 * @example
 *
 * var should = require('should');
 * should('abc').be.a.string;
 */
var should = function should(obj) {
  return (new should.Assertion(obj)).proxied();
};

should.AssertionError = require('./assertion-error');
should.Assertion = require('./assertion');

should.format = require('should-format');
should.type = require('should-type');

/**
 * Object with configuration.
 * It contains such properties:
 * * `checkProtoEql` boolean - Affect if `.eql` will check objects prototypes
 * * `useOldDeepEqual` boolean - Use old deepEqual implementation, that was copied from node's assert.deepEqual (will be removed in 5.x)
 *
 * @type {Object}
 * @memberOf should
 * @static
 * @example
 *
 * var a = { a: 10 }, b = Object.create(null);
 * b.a = 10;
 *
 * a.should.be.eql(b);
 * //not throws
 *
 * should.config.checkProtoEql = true;
 * a.should.be.eql(b);
 * //throws AssertionError: expected { a: 10 } to equal { a: 10 } (because A and B have different prototypes)
 */
should.config = require('./config');

//Expose should to external world.
exports = module.exports = should;

/**
 * Allow to extend given prototype with should property using given name. This getter will **unwrap** all standard wrappers like `Number`, `Boolean`, `String`.
 * Using `should(obj)` is the equivalent of using `obj.should` with known issues (like nulls and method calls etc).
 *
 * @param {string} [propertyName] Name of property to add. Default is `'should'`.
 * @param {Object} [proto] Prototype to extend with. Default is `Object.prototype`.
 * @memberOf should
 * @returns {{ name: string, descriptor: Object, proto: Object }} Descriptor enough to return all back
 * @static
 * @example
 *
 * var prev = should.extend('must', Object.prototype);
 *
 * 'abc'.must.startWith('a');
 *
 * var should = should.noConflict(prev);
 * should.not.exist(Object.prototype.must);
 */
should.extend = function(propertyName, proto) {
  propertyName = propertyName || 'should';
  proto = proto || Object.prototype;

  var prevDescriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

  Object.defineProperty(proto, propertyName, {
    set: function() {
    },
    get: function() {
      return should(util.isWrapperType(this) ? this.valueOf() : this);
    },
    configurable: true
  });

  return { name: propertyName, descriptor: prevDescriptor, proto: proto };
};

/**
 * Delete previous extension. If `desc` missing it will remove default extension.
 *
 * @param {{ name: string, descriptor: Object, proto: Object }} [desc] Returned from `should.extend` object
 * @memberOf should
 * @returns {Function} Returns should function
 * @static
 * @example
 *
 * var should = require('should').noConflict();
 *
 * should(Object.prototype).not.have.property('should');
 *
 * var prev = should.extend('must', Object.prototype);
 * 'abc'.must.startWith('a');
 * should.noConflict(prev);
 *
 * should(Object.prototype).not.have.property('must');
 */
should.noConflict = function(desc) {
  desc = desc || prevShould;

  if(desc) {
    delete desc.proto[desc.name];

    if(desc.descriptor) {
      Object.defineProperty(desc.proto, desc.name, desc.descriptor);
    }
  }
  return should;
};

/**
 * Simple utility function for a bit more easier should assertion extension
 * @param {Function} f So called plugin function. It should accept 2 arguments: `should` function and `Assertion` constructor
 * @memberOf should
 * @returns {Function} Returns `should` function
 * @static
 * @example
 *
 * should.use(function(should, Assertion) {
 *   Assertion.add('asset', function() {
 *      this.params = { operator: 'to be asset' };
 *
 *      this.obj.should.have.property('id').which.is.a.Number;
 *      this.obj.should.have.property('path');
 *  })
 * })
 */
should.use = function(f) {
  f(should, should.Assertion);
  return this;
};

should
  .use(require('./ext/assert'))
  .use(require('./ext/chain'))
  .use(require('./ext/bool'))
  .use(require('./ext/number'))
  .use(require('./ext/eql'))
  .use(require('./ext/type'))
  .use(require('./ext/string'))
  .use(require('./ext/property'))
  .use(require('./ext/error'))
  .use(require('./ext/match'))
  .use(require('./ext/contain'));


var defaultProto = Object.prototype;
var defaultProperty = 'should';

//Expose api via `Object#should`.
var prevShould = should.extend(defaultProperty, defaultProto);

},{"./assertion":3,"./assertion-error":2,"./config":4,"./ext/assert":6,"./ext/bool":7,"./ext/chain":8,"./ext/contain":9,"./ext/eql":10,"./ext/error":11,"./ext/match":12,"./ext/number":13,"./ext/property":14,"./ext/string":15,"./ext/type":16,"./util":17,"should-format":19,"should-type":20}],2:[function(require,module,exports){
var util = require('./util');
var format = require('should-format');

/**
 * should AssertionError
 * @param {Object} options
 * @constructor
 * @memberOf should
 * @static
 */
var AssertionError = function AssertionError(options) {
  util.merge(this, options);

  if(!options.message) {
    Object.defineProperty(this, 'message', {
        get: function() {
          if(!this._message) {
            this._message = this.generateMessage();
            this.generatedMessage = true;
          }
          return this._message;
        },
        configurable: true,
        enumerable: false
      }
    )
  }

  if(Error.captureStackTrace) {
    Error.captureStackTrace(this, this.stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if(err.stack) {
      var out = err.stack;

      if(this.stackStartFunction) {
        // try to strip useless frames
        var fn_name = util.functionName(this.stackStartFunction);
        var idx = out.indexOf('\n' + fn_name);
        if(idx >= 0) {
          // once we have located the function frame
          // we need to strip out everything before it (and its line)
          var next_line = out.indexOf('\n', idx + 1);
          out = out.substring(next_line + 1);
        }
      }

      this.stack = out;
    }
  }
};


var indent = '    ';
function prependIndent(line) {
  return indent + line;
}

function indentLines(text) {
  return text.split('\n').map(prependIndent).join('\n');
}


// assert.AssertionError instanceof Error
AssertionError.prototype = Object.create(Error.prototype, {
  name: {
    value: 'AssertionError'
  },

  generateMessage: {
    value: function() {
      if(!this.operator && this.previous) {
        return this.previous.message;
      }
      var actual = format(this.actual);
      var expected = 'expected' in this ? ' ' + format(this.expected) : '';
      var details = 'details' in this && this.details ? ' (' + this.details + ')' : '';

      var previous = this.previous ? '\n' + indentLines(this.previous.message) : '';

      return 'expected ' + actual + (this.negate ? ' not ' : ' ') + this.operator + expected + details + previous;
    }
  }
});

module.exports = AssertionError;
},{"./util":17,"should-format":19}],3:[function(require,module,exports){
var AssertionError = require('./assertion-error');
var util = require('./util');
var format = require('should-format');

/**
 * should Assertion
 * @param {*} obj Given object for assertion
 * @constructor
 * @memberOf should
 * @static
 */
function Assertion(obj) {
  this.obj = obj;

  this.anyOne = false;
  this.negate = false;

  this.params = {actual: obj};
}

/**
 * Way to extend Assertion function. It uses some logic
 * to define only positive assertions and itself rule with negative assertion.
 *
 * All actions happen in subcontext and this method take care about negation.
 * Potentially we can add some more modifiers that does not depends from state of assertion.
 * @memberOf Assertion
 * @category assertion
 * @static
 * @param {String} name Name of assertion. It will be used for defining method or getter on Assertion.prototype
 * @param {Function} func Function that will be called on executing assertion
 * @param {Boolean} [isGetter] If this assertion is getter. By default it is false.
 * @example
 *
 * Assertion.add('asset', function() {
 *      this.params = { operator: 'to be asset' };
 *
 *      this.obj.should.have.property('id').which.is.a.Number;
 *      this.obj.should.have.property('path');
 * });
 */
Assertion.add = function(name, func, isGetter) {
  var prop = {enumerable: true, configurable: true};

  isGetter = !!isGetter;

  prop[isGetter ? 'get' : 'value'] = function() {
    var context = new Assertion(this.obj, this, name);
    context.anyOne = this.anyOne;

    try {
      func.apply(context, arguments);
    } catch(e) {
      //check for fail
      if(e instanceof AssertionError) {
        //negative fail
        if(this.negate) {
          this.obj = context.obj;
          this.negate = false;
          return this.proxied();
        }

        //console.log('catch', name, context.params.operator, e.operator);
        //console.log(name, e.actual, context.obj, context.params.actual, this.params.actual);
        /*if(e.operator !== context.params.operator) {// it means assertion happen because own context
         if(!('obj' in context.params)) {
         if(!('actual' in context.params)) {
         context.params.actual = context.obj;
         }
         }
         util.merge(e, context.params);
         //e.operato
         //e.operator = context.params.operator;
         }*/
        if(context != e.assertion) {
          context.params.previous = e;
        }

        //positive fail
        context.negate = false;
        context.fail();
      }
      // throw if it is another exception
      throw e;
    }

    //negative pass
    if(this.negate) {
      context.negate = true;//because .fail will set negate
      context.params.details = "false negative fail";
      context.fail();
    }

    //positive pass
    if(!this.params.operator) this.params = context.params;//shortcut
    this.obj = context.obj;
    this.negate = false;
    return this.proxied();
  };

  Object.defineProperty(Assertion.prototype, name, prop);
};

Assertion.addChain = function(name, onCall) {
  onCall = onCall || function() {
  };
  Object.defineProperty(Assertion.prototype, name, {
    get: function() {
      onCall();
      return this.proxied();
    },
    enumerable: true
  });
};

/**
 * Create alias for some `Assertion` property
 *
 * @memberOf Assertion
 * @category assertion
 * @static
 * @param {String} from Name of to map
 * @param {String} to Name of alias
 * @example
 *
 * Assertion.alias('true', 'True');
 */
Assertion.alias = function(from, to) {
  var desc = Object.getOwnPropertyDescriptor(Assertion.prototype, from);
  if(!desc) throw new Error('Alias ' + from + ' -> ' + to + ' could not be created as ' + from + ' not defined');
  Object.defineProperty(Assertion.prototype, to, desc);
};

Assertion.prototype = {
  constructor: Assertion,

  /**
   * Base method for assertions. Before calling this method need to fill Assertion#params object. This method usually called from other assertion methods.
   * `Assertion#params` can contain such properties:
   * * `operator` - required string containing description of this assertion
   * * `obj` - optional replacement for this.obj, it usefull if you prepare more clear object then given
   * * `message` - if this property filled with string any others will be ignored and this one used as assertion message
   * * `expected` - any object used when you need to assert relation between given object and expected. Like given == expected (== is a relation)
   * * `details` - additional string with details to generated message
   *
   * @memberOf Assertion
   * @category assertion
   * @param {*} expr Any expression that will be used as a condition for asserting.
   * @example
   *
   * var a = new should.Assertion(42);
   *
   * a.params = {
   *  operator: 'to be magic number',
   * }
   *
   * a.assert(false);
   * //throws AssertionError: expected 42 to be magic number
   */
  assert: function(expr) {
    if(expr) return this.proxied();

    var params = this.params;

    if('obj' in params && !('actual' in params)) {
      params.actual = params.obj;
    } else if(!('obj' in params) && !('actual' in params)) {
      params.actual = this.obj;
    }

    params.stackStartFunction = params.stackStartFunction || this.assert;
    params.negate = this.negate;

    params.assertion = this;

    throw new AssertionError(params);
  },

  /**
   * Shortcut for `Assertion#assert(false)`.
   *
   * @memberOf Assertion
   * @category assertion
   * @example
   *
   * var a = new should.Assertion(42);
   *
   * a.params = {
   *  operator: 'to be magic number',
   * }
   *
   * a.fail();
   * //throws AssertionError: expected 42 to be magic number
   */
  fail: function() {
    return this.assert(false);
  },

  /**
   * Negation modifier. Current assertion chain become negated. Each call invert negation on current assertion.
   *
   * @memberOf Assertion
   * @category assertion
   */
  get not() {
    this.negate = !this.negate;
    return this.proxied();
  },

  /**
   * Any modifier - it affect on execution of sequenced assertion to do not `check all`, but `check any of`.
   *
   * @memberOf Assertion
   * @category assertion
   */
  get any() {
    this.anyOne = true;
    return this.proxied();
  },

  proxied: function() {
    if(typeof Proxy == 'function') {
      return new Proxy(this, {
        get: function(target, name) {
          if(name in target) {
            return target[name];
          } else {
            throw new Error('Assertion has no property ' + util.formatProp(name));
          }
        }
      })
    }
    return this;
  }
};

module.exports = Assertion;
},{"./assertion-error":2,"./util":17,"should-format":19}],4:[function(require,module,exports){
var config = {
  checkProtoEql: false
};

module.exports = config;
},{}],5:[function(require,module,exports){
// implement assert interface using already written peaces of should.js

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
var util = require('./../util');
var Assertion = require('./../assertion');

var _deepEqual = require('should-equal');

var pSlice = Array.prototype.slice;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.
/**
 * Node.js standard [`assert.fail`](http://nodejs.org/api/assert.html#assert_assert_fail_actual_expected_message_operator).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual Actual object
 * @param {*} expected Expected object
 * @param {string} message Message for assertion
 * @param {string} operator Operator text
 */
function fail(actual, expected, message, operator, stackStartFunction) {
  var a = new Assertion(actual);
  a.params = {
    operator: operator,
    expected: expected,
    message: message,
    stackStartFunction: stackStartFunction || fail
  };

  a.fail();
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.
/**
 * Node.js standard [`assert.ok`](http://nodejs.org/api/assert.html#assert_assert_value_message_assert_ok_value_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} value
 * @param {string} [message]
 */
function ok(value, message) {
  if(!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

/**
 * Node.js standard [`assert.equal`](http://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.equal = function equal(actual, expected, message) {
  if(actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.notEqual`](http://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.notEqual = function notEqual(actual, expected, message) {
  if(actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.deepEqual`](http://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.deepEqual = function deepEqual(actual, expected, message) {
  if(!_deepEqual(actual, expected).result) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};


// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.notDeepEqual`](http://nodejs.org/api/assert.html#assert_assert_notdeepequal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if(_deepEqual(actual, expected).result) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.strictEqual`](http://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.strictEqual = function strictEqual(actual, expected, message) {
  if(actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.notStrictEqual`](http://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if(actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if(!actual || !expected) {
    return false;
  }

  if(Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if(actual instanceof expected) {
    return true;
  } else if(expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if(typeof expected == 'string') {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch(e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ')' : '.') +
  (message ? ' ' + message : '.');

  if(shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if(!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if((shouldThrow && actual && expected && !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);
/**
 * Node.js standard [`assert.throws`](http://nodejs.org/api/assert.html#assert_assert_throws_block_error_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {Function} block
 * @param {Function} [error]
 * @param {String} [message]
 */
assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
/**
 * Node.js standard [`assert.doesNotThrow`](http://nodejs.org/api/assert.html#assert_assert_doesnotthrow_block_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {Function} block
 * @param {String} [message]
 */
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

/**
 * Node.js standard [`assert.ifError`](http://nodejs.org/api/assert.html#assert_assert_iferror_value).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {Error} err
 */
assert.ifError = function(err) {
  if(err) {
    throw err;
  }
};

},{"./../assertion":3,"./../util":17,"should-equal":18}],6:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = require('../util')
  , assert = require('./_assert')
  , AssertionError = require('../assertion-error');

module.exports = function(should) {
  var i = should.format;

  /*
   * Expose assert to should
   *
   * This allows you to do things like below
   * without require()ing the assert module.
   *
   *    should.equal(foo.bar, undefined);
   *
   */
  util.merge(should, assert);

  /**
   * Assert _obj_ exists, with optional message.
   *
   * @static
   * @memberOf should
   * @category assertion assert
   * @alias should.exists
   * @param {*} obj
   * @param {String} [msg]
   * @example
   *
   * should.exist(1);
   * should.exist(new Date());
   */
  should.exist = should.exists = function(obj, msg) {
    if(null == obj) {
      throw new AssertionError({
        message: msg || ('expected ' + i(obj) + ' to exist'), stackStartFunction: should.exist
      });
    }
  };

  should.not = {};
  /**
   * Asserts _obj_ does not exist, with optional message.
   *
   * @name not.exist
   * @static
   * @memberOf should
   * @category assertion assert
   * @alias should.not.exists
   * @param {*} obj
   * @param {String} [msg]
   * @example
   *
   * should.not.exist(null);
   * should.not.exist(void 0);
   */
  should.not.exist = should.not.exists = function(obj, msg) {
    if(null != obj) {
      throw new AssertionError({
        message: msg || ('expected ' + i(obj) + ' to not exist'), stackStartFunction: should.not.exist
      });
    }
  };
};
},{"../assertion-error":2,"../util":17,"./_assert":5}],7:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  /**
   * Assert given object is exactly `true`.
   *
   * @name true
   * @memberOf Assertion
   * @category assertion bool
   * @alias Assertion#True
   * @example
   *
   * (true).should.be.true;
   * false.should.not.be.True;
   *
   * ({ a: 10}).should.not.be.true;
   */
  Assertion.add('true', function() {
    this.is.exactly(true);
  }, true);

  Assertion.alias('true', 'True');

  /**
   * Assert given object is exactly `false`.
   *
   * @name false
   * @memberOf Assertion
   * @category assertion bool
   * @alias Assertion#False
   * @example
   *
   * (true).should.not.be.false;
   * false.should.be.False;
   */
  Assertion.add('false', function() {
    this.is.exactly(false);
  }, true);

  Assertion.alias('false', 'False');

  /**
   * Assert given object is thuthy according javascript type conversions.
   *
   * @name ok
   * @memberOf Assertion
   * @category assertion bool
   * @example
   *
   * (true).should.be.ok;
   * ''.should.not.be.ok;
   * should(null).not.be.ok;
   * should(void 0).not.be.ok;
   *
   * (10).should.be.ok;
   * (0).should.not.be.ok;
   */
  Assertion.add('ok', function() {
    this.params = { operator: 'to be truthy' };

    this.assert(this.obj);
  }, true);
};
},{}],8:[function(require,module,exports){
module.exports = function(should, Assertion) {
  /**
   * Simple chaining. It actually do nothing.
   *
   * @memberOf Assertion
   * @name be
   * @alias Assertion#an
   * @alias Assertion#of
   * @alias Assertion#a
   * @alias Assertion#and
   * @alias Assertion#have
   * @alias Assertion#with
   * @alias Assertion#is
   * @alias Assertion#which
   * @alias Assertion#the
   * @category assertion chaining
   */
  ['an', 'of', 'a', 'and', 'be', 'have', 'with', 'is', 'which', 'the'].forEach(function(name) {
    Assertion.addChain(name);
  });
};
},{}],9:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = require('../util');
var eql = require('should-equal');

module.exports = function(should, Assertion) {
  var i = should.format;
  var type = should.type;

  /**
   * Assert that given object contain something that equal to `other`. It uses `should-equal` for equality checks.
   * If given object is array it search that one of elements was equal to `other`.
   * If given object is string it checks if `other` is a substring - expected that `other` is a string.
   * If given object is Object it checks that `other` is a subobject - expected that `other` is a object.
   *
   * @name containEql
   * @memberOf Assertion
   * @category assertion contain
   * @param {*} other Nested object
   * @example
   *
   * [1, 2, 3].should.containEql(1);
   * [{ a: 1 }, 'a', 10].should.containEql({ a: 1 });
   *
   * 'abc'.should.containEql('b');
   * 'ab1c'.should.containEql(1);
   *
   * ({ a: 10, c: { d: 10 }}).should.containEql({ a: 10 });
   * ({ a: 10, c: { d: 10 }}).should.containEql({ c: { d: 10 }});
   * ({ a: 10, c: { d: 10 }}).should.containEql({ b: 10 });
   * // throws AssertionError: expected { a: 10, c: { d: 10 } } to contain { b: 10 }
   * //            expected { a: 10, c: { d: 10 } } to have property b
   */
  Assertion.add('containEql', function(other) {
    this.params = {operator: 'to contain ' + i(other)};

    this.is.not.null.and.not.undefined;

    var obj = this.obj;
    var tpe = should.type(obj);

    if(tpe == should.type.STRING) {
      this.assert(obj.indexOf(String(other)) >= 0);
    } else if(util.isIndexable(obj)) {
      this.assert(util.some(obj, function(v) {
        return eql(v, other).result;
      }));
    } else {
      this.have.properties(other);
    }
  });

  /**
   * Assert that given object is contain equally structured object on the same depth level.
   * If given object is an array and `other` is an array it checks that the eql elements is going in the same sequence in given array (recursive)
   * For string it is working as `Assertion#containEql
   * If given object is an object it checks that the same keys contain deep equal values (recursive)
   * On other cases it try to check with `.eql`
   *
   * @name containDeepOrdered
   * @memberOf Assertion
   * @category assertion contain
   * @param {*} other Nested object
   * @example
   *
   * [ 1, 2, 3].should.containDeepOrdered([1, 2]);
   * [ 1, 2, [ 1, 2, 3 ]].should.containDeepOrdered([ 1, [ 2, 3 ]]);
   *
   * '123'.should.containDeepOrdered('1')
   *
   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({a: 10});
   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({b: {c: 10}});
   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({b: {d: [1, 3]}});
   */
  Assertion.add('containDeepOrdered', function(other) {
    this.params = {operator: 'to contain ' + i(other)};

    var obj = this.obj;
    if(type(obj) == type.STRING) {// expect other to be string
      this.assert(obj.indexOf(String(other)) >= 0);
    } else if(util.isIndexable(obj) && util.isIndexable(other)) {
      for(var objIdx = 0, otherIdx = 0, objLength = util.length(obj), otherLength = util.length(other); objIdx < objLength && otherIdx < otherLength; objIdx++) {
        try {
          should(obj[objIdx]).containDeepOrdered(other[otherIdx]);
          otherIdx++;
        } catch(e) {
          if(e instanceof should.AssertionError) {
            continue;
          }
          throw e;
        }
      }

      this.assert(otherIdx == otherLength);
    } else if(obj != null && other != null && typeof obj == 'object' && typeof other == 'object') {// object contains object case
      util.forEach(other, function(value, key) {
        should(obj[key]).containDeepOrdered(value);
      });

      // if both objects is empty means we finish traversing - and we need to compare for hidden values
      if(util.isEmptyObject(other)) {
        this.eql(other);
      }
    } else {
      this.eql(other);
    }
  });

  /**
   * The same like `Assertion#containDeepOrdered` but all checks on arrays without order.
   *
   * @name containDeep
   * @memberOf Assertion
   * @category assertion contain
   * @param {*} other Nested object
   * @example
   *
   * [ 1, 2, 3].should.containDeep([2, 1]);
   * [ 1, 2, [ 1, 2, 3 ]].should.containDeep([ 1, [ 3, 1 ]]);
   */
  Assertion.add('containDeep', function(other) {
    this.params = {operator: 'to contain ' + i(other)};

    var obj = this.obj;
    if(typeof obj == 'string') {// expect other to be string
      this.assert(obj.indexOf(String(other)) >= 0);
    } else if(util.isIndexable(obj) && util.isIndexable(other)) {
      var usedKeys = {};
      util.forEach(other, function(otherItem) {
        this.assert(util.some(obj, function(item, index) {
          if(index in usedKeys) return false;

          try {
            should(item).containDeep(otherItem);
            usedKeys[index] = true;
            return true;
          } catch(e) {
            if(e instanceof should.AssertionError) {
              return false;
            }
            throw e;
          }
        }));
      }, this);
    } else if(obj != null && other != null && typeof obj == 'object' && typeof other == 'object') {// object contains object case
      util.forEach(other, function(value, key) {
        should(obj[key]).containDeep(value);
      });

      // if both objects is empty means we finish traversing - and we need to compare for hidden values
      if(util.isEmptyObject(other)) {
        this.eql(other);
      }
    } else {
      this.eql(other);
    }
  });

};

},{"../util":17,"should-equal":18}],10:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var eql = require('should-equal');
var type = require('should-type');
var util = require('../util');

function formatEqlResult(r, a, b, format) {
  return ((r.path.length > 0 ? 'at ' + r.path.map(util.formatProp).join(' -> ') : '') +
  (r.a === a ? '' : ', A has ' + format(r.a)) +
  (r.b === b ? '' : ' and B has ' + format(r.b)) +
  (r.showReason ? ' because ' + r.reason: '')).trim();
}

module.exports = function(should, Assertion) {

  /**
   * Deep object equality comparison. For full spec see [`should-equal tests`](https://github.com/shouldjs/equal/blob/master/test.js).
   *
   * @name eql
   * @memberOf Assertion
   * @category assertion equality
   * @param {*} val Expected value
   * @param {string} [description] Optional message
   * @example
   *
   * (10).should.be.eql(10);
   * ('10').should.not.be.eql(10);
   * (-0).should.not.be.eql(+0);
   *
   * NaN.should.be.eql(NaN);
   *
   * ({ a: 10}).should.be.eql({ a: 10 });
   * [ 'a' ].should.not.be.eql({ '0': 'a' });
   */
  Assertion.add('eql', function(val, description) {
    this.params = {operator: 'to equal', expected: val, message: description};

    var strictResult = eql(this.obj, val, should.config);
    this.params.details = strictResult.result ? '': formatEqlResult(strictResult, this.obj, val, should.format);

    this.params.showDiff = type(this.obj) == type(val);

    this.assert(strictResult.result);
  });

  /**
   * Exact comparison using ===.
   *
   * @name equal
   * @memberOf Assertion
   * @category assertion equality
   * @alias Assertion#exactly
   * @param {*} val Expected value
   * @param {string} [description] Optional message
   * @example
   *
   * 10.should.be.equal(10);
   * 'a'.should.be.exactly('a');
   *
   * should(null).be.exactly(null);
   */
  Assertion.add('equal', function(val, description) {
    this.params = {operator: 'to be', expected: val, message: description};

    this.params.showDiff = type(this.obj) == type(val);

    this.assert(val === this.obj);
  });

  Assertion.alias('equal', 'exactly');
};
},{"../util":17,"should-equal":18,"should-type":20}],11:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */
var util = require('../util');

module.exports = function(should, Assertion) {
  var i = should.format;

  /**
   * Assert given function throws error with such message.
   *
   * @name throw
   * @memberOf Assertion
   * @category assertion errors
   * @alias Assertion#throwError
   * @param {string|RegExp|Function|Object} [message] Message to match or properties
   * @param {Object} [properties] Optional properties that will be matched to thrown error
   * @example
   *
   * (function(){ throw new Error('fail') }).should.throw();
   * (function(){ throw new Error('fail') }).should.throw('fail');
   * (function(){ throw new Error('fail') }).should.throw(/fail/);
   *
   * (function(){ throw new Error('fail') }).should.throw(Error);
   * var error = new Error();
   * error.a = 10;
   * (function(){ throw error; }).should.throw(Error, { a: 10 });
   * (function(){ throw error; }).should.throw({ a: 10 });
   */
  Assertion.add('throw', function(message, properties) {
    var fn = this.obj
      , err = {}
      , errorInfo = ''
      , thrown = false;

    this.is.a.Function;

    var errorMatched = true;

    try {
      fn();
    } catch(e) {
      thrown = true;
      err = e;
    }

    if(thrown) {
      if(message) {
        if('string' == typeof message) {
          errorMatched = message == err.message;
        } else if(message instanceof RegExp) {
          errorMatched = message.test(err.message);
        } else if('function' == typeof message) {
          errorMatched = err instanceof message;
        } else if(null != message) {
          try {
            err.should.match(message);
          } catch(e) {
            if(e instanceof should.AssertionError) {
              errorInfo = ": " + e.message;
              errorMatched = false;
            } else {
              throw e;
            }
          }
        }

        if(!errorMatched) {
          if('string' == typeof message || message instanceof RegExp) {
            errorInfo = " with a message matching " + i(message) + ", but got '" + err.message + "'";
          } else if('function' == typeof message) {
            errorInfo = " of type " + util.functionName(message) + ", but got " + util.functionName(err.constructor);
          }
        } else if('function' == typeof message && properties) {
          try {
            err.should.match(properties);
          } catch(e) {
            if(e instanceof should.AssertionError) {
              errorInfo = ": " + e.message;
              errorMatched = false;
            } else {
              throw e;
            }
          }
        }
      } else {
        errorInfo = " (got " + i(err) + ")";
      }
    }

    this.params = { operator: 'to throw exception' + errorInfo };

    this.assert(thrown);
    this.assert(errorMatched);
  });

  Assertion.alias('throw', 'throwError');
};
},{"../util":17}],12:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = require('../util');
var eql = require('should-equal');

module.exports = function(should, Assertion) {
  var i = should.format;

  /**
   * Asserts if given object match `other` object, using some assumptions:
   * First object matched if they are equal,
   * If `other` is a regexp and given object is a string check on matching with regexp
   * If `other` is a regexp and given object is an array check if all elements matched regexp
   * If `other` is a regexp and given object is an object check values on matching regexp
   * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
   * If `other` is an object check if the same keys matched with above rules
   * All other cases failed
   *
   * @name match
   * @memberOf Assertion
   * @category assertion matching
   * @param {*} other Object to match
   * @param {string} [description] Optional message
   * @example
   * 'foobar'.should.match(/^foo/);
   * 'foobar'.should.not.match(/^bar/);
   *
   * ({ a: 'foo', c: 'barfoo' }).should.match(/foo$/);
   *
   * ['a', 'b', 'c'].should.match(/[a-z]/);
   *
   * (5).should.not.match(function(n) {
   *   return n < 0;
   * });
   * (5).should.not.match(function(it) {
   *    it.should.be.an.Array;
   * });
   * ({ a: 10, b: 'abc', c: { d: 10 }, d: 0 }).should
   * .match({ a: 10, b: /c$/, c: function(it) {
   *    return it.should.have.property('d', 10);
   * }});
   *
   * [10, 'abc', { d: 10 }, 0].should
   * .match({ '0': 10, '1': /c$/, '2': function(it) {
   *    return it.should.have.property('d', 10);
   * }});
   */
  Assertion.add('match', function(other, description) {
    this.params = {operator: 'to match ' + i(other), message: description};

    if(!eql(this.obj, other).result) {
      if(other instanceof RegExp) { // something - regex

        if(typeof this.obj == 'string') {

          this.assert(other.exec(this.obj));
        } else if(util.isIndexable(this.obj)) {
          util.forEach(this.obj, function(item) {
            this.assert(other.exec(item));// should we try to convert to String and exec?
          }, this);
        } else if(null != this.obj && typeof this.obj == 'object') {

          var notMatchedProps = [], matchedProps = [];
          util.forEach(this.obj, function(value, name) {
            if(other.exec(value)) matchedProps.push(util.formatProp(name));
            else notMatchedProps.push(util.formatProp(name) + ' (' + i(value) + ')');
          }, this);

          if(notMatchedProps.length)
            this.params.operator += '\n    not matched properties: ' + notMatchedProps.join(', ');
          if(matchedProps.length)
            this.params.operator += '\n    matched properties: ' + matchedProps.join(', ');

          this.assert(notMatchedProps.length == 0);
        } // should we try to convert to String and exec?
      } else if(typeof other == 'function') {
        var res;

        res = other(this.obj);

        //if(res instanceof Assertion) {
        //  this.params.operator += '\n    ' + res.getMessage();
        //}

        //if we throw exception ok - it is used .should inside
        if(typeof res == 'boolean') {
          this.assert(res); // if it is just boolean function assert on it
        }
      } else if(other != null && typeof other == 'object') { // try to match properties (for Object and Array)
        notMatchedProps = [];
        matchedProps = [];

        util.forEach(other, function(value, key) {
          try {
            should(this.obj[key]).match(value);
            matchedProps.push(util.formatProp(key));
          } catch(e) {
            if(e instanceof should.AssertionError) {
              notMatchedProps.push(util.formatProp(key) + ' (' + i(this.obj[key]) + ')');
            } else {
              throw e;
            }
          }
        }, this);

        if(notMatchedProps.length)
          this.params.operator += '\n    not matched properties: ' + notMatchedProps.join(', ');
        if(matchedProps.length)
          this.params.operator += '\n    matched properties: ' + matchedProps.join(', ');

        this.assert(notMatchedProps.length == 0);
      } else {
        this.assert(false);
      }
    }
  });

  /**
   * Asserts if given object values or array elements all match `other` object, using some assumptions:
   * First object matched if they are equal,
   * If `other` is a regexp - matching with regexp
   * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
   * All other cases check if this `other` equal to each element
   *
   * @name matchEach
   * @memberOf Assertion
   * @category assertion matching
   * @param {*} other Object to match
   * @param {string} [description] Optional message
   * @example
   * [ 'a', 'b', 'c'].should.matchEach(/\w+/);
   * [ 'a', 'a', 'a'].should.matchEach('a');
   *
   * [ 'a', 'a', 'a'].should.matchEach(function(value) { value.should.be.eql('a') });
   *
   * { a: 'a', b: 'a', c: 'a' }.should.matchEach(function(value) { value.should.be.eql('a') });
   */
  Assertion.add('matchEach', function(other, description) {
    this.params = {operator: 'to match each ' + i(other), message: description};

    var f = other;

    if(other instanceof RegExp)
      f = function(it) {
        return !!other.exec(it);
      };
    else if(typeof other != 'function')
      f = function(it) {
        return eql(it, other).result;
      };

    util.forEach(this.obj, function(value, key) {
      var res = f(value, key);

      //if we throw exception ok - it is used .should inside
      if(typeof res == 'boolean') {
        this.assert(res); // if it is just boolean function assert on it
      }
    }, this);
  });
};
},{"../util":17,"should-equal":18}],13:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {

  /**
   * Assert given object is NaN
   * @name NaN
   * @memberOf Assertion
   * @category assertion numbers
   * @example
   *
   * (10).should.not.be.NaN;
   * NaN.should.be.NaN;
   */
  Assertion.add('NaN', function() {
    this.params = { operator: 'to be NaN' };

    this.assert(this.obj !== this.obj);
  }, true);

  /**
   * Assert given object is not finite (positive or negative)
   *
   * @name Infinity
   * @memberOf Assertion
   * @category assertion numbers
   * @example
   *
   * (10).should.not.be.Infinity;
   * NaN.should.not.be.Infinity;
   */
  Assertion.add('Infinity', function() {
    this.params = { operator: 'to be Infinity' };

    this.is.a.Number
      .and.not.a.NaN
      .and.assert(!isFinite(this.obj));
  }, true);

  /**
   * Assert given number between `start` and `finish` or equal one of them.
   *
   * @name within
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} start Start number
   * @param {number} finish Finish number
   * @param {string} [description] Optional message
   * @example
   *
   * (10).should.be.within(0, 20);
   */
  Assertion.add('within', function(start, finish, description) {
    this.params = { operator: 'to be within ' + start + '..' + finish, message: description };

    this.assert(this.obj >= start && this.obj <= finish);
  });

  /**
   * Assert given number near some other `value` within `delta`
   *
   * @name approximately
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} value Center number
   * @param {number} delta Radius
   * @param {string} [description] Optional message
   * @example
   *
   * (9.99).should.be.approximately(10, 0.1);
   */
  Assertion.add('approximately', function(value, delta, description) {
    this.params = { operator: 'to be approximately ' + value + " ±" + delta, message: description };

    this.assert(Math.abs(this.obj - value) <= delta);
  });

  /**
   * Assert given number above `n`.
   *
   * @name above
   * @alias Assertion#greaterThan
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} n Margin number
   * @param {string} [description] Optional message
   * @example
   *
   * (10).should.be.above(0);
   */
  Assertion.add('above', function(n, description) {
    this.params = { operator: 'to be above ' + n, message: description };

    this.assert(this.obj > n);
  });

  /**
   * Assert given number below `n`.
   *
   * @name below
   * @alias Assertion#lessThan
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} n Margin number
   * @param {string} [description] Optional message
   * @example
   *
   * (0).should.be.above(10);
   */
  Assertion.add('below', function(n, description) {
    this.params = { operator: 'to be below ' + n, message: description };

    this.assert(this.obj < n);
  });

  Assertion.alias('above', 'greaterThan');
  Assertion.alias('below', 'lessThan');

};

},{}],14:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = require('../util');
var eql = require('should-equal');

var aSlice = Array.prototype.slice;

module.exports = function(should, Assertion) {
  var i = should.format;
  /**
   * Asserts given object has some descriptor. **On success it change given object to be value of property**.
   *
   * @name propertyWithDescriptor
   * @memberOf Assertion
   * @category assertion property
   * @param {string} name Name of property
   * @param {Object} desc Descriptor like used in Object.defineProperty (not required to add all properties)
   * @example
   *
   * ({ a: 10 }).should.have.propertyWithDescriptor('a', { enumerable: true });
   */
  Assertion.add('propertyWithDescriptor', function(name, desc) {
    this.params = {actual: this.obj, operator: 'to have own property with descriptor ' + i(desc)};
    var obj = this.obj;
    this.have.ownProperty(name);
    should(Object.getOwnPropertyDescriptor(Object(obj), name)).have.properties(desc);
  });

  function processPropsArgs() {
    var args = {};
    if(arguments.length > 1) {
      args.names = aSlice.call(arguments);
    } else {
      var arg = arguments[0];
      var t = should.type(arg);
      if(t == should.type.STRING) {
        args.names = [arg];
      } else if(util.isIndexable(arg)) {
        args.names = arg;
      } else {
        args.names = Object.keys(arg);
        args.values = arg;
      }
    }
    return args;
  }


  /**
   * Asserts given object has enumerable property with optionally value. **On success it change given object to be value of property**.
   *
   * @name enumerable
   * @memberOf Assertion
   * @category assertion property
   * @param {string} name Name of property
   * @param {*} [val] Optional property value to check
   * @example
   *
   * ({ a: 10 }).should.have.enumerable('a');
   */
  Assertion.add('enumerable', function(name, val) {
    name = String(name);

    this.params = {
      operator: "to have enumerable property " + util.formatProp(name) + (arguments.length > 1 ? " equal to " + i(val): "")
    };

    var desc = { enumerable: true };
    if(arguments.length > 1) desc.value = val;
    this.have.propertyWithDescriptor(name, desc);
  });

  /**
   * Asserts given object has enumerable properties
   *
   * @name enumerables
   * @memberOf Assertion
   * @category assertion property
   * @param {Array|...string|Object} names Names of property
   * @example
   *
   * ({ a: 10, b: 10 }).should.have.enumerables('a');
   */
  Assertion.add('enumerables', function(names) {
    var args = processPropsArgs.apply(null, arguments);

    this.params = {
      operator: "to have enumerables " + args.names.map(util.formatProp)
    };

    var obj = this.obj;
    args.names.forEach(function(name) {
      obj.should.have.enumerable(name);
    });
  });

  /**
   * Asserts given object has property with optionally value. **On success it change given object to be value of property**.
   *
   * @name property
   * @memberOf Assertion
   * @category assertion property
   * @param {string} name Name of property
   * @param {*} [val] Optional property value to check
   * @example
   *
   * ({ a: 10 }).should.have.property('a');
   */
  Assertion.add('property', function(name, val) {
    name = String(name);
    if(arguments.length > 1) {
      var p = {};
      p[name] = val;
      this.have.properties(p);
    } else {
      this.have.properties(name);
    }
    this.obj = this.obj[name];
  });

  /**
   * Asserts given object has properties. On this method affect .any modifier, which allow to check not all properties.
   *
   * @name properties
   * @memberOf Assertion
   * @category assertion property
   * @param {Array|...string|Object} names Names of property
   * @example
   *
   * ({ a: 10 }).should.have.properties('a');
   */
  Assertion.add('properties', function(names) {
    var values = {};
    if(arguments.length > 1) {
      names = aSlice.call(arguments);
    } else if(!Array.isArray(names)) {
      if(typeof names == 'string') {
        names = [names];
      } else {
        values = names;
        names = Object.keys(names);
      }
    }

    var obj = Object(this.obj), missingProperties = [];

    //just enumerate properties and check if they all present
    names.forEach(function(name) {
      if(!(name in obj)) missingProperties.push(util.formatProp(name));
    });

    var props = missingProperties;
    if(props.length === 0) {
      props = names.map(util.formatProp);
    } else if(this.anyOne) {
      props = names.filter(function(name) {
        return missingProperties.indexOf(util.formatProp(name)) < 0;
      }).map(util.formatProp);
    }

    var operator = (props.length === 1 ?
        'to have property ' : 'to have ' + (this.anyOne ? 'any of ' : '') + 'properties ') + props.join(', ');

    this.params = {obj: this.obj, operator: operator};

    //check that all properties presented
    //or if we request one of them that at least one them presented
    this.assert(missingProperties.length === 0 || (this.anyOne && missingProperties.length != names.length));

    // check if values in object matched expected
    var valueCheckNames = Object.keys(values);
    if(valueCheckNames.length) {
      var wrongValues = [];
      props = [];

      // now check values, as there we have all properties
      valueCheckNames.forEach(function(name) {
        var value = values[name];
        if(!eql(obj[name], value).result) {
          wrongValues.push(util.formatProp(name) + ' of ' + i(value) + ' (got ' + i(obj[name]) + ')');
        } else {
          props.push(util.formatProp(name) + ' of ' + i(value));
        }
      });

      if((wrongValues.length !== 0 && !this.anyOne) || (this.anyOne && props.length === 0)) {
        props = wrongValues;
      }

      operator = (props.length === 1 ?
        'to have property ' : 'to have ' + (this.anyOne ? 'any of ' : '') + 'properties ') + props.join(', ');

      this.params = {obj: this.obj, operator: operator};

      //if there is no not matched values
      //or there is at least one matched
      this.assert(wrongValues.length === 0 || (this.anyOne && wrongValues.length != valueCheckNames.length));
    }
  });

  /**
   * Asserts given object has property `length` with given value `n`
   *
   * @name length
   * @alias Assertion#lengthOf
   * @memberOf Assertion
   * @category assertion property
   * @param {number} n Expected length
   * @param {string} [description] Optional message
   * @example
   *
   * [1, 2].should.have.length(2);
   */
  Assertion.add('length', function(n, description) {
    this.have.property('length', n, description);
  });

  Assertion.alias('length', 'lengthOf');

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * Asserts given object has own property. **On success it change given object to be value of property**.
   *
   * @name ownProperty
   * @alias Assertion#hasOwnProperty
   * @memberOf Assertion
   * @category assertion property
   * @param {string} name Name of property
   * @param {string} [description] Optional message
   * @example
   *
   * ({ a: 10 }).should.have.ownProperty('a');
   */
  Assertion.add('ownProperty', function(name, description) {
    name = String(name);
    this.params = {
      actual: this.obj,
      operator: 'to have own property ' + util.formatProp(name),
      message: description
    };

    this.assert(hasOwnProperty.call(this.obj, name));

    this.obj = this.obj[name];
  });

  Assertion.alias('ownProperty', 'hasOwnProperty');

  /**
   * Asserts given object is empty. For strings, arrays and arguments it checks .length property, for objects it checks keys.
   *
   * @name empty
   * @memberOf Assertion
   * @category assertion property
   * @example
   *
   * ''.should.be.empty;
   * [].should.be.empty;
   * ({}).should.be.empty;
   */
  Assertion.add('empty', function() {
    this.params = {operator: 'to be empty'};

    if(util.length(this.obj) !== void 0) {
      this.obj.should.have.property('length', 0);
    } else {
      var obj = Object(this.obj); // wrap to reference for booleans and numbers
      for(var prop in obj) {
        this.obj.should.not.have.ownProperty(prop);
      }
    }
  }, true);

  /**
   * Asserts given object has exact keys.
   *
   * @name keys
   * @alias Assertion#key
   * @memberOf Assertion
   * @category assertion property
   * @param {Array|...string|Object} [keys] Keys to check
   * @example
   *
   * ({ a: 10}).should.have.keys('a');
   * ({}).should.have.keys();
   */
  Assertion.add('keys', function(keys) {
    if(arguments.length > 1) keys = aSlice.call(arguments);
    else if(arguments.length === 1 && should.type(keys) == should.type.STRING) keys = [keys];
    else if(arguments.length === 0) keys = [];

    keys = keys.map(String);

    var obj = Object(this.obj);

    // first check if some keys are missing
    var missingKeys = [];
    keys.forEach(function(key) {
      if(!hasOwnProperty.call(this.obj, key))
        missingKeys.push(util.formatProp(key));
    }, this);

    // second check for extra keys
    var extraKeys = [];
    Object.keys(obj).forEach(function(key) {
      if(keys.indexOf(key) < 0) {
        extraKeys.push(util.formatProp(key));
      }
    });

    var verb = keys.length === 0 ? 'to be empty' :
    'to have ' + (keys.length === 1 ? 'key ' : 'keys ');

    this.params = {operator: verb + keys.map(util.formatProp).join(', ')};

    if(missingKeys.length > 0)
      this.params.operator += '\n\tmissing keys: ' + missingKeys.join(', ');

    if(extraKeys.length > 0)
      this.params.operator += '\n\textra keys: ' + extraKeys.join(', ');

    this.assert(missingKeys.length === 0 && extraKeys.length === 0);
  });

  Assertion.alias("keys", "key");

  /**
   * Asserts given object has nested property in depth by path. **On success it change given object to be value of final property**.
   *
   * @name propertyByPath
   * @memberOf Assertion
   * @category assertion property
   * @param {Array|...string} properties Properties path to search
   * @example
   *
   * ({ a: {b: 10}}).should.have.propertyByPath('a', 'b').eql(10);
   */
  Assertion.add('propertyByPath', function(properties) {
    if(arguments.length > 1) properties = aSlice.call(arguments);
    else if(arguments.length === 1 && util.isString(properties)) properties = [properties];
    else if(arguments.length === 0) properties = [];

    var allProps = properties.map(util.formatProp);

    properties = properties.map(String);

    var obj = should(Object(this.obj));

    var foundProperties = [];

    var currentProperty;
    while(currentProperty = properties.shift()) {
      this.params = {operator: 'to have property by path ' + allProps.join(', ') + ' - failed on ' + util.formatProp(currentProperty)};
      obj = obj.have.property(currentProperty);
      foundProperties.push(currentProperty);
    }

    this.params = {obj: this.obj, operator: 'to have property by path ' + allProps.join(', ')};

    this.obj = obj.obj;
  });
};

},{"../util":17,"should-equal":18}],15:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  /**
   * Assert given string starts with prefix
   * @name startWith
   * @memberOf Assertion
   * @category assertion strings
   * @param {string} str Prefix
   * @param {string} [description] Optional message
   * @example
   *
   * 'abc'.should.startWith('a');
   */
  Assertion.add('startWith', function(str, description) {
    this.params = { operator: 'to start with ' + should.format(str), message: description };

    this.assert(0 === this.obj.indexOf(str));
  });

  /**
   * Assert given string starts with prefix
   * @name endWith
   * @memberOf Assertion
   * @category assertion strings
   * @param {string} str Prefix
   * @param {string} [description] Optional message
   * @example
   *
   * 'abca'.should.endWith('a');
   */
  Assertion.add('endWith', function(str, description) {
    this.params = { operator: 'to end with ' + should.format(str), message: description };

    this.assert(this.obj.indexOf(str, this.obj.length - str.length) >= 0);
  });
};
},{}],16:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = require('../util');

module.exports = function(should, Assertion) {
  /**
   * Assert given object is number
   * @name Number
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Number', function() {
    this.params = {operator: 'to be a number'};

    this.have.type('number');
  }, true);

  /**
   * Assert given object is arguments
   * @name arguments
   * @alias Assertion#Arguments
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('arguments', function() {
    this.params = {operator: 'to be arguments'};

    this.have.class('Arguments');
  }, true);

  Assertion.alias('arguments', 'Arguments');

  /**
   * Assert given object has some type using `typeof`
   * @name type
   * @memberOf Assertion
   * @param {string} type Type name
   * @param {string} [description] Optional message
   * @category assertion types
   */
  Assertion.add('type', function(type, description) {
    this.params = {operator: 'to have type ' + type, message: description};

    should(typeof this.obj).be.exactly(type);
  });

  /**
   * Assert given object is instance of `constructor`
   * @name instanceof
   * @alias Assertion#instanceOf
   * @memberOf Assertion
   * @param {Function} constructor Constructor function
   * @param {string} [description] Optional message
   * @category assertion types
   */
  Assertion.add('instanceof', function(constructor, description) {
    this.params = {operator: 'to be an instance of ' + util.functionName(constructor), message: description};

    this.assert(Object(this.obj) instanceof constructor);
  });

  Assertion.alias('instanceof', 'instanceOf');

  /**
   * Assert given object is function
   * @name Function
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Function', function() {
    this.params = {operator: 'to be a function'};

    this.have.type('function');
  }, true);

  /**
   * Assert given object is object
   * @name Object
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Object', function() {
    this.params = {operator: 'to be an object'};

    this.is.not.null.and.have.type('object');
  }, true);

  /**
   * Assert given object is string
   * @name String
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('String', function() {
    this.params = {operator: 'to be a string'};

    this.have.type('string');
  }, true);

  /**
   * Assert given object is array
   * @name Array
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Array', function() {
    this.params = {operator: 'to be an array'};

    this.have.class('Array');
  }, true);

  /**
   * Assert given object is boolean
   * @name Boolean
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Boolean', function() {
    this.params = {operator: 'to be a boolean'};

    this.have.type('boolean');
  }, true);

  /**
   * Assert given object is error
   * @name Error
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Error', function() {
    this.params = {operator: 'to be an error'};

    this.have.instanceOf(Error);
  }, true);

  /**
   * Assert given object is null
   * @name null
   * @alias Assertion#Null
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('null', function() {
    this.params = {operator: 'to be null'};

    this.assert(this.obj === null);
  }, true);

  Assertion.alias('null', 'Null');

  /**
   * Assert given object has some internal [[Class]], via Object.prototype.toString call
   * @name class
   * @alias Assertion#Class
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('class', function(cls) {
    this.params = {operator: 'to have [[Class]] ' + cls};

    this.assert(Object.prototype.toString.call(this.obj) === '[object ' + cls + ']');
  });

  Assertion.alias('class', 'Class');

  /**
   * Assert given object is undefined
   * @name undefined
   * @alias Assertion#Undefined
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('undefined', function() {
    this.params = {operator: 'to be undefined'};

    this.assert(this.obj === void 0);
  }, true);

  Assertion.alias('undefined', 'Undefined');
};

},{"../util":17}],17:[function(require,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var type = require('should-type');

/**
 * Check if given obj just a primitive type wrapper
 * @param {Object} obj
 * @returns {boolean}
 * @private
 */
exports.isWrapperType = function(obj) {
  return obj instanceof Number || obj instanceof String || obj instanceof Boolean;
};

exports.merge = function(a, b) {
  if(a && b) {
    for(var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

exports.forEach = function(obj, f, context) {
  for(var prop in obj) {
    if(hasOwnProperty.call(obj, prop)) {
      if(f.call(context, obj[prop], prop, obj) === false)
        return;
    }
  }
};

exports.some = function(obj, f, context) {
  var res = false;
  exports.forEach(obj, function(value, key) {
    if(f.call(context, value, key, obj)) {
      res = true;
      return false;
    }
  }, context);
  return res;
};

var functionNameRE = /^\s*function\s*(\S*)\s*\(/;

exports.functionName = function(f) {
  if(f.name) {
    return f.name;
  }
  var name = f.toString().match(functionNameRE)[1];
  return name;
};

var formatPropertyName = require('should-format').formatPropertyName;

exports.formatProp = function(value) {
  return formatPropertyName(String(value));
};


exports.isEmptyObject = function(obj) {
  for(var prop in obj) {
    if(hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
};

exports.isIndexable = function(obj) {
  var t = type(obj);
  return t == type.ARRAY ||
    t == type.BUFFER ||
    t == type.ARGUMENTS ||
    t == type.ARRAY_BUFFER ||
    t == type.TYPED_ARRAY ||
    t == type.DATA_VIEW ||
    t == type.STRING;
}

exports.length = function(obj) {
  switch(type(obj)) {
    case type.ARRAY_BUFFER:
    case type.TYPED_ARRAY:
    case type.DATA_VIEW:
      return obj.byteLength;

    case type.ARRAY:
    case type.BUFFER:
    case type.ARGUMENTS:
    case type.FUNCTION:
    case type.STRING:
      return obj.length;
  }
}
},{"should-format":19,"should-type":20}],18:[function(require,module,exports){
var getType = require('should-type');
var hasOwnProperty = Object.prototype.hasOwnProperty;

function makeResult(r, path, reason, a, b) {
  var o = {result: r};
  if(!r) {
    o.path = path;
    o.reason = reason;
    o.a = a;
    o.b = b;
  }
  return o;
}

var EQUALS = makeResult(true);

function format(msg) {
  var args = arguments;
  for(var i = 1, l = args.length; i < l; i++) {
    msg = msg.replace(/%s/, args[i]);
  }
  return msg;
}

var REASON = {
  PLUS_0_AND_MINUS_0: '+0 is not equal to -0',
  DIFFERENT_TYPES: 'A has type %s and B has type %s',
  NAN_NUMBER: 'NaN is not equal to any number',
  EQUALITY: 'A is not equal to B',
  EQUALITY_PROTOTYPE: 'A and B have different prototypes',
  WRAPPED_VALUE: 'A wrapped value is not equal to B wrapped value',
  FUNCTION_SOURCES: 'function A is not equal to B by source code value (via .toString call)',
  MISSING_KEY: '%s has no key %s',
  CIRCULAR_VALUES: 'A has circular reference that was visited not in the same time as B'
};

function eqInternal(a, b, opts, stackA, stackB, path, fails) {
  var r = EQUALS;

  function result(comparison, reason) {
    var res = makeResult(comparison, path, reason, a, b);
    if(!comparison && opts.collectAllFails) {
      fails.push(res);
    }
    return res;
  }

  function checkPropertyEquality(property) {
    return eqInternal(a[property], b[property], opts, stackA, stackB, path.concat([property]), fails);
  }

  // equal a and b exit early
  if(a === b) {
    // check for +0 !== -0;
    return result(a !== 0 || (1 / a == 1 / b), REASON.PLUS_0_AND_MINUS_0);
  }

  var l, p;

  var typeA = getType(a),
    typeB = getType(b);

  // if objects has different types they are not equals
  if(typeA !== typeB) return result(false, format(REASON.DIFFERENT_TYPES, typeA, typeB));

  switch(typeA) {
    case 'number':
      return (a !== a) ? result(b !== b, REASON.NAN_NUMBER)
        // but treat `+0` vs. `-0` as not equal
        : (a === 0 ? result(1 / a === 1 / b, REASON.PLUS_0_AND_MINUS_0) : result(a === b, REASON.EQUALITY));

    case 'regexp':
      p = ['source', 'global', 'multiline', 'lastIndex', 'ignoreCase'];
      while(p.length) {
        r = checkPropertyEquality(p.shift());
        if(!opts.collectAllFails && !r.result) return r;
      }
      break;

    case 'boolean':
    case 'string':
      return result(a === b, REASON.EQUALITY);

    case 'date':
      if(+a !== +b && !opts.collectAllFails) {
        return result(false, REASON.EQUALITY);
      }
      break;

    case 'object-number':
    case 'object-boolean':
    case 'object-string':
      r = eqInternal(a.valueOf(), b.valueOf(), opts, stackA, stackB, path, fails);
      if(!r.result && !opts.collectAllFails) {
        r.reason = REASON.WRAPPED_VALUE;
        return r;
      }
      break;

    case 'buffer':
      r = checkPropertyEquality('length');
      if(!opts.collectAllFails && !r.result) return r;

      l = a.length;
      while(l--) {
        r = checkPropertyEquality(l);
        if(!opts.collectAllFails && !r.result) return r;
      }

      return EQUALS;

    case 'error':
      p = ['name', 'message'];
      while(p.length) {
        r = checkPropertyEquality(p.shift());
        if(!opts.collectAllFails && !r.result) return r;
      }

      break;
  }

  // compare deep objects and arrays
  // stacks contain references only
  stackA || (stackA = []);
  stackB || (stackB = []);

  l = stackA.length;
  while(l--) {
    if(stackA[l] == a) {
      return result(stackB[l] == b, REASON.CIRCULAR_VALUES);
    }
  }

  // add `a` and `b` to the stack of traversed objects
  stackA.push(a);
  stackB.push(b);

  var hasProperty,
    keysComparison,
    key;

  if(typeA === 'array' || typeA === 'arguments' || typeA === 'typed-array') {
    r = checkPropertyEquality('length');
    if(!opts.collectAllFails && !r.result) return r;
  }

  if(typeA === 'array-buffer' || typeA === 'typed-array') {
    r = checkPropertyEquality('byteLength');
    if(!opts.collectAllFails && !r.result) return r;
  }

  if(typeB === 'function') {
    var fA = a.toString(), fB = b.toString();
    r = eqInternal(fA, fB, opts, stackA, stackB, path, fails);
    r.reason = REASON.FUNCTION_SOURCES;
    if(!opts.collectAllFails && !r.result) return r;
  }

  for(key in b) {
    if(hasOwnProperty.call(b, key)) {
      r = result(hasOwnProperty.call(a, key), format(REASON.MISSING_KEY, 'A', key));
      if(!r.result && !opts.collectAllFails) {
        return r;
      }

      if(r.result) {
        r = checkPropertyEquality(key);
        if(!r.result && !opts.collectAllFails) {
          return r;
        }
      }
    }
  }

  // ensure both objects have the same number of properties
  for(key in a) {
    if(hasOwnProperty.call(a, key)) {
      r = result(hasOwnProperty.call(b, key), format(REASON.MISSING_KEY, 'B', key));
      if(!r.result && !opts.collectAllFails) {
        return r;
      }
    }
  }

  stackA.pop();
  stackB.pop();

  var prototypesEquals = false, canComparePrototypes = false;

  if(opts.checkProtoEql) {
    if(Object.getPrototypeOf) {
      prototypesEquals = Object.getPrototypeOf(a) === Object.getPrototypeOf(b);
      canComparePrototypes = true;
    } else if(a.__proto__ && b.__proto__) {
      prototypesEquals = a.__proto__ === b.__proto__;
      canComparePrototypes = true;
    }

    if(canComparePrototypes && !prototypesEquals && !opts.collectAllFails) {
      r = result(prototypesEquals, REASON.EQUALITY_PROTOTYPE);
      r.showReason = true;
      if(!r.result && !opts.collectAllFails) {
        return r;
      }
    }
  }

  if(typeB === 'function') {
    r = checkPropertyEquality('prototype');
    if(!r.result && !opts.collectAllFails) return r;
  }

  return EQUALS;
}

var defaultOptions = {checkProtoEql: true, collectAllFails: false};

function eq(a, b, opts) {
  opts = opts || defaultOptions;
  var fails = [];
  var r = eqInternal(a, b, opts || defaultOptions, [], [], [], fails);
  return opts.collectAllFails ? fails : r;
}

module.exports = eq;

eq.r = REASON;

},{"should-type":20}],19:[function(require,module,exports){
var getType = require('should-type');

function genKeysFunc(f) {
  return function(value) {
    var k = f(value);
    k.sort();
    return k;
  }
}

//XXX add ability to only inspect some paths
var format = function(value, opts) {
  opts = opts || {};

  if(!('seen' in opts)) opts.seen = [];
  opts.keys = genKeysFunc('keys' in opts && opts.keys === false ? Object.getOwnPropertyNames : Object.keys);

  if(!('maxLineLength' in opts)) opts.maxLineLength = 60;
  if(!('propSep' in opts)) opts.propSep = ',';

  var type = getType(value);
  return (format.formats[type] || format.formats['object'])(value, opts);
};

module.exports = format;

format.formats = {};

function add(t, f) {
  format.formats[t] = f;
}

[ 'undefined',  'boolean',  'null'].forEach(function(name) {
  add(name, String);
});

['number', 'boolean'].forEach(function(name) {
  var capName = name.substring(0, 1).toUpperCase() + name.substring(1);
  add('object-' + name, formatObjectWithPrefix(function(value) {
    return '[' + capName + ': ' + format(value.valueOf()) + ']';
  }));
});

add('object-string', function(value, opts) {
  var realValue = value.valueOf();
  var prefix = '[String: ' + format(realValue) + ']';
  var props = opts.keys(value);
  props = props.filter(function(p) {
    return !(p.match(/\d+/) && parseInt(p, 10) < realValue.length);
  });

  if(props.length == 0) return prefix;
  else return formatObject(value, opts, prefix, props);
});

add('regexp', formatObjectWithPrefix(String));

add('number', function(value) {
  if(value === 0 && 1 / value < 0) return '-0';
  return String(value);
});

add('string', function(value) {
  return '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
      .replace(/'/g, "\\'")
      .replace(/\\"/g, '"') + '\'';
});

add('object', formatObject);

add('array', function(value, opts) {
  var keys = opts.keys(value);
  var len = 0;

  opts.seen.push(value);

  var props = keys.map(function(prop) {
    var desc;
    try {
      desc = Object.getOwnPropertyDescriptor(value, prop) || {value: value[prop]};
    } catch(e) {
      desc = {value: e};
    }

    var f;
    if(prop.match(/\d+/)) {
      f = format(desc.value, opts);
    } else {
      f = formatProperty(desc.value, opts, prop)
    }
    len += f.length;
    return f;
  });

  opts.seen.pop();

  if(props.length === 0) return '[]';

  if(len <= opts.maxLineLength) {
    return '[ ' + props.join(opts.propSep + ' ') + ' ]';
  } else {
    return '[' + '\n' + props.map(addSpaces).join(opts.propSep + '\n') + '\n' + ']';
  }
});

function addSpaces(v) {
  return v.split('\n').map(function(vv) { return '  ' + vv; }).join('\n');
}

function formatObject(value, opts, prefix, props) {
  props = props || opts.keys(value);

  var len = 0;

  opts.seen.push(value);
  props = props.map(function(prop) {
    var f = formatProperty(value, opts, prop);
    len += f.length;
    return f;
  });
  opts.seen.pop();

  if(props.length === 0) return '{}';

  if(len <= opts.maxLineLength) {
    return '{ ' + (prefix ? prefix + ' ' : '') + props.join(opts.propSep + ' ') + ' }';
  } else {
    return '{' + '\n' + (prefix ? prefix + '\n' : '') + props.map(addSpaces).join(opts.propSep + '\n') + '\n' + '}';
  }
}

format.formatPropertyName = function(name, opts) {
  return name.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/) ? name : format(name, opts)
};


function formatProperty(value, opts, prop) {
  var desc;
  try {
    desc = Object.getOwnPropertyDescriptor(value, prop) || {value: value[prop]};
  } catch(e) {
    desc = {value: e};
  }

  var propName = format.formatPropertyName(prop, opts);

  var propValue = desc.get && desc.set ?
    '[Getter/Setter]' : desc.get ?
    '[Getter]' : desc.set ?
    '[Setter]' : opts.seen.indexOf(desc.value) >= 0 ?
    '[Circular]' :
    format(desc.value, opts);

  return propName + ': ' + propValue;
}


function pad2Zero(n) {
  return n < 10 ? '0' + n : '' + n;
}

function pad3Zero(n) {
  return n < 100 ? '0' + pad2Zero(n) : '' + n;
}

function formatDate(value) {
  var to = value.getTimezoneOffset();
  var absTo = Math.abs(to);
  var hours = Math.floor(absTo / 60);
  var minutes = absTo - hours * 60;
  var tzFormat = 'GMT' + (to < 0 ? '+' : '-') + pad2Zero(hours) + pad2Zero(minutes);
  return value.toLocaleDateString() + ' ' + value.toLocaleTimeString() + '.' + pad3Zero(value.getMilliseconds()) + ' ' + tzFormat;
}

function formatObjectWithPrefix(f) {
  return function(value, opts) {
    var prefix = f(value);
    var props = opts.keys(value);
    if(props.length == 0) return prefix;
    else return formatObject(value, opts, prefix, props);
  }
}

add('date', formatObjectWithPrefix(formatDate));

var functionNameRE = /^\s*function\s*(\S*)\s*\(/;

function functionName(f) {
  if(f.name) {
    return f.name;
  }
  var name = f.toString().match(functionNameRE)[1];
  return name;
}

add('function', formatObjectWithPrefix(function(value) {
  var name = functionName(value);
  return '[Function' + (name ? ': ' + name : '') + ']';
}));

add('error', formatObjectWithPrefix(function(value) {
  var name = value.name;
  var message = value.message;
  return '[' + name + (message ? ': ' + message : '') + ']';
}));

function generateFunctionForIndexedArray(lengthProp, name) {
  return function(value) {
    var str = '';
    var max = 50;
    var len = value[lengthProp];
    if(len > 0) {
      for(var i = 0; i < max && i < len; i++) {
        var b = value[i] || 0;
        str += ' ' + pad2Zero(b.toString(16));
      }
      if(len > max)
        str += ' ... ';
    }
    return '[' + (value.constructor.name || name) + (str ? ':' + str : '') + ']';
  }
}

add('buffer', generateFunctionForIndexedArray('length', 'Buffer'));

add('array-buffer', generateFunctionForIndexedArray('byteLength'));

add('typed-array', generateFunctionForIndexedArray('byteLength'));

add('promise', function(value) {
  return '[Promise]';
});

add('xhr', function(value) {
  return '[XMLHttpRequest]';
});

add('html-element', function(value) {
  return value.outerHTML;
});

add('html-element-text', function(value) {
  return value.nodeValue;
});

add('document', function(value) {
  return value.documentElement.outerHTML;
});

add('window', function(value) {
  return '[Window]';
});
},{"should-type":20}],20:[function(require,module,exports){
var toString = Object.prototype.toString;

var types = {
  NUMBER: 'number',
  UNDEFINED: 'undefined',
  STRING: 'string',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  FUNCTION: 'function',
  NULL: 'null',
  ARRAY: 'array',
  REGEXP: 'regexp',
  DATE: 'date',
  ERROR: 'error',
  ARGUMENTS: 'arguments',
  SYMBOL: 'symbol',
  ARRAY_BUFFER: 'array-buffer',
  TYPED_ARRAY: 'typed-array',
  DATA_VIEW: 'data-view',
  MAP: 'map',
  SET: 'set',
  WEAK_SET: 'weak-set',
  WEAK_MAP: 'weak-map',
  PROMISE: 'promise',

  WRAPPER_NUMBER: 'object-number',
  WRAPPER_BOOLEAN: 'object-boolean',
  WRAPPER_STRING: 'object-string',

// node buffer
  BUFFER: 'buffer',

// dom html element
  HTML_ELEMENT: 'html-element',
  HTML_ELEMENT_TEXT: 'html-element-text',
  DOCUMENT: 'document',
  WINDOW: 'window',
  FILE: 'file',
  FILE_LIST: 'file-list',
  BLOB: 'blob',

  XHR: 'xhr'
};

module.exports = function getType(instance) {
  var type = typeof instance;

  switch(type) {
    case types.NUMBER:
      return types.NUMBER;
    case types.UNDEFINED:
      return types.UNDEFINED;
    case types.STRING:
      return types.STRING;
    case types.BOOLEAN:
      return types.BOOLEAN;
    case types.FUNCTION:
      return types.FUNCTION;
    case types.SYMBOL:
      return types.SYMBOL;
    case types.OBJECT:
      if(instance === null) return types.NULL;

      var clazz = toString.call(instance);

      switch(clazz) {
        case '[object String]':
          return types.WRAPPER_STRING;
        case '[object Boolean]':
          return types.WRAPPER_BOOLEAN;
        case '[object Number]':
          return types.WRAPPER_NUMBER;
        case '[object Array]':
          return types.ARRAY;
        case '[object RegExp]':
          return types.REGEXP;
        case '[object Error]':
          return types.ERROR;
        case '[object Date]':
          return types.DATE;
        case '[object Arguments]':
          return types.ARGUMENTS;
        case '[object Math]':
          return types.OBJECT;
        case '[object JSON]':
          return types.OBJECT;
        case '[object ArrayBuffer]':
          return types.ARRAY_BUFFER;
        case '[object Int8Array]':
          return types.TYPED_ARRAY;
        case '[object Uint8Array]':
          return types.TYPED_ARRAY;
        case '[object Uint8ClampedArray]':
          return types.TYPED_ARRAY;
        case '[object Int16Array]':
          return types.TYPED_ARRAY;
        case '[object Uint16Array]':
          return types.TYPED_ARRAY;
        case '[object Int32Array]':
          return types.TYPED_ARRAY;
        case '[object Uint32Array]':
          return types.TYPED_ARRAY;
        case '[object Float32Array]':
          return types.TYPED_ARRAY;
        case '[object Float64Array]':
          return types.TYPED_ARRAY;
        case '[object DataView]':
          return types.DATA_VIEW;
        case '[object Map]':
          return types.MAP;
        case '[object WeakMap]':
          return types.WEAK_MAP;
        case '[object Set]':
          return types.SET;
        case '[object WeakSet]':
          return types.WEAK_SET;
        case '[object Promise]':
          return types.PROMISE;
        case '[object Window]':
          return types.WINDOW;
        case '[object HTMLDocument]':
          return types.DOCUMENT;
        case '[object Blob]':
          return types.BLOB;
        case '[object File]':
          return types.FILE;
        case '[object FileList]':
          return types.FILE_LIST;
        case '[object XMLHttpRequest]':
          return types.XHR;
        case '[object Text]':
          return types.HTML_ELEMENT_TEXT;
        default:
          if((typeof Promise === types.FUNCTION && instance instanceof Promise) || (getType(instance.then) === types.FUNCTION && instance.then.length >= 2)) {
            return types.PROMISE;
          }

          if(typeof Buffer !== 'undefined' && instance instanceof Buffer) {
            return types.BUFFER;
          }

          if(/^\[object HTML\w+Element\]$/.test(clazz)) {
            return types.HTML_ELEMENT;
          }

          if(clazz === '[object Object]') {
            return types.OBJECT;
          }
      }
  }
};

Object.keys(types).forEach(function(typeName) {
  module.exports[typeName] = types[typeName];
});

},{}]},{},[1])(1)
});