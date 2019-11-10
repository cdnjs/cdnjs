/*!
* js-data
* @version 3.0.0-alpha.7 - Homepage <http://www.js-data.io/>
* @author Jason Dobry <jason.dobry@gmail.com>
* @copyright (c) 2014-2015 Jason Dobry
* @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
*
* @overview Robust framework-agnostic data store.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.JSData = {}));
}(this, function (exports) { 'use strict';

  var babelHelpers = {};

  babelHelpers.typeof = function (obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
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

  babelHelpers;
  /**
   * @module utils
   * @memberof module:js-data
   */

  /**
   * Return whether the provided value is an array.
   * @method
   * @param {*} [value] - The value to test.
   */
  var isArray = Array.isArray;
  /**
   * Return whether the provided value is an object type.
   * @param {*} [value] - The value to test.
   */
  function isObject(value) {
    return toString.call(value) === '[object Object]' || false;
  }
  function isPlainObject(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && value.constructor === Object;
  }
  /**
   * Return whether the provided value is a regular expression type.
   * @param {*} [value] - The value to test.
   */
  function isRegExp(value) {
    return toString.call(value) === '[object RegExp]' || false;
  }
  /**
   * Return whether the provided value is a string type.
   * @param {*} [value] - The value to test.
   */
  function isString(value) {
    return typeof value === 'string' || value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && toString.call(value) === '[object String]' || false;
  }
  /**
   * Return whether the provided value is a date type.
   * @param {*} [value] - The value to test.
   */
  function isDate(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && toString.call(value) === '[object Date]' || false;
  }
  /**
   * Return whether the provided value is a number type.
   * @param {*} [value] - The value to test.
   */
  function isNumber(value) {
    var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
    return type === 'number' || value && type === 'object' && toString.call(value) === '[object Number]' || false;
  }
  /**
   * Return whether the provided value is a boolean type.
   * @param {*} [value] - The value to test.
   */
  function isBoolean(value) {
    return toString.call(value) === '[object Boolean]';
  }
  /**
   * Return whether the provided value is a function.
   * @param {*} [value] - The value to test.
   */
  function isFunction(value) {
    return typeof value === 'function' || value && toString.call(value) === '[object Function]' || false;
  }
  /**
   * Return whether the provided value is a string or a number.
   * @param {*} [value] - The value to test.
   */
  function isSorN(value) {
    return isString(value) || isNumber(value);
  }
  /**
   * Get the value at the provided key or path.
   * @param {Object} object - The object from which to retrieve a property.
   * @param {string} prop - The key or path to the property.
   */
  function get(object, prop) {
    if (!prop) {
      return;
    }
    var parts = prop.split('.');
    var last = parts.pop();

    while (prop = parts.shift()) {
      object = object[prop];
      if (object == null) return;
    }

    return object[last];
  }
  /**
   * Unset the value at the provided key or path.
   * @param {Object} object - The object on which to unset a property.
   * @param {string} prop - The key or path to the property.
   */
  function unset(object, prop) {
    var parts = prop.split('.');
    var last = parts.pop();

    while (prop = parts.shift()) {
      object = object[prop];
      if (object == null) return;
    }

    object[last] = undefined;
    delete object[last];
  }
  function mkdirP(object, path) {
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
  }
  var PATH = /^(.+)\.(.+)$/;
  /**
   * Set the value at the provided key or path.
   * @param {Object} object - The object on which to set a property.
   * @param {(string|Object)} path - The key or path to the property. Can also
   * pass in an object of path/value pairs, which will all be set on the target
   * object.
   * @param {*} [value] - The value to set.
   */
  function _set(object, path, value) {
    if (isObject(path)) {
      forOwn(path, function (value, _path) {
        _set(object, _path, value);
      });
    } else {
      var parts = PATH.exec(path);
      if (parts) {
        mkdirP(object, parts[1])[parts[2]] = value;
      } else {
        object[path] = value;
      }
    }
  }
  /**
   * Iterate over an object's own enumerable properties.
   * @param {Object} object - The object whose properties are to be enumerated.
   * @param {Function} fn - Iteration function.
   * @param {Object} [thisArg] - Content to which to bind `fn`.
   */
  function forOwn(obj, fn, thisArg) {
    var keys = Object.keys(obj);
    var len = keys.length;
    var i = undefined;
    for (i = 0; i < len; i++) {
      fn.call(thisArg, obj[keys[i]], keys[i], obj);
    }
  }
  /**
   * Recursively shallow copy own enumberable properties from `source` to `dest`.
   * @param {Object} dest - The destination object.
   * @param {Object} source - The source object.
   */
  function deepMixIn(dest, source) {
    if (source) {
      forOwn(source, function (value, key) {
        var existing = this[key];
        if (isPlainObject(value) && isPlainObject(existing)) {
          deepMixIn(existing, value);
        } else {
          this[key] = value;
        }
      }, dest);
    }
    return dest;
  }
  /**
   * Proxy for `Promise.resolve`.
   * @param {*} [value] - Value with which to resolve the Promise.
   * @return {Promise} Promise resolved with `value`.
   */
  function resolve$1(value) {
    return Promise.resolve(value);
  }
  /**
   * Proxy for `Promise.reject`.
   * @param {*} [value] - Value with which to reject the Promise.
   * @return {Promise} Promise reject with `value`.
   */
  function reject(value) {
    return Promise.reject(value);
  }
  /**
   * Shallow copy own enumerable non-function properties from `Model` to `opts`.
   * @param {Model} Model - The source Model.
   * @param {Object} opts - The target object.
   */
  function _(Model, opts) {
    for (var key in Model) {
      var value = Model[key];
      if (opts[key] === undefined && !isFunction(value) && key && key.indexOf('_') !== 0) {
        opts[key] = value;
      }
    }
  }
  /**
   * Return the intersection of two arrays.
   * @param {Array} array1 - First array.
   * @param {Array} array2 - Second array.
   * @return {Array} Array of elements common to both arrays.
   */
  function intersection(array1, array2) {
    if (!array1 || !array2) {
      return [];
    }
    var result = [];
    var item = undefined;
    var i = undefined;
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
  }
  /**
   * Shallow copy own enumerable properties from `src` to `dest` that are on `src`
   * but are missing from `dest.
   * @param {Object} dest - The destination object.
   * @param {Object} source - The source object.
   */
  function fillIn(dest, src) {
    forOwn(src, function (value, key) {
      if (dest[key] === undefined) {
        dest[key] = value;
      }
    });
  }
  /**
   * Return whether `prop` is matched by any string or regular expression in `bl`.
   * @param {string} prop - The name of a property.
   * @param {Array} bl - Array of strings and regular expressions.
   * @return {boolean} Whether `prop` was matched.
   */
  function isBlacklisted(prop, bl) {
    if (!bl || !bl.length) {
      return false;
    }
    var matches = undefined;
    for (var i = 0; i < bl.length; i++) {
      if (Object.prototype.toString.call(bl[i]) === '[object RegExp]' && bl[i].test(prop) || bl[i] === prop) {
        matches = prop;
        return matches;
      }
    }
    return !!matches;
  }
  /**
   * Proxy for `JSON.parse`.
   * @param {string} json - JSON to parse.
   * @return {Object} Parsed object.
   */
  function fromJson(json) {
    return isString(json) ? JSON.parse(json) : json;
  }
  /**
   * Proxy for `JSON.stringify`.
   * @method
   * @param {*} value - Value to serialize to JSON.
   * @return {string} JSON string.
   */
  var toJson = JSON.stringify;
  /**
   * Deep copy a value.
   * @param {*} from - Value to deep copy.
   * @return {*} Deep copy of `from`.
   */
  function copy(from, to, stackFrom, stackTo, blacklist) {
    if (!to) {
      to = from;
      if (from) {
        if (isArray(from)) {
          to = copy(from, [], stackFrom, stackTo, blacklist);
        } else if (isDate(from)) {
          to = new Date(from.getTime());
        } else if (isRegExp(from)) {
          to = new RegExp(from.source, from.toString().match(/[^\/]*$/)[0]);
          to.lastIndex = from.lastIndex;
        } else if (isObject(from)) {
          to = copy(from, Object.create(Object.getPrototypeOf(from)), stackFrom, stackTo, blacklist);
        }
      }
    } else {
      if (from === to) {
        throw new Error('Cannot copy! Source and destination are identical.');
      }

      stackFrom = stackFrom || [];
      stackTo = stackTo || [];

      if (isObject(from)) {
        var index = stackFrom.indexOf(from);
        if (index !== -1) {
          return stackTo[index];
        }

        stackFrom.push(from);
        stackTo.push(to);
      }

      var result = undefined;
      if (isArray(from)) {
        var i = undefined;
        to.length = 0;
        for (i = 0; i < from.length; i++) {
          result = copy(from[i], null, stackFrom, stackTo, blacklist);
          if (isObject(from[i])) {
            stackFrom.push(from[i]);
            stackTo.push(result);
          }
          to.push(result);
        }
      } else {
        if (isArray(to)) {
          to.length = 0;
        } else {
          forOwn(to, function (value, key) {
            delete to[key];
          });
        }
        for (var key in from) {
          if (from.hasOwnProperty(key)) {
            if (isBlacklisted(key, blacklist)) {
              continue;
            }
            result = copy(from[key], null, stackFrom, stackTo, blacklist);
            if (isObject(from[key])) {
              stackFrom.push(from[key]);
              stackTo.push(result);
            }
            to[key] = result;
          }
        }
      }
    }
    return to;
  }
  var SPLIT = /\s+/;
  var NON_ALPHA = /[^A-Za-z]/g;
  var PASCAL_CASE = /(\w)(\w*)/g;
  function pascalize(g0, g1, g2) {
    return '' + g1.toUpperCase() + g2.toLowerCase();
  }
  function mapToPascal(x) {
    return x.replace(NON_ALPHA, '').replace(PASCAL_CASE, pascalize);
  }
  /**
   * Convert a string to pascalcase.
   * @param {string} str - String to convert.
   * @return {string} Converted string.
   */
  function pascalCase(str) {
    return str.split(SPLIT).map(mapToPascal).join('');
  }
  /**
   * Convert a string to camelcase.
   * @param {string} str - String to convert.
   * @return {string} Converted string.
   */
  function camelCase(str) {
    str = pascalCase(str);
    if (str) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return str;
  }
  /**
   * Add eventing capabilities into the target object.
   * @param {Object} target - Target object.
   * @param {Function} [getter] - Custom getter for retrieving the object's event
   * listeners.
   * @param {Function} [setter] - Custom setter for setting the object's event
   * listeners.
   */
  function eventify(target, getter, setter, enumerable) {
    target = target || this;
    var _events = {};
    if (!getter && !setter) {
      getter = function () {
        return _events;
      };
      setter = function (value) {
        _events = value;
      };
    }
    Object.defineProperties(target, {
      on: {
        enumerable: !!enumerable,
        value: function value(type, func, ctx) {
          if (!getter.call(this)) {
            setter.call(this, {});
          }
          var events = getter.call(this);
          events[type] = events[type] || [];
          events[type].push({
            f: func,
            c: ctx
          });
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
      emit: {
        enumerable: !!enumerable,
        value: function value() {
          var events = getter.call(this) || {};

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var type = args.shift();
          var listeners = events[type] || [];
          var i = undefined;
          for (i = 0; i < listeners.length; i++) {
            listeners[i].f.apply(listeners[i].c, args);
          }
          listeners = events.all || [];
          args.unshift(type);
          for (i = 0; i < listeners.length; i++) {
            listeners[i].f.apply(listeners[i].c, args);
          }
        }
      }
    });
  }

  // RiveraGroup/node-tiny-uuid
  // DO WTF YOU WANT TO PUBLIC LICENSE
  function uuid(a, b) {
    for (b = a = ''; // b - result , a - numeric variable
    a++ < 36; b += a * 51 & 52 // if "a" is not 9 or 14 or 19 or 24
    ? //  return a random number or 4
    (a ^ 15 // if "a" is not 15
    ? // genetate a random number from 0 to 15
    8 ^ Math.random() * (a ^ 20 ? 16 : 4) // unless "a" is 20, in which case a random number from 8 to 11
    : 4 //  otherwise 4
    ).toString(16) : '-' //  in other cases (if "a" is 9,14,19,24) insert "-"
    ) {}
    return b;
  }

  function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : babelHelpers.typeof(call)) === 'object' || typeof call === 'function') ? call : self;
  }

  function addHiddenPropsToTarget(target, props) {
    forOwn(props, function (value, key) {
      props[key] = {
        value: value
      };
    });
    Object.defineProperties(target, props);
  }

  var _utils = Object.freeze({
    isArray: isArray,
    isObject: isObject,
    isRegExp: isRegExp,
    isString: isString,
    isDate: isDate,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isSorN: isSorN,
    get: get,
    unset: unset,
    set: _set,
    forOwn: forOwn,
    deepMixIn: deepMixIn,
    resolve: resolve$1,
    reject: reject,
    _: _,
    intersection: intersection,
    fillIn: fillIn,
    isBlacklisted: isBlacklisted,
    fromJson: fromJson,
    toJson: toJson,
    copy: copy,
    pascalCase: pascalCase,
    camelCase: camelCase,
    eventify: eventify,
    uuid: uuid,
    classCallCheck: classCallCheck,
    possibleConstructorReturn: possibleConstructorReturn,
    addHiddenPropsToTarget: addHiddenPropsToTarget
  });

  /**
   * A class used by the @{link Collection} class to build queries to be executed
   * against the collection's data. An instance of `Query` is returned by
   * {@link Model.query} and {@link Collection.query}.
   * @class Query
   * @param {Collection} collection - The collection on which this query operates.
   */
  function Query(collection) {
    classCallCheck(this, Query);

    /**
     * The collection on which this query operates.
     * @type {Collection}
     */
    this.collection = collection;
    /**
     * The data result of this query.
     * @type {Array}
     */
    this.data = null;
  }

  var reserved = {
    skip: '',
    offset: '',
    where: '',
    limit: '',
    orderBy: '',
    sort: ''
  };

  function compare(orderBy, index, a, b) {
    var def = orderBy[index];
    var cA = get(a, def[0]);
    var cB = get(b, def[0]);
    if (cA && isString(cA)) {
      cA = cA.toUpperCase();
    }
    if (cB && isString(cB)) {
      cB = cB.toUpperCase();
    }
    if (def[1] === 'DESC') {
      if (cB < cA) {
        return -1;
      } else if (cB > cA) {
        return 1;
      } else {
        if (index < orderBy.length - 1) {
          return compare(orderBy, index + 1, a, b);
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
          return compare(orderBy, index + 1, a, b);
        } else {
          return 0;
        }
      }
    }
  }

  var escapeRegExp = /([.*+?^=!:${}()|[\]\/\\])/g;
  var percentRegExp = /%/g;
  var underscoreRegExp = /_/g;

  function escape(pattern) {
    return pattern.replace(escapeRegExp, '\\$1');
  }

  function like(pattern, flags) {
    return new RegExp('^' + escape(pattern).replace(percentRegExp, '.*').replace(underscoreRegExp, '.') + '$', flags);
  }

  function evaluate(value, op, predicate) {
    switch (op) {
      case '==':
        return value == predicate; // eslint-disable-line
      case '===':
        return value === predicate;
      case '!=':
        return value != predicate; // eslint-disable-line
      case '!==':
        return value !== predicate;
      case '>':
        return value > predicate;
      case '>=':
        return value >= predicate;
      case '<':
        return value < predicate;
      case '<=':
        return value <= predicate;
      case 'isectEmpty':
        return !intersection(value || [], predicate || []).length;
      case 'isectNotEmpty':
        return intersection(value || [], predicate || []).length;
      case 'in':
        return predicate.indexOf(value) !== -1;
      case 'notIn':
        return predicate.indexOf(value) === -1;
      case 'contains':
        return (value || []).indexOf(predicate) !== -1;
      case 'notContains':
        return (value || []).indexOf(predicate) === -1;
      default:
        if (op.indexOf('like') === 0) {
          return like(predicate, op.substr(4)).exec(value) !== null;
        } else if (op.indexOf('notLike') === 0) {
          return like(predicate, op.substr(7)).exec(value) === null;
        }
    }
  }

  addHiddenPropsToTarget(Query.prototype, {
    /**
     * Return the current data result of this query.
     * @memberof Query
     * @instance
     * @return {Array} The data in this query.
     */

    getData: function getData() {
      if (!this.data) {
        this.data = this.collection.index.getAll();
      }
      return this.data;
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
     * @memberof Query
     * @instance
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
      opts || (opts = {});
      var collection = this.collection;
      var index = opts.index ? collection.indexes[opts.index] : collection.index;
      if (this.data) {
        throw new Error('Cannot access index after first operation!');
      }
      this.data = index.between(leftKeys, rightKeys, opts);
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
     * @memberof Query
     * @instance
     * @param {Array} keyList - Key(s) defining the entity to retrieve. If
     * `keyList` is not an array (i.e. for a single-value key), it will be
     * wrapped in an array.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.string] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Query} A reference to itself for chaining.
     */
    get: function get() {
      var keyList = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var opts = arguments[1];

      opts || (opts = {});
      if (this.data) {
        throw new Error('Cannot access index after first operation!');
      }
      if (keyList && !isArray(keyList)) {
        keyList = [keyList];
      }
      if (!keyList.length) {
        this.getData();
        return this;
      }
      var collection = this.collection;
      var index = opts.index ? collection.indexes[opts.index] : collection.index;
      this.data = index.get(keyList);
      return this;
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
     * @memberof Query
     * @instance
     * @param {...Array} [keyList] - Provide one or more keyLists, and all
     * entities matching each keyList will be retrieved. If no keyLists are
     * provided, all entities will be returned.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Query} A reference to itself for chaining.
     */
    getAll: function getAll() {
      var _this = this;

      var opts = {};
      if (this.data) {
        throw new Error('Cannot access index after first operation!');
      }

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!args.length || args.length === 1 && isObject(args[0])) {
        this.getData();
        return this;
      } else if (args.length && isObject(args[args.length - 1])) {
        opts = args[args.length - 1];
        args.pop();
      }
      var collection = this.collection;
      var index = opts.index ? collection.indexes[opts.index] : collection.index;
      this.data = [];
      args.forEach(function (keyList) {
        _this.data = _this.data.concat(index.get(keyList));
      });
      return this;
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
     * @memberof Query
     * @instance
     * @param {(Object|Function)} [queryOrFn={}] - Selection query or filter
     * function.
     * @param {Function} [thisArg] - Context to which to bind `queryOrFn` if
     * `queryOrFn` is a function.
     * @return {Query} A reference to itself for chaining.
     */
    filter: function filter(query, thisArg) {
      var _this2 = this;

      query || (query = {});
      this.getData();
      if (isObject(query)) {
        (function () {
          var where = {};
          // Filter
          if (isObject(query.where)) {
            where = query.where;
          }
          forOwn(query, function (value, key) {
            if (!(key in reserved) && !(key in where)) {
              where[key] = {
                '==': value
              };
            }
          });

          var fields = [];
          var ops = [];
          var predicates = [];
          forOwn(where, function (clause, field) {
            if (!isObject(clause)) {
              clause = {
                '==': clause
              };
            }
            forOwn(clause, function (expr, op) {
              fields.push(field);
              ops.push(op);
              predicates.push(expr);
            });
          });
          if (fields.length) {
            (function () {
              var i = undefined;
              var len = fields.length;
              _this2.data = _this2.data.filter(function (item) {
                var first = true;
                var keep = true;

                for (i = 0; i < len; i++) {
                  var op = ops[i];
                  var isOr = op.charAt(0) === '|';
                  op = isOr ? op.substr(1) : op;
                  var expr = evaluate(get(item, fields[i]), op, predicates[i]);
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

          if (isString(orderBy)) {
            orderBy = [[orderBy, 'ASC']];
          }
          if (!isArray(orderBy)) {
            orderBy = null;
          }

          // Apply 'orderBy'
          if (orderBy) {
            (function () {
              var index = 0;
              orderBy.forEach(function (def, i) {
                if (isString(def)) {
                  orderBy[i] = [def, 'ASC'];
                }
              });
              _this2.data.sort(function (a, b) {
                return compare(orderBy, index, a, b);
              });
            })();
          }

          // Skip
          if (isNumber(query.skip)) {
            _this2.skip(query.skip);
          } else if (isNumber(query.offset)) {
            _this2.skip(query.offset);
          }
          // Limit
          if (isNumber(query.limit)) {
            _this2.limit(query.limit);
          }
        })();
      } else if (isFunction(query)) {
        this.data = this.data.filter(query, thisArg);
      }
      return this;
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
     * @memberof Query
     * @instance
     * @param {number} num - The number of entities to skip.
     * @return {Query} A reference to itself for chaining.
     */
    skip: function skip(num) {
      if (!isNumber(num)) {
        throw new TypeError('skip: Expected number but found ' + (typeof num === 'undefined' ? 'undefined' : babelHelpers.typeof(num)) + '!');
      }
      var data = this.getData();
      if (num < data.length) {
        this.data = data.slice(num);
      } else {
        this.data = [];
      }
      return this;
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
     * @memberof Query
     * @instance
     * @param {number} num - The maximum number of entities to keep in the result.
     * @return {Query} A reference to itself for chaining.
     */
    limit: function limit(num) {
      if (!isNumber(num)) {
        throw new TypeError('limit: Expected number but found ' + (typeof num === 'undefined' ? 'undefined' : babelHelpers.typeof(num)) + '!');
      }
      var data = this.getData();
      this.data = data.slice(0, Math.min(data.length, num));
      return this;
    },

    /**
     * Iterate over all entities.
     *
     * @memberof Query
     * @instance
     * @param {Function} forEachFn - Iteration function.
     * @param {*} [thisArg] - Context to which to bind `forEachFn`.
     * @return {Query} A reference to itself for chaining.
     */
    forEach: function forEach(forEachFn, thisArg) {
      this.getData().forEach(forEachFn, thisArg);
      return this;
    },

    /**
     * Apply a mapping function to the result data.
     *
     * @memberof Query
     * @instance
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
     * @memberof Query
     * @instance
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
     * @memberof Query
     * @instance
     * @return {Array} The result of executing this query.
     */
    run: function run() {
      var data = this.data;
      this.data = null;
      return data;
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
    var compared = undefined;
    var mid = undefined;

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

  var blacklist = { '>': 1, '>=': 1, '<': 1, '<=': 1 };

  function Index(fieldList, opts) {
    classCallCheck(this, Index);
    fieldList || (fieldList = []);

    if (!isArray(fieldList)) {
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

  addHiddenPropsToTarget(Index.prototype, {
    set: function set(keyList, value) {
      if (!isArray(keyList)) {
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
    get: function get(keyList) {
      if (!isArray(keyList)) {
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
    query: function query(_query) {
      var leftKeys = undefined;
      var rightKeys = undefined;

      if (_query['>']) {
        leftKeys = _query['>'];
        _query.leftInclusive = false;
      } else if (_query['>=']) {
        leftKeys = _query['>='];
        _query.leftInclusive = true;
      }

      if (_query['<']) {
        rightKeys = _query['<'];
        _query.rightInclusive = false;
      } else if (_query['<=']) {
        rightKeys = _query['<='];
        _query.rightInclusive = true;
      }

      if (leftKeys.length !== rightKeys.length) {
        throw new Error('Key arrays must be same length');
      }

      var _opts = {};
      forOwn(_query, function (value, key) {
        if (!blacklist[key]) {
          _opts[key] = value;
        }
      });
      return this.between(leftKeys, rightKeys, _opts);
    },
    between: function between(leftKeys, rightKeys) {
      var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      if (!isArray(leftKeys)) {
        leftKeys = [leftKeys];
      }
      if (!isArray(rightKeys)) {
        rightKeys = [rightKeys];
      }
      fillIn(opts, {
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

      var pos = undefined;

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
        for (var i = pos.index; i < this.keys.length; i += 1) {
          var currKey = this.keys[i];
          if (currKey > rightKey) {
            break;
          }

          if (this.values[i].isIndex) {
            if (currKey === leftKey) {
              results = results.concat(this.values[i]._between(copy(leftKeys), rightKeys.map(function () {
                return undefined;
              }), opts));
            } else if (currKey === rightKey) {
              results = results.concat(this.values[i]._between(leftKeys.map(function () {
                return undefined;
              }), copy(rightKeys), opts));
            } else {
              results = results.concat(this.values[i].getAll());
            }
          } else {
            results = results.concat(this.values[i]);
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
    remove: function remove(keyList, value) {
      if (!isArray(keyList)) {
        keyList = [keyList];
      }

      var key = keyList.shift();
      var pos = binarySearch(this.keys, key);

      if (keyList.length === 0) {
        if (pos.found) {
          var dataLocation = binarySearch(this.values[pos.index], value, this.hashCode);
          if (dataLocation.found) {
            removeAt(this.values[pos.index], dataLocation.index);
            if (this.values[pos.index].length === 0) {
              removeAt(this.keys, pos.index);
              removeAt(this.values, pos.index);
            }
          }
        }
      } else {
        if (pos.found) {
          this.values[pos.index].delete(keyList, value);
        }
      }
    },
    clear: function clear() {
      this.keys = [];
      this.values = [];
    },
    insertRecord: function insertRecord(data) {
      var keyList = this.fieldList.map(function (field) {
        if (isFunction(field)) {
          return field(data) || null;
        } else {
          return data[field] || null;
        }
      });
      this.set(keyList, data);
    },
    removeRecord: function removeRecord(data) {
      var _this = this;

      var removed = undefined;
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

  /**
   * @class Collection
   * @param {Array} [data=[]] - Initial set of entities to insert into the
   * collection.
   * @param {string} [idAttribute='id'] - Field to use as the unique identifier
   * of each entity in the collection.
   */
  function Collection() {
    var _this = this;

    var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var idAttribute = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    classCallCheck(this, Collection);
    if (!isArray(data)) {
      throw new TypeError('new Collection([data]): data: Expected array. Found ' + (typeof data === 'undefined' ? 'undefined' : babelHelpers.typeof(data)));
    }
    /**
     * Field to use as the unique identifier for each entity in this collection.
     * @type {string}
     */
    this.idAttribute = idAttribute;

    /**
     * The main index, which uses @{link Collection#idAttribute} as the key.
     * @type {Index}
     */
    this.index = new Index([idAttribute], {
      hashCode: function hashCode(obj) {
        return get(obj, idAttribute);
      }
    });
    /**
     * Object that holds the other secondary indexes of this collection.
     * @type {Object.<string, Index>}
     */
    this.indexes = {};
    data.forEach(function (record) {
      _this.index.insertRecord(record);
      if (record && isFunction(record.on)) {
        record.on('all', _this._onModelEvent, _this);
      }
    });
  }

  addHiddenPropsToTarget(Collection.prototype, {
    _onModelEvent: function _onModelEvent() {
      this.emit.apply(this, arguments);
    },

    /**
     * Create a new secondary index on the contents of the collection.
     *
     * #### Example
     *
     * Index users by age
     * ```js
     * collection.createIndex('age')
     * ```
     * Index users by status and role
     * ```js
     * collection.createIndex('statusAndRole', ['status', 'role'])
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {string} name - The name of the new secondary index.
     * @param {string[]} [fieldList] - Array of field names to use as the key or
     * compound key of the new secondary index. If no fieldList is provided, then
     * the name will also be the field that is used to index the collection.
     * @return {Collection} A reference to itself for chaining.
     */
    createIndex: function createIndex(name, fieldList, opts) {
      if (isString(name) && fieldList === undefined) {
        fieldList = [name];
      }
      opts || (opts = {});
      var idAttribute = this.idAttribute;
      opts.hashCode = opts.hashCode || function (obj) {
        return get(obj, idAttribute);
      };
      var index = this.indexes[name] = new Index(fieldList, opts);
      this.index.visitAll(index.insertRecord, index);
      return this;
    },

    /**
     * Create a new query to be executed against the contents of the collection.
     * The result will be all or a subset of the contents of the collection.
     *
     * #### Example
     *
     * Grab page 2 of users between ages 18 and 30
     * ```js
     * collection.query()
     *   .between(18, 30, { index: 'age' }) // between ages 18 and 30
     *   .skip(10) // second page
     *   .limit(10) // page size
     *   .run()
     * ```
     *
     * @memberof Collection
     * @instance
     * @return {Query} New query object.
     */
    query: function query() {
      return new Query(this);
    },

    /**
     * Find all entities between two boundaries.
     *
     * Shortcut for `collection.query().between(18, 30, { index: 'age' }).run()`
     *
     * Get all users ages 18 to 30
     * ```js
     * const users = collection.between(18, 30, { index: 'age' })
     * ```
     * Same as above
     * ```js
     * const users = collection.between([18], [30], { index: 'age' })
     * ```
     *
     * @memberof Collection
     * @instance
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
     * @return {Array} The result.
     */
    between: function between(leftKeys, rightKeys, opts) {
      return this.query().between(leftKeys, rightKeys, opts).run();
    },

    /**
     * Find the entity or entities that match the provided key.
     *
     * Shortcut for `collection.query().get(keyList).run()`
     *
     * #### Example
     *
     * Get the entity whose primary key is 25
     * ```js
     * const entities = collection.get(25)
     * ```
     * Same as above
     * ```js
     * const entities = collection.get([25])
     * ```
     * Get all users who are active and have the "admin" role
     * ```js
     * const activeAdmins = collection.get(['active', 'admin'], {
     *   index: 'activityAndRoles'
     * })
     * ```
     * Get all entities that match a certain weather condition
     * ```js
     * const niceDays = collection.get(['sunny', 'humid', 'calm'], {
     *   index: 'weatherConditions'
     * })
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {Array} keyList - Key(s) defining the entity to retrieve. If
     * `keyList` is not an array (i.e. for a single-value key), it will be
     * wrapped in an array.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.string] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Array} The result.
     */
    get: function get(keyList, opts) {
      return this.query().get(keyList, opts).run();
    },

    /**
     * Find the entity or entities that match the provided keyLists.
     *
     * Shortcut for `collection.query().getAll(keyList1, keyList2).run()`
     *
     * #### Example
     *
     * Get the posts where "status" is "draft" or "inReview"
     * ```js
     * const posts = collection.getAll('draft', 'inReview', { index: 'status' })
     * ```
     * Same as above
     * ```js
     * const posts = collection.getAll(['draft'], ['inReview'], { index: 'status' })
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {...Array} [keyList] - Provide one or more keyLists, and all
     * entities matching each keyList will be retrieved. If no keyLists are
     * provided, all entities will be returned.
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
     * Find the entity or entities that match the provided query or pass the
     * provided filter function.
     *
     * Shortcut for `collection.query().filter(queryOrFn[, thisArg]).run()`
     *
     * #### Example
     *
     * Get the draft posts created less than three months
     * ```js
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
     * ```
     * Use a custom filter function
     * ```js
     * const posts = collection.filter(function (post) {
     *   return post.isReady()
     * })
     * ```
     *
     * @memberof Collection
     * @instance
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
     * Skip a number of results.
     *
     * Shortcut for `collection.query().skip(numberToSkip).run()`
     *
     * #### Example
     *
     * ```js
     * const posts = collection.skip(10)
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {number} num - The number of entities to skip.
     * @return {Array} The result.
     */
    skip: function skip(num) {
      return this.query().skip(num).run();
    },

    /**
     * Limit the result.
     *
     * Shortcut for `collection.query().limit(maximumNumber).run()`
     *
     * #### Example
     *
     * ```js
     * const posts = collection.limit(10)
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {number} num - The maximum number of entities to keep in the result.
     * @return {Array} The result.
     */
    limit: function limit(num) {
      return this.query().limit(num).run();
    },

    /**
     * Iterate over all entities.
     *
     * #### Example
     *
     * ```js
     * collection.forEach(function (entity) {
     *   // do something
     * })
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {Function} forEachFn - Iteration function.
     * @param {*} [thisArg] - Context to which to bind `forEachFn`.
     * @return {Array} The result.
     */
    forEach: function forEach(cb, thisArg) {
      this.index.visitAll(cb, thisArg);
    },

    /**
     * Reduce the data in the collection to a single value and return the result.
     *
     * #### Example
     *
     * ```js
     * const totalVotes = collection.reduce(function (prev, entity) {
     *   return prev + entity.upVotes + entity.downVotes
     * }, 0)
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {Function} cb - Reduction callback.
     * @param {*} initialValue - Initial value of the reduction.
     * @return {*} The result.
     */
    reduce: function reduce(cb, initialValue) {
      var data = this.getAll();
      return data.reduce(cb, initialValue);
    },

    /**
     * Apply a mapping function to all entities.
     *
     * #### Example
     *
     * ```js
     * const names = collection.map(function (user) {
     *   return user.name
     * })
     * ```
     *
     * @memberof Collection
     * @instance
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
     * Instead a record into this collection, updating all indexes with the new
     * record.
     * one index.
     * @memberof Collection
     * @instance
     * @param {Object} record - The record to insert.
     */
    insert: function insert(record) {
      this.index.insertRecord(record);
      forOwn(this.indexes, function (index, name) {
        index.insertRecord(record);
      });
      if (record && isFunction(record.on)) {
        record.on('all', this._onModelEvent, this);
        this.emit('add', record);
      }
    },

    /**
     * Update the given record's position in all indexes of this collection. See
     * {@link Collection#updateRecord} to update a record's in only one of the
     * indexes.
     * @memberof Collection
     * @instance
     * @param {Object} record - The record to update.
     */
    update: function update(record) {
      this.index.updateRecord(record);
      forOwn(this.indexes, function (index, name) {
        index.updateRecord(record);
      });
    },

    /**
     * Remove the given record from all indexes in this collection.
     * @memberof Collection
     * @instance
     * @param {Object} record - The record to be removed.
     */
    remove: function remove(record) {
      this.index.removeRecord(record);
      forOwn(this.indexes, function (index, name) {
        index.removeRecord(record);
      });
      if (record && isFunction(record.off)) {
        record.off('all', this._onModelEvent, this);
        this.emit('remove', record);
      }
    },

    /**
     * Update a record's position in a single index of this collection. See
     * {@link Collection#update} to update a record's position in all indexes at
     * once.
     * @memberof Collection
     * @instance
     * @param {Object} record - The record to update.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] The index in which to update the record's
     * position. If you don't specify an index then the record will be updated
     * in the main index.
     */
    updateRecord: function updateRecord(record, opts) {
      opts || (opts = {});
      var index = opts.index ? this.indexes[opts.index] : this.index;
      index.updateRecord(record);
    },

    /**
     * Return the result of calling the specified function on each item in this
     * collection's main index.
     * @memberof Collection
     * @instance
     * @param {string} funcName - Name of function to call
     * @parama {...*} [args] - Remaining arguments to be passed to the function.
     * @return {Array} The result.
     */
    mapCall: function mapCall(funcName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var data = [];
      this.index.visitAll(function (item) {
        data.push(item[funcName].apply(item, args));
      });
      return data;
    }
  });

  eventify(Collection.prototype, function () {
    return this._events;
  }, function (value) {
    this._events = value;
  });

  var op = 'belongsTo';

  /**
   * Steps to apply a "belongsTo" relationship
   * 1. Choose the localField and localKey
   * 2. Configure property descriptor, possibly including custom getter/setter
   * 3. Add property to prototype of target Model
   *
   * The added property is where an instance of the related Model will be
   * attached to an instance of the target Model, e.g. if Comment belongsTo
   * User and "localField" is set to "user", "comment.user" will be a reference to
   * the user.
   *
   * @ignore
   */
  function applyBelongsTo(Model, Relation, opts) {
    opts || (opts = {});
    // Choose field where the relation will be attached
    var localField = opts.localField = opts.localField || Relation.name.toLowerCase();
    // Choose field that holds the primary key of the relation
    var localKey = opts.localKey = opts.localKey || Relation.name.toLowerCase() + '_id';

    // Setup configuration of the property
    var descriptor = {
      // Whether the field specified by "localField" will show up in "for...in"
      enumerable: opts.enumerable !== undefined ? !!opts.enumerable : false,
      // Set default method for retrieving the linked relation
      get: function get$$() {
        if (!this._get('$')) {
          return this._get('links.' + localField);
        }
        var key = get(this, localKey);
        var item = key !== undefined ? Relation.get(key) : undefined;
        this._set('links.' + localField, item);
        return item;
      },

      // Set default method for setting the linked relation
      set: function set(parent) {
        this._set('links.' + localField, parent);
        _set(this, localKey, parent[Relation.idAttribute]);
        return get(this, localField);
      }
    };

    var originalGet = descriptor.get;
    var originalSet = descriptor.set;

    // Check whether the relation shouldn't actually be linked via a getter
    if (opts.link === false || opts.link === undefined && !Model.linkRelations) {
      delete descriptor.get;
      delete descriptor.set;
      descriptor.writable = true;
    }

    // Check for user-defined getter
    if (opts.get) {
      // Set user-defined getter
      descriptor.get = function () {
        var _this = this;

        // Call user-defined getter, passing in:
        //  - target Model
        //  - related Model
        //  - instance of target Model
        //  - the original getter function, in case the user wants to use it
        return opts.get(Model, Relation, this, function () {
          return originalGet.call(_this);
        });
      };
      delete descriptor.writable;
    }

    // Check for user-defined setter
    if (opts.set) {
      // Set user-defined setter
      descriptor.set = function (parent) {
        var _this2 = this;

        // Call user-defined getter, passing in:
        //  - target Model
        //  - related Model
        //  - instance of target Model
        //  - instance of related Model
        //  - the original setter function, in case the user wants to use it
        return opts.set(Model, Relation, this, parent, function (value) {
          return originalSet.call(_this2, value === undefined ? parent : value);
        });
      };
      delete descriptor.writable;
    }

    if (descriptor.get) {
      descriptor.set || (descriptor.set = function () {});
    }

    // Finally, added property to prototype of target Model
    Object.defineProperty(Model.prototype, localField, descriptor);
    Object.defineProperty(Model.prototype, localKey, {
      configurable: true,
      enumerable: true,
      get: function get$$() {
        return this._get('props.' + localKey);
      },
      set: function set(value) {
        this._set('props.' + localKey, value);
        if (this._get('$')) {
          Model.getCollection().indexes[localKey].updateRecord(this, { index: localKey });
        }
      }
    });

    if (!Model.relationList) {
      Model.relationList = [];
    }
    if (!Model.relationFields) {
      Model.relationFields = [];
    }
    opts.type = 'belongsTo';
    opts.name = Model.name;
    opts.relation = Relation.name;
    opts.Relation = Relation;
    Model.relationList.push(opts);
    Model.relationFields.push(localField);
    Model.getCollection().createIndex(localKey);

    // Return target Model for chaining
    return Model;
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {belongsTo, Model} from 'js-data'
   * class User extends Model {}
   *
   * // @belongsTo(User) (ES7)
   * class Comment extends Model {}
   * belongsTo(User)(Comment)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend({}, { name: 'User' })
   * var Comment = JSDataModel.extend({}, { name: 'Comment' })
   * JSData.belongsTo(User)(Comment)
   *
   * @param {Model} Model - The Model the target belongs to.
   * @param {Object} [opts] - Configuration options.
   * @param {string} [opts.localField] - The field on the target where the relation
   * will be attached.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function belongsTo(Model, opts) {
    return function (target) {
      target.dbg(op, 'Model:', Model, 'opts:', opts);
      return applyBelongsTo(target, Model, opts);
    };
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {configure, Model} from 'js-data'
   *
   * // @configure(opts) (ES7)
   * class User extends JSData.Model {}
   * configure(opts)(User)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend()
   * User.configure(opts)
   *
   * @param {Object} opts - Properties to apply to the target.
   * @param {boolean} [overwrite=true] - Whether to overwrite properties that
   * already exist on the target.
   */
  function configure(opts) {
    var overwrite = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    opts = opts || {};
    return function (target) {
      forOwn(opts, function (value, key) {
        if (target[key] === undefined || overwrite) {
          target[key] = copy(value);
        }
      });
      return target;
    };
  }

  var op$1 = 'hasMany';

  /**
   * Steps to apply a "hasMany" relationship
   * 1. Choose the localField and foreignKey or localKeys
   * 2. Configure property descriptor, possibly including custom getter/setter
   * 3. Add property to prototype of target Model
   *
   * The added property is where instances of the related Model will be
   * attached to an instance of the target Model, e.g. if User hasMany Comment
   * and "localField" is set to "comments", "user.comments" will be a reference to
   * the array of comments.
   *
   * @ignore
   */
  function applyHasMany(target, Relation, opts) {
    opts || (opts = {});
    // Choose field where the relation will be attached
    var localField = opts.localField = opts.localField || camelCase(Relation.name) + 'Collection';
    // Choose field on related instances that holds the primary key of instances
    // of the target Model
    var foreignKey = opts.foreignKey;
    var localKeys = opts.localKeys;
    var foreignKeys = opts.foreignKeys;

    if (!foreignKey && !localKeys && !foreignKeys) {
      foreignKey = opts.foreignKey = camelCase(target.name) + '_id';
    }
    if (foreignKey) {
      Relation.getCollection().createIndex(foreignKey);
    }

    // Setup configuration of the property
    var descriptor = {
      // Whether the field specified by "localField" will show up in "for...in"
      enumerable: opts.enumerable !== undefined ? !!opts.enumerable : false,
      // Set default method for retrieving the linked relation
      get: function get$$() {
        if (!this._get('$')) {
          return this._get('links.' + localField);
        }
        var query = {};
        var items = undefined;
        if (foreignKey) {
          // Make a FAST retrieval of the relation using a secondary index
          items = Relation.getAll(get(this, target.idAttribute), { index: foreignKey });
        } else if (localKeys) {
          var keys = get(this, localKeys) || [];
          var args = isArray(keys) ? keys : Object.keys(keys);
          // Make a slower retrieval using the ids in the "localKeys" array
          items = Relation.getAll.apply(Relation, args);
        } else if (foreignKeys) {
          _set(query, 'where.' + foreignKeys + '.contains', get(this, target.idAttribute));
          // Make a much slower retrieval
          items = Relation.filter(query);
        }
        this._set('links.' + localField, items);
        return items;
      },

      // Set default method for setting the linked relation
      set: function set(children) {
        var _this = this;

        this._set('links.' + localField, children);
        if (children && children.length) {
          (function () {
            var id = get(_this, target.idAttribute);
            if (foreignKey) {
              children.forEach(function (child) {
                _set(child, foreignKey, id);
              });
            } else if (localKeys) {
              (function () {
                var keys = [];
                children.forEach(function (child) {
                  keys.push(get(child, Relation.idAttribute));
                });
                _set(_this, localKeys, keys);
              })();
            } else if (foreignKeys) {
              children.forEach(function (child) {
                var keys = get(child, foreignKeys);
                if (keys) {
                  if (keys.indexOf(id) === -1) {
                    keys.push(id);
                  }
                } else {
                  _set(child, foreignKeys, [id]);
                }
              });
            }
          })();
        }
        return get(this, localField);
      }
    };

    var originalGet = descriptor.get;
    var originalSet = descriptor.set;

    // Check whether the relation shouldn't actually be linked via a getter
    if (opts.link === false || opts.link === undefined && !target.linkRelations) {
      delete descriptor.get;
      delete descriptor.set;
      descriptor.writable = true;
    }

    // Check for user-defined getter
    if (opts.get) {
      // Set user-defined getter
      descriptor.get = function () {
        var _this2 = this;

        // Call user-defined getter, passing in:
        //  - target Model
        //  - related Model
        //  - instance of target Model
        //  - the original getter function, in case the user wants to use it
        return opts.get(target, Relation, this, function () {
          return originalGet.call(_this2);
        });
      };
    }

    // Check for user-defined setter
    if (opts.set) {
      // Set user-defined setter
      descriptor.set = function (children) {
        var _this3 = this;

        // Call user-defined getter, passing in:
        //  - target Model
        //  - related Model
        //  - instance of target Model
        //  - instances of related Model
        //  - the original setter function, in case the user wants to use it
        return opts.set(target, Relation, this, children, function (value) {
          return originalSet.call(_this3, value === undefined ? children : value);
        });
      };
    }

    // Finally, added property to prototype of target Model
    Object.defineProperty(target.prototype, localField, descriptor);

    if (!target.relationList) {
      target.relationList = [];
    }
    if (!target.relationFields) {
      target.relationFields = [];
    }
    opts.type = 'hasMany';
    opts.name = target.name;
    opts.relation = Relation.name;
    opts.Relation = Relation;
    target.relationList.push(opts);
    target.relationFields.push(localField);

    // Return target Model for chaining
    return target;
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {hasMany, Model} from 'js-data'
   * class Comment extends Model {}
   *
   * // @hasMany(Comment)
   * class User extends Model {}
   * hasMany(Comment)(User)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend({}, { name: 'User' })
   * var Comment = JSDataModel.extend({}, { name: 'Comment' })
   * JSData.hasMany(User)(Comment)
   *
   * @param {Model} Model - The Model of which the target has many.
   * @param {Object} [opts] - Configuration options.
   * @param {string} [opts.localField] - The field on the target where the relation
   * will be attached.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function hasMany(Model, opts) {
    return function (target) {
      target.dbg(op$1, 'Model:', Model, 'opts:', opts);
      return applyHasMany(target, Model, opts);
    };
  }

  var op$2 = 'hasOne';

  /**
   * Steps to apply a "hasOne" relationship
   * 1. Choose the foreignKey and localKey
   * 2. Configure property descriptor, possibly including custom getter/setter
   * 3. Add property to prototype of target Model
   *
   * The added property is where an instance of the related Model will be
   * attached to an instance of the target Model, e.g. if User hasOne
   * Profile and "localField" is set to "profile", "user.profile" will be a
   * reference to the profile.
   *
   * @ignore
   */
  function applyHasOne(Model, Relation, opts) {
    opts || (opts = {});
    // Choose field where the relation will be attached
    var localField = opts.localField = opts.localField || camelCase(Relation.name);
    // Choose field that holds the primary key of the relation
    var foreignKey = opts.foreignKey = opts.foreignKey || camelCase(Model.name) + 'Id';

    // Setup configuration of the property
    var descriptor = {
      // Whether the field specified by "localField" will show up in "for...in"
      enumerable: opts.enumerable !== undefined ? !!opts.enumerable : false,
      // Set default method for retrieving the linked relation
      get: function get$$() {
        if (!this._get('$')) {
          return this._get('links.' + localField);
        }
        var items = Relation.getAll(get(this, Model.idAttribute), { index: foreignKey });
        var item = items && items.length ? items[0] : undefined;
        this._set('links.' + localField, item);
        return item;
      },

      // Set default method for setting the linked relation
      set: function set(child) {
        this._set('links.' + localField, child);
        _set(child, foreignKey, get(this, Model.idAttribute));
        return get(this, localField);
      }
    };

    // Check whether the relation shouldn't actually be linked via a getter
    if (opts.link === false || opts.link === undefined && !Model.linkRelations) {
      delete descriptor.get;
      delete descriptor.set;
    }

    // Check for user-defined getter
    if (opts.get) {
      (function () {
        var originalGet = descriptor.get;
        // Set user-defined getter
        descriptor.get = function () {
          var _this = this;

          // Call user-defined getter, passing in:
          //  - target Model
          //  - related Model
          //  - instance of target Model
          //  - the original getter function, in case the user wants to use it
          return opts.get(Model, Relation, this, originalGet ? function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return originalGet.apply(_this, args);
          } : undefined);
        };
      })();
    }

    // Check for user-defined setter
    if (opts.set) {
      (function () {
        var originalSet = descriptor.set;
        // Set user-defined setter
        descriptor.set = function (child) {
          var _this2 = this;

          // Call user-defined getter, passing in:
          //  - target Model
          //  - related Model
          //  - instance of target Model
          //  - instance of related Model
          //  - the original setter function, in case the user wants to use it
          return opts.set(Model, Relation, this, child, originalSet ? function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return originalSet.apply(_this2, args);
          } : undefined);
        };
      })();
    }

    // Finally, added property to prototype of target Model
    Object.defineProperty(Model.prototype, localField, descriptor);

    if (!Model.relationList) {
      Model.relationList = [];
    }
    if (!Model.relationFields) {
      Model.relationFields = [];
    }
    opts.type = 'hasOne';
    opts.name = Model.name;
    opts.relation = Relation.name;
    opts.Relation = Relation;
    Model.relationList.push(opts);
    Model.relationFields.push(localField);
    Model.getCollection().createIndex(foreignKey);

    // Return target Model for chaining
    return Model;
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {hasOne, Model} from 'js-data'
   * class User extends Model {}
   *
   * // @hasOne(User) (ES7)
   * class Comment extends Model {}
   * hasOne(User, {...})(Comment)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend({}, { name: 'User' })
   * var Comment = JSDataModel.extend({}, { name: 'Comment' })
   * JSData.hasOne(User, {...})(Comment)
   *
   * @param {Model} Model - The Model of which the target has one.
   * @param {Object} [opts] - Configuration options.
   * @param {string} [opts.localField] - The field on the target where the relation
   * will be attached.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function hasOne(Model, opts) {
    return function (target) {
      target.dbg(op$2, 'Model:', Model, 'opts:', opts);
      return applyHasOne(target, Model, opts);
    };
  }

  var types = {
    array: isArray,
    boolean: isBoolean,
    integer: isNumber,
    number: isNumber,
    'null': function _null(value) {
      return value === null;
    },
    object: isObject,
    string: isString
  };

  var rules = {
    type: function type(predicate, value) {
      if (value === undefined) {
        return;
      }
      if (isString(predicate)) {
        predicate = [predicate];
      }
      var errors = predicate.map(function (type) {
        var validator = types[type];
        if (!validator) {
          return 'type: Unknown type ' + predicate;
        }
        return validator(value) ? undefined : 1;
      });
      return errors.indexOf(undefined) !== -1 ? undefined : 'type: Expected: ' + predicate.join(' or ') + '. Actual: ' + (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value));
    },
    anyOf: function anyOf(schemas, value) {
      var validated = false;
      var allErrors = [];
      schemas.forEach(function (schema) {
        var errors = validate(schema, value);
        if (errors) {
          allErrors = allErrors.concat(errors);
        } else {
          validated = true;
        }
      });
      return validated ? undefined : allErrors;
    },
    allOf: function allOf(schemas, value) {
      var allErrors = [];
      schemas.forEach(function (schema) {
        allErrors = allErrors.concat(validate(schema, value) || []);
      });
      return allErrors.length ? undefined : allErrors;
    },
    oneOf: function oneOf(schemas, value) {
      var validated = false;
      var allErrors = [];
      schemas.forEach(function (schema) {
        var errors = validate(schema, value);
        if (errors) {
          allErrors = allErrors.concat(errors);
        } else if (validated) {
          allErrors = ['more than one schema validated'];
          validated = false;
          return false;
        } else {
          validated = true;
        }
      });
      return validated ? undefined : allErrors;
    }
  };

  function validate(schema, value) {
    var errors = [];
    forOwn(schema, function (predicate, rule) {
      var validator = rules[rule];
      if (validator) {
        var err = validator(predicate, value);
        if (err) {
          errors.push(err);
        }
      }
    });
    return errors.length ? errors : undefined;
  }

  var op$3 = 'setSchema';

  /**
   * @param {Model} target - Target Model.
   * @param {string} key - Key for new property.
   * @param {Object} opts - Configuration options.
   * @ignore
   */
  function makeDescriptor(target, key, opts) {
    var descriptor = {
      enumerable: opts.enumerable !== undefined ? opts.enumerable : true
    };
    descriptor.get = function () {
      return this._get('props.' + key);
    };
    descriptor.set = function (value) {
      var _this = this;

      // TODO: rework this
      // if (isFunction(opts.validate) && !opts.validate(value)) {
      //   return false
      // }
      var _get = this._get;
      var _set = this._set;
      var _unset = this._unset;
      if (!_get('noValidate')) {
        var errors = validate(opts, value);
        if (errors) {
          throw new Error(errors.join(', '));
        }
      }
      if (opts.track && !_get('creating')) {
        (function () {
          var changing = _get('changing');
          var previous = _get('previous.' + key);
          var current = _get('props.' + key);
          var changed = _get('changed');
          if (!changing) {
            changed = [];
          }
          var index = changed.indexOf(key);
          if (current !== value && index === -1) {
            changed.push(key);
          }
          if (previous !== value) {
            _set('changes.' + key, value);
          } else {
            _unset('changes.' + key);
            if (index >= 0) {
              changed.splice(index, 1);
            }
          }
          if (!changed.length) {
            changing = false;
            _unset('changing');
            _unset('changed');
            if (_get('eventId')) {
              clearTimeout(_get('eventId'));
              _unset('eventId');
            }
          }
          if (!changing && changed.length) {
            _set('changed', changed);
            _set('changing', true);
            _set('eventId', setTimeout(function () {
              _unset('changed');
              _unset('eventId');
              _unset('changing');
              if (!_get('silent')) {
                var i = undefined;
                for (i = 0; i < changed.length; i++) {
                  _this.emit('change:' + changed[i], _this, get(_this, changed[i]));
                }
                _this.emit('change', _this, _get('changes'));
              }
              _unset('silent');
            }, 0));
          }
        })();
      }
      _set('props.' + key, value);
      if (_get('$') && opts.indexed) {
        target.getCollection().updateRecord(this, { index: key });
      }
      return value;
    };
    if (opts.indexed) {
      // Update index
      // TODO: Make this configurable, ie. immediate or lazy update
      target.createIndex(key);
    }
    if (opts.get) {
      if (descriptor.get) {
        (function () {
          var originalGet = descriptor.get;
          descriptor.get = function () {
            return opts.get.call(this, originalGet);
          };
        })();
      } else {
        descriptor.get = opts.get;
      }
    }
    if (opts.set) {
      if (descriptor.set) {
        (function () {
          var originalSet = descriptor.set;
          descriptor.set = function (value) {
            return opts.set.call(this, value, originalSet);
          };
        })();
      } else {
        descriptor.set = opts.set;
      }
    }
    return descriptor;
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {setSchema, Model} from 'js-data'
   * const properties = {
   *   first: {},
   *   last: {},
   *   role: {
   *     value: 'dev'
   *   },
   *   // computed property
   *   name: {
   *     get() { return `${this.first} ${this.last}` },
   *     set(value) {
   *       let parts = value.split(' ')
   *       this.first = parts[0]
   *       this.last = parts[1]
   *       return this
   *     }
   *   }
   * }
   *
   * // @setSchema(properties) (ES7)
   * class User extends Model {}
   * User.setSchema(properties)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend({}, { name: 'User' })
   * User.setSchema(properties)
   *
   * @param {Object.<string, Object>} opts - Property configurations.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function setSchema(opts) {
    opts || (opts = {});

    return function (target) {
      target.dbg(op$3, 'opts:', opts);

      target.schema || (target.schema = {});
      configure(target.schema, opts);

      forOwn(opts, function (prop, key) {
        var descriptor = makeDescriptor(target, key, prop);
        // TODO: This won't work for properties of Object type, because all
        // instances will share the prototype value
        if (!descriptor.writable) {
          Object.defineProperty(target.prototype, key, descriptor);
        }
      });
      return target;
    };
  }

  var op$4 = 'registerAdapter';

  /**
   * Add the provided adapter to the target's "adapters" property, registering it
   * with the specified.
   * @memberof! module:js-data
   * @param {string} name - The name under which to register the adapter.
   * @param {Adapter} adapter - The adapter to register.
   * @param {Object} opts - Configuration options.
   * @param {boolean} [opts.default=false] - Whether to make the adapter the
   * default adapter for the target.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function registerAdapter(name, adapter, opts) {
    opts || (opts = {});
    opts.op = op$4;
    return function (target) {
      target.dbg(op$4, 'name:', name, 'adapter:', adapter, 'opts:', opts);
      // Register the adapter
      target.getAdapters()[name] = adapter;
      // Optionally make it the default adapter for the target.
      if (opts === true || opts.default) {
        target.defaultAdapter = name;
      }
    };
  }

  var resolve = resolve$1;

  var isBrowser = false;

  try {
    isBrowser = !!window;
  } catch (e) {}

  var notify = function notify() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var self = this;
    var opts = args.pop();
    self.dbg.apply(self, [opts.op].concat(args));
    if (opts.notify || opts.notify === undefined && self.notify) {
      setTimeout(function () {
        self.emit.apply(self, [opts.op].concat(args));
      });
    }
  };

  /**
   * js-data's Model class.
   * @class Model
   * @example {@lang javascript}class User extends Model {}
   *
   * @abstract
   * @param {Object} [props] The initial properties of the new instance.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.noValidate=false] Whether to skip validation on the
   * initial properties.
   */
  function Model(props, opts) {
    classCallCheck(this, Model);
    props || (props = {});
    opts || (opts = {});
    var _props = {};
    Object.defineProperties(this, {
      _get: {
        value: function value(key) {
          return get(_props, key);
        }
      },
      _set: {
        value: function value(key, _value) {
          return _set(_props, key, _value);
        }
      },
      _unset: {
        value: function value(key) {
          return unset(_props, key);
        }
      }
    });
    this._set('creating', true);
    if (opts.noValidate) {
      this._set('noValidate', true);
    }
    fillIn(this, props);
    this._unset('creating');
    this._set('changes', {});
    this._unset('noValidate');
    this._set('previous', copy(props));
  }

  /**
   * Instance members
   */
  addHiddenPropsToTarget(Model.prototype, {
    schema: function schema(key) {
      var _schema = this.constructor.schema;
      return key ? _schema[key] : _schema;
    },
    validate: function validate$$(obj, value) {
      var errors = [];
      var _schema = this.schema();
      if (!obj) {
        obj = this;
      } else if (isString(obj)) {
        var prop = _schema[obj];
        if (prop) {
          errors = validate(prop, value) || [];
        }
      } else {
        forOwn(_schema, function (prop, key) {
          errors = errors.concat(validate(prop, get(obj, key)) || []);
        });
      }
      return errors.length ? errors : undefined;
    },

    /**
     * @param {Object} [opts] Configuration options. @see {@link Model.create}.
     */
    create: function create(opts) {
      return this.constructor.create(this, opts);
    },
    beforeSave: function beforeSave() {},
    save: function save(opts) {
      var _this2 = this;

      var Ctor = this.constructor;
      var op = 'save';
      Ctor.dbg(op, 'instance:', this, 'opts:', opts);
      var adapterName = undefined;

      opts || (opts = {});
      _(Ctor, opts);
      opts.op = op;

      return resolve(this.beforeSave(opts)).then(function () {
        adapterName = Ctor.getAdapterName(opts);
        return Ctor.getAdapter(adapterName).update(Ctor, get(_this2, Ctor.idAttribute), _this2.toJSON(opts), opts);
      }).then(function (data) {
        return resolve(_this2.afterSave(opts)).then(function () {
          return Ctor.end(data, opts, adapterName);
        });
      });
    },
    afterSave: function afterSave() {},

    /**
     * @param {Object} [opts] Configuration options. @see {@link Model.destroy}.
     */
    destroy: function destroy(opts) {
      // TODO: move actual destroy logic here
      var Ctor = this.constructor;
      return Ctor.destroy(get(this, Ctor.idAttribute), opts);
    },

    // TODO: move logic for single-item async operations onto the instance.

    /**
     * Return the value at the given path for this instance.
     *
     * @param {string} key - Path of value to retrieve.
     * @return {*} Value at path.
     */
    get: function get$$(key) {
      return get(this, key);
    },

    /**
     * Set the value for a given key, or the values for the given keys if "key" is
     * an object.
     *
     * @param {(string|Object)} key - Key to set or hash of key-value pairs to set.
     * @param {*} [value] - Value to set for the given key.
     * @param {Object} [opts] - Optional configuration.
     * @param {boolean} [opts.silent=false] - Whether to trigger change events.
     */
    set: function set(key, value, opts) {
      if (isObject(key)) {
        opts = value;
      }
      opts || (opts = {});
      if (opts.silent) {
        this._set('silent', true);
      }
      _set(this, key, value);
      if (!this._get('eventId')) {
        this._unset('silent');
      }
    },

    /**
     * Unset the value for a given key.
     *
     * @param {string} key - Key to unset.
     * @param {Object} [opts] - Optional configuration.
     * @param {boolean} [opts.silent=false] - Whether to trigger change events.
     */
    unset: function unset$$(key, opts) {
      opts || (opts = {});
      if (opts.silent) {
        this._set('silent', true);
      }
      unset(this, key);
      if (!this._get('eventId')) {
        this._unset('silent');
      }
    },
    hashCode: function hashCode() {
      return get(this, this.constructor.idAttribute);
    },
    changes: function changes(key) {
      if (key) {
        return this._get('changes.' + key);
      }
      return this._get('changes');
    },
    hasChanges: function hasChanges() {
      return !!(this._get('changed') || []).length;
    },
    commit: function commit() {
      this._unset('changed');
      this._set('changes', {});
      this._set('previous', copy(this));
      return this;
    },
    previous: function previous(key) {
      if (key) {
        return this._get('previous.' + key);
      }
      return this._get('previous');
    },
    revert: function revert(opts) {
      var _this3 = this;

      var previous = this._get('previous') || {};
      opts || (opts = {});
      opts.preserve || (opts.preserve = []);
      forOwn(this, function (value, key) {
        if (key !== _this3.constructor.idAttribute && !previous.hasOwnProperty(key) && _this3.hasOwnProperty(key) && opts.preserve.indexOf(key) === -1) {
          delete _this3[key];
        }
      });
      forOwn(previous, function (value, key) {
        if (opts.preserve.indexOf(key) === -1) {
          _this3[key] = value;
        }
      });
      this.commit();
      return this;
    },

    /**
     * Return a plain object representation of this instance.
     *
     * @param {Object} [opts] - Configuration options.
     * @param {string[]} [opts.with] - Array of relation names or relation fields
     * to include in the representation.
     * @return {Object} Plain object representation of instance.
     */
    toJSON: function toJSON(opts) {
      var _this4 = this;

      opts || (opts = {});
      var Ctor = this.constructor;
      var json = this;
      if (this instanceof Model) {
        json = {};
        for (var key in this) {
          json[key] = this[key];
        }
        // The user wants to include relations in the resulting plain object
        // representation
        if (Ctor && Ctor.relationList && opts.with) {
          if (isString(opts.with)) {
            opts.with = [opts.with];
          }
          Ctor.relationList.forEach(function (def) {
            var containedName = undefined;
            if (opts.with.indexOf(def.relation) !== -1) {
              containedName = def.relation;
            } else if (opts.with.indexOf(def.localField) !== -1) {
              containedName = def.localField;
            }
            if (containedName) {
              (function () {
                var optsCopy = { with: opts.with.slice() };

                // Prepare to recurse into deeply nested relations
                optsCopy.with.splice(optsCopy.with.indexOf(containedName), 1);
                optsCopy.with.forEach(function (relation, i) {
                  if (relation && relation.indexOf(containedName) === 0 && relation.length >= containedName.length && relation[containedName.length] === '.') {
                    optsCopy.with[i] = relation.substr(containedName.length + 1);
                  } else {
                    optsCopy.with[i] = '';
                  }
                });
                var relationData = get(_this4, def.localField);

                if (relationData) {
                  // The actual recursion
                  if (isArray(relationData)) {
                    _set(json, def.localField, relationData.map(function (item) {
                      return def.Relation.prototype.toJSON.call(item, optsCopy);
                    }));
                  } else {
                    _set(json, def.localField, def.Relation.prototype.toJSON.call(relationData, optsCopy));
                  }
                }
              })();
            }
          });
        }
      }
      return json;
    }
  });

  /**
   * Static members
   */
  fillIn(Model, {
    /**
     * Hash of registered adapters. Don't modify. Use {@link Model.registerAdapter}.
     *
     * @memberOf Model
     * @private
     */
    _adapters: null,

    /**
     * @ignore
     */
    _adaptersOwner: null,

    /**
     * This Model's {@link Collection} instance. This is where instances of the
     * Model are stored if {@link Model.autoInject} is `true`.
     *
     * __You should use {@link Model.inject}, {@link Model.eject}, and
     * {@link Model.ejectAll} if you need to manually get data in and out of this
     * collection.__
     *
     * @memberof Model
     * @private
     * @type {Collection}
     */
    _collection: null,

    /**
     * @ignore
     */
    _collectionOwner: null,

    /**
     * Hash of registered listeners. Don't modify. Use {@link Model.on} and
     * {@link Model.off}.
     *
     * @memberOf Model
     * @private
     */
    _listeners: null,

    /**
     * @ignore
     */
    _listenersOwner: null,

    /**
     * Whether {@link Model.destroy} and {@link Model.destroyAll} should
     * automatically eject the specified item(s) from the Model's collection on
     * success.
     *
     * @memberof Model
     * @type {boolean}
     * @default true
     */
    autoEject: true,

    /**
     * Whether {@link Model.create}, {@link Model.createMany},
     * {@link Model.update}, {@link Model.updateAll}, {@link Model.updateMany},
     * {@link Model.save}, should automatically inject the specified item(s)
     * returned by the adapter into the the Model's collection on success.
     *
     * __Defaults to `true` in the Browser.__
     *
     * __Defaults to `false` in Node.js__
     *
     * @memberof Model
     * @type {boolean}
     */
    autoInject: isBrowser,
    bypassCache: false,

    /**
     * Whether to disallow the use of `new Function` in {@link Model.extend}.
     *
     * You may set this to `true` if you so desire, but the class (constructor
     * function) produced by {@link Model.extend} will not be a named function,
     * which makes for slightly less debuggability.
     *
     * @memberof Model
     * @type {boolean}
     * @default false
     */
    csp: false,

    /**
     * The name of the registered adapter that should be used by default by any
     * of the Model's static methods that use an adapter.
     *
     * @memberof Model
     * @type {string}
     * @default http
     */
    defaultAdapter: 'http',

    /**
     * Whether to enable debug-level logs.
     *
     * @memberof Model
     * @type {boolean}
     * @default false
     */
    debug: false,
    eagerEject: false,

    /**
     * The field on instances of {@link Model} that should be used as the unique
     * identifier for instances of the Model.
     *
     * @memberof Model
     * @type {string}
     * @default id
     */
    idAttribute: 'id',

    /**
     * Whether to add property accessors to the prototype of {@link Model} for
     * each of the Model's relations. For each relation, the property accessor
     * will be added as the field specified by the `localField` option of the
     * relation definition. A relation property accessor returns related data by
     * accessing the related Model. If the related Model's collection is empty,
     * then the property accessors won't return anything.
     *
     * __Defaults to `true` in the Browser.__
     *
     * __Defaults to `false` in Node.js__
     *
     * @memberof Model
     * @type {boolean}
     */
    linkRelations: isBrowser,

    /**
     * Whether this Model should emit operational events.
     *
     * __Defaults to `true` in the Browser.__
     *
     * __Defaults to `false` in Node.js__
     *
     * @memberof Model
     * @type {boolean}
     */
    notify: isBrowser,

    /**
     * What to do when injecting an item into the Model's collection that shares a
     * primary key with an item already in the Model's collection.
     *
     * Possible values:
     * - merge
     * - replace
     *
     * Merge:
     *
     * Recursively shallow copy properties from the new item onto the existing
     * item.
     *
     * Replace:
     *
     * Shallow copy top-level properties from the new item onto the existing item.
     * Any top-level own properties of the existing item that are _not_ on the new
     * item will be removed.
     *
     * @memberof Model
     * @type {string}
     * @default merge
     */
    onConflict: 'merge',

    /**
     * Whether the relation property accessors should be enumerable. It's
     * recommended that this stay false.
     *
     * @memberof Model
     * @type {boolean}
     * @default false
     */
    relationsEnumerable: false,

    /**
     * Whether {@link Model.create}, {@link Model.createMany}, {@link Model.save},
     * {@link Model.update}, {@link Model.updateAll}, {@link Model.updateMany},
     * {@link Model.find}, {@link Model.findAll}, {@link Model.destroy}, and
     * {@link Model.destroyAll} should return a raw result object that contains
     * both the instance data returned by the adapter _and_ metadata about the
     * operation.
     *
     * The default is to NOT return the result object, and instead return just the
     * instance data.
     *
     * @memberof Model
     * @type {boolean}
     * @default false
     */
    raw: false,

    /**
     * Whether {@link Model.create} and {@link Model.createMany} should instead
     * call {@link Model.update} and {@link Model.updateMany} if the provided
     * props/entities already contain a primary key.
     *
     * @memberof Model
     * @type {boolean}
     * @default true
     */
    upsert: true,

    /**
     * @memberOf Model
     * @method
     * @private
     */
    _events: function _events(value) {
      if (value) {
        this._listeners = value;
      } else if (this._listenersOwner !== this) {
        this._listeners = {};
        this._listenersOwner = this;
      }
      return this._listeners;
    },
    end: function end(data, opts) {
      var self = this;
      if (opts.raw) {
        if (opts.autoInject) {
          data.data = self.inject(data.data);
        }
        _(opts, data);
        return data;
      } else if (opts.autoInject) {
        data = self.inject(data);
      }
      if (opts.notify) {
        setTimeout(function () {
          self.emit(opts.op, data, opts);
        });
      }
      return data;
    },

    /**
     * Create a new secondary index in the Collection instance of this Model.
     *
     * @memberof Model
     * @method
     * @param {string} name - The name of the new secondary index
     * @param {string[]} fieldList - The list of keys to be used to create the index.
     * @param {Object} [opts] - Configuration options.
     * @param {Function} [opts.fieldGetter] - Getter function to be used to grab
     * values off of instances for each field in the index's field list. Will be
     * passed the instance and the field to be retrieved.
     * @param {Function} [opts.hashCode] - Function used to return a unique
     * identifier for each instance in the collection. Will be passed the instance.
     */
    createIndex: function createIndex(name, fieldList, opts) {
      this.dbg('createIndex', 'name:', name, 'fieldList:', fieldList, 'opts:', opts);
      this.getCollection().createIndex(name, fieldList, opts);
    },

    /**
     * Return new instance of this Model from the given properties. Equivalent to
     * `new Model([props][, opts])`. Returns `props` if `props` is already an
     * instance of this Model.
     *
     * @memberof Model
     * @method
     * @param {Object} props - The initial properties of the new instance.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.noValidate=false] Whether to skip validation on the
     * initial properties.
     * @return {Model} The instance.
     */
    createInstance: function createInstance(props, opts) {
      var Ctor = this;
      // Check to make sure "props" is not already an instance of this Model.
      return props instanceof Ctor ? props : new Ctor(props, opts);
    },

    /**
     * Return whether `instance` is an instance of this Model.
     *
     * @memberof Model
     * @method
     * @param {Object} instance - The instance to check.
     * @return {boolean} Whether `instance` is an instance of this Model.
     */
    is: function is(instance) {
      return instance instanceof this;
    },

    /**
     * Return the entities in this Model's collection that have a primary key that
     * was automatically generated when they were injected into the collection.
     *
     * @memberof Model
     * @method
     * @return {Model[]} The entities where with autoPks.
     */
    getAutoPkItems: function getAutoPkItems() {
      return this.getAll().filter(function (item) {
        return item._get('autoPk');
      });
    },

    /**
     * If the entity with the given primary key is currently in this Model's
     * collection, return the result of calling {@link Model#changes} on that
     * entity, otherwise return undefined.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} [id] - If provided, only return changes for the
     * entity with the given primary key.
     * @return {(Object|Array)} Changes to the entity since the entity was instantiated.
     */
    changes: function changes(id) {
      this.dbg('changes', 'id:', id);
      if (isSorN(id)) {
        var instance = this.get(id);
        return instance ? instance.changes() : undefined;
      } else {
        return this.getCollection().mapCall('changes');
      }
    },

    /**
     * If the entity with the given primary key is currently in this Model's
     * collection, return the result of calling {@link Model#hasChanges} on that
     * entity, otherwise return undefined.
     *
     * If no primary key is provided, return whether any entity in this Model's
     * collection has any changes.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} [id] - The primary key of the entity.
     * @return {boolean} Whether the entity has any changes, or whether any entity
     * in this Model's collection has any changes.
     */
    hasChanges: function hasChanges(id) {
      var _this5 = this;

      this.dbg('hasChanges', 'id:', id);
      if (isSorN(id)) {
        var instance = this.get(id);
        if (instance) {
          return instance.hasChanges();
        }
      } else {
        var _ret2 = (function () {
          var hasChanges = false;
          _this5.getCollection().forEach(function (item) {
            hasChanges = hasChanges || item.hasChanges();
          });
          return {
            v: hasChanges
          };
        })();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret2)) === "object") return _ret2.v;
      }
    },
    beforeInject: function beforeInject() {},

    /**
     * Insert the provided entity or entities into this Model's collection.
     *
     * If an entity is already in the collection then the provided entity will
     * either merge with or replace the existing item based on the value of the
     * `onConflict` option.
     *
     * The collection's secondary indexes will be updated as each entity is
     * visited.
     *
     * @memberof Model
     * @method
     * @param {(Object|Object[]|Model|Model[])} items - The item or items to insert.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.autoPk={@link Model.autoPk}] - Whether to generate
     * primary keys for the entities to be injected. Useful for injecting
     * temporary, unsaved data into a Model's collection.
     * @param {string} [opts.onConflict] - What to do when an item is already in
     * the Model's collection. Possible values are `merge` or `replace`.
     * @return {(Model|Model[])} The injected entity or entities.
     */
    inject: function inject(entities, opts) {
      var _this = this;

      // For debuggability
      var op = 'inject';
      _this.dbg(op, 'entities:', entities, 'opts:', opts);

      // Default values for arguments
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(_this, opts);
      opts.op = op;
      entities = this.beforeInject(entities, opts) || entities;

      // Track whether just one or an array of entities is being injected
      var singular = false;
      var collection = _this.getCollection();
      var idAttribute = _this.idAttribute;
      var relationList = _this.relationList || [];
      var timestamp = new Date().getTime();
      if (!isArray(entities)) {
        entities = [entities];
        singular = true;
      }

      // Map the provided entities to injected entities.
      // New entities will be injected. If any props map to existing entities,
      // they will be merged into the existing entities according to the onConflict
      // option.
      entities = entities.map(function (props) {
        var id = get(props, idAttribute);
        // Track whether we had to generate an id for this entity
        var autoPk = false;
        // Validate that the primary key attached to the entity is a string or
        // numer
        if (!isSorN(id)) {
          // No id found, generate one
          if (opts.autoPk) {
            id = uuid();
            _set(props, idAttribute, id);
            autoPk = true;
          } else {
            // Not going to generate one, throw an error
            throw new TypeError('User#' + idAttribute + ': Expected string or number, found ' + (typeof id === 'undefined' ? 'undefined' : babelHelpers.typeof(id)) + '!');
          }
        }
        // Grab existing entity if there is one
        var existing = _this.get(id);
        // If the currently visited props are just reference to the existing
        // entity, then there is nothing to be done. Exit early.
        if (props === existing) {
          return existing;
        }

        // Check the currently visited props for relations that need to be
        // injected as well
        relationList.forEach(function (def) {
          // A reference to the Model that this Model is related to
          var Relation = def.Relation;
          // The field used by the related Model as the primary key
          var relationIdAttribute = Relation.idAttribute;
          // Grab the foreign key in this relationship, if there is one
          var foreignKey = def.foreignKey;

          // Grab a reference to the related data attached or linked to the
          // currently visited props
          var toInject = get(props, def.localField);

          // If the user provided a custom injection function for this relation,
          // call it
          if (isFunction(def.inject)) {
            def.inject(_this, def, props);
          } else if (toInject && def.inject !== false) {
            // Otherwise, if there is something to be injected, inject it
            if (isArray(toInject)) {
              // Handle injecting hasMany relations
              toInject = toInject.map(function (toInjectItem) {
                // Check that this item isn't the same item that is already in the
                // store
                if (toInjectItem !== Relation.get(get(toInjectItem, relationIdAttribute))) {
                  try {
                    // Make sure this item has its foreignKey
                    if (foreignKey) {
                      _set(toInjectItem, foreignKey, id);
                    }
                    // Finally inject this related item
                    toInjectItem = Relation.inject(toInjectItem);
                  } catch (err) {
                    throw new Error('Failed to inject ' + def.type + ' relation: "' + def.relation + '"! ' + err.message);
                  }
                }
                return toInjectItem;
              });
              // If it's the parent that has the localKeys
              if (def.localKeys) {
                _set(props, def.localKeys, toInject.map(function (injected) {
                  return get(injected, relationIdAttribute);
                }));
              }
            } else {
              // Handle injecting belongsTo and hasOne relations
              if (toInject !== Relation.get(get(toInject, relationIdAttribute))) {
                try {
                  // Make sure the parent has its localKey
                  if (def.localKey) {
                    _set(props, def.localKey, get(toInject, Relation.idAttribute));
                  }
                  // Make sure this item has its localKey
                  if (foreignKey) {
                    _set(toInject, def.foreignKey, get(props, idAttribute));
                  }
                  // Finally inject this related item
                  toInject = Relation.inject(toInject);
                } catch (err) {
                  throw new Error('Failed to inject ' + def.type + ' relation: "' + def.relation + '"!');
                }
              }
            }
          }
          if (def.link || def.link === undefined && _this.linkRelations) {
            // Remove relation properties from the item, since those relations
            // have been injected by now
            unset(props, def.localField);
          } else {
            // Here, linking is turned off, so we setup a manual link
            _set(props, def.localField, toInject);
          }
        });

        if (existing) {
          // Here, the currently visited props corresponds to an entity already
          // in the collection, so we need to merge them
          var onConflict = opts.onConflict || _this.onConflict;
          if (onConflict === 'merge') {
            deepMixIn(existing, props);
          } else if (onConflict === 'replace') {
            forOwn(existing, function (value, key) {
              if (key !== idAttribute && !props.hasOwnProperty(key)) {
                delete existing[key];
              }
            });
            existing.set(props);
          }
          props = existing;
          // Update all indexes in the collection
          collection.update(props);
        } else {
          // Here, the currently visted props does not correspond to any entity
          // in the collection, so make this props is an instance of this Model
          // and insert it into the collection
          props = _this.createInstance(props);
          if (autoPk) {
            // Flag this instance as one that had its primary key generated
            props._set('autoPk', autoPk);
          }
          collection.insert(props);
        }
        // Track when this entity was injected
        props._set('$', timestamp);
        return props;
      });
      // Finally, return the injected data
      var result = singular ? entities.length ? entities[0] : undefined : entities;
      this.afterInject(result, opts);
      return result;
    },
    afterInject: function afterInject() {},
    beforeEject: function beforeEject() {},

    /**
     * Remove the entity with the given primary key from this Model's collection.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The primary key of the entity to be removed.
     * @param {Object} [opts] - Configuration options.
     * @return {Model} The removed entity, if any.
     */
    eject: function eject(id, opts) {
      // For debuggability
      var op = 'eject';
      this.dbg(op, 'id:', id, 'opts:', opts);

      // Default values for arguments
      opts || (opts = {});
      opts.op = op;
      this.beforeEject(id, opts);
      var instance = this.get(id);

      // The instance is in the collection, remove it
      if (instance) {
        instance._unset('$');
        this.getCollection().remove(instance);
      }
      this.afterEject(instance, opts);
      return instance;
    },
    afterEject: function afterEject() {},
    beforeEjectAll: function beforeEjectAll() {},

    /**
     * Remove the instances selected by "query" from the Collection instance of
     * this Model.
     *
     * @memberof Model
     * @method
     * @param {Object} [query={}] - Selection query.
     * @param {Object} [query.where] - Filtering criteria.
     * @param {number} [query.skip] - Number to skip.
     * @param {number} [query.limit] - Number to limit to.
     * @param {Array} [query.orderBy] - Sorting criteria.
     * @param {Object} [opts] - Configuration options.
     * @return {Model[]} The removed entites, if any.
     */
    ejectAll: function ejectAll(query, opts) {
      // For debuggability
      var op = 'ejectAll';
      this.dbg(op, 'query:', query, 'opts:', opts);

      // Default values for arguments
      opts || (opts = {});
      opts.op = op;
      this.beforeEjectAll(query, opts);
      var entities = this.filter(query);
      var collection = this.getCollection();

      // Remove each selected entity from the collection
      entities.forEach(function (item) {
        collection.remove(item);
      });
      this.afterEjectAll(entities, query, opts);
      return entities;
    },
    afterEjectAll: function afterEjectAll() {},

    /**
     * Return the entity in this Model's collection that has the given primary
     * key, if such an entity can be found.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - Primary key of the entity to retrieve.
     * @return {Model} The entity or undefined.
     */
    get: function get(id) {
      this.dbg('get', 'id:', id);
      var instances = this.getCollection().get(id);
      return instances.length ? instances[0] : undefined;
    },

    /**
     * Proxy for Collection#between
     *
     * @memberof Model
     * @method
     * @return {Model[]}
     */
    between: function between() {
      var _getCollection;

      return (_getCollection = this.getCollection()).between.apply(_getCollection, arguments);
    },

    /**
     * Equivalent of `Model.getCollection().getAll([...ids][, opts])`. See
     * {@link Collection#getAll}.
     *
     * @memberof Model
     * @method
     * @return {Model[]} The selected entities
     */
    getAll: function getAll() {
      var _getCollection2;

      return (_getCollection2 = this.getCollection()).getAll.apply(_getCollection2, arguments);
    },

    /**
     * Equivalent of `Model.getCollection().filter([query][, opts])`. See
     * {@link Collection#filter}.
     *
     * @memberof Model
     * @method
     * @return {Model[]} The selected entities.
     */
    filter: function filter(query, opts) {
      opts || (opts = {});
      return this.getCollection().filter(query, opts);
    },

    /**
     * Equivalent of `Model.getCollection().forEach(cb[, thisArg])`. See
     * {@link Collection#forEach}.
     *
     * @memberof Model
     * @method
     */
    forEach: function forEach(cb, thisArg) {
      return this.getCollection().forEach(cb, thisArg);
    },

    /**
     * Equivalent of `Model.getCollection().map(cb[, thisArg])`. See
     * {@link Collection#map}.
     *
     * @memberof Model
     * @method
     * @return {Array} The result
     */
    map: function map(cb, thisArg) {
      return this.getCollection().map(cb, thisArg);
    },

    /**
     * Equivalent of `Model.getCollection().reduce(cb, initialValue)`. See
     * {@link Collection#reducs}.
     *
     * @memberof Model
     * @method
     * @return {*} The result.
     */
    reduce: function reduce(cb, initialValue) {
      return this.getCollection().reduce(cb, initialValue);
    },

    /**
     * Equivalent of `Model.getCollection().mapCall(funcName[, ...args])`. See
     * {@link Collection#mapCall}.
     *
     * @memberof Model
     * @method
     * @return {Array} The result
     */
    mapCall: function mapCall() {
      var _getCollection3;

      return (_getCollection3 = this.getCollection()).mapCall.apply(_getCollection3, arguments);
    },

    /**
     * Return the plain JSON representation of all items in this Model's
     * collection.
     *
     * @memberof Model
     * @method
     * @param {Object} [opts] - Configuration options.
     * @param {string[]} [opts.with] - Array of relation names or relation fields
     * to include in the representation.
     * @return {Model[]} The entities.
     */
    toJSON: function toJSON(opts) {
      return this.mapCall('toJSON', opts);
    },

    /**
     * Equivalent of `Model.getCollection().query()`. See {@link Collection#query}.
     *
     * @memberof Model
     * @method
     * @return {Query}
     */
    query: function query() {
      return this.getCollection().query();
    },

    /**
     * Return the registered adapter with the given name or the default adapter if
     * no name is provided.
     *
     * @memberof Model
     * @method
     * @param {string} [name]- The name of the adapter to retrieve.
     * @return {Adapter} The adapter, if any.
     */
    getAdapter: function getAdapter(name) {
      this.dbg('getAdapter', 'name:', name);
      var adapter = this.getAdapterName(name);
      if (!adapter) {
        throw new ReferenceError(adapter + ' not found!');
      }
      return this.getAdapters()[adapter];
    },

    /**
     * Return the name of a registered adapter based on the given name or options,
     * or the name of the default adapter if no name provided.
     *
     * @memberof Model
     * @method
     * @param {(Object|string)} [opts] - The name of an adapter or options, if any.
     * @return {string} The name of the adapter.
     */
    getAdapterName: function getAdapterName(opts) {
      opts || (opts = {});
      if (isString(opts)) {
        opts = { adapter: opts };
      }
      return opts.adapter || opts.defaultAdapter;
    },
    getAdapters: function getAdapters() {
      if (this._adaptersOwner !== this) {
        var prevAdapters = this._adapters;
        this._adapters = {};
        if (prevAdapters) {
          fillIn(this._adapters, prevAdapters);
        }
        this._adaptersOwner = this;
      }
      return this._adapters;
    },
    getCollection: function getCollection() {
      if (this._collectionOwner !== this) {
        this._collection = new Collection([], this.idAttribute);
        this._collection.on('all', this.emit, this);
        this._collection.createIndex('lastInjected', ['$'], {
          fieldGetter: function fieldGetter(obj) {
            return obj._get('$');
          }
        });
        this._collectionOwner = this;
      }
      return this._collection;
    },

    /**
     * Model lifecycle hook called by {@link Model.create}. If this method
     * returns a promise then {@link Model.create} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Object} props - The `props` argument passed to {@link Model.create}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.create}.
     */
    beforeCreate: notify,

    checkUpsertCreate: function checkUpsertCreate(props, opts) {
      var self = this;
      return (opts.upsert || opts.upsert === undefined && self.upsert) && get(props, self.idAttribute) && (!self.is(props) || !props._get('autoPk'));
    },

    /**
     * Using an adapter, create a new the entity from the provided `props`.
     *
     * {@link Model.beforeCreate} will be called before calling the adapter.
     * {@link Model.afterCreate} will be called after calling the adapter.
     *
     * @memberof Model
     * @method
     * @param {Object} props - The properties from which to create the entity.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoInject={@link Model.autoInject}] Whether to
     * inject the resulting created data into this Model's collection upon success.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * created data. If `true` return a response object that includes the created
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to create in a cascading
     * create if `props` contains nested relations. NOT performed in a transaction.
     */
    create: function create(props, opts) {
      var op = undefined,
          adapter = undefined;
      var self = this;

      // Default values for arguments
      props || (props = {});
      opts || (opts = {});

      // Check whether we should do an upsert instead
      if (self.checkUpsertCreate(props, opts)) {
        return self.update(get(props, self.idAttribute), props, opts);
      }

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeCreate lifecycle hook
      op = opts.op = 'beforeCreate';
      return resolve(self[op](props, opts)).then(function (_props) {
        // Allow for re-assignment from lifecycle hook
        props = _props || props;
        // Now delegate to the adapter
        op = opts.op = 'create';
        var json = self.prototype.toJSON.call(props, opts);
        self.dbg(op, json, opts);
        return self.getAdapter(adapter)[op](self, json, opts);
      }).then(function (data) {
        // afterCreate lifecycle hook
        op = opts.op = 'afterCreate';
        return resolve(self[op](data, opts)).then(function (_data) {
          // Allow for re-assignment from lifecycle hook
          data = _data || data;
          // If the created entity was already in self Model's collection via
          // an autoPk id, remove it from the collection
          // TODO: Fix this?
          if (self.is(props) && props._get('$')) {
            self.eject(get(props, self.idAttribute));
          }
          // Possibly inject result and/or formulate result object
          return self.end(data, opts);
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.create}. If this method
     * returns a promise then {@link Model.create} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Object} data - The `data` return by the adapter.
     * @param {Object} opts - The `opts` argument passed to {@link Model.create}.
     */
    afterCreate: notify,

    /**
     * Model lifecycle hook called by {@link Model.createMany}. If this method
     * returns a promise then {@link Model.createMany} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Array} entities - The `entities` argument passed to {@link Model.createMany}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.createMany}.
     */
    beforeCreateMany: notify,

    checkUpsertCreateMany: function checkUpsertCreateMany(entities, opts) {
      var self = this;
      if (opts.upsert || opts.upsert === undefined && self.upsert) {
        return entities.reduce(function (hasId, item) {
          return hasId && get(item, self.idAttribute) && (!isFunction(item._get) || !item._get('autoPk'));
        }, true);
      }
    },

    /**
     * Given an array of entities, batch create them via an adapter.
     *
     * {@link Model.beforeCreateMany} will be called before calling the adapter.
     * {@link Model.afterCreateMany} will be called after calling the adapter.
     *
     * @memberof Model
     * @method
     * @param {Array} entities - Array up entities to be created.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoInject={@link Model.autoInject}] Whether to
     * inject the resulting created entities into this Model's collection.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to create in a cascading create
     * if the entities to be created have linked/nested relations. NOT performed
     * in a transaction.
     */
    createMany: function createMany(entities, opts) {
      var op = undefined,
          adapter = undefined;
      var self = this;

      // Default values for arguments
      entities || (entities = []);
      opts || (opts = {});

      // Check whether we should do an upsert instead
      if (self.checkUpsertCreateMany(entities, opts)) {
        return self.updateMany(entities, opts);
      }

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeCreateMany lifecycle hook
      op = opts.op = 'beforeCreateMany';
      return resolve(self[op](entities, opts)).then(function (_entities) {
        // Allow for re-assignment from lifecycle hook
        entities = _entities || entities;
        // Now delegate to the adapter
        op = opts.op = 'createMany';
        var json = entities.map(function (item) {
          return self.prototype.toJSON.call(item, opts);
        });
        self.dbg(op, json, opts);
        return self.getAdapter(adapter)[op](self, json, opts);
      }).then(function (data) {
        // afterCreateMany lifecycle hook
        op = opts.op = 'afterCreateMany';
        return resolve(self[op](data, opts)).then(function (_data) {
          // Allow for re-assignment from lifecycle hook
          data = _data || data;
          // If the created entities were already in this Model's collection
          // via an autoPk id, remove them from the collection
          // TODO: Fix this?
          entities.forEach(function (item) {
            if (self.is(item) && item._get('$')) {
              self.eject(get(item, self.idAttribute));
            }
          });
          // Possibly inject result and/or formulate result object
          return self.end(data, opts);
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.createMany}. If this method
     * returns a promise then {@link Model.createMany} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Array} entities - The `entities` argument passed to {@link Model.createMany}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.createMany}.
     */
    afterCreateMany: notify,

    /**
     * Model lifecycle hook called by {@link Model.find}. If this method
     * returns a promise then {@link Model.find} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The `id` argument passed to {@link Model.find}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.find}.
     */
    beforeFind: notify,

    /**
     * Retrieve via an adapter the entity with the given primary key. The returned
     * entity will be injected into the Model's collection if `autoInject` is true.
     *
     * {@link Model.beforeFind} will be called before calling the adapter.
     * {@link Model.afterFind} will be called after calling the adapter.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The primary key of the entity to retrieve.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoInject={@link Model.autoInject}] Whether to
     * inject the resulting data into this Model's collection.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to eager load in the request.
     */
    find: function find(id, opts) {
      var op = undefined,
          adapter = undefined;
      var self = this;

      // Default values for arguments
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeFind lifecycle hook
      op = opts.op = 'beforeFind';
      return resolve(self[op](id, opts)).then(function (_id) {
        // Allow for re-assignment from lifecycle hook
        id = _id === undefined ? id : _id;
        // Now delegate to the adapter
        op = opts.op = 'find';
        self.dbg(op, id, opts);
        return self.getAdapter(adapter)[op](self, id, opts);
      }).then(function (data) {
        // afterFind lifecycle hook
        op = opts.op = 'afterFind';
        return resolve(self[op](data, opts)).then(function (_data) {
          // Allow for re-assignment from lifecycle hook
          data = _data || data;
          // Possibly inject result and/or formulate result object
          return self.end(data, opts);
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.find}. If this method
     * returns a promise then {@link Model.find} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The `id` argument passed to {@link Model.find}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.find}.
     */
    afterFind: notify,

    /**
     * Model lifecycle hook called by {@link Model.findAll}. If this method
     * returns a promise then {@link Model.findAll} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Object} query - The `query` argument passed to {@link Model.findAll}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.findAll}.
     */
    beforeFindAll: notify,

    /**
     * Using the `query` argument, select entities to pull from an adapter.
     * Expects back from the adapter the array of selected entities. The returned
     * entities will be injected into the Model's collection if `autoInject` is
     * true.
     *
     * {@link Model.beforeFindAll} will be called before calling the adapter.
     * {@link Model.afterFindAll} will be called after calling the adapter.
     *
     * @memberof Model
     * @method
     * @param {Object} [query={}] - Selection query.
     * @param {Object} [query.where] - Filtering criteria.
     * @param {number} [query.skip] - Number to skip.
     * @param {number} [query.limit] - Number to limit to.
     * @param {Array} [query.orderBy] - Sorting criteria.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoInject={@link Model.autoInject}] Whether to
     * inject the resulting data into this Model's collection.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * resulting data. If `true` return a response object that includes the
     * resulting data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to eager load in the request.
     */
    findAll: function findAll(query, opts) {
      var op = undefined,
          adapter = undefined;
      var self = this;

      // Default values for arguments
      query || (query = {});
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeFindAll lifecycle hook
      op = opts.op = 'beforeFindAll';
      return resolve(self[op](query, opts)).then(function (_query) {
        // Allow for re-assignment from lifecycle hook
        query = _query || query;
        // Now delegate to the adapter
        op = opts.op = 'findAll';
        self.dbg(op, query, opts);
        return self.getAdapter(adapter)[op](self, query, opts);
      }).then(function (data) {
        // afterFindAll lifecycle hook
        op = opts.op = 'afterFindAll';
        return resolve(self[op](data, query, opts)).then(function (_data) {
          // Allow for re-assignment from lifecycle hook
          data = _data || data;
          // Possibly inject result and/or formulate result object
          return self.end(data, opts);
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.findAll}. If this method
     * returns a promise then {@link Model.findAll} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Object} data - The `data` returned by the adapter.
     * @param {Object} query - The `query` argument passed to {@link Model.findAll}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.findAll}.
     */
    afterFindAll: notify,

    /**
     * Model lifecycle hook called by {@link Model.save}. If this method
     * returns a promise then {@link Model.save} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The `id` argument passed to {@link Model.save}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.save}.
     */
    beforeSave: notify,

    /**
     * If the entity with the given primary key is currently in this Model's
     * collection, call the instance's {@link Model#save} method. If the entity
     * is not in this Model's collection, the returned promise will be rejected.
     *
     * {@link Model.beforeSave} will be called before calling {@link Model#save}.
     * {@link Model#beforeSave} will be called before saving the entity.
     * {@link Model#afterSave} will be called after saving the entity.
     * {@link Model.afterSave} will be called after calling {@link Model#save}.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The primary key of the entity to save.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoInject={@link Model.autoInject}] Whether to
     * inject the resulting updated data into this Model's collection.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to save in a cascading
     * save if any of the entity's relations are linked to the entity.
     * NOT performed in a transaction.
     */
    save: function save(id, opts) {
      var op = undefined;
      var self = this;
      var instance = self.get(id);

      // Default values for arguments
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      opts.adapter = self.getAdapterName(opts);

      // beforeSave lifecycle hook
      op = opts.op = 'beforeSave';
      return resolve(self[op](instance, opts)).then(function (_instance) {
        instance = _instance || instance;
        if (!instance) {
          throw new Error('instance with "' + self.idAttribute + '" of ' + id + ' not in Model\'s collection!');
        }
        // Now delegate to the adapter
        op = opts.op = 'save';
        self.dbg(op, id, opts);
        return instance[op](opts);
      }).then(function (data) {
        // afterSave lifecycle hook
        op = opts.op = 'afterSave';
        return resolve(self[op](instance, opts)).then(function () {
          return data;
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.save}. If this method
     * returns a promise then {@link Model.save} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The `id` argument passed to {@link Model.save}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.save}.
     */
    afterSave: notify,

    /**
     * Model lifecycle hook called by {@link Model.update}. If this method
     * returns a promise then {@link Model.update} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The `id` argument passed to {@link Model.update}.
     * @param {props} props - The `props` argument passed to {@link Model.update}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.update}.
     */
    beforeUpdate: notify,

    /**
     * Using an adapter, update the entity with the primary key specified by the
     * `id` argument.
     *
     * {@link Model.beforeUpdate} will be called before updating the entity.
     * {@link Model.afterUpdate} will be called after updating the entity.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The primary key of the entity to update.
     * @param {Object} props - The update to apply to the entity.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoInject={@link Model.autoInject}] Whether to
     * inject the resulting updated data into this Model's collection.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to update in a cascading
     * update if `props` contains nested updates to relations. NOT performed in a
     * transaction.
     */
    update: function update(id, props, opts) {
      var op = undefined,
          adapter = undefined;
      var self = this;

      // Default values for arguments
      props || (props = {});
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeUpdate lifecycle hook
      op = opts.op = 'beforeUpdate';
      return resolve(self[op](id, props, opts)).then(function (_props) {
        // Allow for re-assignment from lifecycle hook
        props = _props || props;
        // Now delegate to the adapter
        op = opts.op = 'update';
        var json = self.prototype.toJSON.call(props, opts);
        self.dbg(op, id, json, opts);
        return self.getAdapter(adapter)[op](self, id, json, opts);
      }).then(function (data) {
        // afterUpdate lifecycle hook
        op = opts.op = 'afterUpdate';
        return resolve(self[op](id, data, opts)).then(function (_data) {
          // Allow for re-assignment from lifecycle hook
          data = _data || data;
          // Possibly inject result and/or formulate result object
          return self.end(data, opts);
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.update}. If this method
     * returns a promise then {@link Model.update} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The `id` argument passed to {@link Model.update}.
     * @param {props} props - The `props` argument passed to {@link Model.update}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.update}.
     */
    afterUpdate: notify,

    /**
     * Model lifecycle hook called by {@link Model.updateMany}. If this method
     * returns a promise then {@link Model.updateMany} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Array} entities - The `entities` argument passed to {@link Model.updateMany}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.updateMany}.
     */
    beforeUpdateMany: notify,

    /**
     * Given an array of updates, perform each of the updates via an adapter. Each
     * "update" is a hash of properties with which to update an entity. Each
     * update must contain the primary key to be updated.
     *
     * {@link Model.beforeUpdateMany} will be called before making the update.
     * {@link Model.afterUpdateMany} will be called after making the update.
     *
     * @memberof Model
     * @method
     * @param {Array} entities - Array up entity updates.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoInject={@link Model.autoInject}] Whether to
     * inject the resulting updated data into this Model's collection.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to update in a cascading
     * update if each entity update contains nested updates for relations. NOT
     * performed in a transaction.
     */
    updateMany: function updateMany(entities, opts) {
      var op = undefined,
          adapter = undefined;
      var self = this;

      // Default values for arguments
      entities || (entities = []);
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeUpdateMany lifecycle hook
      op = opts.op = 'beforeUpdateMany';
      return resolve(self[op](entities, opts)).then(function (_entities) {
        // Allow for re-assignment from lifecycle hook
        entities = _entities || entities;
        // Now delegate to the adapter
        op = opts.op = 'updateMany';
        var json = entities.map(function (item) {
          return self.prototype.toJSON.call(item, opts);
        });
        self.dbg(op, json, opts);
        return self.getAdapter(adapter)[op](self, json, opts);
      }).then(function (data) {
        // afterUpdateMany lifecycle hook
        op = opts.op = 'afterUpdateMany';
        return resolve(self[op](data, opts)).then(function (_data) {
          // Allow for re-assignment from lifecycle hook
          data = _data || data;
          // Possibly inject result and/or formulate result object
          return self.end(data, opts);
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.updateMany}. If this method
     * returns a promise then {@link Model.updateMany} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Array} entities - The `entities` argument passed to {@link Model.updateMany}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.updateMany}.
     */
    afterUpdateMany: notify,

    /**
     * Model lifecycle hook called by {@link Model.updateAll}. If this method
     * returns a promise then {@link Model.updateAll} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Object} query - The `query` argument passed to {@link Model.updateAll}.
     * @param {Object} props - The `props` argument passed to {@link Model.updateAll}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.updateAll}.
     */
    beforeUpdateAll: notify,

    /**
     * Using the `query` argument, perform the a single updated to the selected
     * entities. Expects back from the adapter an array of the updated entities.
     * The updated entities will be injected into the Model's collection if
     * `autoInject` is true.
     *
     * {@link Model.beforeUpdateAll} will be called before making the update.
     * {@link Model.afterUpdateAll} will be called after making the update.
     *
     * @memberof Model
     * @method
     * @param {Object} [query={}] - Selection query.
     * @param {Object} [query.where] - Filtering criteria.
     * @param {number} [query.skip] - Number to skip.
     * @param {number} [query.limit] - Number to limit to.
     * @param {Array} [query.orderBy] - Sorting criteria.
     * @param {Object} props - Update to apply to selected entities.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoInject={@link Model.autoInject}] Whether to
     * inject the resulting updated data into this Model's collection.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * updated data. If `true` return a response object that includes the updated
     * data and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to update in a cascading
     * update if `props` contains nested updates to relations. NOT performed in a
     * transaction.
     */
    updateAll: function updateAll(query, props, opts) {
      var op = undefined,
          adapter = undefined;
      var self = this;

      // Default values for arguments
      query || (query = {});
      props || (props = {});
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeUpdateAll lifecycle hook
      op = opts.op = 'beforeUpdateAll';
      return resolve(self[op](query, props, opts)).then(function (_props) {
        // Allow for re-assignment from lifecycle hook
        props = _props || props;
        // Now delegate to the adapter
        op = opts.op = 'updateAll';
        var json = self.prototype.toJSON.call(props, opts);
        self.dbg(op, query, json, opts);
        return self.getAdapter(adapter)[op](self, query, json, opts);
      }).then(function (data) {
        // afterUpdateAll lifecycle hook
        op = opts.op = 'afterUpdateAll';
        return resolve(self[op](query, data, opts)).then(function (_data) {
          // Allow for re-assignment from lifecycle hook
          data = _data || data;
          // Possibly inject result and/or formulate result object
          return self.end(data, opts);
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.updateAll}. If this method
     * returns a promise then {@link Model.updateAll} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {Object} query - The `query` argument passed to {@link Model.updateAll}.
     * @param {Object} props - The `props` argument passed to {@link Model.updateAll}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.updateAll}.
     */
    afterUpdateAll: notify,

    /**
     * Model lifecycle hook called by {@link Model.destroy}. If this method
     * returns a promise then {@link Model.destroy} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The `id` argument passed to {@link Model.destroy}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.destroy}.
     */
    beforeDestroy: notify,

    /**
     * Using an adapter, destroy the entity with the primary key specified by the
     * `id` argument.
     *
     * {@link Model.beforeDestroy} will be called before destroying the entity.
     * {@link Model.afterDestroy} will be called after destroying the entity.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The primary key of the entity to destroy.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoEject={@link Model.autoEject}] Whether to remove
     * the entity from this Model's collection upon success.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * ejected data (if any). If `true` return a response object that includes the
     * ejected data (if any) and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to destroy in a cascading
     * delete. NOT performed in a transaction.
     */
    destroy: function destroy(id, opts) {
      var op = undefined,
          adapter = undefined;
      var self = this;

      // Default values for arguments
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeDestroy lifecycle hook
      op = opts.op = 'beforeDestroy';
      return resolve(self[op](id, opts)).then(function (_id) {
        // Allow for re-assignment from lifecycle hook
        id = _id === undefined ? id : _id;
        // Now delegate to the adapter
        op = opts.op = 'destroy';
        self.dbg(op, id, opts);
        return self.getAdapter(adapter)[op](self, id, opts);
      }).then(function (data) {
        // afterDestroy lifecycle hook
        op = opts.op = 'afterDestroy';
        return resolve(self[op](data, opts)).then(function (_data) {
          // Allow for re-assignment from lifecycle hook
          data = _data || data;
          if (opts.raw) {
            if (opts.autoEject) {
              data.data = self.eject(id, opts);
            }
            _(opts, data);
            return data;
          } else if (opts.autoEject) {
            data = self.eject(id, opts);
          }
          return data;
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.destroy}. If this method
     * returns a promise then {@link Model.destroy} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {(string|number)} id - The `id` argument passed to {@link Model.destroy}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.destroy}.
     */
    afterDestroy: notify,

    /**
     * Model lifecycle hook called by {@link Model.destroyAll}. If this method
     * returns a promise then {@link Model.destroyAll} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {query} query - The `query` argument passed to {@link Model.destroyAll}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.destroyAll}.
     */
    beforeDestroyAll: notify,

    /**
     * Using the `query` argument, destroy the selected entities via an adapter.
     * If no `query` is provided then all entities will be destroyed.
     *
     * {@link Model.beforeDestroyAll} will be called before destroying the entities.
     * {@link Model.afterDestroyAll} will be called after destroying the entities.
     *
     * @memberof Model
     * @method
     * @param {Object} [query={}] - Selection query.
     * @param {Object} [query.where] - Filtering criteria.
     * @param {number} [query.skip] - Number to skip.
     * @param {number} [query.limit] - Number to limit to.
     * @param {Array} [query.orderBy] - Sorting criteria.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.adapter={@link Model.defaultAdapter}] Name of the
     * adapter to use.
     * @param {boolean} [opts.autoEject={@link Model.autoEject}] Whether to remove
     * the entities from this Model's collection upon success.
     * @param {boolean} [opts.notify={@link Model.notify}] Whether to emit
     * lifecycle events.
     * @param {boolean} [opts.raw={@link Model.raw}] If `false`, return the
     * ejected data (if any). If `true` return a response object that includes the
     * ejected data (if any) and metadata about the operation.
     * @param {string[]} [opts.with=[]] Relations to destroy in a cascading
     * delete. NOT performed in a transaction.
     */
    destroyAll: function destroyAll(query, opts) {
      var op = undefined,
          adapter = undefined;
      var self = this;

      // Default values for arguments
      query || (query = {});
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      adapter = opts.adapter = self.getAdapterName(opts);

      // beforeDestroyAll lifecycle hook
      op = opts.op = 'beforeDestroyAll';
      return resolve(self[op](query, opts)).then(function (_query) {
        // Allow for re-assignment from lifecycle hook
        query = _query || query;
        // Now delegate to the adapter
        op = opts.op = 'destroyAll';
        self.dbg(op, query, opts);
        return self.getAdapter(adapter)[op](self, query, opts);
      }).then(function (data) {
        // afterDestroyAll lifecycle hook
        op = opts.op = 'afterDestroyAll';
        return resolve(self[op](data, query, opts)).then(function (_data) {
          // Allow for re-assignment from lifecycle hook
          data = _data || data;
          if (opts.raw) {
            if (opts.autoEject) {
              data.data = self.ejectAll(query, opts);
            }
            _(opts, data);
            return data;
          } else if (opts.autoEject) {
            data = self.ejectAll(query, opts);
          }
          return data;
        });
      });
    },

    /**
     * Model lifecycle hook called by {@link Model.destroyAll}. If this method
     * returns a promise then {@link Model.destroyAll} will wait for the promise
     * to resolve before continuing.
     *
     * @memberof Model
     * @method
     * @param {*} data - The `data` returned by the adapter.
     * @param {query} query - The `query` argument passed to {@link Model.destroyAll}.
     * @param {Object} opts - The `opts` argument passed to {@link Model.destroyAll}.
     */
    afterDestroyAll: notify,

    beforeLoadRelations: notify,
    loadRelations: function loadRelations(id, relations, opts) {
      var op = undefined;
      var self = this;
      var relationList = self.relationList || [];
      var instance = self.is(id) ? id : undefined;
      id = instance ? get(instance, self.idAttribute) : id;

      // Default values for arguments
      relations || (relations = []);
      opts || (opts = {});

      // Fill in "opts" with the Model's configuration
      _(self, opts);
      opts.adapter = self.getAdapterName(opts);

      // beforeLoadRelations lifecycle hook
      op = opts.op = 'beforeLoadRelations';
      return resolve(self[op](id, relations, opts)).then(function () {
        if (isSorN(id) && !instance) {
          instance = self.get(instance);
        }
        if (!instance) {
          throw new Error('You passed an id of an instance not found in the collection of the Model!');
        }
        if (isString(relations)) {
          relations = [relations];
        }
        // Now delegate to the adapter
        op = opts.op = 'loadRelations';
        self.dbg(op, instance, relations, opts);
        return Promise.all(relationList.map(function (def) {
          if (isFunction(def.load)) {
            return def.load(self, def, instance, opts);
          }
          var task = undefined;
          if (def.foreignKey) {
            task = def.Relation.findAll(babelHelpers.defineProperty({}, def.foreignKey, id), opts);
          } else if (def.localKey) {
            var key = get(instance, def.localKey);
            if (isSorN(key)) {
              task = def.Relation.find(key, opts);
            }
          } else if (def.localKeys) {
            task = def.Relation.findAll(babelHelpers.defineProperty({}, def.Relation.idAttribute, {
              'in': get(instance, def.localKeys)
            }), opts);
          } else if (def.foreignKeys) {
            task = def.Relation.findAll(babelHelpers.defineProperty({}, def.Relation.idAttribute, {
              'contains': get(instance, self.idAttribute)
            }), opts);
          }
          if (task) {
            task = task.then(function (data) {
              if (opts.raw) {
                data = data.data;
              }
              _set(instance, def.localField, def.type === 'hasOne' ? data.length ? data[0] : undefined : data);
            });
          }
          return task;
        }));
      }).then(function () {
        // afterLoadRelations lifecycle hook
        op = opts.op = 'afterLoadRelations';
        return resolve(self[op](instance, relations, opts)).then(function () {
          return instance;
        });
      });
    },

    afterLoadRelations: notify,

    log: function log(level) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (level && !args.length) {
        args.push(level);
        level = 'debug';
      }
      if (level === 'debug' && !this.debug) {
        return;
      }
      var prefix = level.toUpperCase() + ': (' + this.name + ')';
      if (console[level]) {
        var _console;

        (_console = console)[level].apply(_console, [prefix].concat(args));
      } else {
        var _console2;

        (_console2 = console).log.apply(_console2, [prefix].concat(args));
      }
    },
    dbg: function dbg() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.log.apply(this, ['debug'].concat(args));
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
     */
    belongsTo: function belongsTo$$(model, opts) {
      return belongsTo(model, opts)(this);
    },

    /**
     * Usage:
     *
     * User.hasMany(Post, {
     *   localField: 'my_posts'
     * })
     */
    hasMany: function hasMany$$(model, opts) {
      return hasMany(model, opts)(this);
    },

    /**
     * Usage:
     *
     * User.hasOne(Profile, {
     *   localField: '_profile'
     * })
     */
    hasOne: function hasOne$$(model, opts) {
      return hasOne(model, opts)(this);
    },

    /**
     * Invoke the {@link module:js-data.exports.setSchema setSchema} decorator on
     * this Model.
     * @param {Object} opts - Property configurations.
     * @return {Model} A reference to the Model for chaining.
     */
    setSchema: function setSchema$$(opts) {
      return setSchema(opts)(this);
    },

    /**
     * Invoke the {@link module:js-data.exports.configure configure} decorator on
     * this Model.
     * @param {Object} opts - Configuration
     * @return {Model} A reference to the Model for chaining.
     */
    configure: function configure$$(opts) {
      return configure(opts)(this);
    },

    /**
     * Invoke the {@link module:js-data.exports.registerAdapter registerAdapter}
     * decorator on this Model.
     * @param {string} name - The name of the adapter to register.
     * @param {Adapter} adapter - The adapter to register.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.default=false] - Whether to make the adapter the
     * default for this Model.
     * @return {Model} A reference to the Model for chaining.
     */
    registerAdapter: function registerAdapter$$(name, adapter, opts) {
      return registerAdapter(name, adapter, opts)(this);
    },

    /**
     * Extend this Model and return a new child Model. Static properties on this
     * Model will be shallow copied to the child Model. The child Model's
     * prototype will point to the parent Model.
     *
     * @example
     * var User = JSData.Model.extend({}, { name: 'User' })
     * @param {Object} props={} - Properties to add to the prototype of the class.
     * @param {Function} [props.initialize] - Optional function to invoke during
     * construction of instances of the class. Will receive any arguments passed
     * to the constructor. "this" will refer to the instance being constructed.
     * @param {Object} classProps - Static properties to add to the class.
     * @param {string} classProps.name - Name of the class. Required.
     * @param {string} [classProps.idAttribute='id'] - Field to use as the unique
     * identifier for instances of the class.
     * @param {Object} [classProps.schema] - Value to pass to the {@link Model.setSchema setSchema}
     * method of the class after the class is created.
     */
    extend: function extend(props, classProps) {
      var Parent = this;
      var Child = undefined;

      Parent.dbg('extend', 'props:', props, 'classProps:', classProps);

      props || (props = {});
      classProps || (classProps = {});

      var initialize = props.initialize;
      delete props.initialize;

      if (props.hasOwnProperty('constructor')) {
        Child = props.constructor;
        delete props.constructor;
      } else {
        if (!classProps.name) {
          throw new TypeError('name: Expected string, found ' + babelHelpers.typeof(classProps.name) + '!');
        }
        if (classProps.csp) {
          Child = function () {
            classCallCheck(this, Child);

            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            var _this = possibleConstructorReturn(this, (Child.__super__ || Object.getPrototypeOf(Child)).apply(this, args));
            if (initialize) {
              initialize.apply(_this, args);
            }
            return _this;
          };
        } else {
          var name = pascalCase(classProps.name);
          var func = 'return function ' + name + '() {\n                        classCallCheck(this, ' + name + ')\n                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n                          args[_key] = arguments[_key];\n                        }\n                        var _this = possibleConstructorReturn(this, (' + name + '.__super__ || Object.getPrototypeOf(' + name + ')).apply(this, args));\n                        if (initialize) {\n                          initialize.apply(_this, arguments)\n                        }\n                        return _this\n                      }';
          Child = new Function('classCallCheck', 'possibleConstructorReturn', 'Parent', 'initialize', func)(classCallCheck, possibleConstructorReturn, Parent, initialize); // eslint-disable-line
        }
      }

      classProps.shortname = classProps.shortname || camelCase(Child.name || classProps.name);
      delete classProps.name;

      var _schema = classProps.schema;
      delete classProps.schema;

      Child.prototype = Object.create(Parent && Parent.prototype, {
        constructor: {
          value: Child,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });

      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(Child, Parent);
      } else if (classProps.strictEs6Class) {
        Child.__proto__ = Parent; // eslint-disable-line
      } else {
          forOwn(Parent, function (value, key) {
            Child[key] = value;
          });
        }
      Object.defineProperty(Child, '__super__', {
        configurable: true,
        value: Parent
      });

      configure(props)(Child.prototype);
      configure(classProps)(Child);
      if (_schema) {
        setSchema(_schema)(Child);
      }

      return Child;
    }
  });

  /**
   * Register a new event listener on this Model.
   *
   * @name on
   * @memberOf! Model
   * @method
   */

  /**
   * Remove an event listener from this Model.
   *
   * @name off
   * @memberOf! Model
   * @method
   */

  /**
   * Trigger an event on this Model.
   *
   * @name emit
   * @memberOf! Model
   * @method
   */

  /**
   * Allow Models themselves emit events. Any events emitted on a Model's
   * collection will also be emitted on the Model itself.
   *
   * A Model's registered listeners are stored on the Model's `__events` property.
   */
  eventify(Model, function () {
    return this._events();
  }, function (value) {
    this._events(value);
  }, true);

  /**
   * Allow instancess to emit events. Any events emitted instances in a Model's
   * collection will also be emitted on the collection itself, and hence, on the
   * Model as well.
   *
   * An instance's registered listeners are stored in the instance's private data
   * hash.
   */
  eventify(Model.prototype, function () {
    return this._get('events');
  }, function (value) {
    this._set('events', value);
  });

  // function lifecycleNoopCb (resource, attrs, cb) {
  //   cb(null, attrs)
  // }

  // function lifecycleNoop (resource, attrs) {
  //   return attrs
  // }

  // class Defaults {
  //   errorFn (a, b) {
  //     if (this.error && typeof this.error === 'function') {
  //       try {
  //         if (typeof a === 'string') {
  //           throw new Error(a)
  //         } else {
  //           throw a
  //         }
  //       } catch (err) {
  //         a = err
  //       }
  //       this.error(this.name || null, a || null, b || null)
  //     }
  //   }
  // }

  // var defaultsPrototype = Defaults.prototype

  // defaultsPrototype.actions = {}
  // defaultsPrototype.afterCreate = lifecycleNoopCb
  // defaultsPrototype.afterCreateCollection = lifecycleNoop
  // defaultsPrototype.afterCreateInstance = lifecycleNoop
  // defaultsPrototype.afterDestroy = lifecycleNoopCb
  // defaultsPrototype.afterEject = lifecycleNoop
  // defaultsPrototype.afterFind = lifecycleNoopCb
  // defaultsPrototype.afterFindAll = lifecycleNoopCb
  // defaultsPrototype.afterInject = lifecycleNoop
  // defaultsPrototype.afterLoadRelations = lifecycleNoopCb
  // defaultsPrototype.afterReap = lifecycleNoop
  // defaultsPrototype.afterUpdate = lifecycleNoopCb
  // defaultsPrototype.afterValidate = lifecycleNoopCb
  // defaultsPrototype.allowSimpleWhere = true
  // defaultsPrototype.basePath = ''
  // defaultsPrototype.beforeCreate = lifecycleNoopCb
  // defaultsPrototype.beforeCreateCollection = lifecycleNoop
  // defaultsPrototype.beforeCreateInstance = lifecycleNoop
  // defaultsPrototype.beforeDestroy = lifecycleNoopCb
  // defaultsPrototype.beforeEject = lifecycleNoop
  // defaultsPrototype.beforeInject = lifecycleNoop
  // defaultsPrototype.beforeReap = lifecycleNoop
  // defaultsPrototype.beforeUpdate = lifecycleNoopCb
  // defaultsPrototype.beforeValidate = lifecycleNoopCb
  // defaultsPrototype.bypassCache = false
  // defaultsPrototype.cacheResponse = !!DSUtils.w
  // defaultsPrototype.csp = false
  // defaultsPrototype.clearEmptyQueries = true
  // defaultsPrototype.computed = {}
  // defaultsPrototype.defaultAdapter = 'http'
  // defaultsPrototype.debug = false
  // defaultsPrototype.defaultValues = {}
  // defaultsPrototype.eagerEject = false
  // // TODO: Implement eagerInject in DS#create
  // defaultsPrototype.eagerInject = false
  // defaultsPrototype.endpoint = ''
  // defaultsPrototype.error = console ? (a, b, c) => console[typeof console.error === 'function' ? 'error' : 'log'](a, b, c) : false
  // defaultsPrototype.errorHandler = function (...args) {
  //   return DSUtils.Promise.reject(args[0])
  // }
  // defaultsPrototype.fallbackAdapters = ['http']
  // defaultsPrototype.findStrictCache = false
  // defaultsPrototype.idAttribute = 'id'
  // defaultsPrototype.ignoredChanges = [/\$/]
  // defaultsPrototype.instanceEvents = !!DSUtils.w
  // defaultsPrototype.keepChangeHistory = false
  // defaultsPrototype.linkRelations = !!DSUtils.w
  // defaultsPrototype.log = console ? (a, b, c, d, e) => console[typeof console.info === 'function' ? 'info' : 'log'](a, b, c, d, e) : false

  // defaultsPrototype.logFn = function (a, b, c, d) {
  //   let _this = this
  //   if (_this.debug && _this.log && typeof _this.log === 'function') {
  //     _this.log(_this.name || null, a || null, b || null, c || null, d || null)
  //   }
  // }

  // defaultsPrototype.maxAge = false
  // defaultsPrototype.methods = {}
  // defaultsPrototype.notify = !!DSUtils.w
  // defaultsPrototype.omit = []
  // defaultsPrototype.onConflict = 'merge'
  // defaultsPrototype.reapAction = DSUtils.w ? 'inject' : 'none'
  // defaultsPrototype.reapInterval = DSUtils.w ? 30000 : false
  // defaultsPrototype.relationsEnumerable = false
  // defaultsPrototype.resetHistoryOnInject = true
  // defaultsPrototype.returnMeta = false
  // defaultsPrototype.scopes = {}
  // defaultsPrototype.strategy = 'single'
  // defaultsPrototype.upsert = !!DSUtils.w
  // defaultsPrototype.useClass = true
  // defaultsPrototype.useFilter = false
  // defaultsPrototype.validate = lifecycleNoopCb
  // defaultsPrototype.watchChanges = !!DSUtils.w

  // class _DS {
  //   constructor (options) {
  //     let _this = this
  //     options = options || {}

  //     _this.store = {}
  //     _this.definitions = {}
  //     _this.adapters = {}
  //     _this.defaults = new Defaults()
  //     _this.observe = DSUtils.observe
  //     DSUtils.forOwn(options, function (v, k) {
  //       if (k === 'omit') {
  //         _this.defaults.omit = v.concat(Defaults.prototype.omit)
  //       } else {
  //         _this.defaults[k] = v
  //       }
  //     })
  //     _this.defaults.logFn('new data store created', _this.defaults)

  //     DSUtils.Events(_this)
  //   }

  //   getAdapterName (options) {
  //     let errorIfNotExist = false
  //     options = options || {}
  //     this.defaults.logFn('getAdapterName', options)
  //     if (DSUtils._s(options)) {
  //       errorIfNotExist = true
  //       options = {
  //         adapter: options
  //       }
  //     }
  //     if (this.adapters[options.adapter]) {
  //       return options.adapter
  //     } else if (errorIfNotExist) {
  //       throw new Error(`${options.adapter} is not a registered adapter!`)
  //     } else {
  //       return options.defaultAdapter
  //     }
  //   }

  //   getAdapter (options) {
  //     options = options || {}
  //     this.defaults.logFn('getAdapter', options)
  //     return this.adapters[this.getAdapterName(options)]
  //   }

  //   registerAdapter (name, Adapter, options) {
  //     let _this = this
  //     options = options || {}
  //     _this.defaults.logFn('registerAdapter', name, Adapter, options)
  //     if (DSUtils.isFunction(Adapter)) {
  //       _this.adapters[name] = new Adapter(options)
  //     } else {
  //       _this.adapters[name] = Adapter
  //     }
  //     if (options.default) {
  //       _this.defaults.defaultAdapter = name
  //     }
  //     _this.defaults.logFn(`default adapter is ${_this.defaults.defaultAdapter}`)
  //   }

  //   errorFn (...args) {
  //     let options = args[args.length - 1]
  //     let defaultHandler = this.defaults.errorHandler
  //     let errorHandler = options ? options.errorHandler : defaultHandler
  //     errorHandler = errorHandler || defaultHandler
  //     return function (err) {
  //       return errorHandler(err, ...args)
  //     }
  //   }
  // }

  // var dsPrototype = _DS.prototype

  // dsPrototype.getAdapterName.shorthand = false
  // dsPrototype.getAdapter.shorthand = false
  // dsPrototype.registerAdapter.shorthand = false
  // dsPrototype.errors = DSErrors
  // dsPrototype.utils = DSUtils

  function DS(opts) {
    classCallCheck(this, DS);
    opts || (opts = {});
    this.definitions = {};
  }

  addHiddenPropsToTarget(DS.prototype, {
    clear: function clear() {
      var ejected = {};
      forOwn(this.definitions, function (definition) {
        var name = definition.name;
        ejected[name] = definition.ejectAll();
      });
      return ejected;
    },
    defineModel: function defineModel(opts) {
      var Child = Model.extend(opts.methods || {}, opts);
      this.definitions[Child.name] = Child;
      return Child;
    }
  });

  DS.prototype.defineResource = DS.prototype.defineModel;

  forOwn(Model, function (value, key) {
    if (isFunction(value)) {
      DS.prototype[key] = function (name) {
        var _definitions$name;

        if (!this.definitions[name]) {
          throw new Error(name + ' is not a registered Model!');
        }

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return (_definitions$name = this.definitions[name])[key].apply(_definitions$name, args);
      };
    }
  });

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
   * @property {Function} belongsTo - {@link module:js-data.exports.belongsTo belongsTo}
   * decorator function.
   * @property {Function} configure - {@link module:js-data.exports.configure configure}
   * decorator function.
   * @property {Function} Collection - {@link Collection} class.
   * @property {Function} DS - {@link DS} class.
   * @property {Function} hasMany - {@link module:js-data.exports.hasMany hasMany}
   * decorator function.
   * @property {Function} hasOne - {@link module:js-data.exports.hasOne hasOne}
   * decorator function.
   * @property {Function} initialize - {@link module:js-data.exports.initialize initialize}
   * decorator function.
   * @property {Function} Model - {@link Model} class.
   * @property {Function} registerAdapter - {@link registerAdapter} decorator
   * function.
   * @property {Function} setSchema - {@link setSchema} decorator function.
   * @property {Function} Query - {@link Query} class.
   * @property {Object} utils - Utility methods used by the `js-data` module. See
   * {@link module:js-data.module:utils utils}.
   * @property {Object} version - Details of the current version of the `js-data`
   * module.
   * @property {string} version.full - The full semver value.
   * @property {number} version.major - The major version number.
   * @property {number} version.minor - The minor version number.
   * @property {number} version.patch - The patch version number.
   * @property {(string|boolean)} version.alpha - The alpha version value,
   * otherwise `false` if the current version is not alpha.
   * @property {(string|boolean)} version.beta - The beta version value,
   * otherwise `false` if the current version is not beta.
   */

  if (!Promise.prototype.spread) {
    Promise.prototype.spread = function (cb) {
      return this.then(function (arr) {
        return cb.apply(this, arr);
      });
    };
  }

  var utils = _utils;

  var version = {
    full: '3.0.0-alpha.7',
    major: parseInt('3', 10),
    minor: parseInt('0', 10),
    patch: parseInt('0', 10),
    alpha: '7' !== 'false' ? '7' : false,
    beta: 'false' !== 'false' ? 'false' : false
  };

  exports.utils = utils;
  exports.version = version;
  exports.Collection = Collection;
  exports.Query = Query;
  exports.DS = DS;
  exports.belongsTo = belongsTo;
  exports.configure = configure;
  exports.hasMany = hasMany;
  exports.hasOne = hasOne;
  exports.setSchema = setSchema;
  exports.registerAdapter = registerAdapter;
  exports.Model = Model;
  exports.rules = rules;
  exports.validate = validate;

}));
//# sourceMappingURL=js-data-debug.js.map