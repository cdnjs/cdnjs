
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

var AssertionError = require('./error');

module.exports = Assertion;


function inspect (val) {
  return (val ? val.toString() : 'null');
}

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
  this.include = true;
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
    , 'expected ' + this.inspect + ' to be truthy'
    , 'expected ' + this.inspect + ' to be falsey');

  return this;
});

Assertion.prototype.__defineGetter__('false', function () {
  this.assert(
      false === this.obj
    , 'expected ' + this.inspect + ' to be truthy'
    , 'expected ' + this.inspect + ' to be falsey');

  return this;
});

Assertion.prototype.__defineGetter__('exist', function () {
  this.assert(
      null !== this.obj
    , 'expected ' + this.inspect + ' to exist'
    , 'expected ' + this.inspect + ' to not exist');

  return this;
});

Assertion.prototype.__defineGetter__('empty', function () {
  new Assertion(this.obj).to.have.property('length');

  this.assert(
      0 === this.obj.length
    , 'expected ' + this.inspect + ' to exist'
    , 'expected ' + this.inspect + ' to not exist');

  return this;
});

Assertion.prototype.equal = function (val) {
  this.assert(
      val === this.obj
    , 'expected ' + this.inspect + ' to equal ' + inspect(val)
    , 'expected ' + this.inspect + ' to not equal ' + inspect(val));

  return this;
};

Assertion.prototype.above = function (val) {
  this.assert(
      this.obj > val
    , 'expected ' + this.inspect + ' to be above ' + val
    , 'expected ' + this.inspect + ' to be below' + val);

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
    , 'expected ' + this.inspect + ' to not be a ' + type);

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

Assertion.prototype.property = function (name) {
  this.assert(
      undefined !== this.obj[name]
    , 'expected ' + this.inspect + ' to have property ' + name
    , 'expected ' + this.inspect + ' to not have property ' + name);

  this.obj = this.obj[name];
  return this;
};

Assertion.prototype.length = function (n) {
  new Assertion(this.obj).to.have.property('length');
  var len = this.obj.length;

  this.assert(
      len == n
    , 'expected ' + this.inspect + ' to be an length of ' + n + ' bug got ' + len
    , 'expected ' + this.inspect + ' to not have a length of ' + len);

  return this;
};

Assertion.prototype.match = function (re) {
  this.assert(
      re.exec(this.obj)
    , 'expected ' + this.inspect + ' to match ' + re
    , 'expected ' + this.inspect + ' to not match ' + re);

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

Assertion.prototype.string = function (str) {
  new Assertion(this.obj).is.a('string');

  this.assert(
      ~this.obj.indexOf(str)
    , 'expected ' + this.inspect + ' to include ' + str
    , 'expected ' + this.inspect + ' to not include ' + str);

  return this;
};

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
}); // module: assertion.js

require.register("chai.js", function(module, exports, require){

var exports = module.exports = {};

exports.version = '0.0.1';

exports.expect = function (val, message) {
  return new exports.Assertion(val, message);
};

exports.assert = require('./interface/assert');


exports.Assertion = require('./assertion');
exports.AssertionError = require('./error');
}); // module: chai.js

require.register("error.js", function(module, exports, require){

module.exports = AssertionError;

function AssertionError (options) {
  options = options || {};
  this.name = 'AssertionError';
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  var stackStartFunction = options.stackStartFunction;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
};

AssertionError.prototype.summary = function() {
  return this.name + (this.message ? ': ' + this.message : '');
};

AssertionError.prototype.details = function() {
  return 'In "' + this.operator + '":\n\tExpected: ' + this.expected + '\n\tFound: ' + this.actual;
};

AssertionError.prototype.toString = function() {
  return this.summary() + '\n' + this.details();
};

}); // module: error.js

require.register("interface/assert.js", function(module, exports, require){
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

assert.strictEqual = function (act, exp, msg) {

};

assert.strictNotEqual = function (Act, exp, msg) {

};

assert.deepEqual = function (act, exp, msg) {

};

assert.notDeepEqual = function (act, exp, msg) {

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
  new Assertion(exp, msg).length(len);
};

assert.throws = function (fn, type, msg) {
  new Assertions(fn, msg).to.throw(type);
};
}); // module: interface/assert.js
chai = require('chai');

expect = chai.expect;
assert = chai.assert;

