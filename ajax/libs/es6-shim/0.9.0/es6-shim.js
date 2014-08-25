// ES6-shim 0.9.0 (c) 2013 Paul Miller (paulmillr.com)
// ES6-shim may be freely distributed under the MIT license.
// For more details and documentation:
// https://github.com/paulmillr/es6-shim/

(function(undefined) {
  'use strict';

  var arePropertyDescriptorsSupported = function() {
    try {
      Object.defineProperty({}, 'x', {});
      return true;
    } catch (e) { /* this is IE 8. */
      return false;
    }
  };

  var main = function() {
    var globals = (typeof global === 'undefined') ? window : global;
    var global_isFinite = globals.isFinite;
    var supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported();
    var _slice = Array.prototype.slice;
    var _indexOf = String.prototype.indexOf;
    var _toString = Object.prototype.toString;

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
      },

      toInteger: function(value) {
        var number = +value;
        if (Number.isNaN(number)) return 0;
        if (number === 0 || !Number.isFinite(number)) return number;
        return Math.sign(number) * Math.floor(Math.abs(number));
      }
    };

    defineProperties(String, {
      fromCodePoint: function() {
        var points = _slice.call(arguments, 0);
        var result = [];
        var next;
        for (var i = 0, length = points.length; i < length; i++) {
          next = Number(points[i]);
          if (!Object.is(next, ES.toInteger(next)) ||
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
        var substitutions = _slice.call(arguments, 1);
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
          if (next === undefined) {
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
      // Perf: http://jsperf.com/string-repeat2/2
      repeat: (function() {
        var repeat = function(s, times) {
          if (times < 1) return '';
          if (times % 2) return repeat(s, times - 1) + s;
          var half = repeat(s, times / 2);
          return half + half;
        };

        return function(times) {
          times = ES.toInteger(times);
          if (times < 0 || times === Infinity) {
            throw new RangeError();
          }
          return repeat(String(this), times);
        };
      })(),

      startsWith: function(searchStr) {
        if (this == null) throw new TypeError("Cannot call method 'startsWith' of " + this);
        var thisStr = String(this);
        searchStr = String(searchStr);
        var start = Math.max(ES.toInteger(arguments[1]), 0);
        return thisStr.slice(start, start + searchStr.length) === searchStr;
      },

      endsWith: function(searchStr) {
        if (this == null) throw new TypeError("Cannot call method 'endsWith' of " + this);
        var thisStr = String(this);
        searchStr = String(searchStr);
        var thisLen = thisStr.length;
        var pos = (arguments[1] === undefined) ?
          thisLen : ES.toInteger(arguments[1]);
        var end = Math.min(pos, thisLen);
        return thisStr.slice(end - searchStr.length, end) === searchStr;
      },

      contains: function(searchString) {
        var position = arguments[1];

        // Somehow this trick makes method 100% compat with the spec.
        return _indexOf.call(this, searchString, position) !== -1;
      },

      codePointAt: function(pos) {
        var s = String(this);
        var position = ES.toInteger(pos);
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

        if (mapFn !== undefined && _toString.call(mapFn) !== '[object Function]') {
          throw new TypeError('when provided, the second argument must be a function');
        }

        var list = Object(iterable);
        var length = ES.ToUint32(list.length);
        var result = typeof this === 'function' ? Object(new this(length)) : new Array(length);

        for (var i = 0; i < length; i++) {
          var value = list[i];
          if (mapFn !== undefined) {
            result[i] = thisArg ? mapFn.call(thisArg, value) : mapFn(value);
          } else {
            result[i] = value;
          }
        }

        result.length = length;
        return result;
      },

      of: function() {
        return Array.from(arguments);
      }
    });

    defineProperties(globals, {
      ArrayIterator: function(array, kind) {
        this.i = 0;
        this.array = array;
        this.kind = kind;
      }
    });

    defineProperties(ArrayIterator.prototype, {
      next: function() {
        var i = this.i;
        this.i = i + 1;
        var array = this.array;

        if (i >= array.length) {
          throw new Error();
        }

        if (array.hasOwnProperty(i)) {
          var kind = this.kind;
          var retval;
          if (kind === "key") {
            retval = i;
          }
          if (kind === "value") {
            retval = array[i];
          }
          if (kind === "entry") {
            retval = [i, array[i]];
          }
        } else {
          retval = this.next();
        }
        return retval;
      }
    });

    defineProperties(Array.prototype, {
      fill: function(value) {
        var len = this.length;
        var start = arguments.length > 1 ? ES.toInteger(arguments[1]) : 0;
        var end = arguments.length > 2 ? ES.toInteger(arguments[2]) : len;

        var relativeStart = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);

        for (var i = relativeStart; i < len && i < end; ++i) {
          this[i] = value;
        }
        return this;
      },

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
      },

      keys: function() {
        return new ArrayIterator(this, "key");
      },

      values: function() {
        return new ArrayIterator(this, "value");
      },

      entries: function() {
        return new ArrayIterator(this, "entry");
      }
    });

    defineProperties(Number, {
      MAX_SAFE_INTEGER: Math.pow(2, 53) - 1,
      EPSILON: 2.220446049250313e-16,

      parseInt: globals.parseInt,
      parseFloat: globals.parseFloat,

      isFinite: function(value) {
        return typeof value === 'number' && global_isFinite(value);
      },

      isSafeInteger: function(value) {
        return typeof value === 'number' &&
          !Number.isNaN(value) &&
          Number.isFinite(value) &&
          parseInt(value, 10) === value &&
          Math.abs(value) <= Number.MAX_SAFE_INTEGER;
      },

      isNaN: function(value) {
        // NaN !== NaN, but they are identical.
        // NaNs are the only non-reflexive value, i.e., if x !== x,
        // then x is NaN.
        // isNaN is broken: it converts its argument to number, so
        // isNaN('foo') => true
        return value !== value;
      },

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
              throw new TypeError('cannot set prototype on a non-object');
            }
            if (typeof proto !== 'object') {
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

      is: function(a, b) {
        if (a === b) {
          // 0 === -0, but they are not identical.
          if (a === 0) return 1 / a === 1 / b;
          return true;
        }
        return Number.isNaN(a) && Number.isNaN(b);
      }
    });

    defineProperties(Math, {
      acosh: function(value) {
        value = Number(value);
        if (Number.isNaN(value) || value < 1) return NaN;
        if (value === 1) return 0;
        if (value === Infinity) return value;
        return Math.log(value + Math.sqrt(value * value - 1));
      },

      asinh: function(value) {
        value = Number(value);
        if (value === 0 || !global_isFinite(value)) {
          return value;
        }
        return Math.log(value + Math.sqrt(value * value + 1));
      },

      atanh: function(value) {
        value = Number(value);
        if (Number.isNaN(value) || value < -1 || value > 1) {
          return NaN;
        }
        if (value === -1) return -Infinity;
        if (value === 1) return Infinity;
        if (value === 0) return value;
        return 0.5 * Math.log((1 + value) / (1 - value));
      },

      cbrt: function(value) {
        value = Number(value);
        if (value === 0) return value;
        var negate = value < 0, result;
        if (negate) value = -value;
        result = Math.pow(value, 1/3);
        return negate ? -result : result;
      },

      cosh: function(value) {
        value = Number(value);
        if (value === 0) return 1; // +0 or -0
        if (!global_isFinite(value)) return value;
        if (value < 0) value = -value;
        if (value > 21) return Math.exp(value) / 2;
        return (Math.exp(value) + Math.exp(-value)) / 2;
      },

      expm1: function(value) {
        value = Number(value);
        if (value === -Infinity) return -1;
        if (!global_isFinite(value) || value === 0) return value;
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

      hypot: function(x, y) {
        var anyNaN = false;
        var allZero = true;
        var z = arguments.length > 2 ? arguments[2] : 0;
        if ([x, y, z].some(function(num) {
          if (Number.isNaN(num)) anyNaN = true;
          else if (num === Infinity || num === -Infinity) return true;
          else if (num !== 0) allZero = false;
        })) return Infinity;
        if (anyNaN) return NaN;
        if (allZero) return 0;
        if (x == null) x = 0;
        if (y == null) y = 0;
        if (z == null) z = 0;
        return Math.sqrt(x * x + y * y + z * z);
      },

      log2: function(value) {
        return Math.log(value) * Math.LOG2E;
      },

      log10: function(value) {
        return Math.log(value) * Math.LOG10E;
      },

      log1p: function(value) {
        value = Number(value);
        if (value < -1 || Number.isNaN(value)) return NaN;
        if (value === 0 || value === Infinity) return value;
        if (value === -1) return -Infinity;
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
        if (Number.isNaN(number)) return number;
        return number < 0 ? -1 : 1;
      },

      sinh: function(value) {
        value = Number(value);
        if (!global_isFinite(value) || value === 0) return value;
        return (Math.exp(value) - Math.exp(-value)) / 2;
      },

      tanh: function(value) {
        value = Number(value);
        if (Number.isNaN(value) || value === 0) return value;
        if (value === Infinity) return 1;
        if (value === -Infinity) return -1;
        return (Math.exp(value) - Math.exp(-value)) / (Math.exp(value) + Math.exp(-value));
      },

      trunc: function(value) {
        var number = Number(value);
        return number < 0 ? -Math.floor(-number) : Math.floor(number);
      },

      imul: function(x, y) {
        // taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
        var ah  = (x >>> 16) & 0xffff;
        var al = x & 0xffff;
        var bh  = (y >>> 16) & 0xffff;
        var bl = y & 0xffff;
        // the shift by 0 fixes the sign on the high part
        // the final |0 converts the unsigned value into a signed value
        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
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

          MapEntry.prototype.isRemoved = function() {
            return this.key === empty;
          };

          function MapIterator(map, kind) {
            this.i = map._head;
            this.kind = kind;
          }

          MapIterator.prototype = {
            next: function() {
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
            if (!(this instanceof Map)) throw new TypeError('Map must be called with "new"');

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

            clear: function() {
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
            if (!(this instanceof SetShim)) throw new TypeError('Set must be called with "new"');
            defineProperties(this, {'[[SetData]]': new Map()});
            Object.defineProperty(this, 'size', {
              configurable: true,
              enumerable: false,
              get: (function() {
                return this['[[SetData]]'].size;
              }).bind(this)
            });
          };

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

            forEach: function(callback) {
              var context = arguments.length > 1 ? arguments[1] : null;
              var entireSet = this;
              this['[[SetData]]'].forEach(function(value, key) {
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
        if (
          typeof globals.Map.prototype.clear !== 'function' ||
          new globals.Set().size !== 0 ||
          new globals.Map().size !== 0 ||
          typeof globals.Set.prototype.keys !== 'function'
        ) {
          globals.Map = collectionShims.Map;
          globals.Set = collectionShims.Set;
        }
      }
    }
  };

  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(main); // RequireJS
  } else {
    main(); // CommonJS and <script>
  }
})();

