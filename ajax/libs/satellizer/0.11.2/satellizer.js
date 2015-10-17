/**
 * Satellizer 0.11.2
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */
(function(window, angular, undefined) {
  'use strict';

  angular.module('satellizer', [])
    .constant('satellizer.config', {
      httpInterceptor: true,
      loginOnSignup: true,
      baseUrl: '/',
      loginRedirect: '/',
      logoutRedirect: '/',
      signupRedirect: '/login',
      loginUrl: '/auth/login',
      signupUrl: '/auth/signup',
      loginRoute: '/login',
      signupRoute: '/signup',
      tokenRoot: false,
      tokenName: 'token',
      tokenPrefix: 'satellizer',
      unlinkUrl: '/auth/unlink/',
      unlinkMethod: 'get',
      authHeader: 'Authorization',
      authToken: 'Bearer',
      withCredentials: true,
      platform: 'browser',
      storage: 'localStorage',
      providers: {
        google: {
          name: 'google',
          url: '/auth/google',
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          scopeDelimiter: ' ',
          requiredUrlParams: ['scope'],
          optionalUrlParams: ['display'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 452, height: 633 }
        },
        facebook: {
          name: 'facebook',
          url: '/auth/facebook',
          authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
          redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
          scope: ['email'],
          scopeDelimiter: ',',
          requiredUrlParams: ['nonce','display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 580, height: 400 }
        },
        linkedin: {
          name: 'linkedin',
          url: '/auth/linkedin',
          authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          requiredUrlParams: ['state'],
          scope: ['r_emailaddress'],
          scopeDelimiter: ' ',
          state: 'STATE',
          type: '2.0',
          popupOptions: { width: 527, height: 582 }
        },
        github: {
          name: 'github',
          url: '/auth/github',
          authorizationEndpoint: 'https://github.com/login/oauth/authorize',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          optionalUrlParams: ['scope'],
          scope: ['user:email'],
          scopeDelimiter: ' ',
          type: '2.0',
          popupOptions: { width: 1020, height: 618 }
        },
        yahoo: {
          name: 'yahoo',
          url: '/auth/yahoo',
          authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: [],
          scopeDelimiter: ',',
          type: '2.0',
          popupOptions: { width: 559, height: 519 }
        },
        twitter: {
          name: 'twitter',
          url: '/auth/twitter',
          authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
          type: '1.0',
          popupOptions: { width: 495, height: 645 }
        },
        live: {
          name: 'live',
          url: '/auth/live',
          authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['wl.emails'],
          scopeDelimiter: ' ',
          requiredUrlParams: ['display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 500, height: 560 }
        }
      }
    })
    .provider('$auth', ['satellizer.config', function(config) {
      Object.defineProperties(this, {
        httpInterceptor: {
          get: function() { return config.httpInterceptor; },
          set: function(value) { config.httpInterceptor = value; }
        },
        loginOnSignup: {
          get: function() { return config.loginOnSignup; },
          set: function(value) { config.loginOnSignup = value; }
        },
        baseUrl: {
          get: function() { return config.baseUrl; },
          set: function(value) { config.baseUrl = value; }
        },
        logoutRedirect: {
          get: function() { return config.logoutRedirect; },
          set: function(value) { config.logoutRedirect = value; }
        },
        loginRedirect: {
          set: function(value) { config.loginRedirect = value; },
          get: function() { return config.loginRedirect; }
        },
        signupRedirect: {
          get: function() { return config.signupRedirect; },
          set: function(value) { config.signupRedirect = value; }
        },
        loginUrl: {
          get: function() { return config.loginUrl; },
          set: function(value) { config.loginUrl = value; }
        },
        signupUrl: {
          get: function() { return config.signupUrl; },
          set: function(value) { config.signupUrl = value; }
        },
        loginRoute: {
          get: function() { return config.loginRoute; },
          set: function(value) { config.loginRoute = value; }
        },
        signupRoute: {
          get: function() { return config.signupRoute; },
          set: function(value) { config.signupRoute = value; }
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
        unlinkMethod: {
          get: function() { return config.unlinkMethod; },
          set: function(value) { config.unlinkMethod = value; }
        },
        platform: {
          get: function() { return config.platform; },
          set: function(value) { config.platform = value; }
        },
        storage: {
          get: function() { return config.storage; },
          set: function(value) { config.storage = value; }
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
        config.providers[params.name].type = '1.0';
      };

      this.oauth2 = function(params) {
        oauth(params);
        config.providers[params.name].type = '2.0';
      };

      this.$get = [
        '$q',
        'satellizer.shared',
        'satellizer.local',
        'satellizer.oauth',
        function($q, shared, local, oauth) {
          var $auth = {};

          $auth.authenticate = function(name, userData) {
            return oauth.authenticate(name, false, userData);
          };

          $auth.login = function(user, redirect) {
            return local.login(user, redirect);
          };

          $auth.signup = function(user) {
            return local.signup(user);
          };

          $auth.logout = function(redirect) {
            return shared.logout(redirect);
          };

          $auth.isAuthenticated = function() {
            return shared.isAuthenticated();
          };

          $auth.link = function(name, userData) {
            return oauth.authenticate(name, true, userData);
          };

          $auth.unlink = function(provider) {
            return oauth.unlink(provider);
          };

          $auth.getToken = function() {
            return shared.getToken();
          };

          $auth.setToken = function(token, redirect) {
            shared.setToken({ access_token: token }, redirect);
          };

          $auth.removeToken = function() {
            return shared.removeToken();
          };

          $auth.getPayload = function() {
            return shared.getPayload();
          };

          $auth.setStorage = function(type) {
            return shared.setStorage(type);
          };

          return $auth;
        }];

    }])
    .factory('satellizer.shared', [
      '$q',
      '$window',
      '$location',
      'satellizer.config',
      'satellizer.storage',
      function($q, $window, $location, config, storage) {
        var shared = {};
        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;

        shared.getToken = function() {
          return storage.get(tokenName);
        };

        shared.getPayload = function() {
          var token = storage.get(tokenName);

          if (token && token.split('.').length === 3) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
          }
        };

        shared.setToken = function(response, redirect) {
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
            token = config.tokenRoot && response.data[config.tokenRoot] ?
              response.data[config.tokenRoot][config.tokenName] : response.data[config.tokenName];
          }

          if (!token) {
            var tokenPath = config.tokenRoot ? config.tokenRoot + '.' + config.tokenName : config.tokenName;
            throw new Error('Expecting a token named "' + tokenPath + '" but instead got: ' + JSON.stringify(response.data));
          }

          storage.set(tokenName, token);

          if (config.loginRedirect && !redirect) {
            $location.path(config.loginRedirect);
          } else if (redirect && angular.isString(redirect)) {
            $location.path(encodeURI(redirect));
          }
        };

        shared.removeToken = function() {
          storage.remove(tokenName);
        };

        shared.isAuthenticated = function() {
          var token = storage.get(tokenName);

          if (token) {
            if (token.split('.').length === 3) {
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace('-', '+').replace('_', '/');
              var exp = JSON.parse($window.atob(base64)).exp;
              if (exp) {
                return Math.round(new Date().getTime() / 1000) <= exp;
              }
              return true;
            }
            return true;
          }
          return false;
        };

        shared.logout = function(redirect) {
          storage.remove(tokenName);

          if (config.logoutRedirect && !redirect) {
            $location.url(config.logoutRedirect);
          }
          else if (angular.isString(redirect)) {
            $location.url(redirect);
          }

          return $q.when();
        };

        shared.setStorage = function(type) {
          config.storage = type;
        };

        return shared;
      }])
    .factory('satellizer.oauth', [
      '$q',
      '$http',
      'satellizer.config',
      'satellizer.utils',
      'satellizer.shared',
      'satellizer.Oauth1',
      'satellizer.Oauth2',
      function($q, $http, config, utils, shared, Oauth1, Oauth2) {
        var oauth = {};

        oauth.authenticate = function(name, redirect, userData) {
          var provider = config.providers[name].type === '1.0' ? new Oauth1() : new Oauth2();
          var deferred = $q.defer();

          provider.open(config.providers[name], userData || {})
            .then(function(response) {
              shared.setToken(response, redirect);
              deferred.resolve(response);
            })
            .catch(function(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        };

        oauth.unlink = function(provider) {
          var unlinkUrl =  config.baseUrl ? utils.joinUrl(config.baseUrl, config.unlinkUrl) : config.unlinkUrl;

          if (config.unlinkMethod === 'get') {
            return $http.get(unlinkUrl + provider);
          } else if (config.unlinkMethod === 'post') {
            return $http.post(unlinkUrl, provider);
          }
        };

        return oauth;
      }])
    .factory('satellizer.local', [
      '$q',
      '$http',
      '$location',
      'satellizer.utils',
      'satellizer.shared',
      'satellizer.config',
      function($q, $http, $location, utils, shared, config) {
        var local = {};

        local.login = function(user, redirect) {
          var loginUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, config.loginUrl) : config.loginUrl;
          return $http.post(loginUrl, user)
            .then(function(response) {
              shared.setToken(response, redirect);
              return response;
            });
        };

        local.signup = function(user) {
          var signupUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, config.signupUrl) : config.signupUrl;
          return $http.post(signupUrl, user)
            .then(function(response) {
              if (config.loginOnSignup) {
                shared.setToken(response);
              } else if (config.signupRedirect) {
                $location.path(config.signupRedirect);
              }
              return response;
            });
        };

        return local;
      }])
    .factory('satellizer.Oauth2', [
      '$q',
      '$http',
      '$window',
      'satellizer.popup',
      'satellizer.utils',
      'satellizer.config',
      'satellizer.storage',
      function($q, $http, $window, popup, utils, config, storage) {
        return function() {

          var defaults = {
            url: null,
            name: null,
            state: null,
            scope: null,
            scopeDelimiter: null,
            clientId: null,
            redirectUri: null,
            popupOptions: null,
            authorizationEndpoint: null,
            responseParams: null,
            requiredUrlParams: null,
            optionalUrlParams: null,
            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
            responseType: 'code'
          };

          var oauth2 = {};

          oauth2.open = function(options, userData) {
            angular.extend(defaults, options);

            var stateName = defaults.name + '_state';

            if (angular.isFunction(defaults.state)) {
              storage.set(stateName, defaults.state());
            } else if (angular.isString(defaults.state)) {
              storage.set(stateName, defaults.state);
            }

            var url = defaults.authorizationEndpoint + '?' + oauth2.buildQueryString();

            var openPopup;
            if (config.platform === 'mobile') {
              openPopup = popup.open(url, defaults.name, defaults.popupOptions, defaults.redirectUri)
            } else {
              openPopup = popup.open(url, defaults.name, defaults.popupOptions, defaults.redirectUri).pollPopup();
            }

            return openPopup.then(function(oauthData) {
              if (defaults.responseType === 'token') {
                return oauthData;
              }
              if (oauthData.state && oauthData.state !== storage.get(stateName)) {
                return $q.reject('OAuth 2.0 state parameter mismatch.');
              }
              return oauth2.exchangeForToken(oauthData, userData);
            });

          };

          oauth2.exchangeForToken = function(oauthData, userData) {
            var data = angular.extend({}, userData, {
              code: oauthData.code,
              clientId: defaults.clientId,
              redirectUri: defaults.redirectUri
            });

            if (oauthData.state) {
              data.state = oauthData.state;
            }

            angular.forEach(defaults.responseParams, function(param) {
              data[param] = oauthData[param];
            });

            var exchangeForTokenUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;
            return $http.post(exchangeForTokenUrl, data, { withCredentials: config.withCredentials });
          };

          oauth2.buildQueryString = function() {
            var keyValuePairs = [];
            var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];

            angular.forEach(urlParams, function(params) {

              angular.forEach(defaults[params], function(paramName) {
                var camelizedName = utils.camelCase(paramName);
                var paramValue = angular.isFunction(defaults[paramName]) ? defaults[paramName]() : defaults[camelizedName];

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

          return oauth2;
        };
      }])
    .factory('satellizer.Oauth1', [
      '$q',
      '$http',
      'satellizer.popup',
      'satellizer.config',
      'satellizer.utils',
      function($q, $http, popup, config, utils) {
        return function() {

          var defaults = {
            url: null,
            name: null,
            popupOptions: null,
            redirectUri: null,
            authorizationEndpoint: null
          };

          var oauth1 = {};

          oauth1.open = function(options, userData) {
            angular.extend(defaults, options);
            var serverUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;
            var popupWindow = popup.open('', defaults.name, defaults.popupOptions, defaults.redirectUri);
            return $http.post(serverUrl)
              .then(function(response) {
                popupWindow.popupWindow.location.href = [defaults.authorizationEndpoint, oauth1.buildQueryString(response.data)].join('?');
                return popupWindow.pollPopup()
                  .then(function(response) {
                    return oauth1.exchangeForToken(response, userData);
                  });
              });

          };

          oauth1.exchangeForToken = function(oauthData, userData) {
            var data = angular.extend({}, userData, oauthData);
            var exchangeForTokenUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;
            return $http.post(exchangeForTokenUrl, data, { withCredentials: config.withCredentials });
          };

          oauth1.buildQueryString = function(obj) {
            var str = [];

            angular.forEach(obj, function(value, key) {
              str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            });

            return str.join('&');
          };

          return oauth1;
        };
      }])
    .factory('satellizer.popup', [
      '$q',
      '$interval',
      '$window',
      '$location',
      'satellizer.config',
      'satellizer.utils',
      function($q, $interval, $window, $location, config, utils) {
        var popup = {};
        popup.url = '';
        popup.popupWindow = null;

        popup.open = function(url, windowName, options, redirectUri) {
          popup.url = url;

          var stringifiedOptions = popup.stringifyOptions(popup.prepareOptions(options || {}));

          popup.popupWindow = window.open(url, windowName, stringifiedOptions);

          if (popup.popupWindow && popup.popupWindow.focus) {
            popup.popupWindow.focus();
          }


          if (config.platform === 'mobile') {
            return popup.eventListener(redirectUri);
          }

          return popup;
        };

        popup.eventListener = function(redirectUri) {
          var deferred = $q.defer();

          popup.popupWindow.addEventListener('loadstart', function(event) {
            if (event.url.indexOf(redirectUri) !== 0) { return; }

            var parser = document.createElement('a');
            parser.href = event.url;

            if (parser.search || parser.hash) {
              var queryParams = parser.search.substring(1).replace(/\/$/, '');
              var hashParams = parser.hash.substring(1).replace(/\/$/, '');
              var hash = utils.parseQueryString(hashParams);
              var qs = utils.parseQueryString(queryParams);

              angular.extend(qs, hash);

              if (qs.error) {
                deferred.reject({ error: qs.error });
              } else {
                deferred.resolve(qs);
              }

              popup.popupWindow.close();
            }
          });

          popup.popupWindow.addEventListener('exit', function() {
            deferred.reject({ data: 'Provider Popup was closed' });
          });

          popup.popupWindow.addEventListener('loaderror', function() {
            deferred.reject({ data: 'Authorization Failed' });
          });

          return deferred.promise;
        };

        popup.pollPopup = function() {
          var polling;
          var deferred = $q.defer();

          polling = $interval(function() {
            try {
              var documentOrigin = document.location.host;
              var popupWindowOrigin = popup.popupWindow.location.host;

              if (popupWindowOrigin === documentOrigin && (popup.popupWindow.location.search || popup.popupWindow.location.hash)) {
                var queryParams = popup.popupWindow.location.search.substring(1).replace(/\/$/, '');
                var hashParams = popup.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                var hash = utils.parseQueryString(hashParams);
                var qs = utils.parseQueryString(queryParams);

                angular.extend(qs, hash);

                if (qs.error) {
                  deferred.reject({ error: qs.error });
                } else {
                  deferred.resolve(qs);
                }

                popup.popupWindow.close();
                $interval.cancel(polling);
              }
            } catch (error) {}

            if (!popup.popupWindow) {
              $interval.cancel(polling);
              deferred.reject({ data: 'Provider Popup Blocked' });
            } else if (popup.popupWindow.closed || popup.popupWindow.closed === undefined) {
              $interval.cancel(polling);
              deferred.reject({ data: 'Authorization Failed' });
            }
          }, 35);

          return deferred.promise;
        };

        popup.prepareOptions = function(options) {
          var width = options.width || 500;
          var height = options.height || 500;
          return angular.extend({
            width: width,
            height: height,
            left: $window.screenX + (($window.outerWidth - width) / 2),
            top: $window.screenY + (($window.outerHeight - height) / 2.5)
          }, options);
        };

        popup.stringifyOptions = function(options) {
          var parts = [];
          angular.forEach(options, function(value, key) {
            parts.push(key + '=' + value);
          });
          return parts.join(',');
        };

        return popup;
      }])
    .service('satellizer.utils', function() {
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
    })
    .factory('satellizer.storage', ['satellizer.config', function(config) {
      switch (config.storage) {
        case 'localStorage':
          if ('localStorage' in window && window['localStorage'] !== null) {
            return {
              get: function(key) { return localStorage.getItem(key); },
              set: function(key, value) { return localStorage.setItem(key, value); },
              remove: function(key) { return localStorage.removeItem(key); }
            };
          } else {
            console.warn('Warning: Local Storage is disabled or unavailable. Satellizer will not work correctly.');
            return {
              get: function(key) { return undefined; },
              set: function(key, value) { return undefined; },
              remove: function(key) { return undefined; }
            };
          }
          break;

        case 'sessionStorage':
          if ('sessionStorage' in window && window['sessionStorage'] !== null) {
            return {
              get: function(key) { return sessionStorage.getItem(key); },
              set: function(key, value) { return sessionStorage.setItem(key, value); },
              remove: function(key) { return sessionStorage.removeItem(key); }
            };
          } else {
            console.warn('Warning: Session Storage is disabled or unavailable. Satellizer will not work correctly.');
            return {
              get: function(key) { return undefined; },
              set: function(key, value) { return undefined; },
              remove: function(key) { return undefined; }
            };
          }
          break;
      }
    }])
    .factory('satellizer.interceptor', [
      '$q',
      'satellizer.config',
      'satellizer.storage',
      'satellizer.shared',
      function($q, config, storage, shared) {
        return {
          request: function(request) {
            if (request.skipAuthorization) {
              return request;
            }
             if (shared.isAuthenticated() && config.httpInterceptor) {
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
      $httpProvider.interceptors.push('satellizer.interceptor');
    }]);

})(window, window.angular);
