(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Apex = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
/**
 * Call Apex REST service in DELETE request
 *
 * @method Apex#delete
 *
 * @param {String} path - URL path to Apex REST service
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL2FwZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBAZmlsZSBNYW5hZ2VzIFNhbGVzZm9yY2UgQXBleCBSRVNUIGVuZHBvaW50IGNhbGxzXG4gKiBAYXV0aG9yIFNoaW5pY2hpIFRvbWl0YSA8c2hpbmljaGkudG9taXRhQGdtYWlsLmNvbT5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBqc2ZvcmNlID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnLi9jb3JlJyk7XG5cbi8qKlxuICogQVBJIGNsYXNzIGZvciBBcGV4IFJFU1QgZW5kcG9pbnQgY2FsbFxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtDb25uZWN0aW9ufSBjb25uIENvbm5lY3Rpb25cbiAqL1xudmFyIEFwZXggPSBmdW5jdGlvbihjb25uKSB7XG4gIHRoaXMuX2Nvbm4gPSBjb25uO1xufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5BcGV4LnByb3RvdHlwZS5fYmFzZVVybCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fY29ubi5pbnN0YW5jZVVybCArIFwiL3NlcnZpY2VzL2FwZXhyZXN0XCI7XG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbkFwZXgucHJvdG90eXBlLl9jcmVhdGVSZXF1ZXN0UGFyYW1zID0gZnVuY3Rpb24obWV0aG9kLCBwYXRoLCBib2R5LCBvcHRpb25zKSB7XG4gIHZhciBwYXJhbXMgPSB7XG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgdXJsOiB0aGlzLl9iYXNlVXJsKCkgKyBwYXRoXG4gIH0sXG4gIF9oZWFkZXJzID0ge307XG4gIGlmKG9wdGlvbnMgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvcHRpb25zWydoZWFkZXJzJ10pe1xuICAgIF9oZWFkZXJzID0gb3B0aW9uc1snaGVhZGVycyddO1xuICB9XG4gIGlmICghL14oR0VUfERFTEVURSkkL2kudGVzdChtZXRob2QpKSB7XG4gICAgX2hlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbiAgfVxuICBwYXJhbXMuaGVhZGVycyA9IF9oZWFkZXJzO1xuICBpZiAoYm9keSkge1xuICAgIHBhcmFtcy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gIH1cbiAgcmV0dXJuIHBhcmFtcztcbn07XG5cbi8qKlxuICogQ2FsbCBBcGV4IFJFU1Qgc2VydmljZSBpbiBHRVQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gVVJMIHBhdGggdG8gQXBleCBSRVNUIHNlcnZpY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gSG9sZHMgaGVhZGVycyBhbmQgb3RoZXIgbWV0YSBkYXRhIGZvciB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7Q2FsbGJhY2suPE9iamVjdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPE9iamVjdD59XG4gKi9cbkFwZXgucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKHBhdGgsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QodGhpcy5fY3JlYXRlUmVxdWVzdFBhcmFtcygnR0VUJywgcGF0aCwgdW5kZWZpbmVkLCBvcHRpb25zKSkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBDYWxsIEFwZXggUkVTVCBzZXJ2aWNlIGluIFBPU1QgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gVVJMIHBhdGggdG8gQXBleCBSRVNUIHNlcnZpY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV0gLSBSZXF1ZXN0IGJvZHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gSG9sZHMgaGVhZGVycyBhbmQgb3RoZXIgbWV0YSBkYXRhIGZvciB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7Q2FsbGJhY2suPE9iamVjdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPE9iamVjdD59XG4gKi9cbkFwZXgucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbihwYXRoLCBib2R5LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGJvZHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGJvZHk7XG4gICAgYm9keSA9IHVuZGVmaW5lZDtcbiAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICB9XG4gIHZhciBwYXJhbXMgPSB0aGlzLl9jcmVhdGVSZXF1ZXN0UGFyYW1zKCdQT1NUJywgcGF0aCwgYm9keSwgb3B0aW9ucyk7XG4gIHJldHVybiB0aGlzLl9jb25uLnJlcXVlc3QocGFyYW1zKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIENhbGwgQXBleCBSRVNUIHNlcnZpY2UgaW4gUFVUIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCAtIFVSTCBwYXRoIHRvIEFwZXggUkVTVCBzZXJ2aWNlXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldIC0gUmVxdWVzdCBib2R5XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gSG9sZHMgaGVhZGVycyBhbmQgb3RoZXIgbWV0YSBkYXRhIGZvciB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7Q2FsbGJhY2suPE9iamVjdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPE9iamVjdD59XG4gKi9cbkFwZXgucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uKHBhdGgsIGJvZHksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgYm9keSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYm9keTtcbiAgICBib2R5ID0gdW5kZWZpbmVkO1xuICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIH1cbiAgdmFyIHBhcmFtcyA9IHRoaXMuX2NyZWF0ZVJlcXVlc3RQYXJhbXMoJ1BVVCcsIHBhdGgsIGJvZHksIG9wdGlvbnMpO1xuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHBhcmFtcykudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBDYWxsIEFwZXggUkVTVCBzZXJ2aWNlIGluIFBBVENIIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCAtIFVSTCBwYXRoIHRvIEFwZXggUkVTVCBzZXJ2aWNlXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldIC0gUmVxdWVzdCBib2R5XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gSG9sZHMgaGVhZGVycyBhbmQgb3RoZXIgbWV0YSBkYXRhIGZvciB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7Q2FsbGJhY2suPE9iamVjdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPE9iamVjdD59XG4gKi9cbkFwZXgucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24ocGF0aCwgYm9keSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBib2R5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBib2R5O1xuICAgIGJvZHkgPSB1bmRlZmluZWQ7XG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgfVxuICB2YXIgcGFyYW1zID0gdGhpcy5fY3JlYXRlUmVxdWVzdFBhcmFtcygnUEFUQ0gnLCBwYXRoLCBib2R5LCBvcHRpb25zKTtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdChwYXJhbXMpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogU3lub255bSBvZiBBcGV4I2RlbGV0ZSgpXG4gKlxuICogQG1ldGhvZCBBcGV4I2RlbFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gVVJMIHBhdGggdG8gQXBleCBSRVNUIHNlcnZpY2VcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPE9iamVjdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPE9iamVjdD59XG4gKi9cbi8qKlxuICogQ2FsbCBBcGV4IFJFU1Qgc2VydmljZSBpbiBERUxFVEUgcmVxdWVzdFxuICpcbiAqIEBtZXRob2QgQXBleCNkZWxldGVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCAtIFVSTCBwYXRoIHRvIEFwZXggUkVTVCBzZXJ2aWNlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gSG9sZHMgaGVhZGVycyBhbmQgb3RoZXIgbWV0YSBkYXRhIGZvciB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7Q2FsbGJhY2suPE9iamVjdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPE9iamVjdD59XG4gKi9cbkFwZXgucHJvdG90eXBlLmRlbCA9XG4gIEFwZXgucHJvdG90eXBlW1wiZGVsZXRlXCJdID0gZnVuY3Rpb24ocGF0aCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdCh0aGlzLl9jcmVhdGVSZXF1ZXN0UGFyYW1zKCdERUxFVEUnLCBwYXRoLCB1bmRlZmluZWQsIG9wdGlvbnMpKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbmpzZm9yY2Uub24oJ2Nvbm5lY3Rpb246bmV3JywgZnVuY3Rpb24oY29ubikge1xuICBjb25uLmFwZXggPSBuZXcgQXBleChjb25uKTtcbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQXBleDtcbiJdfQ==
