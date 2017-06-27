/** remotestorage.js 0.10.0, http://remotestorage.io, MIT-licensed **/
define([], function() {

/** FILE: lib/promising.js **/
(function(global) {
  function getPromise(builder) {
    var promise;

    if(typeof(builder) === 'function') {
      setTimeout(function() {
        try {
          builder(promise);
        } catch(e) {
          promise.reject(e);
        }
      }, 0);
    }

    var consumers = [], success, result;

    function notifyConsumer(consumer) {
      if(success) {
        var nextValue;
        if(consumer.fulfilled) {
          try {
            nextValue = [consumer.fulfilled.apply(null, result)];
          } catch(exc) {
            consumer.promise.reject(exc);
            return;
          }
        } else {
          nextValue = result;
        }
        if(nextValue[0] && typeof(nextValue[0].then) === 'function') {
          nextValue[0].then(consumer.promise.fulfill, consumer.promise.reject);
        } else {
          consumer.promise.fulfill.apply(null, nextValue);
        }
      } else {
        if(consumer.rejected) {
          var ret;
          try {
            ret = consumer.rejected.apply(null, result);
          } catch(exc) {
            consumer.promise.reject(exc);
            return;
          }
          if(ret && typeof(ret.then) === 'function') {
            ret.then(consumer.promise.fulfill, consumer.promise.reject);
          } else {
            consumer.promise.fulfill(ret);
          }
        } else {
          consumer.promise.reject.apply(null, result);
        }
      }
    }

    function resolve(succ, res) {
      if(result) {
        console.error("WARNING: Can't resolve promise, already resolved!");
        return;
      }
      success = succ;
      result = Array.prototype.slice.call(res);
      setTimeout(function() {
        var cl = consumers.length;
        if(cl === 0 && (! success)) {
          console.error("Possibly uncaught error: ", result, result[0] && result[0].stack);
        }
        for(var i=0;i<cl;i++) {
          notifyConsumer(consumers[i]);
        }
        consumers = undefined;
      }, 0);
    }

    promise = {

      then: function(fulfilled, rejected) {
        var consumer = {
          fulfilled: typeof(fulfilled) === 'function' ? fulfilled : undefined,
          rejected: typeof(rejected) === 'function' ? rejected : undefined,
          promise: getPromise()
        };
        if(result) {
          setTimeout(function() {
            notifyConsumer(consumer)
          }, 0);
        } else {
          consumers.push(consumer);
        }
        return consumer.promise;
      },

      fulfill: function() {
        resolve(true, arguments);
        return this;
      },
      
      reject: function() {
        resolve(false, arguments);
        return this;
      }
      
    };

    return promise;
  };

  global.promising = getPromise;

})(typeof(window) != 'undefined' ? window : global);


/** FILE: src/remotestorage.js **/
(function(global) {
  function logError(error) {
    if (typeof(error) === 'string') {
      console.error(error);
    } else {
      console.error(error.message, error.stack);
    }
  }

  function emitUnauthorized(status) {
    var args = Array.prototype.slice.call(arguments);
    if (status === 403  || status === 401) {
      this._emit('error', new RemoteStorage.Unauthorized());
    }
    var p = promising();
    return p.fulfill.apply(p,args);
  }

  function shareFirst(path) {
    return ( this.backend === 'dropbox' &&
             path.match(/^\/public\/.*[^\/]$/) );
  }

  var SyncedGetPutDelete = {
    get: function(path, maxAge) {
      var self = this;
      if (this.local) {
        if (maxAge === undefined) {
          if (this.connected) {
            maxAge = 2*this.getSyncInterval();
          } else {
            maxAge = false;
          }
        }
        var maxAgeInvalid = function(maxAge) {
          return maxAge !== false && typeof(maxAge) !== 'number';
        };

        if (maxAgeInvalid(maxAge)) {
          var promise = promising();
          promise.reject('Argument \'maxAge\' must be false or a number');
          return promise;
        }
        return this.local.get(path, maxAge, this.sync.queueGetRequest.bind(this.sync));
      } else {
        return this.remote.get(path);
      }
    },

    put: function(path, body, contentType) {
      if (shareFirst.bind(this)(path)) {
        return SyncedGetPutDelete._wrapBusyDone.call(this, this.remote.put(path, body, contentType));
      }
      else if (this.local) {
        return this.local.put(path, body, contentType);
      } else {
        return SyncedGetPutDelete._wrapBusyDone.call(this, this.remote.put(path, body, contentType));
      }
    },

    'delete': function(path) {
      if (this.local) {
        return this.local.delete(path);
      } else {
        return SyncedGetPutDelete._wrapBusyDone.call(this, this.remote.delete(path));
      }
    },

    _wrapBusyDone: function(result) {
      var self = this;
      this._emit('wire-busy');
      return result.then(function() {
        var promise = promising();
        self._emit('wire-done', { success: true });
        return promise.fulfill.apply(promise, arguments);
      }, function(err) {
        self._emit('wire-done', { success: false });
        throw err;
      });
    }
  };

  /**
   * Class: RemoteStorage
   *
   * TODO needs proper introduction and links to relevant classes etc
   *
   * Constructor for global remoteStorage object.
   *
   * This class primarily contains feature detection code and a global convenience API.
   *
   * Depending on which features are built in, it contains different attributes and
   * functions. See the individual features for more information.
   *
   */
  var RemoteStorage = function() {
    /**
     * Event: ready
     *
     * Fired when ready
     **/
    /**
     * Event: not-connected
     *
     * Fired when ready, but no storage connected ("anonymous mode")
     **/
    /**
     * Event: connected
     *
     * Fired when a remote storage has been connected
     **/
    /**
     * Event: disconnected
     *
     * Fired after disconnect
     **/
    /**
     * Event: error
     *
     * Fired when an error occurs
     *
     * Arguments:
     * the error
     **/
    /**
     * Event: features-loaded
     *
     * Fired when all features are loaded
     **/
    /**
     * Event: connecting
     *
     * Fired before webfinger lookup
     **/
    /**
     * Event: authing
     *
     * Fired before redirecting to the authing server
     **/
    /**
     * Event: wire-busy
     *
     * Fired when a wire request starts
     **/
    /**
     * Event: wire-done
     *
     * Fired when a wire request completes
     **/
    RemoteStorage.eventHandling(
      this, 'ready', 'connected', 'disconnected', 'not-connected', 'conflict',
            'error', 'features-loaded', 'connecting', 'authing', 'wire-busy',
            'wire-done', 'sync-interval-change'
    );

    // pending get/put/delete calls.
    this._pending = [];

    this._setGPD({
      get: this._pendingGPD('get'),
      put: this._pendingGPD('put'),
      delete: this._pendingGPD('delete')
    });

    this._cleanups = [];

    this._pathHandlers = { change: {} };

    this.apiKeys = {};

    if (this.localStorageAvailable()) {
      try {
        this.apiKeys = JSON.parse(localStorage['remotestorage:api-keys']);
      } catch(exc) {
        // ignored
      }
      this.setBackend(localStorage['remotestorage:backend'] || 'remotestorage');
    }

    var origOn = this.on;

    this.on = function(eventName, handler) {
      if (eventName === 'ready' && this.remote.connected && this._allLoaded) {
        setTimeout(handler, 0);
      } else if (eventName === 'features-loaded' && this._allLoaded) {
        setTimeout(handler, 0);
      }
      return origOn.call(this, eventName, handler);
    };

    this._init();

    this.fireInitial = function() {
      if (this.local) {
        setTimeout(this.local.fireInitial.bind(this.local), 0);
      }
    }.bind(this);

    this.on('ready', this.fireInitial.bind(this));
  };

  RemoteStorage.SyncedGetPutDelete = SyncedGetPutDelete;

  RemoteStorage.DiscoveryError = function(message) {
    Error.apply(this, arguments);
    this.message = message;
  };

  RemoteStorage.DiscoveryError.prototype = Object.create(Error.prototype);

  RemoteStorage.Unauthorized = function() { Error.apply(this, arguments); };
  RemoteStorage.Unauthorized.prototype = Object.create(Error.prototype);

  /**
   * Method: RemoteStorage.log
   *
   * Log using console.log, when remoteStorage logging is enabled.
   *
   * You can enable logging with <enableLog>.
   */
  RemoteStorage.log = function() {
    if (RemoteStorage.config.logging) {
      console.log.apply(console, arguments);
    }
  };

  RemoteStorage.config = {
    logging: false,
    changeEvents: {
      local:    true,
      window:   false,
      remote:   true,
      conflict: true
    }
  };

  RemoteStorage.prototype = {

    /**
     * Method: displayWidget
     *
     * Displays the widget at the top right of the page. Make sure to call this function
     * once on every pageload (after the html 'body' tag), unless you use a custom widget.
     *
     * Parameters:
     *
     *   domID: identifier of the DOM element which should embody the widget (optional)
     */
     // (see src/widget.js for implementation)

    /**
     * Method: connect
     *
     * Connect to a remoteStorage server.
     *
     * Parameters:
     *   userAddress - The user address (user@host) to connect to.
     *
     * Discovers the webfinger profile of the given user address and
     * initiates the OAuth dance.
     *
     * This method must be called *after* all required access has been claimed.
     *
     */
    connect: function(userAddress) {
      this.setBackend('remotestorage');
      if (userAddress.indexOf('@') < 0) {
        this._emit('error', new RemoteStorage.DiscoveryError("User address doesn't contain an @."));
        return;
      }
      this.remote.configure(userAddress);
      this._emit('connecting');

      var discoveryTimeout = setTimeout(function() {
        this._emit('error', new RemoteStorage.DiscoveryError("No storage information found at that user address."));
      }.bind(this), 5000);

      RemoteStorage.Discover(userAddress, function(href, storageApi, authURL) {
        clearTimeout(discoveryTimeout);
        if (!href) {
          this._emit('error', new RemoteStorage.DiscoveryError("Failed to contact storage server."));
          return;
        }
        this._emit('authing');
        this.remote.configure(userAddress, href, storageApi);
        if (! this.remote.connected) {
          if (authURL) {
            this.authorize(authURL);
          } else {
            // In lieu of an excplicit authURL, assume that the browser
            // and server handle any authorization needs; for instance,
            // TLS may trigger the browser to use a client certificate,
            // or a 401 Not Authorized response may make the browser
            // send a Kerberos ticket using the SPNEGO method.
            this.impliedauth();
          }
        }
      }.bind(this));
    },

    /**
     * Method: disconnect
     *
     * "Disconnect" from remotestorage server to terminate current session.
     * This method clears all stored settings and deletes the entire local
     * cache.
     */
    disconnect: function() {
      if (this.remote) {
        this.remote.configure(null, null, null, null);
      }
      this._setGPD({
        get: this._pendingGPD('get'),
        put: this._pendingGPD('put'),
        delete: this._pendingGPD('delete')
      });
      var n = this._cleanups.length, i = 0;

      var oneDone = function() {
        i++;
        if (i >= n) {
          this._init();
          RemoteStorage.log('Done cleaning up, emitting disconnected and disconnect events');
          this._emit('disconnected');
        }
      }.bind(this);

      if (n > 0) {
        this._cleanups.forEach(function(cleanup) {
          var cleanupResult = cleanup(this);
          if (typeof(cleanup) === 'object' && typeof(cleanup.then) === 'function') {
            cleanupResult.then(oneDone);
          } else {
            oneDone();
          }
        }.bind(this));
      } else {
        oneDone();
      }
    },

    setBackend: function(what) {
      this.backend = what;
      if (this.localStorageAvailable()) {
        if (what) {
          localStorage['remotestorage:backend'] = what;
        } else {
          delete localStorage['remotestorage:backend'];
        }
      }
    },

    /**
     * Method: onChange
     *
     * Add a "change" event handler to the given path. Whenever a "change"
     * happens (as determined by the backend, such as e.g.
     * <RemoteStorage.IndexedDB>) and the affected path is equal to or below
     * the given 'path', the given handler is called.
     *
     * You should usually not use this method directly, but instead use the
     * "change" events provided by <RemoteStorage.BaseClient>.
     *
     * Parameters:
     *   path    - Absolute path to attach handler to.
     *   handler - Handler function.
     */
    onChange: function(path, handler) {
      if (! this._pathHandlers.change[path]) {
        this._pathHandlers.change[path] = [];
      }
      this._pathHandlers.change[path].push(handler);
    },

    /**
     * Method: enableLog
     *
     * Enable remoteStorage logging
     */
    enableLog: function() {
      RemoteStorage.config.logging = true;
    },

    /**
     * Method: disableLog
     *
     * Disable remoteStorage logging
     */
    disableLog: function() {
      RemoteStorage.config.logging = false;
    },

    /**
     * Method: log
     *
     * The same as <RemoteStorage.log>.
     */
    log: function() {
      RemoteStorage.log.apply(RemoteStorage, arguments);
    },

    /**
     * Method: setApiKeys (experimental)
     *
     * Set API keys for (currently) GoogleDrive and/or Dropbox backend support.
     * See also the 'backends' example in the starter-kit. Note that support for
     * both these backends is still experimental.
     *
     * Parameters:
     * type - string, either 'googledrive' or 'dropbox'
     * keys - object, with one string field; 'client_id' for GoogleDrive, or
     *          'api_key' for Dropbox.
     *
     */
    setApiKeys: function(type, keys) {
      if (keys) {
        this.apiKeys[type] = keys;
      } else {
        delete this.apiKeys[type];
      }
      if (this.localStorageAvailable()) {
        localStorage['remotestorage:api-keys'] = JSON.stringify(this.apiKeys);
      }
    },

    /**
     ** INITIALIZATION
     **/

    _init: function() {
      var self = this,
          readyFired = false;

      function fireReady() {
        try {
          if (!readyFired) {
            self._emit('ready');
            readyFired = true;
          }
        } catch(e) {
          console.error("'ready' failed: ", e, e.stack);
          self._emit('error', e);
        }
      }

      this._loadFeatures(function(features) {
        this.log('[RemoteStorage] All features loaded');
        this.local = features.local && new features.local();
        // this.remote set by WireClient._rs_init as lazy property on
        // RS.prototype

        if (this.local && this.remote) {
          this._setGPD(SyncedGetPutDelete, this);
          this._bindChange(this.local);
        } else if (this.remote) {
          this._setGPD(this.remote, this.remote);
        }

        if (this.remote) {
          this.remote.on('connected', function(){
            fireReady();
            self._emit('connected');
          });
          this.remote.on('not-connected', function(){
            fireReady();
            self._emit('not-connected');
          });
          if (this.remote.connected) {
            fireReady();
            self._emit('connected');
          }
        }

        this._collectCleanupFunctions();

        try {
          this._allLoaded = true;
          this._emit('features-loaded');
        } catch(exc) {
          logError(exc);
          this._emit('error', exc);
        }
        this._processPending();
      }.bind(this));
    },

    _collectCleanupFunctions: function() {
      for (var i=0; i < this.features.length; i++) {
        var cleanup = this.features[i].cleanup;
        if (typeof(cleanup) === 'function') {
          this._cleanups.push(cleanup);
        }
      }
    },

    /**
     ** FEATURE DETECTION
     **/
    _loadFeatures: function(callback) {
      var featureList = [
        'WireClient',
        'I18n',
        'Dropbox',
        'GoogleDrive',
        'Access',
        'Caching',
        'Discover',
        'Authorize',
        'Widget',
        'IndexedDB',
        'LocalStorage',
        'InMemoryStorage',
        'Sync',
        'BaseClient',
        'Env'
      ];
      var features = [];
      var featuresDone = 0;
      var self = this;

      function featureDone() {
        featuresDone++;
        if (featuresDone === featureList.length) {
          setTimeout(function() {
            features.caching = !!RemoteStorage.Caching;
            features.sync = !!RemoteStorage.Sync;
            [
              'IndexedDB',
              'LocalStorage',
              'InMemoryStorage'
            ].some(function(cachingLayer) {
              if (features.some(function(feature) { return feature.name === cachingLayer; })) {
                features.local = RemoteStorage[cachingLayer];
                return true;
              }
            });
            self.features = features;
            callback(features);
          }, 0);
        }
      }

      function featureInitialized(name) {
        self.log("[RemoteStorage] [FEATURE "+name+"] initialized.");
        features.push({
          name : name,
          init :  RemoteStorage[name]._rs_init,
          supported : true,
          cleanup : RemoteStorage[name]._rs_cleanup
        });
        featureDone();
      }

      function featureFailed(name, err) {
        self.log("[RemoteStorage] [FEATURE "+name+"] initialization failed ( "+err+")");
        featureDone();
      }

      function featureSupported(name, success) {
        self.log("[RemoteStorage] [FEATURE "+name+"]" + success ? "":" not"+" supported");
        if (!success) {
          featureDone();
        }
      }

      function initFeature(name) {
        var initResult;
        try {
          initResult = RemoteStorage[name]._rs_init(self);
        } catch(e) {
          featureFailed(name, e);
          return;
        }
        if (typeof(initResult) === 'object' && typeof(initResult.then) === 'function') {
          initResult.then(
            function(){ featureInitialized(name); },
            function(err){ featureFailed(name, err); }
          );
        } else {
          featureInitialized(name);
        }
      }

      featureList.forEach(function(featureName) {
        self.log("[RemoteStorage] [FEATURE " + featureName + "] initializing...");
        var impl = RemoteStorage[featureName];
        var supported;

        if (impl) {
          supported = !impl._rs_supported || impl._rs_supported();

          if (typeof supported === 'object') {
            supported.then(
              function(){
                featureSupported(featureName, true);
                initFeature(featureName);
              },
              function(){
                featureSupported(featureName, false);
              }
            );
          }
          else if (typeof supported === 'boolean') {
            featureSupported(featureName, supported);
            if (supported) {
              initFeature(featureName);
            }
          }
        } else {
          featureSupported(featureName, false);
        }
      });
    },

    localStorageAvailable: function() {
      try {
        return !!global.localStorage;
      } catch(error) {
        return false;
      }
    },

    /**
     ** GET/PUT/DELETE INTERFACE HELPERS
     **/

    _setGPD: function(impl, context) {
      function wrap(f) {
        return function() {
          return f.apply(context, arguments)
            .then(emitUnauthorized.bind(this));
        };
      }
      this.get = wrap(impl.get);
      this.put = wrap(impl.put);
      this.delete = wrap(impl.delete);
    },

    _pendingGPD: function(methodName) {
      return function() {
        var promise = promising();
        this._pending.push({
          method: methodName,
          args: Array.prototype.slice.call(arguments),
          promise: promise
        });
        return promise;
      }.bind(this);
    },

    _processPending: function() {
      this._pending.forEach(function(pending) {
        try {
          this[pending.method].apply(this, pending.args).then(pending.promise.fulfill, pending.promise.reject);
        } catch(e) {
          pending.promise.reject(e);
        }
      }.bind(this));
      this._pending = [];
    },

    /**
     ** CHANGE EVENT HANDLING
     **/

    _bindChange: function(object) {
      object.on('change', this._dispatchEvent.bind(this, 'change'));
    },

    _dispatchEvent: function(eventName, event) {
      for (var path in this._pathHandlers[eventName]) {
        var pl = path.length;
        var self = this;
        if (event.path.substr(0, pl) === path) {
          this._pathHandlers[eventName][path].forEach(function(handler) {
            var ev = {};
            for (var key in event) { ev[key] = event[key]; }
            ev.relativePath = event.path.replace(new RegExp('^' + path), '');
            try {
              handler(ev);
            } catch(e) {
              console.error("'change' handler failed: ", e, e.stack);
              self._emit('error', e);
            }
          });
        }
      }
    }
  };

  /**
   * Property: connected
   *
   * Boolean property indicating if remoteStorage is currently connected.
   */
  Object.defineProperty(RemoteStorage.prototype, 'connected', {
    get: function() {
      return this.remote.connected;
    }
  });

  /**
   * Property: access
   *
   * Tracking claimed access scopes. A <RemoteStorage.Access> instance.
   *
   *
   * Property: caching
   *
   * Caching settings. A <RemoteStorage.Caching> instance.
   *
   * Not available in no-cache builds.
   *
   *
   * Property: remote
   *
   * Access to the remote backend used. Usually a <RemoteStorage.WireClient>.
   *
   *
   * Property: local
   *
   * Access to the local caching backend used. Usually either a
   * <RemoteStorage.IndexedDB> or <RemoteStorage.LocalStorage> instance.
   *
   * Not available in no-cache builds.
   */

  global.RemoteStorage = RemoteStorage;

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/eventhandling.js **/
(function(global) {
  /**
   * Interface: eventhandling
   */
  var methods = {
    /**
     * Method: addEventListener
     *
     * Install an event handler for the given event name
     */
    addEventListener: function(eventName, handler) {
      if (typeof(eventName) !== 'string') {
        throw new Error('Argument eventName should be a string');
      }
      if (typeof(handler) !== 'function') {
        throw new Error('Argument handler should be a function');
      }
      RemoteStorage.log('[Eventhandling] Adding event listener', eventName, handler);
      this._validateEvent(eventName);
      this._handlers[eventName].push(handler);
    },

    /**
     * Method: removeEventListener
     *
     * Remove a previously installed event handler
     */
    removeEventListener: function(eventName, handler) {
      this._validateEvent(eventName);
      var hl = this._handlers[eventName].length;
      for (var i=0;i<hl;i++) {
        if (this._handlers[eventName][i] === handler) {
          this._handlers[eventName].splice(i, 1);
          return;
        }
      }
    },

    _emit: function(eventName) {
      this._validateEvent(eventName);
      var args = Array.prototype.slice.call(arguments, 1);
      this._handlers[eventName].forEach(function(handler) {
        handler.apply(this, args);
      });
    },

    _validateEvent: function(eventName) {
      if (! (eventName in this._handlers)) {
        throw new Error("Unknown event: " + eventName);
      }
    },

    _delegateEvent: function(eventName, target) {
      target.on(eventName, function(event) {
        this._emit(eventName, event);
      }.bind(this));
    },

    _addEvent: function(eventName) {
      this._handlers[eventName] = [];
    }
  };

  /**
   * Method: eventhandling.on
   *
   * Alias for <addEventListener>
   **/
  methods.on = methods.addEventListener;

  /**
   * Function: eventHandling
   *
   * Mixes event handling functionality into an object.
   *
   * The first parameter is always the object to be extended.
   * All remaining parameter are expected to be strings, interpreted as valid event
   * names.
   *
   * Example:
   *   (start code)
   *   var MyConstructor = function() {
   *     eventHandling(this, 'connected', 'disconnected');
   *
   *     this._emit('connected');
   *     this._emit('disconnected');
   *     // This would throw an exception:
   *     // this._emit('something-else');
   *   };
   *
   *   var myObject = new MyConstructor();
   *   myObject.on('connected', function() { console.log('connected'); });
   *   myObject.on('disconnected', function() { console.log('disconnected'); });
   *   // This would throw an exception as well:
   *   // myObject.on('something-else', function() {});
   *   (end code)
   */
  RemoteStorage.eventHandling = function(object) {
    var eventNames = Array.prototype.slice.call(arguments, 1);
    for (var key in methods) {
      object[key] = methods[key];
    }
    object._handlers = {};
    eventNames.forEach(function(eventName) {
      object._addEvent(eventName);
    });
  };
})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/wireclient.js **/
(function(global) {
  var RS = RemoteStorage;

  /**
   * Class: RemoteStorage.WireClient
   *
   * WireClient Interface
   * --------------------
   *
   * This file exposes a get/put/delete interface on top of XMLHttpRequest.
   * It requires to be configured with parameters about the remotestorage server to
   * connect to.
   * Each instance of WireClient is always associated with a single remotestorage
   * server and access token.
   *
   * Usually the WireClient instance can be accessed via `remoteStorage.remote`.
   *
   * This is the get/put/delete interface:
   *
   *   - #get() takes a path and optionally a ifNoneMatch option carrying a version
   *     string to check. It returns a promise that will be fulfilled with the HTTP
   *     response status, the response body, the MIME type as returned in the
   *     'Content-Type' header and the current revision, as returned in the 'ETag'
   *     header.
   *   - #put() takes a path, the request body and a content type string. It also
   *     accepts the ifMatch and ifNoneMatch options, that map to the If-Match and
   *     If-None-Match headers respectively. See the remotestorage-01 specification
   *     for details on handling these headers. It returns a promise, fulfilled with
   *     the same values as the one for #get().
   *   - #delete() takes a path and the ifMatch option as well. It returns a promise
   *     fulfilled with the same values as the one for #get().
   *
   * In addition to this, the WireClient has some compatibility features to work with
   * remotestorage 2012.04 compatible storages. For example it will cache revisions
   * from folder listings in-memory and return them accordingly as the "revision"
   * parameter in response to #get() requests. Similarly it will return 404 when it
   * receives an empty folder listing, to mimic remotestorage-01 behavior. Note
   * that it is not always possible to know the revision beforehand, hence it may
   * be undefined at times (especially for caching-roots).
   */

  var hasLocalStorage;
  var SETTINGS_KEY = "remotestorage:wireclient";

  var API_2012 = 1, API_00 = 2, API_01 = 3, API_02 = 4, API_HEAD = 5;

  var STORAGE_APIS = {
    'draft-dejong-remotestorage-00': API_00,
    'draft-dejong-remotestorage-01': API_01,
    'draft-dejong-remotestorage-02': API_02,
    'https://www.w3.org/community/rww/wiki/read-write-web-00#simple': API_2012
  };

  var isArrayBufferView;

  if (typeof(ArrayBufferView) === 'function') {
    isArrayBufferView = function(object) { return object && (object instanceof ArrayBufferView); };
  } else {
    var arrayBufferViews = [
      Int8Array, Uint8Array, Int16Array, Uint16Array,
      Int32Array, Uint32Array, Float32Array, Float64Array
    ];
    isArrayBufferView = function(object) {
      for (var i=0;i<8;i++) {
        if (object instanceof arrayBufferViews[i]) {
          return true;
        }
      }
      return false;
    };
  }

  function addQuotes(str) {
    if (typeof(str) !== 'string') {
      return str;
    }
    if (str === '*') {
      return '*';
    }

    return '"' + str + '"';
  }

  function stripQuotes(str) {
    if (typeof(str) !== 'string') {
      return str;
    }

    return str.replace(/^["']|["']$/g, '');
  }

  function readBinaryData(content, mimeType, callback) {
    var blob = new Blob([content], { type: mimeType });
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
      callback(reader.result); // reader.result contains the contents of blob as a typed array
    });
    reader.readAsArrayBuffer(blob);
  }

  function getTextFromArrayBuffer(arrayBuffer, encoding, callback) {
    if (typeof Blob === 'undefined') {
      var buffer = new Buffer(new Uint8Array(arrayBuffer));
      callback(buffer.toString(encoding));
    } else {
      var blob = new Blob([arrayBuffer]);
      var fileReader = new FileReader();
      fileReader.addEventListener("loadend", function(evt) {
        callback(evt.target.result);
      });
      fileReader.readAsText(blob, encoding);
    }
  }

  function determineCharset(mimeType) {
    var charset = 'utf-8';
    var charsetMatch;

    if (mimeType) {
      charsetMatch = mimeType.match(/charset=(.+)$/);
      if (charsetMatch) {
        charset = charsetMatch[1];
      }
    }

    return charset;
  }

  function cleanPath(path) {
    return path.replace(/\/+/g, '/').split('/').map(encodeURIComponent).join('/');
  }

  function isFolder(path) {
    return (path.substr(-1) === '/');
  }

  function isFolderDescription(body) {
    return ((body['@context'] === 'http://remotestorage.io/spec/folder-description')
             && (typeof(body['items']) === 'object'));
  }

  function isSuccessStatus(status) {
    return [201, 204, 304].indexOf(status) >= 0;
  }

  function isErrorStatus(status) {
    return [401, 403, 404, 412].indexOf(status) >= 0;
  }

  var onErrorCb;

  /**
   * Class : RemoteStorage.WireClient
   **/
  RS.WireClient = function(rs) {
    this.connected = false;

    /**
     * Event: change
     *   never fired for some reason
     *
     * Event: connected
     *   fired when the wireclient connect method realizes that it is
     *   in posession of a token and a href
     **/
    RS.eventHandling(this, 'change', 'connected', 'wire-busy', 'wire-done', 'not-connected');

    onErrorCb = function(error){
      if (error instanceof RemoteStorage.Unauthorized ||
          error instanceof RemoteStorage.SyncError) {
        this.configure(undefined, undefined, undefined, null);
      }
    }.bind(this);
    rs.on('error', onErrorCb);
    if (hasLocalStorage) {
      var settings;
      try { settings = JSON.parse(localStorage[SETTINGS_KEY]); } catch(e) {}
      if (settings) {
        setTimeout(function() {
          this.configure(settings.userAddress, settings.href, settings.storageApi, settings.token);
        }.bind(this), 0);
      }
    }

    this._revisionCache = {};

    if (this.connected) {
      setTimeout(this._emit.bind(this), 0, 'connected');
    }
  };

  RS.WireClient.REQUEST_TIMEOUT = 30000;

  RS.WireClient.prototype = {
    /**
     * Property: token
     *
     * Holds the bearer token of this WireClient, as obtained in the OAuth dance
     *
     * Example:
     *   (start code)
     *
     *   remoteStorage.remote.token
     *   // -> 'DEADBEEF01=='
     */

    /**
     * Property: href
     *
     * Holds the server's base URL, as obtained in the Webfinger discovery
     *
     * Example:
     *   (start code)
     *
     *   remoteStorage.remote.href
     *   // -> 'https://storage.example.com/users/jblogg/'
     */

    /**
     * Property: storageApi
     *
     * Holds the spec version the server claims to be compatible with
     *
     * Example:
     *   (start code)
     *
     *   remoteStorage.remote.storageApi
     *   // -> 'draft-dejong-remotestorage-01'
     */

    _request: function(method, uri, token, headers, body, getEtag, fakeRevision) {
      if ((method === 'PUT' || method === 'DELETE') && uri[uri.length - 1] === '/') {
        throw "Don't " + method + " on directories!";
      }

      var promise = promising();
      var revision;
      var reqType;
      var self = this;

      if (token !== RemoteStorage.Authorize.IMPLIED_FAKE_TOKEN) {
        headers['Authorization'] = 'Bearer ' + token;
      }

      this._emit('wire-busy', {
        method: method,
        isFolder: isFolder(uri)
      });

      RS.WireClient.request(method, uri, {
        body: body,
        headers: headers,
        responseType: 'arraybuffer'
      }, function(error, response) {
        if (error) {
          self._emit('wire-done', {
            method: method,
            isFolder: isFolder(uri),
            success: false
          });
          self.online = false;
          promise.reject(error);
        } else {
          self._emit('wire-done', {
            method: method,
            isFolder: isFolder(uri),
            success: true
          });
          self.online = true;
          if (isErrorStatus(response.status)) {
            RemoteStorage.log('[WireClient] Error response status', response.status);
            if (getEtag) {
              revision = stripQuotes(response.getResponseHeader('ETag'));
            } else {
              revision = undefined;
            }
            promise.fulfill(response.status, undefined, undefined, revision);
          } else if (isSuccessStatus(response.status) ||
                     (response.status === 200 && method !== 'GET')) {
            revision = stripQuotes(response.getResponseHeader('ETag'));
            RemoteStorage.log('[WireClient] Successful request', revision);
            promise.fulfill(response.status, undefined, undefined, revision);
          } else {
            var mimeType = response.getResponseHeader('Content-Type');
            var body;
            if (getEtag) {
              revision = stripQuotes(response.getResponseHeader('ETag'));
            } else {
              revision = response.status === 200 ? fakeRevision : undefined;
            }

            var charset = determineCharset(mimeType);

            if ((!mimeType) || charset === 'binary') {
              RemoteStorage.log('[WireClient] Successful request with unknown or binary mime-type', revision);
              promise.fulfill(response.status, response.response, mimeType, revision);
            } else {
              getTextFromArrayBuffer(response.response, charset, function(body) {
                RemoteStorage.log('[WireClient] Successful request', revision);
                promise.fulfill(response.status, body, mimeType, revision);
              });
            }
          }
        }
      });
      return promise;
    },

    configure: function(userAddress, href, storageApi, token) {
      if (typeof(userAddress) !== 'undefined') {
        this.userAddress = userAddress;
      }
      if (typeof(href) !== 'undefined') {
        this.href = href;
      }
      if (typeof(storageApi) !== 'undefined') {
        this.storageApi = storageApi;
      }
      if (typeof(token) !== 'undefined') {
        this.token = token;
      }
      if (typeof(this.storageApi) !== 'undefined') {
        this._storageApi = STORAGE_APIS[this.storageApi] || API_HEAD;
        this.supportsRevs = this._storageApi >= API_00;
      }
      if (this.href && this.token) {
        this.connected = true;
        this.online = true;
        this._emit('connected');
      } else {
        this.connected = false;
      }
      if (hasLocalStorage) {
        localStorage[SETTINGS_KEY] = JSON.stringify({
          userAddress: this.userAddress,
          href: this.href,
          token: this.token,
          storageApi: this.storageApi
        });
      }
      RS.WireClient.configureHooks.forEach(function(hook) {
        hook.call(this);
      }.bind(this));
    },

    stopWaitingForToken: function() {
      if (!this.connected) {
        this._emit('not-connected');
      }
    },

    get: function(path, options) {
      if (!this.connected) {
        throw new Error("not connected (path: " + path + ")");
      }
      if (!options) { options = {}; }
      var headers = {};
      if (this.supportsRevs) {
        if (options.ifNoneMatch) {
          headers['If-None-Match'] = addQuotes(options.ifNoneMatch);
        }
      } else if (options.ifNoneMatch) {
        var oldRev = this._revisionCache[path];
      }
      var promise = this._request('GET', this.href + cleanPath(path), this.token, headers,
                            undefined, this.supportsRevs, this._revisionCache[path]);
      if (isFolder(path)) {
        return promise.then(function(status, body, contentType, revision) {
          var itemsMap = {};

          if (typeof(body) !== 'undefined') {
            try {
              body = JSON.parse(body);
            } catch (e) {
              throw 'Folder description at ' + this.href + cleanPath(path) + ' is not JSON';
            }
          }
          // New folder listing received
          if (status === 200 && typeof(body) === 'object') {
            // Empty folder listing of any spec
            if (Object.keys(body).length === 0) {
              status = 404;
            }
            // >= 02 spec
            else if (isFolderDescription(body)) {
              for (var item in body.items) {
                this._revisionCache[path + item] = body.items[item].ETag;
              }
              itemsMap = body.items;
            }
            // < 02 spec
            else {
              Object.keys(body).forEach(function(key){
                this._revisionCache[path + key] = body[key];
                itemsMap[key] = {"ETag": body[key]};
              }.bind(this));
            }
            return promising().fulfill(status, itemsMap, contentType, revision);
          } else {
            return promising().fulfill(status, body, contentType, revision);
          }
        }.bind(this));
      } else {
        return promise;
      }
    },

    put: function(path, body, contentType, options) {
      if (!this.connected) {
        throw new Error("not connected (path: " + path + ")");
      }
      if (!options) { options = {}; }
      if (!contentType.match(/charset=/)) {
        contentType += '; charset=' + ((body instanceof ArrayBuffer || isArrayBufferView(body)) ? 'binary' : 'utf-8');
      }
      var headers = { 'Content-Type': contentType };
      if (this.supportsRevs) {
        if (options.ifMatch) {
          headers['If-Match'] = addQuotes(options.ifMatch);
        }
        if (options.ifNoneMatch) {
          headers['If-None-Match'] = addQuotes(options.ifNoneMatch);
        }
      }
      return this._request('PUT', this.href + cleanPath(path), this.token,
                     headers, body, this.supportsRevs);
    },

    'delete': function(path, options) {
      if (!this.connected) {
        throw new Error("not connected (path: " + path + ")");
      }
      if (!options) { options = {}; }
      var headers = {};
      if (this.supportsRevs) {
        if (options.ifMatch) {
          headers['If-Match'] = addQuotes(options.ifMatch);
        }
      }
      return this._request('DELETE', this.href + cleanPath(path), this.token,
                     headers,
                     undefined, this.supportsRevs);
    }
  };

  // Shared cleanPath used by Dropbox
  RS.WireClient.cleanPath = cleanPath;

  // Shared isArrayBufferView used by WireClient and Dropbox
  RS.WireClient.isArrayBufferView = isArrayBufferView;

  RS.WireClient.readBinaryData = readBinaryData;

  // Shared request function used by WireClient, GoogleDrive and Dropbox.
  RS.WireClient.request = function(method, url, options, callback) {
    RemoteStorage.log('[WireClient]', method, url);

    callback = callback.bind(this);

    var timedOut = false;

    var timer = setTimeout(function() {
      timedOut = true;
      callback('timeout');
    }, RS.WireClient.REQUEST_TIMEOUT);

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    if (options.responseType) {
      xhr.responseType = options.responseType;
    }
    if (options.headers) {
      for (var key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
      }
    }

    xhr.onload = function() {
      if (timedOut) { return; }
      clearTimeout(timer);
      callback(null, xhr);
    };

    xhr.onerror = function(error) {
      if (timedOut) { return; }
      clearTimeout(timer);
      callback(error);
    };

    var body = options.body;

    if (typeof(body) === 'object') {
      if (isArrayBufferView(body)) {
        /* alright. */
        //FIXME empty block
      }
      else if (body instanceof ArrayBuffer) {
        body = new Uint8Array(body);
      }
    }
    xhr.send(body);
  };

  Object.defineProperty(RemoteStorage.WireClient.prototype, 'storageType', {
    get: function() {
      if (this.storageApi) {
        var spec = this.storageApi.match(/draft-dejong-(remotestorage-\d\d)/);
        return spec ? spec[1] : '2012.04';
      }
    }
  });

  RS.WireClient.configureHooks = [];

  RS.WireClient._rs_init = function(remoteStorage) {
    hasLocalStorage = remoteStorage.localStorageAvailable();
    remoteStorage.remote = new RS.WireClient(remoteStorage);
    this.online = true;
  };

  RS.WireClient._rs_supported = function() {
    return !! global.XMLHttpRequest;
  };

  RS.WireClient._rs_cleanup = function(remoteStorage){
    if (hasLocalStorage){
      delete localStorage[SETTINGS_KEY];
    }
    remoteStorage.removeEventListener('error', onErrorCb);
  };

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/discover.js **/
(function(global) {

  // feature detection flags
  var haveXMLHttpRequest, hasLocalStorage;
  // used to store settings in localStorage
  var SETTINGS_KEY = 'remotestorage:discover';
  // cache loaded from localStorage
  var cachedInfo = {};

  /**
   * Class: RemoteStorage.Discover
   *
   * This class deals with the webfinger lookup
   *
   * Arguments:
   * userAddress - user@host
   * callback    - gets called with href of the storage, the type and the authURL
   * Example:
   * (start code)
   *
   * (end code)
   **/

  RemoteStorage.Discover = function(userAddress, callback) {
    if (userAddress in cachedInfo) {
      var info = cachedInfo[userAddress];
      callback(info.href, info.type, info.authURL);
      return;
    }
    var hostname = userAddress.split('@')[1];
    var params = '?resource=' + encodeURIComponent('acct:' + userAddress);
    var urls = [
      'https://' + hostname + '/.well-known/webfinger' + params,
      'https://' + hostname + '/.well-known/host-meta.json' + params,
      'http://' + hostname + '/.well-known/webfinger' + params,
      'http://' + hostname + '/.well-known/host-meta.json' + params
    ];

    function tryOne() {
      var xhr = new XMLHttpRequest();
      var url = urls.shift();
      if (!url) { return callback(); }
      RemoteStorage.log('[Discover] Trying URL', url);
      xhr.open('GET', url, true);
      xhr.onabort = xhr.onerror = function() {
        console.error("webfinger error", arguments, '(', url, ')');
        tryOne();
      };
      xhr.onload = function() {
        if (xhr.status !== 200) { return tryOne(); }
        var profile;

        try {
          profile = JSON.parse(xhr.responseText);
        } catch(e) {
          RemoteStorage.log("[Discover] Failed to parse profile ", xhr.responseText, e);
          tryOne();
          return;
        }

        if (!profile.links) {
          RemoteStorage.log("[Discover] Profile has no links section ", JSON.stringify(profile));
          tryOne();
          return;
        }

        var link;
        profile.links.forEach(function(l) {
          if (l.rel === 'remotestorage') {
            link = l;
          } else if (l.rel === 'remoteStorage' && !link) {
            link = l;
          }
        });
        RemoteStorage.log('[Discover] Got profile', profile, 'and link', link);
        if (link) {
          var authURL = link.properties['http://tools.ietf.org/html/rfc6749#section-4.2']
                  || link.properties['auth-endpoint'],
            storageType = link.properties['http://remotestorage.io/spec/version']
                  || link.type;
          cachedInfo[userAddress] = { href: link.href, type: storageType, authURL: authURL };
          if (hasLocalStorage) {
            localStorage[SETTINGS_KEY] = JSON.stringify({ cache: cachedInfo });
          }
          callback(link.href, storageType, authURL);
        } else {
          tryOne();
        }
      };
      xhr.send();
    }
    tryOne();
  };

  RemoteStorage.Discover._rs_init = function(remoteStorage) {
    hasLocalStorage = remoteStorage.localStorageAvailable();
    if (hasLocalStorage) {
      var settings;
      try { settings = JSON.parse(localStorage[SETTINGS_KEY]); } catch(e) {}
      if (settings) {
        cachedInfo = settings.cache;
      }
    }
  };

  RemoteStorage.Discover._rs_supported = function() {
    haveXMLHttpRequest = !! global.XMLHttpRequest;
    return haveXMLHttpRequest;
  };

  RemoteStorage.Discover._rs_cleanup = function() {
    if (hasLocalStorage) {
      delete localStorage[SETTINGS_KEY];
    }
  };

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/authorize.js **/
(function(global) {

  function extractParams() {
    //FF already decodes the URL fragment in document.location.hash, so use this instead:
    var location = RemoteStorage.Authorize.getLocation(),
        hashPos  = location.href.indexOf('#'),
        hash;
    if (hashPos === -1) { return; }
    hash = location.href.substring(hashPos+1);
    // if hash is not of the form #key=val&key=val, it's probably not for us
    if (hash.indexOf('=') === -1) { return; }
    return hash.split('&').reduce(function(m, kvs) {
      var kv = kvs.split('=');
      m[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
      return m;
    }, {});
  }

  RemoteStorage.ImpliedAuth = function(storageApi, redirectUri) {
    RemoteStorage.log('ImpliedAuth proceeding due to absent authURL; storageApi = ' + storageApi + ' redirectUri = ' + redirectUri);
    // Set a fixed access token, signalling to not send it as Bearer
    remoteStorage.remote.configure(undefined, undefined, undefined, RemoteStorage.Authorize.IMPLIED_FAKE_TOKEN);
    document.location = redirectUri;
  };

  RemoteStorage.Authorize = function(authURL, scope, redirectUri, clientId) {
    RemoteStorage.log('[Authorize] authURL = ', authURL, 'scope = ', scope, 'redirectUri = ', redirectUri, 'clientId = ', clientId);

    var url = authURL, hashPos = redirectUri.indexOf('#');
    url += authURL.indexOf('?') > 0 ? '&' : '?';
    url += 'redirect_uri=' + encodeURIComponent(redirectUri.replace(/#.*$/, ''));
    url += '&scope=' + encodeURIComponent(scope);
    url += '&client_id=' + encodeURIComponent(clientId);
    if (hashPos !== -1) {
      url += '&state=' + encodeURIComponent(redirectUri.substring(hashPos+1));
    }
    url += '&response_type=token';
    RemoteStorage.Authorize.setLocation(url);
  };

  RemoteStorage.Authorize.IMPLIED_FAKE_TOKEN = false;

  RemoteStorage.prototype.authorize = function(authURL) {
    this.access.setStorageType(this.remote.storageType);
    var scope = this.access.scopeParameter;

    var redirectUri = String(RemoteStorage.Authorize.getLocation());
    var clientId = redirectUri.match(/^(https?:\/\/[^\/]+)/)[0];

    RemoteStorage.Authorize(authURL, scope, redirectUri, clientId);
  };

  /**
   * Get current document location
   *
   * Override this method if access to document.location is forbidden
   */
  RemoteStorage.Authorize.getLocation = function () {
    return global.document.location;
  };

  /**
   * Set current document location
   *
   * Override this method if access to document.location is forbidden
   */
  RemoteStorage.Authorize.setLocation = function (location) {
    if (typeof location === 'string') {
      global.document.location.href = location;
    } else if (typeof location === 'object') {
      global.document.location = location;
    } else {
      throw "Invalid location " + location;
    }
  };

  RemoteStorage.prototype.impliedauth = function() {
    RemoteStorage.ImpliedAuth(this.remote.storageApi, String(document.location));
  };

  RemoteStorage.Authorize._rs_supported = function(remoteStorage) {
    return typeof(document) !== 'undefined';
  };

  var onFeaturesLoaded;
  RemoteStorage.Authorize._rs_init = function(remoteStorage) {

    onFeaturesLoaded = function () {
      var authParamsUsed = false;
      if (params) {
        if (params.error) {
          throw "Authorization server errored: " + params.error;
        }
        if (params.access_token) {
          remoteStorage.remote.configure(undefined, undefined, undefined, params.access_token);
          authParamsUsed = true;
        }
        if (params.remotestorage) {
          remoteStorage.connect(params.remotestorage);
          authParamsUsed = true;
        }
        if (params.state) {
          RemoteStorage.Authorize.setLocation('#'+params.state);
        }
      }
      if (!authParamsUsed) {
        remoteStorage.remote.stopWaitingForToken();
      }
    };
    var params = extractParams(),
        location;
    if (params) {
      location = RemoteStorage.Authorize.getLocation();
      location.hash = '';
    }
    remoteStorage.on('features-loaded', onFeaturesLoaded);
  };

  RemoteStorage.Authorize._rs_cleanup = function(remoteStorage) {
    remoteStorage.removeEventListener('features-loaded', onFeaturesLoaded);
  };

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/access.js **/
(function(global) {

  var SETTINGS_KEY = "remotestorage:access";

  /**
   * Class: RemoteStorage.Access
   *
   * Keeps track of claimed access and scopes.
   */
  RemoteStorage.Access = function() {
    this.reset();
  };

  RemoteStorage.Access.prototype = {

    /**
     * Method: claim
     *
     * Claim access on a given scope with given mode.
     *
     * Parameters:
     *   scope - An access scope, such as "contacts" or "calendar".
     *   mode  - Access mode to use. Either "r" or "rw".
     *
     * Example:
     *   (start code)
     *   remoteStorage.access.claim('contacts', 'r');
     *   remoteStorage.access.claim('pictures', 'rw');
     */
    claim: function(scope, mode) {
      if (typeof(scope) !== 'string' || scope.indexOf('/') !== -1 || scope.length === 0) {
        throw new Error('Scope should be a non-empty string without forward slashes');
      }
      if (!mode.match(/^rw?$/)) {
        throw new Error('Mode should be either \'r\' or \'rw\'');
      }
      this._adjustRootPaths(scope);
      this.scopeModeMap[scope] = mode;
    },

    get: function(scope) {
      return this.scopeModeMap[scope];
    },

    remove: function(scope) {
      var savedMap = {};
      var name;
      for (name in this.scopeModeMap) {
        savedMap[name] = this.scopeModeMap[name];
      }
      this.reset();
      delete savedMap[scope];
      for (name in savedMap) {
        this.set(name, savedMap[name]);
      }
    },

    /**
     * Verify permission for a given scope.
     */
    checkPermission: function(scope, mode) {
      var actualMode = this.get(scope);
      return actualMode && (mode === 'r' || actualMode === 'rw');
    },

    /**
     * Verify permission for a given path.
     */
    checkPathPermission: function(path, mode) {
      if (this.checkPermission('*', mode)) {
        return true;
      }
      return !!this.checkPermission(this._getModuleName(path), mode);
    },

    reset: function() {
      this.rootPaths = [];
      this.scopeModeMap = {};
    },

    /**
     * Return the module name for a given path.
     */
    _getModuleName: function(path) {
      if (path[0] !== '/') {
        throw new Error('Path should start with a slash');
      }
      var moduleMatch = path.replace(/^\/public/, '').match(/^\/([^\/]*)\//);
      return moduleMatch ? moduleMatch[1] : '*';
    },

    _adjustRootPaths: function(newScope) {
      if ('*' in this.scopeModeMap || newScope === '*') {
        this.rootPaths = ['/'];
      } else if (! (newScope in this.scopeModeMap)) {
        this.rootPaths.push('/' + newScope + '/');
        this.rootPaths.push('/public/' + newScope + '/');
      }
    },

    _scopeNameForParameter: function(scope) {
      if (scope.name === '*' && this.storageType) {
        if (this.storageType === '2012.04') {
          return '';
        } else if (this.storageType.match(/remotestorage-0[01]/)) {
          return 'root';
        }
      }
      return scope.name;
    },

    setStorageType: function(type) {
      this.storageType = type;
    }
  };

  /**
   * Property: scopes
   *
   * Holds an array of claimed scopes in the form
   * > { name: "<scope-name>", mode: "<mode>" }
   */
  Object.defineProperty(RemoteStorage.Access.prototype, 'scopes', {
    get: function() {
      return Object.keys(this.scopeModeMap).map(function(key) {
        return { name: key, mode: this.scopeModeMap[key] };
      }.bind(this));
    }
  });

  Object.defineProperty(RemoteStorage.Access.prototype, 'scopeParameter', {
    get: function() {
      return this.scopes.map(function(scope) {
        return this._scopeNameForParameter(scope) + ':' + scope.mode;
      }.bind(this)).join(' ');
    }
  });

  // Documented in src/remotestorage.js
  Object.defineProperty(RemoteStorage.prototype, 'access', {
    get: function() {
      var access = new RemoteStorage.Access();
      Object.defineProperty(this, 'access', {
        value: access
      });
      return access;
    },
    configurable: true
  });

  RemoteStorage.Access._rs_init = function() {};
})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/env.js **/
(function(pMode) {

  var mode = pMode,
      env = {},
      isBackground = false;


  RemoteStorage.Env = function() {
    return env;
  };

  RemoteStorage.Env.isBrowser = function () {
    return mode === "browser";
  };

  RemoteStorage.Env.isNode = function () {
    return mode === "node";
  };

  RemoteStorage.Env.goBackground = function () {
    isBackground = true;
    RemoteStorage.Env._emit("background");
  };

  RemoteStorage.Env.goForeground = function () {
    isBackground = false;
    RemoteStorage.Env._emit("foreground");
  };

  RemoteStorage.Env._rs_init = function(remoteStorage) {
    RemoteStorage.eventHandling(RemoteStorage.Env, "background", "foreground");

    function visibility() {
      if (document[env.hiddenProperty]) {
        RemoteStorage.Env.goBackground();
      } else {
        RemoteStorage.Env.goForeground();
      }
    }

    if ( mode === 'browser') {
      if ( typeof(document.hidden) !== "undefined" ) {
        env.hiddenProperty = "hidden";
        env.visibilityChangeEvent = "visibilitychange";
      } else if ( typeof(document.mozHidden) !== "undefined" ) {
        env.hiddenProperty = "mozHidden";
        env.visibilityChangeEvent = "mozvisibilitychange";
      } else if ( typeof(document.msHidden) !== "undefined" ) {
        env.hiddenProperty = "msHidden";
        env.visibilityChangeEvent = "msvisibilitychange";
      } else if ( typeof(document.webkitHidden) !== "undefined" ) {
        env.hiddenProperty = "webkitHidden";
        env.visibilityChangeEvent = "webkitvisibilitychange";
      }
      document.addEventListener(env.visibilityChangeEvent, visibility, false);
      visibility();
    }
  };

  RemoteStorage.Env._rs_cleanup = function(remoteStorage) {
  };

})(typeof(window) !== 'undefined' ? 'browser' : 'node');


/** FILE: src/i18n.js **/
(function() {
  /**
   * Class: RemoteStorage.I18n
   *
   * TODO add documentation
   **/

  "use strict";

  var dictionary = {
    "view_info": 'This app allows you to use your own storage. <a href="http://remotestorage.io/" target="_blank">Learn more!</a>',
    "view_connect": "<strong>Connect</strong> remote storage",
    "view_connecting": "Connecting <strong>%s</strong>",
    "view_offline": "Offline",
    "view_error_occured": "Sorry! An error occured.",
    "view_invalid_key": "Wrong key!",
    "view_confirm_reset": "Are you sure you want to reset everything? This will clear your local data and reload the page.",
    "view_get_me_out": "Get me out of here!",
    "view_error_plz_report": 'If this problem persists, please <a href="http://remotestorage.io/community/" target="_blank">let us know</a>!',
    "view_unauthorized": "Unauthorized! Click here to reconnect."
  };

  RemoteStorage.I18n = {

    translate: function() {
      var str    = arguments[0],
          params = Array.prototype.splice.call(arguments, 1);

      if (typeof dictionary[str] !== "string") {
        throw "Unknown translation string: " + str;
      } else {
        str = dictionary[str];
      }
      return (str.replace(/%s/g, function(){ return params.shift(); }));
    },

    getDictionary: function() {
      return dictionary;
    },

    setDictionary: function(newDictionary) {
      dictionary = newDictionary;
    }

  };
})();


/** FILE: src/assets.js **/
/** THIS FILE WAS GENERATED BY build/compile-assets.js. DO NOT CHANGE IT MANUALLY, BUT INSTEAD CHANGE THE ASSETS IN assets/. **/
RemoteStorage.Assets = {

  cipherIcon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTQiIHdpZHRoPSIyNS4xNzciIHZlcnNpb249IjEuMSIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KIDxwYXRoIGQ9Im0yNS4xNzcgNS41MzIzYy0wLjA1NjQtMC4xMTI5MS0wLjA1NjQtMC4yMjU4MS0wLjE2OTM2LTAuMzM4NzEtMC4xMTI5LTAuMTEyOS0wLjI4MjI1LTAuMTY5MzYtMC4zOTUxNi0wLjE2OTM2aC0xMS40MDNjLTAuNzMzLTIuODc5LTMuMzg2NC01LjAyNDItNi40OTEzLTUuMDI0Mi0zLjY2OTMgMC02LjcxNzcgMy4wNDg0LTYuNzE3NyA2LjcxNzcgMCAzLjcyNjMgMy4wNDg0IDYuNzE3MyA2LjcxNzcgNi43MTczIDMuMzMwNyAwIDYuMDQwMy0yLjQyNzQgNi42MDQ4LTUuNTg4N2gyLjU0MDN2My42Njk0YzAgMC4yODIyNiAwLjI4MjI2IDAuNTA4MDYgMC41NjQ1MiAwLjUwODA2aDEuNzVjMC4yODIyNiAwIDAuNTY0NTItMC4yMjU4IDAuNTY0NTItMC41MDgwNnYtMy42Njk0aDEuNDY3N3Y1LjY0NTJjMCAwLjI4MjI1IDAuMjI1OCAwLjUwODA2IDAuNTA4MDYgMC41MDgwNmgxLjgwNjRjMC4yODIyNiAwIDAuNTA4MDctMC4yMjU4MSAwLjU2NDUyLTAuNTA4MDZ2LTUuNjQ1MmgxLjUyNDJjMC4xMTI5MSAwIDAuMjgyMjYgMCAwLjM5NTE2LTAuMTEyOSAwLjExMjkxLTAuMTEyOSAwLjE2OTM2LTAuMjgyMjYgMC4xNjkzNi0wLjM5NTE2di0xLjgwNjR6bS0xOC40NTkgNS4wODA3Yy0yLjA4ODcgMC0zLjgzODctMS42OTM2LTMuODM4Ny0zLjgzODcgMC0yLjE0NTIgMS43NS0zLjgzODcgMy44Mzg3LTMuODM4NyAyLjE0NTIgMCAzLjgzODcgMS42OTM2IDMuODM4NyAzLjgzODcgMCAyLjE0NTItMS42OTM2IDMuODM4Ny0zLjgzODcgMy44Mzg3eiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K',
  connectIcon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMTAzNi40KSI+CiAgPHBhdGggZD0ibTEgMTA0Ny40di02aDd2LTRsNyA3LTcgN3YtNHoiIGZpbGw9IiNmZmYiLz4KIDwvZz4KPC9zdmc+Cg==',
  disconnectIcon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiIgdmVyc2lvbj0iMS4wIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KIDxwYXRoIHN0eWxlPSJibG9jay1wcm9ncmVzc2lvbjp0Yjt0ZXh0LWluZGVudDowO2NvbG9yOiMwMDAwMDA7dGV4dC10cmFuc2Zvcm06bm9uZSIgZD0ibTguMDAwMSAwYy0wLjQ3MTQgMC0wLjk2MTAzIDAuNTQxOS0wLjk1IDF2NmMtMC4wMDc0NyAwLjUyODMxIDAuNDIxNjMgMSAwLjk1IDFzMC45NTc0Ny0wLjQ3MTY5IDAuOTUtMXYtNmMwLjAxNDYyMi0wLjYwNTEtMC40Nzg2LTEtMC45NS0xem0tMy4zNDM4IDIuNWMtMC4wODcxODYgMC4wMTkyOTQtMC4xNzE2MyAwLjA1MDk1OS0wLjI1IDAuMDkzNzUtMi45OTk1IDEuNTcxNS0zLjkxODQgNC43OTc5LTMuMTI1IDcuNDY4OCAwLjc5MzQgMi42NyAzLjI3OTkgNC45MzcgNi42ODc1IDQuOTM3IDMuMzU5MiAwIDUuODc3Mi0yLjE0OSA2LjcxOTItNC43ODEgMC44NDEtMi42MzIxLTAuMDU4LTUuODIzNC0zLjEyNS03LjU5NC0wLjQzNC0wLjI1MzYtMS4wNTktMC4wODk5LTEuMzEzIDAuMzQzNy0wLjI1MzYgMC40MzM2LTAuMDkgMS4wNTg5IDAuMzQ0IDEuMzEyNSAyLjM5MDggMS4zNzk4IDIuODgyNSAzLjQ5NDQgMi4yODEyIDUuMzc1LTAuNjAxMiAxLjg4MDYtMi4zNDQgMy40Mzc1LTQuOTA2MiAzLjQzNzUtMi41NzU5IDAtNC4yOTc2LTEuNjUwMi00Ljg3NS0zLjU5MzgtMC41Nzc2LTEuOTQzNS0wLjA0Ny00LjA0OCAyLjE4NzMtNS4yMTg3IDAuMzc4Ny0wLjIwNjMgMC41NzkxLTAuNjkyNSAwLjQ1NTgtMS4xMDU3LTAuMTIzMi0wLjQxMzMtMC41NTcyLTAuNzEwMy0wLjk4Ny0wLjY3NTUtMC4wMzEzLTAuMDAxNS0wLjA2MjYtMC4wMDE1LTAuMDkzOCAweiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K',
  dropbox: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QgPEBAhEOpfuQAABhZJREFUWMPVl31snVUdxz+/5/2577e3b7QbHaOD0nXshW4ZZkpGQmJYZkJUDAaZzCBGAxGd+pdZQsJIjCaKgFu09GWybIggm8yhMCsY92rcOkPHunbdtKOUbX36svX23uc+xz+eDsrWlztiNJzk5D7JPS+fc8739/2dA5+EsqJtyK18ZlCKbX9Lk6fd1uo5xbTVZmtwa4v35Np5Mry4TLYXCzAnyhsry2SwrmnokdnaTruq6i3e0lXl0tqQlkURCxwdDp9Th5p3+p9iS8afqk/VZq9kaZoDN8apdU3B1KFnmLde7AkezH0n3V0UQOJpz2hIsqEhLU+WOeAagmtCxISYBe1nVf4vfWrByYdSpyf3W9ziLapy6JgbAduAiBn2S1rCQBYODAQP7H01/zxby4JpAW5s8mproxypiRKNGIJrQNT8EMA1wTGEU8MBP/q7umPw0dSbAA3N3n3zI2yLG2oScPgbNYWICY4Be86o/le6g0W576bPXQWwcqvXdJ2t1idMsA1hJoCoCRfGYdOhwsa4TUWFrr7pGmDrzAiQCHfD//Xxwk/33Z/6HoA0tnhLXZ3XMoYqsy4PYs4M4Ohg6pB2ddqO+vR6BWL27AARXbBNiBjwh9Oqs+O8ukcT4eaopjLqGsJSCdSX29SX23x/lctXlzgE1zBAANxWIQuGxlWNACxr8WozJp0lljKsGXbA0qGu1GRBxsTUQRAGLgboIuQVvHI8S+f7eeK2TLsDSQd296rhPaeDm09+PdX/gQYqN3uZ+jh7ro+oRusKDdgmVEY1GqstSiOhdegCmoQAIoImIWTPYIHdXVlyBYhaVwLA70+rPz7fllvLi2W5KcPw9q3eS/VJ7kmYgm1A3BIWV5osq7IIlMLUQJOrAXQBXQtr1BR2d2XpOu8TtULR+gq2nQh+vv8rqUdnNaKGZm/9qnJpmp/U+fxCB5lYsaGFdTYAY9L3jmNj9F9S7OgKVh9/KNVelBVf8untv8TYSS8gbsrHyh8C2LqQtGE0z9CJYfVuUblgRZv3WGOJvJG0cF8/lWPNdo+O93xsHYoVuqkL/xzIs/HPHt2DPg0Zko+v0I8vbfHun9aKE5sH9YaobJsf5V4mRLXv33kSlmAYwspqgw23R7A1EJlahKYOSsHTB0cZHQ9IOBA3NSrjGo4hWAY82xH8rH1b/jF2laoPAOb80jPqYtKTMdRcTQNd+xAgbgmuJbiGELfh3lsc7q41KQSTABBcC1qPjLH/XzniNqScsP1kgMsm9nJ34e2mNcmFAMby1qFPZyz1WlxXrprhuEUgUPDbd8Y59n6edbe61KZ1TF14vSfPLw5dYjhXIOMIM6lGAV+u0+tv+ttI/2+6/LsMQVXpUFCAqJkS9MT5anB2NGDjWxf5Yp3DvjN5th/LUhETolaRTqigxMGIWVKtHVyX2tGTJd2X5agUIfi8CmvUFOKGT++gT8wqLlKUgnwATxwq7P32m35Z+32pPQZA54MpH1iSb/XWZmx2VthTD1AATCBlCZ+dpwNg6EJjlUH3hQIKRaCujhZFaOPtfUH+8HvBnQceSP11yjA8vC616+A5FevL8jt/YiCR0HiQcAUVrnDHHO0jHTUNllXrpC0NRXiefjAxM4rhHLzQpZqf+eFFd/LkM17JGlu9p+xC8IgPhGlaqE1rNJZrxOzQok0dnjviY+nhbSntCH3DAWN+QMIWEhYsqTD4wYHChrPfSP9kqnmM6QAMkYtz4xqmDqeGA+rLNObGZVozkglx1ZfqZAvC2ZGAz9RYlEbAlsLoNd+Kx5RqO5/njKXDsnKdhCXFOaFAZUzjznlhyt5xIjiSLbBz2oVO98fRdalOoGZ5m/dUQ4pvJZ3Zr/CXlS5A74gabzlYePztr6U2faxr+eRy/RYvtjgjHauvkxvi9oTDXaGBuAUJWyh1hb3vqsOvfiG5/L/yMAE483BqdNeuXO3LvcGX3vEUhsZVsaYL9IzACz3BXcVOXvQOfKRsupBZv8R4bnW19rmqGPzqHz4BcMGn5U/Hgod5oiT3P3kvVj7rrfnx/pHBu7d7Azc1eY3/l0drzWbPXNjsGXySy38AbtMqneWU7BkAAAAASUVORK5CYII=',
  googledrive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QgPEA85ztzJcQAABZVJREFUWMPtl1uoXVcVhr8x5tprn7M1NG1i0pQqSG2jLcXipYJXjPogqFgpaHMSFUkpIjU+leKbDxIQSiHgjZgmrfXgQ6SKj5Ji7YVS05aUUqKQlNLQeDnN5Zzk9Jy99xy/D3OttU/StDlV33TBZM3FXmuMf/5jjv+fG/7XL1vti9tnv3Dtnnf+87JY8YmZNxEMM1sZ7tWpjz764mriVqvKvmfb1ONLy3+dGyWu6EWbvQwoydv5BMSqFuereakmfnls1GP25IDaBGYYjplhljDz5tk7YMtPfurAf6UE9Z6tNwDPAPXwtcxL1x9n4zRgDjjm1gCyC6JpCLoW/OX65of1nzCwG6gNo3aYeXF981mTvK2/WWFiMmoj7X+z5JcE0N87c4e7b3EvyTwZT5/r8ezZHu6GuWGpSegJ8/ZeBu6fHv35s1/7t0rQv29mjWF/ATZ1L4bQwohrpkYc/sBpwhJYAVdKYECzYAESIk4Am3sf+sPCW2LAzb9jbpvMDXfD3fEqkRIcGdbsevlt9LylPYG1K6/K3QzK75uAr78lBgb3b7sc2cl2Uaa21sDiGMvB2iQeu/EMm6bKHjD3SUsCEChnpEAKiLisd/PB+UsyMPjZNwzzh1ixcnOfsFCX51NU/PTvA6pkTUdYw4R3zyu1ArMDqyvBQB82+FiJUQJ4C8YgVT1SSvSTs+vEmkcwe7qEsUnt233Aij0BW4ZPbfngKpRQs7hXpYQNvRiuEtATWOW4bLi+z04pJbCnBAkBJggBQlIBIZCUJM0Cm9+QgcED2+/G7BprdMZaAFZExm1FWcz+NLdj32G/6XfPCB5GoJKp7H5FARHRtgRI1y0/+cm7Lwpg+v7t64DvNd5S2mqirKXHy6RoArp1Ykrc2hKtKCtXlNEyoQ6Ydi498fF1F2FAdwEbV9UnZne+8q19Z7o63vTb+TPnRneeWxwxHGdyziii6wApQNEydKUUd5wHYGrftvci7tKKLSME5bvCaruynI9rNL7vdZgiHhiP898Wl8bMnxty+uyIhcURo1FgjSg1DCDph4uPfuR9AFbvvS25p2cxbiyKVuh2o1O44n2lLLacb5v75v5fX6yl5h753IwUD+YcRAQ5B6FMMhj0jboSRhnAE258wvp7Z7aYcbCYCeCGt97ubfICLDP/q4WZ32x7M20fPfb+hxbH9ZdjHOQIIoR74EDywA3coa6MqtJnrP+LmRmcB63ob8dA1wllRm95LVc//22S16TGeKqqpqoHk10ESGJj/zjjgIhAISKCyJmcY6Uu8Pbq7C0V6ABh35dzvYWQG0QAhmSYCaUlNhzdCrlX2jpE6tV4b9DYcGFKEgG8svQucoicC4CsII8zeTxutAEQzx1duPL3vrxjdlnou0SDLdTulxJQmalXNzN98jpEJiSo+qTeoEnsnWC5lVZNRhkOZiq0G8XCmz1gpp3j/ZYdYLhj9qCkn3fJQ4QKeh9OccWxz6O0hGKM9wakeoBEZ1BmqfOMyYFk4gXS+edG4J4ju6/644VK+AOJhSIYpVRBpn/qPVRL65A51dRavJoG2UQkOqf0hgVrGG7u6syoJDObB+55nRANb589Afy40W0UwkY91h39CiLweg1UU+W3ohLNvC2VurJ1htR6A3QaYPCjI7uvOvGGOlfv2XoSuBzEhmNfZXDqBrweUPVqUlWodneSG+6J1NTevThfDpEjmnsmzuuCPPfCvRvfcakT0S2Aeq9tYPr0ZryeBvOOlZBKUIEiCAVZwTgy41x6v6hm0LFZ4o7N7IuXPA+EDx+XjQ+tP/4lUrW2vCI1ydR0iYgmWdtu4yzG7bOiAdn8iYlA0iFJh1Z1JJv+ye2b3n1419XRH2riP0aqqlKClABIjUMW+rtSlw5qmCpgsynnl56/d+M/+P91wfUvQjDgTzx9h9AAAAAASUVORK5CYII=',
  nocipherIcon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgogPHBhdGggZD0ibSAxMy4yMDMxMjQsMTEuNzczNDM4IGMgMC4yODEyNSwwLjI4MTI1IDAuNDIxODc1LDAuNjA5Mzc1IDAuNDIxODc1LDEuMDMxMjUgMCwwLjM3NSAtMC4xNDA2MjUsMC43NSAtMC40MjE4NzUsMS4wMzEyNSAtMC4yODEyNSwwLjIzNDM3NSAtMC42MDkzNzUsMC4zNzUgLTEuMDMxMjUsMC4zNzUgLTAuMzc1LDAgLTAuNzUsLTAuMTQwNjI1IC0xLjAzMTI1LC0wLjM3NSAwLDAgLTMuMTg3NDk4MSwtMy42NTYyNSAtMy4xODc0OTgxLC0zLjY1NjI1IDAsMCAtMy4xNDA2MjUsMy42NTYyNSAtMy4xNDA2MjUsMy42NTYyNSAtMC4yODEyNSwwLjIzNDM3NSAtMC42NTYyNSwwLjM3NSAtMS4wMzEyNSwwLjM3NSAtMC40MjE4NzUsMCAtMC43NSwtMC4xNDA2MjUgLTEuMDMxMjUsLTAuMzc1IC0wLjI4MTI1LC0wLjI4MTI1IC0wLjM3NSwtMC42NTYyNSAtMC4zNzUsLTEuMDMxMjUgMCwtMC40MjE4NzUgMC4wOTM3NSwtMC43NSAwLjM3NSwtMS4wMzEyNSAwLDAgMy4zMjgxMjUsLTMuNzUwMDAwNSAzLjMyODEyNSwtMy43NTAwMDA1IDAsMCAtMy4zMjgxMjUsLTMuNzk2ODc1IC0zLjMyODEyNSwtMy43OTY4NzUgLTAuMjgxMjUsLTAuMjgxMjUgLTAuMzc1LC0wLjYwOTM3NSAtMC4zNzUsLTEuMDMxMjUgMCwtMC4zNzUgMC4wOTM3NSwtMC43NSAwLjM3NSwtMS4wMzEyNSAwLjI4MTI1LC0wLjIzNDM3NSAwLjYwOTM3NSwtMC4zNzUgMS4wMzEyNSwtMC4zNzUgMC4zNzUsMCAwLjc1LDAuMTQwNjI1IDEuMDMxMjUsMC4zNzUgMCwwIDMuMTQwNjI1LDMuNjU2MjUgMy4xNDA2MjUsMy42NTYyNSAwLDAgMy4xODc0OTgxLC0zLjY1NjI1IDMuMTg3NDk4MSwtMy42NTYyNSAwLjI4MTI1LC0wLjIzNDM3NSAwLjY1NjI1LC0wLjM3NSAxLjAzMTI1LC0wLjM3NSAwLjQyMTg3NSwwIDAuNzUsMC4xNDA2MjUgMS4wMzEyNSwwLjM3NSAwLjI4MTI1LDAuMjgxMjUgMC40MjE4NzUsMC42NTYyNSAwLjQyMTg3NSwxLjAzMTI1IDAsMC40MjE4NzUgLTAuMTQwNjI1LDAuNzUgLTAuNDIxODc1LDEuMDMxMjUgMCwwIC0zLjMyODEyMzEsMy43OTY4NzUgLTMuMzI4MTIzMSwzLjc5Njg3NSAwLDAgMy4zMjgxMjMxLDMuNzUwMDAwNSAzLjMyODEyMzEsMy43NTAwMDA1IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo=',
  remoteStorageIcon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMzIiIHdpZHRoPSIzMiIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KIDxkZWZzPgogIDxyYWRpYWxHcmFkaWVudCBpZD0iYSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGN5PSI1NzEuNDIiIGN4PSIxMDQ2LjUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLjE0NDMzIDAgMCAuMTY2NjcgMTIwMS41IDg3Ny4xMSkiIHI9Ijk2Ij4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZmNGEwNCIgc3RvcC1vcGFjaXR5PSIuNzYxNTQiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZmY0YTA0IiBvZmZzZXQ9IjEiLz4KICA8L3JhZGlhbEdyYWRpZW50PgogPC9kZWZzPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzMzYuNiAtOTU2LjM1KSI+CiAgPHBhdGggc3R5bGU9ImNvbG9yOiMwMDAwMDAiIGQ9Im0xMzUyLjYgOTU2LjM1IDAuMjg4NiAxNS4xMzYgMTMuNTY3LTcuMTM1Mi0xMy44NTUtOC4wMDExemwtMTMuODU1IDguMDAxMSAxMy41NjcgNy4xMzUyIDAuMjg4Ny0xNS4xMzZ6bS0xMy44NTUgOC4wMDExdjE1Ljk5OGwxMi45NTgtNy44MTYyLTEyLjk1OC04LjE4MTV6bTAgMTUuOTk4IDEzLjg1NSA4LjAwMTEtMC42MDg5LTE1LjMxNy0xMy4yNDYgNy4zMTU2em0xMy44NTUgOC4wMDExIDEzLjg1NS04LjAwMTEtMTMuMjUxLTcuMzE1Ni0wLjYwNDQgMTUuMzE3em0xMy44NTUtOC4wMDExdi0xNS45OThsLTEyLjk2MiA4LjE4MTUgMTIuOTYyIDcuODE2MnoiIGZpbGw9InVybCgjYSkiLz4KIDwvZz4KPC9zdmc+Cg==',
  remoteStorageIconCiphered: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMzIiIHdpZHRoPSIzMiIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KIDxkZWZzPgogIDxyYWRpYWxHcmFkaWVudCBpZD0iYSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGN5PSI1NzEuNDIiIGN4PSIxMDQ2LjUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLjE0NDMzIDAgMCAuMTY2NjcgMTIwMS41IDg3Ny4xMSkiIHI9Ijk2Ij4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZmNGEwNCIgc3RvcC1vcGFjaXR5PSIuNzYxNTQiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZmY0YTA0IiBvZmZzZXQ9IjEiLz4KICA8L3JhZGlhbEdyYWRpZW50PgogPC9kZWZzPgogPHBhdGggc3R5bGU9ImNvbG9yOiMwMDAwMDAiIGQ9Im0xNiAwbDAuMTI1IDYuMzc1YzIuMDk4IDAuMDY3IDMuNzUgMS43NTk1IDMuNzUgMy44NzV2MS45NjloMS45MzcgMC4wMzJsOC00LjIxOS0xMy44NDQtOHpsLTEzLjg0NCA4IDggNC4yMTloMC4wMzIgMS45MDZ2LTEuOTY5YzAtMi4xMTU1IDEuNjgzLTMuODA4IDMuNzgxLTMuODc1bDAuMTI1LTYuMzc1em0tMTMuODQ0IDh2MTZsNy45OTk4LTQuODQ0di02LjA5NGwtNy45OTk4LTUuMDYyem0wIDE2bDEzLjg0NCA4LTAuMzc1LTEwLjA2MmgtNS40Njl2LTIuMzQ0bC03Ljk5OTggNC40MDZ6bTEzLjg0NCA4bDEzLjg0NC04LTgtNC40MDZ2Mi4zNDRoLTUuNDY5bC0wLjM3NSAxMC4wNjJ6bTEzLjg0NC04di0xNmwtOCA1LjA2MnY2LjA5NGw4IDQuODQ0em0tMTMuOTY5LTE3Yy0xLjczNSAwLjA2NjYtMy4xMjUgMS40OTg3LTMuMTI1IDMuMjV2MS45NjloMy4wMzFsMC4wOTQtNS4yMTl6bTAuMjUgMGwwLjA5NCA1LjIxOWgzLjAzMXYtMS45NjljMC0xLjc1MTMtMS4zOS0zLjE4MzQtMy4xMjUtMy4yNXptLTQuNzUgNS44NDRsNC4zNDQgMi4yODEgMC4wMzEtMi4yODFoLTQuMzc1em00Ljg3NSAwbDAuMDMxIDIuMjgxIDQuMzQ0LTIuMjgxaC00LjM3NXptLTUuNDM4IDAuNjI1djUuMzEybDQuMjgyLTIuNTkzLTQuMjgyLTIuNzE5em0xMC4zNzYgMGwtNC4yODIgMi43MTkgNC4yODIgMi41OTN2LTUuMzEyem0tNS43ODIgMy4yMTlsLTQuNTk0IDIuNTMxdjIuMDYyaDQuNzgybC0wLjE4OC00LjU5M3ptMS4xODggMGwtMC4xODggNC41OTNoNC43ODJ2LTIuMDYybC00LjU5NC0yLjUzMXoiIGZpbGw9InVybCgjYSkiLz4KPC9zdmc+Cg==',
  remoteStorageIconError: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMzIiIHdpZHRoPSIzMiIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KIDxkZWZzPgogIDxyYWRpYWxHcmFkaWVudCBpZD0iYSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGN5PSI1NzEuNDIiIGN4PSIxMDQ2LjUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLjE0NDMzIDAgMCAuMTY2NjcgMTIwMS41IDg3Ny4xMSkiIHI9Ijk2Ij4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2U5MDAwMCIgc3RvcC1vcGFjaXR5PSIuNzYwNzgiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZTkwMDAwIiBvZmZzZXQ9IjEiLz4KICA8L3JhZGlhbEdyYWRpZW50PgogPC9kZWZzPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzMzYuNiAtOTU2LjM1KSI+CiAgPHBhdGggc3R5bGU9ImNvbG9yOiMwMDAwMDAiIGQ9Im0xMzUyLjYgOTU2LjM1IDAuMjg4NiAxNS4xMzYgMTMuNTY3LTcuMTM1Mi0xMy44NTUtOC4wMDExemwtMTMuODU1IDguMDAxMSAxMy41NjcgNy4xMzUyIDAuMjg4Ny0xNS4xMzZ6bS0xMy44NTUgOC4wMDExdjE1Ljk5OGwxMi45NTgtNy44MTYyLTEyLjk1OC04LjE4MTV6bTAgMTUuOTk4IDEzLjg1NSA4LjAwMTEtMC42MDg5LTE1LjMxNy0xMy4yNDYgNy4zMTU2em0xMy44NTUgOC4wMDExIDEzLjg1NS04LjAwMTEtMTMuMjUxLTcuMzE1Ni0wLjYwNDQgMTUuMzE3em0xMy44NTUtOC4wMDExdi0xNS45OThsLTEyLjk2MiA4LjE4MTUgMTIuOTYyIDcuODE2MnoiIGZpbGw9InVybCgjYSkiLz4KIDwvZz4KPC9zdmc+Cg==',
  remoteStorageIconOffline: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMzIiIHdpZHRoPSIzMiIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KIDxkZWZzPgogIDxyYWRpYWxHcmFkaWVudCBpZD0iYSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGN5PSI1NzEuNDIiIGN4PSIxMDQ2LjUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLjE0NDMzIDAgMCAuMTY2NjcgMTIwMS41IDg3Ny4xMSkiIHI9Ijk2Ij4KICAgPHN0b3Agc3RvcC1jb2xvcj0iIzY5Njk2OSIgc3RvcC1vcGFjaXR5PSIuNzYxNTQiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjNjc2NzY3IiBvZmZzZXQ9IjEiLz4KICA8L3JhZGlhbEdyYWRpZW50PgogPC9kZWZzPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzMzYuNiAtOTU2LjM1KSI+CiAgPHBhdGggc3R5bGU9ImNvbG9yOiMwMDAwMDAiIGQ9Im0xMzUyLjYgOTU2LjM1IDAuMjg4NiAxNS4xMzYgMTMuNTY3LTcuMTM1Mi0xMy44NTUtOC4wMDExemwtMTMuODU1IDguMDAxMSAxMy41NjcgNy4xMzUyIDAuMjg4Ny0xNS4xMzZ6bS0xMy44NTUgOC4wMDExdjE1Ljk5OGwxMi45NTgtNy44MTYyLTEyLjk1OC04LjE4MTV6bTAgMTUuOTk4IDEzLjg1NSA4LjAwMTEtMC42MDg5LTE1LjMxNy0xMy4yNDYgNy4zMTU2em0xMy44NTUgOC4wMDExIDEzLjg1NS04LjAwMTEtMTMuMjUxLTcuMzE1Ni0wLjYwNDQgMTUuMzE3em0xMy44NTUtOC4wMDExdi0xNS45OThsLTEyLjk2MiA4LjE4MTUgMTIuOTYyIDcuODE2MnoiIGZpbGw9InVybCgjYSkiLz4KIDwvZz4KPC9zdmc+Cg==',
  syncIcon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDg3LjUgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTUuOTk5OTk5IDE2IiB3aWR0aD0iMTYiIHZlcnNpb249IjEuMSIgeT0iMHB4IiB4PSIwcHgiIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01LjUxMTIgLTc2LjUyNSkiIGRpc3BsYXk9Im5vbmUiPgoJPHBhdGggZGlzcGxheT0iaW5saW5lIiBkPSJtNTEuNDczIDQyLjI1NS0yLjIwNSAyLjIxMmMxLjQ3OCAxLjQ3NyAyLjI5NSAzLjQ0MiAyLjI5NSA1LjUzMyAwIDQuMzA5LTMuNTA0IDcuODEyLTcuODEyIDcuODEydi0xLjU2MmwtMy4xMjUgMy4xMjUgMy4xMjQgMy4xMjV2LTEuNTYyYzYuMDI5IDAgMTAuOTM4LTQuOTA2IDEwLjkzOC0xMC45MzggMC0yLjkyNy0xLjE0MS01LjY3Ni0zLjIxNS03Ljc0NXoiLz4KCTxwYXRoIGRpc3BsYXk9ImlubGluZSIgZD0ibTQ2Ljg3NSA0MC42MjUtMy4xMjUtMy4xMjV2MS41NjJjLTYuMDMgMC0xMC45MzggNC45MDctMTAuOTM4IDEwLjkzOCAwIDIuOTI3IDEuMTQxIDUuNjc2IDMuMjE3IDcuNzQ1bDIuMjAzLTIuMjEyYy0xLjQ3Ny0xLjQ3OS0yLjI5NC0zLjQ0Mi0yLjI5NC01LjUzMyAwLTQuMzA5IDMuNTA0LTcuODEyIDcuODEyLTcuODEydjEuNTYybDMuMTI1LTMuMTI1eiIvPgo8L2c+CjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0xMCAwbC0wLjc1IDEuOTA2MmMtMS4wMDc4LTAuMjk0Mi0zLjQ1ODYtMC43NzA4LTUuNjU2MiAwLjkzNzYgMC0wLjAwMDItMy45MzAyIDIuNTk0MS0yLjA5MzggNy41OTQybDEuNjU2Mi0wLjcxOTJzLTEuNTM5OS0zLjExMjIgMS42ODc2LTUuNTMxM2MwIDAgMS42OTU3LTEuMTMzOSAzLjY4NzQtMC41OTM3bC0wLjcxODcgMS44MTI0IDMuODEyNS0xLjYyNS0xLjYyNS0zLjc4MTJ6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTE0IDUuNTYyNWwtMS42NTYgMC43MTg3czEuNTQxIDMuMTEzNS0xLjY4OCA1LjUzMDhjMCAwLTEuNzI3MiAxLjEzNS0zLjcxODUgMC41OTRsMC43NS0xLjgxMi0zLjgxMjUgMS41OTQgMS41OTM4IDMuODEyIDAuNzgxMi0xLjkwNmMxLjAxMTMgMC4yOTUgMy40NjE1IDAuNzY2IDUuNjU2LTAuOTM4IDAgMCAzLjkyOC0yLjU5NCAyLjA5NC03LjU5MzV6Ii8+Cjwvc3ZnPgo=',
  widget: '<div class="rs-bubble rs-hidden">   <div class="rs-bubble-text remotestorage-initial remotestorage-error remotestorage-authing remotestorage-offline">     <span class="rs-status-text">{{view_connect}}</span>   </div>   <div class="rs-bubble-expandable">     <!-- error -->     <div class="remotestorage-error">       <pre class="rs-status-text rs-error-msg">{{ERROR_MSG}}</pre>       <button class="remotestorage-reset">{{view_get_me_out}}</button>       <p class="rs-centered-text rs-error-plz-report">{{view_error_plz_report}}</p>     </div>     <!-- connected -->     <div class="rs-bubble-text remotestorage-connected">       <strong class="userAddress">{{USER_ADDRESS}}</strong>       <p class="remotestorage-unauthorized">{{view_unauthorized}}</p>       <p class="remotestorage-invalid-key">{{view_invalid_key}}</p>       <form novalidate class="remotestorage-cipher-form">         <input placeholder="Secret key" name="userSecretKey" novalidate>         <button class="rs-cipher" name="rs-cipher" title="cipher" disabled="disabled">           <img>         </button>         <button class="rs-nocipher" name="rs-nocipher" title="no cipher">           <img>         </button>       </form>     </div>     <div class="rs-content remotestorage-connected">       <button class="rs-sync" title="sync"><img></button>       <button class="rs-disconnect" title="disconnect"><img></button>     </div>     <!-- initial -->     <form novalidate class="remotestorage-initial">       <input type="email" placeholder="user@provider.com" name="userAddress" novalidate>       <button class="connect" name="connect" title="connect" disabled="disabled">         <img>       </button>     </form>     <div class="rs-info-msg remotestorage-initial">{{view_info}}</div>   </div> </div> <img class="rs-dropbox rs-backends rs-action" alt="Connect to Dropbox"> <img class="rs-googledrive rs-backends rs-action" alt="Connect to Google Drive"> <img class="rs-cube rs-action"> ',
  widgetCss: '/** encoding:utf-8 **/ /* RESET */ #remotestorage-widget{text-align:left;}#remotestorage-widget input, #remotestorage-widget button{font-size:11px;}#remotestorage-widget form input[type=email]{margin-bottom:0;/* HTML5 Boilerplate */}#remotestorage-widget form input[type=submit]{margin-top:0;/* HTML5 Boilerplate */}/* /RESET */ #remotestorage-widget, #remotestorage-widget *{-moz-box-sizing:border-box;box-sizing:border-box;}#remotestorage-widget{position:absolute;right:10px;top:10px;font:normal 16px/100% sans-serif !important;user-select:none;-webkit-user-select:none;-moz-user-select:-moz-none;cursor:default;z-index:10000;}#remotestorage-widget .rs-bubble{background:rgba(80, 80, 80, .7);border-radius:5px 15px 5px 5px;color:white;font-size:0.8em;padding:5px;position:absolute;right:3px;top:9px;min-height:24px;white-space:nowrap;text-decoration:none;}.rs-bubble .rs-bubble-text{padding-right:32px;/* make sure the bubble doesn\'t "jump" when initially opening. */ min-width:182px;}#remotestorage-widget .rs-action{cursor:pointer;}/* less obtrusive cube when connected */ #remotestorage-widget.remotestorage-state-connected .rs-cube, #remotestorage-widget.remotestorage-state-busy .rs-cube{opacity:.3;-webkit-transition:opacity .3s ease;-moz-transition:opacity .3s ease;-ms-transition:opacity .3s ease;-o-transition:opacity .3s ease;transition:opacity .3s ease;}#remotestorage-widget.remotestorage-state-connected:hover .rs-cube, #remotestorage-widget.remotestorage-state-busy:hover .rs-cube, #remotestorage-widget.remotestorage-state-connected .rs-bubble:not(.rs-hidden) + .rs-cube{opacity:1 !important;}#remotestorage-widget .rs-backends{position:relative;top:5px;right:0;}#remotestorage-widget .rs-cube{position:relative;top:5px;right:0;}/* pulsing animation for cube when loading */ #remotestorage-widget .rs-cube.remotestorage-loading{-webkit-animation:remotestorage-loading .5s ease-in-out infinite alternate;-moz-animation:remotestorage-loading .5s ease-in-out infinite alternate;-o-animation:remotestorage-loading .5s ease-in-out infinite alternate;-ms-animation:remotestorage-loading .5s ease-in-out infinite alternate;animation:remotestorage-loading .5s ease-in-out infinite alternate;}@-webkit-keyframes remotestorage-loading{to{opacity:.7}}@-moz-keyframes remotestorage-loading{to{opacity:.7}}@-o-keyframes remotestorage-loading{to{opacity:.7}}@-ms-keyframes remotestorage-loading{to{opacity:.7}}@keyframes remotestorage-loading{to{opacity:.7}}#remotestorage-widget a{text-decoration:underline;color:inherit;}#remotestorage-widget form{margin-top:.7em;position:relative;}#remotestorage-widget form input{display:table-cell;vertical-align:top;border:none;border-radius:6px;font-weight:bold;color:white;outline:none;line-height:1.5em;height:2em;}#remotestorage-widget form input:disabled{color:#999;background:#444 !important;cursor:default !important;}#remotestorage-widget form input[type=email]:focus, #remotestorage-widget form input[type=password]:focus{background:#223;}#remotestorage-widget form input[type=email], #remotestorage-widget form input[type=password]{background:#000;width:100%;height:26px;padding:0 30px 0 5px;border-top:1px solid #111;border-bottom:1px solid #999;}#remotestorage-widget form input[type=email]:focus, #remotestorage-widget form input[type=password]:focus{background:#223;}#remotestorage-widget button:focus, #remotestorage-widget input:focus{box-shadow:0 0 4px #ccc;}#remotestorage-widget form input[type=email]::-webkit-input-placeholder, #remotestorage-widget form input[type=password]::-webkit-input-placeholder{color:#999;}#remotestorage-widget form input[type=email]:-moz-placeholder, #remotestorage-widget form input[type=password]:-moz-placeholder{color:#999;}#remotestorage-widget form input[type=email]::-moz-placeholder, #remotestorage-widget form input[type=password]::-moz-placeholder{color:#999;}#remotestorage-widget form input[type=email]:-ms-input-placeholder, #remotestorage-widget form input[type=password]:-ms-input-placeholder{color:#999;}#remotestorage-widget form input[type=submit]{background:#000;cursor:pointer;padding:0 5px;}#remotestorage-widget form input[type=submit]:hover{background:#333;}#remotestorage-widget .rs-info-msg{font-size:10px;color:#eee;margin-top:0.7em;white-space:normal;}#remotestorage-widget .rs-info-msg.last-synced-message{display:inline;white-space:nowrap;margin-bottom:.7em}#remotestorage-widget .rs-info-msg a:hover, #remotestorage-widget .rs-info-msg a:active{color:#fff;}#remotestorage-widget button img{vertical-align:baseline;}#remotestorage-widget button{border:none;border-radius:6px;font-weight:bold;color:white;outline:none;line-height:1.5em;height:26px;width:26px;background:#000;cursor:pointer;margin:0;padding:5px;}#remotestorage-widget button:hover{background:#333;}#remotestorage-widget .rs-bubble button.connect, #remotestorage-widget .rs-bubble button.rs-cipher, #remotestorage-widget .rs-bubble button.rs-nocipher{display:block;background:none;position:absolute;right:0;top:0;opacity:1;/* increase clickable area of connect, rs-cipher & rs-nocipher buttons */ margin:-5px;padding:10px;width:36px;height:36px;}#remotestorage-widget .rs-bubble button.rs-cipher{width:46px;}#remotestorage-widget .rs-bubble button.rs-nocipher{height:26px;margin:0;padding:4px 5px 5px;right:-32px;width:26px;}#remotestorage-widget .rs-bubble button.connect:not([disabled]):hover, #remotestorage-widget .rs-bubble button.rs-cipher:not([disabled]):hover, #remotestorage-widget .rs-bubble button.rs-nocipher:not([disabled]):hover{background:rgba(150,150,150,.5);}#remotestorage-widget .rs-bubble button.connect[disabled], #remotestorage-widget .rs-bubble button.rs-cipher[disabled]{opacity:.5;cursor:default !important;}#remotestorage-widget .rs-bubble button.rs-sync{position:relative;left:-5px;bottom:-5px;padding:4px 4px 0 4px;background:#555;}#remotestorage-widget .rs-bubble button.rs-sync:hover{background:#444;}#remotestorage-widget .rs-bubble button.rs-disconnect{background:#721;position:absolute;right:0;bottom:0;padding:4px 4px 0 4px;}#remotestorage-widget .rs-bubble button.rs-disconnect:hover{background:#921;}#remotestorage-widget .remotestorage-error-info{color:#f92;}#remotestorage-widget .remotestorage-reset{width:100%;background:#721;}#remotestorage-widget .remotestorage-reset:hover{background:#921;}#remotestorage-widget .rs-bubble .rs-content{margin-top:7px;}#remotestorage-widget pre{user-select:initial;-webkit-user-select:initial;-moz-user-select:text;max-width:27em;margin-top:1em;overflow:auto;}#remotestorage-widget .rs-centered-text{text-align:center;}#remotestorage-widget .rs-bubble.rs-hidden{padding-bottom:2px;border-radius:5px 15px 15px 5px;}#remotestorage-widget .rs-error-msg{min-height:5em;}.rs-bubble.rs-hidden .rs-bubble-expandable{display:none;}.remotestorage-state-connected .rs-bubble.rs-hidden{display:none;}.remotestorage-connected{display:none;}.remotestorage-state-connected .remotestorage-connected{display:block;}.remotestorage-cipher-form{display:none;}.remotestorage-cipher .remotestorage-cipher-form{display:block;}.remotestorage-invalid-key{display:none;}.remotestorage-invalid-key.remotestorage-cipher-error{display:block;}.remotestorage-initial{display:none;}.remotestorage-state-initial .remotestorage-initial{display:block;}.remotestorage-error{display:none;}.remotestorage-state-error .remotestorage-error{display:block;}.remotestorage-state-authing .remotestorage-authing{display:block;}.remotestorage-state-offline .remotestorage-connected, .remotestorage-state-offline .remotestorage-offline{display:block;}.remotestorage-unauthorized{display:none;}.remotestorage-state-unauthorized .rs-bubble.rs-hidden{display:none;}.remotestorage-state-unauthorized .remotestorage-connected, .remotestorage-state-unauthorized .remotestorage-unauthorized{display:block;}.remotestorage-state-unauthorized .rs-sync{display:none;}.remotestorage-state-busy .rs-bubble.rs-hidden{display:none;}.remotestorage-state-busy .rs-bubble{display:block;}.remotestorage-state-busy .remotestorage-connected{display:block;}.remotestorage-state-authing .rs-bubble-expandable{display:none;}'
};


/** FILE: src/widget.js **/
(function(window) {

  var hasLocalStorage;
  var LS_STATE_KEY = "remotestorage:widget:state";

  // states allowed to immediately jump into after a reload.
  var VALID_ENTRY_STATES = {
    initial: true,
    connected: true,
    offline: true
  };

  /**
   * Class: RemoteStorage.Widget
   *
   * The widget controller that communicates with the view and listens to
   * its remoteStorage instance.
   *
   * While listening to the events emitted by its remoteStorage it sets
   * corresponding states of the view.
   *
   * - connected    ->  connected
   * - disconnected ->  initial
   * - connecting   ->  authing
   * - authing      ->  authing
   * - wire-busy    ->  busy
   * - wire-done    ->  connected
   * - error        ->  one of initial, offline, unauthorized, or error
   **/
  RemoteStorage.Widget = function(remoteStorage) {
    var self = this;
    var requestsToFlashFor = 0;

    // setting event listeners on rs events to put
    // the widget into corresponding states
    this.rs = remoteStorage;
    this.rs.remote.on('connected', stateSetter(this, 'connected'));
    this.rs.on('disconnected', stateSetter(this, 'initial'));
    this.rs.on('connecting', stateSetter(this, 'authing'));
    this.rs.on('authing', stateSetter(this, 'authing'));
    this.rs.on('error', errorsHandler(this));

    if (this.rs.remote) {
      this.rs.remote.on('wire-busy', function(evt) {
        if (flashFor(evt)) {
          requestsToFlashFor++;
          stateSetter(self, 'busy')();
        }
      });

      this.rs.remote.on('wire-done', function(evt) {
        if (flashFor(evt)) {
          requestsToFlashFor--;
          if (requestsToFlashFor <= 0) {
            stateSetter(self, 'connected')();
          }
        }
      });
    }

    if (hasLocalStorage) {
      var state = localStorage[LS_STATE_KEY];
      if (state && VALID_ENTRY_STATES[state]) {
        this._rememberedState = state;
      }
    }
  };

  RemoteStorage.Widget.prototype = {

    /**
    * Method: display
    *
    * Displays the widget via the view.display method
    *
    * Parameters:
    *
    *   options
    **/
    display: function(options) {
      if (typeof(options) === 'string') {
        options = { domID: domID };
      } else if (typeof(options) === 'undefined') {
        options = {};
      }
      if (! this.view) {
        this.setView(new RemoteStorage.Widget.View(this.rs));
      }
      this.view.display(options);
      return this;
    },

    linkWidgetToSync: function() {
      if (typeof(this.rs.sync) === 'object' && typeof(this.rs.sync.sync) === 'function') {
        this.view.on('sync', this.rs.sync.sync.bind(this.rs.sync));
      } else {
        RemoteStorage.log('[Widget] typeof this.rs.sync check fail', this.rs.sync);
        setTimeout(this.linkWidgetToSync.bind(this), 1000);
      }
    },

    /**
    *  Method: setView(view)
    *
    *  Sets the view and initializes event listeners to react on
    *  widget (widget.view) events
    **/
    setView: function(view) {
      this.view = view;
      this.view.on('connect', function(options) {
        if (typeof(options) === 'string') {
          // options is simply a useraddress
          this.rs.connect(options);
        } else if (options.special) {
          this.rs[options.special].connect(options);
        }
      }.bind(this));

      this.view.on('secret-entered', function(secretKey) {
        this.view.setUserSecretKey(secretKey);
        stateSetter(this, 'ciphered')();
      }.bind(this));

      this.view.on('secret-cancelled', function() { 
        stateSetter(this, 'notciphered')();
      }.bind(this));

      this.view.on('disconnect', this.rs.disconnect.bind(this.rs));

      this.linkWidgetToSync();
      try {
        this.view.on('reset', function(){
          var location = RemoteStorage.Authorize.getLocation();
          this.rs.on('disconnected', location.reload.bind(location));
          this.rs.disconnect();
        }.bind(this));
      } catch(e) {
        if (e.message && e.message.match(/Unknown event/)) {
          // ignored. (the 0.7 widget-view interface didn't have a 'reset' event)
        } else {
          throw e;
        }
      }

      if (this._rememberedState) {
        setTimeout(stateSetter(this, this._rememberedState), 0);
        delete this._rememberedState;
      }
    }
  };

  /**
   * Method: displayWidget
   *
   * Same as <display>
   **/
  RemoteStorage.prototype.displayWidget = function(options) {
    return this.widget.display(options);
  };

  RemoteStorage.Widget._rs_init = function(remoteStorage) {
    hasLocalStorage = remoteStorage.localStorageAvailable();
    if (! remoteStorage.widget) {
      remoteStorage.widget = new RemoteStorage.Widget(remoteStorage);
    }
  };

  RemoteStorage.Widget._rs_supported = function(remoteStorage) {
    return typeof(document) !== 'undefined';
  };

  function stateSetter(widget, state) {
    RemoteStorage.log('[Widget] Producing stateSetter for', state);
    return function() {
      RemoteStorage.log('[Widget] Setting state', state, arguments);
      if (hasLocalStorage) {
        localStorage[LS_STATE_KEY] = state;
      }
      if (widget.view) {
        if (widget.rs.remote) {
          widget.view.setUserAddress(widget.rs.remote.userAddress);
        }
        widget.view.setState(state, arguments);
      } else {
        widget._rememberedState = state;
      }
    };
  }

  function errorsHandler(widget) {
    return function(error) {
      if (error instanceof RemoteStorage.DiscoveryError) {
        console.error('Discovery failed', error, '"' + error.message + '"');
        widget.view.setState('initial', [error.message]);
      } else if (error instanceof RemoteStorage.SyncError) {
        widget.view.setState('offline', []);
      } else if (error instanceof RemoteStorage.Unauthorized) {
        widget.view.setState('unauthorized');
      } else {
        RemoteStorage.log('[Widget] Unknown error');
        widget.view.setState('error', [error]);
      }
    };
  }

  function flashFor(evt) {
    if (evt.method === 'GET' && evt.isFolder) {
      return false;
    }
    return true;
  }
})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/view.js **/
(function(window){

  var t = RemoteStorage.I18n.translate;

  /**
   * Class: RemoteStorage.Widget.View
   *
   * Controls the visible widget
   *
   * States:
   *
   *   initial      - not connected
   *   authing      - in auth flow
   *   connected    - connected to remote storage, not syncing at the moment
   *   ciphered     - connected, with cipher
   *   notciphered  - connected, without cipher
   *   busy         - connected, syncing at the moment
   *   offline      - connected, but no network connectivity
   *   error        - connected, but sync error happened
   *   unauthorized - connected, but request returned 401
   **/
  RemoteStorage.Widget.View = function(remoteStorage) {
    this.rs = remoteStorage;
    if (typeof(document) === 'undefined') {
      throw "Widget not supported";
    }
    RemoteStorage.eventHandling(this,
                                'connect',
                                'secret-entered',
                                'secret-cancelled',
                                'disconnect',
                                'sync',
                                'display',
                                'reset');

    // Re-binding the event so they can be called from the window
    for (var event in this.events){
      this.events[event] = this.events[event].bind(this);
    }

    this.hideBubbleOnBodyClick = function(event) {
      for (var p = event.target; p !== document.body; p = p.parentElement) {
        if (p.id === 'remotestorage-widget') {
          return;
        }
      }
      this.hideBubble();
    }.bind(this);
  };

  RemoteStorage.Widget.View.prototype = {

    connectGdrive: function() {
      this._emit('connect', { special: 'googledrive' });
    },

    connectDropbox: function(){
      this._emit('connect', { special: 'dropbox'});
    },

    /**
     * Method: setState
     *
     * Call the function that applies the state to the widget
     *
     * Parameters:
     *
     *   state
     *   args
     **/
    setState: function(state, args) {
      RemoteStorage.log('[View] widget.view.setState(',state,',',args,');');
      var s = this.states[state];
      if (typeof(s) === 'undefined') {
        throw new Error("Bad State assigned to view: " + state);
      }
      s.apply(this, args);
    },

    /**
     * Method: setUserAddress
     *
     * Set user address of the input field
     **/
    setUserAddress: function(addr) {
      this.userAddress = addr || '';

      var el;
      if (this.div && (el = this.div.querySelector('form.remotestorage-initial').userAddress)) {
        el.value = this.userAddress;
      }
    },

    /**
     * Method: setUserSecretKey
     *
     * Set user secret key
     **/
    setUserSecretKey: function(secretKey) {
      this.userSecretKey = secretKey;
    },

    /**
    * Method: toggleBubble
    *
    * Show the bubble when hidden and the other way around
    **/
    toggleBubble: function(event) {
      if (this.bubble.className.search('rs-hidden') < 0) {
        this.hideBubble(event);
      } else {
        this.showBubble(event);
      }
    },

    /**
     * Method: hideBubble
     *
     * Hide the bubble
     **/
    hideBubble: function(){
      addClass(this.bubble, 'rs-hidden');
      document.body.removeEventListener('click', this.hideBubbleOnBodyClick);
    },

    /**
     * Method: showBubble
     *
     * Show the bubble
     **/
    showBubble: function(event){
      removeClass(this.bubble, 'rs-hidden');
      if (typeof(event) !== 'undefined') {
        stopPropagation(event);
      }
      document.body.addEventListener('click', this.hideBubbleOnBodyClick);
      if (this.div.querySelector('.remotestorage-connected').classList.contains('remotestorage-cipher') && !this.userSecretKey) {
        this.bubble.querySelector('form.remotestorage-cipher-form').userSecretKey.focus();
      } else {
        this.bubble.querySelector('form.remotestorage-initial').userAddress.focus();
      }
    },

    /**
     * Method: display
     *
     * Draw the widget inside of the dom element with the id options.domID
     *
     * Parameters:
     *
     *   options
     *
     * Returns:
     *
     *   The widget div
     **/
    display: function(options) {
      if (typeof this.div !== 'undefined') {
        return this.div;
      }

      var element = document.createElement('div');
      var style = document.createElement('style');
      style.innerHTML = RemoteStorage.Assets.widgetCss;

      element.id = "remotestorage-widget";

      element.innerHTML = RemoteStorage.Assets.widget;

      element.appendChild(style);
      if (options.domID) {
        var parent = document.getElementById(options.domID);
        if (! parent) {
          throw "Failed to find target DOM element with id=\"" + options.domID + "\"";
        }
        parent.appendChild(element);
      } else {
        document.body.appendChild(element);
      }

      // Sync button
      setupButton(element, 'rs-sync', 'syncIcon', this.events.sync);

      // Disconnect button
      setupButton(element, 'rs-disconnect', 'disconnectIcon', this.events.disconnect);

      // Get me out of here
      setupButton(element, 'remotestorage-reset', undefined, this.events.reset);

      // Connect button
      var connectButton = setupButton(element, 'connect', 'connectIcon', this.events.connect);

      // Handle connectButton state
      this.form = element.querySelector('form.remotestorage-initial');
      var el = this.form.userAddress;
      el.addEventListener('load', handleButtonState);
      el.addEventListener('keyup', handleButtonState);
      if (this.userAddress) {
        el.value = this.userAddress;
      }

      if (options.encryption) {
        this.cipher = true;

        var secretKeyInput = element.querySelector('form.remotestorage-cipher-form').userSecretKey;

        // This is to avoid the 'password field on an insecured page' warning, when not used and on http (not https)
        secretKeyInput.type = 'password';

        // Cipher button
        var cipherButton = setupButton(element, 'rs-cipher', 'cipherIcon', this.events['secret-entered']);

        // Handle cipherButton state
        secretKeyInput.addEventListener('load', handleButtonState);
        secretKeyInput.addEventListener('keyup', handleButtonState);

        // No cipher button
        setupButton(element, 'rs-nocipher', 'nocipherIcon', this.events['secret-cancelled']);
      }

      // The cube
      this.cube = setupButton(element, 'rs-cube', 'remoteStorageIcon', this.toggleBubble.bind(this));

      // Google Drive and Dropbox icons
      setupButton(element, 'rs-dropbox', 'dropbox', this.connectDropbox.bind(this));
      setupButton(element, 'rs-googledrive', 'googledrive', this.connectGdrive.bind(this));

      var bubbleDontCatch = { INPUT: true, BUTTON: true, IMG: true };
      var eventListener = function(event) {
        if (! bubbleDontCatch[event.target.tagName] && ! (this.div.classList.contains('remotestorage-state-unauthorized') )) {
          this.showBubble(event);
        }
      }.bind(this);
      this.bubble = setupButton(element, 'rs-bubble', undefined, eventListener);

      this.hideBubble();

      this.div = element;

      this.states.initial.call(this);
      this.events.display.call(this);
      return this.div;
    },

    states:  {
      initial: function(message) {
        var cube = this.cube;
        var info = message || t("view_info");

        cube.src = RemoteStorage.Assets.remoteStorageIcon;

        this._renderTranslatedInitialContent();

        if (message) {
          cube.src = RemoteStorage.Assets.remoteStorageIconError;
          removeClass(this.cube, 'remotestorage-loading');
          this.showBubble();

          // Show the red error cube for 5 seconds, then show the normal orange one again
          setTimeout(function(){
            cube.src = RemoteStorage.Assets.remoteStorageIcon;
          },2000);
        } else {
          this.hideBubble();
        }
        this.div.className = "remotestorage-state-initial";

        if (this.userSecretKey) {
          delete this.userSecretKey;
        }

        // Google Drive and Dropbox icons
        var backends = 1;
        if (this._activateBackend('dropbox')) { backends += 1; }
        if (this._activateBackend('googledrive')) { backends += 1; }
        this.div.querySelector('.rs-bubble-text').style.paddingRight = backends*32+8+'px';

        // If address not empty connect button enabled
        var cb = this.div.querySelector('.connect');
        if (this.form.userAddress.value) {
          cb.removeAttribute('disabled');
        }

        var infoEl = this.div.querySelector('.rs-info-msg');
        infoEl.innerHTML = info;

        if (message) {
          infoEl.classList.add('remotestorage-error-info');
        } else {
          infoEl.classList.remove('remotestorage-error-info');
        }
      },

      authing: function() {
        this.div.removeEventListener('click', this.events.connect);
        this.div.className = "remotestorage-state-authing";
        this.div.querySelector('.rs-status-text').innerHTML = t("view_connecting", this.userAddress);
        addClass(this.cube, 'remotestorage-loading');
      },

      connected: function() {
        var cube = this.cube;
        this.div.className = "remotestorage-state-connected";
        this.div.querySelector('.userAddress').innerHTML = this.userAddress;
        cube.src = RemoteStorage.Assets.remoteStorageIcon;
        removeClass(cube, 'remotestorage-loading');

        if (this.cipher) {
          if (this.userSecretKey) {
            if (this.userSecretKeyError) {
              cube.src = RemoteStorage.Assets.remoteStorageIconError;
              addClass(this.div.querySelector('.remotestorage-connected'), 'remotestorage-cipher');
              addClass(this.div.querySelector('.remotestorage-invalid-key'), 'remotestorage-cipher-error');
              this.showBubble();

              // Show the red error cube for 5 seconds, then show the normal orange one again
              setTimeout(function(){
                cube.src = RemoteStorage.Assets.remoteStorageIcon;
              },5000);
            } else {
              removeClass(this.div.querySelector('.remotestorage-invalid-key'), 'remotestorage-cipher-error');
              cube.src = RemoteStorage.Assets.remoteStorageIconCiphered;
            }
          } else {
            addClass(this.div.querySelector('.remotestorage-connected'), 'remotestorage-cipher');
            this.showBubble();
          }
        }

        var icons = {
          googledrive: this.div.querySelector('.rs-googledrive'),
          dropbox: this.div.querySelector('.rs-dropbox')
        };
        icons.googledrive.style.display = icons.dropbox.style.display = 'none';
        if (icons[this.rs.backend]) {
          icons[this.rs.backend].style.display = 'inline-block';
          this.div.querySelector('.rs-bubble-text').style.paddingRight = 2*32+8+'px';
        } else {
          this.div.querySelector('.rs-bubble-text').style.paddingRight = 32+8+'px';
        }
      },

      ciphered: function() {
        this.div.querySelector('form.remotestorage-cipher-form').userSecretKey.value = '';
        removeClass(this.div.querySelector('.remotestorage-invalid-key'), 'remotestorage-cipher-error');
        removeClass(this.div.querySelector('.remotestorage-connected'), 'remotestorage-cipher');
        this.cube.src = RemoteStorage.Assets.remoteStorageIconCiphered;
        this.hideBubble();
      },

      notciphered: function() {
        this.cipher = false;
        removeClass(this.div.querySelector('.remotestorage-invalid-key'), 'remotestorage-cipher-error');
        removeClass(this.div.querySelector('.remotestorage-connected'), 'remotestorage-cipher');
        this.hideBubble();
      },

      busy: function() {
        this.div.className = "remotestorage-state-busy";
        addClass(this.cube, 'remotestorage-loading'); //TODO needs to be undone when is that neccesary
      },

      offline: function() {
        this.div.className = "remotestorage-state-offline";
        this.cube.src = RemoteStorage.Assets.remoteStorageIconOffline;
        this.div.querySelector('.rs-status-text').innerHTML = t("view_offline");
      },

      error: function(err) {
        var errorMsg = err;
        this.div.className = "remotestorage-state-error";

        this.div.querySelector('.rs-bubble-text').innerHTML = '<strong>'+t('view_error_occured')+'</strong>';
        //FIXME I don't know what an DOMError is and my browser doesn't know too(how to handle this?)
        if (err instanceof Error /*|| err instanceof DOMError*/) {
          errorMsg = err.message + '\n\n' +
            err.stack;
        }
        this.div.querySelector('.rs-error-msg').textContent = errorMsg;
        this.cube.src = RemoteStorage.Assets.remoteStorageIconError;
        this.showBubble();
      },

      unauthorized: function() {
        this.div.className = "remotestorage-state-unauthorized";
        this.cube.src = RemoteStorage.Assets.remoteStorageIconError;
        this.showBubble();
        this.div.addEventListener('click', this.events.connect);
      }
    },

    events: {
    /**
     * Event: connect
     *
     * Emitted when the connect button is clicked
     **/
      connect: function(event) {
        stopPropagation(event);
        event.preventDefault();
        this._emit('connect', this.div.querySelector('form.remotestorage-initial').userAddress.value);
      },

    /**
     * Event: secret-entered
     *
     * Emitted when the cipher button is clicked
     **/
      'secret-entered': function(event) {
        stopPropagation(event);
        event.preventDefault();
        this._emit('secret-entered', this.div.querySelector('form.remotestorage-cipher-form').userSecretKey.value);
      },

    /**
     * Event: secret-cancelled
     *
     * Emitted when the nocipher button is clicked
     **/
      'secret-cancelled': function(event) {
        stopPropagation(event);
        event.preventDefault();
        this._emit('secret-cancelled');
      },

      /**
       * Event: sync
       *
       * Emitted when the sync button is clicked
       **/
      sync: function(event) {
        stopPropagation(event);
        event.preventDefault();

        this._emit('sync');
      },

      /**
       * Event: disconnect
       *
       * Emitted when the disconnect button is clicked
       **/
      disconnect: function(event) {
        stopPropagation(event);
        event.preventDefault();
        this._emit('disconnect');
      },

      /**
       * Event: reset
       *
       * Emitted after crash triggers disconnect
       **/
      reset: function(event){
        event.preventDefault();
        var result = window.confirm(t('view_confirm_reset'));
        if (result){
          this._emit('reset');
        }
      },

      /**
       * Event: display
       *
       * Emitted when finished displaying the widget
       **/
      display : function(event) {
        if (event) {
          event.preventDefault();
        }
        this._emit('display');
      }
    },

    _renderTranslatedInitialContent: function() {
      this.div.querySelector('.rs-status-text').innerHTML = t("view_connect");
      this.div.querySelector('.remotestorage-reset').innerHTML = t("view_get_me_out");
      this.div.querySelector('.rs-error-plz-report').innerHTML = t("view_error_plz_report");
      this.div.querySelector('.remotestorage-unauthorized').innerHTML = t("view_unauthorized");
      this.div.querySelector('.remotestorage-invalid-key').innerHTML = t("view_invalid_key");
    },

    _activateBackend: function activateBackend(backendName) {
      var className = 'rs-' + backendName;
      if (this.rs.apiKeys[backendName]) {
        this.div.querySelector('.' + className).style.display = 'inline-block';
        return true;
      } else {
        this.div.querySelector('.' + className).style.display = 'none';
        return false;
      }
    }
  };

  function removeClass(el, className) {
    return el.classList.remove(className);
  }

  function addClass(el, className) {
    return el.classList.add(className);
  }

  function stopPropagation(event) {
    if (typeof(event.stopPropagation) === 'function') {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }

  function setupButton(parent, className, iconName, eventListener) {
    var element = parent.querySelector('.' + className);
    if (typeof iconName !== 'undefined') {
      var img = element.querySelector('img');
      (img || element).src = RemoteStorage.Assets[iconName];
    }
    element.addEventListener('click', eventListener);
    return element;
  }

  function handleButtonState(event) {
    if (event.target.value) {
      event.target.nextElementSibling.removeAttribute('disabled');
    } else {
      event.target.nextElementSibling.setAttribute('disabled','disabled');
    }
  }
})(typeof(window) !== 'undefined' ? window : global);


/** FILE: lib/tv4.js **/
/**
Author: Geraint Luff and others
Year: 2013

This code is released into the "public domain" by its author(s).  Anybody may use, alter and distribute the code without restriction.  The author makes no guarantees, and takes no liability of any kind for use of this code.

If you find a bug or make an improvement, it would be courteous to let the author know, but it is not compulsory.
**/

(function (global) {
var ValidatorContext = function (parent, collectMultiple) {
	this.missing = [];
	this.schemas = parent ? Object.create(parent.schemas) : {};
	this.collectMultiple = collectMultiple;
	this.errors = [];
	this.handleError = collectMultiple ? this.collectError : this.returnError;
};
ValidatorContext.prototype.returnError = function (error) {
	return error;
};
ValidatorContext.prototype.collectError = function (error) {
	if (error) {
		this.errors.push(error);
	}
	return null;
}
ValidatorContext.prototype.prefixErrors = function (startIndex, dataPath, schemaPath) {
	for (var i = startIndex; i < this.errors.length; i++) {
		this.errors[i] = this.errors[i].prefixWith(dataPath, schemaPath);
	}
	return this;
}

ValidatorContext.prototype.getSchema = function (url) {
	if (this.schemas[url] != undefined) {
		var schema = this.schemas[url];
		return schema;
	}
	var baseUrl = url;
	var fragment = "";
	if (url.indexOf('#') != -1) {
		fragment = url.substring(url.indexOf("#") + 1);
		baseUrl = url.substring(0, url.indexOf("#"));
	}
	if (this.schemas[baseUrl] != undefined) {
		var schema = this.schemas[baseUrl];
		var pointerPath = decodeURIComponent(fragment);
		if (pointerPath == "") {
			return schema;
		} else if (pointerPath.charAt(0) != "/") {
			return undefined;
		}
		var parts = pointerPath.split("/").slice(1);
		for (var i = 0; i < parts.length; i++) {
			var component = parts[i].replace("~1", "/").replace("~0", "~");
			if (schema[component] == undefined) {
				schema = undefined;
				break;
			}
			schema = schema[component];
		}
		if (schema != undefined) {
			return schema;
		}
	}
	if (this.missing[baseUrl] == undefined) {
		this.missing.push(baseUrl);
		this.missing[baseUrl] = baseUrl;
	}
};
ValidatorContext.prototype.addSchema = function (url, schema) {
	var map = {};
	map[url] = schema;
	normSchema(schema, url);
	searchForTrustedSchemas(map, schema, url);
	for (var key in map) {
		this.schemas[key] = map[key];
	}
	return map;
};
	
ValidatorContext.prototype.validateAll = function validateAll(data, schema, dataPathParts, schemaPathParts) {
	if (schema['$ref'] != undefined) {
		schema = this.getSchema(schema['$ref']);
		if (!schema) {
			return null;
		}
	}
	
	var errorCount = this.errors.length;
	var error = this.validateBasic(data, schema)
		|| this.validateNumeric(data, schema)
		|| this.validateString(data, schema)
		|| this.validateArray(data, schema)
		|| this.validateObject(data, schema)
		|| this.validateCombinations(data, schema)
		|| null
	if (error || errorCount != this.errors.length) {
		while ((dataPathParts && dataPathParts.length) || (schemaPathParts && schemaPathParts.length)) {
			var dataPart = (dataPathParts && dataPathParts.length) ? "" + dataPathParts.pop() : null;
			var schemaPart = (schemaPathParts && schemaPathParts.length) ? "" + schemaPathParts.pop() : null;
			if (error) {
				error = error.prefixWith(dataPart, schemaPart);
			}
			this.prefixErrors(errorCount, dataPart, schemaPart);
		}
	}
		
	return this.handleError(error);
}

function recursiveCompare(A, B) {
	if (A === B) {
		return true;
	}
	if (typeof A == "object" && typeof B == "object") {
		if (Array.isArray(A) != Array.isArray(B)) {
			return false;
		} else if (Array.isArray(A)) {
			if (A.length != B.length) {
				return false
			}
			for (var i = 0; i < A.length; i++) {
				if (!recursiveCompare(A[i], B[i])) {
					return false;
				}
			}
		} else {
			for (var key in A) {
				if (B[key] === undefined && A[key] !== undefined) {
					return false;
				}
			}
			for (var key in B) {
				if (A[key] === undefined && B[key] !== undefined) {
					return false;
				}
			}
			for (var key in A) {
				if (!recursiveCompare(A[key], B[key])) {
					return false;
				}
			}
		}
		return true;
	}
	return false;
}

ValidatorContext.prototype.validateBasic = function validateBasic(data, schema) {
	var error;
	if (error = this.validateType(data, schema)) {
		return error.prefixWith(null, "type");
	}
	if (error = this.validateEnum(data, schema)) {
		return error.prefixWith(null, "type");
	}
	return null;
}

ValidatorContext.prototype.validateType = function validateType(data, schema) {
	if (schema.type == undefined) {
		return null;
	}
	var dataType = typeof data;
	if (data == null) {
		dataType = "null";
	} else if (Array.isArray(data)) {
		dataType = "array";
	}
	var allowedTypes = schema.type;
	if (typeof allowedTypes != "object") {
		allowedTypes = [allowedTypes];
	}
	
	for (var i = 0; i < allowedTypes.length; i++) {
		var type = allowedTypes[i];
		if (type == dataType || (type == "integer" && dataType == "number" && (data%1 == 0))) {
			return null;
		}
	}
	return new ValidationError(ErrorCodes.INVALID_TYPE, "invalid data type: " + dataType);
}

ValidatorContext.prototype.validateEnum = function validateEnum(data, schema) {
	if (schema["enum"] == undefined) {
		return null;
	}
	for (var i = 0; i < schema["enum"].length; i++) {
		var enumVal = schema["enum"][i];
		if (recursiveCompare(data, enumVal)) {
			return null;
		}
	}
	return new ValidationError(ErrorCodes.ENUM_MISMATCH, "No enum match for: " + JSON.stringify(data));
}
ValidatorContext.prototype.validateNumeric = function validateNumeric(data, schema) {
	return this.validateMultipleOf(data, schema)
		|| this.validateMinMax(data, schema)
		|| null;
}

ValidatorContext.prototype.validateMultipleOf = function validateMultipleOf(data, schema) {
	var multipleOf = schema.multipleOf || schema.divisibleBy;
	if (multipleOf == undefined) {
		return null;
	}
	if (typeof data == "number") {
		if (data%multipleOf != 0) {
			return new ValidationError(ErrorCodes.NUMBER_MULTIPLE_OF, "Value " + data + " is not a multiple of " + multipleOf);
		}
	}
	return null;
}

ValidatorContext.prototype.validateMinMax = function validateMinMax(data, schema) {
	if (typeof data != "number") {
		return null;
	}
	if (schema.minimum != undefined) {
		if (data < schema.minimum) {
			return new ValidationError(ErrorCodes.NUMBER_MINIMUM, "Value " + data + " is less than minimum " + schema.minimum).prefixWith(null, "minimum");
		}
		if (schema.exclusiveMinimum && data == schema.minimum) {
			return new ValidationError(ErrorCodes.NUMBER_MINIMUM_EXCLUSIVE, "Value "+ data + " is equal to exclusive minimum " + schema.minimum).prefixWith(null, "exclusiveMinimum");
		}
	}
	if (schema.maximum != undefined) {
		if (data > schema.maximum) {
			return new ValidationError(ErrorCodes.NUMBER_MAXIMUM, "Value " + data + " is greater than maximum " + schema.maximum).prefixWith(null, "maximum");
		}
		if (schema.exclusiveMaximum && data == schema.maximum) {
			return new ValidationError(ErrorCodes.NUMBER_MAXIMUM_EXCLUSIVE, "Value "+ data + " is equal to exclusive maximum " + schema.maximum).prefixWith(null, "exclusiveMaximum");
		}
	}
	return null;
}
ValidatorContext.prototype.validateString = function validateString(data, schema) {
	return this.validateStringLength(data, schema)
		|| this.validateStringPattern(data, schema)
		|| null;
}

ValidatorContext.prototype.validateStringLength = function validateStringLength(data, schema) {
	if (typeof data != "string") {
		return null;
	}
	if (schema.minLength != undefined) {
		if (data.length < schema.minLength) {
			return new ValidationError(ErrorCodes.STRING_LENGTH_SHORT, "String is too short (" + data.length + " chars), minimum " + schema.minLength).prefixWith(null, "minLength");
		}
	}
	if (schema.maxLength != undefined) {
		if (data.length > schema.maxLength) {
			return new ValidationError(ErrorCodes.STRING_LENGTH_LONG, "String is too long (" + data.length + " chars), maximum " + schema.maxLength).prefixWith(null, "maxLength");
		}
	}
	return null;
}

ValidatorContext.prototype.validateStringPattern = function validateStringPattern(data, schema) {
	if (typeof data != "string" || schema.pattern == undefined) {
		return null;
	}
	var regexp = new RegExp(schema.pattern);
	if (!regexp.test(data)) {
		return new ValidationError(ErrorCodes.STRING_PATTERN, "String does not match pattern").prefixWith(null, "pattern");
	}
	return null;
}
ValidatorContext.prototype.validateArray = function validateArray(data, schema) {
	if (!Array.isArray(data)) {
		return null;
	}
	return this.validateArrayLength(data, schema)
		|| this.validateArrayUniqueItems(data, schema)
		|| this.validateArrayItems(data, schema)
		|| null;
}

ValidatorContext.prototype.validateArrayLength = function validateArrayLength(data, schema) {
	if (schema.minItems != undefined) {
		if (data.length < schema.minItems) {
			var error = (new ValidationError(ErrorCodes.ARRAY_LENGTH_SHORT, "Array is too short (" + data.length + "), minimum " + schema.minItems)).prefixWith(null, "minItems");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	if (schema.maxItems != undefined) {
		if (data.length > schema.maxItems) {
			var error = (new ValidationError(ErrorCodes.ARRAY_LENGTH_LONG, "Array is too long (" + data.length + " chars), maximum " + schema.maxItems)).prefixWith(null, "maxItems");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	return null;
}

ValidatorContext.prototype.validateArrayUniqueItems = function validateArrayUniqueItems(data, schema) {
	if (schema.uniqueItems) {
		for (var i = 0; i < data.length; i++) {
			for (var j = i + 1; j < data.length; j++) {
				if (recursiveCompare(data[i], data[j])) {
					var error = (new ValidationError(ErrorCodes.ARRAY_UNIQUE, "Array items are not unique (indices " + i + " and " + j + ")")).prefixWith(null, "uniqueItems");
					if (this.handleError(error)) {
						return error;
					}
				}
			}
		}
	}
	return null;
}

ValidatorContext.prototype.validateArrayItems = function validateArrayItems(data, schema) {
	if (schema.items == undefined) {
		return null;
	}
	var error;
	if (Array.isArray(schema.items)) {
		for (var i = 0; i < data.length; i++) {
			if (i < schema.items.length) {
				if (error = this.validateAll(data[i], schema.items[i], [i], ["items", i])) {
					return error;
				}
			} else if (schema.additionalItems != undefined) {
				if (typeof schema.additionalItems == "boolean") {
					if (!schema.additionalItems) {
						error = (new ValidationError(ErrorCodes.ARRAY_ADDITIONAL_ITEMS, "Additional items not allowed")).prefixWith("" + i, "additionalItems");
						if (this.handleError(error)) {
							return error;
						}
					}
				} else if (error = this.validateAll(data[i], schema.additionalItems, [i], ["additionalItems"])) {
					return error;
				}
			}
		}
	} else {
		for (var i = 0; i < data.length; i++) {
			if (error = this.validateAll(data[i], schema.items, [i], ["items"])) {
				return error;
			}
		}
	}
	return null;
}
ValidatorContext.prototype.validateObject = function validateObject(data, schema) {
	if (typeof data != "object" || data == null || Array.isArray(data)) {
		return null;
	}
	return this.validateObjectMinMaxProperties(data, schema)
		|| this.validateObjectRequiredProperties(data, schema)
		|| this.validateObjectProperties(data, schema)
		|| this.validateObjectDependencies(data, schema)
		|| null;
}

ValidatorContext.prototype.validateObjectMinMaxProperties = function validateObjectMinMaxProperties(data, schema) {
	var keys = Object.keys(data);
	if (schema.minProperties != undefined) {
		if (keys.length < schema.minProperties) {
			var error = new ValidationError(ErrorCodes.OBJECT_PROPERTIES_MINIMUM, "Too few properties defined (" + keys.length + "), minimum " + schema.minProperties).prefixWith(null, "minProperties");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	if (schema.maxProperties != undefined) {
		if (keys.length > schema.maxProperties) {
			var error = new ValidationError(ErrorCodes.OBJECT_PROPERTIES_MAXIMUM, "Too many properties defined (" + keys.length + "), maximum " + schema.maxProperties).prefixWith(null, "maxProperties");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	return null;
}

ValidatorContext.prototype.validateObjectRequiredProperties = function validateObjectRequiredProperties(data, schema) {
	if (schema.required != undefined) {
		for (var i = 0; i < schema.required.length; i++) {
			var key = schema.required[i];
			if (data[key] === undefined) {
				var error = new ValidationError(ErrorCodes.OBJECT_REQUIRED, "Missing required property: " + key).prefixWith(null, "" + i).prefixWith(null, "required");
				if (this.handleError(error)) {
					return error;
				}
			}
		}
	}
	return null;
}

ValidatorContext.prototype.validateObjectProperties = function validateObjectProperties(data, schema) {
	var error;
	for (var key in data) {
		var foundMatch = false;
		if (schema.properties != undefined && schema.properties[key] != undefined) {
			foundMatch = true;
			if (error = this.validateAll(data[key], schema.properties[key], [key], ["properties", key])) {
				return error;
			}
		}
		if (schema.patternProperties != undefined) {
			for (var patternKey in schema.patternProperties) {
				var regexp = new RegExp(patternKey);
				if (regexp.test(key)) {
					foundMatch = true;
					if (error = this.validateAll(data[key], schema.patternProperties[patternKey], [key], ["patternProperties", patternKey])) {
						return error;
					}
				}
			}
		}
		if (!foundMatch && schema.additionalProperties != undefined) {
			if (typeof schema.additionalProperties == "boolean") {
				if (!schema.additionalProperties) {
					error = new ValidationError(ErrorCodes.OBJECT_ADDITIONAL_PROPERTIES, "Additional properties not allowed").prefixWith(key, "additionalProperties");
					if (this.handleError(error)) {
						return error;
					}
				}
			} else {
				if (error = this.validateAll(data[key], schema.additionalProperties, [key], ["additionalProperties"])) {
					return error;
				}
			}
		}
	}
	return null;
}

ValidatorContext.prototype.validateObjectDependencies = function validateObjectDependencies(data, schema) {
	var error;
	if (schema.dependencies != undefined) {
		for (var depKey in schema.dependencies) {
			if (data[depKey] !== undefined) {
				var dep = schema.dependencies[depKey];
				if (typeof dep == "string") {
					if (data[dep] === undefined) {
						error = new ValidationError(ErrorCodes.OBJECT_DEPENDENCY_KEY, "Dependency failed - key must exist: " + dep).prefixWith(null, depKey).prefixWith(null, "dependencies");
						if (this.handleError(error)) {
							return error;
						}
					}
				} else if (Array.isArray(dep)) {
					for (var i = 0; i < dep.length; i++) {
						var requiredKey = dep[i];
						if (data[requiredKey] === undefined) {
							error = new ValidationError(ErrorCodes.OBJECT_DEPENDENCY_KEY, "Dependency failed - key must exist: " + requiredKey).prefixWith(null, "" + i).prefixWith(null, depKey).prefixWith(null, "dependencies");
							if (this.handleError(error)) {
								return error;
							}
						}
					}
				} else {
					if (error = this.validateAll(data, dep, [], ["dependencies", depKey])) {
						return error;
					}
				}
			}
		}
	}
	return null;
}

ValidatorContext.prototype.validateCombinations = function validateCombinations(data, schema) {
	var error;
	return this.validateAllOf(data, schema)
		|| this.validateAnyOf(data, schema)
		|| this.validateOneOf(data, schema)
		|| this.validateNot(data, schema)
		|| null;
}

ValidatorContext.prototype.validateAllOf = function validateAllOf(data, schema) {
	if (schema.allOf == undefined) {
		return null;
	}
	var error;
	for (var i = 0; i < schema.allOf.length; i++) {
		var subSchema = schema.allOf[i];
		if (error = this.validateAll(data, subSchema, [], ["allOf", i])) {
			return error;
		}
	}
	return null;
}

ValidatorContext.prototype.validateAnyOf = function validateAnyOf(data, schema) {
	if (schema.anyOf == undefined) {
		return null;
	}
	var errors = [];
	var startErrorCount = this.errors.length;
	for (var i = 0; i < schema.anyOf.length; i++) {
		var subSchema = schema.anyOf[i];

		var errorCount = this.errors.length;
		var error = this.validateAll(data, subSchema, [], ["anyOf", i]);

		if (error == null && errorCount == this.errors.length) {
			this.errors = this.errors.slice(0, startErrorCount);
			return null;
		}
		if (error) {
			errors.push(error.prefixWith(null, "" + i).prefixWith(null, "anyOf"));
		}
	}
	errors = errors.concat(this.errors.slice(startErrorCount));
	this.errors = this.errors.slice(0, startErrorCount);
	return new ValidationError(ErrorCodes.ANY_OF_MISSING, "Data does not match any schemas from \"anyOf\"", "", "/anyOf", errors);
}

ValidatorContext.prototype.validateOneOf = function validateOneOf(data, schema) {
	if (schema.oneOf == undefined) {
		return null;
	}
	var validIndex = null;
	var errors = [];
	var startErrorCount = this.errors.length;
	for (var i = 0; i < schema.oneOf.length; i++) {
		var subSchema = schema.oneOf[i];
		
		var errorCount = this.errors.length;
		var error = this.validateAll(data, subSchema, [], ["oneOf", i]);
		
		if (error == null && errorCount == this.errors.length) {
			if (validIndex == null) {
				validIndex = i;
			} else {
				this.errors = this.errors.slice(0, startErrorCount);
				return new ValidationError(ErrorCodes.ONE_OF_MULTIPLE, "Data is valid against more than one schema from \"oneOf\": indices " + validIndex + " and " + i, "", "/oneOf");
			}
		} else if (error) {
			errors.push(error.prefixWith(null, "" + i).prefixWith(null, "oneOf"));
		}
	}
	if (validIndex == null) {
		errors = errors.concat(this.errors.slice(startErrorCount));
		this.errors = this.errors.slice(0, startErrorCount);
		return new ValidationError(ErrorCodes.ONE_OF_MISSING, "Data does not match any schemas from \"oneOf\"", "", "/oneOf", errors);
	} else {
		this.errors = this.errors.slice(0, startErrorCount);
	}
	return null;
}

ValidatorContext.prototype.validateNot = function validateNot(data, schema) {
	if (schema.not == undefined) {
		return null;
	}
	var oldErrorCount = this.errors.length;
	var error = this.validateAll(data, schema.not);
	var notErrors = this.errors.slice(oldErrorCount);
	this.errors = this.errors.slice(0, oldErrorCount);
	if (error == null && notErrors.length == 0) {
		return new ValidationError(ErrorCodes.NOT_PASSED, "Data matches schema from \"not\"", "", "/not")
	}
	return null;
}

// parseURI() and resolveUrl() are from https://gist.github.com/1088850
//   -  released as public domain by author ("Yaffle") - see comments on gist

function parseURI(url) {
	var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
	// authority = '//' + user + ':' + pass '@' + hostname + ':' port
	return (m ? {
		href     : m[0] || '',
		protocol : m[1] || '',
		authority: m[2] || '',
		host     : m[3] || '',
		hostname : m[4] || '',
		port     : m[5] || '',
		pathname : m[6] || '',
		search   : m[7] || '',
		hash     : m[8] || ''
	} : null);
}

function resolveUrl(base, href) {// RFC 3986

	function removeDotSegments(input) {
		var output = [];
		input.replace(/^(\.\.?(\/|$))+/, '')
			.replace(/\/(\.(\/|$))+/g, '/')
			.replace(/\/\.\.$/, '/../')
			.replace(/\/?[^\/]*/g, function (p) {
				if (p === '/..') {
					output.pop();
				} else {
					output.push(p);
				}
		});
		return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
	}

	href = parseURI(href || '');
	base = parseURI(base || '');

	return !href || !base ? null : (href.protocol || base.protocol) +
		(href.protocol || href.authority ? href.authority : base.authority) +
		removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
		(href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
		href.hash;
}

function normSchema(schema, baseUri) {
	if (baseUri == undefined) {
		baseUri = schema.id;
	} else if (typeof schema.id == "string") {
		baseUri = resolveUrl(baseUri, schema.id);
		schema.id = baseUri;
	}
	if (typeof schema == "object") {
		if (Array.isArray(schema)) {
			for (var i = 0; i < schema.length; i++) {
				normSchema(schema[i], baseUri);
			}
		} else if (typeof schema['$ref'] == "string") {
			schema['$ref'] = resolveUrl(baseUri, schema['$ref']);
		} else {
			for (var key in schema) {
				if (key != "enum") {
					normSchema(schema[key], baseUri);
				}
			}
		}
	}
}

var ErrorCodes = {
	INVALID_TYPE: 0,
	ENUM_MISMATCH: 1,
	ANY_OF_MISSING: 10,
	ONE_OF_MISSING: 11,
	ONE_OF_MULTIPLE: 12,
	NOT_PASSED: 13,
	// Numeric errors
	NUMBER_MULTIPLE_OF: 100,
	NUMBER_MINIMUM: 101,
	NUMBER_MINIMUM_EXCLUSIVE: 102,
	NUMBER_MAXIMUM: 103,
	NUMBER_MAXIMUM_EXCLUSIVE: 104,
	// String errors
	STRING_LENGTH_SHORT: 200,
	STRING_LENGTH_LONG: 201,
	STRING_PATTERN: 202,
	// Object errors
	OBJECT_PROPERTIES_MINIMUM: 300,
	OBJECT_PROPERTIES_MAXIMUM: 301,
	OBJECT_REQUIRED: 302,
	OBJECT_ADDITIONAL_PROPERTIES: 303,
	OBJECT_DEPENDENCY_KEY: 304,
	// Array errors
	ARRAY_LENGTH_SHORT: 400,
	ARRAY_LENGTH_LONG: 401,
	ARRAY_UNIQUE: 402,
	ARRAY_ADDITIONAL_ITEMS: 403
};

function ValidationError(code, message, dataPath, schemaPath, subErrors) {
	if (code == undefined) {
		throw new Error ("No code supplied for error: "+ message);
	}
	this.code = code;
	this.message = message;
	this.dataPath = dataPath ? dataPath : "";
	this.schemaPath = schemaPath ? schemaPath : "";
	this.subErrors = subErrors ? subErrors : null;
}
ValidationError.prototype = {
	prefixWith: function (dataPrefix, schemaPrefix) {
		if (dataPrefix != null) {
			dataPrefix = dataPrefix.replace("~", "~0").replace("/", "~1");
			this.dataPath = "/" + dataPrefix + this.dataPath;
		}
		if (schemaPrefix != null) {
			schemaPrefix = schemaPrefix.replace("~", "~0").replace("/", "~1");
			this.schemaPath = "/" + schemaPrefix + this.schemaPath;
		}
		if (this.subErrors != null) {
			for (var i = 0; i < this.subErrors.length; i++) {
				this.subErrors[i].prefixWith(dataPrefix, schemaPrefix);
			}
		}
		return this;
	}
};

function searchForTrustedSchemas(map, schema, url) {
	if (typeof schema.id == "string") {
		if (schema.id.substring(0, url.length) == url) {
			var remainder = schema.id.substring(url.length);
			if ((url.length > 0 && url.charAt(url.length - 1) == "/")
				|| remainder.charAt(0) == "#"
				|| remainder.charAt(0) == "?") {
				if (map[schema.id] == undefined) {
					map[schema.id] = schema;
				}
			}
		}
	}
	if (typeof schema == "object") {
		for (var key in schema) {
			if (key != "enum" && typeof schema[key] == "object") {
				searchForTrustedSchemas(map, schema[key], url);
			}
		}
	}
	return map;
}

var globalContext = new ValidatorContext();

var publicApi = {
	validate: function (data, schema) {
		var context = new ValidatorContext(globalContext);
		if (typeof schema == "string") {
			schema = {"$ref": schema};
		}
		var added = context.addSchema("", schema);
		var error = context.validateAll(data, schema);
		this.error = error;
		this.missing = context.missing;
		this.valid = (error == null);
		return this.valid;
	},
	validateResult: function () {
		var result = {};
		this.validate.apply(result, arguments);
		return result;
	},
	validateMultiple: function (data, schema) {
		var context = new ValidatorContext(globalContext, true);
		if (typeof schema == "string") {
			schema = {"$ref": schema};
		}
		context.addSchema("", schema);
		context.validateAll(data, schema);
		var result = {};
		result.errors = context.errors;
		result.missing = context.missing;
		result.valid = (result.errors.length == 0);
		return result;
	},
	addSchema: function (url, schema) {
		return globalContext.addSchema(url, schema);
	},
	getSchema: function (url) {
		return globalContext.getSchema(url);
	},
	missing: [],
	error: null,
	normSchema: normSchema,
	resolveUrl: resolveUrl,
	errorCodes: ErrorCodes
};

global.tv4 = publicApi;

})(typeof(window) != 'undefined' ? window : global);



/** FILE: lib/Math.uuid.js **/
/*!
  Math.uuid.js (v1.4)
  http://www.broofa.com
  mailto:robert@broofa.com

  Copyright (c) 2010 Robert Kieffer
  Dual licensed under the MIT and GPL licenses.

  ********

  Changes within remoteStorage.js:
  2012-10-31:
  - added AMD wrapper <niklas@unhosted.org>
  - moved extensions for Math object into exported object.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

Math.uuid = function (len, radix) {
  var chars = CHARS, uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
};


/** FILE: src/baseclient.js **/
(function(global) {

  function deprecate(thing, replacement) {
    console.log('WARNING: ' + thing + ' is deprecated. Use ' +
                replacement + ' instead.');
  }

  var RS = RemoteStorage;

  /**
   * Class: RemoteStorage.BaseClient
   *
   * Provides a high-level interface to access data below a given root path.
   *
   * A BaseClient deals with three types of data: folders, objects and files.
   *
   * <getListing> returns a mapping of all items within a folder. Items that
   * end with a forward slash ("/") are child folders. For instance:
   * {
   *   'folder/': true,
   *   'document.txt': true
   * }
   *
   * <getObject> / <storeObject> operate on JSON objects. Each object has a type.
   *
   * <getFile> / <storeFile> operates on files. Each file has a MIME type.
   *
   * <remove> operates on either objects or files (but not folders, folders are
   * created and removed implictly).
   */
  RS.BaseClient = function(storage, base) {
    if (base[base.length - 1] !== '/') {
      throw "Not a folder: " + base;
    }

    if (base === '/') {
      // allow absolute and relative paths for the root scope.
      this.makePath = function(path) {
        return (path[0] === '/' ? '' : '/') + path;
      };
    }

    /**
     * Property: storage
     *
     * The <RemoteStorage> instance this <BaseClient> operates on.
     */
    this.storage = storage;

    /**
     * Property: base
     *
     * Base path this <BaseClient> operates on.
     *
     * For the module's privateClient this would be /<moduleName>/, for the
     * corresponding publicClient /public/<moduleName>/.
     */
    this.base = base;

    var parts = this.base.split('/');
    if (parts.length > 2) {
      this.moduleName = parts[1];
    } else {
      this.moduleName = 'root';
    }

    // Defined in baseclient/types.js
    /**
     * Property: schemas
     *
     * Contains schema objects of all types known to the BaseClient instance
     **/

    /**
     * Event: change
     *
     * Emitted when a node changes
     *
     * Arguments:
     *   event - Event object containing information about the changed node
     *
     * (start code)
     * {
     *    path: path, // Absolute path of the changed node, from the storage root
     *    relativePath: relativePath, // Path of the changed node, relative to this baseclient's scope root
     *    origin: 'window', 'local', 'remote', or 'conflict' // emitted by user action within the app, local data store, remote sync, or versioning conflicts
     *    oldValue: oldBody, // Old body of the changed node (local version in conflicts; undefined if creation)
     *    newValue: newBody, // New body of the changed node (remote version in conflicts; undefined if deletion)
     *    lastCommonValue: lastCommonValue, //most recent known common ancestor body of 'yours' and 'theirs' in case of conflict
     *    oldContentType: oldContentType, // Old contentType of the changed node ('yours' for conflicts; undefined if creation)
     *    newContentType: newContentType, // New contentType of the changed node ('theirs' for conflicts; undefined if deletion)
     *    lastCommonContentType: lastCommonContentType // Most recent known common ancestor contentType of 'yours' and 'theirs' in case of conflict
     *  }
     * (end code)
     *
     * Example of an event with origin 'local' (fired on page load):
     * 
     * (start code)
     * {
     *    path: '/public/design/color.txt',
     *    relativePath: 'color.txt',
     *    origin: 'local',
     *    oldValue: undefined,
     *    newValue: 'white',
     *    oldContentType: undefined,
     *    newContentType: 'text/plain'
     *  }
     * (end code)
     *
     * Example of a conflict:
     * Say you changed 'color.txt' from 'white' to 'blue'; if you have set `RemoteStorage.config.changeEvents.window` to `true`,
     * then you will receive:
     *
     * (start code)
     * {
     *    path: '/public/design/color.txt',
     *    relativePath: 'color.txt',
     *    origin: 'window',
     *    oldValue: 'white',
     *    newValue: 'blue',
     *    oldContentType: 'text/plain',
     *    newContentType: 'text/plain'
     *  }
     * (end code)
     *
     * But when this change is pushed out by asynchronous synchronization, this change may rejected by the
     * server, if the remote version has in the meantime changed from 'white' to  for instance 'red'; this will then lead to a change
     * event with origin 'conflict' (usually a few seconds after the event with origin 'window', if you had that activated). Note
     * that since you already changed it from 'white' to 'blue' in the local version a few seconds ago, `oldValue` is now your local
     * value of 'blue':
     * 
     * (start code)
     * {
     *    path: '/public/design/color.txt',
     *    relativePath: 'color.txt',
     *    origin: 'conflict',
     *    oldValue: 'blue',
     *    newValue: 'red',
     *    lastCommonValue: 'white',
     *    oldContentType: 'text/plain,
     *    newContentType: 'text/plain'
     *    lastCommonContentType: 'text/plain'
     *  }
     * (end code)
     *
     * In practice, you should always redraw your views to display the content of the `newValue` field when a change event is received,
     * regardless of its origin. Events with origin 'local' are fired conveniently during the page load, so that you can fill your views
     * when the page loads. Events with origin 'window' are fired whenever you change a value by calling a method on the baseClient;
     * these are disabled by default. Events with origin 'remote' are fired when remote changes are discovered during sync (only for caching
     * startegies 'SEEN' and 'ALL'). Events with origin 'conflict' are fired when a conflict occurs while pushing out your local changes to
     * the remote store in asynchronous synchronization (see example above). 
     **/

    RS.eventHandling(this, 'change');
    this.on = this.on.bind(this);
    storage.onChange(this.base, this._fireChange.bind(this));
  };

  RS.BaseClient.prototype = {

    extend: function(object) {
      for (var key in object) {
        this[key] = object[key];
      }
      return this;
    },

    /**
     * Method: scope
     *
     * Returns a new <BaseClient> operating on a subpath of the current <base> path.
     */
    scope: function(path) {
      return new RS.BaseClient(this.storage, this.makePath(path));
    },

    // folder operations

    /**
     * Method: getListing
     *
     * Get a list of child nodes below a given path.
     *
     * The callback semantics of getListing are identical to those of getObject.
     *
     * Parameters:
     *   path   - The path to query. It MUST end with a forward slash.
     *   maxAge - Either false or the maximum age of cached listing in
     *            milliseconds. Defaults to false in anonymous mode and to
     *            2*syncInterval in connected mode.
     *
     * Returns:
     *
     *   A promise for an object, representing child nodes. If the maxAge
     *   requirement cannot be met because of network problems, this promise
     *   will be rejected. If the maxAge requirement is set to false, the
     *   promise will always be fulfilled with data from the local store.
     *
     *   Keys ending in a forward slash represent *folder nodes*, while all
     *   other keys represent *data nodes*.
     *
     *   For spec versions <= 01, the data node information will contain only
     *   the item's ETag. For later spec versions, it will also contain the
     *   content type and -length of the item.
     *
     * Example:
     *   (start code)
     *   client.getListing('', false).then(function(listing) {
     *     // listing is for instance:
     *     // {
     *     //   'folder/': true,
     *     //   'document.txt': true
     *     // }
     *   });
     *   (end code)
     */
    getListing: function(path, maxAge) {
      if (typeof(path) !== 'string') {
        path = '';
      } else if (path.length > 0 && path[path.length - 1] !== '/') {
        throw "Not a folder: " + path;
      }
      return this.storage.get(this.makePath(path), maxAge).then(
        function(status, body) {
          return (status === 404) ? {} : body;
        }
      );
    },

    /**
     * Method: getAll
     *
     * Get all objects directly below a given path.
     *
     * Parameters:
     *   path   - Path to the folder.
     *   maxAge - Either false or the maximum age of cached objects in
     *            milliseconds. Defaults to false in anonymous mode and to
     *            2*syncInterval in connected mode.
     *
     * Returns:
     *   A promise for an object in the form { path : object, ... }. If the
     *   maxAge requirement cannot be met because of network problems, this
     *   promise will be rejected. If the maxAge requirement is set to false,
     *   the promise will always be fulfilled with data from the local store.
     *
     * Example:
     *   (start code)
     *   client.getAll('', false).then(function(objects) {
     *     for (var key in objects) {
     *       console.log('- ' + key + ': ', objects[key]);
     *     }
     *   });
     *   (end code)
     */
    getAll: function(path, maxAge) {
      if (typeof(path) !== 'string') {
        path = '';
      } else if (path.length > 0 && path[path.length - 1] !== '/') {
        throw "Not a folder: " + path;
      }

      return this.storage.get(this.makePath(path), maxAge).then(function(status, body) {
        if (status === 404) { return {}; }
        if (typeof(body) === 'object') {
          var promise = promising();
          var count = Object.keys(body).length, i = 0;
          if (count === 0) {
            // treat this like 404. it probably means a folder listing that
            // has changes that haven't been pushed out yet.
            return {};
          }
          for (var key in body) {
            this.storage.get(this.makePath(path + key), maxAge).
              then(function(status, b) {
                if (typeof(b) === 'string') {
                  try {
                    b = JSON.parse(b);
                  } catch (e) {
                  }
                }
                if (typeof(b) === 'object') {
                  body[this.key] = b;
                }
                i++;
                if (i === count) { promise.fulfill(body); }
              }.bind({ key: key }));
          }
          return promise;
        }
      }.bind(this));
    },

    // file operations

    /**
     * Method: getFile
     *
     * Get the file at the given path. A file is raw data, as opposed to
     * a JSON object (use <getObject> for that).
     *
     * Except for the return value structure, getFile works exactly like
     * getObject.
     *
     * Parameters:
     *   path   - See getObject.
     *   maxAge - Either false or the maximum age of cached file in
     *            milliseconds. Defaults to false in anonymous mode and to
     *            2*syncInterval in connected mode.
     *
     * Returns:
     *   A promise for an object:
     *
     *   mimeType - String representing the MIME Type of the document.
     *   data     - Raw data of the document (either a string or an ArrayBuffer)
     *
     *   If the maxAge requirement cannot be met because of network problems, this
     *   promise will be rejected. If the maxAge requirement is set to false, the
     *   promise will always be fulfilled with data from the local store.
     *
     * Example:
     *   (start code)
     *   // Display an image:
     *   client.getFile('path/to/some/image', false).then(function(file) {
     *     var blob = new Blob([file.data], { type: file.mimeType });
     *     var targetElement = document.findElementById('my-image-element');
     *     targetElement.src = window.URL.createObjectURL(blob);
     *   });
     *   (end code)
     */
    getFile: function(path, maxAge) {
      if (typeof(path) !== 'string') {
        return promising().reject('Argument \'path\' of baseClient.getFile must be a string');
      }
      return this.storage.get(this.makePath(path), maxAge).then(function(status, body, mimeType, revision) {
        return {
          data: body,
          mimeType: mimeType,
          revision: revision // (this is new)
        };
      });
    },

    /**
     * Method: storeFile
     *
     * Store raw data at a given path.
     *
     * Parameters:
     *   mimeType - MIME media type of the data being stored
     *   path     - path relative to the module root. MAY NOT end in a forward slash.
     *   data     - string, ArrayBuffer or ArrayBufferView of raw data to store
     *
     * The given mimeType will later be returned, when retrieving the data
     * using <getFile>.
     *
     * Example (UTF-8 data):
     *   (start code)
     *   client.storeFile('text/html', 'index.html', '<h1>Hello World!</h1>');
     *   (end code)
     *
     * Example (Binary data):
     *   (start code)
     *   // MARKUP:
     *   <input type="file" id="file-input">
     *   // CODE:
     *   var input = document.getElementById('file-input');
     *   var file = input.files[0];
     *   var fileReader = new FileReader();
     *
     *   fileReader.onload = function() {
     *     client.storeFile(file.type, file.name, fileReader.result);
     *   };
     *
     *   fileReader.readAsArrayBuffer(file);
     *   (end code)
     *
     */
    storeFile: function(mimeType, path, body) {
      if (typeof(mimeType) !== 'string') {
        return promising().reject('Argument \'mimeType\' of baseClient.storeFile must be a string');
      }
      if (typeof(path) !== 'string') {
        return promising().reject('Argument \'path\' of baseClient.storeFile must be a string');
      }
      if (typeof(body) !== 'string' && typeof(body) !== 'object') {
        return promising().reject('Argument \'body\' of baseClient.storeFile must be a string, ArrayBuffer, or ArrayBufferView');
      }
      if (!this.storage.access.checkPathPermission(this.makePath(path), 'rw')) {
        console.warn('WARNING: Editing a document to which only read access (\'r\') was claimed');
      }

      var self = this;
      return this.storage.put(this.makePath(path), body, mimeType).then(function(status, _body, _mimeType, revision) {
        if (status === 200 || status === 201) {
          return revision;
        } else {
          throw "Request (PUT " + self.makePath(path) + ") failed with status: " + status;
        }
      });
    },

    // object operations

    /**
     * Method: getObject
     *
     * Get a JSON object from given path.
     *
     * Parameters:
     *   path   - Relative path from the module root (without leading slash).
     *   maxAge - Either false or the maximum age of cached object in
     *            milliseconds. Defaults to false in anonymous mode and to
     *            2*syncInterval in connected mode.
     *
     * Returns:
     *   A promise for the object. If the maxAge requirement cannot be met
     *   because of network problems, this promise will be rejected. If the
     *   maxAge requirement is set to false, the promise will always be
     *   fulfilled with data from the local store.
     *
     * Example:
     *   (start code)
     *   client.getObject('/path/to/object', false).
     *     then(function(object) {
     *       // object is either an object or null
     *     });
     *   (end code)
     */
    getObject: function(path, maxAge) {
      if (typeof(path) !== 'string') {
        return promising().reject('Argument \'path\' of baseClient.getObject must be a string');
      }
      return this.storage.get(this.makePath(path), maxAge).then(function(status, body, mimeType, revision) {
        if (typeof(body) === 'object') { // will be the case for documents stored with rs.js <= 0.10.0-beta2
          return body;
        } else if (typeof(body) === 'string') {
          try {
            return JSON.parse(body);
          } catch (e) {
            throw "Not valid JSON: " + this.makePath(path);
          }
        } else if (typeof(body) !== 'undefined' && status === 200) {
          throw "Not an object: " + this.makePath(path);
        }
      });
    },

    /**
     * Method: storeObject
     *
     * Store object at given path. Triggers synchronization.
     *
     * Parameters:
     *
     *   type     - unique type of this object within this module. See description below.
     *   path     - path relative to the module root.
     *   object   - an object to be saved to the given node. It must be serializable as JSON.
     *
     * Returns:
     *   A promise to store the object. The promise fails with a ValidationError, when validations fail.
     *
     *
     * What about the type?:
     *
     *   A great thing about having data on the web, is to be able to link to
     *   it and rearrange it to fit the current circumstances. To facilitate
     *   that, eventually you need to know how the data at hand is structured.
     *   For documents on the web, this is usually done via a MIME type. The
     *   MIME type of JSON objects however, is always application/json.
     *   To add that extra layer of "knowing what this object is", remoteStorage
     *   aims to use <JSON-LD at http://json-ld.org/>.
     *   A first step in that direction, is to add a *@context attribute* to all
     *   JSON data put into remoteStorage.
     *   Now that is what the *type* is for.
     *
     *   Within remoteStorage.js, @context values are built using three components:
     *     http://remotestorage.io/spec/modules/ - A prefix to guarantee uniqueness
     *     the module name     - module names should be unique as well
     *     the type given here - naming this particular kind of object within this module
     *
     *   In retrospect that means, that whenever you introduce a new "type" in calls to
     *   storeObject, you should make sure that once your code is in the wild, future
     *   versions of the code are compatible with the same JSON structure.
     *
     * How to define types?:
     *
     *   See <declareType> for examples.
     */
    storeObject: function(typeAlias, path, object) {
      if (typeof(typeAlias) !== 'string') {
        return promising().reject('Argument \'typeAlias\' of baseClient.storeObject must be a string');
      }
      if (typeof(path) !== 'string') {
        return promising().reject('Argument \'path\' of baseClient.storeObject must be a string');
      }
      if (typeof(object) !== 'object') {
        return promising().reject('Argument \'object\' of baseClient.storeObject must be an object');
      }

      this._attachType(object, typeAlias);

      try {
        var validationResult = this.validate(object);
        if (! validationResult.valid) {
          return promising(function(p) { p.reject(validationResult); });
        }
      } catch(exc) {
        return promising().reject(exc);
      }

      return this.storage.put(this.makePath(path), JSON.stringify(object), 'application/json; charset=UTF-8').then(function(status, _body, _mimeType, revision) {
        if (status === 200 || status === 201) {
          return revision;
        } else {
          throw "Request (PUT " + this.makePath(path) + ") failed with status: " + status;
        }
      }.bind(this));
    },

    // generic operations

    /**
     * Method: remove
     *
     * Remove node at given path from storage. Triggers synchronization.
     *
     * Parameters:
     *   path     - Path relative to the module root.
     */
    remove: function(path) {
      if (typeof(path) !== 'string') {
        return promising().reject('Argument \'path\' of baseClient.remove must be a string');
      }
      if (!this.storage.access.checkPathPermission(this.makePath(path), 'rw')) {
        console.warn('WARNING: Removing a document to which only read access (\'r\') was claimed');
      }

      return this.storage.delete(this.makePath(path));
    },


    cache: function(path, strategy) {
      if (typeof(path) !== 'string') {
        throw 'Argument \'path\' of baseClient.cache must be a string';
      }
      if (strategy === false) {
        deprecate('caching strategy <false>', '<"FLUSH">');
        strategy = 'FLUSH';
      } else if (strategy === undefined) {
        strategy = 'ALL';
      } else if (typeof(strategy) !== 'string') {
        deprecate('that caching strategy', '<"ALL">');
        strategy = 'ALL';
      }
      if (strategy !== 'FLUSH' &&
          strategy !== 'SEEN' &&
          strategy !== 'ALL') {
        throw 'Argument \'strategy\' of baseclient.cache must be one of '
            + '["FLUSH", "SEEN", "ALL"]';
      }
      this.storage.caching.set(this.makePath(path), strategy);
      return this;
    },

    flush: function(path) {
      return this.storage.local.flush(path);
    },

    makePath: function(path) {
      return this.base + (path || '');
    },

    _fireChange: function(event) {
      if (RemoteStorage.config.changeEvents[event.origin]) {
        ['new', 'old', 'lastCommon'].forEach(function(fieldNamePrefix) {
          if ((!event[fieldNamePrefix+'ContentType'])
              || (/^application\/(.*)json(.*)/.exec(event[fieldNamePrefix+'ContentType']))) {
            if (typeof(event[fieldNamePrefix+'Value']) === 'string') {
              try {
                event[fieldNamePrefix+'Value'] = JSON.parse(event[fieldNamePrefix+'Value']);
              } catch(e) {
              }
            }
          }
        });
        this._emit('change', event);
      }
    },

    _cleanPath: RS.WireClient.cleanPath,

    /**
     * Method: getItemURL
     *
     * Retrieve full URL of item
     *
     * Parameters:
     *   path     - Path relative to the module root.
     */
    getItemURL: function(path) {
      if (typeof(path) !== 'string') {
        throw 'Argument \'path\' of baseClient.getItemURL must be a string';
      }
      if (this.storage.connected) {
        path = this._cleanPath( this.makePath(path) );
        return this.storage.remote.href + path;
      } else {
        return undefined;
      }
    },

    uuid: function() {
      return Math.uuid();
    }

  };

  /**
   * Method: RS#scope
   *
   * Returns a new <RS.BaseClient> scoped to the given path.
   *
   * Parameters:
   *   path - Root path of new BaseClient.
   *
   *
   * Example:
   *   (start code)
   *
   *   var foo = remoteStorage.scope('/foo/');
   *
   *   // PUTs data "baz" to path /foo/bar
   *   foo.storeFile('text/plain', 'bar', 'baz');
   *
   *   var something = foo.scope('something/');
   *
   *   // GETs listing from path /foo/something/bla/
   *   something.getListing('bla/');
   *
   *   (end code)
   *
   */
  RS.BaseClient._rs_init = function() {
    RS.prototype.scope = function(path) {
      if (typeof(path) !== 'string') {
        throw 'Argument \'path\' of baseClient.scope must be a string';
      }

      if (!this.access.checkPathPermission(path, 'r')) {
        var escapedPath = path.replace(/(['\\])/g, '\\$1');
        console.warn('WARNING: please call remoteStorage.access.claim(\'' + escapedPath + '\', \'r\') (read only) or remoteStorage.access.claim(\'' + escapedPath + '\', \'rw\') (read/write) first');
      }
      return new RS.BaseClient(this, path);
    };
  };

  /* e.g.:
  remoteStorage.defineModule('locations', function(priv, pub) {
    return {
      exports: {
        features: priv.scope('features/').defaultType('feature'),
        collections: priv.scope('collections/').defaultType('feature-collection');
      }
    };
  });
  */

  // Defined in baseclient/types.js
  /**
   * Method: declareType
   *
   * Declare a remoteStorage object type using a JSON schema. See
   * <RemoteStorage.BaseClient.Types>
   **/

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/baseclient/types.js **/
(function(global) {

  /**
   * Class: RemoteStorage.BaseClient.Types
   *
   * - Manages and validates types of remoteStorage objects, using JSON-LD and
   *   JSON Schema
   * - Adds schema declaration/validation methods to BaseClient instances.
   **/
  RemoteStorage.BaseClient.Types = {
    // <alias> -> <uri>
    uris: {},
    // <uri> -> <schema>
    schemas: {},
    // <uri> -> <alias>
    aliases: {},

    declare: function(moduleName, alias, uri, schema) {
      var fullAlias = moduleName + '/' + alias;

      if (schema.extends) {
        var extendedAlias;
        var parts = schema.extends.split('/');
        if (parts.length === 1) {
          extendedAlias = moduleName + '/' + parts.shift();
        } else {
          extendedAlias = parts.join('/');
        }
        var extendedUri = this.uris[extendedAlias];
        if (! extendedUri) {
          throw "Type '" + fullAlias + "' tries to extend unknown schema '" + extendedAlias + "'";
        }
        schema.extends = this.schemas[extendedUri];
      }

      this.uris[fullAlias] = uri;
      this.aliases[uri] = fullAlias;
      this.schemas[uri] = schema;
    },

    resolveAlias: function(alias) {
      return this.uris[alias];
    },

    getSchema: function(uri) {
      return this.schemas[uri];
    },

    inScope: function(moduleName) {
      var ml = moduleName.length;
      var schemas = {};
      for (var alias in this.uris) {
        if (alias.substr(0, ml + 1) === moduleName + '/') {
          var uri = this.uris[alias];
          schemas[uri] = this.schemas[uri];
        }
      }
      return schemas;
    }
  };

  var SchemaNotFound = function(uri) {
    var error = new Error("Schema not found: " + uri);
    error.name = "SchemaNotFound";
    return error;
  };

  SchemaNotFound.prototype = Error.prototype;

  RemoteStorage.BaseClient.Types.SchemaNotFound = SchemaNotFound;

  /**
   * Class: RemoteStorage.BaseClient
   **/
  RemoteStorage.BaseClient.prototype.extend({
    /**
     * Method: declareType
     *
     * Declare a remoteStorage object type using a JSON schema.
     *
     * Parameters:
     *   alias  - A type alias/shortname
     *   uri    - (optional) JSON-LD URI of the schema. Automatically generated if none given
     *   schema - A JSON Schema object describing the object type
     *
     * Example:
     *
     * (start code)
     * client.declareType('todo-item', {
     *   "type": "object",
     *   "properties": {
     *     "id": {
     *       "type": "string"
     *     },
     *     "title": {
     *       "type": "string"
     *     },
     *     "finished": {
     *       "type": "boolean"
     *       "default": false
     *     },
     *     "createdAt": {
     *       "type": "date"
     *     }
     *   },
     *   "required": ["id", "title"]
     * })
     * (end code)
     *
     * Visit <http://json-schema.org> for details on how to use JSON Schema.
     **/
    declareType: function(alias, uri, schema) {
      if (! schema) {
        schema = uri;
        uri = this._defaultTypeURI(alias);
      }
      RemoteStorage.BaseClient.Types.declare(this.moduleName, alias, uri, schema);
    },

    /**
     * Method: validate
     *
     * Validate an object against the associated schema.
     *
     * Parameters:
     *  object - Object to validate. Must have a @context property.
     *
     * Returns:
     *   An object containing information about validation errors
     **/
    validate: function(object) {
      var schema = RemoteStorage.BaseClient.Types.getSchema(object['@context']);
      if (schema) {
        return tv4.validateResult(object, schema);
      } else {
        throw new SchemaNotFound(object['@context']);
      }
    },

    _defaultTypeURI: function(alias) {
      return 'http://remotestorage.io/spec/modules/' + encodeURIComponent(this.moduleName) + '/' + encodeURIComponent(alias);
    },

    _attachType: function(object, alias) {
      object['@context'] = RemoteStorage.BaseClient.Types.resolveAlias(this.moduleName + '/' + alias) || this._defaultTypeURI(alias);
    }
  });

  // Documented in baseclient.js
  Object.defineProperty(RemoteStorage.BaseClient.prototype, 'schemas', {
    configurable: true,
    get: function() {
      return RemoteStorage.BaseClient.Types.inScope(this.moduleName);
    }
  });

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/modules.js **/
(function() {

  RemoteStorage.MODULES = {};

  /*
   * Method: RemoteStorage.defineModule
   *
   * Method for defining a new remoteStorage data module
   *
   * Parameters:
   *   moduleName - Name of the module
   *   builder    - Builder function defining the module
   *
   * The module builder function should return an object containing another
   * object called exports, which will be exported to any <RemoteStorage>
   * instance under the module's name. So when defining a locations module,
   * like in the example below, it would be accessible via
   * `remoteStorage.locations`, which would in turn have a `features` and a
   * `collections` property.
   *
   * The function receives a private and a public client, which are both
   * instances of <RemoteStorage.BaseClient>. In the following example, the
   * scope of privateClient is `/locations` and the scope of publicClient is
   * `/public/locations`.
   *
   * Example:
   *   (start code)
   *   RemoteStorage.defineModule('locations', function(privateClient, publicClient) {
   *     return {
   *       exports: {
   *         features: privateClient.scope('features/').defaultType('feature'),
   *         collections: privateClient.scope('collections/').defaultType('feature-collection')
   *       }
   *     };
   *   });
   * (end code)
  */

  RemoteStorage.defineModule = function(moduleName, builder) {
    RemoteStorage.MODULES[moduleName] = builder;

    Object.defineProperty(RemoteStorage.prototype, moduleName, {
      configurable: true,
      get: function() {
        var instance = this._loadModule(moduleName);
        Object.defineProperty(this, moduleName, {
          value: instance
        });
        return instance;
      }
    });

    if (moduleName.indexOf('-') !== -1) {
      var camelizedName = moduleName.replace(/\-[a-z]/g, function(s) {
        return s[1].toUpperCase();
      });
      Object.defineProperty(RemoteStorage.prototype, camelizedName, {
        get: function() {
          return this[moduleName];
        }
      });
    }
  };

  RemoteStorage.prototype._loadModule = function(moduleName) {
    var builder = RemoteStorage.MODULES[moduleName];
    if (builder) {
      var module = builder(new RemoteStorage.BaseClient(this, '/' + moduleName + '/'),
                           new RemoteStorage.BaseClient(this, '/public/' + moduleName + '/'));
      return module.exports;
    } else {
      throw "Unknown module: " + moduleName;
    }
  };

  RemoteStorage.prototype.defineModule = function(moduleName) {
    console.log("remoteStorage.defineModule is deprecated, use RemoteStorage.defineModule instead!");
    RemoteStorage.defineModule.apply(RemoteStorage, arguments);
  };

})();


/** FILE: src/debug/inspect.js **/
(function() {
  function loadTable(table, storage, paths) {
    table.setAttribute('border', '1');
    table.style.margin = '8px';
    table.style.color = 'white';
    table.innerHTML = '';
    var thead = document.createElement('thead');
    table.appendChild(thead);
    var titleRow = document.createElement('tr');
    thead.appendChild(titleRow);
    ['Path', 'Content-Type', 'Revision'].forEach(function(label) {
      var th = document.createElement('th');
      th.textContent = label;
      thead.appendChild(th);
    });

    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    function renderRow(tr, path, contentType, revision) {
      [path, contentType, revision].forEach(function(value) {
        var td = document.createElement('td');
        td.textContent = value || '';
        tr.appendChild(td);
      });
    }

    function loadRow(path) {
      if (storage.connected === false) { return; }
      function processRow(status, body, contentType, revision) {
        if (status === 200) {
          var tr = document.createElement('tr');
          tbody.appendChild(tr);
          renderRow(tr, path, contentType, revision);
          if (path[path.length - 1] === '/') {
            for (var key in body) {
              loadRow(path + key);
            }
          }
        }
      }
      storage.get(path).then(processRow);
    }

    paths.forEach(loadRow);
  }

  function renderWrapper(title, table, storage, paths) {
    var wrapper = document.createElement('div');
    //wrapper.style.display = 'inline-block';
    var heading = document.createElement('h2');
    heading.textContent = title;
    wrapper.appendChild(heading);
    var updateButton = document.createElement('button');
    updateButton.textContent = "Refresh";
    updateButton.onclick = function() { loadTable(table, storage, paths); };
    wrapper.appendChild(updateButton);
    if (storage.reset) {
      var resetButton = document.createElement('button');
      resetButton.textContent = "Reset";
      resetButton.onclick = function() {
        storage.reset(function(newStorage) {
          storage = newStorage;
          loadTable(table, storage, paths);
        });
      };
      wrapper.appendChild(resetButton);
    }
    wrapper.appendChild(table);
    loadTable(table, storage, paths);
    return wrapper;
  }

  function renderLocalChanges(local) {
    var wrapper = document.createElement('div');
    //wrapper.style.display = 'inline-block';
    var heading = document.createElement('h2');
    heading.textContent = "Outgoing changes";
    wrapper.appendChild(heading);
    var updateButton = document.createElement('button');
    updateButton.textContent = "Refresh";
    wrapper.appendChild(updateButton);
    var list = document.createElement('ul');
    list.style.fontFamily = 'courier';
    wrapper.appendChild(list);

    function updateList() {
      list.innerHTML = '';
      local.forAllNodes(function(node) {
        if (node.local && node.local.body) {
          var el = document.createElement('li');
          el.textContent = JSON.stringify(node.local);
          list.appendChild(el);
        }
      });
    }

    updateButton.onclick = updateList;
    updateList();
    return wrapper;
  }

  RemoteStorage.prototype.inspect = function() {

    var widget = document.createElement('div');
    widget.id = 'remotestorage-inspect';
    widget.style.position = 'absolute';
    widget.style.top = 0;
    widget.style.left = 0;
    widget.style.background = 'black';
    widget.style.color = 'white';
    widget.style.border = 'groove 5px #ccc';

    var controls = document.createElement('div');
    controls.style.position = 'absolute';
    controls.style.top = 0;
    controls.style.left = 0;

    var heading = document.createElement('strong');
    heading.textContent = " remotestorage.js inspector ";

    controls.appendChild(heading);

    var syncButton;

    if (this.local) {
      syncButton = document.createElement('button');
      syncButton.textContent = "Synchronize";
      controls.appendChild(syncButton);
    }

    var closeButton = document.createElement('button');
    closeButton.textContent = "Close";
    closeButton.onclick = function() {
      document.body.removeChild(widget);
    };
    controls.appendChild(closeButton);

    widget.appendChild(controls);

    var remoteRootPaths = [];
    for (var path in this.caching._rootPaths) {
      if (this.caching._rootPaths.hasOwnProperty(path)) {
        remoteRootPaths.push(path);
      }
    }

    var remoteTable = document.createElement('table');
    var localTable = document.createElement('table');
    widget.appendChild(renderWrapper("Remote", remoteTable, this.remote, remoteRootPaths));
    if (this.local) {
      widget.appendChild(renderWrapper("Local", localTable, this.local, ['/']));
      widget.appendChild(renderLocalChanges(this.local));

      syncButton.onclick = function() {
        this.log('sync clicked');
        this.sync.sync().then(function() {
          this.log('SYNC FINISHED');
          loadTable(localTable, this.local, ['/']);
        }.bind(this), function(err) {
          console.error("SYNC FAILED", err, err.stack);
        });
      }.bind(this);
    }

    document.body.appendChild(widget);
  };
})();


/** FILE: src/legacy.js **/
(function() {
  var util = {
    getEventEmitter: function() {
      var object = {};
      var args = Array.prototype.slice.call(arguments);
      args.unshift(object);
      RemoteStorage.eventHandling.apply(RemoteStorage, args);
      object.emit = object._emit;
      return object;
    },

    extend: function(target) {
      var sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function(source) {
        for (var key in source) {
          target[key] = source[key];
        }
      });
      return target;
    },

    asyncEach: function(array, callback) {
      return this.asyncMap(array, callback).
        then(function() { return array; });
    },

    asyncMap: function(array, callback) {
      var promise = promising();
      var n = array.length, i = 0;
      var results = [], errors = [];
      function oneDone() {
        i++;
        if (i === n) {
          promise.fulfill(results, errors);
        }
      }

      array.forEach(function(item, index) {
        var result;
        try {
          result = callback(item);
        } catch(exc) {
          oneDone();
          errors[index] = exc;
        }
        if (typeof(result) === 'object' && typeof(result.then) === 'function') {
          result.then(function(res) { results[index] = res; oneDone(); },
                      function(error) { errors[index] = error; oneDone(); });
        } else {
          oneDone();
          results[index] = result;
        }
      });

      return promise;
    },

    containingFolder: function(path) {
      var folder = path.replace(/[^\/]+\/?$/, '');
      return folder === path ? null : folder;
    },

    isFolder: function(path) {
      return path.substr(-1) === '/';
    },

    baseName: function(path) {
      var parts = path.split('/');
      if (util.isFolder(path)) {
        return parts[parts.length-2]+'/';
      } else {
        return parts[parts.length-1];
      }
    },

    bindAll: function(object) {
      for (var key in this) {
        if (typeof(object[key]) === 'function') {
          object[key] = object[key].bind(object);
        }
      }
    }
  };

  Object.defineProperty(RemoteStorage.prototype, 'util', {
    get: function() {
      console.log("DEPRECATION WARNING: remoteStorage.util is deprecated and will be removed with the next major release.");
      return util;
    }
  });

})();


/** FILE: src/googledrive.js **/
(function(global) {
  /**
   * Class: RemoteStorage.GoogleDrive
   *
   * WORK IN PROGRESS, NOT RECOMMENDED FOR PRODUCTION USE
   **/

  var RS = RemoteStorage;

  var BASE_URL = 'https://www.googleapis.com';
  var AUTH_URL = 'https://accounts.google.com/o/oauth2/auth';
  var AUTH_SCOPE = 'https://www.googleapis.com/auth/drive';

  var GD_DIR_MIME_TYPE = 'application/vnd.google-apps.folder';
  var RS_DIR_MIME_TYPE = 'application/json; charset=UTF-8';

  function buildQueryString(params) {
    return Object.keys(params).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }

  function fileNameFromMeta(meta) {
    return encodeURIComponent(meta.title) + (meta.mimeType === GD_DIR_MIME_TYPE ? '/' : '');
  }

  function metaTitleFromFileName(filename) {
    if (filename.substr(-1) === '/') {
      filename = filename.substr(0, filename.length - 1);
    }
    return decodeURIComponent(filename);
  }

  function parentPath(path) {
    return path.replace(/[^\/]+\/?$/, '');
  }

  function baseName(path) {
    var parts = path.split('/');
    if (path.substr(-1) === '/') {
      return parts[parts.length-2]+'/';
    } else {
      return parts[parts.length-1];
    }
  }

  var Cache = function(maxAge) {
    this.maxAge = maxAge;
    this._items = {};
  };

  Cache.prototype = {
    get: function(key) {
      var item = this._items[key];
      var now = new Date().getTime();
      return (item && item.t >= (now - this.maxAge)) ? item.v : undefined;
    },

    set: function(key, value) {
      this._items[key] = {
        v: value,
        t: new Date().getTime()
      };
    }
  };

  RS.GoogleDrive = function(remoteStorage, clientId) {

    RS.eventHandling(this, 'change', 'connected', 'wire-busy', 'wire-done', 'not-connected');

    this.rs = remoteStorage;
    this.clientId = clientId;

    this._fileIdCache = new Cache(60 * 5); // ids expire after 5 minutes (is this a good idea?)
  };

  RS.GoogleDrive.prototype = {
    connected: false,
    online: true,

    configure: function(_x, _y, _z, token) { // parameter list compatible with WireClient
      if (token) {
        localStorage['remotestorage:googledrive:token'] = token;
        this.token = token;
        this.connected = true;
        this._emit('connected');
      } else {
        this.connected = false;
        delete this.token;
        delete localStorage['remotestorage:googledrive:token'];
      }
    },

    connect: function() {
      this.rs.setBackend('googledrive');
      RS.Authorize(AUTH_URL, AUTH_SCOPE, String(RS.Authorize.getLocation()), this.clientId);
    },

    stopWaitingForToken: function() {
      if (!this.connected) {
        this._emit('not-connected');
      }
    },

    get: function(path, options) {
      if (path.substr(-1) === '/') {
        return this._getFolder(path, options);
      } else {
        return this._getFile(path, options);
      }
    },

    put: function(path, body, contentType, options) {
      var promise = promising();
      function putDone(error, response) {
        if (error) {
          promise.reject(error);
        } else if (response.status >= 200 && response.status < 300) {
          var meta = JSON.parse(response.responseText);
          var etagWithoutQuotes = meta.etag.substring(1, meta.etag.length-1);
          promise.fulfill(200, undefined, meta.mimeType, etagWithoutQuotes);
        } else if (response.status === 412) {
          promise.fulfill(412, undefined, undefined, 'conflict');
        } else {
          promise.reject("PUT failed with status " + response.status + " (" + response.responseText + ")");
        }
      }
      this._getFileId(path, function(idError, id) {
        if (idError) {
          promise.reject(idError);
          return;
        } else if (id) {
          if (options && (options.ifNoneMatch === '*')) {
            putDone(undefined, { status: 412 });
            return;
          }
          this._updateFile(id, path, body, contentType, options, putDone);
        } else {
          this._createFile(path, body, contentType, options, putDone);
        }
      });
      return promise;
    },

    'delete': function(path, options) {
      var promise = promising();
      this._getFileId(path, function(idError, id) {
        if (idError) {
          promise.reject(idError);
          return;
        } else if (!id) {
          // File doesn't exist. Ignore.
          promise.fulfill(200);
          return;
        }

        this._getMeta(id, function(metaError, meta) {
          var etagWithoutQuotes;
          if ((typeof meta === 'object') && (typeof meta.etag === 'string')) {
            etagWithoutQuotes = meta.etag.substring(1, meta.etag.length-1);
          }
          if (options && options.ifMatch && (options.ifMatch !== etagWithoutQuotes)) {
            promise.fulfill(412, undefined, undefined, etagWithoutQuotes);
            return;
          }
          if (metaError) {
            promise.reject(metaError);
            return;
          }

          this._request('DELETE', BASE_URL + '/drive/v2/files/' + id, {}, function(deleteError, response) {
            if (deleteError) {
              promise.reject(deleteError);
            } else if (response.status === 200 || response.status === 204) {
              promise.fulfill(200);
            } else {
              promise.reject("Delete failed: " + response.status + " (" + response.responseText + ")");
            }
          });
        });
      });
      return promise;
    },

    _updateFile: function(id, path, body, contentType, options, callback) {
      callback = callback.bind(this);
      var metadata = {
        mimeType: contentType
      };
      var headers = {
        'Content-Type': 'application/json; charset=UTF-8'
      };

      if (options && options.ifMatch) {
        headers['If-Match'] = '"' + options.ifMatch + '"';
      }

      this._request('PUT', BASE_URL + '/upload/drive/v2/files/' + id + '?uploadType=resumable', {
        body: JSON.stringify(metadata),
        headers: headers
      }, function(metadataError, response) {
        if (response.status === 412) {
          callback(undefined, response);
        } else if (metadataError) {
          callback(metadataError);
        } else {
          this._request('PUT', response.getResponseHeader('Location'), {
            body: contentType.match(/^application\/json/) ? JSON.stringify(body) : body
          }, callback);
        }
      });
    },

    _createFile: function(path, body, contentType, options, callback) {
      callback = callback.bind(this);
      this._getParentId(path, function(parentIdError, parentId) {
        if (parentIdError) {
          callback(parentIdError);
          return;
        }
        var fileName = baseName(path);
        var metadata = {
          title: metaTitleFromFileName(fileName),
          mimeType: contentType,
          parents: [{
            kind: "drive#fileLink",
            id: parentId
          }]
        };
        this._request('POST', BASE_URL + '/upload/drive/v2/files?uploadType=resumable', {
          body: JSON.stringify(metadata),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }, function(metadataError, response) {
          if (metadataError) {
            callback(metadataError);
          } else {
            this._request('POST', response.getResponseHeader('Location'), {
              body: contentType.match(/^application\/json/) ? JSON.stringify(body) : body
            }, callback);
          }
        });
      });
    },

    _getFile: function(path, options) {
      var promise = promising();
      this._getFileId(path, function(idError, id) {
        if (idError) {
          promise.reject(idError);
        } else {
          this._getMeta(id, function(metaError, meta) {
            var etagWithoutQuotes;
            if (typeof(meta) === 'object' && typeof(meta.etag) === 'string') {
              etagWithoutQuotes = meta.etag.substring(1, meta.etag.length-1);
            }
            if (metaError) {
              promise.reject(metaError);
            } else {
              if (options && options.ifNoneMatch && (etagWithoutQuotes == options.ifNoneMatch)) {
                promise.fulfill(304);
                return;
              }

              var options2 = {};
              if (!meta.downloadUrl) {
                if(meta.exportLinks && meta.exportLinks['text/html']) {
                  // Documents that were generated inside GoogleDocs have no
                  // downloadUrl, but you can export them to text/html instead:
                  meta.mimeType += ';export=text/html';
                  meta.downloadUrl = meta.exportLinks['text/html'];
                } else {
                  // empty file
                  promise.fulfill(200, '', meta.mimeType, etagWithoutQuotes);
                  return;
                }
              }
              if (meta.mimeType.match(/charset=binary/)) {
                options2.responseType = 'blob';
              }
              this._request('GET', meta.downloadUrl, options2, function(downloadError, response) {
                if (downloadError) {
                  promise.reject(downloadError);
                } else {
                  var body = response.response;
                  if (meta.mimeType.match(/^application\/json/)) {
                    try {
                      body = JSON.parse(body);
                    } catch(e) {}
                  }
                  promise.fulfill(200, body, meta.mimeType, etagWithoutQuotes);
                }
              });
            }
          });
        }
      });
      return promise;
    },

    _getFolder: function(path, options) {
      var promise = promising();
      this._getFileId(path, function(idError, id) {
        var query, fields, data, i, etagWithoutQuotes, itemsMap;
        if (idError) {
          promise.reject(idError);
        } else if (! id) {
          promise.fulfill(404);
        } else {
          query = '\'' + id + '\' in parents';
          fields = 'items(downloadUrl,etag,fileSize,id,mimeType,title)';
          this._request('GET', BASE_URL + '/drive/v2/files?'
              + 'q=' + encodeURIComponent(query)
              + '&fields=' + encodeURIComponent(fields)
              + '&maxResults=1000',
              {}, function(childrenError, response) {
            if (childrenError) {
              promise.reject(childrenError);
            } else {
              if (response.status === 200) {
                try {
                  data = JSON.parse(response.responseText);
                } catch(e) {
                  promise.reject('non-JSON response from GoogleDrive');
                  return;
                }
                itemsMap = {};
                for(i=0; i<data.items.length; i++) {
                  etagWithoutQuotes = data.items[i].etag.substring(1, data.items[i].etag.length-1);
                  if (data.items[i].mimeType === GD_DIR_MIME_TYPE) {
                    this._fileIdCache.set(path + data.items[i].title + '/', data.items[i].id);
                    itemsMap[data.items[i].title + '/'] = {
                      ETag: etagWithoutQuotes
                    };
                  } else {
                    this._fileIdCache.set(path + data.items[i].title, data.items[i].id);
                    itemsMap[data.items[i].title] = {
                      ETag: etagWithoutQuotes,
                      'Content-Type': data.items[i].mimeType,
                      'Content-Length': data.items[i].fileSize
                    };
                  }
                }
                // FIXME: add revision of folder!
                promise.fulfill(200, itemsMap, RS_DIR_MIME_TYPE, undefined);
              } else {
                promise.reject('request failed or something: ' + response.status);
              }
            }
          });
        }
      });
      return promise;
    },

    _getParentId: function(path, callback) {
      callback = callback.bind(this);
      var foldername = parentPath(path);
      this._getFileId(foldername, function(idError, parentId) {
        if (idError) {
          callback(idError);
        } else if (parentId) {
          callback(null, parentId);
        } else {
          this._createFolder(foldername, callback);
        }
      });
    },

    _createFolder: function(path, callback) {
      callback = callback.bind(this);
      this._getParentId(path, function(idError, parentId) {
        if (idError) {
          callback(idError);
        } else {
          this._request('POST', BASE_URL + '/drive/v2/files', {
            body: JSON.stringify({
              title: metaTitleFromFileName(baseName(path)),
              mimeType: GD_DIR_MIME_TYPE,
              parents: [{
                id: parentId
              }]
            }),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          }, function(createError, response) {
            if (createError) {
              callback(createError);
            } else {
              var meta = JSON.parse(response.responseText);
              callback(null, meta.id);
            }
          });
        }
      });
    },

    _getFileId: function(path, callback) {
      callback = callback.bind(this);
      var id;
      if (path === '/') {
        // "root" is a special alias for the fileId of the root folder
        callback(null, 'root');
      } else if ((id = this._fileIdCache.get(path))) {
        // id is cached.
        callback(null, id);
      } else {
        // id is not cached (or file doesn't exist).
        // load parent folder listing to propagate / update id cache.
        this._getFolder(parentPath(path)).then(function() {
          var id = this._fileIdCache.get(path);
          if (!id) {
            if (path.substr(-1) === '/') {
              this._createFolder(path, function() {
                this._getFileId(path, callback);
              }.bind(this));
            } else {
              callback(null, null);
            }
            return;
          }
          callback(null, id);
        }.bind(this), callback);
      }
    },

    _getMeta: function(id, callback) {
      callback = callback.bind(this);
      this._request('GET', BASE_URL + '/drive/v2/files/' + id, {}, function(err, response) {
        if (err) {
          callback(err);
        } else {
          if (response.status === 200) {
            callback(null, JSON.parse(response.responseText));
          } else {
            callback("request (getting metadata for " + id + ") failed with status: " + response.status);
          }
        }
      });
    },

    _request: function(method, url, options, callback) {
      callback = callback.bind(this);
      if (! options.headers) { options.headers = {}; }
      options.headers['Authorization'] = 'Bearer ' + this.token;
      RS.WireClient.request.call(this, method, url, options, function(err, xhr) {
        // google tokens expire from time to time...
        if (xhr && xhr.status === 401) {
          this.connect();
          return;
        }
        callback(err, xhr);
      });
    }
  };

  RS.GoogleDrive._rs_init = function(remoteStorage) {
    var config = remoteStorage.apiKeys.googledrive;
    if (config) {
      remoteStorage.googledrive = new RS.GoogleDrive(remoteStorage, config.client_id);
      if (remoteStorage.backend === 'googledrive') {
        remoteStorage._origRemote = remoteStorage.remote;
        remoteStorage.remote = remoteStorage.googledrive;
      }
    }
  };

  RS.GoogleDrive._rs_supported = function(rs){
    return true;
  };

  RS.GoogleDrive._rs_cleanup = function(remoteStorage) {
    remoteStorage.setBackend(undefined);
    if (remoteStorage._origRemote) {
      remoteStorage.remote = remoteStorage._origRemote;
      delete remoteStorage._origRemote;
    }
  };

})(this);


/** FILE: src/dropbox.js **/
(function(global) {
  var RS = RemoteStorage;
  // next steps :
  //  features:
  // handle fetchDelta has_more
  // handle files larger than 150MB
  //
  //  testing:
  // add to remotestorage browser
  // add to sharedy
  // maybe write tests for remote
  //


  /**
   * Class: RemoteStorage.Dropbox
   *
   * WORK IN PROGRESS, NOT RECOMMENDED FOR PRODUCTION USE
   *
   * Dropbox backend for RemoteStorage.js
   * this file exposes a get/put/delete interface which is compatible with the wireclient
   * it requires to get configured with a dropbox token similar to the wireclient.configure
   *
   * when the remotestorage.backend was set to 'dropbox' it will initialize and resets
   * remoteStorage.remote with remoteStorage.dropbox
   *
   * for compability with the public folder the getItemURL function of the BaseClient gets
   * highjackt and returns the dropbox share-url
   *
   * to connect with dropbox a connect function is provided
   *
   * known issues :
   *   files larger than 150mb are not suported for upload
   *   folders with more than 10.000 files will cause problems to list
   *   content-type is guessed by dropbox.com therefore they aren't fully supported
   *   dropbox preserves cases but not case sensitive
   *   share_urls and therfeor getItemURL is asynchronius , which means
   *     getItemURL returns usefull values after the syncCycle
   **/
  var hasLocalStorage;
  var AUTH_URL = 'https://www.dropbox.com/1/oauth2/authorize';
  var SETTINGS_KEY = 'remotestorage:dropbox';
  var cleanPath = RS.WireClient.cleanPath;

  /*************************
   * LowerCaseCache
   * this Cache will lowercase its keys
   * and can propagate the values to "upper folders"
   *
   * intialized with default Value(undefined will be accepted)
   *
   * set and delete will be set to justSet and justDelete on initialization
   *
   * get : get a value or default Value
   * set : set a value
   * justSet : just set a value and don't propagate at all
   * propagateSet : Set a value and propagate
   * delete : delete
   * justDelete : just delete a value and don't propagate at al
   * propagateDelete : deleta a value and propagate
   * _activatePropagation : replace set and delete with their propagate versions
   *************************/
  function LowerCaseCache(defaultValue){
    this.defaultValue = defaultValue; //defaults to undefimned if initialized without arguments
    this._storage = { };
    this.set = this.justSet;
    this.delete = this.justDelete;
  }

  LowerCaseCache.prototype = {
    get : function(key) {
      key = key.toLowerCase();
      var stored = this._storage[key];
      if (typeof stored === 'undefined'){
        stored = this.defaultValue;
        this._storage[key] = stored;
      }
      return stored;
    },
    propagateSet : function(key, value) {
      key = key.toLowerCase();
      if (this._storage[key] === value) {
        return value;
      }
      this._propagate(key, value);
      return this._storage[key] = value;
    },
    propagateDelete : function(key) {
      key = key.toLowerCase();
      this._propagate(key, this._storage[key]);
      return delete this._storage[key];
    },
    _activatePropagation: function(){
      this.set = this.propagateSet;
      this.delete = this.propagateDelete;
      return true;
    },
    justSet : function(key, value) {
      key = key.toLowerCase();
      return this._storage[key] = value;
    },
    justDelete : function(key, value) {
      key = key.toLowerCase();
      return delete this._storage[key];
    },
    _propagate: function(key, rev){
      var folders = key.split('/').slice(0,-1);
      var len = folders.length;
      var path = '';

      for (var i = 0; i < len; i++){
        path += folders[i]+'/';
        if (!rev) {
          rev = this._storage[path]+1;
        }
        this._storage[path] =  rev;
      }
    }
  };

  /****************************
   * Dropbox - Backend for remtoeStorage.js
   * methods :
   * connect
   * configure
   * get
   * put
   * delete
   * share
   * info
   * Properties :
   * connected
   * rs
   * token
   * userAddress
   *****************************/
  var onErrorCb;
  RS.Dropbox = function(rs) {

    this.rs = rs;
    this.connected = false;
    this.rs = rs;
    var self = this;

    onErrorCb = function(error){
      if (error instanceof RemoteStorage.Unauthorized) {
        self.configure(null,null,null,null);
      }
    };

    RS.eventHandling(this, 'change', 'connected', 'wire-busy', 'wire-done', 'not-connected');
    rs.on('error', onErrorCb);

    this.clientId = rs.apiKeys.dropbox.api_key;
    this._revCache = new LowerCaseCache('rev');
    this._itemRefs = {};
    this._metadataCache = {};

    if (hasLocalStorage){
      var settings;
      try {
        settings = JSON.parse(localStorage[SETTINGS_KEY]);
      } catch(e){}
      if (settings) {
        this.configure(settings.userAddress, undefined, undefined, settings.token);
      }
      try {
        this._itemRefs = JSON.parse(localStorage[ SETTINGS_KEY+':shares' ]);
      } catch(e) {  }
    }
    if (this.connected) {
      setTimeout(this._emit.bind(this), 0, 'connected');
    }
  };

  RS.Dropbox.prototype = {
    online: true,

    /**
     * Method : connect()
     *   redirects to AUTH_URL(https://www.dropbox.com/1/oauth2/authorize)
     *   and set's backend to dropbox
     *   therefor it starts the auth flow and end's up with a token and the dropbox backend in place
     **/
    connect: function() {
      //ToDo handling when token is already present
      this.rs.setBackend('dropbox');
      if (this.token){
        hookIt(this.rs);
      } else {
        RS.Authorize(AUTH_URL, '', String(RS.Authorize.getLocation()), this.clientId);
      }
    },
    /**
     * Method : configure(userAdress, x, x, token)
     *   accepts its parameters according to the wireClient
     *   set's the connected flag
     **/
    configure: function(userAddress, href, storageApi, token) {
      if (typeof token !== 'undefined') { this.token = token; }
      if (typeof userAddress !== 'undefined') { this.userAddress = userAddress; }

      if (this.token) {
        this.connected = true;
        if ( !this.userAddress ){
          this.info().then(function(info){
            this.userAddress = info.display_name;
            //FIXME propagate this to the view
          }.bind(this));
        }
        this._emit('connected');
      } else {
        this.connected = false;
      }
      if (hasLocalStorage){
        localStorage[SETTINGS_KEY] = JSON.stringify( { token: this.token,
                                                       userAddress: this.userAddress } );
      }
    },
    
    stopWaitingForToken: function() {
      if (!this.connected) {
        this._emit('not-connected');
      }
    },
    
    /**
     * Method : _getFolder(path, options)
     **/
    _getFolder: function(path, options){
      var url = 'https://api.dropbox.com/1/metadata/auto'+path;
      var promise = promising();
      var revCache = this._revCache;
      this._request('GET', url, {}, function(err, resp){
        if (err){
          promise.reject(err);
        }else{
          var status = resp.status;
          if (status === 304) {
            promise.fulfill(status);
            return;
          }
          var listing, body, mime, rev;
          try{
            body = JSON.parse(resp.responseText);
          } catch(e) {
            promise.reject(e);
            return;
          }
          rev = this._revCache.get(path);
          mime = 'application/json; charset=UTF-8';
          if (body.contents) {
            listing = body.contents.reduce(function(m, item) {
              var itemName = item.path.split('/').slice(-1)[0] + ( item.is_dir ? '/' : '' );
              if (item.is_dir){
                m[itemName] = { ETag: revCache.get(path+itemName) };
              } else {
                m[itemName] = { ETag: item.rev };
              }
              return m;
            }, {});
          }
          promise.fulfill(status, listing, mime, rev);
        }
      });
      return promise;
    },
    /**
     * Method : get(path, options)
     *   get compatible with wireclient
     *   checks for path in _revCache and decides based on that if file has changed
     *   calls _getFolder if file is a folder
     *   calls share(path) afterwards to fill the _hrefCache
     **/
    get: function(path, options){
      if (! this.connected) { throw new Error("not connected (path: " + path + ")"); }
      path = cleanPath(path);
      var url = 'https://api-content.dropbox.com/1/files/auto' + path;
      var promise = this._sharePromise(path);

      var savedRev = this._revCache.get(path);
      if (savedRev === null) {
        //file was deleted server side
        promise.fulfill(404);
        return promise;
      }
      if (options && options.ifNoneMatch &&
         savedRev && (savedRev === options.ifNoneMatch)) {
        // nothing changed.
        promise.fulfill(304);
        return promise;
      }

      //use _getFolder for folders
      if (path.substr(-1) === '/') { return this._getFolder(path, options); }

      this._request('GET', url, {}, function(err, resp){
        if (err) {
          promise.reject(err);
        } else {
          var status = resp.status;
          var meta, body, mime, rev;
          if (status === 200) {
            body = resp.responseText;
            try {
              meta = JSON.parse( resp.getResponseHeader('x-dropbox-metadata') );
            } catch(e) {
              promise.reject(e);
              return;
            }
            mime = meta.mime_type; //resp.getResponseHeader('Content-Type');
            rev = meta.rev;
            this._revCache.set(path, rev);

            // handling binary
            if ((! resp.getResponseHeader('Content-Type') ) || resp.getResponseHeader('Content-Type').match(/charset=binary/)) {
              RS.WireClient.readBinaryData(resp.response, mime, function(result) {
                promise.fulfill(status, result, mime, rev);
              });
            } else {
              // handling json (always try)
              if (mime && mime.search('application/json') >= 0 || true) {
                try {
                  body = JSON.parse(body);
                  mime = 'application/json; charset=UTF-8';
                } catch(e) {
                  //Failed parsing Json, assume it is something else then
                }
              }
              promise.fulfill(status, body, mime, rev);
            }
          } else {
            promise.fulfill(status);
          }
        }
      });
      return promise;
    },
    /**
     * Method : put(path, body, contentType, options)
     *   put compatible with wireclient
     *   also uses _revCache to check for version conflicts
     *   also shares via share(path)
     **/
    put: function(path, body, contentType, options){
      if (! this.connected) { throw new Error("not connected (path: " + path + ")"); }
      var pathTempBeforeClean = path; // Temp variable to store the value beafore cleanPath, to be used later
      path = cleanPath(path);

      var self = this;
      var promise = this._sharePromise(path);
      var revCache = this._revCache;

      //check if file has changed and return 412
      var savedRev = revCache.get(path);
      if (options && options.ifMatch &&
          savedRev && (savedRev !== options.ifMatch)) {
        promise.fulfill(412, undefined, undefined, savedRev);
        return promise;
      }
      if (options && (options.ifNoneMatch === '*') &&
          savedRev && (savedRev !== 'rev')) {
        promise.fulfill(412, undefined, undefined, savedRev);
        return promise;
      }
      if (! contentType.match(/charset=/)) {
        contentType += '; charset=' + ((body instanceof ArrayBuffer || RS.WireClient.isArrayBufferView(body)) ? 'binary' : 'utf-8');
      }
      var url = 'https://api-content.dropbox.com/1/files_put/auto' + path + '?';
      if (options && options.ifMatch) {
        url += "parent_rev="+encodeURIComponent(options.ifMatch);
      }
      if (body.length>150*1024*1024){ //FIXME actual content-length
        //https://www.dropbox.com/developers/core/docs#chunked-upload
        RemoteStorage.log('files larger than 150MB not supported yet');
      } else {
        var promiseMetadata = promising();
        if (options && (options.ifMatch || (options.ifNoneMatch === '*'))) {
          this._getMetadata(pathTempBeforeClean).then(function(metadata) {
            promiseMetadata.fulfill(metadata);
          });
        } else {
          promiseMetadata.fulfill();
        }

        promiseMetadata.then(function(metadata) {
          if (options && (options.ifNoneMatch === '*') && metadata) {
            // if !!metadata === true, the file exists
            promise.fulfill(412, undefined, undefined, metadata.rev);
            return;
          }
          if (options && options.ifMatch && metadata && (metadata.rev !== options.ifMatch)) {
            promise.fulfill(412, undefined, undefined, metadata.rev);
            return;
          }
          self._request('PUT', url, {body:body, headers:{'Content-Type':contentType}}, function(err, resp) {
            if (err) {
              promise.reject(err);
            } else if (resp.status === 200) {
              var response = JSON.parse(resp.responseText);
              if (response.path === pathTempBeforeClean) {
                revCache.propagateSet(path, response.rev);
                promise.fulfill(resp.status);
              } else {
                // Conflict happened. Delete the copy created by Dropbox
                var deleteUrl = 'https://api.dropbox.com/1/fileops/delete?root=auto&path=' + encodeURIComponent(response.path);
                self._request('POST', deleteUrl, {}, function() {});

                // If we got into this situation here, then it means that the
                // file changed between the metadata request and this PUT
                // request. Because of that the previously requested metadata
                // cannot be reused here and a new request has to be made:
                self._getMetadata(path).then(function(metadata) {
                  promise.fulfill(412, undefined, undefined, metadata.rev);
                });
              }
            } else {
              promise.fulfill(resp.status);
            }
          });
        });
      }
      return promise;
    },

    /**
     * Method : delete(path, options)
     *   similar to get and set
     **/
    'delete': function(path, options){
      if (! this.connected) { throw new Error("not connected (path: " + path + ")"); }
      var pathTempBeforeClean = path; // Temp variable to store the value before cleanPath, to be used later
      path = cleanPath(path);

      var self = this;
      var promise = promising();
      var revCache = this._revCache;
      //check if file has changed and return 412
      var savedRev = revCache.get(path);
      if (options && options.ifMatch &&
          savedRev && (options.ifMatch !== savedRev)) {
        promise.fulfill(412, undefined, undefined, savedRev);
        return promise;
      }

      var promiseMetadata = promising();
      if (options && options.ifMatch) {
        this._getMetadata(pathTempBeforeClean).then(function(metadata) {
          promiseMetadata.fulfill(metadata);
        });
      } else {
        promiseMetadata.fulfill();
      }

      promiseMetadata.then(function(metadata) {
        if (options && options.ifMatch && metadata && (metadata.rev !== options.ifMatch)) {
          promise.fulfill(412, undefined, undefined, metadata.rev);
          return;
        }

        var url = 'https://api.dropbox.com/1/fileops/delete?root=auto&path=' + encodeURIComponent(pathTempBeforeClean);
        self._request('POST', url, {}, function(err, resp){
          if (err) {
            promise.reject(error);
          } else {
            if (resp.status === 200) {
              revCache.delete(path);
            }
            promise.fulfill(resp.status);
          }
        });
      });

      return promise.then(function(){
        var args = Array.prototype.slice.call(arguments);
        delete this._itemRefs[path];
        var p = promising();
        return p.fulfill.apply(p, args);
      }.bind(this));
    },

    /**
     * Method : _sharePromise(path)
     *   returns a promise which's then block doesn't touch the arguments given
     *   and calls share for the path
     *
     *  also checks for necessity of shareing this url(already in the itemRefs or not '/public/')
     **/
    _sharePromise: function(path){
      var promise = promising();
      var self = this;
      if (path.match(/^\/public\/.*[^\/]$/) && typeof this._itemRefs[path] === 'undefined') {
        promise.then(function(){
          var args = Array.prototype.slice.call(arguments);
          var p = promising();
          self.share(path).then(function() {
            p.fulfill.apply(p,args);
          }, function(err) {
            p.fulfill.apply(p,args);
          });
          return p;
        });
      }
      return promise;
    },

    /**
     * Method : share(path)
     *   get sher_url s from dropbox and pushes those into this._hrefCache
     *   returns promise
     */
    share: function(path){
      var url = "https://api.dropbox.com/1/media/auto"+path;
      var promise = promising();
      var itemRefs = this._itemRefs;

      // requesting shareing url
      this._request('POST', url, {}, function(err, resp){
        if (err) {
          RemoteStorage.log(err);
          err.message = 'Shareing Dropbox Thingie("'+path+'") failed' + err.message;
          promise.reject(err);
        } else {
          try{
            var response = JSON.parse(resp.responseText);
            var url = response.url;
            itemRefs[path] = url;
            if (hasLocalStorage) {
              localStorage[SETTINGS_KEY+":shares"] = JSON.stringify(this._itemRefs);
            }
            promise.fulfill(url);
          } catch(err) {
            err.message += "share error";
            promise.reject(err);
          }
        }
      });
      return promise;
    },

    /**
     * Method : info()
     *   fetching user info from Dropbox returns promise
     **/
    info: function() {
      var url = 'https://api.dropbox.com/1/account/info';
      var promise = promising();
      // requesting user info(mainly for userAdress)
      this._request('GET', url, {}, function(err, resp){
        if (err) {
          promise.reject(err);
        } else {
          try {
            var info = JSON.parse(resp.responseText);
            promise.fulfill(info);
          } catch(e) {
            promise.reject(err);
          }
        }
      });
      return promise;
    },

    _request: function(method, url, options, callback) {
      callback = callback.bind(this);
      if (! options.headers) { options.headers = {}; }
      options.headers['Authorization'] = 'Bearer ' + this.token;
      RS.WireClient.request.call(this, method, url, options, function(err, xhr) {
        //503 means retry this later
        if (xhr && xhr.status === 503) {
          global.setTimeout(this._request(method, url, options, callback), 3210);
        } else {
          callback(err, xhr);
        }
      });
    },

    /**
    * method: fetchDelta
    *
    *   this method fetches the deltas from the dropbox api, used to sync the storage
    *   here we retrive changes and put them into the _revCache, those values will then be used
    *   to determin if something has changed.
    **/
    fetchDelta: function() {
      var args = Array.prototype.slice.call(arguments);
      var promise = promising();
      var self = this;
      this._request('POST', 'https://api.dropbox.com/1/delta', {
        body: this._deltaCursor ? ('cursor=' + encodeURIComponent(this._deltaCursor)) : '',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }, function(error, response) {
        if (error) {
          this.rs.log('fetchDeltas',error);
          this.rs._emit('error', new RemoteStorage.SyncError('fetchDeltas failed'+error));
          promise.reject(error);
        } else {
          // break if status != 200
          if (response.status !== 200 ) {
            if (response.status === 400) {
              this.rs._emit('error', new RemoteStorage.Unauthorized());
              promise.fulfill.apply(promise, args);
            } else {
              promise.reject("dropbox.fetchDelta returned "+response.status+response.responseText);
            }
            return promise;
          }

          var delta;
          try {
            delta = JSON.parse(response.responseText);
          } catch(error) {
            RS.log('fetchDeltas can not parse response',error);
            return promise.reject("can not parse response of fetchDelta : "+error.message);
          }
          // break if no entries found
          if (!delta.entries) {
            return promise.reject('dropbox.fetchDeltas failed, no entries found');
          }

          // Dropbox sends the complete state
          if (delta.reset) {
            this._revCache = new LowerCaseCache('rev');
            promise.then(function(){
              var args = Array.prototype.slice.call(arguments);
              self._revCache._activatePropagation();
              var p = promising();
              return p.fulfill.apply(p,args);
            });
          }

          //saving the cursor for requesting further deltas in relation to the cursor position
          if (delta.cursor) {
            this._deltaCursor = delta.cursor;
          }

          //updating revCache
          RemoteStorage.log("Delta : ",delta.entries);
          delta.entries.forEach(function(entry) {
            var path = entry[0];
            var rev;
            if (!entry[1]){
              rev = null;
            } else {
              if (entry[1].is_dir) {
                return;
              }
              rev = entry[1].rev;
            }
            self._revCache.set(path, rev);
          });
          promise.fulfill.apply(promise, args);
        }
      });
      return promise;
    },

    _getMetadata: function(path, options) {
      var promise = promising();
      var self = this;
      var cached = this._metadataCache[path];
      var url = 'https://api.dropbox.com/1/metadata/auto' + cleanPath(path);
      url += '?list=' + ((options && options.list) ? 'true' : 'false');
      if (cached && cached.hash) {
        url += '&hash=' + encodeURIComponent(cached.hash);
      }
      this._request('GET', url, {}, function(err, resp) {
        if (err) {
          promise.reject(err);
          return;
        }
        if (resp.status === 304) {
          promise.fulfill(cached);
        } else if (resp.status === 200) {
          var response = JSON.parse(resp.responseText);
          self._metadataCache[path] = response;
          promise.fulfill(response);
        } else {
          // The file doesn't exist
          promise.fulfill();
        }
      });

      return promise;
    }
  };

  //hooking and unhooking the sync

  function hookSync(rs) {
    if (rs._dropboxOrigSync) { return; } // already hooked
    rs._dropboxOrigSync = rs.sync.bind(rs);
    rs.sync = function() {
      return this.dropbox.fetchDelta.apply(this.dropbox, arguments).
        then(rs._dropboxOrigSync, function(err){
          rs._emit('error', new rs.SyncError(err));
        });
    };
  }

  function unHookSync(rs) {
    if (! rs._dropboxOrigSync) { return; } // not hooked
    rs.sync = rs._dropboxOrigSync;
    delete rs._dropboxOrigSync;
  }

  // hooking and unhooking getItemURL

  function hookGetItemURL(rs) {
    if (rs._origBaseClientGetItemURL) { return; }
    rs._origBaseClientGetItemURL = RS.BaseClient.prototype.getItemURL;
    RS.BaseClient.prototype.getItemURL = function(path){
      var ret = rs.dropbox._itemRefs[path];
      return  ret ? ret : '';
    };
  }

  function unHookGetItemURL(rs){
    if (! rs._origBaseClieNtGetItemURL) { return; }
    RS.BaseClient.prototype.getItemURL = rs._origBaseClietGetItemURL;
    delete rs._origBaseClietGetItemURL;
  }

  function hookRemote(rs){
    if (rs._origRemote) { return; }
    rs._origRemote = rs.remote;
    rs.remote = rs.dropbox;
  }

  function unHookRemote(rs){
    if (rs._origRemote) {
      rs.remote = rs._origRemote;
      delete rs._origRemote;
    }
  }

  function hookIt(rs){
    hookRemote(rs);
    if (rs.sync) {
      hookSync(rs);
    }
    hookGetItemURL(rs);
  }

  function unHookIt(rs){
    unHookRemote(rs);
    unHookSync(rs);
    unHookGetItemURL(rs);
  }

  RS.Dropbox._rs_init = function(rs) {
    hasLocalStorage = rs.localStorageAvailable();
    if ( rs.apiKeys.dropbox ) {
      rs.dropbox = new RS.Dropbox(rs);
    }
    if (rs.backend === 'dropbox') {
      hookIt(rs);
    }
  };

  RS.Dropbox._rs_supported = function() {
    return true;
  };

  RS.Dropbox._rs_cleanup = function(rs) {
    unHookIt(rs);
    if (hasLocalStorage){
      delete localStorage[SETTINGS_KEY];
    }
    rs.removeEventListener('error', onErrorCb);
    rs.setBackend(undefined);
  };
})(this);

return new RemoteStorage();
});
