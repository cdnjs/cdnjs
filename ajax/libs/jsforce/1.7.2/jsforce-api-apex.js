(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Apex = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Manages Salesforce Apex REST endpoint calls
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

'use strict';

var jsforce = window.jsforce.require('./core');

/**
 * API class for Apex REST endpoint call
 *
 * @class
 * @param {Connection} conn Connection
 */
var Apex = function(conn) {
  this._conn = conn;
};

/**
 * @private
 */
Apex.prototype._baseUrl = function() {
  return this._conn.instanceUrl + "/services/apexrest";
};

/**
 * @private
 */
Apex.prototype._createRequestParams = function(method, path, body, options) {
  var params = {
    method: method,
    url: this._baseUrl() + path
  },
  _headers = {};
  if(options && 'object' === typeof options['headers']){
    _headers = options['headers'];
  }
  if (!/^(GET|DELETE)$/i.test(method)) {
    _headers["Content-Type"] = "application/json";
  }
  params.headers = _headers;
  if (body) {
    params.body = JSON.stringify(body);
  }
  return params;
};

/**
 * Call Apex REST service in GET request
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} options - Holds headers and other meta data for the request.
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.get = function(path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  return this._conn.request(this._createRequestParams('GET', path, undefined, options)).thenCall(callback);
};

/**
 * Call Apex REST service in POST request
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Object} options - Holds headers and other meta data for the request.
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.post = function(path, body, options, callback) {
  if (typeof body === 'function') {
    callback = body;
    body = undefined;
    options = undefined;
  }
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  var params = this._createRequestParams('POST', path, body, options);
  return this._conn.request(params).thenCall(callback);
};

/**
 * Call Apex REST service in PUT request
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Object} [options] - Holds headers and other meta data for the request.
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.put = function(path, body, options, callback) {
  if (typeof body === 'function') {
    callback = body;
    body = undefined;
    options = undefined;
  }
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  var params = this._createRequestParams('PUT', path, body, options);
  return this._conn.request(params).thenCall(callback);
};

/**
 * Call Apex REST service in PATCH request
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Object} [options] - Holds headers and other meta data for the request.
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.patch = function(path, body, options, callback) {
  if (typeof body === 'function') {
    callback = body;
    body = undefined;
    options = undefined;
  }
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  var params = this._createRequestParams('PATCH', path, body, options);
  return this._conn.request(params).thenCall(callback);
};

/**
 * Synonym of Apex#delete()
 *
 * @method Apex#del
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
/**
 * Call Apex REST service in DELETE request
 *
 * @method Apex#delete
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Object} [options] - Holds headers and other meta data for the request.
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.del =
  Apex.prototype["delete"] = function(path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  return this._conn.request(this._createRequestParams('DELETE', path, undefined, options)).thenCall(callback);
};


/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
jsforce.on('connection:new', function(conn) {
  conn.apex = new Apex(conn);
});


module.exports = Apex;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL2FwZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBmaWxlIE1hbmFnZXMgU2FsZXNmb3JjZSBBcGV4IFJFU1QgZW5kcG9pbnQgY2FsbHNcbiAqIEBhdXRob3IgU2hpbmljaGkgVG9taXRhIDxzaGluaWNoaS50b21pdGFAZ21haWwuY29tPlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGpzZm9yY2UgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL2NvcmUnKTtcblxuLyoqXG4gKiBBUEkgY2xhc3MgZm9yIEFwZXggUkVTVCBlbmRwb2ludCBjYWxsXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IGNvbm4gQ29ubmVjdGlvblxuICovXG52YXIgQXBleCA9IGZ1bmN0aW9uKGNvbm4pIHtcbiAgdGhpcy5fY29ubiA9IGNvbm47XG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbkFwZXgucHJvdG90eXBlLl9iYXNlVXJsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9jb25uLmluc3RhbmNlVXJsICsgXCIvc2VydmljZXMvYXBleHJlc3RcIjtcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuQXBleC5wcm90b3R5cGUuX2NyZWF0ZVJlcXVlc3RQYXJhbXMgPSBmdW5jdGlvbihtZXRob2QsIHBhdGgsIGJvZHksIG9wdGlvbnMpIHtcbiAgdmFyIHBhcmFtcyA9IHtcbiAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICB1cmw6IHRoaXMuX2Jhc2VVcmwoKSArIHBhdGhcbiAgfSxcbiAgX2hlYWRlcnMgPSB7fTtcbiAgaWYob3B0aW9ucyAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9wdGlvbnNbJ2hlYWRlcnMnXSl7XG4gICAgX2hlYWRlcnMgPSBvcHRpb25zWydoZWFkZXJzJ107XG4gIH1cbiAgaWYgKCEvXihHRVR8REVMRVRFKSQvaS50ZXN0KG1ldGhvZCkpIHtcbiAgICBfaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuICB9XG4gIHBhcmFtcy5oZWFkZXJzID0gX2hlYWRlcnM7XG4gIGlmIChib2R5KSB7XG4gICAgcGFyYW1zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgfVxuICByZXR1cm4gcGFyYW1zO1xufTtcblxuLyoqXG4gKiBDYWxsIEFwZXggUkVTVCBzZXJ2aWNlIGluIEdFVCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggLSBVUkwgcGF0aCB0byBBcGV4IFJFU1Qgc2VydmljZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBIb2xkcyBoZWFkZXJzIGFuZCBvdGhlciBtZXRhIGRhdGEgZm9yIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtDYWxsYmFjay48T2JqZWN0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48T2JqZWN0Pn1cbiAqL1xuQXBleC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24ocGF0aCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdCh0aGlzLl9jcmVhdGVSZXF1ZXN0UGFyYW1zKCdHRVQnLCBwYXRoLCB1bmRlZmluZWQsIG9wdGlvbnMpKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIENhbGwgQXBleCBSRVNUIHNlcnZpY2UgaW4gUE9TVCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggLSBVUkwgcGF0aCB0byBBcGV4IFJFU1Qgc2VydmljZVxuICogQHBhcmFtIHtPYmplY3R9IFtib2R5XSAtIFJlcXVlc3QgYm9keVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBIb2xkcyBoZWFkZXJzIGFuZCBvdGhlciBtZXRhIGRhdGEgZm9yIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtDYWxsYmFjay48T2JqZWN0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48T2JqZWN0Pn1cbiAqL1xuQXBleC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uKHBhdGgsIGJvZHksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgYm9keSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYm9keTtcbiAgICBib2R5ID0gdW5kZWZpbmVkO1xuICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIH1cbiAgdmFyIHBhcmFtcyA9IHRoaXMuX2NyZWF0ZVJlcXVlc3RQYXJhbXMoJ1BPU1QnLCBwYXRoLCBib2R5LCBvcHRpb25zKTtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdChwYXJhbXMpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogQ2FsbCBBcGV4IFJFU1Qgc2VydmljZSBpbiBQVVQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gVVJMIHBhdGggdG8gQXBleCBSRVNUIHNlcnZpY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV0gLSBSZXF1ZXN0IGJvZHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBIb2xkcyBoZWFkZXJzIGFuZCBvdGhlciBtZXRhIGRhdGEgZm9yIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtDYWxsYmFjay48T2JqZWN0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48T2JqZWN0Pn1cbiAqL1xuQXBleC5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24ocGF0aCwgYm9keSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBib2R5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBib2R5O1xuICAgIGJvZHkgPSB1bmRlZmluZWQ7XG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgfVxuICB2YXIgcGFyYW1zID0gdGhpcy5fY3JlYXRlUmVxdWVzdFBhcmFtcygnUFVUJywgcGF0aCwgYm9keSwgb3B0aW9ucyk7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QocGFyYW1zKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIENhbGwgQXBleCBSRVNUIHNlcnZpY2UgaW4gUEFUQ0ggcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gVVJMIHBhdGggdG8gQXBleCBSRVNUIHNlcnZpY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV0gLSBSZXF1ZXN0IGJvZHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBIb2xkcyBoZWFkZXJzIGFuZCBvdGhlciBtZXRhIGRhdGEgZm9yIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtDYWxsYmFjay48T2JqZWN0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48T2JqZWN0Pn1cbiAqL1xuQXBleC5wcm90b3R5cGUucGF0Y2ggPSBmdW5jdGlvbihwYXRoLCBib2R5LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGJvZHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGJvZHk7XG4gICAgYm9keSA9IHVuZGVmaW5lZDtcbiAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICB9XG4gIHZhciBwYXJhbXMgPSB0aGlzLl9jcmVhdGVSZXF1ZXN0UGFyYW1zKCdQQVRDSCcsIHBhdGgsIGJvZHksIG9wdGlvbnMpO1xuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHBhcmFtcykudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBTeW5vbnltIG9mIEFwZXgjZGVsZXRlKClcbiAqXG4gKiBAbWV0aG9kIEFwZXgjZGVsXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggLSBVUkwgcGF0aCB0byBBcGV4IFJFU1Qgc2VydmljZVxuICogQHBhcmFtIHtPYmplY3R9IFtib2R5XSAtIFJlcXVlc3QgYm9keVxuICogQHBhcmFtIHtDYWxsYmFjay48T2JqZWN0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48T2JqZWN0Pn1cbiAqL1xuLyoqXG4gKiBDYWxsIEFwZXggUkVTVCBzZXJ2aWNlIGluIERFTEVURSByZXF1ZXN0XG4gKlxuICogQG1ldGhvZCBBcGV4I2RlbGV0ZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gVVJMIHBhdGggdG8gQXBleCBSRVNUIHNlcnZpY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV0gLSBSZXF1ZXN0IGJvZHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBIb2xkcyBoZWFkZXJzIGFuZCBvdGhlciBtZXRhIGRhdGEgZm9yIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtDYWxsYmFjay48T2JqZWN0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48T2JqZWN0Pn1cbiAqL1xuQXBleC5wcm90b3R5cGUuZGVsID1cbiAgQXBleC5wcm90b3R5cGVbXCJkZWxldGVcIl0gPSBmdW5jdGlvbihwYXRoLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHRoaXMuX2NyZWF0ZVJlcXVlc3RQYXJhbXMoJ0RFTEVURScsIHBhdGgsIHVuZGVmaW5lZCwgb3B0aW9ucykpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKlxuICogUmVnaXN0ZXIgaG9vayBpbiBjb25uZWN0aW9uIGluc3RhbnRpYXRpb24gZm9yIGR5bmFtaWNhbGx5IGFkZGluZyB0aGlzIEFQSSBtb2R1bGUgZmVhdHVyZXNcbiAqL1xuanNmb3JjZS5vbignY29ubmVjdGlvbjpuZXcnLCBmdW5jdGlvbihjb25uKSB7XG4gIGNvbm4uYXBleCA9IG5ldyBBcGV4KGNvbm4pO1xufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBBcGV4O1xuIl19
