// ES6-shim 0.8.0 (c) 2013 Paul Miller (paulmillr.com)
// ES6-shim may be freely distributed under the MIT license.
// For more details and documentation:
// https://github.com/paulmillr/es6-shim/

var arePropertyDescriptorsSupported = function () {
  var attempt = function () {
    Object.defineProperty({}, 'x', {});
    return true;
  };
  var supported = false;
  try { supported = attempt(); }
  catch (e) { /* this is IE 8. */ }
  return supported;
};

var main = function() {
  'use strict';

  var globals = (typeof global === 'undefined') ? window : global;
  var global_isFinite = globals.isFinite;
  var supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported();

  // Define configurable, writable and non-enumerable props
  // if they don’t exist.
  var defineProperties = function(object, map) {
    Object.keys(map).forEach(function(name) {
      var method = map[name];
      if (name in object) return;
      if (supportsDescriptors) {
        Object.defineProperty(object, name, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: method
        });
      } else {
        object[name] = method;
      }
    });
  };

  var ES = {
    ToInt32: function(x) {
      return x >> 0;
    },

    ToUint32: function(x) {
      return x >>> 0;
    }
  };

  defineProperties(String, {
    fromCodePoint: function() {
      var points = arguments;
      var result = [];
      var next;
      for (var i = 0, length = points.length; i < length; i++) {
        next = Number(points[i]);
        if (!Object.is(next, Number.toInteger(next)) ||
            next < 0 || next > 0x10FFFF) {
          throw new RangeError('Invalid code point ' + next);
        }

        if (next < 0x10000) {
          result.push(String.fromCharCode(next));
        } else {
          next -= 0x10000;
          result.push(String.fromCharCode((next >> 10) + 0xD800));
          result.push(String.fromCharCode((next % 0x400) + 0xDC00));
        }
      }
      return result.join('');
    },

    raw: function() {
      var callSite = arguments[0];
      var substitutions = Array.prototype.slice.call(arguments, 1);
      var cooked = Object(callSite);
      var rawValue = cooked.raw;
      var raw = Object(rawValue);
      var len = Object.keys(raw).length;
      var literalsegments = ES.ToUint32(len);
      if (literalsegments === 0) {
        return '';
      }

      var stringElements = [];
      var nextIndex = 0;
      var nextKey, next, nextSeg, nextSub;
      while (nextIndex < literalsegments) {
        nextKey = String(nextIndex);
        next = raw[nextKey];
        nextSeg = String(next);
        stringElements.push(nextSeg);
        if (nextIndex + 1 >= literalsegments) {
          break;
        }
        next = substitutions[nextKey];
        if (typeof next === 'undefined') {
          break;
        }
        nextSub = String(next);
        stringElements.push(nextSub);
        nextIndex++;
      }
      return stringElements.join('');
    }
  });

  defineProperties(String.prototype, {
    // Fast repeat, uses the `Exponentiation by squaring` algorithm.
    // alternative - return new Array(times + 1).join(s);
    repeat: function(times) {
      times = Number.toInteger(times);
      if (times < 0 || times === Infinity) {
        throw new RangeError();
      }
      var s = String(this);
      if (times < 1) return '';
      if (times % 2) return s.repeat(times - 1) + s;
      var half = s.repeat(times / 2);
      return half + half;
    },

    startsWith: function(searchString) {
      var position = arguments[1];
      var searchStr = searchString.toString();
      var s = String(this);
      var pos = (position === undefined) ? 0 : Number.toInteger(position);
      var len = s.length;
      var start = Math.min(Math.max(pos, 0), len);
      var searchLength = searchString.length;
      if ((searchLength + start) > len) return false;
      var index = ''.indexOf.call(s, searchString, start);
      return index === start;
    },

    endsWith: function(searchString) {
      var endPosition = arguments[1];
      var s = String(this);
      var searchStr = searchString.toString();
      var len = s.length;
      var pos = (endPosition === undefined) ?
        len : Number.toInteger(endPosition);
      var end = Math.min(Math.max(pos, 0), len);
      var searchLength = searchString.length;
      var start = end - searchLength;
      if (start < 0) return false;
      var index = ''.indexOf.call(s, searchString, start);
      return index === start;
    },

    contains: function(searchString) {
      var position = arguments[1];

      // Somehow this trick makes method 100% compat with the spec.
      return ''.indexOf.call(this, searchString, position) !== -1;
    },

    codePointAt: function(pos) {
      var s = String(this);
      var position = Number.toInteger(pos);
      var length = s.length;
      if (position < 0 || position >= length) return undefined;
      var first = s.charCodeAt(position);
      var isEnd = (position + 1 === length);
      if (first < 0xD800 || first > 0xDBFF || isEnd) return first;
      var second = s.charCodeAt(position + 1);
      if (second < 0xDC00 || second > 0xDFFF) return first;
      return ((first - 0xD800) * 1024) + (second - 0xDC00) + 0x10000;
    }
  });

  defineProperties(Array, {
    from: function(iterable) {
      var mapFn = arguments[1];
      var thisArg = arguments[2];

      var list = Object(iterable);
      var length = ES.ToUint32(list.length);
      var result = typeof this === 'function' ?
        Object(new this(length)) : new Array(length);

      for (var i = 0; i < length; i++) {
        var value = list[i];
        result[i] = mapFn ? mapFn.call(thisArg, value) : value;
      }

      result.length = length;
      return result;
    },

    of: function() {
      return Array.from(arguments);
    }
  });

  defineProperties(Array.prototype, {
    find: function(predicate) {
      var list = Object(this);
      var length = ES.ToUint32(list.length);
      if (length === 0) return undefined;
      if (typeof predicate !== 'function') {
        throw new TypeError('Array#find: predicate must be a function');
      }
      var thisArg = arguments[1];
      for (var i = 0, value; i < length && i in list; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) return value;
      }
      return undefined;
    },

    findIndex: function(predicate) {
      var list = Object(this);
      var length = ES.ToUint32(list.length);
      if (length === 0) return -1;
      if (typeof predicate !== 'function') {
        throw new TypeError('Array#findIndex: predicate must be a function');
      }
      var thisArg = arguments[1];
      for (var i = 0, value; i < length && i in list; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) return i;
      }
      return -1;
    }
  });

  defineProperties(Number, {
    MAX_INTEGER: 9007199254740991,
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

  if (supportsDescriptors) {
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

      // 15.2.3.17
      assign: function(target, source) {
        return Object.keys(source).reduce(function(target, key) {
          target[key] = source[key];
          return target;
        }, target);
      },

      // 15.2.3.18
      mixin: function(target, source) {
        var props = Object.getOwnPropertyNames(source);
        return props.reduce(function(target, property) {
          var descriptor = Object.getOwnPropertyDescriptor(source, property);
          return Object.defineProperty(target, property, descriptor);
        }, target);
      }
    });

    // 15.2.3.2
    // shim from https://gist.github.com/WebReflection/5593554
    defineProperties(Object, {
      setPrototypeOf: (function(Object, magic) {
        var set;

        var checkArgs = function(O, proto) {
          if (typeof O !== 'object' || O === null) {
            throw new TypeError('can not set prototype on a non-object');
          }
          if (typeof proto !== 'object' && proto !== null) {
            throw new TypeError('can only set prototype to an object or null');
          }
        };

        var setPrototypeOf = function(O, proto) {
          checkArgs(O, proto);
          set.call(O, proto);
          return O;
        };

        try {
          // this works already in Firefox and Safari
          set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set;
          set.call({}, null);
        } catch (e) {
          if (Object.prototype !== {}[magic]) {
            // IE < 11 cannot be shimmed
            return;
          }
          // probably Chrome or some old Mobile stock browser
          set = function(proto) {
            this[magic] = proto;
          };
          // please note that this will **not** work
          // in those browsers that do not inherit
          // __proto__ by mistake from Object.prototype
          // in these cases we should probably throw an error
          // or at least be informed about the issue
          setPrototypeOf.polyfill = setPrototypeOf(
            setPrototypeOf({}, null),
            Object.prototype
          ) instanceof Object;
          // setPrototypeOf.polyfill === true means it works as meant
          // setPrototypeOf.polyfill === false means it's not 100% reliable
          // setPrototypeOf.polyfill === undefined
          // or
          // setPrototypeOf.polyfill ==  null means it's not a polyfill
          // which means it works as expected
          // we can even delete Object.prototype.__proto__;
        }
        return setPrototypeOf;
      })(Object, '__proto__')
    });
  }

  defineProperties(Object, {
    getOwnPropertyKeys: function(subject) {
      return Object.keys(subject);
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
    }
  });

  defineProperties(Math, {
    acosh: function(value) {
      if (Number.isNaN(value) || value < 1) {
        return NaN;
      } else if (value === 1) {
        return +0;
      } else if (value === Infinity) {
        return Infinity;
      }
      return Math.log(value + Math.sqrt(value * value - 1));
    },

    asinh: function(value) {
      if (Number.isNaN(value)) {
        return NaN;
      } else if (value === 0) {
        return value;
      } else if (value === Infinity || value === -Infinity) {
        return value;
      }
      return Math.log(value + Math.sqrt(value * value + 1));
    },

    atanh: function(value) {
      if (Number.isNaN(value) || value < -1 || value > 1) {
        return NaN;
      } else if (value === -1) {
        return -Infinity;
      } else if (value === 1) {
        return Infinity;
      } else if (value === 0) {
        return value;
      }
      return 0.5 * Math.log((1 + value) / (1 - value));
    },

    cbrt: function (value) {
      if (value === 0) {
        return value;
      }
      var negate = value < 0, result;
      if (negate) { value = -value; }
      result = Math.pow(value, 1/3);
      return negate ? -result : result;
    },

    cosh: function(value) {
      if (value === 0) { // +0 or -0
        return 1;
      } else if (value === Infinity || value === -Infinity) {
        return value;
      } else if (Number.isNaN(value)) {
        return NaN;
      }
      if (value < 0) value = -value;
      if (value > 21) return Math.exp(value) / 2;
      return (Math.exp(value) + Math.exp(-value)) / 2;
    },

    expm1: function(value) {
      if (Number.isNaN(value)) {
        return NaN;
      } else if (value === 0) {
        return value;
      } else if (value === Infinity) {
        return Infinity;
      } else if (value === -Infinity) {
        return -1;
      }
      var result = 0;
      var n = 50;
      for (var i = 1; i < n; i++) {
        for (var j = 2, factorial = 1; j <= i; j++) {
          factorial *= j;
        }
        result += Math.pow(value, i) / factorial;
      }
      return result;
    },

    hypot: function(x, y, z) {
      var anyNaN = false;
      var anyInfinity = false;
      var allZero = true;
      [x, y, z].some(function (num) {
        if (Number.isNaN(num)) {
          anyNaN = true;
        } else if (num === Infinity || num === -Infinity) {
          anyInfinity = true;
        } else if (num !== 0) {
          allZero = false;
        }
        return anyInfinity || anyNaN;
      });
      if (anyInfinity) {
        return Infinity;
      } else if (anyNaN) {
        return NaN;
      } else if (allZero) {
        return 0;
      }
      if (x == null) x = 0;
      if (y == null) y = 0;
      if (z == null) z = 0;
      return Math.sqrt(x * x + y * y + z * z);
    },

    log2: function(value) {
      if (Number.isNaN(value) || value < 0) {
        return NaN;
      } else if (value === 0) {
        return -Infinity;
      } else if (value === 1) {
        return 0;
      } else if (value === Infinity) {
        return Infinity;
      }
      return Math.log(value) * (1 / Math.LN2);
    },

    log10: function(value) {
      if (Number.isNaN(value) || value < 0) {
        return NaN;
      } else if (value === 0) {
        return -Infinity;
      } else if (value === 1) {
        return 0;
      } else if (value === Infinity) {
        return Infinity;
      }
      return Math.log(value) * (1 / Math.LN10);
    },

    log1p: function(value) {
      if (Number.isNaN(value) || value < -1) {
        return NaN;
      } else if (value === -1) {
        return -Infinity;
      } else if (value === 0) {
        return value;
      } else if (value === Infinity) {
        return Infinity;
      }
      var result = 0;
      var n = 50;

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
      if (Number.isNaN(value)) {
        return NaN;
      } else if (value === 0) {
        return value;
      } else if (value === Infinity || value === -Infinity) {
        return value;
      }
      return (Math.exp(value) - Math.exp(-value)) / 2;
    },

    tanh: function(value) {
      if (Number.isNaN(value)) {
        return NaN;
      } else if (value === 0) {
        return value;
      } else if (value === Infinity) {
        return 1;
      } else if (value === -Infinity) {
        return -1;
      }
      return (Math.exp(value) - Math.exp(-value)) / (Math.exp(value) + Math.exp(-value));
    },

    trunc: function(value) {
      if (Number.isNaN(value)) {
        return NaN;
      } else if (value === Infinity || value === -Infinity) {
        return value;
      } else if (value === 0) {
        return value;
      }
      return ~~value;
    }
  });

  if (supportsDescriptors) {
    // Map and Set require a true ES5 environment
    var collectionShims = {
      Map: (function() {

        var empty = {};

        function MapEntry(key, value) {
          this.key = key;
          this.value = value;
          this.next = null;
        }

        MapEntry.prototype.isRemoved = function () {
          return this.key === empty;
        };

        function MapIterator(map, kind) {
          this.i = map._head;
          this.kind = kind;
        }

        MapIterator.prototype = {
          next: function () {
            var i = this.i;
            if (i !== null) {
              while (i.isRemoved()) {
                i = i.next;
              }
              i = i.next;
              this.i = i;
            }
            if (i === null) {
              throw new Error();
            }
            var kind = this.kind;
            if (kind === "key") {
              return i.key;
            }
            if (kind === "value") {
              return i.value;
            }
            return [i.key, i.value];
          }
        };

        function Map() {
          if (!(this instanceof Map)) return new Map();

          var head = new MapEntry(null, null);

          defineProperties(this, {
            '_head': head,
            '_size': 0
          });

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
            var i = this._head;
            while ((i = i.next) !== null) {
              if (Object.is(i.key, key)) {
                return i.value;
              }
            }
            return undefined;
          },

          has: function(key) {
            var i = this._head;
            while ((i = i.next) !== null) {
              if (Object.is(i.key, key)) {
                return true;
              }
            }
            return false;
          },

          set: function(key, value) {
            var i = this._head;
            var p = i;
            while ((i = i.next) !== null) {
              if (Object.is(i.key, key)) {
                i.value = value;
                return;
              }
              p = i;
            }
            var entry = new MapEntry(key, value);
            p.next = entry;
            this._size += 1;
          },

          'delete': function(key) {
            var i = this._head;
            var p = i;
            while ((i = i.next) !== null) {
              if (Object.is(i.key, key)) {
                p.next = i.next;
                i.key = empty;
                i.value = empty;
                i.next = p;
                this._size -= 1;
                return true;
              }
              p = i;
            }
            return false;
          },

          clear: function () {
            var p = this._head;
            var i = p.next;
            this._size = 0;
            p.next = null;
            while (i !== null) {
              var x = i.next;
              i.key = empty;
              i.value = empty;
              i.next = p;
              i = x;
            }
          },

          keys: function() {
            return new MapIterator(this, "key");
          },

          values: function() {
            return new MapIterator(this, "value");
          },

          entries: function() {
            return new MapIterator(this, "key+value");
          },

          forEach: function(callback) {
            var context = arguments.length > 1 ? arguments[1] : null;
            var entireMap = this;

            var i = this._head;
            while ((i = i.next) !== null) {
              callback.call(context, i.value, i.key, entireMap);
              while (i.isRemoved()) {
                i = i.next;
              }
            }
          }
        });

        return Map;
      })(),

      Set: (function() {
        var SetShim = function Set() {
          if (!(this instanceof SetShim)) return new SetShim();
          defineProperties(this, {'[[SetData]]': new Map()});
          Object.defineProperty(this, 'size', {
            configurable: true,
            enumerable: false,
            get: (function() {
              return this['[[SetData]]'].size;
            }).bind(this)
          });
        }

        defineProperties(SetShim.prototype, {
          has: function(key) {
            return this['[[SetData]]'].has(key);
          },

          add: function(key) {
            return this['[[SetData]]'].set(key, key);
          },

          'delete': function(key) {
            return this['[[SetData]]']['delete'](key);
          },

          clear: function() {
            return this['[[SetData]]'].clear();
          },

          keys: function() {
            return this['[[SetData]]'].keys();
          },

          values: function() {
            return this['[[SetData]]'].values();
          },

          entries: function() {
            return this['[[SetData]]'].entries();
          },

          forEach: function (callback) {
            var context = arguments.length > 1 ? arguments[1] : null;
            var entireSet = this;
            this['[[SetData]]'].forEach(function (value, key) {
              callback.call(context, key, key, entireSet);
            });
          }
        });

        return SetShim;
      })()
    };
    defineProperties(globals, collectionShims);

    if (globals.Map || globals.Set) {
      /*
        - In Firefox < 23, Map#size is a function.
        - In all current Firefox, Set#entries/keys/values & Map#clear do not exist
          - https://bugzilla.mozilla.org/show_bug.cgi?id=869996
      */
      var hasNoMapClear = typeof globals.Map.prototype.clear !== 'function';
      var setSizeIsFunc = typeof (new globals.Set()).size !== 0;
      var mapSizeIsFunc = typeof (new globals.Map()).size !== 0;
      var hasNoSetKeys = typeof Set.prototype.keys !== 'function';
      if (hasNoMapClear || setSizeIsFunc || mapSizeIsFunc || hasNoSetKeys) {
        globals.Map = collectionShims.Map;
        globals.Set = collectionShims.Set;
      }
    }
  }
};

if (typeof define === 'function' && typeof define.amd == 'object' && define.amd) {
  define(main); // RequireJS
} else {
  main(); // CommonJS and <script>
}

