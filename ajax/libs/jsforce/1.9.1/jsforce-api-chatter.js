(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Chatter = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL2NoYXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiAqIEBmaWxlIE1hbmFnZXMgU2FsZXNmb3JjZSBDaGF0dGVyIFJFU1QgQVBJIGNhbGxzXG4gKiBAYXV0aG9yIFNoaW5pY2hpIFRvbWl0YSA8c2hpbmljaGkudG9taXRhQGdtYWlsLmNvbT5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJ2luaGVyaXRzJyksXG4gICAgXyAgICAgICA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJ2xvZGFzaC9jb3JlJyksXG4gICAganNmb3JjZSA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vY29yZScpLFxuICAgIFByb21pc2UgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL3Byb21pc2UnKTtcblxuLyoqXG4gKiBBUEkgY2xhc3MgZm9yIENoYXR0ZXIgUkVTVCBBUEkgY2FsbFxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtDb25uZWN0aW9ufSBjb25uIENvbm5lY3Rpb25cbiAqL1xudmFyIENoYXR0ZXIgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbm4pIHtcbiAgdGhpcy5fY29ubiA9IGNvbm47XG59O1xuXG4vKipcbiAqIFNlbmRpbmcgcmVxdWVzdCB0byBBUEkgZW5kcG9pbnRcbiAqIEBwcml2YXRlXG4gKi9cbkNoYXR0ZXIucHJvdG90eXBlLl9yZXF1ZXN0ID0gZnVuY3Rpb24ocGFyYW1zLCBjYWxsYmFjaykge1xuICBpZiAoL14ocHV0fHBvc3R8cGF0Y2gpJC9pLnRlc3QocGFyYW1zLm1ldGhvZCkpIHtcbiAgICBpZiAoXy5pc09iamVjdChwYXJhbXMuYm9keSkpIHtcbiAgICAgIHBhcmFtcy5oZWFkZXJzID0ge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfTtcbiAgICAgIHBhcmFtcy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zLmJvZHkpO1xuICAgIH1cbiAgfVxuICBwYXJhbXMudXJsID0gdGhpcy5fbm9ybWFsaXplVXJsKHBhcmFtcy51cmwpO1xuICByZXR1cm4gdGhpcy5fY29ubi5yZXF1ZXN0KHBhcmFtcywgY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHBhdGggdG8gc2l0ZSByb290IHJlbGF0aXZlIHVybFxuICogQHByaXZhdGVcbiAqL1xuQ2hhdHRlci5wcm90b3R5cGUuX25vcm1hbGl6ZVVybCA9IGZ1bmN0aW9uKHVybCkge1xuICBpZiAodXJsLmluZGV4T2YoJy9jaGF0dGVyLycpID09PSAwIHx8IHVybC5pbmRleE9mKCcvY29ubmVjdC8nKSA9PT0gMCkge1xuICAgIHJldHVybiAnL3NlcnZpY2VzL2RhdGEvdicgKyB0aGlzLl9jb25uLnZlcnNpb24gKyB1cmw7XG4gIH0gZWxzZSBpZiAoL15cXC92W1xcZF0rXFwuW1xcZF0rXFwvLy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gJy9zZXJ2aWNlcy9kYXRhJyArIHVybDtcbiAgfSBlbHNlIGlmICh1cmwuaW5kZXhPZignL3NlcnZpY2VzLycpICE9PSAwICYmIHVybFswXSA9PT0gJy8nKSB7XG4gICAgcmV0dXJuICcvc2VydmljZXMvZGF0YS92JyArIHRoaXMuX2Nvbm4udmVyc2lvbiArICcvY2hhdHRlcicgKyB1cmw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDaGF0dGVyflJlcXVlc3RQYXJhbXNcbiAqIEBwcm9wIHtTdHJpbmd9IG1ldGhvZCAtIEhUVFAgbWV0aG9kXG4gKiBAcHJvcCB7U3RyaW5nfSB1cmwgLSBSZXNvdXJjZSBVUkxcbiAqIEBwcm9wIHtTdHJpbmd9IFtib2R5XSAtIEhUVFAgYm9keSAoaW4gUE9TVC9QVVQvUEFUQ0ggbWV0aG9kcylcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENoYXR0ZXJ+UmVxdWVzdFJlc3VsdFxuICovXG5cbi8qKlxuICogTWFrZSBhIHJlcXVlc3QgZm9yIGNoYXR0ZXIgQVBJIHJlc291cmNlXG4gKlxuICogQHBhcmFtIHtDaGF0dGVyflJlcXVlc3RQYXJhbXN9IHBhcmFtcyAtIFBhcmFtdGVycyByZXByZXNlbnRpbmcgSFRUUCByZXF1ZXN0XG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxDaGF0dGVyflJlcXVlc3RSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY1xuICogQHJldHVybnMge0NoYXR0ZXJ+UmVxdWVzdH1cbiAqL1xuQ2hhdHRlci5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHBhcmFtcykudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBNYWtlIGEgcmVzb3VyY2UgcmVxdWVzdCB0byBjaGF0dGVyIEFQSVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBSZXNvdXJjZSBVUkxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcXVlcnlQYXJhbXNdIC0gUXVlcnkgcGFyYW1ldGVycyAoaW4gaGFzaCBvYmplY3QpXG4gKiBAcmV0dXJucyB7Q2hhdHRlcn5SZXNvdXJjZX1cbiAqL1xuQ2hhdHRlci5wcm90b3R5cGUucmVzb3VyY2UgPSBmdW5jdGlvbih1cmwsIHF1ZXJ5UGFyYW1zKSB7XG4gIHJldHVybiBuZXcgUmVzb3VyY2UodGhpcywgdXJsLCBxdWVyeVBhcmFtcyk7XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENoYXR0ZXJ+QmF0Y2hSZXF1ZXN0UmVzdWx0XG4gKiBAcHJvcCB7Qm9vbGVhbn0gaGFzRXJyb3IgLSBGbGFnIGlmIHRoZSBiYXRjaCBoYXMgb25lIG9yIG1vcmUgZXJyb3JzXG4gKiBAcHJvcCB7QXJyYXkuPE9iamVjdD59IHJlc3VsdHMgLSBCYXRjaCByZXF1ZXN0IHJlc3VsdHMgaW4gYXJyYXlcbiAqIEBwcm9wIHtOdW1iZXJ9IHJlc3VsdHMuc3RhdHVzQ29kZSAtIEhUVFAgcmVzcG9uc2Ugc3RhdHVzIGNvZGVcbiAqIEBwcm9wIHtDaGF0dGVyflJlcXVlc3RSZXN1bHR9IHJlc3VsdHMucmVzdWx0IC0gUGFyc2VkIEhUVFAgcmVzcG9uc2UgYm9keVxuICovXG5cbi8qKlxuICogTWFrZSBhIGJhdGNoIHJlcXVlc3QgdG8gY2hhdHRlciBBUElcbiAqXG4gKiBAcGFyYW1zIHtBcnJheS48Q2hhdHRlcn5SZXF1ZXN0Pn0gcmVxdWVzdHMgLSBDaGF0dGVyIEFQSSByZXF1ZXN0c1xuICogQHBhcmFtIHtDYWxsYmFjay48Q2hhdHRlcn5CYXRjaFJlcXVlc3RSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY1xuICogQHJldHVybnMge1Byb21pc2UuPENoYXR0ZXJ+QmF0Y2hSZXF1ZXN0UmVzdWx0Pn1cbiAqL1xuQ2hhdHRlci5wcm90b3R5cGUuYmF0Y2ggPSBmdW5jdGlvbihyZXF1ZXN0cywgY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgYmF0Y2hSZXF1ZXN0cyA9IFtdLCBiYXRjaERlZmVycmVkcyA9IFtdO1xuICBfLmZvckVhY2gocmVxdWVzdHMsIGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSBQcm9taXNlLmRlZmVyKCk7XG4gICAgcmVxdWVzdC5fcHJvbWlzZSA9IGRlZmVycmVkLnByb21pc2U7XG4gICAgYmF0Y2hSZXF1ZXN0cy5wdXNoKHJlcXVlc3QuYmF0Y2hQYXJhbXMoKSk7XG4gICAgYmF0Y2hEZWZlcnJlZHMucHVzaChkZWZlcnJlZCk7XG4gIH0pO1xuICB2YXIgcGFyYW1zID0ge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogdGhpcy5fbm9ybWFsaXplVXJsKCcvY29ubmVjdC9iYXRjaCcpLFxuICAgIGJvZHk6IHtcbiAgICAgIGJhdGNoUmVxdWVzdHM6IGJhdGNoUmVxdWVzdHNcbiAgICB9XG4gIH07XG4gIHJldHVybiB0aGlzLnJlcXVlc3QocGFyYW1zKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgIF8uZm9yRWFjaChyZXMucmVzdWx0cywgZnVuY3Rpb24ocmVzdWx0LCBpKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBiYXRjaERlZmVycmVkc1tpXTtcbiAgICAgIGlmIChyZXN1bHQuc3RhdHVzQ29kZSA+PSA0MDApIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3VsdC5yZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9KS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudGluZyBjaGF0dGVyIEFQSSByZXF1ZXN0XG4gKlxuICogQHByb3RlY3RlZFxuICogQGNsYXNzIENoYXR0ZXJ+UmVxdWVzdFxuICogQGltcGxlbWVudHMge1Byb21pc2UuPENoYXR0ZXJ+UmVxdWVzdFJlc3VsdD59XG4gKiBAcGFyYW0ge0NoYXR0ZXJ9IGNoYXR0ZXIgLSBDaGF0dGVyIEFQSSBvYmplY3RcbiAqIEBwYXJhbSB7Q2hhdHRlcn5SZXF1ZXN0UGFyYW1zfSBwYXJhbXMgLSBQYXJhbXRlcnMgcmVwcmVzZW50aW5nIEhUVFAgcmVxdWVzdFxuICovXG52YXIgUmVxdWVzdCA9IGZ1bmN0aW9uKGNoYXR0ZXIsIHBhcmFtcykge1xuICB0aGlzLl9jaGF0dGVyID0gY2hhdHRlcjtcbiAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuICB0aGlzLl9wcm9taXNlID0gbnVsbDtcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ2hhdHRlcn5CYXRjaFJlcXVlc3RQYXJhbXNcbiAqIEBwcm9wIHtTdHJpbmd9IG1ldGhvZCAtIEhUVFAgbWV0aG9kXG4gKiBAcHJvcCB7U3RyaW5nfSB1cmwgLSBSZXNvdXJjZSBVUkxcbiAqIEBwcm9wIHtTdHJpbmd9IFtyaWNoSW5wdXRdIC0gSFRUUCBib2R5IChpbiBQT1NUL1BVVC9QQVRDSCBtZXRob2RzKVxuICovXG5cbi8qKlxuICogUmV0cmlldmUgcGFyYW1ldGVycyBpbiBiYXRjaCByZXF1ZXN0IGZvcm1cbiAqXG4gKiBAbWV0aG9kIENoYXR0ZXJ+UmVxdWVzdCNiYXRjaFBhcmFtc1xuICogQHJldHVybnMge0NoYXR0ZXJ+QmF0Y2hSZXF1ZXN0UGFyYW1zfVxuICovXG5SZXF1ZXN0LnByb3RvdHlwZS5iYXRjaFBhcmFtcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGFyYW1zID0gdGhpcy5fcGFyYW1zO1xuICB2YXIgYmF0Y2hQYXJhbXMgPSB7XG4gICAgbWV0aG9kOiBwYXJhbXMubWV0aG9kLFxuICAgIHVybDogdGhpcy5fY2hhdHRlci5fbm9ybWFsaXplVXJsKHBhcmFtcy51cmwpXG4gIH07XG4gIGlmICh0aGlzLl9wYXJhbXMuYm9keSkge1xuICAgIGJhdGNoUGFyYW1zLnJpY2hJbnB1dCA9IHRoaXMuX3BhcmFtcy5ib2R5O1xuICB9XG4gIHJldHVybiBiYXRjaFBhcmFtcztcbn07XG5cbi8qKlxuICogUmV0cmlldmUgcGFyYW1ldGVycyBpbiBiYXRjaCByZXF1ZXN0IGZvcm1cbiAqXG4gKiBAbWV0aG9kIENoYXR0ZXJ+UmVxdWVzdCNwcm9taXNlXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48Q2hhdHRlcn5SZXF1ZXN0UmVzdWx0Pn1cbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUucHJvbWlzZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fcHJvbWlzZSB8fCB0aGlzLl9jaGF0dGVyLl9yZXF1ZXN0KHRoaXMuX3BhcmFtcyk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgTm9kZS5qcyBTdHJlYW0gb2JqZWN0IGZvciByZXF1ZXN0XG4gKlxuICogQG1ldGhvZCBDaGF0dGVyflJlcXVlc3Qjc3RyZWFtXG4gKiBAcmV0dXJucyB7c3RyZWFtLlN0cmVhbX1cbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUuc3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9jaGF0dGVyLl9yZXF1ZXN0KHRoaXMuX3BhcmFtcykuc3RyZWFtKCk7XG59O1xuXG4vKipcbiAqIFByb21pc2UvQSsgaW50ZXJmYWNlXG4gKiBodHRwOi8vcHJvbWlzZXMtYXBsdXMuZ2l0aHViLmlvL3Byb21pc2VzLXNwZWMvXG4gKlxuICogRGVsZWdhdGUgdG8gZGVmZXJyZWQgcHJvbWlzZSwgcmV0dXJuIHByb21pc2UgaW5zdGFuY2UgZm9yIGJhdGNoIHJlc3VsdFxuICpcbiAqIEBtZXRob2QgQ2hhdHRlcn5SZXF1ZXN0I3RoZW5cbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uUmVzb2x2ZSwgb25SZWplY3QpIHtcbiAgcmV0dXJuIHRoaXMucHJvbWlzZSgpLnRoZW4ob25SZXNvbHZlLCBvblJlamVjdCk7XG59O1xuXG4vKipcbiAqIFByb21pc2UvQSsgZXh0ZW5zaW9uXG4gKiBDYWxsIFwidGhlblwiIHVzaW5nIGdpdmVuIG5vZGUtc3R5bGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqXG4gKiBAbWV0aG9kIENoYXR0ZXJ+UmVxdWVzdCN0aGVuQ2FsbFxuICovXG5SZXF1ZXN0LnByb3RvdHlwZS50aGVuQ2FsbCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHJldHVybiBfLmlzRnVuY3Rpb24oY2FsbGJhY2spID8gdGhpcy5wcm9taXNlKCkudGhlbkNhbGwoY2FsbGJhY2spIDogdGhpcztcbn07XG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50aW5nIGNoYXR0ZXIgQVBJIHJlc291cmNlXG4gKlxuICogQHByb3RlY3RlZFxuICogQGNsYXNzIENoYXR0ZXJ+UmVzb3VyY2VcbiAqIEBleHRlbmRzIENoYXR0ZXJ+UmVxdWVzdFxuICogQHBhcmFtIHtDaGF0dGVyfSBjaGF0dGVyIC0gQ2hhdHRlciBBUEkgb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gUmVzb3VyY2UgVVJMXG4gKiBAcGFyYW0ge09iamVjdH0gW3F1ZXJ5UGFyYW1zXSAtIFF1ZXJ5IHBhcmFtZXRlcnMgKGluIGhhc2ggb2JqZWN0KVxuICovXG52YXIgUmVzb3VyY2UgPSBmdW5jdGlvbihjaGF0dGVyLCB1cmwsIHF1ZXJ5UGFyYW1zKSB7XG4gIGlmIChxdWVyeVBhcmFtcykge1xuICAgIHZhciBxc3RyaW5nID0gXy5tYXAoXy5rZXlzKHF1ZXJ5UGFyYW1zKSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIG5hbWUgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeVBhcmFtc1tuYW1lXSk7XG4gICAgfSkuam9pbignJicpO1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA+IDAgPyAnJicgOiAnPycpICsgcXN0cmluZztcbiAgfVxuICBSZXNvdXJjZS5zdXBlcl8uY2FsbCh0aGlzLCBjaGF0dGVyLCB7IG1ldGhvZDogJ0dFVCcsIHVybDogdXJsIH0pO1xuICB0aGlzLl91cmwgPSB1cmw7XG59O1xuXG5pbmhlcml0cyhSZXNvdXJjZSwgUmVxdWVzdCk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJlc291cmNlXG4gKlxuICogQG1ldGhvZCBDaGF0dGVyflJlc291cmNlI2NyZWF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBEYXRhIHRvIG5ld2x5IHBvc3RcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPENoYXR0ZXJ+UmVxdWVzdFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge0NoYXR0ZXJ+UmVxdWVzdH1cbiAqL1xuUmVzb3VyY2UucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLl9jaGF0dGVyLnJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogdGhpcy5fdXJsLFxuICAgIGJvZHk6IGRhdGFcbiAgfSkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSByZXNvdXJjZSBjb250ZW50XG4gKlxuICogQG1ldGhvZCBDaGF0dGVyflJlc291cmNlI3JldHJpZXZlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxDaGF0dGVyflJlcXVlc3RSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtDaGF0dGVyflJlcXVlc3R9XG4gKi9cblJlc291cmNlLnByb3RvdHlwZS5yZXRyaWV2ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHNwZWNpZmllZCByZXNvdXJjZVxuICpcbiAqIEBtZXRob2QgQ2hhdHRlcn5SZXNvdXJjZSN1cGRhdGVcbiAqIEBwYXJhbSB7T2JlamN0fSBkYXRhIC0gRGF0YSB0byB1cGRhdGVcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPENoYXR0ZXJ+UmVxdWVzdFJlc3VsdD59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge0NoYXR0ZXJ+UmVxdWVzdH1cbiAqL1xuUmVzb3VyY2UucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLl9jaGF0dGVyLnJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogdGhpcy5fdXJsLFxuICAgIGJvZHk6IGRhdGFcbiAgfSkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBTeW5vbnltIG9mIFJlc291cmNlI2RlbGV0ZSgpXG4gKlxuICogQG1ldGhvZCBDaGF0dGVyflJlc291cmNlI2RlbFxuICogQHBhcmFtIHtDYWxsYmFjay48Q2hhdHRlcn5SZXF1ZXN0UmVzdWx0Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7Q2hhdHRlcn5SZXF1ZXN0fVxuICovXG4vKipcbiAqIERlbGV0ZSBzcGVjaWZpZWQgcmVzb3VyY2VcbiAqXG4gKiBAbWV0aG9kIENoYXR0ZXJ+UmVzb3VyY2UjZGVsZXRlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxDaGF0dGVyflJlcXVlc3RSZXN1bHQ+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtDaGF0dGVyflJlcXVlc3R9XG4gKi9cblJlc291cmNlLnByb3RvdHlwZS5kZWwgPVxuUmVzb3VyY2UucHJvdG90eXBlW1wiZGVsZXRlXCJdID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuX2NoYXR0ZXIucmVxdWVzdCh7XG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICB1cmw6IHRoaXMuX3VybFxuICB9KS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbmpzZm9yY2Uub24oJ2Nvbm5lY3Rpb246bmV3JywgZnVuY3Rpb24oY29ubikge1xuICBjb25uLmNoYXR0ZXIgPSBuZXcgQ2hhdHRlcihjb25uKTtcbn0pO1xuIl19
