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
 * Synonym of Analytics~Report#destroy()
 *
 * @method Analytics~Report#delete
 * @param {Callback.<Analytics~ReportResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportResult>}
 */
/**
 * Synonym of Analytics~Report#destroy()
 *
 * @method Analytics~Report#del
 * @param {Callback.<Analytics~ReportResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportResult>}
 */
/**
 * Destroy a report
 *
 * @method Analytics~Report#destroy
 * @param {Callback.<Analytics~ReportResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportResult>}
 */
Report.prototype["delete"] =
Report.prototype.del =
Report.prototype.destroy = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "reports", this.id ].join('/');
  return this._conn.request({method: 'DELETE', url: url}).thenCall(callback);
};

/**
 * Clones a given report
 *
 * @method Analytics~Report#clone
 * @param {String} name - The name of the new report
 * @param {Callback.<Analytics~ReportResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportResult>}
 */
Report.prototype.clone = function(name, callback) {
  var url = [ this._conn._baseUrl(), "analytics", "reports" ].join('/');
  url += "?cloneId=" + this.id;
  var data = { reportMetadata: { name: name } };
  var params = { method : 'POST', url: url, headers: { "Content-Type" : "application/json" }, body: JSON.stringify(data)};

  this._conn.request(params).thenCall(callback);
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
 * Dashboard object in the Analytics API
 *
 * @protected
 * @class Analytics-Dashboard
 * @param {Connection} conn Connection
 * @param {String} id - The Id
 */

var Dashboard = function(conn, id) {
  this._conn = conn;
  this.id = id;
};

/**
 * Describe dashboard metadata
 *
 * @method Analytics~Dashboard#describe
 * @param {Callback.<Analytics-DashboardMetadata>} [callback] - Callback function
 * @returns {Promise.<Analytics-DashboardMetadata>}
 */
Dashboard.prototype.describe = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "dashboards", this.id, "describe" ].join('/');
  return this._conn.request(url).thenCall(callback);
};

/**
 * Get details about dashboard components
 *
 * @method Analytics~Dashboard#components
 * @param {Callback.<Analytics-DashboardComponentMetadata>} [callback] - Callback function
 * @returns {Promise.<Analytics-DashboardComponentMetadata>}
 */
Dashboard.prototype.components = function(componentIds, callback) {
  var url = [ this._conn._baseUrl(), "analytics", "dashboards", this.id].join('/');
  var data = {};
  if (_.isFunction(componentIds)) {
    callback = componentIds;
  } else if (_.isArray(componentIds)) {
    data.componentIds = componentIds
  } else {
    data.componentIds = [];
    data.componentIds.push(componentIds);
  }
  var params = { method : 'POST', url : url, headers : { "Content-Type" : "application/json" }, body : JSON.stringify(data)};
  return this._conn.request(params).thenCall(callback);
};

/**
 * Get dashboard status
 *
 * @method Analytics~Dashboard#status
 * @param {Callback.<Analytics-DashboardStatusMetadata>} [callback] - Callback function
 * @returns {Promise.<Analytics-DashboardStatusMetadata>}
 */
Dashboard.prototype.status = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "dashboards", this.id, "status" ].join('/');
  return this._conn.request(url).thenCall(callback);
};

/**
 * Refresh a dashboard
 *
 * @method Analytics~Dashboard#refresh
 * @param {Callback.<Analytics-DashboardStatusUrl>} [callback] - Callback function
 * @returns {Promise.<Analytics-DashboardStatusUrl>}
 */
Dashboard.prototype.refresh = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "dashboards", this.id ].join('/');
  var params = { method : 'PUT', url : url, body: '' };
  return this._conn.request(params).thenCall(callback);
};

/**
 * Clone a dashboard
 *
 * @method Analytics~Dashboard#clone
 * @param {Callback.<Analytics-DashboardMetadata>} [callback] - Callback function
 * @returns {Promise.<Analytics-DashboardMetadata>}
 */
Dashboard.prototype.clone = function(name, folderid, callback) {
  var url = [ this._conn._baseUrl(), "analytics", "dashboards" ].join('/');
  url += "?cloneId=" + this.id;
  var data = {};

  if (_.isObject(name)) {
    data = name;
    callback = folderid;
  } else {
    data.name = name;
    data.folderId = folderid;
  }
  var params = { method : 'POST', url : url, headers : { "Content-Type" : "application/json" }, body : JSON.stringify(data)};

  this._conn.request(params).thenCall(callback);
};

/**
 * Synonym of Analytics~Dashboard#destroy()
 *
 * @method Analytics~Dashboard#delete
 * @param {Callback.<Analytics~DashboardResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~DashboardResult>}
 */
/**
 * Synonym of Analytics~Dashboard#destroy()
 *
 * @method Analytics~Dashboard#del
 * @param {Callback.<Analytics~DashboardResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~DashboardResult>}
 */
/**
 * Destroy a dashboard
 *
 * @method Analytics~Dashboard#destroy
 * @param {Callback.<Analytics~DashboardResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~DashboardResult>}
 */
Dashboard.prototype["delete"] =
Dashboard.prototype.del =
Dashboard.prototype.destroy = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "dashboards", this.id ].join('/');
  return this._conn.request({method: 'DELETE', url: url}).thenCall(callback);
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

/**
 * Get dashboard object of Analytics API
 *
 * @param {String} id - Dashboard Id
 * @returns {Analytics~Dashboard}
 */
Analytics.prototype.dashboard = function(id) {
  return new Dashboard(this._conn, id);
};

/**
 * Get recent dashboard list
 *
 * @param {Callback.<Array.<Analytics~DashboardInfo>>} [callback] - Callback function
 * @returns {Promise.<Array.<Analytics~DashboardInfo>>}
 */
Analytics.prototype.dashboards = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "dashboards" ].join('/');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL2FuYWx5dGljcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGZpbGUgTWFuYWdlcyBTYWxlc2ZvcmNlIEFuYWx5dGljcyBBUElcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdsb2Rhc2gvY29yZScpLFxuICAgIGpzZm9yY2UgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL2NvcmUnKSxcbiAgICBQcm9taXNlICA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vcHJvbWlzZScpO1xuXG4vKipcbiAqIFJlcG9ydCBpbnN0YW5jZSB0byByZXRyaWV2aW5nIGFzeW5jaHJvbm91c2x5IGV4ZWN1dGVkIHJlc3VsdFxuICpcbiAqIEBwcm90ZWN0ZWRcbiAqIEBjbGFzcyBBbmFseXRpY3N+UmVwb3J0SW5zdGFuY2VcbiAqIEBwYXJhbSB7QW5hbHl0aWNzflJlcG9ydH0gcmVwb3J0IC0gUmVwb3J0XG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBSZXBvcnQgaW5zdGFuY2UgaWRcbiAqL1xudmFyIFJlcG9ydEluc3RhbmNlID0gZnVuY3Rpb24ocmVwb3J0LCBpZCkge1xuICB0aGlzLl9yZXBvcnQgPSByZXBvcnQ7XG4gIHRoaXMuX2Nvbm4gPSByZXBvcnQuX2Nvbm47XG4gIHRoaXMuaWQgPSBpZDtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgcmVwb3J0IHJlc3VsdCBhc3luY2hyb25vdXNseSBleGVjdXRlZFxuICpcbiAqIEBtZXRob2QgQW5hbHl0aWNzflJlcG9ydEluc3RhbmNlI3JldHJpZXZlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBbmFseXRpY3N+UmVwb3J0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QW5hbHl0aWNzflJlcG9ydFJlc3VsdD59XG4gKi9cblJlcG9ydEluc3RhbmNlLnByb3RvdHlwZS5yZXRyaWV2ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBjb25uID0gdGhpcy5fY29ubixcbiAgICAgIHJlcG9ydCA9IHRoaXMuX3JlcG9ydDtcbiAgdmFyIHVybCA9IFsgY29ubi5fYmFzZVVybCgpLCBcImFuYWx5dGljc1wiLCBcInJlcG9ydHNcIiwgcmVwb3J0LmlkLCBcImluc3RhbmNlc1wiLCB0aGlzLmlkIF0uam9pbignLycpO1xuICByZXR1cm4gY29ubi5yZXF1ZXN0KHVybCkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBSZXBvcnQgb2JqZWN0IGluIEFuYWx5dGljcyBBUElcbiAqXG4gKiBAcHJvdGVjdGVkXG4gKiBAY2xhc3MgQW5hbHl0aWNzflJlcG9ydFxuICogQHBhcmFtIHtDb25uZWN0aW9ufSBjb25uIENvbm5lY3Rpb25cbiAqL1xudmFyIFJlcG9ydCA9IGZ1bmN0aW9uKGNvbm4sIGlkKSB7XG4gIHRoaXMuX2Nvbm4gPSBjb25uO1xuICB0aGlzLmlkID0gaWQ7XG59O1xuXG4vKipcbiAqIERlc2NyaWJlIHJlcG9ydCBtZXRhZGF0YVxuICpcbiAqIEBtZXRob2QgQW5hbHl0aWNzflJlcG9ydCNkZXNjcmliZVxuICogQHBhcmFtIHtDYWxsYmFjay48QW5hbHl0aWNzflJlcG9ydE1ldGFkYXRhPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QW5hbHl0aWNzflJlcG9ydE1ldGFkYXRhPn1cbiAqL1xuUmVwb3J0LnByb3RvdHlwZS5kZXNjcmliZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJyZXBvcnRzXCIsIHRoaXMuaWQsIFwiZGVzY3JpYmVcIiBdLmpvaW4oJy8nKTtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdCh1cmwpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogU3lub255bSBvZiBBbmFseXRpY3N+UmVwb3J0I2Rlc3Ryb3koKVxuICpcbiAqIEBtZXRob2QgQW5hbHl0aWNzflJlcG9ydCNkZWxldGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFuYWx5dGljc35SZXBvcnRSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxBbmFseXRpY3N+UmVwb3J0UmVzdWx0Pn1cbiAqL1xuLyoqXG4gKiBTeW5vbnltIG9mIEFuYWx5dGljc35SZXBvcnQjZGVzdHJveSgpXG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+UmVwb3J0I2RlbFxuICogQHBhcmFtIHtDYWxsYmFjay48QW5hbHl0aWNzflJlcG9ydFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFuYWx5dGljc35SZXBvcnRSZXN1bHQ+fVxuICovXG4vKipcbiAqIERlc3Ryb3kgYSByZXBvcnRcbiAqXG4gKiBAbWV0aG9kIEFuYWx5dGljc35SZXBvcnQjZGVzdHJveVxuICogQHBhcmFtIHtDYWxsYmFjay48QW5hbHl0aWNzflJlcG9ydFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFuYWx5dGljc35SZXBvcnRSZXN1bHQ+fVxuICovXG5SZXBvcnQucHJvdG90eXBlW1wiZGVsZXRlXCJdID1cblJlcG9ydC5wcm90b3R5cGUuZGVsID1cblJlcG9ydC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJyZXBvcnRzXCIsIHRoaXMuaWQgXS5qb2luKCcvJyk7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Qoe21ldGhvZDogJ0RFTEVURScsIHVybDogdXJsfSkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBDbG9uZXMgYSBnaXZlbiByZXBvcnRcbiAqXG4gKiBAbWV0aG9kIEFuYWx5dGljc35SZXBvcnQjY2xvbmVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIG5ldyByZXBvcnRcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFuYWx5dGljc35SZXBvcnRSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxBbmFseXRpY3N+UmVwb3J0UmVzdWx0Pn1cbiAqL1xuUmVwb3J0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJyZXBvcnRzXCIgXS5qb2luKCcvJyk7XG4gIHVybCArPSBcIj9jbG9uZUlkPVwiICsgdGhpcy5pZDtcbiAgdmFyIGRhdGEgPSB7IHJlcG9ydE1ldGFkYXRhOiB7IG5hbWU6IG5hbWUgfSB9O1xuICB2YXIgcGFyYW1zID0geyBtZXRob2QgOiAnUE9TVCcsIHVybDogdXJsLCBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LCBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKX07XG5cbiAgdGhpcy5fY29ubi5yZXF1ZXN0KHBhcmFtcykudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBFeHBsYWluIHBsYW4gZm9yIGV4ZWN1dGluZyByZXBvcnRcbiAqXG4gKiBAbWV0aG9kIEFuYWx5dGljc35SZXBvcnQjZXhwbGFpblxuICogQHBhcmFtIHtDYWxsYmFjay48RXhwbGFpbkluZm8+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxFeHBsYWluSW5mbz59XG4gKi9cblJlcG9ydC5wcm90b3R5cGUuZXhwbGFpbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBcIi9xdWVyeS8/ZXhwbGFpbj1cIiArIHRoaXMuaWQ7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qKlxuICogUnVuIHJlcG9ydCBzeW5jaHJvbm91c2x5XG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+UmVwb3J0I2V4ZWN1dGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25zXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZGV0YWlscyAtIEZsYWcgaWYgaW5jbHVkZSBkZXRhaWwgaW4gcmVzdWx0XG4gKiBAcGFyYW0ge0FuYWx5dGljc35SZXBvcnRNZXRhZGF0YX0gb3B0aW9ucy5tZXRhZGF0YSAtIE92ZXJyaWRpbmcgcmVwb3J0IG1ldGFkYXRhXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBbmFseXRpY3N+UmVwb3J0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QW5hbHl0aWNzflJlcG9ydFJlc3VsdD59XG4gKi9cblJlcG9ydC5wcm90b3R5cGUucnVuID1cblJlcG9ydC5wcm90b3R5cGUuZXhlYyA9XG5SZXBvcnQucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjaykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKF8uaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgdmFyIHVybCA9IFsgdGhpcy5fY29ubi5fYmFzZVVybCgpLCBcImFuYWx5dGljc1wiLCBcInJlcG9ydHNcIiwgdGhpcy5pZCBdLmpvaW4oJy8nKTtcbiAgdXJsICs9IFwiP2luY2x1ZGVEZXRhaWxzPVwiICsgKG9wdGlvbnMuZGV0YWlscyA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgdmFyIHBhcmFtcyA9IHsgbWV0aG9kIDogb3B0aW9ucy5tZXRhZGF0YSA/ICdQT1NUJyA6ICdHRVQnLCB1cmwgOiB1cmwgfTtcbiAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHtcbiAgICBwYXJhbXMuaGVhZGVycyA9IHsgXCJDb250ZW50LVR5cGVcIiA6IFwiYXBwbGljYXRpb24vanNvblwiIH07XG4gICAgcGFyYW1zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLm1ldGFkYXRhKTtcbiAgfVxuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHBhcmFtcykudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuXG4vKipcbiAqIFJ1biByZXBvcnQgYXN5bmNocm9ub3VzbHlcbiAqXG4gKiBAbWV0aG9kIEFuYWx5dGljc35SZXBvcnQjZXhlY3V0ZUFzeW5jXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmRldGFpbHMgLSBGbGFnIGlmIGluY2x1ZGUgZGV0YWlsIGluIHJlc3VsdFxuICogQHBhcmFtIHtBbmFseXRpY3N+UmVwb3J0TWV0YWRhdGF9IG9wdGlvbnMubWV0YWRhdGEgLSBPdmVycmlkaW5nIHJlcG9ydCBtZXRhZGF0YVxuICogQHBhcmFtIHtDYWxsYmFjay48QW5hbHl0aWNzflJlcG9ydEluc3RhbmNlQXR0cnM+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxBbmFseXRpY3N+UmVwb3J0SW5zdGFuY2VBdHRycz59XG4gKi9cblJlcG9ydC5wcm90b3R5cGUuZXhlY3V0ZUFzeW5jID0gZnVuY3Rpb24ob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGlmIChfLmlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJyZXBvcnRzXCIsIHRoaXMuaWQsIFwiaW5zdGFuY2VzXCIgXS5qb2luKCcvJyk7XG4gIGlmIChvcHRpb25zLmRldGFpbHMpIHtcbiAgICB1cmwgKz0gXCI/aW5jbHVkZURldGFpbHM9dHJ1ZVwiO1xuICB9XG4gIHZhciBwYXJhbXMgPSB7IG1ldGhvZCA6ICdQT1NUJywgdXJsIDogdXJsLCBib2R5OiBcIlwiIH07XG4gIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7XG4gICAgcGFyYW1zLmhlYWRlcnMgPSB7IFwiQ29udGVudC1UeXBlXCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9O1xuICAgIHBhcmFtcy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5tZXRhZGF0YSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdChwYXJhbXMpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogR2V0IHJlcG9ydCBpbnN0YW5jZSBmb3Igc3BlY2lmaWVkIGluc3RhbmNlIElEXG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+UmVwb3J0I2luc3RhbmNlXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBSZXBvcnQgaW5zdGFuY2UgSURcbiAqIEByZXR1cm5zIHtBbmFseXRpY3N+UmVwb3J0SW5zdGFuY2V9XG4gKi9cblJlcG9ydC5wcm90b3R5cGUuaW5zdGFuY2UgPSBmdW5jdGlvbihpZCkge1xuICByZXR1cm4gbmV3IFJlcG9ydEluc3RhbmNlKHRoaXMsIGlkKTtcbn07XG5cbi8qKlxuICogTGlzdCByZXBvcnQgaW5zdGFuY2VzIHdoaWNoIGhhZCBiZWVuIGV4ZWN1dGVkIGFzeW5jaHJvbm91c2x5XG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+UmVwb3J0I2luc3RhbmNlc1xuICogQHBhcmFtIHtDYWxsYmFjay48QXJyYXkuPEFuYWx5dGljc35SZXBvcnRJbnN0YW5jZUF0dHJzPj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFycmF5LjxBbmFseXRpY3N+UmVwb3J0SW5zdGFuY2VBdHRycz4+fVxuICovXG5SZXBvcnQucHJvdG90eXBlLmluc3RhbmNlcyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJyZXBvcnRzXCIsIHRoaXMuaWQsIFwiaW5zdGFuY2VzXCIgXS5qb2luKCcvJyk7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIERhc2hib2FyZCBvYmplY3QgaW4gdGhlIEFuYWx5dGljcyBBUElcbiAqXG4gKiBAcHJvdGVjdGVkXG4gKiBAY2xhc3MgQW5hbHl0aWNzLURhc2hib2FyZFxuICogQHBhcmFtIHtDb25uZWN0aW9ufSBjb25uIENvbm5lY3Rpb25cbiAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIFRoZSBJZFxuICovXG5cbnZhciBEYXNoYm9hcmQgPSBmdW5jdGlvbihjb25uLCBpZCkge1xuICB0aGlzLl9jb25uID0gY29ubjtcbiAgdGhpcy5pZCA9IGlkO1xufTtcblxuLyoqXG4gKiBEZXNjcmliZSBkYXNoYm9hcmQgbWV0YWRhdGFcbiAqXG4gKiBAbWV0aG9kIEFuYWx5dGljc35EYXNoYm9hcmQjZGVzY3JpYmVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFuYWx5dGljcy1EYXNoYm9hcmRNZXRhZGF0YT59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFuYWx5dGljcy1EYXNoYm9hcmRNZXRhZGF0YT59XG4gKi9cbkRhc2hib2FyZC5wcm90b3R5cGUuZGVzY3JpYmUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgdXJsID0gWyB0aGlzLl9jb25uLl9iYXNlVXJsKCksIFwiYW5hbHl0aWNzXCIsIFwiZGFzaGJvYXJkc1wiLCB0aGlzLmlkLCBcImRlc2NyaWJlXCIgXS5qb2luKCcvJyk7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEdldCBkZXRhaWxzIGFib3V0IGRhc2hib2FyZCBjb21wb25lbnRzXG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+RGFzaGJvYXJkI2NvbXBvbmVudHNcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFuYWx5dGljcy1EYXNoYm9hcmRDb21wb25lbnRNZXRhZGF0YT59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFuYWx5dGljcy1EYXNoYm9hcmRDb21wb25lbnRNZXRhZGF0YT59XG4gKi9cbkRhc2hib2FyZC5wcm90b3R5cGUuY29tcG9uZW50cyA9IGZ1bmN0aW9uKGNvbXBvbmVudElkcywgY2FsbGJhY2spIHtcbiAgdmFyIHVybCA9IFsgdGhpcy5fY29ubi5fYmFzZVVybCgpLCBcImFuYWx5dGljc1wiLCBcImRhc2hib2FyZHNcIiwgdGhpcy5pZF0uam9pbignLycpO1xuICB2YXIgZGF0YSA9IHt9O1xuICBpZiAoXy5pc0Z1bmN0aW9uKGNvbXBvbmVudElkcykpIHtcbiAgICBjYWxsYmFjayA9IGNvbXBvbmVudElkcztcbiAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29tcG9uZW50SWRzKSkge1xuICAgIGRhdGEuY29tcG9uZW50SWRzID0gY29tcG9uZW50SWRzXG4gIH0gZWxzZSB7XG4gICAgZGF0YS5jb21wb25lbnRJZHMgPSBbXTtcbiAgICBkYXRhLmNvbXBvbmVudElkcy5wdXNoKGNvbXBvbmVudElkcyk7XG4gIH1cbiAgdmFyIHBhcmFtcyA9IHsgbWV0aG9kIDogJ1BPU1QnLCB1cmwgOiB1cmwsIGhlYWRlcnMgOiB7IFwiQ29udGVudC1UeXBlXCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LCBib2R5IDogSlNPTi5zdHJpbmdpZnkoZGF0YSl9O1xuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHBhcmFtcykudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBHZXQgZGFzaGJvYXJkIHN0YXR1c1xuICpcbiAqIEBtZXRob2QgQW5hbHl0aWNzfkRhc2hib2FyZCNzdGF0dXNcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFuYWx5dGljcy1EYXNoYm9hcmRTdGF0dXNNZXRhZGF0YT59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFuYWx5dGljcy1EYXNoYm9hcmRTdGF0dXNNZXRhZGF0YT59XG4gKi9cbkRhc2hib2FyZC5wcm90b3R5cGUuc3RhdHVzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHVybCA9IFsgdGhpcy5fY29ubi5fYmFzZVVybCgpLCBcImFuYWx5dGljc1wiLCBcImRhc2hib2FyZHNcIiwgdGhpcy5pZCwgXCJzdGF0dXNcIiBdLmpvaW4oJy8nKTtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdCh1cmwpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogUmVmcmVzaCBhIGRhc2hib2FyZFxuICpcbiAqIEBtZXRob2QgQW5hbHl0aWNzfkRhc2hib2FyZCNyZWZyZXNoXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBbmFseXRpY3MtRGFzaGJvYXJkU3RhdHVzVXJsPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QW5hbHl0aWNzLURhc2hib2FyZFN0YXR1c1VybD59XG4gKi9cbkRhc2hib2FyZC5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJkYXNoYm9hcmRzXCIsIHRoaXMuaWQgXS5qb2luKCcvJyk7XG4gIHZhciBwYXJhbXMgPSB7IG1ldGhvZCA6ICdQVVQnLCB1cmwgOiB1cmwsIGJvZHk6ICcnIH07XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QocGFyYW1zKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIENsb25lIGEgZGFzaGJvYXJkXG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+RGFzaGJvYXJkI2Nsb25lXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBbmFseXRpY3MtRGFzaGJvYXJkTWV0YWRhdGE+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxBbmFseXRpY3MtRGFzaGJvYXJkTWV0YWRhdGE+fVxuICovXG5EYXNoYm9hcmQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24obmFtZSwgZm9sZGVyaWQsIGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJkYXNoYm9hcmRzXCIgXS5qb2luKCcvJyk7XG4gIHVybCArPSBcIj9jbG9uZUlkPVwiICsgdGhpcy5pZDtcbiAgdmFyIGRhdGEgPSB7fTtcblxuICBpZiAoXy5pc09iamVjdChuYW1lKSkge1xuICAgIGRhdGEgPSBuYW1lO1xuICAgIGNhbGxiYWNrID0gZm9sZGVyaWQ7XG4gIH0gZWxzZSB7XG4gICAgZGF0YS5uYW1lID0gbmFtZTtcbiAgICBkYXRhLmZvbGRlcklkID0gZm9sZGVyaWQ7XG4gIH1cbiAgdmFyIHBhcmFtcyA9IHsgbWV0aG9kIDogJ1BPU1QnLCB1cmwgOiB1cmwsIGhlYWRlcnMgOiB7IFwiQ29udGVudC1UeXBlXCIgOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LCBib2R5IDogSlNPTi5zdHJpbmdpZnkoZGF0YSl9O1xuXG4gIHRoaXMuX2Nvbm4ucmVxdWVzdChwYXJhbXMpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogU3lub255bSBvZiBBbmFseXRpY3N+RGFzaGJvYXJkI2Rlc3Ryb3koKVxuICpcbiAqIEBtZXRob2QgQW5hbHl0aWNzfkRhc2hib2FyZCNkZWxldGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFuYWx5dGljc35EYXNoYm9hcmRSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxBbmFseXRpY3N+RGFzaGJvYXJkUmVzdWx0Pn1cbiAqL1xuLyoqXG4gKiBTeW5vbnltIG9mIEFuYWx5dGljc35EYXNoYm9hcmQjZGVzdHJveSgpXG4gKlxuICogQG1ldGhvZCBBbmFseXRpY3N+RGFzaGJvYXJkI2RlbFxuICogQHBhcmFtIHtDYWxsYmFjay48QW5hbHl0aWNzfkRhc2hib2FyZFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFuYWx5dGljc35EYXNoYm9hcmRSZXN1bHQ+fVxuICovXG4vKipcbiAqIERlc3Ryb3kgYSBkYXNoYm9hcmRcbiAqXG4gKiBAbWV0aG9kIEFuYWx5dGljc35EYXNoYm9hcmQjZGVzdHJveVxuICogQHBhcmFtIHtDYWxsYmFjay48QW5hbHl0aWNzfkRhc2hib2FyZFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFuYWx5dGljc35EYXNoYm9hcmRSZXN1bHQ+fVxuICovXG5EYXNoYm9hcmQucHJvdG90eXBlW1wiZGVsZXRlXCJdID1cbkRhc2hib2FyZC5wcm90b3R5cGUuZGVsID1cbkRhc2hib2FyZC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJkYXNoYm9hcmRzXCIsIHRoaXMuaWQgXS5qb2luKCcvJyk7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3Qoe21ldGhvZDogJ0RFTEVURScsIHVybDogdXJsfSkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBBUEkgY2xhc3MgZm9yIEFuYWx5dGljcyBBUElcbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7Q29ubmVjdGlvbn0gY29ubiBDb25uZWN0aW9uXG4gKi9cbnZhciBBbmFseXRpY3MgPSBmdW5jdGlvbihjb25uKSB7XG4gIHRoaXMuX2Nvbm4gPSBjb25uO1xufTtcblxuLyoqXG4gKiBHZXQgcmVwb3J0IG9iamVjdCBvZiBBbmFseXRpY3MgQVBJXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlkIC0gUmVwb3J0IElkXG4gKiBAcmV0dXJucyB7QW5hbHl0aWNzflJlcG9ydH1cbiAqL1xuQW5hbHl0aWNzLnByb3RvdHlwZS5yZXBvcnQgPSBmdW5jdGlvbihpZCkge1xuICByZXR1cm4gbmV3IFJlcG9ydCh0aGlzLl9jb25uLCBpZCk7XG59O1xuXG4vKipcbiAqIEdldCByZWNlbnQgcmVwb3J0IGxpc3RcbiAqXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBcnJheS48QW5hbHl0aWNzflJlcG9ydEluZm8+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QXJyYXkuPEFuYWx5dGljc35SZXBvcnRJbmZvPj59XG4gKi9cbkFuYWx5dGljcy5wcm90b3R5cGUucmVwb3J0cyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciB1cmwgPSBbIHRoaXMuX2Nvbm4uX2Jhc2VVcmwoKSwgXCJhbmFseXRpY3NcIiwgXCJyZXBvcnRzXCIgXS5qb2luKCcvJyk7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QodXJsKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEdldCBkYXNoYm9hcmQgb2JqZWN0IG9mIEFuYWx5dGljcyBBUElcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBEYXNoYm9hcmQgSWRcbiAqIEByZXR1cm5zIHtBbmFseXRpY3N+RGFzaGJvYXJkfVxuICovXG5BbmFseXRpY3MucHJvdG90eXBlLmRhc2hib2FyZCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiBuZXcgRGFzaGJvYXJkKHRoaXMuX2Nvbm4sIGlkKTtcbn07XG5cbi8qKlxuICogR2V0IHJlY2VudCBkYXNoYm9hcmQgbGlzdFxuICpcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFycmF5LjxBbmFseXRpY3N+RGFzaGJvYXJkSW5mbz4+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxBcnJheS48QW5hbHl0aWNzfkRhc2hib2FyZEluZm8+Pn1cbiAqL1xuQW5hbHl0aWNzLnByb3RvdHlwZS5kYXNoYm9hcmRzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHVybCA9IFsgdGhpcy5fY29ubi5fYmFzZVVybCgpLCBcImFuYWx5dGljc1wiLCBcImRhc2hib2FyZHNcIiBdLmpvaW4oJy8nKTtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdCh1cmwpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbmpzZm9yY2Uub24oJ2Nvbm5lY3Rpb246bmV3JywgZnVuY3Rpb24oY29ubikge1xuICBjb25uLmFuYWx5dGljcyA9IG5ldyBBbmFseXRpY3MoY29ubik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEFuYWx5dGljczsiXX0=
