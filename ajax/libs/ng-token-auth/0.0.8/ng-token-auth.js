angular.module('ng-token-auth', ['ngCookies']).provider('$auth', function() {
  var config;
  config = {
    apiUrl: '/api',
    signOutUrl: '/auth/sign_out',
    emailSignInPath: '/auth/sign_in',
    emailRegistrationPath: '/auth',
    confirmationSuccessUrl: window.location.href,
    tokenValidationPath: '/auth/validate_token',
    proxyIf: function() {
      return false;
    },
    proxyUrl: '/proxy',
    authProviderPaths: {
      github: '/auth/github',
      facebook: '/auth/facebook',
      google: '/auth/google_oauth2'
    }
  };
  return {
    configure: function(params) {
      return angular.extend(config, params);
    },
    $get: [
      '$http', '$q', '$location', '$cookies', '$cookieStore', '$window', '$timeout', '$rootScope', (function(_this) {
        return function($http, $q, $location, $cookies, $cookieStore, $window, $timeout, $rootScope) {
          return {
            header: null,
            dfd: null,
            config: config,
            user: {},
            submitRegistration: function(params) {
              console.log('submitting registration', params);
              angular.extend(params, {
                confirm_success_url: config.confirmationSuccessUrl
              });
              return $http.post(this.apiUrl() + config.emailRegistrationPath, params);
            },
            submitLogin: function(params) {
              console.log('params', params);
              this.dfd = $q.defer();
              $http.post(this.apiUrl() + config.emailSignInPath, params).success((function(_this) {
                return function(resp) {
                  console.log('this', _this);
                  console.log('resp', resp.data);
                  return _this.handleValidAuth(resp.data);
                };
              })(this)).error((function(_this) {
                return function(resp) {
                  return _this.rejectDfd({
                    reason: 'unauthorized',
                    errors: ['Invalid credentials']
                  });
                };
              })(this));
              return this.dfd.promise;
            },
            authenticate: function(provider) {
              var authWindow;
              if (this.dfd == null) {
                this.dfd = $q.defer();
                authWindow = this.openAuthWindow(provider);
                this.requestCredentials(authWindow);
              }
              return this.dfd;
            },
            openAuthWindow: function(provider) {
              return $window.open(this.apiUrl() + config.authProviderPaths[provider]);
            },
            requestCredentials: function(authWindow) {
              if (authWindow.closed) {
                return this.rejectDfd({
                  reason: 'unauthorized',
                  errors: ['User canceled login']
                });
              } else {
                authWindow.postMessage("requestCredentials", "*");
                return this.t = $timeout(((function(_this) {
                  return function() {
                    return _this.requestCredentials(authWindow);
                  };
                })(this)), 500);
              }
            },
            rejectDfd: function(reason) {
              this.invalidateTokens();
              if (this.dfd != null) {
                this.dfd.reject(reason);
                return $timeout(((function(_this) {
                  return function() {
                    _this.dfd = null;
                    console.log('auth failure reason', reason);
                    return $rootScope.$broadcast('auth:failure', reason);
                  };
                })(this)), 0);
              }
            },
            resolveDfd: function() {
              this.dfd.resolve({
                id: this.user.id
              });
              return $timeout(((function(_this) {
                return function() {
                  _this.dfd = null;
                  $rootScope.$broadcast('auth:success', _this.user);
                  return $rootScope.$digest();
                };
              })(this)), 0);
            },
            validateUser: function() {
              var clientId, token, uid;
              if (this.dfd == null) {
                this.dfd = $q.defer();
                if (!(this.header && this.user.id)) {
                  if ($location.search().token !== void 0) {
                    token = $location.search().token;
                    clientId = $location.search().client_id;
                    uid = $location.search().uid;
                    this.setAuthHeader(this.buildAuthToken(token, client_id, uid));
                  } else if ($cookieStore.get('auth_header')) {
                    this.header = $cookieStore.get('auth_header');
                    $http.defaults.headers.common['Authorization'] = this.header;
                  }
                  if (this.header) {
                    this.validateToken();
                  } else {
                    this.rejectDfd({
                      reason: 'unauthorized',
                      errors: ['No credentials']
                    });
                  }
                } else {
                  this.resolveDfd();
                }
              }
              return this.dfd.promise;
            },
            validateToken: function() {
              return $http.get(this.apiUrl() + config.tokenValidationPath).success((function(_this) {
                return function(resp) {
                  return _this.handleValidAuth(resp.data);
                };
              })(this)).error((function(_this) {
                return function(data) {
                  _this.dfd.reject({
                    reason: 'unauthorized',
                    errors: ['Invalid/expired credentials']
                  });
                  return $timeout((function() {
                    return _this.dfd = null;
                  }), 0);
                };
              })(this));
            },
            invalidateTokens: function() {
              var key, val, _ref;
              _ref = this.user;
              for (key in _ref) {
                val = _ref[key];
                delete this.user[key];
              }
              this.header = null;
              delete $cookies['auth_header'];
              return $http.defaults.headers.common['Authorization'] = '';
            },
            signOut: function() {
              return $http["delete"](this.apiUrl() + config.signOutUrl).success((function(_this) {
                return function(resp) {
                  return _this.invalidateTokens();
                };
              })(this)).error((function(_this) {
                return function(resp) {
                  return _this.invalidateTokens();
                };
              })(this));
            },
            handleValidAuth: function(user, setHeader) {
              if (setHeader == null) {
                setHeader = false;
              }
              if (this.t != null) {
                $timeout.cancel(this.t);
              }
              angular.extend(this.user, user);
              if (setHeader) {
                this.setAuthHeader(this.buildAuthToken(this.user.auth_token, this.user.client_id, this.user.uid));
              }
              return this.resolveDfd();
            },
            cancelAuth: function(reason) {
              $timeout.cancel(this.t);
              $rootScope.$broadcast('auth:cancelled', reason);
              return this.rejectDfd(reason);
            },
            buildAuthToken: function(token, clientId, uid) {
              return "token=" + token + " client=" + clientId + " uid=" + uid;
            },
            setAuthHeader: function(header) {
              this.header = $http.defaults.headers.common['Authorization'] = header;
              return $cookieStore.put('auth_header', header);
            },
            apiUrl: function() {
              if (this._apiUrl == null) {
                if (config.proxyIf()) {
                  this._apiUrl = '/proxy';
                } else {
                  this._apiUrl = config.apiUrl;
                }
              }
              return this._apiUrl;
            }
          };
        };
      })(this)
    ]
  };
}).config(function($httpProvider) {
  return $httpProvider.interceptors.push(function($injector) {
    return {
      response: function(response) {
        $injector.invoke(function($http, $auth) {
          return $auth.setAuthHeader(response.headers('Authorization'));
        });
        return response;
      }
    };
  });
}).run(function($auth, $window, $rootScope) {
  $window.addEventListener("message", (function(_this) {
    return function(ev) {
      if (ev.data.message === 'deliverCredentials') {
        ev.source.close();
        delete ev.data.message;
        $auth.handleValidAuth(ev.data, true);
      }
      if (ev.data.message === 'authFailure') {
        ev.source.close();
        return $auth.cancelAuth({
          reason: 'unauthorized',
          errors: [ev.data.error]
        });
      }
    };
  })(this));
  $rootScope.user = $auth.user;
  $rootScope.authenticate = function(provider) {
    return $auth.authenticate(provider);
  };
  $rootScope.signOut = function() {
    return $auth.signOut();
  };
  $rootScope.submitRegistration = function(params) {
    return $auth.submitRegistration(params);
  };
  $rootScope.submitLogin = function(params) {
    return $auth.submitLogin(params);
  };
  return $auth.validateUser();
});
