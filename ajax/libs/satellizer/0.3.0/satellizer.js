/**
 * Satellizer
 * (c) 2014 Sahat Yalkabov <sahat@me.com>
 * License: MIT
 */

(function(window, angular, undefined) {
  'use strict';

  var config = {
    logoutRedirect: '/',
    loginRedirect: '/',
    loginUrl: '/auth/login',
    signupUrl: '/auth/signup',
    signupRedirect: '/login',
    loginRoute: '/login',
    signupRoute: '/signup',
    user: 'currentUser'
  };

  var providers = {
    google: {
      url: '/auth/google',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: window.location.origin,
      scope: 'openid profile email',
      scopeDelimiter: ' ',
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      display: 'popup',
      type: '2.0',
      popupOptions: {
        width: 452,
        height: 633
      }
    },
    facebook: {
      url: '/auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
      redirectUri: window.location.origin + '/',
      scope: 'email',
      scopeDelimiter: ',',
      requiredUrlParams: ['display'],
      display: 'popup',
      type: '2.0',
      popupOptions: {
        width: 481,
        height: 269
      }
    },
    linkedin: {
      url: '/auth/linkedin',
      authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
      redirectUri: window.location.origin,
      requiredUrlParams: ['state'],
      scope: [],
      scopeDelimiter: ' ',
      state: 'STATE',
      type: '2.0',
      popupOptions: {
        width: 527,
        height: 582
      }
    },
    github: {
      name: 'github',
      url: '/auth/github',
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      redirectUri: window.location.origin,
      scope: [],
      scopeDelimiter: ' ',
      type: '2.0',
      popupOptions: {
        width: 1020,
        height: 618
      }
    },
    twitter: {
      url: '/auth/twitter',
      type: '1.0'
    }
  };

  angular.module('Satellizer', [])
    .provider('$auth', function $auth() {

      this.config = config;
      this.providers = providers;

      this.facebook = function(params) {
        angular.extend(providers.facebook, params);
      };

      this.google = function(params) {
        angular.extend(providers.google, params);
      };

      this.linkedin = function(params) {
        angular.extend(providers.linkedin, params);
      };

      this.github = function(params) {
        angular.extend(providers.github, params);
      };

      this.twitter = function(params) {
        angular.extend(providers.twitter, params);
      };

      this.oauthBase = function(params) {
        providers[params.name] = providers[params.name] || {};
        angular.extend(providers[params.name], params);
      };

      this.oauth1 = function(params) {
        this.oauthBase(params);
        providers[params.name].type = '1.0';
      };

      this.oauth2 = function(params) {
        this.oauthBase(params);
        providers[params.name].type = '2.0';
      };

      this.$get = function($q, Oauth1, Oauth2, Local) {

        var $auth = {};

        $auth.authenticate = function(name) {
          var deferred = $q.defer();
          var provider = (providers[name].type === '1.0') ? Oauth1 : Oauth2;
          provider.open(providers[name])
            .then(function(response) {
              Local.parseUser(response.token, deferred);
            })
            .catch(function(response) {
              deferred.reject(response);
            });
          return deferred.promise;
        };

        $auth.login = function(user) {
          return Local.login(user);
        };

        $auth.signup = function(user) {
          Local.signup(user);
        };

        $auth.logout = function() {
          Local.logout();
        };

        $auth.isAuthenticated = function() {
          Local.isAuthenticated();
        };

        return $auth;
      };

    })
    .factory('Local', function Local($q, $http, $rootScope, $location) {

      var local = {};

      local.parseUser = function(token, deferred) {
        var payload = JSON.parse(window.atob(token.split('.')[1]));
        localStorage.setItem('jwtToken', token);
        $rootScope[config.user] = payload.user;
        $location.path(config.loginRedirect);
        deferred.resolve(payload.user);
      };

      local.login = function(user) {
        var deferred = $q.defer();
        $http.post(config.loginUrl, user)
          .then(function(response) {
            local.parseUser(response.data.token, deferred);
          })
          .catch(function(response) {
            deferred.reject(response);
          });
        return deferred.promise;
      };

      local.signup = function(user) {
        var deferred = $q.defer();
        $http.post(config.signupUrl, user)
          .then(function() {
            $location.path(config.signupRedirect);
            deferred.resolve();
          })
          .catch(function(response) {
            deferred.reject(response);
          });
        return deferred.promise;
      };

      local.logout = function() {
        delete $rootScope[config.user];
        localStorage.removeItem('jwtToken');
        $location.path(config.logoutRedirect);
      };

      local.isAuthenticated = function() {
        return Boolean($rootScope.currentUser);
      };

      return local;
    })
    .factory('Oauth2', function Oauth2($q, $http, Utils, Popup) {
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

      oauth2.open = function(options) {
        angular.extend(defaults, options);
        var deferred = $q.defer();
        var url = oauth2.buildUrl();

        Popup.open(url, defaults.popupOptions).then(function(oauthData) {
          oauth2.exchangeForToken(oauthData)
            .then(function(response) {
              deferred.resolve(response.data);
            })
            .catch(function(response) {
              deferred.reject(response);
            });
        });

        return deferred.promise;
      };

      oauth2.exchangeForToken = function(oauthData) {
        return $http.post(defaults.url, {
          code: oauthData.code,
          clientId: defaults.clientId,
          redirectUri: defaults.redirectUri
        });
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
            var camelizedName = Utils.camelCase(paramName);
            var paramValue = defaults[camelizedName];
            keyValuePairs.push([paramName, encodeURIComponent(paramValue)]);
          });
        });

        return keyValuePairs.map(function(pair) {
          return pair.join('=');
        }).join('&');
      };

      return oauth2;
    })
    .factory('Oauth1', function Oauth1($q, $http, Popup) {
      var defaults = {
        url: null,
        name: null,
        popupOptions: null
      };

      var oauth1 = {};

      oauth1.open = function(options) {
        angular.extend(defaults, options);

        var deferred = $q.defer();

        Popup.open(defaults.url).then(function(oauthData) {
          oauth1.exchangeForToken(oauthData).then(function(response) {
            deferred.resolve(response.data);
          });
        });

        return deferred.promise;
      };

      oauth1.exchangeForToken = function(oauthData) {
        oauthData = oauth1.buildQueryString(oauthData);
        return $http.get(defaults.url + '?' + oauthData);
      };

      oauth1.buildQueryString = function(obj) {
        var str = [];
        angular.forEach(obj, function(value, key) {
          str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        });
        return str.join('&');
      };

      return oauth1;
    })
    .factory('Popup', function Popup($q, $interval, $window) {
      var popupWindow = null;
      var polling = null;

      var popup = {};

      popup.popupWindow = popupWindow;

      popup.open = function(url, options) {
        var deferred = $q.defer();
        var optionsString = popup.stringifyOptions(popup.prepareOptions(options || {}));

        popupWindow = $window.open(url, 'Satellizer', optionsString);
        popupWindow.focus();

        popup.postMessageHandler(deferred);
        popup.pollPopup(deferred);

        return deferred.promise;
      };

      popup.pollPopup = function(deferred) {
        polling = $interval(function() {
          if (popupWindow.closed) {
            $interval.cancel(polling);
            deferred.reject('Popup was closed by the user');
          }
        }, 35);
      };

      popup.postMessageHandler = function(deferred) {
        $window.addEventListener('message', function(event) {
          if (event.origin === $window.location.origin) {
            deferred.resolve(event.data);
          }
        }, false);
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
    })
    .factory('RunBlock', function RunBlock($rootScope, $window, $location, Utils) {
      return {
        run: function() {
          var token = $window.localStorage.jwtToken;
          if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            $rootScope.currentUser = payload.user;
          }

          var params = $window.location.search.substring(1);
          var qs = Object.keys($location.search()).length ? $location.search() : Utils.parseQueryString(params);
          if ($window.opener && $window.opener.location.origin === $window.location.origin) {
            if (qs.oauth_token && qs.oauth_verifier) {
              $window.opener.postMessage({ oauth_token: qs.oauth_token, oauth_verifier: qs.oauth_verifier }, '*');
            } else if (qs.code) {
              $window.opener.postMessage({ code: qs.code }, '*');
            }
            $window.close();
          }
        }
      };
    })
    .service('Utils', function Utils() {
      this.camelCase = function(name) {
        return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        });
      };

      this.parseQueryString = function(keyValue) {
        var obj = { }, key, value;
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
    .config(function httpInterceptor($httpProvider) {
      $httpProvider.interceptors.push(function($q, $window, $location) {
        return {
          request: function(config) {
            if ($window.localStorage.jwtToken) {
              config.headers.Authorization = 'Bearer ' + $window.localStorage.jwtToken;
            }
            return config;
          },
          responseError: function(response) {
            if (response.status === 401 || response.status === 403) {
              delete $window.localStorage.jwtToken;
              $location.path('/login');
            }
            return $q.reject(response);
          }
        };
      });
    })
    .run(function onRun(RunBlock) {
      RunBlock.run();
    });

})(window, window.angular);

