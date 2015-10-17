angular.module('ng-token-auth', ['ngCookies']).provider('$auth', function() {
  var config;
  config = {
    apiUrl: '/api',
    signOutUrl: '/auth/sign_out',
    emailSignInPath: '/auth/sign_in',
    emailRegistrationPath: '/auth',
    confirmationSuccessUrl: window.location.href,
    passwordResetPath: '/auth/password',
    passwordUpdatePath: '/auth/password',
    passwordResetSuccessUrl: window.location.href,
    tokenValidationPath: '/auth/validate_token',
    proxyIf: function() {
      return false;
    },
    proxyUrl: '/proxy',
    validateOnPageLoad: true,
    forceHardRedirect: false,
    tokenFormat: {
      "access-token": "{{ token }}",
      "token-type": "Bearer",
      client: "{{ clientId }}",
      expiry: "{{ expiry }}",
      uid: "{{ uid }}"
    },
    parseExpiry: function(headers) {
      return (parseInt(headers['expiry'], 10) * 1000) || null;
    },
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
      '$http', '$q', '$location', '$cookies', '$cookieStore', '$window', '$timeout', '$rootScope', '$interpolate', (function(_this) {
        return function($http, $q, $location, $cookies, $cookieStore, $window, $timeout, $rootScope, $interpolate) {
          return {
            header: null,
            dfd: null,
            config: config,
            user: {},
            mustResetPassword: false,
            listener: null,
            initialize: function() {
              this.initializeListeners();
              return this.addScopeMethods();
            },
            initializeListeners: function() {
              this.listener = this.handlePostMessage.bind(this);
              if ($window.addEventListener) {
                return $window.addEventListener("message", this.listener, false);
              }
            },
            cancel: function(reason) {
              if (this.t != null) {
                $timeout.cancel(this.t);
              }
              if (this.dfd != null) {
                this.rejectDfd(reason);
              }
              return $timeout(((function(_this) {
                return function() {
                  return _this.t = null;
                };
              })(this)), 0);
            },
            destroy: function() {
              this.cancel();
              if ($window.removeEventListener) {
                return $window.removeEventListener("message", this.listener, false);
              }
            },
            handlePostMessage: function(ev) {
              var error;
              if (ev.data.message === 'deliverCredentials') {
                delete ev.data.message;
                this.handleValidAuth(ev.data, true);
                $rootScope.$broadcast('auth:login-success', ev.data);
              }
              if (ev.data.message === 'authFailure') {
                error = {
                  reason: 'unauthorized',
                  errors: [ev.data.error]
                };
                this.cancel(error);
                return $rootScope.$broadcast('auth:login-error', error);
              }
            },
            addScopeMethods: function() {
              $rootScope.user = this.user;
              $rootScope.authenticate = (function(_this) {
                return function(provider) {
                  return _this.authenticate(provider);
                };
              })(this);
              $rootScope.signOut = (function(_this) {
                return function() {
                  return _this.signOut();
                };
              })(this);
              $rootScope.submitRegistration = (function(_this) {
                return function(params) {
                  return _this.submitRegistration(params);
                };
              })(this);
              $rootScope.submitLogin = (function(_this) {
                return function(params) {
                  return _this.submitLogin(params);
                };
              })(this);
              $rootScope.requestPasswordReset = (function(_this) {
                return function(params) {
                  return _this.requestPasswordReset(params);
                };
              })(this);
              $rootScope.updatePassword = (function(_this) {
                return function(params) {
                  return _this.updatePassword(params);
                };
              })(this);
              if (config.validateOnPageLoad) {
                return this.validateUser();
              }
            },
            submitRegistration: function(params) {
              angular.extend(params, {
                confirm_success_url: config.confirmationSuccessUrl
              });
              return $http.post(this.apiUrl() + config.emailRegistrationPath, params).success(function() {
                return $rootScope.$broadcast('auth:registration-email-success', params);
              }).error(function(resp) {
                return $rootScope.$broadcast('auth:registration-email-error', resp);
              });
            },
            submitLogin: function(params) {
              this.initDfd();
              $http.post(this.apiUrl() + config.emailSignInPath, params).success((function(_this) {
                return function(resp) {
                  _this.handleValidAuth(resp.data);
                  return $rootScope.$broadcast('auth:login-success', _this.user);
                };
              })(this)).error((function(_this) {
                return function(resp) {
                  _this.rejectDfd({
                    reason: 'unauthorized',
                    errors: ['Invalid credentials']
                  });
                  return $rootScope.$broadcast('auth:login-error', resp);
                };
              })(this));
              return this.dfd.promise;
            },
            requestPasswordReset: function(params) {
              params.redirect_url = config.passwordResetSuccessUrl;
              return $http.post(this.apiUrl() + config.passwordResetPath, params).success(function() {
                return $rootScope.$broadcast('auth:password-reset-request-success', params);
              }).error(function(resp) {
                return $rootScope.$broadcast('auth:password-reset-request-error', resp);
              });
            },
            updatePassword: function(params) {
              return $http.put(this.apiUrl() + config.passwordUpdatePath, params).success((function(_this) {
                return function(resp) {
                  $rootScope.$broadcast('auth:password-change-success', resp);
                  return _this.mustResetPassword = false;
                };
              })(this)).error(function(resp) {
                return $rootScope.$broadcast('auth:password-change-error', resp);
              });
            },
            authenticate: function(provider) {
              if (this.dfd == null) {
                this.initDfd();
                this.openAuthWindow(provider);
              }
              return this.dfd.promise;
            },
            openAuthWindow: function(provider) {
              var authUrl;
              authUrl = this.buildAuthUrl(provider);
              if (this.useExternalWindow()) {
                return this.requestCredentials($window.open(authUrl));
              } else {
                return $location.replace(authUrl);
              }
            },
            buildAuthUrl: function(provider) {
              var authUrl;
              authUrl = config.apiUrl;
              authUrl += config.authProviderPaths[provider];
              authUrl += '?auth_origin_url=';
              return authUrl += $location.href;
            },
            requestCredentials: function(authWindow) {
              if (authWindow.closed) {
                this.cancel({
                  reason: 'unauthorized',
                  errors: ['User canceled login']
                });
                return $rootScope.$broadcast('auth:window-closed');
              } else {
                authWindow.postMessage("requestCredentials", "*");
                return this.t = $timeout(((function(_this) {
                  return function() {
                    return _this.requestCredentials(authWindow);
                  };
                })(this)), 500);
              }
            },
            resolveDfd: function() {
              this.dfd.resolve({
                id: this.user.id
              });
              return $timeout(((function(_this) {
                return function() {
                  _this.dfd = null;
                  if (!$rootScope.$$phase) {
                    return $rootScope.$digest();
                  }
                };
              })(this)), 0);
            },
            validateUser: function() {
              var clientId, token, uid;
              if (this.dfd == null) {
                this.initDfd();
                if (!(this.headers && this.user.id)) {
                  if ($location.search().token !== void 0) {
                    token = $location.search().token;
                    clientId = $location.search().client_id;
                    uid = $location.search().uid;
                    this.mustResetPassword = $location.search().reset_password;
                    this.firstTimeLogin = $location.search().account_confirmation_success;
                    this.setAuthHeaders(this.buildAuthHeaders({
                      token: token,
                      clientId: clientId,
                      uid: uid
                    }));
                    $location.url($location.path() || '/');
                  } else if ($cookieStore.get('auth_headers')) {
                    this.headers = $cookieStore.get('auth_headers');
                  }
                  console.log('@-->headers', this.headers);
                  if (this.headers) {
                    this.validateToken();
                  } else {
                    this.rejectDfd({
                      reason: 'unauthorized',
                      errors: ['No credentials']
                    });
                    $rootScope.$broadcast('auth:invalid');
                  }
                } else {
                  this.resolveDfd();
                }
              }
              return this.dfd.promise;
            },
            validateToken: function() {
              if (!this.tokenHasExpired()) {
                return $http.get(this.apiUrl() + config.tokenValidationPath).success((function(_this) {
                  return function(resp) {
                    _this.handleValidAuth(resp.data);
                    if (_this.firstTimeLogin) {
                      $rootScope.$broadcast('auth:email-confirmation-success', _this.user);
                    }
                    if (_this.mustResetPassword) {
                      $rootScope.$broadcast('auth:password-reset-confirm-success', _this.user);
                    }
                    return $rootScope.$broadcast('auth:validation-success', _this.user);
                  };
                })(this)).error((function(_this) {
                  return function(data) {
                    if (_this.firstTimeLogin) {
                      $rootScope.$broadcast('auth:email-confirmation-error', data);
                    }
                    if (_this.mustResetPassword) {
                      $rootScope.$broadcast('auth:password-reset-confirm-error', data);
                    }
                    $rootScope.$broadcast('auth:validation-error', data);
                    return _this.rejectDfd({
                      reason: 'unauthorized',
                      errors: data.errors
                    });
                  };
                })(this));
              } else {
                return this.rejectDfd({
                  reason: 'unauthorized',
                  errors: ['Expired credentials']
                });
              }
            },
            tokenHasExpired: function() {
              var expiry, now;
              expiry = this.getExpiry();
              now = new Date().getTime();
              if (this.headers && expiry) {
                return expiry && expiry < now;
              } else {
                return null;
              }
            },
            getExpiry: function() {
              return config.parseExpiry(this.headers);
            },
            invalidateTokens: function() {
              var key, val, _ref;
              _ref = this.user;
              for (key in _ref) {
                val = _ref[key];
                delete this.user[key];
              }
              this.headers = null;
              return delete $cookies['auth_headers'];
            },
            signOut: function() {
              return $http["delete"](this.apiUrl() + config.signOutUrl).success((function(_this) {
                return function(resp) {
                  _this.invalidateTokens();
                  return $rootScope.$broadcast('auth:logout-success');
                };
              })(this)).error((function(_this) {
                return function(resp) {
                  return $rootScope.$broadcast('auth:logout-error', resp);
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
                this.setAuthHeaders(this.buildAuthHeaders({
                  token: this.user.auth_token,
                  clientId: this.user.client_id,
                  uid: this.user.uid
                }));
              }
              return this.resolveDfd();
            },
            buildAuthHeaders: function(ctx) {
              var headers, key, val, _ref;
              headers = {};
              _ref = config.tokenFormat;
              for (key in _ref) {
                val = _ref[key];
                headers[key] = $interpolate(val)(ctx);
              }
              return headers;
            },
            setAuthHeaders: function(headers) {
              this.headers = angular.extend(this.headers || {}, headers);
              return $cookieStore.put('auth_headers', this.headers);
            },
            useExternalWindow: function() {
              return !(config.forceHardRedirect || $window.isOldIE());
            },
            initDfd: function() {
              return this.dfd = $q.defer();
            },
            rejectDfd: function(reason) {
              this.invalidateTokens();
              if (this.dfd != null) {
                this.dfd.reject(reason);
                return $timeout(((function(_this) {
                  return function() {
                    return _this.dfd = null;
                  };
                })(this)), 0);
              }
            },
            apiUrl: function() {
              if (config.proxyIf()) {
                return config.proxyUrl;
              } else {
                return config.apiUrl;
              }
            }
          };
        };
      })(this)
    ]
  };
}).config(function($httpProvider) {
  var httpMethods;
  $httpProvider.interceptors.push(function($injector) {
    return {
      request: function(req) {
        $injector.invoke(function($http, $auth) {
          var key, val, _ref;
          if (req.url.match($auth.config.apiUrl)) {
            _ref = $auth.headers;
            for (key in _ref) {
              val = _ref[key];
              req.headers[key] = val;
            }
          }
          return console.log('req headers', req.headers);
        });
        return req;
      },
      response: function(resp) {
        $injector.invoke(function($http, $auth) {
          var key, newHeaders, val, _ref;
          newHeaders = {};
          _ref = $auth.config.tokenFormat;
          for (key in _ref) {
            val = _ref[key];
            if (resp.headers(key)) {
              newHeaders[key] = resp.headers(key);
            }
          }
          return $auth.setAuthHeaders(newHeaders);
        });
        return resp;
      }
    };
  });
  httpMethods = ['get', 'post', 'put', 'patch', 'delete'];
  return angular.forEach(httpMethods, function(method) {
    var _base;
    if ((_base = $httpProvider.defaults.headers)[method] == null) {
      _base[method] = method;
    }
    return $httpProvider.defaults.headers[method]['If-Modified-Since'] = '0';
  });
}).run(function($auth, $window, $rootScope) {
  return $auth.initialize();
});

window.isOldIE = function() {
  var nav, out, version;
  out = false;
  nav = navigator.userAgent.toLowerCase();
  if (nav && nav.indexOf('msie') !== -1) {
    version = parseInt(nav.split('msie')[1]);
    if (version < 10) {
      out = true;
    }
  }
  return out;
};
