(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Tooling = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  this.cache.get('describeGlobal').removeAllListeners('value');
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
  var url = this._baseUrl() + "/runTestsAsynchronous/";
  return this._conn.requestPost(url, {classids : classids.join(',')}, undefined, callback);
};

/**
 * Executes Apex tests synchronously
 *
 * @param {Array.<String>} classnames - Comma separated list of class Names
 * @param {Callback.<Tooling~ExecuteAnonymousResult>} [callback] - Callback function
 * @returns {Promise.<Tooling~ExecuteAnonymousResult>}
 */
Tooling.prototype.runTestsSynchronous = function(classnames, callback) {
  var url = this._baseUrl() + "/runTestsSynchronous/";
  return this._conn.requestPost(url, {classnames : classnames.join(',')}, undefined, callback);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL3Rvb2xpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBAZmlsZSBNYW5hZ2VzIFRvb2xpbmcgQVBJc1xuICogQGF1dGhvciBTaGluaWNoaSBUb21pdGEgPHNoaW5pY2hpLnRvbWl0YUBnbWFpbC5jb20+XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIganNmb3JjZSA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vY29yZScpLFxuICAgIF8gICAgID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnbG9kYXNoL2NvcmUnKSxcbiAgICBDYWNoZSA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vY2FjaGUnKTtcblxuLyoqXG4gKiBBUEkgY2xhc3MgZm9yIFRvb2xpbmcgQVBJIGNhbGxcbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7Q29ubmVjdGlvbn0gY29ubiAtIENvbm5lY3Rpb25cbiAqL1xudmFyIFRvb2xpbmcgPSBmdW5jdGlvbihjb25uKSB7XG4gIHRoaXMuX2Nvbm4gPSBjb25uO1xuICB0aGlzLl9sb2dnZXIgPSBjb25uLl9sb2dnZXI7XG4gIHZhciBkZWxlZ2F0ZXMgPSBbXG4gICAgXCJxdWVyeVwiLFxuICAgIFwicXVlcnlNb3JlXCIsXG4gICAgXCJjcmVhdGVcIixcbiAgICBcImluc2VydFwiLFxuICAgIFwicmV0cmlldmVcIixcbiAgICBcInVwZGF0ZVwiLFxuICAgIFwidXBzZXJ0XCIsXG4gICAgXCJkZWxcIixcbiAgICBcImRlbGV0ZVwiLFxuICAgIFwiZGVzdHJveVwiLFxuICAgIFwiZGVzY3JpYmVcIixcbiAgICBcImRlc2NyaWJlR2xvYmFsXCIsXG4gICAgXCJzb2JqZWN0XCJcbiAgXTtcbiAgZGVsZWdhdGVzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdGhpc1ttZXRob2RdID0gY29ubi5jb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXTtcbiAgfSwgdGhpcyk7XG5cbiAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSgpO1xuXG4gIHZhciBjYWNoZU9wdGlvbnMgPSB7XG4gICAga2V5OiBmdW5jdGlvbih0eXBlKSB7IHJldHVybiB0eXBlID8gXCJkZXNjcmliZS5cIiArIHR5cGUgOiBcImRlc2NyaWJlXCI7IH1cbiAgfTtcbiAgdGhpcy5kZXNjcmliZSQgPSB0aGlzLmNhY2hlLm1ha2VDYWNoZWFibGUodGhpcy5kZXNjcmliZSwgdGhpcywgY2FjaGVPcHRpb25zKTtcbiAgdGhpcy5kZXNjcmliZSA9IHRoaXMuY2FjaGUubWFrZVJlc3BvbnNlQ2FjaGVhYmxlKHRoaXMuZGVzY3JpYmUsIHRoaXMsIGNhY2hlT3B0aW9ucyk7XG4gIHRoaXMuZGVzY3JpYmVTT2JqZWN0JCA9IHRoaXMuZGVzY3JpYmUkO1xuICB0aGlzLmRlc2NyaWJlU09iamVjdCA9IHRoaXMuZGVzY3JpYmU7XG5cbiAgY2FjaGVPcHRpb25zID0geyBrZXk6ICdkZXNjcmliZUdsb2JhbCcgfTtcbiAgdGhpcy5kZXNjcmliZUdsb2JhbCQgPSB0aGlzLmNhY2hlLm1ha2VDYWNoZWFibGUodGhpcy5kZXNjcmliZUdsb2JhbCwgdGhpcywgY2FjaGVPcHRpb25zKTtcbiAgdGhpcy5kZXNjcmliZUdsb2JhbCA9IHRoaXMuY2FjaGUubWFrZVJlc3BvbnNlQ2FjaGVhYmxlKHRoaXMuZGVzY3JpYmVHbG9iYWwsIHRoaXMsIGNhY2hlT3B0aW9ucyk7XG5cbiAgdGhpcy5pbml0aWFsaXplKCk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgdG9vbGluZyBBUElcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuVG9vbGluZy5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNvYmplY3RzID0ge307XG4gIHRoaXMuY2FjaGUuY2xlYXIoKTtcbiAgdGhpcy5jYWNoZS5nZXQoJ2Rlc2NyaWJlR2xvYmFsJykucmVtb3ZlQWxsTGlzdGVuZXJzKCd2YWx1ZScpO1xuICB0aGlzLmNhY2hlLmdldCgnZGVzY3JpYmVHbG9iYWwnKS5vbigndmFsdWUnLCBfLmJpbmQoZnVuY3Rpb24ocmVzKSB7XG4gICAgaWYgKHJlcy5yZXN1bHQpIHtcbiAgICAgIHZhciB0eXBlcyA9IF8ubWFwKHJlcy5yZXN1bHQuc29iamVjdHMsIGZ1bmN0aW9uKHNvKSB7IHJldHVybiBzby5uYW1lOyB9KTtcbiAgICAgIHR5cGVzLmZvckVhY2godGhpcy5zb2JqZWN0LCB0aGlzKTtcbiAgICB9XG4gIH0sIHRoaXMpKTtcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuVG9vbGluZy5wcm90b3R5cGUuX2Jhc2VVcmwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSArIFwiL3Rvb2xpbmdcIjtcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuVG9vbGluZy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0LmFwcGx5KHRoaXMuX2Nvbm4sIGFyZ3VtZW50cyk7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGUgcXVlcnkgYnkgdXNpbmcgU09RTFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb3FsIC0gU09RTCBzdHJpbmdcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFF1ZXJ5UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UXVlcnkuPFF1ZXJ5UmVzdWx0Pn1cbiAqL1xuLyoqXG4gKiBRdWVyeSBuZXh0IHJlY29yZCBzZXQgYnkgdXNpbmcgcXVlcnkgbG9jYXRvclxuICpcbiAqIEBtZXRob2QgVG9vbGluZyNxdWVyeVxuICogQHBhcmFtIHtTdHJpbmd9IGxvY2F0b3IgLSBOZXh0IHJlY29yZCBzZXQgbG9jYXRvclxuICogQHBhcmFtIHtDYWxsYmFjay48UXVlcnlSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtRdWVyeS48UXVlcnlSZXN1bHQ+fVxuICovXG4vKipcbiAqIFJldHJpZXZlIHNwZWNpZmllZCByZWNvcmRzXG4gKlxuICogQG1ldGhvZCBUb29saW5nI3F1ZXJ5TW9yZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5LjxTdHJpbmc+fSBpZHMgLSBBIHJlY29yZCBJRCBvciBhcnJheSBvZiByZWNvcmQgSURzXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxSZWNvcmR8QXJyYXkuPFJlY29yZD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxSZWNvcmR8QXJyYXkuPFJlY29yZD4+fVxuICovXG5cbi8qKlxuICogU3lub255bSBvZiBUb29saW5nI2NyZWF0ZSgpXG4gKlxuICogQG1ldGhvZCBUb29saW5nI2luc2VydFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5LjxPYmplY3Q+fSByZWNvcmRzIC0gQSByZWNvcmQgb3IgYXJyYXkgb2YgcmVjb3JkcyB0byBjcmVhdGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59XG4gKi9cbi8qKlxuICogQ3JlYXRlIHJlY29yZHNcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjY3JlYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtSZWNvcmR8QXJyYXkuPFJlY29yZD59IHJlY29yZHMgLSBBIHJlY29yZCBvciBhcnJheSBvZiByZWNvcmRzIHRvIGNyZWF0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn1cbiAqL1xuXG4vKipcbiAqIFVwZGF0ZSByZWNvcmRzXG4gKlxuICogQG1ldGhvZCBUb29saW5nI3VwZGF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7UmVjb3JkfEFycmF5LjxSZWNvcmQ+fSByZWNvcmRzIC0gQSByZWNvcmQgb3IgYXJyYXkgb2YgcmVjb3JkcyB0byB1cGRhdGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59XG4gKi9cblxuLyoqXG4gKiBVcHNlcnQgcmVjb3Jkc1xuICpcbiAqIEBtZXRob2QgVG9vbGluZyN1cHNlcnRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gU09iamVjdCBUeXBlXG4gKiBAcGFyYW0ge1JlY29yZHxBcnJheS48UmVjb3JkPn0gcmVjb3JkcyAtIFJlY29yZCBvciBhcnJheSBvZiByZWNvcmRzIHRvIHVwc2VydFxuICogQHBhcmFtIHtTdHJpbmd9IGV4dElkRmllbGQgLSBFeHRlcm5hbCBJRCBmaWVsZCBuYW1lXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2tcbiAqIEByZXR1cm5zIHtQcm9taXNlLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fVxuICovXG5cbi8qKlxuICogU3lub255bSBvZiBUb29saW5nI2Rlc3Ryb3koKVxuICpcbiAqIEBtZXRob2QgVG9vbGluZyNkZWxldGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gU09iamVjdCBUeXBlXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheS48U3RyaW5nPn0gaWRzIC0gQSBJRCBvciBhcnJheSBvZiBJRHMgdG8gZGVsZXRlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2tcbiAqIEByZXR1cm5zIHtQcm9taXNlLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fVxuICovXG4vKipcbiAqIFN5bm9ueW0gb2YgVG9vbGluZyNkZXN0cm95KClcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjZGVsXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXkuPFN0cmluZz59IGlkcyAtIEEgSUQgb3IgYXJyYXkgb2YgSURzIHRvIGRlbGV0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn1cbiAqL1xuLyoqXG4gKiBEZWxldGUgcmVjb3Jkc1xuICpcbiAqIEBtZXRob2QgVG9vbGluZyNkZXN0cm95XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXkuPFN0cmluZz59IGlkcyAtIEEgSUQgb3IgYXJyYXkgb2YgSURzIHRvIGRlbGV0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn1cbiAqL1xuXG4vKipcbiAqIFN5bm9ueW0gb2YgVG9vbGluZyNkZXNjcmliZSgpXG4gKlxuICogQG1ldGhvZCBUb29saW5nI2Rlc2NyaWJlU09iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPERlc2NyaWJlU09iamVjdFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPERlc2NyaWJlU09iamVjdFJlc3VsdD59XG4gKi9cbi8qKlxuICogRGVzY3JpYmUgU09iamVjdCBtZXRhZGF0YVxuICpcbiAqIEBtZXRob2QgVG9vbGluZyNkZXNjcmliZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPERlc2NyaWJlU09iamVjdFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPERlc2NyaWJlU09iamVjdFJlc3VsdD59XG4gKi9cblxuLyoqXG4gKiBEZXNjcmliZSBnbG9iYWwgU09iamVjdHNcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjZGVzY3JpYmVHbG9iYWxcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPERlc2NyaWJlR2xvYmFsUmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48RGVzY3JpYmVHbG9iYWxSZXN1bHQ+fVxuICovXG5cbi8qKlxuICogR2V0IFNPYmplY3QgaW5zdGFuY2VcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjc29iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEByZXR1cm5zIHtTT2JqZWN0fVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVG9vbGluZ35FeGVjdXRlQW5vbnltb3VzUmVzdWx0XG4gKiBAcHJvcCB7Qm9vbGVhbn0gY29tcGlsZWQgLSBGbGFnIGlmIHRoZSBxdWVyeSBpcyBjb21waWxlZCBzdWNjZXNzZnVsbHlcbiAqIEBwcm9wIHtTdHJpbmd9IGNvbXBpbGVQcm9ibGVtIC0gRXJyb3IgcmVhc29uIGluIGNvbXBpbGF0aW9uXG4gKiBAcHJvcCB7Qm9vbGVhbn0gc3VjY2VzcyAtIEZsYWcgaWYgdGhlIGNvZGUgaXMgZXhlY3V0ZWQgc3VjY2Vzc2Z1bGx5XG4gKiBAcHJvcCB7TnVtYmVyfSBsaW5lIC0gTGluZSBudW1iZXIgZm9yIHRoZSBlcnJvclxuICogQHByb3Age051bWJlcn0gY29sdW1uIC0gQ29sdW1uIG51bWJlciBmb3IgdGhlIGVycm9yXG4gKiBAcHJvcCB7U3RyaW5nfSBleGNlcHRpb25NZXNzYWdlIC0gRXhjZXB0aW9uIG1lc3NhZ2VcbiAqIEBwcm9wIHtTdHJpbmd9IGV4Y2VwdGlvblN0YWNrVHJhY2UgLSBFeGNlcHRpb24gc3RhY2sgdHJhY2VcbiAqL1xuLyoqXG4gKiBFeGVjdXRlcyBBcGV4IGNvZGUgYW5vbnltb3VzbHlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYm9keSAtIEFub255bW91cyBBcGV4IGNvZGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59XG4gKi9cblRvb2xpbmcucHJvdG90eXBlLmV4ZWN1dGVBbm9ueW1vdXMgPSBmdW5jdGlvbihib2R5LCBjYWxsYmFjaykge1xuICB2YXIgdXJsID0gdGhpcy5fYmFzZVVybCgpICsgXCIvZXhlY3V0ZUFub255bW91cz9hbm9ueW1vdXNCb2R5PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpO1xuICByZXR1cm4gdGhpcy5yZXF1ZXN0KHVybCkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlcyBBcGV4IHRlc3RzIGFzeW5jaHJvbm91c2x5XG4gKlxuICogQHBhcmFtIHtBcnJheS48U3RyaW5nPn0gY2xhc3NpZHMgLSBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBjbGFzcyBJRHNcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59XG4gKi9cblRvb2xpbmcucHJvdG90eXBlLnJ1blRlc3RzQXN5bmNocm9ub3VzID0gZnVuY3Rpb24oY2xhc3NpZHMsIGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSB0aGlzLl9iYXNlVXJsKCkgKyBcIi9ydW5UZXN0c0FzeW5jaHJvbm91cy9cIjtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdFBvc3QodXJsLCB7Y2xhc3NpZHMgOiBjbGFzc2lkcy5qb2luKCcsJyl9LCB1bmRlZmluZWQsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogRXhlY3V0ZXMgQXBleCB0ZXN0cyBzeW5jaHJvbm91c2x5XG4gKlxuICogQHBhcmFtIHtBcnJheS48U3RyaW5nPn0gY2xhc3NuYW1lcyAtIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGNsYXNzIE5hbWVzXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxUb29saW5nfkV4ZWN1dGVBbm9ueW1vdXNSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxUb29saW5nfkV4ZWN1dGVBbm9ueW1vdXNSZXN1bHQ+fVxuICovXG5Ub29saW5nLnByb3RvdHlwZS5ydW5UZXN0c1N5bmNocm9ub3VzID0gZnVuY3Rpb24oY2xhc3NuYW1lcywgY2FsbGJhY2spIHtcbiAgdmFyIHVybCA9IHRoaXMuX2Jhc2VVcmwoKSArIFwiL3J1blRlc3RzU3luY2hyb25vdXMvXCI7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3RQb3N0KHVybCwge2NsYXNzbmFtZXMgOiBjbGFzc25hbWVzLmpvaW4oJywnKX0sIHVuZGVmaW5lZCwgY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBUb29saW5nfkNvbXBsZXRpb25zUmVzdWx0XG4gKiBAcHJvcCB7T2JqZWN0fSBwdWJsaWNEZWNsYXJhdGlvbnNcbiAqL1xuLyoqXG4gKiBSZXRyaWV2ZXMgYXZhaWxhYmxlIGNvZGUgY29tcGxldGlvbnMgb2YgdGhlIHJlZmVyZW5jZWQgdHlwZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbdHlwZV0gLSBjb21wbGV0aW9uIHR5cGUgKGRlZmF1bHQgJ2FwZXgnKVxuICogQHBhcmFtIHtDYWxsYmFjay48VG9vbGluZ35Db21wbGV0aW9uc1Jlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFRvb2xpbmd+Q29tcGxldGlvbnNSZXN1bHQ+fVxuICovXG5Ub29saW5nLnByb3RvdHlwZS5jb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICghXy5pc1N0cmluZyh0eXBlKSkge1xuICAgIGNhbGxiYWNrID0gdHlwZTtcbiAgICB0eXBlID0gJ2FwZXgnO1xuICB9XG4gIHZhciB1cmwgPSB0aGlzLl9iYXNlVXJsKCkgKyBcIi9jb21wbGV0aW9ucz90eXBlPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHR5cGUpO1xuICByZXR1cm4gdGhpcy5yZXF1ZXN0KHVybCkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4gKiBSZWdpc3RlciBob29rIGluIGNvbm5lY3Rpb24gaW5zdGFudGlhdGlvbiBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIHRoaXMgQVBJIG1vZHVsZSBmZWF0dXJlc1xuICovXG5qc2ZvcmNlLm9uKCdjb25uZWN0aW9uOm5ldycsIGZ1bmN0aW9uKGNvbm4pIHtcbiAgY29ubi50b29saW5nID0gbmV3IFRvb2xpbmcoY29ubik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2xpbmc7XG4iXX0=
