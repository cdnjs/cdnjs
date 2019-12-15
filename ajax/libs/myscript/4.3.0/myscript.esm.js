/**
 * @typedef {Object} Constants
 */

var Constants = {
  EventType: {
    IDLE: 'idle',
    CHANGED: 'changed',
    IMPORTED: 'imported',
    EXPORTED: 'exported',
    CONVERTED: 'converted',
    RENDERED: 'rendered', // Internal use only
    LOADED: 'loaded',
    UNDO: 'undo',
    REDO: 'redo',
    CLEAR: 'clear',
    IMPORT: 'import',
    SUPPORTED_IMPORT_MIMETYPES: 'supportedImportMimeTypes',
    EXPORT: 'export',
    CONVERT: 'convert',
    ERROR: 'error'
  },
  RecognitionType: {
    TEXT: 'TEXT',
    MATH: 'MATH',
    SHAPE: 'SHAPE',
    MUSIC: 'MUSIC',
    ANALYZER: 'ANALYZER',
    DIAGRAM: 'DIAGRAM',
    NEBO: 'NEBO',
    RAWCONTENT: 'Raw Content'
  },
  Protocol: {
    WEBSOCKET: 'WEBSOCKET',
    REST: 'REST'
  },
  ModelState: {
    INITIALIZING: 'INITIALIZING',
    INITIALIZED: 'INITIALIZED',
    EXPORTING: 'EXPORTING',
    EXPORTED: 'EXPORTED',
    PENDING: 'PENDING',
    MODIFIED: 'MODIFIED',
    ERROR: 'ERROR'
  },
  Trigger: {
    QUIET_PERIOD: 'QUIET_PERIOD',
    POINTER_UP: 'POINTER_UP',
    DEMAND: 'DEMAND'
  },
  Logger: {
    EDITOR: 'editor',
    MODEL: 'model',
    GRABBER: 'grabber',
    RENDERER: 'renderer',
    RECOGNIZER: 'recognizer',
    CALLBACK: 'callback',
    UTIL: 'util',
    SMARTGUIDE: 'smartguide'
  },
  LogLevel: {
    TRACE: 'TRACE',
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR'
  },
  Languages: {
    zh_CN: 'Noto Sans CJK tc',
    zh_HK: 'Noto Sans CJK tc',
    zh_TW: 'Noto Sans CJK tc',
    ko_KR: 'Noto Sans CJK kr',
    ja_JP: 'Noto Sans CJK jp',
    hy_AM: 'Noto Sans Armenian',
    default: 'Open Sans'
  },
  Error: {
    NOT_REACHABLE: 'MyScript recognition server is not reachable. Please reload once you are connected.',
    WRONG_CREDENTIALS: 'Application credentials are invalid. Please check or regenerate your application key and hmackey.',
    TOO_OLD: 'Session is too old. Max Session Duration Reached.'
  },
  Exports: {
    JIIX: 'application/vnd.myscript.jiix'
  }
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var loglevel = createCommonjsModule(function (module) {
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    if (module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
}(commonjsGlobal, function () {

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

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
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    return defaultLogger;
}));
});
var loglevel_1 = loglevel.noConflict;

/**
 * Main log instance
 * @type {Object}
 */
var log = loglevel_1();

/**
 * Log editor events
 * @type {Object}
 */
var editorLogger = log.getLogger(Constants.Logger.EDITOR);
editorLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log editor events
 * @type {Object}
 */
var smartGuideLogger = log.getLogger(Constants.Logger.SMARTGUIDE);
editorLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log model events
 * @type {Object}
 */
var modelLogger = log.getLogger(Constants.Logger.MODEL);
modelLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log grabber events
 * @type {Object}
 */
var grabberLogger = log.getLogger(Constants.Logger.GRABBER);
grabberLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log grabber events
 * @type {Object}
 */
var rendererLogger = log.getLogger(Constants.Logger.RENDERER);
rendererLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log recognizer events
 * @type {Object}
 */
var recognizerLogger = log.getLogger(Constants.Logger.RECOGNIZER);
recognizerLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log callback events
 * @type {Object}
 */
var callbackLogger = log.getLogger(Constants.Logger.CALLBACK);
callbackLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log util events
 * @type {Object}
 */
var utilLogger = log.getLogger(Constants.Logger.UTIL);
utilLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log tests events
 * @type {Object}
 */
var testLogger = log.getLogger('test');
testLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

// see http://jsperf.com/testing-value-is-primitive/7
var isPrimitive = function isPrimitive(value) {
  return value == null || (typeof value !== 'function' && typeof value !== 'object');
};

/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var assignSymbols = function(receiver, objects) {
  if (receiver === null || typeof receiver === 'undefined') {
    throw new TypeError('expected first argument to be an object.');
  }

  if (typeof objects === 'undefined' || typeof Symbol === 'undefined') {
    return receiver;
  }

  if (typeof Object.getOwnPropertySymbols !== 'function') {
    return receiver;
  }

  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var target = Object(receiver);
  var len = arguments.length, i = 0;

  while (++i < len) {
    var provider = Object(arguments[i]);
    var names = Object.getOwnPropertySymbols(provider);

    for (var j = 0; j < names.length; j++) {
      var key = names[j];

      if (isEnumerable.call(provider, key)) {
        target[key] = provider[key];
      }
    }
  }
  return target;
};

var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

var kindOf = function kindOf(val) {
  var type = typeof val;

  // primitivies
  if (type === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (type === 'string' || val instanceof String) {
    return 'string';
  }
  if (type === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (type === 'function' || val instanceof Function) {
    if (typeof val.constructor.name !== 'undefined' && val.constructor.name.slice(0, 9) === 'Generator') {
      return 'generatorfunction';
    }
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }
  if (type === '[object Promise]') {
    return 'promise';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }
  
  if (type === '[object Map Iterator]') {
    return 'mapiterator';
  }
  if (type === '[object Set Iterator]') {
    return 'setiterator';
  }
  if (type === '[object String Iterator]') {
    return 'stringiterator';
  }
  if (type === '[object Array Iterator]') {
    return 'arrayiterator';
  }
  
  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  return val.constructor
    && typeof val.constructor.isBuffer === 'function'
    && val.constructor.isBuffer(val);
}

function assign(target/*, objects*/) {
  target = target || {};
  var len = arguments.length, i = 0;
  if (len === 1) {
    return target;
  }
  while (++i < len) {
    var val = arguments[i];
    if (isPrimitive(target)) {
      target = val;
    }
    if (isObject(val)) {
      extend(target, val);
    }
  }
  return target;
}

/**
 * Shallow extend
 */

function extend(target, obj) {
  assignSymbols(target, obj);

  for (var key in obj) {
    if (key !== '__proto__' && hasOwn(obj, key)) {
      var val = obj[key];
      if (isObject(val)) {
        if (kindOf(target[key]) === 'undefined' && kindOf(val) === 'function') {
          target[key] = val;
        }
        target[key] = assign(target[key] || {}, val);
      } else {
        target[key] = val;
      }
    }
  }
  return target;
}

/**
 * Returns true if the object is a plain object or a function.
 */

function isObject(obj) {
  return kindOf(obj) === 'object' || kindOf(obj) === 'function';
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Expose `assign`
 */

var assignDeep = assign;

/**
 * Default configuration
 * @type {Configuration}
 * See https://developer.myscript.com/docs/interactive-ink/latest/reference/web/configuration/ for a full documentation of parameters.
 */
var defaultConfiguration = {
  recognitionParams: {
    type: 'TEXT',
    protocol: 'WEBSOCKET',
    apiVersion: 'V4',
    server: {
      scheme: 'https',
      host: 'cloud.myscript.com',
      applicationKey: undefined,
      hmacKey: undefined,
      useWindowLocation: false,
      websocket: {
        pingEnabled: true,
        pingDelay: 30000,
        maxPingLostCount: 10,
        autoReconnect: true,
        maxRetryCount: 2,
        fileChunkSize: 300000
      }
    },
    v4: {
      alwaysConnected: true,
      lang: 'en_US',
      export: {
        'image-resolution': 300,
        jiix: {
          'bounding-box': false,
          strokes: false,
          text: {
            chars: false,
            words: true
          }
        }
      },
      renderer: {
        debug: {
          'draw-text-boxes': false,
          'draw-image-boxes': false
        }
      },
      math: {
        mimeTypes: ['application/x-latex', 'application/mathml+xml'],
        solver: {
          enable: true,
          'fractional-part-digits': 3,
          'decimal-separator': '.',
          'rounding-mode': 'half up',
          'angle-unit': 'deg'
        },
        margin: {
          bottom: 10,
          left: 15,
          right: 15,
          top: 10
        }
      },
      text: {
        guides: {
          enable: true
        },
        smartGuide: true,
        smartGuideFadeOut: {
          enable: false,
          duration: 10000
        },
        mimeTypes: ['text/plain', 'application/vnd.myscript.jiix'],
        margin: {
          top: 20,
          left: 10,
          right: 10
        }
      },
      diagram: {
        mimeTypes: ['application/vnd.myscript.jiix'],
        margin: {
          bottom: 10,
          left: 15,
          right: 15,
          top: 10
        }
      },
      'raw-content': {
        recognition: {
          text: false,
          shape: false
        }
      }
    },
    v3: {
      mathParameter: {
        resultTypes: ['LATEX', 'MATHML'],
        columnarOperation: false,
        userResources: [],
        scratchOutDetectionSensitivity: 1
      },
      textParameter: {
        language: 'en_US',
        textInputMode: 'CURSIVE',
        resultDetail: 'TEXT',
        contentTypes: [],
        subsetKnowledges: [],
        userLkWords: [],
        userResources: [],
        textProperties: {
          textCandidateListSize: 1,
          wordCandidateListSize: undefined,
          wordPredictionListSize: 0,
          wordCompletionListSize: 0,
          characterCandidateListSize: undefined,
          enableOutOfLexicon: false,
          discardCaseVariations: false,
          discardAccentuationVariations: false,
          glyphDistortion: undefined,
          enableTagger: false,
          spellingDistortion: undefined
        }
      },
      shapeParameter: {
        userResources: undefined,
        rejectDetectionSensitivity: 1,
        doBeautification: true
      },
      musicParameter: {
        divisions: 480,
        resultTypes: ['MUSICXML', 'SCORETREE'],
        userResources: [],
        staff: {
          top: 100,
          count: 5,
          gap: 20
        },
        clef: {
          symbol: 'G',
          octave: 0,
          line: 2
        },
        scratchOutDetectionSensitivity: 1
      },
      analyzerParameter: {
        textParameter: {
          textProperties: {},
          language: 'en_US',
          textInputMode: 'CURSIVE'
        },
        coordinateResolution: undefined
      }
    }
  },
  // @see generated documentation on top
  listenerOptions: {
    capture: false,
    passive: true
  },
  undoRedoMaxStackSize: 20,
  xyFloatPrecision: 0,
  timestampFloatPrecision: 0,
  triggerDelay: 2000,
  processDelay: 0,
  resizeTriggerDelay: 200,
  // Configure when the action is triggered.
  // POINTER_UP : Action is triggered on every PenUP. This is the recommended mode for CDK V3 WebSocket recognitions.
  // QUIET_PERIOD : Action is triggered after a quiet period in milli-seconds on every pointer up. I value is set to 2000 for example the recognition will be fired  when user stop writing 2 seconds. This is the recommended mode for all REST recognitions.
  triggers: {
    exportContent: 'POINTER_UP',
    addStrokes: 'POINTER_UP'
  },
  restConversionState: '',
  renderingParams: {
    stroker: 'quadratic',
    minHeight: 100,
    minWidth: 100
  }
};

/**
 * Generate parameters
 * @param {Configuration} configuration Configuration to be used
 * @return {Configuration} Overridden configuration
 */
function overrideDefaultConfiguration(configuration) {
  var confRef = configuration;
  var currentConfiguration = void 0;
  if (confRef && confRef.recognitionParams.server && confRef.recognitionParams.server.useWindowLocation) {
    confRef.recognitionParams.server.scheme = window.location.protocol.slice(0, -1);
    confRef.recognitionParams.server.host = window.location.host;
    currentConfiguration = assignDeep({}, defaultConfiguration, confRef === undefined ? {} : confRef);
  } else {
    currentConfiguration = assignDeep({}, defaultConfiguration, configuration === undefined ? {} : configuration);
  }
  editorLogger.debug('Override default configuration', currentConfiguration);
  return currentConfiguration;
}

var jsoncss_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o});},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function t(e){var n=this;o(this,t),this.toJSON=function(t){if("string"!=typeof t)return console.error("Need a CSS string but given ",void 0===t?"undefined":r(t),t),"Not a valid CSS..!";var e={},o=void 0,i=void 0,u=void 0;try{t.split("{").forEach(function(t){if(i=t.trim())if(-1===i.indexOf("}"))e[i]={},o=i;else{i.substring(0,i.indexOf("}")).split(";").forEach(function(t){(u=t.split(":"))&&2===u.length&&(e[o][u[0].trim().replace(/^\"|\"$/g,"")]=n._trimSemiColon(u[1].trim().replace(/^\"|\"$/g,"")));});try{o=i.split("}")[1].trim(),o&&(e[o]={});}catch(t){}}});}catch(t){return "Not a valid CSS..!"}return e},this.toCSS=function(t){if("object"!==(void 0===t?"undefined":r(t)))return console.error("Need a JSON object but given ",void 0===t?"undefined":r(t),t),"Not a valid JSON..!";var e="";try{for(var n in t)if(t.hasOwnProperty(n)){e+=n+" {\n";for(var o in t[n])t[n].hasOwnProperty(o)&&(e+=o+": "+t[n][o]+";\n");e+="}\n";}}catch(t){return "Not a valid JSON..!"}return e},this._trimSemiColon=function(t){return ";"===t.slice(-1)?t.slice(0,n.length-1):t};};e.default=i;},function(t,e,n){t.exports=n(0).default;}])});
});

var JsonCSS = unwrapExports(jsoncss_min);
var jsoncss_min_1 = jsoncss_min.JsonCSS;

/**
 * @typedef {Object} PenStyle
 * @property {String} color=#000000 Color (supported formats rgb() rgba() hsl() hsla() #rgb #rgba #rrggbb #rrggbbaa)
 * @property {String} -myscript-pen-width=1 Width of strokes and primitives in mm (no other unit is supported yet)
 * @property {String} -myscript-pen-fill-style=none
 * @property {String} -myscript-pen-fill-color=#FFFFFF00 Color filled inside the area delimited by strokes and primitives
 */

/**
 * Default style
 * @type {PenStyle}
 */
var defaultPenStyle = undefined;
var parser = new JsonCSS();

/**
 * Generate style
 * @param {PenStyle} style Custom style to be applied
 * @return {PenStyle} Overridden style
 */
function overrideDefaultPenStyle(style) {
  var currentStyle = assignDeep({}, defaultPenStyle, style === undefined ? {} : style);
  editorLogger.debug('Override default pen style', currentStyle);
  return currentStyle;
}

function toCSS(penStyle) {
  // FIXME Ugly hack to parse JSON to CSS inline
  var css = parser.toCSS({ css: penStyle });
  return css.substring(6, css.length - 3);
}

/**
 * @typedef {PenStyle} InkTheme
 */
/**
 * @typedef {Object} MathTheme
 * @property {String} font-family=STIXGeneral Font-family to be used
 */
/**
 * @typedef {Object} GeneratedTheme
 * @property {String} font-family=STIXGeneral Font-family to be used
 * @property {String} color=#A8A8A8FF Color to be used
 */
/**
 * @typedef {Object} TextTheme
 * @property {String} font-family=OpenSans Font-family to be used
 * @property {Number} font-size=10 Font-size to be used
 */
/**
 * @typedef {Object} Theme
 * @property {InkTheme} ink General settings
 * @property {MathTheme} .math Math theme
 * @property {GeneratedTheme} .math-solver Theme to be used for generated items
 * @property {TextTheme} .text Text theme
 */

/**
 * Default theme
 * @type {Theme}
 */
var defaultTheme = {
  ink: {
    color: '#000000',
    '-myscript-pen-width': 1,
    '-myscript-pen-fill-style': 'none',
    '-myscript-pen-fill-color': '#FFFFFF00'
  },
  '.math': {
    'font-family': 'STIXGeneral'
  },
  '.math-solved': {
    'font-family': 'STIXGeneral',
    color: '#A8A8A8FF'
  },
  '.text': {
    'font-family': 'Open Sans',
    'font-size': 10
  }
};
var parser$1 = new JsonCSS();

/**
 * Generate theme
 * @param {Theme} theme Custom theme to be applied
 * @return {Theme} Overridden theme
 */
function overrideDefaultTheme(theme) {
  var currentTheme = assignDeep({}, defaultTheme, theme === undefined ? {} : theme);
  editorLogger.debug('Override default theme', currentTheme);
  return currentTheme;
}

function toCSS$1(theme) {
  return parser$1.toCSS(theme);
}

/**
 * Grab pointerDown, pointerMove and pointerUp events
 * @typedef {Object} Grabber
 * @property {function(element: Element, editor: Editor): GrabberContext} attach Attach events and decide when to call editor pointerDown/Move/Up methods
 * @property {function(element: Element, context: GrabberContext)} detach Detach the grabber
 */

/**
 * Grabber listener
 * @typedef {Object} GrabberListener
 * @property {Array<String>} types Event types to listen
 * @property {function(event: Event)} listener Event listener for these events
 */

/**
 * Grabber context
 * @typedef {Object} GrabberContext
 * @property {Boolean|Object} options Options object that specifies characteristics about the event listener. (@see addEventListener.options for detail)
 * @property {Array<GrabberListener>} listeners Registered listeners
 */

var floatPrecisionArray = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];

function roundFloat(oneFloat, requestedFloatPrecision) {
  if (requestedFloatPrecision || requestedFloatPrecision === 0) {
    var floatPrecision = void 0;
    if (requestedFloatPrecision > 10) {
      floatPrecision = floatPrecisionArray[10];
    } else {
      floatPrecision = floatPrecisionArray[requestedFloatPrecision];
    }
    return Math.round(oneFloat * floatPrecision) / floatPrecision;
  }
  return oneFloat;
}

function extractPoint(event, domElement, configuration) {
  var offsetTop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var offsetLeft = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  var eventRef = event;
  if (eventRef.changedTouches) {
    eventRef = eventRef.changedTouches[0];
  }
  var rect = domElement.getBoundingClientRect();
  return {
    x: roundFloat(eventRef.clientX - rect.left - domElement.clientLeft - offsetLeft, configuration.xyFloatPrecision),
    y: roundFloat(eventRef.clientY - rect.top - domElement.clientTop - offsetTop, configuration.xyFloatPrecision),
    t: roundFloat(Date.now(), configuration.timestampFloatPrecision)
  };
}

/**
 * Listen for the desired events
 * @param {Element} element DOM element to attach events listeners
 * @param {Editor} editor Editor to received down/move/up events
 * @param {Number} [offsetTop=0]
 * @param {Number} [offsetLeft=0]
 * @return {GrabberContext} Grabber context
 * @listens {Event} pointermove: a pointer moves, similar to touchmove or mousemove.
 * @listens {Event} pointerdown: a pointer is activated, or a device button held.
 * @listens {Event} pointerup: a pointer is deactivated, or a device button released.
 * @listens {Event} pointerover: a pointer has moved onto an element.
 * @listens {Event} pointerout: a pointer is no longer on an element it once was.
 * @listens {Event} pointerenter: a pointer enters the bounding box of an element.
 * @listens {Event} pointerleave: a pointer leaves the bounding box of an element.
 * @listens {Event} pointercancel: a pointer will no longer generate events.
 */
function attach(element, editor) {
  var offsetTop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var offsetLeft = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var mMaxDiffX = 0;

  function unfocus() {
    if (window.getSelection().type !== 'None') {
      window.getSelection().removeAllRanges();
    }
  }

  function hideMenu(evt) {
    var moreMenuInDocument = document.querySelector('.more-menu');
    if (!evt.target.classList.contains('ellipsis') && !evt.target.classList.contains('more-menu') && !evt.target.classList.contains('options-label-button') && moreMenuInDocument && moreMenuInDocument.style.display !== 'none') {
      moreMenuInDocument.style.display = 'none';
      return true;
    }
    return false;
  }

  function hideCandidates(evt) {
    var candidatesInDocument = document.querySelector('.candidates');
    if (!evt.target.classList.contains('candidates') && !(evt.target.tagName === 'SPAN') && candidatesInDocument && candidatesInDocument.style.display !== 'none') {
      candidatesInDocument.style.display = 'none';
      return true;
    }
    return false;
  }

  function pointerDownHandler(evt) {
    // Trigger a pointerDown
    var pointerDownOnEditor = evt.target.id === editor.domElement.id || evt.target.classList.contains('ms-canvas');
    if (this.activePointerId !== undefined) {
      if (this.activePointerId === evt.pointerId) {
        grabberLogger.trace(evt.type + ' event with the same id without any pointer up', evt.pointerId);
      }
    } else if (evt.button !== 2 && evt.buttons !== 2 && pointerDownOnEditor) {
      // Ignore right click
      if (!hideMenu(evt) && !hideCandidates(evt)) {
        this.activePointerId = evt.pointerId;
        // Hack for iOS 9 Safari : pointerId has to be int so -1 if > max value
        var pointerId = evt.pointerId > 2147483647 ? -1 : evt.pointerId;
        unfocus();
        evt.stopPropagation();
        editor.pointerDown(extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft), evt.pointerType, pointerId);
      }
    } else if (evt.target.classList.contains('ellipsis') || evt.target.classList.contains('tag-icon')) {
      hideMenu(evt);
      hideCandidates(evt);
    } else {
      // FIXME add more complete verification to pointer down on smartguide
      hideMenu(evt);
      hideCandidates(evt);
      this.smartGuidePointerDown = true;
      this.downSmartGuidePoint = extractPoint(evt, element, editor.configuration);
    }
  }

  function pointerMoveHandler(evt) {
    // Trigger a pointerMove
    // Only considering the active pointer
    if (this.activePointerId !== undefined && this.activePointerId === evt.pointerId) {
      unfocus();
      editor.pointerMove(extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft));
    } else if (this.smartGuidePointerDown) {
      var point = extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft);
      var diffX = Math.abs(this.downSmartGuidePoint.x - point.x);
      var diffY = Math.abs(this.downSmartGuidePoint.y - point.y);
      mMaxDiffX = Math.max(diffX, mMaxDiffX);
      var cond1 = diffX < 5 && diffY > 5 && mMaxDiffX < 15;
      var cond2 = diffX > 5 && diffY > 5 && mMaxDiffX < 15;
      if (cond1 || cond2) {
        this.activePointerId = evt.pointerId;
        // Hack for iOS 9 Safari : pointerId has to be int so -1 if > max value
        var pointerId = evt.pointerId > 2147483647 ? -1 : evt.pointerId;
        unfocus();
        editor.pointerDown(this.downSmartGuidePoint, evt.pointerType, pointerId);
      }
    } else {
      grabberLogger.trace(evt.type + ' event from another pointerid (' + evt.pointerId + ')', this.activePointerId);
    }
  }

  function pointerUpHandler(evt) {
    // Trigger a pointerUp
    mMaxDiffX = 0;
    this.smartGuidePointerDown = false;
    var smartGuideIds = ['smartguide', 'prompter-text-container', 'prompter-text', 'tag-icon', 'ellipsis'];
    var scrollbarClasses = ['ps__rail-x', 'ps__thumb-x'];
    // Check if pointer entered into any smartguide elements or scrollbar
    // Use case : when the pointer is entering the smartguide or scrollbar, a pointerout (or leave) is fired.
    // The related target is then the DOM element that was left.
    // We don't want this to cause editor.pointerUp because the stroke isn't finished.
    var pointerEnteredSmartGuide = evt.relatedTarget && (smartGuideIds.includes(evt.relatedTarget.className) || scrollbarClasses.includes(evt.relatedTarget.className));
    // Check if pointer didn't stay in the smartguide and pointer exited the smartguide or scrollbar
    // Use case : when the pointer is leaving the smartguide or scrollbar, a pointerout (or leave) is fired.
    // The related target is then the DOM element that was left (the smart guide)
    // We are entering again the editor
    // We don't want this to cause editor.pointerUp because the stroke isn't finished.
    var pointerExitedSmartGuide = evt.relatedTarget && evt.target && (smartGuideIds.includes(evt.target.className) || scrollbarClasses.includes(evt.target.className));
    // Check if pointer moved between words in smartguide
    // Same use case as pointerEnteredSmartGuide but for the words in the smartguide (each word is a span).
    var pointerMovedWords = evt.relatedTarget && evt.target && (evt.target.tagName === 'SPAN' || evt.relatedTarget.tagName === 'SPAN');
    if (pointerEnteredSmartGuide || pointerExitedSmartGuide || pointerMovedWords) {
      evt.stopPropagation();
    } else if (this.activePointerId !== undefined && this.activePointerId === evt.pointerId) {
      // Only considering the active pointer
      this.activePointerId = undefined; // Managing the active pointer
      evt.stopPropagation();
      editor.pointerUp(extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft));
    } else {
      grabberLogger.trace(evt.type + ' event from another pointerid (' + evt.pointerId + ')', this.activePointerId);
    }
  }

  var context = {
    options: editor.configuration.listenerOptions,
    listeners: [{
      types: ['pointerdown'],
      listener: pointerDownHandler
    }, {
      types: ['pointermove'],
      listener: pointerMoveHandler
    }, {
      types: ['pointerup', 'pointerout', 'pointerleave', 'pointercancel'],
      listener: pointerUpHandler
    }]
  };

  grabberLogger.debug('attaching listeners', context);
  context.listeners.forEach(function (item) {
    item.types.forEach(function (type) {
      return element.addEventListener(type, item.listener, context.options);
    });
  });
  return context;
}

function detach(element, context) {
  grabberLogger.debug('detaching listeners', context);
  context.listeners.forEach(function (item) {
    item.types.forEach(function (type) {
      return element.removeEventListener(type, item.listener, context.options);
    });
  });
}

var PointerEventGrabber = /*#__PURE__*/Object.freeze({
  attach: attach,
  detach: detach
});

/**
 * Draw a stroke symbol
 * @param {Object} context Current rendering context
 * @param {Stroke} stroke Stroke to be drawn
 * @param {Stroker} stroker Stroker to use to render a stroke
 */
function drawStroke(context, stroke, stroker) {
  if (stroker) {
    stroker.drawStroke(context, stroke);
  }
}

/**
 * @type {{table: String, shape: String, recognizedShape: String, ellipse: String, line: String}}
 */
var ShapeSymbols = {
  table: 'table',
  shape: 'shape',
  recognizedShape: 'recognizedShape',
  ellipse: 'ellipse',
  line: 'line'
};

function phi(angle) {
  var returnedAngle = (angle + Math.PI) % (Math.PI * 2) - Math.PI;
  if (returnedAngle < -Math.PI) {
    returnedAngle += Math.PI * 2;
  }
  return returnedAngle;
}

function drawEllipseArc(context, centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle) {
  var angleStep = 0.02; // angle delta between interpolated

  var z1 = Math.cos(orientation);
  var z3 = Math.sin(orientation);
  var z2 = z1;
  var z4 = z3;
  z1 *= maxRadius;
  z2 *= minRadius;
  z3 *= maxRadius;
  z4 *= minRadius;

  var n = Math.floor(Math.abs(sweepAngle) / angleStep);

  var boundariesPoints = [];

  context.save();
  try {
    context.beginPath();

    for (var i = 0; i <= n; i++) {
      var angle = startAngle + i / n * sweepAngle; // points on the arc, in radian
      var alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

      var cosAlpha = Math.cos(alpha);
      var sinAlpha = Math.sin(alpha);

      // current point
      var x = centerPoint.x + z1 * cosAlpha - z4 * sinAlpha;
      var y = centerPoint.y + z2 * sinAlpha + z3 * cosAlpha;
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }

      if (i === 0 || i === n) {
        boundariesPoints.push({ x: x, y: y });
      }
    }

    context.stroke();
  } finally {
    context.restore();
  }

  return boundariesPoints;
}

function drawArrowHead(context, headPoint, angle, length) {
  var alpha = phi(angle + Math.PI * (7 / 8));
  var beta = phi(angle - Math.PI * (7 / 8));

  var contextReference = context;
  contextReference.save();
  try {
    contextReference.fillStyle = contextReference.strokeStyle;

    contextReference.moveTo(headPoint.x, headPoint.y);
    contextReference.beginPath();
    contextReference.lineTo(headPoint.x + length * Math.cos(alpha), headPoint.y + length * Math.sin(alpha));
    contextReference.lineTo(headPoint.x + length * Math.cos(beta), headPoint.y + length * Math.sin(beta));
    contextReference.lineTo(headPoint.x, headPoint.y);
    contextReference.fill();
  } finally {
    contextReference.restore();
  }
}

function drawShapeEllipse(context, shapeEllipse) {
  var points = drawEllipseArc(context, shapeEllipse.center, shapeEllipse.maxRadius, shapeEllipse.minRadius, shapeEllipse.orientation, shapeEllipse.startAngle, shapeEllipse.sweepAngle);

  if (shapeEllipse.beginDecoration && shapeEllipse.beginDecoration === 'ARROW_HEAD') {
    drawArrowHead(context, points[0], shapeEllipse.beginTangentAngle, 12.0);
  }
  if (shapeEllipse.endDecoration && shapeEllipse.endDecoration === 'ARROW_HEAD') {
    drawArrowHead(context, points[1], shapeEllipse.endTangentAngle, 12.0);
  }
}

/**
 * Draw a line
 * @param {Object} context Current rendering context
 * @param {{x: Number, y: Number}} p1 Origin point
 * @param {{x: Number, y: Number}} p2 Destination point
 */
function drawLine(context, p1, p2) {
  context.save();
  try {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
  } finally {
    context.restore();
  }
}

function drawShapeLine(context, shapeLine) {
  drawLine(context, shapeLine.firstPoint, shapeLine.lastPoint);
  if (shapeLine.beginDecoration === 'ARROW_HEAD') {
    drawArrowHead(context, shapeLine.firstPoint, shapeLine.beginTangentAngle, 12.0);
  }
  if (shapeLine.endDecoration === 'ARROW_HEAD') {
    drawArrowHead(context, shapeLine.lastPoint, shapeLine.endTangentAngle, 12.0);
  }
}

/**
 * Draw a shape symbol
 * @param {Object} context Current rendering context
 * @param {Object} symbol Symbol to draw
 */
function drawShapeSymbol(context, symbol) {
  rendererLogger.debug('draw ' + symbol.type + ' symbol');
  var contextReference = context;
  contextReference.save();
  try {
    contextReference.lineWidth = symbol.width;
    contextReference.strokeStyle = symbol.color;

    if (symbol.elementType) {
      switch (symbol.elementType) {
        case ShapeSymbols.shape:
          drawShapeSymbol(contextReference, symbol.candidates[symbol.selectedCandidateIndex]);
          break;
        case ShapeSymbols.table:
          symbol.lines.forEach(function (line) {
            return drawShapeSymbol(contextReference, line);
          });
          break;
        case ShapeSymbols.line:
          drawLine(contextReference, symbol.data.p1, symbol.data.p2);
          break;
        default:
          rendererLogger.error(symbol.elementType + ' not implemented');
          break;
      }
    } else {
      switch (symbol.type) {
        case ShapeSymbols.ellipse:
          drawShapeEllipse(contextReference, symbol);
          break;
        case ShapeSymbols.line:
          drawShapeLine(contextReference, symbol);
          break;
        case ShapeSymbols.recognizedShape:
          symbol.primitives.forEach(function (primitive) {
            return drawShapeSymbol(contextReference, primitive);
          });
          break;
        default:
          rendererLogger.error(symbol.type + ' not implemented');
          break;
      }
    }
  } finally {
    contextReference.restore();
  }
}

/**
 * @type {{inputCharacter: String, char: String, string: String, textLine: String}}
 */
var TextSymbols = {
  inputCharacter: 'inputCharacter',
  char: 'char',
  string: 'string',
  textLine: 'textLine'
};

function drawUnderline(context, underline, label, data) {
  var delta = data.width / label.length;
  var p1 = {
    x: data.topLeftPoint.x + underline.data.firstCharacter * delta,
    y: data.topLeftPoint.y + data.height
  };
  var p2 = {
    x: data.topLeftPoint.x + underline.data.lastCharacter * delta,
    y: data.topLeftPoint.y + data.height
  };
  drawLine(context, p1, p2);
}

function drawText(context, label, data) {
  var contextReference = context;
  contextReference.save();
  try {
    contextReference.font = data.textHeight + 'px serif';
    contextReference.textAlign = data.justificationType === 'CENTER' ? 'center' : 'left';
    contextReference.textBaseline = 'bottom';
    contextReference.fillStyle = contextReference.strokeStyle;
    contextReference.fillText(label, data.topLeftPoint.x, data.topLeftPoint.y + data.height);
  } finally {
    contextReference.restore();
  }
}

function drawTextLine(context, textLine) {
  drawText(context, textLine.label, textLine.data);
  textLine.underlineList.forEach(function (underline) {
    drawUnderline(context, underline, textLine.label, textLine.data);
  });
}

/**
 * Draw a text symbol
 * @param {Object} context Current rendering context
 * @param {Object} symbol Symbol to draw
 */
function drawTextSymbol(context, symbol) {
  rendererLogger.debug('draw ' + symbol.type + ' symbol');
  var contextReference = context;
  contextReference.save();
  try {
    contextReference.lineWidth = symbol.width;
    contextReference.strokeStyle = symbol.color;

    if (symbol.elementType) {
      switch (symbol.elementType) {
        case TextSymbols.textLine:
          drawTextLine(contextReference, symbol);
          break;
        default:
          rendererLogger.error(symbol.elementType + ' not implemented');
          break;
      }
    } else {
      switch (symbol.type) {
        case TextSymbols.textLine:
          drawTextLine(contextReference, symbol);
          break;
        default:
          rendererLogger.error(symbol.type + ' not implemented');
      }
    }
  } finally {
    contextReference.restore();
  }
}

/**
 * @type {{F: {svg: String, getBoundingBox: function}, C: {svg: String, getBoundingBox: function}, G: {svg: String, getBoundingBox: function}}}
 */
var MusicClefs = { // constants was calculated from the svg image, so it should remains together
  F: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="18" height="20"><g transform="translate(6.600000e-3,3.125356e-3)"><path d="M17.3 3.1 C17.3 3.5 17.1 3.8 16.8 4.1 C16.5 4.4 15.9 4.5 15.5 4.3 C15 4.1 14.7 3.7 14.7 3.2 C14.6 2.8 14.8 2.5 15 2.2 C15.3 1.9 15.7 1.8 16 1.8 C16.4 1.8 16.8 2 17 2.3 C17.2 2.5 17.3 2.8 17.3 3.1 z"/><path d="M17.3 8.9 C17.3 9.3 17.1 9.7 16.8 9.9 C16.5 10.3 15.9 10.3 15.5 10.2 C15 10 14.7 9.5 14.7 9.1 C14.6 8.7 14.8 8.3 15 8 C15.3 7.8 15.7 7.6 16 7.6 C16.5 7.7 17 8 17.2 8.4 C17.2 8.6 17.3 8.8 17.3 8.9 z"/><path d="M13 7.2 C13 10 11.8 12.7 9.8 14.7 C7.3 17.2 4 18.8 0.7 19.8 C0.3 20.1 -0.4 19.8 0.3 19.4 C1.6 18.8 3 18.3 4.2 17.5 C7 15.8 9.3 13.1 9.8 9.9 C10.1 8 10.1 5.9 9.6 4 C9.2 2.6 8.2 1.1 6.7 0.9 C5.3 0.7 3.7 1.2 2.7 2.2 C2.5 2.4 2 3.2 2 4 C2.6 3.6 2.6 3.6 3.1 3.4 C4.2 2.9 5.7 3.6 6 4.9 C6.3 6 6.1 7.5 5 8.1 C3.8 8.7 2 8.5 1.4 7.2 C0.3 5.3 0.9 2.6 2.6 1.2 C4.4 -0.3 7.1 -0.3 9.2 0.4 C11.4 1.3 12.7 3.5 12.9 5.8 C13 6.2 13 6.7 13 7.2 z"/></g></svg>',
    getBoundingBox: function getBoundingBox(gap, xAnchor, yAnchor) {
      return {
        height: gap * 3,
        width: gap * 3 * (18 / 20),
        x: xAnchor,
        y: yAnchor - gap
      };
    }
  },
  C: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="18" height="25"><g transform="matrix(1,0,0,1.030698,-309.364,-543.8647)"><path d="M 325.9 546.8 C 325.8 548.7 324.7 550.7 322.8 551.5 C 321.1 552.1 319.1 552.2 317.6 551 C 316.6 550.2 316.2 548.4 317.3 547.5 C 318.3 546.5 320.4 547.4 320.3 548.9 C 320.7 549.9 318.5 550.5 319.7 551.3 C 321 551.6 322.3 550.5 322.6 549.3 C 323.1 547.5 323.1 545.6 322.7 543.8 C 322.4 542.9 321.9 541.5 320.7 541.9 C 319.2 542.2 318.3 543.8 317.9 545.1 C 317.6 543.2 316.4 541.5 315 540.2 C 315 544.1 315 548 315 551.9 L 314.1 551.9 C 314.1 543.9 314.1 535.7 314.1 527.7 L 315 527.7 C 315 531.5 315 535.5 315 539.4 C 316.4 538.1 317.6 536.4 317.8 534.5 C 318.3 535.9 319.3 537.5 321 537.8 C 322.2 537.8 322.5 536.3 322.8 535.4 C 323.1 533.7 323.1 531.8 322.6 530.1 C 322.2 529 320.9 528 319.6 528.3 C 318.6 529 320.6 529.6 320.3 530.6 C 320.5 532 318.8 533 317.6 532.3 C 316.3 531.6 316.4 529.7 317.4 528.8 C 318 528.1 319.3 527.7 320.3 527.7 C 321.2 527.7 321.8 527.7 322.6 528 C 324.6 528.7 325.7 530.7 325.9 532.7 C 326.2 534.9 324.9 537.3 322.8 538.2 C 321.5 538.7 319.9 538.3 318.8 537.3 C 318.7 538.3 318.2 539.2 317.7 539.9 C 318.1 540.6 318.6 541.8 318.8 542.1 C 320.1 540.9 322.5 540.8 323.8 542 C 325.2 543.1 326.1 545 325.9 546.8 z "/></g><g transform="matrix(1,0,0,1.030928,-309.364,-543.9805)"><path d="M 312.2 551.9 L 309.4 551.9 L 309.4 527.7 L 312.2 527.7 L 312.2 551.9 z "/></g></svg>',
    getBoundingBox: function getBoundingBox(gap, xAnchor, yAnchor) {
      return {
        height: gap * 3,
        width: gap * 3 * (18 / 25),
        x: xAnchor,
        y: yAnchor - gap * (3 / 2)
      };
    }
  },
  G: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="40"><g><path d="m 12 3.4 c 0.3 3.1 -2 5.6 -4.1 7.6 -0.9 0.9 -0.2 0.1 -0.6 0.6 -0.1 -0.5 -0.3 -1.7 -0.3 -2.1 0.1 -2.6 2.3 -6.5 4.2 -7.9 0.3 0.6 0.6 0.6 0.8 1.8 z m 0.7 15.9 c -1.2 -0.9 -2.8 -1.1 -4.3 -0.9 -0.2 -1.2 -0.4 -2.5 -0.6 -3.7 2.4 -2.3 4.9 -4.9 5 -8.4 0.1 -2.2 -0.3 -4.6 -1.7 -6.4 C 9.5 0.1 8.3 2.1 7.4 3.3 c -1.5 2.6 -1.1 5.8 -0.6 8.6 -0.8 0.9 -1.9 1.7 -2.7 2.7 -2.4 2.3 -4.4 5.3 -4 8.7 0.2 3.3 2.6 6.3 5.9 7.1 1.2 0.3 2.6 0.3 3.8 0.1 0.2 2.2 1 4.5 0.1 6.7 -0.7 1.6 -2.8 2.9 -4.3 2.2 -0.6 -0.3 -0.1 -0.1 -0.5 -0.2 1.1 -0.3 2 -1 2.3 -1.5 0.8 -1.4 -0.4 -3.6 -2.2 -3.3 -2.3 0 -3.2 3.1 -1.7 4.6 1.3 1.5 3.8 1.3 5.4 0.3 1.8 -1.2 2 -3.5 1.8 -5.5 -0.1 -0.7 -0.4 -2.6 -0.4 -3.3 0.7 -0.2 0.2 -0.1 1.2 -0.4 2.7 -1 4.4 -4.2 3.6 -7 -0.3 -1.4 -1 -2.9 -2.3 -3.7 z m 0.6 5.7 c 0.2 2 -1.1 4.2 -3.1 4.9 -0.1 -0.8 -0.2 -1 -0.3 -1.4 -0.5 -2.4 -0.7 -4.9 -1.1 -7.3 1.6 -0.2 3.5 0.5 4 2.1 0.2 0.6 0.3 1.2 0.4 1.8 z m -5.1 5.1 c -2.5 0.1 -5 -1.6 -5.6 -4 -0.7 -2.1 -0.5 -4.5 0.8 -6.4 1.1 -1.7 2.6 -3 4 -4.5 0.2 1.1 0.4 2.2 0.5 3.3 -3 0.8 -5 4.6 -3.2 7.3 0.5 0.8 2 2.2 2.8 1.6 -1.1 -0.7 -2 -1.8 -1.8 -3.2 -0.1 -1.3 1.4 -2.9 2.7 -3.1 0.4 2.8 0.9 6 1.4 8.8 -0.5 0.1 -1 0.1 -1.5 0.1 z"/></g></svg>',
    getBoundingBox: function getBoundingBox(gap, xAnchor, yAnchor) {
      return {
        height: gap * (15 / 2),
        width: gap * (15 / 2) * (15 / 40),
        x: xAnchor,
        y: yAnchor - gap * (9 / 2)
      };
    }
  }
};

/**
 * @type {{accidental: String, arpeggiate: String, bar: String, beam: String, clef: String, decoration: String, dots: String, head: String, ledgerLine: String, rest: String, staff: String, stem: String, tieOrSlur: String, timeSignature: String}}
 */
var MusicSymbols = {
  accidental: 'accidental',
  arpeggiate: 'arpeggiate',
  bar: 'bar',
  beam: 'beam',
  clef: 'clef',
  decoration: 'decoration',
  dots: 'dots',
  head: 'head',
  ledgerLine: 'ledgerLine',
  rest: 'rest',
  staff: 'staff',
  stem: 'stem',
  tieOrSlur: 'tieOrSlur',
  timeSignature: 'timeSignature'
};

function createImage(clef, src) {
  // eslint-disable-next-line no-undef
  var browserDocument = document;
  var img = browserDocument.createElement('img');
  img.dataset.clef = clef;
  img.src = src;
  img.style.display = 'none';
  return img;
}

/**
 * Retrieve music symbols elements
 * @return {Array<Element>} music symbols elements to attach
 */
function getMusicClefElements() {
  return Object.keys(MusicClefs).map(function (key) {
    return createImage(key, 'data:image/svg+xml,' + MusicClefs[key].svg);
  });
}

function drawStaff(context, staff) {
  for (var i = 0; i < staff.count; i++) {
    var p1 = { x: 0, y: staff.top + i * staff.gap };
    var p2 = { x: context.canvas.width, y: staff.top + i * staff.gap };
    drawLine(context, p1, p2);
  }
}

function drawClef(context, clef) {
  // eslint-disable-next-line no-undef
  context.drawImage(context.canvas.parentElement.querySelector('img[data-clef=' + clef.value.symbol + ']'), clef.boundingBox.x, clef.boundingBox.y, clef.boundingBox.width, clef.boundingBox.height);
}

/**
 * Draw a music symbol
 * @param {Object} context Current rendering context
 * @param {Object} symbol Symbol to draw
 */
function drawMusicSymbol(context, symbol) {
  rendererLogger.debug('draw ' + symbol.type + ' symbol');
  switch (symbol.type) {
    case MusicSymbols.clef:
      drawClef(context, symbol);
      break;
    case MusicSymbols.staff:
      drawStaff(context, symbol);
      break;
    default:
      rendererLogger.error(symbol.type + ' not implemented');
  }
}

/**
 * Stroke symbol
 * @typedef {Object} Stroke
 * @property {String} type=stroke Symbol type, 'stroke' for stroke
 * @property {String} pointerType=undefined Pointer type
 * @property {Number} pointerId=undefined Pointer id
 * @property {Array<Number>} x=[] X coordinates
 * @property {Array<Number>} y=[] Y coordinates
 * @property {Array<Number>} t=[] Timestamps matching x,y coordinates
 * @property {Array<Number>} p=[] Pressure
 * @property {Array<Number>} l=[] Length from origin
 * @property {Number} width=0 (for rendering) Pen/brush width
 * @property {String} color=undefined (for rendering) Pen/brush color
 */

/**
 * pointerEvents symbol
 * @typedef {Object} pointerEvents
 * @property {String} type=pointerEvents Symbol type, 'pointerEvents' for pointerEvents
 * @property {Boolean} processGestures=False indicates if the gestures have to be processed
 * @property {Array<Stroke>} events=[] the events to process
 */

function computeDistance(x, y, xArray, yArray, lastIndexPoint) {
  var distance = Math.sqrt(Math.pow(y - yArray[lastIndexPoint - 1], 2) + Math.pow(x - xArray[lastIndexPoint - 1], 2));
  return isNaN(distance) ? 0 : distance;
}

function computeLength(x, y, xArray, yArray, lArray, lastIndexPoint) {
  var length = lArray[lastIndexPoint - 1] + computeDistance(x, y, xArray, yArray, lastIndexPoint);
  return isNaN(length) ? 0 : length;
}

function computePressure(x, y, xArray, yArray, lArray, lastIndexPoint) {
  var ratio = 1.0;
  var distance = computeDistance(x, y, xArray, yArray, lastIndexPoint);
  var length = computeLength(x, y, xArray, yArray, lArray, lastIndexPoint);

  if (length === 0) {
    ratio = 0.5;
  } else if (distance === length) {
    ratio = 1.0;
  } else if (distance < 10) {
    ratio = 0.2 + Math.pow(0.1 * distance, 0.4);
  } else if (distance > length - 10) {
    ratio = 0.2 + Math.pow(0.1 * (length - distance), 0.4);
  }
  var pressure = ratio * Math.max(0.1, 1.0 - 0.1 * Math.sqrt(distance));
  return isNaN(parseFloat(pressure)) ? 0.5 : pressure;
}

function filterPointByAcquisitionDelta(x, y, xArray, yArray, width) {
  var delta = 2 + width / 4;
  var ret = false;
  if (xArray.length === 0 || yArray.length === 0 || Math.abs(xArray[xArray.length - 1] - x) >= delta || Math.abs(yArray[yArray.length - 1] - y) >= delta) {
    ret = true;
  }
  return ret;
}

/**
 * Create a new stroke
 * @param {Object} properties Properties to be applied to the stroke.
 * @return {Stroke} New stroke with properties for quadratics draw
 */
function createStrokeComponent(properties) {
  var defaultStroke = {
    type: 'stroke',
    x: [],
    y: [],
    t: [],
    p: [],
    l: [],
    width: 0
  };
  return Object.assign({}, defaultStroke, properties);
}

/**
 * Get a JSON copy of a stroke by filtering its properties
 * @param {Stroke} stroke Current stroke
 * @return {{type: String, x: Array<Number>, y: Array<Number>, t: Array<Number>}} Simplified stroke object
 */
function toJSON$2(stroke) {
  return { type: stroke.type, x: stroke.x, y: stroke.y, t: stroke.t };
}

/**
 * Get a JSON copy of a stroke by filtering its properties
 * @param {Stroke} stroke Current stroke
 * @return {{x: Array<Number>, y: Array<Number>, t: Array<Number>}} Simplified stroke object
 */
function toJSONV4(stroke) {
  return { x: stroke.x, y: stroke.y, t: stroke.t };
}

/**
 * Mutate a stroke by adding a point to it.
 * @param {Stroke} stroke Current stroke
 * @param {{x: Number, y: Number, t: Number}} point Point to add
 * @return {Stroke} Updated stroke
 */
function addPoint(stroke, point) {
  var strokeReference = stroke;
  if (filterPointByAcquisitionDelta(point.x, point.y, strokeReference.x, strokeReference.y, strokeReference.width)) {
    strokeReference.x.push(point.x);
    strokeReference.y.push(point.y);
    strokeReference.t.push(point.t);
    strokeReference.p.push(computePressure(point.x, point.y, strokeReference.x, strokeReference.y, strokeReference.l, strokeReference.x.length - 1));
    strokeReference.l.push(computeLength(point.x, point.y, strokeReference.x, strokeReference.y, strokeReference.l, strokeReference.x.length - 1));
  } else {
    modelLogger.trace('ignore filtered point', point);
  }
  return strokeReference;
}

/**
 * Slice a stroke and return the sliced part of it
 * @param {Stroke} stroke Current stroke
 * @param {Number} [start=0] Zero-based index at which to begin extraction
 * @param {Number} [end=length] Zero-based index at which to end extraction
 * @return {Stroke} Sliced stroke
 */
function slice(stroke) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stroke.x.length;

  var slicedStroke = createStrokeComponent({ color: stroke.color, width: stroke.width });
  for (var i = start; i < end; i++) {
    addPoint(slicedStroke, {
      x: stroke.x[i],
      y: stroke.y[i],
      t: stroke.t[i]
    });
  }
  return slicedStroke;
}

/**
 * Extract point by index
 * @param {Stroke} stroke Current stroke
 * @param {Number} index Zero-based index
 * @return {{x: Number, y: Number, t: Number, p: Number, l: Number}} Point with properties for quadratics draw
 */
function getPointByIndex(stroke, index) {
  var point = void 0;
  if (index !== undefined && index >= 0 && index < stroke.x.length) {
    point = {
      x: stroke.x[index],
      y: stroke.y[index],
      t: stroke.t[index],
      p: stroke.p[index],
      l: stroke.l[index]
    };
  }
  return point;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function mergeBounds(boundsA, boundsB) {
  return {
    minX: Math.min(boundsA.minX, boundsB.minX),
    maxX: Math.max(boundsA.maxX, boundsB.maxX),
    minY: Math.min(boundsA.minY, boundsB.minY),
    maxY: Math.max(boundsA.maxY, boundsB.maxY)
  };
}

function getLineBounds(line) {
  return {
    minX: Math.min(line.firstPoint.x, line.lastPoint.x),
    maxX: Math.max(line.firstPoint.x, line.lastPoint.x),
    minY: Math.min(line.firstPoint.y, line.lastPoint.y),
    maxY: Math.max(line.firstPoint.y, line.lastPoint.y)
  };
}

function getEllipseBounds(ellipse) {
  var angleStep = 0.02; // angle delta between interpolated points on the arc, in radian

  var z1 = Math.cos(ellipse.orientation);
  var z3 = Math.sin(ellipse.orientation);
  var z2 = z1;
  var z4 = z3;
  z1 *= ellipse.maxRadius;
  z2 *= ellipse.minRadius;
  z3 *= ellipse.maxRadius;
  z4 *= ellipse.minRadius;

  var n = Math.abs(ellipse.sweepAngle) / angleStep;

  var x = [];
  var y = [];

  for (var i = 0; i <= n; i++) {
    var angle = ellipse.startAngle + i / n * ellipse.sweepAngle;
    var alpha = Math.atan2(Math.sin(angle) / ellipse.minRadius, Math.cos(angle) / ellipse.maxRadius);

    var cosAlpha = Math.cos(alpha);
    var sinAlpha = Math.sin(alpha);

    x.push(ellipse.center.x + (z1 * cosAlpha - z4 * sinAlpha));
    y.push(ellipse.center.y + (z2 * sinAlpha + z3 * cosAlpha));
  }

  return {
    minX: Math.min.apply(Math, x),
    maxX: Math.max.apply(Math, x),
    minY: Math.min.apply(Math, y),
    maxY: Math.max.apply(Math, y)
  };
}

function getTextLineBounds(textLine) {
  return {
    minX: textLine.data.topLeftPoint.x,
    maxX: textLine.data.topLeftPoint.x + textLine.data.width,
    minY: textLine.data.topLeftPoint.y,
    maxY: textLine.data.topLeftPoint.y + textLine.data.height
  };
}

function getClefBounds(clef) {
  return {
    minX: clef.boundingBox.x,
    maxX: clef.boundingBox.x + clef.boundingBox.width,
    minY: clef.boundingBox.y,
    maxY: clef.boundingBox.y + clef.boundingBox.height
  };
}

function getStrokeBounds(stroke) {
  return {
    minX: Math.min.apply(Math, toConsumableArray(stroke.x)),
    maxX: Math.max.apply(Math, toConsumableArray(stroke.x)),
    minY: Math.min.apply(Math, toConsumableArray(stroke.y)),
    maxY: Math.max.apply(Math, toConsumableArray(stroke.y))
  };
}

/**
 * Get the box enclosing the given symbols
 * @param {Array} symbols Symbols to extract bounds from
 * @param {Bounds} [bounds] Starting bounds for recursion
 * @return {Bounds} Bounding box enclosing symbols
 */
function getSymbolsBounds(symbols) {
  var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { minX: Number.MAX_VALUE, maxX: Number.MIN_VALUE, minY: Number.MAX_VALUE, maxY: Number.MIN_VALUE };

  var boundsRef = bounds;
  boundsRef = symbols.filter(function (symbol) {
    return symbol.type === 'stroke';
  }).map(getStrokeBounds).reduce(mergeBounds, boundsRef);
  boundsRef = symbols.filter(function (symbol) {
    return symbol.type === 'clef';
  }).map(getClefBounds).reduce(mergeBounds, boundsRef);
  boundsRef = symbols.filter(function (symbol) {
    return symbol.type === 'line';
  }).map(getLineBounds).reduce(mergeBounds, boundsRef);
  boundsRef = symbols.filter(function (symbol) {
    return symbol.type === 'ellipse';
  }).map(getEllipseBounds).reduce(mergeBounds, boundsRef);
  boundsRef = symbols.filter(function (symbol) {
    return symbol.type === 'textLine';
  }).map(getTextLineBounds).reduce(mergeBounds, boundsRef);
  return boundsRef;
}

function getDefaultMusicSymbols(configuration) {
  var defaultStaff = Object.assign({}, { type: 'staff' }, configuration.recognitionParams.v3.musicParameter.staff);
  var defaultClef = {
    type: 'clef',
    value: Object.assign({}, configuration.recognitionParams.v3.musicParameter.clef)
  };
  defaultClef.value.yAnchor = defaultStaff.top + defaultStaff.gap * (defaultStaff.count - defaultClef.value.line);
  delete defaultClef.value.line;
  defaultClef.boundingBox = MusicClefs[defaultClef.value.symbol].getBoundingBox(defaultStaff.gap, 0, defaultClef.value.yAnchor);
  return [defaultStaff, defaultClef];
}

/**
 * Get the default symbols for the current recognition type
 * @param {Configuration} configuration Current recognition parameters from which extract default symbols
 * @return {Array} Symbols matching configuration
 */
function getDefaultSymbols(configuration) {
  switch (configuration.recognitionParams.type) {
    case Constants.RecognitionType.MUSIC:
      return getDefaultMusicSymbols(configuration);
    default:
      return [];
  }
}

/**
 * Recognition positions
 * @typedef {Object} RecognitionPositions
 * @property {Number} [lastSentPosition=-1] Index of the last sent stroke.
 * @property {Number} [lastReceivedPosition=-1] Index of the last received stroke.
 * @property {Number} [lastRenderedPosition=-1] Last rendered recognized symbol position
 */

/**
 * Raw results
 * @typedef {Object} RawResults
 * @property {Object} convert=undefined The convert result
 * @property {Object} exports=undefined The exports output as return by the recognition service.
 */

/**
 * Editor model
 * @typedef {Object} Model
 * @property {Stroke} currentStroke=undefined Stroke in building process.
 * @property {Array<Stroke>} rawStrokes=[] List of captured strokes.
 * @property {Array} strokeGroups=[] Group of strokes with same pen style.
 * @property {RecognitionPositions} lastPositions Last recognition sent/received stroke indexes.
 * @property {Array<Object>} defaultSymbols=[] Default symbols, relative to the current recognition type.
 * @property {Array<Object>} recognizedSymbols=undefined Symbols to render (e.g. stroke, shape primitives, string, characters...).
 * @property {Object} exports=undefined Result of the export (e.g. mathml, latex, text...).
 * @property {RawResults} rawResults The recognition output as return by the recognition service.
 * @property {Number} creationTime Date of creation timestamp.
 * @property {Number} modificationTime=undefined Date of lastModification.
 */

/**
 * Bounding box
 * @typedef {Object} Bounds
 * @property {Number} minX Minimal x coordinate
 * @property {Number} maxX Maximal x coordinate
 * @property {Number} minY Minimal y coordinate
 * @property {Number} maxY Maximal y coordinate
 */

/**
 * Create a new model
 * @param {Configuration} [configuration] Parameters to use to populate default recognition symbols
 * @return {Model} New model
 */
function createModel(configuration) {
  // see @typedef documentation on top
  return {
    currentStroke: undefined,
    rawStrokes: [],
    strokeGroups: [],
    lastPositions: {
      lastSentPosition: -1,
      lastReceivedPosition: -1,
      lastRenderedPosition: -1
    },
    defaultSymbols: configuration ? getDefaultSymbols(configuration) : [],
    recognizedSymbols: undefined,
    exports: undefined,
    rawResults: {
      convert: undefined,
      exports: undefined
    },
    creationTime: new Date().getTime(),
    modificationTime: undefined
  };
}

/**
 * Clear the model.
 * @param {Model} model Current model
 * @return {Model} Cleared model
 */
function clearModel(model) {
  var modelReference = model;
  modelReference.currentStroke = undefined;
  modelReference.rawStrokes = [];
  modelReference.strokeGroups = [];
  modelReference.lastPositions.lastSentPosition = -1;
  modelReference.lastPositions.lastReceivedPosition = -1;
  modelReference.lastPositions.lastRenderedPosition = -1;
  modelReference.recognizedSymbols = undefined;
  modelReference.exports = undefined;
  modelReference.rawResults.convert = undefined;
  modelReference.rawResults.exports = undefined;
  return modelReference;
}

/**
 * Check if the model needs to be redrawn.
 * @param {Model} model Current model
 * @return {Boolean} True if the model needs to be redrawn, false otherwise
 */
function needRedraw(model) {
  return model.recognizedSymbols ? model.rawStrokes.length !== model.recognizedSymbols.filter(function (symbol) {
    return symbol.type === 'stroke';
  }).length : false;
}

/**
 * Mutate the model given in parameter by adding the new strokeToAdd.
 * @param {Model} model Current model
 * @param {Stroke} stroke Stroke to be added to pending ones
 * @return {Model} Updated model
 */
function addStroke(model, stroke) {
  // We use a reference to the model. The purpose here is to update the pending stroke only.
  var modelReference = model;
  modelLogger.debug('addStroke', stroke);
  modelReference.rawStrokes.push(stroke);
  return modelReference;
}

/**
 * Mutate the model given in parameter by adding the new strokeToAdd and the penstyle. Used for iink REST.
 * @param {Model} model Current model
 * @param {Stroke} stroke Stroke to be added to pending ones
 * @param {PenStyle} strokePenStyle
 * @return {Model} Updated model
 */
function addStrokeToGroup(model, stroke, strokePenStyle) {
  // We use a reference to the model. The purpose here is to update the pending stroke only.
  var modelReference = model;
  modelLogger.debug('addStroke', stroke);
  var lastGroup = modelReference.strokeGroups.length - 1;
  if (modelReference.strokeGroups[lastGroup] && modelReference.strokeGroups[lastGroup].penStyle === strokePenStyle) {
    modelReference.strokeGroups[lastGroup].strokes.push(stroke);
  } else {
    var newStrokeGroup = {
      penStyle: strokePenStyle,
      strokes: []
    };
    var strokeCopy = {};
    Object.assign(strokeCopy, stroke);
    newStrokeGroup.strokes.push(strokeCopy);
    modelReference.strokeGroups.push(newStrokeGroup);
  }
  return modelReference;
}

/**
 * Get the strokes that needs to be recognized
 * @param {Model} model Current model
 * @param {Number} [position=lastReceived] Index from where to extract strokes
 * @return {Array<Stroke>} Pending strokes
 */
function extractPendingStrokes(model) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : model.lastPositions.lastReceivedPosition + 1;

  return model.rawStrokes.slice(position);
}

/**
 * Mutate the model by adding a point and close the current stroke.
 * @param {Model} model Current model
 * @param {{x: Number, y: Number, t: Number}} point Captured point to create current stroke
 * @param {Object} properties Properties to be applied to the current stroke
 * @param {Number} [dpi=96] The screen dpi resolution
 * @return {Model} Updated model
 */
function initPendingStroke(model, point, properties) {
  var dpi = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 96;

  if (properties && properties['-myscript-pen-width']) {
    var pxWidth = properties['-myscript-pen-width'] * dpi / 25.4;
    Object.assign(properties, { width: pxWidth / 2 }); // FIXME hack to get better render
  }
  var modelReference = model;
  modelLogger.trace('initPendingStroke', point);
  // Setting the current stroke to an empty one
  modelReference.currentStroke = createStrokeComponent(properties);
  modelReference.currentStroke = addPoint(modelReference.currentStroke, point);
  return modelReference;
}

/**
 * Mutate the model by adding a point to the current pending stroke.
 * @param {Model} model Current model
 * @param {{x: Number, y: Number, t: Number}} point Captured point to be append to the current stroke
 * @return {Model} Updated model
 */
function appendToPendingStroke(model, point) {
  var modelReference = model;
  if (modelReference.currentStroke) {
    modelLogger.trace('appendToPendingStroke', point);
    modelReference.currentStroke = addPoint(modelReference.currentStroke, point);
  }
  return modelReference;
}

/**
 * Mutate the model by adding the new point on a initPendingStroke.
 * @param {Model} model Current model
 * @param {{x: Number, y: Number, t: Number}} point Captured point to be append to the current stroke
 * @param {PenStyle} penStyle
 * @return {Model} Updated model
 */
function endPendingStroke(model, point, penStyle) {
  var modelReference = model;
  if (modelReference.currentStroke) {
    modelLogger.trace('endPendingStroke', point);
    var currentStroke = addPoint(modelReference.currentStroke, point);
    // Mutating pending strokes
    addStroke(modelReference, currentStroke);
    addStrokeToGroup(modelReference, currentStroke, penStyle);
    // Resetting the current stroke to an undefined one
    delete modelReference.currentStroke;
  }
  return modelReference;
}

/**
 * Get the bounds of the current model.
 * @param {Model} model Current model
 * @return {Bounds} Bounding box enclosing the current drawn model
 */
function getBorderCoordinates(model) {
  var modelBounds = { minX: Number.MAX_VALUE, maxX: Number.MIN_VALUE, minY: Number.MAX_VALUE, maxY: Number.MIN_VALUE };

  // Default symbols
  if (model.defaultSymbols && model.defaultSymbols.length > 0) {
    modelBounds = getSymbolsBounds(model.defaultSymbols, modelBounds);
  }
  // Recognized symbols
  if (model.recognizedSymbols && model.recognizedSymbols.length > 0) {
    modelBounds = getSymbolsBounds(model.recognizedSymbols, modelBounds);
    // Pending strokes
    modelBounds = getSymbolsBounds(extractPendingStrokes(model), modelBounds);
  } else {
    modelBounds = getSymbolsBounds(model.rawStrokes, modelBounds);
  }
  return modelBounds;
}

/**
 * Extract strokes from an ink range
 * @param {Model} model Current model
 * @param {Number} firstStroke First stroke index to extract
 * @param {Number} lastStroke Last stroke index to extract
 * @param {Number} firstPoint First point index to extract
 * @param {Number} lastPoint Last point index to extract
 * @return {Array<Stroke>} The extracted strokes
 */
function extractStrokesFromInkRange(model, firstStroke, lastStroke, firstPoint, lastPoint) {
  return model.rawStrokes.slice(firstStroke, lastStroke + 1).map(function (stroke, index, slicedStrokes) {
    if (slicedStrokes.length < 2) {
      return slice(stroke, firstPoint, lastPoint + 1);
    }
    if (index === 0) {
      return slice(stroke, firstPoint);
    }
    if (index === slicedStrokes.length - 1) {
      return slice(stroke, 0, lastPoint + 1);
    }
    return stroke;
  });
}

/**
 * Update model lastSentPosition
 * @param {Model} model
 * @param {Number} [position]
 * @return {Model}
 */
function updateModelSentPosition(model) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : model.rawStrokes.length - 1;

  var modelReference = model;
  modelReference.lastPositions.lastSentPosition = position;
  return modelReference;
}

/**
 * Update model lastReceivedPosition regarding to lastSentPosition
 * @param {Model} model
 * @return {Model}
 */
function updateModelReceivedPosition(model) {
  var modelReference = model;
  modelReference.lastPositions.lastReceivedPosition = modelReference.lastPositions.lastSentPosition;
  return modelReference;
}

/**
 * Reset model lastReceivedPosition and lastSentPosition
 * @param {Model} model
 * @return {Model}
 */
function resetModelPositions(model) {
  var modelReference = model;
  modelReference.lastPositions.lastSentPosition = -1;
  modelReference.lastPositions.lastReceivedPosition = -1;
  return modelReference;
}

/**
 * Reset model lastRenderedPosition
 * @param {Model} model
 * @return {Model}
 */
function resetModelRendererPosition(model) {
  var modelReference = model;
  modelReference.lastPositions.lastRenderedPosition = -1;
  return modelReference;
}

/**
 * Update model lastRenderedPosition
 * @param {Model} model
 * @param {Number} [position]
 * @return {Model}
 */
function updateModelRenderedPosition(model) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : model.recognizedSymbols ? model.recognizedSymbols.length - 1 : -1;

  var modelReference = model;
  modelReference.lastPositions.lastRenderedPosition = position;
  return modelReference;
}

/**
 * Get the symbols that needs to be rendered
 * @param {Model} model Current model
 * @param {Number} [position=lastRendered] Index from where to extract symbols
 * @return {Array<Object>}
 */
function extractPendingRecognizedSymbols(model) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : model.lastPositions.lastRenderedPosition + 1;

  return model.recognizedSymbols ? model.recognizedSymbols.slice(position) : [];
}

/**
 * Clone model
 * @param {Model} model Current model
 * @return {Model} Clone of the current model
 */
function cloneModel(model) {
  var clonedModel = Object.assign({}, model);
  // We clone the properties that need to be. Take care of arrays.
  clonedModel.defaultSymbols = [].concat(toConsumableArray(model.defaultSymbols));
  clonedModel.currentStroke = model.currentStroke ? Object.assign({}, model.currentStroke) : undefined;
  clonedModel.rawStrokes = [].concat(toConsumableArray(model.rawStrokes));
  clonedModel.strokeGroups = JSON.parse(JSON.stringify(model.strokeGroups));
  clonedModel.lastPositions = Object.assign({}, model.lastPositions);
  clonedModel.exports = model.exports ? Object.assign({}, model.exports) : undefined;
  clonedModel.rawResults = Object.assign({}, model.rawResults);
  clonedModel.recognizedSymbols = model.recognizedSymbols ? [].concat(toConsumableArray(model.recognizedSymbols)) : undefined;
  return clonedModel;
}

/**
 * Merge models
 * @param {...Model} models Models to merge (ordered)
 * @return {Model} Updated model
 */
function mergeModels() {
  for (var _len = arguments.length, models = Array(_len), _key = 0; _key < _len; _key++) {
    models[_key] = arguments[_key];
  }

  return models.reduce(function (a, b) {
    var modelRef = a;
    modelRef.recognizedSymbols = b.recognizedSymbols;
    modelRef.lastPositions.lastSentPosition = b.lastPositions.lastSentPosition;
    modelRef.lastPositions.lastReceivedPosition = b.lastPositions.lastReceivedPosition;
    modelRef.lastPositions.lastRenderedPosition = b.lastPositions.lastRenderedPosition;
    modelRef.rawResults = b.rawResults;
    modelRef.exports = b.exports;
    return modelRef;
  });
}

var InkModel = /*#__PURE__*/Object.freeze({
  createModel: createModel,
  clearModel: clearModel,
  needRedraw: needRedraw,
  addStroke: addStroke,
  addStrokeToGroup: addStrokeToGroup,
  extractPendingStrokes: extractPendingStrokes,
  initPendingStroke: initPendingStroke,
  appendToPendingStroke: appendToPendingStroke,
  endPendingStroke: endPendingStroke,
  getBorderCoordinates: getBorderCoordinates,
  extractStrokesFromInkRange: extractStrokesFromInkRange,
  updateModelSentPosition: updateModelSentPosition,
  updateModelReceivedPosition: updateModelReceivedPosition,
  resetModelPositions: resetModelPositions,
  resetModelRendererPosition: resetModelRendererPosition,
  updateModelRenderedPosition: updateModelRenderedPosition,
  extractPendingRecognizedSymbols: extractPendingRecognizedSymbols,
  cloneModel: cloneModel,
  mergeModels: mergeModels
});

/**
 * Renderer info
 * @typedef {Object} RendererInfo
 * @property {String} type Renderer type.
 * @property {String} apiVersion Supported api version.
 */

/**
 * Default renderer
 * @typedef {Object} Renderer
 * @property {function(): RendererInfo} getInfo Get some information about this renderer
 * @property {function(element: Element, minHeight: Number, minWidth: Number): Object} attach Populate the DOM element to create rendering area.
 * @property {function(element: Element, context: Object)} detach Remove rendering area from the DOM element.
 * @property {function(context: Object, model: Model, stroker: Stroker)} resize Explicitly resize the rendering area.
 * @property {function(context: Object, model: Model, stroker: Stroker): Model} drawCurrentStroke Draw the model currentStroke.
 * @property {function(context: Object, model: Model, stroker: Stroker): Model} drawModel Draw the model defaultSymbols and recognizedSymbols.
 */

/**
 * Get info
 * @return {RendererInfo} Information about this renderer
 */
function getInfo() {
  return {
    type: 'canvas',
    apiVersion: 'V3'
  };
}

function getPixelRatio(canvas) {
  if (canvas) {
    var context = canvas.getContext('2d');
    // we are using a browser object
    // eslint-disable-next-line no-undef
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    return devicePixelRatio / backingStoreRatio;
  }
  return 1;
}

function detectPixelRatio(element) {
  // we are using a browser object
  // eslint-disable-next-line no-undef
  var tempCanvas = document.createElement('canvas');
  var canvasRatio = getPixelRatio(tempCanvas);
  // document.removeChild(tempCanvas);
  return canvasRatio;
}

function createCanvas(element, type) {
  // eslint-disable-next-line no-undef
  var browserDocument = document;
  var canvas = browserDocument.createElement('canvas');
  canvas.classList.add(type);
  canvas.classList.add('ms-canvas');
  element.appendChild(canvas);
  rendererLogger.debug('canvas created', canvas);
  return canvas;
}

function resizeContent(context) {
  var elements = [context.renderingCanvas, context.capturingCanvas];
  elements.forEach(function (canvas) {
    var domElement = canvas.parentNode;
    var width = domElement.clientWidth < context.minWidth ? context.minWidth : domElement.clientWidth;
    var height = domElement.clientHeight < context.minHeight ? context.minHeight : domElement.clientHeight;
    /* eslint-disable no-param-reassign */
    canvas.width = width * context.pixelRatio;
    canvas.height = height * context.pixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    /* eslint-enable no-param-reassign */
    canvas.getContext('2d').scale(context.pixelRatio, context.pixelRatio);
    rendererLogger.debug('canvas size changed', canvas);
  });
  return context;
}

/**
 * Attach the renderer to the DOM element
 * @param {Element} element DOM element to attach the rendering elements
 * @param {Number} [minHeight=0] Minimal height of the editor
 * @param {Number} [minWidth=0] Minimal width of the editor
 * @return {Object} The renderer context to give as parameter when a draw model will be call
 */
function attach$1(element) {
  var minHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var minWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  rendererLogger.debug('attach renderer', element);
  var pixelRatio = detectPixelRatio(element);
  var resources = getMusicClefElements();
  resources.forEach(function (clef) {
    return element.appendChild(clef);
  });

  var renderingCanvas = createCanvas(element, 'ms-rendering-canvas');
  var capturingCanvas = createCanvas(element, 'ms-capture-canvas');

  var context = {
    pixelRatio: pixelRatio,
    minHeight: minHeight,
    minWidth: minWidth,
    renderingCanvas: renderingCanvas,
    renderingCanvasContext: renderingCanvas.getContext('2d'),
    capturingCanvas: capturingCanvas,
    capturingCanvasContext: capturingCanvas.getContext('2d'),
    resources: resources
  };

  return resizeContent(context);
}

/**
 * Detach the renderer from the DOM element
 * @param {Element} element DOM element to attach the rendering elements
 * @param {Object} context Current rendering context
 */
function detach$1(element, context) {
  rendererLogger.debug('detach renderer', element);
  context.resources.forEach(function (res) {
    return element.removeChild(res);
  });
  element.removeChild(context.renderingCanvas);
  element.removeChild(context.capturingCanvas);
}

/**
 * Update the rendering context size
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
function resize(context, model, stroker) {
  return this.drawModel(resizeContent(context), model, stroker);
}

function drawSymbol(context, symbol, stroker) {
  var type = symbol.elementType ? symbol.elementType : symbol.type;
  rendererLogger.trace('attempting to draw ' + type + ' symbol');
  if (type === 'stroke') {
    drawStroke(context, symbol, stroker);
  } else if (TextSymbols[type]) {
    drawTextSymbol(context, symbol);
  } else if (ShapeSymbols[type]) {
    drawShapeSymbol(context, symbol);
  } else if (MusicSymbols[type]) {
    drawMusicSymbol(context, symbol);
  } else {
    rendererLogger.warn('impossible to draw ' + type + ' symbol');
  }
}

/**
 * Draw the current stroke from the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
function drawCurrentStroke(context, model, stroker) {
  // Render the current stroke
  context.capturingCanvasContext.clearRect(0, 0, context.capturingCanvas.width, context.capturingCanvas.height);
  rendererLogger.trace('drawing current stroke ', model.currentStroke);
  drawStroke(context.capturingCanvasContext, model.currentStroke, stroker);
  return model;
}

/**
 * Draw all symbols contained into the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
function drawModel(context, model, stroker) {
  context.renderingCanvasContext.clearRect(0, 0, context.renderingCanvas.width, context.renderingCanvas.height);
  // Displaying the default symbols and pending strokes
  var symbols = [].concat(toConsumableArray(model.defaultSymbols));
  // Displaying the recognition symbols or raw strokes
  if (model.recognizedSymbols) {
    symbols.push.apply(symbols, toConsumableArray(model.recognizedSymbols));
    symbols.push.apply(symbols, toConsumableArray(extractPendingStrokes(model)));
  } else {
    symbols.push.apply(symbols, toConsumableArray(model.rawStrokes));
  }
  symbols.forEach(function (symbol) {
    return drawSymbol(context.renderingCanvasContext, symbol, stroker);
  });
  context.capturingCanvasContext.clearRect(0, 0, context.capturingCanvas.width, context.capturingCanvas.height);
  return model;
}

var CanvasRenderer = /*#__PURE__*/Object.freeze({
  getInfo: getInfo,
  attach: attach$1,
  detach: detach$1,
  resize: resize,
  drawCurrentStroke: drawCurrentStroke,
  drawModel: drawModel
});

/** ===============================================================================================
 * Compute quadratics control points
 * ============================================================================================= */

/**
 *
 * @param {{x: Number, y: Number, p: Number}} point
 * @param angle
 * @param width
 * @return {[{x: Number, y: Number},{x: Number, y: Number}]}
 */
function computeLinksPoints(point, angle, width) {
  var radius = point.p * width;
  return [{
    x: point.x - Math.sin(angle) * radius,
    y: point.y + Math.cos(angle) * radius
  }, {
    x: point.x + Math.sin(angle) * radius,
    y: point.y - Math.cos(angle) * radius
  }];
}

/**
 *
 * @param {{x: Number, y: Number, p: Number}} point1
 * @param {{x: Number, y: Number, p: Number}} point2
 * @return {{x: Number, y: Number, p: Number}}
 */
function computeMiddlePoint(point1, point2) {
  return {
    x: (point2.x + point1.x) / 2,
    y: (point2.y + point1.y) / 2,
    p: (point2.p + point1.p) / 2
  };
}

/**
 *
 * @param {{x: Number, y: Number}} begin
 * @param {{x: Number, y: Number}} end
 * @return {Number}
 */
function computeAxeAngle(begin, end) {
  return Math.atan2(end.y - begin.y, end.x - begin.x);
}

/**
 * Stroker info
 * @typedef {Object} StrokerInfo
 * @property {String} type Renderer type.
 * @property {String} name Stroker name.
 * @property {String} apiVersion Supported api version.
 */

/**
 * Define how a stroke should be drawn
 * @typedef {Object} Stroker
 * @property {function(): StrokerInfo} getInfo Get some information about this stroker
 * @property {function(context: Object, stroke: Stroke)} drawStroke Render a stroke on the current context.
 */

/**
 * Get info
 * @return {StrokerInfo} Information about this stroker
 */
function getInfo$1() {
  return {
    type: 'canvas',
    name: 'quadratic',
    apiVersion: 'V3'
  };
}

function renderArc(context, center, radius) {
  context.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
}

function renderLine(context, begin, end, width) {
  var linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, end), width);
  var linkPoints2 = computeLinksPoints(end, computeAxeAngle(begin, end), width);

  context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
  context.lineTo(linkPoints2[0].x, linkPoints2[0].y);
  context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
  context.lineTo(linkPoints1[1].x, linkPoints1[1].y);
}

function renderFinal(context, begin, end, width) {
  var ARCSPLIT = 6;
  var angle = computeAxeAngle(begin, end);
  var linkPoints = computeLinksPoints(end, angle, width);
  context.moveTo(linkPoints[0].x, linkPoints[0].y);
  for (var i = 1; i <= ARCSPLIT; i++) {
    var newAngle = angle - i * Math.PI / ARCSPLIT;
    context.lineTo(end.x - end.p * width * Math.sin(newAngle), end.y + end.p * width * Math.cos(newAngle));
  }
}

function renderQuadratic(context, begin, end, ctrl, width) {
  var linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, ctrl), width);
  var linkPoints2 = computeLinksPoints(end, computeAxeAngle(ctrl, end), width);
  var linkPoints3 = computeLinksPoints(ctrl, computeAxeAngle(begin, end), width);

  context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
  context.quadraticCurveTo(linkPoints3[0].x, linkPoints3[0].y, linkPoints2[0].x, linkPoints2[0].y);
  context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
  context.quadraticCurveTo(linkPoints3[1].x, linkPoints3[1].y, linkPoints1[1].x, linkPoints1[1].y);
}

/**
 * Draw a stroke on a canvas, using quadratics
 * @param {Object} context Current rendering context
 * @param {Stroke} stroke Current stroke to be drawn
 */
function drawStroke$1(context, stroke) {
  var contextReference = context;
  var length = stroke.x.length;
  var width = stroke.width > 0 ? stroke.width : contextReference.lineWidth;
  var color = stroke.color ? stroke.color : contextReference.strokeStyle;
  var firstPoint = getPointByIndex(stroke, 0);
  var nbquadratics = length - 2;

  contextReference.save();
  try {
    contextReference.beginPath();
    if (length < 3) {
      renderArc(contextReference, firstPoint, width * 0.6);
    } else {
      renderArc(contextReference, firstPoint, width * firstPoint.p);
      renderLine(contextReference, firstPoint, computeMiddlePoint(firstPoint, getPointByIndex(stroke, 1)), width);

      // Possibility to try this (the start looks better when the ink is large)
      // var first = computeMiddlePoint(stroke[0], stroke[1]);
      // contextReference.arc(first.x, first.y, width * first.p, 0, Math.PI * 2, true);

      for (var i = 0; i < nbquadratics; i++) {
        renderQuadratic(contextReference, computeMiddlePoint(getPointByIndex(stroke, i), getPointByIndex(stroke, i + 1)), computeMiddlePoint(getPointByIndex(stroke, i + 1), getPointByIndex(stroke, i + 2)), getPointByIndex(stroke, i + 1), width);
      }
      renderLine(contextReference, computeMiddlePoint(getPointByIndex(stroke, length - 2), getPointByIndex(stroke, length - 1)), getPointByIndex(stroke, length - 1), width);
      renderFinal(contextReference, getPointByIndex(stroke, length - 2), getPointByIndex(stroke, length - 1), width);
    }
    contextReference.closePath();
    if (color !== undefined) {
      contextReference.fillStyle = color;
      contextReference.fill();
    }
  } finally {
    contextReference.restore();
  }
}

var QuadraticCanvasStroker = /*#__PURE__*/Object.freeze({
  getInfo: getInfo$1,
  drawStroke: drawStroke$1
});

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
}

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

function none() {}

function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function empty() {
  return [];
}

function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

function selection_selectAll(select) {
  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}

var matcher = function(selector) {
  return function() {
    return this.matches(selector);
  };
};

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!element.matches) {
    var vendorMatches = element.webkitMatchesSelector
        || element.msMatchesSelector
        || element.mozMatchesSelector
        || element.oMatchesSelector;
    matcher = function(selector) {
      return function() {
        return vendorMatches.call(this, selector);
      };
    };
  }
}

var matcher$1 = matcher;

function selection_filter(match) {
  if (typeof match !== "function") match = matcher$1(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant(x) {
  return function() {
    return x;
  };
}

var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

function selection_data(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

function selection_exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}

function selection_merge(selection$$1) {

  for (var groups0 = this._groups, groups1 = selection$$1._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
}

function selection_order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
}

function selection_node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}

function defaultView(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
}

function selection_cloneDeep() {
  return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

var filterEvents = {};

if (typeof document !== "undefined") {
  var element$1 = document.documentElement;
  if (!("onmouseenter" in element$1)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selection_selectAll,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  merge: selection_merge,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch
};

function select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}

/**
 * Draw a stroke symbol
 * @param {Object} context Current rendering context
 * @param {Stroke} stroke Stroke to be drawn
 * @param {Stroker} stroker Stroker to use to render a stroke
 */
function drawStroke$2(context, stroke, stroker) {
  if (stroker) {
    stroker.drawStroke(context, stroke);
  }
}

/**
 * Get info
 * @return {RendererInfo} Information about this renderer
 */
function getInfo$2() {
  return {
    type: 'svg',
    apiVersion: 'V4'
  };
}

/**
 * Populate the dom element
 * @param {Element} element DOM element to attach the rendering elements
 * @return {Object} The renderer context to give as parameter when a draw model will be call
 */
function attach$2(element) {
  var elementRef = element;
  rendererLogger.debug('populate root element', elementRef);
  elementRef.style.fontSize = '10px';
  return select(elementRef);
}

/**
 * Detach the renderer from the DOM element
 * @param {Element} element DOM element to attach the rendering elements
 * @param {Object} context Current rendering context
 */
function detach$2(element, context) {
  rendererLogger.debug('detach renderer', element);
  context.select('svg').remove();
}

/**
 * Update the rendering context size
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @param {Number} minHeight Minimal height for resize
 * @param {Number} minWidth Minimal Width for resize
 * @return {Model}
 */
function resize$1(context, model, stroker, minHeight, minWidth) {
  var rect = context.node().getBoundingClientRect();
  var svg = context.selectAll('svg');
  var width = rect.width < minWidth ? minWidth : rect.width;
  var height = rect.height < minHeight ? minHeight : rect.height;
  svg.attr('viewBox', '0 0 ' + width + ', ' + height);
  svg.attr('width', width + 'px');
  svg.attr('height', height + 'px');
  rendererLogger.debug('svg viewBox changed', svg);
  return model;
}

/**
 * Draw the current stroke from the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
function drawCurrentStroke$1(context, model, stroker) {
  var modelRef = model;
  // Add a pending id for pending strokes rendering
  modelRef.currentStroke.id = 'pendingStroke-' + model.rawStrokes.length;
  // Render the current stroke
  rendererLogger.trace('drawing current stroke ', model.currentStroke);
  context.select('#pendingStrokes #' + modelRef.currentStroke.id).remove();
  drawStroke$2(context.select('#pendingStrokes').append('path').attr('id', model.currentStroke.id), model.currentStroke, stroker);
  return modelRef;
}

function insertAdjacentSVG(element, position, html) {
  var container = element.ownerDocument.createElementNS('http://www.w3.org/2000/svg', '_');
  container.innerHTML = html;

  switch (position.toLowerCase()) {
    case 'beforebegin':
      element.parentNode.insertBefore(container.firstChild, element);
      break;
    case 'afterbegin':
      element.insertBefore(container.lastChild, element.firstChild);
      break;
    case 'beforeend':
      element.appendChild(container.firstChild);
      break;
    case 'afterend':
      element.parentNode.insertBefore(container.lastChild, element.nextSibling);
      break;
    default:
      rendererLogger.warn('Invalid insertAdjacentHTML position');
      break;
  }
}

/**
 * Draw all symbols contained into the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
function drawModel$1(context, model, stroker) {
  var drawSymbol = function drawSymbol(symbol, symbolContext) {
    rendererLogger.trace('attempting to draw ' + symbol.type + ' symbol');
    if (symbol.type === 'stroke' && !symbolContext.select('id', symbol.id)) {
      drawStroke$2(symbolContext.append('path').attr('id', symbol.id), symbol, stroker);
    } else {
      rendererLogger.warn('impossible to draw ' + symbol.type + ' symbol');
    }
  };

  var updateView = function updateView(patchUpdate) {
    // We only add in the stack patch with updates
    patchUpdate.updates.forEach(function (update) {
      try {
        var svgElementSelector = 'svg[data-layer="' + patchUpdate.layer + '"]';
        switch (update.type) {
          case 'REPLACE_ALL':
            {
              context.select(svgElementSelector).remove();
              var parent = context.node();
              if (parent.insertAdjacentHTML) {
                parent.insertAdjacentHTML('beforeEnd', update.svg);
              } else {
                insertAdjacentSVG(parent, 'beforeEnd', update.svg);
              }
              if (patchUpdate.layer === 'MODEL') {
                context.select(svgElementSelector).append('g').attr('id', 'pendingStrokes');
              }
            }
            break;
          case 'REMOVE_ELEMENT':
            {
              if (update.id.includes('s') || update.id.includes('MODEL')) {
                context.select('#' + update.id).remove();
              } else {
                context.select('#' + update.id).attr('class', 'removed-stroke');
                setTimeout(function () {
                  context.select('#' + update.id).remove();
                }, 100);
              }
              break;
            }
          case 'REPLACE_ELEMENT':
            {
              var _parent = context.select('#' + update.id).node().parentNode;
              context.select('#' + update.id).remove();
              if (_parent.insertAdjacentHTML) {
                _parent.insertAdjacentHTML('beforeEnd', update.svg);
              } else {
                insertAdjacentSVG(_parent, 'beforeEnd', update.svg);
                context.node().insertAdjacentHTML('beforeEnd', context.select(svgElementSelector).remove().node().outerHTML);
              }
            }
            break;
          case 'REMOVE_CHILD':
            context.select('#' + update.parentId + ' > *:nth-child(' + (update.index + 1) + ')').remove();
            break;
          case 'APPEND_CHILD':
            {
              var _parent2 = context.select(update.parentId ? '#' + update.parentId : svgElementSelector).node();
              if (_parent2.insertAdjacentHTML) {
                _parent2.insertAdjacentHTML('beforeEnd', update.svg);
              } else {
                insertAdjacentSVG(_parent2, 'beforeEnd', update.svg);
                context.node().insertAdjacentHTML('beforeEnd', context.select(svgElementSelector).remove().node().outerHTML);
              }
            }
            break;
          case 'INSERT_BEFORE':
            {
              var _parent3 = context.select('#' + update.refId).node();
              if (_parent3.insertAdjacentHTML) {
                _parent3.insertAdjacentHTML('beforeBegin', update.svg);
              } else {
                insertAdjacentSVG(_parent3, 'beforeBegin', update.svg);
                context.node().insertAdjacentHTML('beforeEnd', context.select(svgElementSelector).remove().node().outerHTML);
              }
            }
            break;
          case 'REMOVE_ATTRIBUTE':
            context.selectAll(update.id ? '#' + update.id : 'svg').attr(update.name, null);
            break;
          case 'SET_ATTRIBUTE':
            {
              // We ignore setAttributes on the svg element because we handle the resize elsewhere to prevent a blink effect
              // that occurs if we are waiting for the server to resize.
              if (update.id) {
                context.selectAll('#' + update.id).attr(update.name, update.value);
              }
              break;
            }
          default:
            rendererLogger.debug('unknown update ' + update.type + ' action');
            break;
        }
      } catch (e) {
        rendererLogger.error('Invalid update ' + update.type, update);
        rendererLogger.error('Error on svg patch', e);
      }
    });
  };

  var pendingRecognizedSymbols = extractPendingRecognizedSymbols(model);
  if (pendingRecognizedSymbols) {
    pendingRecognizedSymbols.forEach(function (patch) {
      return updateView(patch);
    });
    updateModelRenderedPosition(model);
  }

  var pendingStrokes = extractPendingStrokes(model);
  if (pendingStrokes) {
    pendingStrokes.forEach(function (stroke) {
      return drawSymbol(stroke, context.select('#pendingStrokes'));
    });
  }
  return model;
}

var SVGRenderer = /*#__PURE__*/Object.freeze({
  getInfo: getInfo$2,
  attach: attach$2,
  detach: detach$2,
  resize: resize$1,
  drawCurrentStroke: drawCurrentStroke$1,
  drawModel: drawModel$1
});

/**
 * Get info
 * @return {StrokerInfo} Information about this stroker
 */
function getInfo$3() {
  return {
    type: 'svg',
    name: 'quadratic',
    apiVersion: 'V4'
  };
}

function renderArc$1(context, center, radius) {
  var svgPath = ['M ' + center.x + ',' + center.y, 'm ' + -radius + ',0', 'a ' + radius + ',' + radius + ' 0 1 0 ' + radius * 2 + ',0', 'a ' + radius + ',' + radius + ' 0 1 0 ' + -(radius * 2) + ',0'].join(' ');
  return svgPath;
}

function renderLine$1(context, begin, end, width) {
  var linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, end), width);
  var linkPoints2 = computeLinksPoints(end, computeAxeAngle(begin, end), width);

  var svgPath = ['M ' + linkPoints1[0].x + ',' + linkPoints1[0].y, 'L ' + linkPoints2[0].x + ',' + linkPoints2[0].y, 'L ' + linkPoints2[1].x + ',' + linkPoints2[1].y, 'L ' + linkPoints1[1].x + ',' + linkPoints1[1].y].join(' ');
  return svgPath;
}

function renderFinal$1(context, begin, end, width) {
  var ARCSPLIT = 6;
  var angle = computeAxeAngle(begin, end);
  var linkPoints = computeLinksPoints(end, angle, width);

  var parts = ['M ' + linkPoints[0].x + ',' + linkPoints[0].y];
  for (var i = 1; i <= ARCSPLIT; i++) {
    var newAngle = angle - i * (Math.PI / ARCSPLIT);
    parts.push('L ' + (end.x - end.p * width * Math.sin(newAngle)) + ',' + (end.y + end.p * width * Math.cos(newAngle)));
  }
  var svgPath = parts.join(' ');
  return svgPath;
}

function renderQuadratic$1(context, begin, end, ctrl, width) {
  var linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, ctrl), width);
  var linkPoints2 = computeLinksPoints(end, computeAxeAngle(ctrl, end), width);
  var linkPoints3 = computeLinksPoints(ctrl, computeAxeAngle(begin, end), width);

  var svgPath = ['M ' + linkPoints1[0].x + ',' + linkPoints1[0].y, 'Q ' + linkPoints3[0].x + ',' + linkPoints3[0].y + ' ' + linkPoints2[0].x + ',' + linkPoints2[0].y, 'L ' + linkPoints2[1].x + ',' + linkPoints2[1].y, 'Q ' + linkPoints3[1].x + ',' + linkPoints3[1].y + ' ' + linkPoints1[1].x + ',' + linkPoints1[1].y].join(' ');
  return svgPath;
}

/**
 * Draw a stroke on a svg tag, using quadratics
 * @param {Object} context Current rendering context
 * @param {Stroke} stroke Current stroke to be drawn
 */
function drawStroke$3(context, stroke) {
  var length = stroke.x.length;
  var width = stroke.width;
  var firstPoint = getPointByIndex(stroke, 0);
  var nbquadratics = length - 2;

  var parts = [];
  if (length < 3) {
    parts.push(renderArc$1(context, firstPoint, width * 0.6));
  } else {
    parts.push(renderArc$1(context, firstPoint, width * firstPoint.p));
    parts.push(renderLine$1(context, firstPoint, computeMiddlePoint(firstPoint, getPointByIndex(stroke, 1)), width));

    for (var i = 0; i < nbquadratics; i++) {
      parts.push(renderQuadratic$1(context, computeMiddlePoint(getPointByIndex(stroke, i), getPointByIndex(stroke, i + 1)), computeMiddlePoint(getPointByIndex(stroke, i + 1), getPointByIndex(stroke, i + 2)), getPointByIndex(stroke, i + 1), width));
    }
    parts.push(renderLine$1(context, computeMiddlePoint(getPointByIndex(stroke, length - 2), getPointByIndex(stroke, length - 1)), getPointByIndex(stroke, length - 1), width));
    parts.push(renderFinal$1(context, getPointByIndex(stroke, length - 2), getPointByIndex(stroke, length - 1), width));
  }
  var svgPath = parts.join(' ');

  context.attr('color', stroke.color).style('fill', stroke.color).style('stroke', 'transparent').classed('pending-stroke', true).attr('d', svgPath + 'Z');
}

var QuadraticSVGStroker = /*#__PURE__*/Object.freeze({
  getInfo: getInfo$3,
  drawStroke: drawStroke$3
});

var core = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory();
	}
}(commonjsGlobal, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {}
	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }());

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));
});

var encHex = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));
});

var x64Core = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());


	return CryptoJS;

}));
});

var sha512 = createCommonjsModule(function (module, exports) {
(function (root, factory, undef) {
	{
		// CommonJS
		module.exports = exports = factory(core, x64Core);
	}
}(commonjsGlobal, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;

	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }

	    // Constants
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];

	    // Reusable objects
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());

	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var H = this._hash.words;

	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];

	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;

	            // Working variables
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;

	            // Rounds
	            for (var i = 0; i < 80; i++) {
	                // Shortcut
	                var Wi = W[i];

	                // Extend message
	                if (i < 16) {
	                    var Wih = Wi.high = M[offset + i * 2]     | 0;
	                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    // Gamma0
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	                    // Gamma1
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;

	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;

	                    var Wil = gamma0l + Wi7l;
	                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    var Wil = Wil + gamma1l;
	                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    var Wil = Wil + Wi16l;
	                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }

	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	                // t1 = h + sigma1 + ch + K[i] + W[i]
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;

	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	                // t2 = sigma0 + maj
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	                // Update working variables
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }

	            // Intermediate hash value
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Convert hash to 32-bit word array before returning
	            var hash = this._hash.toX32();

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        },

	        blockSize: 1024/32
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());


	return CryptoJS.SHA512;

}));
});

var hmac = createCommonjsModule(function (module, exports) {
(function (root, factory) {
	{
		// CommonJS
		module.exports = exports = factory(core);
	}
}(commonjsGlobal, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));
});

var hmacSha512 = createCommonjsModule(function (module, exports) {
(function (root, factory, undef) {
	{
		// CommonJS
		module.exports = exports = factory(core, x64Core, sha512, hmac);
	}
}(commonjsGlobal, function (CryptoJS) {

	return CryptoJS.HmacSHA512;

}));
});

/**
 * Compute HMAC signature for server authentication
 *
 * @param {Object} input Input data to compute HMAC
 * @param {String} applicationKey Current applicationKey
 * @param {String} hmacKey Current hmacKey
 * @return {String} Signature
 */
function computeHmac(input, applicationKey, hmacKey) {
  var jsonInput = (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' ? JSON.stringify(input) : input;
  recognizerLogger.debug('The HmacSHA512 function is loaded', hmacSha512);
  return new hmacSha512(jsonInput, applicationKey + hmacKey).toString(encHex);
}

/* eslint-disable no-unused-expressions */

/**
 * Parse JSON String to Object
 * @param {Object} req JSON string result to be parsed
 * @return {Object} Parsed response
 */
function parse(req) {
  var result = void 0;
  try {
    result = JSON.parse(req.responseText);
  } catch (e) {
    result = req.responseText;
  }
  return result;
}

/**
 * Transform object data request to a list of parameters
 * @param {Object} obj Query properties
 * @return {String} URI encoded string
 */
function transformRequest(obj) {
  var str = [];
  Object.keys(obj).forEach(function (p) {
    if (typeof obj[p] !== 'undefined' && typeof obj[p] !== 'function') {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  });
  return str.join('&');
}

/**
 * Send request to the network and return a promise
 * @param {String} type Request type (GET/POST)
 * @param {String} url URL
 * @param {Object} data Data to be sent
 * @param {RecognizerContext} [recognizerContext] Recognizer context
 * @param {String} apiVersion api version
 * @param {String} mimeType MimeType to be used
 * @return {Promise}
 */
function xhr(type, url, data) {
  var recognizerContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var apiVersion = arguments[4];
  var mimeType = arguments[5];

  var pptxMimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  var configuration = recognizerContext.editor.configuration;
  var recognizerContextRef = recognizerContext;
  return new Promise(function (resolve, reject) {
    // We are writing some browser module here so the no import found should be ignored
    // eslint-disable-next-line no-undef
    var request = new XMLHttpRequest();
    request.open(type, url, true);
    request.withCredentials = true;
    if (apiVersion === 'V3') {
      request.setRequestHeader('Accept', 'application/json');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    } else if (apiVersion === 'V4') {
      switch (configuration.recognitionParams.type) {
        case 'TEXT':
          request.setRequestHeader('Accept', 'application/json,' + mimeType);
          break;
        case 'MATH':
          request.setRequestHeader('Accept', 'application/json,' + mimeType);
          break;
        case 'DIAGRAM':
          request.setRequestHeader('Accept', 'application/json,' + mimeType);
          break;
        case 'Raw Content':
          request.setRequestHeader('Accept', 'application/json,' + mimeType);
          break;
        default:
          break;
      }
      request.setRequestHeader('applicationKey', configuration.recognitionParams.server.applicationKey);
      request.setRequestHeader('hmac', computeHmac(JSON.stringify(data), configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey));
      request.setRequestHeader('Content-Type', 'application/json');
    }

    var isBlobType = mimeType && (mimeType === pptxMimeType || mimeType.startsWith('image/png') || mimeType.startsWith('image/jpeg'));
    if (isBlobType) {
      request.responseType = 'blob';
    }

    request.onerror = function () {
      reject({ msg: 'Could not connect to ' + url + ' connection error', recoverable: false });
    };

    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        isBlobType ? resolve(request.response) : resolve(parse(request));
      } else {
        reject(new Error(request.responseText));
      }
    };

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          isBlobType ? resolve(request.response) : resolve(parse(request));
        }
      }
    };

    if (recognizerContextRef) {
      recognizerContextRef.idle = false;
    }
    if (apiVersion === 'V4') {
      request.send(JSON.stringify(data));
    } else {
      request.send(data ? transformRequest(data) : undefined);
    }
  }).then(function (res) {
    if (recognizerContextRef) {
      recognizerContextRef.idle = true;
    }
    return res;
  });
}

/**
 * Post request
 * @param {RecognizerContext} recognizerContext Recognizer context
 * @param {String} url URL
 * @param {Object} data Data to be sent
 * @param {String} apiVersion api version
 * @param {String} mimeType MimeType to be used
 * @return {Promise}
 */
function post(recognizerContext, url, data, apiVersion, mimeType) {
  return xhr('POST', url, data, recognizerContext, apiVersion, mimeType);
}

/**
 * Recognition context
 * @typedef {Object} RecognitionContext
 * @property {Model} model
 * @property {Callback} callback
 */

/**
 * Recognizer context
 * @typedef {Object} RecognizerContext
 * @property {Editor} editor Get a reference to the current editor
 * @property {Array<RecognitionContext>} recognitionContexts=[]
 * @property {Promise} initPromise=undefined
 * @property {RecognitionPositions} lastPositions  Last recognition sent/received stroke indexes.
 * @property {String} url=undefined
 * @property {WebSocket} websocket=undefined
 * @property {function} websocketCallback=undefined
 * @property {function} reconnect=undefined
 * @property {Number} currentReconnectionCount=0
 * @property {String} sessionId=undefined
 * @property {Number} contentPartCount=0
 * @property {String} currentPartId=undefined
 * @property {String} instanceId=undefined
 * @property {Boolean} canUndo=false
 * @property {Boolean} canRedo=false
 * @property {Boolean} isEmpty=false
 * @property {Array} supportedImportMimeTypes=[]
 * @property {Number} undoStackIndex=0
 * @property {Number} possibleUndoCount=0
 * @property {Boolean} idle=true
 * @property {Boolean} initialized=false
 */
/**
 * Create a new recognizer context
 * @param {Editor} editor
 * @return {RecognizerContext} An object that contains all recognizer context
 */
function createEmptyRecognizerContext(editor) {
  var id = Date.now();
  recognizerLogger.info('Create empty recognizer context with ID: ' + id);
  return {
    id: id,
    editor: editor,
    // websocket
    recognitionContexts: [],
    initPromise: undefined,
    lastPositions: {
      lastSentPosition: -1,
      lastReceivedPosition: -1
    },
    url: undefined,
    websocket: undefined,
    websocketCallback: undefined,
    reconnect: undefined,
    currentReconnectionCount: 0,
    sessionId: undefined,
    contentPartCount: 0,
    currentPartId: undefined,
    instanceId: undefined,
    canUndo: false,
    canRedo: false,
    isEmpty: undefined,
    supportedImportMimeTypes: [],
    undoStackIndex: 0,
    possibleUndoCount: 0,
    idle: true,
    initialized: false
  };
}

/**
 * Return true if a reset is required, false otherwise
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Boolean}
 */
function isResetRequired(recognizerContext, model) {
  if (recognizerContext.lastPositions) {
    return recognizerContext.lastPositions.lastSentPosition >= model.rawStrokes.length - 1;
  }
  return false;
}

/**
 * Update the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {RecognitionPositions} positions Current recognition positions
 * @return {RecognizerContext}
 */
function updateRecognitionPositions(recognizerContext, positions) {
  var recognizerContextRef = recognizerContext;
  if (positions) {
    recognizerContextRef.lastPositions.lastSentPosition = positions.lastSentPosition;
    recognizerContextRef.lastPositions.lastReceivedPosition = positions.lastReceivedPosition;
  }
  if (recognizerContextRef.lastPositions.lastSentPosition === recognizerContextRef.lastPositions.lastReceivedPosition === -1) {
    delete recognizerContextRef.instanceId;
  }
  return recognizerContextRef;
}

/**
 * Set the recognition context
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {RecognitionContext} recognitionContext
 * @return {RecognizerContext}
 */
function setRecognitionContext(recognizerContext, recognitionContext) {
  var recognizerContextRef = recognizerContext;
  recognizerContextRef.recognitionContexts[0] = recognitionContext;
  return recognizerContextRef;
}

/**
 * Test if it is possible to reconnect
 * @param {RecognizerContext} recognizerContext
 * @return {Boolean} True if possible, false otherwise
 */
function canReconnect(recognizerContext) {
  return recognizerContext.websocket.autoReconnect === true && recognizerContext.currentReconnectionCount <= recognizerContext.websocket.maxRetryCount;
}

/**
 * Test if it should attempt immediate reconnect
 * @param {RecognizerContext} recognizerContext
 * @return {Boolean} True if should attempt reconnect, false otherwise
 */
function shouldAttemptImmediateReconnect(recognizerContext) {
  var recognizerContextRef = recognizerContext;
  return recognizerContextRef.websocket.autoReconnect === true && recognizerContextRef.currentReconnectionCount++ <= recognizerContextRef.websocket.maxRetryCount;
}

/**
 * Lost connection message
 * @type {{type: string}}
 */
var LOST_CONNEXION_MESSAGE = { type: 'LOST_CONNECTION' };

/**
 * Explicit close message
 * @type {String}
 */
var CLOSE_RECOGNIZER_MESSAGE = 'CLOSE_RECOGNIZER';

var RecognizerContext = /*#__PURE__*/Object.freeze({
  createEmptyRecognizerContext: createEmptyRecognizerContext,
  isResetRequired: isResetRequired,
  updateRecognitionPositions: updateRecognitionPositions,
  setRecognitionContext: setRecognitionContext,
  canReconnect: canReconnect,
  shouldAttemptImmediateReconnect: shouldAttemptImmediateReconnect,
  LOST_CONNEXION_MESSAGE: LOST_CONNEXION_MESSAGE,
  CLOSE_RECOGNIZER_MESSAGE: CLOSE_RECOGNIZER_MESSAGE
});

/**
 * @param {String} suffixUrl
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {function(recognizerContext: RecognizerContext, model: Model): Object} buildMessage
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
function postMessage(suffixUrl, recognizerContext, model, buildMessage) {
  var configuration = recognizerContext.editor.configuration;
  return post(recognizerContext, configuration.recognitionParams.server.scheme + '://' + configuration.recognitionParams.server.host + suffixUrl, buildMessage(recognizerContext, model), 'V3').then(function (response) {
    recognizerLogger.debug('Cdkv3RestRecognizer success', response);
    var positions = recognizerContext.lastPositions;
    positions.lastReceivedPosition = positions.lastSentPosition;
    var recognizerContextReference = updateRecognitionPositions(recognizerContext, positions);
    if (response.instanceId) {
      recognizerContextReference.instanceId = response.instanceId;
    }
    return response;
  });
}

/**
 * Extract the exports
 * @param {Model} model Current model
 * @return {Object} exports
 */
function extractExports(model) {
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  if (model.rawResults && model.rawResults.exports && model.rawResults.exports.result && model.rawResults.exports.result.textSegmentResult && model.rawResults.exports.result.textSegmentResult.candidates) {
    return {
      CANDIDATES: model.rawResults.exports.result,
      TEXT: model.rawResults.exports.result.textSegmentResult.candidates[model.rawResults.exports.result.textSegmentResult.selectedCandidateIdx].label
    };
  }
  return {};
}

/**
 * Triggers
 * @typedef {Object} Triggers
 * @property {Array<String>} exportContent Supported triggers for exporting content.
 * @property {Array<String>} [addStrokes] Supported triggers for adding strokes.
 */

/**
 * Recognizer info
 * @typedef {Object} RecognizerInfo
 * @property {Array<String>} types Supported recognition types (TEXT, MATH, SHAPE, MUSIC, ANALYZER).
 * @property {String} protocol Supported protocol (REST, WEBSOCKET).
 * @property {String} apiVersion Supported API version.
 * @property {Triggers} availableTriggers Supported triggers for this recognizer.
 */

/**
 * Recognizer callback
 * @typedef {function} RecognizerCallback
 * @param {Object} [err] Error
 * @param {Model} [model] Result
 * @param {...String} [types] Result types
 */

/**
 * Simple callback
 * @typedef {function} Callback
 * @param {Object} [err] Error
 * @param {Object} [res] Result
 */

/**
 * Recognition service entry point
 * @typedef {Object} Recognizer
 * @property {function(): RecognizerInfo} getInfo Get information about the supported configuration (protocol, type, apiVersion, ...).
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} init Initialize recognition.
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} clear Clear server context. Currently nothing to do there.
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} close Close and free all resources that will no longer be used by the recognizer.
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} [undo] Undo Undo the last done action.
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} [redo] Redo Redo the previously undone action.
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback, element: Element)} [resize] Resize.
 * @property {function(recognizerContext: RecognizerContext, model: Model, strokes: Array<Stroke>, callback: RecognizerCallback)} [pointerEvents] Pointer Events.
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} [addStrokes] Add strokes.
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} [export_] Export content.
 * @property {function(recognizerContext: RecognizerContext, model: Model, data: Blob, callback: RecognizerCallback)} [import_] Import content.
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback, conversionState: String)} [convert] Convert.
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} [waitForIdle] Wait for idle.
 * @property {function(recognizerContext: RecognizerContext, model: Model, penStyle: PenStyle, callback: RecognizerCallback)} [setPenStyle] Set pen style.
 * @property {function(recognizerContext: RecognizerContext, model: Model, penStyleClasses: String, callback: RecognizerCallback)} [setPenStyleClasses] Set pen style classes.
 * @property {function(recognizerContext: RecognizerContext, model: Model, theme: Theme, callback: RecognizerCallback)} [setTheme] Set theme.
 */

/**
 * Initialize recognition
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function init(recognizerContext, model, callback) {
  var modelRef = resetModelPositions(model);
  recognizerLogger.debug('Updated model', modelRef);
  var recognizerContextRef = updateRecognitionPositions(recognizerContext, modelRef.lastPositions);
  recognizerContextRef.initPromise = Promise.resolve(modelRef);
  recognizerContextRef.initPromise.then(function (res) {
    recognizerContextRef.initialized = true;
    recognizerLogger.debug('Updated recognizer context', recognizerContextRef);
    callback(undefined, res, Constants.EventType.LOADED);
  });
}

/**
 * Reset server context. Currently nothing to do there.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function reset(recognizerContext, model, callback) {
  var modelRef = resetModelPositions(model);
  recognizerLogger.debug('Updated model', modelRef);
  var recognizerContextRef = updateRecognitionPositions(recognizerContext, modelRef.lastPositions);
  delete recognizerContextRef.instanceId;
  recognizerLogger.debug('Updated recognizer context', recognizerContextRef);
  callback(undefined, modelRef);
}

/**
 * Clear server context. Currently nothing to do there.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function clear(recognizerContext, model, callback) {
  var modelRef = clearModel(model);
  recognizerLogger.debug('Updated model', modelRef);
  var recognizerContextRef = updateRecognitionPositions(recognizerContext, modelRef.lastPositions);
  delete recognizerContextRef.instanceId;
  recognizerLogger.debug('Updated recognizer context', recognizerContextRef);
  callback(undefined, modelRef, Constants.EventType.CHANGED, Constants.EventType.EXPORTED, Constants.EventType.RENDERED);
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function close(recognizerContext, model, callback) {
  var recognizerContextRef = recognizerContext;
  recognizerContextRef.initialized = false;
  delete recognizerContextRef.instanceId;
  callback(undefined, model);
}

/* eslint-disable no-underscore-dangle */

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
var textRestV3Configuration = {
  types: [Constants.RecognitionType.TEXT],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [Constants.Trigger.QUIET_PERIOD, Constants.Trigger.DEMAND]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
function getInfo$4() {
  return textRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Object}
 */
function buildInput(recognizerContext, model) {
  var configuration = recognizerContext.editor.configuration;
  var input = {
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      // As Rest TEXT recognition is non incremental wa add the already recognized strokes
      components: model.rawStrokes.map(function (stroke) {
        return toJSON$2(stroke);
      })
    }]
  };
  Object.assign(input, { textParameter: configuration.recognitionParams.v3.textParameter }); // Building the input with the suitable parameters

  recognizerLogger.debug('input.inputUnits[0].components size is ' + input.inputUnits[0].components.length);

  var data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    textInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = computeHmac(data.textInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  updateModelSentPosition(model);
  return data;
}

function resultCallback(model, res, callback) {
  recognizerLogger.debug('Cdkv3RestTextRecognizer result callback', model);
  var modelReference = updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.exports = extractExports(model);
  recognizerLogger.debug('Cdkv3RestTextRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function export_(recognizerContext, model, callback) {
  postMessage('/api/v3.0/recognition/rest/text/doSimpleRecognition.json', recognizerContext, model, buildInput).then(function (res) {
    return resultCallback(model, res, callback);
  }).catch(function (err) {
    return callback(err, model);
  });
}

var Cdkv3RestTextRecognizer = /*#__PURE__*/Object.freeze({
  textRestV3Configuration: textRestV3Configuration,
  getInfo: getInfo$4,
  buildInput: buildInput,
  export_: export_,
  init: init,
  close: close,
  clear: clear,
  reset: reset
});

/**
 * Extract the exports
 * @param {Model} model Current model
 * @return {Object} Recognition result
 */
function extractExports$1(model) {
  if (model.rawResults && model.rawResults.exports && model.rawResults.exports.result && model.rawResults.exports.result.results && model.rawResults.exports.result.results.length > 0) {
    return model.rawResults.exports.result.results.map(function (item) {
      var res = {};
      if (Object.keys(item).includes('root')) {
        res['' + item.type] = item.root;
      } else {
        res['' + item.type] = item.value;
      }
      return res;
    }).reduce(function (a, b) {
      return Object.assign(a, b);
    }, {});
  }
  return {};
}

/**
 * Extract the recognized symbols
 * @param {Model} model Current model
 * @return {Array<Object>} Recognized symbols
 */
function extractRecognizedSymbols(model) {
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  var strokeList = [].concat(toConsumableArray(model.rawStrokes));

  if (model.rawResults && model.rawResults.exports && model.rawResults.exports.result && model.rawResults.exports.result.scratchOutResults && model.rawResults.exports.result.scratchOutResults.length > 0) {
    var inkRanges = model.rawResults.exports.result.scratchOutResults.map(function (scratchOutResult) {
      return scratchOutResult.erasedInkRanges.concat(scratchOutResult.inkRanges);
    }).reduce(function (a, b) {
      return a.concat(b);
    });
    return strokeList.filter(function (stroke, index) {
      return !inkRanges.find(function (inkRange) {
        return inkRange.component === index;
      });
    });
  }
  return strokeList;
}

/* eslint-disable no-underscore-dangle */

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
var mathRestV3Configuration = {
  types: [Constants.RecognitionType.MATH],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [Constants.Trigger.QUIET_PERIOD, Constants.Trigger.DEMAND]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
function getInfo$5() {
  return mathRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Object}
 */
function buildInput$1(recognizerContext, model) {
  var configuration = recognizerContext.editor.configuration;
  var input = {
    // As Rest MATH recognition is non incremental we add the already recognized strokes
    components: model.rawStrokes.map(function (stroke) {
      return toJSON$2(stroke);
    })
  };
  Object.assign(input, configuration.recognitionParams.v3.mathParameter); // Building the input with the suitable parameters

  recognizerLogger.debug('input.components size is ' + input.components.length);

  var data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    mathInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = computeHmac(data.mathInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  updateModelSentPosition(model);
  return data;
}

function resultCallback$1(model, res, callback) {
  recognizerLogger.debug('Cdkv3RestMathRecognizer result callback', model);
  var modelReference = updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.recognizedSymbols = extractRecognizedSymbols(model);
  modelReference.exports = extractExports$1(model);
  recognizerLogger.debug('Cdkv3RestMathRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function export_$1(recognizerContext, model, callback) {
  return postMessage('/api/v3.0/recognition/rest/math/doSimpleRecognition.json', recognizerContext, model, buildInput$1).then(function (res) {
    return resultCallback$1(model, res, callback);
  }).catch(function (err) {
    return callback(err, model);
  });
}

var Cdkv3RestMathRecognizer = /*#__PURE__*/Object.freeze({
  mathRestV3Configuration: mathRestV3Configuration,
  getInfo: getInfo$5,
  export_: export_$1,
  init: init,
  close: close,
  clear: clear,
  reset: reset
});

/**
 * Get style for the strokes matching the ink ranges
 * @param {Model} model
 * @param {Array<Object>} inkRanges
 * @return {{color: String, width: Number}} Style to apply
 */
function getStyleFromInkRanges(model, inkRanges) {
  var strokes = model.rawStrokes;
  if (inkRanges && inkRanges.length > 0) {
    strokes = inkRanges.map(function (inkRange) {
      return extractStrokesFromInkRange(model, inkRange.stroke ? inkRange.stroke : inkRange.firstStroke, inkRange.stroke ? inkRange.stroke : inkRange.lastStroke, inkRange.firstPoint, inkRange.lastPoint);
    }).reduce(function (a, b) {
      return a.concat(b);
    });
  }
  // FIXME hack to apply the rendering param of the first element' stroke
  return {
    color: strokes[0].color,
    width: strokes[0].width
  };
}

/**
 * Extract recognized symbols from recognition output
 * @param {Model} model Current model
 * @param {Object} segment Shape recognition output
 * @return {Array<Object>} Recognized symbols
 */
function extractShapeSymbols(model, segment) {
  if (segment.candidates && segment.candidates.length > 0) {
    var selectedCandidate = segment.candidates[segment.selectedCandidateIndex];
    switch (selectedCandidate.type) {
      case 'notRecognized':
        if (segment.inkRanges && segment.inkRanges.length > 0) {
          return segment.inkRanges.map(function (inkRange) {
            return extractStrokesFromInkRange(model, inkRange.firstStroke, inkRange.lastStroke, inkRange.firstPoint, inkRange.lastPoint);
          }).reduce(function (a, b) {
            return a.concat(b);
          });
        }
        return [];
      case 'recognizedShape':
        return selectedCandidate.primitives;
      default:
        return [];
    }
  }
  return [];
}

/**
 * Extract the recognized symbols
 * @param {Model} model Current model
 * @return {Array<Object>} Recognized symbols
 */
function extractRecognizedSymbols$1(model) {
  if (model.rawResults && model.rawResults.exports && model.rawResults.exports.result && model.rawResults.exports.result.segments) {
    return model.rawResults.exports.result.segments.map(function (segment) {
      var style = getStyleFromInkRanges(model, segment.inkRanges);
      return extractShapeSymbols(model, segment).map(function (primitive) {
        return Object.assign(primitive, style);
      });
    }).reduce(function (a, b) {
      return a.concat(b);
    });
  }
  return [];
}

/**
 * Extract the exports
 * @param {Model} model Current model
 * @return {Object} exports
 */
function extractExports$2(model) {
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  if (model.rawResults && model.rawResults.exports && model.rawResults.exports.result && model.rawResults.exports.result.segments) {
    return {
      SEGMENTS: model.rawResults.exports.result.segments
    };
  }
  return {};
}

/* eslint-disable no-underscore-dangle */

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
var analyzerRestV3Configuration = {
  types: [Constants.RecognitionType.ANALYZER],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [Constants.Trigger.QUIET_PERIOD, Constants.Trigger.DEMAND]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
function getInfo$6() {
  return analyzerRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Object}
 */
function buildInput$2(recognizerContext, model) {
  var configuration = recognizerContext.editor.configuration;
  var input = {
    // Incremental
    components: model.rawStrokes.map(function (stroke) {
      return toJSON$2(stroke);
    })
  };
  Object.assign(input, { parameter: configuration.recognitionParams.v3.analyzerParameter }); // Building the input with the suitable parameters

  recognizerLogger.debug('input.components size is ' + input.components.length);

  var data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    analyzerInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = computeHmac(data.analyzerInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  updateModelSentPosition(model);
  return data;
}

function extractSymbols(model, element) {
  var style = getStyleFromInkRanges(model, element.inkRanges);
  switch (element.elementType) {
    case 'table':
      return element.lines.map(function (line) {
        return Object.assign(line, style);
      });
    case 'textLine':
      return [element].map(function (textLine) {
        return Object.assign(textLine, textLine.result.textSegmentResult.candidates[textLine.result.textSegmentResult.selectedCandidateIdx], style);
      });
    case 'shape':
      return extractShapeSymbols(model, element).map(function (primitive) {
        return Object.assign(primitive, style);
      });
    default:
      return [];
  }
}

function extractRecognizedSymbolsFromAnalyzerResult(model) {
  if (model.rawResults && model.rawResults.exports && model.rawResults.exports.result) {
    return [].concat(toConsumableArray(model.rawResults.exports.result.shapes), toConsumableArray(model.rawResults.exports.result.tables), toConsumableArray(model.rawResults.exports.result.textLines)).map(function (element) {
      return extractSymbols(model, element);
    }).reduce(function (a, b) {
      return a.concat(b);
    });
  }
  return [];
}

/**
 * Extract the exports
 * @param {Model} model Current model
 * @return {Object} exports
 */
function extractExports$3(model) {
  if (model.rawResults && model.rawResults.exports && model.rawResults.exports.result) {
    return {
      ANALYSIS: model.rawResults.exports.result
    };
  }
  return {};
}

function resultCallback$2(model, res, callback) {
  recognizerLogger.debug('Cdkv3RestAnalyzerRecognizer result callback', model);
  var modelReference = updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.recognizedSymbols = extractRecognizedSymbolsFromAnalyzerResult(model);
  modelReference.exports = extractExports$3(model);
  recognizerLogger.debug('Cdkv3RestAnalyzerRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.CONVERTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function export_$2(recognizerContext, model, callback) {
  return postMessage('/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', recognizerContext, model, buildInput$2).then(function (res) {
    return resultCallback$2(model, res, callback);
  }).catch(function (err) {
    return callback(err, model);
  });
}

var Cdkv3RestAnalyzerRecognizer = /*#__PURE__*/Object.freeze({
  analyzerRestV3Configuration: analyzerRestV3Configuration,
  getInfo: getInfo$6,
  export_: export_$2,
  init: init,
  close: close,
  clear: clear,
  reset: reset
});

/* eslint-disable no-underscore-dangle */

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
var shapeRestV3Configuration = {
  types: [Constants.RecognitionType.SHAPE],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [Constants.Trigger.QUIET_PERIOD, Constants.Trigger.DEMAND]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
function getInfo$7() {
  return shapeRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Object}
 */
function buildInput$3(recognizerContext, model) {
  var configuration = recognizerContext.editor.configuration;
  var input = {
    components: extractPendingStrokes(model).map(function (stroke) {
      return toJSON$2(stroke);
    })
  };
  Object.assign(input, configuration.recognitionParams.v3.shapeParameter); // Building the input with the suitable parameters

  recognizerLogger.debug('input.components size is ' + input.components.length);

  var data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    shapeInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = computeHmac(data.shapeInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  updateModelSentPosition(model);
  return data;
}

function buildReset(recognizerContext, model) {
  return {
    instanceSessionId: recognizerContext ? recognizerContext.instanceId : undefined
  };
}

function resultCallback$3(model, res, callback) {
  recognizerLogger.debug('Cdkv3RestShapeRecognizer result callback', model);
  var modelReference = updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.recognizedSymbols = extractRecognizedSymbols$1(model);
  modelReference.exports = extractExports$2(model);
  recognizerLogger.debug('Cdkv3RestShapeRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.CONVERTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function export_$3(recognizerContext, model, callback) {
  postMessage('/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', recognizerContext, model, buildInput$3).then(function (res) {
    return resultCallback$3(model, res, callback);
  }).catch(function (err) {
    return callback(err, model);
  });
}

/**
 * Reset server context.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function reset$1(recognizerContext, model, callback) {
  var modelRef = resetModelPositions(model);
  postMessage('/api/v3.0/recognition/rest/shape/clearSessionId.json', recognizerContext, modelRef, buildReset).then(function (res) {
    return callback(undefined, modelRef, Constants.EventType.IDLE);
  }).catch(function (err) {
    return callback(err, modelRef);
  });
}

/**
 * Do what is needed to clean the server context.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function clear$1(recognizerContext, model, callback) {
  var modelRef = clearModel(cloneModel(model));
  postMessage('/api/v3.0/recognition/rest/shape/clearSessionId.json', recognizerContext, modelRef, buildReset).then(function (res) {
    return callback(undefined, modelRef, Constants.EventType.CHANGED, Constants.EventType.EXPORTED, Constants.EventType.CONVERTED, Constants.EventType.IDLE);
  }).catch(function (err) {
    return callback(err, modelRef);
  });
}

var Cdkv3RestShapeRecognizer = /*#__PURE__*/Object.freeze({
  shapeRestV3Configuration: shapeRestV3Configuration,
  getInfo: getInfo$7,
  export_: export_$3,
  reset: reset$1,
  clear: clear$1,
  init: init,
  close: close
});

/* eslint-disable no-underscore-dangle */

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
var musicRestV3Configuration = {
  types: [Constants.RecognitionType.MUSIC],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [Constants.Trigger.QUIET_PERIOD, Constants.Trigger.DEMAND]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
function getInfo$8() {
  return musicRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Object}
 */
function buildInput$4(recognizerContext, model) {
  var configuration = recognizerContext.editor.configuration;
  var input = {
    // As Rest MUSIC recognition is non incremental wa add the already recognized strokes
    components: [].concat(model.defaultSymbols, model.rawStrokes).filter(function (symbol) {
      return symbol.type !== 'staff';
    }).map(function (symbol) {
      if (symbol.type === 'stroke') {
        return toJSON$2(symbol);
      }
      return symbol;
    })
  };
  var musicParameter = Object.assign({}, configuration.recognitionParams.v3.musicParameter);
  delete musicParameter.clef; // FIXME find a way to avoid this ugly hack
  Object.assign(input, musicParameter); // Building the input with the suitable parameters

  recognizerLogger.debug('input.components size is ' + input.components.length);

  var data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    musicInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = computeHmac(data.musicInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  updateModelSentPosition(model);
  return data;
}

function resultCallback$4(model, res, callback) {
  recognizerLogger.debug('Cdkv3RestMusicRecognizer result callback', model);
  var modelReference = updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.exports = extractExports$1(model);
  recognizerLogger.debug('Cdkv3RestMusicRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
}

/**
 * Initialize recognition
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function init$1(recognizerContext, model, callback) {
  var modelRef = resetModelPositions(model);
  recognizerLogger.debug('Updated model', modelRef);
  var recognizerContextRef = updateRecognitionPositions(recognizerContext, modelRef.lastPositions);
  recognizerContextRef.initPromise = Promise.resolve(modelRef);
  recognizerContextRef.initPromise.then(function (res) {
    recognizerContextRef.initialized = true;
    recognizerLogger.debug('Updated recognizer context', recognizerContextRef);
    callback(undefined, res, Constants.EventType.LOADED, Constants.EventType.RENDERED);
  });
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function export_$4(recognizerContext, model, callback) {
  postMessage('/api/v3.0/recognition/rest/music/doSimpleRecognition.json', recognizerContext, model, buildInput$4).then(function (res) {
    return resultCallback$4(model, res, callback);
  }).catch(function (err) {
    return callback(err, model);
  });
}

var Cdkv3RestMusicRecognizer = /*#__PURE__*/Object.freeze({
  musicRestV3Configuration: musicRestV3Configuration,
  getInfo: getInfo$8,
  init: init$1,
  export_: export_$4,
  close: close,
  clear: clear,
  reset: reset
});

/* eslint-disable no-underscore-dangle */

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
var iinkRestConfiguration = {
  types: [Constants.RecognitionType.TEXT, Constants.RecognitionType.DIAGRAM, Constants.RecognitionType.MATH, Constants.RecognitionType.RAWCONTENT],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V4',
  availableTriggers: {
    exportContent: [Constants.Trigger.QUIET_PERIOD, Constants.Trigger.DEMAND]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
function getInfo$9() {
  return iinkRestConfiguration;
}

/**
 * @param {String} suffixUrl
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {function(recognizerContext: RecognizerContext, model: Model, conversionState: String): Object} buildMessage
 * @param {String} conversionState
 * @param {String} mimeType
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
function postMessage$1(suffixUrl, recognizerContext, model, buildMessage) {
  var conversionState = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var mimeType = arguments[5];

  var configuration = recognizerContext.editor.configuration;
  return post(recognizerContext, configuration.recognitionParams.server.scheme + '://' + configuration.recognitionParams.server.host + suffixUrl, buildMessage(recognizerContext, model, conversionState), 'V4', mimeType).then(function (response) {
    recognizerLogger.debug('iinkRestRecognizer success', response);
    var positions = recognizerContext.lastPositions;
    positions.lastReceivedPosition = positions.lastSentPosition;
    var recognizerContextReference = updateRecognitionPositions(recognizerContext, positions);
    if (response.instanceId) {
      recognizerContextReference.instanceId = response.instanceId;
    }
    return response;
  });
}

function buildTextConf(configuration) {
  return {
    text: configuration.recognitionParams.v4.text,
    lang: configuration.recognitionParams.v4.lang,
    export: configuration.recognitionParams.v4.export
  };
}

function buildMathConf(configuration) {
  return {
    math: configuration.recognitionParams.v4.math,
    lang: configuration.recognitionParams.v4.lang,
    export: configuration.recognitionParams.v4.export
  };
}

function buildDiagramConf(configuration) {
  return {
    diagram: configuration.recognitionParams.v4.diagram,
    lang: configuration.recognitionParams.v4.lang,
    export: configuration.recognitionParams.v4.export
  };
}

function buildRawContentConf(configuration) {
  return {
    'raw-content': {
      recognition: configuration.recognitionParams.v4['raw-content'].recognition
    },
    lang: configuration.recognitionParams.v4.lang,
    export: configuration.recognitionParams.v4.export
  };
}

function buildData(recognizerContext, model, conversionState) {
  var configuration = recognizerContext.editor.configuration;
  var dataConf = void 0;

  if (configuration.recognitionParams.type === 'TEXT') {
    dataConf = buildTextConf(configuration);
  } else if (configuration.recognitionParams.type === 'MATH') {
    dataConf = buildMathConf(configuration);
  } else if (configuration.recognitionParams.type === 'DIAGRAM') {
    dataConf = buildDiagramConf(configuration);
  } else if (configuration.recognitionParams.type === 'Raw Content') {
    dataConf = buildRawContentConf(configuration);
  }

  var newStrokes = [];
  model.strokeGroups.forEach(function (group) {
    var newPenStyle = JSON.stringify(group.penStyle) === '{}' ? null : toCSS(group.penStyle);
    var newGroup = {
      penStyle: newPenStyle,
      strokes: group.strokes.map(function (stroke) {
        return toJSONV4(stroke);
      })
    };
    newStrokes.push(newGroup);
  });

  var contentType = configuration.recognitionParams.type === 'Raw Content' ? 'Raw Content' : configuration.recognitionParams.type.charAt(0).toUpperCase() + configuration.recognitionParams.type.slice(1).toLowerCase();

  var data = {
    configuration: dataConf,
    xDPI: 96,
    yDPI: 96,
    contentType: contentType,
    theme: toCSS$1(recognizerContext.editor.theme),
    strokeGroups: newStrokes
  };

  if (recognizerContext.editor.domElement) {
    data.height = recognizerContext.editor.domElement.clientHeight;
    data.width = recognizerContext.editor.domElement.clientWidth;
  }

  if (conversionState) {
    data.conversionState = 'DIGITAL_EDIT';
  }

  updateModelSentPosition(model);
  return data;
}

function extractExports$4(configuration, mimeType, res) {
  var exports = {};
  exports[mimeType] = res;
  return exports;
}

function resultCallback$5(model, configuration, res, mimeType, callback) {
  recognizerLogger.debug('iinkRestRecognizer result callback', model);
  var modelReference = updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  if (modelReference.exports) {
    Object.assign(modelReference.exports, extractExports$4(configuration, mimeType, res));
  } else {
    modelReference.exports = extractExports$4(configuration, mimeType, res);
  }
  recognizerLogger.debug('iinkRestRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 * @param {Array[String]} requestedMimeTypes
 */
function export_$5(recognizerContext, model, callback, requestedMimeTypes) {
  var configuration = recognizerContext.editor.configuration;

  function callPostMessage(mimeType) {
    postMessage$1('/api/v4.0/iink/batch', recognizerContext, model, buildData, configuration.restConversionState, mimeType).then(function (res) {
      resultCallback$5(model, configuration, res, mimeType, callback);
    }).catch(function (err) {
      callback(err, model);
    });
  }

  if (requestedMimeTypes) {
    requestedMimeTypes.forEach(function (mimeType) {
      callPostMessage(mimeType);
    });
  } else if (configuration.recognitionParams.type === 'TEXT') {
    configuration.recognitionParams.v4.text.mimeTypes.forEach(function (mimeType) {
      callPostMessage(mimeType);
    });
  } else if (configuration.recognitionParams.type === 'DIAGRAM') {
    configuration.recognitionParams.v4.diagram.mimeTypes.forEach(function (mimeType) {
      callPostMessage(mimeType);
    });
  } else if (configuration.recognitionParams.type === 'MATH') {
    configuration.recognitionParams.v4.math.mimeTypes.forEach(function (mimeType) {
      callPostMessage(mimeType);
    });
  } else if (configuration.recognitionParams.type === 'Raw Content') {
    configuration.recognitionParams.v4['raw-content'].mimeTypes.forEach(function (mimeType) {
      callPostMessage(mimeType);
    });
  }
}

/**
 * Ask for conversion using DIGITAL_EDIT
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function convert(recognizerContext, model, callback) {
  var configuration = recognizerContext.editor.configuration;
  postMessage$1('/api/v4.0/iink/batch', recognizerContext, model, buildData, 'DIGITAL_EDIT').then(function (res) {
    return resultCallback$5(model, configuration, res, callback);
  }).catch(function (err) {
    return callback(err, model);
  });
}

var iinkRestRecognizer = /*#__PURE__*/Object.freeze({
  iinkRestConfiguration: iinkRestConfiguration,
  getInfo: getInfo$9,
  postMessage: postMessage$1,
  export_: export_$5,
  convert: convert,
  init: init,
  close: close,
  clear: clear,
  reset: reset
});

function infinitePing(websocket) {
  var websocketRef = websocket;
  websocketRef.pingLostCount++;
  if (websocketRef.pingLostCount > websocketRef.maxPingLost) {
    websocket.close(1000, 'PING_LOST');
  } else if (websocketRef.readyState <= 1) {
    setTimeout(function () {
      if (websocketRef.readyState <= 1) {
        websocketRef.send(JSON.stringify({ type: 'ping' }));
        infinitePing(websocketRef);
      }
    }, websocketRef.pingDelay);
  }
}

/**
 * Attach all socket attributes helping managing server connexion
 * @param {WebSocket} websocket Current WebSocket
 * @param {RecognizerContext} recognizerContext
 */
function addWebsocketAttributes(websocket, recognizerContext) {
  var websocketConfiguration = recognizerContext.editor.configuration.recognitionParams.server.websocket;
  var socket = websocket;
  socket.start = new Date();
  socket.autoReconnect = websocketConfiguration.autoReconnect;
  socket.maxRetryCount = websocketConfiguration.maxRetryCount;
  socket.pingEnabled = websocketConfiguration.pingEnabled;
  socket.pingDelay = websocketConfiguration.pingDelay;
  socket.maxPingLost = websocketConfiguration.maxPingLostCount;
  socket.pingLostCount = 0;
  socket.recognizerContext = recognizerContext;
}

/**
 * @param {RecognizerContext} recognizerContext Recognizer context
 * @return {WebSocket} Opened WebSocket
 */
function openWebSocket(recognizerContext) {
  var socket = void 0;
  try {
    // eslint-disable-next-line no-undef
    socket = new WebSocket(recognizerContext.url);
  } catch (error) {
    recognizerLogger.error('Unable to open websocket, Check the host and your connectivity');
  }
  addWebsocketAttributes(socket, recognizerContext);
  if (socket.pingEnabled) {
    infinitePing(socket);
  }

  socket.onopen = function (e) {
    recognizerLogger.trace('onOpen');
    recognizerContext.websocketCallback(e);
  };

  socket.onclose = function (e) {
    recognizerLogger.trace('onClose', new Date() - socket.start);
    recognizerContext.websocketCallback(e);
  };

  socket.onerror = function (e) {
    recognizerLogger.trace('onError');
    recognizerContext.websocketCallback(e);
  };

  socket.onmessage = function (e) {
    recognizerLogger.trace('onMessage');
    socket.pingLostCount = 0;
    var parsedMessage = JSON.parse(e.data);
    if (parsedMessage.type !== 'pong') {
      var callBackParam = {
        type: e.type,
        data: JSON.parse(e.data)
      };
      recognizerContext.websocketCallback(callBackParam);
    }
  };

  return socket;
}

/**
 * Send data message
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Object} message Data message
 */
function send(recognizerContext, message) {
  var recognizerContextRef = recognizerContext;
  recognizerContextRef.idle = false;

  var websocket = recognizerContextRef.websocket;
  if (websocket.readyState <= 1) {
    websocket.send(JSON.stringify(message));
    recognizerLogger.debug(message.type + ' message sent', message);
  } else {
    throw LOST_CONNEXION_MESSAGE;
  }
}

/**
 * Close the websocket
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Number} code Exit code
 * @param {String} reason Exit reason
 */
function close$1(recognizerContext, code, reason) {
  var websocket = recognizerContext.websocket;
  if (websocket && websocket.readyState < 2) {
    websocket.close(code, reason);
  }
}

/**
 * A CDK v3 websocket dialog have this sequence :
 * ---------- Client ------------------------------------- Server ----------------------------------
 * init (send the applicationKey) ================>
 *                                       <=========== hmacChallenge
 * answerToHmacChallenge (send the hmac) =========>
 *                                       <=========== init
 * start (send the parameters and first strokes ) ===============>
 *                                       <=========== recognition with instance id
 * continue (send the other strokes ) ============>
 *                                       <=========== recognition
 */

function buildHmacMessage(configuration, message) {
  return {
    type: 'hmac',
    applicationKey: configuration.recognitionParams.server.applicationKey,
    challenge: message.data.challenge,
    hmac: computeHmac(message.data.challenge, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey)
  };
}

function buildInitMessage(configuration) {
  return {
    type: 'applicationKey',
    applicationKey: configuration.recognitionParams.server.applicationKey
  };
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param {DestructuredPromise} destructuredPromise
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {function} Callback to handle WebSocket results
 */
function buildWebSocketCallback(destructuredPromise, recognizerContext) {
  return function (message) {
    var recognizerContextRef = recognizerContext;
    // Handle websocket messages
    recognizerLogger.trace(message.type + ' websocket callback', message);
    var recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];
    recognizerLogger.debug('Current recognition context', recognitionContext);

    switch (message.type) {
      case 'open':
        send(recognizerContext, buildInitMessage(recognizerContext.editor.configuration));
        break;
      case 'message':
        recognizerLogger.trace('Receiving message', message.data.type);
        switch (message.data.type) {
          case 'hmacChallenge':
            send(recognizerContext, buildHmacMessage(recognizerContext.editor.configuration, message));
            break;
          case 'init':
            recognizerContextRef.currentReconnectionCount = 0;
            recognizerContextRef.idle = true;
            recognizerContextRef.initialized = true;
            recognitionContext.callback(undefined, message.data);
            destructuredPromise.resolve(recognitionContext);
            break;
          case 'reset':
            recognizerContextRef.idle = true;
            recognitionContext.callback(undefined, message.data);
            break;
          case 'mathResult':
          case 'textResult':
            recognizerContextRef.idle = true;
            if (message.data.instanceId) {
              if (recognizerContext.instanceId && recognizerContext.instanceId !== message.data.instanceId) {
                recognizerLogger.debug('Instance id switch from ' + recognizerContext.instanceId + ' to ' + message.data.instanceId + ' this is suspicious');
              }
              recognizerContextRef.instanceId = message.data.instanceId;
              recognizerLogger.debug('Memorizing instance id', message.data.instanceId);
            }
            recognitionContext.callback(undefined, message.data);
            break;
          case 'error':
            recognizerLogger.debug('Error detected stopping all recognition', message);
            if (recognitionContext) {
              recognitionContext.callback(message.data);
            } else {
              destructuredPromise.reject(Object.assign({}, message.data, { recoverable: false }));
            }
            break;
          default:
            recognizerLogger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
        }
        break;
      case 'error':
        recognizerLogger.debug('Error detected stopping all recognition', message);
        if (recognitionContext) {
          recognitionContext.callback(Object.assign({}, message, { recoverable: false }));
        } else {
          destructuredPromise.reject(Object.assign({}, message, { recoverable: false }));
        }
        break;
      case 'close':
        recognizerLogger.debug('Close detected stopping all recognition', message);
        recognizerContextRef.initialized = false;
        if (recognitionContext) {
          recognitionContext.callback(undefined, message);
        } else {
          destructuredPromise.reject(message);
        }
        break;
      default:
        recognizerLogger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
    }
  };
}

/**
 * @typedef {Object} DestructuredPromise
 * @property {Promise} promise
 * @property {function(value: Object)} resolve
 * @property {function(reason: Object)} reject
 */

/**
 * @return {DestructuredPromise}
 */
function destructurePromise() {
  var resolve = void 0;
  var reject = void 0;
  var initPromise = new Promise(function (resolveParam, rejectParam) {
    resolve = resolveParam;
    reject = rejectParam;
  });
  return { promise: initPromise, resolve: resolve, reject: reject };
}

function buildUrl(configuration, suffixUrl) {
  var scheme = configuration.recognitionParams.server.scheme === 'https' ? 'wss' : 'ws';
  return scheme + '://' + configuration.recognitionParams.server.host + suffixUrl;
}

var commonCallback = function commonCallback(model, err, res, callback) {
  if (res && res.type === 'close') {
    return callback(err, model, Constants.EventType.CHANGED);
  }
  return callback(err, model);
};

/**
 * Build websocket function
 * @typedef {function} BuildWebSocketFunction
 * @param {DestructuredPromise} destructuredPromise
 * @param {RecognizerContext} recognizerContext
 * @return {Callback}
 */

/**
 * Init the websocket recognizer.
 * Open the connexion and proceed to the hmac challenge.
 * @param {String} suffixUrl
 * @param {RecognizerContext} recognizerContext
 * @param {BuildWebSocketFunction} buildWebSocketCallback
 * @param {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} reconnect
 * @return {Promise} Fulfilled when the init phase is over.
 */
function init$2(suffixUrl, recognizerContext, buildWebSocketCallback, reconnect) {
  var recognitionContext = recognizerContext.recognitionContexts[0];
  var recognizerContextReference = updateRecognitionPositions(recognizerContext, recognitionContext.model.lastPositions);
  recognizerContextReference.url = buildUrl(recognizerContext.editor.configuration, suffixUrl);
  recognizerContextReference.reconnect = reconnect;

  var destructuredInitPromise = destructurePromise();
  recognizerContextReference.initPromise = destructuredInitPromise.promise;

  recognizerLogger.debug('Opening the websocket for context ', recognizerContext);
  recognizerContextReference.websocketCallback = buildWebSocketCallback(destructuredInitPromise, recognizerContextReference);
  recognizerContextReference.websocket = openWebSocket(recognizerContextReference);
  return recognizerContextReference.initPromise.then(function (res) {
    recognizerLogger.debug('Init over', res);
    return res;
  });
}

function retry(func, recognizerContext, model, callback) {
  for (var _len = arguments.length, params = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    params[_key - 4] = arguments[_key];
  }

  if (shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
    recognizerLogger.info('Attempting a retry', recognizerContext.currentReconnectionCount);
    recognizerContext.reconnect(recognizerContext, model, function (err, res) {
      if (!err) {
        func.apply(undefined, [recognizerContext, res, callback].concat(params));
      } else {
        recognizerLogger.error('Failed retry', err);
        retry.apply(undefined, [func, recognizerContext, model, callback].concat(params));
      }
    });
  } else {
    callback('Unable to reconnect', model);
  }
}

/**
 * @param {RecognizerContext} recognizerContext
 * @param {function(params: ...Object): Object} buildMessage
 * @param {...Object} params
 * @return {Promise}
 */
function sendMessage(recognizerContext, buildMessage) {
  for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    params[_key2 - 2] = arguments[_key2];
  }

  return recognizerContext.initPromise.then(function () {
    recognizerLogger.trace('Init was done. Sending message');
    var message = buildMessage.apply(undefined, params);
    if (message) {
      send(recognizerContext, message);
      var positions = recognizerContext.recognitionContexts[0].model.lastPositions;
      if (positions) {
        updateRecognitionPositions(recognizerContext, positions);
      }
    } else {
      recognizerLogger.warn('empty message');
    }
  });
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {RecognizerCallback} callback
 */
function close$2(recognizerContext, model, _callback) {
  var recognitionContext = {
    model: model,
    callback: function callback(err, res) {
      return commonCallback(model, err, res, _callback);
    }
  };
  var recognizerContextRef = recognizerContext;

  recognizerContext.initPromise.then(function () {
    recognizerContextRef.recognitionContexts[0] = recognitionContext;
    return recognizerContextRef;
  }).then(function (context) {
    return close$1(context, 1000, CLOSE_RECOGNIZER_MESSAGE);
  });
}

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
var mathWebSocketV3Configuration = {
  types: [Constants.RecognitionType.MATH],
  protocol: Constants.Protocol.WEBSOCKET,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [Constants.Trigger.POINTER_UP]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
function getInfo$a() {
  return mathWebSocketV3Configuration;
}

function buildMathInput(recognizerContext, model) {
  updateModelSentPosition(model);
  if (recognizerContext.lastPositions.lastSentPosition < 0) {
    var configuration = recognizerContext.editor.configuration;
    return {
      type: 'start',
      parameters: configuration.recognitionParams.v3.mathParameter,
      components: model.rawStrokes.map(function (stroke) {
        return toJSON$2(stroke);
      })
    };
  }

  return {
    type: 'continue',
    components: extractPendingStrokes(model, -1).map(function (stroke) {
      return toJSON$2(stroke);
    })
  };
}

function buildResetMessage(model) {
  resetModelPositions(model);
  return {
    type: 'reset'
  };
}

var mathCallback = function mathCallback(model, err, res, callback) {
  if (res) {
    if (res.type === 'init') {
      return callback(err, model, Constants.EventType.LOADED, Constants.EventType.IDLE);
    }
    if (res.type === 'close') {
      return callback(err, model, Constants.EventType.CHANGED);
    }
    var modelReference = updateModelReceivedPosition(model);
    modelReference.rawResults.exports = res;
    modelReference.exports = extractExports$1(modelReference);
    modelReference.recognizedSymbols = extractRecognizedSymbols(modelReference);
    return callback(err, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
  }
  return callback(err, model);
};

/**
 * Initialize recognition
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function init$3(recognizerContext, model, _callback) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: resetModelPositions(model),
    callback: function callback(err, res) {
      return mathCallback(model, err, res, _callback);
    }
  });
  init$2('/api/v3.0/recognition/ws/math', recognizerContextRef, buildWebSocketCallback, init$3).catch(function (err) {
    if (shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
      recognizerLogger.info('Attempting a reconnect', recognizerContext.currentReconnectionCount);
      recognizerContext.reconnect(recognizerContext, model, _callback);
    } else {
      recognizerLogger.error('Unable to init', err);
      _callback(err, model);
    }
  });
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
// eslint-disable-next-line no-underscore-dangle
function export_$6(recognizerContext, model, _callback2) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return mathCallback(model, err, res, _callback2);
    }
  });
  sendMessage(recognizerContextRef, buildMathInput, recognizerContext, model).catch(function (exception) {
    return retry(export_$6, recognizerContext, model, _callback2);
  });
}

/**
 * Reset the recognition context
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function reset$2(recognizerContext, model, _callback3) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return mathCallback(model, err, res, _callback3);
    }
  });
  sendMessage(recognizerContextRef, buildResetMessage, model).catch(function (exception) {
    return retry(reset$2, recognizerContext, model, _callback3);
  });
}

/**
 * Clear server context. Currently nothing to do there.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function clear$3(recognizerContext, model, callback) {
  clear(recognizerContext, model, function (err, res) {
    for (var _len = arguments.length, types = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      types[_key - 2] = arguments[_key];
    }

    reset$2(recognizerContext, res, function (err1, res1) {
      return recognizerLogger.trace('Session reset');
    });
    callback.apply(undefined, [err, res].concat(types));
  });
}

var Cdkv3WSMathRecognizer = /*#__PURE__*/Object.freeze({
  init: init$3,
  export_: export_$6,
  reset: reset$2,
  mathWebSocketV3Configuration: mathWebSocketV3Configuration,
  getInfo: getInfo$a,
  clear: clear$3,
  close: close$2
});

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
var textWebSocketV3Configuration = {
  types: [Constants.RecognitionType.TEXT],
  protocol: Constants.Protocol.WEBSOCKET,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [Constants.Trigger.POINTER_UP]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
function getInfo$b() {
  return textWebSocketV3Configuration;
}

function buildTextInput(recognizerContext, model) {
  updateModelSentPosition(model);
  if (recognizerContext.lastPositions.lastSentPosition < 0) {
    var configuration = recognizerContext.editor.configuration;
    return {
      type: 'start',
      textParameter: configuration.recognitionParams.v3.textParameter,
      inputUnits: [{
        textInputType: 'MULTI_LINE_TEXT',
        components: model.rawStrokes.map(function (stroke) {
          return toJSON$2(stroke);
        })
      }]
    };
  }

  return {
    type: 'continue',
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      components: extractPendingStrokes(model, -1).map(function (stroke) {
        return toJSON$2(stroke);
      })
    }]
  };
}

function buildResetMessage$1(model) {
  resetModelPositions(model);
  return {
    type: 'reset'
  };
}

var textCallback = function textCallback(model, err, res, callback) {
  if (res) {
    if (res.type === 'init') {
      return callback(err, model, Constants.EventType.LOADED, Constants.EventType.IDLE);
    }
    if (res.type === 'close') {
      return callback(err, model, Constants.EventType.CHANGED);
    }
    var modelReference = updateModelReceivedPosition(model);
    modelReference.rawResults.exports = res;
    modelReference.exports = extractExports(model);
    return callback(err, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
  }
  return callback(err, model);
};

/**
 * Initialize recognition
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function init$4(recognizerContext, model, _callback) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: resetModelPositions(model),
    callback: function callback(err, res) {
      return textCallback(model, err, res, _callback);
    }
  });
  init$2('/api/v3.0/recognition/ws/text', recognizerContextRef, buildWebSocketCallback, init$4).catch(function (err) {
    if (shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
      recognizerLogger.info('Attempting a reconnect', recognizerContext.currentReconnectionCount);
      recognizerContext.reconnect(recognizerContext, model, _callback);
    } else {
      recognizerLogger.error('Unable to init', err);
      _callback(err, model);
    }
  });
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
// eslint-disable-next-line no-underscore-dangle
function export_$7(recognizerContext, model, _callback2) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return textCallback(model, err, res, _callback2);
    }
  });
  sendMessage(recognizerContextRef, buildTextInput, recognizerContext, model).catch(function (exception) {
    return retry(export_$7, recognizerContext, model, _callback2);
  });
}

/**
 * Reset the recognition context
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function reset$3(recognizerContext, model, _callback3) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return textCallback(model, err, res, _callback3);
    }
  });
  sendMessage(recognizerContextRef, buildResetMessage$1, model).catch(function (exception) {
    return retry(reset$3, recognizerContext, model, _callback3);
  });
}

/**
 * Clear server context. Currently nothing to do there.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function clear$4(recognizerContext, model, callback) {
  clear(recognizerContext, model, function (err, res) {
    for (var _len = arguments.length, types = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      types[_key - 2] = arguments[_key];
    }

    reset$3(recognizerContext, res, function (err1, res1) {
      return recognizerLogger.trace('Session reset');
    });
    callback.apply(undefined, [err, res].concat(types));
  });
}

var Cdkv3WSTextRecognizer = /*#__PURE__*/Object.freeze({
  init: init$4,
  export_: export_$7,
  reset: reset$3,
  textWebSocketV3Configuration: textWebSocketV3Configuration,
  getInfo: getInfo$b,
  clear: clear$4,
  close: close$2
});

/*
 * UUID-js: A js library to generate and parse UUIDs, TimeUUIDs and generate
 * TimeUUID based on dates for range selections.
 * @see http://www.ietf.org/rfc/rfc4122.txt
 **/

function UUIDjs() {
}
UUIDjs.maxFromBits = function(bits) {
  return Math.pow(2, bits);
};

UUIDjs.limitUI04 = UUIDjs.maxFromBits(4);
UUIDjs.limitUI06 = UUIDjs.maxFromBits(6);
UUIDjs.limitUI08 = UUIDjs.maxFromBits(8);
UUIDjs.limitUI12 = UUIDjs.maxFromBits(12);
UUIDjs.limitUI14 = UUIDjs.maxFromBits(14);
UUIDjs.limitUI16 = UUIDjs.maxFromBits(16);
UUIDjs.limitUI32 = UUIDjs.maxFromBits(32);
UUIDjs.limitUI40 = UUIDjs.maxFromBits(40);
UUIDjs.limitUI48 = UUIDjs.maxFromBits(48);

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
// @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

UUIDjs.randomUI04 = function() {
  return getRandomInt(0, UUIDjs.limitUI04-1);
};
UUIDjs.randomUI06 = function() {
  return getRandomInt(0, UUIDjs.limitUI06-1);
};
UUIDjs.randomUI08 = function() {
  return getRandomInt(0, UUIDjs.limitUI08-1);
};
UUIDjs.randomUI12 = function() {
  return getRandomInt(0, UUIDjs.limitUI12-1);
};
UUIDjs.randomUI14 = function() {
  return getRandomInt(0, UUIDjs.limitUI14-1);
};
UUIDjs.randomUI16 = function() {
  return getRandomInt(0, UUIDjs.limitUI16-1);
};
UUIDjs.randomUI32 = function() {
  return getRandomInt(0, UUIDjs.limitUI32-1);
};
UUIDjs.randomUI40 = function() {
  return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 40 - 30)) * (1 << 30);
};
UUIDjs.randomUI48 = function() {
  return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 48 - 30)) * (1 << 30);
};

UUIDjs.paddedString = function(string, length, z) {
  string = String(string);
  z = (!z) ? '0' : z;
  var i = length - string.length;
  for (; i > 0; i >>>= 1, z += z) {
    if (i & 1) {
      string = z + string;
    }
  }
  return string;
};

UUIDjs.prototype.fromParts = function(timeLow, timeMid, timeHiAndVersion, clockSeqHiAndReserved, clockSeqLow, node) {
  this.version = (timeHiAndVersion >> 12) & 0xF;
  this.hex = UUIDjs.paddedString(timeLow.toString(16), 8)
             + '-'
             + UUIDjs.paddedString(timeMid.toString(16), 4)
             + '-'
             + UUIDjs.paddedString(timeHiAndVersion.toString(16), 4)
             + '-'
             + UUIDjs.paddedString(clockSeqHiAndReserved.toString(16), 2)
             + UUIDjs.paddedString(clockSeqLow.toString(16), 2)
             + '-'
             + UUIDjs.paddedString(node.toString(16), 12);
  return this;
};

UUIDjs.prototype.toString = function() {
  return this.hex;
};
UUIDjs.prototype.toURN = function() {
  return 'urn:uuid:' + this.hex;
};

UUIDjs.prototype.toBytes = function() {
  var parts = this.hex.split('-');
  var ints = [];
  var intPos = 0;
  for (var i = 0; i < parts.length; i++) {
    for (var j = 0; j < parts[i].length; j+=2) {
      ints[intPos++] = parseInt(parts[i].substr(j, 2), 16);
    }
  }
  return ints;
};

UUIDjs.prototype.equals = function(uuid) {
  if (!(uuid instanceof UUID)) {
    return false;
  }
  if (this.hex !== uuid.hex) {
    return false;
  }
  return true;
};

UUIDjs.getTimeFieldValues = function(time) {
  var ts = time - Date.UTC(1582, 9, 15);
  var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
  return { low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
            mid: hm & 0xFFFF, hi: hm >>> 16, timestamp: ts };
};

UUIDjs._create4 = function() {
  return new UUIDjs().fromParts(
    UUIDjs.randomUI32(),
    UUIDjs.randomUI16(),
    0x4000 | UUIDjs.randomUI12(),
    0x80   | UUIDjs.randomUI06(),
    UUIDjs.randomUI08(),
    UUIDjs.randomUI48()
  );
};

UUIDjs._create1 = function() {
  var now = new Date().getTime();
  var sequence = UUIDjs.randomUI14();
  var node = (UUIDjs.randomUI08() | 1) * 0x10000000000 + UUIDjs.randomUI40();
  var tick = UUIDjs.randomUI04();
  var timestamp = 0;
  var timestampRatio = 1/4;

  if (now != timestamp) {
    if (now < timestamp) {
      sequence++;
    }
    timestamp = now;
    tick = UUIDjs.randomUI04();
  } else if (Math.random() < timestampRatio && tick < 9984) {
    tick += 1 + UUIDjs.randomUI04();
  } else {
    sequence++;
  }

  var tf = UUIDjs.getTimeFieldValues(timestamp);
  var tl = tf.low + tick;
  var thav = (tf.hi & 0xFFF) | 0x1000;

  sequence &= 0x3FFF;
  var cshar = (sequence >>> 8) | 0x80;
  var csl = sequence & 0xFF;

  return new UUIDjs().fromParts(tl, tf.mid, thav, cshar, csl, node);
};

UUIDjs.create = function(version) {
  version = version || 4;
  return this['_create' + version]();
};

UUIDjs.fromTime = function(time, last) {
  last = (!last) ? false : last;
  var tf = UUIDjs.getTimeFieldValues(time);
  var tl = tf.low;
  var thav = (tf.hi & 0xFFF) | 0x1000;  // set version '0001'
  if (last === false) {
    return new UUIDjs().fromParts(tl, tf.mid, thav, 0, 0, 0);
  } else {
    return new UUIDjs().fromParts(tl, tf.mid, thav, 0x80 | UUIDjs.limitUI06, UUIDjs.limitUI08 - 1, UUIDjs.limitUI48 - 1);
  }
};

UUIDjs.firstFromTime = function(time) {
  return UUIDjs.fromTime(time, false);
};
UUIDjs.lastFromTime = function(time) {
  return UUIDjs.fromTime(time, true);
};

UUIDjs.fromURN = function(strId) {
  var r, p = /^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i;
  if ((r = p.exec(strId))) {
    return new UUIDjs().fromParts(parseInt(r[1], 16), parseInt(r[2], 16),
                            parseInt(r[3], 16), parseInt(r[4], 16),
                            parseInt(r[5], 16), parseInt(r[6], 16));
  }
  return null;
};

UUIDjs.fromBytes = function(ints) {
  if (ints.length < 5) {
    return null;
  }
  var str = '';
  var pos = 0;
  var parts = [4, 2, 2, 2, 6];
  for (var i = 0; i < parts.length; i++) {
    for (var j = 0; j < parts[i]; j++) {
      var octet = ints[pos++].toString(16);
      if (octet.length == 1) {
        octet = '0' + octet;
      }
      str += octet;
    }
    if (parts[i] !== 6) {
      str += '-';
    }
  }
  return UUIDjs.fromURN(str);
};

UUIDjs.fromBinary = function(binary) {
  var ints = [];
  for (var i = 0; i < binary.length; i++) {
    ints[i] = binary.charCodeAt(i);
    if (ints[i] > 255 || ints[i] < 0) {
      throw new Error('Unexpected byte in binary data.');
    }
  }
  return UUIDjs.fromBytes(ints);
};

// Aliases to support legacy code. Do not use these when writing new code as
// they may be removed in future versions!
UUIDjs.new = function() {
  return this.create(4);
};
UUIDjs.newTS = function() {
  return this.create(1);
};

var uuid = UUIDjs;

/**
 * A CDK v4 websocket dialog have this sequence :
 * ---------- Client ------------------------------------- Server ----------------------------------
 * init (send the new content package) ================>
 *                                       <=========== hmacChallenge
 * answerToHmacChallenge (send the hmac) =========>
 * newPart (send the parameters ) ===============>
 *                                       <=========== update
 * addStrokes (send the strokes ) ============>
 *                                       <=========== update
 */

function buildHmacMessage$1(configuration, message) {
  return {
    type: 'hmac',
    hmac: computeHmac(message.data.hmacChallenge, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey)
  };
}

/**
 * This function bind the right behaviour when a message is receive by the websocket.
 * @param {DestructuredPromise} destructuredPromise
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {function} Callback to handle WebSocket results
 */
function buildWebSocketCallback$1(destructuredPromise, recognizerContext) {
  return function (message) {
    var recognizerContextRef = recognizerContext;
    // Handle websocket messages
    recognizerLogger.trace(message.type + ' websocket callback', message);
    var recognitionContext = recognizerContext.recognitionContexts[recognizerContext.recognitionContexts.length - 1];
    recognizerLogger.debug('Current recognition context', recognitionContext);

    switch (message.type) {
      case 'open':
        if (recognizerContext.sessionId) {
          send(recognizerContext, buildRestoreIInkSessionInput(recognizerContext.editor.configuration, recognizerContext.editor.domElement, recognizerContext.sessionId));
        } else {
          send(recognizerContext, buildNewContentPackageInput(recognizerContext.editor.configuration, recognizerContext.editor.domElement));
        }
        break;
      case 'message':
        recognizerLogger.debug('Receiving ' + message.data.type + ' message', message);
        switch (message.data.type) {
          case 'ack':
            if (message.data.hmacChallenge) {
              send(recognizerContext, buildHmacMessage$1(recognizerContext.editor.configuration, message));
            }
            if (message.data.iinkSessionId) {
              recognizerContextRef.sessionId = message.data.iinkSessionId;
            }
            break;
          case 'newPart':
            break;
          case 'contentPackageDescription':
            recognizerContextRef.currentReconnectionCount = 0;
            recognizerContextRef.contentPartCount = message.data.contentPartCount;
            send(recognizerContext, buildConfiguration(recognizerContext.editor.configuration));
            if (recognizerContextRef.currentPartId) {
              // FIXME: Ugly hack to resolve init promise after opening part
              send(recognizerContext, buildOpenContentPart(recognizerContext.editor.configuration, recognizerContext.currentPartId));
            } else {
              send(recognizerContext, buildNewContentPart(recognizerContext.editor.configuration));
            }
            break;
          case 'partChanged':
            if (message.data.partId) {
              recognizerContextRef.currentPartId = message.data.partId;
            }
            recognizerContextRef.initialized = true;
            send(recognizerContext, buildSetTheme(recognizerContext.editor.theme));
            send(recognizerContext, buildSetPenStyle(recognizerContext.editor.penStyle));
            send(recognizerContext, buildSetPenStyleClasses(recognizerContext.editor.penStyleClasses));
            recognitionContext.callback(undefined, message.data);
            destructuredPromise.resolve(recognitionContext);
            break;
          case 'contentChanged':
            if (message.data.canUndo !== undefined) {
              recognizerContextRef.canUndo = message.data.canUndo;
            }
            if (message.data.canRedo !== undefined) {
              recognizerContextRef.canRedo = message.data.canRedo;
            }
            if (message.data.empty !== undefined) {
              recognizerContextRef.isEmpty = message.data.empty;
            }
            if (message.data.possibleUndoCount !== undefined) {
              recognizerContextRef.possibleUndoCount = message.data.possibleUndoCount;
            }
            if (message.data.undoStackIndex !== undefined) {
              recognizerContextRef.undoStackIndex = message.data.undoStackIndex;
            }
            recognitionContext.callback(undefined, message.data);
            break;
          case 'exported':
            recognitionContext.callback(undefined, message.data);
            break;
          case 'svgPatch':
            recognitionContext.callback(undefined, message.data);
            break;
          case 'supportedImportMimeTypes':
            recognizerContextRef.supportedImportMimeTypes = message.data.mimeTypes;
            recognitionContext.callback(undefined, message.data);
            break;
          case 'fileChunkAck':
            recognitionContext.callback(undefined, message.data);
            break;
          case 'idle':
            recognizerContextRef.idle = true;
            recognitionContext.callback(undefined, message.data);
            break;
          case 'error':
            recognizerLogger.debug('Error detected stopping all recognition', message);
            if (recognitionContext) {
              recognitionContext.callback(message.data);
            } else {
              destructuredPromise.reject(Object.assign({}, message.data, { recoverable: false }));
            }
            break;
          default:
            recognizerLogger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
        }
        break;
      case 'error':
        recognizerLogger.debug('Error detected stopping all recognition', message);
        if (recognitionContext) {
          recognitionContext.callback(Object.assign({}, message, { recoverable: false }));
        } else {
          destructuredPromise.reject(Object.assign({}, message, { recoverable: false }));
        }
        break;
      case 'close':
        recognizerLogger.debug('Close detected stopping all recognition', message);
        recognizerContextRef.initialized = false;
        recognizerContextRef.canRedo = false;
        recognizerContextRef.canUndo = false;
        if (recognitionContext) {
          recognitionContext.callback(message);
        } else {
          destructuredPromise.reject(message);
        }
        break;
      default:
        recognizerLogger.warn('This is something unexpected in current recognizer. Not the type of message we should have here.', message);
    }
  };
}

function readBlob(blob) {
  var _this = this;

  var fileReader = new FileReader();
  return new Promise(function (resolve, reject) {
    fileReader.onload = function (event) {
      return resolve(event.target.result);
    };
    fileReader.onerror = function () {
      return reject(_this);
    };
    fileReader.readAsText(blob);
  });
}

function getDPI(element) {
  // const startDpi = 56;
  // for (let dpi = startDpi; dpi < 2000; dpi++) {
  //   if (window.matchMedia(`(max-resolution: ${dpi}dpi)`).matches === true) {
  //     return dpi;
  //   }
  // }
  // return startDpi;
  return 96;
}

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
var IInkWebSocketV4Configuration = {
  types: [Constants.RecognitionType.MATH, Constants.RecognitionType.TEXT, Constants.RecognitionType.DIAGRAM, Constants.RecognitionType.NEBO],
  protocol: Constants.Protocol.WEBSOCKET,
  apiVersion: 'V4',
  availableTriggers: {
    exportContent: [Constants.Trigger.POINTER_UP, Constants.Trigger.DEMAND],
    addStrokes: [Constants.Trigger.POINTER_UP]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
function getInfo$c() {
  return IInkWebSocketV4Configuration;
}

function buildNewContentPackageInput(configuration, element) {
  return {
    type: 'newContentPackage',
    applicationKey: configuration.recognitionParams.server.applicationKey,
    xDpi: getDPI(element),
    yDpi: getDPI(element),
    viewSizeHeight: element.clientHeight < configuration.renderingParams.minHeight ? configuration.renderingParams.minHeight : element.clientHeight,
    viewSizeWidth: element.clientWidth < configuration.renderingParams.minWidth ? configuration.renderingParams.minWidth : element.clientWidth
  };
}

function buildRestoreIInkSessionInput(configuration, element, sessionId) {
  return {
    type: 'restoreIInkSession',
    iinkSessionId: sessionId,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    xDpi: getDPI(element),
    yDpi: getDPI(element),
    viewSizeHeight: element.clientHeight < configuration.renderingParams.minHeight ? configuration.renderingParams.minHeight : element.clientHeight,
    viewSizeWidth: element.clientWidth < configuration.renderingParams.minWidth ? configuration.renderingParams.minWidth : element.clientWidth
  };
}

function buildNewContentPart(configuration) {
  return {
    type: 'newContentPart',
    contentType: configuration.recognitionParams.type,
    mimeTypes: configuration.triggers.exportContent !== Constants.Trigger.DEMAND ? configuration.recognitionParams.v4['' + configuration.recognitionParams.type.toLowerCase()].mimeTypes : undefined
  };
}

function buildOpenContentPart(configuration, partId) {
  return {
    type: 'openContentPart',
    id: partId,
    mimeTypes: configuration.triggers.exportContent !== Constants.Trigger.DEMAND ? configuration.recognitionParams.v4['' + configuration.recognitionParams.type.toLowerCase()].mimeTypes : undefined
  };
}

function buildConfiguration(configuration) {
  return Object.assign({ type: 'configuration' }, configuration.recognitionParams.v4);
}

function buildAddStrokes(recognizerContext, model) {
  var strokes = extractPendingStrokes(model, recognizerContext.lastPositions.lastSentPosition + 1);
  if (strokes.length > 0) {
    updateModelSentPosition(model);
    return {
      type: 'addStrokes',
      strokes: strokes.map(function (stroke) {
        return Object.assign({}, {
          id: stroke.id,
          pointerType: stroke.pointerType,
          pointerId: stroke.pointerId,
          x: stroke.x,
          y: stroke.y,
          t: stroke.t,
          p: stroke.p
        });
      })
    };
  }
  return undefined;
}

function buildUndo() {
  return {
    type: 'undo'
  };
}

function buildRedo() {
  return {
    type: 'redo'
  };
}

function buildClear() {
  return {
    type: 'clear'
  };
}

function buildConvert(state) {
  return {
    type: 'convert',
    conversionState: state
  };
}

function buildZoom(value) {
  return {
    type: 'zoom',
    zoom: value
  };
}

function buildResize(element) {
  var minHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var minWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return {
    type: 'changeViewSize',
    height: element.clientHeight < minHeight ? minHeight : element.clientHeight,
    width: element.clientWidth < minWidth ? minWidth : element.clientWidth
  };
}

function buildExport(configuration, partId, requestedMimeType) {
  var usedMimeType = void 0;
  if (requestedMimeType && Object.keys(requestedMimeType).length !== 0) {
    usedMimeType = requestedMimeType;
  } else {
    usedMimeType = configuration.recognitionParams.v4['' + configuration.recognitionParams.type.toLowerCase()].mimeTypes;
  }

  return {
    type: 'export',
    partId: partId,
    mimeTypes: usedMimeType
  };
}

function buildImportFile(id, mimetype) {
  return {
    type: 'importFile',
    importFileId: id,
    mimeType: mimetype
  };
}

function buildImportChunk(id, data, lastChunk) {
  return {
    type: 'fileChunk',
    importFileId: id,
    data: data,
    lastChunk: lastChunk
  };
}

function buildPointerEvents(events) {
  return Object.assign({ type: 'pointerEvents' }, events);
}

function buildWaitForIdle() {
  return {
    type: 'waitForIdle'
  };
}

function buildGetSupportedImportMimeTypes() {
  return {
    type: 'getSupportedImportMimeTypes'
  };
}

function buildSetPenStyle(penStyle) {
  return {
    type: 'setPenStyle',
    style: penStyle ? toCSS(penStyle) : ''
  };
}

function buildSetPenStyleClasses(penStyleClasses) {
  return {
    type: 'setPenStyleClasses',
    styleClasses: penStyleClasses
  };
}

function buildSetTheme(theme) {
  return {
    type: 'setTheme',
    theme: toCSS$1(theme)
  };
}

var iinkCallback = function iinkCallback(model, err, res, callback) {
  var modelReference = updateModelReceivedPosition(model);
  if (res) {
    if (res.updates !== undefined) {
      if (modelReference.recognizedSymbols) {
        modelReference.recognizedSymbols.push(res);
      } else {
        modelReference.recognizedSymbols = [res];
      }
      return callback(err, modelReference, Constants.EventType.RENDERED);
    }
    if (res.exports !== undefined) {
      modelReference.rawResults.exports = res;
      modelReference.exports = res.exports;
      return callback(err, modelReference, Constants.EventType.EXPORTED);
    }

    if (res.canUndo !== undefined || res.canRedo !== undefined) {
      return callback(err, modelReference, Constants.EventType.CHANGED);
    }

    if (res.type === 'supportedImportMimeTypes') {
      return callback(err, modelReference, Constants.EventType.SUPPORTED_IMPORT_MIMETYPES);
    }

    if (res.type === 'partChanged') {
      return callback(err, modelReference, Constants.EventType.LOADED);
    }

    if (res.type === 'idle') {
      return callback(err, modelReference, Constants.EventType.IDLE);
    }

    if (res.type === 'close') {
      return callback(err, modelReference, Constants.EventType.CHANGED);
    }
  }
  return callback(err, modelReference);
};

/**
 * Initialize recognition
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function init$5(recognizerContext, model, _callback) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: updateModelSentPosition(model, model.lastPositions.lastReceivedPosition),
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback);
    }
  });
  init$2('/api/v4.0/iink/document', recognizerContextRef, buildWebSocketCallback$1, init$5).catch(function (err) {
    if (shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
      recognizerLogger.info('Attempting a reconnect', recognizerContext.currentReconnectionCount);
      recognizerContext.reconnect(recognizerContext, model, _callback);
    } else {
      recognizerLogger.error('Unable to reconnect', err);
      iinkCallback(model, err, undefined, _callback);
    }
  });
}

/**
 * Create a new content part
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function newContentPart(recognizerContext, model, _callback2) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback2);
    }
  });
  sendMessage(recognizerContextRef, buildNewContentPart, recognizerContext.editor.configuration).catch(function (exception) {
    return retry(newContentPart, recognizerContext, model, _callback2);
  });
}

/**
 * Open the recognizer context content part
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function openContentPart(recognizerContext, model, _callback3) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback3);
    }
  });
  sendMessage(recognizerContextRef, buildOpenContentPart, recognizerContext.editor.configuration, recognizerContext.currentPartId).catch(function (exception) {
    return retry(openContentPart, recognizerContext, model, _callback3);
  });
}

function sendConfiguration(recognizerContext, model, _callback4) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback4);
    }
  });
  sendMessage(recognizerContextRef, buildConfiguration, recognizerContext.editor.configuration).catch(function (exception) {
    return retry(sendConfiguration, recognizerContext, model, _callback4);
  });
}

/**
 * Pointer Events
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {PointerEvents} events to be imported
 * @param {RecognizerCallback} callback
 */
function pointerEvents(recognizerContext, model, events, _callback5) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback5);
    }
  });
  sendMessage(recognizerContextRef, buildPointerEvents, events).catch(function (exception) {
    return retry(pointerEvents, recognizerContext, model, events, _callback5);
  });
}

/**
 * Add strokes to the model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function addStrokes(recognizerContext, model, _callback6) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback6);
    }
  });
  sendMessage(recognizerContextRef, buildAddStrokes, recognizerContext, model).catch(function (exception) {
    return retry(addStrokes, recognizerContext, model, _callback6);
  });
}

/**
 * Undo last action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function undo(recognizerContext, model, _callback7) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback7);
    }
  });
  sendMessage(recognizerContextRef, buildUndo).catch(function (exception) {
    return retry(undo, recognizerContext, model, _callback7);
  });
}

/**
 * Redo last action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function redo(recognizerContext, model, _callback8) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback8);
    }
  });
  sendMessage(recognizerContextRef, buildRedo).catch(function (exception) {
    return retry(redo, recognizerContext, model, _callback8);
  });
}

/**
 * Clear action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function clear$5(recognizerContext, model, _callback9) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      clear(recognizerContext, model, function (noerr, newModel) {
        recognizerLogger.debug('The model after clear is :', newModel);
        iinkCallback(newModel, err, res, _callback9);
      });
    }
  });
  sendMessage(recognizerContextRef, buildClear).catch(function (exception) {
    return retry(clear$5, recognizerContext, model, _callback9);
  });
}

/**
 * Convert action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 * @param {String} conversionState Conversion State, by default DigitalEdit
 */
function convert$1(recognizerContext, model, _callback10, conversionState) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback10);
    }
  });
  sendMessage(recognizerContextRef, buildConvert, conversionState).catch(function (exception) {
    return retry(convert$1, recognizerContext, model, _callback10, conversionState);
  });
}

/**
 * Export action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 * @param {Array[String]} requestedMimeTypes
 */
// eslint-disable-next-line no-underscore-dangle
function export_$8(recognizerContext, model, _callback11, requestedMimeTypes) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback11);
    }
  });
  sendMessage(recognizerContextRef, buildExport, recognizerContext.editor.configuration, recognizerContext.currentPartId, requestedMimeTypes).catch(function (exception) {
    return retry(export_$8, recognizerContext, model, _callback11, requestedMimeTypes);
  });
}

/**
 * Import action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {Blob} data Import data
 * @param {RecognizerCallback} callback
 */
// eslint-disable-next-line no-underscore-dangle
function import_(recognizerContext, model, data, _callback12) {
  var recognitionContext = {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback12);
    },
    importFileId: uuid.create(4).toString()
  };
  var recognizerContextRef = setRecognitionContext(recognizerContext, recognitionContext);

  var chunkSize = recognizerContext.editor.configuration.recognitionParams.server.websocket.fileChunkSize;

  var _loop = function _loop(i) {
    if (i === 0) {
      sendMessage(recognizerContextRef, buildImportFile, recognitionContext.importFileId, data.type).catch(function (exception) {
        return retry(import_, recognizerContext, model, data, _callback12);
      });
    }
    var blobPart = data.slice(i, chunkSize, data.type);
    readBlob(blobPart).then(function (res) {
      sendMessage(recognizerContextRef, buildImportChunk, recognitionContext.importFileId, res, i + chunkSize > data.size).catch(function (exception) {
        return retry(import_, recognizerContext, model, data, _callback12);
      });
    });
  };

  for (var i = 0; i < data.size; i += chunkSize) {
    _loop(i);
  }
}

function getSupportedImportMimeTypes(recognizerContext, model, _callback13) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback13);
    }
  });
  sendMessage(recognizerContextRef, buildGetSupportedImportMimeTypes).catch(function (exception) {
    return retry(getSupportedImportMimeTypes, recognizerContext, model, _callback13);
  });
}

/**
 * WaitForIdle action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function waitForIdle(recognizerContext, model, _callback14) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback14);
    }
  });
  sendMessage(recognizerContextRef, buildWaitForIdle).catch(function (exception) {
    return retry(waitForIdle, recognizerContext, model, _callback14);
  });
}

/**
 * Resize
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 * @param {Element} element Current element
 */
function resize$2(recognizerContext, model, _callback15, element) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback15);
    }
  });
  sendMessage(recognizerContextRef, buildResize, element, recognizerContext.editor.configuration.renderingParams.minHeight, recognizerContext.editor.configuration.renderingParams.minWidth).catch(function (exception) {
    return retry(resize$2, recognizerContext, model, _callback15, element);
  });
}

/**
 * Zoom action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {Number} value=10 Zoom value
 * @param {RecognizerCallback} callback
 */
function zoom(recognizerContext, model) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var _callback16 = arguments[3];

  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback16);
    }
  });
  sendMessage(recognizerContextRef, buildZoom, value).catch(function (exception) {
    return retry(zoom, recognizerContext, model, _callback16);
  });
}

/**
 * SetPenStyle action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {PenStyle} penStyle Current penStyle
 * @param {RecognizerCallback} callback
 */
function setPenStyle(recognizerContext, model, penStyle, _callback17) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback17);
    }
  });
  sendMessage(recognizerContextRef, buildSetPenStyle, penStyle).catch(function (exception) {
    return retry(setPenStyle, recognizerContext, model, _callback17);
  });
}

/**
 * setPenStyleClasses action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {String} penStyleClasses Current penStyleClasses
 * @param {RecognizerCallback} callback
 */
function setPenStyleClasses(recognizerContext, model, penStyleClasses, _callback18) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback18);
    }
  });
  sendMessage(recognizerContextRef, buildSetPenStyleClasses, penStyleClasses).catch(function (exception) {
    return retry(setPenStyleClasses, recognizerContext, model, _callback18);
  });
}

/**
 * SetTheme action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {Theme} theme Current theme
 * @param {RecognizerCallback} callback
 */
function setTheme(recognizerContext, model, theme, _callback19) {
  var recognizerContextRef = setRecognitionContext(recognizerContext, {
    model: model,
    callback: function callback(err, res) {
      return iinkCallback(model, err, res, _callback19);
    }
  });
  sendMessage(recognizerContextRef, buildSetTheme, theme).catch(function (exception) {
    return retry(setTheme, recognizerContext, model, _callback19);
  });
}

var Cdkv4WSInteractiveRecognizer = /*#__PURE__*/Object.freeze({
  init: init$5,
  newContentPart: newContentPart,
  openContentPart: openContentPart,
  sendConfiguration: sendConfiguration,
  pointerEvents: pointerEvents,
  addStrokes: addStrokes,
  undo: undo,
  redo: redo,
  clear: clear$5,
  convert: convert$1,
  export_: export_$8,
  import_: import_,
  getSupportedImportMimeTypes: getSupportedImportMimeTypes,
  waitForIdle: waitForIdle,
  resize: resize$2,
  zoom: zoom,
  setPenStyle: setPenStyle,
  setPenStyleClasses: setPenStyleClasses,
  setTheme: setTheme,
  IInkWebSocketV4Configuration: IInkWebSocketV4Configuration,
  getInfo: getInfo$c,
  buildNewContentPackageInput: buildNewContentPackageInput,
  buildRestoreIInkSessionInput: buildRestoreIInkSessionInput,
  buildNewContentPart: buildNewContentPart,
  buildOpenContentPart: buildOpenContentPart,
  buildConfiguration: buildConfiguration,
  buildSetPenStyle: buildSetPenStyle,
  buildSetPenStyleClasses: buildSetPenStyleClasses,
  buildSetTheme: buildSetTheme,
  close: close$2
});

/**
 * Emits an event when the editor state change
 * @param {String} type
 * @param {Object} data
 * @emits {Event}
 */
function eventCallback(type, data) {
  callbackLogger.info('emitting ' + type + ' event', data);
  // We are making usage of a browser provided class
  // eslint-disable-next-line no-undef
  this.dispatchEvent(new CustomEvent(type, Object.assign({ bubbles: true, composed: true }, data ? { detail: data } : undefined)));
}

/**
 * Current behavior
 * @typedef {Object} Behavior
 * @property {Grabber} grabber Grabber to capture strokes
 * @property {Stroker} stroker Stroker to draw stroke
 * @property {Renderer} renderer Renderer to draw on the editor
 * @property {Recognizer} recognizer Recognizer to call the recognition service
 * @property {Array} callbacks Functions to handle model changes
 */

/**
 * Set of behaviors to be used by the {@link Editor}
 * @typedef {Object} Behaviors
 * @property {Grabber} grabber Grabber to capture strokes
 * @property {Array<Stroker>} strokerList List of stroker to draw stroke
 * @property {Array<Renderer>} rendererList List of renderer to draw on the editor
 * @property {Array<Recognizer>} recognizerList Recognizers to call the recognition service
 * @property {function(behaviors: Behaviors, configuration: Configuration): Behavior} getBehaviorFromConfiguration Get the current behavior to use regarding the current configuration
 * @property {Array} callbacks Functions to handle model changes
 */

/**
 * Default behaviors
 * @type {Behaviors}
 */
var defaultBehaviors = {
  grabber: PointerEventGrabber,
  strokerList: [QuadraticCanvasStroker, QuadraticSVGStroker],
  rendererList: [CanvasRenderer, SVGRenderer],
  recognizerList: [Cdkv3RestTextRecognizer, Cdkv3RestMathRecognizer, Cdkv3RestAnalyzerRecognizer, Cdkv3RestShapeRecognizer, Cdkv3RestMusicRecognizer, iinkRestRecognizer, Cdkv3WSTextRecognizer, Cdkv3WSMathRecognizer, Cdkv4WSInteractiveRecognizer],
  callbacks: [eventCallback],
  getBehaviorFromConfiguration: function getBehaviorFromConfiguration(behaviors, configuration) {
    var behavior = {};
    behavior.grabber = behaviors.grabber;
    if (configuration) {
      if (configuration.recognitionParams.apiVersion === 'V4' && configuration.recognitionParams.protocol === 'REST') {
        behavior.stroker = QuadraticCanvasStroker;
      } else {
        behavior.stroker = behaviors.strokerList.find(function (item) {
          return item.getInfo().apiVersion === configuration.recognitionParams.apiVersion && item.getInfo().name === configuration.renderingParams.stroker;
        });
      }
      if (configuration.recognitionParams.apiVersion === 'V4' && configuration.recognitionParams.protocol === 'REST') {
        behavior.renderer = CanvasRenderer;
      } else {
        behavior.renderer = behaviors.rendererList.find(function (item) {
          return item.getInfo().apiVersion === configuration.recognitionParams.apiVersion;
        });
      }
      behavior.recognizer = behaviors.recognizerList.find(function (item) {
        return item.getInfo().types.includes(configuration.recognitionParams.type) && item.getInfo().protocol === configuration.recognitionParams.protocol && item.getInfo().apiVersion === configuration.recognitionParams.apiVersion;
      });
    }
    behavior.callbacks = behaviors.callbacks;
    return behavior;
  }
};

/**
 * Generate behaviors
 * @param {Behaviors} behaviors Behaviors to be used
 * @return {Behaviors} Overridden behaviors
 */
function overrideDefaultBehaviors(behaviors) {
  if (behaviors) {
    var currentBehaviors = {
      grabber: behaviors.grabber || defaultBehaviors.grabber,
      rendererList: behaviors.rendererList || defaultBehaviors.rendererList,
      strokerList: behaviors.strokerList || defaultBehaviors.strokerList,
      recognizerList: behaviors.recognizerList || defaultBehaviors.recognizerList,
      callbacks: behaviors.callbacks || defaultBehaviors.callbacks,
      getBehaviorFromConfiguration: behaviors.getBehaviorFromConfiguration || defaultBehaviors.getBehaviorFromConfiguration
    };
    editorLogger.debug('Override default behaviors', currentBehaviors);
    return currentBehaviors;
  }
  return defaultBehaviors;
}

/**
 * Undo/redo context
 * @typedef {Object} UndoRedoContext
 * @property {Array<Model>} stack=[] List of processed models.
 * @property {Number} currentPosition=-1 Current model index into the stack.
 * @property {Number} maxSize Max size of the stack.
 * @property {Boolean} canUndo=false
 * @property {Boolean} canRedo=false
 */

/**
 * Create a new undo/redo context
 * @param {Configuration} configuration Current configuration
 * @return {UndoRedoContext} New undo/redo context
 */
function createUndoRedoContext(configuration) {
  return {
    stack: [],
    currentPosition: -1,
    maxSize: configuration.undoRedoMaxStackSize,
    canUndo: false,
    canRedo: false
  };
}

/**
 * Update the undo/redo state
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @return {UndoRedoContext} Updated undo/redo context
 */
function updateUndoRedoState(undoRedoContext) {
  var undoRedoContextRef = undoRedoContext;
  undoRedoContextRef.canUndo = undoRedoContext.currentPosition > 0;
  undoRedoContextRef.canRedo = undoRedoContext.currentPosition < undoRedoContext.stack.length - 1;
  return undoRedoContextRef;
}

/**
 * Undo/redo manager
 * @typedef {Object} UndoRedoManager
 * @property {function(undoRedoContext: UndoRedoContext, model: Model, callback: RecognizerCallback)} updateModel Push the current model into the undo/redo context.
 * @property {function(undoRedoContext: UndoRedoContext, model: Model, callback: RecognizerCallback)} undo Undo.
 * @property {function(undoRedoContext: UndoRedoContext, model: Model, callback: RecognizerCallback)} redo Redo.
 * @property {function(undoRedoContext: UndoRedoContext, model: Model, callback: RecognizerCallback)} clear Clear.
 */

/**
 * Get current model in stack
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @param {function(err: Object, res: Model, types: ...String)} callback
 * @param {Boolean} [clone=true] Whether or not to clone the model
 * @param {...String} types
 */
function getModel(undoRedoContext, callback) {
  var clone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var model = undoRedoContext.stack[undoRedoContext.currentPosition];

  for (var _len = arguments.length, types = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    types[_key - 3] = arguments[_key];
  }

  callback.apply(undefined, [undefined, clone ? cloneModel(model) : model].concat(types));
}

/**
 * Mutate the undoRedo stack by adding a new model to it.
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context.
 * @param {Model} model Current model.
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
function updateModel(undoRedoContext, model, callback) {
  // Used to update the model with the recognition result if relevant
  var modelIndex = undoRedoContext.stack.findIndex(function (item) {
    return item.modificationTime === model.modificationTime && item.rawStrokes.length === model.rawStrokes.length;
  });

  var modelReference = model;
  modelReference.modificationTime = new Date().getTime();

  var types = [];
  if (modelIndex > -1) {
    undoRedoContext.stack.splice(modelIndex, 1, cloneModel(modelReference));
    modelLogger.debug('model updated', modelReference);
  } else {
    var undoRedoContextReference = undoRedoContext;
    undoRedoContextReference.currentPosition += 1;
    undoRedoContextReference.stack = undoRedoContextReference.stack.slice(0, undoRedoContextReference.currentPosition);
    undoRedoContextReference.stack.push(cloneModel(modelReference));
    if (undoRedoContextReference.stack.length > undoRedoContextReference.maxSize) {
      undoRedoContextReference.stack.shift();
      undoRedoContextReference.currentPosition--;
    }
    modelLogger.debug('model pushed', modelReference);
    types.push(Constants.EventType.CHANGED);
  }
  updateUndoRedoState(undoRedoContext);
  modelLogger.debug('undo/redo stack updated', undoRedoContext);
  getModel.apply(undefined, [undoRedoContext, callback, false].concat(types));
}

/**
 * Undo
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context.
 * @param {Model} model Current model.
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
function undo$1(undoRedoContext, model, callback) {
  var undoRedoContextReference = undoRedoContext;
  if (undoRedoContextReference.currentPosition > 0) {
    undoRedoContextReference.currentPosition -= 1;
    updateUndoRedoState(undoRedoContext);
    modelLogger.debug('undo index', undoRedoContextReference.currentPosition);
  }
  getModel(undoRedoContext, callback, true, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
}

/**
 * Redo
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context.
 * @param {Model} model Current model.
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
function redo$1(undoRedoContext, model, callback) {
  var undoRedoContextReference = undoRedoContext;
  if (undoRedoContextReference.currentPosition < undoRedoContextReference.stack.length - 1) {
    undoRedoContextReference.currentPosition += 1;
    updateUndoRedoState(undoRedoContext);
    modelLogger.debug('redo index', undoRedoContextReference.currentPosition);
  }
  getModel(undoRedoContext, callback, true, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
}

var UndoRedoManager = /*#__PURE__*/Object.freeze({
  getModel: getModel,
  updateModel: updateModel,
  undo: undo$1,
  redo: redo$1
});

/**
 * @typedef {Object} Stats
 * @property {Number} strokesCount=0
 * @property {Number} pointsCount=0
 * @property {Number} byteSize=0
 * @property {Number} humanSize=0
 * @property {String} humanUnit=BYTE
 */

/**
 * @param {Model} model Current model
 * @return {Stats} Statistics about recognition
 */
function computeStats(model) {
  var stats = { strokesCount: 0, pointsCount: 0, byteSize: 0, humanSize: 0, humanUnit: 'BYTE' };
  if (model.rawStrokes) {
    stats.strokesCount = model.rawStrokes.length;

    var restMessage = buildInput(createEmptyRecognizerContext({ configuration: defaultConfiguration }), model);
    stats.pointsCount = model.rawStrokes.map(function (stroke) {
      return stroke.x.length;
    }).reduce(function (a, b) {
      return a + b;
    }, 0);
    // We start with 270 as it is the size in bytes. Make a real computation implies to recode a doRecognition
    var byteSize = restMessage.textInput.length;
    stats.byteSize = byteSize;
    if (byteSize < 270) {
      stats.humanUnit = 'BYTE';
      stats.byteSize = 0;
      stats.humanSize = 0;
    } else if (byteSize < 2048) {
      stats.humanUnit = 'BYTES';
      stats.humanSize = byteSize;
    } else if (byteSize < 1024 * 1024) {
      stats.humanUnit = 'KiB';
      stats.humanSize = (byteSize / 1024).toFixed(2);
    } else {
      stats.humanUnit = 'MiB';
      stats.humanSize = (byteSize / 1024 / 1024).toFixed(2);
    }
  }
  utilLogger.info('Stats', stats);
  return stats;
}

function createCanvas$1(borderCoordinates) {
  var margin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  // eslint-disable-next-line no-undef
  var browserDocument = document;
  var canvas = browserDocument.createElement('canvas');
  canvas.width = Math.abs(borderCoordinates.maxX - borderCoordinates.minX) + 2 * margin;
  canvas.style.width = canvas.width + 'px';
  canvas.height = Math.abs(borderCoordinates.maxY - borderCoordinates.minY) + 2 * margin;
  canvas.style.height = canvas.height + 'px';
  return canvas;
}

/**
 * Generate a PNG image data url from the model
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @param {Number} [margin=10] Margins to apply around the image
 * @return {String} Image data string result
 */
function getImage(model, stroker) {
  var margin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

  if (model.rawStrokes.length > 0) {
    var borderCoordinates = getBorderCoordinates(model);

    var capturingCanvas = createCanvas$1(borderCoordinates, margin);
    var renderingCanvas = createCanvas$1(borderCoordinates, margin);
    var renderStructure = {
      renderingCanvas: renderingCanvas,
      renderingCanvasContext: renderingCanvas.getContext('2d'),
      capturingCanvas: capturingCanvas,
      capturingCanvasContext: capturingCanvas.getContext('2d')
    };
    // Change canvas origin
    renderStructure.renderingCanvasContext.translate(-borderCoordinates.minX + margin, -borderCoordinates.minY + margin);
    drawModel(renderStructure, model, stroker);
    return renderStructure.renderingCanvas.toDataURL('image/png');
  }
  return null;
}

/*!
 * perfect-scrollbar v1.3.0
 * (c) 2017 Hyunje Jun
 * @license MIT
 */
function get$2(element) {
  return getComputedStyle(element);
}

function set$1(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val + "px";
    }
    element.style[key] = val;
  }
  return element;
}

function div(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

var elMatches =
  typeof Element !== 'undefined' &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.msMatchesSelector);

function matches(element, query) {
  if (!elMatches) {
    throw new Error('No element matching method supported');
  }

  return elMatches.call(element, query);
}

function remove$1(element) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

function queryChildren(element, selector) {
  return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
  );
}

var cls = {
  main: 'ps',
  element: {
    thumb: function (x) { return ("ps__thumb-" + x); },
    rail: function (x) { return ("ps__rail-" + x); },
    consuming: 'ps__child--consume',
  },
  state: {
    focus: 'ps--focus',
    active: function (x) { return ("ps--active-" + x); },
    scrolling: function (x) { return ("ps--scrolling-" + x); },
  },
};

/*
 * Helper methods
 */
var scrollingClassTimeout = { x: null, y: null };

function addScrollingClass(i, x) {
  var classList = i.element.classList;
  var className = cls.state.scrolling(x);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[x]);
  } else {
    classList.add(className);
  }
}

function removeScrollingClass(i, x) {
  scrollingClassTimeout[x] = setTimeout(
    function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
    i.settings.scrollingThreshold
  );
}

function setScrollingClassInstantly(i, x) {
  addScrollingClass(i, x);
  removeScrollingClass(i, x);
}

var EventElement = function EventElement(element) {
  this.element = element;
  this.handlers = {};
};

var prototypeAccessors = { isEmpty: { configurable: true } };

EventElement.prototype.bind = function bind (eventName, handler) {
  if (typeof this.handlers[eventName] === 'undefined') {
    this.handlers[eventName] = [];
  }
  this.handlers[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function unbind (eventName, target) {
    var this$1 = this;

  this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
    if (target && handler !== target) {
      return true;
    }
    this$1.element.removeEventListener(eventName, handler, false);
    return false;
  });
};

EventElement.prototype.unbindAll = function unbindAll () {
    var this$1 = this;

  for (var name in this$1.handlers) {
    this$1.unbind(name);
  }
};

prototypeAccessors.isEmpty.get = function () {
    var this$1 = this;

  return Object.keys(this.handlers).every(
    function (key) { return this$1.handlers[key].length === 0; }
  );
};

Object.defineProperties( EventElement.prototype, prototypeAccessors );

var EventManager = function EventManager() {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function eventElement (element) {
  var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
  if (!ee) {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function bind (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function unbind (element, eventName, handler) {
  var ee = this.eventElement(element);
  ee.unbind(eventName, handler);

  if (ee.isEmpty) {
    // remove
    this.eventElements.splice(this.eventElements.indexOf(ee), 1);
  }
};

EventManager.prototype.unbindAll = function unbindAll () {
  this.eventElements.forEach(function (e) { return e.unbindAll(); });
  this.eventElements = [];
};

EventManager.prototype.once = function once (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (evt) {
    ee.unbind(eventName, onceHandler);
    handler(evt);
  };
  ee.bind(eventName, onceHandler);
};

function createEvent(name) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name);
  } else {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, undefined);
    return evt;
  }
}

var processScrollDiff = function(
  i,
  axis,
  diff,
  useScrollingClass,
  forceFireReachEvent
) {
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var fields;
  if (axis === 'top') {
    fields = [
      'contentHeight',
      'containerHeight',
      'scrollTop',
      'y',
      'up',
      'down' ];
  } else if (axis === 'left') {
    fields = [
      'contentWidth',
      'containerWidth',
      'scrollLeft',
      'x',
      'left',
      'right' ];
  } else {
    throw new Error('A proper axis should be provided');
  }

  processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
};

function processScrollDiff$1(
  i,
  diff,
  ref,
  useScrollingClass,
  forceFireReachEvent
) {
  var contentHeight = ref[0];
  var containerHeight = ref[1];
  var scrollTop = ref[2];
  var y = ref[3];
  var up = ref[4];
  var down = ref[5];
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var element = i.element;

  // reset reach
  i.reach[y] = null;

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = 'start';
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = 'end';
  }

  if (diff) {
    element.dispatchEvent(createEvent(("ps-scroll-" + y)));

    if (diff < 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + up)));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + down)));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
  }
}

function toInt(x) {
  return parseInt(x, 10) || 0;
}

function isEditable(el) {
  return (
    matches(el, 'input,[contenteditable]') ||
    matches(el, 'select,[contenteditable]') ||
    matches(el, 'textarea,[contenteditable]') ||
    matches(el, 'button,[contenteditable]')
  );
}

function outerWidth(element) {
  var styles = get$2(element);
  return (
    toInt(styles.width) +
    toInt(styles.paddingLeft) +
    toInt(styles.paddingRight) +
    toInt(styles.borderLeftWidth) +
    toInt(styles.borderRightWidth)
  );
}

var env = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer:
    typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
  isChrome:
    typeof navigator !== 'undefined' &&
    /Chrome/i.test(navigator && navigator.userAgent),
};

var updateGeometry = function(i) {
  var element = i.element;

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove$1(el); }
    );
    element.appendChild(i.scrollbarXRail);
  }
  if (!element.contains(i.scrollbarYRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove$1(el); }
    );
    element.appendChild(i.scrollbarYRail);
  }

  if (
    !i.settings.suppressScrollX &&
    i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
  ) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(
      i,
      toInt(i.railXWidth * i.containerWidth / i.contentWidth)
    );
    i.scrollbarXLeft = toInt(
      (i.negativeScrollAdjustment + element.scrollLeft) *
        (i.railXWidth - i.scrollbarXWidth) /
        (i.contentWidth - i.containerWidth)
    );
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
  ) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(
      i,
      toInt(i.railYHeight * i.containerHeight / i.contentHeight)
    );
    i.scrollbarYTop = toInt(
      element.scrollTop *
        (i.railYHeight - i.scrollbarYHeight) /
        (i.contentHeight - i.containerHeight)
    );
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active('x'));
  } else {
    element.classList.remove(cls.state.active('x'));
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = 0;
  }
  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active('y'));
  } else {
    element.classList.remove(cls.state.active('y'));
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
};

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = { width: i.railXWidth };
  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.containerWidth -
      i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  set$1(i.scrollbarXRail, xRailOffset);

  var yRailOffset = { top: element.scrollTop, height: i.railYHeight };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.contentWidth -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth * 2 -
        i.contentWidth -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  set$1(i.scrollbarYRail, yRailOffset);

  set$1(i.scrollbarX, {
    left: i.scrollbarXLeft,
    width: i.scrollbarXWidth - i.railBorderXWidth,
  });
  set$1(i.scrollbarY, {
    top: i.scrollbarYTop,
    height: i.scrollbarYHeight - i.railBorderYWidth,
  });
}

var clickRail = function(i) {
  i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
    var positionTop =
      e.pageY -
      window.pageYOffset -
      i.scrollbarYRail.getBoundingClientRect().top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.containerHeight;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
    var positionLeft =
      e.pageX -
      window.pageXOffset -
      i.scrollbarXRail.getBoundingClientRect().left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.containerWidth;
    updateGeometry(i);

    e.stopPropagation();
  });
};

var dragThumb = function(i) {
  bindMouseScrollHandler(i, [
    'containerWidth',
    'contentWidth',
    'pageX',
    'railXWidth',
    'scrollbarX',
    'scrollbarXWidth',
    'scrollLeft',
    'x' ]);
  bindMouseScrollHandler(i, [
    'containerHeight',
    'contentHeight',
    'pageY',
    'railYHeight',
    'scrollbarY',
    'scrollbarYHeight',
    'scrollTop',
    'y' ]);
};

function bindMouseScrollHandler(
  i,
  ref
) {
  var containerHeight = ref[0];
  var contentHeight = ref[1];
  var pageY = ref[2];
  var railYHeight = ref[3];
  var scrollbarY = ref[4];
  var scrollbarYHeight = ref[5];
  var scrollTop = ref[6];
  var y = ref[7];

  var element = i.element;

  var startingScrollTop = null;
  var startingMousePageY = null;
  var scrollBy = null;

  function mouseMoveHandler(e) {
    element[scrollTop] =
      startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
    addScrollingClass(i, y);
    updateGeometry(i);

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    removeScrollingClass(i, y);
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  }

  i.event.bind(i[scrollbarY], 'mousedown', function (e) {
    startingScrollTop = element[scrollTop];
    startingMousePageY = e[pageY];
    scrollBy =
      (i[contentHeight] - i[containerHeight]) /
      (i[railYHeight] - i[scrollbarYHeight]);

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

var keyboard = function(i) {
  var element = i.element;

  var elementHovered = function () { return matches(element, ':hover'); };
  var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (
        (scrollTop === 0 && deltaY > 0) ||
        (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (
        (scrollLeft === 0 && deltaX < 0) ||
        (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (
      (e.isDefaultPrevented && e.isDefaultPrevented()) ||
      e.defaultPrevented
    ) {
      return;
    }

    if (!elementHovered() && !scrollbarFocused()) {
      return;
    }

    var activeElement = document.activeElement
      ? document.activeElement
      : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
      case 37: // left
        if (e.metaKey) {
          deltaX = -i.contentWidth;
        } else if (e.altKey) {
          deltaX = -i.containerWidth;
        } else {
          deltaX = -30;
        }
        break;
      case 38: // up
        if (e.metaKey) {
          deltaY = i.contentHeight;
        } else if (e.altKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = 30;
        }
        break;
      case 39: // right
        if (e.metaKey) {
          deltaX = i.contentWidth;
        } else if (e.altKey) {
          deltaX = i.containerWidth;
        } else {
          deltaX = 30;
        }
        break;
      case 40: // down
        if (e.metaKey) {
          deltaY = -i.contentHeight;
        } else if (e.altKey) {
          deltaY = -i.containerHeight;
        } else {
          deltaY = -30;
        }
        break;
      case 32: // space bar
        if (e.shiftKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = -i.containerHeight;
        }
        break;
      case 33: // page up
        deltaY = i.containerHeight;
        break;
      case 34: // page down
        deltaY = -i.containerHeight;
        break;
      case 36: // home
        deltaY = i.contentHeight;
        break;
      case 35: // end
        deltaY = -i.contentHeight;
        break;
      default:
        return;
    }

    if (i.settings.suppressScrollX && deltaX !== 0) {
      return;
    }
    if (i.settings.suppressScrollY && deltaY !== 0) {
      return;
    }

    element.scrollTop -= deltaY;
    element.scrollLeft += deltaX;
    updateGeometry(i);

    if (shouldPreventDefault(deltaX, deltaY)) {
      e.preventDefault();
    }
  });
};

var wheel = function(i) {
  var element = i.element;

  function shouldPreventDefault(deltaX, deltaY) {
    var isTop = element.scrollTop === 0;
    var isBottom =
      element.scrollTop + element.offsetHeight === element.scrollHeight;
    var isLeft = element.scrollLeft === 0;
    var isRight =
      element.scrollLeft + element.offsetWidth === element.offsetWidth;

    var hitsBound;

    // pick axis with primary direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      hitsBound = isTop || isBottom;
    } else {
      hitsBound = isLeft || isRight;
    }

    return hitsBound ? !i.settings.wheelPropagation : true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    // FIXME: this is a workaround for <select> issue in FF and IE #571
    if (!env.isWebKit && element.querySelector('select:focus')) {
      return true;
    }

    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get$2(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function mousewheelHandler(e) {
    var ref = getDeltaFromEvent(e);
    var deltaX = ref[0];
    var deltaY = ref[1];

    if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
      return;
    }

    var shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop -= deltaY * i.settings.wheelSpeed;
      element.scrollLeft += deltaX * i.settings.wheelSpeed;
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
      } else {
        element.scrollTop += deltaX * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else {
        element.scrollLeft -= deltaY * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    }

    updateGeometry(i);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent && !e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== 'undefined') {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== 'undefined') {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
};

var touch$1 = function(i) {
  if (!env.supportsTouch && !env.supportsIePointer) {
    return;
  }

  var element = i.element;

  function shouldPrevent(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (
        (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
        (deltaY > 0 && scrollTop === 0)
      ) {
        // set prevent for mobile Chrome refresh
        return window.scrollY === 0 && deltaY > 0 && env.isChrome;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (
        (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
        (deltaX > 0 && scrollLeft === 0)
      ) {
        return true;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    element.scrollTop -= differenceY;
    element.scrollLeft -= differenceX;

    updateGeometry(i);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }

  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (
      e.pointerType &&
      e.pointerType !== 'mouse' &&
      e.pointerType !== e.MSPOINTER_TYPE_MOUSE
    ) {
      return true;
    }
    return false;
  }

  function touchStart(e) {
    if (!shouldHandle(e)) {
      return;
    }

    var touch = getTouch(e);

    startOffset.pageX = touch.pageX;
    startOffset.pageY = touch.pageY;

    startTime = new Date().getTime();

    if (easingLoop !== null) {
      clearInterval(easingLoop);
    }
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get$2(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function touchMove(e) {
    if (shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
        return;
      }

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = new Date().getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPrevent(differenceX, differenceY)) {
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (i.settings.swipeEasing) {
      clearInterval(easingLoop);
      easingLoop = setInterval(function() {
        if (i.isInitialized) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (env.supportsTouch) {
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (env.supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
};

var defaultSettings = function () { return ({
  handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollingThreshold: 1000,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipeEasing: true,
  useBothWheelAxes: false,
  wheelPropagation: false,
  wheelSpeed: 1,
}); };

var handlers = {
  'click-rail': clickRail,
  'drag-thumb': dragThumb,
  keyboard: keyboard,
  wheel: wheel,
  touch: touch$1,
};

var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
  var this$1 = this;
  if ( userSettings === void 0 ) userSettings = {};

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (!element || !element.nodeName) {
    throw new Error('no element is specified to initialize PerfectScrollbar');
  }

  this.element = element;

  element.classList.add(cls.main);

  this.settings = defaultSettings();
  for (var key in userSettings) {
    this$1.settings[key] = userSettings[key];
  }

  this.containerWidth = null;
  this.containerHeight = null;
  this.contentWidth = null;
  this.contentHeight = null;

  var focus = function () { return element.classList.add(cls.state.focus); };
  var blur = function () { return element.classList.remove(cls.state.focus); };

  this.isRtl = get$2(element).direction === 'rtl';
  this.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? element.scrollWidth - element.clientWidth
    : 0;
  this.event = new EventManager();
  this.ownerDocument = element.ownerDocument || document;

  this.scrollbarXRail = div(cls.element.rail('x'));
  element.appendChild(this.scrollbarXRail);
  this.scrollbarX = div(cls.element.thumb('x'));
  this.scrollbarXRail.appendChild(this.scrollbarX);
  this.scrollbarX.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarX, 'focus', focus);
  this.event.bind(this.scrollbarX, 'blur', blur);
  this.scrollbarXActive = null;
  this.scrollbarXWidth = null;
  this.scrollbarXLeft = null;
  var railXStyle = get$2(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
  if (isNaN(this.scrollbarXBottom)) {
    this.isScrollbarXUsingBottom = false;
    this.scrollbarXTop = toInt(railXStyle.top);
  } else {
    this.isScrollbarXUsingBottom = true;
  }
  this.railBorderXWidth =
    toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
  // Set rail to display:block to calculate margins
  set$1(this.scrollbarXRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
  set$1(this.scrollbarXRail, { display: '' });
  this.railXWidth = null;
  this.railXRatio = null;

  this.scrollbarYRail = div(cls.element.rail('y'));
  element.appendChild(this.scrollbarYRail);
  this.scrollbarY = div(cls.element.thumb('y'));
  this.scrollbarYRail.appendChild(this.scrollbarY);
  this.scrollbarY.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarY, 'focus', focus);
  this.event.bind(this.scrollbarY, 'blur', blur);
  this.scrollbarYActive = null;
  this.scrollbarYHeight = null;
  this.scrollbarYTop = null;
  var railYStyle = get$2(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(railYStyle.right, 10);
  if (isNaN(this.scrollbarYRight)) {
    this.isScrollbarYUsingRight = false;
    this.scrollbarYLeft = toInt(railYStyle.left);
  } else {
    this.isScrollbarYUsingRight = true;
  }
  this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
  this.railBorderYWidth =
    toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
  set$1(this.scrollbarYRail, { display: 'block' });
  this.railYMarginHeight =
    toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
  set$1(this.scrollbarYRail, { display: '' });
  this.railYHeight = null;
  this.railYRatio = null;

  this.reach = {
    x:
      element.scrollLeft <= 0
        ? 'start'
        : element.scrollLeft >= this.contentWidth - this.containerWidth
          ? 'end'
          : null,
    y:
      element.scrollTop <= 0
        ? 'start'
        : element.scrollTop >= this.contentHeight - this.containerHeight
          ? 'end'
          : null,
  };

  this.isAlive = true;

  this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

  this.lastScrollTop = element.scrollTop; // for onScroll only
  this.lastScrollLeft = element.scrollLeft; // for onScroll only
  this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
  updateGeometry(this);
};

PerfectScrollbar.prototype.update = function update () {
  if (!this.isAlive) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? this.element.scrollWidth - this.element.clientWidth
    : 0;

  // Recalculate rail margins
  set$1(this.scrollbarXRail, { display: 'block' });
  set$1(this.scrollbarYRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(get$2(this.scrollbarXRail).marginLeft) +
    toInt(get$2(this.scrollbarXRail).marginRight);
  this.railYMarginHeight =
    toInt(get$2(this.scrollbarYRail).marginTop) +
    toInt(get$2(this.scrollbarYRail).marginBottom);

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  set$1(this.scrollbarXRail, { display: 'none' });
  set$1(this.scrollbarYRail, { display: 'none' });

  updateGeometry(this);

  processScrollDiff(this, 'top', 0, false, true);
  processScrollDiff(this, 'left', 0, false, true);

  set$1(this.scrollbarXRail, { display: '' });
  set$1(this.scrollbarYRail, { display: '' });
};

PerfectScrollbar.prototype.onScroll = function onScroll (e) {
  if (!this.isAlive) {
    return;
  }

  updateGeometry(this);
  processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
  processScrollDiff(
    this,
    'left',
    this.element.scrollLeft - this.lastScrollLeft
  );

  this.lastScrollTop = this.element.scrollTop;
  this.lastScrollLeft = this.element.scrollLeft;
};

PerfectScrollbar.prototype.destroy = function destroy () {
  if (!this.isAlive) {
    return;
  }

  this.event.unbindAll();
  remove$1(this.scrollbarX);
  remove$1(this.scrollbarY);
  remove$1(this.scrollbarXRail);
  remove$1(this.scrollbarYRail);
  this.removePsClasses();

  // unset elements
  this.element = null;
  this.scrollbarX = null;
  this.scrollbarY = null;
  this.scrollbarXRail = null;
  this.scrollbarYRail = null;

  this.isAlive = false;
};

PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
  this.element.className = this.element.className
    .split(' ')
    .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
    .join(' ');
};

function select$1(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

var select_1 = select$1;

var clipboardAction = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    {
        factory(module, select_1);
    }
})(commonjsGlobal, function (module, _select) {

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.container = options.container;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }
        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }
        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                this.container.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }
        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    this.container.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    this.container.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }
        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }
        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }
        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.trigger) {
                    this.trigger.focus();
                }

                window.getSelection().removeAllRanges();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});
});

unwrapExports(clipboardAction);

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

var tinyEmitter = E;

var is = createCommonjsModule(function (module, exports) {
/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};
});
var is_1 = is.node;
var is_2 = is.nodeList;
var is_3 = is.string;
var is_4 = is.fn;

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

var closest_1 = closest;

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest_1(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

var delegate_1 = delegate;

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate_1(document.body, selector, type, callback);
}

var listen_1 = listen;

var clipboard = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    {
        factory(module, clipboardAction, tinyEmitter, listen_1);
    }
})(commonjsGlobal, function (module, _clipboardAction, _tinyEmitter, _goodListener) {

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                this.container = _typeof(options.container) === 'object' ? options.container : document.body;
            }
        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    container: this.container,
                    trigger: trigger,
                    emitter: this
                });
            }
        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }
        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }
        }, {
            key: 'defaultText',
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }], [{
            key: 'isSupported',
            value: function isSupported() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

                var actions = typeof action === 'string' ? [action] : action;
                var support = !!document.queryCommandSupported;

                actions.forEach(function (action) {
                    support = support && !!document.queryCommandSupported(action);
                });

                return support;
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});
});

var Clipboard = unwrapExports(clipboard);

/**
 * Smart guide
 * @typedef {Object} SmartGuide
 * @property {Editor} editor - A reference to the current editor.
 * @property {String} wordToChange - Word to change following a click on a word.
 * @property {String} lastWord - Keep the last word of the previous export to compare with the new and scroll if it's different.
 * @property {String} previousLabelExport - Keep the previous label export to know if we should repopulate the prompter text.
 * @property {PerfectScrollbar} perfectScrollbar - Perfect Scrollbar used to get gestures from smart guide using touch-action none anyway and get scrolling too.
 * @property {Object} elements - All the HTML elements of the smart guide.
 * @property {Number} smartGuideTimeOutId - Id of the setTimeOut from fade out animation to clear.
 * @property {String} randomString - Random string used in case of multiple smart guide.
 */

/**
 * Create all the smart guide HTML elements.
 */
function createHTMLElements(randomString) {
  /**
   * The smart guide element.
   * @type {HTMLDivElement}
   */
  var smartGuideElement = document.createElement('div');
  smartGuideElement.id = 'smartguide' + randomString;
  smartGuideElement.classList.add('smartguide');

  /**
   * The prompter text element that contains the text to get the overflow working.
   * @type {HTMLDivElement}
   */
  var textElement = document.createElement('div');
  textElement.id = 'prompter-text' + randomString;
  textElement.classList.add('prompter-text');
  textElement.setAttribute('touch-action', 'none');

  /**
   * The text container element that contains the text element.
   * @type {HTMLDivElement}
   */
  var textContainer = document.createElement('div');
  textContainer.id = 'prompter-text-container' + randomString;
  textContainer.classList.add('prompter-text-container');
  textContainer.appendChild(textElement);

  /**
   * The actions menu represented by the ellipsis character.
   * @type {HTMLDivElement}
   */
  var ellipsisElement = document.createElement('div');
  ellipsisElement.id = 'ellipsis' + randomString;
  ellipsisElement.classList.add('ellipsis');
  ellipsisElement.innerHTML = '...';

  /**
   * The tag element.
   * @type {HTMLDivElement}
   */
  var tagElement = document.createElement('div');
  tagElement.id = 'tag-icon' + randomString;
  tagElement.classList.add('tag-icon');
  tagElement.innerHTML = '&#182;';

  /**
   * The candidates element that contains the candidates for a word.
   * @type {HTMLDivElement}
   */
  var candidatesElement = document.createElement('div');
  candidatesElement.id = 'candidates' + randomString;
  candidatesElement.classList.add('candidates');

  /**
   * The menu element that contains the actions.
   * @type {HTMLDivElement}
   */
  var menuElement = document.createElement('div');
  menuElement.id = 'more-menu' + randomString;
  menuElement.classList.add('more-menu');

  /**
   * The convert button from actions menu.
   * @type {HTMLButtonElement}
   */
  var convertElement = document.createElement('button');
  convertElement.classList.add('options-label-button');
  convertElement.id = 'convert' + randomString;
  convertElement.innerHTML = 'Convert';

  /**
   * The copy button from actions menu.
   * @type {HTMLButtonElement}
   */
  var copyElement = document.createElement('button');
  copyElement.classList.add('options-label-button');
  copyElement.id = 'copy' + randomString;
  copyElement.innerHTML = 'Copy';

  /**
   * The delete button from actions menu.
   * @type {HTMLButtonElement}
   */
  var deleteElement = document.createElement('button');
  deleteElement.classList.add('options-label-button');
  deleteElement.id = 'delete' + randomString;
  deleteElement.innerHTML = 'Delete';

  return {
    smartGuideElement: smartGuideElement,
    textElement: textElement,
    textContainer: textContainer,
    candidatesElement: candidatesElement,
    menuElement: menuElement,
    tagElement: tagElement,
    ellipsisElement: ellipsisElement,
    convertElement: convertElement,
    copyElement: copyElement,
    deleteElement: deleteElement
  };
}

/**
 * Check if node is in shadow dom
 * @param {Node} node - A node element.
 * @returns {boolean} true if is in shadow dom, false otherwise.
 */
function isInShadow(node) {
  var parent = node && node.parentNode;
  while (parent) {
    if (parent.toString() === '[object ShadowRoot]') {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}

/**
 * Show the actions of the action menu.
 * @param {Event} evt - Event used to insert the option div using the event's target.
 * @param {Object} elements - All the elements of the smart guide.
 * @param {SmartGuide} smartGuide
 */
function showActions(evt, elements) {
  var elementsRef = elements;

  var insertActions = function insertActions() {
    elementsRef.menuElement.appendChild(elementsRef.convertElement);
    elementsRef.menuElement.appendChild(elementsRef.copyElement);
    elementsRef.menuElement.appendChild(elementsRef.deleteElement);

    var parent = evt.target.parentNode;
    parent.insertBefore(elementsRef.menuElement, evt.target);
  };

  var positionActions = function positionActions() {
    // 48 to get the boundary of smart guide element.
    var left = evt.target.offsetLeft - 68;
    elementsRef.menuElement.style.left = left + 'px';
  };

  var isMenuInDocument = document.contains(elementsRef.menuElement);
  if (!isInShadow(elementsRef.menuElement) && !isMenuInDocument) {
    elementsRef.menuElement.style.display = 'flex';
    positionActions();
    insertActions();
  } else if (elementsRef.menuElement.style.display === 'none') {
    positionActions();
    elementsRef.menuElement.style.display = 'flex';
  }
}

/**
 * Show the candidates of the clicked word.
 * @param {Event} evt - Event used to determine the clicked word.
 * @param {Editor} editor - A reference to the editor.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
function showCandidates(evt, editor, smartGuide) {
  var smartGuideRef = smartGuide;
  var elementsRef = smartGuide.elements;

  if (evt.target.id !== 'prompter-text' + smartGuide.randomString) {
    var id = evt.target.id.replace('word-', '').replace(smartGuide.randomString, '');
    var words = JSON.parse(editor.exports[Constants.Exports.JIIX]).words;
    smartGuideRef.wordToChange = words[id];
    smartGuideRef.wordToChange.id = id;
    elementsRef.candidatesElement.innerHTML = '';
    if (smartGuideRef.wordToChange && smartGuideRef.wordToChange.candidates) {
      elementsRef.candidatesElement.style.display = 'flex';
      smartGuideRef.wordToChange.candidates.forEach(function (word, index) {
        if (smartGuideRef.wordToChange.label === word) {
          elementsRef.candidatesElement.innerHTML += '<span id="cdt-' + index + smartGuide.randomString + '" class="selected-word">' + word + '</span>';
        } else {
          elementsRef.candidatesElement.innerHTML += '<span id="cdt-' + index + smartGuide.randomString + '">' + word + '</span>';
        }
      });
      // get the parent parent of word to insert just before smart guide, 48 to get the boundary of smart guide element.
      var top = 48;
      var left = evt.target.getBoundingClientRect().left - 60;
      elementsRef.candidatesElement.style.top = top + 'px';
      elementsRef.candidatesElement.style.left = left + 'px';

      var parent = evt.target.parentNode.parentNode.parentNode;
      parent.insertBefore(elementsRef.candidatesElement, evt.target.parentNode.parentNode);
    }
  }
}

/**
 * Call the import_ function of the editor to import the modified Jiix with the new label.
 * @param {Event} evt - Event to determine the clicked candidate.
 * @param {Editor} editor - A reference to the editor.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
function clickCandidate(evt, editor, smartGuide) {
  var smartGuideRef = smartGuide;
  var elementsRef = smartGuide.elements;
  var candidate = evt.target.innerText;

  if (candidate !== smartGuideRef.wordToChange.label && smartGuideRef.wordToChange.candidates.includes(candidate)) {
    var jiixToImport = JSON.parse(editor.exports[Constants.Exports.JIIX]);
    jiixToImport.words[smartGuideRef.wordToChange.id].label = candidate;
    // eslint-disable-next-line no-underscore-dangle
    editor.import_(JSON.stringify(jiixToImport), Constants.Exports.JIIX);
  }
  elementsRef.candidatesElement.style.display = 'none';
}

/**
 * Add the listeners to the smart guide elements.
 * @param {Editor} editor - A reference to the editor.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
function addListeners(editor, smartGuide) {
  var elementsRef = smartGuide.elements;

  elementsRef.textElement.addEventListener('click', function (evt) {
    return showCandidates(evt, editor, smartGuide);
  });
  elementsRef.candidatesElement.addEventListener('click', function (evt) {
    return clickCandidate(evt, editor, smartGuide);
  });
  elementsRef.ellipsisElement.addEventListener('click', function (evt) {
    return showActions(evt, elementsRef);
  });
  elementsRef.copyElement.addEventListener('click', function () {
    elementsRef.menuElement.style.display = 'none';
  });
  elementsRef.convertElement.addEventListener('click', function () {
    elementsRef.menuElement.style.display = 'none';
    editor.convert();
  });
  elementsRef.deleteElement.addEventListener('click', function () {
    elementsRef.menuElement.style.display = 'none';
    editor.clear();
  });
}

/**
 * Call mutation observer to trigger fade out animation.
 * @param {number} [duration=10000] - the duration in milliseconds before calling the fade out animation.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
function callFadeOutObserver() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
  var smartGuide = arguments[1];

  var smartGuideRef = smartGuide;
  var elementsRef = smartGuide.elements;
  // eslint-disable-next-line no-undef
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      if (smartGuideRef.smartGuideTimeOutId) {
        clearTimeout(smartGuideRef.smartGuideTimeOutId);
      }
      if (elementsRef.candidatesElement.style.display === 'none' && elementsRef.menuElement.style.display === 'none') {
        smartGuideRef.smartGuideTimeOutId = setTimeout(function () {
          elementsRef.smartGuideElement.classList.add('smartguide-out');
          elementsRef.smartGuideElement.classList.remove('smartguide-in');
        }, duration);
      } else if (!document.contains(elementsRef.candidatesElement) && !document.contains(elementsRef.menuElement)) {
        smartGuideRef.smartGuideTimeOutId = setTimeout(function () {
          elementsRef.smartGuideElement.classList.add('smartguide-out');
          elementsRef.smartGuideElement.classList.remove('smartguide-in');
        }, duration);
      }
    });
  });
  observer.observe(elementsRef.smartGuideElement, { childList: true, subtree: true, attributes: true });
}

/**
 * Create a new smart guide
 * @param {Editor} editor - A reference to the editor.
 * @returns {SmartGuide} New smart guide
 */
function createSmartGuide(editor) {
  var randomString = '-' + Math.random().toString(10).substring(2, 12);
  var elements = createHTMLElements(randomString);

  /**
   * Clipboard from clipboard.js used to get copy across all browsers.
   * @type {Clipboard}
   */
  var clipboard$$1 = new Clipboard(elements.copyElement);
  var perfectScrollbar = new PerfectScrollbar(elements.textContainer, { suppressScrollY: true, scrollXMarginOffset: 1 });

  var smartGuide = {
    editor: editor,
    wordToChange: '',
    lastWord: '',
    previousLabelExport: ' ',
    perfectScrollbar: perfectScrollbar,
    elements: elements,
    smartGuideTimeOutId: 0,
    randomString: randomString
  };
  addListeners(editor, smartGuide);

  if (editor.configuration.recognitionParams.v4.text.smartGuideFadeOut.enable) {
    callFadeOutObserver(editor.configuration.recognitionParams.v4.text.smartGuideFadeOut.duration, smartGuide);
  }

  return smartGuide;
}

function resize$3(smartGuide) {
  var smartGuideRef = smartGuide;
  var elementsRef = smartGuide.elements;

  var mmToPixels = 3.779527559;
  var left = smartGuideRef.editor.configuration.recognitionParams.v4.text.margin.left * mmToPixels;

  var maxWidthTextContainer = smartGuideRef.editor.domElement.clientWidth - left - elementsRef.tagElement.offsetWidth - 35 - left;

  // Assign a max width to the smartguide based on the editor width, the left position and a small margin for the ellipsis (48px)
  elementsRef.textContainer.style.width = maxWidthTextContainer + 'px';
  elementsRef.textContainer.style.maxWidth = maxWidthTextContainer + 'px';

  left = elementsRef.tagElement.offsetWidth;
  left += maxWidthTextContainer;
  elementsRef.ellipsisElement.style.left = left + 'px';

  elementsRef.smartGuideElement.style.width = elementsRef.tagElement.offsetWidth + elementsRef.textContainer.offsetWidth + elementsRef.ellipsisElement.offsetWidth + 'px';
  smartGuideRef.perfectScrollbar.update();
}

/**
 * Insert the smart guide HTML elements in the DOM.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 */
function insertSmartGuide(smartGuide) {
  var smartGuideRef = smartGuide;
  var elementsRef = smartGuide.elements;

  var insertSmartGuideElement = function insertSmartGuideElement(left, top) {
    elementsRef.smartGuideElement.style.top = top + 'px';
    elementsRef.smartGuideElement.style.left = left + 'px';
    elementsRef.smartGuideElement.style.visibility = 'hidden';

    var parent = smartGuideRef.editor.domElement;
    parent.insertBefore(elementsRef.smartGuideElement, smartGuideRef.editor.loader);
  };
  var insertTag = function insertTag() {
    elementsRef.smartGuideElement.appendChild(elementsRef.tagElement);
  };
  var insertTextContainer = function insertTextContainer(left, maxWidth) {
    elementsRef.textContainer.style.left = left + 'px';

    // Assign a max width to the smartguide based on the editor width, the left position and a small margin for the ellipsis (48px)
    elementsRef.textContainer.style.width = maxWidth + 'px';
    elementsRef.textContainer.style.maxWidth = maxWidth + 'px';

    elementsRef.smartGuideElement.appendChild(elementsRef.textContainer);
  };
  var insertEllipsis = function insertEllipsis(left) {
    elementsRef.ellipsisElement.style.left = left + 'px';

    elementsRef.smartGuideElement.appendChild(elementsRef.ellipsisElement);
  };

  // FIXME Use value from contentChanged when available

  var mmToPixels = 3.779527559;

  var marginTop = smartGuideRef.editor.configuration.recognitionParams.v4.text.margin.top * mmToPixels;
  var marginLeft = smartGuideRef.editor.configuration.recognitionParams.v4.text.margin.left * mmToPixels;

  // 12 is the space between line in mm
  var top = marginTop - 12 * mmToPixels;
  var left = marginLeft;

  insertSmartGuideElement(left, top);
  insertTag();

  // 35 is the ellipsis element width
  var maxWidthTextContainer = smartGuideRef.editor.domElement.clientWidth - left - elementsRef.tagElement.offsetWidth - 35 - left;
  left = elementsRef.tagElement.offsetWidth;
  insertTextContainer(left, maxWidthTextContainer);

  left += maxWidthTextContainer;
  insertEllipsis(left);

  elementsRef.menuElement.style.display = 'none';
  elementsRef.menuElement.appendChild(elementsRef.convertElement);
  elementsRef.menuElement.appendChild(elementsRef.copyElement);
  elementsRef.menuElement.appendChild(elementsRef.deleteElement);
  elementsRef.smartGuideElement.appendChild(elementsRef.menuElement);

  elementsRef.candidatesElement.style.display = 'none';
  elementsRef.smartGuideElement.appendChild(elementsRef.candidatesElement);

  // 48px as set in css
  elementsRef.smartGuideElement.style.height = '48px';
  elementsRef.smartGuideElement.style.width = elementsRef.tagElement.offsetWidth + elementsRef.textContainer.offsetWidth + elementsRef.ellipsisElement.offsetWidth + 'px';
  smartGuideRef.perfectScrollbar.update();
}

/**
 * Launch the smartguide.
 * @param {SmartGuide} smartGuide - A reference to the smart guide.
 * @param {Object} exports -  The export from the editor.
 */
function launchSmartGuide(smartGuide, exports) {
  var smartGuideRef = smartGuide;
  var elementsRef = smartGuide.elements;

  var isSmartGuideInDocument = document.contains(elementsRef.smartGuideElement);

  if (!isInShadow(elementsRef.smartGuideElement) && !isSmartGuideInDocument) {
    insertSmartGuide(smartGuide);
  }

  var addAnimationToModifiedWord = function addAnimationToModifiedWord(words) {
    if (smartGuideRef.tempWords && smartGuideRef.tempWords.length === words.length) {
      var labelWordsArray = words.map(function (word) {
        return word.label;
      });
      var tempLabelWordsArray = smartGuideRef.tempWords.map(function (word) {
        return word.label;
      });
      var wordChangedId = labelWordsArray.indexOf(labelWordsArray.filter(function (a) {
        return tempLabelWordsArray.indexOf(a) === -1;
      })[0]);
      if (document.getElementById('word-' + wordChangedId + smartGuide.randomString) && wordChangedId > -1) {
        document.getElementById('word-' + wordChangedId + smartGuide.randomString).classList.add('modified-word');
        elementsRef.textContainer.scrollLeft = document.getElementById('word-' + wordChangedId + smartGuide.randomString).offsetLeft - 10;
      }
    }
    smartGuideRef.tempWords = JSON.parse(exports[Constants.Exports.JIIX]).words;
  };

  var createWordSpan = function createWordSpan(empty, index, word) {
    var span = document.createElement('span');
    span.id = 'word-' + index + smartGuide.randomString;
    if (empty) {
      span.innerHTML = '&nbsp;';
    } else {
      span.textContent = word.label;
    }
    return span;
  };

  // Possible optimisation ? Check if we can find a way to not repopulate the smartguide every time even if we now use Document fragment
  var populatePrompter = function populatePrompter(words) {
    elementsRef.textElement.innerHTML = '';
    // We use a DocumentFragment to reflow the DOM only one time as it is not part of the DOM
    var myFragment = document.createDocumentFragment();
    words.forEach(function (word, index) {
      if (word.label === ' ' || word.label.includes('\n')) {
        myFragment.appendChild(createWordSpan(true, index));
      } else if (index !== words.length - 1) {
        myFragment.appendChild(createWordSpan(false, index, word));
      } else {
        elementsRef.textElement.appendChild(myFragment);
        smartGuideRef.perfectScrollbar.update();
        if (smartGuideRef.lastWord === '') {
          smartGuideRef.lastWord = word;
        }
        var span = createWordSpan(false, index, word);
        // This is used to scroll to last word if last word is modified
        if (smartGuideRef.lastWord.candidates !== word.candidates && smartGuideRef.lastWord.label !== word.label) {
          span.classList.add('added-word');
          elementsRef.textElement.appendChild(span);
          elementsRef.textContainer.scrollLeft = span.offsetLeft;
          smartGuideRef.lastWord = word;
        } else {
          elementsRef.textElement.appendChild(span);
          elementsRef.textContainer.scrollLeft = span.offsetLeft;
        }
      }
    });
  };

  if (exports && JSON.parse(exports[Constants.Exports.JIIX]).words.length > 0) {
    elementsRef.smartGuideElement.classList.add('smartguide-in');
    elementsRef.smartGuideElement.classList.remove('smartguide-out');
    elementsRef.candidatesElement.style.display = 'none';
    elementsRef.menuElement.style.display = 'none';
    if (smartGuideRef.previousLabelExport && smartGuideRef.previousLabelExport !== JSON.parse(exports[Constants.Exports.JIIX]).label) {
      var words = JSON.parse(exports[Constants.Exports.JIIX]).words;
      populatePrompter(words);
      addAnimationToModifiedWord(words);
    }
    smartGuideRef.previousLabelExport = JSON.parse(exports[Constants.Exports.JIIX]).label;
    // This is required by clipboard.js to get the text to be copied.
    elementsRef.copyElement.setAttribute('data-clipboard-text', JSON.parse(exports[Constants.Exports.JIIX]).label);
  } else {
    elementsRef.smartGuideElement.classList.add('smartguide-out');
    elementsRef.smartGuideElement.classList.remove('smartguide-in');
  }

  return smartGuideRef;
}

/* eslint-disable no-undef */

/**
 * Function to copy past to inject ink during tutorial.
 * @param editorParam
 * @param strokes
 * @param delayBetweenStrokes
 * @param lastOneDelay
 */
function inkImporter(editorParam, strokes, delayBetweenStrokes, lastOneDelay) {
  var editor = editorParam;
  editorLogger.debug('inkImporter start importing =>', strokes);
  var origGrabber = Object.assign({}, editor.behavior.grabber);
  origGrabber.detach = editor.behavior.grabber.detach;
  editor.behavior.grabber = {};
  var actions = [];
  strokes.forEach(function (stroke) {
    if (stroke.convert) {
      actions.push({ action: 'convert', value: true });
    } else if (stroke.setDelay) {
      actions.push({ action: 'setDelay', value: stroke.setDelay });
    } else {
      if (stroke.color) {
        actions.push({ action: 'setColor', value: stroke.color });
      }
      stroke.X.forEach(function (x, idx) {
        var action = 'move';
        if (idx === 0) {
          action = 'down';
        } else if (idx === stroke.X.length - 1) {
          action = 'up';
        }
        actions.push({ action: action, point: { x: stroke.X[idx], y: stroke.Y[idx] } });
      });
    }
  });
  editorLogger.debug('Array of actions =>', actions);
  var play = function play(actionsArray, position, delay) {
    if (position < actionsArray.length) {
      var currentAction = actionsArray[position];
      var nextDelay = delay;
      if (currentAction.action === 'convert') {
        editor.convert();
      } else if (currentAction.action === 'setDelay') {
        nextDelay = currentAction.value;
      } else if (currentAction.action === 'setColor') {
        editor.penStyle = {
          color: currentAction.value
        };
      } else {
        currentAction.point.t = new Date().getTime();
        if (currentAction.action === 'down') {
          editor.pointerDown(currentAction.point);
        } else if (currentAction.action === 'up') {
          editor.pointerUp(currentAction.point);
        } else if (currentAction.action === 'move') {
          editor.pointerMove(currentAction.point);
        }
      }if (lastOneDelay && position === actionsArray.map(function (x) {
        return x.action;
      }).lastIndexOf('down') - 1) {
        setTimeout(function () {
          play(actionsArray, position + 1, nextDelay);
        }, lastOneDelay);
      } else if (position === actionsArray.length - 1) {
        var event = new Event('drawEnded');
        document.dispatchEvent(event);
        editor.behavior.grabber = origGrabber;
      } else {
        setTimeout(function () {
          play(actionsArray, position + 1, nextDelay);
        }, nextDelay);
      }
    }
  };
  play(actions, 0, delayBetweenStrokes);
}

function importStrokeGroups(editorParam, strokeGroups) {
  strokeGroups.forEach(function (group) {
    group.strokes.forEach(function (strokeFromGroup) {
      addStroke(editorParam.model, strokeFromGroup);
      addStrokeToGroup(editorParam.model, strokeFromGroup, group.penStyle);
    });
  });
  editorParam.renderer.drawModel(editorParam.rendererContext, editorParam.model, editorParam.stroker);
}

var eastereggs = /*#__PURE__*/Object.freeze({
  inkImporter: inkImporter,
  importStrokeGroups: importStrokeGroups
});

/* eslint-disable no-underscore-dangle */

/**
 * Trigger callbacks
 * @param {Editor} editor
 * @param {Object} data
 * @param {...String} types
 * @return {Model}
 */
function triggerCallbacks(editor, data) {
  var editorRef = editor;

  for (var _len = arguments.length, types = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    types[_key - 2] = arguments[_key];
  }

  types.forEach(function (type) {
    switch (type) {
      case Constants.EventType.RENDERED:
        break; // Internal use only
      case Constants.EventType.UNDO:
      case Constants.EventType.REDO:
      case Constants.EventType.CLEAR:
      case Constants.EventType.CONVERT:
      case Constants.EventType.EXPORT:
        editor.callbacks.forEach(function (callback) {
          return callback.call(editor.domElement, type);
        });
        break;
      case Constants.EventType.LOADED:
      case Constants.EventType.CHANGED:
        editor.callbacks.forEach(function (callback) {
          return callback.call(editor.domElement, type, {
            initialized: editor.initialized,
            canUndo: editor.canUndo,
            canRedo: editor.canRedo,
            canClear: editor.canClear,
            isEmpty: editor.isEmpty,
            possibleUndoCount: editor.possibleUndoCount,
            undoStackIndex: editor.undoStackIndex,
            canConvert: editor.canConvert,
            canExport: editor.canExport
          });
        });
        break;
      case Constants.EventType.EXPORTED:
        window.clearTimeout(editorRef.notifyTimer);
        editorRef.notifyTimer = window.setTimeout(function () {
          editor.callbacks.forEach(function (callback) {
            return callback.call(editor.domElement, type, {
              exports: editor.exports
            });
          });
        }, editorRef.configuration.processDelay);
        break;
      case Constants.EventType.SUPPORTED_IMPORT_MIMETYPES:
        editor.callbacks.forEach(function (callback) {
          return callback.call(editor.domElement, type, {
            mimeTypes: editor.supportedImportMimeTypes
          });
        });
        break;
      case Constants.EventType.ERROR:
        editor.callbacks.forEach(function (callback) {
          return callback.call(editor.domElement, type, data);
        });
        break;
      case Constants.EventType.IDLE:
        editor.callbacks.forEach(function (callback) {
          return callback.call(editor.domElement, type, {
            idle: editor.idle
          });
        });
        break;
      default:
        editorLogger.debug('No valid trigger configured for ' + type);
        break;
    }
  });
}

/**
 * Check if a clear is required, and does it if it is
 * @param {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} resetFunc
 * @param {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} func
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function manageResetState(resetFunc, func, recognizerContext, model, callback) {
  for (var _len2 = arguments.length, params = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
    params[_key2 - 5] = arguments[_key2];
  }

  // If strokes moved in the undo redo stack then a clear is mandatory before sending strokes.
  if (resetFunc && isResetRequired(recognizerContext, model)) {
    editorLogger.debug('Reset is needed');
    resetFunc(recognizerContext, model, function (err, resetedModel) {
      for (var _len3 = arguments.length, types = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        types[_key3 - 2] = arguments[_key3];
      }

      if (err) {
        callback.apply(undefined, [err, resetedModel].concat(types));
      } else {
        func.apply(undefined, [recognizerContext, resetedModel, callback].concat(params));
      }
    });
  } else {
    func.apply(undefined, [recognizerContext, model, callback].concat(params));
  }
}

/**
 * Check if the trigger in parameter is valid.
 * @param {Editor} editor
 * @param {String} type
 * @param {String} [trigger]
 * @return {Boolean}
 */
function isTriggerValid(editor, type) {
  var trigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : editor.configuration.triggers[type];

  if (editor.recognizer && editor.recognizer.getInfo().availableTriggers[type].includes(trigger)) {
    return true;
  }
  editorLogger.error(trigger + ' is not a valid trigger for ' + type);
  return false;
}

/**
 * Manage recognized model
 * @param {Editor} editor
 * @param {Model} model
 * @param {...String} types
 */
function manageRecognizedModel(editor, model) {
  var editorRef = editor;
  var modelRef = model;

  for (var _len4 = arguments.length, types = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    types[_key4 - 2] = arguments[_key4];
  }

  editorLogger.debug('model changed callback on ' + types + ' event(s)', model);
  if (modelRef.creationTime === editor.model.creationTime) {
    // Merge recognized model if relevant and return current editor model
    if (modelRef.rawStrokes.length === editor.model.rawStrokes.length && modelRef.lastPositions.lastSentPosition >= editor.model.lastPositions.lastReceivedPosition) {
      editorRef.model = mergeModels(editorRef.model, modelRef);
      if (needRedraw(editorRef.model) || types.includes(Constants.EventType.RENDERED)) {
        editor.renderer.drawModel(editor.rendererContext, editorRef.model, editor.stroker);
      }
    } else {
      editorRef.model = modelRef;
      editor.renderer.drawModel(editor.rendererContext, editorRef.model, editor.stroker);
    }
    triggerCallbacks.apply(undefined, [editor, undefined].concat(types));
  }

  if (editor.configuration.recognitionParams.type === 'TEXT' && editor.configuration.recognitionParams.apiVersion === 'V4' && editor.configuration.recognitionParams.protocol !== 'REST' && editor.configuration.recognitionParams.v4.text.mimeTypes.includes(Constants.Exports.JIIX) && editor.configuration.recognitionParams.v4.text.smartGuide) {
    // eslint-disable-next-line no-use-before-define
    launchSmartGuide$1(editorRef, modelRef.exports);
  }

  if (extractPendingStrokes(model).length > 0 && !editor.recognizer.addStrokes && // FIXME: Ugly hack to avoid double export (addStrokes + export)
  editor.configuration.triggers.exportContent !== Constants.Trigger.DEMAND) {
    /* eslint-disable no-use-before-define */
    launchExport(editor, model);
    /* eslint-enable no-use-before-define */
  }
}

/**
 * Recognizer callback
 * @param {Editor} editor
 * @param {Object} error
 * @param {Model} model
 * @param {...String} events
 */
function recognizerCallback(editor, error, model) {
  for (var _len5 = arguments.length, events = Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    events[_key5 - 3] = arguments[_key5];
  }

  var editorRef = editor;

  var handleResult = function handleResult(err, res) {
    for (var _len6 = arguments.length, types = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
      types[_key6 - 2] = arguments[_key6];
    }

    if (err) {
      if (err.type !== 'close') {
        editorLogger.error('Error while firing the recognition', err.stack || err); // Handle any error from all above steps
      }
      if (
      // IInk error managment before refactor
      err.message === 'Invalid application key.' || err.message === 'Invalid HMAC' ||
      // CDK error managment
      err.error && err.error.result && err.error.result.error && (err.error.result.error === 'InvalidApplicationKeyException' || err.error.result.error === 'InvalidHMACSignatureException') ||
      // IInk error managment after refactor
      err.code && err.code === 'access.not.granted') {
        editorRef.error.innerText = Constants.Error.WRONG_CREDENTIALS;
      } else if (err.message === 'Session is too old. Max Session Duration Reached' || err.code && err.code === 'session.too.old') {
        editorRef.error.innerText = Constants.Error.TOO_OLD;
      } else if ((err.message || err.code === 1006) && editorRef.error.style.display === 'none') {
        editorRef.error.innerText = Constants.Error.NOT_REACHABLE;
      }
      if ((editorRef.error.innerText === Constants.Error.TOO_OLD || err.code === 1000 || err.reason === 'CLOSE_RECOGNIZER') && canReconnect(editor.recognizerContext)) {
        editorLogger.info('Reconnection is available', err.stack || err);
        editorRef.error.style.display = 'none';
      } else {
        editorRef.error.style.display = 'initial';
        triggerCallbacks.apply(undefined, [editor, err, Constants.EventType.ERROR].concat(types));
      }
    } else {
      manageRecognizedModel.apply(undefined, [editorRef, res].concat(toConsumableArray([].concat(events, types).filter(function (el, i, a) {
        return i === a.indexOf(el);
      })))); // Remove duplicate events
    }
  };

  editorLogger.debug('recognition callback');
  if (editor.undoRedoManager.updateModel && !error) {
    editor.undoRedoManager.updateModel(editor.undoRedoContext, model, handleResult);
  } else {
    handleResult.apply(undefined, [error, model].concat(events));
  }
}

/**
 * Launch the recognition with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 * @param {String} [trigger]
 */
function addStrokes$1(editor, model) {
  var trigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : editor.configuration.triggers.addStrokes;

  if (editor.recognizer && editor.recognizer.addStrokes) {
    editor.recognizerContext.initPromise.then(function () {
      // Firing addStrokes only if recognizer is configure to do it
      if (isTriggerValid(editor, 'addStrokes', trigger)) {
        manageResetState(editor.recognizer.reset, editor.recognizer.addStrokes, editor.recognizerContext, model, function (err, res) {
          for (var _len7 = arguments.length, types = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
            types[_key7 - 2] = arguments[_key7];
          }

          recognizerCallback.apply(undefined, [editor, err, res].concat(types));
        });
      }
    });
  }
}

/**
 * Launch smartguide.
 * @param {Editor} editor
 * @param {Object} exports
 */
function launchSmartGuide$1(editor, exports) {
  var editorRef = editor;
  editorRef.smartGuide = launchSmartGuide(editor.smartGuide, exports);
}

/**
 * Launch ink import.
 * @param {Editor} editor
 * @param {Model} model
 * @param {PointerEvents} events
 */
function launchPointerEvents(editor, model, events) {
  if (editor.recognizer && editor.recognizer.pointerEvents) {
    editor.recognizerContext.initPromise.then(function () {
      editor.recognizer.pointerEvents(editor.recognizerContext, model, events, function (err, res) {
        for (var _len8 = arguments.length, types = Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
          types[_key8 - 2] = arguments[_key8];
        }

        recognizerCallback.apply(undefined, [editor, err, res].concat(types));
      });
    });
  }
}

/**
 * Launch the recognition with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 * @param {String} [requestedMimeTypes]
 * @param {String} [trigger]
 */
function launchExport(editor, model, requestedMimeTypes) {
  var trigger = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : editor.configuration.triggers.exportContent;

  if (editor.recognizer && editor.recognizer.export_) {
    editor.recognizerContext.initPromise.then(function () {
      // Firing export only if recognizer is configure to do it
      if (isTriggerValid(editor, 'exportContent', trigger)) {
        var editorRef = editor;
        window.clearTimeout(editor.exportTimer);
        editorRef.exportTimer = window.setTimeout(function () {
          manageResetState(editor.recognizer.reset, editor.recognizer.export_, editor.recognizerContext, model, function (err, res) {
            for (var _len9 = arguments.length, types = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
              types[_key9 - 2] = arguments[_key9];
            }

            recognizerCallback.apply(undefined, [editor, err, res].concat(types));
          }, requestedMimeTypes);
        }, trigger === Constants.Trigger.QUIET_PERIOD ? editor.configuration.triggerDelay : 0);
      }
    });
  }
}

/**
 * Launch the import.
 * @param {Editor} editor
 * @param {Model} model
 * @param {Blob} data
 */
function launchImport(editor, model, data) {
  if (editor.recognizer && editor.recognizer.import_) {
    editor.recognizerContext.initPromise.then(function () {
      editor.recognizer.import_(editor.recognizerContext, model, data, function (err, res) {
        for (var _len10 = arguments.length, types = Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
          types[_key10 - 2] = arguments[_key10];
        }

        recognizerCallback.apply(undefined, [editor, err, res].concat(types));
      });
    });
  }
}

function launchGetSupportedImportMimeTypes(editor, model) {
  if (editor.recognizer && editor.recognizer.getSupportedImportMimeTypes) {
    editor.recognizerContext.initPromise.then(function () {
      editor.recognizer.getSupportedImportMimeTypes(editor.recognizerContext, model, function (err, res) {
        for (var _len11 = arguments.length, types = Array(_len11 > 2 ? _len11 - 2 : 0), _key11 = 2; _key11 < _len11; _key11++) {
          types[_key11 - 2] = arguments[_key11];
        }

        recognizerCallback.apply(undefined, [editor, err, res].concat(types));
      });
    });
  }
}

/**
 * Launch the convert with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 * @param {String} conversionState
 */
function launchConvert(editor, model, conversionState) {
  if (editor.recognizer && editor.recognizer.convert) {
    editor.recognizerContext.initPromise.then(function () {
      editor.recognizer.convert(editor.recognizerContext, model, function (err, res) {
        for (var _len12 = arguments.length, types = Array(_len12 > 2 ? _len12 - 2 : 0), _key12 = 2; _key12 < _len12; _key12++) {
          types[_key12 - 2] = arguments[_key12];
        }

        recognizerCallback.apply(undefined, [editor, err, res].concat(types));
      }, conversionState);
    });
  }
}

function launchConfig(editor, model) {
  if (editor.recognizer && editor.recognizer.sendConfiguration) {
    editor.recognizerContext.initPromise.then(function () {
      editor.recognizer.sendConfiguration(editor.recognizerContext, model, function (err, res) {
        for (var _len13 = arguments.length, types = Array(_len13 > 2 ? _len13 - 2 : 0), _key13 = 2; _key13 < _len13; _key13++) {
          types[_key13 - 2] = arguments[_key13];
        }

        recognizerCallback.apply(undefined, [editor, err, res].concat(types));
      });
    });
  }
}

/**
 * Launch the resize.
 * @param {Editor} editor
 * @param {Model} model
 */
function launchResize(editor, model) {
  if (editor.recognizer && editor.recognizer.resize) {
    editor.recognizerContext.initPromise.then(function () {
      var editorRef = editor;
      window.clearTimeout(editor.resizeTimer);
      editorRef.resizeTimer = window.setTimeout(function () {
        editor.recognizer.resize(editor.recognizerContext, model, function (err, res) {
          for (var _len14 = arguments.length, types = Array(_len14 > 2 ? _len14 - 2 : 0), _key14 = 2; _key14 < _len14; _key14++) {
            types[_key14 - 2] = arguments[_key14];
          }

          recognizerCallback.apply(undefined, [editor, err, res].concat(types));
        }, editor.domElement);
      }, editor.configuration.resizeTriggerDelay);
    });
    resize$3(editor.smartGuide);
  }
}

/**
 * Launch wait for idle
 * @param {Editor} editor
 * @param {Model} model
 */
function launchWaitForIdle(editor, model) {
  if (editor.recognizer && editor.recognizer.waitForIdle) {
    editor.recognizerContext.initPromise.then(function () {
      editor.recognizer.waitForIdle(editor.recognizerContext, model, function (err, res) {
        for (var _len15 = arguments.length, types = Array(_len15 > 2 ? _len15 - 2 : 0), _key15 = 2; _key15 < _len15; _key15++) {
          types[_key15 - 2] = arguments[_key15];
        }

        recognizerCallback.apply(undefined, [editor, err, res].concat(types));
      });
    });
  }
}

/**
 * Set pen style.
 * @param {Editor} editor
 * @param {Model} model
 */
function setPenStyle$1(editor, model) {
  if (editor.recognizer && editor.recognizer.setPenStyle) {
    editor.recognizerContext.initPromise.then(function () {
      editor.recognizer.setPenStyle(editor.recognizerContext, model, editor.penStyle, function (err, res) {
        for (var _len16 = arguments.length, types = Array(_len16 > 2 ? _len16 - 2 : 0), _key16 = 2; _key16 < _len16; _key16++) {
          types[_key16 - 2] = arguments[_key16];
        }

        recognizerCallback.apply(undefined, [editor, err, res].concat(types));
      });
    });
  }
}

/**
 * Set pen style.
 * @param {Editor} editor
 * @param {Model} model
 */
function setPenStyleClasses$1(editor, model) {
  if (editor.recognizer && editor.recognizer.setPenStyleClasses) {
    editor.recognizerContext.initPromise.then(function () {
      editor.recognizer.setPenStyleClasses(editor.recognizerContext, model, editor.penStyleClasses, function (err, res) {
        for (var _len17 = arguments.length, types = Array(_len17 > 2 ? _len17 - 2 : 0), _key17 = 2; _key17 < _len17; _key17++) {
          types[_key17 - 2] = arguments[_key17];
        }

        recognizerCallback.apply(undefined, [editor, err, res].concat(types));
      });
    });
  }
}

/**
 * Set theme.
 * @param {Editor} editor
 * @param {Model} model
 */
function setTheme$1(editor, model) {
  if (editor.recognizer && editor.recognizer.setTheme) {
    editor.recognizerContext.initPromise.then(function () {
      editor.recognizer.setTheme(editor.recognizerContext, model, editor.theme, function (err, res) {
        for (var _len18 = arguments.length, types = Array(_len18 > 2 ? _len18 - 2 : 0), _key18 = 2; _key18 < _len18; _key18++) {
          types[_key18 - 2] = arguments[_key18];
        }

        recognizerCallback.apply(undefined, [editor, err, res].concat(types));
      });
    });
  }
}

/**
 * Editor
 */
var Editor = function () {
  /**
   * @param {Element} element DOM element to attach this editor
   * @param {Configuration} [configuration] Configuration to apply
   * @param {Theme} [theme] Custom theme to apply
   * @param {PenStyle} [penStyle] Custom style to apply
   * @param {Behaviors} [behaviors] Custom behaviors to apply
   */
  function Editor(element, configuration, penStyle, theme, behaviors) {
    classCallCheck(this, Editor);

    /**
     * Inner reference to the DOM Element
     * @type {Element}
     */
    this.domElement = element;
    this.domElement.classList.add('ms-editor');

    // eslint-disable-next-line no-undef
    this.loader = document.createElement('div');
    this.loader.classList.add('loader');
    this.loader = this.domElement.appendChild(this.loader);

    // eslint-disable-next-line no-undef
    this.error = document.createElement('div');
    this.error.classList.add('error-msg');
    this.error = this.domElement.appendChild(this.error);

    /**
     * Launch export timer
     * @type {Number}
     */
    this.exportTimer = undefined;

    /**
     * Launch resize timer
     * @type {Number}
     */
    this.resizeTimer = undefined;

    /**
     * Notify delay timer
     * @type {Number}
     */
    this.notifyTimer = undefined;

    /**
     * @private
     * @type {Behaviors}
     */
    this.innerBehaviors = overrideDefaultBehaviors(behaviors);
    this.configuration = configuration;
    this.smartGuide = createSmartGuide(this);

    /**
     * Pen color used only for pending stroke
     * @type {string}
     */
    this.localTheme = '';

    this.theme = theme;
    this.penStyle = penStyle;
    this.penStyleClasses = '';

    this.domElement.editor = this;
  }

  /**
   * Set the recognition parameters
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param {Configuration} configuration
   */


  createClass(Editor, [{
    key: 'getStats',


    /**
     * Get statistics to monitor what ink size is send to the server.
     * @return {Stats}
     */
    value: function getStats() {
      return computeStats(this.model);
    }

    /**
     * True if initialized, false otherwise
     * @return {Boolean}
     */

  }, {
    key: 'pointerDown',


    /**
     * Handle a pointer down
     * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
     * @param {String} [pointerType=mouse] Current pointer type
     * @param {String} [pointerId] Current pointer id
     */
    value: function pointerDown(point) {
      var pointerType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pen';
      var pointerId = arguments[2];

      editorLogger.trace('Pointer down', point);
      window.clearTimeout(this.notifyTimer);
      window.clearTimeout(this.exportTimer);
      this.model = initPendingStroke(this.model, point, Object.assign({ pointerType: pointerType, pointerId: pointerId }, this.theme.ink, this.localPenStyle));
      this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
      // Currently no recognition on pointer down
    }

    /**
     * Handle a pointer move
     * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
     */

  }, {
    key: 'pointerMove',
    value: function pointerMove(point) {
      editorLogger.trace('Pointer move', point);
      this.model = appendToPendingStroke(this.model, point);
      this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
      // Currently no recognition on pointer move
    }

    /**
     * Handle a pointer up
     * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
     */

  }, {
    key: 'pointerUp',
    value: function pointerUp(point) {
      editorLogger.trace('Pointer up', point);
      this.model = endPendingStroke(this.model, point, this.penStyle);
      this.renderer.drawModel(this.rendererContext, this.model, this.stroker);

      if (this.recognizer.addStrokes) {
        addStrokes$1(this, this.model);
      } else {
        // Push model in undo redo manager
        recognizerCallback(this, undefined, this.model);
      }
    }
  }, {
    key: 'removeStroke',
    value: function removeStroke(stroke) {
      this.model.strokeGroups.forEach(function (group) {
        var stringStrokes = group.strokes.map(function (strokeFromGroup) {
          return JSON.stringify(strokeFromGroup);
        });
        var strokeIndex = stringStrokes.indexOf(JSON.stringify(stroke));
        if (strokeIndex !== -1) {
          group.strokes.splice(strokeIndex, 1);
        }
      });
      var stringRawStrokes = this.model.rawStrokes.map(function (strokes) {
        return JSON.stringify(strokes);
      });
      var strokeIndex = stringRawStrokes.indexOf(JSON.stringify(stroke));
      if (strokeIndex !== -1) {
        this.model.rawStrokes.splice(strokeIndex, 1);
      }
      this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
      recognizerCallback(this, undefined, this.model);
      if (!(this.configuration.triggers.exportContent === 'DEMAND')) {
        launchExport(this, this.model);
      }
    }

    /**
     * @Deprecated
     * @param rawStrokes
     * @param strokeGroups
     */

  }, {
    key: 'reDraw',
    value: function reDraw(rawStrokes, strokeGroups) {
      var _this = this;

      rawStrokes.forEach(function (stroke) {
        addStroke(_this.model, stroke);
      });
      strokeGroups.forEach(function (group) {
        group.strokes.forEach(function (strokeFromGroup) {
          addStrokeToGroup(_this.model, strokeFromGroup, group.penStyle);
        });
      });
      this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
      recognizerCallback(this, undefined, this.model);
    }

    /**
     * True if idle state
     * @return {Boolean}
     */

  }, {
    key: 'waitForIdle',


    /**
     * Wait for idle state.
     */
    value: function waitForIdle() {
      triggerCallbacks(this, undefined, Constants.EventType.IDLE);
      launchWaitForIdle(this, this.model);
    }

    /**
     * True if can undo, false otherwise.
     * @return {Boolean}
     */

  }, {
    key: 'undo',


    /**
     * Undo the last action.
     */
    value: function undo() {
      var _this2 = this;

      editorLogger.debug('Undo current model', this.model);
      triggerCallbacks(this, undefined, Constants.EventType.UNDO);
      this.undoRedoManager.undo(this.undoRedoContext, this.model, function (err, res) {
        for (var _len19 = arguments.length, types = Array(_len19 > 2 ? _len19 - 2 : 0), _key19 = 2; _key19 < _len19; _key19++) {
          types[_key19 - 2] = arguments[_key19];
        }

        manageRecognizedModel.apply(undefined, [_this2, res].concat(types));
      });
    }

    /**
     * True if can redo, false otherwise.
     * @return {Boolean}
     */

  }, {
    key: 'redo',


    /**
     * Redo the last action.
     */
    value: function redo() {
      var _this3 = this;

      editorLogger.debug('Redo current model', this.model);
      triggerCallbacks(this, undefined, Constants.EventType.REDO);
      this.undoRedoManager.redo(this.undoRedoContext, this.model, function (err, res) {
        for (var _len20 = arguments.length, types = Array(_len20 > 2 ? _len20 - 2 : 0), _key20 = 2; _key20 < _len20; _key20++) {
          types[_key20 - 2] = arguments[_key20];
        }

        manageRecognizedModel.apply(undefined, [_this3, res].concat(types));
      });
    }

    /**
     * True if empty, false otherwise
     * @returns {boolean}
     */

  }, {
    key: 'clear',


    /**
     * Clear the output and the recognition result.
     */
    value: function clear() {
      var _this4 = this;

      editorLogger.debug('Clear current model', this.model);
      triggerCallbacks(this, undefined, Constants.EventType.CLEAR);
      this.recognizer.clear(this.recognizerContext, this.model, function (err, res) {
        for (var _len21 = arguments.length, types = Array(_len21 > 2 ? _len21 - 2 : 0), _key21 = 2; _key21 < _len21; _key21++) {
          types[_key21 - 2] = arguments[_key21];
        }

        recognizerCallback.apply(undefined, [_this4, err, res].concat(types));
      });
    }

    /**
     * True if can convert, false otherwise.
     * @return {Boolean}
     */

  }, {
    key: 'convert',


    /**
     * Convert the current content
     */
    value: function convert() {
      var conversionState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'DIGITAL_EDIT';

      if (this.canConvert) {
        triggerCallbacks(this, undefined, Constants.EventType.CONVERT);
        launchConvert(this, this.model, conversionState);
      }
    }

    /**
     * Set the guides for text
     * @param {Boolean} [enable]
     */

  }, {
    key: 'setGuides',
    value: function setGuides() {
      var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.configuration.recognitionParams.v4.text.guides.enable = enable;
      launchConfig(this, this.model);
    }

    /**
     * Return the position of the cursor identifying the current state in the internal iink undo/redo stack.
     * @returns {Number}
     */

  }, {
    key: 'export_',


    /**
     * Explicitly ask to perform an export. You have to listen to events to get the content as this function is non blocking and does not have a return type.
     * @param {Array<String>} requestedMimeTypes Requested mime-types. Be sure to ask all the types required by the listeners of exported event.
     */
    value: function export_(requestedMimeTypes) {
      if (this.canExport) {
        triggerCallbacks(this, undefined, Constants.EventType.EXPORT);
        launchExport(this, this.model, requestedMimeTypes, Constants.Trigger.DEMAND);
      }
    }

    /**
     * Import content.
     * @param {Blob|*} data Data to import
     * @param {String} [mimetype] Mimetype of the data, needed if data is not a Blob
     */

  }, {
    key: 'import_',
    value: function import_(data, mimetype) {
      triggerCallbacks(this, undefined, Constants.EventType.IMPORT);
      launchImport(this, this.model, !(data instanceof Blob) ? new Blob([data], { type: mimetype }) : data);
    }

    /**
     * Get supported import mime types
     */

  }, {
    key: 'getSupportedImportMimeTypes',
    value: function getSupportedImportMimeTypes() {
      launchGetSupportedImportMimeTypes(this, this.model);
    }

    /**
     * pointer events
     * @param {PointerEvents} events
     */

  }, {
    key: 'pointerEvents',
    value: function pointerEvents(events) {
      launchPointerEvents(this, this.model, events);
    }

    /**
     * Get current state exports
     * @return {Object}
     */

  }, {
    key: 'resize',


    /**
     * Function to call when the dom element link to the current ink paper has been resize.
     */
    value: function resize() {
      editorLogger.debug('Resizing editor');
      this.renderer.resize(this.rendererContext, this.model, this.stroker, this.configuration.renderingParams.minHeight, this.configuration.renderingParams.minWidth);
      launchResize(this, this.model);
    }

    /**
     * Set the theme (font family, font size and line height) depending on the language
     * @param lang
     */

  }, {
    key: 'setThemeForFont',
    value: function setThemeForFont(lang) {
      var defaultLang = !Object.keys(Constants.Languages).includes(lang);
      var armenian = lang === 'hy_AM';
      var fontFamily = defaultLang || armenian ? Constants.Languages.default : Constants.Languages[lang];
      var lineHeight = defaultLang || armenian ? '1.2' : '1.8';
      this.theme = {
        '.text': {
          'font-family': fontFamily,
          'line-height': lineHeight
        }
      };
    }

    /**
     * Detach event listeners from the DOM element created at editor creation.
     */

  }, {
    key: 'unload',
    value: function unload() {
      if (this.grabber) {
        // Remove event handlers to avoid multiplication (detach grabber)
        this.grabber.detach(this.domElement, this.grabberContext);
      }
      if (this.innerRenderer) {
        this.innerRenderer.detach(this.domElement, this.rendererContext);
      }
    }

    /**
     * Trigger the change callbacks (and by default send a change event).
     */

  }, {
    key: 'forceChange',
    value: function forceChange() {
      triggerCallbacks(this, undefined, Constants.EventType.CHANGED);
    }

    /* eslint-disable class-methods-use-this */
    /**
     * Get access to some easter egg features link ink injection. Use at your own risk (less tested and may be removed without notice).
     */

  }, {
    key: 'configuration',
    set: function set$$1(configuration) {
      this.loader.style.display = 'initial';
      this.error.style.display = 'none';
      /**
       * @private
       * @type {Configuration}
       */
      this.innerConfiguration = overrideDefaultConfiguration(configuration);
      this.setThemeForFont(this.innerConfiguration.recognitionParams.v4.lang);
      this.behavior = this.behaviors.getBehaviorFromConfiguration(this.behaviors, this.innerConfiguration);
    }

    /**
     * Get the current recognition parameters
     * @return {Configuration}
     */
    ,
    get: function get$$1() {
      return this.innerConfiguration;
    }

    /**
     * Set the pen style
     * @param {PenStyle} penStyle
     */

  }, {
    key: 'penStyle',
    set: function set$$1(penStyle) {
      /**
       * @private
       * @type {PenStyle}
       */
      this.innerPenStyle = overrideDefaultPenStyle(penStyle);
      this.localPenStyle = this.innerPenStyle;
      setPenStyle$1(this, this.model);
    }

    /**
     * Get the pen style
     * @return {PenStyle}
     */
    ,
    get: function get$$1() {
      return this.innerPenStyle;
    }

    /**
     * Set the pen style
     * @param {String} penStyleClasses
     */

  }, {
    key: 'penStyleClasses',
    set: function set$$1(penStyleClasses) {
      /**
       * @private
       * @type {String}
       */
      this.innerPenStyleClasses = penStyleClasses;
      this.localPenStyle = this.theme['.' + this.innerPenStyleClasses];
      setPenStyleClasses$1(this, this.model);
    }

    /**
     * Get the pen style
     * @return {String}
     */
    ,
    get: function get$$1() {
      return this.innerPenStyleClasses;
    }

    /**
     * Set the theme
     * @param {Theme} theme
     */

  }, {
    key: 'theme',
    set: function set$$1(theme) {
      /**
       * @private
       * @type {Theme}
       */
      this.innerTheme = overrideDefaultTheme(theme);
      setTheme$1(this, this.model);
    }

    /**
     * Get the theme
     * @return {Theme}
     */
    ,
    get: function get$$1() {
      return this.innerTheme;
    }

    /**
     * Get behaviors
     * @return {Behaviors}
     */

  }, {
    key: 'behaviors',
    get: function get$$1() {
      return this.innerBehaviors;
    }

    /**
     * @private
     * @param {Behavior} behavior
     */

  }, {
    key: 'behavior',
    set: function set$$1(behavior) {
      if (behavior) {
        if (this.grabber) {
          // Remove event handlers to avoid multiplication (detach grabber)
          this.grabber.detach(this.domElement, this.grabberContext);
        }
        /**
         * @private
         * @type {Behavior}
         */
        this.innerBehavior = behavior;
        this.renderer = this.innerBehavior.renderer;
        this.recognizer = this.innerBehavior.recognizer;
        /**
         * Current grabber context
         * @type {GrabberContext}
         */
        this.grabberContext = this.grabber.attach(this.domElement, this);
      }
    }

    /**
     * Get current behavior
     * @return {Behavior}
     */
    ,
    get: function get$$1() {
      return this.innerBehavior;
    }

    /**
     * Set the current recognizer
     * @private
     * @param {Recognizer} recognizer
     */

  }, {
    key: 'recognizer',
    set: function set$$1(recognizer) {
      var _this5 = this;

      this.undoRedoContext = createUndoRedoContext(this.configuration);
      this.undoRedoManager = UndoRedoManager;

      var initialize = function initialize(model) {
        /**
         * @private
         * @type {Recognizer}
         */
        _this5.innerRecognizer = recognizer;
        if (_this5.innerRecognizer) {
          /**
           * Current recognition context
           * @type {RecognizerContext}
           */
          _this5.recognizerContext = createEmptyRecognizerContext(_this5);
          // FIXME: merge undo/redo manager with default recognizer
          if (_this5.innerRecognizer.undo && _this5.innerRecognizer.redo && _this5.innerRecognizer.clear) {
            _this5.undoRedoContext = _this5.recognizerContext;
            _this5.undoRedoManager = _this5.innerRecognizer;
          }

          _this5.innerRecognizer.init(_this5.recognizerContext, model, function (err, res) {
            for (var _len22 = arguments.length, types = Array(_len22 > 2 ? _len22 - 2 : 0), _key22 = 2; _key22 < _len22; _key22++) {
              types[_key22 - 2] = arguments[_key22];
            }

            editorLogger.debug('Recognizer initialized', res);
            _this5.loader.style.display = 'none';
            recognizerCallback.apply(undefined, [_this5, err, res].concat(types));
          });
        }
      };

      if (recognizer) {
        if (this.innerRecognizer) {
          this.innerRecognizer.close(this.recognizerContext, this.model, function (err, res) {
            for (var _len23 = arguments.length, types = Array(_len23 > 2 ? _len23 - 2 : 0), _key23 = 2; _key23 < _len23; _key23++) {
              types[_key23 - 2] = arguments[_key23];
            }

            editorLogger.info('Recognizer closed');
            recognizerCallback.apply(undefined, [_this5, err, res].concat(types));
            initialize(clearModel(res));
          });
        } else {
          /**
           * Current model
           * @type {Model}
           */
          this.model = createModel(this.configuration);

          // INFO: Recognizer needs model to be initialized
          initialize(this.model);
        }
      }
    }

    /**
     * Get current recognizer
     * @return {Recognizer}
     */
    ,
    get: function get$$1() {
      return this.innerRecognizer;
    }

    /**
     * Set the current renderer
     * @private
     * @param {Renderer} renderer
     */

  }, {
    key: 'renderer',
    set: function set$$1(renderer) {
      if (renderer) {
        if (this.innerRenderer) {
          this.innerRenderer.detach(this.domElement, this.rendererContext);
        }

        /**
         * @private
         * @type {Renderer}
         */
        this.innerRenderer = renderer;
        if (this.innerRenderer) {
          /**
           * Current rendering context
           * @type {Object}
           */
          this.rendererContext = this.innerRenderer.attach(this.domElement, this.configuration.renderingParams.minHeight, this.configuration.renderingParams.minWidth);
        }
      }
    }

    /**
     * Get current renderer
     * @return {Renderer}
     */
    ,
    get: function get$$1() {
      return this.innerRenderer;
    }

    /**
     * Get current grabber
     * @return {Grabber}
     */

  }, {
    key: 'grabber',
    get: function get$$1() {
      return this.behavior ? this.behavior.grabber : undefined;
    }

    /**
     * Get current stroker
     * @return {Stroker}
     */

  }, {
    key: 'stroker',
    get: function get$$1() {
      return this.behavior ? this.behavior.stroker : undefined;
    }

    /**
     * Get current callbacks
     * @return {Array}
     */

  }, {
    key: 'callbacks',
    get: function get$$1() {
      return this.behavior ? this.behavior.callbacks : undefined;
    }

    /**
     * Get a PNG image data url from the data model
     * @return {String}
     */

  }, {
    key: 'png',
    get: function get$$1() {
      return getImage(this.model, this.stroker);
    }
  }, {
    key: 'initialized',
    get: function get$$1() {
      return this.recognizerContext ? this.recognizerContext.initialized : false;
    }
  }, {
    key: 'idle',
    get: function get$$1() {
      return this.recognizerContext.idle;
    }
  }, {
    key: 'canUndo',
    get: function get$$1() {
      return this.undoRedoContext.canUndo;
    }
  }, {
    key: 'canRedo',
    get: function get$$1() {
      return this.undoRedoContext.canRedo;
    }
  }, {
    key: 'isEmpty',
    get: function get$$1() {
      return this.recognizerContext.isEmpty;
    }

    /**
     * True if can clear, false otherwise.
     * @return {Boolean}
     */

  }, {
    key: 'canClear',
    get: function get$$1() {
      return this.canUndo && this.model.rawStrokes.length > 0;
    }
  }, {
    key: 'canConvert',
    get: function get$$1() {
      return this.canUndo && this.canClear && this.recognizer && this.recognizer.convert;
    }
  }, {
    key: 'possibleUndoCount',
    get: function get$$1() {
      return this.recognizerContext.possibleUndoCount;
    }

    /**
     * The number of operations that it is currently possible to undo.
     * @returns {Number}
     */

  }, {
    key: 'undoStackIndex',
    get: function get$$1() {
      return this.recognizerContext.undoStackIndex;
    }

    /**
     * True if can export, false otherwise.
     * @return {Boolean}
     */

  }, {
    key: 'canExport',
    get: function get$$1() {
      return this.canUndo && this.canClear && this.recognizer && this.recognizer.getInfo().availableTriggers.exportContent.includes(Constants.Trigger.DEMAND);
    }
  }, {
    key: 'exports',
    get: function get$$1() {
      return this.model ? this.model.exports : undefined;
    }
  }, {
    key: 'supportedImportMimeTypes',
    get: function get$$1() {
      return this.recognizerContext.supportedImportMimeTypes;
    }
  }, {
    key: 'eastereggs',
    get: function get$$1() {
      return eastereggs;
    }
    /* eslint-enable class-methods-use-this */

  }]);
  return Editor;
}();

var result = { "af_ZA": "Afrikaans", "az_AZ": "Azərbaycanca", "be_BY": "Беларуская", "bg_BG": "Български", "bs_BA": "Bosanski", "ca_ES": "Català", "ceb_PH": "Sinugboanon", "cs_CZ": "Čeština", "da_DK": "Dansk", "de_AT": "Deutsch (Österreich)", "de_DE": "Deutsch", "el_GR": "Ελληνικά", "en_CA": "English (Canada)", "en_GB": "English (United Kingdom)", "en_PH": "English (Philippines)", "en_US": "English (United States)", "es_CO": "Español (Colombia)", "es_ES": "Español (España)", "es_MX": "Español (México)", "et_EE": "Eesti", "eu_ES": "Euskara", "fi_FI": "Suomi", "fil_PH": "Filipino", "fr_CA": "Français (Canada)", "fr_FR": "Français (France)", "ga_IE": "Gaeilge", "gl_ES": "Galego", "hr_HR": "Hrvatski", "hu_HU": "Magyar", "hy_AM": "Հայերեն", "id_ID": "Bahasa Indonesia", "is_IS": "Íslenska", "it_IT": "Italiano", "ja_JP": "日本語", "ka_GE": "ქართული", "kk_KZ": "Қазақша", "ko_KR": "한국어", "lt_LT": "Lietuvių", "lv_LV": "Latviešu", "mg_MG": "Malagasy", "mk_MK": "Македонски", "mn_MN": "Монгол", "ms_MY": "Bahasa Melayu (Malaysia)", "nl_BE": "Nederlands (België)", "nl_NL": "Nederlands", "no_NO": "Norsk (Bokmål)", "pl_PL": "Polski", "pt_BR": "Português (Brasil)", "pt_PT": "Português (Portugal)", "ro_RO": "Română", "ru_RU": "Русский", "sk_SK": "Slovenčina", "sl_SI": "Slovenščina", "sq_AL": "Shqip", "sr_Cyrl_RS": "Српски", "sr_Latn_RS": "Srpski", "sv_SE": "Svenska", "sw_TZ": "Kiswahili", "tr_TR": "Türkçe", "tt_RU": "Татарча", "uk_UA": "Українська", "vi_VN": "Tiếng Việt", "zh_CN": "中文 (中国)", "zh_HK": "中文 (香港)", "zh_TW": "中文 (台灣)" };
var languages = {
	result: result
};

var languagesJson = /*#__PURE__*/Object.freeze({
  result: result,
  default: languages
});

var result$1 = { "af_ZA": "Afrikaans", "az_AZ": "Azərbaycanca", "id_ID": "Bahasa Indonesia", "ms_MY": "Bahasa Melayu (Malaysia)", "bs_BA": "Bosanski", "ca_ES": "Català", "da_DK": "Dansk", "de_DE": "Deutsch", "de_AT": "Deutsch (Österreich)", "et_EE": "Eesti", "en_CA": "English (Canada)", "en_GB": "English (United Kingdom)", "en_US": "English (United States)", "es_ES": "Español (España)", "es_MX": "Español (México)", "eu_ES": "Euskara", "fr_CA": "Français (Canada)", "fr_FR": "Français (France)", "ga_IE": "Gaeilge", "gl_ES": "Galego", "hr_HR": "Hrvatski", "it_IT": "Italiano", "lv_LV": "Latviešu", "lt_LT": "Lietuvių", "hu_HU": "Magyar", "nl_NL": "Nederlands", "nl_BE": "Nederlands (België)", "no_NO": "Norsk (Bokmål)", "pl_PL": "Polski", "pt_BR": "Português (Brasil)", "pt_PT": "Português (Portugal)", "ro_RO": "Română", "sq_AL": "Shqip", "sk_SK": "Slovenčina", "sl_SI": "Slovenščina", "sr_Latn_RS": "Srpski", "fi_FI": "Suomi", "sv_SE": "Svenska", "th_TH": "Thaiไทย", "vi_VN": "Tiếng Việt", "tr_TR": "Türkçe", "is_IS": "Íslenska", "cs_CZ": "Čeština", "el_GR": "Ελληνικά", "be_BY": "Беларуская", "bg_BG": "Български", "mk_MK": "Македонски", "mn_MN": "Монгол", "ru_RU": "Русский", "sr_Cyrl_RS": "Српски", "tt_RU": "Татарча", "uk_UA": "Українська", "kk_KZ": "Қазақша", "hy_AM": "Հայերեն", "he_IL": "עברית", "ur_PK": "اردو", "ar": "العربية", "fa_IR": "فارسی", "hi_IN": "हिन्दी", "ka_GE": "ქართული", "zh_CN": "中文 (中国)", "zh_TW": "中文 (台灣)", "zh_HK": "中文 (香港)", "ja_JP": "日本語", "ko_KR": "한국어" };
var languagesV3 = {
	result: result$1
};

var languagesJsonV3 = /*#__PURE__*/Object.freeze({
  result: result$1,
  default: languagesV3
});

/**
 * Attach an Editor to a DOMElement
 * @param {Element} element DOM element to attach an editor
 * @param {Configuration} [configuration] Configuration to apply
 * @param {PenStyle} [penStyle] Pen style to apply
 * @param {Theme} [theme] Theme to apply
 * @param {Behaviors} [behaviors] Custom behaviors to apply
 * @return {Editor} New editor
 */
function register(element, configuration, penStyle, theme, behaviors) {
  editorLogger.debug('Registering a new editor');
  return new Editor(element, configuration, penStyle, theme, behaviors);
}

/**
 * Return the list of available recognition languages
 * @param {Configuration} [configuration] Configuration to get the languages
 * @return {JSON} A list of available languages
 */
function getAvailableLanguageList(configuration) {
  var innerConfiguration = overrideDefaultConfiguration(configuration);
  return innerConfiguration.recognitionParams.apiVersion === 'V4' ? languagesJson : languagesJsonV3;
}

var MyScript = {
  Constants: Constants,
  // Default instantiations
  DefaultConfiguration: defaultConfiguration,
  DefaultBehaviors: defaultBehaviors,
  DefaultPenStyle: defaultPenStyle,
  DefaultTheme: defaultTheme,
  // Helper functions
  register: register,
  getAvailableLanguageList: getAvailableLanguageList,
  // Internals
  LoggerConfig: log,
  Editor: Editor,
  InkModel: InkModel,
  RecognizerContext: RecognizerContext
};

export default MyScript;
export { Constants, defaultConfiguration as DefaultConfiguration, defaultBehaviors as DefaultBehaviors, defaultPenStyle as DefaultPenStyle, defaultTheme as DefaultTheme, register, getAvailableLanguageList, log as LoggerConfig, Editor, InkModel, RecognizerContext };
//# sourceMappingURL=myscript.esm.js.map
