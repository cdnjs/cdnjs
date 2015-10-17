/*! angular-vertxbus - v0.8.0 - 2014-10-16
* http://github.com/knalli/angular-vertxbus
* Copyright (c) 2014 ; Licensed  */
(function () {
  var __hasProp = {}.hasOwnProperty;
  angular.module('knalli.angular-vertxbus', ['ng']);
  /*
    An AngularJS wrapper for projects using the VertX Event Bus
  
    * enabled (default true): if false, the usage of the Event Bus will be disabled (actually, no vertx.EventBus will be created)
    * debugEnabled (default false): if true, some additional debug loggings will be displayed
    * prefix (default 'vertx-eventbus.'): a prefix used for the global broadcasts
    * urlServer (default location.protocol + '//' + location.hostname + ':' + (location.port || 80): full URL to the server (change it if the server is not the origin)
    * urlPath (default '/eventbus'): path to the event bus
    * reconnectEnabled (default true): if false, the disconnect will be recognized but no further actions
    * sockjsStateInterval (default 10000 ms): defines the check interval of the underlayling SockJS connection
    * sockjsReconnectInterval (default 10000 ms): defines the wait time for a reconnect after a disconnect has been recognized
    * sockjsOptions (default {}): optional SockJS options (new SockJS(url, undefined, options))
  */
  angular.module('knalli.angular-vertxbus').provider('vertxEventBus', function () {
    var DEFAULT_OPTIONS, options;
    DEFAULT_OPTIONS = {
      enabled: true,
      debugEnabled: false,
      prefix: 'vertx-eventbus.',
      urlServer: '' + location.protocol + '//' + location.hostname + ':' + (location.port || 80),
      urlPath: '/eventbus',
      reconnectEnabled: true,
      sockjsStateInterval: 10000,
      sockjsReconnectInterval: 10000,
      sockjsOptions: {},
      messageBuffer: 0
    };
    options = angular.extend({}, DEFAULT_OPTIONS);
    this.enable = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.enabled;
      }
      options.enabled = value === true;
      return this;
    };
    this.useDebug = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.debugEnabled;
      }
      options.debugEnabled = value === true;
      return this;
    };
    this.usePrefix = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.prefix;
      }
      options.prefix = value;
      return this;
    };
    this.useUrlServer = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.urlServer;
      }
      options.urlServer = value;
      return this;
    };
    this.useUrlPath = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.urlPath;
      }
      options.urlPath = value;
      return this;
    };
    this.useReconnect = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.reconnectEnabled;
      }
      options.reconnectEnabled = value;
      return this;
    };
    this.useSockJsStateInterval = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.sockjsStateInterval;
      }
      options.sockjsStateInterval = value;
      return this;
    };
    this.useSockJsReconnectInterval = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.sockjsReconnectInterval;
      }
      options.sockjsReconnectInterval = value;
      return this;
    };
    this.useSockJsOptions = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.sockjsOptions;
      }
      options.sockjsOptions = value;
      return this;
    };
    this.useMessageBuffer = function (value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.messageBuffer;
      }
      options.messageBuffer = value;
      return this;
    };
    /*
      A stub representing the VertX Event Bus (core functionality)
    
      Because the Event Bus cannot handle a reconnect (because of the underlaying SockJS), a new instance of the bus have to be created.
      This stub ensures only one object holding the current active instance of the bus.
    
      The stub supports theses VertX Event Bus APIs:
      - close()
      - login(username, password, replyHandler)
      - send(address, message, handler)
      - publish(address, message)
      - registerHandler(adress, handler)
      - unregisterHandler(address, handler)
      - readyState()
    
      Furthermore, the stub supports theses extra APIs:
      - recconnect()
    */
    this.$get = [
      '$timeout',
      function ($timeout) {
        var EventBus_, connect, debugEnabled, enabled, eventBus, prefix, reconnectEnabled, sockjsOptions, sockjsReconnectInterval, sockjsStateInterval, stub, url, urlPath, urlServer, _ref;
        _ref = angular.extend({}, DEFAULT_OPTIONS, options), enabled = _ref.enabled, debugEnabled = _ref.debugEnabled, prefix = _ref.prefix, urlServer = _ref.urlServer, urlPath = _ref.urlPath, reconnectEnabled = _ref.reconnectEnabled, sockjsStateInterval = _ref.sockjsStateInterval, sockjsReconnectInterval = _ref.sockjsReconnectInterval, sockjsOptions = _ref.sockjsOptions;
        stub = null;
        EventBus_ = typeof vertx !== 'undefined' && vertx !== null ? vertx.EventBus : void 0;
        if (enabled && EventBus_) {
          url = '' + urlServer + urlPath;
          if (debugEnabled) {
            console.debug('[VertX EventBus] Enabled: connecting \'' + url + '\'');
          }
          eventBus = null;
          connect = function () {
            eventBus = new EventBus_(url, void 0, sockjsOptions);
            eventBus.onopen = function () {
              if (debugEnabled) {
                console.debug('[VertX EventBus] Connected');
              }
              if (typeof stub.onopen === 'function') {
                stub.onopen();
              }
            };
            eventBus.onclose = function () {
              if (debugEnabled) {
                console.debug('[VertX EventBus] Reconnect in ' + sockjsReconnectInterval + 'ms');
              }
              if (typeof stub.onclose === 'function') {
                stub.onclose();
              }
              if (reconnectEnabled) {
                $timeout(connect, sockjsReconnectInterval);
              }
            };
          };
          connect();
          stub = {
            reconnect: function () {
              return eventBus.close();
            },
            close: function () {
              return eventBus.close();
            },
            login: function (username, password, replyHandler) {
              return eventBus.login(username, password, replyHandler);
            },
            send: function (address, message, replyHandler) {
              return eventBus.send(address, message, replyHandler);
            },
            publish: function (address, message) {
              return eventBus.publish(address, message);
            },
            registerHandler: function (address, handler) {
              eventBus.registerHandler(address, handler);
              /* and return the deregister callback*/
              return function () {
                stub.unregisterHandler(address, handler);
              };
            },
            unregisterHandler: function (address, handler) {
              return eventBus.unregisterHandler(address, handler);
            },
            readyState: function () {
              return eventBus.readyState();
            },
            EventBus: EventBus_,
            getOptions: function () {
              return angular.extend({}, options);
            }
          };
        } else {
          if (debugEnabled) {
            console.debug('[VertX EventBus] Disabled');
          }
        }
        return stub;
      }
    ];
  });
  /*
    A service utilitzing an underlaying Vertx Event Bus
  
    The advanced features of this service are:
    - broadcasting the connection changes (vertx-eventbus.system.connected, vertx-eventbus.system.disconnected) on $rootScope
    - registering all handlers again when a reconnect had been required
    - supporting a promise when using send()
    - adding aliases on (registerHandler), un (unregisterHandler) and emit (publish)
  
    Basic usage:
    module.controller('MyController', function('vertxEventService'){
      vertxEventService.on('my.address', function(message) {
        console.log("JSON Message received: ", message)
      });
      vertxEventService.publish('my.other.address', {type: 'foo', data: 'bar'});
    });
  
    Note the additional configuration of the module itself.
  */
  angular.module('knalli.angular-vertxbus').provider('vertxEventBusService', function () {
    var DEFAULT_OPTIONS, MessageQueueHolder, SimpleMap, options;
    DEFAULT_OPTIONS = {
      loginRequired: false,
      loginBlockForSession: false,
      skipUnauthorizeds: true
    };
    MessageQueueHolder = function () {
      function MessageQueueHolder(maxSize) {
        this.maxSize = maxSize != null ? maxSize : 10;
        this.items = [];
      }
      MessageQueueHolder.prototype.push = function (item) {
        this.items.push(item);
        return this.recalibrateBufferSize();
      };
      MessageQueueHolder.prototype.recalibrateBufferSize = function () {
        while (this.items.length > this.maxSize) {
          this.first();
        }
        return this;
      };
      MessageQueueHolder.prototype.last = function () {
        return this.items.pop();
      };
      MessageQueueHolder.prototype.first = function () {
        return this.items.shift(0);
      };
      MessageQueueHolder.prototype.size = function () {
        return this.items.length;
      };
      return MessageQueueHolder;
    }();
    SimpleMap = function () {
      SimpleMap.prototype.keys = null;
      SimpleMap.prototype.values = null;
      function SimpleMap() {
        this.keys = [];
        this.values = [];
      }
      SimpleMap.prototype.put = function (key, value) {
        var idx;
        idx = this._indexForKey(key);
        if (idx > -1) {
          this.values[idx] = value;
        } else {
          this.keys.push(key);
          this.values.push(value);
        }
        return this;
      };
      SimpleMap.prototype._indexForKey = function (key) {
        var i, k, _i, _len, _ref;
        _ref = this.keys;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          k = _ref[i];
          if (key === k) {
            return i;
          }
        }
        return -1;
      };
      SimpleMap.prototype._indexForValue = function (value) {
        var i, v, _i, _len, _ref;
        _ref = this.values;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          v = _ref[i];
          if (value === v) {
            return i;
          }
        }
        return -1;
      };
      SimpleMap.prototype.containsKey = function (key) {
        var idx;
        idx = this._indexForKey(key);
        return idx > -1;
      };
      SimpleMap.prototype.containsValue = function (value) {
        var idx;
        idx = this._indexForValue(value);
        return idx > -1;
      };
      SimpleMap.prototype.get = function (key) {
        var idx;
        idx = this._indexForKey(key);
        if (idx > -1) {
          return this.values[idx];
        }
        return void 0;
      };
      SimpleMap.prototype.remove = function (key) {
        var idx;
        idx = this._indexForKey(key);
        if (idx > -1) {
          this.keys[idx] = void 0;
          this.values[idx] = void 0;
        }
        return void 0;
      };
      SimpleMap.prototype.clear = function () {
        this.keys = [];
        this.values = [];
        return this;
      };
      return SimpleMap;
    }();
    options = angular.extend({}, DEFAULT_OPTIONS);
    this.requireLogin = function (value) {
      if (value == null) {
        value = options.loginRequired;
      }
      options.loginRequired = value;
      return this;
    };
    this.blockForSession = function (value) {
      if (value == null) {
        value = options.loginBlockForSession;
      }
      options.loginBlockForSession = value;
      return this;
    };
    this.skipUnauthorizeds = function (value) {
      if (value == null) {
        value = options.skipUnauthorizeds;
      }
      options.skipUnauthorizeds = value;
      return this;
    };
    this.$get = [
      '$rootScope',
      '$q',
      '$interval',
      '$timeout',
      'vertxEventBus',
      function ($rootScope, $q, $interval, $timeout, vertxEventBus) {
        var connectionState, debugEnabled, enabled, ensureOpenAuthConnection, ensureOpenConnection, fnWrapperMap, loginPromise, messageBuffer, messageQueueHolder, prefix, reconnectEnabled, sockjsOptions, sockjsReconnectInterval, sockjsStateInterval, urlPath, urlServer, util, validSession, wrapped, _ref, _ref1;
        _ref = vertxEventBus.getOptions(), enabled = _ref.enabled, debugEnabled = _ref.debugEnabled, prefix = _ref.prefix, urlServer = _ref.urlServer, urlPath = _ref.urlPath, reconnectEnabled = _ref.reconnectEnabled, sockjsStateInterval = _ref.sockjsStateInterval, sockjsReconnectInterval = _ref.sockjsReconnectInterval, sockjsOptions = _ref.sockjsOptions, messageBuffer = _ref.messageBuffer;
        connectionState = vertxEventBus != null ? (_ref1 = vertxEventBus.EventBus) != null ? _ref1.CLOSED : void 0 : void 0;
        validSession = false;
        loginPromise = null;
        messageQueueHolder = new MessageQueueHolder(messageBuffer);
        fnWrapperMap = new SimpleMap();
        if (enabled && vertxEventBus) {
          vertxEventBus.onopen = function () {
            var address, callback, callbacks, fn, _i, _len, _ref2;
            wrapped.getConnectionState(true);
            $rootScope.$broadcast('' + prefix + 'system.connected');
            _ref2 = wrapped.handlers;
            for (address in _ref2) {
              if (!__hasProp.call(_ref2, address))
                continue;
              callbacks = _ref2[address];
              for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
                callback = callbacks[_i];
                util.registerHandler(address, callback);
              }
            }
            $rootScope.$digest();
            if (messageBuffer && messageQueueHolder.size()) {
              while (messageQueueHolder.size()) {
                fn = messageQueueHolder.first();
                if (typeof fn === 'function') {
                  fn();
                }
              }
              $rootScope.$digest();
            }
          };
          vertxEventBus.onclose = function () {
            wrapped.getConnectionState(true);
            return $rootScope.$broadcast('' + prefix + 'system.disconnected');
          };
        }
        ensureOpenConnection = function (fn) {
          if (wrapped.getConnectionState() === vertxEventBus.EventBus.OPEN) {
            fn();
            return true;
          } else if (messageBuffer) {
            messageQueueHolder.push(fn);
            return true;
          }
          return false;
        };
        ensureOpenAuthConnection = function (fn) {
          if (!options.loginRequired) {
            return ensureOpenConnection(fn);
          } else {
            return ensureOpenConnection(function () {
              if (validSession) {
                fn();
                return true;
              } else {
                if (debugEnabled) {
                  console.debug('[VertX EB Service] Message was not sent because login is required');
                }
                return false;
              }
            });
          }
        };
        util = {
          registerHandler: function (address, callback) {
            if (typeof callback !== 'function') {
              return;
            }
            if (debugEnabled) {
              console.debug('[VertX EB Service] Register handler for ' + address);
            }
            if (fnWrapperMap.containsKey(callback)) {
              return fnWrapperMap.get(callback);
            }
            fnWrapperMap.put(callback, function (message, replyTo) {
              callback(message, replyTo);
              return $rootScope.$digest();
            });
            return vertxEventBus.registerHandler(address, fnWrapperMap.get(callback));
          },
          unregisterHandler: function (address, callback) {
            if (typeof callback !== 'function') {
              return;
            }
            if (debugEnabled) {
              console.debug('[VertX EB Service] Unregister handler for ' + address);
            }
            vertxEventBus.unregisterHandler(address, fnWrapperMap.get(callback));
            fnWrapperMap.remove(callback);
          },
          send: function (address, message, timeout) {
            var deferred, dispatched;
            if (timeout == null) {
              timeout = 10000;
            }
            deferred = $q.defer();
            dispatched = ensureOpenAuthConnection(function () {
              vertxEventBus.send(address, message, function (reply) {
                if (deferred) {
                  return deferred.resolve(reply);
                }
              });
              if (deferred) {
                return $timeout(function () {
                  return deferred.reject();
                }, timeout);
              }
            });
            if (deferred && !dispatched) {
              deferred.reject();
            }
            return deferred != null ? deferred.promise : void 0;
          },
          publish: function (address, message) {
            var dispatched;
            dispatched = ensureOpenAuthConnection(function () {
              return vertxEventBus.publish(address, message);
            });
            return dispatched;
          },
          login: function (username, password, timeout) {
            var deferred;
            if (timeout == null) {
              timeout = 5000;
            }
            deferred = $q.defer();
            vertxEventBus.login(username, password, function (reply) {
              if ((reply != null ? reply.status : void 0) === 'ok') {
                deferred.resolve(reply);
                return $rootScope.$broadcast('' + prefix + 'system.login.succeeded', { status: reply != null ? reply.status : void 0 });
              } else {
                deferred.reject(reply);
                return $rootScope.$broadcast('' + prefix + 'system.login.failed', { status: reply != null ? reply.status : void 0 });
              }
            });
            $timeout(function () {
              return deferred.reject();
            }, timeout);
            return deferred.promise;
          }
        };
        wrapped = {
          handlers: {},
          registerHandler: function (address, callback) {
            var unregisterFn;
            if (!wrapped.handlers[address]) {
              wrapped.handlers[address] = [];
            }
            wrapped.handlers[address].push(callback);
            unregisterFn = null;
            if (connectionState === vertxEventBus.EventBus.OPEN) {
              unregisterFn = util.registerHandler(address, callback);
            }
            /* and return the deregister callback*/
            return function () {
              var index;
              if (unregisterFn) {
                unregisterFn();
              }
              if (wrapped.handlers[address]) {
                index = wrapped.handlers[address].indexOf(callback);
                if (index > -1) {
                  wrapped.handlers[address].splice(index, 1);
                }
              }
            };
          },
          unregisterHandler: function (address, callback) {
            var index;
            if (wrapped.handlers[address]) {
              index = wrapped.handlers[address].indexOf(callback);
              if (index > -1) {
                wrapped.handlers[address].splice(index, 1);
              }
            }
            if (connectionState === vertxEventBus.EventBus.OPEN) {
              return util.unregisterHandler(address, callback);
            }
          },
          send: function (address, message, timeout) {
            if (timeout == null) {
              timeout = 10000;
            }
            return util.send(address, message, timeout);
          },
          publish: function (address, message) {
            return util.publish(address, message);
          },
          getConnectionState: function (immediate) {
            if (vertxEventBus != null ? vertxEventBus.EventBus : void 0) {
              if (enabled) {
                if (immediate) {
                  connectionState = vertxEventBus.readyState();
                }
              } else {
                connectionState = vertxEventBus.EventBus.CLOSED;
              }
            } else {
              connectionState = 3;
            }
            return connectionState;
          },
          isValidSession: function () {
            return validSession;
          },
          login: function (username, password) {
            return util.login(username, password).then(function (reply) {
              validSession = true;
              return reply;
            })['catch'](function (reply) {
              validSession = false;
              return reply;
            });
          }
        };
        $interval(function () {
          return wrapped.getConnectionState(true);
        }, sockjsStateInterval);
        /* building and exposing the actual service API*/
        return {
          on: wrapped.registerHandler,
          addListener: wrapped.registerHandler,
          un: wrapped.unregisterHandler,
          removeListener: wrapped.unregisterHandler,
          send: wrapped.send,
          publish: wrapped.publish,
          emit: wrapped.publish,
          readyState: wrapped.getConnectionState,
          isEnabled: function () {
            return enabled;
          },
          getBufferCount: function () {
            return messageQueueHolder.size();
          },
          isValidSession: function () {
            return validSession;
          },
          login: wrapped.login
        };
      }
    ];
  });
}.call(this));