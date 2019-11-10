/*!
* js-data
* @version 3.0.0-alpha.2 - Homepage <http://www.js-data.io/>
* @author Jason Dobry <jason.dobry@gmail.com>
* @copyright (c) 2014-2015 Jason Dobry
* @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
*
* @overview Robust framework-agnostic data store.
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JSData"] = factory();
	else
		root["JSData"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.version = exports.utils = undefined;
	
	var _collection = __webpack_require__(1);
	
	var _loop = function _loop(_key6) {
	  if (_key6 === "default") return 'continue';
	  Object.defineProperty(exports, _key6, {
	    enumerable: true,
	    get: function get() {
	      return _collection[_key6];
	    }
	  });
	};
	
	for (var _key6 in _collection) {
	  var _ret = _loop(_key6);
	
	  if (_ret === 'continue') continue;
	}
	
	var _datastore = __webpack_require__(14);
	
	var _loop2 = function _loop2(_key7) {
	  if (_key7 === "default") return 'continue';
	  Object.defineProperty(exports, _key7, {
	    enumerable: true,
	    get: function get() {
	      return _datastore[_key7];
	    }
	  });
	};
	
	for (var _key7 in _datastore) {
	  var _ret2 = _loop2(_key7);
	
	  if (_ret2 === 'continue') continue;
	}
	
	var _decorators = __webpack_require__(4);
	
	var _loop3 = function _loop3(_key8) {
	  if (_key8 === "default") return 'continue';
	  Object.defineProperty(exports, _key8, {
	    enumerable: true,
	    get: function get() {
	      return _decorators[_key8];
	    }
	  });
	};
	
	for (var _key8 in _decorators) {
	  var _ret3 = _loop3(_key8);
	
	  if (_ret3 === 'continue') continue;
	}
	
	var _model = __webpack_require__(15);
	
	var _loop4 = function _loop4(_key9) {
	  if (_key9 === "default") return 'continue';
	  Object.defineProperty(exports, _key9, {
	    enumerable: true,
	    get: function get() {
	      return _model[_key9];
	    }
	  });
	};
	
	for (var _key9 in _model) {
	  var _ret4 = _loop4(_key9);
	
	  if (_ret4 === 'continue') continue;
	}
	
	var _validate = __webpack_require__(10);
	
	var _loop5 = function _loop5(_key10) {
	  if (_key10 === "default") return 'continue';
	  Object.defineProperty(exports, _key10, {
	    enumerable: true,
	    get: function get() {
	      return _validate[_key10];
	    }
	  });
	};
	
	for (var _key10 in _validate) {
	  var _ret5 = _loop5(_key10);
	
	  if (_ret5 === 'continue') continue;
	}
	
	var _utils2 = __webpack_require__(3);
	
	var _utils = _interopRequireWildcard(_utils2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
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
	
	var utils = exports.utils = _utils;
	
	var version = exports.version = {
	  full: '3.0.0-alpha.2',
	  major: parseInt('3', 10),
	  minor: parseInt('0', 10),
	  patch: parseInt('0', 10),
	  alpha:  true ? '2' : false,
	  beta:  true ? 'false' : false
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Collection = Collection;
	
	var _query4 = __webpack_require__(2);
	
	var _utils = __webpack_require__(3);
	
	var _decorators = __webpack_require__(4);
	
	var _mindex = __webpack_require__(12);
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	exports.Query = _query4.Query;
	
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
	
	  if (!(0, _utils.isArray)(data)) {
	    throw new TypeError('new Collection([data]): data: Expected array. Found ' + (typeof data === 'undefined' ? 'undefined' : _typeof(data)));
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
	  this.index = new _mindex.Index([idAttribute], idAttribute);
	  /**
	   * Object that holds the other secondary indexes of this collection.
	   * @type {Object.<string, Index>}
	   */
	  this.indexes = {};
	  data.forEach(function (record) {
	    _this.index.insertRecord(record);
	    if (record && (0, _utils.isFunction)(record.on)) {
	      record.on('all', _this._onModelEvent, _this);
	    }
	  });
	}
	
	(0, _decorators.configure)({
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
	   * @param {string[]} [keyList] - Array of field names to use as the key or
	   * compound key of the new secondary index. If no keyList is provided, then
	   * the name will also be the field that is used to index the collection.
	   * @return {Collection} A reference to itself for chaining.
	   */
	  createIndex: function createIndex(name, keyList) {
	    if ((0, _utils.isString)(name) && keyList === undefined) {
	      keyList = [name];
	    }
	    var index = this.indexes[name] = new _mindex.Index(keyList, this.idAttribute);
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
	    return new _query4.Query(this);
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
	  between: function between() {
	    var _query;
	
	    return (_query = this.query()).between.apply(_query, arguments).run();
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
	  get: function get() {
	    var _query2;
	
	    return (_query2 = this.query()).get.apply(_query2, arguments).run();
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
	    var _query3;
	
	    return (_query3 = this.query()).getAll.apply(_query3, arguments).run();
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
	   * @param {Function} [thisArg] - Context to which to bind `queryOrFn` if
	   * `queryOrFn` is a function.
	   * @return {Array} The result.
	   */
	  filter: function filter(opts) {
	    return this.query().filter(opts).run();
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
	   * @param {Function} callback - Reduction callback.
	   * @param {*} initialValue - Initial value of the reduction.
	   * @return {*} The result.
	   */
	  reduce: function reduce(callback, initialValue) {
	    var data = this.getAll();
	    return data.reduce(callback, initialValue);
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
	    (0, _utils.forOwn)(this.indexes, function (index, name) {
	      index.insertRecord(record);
	    });
	    if (record && (0, _utils.isFunction)(record.on)) {
	      record.on('all', this._onModelEvent, this);
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
	    (0, _utils.forOwn)(this.indexes, function (index, name) {
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
	    (0, _utils.forOwn)(this.indexes, function (index, name) {
	      index.removeRecord(record);
	    });
	    if (record && (0, _utils.isFunction)(record.off)) {
	      record.off('all', this._onModelEvent, this);
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
	  }
	})(Collection.prototype);
	
	(0, _utils.eventify)(Collection.prototype, function () {
	  return this._events;
	}, function (value) {
	  this._events = value;
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Query = Query;
	
	var _utils = __webpack_require__(3);
	
	var _decorators = __webpack_require__(4);
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	/**
	 * A class used by the @{link Collection} class to build queries to be executed
	 * against the collection's data. An instance of `Query` is returned by
	 * {@link Model.query} and {@link Collection.query}.
	 * @class Query
	 * @param {Collection} collection - The collection on which this query operates.
	 */
	function Query(collection) {
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
	  var cA = (0, _utils.get)(a, def[0]);
	  var cB = (0, _utils.get)(b, def[0]);
	  if (cA && (0, _utils.isString)(cA)) {
	    cA = cA.toUpperCase();
	  }
	  if (cB && (0, _utils.isString)(cB)) {
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
	      return !(0, _utils.intersection)(value || [], predicate || []).length;
	    case 'isectNotEmpty':
	      return (0, _utils.intersection)(value || [], predicate || []).length;
	    case 'in':
	      return predicate.indexOf(value) !== -1;
	    case 'notIn':
	      return predicate.indexOf(value) === -1;
	    case 'contains':
	      return value.indexOf(predicate) !== -1;
	    case 'notContains':
	      return value.indexOf(predicate) === -1;
	    default:
	      if (op.indexOf('like') === 0) {
	        return like(predicate, op.substr(4)).exec(value) !== null;
	      } else if (op.indexOf('notLike') === 0) {
	        return like(predicate, op.substr(7)).exec(value) === null;
	      }
	  }
	}
	
	(0, _decorators.configure)({
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
	    if (keyList && !(0, _utils.isArray)(keyList)) {
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
	
	    if (!args.length || args.length === 1 && (0, _utils.isObject)(args[0])) {
	      this.getData();
	      return this;
	    } else if (args.length && (0, _utils.isObject)(args[args.length - 1])) {
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
	    if ((0, _utils.isObject)(query)) {
	      (function () {
	        var where = {};
	        // Filter
	        if ((0, _utils.isObject)(query.where)) {
	          where = query.where;
	        }
	        (0, _utils.forOwn)(query, function (value, key) {
	          if (!(key in reserved) && !(key in where)) {
	            where[key] = {
	              '==': value
	            };
	          }
	        });
	
	        var fields = [];
	        var ops = [];
	        var predicates = [];
	        (0, _utils.forOwn)(where, function (clause, field) {
	          if (!(0, _utils.isObject)(clause)) {
	            clause = {
	              '==': clause
	            };
	          }
	          (0, _utils.forOwn)(clause, function (expr, op) {
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
	                var expr = evaluate((0, _utils.get)(item, fields[i]), op, predicates[i]);
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
	
	        if ((0, _utils.isString)(orderBy)) {
	          orderBy = [[orderBy, 'ASC']];
	        }
	        if (!(0, _utils.isArray)(orderBy)) {
	          orderBy = null;
	        }
	
	        // Apply 'orderBy'
	        if (orderBy) {
	          (function () {
	            var index = 0;
	            orderBy.forEach(function (def, i) {
	              if ((0, _utils.isString)(def)) {
	                orderBy[i] = [def, 'ASC'];
	              }
	            });
	            _this2.data.sort(function (a, b) {
	              return compare(orderBy, index, a, b);
	            });
	          })();
	        }
	
	        // Skip
	        if ((0, _utils.isNumber)(query.skip)) {
	          _this2.skip(query.skip);
	        } else if ((0, _utils.isNumber)(query.offset)) {
	          _this2.skip(query.offset);
	        }
	        // Limit
	        if ((0, _utils.isNumber)(query.limit)) {
	          _this2.limit(query.limit);
	        }
	      })();
	    } else if ((0, _utils.isFunction)(query)) {
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
	    if (!(0, _utils.isNumber)(num)) {
	      throw new TypeError('skip: Expected number but found ' + (typeof num === 'undefined' ? 'undefined' : _typeof(num)) + '!');
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
	    if (!(0, _utils.isNumber)(num)) {
	      throw new TypeError('limit: Expected number but found ' + (typeof num === 'undefined' ? 'undefined' : _typeof(num)) + '!');
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
	})(Query.prototype);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isObject = isObject;
	exports.isRegExp = isRegExp;
	exports.isString = isString;
	exports.isDate = isDate;
	exports.isNumber = isNumber;
	exports.isBoolean = isBoolean;
	exports.isFunction = isFunction;
	exports.isSorN = isSorN;
	exports.get = get;
	exports.unset = unset;
	exports.set = set;
	exports.forOwn = forOwn;
	exports.deepMixIn = deepMixIn;
	exports.resolve = resolve;
	exports.reject = reject;
	exports._ = _;
	exports.intersection = intersection;
	exports.fillIn = fillIn;
	exports.isBlacklisted = isBlacklisted;
	exports.fromJson = fromJson;
	exports.copy = copy;
	exports.pascalCase = pascalCase;
	exports.camelCase = camelCase;
	exports.eventify = eventify;
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	/**
	 * @module utils
	 * @memberof module:js-data
	 */
	
	/**
	 * Return whether the provided value is an array.
	 * @method
	 * @param {*} [value] - The value to test.
	 */
	var isArray = exports.isArray = Array.isArray;
	/**
	 * Return whether the provided value is an object type.
	 * @param {*} [value] - The value to test.
	 */
	function isObject(value) {
	  return toString.call(value) === '[object Object]' || false;
	}
	function isPlainObject(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Object;
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
	  return typeof value === 'string' || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toString.call(value) === '[object String]' || false;
	}
	/**
	 * Return whether the provided value is a date type.
	 * @param {*} [value] - The value to test.
	 */
	function isDate(value) {
	  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toString.call(value) === '[object Date]' || false;
	}
	/**
	 * Return whether the provided value is a number type.
	 * @param {*} [value] - The value to test.
	 */
	function isNumber(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
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
	function set(object, path, value) {
	  if (isObject(path)) {
	    forOwn(path, function (value, _path) {
	      set(object, _path, value);
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
	function resolve(value) {
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
	    if (opts[key] === undefined && !isFunction(value)) {
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
	var toJson = exports.toJson = JSON.stringify;
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
	function eventify(target, getter, setter) {
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _belongsTo = __webpack_require__(5);
	
	var _loop = function _loop(_key7) {
	  if (_key7 === "default") return 'continue';
	  Object.defineProperty(exports, _key7, {
	    enumerable: true,
	    get: function get() {
	      return _belongsTo[_key7];
	    }
	  });
	};
	
	for (var _key7 in _belongsTo) {
	  var _ret = _loop(_key7);
	
	  if (_ret === 'continue') continue;
	}
	
	var _configure = __webpack_require__(6);
	
	var _loop2 = function _loop2(_key8) {
	  if (_key8 === "default") return 'continue';
	  Object.defineProperty(exports, _key8, {
	    enumerable: true,
	    get: function get() {
	      return _configure[_key8];
	    }
	  });
	};
	
	for (var _key8 in _configure) {
	  var _ret2 = _loop2(_key8);
	
	  if (_ret2 === 'continue') continue;
	}
	
	var _hasMany = __webpack_require__(7);
	
	var _loop3 = function _loop3(_key9) {
	  if (_key9 === "default") return 'continue';
	  Object.defineProperty(exports, _key9, {
	    enumerable: true,
	    get: function get() {
	      return _hasMany[_key9];
	    }
	  });
	};
	
	for (var _key9 in _hasMany) {
	  var _ret3 = _loop3(_key9);
	
	  if (_ret3 === 'continue') continue;
	}
	
	var _hasOne = __webpack_require__(8);
	
	var _loop4 = function _loop4(_key10) {
	  if (_key10 === "default") return 'continue';
	  Object.defineProperty(exports, _key10, {
	    enumerable: true,
	    get: function get() {
	      return _hasOne[_key10];
	    }
	  });
	};
	
	for (var _key10 in _hasOne) {
	  var _ret4 = _loop4(_key10);
	
	  if (_ret4 === 'continue') continue;
	}
	
	var _schema = __webpack_require__(9);
	
	var _loop5 = function _loop5(_key11) {
	  if (_key11 === "default") return 'continue';
	  Object.defineProperty(exports, _key11, {
	    enumerable: true,
	    get: function get() {
	      return _schema[_key11];
	    }
	  });
	};
	
	for (var _key11 in _schema) {
	  var _ret5 = _loop5(_key11);
	
	  if (_ret5 === 'continue') continue;
	}
	
	var _adapter = __webpack_require__(11);
	
	var _loop6 = function _loop6(_key12) {
	  if (_key12 === "default") return 'continue';
	  Object.defineProperty(exports, _key12, {
	    enumerable: true,
	    get: function get() {
	      return _adapter[_key12];
	    }
	  });
	};
	
	for (var _key12 in _adapter) {
	  var _ret6 = _loop6(_key12);
	
	  if (_ret6 === 'continue') continue;
	}
	
	// Workaround for https://github.com/babel/babel/issues/2763
	var DECORATORS = exports.DECORATORS = 'FIXME';

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utils = __webpack_require__(3);
	
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
	    get: function get() {
	      if (!this._get('$')) {
	        return this._get('links.' + localField);
	      }
	      var key = (0, _utils.get)(this, localKey);
	      var item = key !== undefined ? Relation.get(key) : undefined;
	      this._set('links.' + localField, item);
	      return item;
	    },
	
	    // Set default method for setting the linked relation
	    set: function set(parent) {
	      this._set('links.' + localField, parent);
	      (0, _utils.set)(this, localKey, parent[Relation.idAttribute]);
	      return (0, _utils.get)(this, localField);
	    }
	  };
	
	  // Check whether the relation shouldn't actually be linked via a getter
	  if (opts.link === false || opts.link === undefined && !Model.linkRelations) {
	    delete descriptor.get;
	    delete descriptor.set;
	    descriptor.writable = true;
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
	      descriptor.set = function (parent) {
	        var _this2 = this;
	
	        // Call user-defined getter, passing in:
	        //  - target Model
	        //  - related Model
	        //  - instance of target Model
	        //  - instance of related Model
	        //  - the original setter function, in case the user wants to use it
	        return opts.set(Model, Relation, this, parent, originalSet ? function () {
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
	  opts.type = 'belongsTo';
	  opts.name = Model.name;
	  opts.relation = Relation.name;
	  opts.Relation = Relation;
	  Model.relationList.push(opts);
	  Model.relationFields.push(localField);
	  Model.collection.createIndex(localKey);
	
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
	exports.belongsTo = function (Model, opts) {
	  return function (target) {
	    target.dbg(op, 'Model:', Model, 'opts:', opts);
	    return applyBelongsTo(target, Model, opts);
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configure = configure;
	
	var _utils = __webpack_require__(3);
	
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
	    (0, _utils.forOwn)(opts, function (value, key) {
	      if (target[key] === undefined || overwrite) {
	        target[key] = (0, _utils.copy)(value);
	      }
	    });
	    return target;
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hasMany = hasMany;
	
	var _utils = __webpack_require__(3);
	
	var op = 'hasMany';
	
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
	function applyHasMany(Model, Relation, opts) {
	  opts || (opts = {});
	  // Choose field where the relation will be attached
	  var localField = opts.localField || (0, _utils.camelCase)(Relation.name) + 'Collection';
	  // Choose field on related instances that holds the primary key of instances
	  // of the target Model
	  var foreignKey = opts.foreignKey;
	  var localKeys = opts.localKeys;
	  var foreignKeys = opts.foreignKeys;
	
	  if (!foreignKey && !localKeys && !foreignKeys) {
	    foreignKey = opts.foreignKey = (0, _utils.camelCase)(Model.name) + 'Id';
	  }
	  if (foreignKey) {
	    Relation.collection.createIndex(foreignKey);
	  }
	
	  // Setup configuration of the property
	  var descriptor = {
	    // Whether the field specified by "localField" will show up in "for...in"
	    enumerable: opts.enumerable !== undefined ? !!opts.enumerable : false,
	    // Set default method for retrieving the linked relation
	    get: function get() {
	      if (!this._get('$')) {
	        return this._get('links.' + localField);
	      }
	      var query = {};
	      var items = undefined;
	      if (foreignKey) {
	        // Make a FAST retrieval of the relation using a secondary index
	        items = Relation.getAll((0, _utils.get)(this, Model.idAttribute), { index: foreignKey });
	      } else if (localKeys) {
	        var keys = (0, _utils.get)(this, localKeys) || [];
	        var args = (0, _utils.isArray)(keys) ? keys : Object.keys(keys);
	        // Make a slower retrieval using the ids in the "localKeys" array
	        items = Relation.getAll.apply(Relation, args);
	      } else if (foreignKeys) {
	        (0, _utils.set)(query, 'where.' + foreignKeys + '.contains', (0, _utils.get)(this, Model.idAttribute));
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
	          var id = (0, _utils.get)(_this, Model.idAttribute);
	          if (foreignKey) {
	            children.forEach(function (child) {
	              (0, _utils.set)(child, foreignKey, id);
	            });
	          } else if (localKeys) {
	            (function () {
	              var keys = [];
	              children.forEach(function (child) {
	                keys.push((0, _utils.get)(child, Relation.idAttribute));
	              });
	              (0, _utils.set)(_this, localKeys, keys);
	            })();
	          } else if (foreignKeys) {
	            children.forEach(function (child) {
	              var keys = (0, _utils.get)(child, foreignKeys);
	              if (keys) {
	                if (keys.indexOf(id) === -1) {
	                  keys.push(id);
	                }
	              } else {
	                (0, _utils.set)(child, foreignKeys, [id]);
	              }
	            });
	          }
	        })();
	      }
	      return (0, _utils.get)(this, localField);
	    }
	  };
	
	  // Check whether the relation shouldn't actually be linked via a getter
	  if (opts.link === false || opts.link === undefined && !Model.linkRelations) {
	    delete descriptor.get;
	    delete descriptor.set;
	    descriptor.writable = true;
	  }
	
	  // Check for user-defined getter
	  if (opts.get) {
	    (function () {
	      var originalGet = descriptor.get;
	      // Set user-defined getter
	      descriptor.get = function () {
	        var _this2 = this;
	
	        // Call user-defined getter, passing in:
	        //  - target Model
	        //  - related Model
	        //  - instance of target Model
	        //  - the original getter function, in case the user wants to use it
	        return opts.get(Model, Relation, this, originalGet ? function () {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }
	
	          return originalGet.apply(_this2, args);
	        } : undefined);
	      };
	    })();
	  }
	
	  // Check for user-defined setter
	  if (opts.set) {
	    (function () {
	      var originalSet = descriptor.set;
	      // Set user-defined setter
	      descriptor.set = function (children) {
	        var _this3 = this;
	
	        // Call user-defined getter, passing in:
	        //  - target Model
	        //  - related Model
	        //  - instance of target Model
	        //  - instances of related Model
	        //  - the original setter function, in case the user wants to use it
	        return opts.set(Model, Relation, this, children, originalSet ? function () {
	          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	          }
	
	          return originalSet.apply(_this3, args);
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
	  opts.type = 'hasMany';
	  opts.name = Model.name;
	  opts.relation = Relation.name;
	  opts.Relation = Relation;
	  Model.relationList.push(opts);
	  Model.relationFields.push(localField);
	
	  // Return target Model for chaining
	  return Model;
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
	    target.dbg(op, 'Model:', Model, 'opts:', opts);
	    return applyHasMany(target, Model, opts);
	  };
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hasOne = hasOne;
	
	var _utils = __webpack_require__(3);
	
	var op = 'hasOne';
	
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
	  var localField = opts.localField = opts.localField || (0, _utils.camelCase)(Relation.name);
	  // Choose field that holds the primary key of the relation
	  var foreignKey = opts.foreignKey = opts.foreignKey || (0, _utils.camelCase)(Model.name) + 'Id';
	
	  // Setup configuration of the property
	  var descriptor = {
	    // Whether the field specified by "localField" will show up in "for...in"
	    enumerable: opts.enumerable !== undefined ? !!opts.enumerable : false,
	    // Set default method for retrieving the linked relation
	    get: function get() {
	      if (!this._get('$')) {
	        return this._get('links.' + localField);
	      }
	      var items = Relation.getAll((0, _utils.get)(this, Model.idAttribute), { index: foreignKey });
	      var item = items && items.length ? items[0] : undefined;
	      this._set('links.' + localField, item);
	      return item;
	    },
	
	    // Set default method for setting the linked relation
	    set: function set(child) {
	      this._set('links.' + localField, child);
	      (0, _utils.set)(child, foreignKey, (0, _utils.get)(this, Model.idAttribute));
	      return (0, _utils.get)(this, localField);
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
	  Model.collection.createIndex(foreignKey);
	
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
	    target.dbg(op, 'Model:', Model, 'opts:', opts);
	    return applyHasOne(target, Model, opts);
	  };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setSchema = setSchema;
	
	var _utils = __webpack_require__(3);
	
	var _validate = __webpack_require__(10);
	
	var _configure = __webpack_require__(6);
	
	var op = 'setSchema';
	
	/**
	 * @param {Model} target - Target Model.
	 * @param {string} key - Key for new property.
	 * @param {Object} opts - Configuration options.
	 * @ignore
	 */
	function makeDescriptor(target, key, opts) {
	  var descriptor = {
	    enumerable: opts.enumerable !== undefined ? opts.enumerable : true,
	    configurable: opts.configurable !== undefined ? opts.configurable : true
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
	      var errors = (0, _validate.validate)(opts, value);
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
	        if (current !== value) {
	          changed.push(key);
	        }
	        if (previous !== value) {
	          _set('changes.' + key, value);
	        } else {
	          _unset('changes.' + key);
	        }
	        if (!changing && changed.length) {
	          _set('changed', changed);
	          _set('changing', true);
	          _set('eventId', setTimeout(function () {
	            _unset('changed');
	            _unset('eventId');
	            _unset('changing');
	            var i = undefined;
	            for (i = 0; i < changed.length; i++) {
	              _this.emit('change:' + changed[i], _this, (0, _utils.get)(_this, changed[i]));
	            }
	            _this.emit('change', _this, _get('changes'));
	          }, 0));
	        }
	      })();
	    }
	    _set('props.' + key, value);
	    if (_get('$') && opts.indexed) {
	      target.collection.updateRecord(this, { index: key });
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
	    target.dbg(op, 'opts:', opts);
	
	    target.schema || (target.schema = {});
	    (0, _configure.configure)(target.schema, opts);
	
	    (0, _utils.forOwn)(opts, function (prop, key) {
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.rules = undefined;
	exports.validate = validate;
	
	var _utils = __webpack_require__(3);
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	var types = {
	  array: _utils.isArray,
	  boolean: _utils.isBoolean,
	  integer: _utils.isNumber,
	  number: _utils.isNumber,
	  'null': function _null(value) {
	    return value === null;
	  },
	  object: _utils.isObject,
	  string: _utils.isString
	};
	
	var rules = exports.rules = {
	  type: function type(predicate, value) {
	    if (value === undefined) {
	      return;
	    }
	    if ((0, _utils.isString)(predicate)) {
	      predicate = [predicate];
	    }
	    var errors = predicate.map(function (type) {
	      var validator = types[type];
	      if (!validator) {
	        return 'type: Unknown type ' + predicate;
	      }
	      return validator(value) ? undefined : 1;
	    });
	    return errors.indexOf(undefined) !== -1 ? undefined : 'type: Expected: ' + predicate.join(' or ') + '. Actual: ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value));
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
	  (0, _utils.forOwn)(schema, function (predicate, rule) {
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

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerAdapter = registerAdapter;
	var op = 'registerAdapter';
	
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
	  opts.op = op;
	  return function (target) {
	    target.dbg(op, 'name:', name, 'adapter:', adapter, 'opts:', opts);
	    // Register the adapter
	    target.adapters[name] = adapter;
	    // Optionally make it the default adapter for the target.
	    if (opts === true || opts.default) {
	      target.defaultAdapter = name;
	    }
	  };
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Index = Index;
	
	var _utils = __webpack_require__(3);
	
	var _decorators = __webpack_require__(4);
	
	var _utils2 = __webpack_require__(13);
	
	function Index() {
	  var fieldList = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var idAttribute = arguments[1];
	
	  if (!(0, _utils.isArray)(fieldList)) {
	    throw new Error('fieldList must be an array.');
	  }
	
	  this.fieldList = fieldList;
	  this.idAttribute = idAttribute;
	  this.isIndex = true;
	  this.keys = [];
	  this.values = [];
	} // Copyright (c) 2015, InternalFX.
	
	// Permission to use, copy, modify, and/or distribute this software for any purpose with or
	// without fee is hereby granted, provided that the above copyright notice and this permission
	// notice appear in all copies.
	
	// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO
	// THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT
	// SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR
	// ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
	// OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE
	// USE OR PERFORMANCE OF THIS SOFTWARE.
	
	// Modifications
	// Copyright 2015 Jason Dobry
	//
	// Summary of modifications:
	// Converted to ES6 Class syntax
	// Reworked dependencies so as to re-use code already in js-data
	
	(0, _decorators.configure)({
	  set: function set(keyList, value) {
	    if (!(0, _utils.isArray)(keyList)) {
	      keyList = [keyList];
	    }
	
	    var key = keyList.shift() || null;
	    var pos = (0, _utils2.binarySearch)(this.keys, key);
	
	    if (keyList.length === 0) {
	      if (pos.found) {
	        var dataLocation = (0, _utils2.binarySearch)(this.values[pos.index], value, this.idAttribute);
	        if (!dataLocation.found) {
	          (0, _utils2.insertAt)(this.values[pos.index], dataLocation.index, value);
	        }
	      } else {
	        (0, _utils2.insertAt)(this.keys, pos.index, key);
	        (0, _utils2.insertAt)(this.values, pos.index, [value]);
	      }
	    } else {
	      if (pos.found) {
	        this.values[pos.index].set(keyList, value);
	      } else {
	        (0, _utils2.insertAt)(this.keys, pos.index, key);
	        var newIndex = new Index([], this.idAttribute);
	        newIndex.set(keyList, value);
	        (0, _utils2.insertAt)(this.values, pos.index, newIndex);
	      }
	    }
	  },
	  get: function get(keyList) {
	    if (!(0, _utils.isArray)(keyList)) {
	      keyList = [keyList];
	    }
	
	    var key = keyList.shift() || null;
	    var pos = (0, _utils2.binarySearch)(this.keys, key);
	
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
	
	    return this.between(leftKeys, rightKeys, (0, _utils.omit)(_query, ['>', '>=', '<', '<=']));
	  },
	  between: function between(leftKeys, rightKeys) {
	    var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    if (!(0, _utils.isArray)(leftKeys)) {
	      leftKeys = [leftKeys];
	    }
	    if (!(0, _utils.isArray)(rightKeys)) {
	      rightKeys = [rightKeys];
	    }
	    (0, _utils.fillIn)(opts, {
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
	      pos = (0, _utils2.binarySearch)(this.keys, leftKey);
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
	            results = results.concat(this.values[i]._between((0, _utils.copy)(leftKeys), rightKeys.map(function () {
	              return undefined;
	            }), opts));
	          } else if (currKey === rightKey) {
	            results = results.concat(this.values[i]._between(leftKeys.map(function () {
	              return undefined;
	            }), (0, _utils.copy)(rightKeys), opts));
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
	  remove: function remove(keyList, value) {
	    if (!(0, _utils.isArray)(keyList)) {
	      keyList = [keyList];
	    }
	
	    var key = keyList.shift();
	    var pos = (0, _utils2.binarySearch)(this.keys, key);
	
	    if (keyList.length === 0) {
	      if (pos.found) {
	        var dataLocation = (0, _utils2.binarySearch)(this.values[pos.index], value, this.idAttribute);
	        if (dataLocation.found) {
	          (0, _utils2.removeAt)(this.values[pos.index], dataLocation.index);
	          if (this.values[pos.index].length === 0) {
	            (0, _utils2.removeAt)(this.keys, pos.index);
	            (0, _utils2.removeAt)(this.values, pos.index);
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
	      return data[field] || null;
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
	            (0, _utils2.removeAt)(_this.keys, i);
	            (0, _utils2.removeAt)(_this.values, i);
	          }
	          removed = true;
	          return false;
	        }
	      } else {
	        var dataLocation = (0, _utils2.binarySearch)(value, data, _this.idAttribute);
	        if (dataLocation.found) {
	          (0, _utils2.removeAt)(value, dataLocation.index);
	          if (value.length === 0) {
	            (0, _utils2.removeAt)(_this.keys, i);
	            (0, _utils2.removeAt)(_this.values, i);
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
	})(Index.prototype);

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sort = sort;
	exports.insertAt = insertAt;
	exports.removeAt = removeAt;
	exports.binarySearch = binarySearch;
	function sort(a, b, field) {
	  // Short-curcuit comparison if a and b are strictly equal
	  // This is absolutely necessary for indexed objects that
	  // don't have the idAttribute field
	  if (a === b) {
	    return 0;
	  }
	  if (field) {
	    a = a[field];
	    b = b[field];
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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DS = DS;
	
	var _decorators = __webpack_require__(4);
	
	var _utils = __webpack_require__(3);
	
	var _model = __webpack_require__(15);
	
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
	  opts || (opts = {});
	  this.definitions = {};
	} /* jshint eqeqeq:false */
	
	(0, _decorators.configure)({
	  clear: function clear() {
	    var ejected = {};
	    (0, _utils.forOwn)(this.definitions, function (definition) {
	      var name = definition.name;
	      ejected[name] = definition.ejectAll();
	    });
	    return ejected;
	  },
	  defineModel: function defineModel(opts) {
	    var Child = _model.Model.extend(opts.methods || {}, opts);
	    this.definitions[Child.name] = Child;
	    return Child;
	  }
	})(DS.prototype);
	
	DS.prototype.defineResource = DS.prototype.defineModel;
	
	(0, _utils.forOwn)(_model.Model, function (value, key) {
	  if ((0, _utils.isFunction)(value)) {
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Model = undefined;
	
	var _utils = __webpack_require__(3);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _decorators = __webpack_require__(4);
	
	var _collection3 = __webpack_require__(1);
	
	var _validate2 = __webpack_require__(10);
	
	var _validate = _interopRequireWildcard(_validate2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var resolve = utils.resolve;
	
	var isBrowser = false;
	
	try {
	  isBrowser = !!window;
	} catch (e) {}
	
	var handleResponse = function handleResponse(model, data, opts, adapterName) {
	  if (opts.raw) {
	    data.adapter = adapterName;
	    if (opts.autoInject) {
	      data.data = model.inject(data.data);
	    }
	    return data;
	  } else if (opts.autoInject) {
	    data = model.inject(data);
	  }
	  return data;
	};
	
	/**
	 * This is here so Babel will give us the inheritance helpers which we can
	 * re-use for the "extend" method.
	 * @ignore
	 */
	
	var BaseModel = function BaseModel() {
	  _classCallCheck(this, BaseModel);
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
	
	var Model = exports.Model = (function (_BaseModel) {
	  _inherits(Model, _BaseModel);
	
	  function Model(props, opts) {
	    _classCallCheck(this, Model);
	
	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this));
	
	    props || (props = {});
	    opts || (opts = {});
	    var _props = {};
	    Object.defineProperties(_this2, {
	      _get: {
	        value: function value(key) {
	          return utils.get(_props, key);
	        }
	      },
	      _set: {
	        value: function value(key, _value, opty) {
	          return utils.set(_props, key, _value, opts);
	        }
	      },
	      _unset: {
	        value: function value(key) {
	          return utils.unset(_props, key);
	        }
	      }
	    });
	    _this2._set('creating', true);
	    if (opts.noValidate) {
	      _this2._set('noValidate', true);
	    }
	    utils.fillIn(_this2, props);
	    _this2._unset('creating');
	    _this2._unset('noValidate');
	    _this2._set('previous', utils.copy(props));
	    return _this2;
	  }
	
	  _createClass(Model, [{
	    key: 'schema',
	    value: function schema(key) {
	      var _schema = this.constructor.schema;
	      return key ? _schema[key] : _schema;
	    }
	  }, {
	    key: 'validate',
	    value: function validate(obj, value) {
	      var errors = [];
	      var _schema = this.schema();
	      if (!obj) {
	        obj = this;
	      } else if (utils.isString(obj)) {
	        var prop = _schema[obj];
	        if (prop) {
	          errors = _validate.validate(prop, value) || [];
	        }
	      } else {
	        utils.forOwn(_schema, function (prop, key) {
	          errors = errors.concat(_validate.validate(prop, utils.get(obj, key)) || []);
	        });
	      }
	      return errors.length ? errors : undefined;
	    }
	
	    /**
	     * @param {Object} [opts] Configuration options. @see {@link Model.create}.
	     */
	
	  }, {
	    key: 'create',
	    value: function create(opts) {
	      return this.constructor.create(this, opts);
	    }
	  }, {
	    key: 'save',
	    value: function save(opts) {
	      // TODO: move actual save logic here
	      var Ctor = this.constructor;
	
	      var adapterName = Ctor.getAdapterName(opts);
	      return Ctor.getAdapter(adapterName).update(Ctor, utils.get(this, Ctor.idAttribute), this, opts);
	    }
	
	    /**
	     * @param {Object} [opts] Configuration options. @see {@link Model.destroy}.
	     */
	
	  }, {
	    key: 'destroy',
	    value: function destroy(opts) {
	      // TODO: move actual destroy logic here
	      var Ctor = this.constructor;
	      return Ctor.destroy(utils.get(this, Ctor.idAttribute), opts);
	    }
	
	    // TODO: move logic for single-item async operations onto the instance.
	
	    /**
	     * Return the value at the given path for this instance.
	     *
	     * @param {string} key - Path of value to retrieve.
	     * @return {*} Value at path.
	     */
	
	  }, {
	    key: 'get',
	    value: function get(key) {
	      return utils.get(this, key);
	    }
	
	    /**
	     * Set the value for a given key, or the values for the given keys if "key" is
	     * an object.
	     *
	     * @param {(string|Object)} key - Key to set or hash of key-value pairs to set.
	     * @param {*} [value] - Value to set for the given key.
	     * @param {Object} [opts] - Optional configuration.
	     * - boolean [silent=false] - Whether to trigger change events.
	     */
	
	  }, {
	    key: 'set',
	    value: function set(key, value, opts) {
	      opts || (opts = {});
	      // TODO: implement "silent"
	      return utils.set(this, key, value);
	    }
	
	    /**
	     * Return a plain object representation of this instance.
	     *
	     * @param {Object} [opts] - Configuration options.
	     * @param {string[]} [opts.with] - Array of relation names or relation fields
	     * to include in the representation.
	     * @return {Object} Plain object representation of instance.
	     */
	
	  }, {
	    key: 'toJSON',
	    value: function toJSON(opts) {
	      var _this3 = this;
	
	      opts || (opts = {});
	      var Ctor = this.constructor;
	      var json = this;
	      if (this instanceof Model) {
	        json = {};
	        utils.set(json, this);
	        if (Ctor && Ctor.relationList && opts.with) {
	          if (utils.isString(opts.with)) {
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
	                optsCopy.with.splice(optsCopy.with.indexOf(containedName), 1);
	                optsCopy.with.forEach(function (relation, i) {
	                  if (relation && relation.indexOf(containedName) === 0 && relation.length >= containedName.length && relation[containedName.length] === '.') {
	                    optsCopy.with[i] = relation.substr(containedName.length + 1);
	                  } else {
	                    optsCopy.with[i] = '';
	                  }
	                });
	                var relationData = utils.get(_this3, def.localField);
	                if (relationData) {
	                  if (utils.isArray(relationData)) {
	                    utils.set(json, def.localField, relationData.map(function (item) {
	                      return def.Relation.prototype.toJSON.call(item, optsCopy);
	                    }));
	                  } else {
	                    utils.set(json, def.localField, def.Relation.prototype.toJSON.call(relationData, optsCopy));
	                  }
	                }
	              })();
	            }
	          });
	        }
	      }
	      return json;
	    }
	
	    /**
	     * Static methods
	     */
	
	    /**
	     * Create a new secondary index in the Collection instance of this Model.
	     *
	     * @param {string} name - The name of the new secondary index
	     * @param {string[]} keyList - The list of keys to be used to create the index.
	     */
	
	  }], [{
	    key: 'createIndex',
	    value: function createIndex(name, keyList) {
	      this.dbg('createIndex', 'name:', name, 'keyList:', keyList);
	      this.collection.createIndex(name, keyList);
	    }
	
	    /**
	     * Create a new instance of this Model from the provided properties.
	     *
	     * @param {Object} props - The initial properties of the new instance.
	     * @return {Model} The instance.
	     */
	
	  }, {
	    key: 'createInstance',
	    value: function createInstance(props) {
	      var Ctor = this;
	      // Check to make sure "props" is not already an instance of this Model.
	      return props instanceof Ctor ? props : new Ctor(props);
	    }
	
	    /**
	     * Check whether "instance" is actually an instance of this Model.
	     *
	     * @param {Model} The instance to check.
	     * @return {boolean} Whether "instance" is an instance of this Model.
	     */
	
	  }, {
	    key: 'is',
	    value: function is(instance) {
	      return instance instanceof this;
	    }
	
	    /**
	     * Insert the provided item or items into the Collection instance of this
	     * Model.
	     *
	     * If an item is already in the collection then the provided item will either
	     * merge with or replace the existing item based on the value of the
	     * "onConflict" option.
	     *
	     * The collection's secondary indexes will be updated as each item is visited.
	     *
	     * @param {(Object|Object[]|Model|Model[])} items - The item or items to insert.
	     * @param {Object} [opts] - Configuration options.
	     * @param {string} [opts.onConflict] - What to do when an item is already in
	     * the Collection instance. Possible values are `merge` or `replace`.
	     * @return {(Model|Model[])} The injected entity or entities.
	     */
	
	  }, {
	    key: 'inject',
	    value: function inject(items, opts) {
	      var _this = this;
	      var op = 'inject';
	      _this.dbg(op, 'item(s):', items, 'opts:', opts);
	      opts || (opts = {});
	      opts.op = op;
	      var singular = false;
	      var collection = _this.collection;
	      var idAttribute = _this.idAttribute;
	      var relationList = _this.relationList || [];
	      if (!utils.isArray(items)) {
	        items = [items];
	        singular = true;
	      }
	      items = items.map(function (props) {
	        var id = utils.get(props, idAttribute);
	        if (!utils.isSorN(id)) {
	          throw new TypeError('User#' + idAttribute + ': Expected string or number, found ' + (typeof id === 'undefined' ? 'undefined' : _typeof(id)) + '!');
	        }
	        var existing = _this.get(id);
	        if (props === existing) {
	          return existing;
	        }
	
	        relationList.forEach(function (def) {
	          var Relation = def.Relation;
	          var relationIdAttribute = Relation.idAttribute;
	          var foreignKey = def.foreignKey;
	
	          var toInject = utils.get(props, def.localField);
	
	          if (utils.isFunction(def.inject)) {
	            def.inject(_this, def, props);
	          } else if (toInject && def.inject !== false) {
	            if (utils.isArray(toInject)) {
	              toInject = toInject.map(function (toInjectItem) {
	                if (toInjectItem !== Relation.get(utils.get(toInjectItem, relationIdAttribute))) {
	                  try {
	                    if (foreignKey) {
	                      utils.set(toInjectItem, foreignKey, id);
	                    }
	                    toInjectItem = Relation.inject(toInjectItem);
	                  } catch (err) {
	                    throw new Error('Failed to inject ' + def.type + ' relation: "' + def.relation + '"! ' + err.message);
	                  }
	                }
	                return toInjectItem;
	              });
	              if (def.localKeys) {
	                utils.set(props, def.localKeys, toInject.map(function (injected) {
	                  return utils.get(injected, relationIdAttribute);
	                }));
	              }
	            } else {
	              // handle injecting belongsTo and hasOne relations
	              if (toInject !== Relation.get(utils.get(toInject, relationIdAttribute))) {
	                try {
	                  if (def.localKey) {
	                    utils.set(props, def.localKey, utils.get(toInject, Relation.idAttribute));
	                  }
	                  if (foreignKey) {
	                    utils.set(toInject, def.foreignKey, utils.get(props, idAttribute));
	                  }
	                  toInject = Relation.inject(toInject);
	                } catch (err) {
	                  throw new Error('Failed to inject ' + def.type + ' relation: "' + def.relation + '"!');
	                }
	              }
	            }
	          }
	          // remove relation properties from the item, since those relations have been injected by now
	          if (def.link || def.link === undefined && _this.linkRelations) {
	            utils.unset(props, def.localField);
	          } else {
	            utils.set(props, def.localField, toInject);
	          }
	        });
	
	        if (existing) {
	          var onConflict = opts.onConflict || _this.onConflict;
	          if (onConflict === 'merge') {
	            utils.deepMixIn(existing, props);
	          } else if (onConflict === 'replace') {
	            utils.forOwn(existing, function (value, key) {
	              if (key !== idAttribute && !props.hasOwnProperty(key)) {
	                delete existing[key];
	              }
	            });
	            existing.set(props);
	          }
	          props = existing;
	          collection.update(props);
	        } else {
	          props = _this.createInstance(props);
	          props._set('$', true);
	          collection.insert(props);
	        }
	        return props;
	      });
	      return singular ? items.length ? items[0] : undefined : items;
	    }
	
	    /**
	     * Remove the instance with the given primary key from the Collection instance
	     * of this Model.
	     *
	     * @param {(string|number)} id - The primary key of the instance to be removed.
	     * @return {Model} The removed item, if any.
	     */
	
	  }, {
	    key: 'eject',
	    value: function eject(id, opts) {
	      var op = 'eject';
	      this.dbg(op, 'id:', id, 'opts:', opts);
	      opts || (opts = {});
	      opts.op = op;
	      var item = this.get(id);
	      if (item) {
	        item._unset('$');
	        this.collection.remove(item);
	      }
	      return item;
	    }
	
	    /**
	     * Remove the instances selected by "query" from the Collection instance of
	     * this Model.
	     *
	     * @param {Object} [query] - The query used to select instances to remove.
	     * @return {Model[]} The removed instances, if any.
	     */
	
	  }, {
	    key: 'ejectAll',
	    value: function ejectAll(params, opts) {
	      var op = 'ejectAll';
	      this.dbg(op, 'params:', params, 'opts:', opts);
	      opts || (opts = {});
	      opts.op = op;
	      var items = this.filter(params);
	      var collection = this.collection;
	      items.forEach(function (item) {
	        collection.remove(item);
	      });
	      return items;
	    }
	
	    /**
	     * Return the instance in the Collection instance of this Model that has
	     * the given primary key, if such an instance can be found.
	     *
	     * @param {(string|number)} id - Primary key of the instance to retrieve.
	     * @return {Model} The instance or undefined.
	     */
	
	  }, {
	    key: 'get',
	    value: function get(id) {
	      this.dbg('get', 'id:', id);
	      var instances = this.collection.get(id);
	      return instances.length ? instances[0] : undefined;
	    }
	
	    /**
	     * Proxy for Collection#between
	     */
	
	  }, {
	    key: 'between',
	    value: function between() {
	      var _collection;
	
	      return (_collection = this.collection).between.apply(_collection, arguments);
	    }
	
	    /**
	     * Proxy for Collection#getAll
	     */
	
	  }, {
	    key: 'getAll',
	    value: function getAll() {
	      var _collection2;
	
	      return (_collection2 = this.collection).getAll.apply(_collection2, arguments);
	    }
	
	    /**
	     * Proxy for Collection#filter
	     */
	
	  }, {
	    key: 'filter',
	    value: function filter(opts) {
	      return this.collection.filter(opts);
	    }
	
	    /**
	    * Proxy for `Model.collection.query()`.
	     * @return {Query}
	     */
	
	  }, {
	    key: 'query',
	    value: function query() {
	      return this.collection.query();
	    }
	
	    /**
	     * Return the registered adapter with the given name or the default adapter if
	     * no name is provided.
	     *
	     * @param {string} [name]- The name of the adapter to retrieve.
	     * @return {Adapter} The adapter, if any.
	     */
	
	  }, {
	    key: 'getAdapter',
	    value: function getAdapter(name) {
	      this.dbg('getAdapter', 'name:', name);
	      var adapter = this.getAdapterName(name);
	      if (!adapter) {
	        throw new ReferenceError(adapter + ' not found!');
	      }
	      return this.adapters[adapter];
	    }
	
	    /**
	     * Return the name of a registered adapter based on the given name or options,
	     * or the name of the default adapter if no name provided
	     *
	     * @param {Object} [opts] - The options, if any.
	     * @return {string} The name of the adapter.
	     */
	
	  }, {
	    key: 'getAdapterName',
	    value: function getAdapterName(opts) {
	      opts || (opts = {});
	      if (utils.isString(opts)) {
	        opts = { adapter: opts };
	      }
	      return opts.adapter || opts.defaultAdapter;
	    }
	
	    /**
	     * Lifecycle hook. Called by `Model.create` after `Model.create` checks
	     * whether it can do an upsert and before `Model.create` calls the `create`
	     * method of an adapter.
	     *
	     * `Model.beforeCreate` will receive the same arguments that are passed to
	     * `Model.create`. If `Model.beforeCreate` returns a promise, `Model.create`
	     * will wait for the promise to resolve before continuing. If the promise
	     * rejects, then the promise returned by `Model.create` will reject. If
	     * `Model.beforeCreate` does not return a promise, `Model.create` will resume
	     * execution immediately.
	     *
	     * @param {Object} props - Properties object that was passed to `Model.create`.
	     * @param {Object} opts - Options object that was passed to `Model.create`.
	     */
	
	  }, {
	    key: 'beforeCreate',
	    value: function beforeCreate() {}
	
	    /**
	     * The "C" in "CRUD", `Model.create` creates a single entity using the
	     * `create` method of an adapter. If the `props` passed to `Model.create`
	     * contain a primary key as configured by `Model.idAttribute` and
	     * `opts.upsert` is `true` of `Model.upsert` is `true` and `opts.upsert` is
	     * not `false`, then `Model.update` will be called instead.
	     *
	     * 1. `Model.beforeCreate` is called and passed the same arguments passed to
	     * `Model.create`.
	     * 1. `props` and `opts` are passed to the `create` method of the adapter
	     * specified by `opts.adapter` or `Model.defaultAdapter`.
	     * 1. `Model.afterCreate` is called with the `data` argument returned by the
	     * adapter's `create` method and the `opts` argument passed to `Model.create`.
	     * 1. If `opts.raw` is `true` or `Model.raw` is `true` and `opts.raw` is not
	     * `false`, then a result object is returned that contained the created entity
	     * and some metadata about the operation and its result. Otherwise, the
	     * promise returned by `Model.create` resolves with the created entity.
	     *
	     * @param {Object} props - The properties from which to create the new entity.
	     * @param {Object} [opts] - Configuration options.
	     * @param {string} [opts.adapter] - The name of the registered adapter to use.
	     * @param {boolean} [opts.raw] - The name of the registered adapter to use.
	     * @param {boolean} [opts.upsert] - Whether to call {@link Model.update}
	     * instead if `props` has a primary key.
	     * @return {Object} The created entity, or if `raw` is `true` then a result
	     * object.
	     */
	
	  }, {
	    key: 'create',
	    value: function create(props, opts) {
	      var _this4 = this;
	
	      var op = 'create';
	      this.dbg(op, 'props:', props, 'opts:', opts);
	      var adapterName = undefined;
	
	      props || (props = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = op;
	
	      if (opts.upsert && utils.get(props, this.idAttribute)) {
	        return this.update(utils.get(props, this.idAttribute), props, opts);
	      }
	      return resolve(this.beforeCreate(props, opts)).then(function () {
	        adapterName = _this4.getAdapterName(opts);
	        return _this4.getAdapter(adapterName).create(_this4, _this4.prototype.toJSON.call(props, opts), opts);
	      }).then(function (data) {
	        return resolve(_this4.afterCreate(data, opts)).then(function () {
	          return handleResponse(_this4, data, opts, adapterName);
	        });
	      });
	    }
	
	    /**
	     * Lifecycle hook. Called by `Model.create` after `Model.create` call the
	     * `create` method of an adapter.
	     *
	     * `Model.afterCreate` will receive the `data` argument returned by the
	     * adapter's `create` method and the `opts` argument passed to `Model.create`.
	     * If `Model.afterCreate` returns a promise, `Model.create` will wait for the
	     * promise to resolve before continuing. If the promise rejects, then the
	     * promise returned by `Model.create` will reject. If `Model.afterCreate` does
	     * not return a promise, `Model.create` will resume execution immediately.
	     *
	     * @param {Object} data - Data object returned by the adapter's `create` method.
	     * @param {Object} opts - Options object that was passed to `Model.create`.
	     */
	
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {}
	  }, {
	    key: 'beforeCreateMany',
	    value: function beforeCreateMany() {}
	  }, {
	    key: 'createMany',
	    value: function createMany(items, opts) {
	      var _this5 = this;
	
	      var op = 'createMany';
	      this.dbg(op, 'items:', items, 'opts:', opts);
	      var adapterName = undefined;
	
	      items || (items = []);
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = op;
	
	      if (opts.upsert) {
	        var _ret2 = (function () {
	          var hasId = true;
	          items.forEach(function (item) {
	            hasId = hasId && utils.get(item, _this5.idAttribute);
	          });
	          if (hasId) {
	            return {
	              v: _this5.updateMany(items, opts)
	            };
	          }
	        })();
	
	        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	      }
	
	      return resolve(this.beforeCreateMany(items, opts)).then(function () {
	        adapterName = _this5.getAdapterName(opts);
	        return _this5.getAdapter(adapterName).createMany(_this5, items.map(function (item) {
	          return _this5.prototype.toJSON.call(item, opts);
	        }), opts);
	      }).then(function (data) {
	        return resolve(_this5.afterCreateMany(data, opts)).then(function () {
	          return handleResponse(_this5, data, opts, adapterName);
	        });
	      });
	    }
	  }, {
	    key: 'afterCreateMany',
	    value: function afterCreateMany() {}
	  }, {
	    key: 'beforeFind',
	    value: function beforeFind() {}
	  }, {
	    key: 'find',
	    value: function find(id, opts) {
	      var _this6 = this;
	
	      var op = 'find';
	      this.dbg(op, 'id:', id, 'opts:', opts);
	      var adapterName = undefined;
	
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = op;
	
	      return resolve(this.beforeFind(id, opts)).then(function () {
	        adapterName = _this6.getAdapterName(opts);
	        return _this6.getAdapter(adapterName).find(_this6, id, opts);
	      }).then(function (data) {
	        return resolve(_this6.afterFind(data, opts)).then(function () {
	          return handleResponse(_this6, data, opts, adapterName);
	        });
	      });
	    }
	  }, {
	    key: 'afterFind',
	    value: function afterFind() {}
	  }, {
	    key: 'beforeFindAll',
	    value: function beforeFindAll() {}
	  }, {
	    key: 'findAll',
	    value: function findAll(query, opts) {
	      var _this7 = this;
	
	      var op = 'findAll';
	      this.dbg(op, 'query:', query, 'opts:', opts);
	      var adapterName = undefined;
	
	      query || (query = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = op;
	
	      return resolve(this.beforeFindAll(query, opts)).then(function () {
	        adapterName = _this7.getAdapterName(opts);
	        return _this7.getAdapter(adapterName).findAll(_this7, query, opts);
	      }).then(function (data) {
	        return resolve(_this7.afterFindAll(data, opts)).then(function () {
	          return handleResponse(_this7, data, opts, adapterName);
	        });
	      });
	    }
	  }, {
	    key: 'afterFindAll',
	    value: function afterFindAll() {}
	  }, {
	    key: 'beforeUpdate',
	    value: function beforeUpdate() {}
	  }, {
	    key: 'update',
	    value: function update(id, props, opts) {
	      var _this8 = this;
	
	      var op = 'update';
	      this.dbg(op, 'id:', id, 'props:', props, 'opts:', opts);
	      var adapterName = undefined;
	
	      props || (props = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = op;
	
	      return resolve(this.beforeUpdate(id, props, opts)).then(function () {
	        adapterName = _this8.getAdapterName(opts);
	        return _this8.getAdapter(adapterName).update(_this8, id, _this8.prototype.toJSON.call(props, opts), opts);
	      }).then(function (data) {
	        return resolve(_this8.afterUpdate(id, data, opts)).then(function () {
	          return handleResponse(_this8, data, opts, adapterName);
	        });
	      });
	    }
	  }, {
	    key: 'afterUpdate',
	    value: function afterUpdate() {}
	  }, {
	    key: 'beforeUpdateMany',
	    value: function beforeUpdateMany() {}
	  }, {
	    key: 'updateMany',
	    value: function updateMany(items, opts) {
	      var _this9 = this;
	
	      var op = 'updateMany';
	      this.dbg(op, 'items:', items, 'opts:', opts);
	      var adapterName = undefined;
	
	      items || (items = []);
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = op;
	
	      return resolve(this.beforeUpdateMany(items, opts)).then(function () {
	        adapterName = _this9.getAdapterName(opts);
	        return _this9.getAdapter(adapterName).updateMany(_this9, items.map(function (item) {
	          return _this9.prototype.toJSON.call(item, opts);
	        }), opts);
	      }).then(function (data) {
	        return resolve(_this9.afterUpdateMany(data, opts)).then(function () {
	          return handleResponse(_this9, data, opts, adapterName);
	        });
	      });
	    }
	  }, {
	    key: 'afterUpdateMany',
	    value: function afterUpdateMany() {}
	  }, {
	    key: 'beforeUpdateAll',
	    value: function beforeUpdateAll() {}
	    /**
	     * @param {Object} query={} - Selection query.
	     * @param {Object} props - Update to apply to selected entities.
	     * @param {Object} [opts] - Configuration options.
	     * @param {boolean} [opts.raw=false] TODO
	     */
	
	  }, {
	    key: 'updateAll',
	    value: function updateAll(query, props, opts) {
	      var _this10 = this;
	
	      var op = 'updateAll';
	      this.dbg(op, 'query:', query, 'props:', props, 'opts:', opts);
	      var adapterName = undefined;
	
	      query || (query = {});
	      props || (props = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = op;
	
	      return resolve(this.beforeUpdateAll(query, props, opts)).then(function () {
	        adapterName = _this10.getAdapterName(opts);
	        return _this10.getAdapter(adapterName).updateAll(_this10, query, props, opts);
	      }).then(function (data) {
	        return resolve(_this10.afterUpdateAll(query, data, opts)).then(function () {
	          return handleResponse(_this10, data, opts, adapterName);
	        });
	      });
	    }
	  }, {
	    key: 'afterUpdateAll',
	    value: function afterUpdateAll() {}
	  }, {
	    key: 'beforeDestroy',
	    value: function beforeDestroy() {}
	
	    /**
	     * @param {(string|number)} id
	     * @param {Object} [opts] - Configuration options.
	     * @param {boolean} [opts.raw=false] TODO
	     */
	
	  }, {
	    key: 'destroy',
	    value: function destroy(id, opts) {
	      var _this11 = this;
	
	      var op = 'destroy';
	      this.dbg(op, 'id:', id, 'opts:', opts);
	      var adapterName = undefined;
	
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = op;
	
	      return resolve(this.beforeDestroy(id, opts)).then(function () {
	        adapterName = _this11.getAdapterName(opts);
	        return _this11.getAdapter(adapterName).destroy(_this11, id, opts);
	      }).then(function (data) {
	        return resolve(_this11.afterDestroy(id, opts)).then(function () {
	          if (opts.raw) {
	            data.adapter = adapterName;
	            if (opts.autoEject) {
	              data.data = _this11.eject(id, opts);
	            }
	            return data;
	          } else if (opts.autoEject) {
	            data = _this11.eject(id, opts);
	          }
	          return data;
	        });
	      });
	    }
	  }, {
	    key: 'afterDestroy',
	    value: function afterDestroy() {}
	  }, {
	    key: 'beforeDestroyAll',
	    value: function beforeDestroyAll() {}
	  }, {
	    key: 'destroyAll',
	    value: function destroyAll(query, opts) {
	      var _this12 = this;
	
	      var op = 'destroyAll';
	      this.dbg(op, 'query:', query, 'opts:', opts);
	      var adapterName = undefined;
	
	      query || (query = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = op;
	
	      return resolve(this.beforeDestroyAll(query, opts)).then(function () {
	        adapterName = _this12.getAdapterName(opts);
	        return _this12.getAdapter(adapterName).destroyAll(_this12, query, opts);
	      }).then(function (data) {
	        return resolve(_this12.afterDestroyAll(query, opts)).then(function () {
	          if (opts.raw) {
	            data.adapter = adapterName;
	            if (opts.autoEject) {
	              data.data = _this12.ejectAll(query, opts);
	            }
	            return data;
	          } else if (opts.autoEject) {
	            data = _this12.ejectAll(query, opts);
	          }
	          return data;
	        });
	      });
	    }
	  }, {
	    key: 'afterDestroyAll',
	    value: function afterDestroyAll() {}
	  }, {
	    key: 'log',
	    value: function log(level) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
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
	    }
	  }, {
	    key: 'dbg',
	    value: function dbg() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      this.log.apply(this, ['debug'].concat(args));
	    }
	
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
	
	  }, {
	    key: 'belongsTo',
	    value: function belongsTo(model, opts) {
	      return (0, _decorators.belongsTo)(model, opts)(this);
	    }
	
	    /**
	     * Usage:
	     *
	     * User.hasMany(Post, {
	     *   localField: 'my_posts'
	     * })
	     */
	
	  }, {
	    key: 'hasMany',
	    value: function hasMany(model, opts) {
	      return (0, _decorators.hasMany)(model, opts)(this);
	    }
	
	    /**
	     * Usage:
	     *
	     * User.hasOne(Profile, {
	     *   localField: '_profile'
	     * })
	     */
	
	  }, {
	    key: 'hasOne',
	    value: function hasOne(model, opts) {
	      return (0, _decorators.hasOne)(model, opts)(this);
	    }
	
	    /**
	     * Invoke the {@link module:js-data.exports.setSchema setSchema} decorator on
	     * this Model.
	     * @param {Object} opts - Property configurations.
	     * @return {Model} A reference to the Model for chaining.
	     */
	
	  }, {
	    key: 'setSchema',
	    value: function setSchema(opts) {
	      return (0, _decorators.setSchema)(opts)(this);
	    }
	
	    /**
	     * Invoke the {@link module:js-data.exports.configure configure} decorator on
	     * this Model.
	     * @param {Object} opts - Configuration
	     * @return {Model} A reference to the Model for chaining.
	     */
	
	  }, {
	    key: 'configure',
	    value: function configure(opts) {
	      return (0, _decorators.configure)(opts)(this);
	    }
	
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
	
	  }, {
	    key: 'registerAdapter',
	    value: function registerAdapter(name, adapter, opts) {
	      return (0, _decorators.registerAdapter)(name, adapter, opts)(this);
	    }
	
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
	
	  }, {
	    key: 'extend',
	    value: function extend(props, classProps) {
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
	          throw new TypeError('name: Expected string, found ' + _typeof(classProps.name) + '!');
	        }
	        if (classProps.csp) {
	          Child = function () {
	            _classCallCheck(this, Child);
	
	            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	              args[_key3] = arguments[_key3];
	            }
	
	            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Child).apply(this, args));
	            if (initialize) {
	              initialize.apply(this, args);
	            }
	            return _this;
	          };
	        } else {
	          var name = utils.pascalCase(classProps.name);
	          var func = 'return function ' + name + '() {\n                        _classCallCheck(this, ' + name + ')\n                        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(' + name + ').apply(this, arguments));\n                        if (initialize) {\n                          initialize.apply(this, arguments)\n                        }\n                        return _this\n                      }';
	          Child = new Function('_classCallCheck', '_possibleConstructorReturn', 'Parent', 'initialize', func)(_classCallCheck, _possibleConstructorReturn, Parent, initialize); // eslint-disable-line
	        }
	      }
	
	      classProps.shortname = classProps.shortname || utils.camelCase(Child.name || classProps.name);
	      delete classProps.name;
	
	      var _schema = classProps.schema;
	      delete classProps.schema;
	
	      _inherits(Child, Parent);
	
	      (0, _decorators.configure)(props)(Child.prototype);
	      (0, _decorators.configure)(classProps)(Child);
	      if (_schema) {
	        (0, _decorators.setSchema)(_schema)(Child);
	      }
	
	      return Child;
	    }
	  }]);
	
	  return Model;
	})(BaseModel);
	
	// Why are these static properties not up in the Model class declaration?
	// Because JSDoc doesn't parse static property initializers yet. :(
	
	/**
	 * @ignore
	 */
	
	Model.__events = {};
	
	/**
	 * Create a property where a Model's registered listeners can be stored.
	 * @ignore
	 */
	Object.defineProperty(Model, '_events', {
	  get: function get() {
	    // Make sure that a Model always has _its own_ set of registered listeners.
	    // This check has to be made because ES6 class inheritance shallow copies
	    // static properties, which means a child model would only have a reference
	    // to the parent model's listeners.
	    if (this.__events === Object.getPrototypeOf(this).__events) {
	      this.__events = {};
	    }
	    return this.__events;
	  }
	});
	
	/**
	 * @ignore
	 */
	Model._adapters = {};
	
	/**
	 * Hash of adapters registered with this Model.
	 *
	 * @name adapters
	 * @memberof Model
	 * @type {Object}
	 */
	Object.defineProperty(Model, 'adapters', {
	  get: function get() {
	    var parentAdapters = Object.getPrototypeOf(this)._adapters;
	    // Make sure that a Model always has _its own_ set of registered adapters.
	    // This check has to be made because ES6 class inheritance shallow copies
	    // static properties, which means a child model would only have a reference
	    // to the parent model's adapters.
	    if (this._adapters === parentAdapters) {
	      this._adapters = {};
	      utils.fillIn(this._adapters, parentAdapters);
	    }
	    return this._adapters;
	  }
	});
	
	/**
	 * @ignore
	 */
	Model._collection = new _collection3.Collection([], 'id');
	
	/**
	 * This Model's {@link Collection} instance. This is where instances of the
	 * Model are stored if {@link Model.autoInject} is `true`.
	 *
	 * __You should use {@link Model.inject}, {@link Model.eject}, and
	 * {@link Model.ejectAll} if you need to manually get data in and out of this
	 * collection.__
	 *
	 * @name collection
	 * @memberof Model
	 * @type {Collection}
	 */
	Object.defineProperty(Model, 'collection', {
	  get: function get() {
	    // Make sure that a Model always has _its own_ collection. This check has to
	    // be made because ES6 class inheritance shallow copies static properties,
	    // which means a child Model would only have a reference to the parent
	    // Model's collection.
	    if (this._collection === Object.getPrototypeOf(this)._collection) {
	      this._collection = new _collection3.Collection([], this.idAttribute);
	      this._collection.on('all', this.emit, this);
	    }
	    return this._collection;
	  }
	});
	
	/**
	 * Whether {@link Model.destroy} and {@link Model.destroyAll} should
	 * automatically eject the specified item(s) from the Model's collection on
	 * success.
	 *
	 * @memberof Model
	 * @type {boolean}
	 * @default true
	 */
	Model.autoEject = true;
	
	/**
	 * Whether {@link Model.create}, {@link Model.createMany},
	 * {@link Model.update}, {@link Model.updateAll}, and {@link Model.updateMany}
	 * should automatically inject the specified item(s) returned by the adapter
	 * into the the Model's collection on success.
	 *
	 * __Defaults to `true` in the Browser.__
	 *
	 * __Defaults to `false` in Node.js__
	 *
	 * @memberof Model
	 * @type {boolean}
	 */
	Model.autoInject = isBrowser;
	Model.bypassCache = false;
	
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
	Model.csp = false;
	
	/**
	 * The name of the registered adapter that should be used by default by any
	 * of the Model's static methods that use an adapter.
	 *
	 * @memberof Model
	 * @type {string}
	 * @default http
	 */
	Model.defaultAdapter = 'http';
	
	/**
	 * Whether to enable debug-level logs.
	 *
	 * @memberof Model
	 * @type {boolean}
	 * @default false
	 */
	Model.debug = false;
	Model.eagerEject = false;
	
	/**
	 * The field on instances of {@link Model} that should be used as the unique
	 * identifier for instances of the Model.
	 *
	 * @memberof Model
	 * @type {string}
	 * @default id
	 */
	Model.idAttribute = 'id';
	
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
	Model.linkRelations = isBrowser;
	
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
	Model.onConflict = 'merge';
	
	/**
	 * Whether the relation property accessors should be enumerable. It's
	 * recommended that this stay false.
	 *
	 * @memberof Model
	 * @type {boolean}
	 * @default false
	 */
	Model.relationsEnumerable = false;
	
	/**
	 * Whether {@link Model.create}, {@link Model.createMany},
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
	Model.raw = false;
	
	/**
	 * Whether {@link Model.create}, {@link Model.createMany},
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
	Model.upsert = true;
	
	/**
	 * Allow Models themselves emit events. Any events emitted on a Model's
	 * collection will also be emitted on the Model itself.
	 *
	 * A Model's registered listeners are stored on the Model's `__events` property.
	 */
	utils.eventify(Model, function () {
	  return this._events;
	}, function (value) {
	  this._events = value;
	});
	
	/**
	 * Allow instancess to emit events. Any events emitted instances in a Model's
	 * collection will also be emitted on the collection itself, and hence, on the
	 * Model as well.
	 *
	 * An instance's registered listeners are stored in the instance's private data
	 * hash.
	 */
	utils.eventify(Model.prototype, function () {
	  return this._get('events');
	}, function (value) {
	  this._set('events', value);
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-debug.js.map