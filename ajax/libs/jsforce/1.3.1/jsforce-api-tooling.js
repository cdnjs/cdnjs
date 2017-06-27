!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self);var f=o;f=f.jsforce||(f.jsforce={}),f=f.modules||(f.modules={}),f=f.api||(f.api={}),f.Tooling=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Manages Tooling APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var util  = jsforce.require('util'),
    _     = jsforce.require('underscore')._,
    Cache = require('../cache');

/**
 * API class for Tooling API call
 *
 * @class
 * @param {Connection} conn - Connection
 */
var Tooling = function(conn) {
  this._conn = conn;
  this._logger = conn._logger;
  var delegates = [
    "query",
    "queryMore",
    "create",
    "insert",
    "retrieve",
    "update",
    "upsert",
    "del",
    "delete",
    "destroy",
    "describe",
    "describeGlobal",
    "sobject"
  ];
  delegates.forEach(function(method) {
    this[method] = conn.constructor.prototype[method];
  }, this);

  this.cache = new Cache();

  var cacheOptions = {
    key: function(type) { return type ? "describe." + type : "describe"; }
  };
  this.describe$ = this.cache.makeCacheable(this.describe, this, cacheOptions);
  this.describe = this.cache.makeResponseCacheable(this.describe, this, cacheOptions);
  this.describeSObject$ = this.describe$;
  this.describeSObject = this.describe;

  cacheOptions = { key: 'describeGlobal' };
  this.describeGlobal$ = this.cache.makeCacheable(this.describeGlobal, this, cacheOptions);
  this.describeGlobal = this.cache.makeResponseCacheable(this.describeGlobal, this, cacheOptions);

  this.initialize();
};

/**
 * Initialize tooling API
 * @protected
 */
Tooling.prototype.initialize = function() {
  this.sobjects = {};
  this.cache.clear();
  this.cache.get('describeGlobal').on('value', _.bind(function(res) {
    if (res.result) {
      var types = _.map(res.result.sobjects, function(so) { return so.name; });
      _.each(types, this.sobject, this);
    }
  }, this));
};

/**
 * @private
 */
Tooling.prototype._baseUrl = function() {
  return this._conn.urls.rest.base + "/tooling";
};

/**
 * @private
 */
Tooling.prototype._request = function() {
  return this._conn._request.apply(this._conn, arguments);
};

/**
 * Execute query by using SOQL
 * 
 * @param {String} soql - SOQL string
 * @param {Callback.<QueryResult>} [callback] - Callback function
 * @returns {Query.<QueryResult>}
 */
/**
 * Query next record set by using query locator
 *
 * @method Tooling#query
 * @param {String} locator - Next record set locator
 * @param {Callback.<QueryResult>} [callback] - Callback function
 * @returns {Query.<QueryResult>}
 */
/**
 * Retrieve specified records
 *
 * @method Tooling#queryMore
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A record ID or array of record IDs 
 * @param {Callback.<Record|Array.<Record>>} [callback] - Callback function
 * @returns {Promise.<Record|Array.<Record>>}
 */

/**
 * Synonym of Tooling#create()
 *
 * @method Tooling#insert
 * @param {String} type - SObject Type
 * @param {Object|Array.<Object>} records - A record or array of records to create
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Create records
 *
 * @method Tooling#create
 * @param {String} type - SObject Type
 * @param {Record|Array.<Record>} records - A record or array of records to create
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */

/**
 * Update records
 *
 * @method Tooling#update
 * @param {String} type - SObject Type
 * @param {Record|Array.<Record>} records - A record or array of records to update
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */

/**
 * Upsert records
 *
 * @method Tooling#upsert
 * @param {String} type - SObject Type
 * @param {Record|Array.<Record>} records - Record or array of records to upsert
 * @param {String} extIdField - External ID field name
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */

/**
 * Synonym of Tooling#destroy()
 *
 * @method Tooling#delete
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Synonym of Tooling#destroy()
 *
 * @method Tooling#del
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Delete records
 *
 * @method Tooling#destroy
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */

/**
 * Synonym of Tooling#describe()
 *
 * @method Tooling#describeSObject
 * @param {String} type - SObject Type
 * @param {Callback.<DescribeSObjectResult>} [callback] - Callback function
 * @returns {Promise.<DescribeSObjectResult>}
 */
/**
 * Describe SObject metadata
 *
 * @method Tooling#describe
 * @param {String} type - SObject Type
 * @param {Callback.<DescribeSObjectResult>} [callback] - Callback function
 * @returns {Promise.<DescribeSObjectResult>}
 */

/**
 * Describe global SObjects
 *
 * @method Tooling#describeGlobal
 * @param {Callback.<DescribeGlobalResult>} [callback] - Callback function
 * @returns {Promise.<DescribeGlobalResult>}
 */

/**
 * Get SObject instance
 *
 * @method Tooling#sobject
 * @param {String} type - SObject Type
 * @returns {SObject}
 */

/**
 * @typedef {Object} Tooling~ExecuteAnonymousResult
 * @prop {Boolean} compiled - Flag if the query is compiled successfully
 * @prop {String} compileProblem - Error reason in compilation
 * @prop {Boolean} success - Flag if the code is executed successfully
 * @prop {Number} line - Line number for the error
 * @prop {Number} column - Column number for the error
 * @prop {String} exceptionMessage - Exception message
 * @prop {String} exceptionStackTrace - Exception stack trace
 */
/**
 * Executes Apex code anonymously
 *
 * @param {String} body - Anonymous Apex code
 * @param {Callback.<Tooling~ExecuteAnonymousResult>} [callback] - Callback function
 * @returns {Promise.<Tooling~ExecuteAnonymousResult>}
 */
Tooling.prototype.executeAnonymous = function(body, callback) {
  var url = this._baseUrl() + "/executeAnonymous?anonymousBody=" + encodeURIComponent(body);
  return this._request(url).thenCall(callback);
};

/**
 * @typedef {Object} Tooling~CompletionsResult
 * @prop {Object} publicDeclarations
 */
/**
 * Retrieves available code completions of the referenced type
 *
 * @param {String} [type] - completion type (default 'apex')
 * @param {Callback.<Tooling~CompletionsResult>} [callback] - Callback function
 * @returns {Promise.<Tooling~CompletionsResult>}
 */
Tooling.prototype.completions = function(type, callback) {
  if (!_.isString(type)) {
    callback = type;
    type = 'apex';
  }
  var url = this._baseUrl() + "/completions?type=" + encodeURIComponent(type);
  return this._request(url).thenCall(callback);
};


module.exports = Tooling;

},{"../cache":2}],2:[function(require,module,exports){
/**
 * @file Manages asynchronous method response cache
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var events = jsforce.require('events'),
    inherits = require('inherits'),
    _      = jsforce.require('underscore')._;

/**
 * Class for managing cache entry
 *
 * @private
 * @class
 * @constructor
 * @template T
 */
var CacheEntry = function() {
  this.fetching = false;
};

inherits(CacheEntry, events.EventEmitter);

/**
 * Get value in the cache entry
 *
 * @param {Callback.<T>} [callback] - Callback function callbacked the cache entry updated
 * @returns {T|undefined}
 */
CacheEntry.prototype.get = function(callback) {
  if (!callback) {
    return this._value;
  } else {
    this.once('value', callback);
    if (!_.isUndefined(this._value)) {
      this.emit('value', this._value);
    }
  }
};

/**
 * Set value in the cache entry
 *
 * @param {T} [value] - A value for caching
 */
CacheEntry.prototype.set = function(value) {
  this._value = value;
  this.emit('value', this._value);
};

/**
 * Clear cached value
 */
CacheEntry.prototype.clear = function() {
  this.fetching = false;
  delete this._value;
};


/**
 * Caching manager for async methods
 *
 * @class
 * @constructor
 */
var Cache = function() {
  this._entries = {};
};

/**
 * retrive cache entry, or create if not exists.
 *
 * @param {String} [key] - Key of cache entry
 * @returns {CacheEntry}
 */
Cache.prototype.get = function(key) {
  if (key && this._entries[key]) {
    return this._entries[key];
  } else {
    var entry = new CacheEntry();
    this._entries[key] = entry;
    return entry;
  }
};

/**
 * clear cache entries prefix matching given key
 * @param {String} [key] - Key prefix of cache entry to clear
 */
Cache.prototype.clear = function(key) {
  for (var k in this._entries) {
    if (!key || k.indexOf(key) === 0) {
      this._entries[k].clear();
    }
  }
};

/**
 * create and return cache key from namespace and serialized arguments.
 * @private
 */
function createCacheKey(namespace, args) {
  args = Array.prototype.slice.apply(args);
  return namespace + '(' + _.map(args, function(a){ return JSON.stringify(a); }).join(',') + ')';
}

/**
 * Enable caching for async call fn to intercept the response and store it to cache.
 * The original async calll fn is always invoked.
 *
 * @protected
 * @param {Function} fn - Function to covert cacheable
 * @param {Object} [scope] - Scope of function call
 * @param {Object} [options] - Options
 * @return {Function} - Cached version of function
 */
Cache.prototype.makeResponseCacheable = function(fn, scope, options) {
  var cache = this;
  options = options || {};
  return function() {
    var args = Array.prototype.slice.apply(arguments);
    var callback = args.pop();
    if (!_.isFunction(callback)) {
      args.push(callback);
      callback = null;
    }
    var key = _.isString(options.key) ? options.key :
              _.isFunction(options.key) ? options.key.apply(scope, args) :
              createCacheKey(options.namespace, args);
    var entry = cache.get(key);
    entry.fetching = true;
    if (callback) {
      args.push(function(err, result) {
        entry.set({ error: err, result: result });
        callback(err, result);
      });
    }
    var ret, error;
    try {
      ret = fn.apply(scope || this, args);
    } catch(e) {
      error = e;
    }
    if (ret && _.isFunction(ret.then)) { // if the returned value is promise
      if (!callback) {
        return ret.then(function(result) {
          entry.set({ error: undefined, result: result });
          return result;
        }, function(err) {
          entry.set({ error: err, result: undefined });
          throw err;
        });
      } else {
        return ret;
      }
    } else {
      entry.set({ error: error, result: ret });
      if (error) { throw error; }
      return ret;
    }
  };
};

/**
 * Enable caching for async call fn to lookup the response cache first, then invoke original if no cached value.
 *
 * @protected
 * @param {Function} fn - Function to covert cacheable
 * @param {Object} [scope] - Scope of function call
 * @param {Object} [options] - Options
 * @return {Function} - Cached version of function
 */
Cache.prototype.makeCacheable = function(fn, scope, options) {
  var cache = this;
  options = options || {};
  var $fn = function() {
    var args = Array.prototype.slice.apply(arguments);
    var callback = args.pop();
    if (!_.isFunction(callback)) {
      args.push(callback);
    }
    var key = _.isString(options.key) ? options.key :
              _.isFunction(options.key) ? options.key.apply(scope, args) :
              createCacheKey(options.namespace, args);
    var entry = cache.get(key);
    if (!_.isFunction(callback)) { // if callback is not given in last arg, return cached result (immediate).
      var value = entry.get();
      if (!value) { throw new Error('Function call result is not cached yet.'); }
      if (value.error) { throw value.error; }
      return value.result;
    }
    entry.get(function(value) {
      callback(value.error, value.result);
    });
    if (!entry.fetching) { // only when no other client is calling function
      entry.fetching = true;
      args.push(function(err, result) {
        entry.set({ error: err, result: result });
      });
      fn.apply(scope || this, args);
    }
  };
  $fn.clear = function() {
    var key = _.isString(options.key) ? options.key :
              _.isFunction(options.key) ? options.key.apply(scope, arguments) :
              createCacheKey(options.namespace, arguments);
    cache.clear(key);
  };
  return $fn;
};


module.exports = Cache;

},{"inherits":3}],3:[function(require,module,exports){
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

},{}]},{},[1])(1)
});