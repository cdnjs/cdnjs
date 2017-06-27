/*!
* js-data-localstorage
* @version 3.0.0-alpha.3 - Homepage <https://github.com/js-data/js-data-localstorage>
* @author Jason Dobry <jason.dobry@gmail.com>
* @copyright (c) 2014-2016 Jason Dobry
* @license MIT <https://github.com/js-data/js-data-localstorage/blob/master/LICENSE>
*
* @overview localStorage adapter for js-data.
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data"], factory);
	else if(typeof exports === 'object')
		exports["LocalStorageAdapter"] = factory(require("js-data"));
	else
		root["LocalStorageAdapter"] = factory(root["JSData"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	/* global: localStorage */
	var JSData = __webpack_require__(1);
	var guid = __webpack_require__(2);
	
	var Query = JSData.Query;
	var utils = JSData.utils;
	var addHiddenPropsToTarget = utils.addHiddenPropsToTarget;
	var deepMixIn = utils.deepMixIn;
	var extend = utils.extend;
	var fillIn = utils.fillIn;
	var forEachRelation = utils.forEachRelation;
	var forOwn = utils.forOwn;
	var fromJson = utils.fromJson;
	var get = utils.get;
	var isArray = utils.isArray;
	var isUndefined = utils.isUndefined;
	var resolve = utils.resolve;
	var reject = utils.reject;
	var set = utils.set;
	var toJson = utils.toJson;
	
	
	function isValidString(value) {
	  return value != null && value !== '';
	}
	function join(items, separator) {
	  separator || (separator = '');
	  return items.filter(isValidString).join(separator);
	}
	function makePath() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var result = join(args, '/');
	  return result.replace(/([^:\/]|^)\/{2,}/g, '$1/');
	}
	function unique(array) {
	  var seen = {};
	  var final = [];
	  array.forEach(function (item) {
	    if (item in seen) {
	      return;
	    }
	    final.push(item);
	    seen[item] = 0;
	  });
	  return final;
	}
	var queue = [];
	var taskInProcess = false;
	
	function enqueue(task) {
	  queue.push(task);
	}
	
	function dequeue() {
	  if (queue.length && !taskInProcess) {
	    taskInProcess = true;
	    queue[0]();
	  }
	}
	
	function queueTask(task) {
	  if (!queue.length) {
	    enqueue(task);
	    dequeue();
	  } else {
	    enqueue(task);
	  }
	}
	
	function createTask(fn) {
	  return new Promise(fn).then(function (result) {
	    taskInProcess = false;
	    queue.shift();
	    setTimeout(dequeue, 0);
	    return result;
	  }, function (err) {
	    taskInProcess = false;
	    queue.shift();
	    setTimeout(dequeue, 0);
	    return reject(err);
	  });
	}
	
	var noop = function noop() {
	  var self = this;
	
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  var opts = args[args.length - 1];
	  self.dbg.apply(self, [opts.op].concat(args));
	  return resolve();
	};
	
	var noop2 = function noop2() {
	  var self = this;
	
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  var opts = args[args.length - 2];
	  self.dbg.apply(self, [opts.op].concat(args));
	  return resolve();
	};
	
	var DEFAULTS = {
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#basePath
	   * @type {string}
	   */
	  basePath: '',
	
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#debug
	   * @type {boolean}
	   * @default false
	   */
	  debug: false,
	
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#storage
	   * @type {Object}
	   * @default localStorage
	   */
	  storage: localStorage
	};
	
	/**
	 * LocalStorageAdapter class.
	 *
	 * @example
	 * import {DataStore} from 'js-data'
	 * import LocalStorageAdapter from 'js-data-localstorage'
	 * const store = new DataStore()
	 * const adapter = new LocalStorageAdapter()
	 * store.registerAdapter('ls', adapter, { 'default': true })
	 *
	 * @class LocalStorageAdapter
	 * @param {Object} [opts] Configuration opts.
	 * @param {string} [opts.basePath=''] TODO
	 * @param {boolean} [opts.debug=false] TODO
	 * @param {Object} [opts.storeage=localStorage] TODO
	 */
	function LocalStorageAdapter(opts) {
	  fillIn(this, opts || {});
	  fillIn(this, DEFAULTS);
	}
	
	/**
	 * Alternative to ES6 class syntax for extending `LocalStorageAdapter`.
	 *
	 * @name LocalStorageAdapter.extend
	 * @method
	 * @param {Object} [instanceProps] Properties that will be added to the
	 * prototype of the subclass.
	 * @param {Object} [classProps] Properties that will be added as static
	 * properties to the subclass itself.
	 * @return {Object} Subclass of `LocalStorageAdapter`.
	 */
	LocalStorageAdapter.extend = extend;
	
	addHiddenPropsToTarget(LocalStorageAdapter.prototype, {
	  /**
	   * @name LocalStorageAdapter#afterCreate
	   * @method
	   */
	  afterCreate: noop2,
	
	  /**
	   * @name LocalStorageAdapter#afterCreateMany
	   * @method
	   */
	  afterCreateMany: noop2,
	
	  /**
	   * @name LocalStorageAdapter#afterDestroy
	   * @method
	   */
	  afterDestroy: noop2,
	
	  /**
	   * @name LocalStorageAdapter#afterDestroyAll
	   * @method
	   */
	  afterDestroyAll: noop2,
	
	  /**
	   * @name LocalStorageAdapter#afterFind
	   * @method
	   */
	  afterFind: noop2,
	
	  /**
	   * @name LocalStorageAdapter#afterFindAll
	   * @method
	   */
	  afterFindAll: noop2,
	
	  /**
	   * @name LocalStorageAdapter#afterUpdate
	   * @method
	   */
	  afterUpdate: noop2,
	
	  /**
	   * @name LocalStorageAdapter#afterUpdateAll
	   * @method
	   */
	  afterUpdateAll: noop2,
	
	  /**
	   * @name LocalStorageAdapter#afterUpdateMany
	   * @method
	   */
	  afterUpdateMany: noop2,
	
	  /**
	   * @name LocalStorageAdapter#beforeCreate
	   * @method
	   */
	  beforeCreate: noop,
	
	  /**
	   * @name LocalStorageAdapter#beforeCreateMany
	   * @method
	   */
	  beforeCreateMany: noop,
	
	  /**
	   * @name LocalStorageAdapter#beforeDestroy
	   * @method
	   */
	  beforeDestroy: noop,
	
	  /**
	   * @name LocalStorageAdapter#beforeDestroyAll
	   * @method
	   */
	  beforeDestroyAll: noop,
	
	  /**
	   * @name LocalStorageAdapter#beforeFind
	   * @method
	   */
	  beforeFind: noop,
	
	  /**
	   * @name LocalStorageAdapter#beforeFindAll
	   * @method
	   */
	  beforeFindAll: noop,
	
	  /**
	   * @name LocalStorageAdapter#beforeUpdate
	   * @method
	   */
	  beforeUpdate: noop,
	
	  /**
	   * @name LocalStorageAdapter#beforeUpdateAll
	   * @method
	   */
	  beforeUpdateAll: noop,
	
	  /**
	   * @name LocalStorageAdapter#beforeUpdateMany
	   * @method
	   */
	  beforeUpdateMany: noop,
	
	  _create: function _create(mapper, props, opts) {
	    var self = this;
	    var _props = {};
	    var relationFields = mapper.relationFields || [];
	    forOwn(props, function (value, key) {
	      if (relationFields.indexOf(key) === -1) {
	        _props[key] = value;
	      }
	    });
	    var id = get(_props, mapper.idAttribute) || guid();
	    set(_props, mapper.idAttribute, id);
	    var key = self.getIdPath(mapper, opts, id);
	
	    // Create the record
	    // TODO: Create related records when the "with" option is provided
	    self.storage.setItem(key, toJson(_props));
	    self.ensureId(id, mapper, opts);
	    return fromJson(self.storage.getItem(key));
	  },
	
	
	  /**
	   * Create a new record.
	   *
	   * @name LocalStorageAdapter#create
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {Object} props The record to be created.
	   * @param {Object} [opts] Configuration options.
	   * @param {boolean} [opts.raw=false] TODO
	   * @return {Promise}
	   */
	  create: function create(mapper, props, opts) {
	    var self = this;
	    props || (props = {});
	    opts || (opts = {});
	
	    return createTask(function (success, failure) {
	      queueTask(function () {
	        var op = undefined;
	        // beforeCreate lifecycle hook
	        op = opts.op = 'beforeCreate';
	        return resolve(self[op](mapper, props, opts)).then(function (_props) {
	          // Allow for re-assignment from lifecycle hook
	          var record = isUndefined(_props) ? props : _props;
	          record = self._create(mapper, record, opts);
	          // afterCreate lifecycle hook
	          op = opts.op = 'afterCreate';
	          return self[op](mapper, props, opts, record).then(function (_record) {
	            // Allow for re-assignment from lifecycle hook
	            record = isUndefined(_record) ? record : _record;
	            return opts.raw ? {
	              data: record,
	              created: 1
	            } : record;
	          });
	        }).then(success, failure);
	      });
	    });
	  },
	
	
	  /**
	   * Create multiple records in a single batch.
	   *
	   * @name LocalStorageAdapter#createMany
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {Array} props Array of records to be created.
	   * @param {Object} [opts] Configuration options.
	   * @param {boolean} [opts.raw=false] TODO
	   * @return {Promise}
	   */
	  createMany: function createMany(mapper, props, opts) {
	    var self = this;
	    props || (props = {});
	    opts || (opts = {});
	
	    return createTask(function (success, failure) {
	      queueTask(function () {
	        var op = undefined;
	        // beforeCreateMany lifecycle hook
	        op = opts.op = 'beforeCreateMany';
	        return resolve(self[op](mapper, props, opts)).then(function (_props) {
	          // Allow for re-assignment from lifecycle hook
	          var records = isUndefined(_props) ? props : _props;
	          records = records.map(function (record) {
	            return self._create(mapper, record, opts);
	          });
	          // afterCreateMany lifecycle hook
	          op = opts.op = 'afterCreateMany';
	          return self[op](mapper, props, opts, records).then(function (_records) {
	            // Allow for re-assignment from lifecycle hook
	            records = isUndefined(_records) ? records : _records;
	            return opts.raw ? {
	              data: records,
	              created: records.length
	            } : records;
	          });
	        }).then(success, failure);
	      });
	    });
	  },
	
	
	  /**
	   * @name LocalStorageAdapter#dbg
	   * @method
	   */
	  dbg: function dbg() {
	    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      args[_key4] = arguments[_key4];
	    }
	
	    this.log.apply(this, ['debug'].concat(args));
	  },
	
	
	  /**
	   * Destroy the record with the given primary key.
	   *
	   * @name LocalStorageAdapter#destroy
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {(string|number)} id Primary key of the record to destroy.
	   * @param {Object} [opts] Configuration options.
	   * @param {boolean} [opts.raw=false] TODO
	   * @return {Promise}
	   */
	  destroy: function destroy(mapper, id, opts) {
	    var self = this;
	    opts || (opts = {});
	
	    return createTask(function (success, failure) {
	      queueTask(function () {
	        var op = undefined;
	        // beforeDestroy lifecycle hook
	        op = opts.op = 'beforeDestroy';
	        return resolve(self[op](mapper, id, opts)).then(function () {
	          op = opts.op = 'destroy';
	          self.dbg(op, id, opts);
	          // Destroy the record
	          // TODO: Destroy related records when the "with" option is provided
	          self.storage.removeItem(self.getIdPath(mapper, opts, id));
	          self.removeId(id, mapper, opts);
	
	          // afterDestroy lifecycle hook
	          op = opts.op = 'afterDestroy';
	          return self[op](mapper, id, opts).then(function (_id) {
	            // Allow for re-assignment from lifecycle hook
	            id = isUndefined(_id) ? id : _id;
	            return opts.raw ? {
	              data: id,
	              deleted: 1
	            } : id;
	          });
	        }).then(success, failure);
	      });
	    });
	  },
	
	
	  /**
	   * Destroy the records that match the selection `query`.
	   *
	   * @name LocalStorageAdapter#destroyAll
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {Object} query Selection query.
	   * @param {Object} [opts] Configuration opts.
	   * @param {boolean} [opts.raw=false] TODO
	   * @return {Promise}
	   */
	  destroyAll: function destroyAll(mapper, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts || (opts = {});
	
	    return createTask(function (success, failure) {
	      queueTask(function () {
	        var op = undefined;
	        // beforeDestroyAll lifecycle hook
	        op = opts.op = 'beforeDestroyAll';
	        return resolve(self[op](mapper, query, opts)).then(function () {
	          op = opts.op = 'destroyAll';
	          self.dbg(op, query, opts);
	          // Find the records that are to be destroyed
	          return self.findAll(mapper, query, opts);
	        }).then(function (records) {
	          var idAttribute = mapper.idAttribute;
	          // Gather IDs of records to be destroyed
	          var ids = records.map(function (record) {
	            return get(record, idAttribute);
	          });
	          // Destroy each record
	          // TODO: Destroy related records when the "with" option is provided
	          ids.forEach(function (id) {
	            self.storage.removeItem(self.getIdPath(mapper, opts, id));
	          });
	          self.removeId(ids, mapper, opts);
	
	          // afterDestroyAll lifecycle hook
	          op = opts.op = 'afterDestroyAll';
	          return self[op](mapper, query, opts, ids).then(function (_ids) {
	            // Allow for re-assignment from lifecycle hook
	            ids = isUndefined(_ids) ? ids : _ids;
	            return opts.raw ? {
	              data: ids,
	              deleted: records.length
	            } : ids;
	          });
	        }).then(success, failure);
	      });
	    });
	  },
	
	
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#ensureId
	   * @method
	   */
	  ensureId: function ensureId(id, mapper, opts) {
	    var ids = this.getIds(mapper, opts);
	    if (isArray(id)) {
	      if (!id.length) {
	        return;
	      }
	      id.forEach(function (_id) {
	        ids[_id] = 1;
	      });
	    } else {
	      ids[id] = 1;
	    }
	    this.saveKeys(ids, mapper, opts);
	  },
	
	
	  /**
	   * Retrieve the record with the given primary key.
	   *
	   * @name LocalStorageAdapter#find
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {(string|number)} id Primary key of the record to retrieve.
	   * @param {Object} [opts] Configuration options.
	   * @param {boolean} [opts.raw=false] TODO
	   * @param {string[]} [opts.with=[]] TODO
	   * @return {Promise}
	   */
	  find: function find(mapper, id, opts) {
	    var self = this;
	    var record = undefined,
	        op = undefined;
	    opts || (opts = {});
	    opts.with || (opts.with = []);
	
	    // beforeFind lifecycle hook
	    op = opts.op = 'beforeFind';
	    return resolve(self[op](mapper, id, opts)).then(function () {
	      op = opts.op = 'find';
	      self.dbg(op, id, opts);
	      var key = self.getIdPath(mapper, opts, id);
	      record = self.storage.getItem(key);
	      if (isUndefined(record)) {
	        record = undefined;
	        return;
	      }
	      record = fromJson(record);
	      var tasks = [];
	
	      forEachRelation(mapper, opts, function (def, __opts) {
	        var relatedMapper = def.getRelation();
	        var task = undefined;
	
	        if ((def.type === 'hasOne' || def.type === 'hasMany') && def.foreignKey) {
	          task = self.findAll(relatedMapper, _defineProperty({}, def.foreignKey, get(record, mapper.idAttribute)), __opts).then(function (relatedItems) {
	            if (def.type === 'hasOne' && relatedItems.length) {
	              set(record, def.localField, relatedItems[0]);
	            } else {
	              set(record, def.localField, relatedItems);
	            }
	            return relatedItems;
	          });
	        } else if (def.type === 'hasMany' && def.localKeys) {
	          var localKeys = [];
	          var itemKeys = get(record, def.localKeys) || [];
	          itemKeys = Array.isArray(itemKeys) ? itemKeys : Object.keys(itemKeys);
	          localKeys = localKeys.concat(itemKeys || []);
	          task = self.findAll(relatedMapper, {
	            where: _defineProperty({}, relatedMapper.idAttribute, {
	              'in': unique(localKeys).filter(function (x) {
	                return x;
	              })
	            })
	          }, __opts).then(function (relatedItems) {
	            set(record, def.localField, relatedItems);
	            return relatedItems;
	          });
	        } else if (def.type === 'belongsTo') {
	          task = self.find(relatedMapper, get(record, def.foreignKey), __opts).then(function (relatedItem) {
	            set(record, def.localField, relatedItem);
	            return relatedItem;
	          });
	        }
	
	        if (task) {
	          tasks.push(task);
	        }
	      });
	
	      return Promise.all(tasks);
	    }).then(function () {
	      // afterFind lifecycle hook
	      op = opts.op = 'afterFind';
	      return resolve(self[op](mapper, id, opts, record)).then(function (_record) {
	        // Allow for re-assignment from lifecycle hook
	        record = isUndefined(_record) ? record : _record;
	        return opts.raw ? {
	          data: record,
	          found: record ? 1 : 0
	        } : record;
	      });
	    });
	  },
	
	
	  /**
	   * Retrieve the records that match the selection `query`.
	   *
	   * @name LocalStorageAdapter#findAll
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {Object} query Selection query.
	   * @param {Object} [opts] Configuration options.
	   * @param {boolean} [opts.raw=false] TODO
	   * @param {string[]} [opts.with=[]] TODO
	   * @return {Promise}
	   */
	  findAll: function findAll(mapper, query, opts) {
	    var self = this;
	    var records = [];
	    var op = undefined;
	    opts || (opts = {});
	    opts.with || (opts.with = []);
	
	    // beforeFindAll lifecycle hook
	    op = opts.op = 'beforeFindAll';
	    return resolve(self[op](mapper, query, opts)).then(function () {
	      op = opts.op = 'findAll';
	      self.dbg(op, query, opts);
	
	      // Load all records into memory...
	      var ids = self.getIds(mapper, opts);
	      forOwn(ids, function (value, id) {
	        var json = self.storage.getItem(self.getIdPath(mapper, opts, id));
	        if (json) {
	          records.push(fromJson(json));
	        }
	      });
	      var idAttribute = mapper.idAttribute;
	      // TODO: Verify that this collection gets properly garbage collected
	      // TODO: Or, find a way to filter without using Collection
	      var _query = new Query({
	        index: {
	          getAll: function getAll() {
	            return records;
	          }
	        }
	      });
	      records = _query.filter(query).run();
	      var tasks = [];
	
	      forEachRelation(mapper, opts, function (def, __opts) {
	        var relatedMapper = def.getRelation();
	        var task = undefined;
	
	        if ((def.type === 'hasOne' || def.type === 'hasMany') && def.foreignKey) {
	          task = self.findAll(relatedMapper, {
	            where: _defineProperty({}, def.foreignKey, {
	              'in': records.map(function (item) {
	                return get(item, idAttribute);
	              }).filter(function (x) {
	                return x;
	              })
	            })
	          }, __opts).then(function (relatedItems) {
	            records.forEach(function (item) {
	              var attached = [];
	              relatedItems.forEach(function (relatedItem) {
	                if (get(relatedItem, def.foreignKey) === get(item, idAttribute)) {
	                  attached.push(relatedItem);
	                }
	              });
	              if (def.type === 'hasOne' && attached.length) {
	                set(item, def.localField, attached[0]);
	              } else {
	                set(item, def.localField, attached);
	              }
	            });
	            return relatedItems;
	          });
	        } else if (def.type === 'hasMany' && def.localKeys) {
	          (function () {
	            var localKeys = [];
	            records.forEach(function (item) {
	              var itemKeys = get(item, def.localKeys) || [];
	              itemKeys = Array.isArray(itemKeys) ? itemKeys : Object.keys(itemKeys);
	              localKeys = localKeys.concat(itemKeys || []);
	            });
	            task = self.findAll(relatedMapper, {
	              where: _defineProperty({}, relatedMapper.idAttribute, {
	                'in': unique(localKeys).filter(function (x) {
	                  return x;
	                })
	              })
	            }, __opts).then(function (relatedItems) {
	              records.forEach(function (item) {
	                var attached = [];
	                var itemKeys = get(item, def.localKeys) || [];
	                itemKeys = Array.isArray(itemKeys) ? itemKeys : Object.keys(itemKeys);
	                relatedItems.forEach(function (relatedItem) {
	                  if (itemKeys && itemKeys.indexOf(relatedItem[relatedMapper.idAttribute]) !== -1) {
	                    attached.push(relatedItem);
	                  }
	                });
	                set(item, def.localField, attached);
	              });
	              return relatedItems;
	            });
	          })();
	        } else if (def.type === 'belongsTo') {
	          task = self.findAll(relatedMapper, {
	            where: _defineProperty({}, relatedMapper.idAttribute, {
	              'in': records.map(function (item) {
	                return get(item, def.foreignKey);
	              }).filter(function (x) {
	                return x;
	              })
	            })
	          }, __opts).then(function (relatedItems) {
	            records.forEach(function (item) {
	              relatedItems.forEach(function (relatedItem) {
	                if (relatedItem[relatedMapper.idAttribute] === get(item, def.foreignKey)) {
	                  set(item, def.localField, relatedItem);
	                }
	              });
	            });
	            return relatedItems;
	          });
	        }
	
	        if (task) {
	          tasks.push(task);
	        }
	      });
	      return Promise.all(tasks);
	    }).then(function () {
	      // afterFindAll lifecycle hook
	      op = opts.op = 'afterFindAll';
	      return resolve(self[op](mapper, query, opts, records)).then(function (_records) {
	        // Allow for re-assignment from lifecycle hook
	        records = isUndefined(_records) ? records : _records;
	        return opts.raw ? {
	          data: records,
	          found: records.length
	        } : records;
	      });
	    });
	  },
	
	
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#getPath
	   * @method
	   */
	  getPath: function getPath(mapper, opts) {
	    opts = opts || {};
	    return makePath(opts.basePath === undefined ? mapper.basePath === undefined ? this.basePath : mapper.basePath : opts.basePath, mapper.name);
	  },
	
	
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#getIdPath
	   * @method
	   */
	  getIdPath: function getIdPath(mapper, opts, id) {
	    opts = opts || {};
	    return makePath(opts.basePath || this.basePath || mapper.basePath, mapper.endpoint, id);
	  },
	
	
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#getIds
	   * @method
	   */
	  getIds: function getIds(mapper, opts) {
	    var ids = undefined;
	    var idsPath = this.getPath(mapper, opts);
	    var idsJson = this.storage.getItem(idsPath);
	    if (idsJson) {
	      ids = fromJson(idsJson);
	    } else {
	      ids = {};
	    }
	    return ids;
	  },
	
	
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#log
	   * @method
	   */
	  log: function log(level) {
	    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	      args[_key5 - 1] = arguments[_key5];
	    }
	
	    if (level && !args.length) {
	      args.push(level);
	      level = 'debug';
	    }
	    if (level === 'debug' && !this.debug) {
	      return;
	    }
	    var prefix = level.toUpperCase() + ': (LocalStorageAdapter)';
	    if (console[level]) {
	      var _console;
	
	      (_console = console)[level].apply(_console, [prefix].concat(args));
	    } else {
	      var _console2;
	
	      (_console2 = console).log.apply(_console2, [prefix].concat(args));
	    }
	  },
	
	
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#removeId
	   * @method
	   */
	  removeId: function removeId(id, mapper, opts) {
	    var ids = this.getIds(mapper, opts);
	    if (isArray(id)) {
	      if (!id.length) {
	        return;
	      }
	      id.forEach(function (_id) {
	        delete ids[_id];
	      });
	    } else {
	      delete ids[id];
	    }
	    this.saveKeys(ids, mapper, opts);
	  },
	
	
	  /**
	   * TODO
	   *
	   * @name LocalStorageAdapter#saveKeys
	   * @method
	   */
	  saveKeys: function saveKeys(ids, mapper, opts) {
	    ids = ids || {};
	    var idsPath = this.getPath(mapper, opts);
	    if (Object.keys(ids).length) {
	      this.storage.setItem(idsPath, toJson(ids));
	    } else {
	      this.storage.removeItem(idsPath);
	    }
	  },
	
	
	  /**
	   * Update the records that match the selection `query`. If a record with the
	   * specified primary key cannot be found then no update is performed and the
	   * promise is resolved with `undefined`.
	   *
	   * @name LocalStorageAdapter#update
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {(string|number)} id The primary key of the record to be updated.
	   * @param {Object} props The update to apply to the record.
	   * @param {Object} [opts] Configuration options.
	   * @param {boolean} [opts.raw=false] TODO
	   * @return {Promise}
	   */
	  update: function update(mapper, id, props, opts) {
	    var self = this;
	    props || (props = {});
	    opts || (opts = {});
	
	    return createTask(function (success, failure) {
	      queueTask(function () {
	        var op = undefined;
	        // beforeUpdate lifecycle hook
	        op = opts.op = 'beforeUpdate';
	        return resolve(self[op](mapper, id, props, opts)).then(function (_props) {
	          // Allow for re-assignment from lifecycle hook
	          props = isUndefined(_props) ? props : _props;
	          var key = self.getIdPath(mapper, opts, id);
	          var record = self.storage.getItem(key);
	          record = record ? fromJson(record) : undefined;
	          var updated = 0;
	
	          // Update the record
	          // TODO: Update related records when the "with" option is provided
	          if (record) {
	            deepMixIn(record, props);
	            self.storage.setItem(key, toJson(record));
	            updated++;
	          }
	
	          // afterUpdate lifecycle hook
	          op = opts.op = 'afterUpdate';
	          return self[op](mapper, id, props, opts, record).then(function (_record) {
	            // Allow for re-assignment from lifecycle hook
	            record = isUndefined(_record) ? record : _record;
	            return opts.raw ? {
	              data: record,
	              updated: updated
	            } : record;
	          });
	        }).then(success, failure);
	      });
	    });
	  },
	
	
	  /**
	   * Update the records that match the selection `query`.
	   *
	   * @name LocalStorageAdapter#updateAll
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {Object} props The update to apply to the selected records.
	   * @param {Object} query Selection query.
	   * @param {Object} [opts] Configuration options.
	   * @return {Promise}
	   */
	  updateAll: function updateAll(mapper, props, query, opts) {
	    var self = this;
	    props || (props = {});
	    query || (query = {});
	    opts || (opts = {});
	
	    return createTask(function (success, failure) {
	      queueTask(function () {
	        var op = undefined;
	        // beforeUpdateAll lifecycle hook
	        op = opts.op = 'beforeUpdateAll';
	        return resolve(self[op](mapper, props, query, opts)).then(function (_props) {
	          // Allow for re-assignment from lifecycle hook
	          props = isUndefined(_props) ? props : _props;
	          op = opts.op = 'updateAll';
	          self.dbg(op, query, opts);
	
	          // Find the records that are to be updated
	          return self.findAll(mapper, query, opts);
	        }).then(function (records) {
	          var idAttribute = mapper.idAttribute;
	          var updated = 0;
	
	          // Update each record
	          // TODO: Update related records when the "with" option is provided
	          records.forEach(function (record) {
	            record || (record = {});
	            var id = get(record, idAttribute);
	            var key = self.getIdPath(mapper, opts, id);
	            deepMixIn(record, props);
	            self.storage.setItem(key, toJson(record));
	            updated++;
	          });
	
	          // afterUpdateAll lifecycle hook
	          op = opts.op = 'afterUpdateAll';
	          return self[op](mapper, props, query, opts, records).then(function (_records) {
	            // Allow for re-assignment from lifecycle hook
	            records = isUndefined(_records) ? records : _records;
	            return opts.raw ? {
	              data: records,
	              updated: updated
	            } : records;
	          });
	        }).then(success, failure);
	      });
	    });
	  },
	
	
	  /**
	   * Update the given records in a single batch.
	   *
	   * @name LocalStorageAdapter#updateMany
	   * @method
	   * @param {Object} mapper The mapper.
	   * @param {Object} records The records to update.
	   * @param {Object} [opts] Configuration options.
	   * @param {boolean} [opts.raw=false] TODO
	   * @return {Promise}
	   */
	  updateMany: function updateMany(mapper, records, opts) {
	    var self = this;
	    records || (records = []);
	    opts || (opts = {});
	
	    return createTask(function (success, failure) {
	      queueTask(function () {
	        var op = undefined;
	        var updatedRecords = [];
	        // beforeUpdateMany lifecycle hook
	        op = opts.op = 'beforeUpdateMany';
	        return resolve(self[op](mapper, records, opts)).then(function (_records) {
	          // Allow for re-assignment from lifecycle hook
	          records = isUndefined(_records) ? records : _records;
	          op = opts.op = 'updateMany';
	          self.dbg(op, records, opts);
	
	          var idAttribute = mapper.idAttribute;
	
	          // Update each record
	          // TODO: Update related records when the "with" option is provided
	          records.forEach(function (record) {
	            if (!record) {
	              return;
	            }
	            var id = get(record, idAttribute);
	            if (isUndefined(id)) {
	              return;
	            }
	            var key = self.getIdPath(mapper, opts, id);
	            var json = self.storage.getItem(key);
	            var existingRecord = json ? fromJson(json) : undefined;
	            if (!existingRecord) {
	              return;
	            }
	            deepMixIn(existingRecord, record);
	            self.storage.setItem(key, toJson(existingRecord));
	            updatedRecords.push(existingRecord);
	          });
	
	          // afterUpdateMany lifecycle hook
	          op = opts.op = 'afterUpdateMany';
	          return self[op](mapper, records, opts, updatedRecords).then(function (_records) {
	            // Allow for re-assignment from lifecycle hook
	            records = isUndefined(_records) ? updatedRecords : _records;
	            return opts.raw ? {
	              data: records,
	              updated: updatedRecords.length
	            } : records;
	          });
	        }).then(success, failure);
	      });
	    });
	  }
	});
	
	/**
	 * Details of the current version of the `js-data-localstorage` module.
	 *
	 * @name LocalStorageAdapter.version
	 * @type {Object}
	 * @property {string} version.full The full semver value.
	 * @property {number} version.major The major version number.
	 * @property {number} version.minor The minor version number.
	 * @property {number} version.patch The patch version number.
	 * @property {(string|boolean)} version.alpha The alpha version value,
	 * otherwise `false` if the current version is not alpha.
	 * @property {(string|boolean)} version.beta The beta version value,
	 * otherwise `false` if the current version is not beta.
	 */
	LocalStorageAdapter.version = {
	  full: '3.0.0-alpha.3',
	  major: parseInt('3', 10),
	  minor: parseInt('0', 10),
	  patch: parseInt('0', 10),
	  alpha:  true ? '3' : false,
	  beta:  true ? 'false' : false
	};
	
	/**
	 * Registered as `js-data-localstorage` in NPM and Bower.
	 *
	 * __Script tag__:
	 * ```javascript
	 * window.LocalStorageAdapter
	 * ```
	 * __CommonJS__:
	 * ```javascript
	 * var LocalStorageAdapter = require('js-data-localstorage')
	 * ```
	 * __ES6 Modules__:
	 * ```javascript
	 * import LocalStorageAdapter from 'js-data-localstorage'
	 * ```
	 * __AMD__:
	 * ```javascript
	 * define('myApp', ['js-data-localstorage'], function (LocalStorageAdapter) { ... })
	 * ```
	 *
	 * @module js-data-localstorage
	 */
	
	module.exports = LocalStorageAdapter;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var randHex = __webpack_require__(3);
	var choice = __webpack_require__(4);
	
	  /**
	   * Returns pseudo-random guid (UUID v4)
	   * IMPORTANT: it's not totally "safe" since randHex/choice uses Math.random
	   * by default and sequences can be predicted in some cases. See the
	   * "random/random" documentation for more info about it and how to replace
	   * the default PRNG.
	   */
	  function guid() {
	    return (
	        randHex(8)+'-'+
	        randHex(4)+'-'+
	        // v4 UUID always contain "4" at this position to specify it was
	        // randomly generated
	        '4' + randHex(3) +'-'+
	        // v4 UUID always contain chars [a,b,8,9] at this position
	        choice(8, 9, 'a', 'b') + randHex(3)+'-'+
	        randHex(12)
	    );
	  }
	  module.exports = guid;
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var choice = __webpack_require__(4);
	
	    var _chars = '0123456789abcdef'.split('');
	
	    /**
	     * Returns a random hexadecimal string
	     */
	    function randHex(size){
	        size = size && size > 0? size : 6;
	        var str = '';
	        while (size--) {
	            str += choice(_chars);
	        }
	        return str;
	    }
	
	    module.exports = randHex;
	
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var randInt = __webpack_require__(5);
	var isArray = __webpack_require__(10);
	
	    /**
	     * Returns a random element from the supplied arguments
	     * or from the array (if single argument is an array).
	     */
	    function choice(items) {
	        var target = (arguments.length === 1 && isArray(items))? items : arguments;
	        return target[ randInt(0, target.length - 1) ];
	    }
	
	    module.exports = choice;
	
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MIN_INT = __webpack_require__(6);
	var MAX_INT = __webpack_require__(7);
	var rand = __webpack_require__(8);
	
	    /**
	     * Gets random integer inside range or snap to min/max values.
	     */
	    function randInt(min, max){
	        min = min == null? MIN_INT : ~~min;
	        max = max == null? MAX_INT : ~~max;
	        // can't be max + 0.5 otherwise it will round up if `rand`
	        // returns `max` causing it to overflow range.
	        // -0.5 and + 0.49 are required to avoid bias caused by rounding
	        return Math.round( rand(min - 0.5, max + 0.499999999999) );
	    }
	
	    module.exports = randInt;
	


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * @constant Minimum 32-bit signed integer value (-2^31).
	 */
	
	    module.exports = -2147483648;
	


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * @constant Maximum 32-bit signed integer value. (2^31 - 1)
	 */
	
	    module.exports = 2147483647;
	


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var random = __webpack_require__(9);
	var MIN_INT = __webpack_require__(6);
	var MAX_INT = __webpack_require__(7);
	
	    /**
	     * Returns random number inside range
	     */
	    function rand(min, max){
	        min = min == null? MIN_INT : min;
	        max = max == null? MAX_INT : max;
	        return min + (max - min) * random();
	    }
	
	    module.exports = rand;
	


/***/ },
/* 9 */
/***/ function(module, exports) {

	
	
	    /**
	     * Just a wrapper to Math.random. No methods inside mout/random should call
	     * Math.random() directly so we can inject the pseudo-random number
	     * generator if needed (ie. in case we need a seeded random or a better
	     * algorithm than the native one)
	     */
	    function random(){
	        return random.get();
	    }
	
	    // we expose the method so it can be swapped if needed
	    random.get = Math.random;
	
	    module.exports = random;
	
	


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(11);
	    /**
	     */
	    var isArray = Array.isArray || function (val) {
	        return isKind(val, 'Array');
	    };
	    module.exports = isArray;
	


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(12);
	    /**
	     * Check if value is from a specific "kind".
	     */
	    function isKind(val, kind){
	        return kindOf(val) === kind;
	    }
	    module.exports = isKind;
	


/***/ },
/* 12 */
/***/ function(module, exports) {

	
	
	    var _rKind = /^\[object (.*)\]$/,
	        _toString = Object.prototype.toString,
	        UNDEF;
	
	    /**
	     * Gets the "kind" of value. (e.g. "String", "Number", etc)
	     */
	    function kindOf(val) {
	        if (val === null) {
	            return 'Null';
	        } else if (val === UNDEF) {
	            return 'Undefined';
	        } else {
	            return _rKind.exec( _toString.call(val) )[1];
	        }
	    }
	    module.exports = kindOf;
	


/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-localstorage.js.map