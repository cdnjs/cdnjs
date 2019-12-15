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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL3Rvb2xpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogQGZpbGUgTWFuYWdlcyBUb29saW5nIEFQSXNcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGpzZm9yY2UgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL2NvcmUnKSxcbiAgICBfICAgICA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJ2xvZGFzaC9jb3JlJyksXG4gICAgQ2FjaGUgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL2NhY2hlJyk7XG5cbi8qKlxuICogQVBJIGNsYXNzIGZvciBUb29saW5nIEFQSSBjYWxsXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IGNvbm4gLSBDb25uZWN0aW9uXG4gKi9cbnZhciBUb29saW5nID0gZnVuY3Rpb24oY29ubikge1xuICB0aGlzLl9jb25uID0gY29ubjtcbiAgdGhpcy5fbG9nZ2VyID0gY29ubi5fbG9nZ2VyO1xuICB2YXIgZGVsZWdhdGVzID0gW1xuICAgIFwicXVlcnlcIixcbiAgICBcInF1ZXJ5TW9yZVwiLFxuICAgIFwiY3JlYXRlXCIsXG4gICAgXCJpbnNlcnRcIixcbiAgICBcInJldHJpZXZlXCIsXG4gICAgXCJ1cGRhdGVcIixcbiAgICBcInVwc2VydFwiLFxuICAgIFwiZGVsXCIsXG4gICAgXCJkZWxldGVcIixcbiAgICBcImRlc3Ryb3lcIixcbiAgICBcImRlc2NyaWJlXCIsXG4gICAgXCJkZXNjcmliZUdsb2JhbFwiLFxuICAgIFwic29iamVjdFwiXG4gIF07XG4gIGRlbGVnYXRlcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHRoaXNbbWV0aG9kXSA9IGNvbm4uY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF07XG4gIH0sIHRoaXMpO1xuXG4gIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoKTtcblxuICB2YXIgY2FjaGVPcHRpb25zID0ge1xuICAgIGtleTogZnVuY3Rpb24odHlwZSkgeyByZXR1cm4gdHlwZSA/IFwiZGVzY3JpYmUuXCIgKyB0eXBlIDogXCJkZXNjcmliZVwiOyB9XG4gIH07XG4gIHRoaXMuZGVzY3JpYmUkID0gdGhpcy5jYWNoZS5tYWtlQ2FjaGVhYmxlKHRoaXMuZGVzY3JpYmUsIHRoaXMsIGNhY2hlT3B0aW9ucyk7XG4gIHRoaXMuZGVzY3JpYmUgPSB0aGlzLmNhY2hlLm1ha2VSZXNwb25zZUNhY2hlYWJsZSh0aGlzLmRlc2NyaWJlLCB0aGlzLCBjYWNoZU9wdGlvbnMpO1xuICB0aGlzLmRlc2NyaWJlU09iamVjdCQgPSB0aGlzLmRlc2NyaWJlJDtcbiAgdGhpcy5kZXNjcmliZVNPYmplY3QgPSB0aGlzLmRlc2NyaWJlO1xuXG4gIGNhY2hlT3B0aW9ucyA9IHsga2V5OiAnZGVzY3JpYmVHbG9iYWwnIH07XG4gIHRoaXMuZGVzY3JpYmVHbG9iYWwkID0gdGhpcy5jYWNoZS5tYWtlQ2FjaGVhYmxlKHRoaXMuZGVzY3JpYmVHbG9iYWwsIHRoaXMsIGNhY2hlT3B0aW9ucyk7XG4gIHRoaXMuZGVzY3JpYmVHbG9iYWwgPSB0aGlzLmNhY2hlLm1ha2VSZXNwb25zZUNhY2hlYWJsZSh0aGlzLmRlc2NyaWJlR2xvYmFsLCB0aGlzLCBjYWNoZU9wdGlvbnMpO1xuXG4gIHRoaXMuaW5pdGlhbGl6ZSgpO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRvb2xpbmcgQVBJXG4gKiBAcHJvdGVjdGVkXG4gKi9cblRvb2xpbmcucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zb2JqZWN0cyA9IHt9O1xuICB0aGlzLmNhY2hlLmNsZWFyKCk7XG4gIHRoaXMuY2FjaGUuZ2V0KCdkZXNjcmliZUdsb2JhbCcpLm9uKCd2YWx1ZScsIF8uYmluZChmdW5jdGlvbihyZXMpIHtcbiAgICBpZiAocmVzLnJlc3VsdCkge1xuICAgICAgdmFyIHR5cGVzID0gXy5tYXAocmVzLnJlc3VsdC5zb2JqZWN0cywgZnVuY3Rpb24oc28pIHsgcmV0dXJuIHNvLm5hbWU7IH0pO1xuICAgICAgdHlwZXMuZm9yRWFjaCh0aGlzLnNvYmplY3QsIHRoaXMpO1xuICAgIH1cbiAgfSwgdGhpcykpO1xufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5Ub29saW5nLnByb3RvdHlwZS5fYmFzZVVybCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fY29ubi5fYmFzZVVybCgpICsgXCIvdG9vbGluZ1wiO1xufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5Ub29saW5nLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QuYXBwbHkodGhpcy5fY29ubiwgYXJndW1lbnRzKTtcbn07XG5cbi8qKlxuICogRXhlY3V0ZSBxdWVyeSBieSB1c2luZyBTT1FMXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNvcWwgLSBTT1FMIHN0cmluZ1xuICogQHBhcmFtIHtDYWxsYmFjay48UXVlcnlSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtRdWVyeS48UXVlcnlSZXN1bHQ+fVxuICovXG4vKipcbiAqIFF1ZXJ5IG5leHQgcmVjb3JkIHNldCBieSB1c2luZyBxdWVyeSBsb2NhdG9yXG4gKlxuICogQG1ldGhvZCBUb29saW5nI3F1ZXJ5XG4gKiBAcGFyYW0ge1N0cmluZ30gbG9jYXRvciAtIE5leHQgcmVjb3JkIHNldCBsb2NhdG9yXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxRdWVyeVJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1F1ZXJ5LjxRdWVyeVJlc3VsdD59XG4gKi9cbi8qKlxuICogUmV0cmlldmUgc3BlY2lmaWVkIHJlY29yZHNcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjcXVlcnlNb3JlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXkuPFN0cmluZz59IGlkcyAtIEEgcmVjb3JkIElEIG9yIGFycmF5IG9mIHJlY29yZCBJRHNcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFJlY29yZHxBcnJheS48UmVjb3JkPj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFJlY29yZHxBcnJheS48UmVjb3JkPj59XG4gKi9cblxuLyoqXG4gKiBTeW5vbnltIG9mIFRvb2xpbmcjY3JlYXRlKClcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjaW5zZXJ0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtPYmplY3R8QXJyYXkuPE9iamVjdD59IHJlY29yZHMgLSBBIHJlY29yZCBvciBhcnJheSBvZiByZWNvcmRzIHRvIGNyZWF0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn1cbiAqL1xuLyoqXG4gKiBDcmVhdGUgcmVjb3Jkc1xuICpcbiAqIEBtZXRob2QgVG9vbGluZyNjcmVhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gU09iamVjdCBUeXBlXG4gKiBAcGFyYW0ge1JlY29yZHxBcnJheS48UmVjb3JkPn0gcmVjb3JkcyAtIEEgcmVjb3JkIG9yIGFycmF5IG9mIHJlY29yZHMgdG8gY3JlYXRlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fVxuICovXG5cbi8qKlxuICogVXBkYXRlIHJlY29yZHNcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjdXBkYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtSZWNvcmR8QXJyYXkuPFJlY29yZD59IHJlY29yZHMgLSBBIHJlY29yZCBvciBhcnJheSBvZiByZWNvcmRzIHRvIHVwZGF0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48UmVjb3JkUmVzdWx0fEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn1cbiAqL1xuXG4vKipcbiAqIFVwc2VydCByZWNvcmRzXG4gKlxuICogQG1ldGhvZCBUb29saW5nI3Vwc2VydFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7UmVjb3JkfEFycmF5LjxSZWNvcmQ+fSByZWNvcmRzIC0gUmVjb3JkIG9yIGFycmF5IG9mIHJlY29yZHMgdG8gdXBzZXJ0XG4gKiBAcGFyYW0ge1N0cmluZ30gZXh0SWRGaWVsZCAtIEV4dGVybmFsIElEIGZpZWxkIG5hbWVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59IFtjYWxsYmFja10gLSBDYWxsYmFja1xuICogQHJldHVybnMge1Byb21pc2UuPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59XG4gKi9cblxuLyoqXG4gKiBTeW5vbnltIG9mIFRvb2xpbmcjZGVzdHJveSgpXG4gKlxuICogQG1ldGhvZCBUb29saW5nI2RlbGV0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IFR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5LjxTdHJpbmc+fSBpZHMgLSBBIElEIG9yIGFycmF5IG9mIElEcyB0byBkZWxldGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59IFtjYWxsYmFja10gLSBDYWxsYmFja1xuICogQHJldHVybnMge1Byb21pc2UuPFJlY29yZFJlc3VsdHxBcnJheS48UmVjb3JkUmVzdWx0Pj59XG4gKi9cbi8qKlxuICogU3lub255bSBvZiBUb29saW5nI2Rlc3Ryb3koKVxuICpcbiAqIEBtZXRob2QgVG9vbGluZyNkZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gU09iamVjdCBUeXBlXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheS48U3RyaW5nPn0gaWRzIC0gQSBJRCBvciBhcnJheSBvZiBJRHMgdG8gZGVsZXRlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2tcbiAqIEByZXR1cm5zIHtQcm9taXNlLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fVxuICovXG4vKipcbiAqIERlbGV0ZSByZWNvcmRzXG4gKlxuICogQG1ldGhvZCBUb29saW5nI2Rlc3Ryb3lcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gU09iamVjdCBUeXBlXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheS48U3RyaW5nPn0gaWRzIC0gQSBJRCBvciBhcnJheSBvZiBJRHMgdG8gZGVsZXRlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2tcbiAqIEByZXR1cm5zIHtQcm9taXNlLjxSZWNvcmRSZXN1bHR8QXJyYXkuPFJlY29yZFJlc3VsdD4+fVxuICovXG5cbi8qKlxuICogU3lub255bSBvZiBUb29saW5nI2Rlc2NyaWJlKClcbiAqXG4gKiBAbWV0aG9kIFRvb2xpbmcjZGVzY3JpYmVTT2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtDYWxsYmFjay48RGVzY3JpYmVTT2JqZWN0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48RGVzY3JpYmVTT2JqZWN0UmVzdWx0Pn1cbiAqL1xuLyoqXG4gKiBEZXNjcmliZSBTT2JqZWN0IG1ldGFkYXRhXG4gKlxuICogQG1ldGhvZCBUb29saW5nI2Rlc2NyaWJlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHBhcmFtIHtDYWxsYmFjay48RGVzY3JpYmVTT2JqZWN0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48RGVzY3JpYmVTT2JqZWN0UmVzdWx0Pn1cbiAqL1xuXG4vKipcbiAqIERlc2NyaWJlIGdsb2JhbCBTT2JqZWN0c1xuICpcbiAqIEBtZXRob2QgVG9vbGluZyNkZXNjcmliZUdsb2JhbFxuICogQHBhcmFtIHtDYWxsYmFjay48RGVzY3JpYmVHbG9iYWxSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxEZXNjcmliZUdsb2JhbFJlc3VsdD59XG4gKi9cblxuLyoqXG4gKiBHZXQgU09iamVjdCBpbnN0YW5jZVxuICpcbiAqIEBtZXRob2QgVG9vbGluZyNzb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgVHlwZVxuICogQHJldHVybnMge1NPYmplY3R9XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBUb29saW5nfkV4ZWN1dGVBbm9ueW1vdXNSZXN1bHRcbiAqIEBwcm9wIHtCb29sZWFufSBjb21waWxlZCAtIEZsYWcgaWYgdGhlIHF1ZXJ5IGlzIGNvbXBpbGVkIHN1Y2Nlc3NmdWxseVxuICogQHByb3Age1N0cmluZ30gY29tcGlsZVByb2JsZW0gLSBFcnJvciByZWFzb24gaW4gY29tcGlsYXRpb25cbiAqIEBwcm9wIHtCb29sZWFufSBzdWNjZXNzIC0gRmxhZyBpZiB0aGUgY29kZSBpcyBleGVjdXRlZCBzdWNjZXNzZnVsbHlcbiAqIEBwcm9wIHtOdW1iZXJ9IGxpbmUgLSBMaW5lIG51bWJlciBmb3IgdGhlIGVycm9yXG4gKiBAcHJvcCB7TnVtYmVyfSBjb2x1bW4gLSBDb2x1bW4gbnVtYmVyIGZvciB0aGUgZXJyb3JcbiAqIEBwcm9wIHtTdHJpbmd9IGV4Y2VwdGlvbk1lc3NhZ2UgLSBFeGNlcHRpb24gbWVzc2FnZVxuICogQHByb3Age1N0cmluZ30gZXhjZXB0aW9uU3RhY2tUcmFjZSAtIEV4Y2VwdGlvbiBzdGFjayB0cmFjZVxuICovXG4vKipcbiAqIEV4ZWN1dGVzIEFwZXggY29kZSBhbm9ueW1vdXNseVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBib2R5IC0gQW5vbnltb3VzIEFwZXggY29kZVxuICogQHBhcmFtIHtDYWxsYmFjay48VG9vbGluZ35FeGVjdXRlQW5vbnltb3VzUmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48VG9vbGluZ35FeGVjdXRlQW5vbnltb3VzUmVzdWx0Pn1cbiAqL1xuVG9vbGluZy5wcm90b3R5cGUuZXhlY3V0ZUFub255bW91cyA9IGZ1bmN0aW9uKGJvZHksIGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSB0aGlzLl9iYXNlVXJsKCkgKyBcIi9leGVjdXRlQW5vbnltb3VzP2Fub255bW91c0JvZHk9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoYm9keSk7XG4gIHJldHVybiB0aGlzLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGVzIEFwZXggdGVzdHMgYXN5bmNocm9ub3VzbHlcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxTdHJpbmc+fSBjbGFzc2lkcyAtIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGNsYXNzIElEc1xuICogQHBhcmFtIHtDYWxsYmFjay48VG9vbGluZ35FeGVjdXRlQW5vbnltb3VzUmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48VG9vbGluZ35FeGVjdXRlQW5vbnltb3VzUmVzdWx0Pn1cbiAqL1xuVG9vbGluZy5wcm90b3R5cGUucnVuVGVzdHNBc3luY2hyb25vdXMgPSBmdW5jdGlvbihjbGFzc2lkcywgY2FsbGJhY2spIHtcbiAgdmFyIHVybCA9IHRoaXMuX2Jhc2VVcmwoKSArIFwiL3J1blRlc3RzQXN5bmNocm9ub3VzL1wiO1xuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0UG9zdCh1cmwsIHtjbGFzc2lkcyA6IGNsYXNzaWRzLmpvaW4oJywnKX0sIHVuZGVmaW5lZCwgY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlcyBBcGV4IHRlc3RzIHN5bmNocm9ub3VzbHlcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxTdHJpbmc+fSBjbGFzc25hbWVzIC0gQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgY2xhc3MgTmFtZXNcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPFRvb2xpbmd+RXhlY3V0ZUFub255bW91c1Jlc3VsdD59XG4gKi9cblRvb2xpbmcucHJvdG90eXBlLnJ1blRlc3RzU3luY2hyb25vdXMgPSBmdW5jdGlvbihjbGFzc25hbWVzLCBjYWxsYmFjaykge1xuICB2YXIgdXJsID0gdGhpcy5fYmFzZVVybCgpICsgXCIvcnVuVGVzdHNTeW5jaHJvbm91cy9cIjtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdFBvc3QodXJsLCB7Y2xhc3NuYW1lcyA6IGNsYXNzbmFtZXMuam9pbignLCcpfSwgdW5kZWZpbmVkLCBjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFRvb2xpbmd+Q29tcGxldGlvbnNSZXN1bHRcbiAqIEBwcm9wIHtPYmplY3R9IHB1YmxpY0RlY2xhcmF0aW9uc1xuICovXG4vKipcbiAqIFJldHJpZXZlcyBhdmFpbGFibGUgY29kZSBjb21wbGV0aW9ucyBvZiB0aGUgcmVmZXJlbmNlZCB0eXBlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFt0eXBlXSAtIGNvbXBsZXRpb24gdHlwZSAoZGVmYXVsdCAnYXBleCcpXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxUb29saW5nfkNvbXBsZXRpb25zUmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48VG9vbGluZ35Db21wbGV0aW9uc1Jlc3VsdD59XG4gKi9cblRvb2xpbmcucHJvdG90eXBlLmNvbXBsZXRpb25zID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKCFfLmlzU3RyaW5nKHR5cGUpKSB7XG4gICAgY2FsbGJhY2sgPSB0eXBlO1xuICAgIHR5cGUgPSAnYXBleCc7XG4gIH1cbiAgdmFyIHVybCA9IHRoaXMuX2Jhc2VVcmwoKSArIFwiL2NvbXBsZXRpb25zP3R5cGU9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodHlwZSk7XG4gIHJldHVybiB0aGlzLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbmpzZm9yY2Uub24oJ2Nvbm5lY3Rpb246bmV3JywgZnVuY3Rpb24oY29ubikge1xuICBjb25uLnRvb2xpbmcgPSBuZXcgVG9vbGluZyhjb25uKTtcbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVG9vbGluZztcbiJdfQ==
