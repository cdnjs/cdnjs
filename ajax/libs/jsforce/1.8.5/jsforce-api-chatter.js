(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Chatter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Manages Salesforce Chatter REST API calls
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

'use strict';

var inherits = window.jsforce.require('inherits'),
    _       = window.jsforce.require('lodash/core'),
    jsforce = window.jsforce.require('./core'),
    Promise = window.jsforce.require('./promise');

/**
 * API class for Chatter REST API call
 *
 * @class
 * @param {Connection} conn Connection
 */
var Chatter = module.exports = function(conn) {
  this._conn = conn;
};

/**
 * Sending request to API endpoint
 * @private
 */
Chatter.prototype._request = function(params, callback) {
  if (/^(put|post|patch)$/i.test(params.method)) {
    if (_.isObject(params.body)) {
      params.headers = {
        "Content-Type": "application/json"
      };
      params.body = JSON.stringify(params.body);
    }
  }
  params.url = this._normalizeUrl(params.url);
  return this._conn.request(params, callback);
};

/**
 * Convert path to site root relative url
 * @private
 */
Chatter.prototype._normalizeUrl = function(url) {
  if (url.indexOf('/chatter/') === 0 || url.indexOf('/connect/') === 0) {
    return '/services/data/v' + this._conn.version + url;
  } else if (/^\/v[\d]+\.[\d]+\//.test(url)) {
    return '/services/data' + url;
  } else if (url.indexOf('/services/') !== 0 && url[0] === '/') {
    return '/services/data/v' + this._conn.version + '/chatter' + url;
  } else {
    return url;
  }
};

/**
 * @typedef {Object} Chatter~RequestParams
 * @prop {String} method - HTTP method
 * @prop {String} url - Resource URL
 * @prop {String} [body] - HTTP body (in POST/PUT/PATCH methods)
 */

/**
 * @typedef {Object} Chatter~RequestResult
 */

/**
 * Make a request for chatter API resource
 *
 * @param {Chatter~RequestParams} params - Paramters representing HTTP request
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback func
 * @returns {Chatter~Request}
 */
Chatter.prototype.request = function(params, callback) {
  return new Request(this, params).thenCall(callback);
};

/**
 * Make a resource request to chatter API
 *
 * @param {String} url - Resource URL
 * @param {Object} [queryParams] - Query parameters (in hash object)
 * @returns {Chatter~Resource}
 */
Chatter.prototype.resource = function(url, queryParams) {
  return new Resource(this, url, queryParams);
};

/**
 * @typedef {Object} Chatter~BatchRequestResult
 * @prop {Boolean} hasError - Flag if the batch has one or more errors
 * @prop {Array.<Object>} results - Batch request results in array
 * @prop {Number} results.statusCode - HTTP response status code
 * @prop {Chatter~RequestResult} results.result - Parsed HTTP response body
 */

/**
 * Make a batch request to chatter API
 *
 * @params {Array.<Chatter~Request>} requests - Chatter API requests
 * @param {Callback.<Chatter~BatchRequestResult>} [callback] - Callback func
 * @returns {Promise.<Chatter~BatchRequestResult>}
 */
Chatter.prototype.batch = function(requests, callback) {
  var self = this;
  var batchRequests = [], batchDeferreds = [];
  _.forEach(requests, function(request) {
    var deferred = Promise.defer();
    request._promise = deferred.promise;
    batchRequests.push(request.batchParams());
    batchDeferreds.push(deferred);
  });
  var params = {
    method: 'POST',
    url: this._normalizeUrl('/connect/batch'),
    body: {
      batchRequests: batchRequests
    }
  };
  return this.request(params).then(function(res) {
    _.forEach(res.results, function(result, i) {
      var deferred = batchDeferreds[i];
      if (result.statusCode >= 400) {
        deferred.reject(result.result);
      } else {
        deferred.resolve(result.result);
      }
    });
    return res;
  }).thenCall(callback);
};


/*--------------------------------------------*/
/**
 * A class representing chatter API request
 *
 * @protected
 * @class Chatter~Request
 * @implements {Promise.<Chatter~RequestResult>}
 * @param {Chatter} chatter - Chatter API object
 * @param {Chatter~RequestParams} params - Paramters representing HTTP request
 */
var Request = function(chatter, params) {
  this._chatter = chatter;
  this._params = params;
  this._promise = null;
};

/**
 * @typedef {Object} Chatter~BatchRequestParams
 * @prop {String} method - HTTP method
 * @prop {String} url - Resource URL
 * @prop {String} [richInput] - HTTP body (in POST/PUT/PATCH methods)
 */

/**
 * Retrieve parameters in batch request form
 *
 * @method Chatter~Request#batchParams
 * @returns {Chatter~BatchRequestParams}
 */
Request.prototype.batchParams = function() {
  var params = this._params;
  var batchParams = {
    method: params.method,
    url: this._chatter._normalizeUrl(params.url)
  };
  if (this._params.body) {
    batchParams.richInput = this._params.body;
  }
  return batchParams;
};

/**
 * Retrieve parameters in batch request form
 *
 * @method Chatter~Request#promise
 * @returns {Promise.<Chatter~RequestResult>}
 */
Request.prototype.promise = function() {
  return this._promise || this._chatter._request(this._params);
};

/**
 * Returns Node.js Stream object for request
 *
 * @method Chatter~Request#stream
 * @returns {stream.Stream}
 */
Request.prototype.stream = function() {
  return this._chatter._request(this._params).stream();
};

/**
 * Promise/A+ interface
 * http://promises-aplus.github.io/promises-spec/
 *
 * Delegate to deferred promise, return promise instance for batch result
 *
 * @method Chatter~Request#then
 */
Request.prototype.then = function(onResolve, onReject) {
  return this.promise().then(onResolve, onReject);
};

/**
 * Promise/A+ extension
 * Call "then" using given node-style callback function
 *
 * @method Chatter~Request#thenCall
 */
Request.prototype.thenCall = function(callback) {
  return _.isFunction(callback) ? this.promise().thenCall(callback) : this;
};


/*--------------------------------------------*/
/**
 * A class representing chatter API resource
 *
 * @protected
 * @class Chatter~Resource
 * @extends Chatter~Request
 * @param {Chatter} chatter - Chatter API object
 * @param {String} url - Resource URL
 * @param {Object} [queryParams] - Query parameters (in hash object)
 */
var Resource = function(chatter, url, queryParams) {
  if (queryParams) {
    var qstring = _.map(_.keys(queryParams), function(name) {
      return name + "=" + encodeURIComponent(queryParams[name]);
    }).join('&');
    url += (url.indexOf('?') > 0 ? '&' : '?') + qstring;
  }
  Resource.super_.call(this, chatter, { method: 'GET', url: url });
  this._url = url;
};

inherits(Resource, Request);

/**
 * Create a new resource
 *
 * @method Chatter~Resource#create
 * @param {Object} data - Data to newly post
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
Resource.prototype.create = function(data, callback) {
  return this._chatter.request({
    method: 'POST',
    url: this._url,
    body: data
  }).thenCall(callback);
};

/**
 * Retrieve resource content
 *
 * @method Chatter~Resource#retrieve
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
Resource.prototype.retrieve = function(callback) {
  return this.thenCall(callback);
};

/**
 * Update specified resource
 *
 * @method Chatter~Resource#update
 * @param {Obejct} data - Data to update
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
Resource.prototype.update = function(data, callback) {
  return this._chatter.request({
    method: 'POST',
    url: this._url,
    body: data
  }).thenCall(callback);
};

/**
 * Synonym of Resource#delete()
 *
 * @method Chatter~Resource#del
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
/**
 * Delete specified resource
 *
 * @method Chatter~Resource#delete
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
Resource.prototype.del =
Resource.prototype["delete"] = function(callback) {
  return this._chatter.request({
    method: 'DELETE',
    url: this._url
  }).thenCall(callback);
};


/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
jsforce.on('connection:new', function(conn) {
  conn.chatter = new Chatter(conn);
});

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL2NoYXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZmlsZSBNYW5hZ2VzIFNhbGVzZm9yY2UgQ2hhdHRlciBSRVNUIEFQSSBjYWxsc1xuICogQGF1dGhvciBTaGluaWNoaSBUb21pdGEgPHNoaW5pY2hpLnRvbWl0YUBnbWFpbC5jb20+XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdpbmhlcml0cycpLFxuICAgIF8gICAgICAgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdsb2Rhc2gvY29yZScpLFxuICAgIGpzZm9yY2UgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL2NvcmUnKSxcbiAgICBQcm9taXNlID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnLi9wcm9taXNlJyk7XG5cbi8qKlxuICogQVBJIGNsYXNzIGZvciBDaGF0dGVyIFJFU1QgQVBJIGNhbGxcbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7Q29ubmVjdGlvbn0gY29ubiBDb25uZWN0aW9uXG4gKi9cbnZhciBDaGF0dGVyID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb25uKSB7XG4gIHRoaXMuX2Nvbm4gPSBjb25uO1xufTtcblxuLyoqXG4gKiBTZW5kaW5nIHJlcXVlc3QgdG8gQVBJIGVuZHBvaW50XG4gKiBAcHJpdmF0ZVxuICovXG5DaGF0dGVyLnByb3RvdHlwZS5fcmVxdWVzdCA9IGZ1bmN0aW9uKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgaWYgKC9eKHB1dHxwb3N0fHBhdGNoKSQvaS50ZXN0KHBhcmFtcy5tZXRob2QpKSB7XG4gICAgaWYgKF8uaXNPYmplY3QocGFyYW1zLmJvZHkpKSB7XG4gICAgICBwYXJhbXMuaGVhZGVycyA9IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH07XG4gICAgICBwYXJhbXMuYm9keSA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcy5ib2R5KTtcbiAgICB9XG4gIH1cbiAgcGFyYW1zLnVybCA9IHRoaXMuX25vcm1hbGl6ZVVybChwYXJhbXMudXJsKTtcbiAgcmV0dXJuIHRoaXMuX2Nvbm4ucmVxdWVzdChwYXJhbXMsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogQ29udmVydCBwYXRoIHRvIHNpdGUgcm9vdCByZWxhdGl2ZSB1cmxcbiAqIEBwcml2YXRlXG4gKi9cbkNoYXR0ZXIucHJvdG90eXBlLl9ub3JtYWxpemVVcmwgPSBmdW5jdGlvbih1cmwpIHtcbiAgaWYgKHVybC5pbmRleE9mKCcvY2hhdHRlci8nKSA9PT0gMCB8fCB1cmwuaW5kZXhPZignL2Nvbm5lY3QvJykgPT09IDApIHtcbiAgICByZXR1cm4gJy9zZXJ2aWNlcy9kYXRhL3YnICsgdGhpcy5fY29ubi52ZXJzaW9uICsgdXJsO1xuICB9IGVsc2UgaWYgKC9eXFwvdltcXGRdK1xcLltcXGRdK1xcLy8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuICcvc2VydmljZXMvZGF0YScgKyB1cmw7XG4gIH0gZWxzZSBpZiAodXJsLmluZGV4T2YoJy9zZXJ2aWNlcy8nKSAhPT0gMCAmJiB1cmxbMF0gPT09ICcvJykge1xuICAgIHJldHVybiAnL3NlcnZpY2VzL2RhdGEvdicgKyB0aGlzLl9jb25uLnZlcnNpb24gKyAnL2NoYXR0ZXInICsgdXJsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ2hhdHRlcn5SZXF1ZXN0UGFyYW1zXG4gKiBAcHJvcCB7U3RyaW5nfSBtZXRob2QgLSBIVFRQIG1ldGhvZFxuICogQHByb3Age1N0cmluZ30gdXJsIC0gUmVzb3VyY2UgVVJMXG4gKiBAcHJvcCB7U3RyaW5nfSBbYm9keV0gLSBIVFRQIGJvZHkgKGluIFBPU1QvUFVUL1BBVENIIG1ldGhvZHMpXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDaGF0dGVyflJlcXVlc3RSZXN1bHRcbiAqL1xuXG4vKipcbiAqIE1ha2UgYSByZXF1ZXN0IGZvciBjaGF0dGVyIEFQSSByZXNvdXJjZVxuICpcbiAqIEBwYXJhbSB7Q2hhdHRlcn5SZXF1ZXN0UGFyYW1zfSBwYXJhbXMgLSBQYXJhbXRlcnMgcmVwcmVzZW50aW5nIEhUVFAgcmVxdWVzdFxuICogQHBhcmFtIHtDYWxsYmFjay48Q2hhdHRlcn5SZXF1ZXN0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmNcbiAqIEByZXR1cm5zIHtDaGF0dGVyflJlcXVlc3R9XG4gKi9cbkNoYXR0ZXIucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCBwYXJhbXMpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogTWFrZSBhIHJlc291cmNlIHJlcXVlc3QgdG8gY2hhdHRlciBBUElcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gUmVzb3VyY2UgVVJMXG4gKiBAcGFyYW0ge09iamVjdH0gW3F1ZXJ5UGFyYW1zXSAtIFF1ZXJ5IHBhcmFtZXRlcnMgKGluIGhhc2ggb2JqZWN0KVxuICogQHJldHVybnMge0NoYXR0ZXJ+UmVzb3VyY2V9XG4gKi9cbkNoYXR0ZXIucHJvdG90eXBlLnJlc291cmNlID0gZnVuY3Rpb24odXJsLCBxdWVyeVBhcmFtcykge1xuICByZXR1cm4gbmV3IFJlc291cmNlKHRoaXMsIHVybCwgcXVlcnlQYXJhbXMpO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDaGF0dGVyfkJhdGNoUmVxdWVzdFJlc3VsdFxuICogQHByb3Age0Jvb2xlYW59IGhhc0Vycm9yIC0gRmxhZyBpZiB0aGUgYmF0Y2ggaGFzIG9uZSBvciBtb3JlIGVycm9yc1xuICogQHByb3Age0FycmF5LjxPYmplY3Q+fSByZXN1bHRzIC0gQmF0Y2ggcmVxdWVzdCByZXN1bHRzIGluIGFycmF5XG4gKiBAcHJvcCB7TnVtYmVyfSByZXN1bHRzLnN0YXR1c0NvZGUgLSBIVFRQIHJlc3BvbnNlIHN0YXR1cyBjb2RlXG4gKiBAcHJvcCB7Q2hhdHRlcn5SZXF1ZXN0UmVzdWx0fSByZXN1bHRzLnJlc3VsdCAtIFBhcnNlZCBIVFRQIHJlc3BvbnNlIGJvZHlcbiAqL1xuXG4vKipcbiAqIE1ha2UgYSBiYXRjaCByZXF1ZXN0IHRvIGNoYXR0ZXIgQVBJXG4gKlxuICogQHBhcmFtcyB7QXJyYXkuPENoYXR0ZXJ+UmVxdWVzdD59IHJlcXVlc3RzIC0gQ2hhdHRlciBBUEkgcmVxdWVzdHNcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPENoYXR0ZXJ+QmF0Y2hSZXF1ZXN0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmNcbiAqIEByZXR1cm5zIHtQcm9taXNlLjxDaGF0dGVyfkJhdGNoUmVxdWVzdFJlc3VsdD59XG4gKi9cbkNoYXR0ZXIucHJvdG90eXBlLmJhdGNoID0gZnVuY3Rpb24ocmVxdWVzdHMsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGJhdGNoUmVxdWVzdHMgPSBbXSwgYmF0Y2hEZWZlcnJlZHMgPSBbXTtcbiAgXy5mb3JFYWNoKHJlcXVlc3RzLCBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgdmFyIGRlZmVycmVkID0gUHJvbWlzZS5kZWZlcigpO1xuICAgIHJlcXVlc3QuX3Byb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlO1xuICAgIGJhdGNoUmVxdWVzdHMucHVzaChyZXF1ZXN0LmJhdGNoUGFyYW1zKCkpO1xuICAgIGJhdGNoRGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuICB9KTtcbiAgdmFyIHBhcmFtcyA9IHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6IHRoaXMuX25vcm1hbGl6ZVVybCgnL2Nvbm5lY3QvYmF0Y2gnKSxcbiAgICBib2R5OiB7XG4gICAgICBiYXRjaFJlcXVlc3RzOiBiYXRjaFJlcXVlc3RzXG4gICAgfVxuICB9O1xuICByZXR1cm4gdGhpcy5yZXF1ZXN0KHBhcmFtcykudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICBfLmZvckVhY2gocmVzLnJlc3VsdHMsIGZ1bmN0aW9uKHJlc3VsdCwgaSkge1xuICAgICAgdmFyIGRlZmVycmVkID0gYmF0Y2hEZWZlcnJlZHNbaV07XG4gICAgICBpZiAocmVzdWx0LnN0YXR1c0NvZGUgPj0gNDAwKSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChyZXN1bHQucmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRpbmcgY2hhdHRlciBBUEkgcmVxdWVzdFxuICpcbiAqIEBwcm90ZWN0ZWRcbiAqIEBjbGFzcyBDaGF0dGVyflJlcXVlc3RcbiAqIEBpbXBsZW1lbnRzIHtQcm9taXNlLjxDaGF0dGVyflJlcXVlc3RSZXN1bHQ+fVxuICogQHBhcmFtIHtDaGF0dGVyfSBjaGF0dGVyIC0gQ2hhdHRlciBBUEkgb2JqZWN0XG4gKiBAcGFyYW0ge0NoYXR0ZXJ+UmVxdWVzdFBhcmFtc30gcGFyYW1zIC0gUGFyYW10ZXJzIHJlcHJlc2VudGluZyBIVFRQIHJlcXVlc3RcbiAqL1xudmFyIFJlcXVlc3QgPSBmdW5jdGlvbihjaGF0dGVyLCBwYXJhbXMpIHtcbiAgdGhpcy5fY2hhdHRlciA9IGNoYXR0ZXI7XG4gIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcbiAgdGhpcy5fcHJvbWlzZSA9IG51bGw7XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENoYXR0ZXJ+QmF0Y2hSZXF1ZXN0UGFyYW1zXG4gKiBAcHJvcCB7U3RyaW5nfSBtZXRob2QgLSBIVFRQIG1ldGhvZFxuICogQHByb3Age1N0cmluZ30gdXJsIC0gUmVzb3VyY2UgVVJMXG4gKiBAcHJvcCB7U3RyaW5nfSBbcmljaElucHV0XSAtIEhUVFAgYm9keSAoaW4gUE9TVC9QVVQvUEFUQ0ggbWV0aG9kcylcbiAqL1xuXG4vKipcbiAqIFJldHJpZXZlIHBhcmFtZXRlcnMgaW4gYmF0Y2ggcmVxdWVzdCBmb3JtXG4gKlxuICogQG1ldGhvZCBDaGF0dGVyflJlcXVlc3QjYmF0Y2hQYXJhbXNcbiAqIEByZXR1cm5zIHtDaGF0dGVyfkJhdGNoUmVxdWVzdFBhcmFtc31cbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUuYmF0Y2hQYXJhbXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhcmFtcyA9IHRoaXMuX3BhcmFtcztcbiAgdmFyIGJhdGNoUGFyYW1zID0ge1xuICAgIG1ldGhvZDogcGFyYW1zLm1ldGhvZCxcbiAgICB1cmw6IHRoaXMuX2NoYXR0ZXIuX25vcm1hbGl6ZVVybChwYXJhbXMudXJsKVxuICB9O1xuICBpZiAodGhpcy5fcGFyYW1zLmJvZHkpIHtcbiAgICBiYXRjaFBhcmFtcy5yaWNoSW5wdXQgPSB0aGlzLl9wYXJhbXMuYm9keTtcbiAgfVxuICByZXR1cm4gYmF0Y2hQYXJhbXM7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIHBhcmFtZXRlcnMgaW4gYmF0Y2ggcmVxdWVzdCBmb3JtXG4gKlxuICogQG1ldGhvZCBDaGF0dGVyflJlcXVlc3QjcHJvbWlzZVxuICogQHJldHVybnMge1Byb21pc2UuPENoYXR0ZXJ+UmVxdWVzdFJlc3VsdD59XG4gKi9cblJlcXVlc3QucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX3Byb21pc2UgfHwgdGhpcy5fY2hhdHRlci5fcmVxdWVzdCh0aGlzLl9wYXJhbXMpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIE5vZGUuanMgU3RyZWFtIG9iamVjdCBmb3IgcmVxdWVzdFxuICpcbiAqIEBtZXRob2QgQ2hhdHRlcn5SZXF1ZXN0I3N0cmVhbVxuICogQHJldHVybnMge3N0cmVhbS5TdHJlYW19XG4gKi9cblJlcXVlc3QucHJvdG90eXBlLnN0cmVhbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fY2hhdHRlci5fcmVxdWVzdCh0aGlzLl9wYXJhbXMpLnN0cmVhbSgpO1xufTtcblxuLyoqXG4gKiBQcm9taXNlL0ErIGludGVyZmFjZVxuICogaHR0cDovL3Byb21pc2VzLWFwbHVzLmdpdGh1Yi5pby9wcm9taXNlcy1zcGVjL1xuICpcbiAqIERlbGVnYXRlIHRvIGRlZmVycmVkIHByb21pc2UsIHJldHVybiBwcm9taXNlIGluc3RhbmNlIGZvciBiYXRjaCByZXN1bHRcbiAqXG4gKiBAbWV0aG9kIENoYXR0ZXJ+UmVxdWVzdCN0aGVuXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvblJlc29sdmUsIG9uUmVqZWN0KSB7XG4gIHJldHVybiB0aGlzLnByb21pc2UoKS50aGVuKG9uUmVzb2x2ZSwgb25SZWplY3QpO1xufTtcblxuLyoqXG4gKiBQcm9taXNlL0ErIGV4dGVuc2lvblxuICogQ2FsbCBcInRoZW5cIiB1c2luZyBnaXZlbiBub2RlLXN0eWxlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKlxuICogQG1ldGhvZCBDaGF0dGVyflJlcXVlc3QjdGhlbkNhbGxcbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUudGhlbkNhbGwgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICByZXR1cm4gXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSA/IHRoaXMucHJvbWlzZSgpLnRoZW5DYWxsKGNhbGxiYWNrKSA6IHRoaXM7XG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudGluZyBjaGF0dGVyIEFQSSByZXNvdXJjZVxuICpcbiAqIEBwcm90ZWN0ZWRcbiAqIEBjbGFzcyBDaGF0dGVyflJlc291cmNlXG4gKiBAZXh0ZW5kcyBDaGF0dGVyflJlcXVlc3RcbiAqIEBwYXJhbSB7Q2hhdHRlcn0gY2hhdHRlciAtIENoYXR0ZXIgQVBJIG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFJlc291cmNlIFVSTFxuICogQHBhcmFtIHtPYmplY3R9IFtxdWVyeVBhcmFtc10gLSBRdWVyeSBwYXJhbWV0ZXJzIChpbiBoYXNoIG9iamVjdClcbiAqL1xudmFyIFJlc291cmNlID0gZnVuY3Rpb24oY2hhdHRlciwgdXJsLCBxdWVyeVBhcmFtcykge1xuICBpZiAocXVlcnlQYXJhbXMpIHtcbiAgICB2YXIgcXN0cmluZyA9IF8ubWFwKF8ua2V5cyhxdWVyeVBhcmFtcyksIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiBuYW1lICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocXVlcnlQYXJhbXNbbmFtZV0pO1xuICAgIH0pLmpvaW4oJyYnKTtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPiAwID8gJyYnIDogJz8nKSArIHFzdHJpbmc7XG4gIH1cbiAgUmVzb3VyY2Uuc3VwZXJfLmNhbGwodGhpcywgY2hhdHRlciwgeyBtZXRob2Q6ICdHRVQnLCB1cmw6IHVybCB9KTtcbiAgdGhpcy5fdXJsID0gdXJsO1xufTtcblxuaW5oZXJpdHMoUmVzb3VyY2UsIFJlcXVlc3QpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyByZXNvdXJjZVxuICpcbiAqIEBtZXRob2QgQ2hhdHRlcn5SZXNvdXJjZSNjcmVhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gRGF0YSB0byBuZXdseSBwb3N0XG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxDaGF0dGVyflJlcXVlc3RSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtDaGF0dGVyflJlcXVlc3R9XG4gKi9cblJlc291cmNlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5fY2hhdHRlci5yZXF1ZXN0KHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6IHRoaXMuX3VybCxcbiAgICBib2R5OiBkYXRhXG4gIH0pLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgcmVzb3VyY2UgY29udGVudFxuICpcbiAqIEBtZXRob2QgQ2hhdHRlcn5SZXNvdXJjZSNyZXRyaWV2ZVxuICogQHBhcmFtIHtDYWxsYmFjay48Q2hhdHRlcn5SZXF1ZXN0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7Q2hhdHRlcn5SZXF1ZXN0fVxuICovXG5SZXNvdXJjZS5wcm90b3R5cGUucmV0cmlldmUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBzcGVjaWZpZWQgcmVzb3VyY2VcbiAqXG4gKiBAbWV0aG9kIENoYXR0ZXJ+UmVzb3VyY2UjdXBkYXRlXG4gKiBAcGFyYW0ge09iZWpjdH0gZGF0YSAtIERhdGEgdG8gdXBkYXRlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxDaGF0dGVyflJlcXVlc3RSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtDaGF0dGVyflJlcXVlc3R9XG4gKi9cblJlc291cmNlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5fY2hhdHRlci5yZXF1ZXN0KHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6IHRoaXMuX3VybCxcbiAgICBib2R5OiBkYXRhXG4gIH0pLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogU3lub255bSBvZiBSZXNvdXJjZSNkZWxldGUoKVxuICpcbiAqIEBtZXRob2QgQ2hhdHRlcn5SZXNvdXJjZSNkZWxcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPENoYXR0ZXJ+UmVxdWVzdFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge0NoYXR0ZXJ+UmVxdWVzdH1cbiAqL1xuLyoqXG4gKiBEZWxldGUgc3BlY2lmaWVkIHJlc291cmNlXG4gKlxuICogQG1ldGhvZCBDaGF0dGVyflJlc291cmNlI2RlbGV0ZVxuICogQHBhcmFtIHtDYWxsYmFjay48Q2hhdHRlcn5SZXF1ZXN0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7Q2hhdHRlcn5SZXF1ZXN0fVxuICovXG5SZXNvdXJjZS5wcm90b3R5cGUuZGVsID1cblJlc291cmNlLnByb3RvdHlwZVtcImRlbGV0ZVwiXSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLl9jaGF0dGVyLnJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgdXJsOiB0aGlzLl91cmxcbiAgfSkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG4gKiBSZWdpc3RlciBob29rIGluIGNvbm5lY3Rpb24gaW5zdGFudGlhdGlvbiBmb3IgZHluYW1pY2FsbHkgYWRkaW5nIHRoaXMgQVBJIG1vZHVsZSBmZWF0dXJlc1xuICovXG5qc2ZvcmNlLm9uKCdjb25uZWN0aW9uOm5ldycsIGZ1bmN0aW9uKGNvbm4pIHtcbiAgY29ubi5jaGF0dGVyID0gbmV3IENoYXR0ZXIoY29ubik7XG59KTtcbiJdfQ==
