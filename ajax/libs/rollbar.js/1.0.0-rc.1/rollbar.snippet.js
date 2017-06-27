(function(window, document){
var _shimCounter = 0;

function Rollbar(parentShim) {
  this.shimId = ++_shimCounter;
  this.notifier = null;
  this.parentShim = parentShim;
  this.logger = function() {};
  
  if (window.console) {
    if (window.console.shimId === undefined) {
      this.logger = window.console.log;
    }
  }
}

function _rollbarWindowOnError(client, old, args) {
  if (!args[4] && window._rollbarWrappedError) {
    args[4] = window._rollbarWrappedError;
    window._rollbarWrappedError = null;
  }

  client.uncaughtError.apply(client, args);
  if (old) {
    old.apply(window, arguments);
  }
}

Rollbar.init = function(window, config) {
  var alias = config.globalAlias || 'Rollbar';
  if (typeof window[alias] === 'object') {
    return window[alias];
  }

  // Expose the global shim queue
  window._rollbarShimQueue = [];
  window._rollbarWrappedError = null;

  config = config || {};

  var client = new Rollbar();

  return (_wrapInternalErr(function() {
    client.configure(config);

    if (config.captureUncaught) {
      // Create the client and set the onerror handler
      var old = window.onerror;

      window.onerror = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        _rollbarWindowOnError(client, old, args);
      };

      // Adapted from https://github.com/bugsnag/bugsnag-js
      ['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource',
       'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController',
       'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue',
       'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget',
       'XMLHttpRequestUpload'].map(function(global) {
        if (window[global] && window[global].prototype) {
          _extendListenerPrototype(client, window[global].prototype);
        }
      });
    }

    // Expose Rollbar globally
    window[alias] = client;
    return client;
  }, client.logger))();
};

Rollbar.prototype.loadFull = function(window, document, immediate, config) {
  var self = this;
  // Create the main rollbar script loader
  var loader = _wrapInternalErr(function() {
    var s = document.createElement("script");
    var f = document.getElementsByTagName("script")[0];
    s.src = config.rollbarJsUrl;
    s.async = !immediate;

    // NOTE(cory): this may not work for some versions of IE
    s.onload = handleLoadErr;

    f.parentNode.insertBefore(s, f);
  }, this.logger);

  var handleLoadErr = _wrapInternalErr(function() {
    if (window._rollbarPayloadQueue === undefined) {
      // rollbar.js did not load correctly, call any queued callbacks
      // with an error.
      var obj;
      var cb;
      var args;
      var i;
      var err = new Error('rollbar.js did not load');

      // Go through each of the shim objects. If one of their args
      // was a function, treat it as the callback and call it with
      // err as the first arg.
      while ((obj = window._rollbarShimQueue.shift())) {
        args = obj.args;
        for (i = 0; i < args.length; ++i) {
          cb = args[i];
          if (typeof cb === 'function') {
            cb(err);
            break;
          }
        }
      }
    }
  }, this.logger);

  (_wrapInternalErr(function() {
    if (immediate) {
      loader();
    } else {
      // Have the window load up the script ASAP
      if (window.addEventListener) {
        window.addEventListener("load", loader, false);
      } else { 
        window.attachEvent("onload", loader);
      }
    }
  }, this.logger))();
};

Rollbar.prototype.wrap = function(f) {
  var _this = this;

  if (typeof f !== 'function') {
    return f;
  }

  if (f._isWrap) {
    return f;
  }

  if (!f._wrapped) {
    f._wrapped = function () {
      try {
        return f.apply(this, arguments);
      } catch(e) {
        window._rollbarWrappedError = e;
        throw e;
      }
    };

    f._wrapped._isWrap = true;

    for (var prop in f) {
      if (f.hasOwnProperty(prop)) {
        f._wrapped[prop] = f[prop];
      }
    }
  }

  return f._wrapped;
};

// Stub out rollbar.js methods
function stub(method) {
  var R = Rollbar;
  return _wrapInternalErr(function() {
    if (this.notifier) {
      return this.notifier[method].apply(this.notifier, arguments);
    } else {
      var shim = this;
      var isScope = method === 'scope';
      if (isScope) {
        shim = new R(this);
      }
      var args = Array.prototype.slice.call(arguments, 0);
      var data = {shim: shim, method: method, args: args, ts: new Date()};
      window._rollbarShimQueue.push(data);

      if (isScope) {
        return shim;
      }
    }
  });
}

function _extendListenerPrototype(client, prototype) {
  if (prototype.hasOwnProperty && prototype.hasOwnProperty('addEventListener')) {
    var oldAddEventListener = prototype.addEventListener;
    prototype.addEventListener = function(event, callback, bubble) {
      oldAddEventListener.call(this, event, client.wrap(callback), bubble);
    };

    var oldRemoveEventListener = prototype.removeEventListener;
    prototype.removeEventListener = function(event, callback, bubble) {
      oldRemoveEventListener.call(this, event, callback._wrapped || callback, bubble);
    };
  }
}

function _wrapInternalErr(f, logger) {
  logger = logger || this.logger;
  return function() {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      logger('Rollbar internal error:', e);
    }
  };
}

var _methods = 'log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError'.split(',');
for (var i = 0; i < _methods.length; ++i) {
  Rollbar.prototype[_methods[i]] = stub(_methods[i]);
}

var defaultRollbarJsUrl = '//d37gvrvc0wt4s1.cloudfront.net/js/v1.0/rollbar.min.js';
_rollbarConfig.rollbarJsUrl = _rollbarConfig.rollbarJsUrl || defaultRollbarJsUrl;
var r = Rollbar.init(window, _rollbarConfig);
r.loadFull(window, document, false, _rollbarConfig);
})(window, document);