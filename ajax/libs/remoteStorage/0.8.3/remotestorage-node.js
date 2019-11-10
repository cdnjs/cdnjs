/** remotestorage.js 0.8.3, http://remotestorage.io, MIT-licensed **/

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
  function emitUnauthorized(status){
    var args = Array.prototype.slice.call(arguments);
    if (status === 403  || status === 401) {
      this._emit('error', new RemoteStorage.Unauthorized());
    }
    var p = promising();
    return p.fulfill.apply(p,args);
  }

  function shareFirst(path){
    return ( this.backend === 'dropbox' &&
             path.match(/^\/public\/.*[^\/]$/) );
  }

  var SyncedGetPutDelete = {
    get: function(path) {
      if (this.caching.cachePath(path)) {
        return this.local.get(path);
      } else {
        return this.remote.get(path);
      }
    },

    put: function(path, body, contentType) {
      if (shareFirst.bind(this)(path)){
        //this.local.put(path, body, contentType);
        return SyncedGetPutDelete._wrapBusyDone.call(this, this.remote.put(path, body, contentType));
      }
      else if (this.caching.cachePath(path)) {
        return this.local.put(path, body, contentType);
      } else {
        return SyncedGetPutDelete._wrapBusyDone.call(this, this.remote.put(path, body, contentType));
      }
    },

    'delete': function(path) {
      if (this.caching.cachePath(path)) {
        return this.local.delete(path);
      } else {
        return SyncedGetPutDelete._wrapBusyDone.call(this, this.remote.delete(path));
      }
    },

    _wrapBusyDone: function(result) {
      this._emit('sync-busy');
      return result.then(function() {
        var promise = promising();
        this._emit('sync-done');
        return promise.fulfill.apply(promise, arguments);
      }.bind(this), function(err) {
        throw err;
      });
    }
  };

  var haveLocalStorage = 'localStorage' in global;

  /**
   * Class: RemoteStorage
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
     * fired when connected and ready
     **/
    /**
     * Event: disconnected
     *
     * fired after disconnect
     **/
    /**
     * Event: disconnect
     *
     * depricated use disconnected
     **/
    /**
     * Event: conflict
     *
     * fired when a conflict occures
     * TODO: arguments, how does this work
     **/
    /**
     * Event: error
     *
     * fired when an error occures
     *
     * Arguments:
     * the error
     **/
    /**
     * Event: features-loaded
     *
     * fired when all features are loaded
     **/
    /**
     * Event: connecting
     *
     * fired before webfinger lookpu
     **/
    /**
     * Event: authing
     *
     * fired before redirecting to the authing server
     **/
    /**
     * Event: sync-busy
     *
     * fired when a sync cycle starts
     *
     **/
    /**
     * Event: sync-done
     *
     * fired when a sync cycle completes
     *
     **/

    RemoteStorage.eventHandling(
      this, 'ready', 'disconnected', 'disconnect', 'conflict', 'error',
      'features-loaded', 'connecting', 'authing', 'sync-busy', 'sync-done'
    );

    // pending get/put/delete calls.
    this._pending = [];

    this._setGPD({
      get: this._pendingGPD('get'),
      put: this._pendingGPD('put'),
      delete: this._pendingGPD('delete')
    });

    this._cleanups = [];

    this._pathHandlers = { change: {}, conflict: {} };

    this.apiKeys = {};

    if (haveLocalStorage) {
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

    this.on('ready', function() {
      if (this.local) {
        setTimeout(this.local.fireInitial.bind(this.local), 0);
      }
    }.bind(this));
  };

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
   * Logging using console.log, when logging is enabled.
   */
  RemoteStorage.log = function() {
    if (RemoteStorage._log) {
      console.log.apply(console, arguments);
    }
  };

  RemoteStorage.prototype = {
    /**
     ** PUBLIC INTERFACE
     **/

    /**
     * Method: connect
     *
     * Connect to a remotestorage server.
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
      if ( userAddress.indexOf('@') < 0) {
        this._emit('error', new RemoteStorage.DiscoveryError("user adress doesn't contain an @"));
        return;
      }
      this._emit('connecting');
      this.remote.configure(userAddress);
      RemoteStorage.Discover(userAddress,function(href, storageApi, authURL){
        if (!href){
          this._emit('error', new RemoteStorage.DiscoveryError('failed to contact storage server'));
          return;
        }
        this._emit('authing');
        this.remote.configure(userAddress, href, storageApi);
        if (! this.remote.connected) {
          this.authorize(authURL);
        }
      }.bind(this));
    },

    /**
     * Method: disconnect
     *
     * "Disconnect" from remotestorage server to terminate current session.
     * This method clears all stored settings and deletes the entire local cache.
     *
     * Once the disconnect is complete, the "disconnected" event will be fired.
     * From that point on you can connect again (using <connect>).
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
          this._emit('disconnected');
          this._emit('disconnect');// DEPRECATED?
        }
      }.bind(this);
      if (n>0) {
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
      if (haveLocalStorage) {
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
     * Adds a 'change' event handler to the given path.
     * Whenever a 'change' happens (as determined by the backend, such
     * as <RemoteStorage.IndexedDB>) and the affected path is equal to
     * or below the given 'path', the given handler is called.
     *
     * You shouldn't need to use this method directly, but instead use
     * the "change" events provided by <RemoteStorage.BaseClient>.
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

    onConflict: function(path, handler) {
      if (! this._conflictBound) {
        this.on('features-loaded', function() {
          if (this.local) {
            this.local.on('conflict', this._dispatchEvent.bind(this, 'conflict'));
          }
        }.bind(this));
        this._conflictBound = true;
      }
      if (! this._pathHandlers.conflict[path]) {
        this._pathHandlers.conflict[path] = [];
      }
      this._pathHandlers.conflict[path].push(handler);
    },

    /**
     * Method: enableLog
     *
     * enable logging
     */
    enableLog: function() {
      RemoteStorage._log = true;
    },

    /**
     * Method: disableLog
     *
     * disable logging
     */
    disableLog: function() {
      RemoteStorage._log = false;
    },

    /**
     * Method: log
     *
     * The same as <RemoteStorage.log>.
     */
    log: function() {
      RemoteStorage.log.apply(RemoteStorage, arguments);
    },

    setApiKeys: function(type, keys) {
      if (keys) {
        this.apiKeys[type] = keys;
      } else {
        delete this.apiKeys[type];
      }
      if (haveLocalStorage) {
        localStorage['remotestorage:api-keys'] = JSON.stringify(this.apiKeys);
      }
    },

    /**
     ** INITIALIZATION
     **/

    _init: function() {
      this._loadFeatures(function(features) {
        this.log('all features loaded');
        this.local = features.local && new features.local();
        // (this.remote set by WireClient._rs_init
        //  as lazy property on RS.prototype)

        if (this.local && this.remote) {
          this._setGPD(SyncedGetPutDelete, this);
          this._bindChange(this.local);
        } else if (this.remote) {
          this._setGPD(this.remote, this.remote);
        }

        if (this.remote) {
          this.remote.on('connected', function() {
            try {
              this._emit('ready');
            } catch(e) {
              console.error("'ready' failed: ", e, e.stack);
              this._emit('error', e);
            }
          }.bind(this));
          if (this.remote.connected) {
            try {
              this._emit('ready');
            } catch(e) {
              console.error("'ready' failed: ", e, e.stack);
              this._emit('error', e);
            }
          }
        }

        var fl = features.length;
        for(var i=0;i<fl;i++) {
          var cleanup = features[i].cleanup;
          if (cleanup) {
            this._cleanups.push(cleanup);
          }
        }

        try {
          this._allLoaded = true;
          this._emit('features-loaded');
        } catch(exc) {
          console.error("remoteStorage#ready block failed: ");
          if (typeof(exc) === 'string') {
            console.error(exc);
          } else {
            console.error(exc.message, exc.stack);
          }
          this._emit('error', exc);
        }
        this._processPending();
      });
    },

    /**
     ** FEATURE DETECTION
     **/

    _detectFeatures: function() {
      // determine availability
      var features = [
        'WireClient',
        'Dropbox',
        'GoogleDrive',
        'Access',
        'Caching',
        'Discover',
        'Authorize',
        'Widget',
        'IndexedDB',
        'LocalStorage',
        'Sync',
        'BaseClient'
      ].map(function(featureName) {
        var impl = RemoteStorage[featureName];
        return {
          name: featureName,
          init: (impl && impl._rs_init),
          supported: impl && (impl._rs_supported ? impl._rs_supported() : true),
          cleanup: ( impl && impl._rs_cleanup )
        };
      }).filter(function(feature) {
        var supported = !! (feature.init && feature.supported);
        this.log("[FEATURE " + feature.name + "] " + (supported ? '' : 'not ') + 'supported.');
        return supported;
      }.bind(this));

      features.forEach(function(feature) {
        if (feature.name === 'IndexedDB') {
          features.local = RemoteStorage.IndexedDB;
        } else if (feature.name === 'LocalStorage' && ! features.local) {
          features.local = RemoteStorage.LocalStorage;
        }
      });
      features.caching = !!RemoteStorage.Caching;
      features.sync = !!RemoteStorage.Sync;

      this.features = features;

      return features;
    },

    _loadFeatures: function(callback) {
      var features = this._detectFeatures();
      var n = features.length, i = 0;
      var self = this;
      function featureDoneCb(name) {
        return function() {
          i++;
          self.log("[FEATURE " + name + "] initialized. (" + i + "/" + n + ")");
          if (i === n) {
            setTimeout(function() {
              callback.apply(self, [features]);
            }, 0);
          }
        };
      }
      features.forEach(function(feature) {
        self.log("[FEATURE " + feature.name + "] initializing...");
        var initResult = feature.init(self);
        var cb = featureDoneCb(feature.name);
        if (typeof(initResult) === 'object' && typeof(initResult.then) === 'function') {
          initResult.then(cb);
        } else {
          cb();
        }
      });
      if (features.length === 0) {
        self.log("[NO FEATURES DETECTED] done");
        callback.apply(self, [[]]);
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
      for(var path in this._pathHandlers[eventName]) {
        var pl = path.length;
        this._pathHandlers[eventName][path].forEach(function(handler) {
          if (event.path.substr(0, pl) === path) {
            var ev = {};
            for(var key in event) { ev[key] = event[key]; }
            ev.relativePath = event.path.replace(new RegExp('^' + path), '');
            try {
              handler(ev);
            } catch(e) {
              console.error("'change' handler failed: ", e, e.stack);
              this._emit('error', e);
            }
          }
        }.bind(this));
      }
    }
  };

  /**
   * Method: claimAccess
   *
   * High-level method to claim access on one or multiple scopes and enable
   * caching for them. WARNING: when using Caching control, use remoteStorage.access.claim instead,
   * see https://github.com/remotestorage/remotestorage.js/issues/380
   *
   * Examples:
   *   (start code)
   *     remoteStorage.claimAccess('foo', 'rw');
   *     // is equivalent to:
   *     remoteStorage.claimAccess({ foo: 'rw' });
   *
   *     // is equivalent to:
   *     remoteStorage.access.claim('foo', 'rw');
   *     remoteStorage.caching.enable('/foo/');
   *     remoteStorage.caching.enable('/public/foo/');
   *   (end code)
   */

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
   * (only available when caching is built in)
   *
   *
   * Property: remote
   *
   * Access to the remote backend used. Usually a <RemoteStorage.WireClient>.
   *
   *
   * Property: local
   *
   * Access to the local caching backend used.
   * Only available when caching is built in.
   * Usually either a <RemoteStorage.IndexedDB> or <RemoteStorage.LocalStorage>
   * instance.
   */

  global.RemoteStorage = RemoteStorage;

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/eventhandling.js **/
(function(global) {
  /**
   * Class: eventhandling
   */
  var methods = {
    /**
     * Method: addEventListener
     *
     * Install an event handler for the given event name.
     */
    addEventListener: function(eventName, handler) {
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
      for(var i=0;i<hl;i++) {
        if(this._handlers[eventName][i] === handler) {
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
      if(! (eventName in this._handlers)) {
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

  // Method: eventhandling.on
  // Alias for <addEventListener>
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
   *     // this would throw an exception:
   *     //this._emit('something-else');
   *   };
   *
   *   var myObject = new MyConstructor();
   *   myObject.on('connected', function() { console.log('connected'); });
   *   myObject.on('disconnected', function() { console.log('disconnected'); });
   *   // this would throw an exception as well:
   *   //myObject.on('something-else', function() {});
   *
   *   (end code)
   */
  RemoteStorage.eventHandling = function(object) {
    var eventNames = Array.prototype.slice.call(arguments, 1);
    for(var key in methods) {
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
   * from directory listings in-memory and return them accordingly as the "revision"
   * parameter in response to #get() requests. Similarly it will return 404 when it
   * receives an empty directory listing, to mimic remotestorage-01 behavior. Note
   * that it is not always possible to know the revision beforehand, hence it may
   * be undefined at times (especially for caching-roots).
   */

  var haveLocalStorage;
  var SETTINGS_KEY = "remotestorage:wireclient";

  var API_2012 = 1, API_00 = 2, API_01 = 3, API_HEAD = 4;

  var STORAGE_APIS = {
    'draft-dejong-remotestorage-00': API_00,
    'draft-dejong-remotestorage-01': API_01,
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
      for(var i=0;i<8;i++) {
        if (object instanceof arrayBufferViews[i]) {
          return true;
        }
      }
      return false;
    };
  }

  function request(method, uri, token, headers, body, getEtag, fakeRevision) {
    if ((method === 'PUT' || method === 'DELETE') && uri[uri.length - 1] === '/') {
      throw "Don't " + method + " on directories!";
    }

    var promise = promising();

    headers['Authorization'] = 'Bearer ' + token;

    RS.WireClient.request(method, uri, {
      body: body,
      headers: headers
    }, function(error, response) {
      if (error) {
        promise.reject(error);
      } else {
        if (response.status === 404) {
          promise.fulfill(404);
        } else {
          var mimeType = response.getResponseHeader('Content-Type');
          var body;
          var revision = getEtag ? response.getResponseHeader('ETag') : (response.status === 200 ? fakeRevision : undefined);
          if ((! mimeType) || mimeType.match(/charset=binary/)) {
            var blob = new Blob([response.response], {type: mimeType});
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
              // reader.result contains the contents of blob as a typed array
              promise.fulfill(response.status, reader.result, mimeType, revision);
            });
            reader.readAsArrayBuffer(blob);
          } else {
            body = mimeType && mimeType.match(/^application\/json/) ? JSON.parse(response.responseText) : response.responseText;
            promise.fulfill(response.status, body, mimeType, revision);
          }
        }
      }
    });
    return promise;
  }

  function cleanPath(path) {
    return path.replace(/\/+/g, '/').split('/').map(encodeURIComponent).join('/');
  }

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
    RS.eventHandling(this, 'change', 'connected');
    rs.on('error', function(error){
      if (error instanceof RemoteStorage.Unauthorized) {
        this.configure(undefined, undefined, undefined, null);
      }
    }.bind(this));
    if (haveLocalStorage) {
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
        this._emit('connected');
      } else {
        this.connected = false;
      }
      if (haveLocalStorage) {
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

    get: function(path, options) {
      if (!this.connected) {
        throw new Error("not connected (path: " + path + ")");
      }
      if (!options) { options = {}; }
      var headers = {};
      if (this.supportsRevs) {
        if (options.ifNoneMatch) {
          headers['If-None-Match'] = options.ifNoneMatch;
        }
      } else if (options.ifNoneMatch) {
        var oldRev = this._revisionCache[path];
        if (oldRev === options.ifNoneMatch) {
          // since sync descends for allKeys(local, remote), this causes
          // https://github.com/remotestorage/remotestorage.js/issues/399
          // commenting this out so that it gets the actual 404 from the
          // server. this only affects legacy servers
          // (this.supportsRevs==false):

          // return promising().fulfill(412);
          // FIXME empty block and commented code
        }
      }
      var promise = request('GET', this.href + cleanPath(path), this.token, headers,
                            undefined, this.supportsRevs, this._revisionCache[path]);
      if (this.supportsRevs || path.substr(-1) !== '/') {
        return promise;
      } else {
        return promise.then(function(status, body, contentType, revision) {
          if (status === 200 && typeof(body) === 'object') {
            if (Object.keys(body).length === 0) {
              // no children (coerce response to 'not found')
              status = 404;
            } else {
              for(var key in body) {
                this._revisionCache[path + key] = body[key];
              }
            }
          }
          return promising().fulfill(status, body, contentType, revision);
        }.bind(this));
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
          headers['If-Match'] = options.ifMatch;
        }
        if (options.ifNoneMatch) {
          headers['If-None-Match'] = options.ifNoneMatch;
        }
      }
      return request('PUT', this.href + cleanPath(path), this.token,
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
          headers['If-Match'] = options.ifMatch;
        }
      }
      return request('DELETE', this.href + cleanPath(path), this.token,
                     headers,
                     undefined, this.supportsRevs);
    }
  };

  // Shared cleanPath used by Dropbox
  RS.WireClient.cleanPath = cleanPath;

  // Shared isArrayBufferView used by WireClient and Dropbox
  RS.WireClient.isArrayBufferView = isArrayBufferView;

  // Shared request function used by WireClient, GoogleDrive and Dropbox.
  RS.WireClient.request = function(method, url, options, callback) {
    RemoteStorage.log(method, url);

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
      for(var key in options.headers) {
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
      } else {
        body = JSON.stringify(body);
      }
    }
    xhr.send(body);
  };

  RS.WireClient.configureHooks = [];

  RS.WireClient._rs_init = function(remoteStorage) {
    remoteStorage.remote = new RS.WireClient(remoteStorage);
  };

  RS.WireClient._rs_supported = function() {
    haveLocalStorage = 'localStorage' in global;
    return !! global.XMLHttpRequest;
  };

  RS.WireClient._rs_cleanup = function(){
    if (haveLocalStorage){
      delete localStorage[SETTINGS_KEY];
    }
  };

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/discover.js **/
(function(global) {

  // feature detection flags
  var haveXMLHttpRequest, haveLocalStorage;
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
      RemoteStorage.log('try url', url);
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
          RemoteStorage.log("Failed to parse profile ", xhr.responseText, e);
          tryOne();
          return;
        }

        if (!profile.links) {
          RemoteStorage.log("profile has no links section ", JSON.stringify(profile));
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
        RemoteStorage.log('got profile', profile, 'and link', link);
        if (link) {
          var authURL = link.properties['auth-endpoint'] ||
            link.properties['http://tools.ietf.org/html/rfc6749#section-4.2'];
          cachedInfo[userAddress] = { href: link.href, type: link.type, authURL: authURL };
          if (haveLocalStorage) {
            localStorage[SETTINGS_KEY] = JSON.stringify({ cache: cachedInfo });
          }
          callback(link.href, link.type, authURL);
        } else {
          tryOne();
        }
      };
      xhr.send();
    }
    tryOne();
  },



  RemoteStorage.Discover._rs_init = function(remoteStorage) {
    if (haveLocalStorage) {
      var settings;
      try { settings = JSON.parse(localStorage[SETTINGS_KEY]); } catch(e) {}
      if (settings) {
        cachedInfo = settings.cache;
      }
    }
  };

  RemoteStorage.Discover._rs_supported = function() {
    haveLocalStorage = !! global.localStorage;
    haveXMLHttpRequest = !! global.XMLHttpRequest;
    return haveXMLHttpRequest;
  };

  RemoteStorage.Discover._rs_cleanup = function() {
    if (haveLocalStorage) {
      delete localStorage[SETTINGS_KEY];
    }
  };

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/authorize.js **/
(function() {

  function extractParams() {
    //FF already decodes the URL fragment in document.location.hash, so use this instead:
    var hashPos = document.location.href.indexOf('#');
    if(hashPos == -1) return;
    var hash = document.location.href.substring(hashPos+1);
    return hash.split('&').reduce(function(m, kvs) {
      var kv = kvs.split('=');
      m[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
      return m;
    }, {});
  };

  RemoteStorage.Authorize = function(authURL, scope, redirectUri, clientId) {
    RemoteStorage.log('Authorize authURL = ',authURL)

    var url = authURL;
    url += authURL.indexOf('?') > 0 ? '&' : '?';
    url += 'redirect_uri=' + encodeURIComponent(redirectUri.replace(/#.*$/, ''));
    url += '&scope=' + encodeURIComponent(scope);
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&response_type=token';
    document.location = url;
  };

  RemoteStorage.prototype.authorize = function(authURL) {
    var scopes = this.access.scopeModeMap;
    var scope = [];
    for(var key in scopes) {
      var mode = scopes[key];
      if(key == 'root') {
        if(! this.remote.storageApi.match(/^draft-dejong-remotestorage-/)) {
          key = '';
        }
      }
      scope.push(key + ':' + mode);
    }
    scope = scope.join(' ');

    var redirectUri = String(document.location);
    var clientId = redirectUri.match(/^(https?:\/\/[^\/]+)/)[0];

    RemoteStorage.Authorize(authURL, scope, redirectUri, clientId);
  };

  RemoteStorage.Authorize._rs_supported = function(remoteStorage) {
    return typeof(document) != 'undefined';
  };

  var onFeaturesLoaded;
  RemoteStorage.Authorize._rs_init = function(remoteStorage) {
    onFeaturesLoaded = function () {
      if(params) {
        if(params.error) {
          throw "Authorization server errored: " + params.error;
        }
        if(params.access_token) {
          remoteStorage.remote.configure(undefined, undefined, undefined, params.access_token);
        }
        if(params.remotestorage) {
          remoteStorage.connect(params.remotestorage);
        }
      }
    }
    var params = extractParams();
    if(params) {
      document.location.hash = '';
    }
    remoteStorage.on('features-loaded', onFeaturesLoaded );
  }
  RemoteStorage.Authorize._rs_cleanup = function(remoteStorage) {
    remoteStorage.removeEventListener('features-loaded', onFeaturesLoaded );
  }

})();


/** FILE: src/access.js **/
(function(global) {

  var haveLocalStorage = 'localStorage' in global;
  var SETTINGS_KEY = "remotestorage:access";

  /**
   * Class: RemoteStorage.Access
   *
   * Keeps track of claimed access and scopes.
   */
  RemoteStorage.Access = function() {
    this.reset();

    if(haveLocalStorage) {
      var rawSettings = localStorage[SETTINGS_KEY];
      if(rawSettings) {
        var savedSettings = JSON.parse(rawSettings);
        for(var key in savedSettings) {
          this.set(key, savedSettings[key]);
        }
      }
    }
  };

  RemoteStorage.Access.prototype = {
    // not sure yet, if 'set' or 'claim' is better...

    /**
     * Method: claim
     *
     * Claim access on a given scope with given mode.
     *
     * Parameters:
     *   scope - An access scope, such as "contacts" or "calendar".
     *   mode  - Access mode to use. Either "r" or "rw".
     */
    claim: function() {
      this.set.apply(this, arguments);
    },

    set: function(scope, mode) {
      this._adjustRootPaths(scope);
      this.scopeModeMap[scope] = mode;
      this._persist();
    },

    get: function(scope) {
      return this.scopeModeMap[scope];
    },

    remove: function(scope) {
      var savedMap = {};
      for(var name in this.scopeModeMap) {
        savedMap[name] = this.scopeModeMap[name];
      }
      this.reset();
      delete savedMap[scope];
      for(var name in savedMap) {
        this.set(name, savedMap[name]);
      }
      this._persist();
    },

    check: function(scope, mode) {
      var actualMode = this.get(scope);
      return actualMode && (mode === 'r' || actualMode === 'rw');
    },

    reset: function() {
      this.rootPaths = [];
      this.scopeModeMap = {};
    },

    _adjustRootPaths: function(newScope) {
      if('root' in this.scopeModeMap || newScope === 'root') {
        this.rootPaths = ['/'];
      } else if(! (newScope in this.scopeModeMap)) {
        this.rootPaths.push('/' + newScope + '/');
        this.rootPaths.push('/public/' + newScope + '/');
      }
    },

    _persist: function() {
      if(haveLocalStorage) {
        localStorage[SETTINGS_KEY] = JSON.stringify(this.scopeModeMap);
      }
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
   *
   * Example:
   *   (start code)
   *   remoteStorage.access.claim('foo', 'r');
   *   remoteStorage.access.claim('bar', 'rw');
   *
   *   remoteStorage.access.scopes
   *   // -> [ { name: 'foo', mode: 'r' }, { name: 'bar', mode: 'rw' } ]
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
        return (scope.name === 'root' && this.storageType === '2012.04' ? '' : scope.name) + ':' + scope.mode;
      }.bind(this)).join(' ');
    }
  });

  // documented in src/remotestorage.js
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

  function setModuleCaching(remoteStorage, key) {
    if(key == 'root' || key === '') {
      remoteStorage.caching.set('/', { data: true });
    } else {
      remoteStorage.caching.set('/' + key + '/', { data: true });
      remoteStorage.caching.set('/public/' + key + '/', { data: true });
    }
  }

  // documented in src/remotestorage.js
  RemoteStorage.prototype.claimAccess = function(scopes) {
    if(typeof(scopes) === 'object') {
      for(var key in scopes) {
        this.access.claim(key, scopes[key]);
      }
    } else {
      this.access.claim(arguments[0], arguments[1])
    }
  };

  RemoteStorage.Access._rs_init = function() {};

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
   * <getListing> returns a list of all items within a folder, or undefined
   * if a 404 is encountered. Items that end with a forward slash ("/") are
   * child folders.
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
      throw "Not a directory: " + base;
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
    /**
     * Event: change
     * emitted when a node changes
     *
     * Arguments: event
     * (start code)
     * {
     *    path: path,
     *    origin: incoming ? 'remote' : 'window',
     *    oldValue: oldBody,
     *    newValue: newBody
     *  }
     * (end code)
     *
     * * the path ofcourse is the path of the node that changed
     *
     *
     * * the origin tells you if it's an change pulled by sync(remote)
     * or some user action within the app(window)
     *
     *
     *
     * * the oldValue defaults to undefined if you are dealing with some
     * new file
     *
     *
     * * the newValue defaults to undefined if you are dealing with a deletion
     *
     * * when newValue and oldValue are set you are dealing with an update
     **/
    /**
     * Event: conflict
     *
     **/

    RS.eventHandling(this, 'change', 'conflict');
    this.on = this.on.bind(this);
    storage.onChange(this.base, this._fireChange.bind(this));
    storage.onConflict(this.base, this._fireConflict.bind(this));
  };

  RS.BaseClient.prototype = {

    // BEGIN LEGACY
    use: function(path) {
      deprecate('BaseClient#use(path)', 'BaseClient#cache(path)');
      return this.cache(path);
    },

    release: function(path) {
      deprecate('BaseClient#release(path)', 'BaseClient#cache(path, false)');
      return this.cache(path, false);
    },
    // END LEGACY

    extend: function(object) {
      for(var key in object) {
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
     *   path     - The path to query. It MUST end with a forward slash.
     *
     * Returns:
     *   A promise for an Array of keys, representing child nodes.
     *   Those keys ending in a forward slash, represent *directory nodes*, all
     *   other keys represent *data nodes*.
     *
     * Example:
     *   (start code)
     *   client.getListing('').then(function(listing) {
     *     listing.forEach(function(item) {
     *       console.log('- ' + item);
     *     });
     *   });
     *   (end code)
     */
    getListing: function(path) {
      if (typeof(path) === 'undefined') {
        path = '';
      } else if (path.length > 0 && path[path.length - 1] !== '/') {
        throw "Not a directory: " + path;
      }
      return this.storage.get(this.makePath(path)).then(function(status, body) {
        if (status === 404) { return; }
        return typeof(body) === 'object' ? Object.keys(body) : undefined;
      });
    },

    /**
     * Method: getAll
     *
     * Get all objects directly below a given path.
     *
     * Parameters:
     *   path      - path to the direcotry
     *   typeAlias - (optional) local type-alias to filter for
     *
     * Returns:
     *   a promise for an object in the form { path : object, ... }
     *
     * Example:
     *   (start code)
     *   client.getAll('').then(function(objects) {
     *     for(var key in objects) {
     *       console.log('- ' + key + ': ', objects[key]);
     *     }
     *   });
     *   (end code)
     */
    getAll: function(path) {
      if (typeof(path) === 'undefined') {
        path = '';
      } else if (path.length > 0 && path[path.length - 1] !== '/') {
        throw "Not a directory: " + path;
      }
      return this.storage.get(this.makePath(path)).then(function(status, body) {
        if (status === 404) { return; }
        if (typeof(body) === 'object') {
          var promise = promising();
          var count = Object.keys(body).length, i = 0;
          if (count === 0) {
            // treat this like 404. it probably means a directory listing that
            // has changes that haven't been pushed out yet.
            return;
          }
          for(var key in body) {
            this.storage.get(this.makePath(path + key)).
              then(function(status, b) {
                body[this.key] = b;
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
     *   path     - see getObject
     *
     * Returns:
     *   A promise for an object:
     *
     *   mimeType - String representing the MIME Type of the document.
     *   data     - Raw data of the document (either a string or an ArrayBuffer)
     *
     * Example:
     *   (start code)
     *   // Display an image:
     *   client.getFile('path/to/some/image').then(function(file) {
     *     var blob = new Blob([file.data], { type: file.mimeType });
     *     var targetElement = document.findElementById('my-image-element');
     *     targetElement.src = window.URL.createObjectURL(blob);
     *   });
     *   (end code)
     */
    getFile: function(path) {
      return this.storage.get(this.makePath(path)).then(function(status, body, mimeType, revision) {
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
     *   path     - relative path from the module root (without leading slash)
     *
     * Returns:
     *   A promise for the object.
     *
     * Example:
     *   (start code)
     *   client.getObject('/path/to/object').
     *     then(function(object) {
     *       // object is either an object or null
     *     });
     *   (end code)
     */
    getObject: function(path) {
      return this.storage.get(this.makePath(path)).then(function(status, body, mimeType, revision) {
        if (typeof(body) === 'object') {
          return body;
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
     *     http://remotestoragejs.com/spec/modules/ - A prefix to guarantee unqiueness
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
      this._attachType(object, typeAlias);
      try {
        var validationResult = this.validate(object);
        if (! validationResult.valid) {
          return promising(function(p) { p.reject(validationResult); });
        }
      } catch(exc) {
        if (exc instanceof RS.BaseClient.Types.SchemaNotFound) {
          // ignore
          // FIXME ignore what and why?
        } else {
          return promising().reject(exc);
        }
      }
      return this.storage.put(this.makePath(path), object, 'application/json; charset=UTF-8').then(function(status, _body, _mimeType, revision) {
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
      return this.storage.delete(this.makePath(path));
    },

    cache: function(path, disable) {
      this.storage.caching[disable !== false ? 'enable' : 'disable'](
        this.makePath(path)
      );
      return this;
    },

    makePath: function(path) {
      return this.base + (path || '');
    },

    _fireChange: function(event) {
      this._emit('change', event);
    },

    _fireConflict: function(event) {
      if (this._handlers.conflict.length > 0) {
        this._emit('conflict', event);
      } else {
        event.resolve('remote');
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

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/baseclient/types.js **/

(function(global) {

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
        if(parts.length === 1) {
          extendedAlias = moduleName + '/' + parts.shift();
        } else {
          extendedAlias = parts.join('/');
        }
        var extendedUri = this.uris[extendedAlias];
        if(! extendedUri) {
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
      for(var alias in this.uris) {
        if(alias.substr(0, ml + 1) == moduleName + '/') {
          var uri = this.uris[alias];
          schemas[uri] = this.schemas[uri];
        }
      }
      return schemas;
    }
  };

  var SchemaNotFound = function(uri) {
    var error = Error("Schema not found: " + uri);
    error.name = "SchemaNotFound";
    return error;
  };
  SchemaNotFound.prototype = Error.prototype;

  RemoteStorage.BaseClient.Types.SchemaNotFound = SchemaNotFound;

  RemoteStorage.BaseClient.prototype.extend({

    validate: function(object) {
      var schema = RemoteStorage.BaseClient.Types.getSchema(object['@context']);
      if(schema) {
        return tv4.validateResult(object, schema);
      } else {
        throw new SchemaNotFound(object['@context']);
      }
    },

    // client.declareType(alias, schema);
    //  /* OR */
    // client.declareType(alias, uri, schema);
    declareType: function(alias, uri, schema) {
      if(! schema) {
        schema = uri;
        uri = this._defaultTypeURI(alias);
      }
      RemoteStorage.BaseClient.Types.declare(this.moduleName, alias, uri, schema);
    },

    _defaultTypeURI: function(alias) {
      return 'http://remotestoragejs.com/spec/modules/' + this.moduleName + '/' + alias;
    },

    _attachType: function(object, alias) {
      object['@context'] = RemoteStorage.BaseClient.Types.resolveAlias(alias) || this._defaultTypeURI(alias);
    }
  });

  Object.defineProperty(RemoteStorage.BaseClient.prototype, 'schemas', {
    configurable: true,
    get: function() {
      return RemoteStorage.BaseClient.Types.inScope(this.moduleName);
    }
  });

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/caching.js **/
(function(global) {

  var haveLocalStorage = 'localStorage' in global;
  var SETTINGS_KEY = "remotestorage:caching";

  function containingDir(path) {
    if(path === '') return '/';
    if(! path) throw "Path not given!";
    return path.replace(/\/+/g, '/').replace(/[^\/]+\/?$/, '');
  }

  function isDir(path) {
    return path.substr(-1) == '/';
  }

  function pathContains(a, b) {
    return a.slice(0, b.length) === b;
  }

  /**
   * Class: RemoteStorage.Caching
   *
   * Holds caching configuration.
   */
  RemoteStorage.Caching = function() {
    this.reset();

    if(haveLocalStorage) {
      var settings = localStorage[SETTINGS_KEY];
      if(settings) {
        this._pathSettingsMap = JSON.parse(settings);
        this._updateRoots();
      }
    }
  };

  RemoteStorage.Caching.prototype = {

    /**
     * Method: enable
     *
     * Enable caching for the given path.
     *
     * Parameters:
     *   path - Absolute path to a directory.
     */
    enable: function(path) { this.set(path, { data: true }); },
    /**
     * Method: disable
     *
     * Disable caching for the given path.
     *
     * Parameters:
     *   path - Absolute path to a directory.
     */
    disable: function(path) { this.remove(path); },

    /**
     ** configuration methods
     **/

    get: function(path) {
      this._validateDirPath(path);
      return this._pathSettingsMap[path];
    },

    set: function(path, settings) {
      this._validateDirPath(path);
      if(typeof(settings) !== 'object') {
        throw new Error("settings is required");
      }
      this._pathSettingsMap[path] = settings;
      this._updateRoots();
    },

    remove: function(path) {
      this._validateDirPath(path);
      delete this._pathSettingsMap[path];
      this._updateRoots();
    },

    reset: function() {
      this.rootPaths = [];
      this._pathSettingsMap = {};
    },

    /**
     ** query methods
     **/

    // Method: descendIntoPath
    //
    // Checks if the given directory path should be followed.
    //
    // Returns: true or false
    descendIntoPath: function(path) {
      this._validateDirPath(path);
      return !! this._query(path);
    },

    // Method: cachePath
    //
    // Checks if given path should be cached.
    //
    // Returns: true or false
    cachePath: function(path) {
      this._validatePath(path);
      var settings = this._query(path);
      return settings && (isDir(path) || settings.data);
    },

    /**
     ** private methods
     **/

    // gets settings for given path. walks up the path until it finds something.
    _query: function(path) {
      return this._pathSettingsMap[path] ||
        path !== '/' &&
        this._query(containingDir(path));
    },

    _validatePath: function(path) {
      if(typeof(path) !== 'string') {
        throw new Error("path is required");
      }
    },

    _validateDirPath: function(path) {
      this._validatePath(path);
      if(! isDir(path)) {
        throw new Error("not a directory path: " + path);
      }
      if(path[0] !== '/') {
        throw new Error("path not absolute: " + path);
      }
    },

    _updateRoots: function() {
      var roots = {}
      for(var a in this._pathSettingsMap) {
        // already a root
        if(roots[a]) {
          continue;
        }
        var added = false;
        for(var b in this._pathSettingsMap) {
          if(pathContains(a, b)) {
            roots[b] = true;
            added = true;
            break;
          }
        }
        if(! added) {
          roots[a] = true;
        }
      }
      this.rootPaths = Object.keys(roots);
      if(haveLocalStorage) {
        localStorage[SETTINGS_KEY] = JSON.stringify(this._pathSettingsMap);
      }
    },

  };

  Object.defineProperty(RemoteStorage.Caching.prototype, 'list', {
    get: function() {
      var list = [];
      for(var path in this._pathSettingsMap) {
        list.push({ path: path, settings: this._pathSettingsMap[path] });
      }
      return list;
    }
  });


  Object.defineProperty(RemoteStorage.prototype, 'caching', {
    configurable: true,
    get: function() {
      var caching = new RemoteStorage.Caching();
      Object.defineProperty(this, 'caching', {
        value: caching
      });
      return caching;
    }
  });

  RemoteStorage.Caching._rs_init = function() {};

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/sync.js **/
(function(global) {

  var SYNC_INTERVAL = 10000;

  //
  // The synchronization algorithm is as follows:
  //
  // (for each path in caching.rootPaths)
  //
  // (1) Fetch all pending changes from 'local'
  // (2) Try to push pending changes to 'remote', if that fails mark a
  //     conflict, otherwise clear the change.
  // (3) Folder items: GET a listing
  //     File items: GET the file
  // (4) Compare versions. If they match the locally cached one, return.
  //     Otherwise continue.
  // (5) Folder items: For each child item, run this algorithm starting at (3).
  //     File items: Fetch remote data and replace locally cached copy.
  //
  // Depending on the API version the server supports, the version comparison
  // can either happen on the server (through ETag, If-Match, If-None-Match
  // headers), or on the client (through versions specified in the parent listing).
  //

  function isDir(path) {
    return path[path.length - 1] === '/';
  }

  function descendInto(remote, local, path, keys, promise) {
    var n = keys.length, i = 0;
    if (n === 0) { promise.fulfill(); }
    function oneDone() {
      i++;
      if (i === n) { promise.fulfill(); }
    }
    keys.forEach(function(key) {
      synchronize(remote, local, path + key).then(oneDone);
    });
  }

  function updateLocal(remote, local, path, body, contentType, revision, promise) {
    if (isDir(path)) {
      descendInto(remote, local, path, Object.keys(body), promise);
    } else {
      local.put(path, body, contentType, true, revision).then(function() {
        return local.setRevision(path, revision);
      }).then(function() {
        promise.fulfill();
      });
    }
  }

  function allDifferentKeys(a, b) {
    var keyObject = {};
    for (var ak in a) {
      if (a[ak] !== b[ak]) {
        keyObject[ak] = true;
      }
    }
    for (var bk in b) {
      if (a[bk] !== b[bk]) {
        keyObject[bk] = true;
      }
    }
    return Object.keys(keyObject);
  }

  function promiseDeleteLocal(local, path) {
    var promise = promising();
    deleteLocal(local, path, promise);
    return promise;
  }

  function deleteLocal(local, path, promise) {
    if (isDir(path)) {
      local.get(path).then(function(localStatus, localBody, localContentType, localRevision) {
        var keys = [], failed = false;
        for (var item in localBody) {
          keys.push(item);
        }
        var n = keys.length, i = 0;
        if (n === 0) { promise.fulfill(); }
        function oneDone() {
          i++;
          if (i === n && !failed) { promise.fulfill(); }
        }
        function oneFailed(error) {
          if (!failed) {
            failed = true;
            promise.reject(error);
          }
        }
        keys.forEach(function(key) {
          promiseDeleteLocal(local, path + key).then(oneDone, oneFailed);
        });
      });
    } else {
      //console.log('deleting local item', path);
      local.delete(path, true).then(promise.fulfill, promise.reject);
    }
  }

  function synchronize(remote, local, path, options) {
    var promise = promising();
    local.get(path).then(function(localStatus, localBody, localContentType, localRevision) {
      remote.get(path, {
        ifNoneMatch: localRevision
      }).then(function(remoteStatus, remoteBody, remoteContentType, remoteRevision) {
        if (remoteStatus === 401 || remoteStatus === 403) {
          throw new RemoteStorage.Unauthorized();
        } else if (remoteStatus === 412 || remoteStatus === 304) {
          // up to date.
          promise.fulfill();
        } else if (localStatus === 404 && remoteStatus === 200) {
          // local doesn't exist, remote does.
          updateLocal(remote, local, path, remoteBody, remoteContentType, remoteRevision, promise);
        } else if (localStatus === 200 && remoteStatus === 404) {
          // remote doesn't exist, local does.
          deleteLocal(local, path, promise);
        } else if (localStatus === 200 && remoteStatus === 200) {
          if (isDir(path)) {
            if (remoteRevision && remoteRevision === localRevision) {
              promise.fulfill();
            } else {
              local.setRevision(path, remoteRevision).then(function() {
                descendInto(remote, local, path, allDifferentKeys(localBody, remoteBody), promise);
              });
            }
          } else {
            updateLocal(remote, local, path, remoteBody, remoteContentType, remoteRevision, promise);
          }
        } else {
          // do nothing.
          promise.fulfill();
        }
      }).then(undefined, promise.reject);
    }).then(undefined, promise.reject);
    return promise;
  }

  function fireConflict(local, path, attributes) {
    local.setConflict(path, attributes);
  }

  function pushChanges(remote, local, path) {
    return local.changesBelow(path).then(function(changes) {
      var n = changes.length, i = 0;
      var promise = promising();
      function oneDone(path) {
        function done() {
          i++;
          if (i === n) { promise.fulfill(); }
        }
        if (path) {
          // change was propagated -> clear.
          local.clearChange(path).then(done);
        } else {
          // change wasn't propagated (conflict?) -> handle it later.
          done();
        }
      }
      if (n > 0) {
        var errored = function(err) {
          console.error("pushChanges aborted due to error: ", err, err.stack);
          promise.reject(err);
        };
        changes.forEach(function(change) {
          if (change.conflict) {
            var res = change.conflict.resolution;
            if (res) {
              RemoteStorage.log('about to resolve', res);
              // ready to be resolved.
              change.action = (res === 'remote' ? change.remoteAction : change.localAction);
              change.force = true;
            } else {
              RemoteStorage.log('conflict pending for ', change.path);
              // pending conflict, won't do anything.
              return oneDone();
            }
          }
          switch(change.action) {
          case 'PUT':
            var options = {};
            if (! change.force) {
              if (change.revision) {
                options.ifMatch = change.revision;
              } else {
                options.ifNoneMatch = '*';
              }
            }
            local.get(change.path).then(function(status, body, contentType) {
              if (status === 200) {
                return remote.put(change.path, body, contentType, options);
              } else {
                return 200; // fake 200 so the change is cleared.
              }
            }).then(function(status) {
              if (status === 412) {
                fireConflict(local, change.path, {
                  localAction: 'PUT',
                  remoteAction: 'PUT'
                });
                oneDone();
              } else {
                oneDone(change.path);
              }
            }).then(undefined, errored);
            break;
          case 'DELETE':
            remote.delete(change.path, {
              ifMatch: change.force ? undefined : change.revision
            }).then(function(status) {
              if (status === 412) {
                fireConflict(local, change.path, {
                  remoteAction: 'PUT',
                  localAction: 'DELETE'
                });
                oneDone();
              } else {
                oneDone(change.path);
              }
            }).then(undefined, errored);
            break;
          }
        });
        return promise;
      }
    });
  }

  /**
   * Class: RemoteStorage.Sync
   **/
  RemoteStorage.Sync = {
    /**
     * Method: sync
     **/
    sync: function(remote, local, path) {
      return pushChanges(remote, local, path).
        then(function() {
          return synchronize(remote, local, path);
        });
    },
    /**
     * Methods: syncTree
     **/
    syncTree: function(remote, local, path) {
      return synchronize(remote, local, path, {
        data: false
      });
    }
  };

  var SyncError = function(originalError) {
    var msg = 'Sync failed: ';
    if (typeof(originalError) === 'object' && 'message' in originalError) {
      msg += originalError.message;
    } else {
      msg += originalError;
    }
    this.originalError = originalError;
    Error.apply(this, [msg]);
  };

  SyncError.prototype = Object.create(Error.prototype);

  RemoteStorage.prototype.sync = function() {
    if (! (this.local && this.caching)) {
      throw "Sync requires 'local' and 'caching'!";
    }
    if (! this.remote.connected) {
      return promising().fulfill();
    }
    var roots = this.caching.rootPaths.slice(0);
    var n = roots.length, i = 0;
    var aborted = false;
    var rs = this;

    return promising(function(promise) {
      if (n === 0) {
        rs._emit('sync-busy');
        rs._emit('sync-done');
        return promise.fulfill();
      }
      rs._emit('sync-busy');
      var path;
      while((path = roots.shift())) {
        (function (path) {
          RemoteStorage.Sync.sync(rs.remote, rs.local, path, rs.caching.get(path)).
            then(function() {
              if (aborted) { return; }
              i++;
              if (n === i) {
                rs._emit('sync-done');
                promise.fulfill();
              }
            }, function(error) {
              console.error('syncing', path, 'failed:', error);
              if (aborted) { return; }
              aborted = true;
              rs._emit('sync-done');
              if (error instanceof RemoteStorage.Unauthorized) {
                rs._emit('error', error);
              } else {
                rs._emit('error', new SyncError(error));
              }
              promise.reject(error);
            });
        })(path);
      }
    });
  };

  RemoteStorage.SyncError = SyncError;

  RemoteStorage.prototype.syncCycle = function() {
    this.sync().then(function() {
      this.stopSync();
      this._syncTimer = setTimeout(this.syncCycle.bind(this), SYNC_INTERVAL);
    }.bind(this),
    function(e) {
      console.log('sync error, retrying');
      this.stopSync();
      this._syncTimer = setTimeout(this.syncCycle.bind(this), SYNC_INTERVAL);
    }.bind(this));
  };

  RemoteStorage.prototype.stopSync = function() {
    if (this._syncTimer) {
      clearTimeout(this._syncTimer);
      delete this._syncTimer;
    }
  };

  RemoteStorage.Sync._rs_init = function(remoteStorage) {
    remoteStorage.on('ready', function() {
      remoteStorage.syncCycle();
    });
  };

  RemoteStorage.Sync._rs_cleanup = function(remoteStorage) {
    remoteStorage.stopSync();
  };

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/indexeddb.js **/
(function(global) {

  /**
   * Class: RemoteStorage.IndexedDB
   *
   *
   * IndexedDB Interface
   * -------------------
   *
   * This file exposes a get/put/delete interface, accessing data in an indexedDB.
   *
   * There are multiple parts to this interface:
   *
   *   The RemoteStorage integration:
   *     - RemoteStorage.IndexedDB._rs_supported() determines if indexedDB support
   *       is available. If it isn't, RemoteStorage won't initialize the feature.
   *     - RemoteStorage.IndexedDB._rs_init() initializes the feature. It returns
   *       a promise that is fulfilled as soon as the database has been opened and
   *       migrated.
   *
   *   The storage interface (RemoteStorage.IndexedDB object):
   *     - Usually this is accessible via "remoteStorage.local"
   *     - #get() takes a path and returns a promise.
   *     - #put() takes a path, body and contentType and also returns a promise.
   *       In addition it also takes a 'incoming' flag, which indicates that the
   *       change is not fresh, but synchronized from remote.
   *     - #delete() takes a path and also returns a promise. It also supports
   *       the 'incoming' flag described for #put().
   *     - #on('change', ...) events, being fired whenever something changes in
   *       the storage. Change events roughly follow the StorageEvent pattern.
   *       They have "oldValue" and "newValue" properties, which can be used to
   *       distinguish create/update/delete operations and analyze changes in
   *       change handlers. In addition they carry a "origin" property, which
   *       is either "window" or "remote". "remote" events are fired whenever the
   *       "incoming" flag is passed to #put() or #delete(). This is usually done
   *       by RemoteStorage.Sync.
   *
   *   The revision interface (also on RemoteStorage.IndexedDB object):
   *     - #setRevision(path, revision) sets the current revision for the given
   *       path. Revisions are only generated by the remotestorage server, so
   *       this is usually done from RemoteStorage.Sync once a pending change
   *       has been pushed out.
   *     - #setRevisions(revisions) takes path/revision pairs in the form:
   *       [[path1, rev1], [path2, rev2], ...] and updates all revisions in a
   *       single transaction.
   *     - #getRevision(path) returns the currently stored revision for the given
   *       path.
   *
   *   The changes interface (also on RemoteStorage.IndexedDB object):
   *     - Used to record local changes between sync cycles.
   *     - Changes are stored in a separate ObjectStore called "changes".
   *     - #_recordChange() records a change and is called by #put() and #delete(),
   *       given the "incoming" flag evaluates to false. It is private and should
   *       never be used from the outside.
   *     - #changesBelow() takes a path and returns a promise that will be fulfilled
   *       with an Array of changes that are pending for the given path or below.
   *       This is usually done in a sync cycle to push out pending changes.
   *     - #clearChange removes the change for a given path. This is usually done
   *       RemoteStorage.Sync once a change has successfully been pushed out.
   *     - #setConflict sets conflict attributes on a change. It also fires the
   *       "conflict" event.
   *     - #on('conflict', ...) event. Conflict events usually have the following
   *       attributes: path, localAction and remoteAction. Both actions are either
   *       "PUT" or "DELETE". They also bring a "resolve" method, which can be
   *       called with either of the strings "remote" and "local" to mark the
   *       conflict as resolved. The actual resolution will usually take place in
   *       the next sync cycle.
   */

  var RS = RemoteStorage;

  var DEFAULT_DB_NAME = 'remotestorage';
  var DEFAULT_DB;

  function keepDirNode(node) {
    return Object.keys(node.body).length > 0 ||
      Object.keys(node.cached).length > 0;
  }

  function removeFromParent(nodes, path, key) {
    var parts = path.match(/^(.*\/)([^\/]+\/?)$/);
    if (parts) {
      var dirname = parts[1], basename = parts[2];
      nodes.get(dirname).onsuccess = function(evt) {
        var node = evt.target.result;
        if (!node) {//attempt to remove something from a non-existing directory
          return;
        }
        delete node[key][basename];
        if (keepDirNode(node)) {
          nodes.put(node);
        } else {
          nodes.delete(node.path).onsuccess = function() {
            if (dirname !== '/') {
              removeFromParent(nodes, dirname, key);
            }
          };
        }
      };
    }
  }

  function makeNode(path) {
    var node = { path: path };
    if (path[path.length - 1] === '/') {
      node.body = {};
      node.cached = {};
      node.contentType = 'application/json';
    }
    return node;
  }

  function addToParent(nodes, path, key, revision) {
    var parts = path.match(/^(.*\/)([^\/]+\/?)$/);
    if (parts) {
      var dirname = parts[1], basename = parts[2];
      nodes.get(dirname).onsuccess = function(evt) {
        var node = evt.target.result || makeNode(dirname);
        node[key][basename] = revision || true;
        nodes.put(node).onsuccess = function() {
          if (dirname !== '/') {
            addToParent(nodes, dirname, key, true);
          }
        };
      };
    }
  }

  RS.IndexedDB = function(database) {
    this.db = database || DEFAULT_DB;
    if (! this.db) {
      if (RemoteStorage.LocalStorage) {
        RemoteStorage.log("Failed to open indexedDB, falling back to localStorage");
        return new RemoteStorage.LocalStorage();
      } else {
        throw "Failed to open indexedDB and localStorage fallback not available!";
      }
    }
    RS.eventHandling(this, 'change', 'conflict');
  };
  RS.IndexedDB.prototype = {

    get: function(path) {
      var promise = promising();
      var transaction = this.db.transaction(['nodes'], 'readonly');
      var nodes = transaction.objectStore('nodes');
      var nodeReq = nodes.get(path);
      var node;
      nodeReq.onsuccess = function() {
        node = nodeReq.result;
      };
      transaction.oncomplete = function() {
        if (node) {
          promise.fulfill(200, node.body, node.contentType, node.revision);
        } else {
          promise.fulfill(404);
        }
      };
      transaction.onerror = transaction.onabort = promise.reject;
      return promise;
    },

    put: function(path, body, contentType, incoming, revision) {
      var promise = promising();
      if (path[path.length - 1] === '/') { throw "Bad: don't PUT folders"; }
      var transaction = this.db.transaction(['nodes'], 'readwrite');
      var nodes = transaction.objectStore('nodes');
      var oldNode;
      var done;
      nodes.get(path).onsuccess = function(evt) {
        try {
          oldNode = evt.target.result;
          var node = {
            path: path,
            contentType: contentType,
            body: body
          };
          nodes.put(node).onsuccess = function() {
            try {
              addToParent(nodes, path, 'body', revision);
            } catch(e) {
              if (typeof(done) === 'undefined') {
                done = true;
                promise.reject(e);
              }
            }
          };
        } catch(e) {
          if (typeof(done) === 'undefined') {
            done = true;
            promise.reject(e);
          }
        }
      };
      transaction.oncomplete = function() {
        this._emit('change', {
          path: path,
          origin: incoming ? 'remote' : 'window',
          oldValue: oldNode ? oldNode.body : undefined,
          newValue: body
        });
        if (! incoming) {
          this._recordChange(path, { action: 'PUT', revision: oldNode ? oldNode.revision : undefined });
        }
        if (typeof(done) === 'undefined') {
          done = true;
          promise.fulfill(200);
        }
      }.bind(this);
      transaction.onerror = transaction.onabort = promise.reject;
      return promise;
    },

    delete: function(path, incoming) {
      var promise = promising();
      if (path[path.length - 1] === '/') { throw "Bad: don't DELETE folders"; }
      var transaction = this.db.transaction(['nodes'], 'readwrite');
      var nodes = transaction.objectStore('nodes');
      var oldNode;
      nodes.get(path).onsuccess = function(evt) {
        oldNode = evt.target.result;
        nodes.delete(path).onsuccess = function() {
          removeFromParent(nodes, path, 'body', incoming);
        };
      };
      transaction.oncomplete = function() {
        if (oldNode) {
          this._emit('change', {
            path: path,
            origin: incoming ? 'remote' : 'window',
            oldValue: oldNode.body,
            newValue: undefined
          });
        }
        if (! incoming) {
          this._recordChange(path, { action: 'DELETE', revision: oldNode ? oldNode.revision : undefined });
        }
        promise.fulfill(200);
      }.bind(this);
      transaction.onerror = transaction.onabort = promise.reject;
      return promise;
    },

    setRevision: function(path, revision) {
      return this.setRevisions([[path, revision]]);
    },

    setRevisions: function(revs) {
      var promise = promising();
      var transaction = this.db.transaction(['nodes'], 'readwrite');
      revs.forEach(function(rev) {
        var nodes = transaction.objectStore('nodes');
        nodes.get(rev[0]).onsuccess = function(event) {
          var node = event.target.result || makeNode(rev[0]);
          node.revision = rev[1];
          nodes.put(node).onsuccess = function() {
            addToParent(nodes, rev[0], 'cached', rev[1]);
          };
        };
      });
      transaction.oncomplete = function() {
        promise.fulfill();
      };
      transaction.onerror = transaction.onabort = promise.reject;
      return promise;
    },

    getRevision: function(path) {
      var promise = promising();
      var transaction = this.db.transaction(['nodes'], 'readonly');
      var rev;
      transaction.objectStore('nodes').
        get(path).onsuccess = function(evt) {
          if (evt.target.result) {
            rev = evt.target.result.revision;
          }
        };
      transaction.oncomplete = function() {
        promise.fulfill(rev);
      };
      transaction.onerror = transaction.onabort = promise.reject;
      return promise;
    },

    getCached: function(path) {
      if (path[path.length - 1] !== '/') {
        return this.get(path);
      }
      var promise = promising();
      var transaction = this.db.transaction(['nodes'], 'readonly');
      var nodes = transaction.objectStore('nodes');
      nodes.get(path).onsuccess = function(evt) {
        var node = evt.target.result || {};
        promise.fulfill(200, node.cached, node.contentType, node.revision);
      };
      return promise;
    },

    reset: function(callback) {
      var dbName = this.db.name;
      this.db.close();
      var self = this;
      RS.IndexedDB.clean(this.db.name, function() {
        RS.IndexedDB.open(dbName, function(other) {
          // hacky!
          self.db = other.db;
          callback(self);
        });
      });
    },

    fireInitial: function() {
      var transaction = this.db.transaction(['nodes'], 'readonly');
      var cursorReq = transaction.objectStore('nodes').openCursor();
      cursorReq.onsuccess = function(evt) {
        var cursor = evt.target.result;
        if (cursor) {
          var path = cursor.key;
          if (path.substr(-1) !== '/') {
            this._emit('change', {
              path: path,
              origin: 'remote',
              oldValue: undefined,
              newValue: cursor.value.body
            });
          }
          cursor.continue();
        }
      }.bind(this);
    },

    _recordChange: function(path, attributes) {
      var promise = promising();
      var transaction = this.db.transaction(['changes'], 'readwrite');
      var changes = transaction.objectStore('changes');
      var change;
      changes.get(path).onsuccess = function(evt) {
        change = evt.target.result || {};
        change.path = path;
        for(var key in attributes) {
          change[key] = attributes[key];
        }
        changes.put(change);
      };
      transaction.oncomplete = promise.fulfill;
      transaction.onerror = transaction.onabort = promise.reject;
      return promise;
    },

    clearChange: function(path) {
      var promise = promising();
      var transaction = this.db.transaction(['changes'], 'readwrite');
      var changes = transaction.objectStore('changes');
      changes.delete(path);
      transaction.oncomplete = function() {
        promise.fulfill();
      };
      return promise;
    },

    changesBelow: function(path) {
      var promise = promising();
      var transaction = this.db.transaction(['changes'], 'readonly');
      var cursorReq = transaction.objectStore('changes').
        openCursor(IDBKeyRange.lowerBound(path));
      var pl = path.length;
      var changes = [];
      cursorReq.onsuccess = function() {
        var cursor = cursorReq.result;
        if (cursor) {
          if (cursor.key.substr(0, pl) === path) {
            changes.push(cursor.value);
            cursor.continue();
          }
        }
      };
      transaction.oncomplete = function() {
        promise.fulfill(changes);
      };
      return promise;
    },

    setConflict: function(path, attributes) {
      var event = { path: path };
      for(var key in attributes) {
        event[key] = attributes[key];
      }
      this._recordChange(path, { conflict: attributes }).
        then(function() {
          // fire conflict once conflict has been recorded.
          if (this._handlers.conflict.length > 0) {
            this._emit('conflict', event);
          } else {
            setTimeout(function() { event.resolve('remote'); }, 0);
          }
        }.bind(this));
      event.resolve = function(resolution) {
        if (resolution === 'remote' || resolution === 'local') {
          attributes.resolution = resolution;
          this._recordChange(path, { conflict: attributes });
        } else {
          throw "Invalid resolution: " + resolution;
        }
      }.bind(this);
    },

    closeDB: function() {
      this.db.close();
    }

  };

  var DB_VERSION = 2;
  RS.IndexedDB.open = function(name, callback) {
    var timer = setTimeout(function() {
      callback("timeout trying to open db");
    }, 3500);

    var dbOpen = indexedDB.open(name, DB_VERSION);
    dbOpen.onerror = function() {
      console.error('opening db failed', dbOpen);
      alert('remoteStorage not supported (private browsing mode?)');
      clearTimeout(timer);
      callback(dbOpen.error);
    };
    dbOpen.onupgradeneeded = function(event) {
      RemoteStorage.log("[IndexedDB] Upgrade: from ", event.oldVersion, " to ", event.newVersion);
      var db = dbOpen.result;
      if (event.oldVersion !== 1) {
        RemoteStorage.log("[IndexedDB] Creating object store: nodes");
        db.createObjectStore('nodes', { keyPath: 'path' });
      }
      RemoteStorage.log("[IndexedDB] Creating object store: changes");
      db.createObjectStore('changes', { keyPath: 'path' });
    };
    dbOpen.onsuccess = function() {
      clearTimeout(timer);
      callback(null, dbOpen.result);
    };
  };

  RS.IndexedDB.clean = function(databaseName, callback) {
    var req = indexedDB.deleteDatabase(databaseName);
    req.onsuccess = function() {
      RemoteStorage.log('done removing db');
      callback();
    };
    req.onerror = req.onabort = function(evt) {
      console.error('failed to remove database "' + databaseName + '"', evt);
    };
  };

  RS.IndexedDB._rs_init = function(remoteStorage) {
    var promise = promising();
    RS.IndexedDB.open(DEFAULT_DB_NAME, function(err, db) {
      if (err) {
        if (err.name === 'InvalidStateError') {
          // firefox throws this when trying to open an indexedDB in private browsing mode
          err = new Error("IndexedDB couldn't be opened.");
          // instead of a stack trace, display some explaination:
          err.stack = "If you are using Firefox, please disable\nprivate browsing mode.\n\nOtherwise please report your problem\nusing the link below";
          remoteStorage._emit('error', err);
        } else {
          //FIXME or else what?
        }
      } else {
        DEFAULT_DB = db;
        db.onerror = function() { remoteStorage._emit('error', err); };
        promise.fulfill();
      }
    });
    return promise;
  };

  RS.IndexedDB._rs_supported = function() {
    return 'indexedDB' in global;
  };

  RS.IndexedDB._rs_cleanup = function(remoteStorage) {
    if (remoteStorage.local) {
      remoteStorage.local.closeDB();
    }
    var promise = promising();
    RS.IndexedDB.clean(DEFAULT_DB_NAME, function() {
      promise.fulfill();
    });
    return promise;
  };

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/localstorage.js **/
(function(global) {

  var NODES_PREFIX = "remotestorage:cache:nodes:";
  var CHANGES_PREFIX = "remotestorage:cache:changes:";

  RemoteStorage.LocalStorage = function() {
    RemoteStorage.eventHandling(this, 'change', 'conflict');
  };

  function makeNode(path) {
    var node = { path: path };
    if (path[path.length - 1] === '/') {
      node.body = {};
      node.cached = {};
      node.contentType = 'application/json';
    }
    return node;
  }

  function b64ToUint6 (nChr) {
    return nChr > 64 && nChr < 91 ?
      nChr - 65
      : nChr > 96 && nChr < 123 ?
      nChr - 71
      : nChr > 47 && nChr < 58 ?
      nChr + 4
      : nChr === 43 ?
      62
      : nChr === 47 ?
      63
      :
      0;
  }

  function base64DecToArr (sBase64, nBlocksSize) {
    var
    sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
    nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);

    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
      nMod4 = nInIdx & 3;
      nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
      if (nMod4 === 3 || nInLen - nInIdx === 1) {
        for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
          taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
        }
        nUint24 = 0;
      }
    }
    return taBytes;
  }

  // Helper to decide if node body is binary or not
  function isBinary(node){
    return node.match(/charset=binary/);
  }

  RemoteStorage.LocalStorage.prototype = {
    toBase64: function(data){
      var arr = new Uint8Array(data);
      var str = '';
      for(var i = 0; i < arr.length; i++) {
        //atob(btoa(String.fromCharCode(arr[0]))).charCodeAt(0)
        str+=String.fromCharCode(arr[i]);
      }
      return btoa(str);
    },

    toArrayBuffer: base64DecToArr,

    put: function(path, body, contentType, incoming, revision) {
      var oldNode = this._get(path);
      if (isBinary(contentType)){
        body = this.toBase64(body);
      }
      var node = {
        path: path,
        contentType: contentType,
        body: body
      };
      localStorage[NODES_PREFIX + path] = JSON.stringify(node);
      this._addToParent(path, revision);
      this._emit('change', {
        path: path,
        origin: incoming ? 'remote' : 'window',
        oldValue: oldNode ? oldNode.body : undefined,
        newValue: body
      });
      if (! incoming) {
        this._recordChange(path, { action: 'PUT' });
      }
      return promising().fulfill(200);
    },

    get: function(path) {
      var node = this._get(path);
      if (node) {
        if (isBinary(node.contentType)){
          node.body = this.toArrayBuffer(node.body);
        }
        return promising().fulfill(200, node.body, node.contentType, node.revision);
      } else {
        return promising().fulfill(404);
      }
    },

    'delete': function(path, incoming) {
      var oldNode = this._get(path);
      delete localStorage[NODES_PREFIX + path];
      this._removeFromParent(path);
      if (oldNode) {
        this._emit('change', {
          path: path,
          origin: incoming ? 'remote' : 'window',
          oldValue: oldNode.body,
          newValue: undefined
        });
      }
      if (! incoming) {
        this._recordChange(path, { action: 'DELETE' });
      }
      return promising().fulfill(200);
    },

    setRevision: function(path, revision) {
      var node = this._get(path) || makeNode(path);
      node.revision = revision;
      localStorage[NODES_PREFIX + path] = JSON.stringify(node);
      return promising().fulfill();
    },

    getRevision: function(path) {
      var node = this._get(path);
      return promising.fulfill(node ? node.revision : undefined);
    },

    _get: function(path) {
      var node;
      try {
        node = JSON.parse(localStorage[NODES_PREFIX + path]);
      } catch(e) { /* ignored */ }
      return node;
    },

    _recordChange: function(path, attributes) {
      var change;
      try {
        change = JSON.parse(localStorage[CHANGES_PREFIX + path]);
      } catch(e) {
        change = {};
      }
      for(var key in attributes) {
        change[key] = attributes[key];
      }
      change.path = path;
      localStorage[CHANGES_PREFIX + path] = JSON.stringify(change);
    },

    clearChange: function(path) {
      delete localStorage[CHANGES_PREFIX + path];
      return promising().fulfill();
    },

    changesBelow: function(path) {
      var changes = [];
      var kl = localStorage.length;
      var prefix = CHANGES_PREFIX + path, pl = prefix.length;
      for(var i=0;i<kl;i++) {
        var key = localStorage.key(i);
        if (key.substr(0, pl) === prefix) {
          changes.push(JSON.parse(localStorage[key]));
        }
      }
      return promising().fulfill(changes);
    },

    setConflict: function(path, attributes) {
      var event = { path: path };
      for(var key in attributes) {
        event[key] = attributes[key];
      }
      this._recordChange(path, { conflict: attributes });
      event.resolve = function(resolution) {
        if (resolution === 'remote' || resolution === 'local') {
          attributes.resolution = resolution;
          this._recordChange(path, { conflict: attributes });
        } else {
          throw "Invalid resolution: " + resolution;
        }
      }.bind(this);
      this._emit('conflict', event);
    },

    _addToParent: function(path, revision) {
      var parts = path.match(/^(.*\/)([^\/]+\/?)$/);
      if (parts) {
        var dirname = parts[1], basename = parts[2];
        var node = this._get(dirname) || makeNode(dirname);
        node.body[basename] = revision || true;
        localStorage[NODES_PREFIX + dirname] = JSON.stringify(node);
        if (dirname !== '/') {
          this._addToParent(dirname, true);
        }
      }
    },

    _removeFromParent: function(path) {
      var parts = path.match(/^(.*\/)([^\/]+\/?)$/);
      if (parts) {
        var dirname = parts[1], basename = parts[2];
        var node = this._get(dirname);
        if (node) {
          delete node.body[basename];
          if (Object.keys(node.body).length > 0) {
            localStorage[NODES_PREFIX + dirname] = JSON.stringify(node);
          } else {
            delete localStorage[NODES_PREFIX + dirname];
            if (dirname !== '/') {
              this._removeFromParent(dirname);
            }
          }
        }
      }
    },

    fireInitial: function() {
      var l = localStorage.length, npl = NODES_PREFIX.length;
      for(var i=0;i<l;i++) {
        var key = localStorage.key(i);
        if (key.substr(0, npl) === NODES_PREFIX) {
          var path = key.substr(npl);
          var node = this._get(path);
          this._emit('change', {
            path: path,
            origin: 'remote',
            oldValue: undefined,
            newValue: node.body
          });
        }
      }
    }

  };

  RemoteStorage.LocalStorage._rs_init = function() {};

  RemoteStorage.LocalStorage._rs_supported = function() {
    return 'localStorage' in global;
  };

  RemoteStorage.LocalStorage._rs_cleanup = function() {
    var l = localStorage.length;
    var npl = NODES_PREFIX.length, cpl = CHANGES_PREFIX.length;
    var remove = [];
    for(var i=0;i<l;i++) {
      var key = localStorage.key(i);
      if (key.substr(0, npl) === NODES_PREFIX ||
         key.substr(0, cpl) === CHANGES_PREFIX) {
        remove.push(key);
      }
    }
    remove.forEach(function(key) {
      console.log('removing', key);
      delete localStorage[key];
    });
  };

})(typeof(window) !== 'undefined' ? window : global);


/** FILE: src/modules.js **/
(function() {

  RemoteStorage.MODULES = {};

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

    if(moduleName.indexOf('-') != -1) {
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
    if(builder) {
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
        for(var key in source) {
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
        if(i == n) {
          promise.fulfill(results, errors);
        }
      }
      array.forEach(function(item, index) {
        try {
          var result = callback(item);
        } catch(exc) {
          oneDone();
          errors[index] = exc;
        }
        if(typeof(result) == 'object' && typeof(result.then) == 'function') {
          result.then(function(res) { results[index] = res; oneDone(); },
                      function(error) { errors[index] = res; oneDone(); });
        } else {
          oneDone();
          results[index] = result;
        }
      });
      return promise;
    },

    containingDir: function(path) {
      var dir = path.replace(/[^\/]+\/?$/, '');
      return dir == path ? null : dir;
    },

    isDir: function(path) {
      return path.substr(-1) == '/';
    },

    baseName: function(path) {
      var parts = path.split('/');
      if(util.isDir(path)) {
        return parts[parts.length-2]+'/';
      } else {
        return parts[parts.length-1];
      }
    },

    bindAll: function(object) {
      for(var key in this) {
        if(typeof(object[key]) == 'function') {
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

if(typeof(define) == 'function' && define.amd) define([], function() { return RemoteStorage }); else module.exports = RemoteStorage;
