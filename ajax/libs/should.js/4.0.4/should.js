/**
 * should - test framework agnostic BDD-style assertions
 * @version v4.0.4
 * @author TJ Holowaychuk <tj@vision-media.ca> and contributors
 * @link https://github.com/shouldjs/should.js
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Should=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

// Taken from node's assert module, because it sucks
// and exposes next to nothing useful.
var util = _dereq_('./util');

module.exports = _deepEqual;

var pSlice = Array.prototype.slice;

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


function objEquiv (a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (util.isArguments(a)) {
    if (!util.isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try{
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

},{"./util":15}],2:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = _dereq_('../util')
  , assert = _dereq_('assert')
  , AssertionError = assert.AssertionError;

module.exports = function(should) {
  var i = should.format;

  /**
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
   * @param {*} obj
   * @param {String} [msg]
   * @api public
   */
  should.exist = should.exists = function(obj, msg) {
    if(null == obj) {
      throw new AssertionError({
        message: msg || ('expected ' + i(obj) + ' to exist'), stackStartFunction: should.exist
      });
    }
  };

  /**
   * Asserts _obj_ does not exist, with optional message.
   *
   * @param {*} obj
   * @param {String} [msg]
   * @api public
   */

  should.not = {};
  should.not.exist = should.not.exists = function(obj, msg) {
    if(null != obj) {
      throw new AssertionError({
        message: msg || ('expected ' + i(obj) + ' to not exist'), stackStartFunction: should.not.exist
      });
    }
  };
};
},{"../util":15,"assert":16}],3:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  Assertion.add('true', function() {
    this.is.exactly(true);
  }, true);

  Assertion.alias('true', 'True');

  Assertion.add('false', function() {
    this.is.exactly(false);
  }, true);

  Assertion.alias('false', 'False');

  Assertion.add('ok', function() {
    this.params = { operator: 'to be truthy' };

    this.assert(this.obj);
  }, true);
};
},{}],4:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {

  function addLink(name) {
    Object.defineProperty(Assertion.prototype, name, {
      get: function() {
        return this;
      },
      enumerable: true
    });
  }

  ['an', 'of', 'a', 'and', 'be', 'have', 'with', 'is', 'which', 'the'].forEach(addLink);
};
},{}],5:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = _dereq_('../util'),
  eql = _dereq_('../eql');

module.exports = function(should, Assertion) {
  var i = should.format;

  Assertion.add('containEql', function(other) {
    this.params = { operator: 'to contain ' + i(other) };
    var obj = this.obj;
    if(util.isArray(obj)) {
      this.assert(obj.some(function(item) {
        return eql(item, other);
      }));
    } else if(util.isString(obj)) {
      // expect obj to be string
      this.assert(obj.indexOf(String(other)) >= 0);
    } else if(util.isObject(obj)) {
      // object contains object case
      util.forOwn(other, function(value, key) {
        obj.should.have.property(key, value);
      });
    } else {
      //other uncovered cases
      this.assert(false);
    }
  });

  Assertion.add('containDeepOrdered', function(other) {
    this.params = { operator: 'to contain ' + i(other) };

    var obj = this.obj;
    if(util.isArray(obj)) {
      if(util.isArray(other)) {
        var otherIdx = 0;
        obj.forEach(function(item) {
          try {
            should(item).not.be.Null.and.containDeep(other[otherIdx]);
            otherIdx++;
          } catch(e) {
            if(e instanceof should.AssertionError) {
              return;
            }
            throw e;
          }
        }, this);

        this.assert(otherIdx == other.length);
        //search array contain other as sub sequence
      } else {
        this.assert(false);
      }
    } else if(util.isString(obj)) {// expect other to be string
      this.assert(obj.indexOf(String(other)) >= 0);
    } else if(util.isObject(obj)) {// object contains object case
      if(util.isObject(other)) {
        util.forOwn(other, function(value, key) {
          should(obj[key]).not.be.Null.and.containDeep(value);
        });
      } else {//one of the properties contain value
        this.assert(false);
      }
    } else {
      this.eql(other);
    }
  });

  Assertion.add('containDeep', function(other) {
    this.params = { operator: 'to contain ' + i(other) };

    var obj = this.obj;
    if(util.isArray(obj)) {
      if(util.isArray(other)) {
        var usedKeys = {};
        other.forEach(function(otherItem) {
          this.assert(obj.some(function(item, index) {
            if(index in usedKeys) return false;

            try {
              should(item).not.be.Null.and.containDeep(otherItem);
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

      } else {
        this.assert(false);
      }
    } else if(util.isString(obj)) {// expect other to be string
      this.assert(obj.indexOf(String(other)) >= 0);
    } else if(util.isObject(obj)) {// object contains object case
      if(util.isObject(other)) {
        util.forOwn(other, function(value, key) {
          should(obj[key]).not.be.Null.and.containDeep(value);
        });
      } else {//one of the properties contain value
        this.assert(false);
      }
    } else {
      this.eql(other);
    }
  });

};

},{"../eql":1,"../util":15}],6:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var eql = _dereq_('../eql');

module.exports = function(should, Assertion) {
  Assertion.add('eql', function(val, description) {
    this.params = { operator: 'to equal', expected: val, showDiff: true, message: description };

    this.assert(eql(val, this.obj));
  });

  Assertion.add('equal', function(val, description) {
    this.params = { operator: 'to be', expected: val, showDiff: true, message: description };

    this.assert(val === this.obj);
  });

  Assertion.alias('equal', 'exactly');
};
},{"../eql":1}],7:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */
var util = _dereq_('../util');

module.exports = function(should, Assertion) {
  var i = should.format;

  Assertion.add('throw', function(message, properties) {
    var fn = this.obj
      , err = {}
      , errorInfo = ''
      , thrown = false;

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
        } else if(util.isObject(message)) {
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
},{"../util":15}],8:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = _dereq_('../util'),
  eql = _dereq_('../eql');

module.exports = function(should, Assertion) {
  var i = should.format;

  Assertion.add('match', function(other, description) {
    this.params = { operator: 'to match ' + i(other), message: description };

    if(!eql(this.obj, other)) {
      if(util.isRegExp(other)) { // something - regex

        if(util.isString(this.obj)) {

          this.assert(other.exec(this.obj));
        } else if(util.isArray(this.obj)) {

          this.obj.forEach(function(item) {
            this.assert(other.exec(item));// should we try to convert to String and exec?
          }, this);
        } else if(util.isObject(this.obj)) {

          var notMatchedProps = [], matchedProps = [];
          util.forOwn(this.obj, function(value, name) {
            if(other.exec(value)) matchedProps.push(util.formatProp(name));
            else notMatchedProps.push(util.formatProp(name) + ' (' + i(value) +')');
          }, this);

          if(notMatchedProps.length)
            this.params.operator += '\n\tnot matched properties: ' + notMatchedProps.join(', ');
          if(matchedProps.length)
            this.params.operator += '\n\tmatched properties: ' + matchedProps.join(', ');

          this.assert(notMatchedProps.length == 0);
        } // should we try to convert to String and exec?
      } else if(util.isFunction(other)) {
        var res;
        try {
          res = other(this.obj);
        } catch(e) {
          if(e instanceof should.AssertionError) {
            this.params.operator += '\n\t' + e.message;
          }
          throw e;
        }

        if(res instanceof Assertion) {
          this.params.operator += '\n\t' + res.getMessage();
        }

        //if we throw exception ok - it is used .should inside
        if(util.isBoolean(res)) {
          this.assert(res); // if it is just boolean function assert on it
        }
      } else if(util.isObject(other)) { // try to match properties (for Object and Array)
        notMatchedProps = []; matchedProps = [];

        util.forOwn(other, function(value, key) {
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
          this.params.operator += '\n\tnot matched properties: ' + notMatchedProps.join(', ');
        if(matchedProps.length)
          this.params.operator += '\n\tmatched properties: ' + matchedProps.join(', ');

        this.assert(notMatchedProps.length == 0);
      } else {
        this.assert(false);
      }
    }
  });

  Assertion.add('matchEach', function(other, description) {
    this.params = { operator: 'to match each ' + i(other), message: description };

    var f = other;

    if(util.isRegExp(other))
      f = function(it) {
        return !!other.exec(it);
      };
    else if(!util.isFunction(other))
      f = function(it) {
        return eql(it, other);
      };

    util.forOwn(this.obj, function(value, key) {
      var res = f(value, key);

      //if we throw exception ok - it is used .should inside
      if(util.isBoolean(res)) {
        this.assert(res); // if it is just boolean function assert on it
      }
    }, this);
  });
};
},{"../eql":1,"../util":15}],9:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  Assertion.add('NaN', function() {
    this.params = { operator: 'to be NaN' };

    this.assert(this.obj !== this.obj);
  }, true);

  Assertion.add('Infinity', function() {
    this.params = { operator: 'to be Infinity' };

    this.is.a.Number
      .and.not.a.NaN
      .and.assert(!isFinite(this.obj));
  }, true);

  Assertion.add('within', function(start, finish, description) {
    this.params = { operator: 'to be within ' + start + '..' + finish, message: description };

    this.assert(this.obj >= start && this.obj <= finish);
  });

  Assertion.add('approximately', function(value, delta, description) {
    this.params = { operator: 'to be approximately ' + value + " ±" + delta, message: description };

    this.assert(Math.abs(this.obj - value) <= delta);
  });

  Assertion.add('above', function(n, description) {
    this.params = { operator: 'to be above ' + n, message: description };

    this.assert(this.obj > n);
  });

  Assertion.add('below', function(n, description) {
    this.params = { operator: 'to be below ' + n, message: description };

    this.assert(this.obj < n);
  });

  Assertion.alias('above', 'greaterThan');
  Assertion.alias('below', 'lessThan');

};

},{}],10:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = _dereq_('../util'),
  eql = _dereq_('../eql');

var aSlice = Array.prototype.slice;

module.exports = function(should, Assertion) {
  var i = should.format;

  Assertion.add('enumerable', function(name, val) {
    name = String(name);

    this.params = {
      operator:"to have enumerable property " + util.formatProp(name)
    };

    this.assert(this.obj.propertyIsEnumerable(name));

    if(arguments.length > 1){
      this.params.operator += " equal to "+i(val);
      this.assert(eql(val, this.obj[name]));
    }
  });

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

  Assertion.add('properties', function(names) {
    var values = {};
    if(arguments.length > 1) {
      names = aSlice.call(arguments);
    } else if(!util.isArray(names)) {
      if(util.isString(names)) {
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
      'to have property ' : 'to have '+(this.anyOne? 'any of ' : '')+'properties ') + props.join(', ');

    this.params = { operator: operator };

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
        if(!eql(obj[name], value)) {
          wrongValues.push(util.formatProp(name) + ' of ' + i(value) + ' (got ' + i(obj[name]) + ')');
        } else {
          props.push(util.formatProp(name) + ' of ' + i(value));
        }
      });

      if((wrongValues.length !== 0 && !this.anyOne) || (this.anyOne && props.length === 0)) {
        props = wrongValues;
      }

      operator = (props.length === 1 ?
        'to have property ' : 'to have '+(this.anyOne? 'any of ' : '')+'properties ') + props.join(', ');

      this.params = { operator: operator };

      //if there is no not matched values
      //or there is at least one matched
      this.assert(wrongValues.length === 0 || (this.anyOne && wrongValues.length != valueCheckNames.length));
    }
  });

  Assertion.add('length', function(n, description) {
    this.have.property('length', n, description);
  });

  Assertion.alias('length', 'lengthOf');

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  Assertion.add('ownProperty', function(name, description) {
    name = String(name);
    this.params = { operator: 'to have own property ' + util.formatProp(name), message: description };

    this.assert(hasOwnProperty.call(this.obj, name));

    this.obj = this.obj[name];
  });

  Assertion.alias('ownProperty', 'hasOwnProperty');

  Assertion.add('empty', function() {
    this.params = { operator: 'to be empty' };

    if(util.isString(this.obj) || util.isArray(this.obj) || util.isArguments(this.obj)) {
      this.have.property('length', 0);
    } else {
      var obj = Object(this.obj); // wrap to reference for booleans and numbers
      for(var prop in obj) {
        this.have.not.ownProperty(prop);
      }
    }
  }, true);

  Assertion.add('keys', function(keys) {
    if(arguments.length > 1) keys = aSlice.call(arguments);
    else if(arguments.length === 1 && util.isString(keys)) keys = [ keys ];
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

    this.params = { operator: verb + keys.map(util.formatProp).join(', ')};

    if(missingKeys.length > 0)
      this.params.operator += '\n\tmissing keys: ' + missingKeys.join(', ');

    if(extraKeys.length > 0)
      this.params.operator += '\n\textra keys: ' + extraKeys.join(', ');

    this.assert(missingKeys.length === 0 && extraKeys.length === 0);
  });

  Assertion.alias("keys", "key");

  Assertion.add('propertyByPath', function(properties) {
    if(arguments.length > 1) properties = aSlice.call(arguments);
    else if(arguments.length === 1 && util.isString(properties)) properties = [ properties ];
    else if(arguments.length === 0) properties = [];

    var allProps =  properties.map(util.formatProp);

    properties = properties.map(String);

    var obj = should(Object(this.obj));

    var foundProperties = [];

    var currentProperty;
    while(currentProperty = properties.shift()) {
      this.params = { operator: 'to have property by path ' + allProps.join(', ') + ' - failed on ' + util.formatProp(currentProperty) };
      obj = obj.have.property(currentProperty);
      foundProperties.push(currentProperty);
    }

    this.params = { operator: 'to have property by path ' + allProps.join(', ') };

    this.obj = obj.obj;
  });
};

},{"../eql":1,"../util":15}],11:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  Assertion.add('startWith', function(str, description) {
    this.params = { operator: 'to start with ' + should.format(str), message: description };

    this.assert(0 === this.obj.indexOf(str));
  });

  Assertion.add('endWith', function(str, description) {
    this.params = { operator: 'to end with ' + should.format(str), message: description };

    this.assert(this.obj.indexOf(str, this.obj.length - str.length) >= 0);
  });
};
},{}],12:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = _dereq_('../util');

module.exports = function(should, Assertion) {
  Assertion.add('Number', function() {
    this.params = { operator: 'to be a number' };

    this.assert(util.isNumber(this.obj));
  }, true);

  Assertion.add('arguments', function() {
    this.params = { operator: 'to be arguments' };

    this.assert(util.isArguments(this.obj));
  }, true);

  Assertion.add('type', function(type, description) {
    this.params = { operator: 'to have type ' + type, message: description };

    (typeof this.obj).should.be.exactly(type, description);
  });

  Assertion.add('instanceof', function(constructor, description) {
    this.params = { operator: 'to be an instance of ' + util.functionName(constructor), message: description };

    this.assert(Object(this.obj) instanceof constructor);
  });

  Assertion.add('Function', function() {
    this.params = { operator: 'to be a function' };

    this.assert(util.isFunction(this.obj));
  }, true);

  Assertion.add('Object', function() {
    this.params = { operator: 'to be an object' };

    this.assert(util.isObject(this.obj));
  }, true);

  Assertion.add('String', function() {
    this.params = { operator: 'to be a string' };

    this.assert(util.isString(this.obj));
  }, true);

  Assertion.add('Array', function() {
    this.params = { operator: 'to be an array' };

    this.assert(util.isArray(this.obj));
  }, true);

  Assertion.add('Boolean', function() {
    this.params = { operator: 'to be a boolean' };

    this.assert(util.isBoolean(this.obj));
  }, true);

  Assertion.add('Error', function() {
    this.params = { operator: 'to be an error' };

    this.assert(util.isError(this.obj));
  }, true);

  Assertion.add('null', function() {
    this.params = { operator: 'to be null' };

    this.assert(this.obj === null);
  }, true);

  Assertion.alias('null', 'Null');

  Assertion.alias('instanceof', 'instanceOf');
};

},{"../util":15}],13:[function(_dereq_,module,exports){
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

var util = _dereq_('./util');
var isBoolean = util.isBoolean;
var isObject = util.isObject;
var isUndefined = util.isUndefined;
var isFunction = util.isFunction;
var isString = util.isString;
var isNumber = util.isNumber;
var isNull = util.isNull;
var isRegExp = util.isRegExp;
var isDate = util.isDate;
var isError = util.isError;
var isArray = util.isArray;

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

  // This could be a boxed primitive (new String(), etc.), check valueOf()
  // NOTE: Avoid calling `valueOf` on `Date` instance because it will return
  // a number which, when object has some additional user-stored `keys`,
  // will be printed out.
  var formatted;
  var raw = value;
  try {
    // the .valueOf() call can fail for a multitude of reasons
    if (!isDate(value))
      raw = value.valueOf();
  } catch (e) {
    // ignore...
  }

  if (isString(raw)) {
    // for boxed Strings, we have to remove the 0-n indexed entries,
    // since they just noisey up the output and are redundant
    keys = keys.filter(function(key) {
      return !(key >= 0 && key < raw.length);
    });
  }

  if (isError(value)) {
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
    // now check the `raw` value to handle boxed primitives
    if (isString(raw)) {
      formatted = formatPrimitiveNoColor(ctx, raw);
      return ctx.stylize('[String: ' + formatted + ']', 'string');
    }
    if (isNumber(raw)) {
      formatted = formatPrimitiveNoColor(ctx, raw);
      return ctx.stylize('[Number: ' + formatted + ']', 'number');
    }
    if (isBoolean(raw)) {
      formatted = formatPrimitiveNoColor(ctx, raw);
      return ctx.stylize('[Boolean: ' + formatted + ']', 'boolean');
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

  // Make boxed primitive Strings look like such
  if (isString(raw)) {
    formatted = formatPrimitiveNoColor(ctx, raw);
    base = ' ' + '[String: ' + formatted + ']';
  }

  // Make boxed primitive Numbers look like such
  if (isNumber(raw)) {
    formatted = formatPrimitiveNoColor(ctx, raw);
    base = ' ' + '[Number: ' + formatted + ']';
  }

  // Make boxed primitive Booleans look like such
  if (isBoolean(raw)) {
    formatted = formatPrimitiveNoColor(ctx, raw);
    base = ' ' + '[Boolean: ' + formatted + ']';
  }

  if (keys.length === 0 && (!array || value.length === 0)) {
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
  if (isNumber(value)) {
    // Format -0 as '-0'. Strict equality won't distinguish 0 from -0,
    // so instead we use the fact that 1 / -0 < 0 whereas 1 / 0 > 0 .
    if (value === 0 && 1 / value < 0)
      return ctx.stylize('-0', 'number');
    return ctx.stylize('' + value, 'number');
  }
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatPrimitiveNoColor(ctx, value) {
  var stylize = ctx.stylize;
  ctx.stylize = stylizeNoColor;
  var str = formatPrimitive(ctx, value);
  ctx.stylize = stylize;
  return str;
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
            return ' ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return ' ' + line;
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
        .replace(/(^"|"$)/g, "'")
        .replace(/\\\\/g, '\\');
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
      (base === '' ? '' : base + '\n ') +
      ' ' +
      output.join(',\n ') +
      ' ' +
      braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

exports._extend = function _extend(origin, add) {
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

},{"./util":15}],14:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */


var util = _dereq_('./util'),
  AssertionError = util.AssertionError,
  inspect = util.inspect;

/**
 * Our function should
 * @param obj
 * @returns {Assertion}
 */
var should = function(obj) {
  return new Assertion(util.isWrapperType(obj) ? obj.valueOf() : obj);
};

/**
 * Initialize a new `Assertion` with the given _obj_.
 *
 * @param {*} obj
 * @api private
 */

var Assertion = should.Assertion = function Assertion(obj) {
  this.obj = obj;
};


/**
 Way to extend Assertion function. It uses some logic
 to define only positive assertions and itself rule with negative assertion.

 All actions happen in subcontext and this method take care about negation.
 Potentially we can add some more modifiers that does not depends from state of assertion.
 */
Assertion.add = function(name, f, isGetter) {
  var prop = { enumerable: true };
  prop[isGetter ? 'get' : 'value'] = function() {
    var context = new Assertion(this.obj);
    context.copy = context.copyIfMissing;
    context.anyOne = this.anyOne;

    try {
      f.apply(context, arguments);
    } catch(e) {
      //copy data from sub context to this
      this.copy(context);

      //check for fail
      if(e instanceof should.AssertionError) {
        //negative fail
        if(this.negate) {
          this.obj = context.obj;
          this.negate = false;
          return this;
        }
        this.assert(false);
      }
      // throw if it is another exception
      throw e;
    }
    //copy data from sub context to this
    this.copy(context);
    if(this.negate) {
      this.assert(false);
    }

    this.obj = context.obj;
    this.negate = false;
    return this;
  };

  Object.defineProperty(Assertion.prototype, name, prop);
};

Assertion.alias = function(from, to) {
  var desc = Object.getOwnPropertyDescriptor(Assertion.prototype, from);
  if(!desc) throw new Error('Alias ' + from + ' -> ' + to + ' could not be created as ' + from + ' not defined');
  Object.defineProperty(Assertion.prototype, to, desc);
};

should.AssertionError = AssertionError;
should.format = function (value) {
  if(util.isDate(value) && typeof value.inspect !== 'function') return value.toISOString(); //show millis in dates
  return inspect(value, { depth: null });
};

should.use = function(f) {
  f(this, Assertion);
  return this;
};


/**
 * Expose should to external world.
 */
exports = module.exports = should;


/**
 * Expose api via `Object#should`.
 *
 * @api public
 */

Object.defineProperty(Object.prototype, 'should', {
  set: function() {
  },
  get: function() {
    return should(this);
  },
  configurable: true
});


Assertion.prototype = {
  constructor: Assertion,

  assert: function(expr) {
    if(expr) return this;

    var params = this.params;

    var msg = params.message, generatedMessage = false;
    if(!msg) {
      msg = this.getMessage();
      generatedMessage = true;
    }

    var err = new AssertionError({
      message: msg, actual: this.obj, expected: params.expected, stackStartFunction: this.assert
    });

    err.showDiff = params.showDiff;
    err.operator = params.operator;
    err.generatedMessage = generatedMessage;

    throw err;
  },

  getMessage: function() {
    return 'expected ' + ('obj' in this.params ? this.params.obj: should.format(this.obj)) + (this.negate ? ' not ': ' ') +
       this.params.operator + ('expected' in this.params  ? ' ' + should.format(this.params.expected) : '');
  },

  copy: function(other) {
    this.params = other.params;
  },

  copyIfMissing: function(other) {
    if(!this.params) this.params = other.params;
  },


  /**
   * Negation modifier.
   *
   * @api public
   */

  get not() {
    this.negate = !this.negate;
    return this;
  },

  /**
   * Any modifier - it affect on execution of sequenced assertion to do not check all, but any of
   *
   * @api public
   */
  get any() {
    this.anyOne = true;
    return this;
  }
};

should
  .use(_dereq_('./ext/assert'))
  .use(_dereq_('./ext/chain'))
  .use(_dereq_('./ext/bool'))
  .use(_dereq_('./ext/number'))
  .use(_dereq_('./ext/eql'))
  .use(_dereq_('./ext/type'))
  .use(_dereq_('./ext/string'))
  .use(_dereq_('./ext/property'))
  .use(_dereq_('./ext/error'))
  .use(_dereq_('./ext/match'))
  .use(_dereq_('./ext/contain'));

},{"./ext/assert":2,"./ext/bool":3,"./ext/chain":4,"./ext/contain":5,"./ext/eql":6,"./ext/error":7,"./ext/match":8,"./ext/number":9,"./ext/property":10,"./ext/string":11,"./ext/type":12,"./util":15}],15:[function(_dereq_,module,exports){
/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Check if given obj just a primitive type wrapper
 * @param {Object} obj
 * @returns {boolean}
 * @api private
 */
exports.isWrapperType = function(obj) {
    return isNumber(obj) || isString(obj) || isBoolean(obj);
};

/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     utils.merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api private
 */

exports.merge = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

function isArray(arr) {
  return isObject(arr) && (arr.__ArrayLike || Array.isArray(arr));
}

exports.isArray = isArray;

function isNumber(arg) {
  return typeof arg === 'number' || arg instanceof Number;
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string' || arg instanceof String;
}

function isBoolean(arg) {
  return typeof arg === 'boolean' || arg instanceof Boolean;
}
exports.isBoolean = isBoolean;

exports.isString = isString;

function isBuffer(arg) {
  return typeof Buffer !== 'undefined' && arg instanceof Buffer;
}

exports.isBuffer = isBuffer;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

exports.isObject = isObject;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isNullOrUndefined(arg) {
  return arg == null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isArguments(object) {
  return objectToString(object) === '[object Arguments]';
}

exports.isArguments = isArguments;

exports.isFunction = function(arg) {
  return typeof arg === 'function' || arg instanceof Function;
};

function isError(e) {
  return (isObject(e) && objectToString(e) === '[object Error]') || (e instanceof Error);
}
exports.isError = isError;

function isUndefined(arg) {
  return arg === void 0;
}

exports.isUndefined = isUndefined;

exports.inspect = _dereq_('./inspect').inspect;

exports.AssertionError = _dereq_('assert').AssertionError;

var hasOwnProperty = Object.prototype.hasOwnProperty;

exports.forOwn = function(obj, f, context) {
  for(var prop in obj) {
    if(hasOwnProperty.call(obj, prop)) {
      f.call(context, obj[prop], prop);
    }
  }
};

var functionNameRE = /^\s*function\s*(\S*)\s*\(/;

exports.functionName = function(f) {
  if(f.name) {
    return f.name;
  }
  var name = f.toString().match(functionNameRE)[1];
  return name;
};

exports.formatProp = function(name) {
  name = JSON.stringify('' + name);
  if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
    name = name.substr(1, name.length - 2);
  } else {
    name = name.replace(/'/g, "\\'")
      .replace(/\\"/g, '"')
      .replace(/(^"|"$)/g, "'")
      .replace(/\\\\/g, '\\');
  }
  return name;
}
},{"./inspect":13,"assert":16}],16:[function(_dereq_,module,exports){
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

},{"util/":18}],17:[function(_dereq_,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],18:[function(_dereq_,module,exports){
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

},{"./support/isBuffer":17,"inherits":19}],19:[function(_dereq_,module,exports){
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

},{}]},{},[14])
(14)
});