(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Tooling = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Manages Tooling APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

'use strict';

var jsforce = window.jsforce.require('./core'),
    _     = window.jsforce.require('lodash/core'),
    Cache = window.jsforce.require('./cache');

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
      types.forEach(this.sobject, this);
    }
  }, this));
};

/**
 * @private
 */
Tooling.prototype._baseUrl = function() {
  return this._conn._baseUrl() + "/tooling";
};

/**
 * @private
 */
Tooling.prototype.request = function() {
  return this._conn.request.apply(this._conn, arguments);
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
  return this.request(url).thenCall(callback);
};

/**
 * Executes Apex tests asynchronously
 *
 * @param {Array.<String>} classids - Comma separated list of class IDs
 * @param {Callback.<Tooling~ExecuteAnonymousResult>} [callback] - Callback function
 * @returns {Promise.<Tooling~ExecuteAnonymousResult>}
 */
Tooling.prototype.runTestsAsynchronous = function(classids, callback) {
  var url = this._baseUrl() + "/runTestsAsynchronous/?classids=" + classids.join(',');
  return this.request(url).thenCall(callback);
};

/**
 * Executes Apex tests synchronously
 *
 * @param {Array.<String>} classnames - Comma separated list of class Names
 * @param {Callback.<Tooling~ExecuteAnonymousResult>} [callback] - Callback function
 * @returns {Promise.<Tooling~ExecuteAnonymousResult>}
 */
Tooling.prototype.runTestsSynchronous = function(classnames, callback) {
  var url = this._baseUrl() + "/runTestsSynchronous/?classnames=" + classnames.join(',');
  return this.request(url).thenCall(callback);
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
  return this.request(url).thenCall(callback);
};


/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
jsforce.on('connection:new', function(conn) {
  conn.tooling = new Tooling(conn);
});


module.exports = Tooling;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL3Rvb2xpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBmaWxlIE1hbmFnZXMgVG9vbGluZyBBUElzXG4gKiBAYXV0aG9yIFNoaW5pY2hpIFRvbWl0YSA8c2hpbmljaGkudG9taXRhQGdtYWlsLmNvbT5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBqc2ZvcmNlID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnLi9jb3JlJyksXG4gICAgXyAgICAgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdsb2Rhc2gvY29yZScpLFxuICAgIENhY2hlID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnLi9jYWNoZScpO1xuXG4vKipcbiAqIEFQSSBjbGFzcyBmb3IgVG9vbGluZyBBUEkgY2FsbFxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtDb25uZWN0aW9ufSBjb25uIC0gQ29ubmVjdGlvblxuICovXG52YXIgVG9vbGluZyA9IGZ1bmN0aW9uKGNvbm4pIHtcbiAgdGhpcy5fY29ubiA9IGNvbm47XG4gIHRoaXMuX2xvZ2dlciA9IGNvbm4uX2xvZ2dlcjtcbiAgdmFyIGRlbGVnYXRlcyA9IFtcbiAgICBcInF1ZXJ5XCIsXG4gICAgXCJxdWVyeU1vcmVcIixcbiAgICBcImNyZWF0ZVwiLFxuICAgIFwiaW5zZXJ0XCIsXG4gICAgXCJyZXRyaWV2ZVwiLFxuICAgIFwidXBkYXRlXCIsXG4gICAgXCJ1cHNlcnRcIixcbiAgICBcImRlbFwiLFxuICAgIFwiZGVsZXRlXCIsXG4gICAgXCJkZXN0cm95XCIsXG4gICAgXCJkZXNjcmliZVwiLFxuICAgIFwiZGVzY3JpYmVHbG9iYWxcIixcbiAgICBcInNvYmplY3RcIlxuICBdO1xuICBkZWxlZ2F0ZXMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICB0aGlzW21ldGhvZF0gPSBjb25uLmNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdO1xuICB9LCB0aGlzKTtcblxuICB0aGlzLmNhY2hlID0gbmV3IENhY2hlKCk7XG5cbiAgdmFyIGNhY2hlT3B0aW9ucyA9IHtcbiAgICBrZXk6IGZ1bmN0aW9uKHR5cGUpIHsgcmV0dXJuIHR5cGUgPyBcImRlc2NyaWJlLlwiICsgdHlwZSA6IFwiZGVzY3JpYmVcIjsgfVxuICB9O1xuICB0aGlzLmRlc2NyaWJlJCA9IHRoaXMuY2FjaGUubWFrZUNhY2hlYWJsZSh0aGlzLmRlc2NyaWJlLCB0aGlzLCBjYWNoZU9wdGlvbnMpO1xuICB0aGlzLmRlc2NyaWJlID0gdGhpcy5jYWNoZS5tYWtlUmVzcG9uc2VDYWNoZWFibGUodGhpcy5kZXNjcmliZSwgdGhpcywgY2FjaGVPcHRpb25zKTtcbiAgdGhpcy5kZXNjcmliZVNPYmplY3QkID0gdGhpcy5kZXNjcmliZSQ7XG4gIHRoaXMuZGVzY3JpYmVTT2JqZWN0ID0gdGhpcy5kZXNjcmliZTtcblxuICBjYWNoZU9wdGlvbnMgPSB7IGtleTogJ2Rlc2NyaWJlR2xvYmFsJyB9O1xuICB0aGlzLmRlc2NyaWJlR2xvYmFsJCA9IHRoaXMuY2FjaGUubWFrZUNhY2hlYWJsZSh0aGlzLmRlc2NyaWJlR2xvYmFsLCB0aGlzLCBjYWNoZU9wdGlvbnMpO1xuICB0aGlzLmRlc2NyaWJlR2xvYmFsID0gdGhpcy5jYWNoZS5tYWtlUmVzcG9uc2VDYWNoZWFibGUodGhpcy5kZXNjcmliZUdsb2JhbCwgdGhpcywgY2FjaGVPcHRpb25zKTtcblxuICB0aGlzLmluaXRpYWxpemUoKTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0b29saW5nIEFQSVxuICogQHByb3RlY3RlZFxuICovXG5Ub29saW5nLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc29iamVjdHMgPSB7fTtcbiAgdGhpcy5jYWNoZS5jbGVhcigpO1xuICB0aGlzLmNhY2hlLmdldCgnZGVzY3JpYmVHbG9iYWwnKS5vbigndmFsdWUnLCBfLmJpbmQoZnVuY3Rpb24ocmVzKSB7XG4gICAgaWYgKHJlcy5yZXN1bHQpIHtcbiAgICAgIHZhciB0eXBlcyA9IF8ubWFwKHJlcy5yZXN1bHQuc29iamVjdHMsIGZ1bmN0aW9uKHNvKSB7IHJldHVybiBzby5uYW1lOyB9KTtcbiAgICAgIHR5cGVzLmZvckVhY2godGhpcy5zb2JqZWN0LCB0aGlzKTtcbiAgICB9XG4gIH0sIHRoaXMpKTtcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuVG9vbGluZy5wcm90b3R5cGUuX2Jhc2VVcmwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSArIFwiL3Rvb2xpbmdcIjtcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuVG9vbGluZy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0LmFwcGx5KHRoaXMuX2Nvbm4sIGFyZ3VtZW50cyk7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGUgcXVlcnkgYnkgdXNpbmcgU09RTFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb3FsIC0gU09RTCBzdHJpbmdcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFF1ZXJ5UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UXVlcnkuPFF1ZXJ5UmVzdWx0Pn1cbiAqL1xuLyoqXG4gKiBRdWVyeSBuZXh0IHJlY29yZCBzZXQgYnkgdXNpbmcgcXVlcnkgbG9jYXRvclxuICpcbiAqIEBtZXRob2QgVG9vbGluZyNxdWVyeVxuICogQHBhcmFtIHtTdHJpbmd9IGxvY2F0b3IgLSBOZXh0IHJlY29yZCBzZXQgbG9jYXRvclxuICogQHBhcmFtIHtDYWxsYmFjay48UXVlcnlSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtRdWVyeS48UXVlcnlSZXN1bHQ+fVxuICovXG4vKipcbiAqIFJldHJpZXZlIHNwZWNpZmllZCByZWNvcmRzXG4gKlxuICogQG1ldGhvZCBUb29saW5nI3F1ZXJ5TW9yZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5LjxTdHJpbmc+fSBpZHMgLSBBIHJlY29yZCBJRCBvciBhcnJheSBvZiByZWNvcmQgSURzXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxSZWNvcmR8QXJyYXkuPFJlY29yZD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxSZWNvcmR8QXJyYXkuPFJlY29yZD4+fVxuICovXG5cbi8qKlxuICogU3lub255bSBvZiBUb29saW5nI2NyZWF0ZSgpXG4gKlxuICogQG1ldGhvZCBUb29saW5nI2luc2VydFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5LjxPYmplY3Q+fSByZWNvcmRzIC0gQSByZWNvcmQgb3IgYXJyYXkgb2YgcmVjb3JkcyB0byBjcmVhdGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59XG4gKi9cbi8qKlxuICogQ3JlYXRlIHJlY29yZHNcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjY3JlYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtSZWNvcmR8QXJyYXkuPFJlY29yZD59IHJlY29yZHMgLSBBIHJlY29yZCBvciBhcnJheSBvZiByZWNvcmRzIHRvIGNyZWF0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn1cbiAqL1xuXG4vKipcbiAqIFVwZGF0ZSByZWNvcmRzXG4gKlxuICogQG1ldGhvZCBUb29saW5nI3VwZGF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7UmVjb3JkfEFycmF5LjxSZWNvcmQ+fSByZWNvcmRzIC0gQSByZWNvcmQgb3IgYXJyYXkgb2YgcmVjb3JkcyB0byB1cGRhdGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59XG4gKi9cblxuLyoqXG4gKiBVcHNlcnQgcmVjb3Jkc1xuICpcbiAqIEBtZXRob2QgVG9vbGluZyN1cHNlcnRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gU09iamVjdCBUeXBlXG4gKiBAcGFyYW0ge1JlY29yZHxBcnJheS48UmVjb3JkPn0gcmVjb3JkcyAtIFJlY29yZCBvciBhcnJheSBvZiByZWNvcmRzIHRvIHVwc2VydFxuICogQHBhcmFtIHtTdHJpbmd9IGV4dElkRmllbGQgLSBFeHRlcm5hbCBJRCBmaWVsZCBuYW1lXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2tcbiAqIEByZXR1cm5zIHtQcm9taXNlLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fVxuICovXG5cbi8qKlxuICogU3lub255bSBvZiBUb29saW5nI2Rlc3Ryb3koKVxuICpcbiAqIEBtZXRob2QgVG9vbGluZyNkZWxldGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gU09iamVjdCBUeXBlXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheS48U3RyaW5nPn0gaWRzIC0gQSBJRCBvciBhcnJheSBvZiBJRHMgdG8gZGVsZXRlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2tcbiAqIEByZXR1cm5zIHtQcm9taXNlLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fVxuICovXG4vKipcbiAqIFN5bm9ueW0gb2YgVG9vbGluZyNkZXN0cm95KClcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjZGVsXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXkuPFN0cmluZz59IGlkcyAtIEEgSUQgb3IgYXJyYXkgb2YgSURzIHRvIGRlbGV0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn1cbiAqL1xuLyoqXG4gKiBEZWxldGUgcmVjb3Jkc1xuICpcbiAqIEBtZXRob2QgVG9vbGluZyNkZXN0cm95XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXkuPFN0cmluZz59IGlkcyAtIEEgSUQgb3IgYXJyYXkgb2YgSURzIHRvIGRlbGV0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn1cbiAqL1xuXG4vKipcbiAqIFN5bm9ueW0gb2YgVG9vbGluZyNkZXNjcmliZSgpXG4gKlxuICogQG1ldGhvZCBUb29saW5nI2Rlc2NyaWJlU09iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPERlc2NyaWJlU09iamVjdFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPERlc2NyaWJlU09iamVjdFJlc3VsdD59XG4gKi9cbi8qKlxuICogRGVzY3JpYmUgU09iamVjdCBtZXRhZGF0YVxuICpcbiAqIEBtZXRob2QgVG9vbGluZyNkZXNjcmliZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPERlc2NyaWJlU09iamVjdFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPERlc2NyaWJlU09iamVjdFJlc3VsdD59XG4gKi9cblxuLyoqXG4gKiBEZXNjcmliZSBnbG9iYWwgU09iamVjdHNcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjZGVzY3JpYmVHbG9iYWxcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPERlc2NyaWJlR2xvYmFsUmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48RGVzY3JpYmVHbG9iYWxSZXN1bHQ+fVxuICovXG5cbi8qKlxuICogR2V0IFNPYmplY3QgaW5zdGFuY2VcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjc29iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEByZXR1cm5zIHtTT2JqZWN0fVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVG9vbGluZ35FeGVjdXRlQW5vbnltb3VzUmVzdWx0XG4gKiBAcHJvcCB7Qm9vbGVhbn0gY29tcGlsZWQgLSBGbGFnIGlmIHRoZSBxdWVyeSBpcyBjb21waWxlZCBzdWNjZXNzZnVsbHlcbiAqIEBwcm9wIHtTdHJpbmd9IGNvbXBpbGVQcm9ibGVtIC0gRXJyb3IgcmVhc29uIGluIGNvbXBpbGF0aW9uXG4gKiBAcHJvcCB7Qm9vbGVhbn0gc3VjY2VzcyAtIEZsYWcgaWYgdGhlIGNvZGUgaXMgZXhlY3V0ZWQgc3VjY2Vzc2Z1bGx5XG4gKiBAcHJvcCB7TnVtYmVyfSBsaW5lIC0gTGluZSBudW1iZXIgZm9yIHRoZSBlcnJvclxuICogQHByb3Age051bWJlcn0gY29sdW1uIC0gQ29sdW1uIG51bWJlciBmb3IgdGhlIGVycm9yXG4gKiBAcHJvcCB7U3RyaW5nfSBleGNlcHRpb25NZXNzYWdlIC0gRXhjZXB0aW9uIG1lc3NhZ2VcbiAqIEBwcm9wIHtTdHJpbmd9IGV4Y2VwdGlvblN0YWNrVHJhY2UgLSBFeGNlcHRpb24gc3RhY2sgdHJhY2VcbiAqL1xuLyoqXG4gKiBFeGVjdXRlcyBBcGV4IGNvZGUgYW5vbnltb3VzbHlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYm9keSAtIEFub255bW91cyBBcGV4IGNvZGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59XG4gKi9cblRvb2xpbmcucHJvdG90eXBlLmV4ZWN1dGVBbm9ueW1vdXMgPSBmdW5jdGlvbihib2R5LCBjYWxsYmFjaykge1xuICB2YXIgdXJsID0gdGhpcy5fYmFzZVVybCgpICsgXCIvZXhlY3V0ZUFub255bW91cz9hbm9ueW1vdXNCb2R5PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpO1xuICByZXR1cm4gdGhpcy5yZXF1ZXN0KHVybCkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlcyBBcGV4IHRlc3RzIGFzeW5jaHJvbm91c2x5XG4gKlxuICogQHBhcmFtIHtBcnJheS48U3RyaW5nPn0gY2xhc3NpZHMgLSBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBjbGFzcyBJRHNcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59XG4gKi9cblRvb2xpbmcucHJvdG90eXBlLnJ1blRlc3RzQXN5bmNocm9ub3VzID0gZnVuY3Rpb24oY2xhc3NpZHMsIGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSB0aGlzLl9iYXNlVXJsKCkgKyBcIi9ydW5UZXN0c0FzeW5jaHJvbm91cy8/Y2xhc3NpZHM9XCIgKyBjbGFzc2lkcy5qb2luKCcsJyk7XG4gIHJldHVybiB0aGlzLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGVzIEFwZXggdGVzdHMgc3luY2hyb25vdXNseVxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPFN0cmluZz59IGNsYXNzbmFtZXMgLSBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBjbGFzcyBOYW1lc1xuICogQHBhcmFtIHtDYWxsYmFjay48VG9vbGluZ35FeGVjdXRlQW5vbnltb3VzUmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48VG9vbGluZ35FeGVjdXRlQW5vbnltb3VzUmVzdWx0Pn1cbiAqL1xuVG9vbGluZy5wcm90b3R5cGUucnVuVGVzdHNTeW5jaHJvbm91cyA9IGZ1bmN0aW9uKGNsYXNzbmFtZXMsIGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSB0aGlzLl9iYXNlVXJsKCkgKyBcIi9ydW5UZXN0c1N5bmNocm9ub3VzLz9jbGFzc25hbWVzPVwiICsgY2xhc3NuYW1lcy5qb2luKCcsJyk7XG4gIHJldHVybiB0aGlzLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFRvb2xpbmd+Q29tcGxldGlvbnNSZXN1bHRcbiAqIEBwcm9wIHtPYmplY3R9IHB1YmxpY0RlY2xhcmF0aW9uc1xuICovXG4vKipcbiAqIFJldHJpZXZlcyBhdmFpbGFibGUgY29kZSBjb21wbGV0aW9ucyBvZiB0aGUgcmVmZXJlbmNlZCB0eXBlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFt0eXBlXSAtIGNvbXBsZXRpb24gdHlwZSAoZGVmYXVsdCAnYXBleCcpXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxUb29saW5nfkNvbXBsZXRpb25zUmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48VG9vbGluZ35Db21wbGV0aW9uc1Jlc3VsdD59XG4gKi9cblRvb2xpbmcucHJvdG90eXBlLmNvbXBsZXRpb25zID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKCFfLmlzU3RyaW5nKHR5cGUpKSB7XG4gICAgY2FsbGJhY2sgPSB0eXBlO1xuICAgIHR5cGUgPSAnYXBleCc7XG4gIH1cbiAgdmFyIHVybCA9IHRoaXMuX2Jhc2VVcmwoKSArIFwiL2NvbXBsZXRpb25zP3R5cGU9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodHlwZSk7XG4gIHJldHVybiB0aGlzLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbmpzZm9yY2Uub24oJ2Nvbm5lY3Rpb246bmV3JywgZnVuY3Rpb24oY29ubikge1xuICBjb25uLnRvb2xpbmcgPSBuZXcgVG9vbGluZyhjb25uKTtcbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVG9vbGluZztcbiJdfQ==
