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

            if (!(requestOptions.visibility || requestOptions.affiliation)) {
               requestOptions.type = requestOptions.type || 'all';
            }
            requestOptions.sort = requestOptions.sort || 'updated';
            requestOptions.per_page = requestOptions.per_page || '100'; // eslint-disable-line

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
            var method = arguments.length <= 3 || arguments[3] === undefined ? 'GET' : arguments[3];

            return this._request(method, path, data).then(function success(response) {
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
   /**
    * The error structure returned when a network call fails
    */

   var ResponseError = function (_Error) {
      _inherits(ResponseError, _Error);

      /**
       * Construct a new ResponseError
       * @param {string} path - the requested path
       * @param {Object} response - the object returned by Axios
       */

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVlc3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFNLE1BQU0scUJBQU0sZ0JBQU4sQ0FBWjs7QUFFQSxPQUFJLE9BQU8sT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNqQztBQUNGOzs7Ozs7T0FLSyxXOzs7Ozs7Ozs7Ozs7Ozs7QUFjSCwyQkFBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCO0FBQUE7O0FBQ3hCLGNBQUssU0FBTCxHQUFpQixXQUFXLHdCQUE1QjtBQUNBLGNBQUssTUFBTCxHQUFjO0FBQ1gsbUJBQU8sS0FBSyxLQUREO0FBRVgsc0JBQVUsS0FBSyxRQUZKO0FBR1gsc0JBQVUsS0FBSztBQUhKLFVBQWQ7O0FBTUEsYUFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDYixpQkFBSyxxQkFBTCxHQUE2QixXQUFXLEtBQUssS0FBN0M7QUFDRixVQUZELE1BRU8sSUFBSSxLQUFLLFFBQUwsSUFBaUIsS0FBSyxRQUExQixFQUFvQztBQUN4QyxpQkFBSyxxQkFBTCxHQUE2QixXQUFXLGVBQU8sTUFBUCxDQUFjLEtBQUssUUFBTCxHQUFnQixHQUFoQixHQUFzQixLQUFLLFFBQXpDLENBQXhDO0FBQ0Y7QUFDSDs7Ozs7Ozs7Ozs7O2tDQVFRLEksRUFBTTtBQUNaLGdCQUFJLE1BQU0sSUFBVjs7QUFFQSxnQkFBSSxLQUFLLE9BQUwsQ0FBYSxJQUFiLE1BQXVCLENBQUMsQ0FBNUIsRUFBK0I7QUFDNUIscUJBQU0sS0FBSyxTQUFMLEdBQWlCLElBQXZCO0FBQ0Y7O0FBRUQsZ0JBQUksaUJBQWlCLGVBQWUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFwQztBQUNBLG1CQUFPLElBQUksT0FBSixDQUFZLGlCQUFaLEVBQStCLGNBQS9CLENBQVA7QUFDRjs7OzZDQVFtQixHLEVBQUs7QUFDdEIsZ0JB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QyxDQUFqRDtBQUNGOztBQUVELFlBQVMsV0FBVCxHQUF1QztBQUFBLFVBQWxCLFdBQWtCLHlEQUFKLEVBQUk7O0FBQ3BDLFVBQU0sUUFBUSxZQUFZLEtBQVosQ0FBa0IsU0FBbEIsQ0FBZCxDO0FBQ0EsYUFBTyxNQUFNLE1BQU4sQ0FBYSxVQUFTLE9BQVQsRUFBa0IsSUFBbEIsRUFBd0I7QUFDekMsYUFBSSxLQUFLLE1BQUwsQ0FBWSxZQUFaLE1BQThCLENBQUMsQ0FBbkMsRUFBc0M7QUFDbkMsbUJBQU8sQ0FBQyxLQUFLLEtBQUwsQ0FBVyxRQUFYLEtBQXdCLEVBQXpCLEVBQTZCLENBQTdCLENBQVA7QUFDRjs7QUFFRCxnQkFBTyxPQUFQO0FBQ0YsT0FOTSxFQU1KLFNBTkksQ0FBUDtBQU9GOztBQUVELFlBQVMsb0JBQVQsQ0FBOEIsRUFBOUIsRUFBa0MsSUFBbEMsRUFBd0M7QUFDckMsYUFBTyxTQUFTLE9BQVQsQ0FBaUIsUUFBakIsRUFBMkI7QUFDL0IsdUNBQTRCLFNBQVMsTUFBVCxDQUFnQixNQUE1QyxTQUFzRCxTQUFTLE1BQVQsQ0FBZ0IsR0FBdEUsU0FBNkUsS0FBSyxTQUFMLENBQWUsU0FBUyxJQUF4QixDQUE3RTtBQUNBLGFBQUksUUFBUSxJQUFJLGFBQUosQ0FBa0IsSUFBbEIsRUFBd0IsUUFBeEIsQ0FBWjtBQUNBLGFBQUksRUFBSixFQUFRO0FBQ0wsZ0JBQUkseUJBQUo7QUFDQSxlQUFHLEtBQUg7QUFDRixVQUhELE1BR087QUFDSixnQkFBSSxnQkFBSjtBQUNBLGtCQUFNLEtBQU47QUFDRjtBQUNILE9BVkQ7QUFXRiIsImZpbGUiOiJSZXF1ZXN0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCB7QmFzZTY0fSBmcm9tICdqcy1iYXNlNjQnO1xuaW1wb3J0IHtwb2x5ZmlsbH0gZnJvbSAnZXM2LXByb21pc2UnO1xuXG5jb25zdCBsb2cgPSBkZWJ1ZygnZ2l0aHViOnJlcXVlc3QnKTtcblxuaWYgKHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJykge1xuICAgcG9seWZpbGwoKTtcbn1cblxuLyoqXG4gKiBSZXF1ZXN0YWJsZSB3cmFwcyB0aGUgbG9naWMgZm9yIG1ha2luZyBodHRwIHJlcXVlc3RzIHRvIHRoZSBBUElcbiAqL1xuY2xhc3MgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBFaXRoZXIgYSB1c2VybmFtZSBhbmQgcGFzc3dvcmQgb3IgYW4gb2F1dGggdG9rZW4gZm9yIEdpdGh1YlxuICAgICogQHR5cGVkZWYge09iamVjdH0gUmVxdWVzdGFibGUuYXV0aFxuICAgICogQHByb3Age3N0cmluZ30gW3VzZXJuYW1lXSAtIHRoZSBHaXRodWIgdXNlcm5hbWVcbiAgICAqIEBwcm9wIHtzdHJpbmd9IFtwYXNzd29yZF0gLSB0aGUgdXNlcidzIHBhc3N3b3JkXG4gICAgKiBAcHJvcCB7dG9rZW59IFt0b2tlbl0gLSBhbiBPQXV0aCB0b2tlblxuICAgICovXG4gICAvKipcbiAgICAqIEluaXRpYWxpemUgdGhlIGh0dHAgaW50ZXJuYWxzLlxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1Yi4gSWYgYXV0aCBpc1xuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IHByb3ZpZGVkIHJlcXVlc3Qgd2lsbCBiZSBtYWRlIHVuYXV0aGVudGljYXRlZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IoYXV0aCwgYXBpQmFzZSkge1xuICAgICAgdGhpcy5fX2FwaUJhc2UgPSBhcGlCYXNlIHx8ICdodHRwczovL2FwaS5naXRodWIuY29tJztcbiAgICAgIHRoaXMuX19hdXRoID0ge1xuICAgICAgICAgdG9rZW46IGF1dGgudG9rZW4sXG4gICAgICAgICB1c2VybmFtZTogYXV0aC51c2VybmFtZSxcbiAgICAgICAgIHBhc3N3b3JkOiBhdXRoLnBhc3N3b3JkXG4gICAgICB9O1xuXG4gICAgICBpZiAoYXV0aC50b2tlbikge1xuICAgICAgICAgdGhpcy5fX2F1dGhvcml6YXRpb25IZWFkZXIgPSAndG9rZW4gJyArIGF1dGgudG9rZW47XG4gICAgICB9IGVsc2UgaWYgKGF1dGgudXNlcm5hbWUgJiYgYXV0aC5wYXNzd29yZCkge1xuICAgICAgICAgdGhpcy5fX2F1dGhvcml6YXRpb25IZWFkZXIgPSAnQmFzaWMgJyArIEJhc2U2NC5lbmNvZGUoYXV0aC51c2VybmFtZSArICc6JyArIGF1dGgucGFzc3dvcmQpO1xuICAgICAgfVxuICAgfVxuXG4gICAvKipcbiAgICAqIENvbXB1dGUgdGhlIFVSTCB0byB1c2UgdG8gbWFrZSBhIHJlcXVlc3QuXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBlaXRoZXIgYSBVUkwgcmVsYXRpdmUgdG8gdGhlIEFQSSBiYXNlIG9yIGFuIGFic29sdXRlIFVSTFxuICAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBVUkwgdG8gdXNlXG4gICAgKi9cbiAgIF9fZ2V0VVJMKHBhdGgpIHtcbiAgICAgIGxldCB1cmwgPSBwYXRoO1xuXG4gICAgICBpZiAocGF0aC5pbmRleE9mKCcvLycpID09PSAtMSkge1xuICAgICAgICAgdXJsID0gdGhpcy5fX2FwaUJhc2UgKyBwYXRoO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3Q2FjaGVCdXN0ZXIgPSAndGltZXN0YW1wPScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHJldHVybiB1cmwucmVwbGFjZSgvKHRpbWVzdGFtcD1cXGQrKS8sIG5ld0NhY2hlQnVzdGVyKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDb21wdXRlIHRoZSBoZWFkZXJzIHJlcXVpcmVkIGZvciBhbiBBUEkgcmVxdWVzdC5cbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJhdyAtIGlmIHRoZSByZXF1ZXN0IHNob3VsZCBiZSB0cmVhdGVkIGFzIEpTT04gb3IgYXMgYSByYXcgcmVxdWVzdFxuICAgICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBoZWFkZXJzIHRvIHVzZSBpbiB0aGUgcmVxdWVzdFxuICAgICovXG4gICBfX2dldFJlcXVlc3RIZWFkZXJzKHJhdykge1xuICAgICAgbGV0IGhlYWRlcnMgPSB7XG4gICAgICAgICAnQWNjZXB0JzogcmF3ID8gJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIudjMucmF3K2pzb24nIDogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIudjMranNvbicsXG4gICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCdcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLl9fYXV0aG9yaXphdGlvbkhlYWRlcikge1xuICAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gdGhpcy5fX2F1dGhvcml6YXRpb25IZWFkZXI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFNldHMgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgQVBJIHJlcXVlc3RzXG4gICAgKiBAcHJvdGVjdGVkXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RPcHRpb25zPXt9XSAtIHRoZSBjdXJyZW50IG9wdGlvbnMgZm9yIHRoZSByZXF1ZXN0XG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgcmVxdWVzdFxuICAgICovXG4gICBfZ2V0T3B0aW9uc1dpdGhEZWZhdWx0cyhyZXF1ZXN0T3B0aW9ucyA9IHt9KSB7XG4gICAgICBpZiAoIShyZXF1ZXN0T3B0aW9ucy52aXNpYmlsaXR5IHx8IHJlcXVlc3RPcHRpb25zLmFmZmlsaWF0aW9uKSkge1xuICAgICAgICAgcmVxdWVzdE9wdGlvbnMudHlwZSA9IHJlcXVlc3RPcHRpb25zLnR5cGUgfHwgJ2FsbCc7XG4gICAgICB9XG4gICAgICByZXF1ZXN0T3B0aW9ucy5zb3J0ID0gcmVxdWVzdE9wdGlvbnMuc29ydCB8fCAndXBkYXRlZCc7XG4gICAgICByZXF1ZXN0T3B0aW9ucy5wZXJfcGFnZSA9IHJlcXVlc3RPcHRpb25zLnBlcl9wYWdlIHx8ICcxMDAnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgIHJldHVybiByZXF1ZXN0T3B0aW9ucztcbiAgIH1cblxuICAgLyoqXG4gICAgKiBpZiBhIGBEYXRlYCBpcyBwYXNzZWQgdG8gdGhpcyBmdW5jdGlvbiBpdCB3aWxsIGJlIGNvbnZlcnRlZCB0byBhbiBJU08gc3RyaW5nXG4gICAgKiBAcGFyYW0geyp9IGRhdGUgLSB0aGUgb2JqZWN0IHRvIGF0dGVtcHQgdG8gY29vZXJjZSBpbnRvIGFuIElTTyBkYXRlIHN0cmluZ1xuICAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBJU08gcmVwcmVzZW50YXRpb24gb2YgYGRhdGVgIG9yIHdoYXRldmVyIHdhcyBwYXNzZWQgaW4gaWYgaXQgd2FzIG5vdCBhIGRhdGVcbiAgICAqL1xuICAgX2RhdGVUb0lTTyhkYXRlKSB7XG4gICAgICBpZiAoZGF0ZSAmJiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICBkYXRlID0gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0ZTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBBIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHJlc3VsdCBvZiB0aGUgQVBJIHJlcXVlc3QuXG4gICAgKiBAY2FsbGJhY2sgUmVxdWVzdGFibGUuY2FsbGJhY2tcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuRXJyb3J9IGVycm9yIC0gdGhlIGVycm9yIHJldHVybmVkIGJ5IHRoZSBBUEkgb3IgYG51bGxgXG4gICAgKiBAcGFyYW0geyhPYmplY3R8dHJ1ZSl9IHJlc3VsdCAtIHRoZSBkYXRhIHJldHVybmVkIGJ5IHRoZSBBUEkgb3IgYHRydWVgIGlmIHRoZSBBUEkgcmV0dXJucyBgMjA0IE5vIENvbnRlbnRgXG4gICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdCAtIHRoZSByYXcge0BsaW5rY29kZSBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9heGlvcyNyZXNwb25zZS1zY2hlbWEgUmVzcG9uc2V9XG4gICAgKi9cbiAgIC8qKlxuICAgICogTWFrZSBhIHJlcXVlc3QuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIC0gdGhlIG1ldGhvZCBmb3IgdGhlIHJlcXVlc3QgKEdFVCwgUFVULCBQT1NULCBERUxFVEUpXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIGZvciB0aGUgcmVxdWVzdFxuICAgICogQHBhcmFtIHsqfSBbZGF0YV0gLSB0aGUgZGF0YSB0byBzZW5kIHRvIHRoZSBzZXJ2ZXIuIEZvciBIVFRQIG1ldGhvZHMgdGhhdCBkb24ndCBoYXZlIGEgYm9keSB0aGUgZGF0YVxuICAgICogICAgICAgICAgICAgICAgICAgd2lsbCBiZSBzZW50IGFzIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB0aGUgY2FsbGJhY2sgZm9yIHRoZSByZXF1ZXN0XG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyYXc9ZmFsc2VdIC0gaWYgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIHNlbnQgYXMgcmF3LiBJZiB0aGlzIGlzIGEgZmFsc3kgdmFsdWUgdGhlbiB0aGVcbiAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCB3aWxsIGJlIG1hZGUgYXMgSlNPTlxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgUHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBfcmVxdWVzdChtZXRob2QsIHBhdGgsIGRhdGEsIGNiLCByYXcpIHtcbiAgICAgIGNvbnN0IHVybCA9IHRoaXMuX19nZXRVUkwocGF0aCk7XG4gICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5fX2dldFJlcXVlc3RIZWFkZXJzKHJhdyk7XG4gICAgICBsZXQgcXVlcnlQYXJhbXMgPSB7fTtcblxuICAgICAgY29uc3Qgc2hvdWxkVXNlRGF0YUFzUGFyYW1zID0gZGF0YSAmJiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSAmJiBtZXRob2RIYXNOb0JvZHkobWV0aG9kKTtcbiAgICAgIGlmIChzaG91bGRVc2VEYXRhQXNQYXJhbXMpIHtcbiAgICAgICAgIHF1ZXJ5UGFyYW1zID0gZGF0YTtcbiAgICAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgcGFyYW1zOiBxdWVyeVBhcmFtcyxcbiAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICByZXNwb25zZVR5cGU6IHJhdyA/ICd0ZXh0JyA6ICdqc29uJ1xuICAgICAgfTtcblxuICAgICAgbG9nKGAke2NvbmZpZy5tZXRob2R9IHRvICR7Y29uZmlnLnVybH1gKTtcbiAgICAgIGNvbnN0IHJlcXVlc3RQcm9taXNlID0gYXhpb3MoY29uZmlnKS5jYXRjaChjYWxsYmFja0Vycm9yT3JUaHJvdyhjYiwgcGF0aCkpO1xuXG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgIHJlcXVlc3RQcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjYihudWxsLCByZXNwb25zZS5kYXRhIHx8IHRydWUsIHJlc3BvbnNlKTtcbiAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVxdWVzdFByb21pc2U7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTWFrZSBhIHJlcXVlc3QgdG8gYW4gZW5kcG9pbnQgdGhlIHJldHVybnMgMjA0IHdoZW4gdHJ1ZSBhbmQgNDA0IHdoZW4gZmFsc2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggdG8gcmVxdWVzdFxuICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBhbnkgcXVlcnkgcGFyYW1ldGVycyBmb3IgdGhlIHJlcXVlc3RcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCByZWNlaXZlIGB0cnVlYCBvciBgZmFsc2VgXG4gICAgKiBAcGFyYW0ge21ldGhvZH0gW21ldGhvZD1HRVRdIC0gSFRUUCBNZXRob2QgdG8gdXNlXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIF9yZXF1ZXN0MjA0b3I0MDQocGF0aCwgZGF0YSwgY2IsIG1ldGhvZCA9ICdHRVQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdChtZXRob2QsIHBhdGgsIGRhdGEpXG4gICAgICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgIGNiKG51bGwsIHRydWUsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgfSwgZnVuY3Rpb24gZmFpbHVyZShyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgIGNiKG51bGwsIGZhbHNlLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgY2IocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBNYWtlIGEgcmVxdWVzdCBhbmQgZmV0Y2ggYWxsIHRoZSBhdmFpbGFibGUgZGF0YS4gR2l0aHViIHdpbGwgcGFnaW5hdGUgcmVzcG9uc2VzIHNvIGZvciBxdWVyaWVzXG4gICAgKiB0aGF0IG1pZ2h0IHNwYW4gbXVsdGlwbGUgcGFnZXMgdGhpcyBtZXRob2QgaXMgcHJlZmVycmVkIHRvIHtAbGluayBSZXF1ZXN0YWJsZSNyZXF1ZXN0fVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCB0byByZXF1ZXN0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBxdWVyeSBwYXJhbWV0ZXJzIHRvIGluY2x1ZGVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB0aGUgZnVuY3Rpb24gdG8gcmVjZWl2ZSB0aGUgZGF0YS4gVGhlIHJldHVybmVkIGRhdGEgd2lsbCBhbHdheXMgYmUgYW4gYXJyYXkuXG4gICAgKiBAcGFyYW0ge09iamVjdFtdfSByZXN1bHRzIC0gdGhlIHBhcnRpYWwgcmVzdWx0cy4gVGhpcyBhcmd1bWVudCBpcyBpbnRlbmRlZCBmb3IgaW50ZXJhbCB1c2Ugb25seS5cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gYSBwcm9taXNlIHdoaWNoIHdpbGwgcmVzb2x2ZSB3aGVuIGFsbCBwYWdlcyBoYXZlIGJlZW4gZmV0Y2hlZFxuICAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIGZvbGRlZCBpbnRvIHtAbGluayBSZXF1ZXN0YWJsZSNfcmVxdWVzdH0gaW4gdGhlIDIuMCByZWxlYXNlLlxuICAgICovXG4gICBfcmVxdWVzdEFsbFBhZ2VzKHBhdGgsIG9wdGlvbnMsIGNiLCByZXN1bHRzKSB7XG4gICAgICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHBhdGgsIG9wdGlvbnMpXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaC5hcHBseShyZXN1bHRzLCByZXNwb25zZS5kYXRhKTtcblxuICAgICAgICAgICAgY29uc3QgbmV4dFVybCA9IGdldE5leHRQYWdlKHJlc3BvbnNlLmhlYWRlcnMubGluayk7XG4gICAgICAgICAgICBpZiAobmV4dFVybCkge1xuICAgICAgICAgICAgICAgbG9nKGBnZXR0aW5nIG5leHQgcGFnZTogJHtuZXh0VXJsfWApO1xuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhuZXh0VXJsLCBvcHRpb25zLCBjYiwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzdWx0cywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhID0gcmVzdWx0cztcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgIH0pLmNhdGNoKGNhbGxiYWNrRXJyb3JPclRocm93KGNiLCBwYXRoKSk7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdGFibGU7XG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIC8vXG4vLyAgUHJpdmF0ZSBoZWxwZXIgZnVuY3Rpb25zICAvL1xuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cbi8qKlxuICogVGhlIGVycm9yIHN0cnVjdHVyZSByZXR1cm5lZCB3aGVuIGEgbmV0d29yayBjYWxsIGZhaWxzXG4gKi9cbmNsYXNzIFJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAvKipcbiAgICAqIENvbnN0cnVjdCBhIG5ldyBSZXNwb25zZUVycm9yXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSByZXF1ZXN0ZWQgcGF0aFxuICAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlIC0gdGhlIG9iamVjdCByZXR1cm5lZCBieSBBeGlvc1xuICAgICovXG4gICBjb25zdHJ1Y3RvcihwYXRoLCByZXNwb25zZSkge1xuICAgICAgc3VwZXIoYGVycm9yIG1ha2luZyByZXF1ZXN0ICR7cmVzcG9uc2UuY29uZmlnLm1ldGhvZH0gJHtyZXNwb25zZS5jb25maWcudXJsfWApO1xuICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgIHRoaXMucmVxdWVzdCA9IHJlc3BvbnNlLmNvbmZpZztcbiAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgfVxufVxuXG5jb25zdCBNRVRIT0RTX1dJVEhfTk9fQk9EWSA9IFsnR0VUJywgJ0hFQUQnLCAnREVMRVRFJ107XG5mdW5jdGlvbiBtZXRob2RIYXNOb0JvZHkobWV0aG9kKSB7XG4gICByZXR1cm4gTUVUSE9EU19XSVRIX05PX0JPRFkuaW5kZXhPZihtZXRob2QpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0TmV4dFBhZ2UobGlua3NIZWFkZXIgPSAnJykge1xuICAgY29uc3QgbGlua3MgPSBsaW5rc0hlYWRlci5zcGxpdCgvXFxzKixcXHMqLyk7IC8vIHNwbGl0cyBhbmQgc3RyaXBzIHRoZSB1cmxzXG4gICByZXR1cm4gbGlua3MucmVkdWNlKGZ1bmN0aW9uKG5leHRVcmwsIGxpbmspIHtcbiAgICAgIGlmIChsaW5rLnNlYXJjaCgvcmVsPVwibmV4dFwiLykgIT09IC0xKSB7XG4gICAgICAgICByZXR1cm4gKGxpbmsubWF0Y2goLzwoLiopPi8pIHx8IFtdKVsxXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5leHRVcmw7XG4gICB9LCB1bmRlZmluZWQpO1xufVxuXG5mdW5jdGlvbiBjYWxsYmFja0Vycm9yT3JUaHJvdyhjYiwgcGF0aCkge1xuICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIocmVzcG9uc2UpIHtcbiAgICAgIGxvZyhgZXJyb3IgbWFraW5nIHJlcXVlc3QgJHtyZXNwb25zZS5jb25maWcubWV0aG9kfSAke3Jlc3BvbnNlLmNvbmZpZy51cmx9ICR7SlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YSl9YCk7XG4gICAgICBsZXQgZXJyb3IgPSBuZXcgUmVzcG9uc2VFcnJvcihwYXRoLCByZXNwb25zZSk7XG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgIGxvZygnZ29pbmcgdG8gZXJyb3IgY2FsbGJhY2snKTtcbiAgICAgICAgIGNiKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBsb2coJ3Rocm93aW5nIGVycm9yJyk7XG4gICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgIH07XG59XG4iXX0=
//# sourceMappingURL=Requestable.js.map
