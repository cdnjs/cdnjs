!function (name, definition) {
  if (typeof define == 'function' && typeof define.amd  == 'object') define(definition);
  else this[name] = definition();
}('chai', function () {

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

/**
 * ### BDD Style Introduction
 *
 * The BDD style is exposed through `expect` or `should` interfaces. In both
 * scenarios, you chain together natural language assertions.
 *
 *      // expect
 *      var expect = require('chai').expect;
 *      expect(foo).to.equal('bar');
 *
 *      // should
 *      var should = require('chai').should();
 *      foo.should.equal('bar');
 *
 * #### Differences
 *
 * The `expect` interface provides a function as a starting point for chaining
 * your language assertions. It works on both node.js and in the browser.
 *
 * The `should` interface extends `Object.prototype` to provide a single getter as
 * the starting point for your language assertions. Most browser don't like
 * extensions to `Object.prototype` so it is not recommended for browser use.
 */

/*!
 * Module dependencies.
 */

var AssertionError = require('./error')
  , eql = require('./utils/eql')
  , inspect = require('./utils/inspect')
  , statusCodes = require('./utils/constants').STATUS_CODES;

/*!
 * Module export.
 */

module.exports = Assertion;

/*!
 * # Assertion Constructor
 *
 * Creates object for chaining.
 *
 * @api private
 */

function Assertion (obj, msg, stack) {
  this.ssfi = stack || arguments.callee;
  this.obj = obj;
  this.msg = msg;
}

/*!
 * # .assert(expression, message, negateMessage)
 *
 * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
 *
 * @name assert
 * @param {Philosophical} expression to be tested
 * @param {String} message to display if fails
 * @param {String} negatedMessage to display if negated expression fails
 * @api privage
 */

Assertion.prototype.assert = function (expr, msg, negateMsg) {
  var msg = (this.negate ? negateMsg : msg)
    , ok = this.negate ? !expr : expr;

  if (!ok) {
    throw new AssertionError({
      operator: this.msg,
      message: msg,
      stackStartFunction: this.ssfi
    });
  }
};

/*!
 * # inspect
 *
 * Returns the current object stringified.
 *
 * @name inspect
 * @api private
 */

Object.defineProperty(Assertion.prototype, 'inspect',
  { get: function () {
      return inspect(this.obj);
    }
});

/**
 * # to
 *
 * Language chain.
 *
 * @name to
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'to',
  { get: function () {
      return this;
    }
});

/**
 * # be
 *
 * Language chain.
 *
 * @name be
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'be',
  { get: function () {
      return this;
    }
});

/**
 * # an
 *
 * Language chain.
 *
 * @name an
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'an',
  { get: function () {
      return this;
    }
});
/**
 * # is
 *
 * Language chain.
 *
 * @name is
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'is',
  { get: function () {
      return this;
    }
});

/**
 * # and
 *
 * Language chain.
 *
 * @name and
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'and',
  { get: function () {
      return this;
    }
});

/**
 * # have
 *
 * Language chain.
 *
 * @name have
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'have',
  { get: function () {
      return this;
    }
});

/**
 * # with
 *
 * Language chain.
 *
 * @name with
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'with',
  { get: function () {
      return this;
    }
});

/**
 * # .not
 *
 * Negates any of assertions following in the chain.
 *
 * @name not
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'not',
  { get: function () {
      this.negate = true;
      return this;
    }
});

/**
 * # .ok
 *
 * Assert object truthiness.
 *
 *      expect('everthing').to.be.ok;
 *      expect(false).to.not.be.ok;
 *      expect(undefined).to.not.be.ok;
 *      expect(null).to.not.be.ok;
 *
 * @name ok
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'ok',
  { get: function () {
      this.assert(
          this.obj
        , 'expected ' + this.inspect + ' to be truthy'
        , 'expected ' + this.inspect + ' to be falsey');

      return this;
    }
});

/**
 * # .true
 *
 * Assert object is true
 *
 * @name true
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'true',
  { get: function () {
      this.assert(
          true === this.obj
        , 'expected ' + this.inspect + ' to be true'
        , 'expected ' + this.inspect + ' to be false');

      return this;
    }
});

/**
 * # .false
 *
 * Assert object is false
 *
 * @name false
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'false',
  { get: function () {
      this.assert(
          false === this.obj
        , 'expected ' + this.inspect + ' to be false'
        , 'expected ' + this.inspect + ' to be true');

      return this;
    }
});

/**
 * # .exist
 *
 * Assert object exists (null).
 *
 *      var foo = 'hi'
 *        , bar;
 *      expect(foo).to.exist;
 *      expect(bar).to.not.exist;
 *
 * @name exist
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'exist',
  { get: function () {
      this.assert(
          null != this.obj
        , 'expected ' + this.inspect + ' to exist'
        , 'expected ' + this.inspect + ' to not exist');

      return this;
    }
});

/**
 * # .empty
 *
 * Assert object's length to be 0.
 *
 *      expect([]).to.be.empty;
 *
 * @name empty
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'empty',
  { get: function () {
      new Assertion(this.obj).to.have.property('length');

      this.assert(
          0 === this.obj.length
        , 'expected ' + this.inspect + ' to be empty'
        , 'expected ' + this.inspect + ' not to be empty');

      return this;
    }
});

/**
 * # .arguments
 *
 * Assert object is an instanceof arguments.
 *
 *      function test () {
 *        expect(arguments).to.be.arguments;
 *      }
 *
 * @name arguments
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'arguments',
  { get: function () {
      this.assert(
          '[object Arguments]' == Object.prototype.toString.call(this.obj)
        , 'expected ' + this.inspect + ' to be arguments'
        , 'expected ' + this.inspect + ' to not be arguments');

      return this;
    }
});

/**
 * # .equal(value)
 *
 * Assert strict equality.
 *
 *      expect('hello').to.equal('hello');
 *
 * @name equal
 * @param {*} value
 * @api public
 */

Assertion.prototype.equal = function (val) {
  this.assert(
      val === this.obj
    , 'expected ' + this.inspect + ' to equal ' + inspect(val)
    , 'expected ' + this.inspect + ' to not equal ' + inspect(val));

  return this;
};

/**
 * # .eql(value)
 *
 * Assert deep equality.
 *
 *      expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
 *
 * @name eql
 * @param {*} value
 * @api public
 */

Assertion.prototype.eql = function (obj) {
  this.assert(
      eql(obj, this.obj)
    , 'expected ' + this.inspect + ' to equal ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not equal ' + inspect(obj));
  return this;
};

/**
 * # .above(value)
 *
 * Assert greater than `value`.
 *
 *      expect(10).to.be.above(5);
 *
 * @name above
 * @param {Number} value
 * @api public
 */

Assertion.prototype.above = function (val) {
  this.assert(
      this.obj > val
    , 'expected ' + this.inspect + ' to be above ' + val
    , 'expected ' + this.inspect + ' to be below ' + val);

  return this;
};

/**
 * # .below(value)
 *
 * Assert less than `value`.
 *
 *      expect(5).to.be.below(10);
 *
 * @name below
 * @param {Number} value
 * @api public
 */

Assertion.prototype.below = function (val) {
  this.assert(
      this.obj < val
    , 'expected ' + this.inspect + ' to be below ' + val
    , 'expected ' + this.inspect + ' to be above ' + val);

  return this;
};

/**
 * # .within(start, finish)
 *
 * Assert that a number is within a range.
 *
 *      expect(7).to.be.within(5,10);
 *
 * @name within
 * @param {Number} start lowerbound inclusive
 * @param {Number} finish upperbound inclusive
 * @api public
 */

Assertion.prototype.within = function (start, finish) {
  var range = start + '..' + finish;

  this.assert(
      this.obj >= start && this.obj <= finish
    , 'expected ' + this.inspect + ' to be within ' + range
    , 'expected ' + this.inspect + ' to not be within ' + range);

  return this;
};

/**
 * # .a(type)
 *
 * Assert typeof.
 *
 *      expect('test').to.be.a('string');
 *
 * @name a
 * @param {String} type
 * @api public
 */

Assertion.prototype.a = function (type) {
  this.assert(
      type == typeof this.obj
    , 'expected ' + this.inspect + ' to be a ' + type
    , 'expected ' + this.inspect + ' not to be a ' + type);

  return this;
};

/**
 * # .instanceof(constructor)
 *
 * Assert instanceof.
 *
 *      var Tea = function (name) { this.name = name; }
 *        , Chai = new Tea('chai');
 *
 *      expect(Chai).to.be.an.instanceOf(Tea);
 *
 * @name instanceof
 * @param {Constructor}
 * @api public
 */

Assertion.prototype.instanceof = function (constructor) {
  var name = constructor.name;
  this.assert(
      this.obj instanceof constructor
    , 'expected ' + this.inspect + ' to be an instance of ' + name
    , 'expected ' + this.inspect + ' to not be an instance of ' + name);

  return this;
};

/**
 * # .property(name, [value])
 *
 * Assert that property of `name` exists, optionally with `value`.
 *
 *      var obj = { foo: 'bar' }
 *      expect(obj).to.have.property('foo');
 *      expect(obj).to.have.property('foo', 'bar');
 *      expect(obj).to.have.property('foo').to.be.a('string');
 *
 * @name property
 * @param {String} name
 * @param {*} value (optional)
 * @returns value of property for chaining
 * @api public
 */

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

/**
 * # .ownProperty(name)
 *
 * Assert that has own property by `name`.
 *
 *      expect('test').to.have.ownProperty('length');
 *
 * @name ownProperty
 * @alias haveOwnProperty
 * @param {String} name
 * @api public
 */

Assertion.prototype.ownProperty = function (name) {
  this.assert(
      this.obj.hasOwnProperty(name)
    , 'expected ' + this.inspect + ' to have own property ' + inspect(name)
    , 'expected ' + this.inspect + ' to not have own property ' + inspect(name));
  return this;
};

/**
 * # .length(val)
 *
 * Assert that object has expected length.
 *
 *      expect([1,2,3]).to.have.length(3);
 *      expect('foobar').to.have.length(6);
 *
 * @name length
 * @alias lengthOf
 * @param {Number} length
 * @api public
 */

Assertion.prototype.length = function (n) {
  new Assertion(this.obj).to.have.property('length');
  var len = this.obj.length;

  this.assert(
      len == n
    , 'expected ' + this.inspect + ' to have a length of ' + n + ' but got ' + len
    , 'expected ' + this.inspect + ' to not have a length of ' + len);

  return this;
};

/**
 * # .match(regexp)
 *
 * Assert that matches regular expression.
 *
 *      expect('foobar').to.match(/^foo/);
 *
 * @name match
 * @param {RegExp} RegularExpression
 * @api public
 */

Assertion.prototype.match = function (re) {
  this.assert(
      re.exec(this.obj)
    , 'expected ' + this.inspect + ' to match ' + re
    , 'expected ' + this.inspect + ' not to match ' + re);

  return this;
};

/**
 * # .include(obj)
 *
 * Assert the inclusion of an object in an Array or substring in string.
 *
 *      expect([1,2,3]).to.contain(2);
 *
 * @name include
 * @param {Object|String|Number} obj
 * @api public
 */

Assertion.prototype.include = function (obj) {
  this.assert(
      ~this.obj.indexOf(obj)
    , 'expected ' + this.inspect + ' to include ' + inspect(obj)
    , 'expected ' + this.inspect + ' to not include ' + inspect(obj));

  return this;
};

/**
 * # .string(string)
 *
 * Assert inclusion of string in string.
 *
 *      expect('foobar').to.include.string('bar');
 *
 * @name string
 * @param {String} string
 * @api public
 */

Assertion.prototype.string = function (str) {
  new Assertion(this.obj).is.a('string');

  this.assert(
      ~this.obj.indexOf(str)
    , 'expected ' + this.inspect + ' to contain ' + inspect(str)
    , 'expected ' + this.inspect + ' to not contain ' + inspect(str));

  return this;
};



/**
 * # contain
 *
 * Toggles the `contain` flag for the `keys` assertion.
 *
 * @name contain
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'contain',
  { get: function () {
      this.contains = true;
      return this;
    }
});

/**
 * # .keys(key1, [key2], [...])
 *
 * Assert exact keys or the inclusing of keys using the `contain` modifier.
 *
 *      expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
 *      expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');
 *
 * @name keys
 * @alias key
 * @param {String|Array} Keys
 * @api public
 */

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
  if (!this.negate && !this.contains) {
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
  str = (this.contains ? 'contain ' : 'have ') + str;

  // Assertion
  this.assert(
      ok
    , 'expected ' + this.inspect + ' to ' + str
    , 'expected ' + this.inspect + ' to not ' + str);

  return this;
}

/**
 * # .throw(constructor)
 *
 * Assert that a function will throw a specific type of error.
 *
 *      var fn = function () { throw new ReferenceError(''); }
 *      expect(fn).to.throw(ReferenceError);
 *
 * @name throw
 * @alias throws
 * @param {ErrorConstructor} constructor
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
 * @api public
 */

Assertion.prototype.throw = function (constructor) {
  new Assertion(this.obj).is.a('function');

  var thrown = false;

  try {
    this.obj();
  } catch (err) {
    if (constructor) {
      this.assert(
          err instanceof constructor && err.name == constructor.name
        , 'expected ' + this.inspect + ' to throw ' + constructor.name + ' but a ' + err.name + ' was thrown'
        , 'expected ' + this.inspect + ' to not throw ' + constructor.name );

      return this;
    } else {
      thrown = true;
    }
  }

  var name = (constructor ? constructor.name : 'an error');

  this.assert(
      thrown === true
    , 'expected ' + this.inspect + ' to throw ' + name
    , 'expected ' + this.inspect + ' to not throw ' + name);

  return this;
};

/**
 * # .header(code)
 *
 * Assert `header` field has expected `value`.
 *
 * @name header
 * @param {String} field
 * @param {String} value
 * @api public
 */

Assertion.prototype.header = function (field, val) {
  new Assertion(this.obj)
        .to.have.property('headers').and
        .to.have.property(field.toLowerCase(), val);

  return this;
}

/**
 * # .status(code)
 *
 * Assert `statusCode` of `code'.
 *
 * @name status
 * @param {Number} code
 * @api public
 */

Assertion.prototype.status = function (code) {
  new Assertion(this.obj).to.have.property('statusCode');

  var status = this.obj.statusCode;

  this.assert(
      code == status
    , 'expected response code of ' + code + ' ' + inspect(statusCodes[code])
        + ', but got ' + status + ' ' + inspect(statusCodes[status])
    , 'expected to not respond with ' + code + ' ' + inspect(statusCodes[code]));
}

/**
 * # json
 *
 * Assert that this response has content-type: application/json.
 *
 * @name json
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'json',
  { get: function () {
      new Assertion(this.obj).to.have.header('content-type', 'application/json; charset=utf-8');
      return this;
    }
});

/**
 * # html
 *
 * Assert that this response has content-type: text/html.
 *
 * @name html
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'html',
  { get: function () {
      new Assertion(this.obj).to.have.header('content-type', 'text/html; charset=utf-8');
      return this;
    }
});


/*!
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
('below', 'lessThan')
('throw', 'throws');
}); // module: assertion.js

require.register("chai.js", function(module, exports, require){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var exports = module.exports = {};

exports.version = '0.1.6';

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
};
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
  var str = '';

  if (this.operator) {
    str += 'In: \'' + this.operator + '\'\n\t';
  }

  str += '' + this.name + (this.message ? ': ' + this.message : '');

  return str;
};

AssertionError.prototype.details = function() {
  return this.summary();
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

/**
 * ### TDD Style Introduction
 *
 * The TDD style is exposed through `assert` interfaces. This provides
 * the classic assert.`test` notation, similiar to that packaged with
 * node.js. This assert module, however, provides several additional
 * tests and is browser compatible.
 *
 *      // assert
 *      var assert = require('chai').assert;
 *        , foo = 'bar';
 *
 *      assert.typeOf(foo, 'string');
 *      assert.equal(foo, 'bar');
 */

/*!
 * Module dependencies.
 */
var Assertion = require('../assertion')
  , inspect = require('../utils/inspect')

/*!
 * Module export.
 */

var assert = module.exports = {};

/**
 * # .ok(object, [message])
 *
 * Assert object is truthy.
 *
 *      assert.ok('everthing', 'everything is ok');
 *      assert.ok(false, 'this will fail');
 *
 * @name ok
 * @param {*} object to test
 * @param {String} message
 * @api public
 */

assert.ok = function (val, msg) {
  new Assertion(val, msg).is.ok;
};

/**
 * # .equal(actual, expected, [message])
 *
 * Assert strict equality.
 *
 *      assert.equal(3, 3, 'these numbers are equal');
 *
 * @name equal
 * @param {*} actual
 * @param {*} expected
 * @param {String} message
 * @api public
 */

assert.equal = function (act, exp, msg) {
  var test = new Assertion(act, msg);

  test.assert(
      exp == test.obj
    , 'expected ' + test.inspect + ' to equal ' + inspect(exp)
    , 'expected ' + test.inspect + ' to not equal ' + inspect(exp));
};

/**
 * # .notEqual(actual, expected, [message])
 *
 * Assert not equal.
 *
 *      assert.notEqual(3, 4, 'these numbers are not equal');
 *
 * @name notEqual
 * @param {*} actual
 * @param {*} expected
 * @param {String} message
 * @api public
 */

assert.notEqual = function (act, exp, msg) {
  var test = new Assertion(act, msg);

  test.assert(
      exp != test.obj
    , 'expected ' + test.inspect + ' to equal ' + inspect(exp)
    , 'expected ' + test.inspect + ' to not equal ' + inspect(exp));
};

/**
 * # .strictEqual(actual, expected, [message])
 *
 * Assert strict equality.
 *
 *      assert.strictEqual(true, true, 'these booleans are strictly equal');
 *
 * @name strictEqual
 * @param {*} actual
 * @param {*} expected
 * @param {String} message
 * @api public
 */

assert.strictEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.equal(exp);
};

/**
 * # .notStrictEqual(actual, expected, [message])
 *
 * Assert strict equality.
 *
 *      assert.notStrictEqual(1, true, 'these booleans are not strictly equal');
 *
 * @name notStrictEqual
 * @param {*} actual
 * @param {*} expected
 * @param {String} message
 * @api public
 */

assert.notStrictEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.not.equal(exp);
};

/**
 * # .deepEqual(actual, expected, [message])
 *
 * Assert not deep equality.
 *
 *      assert.deepEqual({ tea: 'green' }, { tea: 'green' });
 *
 * @name deepEqual
 * @param {*} actual
 * @param {*} expected
 * @param {String} message
 * @api public
 */

assert.deepEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.eql(exp);
};

/**
 * # .notDeepEqual(actual, expected, [message])
 *
 * Assert not deep equality.
 *
 *      assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
 *
 * @name notDeepEqual
 * @param {*} actual
 * @param {*} expected
 * @param {String} message
 * @api public
 */

assert.notDeepEqual = function (act, exp, msg) {
  new Assertion(act, msg).to.not.eql(exp);
};

/**
 * # .isTrue(value, [message])
 *
 * Assert `value` is true.
 *
 *      var tea_served = true;
 *      assert.isTrue(tea_served, 'the tea has been served');
 *
 * @name isTrue
 * @param {Boolean} value
 * @param {String} message
 * @api public
 */

assert.isTrue = function (val, msg) {
  new Assertion(val, msg).is.true;
};

/**
 * # .isFalse(value, [message])
 *
 * Assert `value` is false.
 *
 *      var tea_served = false;
 *      assert.isFalse(tea_served, 'no tea yet? hmm...');
 *
 * @name isFalse
 * @param {Boolean} value
 * @param {String} message
 * @api public
 */

assert.isFalse = function (val, msg) {
  new Assertion(val, msg).is.false;
};

/**
 * # .isNull(value, [message])
 *
 * Assert `value` is null.
 *
 *      assert.isNull(err, 'no errors');
 *
 * @name isNull
 * @param {*} value
 * @param {String} message
 * @api public
 */

assert.isNull = function (val, msg) {
  new Assertion(val, msg).to.not.exist;
};

/**
 * # .isNotNull(value, [message])
 *
 * Assert `value` is not null.
 *
 *      var tea = 'tasty chai';
 *      assert.isNotNull(tea, 'great, time for tea!');
 *
 * @name isNotNull
 * @param {*} value
 * @param {String} message
 * @api public
 */

assert.isNotNull = function (val, msg) {
  new Assertion(val, msg).to.exist;
};

/**
 * # .isUndefined(value, [message])
 *
 * Assert `value` is undefined.
 *
 *      assert.isUndefined(tea, 'no tea defined');
 *
 * @name isUndefined
 * @param {*} value
 * @param {String} message
 * @api public
 */

assert.isUndefined = function (val, msg) {
  new Assertion(val, msg).to.equal(undefined);
};

/**
 * # .isFunction(value, [message])
 *
 * Assert `value` is a function.
 *
 *      var serve_tea = function () { return 'cup of tea'; };
 *      assert.isFunction(serve_tea, 'great, we can have tea now');
 *
 * @name isFunction
 * @param {Function} value
 * @param {String} message
 * @api public
 */

assert.isFunction = function (val, msg) {
  new Assertion(val, msg).to.be.a('function');
};

/**
 * # .isObject(value, [message])
 *
 * Assert `value` is an object.
 *
 *      var selection = { name: 'Chai', serve: 'with spices' };
 *      assert.isObject(selection, 'tea selection is an object');
 *
 * @name isObject
 * @param {Object} value
 * @param {String} message
 * @api public
 */

assert.isObject = function (val, msg) {
  new Assertion(val, msg).to.be.an('object');
};

/**
 * # .isArray(value, [message])
 *
 * Assert `value` is an instance of Array.
 *
 *      var menu = [ 'green', 'chai', 'oolong' ];
 *      assert.isArray(menu, 'what kind of tea do we want?');
 *
 * @name isArray
 * @param {*} value
 * @param {String} message
 * @api public
 */

assert.isArray = function (val, msg) {
  new Assertion(val, msg).to.be.instanceof(Array);
};

/**
 * # .isString(value, [message])
 *
 * Assert `value` is a string.
 *
 *      var teaorder = 'chai';
 *      assert.isString(tea_order, 'order placed');
 *
 * @name isString
 * @param {String} value
 * @param {String} message
 * @api public
 */

assert.isString = function (val, msg) {
  new Assertion(val, msg).to.be.a('string');
};

/**
 * # .isNumber(value, [message])
 *
 * Assert `value` is a number
 *
 *      var cups = 2;
 *      assert.isNumber(cups, 'how many cups');
 *
 * @name isNumber
 * @param {Number} value
 * @param {String} message
 * @api public
 */

assert.isNumber = function (val, msg) {
  new Assertion(val, msg).to.be.instanceof(Number);
};

/**
 * # .isBoolean(value, [message])
 *
 * Assert `value` is a boolean
 *
 *      var teaready = true
 *        , teaserved = false;
 *
 *      assert.isBoolean(tea_ready, 'is the tea ready');
 *      assert.isBoolean(tea_served, 'has tea been served');
 *
 * @name isBoolean
 * @param {*} value
 * @param {String} message
 * @api public
 */

assert.isBoolean = function (val, msg) {
  new Assertion(val, msg).to.be.a('boolean');
};

/**
 * # .typeOf(value, name, [message])
 *
 * Assert typeof `value` is `name`.
 *
 *      assert.typeOf('tea', 'string', 'we have a string');
 *
 * @name typeOf
 * @param {*} value
 * @param {String} typeof name
 * @param {String} message
 * @api public
 */

assert.typeOf = function (val, type, msg) {
  new Assertion(val, msg).to.be.a(type);
};

/**
 * # .instanceOf(object, constructor, [message])
 *
 * Assert `value` is instanceof `constructor`.
 *
 *      var Tea = function (name) { this.name = name; }
 *        , Chai = new Tea('chai');
 *
 *      assert.instanceOf(Chai, Tea, 'chai is an instance of tea');
 *
 * @name instanceOf
 * @param {Object} object
 * @param {Constructor} constructor
 * @param {String} message
 * @api public
 */

assert.instanceOf = function (val, type, msg) {
  new Assertion(val, msg).to.be.instanceof(type);
};

/**
 * # .include(value, includes, [message])
 *
 * Assert the inclusion of an object in another. Works
 * for strings and arrays.
 *
 *      assert.include('foobar', 'bar', 'foobar contains string `var`);
 *      assert.include([ 1, 2, 3], 3, 'array contains value);
 *
 * @name include
 * @param {Array|String} value
 * @param {*} includes
 * @param {String} message
 * @api public
 */

assert.include = function (exp, inc, msg) {
  var obj = new Assertion(exp, msg);

  if (Array.isArray(exp)) {
    obj.to.include(inc);
  } else if ('string' === typeof exp) {
    obj.to.contain.string(inc);
  }
};

/**
 * # .match(value, regex, [message])
 *
 * Assert that `value` matches regular expression.
 *
 *      assert.match('foobar', /^foo/, 'Regexp matches');
 *
 * @name match
 * @param {*} value
 * @param {RegExp} RegularExpression
 * @param {String} message
 * @api public
 */

assert.match = function (exp, re, msg) {
  new Assertion(exp, msg).to.match(re);
};

/**
 * # .length(value, constructor, [message])
 *
 * Assert that object has expected length.
 *
 *      assert.length([1,2,3], 3, 'Array has length of 3');
 *      assert.length('foobar', 5, 'String has length of 6');
 *
 * @name length
 * @param {*} value
 * @param {Number} length
 * @param {String} message
 * @api public
 */

assert.length = function (exp, len, msg) {
  new Assertion(exp, msg).to.have.length(len);
};

/**
 * # .throws(function, [constructor], [message])
 *
 * Assert that a function will throw a specific
 * type of error.
 *
 *      var fn = function () { throw new ReferenceError(''); }
 *      assert.throw(fn, ReferenceError, 'function throw reference error');
 *
 * @name throws
 * @alias throw
 * @param {Function} function to test
 * @param {ErrorConstructor} constructor
 * @param {String} message
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
 * @api public
 */

assert.throws = function (fn, type, msg) {
  if ('string' === typeof type) {
    msg = type;
    type = null;
  }

  new Assertion(fn, msg).to.throw(type);
};

/**
 * # .doesNotThrow(function, [constructor], [message])
 *
 * Assert that a function will throw a specific
 * type of error.
 *
 *      var fn = function (err) { if (err) throw Error(err) };
 *      assert.doesNotThrow(fn, Error, 'function throw reference error');
 *
 * @name doesNotThrow
 * @param {Function} function to test
 * @param {ErrorConstructor} constructor
 * @param {String} message
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
 * @api public
 */

assert.doesNotThrow = function (fn, type, msg) {
  if ('string' === typeof type) {
    msg = type;
    type = null;
  }

  new Assertion(fn, msg).to.not.throw(type);
};

/*!
 * Undocumented / untested
 */

assert.ifError = function (val, msg) {
  new Assertion(val, msg).to.not.be.ok;
};

/*!
 * Aliases.
 */

(function alias(name, as){
  assert[as] = assert[name];
  return alias;
})
('length', 'lengthOf')
('throws', 'throw');
//('keys', 'key')
//('ownProperty', 'haveOwnProperty')
//('above', 'greaterThan')
//('below', 'lessThan')
//('throw', 'throws');
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

  should.throw = function (fn, err) {
    new Assertion(fn).to.throw(err);
  };

  should.exist = function (val) {
    new Assertion(val).to.exist;
  }

  // negation
  should.not = {}

  should.not.equal = function (val1, val2) {
    new Assertion(val1).to.not.equal(val2);
  };

  should.not.throw = function (fn, err) {
    new Assertion(fn).to.not.throw(err);
  };

  should.not.exist = function (val) {
    new Assertion(val).to.not.exist;
  }

  return should;
};
}); // module: interface/should.js

require.register("utils/constants.js", function(module, exports, require){

var exports = module.exports = {};

/**
 * More includes from node.js code
 * https://github.com/joyent/node/blob/master/lib/http.js
 */

exports.STATUS_CODES = {
  100 : 'Continue',
  101 : 'Switching Protocols',
  102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
  200 : 'OK',
  201 : 'Created',
  202 : 'Accepted',
  203 : 'Non-Authoritative Information',
  204 : 'No Content',
  205 : 'Reset Content',
  206 : 'Partial Content',
  207 : 'Multi-Status',               // RFC 4918
  300 : 'Multiple Choices',
  301 : 'Moved Permanently',
  302 : 'Moved Temporarily',
  303 : 'See Other',
  304 : 'Not Modified',
  305 : 'Use Proxy',
  307 : 'Temporary Redirect',
  400 : 'Bad Request',
  401 : 'Unauthorized',
  402 : 'Payment Required',
  403 : 'Forbidden',
  404 : 'Not Found',
  405 : 'Method Not Allowed',
  406 : 'Not Acceptable',
  407 : 'Proxy Authentication Required',
  408 : 'Request Time-out',
  409 : 'Conflict',
  410 : 'Gone',
  411 : 'Length Required',
  412 : 'Precondition Failed',
  413 : 'Request Entity Too Large',
  414 : 'Request-URI Too Large',
  415 : 'Unsupported Media Type',
  416 : 'Requested Range Not Satisfiable',
  417 : 'Expectation Failed',
  418 : 'I\'m a teapot',              // RFC 2324
  422 : 'Unprocessable Entity',       // RFC 4918
  423 : 'Locked',                     // RFC 4918
  424 : 'Failed Dependency',          // RFC 4918
  425 : 'Unordered Collection',       // RFC 4918
  426 : 'Upgrade Required',           // RFC 2817
  500 : 'Internal Server Error',
  501 : 'Not Implemented',
  502 : 'Bad Gateway',
  503 : 'Service Unavailable',
  504 : 'Gateway Time-out',
  505 : 'HTTP Version not supported',
  506 : 'Variant Also Negotiates',    // RFC 2295
  507 : 'Insufficient Storage',       // RFC 4918
  509 : 'Bandwidth Limit Exceeded',
  510 : 'Not Extended'                // RFC 2774
};
}); // module: utils/constants.js

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


  return require('chai');
});