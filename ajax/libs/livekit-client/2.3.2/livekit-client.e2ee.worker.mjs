/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var loglevel = {exports: {}};

/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (module) {
  (function (root, definition) {

    if (module.exports) {
      module.exports = definition();
    } else {
      root.log = definition();
    }
  })(commonjsGlobal, function () {

    // Slightly dubious tricks to cut down minimized file size
    var noop = function () {};
    var undefinedType = "undefined";
    var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
    var logMethods = ["trace", "debug", "info", "warn", "error"];
    var _loggersByName = {};
    var defaultLogger = null;

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
      var method = obj[methodName];
      if (typeof method.bind === 'function') {
        return method.bind(obj);
      } else {
        try {
          return Function.prototype.bind.call(method, obj);
        } catch (e) {
          // Missing bind shim or IE8 + Modernizr, fallback to wrapping
          return function () {
            return Function.prototype.apply.apply(method, [obj, arguments]);
          };
        }
      }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
      if (console.log) {
        if (console.log.apply) {
          console.log.apply(console, arguments);
        } else {
          // In old IE, native console methods themselves don't have apply().
          Function.prototype.apply.apply(console.log, [console, arguments]);
        }
      }
      if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
      if (methodName === 'debug') {
        methodName = 'log';
      }
      if (typeof console === undefinedType) {
        return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
      } else if (methodName === 'trace' && isIE) {
        return traceForIE;
      } else if (console[methodName] !== undefined) {
        return bindMethod(console, methodName);
      } else if (console.log !== undefined) {
        return bindMethod(console, 'log');
      } else {
        return noop;
      }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods() {
      /*jshint validthis:true */
      var level = this.getLevel();

      // Replace the actual methods.
      for (var i = 0; i < logMethods.length; i++) {
        var methodName = logMethods[i];
        this[methodName] = i < level ? noop : this.methodFactory(methodName, level, this.name);
      }

      // Define log.log as an alias for log.debug
      this.log = this.debug;

      // Return any important warnings.
      if (typeof console === undefinedType && level < this.levels.SILENT) {
        return "No console available for logging";
      }
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName) {
      return function () {
        if (typeof console !== undefinedType) {
          replaceLoggingMethods.call(this);
          this[methodName].apply(this, arguments);
        }
      };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, _level, _loggerName) {
      /*jshint validthis:true */
      return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
    function Logger(name, factory) {
      // Private instance variables.
      var self = this;
      /**
       * The level inherited from a parent logger (or a global default). We
       * cache this here rather than delegating to the parent so that it stays
       * in sync with the actual logging methods that we have installed (the
       * parent could change levels but we might not have rebuilt the loggers
       * in this child yet).
       * @type {number}
       */
      var inheritedLevel;
      /**
       * The default level for this logger, if any. If set, this overrides
       * `inheritedLevel`.
       * @type {number|null}
       */
      var defaultLevel;
      /**
       * A user-specific level for this logger. If set, this overrides
       * `defaultLevel`.
       * @type {number|null}
       */
      var userLevel;
      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }
      function persistLevelIfPossible(levelNum) {
        var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
        if (typeof window === undefinedType || !storageKey) return;

        // Use localStorage if available
        try {
          window.localStorage[storageKey] = levelName;
          return;
        } catch (ignore) {}

        // Use session cookie as fallback
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
        } catch (ignore) {}
      }
      function getPersistedLevel() {
        var storedLevel;
        if (typeof window === undefinedType || !storageKey) return;
        try {
          storedLevel = window.localStorage[storageKey];
        } catch (ignore) {}

        // Fallback to cookies if local storage gives us nothing
        if (typeof storedLevel === undefinedType) {
          try {
            var cookie = window.document.cookie;
            var cookieName = encodeURIComponent(storageKey);
            var location = cookie.indexOf(cookieName + "=");
            if (location !== -1) {
              storedLevel = /^([^;]+)/.exec(cookie.slice(location + cookieName.length + 1))[1];
            }
          } catch (ignore) {}
        }

        // If the stored level is not valid, treat it as if nothing was stored.
        if (self.levels[storedLevel] === undefined) {
          storedLevel = undefined;
        }
        return storedLevel;
      }
      function clearPersistedLevel() {
        if (typeof window === undefinedType || !storageKey) return;

        // Use localStorage if available
        try {
          window.localStorage.removeItem(storageKey);
        } catch (ignore) {}

        // Use session cookie as fallback
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        } catch (ignore) {}
      }
      function normalizeLevel(input) {
        var level = input;
        if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
          level = self.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
          return level;
        } else {
          throw new TypeError("log.setLevel() called with invalid level: " + input);
        }
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;
      self.levels = {
        "TRACE": 0,
        "DEBUG": 1,
        "INFO": 2,
        "WARN": 3,
        "ERROR": 4,
        "SILENT": 5
      };
      self.methodFactory = factory || defaultMethodFactory;
      self.getLevel = function () {
        if (userLevel != null) {
          return userLevel;
        } else if (defaultLevel != null) {
          return defaultLevel;
        } else {
          return inheritedLevel;
        }
      };
      self.setLevel = function (level, persist) {
        userLevel = normalizeLevel(level);
        if (persist !== false) {
          // defaults to true
          persistLevelIfPossible(userLevel);
        }

        // NOTE: in v2, this should call rebuild(), which updates children.
        return replaceLoggingMethods.call(self);
      };
      self.setDefaultLevel = function (level) {
        defaultLevel = normalizeLevel(level);
        if (!getPersistedLevel()) {
          self.setLevel(level, false);
        }
      };
      self.resetLevel = function () {
        userLevel = null;
        clearPersistedLevel();
        replaceLoggingMethods.call(self);
      };
      self.enableAll = function (persist) {
        self.setLevel(self.levels.TRACE, persist);
      };
      self.disableAll = function (persist) {
        self.setLevel(self.levels.SILENT, persist);
      };
      self.rebuild = function () {
        if (defaultLogger !== self) {
          inheritedLevel = normalizeLevel(defaultLogger.getLevel());
        }
        replaceLoggingMethods.call(self);
        if (defaultLogger === self) {
          for (var childName in _loggersByName) {
            _loggersByName[childName].rebuild();
          }
        }
      };

      // Initialize all the internal levels.
      inheritedLevel = normalizeLevel(defaultLogger ? defaultLogger.getLevel() : "WARN");
      var initialLevel = getPersistedLevel();
      if (initialLevel != null) {
        userLevel = normalizeLevel(initialLevel);
      }
      replaceLoggingMethods.call(self);
    }

    /*
     *
     * Top-level API
     *
     */

    defaultLogger = new Logger();
    defaultLogger.getLogger = function getLogger(name) {
      if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
        throw new TypeError("You must supply a name when creating a logger.");
      }
      var logger = _loggersByName[name];
      if (!logger) {
        logger = _loggersByName[name] = new Logger(name, defaultLogger.methodFactory);
      }
      return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = typeof window !== undefinedType ? window.log : undefined;
    defaultLogger.noConflict = function () {
      if (typeof window !== undefinedType && window.log === defaultLogger) {
        window.log = _log;
      }
      return defaultLogger;
    };
    defaultLogger.getLoggers = function getLoggers() {
      return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;
    return defaultLogger;
  });
})(loglevel);
var loglevelExports = loglevel.exports;

var LogLevel;
(function (LogLevel) {
  LogLevel[LogLevel["trace"] = 0] = "trace";
  LogLevel[LogLevel["debug"] = 1] = "debug";
  LogLevel[LogLevel["info"] = 2] = "info";
  LogLevel[LogLevel["warn"] = 3] = "warn";
  LogLevel[LogLevel["error"] = 4] = "error";
  LogLevel[LogLevel["silent"] = 5] = "silent";
})(LogLevel || (LogLevel = {}));
var LoggerNames;
(function (LoggerNames) {
  LoggerNames["Default"] = "livekit";
  LoggerNames["Room"] = "livekit-room";
  LoggerNames["Participant"] = "livekit-participant";
  LoggerNames["Track"] = "livekit-track";
  LoggerNames["Publication"] = "livekit-track-publication";
  LoggerNames["Engine"] = "livekit-engine";
  LoggerNames["Signal"] = "livekit-signal";
  LoggerNames["PCManager"] = "livekit-pc-manager";
  LoggerNames["PCTransport"] = "livekit-pc-transport";
  LoggerNames["E2EE"] = "lk-e2ee";
})(LoggerNames || (LoggerNames = {}));
let livekitLogger = loglevelExports.getLogger('livekit');
Object.values(LoggerNames).map(name => loglevelExports.getLogger(name));
livekitLogger.setDefaultLevel(LogLevel.info);
const workerLogger = loglevelExports.getLogger('lk-e2ee');

const ENCRYPTION_ALGORITHM = 'AES-GCM';
// How many consecutive frames can fail decrypting before a particular key gets marked as invalid
const DECRYPTION_FAILURE_TOLERANCE = 10;
// We copy the first bytes of the VP8 payload unencrypted.
// For keyframes this is 10 bytes, for non-keyframes (delta) 3. See
//   https://tools.ietf.org/html/rfc6386#section-9.1
// This allows the bridge to continue detecting keyframes (only one byte needed in the JVB)
// and is also a bit easier for the VP8 decoder (i.e. it generates funny garbage pictures
// instead of being unable to decode).
// This is a bit for show and we might want to reduce to 1 unconditionally in the final version.
//
// For audio (where frame.type is not set) we do not encrypt the opus TOC byte:
//   https://tools.ietf.org/html/rfc6716#section-3.1
const UNENCRYPTED_BYTES = {
  key: 10,
  delta: 3,
  audio: 1,
  // frame.type is not set on audio, so this is set manually
  empty: 0
};
/* We use a 12 byte bit IV. This is signalled in plain together with the
 packet. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#parameters */
const IV_LENGTH = 12;
const SALT = 'LKFrameEncryptionKey';
const KEY_PROVIDER_DEFAULTS = {
  sharedKey: false,
  ratchetSalt: SALT,
  ratchetWindowSize: 8,
  failureTolerance: DECRYPTION_FAILURE_TOLERANCE,
  keyringSize: 16
};
const MAX_SIF_COUNT = 100;
const MAX_SIF_DURATION = 2000;

class LivekitError extends Error {
  constructor(code, message) {
    super(message || 'an error has occured');
    this.code = code;
  }
}
var MediaDeviceFailure;
(function (MediaDeviceFailure) {
  // user rejected permissions
  MediaDeviceFailure["PermissionDenied"] = "PermissionDenied";
  // device is not available
  MediaDeviceFailure["NotFound"] = "NotFound";
  // device is in use. On Windows, only a single tab may get access to a device at a time.
  MediaDeviceFailure["DeviceInUse"] = "DeviceInUse";
  MediaDeviceFailure["Other"] = "Other";
})(MediaDeviceFailure || (MediaDeviceFailure = {}));
(function (MediaDeviceFailure) {
  function getFailure(error) {
    if (error && 'name' in error) {
      if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        return MediaDeviceFailure.NotFound;
      }
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        return MediaDeviceFailure.PermissionDenied;
      }
      if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        return MediaDeviceFailure.DeviceInUse;
      }
      return MediaDeviceFailure.Other;
    }
  }
  MediaDeviceFailure.getFailure = getFailure;
})(MediaDeviceFailure || (MediaDeviceFailure = {}));

var CryptorErrorReason;
(function (CryptorErrorReason) {
  CryptorErrorReason[CryptorErrorReason["InvalidKey"] = 0] = "InvalidKey";
  CryptorErrorReason[CryptorErrorReason["MissingKey"] = 1] = "MissingKey";
  CryptorErrorReason[CryptorErrorReason["InternalError"] = 2] = "InternalError";
})(CryptorErrorReason || (CryptorErrorReason = {}));
class CryptorError extends LivekitError {
  constructor(message) {
    let reason = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CryptorErrorReason.InternalError;
    super(40, message);
    this.reason = reason;
  }
}

var KeyProviderEvent;
(function (KeyProviderEvent) {
  KeyProviderEvent["SetKey"] = "setKey";
  KeyProviderEvent["RatchetRequest"] = "ratchetRequest";
  KeyProviderEvent["KeyRatcheted"] = "keyRatcheted";
})(KeyProviderEvent || (KeyProviderEvent = {}));
var KeyHandlerEvent;
(function (KeyHandlerEvent) {
  KeyHandlerEvent["KeyRatcheted"] = "keyRatcheted";
})(KeyHandlerEvent || (KeyHandlerEvent = {}));
var EncryptionEvent;
(function (EncryptionEvent) {
  EncryptionEvent["ParticipantEncryptionStatusChanged"] = "participantEncryptionStatusChanged";
  EncryptionEvent["EncryptionError"] = "encryptionError";
})(EncryptionEvent || (EncryptionEvent = {}));
var CryptorEvent;
(function (CryptorEvent) {
  CryptorEvent["Error"] = "cryptorError";
})(CryptorEvent || (CryptorEvent = {}));

var events = {exports: {}};

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
events.exports = EventEmitter;
events.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }
  var handler = events[type];
  if (handler === undefined) return false;
  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners = events[type];
  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events !== undefined) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name, resolver, {
      once: true
    });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, {
        once: true
      });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}
var eventsExports = events.exports;

function isVideoFrame(frame) {
  return 'type' in frame;
}
function importKey(keyBytes_1) {
  return __awaiter(this, arguments, void 0, function (keyBytes) {
    let algorithm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      name: ENCRYPTION_ALGORITHM
    };
    let usage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'encrypt';
    return function* () {
      // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
      return crypto.subtle.importKey('raw', keyBytes, algorithm, false, usage === 'derive' ? ['deriveBits', 'deriveKey'] : ['encrypt', 'decrypt']);
    }();
  });
}
function getAlgoOptions(algorithmName, salt) {
  const textEncoder = new TextEncoder();
  const encodedSalt = textEncoder.encode(salt);
  switch (algorithmName) {
    case 'HKDF':
      return {
        name: 'HKDF',
        salt: encodedSalt,
        hash: 'SHA-256',
        info: new ArrayBuffer(128)
      };
    case 'PBKDF2':
      {
        return {
          name: 'PBKDF2',
          salt: encodedSalt,
          hash: 'SHA-256',
          iterations: 100000
        };
      }
    default:
      throw new Error("algorithm ".concat(algorithmName, " is currently unsupported"));
  }
}
/**
 * Derives a set of keys from the master key.
 * See https://tools.ietf.org/html/draft-omara-sframe-00#section-4.3.1
 */
function deriveKeys(material, salt) {
  return __awaiter(this, void 0, void 0, function* () {
    const algorithmOptions = getAlgoOptions(material.algorithm.name, salt);
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#HKDF
    // https://developer.mozilla.org/en-US/docs/Web/API/HkdfParams
    const encryptionKey = yield crypto.subtle.deriveKey(algorithmOptions, material, {
      name: ENCRYPTION_ALGORITHM,
      length: 128
    }, false, ['encrypt', 'decrypt']);
    return {
      material,
      encryptionKey
    };
  });
}
/**
 * Ratchets a key. See
 * https://tools.ietf.org/html/draft-omara-sframe-00#section-4.3.5.1
 */
function ratchet(material, salt) {
  return __awaiter(this, void 0, void 0, function* () {
    const algorithmOptions = getAlgoOptions(material.algorithm.name, salt);
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits
    return crypto.subtle.deriveBits(algorithmOptions, material, 256);
  });
}
function needsRbspUnescaping(frameData) {
  for (var i = 0; i < frameData.length - 3; i++) {
    if (frameData[i] == 0 && frameData[i + 1] == 0 && frameData[i + 2] == 3) return true;
  }
  return false;
}
function parseRbsp(stream) {
  const dataOut = [];
  var length = stream.length;
  for (var i = 0; i < stream.length;) {
    // Be careful about over/underflow here. byte_length_ - 3 can underflow, and
    // i + 3 can overflow, but byte_length_ - i can't, because i < byte_length_
    // above, and that expression will produce the number of bytes left in
    // the stream including the byte at i.
    if (length - i >= 3 && !stream[i] && !stream[i + 1] && stream[i + 2] == 3) {
      // Two rbsp bytes.
      dataOut.push(stream[i++]);
      dataOut.push(stream[i++]);
      // Skip the emulation byte.
      i++;
    } else {
      // Single rbsp byte.
      dataOut.push(stream[i++]);
    }
  }
  return new Uint8Array(dataOut);
}
const kZerosInStartSequence = 2;
const kEmulationByte = 3;
function writeRbsp(data_in) {
  const dataOut = [];
  var numConsecutiveZeros = 0;
  for (var i = 0; i < data_in.length; ++i) {
    var byte = data_in[i];
    if (byte <= kEmulationByte && numConsecutiveZeros >= kZerosInStartSequence) {
      // Need to escape.
      dataOut.push(kEmulationByte);
      numConsecutiveZeros = 0;
    }
    dataOut.push(byte);
    if (byte == 0) {
      ++numConsecutiveZeros;
    } else {
      numConsecutiveZeros = 0;
    }
  }
  return new Uint8Array(dataOut);
}

class SifGuard {
  constructor() {
    this.consecutiveSifCount = 0;
    this.lastSifReceivedAt = 0;
    this.userFramesSinceSif = 0;
  }
  recordSif() {
    var _a;
    this.consecutiveSifCount += 1;
    (_a = this.sifSequenceStartedAt) !== null && _a !== void 0 ? _a : this.sifSequenceStartedAt = Date.now();
    this.lastSifReceivedAt = Date.now();
  }
  recordUserFrame() {
    if (this.sifSequenceStartedAt === undefined) {
      return;
    } else {
      this.userFramesSinceSif += 1;
    }
    if (
    // reset if we received more user frames than SIFs
    this.userFramesSinceSif > this.consecutiveSifCount ||
    // also reset if we got a new user frame and the latest SIF frame hasn't been updated in a while
    Date.now() - this.lastSifReceivedAt > MAX_SIF_DURATION) {
      this.reset();
    }
  }
  isSifAllowed() {
    return this.consecutiveSifCount < MAX_SIF_COUNT && (this.sifSequenceStartedAt === undefined || Date.now() - this.sifSequenceStartedAt < MAX_SIF_DURATION);
  }
  reset() {
    this.userFramesSinceSif = 0;
    this.consecutiveSifCount = 0;
    this.sifSequenceStartedAt = undefined;
  }
}

const encryptionEnabledMap = new Map();
class BaseFrameCryptor extends eventsExports.EventEmitter {
  encodeFunction(encodedFrame, controller) {
    throw Error('not implemented for subclass');
  }
  decodeFunction(encodedFrame, controller) {
    throw Error('not implemented for subclass');
  }
}
/**
 * Cryptor is responsible for en-/decrypting media frames.
 * Each Cryptor instance is responsible for en-/decrypting a single mediaStreamTrack.
 */
class FrameCryptor extends BaseFrameCryptor {
  constructor(opts) {
    var _a;
    super();
    this.sendCounts = new Map();
    this.keys = opts.keys;
    this.participantIdentity = opts.participantIdentity;
    this.rtpMap = new Map();
    this.keyProviderOptions = opts.keyProviderOptions;
    this.sifTrailer = (_a = opts.sifTrailer) !== null && _a !== void 0 ? _a : Uint8Array.from([]);
    this.sifGuard = new SifGuard();
  }
  get logContext() {
    return {
      participant: this.participantIdentity,
      mediaTrackId: this.trackId,
      fallbackCodec: this.videoCodec
    };
  }
  /**
   * Assign a different participant to the cryptor.
   * useful for transceiver re-use
   * @param id
   * @param keys
   */
  setParticipant(id, keys) {
    workerLogger.debug('setting new participant on cryptor', Object.assign(Object.assign({}, this.logContext), {
      participant: id
    }));
    if (this.participantIdentity) {
      workerLogger.error('cryptor has already a participant set, participant should have been unset before', Object.assign({}, this.logContext));
    }
    this.participantIdentity = id;
    this.keys = keys;
    this.sifGuard.reset();
  }
  unsetParticipant() {
    workerLogger.debug('unsetting participant', this.logContext);
    this.participantIdentity = undefined;
  }
  isEnabled() {
    if (this.participantIdentity) {
      return encryptionEnabledMap.get(this.participantIdentity);
    } else {
      return undefined;
    }
  }
  getParticipantIdentity() {
    return this.participantIdentity;
  }
  getTrackId() {
    return this.trackId;
  }
  /**
   * Update the video codec used by the mediaStreamTrack
   * @param codec
   */
  setVideoCodec(codec) {
    this.videoCodec = codec;
  }
  /**
   * rtp payload type map used for figuring out codec of payload type when encoding
   * @param map
   */
  setRtpMap(map) {
    this.rtpMap = map;
  }
  setupTransform(operation, readable, writable, trackId, codec) {
    if (codec) {
      workerLogger.info('setting codec on cryptor to', {
        codec
      });
      this.videoCodec = codec;
    }
    workerLogger.debug('Setting up frame cryptor transform', Object.assign({
      operation,
      passedTrackId: trackId,
      codec
    }, this.logContext));
    const transformFn = operation === 'encode' ? this.encodeFunction : this.decodeFunction;
    const transformStream = new TransformStream({
      transform: transformFn.bind(this)
    });
    readable.pipeThrough(transformStream).pipeTo(writable).catch(e => {
      workerLogger.warn(e);
      this.emit(CryptorEvent.Error, e instanceof CryptorError ? e : new CryptorError(e.message));
    });
    this.trackId = trackId;
  }
  setSifTrailer(trailer) {
    workerLogger.debug('setting SIF trailer', Object.assign(Object.assign({}, this.logContext), {
      trailer
    }));
    this.sifTrailer = trailer;
  }
  /**
   * Function that will be injected in a stream and will encrypt the given encoded frames.
   *
   * @param {RTCEncodedVideoFrame|RTCEncodedAudioFrame} encodedFrame - Encoded video frame.
   * @param {TransformStreamDefaultController} controller - TransportStreamController.
   *
   * The VP8 payload descriptor described in
   * https://tools.ietf.org/html/rfc7741#section-4.2
   * is part of the RTP packet and not part of the frame and is not controllable by us.
   * This is fine as the SFU keeps having access to it for routing.
   *
   * The encrypted frame is formed as follows:
   * 1) Find unencrypted byte length, depending on the codec, frame type and kind.
   * 2) Form the GCM IV for the frame as described above.
   * 3) Encrypt the rest of the frame using AES-GCM.
   * 4) Allocate space for the encrypted frame.
   * 5) Copy the unencrypted bytes to the start of the encrypted frame.
   * 6) Append the ciphertext to the encrypted frame.
   * 7) Append the IV.
   * 8) Append a single byte for the key identifier.
   * 9) Enqueue the encrypted frame for sending.
   */
  encodeFunction(encodedFrame, controller) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      if (!this.isEnabled() ||
      // skip for encryption for empty dtx frames
      encodedFrame.data.byteLength === 0) {
        return controller.enqueue(encodedFrame);
      }
      const keySet = this.keys.getKeySet();
      if (!keySet) {
        throw new TypeError("key set not found for ".concat(this.participantIdentity, " at index ").concat(this.keys.getCurrentKeyIndex()));
      }
      const {
        encryptionKey
      } = keySet;
      const keyIndex = this.keys.getCurrentKeyIndex();
      if (encryptionKey) {
        const iv = this.makeIV((_a = encodedFrame.getMetadata().synchronizationSource) !== null && _a !== void 0 ? _a : -1, encodedFrame.timestamp);
        let frameInfo = this.getUnencryptedBytes(encodedFrame);
        // Thіs is not encrypted and contains the VP8 payload descriptor or the Opus TOC byte.
        const frameHeader = new Uint8Array(encodedFrame.data, 0, frameInfo.unencryptedBytes);
        // Frame trailer contains the R|IV_LENGTH and key index
        const frameTrailer = new Uint8Array(2);
        frameTrailer[0] = IV_LENGTH;
        frameTrailer[1] = keyIndex;
        // Construct frame trailer. Similar to the frame header described in
        // https://tools.ietf.org/html/draft-omara-sframe-00#section-4.2
        // but we put it at the end.
        //
        // ---------+-------------------------+-+---------+----
        // payload  |IV...(length = IV_LENGTH)|R|IV_LENGTH|KID |
        // ---------+-------------------------+-+---------+----
        try {
          const cipherText = yield crypto.subtle.encrypt({
            name: ENCRYPTION_ALGORITHM,
            iv,
            additionalData: new Uint8Array(encodedFrame.data, 0, frameHeader.byteLength)
          }, encryptionKey, new Uint8Array(encodedFrame.data, frameInfo.unencryptedBytes));
          let newDataWithoutHeader = new Uint8Array(cipherText.byteLength + iv.byteLength + frameTrailer.byteLength);
          newDataWithoutHeader.set(new Uint8Array(cipherText)); // add ciphertext.
          newDataWithoutHeader.set(new Uint8Array(iv), cipherText.byteLength); // append IV.
          newDataWithoutHeader.set(frameTrailer, cipherText.byteLength + iv.byteLength); // append frame trailer.
          if (frameInfo.isH264) {
            newDataWithoutHeader = writeRbsp(newDataWithoutHeader);
          }
          var newData = new Uint8Array(frameHeader.byteLength + newDataWithoutHeader.byteLength);
          newData.set(frameHeader);
          newData.set(newDataWithoutHeader, frameHeader.byteLength);
          encodedFrame.data = newData.buffer;
          return controller.enqueue(encodedFrame);
        } catch (e) {
          // TODO: surface this to the app.
          workerLogger.error(e);
        }
      } else {
        workerLogger.debug('failed to decrypt, emitting error', this.logContext);
        this.emit(CryptorEvent.Error, new CryptorError("encryption key missing for encoding", CryptorErrorReason.MissingKey));
      }
    });
  }
  /**
   * Function that will be injected in a stream and will decrypt the given encoded frames.
   *
   * @param {RTCEncodedVideoFrame|RTCEncodedAudioFrame} encodedFrame - Encoded video frame.
   * @param {TransformStreamDefaultController} controller - TransportStreamController.
   */
  decodeFunction(encodedFrame, controller) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.isEnabled() ||
      // skip for decryption for empty dtx frames
      encodedFrame.data.byteLength === 0) {
        workerLogger.debug('skipping empty frame', this.logContext);
        this.sifGuard.recordUserFrame();
        return controller.enqueue(encodedFrame);
      }
      if (isFrameServerInjected(encodedFrame.data, this.sifTrailer)) {
        workerLogger.debug('enqueue SIF', this.logContext);
        this.sifGuard.recordSif();
        if (this.sifGuard.isSifAllowed()) {
          encodedFrame.data = encodedFrame.data.slice(0, encodedFrame.data.byteLength - this.sifTrailer.byteLength);
          return controller.enqueue(encodedFrame);
        } else {
          workerLogger.warn('SIF limit reached, dropping frame');
          return;
        }
      } else {
        this.sifGuard.recordUserFrame();
      }
      const data = new Uint8Array(encodedFrame.data);
      const keyIndex = data[encodedFrame.data.byteLength - 1];
      if (this.keys.getKeySet(keyIndex) && this.keys.hasValidKey) {
        try {
          const decodedFrame = yield this.decryptFrame(encodedFrame, keyIndex);
          this.keys.decryptionSuccess();
          if (decodedFrame) {
            return controller.enqueue(decodedFrame);
          }
        } catch (error) {
          if (error instanceof CryptorError && error.reason === CryptorErrorReason.InvalidKey) {
            if (this.keys.hasValidKey) {
              this.emit(CryptorEvent.Error, error);
              this.keys.decryptionFailure();
            }
          } else {
            workerLogger.warn('decoding frame failed', {
              error
            });
          }
        }
      } else if (!this.keys.getKeySet(keyIndex) && this.keys.hasValidKey) {
        // emit an error in case the key index is out of bounds but the key handler thinks we still have a valid key
        workerLogger.warn("skipping decryption due to missing key at index ".concat(keyIndex));
        this.emit(CryptorEvent.Error, new CryptorError("missing key at index ".concat(keyIndex, " for participant ").concat(this.participantIdentity), CryptorErrorReason.MissingKey));
      }
    });
  }
  /**
   * Function that will decrypt the given encoded frame. If the decryption fails, it will
   * ratchet the key for up to RATCHET_WINDOW_SIZE times.
   */
  decryptFrame(encodedFrame_1, keyIndex_1) {
    return __awaiter(this, arguments, void 0, function (encodedFrame, keyIndex) {
      var _this = this;
      let initialMaterial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      let ratchetOpts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        ratchetCount: 0
      };
      return function* () {
        var _a;
        const keySet = _this.keys.getKeySet(keyIndex);
        if (!ratchetOpts.encryptionKey && !keySet) {
          throw new TypeError("no encryption key found for decryption of ".concat(_this.participantIdentity));
        }
        let frameInfo = _this.getUnencryptedBytes(encodedFrame);
        // Construct frame trailer. Similar to the frame header described in
        // https://tools.ietf.org/html/draft-omara-sframe-00#section-4.2
        // but we put it at the end.
        //
        // ---------+-------------------------+-+---------+----
        // payload  |IV...(length = IV_LENGTH)|R|IV_LENGTH|KID |
        // ---------+-------------------------+-+---------+----
        try {
          const frameHeader = new Uint8Array(encodedFrame.data, 0, frameInfo.unencryptedBytes);
          var encryptedData = new Uint8Array(encodedFrame.data, frameHeader.length, encodedFrame.data.byteLength - frameHeader.length);
          if (frameInfo.isH264 && needsRbspUnescaping(encryptedData)) {
            encryptedData = parseRbsp(encryptedData);
            const newUint8 = new Uint8Array(frameHeader.byteLength + encryptedData.byteLength);
            newUint8.set(frameHeader);
            newUint8.set(encryptedData, frameHeader.byteLength);
            encodedFrame.data = newUint8.buffer;
          }
          const frameTrailer = new Uint8Array(encodedFrame.data, encodedFrame.data.byteLength - 2, 2);
          const ivLength = frameTrailer[0];
          const iv = new Uint8Array(encodedFrame.data, encodedFrame.data.byteLength - ivLength - frameTrailer.byteLength, ivLength);
          const cipherTextStart = frameHeader.byteLength;
          const cipherTextLength = encodedFrame.data.byteLength - (frameHeader.byteLength + ivLength + frameTrailer.byteLength);
          const plainText = yield crypto.subtle.decrypt({
            name: ENCRYPTION_ALGORITHM,
            iv,
            additionalData: new Uint8Array(encodedFrame.data, 0, frameHeader.byteLength)
          }, (_a = ratchetOpts.encryptionKey) !== null && _a !== void 0 ? _a : keySet.encryptionKey, new Uint8Array(encodedFrame.data, cipherTextStart, cipherTextLength));
          const newData = new ArrayBuffer(frameHeader.byteLength + plainText.byteLength);
          const newUint8 = new Uint8Array(newData);
          newUint8.set(new Uint8Array(encodedFrame.data, 0, frameHeader.byteLength));
          newUint8.set(new Uint8Array(plainText), frameHeader.byteLength);
          encodedFrame.data = newData;
          return encodedFrame;
        } catch (error) {
          if (_this.keyProviderOptions.ratchetWindowSize > 0) {
            if (ratchetOpts.ratchetCount < _this.keyProviderOptions.ratchetWindowSize) {
              workerLogger.debug("ratcheting key attempt ".concat(ratchetOpts.ratchetCount, " of ").concat(_this.keyProviderOptions.ratchetWindowSize, ", for kind ").concat(encodedFrame instanceof RTCEncodedAudioFrame ? 'audio' : 'video'));
              let ratchetedKeySet;
              if ((initialMaterial !== null && initialMaterial !== void 0 ? initialMaterial : keySet) === _this.keys.getKeySet(keyIndex)) {
                // only ratchet if the currently set key is still the same as the one used to decrypt this frame
                // if not, it might be that a different frame has already ratcheted and we try with that one first
                const newMaterial = yield _this.keys.ratchetKey(keyIndex, false);
                ratchetedKeySet = yield deriveKeys(newMaterial, _this.keyProviderOptions.ratchetSalt);
              }
              const frame = yield _this.decryptFrame(encodedFrame, keyIndex, initialMaterial || keySet, {
                ratchetCount: ratchetOpts.ratchetCount + 1,
                encryptionKey: ratchetedKeySet === null || ratchetedKeySet === void 0 ? void 0 : ratchetedKeySet.encryptionKey
              });
              if (frame && ratchetedKeySet) {
                // before updating the keys, make sure that the keySet used for this frame is still the same as the currently set key
                // if it's not, a new key might have been set already, which we don't want to override
                if ((initialMaterial !== null && initialMaterial !== void 0 ? initialMaterial : keySet) === _this.keys.getKeySet(keyIndex)) {
                  _this.keys.setKeySet(ratchetedKeySet, keyIndex, true);
                  // decryption was successful, set the new key index to reflect the ratcheted key set
                  _this.keys.setCurrentKeyIndex(keyIndex);
                }
              }
              return frame;
            } else {
              /**
               * Because we only set a new key once decryption has been successful,
               * we can be sure that we don't need to reset the key to the initial material at this point
               * as the key has not been updated on the keyHandler instance
               */
              workerLogger.warn('maximum ratchet attempts exceeded');
              throw new CryptorError("valid key missing for participant ".concat(_this.participantIdentity), CryptorErrorReason.InvalidKey);
            }
          } else {
            throw new CryptorError("Decryption failed: ".concat(error.message), CryptorErrorReason.InvalidKey);
          }
        }
      }();
    });
  }
  /**
   * Construct the IV used for AES-GCM and sent (in plain) with the packet similar to
   * https://tools.ietf.org/html/rfc7714#section-8.1
   * It concatenates
   * - the 32 bit synchronization source (SSRC) given on the encoded frame,
   * - the 32 bit rtp timestamp given on the encoded frame,
   * - a send counter that is specific to the SSRC. Starts at a random number.
   * The send counter is essentially the pictureId but we currently have to implement this ourselves.
   * There is no XOR with a salt. Note that this IV leaks the SSRC to the receiver but since this is
   * randomly generated and SFUs may not rewrite this is considered acceptable.
   * The SSRC is used to allow demultiplexing multiple streams with the same key, as described in
   *   https://tools.ietf.org/html/rfc3711#section-4.1.1
   * The RTP timestamp is 32 bits and advances by the codec clock rate (90khz for video, 48khz for
   * opus audio) every second. For video it rolls over roughly every 13 hours.
   * The send counter will advance at the frame rate (30fps for video, 50fps for 20ms opus audio)
   * every second. It will take a long time to roll over.
   *
   * See also https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
   */
  makeIV(synchronizationSource, timestamp) {
    var _a;
    const iv = new ArrayBuffer(IV_LENGTH);
    const ivView = new DataView(iv);
    // having to keep our own send count (similar to a picture id) is not ideal.
    if (!this.sendCounts.has(synchronizationSource)) {
      // Initialize with a random offset, similar to the RTP sequence number.
      this.sendCounts.set(synchronizationSource, Math.floor(Math.random() * 0xffff));
    }
    const sendCount = (_a = this.sendCounts.get(synchronizationSource)) !== null && _a !== void 0 ? _a : 0;
    ivView.setUint32(0, synchronizationSource);
    ivView.setUint32(4, timestamp);
    ivView.setUint32(8, timestamp - sendCount % 0xffff);
    this.sendCounts.set(synchronizationSource, sendCount + 1);
    return iv;
  }
  getUnencryptedBytes(frame) {
    var _a;
    var frameInfo = {
      unencryptedBytes: 0,
      isH264: false
    };
    if (isVideoFrame(frame)) {
      let detectedCodec = (_a = this.getVideoCodec(frame)) !== null && _a !== void 0 ? _a : this.videoCodec;
      if (detectedCodec !== this.detectedCodec) {
        workerLogger.debug('detected different codec', Object.assign({
          detectedCodec,
          oldCodec: this.detectedCodec
        }, this.logContext));
        this.detectedCodec = detectedCodec;
      }
      if (detectedCodec === 'av1') {
        throw new Error("".concat(detectedCodec, " is not yet supported for end to end encryption"));
      }
      if (detectedCodec === 'vp8') {
        frameInfo.unencryptedBytes = UNENCRYPTED_BYTES[frame.type];
      } else if (detectedCodec === 'vp9') {
        frameInfo.unencryptedBytes = 0;
        return frameInfo;
      }
      const data = new Uint8Array(frame.data);
      try {
        const naluIndices = findNALUIndices(data);
        // if the detected codec is undefined we test whether it _looks_ like a h264 frame as a best guess
        frameInfo.isH264 = detectedCodec === 'h264' || naluIndices.some(naluIndex => [NALUType.SLICE_IDR, NALUType.SLICE_NON_IDR].includes(parseNALUType(data[naluIndex])));
        if (frameInfo.isH264) {
          for (const index of naluIndices) {
            let type = parseNALUType(data[index]);
            switch (type) {
              case NALUType.SLICE_IDR:
              case NALUType.SLICE_NON_IDR:
                frameInfo.unencryptedBytes = index + 2;
                return frameInfo;
              default:
                break;
            }
          }
          throw new TypeError('Could not find NALU');
        }
      } catch (e) {
        // no op, we just continue and fallback to vp8
      }
      frameInfo.unencryptedBytes = UNENCRYPTED_BYTES[frame.type];
      return frameInfo;
    } else {
      frameInfo.unencryptedBytes = UNENCRYPTED_BYTES.audio;
      return frameInfo;
    }
  }
  /**
   * inspects frame payloadtype if available and maps it to the codec specified in rtpMap
   */
  getVideoCodec(frame) {
    if (this.rtpMap.size === 0) {
      return undefined;
    }
    const payloadType = frame.getMetadata().payloadType;
    const codec = payloadType ? this.rtpMap.get(payloadType) : undefined;
    return codec;
  }
}
/**
 * Slice the NALUs present in the supplied buffer, assuming it is already byte-aligned
 * code adapted from https://github.com/medooze/h264-frame-parser/blob/main/lib/NalUnits.ts to return indices only
 */
function findNALUIndices(stream) {
  const result = [];
  let start = 0,
    pos = 0,
    searchLength = stream.length - 2;
  while (pos < searchLength) {
    // skip until end of current NALU
    while (pos < searchLength && !(stream[pos] === 0 && stream[pos + 1] === 0 && stream[pos + 2] === 1)) pos++;
    if (pos >= searchLength) pos = stream.length;
    // remove trailing zeros from current NALU
    let end = pos;
    while (end > start && stream[end - 1] === 0) end--;
    // save current NALU
    if (start === 0) {
      if (end !== start) throw TypeError('byte stream contains leading data');
    } else {
      result.push(start);
    }
    // begin new NALU
    start = pos = pos + 3;
  }
  return result;
}
function parseNALUType(startByte) {
  return startByte & kNaluTypeMask;
}
const kNaluTypeMask = 0x1f;
var NALUType;
(function (NALUType) {
  /** Coded slice of a non-IDR picture */
  NALUType[NALUType["SLICE_NON_IDR"] = 1] = "SLICE_NON_IDR";
  /** Coded slice data partition A */
  NALUType[NALUType["SLICE_PARTITION_A"] = 2] = "SLICE_PARTITION_A";
  /** Coded slice data partition B */
  NALUType[NALUType["SLICE_PARTITION_B"] = 3] = "SLICE_PARTITION_B";
  /** Coded slice data partition C */
  NALUType[NALUType["SLICE_PARTITION_C"] = 4] = "SLICE_PARTITION_C";
  /** Coded slice of an IDR picture */
  NALUType[NALUType["SLICE_IDR"] = 5] = "SLICE_IDR";
  /** Supplemental enhancement information */
  NALUType[NALUType["SEI"] = 6] = "SEI";
  /** Sequence parameter set */
  NALUType[NALUType["SPS"] = 7] = "SPS";
  /** Picture parameter set */
  NALUType[NALUType["PPS"] = 8] = "PPS";
  /** Access unit delimiter */
  NALUType[NALUType["AUD"] = 9] = "AUD";
  /** End of sequence */
  NALUType[NALUType["END_SEQ"] = 10] = "END_SEQ";
  /** End of stream */
  NALUType[NALUType["END_STREAM"] = 11] = "END_STREAM";
  /** Filler data */
  NALUType[NALUType["FILLER_DATA"] = 12] = "FILLER_DATA";
  /** Sequence parameter set extension */
  NALUType[NALUType["SPS_EXT"] = 13] = "SPS_EXT";
  /** Prefix NAL unit */
  NALUType[NALUType["PREFIX_NALU"] = 14] = "PREFIX_NALU";
  /** Subset sequence parameter set */
  NALUType[NALUType["SUBSET_SPS"] = 15] = "SUBSET_SPS";
  /** Depth parameter set */
  NALUType[NALUType["DPS"] = 16] = "DPS";
  // 17, 18 reserved
  /** Coded slice of an auxiliary coded picture without partitioning */
  NALUType[NALUType["SLICE_AUX"] = 19] = "SLICE_AUX";
  /** Coded slice extension */
  NALUType[NALUType["SLICE_EXT"] = 20] = "SLICE_EXT";
  /** Coded slice extension for a depth view component or a 3D-AVC texture view component */
  NALUType[NALUType["SLICE_LAYER_EXT"] = 21] = "SLICE_LAYER_EXT";
  // 22, 23 reserved
})(NALUType || (NALUType = {}));
/**
 * we use a magic frame trailer to detect whether a frame is injected
 * by the livekit server and thus to be treated as unencrypted
 * @internal
 */
function isFrameServerInjected(frameData, trailerBytes) {
  if (trailerBytes.byteLength === 0) {
    return false;
  }
  const frameTrailer = new Uint8Array(frameData.slice(frameData.byteLength - trailerBytes.byteLength));
  return trailerBytes.every((value, index) => value === frameTrailer[index]);
}

// TODO ParticipantKeyHandlers currently don't get destroyed on participant disconnect
// we could do this by having a separate worker message on participant disconnected.
/**
 * ParticipantKeyHandler is responsible for providing a cryptor instance with the
 * en-/decryption key of a participant. It assumes that all tracks of a specific participant
 * are encrypted with the same key.
 * Additionally it exposes a method to ratchet a key which can be used by the cryptor either automatically
 * if decryption fails or can be triggered manually on both sender and receiver side.
 *
 */
class ParticipantKeyHandler extends eventsExports.EventEmitter {
  get hasValidKey() {
    return this._hasValidKey;
  }
  constructor(participantIdentity, keyProviderOptions) {
    super();
    this.decryptionFailureCount = 0;
    this._hasValidKey = true;
    this.currentKeyIndex = 0;
    if (keyProviderOptions.keyringSize < 1 || keyProviderOptions.keyringSize > 255) {
      throw new TypeError('Keyring size needs to be between 1 and 256');
    }
    this.cryptoKeyRing = new Array(keyProviderOptions.keyringSize).fill(undefined);
    this.keyProviderOptions = keyProviderOptions;
    this.ratchetPromiseMap = new Map();
    this.participantIdentity = participantIdentity;
    this.resetKeyStatus();
  }
  decryptionFailure() {
    if (this.keyProviderOptions.failureTolerance < 0) {
      return;
    }
    this.decryptionFailureCount += 1;
    if (this.decryptionFailureCount > this.keyProviderOptions.failureTolerance) {
      workerLogger.warn("key for ".concat(this.participantIdentity, " is being marked as invalid"));
      this._hasValidKey = false;
    }
  }
  decryptionSuccess() {
    this.resetKeyStatus();
  }
  /**
   * Call this after user initiated ratchet or a new key has been set in order to make sure to mark potentially
   * invalid keys as valid again
   */
  resetKeyStatus() {
    this.decryptionFailureCount = 0;
    this._hasValidKey = true;
  }
  /**
   * Ratchets the current key (or the one at keyIndex if provided) and
   * returns the ratcheted material
   * if `setKey` is true (default), it will also set the ratcheted key directly on the crypto key ring
   * @param keyIndex
   * @param setKey
   */
  ratchetKey(keyIndex) {
    let setKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const currentKeyIndex = keyIndex !== null && keyIndex !== void 0 ? keyIndex : this.getCurrentKeyIndex();
    const existingPromise = this.ratchetPromiseMap.get(currentKeyIndex);
    if (typeof existingPromise !== 'undefined') {
      return existingPromise;
    }
    const ratchetPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      try {
        const keySet = this.getKeySet(currentKeyIndex);
        if (!keySet) {
          throw new TypeError("Cannot ratchet key without a valid keyset of participant ".concat(this.participantIdentity));
        }
        const currentMaterial = keySet.material;
        const newMaterial = yield importKey(yield ratchet(currentMaterial, this.keyProviderOptions.ratchetSalt), currentMaterial.algorithm.name, 'derive');
        if (setKey) {
          this.setKeyFromMaterial(newMaterial, currentKeyIndex, true);
          this.emit(KeyHandlerEvent.KeyRatcheted, newMaterial, this.participantIdentity, currentKeyIndex);
        }
        resolve(newMaterial);
      } catch (e) {
        reject(e);
      } finally {
        this.ratchetPromiseMap.delete(currentKeyIndex);
      }
    }));
    this.ratchetPromiseMap.set(currentKeyIndex, ratchetPromise);
    return ratchetPromise;
  }
  /**
   * takes in a key material with `deriveBits` and `deriveKey` set as key usages
   * and derives encryption keys from the material and sets it on the key ring buffer
   * together with the material
   * also resets the valid key property and updates the currentKeyIndex
   */
  setKey(material_1) {
    return __awaiter(this, arguments, void 0, function (material) {
      var _this = this;
      let keyIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return function* () {
        yield _this.setKeyFromMaterial(material, keyIndex);
        _this.resetKeyStatus();
      }();
    });
  }
  /**
   * takes in a key material with `deriveBits` and `deriveKey` set as key usages
   * and derives encryption keys from the material and sets it on the key ring buffers
   * together with the material
   * also updates the currentKeyIndex
   */
  setKeyFromMaterial(material_1, keyIndex_1) {
    return __awaiter(this, arguments, void 0, function (material, keyIndex) {
      var _this2 = this;
      let emitRatchetEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return function* () {
        const keySet = yield deriveKeys(material, _this2.keyProviderOptions.ratchetSalt);
        const newIndex = keyIndex >= 0 ? keyIndex % _this2.cryptoKeyRing.length : _this2.currentKeyIndex;
        workerLogger.debug("setting new key with index ".concat(keyIndex), {
          usage: material.usages,
          algorithm: material.algorithm,
          ratchetSalt: _this2.keyProviderOptions.ratchetSalt
        });
        _this2.setKeySet(keySet, newIndex, emitRatchetEvent);
        if (newIndex >= 0) _this2.currentKeyIndex = newIndex;
      }();
    });
  }
  setKeySet(keySet, keyIndex) {
    let emitRatchetEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    this.cryptoKeyRing[keyIndex % this.cryptoKeyRing.length] = keySet;
    if (emitRatchetEvent) {
      this.emit(KeyHandlerEvent.KeyRatcheted, keySet.material, this.participantIdentity, keyIndex);
    }
  }
  setCurrentKeyIndex(index) {
    return __awaiter(this, void 0, void 0, function* () {
      this.currentKeyIndex = index % this.cryptoKeyRing.length;
      this.resetKeyStatus();
    });
  }
  getCurrentKeyIndex() {
    return this.currentKeyIndex;
  }
  /**
   * returns currently used KeySet or the one at `keyIndex` if provided
   * @param keyIndex
   * @returns
   */
  getKeySet(keyIndex) {
    return this.cryptoKeyRing[keyIndex !== null && keyIndex !== void 0 ? keyIndex : this.currentKeyIndex];
  }
}

const participantCryptors = [];
const participantKeys = new Map();
let sharedKeyHandler;
let isEncryptionEnabled = false;
let useSharedKey = false;
let sifTrailer;
let keyProviderOptions = KEY_PROVIDER_DEFAULTS;
let rtpMap = new Map();
workerLogger.setDefaultLevel('info');
onmessage = ev => {
  const {
    kind,
    data
  } = ev.data;
  switch (kind) {
    case 'init':
      workerLogger.setLevel(data.loglevel);
      workerLogger.info('worker initialized');
      keyProviderOptions = data.keyProviderOptions;
      useSharedKey = !!data.keyProviderOptions.sharedKey;
      // acknowledge init successful
      const ackMsg = {
        kind: 'initAck',
        data: {
          enabled: isEncryptionEnabled
        }
      };
      postMessage(ackMsg);
      break;
    case 'enable':
      setEncryptionEnabled(data.enabled, data.participantIdentity);
      workerLogger.info("updated e2ee enabled status for ".concat(data.participantIdentity, " to ").concat(data.enabled));
      // acknowledge enable call successful
      postMessage(ev.data);
      break;
    case 'decode':
      let cryptor = getTrackCryptor(data.participantIdentity, data.trackId);
      cryptor.setupTransform(kind, data.readableStream, data.writableStream, data.trackId, data.codec);
      break;
    case 'encode':
      let pubCryptor = getTrackCryptor(data.participantIdentity, data.trackId);
      pubCryptor.setupTransform(kind, data.readableStream, data.writableStream, data.trackId, data.codec);
      break;
    case 'setKey':
      if (useSharedKey) {
        setSharedKey(data.key, data.keyIndex);
      } else if (data.participantIdentity) {
        workerLogger.info("set participant sender key ".concat(data.participantIdentity, " index ").concat(data.keyIndex));
        getParticipantKeyHandler(data.participantIdentity).setKey(data.key, data.keyIndex);
      } else {
        workerLogger.error('no participant Id was provided and shared key usage is disabled');
      }
      break;
    case 'removeTransform':
      unsetCryptorParticipant(data.trackId, data.participantIdentity);
      break;
    case 'updateCodec':
      getTrackCryptor(data.participantIdentity, data.trackId).setVideoCodec(data.codec);
      break;
    case 'setRTPMap':
      // this is only used for the local participant
      rtpMap = data.map;
      participantCryptors.forEach(cr => {
        if (cr.getParticipantIdentity() === data.participantIdentity) {
          cr.setRtpMap(data.map);
        }
      });
      break;
    case 'ratchetRequest':
      handleRatchetRequest(data);
      break;
    case 'setSifTrailer':
      handleSifTrailer(data.trailer);
      break;
  }
};
function handleRatchetRequest(data) {
  return __awaiter(this, void 0, void 0, function* () {
    if (useSharedKey) {
      const keyHandler = getSharedKeyHandler();
      yield keyHandler.ratchetKey(data.keyIndex);
      keyHandler.resetKeyStatus();
    } else if (data.participantIdentity) {
      const keyHandler = getParticipantKeyHandler(data.participantIdentity);
      yield keyHandler.ratchetKey(data.keyIndex);
      keyHandler.resetKeyStatus();
    } else {
      workerLogger.error('no participant Id was provided for ratchet request and shared key usage is disabled');
    }
  });
}
function getTrackCryptor(participantIdentity, trackId) {
  let cryptors = participantCryptors.filter(c => c.getTrackId() === trackId);
  if (cryptors.length > 1) {
    const debugInfo = cryptors.map(c => {
      return {
        participant: c.getParticipantIdentity()
      };
    }).join(',');
    workerLogger.error("Found multiple cryptors for the same trackID ".concat(trackId, ". target participant: ").concat(participantIdentity, " "), {
      participants: debugInfo
    });
  }
  let cryptor = cryptors[0];
  if (!cryptor) {
    workerLogger.info('creating new cryptor for', {
      participantIdentity
    });
    if (!keyProviderOptions) {
      throw Error('Missing keyProvider options');
    }
    cryptor = new FrameCryptor({
      participantIdentity,
      keys: getParticipantKeyHandler(participantIdentity),
      keyProviderOptions,
      sifTrailer
    });
    cryptor.setRtpMap(rtpMap);
    setupCryptorErrorEvents(cryptor);
    participantCryptors.push(cryptor);
  } else if (participantIdentity !== cryptor.getParticipantIdentity()) {
    // assign new participant id to track cryptor and pass in correct key handler
    cryptor.setParticipant(participantIdentity, getParticipantKeyHandler(participantIdentity));
  }
  return cryptor;
}
function getParticipantKeyHandler(participantIdentity) {
  if (useSharedKey) {
    return getSharedKeyHandler();
  }
  let keys = participantKeys.get(participantIdentity);
  if (!keys) {
    keys = new ParticipantKeyHandler(participantIdentity, keyProviderOptions);
    keys.on(KeyHandlerEvent.KeyRatcheted, emitRatchetedKeys);
    participantKeys.set(participantIdentity, keys);
  }
  return keys;
}
function getSharedKeyHandler() {
  if (!sharedKeyHandler) {
    workerLogger.debug('creating new shared key handler');
    sharedKeyHandler = new ParticipantKeyHandler('shared-key', keyProviderOptions);
  }
  return sharedKeyHandler;
}
function unsetCryptorParticipant(trackId, participantIdentity) {
  const cryptors = participantCryptors.filter(c => c.getParticipantIdentity() === participantIdentity && c.getTrackId() === trackId);
  if (cryptors.length > 1) {
    workerLogger.error('Found multiple cryptors for the same participant and trackID combination', {
      trackId,
      participantIdentity
    });
  }
  const cryptor = cryptors[0];
  if (!cryptor) {
    workerLogger.warn('Could not unset participant on cryptor', {
      trackId,
      participantIdentity
    });
  } else {
    cryptor.unsetParticipant();
  }
}
function setEncryptionEnabled(enable, participantIdentity) {
  workerLogger.debug("setting encryption enabled for all tracks of ".concat(participantIdentity), {
    enable
  });
  encryptionEnabledMap.set(participantIdentity, enable);
}
function setSharedKey(key, index) {
  workerLogger.info('set shared key', {
    index
  });
  getSharedKeyHandler().setKey(key, index);
}
function setupCryptorErrorEvents(cryptor) {
  cryptor.on(CryptorEvent.Error, error => {
    const msg = {
      kind: 'error',
      data: {
        error: new Error("".concat(CryptorErrorReason[error.reason], ": ").concat(error.message))
      }
    };
    postMessage(msg);
  });
}
function emitRatchetedKeys(material, participantIdentity, keyIndex) {
  const msg = {
    kind: "ratchetKey",
    data: {
      participantIdentity,
      keyIndex,
      material
    }
  };
  postMessage(msg);
}
function handleSifTrailer(trailer) {
  sifTrailer = trailer;
  participantCryptors.forEach(c => {
    c.setSifTrailer(trailer);
  });
}
// Operations using RTCRtpScriptTransform.
// @ts-ignore
if (self.RTCTransformEvent) {
  workerLogger.debug('setup transform event');
  // @ts-ignore
  self.onrtctransform = event => {
    // @ts-ignore .transformer property is part of RTCTransformEvent
    const transformer = event.transformer;
    workerLogger.debug('transformer', transformer);
    // @ts-ignore monkey patching non standard flag
    transformer.handled = true;
    const {
      kind,
      participantIdentity,
      trackId,
      codec
    } = transformer.options;
    const cryptor = getTrackCryptor(participantIdentity, trackId);
    workerLogger.debug('transform', {
      codec
    });
    cryptor.setupTransform(kind, transformer.readable, transformer.writable, trackId, codec);
  };
}
//# sourceMappingURL=livekit-client.e2ee.worker.mjs.map
