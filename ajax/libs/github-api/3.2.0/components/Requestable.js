'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _jsBase = require('js-base64');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var log = (0, _debug2.default)('github:request');

/**
 * The error structure returned when a network call fails
 */

var ResponseError = function (_Error) {
   _inherits(ResponseError, _Error);

   /**
    * Construct a new ResponseError
    * @param {string} message - an message to return instead of the the default error message
    * @param {string} path - the requested path
    * @param {Object} response - the object returned by Axios
    */
   function ResponseError(message, path, response) {
      _classCallCheck(this, ResponseError);

      var _this = _possibleConstructorReturn(this, (ResponseError.__proto__ || Object.getPrototypeOf(ResponseError)).call(this, message));

      _this.path = path;
      _this.request = response.config;
      _this.response = (response || {}).response || response;
      _this.status = response.status;
      return _this;
   }

   return ResponseError;
}(Error);

/**
 * Requestable wraps the logic for making http requests to the API
 */


var Requestable = function () {
   /**
    * Either a username and password or an oauth token for Github
    * @typedef {Object} Requestable.auth
    * @prop {string} [username] - the Github username
    * @prop {string} [password] - the user's password
    * @prop {token} [token] - an OAuth token
    */
   /**
    * Initialize the http internals.
    * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
    *                                  not provided request will be made unauthenticated
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    * @param {string} [AcceptHeader=v3] - the accept header for the requests
    */
   function Requestable(auth, apiBase, AcceptHeader) {
      _classCallCheck(this, Requestable);

      this.__apiBase = apiBase || 'https://api.github.com';
      this.__auth = {
         token: auth.token,
         username: auth.username,
         password: auth.password
      };
      this.__AcceptHeader = AcceptHeader || 'v3';

      if (auth.token) {
         this.__authorizationHeader = 'token ' + auth.token;
      } else if (auth.username && auth.password) {
         this.__authorizationHeader = 'Basic ' + _jsBase.Base64.encode(auth.username + ':' + auth.password);
      }
   }

   /**
    * Compute the URL to use to make a request.
    * @private
    * @param {string} path - either a URL relative to the API base or an absolute URL
    * @return {string} - the URL to use
    */


   _createClass(Requestable, [{
      key: '__getURL',
      value: function __getURL(path) {
         var url = path;

         if (path.indexOf('//') === -1) {
            url = this.__apiBase + path;
         }

         var newCacheBuster = 'timestamp=' + new Date().getTime();
         return url.replace(/(timestamp=\d+)/, newCacheBuster);
      }

      /**
       * Compute the headers required for an API request.
       * @private
       * @param {boolean} raw - if the request should be treated as JSON or as a raw request
       * @param {string} AcceptHeader - the accept header for the request
       * @return {Object} - the headers to use in the request
       */

   }, {
      key: '__getRequestHeaders',
      value: function __getRequestHeaders(raw, AcceptHeader) {
         var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/vnd.github.' + (AcceptHeader || this.__AcceptHeader)
         };

         if (raw) {
            headers.Accept += '.raw';
         }
         headers.Accept += '+json';

         if (this.__authorizationHeader) {
            headers.Authorization = this.__authorizationHeader;
         }

         return headers;
      }

      /**
       * Sets the default options for API requests
       * @protected
       * @param {Object} [requestOptions={}] - the current options for the request
       * @return {Object} - the options to pass to the request
       */

   }, {
      key: '_getOptionsWithDefaults',
      value: function _getOptionsWithDefaults() {
         var requestOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

         if (!(requestOptions.visibility || requestOptions.affiliation)) {
            requestOptions.type = requestOptions.type || 'all';
         }
         requestOptions.sort = requestOptions.sort || 'updated';
         requestOptions.per_page = requestOptions.per_page || '100'; // eslint-disable-line

         return requestOptions;
      }

      /**
       * if a `Date` is passed to this function it will be converted to an ISO string
       * @param {*} date - the object to attempt to coerce into an ISO date string
       * @return {string} - the ISO representation of `date` or whatever was passed in if it was not a date
       */

   }, {
      key: '_dateToISO',
      value: function _dateToISO(date) {
         if (date && date instanceof Date) {
            date = date.toISOString();
         }

         return date;
      }

      /**
       * A function that receives the result of the API request.
       * @callback Requestable.callback
       * @param {Requestable.Error} error - the error returned by the API or `null`
       * @param {(Object|true)} result - the data returned by the API or `true` if the API returns `204 No Content`
       * @param {Object} request - the raw {@linkcode https://github.com/mzabriskie/axios#response-schema Response}
       */
      /**
       * Make a request.
       * @param {string} method - the method for the request (GET, PUT, POST, DELETE)
       * @param {string} path - the path for the request
       * @param {*} [data] - the data to send to the server. For HTTP methods that don't have a body the data
       *                   will be sent as query parameters
       * @param {Requestable.callback} [cb] - the callback for the request
       * @param {boolean} [raw=false] - if the request should be sent as raw. If this is a falsy value then the
       *                              request will be made as JSON
       * @return {Promise} - the Promise for the http request
       */

   }, {
      key: '_request',
      value: function _request(method, path, data, cb, raw) {
         var url = this.__getURL(path);

         var AcceptHeader = (data || {}).AcceptHeader;
         if (AcceptHeader) {
            delete data.AcceptHeader;
         }
         var headers = this.__getRequestHeaders(raw, AcceptHeader);

         var queryParams = {};

         var shouldUseDataAsParams = data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && methodHasNoBody(method);
         if (shouldUseDataAsParams) {
            queryParams = data;
            data = undefined;
         }

         var config = {
            url: url,
            method: method,
            headers: headers,
            params: queryParams,
            data: data,
            responseType: raw ? 'text' : 'json'
         };

         log(config.method + ' to ' + config.url);
         var requestPromise = (0, _axios2.default)(config).catch(callbackErrorOrThrow(cb, path));

         if (cb) {
            requestPromise.then(function (response) {
               if (response.data && Object.keys(response.data).length > 0) {
                  // When data has results
                  cb(null, response.data, response);
               } else if (config.method !== 'GET' && Object.keys(response.data).length < 1) {
                  // True when successful submit a request and receive a empty object
                  cb(null, response.status < 300, response);
               } else {
                  cb(null, response.data, response);
               }
            });
         }

         return requestPromise;
      }

      /**
       * Make a request to an endpoint the returns 204 when true and 404 when false
       * @param {string} path - the path to request
       * @param {Object} data - any query parameters for the request
       * @param {Requestable.callback} cb - the callback that will receive `true` or `false`
       * @param {method} [method=GET] - HTTP Method to use
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: '_request204or404',
      value: function _request204or404(path, data, cb) {
         var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';

         return this._request(method, path, data).then(function success(response) {
            if (cb) {
               cb(null, true, response);
            }
            return true;
         }, function failure(response) {
            if (response.response.status === 404) {
               if (cb) {
                  cb(null, false, response);
               }
               return false;
            }

            if (cb) {
               cb(response);
            }
            throw response;
         });
      }

      /**
       * Make a request and fetch all the available data. Github will paginate responses so for queries
       * that might span multiple pages this method is preferred to {@link Requestable#request}
       * @param {string} path - the path to request
       * @param {Object} options - the query parameters to include
       * @param {Requestable.callback} [cb] - the function to receive the data. The returned data will always be an array.
       * @param {Object[]} results - the partial results. This argument is intended for internal use only.
       * @return {Promise} - a promise which will resolve when all pages have been fetched
       * @deprecated This will be folded into {@link Requestable#_request} in the 2.0 release.
       */

   }, {
      key: '_requestAllPages',
      value: function _requestAllPages(path, options, cb, results) {
         var _this2 = this;

         results = results || [];

         return this._request('GET', path, options).then(function (response) {
            var _results;

            var thisGroup = void 0;
            if (response.data instanceof Array) {
               thisGroup = response.data;
            } else if (response.data.items instanceof Array) {
               thisGroup = response.data.items;
            } else {
               var message = 'cannot figure out how to append ' + response.data + ' to the result set';
               throw new ResponseError(message, path, response);
            }
            (_results = results).push.apply(_results, _toConsumableArray(thisGroup));

            var nextUrl = getNextPage(response.headers.link);
            if (nextUrl && !(options && typeof options.page !== 'number')) {
               log('getting next page: ' + nextUrl);
               return _this2._requestAllPages(nextUrl, options, cb, results);
            }

            if (cb) {
               cb(null, results, response);
            }

            response.data = results;
            return response;
         }).catch(callbackErrorOrThrow(cb, path));
      }
   }]);

   return Requestable;
}();

module.exports = Requestable;

// ////////////////////////// //
//  Private helper functions  //
// ////////////////////////// //
var METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];
function methodHasNoBody(method) {
   return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
}

function getNextPage() {
   var linksHeader = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

   var links = linksHeader.split(/\s*,\s*/); // splits and strips the urls
   return links.reduce(function (nextUrl, link) {
      if (link.search(/rel="next"/) !== -1) {
         return (link.match(/<(.*)>/) || [])[1];
      }

      return nextUrl;
   }, undefined);
}

function callbackErrorOrThrow(cb, path) {
   return function handler(object) {
      var error = void 0;
      if (object.hasOwnProperty('config')) {
         var _object$response = object.response,
             status = _object$response.status,
             statusText = _object$response.statusText,
             _object$config = object.config,
             method = _object$config.method,
             url = _object$config.url;

         var message = status + ' error making request ' + method + ' ' + url + ': "' + statusText + '"';
         error = new ResponseError(message, path, object);
         log(message + ' ' + JSON.stringify(object.data));
      } else {
         error = object;
      }
      if (cb) {
         log('going to error callback');
         cb(error);
      } else {
         log('throwing error');
         throw error;
      }
   };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVlc3RhYmxlLmpzIl0sIm5hbWVzIjpbImxvZyIsIlJlc3BvbnNlRXJyb3IiLCJtZXNzYWdlIiwicGF0aCIsInJlc3BvbnNlIiwicmVxdWVzdCIsImNvbmZpZyIsInN0YXR1cyIsIkVycm9yIiwiUmVxdWVzdGFibGUiLCJhdXRoIiwiYXBpQmFzZSIsIkFjY2VwdEhlYWRlciIsIl9fYXBpQmFzZSIsIl9fYXV0aCIsInRva2VuIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIl9fQWNjZXB0SGVhZGVyIiwiX19hdXRob3JpemF0aW9uSGVhZGVyIiwiQmFzZTY0IiwiZW5jb2RlIiwidXJsIiwiaW5kZXhPZiIsIm5ld0NhY2hlQnVzdGVyIiwiRGF0ZSIsImdldFRpbWUiLCJyZXBsYWNlIiwicmF3IiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJyZXF1ZXN0T3B0aW9ucyIsInZpc2liaWxpdHkiLCJhZmZpbGlhdGlvbiIsInR5cGUiLCJzb3J0IiwicGVyX3BhZ2UiLCJkYXRlIiwidG9JU09TdHJpbmciLCJtZXRob2QiLCJkYXRhIiwiY2IiLCJfX2dldFVSTCIsIl9fZ2V0UmVxdWVzdEhlYWRlcnMiLCJxdWVyeVBhcmFtcyIsInNob3VsZFVzZURhdGFBc1BhcmFtcyIsIm1ldGhvZEhhc05vQm9keSIsInVuZGVmaW5lZCIsInBhcmFtcyIsInJlc3BvbnNlVHlwZSIsInJlcXVlc3RQcm9taXNlIiwiY2F0Y2giLCJjYWxsYmFja0Vycm9yT3JUaHJvdyIsInRoZW4iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiX3JlcXVlc3QiLCJzdWNjZXNzIiwiZmFpbHVyZSIsIm9wdGlvbnMiLCJyZXN1bHRzIiwidGhpc0dyb3VwIiwiQXJyYXkiLCJpdGVtcyIsInB1c2giLCJuZXh0VXJsIiwiZ2V0TmV4dFBhZ2UiLCJsaW5rIiwicGFnZSIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiTUVUSE9EU19XSVRIX05PX0JPRFkiLCJsaW5rc0hlYWRlciIsImxpbmtzIiwic3BsaXQiLCJyZWR1Y2UiLCJzZWFyY2giLCJtYXRjaCIsImhhbmRsZXIiLCJvYmplY3QiLCJlcnJvciIsImhhc093blByb3BlcnR5Iiwic3RhdHVzVGV4dCIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQU9BOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFUQTs7Ozs7OztBQVdBLElBQU1BLE1BQU0scUJBQU0sZ0JBQU4sQ0FBWjs7QUFFQTs7OztJQUdNQyxhOzs7QUFDSDs7Ozs7O0FBTUEsMEJBQVlDLE9BQVosRUFBcUJDLElBQXJCLEVBQTJCQyxRQUEzQixFQUFxQztBQUFBOztBQUFBLGdJQUM1QkYsT0FENEI7O0FBRWxDLFlBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFlBQUtFLE9BQUwsR0FBZUQsU0FBU0UsTUFBeEI7QUFDQSxZQUFLRixRQUFMLEdBQWdCLENBQUNBLFlBQVksRUFBYixFQUFpQkEsUUFBakIsSUFBNkJBLFFBQTdDO0FBQ0EsWUFBS0csTUFBTCxHQUFjSCxTQUFTRyxNQUF2QjtBQUxrQztBQU1wQzs7O0VBYndCQyxLOztBQWdCNUI7Ozs7O0lBR01DLFc7QUFDSDs7Ozs7OztBQU9BOzs7Ozs7O0FBT0Esd0JBQVlDLElBQVosRUFBa0JDLE9BQWxCLEVBQTJCQyxZQUEzQixFQUF5QztBQUFBOztBQUN0QyxXQUFLQyxTQUFMLEdBQWlCRixXQUFXLHdCQUE1QjtBQUNBLFdBQUtHLE1BQUwsR0FBYztBQUNYQyxnQkFBT0wsS0FBS0ssS0FERDtBQUVYQyxtQkFBVU4sS0FBS00sUUFGSjtBQUdYQyxtQkFBVVAsS0FBS087QUFISixPQUFkO0FBS0EsV0FBS0MsY0FBTCxHQUFzQk4sZ0JBQWdCLElBQXRDOztBQUVBLFVBQUlGLEtBQUtLLEtBQVQsRUFBZ0I7QUFDYixjQUFLSSxxQkFBTCxHQUE2QixXQUFXVCxLQUFLSyxLQUE3QztBQUNGLE9BRkQsTUFFTyxJQUFJTCxLQUFLTSxRQUFMLElBQWlCTixLQUFLTyxRQUExQixFQUFv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O0FBQ3JDLFVBQU8sU0FBUzhFLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCO0FBQzdCLFVBQUlDLGNBQUo7QUFDQSxVQUFJRCxPQUFPRSxjQUFQLENBQXNCLFFBQXRCLENBQUosRUFBcUM7QUFBQSxnQ0FDOEJGLE1BRDlCLENBQzNCOUUsUUFEMkI7QUFBQSxhQUNoQkcsTUFEZ0Isb0JBQ2hCQSxNQURnQjtBQUFBLGFBQ1I4RSxVQURRLG9CQUNSQSxVQURRO0FBQUEsOEJBQzhCSCxNQUQ5QixDQUNLNUUsTUFETDtBQUFBLGFBQ2NrQyxNQURkLGtCQUNjQSxNQURkO0FBQUEsYUFDc0JsQixHQUR0QixrQkFDc0JBLEdBRHRCOztBQUVsQyxhQUFJcEIsVUFBY0ssTUFBZCw4QkFBNkNpQyxNQUE3QyxTQUF1RGxCLEdBQXZELFdBQWdFK0QsVUFBaEUsTUFBSjtBQUNBRixpQkFBUSxJQUFJbEYsYUFBSixDQUFrQkMsT0FBbEIsRUFBMkJDLElBQTNCLEVBQWlDK0UsTUFBakMsQ0FBUjtBQUNBbEYsYUFBT0UsT0FBUCxTQUFrQm9GLEtBQUtDLFNBQUwsQ0FBZUwsT0FBT3pDLElBQXRCLENBQWxCO0FBQ0YsT0FMRCxNQUtPO0FBQ0owQyxpQkFBUUQsTUFBUjtBQUNGO0FBQ0QsVUFBSXhDLEVBQUosRUFBUTtBQUNMMUMsYUFBSSx5QkFBSjtBQUNBMEMsWUFBR3lDLEtBQUg7QUFDRixPQUhELE1BR087QUFDSm5GLGFBQUksZ0JBQUo7QUFDQSxlQUFNbUYsS0FBTjtBQUNGO0FBQ0gsSUFqQkQ7QUFrQkYiLCJmaWxlIjoiUmVxdWVzdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlXG4gKiBAY29weXJpZ2h0ICAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQge0Jhc2U2NH0gZnJvbSAnanMtYmFzZTY0JztcblxuY29uc3QgbG9nID0gZGVidWcoJ2dpdGh1YjpyZXF1ZXN0Jyk7XG5cbi8qKlxuICogVGhlIGVycm9yIHN0cnVjdHVyZSByZXR1cm5lZCB3aGVuIGEgbmV0d29yayBjYWxsIGZhaWxzXG4gKi9cbmNsYXNzIFJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAvKipcbiAgICAqIENvbnN0cnVjdCBhIG5ldyBSZXNwb25zZUVycm9yXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIGFuIG1lc3NhZ2UgdG8gcmV0dXJuIGluc3RlYWQgb2YgdGhlIHRoZSBkZWZhdWx0IGVycm9yIG1lc3NhZ2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHJlcXVlc3RlZCBwYXRoXG4gICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgLSB0aGUgb2JqZWN0IHJldHVybmVkIGJ5IEF4aW9zXG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHBhdGgsIHJlc3BvbnNlKSB7XG4gICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICB0aGlzLnJlcXVlc3QgPSByZXNwb25zZS5jb25maWc7XG4gICAgICB0aGlzLnJlc3BvbnNlID0gKHJlc3BvbnNlIHx8IHt9KS5yZXNwb25zZSB8fCByZXNwb25zZTtcbiAgICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgfVxufVxuXG4vKipcbiAqIFJlcXVlc3RhYmxlIHdyYXBzIHRoZSBsb2dpYyBmb3IgbWFraW5nIGh0dHAgcmVxdWVzdHMgdG8gdGhlIEFQSVxuICovXG5jbGFzcyBSZXF1ZXN0YWJsZSB7XG4gICAvKipcbiAgICAqIEVpdGhlciBhIHVzZXJuYW1lIGFuZCBwYXNzd29yZCBvciBhbiBvYXV0aCB0b2tlbiBmb3IgR2l0aHViXG4gICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBSZXF1ZXN0YWJsZS5hdXRoXG4gICAgKiBAcHJvcCB7c3RyaW5nfSBbdXNlcm5hbWVdIC0gdGhlIEdpdGh1YiB1c2VybmFtZVxuICAgICogQHByb3Age3N0cmluZ30gW3Bhc3N3b3JkXSAtIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAqIEBwcm9wIHt0b2tlbn0gW3Rva2VuXSAtIGFuIE9BdXRoIHRva2VuXG4gICAgKi9cbiAgIC8qKlxuICAgICogSW5pdGlhbGl6ZSB0aGUgaHR0cCBpbnRlcm5hbHMuXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIHRoZSBjcmVkZW50aWFscyB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViLiBJZiBhdXRoIGlzXG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgcHJvdmlkZWQgcmVxdWVzdCB3aWxsIGJlIG1hZGUgdW5hdXRoZW50aWNhdGVkXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtBY2NlcHRIZWFkZXI9djNdIC0gdGhlIGFjY2VwdCBoZWFkZXIgZm9yIHRoZSByZXF1ZXN0c1xuICAgICovXG4gICBjb25zdHJ1Y3RvcihhdXRoLCBhcGlCYXNlLCBBY2NlcHRIZWFkZXIpIHtcbiAgICAgIHRoaXMuX19hcGlCYXNlID0gYXBpQmFzZSB8fCAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSc7XG4gICAgICB0aGlzLl9fYXV0aCA9IHtcbiAgICAgICAgIHRva2VuOiBhdXRoLnRva2VuLFxuICAgICAgICAgdXNlcm5hbWU6IGF1dGgudXNlcm5hbWUsXG4gICAgICAgICBwYXNzd29yZDogYXV0aC5wYXNzd29yZCxcbiAgICAgIH07XG4gICAgICB0aGlzLl9fQWNjZXB0SGVhZGVyID0gQWNjZXB0SGVhZGVyIHx8ICd2Myc7XG5cbiAgICAgIGlmIChhdXRoLnRva2VuKSB7XG4gICAgICAgICB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlciA9ICd0b2tlbiAnICsgYXV0aC50b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAoYXV0aC51c2VybmFtZSAmJiBhdXRoLnBhc3N3b3JkKSB7XG4gICAgICAgICB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlciA9ICdCYXNpYyAnICsgQmFzZTY0LmVuY29kZShhdXRoLnVzZXJuYW1lICsgJzonICsgYXV0aC5wYXNzd29yZCk7XG4gICAgICB9XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ29tcHV0ZSB0aGUgVVJMIHRvIHVzZSB0byBtYWtlIGEgcmVxdWVzdC5cbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGVpdGhlciBhIFVSTCByZWxhdGl2ZSB0byB0aGUgQVBJIGJhc2Ugb3IgYW4gYWJzb2x1dGUgVVJMXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIFVSTCB0byB1c2VcbiAgICAqL1xuICAgX19nZXRVUkwocGF0aCkge1xuICAgICAgbGV0IHVybCA9IHBhdGg7XG5cbiAgICAgIGlmIChwYXRoLmluZGV4T2YoJy8vJykgPT09IC0xKSB7XG4gICAgICAgICB1cmwgPSB0aGlzLl9fYXBpQmFzZSArIHBhdGg7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdDYWNoZUJ1c3RlciA9ICd0aW1lc3RhbXA9JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKC8odGltZXN0YW1wPVxcZCspLywgbmV3Q2FjaGVCdXN0ZXIpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbXB1dGUgdGhlIGhlYWRlcnMgcmVxdWlyZWQgZm9yIGFuIEFQSSByZXF1ZXN0LlxuICAgICogQHByaXZhdGVcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmF3IC0gaWYgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgSlNPTiBvciBhcyBhIHJhdyByZXF1ZXN0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gQWNjZXB0SGVhZGVyIC0gdGhlIGFjY2VwdCBoZWFkZXIgZm9yIHRoZSByZXF1ZXN0XG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIGhlYWRlcnMgdG8gdXNlIGluIHRoZSByZXF1ZXN0XG4gICAgKi9cbiAgIF9fZ2V0UmVxdWVzdEhlYWRlcnMocmF3LCBBY2NlcHRIZWFkZXIpIHtcbiAgICAgIGxldCBoZWFkZXJzID0ge1xuICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnLFxuICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLicgKyAoQWNjZXB0SGVhZGVyIHx8IHRoaXMuX19BY2NlcHRIZWFkZXIpLFxuICAgICAgfTtcblxuICAgICAgaWYgKHJhdykge1xuICAgICAgICAgaGVhZGVycy5BY2NlcHQgKz0gJy5yYXcnO1xuICAgICAgfVxuICAgICAgaGVhZGVycy5BY2NlcHQgKz0gJytqc29uJztcblxuICAgICAgaWYgKHRoaXMuX19hdXRob3JpemF0aW9uSGVhZGVyKSB7XG4gICAgICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU2V0cyB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBBUEkgcmVxdWVzdHNcbiAgICAqIEBwcm90ZWN0ZWRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdE9wdGlvbnM9e31dIC0gdGhlIGN1cnJlbnQgb3B0aW9ucyBmb3IgdGhlIHJlcXVlc3RcbiAgICAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgb3B0aW9ucyB0byBwYXNzIHRvIHRoZSByZXF1ZXN0XG4gICAgKi9cbiAgIF9nZXRPcHRpb25zV2l0aERlZmF1bHRzKHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgIGlmICghKHJlcXVlc3RPcHRpb25zLnZpc2liaWxpdHkgfHwgcmVxdWVzdE9wdGlvbnMuYWZmaWxpYXRpb24pKSB7XG4gICAgICAgICByZXF1ZXN0T3B0aW9ucy50eXBlID0gcmVxdWVzdE9wdGlvbnMudHlwZSB8fCAnYWxsJztcbiAgICAgIH1cbiAgICAgIHJlcXVlc3RPcHRpb25zLnNvcnQgPSByZXF1ZXN0T3B0aW9ucy5zb3J0IHx8ICd1cGRhdGVkJztcbiAgICAgIHJlcXVlc3RPcHRpb25zLnBlcl9wYWdlID0gcmVxdWVzdE9wdGlvbnMucGVyX3BhZ2UgfHwgJzEwMCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgcmV0dXJuIHJlcXVlc3RPcHRpb25zO1xuICAgfVxuXG4gICAvKipcbiAgICAqIGlmIGEgYERhdGVgIGlzIHBhc3NlZCB0byB0aGlzIGZ1bmN0aW9uIGl0IHdpbGwgYmUgY29udmVydGVkIHRvIGFuIElTTyBzdHJpbmdcbiAgICAqIEBwYXJhbSB7Kn0gZGF0ZSAtIHRoZSBvYmplY3QgdG8gYXR0ZW1wdCB0byBjb2VyY2UgaW50byBhbiBJU08gZGF0ZSBzdHJpbmdcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgSVNPIHJlcHJlc2VudGF0aW9uIG9mIGBkYXRlYCBvciB3aGF0ZXZlciB3YXMgcGFzc2VkIGluIGlmIGl0IHdhcyBub3QgYSBkYXRlXG4gICAgKi9cbiAgIF9kYXRlVG9JU08oZGF0ZSkge1xuICAgICAgaWYgKGRhdGUgJiYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgZGF0ZSA9IGRhdGUudG9JU09TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGU7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSByZXN1bHQgb2YgdGhlIEFQSSByZXF1ZXN0LlxuICAgICogQGNhbGxiYWNrIFJlcXVlc3RhYmxlLmNhbGxiYWNrXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLkVycm9yfSBlcnJvciAtIHRoZSBlcnJvciByZXR1cm5lZCBieSB0aGUgQVBJIG9yIGBudWxsYFxuICAgICogQHBhcmFtIHsoT2JqZWN0fHRydWUpfSByZXN1bHQgLSB0aGUgZGF0YSByZXR1cm5lZCBieSB0aGUgQVBJIG9yIGB0cnVlYCBpZiB0aGUgQVBJIHJldHVybnMgYDIwNCBObyBDb250ZW50YFxuICAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3QgLSB0aGUgcmF3IHtAbGlua2NvZGUgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvYXhpb3MjcmVzcG9uc2Utc2NoZW1hIFJlc3BvbnNlfVxuICAgICovXG4gICAvKipcbiAgICAqIE1ha2UgYSByZXF1ZXN0LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZCAtIHRoZSBtZXRob2QgZm9yIHRoZSByZXF1ZXN0IChHRVQsIFBVVCwgUE9TVCwgREVMRVRFKVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBmb3IgdGhlIHJlcXVlc3RcbiAgICAqIEBwYXJhbSB7Kn0gW2RhdGFdIC0gdGhlIGRhdGEgdG8gc2VuZCB0byB0aGUgc2VydmVyLiBGb3IgSFRUUCBtZXRob2RzIHRoYXQgZG9uJ3QgaGF2ZSBhIGJvZHkgdGhlIGRhdGFcbiAgICAqICAgICAgICAgICAgICAgICAgIHdpbGwgYmUgc2VudCBhcyBxdWVyeSBwYXJhbWV0ZXJzXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gdGhlIGNhbGxiYWNrIGZvciB0aGUgcmVxdWVzdFxuICAgICogQHBhcmFtIHtib29sZWFufSBbcmF3PWZhbHNlXSAtIGlmIHRoZSByZXF1ZXN0IHNob3VsZCBiZSBzZW50IGFzIHJhdy4gSWYgdGhpcyBpcyBhIGZhbHN5IHZhbHVlIHRoZW4gdGhlXG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Qgd2lsbCBiZSBtYWRlIGFzIEpTT05cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIFByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgX3JlcXVlc3QobWV0aG9kLCBwYXRoLCBkYXRhLCBjYiwgcmF3KSB7XG4gICAgICBjb25zdCB1cmwgPSB0aGlzLl9fZ2V0VVJMKHBhdGgpO1xuXG4gICAgICBjb25zdCBBY2NlcHRIZWFkZXIgPSAoZGF0YSB8fCB7fSkuQWNjZXB0SGVhZGVyO1xuICAgICAgaWYgKEFjY2VwdEhlYWRlcikge1xuICAgICAgICAgZGVsZXRlIGRhdGEuQWNjZXB0SGVhZGVyO1xuICAgICAgfVxuICAgICAgY29uc3QgaGVhZGVycyA9IHRoaXMuX19nZXRSZXF1ZXN0SGVhZGVycyhyYXcsIEFjY2VwdEhlYWRlcik7XG5cbiAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHt9O1xuXG4gICAgICBjb25zdCBzaG91bGRVc2VEYXRhQXNQYXJhbXMgPSBkYXRhICYmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpICYmIG1ldGhvZEhhc05vQm9keShtZXRob2QpO1xuICAgICAgaWYgKHNob3VsZFVzZURhdGFBc1BhcmFtcykge1xuICAgICAgICAgcXVlcnlQYXJhbXMgPSBkYXRhO1xuICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICBwYXJhbXM6IHF1ZXJ5UGFyYW1zLFxuICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgIHJlc3BvbnNlVHlwZTogcmF3ID8gJ3RleHQnIDogJ2pzb24nLFxuICAgICAgfTtcblxuICAgICAgbG9nKGAke2NvbmZpZy5tZXRob2R9IHRvICR7Y29uZmlnLnVybH1gKTtcbiAgICAgIGNvbnN0IHJlcXVlc3RQcm9taXNlID0gYXhpb3MoY29uZmlnKS5jYXRjaChjYWxsYmFja0Vycm9yT3JUaHJvdyhjYiwgcGF0aCkpO1xuXG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgIHJlcXVlc3RQcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YSAmJiBPYmplY3Qua2V5cyhyZXNwb25zZS5kYXRhKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAvLyBXaGVuIGRhdGEgaGFzIHJlc3VsdHNcbiAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3BvbnNlLmRhdGEsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLm1ldGhvZCAhPT0gJ0dFVCcgJiYgT2JqZWN0LmtleXMocmVzcG9uc2UuZGF0YSkubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgLy8gVHJ1ZSB3aGVuIHN1Y2Nlc3NmdWwgc3VibWl0IGEgcmVxdWVzdCBhbmQgcmVjZWl2ZSBhIGVtcHR5IG9iamVjdFxuICAgICAgICAgICAgICAgY2IobnVsbCwgKHJlc3BvbnNlLnN0YXR1cyA8IDMwMCksIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICBjYihudWxsLCByZXNwb25zZS5kYXRhLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcXVlc3RQcm9taXNlO1xuICAgfVxuXG4gICAvKipcbiAgICAqIE1ha2UgYSByZXF1ZXN0IHRvIGFuIGVuZHBvaW50IHRoZSByZXR1cm5zIDIwNCB3aGVuIHRydWUgYW5kIDQwNCB3aGVuIGZhbHNlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIHRvIHJlcXVlc3RcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gYW55IHF1ZXJ5IHBhcmFtZXRlcnMgZm9yIHRoZSByZXF1ZXN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHRoZSBjYWxsYmFjayB0aGF0IHdpbGwgcmVjZWl2ZSBgdHJ1ZWAgb3IgYGZhbHNlYFxuICAgICogQHBhcmFtIHttZXRob2R9IFttZXRob2Q9R0VUXSAtIEhUVFAgTWV0aG9kIHRvIHVzZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBfcmVxdWVzdDIwNG9yNDA0KHBhdGgsIGRhdGEsIGNiLCBtZXRob2QgPSAnR0VUJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QobWV0aG9kLCBwYXRoLCBkYXRhKVxuICAgICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICBjYihudWxsLCB0cnVlLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgIH0sIGZ1bmN0aW9uIGZhaWx1cmUocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICBjYihudWxsLCBmYWxzZSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgIGNiKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgICAgICAgfSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTWFrZSBhIHJlcXVlc3QgYW5kIGZldGNoIGFsbCB0aGUgYXZhaWxhYmxlIGRhdGEuIEdpdGh1YiB3aWxsIHBhZ2luYXRlIHJlc3BvbnNlcyBzbyBmb3IgcXVlcmllc1xuICAgICogdGhhdCBtaWdodCBzcGFuIG11bHRpcGxlIHBhZ2VzIHRoaXMgbWV0aG9kIGlzIHByZWZlcnJlZCB0byB7QGxpbmsgUmVxdWVzdGFibGUjcmVxdWVzdH1cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggdG8gcmVxdWVzdFxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgcXVlcnkgcGFyYW1ldGVycyB0byBpbmNsdWRlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gdGhlIGZ1bmN0aW9uIHRvIHJlY2VpdmUgdGhlIGRhdGEuIFRoZSByZXR1cm5lZCBkYXRhIHdpbGwgYWx3YXlzIGJlIGFuIGFycmF5LlxuICAgICogQHBhcmFtIHtPYmplY3RbXX0gcmVzdWx0cyAtIHRoZSBwYXJ0aWFsIHJlc3VsdHMuIFRoaXMgYXJndW1lbnQgaXMgaW50ZW5kZWQgZm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSBhIHByb21pc2Ugd2hpY2ggd2lsbCByZXNvbHZlIHdoZW4gYWxsIHBhZ2VzIGhhdmUgYmVlbiBmZXRjaGVkXG4gICAgKiBAZGVwcmVjYXRlZCBUaGlzIHdpbGwgYmUgZm9sZGVkIGludG8ge0BsaW5rIFJlcXVlc3RhYmxlI19yZXF1ZXN0fSBpbiB0aGUgMi4wIHJlbGVhc2UuXG4gICAgKi9cbiAgIF9yZXF1ZXN0QWxsUGFnZXMocGF0aCwgb3B0aW9ucywgY2IsIHJlc3VsdHMpIHtcbiAgICAgIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgcGF0aCwgb3B0aW9ucylcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHRoaXNHcm91cDtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgIHRoaXNHcm91cCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmRhdGEuaXRlbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgdGhpc0dyb3VwID0gcmVzcG9uc2UuZGF0YS5pdGVtcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGBjYW5ub3QgZmlndXJlIG91dCBob3cgdG8gYXBwZW5kICR7cmVzcG9uc2UuZGF0YX0gdG8gdGhlIHJlc3VsdCBzZXRgO1xuICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlc3BvbnNlRXJyb3IobWVzc2FnZSwgcGF0aCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKC4uLnRoaXNHcm91cCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHRVcmwgPSBnZXROZXh0UGFnZShyZXNwb25zZS5oZWFkZXJzLmxpbmspO1xuICAgICAgICAgICAgaWYgKG5leHRVcmwgJiYgIShvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLnBhZ2UgIT09ICdudW1iZXInKSkge1xuICAgICAgICAgICAgICAgbG9nKGBnZXR0aW5nIG5leHQgcGFnZTogJHtuZXh0VXJsfWApO1xuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhuZXh0VXJsLCBvcHRpb25zLCBjYiwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzdWx0cywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhID0gcmVzdWx0cztcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgIH0pLmNhdGNoKGNhbGxiYWNrRXJyb3JPclRocm93KGNiLCBwYXRoKSk7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdGFibGU7XG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIC8vXG4vLyAgUHJpdmF0ZSBoZWxwZXIgZnVuY3Rpb25zICAvL1xuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cbmNvbnN0IE1FVEhPRFNfV0lUSF9OT19CT0RZID0gWydHRVQnLCAnSEVBRCcsICdERUxFVEUnXTtcbmZ1bmN0aW9uIG1ldGhvZEhhc05vQm9keShtZXRob2QpIHtcbiAgIHJldHVybiBNRVRIT0RTX1dJVEhfTk9fQk9EWS5pbmRleE9mKG1ldGhvZCkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBnZXROZXh0UGFnZShsaW5rc0hlYWRlciA9ICcnKSB7XG4gICBjb25zdCBsaW5rcyA9IGxpbmtzSGVhZGVyLnNwbGl0KC9cXHMqLFxccyovKTsgLy8gc3BsaXRzIGFuZCBzdHJpcHMgdGhlIHVybHNcbiAgIHJldHVybiBsaW5rcy5yZWR1Y2UoZnVuY3Rpb24obmV4dFVybCwgbGluaykge1xuICAgICAgaWYgKGxpbmsuc2VhcmNoKC9yZWw9XCJuZXh0XCIvKSAhPT0gLTEpIHtcbiAgICAgICAgIHJldHVybiAobGluay5tYXRjaCgvPCguKik+LykgfHwgW10pWzFdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV4dFVybDtcbiAgIH0sIHVuZGVmaW5lZCk7XG59XG5cbmZ1bmN0aW9uIGNhbGxiYWNrRXJyb3JPclRocm93KGNiLCBwYXRoKSB7XG4gICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihvYmplY3QpIHtcbiAgICAgIGxldCBlcnJvcjtcbiAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoJ2NvbmZpZycpKSB7XG4gICAgICAgICBjb25zdCB7cmVzcG9uc2U6IHtzdGF0dXMsIHN0YXR1c1RleHR9LCBjb25maWc6IHttZXRob2QsIHVybH19ID0gb2JqZWN0O1xuICAgICAgICAgbGV0IG1lc3NhZ2UgPSAoYCR7c3RhdHVzfSBlcnJvciBtYWtpbmcgcmVxdWVzdCAke21ldGhvZH0gJHt1cmx9OiBcIiR7c3RhdHVzVGV4dH1cImApO1xuICAgICAgICAgZXJyb3IgPSBuZXcgUmVzcG9uc2VFcnJvcihtZXNzYWdlLCBwYXRoLCBvYmplY3QpO1xuICAgICAgICAgbG9nKGAke21lc3NhZ2V9ICR7SlNPTi5zdHJpbmdpZnkob2JqZWN0LmRhdGEpfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGVycm9yID0gb2JqZWN0O1xuICAgICAgfVxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgICBsb2coJ2dvaW5nIHRvIGVycm9yIGNhbGxiYWNrJyk7XG4gICAgICAgICBjYihlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbG9nKCd0aHJvd2luZyBlcnJvcicpO1xuICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICB9O1xufVxuIl19
//# sourceMappingURL=Requestable.js.map
