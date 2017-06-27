/*!
* js-data
* @version 3.0.0-alpha.1 - Homepage <http://www.js-data.io/>
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
	
	var _datastore = __webpack_require__(15);
	
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
	
	var _model = __webpack_require__(16);
	
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
	
	var _validate = __webpack_require__(11);
	
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
	
	if (!Promise.prototype.spread) {
	  Promise.prototype.spread = function (cb) {
	    return this.then(function (arr) {
	      return cb.apply(this, arr);
	    });
	  };
	}
	
	exports.utils = _utils;
	var version = exports.version = {
	  full: '3.0.0-alpha.1',
	  major: parseInt('3', 10),
	  minor: parseInt('0', 10),
	  patch: parseInt('0', 10),
	  alpha:  true ? '1' : false,
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
	
	var _mindex = __webpack_require__(13);
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	exports.Query = _query4.Query;
	
	function Collection() {
	  var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var idAttribute = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];
	
	  if (!(0, _utils.isArray)(data)) {
	    throw new TypeError('new Collection([data]): data: Expected array. Found ' + (typeof data === 'undefined' ? 'undefined' : _typeof(data)));
	  }
	  this.idAttribute = idAttribute;
	  this.index = new _mindex.Index([idAttribute], idAttribute);
	  this.indexes = {};
	  data.forEach(this.index.insertRecord, this.index);
	}
	
	(0, _decorators.configure)({
	  createIndex: function createIndex(name, keyList) {
	    if ((0, _utils.isString)(name) && keyList === undefined) {
	      keyList = [name];
	    }
	    var index = this.indexes[name] = new _mindex.Index(keyList, this.idAttribute);
	    this.index.visitAll(index.insertRecord, index);
	    return this;
	  },
	  query: function query() {
	    return new _query4.Query(this);
	  },
	  between: function between() {
	    var _query;
	
	    return (_query = this.query()).between.apply(_query, arguments).run();
	  },
	  get: function get() {
	    var _query2;
	
	    return (_query2 = this.query()).get.apply(_query2, arguments).run();
	  },
	  getAll: function getAll() {
	    var _query3;
	
	    return (_query3 = this.query()).getAll.apply(_query3, arguments).run();
	  },
	  filter: function filter(opts) {
	    return this.query().filter(opts).run();
	  },
	  skip: function skip(num) {
	    return this.query().skip(num).run();
	  },
	  limit: function limit(num) {
	    return this.query().limit(num).run();
	  },
	  forEach: function forEach(cb, thisArg) {
	    this.index.visitAll(cb, thisArg);
	  },
	  map: function map(cb, thisArg) {
	    var data = [];
	    this.index.visitAll(function (value) {
	      data.push(cb.call(thisArg, value));
	    });
	    return data;
	  },
	  insert: function insert(record) {
	    this.index.insertRecord(record);
	    (0, _utils.forOwn)(this.indexes, function (index, name) {
	      index.insertRecord(record);
	    });
	  },
	  update: function update(record) {
	    this.index.updateRecord(record);
	    (0, _utils.forOwn)(this.indexes, function (index, name) {
	      index.updateRecord(record);
	    });
	  },
	  remove: function remove(record) {
	    this.index.removeRecord(record);
	    (0, _utils.forOwn)(this.indexes, function (index, name) {
	      index.removeRecord(record);
	    });
	  },
	  insertRecord: function insertRecord(record, opts) {
	    opts || (opts = {});
	    var index = opts.index ? this.indexes[opts.index] : this.index;
	    index.insertRecord(record);
	  },
	  updateRecord: function updateRecord(record, opts) {
	    opts || (opts = {});
	    var index = opts.index ? this.indexes[opts.index] : this.index;
	    index.updateRecord(record);
	  },
	  removeRecord: function removeRecord(record, opts) {
	    opts || (opts = {});
	    var index = opts.index ? this.indexes[opts.index] : this.index;
	    index.removeRecord(record);
	  }
	})(Collection.prototype);

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
	
	function Query(collection) {
	  this.collection = collection;
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
	  getData: function getData() {
	    if (!this.data) {
	      this.data = this.collection.index.getAll();
	    }
	    return this.data;
	  },
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
	  filter: function filter(opts, thisArg) {
	    var _this2 = this;
	
	    opts || (opts = {});
	    this.getData();
	    if ((0, _utils.isObject)(opts)) {
	      (function () {
	        var where = {};
	        // Filter
	        if ((0, _utils.isObject)(opts.where)) {
	          where = opts.where;
	        }
	        (0, _utils.forOwn)(opts, function (value, key) {
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
	        var orderBy = opts.orderBy || opts.sort;
	
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
	        if ((0, _utils.isNumber)(opts.skip)) {
	          _this2.skip(opts.skip);
	        } else if ((0, _utils.isNumber)(opts.offset)) {
	          _this2.skip(opts.offset);
	        }
	        // Limit
	        if ((0, _utils.isNumber)(opts.limit)) {
	          _this2.limit(opts.limit);
	        }
	      })();
	    } else if ((0, _utils.isFunction)(opts)) {
	      this.data = this.data.filter(opts, thisArg);
	    }
	    return this;
	  },
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
	  limit: function limit(num) {
	    if (!(0, _utils.isNumber)(num)) {
	      throw new TypeError('limit: Expected number but found ' + (typeof num === 'undefined' ? 'undefined' : _typeof(num)) + '!');
	    }
	    var data = this.getData();
	    this.data = data.slice(0, Math.min(data.length, num));
	    return this;
	  },
	  forEach: function forEach(cb, thisArg) {
	    this.getData().forEach(cb, thisArg);
	    return this;
	  },
	  map: function map(cb, thisArg) {
	    this.data = this.getData().map(cb, thisArg);
	    return this;
	  },
	  run: function run() {
	    var data = this.data;
	    this.data = null;
	    this.params = null;
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
	exports.omit = omit;
	exports.fromJson = fromJson;
	exports.copy = copy;
	exports.pascalCase = pascalCase;
	exports.camelCase = camelCase;
	exports.Events = Events;
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	var isArray = exports.isArray = Array.isArray;
	function isObject(value) {
	  return toString.call(value) === '[object Object]' || false;
	}
	function isPlainObject(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Object;
	}
	function isRegExp(value) {
	  return toString.call(value) === '[object RegExp]' || false;
	}
	function isString(value) {
	  return typeof value === 'string' || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toString.call(value) === '[object String]' || false;
	}
	function isDate(value) {
	  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toString.call(value) === '[object Date]' || false;
	}
	function isNumber(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type === 'number' || value && type === 'object' && toString.call(value) === '[object Number]' || false;
	}
	function isBoolean(value) {
	  return toString.call(value) === '[object Boolean]';
	}
	function isFunction(value) {
	  return typeof value === 'function' || value && toString.call(value) === '[object Function]' || false;
	}
	function isSorN(value) {
	  return isString(value) || isNumber(value);
	}
	function get(object, prop) {
	  var parts = prop.split('.');
	  var last = parts.pop();
	
	  while (prop = parts.shift()) {
	    object = object[prop];
	    if (object == null) return;
	  }
	
	  return object[last];
	}
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
	function forOwn(obj, fn, thisArg) {
	  var keys = Object.keys(obj);
	  var len = keys.length;
	  var i = undefined;
	  for (i = 0; i < len; i++) {
	    fn.call(thisArg, obj[keys[i]], keys[i], obj);
	  }
	}
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
	function resolve(value) {
	  return Promise.resolve(value);
	}
	function reject(value) {
	  return Promise.reject(value);
	}
	function _(Model, opts) {
	  for (var key in Model) {
	    var value = Model[key];
	    if (opts[key] === undefined && !isFunction(value)) {
	      opts[key] = value;
	    }
	  }
	}
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
	function fillIn(dest, src) {
	  forOwn(src, function (value, key) {
	    if (dest[key] === undefined) {
	      dest[key] = value;
	    }
	  });
	}
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
	function omit(obj, bl) {
	  var toRemove = [];
	  forOwn(obj, function (value, key) {
	    if (isBlacklisted(key, bl)) {
	      toRemove.push(key);
	    }
	  });
	  toRemove.forEach(function (key) {
	    delete obj[key];
	  });
	  return obj;
	}
	function fromJson(json) {
	  return isString(json) ? JSON.parse(json) : json;
	}
	var toJson = exports.toJson = JSON.stringify;
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
	function pascalCase(str) {
	  return str.split(SPLIT).map(mapToPascal).join('');
	}
	function camelCase(str) {
	  str = pascalCase(str);
	  if (str) {
	    return str.charAt(0).toLowerCase() + str.slice(1);
	  }
	  return str;
	}
	function Events(target, getter, setter) {
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
	        var events = getter.call(this);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        var listeners = events[args.shift()] || [];
	        if (listeners) {
	          for (var i = 0; i < listeners.length; i++) {
	            listeners[i].f.apply(listeners[i].c, args);
	          }
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
	
	var _loop = function _loop(_key8) {
	  if (_key8 === "default") return 'continue';
	  Object.defineProperty(exports, _key8, {
	    enumerable: true,
	    get: function get() {
	      return _belongsTo[_key8];
	    }
	  });
	};
	
	for (var _key8 in _belongsTo) {
	  var _ret = _loop(_key8);
	
	  if (_ret === 'continue') continue;
	}
	
	var _configure = __webpack_require__(6);
	
	var _loop2 = function _loop2(_key9) {
	  if (_key9 === "default") return 'continue';
	  Object.defineProperty(exports, _key9, {
	    enumerable: true,
	    get: function get() {
	      return _configure[_key9];
	    }
	  });
	};
	
	for (var _key9 in _configure) {
	  var _ret2 = _loop2(_key9);
	
	  if (_ret2 === 'continue') continue;
	}
	
	var _hasMany = __webpack_require__(7);
	
	var _loop3 = function _loop3(_key10) {
	  if (_key10 === "default") return 'continue';
	  Object.defineProperty(exports, _key10, {
	    enumerable: true,
	    get: function get() {
	      return _hasMany[_key10];
	    }
	  });
	};
	
	for (var _key10 in _hasMany) {
	  var _ret3 = _loop3(_key10);
	
	  if (_ret3 === 'continue') continue;
	}
	
	var _hasOne = __webpack_require__(8);
	
	var _loop4 = function _loop4(_key11) {
	  if (_key11 === "default") return 'continue';
	  Object.defineProperty(exports, _key11, {
	    enumerable: true,
	    get: function get() {
	      return _hasOne[_key11];
	    }
	  });
	};
	
	for (var _key11 in _hasOne) {
	  var _ret4 = _loop4(_key11);
	
	  if (_ret4 === 'continue') continue;
	}
	
	var _initialize = __webpack_require__(9);
	
	var _loop5 = function _loop5(_key12) {
	  if (_key12 === "default") return 'continue';
	  Object.defineProperty(exports, _key12, {
	    enumerable: true,
	    get: function get() {
	      return _initialize[_key12];
	    }
	  });
	};
	
	for (var _key12 in _initialize) {
	  var _ret5 = _loop5(_key12);
	
	  if (_ret5 === 'continue') continue;
	}
	
	var _schema = __webpack_require__(10);
	
	var _loop6 = function _loop6(_key13) {
	  if (_key13 === "default") return 'continue';
	  Object.defineProperty(exports, _key13, {
	    enumerable: true,
	    get: function get() {
	      return _schema[_key13];
	    }
	  });
	};
	
	for (var _key13 in _schema) {
	  var _ret6 = _loop6(_key13);
	
	  if (_ret6 === 'continue') continue;
	}
	
	var _adapter = __webpack_require__(12);
	
	var _loop7 = function _loop7(_key14) {
	  if (_key14 === "default") return 'continue';
	  Object.defineProperty(exports, _key14, {
	    enumerable: true,
	    get: function get() {
	      return _adapter[_key14];
	    }
	  });
	};
	
	for (var _key14 in _adapter) {
	  var _ret7 = _loop7(_key14);
	
	  if (_ret7 === 'continue') continue;
	}
	
	// Workaround for https://github.com/babel/babel/issues/2763
	var DECORATORS = exports.DECORATORS = 'FIXME';

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.belongsTo = belongsTo;
	
	var _utils = __webpack_require__(3);
	
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
	      var key = (0, _utils.get)(this, localKey);
	      return key !== undefined ? Relation.get(key) : undefined;
	    },
	
	    // Set default method for setting the linked relation
	    set: function set(parent) {
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
	  Model.data().createIndex(localKey);
	
	  // Return target Model for chaining
	  return Model;
	}
	
	/**
	 * Usage:
	 *
	 * ES7 Usage:
	 * import {belongsTo, Model} from 'js-data'
	 * class User extends Model {}
	 * @belongsTo(User, {...})
	 * class Post extends Model {}
	 *
	 * ES6 Usage:
	 * import {belongsTo, Model} from 'js-data'
	 * class User extends Model {}
	 * class Comment extends Model {}
	 * belongsTo(User, {...})(Comment)
	 *
	 * ES5 Usage:
	 * var JSData = require('js-data')
	 * var User = JSData.Model.extend()
	 * var Comment = JSDataModel.extend()
	 * JSData.belongsTo(User, {...})(Comment)
	 */
	function belongsTo(Model, opts) {
	  return function (target) {
	    return applyBelongsTo(target, Model, opts);
	  };
	}

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
	 * Usage:
	 *
	 * @configure({
	 *   idAttribute: '_id'
	 * })
	 * class User extends JSData.Model {...}
	 */
	function configure(props) {
	  var overwrite = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	  props = props || {};
	  return function (target) {
	    (0, _utils.forOwn)(props, function (value, key) {
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
	    Relation.data().createIndex(foreignKey);
	  }
	
	  // Setup configuration of the property
	  var descriptor = {
	    // Whether the field specified by "localField" will show up in "for...in"
	    enumerable: opts.enumerable !== undefined ? !!opts.enumerable : false,
	    // Set default method for retrieving the linked relation
	    get: function get() {
	      var query = {};
	      if (foreignKey) {
	        // Make a FAST retrieval of the relation using a secondary index
	        return Relation.getAll((0, _utils.get)(this, Model.idAttribute), { index: foreignKey });
	      } else if (localKeys) {
	        var keys = (0, _utils.get)(this, localKeys) || [];
	        var args = (0, _utils.isArray)(keys) ? keys : Object.keys(keys);
	        // Make a slower retrieval using the ids in the "localKeys" array
	        return Relation.getAll.apply(Relation, args);
	      } else if (foreignKeys) {
	        (0, _utils.set)(query, 'where.' + foreignKeys + '.contains', (0, _utils.get)(this, Model.idAttribute));
	        // Make a much slower retrieval
	        return Relation.filter(query);
	      }
	      return undefined;
	    },
	
	    // Set default method for setting the linked relation
	    set: function set(children) {
	      var _this = this;
	
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
	 * Usage:
	 *
	 * ES7 Usage:
	 * import {hasMany, Model} from 'js-data'
	 * class Post extends Model {}
	 * @hasMany(Post, {...})
	 * class User extends Model {}
	 *
	 * ES6 Usage:
	 * import {hasMany, Model} from 'js-data'
	 * class User extends Model {}
	 * class Comment extends Model {}
	 * hasMany(Comment, {...})(User)
	 *
	 * ES5 Usage:
	 * var JSData = require('js-data')
	 * var User = JSData.Model.extend()
	 * var Comment = JSDataModel.extend()
	 * JSData.hasMany(User, {...})(Comment)
	 */
	function hasMany(Model, opts) {
	  return function (target) {
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
	      var items = Relation.getAll((0, _utils.get)(this, Model.idAttribute), { index: foreignKey });
	      return items && items.length ? items[0] : undefined;
	    },
	
	    // Set default method for setting the linked relation
	    set: function set(child) {
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
	  Model.data().createIndex(foreignKey);
	
	  // Return target Model for chaining
	  return Model;
	}
	
	/**
	 * Usage:
	 *
	 * ES7 Usage:
	 * import {hasOne, Model} from 'js-data'
	 * class User extends Model {}
	 * @hasOne(User, {...})
	 * class Post extends Model {}
	 *
	 * ES6 Usage:
	 * import {hasOne, Model} from 'js-data'
	 * class User extends Model {}
	 * class Comment extends Model {}
	 * hasOne(User, {...})(Comment)
	 *
	 * ES5 Usage:
	 * var JSData = require('js-data')
	 * var User = JSData.Model.extend()
	 * var Comment = JSDataModel.extend()
	 * JSData.hasOne(User, {...})(Comment)
	 */
	function hasOne(Model, opts) {
	  return function (target) {
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
	exports.initialize = initialize;
	
	var _collection = __webpack_require__(1);
	
	function errMsg(name) {
	  return name + ': Schemas are not inheritable, did you forget to define a schema?';
	}
	
	function initialize(opts) {
	  opts || (opts = {});
	  return function (target) {
	    var collection = new _collection.Collection([], target.idAttribute);
	    target.data = function () {
	      // TODO: Do I need this?
	      if (this.data === Object.getPrototypeOf(this).data) {
	        throw new Error(errMsg(this.name));
	      }
	      return collection;
	    };
	  };
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setSchema = setSchema;
	
	var _utils = __webpack_require__(3);
	
	var _validate = __webpack_require__(11);
	
	var _configure = __webpack_require__(6);
	
	var _initialize = __webpack_require__(9);
	
	function makeDescriptor(target, key, prop) {
	  var descriptor = {
	    enumerable: prop.enumerable !== undefined ? prop.enumerable : true,
	    configurable: prop.configurable !== undefined ? prop.configurable : true
	  };
	  descriptor.get = function () {
	    return this._get('props.' + key);
	  };
	  descriptor.set = function (value) {
	    var _this = this;
	
	    // TODO: rework this
	    // if (isFunction(prop.validate) && !prop.validate(value)) {
	    //   return false
	    // }
	    var _get = this._get;
	    var _set = this._set;
	    var _unset = this._unset;
	    if (!_get('noValidate')) {
	      var errors = (0, _validate.validate)(prop, value);
	      if (errors) {
	        throw new Error(errors.join(', '));
	      }
	    }
	    if (prop.track && !_get('creating')) {
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
	          // TODO: this._unset
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
	    if (_get('$') && prop.indexed) {
	      target.data().updateRecord(this, { index: key });
	    }
	    return value;
	  };
	  if (prop.indexed) {
	    // Update index
	    // TODO: Make this configurable, ie. immediate or lazy update
	    target.createIndex(key);
	  }
	  if (prop.get) {
	    if (descriptor.get) {
	      (function () {
	        var originalGet = descriptor.get;
	        descriptor.get = function () {
	          return prop.get.call(this, originalGet);
	        };
	      })();
	    } else {
	      descriptor.get = prop.get;
	    }
	  }
	  if (prop.set) {
	    if (descriptor.set) {
	      (function () {
	        var originalSet = descriptor.set;
	        descriptor.set = function (value) {
	          return prop.set.call(this, value, originalSet);
	        };
	      })();
	    } else {
	      descriptor.set = prop.set;
	    }
	  }
	  return descriptor;
	}
	
	/**
	 * Usage:
	 *
	 * @schema({
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
	 * })
	 * class User extends JSData.Model {...}
	 *
	 * let user = new User()
	 * user.role // "dev"
	 * user.name = 'John Anderson'
	 * user.first // "John"
	 * user.last // "Anderson"
	 * user.first = "Bill"
	 * user.name // "Bill Anderson"
	 */
	function setSchema(opts) {
	  opts || (opts = {});
	
	  return function (target) {
	    try {
	      target.data();
	    } catch (err) {
	      (0, _initialize.initialize)(opts)(target);
	    }
	
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerAdapter = registerAdapter;
	
	var _utils = __webpack_require__(3);
	
	function registerAdapter(name, adapter, opts) {
	  opts || (opts = {});
	  return function (target) {
	    if (target.adapters && target.adapters === Object.getPrototypeOf(target).adapters) {
	      target.adapters = {};
	      (0, _utils.fillIn)(target.adapters, Object.getPrototypeOf(target).adapters);
	    }
	    target.adapters[name] = adapter;
	    if (opts === true || opts.default) {
	      target.defaultAdapter = name;
	    }
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Index = Index;
	
	var _utils = __webpack_require__(3);
	
	var _decorators = __webpack_require__(4);
	
	var _utils2 = __webpack_require__(14);
	
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
	    var keyList = this.fieldList.map(function (field) {
	      return data[field] || null;
	    });
	
	    this.remove(keyList, data);
	  },
	  updateRecord: function updateRecord(data) {
	    this.removeRecord(data);
	    this.insertRecord(data);
	  }
	})(Index.prototype);

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DS = DS;
	
	var _decorators = __webpack_require__(4);
	
	var _utils = __webpack_require__(3);
	
	var _model = __webpack_require__(16);
	
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
/* 16 */
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
	
	var _validate2 = __webpack_require__(11);
	
	var _validate = _interopRequireWildcard(_validate2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
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
	
	// This is here so Babel will give us
	// the inheritance helpers which we
	// can re-use for the "extend" method
	
	var BaseModel = function BaseModel() {
	  _classCallCheck(this, BaseModel);
	};
	
	var Model = exports.Model = (function (_BaseModel) {
	  _inherits(Model, _BaseModel);
	
	  function Model(props, opts) {
	    _classCallCheck(this, Model);
	
	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this));
	
	    props || (props = {});
	    opts || (opts = {});
	    var $$props = {};
	    Object.defineProperties(_this2, {
	      _get: {
	        value: function value(key) {
	          return utils.get($$props, key);
	        }
	      },
	      _set: {
	        value: function value(key, _value) {
	          return utils.set($$props, key, _value);
	        }
	      },
	      _unset: {
	        value: function value(key) {
	          return utils.unset($$props, key);
	        }
	      }
	    });
	    _this2._set('creating', true);
	    if (opts.noValidate) {
	      _this2._set('noValidate', true);
	    }
	    (0, _decorators.configure)(props)(_this2);
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
	
	    // Instance methods
	
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
	     * @param {?*} value - Value to set for the given key.
	     * @param {?Object} - Optional configuration. Properties:
	     *   - {boolean=true} silent - Whether to trigger change events.
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
	     * @param {?Object} opts - Optional configuration. Properties:
	     *   - {string[]} with - Array of relation names or relation fields to include in the representation.
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
	     * Return a reference to the Collection instance of this Model.
	     *
	     * Will throw an error if a schema has not been defined for this Model.
	     * When the schema is defined, this method is replaced with one that can
	     * return the Collection instance.
	     *
	     * A schema can be created automatically if .extend is used to create the
	     * class, but ES6 or ES7 class definitions will need to use .schema(opts) or
	     * @schema(opts) to get the schema initialized.
	     *
	     * @throws {Error} Schema must already be defined for Model.
	     * @return {Collection} The Collection instance of this Model.
	     */
	
	  }], [{
	    key: 'data',
	    value: function data() {
	      throw new Error(this.name + '.data(): Did you forget to define a schema?');
	    }
	
	    /**
	     * Create a new secondary index in the Collection instance of this Model.
	     *
	     * @param {string} name - The name of the new secondary index
	     * @param {string[]} keyList - The list of keys to be used to create the index.
	     */
	
	  }, {
	    key: 'createIndex',
	    value: function createIndex(name, keyList) {
	      this.data().createIndex(name, keyList);
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
	     * @param {?Object} opts - Optional configuration. Properties:
	     *   - {string} onConflict - What to do when an item is already in the Collection instance. May be "merge" or "replace".
	     * @return {(Model|Model[])} Whether "instance" is an instance of this Model.
	     */
	
	  }, {
	    key: 'inject',
	    value: function inject(items, opts) {
	      opts || (opts = {});
	      var _this = this;
	      var singular = false;
	      var collection = _this.data();
	      var idAttribute = _this.idAttribute;
	      var relationList = _this.relationList || [];
	      if (!utils.isArray(items)) {
	        items = [items];
	        singular = true;
	      }
	      items.forEach(function (props) {
	        relationList.forEach(function (def) {
	          var Relation = def.Relation;
	          var toInject = utils.get(props, def.localField);
	          if (utils.isFunction(def.inject)) {
	            def.inject(_this, def, props);
	          } else if (toInject && def.inject !== false) {
	            if (utils.isArray(toInject)) {
	              toInject.forEach(function (toInjectItem) {
	                if (toInjectItem !== Relation.get(utils.get(toInjectItem, Relation.idAttribute))) {
	                  try {
	                    if (def.foreignKey) {
	                      utils.set(toInjectItem, def.foreignKey, utils.get(props, idAttribute));
	                    }
	                    Relation.inject(toInjectItem);
	                  } catch (err) {
	                    throw new Error('Failed to inject ' + def.type + ' relation: "' + def.relation + '"!');
	                  }
	                }
	              });
	              if (def.localKeys) {
	                utils.set(toInject, def.localKeys, toInject.map(function (injected) {
	                  return utils.get(injected, Relation.idAttribute);
	                }));
	              }
	            } else {
	              // handle injecting belongsTo and hasOne relations
	              if (toInject !== Relation.get(Relation.idAttribute)) {
	                try {
	                  if (def.localKey) {
	                    utils.set(props, def.localKey, utils.get(toInject, Relation.idAttribute));
	                  }
	                  if (def.foreignKey) {
	                    utils.set(toInject, def.foreignKey, utils.get(props, idAttribute));
	                  }
	                  Relation.inject(toInject);
	                } catch (err) {
	                  throw new Error('Failed to inject ' + def.type + ' relation: "' + def.relation + '"!');
	                }
	              }
	            }
	          }
	          // remove relation properties from the item, since those relations have been injected by now
	          if (typeof def.link === 'boolean' ? def.link : !!_this.linkRelations) {
	            utils.unset(props, def.localField);
	          }
	        });
	      });
	      items = items.map(function (props) {
	        var id = utils.get(props, idAttribute);
	        if (!id) {
	          throw new TypeError('User#' + idAttribute + ': Expected string or number, found ' + (typeof id === 'undefined' ? 'undefined' : _typeof(id)) + '!');
	        }
	        var existing = _this.get(id);
	
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
	        } else {
	          props = _this.createInstance(props);
	          props._set('$', true);
	          collection.index.insertRecord(props);
	        }
	        utils.forOwn(collection.indexes, function (index) {
	          index.updateRecord(props);
	        });
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
	    value: function eject(id) {
	      var item = this.get(id);
	      if (item) {
	        item._unset('$');
	        this.data().remove(item);
	      }
	      return item;
	    }
	
	    /**
	     * Remove the instances selected by "query" from the Collection instance of
	     * this Model.
	     *
	     * @param {?Object} query - The query used to select instances to remove.
	     * @return {Model[]} The removed instances, if any.
	     */
	
	  }, {
	    key: 'ejectAll',
	    value: function ejectAll(params) {
	      var items = this.filter(params);
	      var collection = this.data();
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
	     * @return {?Model} The instance or undefined.
	     */
	
	  }, {
	    key: 'get',
	    value: function get(id) {
	      var instances = this.data().get(id);
	      return instances.length ? instances[0] : undefined;
	    }
	
	    /**
	     * Proxy for Collection#between
	     */
	
	  }, {
	    key: 'between',
	    value: function between() {
	      var _data;
	
	      return (_data = this.data()).between.apply(_data, arguments);
	    }
	
	    /**
	     * Proxy for Collection#getAll
	     */
	
	  }, {
	    key: 'getAll',
	    value: function getAll() {
	      var _data2;
	
	      return (_data2 = this.data()).getAll.apply(_data2, arguments);
	    }
	
	    /**
	     * Proxy for Collection#filter
	     */
	
	  }, {
	    key: 'filter',
	    value: function filter(opts) {
	      return this.data().filter(opts);
	    }
	
	    /**
	     * Proxy for Collection#query
	     */
	
	  }, {
	    key: 'query',
	    value: function query() {
	      return this.data().query();
	    }
	
	    /**
	     * Return the registered adapter with the given name or the default adapter if
	     * no name is provided.
	     *
	     * @param {?string} name - The name of the adapter to retrieve.
	     * @return {Adapter} The adapter, if any.
	     */
	
	  }, {
	    key: 'getAdapter',
	    value: function getAdapter(name) {
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
	     * @param {?Object} opts - The options, if any.
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
	  }, {
	    key: 'beforeCreate',
	    value: function beforeCreate() {}
	  }, {
	    key: 'create',
	    value: function create(props, opts) {
	      var _this4 = this;
	
	      var adapterName = undefined;
	
	      props || (props = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = 'create';
	
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
	
	      var adapterName = undefined;
	
	      items || (items = []);
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = 'createMany';
	
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
	
	      var adapterName = undefined;
	
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = 'find';
	
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
	
	      var adapterName = undefined;
	
	      query || (query = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = 'findAll';
	
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
	
	      var adapterName = undefined;
	
	      props || (props = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = 'update';
	
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
	
	      var adapterName = undefined;
	
	      items || (items = []);
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = 'updateMany';
	
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
	  }, {
	    key: 'updateAll',
	    value: function updateAll(query, props, opts) {
	      var _this10 = this;
	
	      var adapterName = undefined;
	
	      query || (query = {});
	      props || (props = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = 'updateAll';
	
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
	  }, {
	    key: 'destroy',
	    value: function destroy(id, opts) {
	      var _this11 = this;
	
	      var adapterName = undefined;
	
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = 'destroy';
	
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
	
	      var adapterName = undefined;
	
	      query || (query = {});
	      opts || (opts = {});
	      utils._(this, opts);
	      opts.op = 'destroyAll';
	
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
	  }, {
	    key: 'initialize',
	    value: function initialize(opts) {
	      return (0, _decorators.initialize)(opts)(this);
	    }
	  }, {
	    key: 'setSchema',
	    value: function setSchema(opts) {
	      return (0, _decorators.setSchema)(opts)(this);
	    }
	  }, {
	    key: 'configure',
	    value: function configure(props) {
	      return (0, _decorators.configure)(props)(this);
	    }
	  }, {
	    key: 'registerAdapter',
	    value: function registerAdapter(name, adapter, opts) {
	      return (0, _decorators.registerAdapter)(name, adapter, opts)(this);
	    }
	
	    /**
	     * Usage:
	     *
	     * var User = JSData.Model.extend({...}, {...})
	     */
	
	  }, {
	    key: 'extend',
	    value: function extend(props, classProps) {
	      var Child = undefined;
	      var Parent = this;
	      props = props || {};
	      classProps = classProps || {};
	
	      var _schema = classProps.schema || _defineProperty({}, classProps.idAttribute, {});
	      var initialize = props.initialize;
	      delete props.initialize;
	      _schema[classProps.idAttribute] = _schema[classProps.idAttribute] || {};
	
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
	
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
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
	
	      _inherits(Child, Parent);
	
	      (0, _decorators.configure)(props)(Child.prototype);
	      (0, _decorators.configure)(classProps)(Child);
	
	      (0, _decorators.setSchema)(_schema)(Child);
	
	      return Child;
	    }
	  }]);
	
	  return Model;
	})(BaseModel);
	
	(0, _decorators.configure)({
	  adapters: {},
	  autoEject: true,
	  autoInject: isBrowser,
	  bypassCache: false,
	  csp: false,
	  defaultAdapter: 'http',
	  eagerEject: false,
	  idAttribute: 'id',
	  linkRelations: isBrowser,
	  onConflict: 'merge',
	  relationsEnumerable: false,
	  raw: false,
	  strategy: 'single',
	  upsert: true,
	  useFilter: true
	})(Model);
	
	utils.Events(Model.prototype, function () {
	  return this._get('events');
	}, function (value) {
	  this._set('events', value);
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-debug.js.map