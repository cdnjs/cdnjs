(function (global, factory) {
   if (typeof define === "function" && define.amd) {
      define(['module', 'axios', 'debug', 'js-base64', 'es6-promise'], factory);
   } else if (typeof exports !== "undefined") {
      factory(module, require('axios'), require('debug'), require('js-base64'), require('es6-promise'));
   } else {
      var mod = {
         exports: {}
      };
      factory(mod, global.axios, global.debug, global.jsBase64, global.Promise);
      global.Requestable = mod.exports;
   }
})(this, function (module, _axios, _debug, _jsBase, _es6Promise) {
   'use strict';

   var _axios2 = _interopRequireDefault(_axios);

   var _debug2 = _interopRequireDefault(_debug);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   function _possibleConstructorReturn(self, call) {
      if (!self) {
         throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
   }

   function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
         throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
         constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
         }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
   }

   var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
   } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
   };

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var _createClass = function () {
      function defineProperties(target, props) {
         for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
         }
      }

      return function (Constructor, protoProps, staticProps) {
         if (protoProps) defineProperties(Constructor.prototype, protoProps);
         if (staticProps) defineProperties(Constructor, staticProps);
         return Constructor;
      };
   }();

   var log = (0, _debug2.default)('github:request');

   if (typeof Promise === 'undefined') {
      (0, _es6Promise.polyfill)();
   }

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
       */

      function Requestable(auth, apiBase) {
         _classCallCheck(this, Requestable);

         this.__apiBase = apiBase || 'https://api.github.com';
         this.__auth = {
            token: auth.token,
            username: auth.username,
            password: auth.password
         };

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
      }, {
         key: '__getRequestHeaders',
         value: function __getRequestHeaders(raw) {
            var headers = {
               'Accept': raw ? 'application/vnd.github.v3.raw+json' : 'application/vnd.github.v3+json',
               'Content-Type': 'application/json;charset=UTF-8'
            };

            if (this.__authorizationHeader) {
               headers.Authorization = this.__authorizationHeader;
            }

            return headers;
         }
      }, {
         key: '_getOptionsWithDefaults',
         value: function _getOptionsWithDefaults() {
            var requestOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            requestOptions.type = requestOptions.type || 'all';
            requestOptions.sort = requestOptions.sort || 'updated';
            requestOptions.per_page = requestOptions.per_page || '100'; // jscs:ignore

            return requestOptions;
         }
      }, {
         key: '_dateToISO',
         value: function _dateToISO(date) {
            if (date && date instanceof Date) {
               date = date.toISOString();
            }

            return date;
         }
      }, {
         key: '_request',
         value: function _request(method, path, data, cb, raw) {
            var url = this.__getURL(path);
            var headers = this.__getRequestHeaders(raw);
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
                  cb(null, response.data || true, response);
               });
            }

            return requestPromise;
         }
      }, {
         key: '_request204or404',
         value: function _request204or404(path, data, cb) {
            return this._request('GET', path, data).then(function success(response) {
               if (cb) {
                  cb(null, true, response);
               }
               return true;
            }, function failure(response) {
               if (response.status === 404) {
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
      }, {
         key: '_requestAllPages',
         value: function _requestAllPages(path, options, cb, results) {
            var _this = this;

            results = results || [];

            return this._request('GET', path, options).then(function (response) {
               results.push.apply(results, response.data);

               var nextUrl = getNextPage(response.headers.link);
               if (nextUrl) {
                  log('getting next page: ' + nextUrl);
                  return _this._requestAllPages(nextUrl, options, cb, results);
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

   var ResponseError = function (_Error) {
      _inherits(ResponseError, _Error);

      function ResponseError(path, response) {
         _classCallCheck(this, ResponseError);

         var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ResponseError).call(this, 'error making request ' + response.config.method + ' ' + response.config.url));

         _this2.path = path;
         _this2.request = response.config;
         _this2.response = response;
         _this2.status = response.status;
         return _this2;
      }

      return ResponseError;
   }(Error);

   var METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];
   function methodHasNoBody(method) {
      return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
   }

   function getNextPage() {
      var linksHeader = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var links = linksHeader.split(/\s*,\s*/); // splits and strips the urls
      return links.reduce(function (nextUrl, link) {
         if (link.search(/rel="next"/) !== -1) {
            return (link.match(/<(.*)>/) || [])[1];
         }

         return nextUrl;
      }, undefined);
   }

   function callbackErrorOrThrow(cb, path) {
      return function handler(response) {
         log('error making request ' + response.config.method + ' ' + response.config.url + ' ' + JSON.stringify(response.data));
         var error = new ResponseError(path, response);
         if (cb) {
            log('going to error callback');
            cb(error);
         } else {
            log('throwing error');
            throw error;
         }
      };
   }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVlc3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFNLE1BQU0scUJBQU0sZ0JBQU4sQ0FBWjs7QUFFQSxPQUFJLE9BQU8sT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNqQztBQUNGOzs7Ozs7T0FLSyxXOzs7Ozs7Ozs7Ozs7Ozs7QUFjSCwyQkFBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCO0FBQUE7O0FBQ3hCLGNBQUssU0FBTCxHQUFpQixXQUFXLHdCQUE1QjtBQUNBLGNBQUssTUFBTCxHQUFjO0FBQ1gsbUJBQU8sS0FBSyxLQUREO0FBRVgsc0JBQVUsS0FBSyxRQUZKO0FBR1gsc0JBQVUsS0FBSztBQUhKLFVBQWQ7O0FBTUEsYUFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDYixpQkFBSyxxQkFBTCxHQUE2QixXQUFXLEtBQUssS0FBN0M7QUFDRixVQUZELE1BRU8sSUFBSSxLQUFLLFFBQUwsSUFBaUIsS0FBSyxRQUExQixFQUFvQztBQUN4QyxpQkFBSyxxQkFBTCxHQUE2QixXQUFXLGVBQU8sTUFBUCxDQUFjLEtBQUssUUFBTCxHQUFnQixHQUFoQixHQUFzQixLQUFLLFFBQXpDLENBQXhDO0FBQ0Y7QUFDSDs7Ozs7Ozs7Ozs7O2tDQVFRLEksRUFBTTtBQUNaLGdCQUFJLE1BQU0sSUFBVjs7QUFFQSxnQkFBSSxLQUFLLE9BQUwsQ0FBYSxJQUFiLE1BQXVCLENBQUMsQ0FBNUIsRUFBK0I7QUFDNUIscUJBQU0sS0FBSyxTQUFMLEdBQWlCLElBQXZCO0FBQ0Y7O0FBRUQsZ0JBQUksaUJBQWlCLGVBQWUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFwQztBQUNBLG1CQUFPLElBQUksT0FBSixDQUFZLGlCQUFaLEVBQStCLGNBQS9CLENBQVA7QUFDRjs7OzZDQVFtQixHLEVBQUs7QUFDdEIsZ0JB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QixDQUFkLEM7QUFDQSxhQUFPLE1BQU0sTUFBTixDQUFhLFVBQVMsT0FBVCxFQUFrQixJQUFsQixFQUF3QjtBQUN6QyxhQUFJLEtBQUssTUFBTCxDQUFZLFlBQVosTUFBOEIsQ0FBQyxDQUFuQyxFQUFzQztBQUNuQyxtQkFBTyxDQUFDLEtBQUssS0FBTCxDQUFXLFFBQVgsS0FBd0IsRUFBekIsRUFBNkIsQ0FBN0IsQ0FBUDtBQUNGOztBQUVELGdCQUFPLE9BQVA7QUFDRixPQU5NLEVBTUosU0FOSSxDQUFQO0FBT0Y7O0FBRUQsWUFBUyxvQkFBVCxDQUE4QixFQUE5QixFQUFrQyxJQUFsQyxFQUF3QztBQUNyQyxhQUFPLFNBQVMsT0FBVCxDQUFpQixRQUFqQixFQUEyQjtBQUMvQix1Q0FBNEIsU0FBUyxNQUFULENBQWdCLE1BQTVDLFNBQXNELFNBQVMsTUFBVCxDQUFnQixHQUF0RSxTQUE2RSxLQUFLLFNBQUwsQ0FBZSxTQUFTLElBQXhCLENBQTdFO0FBQ0EsYUFBSSxRQUFRLElBQUksYUFBSixDQUFrQixJQUFsQixFQUF3QixRQUF4QixDQUFaO0FBQ0EsYUFBSSxFQUFKLEVBQVE7QUFDTCxnQkFBSSx5QkFBSjtBQUNBLGVBQUcsS0FBSDtBQUNGLFVBSEQsTUFHTztBQUNKLGdCQUFJLGdCQUFKO0FBQ0Esa0JBQU0sS0FBTjtBQUNGO0FBQ0gsT0FWRDtBQVdGIiwiZmlsZSI6IlJlcXVlc3RhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxNiBZYWhvbyBJbmMuXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxuICovXG5cbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHtCYXNlNjR9IGZyb20gJ2pzLWJhc2U2NCc7XG5pbXBvcnQge3BvbHlmaWxsfSBmcm9tICdlczYtcHJvbWlzZSc7XG5cbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6cmVxdWVzdCcpO1xuXG5pZiAodHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICBwb2x5ZmlsbCgpO1xufVxuXG4vKipcbiAqIFJlcXVlc3RhYmxlIHdyYXBzIHRoZSBsb2dpYyBmb3IgbWFraW5nIGh0dHAgcmVxdWVzdHMgdG8gdGhlIEFQSVxuICovXG5jbGFzcyBSZXF1ZXN0YWJsZSB7XG4gICAvKipcbiAgICAqIEVpdGhlciBhIHVzZXJuYW1lIGFuZCBwYXNzd29yZCBvciBhbiBvYXV0aCB0b2tlbiBmb3IgR2l0aHViXG4gICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBSZXF1ZXN0YWJsZS5hdXRoXG4gICAgKiBAcHJvcCB7c3RyaW5nfSBbdXNlcm5hbWVdIC0gdGhlIEdpdGh1YiB1c2VybmFtZVxuICAgICogQHByb3Age3N0cmluZ30gW3Bhc3N3b3JkXSAtIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAqIEBwcm9wIHt0b2tlbn0gW3Rva2VuXSAtIGFuIE9BdXRoIHRva2VuXG4gICAgKi9cbiAgIC8qKlxuICAgICogSW5pdGlhbGl6ZSB0aGUgaHR0cCBpbnRlcm5hbHMuXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIHRoZSBjcmVkZW50aWFscyB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViLiBJZiBhdXRoIGlzXG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgcHJvdmlkZWQgcmVxdWVzdCB3aWxsIGJlIG1hZGUgdW5hdXRoZW50aWNhdGVkXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxuICAgICovXG4gICBjb25zdHJ1Y3RvcihhdXRoLCBhcGlCYXNlKSB7XG4gICAgICB0aGlzLl9fYXBpQmFzZSA9IGFwaUJhc2UgfHwgJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20nO1xuICAgICAgdGhpcy5fX2F1dGggPSB7XG4gICAgICAgICB0b2tlbjogYXV0aC50b2tlbixcbiAgICAgICAgIHVzZXJuYW1lOiBhdXRoLnVzZXJuYW1lLFxuICAgICAgICAgcGFzc3dvcmQ6IGF1dGgucGFzc3dvcmRcbiAgICAgIH07XG5cbiAgICAgIGlmIChhdXRoLnRva2VuKSB7XG4gICAgICAgICB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlciA9ICd0b2tlbiAnICsgYXV0aC50b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAoYXV0aC51c2VybmFtZSAmJiBhdXRoLnBhc3N3b3JkKSB7XG4gICAgICAgICB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlciA9ICdCYXNpYyAnICsgQmFzZTY0LmVuY29kZShhdXRoLnVzZXJuYW1lICsgJzonICsgYXV0aC5wYXNzd29yZCk7XG4gICAgICB9XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ29tcHV0ZSB0aGUgVVJMIHRvIHVzZSB0byBtYWtlIGEgcmVxdWVzdC5cbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGVpdGhlciBhIFVSTCByZWxhdGl2ZSB0byB0aGUgQVBJIGJhc2Ugb3IgYW4gYWJzb2x1dGUgVVJMXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIFVSTCB0byB1c2VcbiAgICAqL1xuICAgX19nZXRVUkwocGF0aCkge1xuICAgICAgbGV0IHVybCA9IHBhdGg7XG5cbiAgICAgIGlmIChwYXRoLmluZGV4T2YoJy8vJykgPT09IC0xKSB7XG4gICAgICAgICB1cmwgPSB0aGlzLl9fYXBpQmFzZSArIHBhdGg7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdDYWNoZUJ1c3RlciA9ICd0aW1lc3RhbXA9JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKC8odGltZXN0YW1wPVxcZCspLywgbmV3Q2FjaGVCdXN0ZXIpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbXB1dGUgdGhlIGhlYWRlcnMgcmVxdWlyZWQgZm9yIGFuIEFQSSByZXF1ZXN0LlxuICAgICogQHByaXZhdGVcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmF3IC0gaWYgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgSlNPTiBvciBhcyBhIHJhdyByZXF1ZXN0XG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIGhlYWRlcnMgdG8gdXNlIGluIHRoZSByZXF1ZXN0XG4gICAgKi9cbiAgIF9fZ2V0UmVxdWVzdEhlYWRlcnMocmF3KSB7XG4gICAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgICAgICdBY2NlcHQnOiByYXcgPyAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi52My5yYXcranNvbicgOiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi52Mytqc29uJyxcbiAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04J1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuX19hdXRob3JpemF0aW9uSGVhZGVyKSB7XG4gICAgICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSB0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU2V0cyB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBBUEkgcmVxdWVzdHNcbiAgICAqIEBwcm90ZWN0ZWRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdE9wdGlvbnM9e31dIC0gdGhlIGN1cnJlbnQgb3B0aW9ucyBmb3IgdGhlIHJlcXVlc3RcbiAgICAqIEByZXR1cm4gLSB0aGUgb3B0aW9ucyB0byBwYXNzIHRvIHRoZSByZXF1ZXN0XG4gICAgKi9cbiAgIF9nZXRPcHRpb25zV2l0aERlZmF1bHRzKHJlcXVlc3RPcHRpb25zID0ge30pIHtcbiAgICAgIHJlcXVlc3RPcHRpb25zLnR5cGUgPSByZXF1ZXN0T3B0aW9ucy50eXBlIHx8ICdhbGwnO1xuICAgICAgcmVxdWVzdE9wdGlvbnMuc29ydCA9IHJlcXVlc3RPcHRpb25zLnNvcnQgfHwgJ3VwZGF0ZWQnO1xuICAgICAgcmVxdWVzdE9wdGlvbnMucGVyX3BhZ2UgPSByZXF1ZXN0T3B0aW9ucy5wZXJfcGFnZSB8fCAnMTAwJzsgLy8ganNjczppZ25vcmVcblxuICAgICAgcmV0dXJuIHJlcXVlc3RPcHRpb25zO1xuICAgfVxuXG4gICAvKipcbiAgICAqIGlmIGEgYERhdGVgIGlzIHBhc3NlZCB0byB0aGlzIGZ1bmN0aW9uIGl0IHdpbGwgYmUgY29udmVydGVkIHRvIGFuIElTTyBzdHJpbmdcbiAgICAqIEBwYXJhbSB7Kn0gZGF0ZSAtIHRoZSBvYmplY3QgdG8gYXR0ZW1wdCB0byBjb29lcmNlIGludG8gYW4gSVNPIGRhdGUgc3RyaW5nXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIElTTyByZXByZXNlbnRhdGlvbiBvZiBgZGF0ZWAgb3Igd2hhdGV2ZXIgd2FzIHBhc3NlZCBpbiBpZiBpdCB3YXMgbm90IGEgZGF0ZVxuICAgICovXG4gICBfZGF0ZVRvSVNPKGRhdGUpIHtcbiAgICAgIGlmIChkYXRlICYmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgIGRhdGUgPSBkYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRlO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEEgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgcmVzdWx0IG9mIHRoZSBBUEkgcmVxdWVzdC5cbiAgICAqIEBjYWxsYmFjayBSZXF1ZXN0YWJsZS5jYWxsYmFja1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5FcnJvcn0gZXJyb3IgLSB0aGUgZXJyb3IgcmV0dXJuZWQgYnkgdGhlIEFQSSBvciBgbnVsbGBcbiAgICAqIEBwYXJhbSB7KE9iamVjdHx0cnVlKX0gcmVzdWx0IC0gdGhlIGRhdGEgcmV0dXJuZWQgYnkgdGhlIEFQSSBvciBgdHJ1ZWAgaWYgdGhlIEFQSSByZXR1cm5zIGAyMDQgTm8gQ29udGVudGBcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0IC0gdGhlIHJhdyB7QGxpbmtjb2RlIGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL2F4aW9zI3Jlc3BvbnNlLXNjaGVtYSBSZXNwb25zZX1cbiAgICAqL1xuICAgLyoqXG4gICAgKiBNYWtlIGEgcmVxdWVzdC5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgLSB0aGUgbWV0aG9kIGZvciB0aGUgcmVxdWVzdCAoR0VULCBQVVQsIFBPU1QsIERFTEVURSlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggZm9yIHRoZSByZXF1ZXN0XG4gICAgKiBAcGFyYW0geyp9IFtkYXRhXSAtIHRoZSBkYXRhIHRvIHNlbmQgdG8gdGhlIHNlcnZlci4gRm9yIEhUVFAgbWV0aG9kcyB0aGF0IGRvbid0IGhhdmUgYSBib2R5IHRoZSBkYXRhXG4gICAgKiAgICAgICAgICAgICAgICAgICB3aWxsIGJlIHNlbnQgYXMgcXVlcnkgcGFyYW1ldGVyc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHRoZSBjYWxsYmFjayBmb3IgdGhlIHJlcXVlc3RcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jhdz1mYWxzZV0gLSBpZiB0aGUgcmVxdWVzdCBzaG91bGQgYmUgc2VudCBhcyByYXcuIElmIHRoaXMgaXMgYSBmYWxzeSB2YWx1ZSB0aGVuIHRoZVxuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0IHdpbGwgYmUgbWFkZSBhcyBKU09OXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBQcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIF9yZXF1ZXN0KG1ldGhvZCwgcGF0aCwgZGF0YSwgY2IsIHJhdykge1xuICAgICAgY29uc3QgdXJsID0gdGhpcy5fX2dldFVSTChwYXRoKTtcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLl9fZ2V0UmVxdWVzdEhlYWRlcnMocmF3KTtcbiAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHt9O1xuXG4gICAgICBjb25zdCBzaG91bGRVc2VEYXRhQXNQYXJhbXMgPSBkYXRhICYmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpICYmIG1ldGhvZEhhc05vQm9keShtZXRob2QpO1xuICAgICAgaWYgKHNob3VsZFVzZURhdGFBc1BhcmFtcykge1xuICAgICAgICAgcXVlcnlQYXJhbXMgPSBkYXRhO1xuICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICBwYXJhbXM6IHF1ZXJ5UGFyYW1zLFxuICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgIHJlc3BvbnNlVHlwZTogcmF3ID8gJ3RleHQnIDogJ2pzb24nXG4gICAgICB9O1xuXG4gICAgICBsb2coYCR7Y29uZmlnLm1ldGhvZH0gdG8gJHtjb25maWcudXJsfWApO1xuICAgICAgY29uc3QgcmVxdWVzdFByb21pc2UgPSBheGlvcyhjb25maWcpLmNhdGNoKGNhbGxiYWNrRXJyb3JPclRocm93KGNiLCBwYXRoKSk7XG5cbiAgICAgIGlmIChjYikge1xuICAgICAgICAgcmVxdWVzdFByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNiKG51bGwsIHJlc3BvbnNlLmRhdGEgfHwgdHJ1ZSwgcmVzcG9uc2UpO1xuICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXF1ZXN0UHJvbWlzZTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBNYWtlIGEgcmVxdWVzdCB0byBhbiBlbmRwb2ludCB0aGUgcmV0dXJucyAyMDQgd2hlbiB0cnVlIGFuZCA0MDQgd2hlbiBmYWxzZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCB0byByZXF1ZXN0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGFueSBxdWVyeSBwYXJhbWV0ZXJzIGZvciB0aGUgcmVxdWVzdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB0aGUgY2FsbGJhY2sgdGhhdCB3aWxsIHJlY2VpdmUgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgX3JlcXVlc3QyMDRvcjQwNChwYXRoLCBkYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHBhdGgsIGRhdGEpXG4gICAgICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgIGNiKG51bGwsIHRydWUsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgfSwgZnVuY3Rpb24gZmFpbHVyZShyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgIGNiKG51bGwsIGZhbHNlLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgY2IocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBNYWtlIGEgcmVxdWVzdCBhbmQgZmV0Y2ggYWxsIHRoZSBhdmFpbGFibGUgZGF0YS4gR2l0aHViIHdpbGwgcGFnaW5hdGUgcmVzcG9uc2VzIHNvIGZvciBxdWVyaWVzXG4gICAgKiB0aGF0IG1pZ2h0IHNwYW4gbXVsdGlwbGUgcGFnZXMgdGhpcyBtZXRob2QgaXMgcHJlZmVycmVkIHRvIHtAbGluayBSZXF1ZXN0YWJsZSNyZXF1ZXN0fVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCB0byByZXF1ZXN0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB0aGUgZnVuY3Rpb24gdG8gcmVjZWl2ZSB0aGUgZGF0YS4gVGhlIHJldHVybmVkIGRhdGEgd2lsbCBhbHdheXMgYmUgYW4gYXJyYXkuXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSByZXN1bHRzIC0gdGhlIHBhcnRpYWwgcmVzdWx0cy4gVGhpcyBhcmd1bWVudCBpcyBpbnRlbmRlZCBmb3IgaW50ZXJhbCB1c2Ugb25seS5cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gYSBwcm9taXNlIHdoaWNoIHdpbGwgcmVzb2x2ZSB3aGVuIGFsbCBwYWdlcyBoYXZlIGJlZW4gZmV0Y2hlZFxuICAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIGZvbGRlZCBpbnRvIHtAbGluayBSZXF1ZXN0YWJsZSNfcmVxdWVzdH0gaW4gdGhlIDIuMCByZWxlYXNlLlxuICAgICovXG4gICBfcmVxdWVzdEFsbFBhZ2VzKHBhdGgsIG9wdGlvbnMsIGNiLCByZXN1bHRzKSB7XG4gICAgICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHBhdGgsIG9wdGlvbnMpXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaC5hcHBseShyZXN1bHRzLCByZXNwb25zZS5kYXRhKTtcblxuICAgICAgICAgICAgY29uc3QgbmV4dFVybCA9IGdldE5leHRQYWdlKHJlc3BvbnNlLmhlYWRlcnMubGluayk7XG4gICAgICAgICAgICBpZiAobmV4dFVybCkge1xuICAgICAgICAgICAgICAgbG9nKGBnZXR0aW5nIG5leHQgcGFnZTogJHtuZXh0VXJsfWApO1xuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhuZXh0VXJsLCBvcHRpb25zLCBjYiwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzdWx0cywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhID0gcmVzdWx0cztcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgIH0pLmNhdGNoKGNhbGxiYWNrRXJyb3JPclRocm93KGNiLCBwYXRoKSk7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdGFibGU7XG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIC8vXG4vLyAgUHJpdmF0ZSBoZWxwZXIgZnVuY3Rpb25zICAvL1xuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cbmNsYXNzIFJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICBjb25zdHJ1Y3RvcihwYXRoLCByZXNwb25zZSkge1xuICAgICAgc3VwZXIoYGVycm9yIG1ha2luZyByZXF1ZXN0ICR7cmVzcG9uc2UuY29uZmlnLm1ldGhvZH0gJHtyZXNwb25zZS5jb25maWcudXJsfWApO1xuICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgIHRoaXMucmVxdWVzdCA9IHJlc3BvbnNlLmNvbmZpZztcbiAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgfVxufVxuXG5jb25zdCBNRVRIT0RTX1dJVEhfTk9fQk9EWSA9IFsnR0VUJywgJ0hFQUQnLCAnREVMRVRFJ107XG5mdW5jdGlvbiBtZXRob2RIYXNOb0JvZHkobWV0aG9kKSB7XG4gICByZXR1cm4gTUVUSE9EU19XSVRIX05PX0JPRFkuaW5kZXhPZihtZXRob2QpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0TmV4dFBhZ2UobGlua3NIZWFkZXIgPSAnJykge1xuICAgY29uc3QgbGlua3MgPSBsaW5rc0hlYWRlci5zcGxpdCgvXFxzKixcXHMqLyk7IC8vIHNwbGl0cyBhbmQgc3RyaXBzIHRoZSB1cmxzXG4gICByZXR1cm4gbGlua3MucmVkdWNlKGZ1bmN0aW9uKG5leHRVcmwsIGxpbmspIHtcbiAgICAgIGlmIChsaW5rLnNlYXJjaCgvcmVsPVwibmV4dFwiLykgIT09IC0xKSB7XG4gICAgICAgICByZXR1cm4gKGxpbmsubWF0Y2goLzwoLiopPi8pIHx8IFtdKVsxXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5leHRVcmw7XG4gICB9LCB1bmRlZmluZWQpO1xufVxuXG5mdW5jdGlvbiBjYWxsYmFja0Vycm9yT3JUaHJvdyhjYiwgcGF0aCkge1xuICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIocmVzcG9uc2UpIHtcbiAgICAgIGxvZyhgZXJyb3IgbWFraW5nIHJlcXVlc3QgJHtyZXNwb25zZS5jb25maWcubWV0aG9kfSAke3Jlc3BvbnNlLmNvbmZpZy51cmx9ICR7SlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YSl9YCk7XG4gICAgICBsZXQgZXJyb3IgPSBuZXcgUmVzcG9uc2VFcnJvcihwYXRoLCByZXNwb25zZSk7XG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgIGxvZygnZ29pbmcgdG8gZXJyb3IgY2FsbGJhY2snKTtcbiAgICAgICAgIGNiKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBsb2coJ3Rocm93aW5nIGVycm9yJyk7XG4gICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgIH07XG59XG4iXX0=
//# sourceMappingURL=Requestable.js.map
