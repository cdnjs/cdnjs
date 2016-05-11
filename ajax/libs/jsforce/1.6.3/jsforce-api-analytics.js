(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Analytics = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Manages Salesforce Analytics API
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

'use strict';

var _ = window.jsforce.require('lodash/core'),
    jsforce = window.jsforce.require('./core'),
    Promise  = window.jsforce.require('./promise');

/**
 * Report instance to retrieving asynchronously executed result
 *
 * @protected
 * @class Analytics~ReportInstance
 * @param {Analytics~Report} report - Report
 * @param {String} id - Report instance id
 */
var ReportInstance = function(report, id) {
  this._report = report;
  this._conn = report._conn;
  this.id = id;
};

/**
 * Retrieve report result asynchronously executed
 *
 * @method Analytics~ReportInstance#retrieve
 * @param {Callback.<Analytics~ReportResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportResult>}
 */
ReportInstance.prototype.retrieve = function(callback) {
  var conn = this._conn,
      report = this._report;
  var url = [ conn._baseUrl(), "analytics", "reports", report.id, "instances", this.id ].join('/');
  return conn.request(url).thenCall(callback);
};

/**
 * Report object in Analytics API
 *
 * @protected
 * @class Analytics~Report
 * @param {Connection} conn Connection
 */
var Report = function(conn, id) {
  this._conn = conn;
  this.id = id;
};

/**
 * Describe report metadata
 *
 * @method Analytics~Report#describe
 * @param {Callback.<Analytics~ReportMetadata>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportMetadata>}
 */
Report.prototype.describe = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "reports", this.id, "describe" ].join('/');
  return this._conn.request(url).thenCall(callback);
};

/**
 * Explain plan for executing report
 *
 * @method Analytics~Report#explain
 * @param {Callback.<ExplainInfo>} [callback] - Callback function
 * @returns {Promise.<ExplainInfo>}
 */
Report.prototype.explain = function(callback) {
  var url = "/query/?explain=" + this.id;
  return this._conn.request(url).thenCall(callback);
};


/**
 * Run report synchronously
 *
 * @method Analytics~Report#execute
 * @param {Object} [options] - Options
 * @param {Boolean} options.details - Flag if include detail in result
 * @param {Analytics~ReportMetadata} options.metadata - Overriding report metadata
 * @param {Callback.<Analytics~ReportResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportResult>}
 */
Report.prototype.run =
Report.prototype.exec =
Report.prototype.execute = function(options, callback) {
  options = options || {};
  if (_.isFunction(options)) {
    callback = options;
    options = {};
  }
  var url = [ this._conn._baseUrl(), "analytics", "reports", this.id ].join('/');
  url += "?includeDetails=" + (options.details ? "true" : "false");
  var params = { method : options.metadata ? 'POST' : 'GET', url : url };
  if (options.metadata) {
    params.headers = { "Content-Type" : "application/json" };
    params.body = JSON.stringify(options.metadata);
  }
  return this._conn.request(params).thenCall(callback);
};


/**
 * Run report asynchronously
 *
 * @method Analytics~Report#executeAsync
 * @param {Object} [options] - Options
 * @param {Boolean} options.details - Flag if include detail in result
 * @param {Analytics~ReportMetadata} options.metadata - Overriding report metadata
 * @param {Callback.<Analytics~ReportInstanceAttrs>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportInstanceAttrs>}
 */
Report.prototype.executeAsync = function(options, callback) {
  options = options || {};
  if (_.isFunction(options)) {
    callback = options;
    options = {};
  }
  var url = [ this._conn._baseUrl(), "analytics", "reports", this.id, "instances" ].join('/');
  if (options.details) {
    url += "?includeDetails=true";
  }
  var params = { method : 'POST', url : url, body: "" };
  if (options.metadata) {
    params.headers = { "Content-Type" : "application/json" };
    params.body = JSON.stringify(options.metadata);
  }
  return this._conn.request(params).thenCall(callback);
};

/**
 * Get report instance for specified instance ID
 *
 * @method Analytics~Report#instance
 * @param {String} id - Report instance ID
 * @returns {Analytics~ReportInstance}
 */
Report.prototype.instance = function(id) {
  return new ReportInstance(this, id);
};

/**
 * List report instances which had been executed asynchronously
 *
 * @method Analytics~Report#instances
 * @param {Callback.<Array.<Analytics~ReportInstanceAttrs>>} [callback] - Callback function
 * @returns {Promise.<Array.<Analytics~ReportInstanceAttrs>>}
 */
Report.prototype.instances = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "reports", this.id, "instances" ].join('/');
  return this._conn.request(url).thenCall(callback);
};


/**
 * API class for Analytics API
 *
 * @class
 * @param {Connection} conn Connection
 */
var Analytics = function(conn) {
  this._conn = conn;
};

/**
 * Get report object of Analytics API
 *
 * @param {String} id - Report Id
 * @returns {Analytics~Report}
 */
Analytics.prototype.report = function(id) {
  return new Report(this._conn, id);
};

/**
 * Get recent report list
 *
 * @param {Callback.<Array.<Analytics~ReportInfo>>} [callback] - Callback function
 * @returns {Promise.<Array.<Analytics~ReportInfo>>}
 */
Analytics.prototype.reports = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "reports" ].join('/');
  return this._conn.request(url).thenCall(callback);
};


/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
jsforce.on('connection:new', function(conn) {
  conn.analytics = new Analytics(conn);
});


module.exports = Analytics;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL2FuYWx5dGljcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZmlsZSBNYW5hZ2VzIFNhbGVzZm9yY2UgQW5hbHl0aWNzIEFQSVxuICogQGF1dGhvciBTaGluaWNoaSBUb21pdGEgPHNoaW5pY2hpLnRvbWl0YUBnbWFpbC5jb20+XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJ2xvZGFzaC9jb3JlJyksXG4gICAganNmb3JjZSA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vY29yZScpLFxuICAgIFByb21pc2UgID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnLi9wcm9taXNlJyk7XG5cbi8qKlxuICogUmVwb3J0IGluc3RhbmNlIHRvIHJldHJpZXZpbmcgYXN5bmNocm9ub3VzbHkgZXhlY3V0ZWQgcmVzdWx0XG4gKlxuICogQHByb3RlY3RlZFxuICogQGNsYXNzIEFuYWx5dGljc35SZXBvcnRJbnN0YW5jZVxuICogQHBhcmFtIHtBbmFseXRpY3N+UmVwb3J0fSByZXBvcnQgLSBSZXBvcnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIFJlcG9ydCBpbnN0YW5jZSBpZFxuICovXG52YXIgUmVwb3J0SW5zdGFuY2UgPSBmdW5jdGlvbihyZXBvcnQsIGlkKSB7XG4gIHRoaXMuX3JlcG9ydCA9IHJlcG9ydDtcbiAgdGhpcy5fY29ubiA9IHJlcG9ydC5fY29ubjtcbiAgdGhpcy5pZCA9IGlkO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSByZXBvcnQgcmVzdWx0IGFzeW5jaHJvbm91c2x5IGV4ZWN1dGVkXG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+UmVwb3J0SW5zdGFuY2UjcmV0cmlldmVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFuYWx5dGljc35SZXBvcnRSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxBbmFseXRpY3N+UmVwb3J0UmVzdWx0Pn1cbiAqL1xuUmVwb3J0SW5zdGFuY2UucHJvdG90eXBlLnJldHJpZXZlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIGNvbm4gPSB0aGlzLl9jb25uLFxuICAgICAgcmVwb3J0ID0gdGhpcy5fcmVwb3J0O1xuICB2YXIgdXJsID0gWyBjb25uLl9iYXNlVXJsKCksIFwiYW5hbHl0aWNzXCIsIFwicmVwb3J0c1wiLCByZXBvcnQuaWQsIFwiaW5zdGFuY2VzXCIsIHRoaXMuaWQgXS5qb2luKCcvJyk7XG4gIHJldHVybiBjb25uLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIFJlcG9ydCBvYmplY3QgaW4gQW5hbHl0aWNzIEFQSVxuICpcbiAqIEBwcm90ZWN0ZWRcbiAqIEBjbGFzcyBBbmFseXRpY3N+UmVwb3J0XG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IGNvbm4gQ29ubmVjdGlvblxuICovXG52YXIgUmVwb3J0ID0gZnVuY3Rpb24oY29ubiwgaWQpIHtcbiAgdGhpcy5fY29ubiA9IGNvbm47XG4gIHRoaXMuaWQgPSBpZDtcbn07XG5cbi8qKlxuICogRGVzY3JpYmUgcmVwb3J0IG1ldGFkYXRhXG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+UmVwb3J0I2Rlc2NyaWJlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBbmFseXRpY3N+UmVwb3J0TWV0YWRhdGE+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxBbmFseXRpY3N+UmVwb3J0TWV0YWRhdGE+fVxuICovXG5SZXBvcnQucHJvdG90eXBlLmRlc2NyaWJlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHVybCA9IFsgdGhpcy5fY29ubi5fYmFzZVVybCgpLCBcImFuYWx5dGljc1wiLCBcInJlcG9ydHNcIiwgdGhpcy5pZCwgXCJkZXNjcmliZVwiIF0uam9pbignLycpO1xuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHVybCkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBFeHBsYWluIHBsYW4gZm9yIGV4ZWN1dGluZyByZXBvcnRcbiAqXG4gKiBAbWV0aG9kIEFuYWx5dGljc35SZXBvcnQjZXhwbGFpblxuICogQHBhcmFtIHtDYWxsYmFjay48RXhwbGFpbkluZm8+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxFeHBsYWluSW5mbz59XG4gKi9cblJlcG9ydC5wcm90b3R5cGUuZXhwbGFpbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBcIi9xdWVyeS8/ZXhwbGFpbj1cIiArIHRoaXMuaWQ7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qKlxuICogUnVuIHJlcG9ydCBzeW5jaHJvbm91c2x5XG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+UmVwb3J0I2V4ZWN1dGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25zXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZGV0YWlscyAtIEZsYWcgaWYgaW5jbHVkZSBkZXRhaWwgaW4gcmVzdWx0XG4gKiBAcGFyYW0ge0FuYWx5dGljc35SZXBvcnRNZXRhZGF0YX0gb3B0aW9ucy5tZXRhZGF0YSAtIE92ZXJyaWRpbmcgcmVwb3J0IG1ldGFkYXRhXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBbmFseXRpY3N+UmVwb3J0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QW5hbHl0aWNzflJlcG9ydFJlc3VsdD59XG4gKi9cblJlcG9ydC5wcm90b3R5cGUucnVuID1cblJlcG9ydC5wcm90b3R5cGUuZXhlYyA9XG5SZXBvcnQucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjaykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKF8uaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgdmFyIHVybCA9IFsgdGhpcy5fY29ubi5fYmFzZVVybCgpLCBcImFuYWx5dGljc1wiLCBcInJlcG9ydHNcIiwgdGhpcy5pZCBdLmpvaW4oJy8nKTtcbiAgdXJsICs9IFwiP2luY2x1ZGVEZXRhaWxzPVwiICsgKG9wdGlvbnMuZGV0YWlscyA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgdmFyIHBhcmFtcyA9IHsgbWV0aG9kIDogb3B0aW9ucy5tZXRhZGF0YSA/ICdQT1NUJyA6ICdHRVQnLCB1cmwgOiB1cmwgfTtcbiAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHtcbiAgICBwYXJhbXMuaGVhZGVycyA9IHsgXCJDb250ZW50LVR5cGVcIiA6IFwiYXBwbGljYXRpb24vanNvblwiIH07XG4gICAgcGFyYW1zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLm1ldGFkYXRhKTtcbiAgfVxuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHBhcmFtcykudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuXG4vKipcbiAqIFJ1biByZXBvcnQgYXN5bmNocm9ub3VzbHlcbiAqXG4gKiBAbWV0aG9kIEFuYWx5dGljc35SZXBvcnQjZXhlY3V0ZUFzeW5jXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmRldGFpbHMgLSBGbGFnIGlmIGluY2x1ZGUgZGV0YWlsIGluIHJlc3VsdFxuICogQHBhcmFtIHtBbmFseXRpY3N+UmVwb3J0TWV0YWRhdGF9IG9wdGlvbnMubWV0YWRhdGEgLSBPdmVycmlkaW5nIHJlcG9ydCBtZXRhZGF0YVxuICogQHBhcmFtIHtDYWxsYmFjay48QW5hbHl0aWNzflJlcG9ydEluc3RhbmNlQXR0cnM+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxBbmFseXRpY3N+UmVwb3J0SW5zdGFuY2VBdHRycz59XG4gKi9cblJlcG9ydC5wcm90b3R5cGUuZXhlY3V0ZUFzeW5jID0gZnVuY3Rpb24ob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGlmIChfLmlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJyZXBvcnRzXCIsIHRoaXMuaWQsIFwiaW5zdGFuY2VzXCIgXS5qb2luKCcvJyk7XG4gIGlmIChvcHRpb25zLmRldGFpbHMpIHtcbiAgICB1cmwgKz0gXCI/aW5jbHVkZURldGFpbHM9dHJ1ZVwiO1xuICB9XG4gIHZhciBwYXJhbXMgPSB7IG1ldGhvZCA6ICdQT1NUJywgdXJsIDogdXJsLCBib2R5OiBcIlwiIH07XG4gIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7XG4gICAgcGFyYW1zLmhlYWRlcnMgPSB7IFwiQ29udGVudC1UeXBlXCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9O1xuICAgIHBhcmFtcy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5tZXRhZGF0YSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdChwYXJhbXMpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogR2V0IHJlcG9ydCBpbnN0YW5jZSBmb3Igc3BlY2lmaWVkIGluc3RhbmNlIElEXG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+UmVwb3J0I2luc3RhbmNlXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBSZXBvcnQgaW5zdGFuY2UgSURcbiAqIEByZXR1cm5zIHtBbmFseXRpY3N+UmVwb3J0SW5zdGFuY2V9XG4gKi9cblJlcG9ydC5wcm90b3R5cGUuaW5zdGFuY2UgPSBmdW5jdGlvbihpZCkge1xuICByZXR1cm4gbmV3IFJlcG9ydEluc3RhbmNlKHRoaXMsIGlkKTtcbn07XG5cbi8qKlxuICogTGlzdCByZXBvcnQgaW5zdGFuY2VzIHdoaWNoIGhhZCBiZWVuIGV4ZWN1dGVkIGFzeW5jaHJvbm91c2x5XG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+UmVwb3J0I2luc3RhbmNlc1xuICogQHBhcmFtIHtDYWxsYmFjay48QXJyYXkuPEFuYWx5dGljc35SZXBvcnRJbnN0YW5jZUF0dHJzPj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFycmF5LjxBbmFseXRpY3N+UmVwb3J0SW5zdGFuY2VBdHRycz4+fVxuICovXG5SZXBvcnQucHJvdG90eXBlLmluc3RhbmNlcyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJyZXBvcnRzXCIsIHRoaXMuaWQsIFwiaW5zdGFuY2VzXCIgXS5qb2luKCcvJyk7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qKlxuICogQVBJIGNsYXNzIGZvciBBbmFseXRpY3MgQVBJXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IGNvbm4gQ29ubmVjdGlvblxuICovXG52YXIgQW5hbHl0aWNzID0gZnVuY3Rpb24oY29ubikge1xuICB0aGlzLl9jb25uID0gY29ubjtcbn07XG5cbi8qKlxuICogR2V0IHJlcG9ydCBvYmplY3Qgb2YgQW5hbHl0aWNzIEFQSVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIFJlcG9ydCBJZFxuICogQHJldHVybnMge0FuYWx5dGljc35SZXBvcnR9XG4gKi9cbkFuYWx5dGljcy5wcm90b3R5cGUucmVwb3J0ID0gZnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIG5ldyBSZXBvcnQodGhpcy5fY29ubiwgaWQpO1xufTtcblxuLyoqXG4gKiBHZXQgcmVjZW50IHJlcG9ydCBsaXN0XG4gKlxuICogQHBhcmFtIHtDYWxsYmFjay48QXJyYXkuPEFuYWx5dGljc35SZXBvcnRJbmZvPj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFycmF5LjxBbmFseXRpY3N+UmVwb3J0SW5mbz4+fVxuICovXG5BbmFseXRpY3MucHJvdG90eXBlLnJlcG9ydHMgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgdXJsID0gWyB0aGlzLl9jb25uLl9iYXNlVXJsKCksIFwiYW5hbHl0aWNzXCIsIFwicmVwb3J0c1wiIF0uam9pbignLycpO1xuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHVybCkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4gKiBSZWdpc3RlciBob29rIGluIGNvbm5lY3Rpb24gaW5zdGFudGlhdGlvbiBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIHRoaXMgQVBJIG1vZHVsZSBmZWF0dXJlc1xuICovXG5qc2ZvcmNlLm9uKCdjb25uZWN0aW9uOm5ldycsIGZ1bmN0aW9uKGNvbm4pIHtcbiAgY29ubi5hbmFseXRpY3MgPSBuZXcgQW5hbHl0aWNzKGNvbm4pO1xufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBBbmFseXRpY3M7XG4iXX0=
