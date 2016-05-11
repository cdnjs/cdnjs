/*!
* js-data
* @version 3.0.0-alpha.22 - Homepage <http://www.js-data.io/>
* @author js-data project authors
* @copyright (c) 2014-2016 js-data project authors
* @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
*
* @overview js-data is a framework-agnostic, datastore-agnostic ORM/ODM for Node.js and the Browser.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('js-data', ['exports'], factory) :
  (factory((global.JSData = global.JSData || {})));
}(this, function (exports) { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers;

  /**
   * @name utils
   * @memberof module:js-data
   * @type {Object}
   * @property {Function} addHiddenPropsToTarget TODO
   * @property {Function} classCallCheck TODO
   * @property {Function} copy TODO
   * @property {Function} deepMixIn TODO
   * @property {Function} eventify TODO
   * @property {Function} extend TODO
   * @property {Function} fillIn TODO
   * @property {Function} fromJson TODO
   * @property {Function} get TODO
   * @property {Function} getSuper TODO
   * @property {Function} intersection TODO
   * @property {Function} isArray TODO
   * @property {Function} isBlacklisted TODO
   * @property {boolean} isBrowser TODO
   * @property {Function} isBoolean TODO
   * @property {Function} isFunction TODO
   * @property {Function} isInteger TODO
   * @property {Function} isNull TODO
   * @property {Function} isNumber TODO
   * @property {Function} isObject TODO
   * @property {Function} isRegExp TODO
   * @property {Function} isSorN TODO
   * @property {Function} isString TODO
   * @property {Function} isUndefined TODO
   * @property {Function} possibleConstructorReturn TODO
   * @property {Function} reject TODO
   * @property {Function} resolve TODO
   * @property {Function} set TODO
   * @property {Function} toJson TODO
   */

  var INFINITY = 1 / 0;
  var MAX_INTEGER = 1.7976931348623157e+308;
  var BOOL_TAG = '[object Boolean]';
  var DATE_TAG = '[object Date]';
  var FUNC_TAG = '[object Function]';
  var NUMBER_TAG = '[object Number]';
  var OBJECT_TAG = '[object Object]';
  var REGEXP_TAG = '[object RegExp]';
  var STRING_TAG = '[object String]';
  var objToString = Object.prototype.toString;
  var PATH = /^(.+)\.(.+)$/;

  var toInteger = function toInteger(value) {
    if (!value) {
      return 0;
    }
    // Coerce to number
    value = +value;
    if (value === INFINITY || value === -INFINITY) {
      var sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }
    var remainder = value % 1;
    return value === value ? remainder ? value - remainder : value : 0; // eslint-disable-line
  };

  var toStr = function toStr(value) {
    return objToString.call(value);
  };

  var isPlainObject = function isPlainObject(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && value.constructor === Object;
  };

  var mkdirP = function mkdirP(object, path) {
    if (!path) {
      return object;
    }
    var parts = path.split('.');
    parts.forEach(function (key) {
      if (!object[key]) {
        object[key] = {};
      }
      object = object[key];
    });
    return object;
  };

  var utils = {
    /**
     * TODO
     *
     * @ignore
     */
    Promise: Promise,

    /**
     * Shallow copy properties from src to dest that meet the following criteria:
     * - own enumerable
     * - not a function
     * - does not start with "_"
     *
     * @ignore
     * @param {Object} dest Destination object.
     * @param {Object} src Source object.
     */
    _: function _(dest, src) {
      for (var key in dest) {
        var value = dest[key];
        if (src[key] === undefined && !utils.isFunction(value) && key && key.indexOf('_') !== 0) {
          src[key] = value;
        }
      }
    },

    /**
     * TODO
     *
     * @ignore
     */
    _forRelation: function _forRelation(opts, def, fn, ctx) {
      var relationName = def.relation;
      var containedName = null;
      var index = void 0;
      opts || (opts = {});
      opts.with || (opts.with = []);

      if ((index = utils._getIndex(opts.with, relationName)) >= 0) {
        containedName = relationName;
      } else if ((index = utils._getIndex(opts.with, def.localField)) >= 0) {
        containedName = def.localField;
      }

      if (opts.withAll) {
        fn.call(ctx, def, {});
        return;
      } else if (!containedName) {
        return;
      }
      var optsCopy = {};
      utils.fillIn(optsCopy, def.getRelation());
      utils.fillIn(optsCopy, opts);
      optsCopy.with = opts.with.slice();
      optsCopy._activeWith = optsCopy.with.splice(index, 1)[0];
      optsCopy.with.forEach(function (relation, i) {
        if (relation && relation.indexOf(containedName) === 0 && relation.length >= containedName.length && relation[containedName.length] === '.') {
          optsCopy.with[i] = relation.substr(containedName.length + 1);
        } else {
          optsCopy.with[i] = '';
        }
      });
      fn.call(ctx, def, optsCopy);
    },

    /**
     * TODO
     *
     * @ignore
     */
    _getIndex: function _getIndex(list, relation) {
      var index = -1;
      list.forEach(function (_relation, i) {
        if (_relation === relation) {
          index = i;
          return false;
        } else if (utils.isObject(_relation)) {
          if (_relation.relation === relation) {
            index = i;
            return false;
          }
        }
      });
      return index;
    },

    /**
     * TODO
     *
     * @ignore
     */
    addHiddenPropsToTarget: function addHiddenPropsToTarget(target, props) {
      var map = {};
      utils.forOwn(props, function (value, key) {
        map[key] = {
          writable: true,
          value: value
        };
      });
      Object.defineProperties(target, map);
    },

    /**
     * TODO
     *
     * @ignore
     */
    areDifferent: function areDifferent(a, b, opts) {
      opts || (opts = {});
      var diff = utils.diffObjects(a, b, opts);
      var diffCount = Object.keys(diff.added).length + Object.keys(diff.removed).length + Object.keys(diff.changed).length;
      return diffCount > 0;
    },

    /**
     * TODO
     *
     * @ignore
     */
    classCallCheck: function classCallCheck(instance, ctor) {
      if (!(instance instanceof ctor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    },

    /**
     * Deep copy a value.
     *
     * @ignore
     * @param {*} from Value to deep copy.
     * @return {*} Deep copy of `from`.
     */
    copy: function copy(from, to, stackFrom, stackTo, blacklist, plain) {
      if (!to) {
        to = from;
        if (from) {
          if (utils.isArray(from)) {
            to = utils.copy(from, [], stackFrom, stackTo, blacklist, plain);
          } else if (utils.isDate(from)) {
            to = new Date(from.getTime());
          } else if (utils.isRegExp(from)) {
            to = new RegExp(from.source, from.toString().match(/[^\/]*$/)[0]);
            to.lastIndex = from.lastIndex;
          } else if (utils.isObject(from)) {
            if (plain) {
              to = utils.copy(from, {}, stackFrom, stackTo, blacklist, plain);
            } else {
              to = utils.copy(from, Object.create(Object.getPrototypeOf(from)), stackFrom, stackTo, blacklist, plain);
            }
          }
        }
      } else {
        if (from === to) {
          throw new Error('Cannot copy! Source and destination are identical.');
        }

        stackFrom = stackFrom || [];
        stackTo = stackTo || [];

        if (utils.isObject(from)) {
          var index = stackFrom.indexOf(from);
          if (index !== -1) {
            return stackTo[index];
          }

          stackFrom.push(from);
          stackTo.push(to);
        }

        var result = void 0;
        if (utils.isArray(from)) {
          var i = void 0;
          to.length = 0;
          for (i = 0; i < from.length; i++) {
            result = utils.copy(from[i], null, stackFrom, stackTo, blacklist, plain);
            if (utils.isObject(from[i])) {
              stackFrom.push(from[i]);
              stackTo.push(result);
            }
            to.push(result);
          }
        } else {
          if (utils.isArray(to)) {
            to.length = 0;
          } else {
            utils.forOwn(to, function (value, key) {
              delete to[key];
            });
          }
          for (var key in from) {
            if (from.hasOwnProperty(key)) {
              if (utils.isBlacklisted(key, blacklist)) {
                continue;
              }
              result = utils.copy(from[key], null, stackFrom, stackTo, blacklist, plain);
              if (utils.isObject(from[key])) {
                stackFrom.push(from[key]);
                stackTo.push(result);
              }
              to[key] = result;
            }
          }
        }
      }
      return to;
    },

    /**
     * Recursively shallow fill in own enumberable properties from `source` to `dest`.
     *
     * @ignore
     * @param {Object} dest The destination object.
     * @param {Object} source The source object.
     */
    deepFillIn: function deepFillIn(dest, source) {
      if (source) {
        utils.forOwn(source, function (value, key) {
          var existing = dest[key];
          if (isPlainObject(value) && isPlainObject(existing)) {
            utils.deepFillIn(existing, value);
          } else if (!dest.hasOwnProperty(key) || dest[key] === undefined) {
            dest[key] = value;
          }
        });
      }
      return dest;
    },

    /**
     * Recursively shallow copy own enumberable properties from `source` to `dest`.
     *
     * @ignore
     * @param {Object} dest The destination object.
     * @param {Object} source The source object.
     */
    deepMixIn: function deepMixIn(dest, source) {
      if (source) {
        utils.forOwn(source, function (value, key) {
          var existing = dest[key];
          if (isPlainObject(value) && isPlainObject(existing)) {
            utils.deepMixIn(existing, value);
          } else {
            dest[key] = value;
          }
        });
      }
      return dest;
    },

    /**
     * @param {Object} a Base object.
     * @param {Object} b Comparison object.
     * @return {Object} Diff.
     */
    diffObjects: function diffObjects(a, b, opts) {
      opts || (opts = {});
      var equalsFn = opts.equalsFn;
      var bl = opts.ignore;
      var diff = {
        added: {},
        changed: {},
        removed: {}
      };
      if (!utils.isFunction(equalsFn)) {
        equalsFn = utils.strictEqual;
      }

      utils.forOwn(b, function (oldValue, key) {
        var newValue = a[key];

        if (utils.isBlacklisted(key, bl) || equalsFn(newValue, oldValue)) {
          return;
        }

        if (utils.isUndefined(newValue)) {
          diff.removed[key] = undefined;
        } else if (!equalsFn(newValue, oldValue)) {
          diff.changed[key] = newValue;
        }
      });

      utils.forOwn(a, function (newValue, key) {
        if (!utils.isUndefined(b[key]) || utils.isBlacklisted(key, bl)) {
          return;
        }
        diff.added[key] = newValue;
      });

      return diff;
    },

    /**
     * TODO
     *
     * @ignore
     */
    equal: function equal(a, b) {
      return a == b; // eslint-disable-line
    },

    /**
     * Add eventing capabilities into the target object.
     *
     * @ignore
     * @param {Object} target Target object.
     * @param {Function} [getter] Custom getter for retrieving the object's event
     * listeners.
     * @param {Function} [setter] Custom setter for setting the object's event
     * listeners.
     */
    eventify: function eventify(target, getter, setter, enumerable) {
      target = target || this;
      var _events = {};
      if (!getter && !setter) {
        getter = function getter() {
          return _events;
        };
        setter = function setter(value) {
          _events = value;
        };
      }
      Object.defineProperties(target, {
        emit: {
          enumerable: !!enumerable,
          value: function value() {
            var events = getter.call(this) || {};

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var type = args.shift();
            var listeners = events[type] || [];
            var i = void 0;
            for (i = 0; i < listeners.length; i++) {
              listeners[i].f.apply(listeners[i].c, args);
            }
            listeners = events.all || [];
            args.unshift(type);
            for (i = 0; i < listeners.length; i++) {
              listeners[i].f.apply(listeners[i].c, args);
            }
          }
        },
        off: {
          enumerable: !!enumerable,
          value: function value(type, func) {
            var events = getter.call(this);
            var listeners = events[type];
            if (!listeners) {
              setter.call(this, {});
            } else if (func) {
              for (var i = 0; i < listeners.length; i++) {
                if (listeners[i].f === func) {
                  listeners.splice(i, 1);
                  break;
                }
              }
            } else {
              listeners.splice(0, listeners.length);
            }
          }
        },
        on: {
          enumerable: !!enumerable,
          value: function value(type, func, ctx) {
            if (!getter.call(this)) {
              setter.call(this, {});
            }
            var events = getter.call(this);
            events[type] = events[type] || [];
            events[type].push({
              c: ctx,
              f: func
            });
          }
        }
      });
    },

    /**
     * TODO
     *
     * @ignore
     */
    extend: function extend(props, classProps) {
      var superClass = this;
      var _subClass = void 0;

      props || (props = {});
      classProps || (classProps = {});

      if (props.hasOwnProperty('constructor')) {
        _subClass = props.constructor;
        delete props.constructor;
      } else {
        _subClass = function subClass() {
          utils.classCallCheck(this, _subClass);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var _this = utils.possibleConstructorReturn(this, (_subClass.__super__ || Object.getPrototypeOf(_subClass)).apply(this, args));
          return _this;
        };
      }

      _subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          configurable: true,
          enumerable: false,
          value: _subClass,
          writable: true
        }
      });

      var obj = Object;
      if (obj.setPrototypeOf) {
        obj.setPrototypeOf(_subClass, superClass);
      } else if (classProps.strictEs6Class) {
        _subClass.__proto__ = superClass; // eslint-disable-line
      } else {
          utils.forOwn(superClass, function (value, key) {
            _subClass[key] = value;
          });
        }
      Object.defineProperty(_subClass, '__super__', {
        configurable: true,
        value: superClass
      });

      utils.addHiddenPropsToTarget(_subClass.prototype, props);
      utils.fillIn(_subClass, classProps);

      return _subClass;
    },

    /**
     * Shallow copy own enumerable properties from `src` to `dest` that are on `src`
     * but are missing from `dest.
     *
     * @ignore
     * @param {Object} dest The destination object.
     * @param {Object} source The source object.
     */
    fillIn: function fillIn(dest, src) {
      utils.forOwn(src, function (value, key) {
        if (!dest.hasOwnProperty(key) || dest[key] === undefined) {
          dest[key] = value;
        }
      });
    },

    /**
     * TODO
     *
     * @ignore
     */
    forEachRelation: function forEachRelation(mapper, opts, fn, ctx) {
      var relationList = mapper.relationList || [];
      if (!relationList.length) {
        return;
      }
      relationList.forEach(function (def) {
        utils._forRelation(opts, def, fn, ctx);
      });
    },

    /**
     * Iterate over an object's own enumerable properties.
     *
     * @ignore
     * @param {Object} object The object whose properties are to be enumerated.
     * @param {Function} fn Iteration function.
     * @param {Object} [thisArg] Content to which to bind `fn`.
     */
    forOwn: function forOwn(obj, fn, thisArg) {
      var keys = Object.keys(obj);
      var len = keys.length;
      var i = void 0;
      for (i = 0; i < len; i++) {
        fn.call(thisArg, obj[keys[i]], keys[i], obj);
      }
    },

    /**
     * Proxy for `JSON.parse`.
     *
     * @ignore
     * @param {string} json JSON to parse.
     * @return {Object} Parsed object.
     */
    fromJson: function fromJson(json) {
      return utils.isString(json) ? JSON.parse(json) : json;
    },

    /**
     * TODO
     *
     * @ignore
     */
    'get': function get(object, prop) {
      if (!prop) {
        return;
      }
      var parts = prop.split('.');
      var last = parts.pop();

      while (prop = parts.shift()) {
        // eslint-disable-line
        object = object[prop];
        if (object == null) {
          // eslint-disable-line
          return;
        }
      }

      return object[last];
    },

    /**
     * TODO
     *
     * @ignore
     */
    getSuper: function getSuper(instance, isCtor) {
      var ctor = isCtor ? instance : instance.constructor;
      return ctor.__super__ || Object.getPrototypeOf(ctor) || ctor.__proto__; // eslint-disable-line
    },

    /**
     * Return the intersection of two arrays.
     *
     * @ignore
     * @param {Array} array1 First array.
     * @param {Array} array2 Second array.
     * @return {Array} Array of elements common to both arrays.
     */
    intersection: function intersection(array1, array2) {
      if (!array1 || !array2) {
        return [];
      }
      var result = [];
      var item = void 0;
      var i = void 0;
      var len = array1.length;
      for (i = 0; i < len; i++) {
        item = array1[i];
        if (result.indexOf(item) !== -1) {
          continue;
        }
        if (array2.indexOf(item) !== -1) {
          result.push(item);
        }
      }
      return result;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isArray: Array.isArray,

    /**
     * Return whether `prop` is matched by any string or regular expression in `bl`.
     *
     * @ignore
     * @param {string} prop The name of a property.
     * @param {Array} bl Array of strings and regular expressions.
     * @return {boolean} Whether `prop` was matched.
     */
    isBlacklisted: function isBlacklisted(prop, bl) {
      if (!bl || !bl.length) {
        return false;
      }
      var matches = void 0;
      for (var i = 0; i < bl.length; i++) {
        if (toStr(bl[i]) === REGEXP_TAG && bl[i].test(prop) || bl[i] === prop) {
          matches = prop;
          return matches;
        }
      }
      return !!matches;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isBoolean: function isBoolean(value) {
      return toStr(value) === BOOL_TAG;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isBrowser: false,

    /**
     * TODO
     *
     * @ignore
     */
    isDate: function isDate(value) {
      return value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && toStr(value) === DATE_TAG;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isFunction: function isFunction(value) {
      return typeof value === 'function' || value && toStr(value) === FUNC_TAG;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isInteger: function isInteger(value) {
      return toStr(value) === NUMBER_TAG && value == toInteger(value); // eslint-disable-line
    },

    /**
     * TODO
     *
     * @ignore
     */
    isNull: function isNull(value) {
      return value === null;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isNumber: function isNumber(value) {
      var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      return type === 'number' || value && type === 'object' && toStr(value) === NUMBER_TAG;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isObject: function isObject(value) {
      return toStr(value) === OBJECT_TAG;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isRegExp: function isRegExp(value) {
      return toStr(value) === REGEXP_TAG;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isSorN: function isSorN(value) {
      return utils.isString(value) || utils.isNumber(value);
    },

    /**
     * TODO
     *
     * @ignore
     */
    isString: function isString(value) {
      return typeof value === 'string' || value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && toStr(value) === STRING_TAG;
    },

    /**
     * TODO
     *
     * @ignore
     */
    isUndefined: function isUndefined(value) {
      return value === undefined;
    },

    /**
     * TODO
     *
     * @ignore
     */
    logify: function logify(target) {
      utils.addHiddenPropsToTarget(target, {
        dbg: function dbg() {
          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          this.log.apply(this, ['debug'].concat(args));
        },
        log: function log(level) {
          for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }

          if (level && !args.length) {
            args.push(level);
            level = 'debug';
          }
          if (level === 'debug' && !this.debug) {
            return;
          }
          var prefix = level.toUpperCase() + ': (' + (this.name || this.constructor.name) + ')';
          if (console[level]) {
            var _console;

            (_console = console)[level].apply(_console, [prefix].concat(args));
          } else {
            var _console2;

            (_console2 = console).log.apply(_console2, [prefix].concat(args));
          }
        }
      });
    },

    /**
     * TODO
     *
     * @ignore
     */
    omit: function omit(props, keys) {
      // Remove relations
      var _props = {};
      utils.forOwn(props, function (value, key) {
        if (keys.indexOf(key) === -1) {
          _props[key] = value;
        }
      });
      return _props;
    },

    /**
     * TODO
     *
     * @ignore
     */
    plainCopy: function plainCopy(from) {
      return utils.copy(from, undefined, undefined, undefined, undefined, true);
    },

    /**
     * TODO
     *
     * @ignore
     */
    possibleConstructorReturn: function possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      }

      return call && ((typeof call === 'undefined' ? 'undefined' : babelHelpers.typeof(call)) === 'object' || typeof call === 'function') ? call : self;
    },

    /**
     * Proxy for `Promise.reject`.
     *
     * @ignore
     * @param {*} [value] Value with which to reject the Promise.
     * @return {Promise} Promise reject with `value`.
     */
    reject: function reject(value) {
      return utils.Promise.reject(value);
    },

    /**
     * Proxy for `Promise.resolve`.
     *
     * @ignore
     * @param {*} [value] Value with which to resolve the Promise.
     * @return {Promise} Promise resolved with `value`.
     */
    resolve: function resolve(value) {
      return utils.Promise.resolve(value);
    },

    /**
     * Set the value at the provided key or path.
     *
     * @ignore
     * @param {Object} object The object on which to set a property.
     * @param {(string|Object)} path The key or path to the property. Can also
     * pass in an object of path/value pairs, which will all be set on the target
     * object.
     * @param {*} [value] The value to set.
     */
    set: function set(object, path, value) {
      if (utils.isObject(path)) {
        utils.forOwn(path, function (value, _path) {
          utils.set(object, _path, value);
        });
      } else {
        var parts = PATH.exec(path);
        if (parts) {
          mkdirP(object, parts[1])[parts[2]] = value;
        } else {
          object[path] = value;
        }
      }
    },

    /**
     * TODO
     *
     * @ignore
     */
    strictEqual: function strictEqual(a, b) {
      var _equal = a === b;
      if (!_equal) {
        if (utils.isObject(a) && utils.isObject(b)) {
          utils.forOwn(a, function (value, key) {
            _equal = _equal && utils.strictEqual(value, b[key]);
          });
          utils.forOwn(b, function (value, key) {
            _equal = _equal && utils.strictEqual(value, a[key]);
          });
        } else if (utils.isArray(a) && utils.isArray(b)) {
          a.forEach(function (value, i) {
            _equal = _equal && utils.strictEqual(value, b[i]);
          });
        }
      }
      return _equal;
    },

    /**
     * Proxy for `JSON.stringify`.
     *
     * @ignore
     * @param {*} value Value to serialize to JSON.
     * @return {string} JSON string.
     */
    toJson: JSON.stringify,

    /**
     * Unset the value at the provided key or path.
     *
     * @ignore
     * @param {Object} object The object from which to delete the property.
     * @param {string} path The key or path to the property.
     */
    unset: function unset(object, path) {
      var parts = path.split('.');
      var last = parts.pop();

      while (path = parts.shift()) {
        // eslint-disable-line
        object = object[path];
        if (object == null) {
          // eslint-disable-line
          return;
        }
      }

      object[last] = undefined;
    }
  };

  // Attempt to detect whether we are in the browser.
  try {
    utils.isBrowser = !!window;
  } catch (e) {
    utils.isBrowser = false;
  }

  var utils$1 = utils;

  function Component() {
    /**
     * Event listeners attached to this Component.
     *
     * @name Component#_listeners
     * @instance
     * @type {Object}
     * @private
     */
    this._listeners = {};
  }

  /**
   * Create a subclass of this component.
   *
   * @name Component.extend
   * @method
   * @param {Object} [props={}] Properties to add to the prototype of the
   * subclass.
   * @param {Object} [classProps={}] Static properties to add to the subclass.
   * @return {Function} Subclass of this component.
   */
  Component.extend = utils$1.extend;

  /**
   * @name Component#dbg
   * @method
   */
  /**
   * @name Component#log
   * @method
   */
  utils$1.logify(Component.prototype);

  /**
   * Register a new event listener on this Mapper.
   *
   * @name Mapper#on
   * @method
   */
  /**
   * Remove an event listener from this Mapper.
   *
   * @name Mapper#off
   * @method
   */
  /**
   * Trigger an event on this Mapper.
   *
   * @name Mapper#emit
   * @method
   * @param {string} event Name of event to emit.
   */
  utils$1.eventify(Component.prototype, function () {
    return this._listeners;
  }, function (value) {
    this._listeners = value;
  });

  var reserved = {
    limit: '',
    offset: '',
    orderBy: '',
    skip: '',
    sort: '',
    where: ''
  };

  var escapeRegExp = /([.*+?^=!:${}()|[\]\/\\])/g;
  var percentRegExp = /%/g;
  var underscoreRegExp = /_/g;

  var escape = function escape(pattern) {
    return pattern.replace(escapeRegExp, '\\$1');
  };

  /**
   * A class used by the {@link Collection} class to build queries to be executed
   * against the collection's data. An instance of `Query` is returned by
   * {@link Collection#query}.
   *
   * ```javascript
   * import {Query} from 'js-data'
   * ```
   *
   * @class Query
   * @extends Component
   * @param {Collection} collection - The collection on which this query operates.
   */
  var Query = Component.extend({
    constructor: function Query(collection) {
      utils$1.classCallCheck(this, Query);

      /**
       * The collection on which this query operates.
       *
       * @name Query#collection
       * @type {Collection}
       */
      this.collection = collection;

      /**
       * The data result of this query.
       *
       * @name Query#data
       * @type {Array}
       */
      this.data = null;
    },

    /**
     * Find all entities between two boundaries.
     *
     * Get the users ages 18 to 30
     * ```js
     * const users = query.between(18, 30, { index: 'age' }).run()
     * ```
     * Same as above
     * ```js
     * const users = query.between([18], [30], { index: 'age' }).run()
     * ```
     *
     * @name Query#between
     * @method
     * @param {Array} leftKeys - Keys defining the left boundary.
     * @param {Array} rightKeys - Keys defining the right boundary.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @param {boolean} [opts.leftInclusive=true] - Whether to include entities
     * on the left boundary.
     * @param {boolean} [opts.rightInclusive=false] - Whether to include entities
     * on the left boundary.
     * @param {boolean} [opts.limit] - Limit the result to a certain number.
     * @param {boolean} [opts.offset] - The number of resulting entities to skip.
     * @return {Query} A reference to itself for chaining.
     */
    between: function between(leftKeys, rightKeys, opts) {
      var self = this;
      opts || (opts = {});
      if (self.data) {
        throw new Error('Cannot access index after first operation!');
      }
      self.data = self.collection.getIndex(opts.index).between(leftKeys, rightKeys, opts);
      return self;
    },
    compare: function compare(orderBy, index, a, b) {
      var def = orderBy[index];
      var cA = utils$1.get(a, def[0]);
      var cB = utils$1.get(b, def[0]);
      if (cA && utils$1.isString(cA)) {
        cA = cA.toUpperCase();
      }
      if (cB && utils$1.isString(cB)) {
        cB = cB.toUpperCase();
      }
      if (a === undefined) {
        a = null;
      }
      if (b === undefined) {
        b = null;
      }
      if (def[1] === 'DESC') {
        if (cB < cA) {
          return -1;
        } else if (cB > cA) {
          return 1;
        } else {
          if (index < orderBy.length - 1) {
            return this.compare(orderBy, index + 1, a, b);
          } else {
            return 0;
          }
        }
      } else {
        if (cA < cB) {
          return -1;
        } else if (cA > cB) {
          return 1;
        } else {
          if (index < orderBy.length - 1) {
            return this.compare(orderBy, index + 1, a, b);
          } else {
            return 0;
          }
        }
      }
    },
    evaluate: function evaluate(value, op, predicate) {
      var ops = this.constructor.ops;
      if (ops[op]) {
        return ops[op](value, predicate);
      }
      if (op.indexOf('like') === 0) {
        return !utils$1.isNull(this.like(predicate, op.substr(4)).exec(value));
      } else if (op.indexOf('notLike') === 0) {
        return utils$1.isNull(this.like(predicate, op.substr(7)).exec(value));
      }
    },


    /**
     * Find the entity or entities that match the provided query or pass the
     * provided filter function.
     *
     * #### Example
     *
     * Get the draft posts created less than three months
     * ```js
     * const posts = query.filter({
     *   where: {
     *     status: {
     *       '==': 'draft'
     *     },
     *     created_at_timestamp: {
     *       '>=': (new Date().getTime() - (1000 * 60 * 60 * 24 * 30 * 3)) // 3 months ago
     *     }
     *   }
     * }).run()
     * ```
     * Use a custom filter function
     * ```js
     * const posts = query.filter(function (post) {
     *   return post.isReady()
     * }).run()
     * ```
     *
     * @name Query#filter
     * @method
     * @param {(Object|Function)} [queryOrFn={}] - Selection query or filter
     * function.
     * @param {Function} [thisArg] - Context to which to bind `queryOrFn` if
     * `queryOrFn` is a function.
     * @return {Query} A reference to itself for chaining.
     */
    filter: function filter(query, thisArg) {
      var self = this;
      query || (query = {});
      self.getData();
      if (utils$1.isObject(query)) {
        (function () {
          var where = {};
          // Filter
          if (utils$1.isObject(query.where)) {
            where = query.where;
          }
          utils$1.forOwn(query, function (value, key) {
            if (!(key in reserved) && !(key in where)) {
              where[key] = {
                '==': value
              };
            }
          });

          var fields = [];
          var ops = [];
          var predicates = [];
          utils$1.forOwn(where, function (clause, field) {
            if (!utils$1.isObject(clause)) {
              clause = {
                '==': clause
              };
            }
            utils$1.forOwn(clause, function (expr, op) {
              fields.push(field);
              ops.push(op);
              predicates.push(expr);
            });
          });
          if (fields.length) {
            (function () {
              var i = void 0;
              var len = fields.length;
              self.data = self.data.filter(function (item) {
                var first = true;
                var keep = true;

                for (i = 0; i < len; i++) {
                  var op = ops[i];
                  var isOr = op.charAt(0) === '|';
                  op = isOr ? op.substr(1) : op;
                  var expr = self.evaluate(utils$1.get(item, fields[i]), op, predicates[i]);
                  if (expr !== undefined) {
                    keep = first ? expr : isOr ? keep || expr : keep && expr;
                  }
                  first = false;
                }
                return keep;
              });
            })();
          }

          // Sort
          var orderBy = query.orderBy || query.sort;

          if (utils$1.isString(orderBy)) {
            orderBy = [[orderBy, 'ASC']];
          }
          if (!utils$1.isArray(orderBy)) {
            orderBy = null;
          }

          // Apply 'orderBy'
          if (orderBy) {
            (function () {
              var index = 0;
              orderBy.forEach(function (def, i) {
                if (utils$1.isString(def)) {
                  orderBy[i] = [def, 'ASC'];
                }
              });
              self.data.sort(function (a, b) {
                return self.compare(orderBy, index, a, b);
              });
            })();
          }

          // Skip
          if (utils$1.isNumber(query.skip)) {
            self.skip(query.skip);
          } else if (utils$1.isNumber(query.offset)) {
            self.skip(query.offset);
          }
          // Limit
          if (utils$1.isNumber(query.limit)) {
            self.limit(query.limit);
          }
        })();
      } else if (utils$1.isFunction(query)) {
        self.data = self.data.filter(query, thisArg);
      }
      return self;
    },


    /**
     * Iterate over all entities.
     *
     * @name Query#forEach
     * @method
     * @param {Function} forEachFn - Iteration function.
     * @param {*} [thisArg] - Context to which to bind `forEachFn`.
     * @return {Query} A reference to itself for chaining.
     */
    forEach: function forEach(forEachFn, thisArg) {
      this.getData().forEach(forEachFn, thisArg);
      return this;
    },


    /**
     * Find the entity or entities that match the provided key.
     *
     * #### Example
     *
     * Get the entity whose primary key is 25
     * ```js
     * const entities = query.get(25).run()
     * ```
     * Same as above
     * ```js
     * const entities = query.get([25]).run()
     * ```
     * Get all users who are active and have the "admin" role
     * ```js
     * const activeAdmins = query.get(['active', 'admin'], {
     *   index: 'activityAndRoles'
     * }).run()
     * ```
     * Get all entities that match a certain weather condition
     * ```js
     * const niceDays = query.get(['sunny', 'humid', 'calm'], {
     *   index: 'weatherConditions'
     * }).run()
     * ```
     *
     * @name Query#get
     * @method
     * @param {Array} keyList - Key(s) defining the entity to retrieve. If
     * `keyList` is not an array (i.e. for a single-value key), it will be
     * wrapped in an array.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.string] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Query} A reference to itself for chaining.
     */
    get: function get(keyList, opts) {
      var self = this;
      keyList || (keyList = []);
      opts || (opts = {});
      if (self.data) {
        throw new Error('Cannot access index after first operation!');
      }
      if (keyList && !utils$1.isArray(keyList)) {
        keyList = [keyList];
      }
      if (!keyList.length) {
        self.getData();
        return self;
      }
      self.data = self.collection.getIndex(opts.index).get(keyList);
      return self;
    },


    /**
     * Find the entity or entities that match the provided keyLists.
     *
     * #### Example
     *
     * Get the posts where "status" is "draft" or "inReview"
     * ```js
     * const posts = query.getAll('draft', 'inReview', { index: 'status' }).run()
     * ```
     * Same as above
     * ```js
     * const posts = query.getAll(['draft'], ['inReview'], { index: 'status' }).run()
     * ```
     *
     * @name Query#getAll
     * @method
     * @param {...Array} [keyList] - Provide one or more keyLists, and all
     * entities matching each keyList will be retrieved. If no keyLists are
     * provided, all entities will be returned.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Query} A reference to itself for chaining.
     */
    getAll: function getAll() {
      var self = this;
      var opts = {};
      if (self.data) {
        throw new Error('Cannot access index after first operation!');
      }

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!args.length || args.length === 1 && utils$1.isObject(args[0])) {
        self.getData();
        return self;
      } else if (args.length && utils$1.isObject(args[args.length - 1])) {
        opts = args[args.length - 1];
        args.pop();
      }
      var collection = self.collection;
      var index = collection.getIndex(opts.index);
      self.data = [];
      args.forEach(function (keyList) {
        self.data = self.data.concat(index.get(keyList));
      });
      return self;
    },


    /**
     * Return the current data result of this query.
     * @name Query#getData
     * @method
     * @return {Array} The data in this query.
     */
    getData: function getData() {
      var self = this;
      if (!self.data) {
        self.data = self.collection.index.getAll();
      }
      return self.data;
    },
    like: function like(pattern, flags) {
      return new RegExp('^' + escape(pattern).replace(percentRegExp, '.*').replace(underscoreRegExp, '.') + '$', flags);
    },


    /**
     * Limit the result.
     *
     * #### Example
     *
     * Get only the first 10 draft posts
     * ```js
     * const posts = query.get('draft', { index: 'status' }).limit(10).run()
     * ```
     *
     * @name Query#limit
     * @method
     * @param {number} num - The maximum number of entities to keep in the result.
     * @return {Query} A reference to itself for chaining.
     */
    limit: function limit(num) {
      if (!utils$1.isNumber(num)) {
        throw new TypeError('limit: Expected number but found ' + (typeof num === 'undefined' ? 'undefined' : babelHelpers.typeof(num)) + '!');
      }
      var data = this.getData();
      this.data = data.slice(0, Math.min(data.length, num));
      return this;
    },


    /**
     * Apply a mapping function to the result data.
     *
     * @name Query#map
     * @method
     * @param {Function} mapFn - Mapping function.
     * @param {*} [thisArg] - Context to which to bind `mapFn`.
     * @return {Query} A reference to itself for chaining.
     */
    map: function map(mapFn, thisArg) {
      this.data = this.getData().map(mapFn, thisArg);
      return this;
    },


    /**
     * Return the result of calling the specified function on each item in this
     * collection's main index.
     * @name Query#mapCall
     * @method
     * @param {string} funcName - Name of function to call
     * @parama {...*} [args] - Remaining arguments to be passed to the function.
     * @return {Query} A reference to itself for chaining.
     */
    mapCall: function mapCall(funcName) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this.data = this.getData().map(function (item) {
        return item[funcName].apply(item, args);
      });
      return this;
    },


    /**
     * Complete the execution of the query and return the resulting data.
     *
     * @name Query#run
     * @method
     * @return {Array} The result of executing this query.
     */
    run: function run() {
      var data = this.data;
      this.data = null;
      return data;
    },


    /**
     * Skip a number of results.
     *
     * #### Example
     *
     * Get all but the first 10 draft posts
     * ```js
     * const posts = query.get('draft', { index: 'status' }).skip(10).run()
     * ```
     *
     * @name Query#skip
     * @method
     * @param {number} num - The number of entities to skip.
     * @return {Query} A reference to itself for chaining.
     */
    skip: function skip(num) {
      if (!utils$1.isNumber(num)) {
        throw new TypeError('skip: Expected number but found ' + (typeof num === 'undefined' ? 'undefined' : babelHelpers.typeof(num)) + '!');
      }
      var data = this.getData();
      if (num < data.length) {
        this.data = data.slice(num);
      } else {
        this.data = [];
      }
      return this;
    }
  }, {
    /**
     * TODO
     *
     * @name Query.ops
     * @type {Object}
     */
    ops: {
      '==': function _(value, predicate) {
        return value == predicate; // eslint-disable-line
      },
      '===': function _(value, predicate) {
        return value === predicate;
      },
      '!=': function _(value, predicate) {
        return value != predicate; // eslint-disable-line
      },
      '!==': function _(value, predicate) {
        return value !== predicate;
      },
      '>': function _(value, predicate) {
        return value > predicate;
      },
      '>=': function _(value, predicate) {
        return value >= predicate;
      },
      '<': function _(value, predicate) {
        return value < predicate;
      },
      '<=': function _(value, predicate) {
        return value <= predicate;
      },
      'isectEmpty': function isectEmpty(value, predicate) {
        return !utils$1.intersection(value || [], predicate || []).length;
      },
      'isectNotEmpty': function isectNotEmpty(value, predicate) {
        return utils$1.intersection(value || [], predicate || []).length;
      },
      'in': function _in(value, predicate) {
        return predicate.indexOf(value) !== -1;
      },
      'notIn': function notIn(value, predicate) {
        return predicate.indexOf(value) === -1;
      },
      'contains': function contains(value, predicate) {
        return (value || []).indexOf(predicate) !== -1;
      },
      'notContains': function notContains(value, predicate) {
        return (value || []).indexOf(predicate) === -1;
      }
    }
  });

  function sort(a, b, hashCode) {
    // Short-curcuit comparison if a and b are strictly equal
    // This is absolutely necessary for indexed objects that
    // don't have the idAttribute field
    if (a === b) {
      return 0;
    }
    if (hashCode) {
      a = hashCode(a);
      b = hashCode(b);
    }
    if (a === null && b === null) {
      return 0;
    }

    if (a === null) {
      return -1;
    }

    if (b === null) {
      return 1;
    }

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  }

  function insertAt(array, index, value) {
    array.splice(index, 0, value);
    return array;
  }

  function removeAt(array, index) {
    array.splice(index, 1);
    return array;
  }

  function binarySearch(array, value, field) {
    var lo = 0;
    var hi = array.length;
    var compared = void 0;
    var mid = void 0;

    while (lo < hi) {
      mid = (lo + hi) / 2 | 0;
      compared = sort(value, array[mid], field);
      if (compared === 0) {
        return {
          found: true,
          index: mid
        };
      } else if (compared < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }

    return {
      found: false,
      index: hi
    };
  }

  function Index(fieldList, opts) {
    utils$1.classCallCheck(this, Index);
    fieldList || (fieldList = []);

    if (!utils$1.isArray(fieldList)) {
      throw new Error('fieldList must be an array.');
    }

    opts || (opts = {});
    this.fieldList = fieldList;
    this.fieldGetter = opts.fieldGetter;
    this.hashCode = opts.hashCode;
    this.isIndex = true;
    this.keys = [];
    this.values = [];
  }

  utils$1.addHiddenPropsToTarget(Index.prototype, {
    'set': function set(keyList, value) {
      if (!utils$1.isArray(keyList)) {
        keyList = [keyList];
      }

      var key = keyList.shift() || null;
      var pos = binarySearch(this.keys, key);

      if (keyList.length === 0) {
        if (pos.found) {
          var dataLocation = binarySearch(this.values[pos.index], value, this.hashCode);
          if (!dataLocation.found) {
            insertAt(this.values[pos.index], dataLocation.index, value);
          }
        } else {
          insertAt(this.keys, pos.index, key);
          insertAt(this.values, pos.index, [value]);
        }
      } else {
        if (pos.found) {
          this.values[pos.index].set(keyList, value);
        } else {
          insertAt(this.keys, pos.index, key);
          var newIndex = new Index([], { hashCode: this.hashCode });
          newIndex.set(keyList, value);
          insertAt(this.values, pos.index, newIndex);
        }
      }
    },
    'get': function get(keyList) {
      if (!utils$1.isArray(keyList)) {
        keyList = [keyList];
      }

      var key = keyList.shift() || null;
      var pos = binarySearch(this.keys, key);

      if (keyList.length === 0) {
        if (pos.found) {
          if (this.values[pos.index].isIndex) {
            return this.values[pos.index].getAll();
          } else {
            return this.values[pos.index];
          }
        } else {
          return [];
        }
      } else {
        if (pos.found) {
          return this.values[pos.index].get(keyList);
        } else {
          return [];
        }
      }
    },
    getAll: function getAll() {
      var results = [];
      this.values.forEach(function (value) {
        if (value.isIndex) {
          results = results.concat(value.getAll());
        } else {
          results = results.concat(value);
        }
      });
      return results;
    },
    visitAll: function visitAll(cb, thisArg) {
      this.values.forEach(function (value) {
        if (value.isIndex) {
          value.visitAll(cb, thisArg);
        } else {
          value.forEach(cb, thisArg);
        }
      });
    },
    between: function between(leftKeys, rightKeys, opts) {
      opts || (opts = {});
      if (!utils$1.isArray(leftKeys)) {
        leftKeys = [leftKeys];
      }
      if (!utils$1.isArray(rightKeys)) {
        rightKeys = [rightKeys];
      }
      utils$1.fillIn(opts, {
        leftInclusive: true,
        rightInclusive: false,
        limit: undefined,
        offset: 0
      });

      var results = this._between(leftKeys, rightKeys, opts);

      if (opts.limit) {
        return results.slice(opts.offset, opts.limit + opts.offset);
      } else {
        return results.slice(opts.offset);
      }
    },
    _between: function _between(leftKeys, rightKeys, opts) {
      var results = [];

      var leftKey = leftKeys.shift();
      var rightKey = rightKeys.shift();

      var pos = void 0;

      if (leftKey !== undefined) {
        pos = binarySearch(this.keys, leftKey);
      } else {
        pos = {
          found: false,
          index: 0
        };
      }

      if (leftKeys.length === 0) {
        if (pos.found && opts.leftInclusive === false) {
          pos.index += 1;
        }

        for (var i = pos.index; i < this.keys.length; i += 1) {
          if (rightKey !== undefined) {
            if (opts.rightInclusive) {
              if (this.keys[i] > rightKey) {
                break;
              }
            } else {
              if (this.keys[i] >= rightKey) {
                break;
              }
            }
          }

          if (this.values[i].isIndex) {
            results = results.concat(this.values[i].getAll());
          } else {
            results = results.concat(this.values[i]);
          }

          if (opts.limit) {
            if (results.length >= opts.limit + opts.offset) {
              break;
            }
          }
        }
      } else {
        for (var _i = pos.index; _i < this.keys.length; _i += 1) {
          var currKey = this.keys[_i];
          if (currKey > rightKey) {
            break;
          }

          if (this.values[_i].isIndex) {
            if (currKey === leftKey) {
              results = results.concat(this.values[_i]._between(utils$1.copy(leftKeys), rightKeys.map(function () {
                return undefined;
              }), opts));
            } else if (currKey === rightKey) {
              results = results.concat(this.values[_i]._between(leftKeys.map(function () {
                return undefined;
              }), utils$1.copy(rightKeys), opts));
            } else {
              results = results.concat(this.values[_i].getAll());
            }
          } else {
            results = results.concat(this.values[_i]);
          }

          if (opts.limit) {
            if (results.length >= opts.limit + opts.offset) {
              break;
            }
          }
        }
      }

      if (opts.limit) {
        return results.slice(0, opts.limit + opts.offset);
      } else {
        return results;
      }
    },
    peek: function peek() {
      if (this.values.length) {
        if (this.values[0].isIndex) {
          return this.values[0].peek();
        } else {
          return this.values[0];
        }
      }
      return [];
    },
    clear: function clear() {
      this.keys = [];
      this.values = [];
    },
    insertRecord: function insertRecord(data) {
      var keyList = this.fieldList.map(function (field) {
        if (utils$1.isFunction(field)) {
          return field(data) || null;
        } else {
          return data[field] || null;
        }
      });
      this.set(keyList, data);
    },
    removeRecord: function removeRecord(data) {
      var _this = this;

      var removed = void 0;
      this.values.forEach(function (value, i) {
        if (value.isIndex) {
          if (value.removeRecord(data)) {
            if (value.keys.length === 0) {
              removeAt(_this.keys, i);
              removeAt(_this.values, i);
            }
            removed = true;
            return false;
          }
        } else {
          var dataLocation = binarySearch(value, data, _this.hashCode);
          if (dataLocation.found) {
            removeAt(value, dataLocation.index);
            if (value.length === 0) {
              removeAt(_this.keys, i);
              removeAt(_this.values, i);
            }
            removed = true;
            return false;
          }
        }
      });
      return removed ? data : undefined;
    },
    updateRecord: function updateRecord(data) {
      this.removeRecord(data);
      this.insertRecord(data);
    }
  });

  var COLLECTION_DEFAULTS = {
    /**
     * Field to be used as the unique identifier for records in this collection.
     * Defaults to `"id"` unless {@link Collection#mapper} is set, in which case
     * this will default to {@link Mapper#idAttribute}.
     *
     * @name Collection#idAttribute
     * @type {string}
     * @default "id"
     */
    idAttribute: 'id',

    /**
     * Default Mapper for this collection. Optional. If a Mapper is provided, then
     * the collection will use the {@link Mapper#idAttribute} setting, and will
     * wrap records in {@link Mapper#recordClass}.
     *
     * @example
     * import {Collection, Mapper} from 'js-data'
     *
     * class MyMapperClass extends Mapper {
     *   foo () { return 'bar' }
     * }
     * const myMapper = new MyMapperClass()
     * const collection = new Collection(null, { mapper: myMapper })
     *
     * @name Collection#mapper
     * @type {Mapper}
     * @default null
     */
    mapper: null,

    /**
     * What to do when inserting a record into this Collection that shares a
     * primary key with a record already in this Collection.
     *
     * Possible values:
     * - merge
     * - replace
     *
     * Merge:
     *
     * Recursively shallow copy properties from the new record onto the existing
     * record.
     *
     * Replace:
     *
     * Shallow copy top-level properties from the new record onto the existing
     * record. Any top-level own properties of the existing record that are _not_
     * on the new record will be removed.
     *
     * @name Collection#onConflict
     * @type {string}
     * @default "merge"
     */
    onConflict: 'merge',

    /**
     * Options to be passed into {@link Mapper#createRecord} when wrapping records
     * in {@link Mapper#recordClass}.
     *
     * @name Collection#recordOpts
     * @type {Object}
     * @default null
     */
    recordOpts: null
  };

  /**
   * ```javascript
   * import {Collection} from 'js-data'
   * ```
   *
   * An ordered set of {@link Record} instances.
   *
   * @example
   * import {Collection, Record} from 'js-data'
   * const user1 = new Record({ id: 1 })
   * const user2 = new Record({ id: 2 })
   * const UserCollection = new Collection([user1, user2])
   * UserCollection.get(1) === user1 // true
   *
   * @class Collection
   * @extends Component
   * @param {Array} [records] Initial set of records to insert into the
   * collection.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.idAttribute] See {@link Collection#idAttribute}.
   * @param {string} [opts.onConflict="merge"] See {@link Collection#onConflict}.
   * @param {string} [opts.mapper] See {@link Collection#mapper}.
   * @param {Object} [opts.recordOpts=null] See {@link Collection#recordOpts}.
   */
  var Collection = Component.extend({
    constructor: function Collection(records, opts) {
      var self = this;
      utils$1.classCallCheck(self, Collection);
      Collection.__super__.call(self);

      if (utils$1.isObject(records) && !utils$1.isArray(records)) {
        opts = records;
        records = [];
      }
      if (utils$1.isString(opts)) {
        opts = { idAttribute: opts };
      }

      // Default values for arguments
      records || (records = []);
      opts || (opts = {});
      opts.recordOpts || (opts.recordOpts = {});

      utils$1.fillIn(self, opts);
      utils$1.fillIn(self, COLLECTION_DEFAULTS);

      var idAttribute = self.recordId();

      /**
       * The main index, which uses @{link Collection#recordId} as the key.
       * @name Collection#index
       * @type {Index}
       */
      self.index = new Index([idAttribute], {
        hashCode: function hashCode(obj) {
          return utils$1.get(obj, idAttribute);
        }
      });

      /**
       * Object that holds the secondary indexes of this collection.
       * @name Collection#indexes
       * @type {Object.<string, Index>}
       */
      self.indexes = {};

      records.forEach(function (record) {
        record = self.mapper ? self.mapper.createRecord(record, self.recordOpts) : record;
        self.index.insertRecord(record);
        if (record && utils$1.isFunction(record.on)) {
          record.on('all', self._onRecordEvent, self);
        }
      });
    },

    /**
     * Used to bind to events emitted by records in this Collection.
     *
     * @name Collection#_onRecordEvent
     * @method
     * @private
     * @param {...*} [arg] Args passed to {@link Collection#emit}.
     */
    _onRecordEvent: function _onRecordEvent() {
      this.emit.apply(this, arguments);
    },


    /**
     * Insert the provided record or records.
     *
     * If a record is already in the collection then the provided record will
     * either merge with or replace the existing record based on the value of the
     * `onConflict` option.
     *
     * The collection's secondary indexes will be updated as each record is
     * visited.
     *
     * @name Collection#add
     * @method
     * @param {(Object|Object[]|Record|Record[])} data The record or records to insert.
     * @param {Object} [opts] Configuration options.
     * @param {string} [opts.onConflict] What to do when a record is already in
     * the collection. Possible values are `merge` or `replace`.
     * @return {(Object|Object[]|Record|Record[])} The added record or records.
     */
    add: function add(records, opts) {
      var self = this;

      // Default values for arguments
      opts || (opts = {});

      // Fill in "opts" with the Collection's configuration
      utils$1._(self, opts);
      records = self.beforeAdd(records, opts) || records;

      // Track whether just one record or an array of records is being inserted
      var singular = false;
      var idAttribute = self.recordId();
      if (utils$1.isObject(records) && !utils$1.isArray(records)) {
        records = [records];
        singular = true;
      }

      // Map the provided records to existing records.
      // New records will be inserted. If any records map to existing records,
      // they will be merged into the existing records according to the onConflict
      // option.
      records = records.map(function (record) {
        var id = self.recordId(record);
        if (!utils$1.isSorN(id)) {
          throw new TypeError('Collection#add: Expected string or number for ' + idAttribute + ', found ' + (typeof id === 'undefined' ? 'undefined' : babelHelpers.typeof(id)) + '!');
        }
        // Grab existing record if there is one
        var existing = self.get(id);
        // If the currently visited record is just a reference to an existing
        // record, then there is nothing to be done. Exit early.
        if (record === existing) {
          return existing;
        }

        if (existing) {
          // Here, the currently visited record corresponds to a record already
          // in the collection, so we need to merge them
          var onConflict = opts.onConflict || self.onConflict;
          if (onConflict === 'merge') {
            utils$1.deepMixIn(existing, record);
          } else if (onConflict === 'replace') {
            utils$1.forOwn(existing, function (value, key) {
              if (key !== idAttribute && !record.hasOwnProperty(key)) {
                delete existing[key];
              }
            });
            existing.set(record);
          }
          record = existing;
          // Update all indexes in the collection
          self.updateIndexes(record);
        } else {
          // Here, the currently visted record does not correspond to any record
          // in the collection, so (optionally) instantiate this record and insert
          // it into the collection
          record = self.mapper ? self.mapper.createRecord(record, self.recordOpts) : record;
          self.index.insertRecord(record);
          utils$1.forOwn(self.indexes, function (index, name) {
            index.insertRecord(record);
          });
          if (record && utils$1.isFunction(record.on)) {
            record.on('all', self._onRecordEvent, self);
          }
        }
        return record;
      });
      // Finally, return the inserted data
      var result = singular ? records.length ? records[0] : undefined : records;
      // TODO: Make this more performant (batch events?)
      self.emit('add', result);
      return self.afterAdd(records, opts, result) || result;
    },


    /**
     * Lifecycle hook called by {@link Collection#add}. If this method returns a
     * value then {@link Collection#add} will return that same value.
     *
     * @name Collection#method
     * @method
     * @param {(Object|Object[]|Record|Record[])} result The record or records
     * that were added to this Collection by {@link Collection#add}.
     * @param {Object} opts The `opts` argument passed to {@link Collection#add}.
     */
    afterAdd: function afterAdd() {},


    /**
     * Lifecycle hook called by {@link Collection#remove}. If this method returns
     * a value then {@link Collection#remove} will return that same value.
     *
     * @name Collection#afterRemove
     * @method
     * @param {(string|number)} id The `id` argument passed to {@link Collection#remove}.
     * @param {Object} opts The `opts` argument passed to {@link Collection#remove}.
     * @param {Object} record The result that will be returned by {@link Collection#remove}.
     */
    afterRemove: function afterRemove() {},


    /**
     * Lifecycle hook called by {@link Collection#removeAll}. If this method
     * returns a value then {@link Collection#removeAll} will return that same
     * value.
     *
     * @name Collection#afterRemoveAll
     * @method
     * @param {Object} query The `query` argument passed to {@link Collection#removeAll}.
     * @param {Object} opts The `opts` argument passed to {@link Collection#removeAll}.
     * @param {Object} records The result that will be returned by {@link Collection#removeAll}.
     */
    afterRemoveAll: function afterRemoveAll() {},


    /**
     * Lifecycle hook called by {@link Collection#add}. If this method returns a
     * value then the `records` argument in {@link Collection#add} will be
     * re-assigned to the returned value.
     *
     * @name Collection#beforeAdd
     * @method
     * @param {(Object|Object[]|Record|Record[])} records The `records` argument passed to {@link Collection#add}.
     * @param {Object} opts The `opts` argument passed to {@link Collection#add}.
     */
    beforeAdd: function beforeAdd() {},


    /**
     * Lifecycle hook called by {@link Collection#remove}.
     *
     * @name Collection#beforeRemove
     * @method
     * @param {(string|number)} id The `id` argument passed to {@link Collection#remove}.
     * @param {Object} opts The `opts` argument passed to {@link Collection#remove}.
     */
    beforeRemove: function beforeRemove() {},


    /**
     * Lifecycle hook called by {@link Collection#removeAll}.
     *
     * @name Collection#beforeRemoveAll
     * @method
     * @param {Object} query The `query` argument passed to {@link Collection#removeAll}.
     * @param {Object} opts The `opts` argument passed to {@link Collection#removeAll}.
     */
    beforeRemoveAll: function beforeRemoveAll() {},


    /**
     * Find all records between two boundaries.
     *
     * Shortcut for `collection.query().between(18, 30, { index: 'age' }).run()`
     *
     * @example <caption>Get all users ages 18 to 30</caption>
     * const users = collection.between(18, 30, { index: 'age' })
     *
     * @example <caption>Same as above</caption>
     * const users = collection.between([18], [30], { index: 'age' })
     *
     * @name Collection#between
     * @method
     * @param {Array} leftKeys Keys defining the left boundary.
     * @param {Array} rightKeys Keys defining the right boundary.
     * @param {Object} [opts] Configuration options.
     * @param {string} [opts.index] Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @param {boolean} [opts.leftInclusive=true] Whether to include records
     * on the left boundary.
     * @param {boolean} [opts.rightInclusive=false] Whether to include records
     * on the left boundary.
     * @param {boolean} [opts.limit] Limit the result to a certain number.
     * @param {boolean} [opts.offset] The number of resulting records to skip.
     * @return {Array} The result.
     */
    between: function between(leftKeys, rightKeys, opts) {
      return this.query().between(leftKeys, rightKeys, opts).run();
    },


    /**
     * Create a new secondary index on the contents of the collection.
     *
     * @example <caption>Index users by age</caption>
     * collection.createIndex('age')
     *
     * @example <caption>Index users by status and role</caption>
     * collection.createIndex('statusAndRole', ['status', 'role'])
     *
     * @name Collection#createIndex
     * @method
     * @param {string} name - The name of the new secondary index.
     * @param {string[]} [fieldList] - Array of field names to use as the key or
     * compound key of the new secondary index. If no fieldList is provided, then
     * the name will also be the field that is used to index the collection.
     * @return {Collection} A reference to itself for chaining.
     */
    createIndex: function createIndex(name, fieldList, opts) {
      var self = this;
      if (utils$1.isString(name) && fieldList === undefined) {
        fieldList = [name];
      }
      opts || (opts = {});
      opts.hashCode = opts.hashCode || function (obj) {
        return self.recordId(obj);
      };
      var index = self.indexes[name] = new Index(fieldList, opts);
      self.index.visitAll(index.insertRecord, index);
      return self;
    },


    /**
     * Find the record or records that match the provided query or pass the
     * provided filter function.
     *
     * Shortcut for `collection.query().filter(queryOrFn[, thisArg]).run()`
     *
     * @example <caption>Get the draft posts created less than three months</caption>
     * const posts = collection.filter({
     *   where: {
     *     status: {
     *       '==': 'draft'
     *     },
     *     created_at_timestamp: {
     *       '>=': (new Date().getTime() - (1000 * 60 * 60 * 24 * 30 * 3)) // 3 months ago
     *     }
     *   }
     * })
     *
     * @example <caption>Use a custom filter function</caption>
     * const posts = collection.filter(function (post) {
     *   return post.isReady()
     * })
     *
     * @name Collection#filter
     * @method
     * @param {(Object|Function)} [queryOrFn={}] - Selection query or filter
     * function.
     * @param {Object} [thisArg] - Context to which to bind `queryOrFn` if
     * `queryOrFn` is a function.
     * @return {Array} The result.
     */
    filter: function filter(query, thisArg) {
      return this.query().filter(query, thisArg).run();
    },


    /**
     * Iterate over all records.
     *
     * @example
     * collection.forEach(function (record) {
     *   // do something
     * })
     *
     * @name Collection#forEach
     * @method
     * @param {Function} forEachFn - Iteration function.
     * @param {*} [thisArg] - Context to which to bind `forEachFn`.
     * @return {Array} The result.
     */
    forEach: function forEach(cb, thisArg) {
      this.index.visitAll(cb, thisArg);
    },


    /**
     * Get the record with the given id.
     *
     * @name Collection#get
     * @method
     * @param {(string|number)} id - The primary key of the record to get.
     * @return {(Object|Record)} The record with the given id.
     */
    get: function get(id) {
      var instances = this.query().get(id).run();
      return instances.length ? instances[0] : undefined;
    },


    /**
     * Find the record or records that match the provided keyLists.
     *
     * Shortcut for `collection.query().getAll(keyList1, keyList2, ...).run()`
     *
     * @example <caption>Get the posts where "status" is "draft" or "inReview"</caption>
     * const posts = collection.getAll('draft', 'inReview', { index: 'status' })
     *
     * @example <caption>Same as above</caption>
     * const posts = collection.getAll(['draft'], ['inReview'], { index: 'status' })
     *
     * @name Collection#getAll
     * @method
     * @param {...Array} [keyList] - Provide one or more keyLists, and all
     * records matching each keyList will be retrieved. If no keyLists are
     * provided, all records will be returned.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Array} The result.
     */
    getAll: function getAll() {
      var _query;

      return (_query = this.query()).getAll.apply(_query, arguments).run();
    },


    /**
     * Return the index with the given name. If no name is provided, return the
     * main index. Throws an error if the specified index does not exist.
     *
     * @name Collection#getIndex
     * @method
     * @param {string} [name] The name of the index to retrieve.
     */
    getIndex: function getIndex(name) {
      var index = name ? this.indexes[name] : this.index;
      if (!index) {
        throw new Error('Index ' + name + ' does not exist!');
      }
      return index;
    },


    /**
     * Limit the result.
     *
     * Shortcut for `collection.query().limit(maximumNumber).run()`
     *
     * @example
     * const posts = collection.limit(10)
     *
     * @name Collection#limit
     * @method
     * @param {number} num - The maximum number of records to keep in the result.
     * @return {Array} The result.
     */
    limit: function limit(num) {
      return this.query().limit(num).run();
    },


    /**
     * Apply a mapping function to all records.
     *
     * @example
     * const names = collection.map(function (user) {
     *   return user.name
     * })
     *
     * @name Collection#map
     * @method
     * @param {Function} mapFn - Mapping function.
     * @param {*} [thisArg] - Context to which to bind `mapFn`.
     * @return {Array} The result of the mapping.
     */
    map: function map(cb, thisArg) {
      var data = [];
      this.index.visitAll(function (value) {
        data.push(cb.call(thisArg, value));
      });
      return data;
    },


    /**
     * Return the result of calling the specified function on each record in this
     * collection's main index.
     *
     * @name Collection#mapCall
     * @method
     * @param {string} funcName - Name of function to call
     * @parama {...*} [args] - Remaining arguments to be passed to the function.
     * @return {Array} The result.
     */
    mapCall: function mapCall(funcName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var data = [];
      this.index.visitAll(function (record) {
        data.push(record[funcName].apply(record, args));
      });
      return data;
    },


    /**
     * Return the primary key of the given, or if no record is provided, return the
     * name of the field that holds the primary key of records in this Collection.
     *
     * @name Collection#recordId
     * @method
     * @param {(Object|Record)} [record] The record whose primary key is to be
     * returned.
     * @return {(string|number)} Primary key or name of field that holds primary
     * key.
     */
    recordId: function recordId(record) {
      if (record) {
        return utils$1.get(record, this.recordId());
      }
      var self = this;
      return self.mapper ? self.mapper.idAttribute : self.idAttribute || 'id';
    },


    /**
     * Create a new query to be executed against the contents of the collection.
     * The result will be all or a subset of the contents of the collection.
     *
     * @example <caption>Grab page 2 of users between ages 18 and 30</caption>
     * collection.query()
     *   .between(18, 30, { index: 'age' }) // between ages 18 and 30
     *   .skip(10) // second page
     *   .limit(10) // page size
     *   .run()
     *
     * @name Collection#query
     * @method
     * @return {Query} New query object.
     */
    query: function query() {
      return new Query(this);
    },


    /**
     * Reduce the data in the collection to a single value and return the result.
     *
     * @example
     * const totalVotes = collection.reduce(function (prev, record) {
     *   return prev + record.upVotes + record.downVotes
     * }, 0)
     *
     * @name Collection#reduce
     * @method
     * @param {Function} cb - Reduction callback.
     * @param {*} initialValue - Initial value of the reduction.
     * @return {*} The result.
     */
    reduce: function reduce(cb, initialValue) {
      var data = this.getAll();
      return data.reduce(cb, initialValue);
    },


    /**
     * Remove the record with the given id from this Collection.
     *
     * @name Collection#remove
     * @method
     * @param {(string|number)} id - The primary key of the record to be removed.
     * @param {Object} [opts] - Configuration options.
     * @return {Object|Record} The removed record, if any.
     */
    remove: function remove(id, opts) {
      var self = this;

      // Default values for arguments
      opts || (opts = {});
      self.beforeRemove(id, opts);
      var record = self.get(id);

      // The record is in the collection, remove it
      if (record) {
        self.index.removeRecord(record);
        utils$1.forOwn(self.indexes, function (index, name) {
          index.removeRecord(record);
        });
        if (record && utils$1.isFunction(record.off)) {
          record.off('all', self._onRecordEvent, self);
          self.emit('remove', record);
        }
      }
      return self.afterRemove(id, opts, record) || record;
    },


    /**
     * Remove the record selected by "query" from this collection.
     *
     * @name Collection#removeAll
     * @method
     * @param {Object} [query={}] - Selection query.
     * @param {Object} [query.where] - Filtering criteria.
     * @param {number} [query.skip] - Number to skip.
     * @param {number} [query.limit] - Number to limit to.
     * @param {Array} [query.orderBy] - Sorting criteria.
     * @param {Object} [opts] - Configuration options.
     * @return {(Object[]|Record[])} The removed records, if any.
     */
    removeAll: function removeAll(query, opts) {
      var self = this;
      // Default values for arguments
      opts || (opts = {});
      self.beforeRemoveAll(query, opts);
      var records = self.filter(query);

      // Remove each selected record from the collection
      records.forEach(function (item) {
        self.remove(self.recordId(item), opts);
      });
      return self.afterRemoveAll(query, opts, records) || records;
    },


    /**
     * Skip a number of results.
     *
     * Shortcut for `collection.query().skip(numberToSkip).run()`
     *
     * @example
     * const posts = collection.skip(10)
     *
     * @name Collection#skip
     * @method
     * @param {number} num - The number of records to skip.
     * @return {Array} The result.
     */
    skip: function skip(num) {
      return this.query().skip(num).run();
    },


    /**
     * Return the plain JSON representation of all items in this collection.
     * Assumes records in this collection have a toJSON method.
     *
     * @name Collection#toJSON
     * @method
     * @param {Object} [opts] - Configuration options.
     * @param {string[]} [opts.with] - Array of relation names or relation fields
     * to include in the representation.
     * @return {Array} The records.
     */
    toJSON: function toJSON(opts) {
      return this.mapCall('toJSON', opts);
    },


    /**
     * Update a record's position in a single index of this collection. See
     * {@link Collection#updateIndexes} to update a record's position in all
     * indexes at once.
     *
     * @name Collection#updateIndex
     * @method
     * @param {Object} record - The record to update.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] The index in which to update the record's
     * position. If you don't specify an index then the record will be updated
     * in the main index.
     */
    updateIndex: function updateIndex(record, opts) {
      opts || (opts = {});
      this.getIndex(opts.index).updateRecord(record);
    },


    /**
     * TODO
     *
     * @name Collection#updateIndexes
     * @method
     * @param {Object} record - TODO
     * @param {Object} [opts] - Configuration options.
     */
    updateIndexes: function updateIndexes(record) {
      var self = this;
      self.index.updateRecord(record);
      utils$1.forOwn(self.indexes, function (index, name) {
        index.updateRecord(record);
      });
    }
  });

  var belongsToType = 'belongsTo';
  var hasManyType = 'hasMany';
  var hasOneType = 'hasOne';

  function Relation(related, opts) {
    var self = this;

    opts || (opts = {});

    var localField = opts.localField;
    if (!localField) {
      throw new Error('localField is required');
    }

    var foreignKey = opts.foreignKey = opts.foreignKey || opts.localKey;
    if (!foreignKey && (opts.type === belongsToType || opts.type === hasOneType)) {
      throw new Error('foreignKey is required');
    }
    var localKeys = opts.localKeys;
    var foreignKeys = opts.foreignKeys;
    if (!foreignKey && !localKeys && !foreignKeys && opts.type === hasManyType) {
      throw new Error('one of (foreignKey, localKeys, foreignKeys) is required');
    }

    if (utils$1.isString(related)) {
      opts.relation = related;
      if (!utils$1.isFunction(opts.getRelation)) {
        throw new Error('you must provide a reference to the related mapper!');
      }
    } else if (related) {
      opts.relation = related.name;
      Object.defineProperty(self, 'relatedMapper', {
        value: related
      });
    }

    utils$1.fillIn(self, opts);
  }

  utils$1.addHiddenPropsToTarget(Relation.prototype, {
    getRelation: function getRelation() {
      return this.relatedMapper;
    },
    getLocalKeys: function getLocalKeys(record) {},
    getForeignKey: function getForeignKey(record) {
      if (this.type === belongsToType) {
        return utils$1.get(record, this.foreignKey);
      }
      return utils$1.get(record, this.mapper.idAttribute);
    },
    setForeignKey: function setForeignKey(record, relatedRecord) {
      var self = this;
      if (!record || !relatedRecord) {
        return;
      }
      if (self.type === belongsToType) {
        utils$1.set(record, self.foreignKey, utils$1.get(relatedRecord, self.getRelation().idAttribute));
      } else {
        (function () {
          var idAttribute = self.mapper.idAttribute;
          if (utils$1.isArray(relatedRecord)) {
            relatedRecord.forEach(function (relatedRecordItem) {
              utils$1.set(relatedRecordItem, self.foreignKey, utils$1.get(record, idAttribute));
            });
          } else {
            utils$1.set(relatedRecord, self.foreignKey, utils$1.get(record, idAttribute));
          }
        })();
      }
    },
    getLocalField: function getLocalField(record) {
      return utils$1.get(record, this.localField);
    },
    setLocalField: function setLocalField(record, data) {
      return utils$1.set(record, this.localField, data);
    }
  });

  var relatedTo = function relatedTo(mapper, related, opts) {
    opts || (opts = {});
    if (!opts.type) {
      throw new Error('must specify relation type!');
    }
    opts.mapper = mapper;
    opts.name = mapper.name;
    var relation = new Relation(related, opts);

    mapper.relationList || Object.defineProperty(mapper, 'relationList', { value: [] });
    mapper.relationFields || Object.defineProperty(mapper, 'relationFields', { value: [] });
    mapper.relationList.push(relation);
    mapper.relationFields.push(relation.localField);
  };

  /**
   * TODO
   *
   * @name module:js-data.belongsTo
   * @method
   * @param {Mapper} related The relation the target belongs to.
   * @param {Object} opts Configuration options.
   * @param {string} opts.foreignKey The field that holds the primary key of the
   * related record.
   * @param {string} opts.localField The field that holds a reference to the
   * related record object.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  var _belongsTo = function belongsTo(related, opts) {
    opts || (opts = {});
    opts.type = belongsToType;
    return function (target) {
      relatedTo(target, related, opts);
    };
  };

  /**
   * TODO
   *
   * @name module:js-data.hasMany
   * @method
   * @param {Mapper} related The relation of which the target has many.
   * @param {Object} opts Configuration options.
   * @param {string} [opts.foreignKey] The field that holds the primary key of the
   * related record.
   * @param {string} opts.localField The field that holds a reference to the
   * related record object.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  var _hasMany = function hasMany(related, opts) {
    opts || (opts = {});
    opts.type = hasManyType;
    return function (target) {
      relatedTo(target, related, opts);
    };
  };

  /**
   * TODO
   *
   * @name module:js-data.hasOne
   * @method
   * @param {Mapper} related The relation of which the target has one.
   * @param {Object} opts Configuration options.
   * @param {string} [opts.foreignKey] The field that holds the primary key of the
   * related record.
   * @param {string} opts.localField The field that holds a reference to the
   * related record object.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  var _hasOne = function hasOne(related, opts) {
    opts || (opts = {});
    opts.type = hasOneType;
    return function (target) {
      relatedTo(target, related, opts);
    };
  };

  /**
   * js-data's Record class.
   *
   * ```javascript
   * import {Record} from 'js-data'
   * ```
   *
   * @class Record
   * @extends Component
   * @param {Object} [props] The initial properties of the new Record instance.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.noValidate=false] Whether to skip validation on the
   * initial properties.
   */
  var Record = Component.extend({
    constructor: function Record(props, opts) {
      var self = this;
      utils$1.classCallCheck(self, Record);

      props || (props = {});
      opts || (opts = {});
      var _props = {};
      Object.defineProperties(self, {
        _get: {
          enumerable: false,
          value: function value(key) {
            return utils$1.get(_props, key);
          }
        },
        _set: {
          enumerable: false,
          value: function value(key, _value) {
            return utils$1.set(_props, key, _value);
          }
        },
        _unset: {
          enumerable: false,
          value: function value(key) {
            return utils$1.unset(_props, key);
          }
        }
      });
      var _set = self._set;
      // TODO: Optimize these strings
      _set('creating', true);
      if (opts.noValidate) {
        _set('noValidate', true);
      }
      utils$1.fillIn(self, props);
      _set('creating', false);
      _set('noValidate', false);
      _set('previous', utils$1.copy(props));
    },

    /**
     * TODO
     *
     * @name Record#_mapper
     * @method
     * @ignore
     */
    _mapper: function _mapper() {
      if (!this.constructor.mapper) {
        throw new Error('This recordClass has no Mapper!');
      }
      return this.constructor.mapper;
    },


    /**
     * TODO
     *
     * @name Record#afterLoadRelations
     * @method
     * @param {string[]} relations TODO
     * @param {Object} opts TODO
     */
    afterLoadRelations: function afterLoadRelations() {},


    /**
     * TODO
     *
     * @name Record#afterSave
     * @method
     * @param {Object} opts TODO
     */
    afterSave: function afterSave() {},


    /**
     * TODO
     *
     * @name Record#beforeLoadRelations
     * @method
     * @param {string[]} relations TODO
     * @param {Object} opts TODO
     */
    beforeLoadRelations: function beforeLoadRelations() {},


    /**
     * TODO
     *
     * @name Record#beforeSave
     * @method
     * @param {Object} opts TODO
     */
    beforeSave: function beforeSave() {},


    /**
     * Return changes to this record since it was instantiated or
     * {@link Record#commit} was called.
     *
     * @name Record#changes
     * @method
     * @param [opts] Configuration options.
     * @param {Function} [opts.equalsFn] Equality function. Default uses `===`.
     * @param {Array} [opts.ignore] Array of strings or RegExp of fields to ignore.
     */
    changes: function changes(opts) {
      var self = this;
      opts || (opts = {});
      return utils$1.diffObjects(self, self._get('previous'), opts);
    },


    /**
     * TODO
     *
     * @name Record#commit
     * @method
     */
    commit: function commit() {
      var self = this;
      self._set('changed'); // unset
      self._set('previous', utils$1.copy(self));
      return self;
    },


    /**
     * TODO
     *
     * @name Record#create
     * @method
     * @param {Object} [opts] Configuration options. See {@link Mapper#create}.
     */
    create: function create(opts) {
      return this._mapper().create(this, opts);
    },


    /**
     * TODO
     *
     * @name Record#destroy
     * @method
     * @param {Object} [opts] Configuration options. @see {@link Model.destroy}.
     */
    destroy: function destroy(opts) {
      // TODO: move actual destroy logic here
      var mapper = this._mapper();
      return mapper.destroy(utils$1.get(this, mapper.idAttribute), opts);
    },


    /**
     * Return the value at the given path for this instance.
     *
     * @name Record#get
     * @method
     * @param {string} key - Path of value to retrieve.
     * @return {*} Value at path.
     */
    'get': function get(key) {
      return utils$1.get(this, key);
    },


    /**
     * Return whether this record has changed since it was instantiated or
     * {@link Record#commit} was called.
     *
     * @name Record#hasChanges
     * @method
     * @param [opts] Configuration options.
     * @param {Function} [opts.equalsFn] Equality function. Default uses `===`.
     * @param {Array} [opts.ignore] Array of strings or RegExp of fields to ignore.
     */
    hasChanges: function hasChanges(opts) {
      var self = this;
      var quickHasChanges = !!(self._get('changed') || []).length;
      return quickHasChanges || utils$1.areDifferent(self, self._get('previous'), opts);
    },


    /**
     * TODO
     *
     * @name Record#hashCode
     * @method
     */
    hashCode: function hashCode() {
      var self = this;
      return utils$1.get(self, self._mapper().idAttribute);
    },
    isValid: function isValid(opts) {
      var self = this;
      return !!self._mapper().validate(self, opts);
    },


    /**
     * TODO
     *
     * @name Record#loadRelations
     * @method
     * @param {string[]} [relations] TODO
     * @param {Object} [opts] TODO
     */
    loadRelations: function loadRelations(relations, opts) {
      var op = void 0;
      var self = this;
      var mapper = self._mapper();
      var relationList = mapper.relationList || [];

      // Default values for arguments
      relations || (relations = []);
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      utils$1._(mapper, opts);
      opts.adapter = mapper.getAdapterName(opts);

      // beforeLoadRelations lifecycle hook
      op = opts.op = 'beforeLoadRelations';
      return utils$1.resolve(self[op](relations, opts)).then(function () {
        if (utils$1.isString(relations)) {
          relations = [relations];
        }
        // Now delegate to the adapter
        op = opts.op = 'loadRelations';
        mapper.dbg(op, self, relations, opts);
        return Promise.all(relationList.map(function (def) {
          if (utils$1.isFunction(def.load)) {
            return def.load(mapper, def, self, opts);
          }
          var task = void 0;
          if (def.type === 'hasMany' && def.foreignKey) {
            // hasMany
            task = def.getRelation().findAll(babelHelpers.defineProperty({}, def.foreignKey, utils$1.get(self, mapper.idAttribute)), opts);
          } else if (def.foreignKey) {
            // belongsTo or hasOne
            var key = utils$1.get(self, def.foreignKey);
            if (utils$1.isSorN(key)) {
              task = def.getRelation().find(key, opts);
            }
          } else if (def.localKeys) {
            // hasMany
            task = def.getRelation().findAll(babelHelpers.defineProperty({}, def.getRelation().idAttribute, {
              'in': utils$1.get(self, def.localKeys)
            }), opts);
          } else if (def.foreignKeys) {
            // hasMany
            task = def.getRelation().findAll(babelHelpers.defineProperty({}, def.getRelation().idAttribute, {
              'contains': utils$1.get(self, mapper.idAttribute)
            }), opts);
          }
          if (task) {
            task = task.then(function (data) {
              if (opts.raw) {
                data = data.data;
              }
              utils$1.set(self, def.localField, def.type === 'hasOne' ? data.length ? data[0] : undefined : data);
            });
          }
          return task;
        }));
      }).then(function () {
        // afterLoadRelations lifecycle hook
        op = opts.op = 'afterLoadRelations';
        return utils$1.resolve(self[op](relations, opts)).then(function () {
          return self;
        });
      });
    },


    /**
     * TODO
     *
     * @name Record#previous
     * @method
     * @param {string} [key] TODO
     */
    previous: function previous(key) {
      var self = this;
      if (key) {
        return self._get('previous.' + key);
      }
      return self._get('previous');
    },


    /**
     * TODO
     *
     * @name Record#revert
     * @method
     * @param {Object} [opts] Configuration options.
     */
    revert: function revert(opts) {
      var self = this;
      var previous = self._get('previous') || {};
      opts || (opts = {});
      opts.preserve || (opts.preserve = []);
      utils$1.forOwn(self, function (value, key) {
        if (key !== self._mapper().idAttribute && !previous.hasOwnProperty(key) && self.hasOwnProperty(key) && opts.preserve.indexOf(key) === -1) {
          delete self[key];
        }
      });
      utils$1.forOwn(previous, function (value, key) {
        if (opts.preserve.indexOf(key) === -1) {
          self[key] = value;
        }
      });
      self.commit();
      return self;
    },


    /**
     * Delegates to {@link Mapper#update}.
     *
     * @name Record#save
     * @method
     * @param {Object} [opts] Configuration options. See {@link Mapper#create}.
     */
    save: function save(opts) {
      var self = this;
      var mapper = self._mapper();
      return mapper.update(utils$1.get(self, mapper.idAttribute), self, opts);
    },


    /**
     * Set the value for a given key, or the values for the given keys if "key" is
     * an object.
     *
     * @name Record#set
     * @method
     * @param {(string|Object)} key - Key to set or hash of key-value pairs to set.
     * @param {*} [value] - Value to set for the given key.
     * @param {Object} [opts] - Optional configuration.
     * @param {boolean} [opts.silent=false] - Whether to trigger change events.
     */
    'set': function set(key, value, opts) {
      var self = this;
      if (utils$1.isObject(key)) {
        opts = value;
      }
      opts || (opts = {});
      if (opts.silent) {
        self._set('silent', true);
      }
      utils$1.set(self, key, value);
      if (!self._get('eventId')) {
        self._set('silent'); // unset
      }
    },


    // TODO: move logic for single-item async operations onto the instance.

    /**
     * Return a plain object representation of this record. If the class from
     * which this record was created has a mapper, then {@link Mapper#toJSON} will
     * be called instead.
     *
     * @name Record#toJSON
     * @method
     * @param {Object} [opts] Configuration options.
     * @param {string[]} [opts.with] Array of relation names or relation fields
     * to include in the representation. Only available as an option if the class
     * from which this record was created has a mapper.
     * @return {Object} Plain object representation of this record.
     */
    toJSON: function toJSON(opts) {
      var _this = this;

      var mapper = this.constructor.mapper;
      if (mapper) {
        return mapper.toJSON(this, opts);
      } else {
        var _ret = function () {
          var json = {};
          utils$1.forOwn(_this, function (prop, key) {
            json[key] = utils$1.copy(prop);
          });
          return {
            v: json
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
      }
    },


    /**
     * Unset the value for a given key.
     *
     * @name Record#unset
     * @method
     * @param {string} key - Key to unset.
     * @param {Object} [opts] - Optional configuration.
     * @param {boolean} [opts.silent=false] - Whether to trigger change events.
     */
    unset: function unset(key, opts) {
      this.set(key, undefined, opts);
    },
    validate: function validate(opts) {
      return this._mapper().validate(this, opts);
    }
  });

  /**
   * Allow records to emit events.
   *
   * An record's registered listeners are stored in the record's private data.
   */
  utils$1.eventify(Record.prototype, function () {
    return this._get('events');
  }, function (value) {
    this._set('events', value);
  });

  /**
   * TODO
   *
   * @name Schema.types
   * @type {Object}
   */
  var types = {
    array: utils$1.isArray,
    boolean: utils$1.isBoolean,
    integer: utils$1.isInteger,
    'null': utils$1.isNull,
    number: utils$1.isNumber,
    object: utils$1.isObject,
    string: utils$1.isString
  };

  /**
   * @ignore
   */
  var segmentToString = function segmentToString(segment, prev) {
    var str = '';
    if (segment) {
      if (utils$1.isNumber(segment)) {
        str += '[' + segment + ']';
      } else if (prev) {
        str += '.' + segment;
      } else {
        str += '' + segment;
      }
    }
    return str;
  };

  /**
   * @ignore
   */
  var makePath = function makePath(opts) {
    opts || (opts = {});
    var path = '';
    var segments = opts.path || [];
    segments.forEach(function (segment) {
      path += segmentToString(segment, path);
    });
    path += segmentToString(opts.prop, path);
    return path;
  };

  /**
   * @ignore
   */
  var makeError = function makeError(actual, expected, opts) {
    return {
      expected: expected,
      actual: '' + actual,
      path: makePath(opts)
    };
  };

  /**
   * @ignore
   */
  var addError = function addError(actual, expected, opts, errors) {
    errors.push(makeError(actual, expected, opts));
  };

  /**
   * @ignore
   */
  var maxLengthCommon = function maxLengthCommon(keyword, value, schema, opts) {
    var max = schema[keyword];
    if (value.length > max) {
      return makeError(value.length, 'length no more than ' + max, opts);
    }
  };

  /**
   * @ignore
   */
  var minLengthCommon = function minLengthCommon(keyword, value, schema, opts) {
    var min = schema[keyword];
    if (value.length < min) {
      return makeError(value.length, 'length no less than ' + min, opts);
    }
  };

  /**
   * TODO
   *
   * @name Schema.validationKeywords
   * @type {Object}
   */
  var validationKeywords = {
    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor82
     *
     * @name Schema.validationKeywords.allOf
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */

    allOf: function allOf(value, schema, opts) {
      var allErrors = [];
      schema.allOf.forEach(function (_schema) {
        allErrors = allErrors.concat(_validate(value, _schema, opts) || []);
      });
      return allErrors.length ? undefined : allErrors;
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor85
     *
     * @name Schema.validationKeywords.anyOf
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    anyOf: function anyOf(value, schema, opts) {
      var validated = false;
      var allErrors = [];
      schema.anyOf.forEach(function (_schema) {
        var errors = _validate(value, _schema, opts);
        if (errors) {
          allErrors = allErrors.concat(errors);
        } else {
          validated = true;
        }
      });
      return validated ? undefined : allErrors;
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor70
     *
     * @name Schema.validationKeywords.dependencies
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    dependencies: function dependencies(value, schema, opts) {
      // TODO
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor76
     *
     * @name Schema.validationKeywords.enum
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    enum: function _enum(value, schema, opts) {
      var possibleValues = schema['enum'];
      if (possibleValues.indexOf(value) === -1) {
        return makeError(value, 'one of (' + possibleValues.join(', ') + ')', opts);
      }
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor37
     *
     * @name Schema.validationKeywords.items
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    items: function items(value, schema, opts) {
      opts || (opts = {});
      // TODO: additionalItems
      var items = schema.items;
      var errors = [];
      var checkingTuple = utils$1.isArray(items);
      var length = value.length;
      for (var prop = 0; prop < length; prop++) {
        if (checkingTuple) {
          // Validating a tuple, instead of just checking each item against the
          // same schema
          items = schema.items[prop];
        }
        opts.prop = prop;
        errors = errors.concat(_validate(value[prop], items, opts) || []);
      }
      return errors.length ? errors : undefined;
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor17
     *
     * @name Schema.validationKeywords.maximum
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    maximum: function maximum(value, schema, opts) {
      // Must be a number
      var maximum = schema.maximum;
      // Must be a boolean
      // Depends on maximum
      // default: false
      var exclusiveMaximum = schema.exclusiveMaximum;
      if ((typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === (typeof maximum === 'undefined' ? 'undefined' : babelHelpers.typeof(maximum)) && (exclusiveMaximum ? maximum < value : maximum <= value)) {
        // TODO: Account for value of exclusiveMaximum in messaging
        return makeError(value, 'no more than ' + maximum, opts);
      }
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor42
     *
     * @name Schema.validationKeywords.maxItems
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    maxItems: function maxItems(value, schema, opts) {
      return maxLengthCommon('maxItems', value, schema, opts);
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor26
     *
     * @name Schema.validationKeywords.maxLength
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    maxLength: function maxLength(value, schema, opts) {
      return maxLengthCommon('maxLength', value, schema, opts);
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor54
     *
     * @name Schema.validationKeywords.maxProperties
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    maxProperties: function maxProperties(value, schema, opts) {
      var maxProperties = schema.maxProperties;
      var length = Object.keys(value).length;
      if (length > maxProperties) {
        return makeError(length, 'no more than ' + maxProperties + ' properties', opts);
      }
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor21
     *
     * @name Schema.validationKeywords.minimum
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    minimum: function minimum(value, schema, opts) {
      // Must be a number
      var minimum = schema.minimum;
      // Must be a boolean
      // Depends on minimum
      // default: false
      var exclusiveMinimum = schema.exclusiveMinimum;
      if ((typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === (typeof minimum === 'undefined' ? 'undefined' : babelHelpers.typeof(minimum)) && (exclusiveMinimum ? minimum > value : minimum >= value)) {
        // TODO: Account for value of exclusiveMinimum in messaging
        return makeError(value, 'no less than ' + minimum, opts);
      }
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor42
     *
     * @name Schema.validationKeywords.minItems
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    minItems: function minItems(value, schema, opts) {
      return minLengthCommon('minItems', value, schema, opts);
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor29
     *
     * @name Schema.validationKeywords.minLength
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    minLength: function minLength(value, schema, opts) {
      return minLengthCommon('minLength', value, schema, opts);
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor57
     *
     * @name Schema.validationKeywords.minProperties
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    minProperties: function minProperties(value, schema, opts) {
      var minProperties = schema.minProperties;
      var length = Object.keys(value).length;
      if (length < minProperties) {
        return makeError(length, 'no more than ' + minProperties + ' properties', opts);
      }
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor14
     *
     * @name Schema.validationKeywords.multipleOf
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    multipleOf: function multipleOf(value, schema, opts) {
      // TODO
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor91
     *
     * @name Schema.validationKeywords.not
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    not: function not(value, schema, opts) {
      if (!_validate(value, schema.not, opts)) {
        // TODO: better messaging
        return makeError('succeeded', 'should have failed', opts);
      }
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor88
     *
     * @name Schema.validationKeywords.oneOf
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    oneOf: function oneOf(value, schema, opts) {
      var validated = false;
      var allErrors = [];
      schema.oneOf.forEach(function (_schema) {
        var errors = _validate(value, _schema, opts);
        if (errors) {
          allErrors = allErrors.concat(errors);
        } else if (validated) {
          allErrors = [makeError('valid against more than one', 'valid against only one', opts)];
          validated = false;
          return false;
        } else {
          validated = true;
        }
      });
      return validated ? undefined : allErrors;
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor33
     *
     * @name Schema.validationKeywords.pattern
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    pattern: function pattern(value, schema, opts) {
      var pattern = schema.pattern;
      if (utils$1.isString(value) && !value.match(pattern)) {
        return makeError(value, pattern, opts);
      }
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor64
     *
     * @name Schema.validationKeywords.properties
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    properties: function properties(value, schema, opts) {
      opts || (opts = {});
      // Can be a boolean or an object
      // Technically the default is an "empty schema", but here "true" is
      // functionally the same
      var additionalProperties = utils$1.isUndefined(schema.additionalProperties) ? true : schema.additionalProperties;
      // "s": The property set of the instance to validate.
      var toValidate = {};
      // "p": The property set from "properties".
      // Default is an object
      var properties = schema.properties || {};
      // "pp": The property set from "patternProperties".
      // Default is an object
      var patternProperties = schema.patternProperties || {};
      var errors = [];

      // Collect set "s"
      utils$1.forOwn(value, function (_value, prop) {
        toValidate[prop] = undefined;
      });
      // Remove from "s" all elements of "p", if any.
      utils$1.forOwn(properties || {}, function (_schema, prop) {
        if (utils$1.isUndefined(value[prop]) && !utils$1.isUndefined(_schema['default'])) {
          value[prop] = utils$1.copy(_schema['default']);
        }
        opts.prop = prop;
        errors = errors.concat(_validate(value[prop], _schema, opts) || []);
        delete toValidate[prop];
      });
      // For each regex in "pp", remove all elements of "s" which this regex
      // matches.
      utils$1.forOwn(patternProperties, function (_schema, pattern) {
        utils$1.forOwn(toValidate, function (undef, prop) {
          if (prop.match(pattern)) {
            opts.prop = prop;
            errors = errors.concat(_validate(value[prop], _schema, opts) || []);
            delete toValidate[prop];
          }
        });
      });
      var keys = Object.keys(toValidate);
      // If "s" is not empty, validation fails
      if (additionalProperties === false) {
        if (keys.length) {
          addError('extra fields: ' + keys.join(', '), 'no extra fields', opts, errors);
        }
      } else if (utils$1.isObject(additionalProperties)) {
        // Otherwise, validate according to provided schema
        keys.forEach(function (prop) {
          opts.prop = prop;
          errors = errors.concat(_validate(value[prop], additionalProperties, opts) || []);
        });
      }
      return errors.length ? errors : undefined;
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor61
     *
     * @name Schema.validationKeywords.required
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    required: function required(value, schema, opts) {
      var required = schema.required;
      var errors = [];
      if (!opts.existingOnly) {
        required.forEach(function (prop) {
          if (utils$1.isUndefined(utils$1.get(value, prop))) {
            var prevProp = opts.prop;
            opts.prop = prop;
            addError(undefined, 'a value', opts, errors);
            opts.prop = prevProp;
          }
        });
      }
      return errors.length ? errors : undefined;
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor79
     *
     * @name Schema.validationKeywords.type
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    type: function type(value, schema, opts) {
      var type = schema.type;
      var validType = void 0;
      // Can be one of several types
      if (utils$1.isString(type)) {
        type = [type];
      }
      // Try to match the value against an expected type
      type.forEach(function (_type) {
        // TODO: throw an error if type is not defined
        if (types[_type](value, schema, opts)) {
          // Matched a type
          validType = _type;
          return false;
        }
      });
      // Value did not match any expected type
      if (!validType) {
        return makeError(value ? typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value) : '' + value, 'one of (' + type.join(', ') + ')', opts);
      }
      // Run keyword validators for matched type
      // http://json-schema.org/latest/json-schema-validation.html#anchor12
      var validator = typeGroupValidators[validType];
      if (validator) {
        return validator(value, schema, opts);
      }
    },


    /**
     * http://json-schema.org/latest/json-schema-validation.html#anchor49
     *
     * @name Schema.validationKeywords.uniqueItems
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    uniqueItems: function uniqueItems(value, schema, opts) {
      if (value && value.length && schema.uniqueItems) {
        var length = value.length;
        var item = void 0,
            i = void 0,
            j = void 0;
        // Check n - 1 items
        for (i = length - 1; i > 0; i--) {
          item = value[i];
          // Only compare against unchecked items
          for (j = i - 1; j >= 0; j--) {
            // Found a duplicate
            if (item === value[j]) {
              return makeError(item, 'no duplicates', opts);
            }
          }
        }
      }
    }
  };

  /**
   * @ignore
   */
  var validateKeyword = function validateKeyword(op, value, schema, opts) {
    return !utils$1.isUndefined(schema[op]) && validationKeywords[op](value, schema, opts);
  };

  /**
   * @ignore
   */
  var runOps = function runOps(ops, value, schema, opts) {
    var errors = [];
    ops.forEach(function (op) {
      errors = errors.concat(validateKeyword(op, value, schema, opts) || []);
    });
    return errors.length ? errors : undefined;
  };

  var ANY_OPS = ['enum', 'type', 'allOf', 'anyOf', 'oneOf', 'not'];
  var ARRAY_OPS = ['items', 'maxItems', 'minItems', 'uniqueItems'];
  var NUMERIC_OPS = ['multipleOf', 'maximum', 'minimum'];
  var OBJECT_OPS = ['maxProperties', 'minProperties', 'required', 'properties', 'dependencies'];
  var STRING_OPS = ['maxLength', 'minLength', 'pattern'];

  /**
   * http://json-schema.org/latest/json-schema-validation.html#anchor75
   * @ignore
   */
  var validateAny = function validateAny(value, schema, opts) {
    return runOps(ANY_OPS, value, schema, opts);
  };

  /**
   * TODO
   *
   * @name Schema.validate
   * @method
   * @param {*} value TODO
   * @param {Object} [schema] TODO
   * @param {Object} [opts] Configuration options.
   */
  var _validate = function _validate(value, schema, opts) {
    var errors = [];
    opts || (opts = {});
    var shouldPop = void 0;
    var prevProp = opts.prop;
    if (utils$1.isUndefined(schema)) {
      return;
    }
    if (!utils$1.isObject(schema)) {
      throw new Error('Invalid schema at path: "' + opts.path + '"');
    }
    if (utils$1.isUndefined(opts.path)) {
      opts.path = [];
    }
    // Track our location as we recurse
    if (!utils$1.isUndefined(opts.prop)) {
      shouldPop = true;
      opts.path.push(opts.prop);
      opts.prop = undefined;
    }
    // Validate against parent schema
    if (schema['extends']) {
      // opts.path = path
      // opts.prop = prop
      if (utils$1.isFunction(schema['extends'].validate)) {
        errors = errors.concat(schema['extends'].validate(value, opts) || []);
      } else {
        errors = errors.concat(_validate(value, schema['extends'], opts) || []);
      }
    }
    if (utils$1.isUndefined(value)) {
      // Check if property is required
      if (schema.required === true) {
        addError(value, 'a value', opts, errors);
      }
      if (shouldPop) {
        opts.path.pop();
        opts.prop = prevProp;
      }
      return errors.length ? errors : undefined;
    }
    errors = errors.concat(validateAny(value, schema, opts) || []);
    if (shouldPop) {
      opts.path.pop();
      opts.prop = prevProp;
    }
    return errors.length ? errors : undefined;
  };

  // These strings are cached for optimal performance of the change detection
  // boolean - Whether a Record is changing in the current execution frame
  var changingPath = 'changing';
  // string[] - Properties that have changed in the current execution frame
  var changedPath = 'changed';
  // boolean - Whether a Record is currently being instantiated
  var creatingPath = 'creating';
  // number - The setTimeout change event id of a Record, if any
  var eventIdPath = 'eventId';
  // boolean - Whether to skip validation for a Record's currently changing property
  var noValidatePath = 'noValidate';
  // boolean - Whether to skip change notification for a Record's currently
  // changing property
  var silentPath = 'silent';
  var validationFailureMsg = 'validation failed';

  /**
   * Assemble a property descriptor which will be added to the prototype of
   * {@link Mapper#recordClass}. This method is called when
   * {@link Mapper#applySchema} is set to `true`.
   *
   * TODO: Make this more configurable, i.e. not so tied to the Record class.
   *
   * @ignore
   */
  var makeDescriptor = function makeDescriptor(prop, schema, opts) {
    var descriptor = {
      // These properties are enumerable by default, but regardless of their
      // enumerability, they won't be "own" properties of individual records
      enumerable: utils$1.isUndefined(schema.enumerable) ? true : !!schema.enumerable
    };
    // Cache a few strings for optimal performance
    var keyPath = 'props.' + prop;
    var previousPath = 'previous.' + prop;
    var getter = opts.getter;
    var setter = opts.setter;
    var unsetter = opts.unsetter;

    descriptor.get = function () {
      return this._get(keyPath);
    };
    descriptor.set = function (value) {
      var self = this;
      // These are accessed a lot
      var _get = self[getter];
      var _set = self[setter];
      var _unset = self[unsetter];

      // Optionally check that the new value passes validation
      if (!_get(noValidatePath)) {
        var errors = schema.validate(value);
        if (errors) {
          // Immediately throw an error, preventing the record from getting into
          // an invalid state
          var error = new Error(validationFailureMsg);
          error.errors = errors;
          throw error;
        }
      }
      // TODO: Make it so tracking can be turned on for all properties instead of
      // only per-property
      if (schema.track && !_get(creatingPath)) {
        (function () {
          var previous = _get(previousPath);
          var current = _get(keyPath);
          var changing = _get(changingPath);
          var changed = _get(changedPath);

          if (!changing) {
            // Track properties that are changing in the current event loop
            changed = [];
          }

          // Add changing properties to this array once at most
          var index = changed.indexOf(prop);
          if (current !== value && index === -1) {
            changed.push(prop);
          }
          if (previous === value) {
            if (index >= 0) {
              changed.splice(index, 1);
            }
          }
          // No changes in current event loop
          if (!changed.length) {
            changing = false;
            _unset(changingPath);
            _unset(changedPath);
            // Cancel pending change event
            if (_get(eventIdPath)) {
              clearTimeout(_get(eventIdPath));
              _unset(eventIdPath);
            }
          }
          // Changes detected in current event loop
          if (!changing && changed.length) {
            _set(changedPath, changed);
            _set(changingPath, true);
            // Saving the timeout id allows us to batch all changes in the same
            // event loop into a single "change"
            // TODO: Optimize
            _set(eventIdPath, setTimeout(function () {
              // Previous event loop where changes were gathered has ended, so
              // notify any listeners of those changes and prepare for any new
              // changes
              _unset(changedPath);
              _unset(eventIdPath);
              _unset(changingPath);
              // TODO: Optimize
              if (!_get(silentPath)) {
                var i = void 0;
                for (i = 0; i < changed.length; i++) {
                  self.emit('change:' + changed[i], self, utils$1.get(self, changed[i]));
                }
                self.emit('change', self, self.changes());
              }
              _unset(silentPath);
            }, 0));
          }
        })();
      }
      _set(keyPath, value);
      return value;
    };

    return descriptor;
  };

  /**
   * TODO
   *
   * @name Schema.typeGroupValidators
   * @type {Object}
   */
  var typeGroupValidators = {
    /**
     * TODO
     *
     * @name Schema.typeGroupValidators.array
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    array: function array(value, schema, opts) {
      return runOps(ARRAY_OPS, value, schema, opts);
    },

    /**
     * TODO
     *
     * @name Schema.typeGroupValidators.integer
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    integer: function integer(value, schema, opts) {
      // Additional validations for numerics are the same
      return typeGroupValidators.numeric(value, schema, opts);
    },

    /**
     * TODO
     *
     * @name Schema.typeGroupValidators.number
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    number: function number(value, schema, opts) {
      // Additional validations for numerics are the same
      return typeGroupValidators.numeric(value, schema, opts);
    },

    /**
     * TODO
     *
     * See http://json-schema.org/latest/json-schema-validation.html#anchor13.
     *
     * @name Schema.typeGroupValidators.numeric
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    numeric: function numeric(value, schema, opts) {
      return runOps(NUMERIC_OPS, value, schema, opts);
    },

    /**
     * TODO
     *
     * See http://json-schema.org/latest/json-schema-validation.html#anchor53.
     *
     * @name Schema.typeGroupValidators.object
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    object: function object(value, schema, opts) {
      return runOps(OBJECT_OPS, value, schema, opts);
    },

    /**
     * TODO
     *
     * See http://json-schema.org/latest/json-schema-validation.html#anchor25.
     *
     * @name Schema.typeGroupValidators.string
     * @method
     * @param {*} value TODO
     * @param {Object} schema TODO
     * @param {Object} opts TODO
     */
    string: function string(value, schema, opts) {
      return runOps(STRING_OPS, value, schema, opts);
    }
  };

  /**
   * js-data's Schema class.
   *
   * ```javascript
   * import {Schema} from 'js-data'
   * ```
   *
   * @class Schema
   * @extends Component
   * @param {Object} definition Schema definition according to json-schema.org
   */
  var Schema = Component.extend({
    constructor: function Schema(definition) {
      // const self = this
      definition || (definition = {});
      // TODO: schema validation
      utils$1.fillIn(this, definition);

      // TODO: rework this to make sure all possible keywords are converted
      if (definition.properties) {
        utils$1.forOwn(definition.properties, function (_definition, prop) {
          if (!(_definition instanceof Schema)) {
            definition.properties[prop] = new Schema(_definition);
          }
        });
      }
    },

    /**
     * This adds ES5 getters/setters to the target based on the "properties" in
     * this Schema, which makes possible change tracking and validation on
     * property assignment.
     *
     * @name Schema#validate
     * @method
     * @param {Object} target The prototype to which to apply this schema.
     */
    apply: function apply(target, opts) {
      opts || (opts = {});
      opts.getter = opts.getter || '_get';
      opts.setter = opts.setter || '_set';
      opts.unsetter = opts.unsetter || '_unset';
      var properties = this.properties || {};
      utils$1.forOwn(properties, function (schema, prop) {
        Object.defineProperty(target, prop, makeDescriptor(prop, schema, opts));
      });
    },


    /**
     * Validate the provided value against this schema.
     *
     * @name Schema#validate
     * @method
     * @param {*} value Value to validate.
     * @param {Object} [opts] Configuration options.
     * @return {(array|undefined)} Array of errors or `undefined` if valid.
     */
    validate: function validate(value, opts) {
      return _validate(value, this, opts);
    }
  }, {
    typeGroupValidators: typeGroupValidators,
    types: types,
    validate: _validate,
    validationKeywords: validationKeywords
  });

  var notify = function notify() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var self = this;
    var opts = args[args.length - 1];
    self.dbg.apply(self, [opts.op].concat(args));
    if (opts.notify || opts.notify === undefined && self.notify) {
      setTimeout(function () {
        self.emit.apply(self, [opts.op].concat(args));
      });
    }
  };

  var notify2 = function notify2() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var self = this;
    var opts = args[args.length - 2];
    self.dbg.apply(self, [opts.op].concat(args));
    if (opts.notify || opts.notify === undefined && self.notify) {
      setTimeout(function () {
        self.emit.apply(self, [opts.op].concat(args));
      });
    }
  };

  var MAPPER_DEFAULTS = {
    /**
     * Whether to augment {@link Mapper#recordClass} with getter/setter property
     * accessors according to the properties defined in {@link Mapper#schema}.
     * This makes possible validation and change tracking on individual properties
     * when using the dot (e.g. `user.name = "Bob"`) operator to modify a
     * property.
     *
     * @name Mapper#applySchema
     * @type {boolean}
     * @default true
     */
    applySchema: true,

    /**
     * Whether to enable debug-level logs.
     *
     * @name Mapper#debug
     * @type {boolean}
     * @default false
     */
    debug: false,

    /**
     * The name of the registered adapter that this Mapper should used by default.
     *
     * @name Mapper#defaultAdapter
     * @type {string}
     * @default "http"
     */
    defaultAdapter: 'http',

    /**
     * The field used as the unique identifier on records handled by this Mapper.
     *
     * @name Mapper#idAttribute
     * @type {string}
     * @default id
     */
    idAttribute: 'id',

    lifecycleMethods: {
      count: {
        defaults: [{}, {}],
        skip: true,
        types: []
      },
      destroy: {
        defaults: [{}, {}],
        skip: true,
        types: []
      },
      destroyAll: {
        defaults: [{}, {}],
        skip: true,
        types: []
      },
      find: {
        defaults: [undefined, {}],
        types: []
      },
      findAll: {
        defaults: [{}, {}],
        types: []
      },
      sum: {
        defaults: [undefined, {}, {}],
        skip: true,
        types: []
      },
      update: {
        adapterArgs: function adapterArgs(mapper, id, props, opts) {
          return [id, mapper.toJSON(props, opts), opts];
        },

        beforeAssign: 1,
        defaults: [undefined, {}, {}],
        types: []
      },
      updateAll: {
        adapterArgs: function adapterArgs(mapper, props, query, opts) {
          return [mapper.toJSON(props, opts), query, opts];
        },

        beforeAssign: 0,
        defaults: [{}, {}, {}],
        types: []
      },
      updateMany: {
        adapterArgs: function adapterArgs(mapper, records, opts) {
          return [records.map(function (record) {
            return mapper.toJSON(record, opts);
          }), opts];
        },

        beforeAssign: 0,
        defaults: [[], {}],
        types: []
      }
    },

    /**
     * Minimum amount of meta information required to start operating against a
     * resource.
     *
     * @name Mapper#name
     * @type {string}
     */
    name: null,

    /**
     * Whether this Mapper should emit operational events.
     *
     * Defaults to `true` in the browser and `false` in Node.js
     *
     * @name Mapper#notify
     * @type {boolean}
     */
    notify: utils$1.isBrowser,

    /**
     * Whether {@link Mapper#create}, {@link Mapper#createMany}, {@link Mapper#save},
     * {@link Mapper#update}, {@link Mapper#updateAll}, {@link Mapper#updateMany},
     * {@link Mapper#find}, {@link Mapper#findAll}, {@link Mapper#destroy}, and
     * {@link Mapper#destroyAll} should return a raw result object that contains
     * both the instance data returned by the adapter _and_ metadata about the
     * operation.
     *
     * The default is to NOT return the result object, and instead return just the
     * instance data.
     *
     * @name Mapper#raw
     * @type {boolean}
     * @default false
     */
    raw: false,

    schema: null
  };

  /**
   * ```javascript
   * import {Mapper} from 'js-data'
   * ```
   *
   * The core of JSData's [ORM/ODM][orm] implementation. Given a minimum amout of
   * meta information about a resource, a Mapper can perform generic CRUD
   * operations against that resource. Apart from its configuration, a Mapper is
   * stateless. The particulars of various persistence layers has been abstracted
   * into adapters, which a Mapper uses to perform its operations.
   *
   * The term "Mapper" comes from the [Data Mapper Pattern][pattern] described in
   * Martin Fowler's [Patterns of Enterprise Application Architecture][book]. A
   * Data Mapper moves data between [in-memory object instances][record] and a
   * relational or document-based database. JSData's Mapper can work with any
   * persistence layer you can write an adapter for.
   *
   * utils._("Model" is a heavily overloaded term and is avoided in this documentation
   * to prevent confusion.)_
   *
   * [orm]: https://en.wikipedia.org/wiki/Object-relational_mapping
   * [pattern]: https://en.wikipedia.org/wiki/Data_mapper_pattern
   * [book]: http://martinfowler.com/books/eaa.html
   * [record]: Record.html
   *
   * @class Mapper
   * @extends Component
   * @param {Object} [opts] Configuration options.
   */
  var Mapper = Component.extend({
    constructor: function Mapper(opts) {
      var self = this;
      utils$1.classCallCheck(self, Mapper);
      Mapper.__super__.call(self);
      opts || (opts = {});

      /**
       * Hash of registered adapters. Don't modify. Use {@link Mapper#registerAdapter}.
       *
       * @name Mapper#_adapters
       * @private
       */
      Object.defineProperty(self, '_adapters', {
        value: undefined,
        writable: true
      });

      /**
       * Hash of registered listeners. Don't modify. Use {@link Mapper#on} and
       * {@link Mapper#off}.
       *
       * @name Mapper#_listeners
       * @private
       */
      Object.defineProperty(self, '_listeners', {
        value: {},
        writable: true
      });

      /**
       * Set the `false` to force the Mapper to work with POJO objects only.
       *
       * ```javascript
       * import {Mapper, Record} from 'js-data'
       * const UserMapper = new Mapper({ recordClass: false })
       * UserMapper.recordClass // false
       * const user = UserMapper#createRecord()
       * user instanceof Record // false
       * ```
       *
       * Set to a custom class to have records wrapped in your custom class.
       *
       * ```javascript
       * import {Mapper, Record} from 'js-data'
       *  // Custom class
       * class User {
       *   constructor (props = {}) {
       *     for (var key in props) {
       *       if (props.hasOwnProperty(key)) {
       *         this[key] = props[key]
       *       }
       *     }
       *   }
       * }
       * const UserMapper = new Mapper({ recordClass: User })
       * UserMapper.recordClass // function User() {}
       * const user = UserMapper#createRecord()
       * user instanceof Record // false
       * user instanceof User // true
       * ```
       *
       * Extend the {@link Record} class.
       *
       * ```javascript
       * import {Mapper, Record} from 'js-data'
       *  // Custom class
       * class User extends Record {
       *   constructor () {
       *     super(props)
       *   }
       * }
       * const UserMapper = new Mapper({ recordClass: User })
       * UserMapper.recordClass // function User() {}
       * const user = UserMapper#createRecord()
       * user instanceof Record // true
       * user instanceof User // true
       * ```
       *
       * @name Mapper#recordClass
       * @default {@link Record}
       */
      Object.defineProperty(self, 'recordClass', {
        value: undefined,
        writable: true
      });

      utils$1.fillIn(self, opts);
      utils$1.fillIn(self, utils$1.copy(MAPPER_DEFAULTS));

      if (!self.name) {
        throw new Error('mapper cannot function without a name!');
      }

      self._adapters || (self._adapters = {});

      if (!(self.schema instanceof Schema)) {
        self.schema = new Schema(self.schema || {});
      }

      if (utils$1.isUndefined(self.recordClass)) {
        self.recordClass = Record.extend();
      }

      if (self.recordClass) {
        self.recordClass.mapper = self;

        // We can only apply the schema to the prototype of self.recordClass if the
        // class extends Record
        if (utils$1.getSuper(self.recordClass, true) === Record && self.schema && self.schema.apply && self.applySchema) {
          self.schema.apply(self.recordClass.prototype);
        }
      }
    },

    /**
     * Mapper lifecycle hook called by {@link Mapper#count}. If this method
     * returns a promise then {@link Mapper#count} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterCount
     * @method
     * @param {Object} query The `query` argument passed to {@link Mapper#count}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#count}.
     * @param {*} result The result, if any.
     */
    afterCount: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#create}. If this method
     * returns a promise then {@link Mapper#create} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterCreate
     * @method
     * @param {Object} props The `props` argument passed to {@link Mapper#create}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#create}.
     * @param {*} result The result, if any.
     */
    afterCreate: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#createMany}. If this method
     * returns a promise then {@link Mapper#createMany} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterCreateMany
     * @method
     * @param {Array} records The `records` argument passed to {@link Mapper#createMany}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#createMany}.
     * @param {*} result The result, if any.
     */
    afterCreateMany: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#destroy}. If this method
     * returns a promise then {@link Mapper#destroy} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterDestroy
     * @method
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#destroy}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#destroy}.
     * @param {*} result The result, if any.
     */
    afterDestroy: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#destroyAll}. If this method
     * returns a promise then {@link Mapper#destroyAll} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterDestroyAll
     * @method
     * @param {*} data The `data` returned by the adapter.
     * @param {query} query The `query` argument passed to {@link Mapper#destroyAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#destroyAll}.
     * @param {*} result The result, if any.
     */
    afterDestroyAll: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#find}. If this method
     * returns a promise then {@link Mapper#find} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterFind
     * @method
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#find}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#find}.
     * @param {*} result The result, if any.
     */
    afterFind: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#findAll}. If this method
     * returns a promise then {@link Mapper#findAll} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterFindAll
     * @method
     * @param {Object} query The `query` argument passed to {@link Mapper#findAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#findAll}.
     * @param {*} result The result, if any.
     */
    afterFindAll: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#sum}. If this method
     * returns a promise then {@link Mapper#sum} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterSum
     * @method
     * @param {Object} query The `query` argument passed to {@link Mapper#sum}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#sum}.
     * @param {*} result The result, if any.
     */
    afterSum: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#update}. If this method
     * returns a promise then {@link Mapper#update} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterUpdate
     * @method
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#update}.
     * @param {props} props The `props` argument passed to {@link Mapper#update}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#update}.
     * @param {*} result The result, if any.
     */
    afterUpdate: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#updateAll}. If this method
     * returns a promise then {@link Mapper#updateAll} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterUpdateAll
     * @method
     * @param {Object} props The `props` argument passed to {@link Mapper#updateAll}.
     * @param {Object} query The `query` argument passed to {@link Mapper#updateAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#updateAll}.
     * @param {*} result The result, if any.
     */
    afterUpdateAll: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#updateMany}. If this method
     * returns a promise then {@link Mapper#updateMany} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#afterUpdateMany
     * @method
     * @param {Array} records The `records` argument passed to {@link Mapper#updateMany}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#updateMany}.
     * @param {*} result The result, if any.
     */
    afterUpdateMany: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#create}. If this method
     * returns a promise then {@link Mapper#create} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeCreate
     * @method
     * @param {Object} props The `props` argument passed to {@link Mapper#create}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#create}.
     */
    beforeCreate: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#createMany}. If this method
     * returns a promise then {@link Mapper#createMany} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeCreateMany
     * @method
     * @param {Array} records The `records` argument passed to {@link Mapper#createMany}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#createMany}.
     */
    beforeCreateMany: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#count}. If this method
     * returns a promise then {@link Mapper#count} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeCount
     * @method
     * @param {Object} query The `query` argument passed to {@link Mapper#count}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#count}.
     */
    beforeCount: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#destroy}. If this method
     * returns a promise then {@link Mapper#destroy} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeDestroy
     * @method
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#destroy}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#destroy}.
     */
    beforeDestroy: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#destroyAll}. If this method
     * returns a promise then {@link Mapper#destroyAll} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeDestroyAll
     * @method
     * @param {query} query The `query` argument passed to {@link Mapper#destroyAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#destroyAll}.
     */
    beforeDestroyAll: notify,

    /**
     * Mappers lifecycle hook called by {@link Mapper#find}. If this method
     * returns a promise then {@link Mapper#find} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeFind
     * @method
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#find}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#find}.
     */
    beforeFind: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#findAll}. If this method
     * returns a promise then {@link Mapper#findAll} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeFindAll
     * @method
     * @param {Object} query The `query` argument passed to {@link Mapper#findAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#findAll}.
     */
    beforeFindAll: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#sum}. If this method
     * returns a promise then {@link Mapper#sum} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeSum
     * @method
     * @param {string} field The `field` argument passed to {@link Mapper#sum}.
     * @param {Object} query The `query` argument passed to {@link Mapper#sum}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#sum}.
     */
    beforeSum: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#update}. If this method
     * returns a promise then {@link Mapper#update} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeUpdate
     * @method
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#update}.
     * @param {props} props The `props` argument passed to {@link Mapper#update}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#update}.
     */
    beforeUpdate: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#updateAll}. If this method
     * returns a promise then {@link Mapper#updateAll} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeUpdateAll
     * @method
     * @param {Object} props The `props` argument passed to {@link Mapper#updateAll}.
     * @param {Object} query The `query` argument passed to {@link Mapper#updateAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#updateAll}.
     */
    beforeUpdateAll: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#updateMany}. If this method
     * returns a promise then {@link Mapper#updateMany} will wait for the promise
     * to resolve before continuing.
     *
     * @name Mapper#beforeUpdateMany
     * @method
     * @param {Array} records The `records` argument passed to {@link Mapper#updateMany}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#updateMany}.
     */
    beforeUpdateMany: notify,

    /**
     * @name Mapper#_end
     * @method
     * @private
     */
    _end: function _end(result, opts, skip) {
      var self = this;
      if (opts.raw) {
        utils$1._(opts, result);
      }
      if (skip) {
        return result;
      }
      var _data = opts.raw ? result.data : result;
      if (utils$1.isArray(_data) && _data.length && utils$1.isObject(_data[0])) {
        _data = _data.map(function (item) {
          return self.createRecord(item);
        });
      } else if (utils$1.isObject(_data)) {
        _data = self.createRecord(_data);
      }
      if (opts.raw) {
        result.data = _data;
      } else {
        result = _data;
      }
      return result;
    },


    /**
     * Usage:
     *
     * Post.belongsTo(User, {
     *   localKey: 'myUserId'
     * })
     *
     * Comment.belongsTo(User)
     * Comment.belongsTo(Post, {
     *   localField: '_post'
     * })
     *
     * @name Mapper#belongsTo
     * @method
     */
    belongsTo: function belongsTo(relatedMapper, opts) {
      return _belongsTo(relatedMapper, opts)(this);
    },


    /**
     * Using the `query` argument, select records to pull from an adapter.
     * Expects back from the adapter the array of selected records.
     *
     * {@link Mapper#beforeCount} will be called before calling the adapter.
     * {@link Mapper#afterCount} will be called after calling the adapter.
     *
     * @name Mapper#count
     * @method
     * @param {Object} [query={}] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {number} [query.skip] Number to skip.
     * @param {number} [query.limit] Number to limit to.
     * @param {Array} [query.orderBy] Sorting criteria.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * resulting data. If `true` return a response object that includes the
     * resulting data and metadata about the operation.
     * @return {Promise}
     */
    count: function count(query, opts) {
      return this.crud('count', query, opts);
    },


    /**
     * Create and save a new the record using the provided `props`.
     *
     * {@link Mapper#beforeCreate} will be called before calling the adapter.
     * {@link Mapper#afterCreate} will be called after calling the adapter.
     *
     * @name Mapper#create
     * @method
     * @param {Object} props The properties for the new record.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * created data. If `true` return a response object that includes the created
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to create in a cascading
     * create if `props` contains nested relations. NOT performed in a
     * transaction. Each nested create will result in another {@link Mapper#create}
     * or {@link Mapper#createMany} call.
     * @param {string[]} [opts.pass=[]] Relations to send to the adapter as part
     * of the payload. Normally relations are not sent.
     * @return {Promise}
     */
    create: function create(props, opts) {
      var op = void 0,
          adapter = void 0;
      var self = this;

      // Default values for arguments
      props || (props = {});
      opts || (opts = {});

      // Fill in "opts" with the Mapper's configuration
      utils$1._(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeCreate lifecycle hook
      op = opts.op = 'beforeCreate';
      return utils$1.resolve(self[op](props, opts)).then(function (_props) {
        // Allow for re-assignment from lifecycle hook
        props = utils$1.isUndefined(_props) ? props : _props;

        // Deep pre-create belongsTo relations
        var belongsToRelationData = {};
        opts.with || (opts.with = []);
        var tasks = [];
        utils$1.forEachRelation(self, opts, function (def, optsCopy) {
          var relationData = def.getLocalField(props);
          if (def.type === belongsToType && relationData) {
            // Create belongsTo relation first because we need a generated id to
            // attach to the child
            tasks.push(def.getRelation().create(relationData, optsCopy).then(function (data) {
              var relatedRecord = optsCopy.raw ? data.data : data;
              def.setLocalField(belongsToRelationData, relatedRecord);
              def.setForeignKey(props, relatedRecord);
            }));
          }
        });
        return utils$1.Promise.all(tasks).then(function () {
          // Now delegate to the adapter for the main create
          op = opts.op = 'create';
          self.dbg(op, props, opts);
          return utils$1.resolve(self.getAdapter(adapter)[op](self, self.toJSON(props, { with: opts.pass || [] }), opts));
        }).then(function (data) {
          var createdRecord = opts.raw ? data.data : data;
          // Deep post-create hasMany and hasOne relations
          tasks = [];
          utils$1.forEachRelation(self, opts, function (def, optsCopy) {
            var relationData = def.getLocalField(props);
            if (!relationData) {
              return;
            }
            var task = void 0;
            // Create hasMany and hasOne after the main create because we needed
            // a generated id to attach to these items
            if (def.type === hasManyType) {
              def.setForeignKey(createdRecord, relationData);
              task = def.getRelation().createMany(relationData, optsCopy).then(function (data) {
                def.setLocalField(createdRecord, opts.raw ? data.data : data);
              });
            } else if (def.type === hasOneType) {
              def.setForeignKey(createdRecord, relationData);
              task = def.getRelation().create(relationData, optsCopy).then(function (data) {
                def.setLocalField(createdRecord, opts.raw ? data.data : data);
              });
            } else if (def.type === belongsToType && def.getLocalField(belongsToRelationData)) {
              def.setLocalField(createdRecord, def.getLocalField(belongsToRelationData));
            }
            if (task) {
              tasks.push(task);
            }
          });
          return utils$1.Promise.all(tasks).then(function () {
            return data;
          });
        });
      }).then(function (result) {
        result = self._end(result, opts);
        // afterCreate lifecycle hook
        op = opts.op = 'afterCreate';
        return utils$1.resolve(self[op](props, opts, result)).then(function (_result) {
          // Allow for re-assignment from lifecycle hook
          return utils$1.isUndefined(_result) ? result : _result;
        });
      });
    },
    createInstance: function createInstance(props, opts) {
      return this.createRecord(props, opts);
    },


    /**
     * Given an array of records, batch create them via an adapter.
     *
     * {@link Mapper#beforeCreateMany} will be called before calling the adapter.
     * {@link Mapper#afterCreateMany} will be called after calling the adapter.
     *
     * @name Mapper#createMany
     * @method
     * @param {Array} records Array of records to be created in one batch.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to create in a cascading
     * create if `records` contains nested relations. NOT performed in a
     * transaction. Each nested create will result in another {@link Mapper#createMany}
     * call.
     * @param {string[]} [opts.pass=[]] Relations to send to the adapter as part
     * of the payload. Normally relations are not sent.
     * @return {Promise}
     */
    createMany: function createMany(records, opts) {
      var op = void 0,
          adapter = void 0;
      var self = this;

      // Default values for arguments
      records || (records = []);
      opts || (opts = {});

      // Fill in "opts" with the Mapper's configuration
      utils$1._(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeCreateMany lifecycle hook
      op = opts.op = 'beforeCreateMany';
      return utils$1.resolve(self[op](records, opts)).then(function (_records) {
        // Allow for re-assignment from lifecycle hook
        records = utils$1.isUndefined(_records) ? records : _records;

        // Deep pre-create belongsTo relations
        var belongsToRelationData = {};
        opts.with || (opts.with = []);
        var tasks = [];
        utils$1.forEachRelation(self, opts, function (def, optsCopy) {
          var relationData = records.map(function (record) {
            return def.getLocalField(record);
          }).filter(function (relatedRecord) {
            return relatedRecord;
          });
          if (def.type === belongsToType && relationData.length === records.length) {
            // Create belongsTo relation first because we need a generated id to
            // attach to the child
            tasks.push(def.getRelation().createMany(relationData, optsCopy).then(function (data) {
              var relatedRecords = optsCopy.raw ? data.data : data;
              def.setLocalField(belongsToRelationData, relatedRecords);
              records.forEach(function (record, i) {
                def.setForeignKey(record, relatedRecords[i]);
              });
            }));
          }
        });
        return utils$1.Promise.all(tasks).then(function () {
          // Now delegate to the adapter
          op = opts.op = 'createMany';
          var json = records.map(function (record) {
            return self.toJSON(record, { with: opts.pass || [] });
          });
          self.dbg(op, records, opts);
          return utils$1.resolve(self.getAdapter(adapter)[op](self, json, opts));
        }).then(function (data) {
          var createdRecords = opts.raw ? data.data : data;

          // Deep post-create hasOne relations
          tasks = [];
          utils$1.forEachRelation(self, opts, function (def, optsCopy) {
            var relationData = records.map(function (record) {
              return def.getLocalField(record);
            }).filter(function (relatedRecord) {
              return relatedRecord;
            });
            if (relationData.length !== records.length) {
              return;
            }
            var belongsToData = def.getLocalField(belongsToRelationData);
            var task = void 0;
            // Create hasMany and hasOne after the main create because we needed
            // a generated id to attach to these items
            if (def.type === hasManyType) {
              // Not supported
              self.log('warn', 'deep createMany of hasMany type not supported!');
            } else if (def.type === hasOneType) {
              createdRecords.forEach(function (createdRecord, i) {
                def.setForeignKey(createdRecord, relationData[i]);
              });
              task = def.getRelation().createMany(relationData, optsCopy).then(function (data) {
                var relatedData = opts.raw ? data.data : data;
                createdRecords.forEach(function (createdRecord, i) {
                  def.setLocalField(createdRecord, relatedData[i]);
                });
              });
            } else if (def.type === belongsToType && belongsToData && belongsToData.length === createdRecords.length) {
              createdRecords.forEach(function (createdRecord, i) {
                def.setLocalField(createdRecord, belongsToData[i]);
              });
            }
            if (task) {
              tasks.push(task);
            }
          });
          return utils$1.Promise.all(tasks).then(function () {
            return data;
          });
        });
      }).then(function (result) {
        result = self._end(result, opts);
        // afterCreateMany lifecycle hook
        op = opts.op = 'afterCreateMany';
        return utils$1.resolve(self[op](records, opts, result)).then(function (_result) {
          // Allow for re-assignment from lifecycle hook
          return utils$1.isUndefined(_result) ? result : _result;
        });
      });
    },


    /**
     * Create an unsaved, uncached instance of this Mapper's
     * {@link Mapper#recordClass}.
     *
     * Returns `props` if `props` is already an instance of
     * {@link Mapper#recordClass}.
     *
     * @name Mapper#createRecord
     * @method
     * @param {Object} props The initial properties of the new unsaved record.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.noValidate=false] Whether to skip validation on the
     * initial properties.
     * @return {Object} The unsaved record.
     */
    createRecord: function createRecord(props, opts) {
      var self = this;
      var recordClass = self.recordClass;
      var relationList = self.relationList || [];
      relationList.forEach(function (def) {
        var relatedMapper = def.getRelation();
        var relationData = def.getLocalField(props);
        if (utils$1.isArray(relationData) && relationData.length && !relatedMapper.is(relationData[0])) {
          def.setLocalField(props, relationData.map(function (relationDataItem) {
            return def.getRelation().createRecord(relationDataItem);
          }));
        } else if (utils$1.isObject(relationData) && !relatedMapper.is(relationData)) {
          def.setLocalField(props, def.getRelation().createRecord(relationData));
        }
      });
      // Check to make sure "props" is not already an instance of this Mapper.
      return recordClass ? props instanceof recordClass ? props : new recordClass(props, opts) : props; // eslint-disable-line
    },


    /**
     * Lifecycle invocation method.
     *
     * @name Mapper#crud
     * @method
     * @param {string} method Name of the lifecycle method to invoke.
     * @param {...*} args Arguments to pass to the lifecycle method.
     * @return {Promise}
     */
    crud: function crud(method) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var self = this;
      var config = self.lifecycleMethods[method];
      if (!config) {
        throw new Error(method + ': No such CRUD method!');
      }

      var upper = '' + method.charAt(0).toUpperCase() + method.substr(1);
      var before = 'before' + upper;
      var after = 'after' + upper;

      var op = void 0,
          adapter = void 0;

      // Default values for arguments
      config.defaults.forEach(function (value, i) {
        if (utils$1.isUndefined(args[i])) {
          args[i] = utils$1.copy(value);
        }
      });

      var opts = args[args.length - 1];

      // Fill in "opts" with the Mapper's configuration
      utils$1._(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // before lifecycle hook
      op = opts.op = before;
      return utils$1.resolve(self[op].apply(self, babelHelpers.toConsumableArray(args))).then(function (_value) {
        var _self$getAdapter;

        if (!utils$1.isUndefined(config.beforeAssign)) {
          // Allow for re-assignment from lifecycle hook
          args[config.beforeAssign] = utils$1.isUndefined(_value) ? args[config.beforeAssign] : _value;
        }
        // Now delegate to the adapter
        op = opts.op = method;
        args = config.adapterArgs ? config.adapterArgs.apply(config, [self].concat(babelHelpers.toConsumableArray(args))) : args;
        self.dbg.apply(self, [op].concat(babelHelpers.toConsumableArray(args)));
        return utils$1.resolve((_self$getAdapter = self.getAdapter(adapter))[op].apply(_self$getAdapter, [self].concat(babelHelpers.toConsumableArray(args))));
      }).then(function (result) {
        result = self._end(result, opts, !!config.skip);
        args.push(result);
        // after lifecycle hook
        op = opts.op = after;
        return utils$1.resolve(self[op].apply(self, babelHelpers.toConsumableArray(args))).then(function (_result) {
          // Allow for re-assignment from lifecycle hook
          return utils$1.isUndefined(_result) ? result : _result;
        });
      });
    },


    /**
     * Using an adapter, destroy the record with the primary key specified by the
     * `id` argument.
     *
     * {@link Mapper#beforeDestroy} will be called before destroying the record.
     * {@link Mapper#afterDestroy} will be called after destroying the record.
     *
     * @name Mapper#destroy
     * @method
     * @param {(string|number)} id The primary key of the record to destroy.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * ejected data (if any). If `true` return a response object that includes the
     * ejected data (if any) and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to destroy in a cascading
     * delete. NOT performed in a transaction.
     * @return {Promise}
     */
    destroy: function destroy(id, opts) {
      return this.crud('destroy', id, opts);
    },


    /**
     * Using the `query` argument, destroy the selected records via an adapter.
     * If no `query` is provided then all records will be destroyed.
     *
     * {@link Mapper#beforeDestroyAll} will be called before destroying the records.
     * {@link Mapper#afterDestroyAll} will be called after destroying the records.
     *
     * @name Mapper#destroyAll
     * @method
     * @param {Object} [query={}] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {number} [query.skip] Number to skip.
     * @param {number} [query.limit] Number to limit to.
     * @param {Array} [query.orderBy] Sorting criteria.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * ejected data (if any). If `true` return a response object that includes the
     * ejected data (if any) and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to destroy in a cascading
     * delete. NOT performed in a transaction.
     * @return {Promise}
     */
    destroyAll: function destroyAll(query, opts) {
      return this.crud('destroyAll', query, opts);
    },


    /**
     * Retrieve via an adapter the record with the given primary key.
     *
     * {@link Mapper#beforeFind} will be called before calling the adapter.
     * {@link Mapper#afterFind} will be called after calling the adapter.
     *
     * @name Mapper#find
     * @method
     * @param {(string|number)} id The primary key of the record to retrieve.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to eager load in the request.
     * @return {Promise}
     */
    find: function find(id, opts) {
      return this.crud('find', id, opts);
    },


    /**
     * Using the `query` argument, select records to pull from an adapter.
     * Expects back from the adapter the array of selected records.
     *
     * {@link Mapper#beforeFindAll} will be called before calling the adapter.
     * {@link Mapper#afterFindAll} will be called after calling the adapter.
     *
     * @name Mapper#findAll
     * @method
     * @param {Object} [query={}] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {number} [query.skip] Number to skip.
     * @param {number} [query.limit] Number to limit to.
     * @param {Array} [query.orderBy] Sorting criteria.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * resulting data. If `true` return a response object that includes the
     * resulting data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to eager load in the request.
     * @return {Promise}
     */
    findAll: function findAll(query, opts) {
      return this.crud('findAll', query, opts);
    },


    /**
     * Return the registered adapter with the given name or the default adapter if
     * no name is provided.
     *
     * @name Mapper#getAdapter
     * @method
     * @param {string} [name] The name of the adapter to retrieve.
     * @return {Adapter} The adapter.
     */
    getAdapter: function getAdapter(name) {
      var self = this;
      self.dbg('getAdapter', 'name:', name);
      var adapter = self.getAdapterName(name);
      if (!adapter) {
        throw new ReferenceError(adapter + ' not found!');
      }
      return self.getAdapters()[adapter];
    },


    /**
     * Return the name of a registered adapter based on the given name or options,
     * or the name of the default adapter if no name provided.
     *
     * @name Mapper#getAdapterName
     * @method
     * @param {(Object|string)} [opts] The name of an adapter or options, if any.
     * @return {string} The name of the adapter.
     */
    getAdapterName: function getAdapterName(opts) {
      opts || (opts = {});
      if (utils$1.isString(opts)) {
        opts = { adapter: opts };
      }
      return opts.adapter || opts.defaultAdapter;
    },


    /**
     * @name Mapper#getAdapters
     * @method
     */
    getAdapters: function getAdapters() {
      return this._adapters;
    },
    getSchema: function getSchema() {
      return this.schema;
    },


    /**
     * Usage:
     *
     * User.hasMany(Post, {
     *   localField: 'my_posts'
     * })
     *
     * @name Mapper#hasMany
     * @method
     */
    hasMany: function hasMany(relatedMapper, opts) {
      return _hasMany(relatedMapper, opts)(this);
    },


    /**
     * Usage:
     *
     * User.hasOne(Profile, {
     *   localField: '_profile'
     * })
     *
     * @name Mapper#hasOne
     * @method
     */
    hasOne: function hasOne(relatedMapper, opts) {
      return _hasOne(relatedMapper, opts)(this);
    },


    /**
     * Return whether `record` is an instance of this Mappers's recordClass.
     *
     * @name Mapper#is
     * @method
     * @param {Object} record The record to check.
     * @return {boolean} Whether `record` is an instance of this Mappers's
     * {@ link Mapper#recordClass}.
     */
    is: function is(record) {
      var recordClass = this.recordClass;
      return recordClass ? record instanceof recordClass : false;
    },


    /**
     * Register an adapter on this mapper under the given name.
     *
     * @name Mapper#registerAdapter
     * @method
     * @param {string} name The name of the adapter to register.
     * @param {Adapter} adapter The adapter to register.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.default=false] Whether to make the adapter the
     * default adapter for this Mapper.
     */
    registerAdapter: function registerAdapter(name, adapter, opts) {
      var self = this;
      opts || (opts = {});
      self.getAdapters()[name] = adapter;
      // Optionally make it the default adapter for the target.
      if (opts === true || opts.default) {
        self.defaultAdapter = name;
      }
    },


    /**
     * Using the `query` argument, select records to pull from an adapter.
     * Expects back from the adapter the array of selected records.
     *
     * {@link Mapper#beforeSum} will be called before calling the adapter.
     * {@link Mapper#afterSum} will be called after calling the adapter.
     *
     * @name Mapper#sum
     * @method
     * @param {string} field The field to sum.
     * @param {Object} [query={}] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {number} [query.skip] Number to skip.
     * @param {number} [query.limit] Number to limit to.
     * @param {Array} [query.orderBy] Sorting criteria.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * resulting data. If `true` return a response object that includes the
     * resulting data and metadata about the operation.
     * @return {Promise}
     */
    sum: function sum(field, query, opts) {
      return this.crud('sum', field, query, opts);
    },


    /**
     * Return a plain object representation of the given record.
     *
     * @name Mapper#toJSON
     * @method
     * @param {Object} record Record from which to create a plain object
     * representation.
     * @param {Object} [opts] Configuration options.
     * @param {string[]} [opts.with] Array of relation names or relation fields
     * to include in the representation.
     * @return {Object} Plain object representation of the record.
     */
    toJSON: function toJSON(record, opts) {
      var self = this;
      opts || (opts = {});
      var relationFields = (self ? self.relationFields : []) || [];
      var json = {};
      var properties = void 0;
      if (self && self.schema) {
        properties = self.schema.properties || {};
        // TODO: Make this work recursively
        utils$1.forOwn(properties, function (opts, prop) {
          json[prop] = utils$1.plainCopy(record[prop]);
        });
      }
      properties || (properties = {});
      if (!opts.strict) {
        utils$1.forOwn(record, function (value, key) {
          if (!properties[key] && relationFields.indexOf(key) === -1) {
            json[key] = utils$1.plainCopy(value);
          }
        });
      }
      // The user wants to include relations in the resulting plain object
      // representation
      if (self && opts.withAll) {
        opts.with = relationFields.slice();
      }
      if (self && opts.with) {
        if (utils$1.isString(opts.with)) {
          opts.with = [opts.with];
        }
        utils$1.forEachRelation(self, opts, function (def, optsCopy) {
          var relationData = def.getLocalField(record);
          if (relationData) {
            // The actual recursion
            if (utils$1.isArray(relationData)) {
              def.setLocalField(json, relationData.map(function (item) {
                return def.getRelation().toJSON(item, optsCopy);
              }));
            } else {
              def.setLocalField(json, def.getRelation().toJSON(relationData, optsCopy));
            }
          }
        });
      }
      return json;
    },


    /**
     * Using an adapter, update the record with the primary key specified by the
     * `id` argument.
     *
     * {@link Mapper#beforeUpdate} will be called before updating the record.
     * {@link Mapper#afterUpdate} will be called after updating the record.
     *
     * @name Mapper#update
     * @method
     * @param {(string|number)} id The primary key of the record to update.
     * @param {Object} props The update to apply to the record.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to update in a cascading
     * update if `props` contains nested updates to relations. NOT performed in a
     * transaction.
     * @return {Promise}
     */
    update: function update(id, props, opts) {
      return this.crud('update', id, props, opts);
    },


    /**
     * Using the `query` argument, perform the a single updated to the selected
     * records. Expects back from the adapter an array of the updated records.
     *
     * {@link Mapper#beforeUpdateAll} will be called before making the update.
     * {@link Mapper#afterUpdateAll} will be called after making the update.
     *
     * @name Mapper#updateAll
     * @method
     * @param {Object} props Update to apply to selected records.
     * @param {Object} [query={}] Selection query.
     * @param {Object} [query.where] Filtering criteria.
     * @param {number} [query.skip] Number to skip.
     * @param {number} [query.limit] Number to limit to.
     * @param {Array} [query.orderBy] Sorting criteria.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to update in a cascading
     * update if `props` contains nested updates to relations. NOT performed in a
     * transaction.
     * @return {Promise}
     */
    updateAll: function updateAll(props, query, opts) {
      return this.crud('updateAll', props, query, opts);
    },


    /**
     * Given an array of updates, perform each of the updates via an adapter. Each
     * "update" is a hash of properties with which to update an record. Each
     * update must contain the primary key to be updated.
     *
     * {@link Mapper#beforeUpdateMany} will be called before making the update.
     * {@link Mapper#afterUpdateMany} will be called after making the update.
     *
     * @name Mapper#updateMany
     * @method
     * @param {Array} records Array up record updates.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Mapper#raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to update in a cascading
     * update if each record update contains nested updates for relations. NOT
     * performed in a transaction.
     * @return {Promise}
     */
    updateMany: function updateMany(records, opts) {
      return this.crud('updateMany', records, opts);
    },


    /**
     * TODO
     *
     * @name Mapper#validate
     * @method
     * @param {Object|Array} record The record or records to validate.
     * @param {Object} [opts] Configuration options.
     */
    validate: function validate(record, opts) {
      var self = this;
      if (!self.getSchema()) {
        throw new Error('no schema!');
      }
      if (utils$1.isArray(record)) {
        return record.map(function (_record) {
          return self.schema.validate(_record, opts);
        });
      } else if (utils$1.isObject(record)) {
        return self.schema.validate(record, opts);
      } else {
        throw new Error('not a record!');
      }
    }
  });

  var toProxy = [
  /**
   * Proxy for {@link Mapper#count}.
   *
   * @name Container#count
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {Object} [query] - Passed to {@link Model.count}.
   * @param {Object} [opts] - Passed to {@link Model.count}.
   * @return {Promise}
   */
  'count',

  /**
   * Proxy for {@link Mapper#create}.
   *
   * @name Container#create
   * @method
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} record Passed to {@link Mapper#create}.
   * @param {Object} [opts] Passed to {@link Mapper#create}. See
   * {@link Mapper#create} for more configuration options.
   * @return {Promise}
   */
  'create',

  /**
   * Proxy for {@link Mapper#createMany}.
   *
   * @name Container#createMany
   * @method
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Array} records Passed to {@link Mapper#createMany}.
   * @param {Object} [opts] Passed to {@link Mapper#createMany}. See
   * {@link Mapper#createMany} for more configuration options.
   * @return {Promise}
   */
  'createMany',

  /**
   * Proxy for {@link Mapper#createRecord}.
   *
   * @name Container#createRecord
   * @method
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} props Passed to {@link Mapper#createRecord}.
   * @param {Object} [opts] Passed to {@link Mapper#createRecord}. See
   * {@link Mapper#createRecord} for configuration options.
   * @return {Promise}
   */
  'createRecord',

  /**
   * Proxy for {@link Mapper#dbg}.
   *
   * @name Container#dbg
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {...*} args - Passed to {@link Mapper#dbg}.
   */
  'dbg',

  /**
   * Proxy for {@link Mapper#destroy}.
   *
   * @name Container#destroy
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {(string|number)} id - Passed to {@link Mapper#destroy}.
   * @param {Object} [opts] - Passed to {@link Mapper#destroy}. See
   * {@link Mapper#destroy} for more configuration options.
   * @return {Promise}
   */
  'destroy',

  /**
   * Proxy for {@link Mapper#destroyAll}.
   *
   * @name Container#destroyAll
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {Object} [query] - Passed to {@link Mapper#destroyAll}.
   * @param {Object} [opts] - Passed to {@link Mapper#destroyAll}. See
   * {@link Mapper#destroyAll} for more configuration options.
   * @return {Promise}
   */
  'destroyAll',

  /**
   * Proxy for {@link Mapper#find}.
   *
   * @name Container#find
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {(string|number)} id - Passed to {@link Mapper#find}.
   * @param {Object} [opts] - Passed to {@link Mapper#find}.
   * @return {Promise}
   */
  'find',

  /**
   * Proxy for {@link Mapper#createRecord}.
   *
   * @name Container#findAll
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {Object} [query] - Passed to {@link Model.findAll}.
   * @param {Object} [opts] - Passed to {@link Model.findAll}.
   * @return {Promise}
   */
  'findAll',

  /**
   * Proxy for {@link Mapper#is}.
   *
   * @name Container#getSchema
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   */
  'getSchema',

  /**
   * Proxy for {@link Mapper#is}.
   *
   * @name Container#is
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {...*} args - Passed to {@link Mapper#is}.
   */
  'is',

  /**
   * Proxy for {@link Mapper#log}.
   *
   * @name Container#log
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {...*} args - Passed to {@link Mapper#log}.
   */
  'log',

  /**
   * Proxy for {@link Mapper#sum}.
   *
   * @name Container#sum
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {string} field - Passed to {@link Model.sum}.
   * @param {Object} [query] - Passed to {@link Model.sum}.
   * @param {Object} [opts] - Passed to {@link Model.sum}.
   * @return {Promise}
   */
  'sum',

  /**
   * Proxy for {@link Mapper#toJSON}.
   *
   * @name Container#toJSON
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {...*} args - Passed to {@link Mapper#toJSON}.
   */
  'toJSON',

  /**
   * Proxy for {@link Mapper#update}.
   *
   * @name Container#update
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {(string|number)} id - Passed to {@link Mapper#update}.
   * @param {Object} record - Passed to {@link Mapper#update}.
   * @param {Object} [opts] - Passed to {@link Mapper#update}. See
   * {@link Mapper#update} for more configuration options.
   * @return {Promise}
   */
  'update',

  /**
   * Proxy for {@link Mapper#updateAll}.
   *
   * @name Container#updateAll
   * @method
   * @param {string} name - Name of the {@link Mapper} to target.
   * @param {Object?} query - Passed to {@link Model.updateAll}.
   * @param {Object} props - Passed to {@link Model.updateAll}.
   * @param {Object} [opts] - Passed to {@link Model.updateAll}. See
   * {@link Model.updateAll} for more configuration options.
   * @return {Promise}
   */
  'updateAll',

  /**
   * Proxy for {@link Mapper#updateMany}.
   *
   * @name Container#updateMany
   * @method
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(Object[]|Record[])} records Passed to {@link Mapper#updateMany}.
   * @param {Object} [opts] Passed to {@link Mapper#updateMany}. See
   * {@link Mapper#updateMany} for more configuration options.
   * @return {Promise}
   */
  'updateMany'];

  var props = {
    constructor: function Container(opts) {
      var self = this;
      utils$1.classCallCheck(self, Container);
      Container.__super__.call(self);
      opts || (opts = {});

      // Apply options provided by the user
      utils$1.fillIn(self, opts);
      /**
       * Defaults options to pass to {@link Container#mapperClass} when creating a
       * new mapper.
       *
       * @name Container#mapperDefaults
       * @type {Object}
       */
      self.mapperDefaults = self.mapperDefaults || {};
      /**
       * Constructor function to use in {@link Container#defineMapper} to create a
       * new mapper.
       *
       * @name Container#mapperClass
       * @type {Function}
       */
      self.mapperClass = self.mapperClass || Mapper;

      // Initilize private data

      // Holds the adapters, shared by all mappers in this container
      self._adapters = {};
      // The the mappers in this container
      self._mappers = {};
    },

    /**
     * Proxy for {@link Component#on}. If an event was emitted by a Mapper in the
     * Container, then the name of the Mapper will be prepended to the arugments
     * passed to the provided event handler.
     *
     * @name Container#on
     * @method
     * @param {...*} args - Passed to {@link Component#on}.
     */

    /**
     * Used to bind to events emitted by mappers in this container.
     *
     * @name Container#_onMapperEvent
     * @method
     * @private
     * @param {string} name Name of the mapper that emitted the event.
     * @param {...*} [args] Args passed to {@link Mapper#emit}.
     */
    _onMapperEvent: function _onMapperEvent(name) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var type = args.shift();
      this.emit.apply(this, [type, name].concat(args));
    },


    /**
     * Create a new mapper and register it in this container.
     *
     * @example
     * import {Container} from 'js-data'
     * const container = new Container({
     *   mapperDefaults: { foo: 'bar' }
     * })
     * const userMapper = container.defineMapper('user')
     * userMapper.foo // "bar"
     *
     * @name Container#defineMapper
     * @method
     * @param {string} name Name under which to register the new {@link Mapper}.
     * {@link Mapper#name} will be set to this value.
     * @param {Object} [opts] Configuration options. Passed to
     * {@link Container#mapperClass} when creating the new {@link Mapper}.
     * @return {Mapper}
     */
    defineMapper: function defineMapper(name, opts) {
      var self = this;

      // For backwards compatibility with defineResource
      if (utils$1.isObject(name)) {
        opts = name;
        if (!opts.name) {
          throw new Error('name is required!');
        }
        name = opts.name;
      } else if (!utils$1.isString(name)) {
        throw new Error('name is required!');
      }

      // Default values for arguments
      opts || (opts = {});
      // Set Mapper#name
      opts.name = name;
      opts.relations || (opts.relations = {});

      // Check if the user is overriding the datastore's default mapperClass
      var mapperClass = opts.mapperClass || self.mapperClass;
      delete opts.mapperClass;

      // Apply the datastore's defaults to the options going into the mapper
      utils$1.fillIn(opts, self.mapperDefaults);

      // Instantiate a mapper
      var mapper = self._mappers[name] = new mapperClass(opts); // eslint-disable-line
      // Make sure the mapper's name is set
      mapper.name = name;
      // All mappers in this datastore will share adapters
      mapper._adapters = self.getAdapters();

      mapper.on('all', function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        self._onMapperEvent.apply(self, [name].concat(args));
      });

      // Setup the mapper's relations, including generating Mapper#relationList
      // and Mapper#relationFields
      utils$1.forOwn(mapper.relations, function (group, type) {
        utils$1.forOwn(group, function (relations, _name) {
          if (utils$1.isObject(relations)) {
            relations = [relations];
          }
          relations.forEach(function (def) {
            def.getRelation = function () {
              return self.getMapper(_name);
            };
            var relatedMapper = self._mappers[_name] || _name;
            if (type === belongsToType) {
              mapper.belongsTo(relatedMapper, def);
            } else if (type === hasOneType) {
              mapper.hasOne(relatedMapper, def);
            } else if (type === hasManyType) {
              mapper.hasMany(relatedMapper, def);
            }
          });
        });
      });

      return mapper;
    },
    defineResource: function defineResource(name, opts) {
      return this.defineMapper(name, opts);
    },


    /**
     * Return the registered adapter with the given name or the default adapter if
     * no name is provided.
     *
     * @name Container#getAdapter
     * @method
     * @param {string} [name] The name of the adapter to retrieve.
     * @return {Adapter} The adapter.
     */
    getAdapter: function getAdapter(name) {
      var self = this;
      var adapter = self.getAdapterName(name);
      if (!adapter) {
        throw new ReferenceError(adapter + ' not found!');
      }
      return self.getAdapters()[adapter];
    },


    /**
     * Return the name of a registered adapter based on the given name or options,
     * or the name of the default adapter if no name provided.
     *
     * @name Container#getAdapterName
     * @method
     * @param {(Object|string)} [opts] The name of an adapter or options, if any.
     * @return {string} The name of the adapter.
     */
    getAdapterName: function getAdapterName(opts) {
      opts || (opts = {});
      if (utils$1.isString(opts)) {
        opts = { adapter: opts };
      }
      return opts.adapter || this.mapperDefaults.defaultAdapter;
    },


    /**
     * Return the registered adapters of this container.
     *
     * @name Container#getAdapters
     * @method
     * @return {Adapter}
     */
    getAdapters: function getAdapters() {
      return this._adapters;
    },


    /**
     * Return the mapper registered under the specified name.
     *
     * @example
     * import {Container} from 'js-data'
     * const container = new Container()
     * const userMapper = container.defineMapper('user')
     * userMapper === container.getMapper('user') // true
     *
     * @name Container#getMapper
     * @method
     * @param {string} name {@link Mapper#name}.
     * @return {Mapper}
     */
    getMapper: function getMapper(name) {
      var mapper = this._mappers[name];
      if (!mapper) {
        throw new ReferenceError(name + ' is not a registered mapper!');
      }
      return mapper;
    },


    /**
     * Register an adapter on this container under the given name. Adapters
     * registered on a container are shared by all mappers in the container.
     *
     * @example
     * import {Container} from 'js-data'
     * import HttpAdapter from 'js-data-http'
     * const container = new Container()
     * container.registerAdapter('http', new HttpAdapter, { default: true })
     *
     * @name Container#registerAdapter
     * @method
     * @param {string} name The name of the adapter to register.
     * @param {Adapter} adapter The adapter to register.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.default=false] Whether to make the adapter the
     * default adapter for all Mappers in this container.
     */
    registerAdapter: function registerAdapter(name, adapter, opts) {
      var self = this;
      opts || (opts = {});
      self.getAdapters()[name] = adapter;
      // Optionally make it the default adapter for the target.
      if (opts === true || opts.default) {
        self.mapperDefaults.defaultAdapter = name;
        utils$1.forOwn(self._mappers, function (mapper) {
          mapper.defaultAdapter = name;
        });
      }
    }
  };

  toProxy.forEach(function (method) {
    props[method] = function (name) {
      var _getMapper;

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return (_getMapper = this.getMapper(name))[method].apply(_getMapper, args);
    };
  });

  /**
   * ```javascript
   * import {Container} from 'js-data'
   * ```
   *
   * The `Container` class is a place to store {@link Mapper} instances.
   *
   * Without a container, you need to manage mappers yourself, including resolving
   * circular dependencies among relations. All mappers in a container share the
   * same adapters, so you don't have to add each adapter to all of your mappers.
   *
   * @example <caption>Without Container</caption>
   * import {Mapper} from 'js-data'
   * import HttpAdapter from 'js-data-http'
   * const adapter = new HttpAdapter()
   * const userMapper = new Mapper({ name: 'user' })
   * userMapper.registerAdapter('http', adapter, { default: true })
   * const commentMapper = new Mapper({ name: 'comment' })
   * commentMapper.registerAdapter('http', adapter, { default: true })
   *
   * // This might be more difficult if the mappers were defined in different
   * // modules.
   * userMapper.hasMany(commentMapper, {
   *   localField: 'comments',
   *   foreignKey: 'userId'
   * })
   * commentMapper.belongsTo(userMapper, {
   *   localField: 'user',
   *   foreignKey: 'userId'
   * })
   *
   * @example <caption>With Container</caption>
   * import {Container} from 'js-data'
   * import HttpAdapter from 'js-data-http'
   * const container = new Container()
   * // All mappers in container share adapters
   * container.registerAdapter('http', new HttpAdapter(), { default: true })
   *
   * // These could be defined in separate modules without a problem.
   * container.defineMapper('user', {
   *   relations: {
   *     hasMany: {
   *       comment: {
   *         localField: 'comments',
   *         foreignKey: 'userId'
   *       }
   *     }
   *   }
   * })
   * container.defineMapper('comment', {
   *   relations: {
   *     belongsTo: {
   *       user: {
   *         localField: 'user',
   *         foreignKey: 'userId'
   *       }
   *     }
   *   }
   * })
   *
   * @class Container
   * @extends Component
   * @param {Object} [opts] Configuration options.
   * @param {Function} [opts.mapperClass] Constructor function to use in
   * {@link Container#defineMapper} to create a new mapper.
   * @param {Object} [opts.mapperDefaults] Defaults options to pass to
   * {@link Container#mapperClass} when creating a new mapper.
   * @return {Container}
   */
  var Container = Component.extend(props);

  /**
   * TODO
   *
   * ```javascript
   * import {LinkedCollection} from 'js-data'
   * ```
   *
   * @class LinkedCollection
   * @extends Collection
   * @param {Array} [records] Initial set of records to insert into the
   * collection. See {@link Collection}.
   * @param {Object} [opts] Configuration options. See {@link Collection}.
   * @return {Mapper}
   */
  var LinkedCollection = Collection.extend({
    constructor: function LinkedCollection(records, opts) {
      var self = this;
      utils$1.classCallCheck(self, LinkedCollection);
      LinkedCollection.__super__.call(self, records, opts);

      // Make sure this collection has somewhere to store "added" timestamps
      self._added = {};

      // Make sure this collection a reference to a datastore
      if (!self.datastore) {
        throw new Error('This collection must have a datastore!');
      }
      return self;
    },

    _onRecordEvent: function _onRecordEvent() {
      var self = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      utils$1.getSuper(self).prototype._onRecordEvent.apply(self, args);
      var event = args[0];
      // This is a very brute force method
      // Lots of room for optimization
      if (utils$1.isString(event) && event.indexOf('change') === 0) {
        self.updateIndexes(args[1]);
      }
    },
    add: function add(records, opts) {
      var self = this;
      var datastore = self.datastore;
      var mapper = self.mapper;
      var relationList = mapper.relationList || [];
      var timestamp = new Date().getTime();
      var usesRecordClass = !!mapper.recordClass;
      var singular = void 0;

      if (utils$1.isObject(records) && !utils$1.isArray(records)) {
        singular = true;
        records = [records];
      }

      if (relationList.length && records.length) {
        // Check the currently visited record for relations that need to be
        // inserted into their respective collections.
        mapper.relationList.forEach(function (def) {
          var relationName = def.relation;
          // A reference to the Mapper that this Mapper is related to
          var relatedMapper = datastore.getMapper(relationName);
          // The field used by the related Mapper as the primary key
          var relationIdAttribute = relatedMapper.idAttribute;
          // Grab the foreign key in this relationship, if there is one
          var foreignKey = def.foreignKey;
          // A lot of this is an optimization for being able to insert a lot of
          // data as quickly as possible
          var relatedCollection = datastore.getCollection(relationName);
          var type = def.type;
          var isHasMany = type === hasManyType;
          var shouldAdd = utils$1.isUndefined(def.add) ? true : !!def.add;
          var relatedData = void 0;

          records.forEach(function (record) {
            // Grab a reference to the related data attached or linked to the
            // currently visited record
            relatedData = def.getLocalField(record);

            if (utils$1.isFunction(def.add)) {
              def.add(datastore, def, record);
            } else if (relatedData) {
              // Otherwise, if there is something to be added, add it
              if (isHasMany) {
                // Handle inserting hasMany relations
                relatedData = relatedData.map(function (toInsertItem) {
                  // Check that this item isn't the same item that is already in the
                  // store
                  if (toInsertItem !== relatedCollection.get(relatedCollection.recordId(toInsertItem))) {
                    // Make sure this item has its foreignKey
                    if (foreignKey) {
                      // TODO: slow, could be optimized? But user loses hook
                      def.setForeignKey(record, toInsertItem);
                    }
                    // Finally add this related item
                    if (shouldAdd) {
                      toInsertItem = relatedCollection.add(toInsertItem);
                    }
                  }
                  return toInsertItem;
                });
                // If it's the parent that has the localKeys
                if (def.localKeys) {
                  utils$1.set(record, def.localKeys, relatedData.map(function (inserted) {
                    return utils$1.get(inserted, relationIdAttribute);
                  }));
                }
              } else {
                var relatedDataId = utils$1.get(relatedData, relationIdAttribute);
                // Handle inserting belongsTo and hasOne relations
                if (relatedData !== relatedCollection.get(relatedDataId)) {
                  // Make sure foreignKey field is set
                  def.setForeignKey(record, relatedData);
                  // Finally insert this related item
                  if (shouldAdd) {
                    relatedData = relatedCollection.add(relatedData);
                  }
                }
              }
              def.setLocalField(record, relatedData);
            }
          });
        });
      }

      records = utils$1.getSuper(self).prototype.add.call(self, records, opts);

      records.forEach(function (record) {
        // Track when this record was added
        self._added[self.recordId(record)] = timestamp;

        if (usesRecordClass) {
          record._set('$', timestamp);
        }
      });

      return singular ? records[0] : records;
    },
    remove: function remove(id, opts) {
      var self = this;
      var mapper = self.mapper;
      var record = utils$1.getSuper(self).prototype.remove.call(self, id, opts);
      if (record) {
        delete self._added[id];
        if (mapper.recordClass) {
          record._set('$'); // unset
        }
      }
      return record;
    },
    removeAll: function removeAll(query, opts) {
      var self = this;
      var mapper = self.mapper;
      var records = utils$1.getSuper(self).prototype.removeAll.call(self, query, opts);
      records.forEach(function (record) {
        delete self._added[self.recordId(record)];
        if (mapper.recordClass) {
          record._set('$'); // unset
        }
      });
      return records;
    }
  });

  var DATASTORE_DEFAULTS = {
    /**
     * Whether relations should be linked for records that are in the datastore.
     *
     * Defaults to `true` in the browser and `false` in Node.js
     *
     * @name DataStore#linkRelations
     * @type {boolean}
     */
    linkRelations: utils$1.isBrowser
  };

  var props$1 = {
    constructor: function DataStore(opts) {
      var self = this;
      utils$1.classCallCheck(self, DataStore);
      DataStore.__super__.call(self, opts);

      self.collectionClass = self.collectionClass || LinkedCollection;
      self._collections = {};
      utils$1.fillIn(self, DATASTORE_DEFAULTS);
      self._pendingQueries = {};
      self._completedQueries = {};
      return self;
    },

    _callSuper: function _callSuper(method) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return this.constructor.__super__.prototype[method].apply(this, args);
    },


    /**
     * TODO
     *
     * @name DataStore#_end
     * @method
     * @private
     * @param {string} name Name of the {@link LinkedCollection} to which to
     * add the data.
     * @param {Object} data TODO.
     * @param {Object} [opts] Configuration options.
     * @return {(Object|Array)} Result.
     */
    _end: function _end(name, data, opts) {
      if (opts.raw) {
        data.data = this.getCollection(name).add(data.data, opts);
        return data;
      } else {
        data = this.getCollection(name).add(data, opts);
      }
      return data;
    },


    /**
     * Proxy for {@link Container#on}. If an event was emitted by a Mapper or
     * Collection in the DataStore, then the name of the Mapper or Collection will
     * be prepended to the arugments passed to the provided event handler.
     *
     * @name DataStore#on
     * @method
     * @param {...*} args - Passed to {@link Container#on}.
     */

    /**
     * Used to bind to events emitted by collections in this store.
     *
     * @name DataStore#_onCollectionEvent
     * @method
     * @private
     * @param {string} name Name of the collection that emitted the event.
     * @param {...*} [args] Args passed to {@link Collection#emit}.
     */
    _onCollectionEvent: function _onCollectionEvent(name) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var type = args.shift();
      this.emit.apply(this, [type, name].concat(args));
    },
    cachedFind: function cachedFind(name, id, opts) {
      return this.get(name, id, opts);
    },
    cachedFindAll: function cachedFindAll(name, query, opts) {
      var self = this;
      if (self._completedQueries[name][self.hashQuery(name, query, opts)]) {
        return self.filter(name, query, opts);
      }
    },


    /**
     * TODO
     *
     * @name DataStore#create
     * @method
     * @param {string} name Name of the {@link Mapper} to target.
     * @param {Object} record Passed to {@link Mapper#create}.
     * @param {Object} [opts] Passed to {@link Mapper#create}. See
     * {@link Mapper#create} for more configuration options.
     * @return {Promise}
     */
    create: function create(name, record, opts) {
      var self = this;
      opts || (opts = {});
      return self._callSuper('create', name, record, opts).then(function (data) {
        return self._end(name, data, opts);
      });
    },


    /**
     * TODO
     *
     * @name DataStore#createMany
     * @method
     * @param {string} name Name of the {@link Mapper} to target.
     * @param {Array} records Passed to {@link Mapper#createMany}.
     * @param {Object} [opts] Passed to {@link Mapper#createMany}. See
     * {@link Mapper#createMany} for more configuration options.
     * @return {Promise}
     */
    createMany: function createMany(name, records, opts) {
      var self = this;
      opts || (opts = {});
      return self._callSuper('createMany', name, records, opts).then(function (data) {
        return self._end(name, data, opts);
      });
    },
    defineMapper: function defineMapper(name, opts) {
      var self = this;
      var mapper = utils$1.getSuper(self).prototype.defineMapper.call(self, name, opts);
      self._pendingQueries[name] = {};
      self._completedQueries[name] = {};
      mapper.relationList || Object.defineProperty(mapper, 'relationList', { value: [] });

      // The datastore uses a subclass of Collection that is "datastore-aware"
      var collection = self._collections[name] = new self.collectionClass(null, { // eslint-disable-line
        // Make sure the collection has somewhere to store "added" timestamps
        _added: {},
        // Give the collection a reference to this datastore
        datastore: self,
        // The mapper tied to the collection
        mapper: mapper
      });

      var schema = mapper.schema || {};
      var properties = schema.properties || {};
      // TODO: Make it possible index nested properties?
      utils$1.forOwn(properties, function (opts, prop) {
        if (opts.indexed) {
          collection.createIndex(prop);
        }
      });

      // Create a secondary index on the "added" timestamps of records in the
      // collection
      collection.createIndex('addedTimestamps', ['$'], {
        fieldGetter: function fieldGetter(obj) {
          return collection._added[collection.recordId(obj)];
        }
      });

      collection.on('all', function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        self._onCollectionEvent.apply(self, [name].concat(args));
      });

      var linkRelations = self.linkRelations;

      if (linkRelations) {
        mapper.relationList.forEach(function (def) {
          var relation = def.relation;
          var localField = def.localField;
          var path = 'links.' + localField;
          var foreignKey = def.foreignKey;
          var type = def.type;
          var link = utils$1.isUndefined(def.link) ? linkRelations : def.link;
          var updateOpts = { index: foreignKey };
          var descriptor = void 0;

          if (type === belongsToType) {
            if (!collection.indexes[foreignKey]) {
              collection.createIndex(foreignKey);
            }

            descriptor = {
              get: function get() {
                var _self = this;
                if (!_self._get('$') || !link) {
                  return _self._get(path);
                }
                var key = def.getForeignKey(_self);
                var item = utils$1.isUndefined(key) ? undefined : self.getCollection(relation).get(key);
                _self._set(path, item);
                return item;
              },
              set: function set(record) {
                var _self = this;
                _self._set(path, record);
                def.setForeignKey(_self, record);
                collection.updateIndex(_self, updateOpts);
                return def.getLocalField(_self);
              }
            };
          } else if (type === hasManyType) {
            (function () {
              var localKeys = def.localKeys;
              var foreignKeys = def.foreignKeys;

              // TODO: Handle case when belongsTo relation isn't ever defined
              if (self._collections[relation] && foreignKey && !self.getCollection(relation).indexes[foreignKey]) {
                self.getCollection(relation).createIndex(foreignKey);
              }

              descriptor = {
                get: function get() {
                  var _self = this;
                  if (!_self._get('$') || !link) {
                    return _self._get(path);
                  }
                  var key = def.getForeignKey(_self);
                  var items = void 0;
                  var relationCollection = self.getCollection(relation);

                  if (foreignKey) {
                    // Really fast retrieval
                    items = relationCollection.getAll(key, {
                      index: foreignKey
                    });
                  } else if (localKeys) {
                    var keys = utils$1.get(_self, localKeys) || [];
                    var _args = utils$1.isArray(keys) ? keys : Object.keys(keys);
                    // Really fast retrieval
                    items = relationCollection.getAll.apply(relationCollection, _args);
                  } else if (foreignKeys) {
                    var query = {};
                    utils$1.set(query, 'where.' + foreignKeys + '.contains', key);
                    // Make a much slower retrieval
                    items = relationCollection.filter(query);
                  }

                  _self._set(path, items);
                  return items;
                },
                set: function set(records) {
                  var _self = this;
                  var key = collection.recordId(_self);
                  var relationCollection = self.getCollection(relation);
                  _self._set(path, records);

                  if (foreignKey) {
                    def.setForeignKey(_self, records);
                    if (utils$1.isArray(records)) {
                      records.forEach(function (record) {
                        relationCollection.updateIndex(record, updateOpts);
                      });
                    }
                  }if (localKeys) {
                    utils$1.set(_self, localKeys, records.map(function (record) {
                      return relationCollection.recordId(record);
                    }));
                  } else if (foreignKeys) {
                    records.forEach(function (record) {
                      var keys = utils$1.get(record, foreignKeys);
                      if (keys) {
                        if (keys.indexOf(key) === -1) {
                          keys.push(key);
                        }
                      } else {
                        utils$1.set(record, foreignKeys, [key]);
                      }
                    });
                  }
                  return def.getLocalField(_self);
                }
              };
            })();
          } else if (type === hasOneType) {
            descriptor = {
              get: function get() {
                var _self = this;
                if (!_self._get('$') || !link) {
                  return _self._get(path);
                }
                var key = def.getForeignKey(_self);
                var items = self.getCollection(relation).getAll(key, {
                  index: foreignKey
                });
                var item = items.length ? items[0] : undefined;
                _self._set(path, item);
                return item;
              },
              set: function set(record) {
                var _self = this;
                _self._set(path, record);
                def.setForeignKey(_self, record);
                self.getCollection(relation).updateIndex(record, updateOpts);
                return def.getLocalField(_self);
              }
            };
          }

          if (descriptor) {
            descriptor.enumerable = utils$1.isUndefined(def.enumerable) ? true : def.enumerable;
            if (def.get) {
              (function () {
                var origGet = descriptor.get;
                descriptor.get = function () {
                  var _this = this;

                  return def.get(def, this, function () {
                    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                      args[_key4] = arguments[_key4];
                    }

                    return origGet.apply(_this, args);
                  });
                };
              })();
            }
            if (def.set) {
              (function () {
                var origSet = descriptor.set;
                descriptor.set = function (related) {
                  var _this2 = this;

                  return def.set(def, this, related, function (value) {
                    return origSet.call(_this2, value === undefined ? related : value);
                  });
                };
              })();
            }
            Object.defineProperty(mapper.recordClass.prototype, localField, descriptor);
          }
        });
      }

      return mapper;
    },


    /**
     * TODO
     *
     * @name DataStore#destroy
     * @method
     * @param {string} name - Name of the {@link Mapper} to target.
     * @param {(string|number)} id - Passed to {@link Mapper#destroy}.
     * @param {Object} [opts] - Passed to {@link Mapper#destroy}. See
     * {@link Mapper#destroy} for more configuration options.
     * @return {Promise}
     */
    destroy: function destroy(name, id, opts) {
      var self = this;
      opts || (opts = {});
      return self._callSuper('destroy', name, id, opts).then(function (data) {
        if (opts.raw) {
          data.data = self.getCollection(name).remove(id, opts);
        } else {
          data = self.getCollection(name).remove(id, opts);
        }
        delete self._pendingQueries[name][id];
        delete self._completedQueries[name][id];
        return data;
      });
    },


    /**
     * TODO
     *
     * @name DataStore#destroyAll
     * @method
     * @param {string} name - Name of the {@link Mapper} to target.
     * @param {Object} [query] - Passed to {@link Mapper#destroyAll}.
     * @param {Object} [opts] - Passed to {@link Mapper#destroyAll}. See
     * {@link Mapper#destroyAll} for more configuration options.
     * @return {Promise}
     */
    destroyAll: function destroyAll(name, query, opts) {
      var self = this;
      opts || (opts = {});
      return self._callSuper('destroyAll', name, query, opts).then(function (data) {
        if (opts.raw) {
          data.data = self.getCollection(name).removeAll(query, opts);
        } else {
          data = self.getCollection(name).removeAll(query, opts);
        }
        var hash = self.hashQuery(name, query, opts);
        delete self._pendingQueries[name][hash];
        delete self._completedQueries[name][hash];
        return data;
      });
    },
    eject: function eject(id, opts) {
      return this.remove(id, opts);
    },
    ejectAll: function ejectAll(query, opts) {
      return this.removeAll(query, opts);
    },


    /**
     * TODO
     *
     * @name DataStore#find
     * @method
     * @param {string} name - Name of the {@link Mapper} to target.
     * @param {(string|number)} id - Passed to {@link Mapper#find}.
     * @param {Object} [opts] - Passed to {@link Mapper#find}.
     * @return {Promise}
     */
    find: function find(name, id, opts) {
      var self = this;
      opts || (opts = {});
      var pendingQuery = self._pendingQueries[name][id];

      utils$1.fillIn(opts, self.getMapper(name));

      if (pendingQuery) {
        return pendingQuery;
      }
      var item = self.cachedFind(name, id, opts);
      var promise = void 0;

      if (opts.force || !item) {
        promise = self._pendingQueries[name][id] = self._callSuper('find', name, id, opts).then(function (data) {
          delete self._pendingQueries[name][id];
          return self._end(name, data, opts);
        }, function (err) {
          delete self._pendingQueries[name][id];
          return utils$1.reject(err);
        }).then(function (data) {
          self._completedQueries[name][id] = new Date().getTime();
          return data;
        });
      } else {
        promise = utils$1.resolve(item);
      }
      return promise;
    },


    /**
     * TODO
     *
     * @name DataStore#findAll
     * @method
     * @param {string} name - Name of the {@link Mapper} to target.
     * @param {Object} [query] - Passed to {@link Model.findAll}.
     * @param {Object} [opts] - Passed to {@link Model.findAll}.
     * @return {Promise}
     */
    findAll: function findAll(name, query, opts) {
      var self = this;
      opts || (opts = {});
      var hash = self.hashQuery(name, query, opts);
      var pendingQuery = self._pendingQueries[name][hash];

      utils$1.fillIn(opts, self.getMapper(name));

      if (pendingQuery) {
        return pendingQuery;
      }

      var items = self.cachedFindAll(name, query, opts);
      var promise = void 0;

      if (opts.force || !items) {
        promise = self._pendingQueries[name][hash] = self._callSuper('findAll', name, query, opts).then(function (data) {
          delete self._pendingQueries[name][hash];
          return self._end(name, data, opts);
        }, function (err) {
          delete self._pendingQueries[name][hash];
          return utils$1.reject(err);
        }).then(function (data) {
          self._completedQueries[name][hash] = new Date().getTime();
          return data;
        });
      } else {
        promise = utils$1.resolve(items);
      }
      return promise;
    },


    /**
     * TODO
     *
     * @name DataStore#getCollection
     * @method
     * @param {string} name Name of the {@link LinkedCollection} to retrieve.
     * @return {LinkedCollection}
     */
    getCollection: function getCollection(name) {
      var collection = this._collections[name];
      if (!collection) {
        throw new ReferenceError(name + ' is not a registered collection!');
      }
      return collection;
    },
    hashQuery: function hashQuery(name, query, opts) {
      return utils$1.toJson(query);
    },
    inject: function inject(records, opts) {
      return this.add(records, opts);
    },
    remove: function remove(name, id, opts) {
      var self = this;
      var record = self.getCollection(name).remove(id, opts);
      if (record) {
        self.removeRelated(name, [record], opts);
      }
      return record;
    },
    removeAll: function removeAll(name, query, opts) {
      var self = this;
      var records = self.getCollection(name).removeAll(query, opts);
      if (records.length) {
        self.removeRelated(name, records, opts);
      }
      return records;
    },
    removeRelated: function removeRelated(name, records, opts) {
      var self = this;
      utils$1.forEachRelation(self.getMapper(name), opts, function (def, optsCopy) {
        records.forEach(function (record) {
          var relatedData = void 0;
          var query = void 0;
          if (def.foreignKey && (def.type === 'hasOne' || def.type === 'hasMany')) {
            query = babelHelpers.defineProperty({}, def.foreignKey, def.getForeignKey(record));
          } else if (def.type === 'hasMany' && def.localKeys) {
            query = {
              where: babelHelpers.defineProperty({}, def.getRelation().idAttribute, {
                'in': utils$1.get(record, def.localKeys)
              })
            };
          } else if (def.type === 'hasMany' && def.foreignKeys) {
            query = {
              where: babelHelpers.defineProperty({}, def.foreignKeys, {
                'contains': def.getForeignKey(record)
              })
            };
          } else if (def.type === 'belongsTo') {
            relatedData = self.remove(def.relation, def.getForeignKey(record), optsCopy);
          }
          if (query) {
            relatedData = self.removeAll(def.relation, query, optsCopy);
          }
          if (relatedData) {
            if (utils$1.isArray(relatedData) && !relatedData.length) {
              return;
            }
            if (def.type === 'hasOne') {
              relatedData = relatedData[0];
            }
            def.setLocalField(record, relatedData);
          }
        });
      });
    },


    /**
     * TODO
     *
     * @name DataStore#update
     * @method
     * @param {string} name - Name of the {@link Mapper} to target.
     * @param {(string|number)} id - Passed to {@link Mapper#update}.
     * @param {Object} record - Passed to {@link Mapper#update}.
     * @param {Object} [opts] - Passed to {@link Mapper#update}. See
     * {@link Mapper#update} for more configuration options.
     * @return {Promise}
     */
    update: function update(name, id, record, opts) {
      var self = this;
      opts || (opts = {});
      return self._callSuper('update', name, id, record, opts).then(function (data) {
        return self._end(name, data, opts);
      });
    },


    /**
     * TODO
     *
     * @name DataStore#updateAll
     * @method
     * @param {string} name - Name of the {@link Mapper} to target.
     * @param {Object} props - Passed to {@link Mapper#updateAll}.
     * @param {Object} [query] - Passed to {@link Mapper#updateAll}.
     * @param {Object} [opts] - Passed to {@link Mapper#updateAll}. See
     * {@link Mapper#updateAll} for more configuration options.
     * @return {Promise}
     */
    updateAll: function updateAll(name, props, query, opts) {
      var self = this;
      opts || (opts = {});
      return self._callSuper('updateAll', name, query, props, opts).then(function (data) {
        return self._end(name, data, opts);
      });
    },


    /**
     * TODO
     *
     * @name DataStore#updateMany
     * @method
     * @param {string} name Name of the {@link Mapper} to target.
     * @param {(Object[]|Record[])} records Passed to {@link Mapper#updateMany}.
     * @param {Object} [opts] Passed to {@link Mapper#updateMany}. See
     * {@link Mapper#updateMany} for more configuration options.
     * @return {Promise}
     */
    updateMany: function updateMany(name, records, opts) {
      var self = this;
      opts || (opts = {});
      return self._callSuper('updateMany', name, records, opts).then(function (data) {
        return self._end(name, data, opts);
      });
    }
  };

  var toProxy$1 = ['add', 'between', 'createIndex', 'filter', 'get', 'getAll', 'query', 'toJson'];

  toProxy$1.forEach(function (method) {
    props$1[method] = function (name) {
      var _getCollection;

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return (_getCollection = this.getCollection(name))[method].apply(_getCollection, args);
    };
  });

  /**
   * The `DataStore` class is an extension of {@link Container}. Not only does
   * `DataStore` manage mappers, but also collections. `DataStore` implements the
   * asynchronous {@link Mapper} methods, such as {@link Mapper#find} and
   * {@link Mapper#create}. If you use the asynchronous `DataStore` methods
   * instead of calling them directly on the mappers, then the results of the
   * method calls will be inserted into the store's collections. You can think of
   * a `DataStore` as an [Identity Map](https://en.wikipedia.org/wiki/Identity_map_pattern)
   * for the [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)
   * (the Mappers).
   *
   * ```javascript
   * import {DataStore} from 'js-data'
   * ```
   *
   * @example
   * import {DataStore} from 'js-data'
   * import HttpAdapter from 'js-data-http'
   * const store = new DataStore()
   * const UserMapper = store.defineMapper('user')
   *
   * // Call "find" on "UserMapper" (Stateless ORM)
   * UserMapper.find(1).then(function (user) {
   *   // retrieved a "user" record via the http adapter, but that's it
   *
   *   // Call "find" on "store" for the "user" mapper (Stateful DataStore)
   *   return store.find('user', 1)
   * }).then(function (user) {
   *   // not only was a "user" record retrieved, but it was added to the
   *   // store's "user" collection
   *   const cachedUser = store.getCollection('user').get(1)
   *   user === cachedUser // true
   * })
   *
   * @class DataStore
   * @extends Container
   * @param {Object} [opts] Configuration options. See {@link Container}.
   * @return {DataStore}
   */
  var DataStore = Container.extend(props$1);

  /**
   * Registered as `js-data` in NPM and Bower.
   * #### Script tag
   * ```js
   * window.JSData
   * ```
   * #### CommonJS
   * ```js
   * var JSData = require('js-data')
   * ```
   * #### ES6 Modules
   * ```js
   * import JSData from 'js-data'
   * ```
   * #### AMD
   * ```js
   * define('myApp', ['js-data'], function (JSData) { ... })
   * ```
   *
   * @module js-data
   */

  /**
   * Details of the current version of the `js-data` module.
   *
   * @name version
   * @memberof module:js-data
   * @type {Object}
   * @property {string} full The full semver value.
   * @property {number} major The major version number.
   * @property {number} minor The minor version number.
   * @property {number} patch The patch version number.
   * @property {(string|boolean)} alpha The alpha version value, otherwise `false`
   * if the current version is not alpha.
   * @property {(string|boolean)} beta The beta version value, otherwise `false`
   * if the current version is not beta.
   */
  var version = {
    alpha: '22',
    beta: 'false',
    full: '3.0.0-alpha.22',
    major: parseInt('3', 10),
    minor: parseInt('0', 10),
    patch: parseInt('0', 10)
  };

  exports.version = version;
  exports.Collection = Collection;
  exports.Component = Component;
  exports.Container = Container;
  exports.DataStore = DataStore;
  exports.LinkedCollection = LinkedCollection;
  exports.Mapper = Mapper;
  exports.Query = Query;
  exports.Record = Record;
  exports.Schema = Schema;
  exports.utils = utils$1;
  exports.belongsToType = belongsToType;
  exports.hasManyType = hasManyType;
  exports.hasOneType = hasOneType;
  exports.belongsTo = _belongsTo;
  exports.hasMany = _hasMany;
  exports.hasOne = _hasOne;

}));
//# sourceMappingURL=js-data.js.map