/**
 * Satellizer 0.14.0
 * (c) 2016 Sahat Yalkabov
 * License: MIT
 */

// CommonJS package manager support.
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'satellizer';
}

(function(window, angular, undefined) {
  'use strict';

  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
  }

  angular.module('satellizer', [])
    .constant('SatellizerConfig', {
      httpInterceptor: function() { return true; },
      withCredentials: false,
      tokenRoot: null,
      baseUrl: '/',
      loginUrl: '/auth/login',
      signupUrl: '/auth/signup',
      unlinkUrl: '/auth/unlink/',
      tokenName: 'token',
      tokenPrefix: 'satellizer',
      authHeader: 'Authorization',
      authToken: 'Bearer',
      storageType: 'localStorage',
      providers: {
        facebook: {
          name: 'facebook',
          url: '/auth/facebook',
          authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
          redirectUri: window.location.origin + '/',
          requiredUrlParams: ['display', 'scope'],
          scope: ['email'],
          scopeDelimiter: ',',
          display: 'popup',
          oauthType: '2.0',
          popupOptions: { width: 580, height: 400 }
        },
        google: {
          name: 'google',
          url: '/auth/google',
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
          redirectUri: window.location.origin,
          requiredUrlParams: ['scope'],
          optionalUrlParams: ['display'],
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          scopeDelimiter: ' ',
          display: 'popup',
          oauthType: '2.0',
          popupOptions: { width: 452, height: 633 }
        },
        github: {
          name: 'github',
          url: '/auth/github',
          authorizationEndpoint: 'https://github.com/login/oauth/authorize',
          redirectUri: window.location.origin,
          optionalUrlParams: ['scope'],
          scope: ['user:email'],
          scopeDelimiter: ' ',
          oauthType: '2.0',
          popupOptions: { width: 1020, height: 618 }
        },
        instagram: {
          name: 'instagram',
          url: '/auth/instagram',
          authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
          redirectUri: window.location.origin,
          requiredUrlParams: ['scope'],
          scope: ['basic'],
          scopeDelimiter: '+',
          oauthType: '2.0'
        },
        linkedin: {
          name: 'linkedin',
          url: '/auth/linkedin',
          authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
          redirectUri: window.location.origin,
          requiredUrlParams: ['state'],
          scope: ['r_emailaddress'],
          scopeDelimiter: ' ',
          state: 'STATE',
          oauthType: '2.0',
          popupOptions: { width: 527, height: 582 }
        },
        twitter: {
          name: 'twitter',
          url: '/auth/twitter',
          authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
          redirectUri: window.location.origin,
          oauthType: '1.0',
          popupOptions: { width: 495, height: 645 }
        },
        twitch: {
          name: 'twitch',
          url: '/auth/twitch',
          authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
          redirectUri: window.location.origin,
          requiredUrlParams: ['scope'],
          scope: ['user_read'],
          scopeDelimiter: ' ',
          display: 'popup',
          oauthType: '2.0',
          popupOptions: { width: 500, height: 560 }
        },
        live: {
          name: 'live',
          url: '/auth/live',
          authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
          redirectUri: window.location.origin,
          requiredUrlParams: ['display', 'scope'],
          scope: ['wl.emails'],
          scopeDelimiter: ' ',
          display: 'popup',
          oauthType: '2.0',
          popupOptions: { width: 500, height: 560 }
        },
        yahoo: {
          name: 'yahoo',
          url: '/auth/yahoo',
          authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
          redirectUri: window.location.origin,
          scope: [],
          scopeDelimiter: ',',
          oauthType: '2.0',
          popupOptions: { width: 559, height: 519 }
        },
        bitbucket: {
          name: 'bitbucket',
          url: '/auth/bitbucket',
          authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
          redirectUri: window.location.origin + '/',
          requiredUrlParams: ['scope'],
          scope: ['email'],
          scopeDelimiter: ' ',
          oauthType: '2.0',
          popupOptions: { width: 1028, height: 529 }
        }
      }
    })
    .provider('$auth', ['SatellizerConfig', function(config) {
      Object.defineProperties(this, {
        httpInterceptor: {
          get: function() { return config.httpInterceptor; },
          set: function(value) {
            if (typeof value === 'function') {
              config.httpInterceptor = value;
            } else {
              config.httpInterceptor = function() {
                return value;
              };
            }
          }
        },
        baseUrl: {
          get: function() { return config.baseUrl; },
          set: function(value) { config.baseUrl = value; }
        },
        loginUrl: {
          get: function() { return config.loginUrl; },
          set: function(value) { config.loginUrl = value; }
        },
        signupUrl: {
          get: function() { return config.signupUrl; },
          set: function(value) { config.signupUrl = value; }
        },
        tokenRoot: {
          get: function() { return config.tokenRoot; },
          set: function(value) { config.tokenRoot = value; }
        },
        tokenName: {
          get: function() { return config.tokenName; },
          set: function(value) { config.tokenName = value; }
        },
        tokenPrefix: {
          get: function() { return config.tokenPrefix; },
          set: function(value) { config.tokenPrefix = value; }
        },
        unlinkUrl: {
          get: function() { return config.unlinkUrl; },
          set: function(value) { config.unlinkUrl = value; }
        },
        authHeader: {
          get: function() { return config.authHeader; },
          set: function(value) { config.authHeader = value; }
        },
        authToken: {
          get: function() { return config.authToken; },
          set: function(value) { config.authToken = value; }
        },
        withCredentials: {
          get: function() { return config.withCredentials; },
          set: function(value) { config.withCredentials = value; }
        },
        storageType: {
          get: function() { return config.storageType; },
          set: function(value) { config.storageType = value; }
        }
      });

      angular.forEach(Object.keys(config.providers), function(provider) {
        this[provider] = function(params) {
          return angular.extend(config.providers[provider], params);
        };
      }, this);

      var oauth = function(params) {
        config.providers[params.name] = config.providers[params.name] || {};
        angular.extend(config.providers[params.name], params);
      };

      this.oauth1 = function(params) {
        oauth(params);
        config.providers[params.name].oauthType = '1.0';
      };

      this.oauth2 = function(params) {
        oauth(params);
        config.providers[params.name].oauthType = '2.0';
      };

      this.$get = [
        '$q',
        'SatellizerShared',
        'SatellizerLocal',
        'SatellizerOauth',
        function($q, shared, local, oauth) {
          var $auth = {};

          $auth.login = function(user, opts) {
            return local.login(user, opts);
          };

          $auth.signup = function(user, options) {
            return local.signup(user, options);
          };

          $auth.logout = function() {
            return shared.logout();
          };

          $auth.authenticate = function(name, userData) {
            return oauth.authenticate(name, userData);
          };

          $auth.link = function(name, userData) {
            return oauth.authenticate(name, userData);
          };

          $auth.unlink = function(provider, opts) {
            return oauth.unlink(provider, opts);
          };

          $auth.isAuthenticated = function() {
            return shared.isAuthenticated();
          };

          $auth.getToken = function() {
            return shared.getToken();
          };

          $auth.setToken = function(token) {
            shared.setToken({ access_token: token });
          };

          $auth.removeToken = function() {
            return shared.removeToken();
          };

          $auth.getPayload = function() {
            return shared.getPayload();
          };

          $auth.setStorageType = function(type) {
            return shared.setStorageType(type);
          };

          return $auth;
        }];
    }])
    .factory('SatellizerShared', [
      '$q',
      '$window',
      '$log',
      'SatellizerConfig',
      'SatellizerStorage',
      function($q, $window, $log, config, storage) {
        var Shared = {};

        var tokenName = config.tokenPrefix ? [config.tokenPrefix, config.tokenName].join('_') : config.tokenName;

        Shared.getToken = function() {
          return storage.get(tokenName);
        };

        Shared.getPayload = function() {
          var token = storage.get(tokenName);

          if (token && token.split('.').length === 3) {
            try {
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
            } catch(e) {
              return undefined;
            }
          }
        };

        Shared.setToken = function(response) {
          if (!response) {
            return $log.warn('Can\'t set token without passing a value');
          }

          var accessToken = response && response.access_token;
          var token;

          if (accessToken) {
            if (angular.isObject(accessToken) && angular.isObject(accessToken.data)) {
              response = accessToken;
            } else if (angular.isString(accessToken)) {
              token = accessToken;
            }
          }

          if (!token && response) {
            var tokenRootData = config.tokenRoot && config.tokenRoot.split('.').reduce(function(o, x) { return o[x]; }, response.data);
            token = tokenRootData ? tokenRootData[config.tokenName] : response.data && response.data[config.tokenName];
          }

          if (!token) {
            var tokenPath = config.tokenRoot ? config.tokenRoot + '.' + config.tokenName : config.tokenName;
            return $log.warn('Expecting a token named "' + tokenPath);
          }

          storage.set(tokenName, token);
        };

        Shared.removeToken = function() {
          storage.remove(tokenName);
        };

        /**
         * @returns {boolean}
         */
        Shared.isAuthenticated = function() {
          var token = storage.get(tokenName);
          // A token is present
          if (token) {
            // Token with a valid JWT format XXX.YYY.ZZZ
            if (token.split('.').length === 3) {
              // Could be a valid JWT or an access token with the same format
              try {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var exp = JSON.parse($window.atob(base64)).exp;
                // JWT with an optonal expiration claims
                if (exp) {
                  var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                  if (isExpired) {
                    // FAIL: Expired token
                    return false;
                  } else {
                    // PASS: Non-expired token
                    return true;
                  }
                }
              } catch(e) {
                // PASS: Non-JWT token that looks like JWT
                return true;
              }
            }
            // PASS: All other tokens
            return true;
          }
          // FAIL: No token at all
          return false;
        };

        Shared.logout = function() {
          storage.remove(tokenName);
          return $q.when();
        };

        Shared.setStorageType = function(type) {
          config.storageType = type;
        };

        return Shared;
      }])
    .factory('SatellizerOauth', [
      '$q',
      '$http',
      'SatellizerConfig',
      'SatellizerUtils',
      'SatellizerShared',
      'SatellizerOauth1',
      'SatellizerOauth2',
      function($q, $http, config, utils, shared, Oauth1, Oauth2) {
        var Oauth = {};

        Oauth.authenticate = function(name, userData) {
          var provider = config.providers[name].oauthType === '1.0' ? new Oauth1() : new Oauth2();
          var deferred = $q.defer();

          provider.open(config.providers[name], userData || {})
            .then(function(response) {
              // This is for a scenario when someone wishes to opt out from
              // Satellizer's magic by doing authorization code exchange and
              // saving a token manually.
              if (config.providers[name].url) {
                shared.setToken(response, false);
              }
              deferred.resolve(response);
            })
            .catch(function(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        };

        Oauth.unlink = function(provider, opts) {
          opts = opts || {};
          opts.url = opts.url ? opts.url : utils.joinUrl(config.baseUrl, config.unlinkUrl);
          opts.data = { provider: provider } || opts.data;
          opts.method = opts.method || 'POST';
          opts.withCredentials = opts.withCredentials || config.withCredentials;

          return $http(opts);
        };

        return Oauth;
      }])
    .factory('SatellizerLocal', [
      '$http',
      'SatellizerUtils',
      'SatellizerShared',
      'SatellizerConfig',
      function($http, utils, shared, config) {
        var Local = {};

        Local.login = function(user, opts) {
          opts = opts || {};
          opts.url = opts.url ? opts.url : utils.joinUrl(config.baseUrl, config.loginUrl);
          opts.data = user || opts.data;
          opts.method = opts.method || 'POST';
          opts.withCredentials = opts.withCredentials || config.withCredentials;

          return $http(opts).then(function(response) {
            shared.setToken(response);
            return response;
          });
        };

        Local.signup = function(user, opts) {
          opts = opts || {};
          opts.url = opts.url ? opts.url : utils.joinUrl(config.baseUrl, config.signupUrl);
          opts.data = user || opts.data;
          opts.method = opts.method || 'POST';
          opts.withCredentials = opts.withCredentials || config.withCredentials;

          return $http(opts);
        };

        return Local;
      }])
    .factory('SatellizerOauth2', [
      '$q',
      '$http',
      '$window',
      '$timeout',
      'SatellizerPopup',
      'SatellizerUtils',
      'SatellizerConfig',
      'SatellizerStorage',
      function($q, $http, $window, $timeout, popup, utils, config, storage) {
        return function() {
          var Oauth2 = {};

          var defaults = {
            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
            responseType: 'code',
            responseParams: {
              code: 'code',
              clientId: 'clientId',
              redirectUri: 'redirectUri'
            }
          };

          Oauth2.open = function(options, userData) {
            defaults = utils.merge(options, defaults);
            var defer = $q.defer();

            $timeout(function () {
              var url;
              var openPopup;
              var stateName = defaults.name + '_state';

              if (angular.isFunction(defaults.state)) {
                storage.set(stateName, defaults.state());
              } else if (angular.isString(defaults.state)) {
                storage.set(stateName, defaults.state);
              }

              url = [defaults.authorizationEndpoint, Oauth2.buildQueryString()].join('?');

              if (window.cordova) {
                openPopup = popup.open(url, defaults.name, defaults.popupOptions, defaults.redirectUri).eventListener(defaults.redirectUri);
              } else {
                openPopup = popup.open(url, defaults.name, defaults.popupOptions, defaults.redirectUri).pollPopup(defaults.redirectUri);
              }

              return openPopup
                .then(function(oauthData) {
                  // When no server URL provided, return popup params as-is.
                  // This is for a scenario when someone wishes to opt out from
                  // Satellizer's magic by doing authorization code exchange and
                  // saving a token manually.
                  if (defaults.responseType === 'token' || !defaults.url) {
                    defer.resolve(oauthData);
                  }

                if (oauthData.state && oauthData.state !== storage.get(stateName)) {
                  return defer.reject(
                    'The value returned in the state parameter does not match the state value from your original ' +
                    'authorization code request.'
                  );
                }

                  defer.resolve(Oauth2.exchangeForToken(oauthData, userData));
                });
            });

            return defer.promise;
          };

          Oauth2.exchangeForToken = function(oauthData, userData) {
            var data = angular.extend({}, userData);

            angular.forEach(defaults.responseParams, function(value, key) {
              switch (key) {
                case 'code':
                  data[value] = oauthData.code;
                  break;
                case 'clientId':
                  data[value] = defaults.clientId;
                  break;
                case 'redirectUri':
                  data[value] = defaults.redirectUri;
                  break;
                default:
                  data[value] = oauthData[key];
              }
            });

            if (oauthData.state) {
              data.state = oauthData.state;
            }

            var exchangeForTokenUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;

            return $http.post(exchangeForTokenUrl, data, { withCredentials: config.withCredentials });
          };

          Oauth2.buildQueryString = function() {
            var keyValuePairs = [];
            var urlParamsCategories = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];

            angular.forEach(urlParamsCategories, function(paramsCategory) {
              angular.forEach(defaults[paramsCategory], function(paramName) {
                var camelizedName = utils.camelCase(paramName);
                var paramValue = angular.isFunction(defaults[paramName]) ? defaults[paramName]() : defaults[camelizedName];

                if (paramName === 'redirect_uri' && !paramValue) {
                    return;
                }

                if (paramName === 'state') {
                  var stateName = defaults.name + '_state';
                  paramValue = encodeURIComponent(storage.get(stateName));
                }

                if (paramName === 'scope' && Array.isArray(paramValue)) {
                  paramValue = paramValue.join(defaults.scopeDelimiter);

                  if (defaults.scopePrefix) {
                    paramValue = [defaults.scopePrefix, paramValue].join(defaults.scopeDelimiter);
                  }
                }

                keyValuePairs.push([paramName, paramValue]);
              });
            });

            return keyValuePairs.map(function(pair) {
              return pair.join('=');
            }).join('&');
          };

          return Oauth2;
        };
      }])
    .factory('SatellizerOauth1', [
      '$q',
      '$http',
      'SatellizerPopup',
      'SatellizerConfig',
      'SatellizerUtils',
      function($q, $http, popup, config, utils) {
        return function() {
          var Oauth1 = {};

          var defaults = {
            url: null,
            name: null,
            popupOptions: null,
            redirectUri: null,
            authorizationEndpoint: null
          };

          Oauth1.open = function(options, userData) {
            angular.extend(defaults, options);
            var popupWindow;
            var serverUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;

            if (!window.cordova) {
                popupWindow = popup.open('', defaults.name, defaults.popupOptions, defaults.redirectUri);
            }

            return $http.post(serverUrl, defaults)
              .then(function(response) {
                var url = [defaults.authorizationEndpoint, Oauth1.buildQueryString(response.data)].join('?');

                if (window.cordova) {
                  popupWindow = popup.open(url, defaults.name, defaults.popupOptions, defaults.redirectUri);
                } else {
                  popupWindow.popupWindow.location = url;
                }

                var popupListener;

                if (window.cordova) {
                  popupListener = popupWindow.eventListener(defaults.redirectUri);
                } else {
                  popupListener = popupWindow.pollPopup(defaults.redirectUri);
                }

                return popupListener
                  .then(function(response) {
                    return Oauth1.exchangeForToken(response, userData);
                  });
              });

          };

          Oauth1.exchangeForToken = function(oauthData, userData) {
            var data = angular.extend({}, userData, oauthData);
            var exchangeForTokenUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;
            return $http.post(exchangeForTokenUrl, data, { withCredentials: config.withCredentials });
          };

          Oauth1.buildQueryString = function(obj) {
            var str = [];

            angular.forEach(obj, function(value, key) {
              str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            });

            return str.join('&');
          };

          return Oauth1;
        };
      }])
    .factory('SatellizerPopup', [
      '$q',
      '$interval',
      '$window',
      'SatellizerConfig',
      'SatellizerUtils',
      function($q, $interval, $window, config, utils) {
        var Popup = {};

        Popup.url = '';
        Popup.popupWindow = null;

        Popup.open = function(url, name, options) {
          Popup.url = url;

          var stringifiedOptions = Popup.stringifyOptions(Popup.prepareOptions(options));
          var UA = $window.navigator.userAgent;
          var windowName = (window.cordova || UA.indexOf('CriOS') > -1) ? '_blank' : name;

          Popup.popupWindow = $window.open(url, windowName, stringifiedOptions);

          $window.popup = Popup.popupWindow;

          if (Popup.popupWindow && Popup.popupWindow.focus) {
            Popup.popupWindow.focus();
          }

          return Popup;
        };

        Popup.eventListener = function(redirectUri) {
          var deferred = $q.defer();

          Popup.popupWindow.addEventListener('loadstart', function(event) {
            if (event.url.indexOf(redirectUri) !== 0) {
              return;
            }

            var parser = document.createElement('a');
            parser.href = event.url;

            if (parser.search || parser.hash) {
              var queryParams = parser.search.substring(1).replace(/\/$/, '');
              var hashParams = parser.hash.substring(1).replace(/\/$/, '');
              var hash = utils.parseQueryString(hashParams);
              var qs = utils.parseQueryString(queryParams);

              angular.extend(qs, hash);

              if (!qs.error) {
                deferred.resolve(qs);
              }

              Popup.popupWindow.close();
            }
          });

          Popup.popupWindow.addEventListener('loaderror', function() {
            deferred.reject('Authorization Failed');
          });

          return deferred.promise;
        };

        Popup.pollPopup = function(redirectUri) {
          var deferred = $q.defer();

          var redirectUriParser = document.createElement('a');
          redirectUriParser.href = redirectUri;

          var redirectUriPath = utils.getFullUrlPath(redirectUriParser);

          var polling = $interval(function() {
            if (!Popup.popupWindow || Popup.popupWindow.closed || Popup.popupWindow.closed === undefined) {
              deferred.reject('The popup window was closed.');
              $interval.cancel(polling);
            }

            try {
              var popupWindowPath = utils.getFullUrlPath(Popup.popupWindow.location);

              // Redirect has occurred.
              if (popupWindowPath === redirectUriPath) {
                // Contains query/hash parameters as expected.
                if (Popup.popupWindow.location.search || Popup.popupWindow.location.hash) {
                  var queryParams = Popup.popupWindow.location.search.substring(1).replace(/\/$/, '');
                  var hashParams = Popup.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                  var hash = utils.parseQueryString(hashParams);
                  var qs = utils.parseQueryString(queryParams);

                  angular.extend(qs, hash);

                  if (qs.error) {
                    deferred.reject(qs);
                  } else {
                    deferred.resolve(qs);
                  }
                } else {
                  // Does not contain query/hash parameters, can't do anything at this point.
                  deferred.reject(
                    'Redirect has occurred but no query or hash parameters were found. ' +
                    'They were either not set during the redirect, or were removed before Satellizer ' +
                    'could read them, e.g. AngularJS routing mechanism.'
                  );
                }

                $interval.cancel(polling);
                Popup.popupWindow.close();
              }
            } catch (error) {
              // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
              // A hack to get around same-origin security policy errors in IE.
            }
          }, 20);

          return deferred.promise;
        };

        Popup.prepareOptions = function(options) {
          options = options || {};
          var width = options.width || 500;
          var height = options.height || 500;

          return angular.extend({
            width: width,
            height: height,
            left: $window.screenX + (($window.outerWidth - width) / 2),
            top: $window.screenY + (($window.outerHeight - height) / 2.5)
          }, options);
        };

        Popup.stringifyOptions = function(options) {
          var parts = [];
          angular.forEach(options, function(value, key) {
            parts.push(key + '=' + value);
          });
          return parts.join(',');
        };

        return Popup;
      }])
    .service('SatellizerUtils', function() {
      this.getFullUrlPath = function(location) {
        return location.protocol + '//' + location.hostname +
        (location.port ? ':' + location.port : '') + location.pathname;
      };

      this.camelCase = function(name) {
        return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        });
      };

      this.parseQueryString = function(keyValue) {
        var obj = {}, key, value;
        angular.forEach((keyValue || '').split('&'), function(keyValue) {
          if (keyValue) {
            value = keyValue.split('=');
            key = decodeURIComponent(value[0]);
            obj[key] = angular.isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
          }
        });
        return obj;
      };

      this.joinUrl = function(baseUrl, url) {
        if (/^(?:[a-z]+:)?\/\//i.test(url)) {
          return url;
        }

        var joined = [baseUrl, url].join('/');

        var normalize = function(str) {
          return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
        };

        return normalize(joined);
      };

      this.merge = function(obj1, obj2) {
        var result = {};
        for (var i in obj1) {
          if (obj1.hasOwnProperty(i)) {
            if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
              result[i] = this.merge(obj1[i], obj2[i]);
            } else {
              result[i] = obj1[i];
            }
          }
        }
        for (i in obj2) {
          if (obj2.hasOwnProperty(i)) {
            if (i in result) {
              continue;
            }
            result[i] = obj2[i];
          }

        }
        return result;
      };
    })
    .factory('SatellizerStorage', ['$window', '$log', 'SatellizerConfig', function($window, $log, config) {

      var store = {};

      // Check if localStorage or sessionStorage is available or enabled
      var isStorageAvailable = (function() {
        try {
          var supported = config.storageType in $window && $window[config.storageType] !== null;

          if (supported) {
            var key = Math.random().toString(36).substring(7);
            $window[config.storageType].setItem(key, '');
            $window[config.storageType].removeItem(key);
          }

          return supported;
        } catch (e) {
          return false;
        }
      })();

      if (!isStorageAvailable) {
        $log.warn(config.storageType + ' is not available.');
      }

      return {
        get: function(key) {
          return isStorageAvailable ? $window[config.storageType].getItem(key) : store[key];
        },
        set: function(key, value) {
          return isStorageAvailable ? $window[config.storageType].setItem(key, value) : store[key] = value;
        },
        remove: function(key) {
          return isStorageAvailable ? $window[config.storageType].removeItem(key): delete store[key];
        }
      };

    }])
    .factory('SatellizerInterceptor', [
      '$q',
      'SatellizerConfig',
      'SatellizerStorage',
      'SatellizerShared',
      function($q, config, storage, shared) {
        return {
          request: function(request) {
            if (request.skipAuthorization) {
              return request;
            }

            if (shared.isAuthenticated() && config.httpInterceptor(request)) {
              var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
              var token = storage.get(tokenName);

              if (config.authHeader && config.authToken) {
                token = config.authToken + ' ' + token;
              }

              request.headers[config.authHeader] = token;
            }

            return request;
          },
          responseError: function(response) {
            return $q.reject(response);
          }
        };
      }])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('SatellizerInterceptor');
    }]);

})(window, window.angular);
