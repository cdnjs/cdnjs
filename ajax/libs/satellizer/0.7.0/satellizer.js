/**
 * Satellizer
 * (c) 2014 Sahat Yalkabov
 * License: MIT
 */

(function(window, angular, undefined) {
  'use strict';

  angular.module('satellizer', [])
    .constant('satellizer.config', {
      loginOnSignup: true,
      loginRedirect: '/',
      logoutRedirect: '/',
      signupRedirect: '/login',
      loginUrl: '/auth/login',
      signupUrl: '/auth/signup',
      loginRoute: '/login',
      signupRoute: '/signup',
      tokenName: 'token',
      tokenPrefix: 'satellizer',
      unlinkUrl: '/auth/unlink/',
      providers: {
        google: {
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
          url: '/auth/facebook',
          authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['email'],
          scopeDelimiter: ',',
          requiredUrlParams: ['display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 481, height: 269 }
        },
        linkedin: {
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
          scope: [],
          scopeDelimiter: ' ',
          type: '2.0',
          popupOptions: { width: 1020, height: 618 }
        },
        twitter: {
          url: '/auth/twitter',
          type: '1.0',
          popupOptions: { width: 495, height: 645 }
        },
        yahoo: {
          url: '/auth/yahoo',
          type: '1.0',
          popupOptions: { width: 559, height: 519 }
        }
      }
    })
    .provider('$auth', ['satellizer.config', function(config) {
      Object.defineProperties(this, {
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
        loginOnSignup: {
          get: function() { return config.loginOnSignup; },
          set: function(value) { config.loginOnSignup = value; }
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

          $auth.login = function(user) {
            return local.login(user);
          };

          $auth.signup = function(user) {
            return local.signup(user);
          };

          $auth.logout = function() {
            return shared.logout();
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

          return $auth;
        }];

    }])
    .factory('satellizer.shared', [
      '$q',
      '$window',
      '$location',
      'satellizer.config',
      function($q, $window, $location, config) {
        var shared = {};

        shared.saveToken = function(response, deferred, isLinking) {
          var token = response.data[config.tokenName];
          var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
          $window.localStorage[tokenName] = token;

          if (config.loginRedirect && !isLinking) {
            $location.path(config.loginRedirect);
          }

          deferred.resolve(response);
        };

        shared.isAuthenticated = function() {
          var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
          var token = $window.localStorage[tokenName];

          // IE8 and IE9
          if (token && !$window.atob) {
            return true;
          }

          if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var exp = JSON.parse($window.atob(base64)).exp;
            return Math.round(new Date().getTime() / 1000) <= exp;
          }

          return false;
        };

        shared.logout = function() {
          var deferred = $q.defer();
          var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
          delete $window.localStorage[tokenName];

          if (config.logoutRedirect) {
            $location.path(config.logoutRedirect);
          }

          deferred.resolve();

          return deferred.promise;
        };

        return shared;
      }])
    .factory('satellizer.oauth', [
      '$q',
      '$http',
      'satellizer.config',
      'satellizer.shared',
      'satellizer.Oauth1',
      'satellizer.Oauth2',
      function($q, $http, config, shared, Oauth1, Oauth2) {
        var oauth = {};

        oauth.authenticate = function(name, isLinking, userData) {
          var deferred = $q.defer();
          var provider = config.providers[name].type === '1.0' ? new Oauth1() : new Oauth2();

          provider.open(config.providers[name], userData || {})
            .then(function(response) {
              shared.saveToken(response, deferred, isLinking);
            })
            .then(null, function(response) {
              deferred.reject(response);
            });

          return deferred.promise;
        };

        oauth.unlink = function(provider) {
          return $http.get(config.unlinkUrl + provider);
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

        local.login = function(user) {
          var deferred = $q.defer();

          $http.post(config.loginUrl, user)
            .then(function(response) {
              shared.saveToken(response, deferred);
            })
            .then(null, function(response) {
              deferred.reject(response);
            });

          return deferred.promise;
        };

        local.signup = function(user) {
          var deferred = $q.defer();

          $http.post(config.signupUrl, user)
            .then(function(response) {
              if (config.loginOnSignup) {
                shared.saveToken(response, deferred);
              } else {
                $location.path(config.signupRedirect);
                deferred.resolve(response);
              }
            })
            .then(null, function(response) {
              deferred.reject(response);
            });

          return deferred.promise;
        };

        return local;
      }])
    .factory('satellizer.Oauth2', [
      '$q',
      '$http',
      'satellizer.popup',
      'satellizer.utils',
      function($q, $http, popup, utils) {
        return function() {

          var defaults = {
            url: null,
            name: null,
            scope: null,
            scopeDelimiter: null,
            clientId: null,
            redirectUri: null,
            popupOptions: null,
            authorizationEndpoint: null,
            requiredUrlParams: null,
            optionalUrlParams: null,
            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
            responseType: 'code'
          };

          var oauth2 = {};

          oauth2.open = function(options, userData) {
            angular.extend(defaults, options);
            var deferred = $q.defer();
            var url = oauth2.buildUrl();

            popup.open(url, defaults.popupOptions)
              .then(function(oauthData) {
                oauth2.exchangeForToken(oauthData, userData)
                  .then(function(response) {
                    deferred.resolve(response);
                  })
                  .then(null, function(response) {
                    deferred.reject(response);
                  });
              })
              .then(null, function(error) {
                deferred.reject(error);
              });

            return deferred.promise;
          };

          oauth2.exchangeForToken = function(oauthData, userData) {
            var data = angular.extend({}, userData, {
              code: oauthData.code,
              clientId: defaults.clientId,
              redirectUri: defaults.redirectUri
            });

            return $http.post(defaults.url, data);
          };

          oauth2.buildUrl = function() {
            var baseUrl = defaults.authorizationEndpoint;
            var qs = oauth2.buildQueryString();
            return [baseUrl, qs].join('?');
          };

          oauth2.buildQueryString = function() {
            var keyValuePairs = [];
            var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];

            angular.forEach(urlParams, function(params) {
              angular.forEach(defaults[params], function(paramName) {
                var camelizedName = utils.camelCase(paramName);
                var paramValue = defaults[camelizedName];

                if (paramName === 'scope' && Array.isArray(paramValue)) {
                  paramValue = paramValue.join(defaults.scopeDelimiter);

                  if (defaults.scopePrefix) {
                    paramValue = [defaults.scopePrefix, paramValue].join(defaults.scopeDelimiter);
                  }
                }

                keyValuePairs.push([paramName, encodeURIComponent(paramValue)]);
              });
            });

            return keyValuePairs.map(function(pair) {
              return pair.join('=');
            }).join('&');
          };

          return oauth2;
        };
      }])
    .factory('satellizer.Oauth1', ['$q', '$http', 'satellizer.popup', function($q, $http, popup) {
      return function() {

        var defaults = {
          url: null,
          name: null,
          popupOptions: null
        };

        var oauth1 = {};

        oauth1.open = function(options, userData) {
          angular.extend(defaults, options);

          var deferred = $q.defer();

          popup.open(defaults.url, defaults.popupOptions)
            .then(function(response) {
              oauth1.exchangeForToken(response, userData)
                .then(function(response) {
                  deferred.resolve(response);
                })
                .then(null, function(response) {
                  deferred.reject(response);
                });
            })
            .then(null, function(response) {
              deferred.reject(response);
            });

          return deferred.promise;
        };

        oauth1.exchangeForToken = function(oauthData, userData) {
          var data = angular.extend({}, userData, oauthData);
          var qs = oauth1.buildQueryString(data);
          return $http.get(defaults.url + '?' + qs);
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
      'satellizer.utils',
      function($q, $interval, $window, $location, utils) {
        var popupWindow = null;
        var polling = null;

        var popup = {};

        popup.popupWindow = popupWindow;

        popup.open = function(url, options) {
          var deferred = $q.defer();
          var optionsString = popup.stringifyOptions(popup.prepareOptions(options || {}));

          popupWindow = window.open(url, '_blank', optionsString);

          if (popupWindow && popupWindow.focus) {
            popupWindow.focus();
          }

          popup.pollPopup(deferred);

          return deferred.promise;
        };

        popup.pollPopup = function(deferred) {
          polling = $interval(function() {
            try {
              if (popupWindow.document.domain === document.domain && popupWindow.location.search) {
                var params = popupWindow.location.search.substring(1);
                var qs = Object.keys($location.search()).length ? $location.search() : utils.parseQueryString(params);

                if (qs.oauth_token && qs.oauth_verifier) {
                  deferred.resolve({ oauth_token: qs.oauth_token, oauth_verifier: qs.oauth_verifier });
                } else if (qs.code) {
                  deferred.resolve({ code: qs.code });
                } else if (qs.error) {
                  deferred.reject({ error: qs.error });
                }
                popupWindow.close();
                $interval.cancel(polling);
              }
            } catch (error) {}

            if (popupWindow.closed) {
              $interval.cancel(polling);
              deferred.reject({ data: 'Authorization Failed' });
            }
          }, 35);
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
    })
    .config(['$httpProvider', 'satellizer.config', function($httpProvider, config) {
      $httpProvider.interceptors.push(['$q', function($q) {
        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
        return {
          request: function(httpConfig) {
            if (localStorage.getItem(tokenName)) {
              httpConfig.headers.Authorization = 'Bearer ' + localStorage.getItem(tokenName);
            }
            return httpConfig;
          },
          responseError: function(response) {
            if (response.status === 401) {
              localStorage.removeItem(tokenName);
            }
            return $q.reject(response);
          }
        };
      }]);
    }]);

})(window, window.angular);