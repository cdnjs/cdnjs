/*!
* js-data
* @version 3.0.0-beta.4 - Homepage <http://www.js-data.io/>
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
   * Utility methods used by JSData.
   *
   * @example
   * import {utils} from 'js-data'
   * console.log(utils.isString('foo')) // true
   *
   * @namespace utils
   * @type {Object}
   */

  var DOMAIN = 'utils';

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

  var ERRORS = {
    '400': function _() {
      return 'expected: ' + arguments[0] + ', found: ' + (arguments[2] ? arguments[1] : babelHelpers.typeof(arguments[1]));
    },
    '404': function _() {
      return arguments[0] + ' not found';
    }
  };

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
     * Reference to the Promise constructor used by JSData. Defaults to
     * `window.Promise` or `global.Promise`.
     *
     * @example <caption>Make JSData use a different `Promise` constructor</caption>
     * import Promise from 'bluebird'
     * import {utils} from 'js-data'
     * utils.Promise = Promise
     *
     * @name utils.Promise
     * @since 3.0.0
     * @type {Function}
     */
    Promise: Promise,

    /**
     * Shallow copy properties that meet the following criteria from `src` to
     * `dest`:
     *
     * - own enumerable
     * - not a function
     * - does not start with "_"
     *
     * @name utils._
     * @param {Object} dest Destination object.
     * @param {Object} src Source object.
     * @private
     * @since 3.0.0
     */
    _: function _(dest, src) {
      utils.forOwn(src, function (value, key) {
        if (key && utils.isUndefined(dest[key]) && !utils.isFunction(value) && key.indexOf('_') !== 0) {
          dest[key] = value;
        }
      });
    },


    /**
     * TODO
     *
     * @name utils._forRelation
     * @private
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
     * @name utils._getIndex
     * @private
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
     * Define hidden (non-enumerable), writable properties on `target` from the
     * provided `props`.
     *
     * @name utils.addHiddenPropsToTarget
     * @param {Object} target That to which `props` should be added.
     * @param {Object} props Properties to be added to `target`.
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
        throw utils.err('' + ctor.name)(500, 'Cannot call a class as a function');
      }
    },


    /**
     * Deep copy a value.
     *
     * @ignore
     * @param {*} from Value to deep copy.
     * @returns {*} Deep copy of `from`.
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
          throw utils.err(DOMAIN + '.copy')(500, 'Cannot copy! Source and destination are identical.');
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
     * @returns {Object} Diff.
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
     */
    equal: function equal(a, b) {
      return a == b; // eslint-disable-line
    },


    /**
     * TODO
     */
    err: function err(domain, target) {
      return function (code) {
        var prefix = '[' + domain + ':' + target + '] ';
        var message = ERRORS[code].apply(null, Array.prototype.slice.call(arguments, 1));
        message = '' + prefix + message + '\nhttp://www.js-data.io/v3.0/docs/errors#' + code;
        return new Error(message);
      };
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
    eventify: function eventify(target, getter, setter) {
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

          superClass.apply(this, args);
        };
      }

      // Setup inheritance of instance members
      _subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          configurable: true,
          enumerable: false,
          value: _subClass,
          writable: true
        }
      });

      var obj = Object;
      // Setup inheritance of static members
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
      return dest;
    },


    /**
     * Find the index of something according to the given checker function.
     *
     * @ignore
     * @param {Array} array The array to search.
     * @param {Function} fn Checker function.
     * @param {number} Index if found or -1 if not found.
     */
    findIndex: function findIndex(array, fn) {
      var index = -1;
      if (!array) {
        return index;
      }
      array.forEach(function (record, i) {
        if (fn(record)) {
          index = i;
          return false;
        }
      });
      return index;
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
     * @returns {Object} Parsed object.
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
     * @returns {Array} Array of elements common to both arrays.
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
     * @returns {boolean} Whether `prop` was matched.
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
    noDupeAdd: function noDupeAdd(array, record, fn) {
      if (!array) {
        return;
      }
      var index = this.findIndex(array, fn);
      if (index < 0) {
        array.push(record);
      }
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
     * Proxy for `Promise.reject`.
     *
     * @ignore
     * @param {*} [value] Value with which to reject the Promise.
     * @returns {Promise} Promise reject with `value`.
     */
    reject: function reject(value) {
      return utils.Promise.reject(value);
    },


    /**
     * TODO
     *
     * @ignore
     */
    remove: function remove(array, fn) {
      if (!array || !array.length) {
        return;
      }
      var index = this.findIndex(array, fn);
      if (index >= 0) {
        array.splice(index, 1);
      }
    },


    /**
     * Proxy for `Promise.resolve`.
     *
     * @ignore
     * @param {*} [value] Value with which to resolve the Promise.
     * @returns {Promise} Promise resolved with `value`.
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
     * @returns {string} JSON string.
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

  /**
   * @class Component
   */
  function Component() {
    /**
     * Event listeners attached to this Component. __Do not modify.__ Use
     * {@link Component#on} and {@link Component#off} instead.
     *
     * @name Component#_listeners
     * @instance
     * @since 3.0.0
     * @type {Object}
     */
    Object.defineProperty(this, '_listeners', { value: {} });
  }

  /**
   * Create a subclass of this component.
   *
   * @method Component.extend
   * @static
   * @param {Object} [props={}] Properties to add to the prototype of the
   * subclass.
   * @param {Object} [classProps={}] Static properties to add to the subclass.
   * @returns {Constructor} Subclass of this component.
   * @since 3.0.0
   */
  Component.extend = utils$1.extend;

  /**
   * Log the provided values at the "debug" level.
   *
   * @method Component#dbg
   * @param {...*} [args] Values to log.
   * @since 3.0.0
   */
  /**
   * Log the provided values. By default sends values to `console[level]`.
   *
   * @method Component#log
   * @param {string} level Log level
   * @param {...*} [args] Values to log.
   * @since 3.0.0
   */
  utils$1.logify(Component.prototype);

  /**
   * Register a new event listener on this Component.
   *
   * @example <caption>Listen for all "afterCreate" events in a DataStore</caption>
   * store.on('afterCreate', (mapperName, props, opts, result) => {
   *   console.log(mapperName) // "post"
   *   console.log(props.id) // undefined
   *   console.log(result.id) // 1234
   * })
   * store.create('post', { title: 'Modeling your data' }).then((post) => {
   *   console.log(post.id) // 1234
   * })
   *
   * @example <caption>Listen for the "add" event on a collection</caption>
   * collection.on('add', (records) => {
   *   console.log(records) // [...]
   * })
   *
   * @example <caption>Listen for "change" events on a record</caption>
   * post.on('change', (record, changes) => {
   *   console.log(changes) // { changed: { title: 'Modeling your data' } }
   * })
   * post.title = 'Modeling your data'
   *
   * @method Component#on
   * @param {string} event Name of event to subsribe to.
   * @param {Function} listener Listener function to handle the event.
   * @param {*} [ctx] Optional content in which to invoke the listener.
   * @since 3.0.0
   */
  /**
   * Remove an event listener from this Component. If no listener is provided,
   * then all listeners for the specified event will be removed. If no event is
   * specified then all listeners for all events will be removed.
   *
   * @example <caption>Remove a listener to a single event</caption>
   * collection.off('add', handler)
   *
   * @example <caption>Remove all listeners to a single event</caption>
   * record.off('change')
   *
   * @example <caption>Remove all listeners to all events</caption>
   * store.off()
   *
   * @method Component#off
   * @param {string} [event] Name of event to unsubsribe to.
   * @param {Function} [listener] Listener to remove.
   * @since 3.0.0
   */
  /**
   * Trigger an event on this Component.
   *
   * @example
   * collection.on('foo', (msg) => {
   *   console.log(msg) // "bar"
   * })
   * collection.emit('foo', 'bar')
   *
   * @example
   * store.on('foo', (msg, val1, val2) => {
   *   console.log(msg, val1, val2) // "bar" "beep" "boop"
   * })
   * store.emit('foo', 'bar', 'beep', 'boop')
   *
   * @method Component#emit
   * @param {string} event Name of event to emit.
   * @param {...*} [args] Arguments to pass to any listeners.
   * @since 3.0.0
   */
  utils$1.eventify(Component.prototype, function () {
    return this._listeners;
  }, function (value) {
    this._listeners = value;
  });

  var DOMAIN$2 = 'Query';
  var INDEX_ERR = 'Index inaccessible after first operation';

  // Reserved words used by JSData's Query Syntax
  var reserved = {
    limit: '',
    offset: '',
    orderBy: '',
    skip: '',
    sort: '',
    where: ''
  };

  // Used by our JavaScript implementation of the LIKE operator
  var escapeRegExp = /([.*+?^=!:${}()|[\]\/\\])/g;
  var percentRegExp = /%/g;
  var underscoreRegExp = /_/g;
  var escape = function escape(pattern) {
    return pattern.replace(escapeRegExp, '\\$1');
  };

  /**
   * A class used by the {@link Collection} class to build queries to be executed
   * against the collection's data. An instance of `Query` is returned by
   * {@link Collection#query}. Query instances are typically short-lived, and you
   * shouldn't have to create them yourself. Just use {@link Collection#query}.
   *
   * ```javascript
   * import {Query} from 'js-data'
   * ```
   *
   * @example
   * const posts = store.query('post').filter({ status: 'draft' }).limit(2).run()
   *
   * @class Query
   * @extends Component
   * @param {Collection} collection The collection on which this query operates.
   * @since 3.0.0
   */
  var Query = Component.extend({
    constructor: function Query(collection) {
      var self = this;
      utils$1.classCallCheck(self, Query);

      /**
       * The {@link Collection} on which this query operates.
       *
       * @name Query#collection
       * @since 3.0.0
       * @type {Collection}
       */
      self.collection = collection;

      /**
       * The current data result of this query.
       *
       * @name Query#data
       * @since 3.0.0
       * @type {Array}
       */
      self.data = null;
    },

    /**
     * Find all entities between two boundaries.
     *
     * @example <caption>Get the users ages 18 to 30.</caption>
     * const users = query.between(18, 30, { index: 'age' }).run()
     *
     * @example <caption>Same as above.</caption>
     * const users = query.between([18], [30], { index: 'age' }).run()
     *
     * @method Query#between
     * @param {Array} leftKeys Keys defining the left boundary.
     * @param {Array} rightKeys Keys defining the right boundary.
     * @param {Object} [opts] Configuration options.
     * @param {string} [opts.index] Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @param {boolean} [opts.leftInclusive=true] Whether to include entities
     * on the left boundary.
     * @param {boolean} [opts.rightInclusive=false] Whether to include entities
     * on the left boundary.
     * @param {boolean} [opts.limit] Limit the result to a certain number.
     * @param {boolean} [opts.offset] The number of resulting entities to skip.
     * @returns {Query} A reference to itself for chaining.
     * @since 3.0.0
     */
    between: function between(leftKeys, rightKeys, opts) {
      var self = this;
      opts || (opts = {});
      if (self.data) {
        throw utils$1.err(DOMAIN$2 + '#between')(500, 'Cannot access index');
      }
      self.data = self.collection.getIndex(opts.index).between(leftKeys, rightKeys, opts);
      return self;
    },


    /**
     * The comparison function used by the {@link Query} class.
     *
     * @method Query#compare
     * @param {Array} orderBy An orderBy clause used for sorting and sub-sorting.
     * @param {number} index The index of the current orderBy clause being used.
     * @param {*} a The first item in the comparison.
     * @param {*} b The second item in the comparison.
     * @returns {number} -1 if `b` should preceed `a`. 0 if `a` and `b` are equal.
     * 1 if `a` should preceed `b`.
     * @since 3.0.0
     */
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
      if (def[1].toUpperCase() === 'DESC') {
        var temp = cB;
        cB = cA;
        cA = temp;
      }
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
    },


    /**
     * Predicate evaluation function used by the {@link Query} class.
     *
     * @method Query#evaluate
     * @param {*} value The value to evaluate.
     * @param {string} op The operator to use in this evaluation.
     * @param {*} predicate The predicate to use in this evaluation.
     * @returns {boolean} Whether the value passed the evaluation or not.
     * @since 3.0.0
     */
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
     * Find the record or records that match the provided query or are accepted by
     * the provided filter function.
     *
     * @example <caption>Get the draft posts created less than three months</caption>
     * const posts = query.filter({
     *   where: {
     *     status: {
     *       '==': 'draft'
     *     },
     *     created_at_timestamp: {
     *       '>=': (new Date().getTime() (1000 * 60 * 60 * 24 * 30 * 3)) // 3 months ago
     *     }
     *   }
     * }).run()
     *
     * @example <caption>Use a custom filter function</caption>
     * const posts = query.filter(function (post) {
     *   return post.isReady()
     * }).run()
     *
     * @method Query#filter
     * @param {(Object|Function)} [queryOrFn={}] Selection query or filter
     * function.
     * @param {Function} [thisArg] Context to which to bind `queryOrFn` if
     * `queryOrFn` is a function.
     * @returns {Query} A reference to itself for chaining.
     * @since 3.0.0
     */
    filter: function filter(query, thisArg) {
      var self = this;

      /**
       * Selection query as defined by JSData's [Query Syntax][querysyntax].
       *
       * [querysyntax]: http://www.js-data.io/v3.0/docs/query-syntax
       *
       * @example <caption>Empty "findAll" query</caption>
       * store.findAll('post').then((posts) => {
       *   console.log(posts) // [...]
       * })
       *
       * @example <caption>Empty "filter" query</caption>
       * const posts = store.filter('post')
       * console.log(posts) // [...]
       *
       * @example <caption>Complex "findAll" query</caption>
       * const PAGE_SIZE = 10
       * let currentPage = 3
       *
       * // Retrieve a filtered page of blog posts
       * store.findAll('post', {
       *   where: {
       *     status: {
       *       // WHERE status = 'published'
       *       '==': 'published'
       *     },
       *     author: {
       *       // AND author IN ('bob', 'alice')
       *       'in': ['bob', 'alice'],
       *       // OR author IN ('karen')
       *       '|in': ['karen']
       *     }
       *   },
       *   orderBy: [
       *     // ORDER BY date_published DESC,
       *     ['date_published', 'DESC'],
       *     // ORDER BY title ASC
       *     ['title', 'ASC']
       *   ],
       *   // LIMIT 10
       *   limit: PAGE_SIZE,
       *   // SKIP 20
       *   offset: PAGE_SIZE * (currentPage 1)
       * }).then((posts) => {
       *   console.log(posts) // [...]
       * })
       *
       * @namespace query
       * @property {number} [limit] See {@link query.limit}.
       * @property {number} [offset] See {@link query.offset}.
       * @property {string|Array[]} [orderBy] See {@link query.orderBy}.
       * @property {number} [skip] Alias for {@link query.offset}.
       * @property {string|Array[]} [sort] Alias for {@link query.orderBy}.
       * @property {Object} [where] See {@link query.where}.
       * @since 3.0.0
       * @tutorial ["http://www.js-data.io/v3.0/docs/query-syntax","JSData's Query Syntax"]
       */
      query || (query = {});
      self.getData();
      if (utils$1.isObject(query)) {
        (function () {
          var where = {};

          /**
           * Filtering criteria. Records that do not meet this criteria will be exluded
           * from the result.
           *
           * @example
           * TODO
           *
           * @name query.where
           * @type {Object}
           * @see http://www.js-data.io/v3.0/docs/query-syntax
           * @since 3.0.0
           */
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

          /**
           * Determines how records should be ordered in the result.
           *
           * @example
           * TODO
           *
           * @name query.orderBy
           * @type {string|Array[]}
           * @see http://www.js-data.io/v3.0/docs/query-syntax
           * @since 3.0.0
           */
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

          /**
           * Number of records to skip.
           *
           * @example <caption>Retrieve the first "page" of blog posts</caption>
           * const PAGE_SIZE = 10
           * let currentPage = 1
           * PostService.findAll({
           *   offset: PAGE_SIZE * (currentPage 1)
           *   limit: PAGE_SIZE
           * })
           *
           * @name query.offset
           * @type {number}
           * @see http://www.js-data.io/v3.0/docs/query-syntax
           * @since 3.0.0
           */
          if (utils$1.isNumber(query.skip)) {
            self.skip(query.skip);
          } else if (utils$1.isNumber(query.offset)) {
            self.skip(query.offset);
          }

          /**
           * Maximum number of records to retrieve.
           *
           * @example <caption>Retrieve the first "page" of blog posts</caption>
           * const PAGE_SIZE = 10
           * let currentPage = 1
           * PostService.findAll({
           *   offset: PAGE_SIZE * (currentPage 1)
           *   limit: PAGE_SIZE
           * })
           *
           * @name query.limit
           * @type {number}
           * @see http://www.js-data.io/v3.0/docs/query-syntax
           * @since 3.0.0
           */
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
     * @method Query#forEach
     * @param {Function} forEachFn Iteration function.
     * @param {*} [thisArg] Context to which to bind `forEachFn`.
     * @returns {Query} A reference to itself for chaining.
     * @since 3.0.0
     */
    forEach: function forEach(forEachFn, thisArg) {
      this.getData().forEach(forEachFn, thisArg);
      return this;
    },


    /**
     * Find the entity or entities that match the provided key.
     *
     * @example <caption>Get the entity whose primary key is 25.</caption>
     * const entities = query.get(25).run()
     *
     * @example <caption>Same as above.</caption>
     * const entities = query.get([25]).run()
     *
     * @example <caption>Get all users who are active and have the "admin" role.</caption>
     * const activeAdmins = query.get(['active', 'admin'], {
     *   index: 'activityAndRoles'
     * }).run()
     *
     * @example <caption>Get all entities that match a certain weather condition.</caption>
     * const niceDays = query.get(['sunny', 'humid', 'calm'], {
     *   index: 'weatherConditions'
     * }).run()
     *
     * @method Query#get
     * @param {Array} keyList Key(s) defining the entity to retrieve. If
     * `keyList` is not an array (i.e. for a single-value key), it will be
     * wrapped in an array.
     * @param {Object} [opts] Configuration options.
     * @param {string} [opts.string] Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @returns {Query} A reference to itself for chaining.
     * @since 3.0.0
     */
    get: function get(keyList, opts) {
      var self = this;
      keyList || (keyList = []);
      opts || (opts = {});
      if (self.data) {
        throw utils$1.err(DOMAIN$2 + '#get')(500, INDEX_ERR);
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
     * @example <caption>Get the posts where "status" is "draft" or "inReview".</caption>
     * const posts = query.getAll('draft', 'inReview', { index: 'status' }).run()
     *
     * @example <caption>Same as above.</caption>
     * const posts = query.getAll(['draft'], ['inReview'], { index: 'status' }).run()
     *
     * @method Query#getAll
     * @param {...Array} [keyList] Provide one or more keyLists, and all
     * entities matching each keyList will be retrieved. If no keyLists are
     * provided, all entities will be returned.
     * @param {Object} [opts] Configuration options.
     * @param {string} [opts.index] Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @returns {Query} A reference to itself for chaining.
     * @since 3.0.0
     */
    getAll: function getAll() {
      var self = this;
      var opts = {};
      if (self.data) {
        throw utils$1.err(DOMAIN$2 + '#getAll')(500, INDEX_ERR);
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
     *
     * @method Query#getData
     * @returns {Array} The data in this query.
     * @since 3.0.0
     */
    getData: function getData() {
      var self = this;
      if (!self.data) {
        self.data = self.collection.index.getAll();
      }
      return self.data;
    },


    /**
     * Implementation used by the `like` operator. Takes a pattern and flags and
     * returns a `RegExp` instance that can test strings.
     *
     * @method Query#like
     * @param {string} pattern Testing pattern.
     * @param {string} flags Flags for the regular expression.
     * @returns {RegExp} Regular expression for testing strings.
     * @since 3.0.0
     */
    like: function like(pattern, flags) {
      return new RegExp('^' + escape(pattern).replace(percentRegExp, '.*').replace(underscoreRegExp, '.') + '$', flags);
    },


    /**
     * Limit the result.
     *
     * @example <caption>Get only the first 10 draft posts.</caption>
     * const posts = query.get('draft', { index: 'status' }).limit(10).run()
     *
     * @method Query#limit
     * @param {number} num The maximum number of entities to keep in the result.
     * @returns {Query} A reference to itself for chaining.
     * @since 3.0.0
     */
    limit: function limit(num) {
      if (!utils$1.isNumber(num)) {
        throw utils$1.err(DOMAIN$2 + '#limit', 'num')(400, 'number', num);
      }
      var data = this.getData();
      this.data = data.slice(0, Math.min(data.length, num));
      return this;
    },


    /**
     * Apply a mapping function to the result data.
     *
     * @example
     * const ages = UserCollection.query().map((user) => {
     *   return user.age
     * }).run()
     *
     * @method Query#map
     * @param {Function} mapFn Mapping function.
     * @param {*} [thisArg] Context to which to bind `mapFn`.
     * @returns {Query} A reference to itself for chaining.
     * @since 3.0.0
     */
    map: function map(mapFn, thisArg) {
      this.data = this.getData().map(mapFn, thisArg);
      return this;
    },


    /**
     * Return the result of calling the specified function on each item in this
     * collection's main index.
     *
     * @example
     * const stringAges = UserCollection.query().mapCall('toString').run()
     *
     * @method Query#mapCall
     * @param {string} funcName Name of function to call
     * @parama {...*} [args] Remaining arguments to be passed to the function.
     * @returns {Query} A reference to itself for chaining.
     * @since 3.0.0
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
     * @method Query#run
     * @returns {Array} The result of executing this query.
     * @since 3.0.0
     */
    run: function run() {
      var data = this.data;
      this.data = null;
      return data;
    },


    /**
     * Skip a number of results.
     *
     * @example <caption>Get all but the first 10 draft posts.</caption>
     * const posts = query.get('draft', { index: 'status' }).skip(10).run()
     *
     * @method Query#skip
     * @param {number} num The number of entities to skip.
     * @returns {Query} A reference to itself for chaining.
     * @since 3.0.0
     */
    skip: function skip(num) {
      if (!utils$1.isNumber(num)) {
        throw utils$1.err(DOMAIN$2 + '#skip', 'num')(400, 'number', num);
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
     * The filtering operators supported by {@link Query#filter}, and which are
     * implemented by adapters (for the most part).
     *
     * @example <caption>Variant 1</caption>
     * const publishedPosts = store.filter('post', {
     *   status: 'published',
     *   limit: 2
     * })
     *
     * @example <caption>Variant 2</caption>
     * const publishedPosts = store.filter('post', {
     *   where: {
     *     status: {
     *       '==': 'published'
     *     }
     *   },
     *   limit: 2
     * })
     *
     * @example <caption>Variant 3</caption>
     * const publishedPosts = store.query('post').filter({
     *   status: 'published'
     * }).limit(2).run()
     *
     * @example <caption>Variant 4</caption>
     * const publishedPosts = store.query('post').filter({
     *   where: {
     *     status: {
     *       '==': 'published'
     *     }
     *   }
     * }).limit(2).run()
     *
     * @example <caption>Multiple operators</caption>
     * const myPublishedPosts = store.filter('post', {
     *   where: {
     *     status: {
     *       '==': 'published'
     *     },
     *     user_id: {
     *       '==': currentUser.id
     *     }
     *   }
     * })
     *
     * @name Query.ops
     * @property {Function} == Equality operator.
     * @property {Function} != Inequality operator.
     * @property {Function} > Greater than operator.
     * @property {Function} >= Greater than (inclusive) operator.
     * @property {Function} < Less than operator.
     * @property {Function} <= Less than (inclusive) operator.
     * @property {Function} isectEmpty Operator that asserts that the intersection
     * between two arrays is empty.
     * @property {Function} isectNotEmpty Operator that asserts that the
     * intersection between two arrays is __not__ empty.
     * @property {Function} in Operator that asserts whether a value is in an
     * array.
     * @property {Function} notIn Operator that asserts whether a value is __not__
     * in an array.
     * @property {Function} contains Operator that asserts whether an array
     * contains a value.
     * @property {Function} notContains Operator that asserts whether an array
     * does __not__ contain a value.
     * @since 3.0.0
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

  /**
   * Create a subclass of this Query.
   *
   * @example <caption>Extend the class in a cross-browser manner.</caption>
   * import {Query} from 'js-data'
   * const CustomQueryClass = Query.extend({
   *   foo () { return 'bar' }
   * })
   * const customQuery = new CustomQueryClass({ name: 'test' })
   * console.log(customQuery.foo()) // "bar"
   *
   * @example <caption>Extend the class using ES2015 class syntax.</caption>
   * class CustomQueryClass extends Query {
   *   foo () { return 'bar' }
   * }
   * const customQuery = new CustomQueryClass({ name: 'test' })
   * console.log(customQuery.foo()) // "bar"
   *
   * @method Query.extend
   * @param {Object} [props={}] Properties to add to the prototype of the
   * subclass.
   * @param {Object} [classProps={}] Static properties to add to the subclass.
   * @returns {Constructor} Subclass of this Query.
   * @since 3.0.0
   */

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

  var DOMAIN$1 = 'Collection';

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
    onConflict: 'merge'
  };

  /**
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
   * @type {Function}
   * @param {Array} [records] Initial set of records to insert into the
   * collection.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.idAttribute] See {@link Collection#idAttribute}.
   * @param {string} [opts.onConflict="merge"] See {@link Collection#onConflict}.
   * @param {string} [opts.mapper] See {@link Collection#mapper}.
   */
  var Collection = Component.extend({
    constructor: function Collection(records, opts) {
      var self = this;
      utils$1.classCallCheck(self, Collection);
      Collection.__super__.call(self);

      if (records && !utils$1.isArray(records)) {
        opts = records;
        records = [];
      }
      if (utils$1.isString(opts)) {
        opts = { idAttribute: opts };
      }

      // Default values for arguments
      records || (records = []);
      opts || (opts = {});

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
      Object.defineProperties(self, {
        mapper: {
          value: undefined,
          writable: true
        },
        queryClass: {
          value: undefined,
          writable: true
        }
      });

      // Apply user-provided configuration
      utils$1.fillIn(self, opts);
      // Fill in any missing options with the defaults
      utils$1.fillIn(self, utils$1.copy(COLLECTION_DEFAULTS));

      if (!self.queryClass) {
        self.queryClass = Query;
      }

      var idAttribute = self.recordId();

      Object.defineProperties(self, {
        /**
         * The main index, which uses @{link Collection#recordId} as the key.
         *
         * @name Collection#index
         * @type {Index}
         */
        index: {
          value: new Index([idAttribute], {
            hashCode: function hashCode(obj) {
              return utils$1.get(obj, idAttribute);
            }
          })
        },

        /**
         * Object that holds the secondary indexes of this collection.
         *
         * @name Collection#indexes
         * @type {Object.<string, Index>}
         */
        indexes: {
          value: {}
        }
      });

      // Insert initial data into the collection
      if (records) {
        self.add(records);
      }
    },

    /**
     * Used to bind to events emitted by records in this Collection.
     *
     * @method Collection#_onRecordEvent
     * @since 3.0.0
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
     * @method Collection#add
     * @since 3.0.0
     * @param {(Object|Object[]|Record|Record[])} data The record or records to insert.
     * @param {Object} [opts] Configuration options.
     * @param {string} [opts.onConflict] What to do when a record is already in
     * the collection. Possible values are `merge` or `replace`.
     * @returns {(Object|Object[]|Record|Record[])} The added record or records.
     */
    add: function add(records, opts) {
      var self = this;

      // Default values for arguments
      opts || (opts = {});

      // Fill in "opts" with the Collection's configuration
      utils$1._(opts, self);
      records = self.beforeAdd(records, opts) || records;

      // Track whether just one record or an array of records is being inserted
      var singular = false;
      var idAttribute = self.recordId();
      if (!utils$1.isArray(records)) {
        if (utils$1.isObject(records)) {
          records = [records];
          singular = true;
        } else {
          throw utils$1.err(DOMAIN$1 + '#add', 'records')(400, 'object or array', records);
        }
      }

      // Map the provided records to existing records.
      // New records will be inserted. If any records map to existing records,
      // they will be merged into the existing records according to the onConflict
      // option.
      records = records.map(function (record) {
        var id = self.recordId(record);
        if (!utils$1.isSorN(id)) {
          throw utils$1.err(DOMAIN$1 + '#add', 'record.' + idAttribute)(400, 'string or number', id);
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
          } else {
            throw utils$1.err(DOMAIN$1 + '#add', 'opts.onConflict')(400, 'one of (merge, replace)', onConflict, true);
          }
          record = existing;
          // Update all indexes in the collection
          self.updateIndexes(record);
        } else {
          // Here, the currently visted record does not correspond to any record
          // in the collection, so (optionally) instantiate this record and insert
          // it into the collection
          record = self.mapper ? self.mapper.createRecord(record, opts) : record;
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
      var result = singular ? records[0] : records;
      // TODO: Make this more performant (batch events?)
      self.emit('add', result);
      return self.afterAdd(records, opts, result) || result;
    },


    /**
     * Lifecycle hook called by {@link Collection#add}. If this method returns a
     * value then {@link Collection#add} will return that same value.
     *
     * @method Collection#method
     * @since 3.0.0
     * @param {(Object|Object[]|Record|Record[])} result The record or records
     * that were added to this Collection by {@link Collection#add}.
     * @param {Object} opts The `opts` argument passed to {@link Collection#add}.
     */
    afterAdd: function afterAdd() {},


    /**
     * Lifecycle hook called by {@link Collection#remove}. If this method returns
     * a value then {@link Collection#remove} will return that same value.
     *
     * @method Collection#afterRemove
     * @since 3.0.0
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
     * @method Collection#afterRemoveAll
     * @since 3.0.0
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
     * @method Collection#beforeAdd
     * @since 3.0.0
     * @param {(Object|Object[]|Record|Record[])} records The `records` argument passed to {@link Collection#add}.
     * @param {Object} opts The `opts` argument passed to {@link Collection#add}.
     */
    beforeAdd: function beforeAdd() {},


    /**
     * Lifecycle hook called by {@link Collection#remove}.
     *
     * @method Collection#beforeRemove
     * @since 3.0.0
     * @param {(string|number)} id The `id` argument passed to {@link Collection#remove}.
     * @param {Object} opts The `opts` argument passed to {@link Collection#remove}.
     */
    beforeRemove: function beforeRemove() {},


    /**
     * Lifecycle hook called by {@link Collection#removeAll}.
     *
     * @method Collection#beforeRemoveAll
     * @since 3.0.0
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
     * @method Collection#between
     * @since 3.0.0
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
     * @returns {Array} The result.
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
     * @method Collection#createIndex
     * @since 3.0.0
     * @param {string} name - The name of the new secondary index.
     * @param {string[]} [fieldList] - Array of field names to use as the key or
     * compound key of the new secondary index. If no fieldList is provided, then
     * the name will also be the field that is used to index the collection.
     * @returns {Collection} A reference to itself for chaining.
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
     * @method Collection#filter
     * @since 3.0.0
     * @param {(Object|Function)} [queryOrFn={}] - Selection query or filter
     * function.
     * @param {Object} [thisArg] - Context to which to bind `queryOrFn` if
     * `queryOrFn` is a function.
     * @returns {Array} The result.
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
     * @method Collection#forEach
     * @since 3.0.0
     * @param {Function} forEachFn - Iteration function.
     * @param {*} [thisArg] - Context to which to bind `forEachFn`.
     * @returns {Array} The result.
     */
    forEach: function forEach(cb, thisArg) {
      this.index.visitAll(cb, thisArg);
    },


    /**
     * Get the record with the given id.
     *
     * @method Collection#get
     * @since 3.0.0
     * @param {(string|number)} id - The primary key of the record to get.
     * @returns {(Object|Record)} The record with the given id.
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
     * @method Collection#getAll
     * @since 3.0.0
     * @param {...Array} [keyList] - Provide one or more keyLists, and all
     * records matching each keyList will be retrieved. If no keyLists are
     * provided, all records will be returned.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @returns {Array} The result.
     */
    getAll: function getAll() {
      var _query;

      return (_query = this.query()).getAll.apply(_query, arguments).run();
    },


    /**
     * Return the index with the given name. If no name is provided, return the
     * main index. Throws an error if the specified index does not exist.
     *
     * @method Collection#getIndex
     * @since 3.0.0
     * @param {string} [name] The name of the index to retrieve.
     */
    getIndex: function getIndex(name) {
      var index = name ? this.indexes[name] : this.index;
      if (!index) {
        throw utils$1.err(DOMAIN$1 + '#getIndex', name)(404, 'index');
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
     * @method Collection#limit
     * @since 3.0.0
     * @param {number} num - The maximum number of records to keep in the result.
     * @returns {Array} The result.
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
     * @method Collection#map
     * @since 3.0.0
     * @param {Function} mapFn - Mapping function.
     * @param {*} [thisArg] - Context to which to bind `mapFn`.
     * @returns {Array} The result of the mapping.
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
     * @method Collection#mapCall
     * @since 3.0.0
     * @param {string} funcName - Name of function to call
     * @parama {...*} [args] - Remaining arguments to be passed to the function.
     * @returns {Array} The result.
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
     * @method Collection#recordId
     * @since 3.0.0
     * @param {(Object|Record)} [record] The record whose primary key is to be
     * returned.
     * @returns {(string|number)} Primary key or name of field that holds primary
     * key.
     */
    recordId: function recordId(record) {
      var self = this;
      if (record) {
        return utils$1.get(record, self.recordId());
      }
      return self.mapper ? self.mapper.idAttribute : self.idAttribute;
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
     * @method Collection#query
     * @since 3.0.0
     * @returns {Query} New query object.
     */
    query: function query() {
      var Ctor = this.queryClass;
      return new Ctor(this);
    },


    /**
     * Reduce the data in the collection to a single value and return the result.
     *
     * @example
     * const totalVotes = collection.reduce(function (prev, record) {
     *   return prev + record.upVotes + record.downVotes
     * }, 0)
     *
     * @method Collection#reduce
     * @since 3.0.0
     * @param {Function} cb - Reduction callback.
     * @param {*} initialValue - Initial value of the reduction.
     * @returns {*} The result.
     */
    reduce: function reduce(cb, initialValue) {
      var data = this.getAll();
      return data.reduce(cb, initialValue);
    },


    /**
     * Remove the record with the given id from this Collection.
     *
     * @method Collection#remove
     * @since 3.0.0
     * @param {(string|number)} id - The primary key of the record to be removed.
     * @param {Object} [opts] - Configuration options.
     * @returns {Object|Record} The removed record, if any.
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
     * @method Collection#removeAll
     * @since 3.0.0
     * @param {Object} [query={}] - Selection query.
     * @param {Object} [query.where] - Filtering criteria.
     * @param {number} [query.skip] - Number to skip.
     * @param {number} [query.limit] - Number to limit to.
     * @param {Array} [query.orderBy] - Sorting criteria.
     * @param {Object} [opts] - Configuration options.
     * @returns {(Object[]|Record[])} The removed records, if any.
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
     * @method Collection#skip
     * @since 3.0.0
     * @param {number} num - The number of records to skip.
     * @returns {Array} The result.
     */
    skip: function skip(num) {
      return this.query().skip(num).run();
    },


    /**
     * Return the plain JSON representation of all items in this collection.
     * Assumes records in this collection have a toJSON method.
     *
     * @method Collection#toJSON
     * @since 3.0.0
     * @param {Object} [opts] - Configuration options.
     * @param {string[]} [opts.with] - Array of relation names or relation fields
     * to include in the representation.
     * @returns {Array} The records.
     */
    toJSON: function toJSON(opts) {
      return this.mapCall('toJSON', opts);
    },


    /**
     * Update a record's position in a single index of this collection. See
     * {@link Collection#updateIndexes} to update a record's position in all
     * indexes at once.
     *
     * @method Collection#updateIndex
     * @since 3.0.0
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
     * @method Collection#updateIndexes
     * @since 3.0.0
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

  var DOMAIN$4 = 'Relation';

  function Relation(related, opts) {
    var self = this;
    var DOMAIN_ERR = 'new ' + DOMAIN$4;

    opts || (opts = {});

    var localField = opts.localField;
    if (!localField) {
      throw utils$1.err(DOMAIN_ERR, 'opts.localField')(400, 'string', localField);
    }

    var foreignKey = opts.foreignKey = opts.foreignKey || opts.localKey;
    if (!foreignKey && (opts.type === belongsToType || opts.type === hasOneType)) {
      throw utils$1.err(DOMAIN_ERR, 'opts.foreignKey')(400, 'string', foreignKey);
    }
    var localKeys = opts.localKeys;
    var foreignKeys = opts.foreignKeys;
    if (!foreignKey && !localKeys && !foreignKeys && opts.type === hasManyType) {
      throw utils$1.err(DOMAIN_ERR, 'opts.<foreignKey|localKeys|foreignKeys>')(400, 'string', foreignKey);
    }

    if (utils$1.isString(related)) {
      opts.relation = related;
      if (!utils$1.isFunction(opts.getRelation)) {
        throw utils$1.err(DOMAIN_ERR, 'opts.getRelation')(400, 'function', opts.getRelation);
      }
    } else if (related) {
      opts.relation = related.name;
      Object.defineProperty(self, 'relatedMapper', {
        value: related
      });
    } else {
      throw utils$1.err(DOMAIN_ERR, 'related')(400, 'Mapper or string', related);
    }

    Object.defineProperty(self, 'inverse', {
      value: undefined,
      writable: true
    });

    utils$1.fillIn(self, opts);
  }

  utils$1.addHiddenPropsToTarget(Relation.prototype, {
    getRelation: function getRelation() {
      return this.relatedMapper;
    },
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
    },
    getInverse: function getInverse(mapper) {
      var self = this;
      if (self.inverse) {
        return self.inverse;
      }
      self.getRelation().relationList.forEach(function (def) {
        if (def.getRelation() === mapper) {
          if (def.foreignKey && def.foreignKey !== self.foreignKey) {
            return;
          }
          self.inverse = def;
          return false;
        }
      });
      return self.inverse;
    }
  });

  var relatedTo = function relatedTo(mapper, related, opts) {
    opts.name = mapper.name;
    var relation = new Relation(related, opts);
    Object.defineProperty(relation, 'mapper', {
      value: mapper
    });

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
   * @returns {Function} Invocation function, which accepts the target as the only
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
   * @returns {Function} Invocation function, which accepts the target as the only
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
   * @returns {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  var _hasOne = function hasOne(related, opts) {
    opts || (opts = {});
    opts.type = hasOneType;
    return function (target) {
      relatedTo(target, related, opts);
    };
  };

  var DOMAIN$6 = 'Record';

  var superMethod = function superMethod(mapper, name) {
    var store = mapper.datastore;
    if (store && store[name]) {
      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return store[name].apply(store, [mapper.name].concat(args));
      };
    }
    return mapper[name].bind(mapper);
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
          value: function value(key) {
            return utils$1.get(_props, key);
          }
        },
        _set: {
          value: function value(key, _value) {
            return utils$1.set(_props, key, _value);
          }
        },
        _unset: {
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
      var self = this;
      var mapper = self.constructor.mapper;
      if (!mapper) {
        throw utils$1.err(DOMAIN$6 + '#_mapper', '')(404, 'mapper');
      }
      return mapper;
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
     * @name Record#beforeLoadRelations
     * @method
     * @param {string[]} relations TODO
     * @param {Object} opts TODO
     */
    beforeLoadRelations: function beforeLoadRelations() {},


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
      return utils$1.diffObjects(typeof self.toJSON === 'function' ? self.toJSON(opts) : self, self._get('previous'), opts);
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
     * Call {@link Mapper#destroy} using this record's primary key.
     *
     * @name Record#destroy
     * @method
     * @param {Object} [opts] Configuration options passed to {@link Mapper#destroy}.
     * @returns {Promise} The result of calling {@link Mapper#destroy}.
     */
    destroy: function destroy(opts) {
      var self = this;
      opts || (opts = {});
      var mapper = self._mapper();
      return superMethod(mapper, 'destroy')(utils$1.get(self, mapper.idAttribute), opts);
    },


    /**
     * Return the value at the given path for this instance.
     *
     * @name Record#get
     * @method
     * @param {string} key - Path of value to retrieve.
     * @returns {*} Value at path.
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
      return quickHasChanges || utils$1.areDifferent(typeof self.toJSON === 'function' ? self.toJSON(opts) : self, self._get('previous'), opts);
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
      return !self._mapper().validate(self, opts);
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

      // Default values for arguments
      relations || (relations = []);
      if (utils$1.isString(relations)) {
        relations = [relations];
      }
      opts || (opts = {});
      opts.with = relations;

      // Fill in "opts" with the Model's configuration
      utils$1._(opts, mapper);
      opts.adapter = mapper.getAdapterName(opts);

      // beforeLoadRelations lifecycle hook
      op = opts.op = 'beforeLoadRelations';
      return utils$1.resolve(self[op](relations, opts)).then(function () {
        // Now delegate to the adapter
        op = opts.op = 'loadRelations';
        mapper.dbg(op, self, relations, opts);
        var tasks = [];
        var task = void 0;
        utils$1.forEachRelation(mapper, opts, function (def, optsCopy) {
          var relatedMapper = def.getRelation();
          optsCopy.raw = false;
          if (utils$1.isFunction(def.load)) {
            task = def.load(mapper, def, self, opts);
          } else if (def.type === 'hasMany' || def.type === 'hasOne') {
            if (def.foreignKey) {
              task = superMethod(relatedMapper, 'findAll')(babelHelpers.defineProperty({}, def.foreignKey, utils$1.get(self, mapper.idAttribute)), optsCopy).then(function (relatedData) {
                if (def.type === 'hasOne') {
                  return relatedData.length ? relatedData[0] : undefined;
                }
                return relatedData;
              });
            } else if (def.localKeys) {
              task = superMethod(relatedMapper, 'findAll')({
                where: babelHelpers.defineProperty({}, relatedMapper.idAttribute, {
                  'in': utils$1.get(self, def.localKeys)
                })
              });
            } else if (def.foreignKeys) {
              task = superMethod(relatedMapper, 'findAll')({
                where: babelHelpers.defineProperty({}, def.foreignKeys, {
                  'contains': utils$1.get(self, mapper.idAttribute)
                })
              }, opts);
            }
          } else if (def.type === 'belongsTo') {
            var key = utils$1.get(self, def.foreignKey);
            if (utils$1.isSorN(key)) {
              task = superMethod(relatedMapper, 'find')(key, optsCopy);
            }
          }
          if (task) {
            task = task.then(function (relatedData) {
              def.setLocalField(self, relatedData);
            });
            tasks.push(task);
          }
        });
        return Promise.all(tasks);
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
      var previous = self._get('previous');
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
     * Delegates to {@link Mapper#create} or {@link Mapper#update}.
     *
     * @name Record#save
     * @method
     * @param {Object} [opts] Configuration options. See {@link Mapper#create}.
     * @param [opts] Configuration options.
     * @param {boolean} [opts.changesOnly] Equality function. Default uses `===`.
     * @param {Function} [opts.equalsFn] Passed to {@link Record#changes} when
     * `changesOnly` is `true`.
     * @param {Array} [opts.ignore] Passed to {@link Record#changes} when
     * `changesOnly` is `true`.
     * @returns {Promise} The result of calling {@link Mapper#create} or
     * {@link Mapper#update}.
     */
    save: function save(opts) {
      var self = this;
      opts || (opts = {});
      var mapper = self._mapper();
      var id = utils$1.get(self, mapper.idAttribute);
      var props = self;
      if (utils$1.isUndefined(id)) {
        return superMethod(mapper, 'create')(props, opts);
      }
      if (opts.changesOnly) {
        var changes = self.changes(opts);
        props = {};
        utils$1.fillIn(props, changes.added);
        utils$1.fillIn(props, changes.changed);
      }
      return superMethod(mapper, 'update')(id, props, opts);
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
     * @returns {Object} Plain object representation of this record.
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

  var DOMAIN$7 = 'Schema';

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
      throw utils$1.err(DOMAIN$7 + '#validate')(500, 'Invalid schema at path: "' + opts.path + '"');
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
     * @returns {(array|undefined)} Array of errors or `undefined` if valid.
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

  var DOMAIN$5 = 'Mapper';

  var makeNotify = function makeNotify(num) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = this;
      var opts = args[args.length - num];
      self.dbg.apply(self, [opts.op].concat(args));
      if (opts.notify || opts.notify === undefined && self.notify) {
        setTimeout(function () {
          self.emit.apply(self, [opts.op].concat(args));
        });
      }
    };
  };

  // These are the default implementations of all of the lifecycle hooks
  var notify = makeNotify(1);
  var notify2 = makeNotify(2);

  // This object provides meta information used by Mapper#crud to actually
  // execute each lifecycle method
  var LIFECYCLE_METHODS = {
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
  };

  var MAPPER_DEFAULTS = {
    /**
     * Hash of registered adapters. Don't modify directly. Use
     * {@link Mapper#registerAdapter} instead.
     *
     * @default {}
     * @name Mapper#_adapters
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
     */
    _adapters: {},

    /**
     * Whether to augment {@link Mapper#recordClass} with getter/setter property
     * accessors according to the properties defined in {@link Mapper#schema}.
     * This makes possible validation and change tracking on individual properties
     * when using the dot (e.g. `user.name = "Bob"`) operator to modify a
     * property.
     *
     * @default true
     * @name Mapper#applySchema
     * @since 3.0.0
     * @type {boolean}
     */
    applySchema: true,

    /**
     * Whether to enable debug-level logs.
     *
     * @default false
     * @name Mapper#debug
     * @since 3.0.0
     * @type {boolean}
     */
    debug: false,

    /**
     * The name of the registered adapter that this Mapper should used by default.
     *
     * @default "http"
     * @name Mapper#defaultAdapter
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
     * @type {string}
     */
    defaultAdapter: 'http',

    /**
     * The field used as the unique identifier on records handled by this Mapper.
     *
     * @default id
     * @name Mapper#idAttribute
     * @since 3.0.0
     * @type {string}
     */
    idAttribute: 'id',

    /**
     * Whether this Mapper should emit operational events.
     *
     * @default true
     * @name Mapper#notify
     * @since 3.0.0
     * @type {boolean}
     */
    notify: true,

    /**
     * Whether {@link Mapper#create}, {@link Mapper#createMany},
     * {@link Mapper#update}, {@link Mapper#updateAll}, {@link Mapper#updateMany},
     * {@link Mapper#find}, {@link Mapper#findAll}, {@link Mapper#destroy},
     * {@link Mapper#destroyAll}, {@link Mapper#count}, and {@link Mapper#sum}
     * should return a raw result object that contains both the instance data
     * returned by the adapter _and_ metadata about the operation.
     *
     * The default is to NOT return the result object, and instead return just the
     * instance data.
     *
     * @default false
     * @name Mapper#raw
     * @since 3.0.0
     * @type {boolean}
     */
    raw: false
  };

  /**
   * The core of JSData's [ORM/ODM][orm] implementation. Given a minimum amout of
   * meta information about a resource, a Mapper can perform generic CRUD
   * operations against that resource. Apart from its configuration, a Mapper is
   * stateless. The particulars of various persistence layers have been abstracted
   * into adapters, which a Mapper uses to perform its operations.
   *
   * The term "Mapper" comes from the [Data Mapper Pattern][pattern] described in
   * Martin Fowler's [Patterns of Enterprise Application Architecture][book]. A
   * Data Mapper moves data between [in-memory object instances][record] and a
   * relational or document-based database. JSData's Mapper can work with any
   * persistence layer you can write an adapter for.
   *
   * _("Model" is a heavily overloaded term and is avoided in this documentation
   * to prevent confusion.)_
   *
   * [orm]: https://en.wikipedia.org/wiki/Object-relational_mapping
   * [pattern]: https://en.wikipedia.org/wiki/Data_mapper_pattern
   * [book]: http://martinfowler.com/books/eaa.html
   * [record]: Record.html
   *
   * @example <caption>Import and instantiate</caption>
   * import {Mapper} from 'js-data'
   *
   * const UserService = new Mapper({ name: 'user' })
   *
   * @example <caption>Define a Mapper using the Container component</caption>
   * import {Container} from 'js-data'
   *
   * const store = new Container()
   * store.defineMapper('user')
   *
   * @class Mapper
   * @extends Component
   * @param {Object} opts Configuration options.
   * @param {boolean} [opts.applySchema=true] See {@link Mapper#applySchema}.
   * @param {boolean} [opts.debug=false] See {@link Mapper#debug}.
   * @param {string} [opts.defaultAdapter=http] See {@link Mapper#defaultAdapter}.
   * @param {string} [opts.idAttribute=id] See {@link Mapper#idAttribute}.
   * @param {string} opts.name See {@link Mapper#name}.
   * @param {boolean} [opts.notify] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw=false] See {@link Mapper#raw}.
   * @param {Function|boolean} [opts.recordClass] See {@link Mapper#recordClass}.
   * @returns {Mapper} A new {@link Mapper} instance.
   * @see http://www.js-data.io/v3.0/docs/components-of-jsdata#mapper
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/components-of-jsdata#mapper","Components of JSData: Mapper"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/modeling-your-data","Modeling your data"]
   */
  var Mapper = Component.extend({
    constructor: function Mapper(opts) {
      var self = this;
      utils$1.classCallCheck(self, Mapper);
      Mapper.__super__.call(self);
      opts || (opts = {});

      // Prepare certain properties to be non-enumerable
      Object.defineProperties(self, {
        _adapters: {
          value: undefined,
          writable: true
        },

        /**
         * Set to `false` to force the Mapper to work with POJO objects only.
         *
         * @example <caption>Use POJOs only.</caption>
         * import {Mapper, Record} from 'js-data'
         * const UserMapper = new Mapper({ recordClass: false })
         * UserMapper.recordClass // false
         * const user = UserMapper#createRecord()
         * user instanceof Record // false
         *
         * @example <caption>Set to a custom class to have records wrapped in your custom class.</caption>
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
         *
         *
         * @example <caption>Extend the {@link Record} class.</caption>
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
         *
         * @name Mapper#recordClass
         * @default {@link Record}
         * @see Record
         * @since 3.0.0
         */
        recordClass: {
          value: undefined,
          writable: true
        },

        /**
         * The meta information describing this Mapper's available lifecycle
         * methods. __Do not modify.__
         *
         * TODO: Improve documentation.
         *
         * @name Mapper#lifecycleMethods
         * @since 3.0.0
         * @type {Object}
         */
        lifecycleMethods: {
          value: LIFECYCLE_METHODS
        },

        /**
         * This Mapper's {@link Schema}.
         *
         * @name Mapper#schema
         * @see Schema
         * @since 3.0.0
         * @type {Schema}
         */
        schema: {
          value: undefined,
          writable: true
        }
      });

      // Apply user-provided configuration
      utils$1.fillIn(self, opts);
      // Fill in any missing options with the defaults
      utils$1.fillIn(self, utils$1.copy(MAPPER_DEFAULTS));

      /**
       * The name for this Mapper. This is the minimum amount of meta information
       * required for a Mapper to be able to execute CRUD operations for a
       * Resource.
       *
       * @name Mapper#name
       * @since 3.0.0
       * @type {string}
       */
      if (!self.name) {
        throw utils$1.err('new ' + DOMAIN$5, 'opts.name')(400, 'string', self.name);
      }

      // Setup schema, with an empty default schema if necessary
      if (!(self.schema instanceof Schema)) {
        self.schema = new Schema(self.schema || {});
      }

      // Create a subclass of Record that's tied to this Mapper
      if (utils$1.isUndefined(self.recordClass)) {
        (function () {
          var superClass = Record;
          self.recordClass = superClass.extend({
            constructor: function Record() {
              var subClass = function Record(props, opts) {
                utils$1.classCallCheck(this, subClass);
                superClass.call(this, props, opts);
              };
              return subClass;
            }()
          });
        })();
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
     * @method Mapper#afterCount
     * @param {Object} query The `query` argument passed to {@link Mapper#count}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#count}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterCount: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#create}. If this method
     * returns a promise then {@link Mapper#create} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterCreate
     * @param {Object} props The `props` argument passed to {@link Mapper#create}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#create}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterCreate: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#createMany}. If this method
     * returns a promise then {@link Mapper#createMany} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterCreateMany
     * @param {Array} records The `records` argument passed to {@link Mapper#createMany}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#createMany}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterCreateMany: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#destroy}. If this method
     * returns a promise then {@link Mapper#destroy} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterDestroy
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#destroy}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#destroy}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterDestroy: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#destroyAll}. If this method
     * returns a promise then {@link Mapper#destroyAll} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterDestroyAll
     * @param {*} data The `data` returned by the adapter.
     * @param {query} query The `query` argument passed to {@link Mapper#destroyAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#destroyAll}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterDestroyAll: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#find}. If this method
     * returns a promise then {@link Mapper#find} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterFind
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#find}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#find}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterFind: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#findAll}. If this method
     * returns a promise then {@link Mapper#findAll} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterFindAll
     * @param {Object} query The `query` argument passed to {@link Mapper#findAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#findAll}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterFindAll: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#sum}. If this method
     * returns a promise then {@link Mapper#sum} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterSum
     * @param {Object} query The `query` argument passed to {@link Mapper#sum}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#sum}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterSum: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#update}. If this method
     * returns a promise then {@link Mapper#update} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterUpdate
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#update}.
     * @param {props} props The `props` argument passed to {@link Mapper#update}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#update}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterUpdate: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#updateAll}. If this method
     * returns a promise then {@link Mapper#updateAll} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterUpdateAll
     * @param {Object} props The `props` argument passed to {@link Mapper#updateAll}.
     * @param {Object} query The `query` argument passed to {@link Mapper#updateAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#updateAll}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterUpdateAll: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#updateMany}. If this method
     * returns a promise then {@link Mapper#updateMany} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#afterUpdateMany
     * @param {Array} records The `records` argument passed to {@link Mapper#updateMany}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#updateMany}.
     * @param {*} result The result, if any.
     * @since 3.0.0
     */
    afterUpdateMany: notify2,

    /**
     * Mapper lifecycle hook called by {@link Mapper#create}. If this method
     * returns a promise then {@link Mapper#create} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeCreate
     * @param {Object} props The `props` argument passed to {@link Mapper#create}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#create}.
     * @since 3.0.0
     */
    beforeCreate: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#createMany}. If this method
     * returns a promise then {@link Mapper#createMany} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeCreateMany
     * @param {Array} records The `records` argument passed to {@link Mapper#createMany}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#createMany}.
     * @since 3.0.0
     */
    beforeCreateMany: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#count}. If this method
     * returns a promise then {@link Mapper#count} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeCount
     * @param {Object} query The `query` argument passed to {@link Mapper#count}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#count}.
     * @since 3.0.0
     */
    beforeCount: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#destroy}. If this method
     * returns a promise then {@link Mapper#destroy} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeDestroy
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#destroy}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#destroy}.
     * @since 3.0.0
     */
    beforeDestroy: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#destroyAll}. If this method
     * returns a promise then {@link Mapper#destroyAll} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeDestroyAll
     * @param {query} query The `query` argument passed to {@link Mapper#destroyAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#destroyAll}.
     * @since 3.0.0
     */
    beforeDestroyAll: notify,

    /**
     * Mappers lifecycle hook called by {@link Mapper#find}. If this method
     * returns a promise then {@link Mapper#find} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeFind
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#find}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#find}.
     * @since 3.0.0
     */
    beforeFind: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#findAll}. If this method
     * returns a promise then {@link Mapper#findAll} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeFindAll
     * @param {Object} query The `query` argument passed to {@link Mapper#findAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#findAll}.
     * @since 3.0.0
     */
    beforeFindAll: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#sum}. If this method
     * returns a promise then {@link Mapper#sum} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeSum
     * @param {string} field The `field` argument passed to {@link Mapper#sum}.
     * @param {Object} query The `query` argument passed to {@link Mapper#sum}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#sum}.
     * @since 3.0.0
     */
    beforeSum: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#update}. If this method
     * returns a promise then {@link Mapper#update} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeUpdate
     * @param {(string|number)} id The `id` argument passed to {@link Mapper#update}.
     * @param {props} props The `props` argument passed to {@link Mapper#update}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#update}.
     * @since 3.0.0
     */
    beforeUpdate: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#updateAll}. If this method
     * returns a promise then {@link Mapper#updateAll} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeUpdateAll
     * @param {Object} props The `props` argument passed to {@link Mapper#updateAll}.
     * @param {Object} query The `query` argument passed to {@link Mapper#updateAll}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#updateAll}.
     * @since 3.0.0
     */
    beforeUpdateAll: notify,

    /**
     * Mapper lifecycle hook called by {@link Mapper#updateMany}. If this method
     * returns a promise then {@link Mapper#updateMany} will wait for the promise
     * to resolve before continuing.
     *
     * @method Mapper#beforeUpdateMany
     * @param {Array} records The `records` argument passed to {@link Mapper#updateMany}.
     * @param {Object} opts The `opts` argument passed to {@link Mapper#updateMany}.
     * @since 3.0.0
     */
    beforeUpdateMany: notify,

    /**
     * This method is called at the end of most lifecycle methods. It does the
     * following:
     *
     * 1. If `opts.raw` is `true`, add this Mapper's configuration to the `opts`
     * argument as metadata for the operation.
     * 2. Wrap the result data appropriately using {@link Mapper#wrap}, which
     * calls {@link Mapper#createRecord}.
     *
     * @method Mapper#_end
     * @private
     * @since 3.0.0
     */
    _end: function _end(result, opts, skip) {
      var self = this;
      if (opts.raw) {
        utils$1._(result, opts);
      }
      if (skip) {
        return result;
      }
      var _data = opts.raw ? result.data : result;
      if (_data && utils$1.isFunction(self.wrap)) {
        _data = self.wrap(_data, opts);
        if (opts.raw) {
          result.data = _data;
        } else {
          result = _data;
        }
      }
      return result;
    },


    /**
     * Define a belongsTo relationship. Only useful if you're managing your
     * Mappers manually and not using a Container or DataStore component.
     *
     * @example
     * PostService.belongsTo(UserService, {
     *   // post.user_id points to user.id
     *   foreignKey: 'user_id'
     *   // user records will be attached to post records at "post.user"
     *   localField: 'user'
     * })
     *
     * CommentService.belongsTo(UserService, {
     *   // comment.user_id points to user.id
     *   foreignKey: 'user_id'
     *   // user records will be attached to comment records at "comment.user"
     *   localField: 'user'
     * })
     * CommentService.belongsTo(PostService, {
     *   // comment.post_id points to post.id
     *   foreignKey: 'post_id'
     *   // post records will be attached to comment records at "comment.post"
     *   localField: 'post'
     * })
     *
     * @method Mapper#belongsTo
     * @see http://www.js-data.io/v3.0/docs/relations
     * @since 3.0.0
     */
    belongsTo: function belongsTo(relatedMapper, opts) {
      return _belongsTo(relatedMapper, opts)(this);
    },


    /**
     * Select records according to the `query` argument and return the count.
     *
     * {@link Mapper#beforeCount} will be called before calling the adapter.
     * {@link Mapper#afterCount} will be called after calling the adapter.
     *
     * @example <caption>Get the number of published blog posts</caption>
     * PostService.count({ status: 'published' }).then((numPublished) => {
     *   console.log(numPublished) // e.g. 45
     * })
     *
     * @method Mapper#count
     * @param {Object} [query={}] Selection query. See {@link query}.
     * @param {Object} [query.where] See {@link query.where}.
     * @param {number} [query.offset] See {@link query.offset}.
     * @param {number} [query.limit] See {@link query.limit}.
     * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
     * @param {Object} [opts] Configuration options. Refer to the `count` method
     * of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @returns {Promise} Resolves with the count of the selected records.
     * @since 3.0.0
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
     * @example <caption>Create and save a new blog post</caption>
     * PostService.create({
     *   title: 'Modeling your data',
     *   status: 'draft'
     * }).then((post) => {
     *   console.log(post) // { id: 1234, status: 'draft', ... }
     * })
     *
     * @method Mapper#create
     * @param {Object} props The properties for the new record.
     * @param {Object} [opts] Configuration options. Refer to the `create` method
     * of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @param {string[]} [opts.with=[]] Relations to create in a cascading
     * create if `props` contains nested relations. NOT performed in a
     * transaction. Each nested create will result in another {@link Mapper#create}
     * or {@link Mapper#createMany} call.
     * @param {string[]} [opts.pass=[]] Relations to send to the adapter as part
     * of the payload. Normally relations are not sent.
     * @returns {Promise} Resolves with the created record.
     * @since 3.0.0
     */
    create: function create(props, opts) {
      var op = void 0,
          adapter = void 0;
      var self = this;

      // Default values for arguments
      props || (props = {});
      opts || (opts = {});

      // Fill in "opts" with the Mapper's configuration
      utils$1._(opts, self);
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
          var relatedMapper = def.getRelation();
          var relatedIdAttribute = relatedMapper.idAttribute;
          optsCopy.raw = false;
          if (!relationData) {
            return;
          }
          if (def.type === belongsToType) {
            // Create belongsTo relation first because we need a generated id to
            // attach to the child
            tasks.push(relatedMapper.create(relationData, optsCopy).then(function (data) {
              def.setLocalField(belongsToRelationData, data);
              def.setForeignKey(props, data);
            }));
          } else if (def.type === hasManyType && def.localKeys) {
            // Create his hasMany relation first because it uses localKeys
            tasks.push(relatedMapper.createMany(relationData, optsCopy).then(function (data) {
              def.setLocalField(belongsToRelationData, data);
              utils$1.set(props, def.localKeys, data.map(function (record) {
                return utils$1.get(record, relatedIdAttribute);
              }));
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
            optsCopy.raw = false;
            var task = void 0;
            // Create hasMany and hasOne after the main create because we needed
            // a generated id to attach to these items
            if (def.type === hasManyType && def.foreignKey) {
              def.setForeignKey(createdRecord, relationData);
              task = def.getRelation().createMany(relationData, optsCopy).then(function (data) {
                def.setLocalField(createdRecord, data);
              });
            } else if (def.type === hasOneType) {
              def.setForeignKey(createdRecord, relationData);
              task = def.getRelation().create(relationData, optsCopy).then(function (data) {
                def.setLocalField(createdRecord, data);
              });
            } else if (def.type === belongsToType && def.getLocalField(belongsToRelationData)) {
              def.setLocalField(createdRecord, def.getLocalField(belongsToRelationData));
            } else if (def.type === hasManyType && def.localKeys && def.getLocalField(belongsToRelationData)) {
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


    /**
     * Use {@link Mapper#createRecord} instead.
     * @deprecated
     * @method Mapper#createInstance
     * @param {Object|Array} props See {@link Mapper#createRecord}.
     * @param {Object} [opts] See {@link Mapper#createRecord}.
     * @returns {Object|Array} See {@link Mapper#createRecord}.
     * @see Mapper#createRecord
     * @since 3.0.0
     */
    createInstance: function createInstance(props, opts) {
      return this.createRecord(props, opts);
    },


    /**
     * Given an array of records, batch create them via an adapter.
     *
     * {@link Mapper#beforeCreateMany} will be called before calling the adapter.
     * {@link Mapper#afterCreateMany} will be called after calling the adapter.
     *
     * @example <caption>Create and save several new blog posts</caption>
     * PostService.createMany([{
     *   title: 'Modeling your data',
     *   status: 'draft'
     * }, {
     *   title: 'Reading data',
     *   status: 'draft'
     * }]).then((posts) => {
     *   console.log(posts[0]) // { id: 1234, status: 'draft', ... }
     *   console.log(posts[1]) // { id: 1235, status: 'draft', ... }
     * })
     *
     * @method Mapper#createMany
     * @param {Record[]} records Array of records to be created in one batch.
     * @param {Object} [opts] Configuration options. Refer to the `createMany`
     * method of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @param {string[]} [opts.with=[]] Relations to create in a cascading
     * create if `records` contains nested relations. NOT performed in a
     * transaction. Each nested create will result in another {@link Mapper#createMany}
     * call.
     * @param {string[]} [opts.pass=[]] Relations to send to the adapter as part
     * of the payload. Normally relations are not sent.
     * @returns {Promise} Resolves with the created records.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
     */
    createMany: function createMany(records, opts) {
      var op = void 0,
          adapter = void 0;
      var self = this;

      // Default values for arguments
      records || (records = []);
      opts || (opts = {});

      // Fill in "opts" with the Mapper's configuration
      utils$1._(opts, self);
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
     * __Note:__ This method does __not__ interact with any adapter, and does
     * __not__ save any data. It only creates new objects in memory.
     *
     * @example <caption>Create empty unsaved record instance</caption>
     * const post = PostService.createRecord()
     *
     * @example <caption>Create an unsaved record instance with inital properties</caption>
     * const post = PostService.createRecord({
     *   title: 'Modeling your data',
     *   status: 'draft'
     * })
     *
     * @example <caption>Create a record instance that corresponds to a saved record</caption>
     * const post = PostService.createRecord({
     *   // JSData thinks this record has been saved if it has a primary key
     *   id: 1234,
     *   title: 'Modeling your data',
     *   status: 'draft'
     * })
     *
     * @example <caption>Create record instances from an array</caption>
     * const posts = PostService.createRecord([{
     *   title: 'Modeling your data',
     *   status: 'draft'
     * }, {
     *   title: 'Reading data',
     *   status: 'draft'
     * }])
     *
     * @example <caption>Records are validated by default</caption>
     * import {Mapper} from 'js-data'
     * const PostService = new Mapper({
     *   name: 'post',
     *   schema: { properties: { title: { type: 'string' } } }
     * })
     * try {
     *   const post = PostService.createRecord({
     *     title: 1234,
     *   })
     * } catch (err) {
     *   console.log(err.errors) // [{ expected: 'one of (string)', actual: 'number', path: 'title' }]
     * }
     *
     * @example <caption>Skip validation</caption>
     * import {Mapper} from 'js-data'
     * const PostService = new Mapper({
     *   name: 'post',
     *   schema: { properties: { title: { type: 'string' } } }
     * })
     * const post = PostService.createRecord({
     *   title: 1234,
     * }, { noValidate: true })
     * console.log(post.isValid()) // false
     *
     * @method Mapper#createRecord
     * @param {Object|Object[]} props The properties for the Record instance or an
     * array of property objects for the Record instances.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.noValidate=false] Whether to skip validation when
     * the Record instances are created.
     * @returns {Record|Record[]} The Record instance or Record instances.
     * @since 3.0.0
     */
    createRecord: function createRecord(props, opts) {
      props || (props = {});
      var self = this;
      if (utils$1.isArray(props)) {
        return props.map(function (_props) {
          return self.createRecord(_props, opts);
        });
      }
      if (!utils$1.isObject(props)) {
        throw utils$1.err(DOMAIN$5 + '#createRecord', 'props')(400, 'array or object', props);
      }
      var recordClass = self.recordClass;
      var relationList = self.relationList || [];
      relationList.forEach(function (def) {
        var relatedMapper = def.getRelation();
        var relationData = def.getLocalField(props);
        if (relationData && !relatedMapper.is(relationData)) {
          if (utils$1.isArray(relationData) && (!relationData.length || relatedMapper.is(relationData[0]))) {
            return;
          }
          utils$1.set(props, def.localField, relatedMapper.createRecord(relationData, opts));
        }
      });
      // Check to make sure "props" is not already an instance of this Mapper.
      return recordClass ? props instanceof recordClass ? props : new recordClass(props, opts) : props; // eslint-disable-line
    },


    /**
     * Lifecycle invocation method.
     *
     * TODO: Improve documentation for this method.
     *
     * @method Mapper#crud
     * @param {string} method Name of the lifecycle method to invoke.
     * @param {...*} args Arguments to pass to the lifecycle method.
     * @returns {Promise}
     * @since 3.0.0
     */
    crud: function crud(method) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var self = this;
      var config = self.lifecycleMethods[method];
      if (!config) {
        throw utils$1.err(DOMAIN$5 + '#crud', method)(404, 'method');
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
      utils$1._(opts, self);
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
     * Using an adapter, destroy the record with the given primary key.
     *
     * {@link Mapper#beforeDestroy} will be called before destroying the record.
     * {@link Mapper#afterDestroy} will be called after destroying the record.
     *
     * @example <caption>Destroy a specific blog post</caption>
     * PostService.destroy(1234).then(() => {
     *   // Blog post #1234 has been destroyed
     * })
     *
     * @example <caption>Get full response</caption>
     * PostService.destroy(1234, { raw: true }).then((result) => {
     *   console.log(result.deleted) e.g. 1
     *   console.log(...) // etc., more metadata can be found on the result
     * })
     *
     * @method Mapper#destroy
     * @param {(string|number)} id The primary key of the record to destroy.
     * @param {Object} [opts] Configuration options. Refer to the `destroy` method
     * of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @returns {Promise} Resolves when the record has been destroyed. Resolves
     * even if no record was found to be destroyed.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
     */
    destroy: function destroy(id, opts) {
      return this.crud('destroy', id, opts);
    },


    /**
     * Destroy the records selected by `query` via an adapter. If no `query` is
     * provided then all records will be destroyed.
     *
     * {@link Mapper#beforeDestroyAll} will be called before destroying the records.
     * {@link Mapper#afterDestroyAll} will be called after destroying the records.
     *
     * @example <caption>Destroy all blog posts</caption>
     * PostService.destroyAll().then(() => {
     *   // All blog posts have been destroyed
     * })
     *
     * @example <caption>Destroy all "draft" blog posts</caption>
     * PostService.destroyAll({ status: 'draft' }).then(() => {
     *   // All "draft" blog posts have been destroyed
     * })
     *
     * @example <caption>Get full response</caption>
     * const query = null
     * const options = { raw: true }
     * PostService.destroyAll(query, options).then((result) => {
     *   console.log(result.deleted) e.g. 14
     *   console.log(...) // etc., more metadata can be found on the result
     * })
     *
     * @method Mapper#destroyAll
     * @param {Object} [query={}] Selection query. See {@link query}.
     * @param {Object} [query.where] See {@link query.where}.
     * @param {number} [query.offset] See {@link query.offset}.
     * @param {number} [query.limit] See {@link query.limit}.
     * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
     * @param {Object} [opts] Configuration options. Refer to the `destroyAll`
     * method of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @returns {Promise} Resolves when the records have been destroyed. Resolves
     * even if no records were found to be destroyed.
     * @see query
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
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
     * @example
     * PostService.find(1).then((post) => {
     *   console.log(post) // { id: 1, ...}
     * })
     *
     * @example <caption>Get full response</caption>
     * PostService.find(1, { raw: true }).then((result) => {
     *   console.log(result.data) // { id: 1, ...}
     *   console.log(result.found) // 1
     *   console.log(...) // etc., more metadata can be found on the result
     * })
     *
     * @method Mapper#find
     * @param {(string|number)} id The primary key of the record to retrieve.
     * @param {Object} [opts] Configuration options. Refer to the `find` method
     * of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @param {string[]} [opts.with=[]] Relations to eager load in the request.
     * @returns {Promise} Resolves with the found record. Resolves with
     * `undefined` if no record was found.
     * @see http://www.js-data.io/v3.0/docs/reading-data
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/reading-data","Reading data"]
     */
    find: function find(id, opts) {
      return this.crud('find', id, opts);
    },


    /**
     * Using the `query` argument, select records to retrieve via an adapter.
     *
     * {@link Mapper#beforeFindAll} will be called before calling the adapter.
     * {@link Mapper#afterFindAll} will be called after calling the adapter.
     *
     * @example <caption>Find all "published" blog posts</caption>
     * PostService.findAll({ status: 'published' }).then((posts) => {
     *   console.log(posts) // [{ id: 1, status: 'published', ...}, ...]
     * })
     *
     * @example <caption>Get full response</caption>
     * PostService.findAll({ status: 'published' }, { raw: true }).then((result) => {
     *   console.log(result.data) // [{ id: 1, status: 'published', ...}, ...]
     *   console.log(result.found) // e.g. 13
     *   console.log(...) // etc., more metadata can be found on the result
     * })
     *
     * @method Mapper#findAll
     * @param {Object} [query={}] Selection query. See {@link query}.
     * @param {Object} [query.where] See {@link query.where}.
     * @param {number} [query.offset] See {@link query.offset}.
     * @param {number} [query.limit] See {@link query.limit}.
     * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
     * @param {Object} [opts] Configuration options. Refer to the `findAll` method
     * of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @param {string[]} [opts.with=[]] Relations to eager load in the request.
     * @returns {Promise} Resolves with the found records, if any.
     * @see query
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/reading-data","Reading data"]
     */
    findAll: function findAll(query, opts) {
      return this.crud('findAll', query, opts);
    },


    /**
     * Return the registered adapter with the given name or the default adapter if
     * no name is provided.
     *
     * @method Mapper#getAdapter
     * @param {string} [name] The name of the adapter to retrieve.
     * @returns {Adapter} The adapter.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
     */
    getAdapter: function getAdapter(name) {
      var self = this;
      self.dbg('getAdapter', 'name:', name);
      var adapter = self.getAdapterName(name);
      if (!adapter) {
        throw utils$1.err(DOMAIN$5 + '#getAdapter', 'name')(400, 'string', name);
      }
      return self.getAdapters()[adapter];
    },


    /**
     * Return the name of a registered adapter based on the given name or options,
     * or the name of the default adapter if no name provided.
     *
     * @method Mapper#getAdapterName
     * @param {(Object|string)} [opts] The name of an adapter or options, if any.
     * @returns {string} The name of the adapter.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
     */
    getAdapterName: function getAdapterName(opts) {
      opts || (opts = {});
      if (utils$1.isString(opts)) {
        opts = { adapter: opts };
      }
      return opts.adapter || opts.defaultAdapter;
    },


    /**
     * Get the object of registered adapters for this Mapper.
     *
     * @method Mapper#getAdapters
     * @returns {Object} {@link Mapper#_adapters}
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
     */
    getAdapters: function getAdapters() {
      return this._adapters;
    },


    /**
     * Returns this Mapper's {@link Schema}.
     *
     * @method Mapper#getSchema
     * @returns {Schema} This Mapper's {@link Schema}.
     * @see Mapper#schema
     * @since 3.0.0
     */
    getSchema: function getSchema() {
      return this.schema;
    },


    /**
     * Defines a hasMany relationship. Only useful if you're managing your
     * Mappers manually and not using a Container or DataStore component.
     *
     * @example
     * UserService.hasMany(PostService, {
     *   // post.user_id points to user.id
     *   foreignKey: 'user_id'
     *   // post records will be attached to user records at "user.posts"
     *   localField: 'posts'
     * })
     *
     * @method Mapper#hasMany
     * @see http://www.js-data.io/v3.0/docs/relations
     * @since 3.0.0
     */
    hasMany: function hasMany(relatedMapper, opts) {
      return _hasMany(relatedMapper, opts)(this);
    },


    /**
     * Defines a hasOne relationship. Only useful if you're managing your Mappers
     * manually and not using a {@link Container} or {@link DataStore} component.
     *
     * @example
     * UserService.hasOne(ProfileService, {
     *   // profile.user_id points to user.id
     *   foreignKey: 'user_id'
     *   // profile records will be attached to user records at "user.profile"
     *   localField: 'profile'
     * })
     *
     * @method Mapper#hasOne
     * @see http://www.js-data.io/v3.0/docs/relations
     * @since 3.0.0
     */
    hasOne: function hasOne(relatedMapper, opts) {
      return _hasOne(relatedMapper, opts)(this);
    },


    /**
     * Return whether `record` is an instance of this Mapper's recordClass.
     *
     * @example
     * const post = PostService.createRecord()
     *
     * console.log(PostService.is(post)) // true
     * // Equivalent to what's above
     * console.log(post instanceof PostService.recordClass) // true
     *
     * @method Mapper#is
     * @param {Object|Record} record The record to check.
     * @returns {boolean} Whether `record` is an instance of this Mapper's
     * {@link Mapper#recordClass}.
     * @since 3.0.0
     */
    is: function is(record) {
      var recordClass = this.recordClass;
      return recordClass ? record instanceof recordClass : false;
    },


    /**
     * Register an adapter on this Mapper under the given name.
     *
     * @method Mapper#registerAdapter
     * @param {string} name The name of the adapter to register.
     * @param {Adapter} adapter The adapter to register.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.default=false] Whether to make the adapter the
     * default adapter for this Mapper.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
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
     * Select records according to the `query` argument, and aggregate the sum
     * value of the property specified by `field`.
     *
     * {@link Mapper#beforeSum} will be called before calling the adapter.
     * {@link Mapper#afterSum} will be called after calling the adapter.
     *
     * @example
     * PurchaseOrderService.sum('amount', { status: 'paid' }).then((amountPaid) => {
     *   console.log(amountPaid) // e.g. 451125.34
     * })
     *
     * @method Mapper#sum
     * @param {string} field The field to sum.
     * @param {Object} [query={}] Selection query. See {@link query}.
     * @param {Object} [query.where] See {@link query.where}.
     * @param {number} [query.offset] See {@link query.offset}.
     * @param {number} [query.limit] See {@link query.limit}.
     * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
     * @param {Object} [opts] Configuration options. Refer to the `sum` method
     * of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @returns {Promise} Resolves with the aggregated sum.
     * @since 3.0.0
     */
    sum: function sum(field, query, opts) {
      return this.crud('sum', field, query, opts);
    },


    /**
     * Return a plain object representation of the given record. Relations can
     * be optionally be included. Non-schema properties can be excluded.
     *
     * @example
     * import {Mapper, Schema} from 'js-data'
     * const PersonService = new Mapper({
     *   name: 'person',
     *   schema: {
     *     properties: {
     *       name: { type: 'string' },
     *       id: { type: 'string' }
     *     }
     *   }
     * })
     * const person = PersonService.createRecord({ id: 1, name: 'John', foo: 'bar' })
     * console.log(PersonService.toJSON(person)) // {"id":1,"name":"John","foo":"bar"}
     * console.log(PersonService.toJSON(person), { strict: true }) // {"id":1,"name":"John"}
     *
     * @method Mapper#toJSON
     * @param {Record|Record[]} records Record or records from which to create a
     * POJO representation.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.strict] Whether to include properties that are not
     * defined in {@link Mapper#schema}.
     * @param {string[]} [opts.with] Array of relation names or relation fields
     * to include in the POJO representation.
     * @param {boolean} [opts.withAll] Whether to simply include all relations in
     * the representation. Overrides `opts.with`.
     * @returns {Object|Object[]} POJO representation of the record or records.
     * @since 3.0.0
     */
    toJSON: function toJSON(records, opts) {
      var self = this;
      var record = void 0;
      opts || (opts = {});
      if (utils$1.isArray(records)) {
        return records.map(function (record) {
          return self.toJSON(record, opts);
        });
      } else {
        record = records;
      }
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
        for (var key in record) {
          if (!properties[key] && relationFields.indexOf(key) === -1) {
            json[key] = utils$1.plainCopy(record[key]);
          }
        }
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
     * @example <caption>Update a specific post</caption>
     * PostService.update(1234, {
     *   status: 'published',
     *   published_at: new Date()
     * }).then((post) => {
     *   console.log(post) // { id: 1234, status: 'published', ... }
     * })
     *
     * @method Mapper#update
     * @param {(string|number)} id The primary key of the record to update.
     * @param {Object} props The update to apply to the record.
     * @param {Object} [opts] Configuration options. Refer to the `update` method
     * of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * transaction.
     * @returns {Promise} Resolves with the updated record. Rejects if the record
     * could not be found.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
     */
    update: function update(id, props, opts) {
      return this.crud('update', id, props, opts);
    },


    /**
     * Using the `query` argument, perform the a single updated to the selected
     * records.
     *
     * {@link Mapper#beforeUpdateAll} will be called before making the update.
     * {@link Mapper#afterUpdateAll} will be called after making the update.
     *
     * @example <caption>Turn all of John's blog posts into drafts.</caption>
     * const update = { status: draft: published_at: null }
     * const query = { userId: 1234 }
     * PostService.updateAll(update, query).then((posts) => {
     *   console.log(posts) // [...]
     * })
     *
     * @method Mapper#updateAll
     * @param {Object} props Update to apply to selected records.
     * @param {Object} [query={}] Selection query. See {@link query}.
     * @param {Object} [query.where] See {@link query.where}.
     * @param {number} [query.offset] See {@link query.offset}.
     * @param {number} [query.limit] See {@link query.limit}.
     * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
     * @param {Object} [opts] Configuration options. Refer to the `updateAll`
     * method of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @returns {Promise} Resolves with the update records, if any.
     * @see query
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
     */
    updateAll: function updateAll(props, query, opts) {
      return this.crud('updateAll', props, query, opts);
    },


    /**
     * Given an array of updates, perform each of the updates via an adapter. Each
     * "update" is a hash of properties with which to update an record. Each
     * update must contain the primary key of the record to be updated.
     *
     * {@link Mapper#beforeUpdateMany} will be called before making the update.
     * {@link Mapper#afterUpdateMany} will be called after making the update.
     *
     * @example
     * PostService.updateMany([
     *   { id: 1234, status: 'draft' },
     *   { id: 2468, status: 'published', published_at: new Date() }
     * ]).then((posts) => {
     *   console.log(posts) // [...]
     * })
     *
     * @method Mapper#updateMany
     * @param {Record[]} records Array up record updates.
     * @param {Object} [opts] Configuration options. Refer to the `updateMany`
     * method of whatever adapter you're using for more configuration options.
     * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
     * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
     * @returns {Promise} Resolves with the updated records. Rejects if any of the
     * records could be found.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
     */
    updateMany: function updateMany(records, opts) {
      return this.crud('updateMany', records, opts);
    },


    /**
     * Validate the given record or records according to this Mapper's
     * {@link Schema}. If there are no validation errors then the return value
     * will be `undefined`.
     *
     * @example
     * import {Mapper, Schema} from 'js-data'
     * const PersonSchema = new Schema({
     *   properties: {
     *     name: { type: 'string' },
     *     id: { type: 'string' }
     *   }
     * })
     * const PersonService = new Mapper({
     *   name: 'person',
     *   schema: PersonSchema
     * })
     * let errors = PersonService.validate({ name: 'John' })
     * console.log(errors) // undefined
     * errors = PersonService.validate({ name: 123 })
     * console.log(errors) // [{ expected: 'one of (string)', actual: 'number', path: 'name' }]
     *
     * @method Mapper#validate
     * @param {Object|Object[]} record The record or records to validate.
     * @param {Object} [opts] Configuration options. Passed to
     * {@link Schema#validate}.
     * @returns {Object[]} Array of errors or `undefined` if no errors.
     * @since 3.0.0
     */
    validate: function validate(record, opts) {
      var self = this;
      var schema = self.getSchema();
      if (utils$1.isArray(record)) {
        var errors = record.map(function (_record) {
          return schema.validate(_record, opts);
        });
        var hasErrors = false;
        errors.forEach(function (err) {
          if (err) {
            hasErrors = true;
          }
        });
        if (hasErrors) {
          return errors;
        }
        return undefined;
      }
      return schema.validate(record, opts);
    },


    /**
     * Method used to wrap data returned by an adapter with this Mapper's
     * {@link Mapper#recordClass}. This method is used by all of a Mapper's CRUD
     * methods. The provided implementation of this method assumes that the `data`
     * passed to it is a record or records that need to be wrapped with
     * {@link Mapper#createRecord}. Override with care.
     *
     * Provided implementation of {@link Mapper#wrap}:
     *
     * ```
     * function (data, opts) {
     *   return this.createRecord(data, opts)
     * }
     * ```
     *
     * @example <caption>Override to customize behavior</caption>
     * const PostMapper = new Mapper({
     *   name: 'post',
     *   wrap (data, opts) {
     *     const originalWrap = this.constructor.prototype.wrap
     *     // Let's say "GET /post" doesn't return JSON quite like JSData expects,
     *     // but the actual post records are nested under a "posts" field. So,
     *     // we override Mapper#wrap to handle this special case.
     *     if (opts.op === 'findAll') {
     *       return originalWrap.call(this, data.posts, opts)
     *     }
     *     // Otherwise perform original behavior
     *     return originalWrap.call(this, data, opts)
     *   }
     * })
     *
     * @method Mapper#wrap
     * @param {Object|Object[]} data The record or records to be wrapped.
     * @param {Object} [opts] Configuration options. Passed to {@link Mapper#createRecord}.
     * @returns {Record|Record[]} The wrapped record or records.
     * @since 3.0.0
     */
    wrap: function wrap(data, opts) {
      return this.createRecord(data, opts);
    }
  });

  /**
   * Create a subclass of this Mapper.
   *
   * @example <caption>Extend the class in a cross-browser manner.</caption>
   * import {Mapper} from 'js-data'
   * const CustomMapperClass = Mapper.extend({
   *   foo () { return 'bar' }
   * })
   * const customMapper = new CustomMapperClass({ name: 'test' })
   * console.log(customMapper.foo()) // "bar"
   *
   * @example <caption>Extend the class using ES2015 class syntax.</caption>
   * class CustomMapperClass extends Mapper {
   *   foo () { return 'bar' }
   * }
   * const customMapper = new CustomMapperClass({ name: 'test' })
   * console.log(customMapper.foo()) // "bar"
   *
   * @method Mapper.extend
   * @param {Object} [props={}] Properties to add to the prototype of the
   * subclass.
   * @param {Object} [classProps={}] Static properties to add to the subclass.
   * @returns {Constructor} Subclass of this Mapper.
   * @since 3.0.0
   */

  var DOMAIN$3 = 'Container';

  var toProxy = [
  /**
   * Wrapper for {@link Mapper#count}.
   *
   * @example <caption>Get the number of published blog posts</caption>
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * store.count('post', { status: 'published' }).then((numPublished) => {
   *   console.log(numPublished) // e.g. 45
   * })
   *
   * @method Container#count
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} [query] See {@link Mapper#count}.
   * @param {Object} [opts] See {@link Mapper#count}.
   * @returns {Promise} See {@link Mapper#count}.
   * @see Mapper#count
   * @since 3.0.0
   */
  'count',

  /**
   * Wrapper for {@link Mapper#create}.
   *
   * @example <caption>Create and save a new blog post</caption>
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * store.create('post', {
   *   title: 'Modeling your data',
   *   status: 'draft'
   * }).then((post) => {
   *   console.log(post) // { id: 1234, status: 'draft', ... }
   * })
   *
   * @method Container#create
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} props See {@link Mapper#create}.
   * @param {Object} [opts] See {@link Mapper#create}.
   * @returns {Promise} See {@link Mapper#create}.
   * @see Mapper#create
   * @since 3.0.0
   */
  'create',

  /**
   * Wrapper for {@link Mapper#createMany}.
   *
   * @example <caption>Create and save several new blog posts</caption>
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * store.createMany('post', [{
   *   title: 'Modeling your data',
   *   status: 'draft'
   * }, {
   *   title: 'Reading data',
   *   status: 'draft'
   * }]).then((posts) => {
   *   console.log(posts[0]) // { id: 1234, status: 'draft', ... }
   *   console.log(posts[1]) // { id: 1235, status: 'draft', ... }
   * })
   *
   * @method Container#createMany
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Record[]} records See {@link Mapper#createMany}.
   * @param {Object} [opts] See {@link Mapper#createMany}.
   * @returns {Promise} See {@link Mapper#createMany}.
   * @see Mapper#createMany
   * @since 3.0.0
   */
  'createMany',

  /**
   * Wrapper for {@link Mapper#createRecord}.
   *
   * __Note:__ This method does __not__ interact with any adapter, and does
   * __not__ save any data. It only creates new objects in memory.
   *
   * @example <caption>Create empty unsaved record instance</caption>
   * import {Container} from 'js-data'
   * const store = new Container()
   * store.defineMapper('post')
   * const post = PostService.createRecord()
   *
   * @method Container#createRecord
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object|Object[]} props See {@link Mapper#createRecord}.
   * @param {Object} [opts] See {@link Mapper#createRecord}.
   * @returns {Promise} See {@link Mapper#createRecord}.
   * @see Mapper#createRecord
   * @since 3.0.0
   */
  'createRecord',

  /**
   * Wrapper for {@link Mapper#dbg}.
   *
   * @method Container#dbg
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {...*} args See {@link Mapper#dbg}.
   * @see Mapper#dbg
   * @since 3.0.0
   */
  'dbg',

  /**
   * Wrapper for {@link Mapper#destroy}.
   *
   * @example <caption>Destroy a specific blog post</caption>
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * store.destroy('post', 1234).then(() => {
   *   // Blog post #1234 has been destroyed
   * })
   *
   * @method Container#destroy
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(string|number)} id See {@link Mapper#destroy}.
   * @param {Object} [opts] See {@link Mapper#destroy}.
   * @returns {Promise} See {@link Mapper#destroy}.
   * @see Mapper#destroy
   * @since 3.0.0
   */
  'destroy',

  /**
   * Wrapper for {@link Mapper#destroyAll}.
   *
   * @example <caption>Destroy all "draft" blog posts</caption>
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * store.destroyAll('post', { status: 'draft' }).then(() => {
   *   // All "draft" blog posts have been destroyed
   * })
   *
   * @method Container#destroyAll
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} [query] See {@link Mapper#destroyAll}.
   * @param {Object} [opts] See {@link Mapper#destroyAll}.
   * @returns {Promise} See {@link Mapper#destroyAll}.
   * @see Mapper#destroyAll
   * @since 3.0.0
   */
  'destroyAll',

  /**
   * Wrapper for {@link Mapper#find}.
   *
   * @example
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * store.find('post', 1).then((post) => {
   *   console.log(post) // { id: 1, ...}
   * })
   *
   * @method Container#find
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(string|number)} id See {@link Mapper#find}.
   * @param {Object} [opts] See {@link Mapper#find}.
   * @returns {Promise} See {@link Mapper#find}.
   * @see Mapper#find
   * @since 3.0.0
   */
  'find',

  /**
   * Wrapper for {@link Mapper#createRecord}.
   *
   * @example <caption>Find all "published" blog posts</caption>
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * store.findAll('post', { status: 'published' }).then((posts) => {
   *   console.log(posts) // [{ id: 1, ...}, ...]
   * })
   *
   * @method Container#findAll
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} [query] See {@link Mapper#findAll}.
   * @param {Object} [opts] See {@link Mapper#findAll}.
   * @returns {Promise} See {@link Mapper#findAll}.
   * @see Mapper#findAll
   * @since 3.0.0
   */
  'findAll',

  /**
   * Wrapper for {@link Mapper#getSchema}.
   *
   * @method Container#getSchema
   * @param {string} name Name of the {@link Mapper} to target.
   * @returns {Schema} See {@link Mapper#getSchema}.
   * @see Mapper#getSchema
   * @since 3.0.0
   */
  'getSchema',

  /**
   * Wrapper for {@link Mapper#is}.
   *
   * @example
   * import {Container} from 'js-data'
   * const store = new Container()
   * store.defineMapper('post')
   * const post = store.createRecord()
   *
   * console.log(store.is('post', post)) // true
   * // Equivalent to what's above
   * console.log(post instanceof store.getMapper('post').recordClass) // true
   *
   * @method Container#is
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object|Record} record See {@link Mapper#is}.
   * @returns {boolean} See {@link Mapper#is}.
   * @see Mapper#is
   * @since 3.0.0
   */
  'is',

  /**
   * Wrapper for {@link Mapper#log}.
   *
   * @method Container#log
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {...*} args See {@link Mapper#log}.
   * @see Mapper#log
   * @since 3.0.0
   */
  'log',

  /**
   * Wrapper for {@link Mapper#sum}.
   *
   * @example
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('purchase_order')
   *
   * store.sum('purchase_order', 'amount', { status: 'paid' }).then((amountPaid) => {
   *   console.log(amountPaid) // e.g. 451125.34
   * })
   *
   * @method Container#sum
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {string} field See {@link Mapper#sum}.
   * @param {Object} [query] See {@link Mapper#sum}.
   * @param {Object} [opts] See {@link Mapper#sum}.
   * @returns {Promise} See {@link Mapper#sum}.
   * @see Mapper#sum
   * @since 3.0.0
   */
  'sum',

  /**
   * Wrapper for {@link Mapper#toJSON}.
   *
   * @example
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('person', {
   *   schema: {
   *     properties: {
   *       name: { type: 'string' },
   *       id: { type: 'string' }
   *     }
   *   }
   * })
   * const person = store.createRecord('person', { id: 1, name: 'John', foo: 'bar' })
   * console.log(store.toJSON('person', person)) // {"id":1,"name":"John","foo":"bar"}
   * console.log(store.toJSON('person', person), { strict: true }) // {"id":1,"name":"John"}
   *
   * @method Container#toJSON
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Record|Record[]} records See {@link Mapper#toJSON}.
   * @param {Object} [opts] See {@link Mapper#toJSON}.
   * @returns {Object|Object[]} See {@link Mapper#toJSON}.
   * @see Mapper#toJSON
   * @since 3.0.0
   */
  'toJSON',

  /**
   * Wrapper for {@link Mapper#update}.
   *
   * @example
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * store.update('post', 1234, {
   *   status: 'published',
   *   published_at: new Date()
   * }).then((post) => {
   *   console.log(post) // { id: 1234, status: 'published', ... }
   * })
   *
   * @method Container#update
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(string|number)} id See {@link Mapper#update}.
   * @param {Object} record See {@link Mapper#update}.
   * @param {Object} [opts] See {@link Mapper#update}.
   * @returns {Promise} See {@link Mapper#update}.
   * @see Mapper#update
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  'update',

  /**
   * Wrapper for {@link Mapper#updateAll}.
   *
   * @example <caption>Turn all of John's blog posts into drafts.</caption>
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * const update = { status: draft: published_at: null }
   * const query = { userId: 1234 }
   * store.updateAll('post', update, query).then((posts) => {
   *   console.log(posts) // [...]
   * })
   *
   * @method Container#updateAll
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} update See {@link Mapper#updateAll}.
   * @param {Object} [query] See {@link Mapper#updateAll}.
   * @param {Object} [opts] See {@link Mapper#updateAll}.
   * @returns {Promise} See {@link Mapper#updateAll}.
   * @see Mapper#updateAll
   * @since 3.0.0
   */
  'updateAll',

  /**
   * Wrapper for {@link Mapper#updateMany}.
   *
   * @example
   * import {Container} from 'js-data'
   * import RethinkDBAdapter from 'js-data-rethinkdb'
   * const store = new Container()
   * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
   * store.defineMapper('post')
   *
   * store.updateMany('post', [
   *   { id: 1234, status: 'draft' },
   *   { id: 2468, status: 'published', published_at: new Date() }
   * ]).then((posts) => {
   *   console.log(posts) // [...]
   * })
   *
   * @method Container#updateMany
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(Object[]|Record[])} records See {@link Mapper#updateMany}.
   * @param {Object} [opts] See {@link Mapper#updateMany}.
   * @returns {Promise} See {@link Mapper#updateMany}.
   * @see Mapper#updateMany
   * @since 3.0.0
   */
  'updateMany',

  /**
   * Wrapper for {@link Mapper#validate}.
   *
   * @example
   * import {Container} from 'js-data'
   * const store = new Container()
   * store.defineMapper('post', {
   *   schema: {
   *     properties: {
   *       name: { type: 'string' },
   *       id: { type: 'string' }
   *     }
   *   }
   * })
   * let errors = store.validate('post', { name: 'John' })
   * console.log(errors) // undefined
   * errors = store.validate('post', { name: 123 })
   * console.log(errors) // [{ expected: 'one of (string)', actual: 'number', path: 'name' }]
   *
   * @method Container#validate
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(Object[]|Record[])} records See {@link Mapper#validate}.
   * @param {Object} [opts] See {@link Mapper#validate}.
   * @returns {Promise} See {@link Mapper#validate}.
   * @see Mapper#validate
   * @since 3.0.0
   */
  'validate'];

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
       * new {@link Mapper}.
       *
       * @default {}
       * @name Container#mapperDefaults
       * @since 3.0.0
       * @type {Object}
       */
      self.mapperDefaults = self.mapperDefaults || {};

      /**
       * Constructor function to use in {@link Container#defineMapper} to create a
       * new mapper.
       *
       * {@link Mapper}
       * @name Container#mapperClass
       * @since 3.0.0
       * @type {Constructor}
       */
      self.mapperClass = self.mapperClass || Mapper;

      // Holds the adapters, shared by all mappers in this container
      self._adapters = {};

      // The the mappers in this container
      self._mappers = {};
    },

    /**
     * Register a new event listener on this Container.
     *
     * Proxy for {@link Component#on}. If an event was emitted by a Mapper in the
     * Container, then the name of the Mapper will be prepended to the arugments
     * passed to the listener.
     *
     * @method Container#on
     * @param {string} event Name of event to subsribe to.
     * @param {Function} listener Listener function to handle the event.
     * @param {*} [ctx] Optional content in which to invoke the listener.
     * @since 3.0.0
     */

    /**
     * Used to bind to events emitted by mappers in this container.
     *
     * @method Container#_onMapperEvent
     * @param {string} name Name of the mapper that emitted the event.
     * @param {...*} [args] Args See {@link Mapper#emit}.
     * @private
     * @since 3.0.0
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
     * const store = new Container({
     *   mapperDefaults: { foo: 'bar' }
     * })
     * const userMapper = store.defineMapper('user')
     * userMapper.foo // "bar"
     *
     * @method Container#defineMapper
     * @param {string} name Name under which to register the new {@link Mapper}.
     * {@link Mapper#name} will be set to this value.
     * @param {Object} [opts] Configuration options. Passed to
     * {@link Container#mapperClass} when creating the new {@link Mapper}.
     * @returns {Mapper}
     * @since 3.0.0
     */
    defineMapper: function defineMapper(name, opts) {
      var self = this;

      // For backwards compatibility with defineResource
      if (utils$1.isObject(name)) {
        opts = name;
        name = opts.name;
      }
      if (!utils$1.isString(name)) {
        throw utils$1.err(DOMAIN$3 + '#defineMapper', 'name')(400, 'string', name);
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
      mapper.relations || (mapper.relations = {});
      // Make sure the mapper's name is set
      mapper.name = name;
      // All mappers in this datastore will share adapters
      mapper._adapters = self.getAdapters();

      mapper.datastore = self;

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
     * @method Container#getAdapter
     * @param {string} [name] The name of the adapter to retrieve.
     * @returns {Adapter} The adapter.
     * @since 3.0.0
     */
    getAdapter: function getAdapter(name) {
      var self = this;
      var adapter = self.getAdapterName(name);
      if (!adapter) {
        throw utils$1.err(DOMAIN$3 + '#getAdapter', 'name')(400, 'string', name);
      }
      return self.getAdapters()[adapter];
    },


    /**
     * Return the name of a registered adapter based on the given name or options,
     * or the name of the default adapter if no name provided.
     *
     * @method Container#getAdapterName
     * @param {(Object|string)} [opts] The name of an adapter or options, if any.
     * @returns {string} The name of the adapter.
     * @since 3.0.0
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
     * @method Container#getAdapters
     * @returns {Adapter}
     * @since 3.0.0
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
     * @method Container#getMapper
     * @param {string} name {@link Mapper#name}.
     * @returns {Mapper}
     * @since 3.0.0
     */
    getMapper: function getMapper(name) {
      var mapper = this._mappers[name];
      if (!mapper) {
        throw utils$1.err(DOMAIN$3 + '#getMapper', name)(404, 'mapper');
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
     * @method Container#registerAdapter
     * @param {string} name The name of the adapter to register.
     * @param {Adapter} adapter The adapter to register.
     * @param {Object} [opts] Configuration options.
     * @param {boolean} [opts.default=false] Whether to make the adapter the
     * default adapter for all Mappers in this container.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
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
   * @returns {Container}
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/components-of-jsdata#container","Components of JSData: Container"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/jsdata-and-the-browser","Notes on using JSData in the Browser"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/jsdata-and-nodejs","Notes on using JSData in Node.js"]
   */
  var Container = Component.extend(props);

  /**
   * Create a subclass of this Container.
   *
   * @example <caption>Extend the class in a cross-browser manner.</caption>
   * import {Container} from 'js-data'
   * const CustomContainerClass = Container.extend({
   *   foo () { return 'bar' }
   * })
   * const customContainer = new CustomContainerClass()
   * console.log(customContainer.foo()) // "bar"
   *
   * @example <caption>Extend the class using ES2015 class syntax.</caption>
   * class CustomContainerClass extends Container {
   *   foo () { return 'bar' }
   * }
   * const customContainer = new CustomContainerClass()
   * console.log(customContainer.foo()) // "bar"
   *
   * @method Container.extend
   * @param {Object} [props={}] Properties to add to the prototype of the
   * subclass.
   * @param {Object} [classProps={}] Static properties to add to the subclass.
   * @returns {Constructor} Subclass of this Container.
   * @since 3.0.0
   */

  var DOMAIN$9 = 'LinkedCollection';

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
   * @returns {Mapper}
   */
  var LinkedCollection = Collection.extend({
    constructor: function LinkedCollection(records, opts) {
      var self = this;
      utils$1.classCallCheck(self, LinkedCollection);
      LinkedCollection.__super__.call(self, records, opts);

      // Make sure this collection has somewhere to store "added" timestamps
      Object.defineProperty(self, '_added', {
        value: {}
      });

      // Make sure this collection has a reference to a datastore
      if (!self.datastore) {
        throw utils$1.err('new ' + DOMAIN$9, 'opts.datastore')(400, 'DataStore', self.datastore);
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
      var relationList = mapper.relationList;
      var timestamp = new Date().getTime();
      var usesRecordClass = !!mapper.recordClass;
      var idAttribute = mapper.idAttribute;
      var singular = void 0;

      if (utils$1.isObject(records) && !utils$1.isArray(records)) {
        singular = true;
        records = [records];
      }

      records = utils$1.getSuper(self).prototype.add.call(self, records, opts);

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
            var id = utils$1.get(record, idAttribute);

            if (utils$1.isFunction(def.add)) {
              relatedData = def.add(datastore, def, record);
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
            }

            if (!relatedData || utils$1.isArray(relatedData) && !relatedData.length) {
              if (type === belongsToType) {
                var relatedId = utils$1.get(record, foreignKey);
                if (!utils$1.isUndefined(relatedId)) {
                  relatedData = relatedCollection.get(relatedId);
                }
              } else if (type === hasOneType) {
                var _records = relatedCollection.filter(babelHelpers.defineProperty({}, foreignKey, id));
                relatedData = _records.length ? _records[0] : undefined;
              } else if (type === hasManyType) {
                if (foreignKey) {
                  var _records2 = relatedCollection.filter(babelHelpers.defineProperty({}, foreignKey, id));
                  relatedData = _records2.length ? _records2 : undefined;
                } else if (def.localKeys && utils$1.get(record, def.localKeys)) {
                  var _records3 = relatedCollection.filter({
                    where: babelHelpers.defineProperty({}, relationIdAttribute, {
                      'in': utils$1.get(record, def.localKeys)
                    })
                  });
                  relatedData = _records3.length ? _records3 : undefined;
                } else if (def.foreignKeys) {
                  var _records4 = relatedCollection.filter({
                    where: babelHelpers.defineProperty({}, def.foreignKeys, {
                      'contains': id
                    })
                  });
                  relatedData = _records4.length ? _records4 : undefined;
                }
              }
            }
            if (relatedData) {
              def.setLocalField(record, relatedData);
            } else {}
          });
        });
      }

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

  var DOMAIN$8 = 'DataStore';

  var safeSet = function safeSet(record, field, value) {
    if (record && record._set) {
      record._set(field, value);
    } else {
      utils$1.set(record, field, value);
    }
  };

  var cachedFn = function cachedFn(name, hashOrId, opts) {
    var self = this;
    var cached = self._completedQueries[name][hashOrId];
    if (utils$1.isFunction(cached)) {
      return cached(name, hashOrId, opts);
    }
    return cached;
  };

  var props$1 = {
    constructor: function DataStore(opts) {
      var self = this;
      utils$1.classCallCheck(self, DataStore);
      DataStore.__super__.call(self, opts);

      self.collectionClass = self.collectionClass || LinkedCollection;
      self._collections = {};
      self._pendingQueries = {};
      self._completedQueries = {};
      return self;
    },

    _callSuper: function _callSuper(method) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
        args[_key2 - 1] = arguments[_key2];
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
     * @returns {(Object|Array)} Result.
     */
    _end: function _end(name, result, opts) {
      var _data = opts.raw ? result.data : result;
      if (_data && utils$1.isFunction(this.addToCache)) {
        _data = this.addToCache(name, _data, opts);
        if (opts.raw) {
          result.data = _data;
        } else {
          result = _data;
        }
      }
      return result;
    },


    /**
     * Register a new event listener on this DataStore.
     *
     * Proxy for {@link Container#on}. If an event was emitted by a Mapper or
     * Collection in the DataStore, then the name of the Mapper or Collection will
     * be prepended to the arugments passed to the provided event handler.
     *
     * @name DataStore#on
     * @method
     * @param {string} event Name of event to subsribe to.
     * @param {Function} listener Listener function to handle the event.
     * @param {*} [ctx] Optional content in which to invoke the listener.
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
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var type = args.shift();
      this.emit.apply(this, [type, name].concat(args));
    },


    /**
     * TODO
     *
     * @name DataStore#addToCache
     * @method
     * @param {string} name - Name of the {@link Mapper} to target.
     * @param {*} data - Data from which data should be selected for add.
     * @param {Object} [opts] - Configuration options.
     */
    addToCache: function addToCache(name, data, opts) {
      return this.getCollection(name).add(data, opts);
    },


    /**
     * Retrieve a cached `find` result, if any.
     *
     * @name DataStore#cachedFind
     * @method
     * @param {string} name The `name` argument passed to {@link DataStore#find}.
     * @param {(string|number)} id The `id` argument passed to {@link DataStore#find}.
     * @param {Object} opts The `opts` argument passed to {@link DataStore#find}.
     */
    cachedFind: cachedFn,

    /**
     * Retrieve a cached `findAll` result, if any.
     *
     * @name DataStore#cachedFindAll
     * @method
     * @param {string} name The `name` argument passed to {@link DataStore#findAll}.
     * @param {string} hash The result of calling {@link DataStore#hashQuery} on
     * the `query` argument passed to {@link DataStore#findAll}.
     * @param {Object} opts The `opts` argument passed to {@link DataStore#findAll}.
     */
    cachedFindAll: cachedFn,

    /**
     * Cache a `find` result. The default implementation does the following:
     *
     * ```
     * // Find and return the record from the data store
     * return this.get(name, id)
     * ```
     *
     * Override this method to customize.
     *
     * @name DataStore#cacheFind
     * @method
     * @param {string} name The `name` argument passed to {@link DataStore#find}.
     * @param {*} data The result to cache.
     * @param {(string|number)} id The `id` argument passed to {@link DataStore#find}.
     * @param {Object} opts The `opts` argument passed to {@link DataStore#find}.
     */
    cacheFind: function cacheFind(name, data, id, opts) {
      var self = this;
      self._completedQueries[name][id] = function (name, id, opts) {
        return self.get(name, id);
      };
    },


    /**
     * Cache a `findAll` result. The default implementation does the following:
     *
     * ```
     * // Find and return the records from the data store
     * return this.filter(name, utils.fromJson(hash))
     * ```
     *
     * Override this method to customize.
     *
     * @name DataStore#cacheFindAll
     * @method
     * @param {string} name The `name` argument passed to {@link DataStore#findAll}.
     * @param {*} data The result to cache.
     * @param {string} hash The result of calling {@link DataStore#hashQuery} on
     * the `query` argument passed to {@link DataStore#findAll}.
     * @param {Object} opts The `opts` argument passed to {@link DataStore#findAll}.
     */
    cacheFindAll: function cacheFindAll(name, data, hash, opts) {
      var self = this;
      self._completedQueries[name][hash] = function (name, hash, opts) {
        return self.filter(name, utils$1.fromJson(hash));
      };
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
     * @returns {Promise}
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
     * @returns {Promise}
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
        for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
          args[_key4] = arguments[_key4];
        }

        self._onCollectionEvent.apply(self, [name].concat(args));
      });

      var idAttribute = mapper.idAttribute;

      mapper.relationList.forEach(function (def) {
        var relation = def.relation;
        var localField = def.localField;
        var path = 'links.' + localField;
        var foreignKey = def.foreignKey;
        var type = def.type;
        var updateOpts = { index: foreignKey };
        var descriptor = void 0;

        var getter = function getter() {
          return this._get(path);
        };

        if (type === belongsToType) {
          if (!collection.indexes[foreignKey]) {
            collection.createIndex(foreignKey);
          }

          descriptor = {
            get: getter,
            set: function set(record) {
              var _self = this;
              var current = this._get(path);
              if (record === current) {
                return current;
              }
              var id = utils$1.get(_self, idAttribute);
              var inverseDef = def.getInverse(mapper);

              if (record) {
                var relatedIdAttribute = def.getRelation().idAttribute;
                var relatedId = utils$1.get(record, relatedIdAttribute);

                // Prefer store record
                if (!utils$1.isUndefined(relatedId)) {
                  record = self.get(relation, relatedId) || record;
                }

                // Set locals
                _self._set(path, record);
                safeSet(_self, foreignKey, relatedId);
                collection.updateIndex(_self, updateOpts);

                // Update (set) inverse relation
                if (inverseDef.type === hasOneType) {
                  utils$1.set(record, inverseDef.localField, _self);
                } else if (inverseDef.type === hasManyType) {
                  var children = utils$1.get(record, inverseDef.localField);
                  utils$1.noDupeAdd(children, _self, function (_record) {
                    return id === utils$1.get(_record, idAttribute);
                  });
                }
              } else {
                // Unset locals
                _self._set(path, undefined);
                safeSet(_self, foreignKey, undefined);
                collection.updateIndex(_self, updateOpts);
              }
              if (current) {
                if (inverseDef.type === hasOneType) {
                  utils$1.set(current, inverseDef.localField, undefined);
                } else if (inverseDef.type === hasManyType) {
                  var _children = utils$1.get(current, inverseDef.localField);
                  utils$1.remove(_children, function (_record) {
                    return id === utils$1.get(_record, idAttribute);
                  });
                }
              }
              return record;
            }
          };

          if (mapper.recordClass.prototype.hasOwnProperty(foreignKey)) {
            (function () {
              var superClass = mapper.recordClass;
              mapper.recordClass = superClass.extend({
                constructor: function () {
                  var subClass = function Record(props, opts) {
                    utils$1.classCallCheck(this, subClass);
                    superClass.call(this, props, opts);
                  };
                  return subClass;
                }()
              });
            })();
          }
          Object.defineProperty(mapper.recordClass.prototype, foreignKey, {
            enumerable: true,
            get: function get() {
              return this._get(foreignKey);
            },
            set: function set(value) {
              var _self = this;
              if (utils$1.isUndefined(value)) {
                // Unset locals
                utils$1.set(_self, localField, undefined);
              } else {
                safeSet(_self, foreignKey, value);
                var storeRecord = self.get(relation, value);
                if (storeRecord) {
                  utils$1.set(_self, localField, storeRecord);
                }
              }
            }
          });
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
                var current = getter.call(_self);
                if (!current) {
                  _self._set(path, []);
                }
                return getter.call(_self);
              },
              set: function set(records) {
                var _self = this;
                records || (records = []);
                if (records && !utils$1.isArray(records)) {
                  records = [records];
                }
                var id = utils$1.get(_self, idAttribute);
                var relatedIdAttribute = def.getRelation().idAttribute;
                var inverseDef = def.getInverse(mapper);
                var inverseLocalField = inverseDef.localField;
                var linked = _self._get(path);
                if (!linked) {
                  linked = [];
                }

                var current = linked;
                linked = [];
                var toLink = {};
                records.forEach(function (record) {
                  var relatedId = utils$1.get(record, relatedIdAttribute);
                  if (!utils$1.isUndefined(relatedId)) {
                    // Prefer store record
                    record = self.get(relation, relatedId) || record;
                    toLink[relatedId] = record;
                  }
                  linked.push(record);
                });
                if (foreignKey) {
                  records.forEach(function (record) {
                    // Update (set) inverse relation
                    safeSet(record, foreignKey, id);
                    self.getCollection(relation).updateIndex(record, updateOpts);
                    utils$1.set(record, inverseLocalField, _self);
                  });
                  current.forEach(function (record) {
                    var relatedId = utils$1.get(record, relatedIdAttribute);
                    if (!utils$1.isUndefined(relatedId) && !toLink.hasOwnProperty(relatedId)) {
                      // Update (unset) inverse relation
                      safeSet(record, foreignKey, undefined);
                      self.getCollection(relation).updateIndex(record, updateOpts);
                      utils$1.set(record, inverseLocalField, undefined);
                    }
                  });
                } else if (localKeys) {
                  (function () {
                    var _localKeys = [];
                    records.forEach(function (record) {
                      // Update (set) inverse relation
                      utils$1.set(record, inverseLocalField, _self);
                      _localKeys.push(utils$1.get(record, relatedIdAttribute));
                    });
                    // Update locals
                    utils$1.set(_self, localKeys, _localKeys);
                    // Update (unset) inverse relation
                    current.forEach(function (record) {
                      var relatedId = utils$1.get(record, relatedIdAttribute);
                      if (!utils$1.isUndefined(relatedId) && !toLink.hasOwnProperty(relatedId)) {
                        // Update inverse relation
                        utils$1.set(record, inverseLocalField, undefined);
                      }
                    });
                  })();
                } else if (foreignKeys) {
                  // Update (unset) inverse relation
                  current.forEach(function (record) {
                    var _localKeys = utils$1.get(record, foreignKeys) || [];
                    utils$1.remove(_localKeys, function (_key) {
                      return id === _key;
                    });
                    var _localField = utils$1.get(record, inverseLocalField) || [];
                    utils$1.remove(_localField, function (_record) {
                      return id === utils$1.get(_record, idAttribute);
                    });
                  });
                  // Update (set) inverse relation
                  records.forEach(function (record) {
                    var _localKeys = utils$1.get(record, foreignKeys) || [];
                    utils$1.noDupeAdd(_localKeys, id, function (_key) {
                      return id === _key;
                    });
                    var _localField = utils$1.get(record, inverseLocalField) || [];
                    utils$1.noDupeAdd(_localField, _self, function (_record) {
                      return id === utils$1.get(_record, idAttribute);
                    });
                  });
                }

                _self._set(path, linked);
                return linked;
              }
            };
          })();
        } else if (type === hasOneType) {
          // TODO: Handle case when belongsTo relation isn't ever defined
          if (self._collections[relation] && foreignKey && !self.getCollection(relation).indexes[foreignKey]) {
            self.getCollection(relation).createIndex(foreignKey);
          }
          descriptor = {
            get: getter,
            set: function set(record) {
              var _self = this;
              var current = this._get(path);
              if (record === current) {
                return current;
              }
              var relatedId = utils$1.get(record, def.getRelation().idAttribute);
              var inverseLocalField = def.getInverse(mapper).localField;
              // Update (unset) inverse relation
              if (current) {
                safeSet(current, foreignKey, undefined);
                self.getCollection(relation).updateIndex(current, updateOpts);
                utils$1.set(current, inverseLocalField, undefined);
              }
              if (record) {
                // Prefer store record
                if (!utils$1.isUndefined(relatedId)) {
                  record = self.get(relation, relatedId) || record;
                }

                // Set locals
                _self._set(path, record);

                // Update (set) inverse relation
                safeSet(record, foreignKey, utils$1.get(_self, idAttribute));
                self.getCollection(relation).updateIndex(record, updateOpts);
                utils$1.set(record, inverseLocalField, _self);
              } else {
                // Set locals
                _self._set(path, undefined);
              }
              return record;
            }
          };
        }

        if (descriptor) {
          descriptor.enumerable = utils$1.isUndefined(def.enumerable) ? false : def.enumerable;
          if (def.get) {
            (function () {
              var origGet = descriptor.get;
              descriptor.get = function () {
                var _this = this;

                return def.get(def, this, function () {
                  for (var _len4 = arguments.length, args = Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
                    args[_key5] = arguments[_key5];
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
     * @returns {Promise}
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
     * @returns {Promise}
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
     * @returns {Promise}
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
          var result = self._end(name, data, opts);
          self.cacheFind(name, result, id, opts);
          return result;
        }, function (err) {
          delete self._pendingQueries[name][id];
          return utils$1.reject(err);
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
     * @returns {Promise}
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

      var items = self.cachedFindAll(name, hash, opts);
      var promise = void 0;

      if (opts.force || !items) {
        promise = self._pendingQueries[name][hash] = self._callSuper('findAll', name, query, opts).then(function (data) {
          delete self._pendingQueries[name][hash];
          var result = self._end(name, data, opts);
          self.cacheFindAll(name, result, hash, opts);
          return result;
        }, function (err) {
          delete self._pendingQueries[name][hash];
          return utils$1.reject(err);
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
     * @returns {LinkedCollection}
     */
    getCollection: function getCollection(name) {
      var collection = this._collections[name];
      if (!collection) {
        throw utils$1.err(DOMAIN$8 + '#getCollection', name)(404, 'collection');
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
          if (def.foreignKey && (def.type === hasOneType || def.type === hasManyType)) {
            query = babelHelpers.defineProperty({}, def.foreignKey, def.getForeignKey(record));
          } else if (def.type === hasManyType && def.localKeys) {
            query = {
              where: babelHelpers.defineProperty({}, def.getRelation().idAttribute, {
                'in': utils$1.get(record, def.localKeys)
              })
            };
          } else if (def.type === hasManyType && def.foreignKeys) {
            query = {
              where: babelHelpers.defineProperty({}, def.foreignKeys, {
                'contains': def.getForeignKey(record)
              })
            };
          } else if (def.type === belongsToType) {
            relatedData = self.remove(def.relation, def.getForeignKey(record), optsCopy);
          }
          if (query) {
            relatedData = self.removeAll(def.relation, query, optsCopy);
          }
          if (relatedData) {
            if (utils$1.isArray(relatedData) && !relatedData.length) {
              return;
            }
            if (def.type === hasOneType) {
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
     * @returns {Promise}
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
     * @returns {Promise}
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
     * @returns {Promise}
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

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key6 = 1; _key6 < _len5; _key6++) {
        args[_key6 - 1] = arguments[_key6];
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
   * UserMapper.find(1).then((user) => {
   *   // retrieved a "user" record via the http adapter, but that's it
   *
   *   // Call "find" on "store" targeting "user" (Stateful DataStore)
   *   return store.find('user', 1)
   * }).then((user) => {
   *   // not only was a "user" record retrieved, but it was added to the
   *   // store's "user" collection
   *   const cachedUser = store.getCollection('user').get(1)
   *   console.log(user === cachedUser) // true
   * })
   *
   * @class DataStore
   * @extends Container
   * @param {Object} [opts] Configuration options. See {@link Container}.
   * @returns {DataStore}
   * @see Container
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/components-of-jsdata#datastore","Components of JSData: DataStore"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/working-with-the-datastore","Working with the DataStore"]
   * @tutorial ["http://www.js-data.io/v3.0/docs/jsdata-and-the-browser","Notes on using JSData in the Browser"]
   */
  var DataStore = Container.extend(props$1);

  /**
   * Create a subclass of this DataStore.
   *
   * @example <caption>Extend the class in a cross-browser manner.</caption>
   * import {DataStore} from 'js-data'
   * const CustomDataStoreClass = DataStore.extend({
   *   foo () { return 'bar' }
   * })
   * const customDataStore = new CustomDataStoreClass()
   * console.log(customDataStore.foo()) // "bar"
   *
   * @example <caption>Extend the class using ES2015 class syntax.</caption>
   * class CustomDataStoreClass extends DataStore {
   *   foo () { return 'bar' }
   * }
   * const customDataStore = new CustomDataStoreClass()
   * console.log(customDataStore.foo()) // "bar"
   *
   * @method DataStore.extend
   * @param {Object} [props={}] Properties to add to the prototype of the
   * subclass.
   * @param {Object} [classProps={}] Static properties to add to the subclass.
   * @returns {Constructor} Subclass of this DataStore.
   * @since 3.0.0
   */

  /**
   * Registered as `js-data` in NPM and Bower.
   *
   * Also available from CDN.JS and JSDelivr.
   *
   * @module js-data
   *
   * @example <caption>Install from NPM</caption>
   * npm i --save js-data@beta
   * @example <caption>Install from Bower</caption>
   * bower i --save js-data@3.0.0-beta.1
   * @example <caption>Install from CDN.JS</caption>
   * <script src="https://cdnjs.cloudflare.com/ajax/libs/js-data/3.0.0-beta.1/js-data.min.js"></script>
   * @example <caption>Install from JSDelivr</caption>
   * <script src="https://cdn.jsdelivr.net/js-data/3.0.0-beta.1/js-data.min.js"></script>
   * @example <caption>Load into your app via script tag</caption>
   * <script src="/path/to/js-data.min.js"></script>
   * <script>
   *   console.log(JSData.version.full); // "3.0.0-beta.1"
   * </script>
   * @example <caption>Load into your app via CommonJS</caption>
   * var JSData = require('js-data');
   * @example <caption>Load into your app via ES2015 Modules</caption>
   * import * as JSData from 'js-data';
   * @example <caption>Load into your app via AMD</caption>
   * define('myApp', ['js-data'], function (JSData) { ... })
   */

  /**
   * Describes the version of this `JSData` object.
   *
   * @example
   * console.log(JSData.version.full) // "3.0.0-beta.1"
   *
   * @name version
   * @memberof module:js-data
   * @property {string} full The full semver value.
   * @property {number} major The major version number.
   * @property {number} minor The minor version number.
   * @property {number} patch The patch version number.
   * @property {(string|boolean)} alpha The alpha version value, otherwise `false`
   * if the current version is not alpha.
   * @property {(string|boolean)} beta The beta version value, otherwise `false`
   * if the current version is not beta.
   * @since 2.0.0
   * @type {Object}
   */
  var version = {
  beta: 4,
  full: '3.0.0-beta.4',
  major: 3,
  minor: 0,
  patch: 0
};

  exports.version = version;
  exports.Collection = Collection;
  exports.Component = Component;
  exports.Container = Container;
  exports.DataStore = DataStore;
  exports.Index = Index;
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