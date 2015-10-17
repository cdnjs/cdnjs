/*! angular-vertxbus - v0.11.1 - 2015-01-09
* http://github.com/knalli/angular-vertxbus
* Copyright (c) 2015 ; Licensed  */
(function() {
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

  angular.module('knalli.angular-vertxbus').provider('vertxEventBus', function() {
    var CONSTANTS, DEFAULT_OPTIONS, options;
    CONSTANTS = {
      MODULE: 'angular-vertxbus',
      COMPONENT: 'wrapper'
    };
    DEFAULT_OPTIONS = {
      enabled: true,
      debugEnabled: false,
      prefix: 'vertx-eventbus.',
      urlServer: "" + location.protocol + "//" + location.hostname + ":" + (location.port || 80),
      urlPath: '/eventbus',
      reconnectEnabled: true,
      sockjsStateInterval: 10000,
      sockjsReconnectInterval: 10000,
      sockjsOptions: {},
      messageBuffer: 0
    };
    options = angular.extend({}, DEFAULT_OPTIONS);
    this.enable = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.enabled;
      }
      options.enabled = value === true;
      return this;
    };
    this.enable.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.enable";
    this.useDebug = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.debugEnabled;
      }
      options.debugEnabled = value === true;
      return this;
    };
    this.useDebug.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.useDebug";
    this.usePrefix = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.prefix;
      }
      options.prefix = value;
      return this;
    };
    this.usePrefix.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.usePrefix";
    this.useUrlServer = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.urlServer;
      }
      options.urlServer = value;
      return this;
    };
    this.useUrlServer.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.useUrlServer";
    this.useUrlPath = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.urlPath;
      }
      options.urlPath = value;
      return this;
    };
    this.useUrlPath.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.useUrlPath";
    this.useReconnect = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.reconnectEnabled;
      }
      options.reconnectEnabled = value;
      return this;
    };
    this.useReconnect.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.useReconnect";
    this.useSockJsStateInterval = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.sockjsStateInterval;
      }
      options.sockjsStateInterval = value;
      return this;
    };
    this.useSockJsStateInterval.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.useSockJsStateInterval";
    this.useSockJsReconnectInterval = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.sockjsReconnectInterval;
      }
      options.sockjsReconnectInterval = value;
      return this;
    };
    this.useSockJsReconnectInterval.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.useSockJsReconnectInterval";
    this.useSockJsOptions = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.sockjsOptions;
      }
      options.sockjsOptions = value;
      return this;
    };
    this.useSockJsOptions.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.useSockJsOptions";
    this.useMessageBuffer = function(value) {
      if (value == null) {
        value = DEFAULT_OPTIONS.messageBuffer;
      }
      options.messageBuffer = value;
      return this;
    };
    this.useMessageBuffer.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.useMessageBuffer";

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
    this.$get = ['$timeout', '$log', function($timeout, $log) {
      var EventBusOriginal, EventBusStub, connect, debugEnabled, enabled, eventBus, prefix, reconnectEnabled, sockjsOptions, sockjsReconnectInterval, sockjsStateInterval, url, urlPath, urlServer, _ref;
      _ref = angular.extend({}, DEFAULT_OPTIONS, options), enabled = _ref.enabled, debugEnabled = _ref.debugEnabled, prefix = _ref.prefix, urlServer = _ref.urlServer, urlPath = _ref.urlPath, reconnectEnabled = _ref.reconnectEnabled, sockjsStateInterval = _ref.sockjsStateInterval, sockjsReconnectInterval = _ref.sockjsReconnectInterval, sockjsOptions = _ref.sockjsOptions;
      EventBusStub = null;
      EventBusOriginal = typeof vertx !== "undefined" && vertx !== null ? vertx.EventBus : void 0;
      if (enabled && EventBusOriginal) {
        url = "" + urlServer + urlPath;
        if (debugEnabled) {
          $log.debug("[Vert.x EB Stub] Enabled: connecting '" + url + "'");
        }
        eventBus = null;
        connect = function() {
          eventBus = new EventBusOriginal(url, void 0, sockjsOptions);
          eventBus.onopen = function() {
            if (debugEnabled) {
              $log.debug("[Vert.x EB Stub] Connected");
            }
            if (typeof EventBusStub.onopen === 'function') {
              EventBusStub.onopen();
            }
          };
          eventBus.onclose = function() {
            if (debugEnabled) {
              $log.debug("[Vert.x EB Stub] Reconnect in " + sockjsReconnectInterval + "ms");
            }
            if (typeof EventBusStub.onclose === 'function') {
              EventBusStub.onclose();
            }
            if (reconnectEnabled) {
              $timeout(connect, sockjsReconnectInterval);
            }
          };
        };
        connect();
        EventBusStub = {
          reconnect: function() {
            return eventBus.close();
          },
          close: function() {
            return eventBus.close();
          },
          login: function(username, password, replyHandler) {
            return eventBus.login(username, password, replyHandler);
          },
          send: function(address, message, replyHandler) {
            return eventBus.send(address, message, replyHandler);
          },
          publish: function(address, message) {
            return eventBus.publish(address, message);
          },
          registerHandler: function(address, handler) {
            var deconstructor;
            eventBus.registerHandler(address, handler);

            /* and return the deregister callback */
            deconstructor = function() {
              EventBusStub.unregisterHandler(address, handler);
            };
            deconstructor.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.registerHandler (deconstructor)";
            return deconstructor;
          },
          unregisterHandler: function(address, handler) {
            return eventBus.unregisterHandler(address, handler);
          },
          readyState: function() {
            return eventBus.readyState();
          },

          /* expose current used internal instance of actual EventBus */
          EventBus: EventBusOriginal,
          getOptions: function() {
            return angular.extend({}, options);
          }
        };
        EventBusStub.reconnect.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.reconnect";
        EventBusStub.close.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.close";
        EventBusStub.login.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.login";
        EventBusStub.send.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.send";
        EventBusStub.publish.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.publish";
        EventBusStub.registerHandler.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.registerHandler";
        EventBusStub.unregisterHandler.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.unregisterHandler";
        EventBusStub.readyState.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.readyState";
        EventBusStub.getOptions.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": EventBusStub.getOptions";
      } else {
        if (debugEnabled) {
          $log.debug("[Vert.x EB Stub] Disabled");
        }
      }
      return EventBusStub;
    }];
    this.$get.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": Factory.get";
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

  angular.module('knalli.angular-vertxbus').provider('vertxEventBusService', function() {
    var CONSTANTS, DEFAULT_OPTIONS, Queue, SimpleMap, options;
    CONSTANTS = {
      MODULE: 'angular-vertxbus',
      COMPONENT: 'service'
    };
    DEFAULT_OPTIONS = {
      loginRequired: false,
      loginBlockForSession: false,
      skipUnauthorizeds: true
    };

    /*
      Simple queue implementation
    
      FIFO: #push() + #first()
      LIFO: #push() + #last()
     */
    Queue = (function() {
      function Queue(maxSize) {
        this.maxSize = maxSize != null ? maxSize : 10;
        this.items = [];
      }

      Queue.prototype.push = function(item) {
        this.items.push(item);
        return this.recalibrateBufferSize();
      };

      Queue.prototype.recalibrateBufferSize = function() {
        while (this.items.length > this.maxSize) {
          this.first();
        }
        return this;
      };

      Queue.prototype.last = function() {
        return this.items.pop();
      };

      Queue.prototype.first = function() {
        return this.items.shift(0);
      };

      Queue.prototype.size = function() {
        return this.items.length;
      };

      return Queue;

    })();

    /*
      Simple Map implementation
    
      This implementation allows usage of non serializable keys for values.
     */
    SimpleMap = (function() {
      SimpleMap.prototype.keys = null;

      SimpleMap.prototype.values = null;

      function SimpleMap() {
        this.keys = [];
        this.values = [];
      }

      SimpleMap.prototype.put = function(key, value) {
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

      SimpleMap.prototype.get = function(key) {
        var idx;
        idx = this._indexForKey(key);
        if (idx > -1) {
          return this.values[idx];
        }
      };

      SimpleMap.prototype.containsKey = function(key) {
        var idx;
        idx = this._indexForKey(key);
        return idx > -1;
      };

      SimpleMap.prototype.containsValue = function(value) {
        var idx;
        idx = this._indexForValue(value);
        return idx > -1;
      };

      SimpleMap.prototype.remove = function(key) {
        var idx;
        idx = this._indexForKey(key);
        if (idx > -1) {
          this.keys[idx] = void 0;
          this.values[idx] = void 0;
        }
      };

      SimpleMap.prototype.clear = function() {
        this.keys = [];
        this.values = [];
        return this;
      };

      SimpleMap.prototype._indexForKey = function(key) {
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

      SimpleMap.prototype._indexForValue = function(value) {
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

      return SimpleMap;

    })();
    options = angular.extend({}, DEFAULT_OPTIONS);
    this.requireLogin = function(value) {
      if (value == null) {
        value = options.loginRequired;
      }
      options.loginRequired = value;
      return this;
    };
    this.requireLogin.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.requireLogin";
    this.blockForSession = function(value) {
      if (value == null) {
        value = options.loginBlockForSession;
      }
      options.loginBlockForSession = value;
      return this;
    };
    this.blockForSession.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.blockForSession";
    this.skipUnauthorizeds = function(value) {
      if (value == null) {
        value = options.skipUnauthorizeds;
      }
      options.skipUnauthorizeds = value;
      return this;
    };
    this.skipUnauthorizeds.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": provider.skipUnauthorizeds";
    this.$get = ['$rootScope', '$q', '$interval', '$timeout', 'vertxEventBus', '$log', function($rootScope, $q, $interval, $timeout, vertxEventBus, $log) {
      var callbackMap, connectionIntervalCheck, connectionState, debugEnabled, enabled, ensureOpenAuthConnection, ensureOpenConnection, loginPromise, messageBuffer, messageQueue, prefix, reconnectEnabled, sockjsOptions, sockjsReconnectInterval, sockjsStateInterval, urlPath, urlServer, util, validSession, wrapped, _ref, _ref1;
      _ref = (vertxEventBus != null ? vertxEventBus.getOptions() : void 0) || {}, enabled = _ref.enabled, debugEnabled = _ref.debugEnabled, prefix = _ref.prefix, urlServer = _ref.urlServer, urlPath = _ref.urlPath, reconnectEnabled = _ref.reconnectEnabled, sockjsStateInterval = _ref.sockjsStateInterval, sockjsReconnectInterval = _ref.sockjsReconnectInterval, sockjsOptions = _ref.sockjsOptions, messageBuffer = _ref.messageBuffer;
      connectionState = vertxEventBus != null ? (_ref1 = vertxEventBus.EventBus) != null ? _ref1.CLOSED : void 0 : void 0;
      validSession = false;
      loginPromise = null;
      messageQueue = new Queue(messageBuffer);
      callbackMap = new SimpleMap();
      if (enabled && vertxEventBus) {
        vertxEventBus.onopen = function() {
          var address, callback, callbacks, fn, _i, _len, _ref2;
          wrapped.getConnectionState(true);
          $rootScope.$broadcast("" + prefix + "system.connected");
          _ref2 = wrapped.handlers;
          for (address in _ref2) {
            if (!__hasProp.call(_ref2, address)) continue;
            callbacks = _ref2[address];
            for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
              callback = callbacks[_i];
              util.registerHandler(address, callback);
            }
          }
          $rootScope.$digest();
          if (messageBuffer && messageQueue.size()) {
            while (messageQueue.size()) {
              fn = messageQueue.first();
              if (typeof fn === 'function') {
                fn();
              }
            }
            $rootScope.$digest();
          }
        };
        vertxEventBus.onclose = function() {
          wrapped.getConnectionState(true);
          return $rootScope.$broadcast("" + prefix + "system.disconnected");
        };
        vertxEventBus.onclose.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": 'onclose' handler";
      }
      ensureOpenConnection = function(fn) {
        if (wrapped.getConnectionState() === vertxEventBus.EventBus.OPEN) {
          fn();
          return true;
        } else if (messageBuffer) {
          messageQueue.push(fn);
          return true;
        }
        return false;
      };
      ensureOpenConnection.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": ensureOpenConnection";
      ensureOpenAuthConnection = function(fn) {
        var wrapFn;
        if (!options.loginRequired) {
          return ensureOpenConnection(fn);
        } else {
          wrapFn = function() {
            if (validSession) {
              fn();
              return true;
            } else {
              if (debugEnabled) {
                $log.debug("[Vert.x EB Service] Message was not sent because login is required");
              }
              return false;
            }
          };
          wrapFn.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": ensureOpenAuthConnection function wrapper";
          return ensureOpenConnection(wrapFn);
        }
      };
      ensureOpenAuthConnection.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": ensureOpenAuthConnection";
      util = {
        registerHandler: function(address, callback) {
          var callbackWrapper;
          if (typeof callback !== 'function') {
            return;
          }
          if (debugEnabled) {
            $log.debug("[Vert.x EB Service] Register handler for " + address);
          }
          callbackWrapper = function(message, replyTo) {
            callback(message, replyTo);
            $rootScope.$digest();
          };
          callbackWrapper.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": util.registerHandler (callback wrapper)";
          callbackMap.put(callback, callbackWrapper);
          return vertxEventBus.registerHandler(address, callbackWrapper);
        },
        unregisterHandler: function(address, callback) {
          if (typeof callback !== 'function') {
            return;
          }
          if (debugEnabled) {
            $log.debug("[Vert.x EB Service] Unregister handler for " + address);
          }
          vertxEventBus.unregisterHandler(address, callbackMap.get(callback));
          callbackMap.remove(callback);
        },
        send: function(address, message, timeout) {
          var deferred, dispatched, next;
          if (timeout == null) {
            timeout = 10000;
          }
          deferred = $q.defer();
          next = function() {
            vertxEventBus.send(address, message, function(reply) {
              if (deferred) {
                return deferred.resolve(reply);
              }
            });
            if (deferred) {
              return $timeout((function() {
                return deferred.reject();
              }), timeout);
            }
          };
          next.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": util.send (ensureOpenAuthConnection callback)";
          dispatched = ensureOpenAuthConnection(next);
          if (deferred && !dispatched) {
            deferred.reject();
          }
          return deferred != null ? deferred.promise : void 0;
        },
        publish: function(address, message) {
          var dispatched, next;
          next = function() {
            return vertxEventBus.publish(address, message);
          };
          next.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": util.publish (ensureOpenAuthConnection callback)";
          dispatched = ensureOpenAuthConnection(next);
          return dispatched;
        },
        login: function(username, password, timeout) {
          var deferred, next;
          if (timeout == null) {
            timeout = 5000;
          }
          deferred = $q.defer();
          next = function(reply) {
            if ((reply != null ? reply.status : void 0) === 'ok') {
              deferred.resolve(reply);
              return $rootScope.$broadcast("" + prefix + "system.login.succeeded", {
                status: reply != null ? reply.status : void 0
              });
            } else {
              deferred.reject(reply);
              return $rootScope.$broadcast("" + prefix + "system.login.failed", {
                status: reply != null ? reply.status : void 0
              });
            }
          };
          next.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": util.login (callback)";
          vertxEventBus.login(username, password, next);
          $timeout((function() {
            return deferred.reject();
          }), timeout);
          return deferred.promise;
        }
      };
      util.registerHandler.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": util.registerHandler";
      util.unregisterHandler.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": util.unregisterHandler";
      util.send.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": util.send";
      util.publish.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": util.publish";
      util.login.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": util.login";
      wrapped = {
        handlers: {},
        registerHandler: function(address, callback) {
          var deconstructor, unregisterFn;
          if (!wrapped.handlers[address]) {
            wrapped.handlers[address] = [];
          }
          wrapped.handlers[address].push(callback);
          unregisterFn = null;
          if (connectionState === vertxEventBus.EventBus.OPEN) {
            unregisterFn = util.registerHandler(address, callback);
          }

          /* and return the deregister callback */
          deconstructor = function() {
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
            if (wrapped.handlers[address].length < 1) {
              wrapped.handlers[address] = void 0;
            }
          };
          deconstructor.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": wrapped.registerHandler (deconstructor)";
          return deconstructor;
        },
        unregisterHandler: function(address, callback) {
          var index;
          if (wrapped.handlers[address]) {
            index = wrapped.handlers[address].indexOf(callback);
            if (index > -1) {
              wrapped.handlers[address].splice(index, 1);
            }
          }
          if (wrapped.handlers[address].length < 1) {
            wrapped.handlers[address] = void 0;
          }
          if (connectionState === vertxEventBus.EventBus.OPEN) {
            return util.unregisterHandler(address, callback);
          }
        },
        send: function(address, message, timeout) {
          if (timeout == null) {
            timeout = 10000;
          }
          return util.send(address, message, timeout);
        },
        publish: function(address, message) {
          return util.publish(address, message);
        },
        getConnectionState: function(immediate) {
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
        isValidSession: function() {
          return validSession;
        },
        login: function(username, password) {
          return util.login(username, password).then(function(reply) {
            validSession = true;
            return reply;
          })["catch"](function(reply) {
            validSession = false;
            return reply;
          });
        }
      };
      wrapped.registerHandler.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": wrapped.registerHandler";
      wrapped.unregisterHandler.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": wrapped.unregisterHandler";
      wrapped.send.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": wrapped.send";
      wrapped.publish.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": wrapped.publish";
      wrapped.getConnectionState.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": wrapped.getConnectionState";
      wrapped.isValidSession.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": wrapped.isValidSession";
      wrapped.login.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": wrapped.login";
      connectionIntervalCheck = function() {
        return wrapped.getConnectionState(true);
      };
      connectionIntervalCheck.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": periodic connection check";
      $interval(connectionIntervalCheck, sockjsStateInterval);

      /* building and exposing the actual service API */
      return {
        on: wrapped.registerHandler,
        addListener: wrapped.registerHandler,
        un: wrapped.unregisterHandler,
        removeListener: wrapped.unregisterHandler,
        send: wrapped.send,
        publish: wrapped.publish,
        emit: wrapped.publish,
        readyState: wrapped.getConnectionState,
        isEnabled: function() {
          return enabled;
        },
        getBufferCount: function() {
          return messageQueue.size();
        },
        isValidSession: function() {
          return validSession;
        },
        login: wrapped.login
      };
    }];
    this.$get.displayName = "" + CONSTANTS.MODULE + "/" + CONSTANTS.COMPONENT + ": Factory.get";
  });

}).call(this);
