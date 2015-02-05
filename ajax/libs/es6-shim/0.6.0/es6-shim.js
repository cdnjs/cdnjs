// ES6-shim 0.6.0 (c) 2013 Paul Miller (paulmillr.com)
// ES6-shim may be freely distributed under the MIT license.
// For more details and documentation:
// https://github.com/paulmillr/es6-shim/
var main = function() {
  'use strict';

  var globals = (typeof global === 'undefined') ? window : global;
  var global_isFinite = globals.isFinite;
  var factorial = function(value) {
    var result = 1;
    for (var i = 2; i <= value; i++) {
      result *= i;
    }
    return result;
  };

  var defineProperty = function(object, name, method) {
    if (!object[name]) {
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: method
      });
    }
  };

  var defineProperties = function(object, map) {
    Object.keys(map).forEach(function(name) {
      defineProperty(object, name, map[name]);
    });
  };

  defineProperties(String.prototype, {
    // Fast repeat, uses the `Exponentiation by squaring` algorithm.
    repeat: function(times) {
      if (times < 1) return '';
      if (times % 2) return this.repeat(times - 1) + this;
      var half = this.repeat(times / 2);
      return half + half;
    },

    startsWith: function(searchString) {
      var position = arguments[1];

      // Let searchStr be ToString(searchString).
      var searchStr = searchString.toString();

      // ReturnIfAbrupt(searchStr).

      // Let S be the result of calling ToString,
      // giving it the this value as its argument.
      var s = this.toString();

      // ReturnIfAbrupt(S).

      // Let pos be ToInteger(position).
      // (If position is undefined, this step produces the value 0).
      var pos = (position === undefined) ? 0 : Number.toInteger(position);
      // ReturnIfAbrupt(pos).

      // Let len be the number of elements in S.
      var len = s.length;

      // Let start be min(max(pos, 0), len).
      var start = Math.min(Math.max(pos, 0), len);

      // Let searchLength be the number of elements in searchString.
      var searchLength = searchString.length;

      // If searchLength+start is greater than len, return false.
      if ((searchLength + start) > len) return false;

      // If the searchLength sequence of elements of S starting at
      // start is the same as the full element sequence of searchString,
      // return true.
      var index = ''.indexOf.call(s, searchString, start);
      return index === start;
    },

    endsWith: function(searchString) {
      var endPosition = arguments[1];

      // ReturnIfAbrupt(CheckObjectCoercible(this value)).
      // Let S be the result of calling ToString, giving it the this value as its argument.
      // ReturnIfAbrupt(S).
      var s = this.toString();

      // Let searchStr be ToString(searchString).
      // ReturnIfAbrupt(searchStr).
      var searchStr = searchString.toString();

      // Let len be the number of elements in S.
      var len = s.length;

      // If endPosition is undefined, let pos be len, else let pos be ToInteger(endPosition).
      // ReturnIfAbrupt(pos).
      var pos = (endPosition === undefined) ?
        len :
        Number.toInteger(endPosition);

      // Let end be min(max(pos, 0), len).
      var end = Math.min(Math.max(pos, 0), len);

      // Let searchLength be the number of elements in searchString.
      var searchLength = searchString.length;

      // Let start be end - searchLength.
      var start = end - searchLength;

      // If start is less than 0, return false.
      if (start < 0) return false;

      // If the searchLength sequence of elements of S starting at start is the same as the full element sequence of searchString, return true.
      // Otherwise, return false.
      var index = ''.indexOf.call(s, searchString, start);
      return index === start;
    },

    contains: function(searchString) {
      var position = arguments[1];

      // Somehow this trick makes method 100% compat with the spec.
      return ''.indexOf.call(this, searchString, position) !== -1;
    }
  });

  defineProperties(Array, {
    from: function(iterable) {
      var object = new Object(iterable);
      var array = [];

      for (var key = 0, length = object.length >>> 0; key < length; key++) {
        if (key in object) {
          array[key] = object[key];
        }
      }

      return array;
    },

    of: function() {
      return Array.prototype.slice.call(arguments);
    }
  });

  defineProperties(Number, {
    MAX_INTEGER: 9007199254740992,
    EPSILON: 2.220446049250313e-16,

    parseInt: globals.parseInt,
    parseFloat: globals.parseFloat,

    isFinite: function(value) {
      return typeof value === 'number' && global_isFinite(value);
    },

    isInteger: function(value) {
      return Number.isFinite(value) &&
        value >= -9007199254740992 && value <= Number.MAX_INTEGER &&
        Math.floor(value) === value;
    },

    isNaN: function(value) {
      return Object.is(value, NaN);
    },

    toInteger: function(value) {
      var number = +value;
      if (Object.is(number, NaN)) return +0;
      if (number === 0 || !Number.isFinite(number)) return number;
      return Math.sign(number) * Math.floor(Math.abs(number));
    }
  });

  defineProperties(Number.prototype, {
    clz: function() {
      var number = +this;
      if (!number || !Number.isFinite(number)) return 32;
      number = number < 0 ? Math.ceil(number) : Math.floor(number);
      number = number - Math.floor(number / 0x100000000) * 0x100000000;
      return 32 - (number).toString(2).length;
    }
  });

  defineProperties(Object, {
    getOwnPropertyDescriptors: function(subject) {
      var descs = {};
      Object.getOwnPropertyNames(subject).forEach(function(propName) {
        descs[propName] = Object.getOwnPropertyDescriptor(subject, propName);
      });
      return descs;
    },

    getPropertyDescriptor: function(subject, name) {
      var pd = Object.getOwnPropertyDescriptor(subject, name);
      var proto = Object.getPrototypeOf(subject);
      while (pd === undefined && proto !== null) {
        pd = Object.getOwnPropertyDescriptor(proto, name);
        proto = Object.getPrototypeOf(proto);
      }
      return pd;
    },

    getPropertyNames: function(subject) {
      var result = Object.getOwnPropertyNames(subject);
      var proto = Object.getPrototypeOf(subject);

      var addProperty = function(property) {
        if (result.indexOf(property) === -1) {
          result.push(property);
        }
      };

      while (proto !== null) {
        Object.getOwnPropertyNames(proto).forEach(addProperty);
        proto = Object.getPrototypeOf(proto);
      }
      return result;
    },

    is: function(x, y) {
      if (x === y) {
        // 0 === -0, but they are not identical.
        if (x === 0) {
          return 1 / x === 1 / y;
        } else {
          return true;
        }
      }

      // NaN !== NaN, but they are identical.
      // NaNs are the only non-reflexive value, i.e., if x !== x,
      // then x is a NaN.
      // isNaN is broken: it converts its argument to number, so
      // isNaN('foo') => true
      return x !== x && y !== y;
    },

    isnt: function(x, y) {
      return !Object.is(x, y);
    }
  });

  defineProperties(Math, {
    acosh: function(value) {
      return Math.log(value + Math.sqrt(value * value - 1));
    },

    asinh: function(value) {
      return Math.log(value + Math.sqrt(value * value + 1));
    },

    atanh: function(value) {
      return 0.5 * Math.log((1 + value) / (1 - value));
    },

    cosh: function(value) {
      if (value < 0) value = -value;
      if (value > 21) return Math.exp(value) / 2;
      return (Math.exp(value) + Math.exp(-value)) / 2;
    },

    expm1: function(value) {
      var result = 0;
      var n = 50;
      for (var i = 1; i < n; i++) {
        result += Math.pow(value, i) / factorial(i);
      }
      return result;
    },

    hypot: function(x, y) {
      return Math.sqrt(x * x + y * y) || 0;
    },

    log2: function(value) {
      return Math.log(value) * (1 / Math.LN2);
    },

    log10: function(value) {
      return Math.log(value) * (1 / Math.LN10);
    },

    log1p: function(value) {
      var result = 0;
      var n = 50;

      if (value <= -1) return -Infinity;
      if (value < 0 || value > 1) return Math.log(1 + value);
      for (var i = 1; i < n; i++) {
        if ((i % 2) === 0) {
          result -= Math.pow(value, i) / i;
        } else {
          result += Math.pow(value, i) / i;
        }
      }

      return result;
    },

    sign: function(value) {
      var number = +value;
      if (number === 0) return number;
      if (Object.is(number, NaN)) return number;
      return (number < 0) ? -1 : 1;
    },

    sinh: function(value) {
      return (Math.exp(value) - Math.exp(-value)) / 2;
    },

    tanh: function(value) {
      return (Math.exp(value) - Math.exp(-value)) / (Math.exp(value) + Math.exp(-value));
    },

    trunc: function(value) {
      return ~~value;
    }
  });

  defineProperties(globals, {
    Map: (function() {
      var indexOfIdentical = function(keys, key) {
        for (var i = 0, length = keys.length; i < length; i++) {
          if (Object.is(keys[i], key)) return i;
        }
        return -1;
      };

      function Map() {
        if (!(this instanceof Map)) return new Map();
        defineProperty(this, '_keys', []);
        defineProperty(this, '_values', []);
        defineProperty(this, '_size', 0);
        Object.defineProperty(this, 'size', {
          configurable: true,
          enumerable: false,
          get: (function() {
            return this._size;
          }).bind(this)
        });
      }

      defineProperties(Map.prototype, {
        get: function(key) {
          var index = indexOfIdentical(this._keys, key);
          return index < 0 ? undefined : this._values[index];
        },

        has: function(key) {
          return indexOfIdentical(this._keys, key) >= 0;
        },

        set: function(key, value) {
          var keys = this._keys;
          var values = this._values;
          var index = indexOfIdentical(keys, key);
          if (index < 0) index = keys.length;
          keys[index] = key;
          values[index] = value;
          this._size += 1;
        },

        'delete': function(key) {
          var keys = this._keys;
          var values = this._values;
          var index = indexOfIdentical(keys, key);
          if (index < 0) return false;
          keys.splice(index, 1);
          values.splice(index, 1);
          this._size -= 1;
          return true;
        },

        keys: function() {
          return this._keys;
        },

        values: function() {
          return this._values;
        }
      });

      return Map;
    })(),

    Set: (function() {
      function Set() {
        if (!(this instanceof Set)) return new Set();
        defineProperty(this, '[[SetData]]', new Map());
        Object.defineProperty(this, 'size', {
          configurable: true,
          enumerable: false,
          get: (function() {
            return this['[[SetData]]'].size;
          }).bind(this)
        });
      }

      defineProperties(Set.prototype, {
        has: function(key) {
          return this['[[SetData]]'].has(key);
        },

        add: function(key) {
          this['[[SetData]]'].set(key, true);
        },

        'delete': function(key) {
          return this['[[SetData]]']['delete'](key);
        },

        clear: function() {
          Object.defineProperty(this, '[[SetData]]', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: new Map()
          });
        }
      });

      return Set;
    })()
  });
};

if (typeof define === 'function' && typeof define.amd == 'object' && define.amd) {
  define(main); // RequireJS
} else {
  main(); // CommonJS and <script>
}
